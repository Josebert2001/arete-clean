// CORS origin wall. NEVER default to "*", and never fall back to a permissive
// value when the environment is merely unrecognised.
//
// What this header does and does not buy: ACAO governs whether a *browser* lets
// one origin read another origin's response. It is not a CSRF defence — a
// cross-origin page cannot obtain this app's bearer token in the first place
// (it lives in the app origin's storage, and browsers never attach an
// Authorization header on their own), and it is no defence at all against a
// non-browser client, which ignores CORS entirely. It is a read-gate, nothing
// more. The real frontend calls /api/* with relative URLs, so it is same-origin
// and needs no ACAO header at all; anything that *does* need one is a
// deliberate second consumer and must be named explicitly.
//
// Hence the rule: an origin is allowed only when someone set it.
//   * ALLOWED_ORIGIN set          -> exactly that origin may read across origins
//   * ALLOWED_ORIGIN unset        -> NO ACAO header; browsers refuse every
//                                    cross-origin read. Same-origin is unaffected.
//   * local dev needs localhost   -> opt in explicitly with ARETE_ALLOW_LOCAL_CORS=1
//
// Deriving this from VERCEL_ENV was the earlier approach and it failed open: any
// context where that variable is absent (self-hosting, a plain `node` run, a
// Vercel project with system env vars disabled, a CI harness) was treated as
// "not production" and advertised http://localhost:5173 to the world. Absence of
// a signal must never widen the wall.
const LOCAL_DEV_ORIGIN = 'http://localhost:5173';
const allowLocalCors = process.env.ARETE_ALLOW_LOCAL_CORS === '1';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN
  || (allowLocalCors ? LOCAL_DEV_ORIGIN : null);

if (!ALLOWED_ORIGIN) {
  // Discoverability only — same-origin calls keep working, but this must be
  // surfaced or a future cross-origin consumer will fail confusingly.
  console.error(
    'request-policy: ALLOWED_ORIGIN is not set; cross-origin /api/* calls are being refused. Same-origin calls are unaffected. Set ALLOWED_ORIGIN to your frontend origin if you serve the API from a separate domain, or ARETE_ALLOW_LOCAL_CORS=1 for local development.'
  );
}

const RATE_LIMIT_STORE_KEY = Symbol.for('arete.rateLimitStore');

function getStore() {
  if (!globalThis[RATE_LIMIT_STORE_KEY]) {
    globalThis[RATE_LIMIT_STORE_KEY] = new Map();
  }
  return globalThis[RATE_LIMIT_STORE_KEY];
}

function getClientIp(req) {
  // x-forwarded-for is client-suppliable (an attacker can send a different
  // fake leftmost entry on every request), so prefer Vercel's own edge-set
  // signal first — it can't be spoofed by the request itself.
  const vercelIp = req.headers['x-vercel-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const forwardedFor = req.headers['x-forwarded-for'];
  const rawIp = vercelIp || realIp || forwardedFor || req.socket?.remoteAddress || 'unknown';

  return String(Array.isArray(rawIp) ? rawIp[0] : rawIp).split(',')[0].trim().toLowerCase();
}

function cleanupExpiredEntries(store, now) {
  for (const [key, bucket] of store.entries()) {
    if (bucket.resetAt <= now) {
      store.delete(key);
    }
  }
}

// Availability probes ({ probe: true }) answer a boolean and make no model call,
// so they deliberately skip auth and the per-endpoint budget — the UI fires them
// on page load to decide whether to render a button at all, before the student
// has done anything. They were skipping rate limiting ENTIRELY though, which
// left an uncounted endpoint anyone could hammer. They now share one generous
// bucket across every endpoint: high enough that a student opening several pages
// never notices, low enough that it is not free traffic.
export const PROBE_RATE_LIMIT = {
  namespace: 'probe',
  limit: 60,
  windowMs: 10 * 60 * 1000,
};

export function applyApiHeaders(res) {
  // ALLOWED_ORIGIN is null whenever nobody named an origin — emit no ACAO header
  // then, so the browser blocks every cross-origin read (same-origin /api/*
  // requests from the frontend need no header).
  if (ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
}

export function enforceRateLimit(req, { namespace, limit, windowMs }) {
  const store = getStore();
  const now = Date.now();

  if (store.size > 500) {
    cleanupExpiredEntries(store, now);
  }

  const key = `${namespace}:${getClientIp(req)}`;
  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function setRateLimitHeaders(res, { limit, remaining, resetAt }) {
  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
}

// The real budget, charged against the signed-in student rather than an IP and
// held in Postgres so it survives cold starts and is shared across every
// concurrent lambda. `enforceRateLimit` above stays in front of this as a cheap
// per-IP guard that costs no round-trip; this is what actually caps a user.
//
// Backed by the consume_rate_limit() function in
// supabase/migrations/20260827000000_rate_limits.sql, which is SECURITY DEFINER
// and keys the bucket off auth.uid() internally — so `student.db` (the caller's
// own RLS-scoped client) is enough and no service-role key is needed here.
//
// FAILS OPEN, deliberately. Migrations in this project are applied by hand, so
// deployed code can legitimately run against a database where the function does
// not exist yet; a database hiccup must not take the tutor down either. When
// this can't reach a verdict the request proceeds on the in-memory limiter that
// already ran, and the failure is logged rather than swallowed.
export async function enforceUserRateLimit(student, { namespace, limit, windowMs }) {
  const windowSeconds = Math.ceil(windowMs / 1000);
  const fallback = {
    allowed: true,
    limit,
    remaining: limit - 1,
    resetAt: Date.now() + windowMs,
    retryAfterSeconds: windowSeconds,
    degraded: true,
  };

  if (!student?.db) return fallback;

  try {
    const { data, error } = await student.db.rpc('consume_rate_limit', {
      p_namespace: namespace,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });

    if (error) {
      console.error(`consume_rate_limit(${namespace}) failed, allowing request:`, error.message);
      return fallback;
    }

    // The function RETURNS TABLE, so PostgREST hands back an array of one row.
    const row = Array.isArray(data) ? data[0] : data;
    if (!row || typeof row.allowed !== 'boolean') {
      console.error(`consume_rate_limit(${namespace}) returned an unexpected shape, allowing request`);
      return fallback;
    }

    const resetAt = new Date(row.reset_at).getTime();
    const safeResetAt = Number.isFinite(resetAt) ? resetAt : Date.now() + windowMs;

    return {
      allowed: row.allowed,
      limit,
      remaining: Math.max(0, Number(row.remaining) || 0),
      resetAt: safeResetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((safeResetAt - Date.now()) / 1000)),
      degraded: false,
    };
  } catch (err) {
    console.error(`consume_rate_limit(${namespace}) threw, allowing request:`, err);
    return fallback;
  }
}

// Guard wrapper around enforceUserRateLimit: charges the budget, refreshes the
// X-RateLimit-* headers to the per-user verdict (the binding one, so it is what
// the client should see), and writes the 429 itself when the allowance is spent.
// Returns true when the handler should stop — call as `if (await ...) return;`.
export async function denyIfUserRateLimited(req, res, student, config, { route, message }) {
  const verdict = await enforceUserRateLimit(student, config);
  setRateLimitHeaders(res, verdict);
  if (verdict.allowed) return false;

  logRequest(req, route, { denied: 'user_rate_limit' });
  res.setHeader('Retry-After', String(verdict.retryAfterSeconds));
  res.status(429).json({ error: message, kind: 'rate_limited' });
  return true;
}

// Abuse-monitoring signal only — call when a request is denied, not on every request.
export function logRequest(req, route, extra = {}) {
  const ip = getClientIp(req);
  console.error(JSON.stringify({ route, ip, ts: Date.now(), method: req.method, ...extra }));
}
