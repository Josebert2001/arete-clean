# Campus Map — Prototype Hand-off

> Status: **working prototype** · Route: `/campus-map` · Built into the Areté app for University of Uyo

## 1. What this is

A campus-only navigation map that works like Google Maps — but it only knows the
University of Uyo campus, and it only walks (no driving). A student can:

- search for any place on campus and pick **From** → **To**,
- get **step-by-step walking directions** ("Head northeast from Main Gate, 140 m → Turn right at Administration Block, 90 m → Arrive at University Library") with total distance, walk time and ETA,
- press **Track me** to see their live GPS position as a moving blue dot,
- press **Follow** to keep the map centred on them while they walk, and
- get live progress against an active route — distance remaining, next turn, arrival detection and "off route" warnings.

It is a **prototype**: the location data is placeholder coordinates hard-coded in
one file (`src/data/campusMap.js`), the GPS needs the production permission fixed
before it works on the deployed site, and the admin-editing, voice and vector-map
upgrades are the next milestones (Section 6).

## 2. Getting it running

```bash
npm install
npm run dev      # http://localhost:5173 → open /campus-map
```

### Configuration

| Variable | Purpose |
|---|---|
| `VITE_CARTO_API_KEY` | Pretty map tiles. Free key at <https://carto.com/basemaps/apikey> (emailed instantly, no account). CARTO watermarks every raster tile request without one; with no key the map **falls back to plain OpenStreetMap tiles** so it never shows the watermark. |

Set it in `.env.local` for local work and in **Vercel → Settings → Environment Variables** before deploying.

### Two production blockers to know about (not fixed yet)

1. **GPS is blocked in production.** `vercel.json` ships `Permissions-Policy: geolocation=()`. On the deployed site "Track me" cannot ask for the location. This line must be relaxed before the tracking feature works outside `localhost`. Confirm the change with whoever owns the CSP.
2. **The coordinates are placeholders.** Pins sit at fake positions around `5.65°N, 7.93°E`. Before the map can be trusted, someone must walk the real campus and record actual GPS positions (see Section 5, "capture" alternative in Section 6.1).

## 3. How it works (architecture)

```
Browser
 ├─ /campus-map                      src/pages/CampusMapPage.jsx  (full-height wrapper)
 ├─ Floating "Campus Map" launcher   src/components/CampusMapFloatingButton.jsx  (bottom-left, bobbing)
 └─ CampusMap.jsx                    src/components/CampusMap.jsx  (Leaflet map, panels, tracking)
     ├─ src/data/campusMap.js         pins + edges + bounds + category colors  ← EDIT THIS to add places today
     └─ src/utils/campusRoute.js      pure routing math (Dijkstra, bearings, steps, progress)
```

- **Tiles:** Leaflet + CARTO Voyager (light) / Dark Matter (dark), swapped live with the site theme (`useTheme`). Keyless fallback = default OSM tiles. Raster tiles come from `basemaps.cartocdn.com`, already whitelisted in the CSP `img-src`.
- **Graph:** `pins` (20 destinations, searchable) + (20 waypoints, shape-only) + `edges` (47 walkable connections). Distances are computed from coordinates — no hand-measured edge lengths.
- **Routing:** `campusRoute.js` is pure and unit-tested (18 tests in `src/__tests__/campusRoute.test.js`). Dijkstra over the edge graph; haversine weights; turn classification from segment bearings (`turnKind`); segment step generation (`buildRouteSteps`); route assembly (`buildRoute`); live progress (`routeProgress` — nearest node, remaining distance, `arrived` ≤ 25 m, `offRoute` > 70 m from the path).
- **Tracking:** browser `navigator.geolocation.watchPosition`, blue dot + accuracy circle, follow-mode panning, arrival/off-route states.

**Security baseline (landed with the prototype):**
- Marker popups render every name/label through `escapeHtml` (`src/utils/locationSafety.js`) — the only `innerHTML` path in the feature.
- Geolocation from the browser is untrusted client input: coordinates are coerced to finite numbers (`safeGeoPoint`) and malformed fixes are dropped, never drawn.
- `src/utils/locationSafety.js` + its tests are the mandatory validation contract for the future admin editor (duplicate ids, unknown categories, off-campus or non-numeric coords, `<`/`>` in names, unreachable destinations).
- Nothing location-related is stored in `localStorage`, `sessionStorage`, or any backend table; *Track me* coordinates never leave the browser.

Run `npx vitest run src/__tests__/campusRoute.test.js` after touching the routing math, and `npm run lint` / `npm run build` before pushing.

## 4. Data format (today)

```js
// Destination — appears in the search picker
{ id: 'main-gate', name: 'Main Gate', type: 'destination', category: 'entrance', lat: 5.6465, lng: 7.9290 }

// Waypoint — shapes routes only, not searchable
{ id: 'w1', type: 'waypoint', lat: 5.6470, lng: 7.9292 }

// Edge — walkable connection between two pin ids
{ a: 'main-gate', b: 'w1' }

// Categories → palette color keys (theme-aware, never raw hex)
{ building: 'ember', office: 'moss', sports: 'rust', facility: 'coffee-700', entrance: 'ink' }

// Bounds + defaults
CAMPUS_CENTER = [5.6500, 7.9300]  ·  CAMPUS_ZOOM = 17  ·  MAP_BOUNDS = { south, north, west, east }
```

## 5. Adding a location right now (manual, before the admin panel)

Edit `src/data/campusMap.js` (pins + optional edges + bounds):

1. Add the pin: an `id` (kebab-case), `name`, `type: 'destination'`, a `category` from the list above, and real `lat`/`lng`.
2. Connect it: at least one edge `{ a: <newId>, b: <neighbouringId> }`, or it is unreachable and routing to it silently returns no route.
3. If it is outside the current `MAP_BOUNDS`, widen the bounds (and keep a little margin — the map clamps panning).
4. Sanity-check reachability: every destination must be reachable from the graph (there is a test iteration in `campusRoute.test.js` that asserts all pins reach one another from the main gate).

**Recommended capture method:** open the map on a phone, right-click (long-press) the map… better: use any phone GPS app to record a coordinate at each building's front door, then paste the values in. The prototype currently guesses the layout.

## 6. Roadmap — the next milestones

### 6.1 Admin-controlled locations (the big one) — "the admin should be the one who updates the map"

Today only a developer can add locations (edit the JS file + redeploy). The goal: an authenticated **admin** edits the map in the browser — add, rename, move, remove locations and redeploy nothing.

Split responsibilities:

**Database work → Appendix A (for the person with Supabase access).** Tables, the `profiles.is_admin` flag, RLS (everyone reads, only admins write) and granting your first admin account. Do not skip the `is_admin` gate — there is no admin concept in the app yet, so this is where authorization must be born server-side.

**The validation shell the editor MUST use (already built & tested):**
- `src/utils/locationSafety.js` — `validatePin` / `validateEdge` / `validateGraph` are the only sanctioned path for pins/edges entering the map: they reject duplicate ids, unknown categories/types, off-campus or non-finite coordinates, `<`/`>` in names, dangling/self edges and unreachable destinations (reuses the routing engine). 10 tests in `src/__tests__/locationSafety.test.js`.
- Marker popups already render names/labels through `escapeHtml`, so admin-entered names are stored as plain text — no markup needs to survive.

Then the editor itself:

1. **Runtime loading** — a `useCampusLocations()` hook that fetches the two tables at mount, keeps the bundled `campusMap.js` snapshot as seed/offline fallback, and rebuilds the same `pins`/`edges` arrays. `campusRoute.js` and the whole UI work unchanged because they only take arrays.
2. **Admin editor page** (`/admin/campus-map`, behind a server-verified admin check — never a client-side flag) — a map where an admin can:
   - click a spot on the map → "Add location" (name, type, category),
   - drag an existing pin to reposition it (writes new lat/lng),
   - rename / recategorise / delete,
   - click two pins to add an edge, click again to remove it.
3. **Validate before save** — every save goes through `validateGraph`; surface the errors to the admin and reject the write otherwise.
4. **Keep them in sync** — a script to export the database back into `campusMap.js` as the new offline snapshot (like the existing generators in `scripts/`), so the bundle stays self-sufficient.

### 6.2 Voice guidance ("add voice")

Free, no keys, works offline: the browser's **Web Speech Synthesis API** (`window.speechSynthesis` + `new SpeechSynthesisUtterance(text)`).

- Announce on start: *"Directions to University Library. 650 m, about 8 minutes."*
- As the student walks, read `routeProgress.nextStep` + `cumulative`/`remaining` (already computed in `campusRoute.js`): when a turn node is ~30 m ahead, speak *"In 20 metres, turn left at Student Affairs."*
- Arrival: *"You have arrived."* → Off route: *"You have wandered off the route — head back to the nearest path."*
- Build it as a small `useVoiceGuidance(nextStep, remaining)` hook so the map component stays lean; a mute toggle in the tracking UI, and cancel speech on route clear/unmount.

### 6.3 Vector basemaps ("better the map")

Today's tiles are raster PNGs (need the CARTO key, and CARTO is retiring the raster pipeline). **Vector tiles are the upgrade**: sharper at every zoom, retina-native, restyleable at runtime, and the CARTO vector styles do not require the key today.

- Switch the map from Leaflet to **MapLibre GL JS** (`npm i maplibre-gl`), using CARTO's hosted styles:
  - light: `https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json?key=…`
  - dark:  `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json?key=…`
  - Theme swap becomes `map.setStyle(DARK_URL)`.
- Pins/edges become GeoJSON sources + circle/line layers (or GL markers); keep the same `campusRoute.js` engine and the same data files.
- **CSP work** (confirm before changing, same as always): MapLibre needs `connect-src` for `https://*.basemaps.cartocdn.com` (the style JSON + vector tiles via fetch) and a `worker-src` addition for the WebGL worker.
- Keep the Leaflet component as the fallback until the GL version reaches parity — live GPS tracking must keep working during the swap.

### 6.4 Before you can call it production-ready

- [ ] Relax `Permissions-Policy: geolocation=()` in `vercel.json` (approved elsewhere by the CSP owner) so **Track me** works on the deployed site.
- [ ] Real campus GPS coordinates (current pins are placeholders).
- [ ] `VITE_CARTO_API_KEY` set in Vercel environment variables.
- [ ] Keep CARTO + OSM attribution visible (it is the price of the free tile tier).

## 7. File map

| File | Role |
|---|---|
| `src/data/campusMap.js` | Pins, edges, bounds, categories — **the only file edited to update places today** |
| `src/utils/campusRoute.js` | Pure routing: `haversine`, `bearingDeg`, `compassDir`, `turnKind`, `buildAdjacency`, `dijkstra`, `buildRouteSteps(path, pinById)`, `buildRoute(fromId, toId, pins, edges)`, `routeProgress(userPos, route, pinById)` |
| `src/utils/locationSafety.js` | Injection + ingestion safety: `escapeHtml` (popups), `safeGeoPoint`/`toNumber` (untrusted geolocation), `isWithinBounds`, `validatePin`/`validateEdge`/`validateGraph` — the admin editor's mandatory validation shell |
| `src/components/CampusMap.jsx` | The map: pickers, route preview, step list, tracking, follow, mobile status bar |
| `src/components/CampusMapFloatingButton.jsx` | Bottom-left launcher bubble |
| `src/pages/CampusMapPage.jsx` | Page wrapper (full viewport height) |
| `src/App.jsx` | Lazy `/campus-map` route + launcher (hidden on chat pages) |
| `src/components/Navbar.jsx` | "Campus Map" nav link |
| `src/components/FeedbackTab.jsx` | Repositioned so it does not overlap the launcher |
| `src/__tests__/campusRoute.test.js` | 18 tests for the routing math |
| `src/__tests__/locationSafety.test.js` | 10 tests for the escaping/geolocation/validation contract |
| `.env.example` | Documents `VITE_CARTO_API_KEY` |
| `vercel.json` | CSP `img-src` already allows `*.basemaps.cartocdn.com` + `*.tile.openstreetmap.org`; `Permissions-Policy` still blocks geolocation |

Reference prototype: `campus-map-graph.html` (standalone HTML proof-of-concept) · requirements: `campus-map-brief.md`.

## Appendix A — Database setup (for the person with Supabase access)

Apply this in the **Supabase SQL editor** (or as a `supabase/migrations/…_campus_map.sql` file applied by hand — the `supabase/` folder changes are deliberate). End with `NOTIFY pgrst, 'reload schema';` or the API rejects the new objects with PGRST204.

```sql
-- 1) Admin flag on profiles (edit-in-place — the app reads only this)
alter table profiles add column if not exists is_admin boolean not null default false;

-- 2) Location tables
create table if not exists campus_locations (
  id text primary key,            -- kebab-case, e.g. 'new-hall'
  name text not null,             -- ≤ 80 chars, no < or >
  type text not null check (type in ('destination','waypoint')),
  category text not null default 'building',
  lat double precision not null,  -- south of the Equator → negative
  lng double precision not null,
  sort int default 0,             -- optional: order in the picker
  created_at timestamptz default now()
);
create table if not exists campus_edges (
  a text not null references campus_locations(id) on delete cascade,
  b text not null references campus_locations(id) on delete cascade,
  primary key (a, b)
);

-- 3) RLS — everyone reads (the page is public), only admins write
alter table campus_locations enable row level security;
alter table campus_edges enable row level security;

create policy "campus_locations are public to read"
  on campus_locations for select using (true);
create policy "only admins write campus_locations"
  on campus_locations for all
  using (auth.uid() in (select id from profiles where is_admin))
  with check (auth.uid() in (select id from profiles where is_admin));

create policy "campus_edges are public to read"
  on campus_edges for select using (true);
create policy "only admins write campus_edges"
  on campus_edges for all
  using (auth.uid() in (select id from profiles where is_admin))
  with check (auth.uid() in (select id from profiles where is_admin));

grant select on campus_locations, campus_edges to anon, authenticated;
grant insert, update, delete on campus_locations, campus_edges to authenticated;

NOTIFY pgrst, 'reload schema';
```

**Granting an admin account** (find the user first — never trust "dashboard is admin"):
```sql
select id, email from auth.users;
update profiles set is_admin = true where id = '<that user''s uuid>';
```

**Optional seed:** `INSERT` the pins/edges from `src/data/campusMap.js` as the initial rows; the app will prefer the tables when they are present and fall back to the bundled snapshot otherwise.

**Your location-data task (the admin side):** collect **real** coordinates — walk the campus with a phone GPS app and record the front-door position of every building and gate, then insert the rows (SQL) or enter them once the editor exists. Every pin must satisfy `src/utils/locationSafety.js`:
- `id`: 1–40 chars of `a-z`, `0-9`, `-`; unique
- `name`: 1–80 chars, no `<` or `>` (all rendering is escaped, but markup is rejected at the door)
- `type`: `destination` or `waypoint` · `category`: one of `building, office, sports, facility, entrance`
- `lat`/`lng`: finite numbers within `MAP_BOUNDS` ± 0.005° (≈ 550 m) — the map clamps panning to the bounds
- every `destination` must be reachable from `main-gate` (a disconnected pin silently returns no route)

## Appendix B — Operations (keys, quota, tiles) — for whoever runs Vercel/CARTO

- **CARTO key is public-by-design** — it lives in the browser bundle, so it is *not* a secret. The controls are attention and rotation:
  - Set `VITE_CARTO_API_KEY` in **Vercel → Settings → Environment Variables** (never in code).
  - Watch the CARTO basemaps dashboard; alert when monthly usage approaches ~60% of the 5M-tiles/month fair-use cap.
  - Suspected misuse on another site → rotate: get a fresh key at <https://carto.com/basemaps/apikey> and swap the env var; the old key dies immediately.
- **Tile traffic / abuse:** `/campus-map` is public and unauthenticated, so a scripted visitor can force many tile fetches. The browser HTTP cache already absorbs repeats. If volume ever justifies it, add a Vercel-edge tile proxy that re-serves tiles with long `Cache-Control` and hides the key from clients — treat as a performance/ops task, not security-critical.
- **Long-term:** moving to vector basemaps (Section 6.3) removes the raster-key and quota concerns entirely.
- **Geolocation in production:** `vercel.json` ships `Permissions-Policy: geolocation=()` — *Track me* is intentionally disabled live until the CSP owner relaxes that line. Until it is relaxed, coords exist only on `localhost`.