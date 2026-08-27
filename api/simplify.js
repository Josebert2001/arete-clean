// ============================================================================
//  Arete — Lecture-Note Simplifier Serverless Function (Vercel)
//  Takes one heading's worth of lecture notes — the heading and every section
//  under it — and rewrites it in plain English for a 200-level student. Client
//  caches results in localStorage, so each heading costs one model call per
//  device.
//
//  Uses the shared multi-provider chain (Gemini → Groq → OpenRouter, see
//  _lib/model.js) so a provider that rejects the request (e.g. Groq's free-tier
//  413/429) is transparently retried on the next one.
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest, denyIfUserRateLimited } from './_lib/request-policy.js';
import { captureApiError } from './_lib/sentry.js';
import { getStudentFromRequest } from './_lib/supabase.js';
import { buildModelChain, hasAnyProvider, generateTextWithFallback } from './_lib/model.js';

// Exported so scripts/pregenerate-simplify.mjs rewrites with the exact prompt
// the live endpoint uses. A student must not be able to tell which produced the
// text in front of them.
export const SYSTEM_PROMPT = `You are Areté's lecture-note simplifier for University of Uyo students in Nigeria. You will be given one section of lecture notes — a heading and everything written under it. Rewrite it so a 200-level student understands it on first read.

Structure your response like this:
1. One sentence stating the core idea in everyday words
2. Short bullet points covering the key facts — spell out every acronym in parentheses the first time it appears. Most excerpts need only 3-6 bullets. If the excerpt itself is a long enumerated list (e.g. a dozen+ named factors, traits, or steps), do NOT give each item its own bullet — group them into a handful of bullets by shared theme instead, naming the items briefly within each group
3. If (and only if) it genuinely helps, end with one relatable everyday analogy on its own line starting with "**Think of it like this:**"

Rules:
- Stay under 220 words total
- Cover every distinct point the excerpt makes — a student who reads only your version should not be missing something the notes taught. For a long list, "covering" a point means its theme appears somewhere, not that it gets a dedicated line
- Plain English — no jargon unless you define it in the same sentence
- Keep the lecturer's own name for anything named or numbered; a student is examined on those words
- Do not invent facts that are not in the excerpt; simplify, don't expand
- Simple Markdown only: **bold**, bulleted lists and fenced code blocks — no headings, no tables, no HTML
- Never write LaTeX. The excerpt may contain it; write any formula back in plain readable notation instead (x^2, sqrt(x), <=, pi), because LaTeX is displayed to the student raw
- Do not mention that you are simplifying or refer to "the excerpt"`;

// Raised from 8 alongside the move to whole-heading groups: a topic can carry a
// dozen headings, and a student working down one of them would otherwise hit the
// wall inside a minute. Each result is cached per device forever, so the ceiling
// on real cost is the number of distinct headings, not this number.
const RATE_LIMIT = {
  namespace: 'simplify',
  limit: 25,
  windowMs: 10 * 60 * 1000,
};

// A heading group is several sections, not one. Must stay at or above
// MAX_SIMPLIFY_CHARS in src/utils/simplifySection.js.
const MAX_TEXT_CHARS = 10000;

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Availability probe — lets the UI hide the Simplify buttons on page load
  // when no provider is configured. Skips rate limiting.
  if (req.body?.probe) {
    return res.status(200).json({ configured: hasAnyProvider() });
  }

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'simplify');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many simplify requests from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  // Signed-in only — this endpoint spends real model quota, so it must not be
  // callable anonymously by anything that finds the URL. Every caller in the app
  // already sits behind a RequireAuth route, so this costs no student anything.
  // Checked AFTER the rate limiter for the same reason as research.js: an
  // invalid token must not be able to force an uncounted Supabase auth call.
  const student = await getStudentFromRequest(req);
  if (!student) {
    logRequest(req, 'simplify', { denied: 'unauthorized' });
    return res.status(401).json({
      error: 'Please sign in to use Simplify.',
      kind: 'unauthorized',
    });
  }

  // The budget that actually binds: per-student, in Postgres, shared across
  // instances. The per-IP check above is only a cheap pre-auth guard.
  if (await denyIfUserRateLimited(req, res, student, RATE_LIMIT, {
    route: 'simplify',
    message: 'You have used your Simplify allowance for now. Please wait a few minutes and try again.',
  })) return;

  // Light tier (flash-lite) — cheaper and faster. This endpoint briefly moved
  // to the strong model because gemini-3.1-flash-lite dropped points from the
  // back of a whole heading group; the move to gemini-3.5-flash-lite plus the
  // zeroed thinking budget below is meant to fix both the cost and that
  // failure at once. Re-check output completeness against a long heading group
  // if this ever regresses.
  const chain = buildModelChain('light');
  if (chain.length === 0) {
    return res.status(200).json({
      notConfigured: true,
      error: "Simplify isn't connected yet — no model provider key is set (GEMINI_API_KEY / GROQ_API_KEY / OPENROUTER_API_KEY).",
    });
  }

  const { text, context } = req.body || {};

  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'No text provided.' });
  }
  if (text.length > MAX_TEXT_CHARS) {
    return res.status(400).json({ error: `Text exceeds the ${MAX_TEXT_CHARS.toLocaleString()} character limit.` });
  }

  const courseCode = typeof context?.courseCode === 'string' ? context.courseCode.slice(0, 40) : '';
  const topicTitle = typeof context?.topicTitle === 'string' ? context.topicTitle.slice(0, 120) : '';
  const setting = [courseCode, topicTitle].filter(Boolean).join(' — ');

  try {
    const outcome = await generateTextWithFallback({
      chain,
      system: SYSTEM_PROMPT,
      prompt: `${setting ? `Course context: ${setting}\n\n` : ''}Lecture-note excerpt:\n\n${text}`,
      // Reasoning tokens share this budget; the chain keeps effort low so the
      // rewrite isn't cut off. Raised with the longer input — the rewrite itself
      // grew, and sifting a whole heading group takes more reasoning.
      maxOutputTokens: 1400,
      // Low temperature keeps the rewrite faithful ("simplify, don't expand");
      // applied to Groq/OpenRouter only, never to Gemini (see model.js).
      temperature: 0.4,
      // Gemini 3.x is NOT capped by default and spends hidden thinking out of
      // this same budget — with only 1400 tokens to work with, that leaves too
      // little for the visible rewrite and produces answers that cut off
      // mid-bullet. Same fix as explainer.js: this is a plain-English rewrite,
      // not multi-step reasoning.
      providerOptions: { google: { thinkingConfig: { thinkingBudget: 0, includeThoughts: false } } },
    });

    if (outcome.text) {
      return res.status(200).json({ simplified: outcome.text });
    }

    // Every provider failed (or produced no text). Distinguish load from bugs.
    const err = outcome.error;
    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    if (err && !isRateLimit) await captureApiError(err, { route: 'simplify', phase: 'all-providers-failed' });
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to simplify this section. Please try again.',
    });
  } catch (err) {
    console.error('Simplify error:', err);
    await captureApiError(err, { route: 'simplify' });
    return res.status(200).json({ error: 'Failed to simplify this section. Please try again.' });
  }
}
