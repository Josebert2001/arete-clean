# Arete — Code Your Excellence

> ἀρετή (ar-eh-TAY) · Greek · "excellence achieved through practice"

An interactive Java learning platform. 13 modules, practice quizzes, mini projects, and AI tutoring. Built for 200L Cybersecurity students at UniUyo and anyone learning Java from scratch.

Built by **Josebert Sunday Robert (JRsolvy)** — Director of Software & Hardware, Cybersecurity Dept., UniUyo.

---

## What's inside

- **13 full modules** — Foundations → Control Flow → Arrays → Methods → OOP I & II → Exceptions → Collections → Files & Threads → Strings → JDBC → GUI
- Each module: **theory**, **annotated code examples**, **practice quiz**, **mini project** with hints
- **Install guide** — JDK + NetBeans, step by step with interactive checklist
- **Try It playground** — write and run real Java in the browser, per module, via Judge0
- **AI Tutor** — chat interface (UI complete, Groq integration ready)
- **Code Explainer** — paste Java, get plain-English breakdown (UI complete, Groq integration ready)
- **Cheatsheet** — quick syntax reference
- **Progress tracking** — browser-based, per module and quiz scores

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy anywhere.

### Deploy to Vercel

1. Push to GitHub
2. Import on vercel.com
3. Framework: **Vite**, Build: `npm run build`, Output: `dist`
4. Deploy

---

## Wiring up the code runner (JDoodle)

The **Try It** tab lets students run real Java in the browser. It calls a Vercel serverless function (`api/run.js`) that proxies to the JDoodle Compiler API. Until you add keys, it shows a friendly "not connected yet" message — the app still works fine.

### 1. Get JDoodle API keys
- Sign up at **https://www.jdoodle.com** (free, no card)
- Subscribe to the free Compiler API plan at **https://www.jdoodle.com/subscribe-api** (20 free runs/day)
- Copy your **Client ID** and **Client Secret** from **https://www.jdoodle.com/compiler-api**

### 2. Add environment variables in Vercel
Project → Settings → Environment Variables:

```
JDOODLE_CLIENT_ID      = your_client_id
JDOODLE_CLIENT_SECRET  = your_client_secret
```

### 3. Redeploy
The playground goes live. Java uses language code `java` (latest version); C is `c` (already mapped in `api/run.js` for when you add the C track).

The keys live only on the server (Vercel env vars) — never in the frontend.

### Important: the free plan is 20 runs/day total
That's fine for testing and small demos, but NOT for a whole department. Before announcing widely, self-host Judge0 on DigitalOcean ($200 GitHub Student credit) or Oracle Cloud (always free), then swap `api/run.js` back to the Judge0 version. The frontend never changes.

---

## Wiring up Groq (AI features)

The AI Tutor and Code Explainer are in demo mode. To enable:

### 1. Get a free Groq API key
https://console.groq.com

### 2. Create a backend route (don't expose the key in frontend)

```js
// server.js (add to your existing Express setup)
import Groq from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/tutor', async (req, res) => {
  const { question } = req.body;
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: 'You are a friendly Java tutor for students learning COS 222. Explain simply, use relatable examples, show short Java code where helpful. Never give full project solutions — guide them to figure it out.' },
      { role: 'user', content: question }
    ]
  });
  res.json({ answer: completion.choices[0].message.content });
});
```

### 3. Update the frontend
In `src/pages/AITutor.jsx` and `src/pages/CodeExplainer.jsx`:
- Set `DEMO_MODE = false`
- Replace `askAI()` with a `fetch('/api/tutor', ...)` call

Full instructions are in the comment block at the top of each file.

---

## Tech stack
React 18 · Vite · Tailwind CSS · React Router · lucide-react

## Roadmap
- [ ] C language track
- [ ] Groq AI integration
- [ ] User accounts + cloud progress sync
- [ ] Mobile app (React Native)

---

© 2025 Arete by JRsolvy. Built for learners, everywhere.
