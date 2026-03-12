// Cloudflare Pages Function: Create Daily.co Video Room
// Creates a temporary room for a therapy session video call

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
  // Rate limit: 5 video room requests per minute per IP
  const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
  if (!checkRateLimit(clientIP, 5)) {
    return jsonResponse({ error: 'Too many requests' }, 429);
  }
  const DAILY_API_KEY = env.DAILY_API_KEY;

  if (!DAILY_API_KEY) {
    return jsonResponse({ error: 'Video not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const { therapistId, userId, sessionName } = body;
  if (!therapistId) {
    return jsonResponse({ error: 'Missing therapist ID' }, 400);
  }

  try {
    // Create a temporary room that expires in 1 hour
    const roomName = `hg-${therapistId.slice(0, 8)}-${Date.now()}`;
    const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour

    const res = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DAILY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          exp: expiresAt,
          max_participants: 2,
          enable_chat: true,
          enable_screenshare: false,
          start_video_off: false,
          start_audio_off: false,
          lang: 'ja',
        },
      }),
    });

    const room = await res.json();
    if (room.error) {
      throw new Error(room.info || room.error);
    }

    // Create a meeting token for the user (optional, adds security)
    const tokenRes = await fetch('https://api.daily.co/v1/meeting-tokens', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DAILY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          room_name: roomName,
          exp: expiresAt,
          user_name: sessionName || 'User',
          enable_screenshare: false,
        },
      }),
    });

    const tokenData = await tokenRes.json();

    return jsonResponse({
      roomUrl: room.url,
      roomName: room.name,
      token: tokenData.token || null,
      expiresAt,
    });
  } catch (e) {
    console.error('Video room creation error:', e);
    return jsonResponse({ error: e.message || 'Failed to create room' }, 500);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
