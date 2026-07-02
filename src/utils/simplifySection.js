// Client helper for the "Simplify this" feature (api/simplify.js).
//
// Serializes a lecture-note section to plain text, caches simplifications in
// localStorage (keyed by a hash of the serialized text, so each section costs
// one Groq call per device, ever), and wraps the API call.

import { fetchJsonWithFallback } from './apiClient';

const CACHE_PREFIX = 'arete:simplify:v1:';

// djb2 — tiny, stable, good enough for cache keys (not security).
export function hashText(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

function itemToLine(item) {
  if (item && typeof item === 'object') {
    return item.def ? `${item.term} — ${item.def}` : String(item.term ?? '');
  }
  return String(item ?? '');
}

// Flattens one lecture-note section into the plain text sent to the API.
// Returns '' for section types with nothing meaningful to simplify.
export function sectionToPlainText(section) {
  if (!section) return '';
  const parts = [];
  if (section.heading) parts.push(section.heading);

  switch (section.type) {
    case 'text':
    case 'definition':
      if (section.text) parts.push(section.text);
      break;
    case 'bullets':
      if (Array.isArray(section.items)) parts.push(section.items.map((i) => `- ${itemToLine(i)}`).join('\n'));
      break;
    case 'termlist':
    case 'fivers':
      if (Array.isArray(section.items)) parts.push(section.items.map((i) => `- ${itemToLine(i)}`).join('\n'));
      break;
    case 'table':
      if (Array.isArray(section.headers)) parts.push(section.headers.join(' | '));
      if (Array.isArray(section.rows)) parts.push(section.rows.map((r) => r.join(' | ')).join('\n'));
      break;
    case 'proscons':
      if (Array.isArray(section.advantages)) parts.push(`Advantages:\n${section.advantages.map((a) => `- ${a}`).join('\n')}`);
      if (Array.isArray(section.disadvantages)) parts.push(`Disadvantages:\n${section.disadvantages.map((d) => `- ${d}`).join('\n')}`);
      break;
    default:
      return '';
  }

  // Heading alone isn't worth an AI call.
  return parts.length > (section.heading ? 1 : 0) ? parts.join('\n\n') : '';
}

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
