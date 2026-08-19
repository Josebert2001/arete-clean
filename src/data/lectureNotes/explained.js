// Pre-generated code walkthroughs.
//
// The practical listings are static authored content — the same twelve programs
// every student reads — so every listing produces the same explanation every
// time. `scripts/pregenerate-explanations.mjs` runs them all once and writes the
// results here; at runtime a student reads them straight from the bundle. No API
// call, no spinner, and — the point — no rate limit and no network.
//
// The rate limit is the real reason. /api/explainer allows 8 requests per ten
// minutes per IP, and a class on campus WiFi shares one address: the ninth
// student to ask in ten minutes is told the AI is busy, on the night they are
// revising. Bundled text has no such ceiling.
//
// Files are keyed by content hash (explanationHash of mode + language + code),
// so an edited listing simply misses the map and falls back to the live API
// rather than serving a walkthrough of code that no longer exists.
//
// Kept out of index.js on purpose: `import.meta.glob` is a Vite transform, and
// index.js is also imported by Node scripts (validate-modules.mjs), where it
// would be undefined. Nothing in this file may be imported from a Node context —
// which is why the collectors the generator needs live in utils/explainCode.js.

// Eager: false — one JSON per course, fetched the first time a student asks for
// an explanation on that course. The existing `course-data` CacheFirst rule in
// vite.config.js catches the chunk, so a course whose explanations have been
// opened once keeps working offline.
const modules = import.meta.glob('./generated/*.explained.json');

// Which key a course's explanations live under: its shared `notesKey` when it
// has one, else its own slug. Matches simplifiedKeyFor() — the two generators
// write files side by side under the same key.
export function explainedKeyFor(course) {
  return course?.notesKey || course?.slug || null;
}

// Whether a generated file exists for this course, without fetching it. The
// glob map is built at compile time, so this is a synchronous key lookup — which
// is what lets a button decide to render offline, where the live-endpoint probe
// cannot succeed.
export function hasExplained(key) {
  return Boolean(key) && Boolean(modules[`./generated/${key}.explained.json`]);
}

// Resolves to { [hash]: explanation } — or null when this course has no
// generated file yet, which is not an error: the button still works live.
export async function loadExplained(key) {
  if (!key) return null;
  const load = modules[`./generated/${key}.explained.json`];
  if (!load) return null;
  try {
    const mod = await load();
    return mod?.default ?? mod ?? null;
  } catch {
    // A failed chunk fetch must not break the page; the live API covers it.
    return null;
  }
}
