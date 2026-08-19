// Client helper for the "Key points" feature (api/summarize.js).
//
// Serialises a whole lecture-note topic to plain text, caches summaries in
// localStorage (keyed by a hash of that text, so each topic costs one model call
// per device, ever), and wraps the API call.
//
// Sits beside simplifySection.js rather than inside it: Simplify works on one
// section for a student who is stuck, this works on a whole topic for a student
// who has finished it. They share the serialiser and the hash, nothing else.

import { fetchJsonWithFallback } from './apiClient';
import { hashText, sectionsToPlainText } from './simplifySection';

const CACHE_PREFIX = 'arete:summary:v1:';

// Shorter than this and the topic is its own summary already.
export const MIN_SUMMARY_CHARS = 800;
// Must stay at or below MAX_TEXT_CHARS in api/summarize.js, or the button offers
// a call the endpoint rejects with a 400.
export const MAX_SUMMARY_CHARS = 32000;

// Titles matching this are already hand-written revision summaries — the
// lecturer's own exam guidance, transcribed. An AI recap of one would restate
// the single most trustworthy thing on the page, worse. (UUY-CYB 222's topic 13,
// "Exam Focus — The Lecturer's Guaranteed Questions".)
const ALREADY_A_SUMMARY = /exam focus|key takeaways|revision summary/i;

// Flattens a whole topic into the plain text sent to the API. The section walk
// itself lives in simplifySection.js, shared with the per-group serialiser so
// the two views of the same notes can't drift apart.
export function topicToPlainText(topic) {
  if (!topic?.sections?.length) return '';
  const body = sectionsToPlainText(topic.sections);
  // Title kept even when nothing under it serialises, so the return value still
  // distinguishes "a topic with no summarisable body" from "not a topic".
  return [topic.title, body].filter(Boolean).join('\n\n');
}

// Whether to offer the button at all. Length is measured on the serialised text
// the API would actually receive, not the source.
export function canSummarize(topic, plainText) {
  if (!topic?.title || ALREADY_A_SUMMARY.test(topic.title)) return false;
  const len = (plainText ?? topicToPlainText(topic)).length;
  return len >= MIN_SUMMARY_CHARS && len <= MAX_SUMMARY_CHARS;
}

export function getCachedSummary(text) {
  try {
    return localStorage.getItem(CACHE_PREFIX + hashText(text));
  } catch {
    // localStorage unavailable (private mode / storage disabled) — treat as a
    // cache miss; the feature still works, it just re-fetches.
    return null;
  }
}

export function setCachedSummary(text, summary) {
  try {
    localStorage.setItem(CACHE_PREFIX + hashText(text), summary);
  } catch {
    // Quota exceeded or storage disabled — skip caching, nothing else to do.
  }
}

// Calls the API. Resolves to { summary } | { error } | { aborted: true }.
export async function requestSummary({ text, context, signal }) {
  try {
    const data = await fetchJsonWithFallback(
      '/api/summarize',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context }),
        signal,
      },
      'Key points is unavailable in local dev without `vercel dev`.'
    );
    if (data.summary) setCachedSummary(text, data.summary);
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') return { aborted: true };
    return { error: 'Network error — check your connection and try again.' };
  }
}
