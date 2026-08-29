# Areté — Academic Companion for the Department of Cybersecurity

> ἀρετή (ar-eh-TAY) · Greek · "excellence achieved through practice"

A full academic aid for B.Sc. Cybersecurity students at the **University of Uyo**. Every course from 100L to 400L, four interactive tracks (Java, Python, C, and a hands-on Security/CTF track), an AI tutor that knows the whole curriculum, a code explainer, cloud accounts with synced progress, and a study-plan calendar export.

Built by the **Department of Cybersecurity**, University of Uyo. Live at **https://www.aretecyb.tech**.

---

## What's inside

### Course Hub — all four years

The course hub covers the complete B.Sc. Cybersecurity programme: **57 courses** across 100L–400L, both semesters. Every course has a description, topic outline, recommended textbooks, study tips, and search terms for free online resources. A handful of courses also ship full **lecture notes** (definitions, bullet sections, term lists that double as flashcards, tables, MOSCA calculators, code blocks) with a "Simplify this" button that rewrites a dense section in plain English.

| Level | Courses |
| ----- | ------- |
| 100L  | 16      |
| 200L  | 14      |
| 300L  | 13      |
| 400L  | 14      |

### Interactive tracks — 49 modules

| Track    | Modules | Course        | Format |
| -------- | ------- | ------------- | ------ |
| Java     | 13      | COS 211 / 221 | Theory + code + playground + quiz + project |
| Python   | 12      | COS 121       | Theory + code + playground + quiz + project |
| C        | 12      | —             | Theory + code + playground + quiz + project |
| Security | 12      | CYB           | Theory + quiz + **capture-the-flag challenge** |

The **Security track** is 12 CTF-style rooms — CIA triad, encoding vs. encryption, classical/modern crypto, hashing, password cracking, networking, HTTP, SQL injection, the Linux CLI, digital forensics, phishing, and firewalls. Each room ends in a flag, validated client-side (SHA-256, no backend) with escalating hints. The other three tracks add a runnable in-browser code playground (via JDoodle) that the Security track skips.

### AI features

All AI endpoints run on a **multi-provider fallback chain** (Gemini → Groq → OpenRouter) — each request tries providers in order and keeps text once one succeeds, so a single provider's rate limit or outage doesn't take a feature down. Only providers with a configured API key are included in the chain, so the app degrades gracefully with just one key set.

| Feature | Where | What it does | Rate limit |
| ------- | ----- | ------------- | ---------- |
| AI Tutor | `/tutor` | Full-page chat that knows every course and module, calibrated to the student's year; can look up a student's own progress and course/module detail as tools | 8 / 10 min / IP |
| Code Explainer | `/explainer` | Paste Java, Python, C, or C++ and get a plain-English breakdown | 8 / 10 min / IP |
| Course AI Chat | every course page | A course-scoped assistant embedded in `CourseDetail`, pinned to that course's code and title | 8 / 10 min / IP |
| Explain This | lecture notes & course text (signed-in only) | Highlight a passage → live web search (Groq `compound-mini`) → inline plain-language explanation with cited sources | 4 / 10 min / IP |
| Simplify This | lecture notes | Rewrites a dense section in plain English; result is cached in the browser | 8 / 10 min / IP |
| Material Extraction | course materials upload (signed-in only) | Extracts text from uploaded `.txt`/`.docx`/`.pdf` files so the tutor can reference them | 20 / 10 min / IP |

### Accounts & cloud sync

Sign-in is **Google OAuth** or a Supabase email **magic link** (no password, no 6-digit code — free-tier Supabase can't send custom code emails). **An account is required for all study pages** — the landing page stays public, everything else redirects signed-out visitors to `/signin`. Signed-in students get:
- Progress synced across devices (module completion, quiz scores) — dual-written to `localStorage` and Supabase, 1s debounce
- A profile setup flow (`/setup-profile`) that captures level/department so the AI Tutor can personalize
- **Course material uploads** — students can attach files to a course page for classmates and the AI to reference
- **Resume where you left off** — the app remembers your last-visited study page and returns you there after signing in

### Study Planner

`/planner` turns a student's level + semester into a weekly revision timetable, generated entirely from the course data already in the app (no lecture times needed) — heavier courses get proportionally more weekly time. Exports as a downloadable **.ics** file (Google/Apple/Outlook-compatible) or a one-click "Add to Google Calendar" link, anchored to Africa/Lagos time.

### App-wide features

- **Guided course finder** — homepage walks you through: pick your year → pick your semester → see your courses
- **Install guide** — JDK + NetBeans setup, step by step with an interactive checklist
- **Cheatsheet** — quick syntax reference across Java, Python, and C
- **Dark mode** — full light/dark theme, persisted and synced to the mobile browser chrome color
- **Progress tracking** — per-track and per-course, with a dashboard view
- **Error monitoring** — Sentry on both frontend and API (optional, no-ops if unset)

---

## App map

```
/                       Home (guided year → semester → course finder)
/courses                Full course hub — all years, level tabs
/courses/:slug          Individual course (topics, textbooks, lecture notes, AI chat, materials)
/lab                    Browse all four tracks (Java, Python, C, Security)
/tracks/:lang           Module list for java | python | c | security
/tracks/:lang/:id       Module detail (theory, code, playground/CTF challenge, quiz, project)
/install                JDK + NetBeans setup walkthrough
/tutor                  AI Tutor (full-page chat)
/explainer              Code Explainer
/cheatsheet             Syntax cheatsheet
/planner                Study-plan generator + calendar export
/signin                 Sign-in (Google or email magic link)
/setup-profile          Post-signup profile setup (level/department)
/welcome                Landing page for new signed-in users
```

Legacy `/tracks` (bare) redirects to `/lab`; `/modules` and `/modules/:id` redirect to the Java track.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

Plain `npm run dev` serves the frontend only. To exercise `/api/*` endpoints locally (tutor, explainer, run, research, extract, simplify), use `vercel dev` or deploy to a Vercel preview environment.

AI and playground features degrade gracefully when keys are missing — pages show a friendly "not configured yet" message instead of erroring. The rest of the app works fully without any keys.

## Building for production

```bash
npm run build     # runs scripts/validate-modules.mjs first, then vite build
```

Output goes to `dist/`. Deploy anywhere that serves static files; `/api/*` requires a platform that runs Vercel-style serverless functions (or an equivalent adapter).

### Deploy to Vercel

1. Push to GitHub
2. Import on vercel.com
3. Framework: **Vite** · Build command: `npm run build` · Output directory: `dist`
4. Add the environment variables below in Project → Settings → Environment Variables
5. Deploy

---

## Environment variables

Copy `.env.example` to `.env.local` for local dev (never commit `.env.local`).

```bash
# --- AI providers (at least one; chain tries them in this order) ---
GEMINI_API_KEY=              # Google AI Studio — free tier, leads the chain (tools support)
# or GOOGLE_GENERATIVE_AI_API_KEY as an alias
GEMINI_MODEL_STRONG=         # optional override, default gemini-3.7-flash
GEMINI_MODEL_LIGHT=          # optional override, default gemini-3.5-flash-lite
GROQ_API_KEY=                 # console.groq.com — fast fallback, powers Explain This (compound-mini)
OPENROUTER_API_KEY=           # optional — best-effort last resort via openrouter/free

# --- Code playground ---
JDOODLE_CLIENT_ID=
JDOODLE_CLIENT_SECRET=

# --- Auth + database + storage ---
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# --- CORS ---
ALLOWED_ORIGIN=https://www.aretecyb.tech   # restricts browser callers of /api/*

# --- Error monitoring (optional) ---
VITE_SENTRY_DSN=               # frontend
SENTRY_DSN=                    # /api/* functions
```

Server-side-only secrets (`JDOODLE_*`, `GROQ_API_KEY`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`, `SENTRY_DSN`) never reach the browser bundle. `VITE_`-prefixed vars are intentionally public (Supabase anon key is safe to expose — access is enforced by Row Level Security).

For the one-time Supabase setup script (`setup-supabase.mjs`) you additionally need `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_PAT` in a separate `.env.setup` file — never commit it, never use the service role key in frontend code.

---

## Wiring up the code runner (JDoodle)

The **Try It** playground (Java/Python/C tracks) calls `api/run.js`, a serverless function that proxies to the JDoodle Compiler API. Without keys, it returns a friendly "not connected" message.

1. Sign up at **https://www.jdoodle.com** (free, no card)
2. Subscribe to the free Compiler API plan (**20 runs/day, shared across all users**)
3. Copy your **Client ID** and **Client Secret** from the API dashboard
4. Add `JDOODLE_CLIENT_ID` / `JDOODLE_CLIENT_SECRET` to your environment and redeploy

Fine for development; not enough for a full department. When you outgrow it, self-host Judge0 (DigitalOcean/Oracle Cloud both have free tiers) and swap the inside of `api/run.js` — the frontend stays unchanged.

## Wiring up the AI features

`api/_lib/model.js` builds the provider chain from whatever keys are set (see [Environment variables](#environment-variables)). Order for the agentic tutor: Gemini (strong, then flash-lite) → Groq `openai/gpt-oss-120b` → OpenRouter `openrouter/free`. Explain This is the one exception — it always uses Groq's `compound-mini` web-search system directly, since it manages its own tools server-side.

Without any key configured, AI pages show a "not connected" screen instead of erroring. Each AI/code endpoint is rate-limited per IP (in-memory, resets on cold start) to protect API quota — see the table in [AI features](#ai-features) above.

## Wiring up accounts (Supabase)

Auth, progress sync, and course-material uploads all run through Supabase.

1. Create a project at **https://supabase.com**
2. Enable email **magic-link** auth (leave "Confirm email" off — see `src/context/AuthContext.jsx`)
3. Set `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
4. Run `node --env-file=.env.setup setup-supabase.mjs` to provision tables (`profiles`, `user_progress`, `course_materials`) and the `course-materials` storage bucket — needs `SUPABASE_SERVICE_ROLE_KEY` + `SUPABASE_PAT` in `.env.setup`

Server-side functions forward the user's Bearer token so Row Level Security applies (`api/_lib/supabase.js`); the service role key is never used in frontend code.

---

## Tech stack

React 18 · React Router v7 · Vite · Tailwind CSS (custom theme, dark mode) · Vercel serverless functions (Node ESM) · Vercel AI SDK (Gemini / Groq / OpenRouter fallback chain) · Supabase (auth, Postgres, storage) · JDoodle · Sentry · Lucide Icons

---

## Testing

```bash
npm test          # Vitest, single run — this is what CI runs
npm run test:watch
npm run lint
node scripts/validate-modules.mjs   # validates track module structure (also runs pre-build)
```

Test files live in `src/__tests__/`. Coverage is still thin — see `CLAUDE.md` for current status before assuming a feature is covered.

---

## Roadmap

- [ ] Past examination questions per course
- [ ] 300L and 400L interactive programming modules
- [ ] Lecture notes for the remaining courses (a handful are done; most still use topic-outline only)
- [ ] Mobile app (React Native)

---

© 2026 Areté · Department of Cybersecurity, University of Uyo.
