-- ─── Upload ownership: checked in the database, not through Storage ────────
-- Run manually in the Supabase SQL editor BEFORE deploying the api/extract.js
-- that calls it: until it exists, uploads answer 503 (fail closed).
-- Idempotent: safe to re-run. Requires 20260827020000_storage_hardening.sql
-- (its INSERT policy stamps storage.objects.owner = auth.uid() on upload).
--
-- api/extract.js used to prove ownership by calling Storage info()/download()
-- with the student's own token, trusting the "Owners read own course
-- materials" SELECT policy. That does not work for a PUBLIC bucket: Storage's
-- getObjectInfo/getObject routes read public-bucket objects as the superuser
-- and never consult RLS. course-materials is public, so another student's
-- fresh path passed the check.
--
--   1. my_course_material_object(path): the caller's own object in
--      course-materials, or no row. Returns its id (re-checked just before the
--      insert, so the bytes and the row belong to the same object), its real
--      created_at (freshness no longer trusts the timestamp the student put in
--      the path) and the size Storage recorded.
--   2. A unique index on course_materials.file_path, so one object can be
--      registered once. The tutor reads the two newest rows per course, and
--      re-registering one file was a way to push other students' notes out.
--      If duplicates already exist the DO block stops with a query to inspect
--      them; nothing is deleted automatically.

DO $$
DECLARE
  duplicate_paths BIGINT;
BEGIN
  SELECT count(*) INTO duplicate_paths
  FROM (
    SELECT file_path FROM public.course_materials
    GROUP BY file_path HAVING count(*) > 1
  ) duplicates;
  IF duplicate_paths > 0 THEN
    RAISE EXCEPTION '% duplicate file_path values exist. Inspect with: SELECT file_path, count(*), array_agg(id) FROM public.course_materials GROUP BY file_path HAVING count(*) > 1;', duplicate_paths;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS course_materials_file_path_unique_idx
  ON public.course_materials (file_path);

CREATE OR REPLACE FUNCTION public.my_course_material_object(p_path TEXT)
RETURNS TABLE (object_id UUID, created_at TIMESTAMPTZ, size BIGINT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, storage, pg_temp
STABLE
AS $$
  SELECT o.id, o.created_at,
    CASE
      WHEN o.metadata->>'size' ~ '^[0-9]{1,18}$'
        THEN (o.metadata->>'size')::BIGINT
      ELSE NULL
    END
  FROM storage.objects AS o
  WHERE o.bucket_id = 'course-materials'
    AND o.name = p_path
    AND o.owner = auth.uid()
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.my_course_material_object(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_course_material_object(TEXT) TO authenticated;

NOTIFY pgrst, 'reload schema';
