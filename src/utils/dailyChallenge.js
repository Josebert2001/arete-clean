// ─── Daily challenge pick ─────────────────────────────────────────────────────
// Deterministically rotates through every module across all tracks — one pick
// per local calendar day, stable for the whole day — preferring modules the
// student hasn't completed yet. Pure, so it's unit-testable.

export function pickDailyChallenge(tracks, completedIds, now = new Date()) {
  const flat = tracks.flatMap(track =>
    track.moduleIndex.map(module => ({ track, module }))
  );
  if (flat.length === 0) return null;
  // Days since epoch in local time, so the pick flips at local midnight.
  const dayIndex = Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
  const start = ((dayIndex % flat.length) + flat.length) % flat.length;
  for (let i = 0; i < flat.length; i++) {
    const pick = flat[(start + i) % flat.length];
    if (!completedIds.has(pick.module.id)) return pick;
  }
  return flat[start]; // everything finished — offer a replay
}
