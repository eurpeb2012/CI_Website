# Healing Garden - Production Architecture

## Current State (POC)

| Layer | Current | Production Need |
|-------|---------|-----------------|
| Hosting | GitHub Pages (static) | CDN + dynamic backend |
| Data | JS arrays, localStorage | Relational database |
| Auth | Mock login, localStorage | OAuth / email+password |
| Payments | None (mock) | Real payment processing |
| Chat | Mock messages | Real-time WebSocket |
| Video | Simulated UI | WebRTC infrastructure |
| Email | None | Transactional email |
| Files | None | Object storage (images, PDFs, audio/video) |
| Search | Client-side filter | Server-side with indexing |
| Admin | Static mock data | Live database queries |

---

## Recommended Architecture: Supabase + Cloudflare + Stripe

### Why this stack?

| Concern | Decision | Rationale |
|---------|----------|-----------|
| **Cost** | Supabase Free/Pro | Free tier covers MVP; Pro at $25/mo for production |
| **Database** | PostgreSQL (Supabase) | Relational model fits marketplace; strong i18n support with JSONB |
| **Auth** | Supabase Auth | Built-in, free, supports email/password + social (LINE, Google) |
| **Realtime** | Supabase Realtime | Built-in WebSocket for chat/notifications, no extra service |
| **Storage** | Supabase Storage | Built-in S3-compatible, 1GB free, integrated with RLS |
| **API** | Supabase Edge Functions (Deno) | Serverless, no idle cost, runs close to users |
| **Hosting** | Cloudflare Pages | Free tier, global CDN, Japan PoP, fastest TTFB |
| **Payments** | Stripe (Japan) | Supports JPY, konbini, credit cards; 3.6% per transaction in JP |
| **Video** | Daily.co | Free 10K min/mo; simple API; HIPAA-eligible |
| **Email** | Resend | Free 3K emails/mo; simple API; good deliverability |

---

## Architecture Diagram

```
                         ┌─────────────────┐
                         │  Cloudflare DNS  │
                         │  + CDN + Pages   │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼──────────────┐
                    │             │               │
              ┌─────▼─────┐ ┌────▼────┐  ┌──────▼──────┐
              │  SPA (app) │ │  Admin  │  │ Release     │
              │ index.html │ │  Panel  │  │ Notes etc.  │
              └─────┬──────┘ └────┬────┘  └─────────────┘
                    │             │
                    └──────┬──────┘
                           │ HTTPS
              ┌────────────▼────────────┐
              │     Supabase Cloud      │
              │  (Tokyo region: ap-ne1) │
              ├─────────────────────────┤
              │  Auth (email, LINE,     │
              │        Google)          │
              ├─────────────────────────┤
              │  PostgreSQL Database    │
              │  + Row-Level Security   │
              ├─────────────────────────┤
              │  Realtime (WebSocket)   │
              │  → Chat, Notifications  │
              ├─────────────────────────┤
              │  Storage (S3-compat)    │
              │  → Avatars, Gallery,    │
              │    Digital Products     │
              ├─────────────────────────┤
              │  Edge Functions (Deno)  │
              │  → Payment webhooks     │
              │  → Email triggers       │
              │  → Booking logic        │
              │  → Payout calculations  │
              └──────┬──────┬───────────┘
                     │      │
              ┌──────▼──┐ ┌─▼──────────┐
              │ Stripe  │ │  Daily.co  │
              │ (JPY)   │ │  (Video)   │
              └─────────┘ └────────────┘
                     │
              ┌──────▼──────┐
              │   Resend    │
              │  (Email)    │
              └─────────────┘
```

---

## Database Schema (PostgreSQL)

### Core Tables

```sql
-- Users (clients)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'ja' CHECK (language IN ('ja', 'en')),
  theme TEXT DEFAULT 'spring',
  referral_code TEXT UNIQUE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Therapists
CREATE TABLE therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name_ja TEXT NOT NULL,
  name_en TEXT,
  intro_ja TEXT,
  intro_en TEXT,
  location_ja TEXT,
  location_en TEXT,
  avatar_url TEXT,
  avatar_color TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'standard', 'premium')),
  is_founding_member BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  credentials JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  categories TEXT[] NOT NULL,
  delivery_methods TEXT[] NOT NULL,
  response_time TEXT,
  sliding_scale BOOLEAN DEFAULT FALSE,
  popularity_score INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sessions (services offered by therapists)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id) ON DELETE CASCADE,
  name_ja TEXT NOT NULL,
  name_en TEXT,
  description_ja TEXT,
  description_en TEXT,
  price INTEGER NOT NULL,  -- JPY
  duration INTEGER,        -- minutes
  delivery TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  therapist_id UUID REFERENCES therapists(id),
  session_id UUID REFERENCES sessions(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  price INTEGER NOT NULL,
  platform_fee INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  payment_intent_id TEXT,       -- Stripe
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID REFERENCES users(id),
  therapist_id UUID REFERENCES therapists(id),
  booking_id UUID REFERENCES bookings(id),
  review_type TEXT CHECK (review_type IN ('client-to-therapist', 'therapist-to-client')),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  rating_communication INTEGER CHECK (rating_communication BETWEEN 1 AND 5),
  rating_effectiveness INTEGER CHECK (rating_effectiveness BETWEEN 1 AND 5),
  rating_atmosphere INTEGER CHECK (rating_atmosphere BETWEEN 1 AND 5),
  rating_value INTEGER CHECK (rating_value BETWEEN 1 AND 5),
  text_ja TEXT,
  text_en TEXT,
  moderation_status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Chat messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  therapist_id UUID REFERENCES therapists(id),
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ,  -- 3-day message window
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Journal entries
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  mood TEXT NOT NULL,
  mood_emoji TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Forum threads
CREATE TABLE forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  title_ja TEXT,
  title_en TEXT,
  body_ja TEXT,
  body_en TEXT,
  tags TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT FALSE,
  moderation_status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Forum replies
CREATE TABLE forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  body_ja TEXT,
  body_en TEXT,
  moderation_status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Retreats
CREATE TABLE retreats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ja TEXT NOT NULL,
  title_en TEXT,
  description_ja TEXT,
  description_en TEXT,
  location_ja TEXT,
  location_en TEXT,
  provider_ja TEXT,
  provider_en TEXT,
  duration INTEGER,       -- days
  price INTEGER NOT NULL, -- JPY
  includes_ja TEXT[],
  includes_en TEXT[],
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Digital products
CREATE TABLE digital_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id),
  name_ja TEXT NOT NULL,
  name_en TEXT,
  description_ja TEXT,
  description_en TEXT,
  price INTEGER NOT NULL,
  product_type TEXT CHECK (product_type IN ('pdf', 'video', 'audio')),
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog articles
CREATE TABLE blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id),
  title_ja TEXT NOT NULL,
  title_en TEXT,
  excerpt_ja TEXT,
  excerpt_en TEXT,
  body_ja TEXT,
  body_en TEXT,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ DEFAULT now()
);

-- Gift cards
CREATE TABLE gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchaser_id UUID REFERENCES users(id),
  amount INTEGER NOT NULL,
  recipient_email TEXT NOT NULL,
  message TEXT,
  code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired')),
  payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- Favorites
CREATE TABLE favorites (
  user_id UUID REFERENCES users(id),
  therapist_id UUID REFERENCES therapists(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, therapist_id)
);

-- Waitlist
CREATE TABLE waitlist (
  user_id UUID REFERENCES users(id),
  therapist_id UUID REFERENCES therapists(id),
  notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, therapist_id)
);

-- Points
CREATE TABLE points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  points INTEGER NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('earned', 'redeemed')),
  description TEXT,
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Referrals (therapist-to-therapist)
CREATE TABLE therapist_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES therapists(id),
  referred_id UUID REFERENCES therapists(id),
  commission_rate NUMERIC DEFAULT 0.02,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Therapist availability
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES therapists(id),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME,
  end_time TIME,
  UNIQUE (therapist_id, day_of_week, start_time)
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT,
  body TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin activity log
CREATE TABLE admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Moderation queue
CREATE TABLE moderation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL,  -- 'review', 'report', 'forum_post'
  item_id UUID NOT NULL,
  reporter_id UUID REFERENCES users(id),
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'removed', 'dismissed')),
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);
```

### Key Indexes

```sql
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_therapist ON bookings(therapist_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_reviews_therapist ON reviews(therapist_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id, is_read);
CREATE INDEX idx_therapists_categories ON therapists USING GIN(categories);
CREATE INDEX idx_therapists_tier ON therapists(tier);
CREATE INDEX idx_therapists_verified ON therapists(verified);
CREATE INDEX idx_forum_threads_date ON forum_threads(created_at DESC);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
```

---

## Service-by-Service Breakdown

### 1. Hosting & CDN — Cloudflare Pages

| | Detail |
|---|---|
| **What** | Static SPA hosting + CDN |
| **Cost** | Free (unlimited bandwidth, 500 builds/mo) |
| **Japan** | Tokyo PoP, ~5ms TTFB |
| **Alternative** | Vercel (free tier limited to 100GB bandwidth) |

The SPA stays vanilla JS. No framework migration needed. The existing `index.html`, `admin.html`, JS, and CSS deploy as-is, with API calls replacing mock data.

### 2. Database + Auth + Realtime + Storage — Supabase

| | Free Tier | Pro ($25/mo) |
|---|---|---|
| Database | 500MB, 2 projects | 8GB, unlimited |
| Auth | 50K MAU | 100K MAU |
| Realtime | 200 concurrent | 500 concurrent |
| Storage | 1GB | 100GB |
| Edge Functions | 500K invocations | 2M invocations |
| Bandwidth | 5GB | 250GB |
| Region | **ap-northeast-1 (Tokyo)** | Same |

**Why Supabase over alternatives:**

| vs. Firebase | Supabase wins |
|---|---|
| SQL vs NoSQL | Postgres is better for relational marketplace data (bookings, reviews, referrals). Firestore requires denormalization. |
| Vendor lock-in | Supabase is open-source Postgres. Can self-host or migrate. Firebase is proprietary. |
| Pricing | Supabase free tier is more generous. Firebase charges per read/write (unpredictable). |
| Row-Level Security | Postgres RLS > Firestore rules (more powerful, SQL-based). |

| vs. AWS (RDS + Cognito + AppSync) | Supabase wins |
|---|---|
| Complexity | Supabase is one service. AWS requires stitching 5+ services. |
| Cost | AWS free tier expires after 12 months. Supabase free tier is permanent. |
| Setup time | Supabase: 5 minutes. AWS: hours of IAM/VPC/config. |

| vs. PlanetScale + Auth0 | Supabase wins |
|---|---|
| Cost | PlanetScale free tier discontinued. Auth0 free = 7.5K MAU. Supabase bundles everything. |
| Realtime | Not built in for either. Supabase includes WebSocket. |

### 3. Payments — Stripe (Japan)

| | Detail |
|---|---|
| **Fees** | 3.6% per card transaction (Japan rate) |
| **Konbini** | Supported (convenience store payments, big in Japan) |
| **JPY** | Native support |
| **Connect** | Split payments to therapists with Stripe Connect |
| **Cost** | No monthly fee. Pay per transaction only. |

**Payment flows:**
- **Booking**: User pays → Stripe holds → Platform takes 9% fee → Therapist gets remainder via Stripe Connect
- **Gift Card**: User pays → Gift code generated → Recipient redeems as credit
- **Digital Product**: Direct purchase → Therapist receives payout minus fee
- **Retreat**: User pays → Retreat provider receives payout

**Alternative: PAY.JP**
- Japanese-specific provider, 3.0% fees (slightly cheaper)
- No Connect equivalent (would need custom payout logic)
- Less documentation in English
- **Verdict**: Stripe is better for marketplace split-payments

### 4. Video Calls — Daily.co

| | Free | Scale ($0.004/min) |
|---|---|---|
| Minutes | 10,000/mo | Pay per use |
| Participants | 200 | 1,000 |
| Recording | No | Yes |
| HIPAA | No | Yes |

**Why Daily over alternatives:**

| Service | Pros | Cons |
|---|---|---|
| **Daily.co** | Simplest API, generous free tier, prebuilt UI | Less customizable than Twilio |
| Twilio Video | Most flexible, HIPAA | $0.004/min from day 1, complex setup |
| Agora | Good Asia latency | Complex pricing, Chinese company (data concerns) |
| LiveKit | Open-source, self-hostable | Requires server management |
| Jitsi | Free, open-source | Self-host = ops burden, quality issues at scale |

**For MVP**: Daily.co free tier (10K min = ~166 hours/mo). At 30-min average sessions, that's ~333 video sessions/month for free.

### 5. Email — Resend

| | Free | Pro ($20/mo) |
|---|---|---|
| Emails/month | 3,000 | 50,000 |
| Domains | 1 | Unlimited |
| API | REST | REST + SDK |

**Email types needed:**
- Booking confirmations
- Reminders (24h, 1h before)
- Cancellation notices
- Review request (post-session)
- Gift card delivery
- Therapist application status
- Password reset
- Welcome email
- Monthly therapist statements

**Alternative: AWS SES** — $0.10/1K emails (cheaper at scale) but more setup. Resend is simpler for MVP.

---

## Row-Level Security (RLS) Policy Examples

```sql
-- Users can only read/update their own profile
CREATE POLICY "users_own_data" ON users
  FOR ALL USING (auth.uid() = id);

-- Therapist profiles are publicly readable
CREATE POLICY "therapists_public_read" ON therapists
  FOR SELECT USING (status = 'active');

-- Only the therapist owner can update their profile
CREATE POLICY "therapists_own_update" ON therapists
  FOR UPDATE USING (user_id = auth.uid());

-- Users can only see their own bookings
CREATE POLICY "bookings_own" ON bookings
  FOR SELECT USING (user_id = auth.uid());

-- Therapists can see bookings for their sessions
CREATE POLICY "bookings_therapist" ON bookings
  FOR SELECT USING (therapist_id IN (
    SELECT id FROM therapists WHERE user_id = auth.uid()
  ));

-- Chat messages: only sender or recipient can read
CREATE POLICY "messages_participants" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Reviews are publicly readable
CREATE POLICY "reviews_public" ON reviews
  FOR SELECT USING (moderation_status = 'approved');

-- Forum threads are publicly readable
CREATE POLICY "forum_public" ON forum_threads
  FOR SELECT USING (moderation_status = 'approved');

-- Journal entries are private to the user
CREATE POLICY "journal_private" ON journal_entries
  FOR ALL USING (user_id = auth.uid());

-- Admin role bypass (for admin panel)
CREATE POLICY "admin_full_access" ON users
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );
```

---

## Migration Strategy (POC → Production)

### Phase 1: Foundation (Weeks 1-3)
1. Set up Supabase project (Tokyo region)
2. Create database schema (tables above)
3. Implement Supabase Auth (email + LINE login)
4. Replace localStorage with Supabase client queries
5. Deploy SPA to Cloudflare Pages
6. Seed database with existing mock data

### Phase 2: Core Features (Weeks 4-6)
7. Wire up therapist search to Postgres queries
8. Implement real booking flow with date/time selection
9. Integrate Stripe payments (booking checkout)
10. Implement real chat via Supabase Realtime
11. Set up email notifications via Resend

### Phase 3: Rich Features (Weeks 7-9)
12. Integrate Daily.co for video calls
13. Implement file uploads (avatars, gallery, digital products)
14. Wire up forum with real persistence
15. Build therapist payout system (Stripe Connect)
16. Implement gift card purchase and redemption

### Phase 4: Admin & Polish (Weeks 10-12)
17. Connect admin panel to live database
18. Implement moderation workflow
19. Add analytics/reporting queries
20. Implement referral tracking and commission payouts
21. Performance optimization and caching
22. Security audit and penetration testing

---

## Cost Projection

### MVP (0-100 users)

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Cloudflare Pages | Free | ¥0 |
| Supabase | Free | ¥0 |
| Stripe | Pay per use | ~¥0 (transaction fees only) |
| Daily.co | Free (10K min) | ¥0 |
| Resend | Free (3K emails) | ¥0 |
| Domain | .jp domain | ~¥300/mo (¥3,600/yr) |
| **Total** | | **~¥300/mo** |

### Growth (100-1,000 users)

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Cloudflare Pages | Free | ¥0 |
| Supabase | Pro | ¥3,750 ($25) |
| Stripe | 3.6% per txn | Variable (revenue-based) |
| Daily.co | Free / Scale | ¥0–1,500 |
| Resend | Pro | ¥3,000 ($20) |
| Domain | .jp | ~¥300 |
| **Total** | | **~¥7,050/mo (~$47)** |

### Scale (1,000-10,000 users)

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Cloudflare Pages | Pro | ¥3,000 ($20) |
| Supabase | Pro + compute add-ons | ¥7,500–15,000 |
| Stripe | 3.6% per txn | Variable |
| Daily.co | Scale | ¥3,000–15,000 |
| Resend | Business | ¥6,000 ($40) |
| Monitoring (Sentry) | Free tier | ¥0 |
| **Total** | | **~¥20,000–40,000/mo (~$130–270)** |

---

## Technology Migration Path

### Frontend (Minimal changes)

The existing vanilla JS SPA can stay as-is. Add the Supabase JS client:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

Replace patterns like:
```javascript
// BEFORE (mock)
let favorites = JSON.parse(localStorage.getItem('iyashi-favorites') || '[]');

// AFTER (Supabase)
const { data: favorites } = await supabase
  .from('favorites')
  .select('therapist_id')
  .eq('user_id', supabase.auth.getUser().id);
```

### When to consider a framework migration

Stay with vanilla JS **until** one of these is true:
- Team grows beyond 2-3 frontend developers
- Component reuse becomes painful (>50 shared UI patterns)
- Need SSR for SEO (therapist profiles should be indexable)

If/when migrating, recommended: **Next.js** or **Nuxt** (for SSR) or **SvelteKit** (for minimal bundle size).

---

## Security Checklist

- [ ] All API calls over HTTPS (Supabase enforces this)
- [ ] Row-Level Security on every table
- [ ] Stripe webhooks validated with signature verification
- [ ] Rate limiting on Edge Functions (auth, forum posts, reviews)
- [ ] Input sanitization (XSS prevention) before database insert
- [ ] CORS locked to production domain only
- [ ] Admin routes protected by role check
- [ ] File upload validation (type, size limits)
- [ ] Booking amount validated server-side (prevent price manipulation)
- [ ] Chat message expiry enforced server-side (3-day window)
- [ ] GDPR: data export and deletion endpoints
- [ ] Japanese privacy law (APPI) compliance

---

## Alternatives Considered

### Full AWS Stack
**Pros**: Enterprise-grade, unlimited scale, Japan region
**Cons**: 5-10x more complex to set up, ~$100+/mo minimum after free tier expires, requires DevOps expertise
**Verdict**: Overkill for MVP. Consider at 10K+ users if Supabase hits limits.

### Firebase + GCP
**Pros**: Google ecosystem, good mobile SDKs, ML integration
**Cons**: NoSQL (Firestore) is wrong data model for marketplace, unpredictable costs per read/write, vendor lock-in
**Verdict**: Better for chat-first or social apps, not transactional marketplaces.

### Railway / Render + Custom Backend
**Pros**: Full control, any language/framework
**Cons**: Must build auth, realtime, storage from scratch. More ops work.
**Verdict**: Only if the team has strong backend engineers and specific framework preferences.

### Self-Hosted (VPS)
**Pros**: Cheapest at scale ($5-20/mo for a VPS), full control
**Cons**: All ops burden (backups, security patches, scaling, monitoring). Single point of failure.
**Verdict**: Not recommended for a team focused on product iteration.

---

## Summary

| Decision | Choice | Key Reason |
|----------|--------|------------|
| Database | Supabase (Postgres) | Relational model + built-in auth/realtime/storage |
| Hosting | Cloudflare Pages | Free, fastest CDN, Japan PoP |
| Payments | Stripe Japan | JPY + konbini + Connect for marketplace splits |
| Video | Daily.co | 10K free min/mo, simplest API |
| Email | Resend | 3K free emails/mo, clean API |
| Region | Tokyo (ap-northeast-1) | Target market latency |
| MVP cost | ~¥300/mo | Domain only; all services on free tiers |
| Growth cost | ~¥7,000/mo | Supabase Pro + Resend Pro |
