-- Course materials, part 1 of 2: the ADDITIVE half.
-- Run manually in the Supabase SQL editor. Idempotent.
--
-- ─── RUN THIS BEFORE DEPLOYING THE CODE ─────────────────────────────────────
-- Everything here only ADDS: a view, a delete policy, a grant. Nothing is taken
-- away, so the currently-live frontend keeps working exactly as it does now.
-- The half that takes permissions away is 20260827030000_materials_lock_writes,
-- which must run AFTER the deploy.
--
-- The split exists because the two changes pull in opposite directions:
--   * the new frontend READS course_materials_visible, so the view has to exist
--     BEFORE it deploys, or the materials list fails with "relation does not
--     exist"
--   * the new frontend stops INSERTing directly, so the insert may only be
--     revoked AFTER it deploys, or every upload fails in the gap
-- A single migration cannot satisfy both. An earlier draft of this file tried,
-- and would have broken the materials list on deploy day.

-- ─── 1. A takedown path ─────────────────────────────────────────────────────
-- There is currently no UPDATE or DELETE policy on this table at all, so
-- nothing can be removed except from the Supabase dashboard: a student who
-- uploads the wrong file, or a note that turns out to be someone else's
-- copyrighted material, has no route to pull it.
--
-- Additive and safe to run now: the old frontend simply never calls it.
GRANT DELETE ON course_materials TO authenticated;
DROP POLICY IF EXISTS "Uploaders delete own materials" ON course_materials;
CREATE POLICY "Uploaders delete own materials" ON course_materials
  FOR DELETE TO authenticated USING (auth.uid() = uploaded_by);

-- No UPDATE policy, deliberately. An editable row would re-open the very
-- channel part 2 closes: a student could file a clean note through the server
-- and then rewrite extracted_text afterwards.

-- ─── 2. "Is this mine?" without exposing whose it is ────────────────────────
-- The UI needs a Remove control on a student's own uploads. Part 2 revokes
-- SELECT on uploaded_by (it correlates every upload to a user's UUID), so the
-- client cannot answer that question itself. This view answers it in the
-- database and returns only the boolean.
--
-- ─── ON THE ABSENCE OF security_invoker ─────────────────────────────────────
-- READ THIS BEFORE ADDING AN RLS POLICY TO course_materials.
--
-- This view runs as its OWNER, not as the querying user. That is deliberate and
-- it is the only arrangement that works here: with `security_invoker = true`,
-- base-table privileges are checked as the CALLER, so the view's own
-- `uploaded_by = auth.uid()` would need SELECT on uploaded_by — the exact
-- column part 2 revokes. The view would fail with "permission denied" for every
-- student, taking the whole materials list with it. (A previous draft of this
-- file had precisely that bug.)
--
-- The consequence is that this view BYPASSES row-level security on
-- course_materials. That is harmless today because the table's read policy is
-- `USING (true)` — every signed-in student may read every row, which is the
-- point of a shared notes pool — and because the view is granted to
-- `authenticated` only, never to `anon`. It stops being harmless the moment
-- someone adds a policy that actually FILTERS rows (per-department, per-cohort,
-- blocking hidden or reported materials): the view would serve rows the policy
-- means to withhold. If that day comes, replace this view with a SECURITY
-- DEFINER function returning just the caller's own material ids, and let the
-- client intersect — do not simply add the policy and assume the view honours it.
--
-- Supabase's own linter flags this as `security_definer_view`. It is expected.
DROP VIEW IF EXISTS course_materials_visible;
CREATE VIEW course_materials_visible AS
  SELECT
    id, course_code, course_slug, department, display_name,
    file_path, file_size, file_type, description, extracted_text, uploaded_at,
    (uploaded_by = auth.uid()) AS uploaded_by_me
  FROM course_materials;

REVOKE ALL ON course_materials_visible FROM anon, PUBLIC;
GRANT SELECT ON course_materials_visible TO authenticated;

-- PostgREST caches the schema; without this it answers PGRST205 ("Could not
-- find the table public.course_materials_visible in the schema cache") and the
-- materials list stays broken until it reloads on its own.
-- See 20260728000000_departments.sql.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
