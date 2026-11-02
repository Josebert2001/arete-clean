// Google Maps hand-off links for campus places.
//
// Uses Google's public "Maps URLs" (https://developers.google.com/maps/documentation/urls)
// — plain links, no API key, no billing, no script loaded into Areté, so no CSP
// change. On a phone they open the Google Maps app; on a laptop, the website.

import { UYO_BOUNDS } from '../data/campusPlaces';
import { isWithinBounds, toNumber } from './locationSafety';

const SEARCH_SUFFIX = 'University of Uyo, Uyo';

// The place's coordinates as numbers, or null when they are missing, malformed,
// or outside Uyo. Never trust a position we cannot place in the right town.
export function placeCoords(place) {
  if (!place || place.lat == null || place.lng == null) return null;
  const lat = toNumber(place.lat);
  const lng = toNumber(place.lng);
  if (lat === null || lng === null) return null;
  if (!isWithinBounds(lat, lng, UYO_BOUNDS, 0)) return null;
  return { lat, lng };
}

// { href, kind } — 'directions' when the place has trusted coordinates (walking
// directions from wherever the student is), 'search' otherwise (Google Maps
// looks the name up near the university).
export function placeLink(place) {
  const coords = placeCoords(place);
  if (coords) {
    const params = new URLSearchParams({
      api: '1',
      destination: `${coords.lat},${coords.lng}`,
      travelmode: 'walking',
    });
    return { kind: 'directions', href: `https://www.google.com/maps/dir/?${params}` };
  }
  const params = new URLSearchParams({
    api: '1',
    query: `${place?.name ?? ''}, ${SEARCH_SUFFIX}`,
  });
  return { kind: 'search', href: `https://www.google.com/maps/search/?${params}` };
}

// Case-insensitive name filter for the search box.
export function filterPlaces(list, query, category = 'all') {
  const q = (query || '').trim().toLowerCase();
  return list.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q))
  );
}
