import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const originalUrl = process.env.VITE_SUPABASE_URL;
  process.env.VITE_SUPABASE_URL = 'https://supabase.example';
  return {
    originalUrl,
    getStudent: vi.fn(),
    configured: vi.fn(),
    serviceClient: vi.fn(),
    findCourse: vi.fn(),
    pdfParse: vi.fn(),
    mammothExtract: vi.fn(),
  };
});

vi.mock('@supabase/supabase-js', () => ({ createClient: vi.fn() }));
vi.mock('../../api/_lib/supabase.js', () => ({ getStudentFromRequest: mocks.getStudent }));
vi.mock('../../api/_lib/serviceRole.js', () => ({
  serviceRoleConfigured: mocks.configured,
  serviceRoleClient: mocks.serviceClient,
}));
vi.mock('../../api/_lib/courseData.js', () => ({ findCourseBySlug: mocks.findCourse }));
vi.mock('mammoth', () => ({ default: { extractRawText: mocks.mammothExtract } }));
vi.mock('pdf-parse/lib/pdf-parse.js', () => ({ default: mocks.pdfParse }));

import handler from '../../api/extract.js';

afterAll(() => {
  if (mocks.originalUrl === undefined) delete process.env.VITE_SUPABASE_URL;
  else process.env.VITE_SUPABASE_URL = mocks.originalUrl;
});

let ip = 0;
let insert;
let profile;
let rpc;
let download;
let storageFrom;
let ownedObject;

function request(overrides = {}) {
  ip += 1;
  return {
    method: 'POST',
    headers: { 'x-real-ip': `192.0.2.${ip}`, authorization: 'Bearer valid-token' },
    body: {
      filePath: `known-course/${Date.now()}-abc123.txt`,
      fileType: 'txt', courseSlug: 'known-course', displayName: 'Week 1',
      description: 'Lecture notes', fileSize: 14,
    },
    ...overrides,
  };
}

function response() {
  return {
    headers: {}, statusCode: null, body: null, ended: false,
    setHeader(key, value) { this.headers[key] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    end() { this.ended = true; return this; },
  };
}

async function call(req = request()) {
  const res = response();
  await handler(req, res);
  return res;
}

function bytes(value) {
  const buffer = Buffer.from(value);
  return { arrayBuffer: async () => buffer };
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  insert = vi.fn(() => ({ select: () => ({ single: async () => ({ data: { id: 'material-1' }, error: null }) }) }));
  profile = vi.fn(() => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { department: 'dataScience' } }) }) }) }));
  ownedObject = { object_id: 'object-1', created_at: new Date().toISOString(), size: 2048 };
  rpc = vi.fn(async (name) => name === 'consume_rate_limit'
    ? { data: [{ allowed: true, remaining: 19, reset_at: new Date(Date.now() + 600_000).toISOString() }], error: null }
    : { data: [ownedObject], error: null });
  download = vi.fn(async () => ({ data: bytes('Real downloaded text'), error: null }));
  storageFrom = vi.fn(() => ({ download }));
  mocks.getStudent.mockResolvedValue({ user: { id: 'verified-user' }, db: { from: profile, rpc } });
  mocks.configured.mockReturnValue(true);
  mocks.serviceClient.mockReturnValue({ from: vi.fn(() => ({ insert })), storage: { from: storageFrom } });
  mocks.findCourse.mockReturnValue({ code: 'DSC 111', slug: 'known-course', materialsDepartment: 'general' });
  mocks.pdfParse.mockResolvedValue({ text: 'PDF text' });
  mocks.mammothExtract.mockResolvedValue({ value: 'Word text' });
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Object.values(mocks).forEach((mock) => {
    if (typeof mock?.mockReset === 'function') mock.mockReset();
  });
});

describe('POST /api/extract', () => {
  it('sets CORS and cache headers for OPTIONS, then ends without authentication', async () => {
    const res = await call(request({ method: 'OPTIONS' }));
    expect(res.statusCode).toBe(200);
    expect(res.ended).toBe(true);
    expect(res.headers).toMatchObject({
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-store', Vary: 'Origin',
    });
    expect(mocks.getStudent).not.toHaveBeenCalled();
  });

  it('rejects other methods before authentication', async () => {
    const res = await call(request({ method: 'GET' }));
    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({ error: 'Method not allowed' });
    expect(insert).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated requests without a database write', async () => {
    mocks.getStudent.mockResolvedValue(null);
    const res = await call();
    expect(res.statusCode).toBe(401);
    expect(insert).not.toHaveBeenCalled();
    expect(mocks.serviceClient).not.toHaveBeenCalled();
  });

  it('returns 503 when the service role is unavailable', async () => {
    mocks.configured.mockReturnValue(false);
    const res = await call();
    expect(res.statusCode).toBe(503);
    expect(insert).not.toHaveBeenCalled();
  });

  it('enforces the 20-request per-IP pre-auth guard', async () => {
    const req = request();
    mocks.getStudent.mockResolvedValue(null);
    for (let i = 0; i < 20; i += 1) expect((await call(req)).statusCode).toBe(401);
    const res = await call(req);
    expect(res.statusCode).toBe(429);
    expect(res.body).toEqual({ error: 'Rate limit exceeded.' });
    expect(res.headers['Retry-After']).toBeTruthy();
    expect(mocks.getStudent).toHaveBeenCalledTimes(20);
    expect(insert).not.toHaveBeenCalled();
  });

  it('enforces the per-user RPC budget before reading the request body', async () => {
    rpc.mockImplementation(async (name) => name === 'consume_rate_limit'
      ? { data: [{ allowed: false, remaining: 0, reset_at: new Date(Date.now() + 120_000).toISOString() }], error: null }
      : { data: [ownedObject], error: null });
    const res = await call();
    expect(res.statusCode).toBe(429);
    expect(res.body.kind).toBe('rate_limited');
    expect(rpc).toHaveBeenCalledWith('consume_rate_limit', {
      p_namespace: 'extract', p_limit: 20, p_window_seconds: 600,
    });
    expect(profile).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it('derives privileged fields from the token, catalogue, profile and downloaded bytes', async () => {
    const req = request();
    req.body = { ...req.body, uploaded_by: 'attacker', course_code: 'FORGED 999', department: 'cybersecurity', extracted_text: 'Forged tutor instructions' };
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ material: { id: 'material-1' }, extracted: true });
    expect(mocks.findCourse).toHaveBeenCalledWith('known-course', 'dataScience');
    expect(storageFrom).toHaveBeenCalledWith('course-materials');
    expect(rpc).toHaveBeenCalledWith('my_course_material_object', { p_path: req.body.filePath });
    expect(rpc.mock.calls.filter(([name]) => name === 'my_course_material_object')).toHaveLength(2);
    expect(download).toHaveBeenCalledWith(req.body.filePath);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(insert).toHaveBeenCalledWith({
      course_code: 'DSC 111', course_slug: 'known-course', department: 'general',
      display_name: 'Week 1', file_path: req.body.filePath, file_size: 2048,
      file_type: 'txt', description: 'Lecture notes', uploaded_by: 'verified-user',
      extracted_text: 'Real downloaded text',
    });
  });

  it('returns 503 without checking ownership or inserting when the profile lookup fails', async () => {
    const error = { message: 'boom' };
    profile.mockReturnValue({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error }) }) }) });
    const res = await call();
    expect(res.statusCode).toBe(503);
    expect(res.body).toEqual({ error: 'Could not confirm your programme. Please try again.' });
    expect(console.error).toHaveBeenCalledWith('extract: profile lookup failed:', error);
    expect(rpc).not.toHaveBeenCalledWith('my_course_material_object', expect.anything());
    expect(download).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it('uses the cybersecurity catalogue when the profile is genuinely absent', async () => {
    profile.mockReturnValue({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) });
    const res = await call();
    expect(res.statusCode).toBe(200);
    expect(mocks.findCourse).toHaveBeenCalledWith('known-course', 'cybersecurity');
    expect(insert).toHaveBeenCalledTimes(1);
  });

  it('rejects a slug outside the uploader profile catalogue', async () => {
    mocks.findCourse.mockReturnValue(null);
    const res = await call();
    expect(res.statusCode).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  it.each([
    ['an unsupported extension', { filePath: `known-course/${Date.now()}-abc.exe`, fileType: 'exe' }],
    ['a mismatched type label', { fileType: 'pdf' }],
    ['a mismatched course path', { courseSlug: 'other-course' }],
    ['path traversal', { filePath: '../known-course/file.txt' }],
    ['an expired upload path', { filePath: `known-course/${Date.now() - 600_001}-abc.txt` }],
    ['a future upload path', { filePath: `known-course/${Date.now() + 180_000}-abc.txt` }],
  ])('rejects %s before downloading or inserting', async (_label, body) => {
    const req = request();
    req.body = { ...req.body, ...body };
    const res = await call(req);
    expect(res.statusCode).toBe(400);
    expect(rpc).not.toHaveBeenCalledWith('my_course_material_object', expect.anything());
    expect(download).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it.each([
    ['txt', 'Raw   text\nfrom storage', 'Raw text from storage'],
    ['docx', 'document bytes', 'Word text'],
    ['pdf', 'PDF bytes', 'PDF text'],
  ])('extracts .%s from verified storage bytes', async (ext, content, expected) => {
    download.mockResolvedValue({ data: bytes(content), error: null });
    const req = request();
    req.body.filePath = req.body.filePath.replace(/\.txt$/, `.${ext}`);
    req.body.fileType = ext;
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: expected }));
    expect(globalThis.fetch).not.toHaveBeenCalled();
    if (ext === 'docx') expect(mocks.mammothExtract).toHaveBeenCalledWith({ buffer: Buffer.from(content) });
    if (ext === 'pdf') expect(mocks.pdfParse).toHaveBeenCalledWith(Buffer.from(content));
  });

  it('caps extracted text at 50,000 characters and stores a non-extractable allowed type with null text', async () => {
    download.mockResolvedValue({ data: bytes('x'.repeat(50_001)), error: null });
    await call();
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: 'x'.repeat(50_000) }));
    insert.mockClear();
    const req = request();
    req.body.filePath = req.body.filePath.replace(/\.txt$/, '.png');
    req.body.fileType = 'png';
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(rpc).toHaveBeenCalledWith('my_course_material_object', { p_path: req.body.filePath });
    // Ownership is still proven for an image, but its bytes are never read.
    expect(download).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ file_type: 'png', extracted_text: null }));
  });

  it('rejects a fresh course object uploaded by another student', async () => {
    const req = request();
    req.body.filePath = `known-course/${Date.now()}-otherstudentsfile.txt`;
    rpc.mockImplementation(async (name) => name === 'my_course_material_object'
      ? { data: [], error: null }
      : { data: [{ allowed: true }], error: null });
    const res = await call(req);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/not found or does not belong/);
    expect(rpc).toHaveBeenCalledWith('my_course_material_object', { p_path: req.body.filePath });
    expect(download).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it('rejects an object older than ten minutes using database created_at', async () => {
    ownedObject.created_at = new Date(Date.now() - 600_001).toISOString();
    const res = await call();
    expect(res.statusCode).toBe(400);
    expect(download).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it.each([
    ['database fault', { code: 'XX000', message: 'Database unavailable' }],
    ['missing migration', { code: 'PGRST202', message: 'Could not find function' }],
  ])('fails closed on %s', async (_label, error) => {
    rpc.mockImplementation(async (name) => name === 'my_course_material_object'
      ? { data: null, error }
      : { data: [{ allowed: true }], error: null });
    const res = await call();
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toMatch(/temporarily unavailable/);
    expect(download).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it('records the database size, never the client size', async () => {
    const req = request();
    req.body.fileSize = 999_999_999;
    await call(req);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ file_size: 2048 }));
  });

  it.each([null, 'invalid'])('stores null size for missing or invalid database size (%s)', async (size) => {
    ownedObject.size = size;
    const req = request();
    req.body.fileSize = 999_999_999;
    expect((await call(req)).statusCode).toBe(200);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ file_size: null }));
  });

  // Ownership is proven before the download, so a storage hiccup only costs
  // the tutor text: the row is still registered, and the caller is told.
  it('registers with null text and extracted: false when the download fails', async () => {
    download.mockResolvedValue({ data: null, error: { status: 503, message: 'Storage unavailable' } });
    const res = await call();
    expect(res.statusCode).toBe(200);
    expect(res.body.extracted).toBe(false);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: null }));
  });

  it('still refuses a non-owner even when the download would fail', async () => {
    rpc.mockImplementation(async (name) => (name === 'my_course_material_object'
      ? { data: [], error: null }
      : { data: [{ allowed: true, remaining: 19, reset_at: new Date(Date.now() + 600_000).toISOString() }], error: null }));
    download.mockResolvedValue({ data: null, error: { status: 503, message: 'Storage unavailable' } });
    const res = await call();
    expect(res.statusCode).toBe(403);
    expect(insert).not.toHaveBeenCalled();
  });

  it('rejects an object replaced between download and registration', async () => {
    let checks = 0;
    rpc.mockImplementation(async (name) => name === 'my_course_material_object'
      ? { data: [{ ...ownedObject, object_id: ++checks === 1 ? 'object-1' : 'object-2' }], error: null }
      : { data: [{ allowed: true }], error: null });
    const res = await call();
    expect(res.statusCode).toBe(409);
    expect(download).toHaveBeenCalledTimes(1);
    expect(insert).not.toHaveBeenCalled();
  });

  it('rejects an object removed after download', async () => {
    let checks = 0;
    rpc.mockImplementation(async (name) => name === 'my_course_material_object'
      ? { data: ++checks === 1 ? [ownedObject] : [], error: null }
      : { data: [{ allowed: true }], error: null });
    expect((await call()).statusCode).toBe(403);
    expect(insert).not.toHaveBeenCalled();
  });

  it('fails closed if the ownership recheck errors', async () => {
    let checks = 0;
    rpc.mockImplementation(async (name) => name === 'my_course_material_object'
      ? (++checks === 1
        ? { data: [ownedObject], error: null }
        : { data: null, error: { code: 'XX000', message: 'Database unavailable' } })
      : { data: [{ allowed: true }], error: null });
    expect((await call()).statusCode).toBe(503);
    expect(insert).not.toHaveBeenCalled();
  });

  it('rejects replay when the unique file path index reports a conflict', async () => {
    insert.mockReturnValue({ select: () => ({ single: async () => ({ data: null, error: { code: '23505' } }) }) });
    const res = await call();
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('This file is already registered.');
  });

  // Parser failures still register the verified material without tutor text.
  it('registers the material with null text and extracted: false when extraction throws', async () => {
    const req = request();
    req.body.filePath = req.body.filePath.replace(/\.txt$/, '.pdf');
    req.body.fileType = 'pdf';
    mocks.pdfParse.mockRejectedValue(new Error('corrupt PDF'));
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ material: { id: 'material-1' }, extracted: false });
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: null }));
  });
});
