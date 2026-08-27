-- Close the course_materials injection channel, and give the table a takedown
-- path it never had. Run manually in the Supabase SQL editor. Idempotent.
--
-- ─── ORDER OF OPERATIONS — READ THIS FIRST ──────────────────────────────────
-- This migration REVOKES the browser's ability to insert a material row. The
-- matching client change (src/components/CourseMaterials.jsx posting to
-- /api/extract instead of inserting directly) must be DEPLOYED FIRST, or every
-- upload fails between the SQL running and the deploy landing.
--
-- It also requires SUPABASE_SERVICE_ROLE_KEY to be set in the Vercel project —
-- api/extract.js needs it to write the row. It answers 503 without it, so a
-- missing key shows up as "uploads unavailable", not as silent data loss.
--
-- ─── WHY ────────────────────────────────────────────────────────────────────
-- The old insert policy checked `auth.uid() = uploaded_by` and nothing else, so
-- every other column was whatever the browser chose to send. Any signed-in
-- student could POST to PostgREST directly and file arbitrary `extracted_text`
-- against any course in any pool, with no file involved at all — and that text
-- is injected into the AI tutor's context for every student who asks about that
-- course. The tutor takes the two most RECENT rows, so a planted row also
-- displaced the genuine notes rather than merely joining them.
--
-- The fix is structural, not another sanitiser: the browser no longer writes
-- this table. api/extract.js derives course_code, department and uploaded_by
-- itself and extracts the text from the bytes actually in storage.

-- ─── 1. The browser can no longer insert ────────────────────────────────────
-- Both are needed: dropping the policy alone would still leave the table-level
-- INSERT grant in place for a future policy to satisfy.
DROP POLICY IF EXISTS "Authenticated insert" ON course_materials;
DROP POLICY IF EXISTS "Public insert" ON course_materials;
REVOKE INSERT ON course_materials FROM authenticated, anon;

-- No INSERT policy is created. Writes go through api/extract.js on the
-- service-role client, which bypasses RLS by design — the same arrangement
-- google_connections already uses for its token writes.

-- ─── 2. Reads: signed-in only, and never the uploader's id ──────────────────
-- The old policy was `FOR SELECT USING (true)` with no role restriction, so
-- anyone holding the anon key (it ships in every page load, by design) could
-- read every row — including uploaded_by, which correlates each upload to a
-- user's UUID. Every page that lists materials is behind a RequireAuth route,
-- and the tutor's note lookup now uses the student's own client rather than an
-- anonymous one, so nothing needs anonymous read.
DROP POLICY IF EXISTS "Public read" ON course_materials;
DROP POLICY IF EXISTS "Authenticated read" ON course_materials;
CREATE POLICY "Authenticated read" ON course_materials
  FOR SELECT TO authenticated USING (true);

-- Column-level defence in depth, the same technique used on
-- google_connections.refresh_token: even a future `select *` cannot leak the
-- uploader's id. extracted_text deliberately STAYS readable — sharing note text
-- with classmates is the entire point of the feature.
REVOKE ALL ON course_materials FROM anon, authenticated;
GRANT SELECT (
  id, course_code, course_slug, department, display_name,
  file_path, file_size, file_type, description, extracted_text, uploaded_at
) ON course_materials TO authenticated;

-- ─── 3. A takedown path ─────────────────────────────────────────────────────
-- There was previously no UPDATE or DELETE policy at all, so nothing could be
-- removed except from the Supabase dashboard: a student who uploaded the wrong
-- file, or a note that turned out to be someone else's copyrighted material,
-- had no route to pull it. Uploaders can now delete their own rows.
GRANT DELETE ON course_materials TO authenticated;
DROP POLICY IF EXISTS "Uploaders delete own materials" ON course_materials;
CREATE POLICY "Uploaders delete own materials" ON course_materials
  FOR DELETE TO authenticated USING (auth.uid() = uploaded_by);

-- Still no UPDATE policy, deliberately: an editable row would re-open exactly
-- the channel section 1 closes — a student could insert a clean note through
-- the server and then rewrite extracted_text afterwards.

-- ─── 4. "Is this mine?" without exposing whose it is ────────────────────────
-- The UI needs to show a Delete control on a student's own uploads, which the
-- revoked uploaded_by column can no longer answer. This view resolves the
-- comparison server-side and returns only the boolean, so the id never leaves
-- the database. security_invoker makes the view run as the querying user, so
-- the SELECT policy above still applies to it — without that a view owned by a
-- superuser would hand back every row regardless of policy.
DROP VIEW IF EXISTS course_materials_visible;
CREATE VIEW course_materials_visible
  WITH (security_invoker = true) AS
  SELECT
    id, course_code, course_slug, department, display_name,
    file_path, file_size, file_type, description, extracted_text, uploaded_at,
    (uploaded_by = auth.uid()) AS uploaded_by_me
  FROM course_materials;

GRANT SELECT ON course_materials_visible TO authenticated;

-- PostgREST caches the schema; without this the API keeps answering from the
-- old grants. See 20260728000000_departments.sql.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
