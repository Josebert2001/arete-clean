import * as Sentry from '@sentry/react';

// Initialises Sentry error monitoring for the browser app. Like the AI features,
// this degrades gracefully: with no VITE_SENTRY_DSN set (local dev, or before the
// project is configured) it is a no-op, so nothing is sent and nothing breaks.
//
// Errors only — performance tracing is intentionally left off to stay within the
// Sentry free-tier quota. Add `tracesSampleRate` + browserTracingIntegration here
// later if you want transaction/perf data.
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    // We have signed-in students — don't attach IP addresses or other default PII.
    sendDefaultPii: false,
  });
}
