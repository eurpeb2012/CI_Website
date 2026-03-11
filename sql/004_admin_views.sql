-- Admin Views and Platform Settings
-- Run in Supabase SQL Editor after 001-003

-- ============================================================
-- BOOKING DETAIL VIEW (joins bookings + users + therapists + sessions)
-- ============================================================

CREATE OR REPLACE VIEW admin_booking_detail AS
SELECT
  b.id,
  b.booking_date,
  b.booking_time,
  b.price,
  b.platform_fee,
  b.status,
  b.created_at,
  b.cancelled_at,
  b.user_id,
  u.name AS client_name,
  u.email AS client_email,
  b.therapist_id,
  t.name_ja AS therapist_name_ja,
  t.name_en AS therapist_name_en,
  t.tier AS therapist_tier,
  b.session_id,
  s.name_ja AS session_name_ja,
  s.name_en AS session_name_en,
  s.duration AS session_duration
FROM bookings b
LEFT JOIN users u ON b.user_id = u.id
LEFT JOIN therapists t ON b.therapist_id = t.id
LEFT JOIN sessions s ON b.session_id = s.id;

-- ============================================================
-- MONTHLY REVENUE VIEW
-- ============================================================

CREATE OR REPLACE VIEW admin_monthly_revenue AS
SELECT
  DATE_TRUNC('month', booking_date)::date AS month,
  COUNT(*) AS total_bookings,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed_bookings,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_bookings,
  COUNT(*) FILTER (WHERE status = 'upcoming') AS upcoming_bookings,
  COALESCE(SUM(price) FILTER (WHERE status IN ('completed', 'upcoming')), 0) AS gross_revenue,
  COALESCE(SUM(platform_fee) FILTER (WHERE status IN ('completed', 'upcoming')), 0) AS platform_fees,
  COALESCE(SUM(price - platform_fee) FILTER (WHERE status IN ('completed', 'upcoming')), 0) AS therapist_payouts
FROM bookings
GROUP BY DATE_TRUNC('month', booking_date)
ORDER BY month DESC;

-- ============================================================
-- THERAPIST EARNINGS VIEW
-- ============================================================

CREATE OR REPLACE VIEW admin_therapist_earnings AS
SELECT
  t.id AS therapist_id,
  t.name_ja,
  t.name_en,
  t.tier,
  t.verified,
  t.status,
  COUNT(b.id) AS total_bookings,
  COUNT(b.id) FILTER (WHERE b.status = 'completed') AS completed_bookings,
  COALESCE(SUM(b.price) FILTER (WHERE b.status IN ('completed', 'upcoming')), 0) AS gross_revenue,
  COALESCE(SUM(b.platform_fee) FILTER (WHERE b.status IN ('completed', 'upcoming')), 0) AS platform_fees,
  COALESCE(SUM(b.price - b.platform_fee) FILTER (WHERE b.status IN ('completed', 'upcoming')), 0) AS therapist_earnings,
  COALESCE(AVG(r.rating), 0)::numeric(3,2) AS avg_rating,
  COUNT(DISTINCT r.id) AS review_count
FROM therapists t
LEFT JOIN bookings b ON t.id = b.therapist_id
LEFT JOIN reviews r ON t.id = r.therapist_id AND r.review_type = 'client-to-therapist'
GROUP BY t.id, t.name_ja, t.name_en, t.tier, t.verified, t.status;

-- ============================================================
-- REFERRAL SUMMARY VIEW
-- ============================================================

CREATE OR REPLACE VIEW admin_referral_summary AS
SELECT
  tr.referrer_id AS therapist_id,
  t.name_ja,
  t.name_en,
  t.referral_code,
  COUNT(tr.referred_id) AS total_referred,
  ARRAY_AGG(tr.referred_id) AS referred_ids,
  tr.commission_rate,
  COALESCE(SUM(b.price * tr.commission_rate) FILTER (WHERE b.status IN ('completed', 'upcoming')), 0)::integer AS total_commission
FROM therapist_referrals tr
JOIN therapists t ON tr.referrer_id = t.id
LEFT JOIN bookings b ON b.therapist_id = tr.referred_id
GROUP BY tr.referrer_id, t.name_ja, t.name_en, t.referral_code, tr.commission_rate;

-- ============================================================
-- MODERATION DETAIL VIEW
-- ============================================================

CREATE OR REPLACE VIEW admin_moderation_detail AS
SELECT
  mq.id,
  mq.item_type,
  mq.item_id,
  mq.reason,
  mq.status,
  mq.created_at,
  mq.resolved_at,
  reporter.name AS reporter_name,
  reporter.email AS reporter_email,
  -- Try to get the therapist associated with the flagged item
  CASE
    WHEN mq.item_type = 'review' THEN (SELECT t.name_ja FROM reviews rv JOIN therapists t ON rv.therapist_id = t.id WHERE rv.id = mq.item_id)
    WHEN mq.item_type = 'forum_post' THEN NULL
    ELSE NULL
  END AS target_therapist_name,
  CASE
    WHEN mq.item_type = 'review' THEN (SELECT rv.text_ja FROM reviews rv WHERE rv.id = mq.item_id)
    WHEN mq.item_type = 'forum_post' THEN (SELECT ft.body_ja FROM forum_threads ft WHERE ft.id = mq.item_id)
    ELSE NULL
  END AS content_preview
FROM moderation_queue mq
LEFT JOIN users reporter ON mq.reporter_id = reporter.id;

-- ============================================================
-- GRANT ACCESS TO VIEWS
-- ============================================================

GRANT SELECT ON admin_booking_detail TO anon, authenticated;
GRANT SELECT ON admin_monthly_revenue TO anon, authenticated;
GRANT SELECT ON admin_therapist_earnings TO anon, authenticated;
GRANT SELECT ON admin_referral_summary TO anon, authenticated;
GRANT SELECT ON admin_moderation_detail TO anon, authenticated;

-- ============================================================
-- PLATFORM SETTINGS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS platform_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "platform_settings_public_read" ON platform_settings
  FOR SELECT USING (TRUE);

CREATE POLICY "platform_settings_admin_write" ON platform_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

GRANT SELECT ON platform_settings TO anon, authenticated;
GRANT ALL ON platform_settings TO authenticated;

-- Seed default settings
INSERT INTO platform_settings (key, value) VALUES
  ('booking_window', '{"global_max_days": 30, "tier_defaults": {"free": 14, "standard": 30, "premium": 30}}'::jsonb),
  ('platform_fee_percent', '9'::jsonb),
  ('blocked_dates', '[]'::jsonb)
ON CONFLICT (key) DO NOTHING;
