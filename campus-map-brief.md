# Project brief: Interactive campus map

## Goal
Add an interactive map to our school website that pinpoints key locations
around campus (buildings, entrances, offices, sports facilities, etc.) and
gives walking directions between them — like Google Maps, but scoped to our
campus and showing our own locations instead of whatever Google has on file.

I have a working prototype (attached: `campus-map-outdoor.html`) that
already demonstrates the approach. Please use it as the reference
implementation and integrate the same functionality into our actual site.

## Tech approach (from the prototype)
- **Map base layer:** Leaflet.js with OpenStreetMap tiles. No API key or
  billing required. (See "Map tile provider" section below for the Google
  tiles alternative.)
- **Routing must NOT use a public routing API (e.g. OSRM/Google
  Directions).** Those only know about roads and paths already mapped in
  their own data, which almost never includes our internal campus
  walkways, courtyards, and shortcuts — this produces routes that cut
  through buildings or send people out to the street and back in. Instead:
- **Custom walkable path graph:** every campus location is one of two pin
  types:
  - `destination` — a named place people search for (a building, office,
    entrance). Shows up in the location picker.
  - `waypoint` — an unnamed point marking where a walkable path bends,
    forks, or crosses another path. Not shown in the picker, exists only
    to shape the route.
  Pins are connected by edges (an edge = "you can walk directly between
  these two pins"). Routing runs Dijkstra's algorithm over this graph, so
  a route can only ever follow paths we've explicitly marked — never a
  straight line through a building or lawn.
- **Distance/weight** for each edge is the real-world (haversine) distance
  between its two pins' coordinates.
- **Bounding:** the map should be restricted to roughly our campus's
  geographic area so it doesn't invite panning/zooming out to the rest of
  the city.

## Functional requirements
1. Display a map centered on our campus at a reasonable default zoom.
2. Show a marker for every campus location, each labeled with its name.
3. Clicking/tapping a marker shows its name (and optionally a short
   description or category, e.g. "Building," "Sports facility," "Office").
4. A location picker (search box or two dropdowns — "From" / "To") lets a
   visitor select a start and end point.
5. On request, draw a walking route between the two selected points and
   show the estimated distance/time.
6. Mobile-responsive — most students will use this on their phones.
7. Map should be embeddable on an existing page of our site (not a
   full separate app), ideally as a self-contained component.

## Data
Location data should live in a simple structured format we can edit
without touching code — a JSON file or a small database table is fine.
There are two pin types, both sharing the same shape:
```json
{ "id": "gym", "name": "Gym", "type": "destination", "category": "Sports", "lat": 6.5241, "lng": 3.3799 }
{ "id": "wp12", "name": "Path point", "type": "waypoint", "lat": 6.5243, "lng": 3.3795 }
```
Plus a separate list of edges — which pins are directly walkable from
which:
```json
{ "a": "wp12", "b": "gym" }
```
Please build the map to load pins and edges from this data rather than
hardcoding locations, so I can update it myself later without needing a
developer.

## How I'll supply location data
I'm using the attached prototype (`campus-map-graph.html`) to collect
this myself by walking the campus: dropping a waypoint pin everywhere a
path bends or forks, a destination pin at each named place, and linking
them into a connected graph as I go. I'll hand off the resulting pin +
edge list (or the JSON file directly, once the format above is set up).

## Additional requirements

**Indoor / floor-level maps**
- Once a building marker is selected, allow drilling into that building's
  floor plan(s) with individually pinned rooms (classrooms, offices,
  restrooms, etc.).
- Support multiple floors per building, with a floor switcher.
- Routing should work both outdoors (building to building) and indoors
  (room to room within a building), and ideally end-to-end (e.g. "Room 101
  in Building A" to "Room 210 in Building B" — outdoor route between
  buildings, then indoor route to the final room).
- I have a second prototype (`campus-map-prototype.html`, attached)
  demonstrating indoor pin placement and hallway-graph routing on a
  custom floor plan — use it as the reference for this part.

**User accounts and saved favorites**
- Visitors should be able to sign in and save frequently used locations
  or routes (e.g. a student saving their daily class schedule's
  locations).
- Needs basic auth (email/password or a simple SSO option — Google
  sign-in is a natural fit given the mapping stack) and a small backend
  or database to store each user's saved items.
- Favorites should be quick to access from the main map view (e.g. a
  "Saved" list/tab).

**Turn-by-turn voice navigation**
- When a route is generated, allow the visitor to opt into spoken
  directions as they walk (using the browser's built-in text-to-speech —
  no paid service needed).
- Should speak each step from the route's direction list (e.g. "Turn left
  near the Library") rather than requiring a separate script — reuse the
  same step data that's already generated for the on-screen directions.
- Needs a mute/stop control, obviously.

## Map tile provider — decision needed before starting
Two options, please confirm which before building:

1. **OpenStreetMap tiles (via Leaflet)** — no API key, no billing, works
   immediately. This is what both prototypes currently use. Visual style
   is a bit more utilitarian than Google's.
2. **Google's exact tile styling** — requires a Google Cloud account with
   billing enabled and a Maps JavaScript API key ($200/month free credit,
   then usage-based charges). Can be done either via the native Google
   Maps JS API, or by keeping the existing Leaflet codebase and adding
   the `leaflet.gridlayer.googlemutant` plugin to render Google's tiles
   inside it (this avoids rewriting the markers/routing code).

My default preference is to start with OpenStreetMap to avoid blocking on
API key setup, and treat switching to Google's tiles as a later swap if
we decide it's worth it. Let me know if that works or if you'd rather set
up the Google API key up front.

## Out of scope for this phase
- Turn-by-turn *driving* navigation (this is a walking-only campus map).
- Multi-language support.

## Deliverable
A working map component integrated into [PAGE URL / section of the site],
loading location data from an editable file, matching the functionality
in the attached prototype. Please flag any changes you'd recommend to the
approach (e.g. if Google Maps' API is preferred over OpenStreetMap for
branding reasons) before building, since that changes setup requirements
(API key + billing).

## Reference files
- `campus-map-graph.html` (attached) — the primary reference. Working
  prototype demonstrating waypoint vs. destination pins, GPS-based pin
  placement, manual/automatic path linking, and Dijkstra routing over the
  resulting custom graph, all on real map tiles.
- `campus-map-prototype.html` (attached) — reference for phase-2 indoor
  routing (floor plans, room-level graph on a custom image instead of
  GPS).
