# Arete — Academic Companion for the Department of Cybersecurity

> ἀρετή (ar-eh-TAY) · Greek · "excellence achieved through practice"

A full academic aid for B.Sc. Cybersecurity students at the **University of Uyo**. Every course from 100L to 400L — study resources, interactive programming tracks, an AI tutor that knows the entire curriculum, and a code explainer.

Built by the **Department of Cybersecurity**, University of Uyo.

---

## What's inside

### Course Hub — all four years

The course hub covers the complete B.Sc. Cybersecurity programme based on the official CCMAS course structure. Every course has a description, topic outline, recommended textbooks, study tips, and what to search for free online resources.

| Year | Semester 1 | Semester 2 | Total units |
| ---- | ---------- | ---------- | ----------- |
| 100L | 8 courses  | 8 courses  | 33 units    |
| 200L | 7 courses  | 7 courses  | 32 units    |
| 300L | 7 courses  | 4 components (SIWES) | 30 units |
| 400L | 7 courses  | 7 courses  | 32 units    |

### Interactive programming tracks — 37 modules

| Track  | Modules | Course          |
| ------ | ------- | --------------- |
| Java   | 13      | COS 211 / 221   |
| Python | 12      | COS 121         |
| C      | 12      | —               |

Every module has theory, annotated code examples, a runnable in-browser playground, a 7-question practice quiz with explanations, and a guided mini project.

### App-wide features

- **Guided course finder** — homepage walks you through: pick your year → pick your semester → see your courses
- **AI Tutor** — Groq-backed tutor that knows all courses from 100L to 400L, explains at the right level for your year
- **Code Explainer** — paste Java, Python, C, or C++ and get a plain-English breakdown
- **Install guide** — JDK + NetBeans setup, step by step with an interactive checklist
- **Cheatsheet** — quick syntax reference across Java, Python, and C
- **Progress tracking** — per-track, stored in the browser; quiz scores persist

---

## App map

```
/                       Home (guided year → semester → course finder)
/tracks                 Browse all three programming tracks
/tracks/:lang           Module list for java | python | c
/tracks/:lang/:id       Module detail (theory, code, playground, quiz, project)
/courses                Full course hub — all years, level tabs
/courses/:slug          Individual course (topics, textbooks, study tips)
/install                JDK + NetBeans setup walkthrough
/tutor                  AI Tutor
/explainer              Code Explainer
/cheatsheet             Syntax cheatsheet
```

Legacy `/modules` and `/modules/:id` URLs redirect to the Java track.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

Plain `npm run dev` serves the frontend only. To exercise `/api/run`, `/api/tutor`, and `/api/explainer` locally, use `vercel dev` or deploy the app to a Vercel preview environment.

The playground and AI features need server-side API keys (see below). Without them, both show a friendly "not configured yet" message — the rest of the app works fully.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy anywhere that serves static files.

### Deploy to Vercel

1. Push to GitHub
2. Import on vercel.com
3. Framework: **Vite** · Build command: `npm run build` · Output directory: `dist`
4. Add the environment variables below in Project → Settings → Environment Variables
5. Deploy

---

## Wiring up the code runner (JDoodle)

The **Try It** playground calls `api/run.js`, a Vercel serverless function that proxies to the JDoodle Compiler API. Without keys, it returns a friendly "not connected" message.

1. Sign up at **https://www.jdoodle.com** (free, no card)
2. Subscribe to the free Compiler API plan (20 runs/day)
3. Copy your **Client ID** and **Client Secret** from the API dashboard
4. Add to Vercel environment variables:

```
JDOODLE_CLIENT_ID     = your_client_id
JDOODLE_CLIENT_SECRET = your_client_secret
```

5. Redeploy.

Keys live only on the server — never in the frontend bundle.

#### Scaling past 20 runs/day

The free plan caps at 20 runs/day across all users. Fine for development; not for a full department. When you outgrow it, self-host Judge0 on DigitalOcean or Oracle Cloud (both have free tiers) and swap the inside of `api/run.js`. The frontend stays unchanged.

---

## Wiring up the AI features (Groq)

`/tutor` and `/explainer` proxy through `api/tutor.js` and `api/explainer.js` to Groq's **Llama 3.3 70B** model.

1. Get a free API key at **https://console.groq.com** (no card required)
2. Add to Vercel environment variables:

```
GROQ_API_KEY = your_key_here
```

3. Redeploy. The AI Tutor and Code Explainer go live immediately.

Without the key, both pages show a "not connected" screen instead of erroring.

#### Restricting to your domain

Set `ALLOWED_ORIGIN` in Vercel to your deployed URL (e.g. `https://arete.vercel.app`) and the API will refuse all cross-origin browser requests. Defaults to `*` if unset.

The AI Tutor, Code Explainer, and code runner are rate-limited per IP to protect your API quota. Defaults: 8 tutor requests / 10 minutes, 10 explainer requests / 10 minutes.

---

## Tech stack

React 18 · Vite · Tailwind CSS · React Router v6 · Lucide Icons · Vercel AI SDK (Groq)

---

## Roadmap

- [ ] User accounts and cloud progress sync
- [ ] Self-hosted Judge0 to remove the 20-runs/day cap
- [ ] Past examination questions per course
- [ ] 300L and 400L interactive programming modules
- [ ] Mobile app (React Native)

---

© 2026 Arete · Department of Cybersecurity, University of Uyo.
