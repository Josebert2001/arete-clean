# Multi-Department Implementation — Audit & Remediation Plan

> **Status: all six findings resolved (2026-08-01).** F4 was fixed independently in commit
> `99a16fa` while this audit was being written; the rest were fixed in the pass that followed.
> Gates after the fixes: **277 tests across 25 suites**, 0 lint errors, clean build.
> The two migrations in Step 4 remain **outstanding user actions** — the code is ready for them.
> Per-finding detail is inline below under each heading.

**Audited:** 2026-08-01 · branch `feat/data-science-department` (uncommitted working tree)
**Scope:** the department registry, per-department catalogue resolution, the tutor's
server-side scoping, the `course_materials` pooling model, profile/department switching, and
the two pending migrations.
**Method:** read every file in the department path, then cross-checked the catalogues and the
tutor's resolver programmatically (every course in all three catalogues resolved through
`findCourseEntry`, both pool functions compared pairwise on shared codes).

**Gates at time of audit:** `npm test` 265/265 across 25 suites · `npm run lint` 0 errors
(4 pre-existing warnings) · `npm run build` succeeds.

---

## 1. Verified correct — no action needed

These were the things most likely to be wrong, and they hold up:

- **No cross-department leakage in the tutor.** All 57 Cybersecurity, 55 Data Science and 22
  foundation courses resolve through `findCourseEntry` within their own department, and **zero**
  resolve outside it. Scoping is structural (each department searches only its own knowledge
  text and note index), so there is nothing to filter afterwards.
- **No catalogue flash.** `useCatalogue.js:18` holds `status: 'loading'` until auth *and*
  profile settle, so a Data Science student never sees the Cybersecurity hub paint first. All
  three consumers handle `status === 'error'` with a retry — `Courses.jsx:571`,
  `CourseDetail.jsx:44`, `Planner.jsx:391`.
- **No DB constraint blocks the new slug.** `profiles.department` is plain `TEXT NOT NULL
  DEFAULT 'cybersecurity'` with no CHECK, so `'dataScience'` saves without a migration.
- **The backfill migration's slug list is exactly right** — all 22 cross-departmental slugs are
  covered, with no extras (verified against `getCrossDepartmentalCourses()`).
- **Profile switching cleans up after itself.** `ProfileForm.jsx:72` nulls `department_other`
  when a student moves off "not listed"; `ProfileSettings.jsx:39-44` nulls `selected_courses` on
  a department change, so foundation pins can't leak into a full catalogue.
- **Code splitting is intact.** `dataScienceCourses` builds as its own 114 kB chunk against
  `courses`' 859 kB; neither pulls the other. `Navbar.jsx` and `Welcome.jsx` read the
  lightweight registry rather than `useCatalogue`, and `studyPlan.js` no longer statically
  imports `courses.js` — so the Planner chunk carries no catalogue at all.
- **Slug/code hygiene across catalogues is clean:** no duplicate slugs within either catalogue,
  no cross-catalogue slug collisions, and no course sharing a code but diverging on slug (which
  would have split `course_materials` silently, since the UI keys on slug and the tutor on code).

---

## 2. Findings

### 🔴 F1 — `CYB 211` materials pool splits between the two catalogues

**The bug.** `dataScienceCourses.js:740` marks CYB 211 `crossDepartmental: true`. The
Cybersecurity copy in `courses.js` does not. `materialsDepartmentFor()`
(`departments.js:127`) therefore returns a *different pool for the same course* depending on
who is asking:

| Student | Pool used for CYB 211 uploads + reads |
|---|---|
| Data Science | `general` |
| Cybersecurity | `cybersecurity` |

Confirmed on the server side too — `resolveMaterialsDepartment` (`courseData.js:610`) produces
the same split. Consequence: notes a Cybersecurity student uploads for CYB 211 are **invisible**
to Data Science students taking the identical course, and vice versa. Each department sees an
empty materials list and no indication why.

**Root cause — the flag does two different jobs.** In `courses.js`, `crossDepartmental` selects
the foundation catalogue (`getCrossDepartmentalCourses()`, `courses.js:9612`). In
`dataScienceCourses.js` its only consumer is `materialsDepartmentFor()`, where it means "pool
this course's notes across programmes". For most courses those coincide. For CYB 211 they don't:
it *is* shared between two authored departments, but it is *not* a foundation course.

That is why the naive fix is wrong. Flagging CYB 211 in `courses.js` would push "Introduction to
Cybersecurity and Strategy" into the foundation catalogue (22 → 23 courses) for every student
outside Cybersecurity — a course most University of Uyo programmes do not take.

Note the Data Science file already commits to the "shared across programmes" reading for seven
more courses (GST 211, MTH 211/212/223, CSC 223, GST 311, INS 411). Those don't collide today
only because `courses.js` has no copy of them — Cybersecurity takes GST 212/312 instead. So this
is a systemic ambiguity that will bite again on department #3, not a one-off typo.

**Recommended fix — separate the two meanings.**

1. Keep `crossDepartmental` as "belongs to the foundation catalogue" (its `courses.js` meaning,
   unchanged, so the foundation list stays at 22).
2. Add an explicit `sharedMaterials: true` opt-in for courses two authored departments both take
   but that aren't foundation courses.
3. `materialsDepartmentFor(course, slug)` becomes
   `(course?.crossDepartmental || course?.sharedMaterials) ? 'general' : (slug || DEFAULT)`,
   mirrored in `resolveMaterialsDepartment` in `api/_lib/courseData.js`.
4. Set `sharedMaterials: true` on **both** copies of CYB 211 and drop `crossDepartmental` from
   the Data Science copy, so the flag means one thing everywhere.
5. Add `'cyb-211'` to the `UPDATE` list in
   `20260801000000_materials_department_backfill.sql` (it has not been applied yet, so editing
   it in place is safe — if it has been applied by the time this lands, ship a one-line
   follow-up migration instead).

*Lower-effort alternative, if you'd rather not add a field:* delete `crossDepartmental: true`
from the Data Science copy of CYB 211 only. One line, restores the invariant, but the two
departments then keep permanently separate notes for a course they genuinely share — and it
leaves the Data Science file internally inconsistent (why is CYB 211 not shared when GST 211 is?).

**Regression guard.** Add a test asserting the invariant directly, so this class of bug cannot
return when department #3 is authored:

> for every course code present in more than one catalogue, `materialsDepartmentFor()` must
> return the same pool for every department that carries it.

---

### 🟠 F2 — Data Science students lose the COS 121 and ENT 221 lecture notes

`courses.js` carries lecture notes for 10 courses. Four are imported from the shared
`src/data/lectureNotes/` directory (GST 121, MTH 121, UUY-CYB 123, UUY-CYB 221); **six are
authored inline** in `courses.js` — COS 121 (9 topics), ENT 221 (6), INS 224 (14), CYB 224 (21),
CYB 222 (10), UUY-CYB 222 (9).

Data Science also takes COS 121 and ENT 221. Because those notes live inline in `courses.js` —
which `dataScienceCourses.js` must not import — Data Science students get **no** lecture notes
for either, while Cybersecurity students get 15 topics' worth. This directly violates the
CLAUDE.md rule that lecture notes are the one layer every catalogue shares.

The existing guard (`departments.test.js:63`) hardcodes `mth-121` and `gst-121`, so it passes
while the gap exists.

**Fix.** Extract `cos121LectureNotes` and `ent221LectureNotes` into
`src/data/lectureNotes/cos121.js` and `ent221.js`, import them in both catalogues, and replace
the hardcoded test with a generic invariant: *for any course present in both catalogues, if one
copy has lecture notes the other must too.* The remaining four inline sets are Cybersecurity- or
foundation-only today, so they cost nothing yet — extract them opportunistically when a future
department takes them.

---

### 🟠 F3 — No foundation student is ever told their department is now available

`department_other` is read in exactly three places — `Welcome.jsx:32`, `Courses.jsx:433`,
`Navbar.jsx:22` — and all three only *display* it. Nothing ever compares it against the
department registry.

So the students who typed "Data Science" — the demand signal that justified authoring this
catalogue in the first place — will stay in foundation mode on 22 courses, seeing none of the
55-course catalogue built for them, unless they happen to open `/profile` and read the passive
banner there.

**Fix.** Normalize `department_other` (lowercase, trim) and match it against the `name` of each
`SELECTABLE_DEPARTMENTS` entry. On a hit, render a one-line prompt on Welcome and the dashboard:
*"Your department is ready — switch to the full B.Sc. Data Science catalogue"* linking to
`/profile`. Keep it in the lightweight registry path (no `useCatalogue`), and dismissible per
user like the onboarding banner.

---

### ✅ F4 — The Data Science catalogue gets no structural validation — *fixed in `99a16fa`*

> Resolved independently while this audit was being written. `validate-modules.mjs` now imports
> both catalogues into a `catalogues` array and runs the course checks over each. The remaining
> gap — that a new department must be added to that array or its courses are skipped — is now
> step 4 of the "Adding a department" recipe in CLAUDE.md.

`scripts/validate-modules.mjs` runs on every `prebuild`, but it imports `courses.js` only
(line 11). `dataScienceCourses.js` is never validated, so a missing `units`, a duplicate slug or
a `semester: 3` would ship silently.

That last one has teeth: `buildKnowledgeFromCourses` (`courseData.js:557`) only emits levels
100–400 and semesters 1–2, so an out-of-range course would **vanish from the tutor's index**
with no error anywhere. The catalogue is clean today (verified), but nothing keeps it that way.

**Fix.** Lift the existing course checks in `validate-modules.mjs` into a loop over every
registered catalogue rather than `courses` alone, and add assertions for the fields the tutor
depends on: `level ∈ {100,200,300,400}`, `semester ∈ {1,2}`, numeric `units`, unique slug.

---

### 🟡 F5 — `selected_courses` is gated on foundation mode in the hub but not the Planner

`Courses.jsx:534` computes `hasSelection = isFoundation && selectedCourses?.length > 0`.
`Planner.jsx:98-104` applies `profile.selected_courses` with no such check.

A student with stale pins would get a study plan filtered to slugs that don't exist in their
catalogue — an empty plan with no explanation — while their Course Hub looked normal. There is
no path to that state today (`ProfileSettings` clears the pins on a department switch), so this
is latent, not live. But the asymmetry is one line to close and the failure is silent.

**Fix.** Gate the Planner's filter on foundation mode the same way the hub does.

---

### 🔵 F6 — Housekeeping

- `package.json:6` still describes Areté as "for the Cybersecurity Department … plus a full
  Cybersecurity course hub". Stale for a multi-department product and it leaks into deploy
  metadata.
- CLAUDE.md's Key Files Map lists `20260801…_materials_department_backfill.sql` but not
  `20260802…_reg_number_optional.sql`, and doesn't mention the `DEPARTMENTS` registry in
  `api/_lib/courseData.js` that every new department must be added to.
- `ProfileForm.jsx:5` keeps a third copy of the level list (`['100L','200L',…]` as strings)
  alongside `YEAR_LEVELS` (numbers) and `courses.js`'s `LEVELS`. A test guards YEAR_LEVELS ↔
  LEVELS but not this one.
- *Pre-existing, not multi-department:* `courses.js` reuses codes CYB 311/312/313 for both a
  taught course and a SIWES placement. The note index handles it (`buildNoteIndex` prefers the
  copy that has notes), but the tutor's `course_materials` lookup keys on `course_code`, so
  Cryptography and SIWES I share an uploads pool. Low impact; noted for completeness.

---

## 3. Plan — as executed

Ordered so each step is independently shippable and testable. Everything here is frontend/data
plus one migration line — no schema change beyond what is already pending, no new dependencies.

### ✅ Step 1 — Commit the current work first

Done by the user, in three commits: `fa6b9e6` (Data Science + department-agnostic app),
`6d67f55` (onboarding), `99a16fa` (Data Science styling + catalogue validation). The audit fixes
therefore land as a reviewable diff on top of a known-good baseline, as intended.

### ✅ Step 2 — Fix the materials pool split (F1)

`departments.js` · `courses.js` · `dataScienceCourses.js` · `api/_lib/courseData.js` ·
`20260801…_materials_department_backfill.sql` · `departments.test.js`

Done as specified: `sharedMaterials` added as a second pooling flag alongside `crossDepartmental`
in both `materialsDepartmentFor()` and its server mirror `resolveMaterialsDepartment()`; CYB 211
carries it in both catalogues; `'cyb-211'` added to the backfill `UPDATE`. The invariant test
loads all three catalogues and asserts one pool per course code across every department that
carries it — so this cannot return when department #3 is authored.

### ✅ Step 3 — Close the lecture-note gap (F2)

`src/data/lectureNotes/cos121.js` + `ent221.js` (new) · both catalogues · `departments.test.js`

Done. The two note sets (1,568 lines) were moved out of `courses.js` into the shared directory
and imported by both catalogues; content verified intact (9 and 6 topics, first/last titles
unchanged). The hardcoded note assertion was replaced with a both-or-neither invariant over every
shared course.

Chunking improved rather than regressed: `courses` fell 859 → 708 kB and the shared-notes chunk
grew by the same amount, so a Cybersecurity student downloads the same total as before while a
Data Science student now gets notes they were previously denied. Department-only notes
(UUY-CYB 123/221) correctly stayed in the Cybersecurity chunk.

### Step 4 — Run the two pending migrations 🔒 — **still outstanding**

**User action, in the Supabase SQL editor, in this order:**

1. `20260801000000_materials_department_backfill.sql` — *after* Step 2 adds `cyb-211` to it
2. `20260802000000_reg_number_optional.sql`

Both are idempotent and both end in `NOTIFY pgrst, 'reload schema';`. The reg-number one is a
hard deploy blocker: ship the frontend without it and every signup that leaves the reg field
blank fails on the `NOT NULL` constraint.

### ✅ Step 5 — Surface the department to the students who asked for it (F3)

`departments.js` (`findDepartmentByName`) · `Welcome.jsx` · `StudentDashboard.jsx`

Done. `findDepartmentByName()` normalizes the typed name — case, spacing, punctuation, and the
"Department of" / "B.Sc." / "Programme" wrappers students actually type — then requires an
**exact** match. Deliberately strict: reading "Computer Science" as "Data Science" would push a
student onto the wrong curriculum, which is far worse than missing a match, and nothing here
mutates the profile — it only offers a link.

Welcome swaps its "your curriculum is on the way" note for a "your curriculum is ready" one with
the switch link; the dashboard shows a banner above the grid. Both read the lightweight registry,
never `useCatalogue`. Covered by 5 matcher tests (including the near-miss cases) and 4 render
tests (offer shown, offer withheld for an unauthored department, no offer for a student already
on a full catalogue).

### ✅ Step 6 — Harden the guards (F4, F5)

`scripts/validate-modules.mjs` (already done in `99a16fa`) · `Planner.jsx`

The Planner's `selected_courses` filter is now gated on `department.status === 'foundation'`,
matching how `Courses.jsx` gates its "My courses" chip.

### ✅ Step 7 — Housekeeping (F6)

`package.json` description rewritten for a multi-department product. CLAUDE.md gained the
20260802 migration row, `findDepartmentByName` in the registry description, the
`validate-modules.mjs` step in the "Adding a department" recipe, and — most importantly — an
explicit **shared-course flags** subsection explaining when to use `crossDepartmental` vs
`sharedMaterials` and that every catalogue carrying a course must set the same one.

### Step 8 — Verify

Automated gates, after the fixes: **277 tests / 25 suites passing**, **0 lint errors**
(4 pre-existing warnings), **clean build** including the prebuild validator. Both fixed defects
were additionally re-checked on an independent path — the standalone audit scripts that first
detected them now report empty.

Manual QA still to run, after the migrations are applied:

1. Sign in as a Data Science student → `/courses` shows 55 courses, no Cybersecurity-only ones.
2. Open COS 121 and ENT 221 as a Data Science student → lecture notes render.
3. Upload a note on CYB 211 as a Cybersecurity student → sign in as a Data Science student →
   the same note is listed, and the tutor cites it when asked about CYB 211.
4. Sign in as a foundation student with `department_other = 'Data Science'` → the switch prompt
   appears on both Welcome and the dashboard → following it to `/profile` and switching lands on
   the full catalogue with track progress intact.
5. Regression: a Cybersecurity student sees no change anywhere.

---

## 4. What is left

1. **Run the two migrations** (Step 4) — the only blocking item. `20260801` must be run *after*
   the `cyb-211` line added in Step 2, and `20260802` before any deploy carrying the optional
   reg-number frontend.
2. **Run the manual QA script** above once they are applied.
3. **Decision, revisitable at any time:** CYB 211 now pools its notes across both departments
   (`sharedMaterials`). If you would rather each department kept its own CYB 211 notes, remove
   the flag from both catalogues and drop `'cyb-211'` from the migration — the pool-agreement
   test enforces whichever answer you choose, as long as both catalogues agree.
