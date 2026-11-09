// One app-wide signal for "a free-tier daily allowance just ran out".
//
// Six features can hit a server-side quota (tutor, explainer, simplify,
// summarize, research, run), each with its own error display. Rather than teach
// every one of them to render an upgrade card, the two fetch helpers that all
// of them go through (fetchJsonWithFallback, streamTutor) announce it here, and
// a single <UpgradeToast> mounted in App.jsx listens. The feature still shows
// its own error text; the toast adds the way out.

export const QUOTA_EVENT = 'arete:quota-exceeded';

// True for the 429 body api/_lib/plan.js writes — as opposed to the short
// per-10-minute limit, which is not something Premium lifts.
export function isQuotaExceeded(status, data) {
  return status === 429 && data?.kind === 'quota_exceeded';
}

export function announceQuotaExceeded(data) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent(QUOTA_EVENT, {
      detail: { feature: data?.feature ?? null, limit: data?.limit ?? null, message: data?.error ?? '' },
    }));
  } catch (err) {
    // CustomEvent missing (very old WebView): the feature's own error text
    // still explains what happened, only the upgrade shortcut is lost.
    console.error('quotaEvents: could not announce quota:', err);
  }
}
