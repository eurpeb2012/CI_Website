-- Migration 008: Therapist profile fields — legal name, structured address, DOB, phone, visibility toggles
-- Run in Supabase SQL Editor

ALTER TABLE therapists
  ADD COLUMN IF NOT EXISTS legal_name TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS dob TEXT,
  ADD COLUMN IF NOT EXISTS addr_street TEXT,
  ADD COLUMN IF NOT EXISTS addr_city TEXT,
  ADD COLUMN IF NOT EXISTS addr_prefecture TEXT,
  ADD COLUMN IF NOT EXISTS addr_country TEXT DEFAULT 'Japan',
  ADD COLUMN IF NOT EXISTS addr_postcode TEXT,
  ADD COLUMN IF NOT EXISTS show_email BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS show_phone BOOLEAN DEFAULT FALSE;

-- Allow 'hidden' as a valid status for hide/pause account feature
-- (no CHECK constraint on status column, so this is already supported)
-- Confirm current status values in use:
-- SELECT DISTINCT status FROM therapists;
