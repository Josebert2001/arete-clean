import { describe, it, expect } from 'vitest';
import { pickDailyChallenge } from '../utils/dailyChallenge';

const tracks = [
  { slug: 'a', moduleIndex: [{ id: 'a1' }, { id: 'a2' }] },
  { slug: 'b', moduleIndex: [{ id: 'b1' }] },
];

describe('pickDailyChallenge', () => {
  it('is stable for the whole day', () => {
    const morning = new Date(2026, 6, 18, 8);
    const night = new Date(2026, 6, 18, 23);
    expect(pickDailyChallenge(tracks, new Set(), morning).module.id)
      .toBe(pickDailyChallenge(tracks, new Set(), night).module.id);
  });

  it('rotates through the whole pool across days', () => {
    const ids = [0, 1, 2].map(offset =>
      pickDailyChallenge(tracks, new Set(), new Date(2026, 6, 18 + offset)).module.id
    );
    expect(new Set(ids).size).toBe(3);
  });

  it('skips completed modules', () => {
    const day = new Date(2026, 6, 18);
    const first = pickDailyChallenge(tracks, new Set(), day).module.id;
    const next = pickDailyChallenge(tracks, new Set([first]), day).module.id;
    expect(next).not.toBe(first);
  });

  it('falls back to a replay when everything is complete', () => {
    const pick = pickDailyChallenge(tracks, new Set(['a1', 'a2', 'b1']), new Date());
    expect(pick).not.toBeNull();
  });

  it('returns null when there are no modules at all', () => {
    expect(pickDailyChallenge([], new Set(), new Date())).toBeNull();
  });

  it('carries the track alongside the module', () => {
    const pick = pickDailyChallenge(tracks, new Set(), new Date(2026, 6, 18));
    expect(pick.track.moduleIndex).toContain(pick.module);
  });
});
