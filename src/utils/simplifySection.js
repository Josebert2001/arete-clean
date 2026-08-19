// Client helper for the "Simplify this" feature (api/simplify.js).
//
// Caches rewrites in localStorage (keyed by a hash of the group's serialised
// text, so each group costs one model call per device, ever) and wraps the API
// call. The serialisation itself lives in noteText.js, which has no browser
// dependencies so the pre-generation script can share it — everything it
// exports is re-exported here for existing callers.
//
// "Group", not "section": a heading in the notes owns everything under it until
// the next heading, and that whole run is what a student reads as one unit. An
// earlier version sent only the heading's own section, which is why the button
// was missing from most headings — the substance usually lives in the sections
// that follow, so the heading alone fell under the length floor.

import { fetchJsonWithFallback } from './apiClient';
import { hashText } from './noteText';

export {
  hashText,
  sectionToPlainText,
  extraSectionToPlainText,
  sectionsToPlainText,
  buildOutline,
  groupToPlainText,
  canSimplifyGroup,
  simplifiableGroups,
  MIN_SIMPLIFY_CHARS,
  MAX_SIMPLIFY_CHARS,
} from './noteText';

const CACHE_PREFIX = 'arete:simplify:v1:';

export function getCachedSimplification(text) {
  try {
    return localStorage.getItem(CACHE_PREFIX + hashText(text));
  } catch {
    // localStorage unavailable (private mode / storage disabled) — treat as a
    // cache miss; the feature still works, it just re-fetches.
    return null;
  }
}

export function setCachedSimplification(text, simplified) {
  try {
    localStorage.setItem(CACHE_PREFIX + hashText(text), simplified);
  } catch {
    // Quota exceeded or storage disabled — skip caching, nothing else to do.
  }
}

// Calls the API. Resolves to { simplified } | { error } | { aborted: true }.
export async function requestSimplification({ text, context, signal }) {
  try {
    const data = await fetchJsonWithFallback(
      '/api/simplify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context }),
        signal,
      },
      'Simplify is unavailable in local dev without `vercel dev`.'
    );
    if (data.simplified) setCachedSimplification(text, data.simplified);
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') return { aborted: true };
    return { error: 'Network error — check your connection and try again.' };
  }
}
