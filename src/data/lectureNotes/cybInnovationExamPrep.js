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
// ticks off against what they actually wrote.
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
// Coverage: groups 0–6, 8, 10 and 11 (the topics that carry lecture-note
// content). Groups 7 (Automated Vulnerability Research) and 9 (Deepfake
// Detection) are still placeholder titles with no notes and are not
// examinable yet — add questions here once those groups are written up.

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

  // ══════════════════════════════════════════════════════════════════
  //  Group 10 — Secure Access Service Edge (SASE)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 5,
    source: 'Group 10 — Secure Access Service Edge (SASE)',
    question: 'Define SASE and state who coined the term.',
    modelAnswer: 'Secure Access Service Edge (SASE, pronounced "sassy") is a cloud-native architecture that converges wide-area networking (SD-WAN) with a full stack of cloud-delivered security services into a single, identity-driven platform. The term was coined by Gartner in 2019.',
    markScheme: [
      'Defined — a cloud-native architecture converging SD-WAN with cloud-delivered security services into a single, identity-driven platform (3)',
      'Coined by Gartner in 2019 (1)',
      'Pronounced "sassy" (1)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Group 10 — Secure Access Service Edge (SASE)',
    question: 'List the five core building blocks of SASE.',
    items: [
      { name: 'SD-WAN', aliases: ['Software-Defined WAN'], explain: 'Intelligently routes traffic across MPLS, broadband, and LTE/5G based on application needs.' },
      { name: 'SWG', aliases: ['Secure Web Gateway'], explain: 'Inspects outbound web traffic, blocking malware and enforcing acceptable-use policy.' },
      { name: 'CASB', aliases: ['Cloud Access Security Broker'], explain: 'Governs sanctioned and shadow-IT SaaS usage; enforces data protection policy.' },
      { name: 'FWaaS', aliases: ['Firewall as a Service'], explain: 'Delivers next-gen firewall and intrusion prevention as a cloud service.' },
      { name: 'ZTNA', aliases: ['Zero Trust Network Access'], explain: 'Grants least-privilege, per-app access based on continuous verification.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 10 — Secure Access Service Edge (SASE)',
    question: 'Differentiate between single-vendor and multi-vendor SASE deployment models.',
    modelAnswer: 'Single-vendor SASE has one vendor deliver networking and the full security stack through a unified management console, giving simpler integration and consistent enforcement — the trade-off is greater dependency on that one vendor\'s roadmap. Multi-vendor (or managed) SASE combines best-of-breed SD-WAN and SSE components, or delivers them via a managed service provider, giving greater flexibility and avoiding vendor lock-in — the trade-off is added integration complexity.',
    markScheme: [
      "Single-vendor — one vendor delivers networking and security through a unified console; simpler integration but greater dependency on one vendor's roadmap (3)",
      'Multi-vendor/managed — best-of-breed or MSP-delivered components; greater flexibility, avoids lock-in, but adds integration complexity (3)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  Group 11 — Extended Detection and Response (XDR)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Group 11 — Extended Detection and Response (XDR)',
    question: 'Define XDR and differentiate it from EDR.',
    modelAnswer: 'Extended Detection and Response (XDR) is a unified security platform that gathers telemetry from endpoints, email, network, cloud, and identity, correlates events with AI, detects advanced threats, and automatically responds. EDR (Endpoint Detection and Response, from 2015+) protects individual devices only and uses AI to spot suspicious behaviour on that device. XDR (2020+) extends that detection and response across the whole environment, correlating data from all security tools for a unified response, rather than just one endpoint.',
    markScheme: [
      'XDR defined — a unified platform gathering telemetry from endpoints, email, network, cloud and identity, correlating with AI and responding automatically (3)',
      'Differentiated from EDR — EDR protects individual devices only; XDR extends detection and response across the whole environment, correlating data from all tools (3)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Group 11 — Extended Detection and Response (XDR)',
    question: 'List the six steps of the XDR process, in order.',
    items: [
      { name: 'Attack occurs', aliases: [], explain: 'A threat actor attempts to compromise the organisation through phishing, malware, stolen credentials, or network intrusion.' },
      { name: 'Data collection', aliases: [], explain: 'XDR collects telemetry across security domains — email, endpoint, identity, and network tools capture the suspicious activity.' },
      { name: 'Correlation', aliases: [], explain: 'The AI engine analyses the data and links related events into one attack chain.' },
      { name: 'Threat detection', aliases: [], explain: 'XDR confirms the attack pattern as a real threat, assigns a risk score, and creates an incident.' },
      { name: 'Investigation', aliases: [], explain: 'XDR traces the attack path, identifies affected systems, and determines the scope of compromise.' },
      { name: 'Automated response', aliases: [], explain: 'XDR responds by isolating devices, blocking IPs, revoking credentials, and quarantining malicious email.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Group 11 — Extended Detection and Response (XDR)',
    question: 'List and explain any three benefits of XDR.',
    modelAnswer: 'Faster threat detection — XDR correlates data across all domains instantly, identifying attack patterns that would be invisible to individual tools. Reduced alert fatigue — instead of hundreds of disconnected alerts, analysts receive prioritised, actionable incidents, reducing false positives. Faster incident response — automated response actions contain threats immediately, isolating devices, revoking credentials, and quarantining malicious files without human intervention.',
    markScheme: [
      'Faster threat detection — correlates data across all domains instantly, surfacing patterns invisible to individual tools (2)',
      'Reduced alert fatigue — prioritised, actionable incidents instead of hundreds of disconnected alerts (2)',
      'Faster incident response — automated actions isolate devices, revoke credentials, quarantine files without human intervention (2)',
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Group 11 — Extended Detection and Response (XDR)',
    question: 'List and explain any two challenges or limitations of XDR.',
    modelAnswer: 'Cost — XDR can be expensive to implement and maintain. Integration complexity — connecting XDR to existing security tools can be technically difficult.',
    markScheme: [
      'Cost — can be expensive to implement and maintain (2)',
      'Integration complexity — connecting XDR to existing security tools can be technically difficult (2)',
    ],
  },

];
