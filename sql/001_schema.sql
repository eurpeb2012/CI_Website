-- Healing Garden - Full Database Schema Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ============================================================
-- CORE TABLES
-- ============================================================

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
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'therapist', 'admin')),
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
  price INTEGER NOT NULL,
  duration INTEGER,
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
  payment_intent_id TEXT,
  cancelled_at TIMESTAMPTZ,
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

-- ============================================================
-- SOCIAL TABLES
-- ============================================================

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
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
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

-- ============================================================
-- CONTENT TABLES
-- ============================================================

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

-- Journal entries
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  mood TEXT NOT NULL,
  mood_emoji TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- COMMERCE TABLES
-- ============================================================

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
  duration INTEGER,
  price INTEGER NOT NULL,
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

-- ============================================================
-- SYSTEM TABLES
-- ============================================================

-- Points transactions
CREATE TABLE points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  points INTEGER NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('earned', 'redeemed')),
  description TEXT,
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT now()
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

-- Therapist referrals
CREATE TABLE therapist_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES therapists(id),
  referred_id UUID REFERENCES therapists(id),
  commission_rate NUMERIC DEFAULT 0.02,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ADMIN TABLES
-- ============================================================

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
  item_type TEXT NOT NULL,
  item_id UUID NOT NULL,
  reporter_id UUID REFERENCES users(id),
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'removed', 'dismissed')),
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- ============================================================
-- INDEXES
-- ============================================================

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
CREATE INDEX idx_points_user ON points_transactions(user_id);
CREATE INDEX idx_journal_user ON journal_entries(user_id);
CREATE INDEX idx_availability_therapist ON availability(therapist_id);
