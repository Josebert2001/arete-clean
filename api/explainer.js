// ============================================================================
//  Arete — Code Explainer Serverless Function (Vercel)
//  Sends pasted code (Java, Python, C, or C++) to Groq and returns a
//  plain-English breakdown.
//
//  Uses the same GROQ_API_KEY environment variable as api/tutor.js.
// ============================================================================

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';

const SYSTEM_PROMPT = `You are Arete's code explainer for beginner Cybersecurity students.
When given code in any language (Java, Python, C, or C++), explain it clearly and simply.

Structure your response like this:
1. One sentence on what the program does overall
2. A line-by-line (or block-by-block) walkthrough of the important parts
3. What the output will be when the code runs
4. Any common mistakes or bugs you notice
5. One short tip for improvement (if applicable)

Rules:
- Use plain English — no jargon without explanation
- Be concise and encouraging
- Format code references using backticks, e.g. \`int x = 5;\`
- Use simple Markdown only: **bold**, numbered or bulleted lists, and fenced code blocks tagged with the language — no tables, no HTML
- Use the conventions of the code's actual language (e.g. pointers for C, indentation for Python)
- If the code has a bug, point it out clearly but kindly`;

// Languages we offer a syntax hint for; anything else falls back to auto-detect.
const LANGUAGES = {
  java:   { label: 'Java',   fence: 'java' },
  python: { label: 'Python', fence: 'python' },
  c:      { label: 'C',      fence: 'c' },
  cpp:    { label: 'C++',    fence: 'cpp' },
};

const RATE_LIMIT = {
  namespace: 'explainer',
  limit: 8,
  windowMs: 10 * 60 * 1000,
};

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Availability probe — lets the UI show the unconfigured state on page load
  // instead of after the student has typed code. Skips rate limiting.
  if (req.body?.probe) {
    return res.status(200).json({ configured: Boolean(process.env.GROQ_API_KEY) });
  }

  logRequest(req, 'explainer');
  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many explainer requests from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(200).json({
      notConfigured: true,
      explanation: "The Code Explainer isn't connected yet — the GROQ_API_KEY environment variable is missing. Add it in your Vercel project settings and redeploy.",
    });
  }

  const { code, language } = req.body || {};

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'No code provided.' });
  }
  if (code.length > 5000) {
    return res.status(400).json({ error: 'Code exceeds the 5,000 character limit.' });
  }

  const lang = LANGUAGES[language]; // undefined => let the model auto-detect

  try {
    const groq = createGroq({ apiKey: GROQ_API_KEY });

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: SYSTEM_PROMPT,
      prompt: `Explain this ${lang ? lang.label : ''} code${lang ? '' : ' (detect the language first)'}:\n\n\`\`\`${lang ? lang.fence : ''}\n${code}\n\`\`\``,
      maxOutputTokens: 1000,
      temperature: 0.5,
    });

    const explanation = text || 'No explanation received.';
    return res.status(200).json({ explanation });
  } catch (err) {
    console.error('Groq explainer error:', err);

    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to analyze the code. Please try again.',
    });
  }
}
