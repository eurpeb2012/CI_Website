-- Migration 010: Clear demo/seed data before beta launch
-- WARNING: This is irreversible. Run only when ready to go live.
-- Run in Supabase SQL Editor

-- Order matters due to foreign keys

DELETE FROM video_call_logs WHERE TRUE;
DELETE FROM notifications WHERE TRUE;
DELETE FROM points_transactions WHERE TRUE;
DELETE FROM journal_entries WHERE TRUE;
DELETE FROM waitlist WHERE TRUE;
DELETE FROM favorites WHERE TRUE;
DELETE FROM forum_replies WHERE TRUE;
DELETE FROM forum_threads WHERE TRUE;
DELETE FROM referrals WHERE TRUE;
DELETE FROM digital_product_purchases WHERE TRUE;
DELETE FROM gift_cards WHERE TRUE;
DELETE FROM bookings WHERE TRUE;
DELETE FROM availability WHERE TRUE;
DELETE FROM sessions WHERE TRUE;
DELETE FROM reviews WHERE TRUE;
DELETE FROM retreats WHERE TRUE;
DELETE FROM blog_articles WHERE TRUE;
DELETE FROM digital_products WHERE TRUE;
DELETE FROM therapists WHERE TRUE;

-- Remove all seeded users EXCEPT real admin accounts
-- Adjust the WHERE clause to preserve your real user IDs
DELETE FROM users
  WHERE email LIKE '%@healinggarden.jp'
    OR id::text LIKE '00000000-0000-0000-0000-0000000000%';

-- Reset platform_settings to defaults if needed
-- UPDATE platform_settings SET value = default_value;
