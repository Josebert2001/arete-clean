// Compact knowledge base for the Arete AI Tutor.
// Consumed only by api/tutor.js — not bundled into the frontend.

export const COURSE_KNOWLEDGE = `
=== B.Sc. CYBERSECURITY — UNIVERSITY OF UYO — FULL COURSE CATALOGUE ===

── 100 LEVEL · FIRST SEMESTER (17 units) ────────────────────────────────────

GST 111 | Communication in English | 2 units
Skills: reading comprehension, essay writing (expository, argumentative, narrative), grammar (tenses, agreement, punctuation), oral communication, note-taking, academic vocabulary, technical writing.
Textbooks: "Communicating in English" (Aremo, Adetayo & Farinde); "English Grammar in Use" (Raymond Murphy, 5th ed).
Tips: Writing skills affect every other course. Practise timed essays (45 min). Read one news article daily; note unfamiliar words. Keep a grammar-error log.

MTH 111 | General Mathematics I | 2 units
Skills: number systems (real/rational/irrational/complex), algebra, polynomials, indices, logarithms, set theory, Venn diagrams, sequences and series, permutations and combinations, limits and continuity.
Textbooks: "Engineering Mathematics" (K.A. Stroud, 8th ed); "Further Mathematics" (Tuttuh-Adegun et al).
Tips: Do worked examples before attempting exercises. Logarithm rules recur in cryptography — master them now. Use past exam papers.

PHY 111 | General Physics I | 2 units
Skills: vectors, kinematics, Newton's laws, work-energy-power, rotational motion, oscillations, waves (mechanical, sound), thermodynamics, ideal gas laws.
Textbooks: "University Physics" (Young & Freedman, 14th ed); "Physics for Scientists and Engineers" (Serway & Jewett).
Tips: Draw free-body diagrams always. Master unit conversions. Wave concepts underpin signal processing and networking.

PHY 117 | General Practical Physics I | 1 unit
Skills: measurement and error analysis, vernier callipers, micrometer screw gauge, pendulum experiments, Hooke's law, lab report writing.
Tips: Record raw data immediately; never adjust numbers in your lab book. Sig-fig rules matter in the report.

COS 111 | Introduction to Computing Sciences | 3 units
Skills: computer organisation (CPU, memory, I/O), number systems (binary, hex, octal, BCD), Boolean algebra, logic gates, OS concepts (process management, memory, file systems), database fundamentals (ER diagrams, SQL basics), internet basics, computer ethics.
Textbooks: "Computer Organisation and Design" (Patterson & Hennessy); "Introduction to the Theory of Computation" (Sipser).
Tips: Binary/hex conversion is tested in CYB and COS exams — drill it. Draw ER diagrams for database questions; examiners reward structure.

STA 111 | Descriptive Statistics | 2 units
Skills: data collection and sampling, frequency distributions, histograms, measures of central tendency (mean, median, mode), measures of dispersion (variance, standard deviation, range), probability basics, correlation.
Textbooks: "Statistics for Management" (Levin & Rubin); "Fundamentals of Statistics" (Gupta & Kapoor).
Tips: Statistics underpins cybersecurity anomaly detection and risk quantification — treat it seriously. Learn Excel/LibreOffice Calc for data tasks.

UYY-CSC 111 | Computer Operations | 2 units
Skills: Windows/Linux file management, keyboard shortcuts, Office 365 (Word, Excel, PowerPoint), OneDrive/Google Drive, cloud storage, email etiquette, internet research skills.
Tips: Learn keyboard shortcuts — they save hours. Practise Excel formulas; they are tested in STA and INS courses.

UYY-CSC 112 | Computer Troubleshooting | 3 units
Skills: motherboard components, CPU/RAM identification, HDD vs SSD, power supply, OS installation (Windows/Linux), driver management, peripheral configuration, basic networking troubleshooting (ping, ipconfig, tracert).
Tips: Disassemble and reassemble a PC at least once before the practical exam. Know the POST beep codes.

── 100 LEVEL · SECOND SEMESTER (16 units) ───────────────────────────────────

GST 121 | Nigerian Peoples and Culture | 2 units
Skills: ethnic and linguistic diversity of Nigeria, pre-colonial civilisations, colonisation, federalism, governance structures, cybercrime in the Nigerian context.
Tips: Frame answers in the cybercrime/digital-policy context to score higher — examiners appreciate applied thinking.

COS 121 | Problem Solving — Python | 3 units
Skills: algorithm design, pseudocode, flowcharts, programming fundamentals using Python 3 — variables, control flow, loops, functions, lists, dictionaries, file I/O, basic OOP.
Textbooks: "Python Crash Course" (Eric Matthes, 3rd ed); "Automate the Boring Stuff with Python" (Al Sweigart — free online).
Tips: Code every day, even 20 minutes. The Python interactive programming track on Arete covers COS 121 in full — use it. Typing code yourself beats copy-paste.

MTH 121 | General Mathematics II | 2 units
Skills: trigonometry, differentiation (chain/product/quotient rules), integration (substitution, by parts), differential equations (first and second order), coordinate geometry.
Textbooks: "Engineering Mathematics" (K.A. Stroud); "Calculus" (James Stewart).
Tips: Differential equations appear in signal analysis and modelling — understand them conceptually, not just mechanically.

PHY 121 | General Physics II | 2 units
Skills: electrostatics (Coulomb's law, Gauss's law), electric circuits (Ohm's law, Kirchhoff's laws), capacitance, magnetism, electromagnetic induction, AC circuits, optics (reflection, refraction, interference), modern physics (photoelectric effect, atomic models).
Tips: Kirchhoff's laws are tested in networking hardware courses. Electromagnetic induction underpins data storage.

PHY 128 | General Practical Physics II | 1 unit
Skills: electricity labs (Wheatstone bridge, potentiometer), optics labs (mirrors, lenses), magnetic field mapping, data analysis and graph plotting.

UYY-CYB 121 | Introduction to Computer Networks | 2 units
Skills: OSI model (all 7 layers and their functions), TCP/IP model, IP addressing (IPv4 classes, subnetting, CIDR), MAC addresses, switching and routing fundamentals, DHCP, DNS, HTTP/HTTPS, Wi-Fi (802.11), common ports and protocols.
Textbooks: "Computer Networking: A Top-Down Approach" (Kurose & Ross, 8th ed).
Tips: OSI layer questions are universal in cybersecurity exams — know which protocol lives on which layer. Practice subnetting until it is automatic.

UYY-CSC 121 | Introduction to Web Programming | 2 units
Skills: HTML5 (semantic elements, forms, tables), CSS3 (box model, flexbox, media queries, variables), JavaScript basics (DOM manipulation, events, fetch API), responsive design, introduction to React or Vue, web security basics (XSS, CSRF, content security policy).
Tips: Inspect every website you visit using browser dev tools. The XSS and CSRF concepts recur throughout the cybersecurity curriculum.

UYY-CYB 122 | Principles and Practice of Information Security | 2 units
Skills: CIA triad (confidentiality, integrity, availability), threat taxonomy, vulnerability vs exploit, authentication methods (passwords, MFA, biometrics), access control models (DAC, MAC, RBAC), security policies and standards, basic cryptography concepts.
Textbooks: "Information Security: Principles and Practice" (Mark Stamp); "Security Engineering" (Ross Anderson, 3rd ed — free online).
Tips: The CIA triad is the foundation of all CYB exams. Memorise the access control models with examples — they appear repeatedly.

── 200 LEVEL · FIRST SEMESTER (15 units) ────────────────────────────────────

GST 212 | Philosophy, Logic and Human Existence | 2 units
Skills: propositional logic (truth tables, connectives), argument validity, fallacies, epistemology, ethics (utilitarianism, deontology, virtue ethics), philosophy of mind, bioethics, cyberethics.
Tips: Truth tables come up in COS 211 boolean logic. Apply ethical frameworks to cybersecurity case studies in exam essays.

COS 211 | Computer Programming I — Java | 3 units
Skills: Java OOP (classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces), exception handling, Java Collections Framework (ArrayList, HashSet, HashMap), file I/O (FileReader, FileWriter, BufferedWriter), JDBC and database connectivity, Swing GUI programming, event handling.
Textbooks: "Head First Java" (Sierra & Bates, 3rd ed); "Java: The Complete Reference" (Herbert Schildt).
Tips: Use the Java interactive track on Arete (13 modules) — it covers COS 211 completely. Do not memorise syntax; understand the concepts. Build the mini projects for every module.

CYB 211 | Introduction to Cybersecurity and Strategy | 2 units
Skills: threat landscape (malware types, social engineering, phishing, ransomware), attack lifecycle, NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover), cybersecurity governance, national and international cybersecurity strategies, zero-trust architecture introduction.
Textbooks: "Cybersecurity Essentials" (Cisco NetAcad); "Cybersecurity and Cyberwar" (Singer & Friedman).
Tips: NIST CSF is a must-know framework — learn all five functions and their subcategories. Expect scenario-based questions asking you to apply the framework.

CYB 213 | Cybercrime, Law and Countermeasures | 2 units
Skills: types of cybercrime (fraud, identity theft, hacking, CSAM), Cybercrimes Act 2015 (Nigeria), EFCC mandate, Budapest Convention on Cybercrime, GDPR principles, digital evidence collection, incident response basics, cyber law enforcement challenges in Nigeria.
Tips: Know the Cybercrimes Act 2015 sections — examiners test specific provisions. The Budapest Convention is the international framework; know which countries signed it.

SEN 211 | Introduction to Software Engineering | 2 units
Skills: SDLC models (waterfall, agile, spiral, RAD), requirements engineering (functional vs non-functional), UML diagrams (use case, class, sequence, activity), software testing (unit, integration, system, UAT, black-box vs white-box), version control (Git basics), Secure SDLC (SAST, DAST, threat modelling).
Textbooks: "Software Engineering" (Ian Sommerville, 10th ed); "Clean Code" (Robert C. Martin).
Tips: UML diagrams are consistently examined. Know the difference between verification and validation. Git is used in practicals — learn add, commit, push, pull, branch, merge.

UYY-CYB 215 | Fundamentals of IoT | 2 units
Skills: IoT architecture (perception, network, application layers), IoT protocols (MQTT, CoAP, Zigbee, Z-Wave, LoRaWAN), microcontrollers (Arduino, Raspberry Pi), IoT in smart homes/cities/health, OWASP IoT Top 10 vulnerabilities, IoT security hardening.
Tips: Know the OWASP IoT Top 10 — questions are almost guaranteed. Understand the difference between MQTT (lightweight pub-sub) and CoAP (RESTful for constrained devices).

UYY-CYB 211 | Ethical Hacking Fundamentals | 2 units
Skills: ethical hacking methodology, reconnaissance (OSINT, Google dorking, WHOIS, Shodan), scanning and enumeration (Nmap, Nessus), vulnerability exploitation basics, OWASP Top 10 (injections, broken auth, XSS, IDOR, security misconfiguration, etc.), penetration testing report writing, legal and ethical boundaries.
Tips: Every step of a pen test requires written authorisation — always state this in exam answers. Know Nmap flags: -sS, -sV, -A, -p. The OWASP Top 10 appears in multiple courses.

── 200 LEVEL · SECOND SEMESTER (17 units) ───────────────────────────────────

ENT 221 | Entrepreneurship and Innovation | 2 units
Skills: entrepreneurial mindset, opportunity identification, business model canvas, market research, competitive analysis, feasibility studies, intellectual property (patents, trademarks, copyright), startup finance, funding options (NIRSAL, NELFUND, angel investors), pitching.
Tips: Relate all answers to technology/cybersecurity startups — it shows applied thinking. Business Model Canvas is a common exam structure question.

COS 221 | Computer Programming II — Java (Advanced) | 3 units
Skills: data structures (linked lists, stacks, queues, binary trees), algorithms (linear/binary search, bubble/selection/insertion/merge/quick sort), Big-O notation (O(1), O(log n), O(n), O(n²)), recursion depth, graph algorithms (BFS, DFS), dynamic programming introduction.
Textbooks: "Data Structures and Algorithm Analysis in Java" (Weiss); "Introduction to Algorithms" (CLRS).
Tips: Big-O is tested in every COS 221 exam — know the complexities of all sorting algorithms. Draw trees and graphs for structural questions; diagrams earn marks.

INS 224 | System Analysis and Design | 2 units
Skills: systems thinking, system development life cycle, requirements gathering techniques (interviews, questionnaires, observation, JAD), data flow diagrams (context, level-0, level-1), entity-relationship diagrams, data dictionaries, system feasibility (technical, economic, operational), system testing and acceptance.
Textbooks: "Systems Analysis and Design" (Kendall & Kendall); "Modern System Analysis and Design" (Hoffer et al).
Tips: Draw DFDs level by level — a context diagram always comes first. ER diagrams must show cardinality.

CYB 224 | Information and Big Data Security | 3 units
Skills: data classification frameworks, structured vs unstructured data, big data (5 Vs), encryption at rest and in transit, data loss prevention (DLP), GDPR principles and rights, Nigeria Data Protection Regulation (NDPA/NDPR 2023), cloud data security, data masking and tokenisation.
Tips: Know GDPR's 8 data subject rights. Understand the difference between NDPR 2019 and NDPA 2023. Big data security questions often involve real-world breach scenarios.

CYB 222 | Cybersecurity Innovation and New Technologies | 3 units
Skills: AI/ML in threat detection, adversarial machine learning, blockchain for security, quantum computing threats to cryptography (post-quantum algorithms), cloud security models, zero-trust architecture (BeyondCorp), edge computing security, 5G security, autonomous vehicle security.
Tips: Zero-trust is a major exam topic — understand "never trust, always verify." Know what post-quantum cryptography aims to solve.

UYY-CYB 221 | Network Defense Fundamentals | 2 units
Skills: firewalls (packet filtering, stateful inspection, NGFW), intrusion detection and prevention (IDS vs IPS, Snort rules), VPN (IPSec, SSL/TLS), network segmentation (DMZ, VLANs), Wireshark packet analysis, SIEM concepts (log aggregation, correlation rules, alerts), honeypots.
Tips: Know the difference between IDS (passive, alerts only) and IPS (active, blocks). DMZ architecture is a frequently drawn diagram. Learn basic Wireshark filters.

UYY-CYB 222 | Web and Mobile Application Security | 2 units
Skills: OWASP Top 10 in depth (A01–A10: injection, broken access, cryptographic failures, XML external entities, security misconfiguration, vulnerable components, auth failures, SSRF, etc.), SQL injection (error-based, blind, time-based), XSS (reflected, stored, DOM), CSRF tokens, API security (REST/GraphQL), JWT vulnerabilities, Android/iOS security models, mobile app penetration testing.
Tips: SQL injection and XSS are the most tested web vulnerabilities. Know both how they work AND how to mitigate them. JWT attacks (none algorithm, algorithm confusion) appear in advanced questions.

── 300 LEVEL · FIRST SEMESTER (15 units) ────────────────────────────────────

GST 312 | Peace and Conflict Resolution | 2 units
Skills: conflict theory, conflict types, negotiation and mediation, post-conflict reconstruction, information warfare, cyber conflict as a form of modern conflict, disinformation and propaganda.
Tips: Frame answers with Nigerian/African examples. Cyber conflict questions bridge to CYB 413.

COS 319 | Artificial Intelligence | 3 units
Skills: state-space search (BFS, DFS, A*, heuristics), knowledge representation (predicate logic, semantic nets, frames), expert systems (inference engines, rule bases), machine learning (supervised, unsupervised, reinforcement), neural networks (perceptrons, backpropagation, activation functions), NLP basics, AI ethics and bias.
Textbooks: "Artificial Intelligence: A Modern Approach" (Russell & Norvig, 4th ed).
Tips: AI search algorithms are very commonly examined — trace A* step by step. AI ethics overlaps with CYB 314 and exam essays.

CYB 311 | Cryptography Techniques, Algorithms and Applications | 3 units
Skills: classical ciphers (Caesar, Vigenère, one-time pad), symmetric encryption (DES, 3DES, AES — modes: ECB, CBC, CTR, GCM), asymmetric encryption (RSA — key generation, encryption, signing), Diffie-Hellman key exchange, elliptic curve cryptography (ECC), hash functions (MD5, SHA-1, SHA-256, SHA-3), digital signatures, certificates, PKI, TLS/SSL handshake, steganography basics.
Textbooks: "Cryptography and Network Security" (Stallings, 8th ed); "Introduction to Modern Cryptography" (Katz & Lindell).
Tips: RSA key generation steps (choose p & q, compute n and φ(n), find e and d) are a guaranteed exam question. Know AES modes and which are authenticated (GCM). SHA-256 collision resistance matters for blockchain.

CYB 312 | Biometrics Security | 2 units
Skills: biometric modalities (fingerprint, face, iris, retina, voice, gait, keystroke dynamics), biometric system architecture, accuracy metrics (FAR, FRR, EER, CRR), liveness detection, spoofing attacks and anti-spoofing, multimodal biometrics, biometric data privacy (GDPR Art. 9 special category), biometric applications in e-passport, mobile unlock, border control.
Tips: FAR, FRR, and EER definitions are tested — know what each measures and the trade-off between them. Liveness detection is an exam hot topic.

CYB 313 | Cybersecurity Risks Analysis, Challenges and Mitigation | 2 units
Skills: risk concepts (threat, vulnerability, impact, likelihood), quantitative risk analysis (ALE = ARO × SLE), qualitative risk (risk matrices), risk treatment (accept, mitigate, transfer, avoid), threat modelling (STRIDE, DREAD, PASTA, attack trees), NIST Risk Management Framework, ISO 27005, BCP and disaster recovery (RTO, RPO), security controls taxonomy (preventive, detective, corrective, compensating).
Textbooks: "Risk Management Framework" (NIST SP 800-37).
Tips: ALE formula is always examined — practise calculations. Know the four risk treatment options with examples. STRIDE mnemonic: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege.

CYB 314 | Cybersecurity Innovation and New Technologies (Advanced) | 2 units
Skills: DevSecOps (shift-left security, CI/CD pipeline security, SAST/DAST/SCA), containerisation security (Docker, Kubernetes security contexts, image scanning), 5G security architecture, software-defined networking (SDN) security, threat hunting methodology, extended detection and response (XDR), threat intelligence platforms.
Tips: DevSecOps and container security are newer topics — expect essay questions. Know the difference between SAST (static), DAST (dynamic), and SCA (dependency scanning).

UYY-CYB 315 | Lab for Cyber Attacks and Vulnerability Testing | 2 units
Skills: Kali Linux toolset, Metasploit framework (auxiliary, exploit, post modules; msfconsole commands), Nessus/OpenVAS vulnerability scanning, Burp Suite (proxy, scanner, repeater, intruder), password cracking (John the Ripper, Hashcat, rainbow tables), privilege escalation techniques, reporting findings.
Tips: Always mention authorisation and scope in practical/essay answers. Metasploit workflow: use auxiliary/exploit → set RHOSTS/LHOST → run. Burp Suite is the standard web app testing tool.

── 300 LEVEL · SECOND SEMESTER — SIWES ─────────────────────────────────────

SIWES I (300L) | Student Industrial Work Experience Scheme I | 6 units
Placement in cybersecurity, IT, or technology organisation. Supervised work experience with monthly reports and a final logbook. Students work in roles like SOC analyst, network support, IT help desk, web security, or software development.
Tips: Keep a detailed daily logbook from day one. Your supervisor's assessment is a significant portion of your grade. Identify one real security challenge at your workplace and document it for your seminar paper.

CYB 399 | SIWES II / Industrial Training | 6 units
Extended or continued industrial placement.

MINI | Mini Project | 2 units
Small-scale research or development project to prepare for the final year project. Choose a cybersecurity topic, conduct literature review, and produce a technical report.

SEM | Seminar | 1 unit
Student-led presentation on a current cybersecurity topic. Assessed on content quality, depth, presentation delivery, and ability to answer questions.

── 400 LEVEL · FIRST SEMESTER (17 units) ────────────────────────────────────

CYB 411 | Systems Vulnerability Assessment and Testing | 3 units
Skills: CVE/CVSS scoring (CVSS v3.1 — base, temporal, environmental metrics), vulnerability assessment vs penetration testing, automated scanning (Nessus, OpenVAS, Qualys), manual testing methodology, exploit verification, false positive analysis, remediation prioritisation, professional report writing (executive summary, technical findings, risk rating, recommendations).
Tips: Know CVSSv3 scoring components and how to calculate base scores. The difference between vulnerability assessment (find) and pen testing (find + exploit + report) is a common question.

CYB 412 | Steganography — Access Methods and Data Hiding | 2 units
Skills: steganography vs cryptography, spatial domain techniques (LSB substitution, bit-plane complexity), frequency domain (DCT-based, JPEG steganography), audio steganography (echo hiding, phase coding), network steganography (covert channels in IP headers, TCP timestamps), text steganography (whitespace, synonym substitution), steganalysis (visual attack, RS analysis, chi-square test, machine learning), forensic extraction tools (StegHide, OpenStego, Stegsolve).
Tips: Know the difference between steganography (hide existence of message) and cryptography (hide content). LSB insertion is the classic spatial domain technique — be able to explain it step by step.

CYB 413 | Cyber Threat Intelligence and Cyber Conflict | 3 units
Skills: intelligence cycle (planning, collection, processing, analysis, dissemination, feedback), threat intelligence types (strategic, tactical, operational, technical), MITRE ATT&CK framework (tactics, techniques, sub-techniques, procedures), indicator of compromise (IOC) types (IP, hash, domain, YARA rules), threat actor taxonomy (nation-state APTs, hacktivists, cybercriminals, insider threats), OSINT tools (Maltego, Shodan, TheHarvester, VirusTotal, Censys), cyber conflict and international law (Tallinn Manual).
Textbooks: "The Threat Intelligence Handbook" (CrowdStrike — free online); MITRE ATT&CK documentation.
Tips: Learn at least 5 APT groups (Lazarus, APT28/Fancy Bear, APT41, Cozy Bear, Charming Kitten) and their attributed nation-states. MITRE ATT&CK phases must be memorised for exam questions.

CYB 414 | Cloud Computing Security | 3 units
Skills: cloud service models (IaaS, PaaS, SaaS) and responsibility matrix, deployment models (public, private, hybrid, multi-cloud), cloud IAM (identity federation, RBAC, ABAC, least privilege), encryption in cloud (key management, KMS, HSM), cloud security posture management (CSPM), container and serverless security, MITRE ATT&CK for Cloud, cloud compliance (ISO 27017, SOC 2, FedRAMP), major cloud providers (AWS, Azure, GCP) security features.
Tips: The shared responsibility model is always examined — know exactly what the provider vs customer is responsible for in IaaS vs SaaS. Cloud IAM misconfiguration is the #1 cloud breach cause.

COS 411 | Research Methodology and Technical Report Writing | 2 units
Skills: research design (exploratory, descriptive, explanatory), quantitative vs qualitative methods, literature review and citation (APA 7), hypothesis formation and testing, data collection (surveys, interviews, observation), statistical analysis for research (correlation, regression basics), technical report structure (abstract, introduction, methodology, results, discussion, conclusion), academic integrity and plagiarism.
Tips: Your FYP (CYB 497/498) depends entirely on these skills. Master APA 7 citation format. The abstract is a 150–250 word standalone summary — practice writing them.

CYB 497 | Final Year Project I | 2 units
First semester of the two-semester FYP. Deliverables: topic approval form, comprehensive literature review, problem statement, objectives, research methodology, preliminary implementation or prototype.
Tips: Choose a topic early. A focused, feasible topic scores higher than an ambitious one you cannot complete. Document everything as you go — your logbook is evidence of progress.

UYY-CYB 411 | Business Intelligence for SMEs | 2 units
Skills: data warehousing concepts (OLAP vs OLTP, star schema, snowflake schema), ETL (extract, transform, load), BI tools (Power BI, Tableau, Excel pivot tables), KPI design, data storytelling and visualisation, cybersecurity BI (threat dashboards, security metrics), BI tool security (row-level security, audit logs).
Tips: Learn to build a basic Power BI or Tableau dashboard before the practical exam. Data storytelling — presenting insights clearly — is assessed in the viva.

── 400 LEVEL · SECOND SEMESTER (15 units) ───────────────────────────────────

ENT 321 | Venture Creation | 2 units
Skills: business plan development, company registration (CAC Nigeria, online process), funding sources (NIRSAL, NELFUND, TEF, angel investors, VCs), intellectual property for tech startups (software copyright, trade secrets, patents), growth strategies, social entrepreneurship, pitch deck design.
Tips: Know the CAC registration process step by step — it is specifically tested. Relate every answer to a cybersecurity or tech startup context.

CYB 421 | Ethical Hacking and Reverse Engineering | 3 units
Skills: advanced penetration testing methodology, exploit development (buffer overflow basics — stack layout, EIP control, shellcode), return-oriented programming (ROP) introduction, reverse engineering tools (Ghidra, IDA Free, x64dbg, strings, ltrace/strace), malware analysis (static: PE headers, strings, imports; dynamic: sandbox analysis, process monitor, network captures), antivirus evasion concepts, advanced post-exploitation, lateral movement, persistence mechanisms.
Tips: Buffer overflow mechanics — understand the stack layout, EIP overwrite, and NOP sled. Ghidra is the free NSA tool — know its decompilation workflow.

CYB 422 | Deep and Dark Web Security | 2 units
Skills: surface/deep/dark web definitions, Tor network (onion routing, relay types: guard, middle, exit), .onion hidden services, dark web marketplaces (history: Silk Road), OSINT on the dark web (Ahmia, dark web search engines), law enforcement techniques (takedowns, deanonymisation), I2P and Freenet comparison, legal dark web use cases (journalism, privacy), cybercriminal infrastructure, cryptocurrency tracing.
Tips: Know the three types of Tor relays and their roles. The definition distinction between deep web (indexed vs not indexed) and dark web (requires special software) is almost always examined.

CYB 423 | Digital Forensics and Investigation Method | 3 units
Skills: forensic principles (Locard's exchange, chain of custody, admissibility), write-blockers and forensic imaging (dd, FTK Imager, dcfldd), file system forensics (NTFS artefacts: MFT, $LogFile, prefetch; EXT4 inodes), memory forensics (Volatility framework: pslist, cmdline, malfind, netscan), network forensics (pcap analysis, Wireshark, NetworkMiner, NetFlow), email forensics (header analysis, X-Originating-IP), mobile forensics (iOS/Android extraction, Cellebrite), malware forensics, report writing and expert witness testimony.
Textbooks: "The Art of Memory Forensics" (Ligh et al); "File System Forensic Analysis" (Carrier).
Tips: Chain of custody is the legal foundation — one break can make evidence inadmissible. Know Volatility commands: pslist, pstree, malfind, cmdline, netscan, dumpfiles.

CYB 498 | Final Year Project II | 2 units
Completion semester. Full implementation, testing, documentation, thesis submission, and oral defence (viva voce).
Tips: Practise your 10-minute oral presentation until it is effortless. Expect 3–5 technical questions about your methodology and findings. Have your code, experiments, and results ready to demonstrate.

UYY-CYB 424 | Database Management and Control System | 2 units
Skills: advanced SQL (joins, subqueries, stored procedures, triggers, views, transactions, ACID properties), query optimisation (EXPLAIN, indexing strategies, covering indexes), NoSQL databases (MongoDB, Cassandra, Redis — use cases and trade-offs), database security (SQL injection prevention, parameterised queries, DAC/MAC for databases, auditing and logging), database activity monitoring (DAM), backup and recovery.
Tips: Know the ACID properties with database-specific examples. SQL injection prevention — always use parameterised queries; never string concatenation. The difference between OLTP and OLAP is frequently tested.

UYY-CYB 425 | Enterprise Security and Information Assurance | 1 unit
Skills: ISO 27001/27002 (ISMS, Annex A controls), COBIT 2019 governance framework, ITIL v4 service management, CISSP domains overview (8 domains), enterprise risk management, business continuity management (BCM, ISO 22301), security awareness and training programmes, security metrics and KPIs, third-party risk management (vendor due diligence, SLAs, right-to-audit).
Tips: Know the ISO 27001 Annex A control categories. The difference between ISO 27001 (requirements) and ISO 27002 (guidelines) is tested. COBIT aligns IT governance with business goals — use that framing in essays.
`;

export const LECTURE_NOTES_KNOWLEDGE = `
=== UPLOADED LECTURE NOTES (AUTHORITATIVE CONTENT FROM LECTURERS) ===

── CYB 224: Information and Big Data Security ───────────────────────────────

TOPIC 1: Introduction to Big Data Security

Definition: Big Data Security = tools, policies, and measures to protect large volumes of data from unauthorized access, breaches, and misuse throughout its lifecycle (collection → processing → storage).

The 5 Vs of Big Data:
  Volume   — the large amount of data generated and stored
  Velocity — the speed at which data is generated and processed
  Variety  — the different types and formats of data (structured, semi-structured, unstructured)
  Veracity — the quality, accuracy, and reliability of the data
  Value    — the ultimate goal: turning data into meaningful insight

Sources of Big Data:
  M2M (Machine to Machine) — data exchanged between connected devices
  People to Machine — data generated through human interactions with technology
  Organisational Data — data produced by businesses and institutions

TOPIC 2: Operational and Analytical Big Data (Lecture: 02/06/2026)

Operational Big Data — real or nearly real-time data supporting daily business operations.
  Characteristics: processes data immediately, supports transactional systems, requires fast processing, continuously updated.
  Sources: social media, online transactions, ATM transactions, IoT sensors, mobile apps, GPS.
  Examples: online banking transactions, e-commerce orders, hospital patient monitoring, airline reservations, traffic management.
  Technologies: Apache Kafka, Apache Storm, Apache Flink.
  Advantages: real-time decision making, faster customer response, improved operational efficiency, enhanced customer experience.
  Disadvantages: high infrastructure cost, data security concerns, complex management.

Analytical Big Data — historical and accumulated data for analysis, forecasting, and strategic decisions.
  Characteristics: focuses on past/current data, supports BI and analytics, used for trend analysis, stored in data warehouses.
  Sources: historical transaction records, customer databases, business reports, data warehouses, web logs.
  Examples: sales trends, customer behaviour analysis, market forecasting, fraud detection, academic research.
  Technologies: Apache Spark, BI tools, machine learning platforms.
  Challenges: large storage requirements, data integration difficulties, complex analysis, privacy concerns.

Comparison Table — Operational vs Analytical:
  Nature:      Real-time / near real-time           vs  Historical / accumulated
  Purpose:     Daily operations & decisions         vs  Analysis, forecasting, strategy
  Freshness:   Continuously updated                 vs  Stored in data warehouses
  Focus:       Transactional systems                vs  Business intelligence & trends
  Tech:        Kafka, Storm, Flink                  vs  Spark, BI tools, ML platforms
  Examples:    ATM txn, GPS, e-commerce             vs  Sales trends, fraud detection

TOPIC 3: Big Data Skills (Lecture: 09/06/2026)

Definition: Big Data Skills = knowledge, abilities, and competencies required to collect, process, store, analyze, visualize, and interpret large amounts of data.

5 Categories:
  1. Technical Skills — programming (Python, Java), database management (MySQL, Oracle), big data frameworks (Hadoop, Spark, Kafka)
  2. Analytical Skills — data transformation, statistical analysis, pattern recognition; tools: Python, Excel, Spark
  3. Business Skills — translating analysis into actionable business insights and strategic decisions
  4. Communication Skills — report writing, presentation, team collaboration, storytelling with data
  5. Problem Solving Skills — data-driven approach to complex business problems

Problem Solving Steps: Identify problem → Collect data → Analyse data → Generate insights → Recommend solutions

Case Study (Assignment): UniUyo wants to improve student performance using big data analytics.
  Tasks: (1) identify data sources, (2) explain collection and storage, (3) determine analytics type,
         (4) recommend tools, (5) discuss benefits and challenges.
`;

export const MODULE_KNOWLEDGE = `
=== INTERACTIVE PROGRAMMING TRACKS — FULL MODULE CATALOGUE ===

── JAVA TRACK (COS 211 / COS 221) — 13 modules ──────────────────────────────

Module 01 | Java Foundations — Variables, Data Types & Hello World
Theory: What is Java | JVM and "Write Once Run Anywhere" | Structure of a Java program (class, main method) | Primitive data types (int, double, String, boolean, char) | Variable declaration and initialisation | Taking user input with Scanner
Code examples cover: HelloWorld, variable declarations, Scanner-based greeter.
Practice questions on: choosing correct data type | System.out.println vs print | valid variable declarations | Scanner nextLine vs next
Mini Project: Student Info Greeter — reads name, age, GPA and prints a formatted profile.

Module 02 | Control Flow — Decisions and Boolean Logic
Theory: What is control flow | Boolean logic (&&, ||, !) | if, else-if, else chains | switch statement and fall-through | Ternary operator | Nested conditionals
Code examples cover: grade classifier, day-of-week switch.
Practice questions on: && operator truth table | break in switch | evaluation order of conditions
Mini Project: University Grade Calculator — reads exam scores and outputs letter grades and class (1st, 2:1, etc.).

Module 03 | Loops — for, while, do-while
Theory: Why loops exist | for loop syntax and flow | while loop | do-while (always runs at least once) | break and continue | Nested loops
Code examples cover: counting loops, input validation, multiplication tables.
Practice questions on: iteration count | do-while guarantee | i++ vs ++i | break exits innermost loop only
Mini Project: Multiplication Table Generator — takes a number and prints its table.

Module 04 | Arrays — Single and Multi-dimensional
Theory: What is an array | Zero-based indexing | Fixed size constraint | Array length property | Iterating with enhanced for-each loop | 2D arrays | Common array errors (ArrayIndexOutOfBoundsException)
Code examples cover: score storage, 2D matrix operations.
Practice questions on: last element index (length-1) | .length property | fixed vs dynamic size | initialisation syntax
Mini Project: Student Score Analyser — stores 5 scores, finds highest, lowest, average.

Module 05 | Methods — Defining, Calling, Recursion
Theory: What is a method | Method signature (access, return type, name, parameters) | void vs return type | Method overloading | Variable scope (local vs instance) | Recursion and base case | Stack overflow risk
Code examples cover: math utilities, recursive factorial, overloaded area methods.
Practice questions on: void meaning | overloading vs overriding | base case requirement | scope errors
Mini Project: Math Utility Class — methods for factorial, power, isPrime, GCD.

Module 06 | OOP Part 1 — Classes, Objects, Constructors, Encapsulation
Theory: What is OOP | Class is the blueprint; object is the instance | Constructor (no return type, same name as class) | Encapsulation with private fields and public getters/setters | The this keyword | Default vs parameterised constructors
Code examples cover: BankAccount class, Person class with validation in setters.
Practice questions on: class vs object | constructor purpose | private + getter/setter pattern | this disambiguation
Mini Project: BankAccount Class — deposit, withdraw, getBalance with validation.

Module 07 | OOP Part 2 — Inheritance, Polymorphism, Interfaces
Theory: Inheritance (extends keyword) | Method overriding and @Override | super() call | Polymorphism — one interface, multiple behaviours | Abstract classes (cannot be instantiated) | Interfaces (implements, default methods) | Single inheritance restriction in Java
Code examples cover: Animal → Dog/Cat hierarchy, Shape abstract class with area().
Practice questions on: extends keyword | @Override annotation | abstract vs interface | single inheritance
Mini Project: Animal Hierarchy — Animal base, Dog/Cat/Bird subclasses with overridden speak() and move().

Module 08 | Exception Handling — try, catch, finally, Custom Exceptions
Theory: What is an exception | Checked vs unchecked exceptions | try-catch block flow | Multiple catch blocks | finally always runs | throw keyword | throws in method signature | Creating custom exception classes
Code examples cover: divide-by-zero catch, custom InsufficientFundsException.
Practice questions on: finally guarantee | ArithmeticException trigger | throws in signature | checked vs unchecked
Mini Project: Safe Calculator — validates input, catches divide-by-zero, logs errors to file.

Module 09 | Collections — ArrayList, HashSet, HashMap
Theory: Why the Collections Framework exists | ArrayList (ordered, allows duplicates, dynamic size) | HashSet (unordered, no duplicates) | HashMap (key-value pairs, O(1) average lookup) | Generics for type safety | Iterating with for-each and iterators
Code examples cover: student list management, HashSet dedup, grade lookup with HashMap.
Practice questions on: HashSet rejection of duplicates | HashMap.get() | ArrayList vs array | generics purpose
Mini Project: Student Records Manager — CRUD operations on ArrayList<Student>.

Module 10 | Files and Threads
Theory: File handling (FileWriter, BufferedWriter, FileReader, BufferedReader) | Append mode | Reading line by line | What is a thread | Thread lifecycle (new, runnable, running, blocked, terminated) | Extending Thread vs implementing Runnable | start() vs run() | Synchronisation and race conditions
Code examples cover: file writing with append, two-thread counter with and without synchronisation.
Practice questions on: FileWriter second arg for append | t.start() launches new thread | t.run() runs in same thread | synchronized prevents race conditions
Mini Project: Activity Logger — logs timestamped events to file; background thread monitors inactivity.

Module 11 | Strings and StringBuilder
Theory: String is a class, not a primitive | String pool and immutability | Common String methods (length, charAt, substring, indexOf, toUpperCase, toLowerCase, trim, split, replace, contains) | equals() vs == | StringBuilder for mutable strings (performance in loops) | String.format()
Code examples cover: palindrome checker, word count, StringBuilder concatenation loop.
Practice questions on: equals() vs == | substring(start, end) — end exclusive | StringBuilder performance | String immutability means new object on modification
Mini Project: Text Analyser — reads a paragraph, counts words, finds most common character, reverses.

Module 12 | JDBC — Database Connectivity
Theory: What is JDBC | Four-step pattern (load driver, get connection, create statement, execute) | PreparedStatement vs Statement (SQL injection prevention) | ResultSet navigation with next() | CRUD operations (INSERT, SELECT, UPDATE, DELETE) | Closing resources with try-with-resources
Code examples cover: connection setup, parameterised INSERT, SELECT with ResultSet loop.
Practice questions on: PreparedStatement prevents injection | rs.next() cursor advance | try-with-resources | WHERE clause for update/delete
Mini Project: Student Database App — connects to SQLite, stores and retrieves student records.

Module 13 | GUI Programming — Swing and NetBeans Designer
Theory: What is a GUI | Event-driven programming | Common Swing components (JFrame, JPanel, JLabel, JTextField, JButton, JComboBox, JTable) | Layout managers (FlowLayout, BorderLayout, GridLayout, GridBagLayout) | ActionListener with lambda | NetBeans GUI designer (drag-and-drop, generate code view) | setVisible(true) to display window
Code examples cover: simple frame setup, button click event, form with validation.
Practice questions on: setVisible(true) purpose | addActionListener for clicks | GridLayout(rows, cols) | JTextField.getText()
Mini Project: GUI Grade Calculator — form inputs for scores, button calculates and displays result in JLabel.

── PYTHON TRACK (COS 121) — 12 modules ───────────────────────────────────────

Module 01 | Python Foundations — Variables, Input, Output
Theory: What is Python | Dynamic typing | Variables and data types (int, float, str, bool) | print() with f-strings and formatting | type() function | Getting user input with input() (always returns str) | Arithmetic operators | Casting (int(), float(), str())
Code examples cover: profile card, BMI calculator, age from birth year.
Practice questions on: type() return for 3.14 | % modulus operator | input() returns str | valid f-string syntax
Mini Project: Personal Profile Card — reads name, level, department; prints formatted card.

Module 02 | Control Flow — if, elif, else
Theory: if/elif/else chains | Comparison operators (==, !=, <, >, <=, >=) | Logical operators (and, or, not) | Truthy and falsy values (0, "", [], None, {} are falsy) | Nested conditionals | Short-circuit evaluation
Code examples cover: grade calculator, even/odd checker, login simulator.
Practice questions on: and requires both True | falsy values list | not True = False | = assignment vs == comparison
Mini Project: University Grade Calculator — takes percentage, outputs letter grade and class.

Module 03 | Loops — for, while, range
Theory: for loop with range() | range(start, stop, step) — stop is exclusive | while loop | break exits loop | continue skips to next iteration | enumerate() yields (index, value) | Nested loops | List comprehension preview
Code examples cover: range patterns, while with break, enumerate usage.
Practice questions on: range(3, 8) produces 3 to 7 | break exits entire loop | enumerate yields tuples | nested loop iteration count
Mini Project: Multiplication Table Generator — prints table for given number.

Module 04 | Functions — def, Scope, Lambda
Theory: Defining and calling functions | Parameters vs arguments | Default parameter values | *args for variable positional args | **kwargs for variable keyword args | Return vs None | Global and local scope | Lambda (anonymous) functions | Higher-order functions (map, filter, sorted with key)
Code examples cover: greet with default, *args sum, lambda sort key.
Practice questions on: function with no return → None | *args collects positional args | lambda syntax | scope lookup order (LEGB)
Mini Project: Math Utility Module — functions for factorial, is_prime, GCD, fibonacci.

Module 05 | Lists and Tuples
Theory: List creation and indexing | Negative indexing | Slicing [start:stop:step] | Common list methods (append, insert, remove, pop, sort, reverse, index, count) | List comprehensions | 2D lists | Tuples — immutable ordered sequences | When to use tuple vs list
Code examples cover: score manager, 2D grid, list comprehension filter.
Practice questions on: negative index -1 is last | lists mutable, tuples immutable | append() adds to end | sort() mutates, sorted() returns new
Mini Project: Student Score Analyser — stores scores in list, finds stats.

Module 06 | Dictionaries and Sets
Theory: Dictionary creation (key: value pairs) | Accessing values with [] and .get(default) | Adding, updating, deleting keys | Dictionary methods (.keys(), .values(), .items()) | Iterating over dictionaries | Set creation | Set operations (union |, intersection &, difference -, symmetric difference ^) | Frozenset
Code examples cover: student grade dict, word frequency counter, set operations.
Practice questions on: .get() returns default instead of KeyError | & = intersection | set() creates empty set (not {}) | dict.items() returns tuples
Mini Project: Word Frequency Counter — reads paragraph, counts each word, finds top 5.

Module 07 | String Methods
Theory: Strings are immutable sequences | Case methods (upper, lower, title, swapcase) | Whitespace (strip, lstrip, rstrip) | Search (find returns index or -1, in operator, startswith, endswith) | split() and join() | replace() | f-strings and format() | String slicing
Code examples cover: username validator, title formatter, CSV parser with split.
Practice questions on: split() with no arg splits on whitespace | find() returns -1 not None | immutability — must reassign | join() takes iterable
Mini Project: Text Analyser — counts chars, words, sentences, palindrome check.

Module 08 | OOP Part 1 — Classes and Objects
Theory: Class definition with class keyword | __init__ constructor | self refers to instance | Instance attributes vs class attributes | Instance methods | __str__ for string representation | __repr__ | Dunder (magic) methods overview
Code examples cover: Book class, Student class with GPA calculation.
Practice questions on: __init__ runs on object creation | self is first parameter | class attrs shared, instance attrs unique | __str__ return value
Mini Project: Library Book System — Book class with borrow/return tracking.

Module 09 | OOP Part 2 — Inheritance and Polymorphism
Theory: Inheritance with class Child(Parent) | super().__init__() for parent constructor | Method overriding | Polymorphism — same method name, different behaviour | Multiple inheritance and MRO | @property decorator for computed attributes | @staticmethod and @classmethod | Abstract classes with abc module
Code examples cover: Employee → FullTime/PartTime, Shape → Circle/Rectangle.
Practice questions on: super().__init__() purpose | polymorphism — method called depends on actual object type | @property usage | abc.ABC for abstract classes
Mini Project: Employee Payroll System — FullTime (salary), PartTime (hours × rate) with overridden pay().

Module 10 | File Handling
Theory: open(file, mode) — modes: r, w, a, rb, wb | Reading (read(), readline(), readlines()) | Writing (write(), writelines()) | with statement auto-closes file | os.path (exists, join, dirname, basename) | CSV handling with csv module | JSON with json module
Code examples cover: reading a file line by line, writing with append, CSV reader.
Practice questions on: "w" mode overwrites; "a" appends | with block auto-closes on exit or exception | readlines() returns list of strings | json.dumps vs json.dump (string vs file)
Mini Project: Student Records File Manager — saves and loads student data from JSON file.

Module 11 | Exception Handling
Theory: What is an exception | try / except / else / finally structure | except Exception as e | Catching multiple exceptions | raise to throw manually | Custom exception classes (inherit from Exception) | Common exceptions (ValueError, TypeError, KeyError, IndexError, FileNotFoundError, ZeroDivisionError)
Code examples cover: file read with multiple exceptions, custom InsufficientFundsError.
Practice questions on: ValueError on int("hello") | else block runs only if no exception raised | finally always runs | raise re-throws after logging
Mini Project: Robust Calculator — validates all input, custom exceptions, logs errors.

Module 12 | Modules and Standard Library
Theory: What is a module | import module and from module import name | import module as alias | Creating your own module | Standard library highlights (math, random, datetime, os, sys, re, json, csv, itertools) | pip package manager | Virtual environments (venv)
Code examples cover: math and random usage, datetime operations, regex basics.
Practice questions on: import math as m allows m.sqrt() | pip install adds third-party packages | math.floor() rounds down | re.findall() returns list of matches
Mini Project: Mini Python Toolkit — command-line tool combining random password generator, text stats, and date calculations.

── C TRACK (Systems Programming) — 12 modules ───────────────────────────────

Module 01 | C Foundations — Hello World and Compilation
Theory: What is C | Compiled vs interpreted languages | The compilation pipeline (preprocessing → compilation → assembly → linking) | gcc command | Structure of a C program (#include, main(), return 0) | printf() and format specifiers (%d, %f, %c, %s, %ld, %lf) | Comments
Code examples cover: Hello World, multiple printf format specifiers.
Practice questions on: gcc compile command | #include <stdio.h> purpose | %d for int | return 0 signals success
Mini Project: Personal Profile Card — reads name and prints formatted output.

Module 02 | Variables and Data Types
Theory: Primitive types (int, float, double, char, long, short, unsigned) | sizeof() operator | Variable declaration, initialisation, assignment | Constants (const keyword and #define) | scanf() with & address-of | printf/scanf format specifiers | Undefined behaviour from uninitialised variables
Code examples cover: data type sizes, student details input.
Practice questions on: double for decimal precision | scanf needs & for non-pointer | uninitialised variable has garbage value | %lf for double in scanf
Mini Project: Student Details Collector — reads name, age, GPA; prints formatted summary.

Module 03 | Operators
Theory: Arithmetic (+, -, *, /, %) | Integer division truncates | Assignment operators (=, +=, -=, *=, /=, %=) | Relational (==, !=, <, >, <=, >=) | Logical (&&, ||, !) | Bitwise (&, |, ^, ~, <<, >>) | sizeof | Type casting | Ternary (?:)
Code examples cover: modulo patterns, bitwise flag operations, type cast.
Practice questions on: 15 % 4 = 3 | (double)7/2 = 3.5 (not 3) | ^ is XOR not power | 5 << 2 = 20 (multiply by 4)
Mini Project: Bitwise Permission Checker — uses bit flags to represent read/write/execute permissions.

Module 04 | Control Flow
Theory: if / else if / else | Common bug: = assignment vs == comparison in condition | switch statement with break | Fall-through behaviour (missing break) | Nested conditionals | Ternary operator | goto (exists but avoid)
Code examples cover: grade classifier, day switch, nested range checks.
Practice questions on: = in if condition is assignment (non-zero is true) | missing break causes fall-through | 0 is only false value in C | switch on int or char only
Mini Project: University Grade and GPA Calculator.

Module 05 | Loops
Theory: for loop (init; condition; update) | while loop | do-while (always runs once) | break exits innermost loop | continue skips to next iteration | Nested loops | Infinite loop patterns | Loop variable scope
Code examples cover: sum accumulator, input validation with while, nested pattern.
Practice questions on: for(i=0; i<5; i++) runs 5 times | do-while guarantee | break exits only innermost | loop variable undefined after loop
Mini Project: Number Pattern Printer — prints triangle patterns with nested loops.

Module 06 | Functions
Theory: Function definition syntax (return type, name, parameters) | Function prototypes (forward declaration) | Calling functions | Pass by value — changes inside function don't affect caller's variable | Return values | Recursion | Base case | Stack overflow from missing base case | Multiple return paths
Code examples cover: factorial recursive, binary search iterative, prototypes at top of file.
Practice questions on: prototype needed before use | pass by value copies variable | base case stops recursion | return type must match declaration
Mini Project: Math Utility Library — power, factorial, GCD, isPrime as separate functions with prototypes.

Module 07 | Arrays and Strings
Theory: Array declaration int arr[5] | Zero-based indexing | Array name is pointer to first element | No bounds checking (undefined behaviour on overflow) | 2D arrays | Strings are char arrays with null terminator '\0' | String literals | string.h functions (strlen, strcpy, strcat, strcmp, strncpy) | scanf("%s") stops at whitespace — use fgets for full lines
Code examples cover: score array with statistics, string reverse, strcmp comparison.
Practice questions on: first element at index 0 | null terminator '\0' at end | strlen excludes null byte | strcmp returns 0 for equal strings
Mini Project: Student Name and Score Database — parallel arrays for names and scores.

Module 08 | Pointers
Theory: Memory addresses | & address-of operator | * dereference operator | Pointer declaration int *ptr | Pointer assignment and dereferencing | Pointer arithmetic (ptr+1 advances by sizeof(type)) | Pointers and arrays (arr is &arr[0]) | NULL pointer | Dangling pointers | void pointer | Passing pointer to function (simulates pass by reference)
Code examples cover: swap via pointers, array traversal with pointer arithmetic.
Practice questions on: & returns address | * dereferences to value | ptr+2 advances by 2×sizeof(type) | NULL = address 0
Mini Project: Pointer-Based Array Statistics — pass array and size to functions via pointers, compute min/max/avg.

Module 09 | Structs and Enums
Theory: struct definition | Accessing members with . | typedef struct for cleaner syntax | Array of structs | Pointer to struct with -> operator | Nested structs | enum definition | Enum auto-increments from 0 | Using enums for readability
Code examples cover: Student struct, linked node, enum for days/status.
Practice questions on: . accesses struct members | -> for pointer-to-struct members | typedef removes need for struct keyword | enum values auto-assigned from 0
Mini Project: Student Records System — array of Student structs with add/search/display.

Module 10 | File Handling
Theory: FILE* pointer | fopen(filename, mode) — modes: "r", "w", "a", "rb", "wb" | fclose() | fprintf() and fscanf() | fgets() safer than fscanf for strings | fread() and fwrite() for binary | feof() and ferror() | Returning NULL on fopen failure — always check | rewind() and fseek()
Code examples cover: writing a text file, reading line by line, binary struct write.
Practice questions on: fopen returns NULL on failure | "w" creates or truncates | fgets reads up to n-1 chars | binary mode needed for non-text data
Mini Project: Student Records File System — saves struct array to binary file, reloads on next run.

Module 11 | Dynamic Memory Allocation
Theory: Stack vs heap memory | malloc(bytes) — allocates uninitialized | calloc(n, size) — allocates zeroed memory | realloc(ptr, newsize) — resize | free(ptr) — release memory | Memory leaks | Double free undefined behaviour | Valgrind for leak detection | Always assign realloc to temp pointer first
Code examples cover: dynamic int array, resizable student list.
Practice questions on: calloc zeroes memory; malloc does not | realloc to temp to avoid lost pointer on failure | double-free is undefined behaviour | free does not set pointer to NULL automatically
Mini Project: Dynamic Student Roster — grows automatically with realloc as students are added.

Module 12 | The C Preprocessor and Multi-file Projects
Theory: #define for constants and function-like macros | Macro pitfalls (always parenthesise arguments) | #include <system.h> vs "local.h" | Include guards (#ifndef, #define, #endif) | #ifdef, #else, #endif for conditional compilation | Predefined macros (__FILE__, __LINE__, __DATE__, __func__) | Separate compilation (multiple .c files) | Header files (.h) with declarations | Linking object files with gcc
Code examples cover: multi-file project layout, include guards, SQUARE(x) macro.
Practice questions on: macros need parentheses to avoid operator precedence bugs | <> for system headers | #ifndef prevents double-include | __LINE__ expands to current line number
Mini Project: Multi-File C Project — main.c, utils.c, utils.h with include guards and shared constants.
`;

// ─────────────────────────────────────────────────────────────────────────────
//  Derived indexes and lookups for the agentic tutor.
//  The indexes go into the system prompt (compact); the lookup functions back
//  the getCourseOutline / getModuleDetail tools, which fetch full detail from
//  the knowledge strings above on demand.
// ─────────────────────────────────────────────────────────────────────────────

// One line per course ("CODE | Title | n units") under level/semester headers.
export const COURSE_INDEX = COURSE_KNOWLEDGE
  .split('\n')
  .filter(line =>
    line.startsWith('===') ||
    line.startsWith('──') ||
    /\|.*\|\s*\d+\s*units?\b/i.test(line)
  )
  .join('\n');

// One line per module ("Module NN | Title") under track headers.
export const MODULE_INDEX = MODULE_KNOWLEDGE
  .split('\n')
  .filter(line =>
    line.startsWith('===') ||
    line.startsWith('──') ||
    /^Module \d/.test(line)
  )
  .join('\n');

const normalizeCode = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]/g, '');

// Full catalogue entry for one course code, plus uploaded lecture notes when
// they exist for it. Returns null when nothing matches.
export function findCourse(courseCode) {
  const target = normalizeCode(courseCode);
  if (!target) return null;

  const blocks = COURSE_KNOWLEDGE.split(/\n\n+/).filter(b => b.includes('|'));
  const matches = blocks.filter(block => {
    const code = normalizeCode(block.trim().split('\n')[0].split('|')[0]);
    return code === target || code.endsWith(target);
  });

  const noteSections = LECTURE_NOTES_KNOWLEDGE
    .split(/\n(?=── )/)
    .filter(s => s.startsWith('── ') && normalizeCode(s.split('\n')[0]).includes(target));

  if (!matches.length && !noteSections.length) return null;

  return [
    ...matches.map(b => b.trim()),
    ...noteSections.map(s => `LECTURE NOTES (authoritative, from the lecturer):\n${s.trim()}`),
  ].join('\n\n');
}

const TRACK_SECTION_HEADERS = {
  java: '── JAVA TRACK',
  python: '── PYTHON TRACK',
  c: '── C TRACK',
};

// Full content block for one module in a track. Returns null when not found.
export function findModule(track, moduleNumber) {
  const header = TRACK_SECTION_HEADERS[String(track).toLowerCase()];
  if (!header) return null;

  const start = MODULE_KNOWLEDGE.indexOf(header);
  if (start === -1) return null;

  const rest = MODULE_KNOWLEDGE.slice(start + header.length);
  const nextHeader = rest.search(/\n── /);
  const section = nextHeader === -1 ? rest : rest.slice(0, nextHeader);

  const wanted = `Module ${String(moduleNumber).padStart(2, '0')} `;
  const block = section
    .split(/\n\n(?=Module \d)/)
    .find(b => b.trim().startsWith(wanted));

  return block ? block.trim() : null;
}
