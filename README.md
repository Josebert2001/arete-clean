# Arete — Code Your Excellence

> ἀρετή (ar-eh-TAY) · Greek · "excellence achieved through practice"

An interactive programming and computer-science platform for 200L Cybersecurity students at the University of Uyo — and anyone learning Java, Python, or C from scratch.

Three full interactive language tracks, a 200L Cybersecurity course hub, an AI tutor, and a code explainer.

Built by the **Department of Cybersecurity**, University of Uyo.

---

## What's inside

**Three interactive language tracks — 37 modules total**

| Track  | Modules | Maps to    |
| ------ | ------- | ---------- |
| Java   | 13      | COS 222    |
| Python | 12      | COS 121    |
| C      | 12      | —          |

Every module has theory, annotated code examples, a runnable in-browser playground, a 7-question practice quiz with explanations, and a guided mini project.

**200L Cybersecurity course hub** — 11 courses across both semesters with descriptions, topic lists, textbook references, study tips, and search prompts. Java (COS 222) links directly into its interactive track; the others are curated study guides.

**App-wide features**
- **AI Tutor** — chat with a Groq-backed tutor that knows the three tracks and core 200L CS topics
- **Code Explainer** — paste Java / Python / C, get a plain-English breakdown
- **Install guide** — JDK + NetBeans, step by step with an interactive checklist
- **Cheatsheet** — quick syntax reference across all three languages
- **Progress tracking** — per-track, stored in the browser; quiz scores persist

---

## App map

```
/                       Home
/tracks                 Pick a language
/tracks/:lang           Module list for java | python | c
/tracks/:lang/:id       Module detail (theory, code, playground, quiz, project)
/courses                200L Cybersecurity course hub
/courses/:slug          Single course page
/install                JDK + NetBeans setup walkthrough
/tutor                  AI Tutor
/explainer              Code Explainer
/cheatsheet             Syntax cheatsheet
```

Old `/modules` and `/modules/:id` URLs redirect to the Java track.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

The playground and AI features need server-side keys (below). Without them, both surfaces show a friendly "not configured yet" message — the rest of the app still works.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy anywhere static.

### Deploy to Vercel

1. Push to GitHub
2. Import on vercel.com
3. Framework: **Vite**, Build: `npm run build`, Output: `dist`
4. Add the env vars below in Project → Settings → Environment Variables
5. Deploy

---

## Wiring up the code runner (JDoodle)

The **Try It** tab calls a Vercel serverless function (`api/run.js`) that proxies to the JDoodle Compiler API. Until you add keys, the function returns a friendly "not connected" message.

1. Sign up at **https://www.jdoodle.com** (free, no card).
2. Subscribe to the free Compiler API plan at **https://www.jdoodle.com/subscribe-api** (20 free runs/day).
3. Copy your **Client ID** and **Client Secret** from **https://www.jdoodle.com/compiler-api**.
4. Add to Vercel env vars:

   ```
   JDOODLE_CLIENT_ID      = your_client_id
   JDOODLE_CLIENT_SECRET  = your_client_secret
   ```

5. Redeploy.

Keys live only on the server — never in the frontend.

### Scaling past 20 runs/day

The free plan caps at 20 runs/day across **all** users. Fine for testing, not for a whole department. When you outgrow it, self-host Judge0 on DigitalOcean ($200 GitHub Student credit) or Oracle Cloud (always-free tier) and swap the inside of `api/run.js`. The frontend stays the same.

---

## Wiring up the AI features (Groq)

`/tutor` and `/explainer` proxy through `api/tutor.js` and `api/explainer.js` to Groq's Llama 3.3 70B. Backend code is already in place — just add the key.

1. Get a free API key at **https://console.groq.com** (no card).
2. Add to Vercel env vars:

   ```
   GROQ_API_KEY = your_key_here
   ```

3. Redeploy. AI Tutor and Code Explainer go live.

Without the key, both pages show a "Coming soon" screen instead of erroring.

### Locking the API to your domain

Set `ALLOWED_ORIGIN` in Vercel to your deployed URL (e.g. `https://arete.vercel.app`) and the API will refuse cross-origin browser calls. Defaults to `*` if unset.

---

## Tech stack

React 18 · Vite · Tailwind CSS · React Router · lucide-react · groq-sdk

## Roadmap

- [ ] User accounts + cloud progress sync
- [ ] Self-hosted Judge0 to lift the 20-runs/day cap
- [ ] Expand the course hub beyond 200L
- [ ] Mobile app (React Native)

---

© 2026 Arete by JRsolvy. Built for learners, everywhere.
