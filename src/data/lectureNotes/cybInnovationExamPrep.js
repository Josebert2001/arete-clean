// CYB 222 (Cybersecurity Innovation and New Technologies) — written exam bank.
//
// Note on the name: this is the group-research/seminar CYB 222 (slug cyb-222).
// The catalogue also contains UUY-CYB 222 (Web and Mobile Applications
// Security), whose own written bank lives in cyb222ExamPrep.js — nothing in
// this file relates to that course.
//
// This course is examined on paper, not by CBT. The existing `quiz` bank on
// the course stays as low-stakes MCQ recall, but each group's research topic
// was written and presented as a seminar, and a paper exam on seminar
// material asks the student to reproduce and reason about it, not recognise
// it among four options. So every question here takes the form a written
// paper actually uses — "define", "list and explain", "differentiate
// between" — with a model answer plus a per-point mark scheme the student
// ticks off against what they actually wrote. A handful per group are
// scenario questions — "Scenario: ..." — that put the student in a situation
// drawn from (or modelled on) the group's own case studies and ask them to
// apply the concepts, not just recite them.
//
// Question types:
//   longform — question + marks + modelAnswer + markScheme[]
//   recall   — unaided list recall: items[] of { name, aliases[], explain },
//              rendered as blanks and fuzzy-matched, then each item's
//              `explain` revealed so the "and explain each" half is drilled.
//
// Mark values in each markScheme entry sum to the question's `marks`, and a
// recall drill scores one mark per item — scripts/validate-modules.mjs
// asserts both. Every question carries a `source` naming the group/topic it
// came from.
//
// Coverage: groups 0-9. Groups 10 (SASE) and 11 (XDR) are not examined, so
// they carry no written-exam questions here (the lecture notes and quiz still
// cover them).

export const cybInnovationExamPrep = [

  // ══════════════════════════════════════════════════════════════════
  //  Group 0 — AI & Machine Learning in Threat Detection
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: 'Explain why traditional signature-based detection is failing against modern cyber threats, and state how AI-based detection differs in approach.',
    modelAnswer: 'Signature-based systems only catch attacks whose pattern is already known. Zero-day attacks have no existing signature to match. Polymorphic malware constantly changes its own signature to evade matching. Credential abuse and insider threats look like legitimate activity, so there is no malicious signature to catch at all. Malicious traffic hidden inside encryption evades inspection entirely. AI-based detection differs by learning behaviour instead of matching signatures: it baselines what normal activity looks like for a user, device or network, then flags deviations from that baseline in real time — so it can catch attacks it has never seen before, not just ones it has a record of.',
    markScheme: [
      'Signature-based systems only catch previously known attacks (1)',
      'Zero-day attacks have no existing signature to match (1)',
      'Polymorphic malware constantly changes its signature (1)',
      'Credential abuse / insider threats look like legitimate activity (1)',
      'Encrypted malicious traffic evades signature inspection (1)',
      'AI-based detection defined — learns behaviour, baselines normal activity, and flags deviations in real time rather than matching known patterns (3)',
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: 'List the three machine learning technique families used in AI-based threat detection.',
    items: [
      { name: 'Supervised Learning', aliases: [], explain: 'Trained on labelled normal/malicious data — spam filtering, malware classification, IDS, fraud. Algorithms: Decision Trees, Random Forest, SVM, Logistic Regression, Naive Bayes.' },
      { name: 'Unsupervised Learning', aliases: [], explain: 'Finds hidden patterns in unlabelled data for anomaly detection and user-behaviour analytics. Techniques: K-Means, PCA, Autoencoders, density-based clustering.' },
      { name: 'Deep Learning', aliases: [], explain: 'Neural networks for large, complex datasets — malware detection, traffic classification, advanced IDS. Models: CNN, RNN, LSTM, Transformers.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: 'Differentiate between traditional and AI-based threat detection systems. List and explain any three points of contrast.',
    modelAnswer: 'Traditional systems are signature-based, detecting only known threats, and are mostly reactive — they respond after a match is found. AI-based systems are behaviour-based, detecting both known and unknown threats, and are predictive and proactive, spotting deviations before an attack fully executes. Traditional systems require manual analysis and scale poorly; AI-based systems are automated and highly scalable, and respond in real time rather than the slower response time of manual traditional analysis.',
    markScheme: [
      'Detection basis — signature-based vs behaviour-based (2)',
      'Threat coverage — known threats only vs known and unknown threats (2)',
      'Response nature — mostly reactive vs predictive and proactive (2)',
    ],
  },

  {
    type: 'recall',
    marks: 8,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: 'List the eight use cases where AI and ML are applied in threat detection.',
    items: [
      { name: 'Intrusion Detection Systems (IDS)', aliases: ['IDS'], explain: 'Anomaly-based detection of unseen attacks.' },
      { name: 'Malware detection', aliases: [], explain: 'Analyses behaviour, not just stored signatures.' },
      { name: 'Phishing detection', aliases: [], explain: 'NLP on email content, URLs, and sender behaviour.' },
      { name: 'Fraud detection', aliases: [], explain: 'Flags unusual transactions and login locations.' },
      { name: 'Threat intelligence & behavioural analysis', aliases: ['threat intelligence'], explain: 'Links attacks, surfaces emerging threats.' },
      { name: 'IoT security', aliases: [], explain: 'Monitors device behaviour for compromise.' },
      { name: 'Automated incident response', aliases: [], explain: 'Prioritises alerts, isolates compromised systems.' },
      { name: 'Predictive threat detection', aliases: [], explain: 'Forecasts attacks from historical and live data.' },
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: 'What is UEBA, and what role does it play in AI-based threat detection?',
    modelAnswer: 'UEBA (User & Entity Behaviour Analytics) baselines what normal login patterns, file access, network activity and typing patterns look like for a user or device, then flags deviations from that baseline as potential threats. It is one of the key tools — alongside EDR and SIEM — behind behavioural monitoring in AI-based detection.',
    markScheme: [
      'UEBA expanded and defined — baselines normal behaviour and flags deviations (3)',
      'Named alongside EDR/SIEM as part of the behavioural-monitoring toolkit (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: 'State and briefly explain three challenges or limitations of AI-based threat detection.',
    modelAnswer: "False positives and false negatives arise from poor or incomplete training data. Adversarial attacks use crafted inputs deliberately designed to mislead the model, an ongoing 'arms race' between attackers and defenders. High computational cost is also a real constraint, since deep learning models need GPUs and large infrastructure to run.",
    markScheme: [
      'Challenge 1 named and explained (2)',
      'Challenge 2 named and explained (2)',
      'Challenge 3 named and explained (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 0 — AI & Machine Learning in Threat Detection',
    question: "Scenario: A bank's AI fraud detection system flags a customer's transaction as suspicious because it deviates from their usual spending baseline — but the transaction is genuine, made while the customer is travelling abroad. What kind of error is this, and what does the notes' recommended approach to using AI say should happen next?",
    modelAnswer: "This is a false positive — the system deviating from a learned baseline and flagging legitimate activity as a threat, one of the known limitations of AI-based detection. The recommended approach is human–AI collaboration: AI assists analysts and flags the anomaly for review, but does not replace human judgement or act alone, so a human can quickly confirm the travel-related transaction is genuine rather than the account being blocked outright.",
    markScheme: [
      'Identifies this as a false positive (2)',
      'Explains human–AI collaboration — AI assists, does not replace, human review resolves it (4)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 1 — Zero Trust Architecture
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 5,
    source: 'Group 1 — Zero Trust Architecture',
    question: 'Define Zero Trust Architecture (ZTA).',
    modelAnswer: 'Zero Trust Architecture is a security paradigm built on the principle "Never Trust, Always Verify," coined by John Kindervag at Forrester Research in 2010. It eliminates implicit trust and enforces least-privilege access, continuously validating every user, device, and transaction — regardless of network location.',
    markScheme: [
      'Defined as a security paradigm built on "Never Trust, Always Verify" (2)',
      'Coined by John Kindervag at Forrester in 2010 (1)',
      'Eliminates implicit trust and enforces least-privilege access (1)',
      'Continuously validates every user, device and transaction regardless of network location (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 1 — Zero Trust Architecture',
    question: 'List the four core principles of Zero Trust Architecture.',
    items: [
      { name: 'Never Trust, Always Verify', aliases: [], explain: 'Every request is authenticated and continuously, contextually re-verified — not a one-time login.' },
      { name: 'Least Privilege Access', aliases: [], explain: 'Access is scoped, time-limited, and contextual, shrinking the blast radius of any compromise.' },
      { name: 'Assume Breach', aliases: [], explain: 'Design as if attackers are already inside: encrypt everything, segment, monitor, and plan recovery.' },
      { name: 'Micro-Segmentation', aliases: [], explain: 'Divide the network into isolated segments — down to individual workloads — to contain lateral movement.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 1 — Zero Trust Architecture',
    question: 'Differentiate between traditional perimeter security and Zero Trust Architecture. List and explain any four points of contrast.',
    modelAnswer: 'Traditional security assumes implicit trust for internal users, whereas Zero Trust verifies every request with no implicit trust. Traditional security relies on a defined network boundary (firewall, VPN); Zero Trust has no perimeter — the boundary is identity-based instead. Under traditional security a user logs in once and the session persists; under Zero Trust, authentication is continuous and contextual. Traditional security leaves lateral movement unrestricted once an attacker is inside; Zero Trust blocks it through micro-segmentation.',
    markScheme: [
      'Trust model — implicit trust for internal users vs no implicit trust, every request verified (2)',
      'Network boundary — defined perimeter (firewall/VPN) vs no perimeter, identity-based boundary (2)',
      'Authentication — login once with a persisting session vs continuous, contextual re-authentication (2)',
      'Lateral movement — unrestricted once inside vs blocked by micro-segmentation (2)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Group 1 — Zero Trust Architecture',
    question: 'List the six architectural components and technologies Zero Trust is assembled from.',
    items: [
      { name: 'Identity & Access Management (IAM)', aliases: ['IAM'], explain: 'Identity — not network location — is the primary security boundary; SSO, RBAC, ABAC, risk-based auth.' },
      { name: 'Multi-Factor Authentication (MFA)', aliases: ['MFA'], explain: 'Two or more factors (know / have / are); mandatory for sensitive access; adaptive to risk.' },
      { name: 'Zero Trust Network Access (ZTNA)', aliases: ['ZTNA'], explain: 'Replaces VPNs — grants access to specific resources, not the whole network.' },
      { name: 'Device Trust & EDR', aliases: ['EDR'], explain: 'Verifies device health and compliance before access; EDR/MDM monitor and can quarantine endpoints.' },
      { name: 'Data Security & Encryption', aliases: [], explain: 'Classify data; encrypt in transit (TLS/SSL) and at rest; DLP and attribute-based access control.' },
      { name: 'SIEM & UEBA', aliases: ['SIEM'], explain: 'Aggregate and correlate logs; ML baselines behaviour and flags anomalies — the monitoring backbone.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 1 — Zero Trust Architecture',
    question: 'Outline the three-phase NIST/CISA roadmap for implementing Zero Trust Architecture.',
    modelAnswer: 'Phase 1, Visualise, catalogues every user, device, app and data store and maps transaction flows. Phase 2, Mitigate, deploys MFA and SSO, begins micro-segmentation, replaces the VPN with ZTNA, and enables logging. Phase 3, Optimise, expands segmentation, automates with SOAR, adds data-centric security and threat intelligence, and red-teams the result.',
    markScheme: [
      'Phase 1 — Visualise: catalogue assets and map transaction flows (2)',
      'Phase 2 — Mitigate: MFA/SSO, micro-segmentation, ZTNA replacing VPN, logging (2)',
      'Phase 3 — Optimise: expand segmentation, SOAR automation, threat intel, red-team (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 1 — Zero Trust Architecture',
    question: 'State and briefly explain three challenges or limitations of Zero Trust Architecture.',
    modelAnswer: 'Complexity and cost — integrating IAM, MFA, EDR and SIEM, and segmenting legacy systems, is expensive. Cultural resistance and "authentication fatigue" build up from more frequent verification prompts. "Zero Trust washing" — superficial or partial implementations — creates false confidence without delivering the real protection.',
    markScheme: [
      'Challenge 1 named and explained (2)',
      'Challenge 2 named and explained (2)',
      'Challenge 3 named and explained (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 1 — Zero Trust Architecture',
    question: "Scenario: A company rolls out Zero Trust Network Access (ZTNA) for its remote workforce, but the whole IT team still shares one admin password that has not been changed in two years. Explain why this undermines the Zero Trust model despite the ZTNA deployment, referencing at least two core principles.",
    modelAnswer: 'A shared, unchanging admin password breaks least-privilege access, since it is not scoped, time-limited or contextual to any one person — anyone who ever learned it retains full access indefinitely. It also breaks "never trust, always verify," which requires every request to be authenticated and continuously, contextually re-verified rather than accepted on a static shared credential nobody individually owns. A single ZTNA deployment cannot compensate for an identity layer that is not actually Zero Trust underneath it.',
    markScheme: [
      'Explains the violation of least-privilege access (3)',
      'Explains the violation of never trust, always verify (3)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 2 — Post-Quantum Cryptography & Migration Frameworks
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: 'Explain why increasing the key size of RSA does not protect against a quantum computing attack.',
    modelAnswer: "Shor's Algorithm solves both the integer factorization problem (RSA) and the discrete logarithm problem (ECC, Diffie-Hellman) in polynomial time. This means it breaks the underlying mathematical structure the cipher relies on, rather than searching the keyspace one key at a time the way a classical brute-force attack does. Because of this, a larger key only adds modest linear overhead against Shor's Algorithm, not the exponential resistance a bigger key buys against classical brute force — so RSA and ECC require complete replacement with a new mathematical design, not reinforcement with a bigger key.",
    markScheme: [
      "Shor's Algorithm solves factorization and the discrete logarithm problem in polynomial time (2)",
      'It breaks the mathematical structure the cipher relies on, not just the keyspace search (2)',
      'Larger keys only add modest linear overhead against it, not exponential resistance — the design itself must be replaced, not reinforced (2)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: "State Mosca's Theorem and explain what it means for an organisation planning its post-quantum migration.",
    modelAnswer: "Mosca's Theorem states that if (Migration Time) + (Data Secrecy Lifetime) is greater than (Years until Q-Day), the organisation is already at risk. It means an organisation must begin migrating to post-quantum cryptography now if the time it will take to migrate, plus how long its data needs to stay confidential, adds up to more than the time remaining before a cryptographically relevant quantum computer arrives — waiting for Q-Day to be confirmed is already too late.",
    markScheme: [
      'Theorem stated — migration time + data secrecy lifetime > years until Q-Day means the organisation is already at risk (3)',
      'Meaning explained — migration must start now, since waiting for Q-Day to be confirmed is already too late for data with a long confidentiality requirement (2)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: 'List the five NIST post-quantum cryptography standards, naming the algorithm each specifies.',
    items: [
      { name: 'FIPS 203', aliases: ['ML-KEM'], explain: 'Specifies ML-KEM, a lattice-based key encapsulation mechanism, from CRYSTALS-Kyber.' },
      { name: 'FIPS 204', aliases: ['ML-DSA'], explain: 'Specifies ML-DSA, a lattice-based digital signature, from CRYSTALS-Dilithium.' },
      { name: 'FIPS 205', aliases: ['SLH-DSA'], explain: 'Specifies SLH-DSA, a hash-based digital signature, from SPHINCS+.' },
      { name: 'FIPS 206', aliases: ['Falcon', 'FN-DSA'], explain: 'Specifies Falcon (FN-DSA), a compact lattice-based (NTRU) signature.' },
      { name: 'HQC', aliases: [], explain: 'A code-based key encapsulation mechanism, standardized in 2025 as a lattice-independent backup to ML-KEM.' },
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: "Differentiate between the effect of Shor's Algorithm and Grover's Algorithm on cryptography.",
    modelAnswer: "Shor's Algorithm breaks RSA, ECC and Diffie-Hellman completely, in polynomial time, because it solves the factorization and discrete-logarithm problems those schemes depend on. Grover's Algorithm only halves the effective security level of symmetric algorithms such as AES, so doubling the key size (for example moving from AES-128 to AES-256) is enough to restore the security margin — no new algorithm is needed for symmetric cryptography.",
    markScheme: [
      "Shor's Algorithm breaks RSA, ECC and Diffie-Hellman completely, in polynomial time (2)",
      "Grover's Algorithm only halves the effective security of symmetric algorithms like AES, so doubling the key size (e.g. AES-128 to AES-256) is sufficient to counter it (2)",
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: 'List the five mathematical families of Post-Quantum Cryptography.',
    items: [
      { name: 'Lattice', aliases: ['lattice-based'], explain: 'LWE / Shortest Vector Problem — the primary standard (ML-KEM, ML-DSA).' },
      { name: 'Code', aliases: ['code-based'], explain: 'Syndrome decoding of linear codes — HQC backup KEM.' },
      { name: 'Hash', aliases: ['hash-based'], explain: 'Collision / pre-image resistance — SLH-DSA signatures.' },
      { name: 'Multivariate', aliases: ['multivar'], explain: 'Non-linear multivariate quadratics — short signatures (research).' },
      { name: 'Isogeny', aliases: ['isogeny-based'], explain: 'Maps between elliptic curves — SIKE was broken in 2022.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: 'Explain the "Harvest Now, Decrypt Later" (HNDL) attack and its three phases.',
    modelAnswer: "HNDL means adversaries intercept and archive encrypted traffic today, intending to decrypt it retroactively once a quantum computer exists — so long-lived data is already at risk even though nothing can crack it yet. Phase 1, Harvest, has adversaries intercept and archive encrypted traffic at scale today. Phase 2, Wait, holds that encrypted archive while quantum capability matures. Phase 3, Decrypt, has all data under RSA or ECC decrypted retroactively from Q-Day onward, exposing records with 20-30-year sensitivity lifetimes.",
    markScheme: [
      'HNDL defined — intercept and archive encrypted data now to decrypt once a CRQC exists (2)',
      'Phase 1 — Harvest: intercept and archive encrypted traffic today (1)',
      'Phase 2 — Wait: hold the archive while quantum capability matures (1)',
      'Phase 3 — Decrypt: retroactive decryption from Q-Day onward, exposing long-lived data (2)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: 'Explain hybrid cryptography as a migration strategy, and give a real-world example of an organisation already using it.',
    modelAnswer: 'A dual-mode hybrid runs a classical algorithm and a PQC algorithm together, for example X25519 + ML-KEM-768, so the session secret combines both and an attacker must defeat both to break it. If a quantum computer later breaks the classical lock, the PQC lock still holds; if a flaw is later found in the new lattice scheme, the classical lock still holds. Google Chrome already deploys this X25519 + ML-KEM-768 hybrid by default in TLS 1.3.',
    markScheme: [
      'Hybrid defined — runs classical + PQC together so an attacker must break both (3)',
      'Real-world example given — e.g. Google Chrome’s X25519 + ML-KEM-768 default (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 2 — Post-Quantum Cryptography & Migration Frameworks',
    question: "Scenario: UNIUYO estimates its post-quantum migration will take 7 years, and some of its records (e.g. medical and exam records) must stay confidential for 20 years. Q-Day is estimated to be about 8 years away. Apply Mosca's Theorem to determine whether UNIUYO is already at risk, and explain what this means for when migration should begin.",
    modelAnswer: "Mosca's Theorem states that an organisation is already at risk if (Migration Time) + (Data Secrecy Lifetime) exceeds (Years until Q-Day). Here, 7 years of migration plus 20 years of required confidentiality is 27 years of protection needed, against only an 8-year window before Q-Day. Since 27 exceeds 8, UNIUYO is already at risk. This means migration planning must begin now, not once Q-Day is confirmed to have arrived — waiting for that confirmation is already too late for any data with a long confidentiality requirement.",
    markScheme: [
      'States Mosca’s Theorem correctly (2)',
      'Applies the numbers — 7 + 20 = 27 years needed vs 8 years available (3)',
      'Concludes UNIUYO is already at risk since 27 > 8 (1)',
      'Explains migration must start now, not on confirmation of Q-Day (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 3 — Behavioral Biometrics & Continuous Authentication
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: 'Differentiate between static authentication (legacy MFA) and continuous behavioral authentication. List and explain any three points of contrast.',
    modelAnswer: 'Static authentication verifies identity only at entry or when a token expires, whereas continuous behavioral authentication verifies every second across the whole session. Static authentication causes high user friction — codes, taps and prompts — while continuous authentication runs silently in the background with zero friction. Static authentication carries a high replay risk, since a stolen token can be copied and reused, while continuous authentication carries low replay risk because live motor telemetry — how someone types and moves a cursor — cannot be written down or replayed.',
    markScheme: [
      'Verification frequency — only at entry/token expiry vs every second across the whole session (2)',
      'User friction — high (codes, taps, prompts) vs zero, silent background operation (2)',
      'Replay risk — high, a copied token can be reused vs low, live motor telemetry cannot be replayed (2)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: 'List the six categories of behavioral biometric data.',
    items: [
      { name: 'Keystroke Dynamics', aliases: [], explain: 'Millisecond timing of key presses and releases — even on the same password, timing signatures differ per person.' },
      { name: 'Mouse Patterns', aliases: ['mouse movement'], explain: 'The whole cursor journey — velocity changes, angular shifts and path curvature, not just the final click.' },
      { name: 'Touch Gestures', aliases: [], explain: 'How a finger scrolls, taps and zooms on a touchscreen, shaped by hand ergonomics and reach.' },
      { name: 'Device Handling & Kinematics', aliases: ['device kinematics'], explain: 'Accelerometer/gyroscope data — hold angle, grip stability and muscle micro-tremors while walking or sitting.' },
      { name: 'Application Navigation', aliases: [], explain: 'The habitual sequence of tabs, shortcuts and fields a familiar user follows through a workflow.' },
      { name: 'Location & Context', aliases: [], explain: "Environmental metadata — ISP routing, device configuration and alignment with the user's usual schedule." },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: 'Explain the four-stage pipeline used to analyse behavioral biometric data.',
    modelAnswer: 'Collection: a passive background agent hooks input events such as keydown, mousemove and touchstart, and polls sensors at roughly 50–100 Hz, with zero friction and no setup wizard. Processing: the raw signal is cleaned of noise and latency spikes, jitter is smoothed, and features such as velocity, acceleration and jerk are extracted and normalised across screens, DPI and layouts. Analysis: an enrolled baseline is modelled with LSTM or autoencoder networks, and live data is compared against that baseline using cosine similarity. Response: the resulting anomaly score is mapped to a policy action — allow, step-up challenge, or block — in under 0.5 seconds.',
    markScheme: [
      'Collection — a passive background agent hooks input events and polls sensors, with zero friction (2)',
      'Processing — cleans noise, extracts features (velocity, acceleration, jerk), normalises across devices (2)',
      'Analysis — the baseline is modelled with LSTM/autoencoder networks and compared to live data via cosine similarity (2)',
      'Response — maps the anomaly score to allow, challenge or block, in under 0.5 seconds (2)',
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: 'List the three things that defeat static MFA, covered in the notes.',
    items: [
      { name: 'Adversary-in-the-Middle (AitM) proxy phishing', aliases: ['AitM', 'adversary-in-the-middle'], explain: 'Tools like Evilginx intercept the live MFA token/session cookie and replay it, bypassing MFA entirely.' },
      { name: 'MFA fatigue', aliases: ['prompt bombing'], explain: 'Repeated push notifications until a tired user finally taps "approve".' },
      { name: 'Session hijacking / token theft', aliases: ['token theft', 'session hijacking'], explain: 'Infostealers scrape active session tokens from browser memory and replay them from another device.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: 'Explain probabilistic anomaly scoring, and describe the three response bands it maps to.',
    modelAnswer: 'Rather than a binary match/mismatch, the analysis engine outputs a continuous anomaly score between 0.0 and 1.0, measuring how far live behaviour deviates from the enrolled baseline, using cosine similarity between the live and historical vectors. Below 0.3 the system allows the session with a continuous silent pass and no prompts. Between 0.3 and 0.7 it challenges with step-up authentication, and if verified the baseline is safely updated. At 0.7 or above it blocks: terminating the session, clearing storage, isolating the device and alerting the SOC.',
    markScheme: [
      'Explains the score is continuous (0.0-1.0), not binary, using cosine similarity (2)',
      '< 0.3 — allow, silent pass (1)',
      '0.3-0.7 — challenge, step-up authentication (1)',
      '≥ 0.7 — block, terminate session and alert the SOC (2)',
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: 'State two privacy safeguards behavioral biometric systems use to remain GDPR/CCPA compliant.',
    modelAnswer: 'Data minimisation — the system stores abstract timing deltas (e.g. a dwell time of 42ms) rather than raw keystrokes, so it never captures the actual characters typed. It also uses irreversible, encrypted vectorisation, converting behavioural signals into a form that cannot be reconstructed back into the original input.',
    markScheme: [
      'Data minimisation — stores timing deltas, not raw keystrokes (2)',
      'Irreversible/encrypted vectorisation — cannot be reconstructed back into raw input (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 3 — Behavioral Biometrics & Continuous Authentication',
    question: "Scenario: Someone who has stolen a bank customer's login credentials logs in successfully and begins a large transfer, but their mouse movements are unnaturally jerky and hesitant compared to the account owner's usual smooth cursor paths. Explain how a behavioral biometrics system would likely respond, and why this differs from what a static MFA system would do.",
    modelAnswer: 'The unfamiliar, hesitant mouse pattern would drive the live behaviour vector away from the enrolled baseline, raising the anomaly score into the challenge or block band — triggering a step-up authentication prompt or terminating the session outright, potentially holding the transfer before funds leave, as described for Authorized Push Payment fraud. A static MFA system would do nothing at all at this point: it only verifies identity once at login, and the attacker already passed that check with the stolen credentials, so nothing challenges them again during the fraudulent session itself.',
    markScheme: [
      'Explains the anomaly score would rise, triggering a challenge or block response (3)',
      'Explains static MFA only verifies at login and would not catch this post-login behaviour (3)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 4 — Blockchain Technology
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Group 4 — Blockchain Technology',
    question: 'Define blockchain and explain the role cryptographic hashing plays in protecting its integrity.',
    modelAnswer: "A blockchain is a distributed, shared and continuously synchronised digital ledger that records transactions across many computers such that no single record can be altered retroactively without altering every subsequent record and gaining the agreement of the network. Cryptographic hashing protects this integrity because each block's header contains the hash of the previous block, physically chaining the blocks together. Tampering with any historical transaction changes that block's hash, which breaks the link to every subsequent block and immediately alerts the network to the tampering.",
    markScheme: [
      'Blockchain defined — a distributed, shared, continuously synchronised ledger where no record can be altered without altering every subsequent record and gaining network agreement (3)',
      "Hashing role — each block contains the previous block's hash; tampering with any block changes its hash, breaking the chain and alerting the network (3)",
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 4 — Blockchain Technology',
    question: 'Differentiate between Proof of Work and Proof of Stake consensus mechanisms.',
    modelAnswer: 'Proof of Work, used by Bitcoin, has miners compete to solve a computationally difficult puzzle — finding a nonce that produces a hash meeting certain criteria — and the first to solve it adds the block and is rewarded; attacking the network requires more computing power than the rest of the network combined (a 51% attack). Proof of Stake, used by Ethereum since its 2022 transition ("The Merge"), instead has validators stake cryptocurrency as collateral rather than competing with computing power, and they lose their stake if they act maliciously — making it far more energy-efficient than PoW mining.',
    markScheme: [
      'Proof of Work — miners compete to solve a computational puzzle; the first to solve it adds the block and is rewarded; used by Bitcoin (3)',
      'Proof of Stake — validators stake cryptocurrency as collateral instead of computing power and lose it for malicious behaviour; used by Ethereum, far more energy-efficient (3)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 4 — Blockchain Technology',
    question: 'List the four types of blockchain.',
    items: [
      { name: 'Public Blockchain', aliases: ['public'], explain: 'Open networks anyone can join, read from and submit transactions to, without permission (e.g. Bitcoin, Ethereum) — maximum decentralisation, but slower and more resource-intensive.' },
      { name: 'Private Blockchain', aliases: ['private'], explain: 'Restricted networks controlled by a single organisation that decides who may participate — faster, but sacrifices some decentralisation.' },
      { name: 'Consortium (Federated) Blockchain', aliases: ['consortium', 'federated'], explain: 'Controlled by a pre-selected group of organisations — balances decentralisation with efficiency for inter-company collaboration.' },
      { name: 'Hybrid Blockchain', aliases: ['hybrid'], explain: "Combines public and private elements, keeping some data private while leveraging a public network's verifiability for other operations." },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 4 — Blockchain Technology',
    question: 'List the five blockchain-powered security capabilities described in this topic.',
    items: [
      { name: 'Decentralised identity & access management', aliases: ['decentralised identity'], explain: 'Self-sovereign identity systems where individuals control their own credentials cryptographically, reducing reliance on centralised identity databases that are common breach targets.' },
      { name: 'Tamper-proof audit trails', aliases: [], explain: 'Security logs, software update records and digital evidence anchored to a blockchain so any retroactive tampering is immediately detectable.' },
      { name: 'Securing IoT devices', aliases: [], explain: 'Authenticating the enormous number of devices in IoT networks and verifying firmware integrity without a single centralised server as a point of failure.' },
      { name: 'DNS and domain security', aliases: [], explain: 'Decentralised domain name systems are more resistant to the centralised DNS attacks that have caused major outages in the past.' },
      { name: 'Secure data sharing', aliases: [], explain: "Organisations share verified data (such as threat intelligence) across institutional boundaries without needing to fully trust each other's internal systems." },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 4 — Blockchain Technology',
    question: 'List the five parts of a block\'s structure.',
    items: [
      { name: 'Block header', aliases: [], explain: 'Metadata about the block, including a timestamp and a reference to the previous block.' },
      { name: 'Previous block hash', aliases: [], explain: 'A cryptographic fingerprint of the prior block that physically chains the blocks together.' },
      { name: 'Merkle root', aliases: [], explain: 'A single hash summarising all transactions in the block via a Merkle tree, allowing efficient verification without downloading the entire block.' },
      { name: 'Transaction data', aliases: [], explain: 'The actual records being stored — financial transactions, smart contract calls, or other data.' },
      { name: 'Nonce', aliases: [], explain: 'A number used in proof-of-work systems that miners adjust repeatedly to find a valid block hash.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 4 — Blockchain Technology',
    question: 'Explain the three properties of cryptographic hash functions that protect blockchain integrity.',
    modelAnswer: 'Determinism means the same input always produces the same hash, so any node can independently verify a block. The avalanche effect means changing even a single character of the input produces a completely different hash, making tampering immediately obvious. The one-way property means it is computationally infeasible to reverse a hash back into its original input, so the chain cannot be forged from the hash alone.',
    markScheme: [
      'Determinism — same input always produces the same hash (2)',
      'Avalanche effect — a single-character change produces a completely different hash (2)',
      'One-way function — infeasible to reverse a hash back into its input (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 4 — Blockchain Technology',
    question: 'Describe two attack surfaces on blockchain systems that sit outside the core protocol itself.',
    modelAnswer: 'Wallet and private-key theft is a leading cause of loss — phishing, malware and social engineering target the keys users hold, since the underlying cryptography is rarely the weak point compared to a user\'s own key management. Cross-chain bridge attacks are also a frequent target, since bridges connecting different blockchains hold large amounts of locked value while often relying on more centralised or experimental security models than the chains they connect.',
    markScheme: [
      'Attack surface 1 named and explained (3)',
      'Attack surface 2 named and explained (3)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 4 — Blockchain Technology',
    question: "Scenario: An attacker gains temporary control of 60% of a small blockchain network's mining power. Explain what kind of attack this enables, why it is described as extremely costly on a large network like Bitcoin, and one factor that makes smaller blockchains more vulnerable to it.",
    modelAnswer: "This is a 51% attack: controlling a majority of the network's mining power lets the attacker rewrite recent transaction history. On a large network like Bitcoin, mounting this attack is extremely costly because it requires acquiring more computing power than the entire rest of the network combined, which demands enormous capital and energy expenditure. Smaller blockchains are more vulnerable because they have less distributed mining or staking power overall, so a much smaller absolute amount of resources is enough to reach a majority.",
    markScheme: [
      'Identifies a 51% attack, rewriting transaction history (2)',
      'Explains why it is costly on large networks — must outweigh the combined rest of the network (2)',
      'Explains smaller networks are more vulnerable due to less distributed mining/staking power (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 5 — Cloud Native Security
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Group 5 — Cloud Native Security',
    question: 'Explain the 4C security model for cloud native applications, and state why the order of its layers matters.',
    modelAnswer: 'The 4C model is a Kubernetes community framework of four nested layers, each secured independently: Cloud (the underlying infrastructure — AWS, Azure, GCP or on-prem hardware), Cluster (API server access and network policies), Container (container images and runtime configuration), and Code (source code, dependencies and secrets handling). The order matters because the layers are nested — a weakness at any one layer can undermine every layer above it, so securing Code alone is not enough if the Cluster or Cloud layer beneath it is compromised.',
    markScheme: [
      '4C model defined — a Kubernetes community framework of four nested layers, each secured independently (2)',
      'Cloud layer — the underlying infrastructure (AWS, Azure, GCP, on-prem) (1)',
      'Cluster layer — API server access and network policies (1)',
      'Container layer — container images and runtime configuration (1)',
      'Code layer — source code, dependencies and secrets handling (1)',
      'Order matters — a weakness at any one layer can undermine every layer above it (2)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 5 — Cloud Native Security',
    question: 'List the four layers of the 4C model, from outermost to innermost.',
    items: [
      { name: 'Cloud', aliases: [], explain: 'AWS, Azure, GCP, or on-prem hardware — the outermost layer.' },
      { name: 'Cluster', aliases: [], explain: 'API server access and network policies.' },
      { name: 'Container', aliases: [], explain: 'Container images and runtime configuration.' },
      { name: 'Code', aliases: [], explain: 'Source code, dependencies, and secrets handling — the innermost layer.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 5 — Cloud Native Security',
    question: 'Differentiate between Zero Trust and Shift-Left security as strategies for securing cloud native systems.',
    modelAnswer: 'Zero Trust discards the assumption that anything inside the network perimeter is trustworthy — every request, user or service-to-service, must be authenticated, authorized and encrypted regardless of origin, commonly implemented in cloud native systems through service meshes enforcing mutual TLS. Shift-Left security instead moves security checks earlier in the software development lifecycle, integrating vulnerability scanning, static analysis and policy enforcement directly into CI/CD pipelines, with the goal of catching misconfigurations and vulnerable dependencies before they reach production.',
    markScheme: [
      'Zero Trust — discards perimeter trust; every request authenticated, authorised and encrypted regardless of origin, often via service meshes with mutual TLS (3)',
      'Shift-Left — moves security checks earlier into CI/CD pipelines to catch issues before they reach production (3)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 5 — Cloud Native Security',
    question: 'List the four key security challenges of cloud native environments.',
    items: [
      { name: 'Expanded attack surface', aliases: [], explain: 'Every container, microservice, and API endpoint is a potential entry point; one weak link enables lateral movement.' },
      { name: 'Ephemeral & dynamic infrastructure', aliases: ['ephemeral infrastructure'], explain: 'Containers spin up and down in minutes, breaking conventional asset inventory and monitoring approaches.' },
      { name: 'Misconfiguration', aliases: [], explain: 'Misconfigured images, overly permissive RBAC, and exposed dashboards cause more breaches than novel exploits.' },
      { name: 'Supply chain risk', aliases: [], explain: 'Third-party base images, open-source libraries, and CI/CD dependencies create a chain a single compromise can propagate through.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 5 — Cloud Native Security',
    question: 'Explain why misconfiguration, rather than novel exploits, causes more breaches in cloud native environments, and name two best practices that reduce this risk.',
    modelAnswer: 'Misconfigured container images, overly permissive RBAC roles and exposed dashboards leave doors open that require no clever exploit to walk through — an attacker only needs to find the gap, not defeat any defence. Two best practices that reduce this: least-privilege access, restricting RBAC roles and service permissions to the minimum required per workload, and image scanning, checking container images for known vulnerabilities before they are pushed to a registry.',
    markScheme: [
      'Explains why misconfiguration is a bigger cause of breaches than novel exploits (2)',
      'Best practice 1 named and explained (2)',
      'Best practice 2 named and explained (2)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 5 — Cloud Native Security',
    question: 'Name four tools from the cloud native security tooling landscape covered in the notes.',
    items: [
      { name: 'Docker', aliases: ['container runtime'], explain: 'Builds and runs containerized applications; image configuration is a key security control point.' },
      { name: 'Kubernetes', aliases: [], explain: 'Manages container deployment and scaling; RBAC and network policies are central to securing it.' },
      { name: 'Falco', aliases: ['runtime threat detection'], explain: 'Monitors system calls in real time to detect anomalous or malicious container behavior.' },
      { name: 'Prisma Cloud', aliases: ['Aqua Security', 'CNAPP'], explain: 'A CNAPP providing unified visibility across posture management, vulnerability scanning and compliance (Aqua Security covers similar ground: image scanning, runtime protection, supply chain security).' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 5 — Cloud Native Security',
    question: 'Scenario: A development team deploys a new microservice with an overly permissive RBAC role — it can read every other service\'s secrets — and skips image scanning to save time before a demo. A week later, an attacker compromises the container and uses its RBAC role to access secrets belonging to unrelated services. Using the 4C model and the least-privilege principle, explain what went wrong and what should have been done differently.',
    modelAnswer: 'The failure spans the Container layer (an unscanned image was deployed with an unknown vulnerability) and the Cluster layer (the RBAC role granted at the cluster level was far broader than the microservice needed). Because the 4C model nests each layer, this weakness at Container/Cluster undermined the security of every other service whose secrets became reachable. This also directly violates least-privilege access, which requires permissions to be scoped to the minimum a workload actually needs — a compromised container should never be able to reach secrets outside its own service. The image should have been scanned before deployment, and the RBAC role restricted to only the secrets that specific microservice requires.',
    markScheme: [
      'Identifies the Container layer failure — unscanned image deployed (2)',
      'Identifies the Cluster layer failure — overly broad RBAC role (2)',
      'Explains the least-privilege violation (2)',
      'States what should have been done — scan the image and restrict RBAC to the minimum needed (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 6 — Privacy Enhancing Technologies (PET)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'Differentiate between security and privacy as properties of a system.',
    modelAnswer: 'Security is a property of a system — how well it defends against unauthorised access, modification or destruction of data. Privacy is a property of data processing — whether that processing respects the reasonable expectations of the individuals whose data is used. A highly secure system can still be deeply privacy-invasive: a government database with state-of-the-art encryption may still violate privacy if it collects more data than necessary or links records across departments without consent.',
    markScheme: [
      'Security defined — how well a system defends against unauthorised access, modification or destruction of data (2)',
      'Privacy defined — whether data processing respects the reasonable expectations of the individuals whose data is used (2)',
      'A highly secure system can still be privacy-invasive if it collects more data than necessary or links records without consent (2)',
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'List the three classes of Privacy Enhancing Technology.',
    items: [
      { name: 'Hard PETs', aliases: [], explain: 'Cryptographic/mathematical mechanisms with provably strong privacy guarantees — Differential Privacy, Homomorphic Encryption, Zero-Knowledge Proofs, Secure Multi-Party Computation, Federated Learning.' },
      { name: 'Soft PETs', aliases: [], explain: 'Policy + technical hybrids — Anonymization & Pseudonymization, Consent Management Platforms, Self-Sovereign Identity, Data Minimization Policies.' },
      { name: 'Network PETs', aliases: [], explain: 'Communication-layer tools that anonymise identity and location — Onion Routing (Tor), VPNs, Mix Networks, Private Information Retrieval, Anonymous Credentials.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'Define Differential Privacy and state its formal guarantee.',
    modelAnswer: "Differential Privacy adds calibrated statistical noise to a dataset, ensuring that including or excluding any single individual's data does not significantly affect query results. Formally, a randomized mechanism M satisfies ε-differential privacy if, for any two neighboring datasets D and D' differing by exactly one record, and for any output set S: Pr[M(D) ∈ S] ≤ e^ε × Pr[M(D') ∈ S]. A smaller epsilon gives stronger privacy but reduces data utility.",
    markScheme: [
      "Defined — adds calibrated statistical noise so that including or excluding one individual's data does not significantly affect query results (2)",
      "Formal guarantee stated — Pr[M(D) ∈ S] ≤ e^ε × Pr[M(D') ∈ S] for neighbouring datasets D and D' (2)",
      'A smaller epsilon gives stronger privacy but reduces data utility (1)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'List the five Hard PETs.',
    items: [
      { name: 'Differential Privacy', aliases: ['DP'], explain: 'Adds calibrated statistical noise so no single record significantly affects query results.' },
      { name: 'Homomorphic Encryption', aliases: ['HE'], explain: 'Allows computation on encrypted data without decrypting it first.' },
      { name: 'Zero-Knowledge Proofs', aliases: ['ZKP'], explain: 'Lets a prover convince a verifier a statement is true without revealing anything beyond its truth.' },
      { name: 'Secure Multi-Party Computation', aliases: ['SMPC', 'MPC'], explain: 'Lets multiple parties jointly compute a function over their combined inputs without any party learning the others\' individual inputs.' },
      { name: 'Federated Learning', aliases: [], explain: 'Model training across many devices, each holding local data that never leaves the device — only model updates are aggregated.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'Explain Homomorphic Encryption, using the hospital/cloud AI example from the notes.',
    modelAnswer: 'Homomorphic Encryption allows computation on encrypted data without decrypting it first — the result, once decrypted, matches what the same operations would have produced on the plaintext. In the notes\' example, a hospital sends encrypted patient data to a cloud AI model and receives a diagnosis back; the cloud never sees the raw patient data at any point, only ciphertext, yet still performs a useful computation on it.',
    markScheme: [
      'HE defined — computation on encrypted data, result matches plaintext computation once decrypted (3)',
      'Hospital/cloud AI example correctly applied — cloud never sees raw patient data (2)',
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'List the three types of Differential Privacy.',
    items: [
      { name: 'Global DP', aliases: [], explain: 'Noise added at the aggregator/server — users trust the server to apply noise faithfully before publishing results.' },
      { name: 'Local DP', aliases: [], explain: 'Noise added on-device before data leaves the user\'s device — Apple\'s approach since 2016; eliminates the need to trust a central aggregator.' },
      { name: 'Shuffle DP', aliases: [], explain: 'Local DP combined with shuffling to reduce the noise requirement while maintaining strong privacy guarantees.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'Explain a Zero-Knowledge Proof using the "proving you are over 18" example, and name one real-world application.',
    modelAnswer: 'A Zero-Knowledge Proof lets a prover convince a verifier that a statement is true without revealing any information beyond the fact of its truth. Proving you are over 18 to a website is the classic example: the verifier gets mathematically confirmed proof of that one fact without learning your exact date of birth or seeing your ID card. Zcash applies this in the real world, using zk-SNARKs to hide the amount, sender and receiver in shielded cryptocurrency transactions.',
    markScheme: [
      'ZKP defined — proves a statement is true without revealing anything beyond its truth (3)',
      'Real-world application named (e.g. Zcash zk-SNARKs, zkSync, W3C DID) (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 6 — Privacy Enhancing Technologies (PET)',
    question: 'Scenario: A Nigerian fintech wants several partner banks to jointly train a fraud-detection model on their combined transaction histories, but no bank is willing to share its raw customer data with the others. Which Hard PET would let them do this, and briefly explain how it works.',
    modelAnswer: 'Federated Learning fits this directly: the server sends an initial model to each participating bank, each bank trains it exclusively on its own local transaction data, and only the resulting model updates (gradients) — never the raw customer records — are sent back to the server, which aggregates them into an improved shared fraud-detection model. Secure Multi-Party Computation is a valid alternative, letting the banks jointly compute a function such as a fraud score over their combined inputs without any bank learning the others\' individual records.',
    markScheme: [
      'Names Federated Learning and/or SMPC as the fitting Hard PET (2)',
      'Explains the mechanism — local training/joint computation, only updates or results shared, never raw data (4)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 7 — Automated Vulnerability Research
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 7,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'Define Automated Vulnerability Research (AVR) and state its four objectives.',
    modelAnswer: 'Automated Vulnerability Research (AVR) is the use of automated systems, software tools, and intelligent technologies to identify, analyse, and validate — and sometimes exploit — vulnerabilities in computer systems, networks, websites, and applications. Its four objectives are: to detect weaknesses before an attacker finds them; to reduce the manual workload on security teams; to improve defences by feeding findings back into remediation; and to test reliability, confirming a system holds up under adversarial conditions.',
    markScheme: [
      'AVR defined — automated systems, tools and intelligent technologies used to identify, analyse and validate vulnerabilities (3)',
      'Objective — detect weaknesses early (1)',
      'Objective — reduce workload (1)',
      'Objective — improve defences (1)',
      'Objective — test reliability (1)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'List the six components of AVR.',
    items: [
      { name: 'Static analysis', aliases: ['static'], explain: 'Checks the code for hidden flaws without ever running the program.' },
      { name: 'Dynamic analysis', aliases: ['dynamic'], explain: 'Monitors how the software behaves and looks for crashes while it is actively running.' },
      { name: 'Fuzz testing', aliases: ['fuzzing'], explain: 'Throws massive amounts of random, messy data at an app to see if it breaks.' },
      { name: 'Symbolic execution', aliases: [], explain: 'Uses maths and placeholders instead of real data to uncover hidden paths in the code.' },
      { name: 'Binary analysis', aliases: [], explain: 'Reverse-engineers compiled programs to understand how they work without the original source code.' },
      { name: 'Artificial intelligence and machine learning', aliases: ['AI/ML', 'AI and ML'], explain: 'Uses past data to train computers to automatically predict and spot new security risks.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'Differentiate between static analysis and dynamic analysis as components of AVR, giving one tool example for each.',
    modelAnswer: "Static analysis checks source code for hidden flaws without ever running the program, using tools such as SonarQube or CodeQL. Dynamic analysis instead monitors how the software behaves and looks for crashes while it is actively running, using tools such as Valgrind or Burp Suite. The key difference is timing: static analysis examines the code at rest, before execution, while dynamic analysis observes the program's real behaviour while it runs.",
    markScheme: [
      'Static analysis defined — examines code without running it (2)',
      'Static analysis tool example (SonarQube/CodeQL) (1)',
      'Dynamic analysis defined — monitors behaviour and crashes while running (2)',
      'Dynamic analysis tool example (Valgrind/Burp Suite/OWASP ZAP/Dynatrace) (1)',
    ],
  },

  {
    type: 'recall',
    marks: 8,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'List the eight stages of the AVR architecture framework, in order.',
    items: [
      { name: 'Target systems', aliases: [], explain: 'Apps, APIs, IoT, networks, cloud, binaries and infrastructure — everything AVR is pointed at.' },
      { name: 'Asset discovery & enumeration', aliases: ['asset discovery'], explain: 'Subdomains, hosts, open ports & services, technologies & versions, APIs & endpoints, attack-surface mapping.' },
      { name: 'Data collection', aliases: [], explain: 'Scanning, web crawling, API requests, traffic monitoring, configuration dumping, banner grabbing.' },
      { name: 'Vulnerability detection engine', aliases: ['detection engine'], explain: 'Signature/rule-based matching, AI/ML models, fuzzing & dynamic analysis, static analysis, pattern matching, known-vulnerability databases.' },
      { name: 'Validation engine', aliases: [], explain: 'Confirms vulnerabilities, removes false positives, verifies exploitability, builds a proof of concept.' },
      { name: 'Risk assessment', aliases: [], explain: 'Severity (CVSS), exploitability, impact analysis, asset criticality, business context, risk scoring.' },
      { name: 'Report generation & recommendations', aliases: ['report generation'], explain: 'Vulnerability details, affected assets, severity & CVSS, evidence & PoC, remediation steps, references.' },
      { name: 'Continuous monitoring & learning', aliases: ['continuous monitoring'], explain: 'Continuous scanning, change & drift detection, threat-intelligence feed, rule & model updates, feedback loop.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'Scenario: A university student portal suffers a SQL injection vulnerability on its login form, exposing student data. Using the notes, describe how AVR was used to detect and fix it.',
    modelAnswer: 'Security teams deployed Burp Suite, Nessus and fuzzing together to detect the SQL injection. Once confirmed, the vulnerability was patched with parameterised queries, which prevent user input from being interpreted as SQL code. The fix was then kept under continuous monitoring so any regression or new flaw would be caught early. The result was that the vulnerability was removed and student data was protected.',
    markScheme: [
      'Vulnerability identified — SQL injection on the login form (2)',
      'Detection tools named — Burp Suite, Nessus and fuzzing (2)',
      'Remediation — parameterised queries (2)',
      'Continuous monitoring after the fix (1)',
      'Result stated — vulnerability removed, data protected (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 7 — Automated Vulnerability Research',
    question: "Scenario: An organisation's AI-based vulnerability scanner reports zero critical issues on its public-facing web application for six months. It is then breached through a flaw disclosed only two weeks earlier as a zero-day, which the scanner never flagged. Explain why the scanner missed this vulnerability and recommend one change to the organisation's process that would reduce this risk in future.",
    modelAnswer: "AVR tools are dependent on known-vulnerability databases: they detect and prioritise issues that have already been catalogued as CVEs or match a known signature. A zero-day, by definition, has no such record until it is disclosed, so a scanner checking against those databases has nothing to match it against and reports a clean result. This is exactly the 'dependent on vulnerability databases — misses zero-days' limitation covered in the notes. To reduce this risk, the organisation should pair automated scanning with periodic human-led penetration testing and a live threat-intelligence feed, since human testers and fresh intelligence can surface novel logic flaws and freshly disclosed issues that a database-driven scanner cannot yet know about.",
    markScheme: [
      'Explains the scanner is limited to known-vulnerability databases/signatures (3)',
      'Explains a zero-day has no record until disclosed, so it is invisible to that kind of scan (2)',
      'Recommendation given — e.g. periodic human penetration testing and/or a live threat-intelligence feed (3)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'State and briefly explain two benefits and two limitations of AVR.',
    modelAnswer: 'Benefits: Speed — AVR scans far faster than a human review team could manage. Scalability — it handles large networks that would be impractical to assess by hand. Limitations: False positives and negatives — automated tools can flag issues that are not real, or miss ones that are. Dependence on vulnerability databases — because AVR checks against known-vulnerability databases, it can miss zero-day flaws that have not yet been catalogued.',
    markScheme: [
      'Benefit 1 named and explained (2)',
      'Benefit 2 named and explained (2)',
      'Limitation 1 named and explained (2)',
      'Limitation 2 named and explained (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 7 — Automated Vulnerability Research',
    question: 'Explain the significance of the 2016 DARPA Cyber Grand Challenge and the Mayhem system to the field of AVR.',
    modelAnswer: 'The 2016 DARPA Cyber Grand Challenge (CGC) was a competition in which teams built completely autonomous supercomputers that had to defend their own networks while attacking others, with no human touching a keyboard during the contest itself. Mayhem, developed by ForAllSecure, is remembered as the most famous public demonstration of advanced AVR — proof that a fully automated system could discover, validate and even exploit vulnerabilities in real time, at machine speed, without a human in the loop.',
    markScheme: [
      'DARPA CGC (2016) described — autonomous systems defending and attacking without human intervention (3)',
      'Mayhem named and attributed to ForAllSecure (2)',
      'Significance — proof that automated systems can find/validate vulnerabilities at machine speed unaided (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 8 — Agentic AI
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Group 8 — Agentic AI',
    question: 'Differentiate between traditional AI and Agentic AI. List and explain any three points of contrast.',
    modelAnswer: 'Traditional AI responds to a specific command or input; Agentic AI receives a goal and decides for itself what to do to achieve it. Traditional AI performs predefined, single-step tasks, while Agentic AI plans and executes complex, multi-step tasks. Traditional AI learns only where the model is explicitly retrained, whereas Agentic AI learns from previous interactions and feedback, improving its performance over time.',
    markScheme: [
      'Trigger — responds to a specific command vs receives a goal and decides for itself what to do (2)',
      'Task scope — predefined single-step tasks vs plans and executes complex multi-step tasks (2)',
      'Learning — learns only when explicitly retrained vs learns from previous interactions and feedback over time (2)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 8 — Agentic AI',
    question: 'List the five components of Agentic AI.',
    items: [
      { name: 'Machine Learning', aliases: ['ML'], explain: 'Enables the system to learn from data and improve accuracy.' },
      { name: 'Natural Language Processing', aliases: ['NLP'], explain: 'Allows the AI to understand and communicate using human language.' },
      { name: 'Memory system', aliases: [], explain: 'Stores and retrieves information from previous interactions.' },
      { name: 'Reasoning engine', aliases: [], explain: 'Evaluates information and supports intelligent decision-making.' },
      { name: 'Planning and execution module', aliases: [], explain: 'Creates action plans and carries out tasks to achieve defined goals.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 8 — Agentic AI',
    question: 'Explain the loop Agentic AI follows to complete a task, from receiving a goal to adapting its behaviour.',
    modelAnswer: 'Receive: the system is given a goal or instruction by a user. Perceive: it gathers relevant information from its environment or available data sources. Reason and plan: it analyses that information, reasons through possible solutions, and creates a plan to accomplish the task. Act: it executes the required actions, interacting with software, databases or other digital tools. Monitor and adapt: it continuously monitors the results, learns from feedback, and adjusts its actions when necessary to improve performance.',
    markScheme: [
      'Receive — given a goal or instruction by a user (1)',
      'Perceive — gathers relevant information from its environment or data sources (1)',
      'Reason and plan — analyses the information and creates a plan (1)',
      'Act — executes the required actions, interacting with software or tools (1)',
      'Monitor and adapt — continuously monitors results and adjusts actions (1)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 8 — Agentic AI',
    question: 'List the five characteristics of Agentic AI.',
    items: [
      { name: 'Autonomy', aliases: [], explain: 'Performs tasks and makes decisions with minimal human intervention.' },
      { name: 'Goal-oriented', aliases: [], explain: 'Focuses on achieving specific objectives by planning and executing actions.' },
      { name: 'Adaptability', aliases: [], explain: 'Adjusts its behaviour based on changes in its environment or new information.' },
      { name: 'Reasoning', aliases: [], explain: 'Analyses situations and selects the most appropriate course of action.' },
      { name: 'Learning ability', aliases: [], explain: 'Improves its performance over time through experience and feedback.' },
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Group 8 — Agentic AI',
    question: 'Explain the "calculator vs accountant" analogy used to describe the difference between traditional AI and Agentic AI.',
    modelAnswer: 'You hand a calculator two numbers and an operation, and it returns one answer — it does exactly and only what you typed, which is traditional AI responding to a specific input. You hand an accountant a goal such as "file this year\'s returns", and they go and find the receipts, decide what still needs checking, do the work in whatever order makes sense, and come back if something does not add up — which is Agentic AI, given a goal rather than a command, that plans and acts on its own toward it.',
    markScheme: [
      'Calculator side explained — responds only to exact input, traditional AI (2)',
      'Accountant side explained — given a goal, plans and acts autonomously, Agentic AI (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 8 — Agentic AI',
    question: 'State and briefly explain three challenges of Agentic AI.',
    modelAnswer: 'Security risks — if compromised by attackers, an autonomous AI system could make harmful decisions or be manipulated into performing malicious actions. Lack of transparency — some agentic systems operate as "black boxes", making it difficult to understand how they reached a particular decision. Human oversight — despite its autonomy, Agentic AI still requires human supervision to ensure its actions remain safe, ethical and aligned with organisational objectives.',
    markScheme: [
      'Challenge 1 named and explained (2)',
      'Challenge 2 named and explained (2)',
      'Challenge 3 named and explained (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 8 — Agentic AI',
    question: 'Scenario: A company deploys an Agentic AI system to autonomously investigate and respond to security incidents. One night, the system misclassifies a legitimate software update as an attack and automatically revokes access for the entire IT department, locking them out during a critical outage. Using the challenges covered in this topic, explain what went wrong and why human oversight remains necessary despite the system\'s autonomy.',
    modelAnswer: 'This exposes both the lack-of-transparency and security-risk challenges: the system reached a harmful decision through reasoning nobody could inspect or override in time, and its very autonomy — the ability to act on its own — let one misclassification cascade into locking out an entire department. Human oversight remains necessary precisely because Agentic AI, despite planning and acting independently, still needs a person able to verify its actions stay safe, ethical and aligned with the organisation\'s actual objectives before consequences like this become irreversible.',
    markScheme: [
      'Identifies the lack-of-transparency / black-box failure (3)',
      'Explains why human oversight remains necessary despite the system\'s autonomy (3)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 9 — Deepfake Detection
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 5,
    source: 'Group 9 — Deepfake Detection',
    question: 'Define a deepfake, and explain what distinguishes it from traditional photo or audio editing.',
    modelAnswer: 'A deepfake is synthetic media — an image, video, or audio recording — generated or altered with artificial intelligence so that it depicts a person saying or doing something that never actually happened. Unlike traditional photo editing or dubbed audio, the manipulation is produced by a trained model rather than manual editing, which allows the output to be generated at scale and with a level of realism traditional tools could not achieve.',
    markScheme: [
      'Deepfake defined — AI-generated/altered synthetic media depicting something that never happened (3)',
      'Distinction — produced by a trained model, generated at scale, with realism manual editing could not achieve (2)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 9 — Deepfake Detection',
    question: 'List the four ways to build a deepfake, and what each abbreviation stands for.',
    items: [
      { name: 'GAN', aliases: ['generative adversarial network', 'generative adversarial networks'], explain: "A generator and a discriminator compete, improving round after round until the output is hard to distinguish from real data." },
      { name: 'AE', aliases: ['autoencoder', 'autoencoders'], explain: "Compresses a face into a shared internal code, then decodes it through a different identity's decoder — the core face-swap mechanism." },
      { name: 'DM', aliases: ['diffusion model', 'diffusion models'], explain: 'Learns to reverse a noise process, gradually rebuilding a coherent image step by step.' },
      { name: 'VC', aliases: ['voice cloning'], explain: "Learns a target's vocal characteristics from sample audio, then generates new speech in that voice." },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 9 — Deepfake Detection',
    question: "Describe how \"audio-jacking\" works, as demonstrated by IBM Security's X-Force team in 2024.",
    modelAnswer: "Audio-jacking is a live-call attack in which a hidden third party silently intercepts and alters a genuine phone call between two real speakers in real time, with no recording and no rehearsed script. The intercepted pipeline runs speech-to-text, into a large language model watching for a keyword trigger, into a voice clone, out through text-to-speech. In IBM's proof of concept, the system listened for the phrase \"bank account\"; whenever either speaker said it, the LLM silently replaced the real number with an attacker-controlled one and regenerated it in a cloned voice matching the speaker, mid-sentence, without either party noticing anything had changed.",
    markScheme: [
      'Defined — live-call interception and real-time alteration by a hidden third party (2)',
      'Pipeline — speech-to-text (1)',
      'Pipeline — LLM keyword trigger (1)',
      'Pipeline — voice clone (1)',
      'Pipeline — text-to-speech (1)',
      'Worked example — "bank account" trigger replacing the number mid-sentence in a cloned voice (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Group 9 — Deepfake Detection',
    question: 'Compare the Arup Hong Kong fraud and the Slovak election deepfake, including how each was ultimately caught.',
    modelAnswer: "In January 2024, a finance employee at engineering firm Arup's Hong Kong office authorised 15 fraudulent wire transfers, totalling $25.6M, after joining a video call where every other participant — including a person who appeared to be the company's CFO — was an AI-generated deepfake built from public footage of real executives. It was caught only by a phone call to headquarters, not by detection software. In September 2023, two days before Slovakia's parliamentary election, a fabricated audio clip of party leader Michal Šimečka discussing plans to rig the vote spread widely, circulated during a legally mandated media-silence window that blocked timely fact-checking. It was addressed only by public denial from those involved, after polls had already opened. In both cases, the deepfake was caught by human verification after the fact, not by automated detection.",
    markScheme: [
      'Arup case — amount and date ($25.6M, January 2024) (2)',
      'Arup case — deepfake CFO on a video call, 15 fraudulent transfers (1)',
      'Arup case — caught by a phone call to headquarters, not detection software (1)',
      'Slovak case — Šimečka audio clip, September 2023, two days before the election (2)',
      'Slovak case — spread during the legally mandated media-silence window (1)',
      'Slovak case — caught by public denial after polls opened (1)',
      'Shared lesson — neither case was caught by automated detection software (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 9 — Deepfake Detection',
    question: "Scenario: You are a finance manager. You receive a video call from someone who looks and sounds exactly like your company's CFO, instructing you to urgently wire $500,000 to a new supplier account before close of business, citing a confidential pending acquisition. Describe three actions you should take before authorising the transfer, and name the real-world case this scenario resembles.",
    modelAnswer: "This scenario resembles the Arup Hong Kong fraud, where a deepfake CFO on a video call convinced a finance employee to authorise 15 fraudulent wire transfers. Before authorising the transfer, three actions should be taken: treat the request with healthy scepticism precisely because it combines urgency and money, the classic pressure combination; verify the instruction out-of-band, by calling the CFO back on a number already saved rather than one provided in the call itself, or by phoning company headquarters directly, as ultimately caught the Arup fraud; and use a pre-agreed personal code word or a second, separate confirmation channel before moving any funds, refusing to act on the video call alone no matter how convincing it looks or sounds.",
    markScheme: [
      'Identifies the resemblance to the Arup Hong Kong deepfake CFO fraud (2)',
      'Action — healthy scepticism given the urgency + money combination (2)',
      'Action — out-of-band verification (e.g. call back on a saved number, or call headquarters directly) (2)',
      'Action — a further distinct safeguard (e.g. personal code word, refusing to act on the call alone) (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Group 9 — Deepfake Detection',
    question: "Scenario: While discussing an unrelated issue on a call to your bank's customer service line, you mention your account number twice. Minutes later, someone attempts a large transfer from your account using a voice that sounds exactly like yours. Explain which deepfake technique most likely enabled this, how it works, and one behavioural change that would reduce this specific risk.",
    modelAnswer: "This is most likely audio-jacking: a hidden party intercepting the live call in real time and running the intercepted audio through a pipeline of speech-to-text, into an LLM watching for a keyword trigger — here, the spoken account number — into a voice clone, then out through text-to-speech, letting the attacker reproduce the victim's voice on demand. The behavioural change that most directly reduces this risk is to paraphrase sensitive details instead of reading them back verbatim — for example describing the account rather than stating the digits aloud — which disrupts the keyword trigger the interception pipeline depends on.",
    markScheme: [
      'Identifies audio-jacking (2)',
      'Describes the pipeline — speech-to-text, LLM keyword trigger, voice clone, text-to-speech (2)',
      'Explains the mechanism — triggered by the spoken account number and cloned in real time (2)',
      'Behavioural change — paraphrase sensitive details instead of repeating them verbatim (2)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Group 9 — Deepfake Detection',
    question: 'List the six categories of malicious use of deepfakes.',
    items: [
      { name: 'Financial fraud', aliases: [], explain: 'Grandparent scams and corporate impersonation, e.g. the $35M UAE voice-cloning heist and $25.6M Hong Kong video-call fraud.' },
      { name: 'Political disinformation', aliases: [], explain: 'Fabricated audio/video of public figures, e.g. the 2024 New Hampshire robocall.' },
      { name: 'Non-consensual content', aliases: [], explain: 'The most prevalent form by volume, overwhelmingly targeting women without consent.' },
      { name: 'Identity theft & impersonation', aliases: ['identity theft'], explain: 'Combined with stolen documents to defeat facial-recognition checks in fraudulent applications.' },
      { name: 'Extortion', aliases: [], explain: 'Fabricated compromising media or a cloned voice used to pressure victims into urgent payment.' },
      { name: 'False positives & judicial doubt', aliases: ['judicial doubt'], explain: 'The mere existence of deepfakes lets genuine evidence be dismissed as fake, or fake evidence trusted as real.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 9 — Deepfake Detection',
    question: 'Distinguish between the two broad tracks in deepfake detection research, with one example technique from each.',
    modelAnswer: 'Track one, handcrafted features, has a researcher define the detection pattern in advance — for example, frequency-domain analysis, where a Fourier transform reveals grid-like GAN signatures. Track two, deep learning, has a model learn the difference directly from large volumes of labelled real and fake examples without an engineer specifying the exact artefact — for example, a CNN-based classifier such as XceptionNet or EfficientNet.',
    markScheme: [
      'Handcrafted features defined — researcher defines the pattern in advance (2)',
      'Handcrafted example given (e.g. frequency-domain/Fourier analysis, blur/blending-boundary, landmark inconsistency) (1)',
      'Deep learning defined — model learns the difference directly from labelled data (2)',
      'Deep learning example given (e.g. CNN/XceptionNet/EfficientNet, RNN/LSTM, ViT, capsule networks) (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Group 9 — Deepfake Detection',
    question: 'List four deep learning detection architectures covered in the notes.',
    items: [
      { name: 'CNN-based (XceptionNet, EfficientNet)', aliases: ['CNN'], explain: 'The standard baseline; a 5-model EfficientNet ensemble won the 2020 DFDC challenge.' },
      { name: 'RNN / LSTM temporal models', aliases: ['RNN', 'LSTM'], explain: 'Track how a face moves and changes across a sequence of frames, not just one image.' },
      { name: 'Vision Transformer (ViT)', aliases: ['ViT'], explain: 'Self-attention relates distant regions, e.g. a swapped face vs. the real neck.' },
      { name: 'Capsule networks', aliases: [], explain: 'Preserve part-to-whole facial relationships with far fewer parameters than a CNN.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 9 — Deepfake Detection',
    question: 'Explain how remote photoplethysmography (rPPG) detects deepfakes, and why it remains a durable defence.',
    modelAnswer: "rPPG measures tiny blood-flow-driven skin colour shifts that a generative model does not replicate, since those signals come from a real, living circulatory system rather than a learned visual pattern. Intel's FakeCatcher reports 96% accuracy internally using this approach, and DeepFakesON-Phys similarly uses heart-rate-derived features. Because generative models are not designed to reproduce this biological signal, rPPG-based detection is expected to stay durable even as generation methods otherwise improve.",
    markScheme: [
      'rPPG defined — measures blood-flow-driven skin colour shifts (2)',
      'Example tool named (Intel FakeCatcher or DeepFakesON-Phys) (1)',
      'Accuracy figure cited (96% internal, FakeCatcher) (1)',
      'Reason for durability — generative models are not designed to replicate biological signals (2)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Group 9 — Deepfake Detection',
    question: 'What does the 17-point accuracy gap of the 2020 DFDC-winning model (82% on its own test set vs 65% on unfamiliar clips) demonstrate about deepfake detection?',
    modelAnswer: "The 2020 DFDC-winning model scored 82% on the competition's own controlled test set but only 65% on entirely new, unfamiliar clips — a 17-point drop. This demonstrates that generalisation, not raw accuracy, is the harder problem in deepfake detection: a model can perform well on data resembling its training set while still failing badly against manipulation techniques it has not seen before. It is the central reason no detector generalises perfectly in the real world.",
    markScheme: [
      'Figures cited — 82% own test set, 65% unfamiliar clips (2)',
      'Conclusion — generalisation, not raw accuracy, is the harder problem (2)',
      'Implication — no detector generalises perfectly (1)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Group 9 — Deepfake Detection',
    question: "Outline Nigeria's current legal and institutional challenges in responding to deepfakes, and state two of the study's recommendations.",
    modelAnswer: "Nigeria has no dedicated deepfake law, relying instead on the Cybercrimes Act 2015. Enforcement capacity is limited — NITDA, the EFCC and the Police have limited capacity to handle AI-generated evidence — and a 2020 ECOWAS Court ruling went against a key section of the Cybercrimes Act. Public digital literacy is also low, leaving citizens poorly equipped to recognise fabricated media. Among the study's recommendations: amend the Cybercrimes Act to explicitly address AI-generated and manipulated media, and extend NITDA's platform accountability rules to require AI-content labelling.",
    markScheme: [
      'No dedicated deepfake law — reliant on the Cybercrimes Act 2015 (2)',
      'Limited NITDA/EFCC/Police capacity for AI-generated evidence (2)',
      '2020 ECOWAS Court ruling against a key section of the Cybercrimes Act (2)',
      'Low public digital literacy (1)',
      'Two recommendations named (2)',
    ],
  },

  {
    type: 'recall',
    marks: 9,
    source: 'Group 9 — Deepfake Detection',
    question: 'List the nine primary defenses against deepfake attacks recommended in the study.',
    items: [
      { name: 'Education & sensitisation', aliases: [], explain: 'Regularly train yourself, your family and your organisation to recognise deepfake red flags.' },
      { name: 'Healthy scepticism', aliases: [], explain: 'Treat urgent voice or video requests involving money with default suspicion; verify before acting.' },
      { name: 'Out-of-band verification', aliases: [], explain: 'Confirm sensitive requests through a separate, already-trusted channel.' },
      { name: 'Personal code words', aliases: [], explain: 'Agree a private code word with close family/colleagues that only they would know.' },
      { name: "Paraphrase, don't repeat", aliases: ['paraphrase'], explain: 'Rephrase sensitive details instead of reading them back verbatim, disrupting keyword-triggered interception.' },
      { name: 'Keep software patched', aliases: [], explain: 'Apply security updates promptly, since many attacks piggyback on separately-exploited vulnerabilities.' },
      { name: "Don't click unknown links", aliases: [], explain: 'Avoid opening links or emails from unverified senders — phishing is the most common entry point.' },
      { name: 'Verify app sources', aliases: [], explain: 'Only install apps from official, verified stores.' },
      { name: 'Use MFA & passkeys', aliases: ['multi-factor authentication'], explain: "Enable multi-factor authentication or passkeys everywhere, so a cloned voice or face alone can't pass a second factor." },
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Group 9 — Deepfake Detection',
    question: 'Explain the "liar\'s dividend" and its social cost.',
    modelAnswer: 'The "liar\'s dividend" is the effect by which the mere existence of deepfakes gives bad actors a plausible excuse to dismiss genuine, incriminating evidence as fabricated. Its social cost is a broader erosion of shared trust in recorded media generally — once any video or audio can plausibly be denied as fake, the evidentiary value of real recordings is undermined too.',
    markScheme: [
      "Liar's dividend defined — existence of deepfakes lets real evidence be dismissed as fake (2)",
      'Social cost — broader erosion of trust in recorded media (2)',
    ],
  },

];
