// ============================================================================
//  Arete — Server-side Sentry helper for the Vercel serverless functions.
//  Captures errors thrown inside api/* handlers. Like the AI features, it
//  degrades gracefully: with no SENTRY_DSN set it is a no-op.
// ============================================================================

import * as Sentry from '@sentry/node';

const DSN = process.env.SENTRY_DSN;

// Init once per cold start. The globalThis guard keeps a re-imported module from
// double-initialising in a warm/reused Vercel function instance.
if (DSN && !globalThis.__areteSentryInit) {
  Sentry.init({
    dsn: DSN,
    environment: process.env.VERCEL_ENV || 'development',
    // Errors only — no performance tracing, to stay within the free-tier quota.
    tracesSampleRate: 0,
  });
  globalThis.__areteSentryInit = true;
}

// Report a server-side error to Sentry and flush before the function freezes.
// `tags` (e.g. { route: 'tutor' }) makes errors filterable in the dashboard.
// No-op when SENTRY_DSN is unset, so handlers can call it unconditionally.
export async function captureApiError(err, tags) {
  if (!DSN) return;
  Sentry.captureException(err, tags ? { tags } : undefined);
  // Serverless functions can be frozen the instant the response ends, so the
  // event must be flushed first. Bounded + best-effort: a Sentry hiccup must
  // never delay or break the user-facing response.
  await Sentry.flush(2000).catch(() => {});
}
