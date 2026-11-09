# Audit Remediation Plan

Implementation spec for the November 2026 repository audit. Every item below was
checked against the code on `master` (c90e045) before this plan was written; the
file/line references are real.

Branch: `audit-remediation` (already created — work here, never on `master`).

---

## 0. Rules for whoever implements this

Read `CLAUDE.md` in full before touching anything. It is the project's rulebook
and it applies to you. The ones most likely to bite:

- **JavaScript/JSX only.** No `.ts` files. No component libraries. Tailwind with
  the custom palette (`cream`, `paper`, `ink`, `coffee-*`, `ember`, `moss`,
  `rust`) — never hardcoded hex.
- **Do not install or add dependencies.** Not even dev dependencies. Anything
  below that would need one is marked BLOCKED.
- **Do not regenerate `package-lock.json`.** (The local npm is 12.x; the lockfile
  rules in CLAUDE.md are about 11.x — just don't run `npm install`.)
- **Migrations are written, never applied.** New SQL goes in
  `supabase/migrations/` with a timestamp after `20261102020000`, is idempotent,
  starts with a comment block explaining WHY (match the style of
  `20260827020000_storage_hardening.sql`), and ends with
  `NOTIFY pgrst, 'reload schema';`. Never run SQL against any database.
  Frontend code that depends on a new migration must degrade gracefully if the
  migration is not applied yet (missing column/function → feature hidden, not a
  crash), because migrations here are applied by hand after deploy.
- **`vercel.json` CSP/CORS headers: do not touch.** Adding a `crons` key is
  allowed (item 2.3) — nothing else in that file.
- **`SUPABASE_SERVICE_ROLE_KEY`** is read only via `api/_lib/serviceRole.js`.
  Any new caller must scope every query by an already-verified user id.
- **Every new `api/*` endpoint** gets the same rate limiting as its siblings
  (`enforceRateLimit` pre-auth + `denyIfUserRateLimited` per user — copy from
  `api/extract.js`) and must degrade gracefully when its env vars are missing.
- No `console.log`. No empty `catch`. ESLint unused vars are errors unless `_`-prefixed.
- Tests: Vitest + `@testing-library/react` with `fireEvent`. **No
  `@testing-library/user-event`.** Add or extend a test for every testable
  change.
- `src/data/courses.js` is now ~1.1 MB / 13,000+ lines. Read only the ranges you
  need (`sed -n`, `grep -n`).

**Commit after each numbered phase** with a message like
`Audit 1: tutor trusts verified content over uploads`. If the sandbox prevents
committing, leave the work uncommitted and say so in the final report.

**Before every commit run:** `npm run lint`, `node scripts/validate-modules.mjs`,
`npm test`. All three must pass. Run `npm run build` at the end of phase 4 and
at the very end.

**Final report** (your last message): per item — done / partially done / blocked
/ skipped, with the reason; every new migration file and the order to apply
them; every new env var; and anything the human must decide.

---

## Phase 1 — Trust and safety of uploaded materials

### 1.1 Tutor: uploads must not outrank verified content

`api/tutor.js:47` calls uploads "student-submitted and unmoderated" but
`api/tutor.js:56` says *"Uploaded lecture notes are the most authoritative
source for their course."* That contradiction is the core finding.

Change the prompt so the order of authority is explicit:

1. The course catalogue entry and the transcribed lecture notes (official,
   curated — these come from `getCourseOutline`'s non-upload sections).
2. Student-uploaded notes — useful supporting material, **unverified**. Use
   them to fill gaps, never to contradict (1). When an upload conflicts with
   the official content, prefer the official content and say there is a
   disagreement.
3. General knowledge, clearly marked as such.

Also require the tutor to **attribute**: when an answer draws on an upload,
say so in plain words ("according to a student-uploaded note for this
course…"). Keep every existing prompt-injection instruction from line 47.

Check `getCourseOutline` in `api/_lib/tutorTools.js` — make sure the upload
section header it emits says the notes are student-submitted and unreviewed, so
the label travels with the text, not only with the system prompt.

Fix the stale comment at `api/_lib/tutorTools.js:53` ("any signed-in student
can insert a course_materials row for any course") — rows are now written only
by `api/extract.js` on the server after verifying the uploader; the *content*
is still unmoderated, which is what the comment should say.

Test: extend the existing tutor prompt tests (grep `src/__tests__` for
`buildSystemPrompt` / `tutor`) to assert the prompt no longer contains
"most authoritative" applied to uploads, and that it states the precedence.

### 1.2 Label each material as unreviewed

`src/components/CourseMaterials.jsx` already titles the panel "Student
Materials". Add a small per-item badge — "Student upload · not reviewed" —
and a one-line note under the panel heading: files are shared by students,
are not checked by lecturers or Areté, and may be wrong.

### 1.3 Report → review → remove

Today a student can delete only their own uploads; nobody can report a file
and no admin can remove someone else's. Build:

**Migration `…_material_reports.sql`:**

- First read `20260827010000_materials_read_view.sql` (the
  `course_materials_visible` view and its warning about RLS on
  `course_materials`) and `20260924000000_attendance_admin.sql` (`is_admin()`).
  Follow those patterns exactly.
- Add `course_materials.moderation_status text NOT NULL DEFAULT 'visible'`
  with CHECK in (`'visible'`, `'hidden'`), plus `moderated_by uuid`,
  `moderated_at timestamptz`, `moderation_note text`.
- Update `course_materials_visible` to exclude `hidden` rows.
- New table `material_reports (id, material_id → course_materials ON DELETE
  CASCADE, reporter uuid default auth.uid(), reason text CHECK in
  ('wrong','offensive','copyright','personal_info','spam','other'), details
  text ≤ 500 chars, created_at, resolved_at, resolved_by, resolution)`.
  UNIQUE (material_id, reporter). RLS: a student may INSERT their own report
  and SELECT only their own; admins SELECT/UPDATE all. No client DELETE.
- RPC `report_material(p_material_id, p_reason, p_details)` — SECURITY
  DEFINER, inserts the report; when a material reaches **3 distinct
  reporters** it is auto-set to `hidden` (pending admin review). Returns a
  status the client can show.
- RPC `moderate_material(p_material_id, p_action, p_note)` — admin only
  (`is_admin()`), `p_action` in (`'hide'`,`'restore'`,`'dismiss'`); resolves
  the open reports.
- Storage: add a DELETE policy on `storage.objects` for
  `bucket_id = 'course-materials' AND is_admin()`, and a DELETE policy on
  `course_materials` for admins, so an admin can remove a file outright
  (mirror the owner-delete order used in `CourseMaterials.jsx#handleDelete`:
  row first, then object).
- **Tutor**: the uploaded-note lookup in `api/_lib/tutorTools.js` must skip
  `hidden` materials. Check which relation it reads; if it reads
  `course_materials` directly, filter `moderation_status = 'visible'` — and
  make that filter tolerant of the column not existing yet (migration not
  applied) rather than breaking the tutor.

**Frontend:**

- `CourseMaterials.jsx`: a "Report" action on every item that is not the
  student's own, opening a small inline form (reason select + optional
  details). Show the RPC's reply. Hide the action if the RPC does not exist.
- `src/pages/Admin.jsx`: a "Reported materials" section — open reports
  grouped by material (course, file name, uploader-visible fields only,
  reasons, count), with Hide / Restore / Dismiss / Delete permanently.
  Follow the section and RPC-reply patterns already in that page
  (`src/utils/rpcAction.js`).
- Update `src/pages/Privacy.jsx` and `src/pages/Terms.jsx`: reporting
  exists, admins can hide/remove materials, what reports store.

Tests: component test for the report form (renders, submits, shows reply,
hidden when RPC missing); test that the tutor tool excludes hidden rows.

---

## Phase 2 — Upload controls

### 2.1 Remove the object when registration fails

`CourseMaterials.jsx#handleUpload` uploads to storage, then POSTs
`/api/extract`. If that call fails the `catch` only sets an error — the
object stays in the bucket, publicly downloadable, with no row pointing at
it. In the failure path, call `supabase.storage.from(BUCKET).remove([path])`
(the owner DELETE policy permits it). If removal itself fails, report it via
the existing Sentry helper / error state — not an empty catch — and still
show the original error. Test it in `courseMaterials.test.jsx`.

### 2.2 Per-student quota

Defaults (record them in one exported constant so they are easy to change):
**30 files and 150 MB per student**, counted over their live
`course_materials` rows.

- `api/extract.js`: before writing the row, count the uploader's rows and sum
  `file_size` (service-role client, scoped by the verified user id). Over the
  limit → 413/429 with a clear message, **and delete the just-uploaded object**
  so it does not become an orphan.
- Migration: tighten the storage INSERT policy from
  `20260827020000_storage_hardening.sql` with a SECURITY DEFINER helper
  `material_upload_allowed()` that caps the count of objects owned by
  `auth.uid()` in the bucket (e.g. 40 — above the row cap, to leave slack for
  in-flight uploads). This is what bounds orphan accumulation, since the
  storage write happens before `/api/extract`.
- `CourseMaterials.jsx`: show "x of 30 uploads used" in the upload form, and
  the server's message when refused.

### 2.3 Orphan sweep

Do **not** delete rows from `storage.objects` in SQL — that leaves the bytes in
Supabase's storage backend. Instead:

- New `api/cron/sweep-materials.js`: authorised only by
  `Authorization: Bearer ${CRON_SECRET}` (Vercel cron convention); 503 when
  `CRON_SECRET` or the service-role key is unset. Lists bucket objects older
  than 24 h, finds those with no `course_materials.file_path`, removes them via
  the storage API in batches. Returns counts. Bounded work per run.
- Add `"crons": [{ "path": "/api/cron/sweep-materials", "schedule": "0 3 * * *" }]`
  to `vercel.json` — that key only.
- Document `CRON_SECRET` in CLAUDE.md's env list and the README.
- Add it to the `serviceRole.js` caller list in CLAUDE.md.
- Tests with a mocked storage client (see `src/__tests__` for how `extract.js`
  is tested).

### 2.4 Downloads — decision, keep public for now

Keep downloads public-by-link (the deliberate product decision recorded in the
storage migration). Do not implement signed URLs. Make sure Privacy says so
plainly (it already mostly does) and list "require sign-in for downloads
(signed URLs)" as an open decision in the final report.

---

## Phase 3 — Production capacity

### 3.1 Pluggable code runner

`api/run.js` is hard-wired to JDoodle (20 runs/day shared by every student).
Refactor the provider call behind a small adapter so a self-hosted **Judge0**
can be swapped in by env var, without touching the frontend:

- `RUNNER_PROVIDER` = `jdoodle` (default) | `judge0`; `JUDGE0_URL`,
  optional `JUDGE0_AUTH_TOKEN`.
- Map the same languages the playground supports to Judge0 language ids; keep
  the existing response shape (`output`, `kind`, credits/limit fields) so
  `src/components/CodePlayground.jsx` is unchanged.
- Keep both rate limiters exactly as they are.
- Use plain `fetch`, no new packages. Tests with mocked fetch for both
  providers. Document the setup in README "Wiring up the code runner".

### 3.2 Limits visible everywhere

`CodePlayground.jsx` already shows "Daily limit reached". Audit every AI
surface (tutor, Code Explainer + ExplainCode, Simplify, Key points,
Explain-this, uploads) for how a 429 is rendered; each must show a clear,
specific message (what limit, roughly when it resets) rather than a generic
error. Put the shared message formatting in one helper in `src/utils/`.

### 3.3 Usage monitoring

The per-user limiter writes to the `consume_rate_limit()` table (migration
`20260827000000_rate_limits.sql`). Add an admin-only RPC (new migration)
returning per-endpoint totals for today / last 7 days and the number of
distinct students who hit a limit, and render it as a small "Usage" section in
`Admin.jsx`. Read the rate-limit migration first to see what is actually
stored; if it does not keep enough history, say so in the report rather than
redesigning it.

---

## Phase 4 — Mobile performance

`dist/assets/courses-*.js` is **917,670 bytes**, above the PWA precache limit
(`maximumFileSizeToCacheInBytes: 300 * 1024` in `vite.config.js`), so the
Cybersecurity catalogue is never cached on first install.

The cause is mostly inline content in `src/data/courses.js` (1.1 MB source):

- inline `lectureNotes: [` at lines ~1159, ~4860, ~8194, ~10561 (the first two
  alone are ~245 kB and ~182 kB of source);
- inline `quiz: [` arrays at ~7921, ~10325, ~12355.

Do what was already done for the other 14 courses (see the header comment in
`src/data/lectureNotes/index.js`):

1. Move each inline `lectureNotes` array into its own
   `src/data/lectureNotes/<key>.js`, give the course a `notesKey`, register it
   in `noteLoaders` and `NOTE_TOPIC_COUNTS`.
2. Move the inline quiz arrays into `src/data/lectureNotes/<key>Quiz.js`. Quiz
   and exam banks are currently imported statically; if they are a large share
   of the chunk, make them lazy the same way (a loader map + `useEffect` load
   in `CourseQuiz.jsx` / `CourseExamPrep.jsx`, with loading and error states).
   Check every consumer first: `courseOfferings()` / `publicCatalogue.js`
   count bank lengths synchronously, `api/_lib/courseData.js` and the
   validator read them, prerender runs at build time. Keep counts correct —
   e.g. a generated/handwritten count map validated at prebuild, exactly like
   `NOTE_TOPIC_COUNTS`.
3. Check the same for `src/data/dataScienceCourses.js`.
4. Every consumer of `course.lectureNotes` must go through `loadNotesFor()` /
   `noteTopicCount()` (grep for `lectureNotes` across `src/` and `api/`).

**Target:** every catalogue chunk < 300 kB so it is precached. Report the
before/after sizes from `npm run build`. Do not raise
`maximumFileSizeToCacheInBytes`. `npm run build` (with prerender) must
still produce the 98 prerendered files and the public course pages must be
byte-for-byte unaffected except for anything that legitimately changed —
diff a couple of `dist/courses/<slug>/index.html` before/after.

Device measurement (Lighthouse on a throttled low-end profile) cannot be done
here — list it in the report as a human follow-up.

---

## Phase 5 — Privacy controls

### 5.1 Don't store coordinates when no boundary is set

The latest `check_in()` definition is in
`supabase/migrations/20260924010000_previous_code_grace.sql` (confirm by
grepping for the last `CREATE OR REPLACE FUNCTION … check_in`). New migration
that redefines it identically **except** that latitude/longitude are written
to the attendance record only when the session has an enforced location
boundary; otherwise store NULL. Do not change its signature or return shape.
Add a one-off, commented-out `UPDATE` (human runs it deliberately) that nulls
coordinates on existing records whose session had no boundary.

Update `src/pages/CheckIn.jsx` only if it can skip requesting location when
the class has no boundary (only if the session-discovery data already says so —
don't add a round-trip). Update Privacy section 1 accordingly.

### 5.2 Data export

On `/profile` (`src/pages/ProfileSettings.jsx`), "Download my data": a JSON
file assembled client-side from what the student can already read under RLS —
profile, `user_progress` rows, own attendance records, own uploaded materials
(metadata, not files), own feedback if readable, Google connection status
(not the token). No new endpoint needed. Test the assembler as a pure
function in `src/utils/`.

### 5.3 Account deletion

- New `api/account/delete.js` (POST, signed-in, strict rate limit, requires
  the body `{ confirm: "DELETE" }`). Uses `serviceRole.js`, scoped strictly by
  the verified user id: revoke + delete Google connection, delete the user's
  uploaded objects and rows, then delete the auth user (cascades should
  handle profile/progress — **verify each FK's ON DELETE in the migrations**
  and handle anything that would block or orphan). Attendance records:
  anonymise (null the student link, keep the row with name/reg number
  removed) only if lecturers' registers need the count; otherwise delete —
  pick the one the schema supports cleanly and state which in the report.
  If the user is a lecturer/admin/course rep, refuse with a message to
  contact an admin first.
- Profile page: "Delete my account" with typed confirmation, then sign out.
- Tests with mocked service-role client.

### 5.4 Retention

Write a "How long we keep your data" section into Privacy with these
defaults, and add a commented, ready-to-schedule SQL function in a migration
that enforces them:

- rate-limit counters: 7 days
- feedback: 2 years
- attendance & rosters: the academic session plus 2 years
- resolved material reports: 1 year
- accounts inactive 3 years: notify, then delete (document only — do not
  automate deletion)

List these numbers in the final report as **needing the owner's sign-off**.

---

## Phase 6 — Professional trust

### 6.1 Who runs Areté

`README.md` lines 1 and 7 say the app is for/"Built by the Department of
Cybersecurity". `src/pages/Terms.jsx:30` says it is independent and not
endorsed. Make the README match the Terms: an independent, student-built
companion for University of Uyo students (multi-department, per CLAUDE.md's
Project Identity), not an official university service. Grep the rest of the
repo for the same claim (`Built by the`, `Department of Cybersecurity`) in
user-facing copy, `siteMeta.js`, `public/`, `index.html`, manifest, and fix
any that say the department built or runs it. Do not hand-edit
`public/llms*.txt` or `sitemap.xml` — they are generated.

### 6.2 Real SECURITY.md

Replace the GitHub template entirely (its version table is fictional):

- Scope: the live site, `api/*`, Supabase policies in this repo.
- Report privately to the contact address already published in
  `src/pages/Privacy.jsx` (use GitHub private vulnerability reporting as the
  primary channel if it is a public repo; mention both).
- What to include, acknowledgement within 72 h, status updates weekly, fix
  target by severity, no legal action against good-faith research, please
  don't access other students' data or run load tests, the CTF flags in the
  Security track are intentional and not vulnerabilities.
- Supported version: the current deployment only.

Add a link to it from the Privacy page and the footer if one exists.

### 6.3 Content owner and review date

Add an optional `contentReview: { owner, reviewed }` (reviewed = ISO date) on
course entries. Populate it for the 18 Cybersecurity courses that carry notes
and the courses with banks, using owner `"Areté editorial (student-built)"`
and the date the content last changed per `git log -1 --format=%cs -- <file>`.
Render it on `CourseDetail` and on the public `CoursePreview` as
"Maintained by … · last reviewed …". Validate the shape in
`scripts/validate-modules.mjs` (date parses, not in the future).

### 6.4 Doc drift

- CLAUDE.md: test counts ("66 suites, ~945 tests") → actual numbers from
  `npm test`; `courses.js` size ("~8200 lines") → actual; add every new file,
  endpoint, env var and migration from this plan to the Key Files Map.

---

## Phase 7 — Release quality (BLOCKED)

Browser-level and accessibility tests (Playwright + axe) need new dev
dependencies, which CLAUDE.md forbids without the owner's approval. **Do not
install anything.** Instead write `docs/browser-test-plan.md`: the flows
(sign-in OTP stubbed, open course + notes, quiz, upload + report, attendance
check-in with mocked geolocation, Admin moderation, keyboard-only navigation,
360 px viewport), the proposed tooling and the CI job, so it can be approved
and built next.

Within existing tooling you may add jsdom-level accessibility checks
(labels, roles, focus order) to component tests for the new UI from phases
1–5.

---

## Out of scope / needs the owner

- Applying any migration (owner runs them in the Supabase SQL editor, in
  filename order).
- Setting `CRON_SECRET`, `RUNNER_PROVIDER`, `JUDGE0_*` in Vercel; standing up
  Judge0.
- Signed-URL downloads (2.4), retention numbers (5.4), Playwright (7).
- Real-device performance measurement, production database policy check,
  live-site verification.
