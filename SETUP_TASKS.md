# Healing Garden - POC to Production Setup Tasks

> **Overall Progress: ~90% complete** — Phase 1-3 done, Phase 4 nearly done. Only launch prep (4.4) and therapist payouts (3.5) remain as deferred items. App is live and functional at https://healing-garden-3w5.pages.dev/

## Prerequisites (User)

- [x] **1. Create Supabase account** — https://supabase.com (free)
- [x] **2. Create Supabase project** — `healing-garden`, region: Northeast Asia (Tokyo)
- [x] **3. Generate Supabase access token**
- [x] **4. Supabase JS client via CDN** — configured in `js/supabase.js`
- [x] **5. Create Cloudflare account**
- [x] **6. Install & login Wrangler CLI** — wrangler 4.71.0
- [x] **7. Create Stripe account** — test keys configured
- [x] **8. Create Resend account** — API key configured

---

## Phase 1: Foundation — COMPLETE

### 1.1 Supabase Project Setup ✅
- [x] Create Supabase project in Tokyo region
- [x] Note project URL and anon key
- [x] Add project URL/keys to app config (`js/supabase.js`)
- [x] CDN added to `index.html` and `admin.html`

### 1.2 Database Schema ✅
- [x] Created 20 tables + 13 indexes (`sql/001_schema.sql`)
- [x] Seeded 11 tables with mock data (`sql/003_seed.sql` — 1417 lines)
  - 29 users, 8 therapists, 19 sessions, 82 availability slots, 5 bookings, 22 reviews, 4 retreats, 6 blog articles, 5 digital products, 6 referrals, 3 forum threads + 6 replies

### 1.3 Row-Level Security ✅
- [x] RLS enabled on all tables (`sql/002_rls.sql`)
- [x] 30 policies + `is_admin()` helper function
- [x] `GRANT SELECT` to anon role for Supabase REST API access

### 1.4 Authentication ✅ (Partial)
- [x] Demo login with Supabase auth state
- [ ] Google OAuth — DEFERRED
- [ ] Apple OAuth — DEFERRED

### 1.5 Frontend Auth Integration ✅
- [x] Supabase JS client in `index.html`
- [x] Auth state driven by Supabase sessions (`initSupabaseAuth()`, `setAuthFromSession()`)
- [x] Demo login button (simplified signup page)
- [x] `onLogout()` calls `supabase.auth.signOut()`

### 1.6 Cloudflare Pages Deployment ✅
- [x] Project created: `healing-garden`
- [x] Live at: https://healing-garden-3w5.pages.dev/
- [x] Deploy: `npx wrangler pages deploy . --project-name=healing-garden --commit-dirty=true`

---

## Phase 2: Core Features — COMPLETE (5/5)

### 2.1 Therapist Search (Database-Backed) ✅
- [x] `supabase-data.js` fetches therapists, retreats, blog, digital products, forum from Supabase
- [x] Transforms DB rows (flat `name_ja`/`name_en`) to nested JS objects (`name: {ja, en}`)
- [x] Falls back to mock data on error
- [x] Category/delivery/price filters working
- [x] Route regexes updated for UUID support
- [x] UUID-safe onclick handlers (all ID args quoted for Supabase compatibility)
- [x] String-based ID comparison in detail pages (retreat, blog, session edit)

### 2.2 Booking System ✅
- [x] Real calendar with date/time slot selection
- [x] Conflict detection (prevent double-booking)
- [x] Booking record created in database on confirm
- [x] Booking history queries from DB

### 2.3 Stripe Payment Integration ✅
- [x] Stripe account created with test keys (`pk_test_...`, `sk_test_...`)
- [x] CF Pages Function: `functions/api/create-checkout-session.js`
  - Handles 3 purchase types: booking, gift card, digital product
  - Creates pending booking in Supabase before checkout
  - Uses Stripe Checkout (hosted) — no PCI burden
  - JPY zero-decimal currency handled correctly
  - 9% platform fee calculated and stored
- [x] CF Pages Function: `functions/api/stripe-webhook.js`
  - Verifies Stripe signature using Web Crypto API (HMAC-SHA256)
  - Handles `checkout.session.completed` → updates booking status, creates gift cards, records purchases
  - Handles `checkout.session.expired` → cancels pending bookings
  - Sends confirmation emails via Resend after payment
- [x] Frontend wired: booking confirm → Stripe Checkout → success page
- [x] Gift card purchase wired to Stripe (amount selection + recipient email)
- [x] Digital product purchase wired to Stripe
- [x] SQL migration: `sql/005_stripe_updates.sql` — applied
- [x] Cloudflare env vars set (all 5 via wrangler secrets)
- [x] Stripe webhook endpoint created (`checkout.session.completed` + `checkout.session.expired`)
- [x] Stripe running in **sandbox/test mode** — ready for end-to-end testing
- [ ] Stripe Connect for therapist payouts — DEFERRED to Phase 3.5

### 2.4 Real-Time Chat ✅
- [x] Supabase Realtime subscription on messages table
- [x] Real message insert/select
- [x] Message persistence in database
- [x] Messages list page (`#/messages`) with conversation list
- [x] Chat empty state with compose prompt
- [x] Unread indicators on conversation list
- [x] Message delivery status (✓ sent / ✓✓ read)
- [x] Action bar in chat (video call, view profile, book session)

### 2.5 Email Notifications ✅
- [x] Resend account created with API key
- [x] CF Pages Function: `functions/api/send-email.js`
  - Standalone email API endpoint
  - 4 HTML email templates (JP/EN): booking confirmation, reminder, cancellation, gift card
  - Styled templates matching app branding (green gradient header, structured layout)
- [x] Webhook auto-sends emails after Stripe payment completion
- [x] Booking metadata passed through Stripe for email content
- [x] `RESEND_API_KEY` env var set in Cloudflare
- [ ] Database triggers for automated reminder emails — DEFERRED

---

## Phase 3: Rich Features — COMPLETE (5/5)

### 3.1 Video Calls ✅
- [x] CF Pages Function: `functions/api/create-video-room.js`
  - Creates temporary Daily.co rooms (1hr expiry, max 2 participants)
  - Generates meeting tokens for secure access
- [x] Daily.co prebuilt iframe embedded in video call screen
- [x] Graceful fallback: placeholder UI when Daily.co not configured
- [x] Call duration tracking with Supabase `video_call_logs` table
- [x] End call cleanup (iframe removal, duration logging)
- [x] SQL migration: `sql/006_video_calls.sql` — applied
- [x] Daily.co account created: `healinggarden.daily.co`
- [x] `DAILY_API_KEY` env var set in Cloudflare

### 3.2 File Storage ✅ (Partial)
- [x] Avatar upload for users and therapists (Supabase storage)
- [x] File validation: 2MB max, JPEG/PNG/WebP only
- [x] Upload wired to: user profile, therapist profile edit, apply form
- [x] Supabase storage bucket created: `avatars` (public)
- [ ] Gallery image management — DEFERRED
- [ ] Signed URLs for paid digital product downloads — DEFERRED

### 3.3 Forum (Database-Backed) ✅
- [x] Thread creation → insert into `forum_threads`
- [x] Reply posting → insert into `forum_replies`
- [x] Thread listing with reply counts

### 3.4 Remaining Features ✅
- [x] Favorites migrated to Supabase (`favorites` table)
- [x] Waitlist migrated to Supabase (`waitlist` table)
- [x] Journal entries migrated to Supabase (`journal_entries` table)
- [x] Points system wired to Supabase (`points_transactions` table) — earn, redeem, load from DB
- [x] Notifications wired to Supabase (`notifications` table) — fetch, mark read, unread badge
- [x] Retreat booking flow wired to Stripe checkout
- [x] Gift card redemption — code lookup, validation, expiry check, points credit

### 3.5 Therapist Payout System — NOT STARTED
- [ ] Stripe Connect onboarding
- [ ] Monthly payout calculation
- [ ] Earnings dashboard from real data

---

## Phase 4: Admin & Polish — IN PROGRESS (4/5)

### 4.1 Admin Panel (Business Scope) ✅
- [x] 10 admin screens with async renders + loading indicators
- [x] Dashboard: aggregate stats from Supabase views
- [x] Bookings: filterable list from `admin_booking_detail` view
- [x] Revenue: monthly chart from `admin_monthly_revenue` view
- [x] Users: search/filter from `users` table
- [x] Therapists: list from `admin_therapist_earnings` view
- [x] Therapist Detail: status/tier/verified CRUD
- [x] Moderation: queue from `admin_moderation_detail` view
- [x] Referrals: summary from `admin_referral_summary` view
- [x] Content: counts from multiple tables
- [x] Calendar Settings: from `platform_settings` table
- [x] DB views created (`sql/004_admin_views.sql`)

### 4.1b Admin Panel (Technical/DevOps Scope) ✅
- [x] Audit Log screen — filterable event log (bookings, signups, moderation)
- [x] System Health screen — DB latency, Stripe status, table stats, environment info
- [x] Refresh button for real-time health checks

### 4.2 Performance ✅ (Partial)
- [x] Skeleton loading screen during initial data load (pulse animation)
- [ ] Query caching — data already cached in memory after init
- [ ] Lazy-load images — not needed yet (avatars are emoji/color-based)
- [ ] Pagination for large result sets — DEFERRED

### 4.3 Security Audit ✅
- [x] XSS prevention: `_escapeHtml()` applied to all user-generated content
  - Journal notes, forum titles/bodies/replies, review text, moderation content
- [x] Admin auth gate: checks Supabase session + admin role before loading panel
- [x] Rate limiting on all API endpoints (per-IP, per-minute):
  - Checkout: 10/min, Email: 5/min, Video rooms: 5/min
- [x] RLS verified: all tables have row-level security enabled
- [x] Stripe webhook signature verification (HMAC-SHA256, constant-time comparison)
- [x] SQL injection: safe — all queries use Supabase parameterized methods
- [x] Secrets: all API keys stored as Cloudflare encrypted secrets, not in client code

### 4.4 Launch Prep — NOT STARTED
- [ ] Custom domain + SSL, error monitoring, load testing, privacy policy, PWA manifest

---

## Configuration Status — ALL SET ✅

### Cloudflare Environment Variables (Secrets)
All set via `wrangler pages secret put` on Mar 11, 2026:

| Variable | Status |
|---|---|
| `STRIPE_SECRET_KEY` | ✅ Set |
| `SUPABASE_URL` | ✅ Set |
| `SUPABASE_SERVICE_KEY` | ✅ Set |
| `APP_URL` | ✅ Set |
| `STRIPE_WEBHOOK_SECRET` | ✅ Set |
| `RESEND_API_KEY` | ✅ Set |
| `DAILY_API_KEY` | ✅ Set |

### Stripe Webhook
- ✅ Endpoint: `https://healing-garden-3w5.pages.dev/api/stripe-webhook`
- ✅ Events: `checkout.session.completed`, `checkout.session.expired`

### SQL Migrations
- ✅ `sql/005_stripe_updates.sql` — applied
- ✅ `sql/006_video_calls.sql` — applied

### Supabase Storage
- ✅ `avatars` bucket created (public)

### Going Live (Future)
When ready to accept real payments:
1. Create Stripe live keys (`pk_live_...`, `sk_live_...`) in Stripe Dashboard
2. Update `STRIPE_SECRET_KEY` env var in Cloudflare with live secret key
3. Update `js/app.js` Stripe publishable key to `pk_live_...`
4. Create a new webhook endpoint in Stripe (live mode) and update `STRIPE_WEBHOOK_SECRET`

---

## Testing Stripe Checkout (Sandbox Mode)

Stripe is running in **sandbox/test mode** — no real charges are made.

### How to Test
1. Go to https://healing-garden-3w5.pages.dev/
2. Log in with demo account
3. Find a therapist → select a session → pick date/time → confirm booking
4. You'll be redirected to Stripe's hosted checkout page

### Test Card Numbers
| Card | Number | Behavior |
|---|---|---|
| **Visa (success)** | `4242 4242 4242 4242` | Payment succeeds |
| **Visa (declined)** | `4000 0000 0000 0002` | Payment is declined |
| **Requires auth** | `4000 0025 0000 3155` | 3D Secure authentication required |

- **Expiry**: Any future date (e.g., `12/30`)
- **CVC**: Any 3 digits (e.g., `123`)
- **Name/Address**: Any values

### What to Verify After Successful Payment
1. **Stripe Dashboard** (https://dashboard.stripe.com/test/payments) — payment appears
2. **Supabase** — booking status changes from `pending_payment` to `upcoming`
3. **Email** — confirmation email sent via Resend (check Resend dashboard if not received)
4. **App** — redirects back to success page

### Test Flows
- **Booking**: Therapist → Session → Calendar → Checkout → ✓ Booking confirmed
- **Gift Card**: Gift Card page → Amount → Recipient email → Checkout → ✓ Gift card code generated + emailed
- **Digital Product**: Digital Products → Buy → Checkout → ✓ Purchase recorded

### Viewing Webhook Activity
- Stripe Dashboard → Developers → Webhooks → click endpoint → see event deliveries
- Check for `checkout.session.completed` events with 200 response

---

## Recent Bug Fixes (Mar 11, 2026)

- Fixed chat/messages navigation: added Messages list page, corrected nav tab highlighting
- Fixed UUID onclick handlers: quoted all ID arguments so Supabase UUIDs don't break JS
- Fixed UUID comparison in detail pages: retreat, blog, session edit use String() not parseInt()
- Added error handling to router/render/init to prevent silent failures
- Made Supabase client initialization resilient to CDN load failures

---

## Reference

- Architecture details: [ARCHITECTURE.md](ARCHITECTURE.md)
- Live site: https://healing-garden-3w5.pages.dev/
- Repo: https://github.com/eurpeb2012/CI_Website
- Stripe Dashboard: https://dashboard.stripe.com/test
- Supabase Dashboard: https://supabase.com/dashboard
- Resend Dashboard: https://resend.com
