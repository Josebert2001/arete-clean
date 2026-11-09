# Target users and practical use cases

Date: 8 November 2026. This covers both likely meanings of “list of uses”: who would use Areté and what they would use it for. It is a product/recruitment plan, not a database export or list of people who have already agreed to join.

Related: [career product plan](career-pathway-implementation-plan.md), [researched partners](career-partners-research.md), and [pilot proposal](career-pilot-proposal.md).

## 1. Users to recruit first

| Target user | Problem to solve | First useful experience | Recruitment channel to establish |
|---|---|---|---|
| Cybersecurity student unsure of specialization | “I study cyber but do not know which work suits me.” | Quiz, explained placement, and a first practical task | Approved university/student-community invitation |
| Computing student exploring security | “I know some computing but cannot connect it to a security direction.” | Compare blue, red, GRC and AppSec tasters, then enter a path | Computing department or local technology event |
| Student preparing for SIWES/internship | “I need work samples and a way to explain what I can do.” | Assessed portfolio unit and a preparation review | SIWES/career office collaboration if agreed |
| Independent beginner or career changer | “I need an achievable starting point and feedback.” | Foundations bridge, personal roadmap and revised practical work | Public opt-in page or partner career-discovery session |
| Junior developer | “I want to demonstrate secure application work.” | AppSec finding, remediation and regression evidence | Developer community or training partner event |
| Helpdesk/IT-support learner | “I want to explore security operations.” | Account-investigation taster and escalation handover | Approved IT community or employer development route |
| Business/audit learner | “I want a security path connected to risk and controls.” | GRC evidence review and management briefing | Audit/student/professional community invitation |
| Recent graduate seeking relevant work | “I need credible evidence, feedback and a concrete application plan.” | Portfolio review, interview practice and suitable opportunities | Career event and voluntary graduate/community signup |
| Learner attracted to ethical hacking or “grey” terminology | “I want to find weaknesses but need to understand the work and boundaries.” | Explain hats versus test methods; try authorized red-team foundations or a grey-box lab | Approved security community or career-discovery session |
| Learner interested in both attack and defence | “I want to test whether defensive controls actually detect an attack.” | Explore purple-team progression with explicit blue/red prerequisites | Practitioner-led workshop after foundational assessment |

Women in cybersecurity communities, low-connectivity learners, and learners needing accessibility support can belong to any of these groups. Improve access and recruit through agreed community channels; do not assume a person's background determines which career path they should follow.

For the first recruitment test, prioritize undecided students, internship-seeking students, and independent beginners. Invite up to 15 people after the relevant pathways and reviewer places are available. Use observed demand rather than forcing equal group or pathway allocations.

## 2. People and organizations delivering the service

| User | What they need to do | Value received |
|---|---|---|
| Practitioner mentor/reviewer | Review assigned cases, explain deductions, moderate results | Bounded contribution, agreed compensation/recognition, useful learner work |
| Career-support reviewer | Review portfolio/CV, run practice interview and agree next actions | Clear evidence and a manageable, scheduled learner queue |
| Employer hiring/training lead | Define supervised beginner tasks; review authorized portfolios; post real opportunities | Relevant evidence and consented candidate introductions |
| University/community coordinator | Invite voluntary learners, coordinate sessions and receive aggregate findings | Useful career preparation and evidence of participant benefit |
| Sponsor/program manager | Fund specified places/access support and review aggregate delivery | A measurable, costed contribution to skills and career access |
| Areté operations/content staff | Publish reviewed content, staff queues, verify opportunities and track outcomes | Reliable delivery, visible costs and honest performance data |

## 3. Buildable use cases and acceptance checks

| ID | Trigger and action | Successful outcome / acceptance check |
|---|---|---|
| UC01 Career discovery | A visitor starts the quiz, answers interests/judgment/foundations, and receives a result | Recommendation explains observed signals, gives alternatives and identifies preparation needs |
| UC02 Automatic placement | A visitor signs in after the quiz, or an existing user finishes it | Exactly one current enrollment and roadmap are created from the server-scored result; home opens the right next task |
| UC03 Uncertain match | Answers are unknown, low-evidence or tied | The learner receives tasters and an explained provisional choice; the system does not manufacture certainty |
| UC04 Change direction | A learner chooses another published path or retakes placement | New chosen path is recorded, shared completed work is retained, and assessment history is unchanged |
| UC05 Practical learning | A learner examines evidence, submits a checkpoint and revises after feedback | First and revised work are saved with useful feedback; the learner produces a cited output |
| UC06 Final assessment | An eligible learner completes an unseen task and submits | Immutable submission and simulator evidence are server-recorded; editing browser state cannot create a pass |
| UC07 Human assessment | An assigned practitioner scores the work and moderation resolves any required second review | Published criterion-level feedback explains the decision and offers a correction/reassessment route |
| UC08 Career review | A learner with assessed work requests portfolio and interview/CV support | A reviewer records strengths, remaining gaps, a realistic target role and dated next actions |
| UC09 Opportunity matching | A learner searches available opportunities or asks for application support | Listings are current, requirements are visible, and matching uses actual prerequisites; no match produces an honest next-action plan |
| UC10 Employer introduction | A learner chooses to share a portfolio for a specified opportunity | Recipient/purpose/fields are explicit, consent is current, and the disclosure/referral is recorded |
| UC11 Partner delivery | A coordinator or employer agrees a bounded contribution | Owners, costs, dates and deliverables are recorded; completion is measured as delivered work, not a logo |
| UC12 Career follow-up | A learner chooses to report application/interview/offer/work outcomes | Outcomes are dated, distinguished by type and evidence source, and accompanied by follow-up response rates |
| UC13 Access and recovery | A learner loses connection, switches account or needs an accessible text view | Saved work is recoverable; private work stays with its owner; keyboard/text workflows remain usable |
| UC14 Data control | A learner exports/deletes their data or withdraws further employer sharing | Authorized export/deletion is processed; future sharing stops; any existing disclosure limits are explained |
| UC15 Career terminology | A learner explores blue/red/purple teams or searches grey/gray | Work examples and actual role names are shown; grey-box and grey-hat are explained separately; hats do not determine enrollment |
| UC16 Purple progression | A learner with blue/red interests requests the collaboration pathway | Relevant prerequisite results or reviewed equivalents are checked; only a published supported pathway can enroll them |

## 4. Recruitment workflow and list fields

Use an approved event/community invitation that links to a clear opt-in form. Capture only the details needed for the pilot: name, preferred contact, location/timezone, career goal, relevant experience, weekly availability, access needs, recruitment source, consent date, and pilot status. Let users correct or withdraw their interest.

Keep the actual named learner list in an access-controlled database or approved operations tool. Suggested statuses are `interested`, `quiz_complete`, `invited`, `active`, `submitted`, `reviewed`, `career_support`, and `withdrawn`. A learner's enrollment consent is separate from marketing permission and employer-sharing permission.

Measure each route using counts: invitations/visits, opt-ins, quiz completions, first meaningful task, assessed submissions, career reviews and useful career actions. Someone appearing in a community membership list does not establish interest in Areté.

The first usable result from recruitment is a small group who complete real tasks and give feedback. Expand the audience only when available review/support places can serve them.
