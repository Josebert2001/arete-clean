# Areté — Problem Statement & Business Model (working draft)

_Last updated: 2026-07-18. This is a living document — every `[VALIDATE]` marker
is a number or claim that must be confirmed with real students/staff before it
goes into any pitch, grant application, or pricing page._

---

## 1. The problem, sharpened

### One-liner (pitch version)
> UNIUYO cybersecurity students fail courses they could pass — not for lack of
> ability, but because complete lecture materials, structured practice, and
> affordable help simply don't exist in one place. A single carryover costs a
> student **₦[VALIDATE] and an extra semester**. Areté removes that risk for
> less than the cost of one semester's photocopies.

### The five validation questions, answered
| Question | Answer |
|---|---|
| **Who suffers it?** | B.Sc. Cybersecurity students at UNIUYO today (≈[VALIDATE] students across 100L–400L); every tech-degree student in Nigerian public universities tomorrow. |
| **Does it frustrate them?** | Yes — founder is the user. Notes passed around as incomplete .docx files, no departmental resource center, foreign platforms priced in dollars, generic content that ignores what UNIUYO actually examines. |
| **How often?** | Daily during semester; peaks every exam period. Recurring, not episodic. |
| **How expensive?** | Direct: ₦[VALIDATE]/semester on photocopies, handouts, private tutorial fees. Catastrophic: a carryover = ₦[VALIDATE] extra fees + 6 months delay. Long-term: graduates who can't pass technical interviews. |
| **Will someone pay to remove it now?** | Students: small amounts, sometimes (validate with a real paywall, not a survey). Department/faculty: plausible site-license payer. Sponsors (banks, telcos, NGOs): pay for student reach. **This is the section the business model below exists to answer.** |

### Evidence gathered so far
- 24 signups, 14 active learners in first 2 weeks, single cohort (200L), zero marketing spend — organic, word-of-mouth growth.
- Cross-feature engagement: C track (12), Python (12), COS 222 materials (12), quizzes (7), Security CTF (6).

### Evidence still needed (do these before pitching again)
1. **Cost-of-problem survey** — ask 20+ coursemates: what did you spend last semester on photocopies/handouts/tutorials? Have you ever had a carryover, and what did it cost? One afternoon of work; gives every ₦ figure above.
2. **Willingness-to-pay probe** — not "would you pay?" but a real "Support Areté / go premium" button, even before premium exists, to count clicks.
3. **One institutional conversation** — HOD or course adviser: "would the department pay ₦X/session for every student to have this?" Even a soft yes is pitch gold.

---

## 2. Business model

### Model: freemium B2C now, institutional B2B next

**Why this order:** students are reachable today and prove willingness-to-pay;
institutions move slowly but pay 100× more per deal. The student traction *is*
the sales material for the institutional deal.

### Tier structure (draft)

| | Free | Premium (₦[500–1,000]/month or ₦[2,000–3,500]/semester [VALIDATE]) |
|---|---|---|
| Curriculum browser + course outlines | ✓ | ✓ |
| Lecture notes (full) | ✓ (keep free — this is the growth engine) | ✓ |
| Quizzes & cheatsheets | limited attempts | unlimited |
| AI Tutor | [N] messages/day | unlimited + personalization |
| Explain-this / Simplify-this | limited | unlimited |
| Code playground runs | limited | priority |
| Study planner + .ics export | basic | full |
| CTF security rooms | first [N] rooms | all 12 |

Principles:
- **Never paywall the notes.** Free notes are what make a coursemate share the
  link; premium monetizes the *tools around* the notes (AI, practice, planner).
- **Price in airtime terms.** The comparison is a recharge card, not Coursera.
  ₦500/month reads as "two bottles of drink," ₦14,000/year TryHackMe does not.
- **Semester pricing beats monthly** for students — one decision per semester,
  aligned with when they have money (school-fees season).

### Revenue streams, sequenced

1. **Now — Premium subscriptions (Paystack or Flutterwave).** Even 10 paying
   students at ₦500/month is the proof point every future room asks for.
2. **Next semester — Departmental site license.** Pitch: ₦[VALIDATE]/student/session,
   billed to the department or bundled into faculty dues. One deal ≈ hundreds of
   subscriptions. The free-tier usage data (now per-user, since sign-in is
   required) is the sales deck.
3. **Opportunistic — Sponsorship.** A bank or telco underwrites "free premium
   for UNIUYO students" in exchange for branded presence / account-opening
   funnel. This is exactly what Hackaholics judges understand; pursue via the
   contacts already made.
4. **Later — Per-department replication.** The mbio fork proves the model:
   same engine, new curriculum data. Each new department multiplies the
   institutional TAM without multiplying engineering cost.
5. **Long-term headline — Certification ("monetize outcomes").** Students pay
   for an Areté Certified credential; see §3. This is the *story* investors
   remember, but it only produces revenue once someone credible stands behind
   the certificate — which is why streams 1–3 fund the road there.

> **Narrative note:** the investor pitch (§4) leads with "learning is free, we
> monetize outcomes." That is the headline, not the whole model — when asked
> "when is your first revenue?", the answer is premium subscriptions and a
> departmental licensing pilot *this year*, certification as the compounding
> engine later. Never answer "everything is free until certification exists."

### Cost structure (current reality)
- Hosting (Vercel), DB/auth (Supabase), AI (Gemini free tier / Groq): ≈ ₦0 today.
- Scaling costs that revenue must absorb, in order: AI API usage, JDoodle
  (20 runs/day free is already a ceiling — a paid plan or self-hosted runner is
  the first real bill), Supabase Pro when auth/email limits bite.
- No salaries — student team. Runway is effectively infinite; the constraint is
  time, not burn. Say this in pitches — it's a strength.

### Key metrics to watch (all possible now that sign-in is required)
- Weekly active users (WAU) and week-2 retention — the numbers that matter more
  than signups.
- Per-feature usage per user (which features would people pay for?).
- Free → premium conversion rate, once the paywall exists.
- Cohort spread: when do 100L/300L/400L students appear? (Currently 200L only.)

---

## 3. Certification & partner strategy

**The core problem:** "Areté Certified" is worth exactly what the name behind it
is worth. A brand-new platform issuing its own certificate has zero currency
with employers. So the strategy is to *borrow* credibility first and build our
own later — three partner tiers, pursued in this order:

### Tier 1 — University endorsement (start now, costs nothing)
- Get the Department of Cybersecurity (HOD, then Faculty/Dean) to formally
  recognize Areté course completion — ideally a co-signed certificate of
  completion ("Dept. of Cybersecurity, UNIUYO × Areté").
- This is the cheapest credible signature available, the founder has insider
  access as a student, and the same conversation opens the site-license door.
- Ask small first: a letter of support or pilot endorsement, not a contract.

### Tier 2 — Established certification bodies (start now, 1–3 month cycles)
Rather than inventing a credential, become the local prep-and-delivery channel
for ones employers already trust:
- **Cisco Networking Academy** — free for institutions to join [VALIDATE
  current terms]; would let Areté offer recognized networking/cyber content.
- **CompTIA Academic Partner** and **EC-Council Academia** — discounted exam
  vouchers + official courseware for academic partners [VALIDATE terms/costs].
- **NITDA / 3MTT (3 Million Technical Talent)** — federal programmes actively
  looking for training partners and applied-learning clusters [VALIDATE current
  application windows].
- Revenue shape: premium exam-prep tracks + margin/commission on vouchers.
- Note: some programmes require an institutional affiliation — Tier 1 helps
  unlock Tier 2.

### Tier 3 — Employer recognition (6–12 months out)
- MOUs with Nigerian security firms, banks, and telcos: agree to interview or
  fast-track Areté-certified graduates. Even 2–3 named companies makes the
  certificate real — this is the "bridge between education and employment"
  claim in the pitch, made literal.
- Prerequisite before employers will trust it: assessment integrity (proctored
  or verifiable exams, anti-cheat) — real engineering work, budget for it.

**Sequencing rule:** start Tier 1 and Tier 2 conversations immediately
(partnership cycles are slow — months, not weeks — so early outreach costs
nothing and the pitch already promises certification). But these conversations
must not displace the near-term revenue work in §5: a partner asking "how many
active users do you have?" is answered by the same growth work either way.

---

## 4. Investor pitch script (v3 — 2026-07-18, current)

Supersedes v2. Folds in: honest traction (no 100%-retention claim), team line,
cost-of-problem line, the three-engine business model with the near-term
revenue answer built in, the certification-credibility roadmap (§3) so the
"Areté Certified" line survives scrutiny, and an explicit ask. Bracketed items
must be filled before this is delivered — the 7-day plan in §5 exists to fill
them.

> Good afternoon everyone.
>
> Imagine spending four years studying a course… graduating with a degree…
> and still not being able to solve a real problem in your own field.
>
> Unfortunately, that's the reality for thousands of university students in
> Nigeria. Their learning is fragmented — lecture notes scattered across
> WhatsApp groups, Google Drive folders, PDFs, and photocopies. Practical
> experience is limited, so students graduate knowing the theory but lacking
> the skills employers actually need. And it's expensive: a single carryover
> costs a student ₦[VALIDATE] in extra fees and six more months of their
> life. At the same time, organizations across Nigeria and around the world
> are struggling to find qualified talent.
>
> So we asked ourselves a simple question: what if every university student
> had one platform built around exactly what they learn in school — and could
> practice those skills every day?
>
> That's why we built Areté — which means Excellence, Engineered.
>
> We're a team of cybersecurity students at the University of Uyo who built
> the tool we needed ourselves. Areté is an AI-powered learning platform that
> maps directly to a student's university curriculum — everything they need
> in one place, instead of scattered across a dozen apps and websites.
>
> Our platform is live today, fully mapped to UNIUYO's B.Sc. Cybersecurity
> programme: structured course materials and lecture notes, interactive
> programming tracks in Java, Python, and C, Capture-the-Flag security
> challenges, and an AI tutor that answers questions from the student's own
> lecture notes — not generic internet responses. Everything runs in the
> browser, optimized for the Android phones most Nigerian students use, so
> practical learning is accessible to everyone.
>
> And we're not standing here with just an idea — we're in production. Since
> launching on July 3rd, 31 students have joined organically with zero
> marketing spend, and roughly half are active every single week — during the
> exam break, when studying new material is the last thing on anyone's mind.
> That tells us we're solving a real problem, not manufacturing demand.
>
> Now imagine the scale. Nigeria has over 200 universities, and the National
> Universities Commission standardizes curricula across them. Map a
> curriculum once, and it replicates across every university teaching that
> programme. Cybersecurity is only our starting point — our second
> department is already in development — and the same model serves
> Microbiology, Engineering, Accounting, Law, Medicine, virtually every
> discipline. Our vision is to become the operating system for university
> education in Nigeria, and then across Africa.
>
> Our business model is simple: learning stays free — we monetize outcomes,
> through three engines. First, universities license the platform to improve
> teaching and student outcomes; our own department is our first pilot
> conversation. Second, students pay for an Areté Certified credential — and
> we're deliberate about making that credential mean something: our roadmap
> starts with departmental endorsement and partnerships with globally
> recognized bodies like Cisco Networking Academy and CompTIA, so the
> certificate carries real weight with employers. Third, companies sponsor
> talent pipelines to identify and recruit the skilled graduates they can't
> find today. And while certification compounds over years, premium
> subscriptions launch this semester — first revenue this year, not someday.
>
> So why will Areté win? Because anyone can build another AI chatbot. Anyone
> can upload lecture notes. But mapping an entire university curriculum,
> integrating hands-on practice, and building a verified bridge between
> education and employment — that is hard to replicate, and it gets harder
> every semester: our curriculum coverage, practical content, and learning
> dataset compound with every department we add.
>
> Today we're raising [AMOUNT] to [map N more curricula, launch certification
> with named partners, and reach N students by DATE]. Your investment won't
> just build software — it will help millions of students graduate with
> confidence, practical skills, and real opportunities.
>
> Because a student's future should never be determined by how scattered
> their learning resources were. It should be determined by their talent. And
> at Areté, we're engineering excellence — one student, one department, one
> university at a time.
>
> Thank you.

**Standing review notes for any future delivery:**
- Never claim 100% retention or round activity up — traction numbers must
  match what Supabase shows on the day of the pitch.
- Tailor the ask to the room: investors → amount + milestones; university
  audience → pilot endorsement; competition → prize-specific use of funds.
- Keep the moat paragraph — it preempts the "it's just a chatbot wrapper"
  dismissal.

---

## 5. The 7-day plan (Sat 19 – Fri 25 July 2026)

One deliverable per day; each day feeds the next. If the campus is quiet for
the break, the HOD step becomes a formal email/WhatsApp request that books the
meeting for when staff return — the day is not skipped.

**Day 1 — Sat 19: Launch the cost-of-problem survey.**
Draft a 6-question form (Google Forms) and push it to class WhatsApp groups:
(1) What did you spend last semester on photocopies/handouts? (2) On private
tutorials/extra lessons? (3) Have you ever had a carryover — what did it cost
in fees and time? (4) Would you pay ₦500/semester for unlimited AI tutoring
and practice? (5) Which Areté feature helps you most? (6) What's missing?
Target 20+ responses. This one afternoon fills every ₦[VALIDATE] in this doc.

**Day 2 — Sun 20: Write the partner one-pager.**
One page: what Areté is, the traction numbers, screenshots, and the specific
ask (endorsement / partnership / pilot). This same document serves the HOD,
Cisco/CompTIA applications, and any sponsor. Also list the actual contacts:
HOD, course adviser, 2–3 friendly lecturers, and the Hackaholics contacts
(Tosin, Jude) for the sponsorship thread.

**Day 3 — Mon 21: Turn survey data into numbers.**
Compute the average semester spend and carryover cost; paste real ₦ figures
into §1, §4, and the pricing table in §2. Decide the premium price point from
answers to question 4.

**Day 4 — Tue 22: The department ask.**
Request the HOD meeting (or hold it, if bookable): two asks in one meeting —
a written endorsement/letter of support for Areté certificates (Tier 1, §3)
and interest in a departmental license pilot. Bring the one-pager and the live
app on a phone. Write down their exact words afterward.

**Day 5 — Wed 23: Tier-2 partner applications.**
Verify current terms and start at least one application: Cisco Networking
Academy, CompTIA Academic Partner, EC-Council Academia, NITDA/3MTT. These are
slow pipelines — the win today is *entering* them, not finishing.

**Day 6 — Thu 24: Money rails + measurement.**
Open a Paystack (or Flutterwave) starter account. Decide exactly which
features the premium tier gates (table in §2). Stand up basic analytics on the
authenticated user base — at minimum, a repeatable WAU query — so "how many
active users?" always has a same-day answer.

**Day 7 — Fri 25: Assemble pitch v3 final.**
Fill [AMOUNT] and the milestone blanks with the week's real numbers, rehearse
the pitch aloud twice with a timer (~3 min), and update this doc with
everything learned. Decide the next room to pitch in: investor, university
pilot, or sponsor.

---

## 6. Standing checklist

- [ ] Run the cost-of-problem survey (20+ students) → fill every ₦[VALIDATE].
- [ ] Decide premium price point and what's gated (draft table above).
- [ ] Set up a Paystack account (needs: registered business name or personal
      account to start; CAC registration can come later).
- [ ] Have the HOD/course-adviser conversation; write down their exact words.
      Now covers two asks: site-license interest AND certificate endorsement
      (Tier 1 in §3) — same meeting, ask small.
- [ ] Instrument basic analytics on the newly-authenticated user base.
- [ ] Research + apply: Cisco Networking Academy, CompTIA Academic Partner,
      EC-Council Academia, NITDA/3MTT partner programmes (Tier 2 in §3) —
      verify current terms before quoting them anywhere.
- [ ] Fill the [AMOUNT] and milestone blanks in the pitch script (§4) before
      the next delivery.
