// Human knowledge about the campus, layered on top of the OpenStreetMap geometry.
//
// OSM gives us 34 accurate building outlines on the permanent site and names
// exactly one of them. Everything a student actually searches for — "Faculty of
// Science", "CBT hall", "the new engineering block" — has to come from someone
// who has walked the campus. That is what this file is for.
//
// It is the ONLY hand-edited half of the map data. scripts/build-campus-graph.mjs
// merges it into src/data/campusGraph.generated.js on every run, keyed by OSM id,
// so regenerating the graph never destroys what people have recorded here.
//
// ── Adding a building name ───────────────────────────────────────────────────
// Find its OSM id (hover the pin on the map — unnamed pins show it), then:
//
//   669840986: {
//     name: 'Y-Building',
//     category: 'academic',
//     aliases: ['y block', 'why building'],
//   },
//
// `id` is optional; it defaults to a slug of the name. Set it explicitly when a
// deep link should be stable (e.g. `/campus-map?to=cbt-centre`), because renaming
// the building would otherwise silently break the link.
//
// ── Aliases matter more than they look ───────────────────────────────────────
// Students do not search "Computer-Based Test Examination Centre". They search
// "cbt". Every alias is matched as a substring, lowercased. Put the slang in.
//
// ── Provenance is not decoration ─────────────────────────────────────────────
// A name recorded here is marked `source: 'survey'` — it means a person confirmed
// it on the ground. Do not add names guessed from another map: a wrong name on a
// confident pin sends someone to the wrong building for an exam, which is worse
// than the map admitting it does not know.

export const overrides = {
  // 669840986 is already named "Y-Building" in OSM; listed here only as the
  // worked example of the shape. Uncomment and extend as buildings are surveyed.
  //
  // 669840986: { name: 'Y-Building', category: 'academic', aliases: ['y block'] },
};

// Pins that are not OSM building footprints: gates, junctions, transport stops,
// open-air landmarks. These carry their own coordinates, so they must be
// surveyed or derived from geometry — never eyeballed off another map.
export const extraPins = [
  {
    // The junction where University of Uyo Road meets Nwaniba Road. Derived from
    // the OSM road geometry (the two ways share this node), not estimated — this
    // is the point every route from off-campus starts at, and validateGraph()
    // uses it as the reachability root, so it has to be exactly right.
    id: 'main-gate',
    name: 'Main Gate (Nwaniba Road)',
    category: 'entrance',
    aliases: ['gate', 'main gate', 'entrance', 'nwaniba'],
    lat: 5.026722,
    lng: 7.9786877,
    source: 'survey',
  },
];

// Categories a pin may carry are the keys of CATEGORIES in src/data/campusMap.js.
// They are deliberately NOT restated here: a second copy of the list is a second
// thing to keep in step, and nothing imported the copy that used to sit at the
// bottom of this file. scripts/validate-modules.mjs already fails the build on a
// pin whose category is missing from CATEGORIES, which is the check that matters.
