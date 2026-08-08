// UUY-CYB 122 — Written (non-CBT) exam preparation bank.
//
// Unlike a `quiz` bank, nothing here is multiple choice. The course is
// examined on paper, so these questions are the forms an actual script
// uses — "define", "list and explain any five", "with the aid of a
// diagram", "differentiate between", "calculate, showing your working" —
// and each one carries a full model answer plus a per-point mark scheme
// the student ticks off against what they actually wrote. Self-marking is
// deliberate: reading the mark scheme is the skill an MCQ never teaches,
// and it works with no network and no AI call.
//
// Every question is drawn from src/data/lectureNotes/cyb122.js and carries
// a `source` naming the section it comes from, so a student who drops marks
// knows exactly what to re-read. Coverage is weighted towards sections 7–12
// — the lecturer's own Lectures 1–4 (Whitman & Mattord chapters 1–4), which
// is the material actually taught and therefore the material most likely to
// be examined. Sections 1–6 come from the distributed study guide and are
// represented, but more thinly.
//
// Question types:
//   longform — question + marks + modelAnswer + markScheme[]; optional
//              `figure` (a path under public/lecture-notes/cyb-122/) shown
//              on reveal so a student can compare their sketch to the real
//              diagram.
//   recall   — unaided list recall: `items[]` of { name, aliases[], explain },
//              rendered as blanks, fuzzy-matched, then each item's `explain`
//              revealed so the "and explain each" half is drilled too.
//
// Mark values in each markScheme entry sum to the question's `marks`.

export const cyb122ExamPrep = [
  // ══════════════════════════════════════════════════════════════════
  //  FROM THE STUDY GUIDE — SECTIONS 1–6
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: '§1',
    question: 'Define information security. State and explain any FIVE of the seven attributes of information security.',
    modelAnswer: "Information security is the protection of information and its critical elements, including the systems and hardware that use, store and transmit that information. Its attributes are: Confidentiality — ensuring sensitive information is accessible exclusively to authorized individuals, preventing unauthorized disclosure. Integrity — maintaining data in a consistent, complete and uncorrupted state against accidental or malicious alteration. Availability — guaranteeing that authorized users have timely and reliable access to systems and resources when needed. Accuracy — ensuring data is free from errors and correctly reflects the reality it represents. Authenticity — verifying that information, transactions and users are genuine and verifiable. Utility — ensuring information has practical value for organizational operations and decision-making. Possession — maintaining rightful ownership and physical or logical control over information assets.",
    markScheme: [
      'Definition of information security — protection of information and its critical elements, including the systems that use, store and transmit it (2)',
      'Confidentiality correctly explained (1.5)',
      'Integrity correctly explained (1.5)',
      'Availability correctly explained (1.5)',
      'A fourth attribute from Accuracy / Authenticity / Utility / Possession explained (1.5)',
      'A fifth attribute from the same set explained (1.5)',
      'Answer names attributes AND explains them, rather than listing bare terms (0.5)',
    ],
  },

  {
    type: 'recall',
    marks: 7,
    source: '§1',
    question: 'Name the seven attributes of information security.',
    items: [
      { name: 'Confidentiality', aliases: [], explain: 'Sensitive information is accessible exclusively to authorized individuals — no unauthorized disclosure.' },
      { name: 'Integrity', aliases: [], explain: 'Data stays consistent, complete and uncorrupted against accidental or malicious alteration.' },
      { name: 'Availability', aliases: [], explain: 'Authorized users get timely, reliable access to systems and resources when needed.' },
      { name: 'Accuracy', aliases: [], explain: 'Data is free from errors and correctly reflects the reality it represents.' },
      { name: 'Authenticity', aliases: [], explain: 'Information, transactions and users are genuine and verifiable.' },
      { name: 'Utility', aliases: [], explain: 'Information has practical value for operations and decision-making.' },
      { name: 'Possession', aliases: ['ownership'], explain: 'Rightful ownership and physical or logical control over the asset is maintained.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: '§2',
    question: 'Differentiate between ethics, professional standards, laws and policies as they apply to information security, and name any THREE pieces of legislation relevant to the field.',
    modelAnswer: "Ethics are moral principles and rules of conduct guiding individual and collective behaviour. Professional standards are the expectations governing conduct within a specialized field. Laws are enforceable rules established by governing authorities. Policies are internal rules mandated by an organization. The four differ chiefly in their source and their enforceability: ethics come from moral conviction and carry no formal sanction, professional standards come from a professional body, laws come from the state and are enforceable against everyone, and policies come from the organization and bind only its members. Relevant legislation includes the Computer Fraud and Abuse Act (CFAA), which criminalizes unauthorized access to protected computer systems; the Electronic Communications Privacy Act (ECPA), which safeguards wire, oral and electronic communications against unauthorized interception; HIPAA and GLBA, which mandate privacy and security controls for healthcare and financial institutions respectively; and the Sarbanes-Oxley Act (SOX), which requires public corporations to maintain accurate financial records and internal controls.",
    markScheme: [
      'Ethics defined — moral principles/rules of conduct (1)',
      'Professional standards defined — expectations within a specialized field (1)',
      'Laws defined — enforceable rules from governing authorities (1)',
      'Policies defined — internal rules mandated by organizations (1)',
      'States the basis of the distinction (source and enforceability) rather than only defining each (1)',
      'First statute named with its purpose (1)',
      'Second statute named with its purpose (1)',
      'Third statute named with its purpose (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§3',
    figure: '/lecture-notes/cyb-122/access-control-process.webp',
    question: 'With the aid of a diagram, describe the four pillars of access control, explaining why the order in which they occur matters.',
    modelAnswer: "Access control determines how users and systems are authenticated, authorized and admitted into restricted environments and resources; it is one of the operating system's core protection mechanisms. Every access control mechanism, regardless of model, is built from the same four steps in the same order. Identification: a supplicant presents a unique identifier (ID) within the security domain — it is a claim of identity, nothing more. Authentication: that claimed identity is validated using one or more of three factors — something you know (passwords, PINs, passphrases), something you have (smart cards, ATM cards, hardware tokens), or something you are (biometrics such as fingerprints, hand geometry, retinal scans or voice recognition). Authorization: the authenticated entity is matched against authorized resource access lists and group memberships to determine what it may do. Accountability (auditability): comprehensive system audit logs attribute all actions to verifiable identities, facilitating intrusion detection and forensic analysis. The order matters because each step depends on the one before it — you cannot authorize an entity you have not authenticated, and you cannot hold an entity accountable for an action if you never established who it was.",
    markScheme: [
      'Identification explained — supplicant presents a unique ID, a claim of identity (1.5)',
      'Authentication explained — validating that claimed identity (1.5)',
      'The three authentication factors named (know / have / are) with an example of each (2)',
      'Authorization explained — matching against access lists and group memberships (1.5)',
      'Accountability/auditability explained — audit logs attributing actions to identities (1.5)',
      'Explains the dependency: each step depends on the one before it (1)',
      'Diagram drawn showing the four in sequence, correctly labelled (1)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: '§3',
    question: 'Compare Mandatory Access Control (MAC), Non-Discretionary Access Control (NAC) and Discretionary Access Control (DAC).',
    modelAnswer: "Mandatory Access Control uses rigorous data classification schemes in which both users and objects are assigned sensitivity and clearance levels; access is decided by comparing the two, and lattice-based access control provides a mathematical formalization of these security levels. Non-Discretionary Access Control is centrally managed and strictly enforced by organizational authorities rather than by individual users — Role-Based Access Control (RBAC), where permissions attach to a role rather than a person, and Task-Based Access Control are the common forms. Discretionary Access Control is implemented at the discretion of the data owners themselves, who decide who may access what; it is common in peer-to-peer and decentralized environments. The essential difference is who holds the decision: under MAC the classification scheme decides, under NAC the organization decides centrally, and under DAC the individual data owner decides. MAC is therefore the most rigid and the most suitable for classified environments, while DAC is the most flexible but the hardest to govern consistently.",
    markScheme: [
      'MAC explained — classification scheme, sensitivity and clearance levels (2)',
      'Mentions lattice-based access control as the mathematical formalization of MAC levels (1)',
      'NAC explained — centrally managed and strictly enforced by organizational authorities (2)',
      'Gives RBAC or Task-Based Access Control as an example of NAC (1)',
      'DAC explained — at the discretion of data owners, common in peer-to-peer/decentralized settings (2)',
      'Draws the comparison explicitly — who holds the access decision under each (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: '§3',
    question: 'Name the four pillars of access control, in the order they occur.',
    items: [
      { name: 'Identification', aliases: [], explain: 'A supplicant presents a unique identifier (ID) within the security domain — a claim of identity.' },
      { name: 'Authentication', aliases: [], explain: 'The claimed identity is validated using something you know, something you have, or something you are.' },
      { name: 'Authorization', aliases: [], explain: 'The authenticated entity is matched against authorized resource access lists and group memberships.' },
      { name: 'Accountability', aliases: ['auditability'], explain: 'Audit logs attribute all user actions to verifiable identities, enabling intrusion detection and forensics.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§5',
    question: 'Differentiate between an IDS and an IPS, and explain the four ways an IDPS alarm may be classified.',
    modelAnswer: "Intrusion Detection and Prevention Systems monitor network and system activities for malicious violations or policy breaches. An Intrusion Detection System (IDS) detects violations and generates passive alarms, audible or visual — it observes and reports, but does not act on the traffic. An Intrusion Prevention System (IPS) goes further and actively intercepts and blocks malicious traffic in real time. The difference is therefore one of response: detection versus interception. An alarm is classified against what actually happened. A true attack stimulus is an actual attack, or an authorized test drill, triggering a correct IDPS response. A false positive is an alarm raised in the absence of any actual attack — costly in wasted analyst time. A false negative is the failure of the IDPS to detect an attack that really occurred; this is the most grievous of the four, because the organization has no idea the attack happened at all. Noise refers to accurate but low-threat alerts generated by unsuccessful attacks or normal operational anomalies.",
    markScheme: [
      'IDS defined — detects and raises passive alarms, does not act (2)',
      'IPS defined — actively intercepts and blocks malicious traffic in real time (2)',
      'States the basis of the distinction (detection vs interception/response) (1)',
      'True attack stimulus explained (1)',
      'False positive explained (1)',
      'False negative explained (1)',
      'Identifies the false negative as the most serious failure, with a reason (1)',
      'Noise explained (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: '§5',
    question: 'Name the four IDPS detection methodologies.',
    items: [
      { name: 'Signature-based detection', aliases: ['signature based', 'signature'], explain: 'Matches traffic against a database of known attack patterns.' },
      { name: 'Statistical anomaly-based detection', aliases: ['anomaly based', 'statistical anomaly', 'anomaly'], explain: 'Flags deviation from an established baseline of normal behaviour.' },
      { name: 'Stateful protocol analysis', aliases: ['stateful protocol', 'protocol analysis'], explain: 'Compares observed protocol behaviour against vendor-defined profiles of benign activity.' },
      { name: 'Log file monitors', aliases: ['logged file monitors', 'log monitoring', 'log file monitoring'], explain: 'Reviews system and application logs after the fact for evidence of a violation.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: '§4',
    question: 'Define a firewall and state the forms in which it may be deployed.',
    modelAnswer: "A firewall is a protective network layer that inspects and restricts unauthorized data transfer between an untrusted external network, such as the Internet, and a trusted internal network. It enforces a boundary: traffic crossing between the two must pass through it and be permitted by its rules. Firewalls may be deployed as dedicated hardware appliances, as software modules running on routers or servers, or as distributed network perimeters rather than a single choke point. A firewall is only one perimeter control, however — it does not by itself address the wider distributed-systems threat model, which includes spoofing, scanning, denial of service, sniffing and man-in-the-middle attacks.",
    markScheme: [
      'Definition — inspects and restricts unauthorized data transfer (1.5)',
      'Identifies the boundary it sits on: untrusted external vs trusted internal network (1.5)',
      'Dedicated hardware appliance named as a deployment form (1)',
      'Software module on a router or server named (1)',
      'Distributed network perimeter named (1)',
    ],
  },

  {
    type: 'recall',
    marks: 7,
    source: '§6',
    question: 'Name the seven major sources of physical loss.',
    items: [
      { name: 'Extreme temperatures', aliases: ['temperature', 'heat', 'heat and cold'], explain: 'Excessive heat or cold affecting equipment reliability.' },
      { name: 'Gases and commercial vapours', aliases: ['gases', 'vapours', 'vapors'], explain: 'Corrosive or hazardous atmospheric agents.' },
      { name: 'Liquids', aliases: ['water', 'liquid'], explain: 'Water leaks, chemical spills and humidity damage.' },
      { name: 'Living organisms', aliases: ['organisms', 'pests'], explain: 'Pests and biological contamination.' },
      { name: 'Projectiles', aliases: ['projectile'], explain: 'Tangible objects in motion and pressurized media.' },
      { name: 'Movement', aliases: ['vibration', 'collapse'], explain: 'Collapses, severe vibrations and structural shifts.' },
      { name: 'Energy anomalies', aliases: ['energy', 'power', 'electrical'], explain: 'Electrical surges, power sags and complete outages.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  FROM THE LECTURER'S DECK — SECTIONS 7–12 (Lectures 1–4)
  //  The examinable core. Weighted accordingly.
  // ══════════════════════════════════════════════════════════════════

  // ── §7 — History and the CNSS/McCumber model ──────────────────────

  {
    type: 'longform',
    marks: 12,
    source: '§7',
    figure: '/lecture-notes/cyb-122/mccumber-cube.webp',
    question: 'With the aid of a well-labelled diagram, describe the CNSS security model (the McCumber Cube), and explain what its cells represent.',
    modelAnswer: "The CNSS security model, known as the McCumber Cube, is a formal model of information security built as a cube from three axes. The first axis is the C.I.A. triad — Confidentiality, Integrity and Availability — the desired security properties. The second axis is the three states in which information can exist: Storage, Processing and Transmission. The third axis is the three categories of tool used to secure it: Policy, Education and Technology. Because each axis has three values, the cube contains 3 × 3 × 3 = 27 cells. Each cell represents one distinct combination of which property is being protected, in which state the information is, and by which means — for example, protecting the confidentiality of information in transmission by means of technology. The value of the model is that it is exhaustive: by working through all 27 cells an organization can check that its security programme has no blind spot in that three-dimensional space, rather than, say, defending data at rest with technology while leaving data in transmission governed only by policy.",
    markScheme: [
      'Identifies it as the CNSS model / McCumber Cube, a formal model of information security (1)',
      'First axis named — Confidentiality, Integrity, Availability (2)',
      'Second axis named — Storage, Processing, Transmission (2)',
      'Third axis named — Policy, Education, Technology (2)',
      'States that the cube has 27 cells (1)',
      'Explains what a single cell represents — property × state × means (2)',
      'Diagram drawn as a cube with all three axes labelled (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: '§7',
    question: 'Trace the history of information security from the Second World War to the present day, identifying the key developments at each stage.',
    modelAnswer: "Information security began during the Second World War as a matter of physical controls: mainframes running code-breaking computations had to be defended against theft, espionage and sabotage, so security meant guarding the room. In the 1960s the Advanced Research Project Agency (ARPA) examined redundant networked communication, and Larry Roberts developed ARPANET to link seventeen research centres at a cost of $3.4 million; ARPANET is the direct predecessor of the Internet. Through the 1970s and 1980s, as ARPANET grew, its fundamental weaknesses surfaced — individual remote sites were unsecured, password structures were vulnerable, dial-up connections had no safety procedures, and there was no real user identification or authorization. The Rand Report R-609 is the paper that began the formal study of computer security, expanding its scope from physical security alone to include the safety of data, limiting unauthorized access, and involving personnel at every organizational level. MULTICS, developed by GE, Bell Labs and MIT in the mid-1960s, was the first operating system built with security as its primary design goal; several of its developers went on to create UNIX once microprocessors reduced the mainframe's dominance in the late 1970s, expanding the attack surface in the process. In the 1990s networked computers became common and the Internet became the first true network of networks, built on de facto standards that treated security as a low priority. From 2000 to the present, with millions of networks interconnected, an organization's ability to secure its own data now depends on the security of every network it connects to.",
    markScheme: [
      'WWII origin — physical controls protecting mainframes from theft, espionage, sabotage (2)',
      '1960s — ARPA, Larry Roberts and ARPANET as predecessor of the Internet (2)',
      '1970s–80s — ARPANET weaknesses: unsecured remote sites, weak passwords, unsafe dial-up, no real identification/authorization (2)',
      'Rand Report R-609 identified as the start of the formal study of computer security, with what it expanded scope to include (2)',
      'MULTICS — first OS with security as its primary design goal; link to UNIX (2)',
      '1990s — Internet as network of networks, security a low priority in de facto standards (1)',
      '2000–present — interconnection means your security depends on the networks you connect to (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: '§7',
    figure: '/lecture-notes/cyb-122/subject-object-of-attack.webp',
    question: 'Distinguish, with the aid of a diagram, between a computer as the SUBJECT of an attack and a computer as the OBJECT of an attack.',
    modelAnswer: "A computer used to actively carry out an attack is the subject of that attack — it is the instrument doing the attacking. The system on the receiving end, the one being attacked, is the object of the attack. For example, where a hacker at a workstation sends a crafted request across the Internet to a remote server and extracts information from it, the hacker's workstation is the subject and the remote server is the object. The distinction is one of role rather than of hardware: the same machine can play either role at different times, and a compromised server may be the object of one attack and then the subject of the next, when it is used as a platform to attack others.",
    markScheme: [
      'Subject defined — the computer used to actively carry out the attack (1.5)',
      'Object defined — the system being attacked, on the receiving end (1.5)',
      'Gives a worked example distinguishing the two (1)',
      'Notes that the roles are not fixed — the same machine can be either at different times (1)',
      'Diagram drawn and correctly labelled (1)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: '§7',
    question: 'Name the six components of an information system.',
    items: [
      { name: 'Software', aliases: [], explain: 'The applications and operating systems that process the organization\'s information.' },
      { name: 'Hardware', aliases: [], explain: 'The physical machines on which that software runs.' },
      { name: 'Data', aliases: [], explain: 'The information itself — the resource the whole system exists to use.' },
      { name: 'People', aliases: ['personnel', 'users'], explain: 'Often the weakest link, and the component most easily overlooked when securing a system.' },
      { name: 'Procedures', aliases: ['procedure', 'processes'], explain: 'The documented ways in which the system is meant to be used.' },
      { name: 'Networks', aliases: ['network', 'networking'], explain: 'The connections over which the information moves between the other components.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: '§7',
    figure: '/lecture-notes/cyb-122/balancing-security-access.webp',
    question: 'Explain why perfect security is impossible to obtain, and discuss the balance an organization must strike between information security and access.',
    modelAnswer: "Perfect security is impossible to obtain because security is a continuous process rather than an absolute state: the threat environment changes constantly, new vulnerabilities emerge, and controls that were adequate yesterday are not adequate today. An organization therefore does not aim at total protection but at an acceptable balance between protection and availability. Every control that defends information also imposes friction on the people who legitimately need it. If an organization applies enough access control to defend against every conceivable threat, it makes the system so inconvenient that legitimate users cannot do their work — and in practice they then circumvent the controls, which leaves the organization less secure than before, not more. The balance point is enough control to defend against realistic threats without making the system unusable. This is the same principle expressed in the definition of information security as a well-informed sense of assurance that the information risks and controls are in balance.",
    markScheme: [
      'States that perfect security is unobtainable (1)',
      'Explains why — it is a continuous process, not an absolute state; the threat environment changes (2)',
      'Identifies the trade-off as protection versus availability/access (2)',
      'Explains the consequence of over-controlling — users cannot work, and circumvent the controls (2)',
      'States where the balance point lies — realistic threats without destroying usability (1)',
    ],
  },

  // ── §8 — Approach, the SDLC and professional roles ─────────────────

  {
    type: 'longform',
    marks: 10,
    source: '§8',
    figure: '/lecture-notes/cyb-122/top-down-bottom-up-approach.webp',
    question: 'Compare the top-down and bottom-up approaches to implementing information security. Which is more likely to succeed, and why?',
    modelAnswer: "The bottom-up approach is a grassroots effort driven by systems administrators — the technical staff who work with the systems daily identify a need and act on it. Its advantage is precisely the technical expertise of the people doing the work: they understand the systems better than anyone above them. It nevertheless seldom succeeds, because it lacks participant support from above and lacks organizational staying power; without management backing it has no budget, no authority to compel compliance across departments, and no continuity when the individuals driving it move on. The top-down approach is initiated by upper management, who issue policy, dictate goals and objectives, and determine accountability for each required action. It is the more successful of the two, chiefly because it carries the authority and resources that the bottom-up approach lacks, and because it follows a formal development strategy — the systems development life cycle — rather than proceeding ad hoc. The top-down approach is therefore the recommended one.",
    markScheme: [
      'Bottom-up described — grassroots, driven by systems administrators (2)',
      'Its advantage stated — the technical expertise of the staff involved (1.5)',
      'Its weakness stated — lacks support from above and organizational staying power (2)',
      'Top-down described — initiated by upper management, issuing policy, goals and accountability (2)',
      'Identifies top-down as the more successful approach (1)',
      'Explains why — authority and resources, and it follows a formal strategy (the SDLC) (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: '§8',
    figure: '/lecture-notes/cyb-122/sdlc-waterfall.webp',
    question: 'Define the Systems Development Life Cycle and, with the aid of a diagram, describe its six phases. What does each phase mean in the Security SDLC (SecSDLC)?',
    modelAnswer: "The Systems Development Life Cycle is a methodology — a formal, structured approach to problem solving — for designing and implementing an information system. Using one increases the probability of success over ad-hoc development. The traditional SDLC has six phases, each ending in a feasibility check before the next begins, and it loops back to Investigation when the system is no longer viable. In the SecSDLC the same six phases take on security-specific meaning. Investigation begins with the Enterprise Information Security Policy (EISP), and an organizational feasibility analysis is performed. Analysis studies the documents produced by Investigation — existing security policies, documented threats and controls, and relevant legal issues — and risk management work begins here. Logical Design creates the blueprint for information security and plans incident response, covering continuity planning, incident response and disaster recovery. Physical Design evaluates and selects the actual security technology, with a feasibility study checking the organization's readiness for the project. Implementation is where security solutions are acquired, tested and tested again before the whole package goes to management for final approval. Maintenance and Change is arguably the most important phase given a constantly changing threat environment — a continuous duel with an unseen adversary as new threats emerge and old ones evolve.",
    markScheme: [
      'SDLC defined as a methodology — a formal structured approach to problem solving (1)',
      'States that using one increases the probability of success over ad-hoc development (1)',
      'Investigation — EISP and organizational feasibility analysis (1.5)',
      'Analysis — existing policies, documented threats and controls, legal issues; risk management begins (1.5)',
      'Logical Design — blueprint plus continuity, incident response and disaster recovery planning (1.5)',
      'Physical Design — evaluate and select security technology, feasibility study (1.5)',
      'Implementation — acquire, test and re-test, then management approval (1.5)',
      'Maintenance and Change — most important phase, constantly changing threat environment (1.5)',
      'Diagram drawn showing the six phases in order with the loop back (1)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: '§8',
    question: 'Name the six phases of the SDLC, in order.',
    items: [
      { name: 'Investigation', aliases: [], explain: 'In the SecSDLC: begins with the Enterprise Information Security Policy (EISP); organizational feasibility analysis is performed.' },
      { name: 'Analysis', aliases: [], explain: 'Studies existing security policies, documented threats and controls, and legal issues. Risk management begins here.' },
      { name: 'Logical Design', aliases: ['logical'], explain: 'Creates the information security blueprint: continuity planning, incident response, disaster recovery.' },
      { name: 'Physical Design', aliases: ['physical'], explain: 'Evaluates and selects the actual security technology; feasibility study of organizational readiness.' },
      { name: 'Implementation', aliases: [], explain: 'Security solutions are acquired, tested and tested again, then submitted to management for approval.' },
      { name: 'Maintenance and Change', aliases: ['maintenance', 'maintenance and change'], explain: 'Arguably the most important phase — a continuous duel with an unseen adversary as threats evolve.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§8',
    question: 'Describe the roles of the Chief Information Officer and the Chief Information Security Officer, and distinguish between a data owner, a data custodian and a data user.',
    modelAnswer: "The Chief Information Officer (CIO) is the senior technology officer of the organization, primarily responsible for advising senior executives on strategic planning. The Chief Information Security Officer (CISO) is responsible for the assessment, management and implementation of information security in the organization, and usually reports directly to the CIO. The two are therefore distinguished by scope: the CIO owns technology strategy broadly, while the CISO owns security specifically and sits beneath the CIO in the reporting line. Beneath them the information security project team draws together a champion, a team leader, security policy developers, risk assessment specialists, security professionals, systems administrators and end users, each contributing a different facet of technical and non-technical expertise. As regards data, three distinct roles must be separated. The data owner is responsible for the security and use of a particular set of information. The data custodian is responsible for the storage, maintenance and protection of that information. The data users are the end users who work with the information in order to do their jobs. The distinction matters because responsibility for deciding how information may be used (owner) is deliberately separated from responsibility for physically safeguarding it (custodian).",
    markScheme: [
      'CIO — senior technology officer, advises senior executives on strategic planning (2)',
      'CISO — assessment, management and implementation of information security (2)',
      'States the reporting relationship: CISO usually reports directly to the CIO (1)',
      'Data owner — responsible for the security and use of a set of information (1.5)',
      'Data custodian — responsible for storage, maintenance and protection (1.5)',
      'Data users — end users who work with the information to do their jobs (1.5)',
      'Notes why owner and custodian are separated (0.5)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: '§8',
    question: 'Is information security an art, a science, or a social science? Discuss with reference to all three positions.',
    modelAnswer: "All three framings capture something true, and the fullest answer holds them together. Viewed as an art, information security has no hard and fast rules and no single manual for securing an entire system end to end; the practitioner exercises judgement, and two competent professionals may defend the same system differently. Viewed as a science, technology is designed to behave under specific, knowable conditions, and nearly every fault or security hole results from a specific interaction of hardware and software that, given enough time, developers could identify and resolve; on this view insecurity is a solvable engineering problem rather than an inherent mystery. Viewed as a social science, security begins and ends with the people who interact with the system: understanding user behaviour allows administrators to reduce risk and to build security profiles that are more usable and more supportable, because a control users will not tolerate is a control that will be circumvented. The practical conclusion is that a security professional needs all three — the engineer's rigour, the artist's judgement, and an understanding of the people whose behaviour ultimately determines whether the controls hold.",
    markScheme: [
      'Art — no hard and fast rules, no single manual for securing a whole system (2)',
      'Science — technology behaves under specific conditions; faults arise from specific hardware/software interactions that could be resolved (2.5)',
      'Social science — security begins and ends with the people interacting with the system (2.5)',
      'Explains the practical payoff of the social-science view — usable, supportable security profiles (1)',
      'Reaches a reasoned conclusion rather than merely listing the three (1)',
    ],
  },

  // ── §9 — Threats ──────────────────────────────────────────────────

  {
    type: 'longform',
    marks: 10,
    source: '§9',
    question: 'List and explain any FIVE categories of threat to information security, giving one example of each.',
    modelAnswer: "Compromises to intellectual property — the piracy or copyright infringement of an organization's protected works; software piracy is the most common such breach, with roughly a third of all software in use estimated to be pirated. Software attacks — malicious code directed at systems, such as viruses, worms, macros and denial of service attacks. Deviations in quality of service — a failure of a service the organization depends on but does not control, such as ISP, power or WAN service issues from providers. Espionage or trespass — unauthorized access to systems and unauthorized data collection. Forces of nature — fire, flood, earthquake or lightning, among the most dangerous threats because they strike with little or no warning. Acts of human error or failure — accidents and employee mistakes made without malicious intent, described as the greatest single threat to organizational information security. Other recognised categories include information extortion, deliberate acts of theft, sabotage or vandalism, technical hardware failures, technical software failures, technological obsolescence, and missing or inadequate controls.",
    markScheme: [
      'First category named with a correct example (2)',
      'Second category named with a correct example (2)',
      'Third category named with a correct example (2)',
      'Fourth category named with a correct example (2)',
      'Fifth category named with a correct example (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: '§9',
    question: 'Explain any SIX forms of malicious software (malware), making clear how each differs from the others.',
    modelAnswer: "A virus is a segment of code that attaches itself to an existing program, takes control of that program's access, and replicates; it needs a host program in order to spread. A worm is a malicious program that also replicates constantly but, unlike a virus, does not need another program to do it — it can spread with or without the user downloading anything, which is why worms propagate so much faster. A Trojan horse hides its true nature, presenting itself as something benign, and reveals its designed behaviour only once activated by the user. A back door, also called a trap door, allows an attacker access to a system at will and with special privileges, bypassing the normal access controls entirely; it is typically left behind after an initial compromise. Polymorphic malware changes its apparent shape over time so that it evades detection techniques which look for a fixed, preconfigured signature — it defeats signature-based detection specifically. A hoax is a false warning, often forwarded in good faith by users who believe they are helping; it wastes time and can trick users into damaging their own systems, and so causes real harm without containing any malicious code at all.",
    markScheme: [
      'Virus — attaches to an existing program, takes over its access, replicates (2)',
      'Worm — replicates without needing another program; distinction from virus made explicit (2)',
      'Trojan horse — hides its true nature, reveals designed behaviour on activation (2)',
      'Back door / trap door — access at will with special privileges, bypassing controls (2)',
      'Polymorphic malware — changes shape to evade fixed-signature detection (2)',
      'Hoax — false warning, wastes time, can trick users into damaging their own systems (2)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: '§9',
    question: 'Name the five types of threat agent identified in the lecture.',
    items: [
      { name: 'Expert hackers', aliases: ['expert hacker', 'experts'], explain: 'Develop their own software scripts and program their own exploits.' },
      { name: 'Novice hackers', aliases: ['script kiddies', 'script kiddie', 'novice', 'unskilled hackers'], explain: 'Also called script kiddies — use software and exploits someone else already wrote.' },
      { name: 'Packet monkeys', aliases: ['packet monkey'], explain: 'Use automated exploit tools without necessarily understanding how they work.' },
      { name: 'Crackers', aliases: ['cracker'], explain: 'Remove or crack software protection designed to prevent unauthorized duplication.' },
      { name: 'Phreakers', aliases: ['phreaker', 'phreaks'], explain: 'Use public telephone networks to make calls without paying for them.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: '§9',
    question: 'Acts of human error or failure are described as the greatest single threat to organizational information security. Explain why, and state how an organization may guard against them.',
    modelAnswer: "Acts of human error or failure are mistakes made without malicious intent by an organization's own employees — accidents, mistyped commands, misdirected mail, mishandled data. They are described as the greatest single threat for two connected reasons. First, employees sit closest to the data: they hold legitimate credentials and routine access, so an error on their part operates from inside every perimeter control the organization has built. Second, error is far more frequent than deliberate attack, because it requires no motive at all — it needs only an ordinary person having an ordinary bad moment. The defence rests principally on training and ongoing awareness programmes, so that staff understand both the correct procedure and the consequences of departing from it. This is supplemented by technical controls designed around the expectation of error, such as requiring a critical command to be typed twice for verification before it will execute, so that a single slip is not sufficient to cause the damage.",
    markScheme: [
      'Defines the category — mistakes made without malicious intent by an organization\'s own employees (2)',
      'Reason: employees are closest to the data and hold legitimate access, so errors operate inside the perimeter (2)',
      'Training and ongoing awareness given as the principal defence (2)',
      'Gives a concrete supplementary control, e.g. requiring a critical command to be typed twice (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: '§9',
    question: 'Why are forces of nature considered among the most dangerous threats to information security? Name any FIVE.',
    modelAnswer: "Forces of nature are among the most dangerous threats precisely because they are unexpected and strike with little or no warning, leaving no opportunity to mount a defence once they have begun; they also tend to affect an entire facility at once rather than a single system, which can defeat controls that assume only part of the environment will fail. They cannot be deterred, only planned for, which is why continuity planning and disaster recovery exist. Five examples are fire, flood, earthquake, lightning and hurricane or typhoon. Others recognised include tornado, tsunami, landslide or mudslide, electrostatic discharge and dust contamination.",
    markScheme: [
      'Explains the danger — unexpected, with little or no warning (2)',
      'Notes that they cannot be deterred, only planned for (1)',
      'Three correct examples named (1.5)',
      'Two further correct examples named (1.5)',
    ],
  },

  // ── §10 — Network attacks and secure programming ──────────────────

  {
    type: 'longform',
    marks: 12,
    source: '§10',
    figure: '/lecture-notes/cyb-122/tcp-three-way-handshake.webp',
    question: 'With the aid of a diagram, describe the TCP three-way handshake. Explain the half-open socket problem and how it is exploited in a SYN spoofing attack.',
    modelAnswer: "A normal TCP connection is established in three steps. First, the client sends a SYN packet to the server requesting a connection. Second, the server replies with a SYN-ACK and opens a communication port in readiness. Third, the client replies with an ACK, and the connection is established. The vulnerability lies in the fact that the server trusts the client that started the handshake: having sent its SYN-ACK, it commits a port and waits. If the final ACK never arrives, the server is left holding a half-open socket — a port opened and reserved for a connection that was never completed. For as long as that half-open port remains open, an intruder can walk in through it. SYN spoofing exploits this directly: the attacker sends a flood of SYN packets carrying forged (spoofed) source IP addresses, so that every SYN-ACK the server sends is directed to an address that will never reply with an ACK. Each such request consumes another half-open socket until the server's capacity to accept legitimate connections is exhausted, which is why the attack functions as a denial of service.",
    markScheme: [
      'Step 1 — client sends SYN (1.5)',
      'Step 2 — server replies SYN-ACK and opens a communication port (1.5)',
      'Step 3 — client replies ACK, connection established (1.5)',
      'Identifies the trust assumption: the server trusts the client that began the handshake (1.5)',
      'Half-open socket explained — final ACK never arrives, port left open and reserved (2)',
      'States the consequence — an intruder can enter through the open port (1)',
      'SYN spoofing explained — flood of spoofed SYNs so no ACK ever returns, exhausting capacity (2)',
      'Diagram drawn showing client, server and the three labelled messages (1)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: '§10',
    question: 'Explain any SIX methods of attack used against networked systems.',
    modelAnswer: "IP spoofing — the source IP address on data packets is altered and replaced with a bogus address, so that the traffic appears to originate elsewhere and cannot easily be traced or filtered. SYN spoofing — the server is overwhelmed by a flood of spoofed SYN packets, exploiting the half-open socket problem so that legitimate connections can no longer be accepted. Scanning — the attacker determines which ports on a target are open and therefore available as a route of entry; it is typically reconnaissance preceding a further attack. Denial of service, of which the Smurf attack is an example — a large volume of spoofed ping packets is sent to overwhelm the system and stop it responding to legitimate traffic. Spam or mail bombing — the target is flooded with unwanted or excessive email traffic, consuming storage and bandwidth. Sniffing — data travelling over a network is monitored and captured; packet sniffing has legitimate diagnostic uses as well as illegitimate ones, which is part of what makes it difficult to police. Password cracking may also be listed, using either brute force, which tries every possibility, or a dictionary attack, which tries likely words first.",
    markScheme: [
      'IP spoofing — source address altered and replaced with a bogus one (2)',
      'SYN spoofing — flood of spoofed SYN packets exploiting half-open sockets (2)',
      'Scanning — determining which ports are open for entry (2)',
      'Denial of service — large volume of traffic to stop the system responding; Smurf named (2)',
      'Spam / mail bombing — flooding with unwanted or excessive email (2)',
      'Sniffing — monitoring data travelling over a network, with both legitimate and illegitimate uses (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: '§10',
    figure: '/lecture-notes/cyb-122/man-in-the-middle-attack.webp',
    question: 'With the aid of a diagram, explain the man-in-the-middle attack.',
    modelAnswer: "In a man-in-the-middle attack the attacker positions himself between two communicating parties and sniffs packets from the network, modifies them, and re-inserts them into the stream. Because he sits in the path, he is able to eavesdrop on the traffic, and also to change, delete, reroute, add or divert data in transit. The essential feature of the attack is that both legitimate parties believe they are communicating directly with each other: if Alice and Bob attempt to message one another while Joe intercepts, reads and alters the messages passing between them, each of them still thinks they are talking to the other, and neither has any indication that a third party is present. A common variant intercepts an encryption-key exchange, so that the attacker substitutes his own key and is thereafter able to decrypt, read and re-encrypt everything the parties believe they have protected.",
    markScheme: [
      'Attacker sniffs packets, modifies them and re-inserts them (2)',
      'Names the capabilities gained — eavesdrop, change, delete, reroute, add or divert data (2)',
      'States the essential deception: both parties believe they are talking directly to each other (2)',
      'Mentions the encryption-key-exchange variant (1)',
      'Diagram drawn showing two parties and the interceptor between them (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§10',
    question: 'Explain what a buffer overflow is and why programming errors remain a major source of security vulnerabilities.',
    modelAnswer: "A buffer overflow occurs when an application writes beyond the bounds of an array, corrupting the stack; because control information is stored on the stack, an attacker who can overflow a buffer in a controlled way can specify their own control information and so redirect the execution of the program. A related failure mode arises from a mismatch in process rates between two communicating entities, where more data is sent to a buffer than it is able to handle. The prevalence of such faults is well documented: the CERT Coordination Center published twenty-two security advisories between January and August 2003, of which nine were directly related to buffer overflow. Programming errors remain a major source of vulnerability because software can be correct without being secure — it may satisfy every functional requirement while still failing under deliberately hostile input — and because there is a real imbalance between the resources available to developers and those available to attackers. An estimated 95% of software security bugs trace back to just nineteen common, well-understood programming mistakes, which indicates that the problem is not obscurity but discipline. As Amit Yoran put it, only by improving the quality of our software and reducing the number of flaws can we hope to be successful in our security efforts. Language choice also matters: C++ is especially vulnerable to buffer overflows, while Java is considerably less so.",
    markScheme: [
      'Buffer overflow defined — writing beyond array bounds, corrupting the stack (2)',
      'Explains the security consequence — the attacker can specify their own control information (2)',
      'Mentions the process-rate mismatch variant, or the CERT 2003 advisory figures (1)',
      'States that software can be correct without being secure (1.5)',
      'Notes the imbalance between developer and attacker resources (1)',
      'Cites the 95% / nineteen common errors figure (1.5)',
      'Language exposure — C++ especially vulnerable, Java considerably less so (1)',
    ],
  },

  // ── §11 — Legal, ethical and regulatory ───────────────────────────

  {
    type: 'longform',
    marks: 10,
    source: '§11',
    question: 'Define liability, due care, due diligence and jurisdiction, and explain their significance for an organization operating on the Internet.',
    modelAnswer: "Liability is an organization's legal obligation, extending beyond criminal or contract law to include restitution; if an employee, whether authorized or not, performs an illegal or unethical act that causes harm, the employer may be held financially liable for it. Due care means that the organization has made sure every employee knows what is acceptable and what is unacceptable conduct, and knows the consequences of illegal or unethical actions. Due diligence means making a valid effort to protect others and maintaining that effort over time, rather than making a single gesture and abandoning it. The distinction between the two is that due care establishes the standard while due diligence sustains it. Jurisdiction is a court's right to hear a case where a wrong was committed, and the term long arm describes jurisdiction extending across a country or around the world. The significance of all four for an organization operating on the Internet is considerable: the moment it does business online, its conduct may fall under the long-arm jurisdiction of courts in territories it has never physically entered, and its ability to demonstrate due care and due diligence is what limits its liability when an employee causes harm.",
    markScheme: [
      'Liability defined — legal obligation including restitution; employer liable for employee acts (2.5)',
      'Due care defined — employees know acceptable/unacceptable conduct and the consequences (2)',
      'Due diligence defined — valid effort to protect others, maintained over time (2)',
      'States the discriminator between due care and due diligence (1)',
      'Jurisdiction defined, with long arm explained (1.5)',
      'Applies the four to an organization doing business on the Internet (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§11',
    question: 'Distinguish between policy and law. State the five requirements that must be satisfied for a policy to be enforceable.',
    modelAnswer: "Policies are internal guidelines describing acceptable and unacceptable employee behaviour. They function as an organization's own laws, in that they carry their own penalties, their own judicial practices and their own sanctions, but they bind only the members of that organization, whereas law is established by a governing authority and binds everyone within its jurisdiction. The key practical difference between them is the treatment of ignorance: ignorance of policy is an acceptable defence, whereas ignorance of the law is not. It follows that an organization cannot enforce a policy against an employee who was never made aware of it, which is why the requirements for enforceability are procedural rather than substantive. A policy is enforceable only where there has been dissemination, meaning the policy has been distributed to those it binds; review, meaning it has been read; comprehension, meaning it has been understood; compliance, meaning the employee has agreed to abide by it; and uniform enforcement, meaning it is applied consistently to everyone rather than selectively.",
    markScheme: [
      'Policies defined — internal guidelines on acceptable and unacceptable employee behaviour (2)',
      'Notes that policies function as organizational law, with their own penalties and sanctions (1)',
      'States the key distinction — ignorance of policy is a defence, ignorance of law is not (2)',
      'Dissemination (1)',
      'Review (1)',
      'Comprehension (1)',
      'Compliance (1)',
      'Uniform enforcement (1)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: '§11',
    question: 'Name the five requirements for a policy to be enforceable.',
    items: [
      { name: 'Dissemination', aliases: ['distribution', 'disseminated'], explain: 'The policy has been distributed to the people it binds.' },
      { name: 'Review', aliases: ['reviewed', 'reading'], explain: 'The policy has been read by those it binds.' },
      { name: 'Comprehension', aliases: ['understanding', 'understood'], explain: 'The policy has been understood, not merely received.' },
      { name: 'Compliance', aliases: ['agreement', 'agreed'], explain: 'The employee has agreed to abide by the policy.' },
      { name: 'Uniform enforcement', aliases: ['uniform', 'consistent enforcement', 'enforcement'], explain: 'The policy is applied consistently to everyone, not selectively.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: '§11',
    question: 'Name the four types of law.',
    items: [
      { name: 'Civil law', aliases: ['civil'], explain: 'Governs the affairs of a nation or state.' },
      { name: 'Criminal law', aliases: ['criminal'], explain: 'Addresses activities and conduct harmful to the public.' },
      { name: 'Private law', aliases: ['private'], explain: 'Covers family, commercial and labour matters, and relationships between individuals and organizations.' },
      { name: 'Public law', aliases: ['public'], explain: 'Regulates the structure and administration of government agencies and their relationships with citizens, employees and other governments.' },
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: '§11',
    question: 'Discuss THREE international legal instruments or bodies concerned with cybercrime and intellectual property.',
    modelAnswer: "The Council of Europe Convention on Cybercrime is an international task force working to standardize technology law across borders and to improve international investigations into breaches of technology law. It is not without controversy: free-speech and civil-liberties advocates have objected to the reach of the powers it harmonizes. TRIPS, the agreement on Trade-Related Aspects of Intellectual Property Rights, was created by the World Trade Organization and was the first significant international effort to protect intellectual property rights; it covers how existing intellectual property agreements apply, how they are to be enforced domestically, and how disputes between WTO members are to be settled. The Digital Millennium Copyright Act (DMCA) is the American contribution to WTO-aligned copyright protection, the United Kingdom having its own equivalent in the Database Right. The DMCA prohibits circumventing copy protections, prohibits the manufacture of and trafficking in circumvention devices, and prohibits altering embedded copyright information, while at the same time shielding Internet service providers from certain claims of contributory infringement.",
    markScheme: [
      'Council of Europe Convention on Cybercrime — standardizing technology law internationally (2)',
      'Notes the controversy from free-speech and civil-liberties advocates (1)',
      'TRIPS — WTO, first significant international effort to protect intellectual property (2)',
      'States what TRIPS covers — application, domestic enforcement, dispute settlement (1)',
      'DMCA identified as the American contribution to WTO-aligned copyright protection (1)',
      'Names any two DMCA prohibitions (1)',
      'Notes the DMCA shield for ISPs against contributory infringement claims (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§11',
    question: 'Describe any FOUR major professional organizations in information technology and information security.',
    modelAnswer: "The Association of Computing Machinery (ACM) describes itself as the world's first educational and scientific computing society; it strongly promotes education and offers discounted membership to students. (ISC)², the International Information Systems Security Certification Consortium, is a nonprofit body that develops and administers information security certifications and maintains a body of knowledge for the field. ISACA, the Information Systems Audit and Control Association, focuses on auditing, control and security and draws both technical and managerial members; it is not exclusively an information-security body, but it has strong security components. ISSA, the Information Systems Security Association, is a nonprofit that brings together information security practitioners for the exchange of information and for education, and is focused on promoting management practices that will ensure the confidentiality, integrity and availability of organizational information resources. SANS, the Systems Administration, Networking and Security Institute, is a professional research and education cooperative with over 156,000 members drawn from security professionals, auditors and systems and network administrators, and offers its own set of certifications.",
    markScheme: [
      'First organization named and correctly described (2.5)',
      'Second organization named and correctly described (2.5)',
      'Third organization named and correctly described (2.5)',
      'Fourth organization named and correctly described (2.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§11',
    question: 'Describe the roles of the Department of Homeland Security, the National InfraGard Program, the National Security Agency and the United States Secret Service in protecting national information infrastructure.',
    modelAnswer: "The Department of Homeland Security (DHS) protects the people and the physical and informational assets of the United States, and does so across five directorates. Two are of particular relevance here: the Directorate of Information and Infrastructure, which discovers and responds to attacks on national information systems, and the Directorate of Science and Technology, which conducts research and development in support of homeland defence. The National InfraGard Program operates through the FBI: each field office runs a local chapter linking public, private and academic partners, and the programme maintains an encrypted intrusion-alert network, a secure site for reporting suspicious activity, local chapter events and a help desk. The National Security Agency (NSA) is described as the nation's cryptologic organization; it coordinates and performs specialized activities to protect United States information systems and to produce foreign intelligence, and is additionally a major centre for foreign-language analysis. The United States Secret Service is housed within the Department of the Treasury and is charged with detecting and arresting any person committing a federal offence relating to computer fraud or false identification.",
    markScheme: [
      'DHS — protects people and physical/informational assets, across five directorates (1.5)',
      'Names the Directorate of Information and Infrastructure and its function (1)',
      'Names the Directorate of Science and Technology and its function (1)',
      'InfraGard — FBI field office chapters linking public, private and academic partners (1.5)',
      'Names any two InfraGard services (encrypted intrusion-alert network, secure reporting site, chapter events, help desk) (1)',
      'NSA — the nation\'s cryptologic organization, protecting information systems and producing foreign intelligence (2)',
      'Secret Service — housed in the Treasury; computer fraud and false identification offences (2)',
    ],
  },

  // ── §12 — Risk management ─────────────────────────────────────────

  {
    type: 'longform',
    marks: 10,
    source: '§12',
    figure: '/lecture-notes/cyb-122/risk-management-overview.webp',
    question: 'With the aid of a diagram, describe the three stages of risk management and the steps that make up each.',
    modelAnswer: "Risk management proceeds in three stages. Risk identification is the process of examining and documenting the security posture of an organization's information technology and the risks it faces; its steps are to identify and inventory the assets, to classify and prioritize them, and then to identify and prioritize the threats against them. Risk assessment determines the extent to which the organization's information assets are exposed or at risk; its steps are to identify the vulnerabilities that exist between each asset and each threat, and then to quantify the asset's exposure. Risk control is the application of controls to reduce the risks to the organization's data and information systems; its steps are to select a control strategy, to justify the controls chosen, and then to implement and monitor them. The three stages are sequential in principle but iterative in practice: risk identification in particular loops back on itself, since specifying an asset's vulnerabilities frequently reveals that the inventory or the prioritization needs revisiting.",
    markScheme: [
      'Risk identification defined — examining and documenting the security posture and the risks faced (2)',
      'Its steps given — inventory assets, classify and prioritize, identify and prioritize threats (1.5)',
      'Risk assessment defined — determining the extent to which assets are exposed or at risk (2)',
      'Its steps given — identify vulnerabilities, quantify exposure (1.5)',
      'Risk control defined — applying controls to reduce risk (2)',
      'Its steps given — select strategy, justify controls, implement and monitor (1)',
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: '§12',
    question: 'Name the three stages of risk management, in order.',
    items: [
      { name: 'Risk identification', aliases: ['identification'], explain: 'Examining and documenting the security posture of the organization\'s IT and the risks it faces.' },
      { name: 'Risk assessment', aliases: ['assessment'], explain: 'Determining the extent to which the organization\'s information assets are exposed, or at risk.' },
      { name: 'Risk control', aliases: ['control'], explain: 'Applying controls to reduce the risks to the organization\'s data and information systems.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§12',
    question: 'State and explain the five risk control strategies, giving an example of when each would be appropriate.',
    modelAnswer: "Defend — the organization attempts to prevent exploitation of the vulnerability altogether, through policy, through education and training, and through technology; this is appropriate where the asset is valuable and the vulnerability can actually be closed, for example patching a known flaw in a public-facing server. Transfer — the risk is shifted to other areas or to outside entities, for example by taking out insurance or by outsourcing the function to a provider better placed to manage it; appropriate where another party can carry the risk more cheaply than the organization can. Mitigate — the organization accepts that exploitation may occur but reduces its impact through planning, early detection and a quick, efficient response; appropriate where the threat cannot be prevented, as with forces of nature, and so continuity and disaster recovery planning is the answer. Accept — the organization chooses to do nothing about a given risk, which is the correct decision where the cost of controlling the risk outweighs the cost of the exposure itself. Terminate — the organization avoids the business activity that introduces the risk altogether; appropriate where a risk is uncontrollable and the activity generating it is not essential.",
    markScheme: [
      'Defend — prevent exploitation, via policy, education/training and technology (2)',
      'Transfer — shift the risk to other areas or outside entities, e.g. insurance or outsourcing (2)',
      'Mitigate — reduce the impact through planning, early detection and quick response (2)',
      'Accept — do nothing, where the cost of control exceeds the cost of the exposure (2)',
      'Terminate — avoid the business activity introducing the risk altogether (2)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: '§12',
    question: 'Name the five risk control strategies.',
    items: [
      { name: 'Defend', aliases: ['defence', 'defense', 'avoidance'], explain: 'Prevent exploitation of the vulnerability through policy, education and training, and technology.' },
      { name: 'Transfer', aliases: ['transference', 'transfer the risk'], explain: 'Shift the risk to other areas or outside entities — insurance, or outsourcing.' },
      { name: 'Mitigate', aliases: ['mitigation'], explain: 'Reduce the impact of exploitation via planning, early detection and quick, efficient response.' },
      { name: 'Accept', aliases: ['acceptance'], explain: 'Do nothing about the risk, where the cost of controlling it outweighs the cost of the exposure.' },
      { name: 'Terminate', aliases: ['termination', 'avoid'], explain: 'Avoid the business activity that introduces the uncontrollable risk altogether.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§12',
    question: 'State the risk assessment formula. An information asset has a value of 50 and a single vulnerability with a likelihood of 1.0. No current controls are in place, and the assumptions behind the estimate are judged 90% accurate. Calculate the risk rating, showing your working.',
    modelAnswer: "The formula is: Risk = (likelihood of the vulnerability occurring × value of the information asset) − (percentage of risk already mitigated by current controls) + (uncertainty in the current knowledge of the vulnerability). Likelihood is expressed as a number between 0.1 and 1, and asset value is typically scored from 1 to 100, where 100 denotes an asset whose loss could halt company operations entirely. Working: the base exposure is the asset value multiplied by the likelihood, that is 50 × 1.0 = 50. Next, subtract the proportion of risk already addressed by current controls; since no controls are in place this is 0% of 50, so subtract 0. Finally, add the uncertainty. The estimate is 90% accurate, so the uncertainty is 10%, and 10% of 50 is 5, so add 5. The risk rating is therefore 50 − 0 + 5 = 55.",
    markScheme: [
      'Formula stated correctly — (likelihood × asset value) − (% risk mitigated) + (uncertainty) (3)',
      'States the ranges: likelihood 0.1–1, asset value typically 1–100 (1)',
      'Base exposure computed — 50 × 1.0 = 50 (2)',
      'Controls term computed — 0% of 50 = 0, subtracted (2)',
      'Uncertainty term computed — 100% − 90% = 10%; 10% of 50 = 5, added (1)',
      'Final answer 55, with working shown rather than the number alone (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§12',
    question: 'An information asset has a value of 100 and two vulnerabilities. Vulnerability 2 has a likelihood of 0.5, and current controls address 50% of its risk; the estimate is 20% uncertain. Vulnerability 3 has a likelihood of 0.1, has no current controls, and its estimate is also 20% uncertain. Calculate the risk rating for each, showing your working, and state how the two combine.',
    modelAnswer: "For Vulnerability 2, the base exposure is 100 × 0.5 = 50. Current controls address 50% of that risk, so subtract 50 × 0.5 = 25. The estimate is 20% uncertain, so add 50 × 0.2 = 10. The risk rating is therefore 50 − 25 + 10 = 35. For Vulnerability 3, the base exposure is 100 × 0.1 = 10. There are no current controls, so subtract 10 × 0 = 0. The estimate is again 20% uncertain, so add 10 × 0.2 = 2. The risk rating is therefore 10 − 0 + 2 = 12. As to how they combine: they do not. Each vulnerability on the same asset receives its own separate risk rating, and the two are not summed into a single figure for the asset. This matters because the ratings are used to prioritize which vulnerabilities to address first, and summing them would obscure the fact that Vulnerability 2 is by a considerable margin the more urgent of the two.",
    markScheme: [
      'Vulnerability 2 base exposure — 100 × 0.5 = 50 (1.5)',
      'Vulnerability 2 controls term — 50 × 0.5 = 25, subtracted (1.5)',
      'Vulnerability 2 uncertainty term — 50 × 0.2 = 10, added (1)',
      'Vulnerability 2 rating = 35 (1)',
      'Vulnerability 3 base exposure — 100 × 0.1 = 10 (1)',
      'Vulnerability 3 controls and uncertainty — 0 subtracted, 2 added (1.5)',
      'Vulnerability 3 rating = 12 (1)',
      'States that each vulnerability keeps its own rating and they are not summed (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§12',
    question: 'Explain how an organization selects a risk control strategy, with reference to feasibility studies, cost-benefit analysis, benchmarking and baselining. State the formulae used in cost-benefit analysis.',
    modelAnswer: "Feasibility studies compare the cost of a proposed control against the potential loss that control would prevent; cost avoidance is the goal, and a control that costs more than the loss it averts should not be adopted. Cost-benefit analysis formalises this. The single loss expectancy is the asset value multiplied by the exposure factor: SLE = asset value × exposure factor. The annualized loss expectancy is the single loss expectancy multiplied by the annualized rate of occurrence: ALE = SLE × ARO. The analysis itself is then the reduction in annualized loss expectancy less what the safeguard costs to run: CBA = ALE(prior to control) − ALE(after control) − ACS, where ACS is the annualized cost of the safeguard. A positive result indicates the control is worth adopting. Benchmarking approaches the question differently, by studying the practices used by other organizations that have achieved results worth duplicating; it is tracked through metrics such as the number of successful attacks, the staff-hours spent on protection, and the money spent on protection measured against the losses actually incurred. Baselining measures a performance metric against an established standard, so that changes in that metric over time can be usefully compared.",
    markScheme: [
      'Feasibility studies — comparing cost of control against potential loss; cost avoidance as the goal (2)',
      'SLE = asset value × exposure factor (1.5)',
      'ALE = SLE × ARO (1.5)',
      'CBA = ALE(prior) − ALE(post) − ACS, with ACS identified (2)',
      'Benchmarking — studying other organizations\' practices worth duplicating, with a metric named (2)',
      'Baselining — measuring against an established standard so change over time is comparable (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: '§12',
    question: 'How does an organization identify and value its information assets? Describe what is recorded for each category of asset, and the factors that determine an asset\'s value.',
    modelAnswer: "Assets are inventoried by category, and what is recorded differs by category. People are recorded by position name or number rather than by personal name wherever possible, distinguishing trusted employees, other staff and non-employees. Procedures are recorded by their intended purpose, their relationship to the software, hardware and network elements they touch, and their storage location. Data is recorded by owner, creator, manager, size, structure, location, backup procedure, and whether it is held online or offline. Hardware, software and network components are recorded by name, IP address, MAC address, element type, device class, operating system and capacity, serial number, manufacturer and model, version or revision, and both physical and logical location. As to value, several factors bear on it: the cost of creating the asset in the first place, and the cost retained from its past maintenance; the cost implied by having to replace it if it were lost; and the value it provides — to its owners, as intellectual property, and, worth remembering, its value to adversaries, which may differ sharply from its value to the organization. Where assets must be ranked against one another, weighted factor analysis scores each asset from 0.1 to 1.0 against critical factors such as impact to revenue, impact to profitability and impact to public image; each factor is separately weighted from 1 to 100, and the scores are multiplied and summed to rank the assets by importance.",
    markScheme: [
      'People — recorded by position name/number rather than personal name (1.5)',
      'Procedures — intended purpose, relationship to other elements, storage location (1.5)',
      'Data — owner, creator, manager, size, structure, location, backup, on/offline status (1.5)',
      'Hardware/software/network — any four of name, IP, MAC, type, class/OS/capacity, serial, manufacturer/model, version, location (1.5)',
      'Cost of creation and past maintenance given as a value factor (1)',
      'Replacement cost given as a value factor (1)',
      'Value provided — to owners, as intellectual property, and to adversaries (1)',
      'Weighted factor analysis explained — score 0.1–1.0 against weighted factors, multiplied and summed (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: '§12',
    question: 'It is said that the goal of information security is not to bring residual risk to zero. Explain what is meant by this, and what the goal actually is.',
    modelAnswer: "Residual risk is the risk that remains after controls have been applied. The proposition is that reducing it to zero is not the objective, and this is so for two reasons. The first is that it is unattainable: perfect security is impossible to obtain, since security is a continuous process rather than an absolute state and the threat environment does not stand still. The second is that it would not be rational even if it were attainable, because the cost of controlling a risk can exceed the cost of the exposure itself — which is precisely why Accept is one of the five recognised risk control strategies. The actual goal is to bring residual risk into line with the organization's comfort zone, or risk appetite: the level of risk the organization has consciously decided it is willing to carry in pursuit of its objectives. Risk management is therefore a matter of deliberate, documented judgement about how much risk to retain, not an attempt at elimination.",
    markScheme: [
      'Residual risk defined — the risk remaining after controls are applied (1.5)',
      'Explains that zero is unattainable — security is a continuous process, not an absolute state (1.5)',
      'Explains that zero is not rational — cost of control can exceed cost of exposure (1.5)',
      'States the actual goal — aligning residual risk with the organization\'s comfort zone or risk appetite (1.5)',
    ],
  },
];
