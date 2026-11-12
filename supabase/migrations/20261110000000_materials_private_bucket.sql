-- Make the course-materials bucket private. Run manually in the Supabase SQL
-- editor, same as every other migration here. Idempotent: safe to re-run.
--
-- WHY
-- The bucket was public, so a file's URL worked for anyone, signed in or not,
-- for ever. Three things followed from that:
--   * a link pasted outside the app kept working with no account;
--   * a material hidden after a report was hidden from the LIST only -- its URL
--     still served the file;
--   * an object uploaded but never registered (no course_materials row) was
--     reachable by URL until the daily sweep removed it.
-- With the bucket private, the storage API serves a file only through a signed
-- link, and minting one needs SELECT on the object under the policies below.
--
-- ORDER OF DEPLOYMENT
-- Either order works. The frontend asks for signed links first and falls back
-- to the public URL, so:
--   * new frontend, this migration not applied -> signing is refused for other
--     students' files (owner-only policy), the public URL still works;
--   * this migration applied, old frontend     -> links break until the new
--     frontend is deployed. Deploy the frontend FIRST to avoid that window.
--
-- NOT AFFECTED
-- Uploads (INSERT policy), owner deletes, api/extract.js, the orphan sweep and
-- account deletion: the last three use the service role, which bypasses RLS.

UPDATE storage.buckets SET public = false WHERE id = 'course-materials';

-- A signed-in student may read an object that is a registered, visible
-- material. course_materials_visible already carries the moderation filter
-- (20261103010000), so a hidden file stops being readable the moment it is
-- hidden. The owner policy from 20260829000000 stays alongside this one --
-- policies are OR-ed -- so an uploader can still read their own file while
-- api/extract.js is registering it.
DROP POLICY IF EXISTS "Students read visible course materials" ON storage.objects;
CREATE POLICY "Students read visible course materials"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'course-materials'
    AND EXISTS (
      SELECT 1 FROM public.course_materials_visible v
      WHERE v.file_path = storage.objects.name
    )
  );

-- Admins review reported files, including hidden ones.
DROP POLICY IF EXISTS "Admins read course materials" ON storage.objects;
CREATE POLICY "Admins read course materials"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'course-materials' AND public.is_admin_user(auth.uid()));

NOTIFY pgrst, 'reload schema';
