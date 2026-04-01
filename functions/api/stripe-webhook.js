// Cloudflare Pages Function: Stripe Webhook Handler
// Verifies signature and processes payment events

export async function onRequestPost(context) {
  const { env, request } = context;
  const STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = env.SUPABASE_SERVICE_KEY;
  const RESEND_API_KEY = env.RESEND_API_KEY;
  const APP_URL = env.APP_URL || 'https://houseofinspirationtokyo.com';

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
        await handleCheckoutCompleted(event.data.object, SUPABASE_URL, SUPABASE_SERVICE_KEY, RESEND_API_KEY, APP_URL);
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

async function handleCheckoutCompleted(session, supabaseUrl, supabaseKey, resendKey, appUrl) {
  const meta = session.metadata || {};
  const paymentIntentId = session.payment_intent;
  const customerEmail = session.customer_details?.email;

  if (meta.type === 'booking' && meta.booking_id) {
    // Update booking status to 'upcoming' and store payment intent
    await supabaseUpdate(supabaseUrl, supabaseKey, 'bookings', meta.booking_id, {
      status: 'upcoming',
      payment_intent_id: paymentIntentId,
    });
    console.log('Booking confirmed:', meta.booking_id);

    // Send confirmation email
    if (resendKey && customerEmail) {
      await sendEmail(resendKey, appUrl, 'booking_confirmation', {
        userEmail: customerEmail,
        sessionName: meta.session_name || 'Therapy Session',
        therapistName: meta.therapist_name || '',
        bookingDate: meta.booking_date || '',
        bookingTime: meta.booking_time || '',
        price: meta.price || session.amount_total,
      });
    }

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

    // Send gift card email to recipient
    if (resendKey && meta.recipient_email) {
      await sendEmail(resendKey, appUrl, 'gift_card', {
        recipientEmail: meta.recipient_email,
        amount: meta.amount,
        message: meta.message || '',
        code,
      });
    }

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

// Send email via the send-email function (calls Resend directly)
async function sendEmail(resendKey, appUrl, template, data) {
  try {
    // Import and reuse the email builder from send-email.js isn't possible
    // in CF Pages Functions, so call Resend directly with inline templates
    const { buildEmailDirect } = await import('./send-email-templates.js').catch(() => ({}));

    // Fallback: call Resend API directly with a simple email
    const isJa = true; // Default to Japanese for webhook-triggered emails
    let to, subject, html;

    if (template === 'booking_confirmation') {
      to = data.userEmail;
      subject = `【癒しの庭】ご予約が確定しました - ${data.sessionName}`;
      html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#2d9a62">ご予約が確定しました ✓</h2><p><strong>${data.sessionName}</strong></p><p>セラピスト: ${data.therapistName}</p><p>日付: ${data.bookingDate} ${data.bookingTime}</p><p>料金: ¥${Number(data.price).toLocaleString()}</p><hr><p>ご予約ありがとうございます。</p><p style="color:#888;font-size:0.8rem">癒しの庭 / Healing Garden</p></div>`;
    } else if (template === 'gift_card') {
      to = data.recipientEmail;
      subject = '🎁 癒しの庭のギフトカードが届きました！';
      html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#2d9a62">🎁 ギフトカードが届きました！</h2><div style="text-align:center;padding:20px;background:#f0faf4;border-radius:12px;margin:20px 0"><p style="font-size:2rem">¥${Number(data.amount).toLocaleString()}</p><p style="font-size:1.2rem;font-weight:700;letter-spacing:2px;color:#2d9a62">${data.code}</p></div>${data.message ? `<p style="font-style:italic;color:#555">"${data.message}"</p>` : ''}<p>上記のコードをご予約時にご利用ください。</p><p style="color:#888;font-size:0.8rem">癒しの庭 / Healing Garden</p></div>`;
    } else {
      return;
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: '癒しの庭 Healing Garden <onboarding@resend.dev>',
        to,
        subject,
        html,
      }),
    });
    console.log('Email sent:', template, to);
  } catch (e) {
    console.error('Email send failed:', e);
    // Don't throw — email failure shouldn't break the webhook
  }
}
