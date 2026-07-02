// ============================================================================
//  Arete — Lecture-Note Simplifier Serverless Function (Vercel)
//  Takes a dense lecture-note section and rewrites it in plain English for a
//  200-level student. Client caches results in localStorage, so each section
//  costs one Groq call per device.
//
//  Uses the same GROQ_API_KEY environment variable as api/tutor.js.
// ============================================================================

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';
import { captureApiError } from './_lib/sentry.js';

const SYSTEM_PROMPT = `You are Arete's lecture-note simplifier for B.Sc. Cybersecurity students at the University of Uyo, Nigeria. You will be given a dense excerpt from lecture notes. Rewrite it so a 200-level student understands it on first read.

Structure your response like this:
1. One sentence stating the core idea in everyday words
2. 2-4 short bullet points covering the key facts — spell out every acronym in parentheses the first time it appears
3. If (and only if) it genuinely helps, end with one relatable everyday analogy on its own line starting with "**Think of it like this:**"

Rules:
- Stay under 140 words total
- Plain English — no jargon unless you define it in the same sentence
- Do not invent facts that are not in the excerpt; simplify, don't expand
- Simple Markdown only: **bold** and bulleted lists — no headings, no tables, no HTML
- Do not mention that you are simplifying or refer to "the excerpt"`;

const RATE_LIMIT = {
  namespace: 'simplify',
  limit: 8,
  windowMs: 10 * 60 * 1000,
};

const MAX_TEXT_CHARS = 4000;

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Availability probe — lets the UI hide the Simplify buttons on page load
  // when the key is missing. Skips rate limiting.
  if (req.body?.probe) {
    return res.status(200).json({ configured: Boolean(process.env.GROQ_API_KEY) });
  }

  logRequest(req, 'simplify');
  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many simplify requests from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(200).json({
      notConfigured: true,
      error: "Simplify isn't connected yet — the GROQ_API_KEY environment variable is missing.",
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
    const groq = createGroq({ apiKey: GROQ_API_KEY });

    const { text: simplified } = await generateText({
      model: groq('openai/gpt-oss-120b'),
      system: SYSTEM_PROMPT,
      prompt: `${setting ? `Course context: ${setting}\n\n` : ''}Lecture-note excerpt:\n\n${text}`,
      // gpt-oss-120b reasons before answering; reasoning tokens share this
      // budget. Low effort + headroom keeps the rewrite from being cut off.
      maxOutputTokens: 900,
      temperature: 0.4,
      providerOptions: { groq: { reasoningEffort: 'low' } },
    });

    if (!simplified) {
      return res.status(200).json({ error: 'No simplification received. Please try again.' });
    }
    return res.status(200).json({ simplified });
  } catch (err) {
    console.error('Groq simplify error:', err);

    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    // A busy-AI 429 is expected load, not a bug — only report real failures.
    if (!isRateLimit) await captureApiError(err, { route: 'simplify' });
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to simplify this section. Please try again.',
    });
  }
}
