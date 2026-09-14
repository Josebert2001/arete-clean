// Campus routing logic — pure functions, no Leaflet/DOM dependency.
// Kept separate so the math (Dijkstra, bearings, step generation, and live
// route progress) is testable in isolation. CampusMap.jsx is the only consumer.

export function haversine(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

// Initial bearing (degrees, 0-360) between two lat/lng points.
//
// Every term must be in radians. Getting that wrong does not produce a slightly
// off bearing, it produces a constant one: an earlier version wrote
// `Math.cos(toRad(b.lng) - a.lng)`, subtracting degrees from radians, which at
// campus longitudes (~7.93) evaluates to cos(-7.79) ~ 0.06 instead of ~1.0. That
// left `x` pinned near 0.092 while `y` stayed around 1e-5, so atan2 returned ~0
// for every pair of pins on the map — every instruction read "head north" and
// every turn classified as "straight". The same version also dropped the sin()
// around the longitude delta in `y`.
export function bearingDeg(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (d) => (d * 180) / Math.PI;
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const deg = toDeg(Math.atan2(y, x));
  return (deg + 360) % 360;
}

const COMPASS_16 = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

export function compassDir(deg) {
  const idx = Math.round(((deg % 360) + 360) % 360 / 22.5) % 16;
  return COMPASS_16[idx];
}

export function normalizeDeg(d) {
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

// Classify a turn given the bearing you're arriving on and the bearing you'll
// continue on.
export function turnKind(prevDeg, nextDeg) {
  const diff = Math.abs(normalizeDeg(nextDeg - prevDeg));
  if (diff < 22.5) return 'straight';
  if (diff >= 165) return 'u-turn';
  const dir = normalizeDeg(nextDeg - prevDeg) > 0 ? 'right' : 'left';
  if (diff >= 120) return `sharp-${dir}`;
  return dir;
}

export function buildAdjacency(pinList, edgeList) {
  const adj = {};
  pinList.forEach((p) => (adj[p.id] = []));
  edgeList.forEach((e) => {
    if (!adj[e.a] || !adj[e.b]) return;
    const pa = pinList.find((p) => p.id === e.a);
    const pb = pinList.find((p) => p.id === e.b);
    if (!pa || !pb) return;
    const w = haversine(pa, pb);
    adj[e.a].push({ to: e.b, w });
    adj[e.b].push({ to: e.a, w });
  });
  return adj;
}

// Dijkstra over the custom campus graph. Returns { path, distance } or null
// when the two pins share no walkable connection.
export function dijkstra(start, end, pinList, edgeList) {
  if (!start || !end || start === end) return null;
  const adj = buildAdjacency(pinList, edgeList);
  const dist = {};
  const prev = {};
  const visited = new Set();
  pinList.forEach((p) => (dist[p.id] = Infinity));
  dist[start] = 0;

  for (let i = 0; i < pinList.length; i++) {
    let u = null;
    let best = Infinity;
    for (const id in dist) {
      if (!visited.has(id) && dist[id] < best) {
        best = dist[id];
        u = id;
      }
    }
    if (u === null || u === end) break;
    visited.add(u);
    for (const { to, w } of adj[u] || []) {
      const alt = dist[u] + w;
      if (alt < dist[to]) {
        dist[to] = alt;
        prev[to] = u;
      }
    }
  }

  if (dist[end] === Infinity) return null;
  const path = [];
  let cur = end;
  while (cur !== undefined) {
    path.unshift(cur);
    cur = prev[cur];
  }
  return { path, distance: dist[end] };
}

const TURN_TEXT = {
  straight: 'Continue straight',
  right: 'Turn right',
  left: 'Turn left',
  'sharp-right': 'Take a sharp right',
  'sharp-left': 'Take a sharp left',
  'u-turn': 'Make a U-turn',
};

// Used at waypoints instead of TURN_TEXT. A waypoint is an invisible shape
// point, so "Turn left" there is an instruction the walker cannot locate —
// describe the path bending instead, and save the imperative for the named
// buildings they can actually see. These are whole sentences, not fragments to
// staple onto TURN_TEXT: doing that produced "Turn left, bending left".
const PASS_TEXT = {
  straight: 'Continue straight',
  right: 'Follow the path as it bends right',
  left: 'Follow the path as it bends left',
  'sharp-right': 'Follow the path as it veers sharply right',
  'sharp-left': 'Follow the path as it veers sharply left',
  'u-turn': 'Follow the path back on itself',
};

const HEADING_TEXT = {
  N: 'north', NNE: 'north-northeast', NE: 'northeast', ENE: 'east-northeast',
  E: 'east', ESE: 'east-southeast', SE: 'southeast', SSE: 'south-southeast',
  S: 'south', SSW: 'south-southwest', SW: 'southwest', WSW: 'west-southwest',
  W: 'west', WNW: 'west-northwest', NW: 'northwest', NNW: 'north-northwest',
};

// Builds the turn-by-turn step list for an ordered pin path (from dijkstra).
//
// Consecutive "Continue straight" steps are merged into one. The graph is
// generated from OSM road geometry, which keeps a vertex wherever the tarmac
// bends even slightly, so a single unbroken walk up University of Uyo Road came
// out as "Continue straight 109 m / Continue straight 322 m / Continue straight
// 127 m" — three instructions for one thing to do.
//
// A straight step at a NAMED pin is never merged away: "Continue straight at
// Faculty of Science" is a landmark confirming the walker is still on course,
// which is exactly what a long featureless stretch needs.
//
// Merging breaks the old 1:1 correspondence between steps and path nodes, which
// routeProgress() relied on to decide what to say next. `stepForNode` replaces
// it: stepForNode[i] is the index of the step covering path node i.
// Two graph nodes closer together than this are the same place as far as a
// walker is concerned, and a bearing taken between them is meaningless.
//
// They genuinely occur: a destination whose connector snapped onto an existing
// road node sits exactly on top of it, so the first segment of a route out of
// the main gate has zero length. bearingDeg() on two identical points is
// atan2(0, 0) — which is 0, which reads as "north". The opening instruction was
// therefore a fabricated direction, the same class of bug as the original
// degrees-for-radians one, and just as invisible: it names a real compass point
// with total confidence.
const MIN_SEGMENT_M = 3;

export function buildRouteSteps(path, pinById) {
  if (!path || path.length < 2) return { steps: [], stepForNode: [] };
  const coords = path.map((id) => pinById(id));
  const raw = [];

  // Nearest point ahead of / behind i that is far enough away to define a
  // direction. Returns null when there is none, so callers can skip rather than
  // invent one.
  const ahead = (i) => {
    for (let j = i + 1; j < coords.length; j++) {
      if (haversine(coords[i], coords[j]) >= MIN_SEGMENT_M) return coords[j];
    }
    return null;
  };
  const behind = (i) => {
    for (let j = i - 1; j >= 0; j--) {
      if (haversine(coords[j], coords[i]) >= MIN_SEGMENT_M) return coords[j];
    }
    return null;
  };

  const firstAhead = ahead(0);
  raw.push({
    type: 'start',
    text: firstAhead
      ? `Head ${HEADING_TEXT[compassDir(bearingDeg(coords[0], firstAhead))]} from ${pinById(path[0]).name}`
      : `Set off from ${pinById(path[0]).name}`,
    distance: haversine(coords[0], coords[1]),
    named: true,
  });

  for (let i = 1; i < path.length - 1; i++) {
    const from = behind(i);
    const to = ahead(i);
    // No direction on either side: this node is stacked on its neighbours and
    // has no turn to describe. Its distance still has to reach the step list, so
    // fold it into whatever came before rather than dropping it and losing metres.
    if (!from || !to) {
      raw.push({ type: 'straight', text: PASS_TEXT.straight, distance: haversine(coords[i], coords[i + 1]), named: false });
      continue;
    }
    const prevBearing = bearingDeg(from, coords[i]);
    const nextBearing = bearingDeg(coords[i], to);
    const kind = turnKind(prevBearing, nextBearing);
    const node = pinById(path[i]);
    const named = node.type === 'destination';
    raw.push({
      type: kind,
      text: named ? `${TURN_TEXT[kind]} at ${node.name}` : PASS_TEXT[kind],
      distance: haversine(coords[i], coords[i + 1]),
      named,
    });
  }

  raw.push({
    type: 'arrive',
    text: `Arrive at ${pinById(path[path.length - 1]).name}`,
    distance: 0,
    named: true,
  });

  const steps = [];
  const stepForNode = [];
  for (let i = 0; i < raw.length; i++) {
    const step = raw[i];
    const prev = steps[steps.length - 1];
    const canMerge =
      prev &&
      step.type === 'straight' &&
      !step.named &&
      (prev.type === 'straight' || prev.type === 'start');
    if (canMerge) {
      prev.distance += step.distance;
      stepForNode[i] = steps.length - 1;
    } else {
      steps.push({ type: step.type, text: step.text, distance: step.distance });
      stepForNode[i] = steps.length - 1;
    }
  }

  return { steps, stepForNode };
}

// Full route build: dijkstra + steps + cumulative weights along the path.
export function buildRoute(start, end, pinList, edgeList) {
  const result = dijkstra(start, end, pinList, edgeList);
  if (!result) return null;
  // Map lookup, not pinList.find(): this runs once per path node and again per
  // segment, and the graph is 264 pins rather than the prototype's 40.
  const index = new Map(pinList.map((p) => [p.id, p]));
  const pinById = (id) => index.get(id);
  const { steps, stepForNode } = buildRouteSteps(result.path, pinById);

  let cum = 0;
  const cumulative = [0];
  for (let i = 0; i < result.path.length - 1; i++) {
    cum += haversine(pinById(result.path[i]), pinById(result.path[i + 1]));
    cumulative.push(cum);
  }

  // How far the mapped walk is compared with the straight line.
  //
  // This matters more here than on a normal map. OSM has the roads around this
  // campus but almost none of its footpaths — no `highway=footway` at all — so
  // the graph is connected without being complete, and two buildings 176 m apart
  // can be 1,655 m apart *through the graph* because the only mapped link is the
  // ring road. Dijkstra is right and the answer is still useless to a student
  // who can see their destination across the grass.
  //
  // Exposed rather than hidden so the UI can admit it. A confident "21 min walk"
  // for a two-minute crossing is the kind of wrong that stops people trusting
  // the map at all.
  const direct = haversine(pinById(start), pinById(end));
  return {
    fromId: start,
    toId: end,
    from: pinById(start)?.name,
    to: pinById(end)?.name,
    path: result.path,
    distance: result.distance,
    direct,
    detour: direct > 0 ? result.distance / direct : 1,
    steps,
    stepForNode,
    cumulative,
  };
}

// ── Routing from wherever the student is standing ────────────────────────────

// The id given to the walker's own position when it is injected into the graph.
// Namespaced so it can never collide with a generated pin id — those are
// `n<number>`, `building-NN` or a name slug, none of which contain '_'.
export const YOU_ID = '__you';
const ENTRY_ID = '__entry';

// Below this the projection is treated as landing on the existing node rather
// than splitting the edge; a shorter split leaves a degenerate stub.
const SNAP_TO_NODE_M = 8;

// Perpendicular distance from p to segment a→b, and the closest point on it, in
// metres on a local plane. Accurate to well under a metre over a 2 km campus,
// and it keeps this planar rather than spherical.
function projectOntoSegment(p, a, b) {
  const k = Math.cos((p.lat * Math.PI) / 180);
  const to = (q) => ({ x: (q.lng - p.lng) * k * 111320, y: (q.lat - p.lat) * 111320 });
  const A = to(a);
  const B = to(b);
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : (-A.x * dx - A.y * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = A.x + t * dx;
  const cy = A.y + t * dy;
  return {
    dist: Math.hypot(cx, cy),
    point: { lat: p.lat + cy / 111320, lng: p.lng + cx / (k * 111320) },
  };
}

// Route from a raw GPS fix to a destination, so the student never has to pick a
// starting pin off a list. On a 2.2 km campus in the sun, that list was the
// single worst thing about the map.
//
// A fix is almost never on the graph, so it gets joined to it: find the nearest
// point on any walkable edge, split that edge there, and connect the walker to
// the split. The caller's pins and edges are never mutated — the augmented graph
// lives only as long as the route.
//
// Returns null when there is no fix, no destination, or nothing within
// `maxSnapM`. That last case matters: a walker further than that from any mapped
// path cannot be given honest directions, and quietly snapping them to a distant
// road would misreport both the route and the walking time.
export function routeFromPoint(userPos, endId, pinList, edgeList, { maxSnapM = 250 } = {}) {
  if (!userPos || !endId) return null;
  const index = new Map(pinList.map((p) => [p.id, p]));
  if (!index.has(endId)) return null;

  let best = null;
  for (const e of edgeList) {
    const a = index.get(e.a);
    const b = index.get(e.b);
    if (!a || !b) continue;
    const r = projectOntoSegment(userPos, a, b);
    if (!best || r.dist < best.dist) best = { ...r, edge: e, a, b };
  }
  if (!best || best.dist > maxSnapM) return null;

  const you = {
    id: YOU_ID,
    name: 'Your location',
    type: 'destination',
    category: 'entrance',
    lat: userPos.lat,
    lng: userPos.lng,
  };
  const pins = [...pinList, you];
  const edges = [...edgeList];

  const dA = haversine(best.point, best.a);
  const dB = haversine(best.point, best.b);
  if (dA <= SNAP_TO_NODE_M || dB <= SNAP_TO_NODE_M) {
    edges.push({ a: YOU_ID, b: dA <= dB ? best.a.id : best.b.id, connector: true });
  } else {
    // Split at the projection so the walker joins the path at right angles
    // instead of being sent back to whichever end happened to be nearer.
    pins.push({ id: ENTRY_ID, type: 'waypoint', lat: best.point.lat, lng: best.point.lng });
    const at = edges.indexOf(best.edge);
    if (at !== -1) edges.splice(at, 1);
    const tags = { surface: best.edge.surface, lit: best.edge.lit, inferred: best.edge.inferred };
    edges.push({ a: best.a.id, b: ENTRY_ID, ...tags });
    edges.push({ a: ENTRY_ID, b: best.b.id, ...tags });
    edges.push({ a: YOU_ID, b: ENTRY_ID, connector: true });
  }

  const route = buildRoute(YOU_ID, endId, pins, edges);
  if (!route) return null;
  // `pins` is carried back because the route references two ids the caller's own
  // pin list does not contain; anything drawing or measuring this route has to
  // resolve them through here.
  return { ...route, pins, fromLive: true, snapDistance: best.dist };
}

// Given a tracked user position and an active route, work out how far along
// the route they are (nearest-path-node approximation), what comes next, and
// whether anything looks wrong (off route / arrived).
export function routeProgress(userPos, route, pinById) {
  if (!route || !userPos) return null;

  let nearestIdx = 0;
  let nearestDist = Infinity;
  route.path.forEach((id, idx) => {
    const d = haversine(userPos, pinById(id));
    if (d < nearestDist) {
      nearestDist = d;
      nearestIdx = idx;
    }
  });

  // Distance still to walk, measured from the nearest node onward, plus however
  // far the walker currently stands off that node.
  const alongRoute = route.distance - route.cumulative[nearestIdx];
  const remaining = Math.max(0, alongRoute);

  // Arrival is about where the walker actually is, not about running out of
  // graph. Keying it off `remaining` alone meant anyone whose nearest node
  // happened to be the destination was told they had arrived — including
  // someone standing 60 m away across open ground, which is inside the 70 m
  // off-route threshold and so went unchallenged. Require real proximity to the
  // destination itself.
  const destination = pinById(route.path[route.path.length - 1]);
  const distanceToDestination = destination ? haversine(userPos, destination) : Infinity;
  const arrived = distanceToDestination <= 25;

  const offRoute = nearestDist > 70;

  // The instruction owed at the node the walker is nearest to. Steps are no
  // longer 1:1 with path nodes now that consecutive straights are merged, so
  // this resolves through stepForNode; indexing `steps` directly would hand back
  // an instruction from further along the route, and increasingly so the more of
  // it the walker had already covered.
  const stepIdx = route.stepForNode
    ? route.stepForNode[Math.min(nearestIdx, route.stepForNode.length - 1)]
    : Math.min(nearestIdx, route.steps.length - 1);

  return {
    nearestIdx,
    nearestDist,
    remaining,
    distanceToDestination,
    arrived,
    offRoute,
    nextStep: route.steps[stepIdx],
  };
}
