// Lazy registry for the transcribed lecture notes.
//
// These files are the heaviest data in the app — ENT 221 alone is ~583 kB, and
// all of them together are ~1.36 MB. They used to be imported statically by
// courses.js, which made them part of the catalogue's module graph: opening
// GST 111, a course with no notes at all, still downloaded every note file in
// the programme (~520 kB gzipped) before the page could render.
//
// A course now names its notes with `notesKey` instead of holding the array,
// and the content is fetched on demand. Rolldown emits one chunk per entry
// below, so a student downloads only the notes for courses they actually open,
// and the 39 of 57 Cybersecurity courses (50 of 55 in Data Science) that have
// no notes download none.
//
// This does not weaken offline support: the chunks are same-origin /assets/*.js
// and are caught by the existing `course-data` CacheFirst rule in
// vite.config.js, so a note read once stays available offline exactly as before.
//
// Keys are shared between catalogues on purpose — the notes are transcribed
// from the lecturer's workbook, so every department that takes the course
// resolves the same file (see the note on shared notes in CLAUDE.md).
export const noteLoaders = {
  cos121: () => import('./cos121.js').then((m) => m.cos121LectureNotes),
  cos211: () => import('./cos211.js').then((m) => m.cos211LectureNotes),
  cos221: () => import('./cos221.js').then((m) => m.cos221LectureNotes),
  cyb121: () => import('./cyb121.js').then((m) => m.cyb121LectureNotes),
  cyb122: () => import('./cyb122.js').then((m) => m.cyb122LectureNotes),
  cyb123: () => import('./cyb123.js').then((m) => m.cyb123LectureNotes),
  cyb211: () => import('./cyb211.js').then((m) => m.cyb211LectureNotes),
  cyb213: () => import('./cyb213.js').then((m) => m.cyb213LectureNotes),
  cyb221: () => import('./cyb221.js').then((m) => m.cyb221LectureNotes),
  ent221: () => import('./ent221.js').then((m) => m.ent221LectureNotes),
  ins224: () => import('./ins224.js').then((m) => m.ins224LectureNotes),
  cyb224: () => import('./cyb224.js').then((m) => m.cyb224LectureNotes),
  cyb222: () => import('./cyb222.js').then((m) => m.cyb222LectureNotes),
  uuyCyb222: () => import('./uuyCyb222.js').then((m) => m.uuyCyb222LectureNotes),
  gst121: () => import('./gst121.js').then((m) => m.gst121LectureNotes),
  mth121: () => import('./mth121.js').then((m) => m.mth121LectureNotes),
  phy128: () => import('./phy128.js').then((m) => m.phy128LectureNotes),
  sen211: () => import('./sen211.js').then((m) => m.sen211LectureNotes),
};

export const NOTE_KEYS = Object.keys(noteLoaders);

// How many topics each note file holds, without downloading it.
//
// The reading-progress bars need a denominator on surfaces that must not pull
// note chunks — the course list renders ~57 cards, and loading all ten files to
// count their topics would undo the code-splitting this module exists for.
//
// Hand-maintained, because the whole point is that it is readable without the
// data. `scripts/validate-modules.mjs` loads the real files at prebuild and
// fails if any count here has drifted, so it cannot go quietly stale.
export const NOTE_TOPIC_COUNTS = {
  cos121: 9,
  cos211: 12,
  cos221: 12,
  cyb121: 7,
  cyb122: 12,
  cyb123: 20,
  cyb211: 2,
  cyb213: 12,
  cyb221: 21,
  ent221: 18,
  ins224: 27,
  cyb224: 26,
  cyb222: 12,
  uuyCyb222: 13,
  gst121: 2,
  mth121: 6,
  phy128: 4,
  sen211: 3,
};

// Topic count for a course, synchronously. Keyed courses read the map above;
// the optional inline fallback remains for custom course objects in tests.
export function noteTopicCount(course) {
  if (course?.notesKey) return NOTE_TOPIC_COUNTS[course.notesKey] ?? 0;
  return course?.lectureNotes?.length ?? 0;
}

// Resolves a course's notes to an array, or [] when it has none. Every caller
// is async already (a React effect, or the tutor's tool execute()), so this
// stays a plain promise rather than anything cleverer.
export async function loadNotesFor(course) {
  const load = course?.notesKey ? noteLoaders[course.notesKey] : null;
  if (!load) return course?.lectureNotes ?? [];
  return (await load()) ?? [];
}
