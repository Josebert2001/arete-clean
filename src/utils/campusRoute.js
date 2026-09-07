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
// steps[i] is the instruction you follow as you leave path[i]. Segment
// lengths are real haversine weights, so the on-screen list doubles as
// spoken directions if we ever want voice guidance.
export function buildRouteSteps(path, pinById) {
  if (!path || path.length < 2) return [];
  const coords = path.map((id) => pinById(id));
  const steps = [];

  const first = bearingDeg(coords[0], coords[1]);
  const startSeg = haversine(coords[0], coords[1]);
  steps.push({
    type: 'start',
    text: `Head ${HEADING_TEXT[compassDir(first)]} from ${pinById(path[0]).name}`,
    distance: startSeg,
  });

  for (let i = 1; i < path.length - 1; i++) {
    const prevBearing = bearingDeg(coords[i - 1], coords[i]);
    const nextBearing = bearingDeg(coords[i], coords[i + 1]);
    const kind = turnKind(prevBearing, nextBearing);
    const node = pinById(path[i]);
    const seg = haversine(coords[i], coords[i + 1]);
    const text = node.type === 'destination'
      ? `${TURN_TEXT[kind]} at ${node.name}`
      : PASS_TEXT[kind];
    steps.push({ type: kind, text, distance: seg });
  }

  steps.push({
    type: 'arrive',
    text: `Arrive at ${pinById(path[path.length - 1]).name}`,
    distance: 0,
  });

  return steps;
}

// Full route build: dijkstra + steps + cumulative weights along the path.
export function buildRoute(start, end, pinList, edgeList) {
  const result = dijkstra(start, end, pinList, edgeList);
  if (!result) return null;
  const pinById = (id) => pinList.find((p) => p.id === id);
  const steps = buildRouteSteps(result.path, pinById);

  let cum = 0;
  const cumulative = [0];
  for (let i = 0; i < result.path.length - 1; i++) {
    cum += haversine(pinById(result.path[i]), pinById(result.path[i + 1]));
    cumulative.push(cum);
  }

  const fromPin = pinById(start);
  const toPin = pinById(end);
  return {
    fromId: start,
    toId: end,
    from: fromPin?.name,
    to: toPin?.name,
    path: result.path,
    distance: result.distance,
    steps,
    cumulative,
  };
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

  // steps[i] is the instruction you follow as you LEAVE path[i], so the walker
  // standing at (or nearest to) node i still has steps[i] ahead of them. Using
  // i + 1 handed them the turn at the *next* junction and marched them straight
  // past the one they were standing on.
  const nextIdx = Math.min(nearestIdx, route.steps.length - 1);

  return {
    nearestIdx,
    nearestDist,
    remaining,
    distanceToDestination,
    arrived,
    offRoute,
    nextStep: route.steps[nextIdx],
  };
}