import { describe, it, expect } from 'vitest';
import { pins, edges, MAP_BOUNDS, CAMPUS_CENTER } from '../data/campusMap';
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
  routeFromPoint,
  YOU_ID,
} from '../utils/campusRoute';

const pinById = (id) => pins.find((p) => p.id === id);

// ── Fixtures derived from the data, not hard-coded ───────────────────────────
// The graph is generated from OpenStreetMap (scripts/build-campus-graph.mjs) and
// most buildings are still `building-NN` pending survey. Naming one of them in
// campusOverrides.js changes its id, so tests must not depend on a particular
// one — they pick their subjects out of the data instead. `main-gate` is the one
// stable id: it carries an explicit id in the overrides precisely because
// routing, validation and deep links all anchor on it.
const GATE = 'main-gate';

const destinations = pins.filter((p) => p.type === 'destination');

// The destination the longest walk from the gate. A cross-campus route is the
// one that exercises real turns, several road segments and a connector.
const FAR = destinations
  .filter((d) => d.id !== GATE)
  .map((d) => ({ d, route: buildRoute(GATE, d.id, pins, edges) }))
  .filter((x) => x.route)
  .sort((a, b) => b.route.distance - a.route.distance)[0];

// Somewhere well outside the campus graph — used to assert off-route detection
// without depending on there being empty ground at any particular offset. The
// old test offset the gate by 0.005° and assumed nothing was there; on the real
// graph that lands on University of Uyo Road, which is very much on the network.
const REMOTE = { lat: 5.09, lng: 8.04 };

describe('haversine', () => {
  it('returns ~0 for identical points', () => {
    expect(haversine({ lat: 5.0397, lng: 7.9785 }, { lat: 5.0397, lng: 7.9785 })).toBeLessThan(0.001);
  });

  it('is symmetric and in meters', () => {
    const a = { lat: 5.0397, lng: 7.9785 };
    const b = { lat: 5.0417, lng: 7.9805 };
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
    const origin = { lat: 5.0397, lng: 7.9785 };
    expect(bearingDeg(origin, { lat: 5.0497, lng: 7.9785 })).toBeCloseTo(0, 1);
    expect(bearingDeg(origin, { lat: 5.0397, lng: 7.9885 })).toBeCloseTo(90, 1);
    expect(bearingDeg(origin, { lat: 5.0297, lng: 7.9785 })).toBeCloseTo(180, 1);
    expect(bearingDeg(origin, { lat: 5.0397, lng: 7.9685 })).toBeCloseTo(270, 1);
  });

  it('returns ~45 degrees for a northeast step and maps it to a compass point', () => {
    const origin = { lat: 5.0397, lng: 7.9785 };
    // One degree of longitude is cos(lat) times shorter than one of latitude, so
    // an equal-distance NE step needs the longitude delta scaled by that factor.
    const dLat = 0.01;
    const dLng = dLat / Math.cos((5.0397 * Math.PI) / 180);
    const brg = bearingDeg(origin, { lat: 5.0397 + dLat, lng: 7.9785 + dLng });
    expect(brg).toBeGreaterThan(44);
    expect(brg).toBeLessThan(46);
    expect(compassDir(brg)).toBe('NE');
  });

  it('is antisymmetric: reversing the pair flips the bearing by 180', () => {
    const a = { lat: 5.0365, lng: 7.9744 };
    const b = { lat: 5.0432, lng: 7.9781 };
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

// ── The dataset itself ───────────────────────────────────────────────────────
// The prototype shipped an invented graph centred at 5.65 N, 7.93 E — roughly
// 68 km north of the University of Uyo, in open country. Every route it drew was
// fiction, and nothing in the suite noticed, because the maths was self-
// consistent over made-up coordinates. These assertions exist so that class of
// error cannot come back.
describe('the shipped campus dataset', () => {
  it('is centred on the real University of Uyo, not the old synthetic grid', () => {
    const [lat, lng] = CAMPUS_CENTER;
    expect(lat).toBeGreaterThan(5.03);
    expect(lat).toBeLessThan(5.05);
    expect(lng).toBeGreaterThan(7.97);
    expect(lng).toBeLessThan(7.99);
    // The specific wrong value, called out by name so a regression is obvious.
    expect(lat).not.toBeCloseTo(5.65, 2);
  });

  it('keeps every pin inside MAP_BOUNDS', () => {
    for (const p of pins) {
      expect(p.lat, `${p.id} latitude`).toBeGreaterThanOrEqual(MAP_BOUNDS.south);
      expect(p.lat, `${p.id} latitude`).toBeLessThanOrEqual(MAP_BOUNDS.north);
      expect(p.lng, `${p.id} longitude`).toBeGreaterThanOrEqual(MAP_BOUNDS.west);
      expect(p.lng, `${p.id} longitude`).toBeLessThanOrEqual(MAP_BOUNDS.east);
    }
  });

  it('has unique pin ids', () => {
    const ids = pins.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no self-edges and no duplicate edges', () => {
    const seen = new Set();
    for (const e of edges) {
      expect(e.a, 'self edge').not.toBe(e.b);
      const k = e.a < e.b ? `${e.a}|${e.b}` : `${e.b}|${e.a}`;
      expect(seen.has(k), `duplicate edge ${k}`).toBe(false);
      seen.add(k);
    }
  });

  it('references only known pins from edges', () => {
    const ids = new Set(pins.map((p) => p.id));
    for (const e of edges) {
      expect(ids.has(e.a), `edge references unknown pin ${e.a}`).toBe(true);
      expect(ids.has(e.b), `edge references unknown pin ${e.b}`).toBe(true);
    }
  });

  it('is a single connected component', () => {
    const adj = new Map(pins.map((p) => [p.id, []]));
    for (const e of edges) {
      adj.get(e.a).push(e.b);
      adj.get(e.b).push(e.a);
    }
    const seen = new Set([pins[0].id]);
    const stack = [pins[0].id];
    while (stack.length) {
      for (const v of adj.get(stack.pop())) {
        if (!seen.has(v)) {
          seen.add(v);
          stack.push(v);
        }
      }
    }
    expect(seen.size).toBe(pins.length);
  });

  // Inferred bridges span gaps in OSM's coverage; connectors are the modelled
  // walk from a road to a building door. Both are approximations, and the UI is
  // allowed to say so — but only while they stay labelled.
  it('labels approximated edges rather than passing them off as surveyed', () => {
    const inferred = edges.filter((e) => e.inferred);
    const connectors = edges.filter((e) => e.connector);
    expect(connectors.length).toBe(destinations.length);
    for (const e of inferred) expect(e.inferred).toBe(true);
  });
});

describe('dijkstra', () => {
  it('finds a path between connected destinations', () => {
    const r = dijkstra(GATE, FAR.d.id, pins, edges);
    expect(r).not.toBeNull();
    expect(r.path[0]).toBe(GATE);
    expect(r.path[r.path.length - 1]).toBe(FAR.d.id);
    expect(r.distance).toBeGreaterThan(0);
  });

  it('returns the same distance either direction', () => {
    const a = dijkstra(GATE, FAR.d.id, pins, edges);
    const b = dijkstra(FAR.d.id, GATE, pins, edges);
    expect(a.distance).toBeCloseTo(b.distance);
  });

  it('returns null for same pin', () => {
    expect(dijkstra(GATE, GATE, pins, edges)).toBeNull();
  });

  it('reaches every destination from the main gate', () => {
    for (const dest of destinations.filter((p) => p.id !== GATE)) {
      const r = dijkstra(GATE, dest.id, pins, edges);
      expect(r, `no route to ${dest.id}`).not.toBeNull();
    }
  });
});

describe('buildRouteSteps', () => {
  it('produces a start step, middle steps and an arrive step for a real route', () => {
    const { path } = dijkstra(GATE, FAR.d.id, pins, edges);
    const { steps } = buildRouteSteps(path, pinById);
    expect(steps.length).toBeGreaterThan(1);
    expect(steps[0].type).toBe('start');
    expect(steps[steps.length - 1].type).toBe('arrive');
    expect(steps[steps.length - 1].text).toContain(FAR.d.name);
    expect(steps[0].text).toContain(pinById(GATE).name);
    expect(steps.every((s) => typeof s.text === 'string' && s.text.length > 0)).toBe(true);
  });

  // The OSM-derived graph keeps a vertex at every slight bend in the tarmac, so
  // one unbroken walk up a road arrived as several identical "Continue straight"
  // instructions. Merging them is the whole point of the step list being
  // separate from the path.
  it('never emits two consecutive plain "continue straight" steps', () => {
    const { path } = dijkstra(GATE, FAR.d.id, pins, edges);
    const { steps } = buildRouteSteps(path, pinById);
    for (let i = 1; i < steps.length; i++) {
      const bothPlainStraight =
        steps[i].type === 'straight' &&
        steps[i - 1].type === 'straight' &&
        !steps[i].text.includes(' at ') &&
        !steps[i - 1].text.includes(' at ');
      expect(bothPlainStraight, `steps ${i - 1} and ${i} should have merged`).toBe(false);
    }
    expect(steps.length).toBeLessThan(path.length);
  });

  // Merging must move metres between steps, never lose them.
  it('conserves total distance across the merge', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    const summed = route.steps.reduce((t, s) => t + s.distance, 0);
    expect(summed).toBeCloseTo(route.distance, 6);
  });

  it('maps every path node to a step that exists', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    expect(route.stepForNode).toHaveLength(route.path.length);
    for (const idx of route.stepForNode) {
      expect(route.steps[idx]).toBeDefined();
    }
  });

  // A destination pin whose connector snapped onto an existing road node sits
  // exactly on top of it, so the first segment out of the main gate has zero
  // length. bearingDeg() on two identical points is atan2(0, 0) = 0, which reads
  // as "north" — a fabricated direction stated with full confidence.
  it('does not invent a heading when the route opens on a zero-length segment', () => {
    const gate = pinById(GATE);
    const stacked = [
      { id: 'a', name: 'Stacked start', type: 'destination', category: 'entrance', lat: gate.lat, lng: gate.lng },
      { id: 'b', type: 'waypoint', lat: gate.lat, lng: gate.lng },
      // Due EAST of the start, so a fabricated "north" is unambiguously wrong.
      { id: 'c', name: 'East end', type: 'destination', category: 'building', lat: gate.lat, lng: gate.lng + 0.004 },
    ];
    const byId = (id) => stacked.find((p) => p.id === id);
    const { steps } = buildRouteSteps(['a', 'b', 'c'], byId);
    expect(steps[0].text).toMatch(/east/);
    expect(steps[0].text).not.toMatch(/north|south/);
  });

  it('returns empty for a path of fewer than two pins', () => {
    expect(buildRouteSteps([GATE], pinById).steps).toEqual([]);
  });
});

// Nobody standing in the sun on a 2.2 km campus picks their own starting pin off
// a dropdown. The GPS fix is almost never on the graph, so it gets joined to it.
describe('routeFromPoint', () => {
  it('routes from an off-graph position by joining it to the nearest path', () => {
    const anchor = pinById(FAR.route.path[2]);
    // ~35 m off the route, i.e. nowhere near any node.
    const standing = { lat: anchor.lat + 0.0003, lng: anchor.lng + 0.0002 };

    const route = routeFromPoint(standing, FAR.d.id, pins, edges);
    expect(route).not.toBeNull();
    expect(route.fromLive).toBe(true);
    expect(route.path[0]).toBe(YOU_ID);
    expect(route.path[route.path.length - 1]).toBe(FAR.d.id);
    expect(route.snapDistance).toBeLessThan(250);
    expect(route.distance).toBeGreaterThan(0);
  });

  it('refuses rather than guessing when the walker is far from any mapped path', () => {
    // Well off campus. Snapping this to the nearest road would report a route
    // and a walking time that bear no relation to the walk actually required.
    expect(routeFromPoint({ lat: 5.09, lng: 8.04 }, FAR.d.id, pins, edges)).toBeNull();
  });

  it('does not mutate the pins and edges it was given', () => {
    const pinCount = pins.length;
    const edgeCount = edges.length;
    const anchor = pinById(FAR.route.path[2]);
    routeFromPoint({ lat: anchor.lat + 0.0003, lng: anchor.lng }, FAR.d.id, pins, edges);
    expect(pins).toHaveLength(pinCount);
    expect(edges).toHaveLength(edgeCount);
  });

  it('returns null without a fix or a destination', () => {
    expect(routeFromPoint(null, FAR.d.id, pins, edges)).toBeNull();
    expect(routeFromPoint({ lat: 5.04, lng: 7.978 }, '', pins, edges)).toBeNull();
    expect(routeFromPoint({ lat: 5.04, lng: 7.978 }, 'no-such-pin', pins, edges)).toBeNull();
  });
});

describe('buildRoute', () => {
  it('builds a complete route object with cumulative weights', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    expect(route).not.toBeNull();
    expect(route.from).toBe(pinById(GATE).name);
    expect(route.to).toBe(FAR.d.name);
    // Steps are deliberately no longer 1:1 with path nodes — consecutive plain
    // straights are merged — so stepForNode is what carries the correspondence.
    expect(route.steps.length).toBeLessThanOrEqual(route.path.length);
    expect(route.stepForNode).toHaveLength(route.path.length);
    expect(route.cumulative[0]).toBe(0);
    expect(route.cumulative[route.cumulative.length - 1]).toBeCloseTo(route.distance);
  });

  it('returns null for unreachable or identical pins', () => {
    expect(buildRoute(GATE, GATE, pins, edges)).toBeNull();
    const fake = [...pins, { id: 'orphan', type: 'destination', lat: 5.06, lng: 8.04 }];
    expect(buildRoute(GATE, 'orphan', fake, edges)).toBeNull();
  });
});

describe('routeProgress', () => {
  it('computes remaining distance that shrinks as you walk along the route', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    const atStart = routeProgress({ lat: pinById(GATE).lat, lng: pinById(GATE).lng }, route, pinById);
    const atEnd = routeProgress({ lat: FAR.d.lat, lng: FAR.d.lng }, route, pinById);

    expect(atStart.remaining).toBeGreaterThan(atEnd.remaining);
    expect(atEnd.arrived).toBe(true);
    expect(atStart.arrived).toBe(false);
    expect(atEnd.nextStep.type).toBe('arrive');
  });

  it('flags off-route positions far from any path node', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    expect(routeProgress(REMOTE, route, pinById).offRoute).toBe(true);
  });

  it('does not flag a walker standing on the route', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    const mid = pinById(route.path[Math.floor(route.path.length / 2)]);
    expect(routeProgress({ lat: mid.lat, lng: mid.lng }, route, pinById).offRoute).toBe(false);
  });

  it('returns null with no user position or no route', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    expect(routeProgress(null, route, pinById)).toBeNull();
    expect(routeProgress({ lat: 5.0397, lng: 7.9785 }, null, pinById)).toBeNull();
  });

  // Arrival used to be derived from cumulative graph distance alone, so anyone
  // whose nearest node was the destination scored remaining = 0 and was told
  // they had arrived — even standing well short of it, and inside the 70 m
  // off-route threshold so nothing contradicted the claim.
  it('does not claim arrival while the walker is still short of the destination', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    const last = pinById(route.path[route.path.length - 1]);
    const prev = pinById(route.path[route.path.length - 2]);

    // Reproducing the bug needs a position whose *nearest graph node is the
    // destination* — that was the trigger: remaining collapsed to 0 and arrival
    // was declared from graph distance alone. So step 45 m past the destination,
    // continuing the final bearing: beyond the end of the route, nothing is
    // nearer than the destination itself. 45 m is deliberately between the 25 m
    // arrival radius and the 70 m off-route threshold, so neither of those
    // states can mask the assertion.
    const brg = (bearingDeg(prev, last) * Math.PI) / 180;
    const beyond = {
      lat: last.lat + (45 * Math.cos(brg)) / 111320,
      lng: last.lng + (45 * Math.sin(brg)) / (111320 * Math.cos((last.lat * Math.PI) / 180)),
    };

    const progress = routeProgress(beyond, route, pinById);
    expect(progress.nearestIdx).toBe(route.path.length - 1);
    expect(progress.distanceToDestination).toBeGreaterThan(40);
    expect(progress.distanceToDestination).toBeLessThan(70);
    expect(progress.offRoute).toBe(false);
    expect(progress.arrived).toBe(false);
  });

  // steps[i] is what you do as you leave path[i], so standing at node i the
  // instruction still owed is steps[i]. Handing back steps[i + 1] walked the
  // student past the turn they were standing on.
  it('offers the instruction owed at the current node, not the one after it', () => {
    const route = buildRoute(GATE, FAR.d.id, pins, edges);
    const midIdx = Math.floor(route.path.length / 2);
    const atMidNode = pinById(route.path[midIdx]);

    const progress = routeProgress({ lat: atMidNode.lat, lng: atMidNode.lng }, route, pinById);
    expect(progress.nearestIdx).toBe(midIdx);
    expect(progress.nextStep).toBe(route.steps[route.stepForNode[midIdx]]);
  });
});

// The bearing bug was invisible at this level too: every step came back
// "straight", which still satisfied "every step has non-empty text".
describe('directions over the real campus graph', () => {
  it('produces varied headings and at least one genuine turn', () => {
    const route = FAR.route;
    expect(route).not.toBeNull();

    const kinds = new Set(route.steps.map((s) => s.type));
    expect(kinds.has('start')).toBe(true);
    expect(kinds.has('arrive')).toBe(true);
    // A route across the whole campus cannot legitimately be one straight line.
    const turns = route.steps.filter(
      (s) => s.type === 'left' || s.type === 'right' || s.type === 'sharp-left' || s.type === 'sharp-right',
    );
    expect(turns.length).toBeGreaterThan(0);
  });

  it('opens by heading towards the destination, not away from it', () => {
    const route = FAR.route;
    // The gate is at the southern tip of the campus and every building is north
    // of it, so the first instruction must not send the walker south.
    expect(route.steps[0].text).not.toMatch(/south/);
    expect(route.steps[0].text).toMatch(/^Head /);
  });

  it('walks a real distance across the campus, not a synthetic one', () => {
    // The permanent site is ~2.2 km end to end. A cross-campus route measured in
    // tens of metres would mean the graph had collapsed; one measured in tens of
    // kilometres would mean the coordinates were wrong again.
    expect(FAR.route.distance).toBeGreaterThan(300);
    expect(FAR.route.distance).toBeLessThan(6000);
  });
});
