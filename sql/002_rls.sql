-- Healing Garden - Row-Level Security Policies
-- Run this AFTER 001_schema.sql in Supabase SQL Editor

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE retreats ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapist_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_queue ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER: Admin check function
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ============================================================
-- USERS
-- ============================================================

CREATE POLICY "users_read_own" ON users
  FOR SELECT USING (auth.uid() = id OR is_admin());

CREATE POLICY "users_update_own" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "users_insert_own" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_admin_all" ON users
  FOR ALL USING (is_admin());

-- ============================================================
-- THERAPISTS
-- ============================================================

CREATE POLICY "therapists_public_read" ON therapists
  FOR SELECT USING (status = 'active' OR is_admin());

CREATE POLICY "therapists_own_update" ON therapists
  FOR UPDATE USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "therapists_insert" ON therapists
  FOR INSERT WITH CHECK (user_id = auth.uid() OR is_admin());

-- ============================================================
-- SESSIONS
-- ============================================================

CREATE POLICY "sessions_public_read" ON sessions
  FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "sessions_therapist_manage" ON sessions
  FOR ALL USING (
    therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- BOOKINGS
-- ============================================================

CREATE POLICY "bookings_user_read" ON bookings
  FOR SELECT USING (
    user_id = auth.uid()
    OR therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "bookings_user_insert" ON bookings
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "bookings_user_update" ON bookings
  FOR UPDATE USING (
    user_id = auth.uid()
    OR therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- AVAILABILITY
-- ============================================================

CREATE POLICY "availability_public_read" ON availability
  FOR SELECT USING (TRUE);

CREATE POLICY "availability_therapist_manage" ON availability
  FOR ALL USING (
    therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- REVIEWS
-- ============================================================

CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (moderation_status = 'approved' OR is_admin());

CREATE POLICY "reviews_user_insert" ON reviews
  FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- ============================================================
-- MESSAGES
-- ============================================================

CREATE POLICY "messages_participants" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid() OR is_admin());

CREATE POLICY "messages_send" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "messages_mark_read" ON messages
  FOR UPDATE USING (recipient_id = auth.uid());

-- ============================================================
-- FAVORITES
-- ============================================================

CREATE POLICY "favorites_own" ON favorites
  FOR ALL USING (user_id = auth.uid());

-- ============================================================
-- WAITLIST
-- ============================================================

CREATE POLICY "waitlist_own" ON waitlist
  FOR ALL USING (user_id = auth.uid());

-- ============================================================
-- FORUM
-- ============================================================

CREATE POLICY "forum_threads_public_read" ON forum_threads
  FOR SELECT USING (moderation_status = 'approved' OR is_admin());

CREATE POLICY "forum_threads_auth_insert" ON forum_threads
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "forum_threads_own_update" ON forum_threads
  FOR UPDATE USING (author_id = auth.uid() OR is_admin());

CREATE POLICY "forum_replies_public_read" ON forum_replies
  FOR SELECT USING (moderation_status = 'approved' OR is_admin());

CREATE POLICY "forum_replies_auth_insert" ON forum_replies
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "forum_replies_own_update" ON forum_replies
  FOR UPDATE USING (author_id = auth.uid() OR is_admin());

-- ============================================================
-- BLOG
-- ============================================================

CREATE POLICY "blog_public_read" ON blog_articles
  FOR SELECT USING (TRUE);

CREATE POLICY "blog_therapist_manage" ON blog_articles
  FOR ALL USING (
    therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- JOURNAL (fully private)
-- ============================================================

CREATE POLICY "journal_private" ON journal_entries
  FOR ALL USING (user_id = auth.uid());

-- ============================================================
-- RETREATS
-- ============================================================

CREATE POLICY "retreats_public_read" ON retreats
  FOR SELECT USING (is_active = TRUE OR is_admin());

CREATE POLICY "retreats_admin_manage" ON retreats
  FOR ALL USING (is_admin());

-- ============================================================
-- DIGITAL PRODUCTS
-- ============================================================

CREATE POLICY "digital_products_public_read" ON digital_products
  FOR SELECT USING (TRUE);

CREATE POLICY "digital_products_therapist_manage" ON digital_products
  FOR ALL USING (
    therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- GIFT CARDS
-- ============================================================

CREATE POLICY "gift_cards_own" ON gift_cards
  FOR SELECT USING (purchaser_id = auth.uid() OR is_admin());

CREATE POLICY "gift_cards_purchase" ON gift_cards
  FOR INSERT WITH CHECK (purchaser_id = auth.uid());

-- ============================================================
-- POINTS
-- ============================================================

CREATE POLICY "points_own" ON points_transactions
  FOR SELECT USING (user_id = auth.uid() OR is_admin());

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE POLICY "notifications_own" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "notifications_mark_read" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- ============================================================
-- THERAPIST REFERRALS
-- ============================================================

CREATE POLICY "referrals_participants" ON therapist_referrals
  FOR SELECT USING (
    referrer_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR referred_id IN (SELECT id FROM therapists WHERE user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- ADMIN TABLES (admin-only)
-- ============================================================

CREATE POLICY "admin_log_admin_only" ON admin_activity_log
  FOR ALL USING (is_admin());

CREATE POLICY "moderation_admin_only" ON moderation_queue
  FOR ALL USING (is_admin());

-- Allow any authenticated user to report (insert into moderation queue)
CREATE POLICY "moderation_report" ON moderation_queue
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
