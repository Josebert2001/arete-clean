# Skill: API / Serverless Function Work

## Trigger
User wants to add, modify, or debug a Vercel serverless function in `api/`.

## Context needed — read these first
- The specific `api/*.js` file being changed
- `api/_lib/supabase.js` if the function touches user data
- `.harness/tools/registry.md` for rate limits and API patterns
- `vercel.json` if CORS or headers are relevant

## Steps
1. Read the existing API function in full before editing
2. Confirm the function follows the existing pattern:
   - HTTP method check at the top
   - CORS headers set
   - IP-based rate limiting (copy the pattern from `api/tutor.js`)
   - Input validation (check for required fields, validate types)
   - Error responses use `res.status(4xx/5xx).json({ error: '...' })` — never expose stack traces
   - Secrets accessed via `process.env.*` only — never from request body or query params
3. For AI endpoints: use Vercel AI SDK streaming pattern, not raw fetch
4. For Supabase: use `api/_lib/supabase.js` with Bearer token forwarding for RLS
5. Test locally with `vercel dev` — not `npm run dev` (Vite won't serve `/api/*`)
6. Register any new external API in `.harness/tools/registry.md`

## Rate Limiting Pattern (copy this exactly)
```js
const rateLimitMap = new Map();
const RATE_LIMIT = 10;      // max requests
const WINDOW_MS = 10 * 60 * 1000;  // 10 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, start: now };
  if (now - record.start > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return false;
  }
  if (record.count >= RATE_LIMIT) return true;
  rateLimitMap.set(ip, { ...record, count: record.count + 1 });
  return false;
}
```

## Guardrails
- Never return secrets, stack traces, or internal paths in error responses
- Never skip rate limiting on a new endpoint
- Never use `SUPABASE_SERVICE_ROLE_KEY` for user-scoped queries — use the Bearer token pattern
- Never call JDoodle directly from a component — always proxy through `api/run.js`
- The rate limit map is in-memory — it resets on cold start; this is expected behavior, do not try to persist it

## Eval
- [ ] `vercel dev` starts without errors
- [ ] Endpoint returns correct response shape
- [ ] Rate limiting triggers correctly after the limit
- [ ] Secrets are not present in response body or headers
- [ ] CORS headers allow the correct origin
- [ ] New endpoint documented in `.harness/tools/registry.md`

## Example
Input: "Add an endpoint that generates a quiz question from a topic"
- Create `api/quiz-gen.js`
- Add IP rate limit (e.g., 5 req/10min)
- Call Groq via Vercel AI SDK `generateText` (not streaming, since it's one-shot)
- Validate input: topic must be a non-empty string
- Return `{ question, options, correct, explanation }`
- Register in `.harness/tools/registry.md`
