// On-demand KaTeX loader.
//
// KaTeX is ~80KB gzipped plus web fonts. CourseDetail is route-lazy, but
// LectureNotes is a *static* import inside it, so `import katex` at the top of
// LectureNotes would ship KaTeX to every course page — and nearly every course
// has no maths at all. Loading it on first sight of a formula keeps that cost
// on the handful of pages that need it.
//
// Vite bundles the stylesheet and its fonts same-origin, so this satisfies the
// `font-src 'self'` / `style-src 'self' 'unsafe-inline'` CSP in vercel.json
// without any header change.

let loaded = null;
let pending = null;

/** The KaTeX module if it is already in memory, else null. Never triggers a load. */
export function getLoadedKatex() {
  return loaded;
}

/** Loads KaTeX (once) and resolves with the module. Rejects if the chunk fails. */
export function loadKatex() {
  if (loaded) return Promise.resolve(loaded);
  if (!pending) {
    pending = Promise.all([import('katex'), import('katex/dist/katex.min.css')])
      .then(([mod]) => {
        loaded = mod.default ?? mod;
        return loaded;
      })
      .catch((err) => {
        // Drop the cached promise so a later section can retry — a chunk fetch
        // can fail on a flaky connection and shouldn't poison the whole page.
        pending = null;
        throw err;
      });
  }
  return pending;
}
