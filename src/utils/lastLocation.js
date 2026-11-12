// Remembers the last "resumable" study page so a returning user can be sent
// back to where they left off on their next sign-in (same device). Cross-device
// resume is handled separately by the cloud-synced ProgressDashboard on Home,
// which derives each track's next module from progress that syncs to the account.

const KEY = 'arete-last-location-v1';

// The last track MODULE page, kept apart from KEY. Opening Code Lab is itself a
// resumable visit and overwrites KEY with "/lab", so the catalogue could never
// learn from KEY which module the learner had open before arriving.
const MODULE_KEY = 'arete-last-module-v1';
const MODULE_PAGE = /^\/tracks\/[a-z]+\/[a-z0-9-]+$/;

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
    if (MODULE_PAGE.test(path)) localStorage.setItem(MODULE_KEY, path);
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

export function readLastModulePath() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const value = localStorage.getItem(MODULE_KEY);
    return typeof value === 'string' && MODULE_PAGE.test(value) ? value : null;
  } catch {
    return null;
  }
}
