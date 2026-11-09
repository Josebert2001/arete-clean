# Career discovery: first implementation and rollout

Date: 9 November 2026. This implements the first slice of the [career plan](career-pathway-implementation-plan.md), not the complete assessed-pathway or VM platform.

## Repository scan and implementation

The repo uses React/Vite, custom Tailwind styles, Supabase authentication/data and Vercel functions. There was no existing career quiz, placement persistence, reviewer system or Linux-session service. Independent onboarding, public/prerendered pages, owner-scoped API identity, account export/deletion and tests provided the integration points.

The scan also found the app at 12 deployable functions. Career operations therefore share `api/account/[action].js` with deletion. `/api/account/delete` retains its public URL and existing handler behavior. The router derives operations from the pathname rather than a caller-controlled query override. Existing Google integration work is separate.

Delivered source:

- `/careers`: public, prerendered explorer, four introductory directions, and visibly planned specialties including purple progression. Includes grey-box/grey-hat terminology.
- `/career-quiz`: authenticated 30-question guidance quiz, six short steps, back navigation, server availability check, and recoverable submission errors.
- `/career`: persisted recommended/chosen direction, interest/judgment explanation, missed foundations, a next starter task, alternatives and retakes.
- `/career/practice/:path`: public synthetic evidence, signed-in reflection workspace, worked feedback, account saving and local text export for each of blue, red, GRC and AppSec.
- Career sign-in/profile handoff, navigation and an independent-home roadmap card.
- Server-only answer keys/scoring; no AI dependency. Scores are guidance rather than verified competency. Ambiguous or weak results require an explicit learner choice.
- Quiz rule release `career-v2` follows the revised plan's realistic distractors and 0/1/2 judgment credit (six possible points per path). Each attempt stores the canonical prompt/option snapshot as well as answers/results, so later question edits do not change what an earlier learner answered. Earlier rule versions remain stored unchanged and prompt a retake. Existing security/programming lessons are linked alongside the new starter worksheets; saving a direction does not enroll someone in an unfinished full course.
- New owner-readable, server-writable career records. Retakes preserve attempts. The submission RPC atomically records the attempt and current recommendation, serializes per owner, and handles idempotent retries without undoing newer choices/results.
- Account export includes answers/results/reflections; foreign keys cascade career records on auth-account deletion. The privacy notice describes the records and retention until account deletion.

A chosen direction is not enrollment in a complete professional course. Starter reflections are self-directed formative work; no assessed pass, human review, employer referral or running VM is claimed. An inline foundations primer covers the six quiz topics and links to the existing security introduction; a wider reviewed practical foundations unit is still to be authored.

## Deployment order

1. Apply `supabase/migrations/20261109000000_career_placement.sql` manually in the intended Supabase project after the normal authentication setup. It creates three tables and one service-role-only transaction function and reloads the API schema. It does not change academic profiles or authorization roles.
2. Verify owner isolation and privileges in a disposable test project before enabling. `supabase/tests/career_placement.sql` checks reads, forbidden direct writes/RPC execution, retries, retained history and deletion cascade. The test runs in a transaction with temporary fixtures and must not be pointed at production.
3. Configure the existing server-only `SUPABASE_SERVICE_ROLE_KEY` and set `CAREER_PLACEMENT_ENABLED=true` on the API deployment. Leave it false until the migration/policy checks pass. No new paid provider or VM infrastructure is required for this slice.
4. Add `/signin?learn=career` for the relevant production/preview origins to Supabase Auth's redirect allowlist. Keep existing sign-in and cybersecurity redirect entries.
5. Deploy the compatible client and API together. The account route replacement must be present in the same deployment; do not leave both the old static delete function and the new dynamic router in place.
6. Rehearse the flows below and verify the feature flag can disable new career reads/writes without changing the rest of the site. Disabling does not delete stored work.

With the flag disabled or tables unavailable, the quiz checks availability before collecting answers. Public career exploration and synthetic evidence remain readable. Signed-in starter reflections can still be written and downloaded in the current page; account save fails explicitly. No recommendation is invented in the browser.

## Checks

Local verification on 9 November 2026: the full JavaScript suite passed all 1,242 tests across 94 files with two workers, ESLint passed, and the production build prerendered 101 pages. The career HTML/canonical/sitemap checks passed, the deployed function count remains 12, and the checked server-only case/RPC identifiers were absent from browser assets. Database and interactive-browser checks remain separate prerequisites below.

Automated tests cover each recommended path, foundation gaps, close/tied and uncertain answers, invalid inputs, fixed auth entry destinations, request identity, fabricated client results, bounded notes, stale attempts, caching, router query overrides, public static rendering, all-30-answer submission, reflection saving, and delayed responses during account changes. Existing deletion and university/security onboarding tests remain relevant regression checks.

Run:

```text
npm run lint
npm run build
npm test
```

`npm run build` also validates existing module/course data and prerenders the career explorer and sitemap entry. No dependency changes are needed. Use `vercel dev` or a Vercel preview for API-backed manual testing; plain Vite serves only the frontend.

Local database verification limitation: the available PostgreSQL 17 installation could not initialize a disposable instance because `share/postgres.bki` is missing. This persisted on an approved unsandboxed retry. The SQL integration checks are included but have not been executed here; passing mocked API tests does not verify deployed Supabase grants/RLS. No production database was changed.

## Manual acceptance on a configured preview

- Signed-out visitor opens `/careers`, reads the available/planned distinction and opens a public starter. HTML should remain useful without JavaScript.
- New visitor chooses career discovery, signs in by Google or magic link, selects independent learning, enters a name and reaches `/career`. A returning university account retains its academic profile.
- Complete all 30 questions. Reload the roadmap and sign in on another device; the direction/result remain saved. Back navigation during the quiz retains answers; errors retain the current form.
- Test an exact tie and all-uncertain interests: no arbitrary assignment is claimed, and the learner can choose an entry direction. Purple remains a progression description, not an enrollable empty course.
- Change direction and retake. Confirm old attempt history remains in the account export and an old request retry cannot rewind the current choice.
- Write/save/reopen a reflection; compare with feedback, revise and export. No independent assessment pass is displayed.
- Sign out of A and into B in the same browser, including during a delayed request. A's career results and reflections must not appear for B. Confirm with direct database/API requests, not only navigation.
- Download account data and verify career records. Delete a disposable non-staff account and verify its career rows are removed without affecting a second account. Recheck the existing staff-deletion restriction.
- At phone width and with a keyboard, check radio groups, progress, focus on step changes, errors, textarea, save and route links. A real interactive browser/device session has not been verified by the source/component checks.

## Next implementation slice

The [blue investigation pilot](blue-investigation-rollout.md) now adds assigned case variants, saved report drafts, frozen submissions and a restricted reviewer workspace under its own migration/feature switch. It is an introductory synthetic case, not the complete defender curriculum. Next: practitioner content/rubric calibration, broader practical foundations, moderation and versioned correction support, and a private case-content workflow. Build real Linux sessions through the separate [lab service plan](linux-lab-delivery-plan.md) after a provider/gateway prototype and cost/capacity decision. The current compiler runner does not create Linux VMs.
