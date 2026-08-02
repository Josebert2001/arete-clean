# Onboarding & First-Run UX Overhaul — Implementation Plan

**Status:** approved for implementation · **Decision made:** reg number becomes optional.
**Audience:** the implementing agent/developer. Every file reference below was verified against the
codebase on 2026-08-01 (branch `feat/data-science-department`). Read each file before editing it —
line numbers drift.

---

## 1. Problem statement

New students sign up and don't know what to do next. The audit found no single broken screen —
the confusion is cumulative:

1. **The Course Hub re-asks the level the profile already knows.** `src/pages/Courses.jsx`
   resolves the active level from the URL param and `localStorage` only
   (`const activeLevel = paramLevel !== null ? paramLevel : getStoredLevel();`) — it never falls
   back to `profile.level`, even though setup just collected it. A new user clicking the bare
   `/courses` link on the Welcome page hits "Pick your level" → "Which semester are you in?" —
   two redundant gates.
2. **The Welcome page (`src/pages/Welcome.jsx`) offers four equally-weighted quick links** and no
   single primary action. The one personalized link ("See your 300L courses →") is a tiny text
   link inside the profile card.
3. **`src/components/StudentDashboard.jsx` has no new-user state:** a streak nag, four tracks at
   0/13 · 0/12 · 0/12 · 0/12, and a "Today's challenge" deep-linking into an arbitrary module —
   on day one, all noise. The personalized "Your {level}L courses" card sits third in the right
   column.
4. **Reg number is a hard signup blocker** in `src/components/ProfileForm.jsx` (required +
   letters-and-digits validation). Fresh 100L students often don't have one yet. → **Decision:
   make it optional** (see Phase 3; requires a DB migration first).
5. **Foundation-mode students get the most work with the least payoff:** the `CoursePicker` wall
   of checkboxes doesn't say it's optional prominently, and after saving, the "My courses" filter
   (`mineOnly` in Courses.jsx) stays off — they see no effect from what they just did.
6. **The signed-out onboarding banner in `src/pages/Home.jsx` promises the wrong order**
   ("Pick your level below → choose a course → start learning. Sign in once…") — clicking a level
   actually gates on sign-in *first* via `LevelGatePrompt`.

---

## 2. Non-negotiable ground rules (from CLAUDE.md — re-read it first)

- **No TypeScript.** `.jsx`/`.js` only.
- **No new dependencies.** Everything below is achievable with what's installed.
- **Tailwind custom palette only** (`cream`, `paper`, `ink`, `coffee-*`, `ember`, `moss`, `rust`).
  Never hardcode hex. Match existing component styling patterns (rounded-2xl cards,
  `display-heading`, `btn-primary`/`btn-ghost`, lucide icons).
- **Never run Supabase migrations.** Phase 3 *writes* a migration file; the **user runs it
  manually** in the Supabase SQL editor. Every migration must end with
  `NOTIFY pgrst, 'reload schema';` (otherwise PostgREST rejects changed columns with PGRST204).
- **`setup-supabase.mjs` is out of scope** unless the user explicitly approves the one-line edit
  flagged in Phase 3.4.
- **Branch off `master`, never push to it.** `npm test` and `npm run lint` must pass per PR.
- No `console.log`; unused vars are lint errors unless `_`-prefixed.
- Smallest change that solves each problem. Read every file before editing.

---

## 3. Phase 1 — Remove redundant decisions (PR 1, branch `feat/onboarding-defaults`)

### 3.1 Seed the Course Hub level from the profile

**File:** `src/pages/Courses.jsx`

**Current resolution** (inside the `Courses` component):

```js
const paramLevel = parseLevel(searchParams.get('level'));
const activeLevel = paramLevel !== null ? paramLevel : getStoredLevel();
```

**Target resolution order:** URL param → stored level (`LEVEL_STORAGE_KEY`) → **profile level** →
`null` (picker). A student who deliberately browsed another year keeps that choice (stored wins
over profile); an explicit link always wins (param wins over all).

**Changes:**

1. Derive the profile level once, using the exact same guard pattern as `Welcome.jsx`
   (`parseInt` + `YEAR_LEVELS.includes` — `YEAR_LEVELS` is already imported in Courses.jsx):

   ```js
   // "300L" → 300, guarded against unknown levels the same way Welcome.jsx is.
   const profileLevelNum = parseInt(String(profile?.level ?? ''), 10);
   const profileLevel = YEAR_LEVELS.includes(profileLevelNum) ? profileLevelNum : null;
   ```

2. Extend the resolution:

   ```js
   const activeLevel = paramLevel !== null ? paramLevel : (getStoredLevel() ?? profileLevel);
   ```

3. Extend the existing bare-URL normalisation effect (the one that currently writes the stored
   level into the URL when `paramLevel === null`) to use the same fallback chain, and add
   `profileLevel` to its dependency array:

   ```js
   useEffect(() => {
     if (paramLevel === null) {
       const fallback = getStoredLevel() ?? profileLevel;
       if (fallback !== null) setSearchParams({ level: String(fallback) }, { replace: true });
     }
   }, [paramLevel, profileLevel, setSearchParams]);
   ```

   The existing persist effect (`localStorage.setItem(LEVEL_STORAGE_KEY, …)` on `activeLevel`
   change) then stores the seeded level automatically — no extra write needed.

4. **Avoid the level-picker flash.** `profile` loads async (`profileLoading` from `useAuth()` —
   add it to the destructuring). Without a guard, the first render shows the level picker, then
   jumps to the seeded year when the profile lands. Extend the existing loading-shell early
   return (the `if (!catalogue)` skeleton) so the shell also holds while the profile is the only
   thing missing:

   ```js
   const waitingOnProfile = paramLevel === null && getStoredLevel() === null && profileLoading;
   if (!catalogue || waitingOnProfile) { /* existing skeleton */ }
   ```

   Keep this *after* all hooks (it already is) so hook order is stable across the transition.

5. **Do not touch the semester step.** The semester picker is a one-time-per-level question that
   is remembered (`SEMESTER_STORAGE_KEY`); guessing the semester from the calendar would be wrong
   half the time. Out of scope.

**Edge cases to preserve:**
- Signed-out / `authEnabled === false`: `profile` is null → `profileLevel` is null → behaviour
  identical to today. (`/courses` is behind `RequireAuth`, but the auth-disabled deploy renders
  it signed-out — must not break.)
- `activeLevel === 'all'` flows (param `'all'`) must be untouched — note `parseLevel` returns
  `'all' | number | null`, so keep the `!== null` comparison style, not truthiness.
- Foundation students get seeded too — intended; shared courses are still level-organised.

### 3.2 Welcome page: one primary CTA

**File:** `src/pages/Welcome.jsx` (a test suite exists: `src/__tests__/welcomePage.test.jsx` —
read it first, update it in the same commit).

**Changes:**

1. Directly under the hero paragraph, add a **primary CTA block** (`btn-primary`, full-width on
   mobile is fine, `ArrowRight` icon), chosen by profile:
   - Full department + `hasLevelLink`: **"See your {profile.level} courses"** →
     `/courses?level={levelNumber}`.
   - Foundation: **"Pick your programme's courses"** → `/courses` (the CoursePicker renders at
     the top of the hub for them).
   - Fallback (no valid level, full dept): **"Browse your courses"** → `/courses`.
2. Remove the now-duplicate small links inside the profile card (the `!isFoundation &&
   hasLevelLink` block's link and the foundation block's link) — keep the explanatory *text* in
   both blocks (the foundation-mode explanation is valuable), just drop the redundant `<Link>`s.
3. Retitle the quick-links section from "Where to start" to **"Also inside Areté"** and remove
   the "Browse Courses" entry from `quickLinks` (it's now the hero CTA) — leaving AI Tutor,
   Code Lab, and Study Plan as secondary discovery.
4. Keep the existing comment discipline: Welcome must never import `useCatalogue` (documented in
   the file's comments — the hand-off screen must not download the catalogue).

### 3.3 Fix the signed-out banner copy

**File:** `src/pages/Home.jsx`, `OnboardingBanner`.

Replace the flow sentence so the promised order matches reality:

> **New here?** Sign in once (free, no password) → pick your level → start learning. Your
> progress follows you on every device.

Keep `ONBOARDING_KEY` and dismissal behaviour unchanged.

**Phase 1 acceptance criteria:**
- A signed-in user with `level: '300L'`, no `?level=` param, and empty localStorage lands on
  `/courses` directly in the 300L flow (semester picker or remembered semester) — no level picker.
- `?level=100` still beats both stored and profile level. A stored level still beats profile.
- Welcome renders exactly one `btn-primary` CTA, correct per department status.
- `npm test` (extend `coursesPage.test.jsx` + `welcomePage.test.jsx` — see Phase 6) and
  `npm run lint` pass.

---

## 4. Phase 2 — Day-one dashboard state (PR 3, branch `feat/dashboard-first-run`)

> Build this **after** Phase 3 so the "Add your reg number" step can exist; if built earlier,
> ship that step conditionally (it keys off `!profile.reg_number`, which is only possible
> post-Phase 3).

### 4.1 Extract testable logic: `src/utils/gettingStarted.js` (new file)

Pure functions, no React, so they're Vitest-testable in isolation:

```js
// Steps for the first-run checklist. Inputs are plain values so this stays
// testable without React. `clicked` is the persisted map of step ids the
// student has tapped ({ [id]: true }).
export function deriveGettingStartedSteps({
  levelNumber,        // number | null (validated against YEAR_LEVELS by caller)
  isFoundation,       // boolean
  hasSelectedCourses, // boolean — profile.selected_courses?.length > 0
  hasRegNumber,       // boolean — !!profile.reg_number
  completedCount,     // number — completed modules across all tracks
  lastPath,           // string | null — readLastLocation()
  clicked,            // { [stepId]: true }
}) → [{ id, label, to, done }]

export function shouldShowGettingStarted({ completedCount, dismissed }) → boolean
// true while completedCount === 0 && !dismissed
```

**Steps to derive (in order):**

| id | label | link | `done` when |
|----|-------|------|-------------|
| `courses` | Full dept: "Open your {level}L courses" · Foundation: "Pick the courses your programme takes" | `/courses?level={n}` or `/courses` | foundation: `hasSelectedCourses`; full dept: `clicked.courses \|\| lastPath?.startsWith('/courses')` |
| `module` | "Finish your first module in the Code Lab" | `/lab` | `completedCount > 0` (terminal — completing it retires the whole card) |
| `tutor` | "Ask the AI Tutor a question" | `/tutor` | `clicked.tutor \|\| lastPath === '/tutor'` |
| `reg` | "Add your reg number" — **only include when `!hasRegNumber`** | `/profile` | `hasRegNumber` (i.e. never shown as done — it disappears instead) |

Persistence (localStorage, per-user so shared devices don't cross-contaminate; wrap all access in
`try/catch` like every other storage helper in this codebase):
- Dismissed: `arete-getting-started-dismissed-v1:<userId>` = `'1'`
- Clicked: `arete-getting-started-clicked-v1:<userId>` = JSON map

### 4.2 New component: `src/components/GettingStartedCard.jsx`

- Props: `{ profile, completedCount, lastPath }` — derive the rest inside via
  `getDepartment(profile.department)` (import from `../data/departments`; it's the lightweight
  registry, **not** `useCatalogue` — same rule as Welcome).
- Renders a `bg-paper border border-coffee-200 rounded-2xl` card titled **"Getting started"**
  with the steps as links: done steps get `CheckCircle2` (moss) + strikethrough-free muted text;
  pending steps get `Circle` (coffee-300) — mirror `CoursePicker.jsx`'s toggle-row styling.
- Clicking a step link records `clicked[id] = true` before navigation (plain `onClick` alongside
  the `Link`).
- A small "Dismiss" text button (bottom-right, `text-coffee-500 hover:text-ink`) sets the
  dismissed key. Dismissal is permanent per user per device — that's acceptable.

### 4.3 Wire into `StudentDashboard.jsx`

The component already computes everything needed: `completedIds` (use `.size`), `lastPath`,
`profile`, `streak`.

```js
const showGettingStarted = shouldShowGettingStarted({
  completedCount: completedIds.size,
  dismissed: readDismissed(profile?.id), // small helper beside the others
});
```

While `showGettingStarted`:
1. Render `GettingStartedCard` at the **top of the left column** (above the Continue card).
2. **Hide the streak chip** (the "Study today to start a streak" nag) — render nothing in its
   place, the greeting stands alone.
3. **Hide the "Today's challenge" card.**
4. Move the **"Your {level}L courses"** card to the **top of the right column** (above Tools).
   Simplest: reorder unconditionally — it's the most personally relevant card for everyone; the
   challenge card (when visible again) goes second. Keep the diff minimal either way.

Once the student completes any module (or dismisses), the dashboard reverts to today's exact
layout automatically — no migration of behaviour for existing users, whose `completedCount > 0`
means they never see the card at all.

**Phase 2 acceptance criteria:**
- Brand-new account: dashboard shows Getting Started, no streak chip, no challenge card.
- Completing one module anywhere flips the dashboard to the current returning-user layout.
- Existing users (any completed module) see zero visual change apart from right-column order.
- New unit suite `src/__tests__/gettingStarted.test.js` covers: step derivation for
  foundation vs full dept, reg step present/absent, clicked/lastPath done-detection,
  `shouldShowGettingStarted` truth table.

---

## 5. Phase 3 — Reg number optional (PR 2, branch `feat/optional-reg-number`)

> **Ordering is critical:** the DB currently enforces `reg_number TEXT NOT NULL` **plus** a CHECK
> constraint `profiles_reg_number_valid` (letters + digits + length ≥ 4) — see
> `setup-supabase.mjs` around lines 202–226. If the frontend ships first, every save without a
> reg number fails with a DB error. **Sequence: write migration → user applies it manually →
> verify → then merge the frontend change.**

### 5.1 Migration (new file — write it, do NOT run it)

`supabase/migrations/20260802000000_reg_number_optional.sql`:

```sql
-- Reg number becomes optional at signup: fresh students often don't have one
-- yet, and it was the only hard blocker in the signup funnel. The format CHECK
-- (profiles_reg_number_valid) stays — in SQL a CHECK passes automatically on
-- NULL, so it still rejects junk whenever a value IS provided. The client must
-- always save NULL (never '') for "no reg number", or the CHECK fires.
ALTER TABLE public.profiles ALTER COLUMN reg_number DROP NOT NULL;

NOTIFY pgrst, 'reload schema';
```

Tell the user to run this in the Supabase SQL editor and confirm before merging 5.2.

### 5.2 `src/components/ProfileForm.jsx`

1. **Label:** "Reg number" → "Reg number *(optional)*" — keep the `Hash` icon; style the
   "(optional)" suffix `text-coffee-500 font-normal`.
2. **Helper copy** (replace the current line under the input):
   > Add it now or later in Profile settings — it links you to materials shared for your class.
3. **Validation:** run the existing format checks (`length >= 4`, has letter, has digit) **only
   when the field is non-empty**. Remove the reg check from the required-fields error.
4. **`ready` gate:** drop `form.reg_number.trim()` from the expression.
5. **Submit payload:** `reg_number: reg || null` — **null, never empty string** (the DB CHECK
   rejects `''`). Keep the `.trim().toUpperCase()` for provided values.
6. `initial.reg_number ?? ''` already handles a null profile value for ProfileSettings — no
   change needed there.

### 5.3 Display guards for a missing reg number

- `src/pages/Welcome.jsx` — the profile card renders `{profile.reg_number}` unconditionally in a
  mono `<p>`. Guard it: `{profile.reg_number && <p …>{profile.reg_number}</p>}`.
- `src/components/AuthButton.jsx` — **already guarded** (`profile?.reg_number && …`), verify, no
  change expected.
- `SetupProfile.jsx` / `ProfileSettings.jsx` — pass-through of form values; upsert/update with
  null is fine post-migration. No change.
- `AuthContext.jsx` select list unchanged.

### 5.4 `setup-supabase.mjs` — REQUIRES EXPLICIT USER APPROVAL

Line ~208 declares `reg_number TEXT NOT NULL` for fresh installs, which would then diverge from
the migrated production schema. The one-line fix is dropping `NOT NULL` there — but CLAUDE.md
lists this file as out-of-scope. **Ask the user before touching it**; if declined, leave a note
in the PR description that fresh installs need the migration applied too.

**Phase 3 acceptance criteria:**
- Signup completes with the reg field left blank; profile saves with `reg_number = null`.
- Entering `abc` still errors ("letters and digits"); entering a valid reg still uppercases.
- Welcome and the nav dropdown render cleanly with no reg number.
- New test `src/__tests__/profileForm.test.jsx` (see Phase 6).

---

## 6. Phase 4 — Foundation-mode coherence (PR 4, branch `feat/foundation-picker-polish`)

**Files:** `src/components/CoursePicker.jsx`, `src/pages/Courses.jsx`.

1. **Say it's optional.** Intro copy becomes:
   > *Optional —* tick the courses that match your own programme, so Areté and your study planner
   > focus on just those. Leave nothing ticked to keep seeing every foundation course for your
   > level.
2. **Collapsed summary state.** Add local `expanded` state to CoursePicker:
   - Initial: `useState(() => !(profile?.selected_courses?.length > 0))` — students with an
     existing selection get a one-line summary bar ("You've pinned {N} courses." + an "Edit"
     `btn-ghost`); students with no selection see the full picker as today.
   - "Edit" expands; a successful save collapses back to the summary.
3. **Make the save visibly do something.** Add an `onSaved(count)` prop. CoursePicker calls it
   after a successful `persist` with the saved list length (0 for "Show everything instead").
   In `Courses.jsx`:
   ```jsx
   <CoursePicker catalogue={catalogue} onSaved={(count) => setMineOnly(count > 0)} />
   ```
   The student saves → the hub immediately filters to their courses via the existing `mineOnly`
   path, and the already-existing "My courses" chip shows the active state. Default `mineOnly`
   stays `false` on load — auto-enabling from the profile on mount is a behaviour change for
   returning users; keep it out of scope.

**Phase 4 acceptance criteria:**
- Foundation student with saved courses sees a one-line summary, not the checkbox wall.
- Saving a selection immediately filters the hub ("My courses" chip active).
- "Show everything instead" clears pins AND turns the filter off.
- Cybersecurity (full-catalogue) students: zero change (`isFoundation` guard already exists).

---

## 7. Phase 5 — Tests & verification (spread across the PRs above)

Vitest, jsdom, `@testing-library/react` — all installed. Test files in `src/__tests__/`. Study
`coursesPage.test.jsx` and `welcomePage.test.jsx` first and reuse their mocking approach for
`useAuth`/`useCatalogue` (do not invent a new pattern).

| Suite | New/extend | Must cover |
|---|---|---|
| `coursesPage.test.jsx` | extend | param > stored > profile precedence; profile-seed lands on level view; invalid profile level (`'500L'`) → picker; signed-out → picker unchanged; loading shell while profile pending |
| `welcomePage.test.jsx` | extend | primary CTA text/href for full dept, foundation, and invalid-level fallback; profile card with `reg_number: null` renders no mono reg line |
| `gettingStarted.test.js` | new | pure-function coverage per Phase 4.1/4.3 criteria |
| `profileForm.test.jsx` | new | submit with blank reg → `onSave` called with `reg_number: null`; invalid non-empty reg blocks with the format error; valid reg uppercased; required-fields error no longer mentions reg |

Per-PR gate: `npm test`, `npm run lint`, `npm run build` all green.

**Manual QA script (run once after all PRs, in an incognito window):**
1. Fresh email → magic link → profile setup **leaving reg blank**, department "not listed" →
   Welcome shows "Pick your programme's courses" as the hero CTA.
2. Follow it → CoursePicker (marked optional) → pin 3 courses → save → hub filters to them.
3. Go home → Getting Started card present; streak chip and challenge absent; "courses" and
   (foundation) pin steps already ticked.
4. Complete one Code Lab module → dashboard flips to the standard layout.
5. Repeat signup with department = Cybersecurity + a valid reg number → Welcome CTA is "See your
   {level} courses" → lands directly in that year (no level picker).
6. Existing-user regression: an account with progress sees no Getting Started card and today's
   dashboard.

**Success metric (user runs in Supabase SQL editor, before and ~2 weeks after shipping):**

```sql
-- Activation: how many students do anything after signing up, and how fast.
SELECT
  count(*)                                          AS signups,
  count(up.user_id)                                 AS activated,
  round(100.0 * count(up.user_id) / count(*), 1)    AS activation_pct,
  percentile_cont(0.5) WITHIN GROUP (ORDER BY up.first_progress - p.created_at)
                                                    AS median_time_to_first_progress
FROM profiles p
LEFT JOIN (
  SELECT user_id, min(updated_at) AS first_progress
  FROM user_progress GROUP BY user_id
) up ON up.user_id = p.id
WHERE p.created_at > now() - interval '30 days';
```

---

## 8. PR sequence summary

| # | Branch | Contents | Blocker |
|---|--------|----------|---------|
| 1 | `feat/onboarding-defaults` | Phase 1 (level seeding, Welcome CTA, banner copy) + test extensions | none |
| 2 | `feat/optional-reg-number` | Phase 3 (migration file + form + guards) + `profileForm.test.jsx` | **user applies migration before merge**; user sign-off on `setup-supabase.mjs` |
| 3 | `feat/dashboard-first-run` | Phase 2 (util + card + dashboard wiring) + `gettingStarted.test.js` | merge after PR 2 (reg step) |
| 4 | `feat/foundation-picker-polish` | Phase 4 (CoursePicker states + `onSaved`) | none |

Every PR: branch from `master`, conventional-commit style messages matching the repo's history
(`feat(scope): …`), PR body ends with the standard generated-with footer.

## 9. Explicitly out of scope — do not do

- No product tours / spotlight libraries (would need a new dependency).
- No semester auto-guessing from the calendar.
- No changes to `vercel.json`, auth flow, rate limiting, or the magic-link email copy.
- No analytics/telemetry additions — the Supabase SQL above is the measurement tool.
- Do not auto-enable `mineOnly` from the profile on page load (behaviour change for returning
  users) — only after an explicit save.
- Do not run any migration; do not edit `setup-supabase.mjs` without explicit approval.
