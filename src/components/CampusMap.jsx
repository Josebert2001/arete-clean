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
} from 'lucide-react';
import { pins as rawPins, edges as rawEdges, CAMPUS_CENTER, CAMPUS_ZOOM, MAP_BOUNDS, CATEGORIES, categoryColor } from '../data/campusMap';
import { buildRoute, routeProgress } from '../utils/campusRoute';
import { escapeHtml, safeGeoPoint } from '../utils/locationSafety';

const WALK_SPEED = 80; // meters per minute

const CARTO_KEY = import.meta.env.VITE_CARTO_API_KEY?.trim();

// CARTO's raster basemaps watermark every request without a key. With a key we
// get the pretty Voyager / Dark Matter tiles; without one we fall back to the
// plain default OSM tiles so the map is never covered in "API key required".
const TILE_URLS = CARTO_KEY
  ? {
      light: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`,
      dark: `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`,
    }
  : {
      light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      dark: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    };
const TILE_ATTRIBUTION = CARTO_KEY
  ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  : '&copy; OpenStreetMap contributors';

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
  const themeRef = useRef(theme);
  const markersRef = useRef([]);
  const edgeLinesRef = useRef([]);
  const routeLineRef = useRef(null);
  const routeCasingRef = useRef(null);
  const userDotRef = useRef(null);
  const userAccuracyRef = useRef(null);
  const watchIdRef = useRef(null);
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

  const pinById = (id) => rawPins.find((p) => p.id === id);

  const destinations = useMemo(
    () => rawPins.filter((p) => p.type === 'destination'),
    []
  );

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return destinations;
    return destinations.filter((d) => d.name.toLowerCase().includes(q));
  }, [destinations, searchQuery]);

  const progress = route && userPos ? routeProgress(userPos, route, pinById) : null;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: CAMPUS_CENTER,
      zoom: CAMPUS_ZOOM,
      maxZoom: 20,
      minZoom: 15,
      maxBounds: [
        [MAP_BOUNDS.south - 0.002, MAP_BOUNDS.west - 0.002],
        [MAP_BOUNDS.north + 0.002, MAP_BOUNDS.east + 0.002],
      ],
      maxBoundsViscosity: 1.0,
      zoomControl: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    const tileLayer = L.tileLayer(TILE_URLS[themeRef.current], {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 20,
      subdomains: 'abcd',
      detectRetina: true,
    }).addTo(map);
    tileLayerRef.current = tileLayer;
    tileThemeRef.current = themeRef.current;

    // Render edge lines
    rawEdges.forEach((e) => {
      const pa = rawPins.find((p) => p.id === e.a);
      const pb = rawPins.find((p) => p.id === e.b);
      if (pa && pb) {
        const line = L.polyline(
          [
            [pa.lat, pa.lng],
            [pb.lat, pb.lng],
          ],
          { color: 'rgb(var(--coffee-400))', weight: 1.5, dashArray: '3 6', opacity: 0.45 }
        ).addTo(map);
        edgeLinesRef.current.push(line);
      }
    });

    // Render pins
    rawPins.forEach((pin) => {
      if (pin.type === 'waypoint') {
        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 3.5,
          color: 'rgb(var(--paper))',
          fillColor: 'rgb(var(--coffee-500))',
          fillOpacity: 0.8,
          weight: 1.5,
        }).addTo(map);
        markersRef.current.push({ id: pin.id, marker });
      } else {
        const cat = CATEGORIES[pin.category] || CATEGORIES.building;
        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 8,
          color: 'rgb(var(--paper))',
          fillColor: categoryColor(cat.color),
          fillOpacity: 0.95,
          weight: 3,
        }).addTo(map);
        marker.bindPopup(
          `<div style="font-family:Inter,sans-serif">
            <strong style="font-size:14px">${escapeHtml(pin.name)}</strong>
            <br/><span style="font-size:11px;color:rgb(var(--coffee-500))">${escapeHtml(cat.label)}</span>
          </div>`
        );
        markersRef.current.push({ id: pin.id, marker });
      }
    });

    mapInstance.current = map;

    // The map may mount inside a container whose size isn't settled yet
    // (lazy chunk, SSR) — force Leaflet to re-measure after first paint.
    setTimeout(() => map.invalidateSize(), 0);

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (userDotRef.current && mapInstance.current) {
        mapInstance.current.removeLayer(userDotRef.current);
        userDotRef.current = null;
      }
      if (userAccuracyRef.current && mapInstance.current) {
        mapInstance.current.removeLayer(userAccuracyRef.current);
        userAccuracyRef.current = null;
      }
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Swap the tile layer when the site theme changes (the init effect above only
  // pins the initial theme, so one tile set does not bleed into preview).
  useEffect(() => {
    themeRef.current = theme;
    const map = mapInstance.current;
    if (!map || !tileLayerRef.current || tileThemeRef.current === theme) return;
    map.removeLayer(tileLayerRef.current);
    tileLayerRef.current = L.tileLayer(TILE_URLS[theme], {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 20,
      subdomains: 'abcd',
      detectRetina: true,
    }).addTo(map);
    tileThemeRef.current = theme;
  }, [theme]);

  // Keep the latest route + follow flag readable from the geolocation callback.
  useEffect(() => {
    routeRef.current = route;
    followRef.current = follow;
  }, [route, follow]);

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

  const drawRoute = (startId, endId) => {
    if (!mapInstance.current) return;
    clearRouteLayers();
    setRoute(null);

    if (!startId || !endId || startId === endId) return;

    const result = buildRoute(startId, endId, rawPins, rawEdges);
    if (!result) return;

    const coords = result.path.map((id) => {
      const p = pinById(id);
      return [p.lat, p.lng];
    });

    // White "casing" under the route so it stays visible over any tile.
    const casing = L.polyline(coords, {
      color: 'rgb(var(--paper))',
      weight: 9,
      opacity: 0.9,
    }).addTo(mapInstance.current);

    const line = L.polyline(coords, {
      color: 'rgb(var(--ember))',
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
    clearRouteLayers();
    setRoute(null);
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

  const updateUserLayer = (pos) => {
    const map = mapInstance.current;
    if (!map || !window.L) return;

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
    const accuracy = pos.accuracy ?? 30;
    setUserPos({ lat: pos.lat, lng: pos.lng, accuracy });
    updateUserLayer({ lat: pos.lat, lng: pos.lng, accuracy });
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not available in this browser.');
      return;
    }
    setGeoError('');
    setTracking(true);
    setFollow(true);
    followRef.current = true;
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => trackPosition(pos.coords),
      (err) => {
        setGeoError(err.message);
        setTracking(false);
        setUserPos(null);
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 15000 }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTracking(false);
    setUserPos(null);
    if (userDotRef.current && mapInstance.current) {
      mapInstance.current.removeLayer(userDotRef.current);
      userDotRef.current = null;
    }
    if (userAccuracyRef.current && mapInstance.current) {
      mapInstance.current.removeLayer(userAccuracyRef.current);
      userAccuracyRef.current = null;
    }
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

  const getPinName = (id) => pinById(id)?.name || '';

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
                    {filteredDestinations.map((d) => (
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
                    {filteredDestinations.length === 0 && (
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
                  {geoError && (
                    <p className="text-rust mt-1">Tracking stopped: {geoError}</p>
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
                        mapInstance.current.setView([d.lat, d.lng], 19);
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