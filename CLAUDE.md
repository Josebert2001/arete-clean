# Areté — CLAUDE.md

## Project Identity
Areté is an interactive learning platform for B.Sc. Cybersecurity students at the University of Uyo. It delivers a full 4-year curriculum browser, programming tracks (Java, Python, C — 37 modules) plus a hands-on Security track (12 CTF-style capture-the-flag rooms; 49 modules total), an AI tutor, a code explainer, and an in-browser code playground.

## Stack
- **Frontend:** React 18, React Router v6, Tailwind CSS (custom theme), Vite (port 5173)
- **Backend:** Vercel serverless functions in `api/` (Node.js ESM)
- **Auth + DB:** Supabase (email OTP, PostgreSQL — profiles + user_progress + course_materials tables)
- **AI:** Groq API via Vercel AI SDK (`openai/gpt-oss-120b`), streaming responses
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
                ├── api/tutor.js   → model-chain streaming: Gemini 3.5 Flash → Flash-Lite → Groq → OpenRouter (AI Tutor, rate: 8/10min/IP)
                ├── api/explainer.js → Groq (Code Explainer, rate: 8/10min/IP)
                ├── api/research.js → Groq compound-mini web search (Explain-this, signed-in, rate: 4/10min/IP)
                ├── api/extract.js  → text extraction from uploaded course materials (signed-in, rate: 20/10min/IP)
                ├── api/simplify.js → Groq plain-English rewrite of lecture-note sections (rate: 8/10min/IP)
                ├── api/run.js     → JDoodle (code execution, 20 runs/day free)
                └── api/google/*   → Google OAuth (Calendar sync + Drive import); see api/_lib/googleAuth.js
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
| `src/data/securityModules.js` | 12 Security "rooms" (theory + quiz + an embedded CTF `challenge`); flags stored as SHA-256 hashes |
| `src/components/FlagChallenge.jsx` | Renders a module's CTF challenge; validates the flag client-side via Web Crypto SHA-256 (no backend); escalating hints, marks the module complete on solve |
| `src/data/courses.js` | ~2131 lines — all 29 courses (100L–400L), topics, textbooks, exam tips |
| `src/data/trackConfig.js` | Track metadata config (java/python/c) |
| `api/tutor.js` | Streaming tutor on the multi-provider chain (`api/_lib/model.js`) with tools: getStudentProgress, getCourseOutline, getModuleDetail |
| `api/explainer.js` | Groq code explanation endpoint |
| `api/research.js` | Explain-this — `groq/compound-mini` web search over a highlighted passage; signed-in only, returns explanation + sources |
| `src/components/ExplainSelection.jsx` | Wraps readable content; shows "Explain this" on text selection, renders inline explanation card |
| `api/run.js` | JDoodle proxy — runs Java/C/C++/Python code |
| `api/extract.js` | Extracts text from freshly uploaded course materials (.txt/.docx/.pdf via mammoth + pdf-parse) so the tutor can reference lecture notes; signed-in only |
| `api/simplify.js` | "Simplify this" — Groq rewrite of a dense lecture-note section in plain English; client caches results in localStorage |
| `src/components/LectureNotes.jsx` | Renders lecture-note sections (definition/bullets/termlist/table/mosca/…); termlists double as flashcards; hosts the Simplify button |
| `api/_lib/supabase.js` | Server-side Supabase client using Bearer token from request |
| `api/_lib/googleAuth.js` | Google OAuth2 client, signed `state` (CSRF), service-role client — the only file allowed to use `SUPABASE_SERVICE_ROLE_KEY` |
| `api/_lib/googleEvents.js` | PlanEvent → Google Calendar event resource (duplicates `src/utils/ics.js`'s date/RRULE math for the Node context — keep both in sync by hand) |
| `api/google/connect.js` \| `callback.js` \| `status.js` \| `disconnect.js` | "Connect Google" OAuth flow (Calendar + Drive scopes), independent of Supabase's own Google sign-in |
| `api/google/calendar-sync.js` | Pushes a generated study plan into a dedicated secondary Google Calendar (idempotent re-sync) |
| `src/utils/googleApi.js` \| `src/components/useGoogleConnection.js` \| `src/components/GoogleConnectButton.jsx` | Frontend Google-connection plumbing, used by `src/pages/Planner.jsx` |
| `supabase/migrations/20260719000000_google_connections.sql` | `google_connections` table + RLS — run manually in the Supabase SQL editor, never via Claude |
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
VITE_SENTRY_DSN           # Sentry error monitoring — frontend (optional; no-op if unset)
SENTRY_DSN                # Sentry error monitoring — /api/* serverless (optional)
GOOGLE_CLIENT_ID          # Google OAuth (Calendar sync + Drive import) — api/google/*
GOOGLE_CLIENT_SECRET      # Google OAuth — also keys the signed `state` HMAC, never expose to the browser
GOOGLE_REDIRECT_URI       # Must exactly match a redirect URI registered on the Google OAuth client
SUPABASE_SERVICE_ROLE_KEY # Now also a live runtime secret for api/_lib/googleAuth.js (was previously local-shell-only, for setup-supabase.mjs)
```
For Vercel deployment, set all of the above in the Vercel dashboard — not in code.
For Supabase setup script only: also need `SUPABASE_PAT`.

Drive import (when Phase 4 is built) additionally needs client-exposed `VITE_GOOGLE_API_KEY` and `VITE_GOOGLE_APP_ID` for the Google Picker widget.

## External API Quirks
- **JDoodle:** Free plan = 20 executions/day total across ALL users. Do not add new language versions without checking JDoodle docs for version strings. Never expose `JDOODLE_CLIENT_ID` or `JDOODLE_CLIENT_SECRET` to the browser.
- **Groq:** Model is `openai/gpt-oss-120b`. Rate limits are enforced in-memory per IP (not persistent across function cold starts). The tutor uses Vercel AI SDK streaming — response format is different from a plain `fetch`.
- **Groq compound-mini (`api/research.js`):** A Groq *system* with built-in web search — it manages its own tools server-side, so don't wire custom AI SDK `tools` into it (they'd conflict). Lower limits than plain models (200 RPM, 8K max output). Cited web results come back on `result.sources`.
- **Supabase RLS:** Server-side functions (`api/_lib/supabase.js`) must forward the user's Bearer token for row-level security to apply. Never use the service role key in frontend code.
- **Google OAuth (`api/google/*`):** Separate from Supabase's own Google sign-in (`AuthContext.jsx`'s `signInWithGoogle`) — that's a login method with no extra scopes; this is a feature-level grant (Calendar + Drive) requested once via `api/google/connect.js` regardless of how the student logged in. Uses `drive.file` (not `drive.readonly`) deliberately — it's a non-sensitive scope so it skips Google's OAuth verification review, but it only grants access to files the user picks through Google's Picker widget, never a server-side listing of their existing Drive. The Picker widget (Phase 4/Drive import) needs a scoped `vercel.json` CSP addition (`apis.google.com`, `docs.google.com`, `googleapis.com`) — confirm with the user before touching it, same as any other CSP change. Calendar sync needs no CSP change (plain OAuth redirect).

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
- **Adding a module:** Edit the relevant data file (`modules.js`, `pythonModules.js`, `cModules.js`, `securityModules.js`), run `npm run validate` to confirm structure. A track is registered in `trackMeta.js` (metadata + `moduleIndex`) and `trackConfig.js` (lazy loader); the generic `/tracks/:lang/:id` route picks it up automatically. Security modules add a `challenge` object (validated by `validate-modules.mjs`) and render a Challenge tab; they omit the JDoodle playground.
- **Adding a course:** Edit `src/data/courses.js` — read the existing structure first, it is large
- **Changing UI:** Use Tailwind with the custom color palette only; check Fraunces/Inter/JetBrains Mono for typography
- **Adding an API feature:** Add a new file in `api/`, add rate limiting matching the existing pattern in `api/tutor.js`, register it in tools registry
- **Auth changes:** Touch `AuthContext.jsx` and `src/lib/supabase.js` only — do not scatter auth logic into components
- **Progress changes:** All progress logic lives in `useProgress.js` — keep it there
