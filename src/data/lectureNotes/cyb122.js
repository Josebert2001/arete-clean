// UUY-CYB 122 — Principles and Practice of Information Security
// Lecture notes transcribed from "Principles and Practice of Information
// Security: Polished Master Study Guide" — a condensed, executive-summary
// style guide the department distributed for CYB 122 (the guide's own cover
// page mistypes the course code as "CTB 122").
//
// The source is already written as tight bullet points rather than prose, so
// these notes stay close to that register instead of padding it out. Six
// numbered sections map onto the guide's own six sections, numbered to match.
//
// `covers` / `partial` refer to 1-based indices in the course's `topics`
// array in courses.js. The guide gives solid, direct coverage of intrusion
// detection (topic 2) and partial coverage of access control as an OS
// protection mechanism (topic 1), formal security models via lattice-based
// MAC (topic 3), network perimeter defense (topic 5) and regulatory law
// (topic 8). It never reaches cryptography and steganography (topic 4),
// transfer of funds/e-voting security (topic 6) or secure application design
// (topic 7) — those three still need the textbook. Its opening foundations
// section (CIA triad, threat actors) and closing physical-security section
// are real content but sit outside the syllabus's eight topics entirely, so
// neither carries a coverage claim.
//
// The guide's one embedded illustration is a single wide image combining
// four unrelated mini-diagrams. It has been split at its own panel
// boundaries with an ad-hoc crop, then run through
// scripts/optimize-lecture-images.mjs, so each diagram sits beside the
// section it actually illustrates.
//
// Figures live in public/lecture-notes/cyb-122/.

const IMG = '/lecture-notes/cyb-122';

export const cyb122LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  1 — FOUNDATIONS OF INFORMATION SECURITY
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'Foundations of Information Security',
    sections: [
      {
        type: 'text',
        text: 'Information security is the protection of information and its critical elements — including the systems and hardware that use, store and transmit that information. Everything else in the course sits on top of this one idea: value lives in data, and data has to be defended wherever it is created, moved or held.',
      },
      {
        type: 'definition',
        heading: 'The Expanded Attributes of Information Security',
        text: 'Security is usually taught as the CIA triad — Confidentiality, Integrity, Availability — but a fuller list of attributes is needed to reason about end-to-end protection of an organisation’s digital assets.',
      },
      {
        type: 'table',
        headers: ['Attribute', 'Definition & Operational Significance'],
        rows: [
          ['Confidentiality', 'Ensuring that sensitive information is accessible exclusively to authorized individuals, preventing unauthorized disclosure.'],
          ['Integrity', 'Maintaining data consistency, completeness and uncorrupted state against accidental or malicious alteration.'],
          ['Availability', 'Guaranteeing that authorized users have timely and reliable access to information systems and resources when needed.'],
          ['Accuracy', 'Ensuring that data is free from errors and correctly reflects the reality it represents.'],
          ['Authenticity', 'Verifying that information, transactions and users are genuine and verifiable.'],
          ['Utility', 'Ensuring that information possesses practical value for organizational operations and decision-making.'],
          ['Possession', 'Maintaining rightful ownership and physical or logical control over information assets.'],
        ],
      },
      {
        type: 'image',
        src: `${IMG}/cia-triad-attributes.webp`,
        width: 870, height: 392, maxWidth: 560,
        alt: 'CIA triad at the centre with Confidentiality, Integrity, Availability, Accuracy, Authenticity, Utility and Possession branching from it',
        caption: 'Figure 1: The core triad and its four extended attributes.',
      },
      {
        type: 'text',
        heading: 'Threat Actors, Motives and Targets',
        text: 'Understanding who attacks systems and why is essential for effective risk management.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Primary motives for hackers', def: 'Financial gain, political objectives, fame and reputation, revenge, and intellectual curiosity.' },
          { term: 'Attacker targets', def: 'Data repositories, network communication channels, hardware and computer systems, and human personnel (social engineering vectors).' },
          { term: 'Threat agents', def: 'External hackers, malicious or careless insiders, competing entities, organized cybercriminals, and nation-state actors.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  2 — LEGAL, ETHICAL AND PROFESSIONAL FRAMEWORKS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2',
    title: 'Legal, Ethical and Professional Frameworks',
    partial: [8],
    sections: [
      {
        type: 'text',
        text: 'Information security operations do not happen in a vacuum — they operate within strict legal, ethical and organizational boundaries. Confusing these four categories is a common exam mistake.',
      },
      {
        type: 'termlist',
        heading: 'Core Distinctions',
        items: [
          { term: 'Ethics', def: 'Moral principles and rules of conduct guiding individual and collective behavior.' },
          { term: 'Professional standards', def: 'Expectations governing conduct within specialized fields.' },
          { term: 'Laws', def: 'Enforceable rules established by governing authorities.' },
          { term: 'Policies', def: 'Internal rules mandated by organizations.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Key Legislation in Information Security',
        items: [
          { term: 'Computer Fraud and Abuse Act (CFAA)', def: 'Criminalizes unauthorized access to protected computer systems.' },
          { term: 'Electronic Communications Privacy Act (ECPA)', def: 'Safeguards wire, oral and electronic communications against unauthorized interception.' },
          { term: 'HIPAA & GLBA', def: 'Mandate stringent privacy and security controls for healthcare and financial institutions respectively.' },
          { term: 'Sarbanes-Oxley Act (SOX)', def: 'Requires public corporations to maintain accurate financial records and internal controls.' },
        ],
      },
      {
        type: 'note',
        text: 'This is the closest the guide comes to syllabus item 8 (homeland cybersecurity policy and government regulation of IT), and only partially — CFAA/ECPA/HIPAA/GLBA/SOX are US federal statutes cited as examples of the kind of regulation that exists, not a treatment of homeland cybersecurity policy as a subject in its own right.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  3 — ACCESS CONTROL ARCHITECTURES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '3',
    title: 'Access Control Architectures',
    partial: [1, 3],
    sections: [
      {
        type: 'text',
        text: 'Access control determines how users and systems are authenticated, authorized and admitted into restricted environments and digital resources. It is one of the operating system’s core protection mechanisms.',
      },
      {
        type: 'termlist',
        heading: 'Access Control Models',
        items: [
          { term: 'Mandatory Access Control (MAC)', def: 'Uses rigorous data classification schemes where users and objects are assigned sensitivity and clearance levels. Lattice-based access control provides a mathematical formalization of these security levels.' },
          { term: 'Non-Discretionary Access Control (NAC)', def: 'Centrally managed and strictly enforced access control governed by organizational authorities — for example Role-Based Access Control (RBAC) or Task-Based Access Control.' },
          { term: 'Discretionary Access Control (DAC)', def: 'Implemented at the discretion of data owners, common in peer-to-peer and decentralized environments.' },
        ],
      },
      {
        type: 'note',
        text: 'Lattice-based MAC is the guide’s only brush with syllabus item 3 (formal models of security) — it names the idea without walking through a named model such as Bell-LaPadula, Biba or Clark-Wilson, so treat this as a pointer to go find those in the textbook, not a substitute for them.',
      },
      {
        type: 'definition',
        heading: 'The Four Pillars of Access Control',
        text: 'Every access control mechanism, regardless of model, is built from the same four steps in the same order.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Identification', def: 'A supplicant presents a unique identifier (ID) within the security domain.' },
          { term: 'Authentication', def: 'Validating the supplicant’s identity using one or more of three factors: something you know (passwords, PINs, passphrases), something you have (smart cards, ATM cards, hardware tokens), or something you are (biometrics — fingerprints, hand geometry, retinal scans, voice recognition).' },
          { term: 'Authorization', def: 'Matching authenticated entities against authorized resource access lists and group memberships.' },
          { term: 'Accountability (auditability)', def: 'Maintaining comprehensive system audit logs to attribute all user actions to verifiable identities, facilitating intrusion detection and forensic analysis.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/access-control-process.webp`,
        width: 900, height: 369, maxWidth: 620,
        alt: 'Access control process flow: Identification, then Authentication, then Authorization, then Accountability',
        caption: 'Figure 2: The four pillars in sequence — each step depends on the one before it.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  4 — PERIMETER DEFENSE AND FIREWALLS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '4',
    title: 'Perimeter Defense and Firewalls',
    partial: [5],
    sections: [
      {
        type: 'definition',
        heading: 'Firewalls',
        text: 'Protective network layers that inspect and restrict unauthorized data transfer between an untrusted external network (such as the Internet) and a trusted internal network. Firewalls can operate as dedicated hardware appliances, software modules running on routers or servers, or distributed network perimeters.',
      },
      {
        type: 'note',
        text: 'This is a single-paragraph mention, not a treatment of network and distributed system security (syllabus item 5) — it names firewalls as one perimeter control without covering the wider distributed-systems threat model the syllabus item implies.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  5 — INTRUSION DETECTION AND PREVENTION SYSTEMS (IDPS)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '5',
    title: 'Intrusion Detection and Prevention Systems (IDPS)',
    covers: [2],
    sections: [
      {
        type: 'text',
        text: 'Intrusion Detection and Prevention Systems monitor network and system activities for malicious violations or policy breaches.',
      },
      {
        type: 'termlist',
        heading: 'IDS vs. IPS',
        items: [
          { term: 'IDS (Intrusion Detection System)', def: 'Detects violations and generates passive alarms (audible or visual) — it observes and reports but does not act.' },
          { term: 'IPS (Intrusion Prevention System)', def: 'Actively intercepts and blocks malicious traffic in real time.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Alarm Classifications',
        items: [
          { term: 'True attack stimulus', def: 'An actual attack or authorized test drill triggering a correct IDPS response.' },
          { term: 'False positive', def: 'An alarm triggered in the absence of an actual attack.' },
          { term: 'False negative', def: 'The failure of an IDPS to detect an actual attack — the most grievous security failure, since the organization has no idea it happened.' },
          { term: 'Noise', def: 'Accurate but low-threat alerts generated by unsuccessful attacks or normal operational anomalies.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/idps-concepts.webp`,
        width: 839, height: 392, maxWidth: 620,
        alt: 'IDPS decision tree: an attack stimulus reaches the IDPS, which then classifies outcomes as True Positive, False Negative, False Positive or True Negative depending on whether an attack actually occurred',
        caption: 'Figure 3: How the same alarm is classified depending on ground truth — did an attack actually happen?',
      },
      {
        type: 'note',
        text: 'Cross-reference the figure against the term list: "actual attack" down the True Positive branch is the system working; "actual attack" down the False Negative branch is the system failing silently. The label on the branch only tells you what really happened, not what the IDPS reported — you have to read both halves of each pair.',
      },
      {
        type: 'bullets',
        heading: 'Detection Methodologies',
        items: [
          'Signature-based detection — matches traffic against a database of known attack patterns.',
          'Statistical anomaly-based detection — flags deviation from an established baseline of normal behaviour.',
          'Stateful protocol analysis — compares observed protocol behaviour against vendor-defined profiles of benign protocol activity.',
          'Logged file monitors — reviews system and application logs after the fact for evidence of a violation.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  6 — PHYSICAL SECURITY
  // ─────────────────────────────────────────────────────────────────
  {
    number: '6',
    title: 'Physical Security',
    sections: [
      {
        type: 'text',
        text: 'Physical security encompasses the design, implementation and maintenance of countermeasures protecting physical resources, including people, hardware, and supporting facility infrastructure. It is real security content the guide covers well, but it does not correspond to any of this course’s eight syllabus topics — treat it as useful background rather than examinable coverage of a specific item.',
      },
      {
        type: 'bullets',
        heading: 'The Seven Major Sources of Physical Loss',
        items: [
          'Extreme temperatures — excessive heat or cold affecting equipment reliability.',
          'Gases and commercial vapours — corrosive or hazardous atmospheric agents.',
          'Liquids — water leaks, chemical spills, and humidity damage.',
          'Living organisms — pests and biological contamination.',
          'Projectiles — tangible objects in motion and pressurized media.',
          'Movement — collapses, severe vibrations, and structural shifts.',
          'Energy anomalies — electrical surges, power sags, and complete outages.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Layered Physical Security Controls',
        items: [
          { term: 'General management', def: 'Exterior facility security, building access control, and fire protection systems.' },
          { term: 'IT management', def: 'Server room environmental monitoring, temperature, and humidity regulation.' },
          { term: 'InfoSec management', def: 'Risk assessments and security audit reviews.' },
          { term: 'Physical controls', def: 'Walls, fences, gates, locks, man-traps, guards, electronic monitoring, and alarms.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/physical-security-layers.webp`,
        width: 387, height: 392, maxWidth: 320,
        alt: 'Physical security layers stacked: General Management, then IT Management, then InfoSec Management',
        caption: 'Figure 4: Physical security as three organizational layers, from facility-wide down to risk assessment.',
      },
    ],
  },
];
