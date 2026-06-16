// ============================================================================
//  Arete — Text extraction endpoint (Vercel)
//  Downloads an already-uploaded file from Supabase Storage and extracts
//  its plain text so the AI Tutor can reference it as lecture notes.
//
//  Supported: .txt (native), .docx (mammoth), .pdf (pdf-parse)
//  Other file types return { text: null } — non-fatal, upload continues.
// ============================================================================

import { createRequire } from 'module';
import mammoth from 'mammoth';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders } from './_lib/request-policy.js';
import { getStudentFromRequest } from './_lib/supabase.js';

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

// Material paths are "<courseSlug>/<uploadedAtMs>-<rand>.<ext>" (see CourseMaterials.jsx).
// Requiring sign-in plus a fresh timestamp keeps this endpoint scoped to a file the
// caller just uploaded, instead of letting any signed-in user re-extract any path
// in the (public-read) bucket on demand.
const FILE_PATH_RE = /^[^/]+\/(\d+)-[a-z0-9]+\.[a-z0-9]+$/i;
const MAX_UPLOAD_AGE_MS = 10 * 60 * 1000;

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

  const { filePath, fileType } = req.body || {};

  if (!filePath || typeof filePath !== 'string') {
    return res.status(400).json({ error: 'filePath required.' });
  }
  if (filePath.includes('..') || filePath.startsWith('/')) {
    return res.status(400).json({ error: 'Invalid file path.' });
  }
  const pathMatch = filePath.match(FILE_PATH_RE);
  if (!pathMatch || Date.now() - Number(pathMatch[1]) > MAX_UPLOAD_AGE_MS) {
    return res.status(400).json({ error: 'File path is missing or no longer fresh — extract right after upload.' });
  }
  if (!EXTRACTABLE.has(fileType)) {
    return res.status(200).json({ text: null });
  }
  if (!SUPABASE_URL) {
    return res.status(200).json({ text: null });
  }

  try {
    const fileUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filePath).replace(/%2F/g, '/')}`;
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return res.status(200).json({ text: null });
    }
    const buffer = Buffer.from(await response.arrayBuffer());

    let text = null;

    if (fileType === 'txt') {
      text = buffer.toString('utf-8');
    } else if (fileType === 'docx') {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileType === 'pdf') {
      const data = await pdfParse(buffer);
      text = data.text;
    }

    if (text) {
      text = text.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_CHARS) || null;
    }

    return res.status(200).json({ text: text ?? null });
  } catch (err) {
    console.error('extract error:', err);
    return res.status(200).json({ text: null });
  }
}
