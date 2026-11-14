**Public learner portfolios — proposal, 10 November 2026**

Status: design only. No application changes, migration, database execution or deployment is authorized by this proposal. A later implementation request is required even after the decisions below are answered.

**Decisions confirmed by the owner**

- Show only modules that the learner individually selects. Enabling a portfolio must never publish their whole learning history.
- Human approval is required before publishing free text, including display names, and after edits.
- Pages are public by link at launch and request no search indexing. A link and a noindex directive are not access controls.

Three further questions remain open: chosen names versus account names; whether Security solutions and flags may be published; and the moderation owner, response expectations and retention policy. Proposed defaults below remain provisional wherever those answers matter.

**What exists today**

`src/components/useMissionNotes.js` stores notes under `arete-mission-notes-v1:<user-or-guest>:<module>`. They are device-local and capped at 600 characters per step. It deliberately keeps free text out of `user_progress`, which is also consumed by the tutor. `src/utils/missionSteps.js` builds a downloadable Markdown study record; it explicitly calls the record self-reported rather than a certificate. Module completion markers and step ticks are also client-written self-reports, not proof of independently assessed competence.

The current checkout's `CLAUDE.md` has no `TrackModuleDetail` row. This proposal uses the actual hook, module page and write-up builder as its source of truth; implementation should add the missing documentation row. No local notes should be uploaded merely by introducing this feature, signing in, opening a module or enabling a portfolio.

**Learner and visitor experience**

Use `/p/<random-public-id>` for the first version. The identifier is distinct from the authentication UUID. Defer custom handles, search, comments, followers, uploads and custom images. Reuse Areté's typography and palette. A public page shows an approved chosen name, an optional approved short introduction, selected module cards grouped by track and the approved write-ups attached to those cards. Label completion as “Learner-reported completion”; label write-ups as the learner's own account, with a publication date rather than an invented completion date.

An owner-only “My portfolio” screen offers a private preview. Each completion has its own unchecked publication control. From a module, “Prepare a public write-up” lets the learner select and edit the notes to include, remove private material and preview the exact outgoing text. The consent screen states that the selected copy will leave the device, be seen by reviewers and, if approved and still requested, become public. Guest notes are never silently attributed to an account; any import requires an explicit selection after sign-in.

The page may show a selected completion without a write-up. A write-up needs an explicitly selected completion and human approval. Creating a publication draft does not replace or synchronize the learner's local notes. Editing local notes never changes a live write-up. Editing a submitted write-up creates a new revision; the previous approved revision stays public until replaced or explicitly unpublished. Make that fact visible beside the edit controls, with an immediate unpublish option for removing sensitive old text.

**Private and public defaults**

| Information | Default and publication rule |
| --- | --- |
| Portfolio page | Disabled; learner explicitly enables an approved public identity. |
| Completion cards | Private, individually selected; no automatic sharing of future completions. |
| Local notes | Stay on the device. Upload only the explicitly selected publication copy. |
| Publication drafts, pending/rejected revisions | Private to the learner; reviewers see submitted revisions, not unsent local notes. |
| Name and introduction | Separate publication fields; no automatic copy from `profiles`. Name policy awaits the owner. |
| Email, registration number, department, location, attendance, billing and career records | Never included in the public portfolio response. |
| Quiz scores, incorrect answers, step-level activity and visit times | Excluded from the first version. |
| Approved write-up | Only the exact approved revision, while its page, entry and publication request remain active and unblocked. |

Do not join the private `profiles` table into public responses. Do not place write-ups inside `user_progress` or automatically feed them into tutor prompts, analytics, error logs or a moderation model.

**Proposed Supabase tables**

These are logical table definitions, not migration SQL. Enable RLS on every table and index ownership and moderation-queue lookups. All learner-owned rows reference `auth.users` with cascading deletion. Composite foreign keys enforce that an entry and its revisions belong to the same portfolio and owner.

| Table | Principal fields and invariants |
| --- | --- |
| `learner_portfolios` | Internal `id`, unique `owner_id`, unique random `public_id`, `enabled=false`, server-managed `suspended=false`, `generation`, nullable `live_profile_revision_id`, timestamps. One portfolio per learner. |
| `portfolio_entries` | `id`, `portfolio_id`, `owner_id`, `track_slug`, `module_id`, `completion_public=false`, nullable `live_writeup_revision_id`, `publication_requested=false`, server-managed moderation hold, `generation`, timestamps. Unique portfolio/track/module. Module IDs and display metadata are validated/generated from the canonical catalogue by the server. |
| `portfolio_revisions` | `id`, `portfolio_id`, `owner_id`, optional `entry_id`, `kind=profile|writeup`, revision number, bounded content, content hash, catalogue/template version, `review_state=draft|pending|approved|rejected|withdrawn`, submission/review dates and private review reason. Submitted content is immutable; edits create another revision. Profile content contains the public name/introduction; write-up content contains only the selected publication copy. |
| `portfolio_reports` | Report ID, portfolio/entry/revision reference, authenticated reporter, structured reason, optional bounded private explanation, resolution metadata. No public report details or reporter identities. |
| `portfolio_moderation_events` | Target identifiers, actor, action, reason category, revision hash, timestamp. Append-only through trusted transitions. Avoid duplicating the write-up body in this audit table. Retention awaits the owner. |

An approved revision is distinct from a live publication pointer: approval must not publish a withdrawn request or a suspended portfolio. Preserve an owner-readable reason for rejection; internal moderator discussion is separate and is never returned publicly. Reviewer references should permit account deletion without leaving copied names or emails in audit metadata.

Proposed bounds: display name 60 characters, introduction 280, write-up 12,000 characters **and** 24 KiB UTF-8, report explanation 500 characters. Both character and byte limits apply; they leave room within the existing account router's 32 KiB request limit. Only one pending revision per target; optimistic version checks prevent overwriting another device's work.

**RLS, grants and trusted operations**

Do not add anonymous SELECT policies to `profiles`, `user_progress` or any portfolio base table. Public visibility is a deliberately narrow projection, not a new way to query private rows. Supabase documents both RLS behavior and the need to review privileged database functions and their execute grants. [RLS documentation](https://supabase.com/docs/guides/database/postgres/row-level-security), [database function privileges](https://supabase.com/docs/guides/database/functions).

| Database caller | SELECT | INSERT / UPDATE / DELETE |
| --- | --- | --- |
| `anon` | No base-table grants/policies. May execute only the public-read projection described below. | None. |
| Authenticated learner | Own portfolio, entries and revisions using `owner_id = (select auth.uid())`; own reports using `reporter_id = (select auth.uid())`. | No direct base-table DML. Writes use authenticated, validated API operations and narrow transactional database functions. |
| Reviewer | Submitted revisions and the context needed to review/report, through a server operation that verifies the reviewer role. No blanket access to every private draft. | Approved review, hold and takedown transitions only. Reviewer role assignment is never editable by the applicant. Existing admins are the proposed launch reviewers, pending confirmation. |
| Trusted server | Explicit scoped reads and transactional writes. | Privileged transitions described below; never unrestricted request-driven CRUD. |

Expose one carefully audited `read_public_portfolio(public_id)` database function to `anon` and `authenticated`. It returns a fixed public document, with no owner UUID, private draft, reviewer identity or private reason. Its privileged read must apply the complete visibility predicate itself: enabled page, no suspension, approved live identity, individually selected completion, no entry hold, approved live write-up with active publication consent where applicable. It must also check the module's currently synchronized completion marker before including that module or its write-up. A removed marker hides it on subsequent reads; completing it again can make it visible under the still-active selection, but cannot restore an explicitly withdrawn publication request.

This public read is the sole intentional privileged anonymous database entry point. Fix its search path, fully qualify objects, use static queries, accept only the public identifier, revoke default PUBLIC execute grants and grant only its intended callers. It is readable directly through Supabase as well as through Areté's public API; its filters and output restrictions must therefore be enforced in the database, not just in the React page. Private projections and mutation functions have no anonymous execute permission. Avoid implicit owner-privileged views that accidentally expose underlying private columns.

Owner writes are handled through the existing account API after verifying the bearer token. Use the owner's RLS client for private reads. Use the existing `api/_lib/serviceRole.js` only for the protected transactional transitions; it is the sole place that reads the service key. The service role bypasses RLS, so each mutation must scope to the already verified owner, validate ownership again in its transaction and whitelist writable fields. Mutation functions are callable only by the trusted service role. The browser cannot set an approval state, moderation hold, reviewer, live revision pointer or another owner's ID. Review operations additionally verify a current server-side admin/moderator assignment and record the verified actor.

At publication, require the synchronized completion marker and a known catalogue module. A local-only learner is asked to synchronize or retry, rather than having a missing cloud marker treated as verified. Persist the observation/publication date, not a claimed historical completion time. This still establishes only that the learner marked the module complete: it does not turn editable progress into an assessment result.

**Publication and withdrawal transitions**

1. Save an explicitly prepared copy as a private draft. Submission freezes its content hash and records the current portfolio/entry generation and publication request.
2. A human approves or rejects that exact revision. Approval and activation are one transaction that rechecks current ownership, consent, generations, page/entry holds and the completion marker. A stale review receives a conflict instead of reviving withdrawn content.
3. “Unpublish write-up” immediately clears its live pointer, cancels pending requests and increments the entry generation. The completion card may remain selected. “Hide this module” hides both its card and write-up. Neither requires a review or a reason.
4. “Turn off my portfolio” disables the page and invalidates pending activation requests. Re-enabling requires a fresh preview and explicit confirmation of the retained selections; it must not silently activate a previously pending revision. A moderator suspension cannot be removed by toggling the owner's controls.
5. “Delete this saved copy” removes the server-held draft/revision according to the agreed retention policy. Unpublishing alone does not delete local notes or private server copies. Existing visitor tabs, downloads, screenshots and third-party copies cannot be recalled.

After the database transaction commits, new public reads must exclude withdrawn content. Use `Cache-Control: no-store` for page data, avoid static prerendered learner pages and exclude portfolio pages/data from service-worker caches. The current PWA has an SPA navigation fallback; implementation must explicitly exclude `/p/*` from document caching/fallback and clear in-memory portfolio data on navigation. Static application assets may remain cached. No offline public portfolio copy should be created. A database outage returns unavailable/hidden content, never a stale cached publication or unreviewed draft.

**Moderation of public free text**

Human pre-publication review is confirmed. Apply it to public names, introductions, write-ups and edited versions. Only generated catalogue labels and the selected completion fact avoid text review. No comments or file/image uploads in the first version.

The reviewer checklist covers exposed credentials and personal information; harassment, impersonation and threats; spam; copied or unauthorized material; and inappropriate disclosure of real-system security information. The Security-room spoiler rule is awaiting the owner. Proposed policy: permit learning reflections and approaches, withhold literal flags and complete solutions. A flag-pattern check can assist but cannot detect all paraphrased answers or secret formats. Review security examples in their educational context rather than rejecting every mention of XSS or passwords.

Use bounded deterministic checks for obvious secrets and flag patterns as reviewer assistance. Do not send selected text to an external AI moderation provider without a separate decision about disclosure, cost and retention. Automated checks do not replace the required human approval. If review tooling is unavailable or reviewers are absent, leave content pending; never publish by timeout.

Render a constrained text/Markdown subset as escaped React text. No raw HTML, active embeds, remote images or executable examples. For the first version, render URLs as text rather than introducing external-link and tracking behavior. Reuse the safe portions of `RichText`/`CodeBlock` after reviewing them for this public input boundary. Record the approved content hash so an edit cannot inherit someone else's approval.

Give signed-in visitors a rate-limited structured report action. Signed-out visitors need a clearly published privacy/takedown contact route using the existing contact channel. Reports are private. A reviewer can hide an individual revision, place an entry on hold or suspend a page immediately; restoring it is a separately audited decision. New revisions cannot bypass an active hold. Do not promise a response time until the operator and coverage are confirmed.

**Keeping the deployment at 12 functions**

The checkout currently has 12 deployable API files after excluding underscore-prefixed helper directories. Vercel's documentation describes the 12-function limit for this direct-function Hobby deployment approach. [Vercel runtime documentation](https://vercel.com/docs/functions/runtimes).

Extend the route map in `api/account/[action].js` with `portfolio`, lazily importing `api/_lib/portfolioHandler.js`. Add no new deployable file under `api/`. Proposed interface:

| Existing function URL | Purpose |
| --- | --- |
| `GET /api/account/portfolio?publicId=...` | Anonymous public projection only. No owner preview or administrative mode on GET. |
| `POST /api/account/portfolio` | Authenticated actions: owner status, prepare/submit copy, change selections, unpublish/delete, enable/disable, report; verified reviewers also get queue/review/hide operations. |

The path chooses the handler, preserving the router's existing protection against query-string route substitution. Each operation then checks its own role and permitted fields. The GET path needs explicit method/header handling because current API helpers advertise POST/OPTIONS. Add a feature flag and fail closed if required tables/functions are not installed. Publication and report writes need durable per-account limits and transaction-level caps, not only the existing per-instance IP limiter; a missing durable limiter must not silently permit unlimited submission or moderation work.

Serve `/p/<public-id>` as a public SPA route outside the study-page auth gate. Set an HTTP `X-Robots-Tag: noindex, nofollow` on both `/p/*` and its public data responses, add equivalent page metadata, omit portfolios from sitemaps and directories, and display a clear public-sharing notice. These discourage indexing without claiming confidentiality. Custom social previews/SSR are deferred; if required later, reuse this same routed function with explicit HTML handling rather than introducing another function. Human queue processing and database RPCs require no additional Vercel function or cron.

**Deletion, export and acceptance criteria**

Include owner-visible portfolio records and publication copies in account export. Label local notes separately because the server cannot export notes held on another device. On account deletion, hide the public page first and cascade learner content through `auth.users`; preserve only the minimal moderation metadata explicitly approved for retention, with actor references anonymized as necessary. Extend the existing deletion/export paths rather than adding endpoints. Backups and their expiry must be documented against the actual Supabase project configuration; do not promise immediate deletion from backups or choose a legal retention period by assumption.

Before implementation is accepted, test owner A versus owner B and anonymous direct REST/RPC access; forging moderation fields; role removal during review; edit/review and unpublish/review races; page disable and deletion; no publication of unselected notes or fields; current completion-marker removal; safe rendering of HTML/links/flags; and the service-worker/cache behavior after withdrawal. Test reviewers cannot read unsubmitted private drafts. Verify the build's deployable function count remains exactly 12. RLS checks must run against the actual project schema as well as the repository definitions; this proposal does not claim to have inspected the deployed database.

**Owner decisions still required before any migration is written**

- Public identity: allow chosen names/pseudonyms, or require the account name? Recommendation: a separate chosen name, reviewed before publication.
- Security write-ups: reflections/approaches with flags and full solutions withheld, or complete solutions allowed? This affects moderation and the Premium experience.
- Operations and retention: who reviews and handles urgent takedowns; what coverage/response target is realistic; how long withdrawn/rejected copies and moderation metadata should remain? Starting proposal: existing admins review; learner-owned copies remain private until deleted; audit metadata lasts 90 days without copying full text. No retention schedule or promised service level is approved yet.

The selected-module policy, human pre-publication moderation and public-by-link/noindex launch policy are already confirmed. Answering the remaining questions will finalize this document, not authorize construction or migration execution.
