// Fixed destinations only: never turn a query parameter into an open redirect.
const KEY = 'arete-learning-entry';
export const SECURITY_SIGN_IN = '/signin?learn=cybersecurity';
export const SECURITY_START = '/tracks/security';
export const CAREER_SIGN_IN = '/signin?learn=career';
export const CAREER_START = '/career';

export function signInEntryQuery(entry) {
  if (entry === 'career') return '?learn=career';
  return entry === true || entry === 'cybersecurity' ? '?learn=cybersecurity' : '';
}

export function rememberCareerEntry(search) {
  if (new URLSearchParams(search).get('learn') !== 'career') return;
  try { sessionStorage.setItem(KEY, 'career'); } catch { /* optional browser storage */ }
}

export function hasCareerEntry() {
  try { return sessionStorage.getItem(KEY) === 'career'; } catch { return false; }
}

export function rememberSecurityEntry(search) {
  if (new URLSearchParams(search).get('learn') !== 'cybersecurity') return;
  try { sessionStorage.setItem(KEY, 'cybersecurity'); } catch { /* optional browser storage */ }
}

export function hasSecurityEntry() {
  try { return sessionStorage.getItem(KEY) === 'cybersecurity'; } catch { return false; }
}

export function clearSecurityEntry() {
  try { sessionStorage.removeItem(KEY); } catch { /* optional browser storage */ }
}
