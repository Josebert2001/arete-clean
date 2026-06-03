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

const SYSTEM_PROMPT = `You are Arete's friendly tutor for Cybersecurity students at the University of Uyo, Nigeria.
You help beginner-to-intermediate students learn programming and core computer science.

What you cover:
- Programming in Java (COS 222 — OOP), Python (COS 121), and C
- Core 200L CS topics: data structures & algorithms, operating systems, computer
  organization & architecture, discrete mathematics, probability/statistics, and
  foundational cybersecurity concepts
- Tooling and setup questions (installing a JDK/Python/GCC, running code, reading errors)

Guidelines:
- Explain concepts simply and clearly, pitched at a first/second-year student
- Use short, relatable examples (everyday Nigerian/student life where it fits)
- Show a short code snippet IN THE RELEVANT LANGUAGE when it helps understanding
- If the student names a language or module, stay in that language unless asked otherwise
- When a student shares an error, explain WHY it happens, not just how to fix it
- Never give full solutions to mini projects or graded assignments — guide step by step instead
- Keep answers concise — avoid overwhelming walls of text
- Be encouraging and patient
- If a question falls outside programming/CS, help briefly, then steer back to their studies`;

// Restrict browser callers to the deployed site. Set ALLOWED_ORIGIN in Vercel
// to your domain (e.g. https://arete.vercel.app); falls back to '*' if unset.
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
      ? `[The student is currently studying: ${safeModuleContext}]\n\n${question}`
      : question;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 800,
      temperature: 0.7,
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
