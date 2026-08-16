// ============================================================================
//  Arete — Lecture-Note Topic Summariser Serverless Function (Vercel)
//  Condenses a whole lecture-note topic into an exam-ready recap. Client caches
//  results in localStorage, so each topic costs one model call per device.
//
//  Deliberately NOT the same thing as api/simplify.js. Simplify rewrites one
//  dense *section* in plain English for a student who does not understand it;
//  this condenses a whole *topic* for a student who has already read it and
//  wants the key points back before an exam. Different scope, different prompt,
//  different button — if the two ever converge, merge them rather than leaving
//  a student guessing which one they want.
//
//  Uses the shared multi-provider chain (Gemini → Groq → OpenRouter, see
//  _lib/model.js) so a provider that rejects the request is retried on the next.
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';
import { captureApiError } from './_lib/sentry.js';
import { buildModelChain, hasAnyProvider, generateTextWithFallback } from './_lib/model.js';

const SYSTEM_PROMPT = `You are Areté's lecture-note summariser for University of Uyo students in Nigeria. You will be given the full text of one lecture-note topic. The student has already read it — produce the revision recap they would want the night before the exam.

Structure your response like this:
1. One sentence stating what this topic is about
2. 6-8 bullet points, each a single fact the student could actually write in an exam answer — definitions, classifications, named steps, ordered lists, numbers
3. A final line starting with "**Terms to know:**" listing the key terms from the topic, comma-separated

Rules:
- Stay under 220 words total
- Keep the lecturer's own terminology and any numbered/named schemes exactly as given — a student is examined on those words
- Spell out every acronym in parentheses the first time it appears
- Condense, do not expand: never add facts, examples or context that are not in the topic
- Preserve the order the topic presents things in
- Simple Markdown only: **bold** and bulleted lists — no headings, no tables, no HTML
- Do not mention that you are summarising or refer to "the topic" or "the notes"`;

// Its own bucket rather than sharing simplify's. A student working through a
// 13-topic course summarises several in a sitting; on a shared limit that would
// starve Simplify (and vice versa) for ten minutes at a time.
const RATE_LIMIT = {
  namespace: 'summarize',
  limit: 10,
  windowMs: 10 * 60 * 1000,
};

// Far above simplify's 4,000: a topic is the whole unit, not one section.
// UUY-CYB 222's OWASP topic alone serialises to roughly 25,000 characters.
const MAX_TEXT_CHARS = 32000;

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Availability probe — lets the UI hide the Key points buttons on page load
  // when no provider is configured. Skips rate limiting.
  if (req.body?.probe) {
    return res.status(200).json({ configured: hasAnyProvider() });
  }

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'summarize');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many summaries requested from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  // Strong tier, unlike simplify's light one: the input is several times larger
  // and the job is to decide what matters, which is where a light model starts
  // padding. Each topic is cached forever per device, so it is paid for once.
  const chain = buildModelChain('strong');
  if (chain.length === 0) {
    return res.status(200).json({
      notConfigured: true,
      error: "Key points isn't connected yet — no model provider key is set (GEMINI_API_KEY / GROQ_API_KEY / OPENROUTER_API_KEY).",
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
      // Reasoning tokens share this budget. Roomier than simplify's 900 because
      // the recap itself is longer and the input takes more reasoning to sift.
      maxOutputTokens: 1400,
      prompt: `${setting ? `Course context: ${setting}\n\n` : ''}Lecture-note topic:\n\n${text}`,
      // Low temperature keeps the recap faithful ("condense, don't expand");
      // applied to Groq/OpenRouter only, never to Gemini (see model.js).
      temperature: 0.3,
    });

    if (outcome.text) {
      return res.status(200).json({ summary: outcome.text });
    }

    // Every provider failed (or produced no text). Distinguish load from bugs.
    const err = outcome.error;
    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    if (err && !isRateLimit) await captureApiError(err, { route: 'summarize', phase: 'all-providers-failed' });
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to summarise this topic. Please try again.',
    });
  } catch (err) {
    console.error('Summarize error:', err);
    await captureApiError(err, { route: 'summarize' });
    return res.status(200).json({ error: 'Failed to summarise this topic. Please try again.' });
  }
}
