-- Tighten the course-materials storage bucket. Run manually in the Supabase SQL
-- editor. Idempotent.
--
-- ─── WHY ────────────────────────────────────────────────────────────────────
-- The upload policy was `WITH CHECK (bucket_id = 'course-materials')` and
-- nothing more. Any signed-in student could therefore write ANY key in the
-- bucket — 20 MB at a time, unbounded in number, with no ownership recorded on
-- the policy's terms and no way to remove anything afterwards, since no DELETE
-- policy existed either. Combined with a public bucket that meant every object
-- was world-readable by URL, permanently, including a file uploaded by mistake.
--
-- ─── WHAT THIS DOES NOT CHANGE ──────────────────────────────────────────────
-- The bucket stays public-read. Downloads are served straight from the object
-- URL (materialUrl() in CourseMaterials.jsx) and switching to signed URLs is a
-- frontend change, not a policy one. Note that public-read is a deliberate
-- product decision — shared notes are meant to be shareable — but it does mean
-- "anyone with the link", forever. That belongs in /privacy; see the note at
-- the bottom of this file.
--
-- There is still NO SELECT policy on storage.objects, which is what keeps
-- clients from ENUMERATING the bucket (Supabase's advisor flags a broad SELECT
-- policy as public_bucket_allows_listing). Public downloads do not need one.

-- ─── 1. Uploads must be owned, and land under a course folder ───────────────
-- `owner = auth.uid()` ties each object to the student who wrote it, which is
-- what makes the DELETE policy below expressible at all. The path check pins
-- uploads to the "<courseSlug>/<timestamp>-<rand>.<ext>" shape api/extract.js
-- validates, so a student cannot scatter objects at the bucket root or invent a
-- nested tree. Slug shape only — the slug is checked against the real catalogue
-- server-side, which SQL has no way to do.
DROP POLICY IF EXISTS "Public upload to course-materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload to course-materials" ON storage.objects;
CREATE POLICY "Authenticated upload to course-materials"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'course-materials'
    AND owner = auth.uid()
    AND array_length(storage.foldername(name), 1) = 1
    AND (storage.foldername(name))[1] ~ '^[a-z0-9-]{3,40}$'
  );

-- ─── 2. Owners can remove their own objects ─────────────────────────────────
-- The companion to the course_materials DELETE policy in
-- 20260827010000_materials_server_insert.sql: without this, deleting the row
-- would orphan the file in the bucket, still publicly readable by URL.
DROP POLICY IF EXISTS "Owners delete own course materials" ON storage.objects;
CREATE POLICY "Owners delete own course materials"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'course-materials' AND owner = auth.uid());

-- ─── 3. No UPDATE policy, deliberately ──────────────────────────────────────
-- Supabase's upload(..., { upsert: true }) needs UPDATE. Leaving it unset means
-- an existing key cannot be overwritten — so one student cannot replace the
-- bytes another student's material row points at, which would swap the file
-- under a note that has already been read and vouched for. Uploads use a fresh
-- random key every time (CourseMaterials.jsx), so nothing legitimate needs it.

-- ─── FOLLOW-UP, NOT SQL ─────────────────────────────────────────────────────
-- 1. Existing objects predate `owner = auth.uid()` on the INSERT policy. Owner
--    is set by Supabase on upload, so rows written by the old policy do carry
--    one and the DELETE policy will work for them; objects uploaded before
--    authentication was required (the pre-2026 "Public upload" policy) may have
--    a NULL owner and will need removing from the dashboard. To find them:
--      SELECT name, owner, created_at FROM storage.objects
--      WHERE bucket_id = 'course-materials' AND owner IS NULL;
-- 2. There is no per-student upload quota. The per-user limiter on
--    /api/extract (20 per 10 min) bounds how fast rows appear, but the storage
--    write happens before that call — so a determined student can still fill
--    the bucket with orphaned objects that no row points at. A scheduled sweep
--    deleting objects with no matching course_materials.file_path older than a
--    day would close it; not written here because it needs pg_cron enabled.
