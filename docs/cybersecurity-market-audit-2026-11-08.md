# Areté product, security, and market readiness audit

Date: 8 November 2026. Scope: current local working tree, including existing uncommitted work.

## Assessment

Areté has a substantial foundation for a paid education product. It has accounts, two departmental catalogues, programming practice, introductory cybersecurity exercises, AI assistance, progress sync, attendance tools, and a payment implementation. The biggest gaps are credible practical outcomes, trustworthy assessment, payment and quota reliability, and an organization product that a buyer can actually administer.

The most achievable way to serve both individuals and organizations is to sell cybersecurity learning to individuals and cybersecurity training/assessment to teams. A vulnerability scanner, monitoring service, or managed security service would require a different operational product. None of those capabilities was found in this review.

Recommendation: strengthen the shared learning and assessment foundation, sell a narrow learner offer, and run a small institution or employer pilot alongside it. Use the pilot to decide which business features deserve investment.

## Scope and evidence limits

- Reviewed routing, onboarding, security track data and challenge UI, progress sync, Premium UI and entitlements, Paystack checkout/settlement/webhook, API authentication and quotas, uploads, selected SQL policies/migrations, Google token handling, privacy/deletion/retention, build/PWA configuration, CI, and existing tests.
- Executed the full local build, module validator, ESLint, and Vitest suite. Counted content coverage from the actual catalogue exports.
- Consulted official OWASP, NIST, and Paystack documentation for proposed improvements. Recommendations below are judgments based on this code and those references; they are not certifications or endorsements.
- No authenticated production session, live database policy inspection, real payment, browser/device session, restore drill, or deployment configuration verification was performed. Static findings describe code paths; their presence in production depends on what has been deployed and which migrations were applied.
- Existing migrations and tests were inspected selectively. This is a broad repository audit, not a claim that every policy, dependency, content statement, or attack path has been exhaustively verified.
- npm advisory lookup failed with DNS error `EAI_AGAIN` both normally and after an approved retry. Dependency vulnerability status remains unverified; dependency overrides alone do not establish a clean audit.

## Verified baseline

| Area | Result |
|---|---|
| Full production build | Passed: client build, PWA generation, SSR build, and prerendering |
| Module validation | Passed: 49 modules across 4 tracks; 112 catalogue entries across 2 departments |
| ESLint | Passed |
| Automated tests | 81 files passed; 1,077 tests passed and 1 expected failure, 1,078 total |
| Expected failure | `src/__tests__/extract.test.js:240`: registration of another student's freshly uploaded object is not rejected |
| Cybersecurity catalogue | 57 courses; 18 have notes, 7 have quiz banks, 7 have exam prep |
| Data Science catalogue | 55 courses; 8 have notes, 1 has a quiz bank, 1 has exam prep |
| Security practice | 12 static CTF rooms, client validation and locally stored solved state |
| Payment offer in code | NGN 2,500, 180 days, one-time Semester Pass; live enablement unverified |
| Build output observations | PWA precache: about 1.84 MiB uncompressed; ENT note chunk about 536 kB minified / 165 kB gzip |
| Local runtime | Node 22.22.2; CI specifies Node 24. Passing here does not verify identical production runtime behavior |

The course counts measure available fields, not instructional accuracy or completeness. Shared courses appear in both catalogue counts. Passing tests include mocks and SQL text assertions; they do not prove live RLS or payment behavior.

## Foundations worth keeping

- API identity is checked using Supabase `auth.getUser`, rather than trusting a user ID sent by the browser (`api/_lib/supabase.js`).
- Payment amount and duration originate on the server. Settlement verifies with Paystack, checks reference/amount/currency, and uses a database grant function. Unique references and locks address duplicate settlement and overlapping renewals (`api/_lib/billing.js`, premium migration).
- Premium records are separate from writable student profiles. The migration grants authenticated users read access to their own records, with no direct write grant.
- Security headers are configured: CSP with self-hosted scripts, HSTS, frame restrictions, content type protection, and a referrer policy (`vercel.json`). Confirm these on the actual deployment.
- Google refresh tokens have AES-GCM encryption support, and the OAuth state has signature/expiry checks (`api/_lib/googleAuth.js`).
- Material registration derives course metadata and extracted text on the server. Reporting, upload quotas, account export/deletion, and security reporting routes exist.
- The app already has lazy routes, lazy notes, public course previews, prerendering, offline caching, review scheduling, and a large regression suite. These are useful foundations, not gaps to rebuild.

## Findings to resolve before growing paid usage

P1 means address before expanding paid usage or relying on the affected protection. P2 means complete during the first paid release cycle. P3 means later improvement. Priorities combine security, reliability, and commercial impact; they are not CVSS scores. No critical compromise was established by this review.

### F01 — P1: Upload registration does not verify ownership

**Evidence:** `api/extract.js:166` downloads a public object using the supplied path. `uploaded_by` is assigned to the caller, but no object-owner check ties the bytes to that caller. `src/__tests__/extract.test.js:240` explicitly marks rejection of another student's fresh file as an expected failure.

**Impact:** A signed-in user who knows another student's fresh object path can register it as their own. More seriously, the quota rejection path removes the supplied object using the service role: a caller already at quota can potentially cause deletion of another student's fresh file. This is an authorization issue, not merely a misleading upload name.

**Action:** Verify object ownership through an authenticated storage lookup or authoritative storage metadata before downloading, parsing, registering, or deleting it. Prefer server-issued upload reservations bound to user, course, path, size, and expiry. Do not delete a caller-supplied object without verified ownership. Enforce registration uniqueness and quota atomically.

**Done when:** Two real test accounts cannot register or delete each other's objects; the expected-failure test becomes an ordinary passing rejection test. Include the over-quota cleanup branch.

### F02 — P1: The paid CTF gate can be bypassed through the normal UI

**Evidence:** `src/pages/TrackModuleDetail.jsx:71` includes `!done` in `challengeLocked`. The same page calls `markComplete(mod.id)` from the unrestricted completion button around line 127.

**Impact:** A free user can mark a paid room complete and reopen its challenge. Removing that condition fixes the visible bypass, but the challenge data, answers/writeups, and hashes still ship to the browser; a browser gate cannot protect the content from a determined user.

**Action:** Separate reading completion, challenge solves, and paid entitlement. Serve paid challenge material only after server entitlement checks if exclusive access is part of the offer. Preserve offline introductory practice as a deliberate free feature. Define any grandfathered access explicitly in the database.

**Done when:** Completion toggles, direct API calls, refreshes, offline transitions, and edited browser state cannot grant a paid challenge; legitimate Premium and any approved grandfathered users retain access.

### F03 — P1: Users can influence the persisted rate-limit window

**Evidence:** `supabase/migrations/20260827000000_rate_limits.sql` grants `consume_rate_limit(p_namespace, p_limit, p_window_seconds)` to authenticated callers. The function uses the caller's window to set stored `reset_at` for new or expired buckets.

**Impact:** The comments state that caller arguments only affect the verdict, but window length also affects persistent state. A user can initialize a new/expired known namespace with a short window and arrange API calls within that window, undermining the intended daily or ten-minute period. Arbitrary namespaces also allow unnecessary counter-row creation. The API still applies its own limit; this is a window manipulation issue, not a direct ability to set another user's counter.

**Action:** Fix namespace, limit, and window together on a trusted side. Either use a database allowlist of supported policies, with server-derived plan rules where needed, or a narrowly scoped server-only quota operation whose user ID comes from verified auth. Bound namespaces and reject unknown ones.

**Done when:** Authenticated RPC calls cannot shorten any API quota window, create arbitrary namespaces, or affect another user. Verify this against Postgres, including an expired bucket.

### F04 — P1: Billing and quota failures deliberately allow usage

**Evidence:** `api/_lib/request-policy.js` allows requests when the database limiter fails; `api/_lib/plan.js` bypasses the daily allowance for an unknown plan; `src/context/PlanContext.jsx` disables UI gates when status is unavailable.

**Impact:** Missing migrations or outages can silently remove intended usage controls. The in-memory IP limiter is per function instance, so it is not a substitute for the shared budget. Premium users also have no daily AI cap. Costs and provider exhaustion can rise without matching revenue.

**Action:** Verify migrations as a release prerequisite. Preserve read access during outages, but define bounded degraded behavior for paid external calls. Add quota-failure alerts and tested provider spending controls; do not assume every provider has a usable hard cap. Track usage and estimated spend per provider/account.

**Done when:** A missing quota function or entitlement lookup failure raises an alert and cannot cause unbounded model/runner usage; already paid users get an explicit, recoverable service response.

### F05 — P1: Payment completion needs a durable recovery path

**Evidence:** `api/paystack-webhook.js:31` falls back to `JSON.stringify(req.body)` for signature verification. Re-serializing a parsed object does not guarantee the original request bytes. The browser return and webhook perform immediate settlement; no scheduled reconciliation of old pending payments was found.

**Impact:** A valid event whose representation changes can fail signature validation. A customer who closes checkout and whose webhook fails may remain paid but inactive until manual action. This is a reliability risk; it does not establish forged payment acceptance.

**Action:** Verify signatures over captured raw bytes using the deployed Vercel runtime's supported request handling. Persist verified events and process them idempotently; add bounded reconciliation for pending payments and alerts for settlement failures. Keep provider verification as the authority.

**Done when:** A real sandbox transaction activates without returning to the browser; duplicate events grant once; raw payload fixtures with whitespace/escaping variations verify correctly; a missed event is recovered automatically.

### F06 — P1 before employer assessment: Results are self-reported

**Evidence:** `src/components/FlagChallenge.jsx:102` initializes solved status from browser storage; flag validation runs in the browser. `src/components/useProgress.js` writes completion/quiz records from the client. Question answers and challenge writeups ship as data.

**Impact:** These are useful study records, but cannot support an independently verified skills claim, hiring decision, competition ranking, or high-trust certificate. Hiding an answer hash does not prevent tampering with the validator, result, or locally stored solved state.

**Action:** Add separate assessment sessions with server grading, versioned tasks, attempt records, server timestamps, and evidence submissions. Keep personal study checkboxes, visibly distinguish verified assessment results, and use human review for the first capstones. Randomization helps but is not a complete integrity control.

**Done when:** Editing local storage or directly updating personal progress cannot create a verified assessment record. A report identifies the task version, grading method, evidence, date, and limits of the result.

## Other confirmed implementation gaps

| ID / priority | Evidence and consequence | Improvement and completion check |
|---|---|---|
| F07 / P1 for shared devices | `useProgress.js:128` uses a track-only local key; the cloud pull merges that local data into the current account. `StudyDaysContext.jsx` similarly merges device study days. `AuthContext.jsx:150` signs out without clearing these stores. Student B can inherit Student A's progress on the same browser. | Key user-specific caches by account and reset in-memory state on identity change. Offer an explicit migration for anonymous progress. Test A → sign-out → B → sign-out → A, including delayed requests. Review cached profile and solved flags too. |
| F08 / P2 | `api/_lib/plan.js` selects future-ending passes without checking `starts_at`. A manually scheduled future trial/pass can grant access early. `PlanContext` memoizes the expiry check without a timer, so the UI can also keep an expired verdict until another update. | Enforce `starts_at <= now < ends_at`, preserve renewal continuity, and refresh on expiry/visibility changes. Test future, active, stacked, and expired passes. Server access is authoritative. |
| F09 / P2 | Settlement returns early for locally successful payments; webhook handles only `charge.success`; payment schema lacks refunded/disputed/reversed lifecycle states. | Add an audited refund/dispute process, entitlement adjustments, reconciliation, and support visibility. State the customer policy clearly and verify its appropriateness before launch. Test refund after renewal and avoid erasing valid remaining access. |
| F10 / P2 | `Premium.jsx` groups failed/abandoned payments under “you have not been charged”; a failure status alone cannot justify that categorical customer statement. Pending references are stripped from the URL and held in component state. | Say confirmation was unsuccessful, retain a recovery/history path, and show references with an easy support action. Test reload, delayed bank confirmation, wrong signed-in account, and cancelled checkout. |
| F11 / P1 before business file uploads | Storage is deliberately public-read (`20260827020000_storage_hardening.sql`, `Privacy.jsx`). Hiding a material does not revoke its public object URL. | Keep public educational sharing explicit. Put employer or private cohort documents in private storage with access checks and short-lived signed downloads. Verify removed access cannot mint new links. Account for the lifetime of already issued links. |
| F12 / P2 | Raw storage uploads precede registration quotas. Callers can upload and skip registration. The sweep inspects at most 200 objects and the first 200 folders; early folders can consume the work budget on every run. | Reserve/enforce storage usage before upload, bound raw object size and upload frequency, and use durable pagination/cursors for cleanup. Test more than 200 folders/objects and repeated runs. A daily sweep is cleanup, not an instantaneous upload budget. |
| F13 / P2 | Allowed extensions include archives/office files; extraction reads the full object before the 20 MB check and parses documents in the request. No malware quarantine pipeline was found. | Enforce bucket limits, stream download bounds, validate content types, and isolate parsing with resource/time limits. Add quarantine and scanning before publication where uploads are a paid/team feature. Test compressed-document expansion and malformed files safely. |
| F14 / P2 | `getPlan` and rate-limit health are configuration-dependent; new billing/upload/retention migrations are present, but applied production state is unknown. Initial core tables are provisioned in `setup-supabase.mjs`, outside the later migration sequence. | Document and automate a reproducible empty-database setup, migration order, verification queries, and rollback/recovery procedure. Exercise the actual RLS policies with multiple users and roles. |
| F15 / P2 | `.github/workflows/ci.yml` runs lint/build/unit tests. Browser/accessibility work exists as a proposal in `docs/browser-test-plan.md`; real browser and live SQL integration gates were not found in that workflow. | Add browser flows for auth, payment, cross-account isolation, uploads, and mobile navigation, plus keyboard/accessibility checks. Add database policy tests. Make the known ownership rejection a normal required test. |
| F16 / P2 | `20261103040000_retention_schedule.sql` is commented guidance, not an active deletion job. Privacy policy says this explicitly. Export excludes feedback; deletion has several separate destructive steps before deleting the auth account. | Turn retention into an approved operational procedure, add resumable deletion jobs and orphan cleanup, and make export completeness explicit. Test partial failures and inspect actual retained records. Backup recovery and retention schedules require owner/deployment verification. |
| F17 / P2 | Sentry support exists but is optional; no recovery drill, service objective, or alert evidence was verified. Errors are not product usage or payment funnel metrics. | Verify alert delivery, add health checks for paid dependencies and webhook failures, document incident handling, and rehearse a database/storage restore. Scrub sensitive error data and distinguish test from production events. |
| F18 / P2 | `vite.config.js` precaches programming/security chunks along with the shell; this build precached 100 entries / ~1.84 MiB. Large note chunks also exist. | Measure a real low-end Android device on a constrained connection. Consider loading unused tracks on demand rather than precaching them. Set measured page-load and offline-download budgets; a chunk-size warning alone is not proof of slow UX. |

## What the cybersecurity product is missing

### A clear entry point and measurable promise

`src/pages/Home.jsx` leads with University of Uyo, academic levels, and an academic companion. `Premium.jsx` leads with removing daily limits. `SetupProfile.jsx` and the app's auth watcher assume an academic profile. This is coherent for the existing student audience, but an employee or business buyer does not get a clear next step.

Build an accessible public cybersecurity page with a real sample exercise and two clear actions: start learning and inquire about team training. Give non-university users a suitable onboarding path. Describe delivered skills and sample output; label upcoming capabilities as upcoming. Keep the course hub accessible to existing students.

Suggested initial promise: “Practise cybersecurity fundamentals through guided investigations, then demonstrate what you learned with an assessed case.” Validate that wording with actual buyers before treating it as proven positioning.

### Practice beyond static flag puzzles

The current rooms provide theory, prepared evidence blocks, hints, quizzes, and flags. They are a useful introduction. They are not yet an environment in which a learner configures a service, performs a live investigation, validates a fix, or handles a changing case.

Start with one complete beginner defender pathway. Suggested first case set:

1. Review a synthetic suspicious email, explain evidence, and recommend the next action.
2. Investigate synthetic authentication logs, identify a likely incident, and separate signal from normal activity.
3. Build an incident timeline from several prepared artifacts and justify conclusions.
4. Produce a short incident report with containment and remediation recommendations, reviewed against a rubric.

For each case provide prerequisites, objectives, realistic artifacts, guided practice, independent assessment, feedback, and a portfolio output. Add a secure web development path next if customer demand supports it. Use an isolated lab environment for interactive vulnerable services; do not host intentionally vulnerable exercises beside production data or send learners to test third-party targets.

Map tasks and assessment rubrics to selected NICE tasks/skills and use OWASP guidance for relevant web exercises. Mapping is a design aid, not accreditation. Show the actual task a learner can perform, rather than a percentage that only measures pages clicked.

### Content quality and ownership

The catalogue is broader than its authored practice. Complete and review one high-value pathway before adding many more course titles. Publish actual coverage and expected depth. Add author/reviewer, source permissions or licensing, last review date, prerequisites, and known limitations to authored material. Have a qualified practitioner review sample exercises and grading rubrics.

AI assistance is already present; a formal instructional evaluation set was not identified in this audit. Add representative questions, expected source-grounded answers, code-correctness cases, and malicious uploaded-note cases. Re-run these when prompts/models/providers change. Give organizations clear data-handling settings before accepting their sensitive content. Prompt sanitization and source-order instructions reduce some risks but are not proof against prompt injection or incorrect teaching.

## What the organization offer is missing

The existing attendance/admin/lecturer tools are academic workflows. They provide reusable experience, but are not an organization tenancy model.

| Requirement | Current gap | Smallest credible first version |
|---|---|---|
| Organization boundaries | No general organization/membership model found in reviewed schema/routes | Organizations, memberships, owner/manager/learner roles; database-enforced isolation |
| Seat administration | Student semester passes do not administer team seats | Invite/revoke members and record who assigns a seat; manual invoicing for initial pilots |
| Assignments | No employer learning assignment workflow found | Assign one pathway, deadline, and cohort |
| Outcome reporting | Study completion is user writable | Evidence-backed assessed results, rubric, dates, limitations, cohort export |
| Administrative audit | Attendance audit is domain-specific | Log membership, role, assignment, assessment, and entitlement changes |
| Business trust | Private content and third-party AI policy need definition | Written data handling, private uploads, support contact/process, recovery plan, agreed pilot scope |
| Identity management | Student OAuth/magic links; no business SSO/provisioning workflow identified | Use existing sign-in for pilot; prioritize privileged-account protection and session revocation. Add SSO only when a customer requires it |
| Procurement | No organization offer or agreement found | A concrete pilot proposal: seats, duration, content, support, report, price, success criteria |

Assess employee reporting boundaries and data responsibilities with the pilot customer. Collect only the data needed for the pilot. A dashboard without trustworthy results and isolation would not complete this offer.

If the intended business offer is actual security operations, separately validate one problem such as tracking remediation of independently identified issues. It would need asset ownership/scope, authorization, reliable finding provenance, false-positive handling, remediation workflows, isolation, and support. No evidence in this audit supports advertising scanning, breach detection, or compliance assurance as present capabilities.

## Monetization and customer evidence

The existing Semester Pass is a pricing experiment, not proven willingness to pay. No live revenue, retention, conversion, or support data was available. Historical sign-up/engagement figures in `docs/business-model.md` are not a substitute for current verified cohorts.

- Keep free notes and introductory practice useful. Charge for deeper practice, feedback, and credible assessed work that has been delivered.
- Treat the existing NGN 2,500 / 180 days as a hypothesis. Measure collected revenue and delivery costs before promising extensive AI or human review at that price. Do not set a business seat price by simply multiplying the student price.
- Offer the first team pilot with a defined seat count, start/end dates, one pathway, report, and support commitment. Manual invoicing and onboarding can validate demand before subscription automation.
- Reconsider “unlimited” language against real provider capacity and unit costs. The Premium page discloses shared runner limits, but capacity still needs verification and budgeting.
- Use privacy-conscious first-party events for exercise start/finish, verified assessment, upgrade view, checkout start, settlement success, and return usage. Do not collect raw messages, uploaded content, or flags as analytics. Update the privacy notice if tracking behavior changes; it currently says no analytics trackers.
- Count a payment as revenue/conversion only from verified settlement. Exclude staff, tests, sponsored/manual grants, and refunds appropriately.
- Track activation (first meaningful exercise), seven-day return, exercise completion, assessment gain, free-to-paid conversion, settlement failures, support cases, refund rate, provider cost per active learner, and contribution margin.
- Calculate contribution per paying learner as collected price minus payment fees, refunds, AI/runner usage, variable hosting/storage, and support/review cost. Confirm each input from actual bills/contracts; no current gateway fee or provider-price assumption is made here.

## What to do now

Effort estimates are rough engineering judgments, not delivery commitments. Live access and the breadth of existing changes affect the schedule.

| Order | Work | Rough effort | Evidence to move on |
|---|---|---|---|
| 1 | Resolve upload ownership/deletion (F01), CTF UI bypass (F02), quota policy manipulation (F03), and account cache isolation (F07) | Several focused engineering days plus database integration checks | Normal passing regression tests; two-account policy checks; documented rollout |
| 2 | Verify payment activation, missed-event recovery, entitlement boundaries, and actual dependency/advisory status | Several days, with sandbox/deployment access | Checkout/browser-closed/webhook/replay/refund scenarios recorded; pending payments recover |
| 3 | Define and deliver one defender pathway and one reviewed capstone | About 1–2 weeks for a credible first set, subject to reviewer availability | Learners complete the work and produce an assessable report |
| 4 | Add a public cybersecurity entry page, suitable onboarding, sample exercise, and honest paid offer | A few days after the offer exists | A new visitor understands the outcome and can try it without unrelated setup |
| 5 | Establish first-party product and cost measurements; recruit an initial learner cohort and one organization pilot | Start immediately; measure over several weeks | Actual completed exercises, collected payments, return use, and buyer feedback |
| 6 | Build organization isolation, seats, assignments, verified reporting, and audit records against the pilot | Multiple weeks; scope depends on pilot requirements | Two organizations cannot read/change each other's records; manager can assign and review actual evidence |

**First seven days:** fix the four concrete access/isolation issues, verify the payment deployment prerequisites, reproduce the known ownership rejection against two accounts, write the first practical case/rubric, and interview a small group of current learners plus reachable training buyers. Ask them to perform the task and inspect the result. Do not mistake survey enthusiasm for purchases.

**By day 30:** aim for one complete pathway, reliable assessment records, a usable cybersecurity entry/onboarding flow, reconciled payments, measured costs, a paid learner experiment, and an organization pilot with agreed deliverables. The target is evidence of usefulness and buying behavior, not a large feature count.

**Days 31–90:** expand the pathway customers actually use, implement the organization requirements confirmed by the pilot, add private-content controls and operational recovery checks, and test renewal or a second paid cohort. Add new security specialties when completion and repeat usage justify them.

## Checks requiring deployment access

1. Compare deployed code to this working tree and confirm every required migration/policy is applied. Confirm Supabase URL/redirect configuration and privileged-account protection.
2. Run actual RLS tests using two unrelated students, lecturer, course rep, admin, and eventually two unrelated organizations. Include direct REST/RPC calls, not only hidden UI buttons.
3. Verify actual CSP/HSTS/cache headers, sign-in delivery, token expiry/revocation, Google disconnect, and production API failures.
4. Test Paystack sandbox checkout, closed browser, duplicate and delayed webhook, verification outage, early renewal, future/expired pass, refund/dispute support, and account deletion with a payment history.
5. Verify storage size/MIME rules, public/private download behavior, ownership, duplicate registration, quota races, orphan pagination, and deletion recovery.
6. Measure low-end Android startup, keyboard navigation, screen-reader status messages, and offline/online transitions with realistic content.
7. Verify Sentry/operational alerts, provider limits, billing dashboards, backup coverage, recovery time, and restore results.
8. Re-run dependency advisory and secret-history scanning in a networked environment. Do not publish a clean-security claim based only on passing lint/tests.

## Sources

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/): reference requirements for application security verification; use a scoped checklist and record evidence rather than claiming certification.
- [NIST NICE Framework](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/about): shared task, knowledge, and skill language for employers, learners, and training providers.
- [OWASP Web Security Testing Guide](https://wstg.owasp.org/): methods to inform relevant practical web-security tasks and review.
- [Paystack webhooks](https://paystack.com/docs/payments/webhooks/): event handling, signature validation, and the role of webhooks when browser callbacks fail.

## Audit output and workspace effects

This report is the requested deliverable. Application fixes, database changes, and deployment are separate work. Existing edits were not reverted. The production build writes `dist/`, `dist-ssr/`, and regenerates the public sitemap/LLM discovery files as part of its normal behavior; those public files already had local changes before this audit. No credentials or live user records are included here.
