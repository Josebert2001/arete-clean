/**
 * Arete — Supabase one-time setup script
 * Run: node --env-file=.env.setup setup-supabase.mjs
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PAT = process.env.SUPABASE_PAT;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !PAT) {
  console.error(`
  Missing env vars. Make sure .env.setup contains:
    VITE_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY
    SUPABASE_PAT
  `);
  process.exit(1);
}

const PROJECT_REF = new URL(SUPABASE_URL).hostname.split('.')[0];

// ── Helpers ──────────────────────────────────────────────────────────────────

async function sql(query) {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }
  );
  const body = await res.json();
  if (!res.ok) throw new Error(body.message ?? JSON.stringify(body));
  return body;
}

async function storageRequest(path, body) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

function ok(msg) { console.log(`  ✓ ${msg}`); }
function step(msg) { console.log(`\n${msg}`); }

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Arete — Supabase setup');
  console.log(`Project: ${PROJECT_REF}\n`);

  // 1. Create table
  step('1. Creating course_materials table…');
  await sql(`
    CREATE TABLE IF NOT EXISTS course_materials (
      id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
      course_code  TEXT        NOT NULL,
      course_slug  TEXT        NOT NULL,
      display_name TEXT        NOT NULL,
      file_path    TEXT        NOT NULL,
      file_url     TEXT        NOT NULL,
      file_size    BIGINT,
      file_type    TEXT,
      description  TEXT,
      uploaded_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  ok('Table ready');

  // 2. Enable RLS
  step('2. Enabling Row Level Security…');
  await sql(`ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;`);
  ok('RLS enabled');

  // 3. Public read policy
  step('3. Creating RLS policies…');
  await sql(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'course_materials' AND policyname = 'Public read'
      ) THEN
        CREATE POLICY "Public read" ON course_materials
          FOR SELECT USING (true);
      END IF;
    END $$;
  `);
  ok('Read policy set');

  // 4. Insert policy — authenticated students only, stamped with their user id
  //    so every upload is attributable. (Replaces the old anonymous policy.)
  await sql(`ALTER TABLE course_materials ADD COLUMN IF NOT EXISTS uploaded_by UUID REFERENCES auth.users(id);`);
  await sql(`DROP POLICY IF EXISTS "Public insert" ON course_materials;`);
  await sql(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'course_materials' AND policyname = 'Authenticated insert'
      ) THEN
        CREATE POLICY "Authenticated insert" ON course_materials
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() = uploaded_by);
      END IF;
    END $$;
  `);
  ok('Insert policy set (signed-in students only)');

  // 5. Create storage bucket
  step('4. Creating storage bucket…');
  const bucket = await storageRequest('/bucket', {
    id: 'course-materials',
    name: 'course-materials',
    public: true,
    file_size_limit: 20971520, // 20 MB
    allowed_mime_types: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'image/png',
      'image/jpeg',
      'image/gif',
      'application/zip',
    ],
  });
  if (bucket.status === 409 || /already exists/i.test(bucket.body?.message ?? '')) {
    ok('Bucket already exists — skipped');
  } else if (bucket.status >= 400) {
    throw new Error(bucket.body.message ?? JSON.stringify(bucket.body));
  } else {
    ok('Bucket created');
  }

  // 6. Storage policy — uploads require a signed-in student; reads stay public
  step('5. Setting storage upload policy…');
  await sql(`DROP POLICY IF EXISTS "Public upload to course-materials" ON storage.objects;`);
  await sql(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'objects' AND policyname = 'Authenticated upload to course-materials'
      ) THEN
        CREATE POLICY "Authenticated upload to course-materials"
          ON storage.objects FOR INSERT TO authenticated
          WITH CHECK (bucket_id = 'course-materials');
      END IF;
    END $$;
  `);
  await sql(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'objects' AND policyname = 'Public read from course-materials'
      ) THEN
        CREATE POLICY "Public read from course-materials"
          ON storage.objects FOR SELECT
          USING (bucket_id = 'course-materials');
      END IF;
    END $$;
  `);
  ok('Storage policies set');

  // 7. User progress table (cloud-synced module progress)
  step('6. Creating user_progress table…');
  await sql(`
    CREATE TABLE IF NOT EXISTS user_progress (
      user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      storage_key TEXT        NOT NULL,
      progress    JSONB       NOT NULL DEFAULT '{}',
      updated_at  TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (user_id, storage_key)
    );
  `);
  await sql(`ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;`);
  await sql(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'user_progress' AND policyname = 'Users manage own progress'
      ) THEN
        CREATE POLICY "Users manage own progress" ON user_progress
          FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
      END IF;
    END $$;
  `);
  ok('user_progress table + RLS ready');

  // ── Done ─────────────────────────────────────────────────────────────────

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Setup complete!

  Now add these 2 variables to Vercel:
  (Project → Settings → Environment Variables)

  VITE_SUPABASE_URL
    ${SUPABASE_URL}

  VITE_SUPABASE_ANON_KEY
    → copy from Supabase: Settings → API → anon public key

  Then redeploy and the Materials tab goes live.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}

main().catch(err => {
  console.error(`\n  ✗ Setup failed: ${err.message}`);
  process.exit(1);
});
