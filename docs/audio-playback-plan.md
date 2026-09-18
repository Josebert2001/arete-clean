# Lecture-Note Audio — Implementation Plan (two options)

**Status:** **Option A shipped** — the shared serialiser (§3) and the whole Web Speech player
(§4, phases A0–A3) are built and integrated, along with the highlight §4.4 called for (§4.10) and the
word-level caption §4.12 added on top of it. What remains of Option A is the real-device pass on
Android Chrome and iOS Safari (§4.8). **Option B (§5) is not started** and is still a decision, not a
plan of record — it is the only thing that reaches the commute case.
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

> **Status: BUILT.** `src/utils/speechText.js` + `src/__tests__/speechText.test.js`.
> The corpus guard runs every topic the player can reach end to end — **189 of them: 111 from the
> lazy `noteLoaders`, and 78 that live inline on the course object** — and asserts zero LaTeX,
> code-fence, pipe-row or stray-brace residue. It walked only the keyed half until Copilot pointed
> out that `loadNotesFor` returns `course.lectureNotes` directly for the rest, so a guard that read
> as full coverage was missing 41% of production data. §3.4 and §3.5 record what implementation
> changed about this plan.
>
> Test counts are deliberately not quoted here; they go stale within a commit or two and
> `npm test` is the honest answer.

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
// One section → { speech, prose, proseChars, skipped: Array<{ kind, label }> }
// `proseChars` is NOT prose.length — a refused inline expression is replaced
// inside `prose` by a spoken marker, and markers are not content.
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
| **`image`** | **95** | **SKIP.** Emit marker: `"Figure. {caption}"`, falling back to `alt`, and `"A figure on screen"` when there is neither. (The plan first said a captionless figure would emit nothing; announcing it is what rule 1 actually requires.) |
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
| `src/components/useSpeech.js` | **BUILT.** The hook: voice selection, queue, play/pause/stop/skip, the four landmines in §4.3. Exposes `{ supported, status, playing, paused, interrupted, unitIndex, unitCount, play, pause, resume, stop, next, prev, skipTo, voices, voice, setVoice, rate, setRate, failed, keepAwake, setKeepAwake, wakeLockSupported }`. Covered in `useSpeech.test.jsx` against a deliberately hostile `speechSynthesis` stub that never auto-completes an utterance and delivers `cancel()` asynchronously, the way a real browser does.<br><br>Three things implementation added to §4.3's list. **The queue is keyed on unit CONTENT, not array identity** — `topicToSpeechUnits(topic)` in a component body returns a fresh array every render, so an identity-keyed "new topic" reset fired on every render and put `status` back to `idle` the instant `play()` set it to `playing`. Requiring every caller to `useMemo` would have been one forgotten memo away from the same bug in production. **`supported` checks the value, not the key** — `'speechSynthesis' in window` is true for a property that exists and is `undefined`. And **`speakFrom` recurses through a ref**, so a voice or rate change mid-topic cannot leave the in-flight chain calling a stale closure. |
| `src/components/ListenToTopic.jsx` | **BUILT.** The UI: a pill matching the Key points and Plain English buttons, expanding to a control bar (prev / play-pause / next · `n/total` · current heading · speed cycle · voice picker when the device offers a choice · close). Rendered from `LectureNotes.jsx`'s `TopicAccordion` panel, just above `<KeyPoints>`. **No availability probe** — the voice is on the device, so there is no endpoint to ask, which is the one way this feature is cheaper than every other AI button on the page. Returns `null` when the API is missing or `canNarrate` is false, so the four courses of listing-heavy practicals simply never show it.<br><br>The skipped-content caption shipped here rather than in A3: the component is misleading without it. `describeSkips()` lives in `speechText.js` beside `skippedSummary()`, so the wording and the `skipped.kind` values it describes cannot drift — a kind with no entry is dropped from the caption rather than printed as a raw key. |
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
   *Mitigation:* detect it and show "Paused — audio stops when the screen locks" rather than
   letting it die silently (ground rule 7). Optionally hold a `navigator.wakeLock` while playing,
   which keeps the screen on — helps the "resting my eyes" case, does nothing for the pocket case,
   and costs battery. Offer it as an opt-in toggle, off by default.

   **Built, but not the way this said.** "Pause on `visibilitychange`" is wrong on desktop, where
   Chrome, Edge and Firefox all keep speaking in a background tab — a student switching tabs to
   take notes would have had the audio stop for no reason. The suspension is therefore **detected
   on return, never predicted on leaving**: when the page becomes visible again mid-playback, if
   `speechSynthesis` reports nothing speaking and nothing paused, the platform killed it. That is
   correct on both platforms and needs no user-agent sniffing. Two tests pin the pair — one phone,
   one desktop — because the same event has to mean opposite things.

### 4.4 UI

In `LectureNotes.jsx`, beside the existing **Key points** button (`KeyPoints`, line 484-551) — same
visual family, same `rounded-full border border-coffee-200 bg-paper` pill, `Volume2` /
`Pause` from lucide-react, `text-ember-500` icon. Copy that button's classes verbatim.

Collapsed: `▶ Listen (12 min)`. Expanded control bar: play/pause · ⏮ ⏭ chapter · speed
(0.75/1/1.25/1.5) · voice picker (only if >1 `en-*` voice) · current chapter heading · a caption
reading `"3 code listings and 1 equation skipped — they're on screen"`.

**Highlight-follows-voice — BUILT at group level, see §4.10.** The original sketch below is kept
for the word-level part, which is still outstanding: `SpeechSynthesisUtterance.onboundary`
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

**Built.** `useSpeech` tracks a clean run — started at unit 0, no `skipTo` — and passes that as
`onFinished(clean)`; `TopicAccordion`'s `onListenFinished` marks the topic read only when it is
`true`. Pausing and resuming stays clean; pressing next to the end does not. Both signals run in
parallel and `setRead` is idempotent, so whichever lands first wins.

### 4.6 Phases

| Phase | Work | Est. |
|---|---|---|
| ~~A0~~ | ~~§3 shared foundation (serialiser + dictionary + tests)~~ — **done** | 4–6 h |
| ~~A1~~ | ~~`useSpeech.js` with all four landmines + stub tests~~ — **done** | 3–4 h |
| ~~A2~~ | ~~`ListenToTopic.jsx`, wired into `LectureNotes.jsx`~~ — **done** | 2–3 h |
| ~~A3~~ | ~~Progress integration, wake-lock toggle~~ — **done** (the skipped caption shipped in A2) | 1–2 h |
| A4 | Real-device pass: Android Chrome, iOS Safari, desktop — **desktop done** (§4.8), the two phones outstanding | 2 h |
| | **Total** | **~1.5–2 days** (~1 day after A0) |

### 4.8 Desktop pass — what the real browser showed (2026-09-13)

Driven on Windows Chrome against the dev server with Supabase unconfigured, which makes
`PublicOrGated` fall through to the full `CourseDetail` — the notes render with no sign-in, so the
pass needs no account. Course: UUY-CYB 122, topic 1.

Working end to end, in the browser and not only against the stub:

- The pill renders in the notes panel, expands to the control bar, and starts speaking on the click
  that opened it — the gesture requirement is satisfied by the button itself, as §4.3.3 planned.
- Unit 1 ran well past 15 seconds and advanced to 2/3 on its own. **Landmine 2 is genuinely
  handled** — chunking plus `onend` chaining survives the cutoff that was the whole reason for it.
- Pause, resume, the speed cycle and a voice change mid-topic all behave: the last two restart the
  current chunk and keep both the unit index and the playing state, rather than going silent until
  the chunk happened to end.
- Playing the topic out marked it read — the check appeared on topic 1 and the header went to
  "1 of 12 topics read". §4.5's clean-run signal works through the real `onend`, and pausing,
  resuming and changing settings mid-run all stayed clean, as intended.
- COS 121 offers Listen on 4 of its 9 topics. `canNarrate`'s floor is doing exactly the job §3.4
  measured it for on the listing-heavy course, in the live UI.
- No console errors across the run.

**One thing the stub could not have caught: `speechSynthesis.paused` lies on Windows Chrome.**
After `pause()` the audio genuinely stops and `speaking` stays `true`, but `paused` reads `false` —
so the pair `(!speaking && !paused)` is *not* a reliable "is it paused" test on desktop. This does
not affect §4.3.4's detector, which is gated on our own `statusRef.current === 'playing'` and so
never runs while the student has paused deliberately. It is recorded because the mobile pass will
be reading the same two flags to confirm the suspension path, and reading `paused` as authoritative
there would produce a false result.

Outstanding: Android Chrome and iOS Safari. Both need a real handset — the screen-lock suspension
in §4.3.4 cannot be provoked in a desktop browser or in a device emulator, and it is the one
behaviour Option B exists to work around.

### 4.9 Review round — eight findings, all real (2026-09-13)

`/code-review high` over `master...HEAD`. Every finding was reproduced before being fixed — two of
them by driving the page, which is the only place they were visible.

**The two that mattered, and what they have in common:** both left the control bar showing a
running player with nothing coming out of the speakers.

1. **One device, many players.** `speechSynthesis` is a single global, but `LectureNotes` keeps a
   *Set* of open accordions and mounts a `ListenToTopic` — and therefore a `useSpeech` — inside
   each one. Every instance called `cancel()` on unmount, so collapsing an unrelated topic killed
   the audio of the topic actually playing. The dead run came back as `error: 'interrupted'`, which
   the queue deliberately ignores, so nothing ever updated the UI. Reproduced live: play topic 1,
   collapse topic 3, `speaking` goes false while the bar still reads Pause. Fixed with a
   module-level owner claim — an instance touches the device only while it holds it, and claiming
   stands the previous owner down, so two bars can never both read Pause.
2. **`cancel()` does not lift a pause.** Verified in Chrome: `pause()` then `cancel()` leaves
   `paused` true, and `speak()` on a paused synth queues without voicing. So Pause → Next and
   Pause → close → Listen queued utterances nobody could hear. Every cancel-then-speak path now
   goes through `resetDevice`, which lifts the pause.

**The stub was part of the problem.** `useSpeech.test.jsx`'s fake `speechSynthesis` cleared
`paused` in both `cancel()` and `speak()` — neither of which a real engine does — so a full suite of
passing tests could not see either defect. The stub now models both, and three of the new tests
fail against the old code.

**Also fixed:** a regex lookbehind in `chunkSpeech` (an early SyntaxError on iOS Safari below 16.4,
which would have taken down the whole notes renderer rather than just the button — there is no
browserslist here and Vite's default target still lists safari14); `^2`/`^3` matching a leading
digit anywhere after a caret, which read PHY 128's `I^2R` and MTH 121's `d^2y` with the exponent
fused to the next symbol and `2^256` as "2 squared 56" *while reporting complete*, so the refusal
path could not catch it; `$3.4M` and `$234K` (both real, in cyb122.js) read as "3.4 dollarsM"; a
wake-lock request that could resolve after its release and leave the screen on with nothing
playing; `canNarrate` re-running the full serialiser on every render of every open accordion; and
Play on a finished topic replaying only the closing section — and, because that run did not start
at unit 0, never marking the topic read.

Ten tests added, 767 pass, lint clean.

### 4.10 Highlight-follows-voice — built (2026-09-13)

§4.4 called this "the thing that makes Option A feel finished", and it is built at **group level**,
which is the granularity the data already supports on every browser including Safari.

**The join is one field.** `topicToSpeechUnits` walks `buildOutline(topic.sections)`, and so does
`TopicAccordion` — the same call over the same sections, keyed by the same index. Each unit now
carries that index as `outlineIndex`, and the renderer matches on it. No second traversal, no
mapping to maintain by hand. It is deliberately *not* the unit's position in the array: a group that
produces no speech is dropped, so the two part company the moment a topic opens with a resource
link (a test pins this).

**Reported upward, not highlighted in place.** `ListenToTopic` sits above the sections, not around
them, so it tells the page which outline item the voice is on and `TopicAccordion` paints. It
reports through a ref, the same reason `useSpeech` holds `onFinished` in `finishedRef`: a parent
passing a fresh arrow every render must not turn this into a report per render. It reports `null`
whenever playback is not *playing* — a paused or finished player leaves no section lit — and on
unmount, so collapsing the topic mid-listen clears the wash.

**Matching is on section identity, not on an index**, because the two render branches index
differently (the grouped branch by outline item, the flat one by section) and because a group's
tail sections are being read just as much as its heading is.

**Collapsed groups open themselves.** The voice reads straight through a topic and only one group
is open by default, so without this the highlight spends most of a listen inside a closed panel —
which is the same as not having it. Opening is one-way: nothing re-collapses behind the voice, so a
student who opened something to read along keeps it. Done in the notify callback rather than an
effect on `speakingIdx`; the React Compiler lint rejects a synchronous `setState` in an effect, and
the callback is the more honest place anyway.

**No auto-scroll.** Coursera scrolls; this does not. A page that scrolls itself while the student
is reading ahead or looking back is fighting them, and the wash is cheap to find. Worth revisiting
only if the phone passes say otherwise.

> **Revisited — §4.11.** They said otherwise. On a phone the wash is a screen and a half below the
> player by the time the voice reaches it, so "cheap to find" was a desktop judgement.

The wash is a tint plus a left rule rather than a full border, with a negative inline margin, so
nothing on the page moves as it turns on and off — a highlight that reflowed the text under a
reader would be worse than no highlight.

Word-level highlighting inside the note text itself is not built, and would be a separate, larger
enhancement — the utterance's own text is post-pronunciation (acronyms letter-spaced, inline maths
converted) and post-chunking, so lighting up a word IN the displayed note means mapping a spoken
position back through both transforms onto the original prose, which the corpus's acronym density
makes genuinely lossy. §4.12 below took the lower-risk route to the same experience instead.

Verified in the browser: the wash appears on the opening paragraph, moves when the voice does,
clears on pause, and opens the "Threat Actors" group when the voice reaches it (`aria-expanded`
false → true). Play on a finished topic restarts at 1/3 with the wash back on the first section.

### 4.12 Word-level highlighting — the karaoke caption (2026-09-18)

Built as a caption line, not as highlighting inside the note text — a deliberate choice between two
real options, made with the user rather than assumed:

- **In place, inside the paragraph.** Closer to what §4.4 originally sketched, but the utterance text
  `onboundary` reports position *into* is the spoken form — after `applyPronunciation` (acronyms
  letter-spaced: "TCP" → "T C P") and after `chunkSpeech`. Lighting up the right word in the
  *displayed* note means mapping that position back through both transforms onto the original prose,
  and the acronym density in this corpus (§3.1) makes that mapping lossy, not exact.
- **A caption strip, echoing the utterance's own text.** What ships. No mapping at all — the caption
  *is* the text `onboundary`'s `charIndex` already indexes into, so it is exactly as in sync as the
  browser's own event, with nothing to keep in step by hand.

**What it shows.** A line in the real control bar (never the docked one — see §4.11, a docked bar has
to stay one line on a phone) holding the chunk currently speaking, with the reported word lit up
(`bg-ember-500/20`, matching the wash's own highlight colour). `caption.start === -1` — a chunk that
has started but has had no word boundary yet — renders the line plain. Marked `aria-hidden`: the same
words are already in the document as the real note text, so a screen reader repeating this every few
hundred milliseconds would be noise, not help.

**State lives in `useSpeech`, not the component.** `onstart` sets the chunk text; each `word`-named
`boundary` event replaces it with `{ text, start, end }`, computing the word's end from
`event.charLength` where the engine reports it and scanning to the next whitespace where it does not
(`wordLengthAfter` — some Android WebViews send a boundary with no length at all). A `sentence`
boundary is explicitly ignored, or an engine that emits both would jump the highlight to a word it has
not reached yet. Cleared on `stop()`, `standDown()` (another topic takes the device) and a topic
change; deliberately **not** cleared on `pause()` — freezing on the last word read is more useful than
blanking the line, the same reasoning as leaving the section wash lit while paused.

**Real-device finding, not a code defect.** Driven in Windows Chrome against UUY-CYB 122: the caption
text updated correctly every chunk regardless of voice, but the network "Google UK English" voice —
what `pickVoice` reaches for by default, en-NG not being installed — fired `start` and nothing else;
no `boundary` event ever arrived, so no word was ever picked out. Switching to a local voice (Windows'
own SAPI "Microsoft David") produced a clean `word` boundary roughly every 300–700ms with a correct
`charIndex`/`charLength`, and the caption highlighted each one live, confirmed by both a DOM poll and
a zoomed screenshot mid-word. This is §4.3's landmine 1 territory from the other side: it is not only
Safari that can fall back to "caption with nothing picked out" — a *network* voice on Chrome does too,
silently, with no error and no event to say so. The caption already degrades correctly for this case
(plain text, still updating per chunk), because that fallback was designed in from the start rather
than discovered after.

Thirteen tests in `useSpeech.test.jsx` (`describe('useSpeech — the karaoke caption')`) pin: the chunk
appearing on start with no word chosen yet, a `word` boundary picking out the right slice, the
`charLength`-missing fallback, a `sentence` boundary being ignored, freezing (not clearing) on pause,
clearing on `stop()`, on a topic change, and on `standDown()` when a second topic takes the device,
clearing on each of the four separate failure exits in `speakFrom` — reaching the end having spoken
nothing, the `MAX_ERROR_STREAK` cut-off, landmine 5's `giveUp()`, and `skipTo()`'s not-playing branch
picking a new section from a finished topic — and a non-numeric `charLength` being treated as absent
rather than string-concatenated into the highlight range.

Two rounds of `/code-review high` over the first cut of this found five real issues, none caught by
the tests written alongside the feature: three of the four failure exits above left a chunk's text
(sometimes mid-word-highlighted) sitting under a UI that had just told the student playback stopped;
`giveUp()` — landmine 5's own failure exit — turned out to be a fourth, found only on the *second*
review pass once the first round's fix made "failure exits" a named category to check exhaustively
against; and `event.charLength`, which is a value the *engine* hands back rather than one this app
controls, was used in `start + length` with no type guard, so a non-conforming engine reporting it as
a numeric string would silently concatenate instead of add. The reviewer also flagged that the reset
of this flag — `status`/`unitIndex`/`interrupted`/`failed`/`caption`/wake-lock — is hand-duplicated
across five-plus exit sites (`standDown`, `stop`, `play`, the signature-change effect, and now
`giveUp`), which is exactly the shape of bug this was: not refactored into one shared path here,
since doing that safely across every existing exit is a larger, separate change against an already
heavily-tested file — left as a real future risk rather than a silent one.

### 4.11 The first real-use pass — it stopped, and you had to scroll back up (2026-09-14)

Two complaints, one sentence each, and they turned out to be the same shape: the player knew less
about itself than the student did.

**"It stops most of the time and doesn't continue."** Landmine 5, now documented at the top of
`useSpeech.js`. Three separate holes, all of which end the same way — the chain stops, the bar still
says Pause, and nothing is coming out:

1. **An `interrupted` error was ignored outright.** It is what our own `cancel()` produces, so the
   handler returned before it even checked the run id. But every internal cancel bumps `runRef`
   *before* calling `cancel()`, so one of ours is always stale by the time its error lands — which
   means an `interrupted` still carrying the **current** run id came from outside the page: the OS
   took the audio, another app spoke, a notification landed. Checking staleness *first* and treating
   what survives as a real interruption is the whole fix, and it is the commonest of the three.
2. **A chunk can die with no event at all** — the engine wedges, or the utterance is collected.
   Nothing can detect that except a clock, so there is now a watchdog per chunk: `onstart` sets the
   budget from the chunk's own length and rate, and `onboundary` (Chrome and Edge fire one per word;
   Safari fires none) re-arms it at four seconds, which is the difference between noticing in four
   seconds and noticing in twenty. A module-level reference holds the live utterance, the documented
   workaround for the collector case.
3. **Recovery says the chunk again rather than skipping it**, once, then stops and says so. The
   retry starts the chunk from its beginning, so nothing is missed and `cleanRunRef` is deliberately
   *not* cleared — a phone that buzzed mid-topic should not cost the student their read mark.

And the suspension case now **tries before it explains**: a student who never pressed pause is
waiting for the next sentence, not a notice, so returning to the page restarts the chunk. The
screen-lock notice is what is left when even that gets no voice — the same message, arrived at by
trying first. `resume()` also stopped calling `speechSynthesis.resume()` on the utterance in flight:
saving half a sentence costs the watchdog, since there is no event left to hang one on.

**"I have to scroll back up to pause it, and it should go to where it's reading."** Both are the
same problem — the player is at the top of a topic that is several screens long.

- The transport **docks to the bottom of the window** once the real bar scrolls off (an
  IntersectionObserver on the bar itself, not the panel; through a portal, because `fixed` is
  measured against any transformed ancestor). Same hook, same state — a copy of the controls, not a
  second player. Where there is no IntersectionObserver it simply never docks.
- The page **follows the voice**, which §4.10 had decided against. It moves only when it has to:
  nothing happens while the section is already in the band a reader is looking at, and a `wheel` or
  `touchmove` holds it off for eight seconds — those two events are the honest signal for "the
  student is scrolling", because a programmatic smooth scroll fires `scroll` but fires neither.
  There is a toggle in the bar (on by default, remembered), and the page does the scrolling because
  the page owns the sections; the player only carries the preference.
- The campus-map and help buttons are `fixed` at z-50 in the two bottom corners — exactly where the
  docked bar's transport and close controls land on a phone. They step up while it is docked
  (`.docked-player-open .floating-dock-item` in `index.css`), on `bottom` rather than a transform,
  because `.float-bob` animates transform and would overwrite one on its next frame.

**Review round — five findings, all real.** Three of them were in the new watchdog, and each one
disarmed exactly the guard it was added to provide:

- `onend` cleared the watchdog *before* checking the run id. Our own `cancel()` fires `end` rather
  than `error` on some browsers, and every cancel-and-respeak path arms the replacement's watchdog
  synchronously — so the stale `end` disarmed the chunk now in flight, a task later. The retry
  inside `recover()` was therefore never watched, which means a chunk that wedges twice could never
  reach `giveUp()` and the screen-lock notice was unreachable on those browsers.
- `pause()` stops the clock but does not bump `runRef`, so a `start` or `boundary` landing just after
  the click re-armed a watchdog nothing would ever clear — and `recover()` then started the voice
  again behind a bar that said Play, which `pause()` refuses to act on. `armStall` and `recover` now
  both bail on `pausedRef`.
- The boundary heartbeat ignored `event.name`. `BOUNDARY_SILENCE_MS` is a word rate; an engine
  reporting `'sentence'` boundaries can legitimately exceed it inside one chunk, so the watchdog
  would have cut working audio and blamed a screen lock on a device that never locked.

And two in the UI: `barOnScreen` was not reset on close, so closing from the docked bar and pressing
Listen again flashed a docked bar and shoved the floating buttons up for a frame; and the
scroll-suppression listeners were gated on `speakingIdx`, which is null while *paused* — so pausing
to scroll up and re-read left nothing to suppress, and resuming yanked the page straight back down.
Each is pinned by a test that fails without its fix.

**Codex's round — one more, also real.** `wheel` and `touchmove` are not every way a page gets
scrolled: PageDown, Space, the arrow keys, dragging the scrollbar and find-in-page move it without
firing either, so a student reading ahead that way was still being pulled back to the voice. A
`scroll` listener catches all of them, at the cost of also firing for our own smooth scroll — hence
`SELF_SCROLL_MS`, a window the follow effect opens before it scrolls, inside which a `scroll` is
ours and not theirs. The wheel and touch listeners stay: they are unambiguous, and they land before
the page has moved at all.

**Copilot's round — three more, all real, and all of them the same mistake in different places:
state that is shared behaving as though it were not.**

- The docked bar was shown for `playing || paused` only, so a topic that ran out while the student
  was reading further down took the Play and Previous buttons away with it — leaving exactly the
  scroll-back-up this bar exists to abolish. `ended` belongs there too. `idle` does not: that is a
  player another topic has stood down, and docking it would put two bars on one edge of the window.
- Follow is **one setting**, but it was read per player at mount, and LectureNotes keeps a player
  mounted per open topic. Turning it off in one topic left every other mounted topic reporting
  `follow: true` and scrolling the page for a preference saved as off. A module-level listener set
  now broadcasts the change to all of them, and the bar that was clicked goes through the same path
  as the ones that were not, so they cannot disagree. (`storage` events are no help — they fire in
  *other* tabs only.)
- The suspension restart did not reacquire the wake lock the hide had released, so for a student
  with "Keep screen on" enabled the first screen lock quietly turned it off for the rest of the
  topic — and the next lock interrupted the same listen again.

Verified in Chrome against CYB 224: the bar docks with the topic and section on it, the wash moves
and the page follows it, a wheel gesture suppresses the next follow, and both floating buttons clear
the bar. One trap worth recording for the next browser pass — **in an occluded window
`visibilityState` is `hidden`, and IntersectionObserver, `requestAnimationFrame`, CSS transitions
and smooth scrolling all stop**, so a transitioned property reads its old value forever and the
feature looks broken when it is not.

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
