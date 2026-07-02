import { describe, it, expect } from 'vitest';
import { yearsUntilQDay, moscaVerdict, Q_DAY_OPTIONS } from '../utils/mosca';

describe('yearsUntilQDay', () => {
  it('returns the gap between now and Q-Day', () => {
    expect(yearsUntilQDay(2032, 2026)).toBe(6);
  });

  it('never goes negative once Q-Day has passed', () => {
    expect(yearsUntilQDay(2030, 2035)).toBe(0);
  });
});

describe('moscaVerdict', () => {
  it('flags risk when needed protection exceeds the time left', () => {
    // The UNIUYO example from the CYB 222 note: 20 + 7 vs ~6 years left.
    const v = moscaVerdict({ secrecyYears: 20, migrationYears: 7, yearsLeft: 6 });
    expect(v.level).toBe('risk');
    expect(v.needed).toBe(27);
    expect(v.margin).toBe(-21);
  });

  it('is tight at exactly zero margin', () => {
    expect(moscaVerdict({ secrecyYears: 3, migrationYears: 3, yearsLeft: 6 }).level).toBe('tight');
  });

  it('is tight with up to two years of margin', () => {
    expect(moscaVerdict({ secrecyYears: 2, migrationYears: 2, yearsLeft: 6 }).level).toBe('tight');
  });

  it('is safe with more than two years of margin', () => {
    const v = moscaVerdict({ secrecyYears: 1, migrationYears: 2, yearsLeft: 6 });
    expect(v.level).toBe('safe');
    expect(v.margin).toBe(3);
  });

  it('flags risk by a single year', () => {
    expect(moscaVerdict({ secrecyYears: 4, migrationYears: 3, yearsLeft: 6 }).level).toBe('risk');
  });
});

describe('Q_DAY_OPTIONS', () => {
  it('offers the consensus 2030–2035 estimates', () => {
    expect(Q_DAY_OPTIONS).toEqual([2030, 2032, 2035]);
  });
});
