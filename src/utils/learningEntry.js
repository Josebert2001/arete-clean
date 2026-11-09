// Fixed destinations only: never turn a query parameter into an open redirect.
const KEY = 'arete-learning-entry';
export const SECURITY_SIGN_IN = '/signin?learn=cybersecurity';
export const SECURITY_START = '/tracks/security';

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
