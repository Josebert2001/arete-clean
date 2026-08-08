-- ─── Multi-department support (Phase 1) ──────────────────────────────────────
-- Run manually in the Supabase SQL editor (same as 20260719000000_google_connections).
-- Idempotent: safe to re-run.
--
-- Opens Areté to students outside the Cybersecurity department. The frontend
-- department registry lives in src/data/departments.js; this only stores which
-- department a student picked. No RLS changes — existing policies are per-user.

-- Which department catalogue the student sees. 'cybersecurity' is the full
-- catalogue; 'general' is the shared-foundation view (GST/MTH/PHY/COS/… courses
-- every science programme takes). Existing rows are all CYB students, so the
-- default backfills them correctly.
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS department TEXT NOT NULL DEFAULT 'cybersecurity';

-- Free-text department name captured when a student picks "my department isn't
-- listed yet". This is the demand signal for which catalogue to author next:
--   SELECT lower(trim(department_other)) AS dept, count(*)
--   FROM profiles WHERE department_other IS NOT NULL
--   GROUP BY 1 ORDER BY count(*) DESC;
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS department_other TEXT;

-- Scope uploads per department so two departments' catalogues can both have
-- e.g. an mth-111 slug without their materials mixing. Everything uploaded so
-- far belongs to the CYB catalogue, so the default backfills correctly.
ALTER TABLE course_materials
  ADD COLUMN IF NOT EXISTS department TEXT NOT NULL DEFAULT 'cybersecurity';

-- PostgREST caches the table schema, and its auto-reload after DDL is a known
-- failure point on Supabase. Without a reload the API keeps rejecting writes to
-- the new columns with PGRST204 ("Could not find the 'department' column of
-- 'profiles' in the schema cache") — which would break SetupProfile.jsx for
-- every new student. Ask for the reload, then poke the notification queue,
-- which is Supabase's documented fallback when the NOTIFY alone doesn't take.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
