// Cloudflare Pages Function: LINE Login — redirect to LINE authorization
export async function onRequestGet(context) {
  const { env, request } = context;
  const channelId = env.LINE_CHANNEL_ID;
  if (!channelId) {
    return new Response(JSON.stringify({ error: 'LINE not configured' }), { status: 500 });
  }

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/auth/line-callback`;

  // Generate random state for CSRF protection
  const state = crypto.randomUUID();

  const lineAuthUrl = new URL('https://access.line.me/oauth2/v2.1/authorize');
  lineAuthUrl.searchParams.set('response_type', 'code');
  lineAuthUrl.searchParams.set('client_id', channelId);
  lineAuthUrl.searchParams.set('redirect_uri', redirectUri);
  lineAuthUrl.searchParams.set('state', state);
  lineAuthUrl.searchParams.set('scope', 'profile openid email');

  // Set state cookie for CSRF validation on callback
  return new Response(null, {
    status: 302,
    headers: {
      'Location': lineAuthUrl.toString(),
      'Set-Cookie': `line_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
}
