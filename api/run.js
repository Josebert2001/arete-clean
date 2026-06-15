// ============================================================================
//  Arete — Code Execution Serverless Function (Vercel)
//  Runs student Java/C code via the JDoodle Compiler API.
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
//  NOTE ON LIMITS: The free plan is 20 executions per day total (across all
//  users). Good for testing and small demos. Before announcing to the whole
//  department, move to a self-hosted Judge0 (DigitalOcean/Oracle Cloud) and
//  swap this file back -- the frontend does not need to change.
// ============================================================================

// JDoodle language codes + latest version index (verified 2026-03-26).
const LANGUAGES = {
  java:   { language: 'java',    versionIndex: '6' }, // latest JDK
  c:      { language: 'c',       versionIndex: '7' },
  cpp:    { language: 'cpp17',   versionIndex: '3' },
  python: { language: 'python3', versionIndex: '6' },
};

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';

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

  logRequest(req, 'run');
  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many code-run requests from this device. Please wait a few minutes and try again.',
      kind: 'limit',
      status: 'Rate limit reached',
    });
  }

  const CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

  // Graceful fallback if not configured yet
  if (!CLIENT_ID || !CLIENT_SECRET) {
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

    const lang = LANGUAGES[language] || LANGUAGES.java;

    const [jdoodleRes, creditRes] = await Promise.all([
      fetch('https://api.jdoodle.com/v1/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      return res.status(200).json({
        output: isLimit
          ? "Daily run limit reached for today. The free plan allows a limited number of runs per day. Please try again tomorrow, or read the code examples in the meantime."
          : `Runner error: ${msg}`,
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
    console.error('Code runner error:', err);
    return res.status(500).json({ error: 'Internal error running code. Please try again.' });
  }
}
