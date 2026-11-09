# Areté cybersecurity career pathways: implementation plan

Date: 8 November 2026; revised 9 November 2026 (judgment items rewritten with partial credit, pilot size reconciled with the pilot proposal, Phase 0 career explorer added). Status: proposed; no placement engine, partner commitment, or hiring outcome is claimed as delivered.

## 1. Product decision

Areté will help a learner choose a cybersecurity career direction, build demonstrable skills in that direction, and take concrete steps toward relevant work. The core journey is:

**Career placement quiz → explained recommendation and automatic pathway enrollment → practical work and feedback → assessed portfolio → career review → suitable opportunities and application follow-up.**

The learner finishes with evidence they can discuss with a reviewer or employer, an honest account of remaining gaps, and a next career action. Finishing lessons alone is not the final product outcome.

This is the controlling product plan. The earlier [defender implementation specification](defender-pathway-implementation-plan.md) becomes the detailed SOC/incident response pathway specification. Its evidence, assessment integrity, review, and privacy requirements still apply; its one-path scope and estimate do not describe the whole career platform.

Partner research and proposed outreach are recorded separately in [partner research](career-partners-research.md). Public evidence of an organization's activities establishes a prospect, not willingness to work with Areté. No outreach or application has been sent.

The [target users and use cases](career-users-and-use-cases.md) define who the product serves and the actions to build. The [pilot proposal](career-pilot-proposal.md) gives a concrete initial collaboration to discuss with a local recruitment partner.

The [Linux lab delivery plan](linux-lab-delivery-plan.md), added 9 November 2026, specifies real browser-accessible Linux practicals: on-demand machines, gateway access, course templates, assessment evidence, isolation, quotas and cleanup. This is proposed infrastructure, not an existing feature; confirm its implementation budget after a small end-to-end prototype.

## 2. Which cybersecurity directions to offer

Present a broad career map with familiar blue, red and purple team labels alongside named professional specialties. Launch automatic placement with four fully built pathways: blue-team/SOC foundations, red-team/ethical testing foundations, GRC, and application security. Introduce further specializations only when their practical tasks, reviewers, and career support exist. A placement result must never send someone into an empty course. Until those four pathways exist, the quiz ships as a **career explorer** over existing content with no automatic enrollment (Phase 0 in §8), so it reaches learners and produces data before the full build.

### Career map: teams and specialties

| Direction | Work to explore | Example assessed evidence | Release / progression |
|---|---|---|---|
| **Blue team — defence** | Security monitoring, alert triage, incident response, detection and threat hunting | Investigate an incident, justify containment, verify recovery | Initial SOC/incident response pathway; deeper defence units follow |
| **Red team — authorized offensive security** | Ethical hacking, penetration testing, vulnerability assessment; later adversary simulation | Scoped lab assessment with reproducible evidence, impact, remediation and retest | Initial ethical testing foundations pathway; advanced red-team operations require further preparation |
| **Purple team — attack/defence collaboration** | Reproduce authorized attack behavior, inspect defensive visibility, improve and retest detection | Paired simulation/detection report with before/after evidence | Progression after assessed offensive and defensive prerequisites, or equivalent reviewed evidence |
| **GRC and privacy** | Risk, governance, control assessment, audit support and privacy operations | Evidence-backed risk/control assessment and treatment plan | Initial GRC pathway; privacy specialization later |
| **Application security / DevSecOps** | Secure design, code review, application testing and security in delivery pipelines | Corrected application weakness and regression evidence | Initial AppSec pathway; pipeline specialization later |
| **Cloud and network security** | Network controls, cloud configuration, segmentation and secure operations | Configuration review, bounded remediation and verification | Later complete pathway; show prerequisites and publication status |
| **Digital forensics and incident investigation** | Evidence preservation, artifact analysis and defensible reconstruction | Evidence register, timeline and investigation report | Later specialization building on evidence-handling foundations |
| **Identity and access security** | Account lifecycle, permissions, authentication and access reviews | Access design/review plus verified correction of an excessive permission | Later complete pathway |
| **Threat intelligence and malware analysis** | Evaluate threat information, analyze controlled artifacts, support defence | Source-evaluated intelligence brief or isolated artifact-analysis report | Later specialization; malware work needs additional lab controls and reviewer expertise |
| **Security architecture and leadership** | Design controls, evaluate trade-offs, guide programs and teams | Reviewed architecture or improvement plan with justified decisions | Longer-term progression requiring broader experience, not a beginner quiz placement |

These labels are navigation aids and can overlap: a cloud specialist can do defensive work, and a developer can work with both offensive and defensive teams. Store the chosen pathway and its actual assessed skills, not a permanent “personality color.” Map underlying work to a pinned NICE version; do not present colors as NICE's official categories.

Microsoft describes [red/blue collaboration and purple-team exercises](https://learn.microsoft.com/en-us/compliance/assurance/assurance-sim-preparation). This supports including purple collaboration, while the staged prerequisites above are Areté's instructional design decision.

### What “grey,” “white hat,” and testing colors mean

- **Grey-box testing** is a method in which the tester has partial internal knowledge or access. Include an explicitly authorized grey-box lab in the red/AppSec material. White-box and black-box describe other levels of test knowledge; they do not determine permission. See [Check Point's grey-box explanation](https://www.checkpoint.com/cyber-hub/cyber-security/what-is-gray-box-testing/).
- **Grey-hat hacking** is a behavior label often associated with activity without the owner's explicit permission, even when the person claims a helpful intention. Teach the distinction and disclosure judgment; do not score “grey hat” as a career destination. A learner attracted to finding weaknesses should see authorized security research and ethical testing options. See [Kaspersky's hat terminology](https://usa.kaspersky.com/resource-center/definitions/hacker-hat-types).
- **White hat / ethical hacking** describes authorized security work, not a separate team-color pathway. **Black hat** is discussed as adversary behavior, not an employment pathway offered by Areté.
- If a learner searches for “grey,” show both meanings and let them open the explanation. Do not silently interpret that word as purple team, a test method, or a fixed career preference.

| Initial pathway | Career direction to investigate with employers | Practical work | Final assessed output |
|---|---|---|---|
| Blue team: security operations and incident response | SOC trainee, junior security analyst, security operations internship | Email triage, authentication investigation, timeline, simulated containment, verification, escalation | Evidence-backed incident investigation and handover |
| Red team: ethical testing foundations | Supervised penetration-testing/vulnerability-assessment trainee; later red-team progression | Read scope and rules of engagement; examine a fictional asset pack; validate a seeded lab weakness; separate findings from false positives; report and retest | Scoped authorized assessment with reproducible findings and remediation verification |
| Governance, risk, and compliance (GRC) | GRC trainee, risk/compliance assistant, IT audit internship | Scope a fictional business; interview notes; asset/risk register; compare supplied controls with evidence; prioritize improvement | Risk assessment, control evidence register, treatment plan, and short management briefing |
| Application security foundations | Security-minded developer, application security internship, supervised vulnerability assessment trainee | Read a small application; examine authentication/access controls; investigate a seeded weakness in an isolated exercise; propose a fix and verify it | Reproducible finding, justified impact, remediation, and regression evidence |

These are target directions to validate through current role specifications and employer conversations. Course completion is not equivalent to a job title or authorization to test systems.

Future directions include purple collaboration, cloud/network security, digital forensics, identity/access management, threat intelligence/malware analysis, privacy, and architecture. The career explorer describes their work and prerequisites, but the live quiz ranks only complete, published entry pathways. A strong red-and-blue interest can produce a purple-team progression goal with a suitable entry path; it cannot bypass prerequisite assessments. If a learner prefers an unavailable specialization, explain the limitation and offer a chosen preparatory route or notification request; do not silently substitute a different career.

Use selected [NICE Framework work roles and Task, Knowledge, and Skill statements](https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions) to organize outcomes, then compare them with real employer requirements. NICE describes work; our job labels, quiz weights, and career services are design proposals, not NIST endorsements.

## 3. Placement quiz: what it does

The quiz recommends a starting direction and identifies preparation needs. It does not certify ability, predict employment, or permanently decide what a person can become. Keep interests, observed judgment, and foundations readiness visible as separate signals.

### Learner flow

1. Public visitor selects **Find my cybersecurity path**, sees the broader career map and the four initial entry pathways, and sees expected quiz effort of about 12–18 minutes to validate in testing.
2. They complete 30 short questions: twelve interest items, twelve practical judgment items, and six foundations items. “Not sure yet” is available where knowledge is tested. The quiz explains team-color labels rather than testing familiarity with their names.
3. Collect four context answers separately: career goal, current experience, weekly study time, and device/access needs. Context adjusts schedule and support, not suitability scores.
4. The server calculates an explained recommendation. The result shows the strongest starting match, a second option, observed strengths, uncertain areas, and the first practical task. Avoid unvalidated labels such as “92% suited to cybersecurity.”
5. After sign-in, automatically create their enrollment and personal roadmap for the recommended published path. Show **Your recommended path is ready — start your first task**, alongside **Choose another path**. A new learner should not have to search the catalogue to act on the result.
6. When results are tied or evidence is weak, show a provisional placement with short tasters of the closest options. Let the learner confirm or change it; do not present a weak recommendation as a firm conclusion.
7. Resume the selected pathway from home on later visits. Keep university course access available to existing students.

A signed-out result can be carried through a short-lived opaque server session token; do not put raw answers in URL parameters. Recompute/validate on account attachment. Do not use the quiz as a hiring filter or withhold learning based on demographic characteristics.

### Initial scoring rule

Use a small, deterministic, versioned rules engine first. An AI response must not be the placement authority.

- Each pathway has three interest items scored 0–4. Normalize their sum to 0–100 as `I`.
- Each pathway has three judgment items. Every option carries credit: 2 for the best supported answer, 1 for a defensible but incomplete one, 0 for a mistake. Sum out of 6 and normalize to 0–100 as `J`. “Not sure yet” records uncertainty and scores 0, without a negative penalty. Partial credit is there for ranking stability: with three right/wrong items a single answer moved `R` by 11.7 points — more than the 10-point close-match band below — so one question could reorder the paths. With 0/1/2 credit one step moves `R` by about 5.8 points.
- Calculate a provisional recommendation score `R = 0.65 × I + 0.35 × J` for each published path. Rank paths by `R`; store the component scores and rule version.
- Calculate a separate foundations score `B` from the six foundations items. With fewer than four correct, place a short foundations bridge before the selected path. With four or more, recommend only the missed topics. No foundations score skips final practical assessment.
- Scores within 10 points of the highest are a close match. Show both, use the learner's stated preference to select the provisional enrollment, and offer tasters. If a true tie remains, ask which taster to try first before committing an enrollment; do not hide an arbitrary database-order choice.
- If every interest response is neutral (2), or all `R` scores are below 35, use a discovery route of four short tasters and the foundations bridge rather than asserting suitability. After tasters, the learner selects a provisional pathway and proceeds.
- When blue and red are both within 10 points of the highest result, explain that purple collaboration is a possible later goal. Enroll in the selected complete entry pathway and show the complementary prerequisite next; do not claim an unvalidated combined purple score.
- Allow pathway changes and retakes. Preserve completed common learning and the historical recommendation; do not overwrite assessed results. A learner-selected path does not become an algorithmic recommendation in reporting.

Weights, thresholds, and item counts are hypotheses. Test them with novice learners and practitioners; review recommendations after the first two cases and after actual performance. Do not call the instrument psychometrically validated without independent validation evidence.

### Example result and automatic next step

A learner's blue/SOC interest items sum to 10/12 and judgment credit is 4/6, giving `R = 77.5`. GRC interest is 9/12 and judgment 2/6, giving about `60.4`. AppSec interest is 6/12 and judgment 2/6, giving about `44.2`. Red-team interest is 5/12 and judgment 2/6, giving about `38.8`. With only three foundations answers correct, the system enrolls the learner in the blue/SOC pathway with a foundations bridge first. Those scores are internal recommendation signals, not percentages of career suitability.

The learner sees: “We recommend security operations as a starting direction because you showed interest in investigating activity and selected evidence-based investigation steps. Start with a short foundations bridge, then investigate a suspicious account. GRC is another direction you can explore. You can change your path.” Their home now shows the bridge as the next task and retains the SOC goal; completing a bridge does not send them back to choose a course manually.

### Draft question bank

Interest items use: 0 strongly disagree, 1 disagree, 2 neutral, 3 agree, 4 strongly agree. They have no separate “not sure yet” option — neutral is the midpoint and scores 2 like any other answer. “Not sure yet” exists only on judgment and foundations items, where it scores 0. Make wording equally positive across pathways so one is not presented as more prestigious or easier.

| ID | Interest statement | Path |
|---|---|---|
| I1 | I would enjoy comparing activity records to understand why an account behaved unexpectedly. | SOC |
| I2 | I would enjoy deciding which security alert needs attention first and explaining why. | SOC |
| I3 | I would enjoy reconstructing what happened and handing clear findings to a response team. | SOC |
| I4 | I would enjoy interviewing a business team to understand its security risks. | GRC |
| I5 | I would enjoy comparing a security policy with evidence of what people actually do. | GRC |
| I6 | I would enjoy helping a manager prioritize security improvements with limited resources. | GRC |
| I7 | I would enjoy understanding how an application's behavior could expose information. | AppSec |
| I8 | I would enjoy comparing vulnerable and corrected code to understand a security fix. | AppSec |
| I9 | I would enjoy writing a reproducible technical finding that helps a developer fix a problem. | AppSec |
| I10 | I would enjoy planning an authorized test to find weaknesses within an agreed scope. | Red |
| I11 | I would enjoy checking whether a suspected weakness can be reproduced and ruling out false positives. | Red |
| I12 | I would enjoy explaining a finding to the system owner and checking whether the correction worked. | Red |

Judgment items offer three options plus “not sure yet”, each option carrying the credit shown (2 best supported / 1 defensible but incomplete / 0 mistake). Foundations items are right or wrong. These are the draft authoring key; production keys and scoring run on the server once placement creates enrollments. Every distractor is a mistake a real beginner makes rather than an absurd option: absurd distractors (“delete all logs”, “buy the most expensive product”) let anyone with common sense score full marks, so `J` measured nothing and placement collapsed onto the interest items. Before release, review wording, accessibility and ambiguity, vary the position of the best answer, and balance option length so the best answer is not reliably the longest.

| ID | Scenario and options | Credit |
|---|---|---|
| J1 SOC | One account shows 20 failed sign-ins in five minutes, then nothing. What is supported? A: likely password guessing — check whether any attempt succeeded and where they came from; B: the account is compromised — reset the password and close the alert; C: the user forgot their password, so no action is needed | A 2 · B 1 · C 0 |
| J2 SOC | An account signs in successfully from an IP address never seen for that user. What do you compare first? A: whether the IP is on a public blocklist; B: the user's usual devices, locations and sessions, and whether the access was expected (travel, VPN); C: whether the password meets the complexity policy | A 1 · B 2 · C 0 |
| J3 SOC | You revoke a suspicious session. How do you confirm containment worked? A: the admin console reported the revoke as successful; B: fresh logs show the session token now rejected and no new session for the account; C: ask the user whether they still notice anything unusual | A 1 · B 2 · C 0 |
| J4 GRC | Policy requires quarterly access reviews. Best evidence it is happening? A: the approved policy, signed by the security lead; B: a dated record of the last review, who did it, which access was removed, and follow-up; C: a manager's email confirming reviews happen every quarter | A 0 · B 2 · C 1 |
| J5 GRC | The budget covers only some identified risks. What next? A: fix the cheapest risks first so the most items are closed; B: fund what last year's auditor flagged, then the rest by cost; C: rank by likelihood and impact, treat the highest within budget, and record owners and acceptance for the rest | A 0 · B 1 · C 2 |
| J6 GRC | A control is listed as in place, but no evidence of it can be found. How should the register record it? A: compliant, because the control owner says it is in place; B: non-compliant, raised as a failed control; C: evidence gap — not yet verified, with an owner and a date to obtain evidence or test it | A 0 · B 1 · C 2 |
| J7 AppSec | Changing the ID in a URL shows another user's invoice. Best fix? A: replace sequential IDs with random ones; B: check on the server that the requested invoice belongs to the signed-in user; C: hide other users' invoice links in the interface | A 1 · B 2 · C 0 |
| J8 AppSec | User input is concatenated into a SQL query. Best correction? A: use parameterized queries; B: escape quote characters before building the query; C: limit input length in the browser | A 2 · B 1 · C 0 |
| J9 AppSec | A developer says an access-control bug is fixed. Best verification? A: rerun the automated vulnerability scanner; B: read the diff to confirm the check was added; C: retest with two accounts — the owner still gets access, the other account is refused | A 0 · B 1 · C 2 |
| J10 Red | During an authorized test you find a reachable server that is not in the written scope. Next step? A: run a light, non-intrusive scan to see whether it is worth raising; B: leave it alone and say nothing, since it is out of scope; C: do not test it, and ask the client whether it should be added to scope | A 0 · B 1 · C 2 |
| J11 Red | A scanner reports a critical weakness on an in-scope lab host. What makes it a reportable finding? A: the scanner's critical rating and CVE reference; B: confirming the installed version matches the vulnerable one; C: confirming the condition manually within scope and recording evidence of its actual impact | A 0 · B 1 · C 2 |
| J12 Red | The owner asks whether a fix worked. Best answer? A: repeat the original test within scope and report the result and its limits; B: confirm the patched version is installed; C: close the finding because the recommended fix was applied | A 2 · B 1 · C 0 |
| B1 | Which is a confidentiality failure? A: an outsider reads payroll records; B: the payroll server goes offline on pay day; C: a salary figure is changed without approval | A |
| B2 | Which gives an account the strongest protection? A: a long password reused across sites; B: a unique password plus app-based or hardware MFA; C: a complex password changed every 30 days | B |
| B3 | What does an IP address in a log identify most directly? A: the person who performed the action; B: the network address the request came from, which may be shared, a VPN or a proxy; C: the device's physical location | B |
| B4 | What is 10:00 at UTC+1 in UTC? A: 11:00; B: 09:00; C: 10:00 | B |
| B5 | What does an HTTP 403 response generally mean? A: the server understood the request but refuses access; B: the page does not exist; C: the server crashed | A |
| B6 | Before testing a live organization's system, what is needed? A: confirmation that the system is publicly reachable; B: approval from a staff member who uses the system; C: explicit written authorization from the owner and an agreed scope | C |

Do not expose a pre-read copy of the production knowledge items as a meaningful readiness test. Publish illustrative sample questions, maintain equivalent versions, and remember that a low-stakes placement quiz is easily coached. Its job is guidance; verified practical assessment remains separate.

## 4. Career pathway content and progression

All pathways share a short bridge on safe scope, systems/accounts, evidence, basic networking/HTTP, risk, and clear communication. Learners then follow their selected direction. Each milestone records observable work, feedback, revision, and remaining gaps.

The 10–14 hour defender investigation in the detailed specification is an introductory assessed unit, not a complete occupational qualification. Before describing a whole pathway as preparation for a particular role, validate the wider required skills with practitioners, add the missing practice, and publish the actual depth and expected effort. Career review may recommend further IT, programming, communication or role-specific preparation before applications. The purpose is sustained movement toward a career, with a useful next action after every unit.

| Milestone | SOC / incident response | GRC | Application security |
|---|---|---|---|
| 1 | Triage a suspicious message | Establish business scope and assets | Understand a small application's data and trust boundaries |
| 2 | Investigate account access | Build and prioritize a risk register | Check authentication and object-level authorization in an isolated fixture |
| 3 | Correlate an evidence timeline | Assess supplied control evidence and gaps | Reproduce a seeded issue within the lab's scope |
| 4 | Contain and verify in a simulator | Propose treatments, owners, and verification | Propose/apply a constrained fix and verify positive/negative cases |
| 5 | Unseen incident capstone | Unseen business/risk capstone | Unseen application finding/remediation capstone |
| 6 | Portfolio explanation and analyst interview | Portfolio explanation and risk briefing | Portfolio explanation and developer handover |

The red-team entry pathway adds six milestones: (1) scope and rules of engagement; (2) reason from a supplied fictional asset/service pack; (3) validate a seeded weakness in an authorized isolated lab; (4) distinguish supported impact, false positives and limitations, then report remediation and retest; (5) complete an unseen scoped assessment; (6) explain the work and next preparation needs to a reviewer. Supply two unseen variants, realistic benign artifacts, staged practice feedback, and an independent practitioner review. Pentest foundations are an entry unit; advanced adversary simulation is a later progression, not an outcome of a brief beginner course.

Red and AppSec can share foundations and fixtures, but assess different emphasis: red focuses on scoped assessment, validation and reporting; AppSec focuses on design/code remediation and regression. Reuse an assessed skill only when its outcome and required evidence genuinely match.

A later purple unit pairs a permitted lab action with detection evidence: record the expected signal, run the controlled action, inspect available logs, explain a detection gap, improve a constrained detection rule, and retest for both detection and a benign false positive. Its final output includes action evidence, rule/version, before/after observations, limitations and a joint handover. Require passed relevant blue and red units or independently reviewed equivalent work before enrollment.

For GRC, use a fictional business pack: organization chart, assets, interview notes, policies, access-review records, backup checks, and conflicting evidence. Supply the fictional control requirements being assessed. Assess evidence and reasoning; do not imply the exercise grants a real legal compliance certification.

For AppSec, ship only an inert code/data fixture or an isolated lab with no production data or unrestricted outbound access. An interactive vulnerable service requires a separate environment security gate. Use fixed defensive controls and safe test harnesses where possible; do not direct learners to test third-party sites.

Apply the same isolation gate to red/purple labs. A simulated action harness can teach initial reasoning, but label it as simulated and assess only what it demonstrates. Claims of live validation require a functioning isolated target, scoped access, reset/cleanup, resource limits, reviewed telemetry and reproducible retests.

Every pathway requires two unseen capstone variants, an author/reviewer, a private interpretation pack, anchored rubric examples, a retry policy, accessible artifacts, and a useful portfolio export. Use server-authoritative attempts and human review as specified in the defender plan.

### Pathway-specific scoring

Each rubric uses levels 0–4, weighted as `weight × level / 4`, with a total out of 100. Pass requires at least 70 and level 3 in every critical criterion. Each criterion needs examples at every level before publication. Assess work quality, not citation volume or polished wording alone.

| GRC criterion | Weight | Critical? |
|---|---:|---|
| Business scope and asset/context accuracy | 15 | No |
| Risk identification and justified prioritization | 25 | Yes |
| Control evidence evaluation and uncertainty | 25 | Yes |
| Feasible treatment, accountable owner, and verification | 20 | Yes |
| Management briefing and traceable handover | 15 | No |

| AppSec criterion | Weight | Critical? |
|---|---:|---|
| Scope, authorization, and safe method | 15 | Yes |
| Reproducible finding grounded in the fixture | 25 | Yes |
| Justified impact and limitations | 15 | No |
| Correct remediation and regression verification | 30 | Yes |
| Clear developer handover | 15 | No |

| Red-team foundations criterion | Weight | Critical? |
|---|---:|---|
| Scope, authorization and controlled method | 20 | Yes |
| Supported reproducible findings and false-positive handling | 25 | Yes |
| Impact, prioritization and evidence limitations | 15 | No |
| Remediation guidance and retest evidence | 25 | Yes |
| Clear owner-facing report and handover | 15 | No |

The SOC rubric remains in the defender specification. Purple and other future pathways need their own reviewed outcome/rubric contracts before publication. Final practical passes, portfolio review, and opportunity eligibility are distinct records; no quiz or lesson checkbox can create them.

## 5. From assessed work to career action

After capstone review, show **Your next career step**. A named career reviewer checks the learner's ability to explain the work, identifies remaining skill gaps, and agrees a realistic target role. Offer:

- Two or three concise portfolio artifacts with task version, rubric, assessment date, reviewer, and limitations. Keep public work separate from unpublished capstone answer keys; prepare a shareable summary or released showcase task.
- CV/profile feedback using the actual demonstrated skills, with no invented employment experience or certifications.
- One role-specific mock interview or written equivalent, with feedback and a revision step.
- A learner-controlled talent profile: preferred roles, availability, location/remote constraints, portfolio summaries, assessment evidence, and explicit sharing permission.
- A short opportunity list filtered by role, prerequisites, location, availability, and current status, plus direct application/referral instructions.
- Follow-up at 30, 60, and 90 days: applications, interviews, offers, work started, and further skill gaps. Participation and reporting are voluntary.

Use precise statuses: **exploring**, **building foundations**, **practising**, **capstone passed**, **portfolio reviewed**, **application support active**, and **opportunity outcome recorded**. Do not infer “job ready” from a quiz. Referral eligibility requires a passed relevant capstone, reviewed portfolio, the specific opportunity's requirements, current availability, and sharing consent. Employers still make hiring decisions.

With no relevant opening, say so and provide a dated action plan, further practice, and the next review date. Do not replace missing opportunities with a generic graduation screen or fabricate vacancies. Areté should measure movement toward work, while making no guaranteed-job promise.

## 6. Partner delivery model

Seek different partners for different commitments:

| Partner type | First concrete ask | What Areté supplies |
|---|---|---|
| University/community | Invite an opt-in cohort and host a career orientation | Quiz/demo, capped cohort, learner support, aggregate outcomes |
| Practitioner/reviewer | Review one rubric and mark a capped number of submissions | Clear criteria, sample work, agreed time and compensation |
| Employer | Validate one role brief; review three anonymized portfolios; consider a supervised project or interview when a real role exists | Relevant assessed evidence and consented introductions |
| Training/certification provider | Clarify approved content/referral/academy terms | Honest audience figures, content quality, instructor plan, compliance with program terms |
| Sponsor | Fund a specified number of review/learning places and access support | Itemized delivery budget and aggregate impact report |

The detailed prospect list, official contact routes, limitations, outreach templates, and 30-day acquisition process live in [partner research](career-partners-research.md). No partner logo, guaranteed interview, official training claim, or certificate recognition may be implied before written agreement supports it.

Start discussions while building; do not sell introductions as a delivered product. Keep a separate status for research, contacted, discovery, scoped pilot, signed commitment, delivered commitment, and renewed partnership. Names in a spreadsheet are not active partners.

## 7. Product implementation

### Routes and integration

- `/career-quiz`: accessible quiz, draft recovery, sign-in attachment, and server-scored submission.
- `/career-match/:id`: explained recommendation, close matches, preparation plan, and pathway switch.
- `/pathways/:slug`: chosen career goal, milestone work, feedback, capstone, and next career action.
- `/career`: portfolio, career review, target roles, opportunity actions, and follow-up.
- `/opportunities/:id`: verified opportunity details, last checked date, eligibility, sharing/application action, and expiry.
- Restricted reviewer/operations views: placement question versions, assigned reviews, partner commitments, opportunities, consented referrals, and queue capacity.

Update the public cybersecurity page, sign-in return handling, welcome page, and independent home. The current fixed entry into `/tracks/security` becomes a quiz/resume decision for career learners. Keep existing university learning mode and authorization roles distinct from career preferences. Extend `src/utils/learningEntry.js` and related tests so OAuth/magic-link return cannot lose the selected career flow.

### New records and authority

Add versioned `career_paths`, `placement_question_versions`, `placement_attempts`, `placement_recommendations`, `pathway_enrollments`, and `career_roadmaps`. Record question/rule version, answers, component scores, explanation codes, server timestamps, recommended versus chosen path, and enrollment change reason. Persist the personal roadmap; do not depend on local storage as its authority.

Give every pathway a stable ID, display label, work-family tags, entry/progression level, prerequisites, publication state, task/rubric versions and reviewer capacity. A blue/red/purple tag is descriptive metadata, not authorization. Version every quiz release; when items, credit or weights change, keep earlier attempts under their original rule version and invite a retake rather than rescoring them. Never invent a pathway score for an attempt that contained no items for that pathway. Search aliases for grey/gray must lead to the terminology explanation, not create a grey-hat enrollment.

Add `portfolio_reviews`, `career_reviews`, `talent_profiles`, `sharing_consents`, `partner_prospects`, `partner_commitments`, `opportunities`, `referrals`, and `career_outcomes`. Keep public opportunity information separate from private learner profiles and internal partner notes. Do not add a public directory of learner emails.

Reuse the assessment records specified in the defender plan across all paths. Model enrollment changes as history, reuse common completed milestones, and preserve original task/rubric versions on every assessment.

Server operations must: score placement from published versions; explain and create enrollment atomically; reject fabricated answers/versions; resolve duplicate submissions idempotently; enforce ownership and reviewer assignment; check opportunity eligibility and current consent at referral time; audit disclosures; and expire opportunities. A user may change their chosen path, but cannot forge a passing capstone or staff review.

### Privacy and reliability

Private quiz answers and career records need explicit owner/staff policies and account export/deletion coverage. Publish retention and consent rules before enrollment. Employer sharing is optional, specific to recipient and purpose, and auditable. Revocation stops new access/referrals; explain that it cannot recall a copy already legitimately disclosed. A sponsor receives aggregate results unless individuals separately agree to share.

Do not use sensitive traits to rank career paths or automatically exclude candidates. Accessibility/device constraints adjust support. Do not send private learner work or career profiles to a model by default. No partner or employer sees other cohorts' records through existing academic admin tools.

Use account-scoped state, controlled service-worker caching, immutable final submissions, server deadlines, bounded APIs, and tested database policies. A placement service failure should retain a recoverable draft and offer manual pathway exploration; it must not invent a score.

## 8. Execution plan and dependencies

The first release in this plan is a functioning four-path career product with the broader career map. The earlier 5–7 week estimate covered one defender pathway, and 12–18 weeks covered the previous three-path proposal. With red foundations and reviewed lab delivery added, budget **approximately 16–22 weeks of implementation and content work followed by a two-week capped pilot** (Phase 0 below ships earlier and is not part of that estimate), with one engineer, a parallel content lead, independent practitioners for all four tracks, and part-time QA/career/partner operations. Purple and other full specializations require later estimates. Confirm these rough estimates after the first end-to-end slice, lab design and reviewer recruitment.

| Phase | Deliverable | Exit evidence |
|---|---|---|
| 0. Career explorer on existing content | The 30-item quiz and explained result, scored with the published rules but **with no automatic enrollment**. Each result links to material that exists today: shared foundations → security rooms 1–4; blue/SOC → rooms 9–12 (Linux output, forensics, phishing, firewall rules); red → rooms 5–8 (passwords, ports, HTTP, SQL injection); AppSec → rooms 7–8 plus the Python and Java tracks; GRC → its career-map entry and a notify-me request, since no GRC practice exists yet. The result says plainly that full pathways are in development | Real learners complete the quiz; explanation comprehension and recommended-versus-chosen data collected to calibrate Phase 1 weights; a partner session can use it |
| 1. Career validation and content contracts | Interview at least five learners and four practitioners/employers covering the initial paths; agree target roles, four pathway outcomes, placement rules, and portfolio requirements | Reviewed role/outcome matrix; named reviewers; prototype quiz tested for comprehension |
| 2. End-to-end SOC slice | Quiz prototype → persisted placement → SOC practice → unseen assessment → review → portfolio → one career action | An invited tester finishes the whole flow; integrity/access checks pass; this is a private slice, not the multi-path launch |
| 3. Multi-path content and placement | Complete red, GRC and AppSec practice/capstones; lab isolation gate; equivalent task versions; calibrated 30-item quiz; enrollment switching and bridge | All four entry recommendations lead to complete, independently solved pathways; progression prerequisites and publication states are enforced |
| 4. Career and partner operations | Staffed portfolio/interview review; partner CRM; verified opportunity records; sharing consent; referral/follow-up | Rehearsed career review and consented referral process; real opportunities only where confirmed |
| 5. Release verification | Browser, policy, scoring, content, isolation, accessibility, deletion, recovery and capacity checks | Complete evidence against release gates; feature flag and staffed cohort |
| 6. Pilot and improvement | Up to 15 learners — about 3–4 per pathway when actual preferences permit, matching the [pilot proposal](career-pilot-proposal.md) | Work samples, recommendation feedback, moderated assessments, career actions, costs, and a written expand/revise decision |

Phase 0 exists because the rule that placement never sends anyone into an empty course otherwise means nothing reaches a learner until Phase 3, months away. A recommendation that points at existing rooms without enrolling anyone does not break that rule, gives the scoring real data, and gives partner conversations something live to show. Estimate roughly 2–3 weeks for one engineer; confirm after scoping. Scoring may run in the browser here because the result grants nothing; it moves to the server when enrollment is attached in Phase 2.

Partner discovery runs alongside the phases. Start with local cohort access, two or more independent reviewers per track where practical, and one employer role-validation conversation per track. A signed hiring commitment is not assumed. If opportunities are not yet available, launch only the career support that is staffed and say what remains in development.

For 15 learners, reserve about 52 staff hours (roughly 3.5 per learner): 30 for marking, moderation and career review, 6 calibration, 8 coordination, 2 orientation and 6 learner support — itemized in the [pilot proposal](career-pilot-proposal.md). Measure actual use before setting a price or promising uncapped review. Slow invitations when staffing cannot meet published turnaround.

## 9. Release checks and evidence of success

Do not release automatic placement until every possible destination is published, complete, and supported. Verify all answer patterns, all-unknown answers, ties, missing questions, repeat submissions, unpublished paths, rule-version changes, account switches, and pathway changes. Ensure weekly availability and device type do not alter suitability scores.

Also verify that purple progression cannot bypass prerequisites, grey/gray aliases resolve to the explanation, prior quiz versions do not acquire fabricated scores, and red/AppSec tasks have clear separate outcomes. Test red lab scope, isolation, reset and evidence integrity before enrolling learners in live testing exercises.

Test the full quiz → sign-in → placement → practice → assessment → review → career flow with independent and university profiles. Direct API/database calls cannot write scores, reviewer roles, employer consent, private results, or eligibility. An employer cannot access anyone without current, scoped authorization. Run existing lint, module validation, build, tests and new browser/database checks.

Report the pilot with counts and denominators, including:

- Quiz completion, recommendation explanation comprehension, chosen-path overrides, and switches after actual tasters/practice.
- First meaningful task, milestone completion, capstone submission/pass by criterion, and useful revision after feedback.
- Portfolio reviews, mock interviews, relevant opportunities actually available, consented referrals, applications, interviews, offers, and work started.
- Time/cost per completed review and learner; queue age; platform failures; unresolved complaints.
- 30/60/90-day outcomes, distinguishing learner-reported from corroborated outcomes and reporting follow-up response rates.

Do not treat a referral as a job, an offer as work started, or a short supervised exercise as employment. Do not claim Areté caused hiring without evidence supporting that claim. Use pathway mismatch and employer feedback to update the quiz and curriculum, with versioned changes and human review.

## Definition of done

A learner can take the quiz, understand and enter a suitable published cybersecurity pathway, change direction when appropriate, produce reviewed evidence of skill, and receive a specific supported next step toward work. The team can demonstrate actual assessment quality, delivered partner commitments, and honest career outcomes rather than only lesson completion.
