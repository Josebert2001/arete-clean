import { getAccessToken } from '../lib/supabase';
import { fetchJsonWithFallback } from './apiClient';

// Sends a highlighted passage to /api/research and returns the plain-language
// explanation plus the sources the AI consulted. The endpoint is signed-in
// only, so we always attach the Supabase Bearer token.
//
// Resolves to one of:
//   { explanation, sources }        — success
//   { notConfigured, explanation }  — GROQ_API_KEY missing on the server
//   { error, kind? }                — HTTP/JSON/network error, rate limit, or auth
export async function explainSelection({ selection, context, signal }) {
  const token = await getAccessToken();
  if (!token) {
    return { error: 'Please sign in to use Explain-this.', kind: 'unauthorized' };
  }

  try {
    const data = await fetchJsonWithFallback(
      '/api/research',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selection, ...(context ? { context } : {}) }),
        signal,
      },
      'Explain-this is not available right now.'
    );
    return data;
  } catch (err) {
    if (err?.name === 'AbortError') return { aborted: true };
    return { error: 'Network error — check your connection and try again.' };
  }
}
