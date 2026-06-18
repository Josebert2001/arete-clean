// Remembers the last "resumable" study page so a returning user can be sent
// back to where they left off on their next sign-in (same device). Cross-device
// resume is handled separately by the cloud-synced ProgressDashboard on Home,
// which derives each track's next module from progress that syncs to the account.

const KEY = 'arete-last-location-v1';

// Pages worth resuming to. Transient/auth pages (home, sign-in, setup, welcome)
// are intentionally excluded so a fresh sign-in is never bounced back onto them.
const RESUMABLE = [
  /^\/tracks(\/|$)/,
  /^\/courses(\/|$)/,
  /^\/lab$/,
  /^\/cheatsheet$/,
  /^\/explainer$/,
  /^\/tutor$/,
  /^\/install$/,
];

export function isResumable(path) {
  return typeof path === 'string' && RESUMABLE.some(re => re.test(path));
}

export function recordLocation(path) {
  if (typeof localStorage === 'undefined' || !isResumable(path)) return;
  try {
    localStorage.setItem(KEY, path);
  } catch {
    // Private mode / quota — resume is a nicety, so silently skip.
  }
}

export function readLastLocation() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const value = localStorage.getItem(KEY);
    return isResumable(value) ? value : null;
  } catch {
    return null;
  }
}
