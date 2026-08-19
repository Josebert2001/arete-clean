// Client helper for "Explain this code" (api/explainer.js).
//
// The Code Explainer already existed as a page you paste code into. This is the
// same endpoint offered where the code actually is: on the listings in the
// lecture notes, and on the model answers in the written-exam bank. A student
// stuck on Practical 2 should not have to copy the listing, find another page
// and paste it — by then they have left the notes they were reading.
//
// Caching follows simplifySection.js: keyed by a hash of the language and the
// code, so a given listing costs one model call per device, ever. That matters
// more here than for Simplify, because the practicals are a fixed set of
// listings that a whole class will ask about the same week.

import { fetchJsonWithFallback } from './apiClient';
import { hashText } from './simplifySection';

const CACHE_PREFIX = 'arete:explain-code:v1:';

// Below this there is nothing to walk through — a one-line snippet explains
// itself, and an AI call would say less than the surrounding note already does.
export const MIN_EXPLAIN_CHARS = 60;
// Must stay at or below the code length limit in api/explainer.js, or the
// button offers a call the endpoint rejects with a 400.
export const MAX_EXPLAIN_CHARS = 8000;

export function canExplainCode(code) {
  const len = (code ?? '').trim().length;
  return len >= MIN_EXPLAIN_CHARS && len <= MAX_EXPLAIN_CHARS;
}

function cacheKey(code, language) {
  return CACHE_PREFIX + hashText(`${language ?? ''}\n${code ?? ''}`);
}

export function getCachedExplanation(code, language) {
  try {
    return localStorage.getItem(cacheKey(code, language));
  } catch {
    // localStorage unavailable (private mode / storage disabled) — treat as a
    // cache miss; the feature still works, it just re-fetches.
    return null;
  }
}

export function setCachedExplanation(code, language, explanation) {
  try {
    localStorage.setItem(cacheKey(code, language), explanation);
  } catch {
    // Quota exceeded or storage disabled — skip caching, nothing else to do.
  }
}

// Calls the API. Resolves to { explanation } | { error } | { aborted: true }.
export async function requestCodeExplanation({ code, language, signal }) {
  try {
    const data = await fetchJsonWithFallback(
      '/api/explainer',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
        signal,
      },
      'The code explainer is unavailable in local dev without `vercel dev`.'
    );
    if (data.explanation) setCachedExplanation(code, language, data.explanation);
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') return { aborted: true };
    return { error: 'Network error — check your connection and try again.' };
  }
}
