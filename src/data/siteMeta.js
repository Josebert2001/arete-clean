// Site identity and the home page's head text.
//
// A leaf module on purpose: no imports at all. publicCatalogue.js re-exports
// everything here, so nothing that already reads SITE_URL from there has to
// change — but src/utils/usePageTitle.js, which almost every page imports, can
// reach the home title without dragging the department registry and the note
// registry into its module graph.
//
// The home text lives here rather than as literals in usePageTitle.js because
// "/" is prerendered: scripts/prerender.mjs bakes these exact strings into
// dist/index.html, and usePageMeta restores them on unmount. Two copies would
// mean a client-side navigation back to "/" replaced the title a crawler was
// served with a different one.

export const SITE_URL = 'https://www.aretecyb.tech';
export const SITE_NAME = 'Areté';
export const INSTITUTION = 'University of Uyo';
// The form students actually type. "University of Uyo" does not contain the
// token "uniuyo", which is the single most common way this school is searched —
// so the short form is not merely an abbreviation to fall back on when a title
// runs long, it is the better match for the query. See courseTitle().
export const INSTITUTION_SHORT = 'UniUyo';

export function homeTitle() {
  return `Areté — ${INSTITUTION} course outlines, notes & AI tutor`;
}

// "every course from 100 Level to Final Year" was the claim here, and it is not
// true: a Microbiology student's 300 Level specialist courses are not on Areté
// and will not be until that catalogue is authored. The body copy on the page
// always said so correctly — this is the sentence Google and every answer
// engine actually quote, and a headline that contradicts the page beneath it is
// the cheapest possible way to lose the trust the rest of this file exists to
// earn.
//
// No course count here on purpose: this file imports nothing (see the note at
// the top), so it cannot count the catalogue, and a hardcoded number is wrong
// the day a department is added.
export function homeDescription() {
  return (
    `Areté is a free study companion for ${INSTITUTION} students: outlines, textbooks and study ` +
    `tips for foundation courses taken across programmes plus the full Cybersecurity and Data ` +
    `Science catalogues, 100 Level to Final Year — with transcribed lecture notes, past papers, ` +
    `Java, Python and C tracks and an AI tutor.`
  );
}
