# Areté — CLAUDE.md

## Project Identity
Areté is an interactive learning platform for University of Uyo students. It delivers a full 4-year curriculum browser, programming tracks (Java, Python, C — 37 modules) plus a hands-on Security track (12 CTF-style capture-the-flag rooms; 49 modules total), an AI tutor, a code explainer, and an in-browser code playground.

It is multi-department. Two departments have fully-authored catalogues — **Cybersecurity** (`src/data/courses.js`, 57 courses) and **Data Science** (`src/data/dataScienceCourses.js`, 55 courses). Students from any other department sign up in **foundation mode** (`department = 'general'`) and get the ~22 cross-departmental courses (GST/MTH/PHY/STA/COS/CSC/ENT/INS) plus all four tracks. Their typed department name lands in `profiles.department_other` — the demand signal for which catalogue to author next. The registry lives in `src/data/departments.js`; pages resolve the signed-in student's catalogue through `src/data/useCatalogue.js` (lazy, code-split per department). Students change department or level any time at `/profile`, which is also how a foundation student moves onto their real catalogue once it is authored.

**Department catalogues are standalone** — they do NOT import each other's course lists. The overlap between programmes is smaller than it looks (Data Science takes GST 211/311 and MTH 211/212/223 where Cybersecurity takes GST 212/312), and each department frames its shared courses for its own students; cross-importing would also drag one department's whole payload into another's chunk. The single exception is **lecture notes**: those are transcribed from the lecturer's workbook, so every catalogue imports the one copy in `src/data/lectureNotes/`.

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
           ├── React Router (15 routes in App.jsx)
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
| `src/App.jsx` | Root router — all 15 routes, Error Boundary, auth watcher |
| `src/context/AuthContext.jsx` | Supabase auth state, signInWithEmail, signOut, refreshProfile |
| `src/components/useProgress.js` | Progress tracking hook — localStorage + Supabase sync |
| `src/lib/supabase.js` | Supabase client + token helpers |
| `src/utils/apiClient.js` | fetch wrapper for /api/* calls |
| `src/data/modules.js` | 13 Java modules (theory, code, quiz, project) |
| `src/data/pythonModules.js` | 12 Python modules |
| `src/data/cModules.js` | 12 C modules |
| `src/data/securityModules.js` | 12 Security "rooms" (theory + quiz + an embedded CTF `challenge`); flags stored as SHA-256 hashes |
| `src/components/FlagChallenge.jsx` | Renders a module's CTF challenge; validates the flag client-side via Web Crypto SHA-256 (no backend); escalating hints, marks the module complete on solve |
| `src/data/courses.js` | ~7800 lines — all Cybersecurity courses (100L–400L), topics, textbooks, exam tips; the 22 shared courses carry `crossDepartmental: true` |
| `src/data/departments.js` | Department registry (cybersecurity + dataScience = full, general = foundation) + lazy catalogue loaders + `YEAR_LEVELS` (the lightweight level list — import this, not courses.js, when a page only needs to validate/render a level) + `materialsDepartmentFor()` (which `course_materials.department` pool a course's uploads belong to) |
| `src/data/useCatalogue.js` | Hook resolving the signed-in student's department catalogue; status `loading \| ready \| error` — always handle `error` or the page hangs on a failed chunk load. Stays `loading` until auth/profile settle, so a student never sees another department's catalogue flash first |
| `src/data/dataScienceCourses.js` | ~2000 lines — the full B.Sc. Data Science catalogue (structure transcribed from the Students' Information Handbook Ch.4 §4.1). Standalone: imports only `lectureNotes/*` |
| `src/components/ProfileForm.jsx` | Shared profile form (name, reg number, level, department picker) used by both SetupProfile and ProfileSettings, so validation can't drift |
| `src/pages/ProfileSettings.jsx` | `/profile` — edit name/level/department after signup; clears `selected_courses` on a department switch |
| `src/components/CoursePicker.jsx` | Foundation-mode students pin the shared courses their programme takes → `profiles.selected_courses` (NULL = auto-derive; Planner + Courses filter respect it) |
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
| `supabase/migrations/20260728*` | Multi-department columns: `profiles.department/department_other/selected_courses`, `course_materials.department` (applied). Every migration must end with `NOTIFY pgrst, 'reload schema';` or the API rejects the new columns with PGRST204 |
| `supabase/migrations/20260801000000_materials_department_backfill.sql` | Sorts existing `course_materials` rows into their pool ('general' for shared courses) + indexes both lookup pairs. **Run manually in the Supabase SQL editor** |
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
- **Adding a department:** Query demand first (`SELECT lower(trim(department_other)), count(*) FROM profiles WHERE department_other IS NOT NULL GROUP BY 1 ORDER BY 2 DESC`). Then, three steps:
  1. Author `src/data/<dept>Courses.js` — **self-contained**, exporting `courses`, `LEVELS` and `levelMeta` (same shape as `courses.js`; copy `dataScienceCourses.js` as the model). Re-author the shared courses with your department's framing rather than importing another catalogue; do import the shared `./lectureNotes/*.js` for any course that has them, or students lose the transcribed workbook content. Mark SIWES courses `subject: 'siwes'` — the Course Hub keys its SIWES section off that, not off the level.
  2. Register it in `departments.js` with `status: 'full'` and a `loadCatalogue()` importing it. `SELECTABLE_DEPARTMENTS` and the SetupProfile/ProfileSettings pickers pick it up automatically.
  3. Add it to the `DEPARTMENTS` registry in `api/_lib/courseData.js` (`{ knowledge: buildKnowledgeFromCourses(...), courses }`) and to `DEPARTMENT_LABELS` in `api/tutor.js`, so the tutor scopes its catalogue index, course lookups and uploaded-note pool to that department.

  Existing foundation students of that department keep their progress — it is keyed per-user, not per-department — and move themselves onto the new catalogue at `/profile`.
- **Changing UI:** Use Tailwind with the custom color palette only; check Fraunces/Inter/JetBrains Mono for typography
- **Adding an API feature:** Add a new file in `api/`, add rate limiting matching the existing pattern in `api/tutor.js`, register it in tools registry
- **Auth changes:** Touch `AuthContext.jsx` and `src/lib/supabase.js` only — do not scatter auth logic into components
- **Progress changes:** All progress logic lives in `useProgress.js` — keep it there
