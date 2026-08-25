-- Platform feedback (the floating "Feedback" tab, src/components/FeedbackTab.jsx).
-- Run manually in the Supabase SQL editor (same as every other migration here).
-- Idempotent: safe to re-run.

CREATE TABLE IF NOT EXISTS feedback (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating     SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message    TEXT,
  page       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Students can submit feedback but not read, edit, or delete it back — this is
-- a suggestion box, not a comments feed. Reviewing submissions happens in the
-- Supabase table editor (service role / dashboard access bypasses RLS).
DROP POLICY IF EXISTS "Users submit feedback" ON feedback;
CREATE POLICY "Users submit feedback" ON feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- PostgREST schema cache reload — see 20260728000000_departments.sql for why
-- this is needed after every DDL change.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
