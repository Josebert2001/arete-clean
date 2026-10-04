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
  it('accepts in-campus points and rejects far-off/NaN coordinates', () => {
    // The centre of the real permanent site.
    expect(isWithinBounds(5.0397, 7.9785, MAP_BOUNDS)).toBe(true);
    // Lagos — well outside.
    expect(isWithinBounds(6.5244, 3.3792, MAP_BOUNDS)).toBe(false);
    // The prototype's old synthetic centre, 68 km north of campus. It must now
    // read as off-campus; while it did not, a GPS fix from the real university
    // was the thing being rejected.
    expect(isWithinBounds(5.65, 7.93, MAP_BOUNDS)).toBe(false);
    expect(isWithinBounds(NaN, 7.9785, MAP_BOUNDS)).toBe(false);
    expect(isWithinBounds(5.0397, 7.9785, null)).toBe(false);
  });

  it('accepts a fix at the main gate, which sits outside the campus polygon', () => {
    // The gate is on the public road ~120 m south of the university boundary.
    // MAP_BOUNDS is widened to contain every pin for exactly this reason: a
    // student standing at the entrance must not be told they are off campus.
    const gate = pins.find((p) => p.id === 'main-gate');
    expect(isWithinBounds(gate.lat, gate.lng, MAP_BOUNDS)).toBe(true);
  });
});

describe('validatePin', () => {
  const opts = { bounds: MAP_BOUNDS, categories: CATEGORIES };
  const ON_CAMPUS = { lat: 5.0397, lng: 7.9785 };

  it('accepts a well-formed destination pin', () => {
    const r = validatePin(
      { id: 'new-hall', name: 'New Hall', type: 'destination', category: 'building', ...ON_CAMPUS },
      opts
    );
    expect(r.ok).toBe(true);
    expect(r.value.lat).toBe(ON_CAMPUS.lat);
  });

  it('rejects HTML in names, bad ids, unknown categories and off-campus coords', () => {
    expect(validatePin({ id: 'x', name: '<img src=x onerror=1>', type: 'destination', category: 'building', ...ON_CAMPUS }, opts).ok).toBe(false);
    expect(validatePin({ id: 'Bad ID!', name: 'A', type: 'destination', category: 'building', ...ON_CAMPUS }, opts).ok).toBe(false);
    expect(validatePin({ id: 'x', name: 'A', type: 'destination', category: 'nope', ...ON_CAMPUS }, opts).ok).toBe(false);
    expect(validatePin({ id: 'x', name: 'A', type: 'destination', category: 'building', lat: 6.52, lng: 3.37 }, opts).ok).toBe(false);
    expect(validatePin({ id: 'x', name: 'A', type: 'destination', category: 'building', lat: 'nope', lng: 7.9785 }, opts).ok).toBe(false);
  });

  it('catches duplicate ids', () => {
    const r = validatePin(
      { id: 'main-gate', name: 'Again', type: 'destination', category: 'entrance', ...ON_CAMPUS },
      { ...opts, existingIds: { 'main-gate': true } }
    );
    expect(r.ok).toBe(false);
    expect(r.errors.join(' ')).toContain('duplicate');
  });

  it('accepts every category the shipped pins actually use', () => {
    // A pin generated with a category missing from CATEGORIES renders with no
    // colour and no legend entry, which is invisible until someone looks.
    for (const p of pins.filter((x) => x.type === 'destination')) {
      expect(p.category in CATEGORIES, `unknown category on ${p.id}: ${p.category}`).toBe(true);
    }
  });
});

describe('validateEdge', () => {
  it('accepts edges between known pins and rejects dangling/self edges', () => {
    const ids = pins.map((p) => p.id);
    const real = edges[0];
    expect(validateEdge({ a: real.a, b: real.b }, ids).ok).toBe(true);
    expect(validateEdge({ a: 'main-gate', b: 'nowhere' }, ids).ok).toBe(false);
    expect(validateEdge({ a: 'main-gate', b: 'main-gate' }, ids).ok).toBe(false);
  });
});

describe('validateGraph', () => {
  it('passes on the shipped dataset and flags an orphaned destination', () => {
    const r = validateGraph(pins, edges);
    expect(r.errors).toEqual([]);
    expect(r.ok).toBe(true);

    const orphaned = [
      ...pins,
      { id: 'orphan', type: 'destination', category: 'building', lat: 5.0397, lng: 7.9785 },
    ];
    const bad = validateGraph(orphaned, edges);
    expect(bad.ok).toBe(false);
    expect(bad.errors.some((e) => e.includes('orphan'))).toBe(true);
  });
});