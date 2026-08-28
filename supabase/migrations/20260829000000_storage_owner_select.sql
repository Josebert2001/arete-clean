-- Make the storage half of the takedown path actually work.
-- Run manually in the Supabase SQL editor. Idempotent.
--
-- ─── WHY ────────────────────────────────────────────────────────────────────
-- 20260827020000_storage_hardening added an owner-scoped DELETE policy so a
-- student could remove their own uploaded file, and deliberately created NO
-- SELECT policy on storage.objects — a broad one would let any client enumerate
-- every file in the bucket (Supabase's advisor flags it as
-- public_bucket_allows_listing), and public downloads are served from the
-- object URL, so nothing needed one.
--
-- That reasoning was incomplete. Supabase's delete API resolves the object rows
-- before removing them, so DELETE also requires SELECT. With no SELECT policy
-- the client matched nothing, and the call SILENTLY SUCCEEDED: HTTP 200 with an
-- empty array, no error. The result was that Remove deleted the
-- course_materials row while leaving the file itself in a public bucket,
-- downloadable by URL forever — the exact outcome the takedown path exists to
-- prevent. Caught by a real upload-then-remove against production; the row went
-- but the object stayed fetchable.
--
-- ─── WHY THIS DOES NOT RE-OPEN ENUMERATION ──────────────────────────────────
-- The policy is scoped to `owner = auth.uid()`, so a student can list only the
-- objects they uploaded themselves. It does not expose other students' files,
-- which is what the advisor warning is actually about. A signed-out visitor
-- still gets nothing: the policy is granted to `authenticated` only, and public
-- downloads continue to go through the object URL rather than a listing.
--
-- `owner` is known to be populated correctly here: the INSERT policy from
-- 20260827020000 has `WITH CHECK (... AND owner = auth.uid() ...)`, and a NULL
-- owner would make that check evaluate to NULL rather than TRUE and reject the
-- upload. Uploads succeed, so owner is being stamped from the JWT as expected.

DROP POLICY IF EXISTS "Owners read own course materials" ON storage.objects;
CREATE POLICY "Owners read own course materials"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'course-materials' AND owner = auth.uid());

-- ─── VERIFY ─────────────────────────────────────────────────────────────────
-- Upload a file in the app, press Remove, then confirm the object URL 404s.
-- A 200 there means the row went but the file did not — the bug above.
--
-- Pre-existing objects with a NULL owner (uploaded before authentication was
-- required) match neither this policy nor the DELETE one, so they remain
-- removable only from the dashboard. To find them:
--   SELECT name, owner, created_at FROM storage.objects
--   WHERE bucket_id = 'course-materials' AND owner IS NULL;
