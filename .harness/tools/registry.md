# Tools Registry

Every external service this project calls. Check here before adding any new API call.

---

## Groq (AI Tutor + Code Explainer + Explain-this)

- **What it does:** LLM inference via `openai/gpt-oss-120b` (streaming tutor conversations, one-shot code explanations) and `groq/compound-mini` (web-search-backed "Explain-this" over a highlighted passage)
- **When to use:** User asks AI Tutor (`/tutor`), Code Explainer (`/explainer`), or Explain-this (`api/research.js`) features; adding new AI-driven endpoints
- **How to call it:**
  ```js
  // api/tutor.js pattern (streaming)
  import { createGroq } from '@ai-sdk/groq';
  import { streamText } from 'ai';
  const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
  const result = streamText({ model: groq('openai/gpt-oss-120b'), messages, tools });
  return result.toDataStreamResponse();
  ```
  ```js
  // api/research.js pattern (web search, non-streaming — compound-mini)
  const result = await generateText({ model: groq('groq/compound-mini'), system, prompt });
  // cited URLs come back on result.sources
  ```
- **What NOT to do:** Never call Groq directly from the browser; never expose `GROQ_API_KEY` in `VITE_*` env vars; don't use a different model without confirming it's available on the free Groq plan; don't attach custom AI SDK `tools` to `groq/compound-mini` — it runs its own tools server-side
- **Rate limits:** In-memory IP rate limiting applied in each API function — tutor: 8 req/10min/IP; explainer: 8 req/10min/IP; research: 4 req/10min/IP (signed-in only). compound-mini itself: 200 RPM, 8K max output

---

## JDoodle (Code Playground)

- **What it does:** Executes Java, C, C++, and Python3 code in a sandboxed environment
- **When to use:** User clicks "Run" in the CodePlayground component; adding support for a new language
- **How to call it:**
  ```js
  // api/run.js pattern
  const res = await fetch('https://api.jdoodle.com/v1/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      script, language, versionIndex,
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET
    })
  });
  ```
  Language/version strings (verified 2026-03-26, see api/run.js): `java`/`6`, `c`/`7`, `cpp17`/`3`, `python3`/`6`
- **What NOT to do:** Never expose `JDOODLE_CLIENT_ID` or `JDOODLE_CLIENT_SECRET` to the browser; don't add new language version strings without checking JDoodle's current version list; don't remove the 10 runs/10min/IP rate limit
- **Cost/rate limits:** Free plan = **20 executions/day** across all users — this is a hard shared limit. Treat it as precious.

---

## Supabase (Auth + Database)

- **What it does:** Email OTP authentication, user profiles, progress tracking, course materials storage
- **When to use:** Auth flows, reading/writing user progress, fetching course materials
- **How to call it (frontend):**
  ```js
  // src/lib/supabase.js
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  ```
  ```js
  // api/_lib/supabase.js (server-side — uses user's Bearer token for RLS)
  const token = req.headers.authorization?.replace('Bearer ', '');
  const supabase = createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
  ```
- **What NOT to do:** Never use `SUPABASE_SERVICE_ROLE_KEY` in frontend code; never bypass RLS by using the service role key in API functions for user data; never store sensitive data in localStorage (auth tokens are managed by Supabase SDK)
- **Tables:** `profiles` (user data), `user_progress` (quiz scores + completed modules), `course_materials` (PDFs/resources)
- **Auth method:** Email OTP only — no passwords, no OAuth currently

---

## Vercel AI SDK (`ai` package)

- **What it does:** Provides `streamText`, `generateText`, and streaming response helpers that work with Vercel's edge/serverless runtime
- **When to use:** Any server-side AI call; must be used instead of raw Groq SDK for streaming to work correctly in Vercel functions
- **How to call it:** See Groq entry above — `streamText` + `result.toDataStreamResponse()`
- **What NOT to do:** Don't call `.toDataStreamResponse()` in non-streaming contexts; don't use v5 AI SDK patterns — this project uses v6 (`ai@^6.0.0`)

---

## MCP Servers
None configured in this project.

---

## Tool Call Rules
- Always check this registry before calling any external API
- Never add a new API call without adding it to this registry first
- Prefer read operations before write/mutate operations
- All `/api/*` functions must have IP-based rate limiting matching the existing pattern
- Server-side functions must never expose secrets in response bodies or error messages
