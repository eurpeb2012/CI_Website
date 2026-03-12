-- =====================================================
-- 006: Video Call Logs
-- Run in Supabase SQL Editor
-- =====================================================

-- Video call duration tracking
CREATE TABLE IF NOT EXISTS video_call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  therapist_id UUID REFERENCES therapists(id),
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_video_call_user ON video_call_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_video_call_therapist ON video_call_logs(therapist_id);

-- RLS
ALTER TABLE video_call_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "video_calls_own" ON video_call_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "video_calls_insert" ON video_call_logs
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin access
CREATE POLICY "video_calls_admin" ON video_call_logs
  FOR ALL USING (is_admin());

-- Grant anon access for insert (demo mode)
GRANT INSERT ON video_call_logs TO anon;
GRANT SELECT ON video_call_logs TO anon;
