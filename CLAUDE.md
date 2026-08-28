# Areté — CLAUDE.md

## Project Identity
Areté is an interactive learning platform for University of Uyo students. It delivers a full 4-year curriculum browser, programming tracks (Java, Python, C — 37 modules) plus a hands-on Security track (12 CTF-style capture-the-flag rooms; 49 modules total), an AI tutor, a code explainer, and an in-browser code playground.

It is multi-department. Two departments have fully-authored catalogues — **Cybersecurity** (`src/data/courses.js`, 57 courses) and **Data Science** (`src/data/dataScienceCourses.js`, 55 courses). Students from any other department sign up in **foundation mode** (`department = 'general'`) and get the ~22 cross-departmental courses (GST/MTH/PHY/STA/COS/CSC/ENT/INS) plus all four tracks. Their typed department name lands in `profiles.department_other` — the demand signal for which catalogue to author next. The registry lives in `src/data/departments.js`; pages resolve the signed-in student's catalogue through `src/data/useCatalogue.js` (lazy, code-split per department). Students change department or level any time at `/profile`, which is also how a foundation student moves onto their real catalogue once it is authored.

**Department catalogues are standalone** — they do NOT import each other's course lists. The overlap between programmes is smaller than it looks (Data Science takes GST 211/311 and MTH 211/212/223 where Cybersecurity takes GST 212/312), and each department frames its shared courses for its own students; cross-importing would also drag one department's whole payload into another's chunk. The single exception is **lecture notes**: those are transcribed from the lecturer's workbook, so every catalogue imports the one copy in `src/data/lectureNotes/`.

## Stack
- **Frontend:** React 18, React Router v7, Tailwind CSS (custom theme), Vite (port 5173)
- **Backend:** Vercel serverless functions in `api/` (Node.js ESM)
- **Auth + DB:** Supabase (email OTP, PostgreSQL — profiles + user_progress + course_materials tables)
- **AI:** Groq API via Vercel AI SDK (`openai/gpt-oss-120b`), streaming responses
- **Code execution:** JDoodle API (proxied through `api/run.js`)
- **Language:** JavaScript/JSX throughout — no TypeScript
- **Icons:** lucide-react | **Fonts:** Fraunces (display), Inter (body), JetBrains Mono (code)

## Dev Commands
```bash
npm run dev        # start Vite dev server on :5173
npm run build      # prebuild validates modules → vite build → SSR build → prerender
npm run build:app  # just `vite build`, no prerender (faster; dist has no course pages)
npm run prerender  # SSR build + prerender only, against an existing dist/
npm run lint       # ESLint
npm test           # run the Vitest suite once (CI uses this)
npm run test:watch # run Vitest in watch mode
vercel dev         # needed for /api/* endpoints locally
node scripts/validate-modules.mjs  # validate module data structure
```

**Toolchain: Node 24, npm ≥ 11.16.** CI (`.github/workflows/ci.yml`) runs Node 24 / npm 11.16. npm changed its mind twice about whether `@napi-rs/wasm-runtime`'s optional peers (`@emnapi/core`, `@emnapi/runtime`) belong in `package-lock.json` as top-level entries: npm 10 records them, npm 11.6 drops them, npm 11.16 records them again. Regenerate the lockfile on npm 11.6–11.15 and it silently loses those entries, and every CI run then dies at `npm ci` with `Missing: @emnapi/core@… from lock file` before a single check executes. Check `npm --version` before any command that rewrites the lockfile (`npm install`, `npm audit fix`, dependency bumps). The committed lockfile is valid for npm 10.9, 11.6 and 11.16 alike, so only *regenerating* it on a bad version breaks things — installing never does.

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
                ├── api/explainer.js → Groq (Code Explainer page + in-app "Explain this code", rate: 8/10min/IP)
                ├── api/research.js → Groq compound-mini web search (Explain-this, signed-in, rate: 4/10min/IP)
                ├── api/extract.js  → text extraction from uploaded course materials (signed-in, rate: 20/10min/IP)
                ├── api/simplify.js → Groq plain-English rewrite of lecture-note sections (rate: 8/10min/IP)
                ├── api/summarize.js → exam-ready recap of a whole lecture-note topic (rate: 10/10min/IP)
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
| `src/data/courses.js` | ~8200 lines — all Cybersecurity courses (100L–400L), topics, textbooks, exam tips; the 22 foundation courses carry `crossDepartmental: true`, and CYB 211 carries `sharedMaterials: true` (see below) |
| `src/data/departments.js` | Department registry (cybersecurity + dataScience = full, general = foundation) + lazy catalogue loaders + `YEAR_LEVELS` (the lightweight level list — import this, not courses.js, when a page only needs to validate/render a level) + `materialsDepartmentFor()` (which `course_materials.department` pool a course's uploads belong to) + `findDepartmentByName()` (matches a foundation student's typed `department_other` against the authored departments, so Welcome and the dashboard can offer them the switch) |
| `src/data/useCatalogue.js` | Hook resolving the signed-in student's department catalogue; status `loading \| ready \| error` — always handle `error` or the page hangs on a failed chunk load. Stays `loading` until auth/profile settle, so a student never sees another department's catalogue flash first |
| `src/data/dataScienceCourses.js` | ~2000 lines — the full B.Sc. Data Science catalogue (structure transcribed from the Students' Information Handbook Ch.4 §4.1). Standalone: imports only `lectureNotes/*` |
| `src/components/ProfileForm.jsx` | Shared profile form (name, reg number, level, department picker) used by both SetupProfile and ProfileSettings, so validation can't drift |
| `src/pages/ProfileSettings.jsx` | `/profile` — edit name/level/department after signup; clears `selected_courses` on a department switch |
| `src/components/CoursePicker.jsx` | Foundation-mode students pin the shared courses their programme takes → `profiles.selected_courses` (NULL = auto-derive; Planner + Courses filter respect it) |
| `src/data/trackConfig.js` | Track metadata config (java/python/c) |
| `api/tutor.js` | Streaming tutor on the multi-provider chain (`api/_lib/model.js`) with tools: getStudentProgress, getCourseOutline, getModuleDetail |
| `api/explainer.js` | Code explanation endpoint (model chain, `strong`). Backs the paste-your-own Code Explainer page, the in-app "Explain this code" buttons, and `scripts/pregenerate-explanations.mjs`, which all send the identical prompt via `buildExplainPrompt()`. 8,000-char code cap (`MAX_EXPLAIN_CHARS`), 6,000-token output cap. **Gemini's `thinkingConfig.thinkingBudget` is forced to `0`** — Gemini 3.5 Flash otherwise spends hidden reasoning tokens out of the same budget as the visible answer (measured ~900 tokens on one listing), which produced answers that cut off mid-sentence or leaked reasoning-style phrasing into the last line; explaining a listing needs no multi-step reasoning. Keep this option in whichever call site changes, or the two drift |
| `src/components/ExplainCode.jsx` \| `src/utils/explainCode.js` | "Explain this code" — a plain-English, line-by-line walkthrough of a listing (every line quoted and explained in order, vocabulary explained on first use — the students it was built for were handed a lab manual and never taught the code in it), offered under every `code` section in the lecture notes (never on `language: 'output'` blocks) and under an exam-prep code question. Two modes: `walkthrough` (the default — faults and improvements included) and `study`, used on a question's stem *before* the student answers, which teaches the listing line by line but is forbidden from saying whether it is correct — a student who cannot read the code cannot attempt the question, but on a debug question the verdict is the answer. Checks a pre-generated bundle before the live call (`getPregenerated`/`hasPregenerated` props, from `useExplanations`) — see the next row — then falls back to localStorage cache, then the live API. Renders nothing when neither a bundle nor a live provider is available |
| `scripts/pregenerate-explanations.mjs` \| `src/data/lectureNotes/explained.js` \| `src/components/useExplanations.js` | Bakes code walkthroughs into the bundle so they work with no live call, no rate limit, and offline — the explainer allows 8 requests/10min **per IP**, and a class on shared campus WiFi hits that fast. Writes `src/data/lectureNotes/generated/<key>.explained.json`, a flat `{ [contentHash]: explanation }` map (hash = mode + language + code, via `explanationHash()`), keyed like the Simplify generator (`notesKey`, else slug) and resumable (`--only <key>` / `--force` / `--dry`). `hasExplained()` is a synchronous compile-time glob check — the reason a button can render at all with no network, since the live-availability probe cannot succeed offline. Content-addressed: an edited listing simply misses the map and falls back live rather than serving stale text. **Generated per-course on request, not for the whole catalogue by default** — check with the user before running it broadly; it spends real Gemini quota and is billed against a monthly cap. `listingsInTopic()` / `listingsInExamPrep()` in `explainCode.js` decide what gets generated and must not drift from what the UI actually offers |
| `src/components/CodeWalkthrough.jsx` | "Code Walkthrough" tab on `CourseDetail`, shown only for courses whose notes carry program listings (`topicsWithCode()`). The practicals in order, listing + inline walkthrough (from the bundle above; falls back to the live button where nothing is generated) + verified output + a "Watch out for" panel built from the note's own `note` blocks + a jump to the matching exam-prep questions (matched by the bank's `source` string, e.g. `"Topic 14 · Practical 5"` — no separate authoring needed). Built for revising the night before a paper: the reading-order notes tab is organized to teach the course, this one is organized to drill the practicals |
| `api/research.js` | Explain-this — `groq/compound-mini` web search over a highlighted passage; signed-in only, returns explanation + sources |
| `src/components/ExplainSelection.jsx` | Wraps readable content; shows "Explain this" on text selection, renders inline explanation card |
| `api/run.js` | JDoodle proxy — runs Java/C/C++/Python code |
| `api/extract.js` | **Registers** a freshly uploaded course material: downloads the object the browser just stored, extracts its text (.txt/.docx/.pdf via mammoth + pdf-parse) and writes the `course_materials` row itself on the service-role client. The browser cannot insert that row any more — `authenticated` has no INSERT grant (migration `20260827010000`). Every security-relevant field is derived here, never taken from the body: `uploaded_by` from the verified token, `course_code`/`department` from the catalogue via `findCourseBySlug()` and the uploader's own profile, `extracted_text` from the real bytes. This is why it matters: that text is injected into every student's tutor context for that course, and the lookup takes the two most *recent* rows, so a forged row displaced the genuine notes. Signed-in only; answers 503 when `SUPABASE_SERVICE_ROLE_KEY` is unset |
| `api/simplify.js` | "Simplify this" — Groq rewrite of a dense lecture-note section in plain English; client caches results in localStorage |
| `api/summarize.js` \| `src/utils/summarizeTopic.js` | "Key points" — exam-ready recap of a **whole topic**, for a student who has already read it. Deliberately separate from Simplify (one *section*, for a student who is stuck): different scope, prompt, cap (32k vs 4k chars) and rate bucket. Skips topics whose title is already a hand-written summary (`/exam focus\|key takeaways/i`) |
| `src/components/LectureNotes.jsx` | Renders lecture-note sections (definition/bullets/termlist/table/mosca/…); termlists double as flashcards; hosts the Simplify and Key points buttons and the per-topic read markers. Takes `reading` from the *page* — see below |
| `src/components/useReadingProgress.js` | Lecture-note reading progress under `course-reading-v1` (own `user_progress` row, no migration). Topics are identified by `hashPrompt(topic.title)` so renumbering doesn't wipe marks. `useAutoMarkRead` marks a topic read once its end sentinel is seen **and** the panel has been *visible* for a length-scaled dwell — accumulated visible time, so "Expand all" + a fast scroll marks nothing. **CourseDetail owns the hook and passes it into `<LectureNotes>`**: two `useProgress` hooks on one key write the same record but never re-render each other, so the tab badge would go stale |
| `src/data/lectureNotes/index.js` | Lazy note registry + `NOTE_TOPIC_COUNTS` / `noteTopicCount()` — topic counts *without* loading a chunk, so the 57 course cards can size their progress bars. `validate-modules.mjs` fails the build if the map drifts from the real files |
| `src/components/CourseQuiz.jsx` \| `Quiz.jsx` | MCQ practice off `course.quiz` — student picks a length, questions sampled at random, options shuffled per attempt. Scores land in `quizScores[course.slug]` under the `course-quizzes-v1` key |
| `src/components/CourseExamPrep.jsx` | Written-exam practice off `course.examPrep`, for courses examined on paper rather than by CBT. Generic over any course carrying a bank; see "Adding a question bank" below for why it is a sibling field and not more question types on `quiz` |
| `src/data/lectureNotes/ent221Quiz.js` \| `cyb122ExamPrep.js` | The two banks that exist today — an MCQ bank shared by both catalogues' ENT 221 entries, and CYB 122's written-exam bank |
| `api/_lib/supabase.js` | Server-side Supabase client using Bearer token from request |
| `api/_lib/serviceRole.js` | **The only file allowed to read `SUPABASE_SERVICE_ROLE_KEY`.** That key bypasses RLS entirely, so every use of it is a place where the database's protections do not apply and the calling code alone is responsible for scoping — keeping the read in one module keeps that list greppable (`serviceRoleClient(`). Two callers today: `googleAuth.js` and `extract.js`. Any new one must scope by an already-verified user id, and should prefer the caller's own `student.db` unless the server must write something the user must not be able to forge |
| `api/_lib/googleAuth.js` | Google OAuth2 client, signed `state` (CSRF), refresh-token storage via `serviceRole.js` |
| `api/_lib/request-policy.js` | CORS/cache headers, and the two-layer rate limit. `enforceRateLimit` is per-IP and in-memory (per-lambda-instance, wiped by cold starts) — a cheap guard on the *pre-auth* path only. `enforceUserRateLimit`/`denyIfUserRateLimited` are the budget that actually binds: per-student, via the `consume_rate_limit()` Postgres function (migration `20260827000000`), so the count is shared across every instance. It **fails open** by design — migrations here are applied by hand, so deployed code can legitimately meet a database without the function yet. A hard *spend* cap is deliberately not implemented in app code; set it at the provider (Google Cloud quotas, Groq limits) where the app cannot reach it |
| `api/_lib/googleEvents.js` | PlanEvent → Google Calendar event resource (duplicates `src/utils/ics.js`'s date/RRULE math for the Node context — keep both in sync by hand) |
| `api/google/connect.js` \| `callback.js` \| `status.js` \| `disconnect.js` | "Connect Google" OAuth flow (Calendar + Drive scopes), independent of Supabase's own Google sign-in |
| `api/google/calendar-sync.js` | Pushes a generated study plan into a dedicated secondary Google Calendar (idempotent re-sync) |
| `src/utils/googleApi.js` \| `src/components/useGoogleConnection.js` \| `src/components/GoogleConnectButton.jsx` | Frontend Google-connection plumbing, used by `src/pages/Planner.jsx` |
| `supabase/migrations/20260719000000_google_connections.sql` | `google_connections` table + RLS — run manually in the Supabase SQL editor, never via Claude |
| `supabase/migrations/20260728*` | Multi-department columns: `profiles.department/department_other/selected_courses`, `course_materials.department` (applied). Every migration must end with `NOTIFY pgrst, 'reload schema';` or the API rejects the new columns with PGRST204 |
| `supabase/migrations/20260801000000_materials_department_backfill.sql` | Sorts existing `course_materials` rows into their pool ('general' for shared courses) + indexes both lookup pairs. **Run manually in the Supabase SQL editor** |
| `supabase/migrations/20260802000000_reg_number_optional.sql` | Drops `NOT NULL` from `profiles.reg_number`. **Run manually before deploying the optional-reg-number frontend**, or every signup that leaves the field blank fails |
| `vercel.json` | CSP, CORS headers, SPA rewrite rule |
| `scripts/validate-modules.mjs` | Pre-build module structure validator — also validates every catalogue's `course.quiz` and `course.examPrep` banks |
| `src/data/publicCatalogue.js` | **The publicly readable slice of the catalogue** — which courses have a public page, and each page's title, description, canonical URL and schema.org `Course` block. One module because two very different callers must agree: the browser (a signed-out visitor opening a course) and `scripts/prerender.mjs` (build time). If they disagreed, the indexed page and the live page would drift. Only `status: 'full'` departments are listed; foundation mode is a filtered view of `courses.js`, so listing it too would publish duplicates of the same slug |
| `src/components/CoursePreview.jsx` \| `CourseIndexPreview.jsx` \| `src/pages/CoursePublic.jsx` | What a logged-out visitor sees at `/courses/:slug` and `/courses`: outline, set texts, study tips, a "what's inside" list and a sign-in CTA. The lecture notes, question banks, tutor and progress stay gated. Both components are deliberately free of hooks, context and react-router — they are rendered a second time through `renderToStaticMarkup` at build, where there is no Router and no browser — which is also why they use plain `<a>`. `CoursePublic` resolves the slug against *every* authored catalogue, not through `useCatalogue`: that hook keys off the signed-in student's department, and there isn't one here |
| `src/prerender/entry-server.jsx` \| `vite.ssr.config.js` \| `scripts/prerender.mjs` | **The site's entire search presence.** Areté is a client-rendered SPA behind one `index.html`, and every study route sits behind `RequireAuth` — a crawler asking for `/courses/cyb-224` used to get an empty `<div id="root">` that resolved, after JS, to a redirect to `/signin`, a page `robots.txt` disallows. This step writes `dist/courses/<slug>/index.html` for all 95 courses plus the hub, each with the outline already in the bytes, a per-page title/description/canonical, and `Course` + `BreadcrumbList` JSON-LD. It also regenerates `sitemap.xml` into **both** `dist/` and `public/`, so the copy in git can't go stale as courses are added. Runs *after* `vite build` on purpose: VitePWA's precache manifest is generated during that build, so the 96 HTML files are never added to it. Vercel checks the filesystem before applying `vercel.json` rewrites, so the static files win over the SPA catch-all with no routing change. `vite.ssr.config.js` exists separately because running the main config a second time would fire VitePWA's `closeBundle` again and emit a second, wrong service worker |

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
SUPABASE_SERVICE_ROLE_KEY # Live runtime secret, read only by api/_lib/serviceRole.js (Google token storage + course-material inserts). Uploads answer 503 without it
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
- `src/data/courses.js` is very large (~8200 lines) — read only the relevant section before editing
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
- Test files live in `src/__tests__/` as `*.test.js` (or `.test.jsx` for component tests). 26 suites, ~290 tests.
- Run with `npm test` (single run) or `npm run test:watch`. CI runs `npm test` on every push.
- When writing new logic, add or extend a test if the function is testable in isolation. Coverage is uneven — data/util logic is reasonably covered, most page-level components are not.
- **Component tests use `fireEvent` from `@testing-library/react`** (see `profileForm.test.jsx`, `courseExamPrep.test.jsx`). `@testing-library/user-event` is *not* a dependency — do not import it.
- Do not add new test tooling (e.g. coverage providers, Playwright) without asking first.

## Common Tasks
- **Adding a module:** Edit the relevant data file (`modules.js`, `pythonModules.js`, `cModules.js`, `securityModules.js`), run `npm run validate` to confirm structure. A track is registered in `trackMeta.js` (metadata + `moduleIndex`) and `trackConfig.js` (lazy loader); the generic `/tracks/:lang/:id` route picks it up automatically. Security modules add a `challenge` object (validated by `validate-modules.mjs`) and render a Challenge tab; they omit the JDoodle playground.
- **Adding a course:** Edit `src/data/courses.js` — read the existing structure first, it is large. It gets a public page and a sitemap entry automatically at the next `npm run build`; nothing to register. Its `description`, `topics`, `textbooks` and `studyTips` are the *only* text a search engine ever sees for it, so write them for a student who has not signed in.
- **SEO / discoverability:** `/courses` and `/courses/:slug` are the only routes open to a logged-out visitor, and they render `CoursePreview`, not the real page — see the three rows on prerendering in the Key Files Map. An inline `<script type="application/ld+json">` is a *data block*, not executable script: the HTML spec's "prepare the script element" algorithm returns before the CSP check for any type that is neither classic nor module, so structured data needs **no** `'unsafe-inline'` and no hash in `vercel.json`. Verified against the real CSP header, not assumed. Do not add a URL to the sitemap without checking it renders something for a signed-out visitor — a listed URL that redirects to the disallowed `/signin` is worse than an unlisted one.
- **Adding a question bank:** A course can carry two independent banks, and which one you want depends on how the course is *examined*, not on what feels easier to write.
  - `quiz` — MCQ, for CBT papers. `{ question, options[] (≥2), correctIndex, explanation }`. Rendered by `CourseQuiz.jsx`; `Quiz.jsx` shuffles the options every attempt, so never encode position into the wording ("both of the above" will break).
  - `examPrep` — written answers, for paper exams. Two types: `longform` (`modelAnswer` + `markScheme[]`, optional `figure`) and `recall` (`items[]` of `{ name, aliases[], explain }`). Rendered by `CourseExamPrep.jsx`. Every question needs a `source` naming the lecture-note section it came from, so a student who drops marks knows what to re-read.

    A `longform` question may also carry a **code listing** — `code` (printed with the question stem, with line numbers, for "debug this" / "explain this") and/or `modelCode` (printed under the model answer, for "write a script"). Either one requires a `language`, which is never defaulted: a Java listing highlighted as Python reads as broken code. Both go through `CodeBlock`, never into the question or `modelAnswer` prose — those render as paragraphs, and `white-space: pre-line` collapses runs of spaces, which destroys the indentation that *is* a Python block. A bank with any such question gets an extra "Code questions" set in the picker automatically. `cyb221ExamPrep.js` is the worked example: twelve practicals, questions in the three forms a lab-manual paper uses (write / debug / explain), the two debug questions built on faults the manual itself contains.

  **Keep them separate — do not add written types to `quiz`.** The MCQ shape is hard-wired at three levels (the data shape, `Quiz.jsx`'s `idx === correctIndex` scoring, and the validator's mandatory `options`/`correctIndex`), so a question without options cannot travel through it. The sibling field costs nothing and leaves the existing banks untouched.

  **Mark scheme lines must end with their mark value in parentheses** — `'Due care defined (2)'`. `CourseExamPrep.jsx` parses that trailing value to compute the student's self-marked score, and `validate-modules.mjs` asserts the per-point values sum to the question's `marks`; an unbalanced scheme would otherwise make full marks silently unreachable. Recall drills score a mark per item, so `items.length` must equal `marks`.

  A bank shared between catalogues (like `ent221Quiz`) lives in `src/data/lectureNotes/` beside the notes it tests and is imported by each catalogue's course entry. Run `node scripts/validate-modules.mjs` after editing either kind.
- **Adding a department:** Query demand first (`SELECT lower(trim(department_other)), count(*) FROM profiles WHERE department_other IS NOT NULL GROUP BY 1 ORDER BY 2 DESC`). Then, three steps:
  1. Author `src/data/<dept>Courses.js` — **self-contained**, exporting `courses`, `LEVELS` and `levelMeta` (same shape as `courses.js`; copy `dataScienceCourses.js` as the model). Re-author the shared courses with your department's framing rather than importing another catalogue; do import the shared `./lectureNotes/*.js` for any course that has them, or students lose the transcribed workbook content. **When you import shared notes, write your own `noteCoverage` for that course** — a map of note number → `{ covers: [n], partial: [n] }`, where the indices are 1-based positions in *your* `topics` array. The note files carry no indices of their own precisely because they are shared; without it the Course Hub's outline badges point at whatever the other department's outline happened to say (`departments.test.js` asserts this). Mark SIWES courses `subject: 'siwes'` — the Course Hub keys its SIWES section off that, not off the level.
  2. Register it in `departments.js` with `status: 'full'` and a `loadCatalogue()` importing it. `SELECTABLE_DEPARTMENTS` and the SetupProfile/ProfileSettings pickers pick it up automatically.
  3. Add it to the `DEPARTMENTS` registry in `api/_lib/courseData.js` (`{ knowledge: buildKnowledgeFromCourses(...), courses }`) and to `DEPARTMENT_LABELS` in `api/tutor.js`, so the tutor scopes its catalogue index, course lookups and uploaded-note pool to that department.
  4. Add it to the `catalogues` array in `scripts/validate-modules.mjs`, or the prebuild validator silently skips its courses.

  **Getting the shared-course flags right** (both are read by `materialsDepartmentFor()`, which decides the `course_materials.department` pool):
  - `crossDepartmental: true` — a foundation course every UniUyo programme takes (GST/MTH/PHY/STA/…). In `courses.js` this flag *also* builds the foundation catalogue via `getCrossDepartmentalCourses()`.
  - `sharedMaterials: true` — a course another department owns that yours also takes (e.g. CYB 211). Pools the notes without putting the course in the foundation catalogue.

  Every catalogue carrying the same course **must set the same flag**, or the two departments read different pools and each sees an empty materials list for notes the other uploaded. `departments.test.js` asserts this across all catalogues, and a course whose slug newly pools under `'general'` needs a one-line `UPDATE` migration to move its existing rows.

  Existing foundation students of that department keep their progress — it is keyed per-user, not per-department — and move themselves onto the new catalogue at `/profile`. `findDepartmentByName()` matches their typed `department_other` so Welcome and the dashboard offer them the switch automatically.
- **Changing UI:** Use Tailwind with the custom color palette only; check Fraunces/Inter/JetBrains Mono for typography
- **Adding an API feature:** Add a new file in `api/`, add rate limiting matching the existing pattern in `api/tutor.js`, register it in tools registry
- **Auth changes:** Touch `AuthContext.jsx` and `src/lib/supabase.js` only — do not scatter auth logic into components
- **Progress changes:** All progress logic lives in `useProgress.js` — keep it there
