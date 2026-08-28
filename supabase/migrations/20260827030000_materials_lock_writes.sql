-- Course materials, part 2 of 2: the RESTRICTIVE half.
-- Run manually in the Supabase SQL editor. Idempotent.
--
-- ─── RUN THIS ONLY AFTER THE CODE IS DEPLOYED ───────────────────────────────
-- This takes permissions away. Every statement below breaks the OLD frontend:
--   * the revoked INSERT is what the old CourseMaterials.jsx used to save an
--     upload — running this first makes every upload fail until the deploy lands
--   * the authenticated-only read policy cuts off the tutor's old anonymous
--     client, so uploaded notes would silently vanish from AI answers
-- The additive half (20260827010000_materials_read_view) must already have run,
-- and SUPABASE_SERVICE_ROLE_KEY must be set in Vercel — api/extract.js needs it
-- to write rows once the browser cannot. Without the key uploads answer 503,
-- which is visible rather than silent, but they are still down.
--
-- ─── WHY ────────────────────────────────────────────────────────────────────
-- The insert policy checked `auth.uid() = uploaded_by` and nothing else, so
-- every other column was whatever the browser chose to send. Any signed-in
-- student could POST to PostgREST directly and file arbitrary `extracted_text`
-- against any course in any pool, with no file involved at all — and that text
-- is injected into the AI tutor's context for every student who asks about that
-- course. The tutor takes the two most RECENT rows, so a planted row displaced
-- the genuine notes rather than merely joining them.
--
-- The fix is structural, not another sanitiser: the browser no longer writes
-- this table. api/extract.js derives course_code, department and uploaded_by
-- itself, and extracts the text from the bytes actually in storage.

-- ─── 1. The browser can no longer insert ────────────────────────────────────
-- Both are needed: dropping the policy alone would leave the table-level INSERT
-- grant in place for some future policy to satisfy.
DROP POLICY IF EXISTS "Authenticated insert" ON course_materials;
DROP POLICY IF EXISTS "Public insert" ON course_materials;
REVOKE INSERT ON course_materials FROM authenticated, anon;

-- No INSERT policy is created. Writes go through api/extract.js on the
-- service-role client, which bypasses RLS by design — the same arrangement
-- google_connections already uses for its token writes.

-- ─── 2. Reads: signed-in only ───────────────────────────────────────────────
-- The old policy was `FOR SELECT USING (true)` with no role restriction, so
-- anyone holding the anon key (it ships in every page load, by design) could
-- read every row straight from PostgREST. Every page that lists materials is
-- behind a RequireAuth route, and the deployed tutor now reads notes with the
-- student's own client rather than an anonymous one, so nothing needs anon.
DROP POLICY IF EXISTS "Public read" ON course_materials;
DROP POLICY IF EXISTS "Authenticated read" ON course_materials;
CREATE POLICY "Authenticated read" ON course_materials
  FOR SELECT TO authenticated USING (true);

-- ─── 3. …and never the uploader's id ────────────────────────────────────────
-- Column-level defence in depth, the same technique used on
-- google_connections.refresh_token: even a future `select *` cannot leak
-- uploaded_by, which correlates every upload to a user's UUID. extracted_text
-- deliberately STAYS readable — sharing note text is the point of the feature.
--
-- Order matters below. REVOKE ALL also drops the DELETE granted by part 1, so
-- it is re-granted afterwards, not before.
--
-- `id` must stay selectable: PostgREST needs it to evaluate the `.eq('id', …)`
-- filter on the delete, and a column referenced in a WHERE clause requires
-- SELECT privilege even when the statement itself is a DELETE.
REVOKE ALL ON course_materials FROM anon, authenticated;
GRANT SELECT (
  id, course_code, course_slug, department, display_name,
  file_path, file_size, file_type, description, extracted_text, uploaded_at
) ON course_materials TO authenticated;
GRANT DELETE ON course_materials TO authenticated;

-- The policies from part 1 survive a REVOKE (policies and grants are separate
-- systems) — this is only re-granting the privilege they gate.

-- ─── VERIFY, once this has run ──────────────────────────────────────────────
-- Expect: no INSERT row, a SELECT row, a DELETE row.
--   SELECT grantee, privilege_type FROM information_schema.role_table_grants
--   WHERE table_name = 'course_materials' AND grantee IN ('anon','authenticated');
-- Expect uploaded_by to be ABSENT from this list:
--   SELECT column_name FROM information_schema.column_privileges
--   WHERE table_name = 'course_materials' AND grantee = 'authenticated';
-- Then upload a file in the app, confirm it appears, and confirm Remove works.

NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
