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

  // A bearing function that always returns 0 passes a north-only assertion, and
  // that is exactly how a broken formula (degrees subtracted from radians)
  // shipped: every route read "head north / continue straight". All four
  // cardinals are checked here, plus a diagonal, so a constant cannot pass.
  it('returns the true bearing for each cardinal direction', () => {
    const origin = { lat: 5.65, lng: 7.93 };
    expect(bearingDeg(origin, { lat: 5.66, lng: 7.93 })).toBeCloseTo(0, 1);
    expect(bearingDeg(origin, { lat: 5.65, lng: 7.94 })).toBeCloseTo(90, 1);
    expect(bearingDeg(origin, { lat: 5.64, lng: 7.93 })).toBeCloseTo(180, 1);
    expect(bearingDeg(origin, { lat: 5.65, lng: 7.92 })).toBeCloseTo(270, 1);
  });

  it('returns ~45 degrees for a northeast step and maps it to a compass point', () => {
    const origin = { lat: 5.65, lng: 7.93 };
    // At 5.65 deg latitude one degree of longitude is cos(lat) times shorter
    // than one of latitude, so an equal-distance NE step needs the longitude
    // delta scaled by that factor.
    const dLat = 0.01;
    const dLng = dLat / Math.cos((5.65 * Math.PI) / 180);
    const brg = bearingDeg(origin, { lat: 5.65 + dLat, lng: 7.93 + dLng });
    expect(brg).toBeGreaterThan(44);
    expect(brg).toBeLessThan(46);
    expect(compassDir(brg)).toBe('NE');
  });

  it('is antisymmetric: reversing the pair flips the bearing by 180', () => {
    const a = { lat: 5.6465, lng: 7.929 };
    const b = { lat: 5.652, lng: 7.931 };
    const diff = Math.abs(normalizeDeg(bearingDeg(a, b) - bearingDeg(b, a)));
    expect(diff).toBeCloseTo(180, 1);
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

  // Arrival used to be derived from cumulative graph distance alone, so anyone
  // whose nearest node was the destination scored remaining = 0 and was told
  // they had arrived — even standing well short of it, and inside the 70 m
  // off-route threshold so nothing contradicted the claim.
  it('does not claim arrival while the walker is still short of the destination', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    const library = pinById('library');
    // ~55 m north of the library: nearest path node is still the library.
    const shortOfIt = { lat: library.lat + 0.0005, lng: library.lng };

    const progress = routeProgress(shortOfIt, route, pinById);
    expect(progress.nearestIdx).toBe(route.path.length - 1);
    expect(progress.distanceToDestination).toBeGreaterThan(40);
    expect(progress.offRoute).toBe(false);
    expect(progress.arrived).toBe(false);
  });

  // steps[i] is what you do as you leave path[i], so standing at node i the
  // instruction still owed is steps[i]. Handing back steps[i + 1] walked the
  // student past the turn they were standing on.
  it('offers the instruction owed at the current node, not the one after it', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    const midIdx = Math.floor(route.path.length / 2);
    const atMidNode = pinById(route.path[midIdx]);

    const progress = routeProgress({ lat: atMidNode.lat, lng: atMidNode.lng }, route, pinById);
    expect(progress.nearestIdx).toBe(midIdx);
    expect(progress.nextStep).toBe(route.steps[midIdx]);
  });
});

// The bearing bug was invisible at this level too: every step came back
// "straight", which still satisfied "every step has non-empty text".
describe('directions over the real campus graph', () => {
  it('produces varied headings and at least one genuine turn', () => {
    const route = buildRoute('main-gate', 'sports-complex', pins, edges);
    expect(route).not.toBeNull();

    const kinds = new Set(route.steps.map((s) => s.type));
    expect(kinds.has('start')).toBe(true);
    expect(kinds.has('arrive')).toBe(true);
    // A route across the whole campus cannot legitimately be one straight line.
    const turns = route.steps.filter((s) => s.type === 'left' || s.type === 'right'
      || s.type === 'sharp-left' || s.type === 'sharp-right');
    expect(turns.length).toBeGreaterThan(0);
  });

  it('names a real compass heading in the start step', () => {
    const route = buildRoute('main-gate', 'library', pins, edges);
    // The library is north-east of the main gate, so the opening instruction
    // must not say "south" or "west".
    expect(route.steps[0].text).toMatch(/^Head (north|northeast|east|north-northeast|east-northeast)/);
  });
});