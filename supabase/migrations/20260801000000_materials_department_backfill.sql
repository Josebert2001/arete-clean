-- ─── Backfill course_materials.department (Phase 3) ──────────────────────────
-- Run manually in the Supabase SQL editor (same as the migrations before it).
-- Idempotent: safe to re-run.
--
-- 20260728000000_departments.sql added course_materials.department with a
-- 'cybersecurity' default, but nothing ever wrote or read it — every row landed
-- on the default and the column did no work. The app now scopes both the upload
-- and the two read paths (CourseMaterials.jsx and the tutor's getCourseOutline
-- note lookup) to this column, so the existing rows need sorting into the right
-- pool before that scoping takes effect.
--
-- The rule (materialsDepartmentFor() in src/data/departments.js):
--   * courses shared across programmes  → 'general', so a note uploaded for
--     GST 111 reaches Cybersecurity, Data Science and foundation students alike
--   * everything else → the slug of the catalogue that owns the course
--
-- Every row today predates multi-department and belongs to the Cybersecurity
-- catalogue, so only the shared-course rows move.
--
-- 'cyb-211' is in the list even though it is not a foundation course: Data
-- Science takes it as well, so both catalogues mark it sharedMaterials and both
-- read the 'general' pool. Leaving it out would strand the existing rows in the
-- 'cybersecurity' pool where Data Science students never look.

UPDATE course_materials
SET department = 'general'
WHERE course_slug IN (
    'cos-111',
    'cos-121',
    'cos-211',
    'cos-221',
    'cos-411',
    'csc-319',
    'cyb-211',
    'ent-221',
    'ent-321',
    'gst-111',
    'gst-121',
    'gst-212',
    'gst-312',
    'ins-224',
    'mth-111',
    'mth-121',
    'phy-111',
    'phy-117',
    'phy-121',
    'phy-128',
    'sta-111',
    'uuy-csc-111',
    'uuy-csc-112'
  )
  AND department <> 'general';

-- Listings filter on (course_slug, department) and the tutor's note lookup on
-- (course_code, department), so index both pairs.
CREATE INDEX IF NOT EXISTS course_materials_slug_department_idx
  ON course_materials (course_slug, department);

CREATE INDEX IF NOT EXISTS course_materials_code_department_idx
  ON course_materials (course_code, department);

-- Reload PostgREST's schema cache so the new indexes and the column are live
-- through the API immediately — see the note in 20260728000000_departments.sql.
NOTIFY pgrst, 'reload schema';
SELECT pg_notification_queue_usage();
