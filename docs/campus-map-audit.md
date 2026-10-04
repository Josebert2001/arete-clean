# Campus Map — Research Audit of `map.md`

> Audited 9 September 2026 against the live prototype (`/campus-map`), OpenStreetMap
> (Overpass, Nominatim), Google Maps, Esri World Imagery and the providers' own terms.
> Every number below was measured, not estimated. Reproduction commands are in
> [Appendix A](#appendix-a-how-to-reproduce-every-number).

---

## 0. Verdict

`map.md` is right about **why** the map should exist and wrong about **almost every fact
it would be built on**. Its central claim — that public maps cannot route a pedestrian
around UNIUYO — is not just true, it is *more* true than the document argues, and I now
have hard numbers for it. But the coordinates it proposes as the fix do not contain the
campus, the satellite layer it specifies would be blocked by our own CSP and would go
grey above zoom 18, and the offline strategy it specifies is explicitly prohibited by the
tile provider we currently depend on.

The good news is larger than the bad. `map.md` implies a hand-survey of the whole campus.
In fact **143 building footprints already exist for free under ODbL**, the pedestrian
paths are clearly traceable from imagery we are *explicitly licensed to trace*, and the
one genuinely irreplaceable asset — the walking graph — is a few days of work, not a term.

**The single highest-leverage change: stop treating this as a mapping problem and treat it
as a data-acquisition problem.** The routing code is already good. The data is fiction.

---

## 1. Blocking factual errors

### 1.1 The prototype's coordinates are ~68 km from campus — and `map.md`'s correction is also wrong

`src/data/campusMap.js` centres the map at `5.6500, 7.9300`. The real permanent site is at
`5.03716, 7.97819` (OSM way [`669841132`](https://www.openstreetmap.org/way/669841132)).
That is **68.3 km north** of campus, in open country outside Uyo. `map.md` catches this.

What `map.md` does not catch is that its own replacement figures are wrong too:

| | `map.md` proposes | Ground truth (OSM campus polygon) | Error |
| :--- | :--- | :--- | :--- |
| Permanent site centroid | `5.0392, 7.9895` | `5.03716, 7.97819` | **1.28 km east** |
| Permanent site bounds | S 5.0320 · N 5.0480 · W 7.9800 · E 7.9990 | S 5.02782 · N 5.04796 · W 7.97207 · E 7.98446 | see below |
| Town campus centroid | `5.0445, 7.9180` | `5.04092, 7.92446` | **0.80 km west** |
| Annex centroid | `5.0420, 7.9220` | *unverified — no OSM polygon* | unknown |

The bounding box is the serious one. The real campus spans longitude **7.97207 → 7.98446**.
`map.md`'s box starts at **7.9800** — that is 880 m *east* of the campus's western edge, so
the proposed box **excludes about two-thirds of the campus by width** while extending
1.6 km east into bush. Its southern edge (5.0320) also cuts off 460 m of frontage — which
is exactly where the Nwaniba Road gate is.

Because `MAP_BOUNDS` drives `maxBounds`, `isWithinBounds()` and the off-campus GPS rejection
in `CampusMap.jsx:438`, shipping those numbers would tell two-thirds of students standing on
campus that they "appear to be off campus."

**Do not hand-type any of these.** Derive them from the OSM polygons and commit the
derivation, not the digits.

### 1.2 The campus profiles are wrong about which faculty sits where

`map.md` §4 lists a fourth campus as *"Basic Medical Sciences Campus (Ibagwa)"*. Published
descriptions of UNIUYO's campus structure name the fourth campus as **Ime Umana Campus,
Ediene Abak**. The faculty allocation is also off: sources place **Arts, Education, Social
Sciences and Pharmacy plus the University Library** at Town, and **Business Administration,
Law and General Studies** at Annex. `map.md` puts Law at Town and Environmental Studies at
Annex.

This matters more than it looks: these strings would become search aliases, deep-link
targets and public page copy. Treat §4 as **unverified** and confirm it against the
Students' Information Handbook — the same source already used for `dataScienceCourses.js`.

### 1.3 Scale: this is not the campus the prototype models

Measured from the OSM polygons:

| | Extent | Area |
| :--- | :--- | :--- |
| Permanent site | **2.24 km** N–S × **1.37 km** E–W | 3.08 km² |
| Town campus | 1.22 km N–S × 0.56 km E–W | 0.68 km² |

The prototype models a compact 1.3 km square with twenty landmarks packed inside it. The
real permanent site is a **low-density sprawl** organised around a single ring road, with
long stretches of open ground between building clusters.

I tested Google's own walking directions across it — from the Nwaniba Road frontage to the
Faculty of Science:

> **2.2 km · 29 min · "via University of Uyo Rd"** — for a straight-line distance of 1.22 km.

That is a **1.8× detour ratio**, and the route hugs the vehicular ring road for its entire
length. This is the empirical proof of `map.md` §1.1, and it reframes the product:

- Journeys here are **10–30 minutes**, not 3. Getting the route wrong costs a real class.
- The cross-campus shortcuts *are the entire product*. On a dense campus a shortcut saves
  90 seconds; here it saves ten minutes.
- `map.md` §9.2's "leave by 9:53" planner integration is **far more valuable** than the
  document credits — it is arguably the killer feature, not a phase-3 nicety.
- **Nobody walks 2.2 km in the sun.** Students take keke. `map.md` never mentions campus
  transport at all. See §4.1.

---

## 2. Architecture problems that would fail in production

### 2.1 The Esri satellite layer would be blocked by our own CSP

`vercel.json` allows exactly two tile hosts in `img-src`:

```
img-src 'self' data: blob: https://*.supabase.co
        https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com;
```

`map.md` §7A specifies `server.arcgisonline.com`. It is not on that list, so **every
satellite tile would be blocked** the moment the feature shipped. `map.md`'s own Appendix B
enumerates the CSP requirements for a *future* MapLibre upgrade but misses the requirement
for the layer it puts in Phase 1.

### 2.2 Esri has no imagery above zoom 18 over UNIUYO — and we request zoom 19

I fetched the campus-core tile at each zoom:

| Zoom | Response |
| :--- | :--- |
| z16 | 9,462 B — real imagery |
| z17 | 7,844 B — real imagery |
| z18 | 6,904 B — real imagery |
| **z19** | **2,521 B — grey placeholder: *"Map data not yet available"*** |
| **z20** | **2,521 B — identical placeholder** |

Meanwhile `CampusMap.jsx` sets `maxZoom` to 19 (OSM) or 20 (CARTO), and the "All locations"
list flies to a building with `setView([d.lat, d.lng], 19)` (`CampusMap.jsx:761`).

So: enable satellite, tap any building in the list, and land on a grey tile reading "Map
data not yet available." A satellite layer **must** carry its own `maxZoom: 18` and the
fly-to zoom must be clamped to the active layer's maximum. This is precisely the class of
bug the existing tile-provider comments (`CampusMap.jsx:41-48`) already document for OSM —
the lesson is in the codebase and `map.md` reintroduces it.

Esri's imagery quality itself is **fine** — I exported the campus core and the ring road,
building roofs and the worn desire-paths across open ground are all clearly legible at
~1 m/px. It is genuinely usable. It just stops at z18 here.

### 2.3 The offline tile strategy is prohibited by the provider we actually use

`map.md` §14.2: *"Service Worker (Workbox) pre-caches all map tiles covering the UNIUYO
bounding boxes down to zoom level 18."*

Two problems, and the second is the real one.

**We are not on CARTO today.** `VITE_CARTO_API_KEY` is not in the documented environment
list in `CLAUDE.md`, and it is referenced in exactly one file. I fetched the campus tile
from CARTO without a key and rendered it — it comes back as a real PNG stamped
**"API KEY REQUIRED — carto.com/basemaps/apikey"** diagonally across the tile. So the code
comment at `CampusMap.jsx:35` is accurate and the live map is running on the **OSM
fallback**.

**The OSM Tile Usage Policy explicitly prohibits exactly what §14.2 specifies.** Bulk
downloading — "the downloading of tiles in advance instead of downloading when a user views
those tiles" — is disallowed, and the policy calls out "download area for offline use"
features by name. Access can be blocked without notice. Esri's terms are no better for this
purpose: World Imagery "is not intended to be used to export tiles for offline use," and
reproduction for commercial purposes is restricted — which also collides with `map.md` §15's
sponsored-pin monetisation.

The tempting part is that the cache is *tiny*:

| Coverage (both campuses) | Tiles | Approx. size |
| :--- | ---: | ---: |
| z13–17 | 106 | ~2.3 MB |
| z13–18 | 302 | ~6.5 MB |
| z13–19 | 1,027 | ~22 MB |

Six megabytes for the whole university. Size was never the obstacle — **the licence is**,
and the small number is exactly why someone will be tempted to do it anyway.

### 2.4 The fix for 2.1–2.3 is one architectural move, not three

Ship the basemap as a **PMTiles archive** instead of proxying a third-party tile server:

1. Protomaps builds the full OSM planet to PMTiles daily. `pmtiles extract` pulls a
   bounding box straight out of the *remote* planet over HTTP range requests —
   `--bbox=MIN_LON,MIN_LAT,MAX_LON,MAX_LAT --maxzoom=18` — downloading only the bytes for
   our region.
2. Commit the resulting file (campus-sized; expect low single-digit MB — **verify before
   committing**) to Supabase Storage or `public/`.
3. Read it in MapLibre GL via the `pmtiles` library's `addProtocol`.

This resolves all three problems at once and collapses two of `map.md`'s roadmap phases:

- **Legal.** ODbL, self-hosted, attribution only. Offline is inherent to the format, not a
  scraping workaround.
- **No key, no quota, no watermark.** Deletes `VITE_CARTO_API_KEY` entirely.
- **Offline by construction.** One static file the service worker may cache freely — it is
  our file.
- **It *is* the MapLibre upgrade.** `map.md` Phase 4's "MapLibre GL vector transition" and
  Phase 3's "offline PWA tile caching" become a single piece of work.
- CSP cost is one `connect-src` entry for wherever the file is hosted (Supabase is
  already allowed) plus `worker-src blob:` — far narrower than whitelisting two tile CDNs.

Keep Esri as an **optional satellite overlay only**, capped at z18, with its host added to
`img-src` and no precaching.

### 2.5 `validateGraph()` never runs

`locationSafety.js` implements a genuine ingestion contract — including a reachability check
that every destination connects to the main gate — and `map.md` §13.3 presents it as an
enforced guarantee. It is referenced by **no build script**. `prebuild` runs
`validate-modules.mjs`, which knows nothing about the map.

Right now the graph is hand-maintained in a JS file, and `drawRoute` has a comment
(`CampusMap.jsx:329`) explaining that an unreachable pin means "the data has drifted." That
drift is preventable at build time for about five lines. Wire `validateGraph()` into
`validate-modules.mjs` **before** the pin count grows from 20 to 150.

### 2.6 Notes on the Supabase schema (§16)

Do not run Appendix A as written.

- **`campus_edges` admits duplicate edges.** The primary key is `(campus_id, a, b)`, so an
  undirected walkway can be inserted twice as `(a,b)` and `(b,a)`. `buildAdjacency` would
  then push the segment twice. Add `check (a < b)` and normalise on write.
- **The grants are broader than the intent.** `grant insert, update, delete on ... to
  authenticated` hands table-level DML to every signed-in student and relies entirely on RLS
  to claw it back. This repo has already learned that lesson the other way: per `CLAUDE.md`,
  `course_materials` had its `authenticated` INSERT grant *removed* precisely so the browser
  could not forge rows, with writes moved to a service-role endpoint. Follow that precedent —
  no DML grant, writes through an API route.
- **No provenance.** For a dataset students will be correcting, `updated_at`, `updated_by`
  and a soft-delete flag are not optional. Add them now; backfilling them later is painful.
- Every migration must end with `NOTIFY pgrst, 'reload schema';` — §16 has this, keep it.

**But the deeper point: none of this is needed yet.** A static JS file is faster, free,
version-controlled, works offline with no fetch, and diffs in code review. Move to Supabase
when a non-technical person needs to edit pins — not before. What *is* needed early is a
**correction inbox** (§4.4), which is a different and much smaller table.

---

## 3. What `map.md` gets right — keep all of this

Genuine credit, because it is a strong document where it is grounded:

- **The graph model is correct.** `destination` vs `waypoint` pins with explicit `edges` is
  exactly the right abstraction for a campus whose walkable network no router indexes.
  Do not replace it with an off-the-shelf routing engine.
- **The routing math is sound and well-tested** — 24 tests on `campusRoute.js`, 10 on
  `locationSafety.js`. The code comments document real bugs already found and fixed (the
  degrees-subtracted-from-radians bearing bug, arrival keyed off proximity rather than
  remaining distance, the `nextIdx` off-by-one). This is the healthiest part of the feature.
- **The privacy contract is right and rare** — GPS never leaves the browser, never touches
  `localStorage`, never reaches a backend table. Keep that absolute, and say so publicly.
- **"Route from my location"** (§5B) is the correct top priority. Two dropdowns is a
  desktop-era interaction; nobody standing in the sun picks their own starting pin.
- **Smart alias search** (§8C) is high value for near-zero cost — `cbt`, `food`, `charge`
  are how students actually talk. One `aliases: []` field on each pin.
- **Academic deep links** (§9) are Areté's unfair advantage. Google will never know that
  COS 221 meets in PTDF Lab A. This is the only part of the map that no one else can build.
- **Exam "Panic Mode"** (§9.3) is the single highest-value seasonal feature in the document.

---

## 4. What `map.md` misses entirely

### 4.1 Campus transport

On a 2.24 km campus in Uyo's climate, "29 min walk" is often the wrong answer — students
take keke napep. The document has no transport pin category, no stops, no "walk or ride?"
comparison. This is the most obvious gap relative to how the campus is actually used, and it
is cheap: a `transport` category, a handful of stop pins, and a line in the route summary.

### 4.2 Surface, lighting and season — three booleans that matter enormously here

The satellite imagery shows the shortcuts are **unpaved desire-paths across open ground**.
That has consequences the document never considers:

- **Accessibility.** No step-free or wheelchair routing anywhere in `map.md`. On this
  terrain that is a real exclusion, and the fix is one `surface` field per edge plus a
  routing weight. Genuinely differentiating; nobody else will do it.
- **Night safety.** Unlit dirt paths at 7pm are a different network from the same paths at
  noon. An `lit` boolean and an "avoid unlit paths after dark" toggle costs almost nothing
  and is the kind of feature students tell each other about.
- **Rainy season.** Uyo gets heavy rainfall; dirt shortcuts flood and disappear for months.
  A `seasonal` flag prevents the map from confidently routing someone into standing water.

Add all three to the edge schema **now**, while the schema is still cheap to change, even if
routing ignores them until later.

### 4.3 Contributing the survey back to OpenStreetMap

Every path surveyed for Areté could be contributed to OSM under ODbL. This costs nothing —
the survey is happening anyway — and returns:

- Google, Apple and every other consumer of OSM data improve for all UNIUYO students,
  including those who never use Areté.
- Permanent institutional credit and an unusually strong "we built the map of UNIUYO" story.
- **Durability.** If Areté stops, the data survives. That is worth more than it sounds.

It also inverts the licensing risk: contributing to OSM is unambiguously safe, whereas a
proprietary campus dataset assembled partly by looking at other people's maps is not.

### 4.4 Crowdsourced correction — the only way 143 buildings get named

See §5.2 for the numbers, but the shape of the problem is: we can get **143 building
footprints free** and **almost none of their names**. Two people cannot name 143 buildings
across two campuses accurately, and the names change as departments move.

The `is_admin`-only RLS in §16 forecloses the only mechanism that scales. What is needed is
a **suggestion queue**: any signed-in student can propose a name, a correction or a missing
path; an admin approves. Small table, `pending | approved | rejected`, admin-only promotion.
This repo already has a review-queue design (`docs/review-queue-design.md`) worth reusing.

### 4.5 The map is invisible to search — and it is already public

`/campus-map` is registered at `App.jsx:240` with **no** `RequireAuth` and no
`PublicOrGated` wrapper. It is fully public. And it appears in **none** of
`public/sitemap.xml`, `public/llms.txt`, or `scripts/prerender.mjs`.

Given the prerendering infrastructure already built for `/`, `/install` and 95 course pages,
this is free. *"University of Uyo campus map"* is a high-intent, high-volume, essentially
uncontested query — and it is a far wider door than any course page, because it reaches
every student in the university rather than two departments. A `CampusMapPreview` component
following the existing `HomePreview` / `InstallPreview` pattern (no hooks, no context, no
react-router) plus a `Place`/`ItemList` JSON-LD block would put it in the index.

Note the constraint from `CLAUDE.md`: **do not add the URL to the sitemap until it renders
something for a signed-out visitor.** Right now it renders an empty `<div id="root">`.

### 4.6 Features to cut or defer, not build

`map.md`'s roadmap is four phases of roughly equal weight. It should not be:

- **Indoor / multi-floor navigation (§6) — cut from the roadmap entirely for now.** It is the
  largest single item in the document and it depends on floor plans that do not exist in any
  digital form. The outdoor problem is completely unsolved; solving 5% of the indoor problem
  while the outdoor map still points 68 km away is the wrong order.
- **Compass auto-rotation (§7B) — defer.** `deviceorientation` needs an explicit
  `requestPermission()` gesture on iOS, is unreliable and uncalibrated on low-end Android,
  and degrades into a jittering map. High jank, low payoff.
- **Multi-campus switcher (§4) — defer.** Both authored catalogues (Cybersecurity, Data
  Science) are permanent-site programmes. Ship **one campus completely** before adding a
  switcher over three empty ones. Foundation-mode students from Town-campus faculties are the
  trigger to revisit.
- **Campus CTF (§12) — defer.** Genuinely good idea, wrong time.
- **Supabase map storage + admin editor (§16) — defer**, per §2.6. Keep the static file.

---

## 5. The data situation — the finding that rewrites the plan

### 5.1 What each provider actually has

Measured today via Overpass over the real campus polygons:

| | Permanent site | Town campus |
| :--- | ---: | ---: |
| Building footprints in OSM | **34** | **109** |
| …of which carry a name | **2** | **1** |
| `highway` ways | 62 | 50 |
| …of which `footway` | **0** | **0** |
| …`path` / `track` | 6 | 0 |
| …vehicular (residential/service/trunk/…) | 56 | 50 |

The two named buildings on the permanent site are *"Y-Building"* and *"Faculty of
Biological science"*. The one on Town campus is *"Uniuyo Girls Hostel (W4)"*.

**There is not a single `highway=footway` on either campus.** `map.md` §1.1 asserts that
public routers only index vehicular roads. For UNIUYO that is not an approximation — it is
literally exact.

Google, by contrast, has **names but no paths**. Sweeping the campus surfaced: Faculty of
Engineering, New Engineering Block, Central Administrative Block, General Library, University
of Uyo Science Block, Faculty of Science, Faculty of Agriculture (Lecturer Offices), 1000
capacity hall, ELF lecture hall, Multipurpose Hall, Convocation Arena, Agricultural
Engineering Lab, Uniuyo Stadium, Uniuyo PG School, CHINEDU ICT HUB, Geoscience, NEEDS Hostel,
Ultra Modern Hostel, Female Presidential Hostel (FPH), Double Gate, and Department of
Computer Science, Statistics and Mathematics.

Two things stand out:

- Google labels its own **Computer Science department pin "The location shown is not
  precise."** Its best guess decodes to `5.04171, 7.97845`.
- **There is no Cybersecurity department pin on either service.** Areté's own department —
  the one whose students are the entire current user base — does not exist on any public map.

### 5.2 What this means for the work plan

`map.md` implies surveying the campus from nothing. The real division of labour is:

| Asset | Source | Cost |
| :--- | :--- | :--- |
| 143 building footprints | **OSM, ODbL** — import directly | free |
| Vehicular road network | **OSM, ODbL** — the ring road spine | free |
| ~20 building names | Google as a *checklist of what exists* | free, but see below |
| **Pedestrian graph** | **Trace from imagery, then ground-truth** | **the actual work** |
| Room-level detail | Students | ongoing |

**One licensing point to be precise about.** Esri **explicitly grants** the right to use
World Imagery "to trace features and validate edits in the creation of vector data" — that
is exactly our use case, and it is why we should trace from Esri even though Google's
imagery over UNIUYO is visibly sharper. Google grants no such right. Use Google Maps as a
*research tool* to learn which buildings exist and what they are called — building names are
facts and facts are not copyrightable — but **record every coordinate from Esri tracing or
from our own GPS survey, never by copying Google's positions.** Keep the provenance clean and
the OSM contribution in §4.3 stays unambiguously safe.

---

## 6. Recommended plan

Reordered around the finding that data, not features, is the bottleneck.

### Phase 0 — Ground truth (do this before any feature work)

Nothing else is worth building on the current numbers.

1. Fetch the two OSM campus polygons and derive `CAMPUS_CENTER` / `MAP_BOUNDS` from them.
   Commit the derivation script, not just the digits.
2. Import the 143 building footprints from OSM; attribute ODbL in the map credits.
3. Wire `validateGraph()` into `scripts/validate-modules.mjs` (§2.5).
4. Decide the basemap architecture — PMTiles (§2.4) — before writing more Leaflet raster code.
5. Verify §4's campus/faculty allocation against the Students' Information Handbook (§1.2).

### Phase 1 — The pedestrian graph (this is the product)

1. Trace the walkable network from Esri imagery: the ring road, the paved spurs, and the
   worn desire-paths across open ground. These are clearly visible.
2. Name the buildings — Google's list as the hypothesis, a student on the ground as the
   verification. Start with the buildings Areté's own students use.
3. Ground-truth walk with the existing `campus-map-graph.html` tool. Correct what the
   imagery got wrong; imagery is out of date somewhere, always.
4. Add `surface`, `lit`, `seasonal` and `accessible` to the edge schema now (§4.2), even if
   routing ignores them initially.
5. Contribute the paths back to OSM (§4.3).

### Phase 2 — Make it usable on a phone

1. "Route from my location" — nearest-node injection (§5B). Top priority.
2. Bottom sheet + 1-tap "Directions to here" (§8A/8B).
3. Alias search (§8C).
4. Snap-to-path and GPS smoothing (§5C) — but simpler than specced; get the graph right first,
   since snapping to a wrong path is worse than not snapping.
5. Keke stops and a walk-or-ride comparison (§4.1).

### Phase 3 — The unfair advantage

1. Course Hub and Planner deep links (§9.1, §9.2) — *"CYB 201, 10:00, ETF Hall B, 7 min walk,
   leave by 9:53."*
2. Exam Panic Mode (§9.3).
3. Correction inbox (§4.4).
4. Prerender `/campus-map` for search (§4.5).
5. Offline via the PMTiles file already shipped in Phase 0.

### Phase 4 — Later, honestly

Saved favourites; voice guidance; satellite overlay (capped z18, CSP updated); admin editor.
**Indoor navigation and the multi-campus switcher are not on this roadmap** until the
permanent site is genuinely finished.

---

## 7. Immediate next actions

Ranked by value per hour, all small:

1. **Fix `MAP_BOUNDS` and `CAMPUS_CENTER`** from the OSM polygons — one file, removes the
   68 km error and the "you appear to be off campus" bug in one edit.
2. **Wire `validateGraph()` into the prebuild** — five lines, prevents an entire bug class
   before the pin count grows sevenfold.
3. **Add `aliases: []` to the pin schema** — free now, painful to retrofit across 150 pins.
4. **Delete `VITE_CARTO_API_KEY`** or set it. Today it is dead config and the map silently
   serves OSM tiles under a policy that forbids the offline plan.
5. **Import the OSM footprints** — 143 buildings, one Overpass query, transforms how the map
   looks before a single path is traced.

---

## Appendix A — How to reproduce every number

```bash
# Campus polygons and their true bounding boxes
curl 'https://nominatim.openstreetmap.org/search?q=University+of+Uyo&format=json&limit=10'

# Building / footpath census (permanent site bbox from the query above)
curl -X POST -d '[out:json][timeout:120];
  way["building"](5.0278,7.9720,5.0480,7.9845); out count;' \
  https://overpass-api.de/api/interpreter

curl -X POST -d '[out:json][timeout:120];
  way["highway"](5.0278,7.9720,5.0480,7.9845); out tags;' \
  https://overpass-api.de/api/interpreter | grep -o '"highway": "[a-z_]*"' | sort | uniq -c

# Google's own walking route across campus: 2.2 km / 29 min
# https://www.google.com/maps/dir/5.0295,7.9770/5.0403,7.9791/data=!4m2!4m1!3e2

# Esri zoom ceiling over campus — z19 and z20 return an identical 2,521-byte placeholder
for z in 16 17 18 19 20; do
  curl -s -o /dev/null -w "z$z %{size_download}B\n" \
   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/..."
done

# CARTO without a key returns a tile stamped "API KEY REQUIRED"
curl -o t.png 'https://a.basemaps.cartocdn.com/rastertiles/voyager/16/34220/31852.png'
```

## Appendix B — Sources

- [OSM way 669841132 — permanent site](https://www.openstreetmap.org/way/669841132) ·
  [way 669841130 — town campus](https://www.openstreetmap.org/way/669841130)
- [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/) — bulk
  download / offline prohibition
- [Esri World Imagery — permitted uses](https://www.arcgis.com/home/item.html?id=8e90a00a0a6845a49262e0b756f57a10)
  (tracing rights) · [Esri web service terms](https://www.esri.com/en-us/legal/terms/web-site-service)
- [Protomaps `pmtiles extract` docs](https://docs.protomaps.com/pmtiles/cli) ·
  [PMTiles for MapLibre](https://docs.protomaps.com/pmtiles/maplibre)
- [University of Uyo — Wikipedia](https://en.wikipedia.org/wiki/University_of_Uyo)
