// Coordinate-safety helpers, used by src/utils/placeLinks.js to decide whether
// a campus place's recorded position can be trusted enough to link to.

// Coerce an arbitrary primitive to a finite number, or null when unusable.
// Explicitly rejects null/undefined/'' (which Number() would coerce to 0), plus
// booleans and non-finite values — guard against type confusion at the edge.
export function toNumber(value) {
  if (value == null || value === '' || typeof value === 'boolean') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

// True when lat/lng sit inside the bounds rectangle (plus margin). Non-finite
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
