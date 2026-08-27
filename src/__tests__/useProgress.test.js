import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mergeProgress, readProgress, sanitizeProgress } from '../components/useProgress';
import { MAX_BOX } from '../utils/reviewSchedule';

// ─── mergeProgress ────────────────────────────────────────────────────────────

describe('mergeProgress', () => {
  it('returns local unchanged when cloud is null', () => {
    const local = { completedModules: [1, 2], quizScores: { 1: { score: 5, total: 7, date: 100 } } };
    expect(mergeProgress(local, null)).toEqual(local);
  });

  it('returns local unchanged when cloud is undefined', () => {
    const local = { completedModules: [3], quizScores: {} };
    expect(mergeProgress(local, undefined)).toEqual(local);
  });

  it('unions completed modules without duplicates', () => {
    const local = { completedModules: [1, 2], quizScores: {} };
    const cloud = { completedModules: [2, 3], quizScores: {} };
    const result = mergeProgress(local, cloud);
    expect(result.completedModules).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(result.completedModules).toHaveLength(3);
  });

  it('cloud quiz score wins when local is older', () => {
    const local = { completedModules: [], quizScores: { 1: { score: 3, total: 7, date: 50 } } };
    const cloud = { completedModules: [], quizScores: { 1: { score: 6, total: 7, date: 100 } } };
    const result = mergeProgress(local, cloud);
    expect(result.quizScores[1].score).toBe(6);
  });

  it('local quiz score wins when local is newer', () => {
    const local = { completedModules: [], quizScores: { 1: { score: 7, total: 7, date: 200 } } };
    const cloud = { completedModules: [], quizScores: { 1: { score: 4, total: 7, date: 100 } } };
    const result = mergeProgress(local, cloud);
    expect(result.quizScores[1].score).toBe(7);
  });

  it('local quiz score wins on equal dates (local takes precedence)', () => {
    const local = { completedModules: [], quizScores: { 1: { score: 5, total: 7, date: 100 } } };
    const cloud = { completedModules: [], quizScores: { 1: { score: 3, total: 7, date: 100 } } };
    const result = mergeProgress(local, cloud);
    expect(result.quizScores[1].score).toBe(5);
  });

  it('includes cloud quiz scores not present in local', () => {
    const local = { completedModules: [], quizScores: { 1: { score: 5, total: 7, date: 100 } } };
    const cloud = { completedModules: [], quizScores: { 2: { score: 6, total: 7, date: 100 } } };
    const result = mergeProgress(local, cloud);
    expect(result.quizScores[1].score).toBe(5);
    expect(result.quizScores[2].score).toBe(6);
  });

  it('handles missing quizScores on local gracefully', () => {
    const local = { completedModules: [1] };
    const cloud = { completedModules: [], quizScores: { 1: { score: 4, total: 7, date: 100 } } };
    const result = mergeProgress(local, cloud);
    expect(result.quizScores[1].score).toBe(4);
  });

  it('handles missing quizScores on cloud gracefully', () => {
    const local = { completedModules: [], quizScores: { 1: { score: 4, total: 7, date: 100 } } };
    const cloud = { completedModules: [2] };
    const result = mergeProgress(local, cloud);
    expect(result.quizScores[1].score).toBe(4);
    expect(result.completedModules).toContain(2);
  });

  it('handles missing completedModules on both sides', () => {
    const local = { quizScores: {} };
    const cloud = { quizScores: {} };
    const result = mergeProgress(local, cloud);
    expect(result.completedModules).toEqual([]);
  });
});

// ─── mergeProgress: review-queue items ────────────────────────────────────────
// Merged per item rather than per bank, so reviewing on a phone and then opening
// a laptop keeps both sessions.

describe('mergeProgress — review items', () => {
  const state = (t, extra = {}) => ({ b: 2, d: 100, n: 1, l: 0, t, ...extra });

  it('omits items entirely when neither side has any', () => {
    const result = mergeProgress({ completedModules: [], quizScores: {} }, { completedModules: [], quizScores: {} });
    expect(result).not.toHaveProperty('items');
  });

  it('carries cloud items when local has none', () => {
    const cloud = { completedModules: [], quizScores: {}, items: { 'q:c:a': state(500) } };
    const result = mergeProgress({ completedModules: [], quizScores: {} }, cloud);
    expect(result.items['q:c:a'].t).toBe(500);
  });

  it('carries local items when cloud has none', () => {
    const local = { completedModules: [], quizScores: {}, items: { 'q:c:a': state(500) } };
    const result = mergeProgress(local, { completedModules: [], quizScores: {} });
    expect(result.items['q:c:a'].t).toBe(500);
  });

  it('unions items reviewed on different devices', () => {
    const local = { items: { 'q:c:a': state(500) } };
    const cloud = { items: { 'q:c:b': state(600) } };
    const result = mergeProgress(local, cloud);
    expect(Object.keys(result.items).sort()).toEqual(['q:c:a', 'q:c:b']);
  });

  it('keeps the more recent review of the same item', () => {
    const local = { items: { 'q:c:a': state(900, { b: 4 }) } };
    const cloud = { items: { 'q:c:a': state(500, { b: 2 }) } };
    expect(mergeProgress(local, cloud).items['q:c:a'].b).toBe(4);
  });

  it('lets a newer cloud review win over a stale local one', () => {
    const local = { items: { 'q:c:a': state(100, { b: 1 }) } };
    const cloud = { items: { 'q:c:a': state(900, { b: 5 }) } };
    expect(mergeProgress(local, cloud).items['q:c:a'].b).toBe(5);
  });

  it('prefers local on an exact timestamp tie, matching quizScores', () => {
    const local = { items: { 'q:c:a': state(500, { b: 3 }) } };
    const cloud = { items: { 'q:c:a': state(500, { b: 1 }) } };
    expect(mergeProgress(local, cloud).items['q:c:a'].b).toBe(3);
  });

  it('treats an item with no timestamp as oldest', () => {
    const local = { items: { 'q:c:a': { b: 1, d: 1, n: 1, l: 0 } } };
    const cloud = { items: { 'q:c:a': state(400, { b: 4 }) } };
    expect(mergeProgress(local, cloud).items['q:c:a'].b).toBe(4);
  });

  it('still returns local untouched when cloud is null, items and all', () => {
    const local = { completedModules: [], quizScores: {}, items: { 'q:c:a': state(500) } };
    expect(mergeProgress(local, null)).toEqual(local);
  });
});

// ─── readProgress ─────────────────────────────────────────────────────────────

describe('readProgress', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('returns empty progress when storageKey is null', () => {
    const result = readProgress(null);
    expect(result).toEqual({ completedModules: [], quizScores: {} });
  });

  it('returns empty progress when storageKey is undefined', () => {
    const result = readProgress(undefined);
    expect(result).toEqual({ completedModules: [], quizScores: {} });
  });

  it('returns empty progress when localStorage has nothing for the key', () => {
    const result = readProgress('test-key');
    expect(result).toEqual({ completedModules: [], quizScores: {} });
  });

  // Fixture uses string ids because that is what the app actually stores —
  // module ids come from the data files ('foundations', 'sec-intro'), reading
  // ids are `${slug}#${hash}`. It previously used numbers, which readProgress
  // now drops as junk (see sanitizeProgress).
  it('returns parsed data from localStorage', () => {
    const stored = {
      completedModules: ['foundations', 'arrays'],
      quizScores: { foundations: { score: 5, total: 7, date: 100 } },
    };
    localStorage.setItem('test-key', JSON.stringify(stored));
    const result = readProgress('test-key');
    expect(result).toEqual(stored);
  });

  it('drops malformed entries from stored progress without losing the good ones', () => {
    localStorage.setItem('test-key', JSON.stringify({
      completedModules: ['foundations', 42, null, { nope: true }, 'arrays'],
      quizScores: {
        foundations: { score: 5, total: 7, date: 100 },
        broken: { score: 'lots', total: 7 },
      },
    }));
    const result = readProgress('test-key');
    expect(result.completedModules).toEqual(['foundations', 'arrays']);
    expect(Object.keys(result.quizScores)).toEqual(['foundations']);
  });

  it('returns empty progress when localStorage contains invalid JSON', () => {
    localStorage.setItem('bad-key', '{not valid json}}}');
    const result = readProgress('bad-key');
    expect(result).toEqual({ completedModules: [], quizScores: {} });
  });
});

// ─── sanitizeProgress ─────────────────────────────────────────────────────────
// Guards the two places a progress blob re-enters the app: localStorage (which
// anything on the origin can edit) and user_progress.progress (written straight
// from the client). The governing rule is that a bad ENTRY is dropped and the
// rest of the blob survives — silently wiping a student's real progress would
// be worse than the corruption being defended against.

describe('sanitizeProgress', () => {
  it('returns empty progress for anything that is not an object', () => {
    const empty = { completedModules: [], quizScores: {} };
    expect(sanitizeProgress(null)).toEqual(empty);
    expect(sanitizeProgress(undefined)).toEqual(empty);
    expect(sanitizeProgress('nope')).toEqual(empty);
    expect(sanitizeProgress(42)).toEqual(empty);
    // An array is an object, but never a valid blob.
    expect(sanitizeProgress(['foundations'])).toEqual(empty);
  });

  it('passes a well-formed blob through untouched', () => {
    const good = {
      completedModules: ['foundations', 'arrays'],
      quizScores: { foundations: { score: 8, total: 10, date: 1700000000000 } },
    };
    expect(sanitizeProgress(good)).toEqual(good);
  });

  it('keeps valid modules while dropping non-string ids', () => {
    const result = sanitizeProgress({
      completedModules: ['foundations', 7, null, undefined, {}, [], 'arrays'],
    });
    expect(result.completedModules).toEqual(['foundations', 'arrays']);
  });

  it('dedupes repeated module ids', () => {
    const result = sanitizeProgress({ completedModules: ['a', 'a', 'b', 'a'] });
    expect(result.completedModules).toEqual(['a', 'b']);
  });

  it('rejects quiz scores whose score or total is not a real number', () => {
    const result = sanitizeProgress({
      quizScores: {
        ok: { score: 3, total: 5, date: 10 },
        stringScore: { score: '3', total: 5 },
        nanTotal: { score: 3, total: NaN },
        infinite: { score: Infinity, total: 5 },
        notAnObject: 'nope',
        nullEntry: null,
      },
    });
    expect(Object.keys(result.quizScores)).toEqual(['ok']);
  });

  it('defaults a missing or malformed quiz date to 0 rather than dropping the score', () => {
    const result = sanitizeProgress({
      quizScores: { a: { score: 1, total: 2 }, b: { score: 1, total: 2, date: 'yesterday' } },
    });
    expect(result.quizScores.a.date).toBe(0);
    expect(result.quizScores.b.date).toBe(0);
  });

  it('omits the items key entirely when the blob has none', () => {
    // mergeProgress relies on this — a track record must not grow an empty map.
    expect('items' in sanitizeProgress({ completedModules: ['a'] })).toBe(false);
  });

  it('keeps well-formed review items and drops ones missing box or due day', () => {
    const result = sanitizeProgress({
      items: {
        good: { b: 3, d: 120, n: 4, l: 1, t: 1700000000000 },
        noBox: { d: 120 },
        noDue: { b: 3 },
        junk: 'nope',
      },
    });
    expect(Object.keys(result.items)).toEqual(['good']);
    expect(result.items.good).toEqual({ b: 3, d: 120, n: 4, l: 1, t: 1700000000000 });
  });

  it('clamps a forged box number into the real ladder', () => {
    const result = sanitizeProgress({
      items: {
        tooHigh: { b: 9999, d: 1 },
        tooLow: { b: -5, d: 1 },
      },
    });
    expect(result.items.tooHigh.b).toBe(MAX_BOX);
    expect(result.items.tooLow.b).toBe(1);
  });

  it('defaults missing review counters instead of emitting undefined', () => {
    const { items } = sanitizeProgress({ items: { a: { b: 2, d: 30 } } });
    expect(items.a).toEqual({ b: 2, d: 30, n: 0, l: 0, t: 0 });
  });

  it('caps how many entries a single blob can carry', () => {
    const completedModules = Array.from({ length: 6000 }, (_, i) => `m-${i}`);
    expect(sanitizeProgress({ completedModules }).completedModules).toHaveLength(5000);
  });

  it('drops absurdly long ids', () => {
    const result = sanitizeProgress({ completedModules: ['ok', 'x'.repeat(500)] });
    expect(result.completedModules).toEqual(['ok']);
  });
});
