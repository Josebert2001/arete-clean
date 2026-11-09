import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders } from '../_lib/request-policy.js';
import { serviceRoleClient, serviceRoleConfigured } from '../_lib/serviceRole.js';

const BUCKET = 'course-materials';
const MAX_OBJECTS = 200;
const MAX_FOLDERS = 200;
const BATCH = 50;
const MIN_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = { namespace: 'sweep-materials', limit: 3, windowMs: 60 * 60 * 1000 };

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.CRON_SECRET || !serviceRoleConfigured()) {
    return res.status(503).json({ error: 'Material sweep is not configured.' });
  }
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const limit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, limit);
  if (!limit.allowed) return res.status(429).json({ error: 'Sweep rate limit reached.' });

  const db = serviceRoleClient();
  const store = db.storage.from(BUCKET);
  const { data: folders, error: folderError } = await store.list('', { limit: MAX_FOLDERS });
  if (folderError) return res.status(503).json({ error: 'Could not list material folders.' });

  let scanned = 0;
  let removed = 0;
  const cutoff = Date.now() - MIN_AGE_MS;
  // Rotate the page across days so a folder with many registered files cannot
  // permanently hide later orphaned objects behind the per-run work cap.
  const pageOffset = (Math.floor(Date.now() / 86_400_000) % 100) * 100;
  for (const folder of folders ?? []) {
    if (scanned >= MAX_OBJECTS) break;
    if (folder.id) continue;
    const pageOptions = {
      limit: Math.min(MAX_OBJECTS - scanned, 100), offset: pageOffset,
      sortBy: { column: 'created_at', order: 'asc' },
    };
    let { data: objects, error: listError } = await store.list(folder.name, pageOptions);
    if (!listError && !objects?.length && pageOffset) {
      ({ data: objects, error: listError } = await store.list(folder.name, { ...pageOptions, offset: 0 }));
    }
    if (listError) return res.status(503).json({ error: 'Could not list material objects.', scanned, removed });
    scanned += objects?.length ?? 0;
    const oldPaths = (objects ?? [])
      .filter(object => object.id && Date.parse(object.created_at) < cutoff)
      .map(object => `${folder.name}/${object.name}`);
    for (let i = 0; i < oldPaths.length; i += BATCH) {
      const paths = oldPaths.slice(i, i + BATCH);
      const { data: registered, error: lookupError } = await db.from('course_materials')
        .select('file_path').in('file_path', paths);
      if (lookupError) return res.status(503).json({ error: 'Could not check material registrations.', scanned, removed });
      const known = new Set((registered ?? []).map(row => row.file_path));
      const orphans = paths.filter(path => !known.has(path));
      if (orphans.length) {
        const { error: removeError } = await store.remove(orphans);
        if (removeError) return res.status(503).json({ error: 'Could not remove orphaned materials.', scanned, removed });
        removed += orphans.length;
      }
    }
  }
  return res.status(200).json({ scanned, removed });
}
