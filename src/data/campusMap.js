// Campus map data — the public face of the routing graph.
//
// The pins, edges and bounds are NOT written here any more. They are generated
// from real OpenStreetMap geometry by scripts/build-campus-graph.mjs and live in
// campusGraph.generated.js; this module re-exports them so every existing
// import (`from '../data/campusMap'`) keeps working, and adds the presentation
// layer — categories and theme-aware colours — which is hand-written.
//
// To change the map data:
//   · a building name, category or search alias → src/data/campusOverrides.js
//   · the geometry itself                       → refresh scripts/data/uniuyo-osm.json
//   then re-run: node scripts/build-campus-graph.mjs
//
// Geometry © OpenStreetMap contributors, ODbL.

export {
  CAMPUS_CENTER,
  CAMPUS_ZOOM,
  MAP_BOUNDS,
  CORE_BOUNDS,
  pins,
  edges,
} from './campusGraph.generated.js';

// Pin categories. `color` is a key into the Tailwind palette defined in
// index.css — never a hex value (project convention, and the theme swap below
// depends on it resolving at call time).
export const CATEGORIES = {
  academic: { label: 'Academic', color: 'ember' },
  building: { label: 'Building', color: 'coffee-500' },
  office: { label: 'Office', color: 'moss' },
  facility: { label: 'Facility', color: 'coffee-700' },
  hostel: { label: 'Hostel', color: 'rust' },
  sports: { label: 'Sports', color: 'moss' },
  entrance: { label: 'Entrance', color: 'ink' },
  transport: { label: 'Transport', color: 'ember' },
};

// Resolves a palette key (e.g. 'moss', 'coffee-700') to a concrete color for
// the theme that is active right now.
//
// It returns `rgb(31 41 55)`, not `rgb(var(--moss))`, and that matters: these
// values are handed to the map renderer, which writes vector colors as SVG
// *presentation attributes* (`path.setAttribute('stroke', ...)`) and as canvas
// `strokeStyle`. Neither substitutes `var()` the way a real CSS property does,
// so a token string risks being dropped and falling back to the renderer's
// defaults — black fills and an invisible route line. Resolving here is correct
// for the CSS call sites too (the legend swatches use it as an inline
// `backgroundColor`), so both paths stay in agreement.
//
// Because the value is a snapshot, anything drawn with it must be restyled when
// the theme changes — see restyleForTheme() in CampusMap.jsx.
export function categoryColor(key) {
  return cssPalette(key || 'ember');
}

// Reads one of the space-separated RGB channel triples defined in index.css
// (`--moss: 92 107 63`) off the document root and wraps it as a usable color.
// Falls back to the raw token form when there is no document (SSR/prerender),
// where nothing is painted anyway.
export function cssPalette(key, fallback = 'rgb(107 114 128)') {
  if (typeof document === 'undefined') return `rgb(var(--${key}))`;
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${key}`)
    .trim();
  return channels ? `rgb(${channels})` : fallback;
}
