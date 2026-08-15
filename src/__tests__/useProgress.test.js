import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mergeProgress, readProgress } from '../components/useProgress';

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

  it('returns parsed data from localStorage', () => {
    const stored = { completedModules: [1, 2], quizScores: { 1: { score: 5, total: 7, date: 100 } } };
    localStorage.setItem('test-key', JSON.stringify(stored));
    const result = readProgress('test-key');
    expect(result).toEqual(stored);
  });

  it('returns empty progress when localStorage contains invalid JSON', () => {
    localStorage.setItem('bad-key', '{not valid json}}}');
    const result = readProgress('bad-key');
    expect(result).toEqual({ completedModules: [], quizScores: {} });
  });
});
