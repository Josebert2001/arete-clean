// UUY-CYB 122 — Principles and Practice of Information Security
//
// This file draws on two distinct sources, kept in two blocks so their
// provenance stays visible:
//
// Sections 1–6 — the department's "Principles and Practice of Information
// Security: Polished Master Study Guide", a condensed, executive-summary
// style guide (the guide's own cover page mistypes the course code as
// "CTB 122"). Already written as tight bullet points, so these notes stay
// close to that register instead of padding it out. Six numbered sections
// map onto the guide's own six sections, numbered to match.
//
// Sections 7–12 — the lecturer's actual combined lecture-slide deck for
// Lectures 1–4 ("CYB122_Combined_Lecture_Notes_with_diagrams.docx"),
// transcribing Chapters 1–4 of the course's assigned textbook (Whitman &
// Mattord, "Principles of Information Security", 4th ed.: Introduction,
// The Need for Security, Legal/Ethical/Professional Issues, and Risk
// Management). This is the primary classroom material for those four
// chapters — more detailed and more authoritative than the guide's own
// coverage of the same ground — so where the two overlap (the CIA triad,
// law vs. ethics) the guide's version is left as the shorter first pass
// and the lecture sections are the fuller treatment.
//
// `covers` / `partial` refer to 1-based indices in the course's `topics`
// array in courses.js. Across both sources, the notes give solid, direct
// coverage of intrusion detection (topic 2, §5) and homeland
// cybersecurity policy/regulation (topic 8, §11 — the guide's own §2 is a
// shorter, partial pass at the same topic), and partial coverage of access
// control as an OS protection mechanism (topic 1, §3), formal security
// models (topic 3 — lattice-based MAC in §3, the McCumber Cube in §7),
// network and distributed system security (topic 5 — covers, via §10's
// attack methods, well beyond the guide's one-paragraph firewall mention
// in §4) and secure application design (topic 7, §10's programming-errors
// coverage). Nothing here reaches cryptography and steganography (topic 4)
// or transfer of funds/e-voting security (topic 6) — those two still need
// the textbook. The guide's physical-security section (§6) and the
// lecture deck's history, SDLC/roles and risk-management sections
// (§7–§8, §12) are real content but sit outside the syllabus's eight
// topics entirely, so none of them carries a coverage claim.
//
// The guide's one embedded illustration is a single wide image combining
// four unrelated mini-diagrams. It has been split at its own panel
// boundaries with an ad-hoc crop. The lecture deck's diagrams were
// extracted directly from its embedded images via mammoth, with one
// (the risk-identification flowchart) cropped to drop a stray empty
// placeholder box left over from the source slide. All of them were then
// run through scripts/optimize-lecture-images.mjs, so each diagram sits
// beside the section it actually illustrates.
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
        text: 'This is only a partial pass at syllabus item 8 (homeland cybersecurity policy and government regulation of IT) — CFAA/ECPA/HIPAA/GLBA/SOX are US federal statutes cited as examples of the kind of regulation that exists, not a treatment of homeland cybersecurity policy as a subject in its own right. Section 11 below, transcribed from the lecturer\'s actual Legal/Ethical/Professional Issues lecture, covers this topic in full — international law bodies, professional organizations and the federal agencies (DHS, NSA, Secret Service) that carry it out.',
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
        text: 'This is a single-paragraph mention, not a treatment of network and distributed system security (syllabus item 5) — it names firewalls as one perimeter control without covering the wider distributed-systems threat model the syllabus item implies. Section 10 below, transcribed from the lecturer\'s Need for Security lecture, covers this topic properly — the TCP handshake, spoofing, scanning, denial of service, sniffing and man-in-the-middle attacks that firewalls and other perimeter controls actually defend against.',
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

  // ═════════════════════════════════════════════════════════════════
  //  FROM THE LECTURER'S SLIDE DECK — LECTURES 1–4
  //  (Whitman & Mattord, "Principles of Information Security", 4th ed.)
  // ═════════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────────
  //  7 — HISTORY AND THE FORMAL SECURITY MODEL (Lecture 1, part 1)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '7',
    title: 'History of Information Security and the CNSS Model',
    partial: [3],
    sections: [
      {
        type: 'text',
        text: '"Do not figure on opponents not attacking; worry about your own lack of preparation." — Book of the Five Rings. Chapter 1 of the assigned textbook opens with this epigraph before defining information security as "a well-informed sense of assurance that the information risks and controls are in balance" (Jim Anderson, Inovant, 2002).',
      },
      {
        type: 'image',
        src: `${IMG}/components-of-infosec.webp`,
        width: 471, height: 252, maxWidth: 460,
        alt: 'A flashlight labelled "Information security" illuminating three overlapping ovals — network security, computer & data security, and management of information security — with Policy at their shared intersection',
        caption: 'Figure 1-1: Information security is the overlap of network security, computer & data security, and the management of information security, unified by policy.',
      },
      {
        type: 'bullets',
        heading: 'The History of Information Security',
        items: [
          'World War II — began as physical controls defending mainframes against theft, espionage and sabotage while they ran code-breaking computations.',
          '1960s — the Advanced Research Project Agency (ARPA) examined redundant networked communication; Larry Roberts developed ARPANET to link 17 research centres for $3.4M. ARPANET is the direct predecessor of the Internet.',
          '1970s–80s — as ARPANET grew, its fundamental weaknesses surfaced: individual remote sites were unsecured, password structures were vulnerable, dial-up connections had no safety procedures, and there was no real user identification or authorization.',
          'Rand Report R-609 — the paper that started the formal study of computer security, expanding its scope from physical security alone to include the safety of data, limiting unauthorized access, and involving personnel at every organizational level.',
          'MULTICS — the first operating system built with security as its primary design goal (GE, Bell Labs and MIT, mid-1960s). Several of its key developers went on to create UNIX once microprocessors reduced the mainframe\'s dominance in the late 1970s — and expanded the attack surface in the process.',
          '1990s — networked computers became common and the Internet became the first true "network of networks," built on de facto standards that treated security as a low priority.',
          '2000–present — with millions of networks interconnected, an organization\'s ability to secure its own data now depends on the security of every network it connects to.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/total-vulnerabilities-chart.webp`,
        width: 690, height: 316, maxWidth: 560,
        alt: 'Bar chart of total vulnerabilities identified per year, 2006 to 2011, ranging from about 4,600 to 6,250',
        caption: 'Figure D.1: Total vulnerabilities identified, 2006–2011 (Symantec.cloud).',
      },
      {
        type: 'definition',
        heading: 'The CNSS Security Model (the McCumber Cube)',
        text: 'A cube built from three axes: the C.I.A. triad (Confidentiality, Integrity, Availability) on one edge, the three states information can be in (Storage, Processing, Transmission) on another, and the three tools used to secure it (Policy, Education, Technology) on the third. Every one of its 27 cells represents a distinct combination of "which property, in which state, protected by which means" — a way to check that a security programme has no blind spot in that 3-D space.',
      },
      {
        type: 'image',
        src: `${IMG}/mccumber-cube.webp`,
        width: 649, height: 269, maxWidth: 560,
        alt: 'The McCumber Cube: a 3x3x3 cube with axes Confidentiality/Integrity/Availability, Storage/Processing/Transmission, and Policy/Education/Technology',
        caption: 'Figure 1-6: The McCumber Cube, a formal model of information security.',
      },
      {
        type: 'note',
        text: 'This is the course\'s clearest example of syllabus item 3 (formal models of security) — a fully named, structured model, unlike the guide\'s brief mention of lattice-based MAC in Section 3. It still doesn\'t reach Bell-LaPadula, Biba or Clark-Wilson, so keep the textbook nearby for those.',
      },
      {
        type: 'text',
        heading: 'Computer as Subject and Object of an Attack',
        text: 'A computer used to actively carry out an attack is the subject of that attack; the system on the receiving end being attacked is the object. The same machine can play either role at different times.',
      },
      {
        type: 'image',
        src: `${IMG}/subject-object-of-attack.webp`,
        width: 421, height: 187, maxWidth: 420,
        alt: 'Diagram: a hacker at a computer (subject of an attack) sends a request over the Internet to a remote server (object of an attack), which returns stolen information',
        caption: 'Figure 1-5: Computer as the subject and object of an attack.',
      },
      {
        type: 'bullets',
        heading: 'Components of an Information System',
        items: [
          'An information system (IS) is the entire set of components an organization needs to use information as a resource: Software, Hardware, Data, People, Procedures, and Networks — securing "the system" means securing all six, not just the software and hardware.',
        ],
      },
      {
        type: 'definition',
        heading: 'Balancing Information Security and Access',
        text: 'Perfect security is impossible to obtain — it is a continuous process, not an absolute state. Every organization has to balance protection against availability: enough access control to defend against real threats, without making the system too inconvenient for legitimate users to actually use.',
      },
      {
        type: 'image',
        src: `${IMG}/balancing-security-access.webp`,
        width: 550, height: 349, maxWidth: 480,
        alt: 'A balance scale: "Security" (a CISO quote about needing encryption) on one side, "Access" (two users complaining that encrypting e-mail is a hassle and slows them down) on the other',
        caption: 'Figure 1-8: Balancing information security and access.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  8 — IMPLEMENTING SECURITY: APPROACH, THE SDLC, AND ROLES (Lecture 1, part 2)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '8',
    title: 'Implementing Information Security: Approach, the SDLC and Professional Roles',
    sections: [
      {
        type: 'termlist',
        heading: 'Two Approaches to Implementation',
        items: [
          { term: 'Bottom-up', def: 'A grassroots effort driven by systems administrators. Its advantage is the technical expertise of the people doing the work, but it seldom succeeds — it lacks participant support from above and organizational staying power.' },
          { term: 'Top-down', def: 'Initiated by upper management, who issue policy, dictate goals and determine accountability. The most successful approach, because it follows a formal development strategy — the systems development life cycle.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/top-down-bottom-up-approach.webp`,
        width: 647, height: 348, maxWidth: 560,
        alt: 'Organizational pyramid from CEO down to security/systems/network tech staff, with a top-down approach arrow from CEO downward and a bottom-up approach arrow from tech staff upward',
        caption: 'Figure 1-9: Approaches to information security implementation.',
      },
      {
        type: 'definition',
        heading: 'The Systems Development Life Cycle (SDLC)',
        text: 'A methodology — a formal, structured approach to problem solving — for designing and implementing an information system. Using one increases the probability of success over ad-hoc development. The traditional SDLC has six phases, each ending in a feasibility check before the next begins.',
      },
      {
        type: 'image',
        src: `${IMG}/sdlc-waterfall.webp`,
        width: 429, height: 256, maxWidth: 420,
        alt: 'SDLC waterfall: Investigation, Analysis, Logical Design, Physical Design, Implementation, Maintenance and Change, looping back to Investigation when the system is no longer viable',
        caption: 'Figure 1-10: The SDLC waterfall methodology.',
      },
      {
        type: 'table',
        heading: 'The Security SDLC (SecSDLC) — the Same Six Phases, Security-Specific',
        headers: ['Phase', 'What it means for information security'],
        rows: [
          ['Investigation', 'Begins with the Enterprise Information Security Policy (EISP); an organizational feasibility analysis is performed.'],
          ['Analysis', 'Studies documents from Investigation: existing security policies, documented threats and controls, and relevant legal issues. Risk management work begins here.'],
          ['Logical Design', 'Creates the blueprint for information security and plans incident response: continuity planning, incident response, and disaster recovery.'],
          ['Physical Design', 'Evaluates and selects the actual security technology; a feasibility study checks the organization\'s readiness for the project.'],
          ['Implementation', 'Security solutions are acquired, tested, and tested again before the whole package goes to management for final approval.'],
          ['Maintenance and Change', 'Arguably the most important phase, given a constantly changing threat environment — a continuous duel with an unseen adversary as new threats emerge and old ones evolve.'],
        ],
      },
      {
        type: 'termlist',
        heading: 'Security Professionals and Roles',
        items: [
          { term: 'Chief Information Officer (CIO)', def: 'The senior technology officer, primarily responsible for advising senior executives on strategic planning.' },
          { term: 'Chief Information Security Officer (CISO)', def: 'Responsible for the assessment, management and implementation of information security in the organization; usually reports directly to the CIO.' },
          { term: 'Information Security Project Team', def: 'Champion, team leader, security policy developers, risk assessment specialists, security professionals, systems administrators, and end users — each contributing a different facet of technical and non-technical expertise.' },
          { term: 'Data owner', def: 'Responsible for the security and use of a particular set of information.' },
          { term: 'Data custodian', def: 'Responsible for the storage, maintenance and protection of that information.' },
          { term: 'Data users', def: 'The end users who work with the information to do their jobs.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Is Information Security an Art or a Science?',
        items: [
          { term: 'Security as art', def: 'There are no hard and fast rules, and no single manual for securing an entire system end to end.' },
          { term: 'Security as science', def: 'Technology is designed to behave under specific, knowable conditions — nearly every fault or security hole results from a specific interaction of hardware and software that, given enough time, developers could resolve.' },
          { term: 'Security as social science', def: 'Security begins and ends with the people who interact with the system; understanding user behaviour lets administrators reduce risk and build more usable, more supportable security profiles.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  9 — THREATS TO INFORMATION SECURITY (Lecture 2, part 1)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '9',
    title: 'Threats to Information Security',
    sections: [
      {
        type: 'text',
        text: '"Information security\'s primary mission is to ensure that systems and their contents remain the same." Protecting an organization\'s information starts with knowing what needs protecting and knowing the threats it faces — a 2009 Computer Security Institute survey found 64% of organizations reporting malware infections and 14% reporting outsider penetration, with an average loss of $234K per respondent. As Robert Seacord put it: "Computer systems are not vulnerable to attack. We are vulnerable to attack through our computer systems."',
      },
      {
        type: 'table',
        heading: 'Categories of Threat',
        headers: ['Category', 'Examples'],
        rows: [
          ['Compromises to intellectual property', 'Piracy, copyright infringement'],
          ['Software attacks', 'Viruses, worms, macros, denial of service'],
          ['Deviations in quality of service', 'ISP, power, or WAN service issues from providers'],
          ['Espionage or trespass', 'Unauthorized access and/or data collection'],
          ['Forces of nature', 'Fire, flood, earthquake, lightning'],
          ['Acts of human error or failure', 'Accidents, employee mistakes'],
          ['Information extortion', 'Blackmail or threatened information disclosure'],
          ['Deliberate acts of theft', 'Illegal confiscation of equipment or information'],
          ['Missing/inadequate/incomplete IS', 'Loss of access to data through disk failure with no backup plan'],
          ['Missing/inadequate/incomplete controls', 'Network compromised because no firewall controls exist'],
          ['Sabotage or vandalism', 'Destruction of systems or information'],
          ['Theft', 'Illegal confiscation of equipment, information, or intellectual property'],
          ['Technical hardware failures or errors', 'Equipment failure'],
          ['Technical software failures or errors', 'Bugs, code problems, unknown loopholes'],
          ['Technological obsolescence', 'Antiquated or outdated technologies'],
        ],
      },
      {
        type: 'termlist',
        heading: 'Malware',
        items: [
          { term: 'Virus', def: 'A segment of code that attaches itself to an existing program, takes control of that program\'s access, and replicates.' },
          { term: 'Worm', def: 'A malicious program that replicates constantly and, unlike a virus, doesn\'t need another program to do it — it can spread with or without the user downloading anything.' },
          { term: 'Trojan horse', def: 'Hides its true nature and only reveals its designed behaviour once activated.' },
          { term: 'Back door / trap door', def: 'Allows access to a system at will, with special privileges, bypassing normal controls.' },
          { term: 'Polymorphic malware', def: 'Changes its apparent shape over time, so it evades detection techniques that look for a fixed, preconfigured signature.' },
          { term: 'Hoax', def: 'A false warning, often forwarded in good faith, that wastes time and can trick users into damaging their own systems.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Threat Agents',
        items: [
          { term: 'Expert hackers', def: 'Develop their own software scripts and program exploits.' },
          { term: 'Novice hackers / script kiddies', def: 'Use software and exploits someone else already wrote.' },
          { term: 'Packet monkeys', def: 'Use automated exploit tools without necessarily understanding how they work.' },
          { term: 'Crackers', def: 'Remove or crack software protection designed to prevent unauthorized duplication.' },
          { term: 'Phreakers', def: 'Use public telephone networks to make calls without paying for them.' },
        ],
      },
      {
        type: 'note',
        text: 'Intellectual property (trade secrets, copyrights, trademarks, patents) is watched over by two agencies — the Software and Information Industry Association and the Business Software Alliance — because software piracy is the most common breach: roughly a third of all software in use is estimated to be pirated.',
      },
      {
        type: 'bullets',
        heading: 'Forces of Nature',
        items: [
          'Fire, flood, earthquake, lightning, tornado, tsunami, hurricane/typhoon, landslide/mudslide, electrostatic discharge, dust contamination.',
          'Among the most dangerous threats precisely because they are unexpected and strike with little or no warning.',
        ],
      },
      {
        type: 'note',
        text: 'Acts of human error or failure — mistakes made without malicious intent by an organization\'s own employees, who sit closest to the data — are described in the lecture as the greatest single threat to organizational information security. Prevention leans on training and ongoing awareness, plus controls such as requiring a critical command to be typed twice for verification.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  10 — NETWORK ATTACKS AND SECURE PROGRAMMING (Lecture 2, part 2)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '10',
    title: 'Network Attack Methods and Secure Programming',
    covers: [5],
    partial: [7],
    sections: [
      {
        type: 'definition',
        heading: 'Password Cracking',
        text: 'The design of network infrastructure and communication protocols is itself a major contributor to attack surface. The two classic password-cracking techniques are brute force (trying every possibility) and dictionary attacks (trying likely words first).',
      },
      {
        type: 'text',
        heading: 'The TCP Three-Way Handshake and the Half-Open Socket Problem',
        text: 'A normal TCP connection opens with three steps: the client sends SYN, the server replies SYN-ACK and opens a communication port, and the client replies ACK to establish the connection. The server trusts the client that started the handshake — so if the final ACK never arrives, the server is left with a half-open socket. As long as that half-open port stays open, an intruder can walk in through it.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-three-way-handshake.webp`,
        width: 1400, height: 622, maxWidth: 680,
        alt: 'TCP three-way handshake: client sends SYN, server responds SYN-ACK and creates a communication port, client responds ACK to establish the connection',
        caption: 'The TCP three-way handshake — client and server establishing a connection.',
      },
      {
        type: 'termlist',
        heading: 'Methods of Attack',
        items: [
          { term: 'IP spoofing', def: 'The source IP address on data packets is altered and replaced with a bogus address.' },
          { term: 'SYN spoofing', def: 'The server is overwhelmed by a flood of spoofed SYN packets, exploiting the half-open socket problem above.' },
          { term: 'Scanning', def: 'Determines which ports on a target are open and can be used for entry.' },
          { term: 'Denial of service (e.g. Smurf)', def: 'Sends a large volume of spoofed ping packets to overwhelm the system and stop it responding.' },
          { term: 'Spam / mail bombing', def: 'Floods a target with unwanted or excessive e-mail traffic.' },
          { term: 'Sniffing', def: 'Monitors data travelling over a network — packet sniffing has both legitimate (diagnostic) and illegitimate uses.' },
        ],
      },
      {
        type: 'text',
        heading: 'Man-in-the-Middle',
        text: 'The attacker sniffs packets from the network, modifies them, and re-inserts them — letting them eavesdrop, change, delete, reroute, add, or divert data in transit. A variant intercepts an encryption-key exchange.',
      },
      {
        type: 'image',
        src: `${IMG}/man-in-the-middle-attack.webp`,
        width: 1400, height: 749, maxWidth: 620,
        alt: 'Man-in-the-middle diagram: Alice and Bob attempt to message each other directly, but Joe intercepts, reads, and alters the messages passing between them, and each of them thinks they are talking to the other',
        caption: 'Man-in-the-middle: Joe intercepts and alters messages Alice and Bob believe are going directly to each other.',
      },
      {
        type: 'note',
        text: 'This is a real, sustained treatment of syllabus item 5 (network and distributed system security) — the TCP handshake, IP/SYN spoofing, scanning, denial of service and man-in-the-middle attacks are the actual mechanics the guide\'s single-paragraph firewall mention (Section 4) only gestures at.',
      },
      {
        type: 'definition',
        heading: 'Programming Errors and Buffer Overflows',
        text: 'Former DHS National Cyber Security Division director Amit Yoran: "only by improving the quality of our software and reducing the number of flaws can we hope to be successful in our security efforts." Software can be correct without being secure — there\'s a real imbalance between developers\' resources and attackers\' resources. An estimated 95% of software security bugs trace back to just 19 common, well-understood programming mistakes.',
      },
      {
        type: 'bullets',
        items: [
          'CERT Coordination Center published 22 security advisories between January and August 2003; 9 of them were directly related to buffer overflow.',
          'The root of a buffer overflow: an application writes beyond its array bounds, corrupting the stack — which can let an attacker specify their own control information.',
          'A related failure mode is a mismatch in process rates between two communicating entities, where more data is sent to a buffer than it can handle.',
          'Some languages are more exposed than others — C++ is especially vulnerable to buffer overflows; Java considerably less so.',
        ],
      },
      {
        type: 'text',
        heading: 'Timing Attacks',
        text: 'Explores the contents of a web browser\'s cache. A malicious cookie stored on the client\'s system can let its designer collect information about how to access password-protected sites.',
      },
      {
        type: 'note',
        text: 'The programming-errors material above is the course\'s only real touch on syllabus item 7 (secure application design) — it explains why insecure code happens (buffer overflows, language choice) without walking through secure design practices themselves, so treat it as a partial pointer rather than full coverage.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  11 — LEGAL, ETHICAL AND REGULATORY LANDSCAPE (Lecture 3)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '11',
    title: 'Legal, Ethical and Regulatory Landscape',
    covers: [8],
    sections: [
      {
        type: 'termlist',
        heading: 'Organizational Liability and the Need for Counsel',
        items: [
          { term: 'Liability', def: 'An organization\'s legal obligation extending beyond criminal or contract law to include restitution. If an employee — authorized or not — performs an illegal or unethical act that causes harm, the employer can be held financially liable.' },
          { term: 'Due care', def: 'The organization makes sure every employee knows what is acceptable and unacceptable, and knows the consequences of illegal or unethical actions.' },
          { term: 'Due diligence', def: 'Making a valid effort to protect others, and maintaining that effort over time — not just a one-off gesture.' },
          { term: 'Jurisdiction', def: 'A court\'s right to hear a case where a wrong was committed. The term "long arm" describes jurisdiction extending across a country or around the world — relevant the moment an organization does business on the Internet.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Policy vs. Law',
        text: 'Policies are internal guidelines describing acceptable and unacceptable employee behaviour — they function as an organization\'s own laws, with their own penalties, judicial practices and sanctions. The key difference: ignorance of policy is acceptable as a defence, ignorance of law is not. For a policy to be enforceable it needs dissemination, review, comprehension, compliance, and uniform enforcement.',
      },
      {
        type: 'termlist',
        heading: 'Types of Law',
        items: [
          { term: 'Civil law', def: 'Governs the affairs of a nation or state.' },
          { term: 'Criminal law', def: 'Addresses activities and conduct harmful to the public.' },
          { term: 'Private law', def: 'Covers family, commercial and labor matters, and the relationship between individuals and organizations.' },
          { term: 'Public law', def: 'Regulates the structure and administration of government agencies and their relationships with citizens, employees and other governments.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'International Law and Legal Bodies',
        items: [
          { term: 'Council of Europe Convention on Cybercrime', def: 'An international task force working to standardize technology law across borders and improve international investigations into technology-law breaches — not without controversy from free-speech and civil-liberties advocates.' },
          { term: 'TRIPS (Trade-Related Aspects of Intellectual Property Rights)', def: 'Created by the World Trade Organization; the first significant international effort to protect intellectual property rights, covering how existing IP agreements apply, how to enforce them domestically, and how to settle disputes between WTO members.' },
          { term: 'Digital Millennium Copyright Act (DMCA)', def: 'The American contribution to WTO-aligned copyright protection — the UK has its own version (Database Right). Prohibits circumventing copy protections, manufacturing or trafficking in circumvention devices, and altering embedded copyright information, while shielding ISPs from certain contributory-infringement claims.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Major IT Professional Organizations',
        items: [
          { term: 'Association of Computing Machinery (ACM)', def: '"The world\'s first educational and scientific computing society" — strongly promotes education and offers student discounts.' },
          { term: '(ISC)² — International Information Systems Security Certification Consortium', def: 'A nonprofit that develops and administers information security certifications and maintains a body of knowledge for the field.' },
          { term: 'ISACA — Information Systems Audit and Control Association', def: 'Focused on auditing, control and security, with both technical and managerial members; not exclusively an information-security body but has strong security components.' },
          { term: 'ISSA — Information Systems Security Association', def: 'A nonprofit bringing together information security practitioners for information exchange and education, focused on "promoting management practices that will ensure the confidentiality, integrity, and availability of organizational information resources."' },
          { term: 'SANS — Systems Administration, Networking, and Security Institute', def: 'A professional research and education cooperative with over 156,000 members — security professionals, auditors, and systems/network administrators — offering its own set of certifications.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'US Federal Agencies',
        items: [
          { term: 'Department of Homeland Security (DHS)', def: 'Protects the people and the physical and informational assets of the United States across five directorates, including the Directorate of Information and Infrastructure (discovering and responding to attacks on national information systems) and the Directorate of Science and Technology (R&D in support of homeland defense).' },
          { term: 'National InfraGard Program', def: 'Each FBI field office runs a local chapter linking public, private and academic partners — maintaining an encrypted intrusion-alert network, a secure site for reporting suspicious activity, local chapter events, and a help desk.' },
          { term: 'National Security Agency (NSA)', def: '"The nation\'s cryptologic organization" — coordinates and performs specialized activities protecting US information systems and producing foreign intelligence, and is a major centre for foreign-language analysis.' },
          { term: 'US Secret Service', def: 'Housed in the Department of the Treasury; charged with detecting and arresting anyone committing a federal offense related to computer fraud or false identification.' },
        ],
      },
      {
        type: 'note',
        text: 'This section is the course\'s fullest, most direct treatment of syllabus item 8 (homeland cybersecurity policy and government regulation of information technology) — where Section 2\'s guide-based coverage lists a handful of US statutes as examples, this lecture actually works through the international bodies, professional organizations and federal agencies that make up that regulatory landscape. It is still US-centric by design (the textbook is American), so Nigeria\'s own National Cybersecurity Policy — mentioned in this course\'s study tips — is worth reading alongside it for the local equivalent.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  12 — RISK MANAGEMENT (Lecture 4)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '12',
    title: 'Risk Management',
    sections: [
      {
        type: 'termlist',
        heading: 'The Three Stages of Risk Management',
        items: [
          { term: 'Risk identification', def: 'The process of examining and documenting the security posture of an organization\'s information technology and the risks it faces.' },
          { term: 'Risk assessment', def: 'Determining the extent to which the organization\'s information assets are exposed, or at risk.' },
          { term: 'Risk control', def: 'Applying controls to reduce the risks to an organization\'s data and information systems.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/risk-management-overview.webp`,
        width: 1400, height: 672, maxWidth: 680,
        alt: 'Risk management overview: Risk Identification (identify/inventory assets, classify/prioritize assets, identify/prioritize threats), Risk Assessment (identify vulnerabilities between assets and threats, quantify asset exposure), Risk Control (select strategy, justify controls, implement and monitor controls)',
        caption: 'The three stages of risk management, each broken into its component steps.',
      },
      {
        type: 'image',
        src: `${IMG}/risk-identification-components.webp`,
        width: 470, height: 378, maxWidth: 420,
        alt: 'Flowchart: plan and organize the process, categorize system components, inventory and categorize assets, classify and prioritize assets, identify and prioritize threats, specify asset vulnerabilities — with feedback arrows looping back to earlier steps',
        caption: 'Risk identification as an iterative process — later steps feed back into earlier ones.',
      },
      {
        type: 'termlist',
        heading: 'Identifying and Valuing Assets',
        items: [
          { term: 'People', def: 'Recorded by position name/number rather than personal name where possible — trusted employees, other staff, and non-employees.' },
          { term: 'Procedures', def: 'Recorded by intended purpose, relationship to software/hardware/network elements, and storage location.' },
          { term: 'Data', def: 'Recorded by owner, creator, manager, size, structure, location, backup procedure, and on/offline status.' },
          { term: 'Hardware, software and network components', def: 'Recorded by name, IP address, MAC address, element type, device class/OS/capacity, serial number, manufacturer and model, version/revision, and physical and logical location.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Determining an Asset\'s Value',
        items: [
          'Cost of creating the asset, and cost retained from its past maintenance.',
          'Cost implied by having to replace it if lost.',
          'Value it provides — to its owners, as intellectual property, and (worth remembering) its value to adversaries too.',
          'Weighted factor analysis scores each asset 0.1–1.0 against critical factors (impact to revenue, profitability, public image), each factor separately weighted 1–100, then multiplied and summed to rank assets by importance.',
        ],
      },
      {
        type: 'definition',
        heading: 'The Risk Assessment Formula',
        text: 'Risk = (likelihood of a vulnerability occurring × value of the information asset) − (% of risk already mitigated by current controls) + (uncertainty in the current knowledge of the vulnerability). Likelihood is a number between 0.1 and 1; asset value is typically scored 1–100, where 100 would mean an asset whose loss could stop company operations entirely.',
      },
      {
        type: 'casestudy',
        title: 'Worked Example: Risk Rating',
        prompt: 'Asset A has a value score of 50 and one vulnerability, with a likelihood of 1.0 and no current controls in place. The assumptions and data behind the estimate are judged 90% accurate.',
        tasks: [
          'Base exposure: 50 × 1.0 = 50.',
          'Subtract risk already mitigated by controls: controls address 0% of the risk, so subtract 0.',
          'Add uncertainty: 10% of 50 is 5, so add 5.',
          'Risk rating for Asset A = 50 − 0 + 5 = 55.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Worked Example: Two Vulnerabilities on One Asset',
        prompt: 'Asset B has a value score of 100 and two vulnerabilities. Vulnerability 2 has a likelihood of 0.5, and current controls address 50% of its risk; the estimate is 20% uncertain. Vulnerability 3 has a likelihood of 0.1, no current controls, and the estimate is also 20% uncertain.',
        tasks: [
          'Vulnerability 2: (100 × 0.5) − ((100 × 0.5) × 0.5) + ((100 × 0.5) × 0.2) = 50 − 25 + 10 = 35.',
          'Vulnerability 3: (100 × 0.1) − ((100 × 0.1) × 0) + ((100 × 0.1) × 0.2) = 10 − 0 + 2 = 12.',
          'Each vulnerability on the same asset gets its own risk rating — they are not summed into one figure for the asset.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Five Risk Control Strategies',
        items: [
          { term: 'Defend', def: 'Attempt to prevent exploitation of the vulnerability, through policy, education/training, and technology.' },
          { term: 'Transfer', def: 'Shift the risk to other areas or outside entities — for example through insurance or outsourcing.' },
          { term: 'Mitigate', def: 'Reduce the impact if the vulnerability is exploited, via planning, early detection, and a quick, efficient response.' },
          { term: 'Accept', def: 'Choose to do nothing about a given risk, typically because the cost of controlling it outweighs the cost of the exposure.' },
          { term: 'Terminate', def: 'Avoid the business activity that introduces an uncontrollable risk altogether.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Selecting a Risk Control Strategy',
        items: [
          { term: 'Feasibility studies', def: 'Compare the cost of a control to the potential loss it prevents — cost avoidance is the goal.' },
          { term: 'Cost-Benefit Analysis (CBA)', def: 'SLE (single loss expectancy) = asset value × exposure factor. ALE (annualized loss expectancy) = SLE × ARO (annualized rate of occurrence). CBA = ALE(prior to control) − ALE(after control) − ACS (annualized cost of the safeguard).' },
          { term: 'Benchmarking and best practices', def: 'Studying practices used by other organizations that achieve results worth duplicating — tracked via metrics like successful attacks, staff-hours spent on protection, and money spent on protection versus losses.' },
          { term: 'Baselining', def: 'Measuring a performance metric against an established standard, so changes in that metric over time can be usefully compared.' },
        ],
      },
      {
        type: 'note',
        text: '"The goal of information security is not to bring residual risk to zero; it is to bring residual risk into line with an organization\'s comfort zone or risk appetite." Risk management sits outside this course\'s eight syllabus topics, but it is the framework the whole textbook hangs its named threats and controls on.',
      },
    ],
  },
];
