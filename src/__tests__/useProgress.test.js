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
