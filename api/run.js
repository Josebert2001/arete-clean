// ============================================================================
//  Arete — Code Execution Serverless Function (Vercel)
//  Runs student Java/C/C++/Python code via JDoodle or self-hosted Judge0.
// ============================================================================
//
//  SETUP (Josebert — do this once before the playground works):
//
//  1. Sign up at https://www.jdoodle.com  (free, no card).
//  2. Subscribe to the free Compiler API plan at
//     https://www.jdoodle.com/subscribe-api  (20 free credits/day).
//  3. Get your Client ID and Client Secret from
//     https://www.jdoodle.com/compiler-api
//  4. In your Vercel project -> Settings -> Environment Variables, add:
//
//        JDOODLE_CLIENT_ID      = your_client_id
//        JDOODLE_CLIENT_SECRET  = your_client_secret
//
//  5. Redeploy. The playground goes live.
//
//  No keys set? The function returns a friendly "not configured yet" message
//  so the app never crashes -- it just tells the user the runner is coming soon.
//
//  NOTE ON LIMITS: JDoodle's free plan is 20 executions per day total (across
//  all users). Set RUNNER_PROVIDER=judge0 and JUDGE0_URL to use a self-hosted
//  runner without changing the frontend.
// ============================================================================

// JDoodle language codes + latest version index (verified 2026-03-26).
const LANGUAGES = {
  java:   { language: 'java',    versionIndex: '6' }, // latest JDK
  c:      { language: 'c',       versionIndex: '7' },
  cpp:    { language: 'cpp17',   versionIndex: '3' },
  python: { language: 'python3', versionIndex: '6' },
};
// Judge0 CE language IDs; self-hosted deployments may change their enabled
// language set, so verify /languages on the chosen instance before switching.
const JUDGE0_LANGUAGES = { java: 62, c: 50, cpp: 54, python: 71 };
// A hung runner must not hold a function instance (and the student's spinner)
// for the platform's whole timeout. Generous: a compile-and-run takes seconds.
const RUNNER_TIMEOUT_MS = 20000;
const runnerSignal = () => AbortSignal.timeout(RUNNER_TIMEOUT_MS);

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest, denyIfUserRateLimited } from './_lib/request-policy.js';
import { captureApiError } from './_lib/sentry.js';
import { getStudentFromRequest } from './_lib/supabase.js';
import { denyIfOverDailyQuota } from './_lib/plan.js';

const RATE_LIMIT = {
  namespace: 'run',
  limit: 10,
  windowMs: 10 * 60 * 1000,
};

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'run', { blocked: 'rate_limit' });
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many code-run requests from this device. Please wait a few minutes and try again.',
      kind: 'limit',
      status: 'Rate limit reached',
    });
  }

  // Signed-in only. JDoodle's free plan is 20 executions per DAY across every
  // user, so an anonymous caller could burn the whole department's playground
  // in a couple of minutes. Every caller in the app already sits behind a
  // RequireAuth route, so requiring the token costs no student anything.
  // Checked AFTER the rate limiter for the same reason as research.js: an
  // invalid token must not be able to force an uncounted Supabase auth call.
  const student = await getStudentFromRequest(req);
  if (!student) {
    logRequest(req, 'run', { denied: 'unauthorized' });
    return res.status(401).json({
      error: 'Please sign in to run code.',
      kind: 'unauthorized',
      status: 'Sign in required',
    });
  }

  // The budget that actually binds: per-student, in Postgres, shared across
  // instances. Matters more here than anywhere else — JDoodle's ceiling is a
  // hard 20 runs per DAY for the whole app, so one student on a fast loop
  // could still deny everyone else even while signed in.
  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'run',
    message: 'You have used your code-run allowance for now. Please wait a few minutes and try again.',
  })) return;

  // Free-tier daily allowance — lifted by Premium, inert until billing is on.
  // See api/_lib/plan.js.
  if (await denyIfOverDailyQuota(req, res, student, 'run')) return;

  const provider = process.env.RUNNER_PROVIDER || 'jdoodle';
  if (provider !== 'jdoodle' && provider !== 'judge0') {
    return res.status(503).json({ error: 'Code runner provider is not configured correctly.' });
  }
  const CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

  // Graceful fallback if not configured yet
  if (provider === 'judge0' && !process.env.JUDGE0_URL) {
    return res.status(200).json({ notConfigured: true, output: 'The code runner is not connected yet. Please try again later.' });
  }
  if (provider === 'jdoodle' && (!CLIENT_ID || !CLIENT_SECRET)) {
    return res.status(200).json({
      notConfigured: true,
      output: "The code runner isn't connected yet.\n\nOnce the JDoodle API keys are added (see api/run.js setup instructions), you'll be able to compile and run your code right here.",
    });
  }

  try {
    const { source_code, language = 'java', stdin = '' } = req.body || {};

    if (typeof source_code !== 'string' || !source_code.trim()) {
      return res.status(400).json({ error: 'No source code provided' });
    }
    if (source_code.length > 10000) {
      return res.status(400).json({ error: 'Code exceeds the 10,000 character limit.' });
    }
    if (typeof stdin !== 'string') {
      return res.status(400).json({ error: 'Invalid stdin value.' });
    }
    if (stdin.length > 1000) {
      return res.status(400).json({ error: 'stdin exceeds the 1,000 character limit.' });
    }

    // An unknown language used to run silently as Java, so a Python program
    // came back as a Java error and still spent a shared JDoodle credit.
    if (typeof language !== 'string' || !Object.hasOwn(LANGUAGES, language)) {
      return res.status(400).json({ error: 'Unsupported language. Use java, python, c or cpp.' });
    }
    const lang = LANGUAGES[language];
    if (provider === 'judge0') {
      const result = await runJudge0(source_code, language, stdin);
      return res.status(200).json(result);
    }

    const [jdoodleRes, creditRes] = await Promise.all([
      fetch('https://api.jdoodle.com/v1/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: runnerSignal(),
        body: JSON.stringify({
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          script: source_code,
          stdin: stdin,
          language: lang.language,
          versionIndex: lang.versionIndex,
        }),
      }),
      fetch('https://api.jdoodle.com/v1/credit-spent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: runnerSignal(),
        body: JSON.stringify({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET }),
      }),
    ]);

    const data = await jdoodleRes.json();
    const creditData = await creditRes.json().catch(() => null);
    const creditsUsed = typeof creditData?.used === 'number' ? creditData.used : null;
    const DAILY_LIMIT = 20;

    // JDoodle daily-limit / auth errors come back with an "error" field
    // or a non-200 statusCode in the body.
    if (data.error) {
      // Common case: out of daily credits
      const msg = String(data.error);
      const isLimit = /credit|limit|reached/i.test(msg);
      if (!isLimit) console.error('JDoodle runner error:', msg);
      return res.status(200).json({
        output: isLimit
          ? "Daily run limit reached for today. The free plan allows a limited number of runs per day. Please try again tomorrow, or read the code examples in the meantime."
          : "The code runner hit an unexpected error. Please try again in a moment.",
        kind: isLimit ? 'limit' : 'runtime_error',
        status: isLimit ? 'Daily limit reached' : 'Error',
        creditsUsed: DAILY_LIMIT,
        creditsRemaining: 0,
      });
    }

    const output = (data.output ?? '').toString();

    // JDoodle merges compile errors + stdout in `output`.
    // compilationStatus: 1 typically signals a compile failure on many languages,
    // but it's not always reliable, so we also sniff common error text.
    const looksLikeError =
      /error:|exception in thread|cannot find symbol|';' expected|incompatible types|illegal start|reached end of file while parsing/i.test(output);

    let kind = 'success';
    if (data.compilationStatus && Number(data.compilationStatus) !== 0) {
      kind = 'compile_error';
    } else if (looksLikeError) {
      kind = 'runtime_error';
    } else if (!output.trim()) {
      kind = 'empty';
    }

    return res.status(200).json({
      output: output.trim() ? output : '(no output)',
      kind,
      status: kind === 'success' ? 'Success'
            : kind === 'compile_error' ? 'Compilation Error'
            : kind === 'runtime_error' ? 'Error'
            : 'No output',
      time: data.cpuTime,
      memory: data.memory,
      creditsUsed: creditsUsed ?? null,
      creditsRemaining: creditsUsed !== null ? Math.max(0, DAILY_LIMIT - creditsUsed) : null,
    });
  } catch (err) {
    if (err?.name === 'TimeoutError') {
      console.error('Code runner timed out');
      return res.status(504).json({
        error: 'The code runner took too long to respond. Please try again in a moment.',
        kind: 'runtime_error',
        status: 'Runner timed out',
      });
    }
    console.error('Code runner error:', err);
    await captureApiError(err, { route: 'run' });
    return res.status(500).json({ error: 'Internal error running code. Please try again.' });
  }
}

async function runJudge0(sourceCode, language, stdin) {
  const base = new URL(process.env.JUDGE0_URL);
  if (!['http:', 'https:'].includes(base.protocol)) throw new Error('Invalid Judge0 URL');
  const endpoint = new URL('submissions?base64_encoded=true', `${base.href.replace(/\/$/, '')}/`);
  const headers = {
    'Content-Type': 'application/json',
    ...(process.env.JUDGE0_AUTH_TOKEN ? { 'X-Auth-Token': process.env.JUDGE0_AUTH_TOKEN } : {}),
  };
  const encode = value => Buffer.from(value, 'utf8').toString('base64');
  const submitted = await fetch(endpoint, {
    method: 'POST', headers, signal: runnerSignal(),
    body: JSON.stringify({ language_id: JUDGE0_LANGUAGES[language],
      source_code: encode(sourceCode), stdin: encode(stdin) }),
  });
  if (!submitted.ok) throw new Error(`Judge0 submission failed: ${submitted.status}`);
  const { token } = await submitted.json();
  if (!token || !/^[a-zA-Z0-9-]+$/.test(token)) throw new Error('Judge0 returned no valid submission token');
  let result;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    if (attempt) await new Promise(resolve => setTimeout(resolve, 650));
    const resultUrl = new URL(`submissions/${token}?base64_encoded=true&fields=stdout,stderr,compile_output,status,time,memory`, `${base.href.replace(/\/$/, '')}/`);
    const response = await fetch(resultUrl, { headers, signal: runnerSignal() });
    if (!response.ok) throw new Error(`Judge0 result failed: ${response.status}`);
    result = await response.json();
    if (Number(result.status?.id) > 2) break;
  }
  if (Number(result?.status?.id) <= 2) {
    return { output: 'Code execution is still queued. Please try again shortly.', kind: 'runtime_error', status: 'Runner busy', creditsUsed: null, creditsRemaining: null };
  }
  const decode = value => value ? Buffer.from(value, 'base64').toString('utf8') : '';
  const output = [decode(result.compile_output), decode(result.stdout), decode(result.stderr)].filter(Boolean).join('\n').trim();
  const statusId = Number(result.status?.id);
  const kind = statusId === 6 ? 'compile_error' : statusId !== 3 ? 'runtime_error' : output ? 'success' : 'empty';
  return {
    output: output || '(no output)', kind,
    status: kind === 'success' ? 'Success' : kind === 'compile_error' ? 'Compilation Error' : kind === 'empty' ? 'No output' : 'Error',
    time: result.time, memory: result.memory,
    creditsUsed: null, creditsRemaining: null,
  };
}
