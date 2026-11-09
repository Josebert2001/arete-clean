# Blue-team independent investigation pilot

Date: 9 November 2026. Source implementation only; no practitioner review, staffed pilot, live Supabase migration or running Linux environment is claimed.

## Implemented flow

After [career discovery](career-discovery-rollout.md), a learner who selects blue team can open `/career/investigation`. An active pilot invitation is required to create a new case; the start transaction enforces it. Starting creates or resumes a private, server-assigned case. Invitation expiry stops new attempts, while already-owned work remains readable and its original case deadline still governs edits. The two versions differ in their evidence relationships: one includes a suspicious message; the other includes an approved renewal and unrelated failed sign-ins. Difficulty and rubric interpretation still need independent practitioner calibration.

The lesson supplies eight cited artifact records across email, gateway, authentication, mailbox audit, interview and change-record sources. Source times describe a fictional incident day; simulator audit times record the learner's actual exercise session. The case asks for cautious interpretation rather than assuming a click proves credential disclosure or forwarding proves past data loss.

The learner can revoke a scoped simulated session, remove a simulated rule, and run a separate verification. Legitimate sessions/rules are also present so unnecessary disruption remains visible to the reviewer. The server chooses allowed operations/targets and persists version-checked state changes. This is a deterministic simulator, not a VM or live account administration.

Five report sections, six references across three source types, and an assistance declaration form the final report. Drafts are explicitly saved to the account and can be downloaded. Final submission atomically freezes the report and simulator snapshot. Retries with identical content return the original submission; different replacement content is rejected. Deadlines and revisions are enforced in Postgres, not browser state.

`/career/reviews` shows only specifically assigned submitted cases. Academic roles do not grant review permission. Reviewers assign 0–4 per criterion and explain each level. The server calculates the weighted total; pass requires at least 70 and level 3 in scope, evidence and containment. No automated narrative grade or client-supplied pass is accepted. The learner sees the criterion feedback and can download the account-linked synthetic-case result. One unseen reassessment is available after a failed review; new attempts are blocked while review is pending or after a pass.

## Deployment prerequisites

1. Apply `20261109000000_career_placement.sql`, then `20261109010000_blue_investigations.sql`, manually in the intended Supabase environment.
2. Run both SQL integration files in `supabase/tests/` on a disposable migrated database. The local PostgreSQL installation is missing `share/postgres.bki`, so these checks have not run here. Mocked JavaScript/API tests do not verify deployed RLS/grants.
3. Have a qualified practitioner solve both variants, check the timestamps/benign explanations, calibrate the rubric with sample reports, and approve the published version. New content must get new task/rubric versions; do not edit an already assigned case version in place.
4. Name primary/backup reviewers, agree review capacity and timing, and establish support for expired cases, disputed grades, required second review and result corrections before inviting learners. This initial UI publishes one immutable review; a versioned appeal/correction workflow and formal moderation queue are not yet implemented. Do not use it for high-stakes employment claims.
5. On a configured preview, set `CAREER_PLACEMENT_ENABLED=true` and then independently enable `CAREER_ASSESSMENT_ENABLED=true`. Both default off. Rehearse the full learner/reviewer flow and all cross-account checks before any production enablement.

An administrator issues invitations only for the staffed cohort (initially up to 15). The default invitation start window is seven days; confirm dates and review capacity before issuing it. In the Supabase SQL editor, use an actual agreed learner account ID:

```sql
INSERT INTO public.career_case_invitations(user_id)
VALUES ('<learner-auth-user-uuid>'::uuid)
ON CONFLICT DO NOTHING;
```

An administrator can assign a submitted case in the Supabase SQL editor using actual agreed account IDs:

```sql
-- Replace both placeholders. This does not grant a general academic/admin role.
INSERT INTO public.career_review_assignments(attempt_id, reviewer_id)
SELECT id, '<reviewer-auth-user-uuid>'::uuid
FROM public.career_case_attempts
WHERE id = '<submitted-attempt-uuid>'::uuid
  AND status = 'submitted'
  AND user_id <> '<reviewer-auth-user-uuid>'::uuid
ON CONFLICT DO NOTHING;
```

Removing an assignment revokes that reviewer's case/report access through RLS. Assign a backup before removing the only active reviewer. Learners can never self-assign through this API or directly write authoritative attempt, submission or review tables.

## Checks and limitations

JavaScript tests exercise differing variants, hidden interpretation fields, scoped simulator actions, immutable source snapshots in memory, separate verification, citation/declaration validation, partial drafts, weighted scores, critical thresholds, owner-derived requests, stale revisions, forged state/results, disabled-pilot behavior, saved draft UI, pending-review UI and unassigned reviewer behavior.

The SQL checks additionally cover owner isolation, direct write/RPC denial, stale revisions, verification before submission, immutable/idempotent submission, self-review denial, assignment and revocation, and deletion cascade. A real browser/device session, live Supabase policies and simultaneous production transactions still need preview verification.

Case version and rubric version are stored with every attempt; submissions retain their simulator snapshots and reports. Full downloadable original artifact bundles, content hashes, automatically saved drafts, reviewer calibration tooling and versioned corrections remain future work. The currently shipped artifacts are structured synthetic text records, not live exported enterprise telemetry. Identity is account authentication only, and the assistance declaration is not proctoring.

The two cases are source fixtures. Server-only delivery keeps their interpretation out of the client bundle; it does not make source code secret if the repository is publicly accessible. Before promising an unseen or higher-trust assessment, publish fresh practitioner-reviewed variants through a private content workflow and define task rotation. The pilot's human review and declared assistance limits must not be presented as proof against cheating.

Career data export includes owner-linked cases, drafts, submissions and reviews. Owner-linked rows cascade when the auth account is deleted. No evidence is automatically shared with employers or sent to an AI provider. The [Linux lab platform](linux-lab-delivery-plan.md) remains a separate infrastructure implementation.
