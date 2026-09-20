-- ─── Let signed-in students SEE open sessions (Phase 1 fix) ──────────────────
-- Run in the Supabase SQL editor. Idempotent: safe to re-run.
--
-- The base attendance migration only lets a student read a session they were
-- already marked in — which is a chicken-and-egg problem: they cannot pick a
-- session to check into if they cannot see it first. This adds a second, read-
-- only permission so any signed-in user can see sessions that are OPEN right
-- now. It does not let them mark attendance directly — that still goes only
-- through the check_in() function.

DROP POLICY IF EXISTS "anyone sees open sessions" ON class_sessions;
CREATE POLICY "anyone sees open sessions" ON class_sessions
  FOR SELECT
  USING (status = 'open' AND now() < closes_at);

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
