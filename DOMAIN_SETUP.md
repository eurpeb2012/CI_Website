# Domain Setup: houseofinspirationtokyo.com

## Overview

Connect `houseofinspirationtokyo.com` (registered on GoDaddy) to the Healing Garden web app hosted on Cloudflare Pages. This involves transferring DNS management to Cloudflare, then updating all services that reference the old URL.

Current URL: `https://healing-garden-3w5.pages.dev/`
New URL: `https://houseofinspirationtokyo.com`

---

## Part 1: GoDaddy Admin (for domain administrator)

### Step 1: Get Cloudflare Nameservers

Peter will provide two Cloudflare nameservers after completing Part 2, Step 1 below. They look like:

```
lewis.ns.cloudflare.com
tia.ns.cloudflare.com
```

### Step 2: Update Nameservers in GoDaddy

1. Log in to GoDaddy at https://dcc.godaddy.com/
2. Go to **My Products** > **Domains** > click `houseofinspirationtokyo.com`
3. Scroll to **Nameservers** section
4. Click **Change** (or **Edit**)
5. Select **"I'll use my own nameservers"** (custom)
6. Remove the existing GoDaddy nameservers
7. Enter the two Cloudflare nameservers Peter provided
8. Click **Save**

**Important:**
- Do NOT delete the domain or change any other settings
- Propagation takes 1-48 hours (usually under 1 hour)
- The website will have brief downtime during propagation
- After this change, all DNS is managed in Cloudflare — GoDaddy only holds the registration

### Step 3: Confirm with Peter

Let Peter know once the nameservers are saved. He can verify propagation and complete the remaining setup.

---

## Part 2: Cloudflare Setup (Peter)

### Step 1: Add Domain to Cloudflare

1. Log in to Cloudflare Dashboard: https://dash.cloudflare.com/
2. Click **"Add a site"**
3. Enter `houseofinspirationtokyo.com`
4. Select the **Free** plan
5. Cloudflare will scan existing DNS records — review and keep any that exist
6. Cloudflare will display **two nameservers** — send these to the GoDaddy admin (Part 1)
7. Click **Continue** — the domain will show as "Pending nameserver update"

### Step 2: Wait for Nameserver Propagation

- Cloudflare will email you once the nameservers are active
- You can also check status on the domain's overview page in Cloudflare
- Usually takes 15 minutes to a few hours

### Step 3: Add Custom Domain to Cloudflare Pages

1. In Cloudflare Dashboard, go to **Workers & Pages** > **healing-garden**
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter `houseofinspirationtokyo.com` > click **Continue** > **Activate domain**
5. Repeat for `www.houseofinspirationtokyo.com`
6. Cloudflare auto-creates the CNAME records and provisions SSL

### Step 4: Verify

- Visit https://houseofinspirationtokyo.com — should load the app
- Visit https://www.houseofinspirationtokyo.com — should redirect or load
- SSL certificate should be active (padlock icon)

---

## Part 3: Update Services (Peter)

Once the domain is live, update all services that reference the old pages.dev URL.

### 3a. Cloudflare Environment Variable

```bash
npx wrangler pages secret put APP_URL
# Enter: https://houseofinspirationtokyo.com
```

### 3b. Supabase Auth Settings

In Supabase Dashboard > Authentication > URL Configuration:

| Setting | New Value |
|---|---|
| Site URL | `https://houseofinspirationtokyo.com` |
| Redirect Allow List | `https://houseofinspirationtokyo.com/**,https://www.houseofinspirationtokyo.com/**,https://healing-garden-3w5.pages.dev/**,http://localhost:8788/**` |

### 3c. Google OAuth (Google Cloud Console)

1. Go to https://console.cloud.google.com/ > APIs & Services > Credentials
2. Edit the OAuth 2.0 Client ID used for Healing Garden
3. Under **Authorized JavaScript origins**, add:
   - `https://houseofinspirationtokyo.com`
4. Under **Authorized redirect URIs**, add:
   - `https://lmgznapsmdgmbwgulsyt.supabase.co/auth/v1/callback` (should already be there)
5. Save

### 3d. Apple Sign In (Apple Developer)

1. Go to https://developer.apple.com/ > Certificates, Identifiers & Profiles
2. Edit the Services ID `com.healinggarden.web`
3. Under **Return URLs**, add:
   - `https://lmgznapsmdgmbwgulsyt.supabase.co/auth/v1/callback` (should already be there)
4. Under **Domains and Subdomains**, add:
   - `houseofinspirationtokyo.com`
5. Save

### 3e. LINE Login (LINE Developers Console)

1. Go to https://developers.line.biz/ > your channel
2. Under **LINE Login** > **Callback URL**, add:
   - `https://houseofinspirationtokyo.com/api/auth/line-callback`
3. Keep the old pages.dev callback URL as well
4. Save

### 3f. Stripe Webhook

1. Go to https://dashboard.stripe.com/test/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://houseofinspirationtokyo.com/api/stripe-webhook`
4. Events: `checkout.session.completed`, `checkout.session.expired`
5. Copy the new **Signing secret** (`whsec_...`)
6. Update the Cloudflare secret:
   ```bash
   npx wrangler pages secret put STRIPE_WEBHOOK_SECRET
   # Enter the new whsec_ value
   ```
7. Optionally disable the old pages.dev webhook endpoint

### 3g. Code Changes (hardcoded fallback URLs)

Update fallback URLs in 3 files (Peter will do this):

- `functions/api/send-email.js` line 26
- `functions/api/create-checkout-session.js` line 28
- `functions/api/stripe-webhook.js` line 10

### 3h. Deploy

```bash
npx wrangler pages deploy . --project-name=healing-garden --commit-dirty=true
```

---

## Verification Checklist

After all steps are complete, test each flow on the new domain:

- [ ] Site loads at https://houseofinspirationtokyo.com
- [ ] SSL certificate active (padlock)
- [ ] www redirects properly
- [ ] Demo login works
- [ ] Google OAuth login works
- [ ] Apple Sign In works
- [ ] LINE Login works
- [ ] Magic link email contains new domain URL
- [ ] Stripe checkout redirects back to new domain
- [ ] Stripe webhook fires successfully (check Stripe Dashboard > Webhooks)
- [ ] Email notifications contain new domain links
- [ ] Old pages.dev URL still works (as fallback)

---

## Timeline

| Step | Who | Est. Time |
|---|---|---|
| Add domain to Cloudflare, get nameservers | Peter | 5 min |
| Update nameservers in GoDaddy | GoDaddy Admin | 5 min |
| DNS propagation | (waiting) | 15 min - 48 hrs |
| Add custom domain to CF Pages | Peter | 5 min |
| Update all services (3a-3g) | Peter | 30 min |
| Deploy + verify | Peter | 15 min |
