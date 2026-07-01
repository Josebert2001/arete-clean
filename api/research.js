// ============================================================================
//  Arete — Explain-Selection Serverless Function (Vercel)
//  A student highlights a passage on a course/lecture-note or module-theory
//  page; this endpoint researches it online and returns a simple, plain-language
//  explanation plus the sources it consulted.
//
//  Uses `groq/compound-mini` — a Groq *system* with built-in web search — so the
//  explanation is grounded in current, real information. No custom tools are
//  wired here (unlike api/tutor.js), which is why compound-mini fits cleanly.
//
//  Signed-in only: the request must carry a valid Supabase Bearer token.
//  Uses the same GROQ_API_KEY environment variable as api/tutor.js.
// ============================================================================

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';
import { getStudentFromRequest } from './_lib/supabase.js';
import { captureApiError } from './_lib/sentry.js';

const SYSTEM_PROMPT = `You are Arete's study helper for beginner B.Sc. Cybersecurity students at the University of Uyo.

A student has highlighted a passage from their course notes and wants it explained simply. Use web search to add current, accurate context, then explain the passage in plain language.

Rules:
- Keep it short: 2–4 short paragraphs, or a short paragraph plus a few bullets.
- Explain like you're talking to a first-year student — define any jargon the moment you use it.
- Stay grounded in what the passage is actually about; don't wander into unrelated territory.
- If a course context is given, keep the explanation relevant to that course.
- Use only simple Markdown: **bold**, inline \`code\`, and bulleted or numbered lists. No tables, no HTML, no headings.
- Be encouraging and concrete. Prefer a plain example over abstract description.`;

// A highlighted passage — not a document. Keep the model input bounded.
const MAX_SELECTION = 1200;
const MAX_SOURCES = 5;

const RATE_LIMIT = {
  namespace: 'research',
  limit: 4,
  windowMs: 10 * 60 * 1000,
};

// Pulls the URL sources the compound system cited, deduped and capped. The AI
// SDK exposes web results as `result.sources` (sourceType 'url'); we degrade to
// an empty list if the shape isn't present rather than failing the response.
export function extractSources(result) {
  const raw = Array.isArray(result?.sources) ? result.sources : [];
  const seen = new Set();
  const out = [];
  for (const s of raw) {
    const url = s?.url;
    if (!url || seen.has(url)) continue;
    seen.add(url);
    let host = url;
    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch { /* keep raw url */ }
    out.push({ title: s.title || host, url });
    if (out.length >= MAX_SOURCES) break;
  }
  return out;
}

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Availability probe — lets the UI hide the "Explain this" button when the
  // feature isn't configured. Skips auth + rate limiting, like the siblings.
  if (req.body?.probe) {
    return res.status(200).json({ configured: Boolean(process.env.GROQ_API_KEY) });
  }

  // Signed-in only. getStudentFromRequest returns null for anonymous, invalid,
  // or expired tokens (and when Supabase isn't configured) — all mean "no".
  const student = await getStudentFromRequest(req);
  if (!student) {
    return res.status(401).json({
      error: 'Please sign in to use Explain-this.',
      kind: 'unauthorized',
    });
  }

  logRequest(req, 'research');
  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'You’ve used your Explain-this lookups for now. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(200).json({
      notConfigured: true,
      explanation: "Explain-this isn't connected yet — the GROQ_API_KEY environment variable is missing.",
    });
  }

  const { selection, context } = req.body || {};

  if (typeof selection !== 'string' || !selection.trim()) {
    return res.status(400).json({ error: 'No text was selected.' });
  }
  if (selection.length > MAX_SELECTION) {
    return res.status(400).json({ error: `Please select a shorter passage (under ${MAX_SELECTION} characters).` });
  }

  const courseCode = typeof context?.courseCode === 'string' ? context.courseCode.slice(0, 40) : '';
  const courseTitle = typeof context?.courseTitle === 'string' ? context.courseTitle.slice(0, 120) : '';
  const courseLine = courseCode || courseTitle
    ? `\n\nCourse context: ${[courseCode, courseTitle].filter(Boolean).join(' — ')}.`
    : '';

  try {
    const groq = createGroq({ apiKey: GROQ_API_KEY });

    const result = await generateText({
      model: groq('groq/compound-mini'),
      system: SYSTEM_PROMPT,
      prompt: `Explain this passage simply for a student:${courseLine}\n\n"""\n${selection.trim()}\n"""`,
      maxOutputTokens: 800,
      temperature: 0.4,
    });

    const explanation = result.text?.trim() || 'No explanation received. Try selecting the text again.';
    return res.status(200).json({ explanation, sources: extractSources(result) });
  } catch (err) {
    console.error('Groq research error:', err);

    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    // A busy-AI 429 is expected load, not a bug — only report real failures.
    if (!isRateLimit) await captureApiError(err, { route: 'research' });
    return res.status(200).json({
      error: isRateLimit
        ? 'The AI is busy right now. Wait a moment and try again.'
        : 'Could not look that up. Please try again.',
    });
  }
}
