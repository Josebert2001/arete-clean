import { describe, it, expect } from 'vitest';
import { pins, edges } from '../data/campusMap';
import {
  haversine,
  bearingDeg,
  compassDir,
  normalizeDeg,
  turnKind,
  dijkstra,
  buildRouteSteps,
  buildRoute,
  routeProgress,
} from '../utils/campusRoute';

const pinById = (id) => pins.find((p) => p.id === id);

describe('haversine', () => {
  it('returns ~0 for identical points', () => {
    expect(haversine({ lat: 5.65, lng: 7.93 }, { lat: 5.65, lng: 7.93 })).toBeLessThan(0.001);
  });

  it('is symmetric and in meters', () => {
    const a = { lat: 5.65, lng: 7.93 };
    const b = { lat: 5.652, lng: 7.932 };
    const d = haversine(a, b);
    expect(d).toBeCloseTo(haversine(b, a));
    expect(d).toBeGreaterThan(100);
    expect(d).toBeLessThan(500);
  });
});

describe('bearings and directions', () => {
  it('compassDir maps cardinal bearings', () => {
    expect(compassDir(0)).toBe('N');
    expect(compassDir(90)).toBe('E');
    expect(compassDir(180)).toBe('S');
    expect(compassDir(270)).toBe('W');
    expect(compassDir(360)).toBe('N');
  });

  it('bearing between two north-aligned points is 0 or 360', () => {
    const a = { lat: 5.65, lng: 7.93 };
    const b = { lat: 5.66, lng: 7.93 };
    const brg = bearingDeg(a, b);
    expect(brg).toBeLessThan(1);
  });

  it('normalizeDeg wraps into [-180, 180]', () => {
    expect(normalizeDeg(350)).toBe(-10);
    expect(normalizeDeg(-190)).toBe(170);
    expect(normalizeDeg(45)).toBe(45);
  });
});

describe('turnKind', () => {
  it('classifies right/left/straight from bearings', () => {
    expect(turnKind(0, 90)).toBe('right');
    expect(turnKind(90, 0)).toBe('left');
    expect(turnKind(0, 5)).toBe('straight');
    expect(turnKind(0, 130)).toBe('sharp-right');
    expect(turnKind(0, 230)).toBe('sharp-left');
    expect(turnKind(0, 180)).toBe('u-turn');
  });
});

describe('dijkstra', () => {
  it('finds a path between connected destinations', () => {
    const r = dijkstra('main-gate', 'library', pins, edges);
    expect(r).not.toBeNull();
    expect(r.path[0]).toBe('main-gate');
    expect(r.path[r.path.length - 1]).toBe('library');
    expect(r.distance).toBeGreaterThan(0);
  });

  it('returns the same distance either direction', () => {
    const a = dijkstra('main-gate', 'library', pins, edges);
    const b = dijkstra('library', 'main-gate', pins, edges);
    expect(a.distance).toBeCloseTo(b.distance);
  });

  it('returns null for same pin', () => {
    expect(dijkstra('library', 'library', pins, edges)).toBeNull();
  });

  it('reaches every destination from the main gate', () => {
    const allDestinations = pins.filter((p) => p.type === 'destination' && p.id !== 'main-gate');
    for (const dest of allDestinations) {
      const r = dijkstra('main-gate', dest.id, pins, edges);
      expect(r, `no route to ${dest.id}`).not.toBeNull();
    }
  });
});

describe('buildRouteSteps', () => {
  it('produces a start step, middle steps and an arrive step for a real route', () => {
    const { path } = dijkstra('main-gate', 'library', pins, edges);
    const steps = buildRouteSteps(path, pinById);
    expect(steps.length).toBe(path.length);
    expect(steps[0].type).toBe('start');
    expect(steps[steps.length - 1].type).toBe('arrive');
    expect(steps[steps.length - 1].text).toContain('University Library');
    expect(steps[0].text).toContain('Main Gate');
    expect(steps.every((s) => typeof s.text === 'string' && s.text.length > 0)).toBe(true);
  });

  it('distance field matches the next segment length', () => {
    const { path } = dijkstra('main-gate', 'library', pins, edges);
    const steps = buildRouteSteps(path, pinById);
    for (let i = 0; i < steps.length - 1; i++) {
      const a = pinById(path[i]);
      const b = pinById(path[i + 1]);
      expect(steps[i].distance).toBeCloseTo(haversine(a, b));
    }
  });

  it('returns [] for a path of fewer than two pins', () => {
    expect(buildRouteSteps(['main-gate'], pinById, 0)).toEqual([]);
  });
});

describe('buildRoute', () => {
  it('builds a complete route object with cumulative weights', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    expect(route).not.toBeNull();
    expect(route.from).toBe('Main Gate');
    expect(route.to).toBe('University Library');
    expect(route.steps.length).toBe(route.path.length);
    expect(route.cumulative[0]).toBe(0);
    expect(route.cumulative[route.cumulative.length - 1]).toBeCloseTo(route.distance);
  });

  it('returns null for unreachable or identical pins', () => {
    expect(buildRoute('main-gate', 'main-gate', pins, edges)).toBeNull();
    const fake = [...pins];
    fake.push({ id: 'orphan', type: 'destination', lat: 5.7, lng: 8.0 });
    expect(buildRoute('main-gate', 'orphan', fake, edges)).toBeNull();
  });
});

describe('routeProgress', () => {
  it('computes remaining distance that shrinks as you walk along the route', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    const nearStart = { lat: pinById('main-gate').lat, lng: pinById('main-gate').lng };
    const nearEnd = { lat: pinById('library').lat, lng: pinById('library').lng };

    const atStart = routeProgress(nearStart, route, pinById);
    const atEnd = routeProgress(nearEnd, route, pinById);

    expect(atStart.remaining).toBeGreaterThan(atEnd.remaining);
    expect(atEnd.arrived).toBe(true);
    expect(atStart.arrived).toBe(false);
    expect(atEnd.nextStep.type).toBe('arrive');
  });

  it('flags off-route positions far from any path node', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    const far = { lat: pinById('main-gate').lat + 0.005, lng: pinById('main-gate').lng };
    const progress = routeProgress(far, route, pinById);
    expect(progress.offRoute).toBe(true);
  });

  it('returns null with no user position or no route', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    expect(routeProgress(null, route, pinById)).toBeNull();
    expect(routeProgress({ lat: 5.65, lng: 7.93 }, null, pinById)).toBeNull();
  });
});