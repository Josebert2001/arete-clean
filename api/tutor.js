// ============================================================================
//  Arete — AI Tutor Serverless Function (Vercel)
//  Proxies student questions to Groq's Llama 3.3 70B model.
//
//  SETUP:
//  1. Get a free API key at https://console.groq.com  (no credit card needed)
//  2. In Vercel project → Settings → Environment Variables, add:
//       GROQ_API_KEY = your_key_here
//  3. Redeploy. The AI Tutor goes live.
// ============================================================================

import Groq from 'groq-sdk';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';
import { COURSE_KNOWLEDGE, MODULE_KNOWLEDGE, LECTURE_NOTES_KNOWLEDGE } from './_lib/courseData.js';

const SYSTEM_PROMPT = `You are Arete's AI academic tutor for the Department of Cybersecurity, University of Uyo, Nigeria.
You have complete knowledge of the entire B.Sc. Cybersecurity programme — every course, every topic, and every interactive programming module available in the app.

WHAT YOU KNOW:
${COURSE_KNOWLEDGE}

${LECTURE_NOTES_KNOWLEDGE}

${MODULE_KNOWLEDGE}

HOW TO TUTOR:
- When a student asks about a specific course or module, draw directly on the detailed knowledge above
- Identify the student's level from context (what they mention) and calibrate depth accordingly — 100L needs more scaffolding than 400L
- For programming questions (Java, Python, C): write clean, runnable code examples; explain WHY things work the way they do
- For cybersecurity concepts: use the exact terminology from the curriculum above; mention relevant tools, standards, and frameworks
- For exam prep: point out what topics are commonly examined (the course knowledge above includes exam tips)
- When a student shares an error: explain the root cause, not just the fix
- Use short, relatable analogies; Nigerian/student-life context where it fits naturally
- Never give full solutions to assignments or graded coursework — guide step by step with hints
- Keep answers focused and scannable — use short paragraphs or numbered steps for complex answers
- Be warm, encouraging, and patient; exams and projects are stressful
- If asked about something outside the programme (e.g. a random general topic), help briefly then gently note you are optimised for the Cybersecurity curriculum
- If context suggests the student is on a specific module (passed via [Studying:] tag), use that module's content to answer precisely`;

const RATE_LIMIT = {
  namespace: 'tutor',
  limit: 8,
  windowMs: 10 * 60 * 1000,
};

export default async function handler(req, res) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  logRequest(req, 'tutor');
  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many tutor requests from this device. Please wait a few minutes and try again.',
      kind: 'rate_limited',
    });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(200).json({
      notConfigured: true,
      answer: "The AI Tutor isn't connected yet — the GROQ_API_KEY environment variable is missing. Add it in your Vercel project settings and redeploy.",
    });
  }

  const { question, moduleContext } = req.body || {};

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'No question provided.' });
  }
  if (question.length > 2000) {
    return res.status(400).json({ error: 'Question exceeds 2,000 character limit.' });
  }
  const safeModuleContext = typeof moduleContext === 'string' ? moduleContext : '';

  try {
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    const userMessage = safeModuleContext
      ? `[Studying: ${safeModuleContext}]\n\n${question}`
      : question;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 1000,
      temperature: 0.65,
    });

    const answer = completion.choices[0]?.message?.content ?? 'No response received.';
    return res.status(200).json({ answer });
  } catch (err) {
    console.error('Groq tutor error:', err);

    const isRateLimit = err?.status === 429;
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to get a response. Please try again.',
    });
  }
}
