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
import { hashText, sectionToPlainText } from './simplifySection';

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

// Flattens a whole topic into the plain text sent to the API.
//
// Reuses sectionToPlainText and does NOT modify it: Simplify gates its button on
// that function's output length, so widening it there would silently change
// which sections offer a Simplify button. The extra types folded in here are the
// ones that carry prose a recap wants but a section-level rewrite does not —
// `note` clarifications and `casestudy` prompts.
export function topicToPlainText(topic) {
  if (!topic?.sections?.length) return '';
  const parts = [];
  if (topic.title) parts.push(topic.title);

  for (const section of topic.sections) {
    const base = sectionToPlainText(section);
    if (base) {
      parts.push(base);
      continue;
    }
    if (section?.type === 'note') {
      const lines = [];
      if (section.text) lines.push(section.text);
      if (Array.isArray(section.items)) lines.push(...section.items.map((i) => `- ${i}`));
      if (lines.length) parts.push(lines.join('\n'));
    } else if (section?.type === 'casestudy') {
      const lines = [];
      if (section.title) lines.push(section.title);
      if (section.prompt) lines.push(section.prompt);
      if (Array.isArray(section.tasks)) lines.push(...section.tasks.map((t, i) => `${i + 1}. ${t}`));
      if (lines.length) parts.push(lines.join('\n'));
    }
  }

  return parts.join('\n\n');
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
