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
let ownedRows;
let removeObject;

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
  return { ok: true, arrayBuffer: async () => buffer };
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  insert = vi.fn(() => ({ select: () => ({ single: async () => ({ data: { id: 'material-1' }, error: null }) }) }));
  ownedRows = [];
  removeObject = vi.fn(async () => ({ error: null }));
  profile = vi.fn(() => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { department: 'dataScience' } }) }) }) }));
  rpc = vi.fn(async () => ({ data: [{ allowed: true, remaining: 19, reset_at: new Date(Date.now() + 600_000).toISOString() }], error: null }));
  mocks.getStudent.mockResolvedValue({ user: { id: 'verified-user' }, db: { from: profile, rpc } });
  mocks.configured.mockReturnValue(true);
  mocks.serviceClient.mockReturnValue({
    from: vi.fn(() => ({ insert, select: () => ({ eq: async () => ({ data: ownedRows, error: null }) }) })),
    storage: { from: () => ({ remove: removeObject }) },
  });
  mocks.findCourse.mockReturnValue({ code: 'DSC 111', slug: 'known-course', materialsDepartment: 'general' });
  mocks.pdfParse.mockResolvedValue({ text: 'PDF text' });
  mocks.mammothExtract.mockResolvedValue({ value: 'Word text' });
  vi.stubGlobal('fetch', vi.fn(async () => bytes('Real downloaded text')));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Object.values(mocks).forEach((mock) => {
    if (typeof mock?.mockReset === 'function') mock.mockReset();
  });
});

describe('POST /api/extract', () => {
  it('rejects a student over the 30-file quota and removes the fresh object', async () => {
    ownedRows = Array.from({ length: 30 }, () => ({ file_size: 100 }));
    const req = request();
    const res = await call(req);
    expect(res.statusCode).toBe(413);
    expect(res.body.error).toMatch(/30 files or 150 MB/);
    expect(removeObject).toHaveBeenCalledWith([req.body.filePath]);
    expect(insert).not.toHaveBeenCalled();
  });
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
    rpc.mockResolvedValue({ data: [{ allowed: false, remaining: 0, reset_at: new Date(Date.now() + 120_000).toISOString() }], error: null });
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
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining(`/course-materials/${req.body.filePath}`));
    expect(insert).toHaveBeenCalledWith({
      course_code: 'DSC 111', course_slug: 'known-course', department: 'general',
      display_name: 'Week 1', file_path: req.body.filePath, file_size: Buffer.byteLength('Real downloaded text'),
      file_type: 'txt', description: 'Lecture notes', uploaded_by: 'verified-user',
      extracted_text: 'Real downloaded text',
    });
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
  ])('rejects %s before downloading or inserting', async (_label, body) => {
    const req = request();
    req.body = { ...req.body, ...body };
    const res = await call(req);
    expect(res.statusCode).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it.each([
    ['txt', 'Raw   text\nfrom storage', 'Raw text from storage'],
    ['docx', 'document bytes', 'Word text'],
    ['pdf', 'PDF bytes', 'PDF text'],
  ])('extracts .%s from fetched bytes', async (ext, content, expected) => {
    globalThis.fetch.mockResolvedValue(bytes(content));
    const req = request();
    req.body.filePath = req.body.filePath.replace(/\.txt$/, `.${ext}`);
    req.body.fileType = ext;
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: expected }));
    if (ext === 'docx') expect(mocks.mammothExtract).toHaveBeenCalledWith({ buffer: Buffer.from(content) });
    if (ext === 'pdf') expect(mocks.pdfParse).toHaveBeenCalledWith(Buffer.from(content));
  });

  it('caps extracted text at 50,000 characters and stores a non-extractable allowed type with null text', async () => {
    globalThis.fetch.mockResolvedValue(bytes('x'.repeat(50_001)));
    await call();
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: 'x'.repeat(50_000) }));
    insert.mockClear();
    const req = request();
    req.body.filePath = req.body.filePath.replace(/\.txt$/, '.png');
    req.body.fileType = 'png';
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ file_type: 'png', extracted_text: null }));
  });

  // The current path has only a course slug and timestamp. A student who knows
  // another student's fresh public object path can register that object as theirs.
  it.fails('rejects a fresh course object uploaded by another student', async () => {
    const req = request();
    req.body.filePath = `known-course/${Date.now()}-otherstudentsfile.txt`;
    globalThis.fetch.mockResolvedValue(bytes('Other student notes'));
    const res = await call(req);
    expect(res.statusCode).toBe(403);
    expect(insert).not.toHaveBeenCalled();
  });

  it('registers the material without tutor text when parsing throws', async () => {
    mocks.pdfParse.mockRejectedValue(new Error('corrupt PDF'));
    const req = request();
    req.body.filePath = req.body.filePath.replace(/\.txt$/, '.pdf');
    req.body.fileType = 'pdf';
    const res = await call(req);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ material: { id: 'material-1' }, extracted: false });
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ extracted_text: null }));
  });

  it('refuses registration when the uploaded object cannot be read', async () => {
    globalThis.fetch.mockRejectedValue(new Error('storage unavailable'));
    const res = await call();
    expect(res.statusCode).toBe(503);
    expect(insert).not.toHaveBeenCalled();
  });
});
