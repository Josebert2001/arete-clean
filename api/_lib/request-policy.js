const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const RATE_LIMIT_STORE_KEY = Symbol.for('arete.rateLimitStore');

function getStore() {
  if (!globalThis[RATE_LIMIT_STORE_KEY]) {
    globalThis[RATE_LIMIT_STORE_KEY] = new Map();
  }
  return globalThis[RATE_LIMIT_STORE_KEY];
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const rawIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor || realIp || req.socket?.remoteAddress || 'unknown';

  return String(rawIp).split(',')[0].trim().toLowerCase();
}

function cleanupExpiredEntries(store, now) {
  for (const [key, bucket] of store.entries()) {
    if (bucket.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function applyApiHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
