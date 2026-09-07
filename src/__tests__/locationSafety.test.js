import { describe, it, expect } from 'vitest';
import { pins, edges, MAP_BOUNDS, CATEGORIES } from '../data/campusMap';
import {
  escapeHtml,
  toNumber,
  safeGeoPoint,
  isWithinBounds,
  validatePin,
  validateEdge,
  validateGraph,
} from '../utils/locationSafety';

describe('escapeHtml', () => {
  it('neutralises markup and event-handler attributes', () => {
    const payload = `<img src=x onerror=alert(1)> & "quotes" 'tick'`;
    const out = escapeHtml(payload);
    expect(out).not.toContain('<img');
    expect(out).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(out).toContain('&amp;');
    expect(out).not.toContain(payload);
  });

  it('returns an empty string for null/undefined and keeps plain text intact', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml('University Library')).toBe('University Library');
  });
});

describe('toNumber / safeGeoPoint', () => {
  it('coerces numeric strings and drops NaN/Infinity/objects', () => {
    expect(toNumber('5.65')).toBe(5.65);
    expect(toNumber(7.93)).toBe(7.93);
    expect(toNumber('abc')).toBeNull();
    expect(toNumber(NaN)).toBeNull();
    expect(toNumber(Infinity)).toBeNull();
    expect(toNumber(null)).toBeNull();
  });

  it('returns a finite point for geolocation results, null otherwise', () => {
    expect(safeGeoPoint({ latitude: 5.65, longitude: 7.93, accuracy: 10 })).toEqual({
      lat: 5.65,
      lng: 7.93,
      accuracy: 10,
    });
    expect(safeGeoPoint({ latitude: 'nope', longitude: 7.93 })).toBeNull();
    expect(safeGeoPoint({ latitude: 5.65 })).toBeNull();
    expect(safeGeoPoint({})).toBeNull();
  });
});

describe('isWithinBounds', () => {
  it('accepts in-campus points and rejects far-off/NN coordinates', () => {
    expect(isWithinBounds(5.6500, 7.9300, MAP_BOUNDS)).toBe(true);
    expect(isWithinBounds(6.5244, 3.3792, MAP_BOUNDS)).toBe(false);
    expect(isWithinBounds(NaN, 7.93, MAP_BOUNDS)).toBe(false);
    expect(isWithinBounds(5.65, 7.93, null)).toBe(false);
  });
});

describe('validatePin', () => {
  const opts = { bounds: MAP_BOUNDS, categories: CATEGORIES };

  it('accepts a well-formed destination pin', () => {
    const r = validatePin(
      { id: 'new-hall', name: 'New Hall', type: 'destination', category: 'building', lat: 5.649, lng: 7.9305 },
      opts
    );
    expect(r.ok).toBe(true);
    expect(r.value.lat).toBe(5.649);
  });

  it('rejects HTML in names, bad ids, unknown categories and off-campus coords', () => {
    expect(validatePin({ id: 'x', name: '<img src=x onerror=1>', type: 'destination', category: 'building', lat: 5.649, lng: 7.93 }, opts).ok).toBe(false);
    expect(validatePin({ id: 'Bad ID!', name: 'A', type: 'destination', category: 'building', lat: 5.649, lng: 7.93 }, opts).ok).toBe(false);
    expect(validatePin({ id: 'x', name: 'A', type: 'destination', category: 'nope', lat: 5.649, lng: 7.93 }, opts).ok).toBe(false);
    expect(validatePin({ id: 'x', name: 'A', type: 'destination', category: 'building', lat: 6.52, lng: 3.37 }, opts).ok).toBe(false);
    expect(validatePin({ id: 'x', name: 'A', type: 'destination', category: 'building', lat: 'nope', lng: 7.93 }, opts).ok).toBe(false);
  });

  it('catches duplicate ids', () => {
    const r = validatePin({ id: 'main-gate', name: 'Again', type: 'destination', category: 'entrance', lat: 5.65, lng: 7.93 }, { ...opts, existingIds: { 'main-gate': true } });
    expect(r.ok).toBe(false);
    expect(r.errors.join(' ')).toContain('duplicate');
  });
});

describe('validateEdge', () => {
  it('accepts edges between known pins and rejects dangling/self edges', () => {
    const ids = pins.map((p) => p.id);
    expect(validateEdge({ a: 'main-gate', b: 'w1' }, ids).ok).toBe(true);
    expect(validateEdge({ a: 'main-gate', b: 'nowhere' }, ids).ok).toBe(false);
    expect(validateEdge({ a: 'library', b: 'library' }, ids).ok).toBe(false);
  });
});

describe('validateGraph', () => {
  it('passes on the shipped dataset and flags an orphaned destination', () => {
    expect(validateGraph(pins, edges).ok).toBe(true);
    const orphaned = [...pins.filter((p) => p.id !== 'main-gate'), { id: 'orphan', type: 'destination', category: 'building', lat: 5.649, lng: 7.9305 }];
    const r = validateGraph(orphaned, edges);
    expect(r.ok).toBe(false);
    expect(r.errors.some((e) => e.includes('orphan'))).toBe(true);
  });
});