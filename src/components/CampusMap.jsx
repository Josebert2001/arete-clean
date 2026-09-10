import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';
import {
  Navigation,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDownRight,
  ArrowDownLeft,
  X,
  RotateCcw,
  ChevronDown,
  Crosshair,
  Navigation2,
  MapPin,
  Flag,
  Search,
  Footprints,
  Layers,
} from 'lucide-react';
import { pins as rawPins, edges as rawEdges, CAMPUS_CENTER, CAMPUS_ZOOM, MAP_BOUNDS, CORE_BOUNDS, CATEGORIES, categoryColor, cssPalette } from '../data/campusMap';
import { buildRoute, routeProgress, routeFromPoint } from '../utils/campusRoute';
import { searchDestinations } from '../utils/campusSearch';
import { safeGeoPoint, isWithinBounds } from '../utils/locationSafety';

const WALK_SPEED = 80; // meters per minute

// Sentinel used as a "From" value. Not a pin id — it means "wherever the GPS
// says I am", which is resolved at route time rather than picked off a list.
const MY_LOCATION = '__my-location';

// When the mapped route is this much longer than the straight line, and the
// straight line is more than trivially short, the map says so instead of
// presenting the walking time as fact. Measured on the real graph: a 176 m
// crossing routes as 1,655 m — 9.4x — because the only mapped connection is the
// ring road. 2.5x is comfortably above the honest detours a real path network
// produces and well below that.
const DETOUR_WARN_RATIO = 2.5;
const DETOUR_WARN_MIN_M = 60;

// How far outside MAP_BOUNDS a GPS fix may sit and still be treated as "on
// campus" (degrees — roughly 550 m here). Generous enough to cover a poor fix
// at the perimeter, tight enough that a reading from another town is rejected.
const OFF_CAMPUS_MARGIN = 0.005;

const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY?.trim();

// ?graph=1 draws the raw routing graph — every waypoint node, not just the named
// destinations. A surveying aid, not a user-facing feature: it is the only way to
// see which node a building's connector attached to, or where an inferred bridge
// crosses open ground.
const showGraph =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('graph') === '1';

// CARTO's raster basemaps watermark every request without a key. With a key we
// get the pretty Voyager / Dark Matter tiles; without one we fall back to the
// plain default OSM tiles so the map is never covered in "API key required".
//
// The two providers do NOT take the same options, and mixing them up shows as
// missing tiles rather than an error:
//   * subdomains — CARTO serves a-d, OSM serves only a-c. Asking OSM for
//     d.tile.openstreetmap.org silently loses a quarter of every screen.
//   * maxZoom — CARTO goes to 20, OSM stops at 19. Past that the server 404s
//     and the viewport goes blank, which the sidebar's "fly to a building"
//     button (setView at zoom 19) walks straight into on a retina screen,
//     since detectRetina requests one level deeper than it displays.
//   * {r} — the @2x retina suffix. CARTO honours it; OSM has no @2x tiles, so
//     detectRetina must stay off there.
const TILE_CONFIG = CARTO_KEY
  ? {
      light: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(CARTO_KEY)}`,
      dark: `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(CARTO_KEY)}`,
      subdomains: 'abcd',
      maxZoom: 20,
      detectRetina: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  : {
      light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      dark: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: 'abc',
      maxZoom: 19,
      detectRetina: false,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };

// Highest zoom the map itself will go to. Capped by the tile source so the user
// can never zoom into a level that returns nothing.
const MAX_ZOOM = TILE_CONFIG.maxZoom;

// Esri World Imagery — free, no key, and the only satellite layer whose terms
// explicitly grant the right to trace features from it, which is how the campus
// footpaths will eventually get mapped.
//
// Note the {z}/{y}/{x} order. Esri addresses tiles row-then-column, the reverse
// of Leaflet's default {z}/{x}/{y}; getting it wrong does not error, it silently
// serves a different part of the planet.
//
// SATELLITE_MAX_ZOOM is 18 and that is not a style choice. Measured over the
// campus core: z16-z18 return real imagery (8.7 kB, 7.3 kB, 5.8 kB) while z19
// and z20 both return an identical 2,521-byte grey placeholder reading "Map data
// not yet available". Without the cap the very first thing a student does after
// switching to satellite — zoom in to find a door — lands them on a blank grey
// square, and the sidebar's fly-to button used to go straight to z19.
//
// Deliberately NOT precached by the service worker: Esri's terms allow offline
// export only through their own ArcGIS applications, which is also why the
// offline basemap work went to self-hosted OpenStreetMap tiles instead.
const SATELLITE_MAX_ZOOM = 18;
const SATELLITE_TILES = {
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  maxZoom: SATELLITE_MAX_ZOOM,
  attribution:
    'Imagery &copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
};

// Vector styles are resolved against the palette at call time (categoryColor /
// cssPalette hand back concrete rgb() values, not `var()` tokens — see the note
// in src/data/campusMap.js). That makes them a snapshot of the current theme,
// so every layer built from them has to be restyled when the theme flips.
const edgeLineStyle = () => ({ color: cssPalette('coffee-400') });
const waypointStyle = () => ({
  color: cssPalette('paper'),
  fillColor: cssPalette('coffee-500'),
});
const destinationStyle = (cat) => ({
  color: cssPalette('paper'),
  fillColor: categoryColor(cat.color),
});
const routeCasingStyle = () => ({ color: cssPalette('paper') });
const routeLineStyle = () => ({ color: cssPalette('ember') });

function createTileLayer(theme, basemap) {
  if (basemap === 'satellite') {
    return L.tileLayer(SATELLITE_TILES.url, {
      attribution: SATELLITE_TILES.attribution,
      maxZoom: SATELLITE_TILES.maxZoom,
      // No {r}: Esri has no @2x tiles, and detectRetina would request one zoom
      // deeper than it displays — straight past the imagery ceiling into the
      // grey placeholder on exactly the high-DPI phones students carry.
      detectRetina: false,
    });
  }
  return L.tileLayer(TILE_CONFIG[theme] || TILE_CONFIG.light, {
    attribution: TILE_CONFIG.attribution,
    maxZoom: TILE_CONFIG.maxZoom,
    subdomains: TILE_CONFIG.subdomains,
    detectRetina: TILE_CONFIG.detectRetina,
  });
}

// Vector styling has to change over imagery. The graph is drawn in coffee and
// cream, which read well on a pale street map and disappear against dark aerial
// photography — and in dark theme the marker stroke is `paper`, i.e. black on
// near-black. Over satellite everything gets a white stroke and more opacity.
const satelliteEdgeStyle = () => ({ color: '#ffffff', opacity: 0.75 });
const satelliteStrokeStyle = () => ({ color: '#ffffff' });

function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function formatTime(meters) {
  const minutes = Math.ceil(meters / WALK_SPEED);
  if (minutes < 1) return 'Less than a minute';
  if (minutes === 1) return '1 min walk';
  return `${minutes} min walk`;
}

function etaAt(meters) {
  const minutes = Math.max(1, Math.ceil(meters / WALK_SPEED));
  const eta = new Date(Date.now() + minutes * 60000);
  return eta.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

const TURN_ICONS = {
  start: MapPin,
  straight: ArrowUp,
  right: ArrowRight,
  left: ArrowLeft,
  'sharp-right': ArrowDownRight,
  'sharp-left': ArrowDownLeft,
  'u-turn': RotateCcw,
  arrive: Flag,
};

export default function CampusMap() {
  const { theme } = useTheme();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const tileLayerRef = useRef(null);
  const tileThemeRef = useRef(theme);
  const basemapRef = useRef('map');
  const themeRef = useRef(theme);
  const markersRef = useRef([]);
  const edgeLinesRef = useRef([]);
  const routeLineRef = useRef(null);
  const routeCasingRef = useRef(null);
  const userDotRef = useRef(null);
  const userAccuracyRef = useRef(null);
  const watchIdRef = useRef(null);
  const firstFixRef = useRef(null);
  const directionsRef = useRef(null);
  const routeRef = useRef(null);
  const followRef = useRef(true);

  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [route, setRoute] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFromList, setShowFromList] = useState(false);
  const [showToList, setShowToList] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [follow, setFollow] = useState(true);
  const [userPos, setUserPos] = useState(null);
  const [geoError, setGeoError] = useState('');
  const [routeError, setRouteError] = useState('');
  // 'map' | 'satellite'. Street map by default: it is the one that shows the
  // campus graph clearly, and the one that works offline.
  const [basemap, setBasemap] = useState('map');

  const pinIndex = useMemo(() => new Map(rawPins.map((p) => [p.id, p])), []);
  const pinById = (id) => pinIndex.get(id);
  const getPinName = (id) => (id === MY_LOCATION ? 'My location' : pinById(id)?.name || '');

  // Resolves ids for a route that may have been built from a live GPS fix. Such
  // a route contains two pins the shipped list does not — the walker, and the
  // point where they join the path — so drawing or measuring it through the
  // plain lookup returns undefined and throws on .lat.
  const routePinById = (r) => {
    if (!r?.pins) return pinById;
    const live = new Map(r.pins.map((p) => [p.id, p]));
    return (id) => live.get(id) ?? pinById(id);
  };

  const destinations = useMemo(
    () => rawPins.filter((p) => p.type === 'destination'),
    []
  );

  // Ranked, alias-aware search — see src/utils/campusSearch.js. The old filter
  // matched a lowercased substring of the official name only, so the map could
  // be searched only by people who already knew what each building was called.
  const filteredDestinations = useMemo(
    () => searchDestinations(searchQuery, destinations, CATEGORIES),
    [destinations, searchQuery],
  );

  // routeProgress walks route.path, which on a live route includes ids that are
  // not in the shipped pin list — resolve through the route's own pins.
  const progress = route && userPos ? routeProgress(userPos, route, routePinById(route)) : null;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Any layer left over from a previous run of this effect (React StrictMode
    // mounts, tears down and remounts in development) belongs to a map that no
    // longer exists. Drop them, or the sidebar's marker lookup below finds a
    // dead one and its popup silently refuses to open.
    markersRef.current = [];
    edgeLinesRef.current = [];

    // The permanent site is ~2.8 km x 1.8 km. A desktop viewport at zoom 16 spans
    // more than 3 km, i.e. WIDER than the campus — and a maxBounds narrower than
    // the viewport is the one configuration Leaflet cannot satisfy. With
    // viscosity pinned at 1.0 it re-centres on every corrective pan, corrects
    // again, and locks the main thread; the tab renders a skeleton and then stops
    // responding to input entirely.
    //
    // Two defences, because either alone still breaks on some screen size:
    //   · the pan clamp is padded well beyond the campus, so it can always
    //     contain the viewport, and viscosity is elastic rather than absolute;
    //   · the opening view comes from fitBounds(), not a hard-coded zoom, so it
    //     frames the whole campus on a phone and a monitor alike.
    const PAN_PAD = 0.02; // ~2.2 km of slack around the campus
    const map = L.map(mapRef.current, {
      center: CAMPUS_CENTER,
      zoom: CAMPUS_ZOOM,
      maxZoom: MAX_ZOOM,
      minZoom: 13,
      maxBounds: [
        [MAP_BOUNDS.south - PAN_PAD, MAP_BOUNDS.west - PAN_PAD],
        [MAP_BOUNDS.north + PAN_PAD, MAP_BOUNDS.east + PAN_PAD],
      ],
      maxBoundsViscosity: 0.7,
      zoomControl: false,
    });

    map.fitBounds(
      [
        [CORE_BOUNDS.south, CORE_BOUNDS.west],
        [CORE_BOUNDS.north, CORE_BOUNDS.east],
      ],
      { padding: [24, 24], animate: false },
    );

    L.control.zoom({ position: 'topright' }).addTo(map);

    const tileLayer = createTileLayer(themeRef.current, basemapRef.current).addTo(map);
    tileLayerRef.current = tileLayer;
    tileThemeRef.current = themeRef.current;

    // Resolve every colour ONCE, up front.
    //
    // cssPalette() calls getComputedStyle(), which forces a synchronous style
    // recalculation. Calling it inside the layer loops meant one forced recalc
    // per layer, interleaved with inserting that layer into a steadily growing
    // SVG tree — textbook layout thrashing. On the prototype's invented 40-pin
    // graph it was survivable. On the real OSM graph (264 pins, 271 edges → 535
    // layers, ~1,000 getComputedStyle calls) it locked the main thread hard
    // enough that the tab stopped responding to input and never painted the map.
    const palette = {
      edge: edgeLineStyle(),
      waypoint: waypointStyle(),
      muted: cssPalette('coffee-500'),
      destination: Object.fromEntries(
        Object.entries(CATEGORIES).map(([k, cat]) => [k, destinationStyle(cat)]),
      ),
    };

    // O(1) endpoint lookup. The previous rawPins.find() per edge was O(E × P) —
    // fine at 45 edges, 70k comparisons at 271.
    const pinIndex = new Map(rawPins.map((p) => [p.id, p]));

    // Build into layer groups and attach each in one go, so the map performs a
    // single insertion rather than one per feature.
    const edgeLayer = L.layerGroup();
    const markerLayer = L.layerGroup();

    rawEdges.forEach((e) => {
      const pa = pinIndex.get(e.a);
      const pb = pinIndex.get(e.b);
      if (!pa || !pb) return;
      const line = L.polyline(
        [
          [pa.lat, pa.lng],
          [pb.lat, pb.lng],
        ],
        { ...palette.edge, weight: 1.5, dashArray: '3 6', opacity: 0.45 },
      );
      edgeLayer.addLayer(line);
      edgeLinesRef.current.push(line);
    });

    rawPins.forEach((pin) => {
      if (pin.type === 'waypoint') {
        // Waypoints are route-shaping geometry, not places — they have no name
        // and nothing to tell you. The prototype drew them because its invented
        // graph had twenty; the real one derived from OSM has 229, and drawing
        // them buried all 35 searchable destinations under a field of identical
        // brown dots. The dashed edge lines already show where the paths run.
        //
        // Kept behind ?graph=1 because it is genuinely useful while surveying —
        // it is the only way to see which node a connector attached to.
        if (!showGraph) return;
        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 3.5,
          ...palette.waypoint,
          fillOpacity: 0.8,
          weight: 1.5,
        });
        markerLayer.addLayer(marker);
        markersRef.current.push({ id: pin.id, marker, pin });
      } else {
        const cat = CATEGORIES[pin.category] || CATEGORIES.building;
        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 8,
          ...(palette.destination[pin.category] ?? palette.destination.building),
          fillOpacity: 0.95,
          weight: 3,
        });

        // Built as DOM rather than an HTML string, for two reasons.
        //
        // The popup needs a real button — tapping a pin and getting directions
        // is the whole interaction, and it cannot be a link because the target
        // is React state, not a URL. And building it as nodes means the name
        // goes in through textContent, so a building called `<img onerror=...>`
        // is inert by construction instead of relying on remembering to call
        // escapeHtml at every interpolation.
        const card = document.createElement('div');
        card.className = 'campus-popup';

        const title = document.createElement('strong');
        title.textContent = pin.name;
        card.appendChild(title);

        const sub = document.createElement('span');
        sub.textContent = pin.source ? cat.label : `${cat.label} · name not surveyed yet`;
        card.appendChild(sub);

        const go = document.createElement('button');
        go.type = 'button';
        go.className = 'campus-popup__go';
        go.textContent = 'Directions';
        // Through a ref, not a direct closure. Markers are created once, in the
        // mount effect, so a handler captured here would hold the very first
        // render's state forever — it would route from whatever `userPos` was
        // when the map loaded, which is `null`. The ref is reassigned every
        // render, so the button always reaches the current one.
        go.addEventListener('click', () => directionsRef.current?.(pin.id));
        card.appendChild(go);

        marker.bindPopup(card);
        markerLayer.addLayer(marker);
        markersRef.current.push({ id: pin.id, marker, pin });
      }
    });

    edgeLayer.addTo(map);
    markerLayer.addTo(map);

    mapInstance.current = map;

    // The map may mount inside a container whose size isn't settled yet
    // (lazy chunk, SSR) — force Leaflet to re-measure after first paint, then
    // re-frame, since the fitBounds above was computed against the pre-layout
    // size and would otherwise leave the campus half off-screen.
    const sizeTimer = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(
        [
          [CORE_BOUNDS.south, CORE_BOUNDS.west],
          [CORE_BOUNDS.north, CORE_BOUNDS.east],
        ],
        { padding: [24, 24], animate: false },
      );
    }, 0);

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      // map.remove() takes every layer with it, so the user dot and halo only
      // need their refs dropped — otherwise a remount would try to reuse
      // markers belonging to a destroyed map.
      userDotRef.current = null;
      userAccuracyRef.current = null;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      clearTimeout(sizeTimer);
    };
  }, []);

  // Follow the site theme AND the chosen basemap: swap the tile layer, and
  // restyle every vector drawn from the palette. The colours were resolved to
  // concrete rgb() values when the layers were created, so without this second
  // half the pins and route keep their light-theme colours over dark tiles — and
  // their street-map colours over satellite imagery, where coffee-on-cream is
  // close to invisible.
  useEffect(() => {
    themeRef.current = theme;
    const map = mapInstance.current;
    if (!map) return;
    if (tileThemeRef.current === theme && basemapRef.current === basemap) return;

    const satellite = basemap === 'satellite';

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = createTileLayer(theme, basemap).addTo(map);
    }

    // Clamp the map's own ceiling to whatever the active imagery actually has.
    // setMaxZoom() also pulls the view back if it is currently deeper, so a
    // student sitting at z19 on the street map does not land on Esri's grey
    // "Map data not yet available" tile the instant they switch.
    map.setMaxZoom(satellite ? SATELLITE_MAX_ZOOM : MAX_ZOOM);

    // Same one-shot palette resolution as the initial render, and for the same
    // reason: a getComputedStyle() per layer here would re-run the layout thrash
    // across every layer on each toggle.
    const edgeStyle = satellite ? satelliteEdgeStyle() : edgeLineStyle();
    const wpStyle = satellite
      ? { ...waypointStyle(), ...satelliteStrokeStyle() }
      : waypointStyle();
    const destStyles = Object.fromEntries(
      Object.entries(CATEGORIES).map(([k, cat]) => [
        k,
        satellite ? { ...destinationStyle(cat), ...satelliteStrokeStyle() } : destinationStyle(cat),
      ]),
    );

    edgeLinesRef.current.forEach((line) => line.setStyle(edgeStyle));
    markersRef.current.forEach(({ marker, pin }) => {
      if (!pin) return;
      marker.setStyle(
        pin.type === 'waypoint' ? wpStyle : destStyles[pin.category] ?? destStyles.building,
      );
    });
    routeCasingRef.current?.setStyle(
      satellite ? satelliteStrokeStyle() : routeCasingStyle(),
    );
    routeLineRef.current?.setStyle(routeLineStyle());

    tileThemeRef.current = theme;
    basemapRef.current = basemap;
  }, [theme, basemap]);

  // Keep the latest route + follow flag readable from the geolocation callback.


  const clearRouteLayers = () => {
    if (!mapInstance.current) return;
    if (routeLineRef.current) {
      mapInstance.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }
    if (routeCasingRef.current) {
      mapInstance.current.removeLayer(routeCasingRef.current);
      routeCasingRef.current = null;
    }
  };

  const drawRoute = (startId, endId, posOverride) => {
    if (!mapInstance.current) return;
    clearRouteLayers();
    setRoute(null);
    setRouteError('');

    // Not an error — the student has only filled in one end of the trip yet.
    if (!startId || !endId) return;

    if (startId === endId) {
      setRouteError('Pick two different places — that start and destination are the same.');
      return;
    }

    // Routing from the live GPS fix rather than a pin the student picked off a
    // list. `posOverride` exists because this is called straight out of the
    // click handler that turns tracking on, before the first fix has landed in
    // React state.
    const live = startId === MY_LOCATION;
    const here = posOverride ?? userPos;
    let result;

    if (live) {
      if (!here) {
        setRouteError('Waiting for your location — allow location access, then try again.');
        return;
      }
      result = routeFromPoint(here, endId, rawPins, rawEdges);
      if (!result) {
        // Deliberately not snapped to the nearest road anyway: a walker this far
        // from anything mapped would be shown a route and a walking time bearing
        // no relation to the walk they actually face.
        setRouteError(
          'You are too far from any mapped path for directions. Move towards a road or walkway and try again.',
        );
        return;
      }
    } else {
      result = buildRoute(startId, endId, rawPins, rawEdges);
      if (!result) {
        // Every destination is reachable in the shipped graph and the prebuild
        // validator enforces it, so this means the data has drifted (a pin added
        // without edges). Say so rather than clearing the route and leaving the
        // student wondering what they did wrong.
        setRouteError(
          `No walking route is mapped between ${getPinName(startId)} and ${getPinName(endId)} yet.`
        );
        return;
      }
    }

    // A live route references two ids the shipped pin list does not contain
    // (the walker, and the point where they join the path), so it carries its
    // own pins and everything downstream has to resolve through those.
    const resolve = routePinById(result);
    const coords = result.path.map((id) => {
      const p = resolve(id);
      return [p.lat, p.lng];
    });

    // White "casing" under the route so it stays visible over any tile.
    const casing = L.polyline(coords, {
      ...routeCasingStyle(),
      weight: 9,
      opacity: 0.9,
    }).addTo(mapInstance.current);

    const line = L.polyline(coords, {
      ...routeLineStyle(),
      weight: 5,
      opacity: 0.95,
    }).addTo(mapInstance.current);
    routeLineRef.current = line;
    routeCasingRef.current = casing;

    mapInstance.current.fitBounds(line.getBounds(), { padding: [40, 40] });
    setRoute(result);
  };

  const clearRoute = () => {
    setFromId('');
    setToId('');
    setSearchQuery('');
    setRouteError('');
    clearRouteLayers();
    setRoute(null);
  };

  // Picking "Use my location" as the start. Tracking is switched on if it is
  // not already, and the route is drawn from the first fix that lands — the
  // startTracking callback passes it straight through, because React state has
  // not caught up by the time this returns.
  const useMyLocationAsStart = () => {
    setFromId(MY_LOCATION);
    setShowFromList(false);
    setSearchQuery('');
    if (userPos) {
      drawRoute(MY_LOCATION, toId, userPos);
      return;
    }
    setRouteError('');
    startTracking((firstFix) => drawRoute(MY_LOCATION, toId, firstFix));
  };

  const selectDestination = (id, field) => {
    const nextFrom = field === 'from' ? id : fromId;
    const nextTo = field === 'to' ? id : toId;
    if (field === 'from') {
      setFromId(id);
      setShowFromList(false);
    } else {
      setToId(id);
      setShowToList(false);
    }
    setSearchQuery('');
    drawRoute(nextFrom, nextTo);
  };

  // Removes the "you are here" dot and its accuracy halo. Shared by stopTracking,
  // the off-campus branch of trackPosition and the unmount cleanup, which each
  // used to carry their own copy of this.
  const clearUserLayer = () => {
    const map = mapInstance.current;
    if (userDotRef.current && map) map.removeLayer(userDotRef.current);
    if (userAccuracyRef.current && map) map.removeLayer(userAccuracyRef.current);
    userDotRef.current = null;
    userAccuracyRef.current = null;
  };

  const updateUserLayer = (pos) => {
    const map = mapInstance.current;
    // `L` is imported at the top of this module; the old `!window.L` half of
    // this guard only happened to hold because Leaflet's UMD build assigns the
    // global as a side effect, and would have silently disabled the whole
    // location layer the day that stopped being true.
    if (!map) return;

    if (!userDotRef.current) {
      userDotRef.current = L.circleMarker([pos.lat, pos.lng], {
        radius: 8,
        color: '#ffffff',
        weight: 3,
        fillColor: '#1d7dd6',
        fillOpacity: 1,
      }).addTo(map);
      userAccuracyRef.current = L.circle([pos.lat, pos.lng], {
        radius: pos.accuracy || 30,
        color: '#1d7dd6',
        weight: 1,
        fillColor: '#1d7dd6',
        fillOpacity: 0.12,
      }).addTo(map);
    } else {
      userDotRef.current.setLatLng([pos.lat, pos.lng]);
      userAccuracyRef.current.setLatLng([pos.lat, pos.lng]);
      userAccuracyRef.current.setRadius(pos.accuracy || 30);
    }

    if (followRef.current) {
      map.panTo([pos.lat, pos.lng], { animate: true });
    }
  };

  const trackPosition = (coords) => {
    const pos = safeGeoPoint(coords);
    if (!pos) return;

    // safeGeoPoint only proves the fix is numeric. A fix from outside campus is
    // well-formed and still useless here: the dot lands off the map, panTo
    // fights maxBounds, and routeProgress measures against a graph the walker
    // is nowhere near. Keep tracking on, but say why nothing is being drawn.
    if (!isWithinBounds(pos.lat, pos.lng, MAP_BOUNDS, OFF_CAMPUS_MARGIN)) {
      setGeoError('You appear to be off campus, so your position is not being shown on the map.');
      setUserPos(null);
      clearUserLayer();
      return;
    }

    setGeoError('');
    const accuracy = pos.accuracy ?? 30;
    const fix = { lat: pos.lat, lng: pos.lng, accuracy };
    setUserPos(fix);
    updateUserLayer(fix);

    // Deliberately fired only for a fix that passed the on-campus check above:
    // routing from a rejected reading would draw a route from another town.
    if (firstFixRef.current) {
      const fn = firstFixRef.current;
      firstFixRef.current = null;
      fn(fix);
    }
  };

  // `onFirstFix` fires once, on the next usable position. "Use my location"
  // needs it because the fix arrives asynchronously and React state has not
  // updated by the time the click handler returns — without it, the first tap
  // reliably did nothing and the second one worked.
  const startTracking = (onFirstFix) => {
    if (typeof onFirstFix === 'function') firstFixRef.current = onFirstFix;
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not available in this browser.');
      return;
    }
    // Never start a second watch over the top of a live one. The error callback
    // below deliberately leaves the watch running (a GPS timeout is transient
    // and the browser keeps retrying), so `tracking` being false does not mean
    // there is no watch — and overwriting the id would strand the old watcher
    // permanently, burning battery for the life of the tab.
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setGeoError('');
    setTracking(true);
    setFollow(true);
    followRef.current = true;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => trackPosition(pos.coords),
      (err) => {
        setGeoError(err.message);
        setUserPos(null);
        // PERMISSION_DENIED (1) is final — no later fix can arrive, so release
        // the watch and drop out of tracking mode. A timeout or a temporarily
        // unavailable position is not: leave the watch in place so the browser
        // can recover on its own once a fix lands.
        if (err.code === err.PERMISSION_DENIED) {
          stopTracking();
        }
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    firstFixRef.current = null;
    setTracking(false);
    setUserPos(null);
    clearUserLayer();
  };

  const toggleTracking = () => {
    if (tracking) stopTracking();
    else startTracking();
  };

  const toggleFollow = () => {
    const next = !follow;
    setFollow(next);
    followRef.current = next;
    if (next && userPos && mapInstance.current) {
      mapInstance.current.panTo([userPos.lat, userPos.lng]);
    }
  };

  // Tapping a pin and asking for directions — the core interaction of the map.
  //
  // A function declaration, not a const arrow: it is referenced by the effect
  // above, and everything it calls (drawRoute, startTracking) is defined below.
  // Hoisting is what lets the wiring read top-down without the handler having to
  // be split away from the code it belongs next to.
  function handleDirectionsTo(id) {
    setToId(id);
    mapInstance.current?.closePopup();
    // Already tracking, or already have a start: go straight to a route. The
    // live position is the better default when it is available, since the pin
    // the student tapped is where they want to END up.
    if (userPos) {
      setFromId(MY_LOCATION);
      drawRoute(MY_LOCATION, id, userPos);
    } else if (fromId && fromId !== id) {
      drawRoute(fromId, id);
    } else {
      setFromId(MY_LOCATION);
      setRouteError('');
      startTracking((firstFix) => drawRoute(MY_LOCATION, id, firstFix));
    }
  }

  // Keeps the latest route, follow flag and popup handler reachable from
  // callbacks that were registered once — the geolocation watcher and the
  // marker popups, both created at mount. No dependency array on purpose: these
  // must track every render, and assigning a ref during render is not allowed.
  useEffect(() => {
    routeRef.current = route;
    followRef.current = follow;
    directionsRef.current = handleDirectionsTo;
  });


  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-0 relative">
      {/* Sidebar */}
      <div className="w-full lg:w-96 xl:w-[26rem] bg-paper border-b lg:border-b-0 lg:border-r border-coffee-200 overflow-y-auto flex-shrink-0 order-2 lg:order-1">
        <div className="p-4 space-y-4">
          {/* Directions planner */}
          <div className="bg-cream border border-coffee-200 rounded-xl p-4">
            <h2 className="font-display font-bold text-ink text-sm mb-3 flex items-center gap-2">
              <Navigation size={16} className="text-ember-500" />
              Search for a place
            </h2>

            {/* From */}
            <div className="relative mb-3">
              <label className="text-xs font-medium text-coffee-600 mb-1 block">From</label>
              <button
                onClick={() => {
                  setShowFromList(!showFromList);
                  setShowToList(false);
                  setSearchQuery('');
                }}
                className="w-full text-left px-3 py-2.5 text-sm border border-coffee-300 rounded-lg bg-cream hover:border-coffee-400 transition-colors flex items-center justify-between"
              >
                <span className={fromId ? 'text-ink' : 'text-coffee-400'}>
                  {fromId ? getPinName(fromId) : 'Where are you starting?'}
                </span>
                <ChevronDown size={14} className="text-coffee-400" />
              </button>
              {showFromList && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-cream border border-coffee-200 rounded-lg shadow-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-coffee-200">
                    <Search size={14} className="text-coffee-400 flex-shrink-0" />
                    <input
                      autoFocus
                      maxLength={80}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search campus locations…"
                      aria-label="Search starting location"
                      className="w-full bg-transparent text-sm text-ink placeholder:text-coffee-400 outline-none"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {/* First, and always offered: the campus is 2.2 km end to
                        end, and asking someone standing in the sun to identify
                        their own position on a list of 35 buildings — 33 of them
                        still called "Unnamed building N" — is the worst thing
                        this map used to do. Hidden while searching, since it is
                        not a search result. */}
                    {!searchQuery.trim() && (
                      <button
                        onClick={useMyLocationAsStart}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-paper transition-colors flex items-center gap-2 border-b border-coffee-200 font-medium text-ink"
                      >
                        <Crosshair size={13} className="text-ember-500 flex-shrink-0" />
                        Use my location
                      </button>
                    )}
                    {/* Exclude whatever is already the destination, mirroring the
                        To list below — otherwise picking it here builds a
                        start === end route that can only be refused. */}
                    {filteredDestinations
                      .filter((d) => d.id !== toId)
                      .map((d) => (
                      <button
                        key={d.id}
                        onClick={() => selectDestination(d.id, 'from')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-paper transition-colors flex items-center gap-2"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor(CATEGORIES[d.category]?.color) }}
                        />
                        {d.name}
                      </button>
                    ))}
                    {filteredDestinations.filter((d) => d.id !== toId).length === 0 && (
                      <p className="px-3 py-2 text-sm text-coffee-400 italic">No matches</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* To */}
            <div className="relative mb-3">
              <label className="text-xs font-medium text-coffee-600 mb-1 block">To</label>
              <button
                onClick={() => {
                  setShowToList(!showToList);
                  setShowFromList(false);
                  setSearchQuery('');
                }}
                className="w-full text-left px-3 py-2.5 text-sm border border-coffee-300 rounded-lg bg-cream hover:border-coffee-400 transition-colors flex items-center justify-between"
              >
                <span className={toId ? 'text-ink' : 'text-coffee-400'}>
                  {toId ? getPinName(toId) : 'Where do you want to go?'}
                </span>
                <ChevronDown size={14} className="text-coffee-400" />
              </button>
              {showToList && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-cream border border-coffee-200 rounded-lg shadow-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-coffee-200">
                    <Search size={14} className="text-coffee-400 flex-shrink-0" />
                    <input
                      autoFocus
                      maxLength={80}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destinations…"
                      aria-label="Search destination"
                      className="w-full bg-transparent text-sm text-ink placeholder:text-coffee-400 outline-none"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredDestinations
                      .filter((d) => d.id !== fromId)
                      .map((d) => (
                        <button
                          key={d.id}
                          onClick={() => selectDestination(d.id, 'to')}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-paper transition-colors flex items-center gap-2"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: categoryColor(CATEGORIES[d.category]?.color) }}
                          />
                          {d.name}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Swap + Clear */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  drawRoute(toId, fromId);
                  setFromId(toId);
                  setToId(fromId);
                }}
                disabled={!fromId || !toId}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-coffee-600 border border-coffee-300 rounded-lg hover:bg-paper disabled:opacity-40"
              >
                <RotateCcw size={12} />
                Swap
              </button>
              <button
                onClick={clearRoute}
                disabled={!fromId && !toId}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-coffee-600 border border-coffee-300 rounded-lg hover:bg-paper disabled:opacity-40"
              >
                <X size={12} />
                Clear
              </button>
            </div>

            {routeError && (
              <p role="alert" className="mt-3 rounded-lg bg-rust/10 px-3 py-2 text-xs text-rust">
                {routeError}
              </p>
            )}

            {/* Lives here, not inside the route panel: a location failure is
                worth reporting whether or not a route happens to be active,
                and it used to be invisible until one was. */}
            {geoError && (
              <p role="alert" className="mt-3 rounded-lg bg-rust/10 px-3 py-2 text-xs text-rust">
                {geoError}
              </p>
            )}
          </div>

          {/* Route summary + steps */}
          {route && (
            <div className="bg-cream border border-ember-500/40 rounded-xl">
              <div className="p-4 border-b border-coffee-200">
                <div className="flex items-center gap-2 text-sm text-ink font-medium mb-2">
                  <span className="truncate">{route.from}</span>
                  <ArrowRight size={14} className="text-ember-500 flex-shrink-0" />
                  <span className="truncate">{route.to}</span>
                </div>
                <div className="text-xs text-coffee-600 space-y-0.5">
                  <p>
                    <span className="font-medium text-ink">{formatDistance(route.distance)}</span>
                    {' '}&middot; {formatTime(route.distance)} &middot; arrive {etaAt(route.distance)}
                  </p>

                  {/* The mapped walk is far longer than the direct line, which
                      on this campus almost always means a real shortcut exists
                      that nobody has surveyed yet — OSM has the roads here and
                      not one footpath. Saying so is the difference between a map
                      that is wrong and a map that knows what it does not know. */}
                  {route.detour >= DETOUR_WARN_RATIO && route.direct >= DETOUR_WARN_MIN_M && (
                    <p className="mt-1 rounded-lg bg-coffee-100 px-2.5 py-2 text-[11px] text-coffee-700 leading-relaxed">
                      <span className="font-semibold text-ink">
                        {route.to} is only {formatDistance(route.direct)} away in a straight line.
                      </span>{' '}
                      This route follows the paths we have mapped, which go the long way round.
                      There is probably a shortcut that has not been surveyed yet — trust what you
                      can see on the ground.
                    </p>
                  )}

                  {progress ? (
                    <div className={`mt-1 rounded-lg px-2.5 py-2 text-xs ${progress.arrived ? 'bg-moss/15 text-moss' : progress.offRoute ? 'bg-rust/15 text-rust' : 'bg-paper'}`}>
                      {progress.arrived ? (
                        <p className="font-semibold">You have arrived at {route.to}.</p>
                      ) : progress.offRoute ? (
                        <p>
                          <span className="font-semibold">Off the route.</span> Head back to the nearest path — {formatDistance(progress.nearestDist)} away.
                        </p>
                      ) : (
                        <>
                          <p>
                            <span className="font-semibold text-ink">{formatDistance(progress.remaining)}</span> left &middot; {formatTime(progress.remaining)} &middot; ETA {etaAt(progress.remaining)}
                          </p>
                          {progress.nextStep && (
                            <p className="text-coffee-700 mt-0.5 flex items-start gap-1">
                              <span className="text-ember-500 flex-shrink-0">{'»'}</span>
                              <span>{progress.nextStep.text}</span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-coffee-500">Walking route along marked paths</p>
                  )}
                </div>
              </div>

              {/* Step-by-step directions */}
              <div className="max-h-72 overflow-y-auto p-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-coffee-500 mb-2 flex items-center gap-1.5">
                  <Footprints size={13} />
                  Directions
                </h3>
                <ol className="space-y-2">
                  {route.steps.map((step, i) => {
                    const Icon = TURN_ICONS[step.type] || Navigation;
                    const isLast = i === route.steps.length - 1;
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span
                          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                            isLast ? 'bg-moss/15 text-moss' : step.type === 'start' ? 'bg-ink text-cream' : 'bg-paper text-coffee-600'
                          }`}
                        >
                          <Icon size={14} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-ink font-medium leading-snug">{step.text}</p>
                          {step.distance > 0 && (
                            <p className="text-xs text-coffee-500">{formatDistance(step.distance)}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          )}

          {/* Locations list */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-coffee-500 mb-2">
              All locations ({destinations.length})
            </h3>
            <div className="space-y-1">
              {destinations.map((d) => {
                const cat = CATEGORIES[d.category] || CATEGORIES.building;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      if (mapInstance.current) {
                        // Clamped to the tile source's ceiling. Hard-coding 19
                        // works only by luck on OSM and breaks the moment a layer
                        // with a lower maximum is added — Esri's imagery over
                        // UNIUYO stops at z18 and serves a grey "Map data not yet
                        // available" tile above it, so this button would land the
                        // student on a blank square.
                        mapInstance.current.setView([d.lat, d.lng], Math.min(18, MAX_ZOOM));
                        const entry = markersRef.current.find((m) => m.id === d.id);
                        if (entry) entry.marker.openPopup();
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-ink hover:bg-cream rounded-lg transition-colors flex items-center gap-2.5"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: categoryColor(cat.color) }}
                    />
                    <span className="truncate">{d.name}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wide text-coffee-400 flex-shrink-0">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend + tracking note */}
          <div className="border-t border-coffee-200 pt-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-coffee-500 mb-2">Legend</h3>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-coffee-600">
              {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoryColor(color) }} />
                  {label}
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-coffee-500 leading-relaxed">
              Use{' '}
              <span className="inline-flex items-center gap-1 align-middle">
                <Crosshair size={11} /> Track me
              </span>{' '}
              on the map to follow your live position. With a route active it shows how far is left and your next turn.
            </p>
          </div>
        </div>
      </div>

      {/* Map + floating controls */}
      <div className="relative flex-1 min-h-[50vh] lg:min-h-0 order-1 lg:order-2">
        <div ref={mapRef} className="absolute inset-0" />

        {/* Track / follow controls */}
        <div className="absolute top-3 left-3 z-[1100] flex flex-col gap-2 print:hidden">
          <button
            onClick={toggleTracking}
            aria-label={tracking ? 'Stop location tracking' : 'Track my location'}
            title={tracking ? 'Stop tracking' : 'Track me'}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold shadow-lg ring-1 transition-colors ${
              tracking
                ? 'bg-moss text-cream ring-moss'
                : 'bg-cream text-ink ring-coffee-200 hover:bg-paper'
            }`}
          >
            <Crosshair size={15} className={tracking ? 'animate-pulse' : ''} />
            <span className="hidden sm:inline">{tracking ? 'Stop tracking' : 'Track me'}</span>
          </button>

          {tracking && (
            <button
              onClick={toggleFollow}
              aria-label={follow ? 'Stop following my position' : 'Follow my position'}
              title={follow ? 'Following — tap to stop' : 'Not following — tap to follow'}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold shadow-lg ring-1 transition-colors ${
                follow ? 'bg-ink text-cream ring-coffee-600' : 'bg-cream text-ink ring-coffee-200'
              }`}
            >
              <Navigation2 size={15} />
              <span className="hidden sm:inline">{follow ? 'Following' : 'Follow'}</span>
            </button>
          )}

          {/* Satellite is genuinely useful here: the campus is criss-crossed with
              worn dirt tracks that exist on the ground and in no map, and the
              imagery is the only way to see them. It is also how the missing
              footpaths get traced — Esri's terms explicitly permit tracing. */}
          <button
            onClick={() => setBasemap((b) => (b === 'satellite' ? 'map' : 'satellite'))}
            aria-pressed={basemap === 'satellite'}
            aria-label={basemap === 'satellite' ? 'Switch to street map' : 'Switch to satellite view'}
            title={basemap === 'satellite' ? 'Street map' : 'Satellite'}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold shadow-lg ring-1 transition-colors ${
              basemap === 'satellite'
                ? 'bg-ink text-cream ring-coffee-600'
                : 'bg-cream text-ink ring-coffee-200 hover:bg-paper'
            }`}
          >
            <Layers size={15} />
            <span className="hidden sm:inline">
              {basemap === 'satellite' ? 'Street map' : 'Satellite'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile bottom route/status bar */}
      {route && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-cream border-t border-coffee-200 px-4 py-3 z-30 print:hidden">
          {progress ? (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-ink truncate">
                  {progress.arrived
                    ? `Arrived at ${route.to}`
                    : progress.offRoute
                      ? `Off route — ${formatDistance(progress.nearestDist)} from path`
                      : progress.nextStep?.text}
                </p>
                {!progress.arrived && !progress.offRoute && (
                  <p className="text-[11px] text-coffee-500">
                    {formatDistance(progress.remaining)} left &middot; ETA {etaAt(progress.remaining)}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 text-xs text-coffee-600">
                {route.from} <ArrowRight size={11} className="inline text-ember-500" /> {route.to}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm min-w-0">
                <span className="font-medium text-ink truncate max-w-[110px]">{route.from}</span>
                <ArrowRight size={14} className="text-ember-500 flex-shrink-0" />
                <span className="font-medium text-ink truncate max-w-[110px]">{route.to}</span>
              </div>
              <div className="text-xs text-coffee-600 flex-shrink-0 ml-2">
                {formatDistance(route.distance)} &middot; {formatTime(route.distance)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}