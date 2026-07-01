# Contributing to Arete

Arete is an interactive learning platform for B.Sc. Cybersecurity students at the
University of Uyo — a curriculum browser, programming tracks (Java/Python/C), an AI
tutor, a code explainer, and an in-browser playground.

This guide is for collaborators. If you're new to the repo, read `CLAUDE.md` first —
it's the source of truth for stack, conventions, and what's off-limits.

---

## TL;DR

```bash
npm install
npm run dev          # Vite dev server on :5173
vercel dev           # needed for /api/* endpoints locally
npm test             # Vitest, single run (CI runs this)
npm run validate     # validate module data structure
npm run lint         # ESLint
```

- Language is **JavaScript/JSX only** — no TypeScript, no component libraries (no MUI/Shadcn).
- Styling is **Tailwind with the custom palette** (`cream`, `paper`, `ink`, `coffee-*`,
  `ember`, `moss`, `rust`) — never hardcode hex in JSX.
- Work on a **branch**, open a **PR**. Don't push straight to `master`.

---

## The stack in one minute

| Layer | What |
|-------|------|
| Frontend | React 18, React Router v6, Tailwind, Vite |
| Backend | Vercel serverless functions in `api/` (Node ESM) |
| Auth + DB | Supabase (email OTP, Postgres with RLS) |
| AI | Groq (`openai/gpt-oss-120b`) via Vercel AI SDK, streaming |
| Code exec | JDoodle, proxied through `api/run.js` |

Architecture and the full file map live in `CLAUDE.md` — don't duplicate it here, read it there.

---

## How we work

1. **Branch off `master`.** Name it for the work: `fix/rate-limit-ip`, `feat/course-csc-301`.
2. **Read before you edit.** Especially `src/data/courses.js` (~2100 lines) — read only the
   section you're touching.
3. **Make the smallest change that solves the problem.** No drive-by refactors in a feature PR.
4. **Run the checks** before opening the PR:
   - `npm test`
   - `npm run lint`
   - `npm run validate` if you touched module data
   - `.harness/evals/checklist.md` — the project's own done-criteria
5. **Open a PR** with a short description of what and why. Keep PRs focused.

### Hard rules (these override convenience)
- Never commit secrets. `.env.local` and any `.env.*` are never read, written, or committed.
- Never expose `process.env.*` server secrets to the browser
  (`GROQ_API_KEY`, `JDOODLE_*`, service-role keys).
- Every `/api/*` endpoint keeps its IP-based rate limiting — don't remove or weaken it.
- AI/playground features degrade gracefully when keys are missing — preserve that.
- Don't touch `supabase/`, `setup-supabase.mjs`, or the `vercel.json` CSP/CORS headers
  without flagging it first — they're security-critical.
- No new npm dependencies without asking.

---

## Getting set up to run the full app

The frontend runs with just `npm run dev`. The AI tutor, code explainer, and playground
need the `/api/*` functions, which means `vercel dev` plus env vars in `.env.local`:

```
GROQ_API_KEY
JDOODLE_CLIENT_ID
JDOODLE_CLIENT_SECRET
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
ALLOWED_ORIGIN
```

You don't need real keys to work on most of the app — missing keys produce friendly
"not configured yet" responses by design. Ask the maintainer if you need access to a
shared dev environment; **don't** ask for the production keys to paste locally.

---

## Start here: security audit (first task)

Arete is pre-launch and most of the app is untested. The highest-leverage first
contribution is a security pass over the request path. These are the files that matter,
with what to look at:

| File | Look for |
|------|----------|
| `api/_lib/request-policy.js` | IP rate limiting + CORS. Store is in-memory per cold start (resets on redeploy/scale). `getClientIp` trusts `x-forwarded-for` — is that spoofable behind Vercel? Is `ALLOWED_ORIGIN` actually enforced, or just echoed? |
| `api/_lib/supabase.js` | Bearer-token → user resolution. Confirm RLS actually applies and no path uses the service-role key. |
| `api/run.js` | JDoodle proxy. Input validation (size caps exist), but: can a payload reach JDoodle that shouldn't? Any way to leak credit/usage info? |
| `api/tutor.js` | Groq streaming tutor with tools (`getStudentProgress`, `getCourseOutline`, `getModuleDetail`). **Prompt injection** — user input flows into the model; can a student make the tutor leak another student's progress or call tools out of scope? |
| `api/explainer.js` | Same prompt-injection surface as the tutor, simpler. |
| `vercel.json` | CSP, CORS, security headers. Is the CSP tight enough? Any `unsafe-*` that can be removed? |
| `src/context/AuthContext.jsx` + `src/lib/supabase.js` | Client auth/token handling. Token storage, session expiry, anything leaking to logs. |

**Workflow:** open one GitHub issue per finding (or a short audit issue with a checklist),
severity-tagged the way you would for a bounty. PoC where it helps. Fixes go in focused PRs,
one concern each. The security section of `.harness/evals/checklist.md` is the baseline to
hold the code to.

This plays to your strengths and tells us fast where Arete is weak before it goes public.

---

## After the audit — where help is wanted

- **Content:** courses in `src/data/courses.js`; modules in `modules.js` /
  `pythonModules.js` / `cModules.js`. Run `npm run validate` after.
- **Tests:** coverage is thin (`useProgress.test.js` is basically it). Anything testable
  in isolation is fair game.
- **Frontend polish:** within the existing design system only — Tailwind custom palette,
  Fraunces / Inter / JetBrains Mono.

The `.harness/skills/` folder has short playbooks (`content.md`, `api.md`, `feature.md`,
`debug.md`, `deploy.md`) for the common task types — skim the relevant one before starting.

---

## Questions

Open a draft PR or an issue and tag the maintainer. When in doubt about anything touching
auth, secrets, or deployment config — ask first, don't guess.
