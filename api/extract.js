// ============================================================================
//  Arete — Course-material registration endpoint (Vercel)
//  Called right after the browser has uploaded a file to Supabase Storage.
//  Downloads that object, extracts its plain text where it can, and WRITES THE
//  course_materials ROW ITSELF.
//
//  Supported for extraction: .txt (native), .docx (mammoth), .pdf (pdf-parse)
//  Anything else still gets a row — just with extracted_text NULL.
//
//  WHY THE SERVER WRITES THE ROW
//  It used to only return the text, and the browser inserted the row. The RLS
//  policy checked `auth.uid() = uploaded_by` and nothing else, so every other
//  column was whatever the client chose to send: any signed-in student could
//  POST straight to PostgREST and file arbitrary `extracted_text` against any
//  course, with no file involved at all. That text is injected into the AI
//  tutor's context for every student who asks about that course
//  (getCourseOutline in _lib/tutorTools.js), and the lookup takes the two most
//  RECENT rows — so a planted row displaced the genuine notes as well.
//
//  Now every security-relevant field is derived here and none is trusted from
//  the body: `uploaded_by` from the verified token, `course_code` and
//  `department` from the catalogue via the uploader's own profile, and
//  `extracted_text` from the bytes actually in storage. The matching migration
//  (20260827010000_materials_server_insert.sql) revokes INSERT from
//  `authenticated`, so the browser cannot write the row at all any more.
// ============================================================================

import { createRequire } from 'module';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest, denyIfUserRateLimited } from './_lib/request-policy.js';
import { getStudentFromRequest } from './_lib/supabase.js';
import { serviceRoleClient, serviceRoleConfigured } from './_lib/serviceRole.js';
import { findCourseBySlug } from './_lib/courseData.js';

// pdf-parse is CJS-only; createRequire lets us use it safely in ESM.
// We import the internal module directly to skip its test-file auto-detection.
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const BUCKET = 'course-materials';

const RATE_LIMIT = {
  namespace: 'extract',
  limit: 20,
  windowMs: 10 * 60 * 1000,
};

// Cap stored text so it doesn't blow the AI context window.
// getCourseOutline truncates further when injecting into the prompt.
const MAX_TEXT_CHARS = 50_000;

const EXTRACTABLE = new Set(['txt', 'docx', 'pdf']);

// Mirrors ALLOWED_EXT in src/components/CourseMaterials.jsx. Enforced here too:
// the client list is a UX affordance, not a control.
const ALLOWED_EXT = new Set([
  'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx',
  'txt', 'png', 'jpg', 'jpeg', 'gif', 'zip',
]);

// Material paths are "<courseSlug>/<uploadedAtMs>-<rand>.<ext>" (see CourseMaterials.jsx).
// Requiring sign-in plus a fresh timestamp keeps this endpoint scoped to a file the
// caller just uploaded, instead of letting any signed-in user register any path
// in the (public-read) bucket on demand.
const FILE_PATH_RE = /^([^/]+)\/(\d+)-[a-z0-9]+\.([a-z0-9]+)$/i;
const MAX_UPLOAD_AGE_MS = 10 * 60 * 1000;

const MAX_DISPLAY_NAME = 200;
const MAX_DESCRIPTION = 200;

// Names come from the student's own filesystem and the description is free text;
// both are shown to other students AND fed to the tutor as a note header, so
// strip control characters and collapse whitespace before storing. The tutor's
// own defanging (sanitizeLabel in _lib/tutorTools.js) still runs on read — this
// is the write-side half of the same job.
function cleanLabel(value, max) {
  return String(value ?? '')
    // eslint-disable-next-line no-control-regex -- strip control chars before storing
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: 'Rate limit exceeded.' });
  }

  const student = await getStudentFromRequest(req);
  if (!student) {
    return res.status(401).json({ error: 'Sign in required.' });
  }

  // Per-student budget, shared across instances — this endpoint now writes rows
  // that every other student's tutor may read, so uncapped it is a spam channel.
  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'extract',
    message: 'You have uploaded a lot of materials just now. Please wait a few minutes and try again.',
  })) return;

  const { filePath, fileType, courseSlug, displayName, description, fileSize } = req.body || {};

  if (!filePath || typeof filePath !== 'string') {
    return res.status(400).json({ error: 'filePath required.' });
  }
  if (filePath.includes('..') || filePath.startsWith('/')) {
    return res.status(400).json({ error: 'Invalid file path.' });
  }
  const pathMatch = filePath.match(FILE_PATH_RE);
  if (!pathMatch || Date.now() - Number(pathMatch[2]) > MAX_UPLOAD_AGE_MS) {
    return res.status(400).json({ error: 'File path is missing or no longer fresh — register right after upload.' });
  }

  // The extension in the path is what the object actually is; `fileType` is a
  // label the client sent. They must agree, or a student could have a .txt
  // extracted and then filed as something else entirely.
  const pathExt = pathMatch[3].toLowerCase();
  if (typeof fileType !== 'string' || fileType.toLowerCase() !== pathExt) {
    return res.status(400).json({ error: 'File type does not match the uploaded file.' });
  }
  if (!ALLOWED_EXT.has(pathExt)) {
    return res.status(400).json({ error: `File type .${pathExt} is not allowed.` });
  }

  // The upload path's first segment is the course slug the file was stored
  // under; requiring it to match the claimed course stops a row pointing at a
  // file filed somewhere else in the bucket.
  if (typeof courseSlug !== 'string' || courseSlug !== pathMatch[1]) {
    return res.status(400).json({ error: 'Course does not match the uploaded file path.' });
  }

  if (!serviceRoleConfigured() || !SUPABASE_URL) {
    console.error('extract: SUPABASE_SERVICE_ROLE_KEY is not set — cannot register uploads');
    return res.status(503).json({ error: 'Uploads are not available right now. Please try again later.' });
  }

  // The uploader's own department decides which catalogue the slug is resolved
  // against and therefore which materials pool the row lands in. Read from their
  // profile under their own RLS, never from the request body.
  let departmentSlug = 'cybersecurity';
  try {
    const { data } = await student.db
      .from('profiles')
      .select('department')
      .eq('id', student.user.id)
      .maybeSingle();
    if (data?.department) departmentSlug = data.department;
  } catch (err) {
    console.error('extract: profile lookup failed:', err);
    return res.status(503).json({ error: 'Could not confirm your programme. Please try again.' });
  }

  const course = findCourseBySlug(courseSlug, departmentSlug);
  if (!course) {
    logRequest(req, 'extract', { denied: 'unknown_course', courseSlug });
    return res.status(400).json({ error: 'That course is not in your programme’s catalogue.' });
  }

  // Extraction is best-effort: a corrupt PDF or an unreadable .docx must still
  // leave the student with a material row pointing at their file.
  let text = null;
  if (EXTRACTABLE.has(pathExt)) {
    try {
      const fileUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filePath).replace(/%2F/g, '/')}`;
      const response = await fetch(fileUrl);
      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        if (pathExt === 'txt') {
          text = buffer.toString('utf-8');
        } else if (pathExt === 'docx') {
          // Imported here rather than at module scope: mammoth measures ~630ms to
          // load, and the txt and pdf branches never touch it. pdf-parse stays
          // eager above — it measures ~5ms, so deferring it would buy nothing.
          const { default: mammoth } = await import('mammoth');
          text = (await mammoth.extractRawText({ buffer })).value;
        } else if (pathExt === 'pdf') {
          text = (await pdfParse(buffer)).text;
        }
      }
    } catch (err) {
      console.error('extract: text extraction failed:', err);
      text = null;
    }
  }

  if (text) {
    text = text.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_CHARS) || null;
  }

  const name = cleanLabel(displayName, MAX_DISPLAY_NAME) || `Material.${pathExt}`;
  const desc = cleanLabel(description, MAX_DESCRIPTION) || null;
  const size = Number.isFinite(fileSize) && fileSize > 0 ? Math.floor(fileSize) : null;

  // Service-role, because `authenticated` no longer has INSERT on this table —
  // that revocation is the whole point. Every value below is either derived here
  // or already sanitised; nothing is passed through from the body untouched.
  const db = serviceRoleClient();
  const { data: inserted, error: insertError } = await db
    .from('course_materials')
    .insert({
      course_code: course.code,
      course_slug: course.slug,
      department: course.materialsDepartment,
      display_name: name,
      file_path: filePath,
      file_size: size,
      file_type: pathExt,
      description: desc,
      uploaded_by: student.user.id,
      extracted_text: text,
    })
    .select('id, display_name, file_path, file_size, file_type, description, uploaded_at')
    .single();

  if (insertError) {
    console.error('extract: course_materials insert failed:', insertError);
    return res.status(500).json({ error: 'Could not save the material. Please try again.' });
  }

  return res.status(200).json({ material: inserted, extracted: Boolean(text) });
}
