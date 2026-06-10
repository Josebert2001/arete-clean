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

import { createGroq } from '@ai-sdk/groq';
import { generateText, stepCountIs } from 'ai';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from './_lib/request-policy.js';
import { getStudentFromRequest } from './_lib/supabase.js';
import { COURSE_INDEX, MODULE_INDEX } from './_lib/courseData.js';
import { buildTutorTools } from './_lib/tutorTools.js';

const SYSTEM_PROMPT = `You are Arete's AI academic tutor for the Department of Cybersecurity, University of Uyo, Nigeria.
You cover the entire B.Sc. Cybersecurity programme — every course and every interactive programming module in the app.

COURSE CATALOGUE (index only — call getCourseOutline with a course code for full topics, textbooks, and exam tips):
${COURSE_INDEX}

INTERACTIVE PROGRAMMING MODULES (index only — call getModuleDetail for a module's theory, examples, and mini project):
${MODULE_INDEX}

USING YOUR TOOLS:
- getStudentProgress: call this FIRST whenever the student asks what to study or revise next, how they are doing, or anything personal to them. Base recommendations on their actual completed modules and quiz scores — name the weak quiz topics specifically.
- getCourseOutline: call this before answering detailed questions about a specific course (topics, textbooks, exam tips). Uploaded lecture notes exist for CYB 224 and are authoritative — prefer them over general knowledge.
- getModuleDetail: call this before answering questions about a specific track module's content or mini project.
- Never invent course content, textbooks, or exam tips — if the detail is not in the index above, fetch it with a tool.
- Do not mention tools or tool calls to the student; just use them and answer naturally.

HOW TO TUTOR:
- Identify the student's level from context (what they mention) and calibrate depth accordingly — 100L needs more scaffolding than 400L
- For programming questions (Java, Python, C): write clean, runnable code examples; explain WHY things work the way they do
- For cybersecurity concepts: use the exact terminology from the curriculum; mention relevant tools, standards, and frameworks
- For exam prep: fetch the course outline and point out what topics are commonly examined (catalogue entries include exam tips)
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

  // Availability probe — lets the UI show the unconfigured state on page load
  // instead of after the student has typed a question. Skips rate limiting.
  if (req.body?.probe) {
    return res.status(200).json({ configured: Boolean(process.env.GROQ_API_KEY) });
  }

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
    const groq = createGroq({ apiKey: GROQ_API_KEY });

    const student = await getStudentFromRequest(req);
    const studentContext = student
      ? `\n\nSTUDENT CONTEXT: The student is signed in (${student.user.email || 'no email on record'}). Their saved module progress and quiz scores are available through the getStudentProgress tool.`
      : '\n\nSTUDENT CONTEXT: The student is browsing anonymously, so no saved progress is available. If they ask about tracking or saving progress, mention that signing in keeps it synced across devices.';

    const userMessage = safeModuleContext
      ? `[Studying: ${safeModuleContext}]\n\n${question}`
      : question;

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: SYSTEM_PROMPT + studentContext,
      prompt: userMessage,
      tools: buildTutorTools(student),
      stopWhen: stepCountIs(5),
      maxOutputTokens: 1000,
      temperature: 0.65,
    });

    const answer = text || 'No response received.';
    return res.status(200).json({ answer });
  } catch (err) {
    console.error('Groq tutor error:', err);

    const isRateLimit = err?.statusCode === 429 || err?.status === 429;
    return res.status(200).json({
      error: isRateLimit
        ? 'Too many requests — the AI is busy. Wait a moment and try again.'
        : 'Failed to get a response. Please try again.',
    });
  }
}
