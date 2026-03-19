// Cloudflare Pages Function: LINE Login callback
// Exchanges LINE auth code for tokens, creates/signs in Supabase user

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const appUrl = env.APP_URL || url.origin;

  // Handle LINE errors (user cancelled, etc.)
  if (error) {
    return Response.redirect(`${appUrl}/#/signup?error=line_cancelled`, 302);
  }

  if (!code) {
    return Response.redirect(`${appUrl}/#/signup?error=no_code`, 302);
  }

  // Validate CSRF state
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  if (!cookies.line_oauth_state || cookies.line_oauth_state !== state) {
    return Response.redirect(`${appUrl}/#/signup?error=invalid_state`, 302);
  }

  try {
    // 1. Exchange code for tokens
    const redirectUri = `${url.origin}/api/auth/line-callback`;
    const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: env.LINE_CHANNEL_ID,
        client_secret: env.LINE_CHANNEL_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error('LINE token exchange failed:', err);
      return Response.redirect(`${appUrl}/#/signup?error=token_failed`, 302);
    }

    const tokens = await tokenRes.json();

    // 2. Get LINE user profile
    const profileRes = await fetch('https://api.line.me/v2/profile', {
      headers: { 'Authorization': `Bearer ${tokens.access_token}` },
    });

    if (!profileRes.ok) {
      console.error('LINE profile fetch failed:', profileRes.status);
      return Response.redirect(`${appUrl}/#/signup?error=profile_failed`, 302);
    }

    const profile = await profileRes.json();

    // 3. Decode ID token for email (if available)
    let email = null;
    if (tokens.id_token) {
      try {
        const payload = JSON.parse(atob(tokens.id_token.split('.')[1]));
        email = payload.email || null;
      } catch (e) {
        console.warn('Failed to decode LINE ID token:', e);
      }
    }

    // 4. Create or sign in user via Supabase Admin API
    const supabaseUrl = env.SUPABASE_URL;
    const serviceKey = env.SUPABASE_SERVICE_KEY;

    // Check if user with this LINE ID already exists
    const lineUserId = `line_${profile.userId}`;
    const existingRes = await fetch(
      `${supabaseUrl}/rest/v1/users?provider_id=eq.${lineUserId}&select=id,email`,
      {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        },
      }
    );
    const existingUsers = await existingRes.json();

    let userId;
    const userEmail = email || `${lineUserId}@line.local`;

    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      // Create user via Supabase Auth Admin API
      const createRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          email_confirm: true,
          user_metadata: {
            full_name: profile.displayName || '',
            avatar_url: profile.pictureUrl || '',
            provider: 'line',
            line_user_id: profile.userId,
          },
          app_metadata: {
            provider: 'line',
            providers: ['line'],
          },
        }),
      });

      if (!createRes.ok) {
        // User might already exist with this email — try to find and update
        const errData = await createRes.json();
        if (errData.msg && errData.msg.includes('already been registered')) {
          // Find by email and update metadata
          const findRes = await fetch(
            `${supabaseUrl}/auth/v1/admin/users?filter=email%3Deq.${encodeURIComponent(userEmail)}`,
            {
              headers: {
                'apikey': serviceKey,
                'Authorization': `Bearer ${serviceKey}`,
              },
            }
          );
          const findData = await findRes.json();
          if (findData.users && findData.users.length > 0) {
            userId = findData.users[0].id;
          } else {
            console.error('Cannot find or create LINE user');
            return Response.redirect(`${appUrl}/#/signup?error=create_failed`, 302);
          }
        } else {
          console.error('Supabase create user failed:', errData);
          return Response.redirect(`${appUrl}/#/signup?error=create_failed`, 302);
        }
      } else {
        const newUser = await createRes.json();
        userId = newUser.id;

        // Also insert into public users table
        await fetch(`${supabaseUrl}/rest/v1/users`, {
          method: 'POST',
          headers: {
            'apikey': serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            id: userId,
            email: userEmail,
            name_ja: profile.displayName || '',
            name_en: profile.displayName || '',
            provider_id: lineUserId,
            avatar_url: profile.pictureUrl || '',
          }),
        });
      }
    }

    // 5. Generate a magic link for the user to auto-sign in
    const magicLinkRes = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'magiclink',
        email: userEmail,
        options: {
          redirect_to: `${appUrl}/`,
        },
      }),
    });

    if (!magicLinkRes.ok) {
      console.error('Magic link generation failed:', await magicLinkRes.text());
      return Response.redirect(`${appUrl}/#/signup?error=link_failed`, 302);
    }

    const linkData = await magicLinkRes.json();

    // The action_link contains the full verification URL
    const actionLink = linkData.action_link;
    if (!actionLink) {
      console.error('No action_link in response');
      return Response.redirect(`${appUrl}/#/signup?error=link_failed`, 302);
    }

    // Clear the state cookie and redirect to the magic link
    return new Response(null, {
      status: 302,
      headers: {
        'Location': actionLink,
        'Set-Cookie': 'line_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      },
    });

  } catch (e) {
    console.error('LINE callback error:', e);
    return Response.redirect(`${appUrl}/#/signup?error=server_error`, 302);
  }
}

function parseCookies(cookieStr) {
  const cookies = {};
  cookieStr.split(';').forEach(pair => {
    const [key, ...vals] = pair.trim().split('=');
    if (key) cookies[key.trim()] = vals.join('=').trim();
  });
  return cookies;
}
