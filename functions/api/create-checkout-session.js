// Cloudflare Pages Function: Create Stripe Checkout Session
// Handles bookings, gift cards, and digital product purchases

// Simple in-memory rate limiter (resets per worker instance)
const rateLimitMap = new Map();
function checkRateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > windowMs) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  if (entry.count > limit) return false;
  return true;
}

export async function onRequestPost(context) {
  const { env, request } = context;
  // Rate limit: 10 checkout requests per minute per IP
  const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
  if (!checkRateLimit(clientIP, 10)) {
    return jsonResponse({ error: 'Too many requests' }, 429);
  }
  const STRIPE_SECRET_KEY = env.STRIPE_SECRET_KEY;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;
  const APP_URL = env.APP_URL || 'https://healing-garden-3w5.pages.dev';

  if (!STRIPE_SECRET_KEY) {
    return jsonResponse({ error: 'Stripe not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const { type } = body;

  try {
    if (type === 'booking') {
      return await handleBooking(body, STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY, APP_URL);
    } else if (type === 'gift_card') {
      return await handleGiftCard(body, STRIPE_SECRET_KEY, APP_URL);
    } else if (type === 'digital_product') {
      return await handleDigitalProduct(body, STRIPE_SECRET_KEY, APP_URL);
    } else {
      return jsonResponse({ error: 'Invalid type' }, 400);
    }
  } catch (e) {
    console.error('Checkout error:', e);
    return jsonResponse({ error: e.message || 'Internal error' }, 500);
  }
}

async function handleBooking(body, stripeKey, supabaseUrl, supabaseServiceKey, appUrl) {
  const { therapistId, sessionId, bookingDate, bookingTime, userId, sessionName, therapistName, price, platformFee, locale } = body;

  if (!therapistId || !sessionId || !bookingDate || !bookingTime || !price) {
    return jsonResponse({ error: 'Missing required booking fields' }, 400);
  }

  // Create pending booking in Supabase if service key available
  let bookingId = null;
  if (supabaseUrl && supabaseServiceKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        user_id: userId || '00000000-0000-0000-0000-000000000001',
        therapist_id: therapistId,
        session_id: sessionId,
        booking_date: bookingDate,
        booking_time: bookingTime + ':00',
        price: price,
        platform_fee: platformFee || 0,
        status: 'pending_payment',
      }),
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      bookingId = data[0].id;
    }
  }

  // Create Stripe Checkout Session
  // JPY is zero-decimal currency — price is already in yen
  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('currency', 'jpy');
  params.append('line_items[0][price_data][currency]', 'jpy');
  params.append('line_items[0][price_data][unit_amount]', String(price));
  params.append('line_items[0][price_data][product_data][name]', sessionName || 'Therapy Session');
  params.append('line_items[0][price_data][product_data][description]', therapistName || '');
  params.append('line_items[0][quantity]', '1');
  params.append('metadata[type]', 'booking');
  params.append('metadata[booking_id]', bookingId || '');
  params.append('metadata[user_id]', userId || '');
  params.append('metadata[therapist_id]', therapistId);
  params.append('metadata[platform_fee]', String(platformFee || 0));
  params.append('metadata[session_name]', sessionName || '');
  params.append('metadata[therapist_name]', therapistName || '');
  params.append('metadata[booking_date]', bookingDate || '');
  params.append('metadata[booking_time]', bookingTime || '');
  params.append('metadata[price]', String(price));
  params.append('success_url', `${appUrl}/?session_id={CHECKOUT_SESSION_ID}#/booking/success`);
  params.append('cancel_url', `${appUrl}/#/booking`);
  if (locale === 'ja') params.append('locale', 'ja');

  const session = await stripeRequest('/v1/checkout/sessions', params, stripeKey);
  return jsonResponse({ url: session.url, sessionId: session.id });
}

async function handleGiftCard(body, stripeKey, appUrl) {
  const { amount, recipientEmail, message, userId, locale } = body;

  if (!amount || !recipientEmail) {
    return jsonResponse({ error: 'Missing required gift card fields' }, 400);
  }

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('currency', 'jpy');
  params.append('line_items[0][price_data][currency]', 'jpy');
  params.append('line_items[0][price_data][unit_amount]', String(amount));
  params.append('line_items[0][price_data][product_data][name]', 'Gift Card / ギフトカード');
  params.append('line_items[0][quantity]', '1');
  params.append('metadata[type]', 'gift_card');
  params.append('metadata[amount]', String(amount));
  params.append('metadata[recipient_email]', recipientEmail);
  params.append('metadata[message]', message || '');
  params.append('metadata[user_id]', userId || '');
  params.append('success_url', `${appUrl}/?session_id={CHECKOUT_SESSION_ID}#/gift-card/success`);
  params.append('cancel_url', `${appUrl}/#/gift-card`);
  if (locale === 'ja') params.append('locale', 'ja');

  const session = await stripeRequest('/v1/checkout/sessions', params, stripeKey);
  return jsonResponse({ url: session.url, sessionId: session.id });
}

async function handleDigitalProduct(body, stripeKey, appUrl) {
  const { productId, productName, price, userId, locale } = body;

  if (!productId || !price) {
    return jsonResponse({ error: 'Missing required product fields' }, 400);
  }

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('currency', 'jpy');
  params.append('line_items[0][price_data][currency]', 'jpy');
  params.append('line_items[0][price_data][unit_amount]', String(price));
  params.append('line_items[0][price_data][product_data][name]', productName || 'Digital Product');
  params.append('line_items[0][quantity]', '1');
  params.append('metadata[type]', 'digital_product');
  params.append('metadata[product_id]', productId);
  params.append('metadata[user_id]', userId || '');
  params.append('success_url', `${appUrl}/?session_id={CHECKOUT_SESSION_ID}#/digital-products`);
  params.append('cancel_url', `${appUrl}/#/digital-products`);
  if (locale === 'ja') params.append('locale', 'ja');

  const session = await stripeRequest('/v1/checkout/sessions', params, stripeKey);
  return jsonResponse({ url: session.url, sessionId: session.id });
}

// Raw Stripe API call (no Node SDK needed in Workers)
async function stripeRequest(path, params, secretKey) {
  const res = await fetch(`https://api.stripe.com${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(secretKey + ':')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || 'Stripe error');
  }
  return data;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
