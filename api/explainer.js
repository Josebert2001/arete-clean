// ============================================================================
//  Arete — Code Explainer Serverless Function (Vercel)
//  Sends pasted code (Java, Python, C, or C++) to the model chain and returns
//  a plain-English breakdown.
//
//  Uses the shared multi-provider chain (Gemini → Groq → OpenRouter, see
//  _lib/model.js) so a provider that rejects the request (e.g. Groq's free-tier
//  413/429) is transparently retried on the next one.
// ============================================================================

import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';
import { captureApiError } from './_lib/sentry.js';
import { buildModelChain, hasAnyProvider, generateTextWithFallback } from './_lib/model.js';

// Shared by both modes. The students these listings are set for were handed a
// lab manual rather than taught the code in it, so nothing may be assumed
// known: a call like `socket.AF_INET` or a slice like `s[::-1]` has to be
// explained the first time it appears, not name-dropped.
const COMMON_RULES = `Rules:
- Assume the student has never seen this library or this syntax before. They were given the listing without being taught it.
- Walk the code IN ORDER, top to bottom. Do not summarise a block and move on.
- Quote the actual line in backticks, then explain it underneath — every line that does something. Group only truly repetitive lines (a list of similar constants, say).
- Explain the vocabulary as you meet it: what a constant like \`AF_INET\` selects, what a function like \`pad()\` is for, what a slice like \`s[::-1]\` does, what an argument like \`1024\` means. One clear sentence each.
- Say WHY a line is there, not just what it does — the reason it appears in this program.
- Use plain English — no jargon without explanation. Be encouraging.
- Use simple Markdown only: **bold**, numbered or bulleted lists, and fenced code blocks tagged with the language — no tables, no HTML
- NEVER use LaTeX or math notation (no \`$\`, \`$$\`, or backslash commands like \`\\times\`) — the app doesn't render it. Write maths in plain text or \`inline code\`, e.g. \`O(n^2)\`, \`sum = n * (n + 1) / 2\`
- Use the conventions of the code's actual language (e.g. pointers for C, indentation for Python)`;

const SYSTEM_PROMPT = `You are Areté's code explainer for beginner university students.
When given code in any language (Java, Python, C, or C++), explain it clearly and simply.

Structure your response like this:
1. **What it does** — one or two sentences on the program as a whole
2. **What you need to know first** — each library, import or piece of syntax the code relies on, one line each
3. **Line by line** — walk the whole listing in order, quoting each line and explaining it
4. **What it prints** — the output when it runs, and where it comes from
5. **Watch out for** — any bug or common mistake in the code, said clearly but kindly
6. One short tip for improvement, if there is a useful one

${COMMON_RULES}`;

// Study mode: the same walkthrough, minus anything that answers the exam
// question the student is looking at. A written paper sets three kinds of code
// question — write this, debug this, explain this — and for the last two an
// ordinary walkthrough IS the answer. Withholding the explanation until after
// the reveal was the wrong fix: a student who cannot read the listing cannot
// attempt the question at all. So the code is taught in full and the verdict is
// withheld instead.
const STUDY_SYSTEM_PROMPT = `You are Areté's code explainer, helping a university student read a code listing that has been set as an exam question. They were never taught this code in class. Your job is to make sure they can READ it, so that they can then answer the question themselves.

Structure your response like this:
1. **What it does** — one or two sentences on the program as a whole
2. **What you need to know first** — each library, import or piece of syntax the code relies on, one line each
3. **Line by line** — walk the whole listing in order, quoting each line and explaining it
4. **What happens when it runs** — trace the flow, and say what each step produces

CRITICAL — this is an exam question, not a code review:
- Do NOT say whether the code is correct, buggy, unsafe or badly written.
- Do NOT point out faults, mistakes, missing lines or things to fix, even if you can see them. Explain what each line DOES and leave the judgement to the student.
- Do NOT suggest improvements or rewrites, and do NOT write the answer to the question.
- If a line looks wrong to you, still describe only its actual behaviour, plainly and without hinting.
- End with one sentence telling the student what to look at closely for themselves — never what you found.

${COMMON_RULES}`;

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
    return res.status(200).json({ configured: hasAnyProvider() });
  }

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'explainer');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many explainer requests from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  // Code explanation benefits from the strong model.
  const chain = buildModelChain('strong');
  if (chain.length === 0) {
    return res.status(200).json({
      notConfigured: true,
      explanation: "The Code Explainer isn't connected yet — no model provider key is set. Add GEMINI_API_KEY (or GROQ_API_KEY / OPENROUTER_API_KEY) in your Vercel project settings and redeploy.",
    });
  }

  const { code, language, mode } = req.body || {};

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'No code provided.' });
  }
  // 8,000 rather than 5,000 because the in-app "Explain this code" buttons send
  // whole lecture-note listings, not hand-typed snippets: UUY-CYB 221's
  // Practical 12 solution alone is 5.6k. Keep MAX_EXPLAIN_CHARS in
  // src/utils/explainCode.js in step, or those buttons offer a call this rejects.
  if (code.length > 8000) {
    return res.status(400).json({ error: 'Code exceeds the 8,000 character limit.' });
  }

  const lang = Object.hasOwn(LANGUAGES, language) ? LANGUAGES[language] : undefined; // undefined => let the model auto-detect

  // Anything other than an explicit 'study' gets the full walkthrough, so the
  // paste-your-own Code Explainer page is unaffected by the new mode.
  const study = mode === 'study';

  try {
    const outcome = await generateTextWithFallback({
      chain,
      system: study ? STUDY_SYSTEM_PROMPT : SYSTEM_PROMPT,
      prompt: `${study
        ? 'Teach this listing line by line so the student can read it themselves. Remember: no verdict on whether it is correct.'
        : 'Explain this'} ${lang ? lang.label : ''} code${lang ? '' : ' (detect the language first)'}:\n\n\`\`\`${lang ? lang.fence : ''}\n${code}\n\`\`\``,
      // Reasoning tokens share this budget; the chain keeps effort low so the
      // explanation isn't cut off. Line-by-line output is long — a 100-line
      // practical listing needs the headroom, and a walkthrough that stops in
      // the middle of the file is worse than none.
      maxOutputTokens: 3000,
      // Lower temperature for accurate, deterministic explanations; applied to
      // Groq/OpenRouter only, never to Gemini (see model.js).
      temperature: 0.5,
    });

    if (outcome.text) {
      return res.status(200).json({ explanation: outcome.text });
    }

    // Every provider failed (or produced no text). Distinguish load from bugs.
    const err = outcome.error;
    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    if (err && !isRateLimit) await captureApiError(err, { route: 'explainer', phase: 'all-providers-failed' });
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to analyze the code. Please try again.',
    });
  } catch (err) {
    console.error('Explainer error:', err);
    await captureApiError(err, { route: 'explainer' });
    return res.status(200).json({ error: 'Failed to analyze the code. Please try again.' });
  }
}
