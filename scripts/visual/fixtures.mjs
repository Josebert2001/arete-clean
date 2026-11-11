import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export const FIXED_TIME = Date.parse('2026-11-10T10:00:00Z');
const USER_ID = '11111111-1111-4111-8111-111111111111';
const OFFER_ID = '22222222-2222-4222-8222-222222222222';
const SESSION_ID = '33333333-3333-4333-8333-333333333333';
export const OFFERING = { id: OFFER_ID, course_code: 'CYB 221', course_title: 'Network Defense', department: 'cybersecurity', level: '200L', academic_session: '2026/2027', threshold_pct: 75, threshold_set_at: null };
export const PASS = { id: 'semester', name: 'Semester Pass', priceKobo: 250000, currency: 'NGN', durationDays: 180 };
const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');

export function actorData(actor) {
  const user = actor === 'guest' ? null : { id: USER_ID, aud: 'authenticated', role: 'authenticated', email: 'learner@visual.example.test', email_confirmed_at: '2026-01-01T00:00:00Z', created_at: '2026-01-01T00:00:00Z', app_metadata: { provider: 'email', providers: ['email'] }, user_metadata: {}, identities: [] };
  const department = actor === 'science' ? 'dataScience' : ['foundation', 'independent'].includes(actor) ? 'general' : 'cybersecurity';
  const profile = ['guest', 'new'].includes(actor) ? null : { id: USER_ID, full_name: 'Ada Visual', reg_number: 'VISUAL/2026/001', level: actor === 'independent' ? null : '200L', department, department_other: actor === 'foundation' ? 'Engineering' : null, selected_courses: null, learning_mode: actor === 'independent' ? 'independent' : 'university', created_at: '2026-01-01T00:00:00Z' };
  const token = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ sub: USER_ID, aud: 'authenticated', role: 'authenticated', exp: 2208988800, iat: 1767225600, iss: 'https://visual-fixture.supabase.co/auth/v1' })}.visual-only-signature`;
  const session = user ? { access_token: token, refresh_token: 'visual-only-refresh-token', token_type: 'bearer', expires_in: 31536000, expires_at: 2208988800, user } : null;
  return { user, profile, session };
}

export function tableRows(table, actor, url) {
  const { profile } = actorData(actor);
  if (table === 'profiles') return profile ? [profile] : [];
  if (table === 'user_roles') return ['admin', 'lecturer'].includes(actor) ? [{ user_id: USER_ID, role: actor }] : [];
  if (table === 'course_reps') return actor === 'rep' ? [{ user_id: USER_ID, department: 'cybersecurity', level: '200L', academic_session: '2026/2027' }] : [];
  if (table === 'course_offerings') return [OFFERING];
  if (table === 'offering_lecturers') return ['admin', 'lecturer'].includes(actor) ? [{ offering_id: OFFER_ID, lecturer_id: USER_ID, course_offerings: OFFERING }] : [];
  if (table === 'user_progress') {
    const key = (url.searchParams.get('storage_key') || '').replace(/^eq\./, '');
    return [{ user_id: USER_ID, storage_key: key, progress: key === 'arete-study-days-v1' ? { days: ['2026-11-09', '2026-11-10'] } : { completedModules: [], quizScores: {} } }];
  }
  return [];
}

export function rpcData(name, _actor) {
  if (name === 'admin_billing_summary') return { payments: { revenue_kobo: 250000, revenue_30d_kobo: 250000, counts: { success: 1 }, monthly: [] }, passes: { active: 1, expiring_14d: 0 }, usage: { signups_7d: 2, signups_30d: 4, weekly_active: 3, daily_students: { 'daily:tutor': 1 } }, conversion: 1 / 3 };
  if (name === 'admin_list_staff') return [{ user_id: USER_ID, id: USER_ID, full_name: 'Ada Visual', email: 'lecturer@visual.example.test', role: 'lecturer' }];
  if (name === 'discover_open_sessions') return [{ id: SESSION_ID, offering_id: OFFER_ID, course_code: 'CYB 221', course_title: 'Network Defense', level: '200L', title: 'Visual fixture session', closes_at: '2026-11-10T10:15:00Z', geo_required: false }];
  if (name === 'my_attendance_summary') return [{ offering_id: OFFER_ID, course_code: 'CYB 221', course_title: 'Network Defense', academic_session: '2026/2027', total_held: 4, attended: 3, threshold_pct: 75 }];
  if (name === 'register_summary') return [{ student_id: USER_ID, full_name: 'Ada Visual', reg_number: 'VISUAL/2026/001', attended: 3, present: 3, total_held: 4, percent: 75, percentage: 75 }];
  if (name === 'held_sessions_count') return 4;
  if (name === 'sync_offering_roster') return [{ ok: true }];
  return [];
}

export async function installFixtures(context, scenario, theme, fontCache, { baseURL = 'http://127.0.0.1:5184', fontDirectory = path.resolve('.tailwind-visual.local/fonts') } = {}) {
  const actor = scenario.actor;
  const { user, session } = actorData(actor);
  await context.addInitScript(({ session, theme, fixedTime }) => {
    const RealDate = Date;
    class FrozenDate extends RealDate { constructor(...args) { super(...(args.length ? args : [fixedTime])); } static now() { return fixedTime; } }
    window.Date = FrozenDate;
    let randomSeed = 123456;
    Math.random = () => { randomSeed = (1664525 * randomSeed + 1013904223) >>> 0; return randomSeed / 4294967296; };
    localStorage.clear(); sessionStorage.clear();
    localStorage.setItem('arete-theme', theme);
    localStorage.setItem('feedback-prompt-v1:11111111-1111-4111-8111-111111111111', JSON.stringify({ status: 'dismissed', at: fixedTime }));
    localStorage.setItem('arete-study-days-v1', JSON.stringify(['2026-11-09', '2026-11-10']));
    if (session) localStorage.setItem('sb-visual-fixture-auth-token', JSON.stringify(session));
  }, { session, theme, fixedTime: FIXED_TIME });
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.hostname === 'visual-fixture.supabase.co') {
      let result;
      if (url.pathname.includes('/auth/v1/')) result = user;
      else if (url.pathname.includes('/rest/v1/rpc/')) result = rpcData(url.pathname.split('/').at(-1), actor);
      else {
        const table = url.pathname.split('/').at(-1);
        result = tableRows(table, actor, url);
        if ((request.headers().accept || '').includes('vnd.pgrst.object')) result = result[0] || null;
        if (request.method() !== 'GET' && request.method() !== 'HEAD') result = null;
      }
      return route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }, body: JSON.stringify(result) });
    }
    if (url.origin === baseURL && url.pathname.startsWith('/api/')) {
      let body = {}; try { body = request.postDataJSON() || {}; } catch { /* Use the default reply for an empty request body. */ }
      let result = { available: true, ready: true, connected: false };
      if (url.pathname === '/api/billing') result = { enabled: true, premium: actor === 'premium', premiumUntil: actor === 'premium' ? '2027-05-10T10:00:00Z' : null, pass: PASS };
      if (url.pathname.startsWith('/api/google/')) result = { available: true, configured: true, connected: false };
      if (body.probe) result = { available: true, ready: true };
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(result) });
    }
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      const key = request.url();
      if (!fontCache.has(key)) {
        fontCache.set(key, (async () => {
          const directory = fontDirectory;
          await fs.mkdir(directory, { recursive: true });
          const file = path.join(directory, `${crypto.createHash('sha256').update(key).digest('hex')}.json`);
          try {
            const saved = JSON.parse(await fs.readFile(file, 'utf8'));
            return { ...saved, body: Buffer.from(saved.body, 'base64') };
          } catch {
            const response = await route.fetch();
            const saved = { status: response.status(), headers: response.headers(), body: await response.body() };
            await fs.writeFile(file, JSON.stringify({ ...saved, body: saved.body.toString('base64') }));
            return saved;
          }
        })());
      }
      return route.fulfill(await fontCache.get(key));
    }
    if (url.origin !== baseURL) return route.abort();
    return route.continue();
  });
}
