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

import { fetchJsonWithFallback } from './apiClient.js';
import { hashText } from './simplifySection.js';

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

// The identity of one explanation. Mode is part of it: the two answers to the
// same listing are different text, and serving one where the other was asked
// for would either leak the fault or hide it.
//
// Shared by the localStorage cache and the pre-generated bundles, so the map
// written by scripts/pregenerate-explanations.mjs is looked up by exactly the
// key the runtime asks for. Content-addressed: edit a listing and its entry
// stops matching, and the live API covers it rather than a stale walkthrough
// being served for code that has changed.
export function explanationHash(code, language, mode) {
  return hashText(`${mode ?? 'walkthrough'}\n${language ?? ''}\n${code ?? ''}`);
}

function cacheKey(code, language, mode) {
  return CACHE_PREFIX + explanationHash(code, language, mode);
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

// ── What is explainable, and in which mode ───────────────────────────────────
//
// Both collectors below answer the same question the UI answers when it decides
// whether to show a button, so the pre-generation script fills exactly the set
// a student can ask for — no wasted calls, no gaps. Kept here rather than in the
// script because the two must not drift.

// The topics that carry at least one program listing — the practicals, for a
// course whose notes mix theory and code. Drives the Code Walkthrough tab's
// contents and whether it is offered at all.
export function topicsWithCode(topics) {
  return (topics ?? []).filter((t) => listingsInTopic(t).length > 0);
}

// A topic's program listings. `language: 'output'` blocks are run transcripts,
// not code, and are skipped — the same test CourseDetail's notes make.
export function listingsInTopic(topic) {
  const out = [];
  for (const section of topic?.sections ?? []) {
    if (section?.type !== 'code') continue;
    const language = section.language || 'python';
    if (language === 'output') continue;
    if (!canExplainCode(section.code)) continue;
    out.push({
      code: section.code,
      language,
      mode: 'walkthrough',
      hash: explanationHash(section.code, language, 'walkthrough'),
      label: section.heading || topic?.title || '',
    });
  }
  return out;
}

// An exam bank's listings. A question stem is only ever offered in study mode
// (it is the question — the walkthrough would answer it), and the model answer
// only in walkthrough mode, so each listing appears once per mode it is
// actually asked for.
export function listingsInExamPrep(bank) {
  const out = [];
  for (const q of bank ?? []) {
    const language = q?.language || 'python';
    const add = (code, mode) => {
      if (!canExplainCode(code)) return;
      out.push({
        code,
        language,
        mode,
        hash: explanationHash(code, language, mode),
        label: q.source || q.question?.slice(0, 60) || '',
      });
    };
    if (q?.code) add(q.code, 'study');
    if (q?.code || q?.modelCode) add(q.modelCode || q.code, 'walkthrough');
  }
  return out;
}

// Calls the API. Resolves to { explanation } | { error } | { aborted: true }.
export async function requestCodeExplanation({ code, language, mode, signal }) {
  // Imported lazily rather than at module scope because this file is ALSO loaded
  // by scripts/pregenerate-explanations.mjs under plain Node, where
  // src/lib/supabase.js cannot be evaluated at all — it reads `import.meta.env`,
  // which Vite defines and Node leaves undefined. The script only uses the pure
  // listing helpers above and never reaches this function.
  const { authHeaders } = await import('../lib/supabase.js');

  try {
    const data = await fetchJsonWithFallback(
      '/api/explainer',
      {
        method: 'POST',
        // The endpoint is signed-in only — without this it answers 401.
        headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
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
