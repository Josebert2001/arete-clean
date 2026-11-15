// Which flag challenges were captured in THIS browser.
//
// The list is per device, not per account, so on its own it says nothing about
// who solved a room: on a shared laptop the next learner would inherit the
// last one's solved rooms and their write-ups. The room page therefore only
// trusts it together with that account's own synced progress (see
// TrackModuleDetail), and treats the synced `flag` step tick as the record
// that travels between devices.

const SOLVED_STORE_KEY = 'arete-solved-flags-v1';

export function readSolvedFlags() {
  try {
    const raw = JSON.parse(localStorage.getItem(SOLVED_STORE_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(id => typeof id === 'string') : [];
  } catch {
    // Storage blocked or the entry is corrupt: nothing is recorded here.
    return [];
  }
}

export function hasSolvedFlag(challengeId) {
  return readSolvedFlags().includes(challengeId);
}

export function persistSolvedFlag(challengeId) {
  try {
    const set = new Set(readSolvedFlags());
    set.add(challengeId);
    localStorage.setItem(SOLVED_STORE_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage unavailable (private mode / disabled) — solved state just
    // won't persist across reloads. Not fatal.
  }
}
