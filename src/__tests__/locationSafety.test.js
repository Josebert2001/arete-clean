import { describe, it, expect } from 'vitest';
import { toNumber, isWithinBounds } from '../utils/locationSafety';
import { UYO_BOUNDS } from '../data/campusPlaces';

describe('toNumber', () => {
  it('coerces numeric strings and drops NaN/Infinity/objects', () => {
    expect(toNumber('5.04')).toBe(5.04);
    expect(toNumber(7.97)).toBe(7.97);
    expect(toNumber('abc')).toBeNull();
    expect(toNumber(NaN)).toBeNull();
    expect(toNumber(Infinity)).toBeNull();
    expect(toNumber(null)).toBeNull();
    expect(toNumber('')).toBeNull();
    expect(toNumber(true)).toBeNull();
  });
});

describe('isWithinBounds', () => {
  it('accepts points in Uyo and rejects far-off/non-finite coordinates', () => {
    expect(isWithinBounds(5.04, 7.97, UYO_BOUNDS)).toBe(true);
    expect(isWithinBounds(6.5244, 3.3792, UYO_BOUNDS)).toBe(false); // Lagos
    expect(isWithinBounds(NaN, 7.93, UYO_BOUNDS)).toBe(false);
    expect(isWithinBounds(5.04, 7.97, null)).toBe(false);
  });
});
