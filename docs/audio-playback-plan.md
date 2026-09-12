# Lecture-Note Audio — Implementation Plan (two options)

**Status:** awaiting decision — which option ships first.
**Audience:** the implementing agent/developer. Every file reference below was verified against the
codebase on 2026-09-12 (branch `perf/ai-cost`). Read each file before editing it — line numbers
drift.

**The one-line version:** Option A (Web Speech) is free, ships in a day, and cannot play with the
screen off. Option B (pregenerated audio) costs money and days, and is the only one that works on a
bus. **Both need Section 3 first**, and Section 3 is the actual work.

---

## 1. Problem statement

The request came from Coursera's audio playback. Coursera's version works because their content is a
linear video transcript — prose, start to finish. Areté's lecture notes are a transcribed lecturer's
workbook, and a measured quarter of them cannot be spoken at all.

Measured on this branch (10 note files, 111 topics):

| Metric | Value |
|---|---|
| Serialised text | 1,114,699 chars |
| Words | ~202,700 |
| **Speech duration @150wpm** | **~23 hours** |
| Average topic | 10,042 chars ≈ 12 minutes |
| Largest topic | ENT 221 "Forms of Business Ownership", 31,846 chars |

Section-type census across all 2,699 sections:

```
text:986  definition:410  code:361  termlist:239  math:217
bullets:196  note:110  image:95  casestudy:40  table:39  proscons:6
```

**712 sections (26%) are `code`, `math`, `table` or `image`.** And the existing serialiser is built
for a *model*, not a voice — `src/utils/noteText.js` emits:

- `math` → **raw LaTeX** (`section.tex`, line 75-79). A synthesiser says "backslash int underscore
  zero caret one".
- `code` → a fenced block (line 80-84). Read aloud, a Java listing is unusable noise.
- `table` → `header | header` then `cell | cell | cell` pipe rows (line 47-50).

Feeding `sectionsToPlainText()` to a speech engine is the audio equivalent of the bug
`src/data/publicNotes.js` already documents at length: emitting raw TeX because the renderer never
ran. The lesson there applies verbatim — **no audio beats broken audio.**

---

## 2. Non-negotiable ground rules (from CLAUDE.md — re-read it first)

1. **No TypeScript.** `.js` / `.jsx` only.
2. **No new component libraries.** Tailwind + the custom palette (`cream`, `paper`, `ink`,
   `coffee-*`, `ember`, `moss`, `rust`). No hardcoded hex.
3. **No new dependencies without asking.** This matters for Option B — see §5.6, the audio
   encoding step is the one place a dependency is genuinely tempting.
4. **`vercel.json` CSP is confirm-before-change.** Option B's hosting choice decides whether you
   touch it at all (§5.5). Prefer the choice that does not.
5. **No `console.log` in committed code.**
6. **Never push to `master`.** Branch.
7. **Errors handled explicitly** — no silent failures. A voice that stops mid-sentence with no UI
   change is exactly the silent failure this rule exists for.
8. **Smallest change that solves the problem.** Section 3 is shared; do not fork it per option.

---

## 3. The shared foundation — BOTH options need this, build it first

> **Status: BUILT.** `src/utils/speechText.js` + `src/__tests__/speechText.test.js` (38 tests).
> The corpus guard runs all 111 topics end to end and asserts zero LaTeX, code-fence, pipe-row or
> stray-brace residue. §3.4 and §3.5 record what implementation changed about this plan.

This is ~60% of the total work and it is identical either way. Whichever option ships first, this
lands first, and the second option reuses it untouched.

### 3.1 New file: `src/utils/speechText.js`

**Dependency-free, exactly like `noteText.js`** — no React, no fetch, no browser globals — because
Option B's pre-generation script imports it under plain Node. This is the same constraint (and the
same reason) documented at the top of `noteText.js`, and the same reason
`scripts/pregenerate-simplify.mjs` imports `noteText.js` rather than `simplifySection.js`.

Do **not** add speech logic to `noteText.js`. Its output is hashed for the Simplify and Explain
caches (`hashText` → `*.simplified.json`, `*.explained.json`); changing what it emits invalidates
every pre-generated entry in `src/data/lectureNotes/generated/`. `speechText.js` is a sibling that
reads the same section objects and answers a different question.

#### Exports

```js
// One section → { speech: string, skipped: null | { kind, label } }
export function sectionToSpeech(section)

// A whole topic → ordered array of speakable units (see §3.3)
export function topicToSpeechUnits(topic)

// Flat string for the whole topic — Option B's generation input
export function topicToSpeechText(topic)

// Whether a topic is worth offering the button for at all
export function canNarrate(topic)

// Domain pronunciation fixes, exported for its own test
export function applyPronunciation(text)
```

#### Per-type behaviour — the editorial core

| Type | Count | Behaviour |
|---|---|---|
| `text`, `definition` | 1,396 | Speak `heading` (if any), then `text`. The bulk of the audio. |
| `termlist`, `fivers` | 239 | `"{term}. {def}"` per item — the em-dash in `itemToLine` becomes a full stop, which is how a voice pauses. |
| `bullets` | 196 | Speak items in order. Do **not** prepend "bullet"; let the sentence break do it. |
| `note` | 110 | Prefix `"Note. "` then the text/items. |
| `casestudy` | 40 | Title, prompt, then `"Task one. … Task two. …"`. |
| `proscons` | 6 | `"Advantages. …"` / `"Disadvantages. …"`. |
| **`code`** | **361** | **SKIP.** Emit marker: `"Code listing — {language}, {n} lines. It's on screen."` |
| **`math`** | **217** | **SKIP.** Emit marker: `"An equation on screen{, caption if present}."` Never read `section.tex`. |
| **`image`** | **95** | **SKIP.** Emit marker: `"Figure. {caption}"`, or nothing at all when there is no caption. |
| **`table`** | **39** | **SKIP.** Emit marker: `"A table on screen comparing {headers joined}."` The headers are short and genuinely orienting; the rows are not. |
| `resource` | — | Silent skip. It is a link, not prose. |

#### The rule that makes the markers non-optional

**Speak the marker; never silently drop.** Lecture-note prose leans on the thing above it — "Here,
`a` first stores the value 5…" is commentary on a listing. `publicNotes.js` learned this the
expensive way and its fix was a contiguous-prefix rule. Audio cannot take a prefix (the student
asked for the whole topic), so the equivalent safeguard is the spoken marker: the listener is told
something was skipped and where to look, instead of hearing commentary on nothing.

#### `applyPronunciation()` — the domain dictionary

A generic engine mangles this curriculum's core vocabulary. Substitution happens on the **speech
string only**, never on displayed text.

```js
const SAY_AS_LETTERS = ['OSI','TCP','IP','UDP','DNS','DHCP','HTTP','HTTPS','MAC','VLAN','DMZ',
  'IDS','IPS','VPN','SIEM','XSS','CSRF','SQL','JWT','API','REST','CIA','NIST','GDPR','NDPR',
  'NDPA','RBAC','DAC','MAC','PKI','TLS','SSL','AES','DES','RSA','ECC','SHA','MD5','IoT','MQTT',
  'CoAP','JDBC','OOP','JVM','CRUD','ETL','OLAP','OLTP','FAR','FRR','EER','ALE','ARO','SLE',
  'SDLC','UML','CVE','CVSS','SIWES','NYSC','GST','CAC','EFCC'];
```

→ rendered as spaced letters (`"O S I"`) for Option A, or `<say-as interpret-as="characters">` for
Option B (§5.6 — SSML is one of Option B's real advantages).

Plus a small explicit map for the ones letter-spacing gets wrong:

```js
const SAY_AS_WORD = { 'SQL': 'sequel', 'GUI': 'gooey', 'char': 'car', 'Areté': 'ar-eh-tay' };
```

`SQL` appears in both lists deliberately — resolve it one way and delete it from the other during
implementation; Nigerian CS lecturers generally say "S-Q-L", so **prefer the letters** and drop the
`SAY_AS_WORD` entry. Flagged here so the collision is a decision, not a bug.

Also handle: `"e.g."` → `"for example"`, `"i.e."` → `"that is"`, `"etc."` → `"and so on"`,
`"Fig."` → `"Figure"`, and strip Markdown residue (`**`, backticks) that would otherwise be read
as punctuation.

### 3.2 Playback unit: the heading group, not the topic

A 12-minute blob with no structure is unusable. `buildOutline(topic.sections)` in `noteText.js`
already splits a topic into `{ head, tail }` heading groups — **that is the chapter list**, free.

`topicToSpeechUnits(topic)` returns one entry per group:

```js
{ id, heading, speech, charCount, estimatedSeconds, skipped: [{ kind, label }] }
```

This single shape drives everything downstream: the chapter/skip UI, per-chunk `speechSynthesis`
utterances in Option A, per-file generation in Option B, and the "3 code listings skipped in this
section" caption in both.

`estimatedSeconds = words / 2.5` (150 wpm) is good enough for a progress bar before the real
duration is known, and is the only duration Option A ever gets.

### 3.3 Tests — `src/__tests__/speechText.test.js`

Non-negotiable, because every failure mode here is silent-but-wrong:

1. `math` never emits `\` or `$` — assert against the real `tex` of an MTH 121 section.
2. `code` never emits the listing body; the marker names the language and line count.
3. `table` emits headers, never a `|`.
4. Every `skipped` entry has a spoken label (no silent drops).
5. Speech-unit order equals `buildOutline` order (no reordering; §3.1's rule).
6. `applyPronunciation('the OSI model')` → `'the O S I model'`, and does not corrupt a word
   containing those letters (`"MACROS"` must not become `"M A C ROS"` — anchor on word boundaries).
7. `canNarrate` is false for the nine near-silent topics in §3.4, and true for a normal one.

### 3.4 `canNarrate()` needs a floor, not a boolean — measured

> **Built — see `src/utils/speechText.js`.** The numbers below are the final ones; an earlier draft
> of this section said *nine* topics, counted before the serialiser existed by summing raw `text`
> and `items` fields. The shipped `speakableCharCount()` measures the prose actually spoken (so it
> includes `"Note."` prefixes and `"Term. Definition."` joins, and excludes headings and markers),
> which is the more accurate figure and puts four borderline topics above the line. Checked by
> reading their output: *"Concept of Computing"* at 425 chars is real prose and narrates fine.

No topic in the corpus has *zero* speakable sections, so "has any prose" is not a usable gate. But
**five topics carry under 400 chars of speakable text**, because they are practicals that are almost
entirely listings:

```
cos121 — Input, Output, and Type-Casting           69 speakable chars
cos121 — Arrays and Lists                          74
cos121 — Writing Mathematical Formulas in Python   76
cos121 — GUI with Tkinter                         244
cos121 — Control Structures                       336
```

Narrated, "Arrays and Lists" is about fifteen seconds of *"Code listing on screen — Python, 12
lines."* repeated. That is the broken-audio failure this plan exists to avoid, and it would ship on
day one without a floor.

**So `canNarrate(topic)` gates on speakable chars, not section count.** `MIN_NARRATE_CHARS = 400`,
mirroring how `canSimplifyGroup` gates on `MIN_SIMPLIFY_CHARS` rather than on types
(`noteText.js:127-138`). The corpus guard in `speechText.test.js` asserts the refusals stay within
`cos121` and do not creep.

These five are exactly the topics `CodeWalkthrough.jsx` was built for — the button they want is
"Code Walkthrough", not "Listen", and it is already there.

### 3.5 Inline maths — found during implementation, not planned for

The census in §1 counts `type: 'math'` sections (217 of them). It does **not** catch maths written
inline inside ordinary prose, and **205 `text` / `bullets` / `definition` / `note` / `termlist`
sections carry `$...$` spans**. MTH 121 is built almost entirely from them; COS 221 uses them too.

Handling only the `math` section type therefore left *"dollar backslash frac open brace d y"* in the
middle of otherwise clean sentences — the same defect as rendering raw TeX, just audible.

`mathToSpeech()` covers the shapes these notes actually use (`f(x)` → "f of x", `x^2` → "x squared",
`t_0` → "t sub 0", `\frac{dy}{dx}` → "dy over dx", `\sqrt{}`, `\int`, the Greek letters, the
comparison operators) and **refuses everything else** by returning `complete: false`, which the
caller turns into a spoken *"an expression on screen"* marker. A wrong reading of an equation is
worse than being told to look.

Three smaller things the corpus forced, all now covered by tests:

- **Real currency.** CYB 122 quotes breach losses as `$500,000`; that is money, not a maths
  delimiter, and it is handled before the structural strip.
- **Prose that discusses a symbol.** COS 221 writes *"the curly braces {"* and *"the currency symbol
  ($)"*. The words already carry the meaning, so the leftover character is dropped, not spoken.
- **Escape sequences.** COS 221's "Java String API" prints `\\` and `\t` as prose. A lone backslash
  is not followed by letters, so a command-only strip missed it and the voice said "backslash".

---

## 4. OPTION A — Web Speech API

**Free. Zero bytes. Offline. No backend, no CSP change, no new dependency. Ships in a day.**
**Cannot play with the screen off.**

### 4.1 Architecture

Browser-only. `window.speechSynthesis` + `SpeechSynthesisUtterance`. Nothing is generated, stored,
or fetched. The text comes from `topicToSpeechUnits()` at render time.

### 4.2 New files

| File | Purpose |
|---|---|
| `src/components/useSpeech.js` | The hook: voice selection, queue, play/pause/stop/skip, the four landmines in §4.3. Exposes `{ supported, state, unitIndex, play, pause, resume, stop, next, prev, voices, voice, setVoice, rate, setRate }`. |
| `src/components/ListenToTopic.jsx` | The UI: one button in the topic header that expands to a control bar. |
| `src/__tests__/speechText.test.js` | §3.3. |
| `src/__tests__/useSpeech.test.jsx` | Hook behaviour against a stubbed `speechSynthesis` (see `src/__tests__/stubs/`). |

### 4.3 The four landmines — all four are real, all four have fixes

1. **Voices load asynchronously.** `speechSynthesis.getVoices()` returns `[]` on first call in
   Chrome. Listen for `voiceschanged` and re-read. Without this, the first click of the session
   silently uses the wrong voice or none.
2. **Chrome kills utterances at ~15 seconds.** A long paragraph stops mid-sentence with no error.
   *Fix:* split each speech unit into sentence-sized chunks (~200 chars, split on `.` `?` `!`
   respecting abbreviations) and queue them as separate utterances chained on `onend`. This is
   also what gives you free chapter-level `onend` progress.
3. **iOS Safari requires a user gesture** for the first `speak()` of a page. *Fix:* the play button
   *is* the gesture — just never auto-play, and never call `speak()` from an effect.
4. **Mobile suspends synthesis when the screen locks or the tab backgrounds.** This is not
   fixable — it is the Web Speech API's defined behaviour and the reason Option B exists.
   *Mitigation:* detect `visibilitychange`, pause cleanly, and show "Paused — audio stops when the
   screen locks" rather than letting it die silently (ground rule 7). Optionally hold a
   `navigator.wakeLock` while playing, which keeps the screen on — helps the "resting my eyes"
   case, does nothing for the pocket case, and costs battery. Offer it as an opt-in toggle, off by
   default.

### 4.4 UI

In `LectureNotes.jsx`, beside the existing **Key points** button (`KeyPoints`, line 484-551) — same
visual family, same `rounded-full border border-coffee-200 bg-paper` pill, `Volume2` /
`Pause` from lucide-react, `text-ember-500` icon. Copy that button's classes verbatim.

Collapsed: `▶ Listen (12 min)`. Expanded control bar: play/pause · ⏮ ⏭ chapter · speed
(0.75/1/1.25/1.5) · voice picker (only if >1 `en-*` voice) · current chapter heading · a caption
reading `"3 code listings and 1 equation skipped — they're on screen"`.

**Highlight-follows-voice (worth it, do it in phase 2):** `SpeechSynthesisUtterance.onboundary`
gives a character index. Map it back to the section and add a `bg-ember-500/10` wash on the section
being read. Chrome/Edge fire `onboundary` reliably; Safari does not — feature-detect and degrade to
chapter-level highlighting. This is the thing that makes Option A feel finished rather than bolted
on, and it is the one experience Option B cannot match as cheaply.

### 4.5 Reading-progress integration

`TopicAccordion` (line 554) already owns `useAutoMarkRead({ active, charCount, onRead })`. Finishing
the last speech unit is a legitimate read signal — arguably stronger than the dwell timer, since it
is proof of elapsed attention.

Call `onSetRead(true)` when the final unit's `onend` fires **and** no chapter was skipped. Do not
mark a topic read when the student skipped to the end. Keep the dwell timer running in parallel and
unchanged.

### 4.6 Phases

| Phase | Work | Est. |
|---|---|---|
| A0 | §3 shared foundation (serialiser + dictionary + tests) | 4–6 h |
| A1 | `useSpeech.js` with all four landmines + stub tests | 3–4 h |
| A2 | `ListenToTopic.jsx`, wired into `LectureNotes.jsx` | 2–3 h |
| A3 | Progress integration, skipped-content caption, wake-lock toggle | 1–2 h |
| A4 | Real-device pass: Android Chrome, iOS Safari, desktop | 2 h |
| | **Total** | **~1.5–2 days** (~1 day after A0) |

### 4.7 Risks

- **Voice quality is whatever the device has**, and cannot be controlled. A low-end Android with
  only the compact US voice will sound noticeably worse than an iPhone. Nothing to be done.
- Desktop Chrome's default en-US voice reads Nigerian names and places poorly.
- No analytics on whether anyone uses it (no server round-trip). Add a local counter if that
  matters.

---

## 5. OPTION B — Pregenerated audio files

**Background playback, lock-screen controls, one consistent voice — plausibly a Nigerian English
one. Costs real money, real bandwidth, and 2–3 days.**

### 5.1 The decision that dominates everything: what gets narrated

| | Full topics | **Key points recaps** |
|---|---|---|
| Source chars | 1,114,699 | ~144,000 (111 × ~1,300) |
| Audio duration | ~23 h | ~2.7 h |
| Size @32 kbps mono | **~330 MB** | **~39 MB** |
| Per file | ~2.9 MB / 12 min | **~350 KB / 90 s** |
| Can live in git | **No** | Yes (see §5.5) |
| Needs CSP change | **Yes** | **No** |

**Recommendation: Key points only.** Reasons, in order of weight:

1. **330 MB cannot go in the repo**, so full topics force Supabase Storage, which forces a
   `media-src` CSP change (ground rule 4).
2. **~2.9 MB per topic is a real cost to the student.** This audience is on Nigerian mobile data.
   Option A costs them zero bytes; a 12-minute topic costs them a chunk of a daily bundle.
3. **The recap is the better thing to listen to.** `api/summarize.js`'s prompt caps at 220 words
   and is explicitly written as the exam-night distillate. Nobody wants a 12-minute reading of a
   comparison table in their ear on a bus; they want the six facts.
4. The recaps are already generated, already cached, already quality-controlled by a prompt.

**Prerequisite:** the recaps must exist as committed data first. They are currently generated
live per-device and cached in `localStorage` (`src/utils/summarizeTopic.js`). Narrating them means
a `scripts/pregenerate-summaries.mjs` writing
`src/data/lectureNotes/generated/<key>.summaries.json` — a direct clone of
`pregenerate-simplify.mjs` (§5.4). **This is real extra scope that Option A does not have, and it
also independently kills the live `/api/summarize` cost we just cut.** Worth doing on its own
merits; count it in the estimate.

### 5.2 Architecture

```
scripts/pregenerate-summaries.mjs   → generated/<key>.summaries.json   (text, committed)
scripts/pregenerate-audio.mjs       → public/lecture-notes/<slug>/audio/<hash>.mp3
                                    → generated/<key>.audio.json  { [hash]: { file, seconds, bytes } }
src/data/lectureNotes/audio.js      → loadAudioManifest(key), mirroring simplified.js
src/components/TopicAudio.jsx       → <audio> + Media Session API
```

Content-addressed by `hashText(speechText)`, exactly like `*.simplified.json` and
`*.explained.json`. An edited note misses the manifest and the button simply does not render —
never stale audio of text that is no longer on the page. This is the established pattern; follow
it rather than inventing a key scheme.

### 5.3 Hosting — and why it decides the CSP question

`public/lecture-notes/` already holds **25 MB of images in git**, organised by course slug
(`cos-221/`, `cyb-121/`, …). Precedent exists. Adding ~39 MB of recap audio takes it to ~64 MB —
large but workable, and **same-origin, so `default-src 'self'` already covers it and `vercel.json`
is not touched at all.**

Supabase Storage would need `media-src 'self' https://*.supabase.co` added to the CSP. Only go
there if you later narrate full topics.

> Check `git config http.postBuffer` and whether the host enforces a repo size limit before
> committing 39 MB in one push.

### 5.4 `scripts/pregenerate-audio.mjs`

Clone `scripts/pregenerate-simplify.mjs` — it is the house pattern and it is good. Keep:

- `--only <key>` / `--force` / `--dry` (`--dry` must print total chars and estimated cost **before**
  spending anything).
- Resumable: skip hashes already in the manifest; write the manifest after **every** file so an
  interrupted run keeps its work.
- `DELAY_MS` pacing under the provider's rate limit.
- The corrupt-JSON guard that refuses to silently overwrite a long run.

Add: write the `.mp3`, probe its real duration and byte size into the manifest (the player needs
the duration before the file is fetched, for the button label).

### 5.5 Service worker — the existing rules are wrong for audio

Verified in `vite.config.js`:

- `globPatterns` is `**/*.{js,css,html,svg,png,webmanifest}` — no `mp3`, so audio is **not**
  precached. Correct, leave it.
- `globIgnores` already lists `lecture-notes/**`. Correct, leave it.
- **But** the existing runtime rule for `/lecture-notes/` is `StaleWhileRevalidate`, `maxEntries:
  60`. That is wrong twice for audio: SWR re-fetches immutable files (wasting the student's data,
  the exact thing we are trying to protect), and 60 entries cannot hold 111 recaps.

Add a dedicated rule **before** the existing one (Workbox matches in order):

```js
{
  urlPattern: ({ url, sameOrigin }) =>
    sameOrigin && url.pathname.startsWith('/lecture-notes/') && url.pathname.endsWith('.mp3'),
  handler: 'CacheFirst',
  options: {
    cacheName: 'lecture-audio',
    cacheableResponse: { statuses: [0, 200] },
    expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 365 },
    plugins: [/* range-requests — see below */],
  },
}
```

**Landmine:** seeking inside a cached audio file issues a `Range` request, and a plain Workbox
`CacheFirst` returns the whole 200 response, which breaks the scrubber offline. The fix is
`workbox-range-requests` — **a new dependency, so ask first** (ground rule 3). Acceptable fallback
if the answer is no: keep the files small (90 s recaps barely need seeking) and accept no offline
scrubbing.

### 5.6 Provider

| Provider | Approx. rate | SSML | Notes |
|---|---|---|---|
| **Google Cloud TTS** | ~$4/1M (Standard), ~$16/1M (Neural2) | ✅ | Has **`en-NG` Nigerian English** voices — verify in the console. Monthly free tier is generous; 144k chars may cost nothing. Needs a **GCP project + service account**, which is *not* the AI Studio `GEMINI_API_KEY` you already have. |
| Gemini TTS (`*-preview-tts`) | — | partial | Uses the key you already have — lowest friction. Preview status, and it returns **PCM**, needing ffmpeg to reach mp3 (dependency → ask). |
| Groq PlayAI TTS | higher | ❌ | You already hold a `GROQ_API_KEY`. No SSML. |
| OpenAI TTS | ~$15/1M | ❌ | New account, new key. |

**Recommendation: Google Cloud TTS**, for two reasons that are specific to this app — SSML (so
`applyPronunciation()` emits `<say-as interpret-as="characters">OSI</say-as>` and the acronyms are
actually *correct*, not approximated by letter-spacing) and the `en-NG` voice. A Nigerian English
voice reading a UniUyo lecturer's workbook is a meaningfully better product for this audience than
a US voice, and it is the single clearest thing Option B buys that Option A cannot.

**All costs above are order-of-magnitude and were not verified against live pricing pages. Check
current rates and the free tier before running a full generation**, and run `--dry` first.

### 5.7 UI

`<audio preload="metadata">` plus the **Media Session API** (`navigator.mediaSession.metadata` +
`setActionHandler`), which is what puts title, course and artwork on the lock screen and wires the
hardware/notification play-pause. Without Media Session this option loses most of its point.

Same pill button as Option A (§4.4) so the two never look like different features. When the
manifest has no entry for a topic, render nothing and let Option A's button cover it — **the two
options compose; they are not alternatives at runtime.**

### 5.8 Phases

| Phase | Work | Est. |
|---|---|---|
| B0 | §3 shared foundation | 4–6 h |
| B1 | `pregenerate-summaries.mjs` + committed recap text (§5.1) | 3–4 h + run |
| B2 | Provider account, key, `--dry` cost check | 1–2 h |
| B3 | `pregenerate-audio.mjs` + full generation run | 4 h + run |
| B4 | `audio.js` loader, `TopicAudio.jsx`, Media Session | 4–5 h |
| B5 | SW rule, range-request decision, offline test | 2–3 h |
| B6 | Real-device pass incl. lock-screen playback | 2 h |
| | **Total** | **~3–4 days** + generation wall-clock + ~39 MB in git |

### 5.9 Risks

- **Voice mispronunciation is baked in.** A bad take costs a regeneration, not a page refresh.
  Generate **one course first**, listen to the whole thing, then commit to the corpus.
- The recap text must be frozen before narration; regenerating a summary orphans its audio (the
  content hash saves you from *serving* the stale file, but you pay to regenerate).
- 39 MB in git is permanent — it stays in history even if deleted later.

---

## 6. Side by side

| | **A — Web Speech** | **B — Pregenerated** |
|---|---|---|
| Cost to build | ~1.5–2 days | ~3–4 days |
| Cost to run | **£0 / $0, forever** | one-off generation + 39 MB repo |
| Data cost to student | **0 bytes** | ~350 KB per recap |
| Works offline | **Yes, immediately** | Yes, after first play |
| **Plays with screen off** | **No** | **Yes** |
| Voice quality | device lottery | **consistent, plausibly `en-NG`** |
| Acronyms correct | approximated | **SSML-exact** |
| Highlight-follows-voice | **Yes (`onboundary`)** | hard |
| Covers full topics | **Yes, all 23 h** | recaps only (330 MB otherwise) |
| Touches CSP | No | No, if recaps-only |
| New dependency | No | Maybe (`workbox-range-requests`, ffmpeg) |

---

## 7. Recommendation

**Ship A first, then add B on top of it for the recaps.** They compose rather than compete (§5.7):
Web Speech covers all 111 topics for free on day one, and pregenerated recap audio later adds the
pocket/commute case for the content that is actually worth listening to that way.

Doing B first means paying for §3 *and* §5.1's summary pre-generation before a single student hears
anything — and still having no audio at all for full topics.

**For today:** §3 (the shared serialiser) is the honest first commit either way. It is the part that
needs judgement, it is fully testable with no API key and no device, and nothing else can start
until it exists.

---

## 8. Open questions

1. **Screen-on or pocket?** Already asked; the answer decides whether B is ever needed.
2. ~~Is there a topic that is entirely code/math?~~ **Answered in §3.4** — none are, but five are
   near-silent, so `canNarrate` gates on a 400-char floor. Built.
3. Do the 4 courses holding notes inline (no `notesKey`) need audio too? `pregenerate-simplify.mjs`
   handles them via `course.slug` — mirror that, don't invent a second key rule.
4. Does the `en-NG` Google voice actually sound good on this material? One course, then decide.
5. `workbox-range-requests` — yes or no? Only blocks B5.
