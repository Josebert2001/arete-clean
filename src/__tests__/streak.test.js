import { describe, it, expect, beforeEach } from 'vitest';
import { toDayString, computeStreak, recordStudyActivity, readStudyDays } from '../utils/streak';

describe('toDayString', () => {
  it('formats a local calendar day as YYYY-MM-DD', () => {
    expect(toDayString(new Date(2026, 6, 18, 23, 59))).toBe('2026-07-18');
    expect(toDayString(new Date(2026, 0, 5, 0, 0))).toBe('2026-01-05');
  });
});

describe('computeStreak', () => {
  it('counts consecutive days ending today', () => {
    const days = ['2026-07-16', '2026-07-17', '2026-07-18'];
    expect(computeStreak(days, new Date(2026, 6, 18, 12))).toBe(3);
  });

  it('keeps the streak alive when today has no activity yet', () => {
    const days = ['2026-07-16', '2026-07-17'];
    expect(computeStreak(days, new Date(2026, 6, 18, 9))).toBe(2);
  });

  it('resets to zero after a missed day', () => {
    expect(computeStreak(['2026-07-15'], new Date(2026, 6, 18))).toBe(0);
  });

  it('only counts the consecutive tail, not older history', () => {
    const days = ['2026-07-10', '2026-07-17', '2026-07-18'];
    expect(computeStreak(days, new Date(2026, 6, 18))).toBe(2);
  });

  it('crosses month boundaries', () => {
    const days = ['2026-06-30', '2026-07-01'];
    expect(computeStreak(days, new Date(2026, 6, 1, 20))).toBe(2);
  });

  it('is zero with no recorded days', () => {
    expect(computeStreak([], new Date())).toBe(0);
  });
});

describe('recordStudyActivity', () => {
  beforeEach(() => localStorage.clear());

  it('records study pages but not non-study pages', () => {
    recordStudyActivity('/tracks/java/loops', new Date(2026, 6, 18));
    recordStudyActivity('/', new Date(2026, 6, 18));
    recordStudyActivity('/signin', new Date(2026, 6, 18));
    expect(readStudyDays()).toEqual(['2026-07-18']);
  });

  it('does not duplicate the same day across visits', () => {
    recordStudyActivity('/lab', new Date(2026, 6, 18, 9));
    recordStudyActivity('/cheatsheet', new Date(2026, 6, 18, 20));
    expect(readStudyDays()).toEqual(['2026-07-18']);
  });

  it('accumulates distinct days', () => {
    recordStudyActivity('/lab', new Date(2026, 6, 17));
    recordStudyActivity('/lab', new Date(2026, 6, 18));
    expect(readStudyDays()).toEqual(['2026-07-17', '2026-07-18']);
  });
});
