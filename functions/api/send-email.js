// Cloudflare Pages Function: Send Email via Resend
// Handles booking confirmations, reminders, cancellations, and gift card notifications

// Simple in-memory rate limiter
const rateLimitMap = new Map();
function checkRateLimit(ip, limit = 5, windowMs = 60000) {
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
  // Rate limit: 5 email requests per minute per IP
  const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
  if (!checkRateLimit(clientIP, 5)) {
    return jsonResponse({ error: 'Too many requests' }, 429);
  }
  const RESEND_API_KEY = env.RESEND_API_KEY;
  const APP_URL = env.APP_URL || 'https://healing-garden-3w5.pages.dev';

  if (!RESEND_API_KEY) {
    return jsonResponse({ error: 'Email not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const { template, data, locale } = body;
  if (!template || !data) {
    return jsonResponse({ error: 'Missing template or data' }, 400);
  }

  try {
    const email = buildEmail(template, data, locale || 'ja', APP_URL);
    if (!email) {
      return jsonResponse({ error: 'Unknown template' }, 400);
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: '癒しの庭 Healing Garden <onboarding@resend.dev>',
        to: email.to,
        subject: email.subject,
        html: email.html,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error('Resend error:', result);
      return jsonResponse({ error: result.message || 'Email send failed' }, 500);
    }

    return jsonResponse({ success: true, id: result.id });
  } catch (e) {
    console.error('Email error:', e);
    return jsonResponse({ error: e.message }, 500);
  }
}

function buildEmail(template, data, locale, appUrl) {
  const isJa = locale === 'ja';

  switch (template) {
    case 'booking_confirmation':
      return {
        to: data.userEmail,
        subject: isJa
          ? `【癒しの庭】ご予約が確定しました - ${data.sessionName}`
          : `[Healing Garden] Booking Confirmed - ${data.sessionName}`,
        html: bookingConfirmationHtml(data, isJa, appUrl),
      };

    case 'booking_reminder':
      return {
        to: data.userEmail,
        subject: isJa
          ? `【癒しの庭】明日のご予約リマインダー - ${data.sessionName}`
          : `[Healing Garden] Booking Reminder - ${data.sessionName}`,
        html: bookingReminderHtml(data, isJa, appUrl),
      };

    case 'booking_cancellation':
      return {
        to: data.userEmail,
        subject: isJa
          ? `【癒しの庭】ご予約がキャンセルされました`
          : `[Healing Garden] Booking Cancelled`,
        html: bookingCancellationHtml(data, isJa, appUrl),
      };

    case 'gift_card':
      return {
        to: data.recipientEmail,
        subject: isJa
          ? `🎁 癒しの庭のギフトカードが届きました！`
          : `🎁 You received a Healing Garden Gift Card!`,
        html: giftCardHtml(data, isJa, appUrl),
      };

    default:
      return null;
  }
}

function emailWrapper(content, appUrl) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:linear-gradient(135deg,#3dba78,#2d9a62);padding:32px;text-align:center">
      <span style="font-size:2.5rem">🌿</span>
      <h1 style="color:#fff;margin:8px 0 0;font-size:1.5rem">癒しの庭 / Healing Garden</h1>
    </div>
    <div style="padding:32px 24px">${content}</div>
    <div style="padding:16px 24px;background:#f9f9f6;text-align:center;font-size:0.8rem;color:#888">
      <a href="${appUrl}" style="color:#3dba78;text-decoration:none">healing-garden-3w5.pages.dev</a>
    </div>
  </div>
</body></html>`;
}

function bookingConfirmationHtml(data, isJa, appUrl) {
  const content = isJa ? `
    <h2 style="color:#2d9a62;margin:0 0 16px">ご予約が確定しました ✓</h2>
    <div style="background:#f0faf4;border-radius:12px;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:0.95rem;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">セッション</td><td style="padding:8px 0;font-weight:600">${data.sessionName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">セラピスト</td><td style="padding:8px 0;font-weight:600">${data.therapistName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">日付</td><td style="padding:8px 0;font-weight:600">${data.bookingDate}</td></tr>
        <tr><td style="padding:8px 0;color:#666">時間</td><td style="padding:8px 0;font-weight:600">${data.bookingTime}</td></tr>
        <tr><td style="padding:8px 0;color:#666">料金</td><td style="padding:8px 0;font-weight:600">¥${Number(data.price).toLocaleString()}</td></tr>
      </table>
    </div>
    <p style="color:#555;line-height:1.6">ご予約ありがとうございます。当日お会いできることを楽しみにしています。</p>
    <p style="color:#555;line-height:1.6">キャンセルや変更がございましたら、お早めにご連絡ください。</p>
  ` : `
    <h2 style="color:#2d9a62;margin:0 0 16px">Booking Confirmed ✓</h2>
    <div style="background:#f0faf4;border-radius:12px;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:0.95rem;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Session</td><td style="padding:8px 0;font-weight:600">${data.sessionName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Therapist</td><td style="padding:8px 0;font-weight:600">${data.therapistName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Date</td><td style="padding:8px 0;font-weight:600">${data.bookingDate}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Time</td><td style="padding:8px 0;font-weight:600">${data.bookingTime}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Price</td><td style="padding:8px 0;font-weight:600">¥${Number(data.price).toLocaleString()}</td></tr>
      </table>
    </div>
    <p style="color:#555;line-height:1.6">Thank you for your booking. We look forward to seeing you!</p>
    <p style="color:#555;line-height:1.6">If you need to cancel or make changes, please contact us as soon as possible.</p>
  `;
  return emailWrapper(content, appUrl);
}

function bookingReminderHtml(data, isJa, appUrl) {
  const content = isJa ? `
    <h2 style="color:#2d9a62;margin:0 0 16px">📅 明日のご予約リマインダー</h2>
    <div style="background:#f0faf4;border-radius:12px;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:0.95rem;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">セッション</td><td style="padding:8px 0;font-weight:600">${data.sessionName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">セラピスト</td><td style="padding:8px 0;font-weight:600">${data.therapistName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">日付</td><td style="padding:8px 0;font-weight:600">${data.bookingDate}</td></tr>
        <tr><td style="padding:8px 0;color:#666">時間</td><td style="padding:8px 0;font-weight:600">${data.bookingTime}</td></tr>
      </table>
    </div>
    <p style="color:#555;line-height:1.6">明日のセッションをお忘れなく！お会いできることを楽しみにしています。</p>
  ` : `
    <h2 style="color:#2d9a62;margin:0 0 16px">📅 Booking Reminder - Tomorrow</h2>
    <div style="background:#f0faf4;border-radius:12px;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:0.95rem;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Session</td><td style="padding:8px 0;font-weight:600">${data.sessionName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Therapist</td><td style="padding:8px 0;font-weight:600">${data.therapistName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Date</td><td style="padding:8px 0;font-weight:600">${data.bookingDate}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Time</td><td style="padding:8px 0;font-weight:600">${data.bookingTime}</td></tr>
      </table>
    </div>
    <p style="color:#555;line-height:1.6">Don't forget your session tomorrow! We look forward to seeing you.</p>
  `;
  return emailWrapper(content, appUrl);
}

function bookingCancellationHtml(data, isJa, appUrl) {
  const content = isJa ? `
    <h2 style="color:#c0392b;margin:0 0 16px">ご予約がキャンセルされました</h2>
    <div style="background:#fef5f5;border-radius:12px;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:0.95rem;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">セッション</td><td style="padding:8px 0;font-weight:600">${data.sessionName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">セラピスト</td><td style="padding:8px 0;font-weight:600">${data.therapistName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">日付</td><td style="padding:8px 0;font-weight:600">${data.bookingDate}</td></tr>
      </table>
    </div>
    <p style="color:#555;line-height:1.6">ご予約がキャンセルされました。返金処理は3〜5営業日で完了します。</p>
    <p style="color:#555;line-height:1.6">またのご利用をお待ちしております。</p>
  ` : `
    <h2 style="color:#c0392b;margin:0 0 16px">Booking Cancelled</h2>
    <div style="background:#fef5f5;border-radius:12px;padding:20px;margin-bottom:24px">
      <table style="width:100%;font-size:0.95rem;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Session</td><td style="padding:8px 0;font-weight:600">${data.sessionName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Therapist</td><td style="padding:8px 0;font-weight:600">${data.therapistName}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Date</td><td style="padding:8px 0;font-weight:600">${data.bookingDate}</td></tr>
      </table>
    </div>
    <p style="color:#555;line-height:1.6">Your booking has been cancelled. Refunds will be processed within 3-5 business days.</p>
    <p style="color:#555;line-height:1.6">We hope to see you again soon.</p>
  `;
  return emailWrapper(content, appUrl);
}

function giftCardHtml(data, isJa, appUrl) {
  const content = isJa ? `
    <h2 style="color:#2d9a62;margin:0 0 16px">🎁 ギフトカードが届きました！</h2>
    <div style="background:linear-gradient(135deg,#f0faf4,#e8f5e9);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center">
      <p style="font-size:2rem;margin:0 0 8px">🌿</p>
      <p style="font-size:1.8rem;font-weight:700;color:#2d9a62;margin:0">¥${Number(data.amount).toLocaleString()}</p>
      <p style="color:#666;margin:8px 0 0">癒しの庭 ギフトカード</p>
    </div>
    ${data.message ? `<div style="background:#f9f9f6;border-left:4px solid #3dba78;padding:16px;margin-bottom:24px;border-radius:0 8px 8px 0"><p style="margin:0;color:#555;font-style:italic">"${data.message}"</p></div>` : ''}
    <div style="background:#f5f5f0;border-radius:8px;padding:16px;text-align:center;margin-bottom:24px">
      <p style="margin:0 0 4px;color:#666;font-size:0.85rem">ギフトコード</p>
      <p style="margin:0;font-size:1.3rem;font-weight:700;letter-spacing:2px;color:#2d9a62">${data.code}</p>
    </div>
    <p style="color:#555;line-height:1.6">上記のコードをご予約時にご利用ください。有効期限は1年間です。</p>
  ` : `
    <h2 style="color:#2d9a62;margin:0 0 16px">🎁 You received a Gift Card!</h2>
    <div style="background:linear-gradient(135deg,#f0faf4,#e8f5e9);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center">
      <p style="font-size:2rem;margin:0 0 8px">🌿</p>
      <p style="font-size:1.8rem;font-weight:700;color:#2d9a62;margin:0">¥${Number(data.amount).toLocaleString()}</p>
      <p style="color:#666;margin:8px 0 0">Healing Garden Gift Card</p>
    </div>
    ${data.message ? `<div style="background:#f9f9f6;border-left:4px solid #3dba78;padding:16px;margin-bottom:24px;border-radius:0 8px 8px 0"><p style="margin:0;color:#555;font-style:italic">"${data.message}"</p></div>` : ''}
    <div style="background:#f5f5f0;border-radius:8px;padding:16px;text-align:center;margin-bottom:24px">
      <p style="margin:0 0 4px;color:#666;font-size:0.85rem">Gift Code</p>
      <p style="margin:0;font-size:1.3rem;font-weight:700;letter-spacing:2px;color:#2d9a62">${data.code}</p>
    </div>
    <p style="color:#555;line-height:1.6">Use this code when booking a session. Valid for 1 year.</p>
  `;
  return emailWrapper(content, appUrl);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
