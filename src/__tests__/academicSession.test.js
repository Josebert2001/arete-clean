import { describe, it, expect } from 'vitest';
import { currentAcademicSession, isAcademicSession } from '../utils/academicSession';

describe('currentAcademicSession', () => {
  it('starts a new session in September', () => {
    expect(currentAcademicSession(new Date(2026, 8, 1))).toBe('2026/2027');
  });
  it('keeps January–August in the session that began the year before', () => {
    expect(currentAcademicSession(new Date(2027, 0, 15))).toBe('2026/2027');
    expect(currentAcademicSession(new Date(2026, 7, 31))).toBe('2025/2026');
  });
});

describe('isAcademicSession', () => {
  it('accepts consecutive years', () => {
    expect(isAcademicSession('2025/2026')).toBe(true);
    expect(isAcademicSession(' 2025/2026 ')).toBe(true);
  });
  it('rejects anything else', () => {
    expect(isAcademicSession('2025/2027')).toBe(false);
    expect(isAcademicSession('2025-2026')).toBe(false);
    expect(isAcademicSession('')).toBe(false);
  });
});
