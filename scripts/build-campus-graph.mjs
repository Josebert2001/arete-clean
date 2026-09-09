// Builds the campus routing graph from real OpenStreetMap geometry.
//
// Why this exists: the prototype's pins and edges were invented — a synthetic
// grid at 5.65°N, 7.93°E, roughly 68 km north of the University of Uyo. Every
// route it drew was fiction. This script replaces that with the real thing,
// derived from the OSM extract in scripts/data/uniuyo-osm.json (ODbL).
//
// It is a GENERATOR, not a one-off migration. Re-run it whenever the OSM
// extract is refreshed (`--fetch`) or the overrides change. Output goes to
// src/data/campusGraph.generated.js — never edit that file by hand.
//
// Human knowledge (building names, categories, search aliases) lives in
// src/data/campusOverrides.js and is merged in here, keyed by OSM id, so
// regenerating never clobbers it.
//
//   node scripts/build-campus-graph.mjs           # rebuild from the cached extract
//   node scripts/build-campus-graph.mjs --fetch   # refresh the extract from Overpass first
//   node scripts/build-campus-graph.mjs --stats   # print graph stats, write nothing

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { overrides, extraPins } from '../src/data/campusOverrides.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OSM_PATH = join(HERE, 'data', 'uniuyo-osm.json');
const OUT_PATH = join(HERE, '..', 'src', 'data', 'campusGraph.generated.js');

// The OSM way carrying the permanent-site campus boundary. Everything below is
// clipped to it, so this id is the single anchor for "what counts as campus".
const CAMPUS_WAY_ID = 669841132;

// ── Tuning ───────────────────────────────────────────────────────────────────
// Roads that leave the campus polygon are kept for this far beyond it, so the
// Nwaniba Road gate approach survives the clip. Without it the main gate — which
// sits ~120 m *outside* the polygon, on the public road — becomes unreachable
// and every route from the entrance fails.
const BUFFER_M = 220;

// The OSM polygon is drawn generously: it reaches south to 5.0278, but the
// southernmost university building is at 5.0356 and satellite imagery shows the
// land between them is dense residential settlement, not campus. Its 41
// `highway=residential` ways are a neighbourhood's internal streets — they are
// real, they are simply not somewhere a student navigates, and including them
// buried the campus in noise and produced seven "bridges" across other people's
// back yards.
//
// So the graph covers the campus core, plus the named arterials below it, which
// is how everyone actually arrives.
const CORE_SOUTH_LAT = 5.034;
const ARTERIALS = new Set(['University of Uyo Road', 'Nwaniba Road']);

// A degree-2 node is dropped when the path barely bends there and the segment it
// would merge into stays short. 10° keeps visible curves (the ring road is a
// smooth oval and must stay smooth); 140 m stops two junctions from being welded
// into one long straight that no longer follows the tarmac.
const SIMPLIFY_ANGLE_DEG = 10;
const SIMPLIFY_MAX_MERGE_M = 140;

// A building connector shorter than this attaches to the existing node rather
// than splitting the edge — below ~12 m the split produces a degenerate stub.
const SNAP_TO_NODE_M = 12;

// Past this, a "connector" is not a footpath, it is a guess across open ground.
// Buildings beyond it are still emitted (they exist) but flagged, because the
// walking time they imply is not trustworthy.
const MAX_CONNECTOR_M = 260;

// OSM's road coverage here is not one connected network — it is 8 separate
// pieces, with 52–101 m of unmapped ground between them. Those gaps are not
// digitisation slop (that would be sub-metre); they are the real dirt tracks
// students walk, which nobody has ever mapped. Bridging them is what makes the
// graph routable at all, so it is done here rather than left to a survey — but
// every bridge is marked `inferred: true`, listed on stdout for verification
// against imagery, and meant to be replaced by surveyed geometry.
//
// The cap matters: bridge further than this and the graph stops describing paths
// and starts inventing them across terrain nobody has looked at.
//
// 140 m is not arbitrary. The western building cluster — the Y-Building group and
// about a dozen neighbours — is separated from the rest of OSM's road data by a
// 127 m gap at roughly 5.0365 N, 7.9738 E, and at a 120 m cap it stayed
// unroutable. That exact span was checked against Esri imagery before this
// number was raised: open campus scrubland crossed by several well-worn tracks,
// not a fence, a ravine or someone's back yard. Every bridge this produces is
// printed on rebuild for the same treatment — look at the ground before trusting
// the number.
const MAX_BRIDGE_M = 140;

const args = new Set(process.argv.slice(2));
const STATS_ONLY = args.has('--stats');

// ── Geometry ─────────────────────────────────────────────────────────────────

const R = 6371000;
const toRad = (d) => (d * Math.PI) / 180;

function haversine(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function bearingDeg(a, b) {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

// Local equirectangular projection to metres about an origin. Good to well under
// a metre over a 2 km campus, and it lets the projection/intersection maths below
// be plain planar geometry instead of spherical trigonometry.
function projector(origin) {
  const k = Math.cos(toRad(origin.lat));
  return {
    to: (p) => ({ x: (p.lng - origin.lng) * k * 111320, y: (p.lat - origin.lat) * 111320 }),
    from: (q) => ({ lat: origin.lat + q.y / 111320, lng: origin.lng + q.x / (k * 111320) }),
  };
}

function pointInRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// Shortest distance from p to segment a→b, in the projected plane.
function distToSegment(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return { dist: Math.hypot(p.x - a.x, p.y - a.y), t: 0 };
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = a.x + t * dx;
  const cy = a.y + t * dy;
  return { dist: Math.hypot(p.x - cx, p.y - cy), t, x: cx, y: cy };
}

// Area-weighted centroid of a closed ring. Deliberately not the mean of the
// vertices: OSM footprints have far more vertices along detailed façades than
// along plain back walls, so a vertex mean pulls the pin off the building and
// out towards its most-digitised side.
function ringCentroid(points) {
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    const f = xj * yi - xi * yj;
    area += f;
    cx += (xj + xi) * f;
    cy += (yj + yi) * f;
  }
  if (Math.abs(area) < 1e-12) {
    const n = points.length;
    return [points.reduce((s, p) => s + p[0], 0) / n, points.reduce((s, p) => s + p[1], 0) / n];
  }
  area *= 0.5;
  return [cx / (6 * area), cy / (6 * area)];
}

// ── Load ─────────────────────────────────────────────────────────────────────

const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'));
const elements = osm.elements ?? [];

const campusWay = elements.find((e) => e.id === CAMPUS_WAY_ID);
if (!campusWay?.geometry) {
  console.error(`✗ campus boundary way ${CAMPUS_WAY_ID} not found in ${OSM_PATH}`);
  process.exit(1);
}
const ring = campusWay.geometry.map((p) => [p.lon, p.lat]);
const ringSegments = ring.map((p, i) => [p, ring[(i + 1) % ring.length]]);

const lats = ring.map((p) => p[1]);
const lngs = ring.map((p) => p[0]);
// Seeded from the campus polygon, then widened at the end to contain every pin
// actually emitted. The main gate sits ~120 m *outside* the polygon, on the
// public road; bounding to the polygon alone would put MAP_BOUNDS' southern edge
// north of it, so `maxBounds` would refuse to pan there and isWithinBounds()
// would report a student standing at the entrance as off campus.
const BOUNDS = {
  south: Math.min(...lats),
  north: Math.max(...lats),
  west: Math.min(...lngs),
  east: Math.max(...lngs),
};
const CENTER = (() => {
  const [lng, lat] = ringCentroid(ring);
  return { lat, lng };
})();

const proj = projector(CENTER);
const ringSegsProj = ringSegments.map(([a, b]) => [
  proj.to({ lat: a[1], lng: a[0] }),
  proj.to({ lat: b[1], lng: b[0] }),
]);

// Inside the polygon, or within BUFFER_M of its edge.
function nearCampus(lat, lng) {
  if (pointInRing(lng, lat, ring)) return true;
  const p = proj.to({ lat, lng });
  for (const [a, b] of ringSegsProj) {
    if (distToSegment(p, a, b).dist <= BUFFER_M) return true;
  }
  return false;
}

// ── Nodes and edges from the road network ────────────────────────────────────

const key = (lat, lng) => `${lat.toFixed(7)},${lng.toFixed(7)}`;

const nodes = new Map(); // key -> { id, lat, lng, ways:Set, tags }
const edgeSet = new Map(); // "a|b" -> { a, b, tags }

let nodeSeq = 0;
function nodeAt(lat, lng, wayId) {
  const k = key(lat, lng);
  let n = nodes.get(k);
  if (!n) {
    n = { id: `n${nodeSeq++}`, lat, lng, ways: new Set() };
    nodes.set(k, n);
  }
  if (wayId != null) n.ways.add(wayId);
  return n;
}

function addEdge(a, b, tags) {
  if (a.id === b.id) return;
  const k = a.id < b.id ? `${a.id}|${b.id}` : `${b.id}|${a.id}`;
  if (!edgeSet.has(k)) edgeSet.set(k, { a: a.id, b: b.id, ...tags });
}

// Surface and lighting are carried through from OSM where tagged. Most of this
// campus is untagged, which is itself the honest answer — `undefined` means "not
// surveyed", and the UI must not present that as "paved and lit".
function wayTags(w) {
  const t = w.tags ?? {};
  const out = {};
  const paved = new Set(['asphalt', 'paved', 'concrete', 'paving_stones']);
  const unpaved = new Set(['ground', 'dirt', 'earth', 'unpaved', 'grass', 'sand', 'gravel']);
  if (t.surface) out.surface = paved.has(t.surface) ? 'paved' : unpaved.has(t.surface) ? 'unpaved' : t.surface;
  else if (t.highway === 'track' || t.highway === 'path') out.surface = 'unpaved';
  else if (['residential', 'unclassified', 'secondary', 'service', 'tertiary'].includes(t.highway)) out.surface = 'paved';
  if (t.lit === 'yes') out.lit = true;
  else if (t.lit === 'no') out.lit = false;
  return out;
}

const highways = elements.filter((e) => e.tags?.highway && Array.isArray(e.geometry));

// A vertex is in the graph if it is on campus proper, or on one of the arterials
// that carry students in from the public road.
function keepVertex(lat, lng, isArterial) {
  if (!nearCampus(lat, lng)) return false;
  if (isArterial) return true;
  return lat >= CORE_SOUTH_LAT;
}

for (const w of highways) {
  const tags = wayTags(w);
  const isArterial = ARTERIALS.has(w.tags?.name);
  // Split the way into contiguous runs of in-region vertices. A road that leaves
  // the buffer and comes back must not be bridged by a straight line across the
  // gap — that would invent a shortcut through whatever it skipped.
  let run = [];
  const flush = () => {
    for (let i = 0; i < run.length - 1; i++) addEdge(run[i], run[i + 1], tags);
    run = [];
  };
  for (const p of w.geometry) {
    if (keepVertex(p.lat, p.lon, isArterial)) run.push(nodeAt(p.lat, p.lon, w.id));
    else flush();
  }
  flush();
}

// ── Simplify ─────────────────────────────────────────────────────────────────
// Collapse degree-2 nodes that carry no information: the path barely bends and
// the merge stays short. Junctions (degree ≠ 2) are never touched, so the
// topology — which is what Dijkstra actually needs — is preserved exactly.

function adjacency() {
  const adj = new Map();
  for (const n of nodes.values()) adj.set(n.id, []);
  for (const e of edgeSet.values()) {
    adj.get(e.a)?.push(e.b);
    adj.get(e.b)?.push(e.a);
  }
  return adj;
}

const byId = new Map([...nodes.values()].map((n) => [n.id, n]));

function simplify() {
  let removed = 0;
  let changed = true;
  while (changed) {
    changed = false;
    const adj = adjacency();
    for (const [id, nbrs] of adj) {
      if (nbrs.length !== 2) continue;
      const self = byId.get(id);
      const a = byId.get(nbrs[0]);
      const b = byId.get(nbrs[1]);
      if (!self || !a || !b || a.id === b.id) continue;
      if (self.pinned) continue;

      const turn = Math.abs(((bearingDeg(a, self) - bearingDeg(self, b) + 540) % 360) - 180);
      if (turn > SIMPLIFY_ANGLE_DEG) continue;
      if (haversine(a, self) + haversine(self, b) > SIMPLIFY_MAX_MERGE_M) continue;

      const ka = a.id < id ? `${a.id}|${id}` : `${id}|${a.id}`;
      const kb = b.id < id ? `${b.id}|${id}` : `${id}|${b.id}`;
      const tags = edgeSet.get(ka) ?? edgeSet.get(kb) ?? {};
      edgeSet.delete(ka);
      edgeSet.delete(kb);
      nodes.delete(key(self.lat, self.lng));
      byId.delete(id);
      addEdge(a, b, { surface: tags.surface, lit: tags.lit });
      removed++;
      changed = true;
      break; // adjacency is stale after a mutation — recompute
    }
  }
  return removed;
}

const beforeSimplify = nodes.size;
const simplified = simplify();

// ── Bridge the gaps in OSM's coverage ────────────────────────────────────────
// Repeatedly join the two closest disconnected components until the network is
// one piece or the next gap exceeds MAX_BRIDGE_M. Closest-pair each round rather
// than a single pass, because joining two components changes which gap is
// smallest next — a greedy single pass strands pieces that a later merge would
// have brought within reach.

function components() {
  const adj = adjacency();
  const seen = new Set();
  const out = [];
  for (const n of byId.keys()) {
    if (seen.has(n)) continue;
    const stack = [n];
    seen.add(n);
    const comp = [];
    while (stack.length) {
      const u = stack.pop();
      comp.push(u);
      for (const v of adj.get(u) ?? []) {
        if (!seen.has(v)) {
          seen.add(v);
          stack.push(v);
        }
      }
    }
    out.push(comp);
  }
  return out;
}

const bridges = [];
for (;;) {
  const comps = components();
  if (comps.length < 2) break;
  let best = null;
  for (let i = 0; i < comps.length; i++) {
    for (let j = i + 1; j < comps.length; j++) {
      for (const a of comps[i]) {
        for (const b of comps[j]) {
          const d = haversine(byId.get(a), byId.get(b));
          if (!best || d < best.d) best = { d, a, b };
        }
      }
    }
  }
  if (STATS_ONLY) {
    console.log(
      `  [bridge] ${comps.length} components (${comps.map((c) => c.length).join(',')}) ` +
        `closest gap ${best ? best.d.toFixed(1) + ' m' : 'none'}`,
    );
  }
  if (!best || best.d > MAX_BRIDGE_M) break;
  addEdge(byId.get(best.a), byId.get(best.b), { inferred: true });
  bridges.push({ a: best.a, b: best.b, m: Math.round(best.d) });
}

// ── Destinations ─────────────────────────────────────────────────────────────
// Each building footprint becomes one searchable destination, attached to the
// road graph by a connector. The connector is a straight line to the nearest
// point on the network — an approximation of the real footpath, honest about
// being one, and replaced as paths get surveyed.

const destinations = [];

function connect(dest) {
  const p = proj.to(dest);
  let best = null;
  for (const e of edgeSet.values()) {
    const a = byId.get(e.a);
    const b = byId.get(e.b);
    if (!a || !b) continue;
    const r = distToSegment(p, proj.to(a), proj.to(b));
    if (!best || r.dist < best.dist) best = { ...r, e, a, b };
  }
  if (!best) return null;

  const da = Math.hypot(best.x - proj.to(best.a).x, best.y - proj.to(best.a).y);
  const db = Math.hypot(best.x - proj.to(best.b).x, best.y - proj.to(best.b).y);

  let anchor;
  if (da <= SNAP_TO_NODE_M) anchor = best.a;
  else if (db <= SNAP_TO_NODE_M) anchor = best.b;
  else {
    // Split the edge at the projection so the connector meets the road at a
    // right angle instead of detouring to whichever end happened to be closer.
    const at = proj.from({ x: best.x, y: best.y });
    anchor = nodeAt(at.lat, at.lng);
    anchor.pinned = true;
    byId.set(anchor.id, anchor);
    const kOld = best.e.a < best.e.b ? `${best.e.a}|${best.e.b}` : `${best.e.b}|${best.e.a}`;
    // Carry `inferred` across the split too — half of a bridge is still a bridge,
    // and dropping the flag here would quietly launder a guess into a fact.
    const tags = { surface: best.e.surface, lit: best.e.lit, inferred: best.e.inferred };
    edgeSet.delete(kOld);
    addEdge(best.a, anchor, tags);
    addEdge(anchor, best.b, tags);
  }
  return { anchor, dist: best.dist };
}

const buildings = elements.filter(
  (e) => e.tags?.building && Array.isArray(e.geometry) && e.geometry.length >= 3,
);

let unnamedSeq = 0;
for (const b of buildings) {
  const pts = b.geometry.map((p) => [p.lon, p.lat]);
  const [lng, lat] = ringCentroid(pts);
  if (!pointInRing(lng, lat, ring)) continue;

  const ov = overrides[b.id] ?? {};
  const osmName = b.tags.name;
  const named = ov.name ?? osmName;

  destinations.push({
    id: ov.id ?? (named ? slug(named) : `building-${String(++unnamedSeq).padStart(2, '0')}`),
    name: named ?? `Unnamed building ${unnamedSeq}`,
    category: ov.category ?? 'building',
    aliases: ov.aliases ?? [],
    source: ov.name ? 'survey' : osmName ? 'osm' : null,
    osmId: b.id,
    lat,
    lng,
  });
}

// Pins that are not OSM buildings — gates, junction landmarks, keke stops.
for (const p of extraPins) {
  destinations.push({ ...p, aliases: p.aliases ?? [], source: p.source ?? 'survey' });
}

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

// Deduplicate ids — two "Unnamed building" pins with the same slug would make
// one of them unreachable through the picker.
const seen = new Map();
for (const d of destinations) {
  const n = (seen.get(d.id) ?? 0) + 1;
  seen.set(d.id, n);
  if (n > 1) d.id = `${d.id}-${n}`;
}

const farConnectors = [];
for (const d of destinations) {
  const r = connect(d);
  if (!r) {
    farConnectors.push({ id: d.id, dist: Infinity });
    continue;
  }
  d.anchor = r.anchor.id;
  d.connectorM = Math.round(r.dist);
  if (r.dist > MAX_CONNECTOR_M) farConnectors.push({ id: d.id, dist: Math.round(r.dist) });
}

// ── Emit ─────────────────────────────────────────────────────────────────────

const waypoints = [...nodes.values()].map((n) => ({
  id: n.id,
  type: 'waypoint',
  lat: round(n.lat),
  lng: round(n.lng),
}));

const destPins = destinations
  .filter((d) => d.anchor)
  .map((d) => ({
    id: d.id,
    name: d.name,
    type: 'destination',
    category: d.category,
    ...(d.aliases.length ? { aliases: d.aliases } : {}),
    ...(d.source ? { source: d.source } : {}),
    ...(d.osmId ? { osmId: d.osmId } : {}),
    lat: round(d.lat),
    lng: round(d.lng),
  }));

const graphEdges = [...edgeSet.values()].map((e) => ({
  a: e.a,
  b: e.b,
  ...(e.surface ? { surface: e.surface } : {}),
  ...(e.lit != null ? { lit: e.lit } : {}),
  ...(e.inferred ? { inferred: true } : {}),
}));

for (const d of destinations) {
  if (!d.anchor) continue;
  // Connectors are the modelled walk from the road to the door. They are marked
  // so the UI can say so, and so a future survey can replace them wholesale.
  graphEdges.push({ a: d.anchor, b: d.id, connector: true });
}

function round(v) {
  return Number(v.toFixed(6));
}

// Widen the bounds to contain everything drawn, plus a small breathing margin so
// a pin never sits exactly on the edge of maxBounds (Leaflet fights panning there).
for (const p of destPins.concat(waypoints)) {
  BOUNDS.south = Math.min(BOUNDS.south, p.lat);
  BOUNDS.north = Math.max(BOUNDS.north, p.lat);
  BOUNDS.west = Math.min(BOUNDS.west, p.lng);
  BOUNDS.east = Math.max(BOUNDS.east, p.lng);
}
const PAD = 0.0008; // ~90 m
BOUNDS.south -= PAD;
BOUNDS.north += PAD;
BOUNDS.west -= PAD;
BOUNDS.east += PAD;

// Where the buildings actually are — see CORE_BOUNDS in the emitted file.
// Entrances are excluded because the main gate sits a kilometre south of the
// nearest building and would drag the opening view back over empty ground.
const corePins = destPins.filter((p) => p.category !== 'entrance');
const coreBounds = {
  south: Math.min(...corePins.map((p) => p.lat)) - PAD,
  north: Math.max(...corePins.map((p) => p.lat)) + PAD,
  west: Math.min(...corePins.map((p) => p.lng)) - PAD,
  east: Math.max(...corePins.map((p) => p.lng)) + PAD,
};

const stats = {
  nodesBeforeSimplify: beforeSimplify,
  nodesRemoved: simplified,
  waypoints: waypoints.length,
  destinations: destPins.length,
  named: destPins.filter((p) => p.source).length,
  edges: graphEdges.length,
  inferredBridges: bridges.length,
};

function reportBridges() {
  if (!bridges.length) return;
  console.warn(
    `\n! ${bridges.length} inferred bridge(s) across gaps in OSM's road coverage.\n` +
      `  Each is a real stretch of ground students walk that nobody has mapped.\n` +
      `  Verify against imagery, then replace with surveyed geometry:`,
  );
  for (const b of bridges) {
    const a = byId.get(b.a);
    const z = byId.get(b.b);
    console.warn(
      `    · ${b.m.toString().padStart(3)} m  ${a.lat.toFixed(6)},${a.lng.toFixed(6)}` +
        ` → ${z.lat.toFixed(6)},${z.lng.toFixed(6)}`,
    );
  }
}

if (STATS_ONLY) {
  console.log(stats);
  reportBridges();
  if (farConnectors.length) {
    console.log(`\n${farConnectors.length} building(s) further than ${MAX_CONNECTOR_M} m from any road:`);
    for (const f of farConnectors) console.log(`  · ${f.id} — ${f.dist} m`);
  }
  process.exit(0);
}

const banner = `// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Written by scripts/build-campus-graph.mjs from scripts/data/uniuyo-osm.json.
// Geometry © OpenStreetMap contributors, ODbL. Building names and search
// aliases come from src/data/campusOverrides.js — edit them there, then re-run:
//
//   node scripts/build-campus-graph.mjs
//
// ${stats.waypoints} waypoints · ${stats.destinations} destinations (${stats.named} named) · ${stats.edges} edges.
`;

const body = `${banner}
export const CAMPUS_CENTER = [${round(CENTER.lat)}, ${round(CENTER.lng)}];
export const CAMPUS_ZOOM = 16;

// Everything the map may draw or pan to, including the gate and the access road
// south of the university boundary. Used for the pan clamp and for deciding
// whether a GPS fix counts as "on campus".
export const MAP_BOUNDS = {
  south: ${round(BOUNDS.south)},
  north: ${round(BOUNDS.north)},
  west: ${round(BOUNDS.west)},
  east: ${round(BOUNDS.east)},
};

// The built-up campus — the extent of the buildings themselves, which is the
// opening view.
//
// Neither of the obvious alternatives works. MAP_BOUNDS includes a kilometre of
// access road through the settlement south of campus. The OSM campus polygon is
// no better: it reaches south to ${round(Math.min(...lats))} but the southernmost building is at
// ${round(coreBounds.south)}, so its bottom third is undeveloped land — framing it spends half
// a phone screen on empty ground and shrinks the part anyone navigates.
//
// The main gate falls outside this on purpose. It is one search away, and
// opening on the academic core is right for the student already on campus.
export const CORE_BOUNDS = {
  south: ${round(coreBounds.south)},
  north: ${round(coreBounds.north)},
  west: ${round(coreBounds.west)},
  east: ${round(coreBounds.east)},
};

export const pins = ${fmt(destPins.concat(waypoints))};

export const edges = ${fmt(graphEdges)};
`;

function fmt(rows) {
  const lines = rows.map((r) => `  ${JSON.stringify(r)},`);
  return `[\n${lines.join('\n')}\n]`;
}

writeFileSync(OUT_PATH, body, 'utf8');

console.log(
  `✓ campus graph rebuilt — ${stats.waypoints} waypoints, ` +
    `${stats.destinations} destinations (${stats.named} named), ${stats.edges} edges ` +
    `(${stats.nodesRemoved} redundant nodes collapsed from ${stats.nodesBeforeSimplify}).`,
);
reportBridges();
if (farConnectors.length) {
  console.warn(
    `! ${farConnectors.length} building(s) sit more than ${MAX_CONNECTOR_M} m from any mapped road — ` +
      `their walking times are estimates until footpaths are surveyed:`,
  );
  for (const f of farConnectors) console.warn(`    · ${f.id} — ${f.dist} m`);
}
