-- Registration caps live rows at 30 files / 150 MB. Bound storage objects too,
-- since a browser writes an object before the registration endpoint runs.
-- Run manually; idempotent. The 40-object ceiling leaves room for in-flight
-- uploads and failures while the daily sweep clears old orphans.

CREATE OR REPLACE FUNCTION public.material_upload_allowed()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE
SET search_path = public, storage, pg_temp AS $$
  SELECT auth.uid() IS NOT NULL AND (
    SELECT count(*) FROM storage.objects
    WHERE bucket_id = 'course-materials' AND owner = auth.uid()
  ) < 40;
$$;
REVOKE ALL ON FUNCTION public.material_upload_allowed() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.material_upload_allowed() TO authenticated;

DROP POLICY IF EXISTS "Authenticated upload to course-materials" ON storage.objects;
CREATE POLICY "Authenticated upload to course-materials"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'course-materials'
    AND owner = auth.uid()
    AND array_length(storage.foldername(name), 1) = 1
    AND (storage.foldername(name))[1] ~ '^[a-z0-9-]{3,40}$'
    AND public.material_upload_allowed()
  );

CREATE OR REPLACE FUNCTION public.my_material_upload_count()
RETURNS integer LANGUAGE sql SECURITY DEFINER STABLE
SET search_path = public, pg_temp AS $$
  SELECT count(*)::integer FROM course_materials WHERE uploaded_by = auth.uid();
$$;
REVOKE ALL ON FUNCTION public.my_material_upload_count() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.my_material_upload_count() TO authenticated;

NOTIFY pgrst, 'reload schema';
