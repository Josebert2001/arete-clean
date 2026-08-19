// Pre-generated plain-English rewrites of the lecture notes.
//
// The notes are static authored content, so every heading group produces the
// same rewrite every time. `scripts/pregenerate-simplify.mjs` runs them all once
// and writes the results here; at runtime a student reads them straight from the
// bundle. No API call, no rate limit, no spinner, and it works offline — which
// is what makes the whole-topic "Plain English" toggle usable at all. Doing that
// live would be a dozen sequential requests.
//
// Files are keyed by content hash (hashText of the group's serialised text), so
// an edited note simply misses the map and falls back to the live API rather
// than serving a rewrite of text that no longer exists.
//
// Kept out of index.js on purpose: `import.meta.glob` is a Vite transform, and
// index.js is also imported by Node scripts (validate-modules.mjs), where it
// would be undefined. Nothing in this file may be imported from a Node context.

// Eager: false — one JSON per course, fetched only when a student turns Plain
// English on. The existing `course-data` CacheFirst rule in vite.config.js
// catches them, so a course read once keeps working offline.
const modules = import.meta.glob('./generated/*.simplified.json');

// Keyed by the same identifier as everywhere else a course's notes get a
// generated per-course chunk — see explainedKeyFor() in explained.js, which
// this deliberately mirrors rather than introduces a second key function for.
// LectureNotes.jsx already receives that value as its `notesKey` prop.
//
// Resolves to { [hash]: rewrite } — or null when this course has no generated
// file yet, which is not an error: the per-heading button still works live.
export async function loadSimplified(key) {
  if (!key) return null;
  const load = modules[`./generated/${key}.simplified.json`];
  if (!load) return null;
  try {
    const mod = await load();
    return mod?.default ?? mod ?? null;
  } catch {
    // A failed chunk fetch must not break the notes; Plain English simply stays
    // unavailable and the live per-heading button covers it.
    return null;
  }
}
