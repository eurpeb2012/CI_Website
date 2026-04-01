-- Migration 009: Client plan fields (booking window enforcement + beta offer)
-- Run in Supabase SQL Editor

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'standard', 'premium')),
  ADD COLUMN IF NOT EXISTS plan_expires_at TIMESTAMPTZ;

-- Grant beta premium to all current users (run this for beta launch)
-- UPDATE users SET plan = 'premium', plan_expires_at = now() + interval '3 months';
