import { getAccessToken } from '../lib/supabase';

// Sentinel the tutor API appends to a text stream when the model/connection
// fails mid-response (see api/tutor.js). It is only ever written on the error
// path, at the very end of the stream, so it can't collide with real content.
export const STREAM_ERROR_MARKER = '<<arete:stream-error>>';

// Inline "what the AI is doing" markers the tutor API writes before the answer
// text starts (e.g. `<<arete:status:Looking up CYB 224>>`). Format MUST match
// api/tutor.js. We pull the label out for onStatus and strip the markers from
// the displayed answer.
const STATUS_RE = /<<arete:status:([^>]*)>>/g;

// Any Arete marker prefix — used to hold back a partial marker split across
// stream chunks so it never flashes as literal text.
const MARKER_PREFIX = '<<arete:';

// Strip status + error markers from the raw stream for display, holding back a
// trailing partial marker (one whose closing `>>` hasn't arrived yet).
export function toDisplayText(raw) {
  let out = raw.replace(STATUS_RE, '').replace(STREAM_ERROR_MARKER, '');
  const idx = out.lastIndexOf(MARKER_PREFIX);
  if (idx !== -1 && !out.slice(idx).includes('>>')) out = out.slice(0, idx);
  return out;
}

// Sends a tutor conversation and streams the reply, calling onChunk(accumulated)
// for each chunk of streamed text. Pass an AbortSignal to cancel in flight.
// Resolves to exactly one of:
//   { answer }              — stream completed
//   { answer, truncated }   — partial text, then the stream errored mid-response
//   { aborted: true }       — caller aborted via signal
//   { notConfigured, ... }  — server JSON (e.g. GROQ_API_KEY missing)
//   { error }               — network/HTTP/JSON error or empty response
export async function streamTutor({ messages, moduleContext, signal, onChunk, onStatus, unavailableMessage }) {
  const token = await getAccessToken();

  let res;
  try {
    res = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages, ...(moduleContext ? { moduleContext } : {}) }),
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') return { aborted: true };
    return { error: 'Network error — check your connection and try again.' };
  }

  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  // JSON responses carry errors, rate limits, or the unconfigured flag.
  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => ({}));
    return { ...data, responseStatus: res.status };
  }

  // Anything that isn't our text stream (e.g. Vite serving /api/* as static
  // files during local dev) means the API routes aren't running.
  if (!res.ok || !res.body || !contentType.includes('text/plain')) {
    return { error: unavailableMessage || 'AI Tutor is not available right now.' };
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let answer = '';
  let aborted = false;
  let lastStatus = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      answer += decoder.decode(value, { stream: true });
      // Surface the latest tool-activity status (fires only before text starts).
      const markers = answer.match(STATUS_RE);
      if (markers) {
        const latest = markers[markers.length - 1].replace(STATUS_RE, '$1');
        if (latest !== lastStatus) { lastStatus = latest; onStatus?.(latest); }
      }
      // Strip status + error markers before display. Skip empty output so a
      // leading status marker (which strips to '') doesn't spawn a blank answer
      // bubble and prematurely dismiss the status indicator — real text only.
      const display = toDisplayText(answer);
      if (display) onChunk?.(display);
    }
    answer += decoder.decode();
  } catch (err) {
    // Abort or dropped connection mid-stream — keep whatever arrived.
    if (err?.name === 'AbortError') aborted = true;
  }

  const hadStreamError = answer.includes(STREAM_ERROR_MARKER);
  const text = toDisplayText(answer).trim();

  if (aborted) return { aborted: true, answer: text };
  if (hadStreamError) {
    return text
      ? { answer: text, truncated: true }
      : { error: 'The AI was interrupted before it could answer. Please try again.' };
  }
  return text ? { answer: text } : { error: 'No response received. Please try again.' };
}
