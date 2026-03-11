// Cloudflare Pages Function: Stripe Webhook Handler
// Verifies signature and processes payment events

export async function onRequestPost(context) {
  const { env, request } = context;
  const STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;

  if (!STRIPE_WEBHOOK_SECRET) {
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  const rawBody = await request.text();

  // Verify Stripe webhook signature using Web Crypto API
  const isValid = await verifyStripeSignature(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  if (!isValid) {
    console.error('Invalid webhook signature');
    return new Response('Invalid signature', { status: 400 });
  }

  const event = JSON.parse(rawBody);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, SUPABASE_URL, SUPABASE_SERVICE_KEY);
        break;
      case 'checkout.session.expired':
        await handleCheckoutExpired(event.data.object, SUPABASE_URL, SUPABASE_SERVICE_KEY);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }
  } catch (e) {
    console.error('Webhook handler error:', e);
    // Return 200 anyway to prevent Stripe retries for handler errors
  }

  return new Response('ok', { status: 200 });
}

async function handleCheckoutCompleted(session, supabaseUrl, supabaseKey) {
  const meta = session.metadata || {};
  const paymentIntentId = session.payment_intent;

  if (meta.type === 'booking' && meta.booking_id) {
    // Update booking status to 'upcoming' and store payment intent
    await supabaseUpdate(supabaseUrl, supabaseKey, 'bookings', meta.booking_id, {
      status: 'upcoming',
      payment_intent_id: paymentIntentId,
    });
    console.log('Booking confirmed:', meta.booking_id);

  } else if (meta.type === 'gift_card') {
    // Create gift card record
    const code = generateGiftCardCode();
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    await supabaseInsert(supabaseUrl, supabaseKey, 'gift_cards', {
      purchaser_id: meta.user_id || null,
      amount: parseInt(meta.amount),
      recipient_email: meta.recipient_email,
      message: meta.message || '',
      code,
      status: 'active',
      payment_intent_id: paymentIntentId,
      expires_at: expiresAt,
    });
    console.log('Gift card created:', code);
    // TODO: Send email to recipient via Resend

  } else if (meta.type === 'digital_product') {
    // Create purchase record
    await supabaseInsert(supabaseUrl, supabaseKey, 'purchases', {
      user_id: meta.user_id || null,
      product_id: meta.product_id,
      price: session.amount_total,
      payment_intent_id: paymentIntentId,
      status: 'completed',
    });
    console.log('Digital product purchased:', meta.product_id);
  }
}

async function handleCheckoutExpired(session, supabaseUrl, supabaseKey) {
  const meta = session.metadata || {};
  if (meta.type === 'booking' && meta.booking_id) {
    await supabaseUpdate(supabaseUrl, supabaseKey, 'bookings', meta.booking_id, {
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
    });
    console.log('Booking cancelled (expired):', meta.booking_id);
  }
}

// Supabase REST API helpers (uses service role key to bypass RLS)
async function supabaseUpdate(url, key, table, id, data) {
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`Supabase update ${table} failed:`, err);
  }
}

async function supabaseInsert(url, key, table, data) {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`Supabase insert ${table} failed:`, err);
  }
  return res.json();
}

// Stripe webhook signature verification using Web Crypto API
async function verifyStripeSignature(payload, header, secret) {
  try {
    const parts = header.split(',').reduce((acc, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const timestamp = parts['t'];
    const signature = parts['v1'];
    if (!timestamp || !signature) return false;

    // Check timestamp tolerance (5 minutes)
    const age = Math.abs(Date.now() / 1000 - parseInt(timestamp));
    if (age > 300) return false;

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
    const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');

    // Constant-time comparison
    if (expected.length !== signature.length) return false;
    let result = 0;
    for (let i = 0; i < expected.length; i++) {
      result |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return result === 0;
  } catch (e) {
    console.error('Signature verification error:', e);
    return false;
  }
}

function generateGiftCardCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'GC-';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
