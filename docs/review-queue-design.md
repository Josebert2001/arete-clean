# Review Queue — Design

Spaced retrieval practice over the question banks, exam banks and flashcards
that already exist. Written as an implementation spec — every decision below
names the file it lands in.

---

## The problem

Areté tests a student and then forgets almost everything about it.

`useProgress.js:110` stores one record per bank:

```js
quizScores[courseSlug] = { score, total, date }   // most recent attempt wins
```

Which means:

- A student who has missed the same CSRF question five attempts running is
  indistinguishable from one who has never seen it.
- Every earlier attempt is overwritten, so there is no trend — only a last score.
- The flashcards in `LectureNotes.jsx` (termlists in card mode) record nothing
  at all; close the tab and the session never happened.

The content is not the gap. Counted on `master`:

| | count |
|---|---|
| MCQs across the authored banks | 1,137 |
| Written questions (`cyb122ExamPrep`, `cyb222ExamPrep`) | 107 |
| Termlist cards in lecture notes | 1,586 |
| **Total reviewable items** | **2,830** |

More arrive every time a bank is authored, so this only grows.

The gap is that nothing tracks **which of them a particular student is
forgetting, or when they should see them again**.

That is what this design adds, and it adds it with no AI calls, no new API
endpoint, no new Supabase table and no network dependency at review time.

---

## 1. Item identity

Nothing in the app currently identifies a question. `CourseQuiz.jsx:34` samples
the bank at random and `Quiz.jsx:12` reshuffles the options, so neither position
in the bank nor position in the attempt is stable.

**Bank array index is not usable.** We insert questions into the middle of banks
routinely — every index after the insertion point would silently re-point at a
different question, corrupting history rather than losing it. Silent corruption
is the worst failure mode available here.

**Decision: a content hash of the prompt text, scoped by course.**

```
itemId = `${kind}:${courseSlug}:${hash(promptText)}`
       →  q:uuy-cyb-222:1f4c9a2b
```

**What counts as "the prompt" differs by kind**, and getting it wrong silently
conflates two items into one shared schedule. Running the hash over the real
corpus is what settled this — the first attempt hashed the bare
`question` / `term` and produced 78 duplicate ids:

| kind | source | hashed | why |
|------|--------|--------|-----|
| `q` | `course.quiz[]` | `question` + sorted `options` | A stem alone is not unique across a bank. Sorted, because `Quiz.jsx` reshuffles options every attempt. |
| `x` | `course.examPrep[]` | `question` | Sufficient — no duplicates in the corpus. Re-weighting a question's `marks` correctly leaves its identity alone. |
| `f` | lecture-note `termlist` items | `term` + `def` | **45 terms in ENT 221 alone appear in more than one termlist with genuinely different definitions.** `Need for Achievement` is *"a strong drive to succeed"* in note 1 and *"McClelland's acquired-need theory"* in note 2. On the term alone, a student drilling one would be credited for the other. |

Fields are joined with U+001F, which survives the whitespace normalisation below,
so a card `{term: 'Web app', def: 'risk model'}` cannot collide with
`{term: 'Web', def: 'app risk model'}`.

With per-kind identity the corpus produces **2,827 unique ids from 2,830 items**.
The three remaining duplicates are byte-identical cards repeated across two notes
(`Sequence Number` in UUY-CYB 221, `Utilization of Resources` in ENT 221) —
collapsing those into one schedule is correct, not a defect. Nobody should drill
the same card twice.

Use the exported `quizItemId` / `examItemId` / `cardItemId` helpers rather than
calling `itemId` directly, so this cannot be got wrong at a call site.

`hash` is a 32-bit FNV-1a rendered base36 — synchronous, ~10 lines, no Web
Crypto (the SHA-256 in `FlagChallenge.jsx` is async, which is wrong for building
a list during render).

Because `kind` is part of the id, the collision domain is one *kind* within one
course, not the whole corpus. The largest such set is ENT 221's 767 termlist
cards, giving a birthday collision probability of ~7 × 10⁻⁵. Negligible, and a
collision would merely conflate two cards' schedules — it cannot corrupt content.

What this buys:

| Change to a bank | History |
|---|---|
| Reordering questions | preserved |
| Inserting questions mid-bank | preserved |
| Moving a bank between files | preserved |
| **Renumbering lecture-note topics** | **preserved** |
| Editing a question's wording | resets — treated as a new item |

The renumbering row is not hypothetical. We shifted UUY-CYB 222's topics 5–10 to
7–12 an hour before this was written; any identity keyed on note number would
have wiped every student's history for that course. Hashing the term text
survives it.

Losing history when a question is edited is the deliberate trade. A materially
reworded question *is* a different question and should be re-learned; the cost
is that fixing a typo also resets it. Acceptable.

---

## 2. Scheduling

**Leitner boxes, five levels.** Not SM-2, not FSRS.

```
box:       1    2    3    4    5
interval:  1d   3d   7d   21d  60d
```

- **Correct** → `box = min(box + 1, 5)`, `due = today + interval[box]`
- **Wrong** → `box = 1`, `due = tomorrow`, `lapses += 1`
- **First sight** → enters at box 2 if correct, box 1 if wrong. Getting something
  right first time should not force a next-day review.

Why not SM-2: it wants a 0–5 self-grade per item. MCQ outcomes are binary, so the
extra resolution would have to come from the student rating their own recall —
which is precisely the calibration weakness this app has (see §8). Leitner needs
one integer of state and explains itself to a student in one sentence: *get it
right and you see it later, get it wrong and you see it tomorrow.*

**Written questions carry partial credit.** `CourseExamPrep` already computes a
self-marked score out of the question's `marks`. Map it:

```js
const correct = awarded / marks >= REVIEW_PASS_FRACTION;  // 0.7
```

**Leeches.** At `lapses >= 8`, stop rescheduling and surface the item with a
prompt to go and read instead: *"You've missed this 8 times — read Topic 8 —
Website Attacks first."* Every written question already carries a `source`
naming its topic, and every MCQ carries an `explanation`; this is the payoff for
having required those fields.

---

## 3. Storage

**New storage key: `review-v1`.**

`user_progress` is keyed `PRIMARY KEY (user_id, storage_key)` (see
`setup-supabase.mjs:180`), so a new key is a new row automatically. **No
migration.** That matters here — every migration in `supabase/migrations/` has to
be run by hand in the SQL editor, so avoiding one removes a whole deployment
step and a whole class of PGRST204 failure.

```js
{
  items: {
    'q:uuy-cyb-222:1f4c9a2b': {
      b: 3,          // box, 1-5
      d: 20412,      // due, days since epoch — reviews are day-granular
      n: 5,          // times seen
      l: 1,          // lapses
      t: 1755102000000  // last reviewed (ms), for cross-device merge only
    }
  }
}
```

~45 bytes of JSON per item. A heavy student tracking 600 items sits around 27 kB.

### Writes must be batched — this is not optional

`useProgress.js:61-75` pushes **the entire progress blob** to Supabase on a 1 s
debounce after any state change. Recording an outcome per answered question
would re-upload the whole item map on every tap — tens of kB per question, on
metered Nigerian mobile data, for a free app.

So the session accumulates outcomes in component state and commits **once, on
session end**, through a single `recordReviews(outcomes[])` call. One write per
session, not per question. Any implementation that calls the writer inside the
answer handler is wrong.

---

## 4. Merging across devices

`mergeProgress` (`useProgress.js:8`) currently understands only
`completedModules` and `quizScores`; an unknown key on the cloud side is dropped
on pull. It needs a third branch:

```js
// items: merge per key, most recently reviewed wins
const items = { ...(cloud.items || {}) };
for (const [id, it] of Object.entries(local.items || {})) {
  if (!items[id] || (it.t || 0) >= (items[id].t || 0)) items[id] = it;
}
```

Same last-write-wins rule already used for `quizScores`, applied at item
granularity instead of bank granularity — so a student who reviews on their
phone and then opens a laptop keeps both sessions instead of losing one.

The extension is purely additive (a missing `items` on either side is `{}`), so
all 15 existing tests in `useProgress.test.js` keep passing unchanged.

---

## 5. Building the day's queue

```js
buildQueue(reviewState, availableItems, { today, limit = 20, newCap = 10 })
```

1. **Due** — `d <= today`, sorted most-overdue first, then lowest box first so
   the weakest material leads.
2. **New** — never-seen items, capped at `newCap`. The cap is what makes this
   usable: ENT 221 alone carries 367 MCQs and 767 termlist cards, so a student
   who opens it once would otherwise face a 1,134-item backlog and abandon the
   feature on day one.
3. Truncate to `limit`.
4. **Interleave across courses** — shuffle the final list rather than grouping by
   course. Interleaved practice outperforms blocked practice, and it costs a
   shuffle.

`availableItems` must be filtered to the student's own catalogue, and to
`profiles.selected_courses` when that is set — otherwise a foundation-mode
student gets drilled on courses they do not take.

---

## 6. Surfaces

| Where | What |
|---|---|
| `/review` (new route, `RequireAuth`) | the session itself |
| Home / dashboard | **"14 items due today"** card |
| `CourseDetail` | "Review 6 items due in this course" |

The dashboard card is load-bearing, not decoration. A review queue nobody opens
does nothing, and this is the only thing in the app with a reason to bring a
student back on a day they had not planned to study.

The session reuses `Quiz.jsx` for MCQ items — it already handles option
shuffling, per-question feedback and back-navigation. Flashcard and written items
need a lighter card (prompt → reveal → *Got it* / *Missed it*).

**Everything runs client-side.** No Groq call, no rate limit, no JDoodle. It
works offline on a cached chunk, which is the difference between a feature
Nigerian students can use on 2G and one they cannot.

---

## 7. Files

| File | Change |
|---|---|
| `src/utils/reviewSchedule.js` | ✅ **done** — identity helpers, `schedule`, `applyReviews`, `buildQueue`, `pruneItems`. Pure, no React. |
| `src/__tests__/reviewSchedule.test.js` | ✅ **done** — 83 tests |
| `src/components/useProgress.js` | ✅ **done** — `mergeProgress` carries `items` (per-item last-write-wins); `recordReviews(outcomes[])` commits a session in one `setProgress` |
| `src/components/Quiz.jsx` | ✅ **done** — optional `itemIdFor` prop; `onComplete(score, total, outcomes)` |
| `src/components/CourseQuiz.jsx` | ✅ **done** — second useProgress instance on `review-v1`; records the session on complete |
| `src/components/CourseExamPrep.jsx` | emit an outcome per question from the self-marked fraction |
| `src/components/LectureNotes.jsx` | card mode emits outcomes |
| `src/pages/Review.jsx` | **new** — the queue page |
| `src/App.jsx` | one route |
| Home / dashboard | the due-today card |

Suggested order: `reviewSchedule.js` + its tests → `useProgress` → `Quiz`
wiring → `/review` → dashboard card → examPrep and flashcards. The first two
land with no visible change, which makes them safe to merge on their own.

---

## 8. Out of scope for v1

- **SM-2 / FSRS.** Revisit only if Leitner's fixed intervals prove too blunt.
- **Confidence rating before reveal.** It belongs with AI answer-marking, where
  predicted-vs-actual is the whole point. Adding it here first would just be
  another self-grade.
- **Streaks and gamification.** Cheap to add, hollow without evidence, and easy
  to bolt on once there is usage data.
- **A new Supabase table.** The existing `storage_key` row is enough.

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| Editing a question resets its history | Accepted — see §1. Avoid gratuitous rewording of shipped banks. |
| Item map grows without bound | Prune box-5 items unseen for 180 days on load. |
| Student never opens `/review` | The dashboard card is the entry point; if it does not move usage, the feature has failed and should be cut rather than decorated. |
| A question is edited to fix a typo and history is lost | Acceptable. The alternative — author-assigned stable IDs on ~1,200 existing questions — is a much larger cost paid up front and forever. |
| Blob write size on mobile data | Batched to one write per session (§3). Verify in the network tab before shipping. |
