# Arete — CLAUDE.md

## Project Identity
Arete is an interactive learning platform for B.Sc. Cybersecurity students at the University of Uyo. It delivers a full 4-year curriculum browser, programming tracks (Java, Python, C — 37 modules total), an AI tutor, a code explainer, and an in-browser code playground.

## Stack
- **Frontend:** React 18, React Router v6, Tailwind CSS (custom theme), Vite (port 5173)
- **Backend:** Vercel serverless functions in `api/` (Node.js ESM)
- **Auth + DB:** Supabase (email OTP, PostgreSQL — profiles + user_progress + course_materials tables)
- **AI:** Groq API via Vercel AI SDK (`llama-3.3-70b-versatile`), streaming responses
- **Code execution:** JDoodle API (proxied through `api/run.js`)
- **Language:** JavaScript/JSX throughout — no TypeScript
- **Icons:** lucide-react | **Fonts:** Fraunces (display), Inter (body), JetBrains Mono (code)

## Dev Commands
```bash
npm run dev        # start Vite dev server on :5173
npm run build      # prebuild validates modules, then builds
npm run lint       # ESLint
npm test           # run the Vitest suite once (CI uses this)
npm run test:watch # run Vitest in watch mode
vercel dev         # needed for /api/* endpoints locally
node scripts/validate-modules.mjs  # validate module data structure
```

## Project Conventions
- **No TypeScript** — stay in `.jsx`/`.js`; do not introduce `.ts` files
- **No component libraries** — no Shadcn, MUI, etc.; everything is Tailwind + custom
- **Tailwind colors** — use the custom palette: `cream`, `paper`, `ink`, `coffee-*`, `ember`, `moss`, `rust`. Never hardcode hex in JSX.
- **Naming:** components are PascalCase `.jsx`; hooks are camelCase `.js`; data files are camelCase `.js`
- **Folder logic:** components in `src/components/`, pages are handled by routes in `App.jsx`, data in `src/data/`, utilities in `src/utils/`, Supabase client in `src/lib/`
- **ESLint:** unused vars are errors unless prefixed with `_`
- **No console.log** in committed code; API functions use `console.error` for errors only

## Architecture
```
Browser → React SPA (Vite)
           ├── React Router (14 routes in App.jsx)
           ├── AuthContext (Supabase OTP auth, profile state)
           ├── useProgress hook (localStorage + Supabase dual sync, 1s debounce)
           └── /api/* (Vercel serverless)
                ├── api/tutor.js   → Groq streaming (AI Tutor, rate: 8/10min/IP)
                ├── api/explainer.js → Groq (Code Explainer, rate: 8/10min/IP)
                └── api/run.js     → JDoodle (code execution, 20 runs/day free)
```

## Key Files Map
| File | Purpose |
|------|---------|
| `src/App.jsx` | Root router — all 14 routes, Error Boundary, auth watcher |
| `src/context/AuthContext.jsx` | Supabase auth state, signInWithEmail, signOut, refreshProfile |
| `src/components/useProgress.js` | Progress tracking hook — localStorage + Supabase sync |
| `src/lib/supabase.js` | Supabase client + token helpers |
| `src/utils/apiClient.js` | fetch wrapper for /api/* calls |
| `src/data/modules.js` | 13 Java modules (theory, code, quiz, project) |
| `src/data/pythonModules.js` | 12 Python modules |
| `src/data/cModules.js` | 12 C modules |
| `src/data/courses.js` | ~2131 lines — all 29 courses (100L–400L), topics, textbooks, exam tips |
| `src/data/trackConfig.js` | Track metadata config (java/python/c) |
| `api/tutor.js` | Groq streaming tutor with tools: getStudentProgress, getCourseOutline, getModuleDetail |
| `api/explainer.js` | Groq code explanation endpoint |
| `api/run.js` | JDoodle proxy — runs Java/C/C++/Python code |
| `api/_lib/supabase.js` | Server-side Supabase client using Bearer token from request |
| `vercel.json` | CSP, CORS headers, SPA rewrite rule |
| `scripts/validate-modules.mjs` | Pre-build module structure validator |

## Environment Variables
Must be set in `.env.local` for local dev (never commit this file):
```
GROQ_API_KEY              # AI Tutor + Code Explainer (Groq)
JDOODLE_CLIENT_ID         # Code Playground execution
JDOODLE_CLIENT_SECRET     # Code Playground execution
VITE_SUPABASE_URL         # Supabase project URL (exposed to browser)
VITE_SUPABASE_ANON_KEY    # Supabase anon key (exposed to browser)
ALLOWED_ORIGIN            # CORS restriction for /api/* (set to your domain)
```
For Vercel deployment, set all of the above in the Vercel dashboard — not in code.
For Supabase setup script only: also need `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_PAT`.

## External API Quirks
- **JDoodle:** Free plan = 20 executions/day total across ALL users. Do not add new language versions without checking JDoodle docs for version strings. Never expose `JDOODLE_CLIENT_ID` or `JDOODLE_CLIENT_SECRET` to the browser.
- **Groq:** Model is `llama-3.3-70b-versatile`. Rate limits are enforced in-memory per IP (not persistent across function cold starts). The tutor uses Vercel AI SDK streaming — response format is different from a plain `fetch`.
- **Supabase RLS:** Server-side functions (`api/_lib/supabase.js`) must forward the user's Bearer token for row-level security to apply. Never use the service role key in frontend code.

## Static Rules (always follow these)
- Read the relevant files before editing anything
- Never expose API keys or credentials in code or commits
- Never delete files without explicit user confirmation
- Never push directly to `main`/`master` — always use a branch
- Never install new dependencies without asking first
- Handle errors explicitly — no silent failures, no empty catch blocks
- Make the smallest change that solves the problem
- `src/data/courses.js` is very large (~2131 lines) — read only the relevant section before editing
- AI features gracefully degrade when keys are missing — preserve this behavior
- Rate limiting in `/api/*` is IP-based in-memory — do not remove or weaken it

## Out of Scope (do not touch unless explicitly asked)
- `supabase/` folder — migrations and config require deliberate schema changes
- `setup-supabase.mjs` — one-time setup script, not for routine edits
- `vercel.json` CSP/CORS headers — security-critical, confirm before changing
- `.env.local` and any `.env.*` files — never read or write secret values

## Testing — Important Context
The project uses **Vitest** (jsdom environment, `globals: true`) with `@testing-library/react` available for component tests.
- Config: `vitest.config.js` · setup file: `src/__tests__/setup.js` (imports `@testing-library/jest-dom`)
- Test files live in `src/__tests__/` as `*.test.js`. Current coverage is thin — `useProgress.test.js` (the progress hook) is the only suite so far.
- Run with `npm test` (single run) or `npm run test:watch`. CI runs `npm test` on every push.
- When writing new logic, add or extend a test if the function is testable in isolation — coverage beyond `useProgress` is still missing, so most of the app is untested.
- Do not add new test tooling (e.g. coverage providers, Playwright) without asking first.

## Common Tasks
- **Adding a module:** Edit the relevant data file (`modules.js`, `pythonModules.js`, `cModules.js`), run `npm run validate` to confirm structure
- **Adding a course:** Edit `src/data/courses.js` — read the existing structure first, it is large
- **Changing UI:** Use Tailwind with the custom color palette only; check Fraunces/Inter/JetBrains Mono for typography
- **Adding an API feature:** Add a new file in `api/`, add rate limiting matching the existing pattern in `api/tutor.js`, register it in tools registry
- **Auth changes:** Touch `AuthContext.jsx` and `src/lib/supabase.js` only — do not scatter auth logic into components
- **Progress changes:** All progress logic lives in `useProgress.js` — keep it there
