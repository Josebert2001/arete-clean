# SOC / incident response pathway: implementation specification

Date: 8 November 2026. Status: proposed implementation; the capabilities below are not yet delivered.

Scope update: the [career pathway implementation plan](career-pathway-implementation-plan.md) controls the product direction: placement quiz, multiple career pathways, assessed portfolio, career support, and opportunity follow-up. This document specifies the SOC/incident response pathway within that product. Its delivery estimate covers this pathway, not the complete career platform.

## 1. Outcome and scope

Build one complete pathway called **Investigate a suspicious account incident**. A beginner should finish able to examine an email, investigate authentication activity, correlate several sources, take a justified containment action in a simulator, verify its effect, and write an evidence-backed incident report.

This develops the beginner defender pathway proposed in the [market audit](cybersecurity-market-audit-2026-11-08.md) as one career direction. The [independent learner entry flow](cybersecurity-entry-rollout.md) supplies an onboarding foundation; career placement will extend it. Existing security rooms remain useful optional preparation.

The first release includes:

- Orientation, four practical cases, and an unseen final assessment.
- Synthetic, internally consistent evidence with normal activity, ambiguous observations, and documented gaps.
- A browser evidence viewer, structured investigation notebook, timeline editor, and a small defensive action simulator.
- Immediate practice feedback, a chance to revise, and a human-reviewed final report.
- Server-authoritative assessment attempts, rubric results, and a downloadable portfolio record.
- An invite-only pilot of 10–15 learners, with named content and assessment reviewers.

The assessed claim is deliberately specific: **the learner demonstrated these beginner investigation skills on a synthetic, open-book case linked to their signed-in account**. It does not establish identity beyond account authentication, professional certification, independent employment readiness, or competence operating production incident response systems.

Organization tenancy, employer dashboards, live vulnerable infrastructure, arbitrary code execution, real email ingestion, and automated AI grading are outside this release. A team pilot can use learner-controlled result exports; manager access requires a separate authorized organization model.

## 2. Current foundation and required changes

These observations come from the current local source, including existing uncommitted work; deployed behavior and database state must be checked separately.

| Foundation | Reuse | Required addition |
|---|---|---|
| `src/components/CybersecurityLanding.jsx` | Public entry and account-free sample | Describe the new outcome and show a real sample output after release gates pass |
| `src/components/IndependentLearningHome.jsx` | Independent learner home | Add pathway resume and separate practice/assessment status |
| `src/data/securityModules.js`, `src/components/FlagChallenge.jsx` | Optional fundamentals and existing CTF practice | Keep these records distinct from assessed outcomes |
| `src/components/useProgress.js` | Personal study tracking | Do not use client-written progress as an assessment authority; fix account cache isolation before pilot |
| `src/App.jsx` | Protected, lazy-loaded routing | Add pathway, case, assessment, result, and restricted review routes |
| `api/_lib/supabase.js` | Verified request identity and user-scoped queries | Add narrowly authorized assessment writes and reviewer assignment checks |
| Supabase and Vercel API functions | Authentication, persistence, request handling | New assessment schema, controlled transitions, audit events, and private answer keys |
| Existing Vitest, validation, build, and CI | Regression checks | Evidence consistency, assessment integration, database policy, and browser checks |

Avoid extending the old module shape until the investigation model exists. Flags and multiple-choice quizzes cannot represent a cited finding, a disputed inference, a revision, or a reviewed report.

Before pilot, resolve or independently verify the audit's account isolation and access-control findings that affect this flow. Assessment authorization must be enforced on the server, including invite/entitlement checks. Existing paid-plan UI gates cannot grant assessment eligibility.

## 3. Learners, prerequisites, and learning contract

Target learners: university students and independent beginners with basic browser and file skills. No programming, paid software, virtual machine, or university registration is required.

Plan for **approximately 10–14 hours**: orientation 45 minutes; email triage 90 minutes; authentication investigation two hours; timeline reconstruction two hours; containment/report practice two hours; final assessment two to three hours; and up to two hours of revision. These are estimates to test in the pilot, not time-based pass requirements.

Provide a short entry diagnostic covering IP addresses, log rows, timestamps, email headers, and fact versus inference. It recommends the relevant existing security lessons or a concise primer; a low score does not lock the learner out. Include a worked timestamp example, glossary, sample evidence citation, and report template.

Show before enrollment:

- Exact outputs, rubric, pass rule, allowed assistance, review turnaround, and retry policy.
- Browser-only access, downloadable text/CSV evidence, and mobile/keyboard support.
- Synthetic data notice, data retention period, result-sharing rules, and support contact.
- Which parts are practice, which are assessed, and whether a review place is available.

For the pilot, use manually issued assessment invitations with a seat limit. Keep the pathway price and review entitlement configurable; do not assume the existing Semester Pass funds human review. Finalize any paid offer only after measuring delivery costs.

## 4. Observable learning outcomes

| ID | Learner can demonstrate | Evidence of achievement |
|---|---|---|
| O1 | Triage an email using contextual and technical evidence | Disposition, three cited observations, an alternative explanation, and a safe next action |
| O2 | Distinguish suspicious account activity from normal failures and approved access | Filtered event set, affected entities, a benign counterexample, and justified confidence |
| O3 | Reconstruct an incident across sources | Ordered UTC timeline with raw timestamps, stable citations, and uncertainty notes |
| O4 | Choose proportionate containment and check its effect | Action rationale, simulator execution record, before/after checks, and remaining risk |
| O5 | Explain scope, impact, and evidence limitations | Findings that separate observation, inference, and unknowns |
| O6 | Hand over a usable incident report | Concise summary, evidence register, recommendations with owners, and recovery verification |

Before content approval, map each outcome and rubric criterion to selected Task, Knowledge, and Skill statements from a pinned release of the [NICE Framework Components](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions). Store the exact component version, statement IDs, and a short justification in the content manifest. NIST maintains these components separately from the framework structure; mapping is a design aid, not accreditation.

Use [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) as a practitioner reference when reviewing response, recovery, and improvement decisions. The pathway sequence and scoring below are our instructional design choices, not NIST assessment requirements.

## 5. Pathway sequence

Every case follows: short briefing → one worked example → guided investigation → independent checkpoint on different evidence → feedback → revision → saved portfolio output. Show the learner's first and revised reasoning so improvement is visible.

| Stage | Practical work and evidence | Feedback and completion | Saved output |
|---|---|---|---|
| 0. Prepare an investigation | Read scope; locate artifact IDs; compare a raw timestamp with UTC; distinguish an observed event from an inference | Correct the citation and timestamp exercise; confirm the synthetic lab scope | Evidence-handling checklist |
| 1. Triage a suspicious message | Compare a legitimate message with a suspicious invoice; inspect raw headers, authentication results, sender/reply-to differences, and a defanged link | Explain why any one indicator is insufficient; checkpoint requires a disposition supported by three relevant citations | Triage note and recommended next step |
| 2. Investigate account access | Filter a synthetic authentication CSV; compare failed logins, normal success, approved remote access, and an unusual success with session context | Identify the account and time window; explain one benign lookalike; automated checks cover event identity, with an exemplar for reasoning | Account investigation worksheet |
| 3. Build a defensible timeline | Correlate message delivery, gateway activity, authentication, and mailbox audit records; normalize offsets and record a known clock issue | Check ordering and references; flag unsupported causal claims; require one alternative explanation and two unanswered questions | Timeline and evidence register |
| 4. Contain, verify, and report | In a fixed simulator, revoke a suspicious session and remove an unauthorized forwarding rule; inspect fresh post-action events; assign follow-up and recovery checks | Explain scope, authority, business impact, what each action changes, and what it leaves unresolved; revise a short report against the rubric | Action/verification log and incident report |
| 5. Assessed final case | Investigate an unseen incident, perform justified simulated containment, and submit the complete evidence-backed handover | Server checks objective elements; assigned practitioner reviews judgment and report; learner receives criterion-level feedback | Assessed report and result record |

Practice completion requires all checkpoint fields, valid evidence references, and correction of objective mistakes. Reasoning prompts require a saved reflection against an exemplar; this is explicitly self-directed practice, not a human-reviewed competency verdict. Final assessment entry requires the server-recorded checkpoint submissions, an invitation, and acknowledgement of the assessment rules. Prior CTF completion is optional.

### Feedback behavior

- Before submission, validate missing fields and broken citations without disclosing the answer.
- After a practice checkpoint, explain the observation, why it matters, what it does not prove, and a concrete next step. Reveal the worked solution only after the first submission.
- Offer three hint levels: where to look, how to compare the evidence, then a worked reasoning step. Record hints for the learner's reflection; do not penalize practice hints.
- Preserve first and revised responses and show what changed. An exemplar is a defensible answer, not the only acceptable wording.
- Classify feedback as factual correction, reasoning improvement, or communication improvement. Never reward keywords alone.
- Keep AI support optional. The fixed explanations and rubric must work without model access. Do not send assessment artifacts, submissions, private keys, or reviewer notes to the existing tutor automatically.

Example: a learner writes, “SPF passed, so this email is safe.” Feedback should say: “The supplied header reports SPF pass for the envelope sender. That does not establish that the visible sender is trusted. Compare the visible From domain, authentication alignment, and message context. Revise your disposition with citations to those observations.”

Example: a learner writes, “The failed logins prove compromise.” Feedback should distinguish unsuccessful attempts from the later successful session and ask what evidence links that session to subsequent activity.

## 6. Evidence design and production

### One coherent fictional environment

Use a small fictional organization with an asset list, staff roles, working hours, approved remote-access arrangements, and escalation contacts. Evidence must arise from a single authored event model so account IDs, session IDs, URLs, timestamps, and actions agree across sources.

Use `.example` domains and documentation IP ranges. Display URLs as inert, defanged text. Messages contain no active attachments, tracking pixels, remote images, or clickable malicious destinations. The evidence is synthetic and must never contain actual customer logs, credentials, or personal information.

Practice can follow a shared fictional organization, but the capstone uses a fresh case. Create two equivalent capstone variants with different evidence relationships and benign explanations, rather than merely renaming the same account. Have reviewers confirm similar difficulty and pilot the variants before expanding the pool.

### Artifact contract

| Artifact | Contents and purpose | Suggested final-case size |
|---|---|---|
| Brief and environment | Incident trigger, asset ownership, normal behavior, permitted actions, available sources and their limitations | Two short pages |
| Email records | Raw headers and plain-text body for a suspicious message and a legitimate comparator | Two messages |
| Authentication export | Raw time/offset, event ID, user, source IP, device, result, MFA context, and session ID where available | About 80 rows |
| Gateway export | Request time, user/device association where known, destination and outcome; no invented visibility into encrypted content | About 30 rows |
| Mailbox audit | Rule changes, actor/session context, operation and result | About 15 rows |
| Context records | Approved VPN egress, a support/change ticket, and an interview note | Three short records |
| Simulator records | Initial state, accepted actions, resulting state, and fresh verification events | Generated per attempt |
| Evidence manifest | Artifact ID, version, format, byte size, SHA-256, schema, time basis, source limitations, and authorship | One machine-readable manifest |

Keep each case's initial download below 1 MB compressed as a starting budget. Measure actual loading on a constrained connection before setting a public performance claim.

Every learner-visible row or paragraph needs a stable reference such as `AUTH-0018`, `MAIL-02:H12`, or `TICKET-03:P2`. A citation resolves to the pinned artifact version and location, including after filtering or sorting. Avoid using mutable display row numbers as evidence IDs.

Preserve the raw timestamp and offset alongside normalized UTC. If a source has known clock skew, document the correction in the environment and preserve both times. If the skew is unknown, accept a justified interval instead of requiring a fabricated precise order.

### Example capstone event model

The following is an authoring example. The assessed variant's full event model and interpretation belong in a server-only reviewer pack.

| UTC event | Visible evidence | Defensible interpretation |
|---|---|---|
| 08:42 | Invoice-themed message is delivered | Suspicious delivery; receiving it does not establish compromise |
| 08:47 | Gateway records a request to the message's destination | A request occurred; the export alone cannot prove credential submission |
| 08:51 | Successful account access from an unfamiliar device/session | Concerning when compared with baseline; source IP alone is insufficient |
| 08:54 | The same session creates an external forwarding rule | Strong evidence of unauthorized mailbox configuration when policy and owner context are considered |
| 09:02 | Another user's access uses an approved VPN egress and device | Benign lookalike; do not treat every unfamiliar address as malicious |
| After containment | Fresh simulator checks show the session rejected and the forwarding rule absent | Those controls took effect; past message forwarding or data loss is still unproven |

Include background failures, at least one legitimate unusual login, and one missing source. The private key records confirmed facts, reasonable hypotheses, acceptable alternatives, normal activity, and claims the evidence cannot support. Do not imply a phishing-to-compromise causal chain or exfiltration is established when the artifacts only support suspicion.

### Authoring deliverables and acceptance

For orientation, each of the four cases, and both final variants, produce: brief; learner artifacts; manifest; objectives; notebook schema; checkpoint rules; hints; exemplar; reviewer interpretation; rubric mapping; and accessibility review. Record author, independent reviewer, review date, source/license permissions, and change history.

Generate exports from a deterministic script with a recorded seed and version. Validate referential integrity, timestamp conversions, required clue coverage, permitted ambiguity, absence of live destinations, artifact hashes, and schema consistency. A qualified practitioner must solve each independent case without the answer pack before approval. Never publish a case merely because its generator passes.

Freeze published versions. Corrections that change interpretation or scoring create a new version; existing attempts keep their original evidence and rubric. Notify affected learners and offer re-review when a defect could change their result.

## 7. Assessed final task

### Learner brief

“You are assisting the defender responsible for a small organization's email accounts. A user reports a suspicious invoice and unexpected mailbox behavior. Using only the provided case environment, determine what the evidence supports, identify the likely affected account and scope, take authorized containment actions in the simulator, verify their effect, and hand over a report to the incident lead.”

Publish the rubric in advance. Use an unseen, server-assigned variant with no case-specific hints or worked solution during the attempt. Allow the pathway notes, glossary, ordinary reference documentation, and accessibility tools. For this pilot, prohibit another person or a generative tool composing the submission; request an assistance declaration. This rule cannot be technically guaranteed in an unproctored assessment and must appear in the result limitations.

Give an expected working time of two to three hours inside a seven-day submission window. Permit pause/resume; speed is not scored. The server enforces the deadline and records agreed extensions. Operational outages can void an affected attempt without consuming a retry.

### Required submission

1. **Executive summary:** approximately 150–250 words stating what happened, likely scope, severity, confidence, and immediate priorities.
2. **Evidence register:** at least six valid references across at least three source types, each with the observation it supports. Citation count is a completeness check, not proof of quality.
3. **Timeline:** at least six relevant events, raw and UTC times, source references, and any ordering uncertainty.
4. **Findings:** affected account/session, relevant asset, one evaluated benign explanation, two explicit unknowns, and boundaries on impact claims.
5. **Containment:** chosen actions, authorization and expected business effect, server-recorded simulator actions, before/after verification, and residual risk.
6. **Recommendations:** immediate and longer-term actions with rationale, owner role, priority, and a specific recovery verification step.
7. **Method and declaration:** filters/comparisons used, assistance used, and a short reflection on what additional evidence would change the conclusion.

Use structured fields and plain text/Markdown rather than file uploads in the first release. Support tables through the notebook UI and provide accessible HTML plus JSON/CSV downloads. Screen captures are optional personal notes and cannot substitute for source citations.

### Scoring rubric

Score each criterion from 0 to 4, then calculate `sum(weight × level / 4)`. Preserve one decimal place. Do not round a result below the pass threshold up to a pass.

Shared levels: **0** absent or fundamentally wrong; **1** materially incomplete or mostly unsupported; **2** partially correct with consequential gaps; **3** meets the stated competent standard; **4** meets that standard and adds well-supported alternatives, prioritization, or verification without overclaiming. The reviewer pack includes annotated examples at each level for every criterion.

| Criterion | Weight | Level 3: competent standard |
|---|---:|---|
| Email triage and initial hypothesis | 10 | Uses header/body/context evidence, reaches a defensible disposition, and avoids treating a single indicator as conclusive |
| Account and incident scoping | 20 | Identifies the relevant account/session and suspicious behavior, evaluates the benign comparator, and bounds scope |
| Timeline and correlation | 15 | Orders relevant events across three sources, handles time conversion, and distinguishes temporal association from proven causation |
| Evidence quality and uncertainty | 20 | Cites traceable evidence, distinguishes observations from inference, and identifies material unknowns and unsupported impact claims |
| Containment and verification | 20 | Chooses proportionate authorized actions, executes them in the simulator, verifies the resulting state, and states residual risk |
| Report, recommendations, and handover | 15 | Gives a clear summary and actionable, prioritized recommendations with owners and recovery checks |
| **Total** | **100** | |

**Pass rule:** at least 70/100, with level 3 or higher in account/scoping, evidence/uncertainty, and containment/verification. A high presentation score cannot offset failure to identify the incident or verify containment.

Missing mandatory sections return a submission to the learner for completion before final submission. At review, unsupported reasoning lowers the relevant criterion. Suspected fabrication or prohibited assistance triggers a documented second review and a learner response opportunity; it is not an automatic misconduct verdict based on a similarity score or an AI detector.

### Review, feedback, and retries

- Objective server checks validate citations, time normalization, required fields, and recorded simulator state. They provide evidence for review; they do not decide narrative quality or the final pass.
- The assigned practitioner scores every criterion and cites the learner's text and source evidence when explaining a material deduction. Allow defensible alternative conclusions supported by the case.
- Return feedback within three working days during the staffed pilot. Give a strength, the most important gap, a concrete correction, and relevant practice links. Show the full rubric and review date.
- Double-mark the first three submissions, every initial total from 65–75, and every failed critical criterion. Resolve disagreement on a critical level, or a total difference over 10 points, before publishing the result. Record the resolution.
- Offer one clarification/review request within seven days, decided by a reviewer other than the original marker. Keep an audit trail of changes.
- Allow one reassessment after targeted practice, using the other variant. Preserve both results. If a full worked final solution was disclosed, retire that variant for the learner. Additional retries require additional unseen content or a staffed equivalent assessment.
- Use a short follow-up explanation when understanding is uncertain: ask the learner to explain a cited inference and a containment choice. Offer an equivalent written exchange. Record the outcome and use it consistently under the published review policy.

The result identifies pathway/task/rubric versions, attempt ID, dates, criterion scores, decision, grading method, reviewer identity or staff identifier, and limitations. Label it **human-reviewed synthetic case assessment**. Avoid a claim of proctored identity verification.

## 8. Product and technical implementation

### Learner experience

Proposed routes:

- `/pathways/defender-foundations`: outcome, requirements, expected effort, stage status, and next action.
- `/pathways/defender-foundations/cases/:caseId`: brief, evidence, notebook, checkpoints, feedback, and revision.
- `/assessments/:attemptId`: assigned case, server save status, permitted actions, deadline, and submission confirmation.
- `/assessment-results/:resultId`: rubric, feedback, retry/review request, and private export.
- `/assessment-review`: assigned reviewer queue and marking workspace.

Give the evidence viewer text search, filters, stable row links, visible raw/UTC time, and a usable stacked layout on a phone. Autosave the notebook, show the last server-confirmed save, and support export of an unsent draft during a network error. Final submission requires explicit confirmation and a server receipt.

Use keyboard-operable tables/forms, labelled controls, announced save/validation states, visible focus, and non-color status cues. Every downloadable artifact must also have a text view. Keep practice artifacts available for offline reading; assessment state and simulator actions require the server.

Cache only public practice content in the service worker. Exclude assessment APIs, private artifacts, drafts, reviews, and exports from runtime/precache rules. Clear account-scoped in-memory state on sign-out or identity change, and do not store assessment evidence or answers in shared browser storage.

### Data and authority

Use a new migration with explicit grants and tested RLS. Proposed records:

| Record | Essential fields and rules |
|---|---|
| `pathway_versions` | Stable pathway ID/version, ordered case versions, objectives, publication state, author/reviewer, timestamps |
| `practice_checkpoints` | Owner, case version, first/revised submissions, objective feedback version, submission times; server validates readiness |
| `assessment_invitations` | Owner, pathway, availability window, attempt allowance, review capacity allocation; privileged issuance only |
| `assessment_attempts` | Owner, pinned task/variant/rubric versions, state, server timestamps, deadline, extension/void reason, invitation ID |
| `assessment_drafts` | Attempt, structured notebook, revision counter, server update time; editable only while attempt is active |
| `assessment_submissions` | Immutable notebook snapshot, content hash, artifact manifest hash, submitted time; unique final submission per attempt |
| `assessment_simulator_events` | Attempt, action ID, state revision, before/after state, server time, idempotency key; append-only through authorized operations |
| `assessment_reviewer_assignments` | Reviewer identity, attempt, assignment dates and permissions; not writable through academic profile settings |
| `assessment_reviews` | Immutable review versions, criterion levels, explanations, reviewer, moderation/review-request references |
| `assessment_results` | Published decision referencing the submission and accepted review; superseding result reference for corrections |
| `assessment_audit_events` | Actor, action, entity, time, correlation ID, and bounded change metadata; no raw report text in logs |

Store learner-facing practice material separately from private capstone bundles and reviewer keys. Keys live in server-only deployment inputs; never import them into `src`, prerender output, public assets, source maps, or tutor course data. Deliver only the assigned capstone's learner artifacts through an authenticated endpoint or private storage with short-lived signed access.

Learners can read their own attempt, published result, and permitted draft, but cannot write authoritative state, scores, review assignments, or result records directly. Reviewers can access assigned cases/submissions and create reviews, not self-assign or mark their own work. Academic admin/lecturer status alone is not assessment permission. Support staff need a separately audited, narrow capability for extensions and voids.

Use the existing verified identity helper. For restricted writes, introduce narrowly scoped database operations, such as reviewed `SECURITY DEFINER` functions with a fixed search path, explicit authorization and revoked default execution, or a server-only writer with equivalent checks. Choose one approach during the schema review and test it against direct REST/RPC calls. A service role bypasses RLS and therefore requires explicit server authorization; do not assume RLS protects a service-role query.

### API and state transitions

Implement Vercel-compatible route handlers for these operations; the names below describe contracts rather than requiring a particular file layout.

1. `startAssessment`: validate identity, invitation, readiness and retry allowance; atomically assign an unseen version/variant and create or return the active attempt. Serialize concurrent starts per invitation.
2. `getAttempt/getArtifact`: authorize owner or assigned reviewer, return only permitted fields and the pinned learner artifact; never return the private key.
3. `saveDraft`: validate schema/size, require an active attempt and expected revision, then save. Reject conflicting writes with a recoverable conflict response.
4. `simulateAction`: accept an allowlisted action and target from the case, check current state revision and scope, persist the transition and verification events. Never execute shell commands, arbitrary code, or external network requests.
5. `submitAssessment`: atomically recheck deadline/state/completeness/citations, freeze the submission and action log reference, and return an idempotent receipt. Client-supplied scores, timestamps, task versions, or decisions are ignored/rejected.
6. `submitReview/publishResult`: require assignment and moderation rules, calculate scores and pass rules on the server, record immutable review/result versions, and publish only an approved decision.
7. `requestReview/startReassessment/exportResult`: enforce ownership, review window, unseen-variant rules, and private download access; do not create public sharing by default.

State model: `in_progress → submitted → under_review → reviewed`. `expired` and `voided` are explicit server-controlled terminal alternatives. Outcomes are `pass` or `needs_revision`; a reassessment is a new linked attempt. A published result correction creates a superseding result, not an overwritten history.

Use transactions/row locks for start, simulator transitions, submission, and publication. Give each mutating operation an idempotency key scoped to its user/attempt and operation. Enforce body limits, bounded reads, rate limits, and server-generated time. Fail closed for authoritative changes when persistence or authorization is unavailable; preserve draft text in the current view and show a recoverable save error.

### Defensive action simulator

Model only a small set of account/session and mailbox-rule states. For each action, the learner selects the target, gives a rationale, previews its effect and scope, confirms, and runs a separate verification check. Include at least one plausible incomplete action: a password change in this fictional environment does not by itself revoke an already issued session. State this environment rule in the briefing; do not imply all real platforms behave identically.

Practice actions can be reset with a fresh practice run. Assessment events remain append-only; retries and reversal actions are visible to the reviewer. Grade the rationale, final justified state, verification, and response to an error rather than rewarding a memorized click sequence. Simulator status must come from server state, never a browser-supplied success flag.

## 9. Privacy and operations

Collect only the account link, structured work, attempts, reviews, and operational metadata needed to deliver the pathway. No real incident uploads or employer evidence are needed. Keep submissions and reviews private to their owner and authorized staff; no automatic employer sharing or public portfolio URL.

Proposed pilot policy: delete expired unsubmitted drafts after 30 days; retain submissions, reviews, simulator records, results, and related assessment audit records for 180 days after the final decision, then delete them unless the learner opts into a documented continuation. An appeal pauses deletion of its related records until resolved. Decide and publish the policy before enrollment, including deletion effects on result verification and backup expiry; configure actual jobs rather than relying on policy text alone.

Extend existing account export and deletion flows and their tests to cover every new owner-linked table, private object, and review reference. Use resumable cleanup and verify partial failures. Audit records must not preserve unnecessary report content or a permanent shadow profile after account deletion.

For the pilot, reserve about **30 reviewer hours over two weeks** for 15 learners: roughly 45 minutes first marking per learner, moderation, clarification, reassessment, and calibration. Name a primary and backup reviewer before inviting learners. Track actual minutes and pause new invitations when available capacity cannot meet the published review turnaround.

Add alerts for failed saves/submissions, review queue age, unauthorized access attempts, simulator errors, and failed cleanup. Exclude raw evidence, answers, access tokens, and reports from telemetry. An operations runbook covers case defects, lost save acknowledgements, extensions, reviewer absence, accidental disclosure, appeal, and result correction.

## 10. Delivery phases and responsibilities

Estimate **5–7 weeks to an invite-ready release, then a two-week pilot**, assuming one engineer, a content author working alongside them, a practitioner reviewer, and part-time QA. Budget roughly 25–35 engineering days plus 8–12 content-authoring days and scheduled reviewer time. These are planning estimates; confirm them after the first complete case. One person doing all roles needs a longer calendar, and independent content/marking review still requires another person.

| Phase | Work and owner | Dependency | Exit evidence |
|---|---|---|---|
| 0. Define and unblock, 2–3 engineering days | Product/content lead fixes outcomes, scope, review policy and cohort; engineer verifies affected audit blockers; practitioner approves rubric outline | Repository and deployment inventory | Named reviewers, accepted brief, relevant access/isolation regression evidence, and a sample marking exercise |
| 1. Deliver one complete practice case, 4–5 engineering days | Author writes email case and exemplar; engineer builds manifest, viewer, notebook, checkpoint/revision, and resume; QA tries it on phone/keyboard | Phase 0 | A beginner completes the whole case and exports a useful triage note; practitioner signs off evidence |
| 2. Build trustworthy assessment, 6–8 engineering days | Engineer adds schema, invitations, attempt lifecycle, immutable submission, RLS and API authorization; reviewer tests queue/marking | Phase 1 model and reviewed schema | Two-account/direct-API integration checks pass; a submitted report can be marked and published without client authority |
| 3. Complete investigations and simulator, 6–8 engineering days | Author produces remaining cases; engineer adds correlation/timeline and action state machine; practitioner validates both final variants | Phase 1; simulator persistence follows Phase 2 | All outcomes have working practice and assessment evidence; two blind solves; all objective keys independently checked |
| 4. Results and operational readiness, 4–5 engineering days | Engineer adds moderation, reassessment, exports, privacy cleanup, telemetry and recovery; QA covers complete flows | Phases 2–3 | Full rehearsal, restore/export/delete checks, approved content/rubric versions, and staffed review queue |
| 5. Release preparation, 3–6 engineering days | Engineer/QA address rehearsal findings, run regression/security/accessibility checks, and stage the feature-flagged release | Phase 4 | Go/no-go checklist signed by engineering and content owners; pilot invitations enabled |
| 6. Pilot and revise, two calendar weeks | Product recruits 10–15 learners; reviewers mark; engineer supports and fixes defects | All release gates | Completed learner reports, moderation records, completion/cost data, feedback, and a written expand/revise decision |

Phases overlap only where their dependency allows. Authoring can run alongside schema work, but content may not be signed off before an end-to-end solve. A demonstration of one case after Phase 1 is not the complete pathway release.

The first implementation batch is concrete: approve this brief; create the practice-case content contract; author and review the email case; implement its viewer/notebook/feedback loop; observe three beginners completing it; then confirm the remaining estimate and assessment schema. Do not build every screen before testing whether the first case teaches the intended skill.

## 11. Verification and acceptance

### Content and learning checks

- Every outcome maps to a practice task, final task, and rubric criterion; every required conclusion has supporting artifacts.
- A blind solver can finish without undocumented platform knowledge. At least one benign explanation and one unresolved question matter to the final decision.
- Seeded logs, hashes, time conversion, source limitations, citations, and simulator events agree. Each variant is similar in workload and assesses the same outcomes.
- Feedback explains errors and supports revision; it does not teach shortcuts such as “SPF pass means safe” or “unusual IP means compromise.”
- Reviewers calibrate on at least three sample reports representing a clear pass, near threshold, and clear fail. Resolve critical-level disagreement before marking learners.

### Automated and integration checks

- Editing local storage, study progress, browser state, request scores, timestamps, and role metadata cannot create eligibility, a published result, or a pass.
- Learner A cannot list/read/write learner B's drafts, artifacts, attempts, exports, or results, including direct REST/RPC/storage requests. An unassigned reviewer and ordinary academic admin receive no assessment access.
- Concurrent starts consume one invitation allowance; duplicate submit requests produce one immutable submission; submitted work cannot be replaced; concurrent marking/publication cannot publish an unmoderated result.
- Expiry, extensions, reassessment, unseen variants, idempotent actions, stale revisions, failed writes and retry behavior use server authority.
- Objective checks handle alternate valid evidence sets, timezone boundaries and documented uncertainty. Rubric calculations, critical-level rules and version pinning have meaningful tests.
- Private answer keys and submitted work are absent from client bundles, prerendered HTML, source maps, service-worker caches and AI context. Learner artifact responses do not disclose reviewer fields.
- Export, deletion, retention and partial cleanup failures are verified against a migrated test database and private storage when used. SQL text assertions alone are insufficient.

### Browser and operational checks

Rehearse: signed-out entry → independent sign-in → first case → feedback/revision → resume on another device → invitation → unseen assessment → simulated containment → submission receipt → reviewer moderation → published result → private export → clarification/reassessment. Also cover expired session, network loss before/after submission acknowledgement, two open tabs, shared-device account switch, and reviewer absence.

Run the current repository's `npm run lint`, `npm run validate`, `npm run build`, and `npm test`, plus the new database/API and browser checks. Verify keyboard and screen-reader operation, phone layouts, readable long logs, and a constrained-connection case load. Document actual deployment/migration/browser evidence rather than treating mocked tests as proof of production behavior.

### Release gates

Do not invite the cohort until all are true:

1. Orientation, all four cases, both final variants, exemplars, reviewer packs, and rubric anchors are complete and independently reviewed.
2. A learner can produce and export the required report using the shipped product, and a reviewer can return an explained, moderated result.
3. Server-authoritative records, account isolation, direct-access controls, retry rules, and private key separation pass integration checks.
4. Named reviewers, review capacity, support/recovery runbook, privacy notice, retention job, export and deletion are ready.
5. A feature flag defaults off; staging migrations and the complete flow are rehearsed. Public claims describe only capabilities enabled for that audience.

Roll out by applying the additive migration and verifying grants first, deploying the compatible server/frontend behind the flag, publishing signed-off content, then enabling a small invite list. On a serious defect, stop new attempts and simulator mutations, retain existing records, preserve learner access to saved work where safe, and use a forward fix. Do not roll back by dropping learner submissions. Notify affected learners of any deadline or result correction.

## 12. Pilot evidence and decision to expand

Proposed targets below are hypotheses for this small cohort, not evidence already achieved or statistically reliable market benchmarks.

| Measure | Definition and collection | Initial decision guide |
|---|---|---|
| Activation | First substantive evidence-backed checkpoint / all invited learners | At least 80%; investigate setup and evidence-viewer problems if lower |
| Pathway completion | Final submissions / activated learners, reported with counts and withdrawals | At least 70% within the agreed pilot window; interview non-completers |
| Learning change | Matched short pre/post mini-cases scored blind with the same outcome criteria | Most paired learners improve; inspect individual gains and task difficulty rather than claiming causality |
| Assessment quality | Criterion scores, first-attempt pass, reassessment results, and moderation disagreement | Examine weak criteria and disagreement; no target pass rate that pressures reviewers to pass learners |
| Feedback usefulness | Learner revises a material mistake and can explain the correction | Review first/revised work and interview at least five learners |
| Review service | Time from complete submission to published feedback, in working days | At least 90% within three working days, with actual queue counts |
| Delivery cost | Review/support minutes plus measured variable infrastructure/provider cost per submitted learner | Fit the proposed offer; keep review places capped until sustainable |
| Reliability | Lost submissions, unauthorized reads/writes, unrecoverable simulator errors | Zero lost submitted work or confirmed cross-account disclosure; any occurrence pauses expansion |

Use minimal first-party events for case start, checkpoint submission/revision, assessment submission, review publication, and learner return. Use server events for authoritative milestones, avoid raw answers, and update the privacy notice before collecting new behavior data. Record invitations and withdrawals so funnel denominators remain honest.

At the end, produce a pilot report containing counts, completion times, representative anonymized work with permission, rubric distributions, common misconceptions, marking consistency, learner interviews, support issues, and actual cost. Expand only when learning outputs are credible, integrity/reliability gates remain satisfied, and review capacity can meet demand. Otherwise revise the relevant case, feedback or workflow and repeat a capped pilot.

## Definition of done

A new independent learner can enter the pathway, learn through four realistic investigations, revise work after useful feedback, complete a fresh final case with recorded containment verification, and receive a private, explained, human-reviewed result tied to immutable evidence and rubric versions. The team can reproduce that result, protect it from client tampering, support the learner, and show actual pilot work demonstrating what was learned.
