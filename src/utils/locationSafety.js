// Location-safety helpers for the campus map.
//
// Security boundary notes (from the map/location audit):
//  - Geodata from the browser is UNTRUSTED client input. Latitude/longitude
//    are coerced to finite numbers by toNumber()/safeGeoPoint() before they are
//    ever rendered or used; anything non-numeric is dropped, never drawn.
//  - Leaflet writes popup content to innerHTML, so every string interpolated
//    into a popup (marker name, category label — and all edges of admin-entered
//    content later) must pass through escapeHtml().
//  - The validation functions below are the ingestion contract for the future
//    admin editor (roadmap §6.1): it must be the ONLY way user-entered pins and
//    edges reach the map. No bypass.

// Extension is required, not optional: scripts/validate-modules.mjs imports this
// module under plain Node ESM, which does not do Vite's extensionless resolution.
import { dijkstra } from './campusRoute.js';

// Escape a string for safe interpolation into an HTML string. Used wherever
// content is written via innerHTML (Leaflet bindPopup). Leaves text intact and
// neutralises markup/event-handler attributes.
export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Coerce an arbitrary primitive to a finite number, or null when unusable.
// Explicitly rejects null/undefined/'' (which Number() would coerce to 0), plus
// booleans and non-finite values — guard against type confusion at the edge.
export function toNumber(value) {
  if (value == null || value === '' || typeof value === 'boolean') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

// Normalise a geolocation result ({latitude, longitude, accuracy}) into an
// all-finite point. Returns null for malformed input so callers can skip it.
export function safeGeoPoint({ latitude, longitude, accuracy } = {}) {
  const lat = toNumber(latitude);
  const lng = toNumber(longitude);
  if (lat === null || lng === null) return null;
  return { lat, lng, accuracy: toNumber(accuracy) };
}

// True when lat/lng sit inside the campus rectangle (plus margin). Non-finite
// input is always false.
export function isWithinBounds(lat, lng, bounds, margin = 0.001) {
  if (bounds == null || !Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  return (
    lat >= bounds.south - margin &&
    lat <= bounds.north + margin &&
    lng >= bounds.west - margin &&
    lng <= bounds.east + margin
  );
}

// ── Admin-ingestion contract (F-8) ──────────────────────────────────────────
// Shapes mirror src/data/campusMap.js pins/edges. Categories/bounds are passed
// in so the guard stays a pure function (no module-level surprises in tests).

const VALID_TYPES = ['destination', 'waypoint'];
const ID_PATTERN = /^[a-z0-9-]{1,40}$/;
const MAX_NAME_LENGTH = 80;

export function validatePin(pin, { bounds, categories, existingIds = {} } = {}) {
  const errors = [];
  if (!pin || typeof pin !== 'object') return { ok: false, errors: ['pin is not an object'] };

  const id = String(pin.id ?? '').trim();
  if (!ID_PATTERN.test(id)) errors.push('id must be 1-40 chars of a-z, 0-9 or "-"');
  if (existingIds[id]) errors.push(`duplicate id: ${id}`);

  const name = String(pin.name ?? '').trim();
  if (!name || name.length > MAX_NAME_LENGTH) errors.push(`name must be 1-${MAX_NAME_LENGTH} chars`);
  if (/[<>]/.test(name)) errors.push('name must not contain < or >');
  if (!VALID_TYPES.includes(pin.type)) errors.push(`type must be ${VALID_TYPES.join(' or ')}`);
  if (pin.type === 'destination' && categories && !(pin.category in categories)) {
    errors.push(`unknown category: ${pin.category}`);
  }

  const lat = toNumber(pin.lat);
  const lng = toNumber(pin.lng);
  if (lat === null || lng === null) errors.push('lat/lng must be finite numbers');
  else if (bounds && !isWithinBounds(lat, lng, bounds, 0.005)) errors.push('pin is outside campus bounds');

  if (errors.length) return { ok: false, errors };
  return { ok: true, errors, value: { id, name, type: pin.type, category: pin.category, lat, lng } };
}

export function validateEdge(edge, knownIds) {
  const a = String(edge?.a ?? '').trim();
  const b = String(edge?.b ?? '').trim();
  const errors = [];
  if (!knownIds.includes(a)) errors.push(`edge references unknown pin: ${a}`);
  if (!knownIds.includes(b)) errors.push(`edge references unknown pin: ${b}`);
  if (a === b) errors.push('edge cannot connect a pin to itself');
  return errors.length ? { ok: false, errors } : { ok: true, errors, value: { a, b } };
}

// Whole-graph sanity: all edges reference known pins and every destination is
// reachable from `startId` (default: the main gate). Mirrors the reachability
// assertions in src/__tests__/campusRoute.test.js.
export function validateGraph(pins, edges, startId = 'main-gate') {
  const ids = new Set((pins || []).map((p) => p?.id));
  const errors = [];
  for (const edge of edges || []) {
    const r = validateEdge(edge, [...ids]);
    if (!r.ok) errors.push(...r.errors);
  }
  for (const pin of pins || []) {
    if (pin?.type !== 'destination' || pin.id === startId) continue;
    if (!dijkstra(startId, pin.id, pins, edges)) errors.push(`no route from ${startId} to ${pin.id}`);
  }
  return { ok: errors.length === 0, errors };
}