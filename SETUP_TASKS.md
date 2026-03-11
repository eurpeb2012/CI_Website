# Healing Garden - POC to Production Setup Tasks

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

### 2.3 Stripe Payment Integration ✅ (Code Complete — Pending Config)
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
- [x] SQL migration: `sql/005_stripe_updates.sql` (pending_payment status + purchases table)
- [ ] **USER ACTION: Run `sql/005_stripe_updates.sql` in Supabase SQL Editor**
- [ ] **USER ACTION: Set Cloudflare env vars** (see below)
- [ ] **USER ACTION: Create Stripe webhook endpoint** (see below)
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

### 2.5 Email Notifications ✅ (Code Complete — Pending Config)
- [x] Resend account created with API key
- [x] CF Pages Function: `functions/api/send-email.js`
  - Standalone email API endpoint
  - 4 HTML email templates (JP/EN): booking confirmation, reminder, cancellation, gift card
  - Styled templates matching app branding (green gradient header, structured layout)
- [x] Webhook auto-sends emails after Stripe payment completion
- [x] Booking metadata passed through Stripe for email content
- [ ] **USER ACTION: Set `RESEND_API_KEY` env var in Cloudflare**
- [ ] Database triggers for automated reminder emails — DEFERRED

---

## Phase 3: Rich Features — IN PROGRESS (2/5)

### 3.1 Video Calls — NOT STARTED
- [ ] Create Daily.co account
- [ ] Edge Function: create-video-room
- [ ] Per-session room URLs
- [ ] Call duration tracking

### 3.2 File Storage — NOT STARTED
- [ ] Supabase storage buckets: avatars, gallery, products
- [ ] Avatar/gallery/product file upload
- [ ] Signed URLs for paid downloads

### 3.3 Forum (Database-Backed) ✅
- [x] Thread creation → insert into `forum_threads`
- [x] Reply posting → insert into `forum_replies`
- [x] Thread listing with reply counts

### 3.4 Remaining Features ✅ (Partial)
- [x] Favorites migrated to Supabase (`favorites` table)
- [x] Waitlist migrated to Supabase (`waitlist` table)
- [x] Journal entries migrated to Supabase (`journal_entries` table)
- [ ] Points system — NOT WIRED to DB
- [ ] Notifications — NOT WIRED to DB
- [ ] Retreat booking flow — NOT WIRED to Stripe
- [ ] Gift card redemption — NOT WIRED

### 3.5 Therapist Payout System — NOT STARTED
- [ ] Stripe Connect onboarding
- [ ] Monthly payout calculation
- [ ] Earnings dashboard from real data

---

## Phase 4: Admin & Polish — IN PROGRESS (1/4)

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

### 4.1b Admin Panel (Technical/DevOps Scope) — NOT STARTED
- [ ] Login audit logs
- [ ] App performance metrics
- [ ] Error monitoring dashboard
- [ ] Infrastructure status

### 4.2 Performance — NOT STARTED
- [ ] Query caching, lazy-load images, skeleton screens

### 4.3 Security Audit — NOT STARTED
- [ ] RLS verification, Stripe webhook signatures, rate limiting, input sanitization

### 4.4 Launch Prep — NOT STARTED
- [ ] Custom domain + SSL, error monitoring, load testing, privacy policy, PWA manifest

---

## Pending User Actions (Blocking)

### Cloudflare Environment Variables
Set in Cloudflare dashboard → Workers & Pages → healing-garden → Settings → Environment Variables:

| Variable | Value | Status |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_51T9t7a...` | ✅ Set |
| `SUPABASE_URL` | `https://lmgznapsmdgmbwgulsyt.supabase.co` | ✅ Set |
| `APP_URL` | `https://healing-garden-3w5.pages.dev` | ❌ Set via dashboard (wrangler timed out) |
| `SUPABASE_SERVICE_KEY` | Get from Supabase → Settings → API → service_role | ❌ Need from user |
| `STRIPE_WEBHOOK_SECRET` | Get from Stripe after creating webhook | ❌ Need from user |
| `RESEND_API_KEY` | `re_bvneUE4e_FJXNE4Wpxvs7qVZDAkzSXahn` | ❌ Set via dashboard |

### Stripe Webhook Setup
1. Go to Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://healing-garden-3w5.pages.dev/api/stripe-webhook`
3. Events: `checkout.session.completed`, `checkout.session.expired`
4. Copy signing secret (`whsec_...`) → set as `STRIPE_WEBHOOK_SECRET` env var

### SQL Migration
Run `sql/005_stripe_updates.sql` in Supabase SQL Editor

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
