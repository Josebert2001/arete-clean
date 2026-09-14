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

export function homeTitle() {
  return `Areté — ${INSTITUTION} course outlines, notes & AI tutor`;
}

export function homeDescription() {
  return (
    `Areté is a free academic companion for ${INSTITUTION} students: outlines, recommended ` +
    `textbooks and study tips for every course from 100 Level to Final Year, transcribed lecture ` +
    `notes, past-paper practice, interactive Java, Python and C tracks, and an AI tutor that ` +
    `knows the curriculum.`
  );
}
