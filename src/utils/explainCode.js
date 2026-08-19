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

// 'walkthrough' — the full explanation, faults and improvements included.
// 'study' — the same line-by-line reading, with every verdict withheld. Used
// where the listing IS an exam question: the student must be able to read the
// code before they can answer, but "the bug is on line 16" is the answer.
export const EXPLAIN_MODES = ['walkthrough', 'study'];

function cacheKey(code, language, mode) {
  // Mode is part of the key: the two answers to the same listing are different
  // text, and serving one where the other was asked for would either leak the
  // fault or hide it.
  return CACHE_PREFIX + hashText(`${mode ?? 'walkthrough'}\n${language ?? ''}\n${code ?? ''}`);
}

export function getCachedExplanation(code, language, mode) {
  try {
    return localStorage.getItem(cacheKey(code, language, mode));
  } catch {
    // localStorage unavailable (private mode / storage disabled) — treat as a
    // cache miss; the feature still works, it just re-fetches.
    return null;
  }
}

export function setCachedExplanation(code, language, explanation, mode) {
  try {
    localStorage.setItem(cacheKey(code, language, mode), explanation);
  } catch {
    // Quota exceeded or storage disabled — skip caching, nothing else to do.
  }
}

// Calls the API. Resolves to { explanation } | { error } | { aborted: true }.
export async function requestCodeExplanation({ code, language, mode, signal }) {
  try {
    const data = await fetchJsonWithFallback(
      '/api/explainer',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, mode }),
        signal,
      },
      'The code explainer is unavailable in local dev without `vercel dev`.'
    );
    if (data.explanation) setCachedExplanation(code, language, data.explanation, mode);
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') return { aborted: true };
    return { error: 'Network error — check your connection and try again.' };
  }
}
