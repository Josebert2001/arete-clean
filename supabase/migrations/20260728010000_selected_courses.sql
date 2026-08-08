-- ─── "Pick your courses" (Phase 2) ────────────────────────────────────────────
-- Run manually in the Supabase SQL editor (same as the two migrations before
-- it). Idempotent: safe to re-run.
--
-- Lets a foundation-mode student (see 20260728000000_departments.sql) pin the
-- subset of shared courses that match their own programme, instead of always
-- seeing every course for their level. NULL means "not customized" — the app
-- falls back to the auto-derived level+semester list, which is today's
-- behaviour for every Cybersecurity student and untouched by this column.
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS selected_courses TEXT[];

-- Reload PostgREST's schema cache so the new column is writable through the
-- API immediately — see the note in 20260728000000_departments.sql.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
