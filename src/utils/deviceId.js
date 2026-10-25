// A stable, per-browser identifier used for "one device = one check-in per
// session". It is NOT a security token — it only has to be consistent on the
// same phone and different across phones, which a stored random id achieves.
// Kept in localStorage so it survives reloads; regenerated only if cleared.
const KEY = 'arete-device-id';

export function getDeviceId() {
  if (typeof localStorage === 'undefined') {
    // No storage (very rare) — fall back to a per-session random id.
    return 'nostore-' + Math.random().toString(36).slice(2);
  }
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = (crypto?.randomUUID?.() ?? ('dev-' + Math.random().toString(36).slice(2) + Date.now()));
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'nostore-' + Math.random().toString(36).slice(2);
  }
}