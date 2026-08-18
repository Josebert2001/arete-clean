// CYB 224 — Written (non-CBT) exam preparation bank.
//
// The course already ships a 187-question MCQ bank in courses.js for CBT
// practice. This is the other half: the forms a written script actually uses —
// "define", "differentiate between", "with the aid of a diagram", "state the
// steps", "explain any four" — each with a full model answer and a per-point
// mark scheme the student ticks off against what they wrote. Self-marking is
// the skill an MCQ never teaches, and it needs no network and no AI call.
//
// Questions are drawn from the CYB 224 lectureNotes in src/data/courses.js.
// Topics 4-22 are a verbatim transcription of the lecturer's printed workbook
// (printed pages 3-71); topics 1-3 come from the class sessions instead and say
// so on the page. `source` names the topic and the section heading to re-read.
// The workbook's headings carry no numbers, so neither do these.
//
// Where the workbook prints something a student should not reproduce, the model
// answer gives the correct form and the mark scheme says which is which. The
// places this bites in CYB 224 are all in Model Evaluation: the workbook cuts
// off the Accuracy, Precision and F1 equations mid-expression, leaves Accuracy
// without an equation number, and mis-numbers F1 as "i.". The equations below
// are the complete ones, because those are what earns the mark.
//
// `figure` paths point at the diagrams under public/lecture-notes/cyb-224/,
// shown on reveal so a student can compare their sketch against the real thing.
// Four of them reproduce diagrams the workbook prints (the classification tree
// on p.20 and the three SVM diagrams on pp.22-23); the rest visualise tables
// the workbook prints as text.
//
// Mark values in each markScheme entry sum to the question's `marks`.

export const cyb224ExamPrep = [
  // ══════════════════════════════════════════════════════════════════
  //  TOPICS 1-3 — BIG DATA FOUNDATIONS (class sessions)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 5,
    source: 'Topic 1 · Characteristics of Big Data — The 5Vs',
    question: 'Name the FIVE characteristics of big data, known as the 5Vs.',
    items: [
      { name: 'Volume', aliases: [], explain: 'The large amount of data generated and stored.' },
      { name: 'Velocity', aliases: [], explain: 'The speed at which data is generated and processed.' },
      { name: 'Variety', aliases: [], explain: 'The different types and formats of data.' },
      { name: 'Veracity', aliases: [], explain: 'The quality, accuracy and reliability of the data.' },
      { name: 'Value', aliases: [], explain: 'Turning processed data into meaningful insight.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 1 · Definition; Where Does Big Data Come From?',
    question: 'Define Big Data Security. State and explain the THREE sources from which big data comes.',
    modelAnswer: 'Big Data Security refers to the tools, policies and measures used to protect large volumes of data from unauthorized access, breaches and misuse throughout its lifecycle — from collection to processing and storage. Big data comes from three sources. M2M, or machine to machine, is data exchanged between connected devices, such as sensors and IoT equipment reporting to one another without human involvement. People to machine is data generated through human interactions with technology, such as online transactions, social media activity and portal logins. Organisational data is data produced by businesses and institutions in the course of their operations, such as transaction records, customer databases and business reports.',
    markScheme: [
      'Big Data Security defined — tools, policies and measures protecting large volumes of data across its lifecycle (2)',
      'M2M named and explained as data exchanged between connected devices (2)',
      'People to Machine named and explained as data from human interaction with technology (2)',
      'Organisational data named and explained as data produced by businesses and institutions (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 2 · Operational Big Data; Analytical Big Data; Comparison',
    question: 'Differentiate between operational and analytical big data. In your answer, give TWO examples and TWO technologies for each.',
    modelAnswer: 'Operational big data refers to real or nearly real-time data used to support daily business operations and decision making. It processes data immediately as it is generated, supports transactional systems and requires fast processing. Analytical big data refers to historical and accumulated data used for analysis, forecasting, reporting and strategic decision making. It focuses on past and current data, supports business intelligence and is often stored in data warehouses. Examples of operational big data include online banking transactions, e-commerce order processing, hospital patient monitoring, airline reservation systems and traffic management systems; the technologies used include Apache Kafka, Apache Storm and Apache Flink. Examples of analytical big data include sales trends analysis, customer behaviour analysis, market forecasting, fraud detection and academic research; the technologies used include Apache Spark, business intelligence tools and machine learning platforms. The two therefore differ in nature, real-time against historical; in purpose, daily operations against forecasting and strategy; in data freshness, continuously updated against stored in warehouses; and in focus, transactional systems against business intelligence and trends.',
    markScheme: [
      'Operational big data defined — real or near real-time, supports daily operations (2)',
      'Analytical big data defined — historical and accumulated, supports analysis and strategy (2)',
      'Two operational examples given (1)',
      'Two operational technologies named from Kafka, Storm, Flink (1)',
      'Two analytical examples given (1)',
      'Two analytical technologies named from Spark, BI tools, ML platforms (1)',
      'Any two further points of difference stated — nature, purpose, data freshness or focus (2)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Topic 3 · Categories of Big Data Skills',
    question: 'Name the FIVE categories of big data skills.',
    items: [
      { name: 'Technical Skills', aliases: ['technical'], explain: 'Programming, database management and big data frameworks.' },
      { name: 'Analytical Skills', aliases: ['analytical'], explain: 'Data analysis, pattern recognition and statistical analysis.' },
      { name: 'Business Skills', aliases: ['business'], explain: 'Translating insights into actionable business strategies.' },
      { name: 'Communication Skills', aliases: ['communication'], explain: 'Presenting findings clearly to non-technical audiences.' },
      { name: 'Problem Solving Skills', aliases: ['problem solving', 'problem-solving'], explain: 'Using data-driven approaches to solve complex problems.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 3 · Categories of Big Data Skills; Technical Skills; Problem Solving',
    question: 'Explain any FOUR categories of big data skills.',
    modelAnswer: 'Technical skills cover programming, database management and big data frameworks: the ability to write code to manipulate and process data, database skills such as MySQL and Oracle for querying and managing structured data, and frameworks such as Hadoop, Spark and Kafka for large-scale processing. Analytical skills cover data analysis, pattern recognition and statistical analysis — examining data to discover useful information, patterns and insights, using tools such as Python, Excel and Apache Spark. Business skills involve transforming analysed data into actionable insights that support business goals and strategic decisions; the data professional must understand the business context to make the analysis relevant. Communication skills cover report writing, presentation, team collaboration and storytelling with data — presenting findings visually and narratively so that a non-technical audience can act on them. Problem-solving skills involve using data-driven approaches to solve complex problems, following the steps: identify the problem, collect relevant data, analyse the data, generate insights, and recommend solutions.',
    markScheme: [
      'First category named and explained (2)',
      'Second category named and explained (2)',
      'Third category named and explained (2)',
      'Fourth category named and explained (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 4 — CONCEPTS OF BIG DATA SECURITY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 4 · Concepts of Big Data Security; The 3Vs of Big Data Security Challenges',
    question: 'Define Big Data security and explain why it differs from traditional security. State and explain the 3Vs of big data security challenges.',
    modelAnswer: 'Big Data security is the collective term for the guardrails, policies and technologies used to protect massive volumes of data, both structured and unstructured, from unauthorized access, theft, exposure and modification. Traditional security focuses on securing perimeter walls, such as firewalls, around static databases; Big Data security is unique because the data is constantly moving, changing and being analysed at an immense scale. Traditional security measures often fail when applied to Big Data because of its fundamental characteristics. Volume: protecting petabytes or exabytes of data requires security tools that can scale dynamically without creating processing bottlenecks. Velocity: data streams into systems in real time, from IoT sensors and network logs, so security mechanisms such as encryption and threat detection must happen on the fly without causing latency. Variety: Big Data includes structured SQL databases, semi-structured JSON files and unstructured data such as video, audio and text, so a one-size-fits-all security policy does not work.',
    markScheme: [
      'Big Data security defined — guardrails, policies and technologies protecting structured and unstructured data from unauthorized access, theft, exposure and modification (3)',
      'Contrast with traditional security — perimeter around static databases against data constantly moving, changing and analysed at scale (1)',
      'Volume challenge explained — scaling without processing bottlenecks (2)',
      'Velocity challenge explained — real-time streams, protection on the fly without latency (2)',
      'Variety challenge explained — structured, semi-structured and unstructured together defeat one policy (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 4 · Core Pillars of Big Data Security',
    question: 'State and explain the FOUR core pillars of Big Data security.',
    modelAnswer: 'To secure a Big Data ecosystem such as Hadoop, Spark or a cloud-based data lake, organizations implement a multi-layered security framework resting on four pillars. Data encryption and privacy: because data is constantly in motion across distributed networks it must be protected at all stages — encryption in transit protects data as it moves between nodes, clusters or users, typically using TLS/SSL; encryption at rest safeguards data stored on disks using strong standards such as AES-256; and data masking and tokenization replace sensitive data such as credit card numbers or PII with realistic but fake data or tokens before it enters the analytics pipeline, so data scientists can work with it safely. Centralized access control: when dealing with thousands of users and automated processes, managing who can see what is critical — role-based access control assigns permissions based on organizational roles, while attribute-based access control is a finer-grained approach where access is determined by contextual attributes. Endpoint and infrastructure security: Big Data relies on distributed computing, so data is split across hundreds or thousands of server nodes — node authentication ensures only authorized servers or nodes can join the computing cluster, often managed via Kerberos, and API security protects the endpoints and APIs that applications use to connect to and query the data lake. Real-time monitoring and auditing: with massive infrastructure, detecting a breach manually is impossible, so continuous audit logs record who accessed what data and when, and AI and machine-learning-driven User and Entity Behavior Analytics spot anomalous access patterns that might indicate an insider threat or compromised credentials.',
    markScheme: [
      'Multi-layered framework over a Big Data ecosystem named (1)',
      'Data encryption and privacy — in transit, at rest, and masking or tokenization (3)',
      'Centralized access control — RBAC and ABAC (3)',
      'Endpoint and infrastructure security — node authentication and API security (2.5)',
      'Real-time monitoring and auditing — audit logs and UEBA (2.5)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 4 · Common Tools in the Big Data Security Ecosystem',
    figure: '/lecture-notes/cyb-224/security-ecosystem.webp',
    question: 'Name the FOUR tools in the Big Data security ecosystem and state the primary function of each.',
    items: [
      { name: 'Apache Ranger / Apache Sentry', aliases: ['ranger', 'sentry', 'apache ranger', 'apache sentry'], explain: 'Centralized security administration and fine-grained access control for Hadoop/Spark ecosystems.' },
      { name: 'Kerberos', aliases: [], explain: 'Network authentication protocol used to verify the identity of users and nodes in a cluster.' },
      { name: 'Knox Gateway', aliases: ['knox'], explain: 'Provides a single, secure point of access — perimeter security — for Big Data cluster REST APIs.' },
      { name: 'SIEM Systems (Splunk, Elastic)', aliases: ['siem', 'splunk', 'elastic'], explain: 'Security Information and Event Management systems used to aggregate and analyze security logs at scale.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 4 · Centralized Access Control',
    question: 'Differentiate between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC). Give ONE example of an ABAC rule.',
    modelAnswer: 'Role-Based Access Control assigns permissions based on organizational roles: a user is placed in a role, such as Data Analyst or Database Administrator, and inherits whatever that role is permitted to do. Attribute-Based Access Control is a finer-grained approach in which access is determined by contextual attributes rather than by role alone. The difference is that RBAC answers only the question who are you, while ABAC also answers under what circumstances — the same user may be granted or refused access depending on time, location, device or network. An example of an ABAC rule is: allow access only if the user is a Data Analyst AND the request comes from an internal IP during working hours.',
    markScheme: [
      'RBAC defined — permissions assigned by organizational role (2)',
      'ABAC defined — access determined by contextual attributes, finer-grained (2)',
      'ABAC example given, combining more than one attribute (1)',
      'Difference stated — role alone against role plus context (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 5 — ARTIFICIAL INTELLIGENCE AND BIG DATA SECURITY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · Artificial Intelligence and Big Data; Application of ML in Data Security',
    question: 'Define Artificial Intelligence and Machine Learning. Explain the application of ML in data security, and state the TWO converging trends that define the digital landscape.',
    modelAnswer: 'Artificial Intelligence is the branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception and language understanding. AI spans a wide range of technologies and methodologies, from rule-based systems to more advanced forms such as machine learning and deep learning. Machine Learning, a subset of AI, is the study of algorithms and statistical models that enable computers to perform specific tasks without using explicit instructions; instead ML systems rely on patterns and inference derived from data and information, and the primary goal is to build models that generalize from training data to unseen data, making predictions or decisions based on new inputs. The application of AI and ML in network security involves using these technologies to analyze large amounts of network data, identify patterns and detect anomalies that may indicate security threats. This allows real-time detection and mitigation of cyber threats, which is crucial given the increasing complexity and volume of attacks. The digital landscape is defined by two converging trends: the ubiquity of machine learning, and the increasing vulnerability of interconnected systems, for example microprocessor flaws such as Spectre and Meltdown.',
    markScheme: [
      'AI defined — systems performing tasks requiring human intelligence, with the tasks named (3)',
      'ML defined as a subset of AI — patterns and inference rather than explicit instructions, generalising to unseen data (3)',
      'Application in network security — analyse network data, identify patterns, detect anomalies, real-time detection and mitigation (2)',
      'Both converging trends named — ubiquity of ML, and vulnerability of interconnected systems (2)',
    ],
  },

  {
    type: 'recall',
    marks: 10,
    source: 'Topic 5 · Table 2: Cybersecurity Threat Categories',
    figure: '/lecture-notes/cyb-224/threat-taxonomy.webp',
    question: 'Name any TEN of the cybersecurity threat categories given in Table 2.',
    items: [
      { name: 'Malware', aliases: [], explain: 'Malicious software designed to damage systems, steal data or gain unauthorized access.' },
      { name: 'Worm', aliases: [], explain: 'Self-replicating malware that spreads automatically across networks without user action.' },
      { name: 'Trojan', aliases: [], explain: 'Malware disguised as legitimate software to trick users into installing it.' },
      { name: 'Spyware', aliases: [], explain: 'Software that secretly monitors and collects user information without consent.' },
      { name: 'Ransomware', aliases: [], explain: 'Malware that encrypts files and demands payment to restore access.' },
      { name: 'Rootkit', aliases: [], explain: 'A hidden tool that gives attackers privileged access while remaining undetected.' },
      { name: 'Botnet', aliases: ['bot'], explain: 'A group of infected devices controlled together by an attacker.' },
      { name: 'Phishing', aliases: ['spear phishing'], explain: 'Fraudulent communication pretending to be from a trusted source.' },
      { name: 'Denial of Service (DoS/DDoS)', aliases: ['dos', 'ddos', 'denial of service'], explain: 'Flooding a system with traffic to make it unavailable.' },
      { name: 'Zero-Day Vulnerability', aliases: ['zero day', 'zero-day'], explain: 'A newly discovered software flaw exploited before a fix is released.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · How to Protect the System from Adversarial Attacks',
    question: 'There is no fail-safe way to protect an AI or ML system. State and explain the THREE important examples of protection, and illustrate the risk with an example of an attack against an ML tool.',
    modelAnswer: 'In the same way that no modern computer system can be absolutely assured, there is no fail-safe way to protect an AI or ML system, and research into defending ML tools is ongoing. The realistic response is a systems-security approach that reduces the risk and the impact of attacks to acceptable levels. Three important examples of such protection are: robustness in the integrity of the tool as well as the protection of confidentiality; resilience against attacks during training and classification; and evidence that the input data is reliable and representative. ML tools contain well-known vulnerabilities, many of which are susceptible to adversary manipulation. As a poignant example, consider self-driving cars, which use ML tools to identify street signs. By intentionally manipulating a small section of a stop sign with a purpose-designed sticker, an adversary can make these operational ML tools reliably misclassify a stop sign as a 45-mile-per-hour speed limit sign. Adversaries constantly expose cybersecurity tools to input that is likely less obvious to an analyst than a sticker on a traffic-control sign, so any cybersecurity system implemented using ML tools should take these threats seriously.',
    markScheme: [
      'No fail-safe protection acknowledged; systems-security approach to reduce risk and impact to acceptable levels (2)',
      'Robustness — integrity of the tool and protection of confidentiality (2)',
      'Resilience — against attacks during training and classification (2)',
      'Reliable and representative input data (2)',
      'Stop-sign example given, with the misclassification named (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · Table 2: Cybersecurity Threat Categories',
    question: 'Differentiate between the following, giving ONE example of each: worm, trojan, spyware, adware and ransomware.',
    modelAnswer: 'A worm is self-replicating malware that spreads automatically across networks without user action; an example is a worm spreading through a university network by exploiting a vulnerability. A trojan is malware disguised as legitimate software to trick users into installing it; an example is a fake Free Antivirus app that installs hidden spyware. Spyware is software that secretly monitors and collects user information without consent; an example is a program that tracks browsing history and sends it to attackers. Adware is software that automatically displays unwanted advertisements on a device; an example is constant pop-up ads appearing during internet browsing. Ransomware is malware that encrypts files and demands payment to restore access; an example is a hospital whose records are encrypted until a ransom is paid. The distinctions that matter are how each spreads and what each is for: a worm needs no user action while a trojan depends entirely on deceiving the user; spyware and adware both run quietly but one steals information while the other sells attention; and ransomware, unlike the rest, announces itself because extortion requires the victim to know.',
    markScheme: [
      'Worm distinguished — self-replicating, spreads without user action — with an example (2)',
      'Trojan distinguished — disguised as legitimate software — with an example (2)',
      'Spyware distinguished — secretly monitors and collects information — with an example (2)',
      'Adware distinguished — displays unwanted advertisements — with an example (2)',
      'Ransomware distinguished — encrypts files and demands payment — with an example (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 6 — THE CYBER ATTACKER'S ECONOMY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: "Topic 6 · The Cyber Attacker's Economy; From Reputation to Revenue; Marketplace for Hacking Skills; Zero-Day Vulnerability Markets",
    question: "Explain the cyber attacker's economy. In your answer, account for the shift from reputation to revenue, the marketplace for hacking skills, and zero-day vulnerability markets.",
    modelAnswer: 'Cybersecurity is not only a technical battle but also an economic one. Modern cybercrime operates within a structured financial ecosystem where monetary gain is the primary motivation, and understanding attacker incentives helps security professionals design stronger detection and prevention systems. Early cyber-attacks were often motivated by curiosity, mischief or reputation within hacker communities; today most cyber-attacks are financially motivated. Modern attackers target online payment platforms, financial institutions, gift card systems, cryptocurrency wallets, e-commerce platforms and identity databases. The commoditization of hacking has lowered the barrier to entry: darknet marketplaces sell exploits, malware kits, stolen credentials and even subscription-based hacking services, so an attacker no longer needs the skill to build the tool they use. Zero-day vulnerabilities are unknown software weaknesses that can be sold legally through bug bounty programs or illegally in underground markets, and selling exploits often provides faster and lower-risk financial returns than directly launching attacks — the researcher is paid without ever committing the crime.',
    markScheme: [
      'Security framed as an economic problem within a structured financial ecosystem (2)',
      'Shift from reputation-based to financial motivation stated (2)',
      'Any four targets of modern attackers named (2)',
      'Marketplace for hacking skills — commoditization, darknet sale of exploits, kits, credentials and services (2)',
      'Zero-day markets — legal bug bounty against illegal underground sale, and why selling beats attacking (2)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Topic 6 · From Reputation to Revenue',
    question: 'Name the SIX things modern attackers target.',
    items: [
      { name: 'Online payment platforms', aliases: ['payment platforms'], explain: 'Money in transit, convertible immediately.' },
      { name: 'Financial institutions', aliases: ['banks'], explain: 'The highest reward, and the heaviest defences.' },
      { name: 'Gift card systems', aliases: ['gift cards'], explain: 'Value that launders itself and is hard to trace.' },
      { name: 'Cryptocurrency wallets', aliases: ['crypto wallets', 'cryptocurrency'], explain: 'Irreversible transfers with no institution to appeal to.' },
      { name: 'E-commerce platforms', aliases: ['ecommerce', 'e-commerce'], explain: 'Stored card details in bulk.' },
      { name: 'Identity databases', aliases: ['identity data'], explain: 'Personal data that can be resold repeatedly.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 6 · Activity 2: Attack Supply Chain Mapping',
    question: 'The attacker economy operates as a supply chain. State and explain the THREE roles the handout identifies in that ecosystem.',
    modelAnswer: 'The vulnerability researcher finds and documents unpatched security flaws. This role need not break any law: the same discovery can be sold to a bug bounty programme or into an underground market, and the researcher is paid either way. The exploit developer writes code that weaponizes a discovered flaw into a usable attack, turning knowledge of a weakness into a tool that someone with no such knowledge can run. The malware distributor spreads the malware to victims, by phishing, infected downloads or botnets. The division matters for defenders because it explains why attack volume keeps rising while attacker skill does not have to: specialisation means each role can be performed by someone who could not perform the others, and the tool reaches people who could never have built it.',
    markScheme: [
      'Vulnerability researcher — finds and documents unpatched flaws (2)',
      'Exploit developer — weaponizes a flaw into a usable attack (2)',
      'Malware distributor — spreads malware via phishing, infected downloads or botnets (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 7 — MACHINE LEARNING FOR DATA SECURITY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 7 · Machine Learning; Types of Machine Learning; Supervised Learning; Unsupervised Learning',
    question: 'Define machine learning and state FIVE things it enables a computer system to do. Differentiate between supervised and unsupervised learning, and name the TWO supervised tasks.',
    modelAnswer: 'Machine learning refers to a set of mathematical and statistical techniques that enable computer systems to learn patterns from historical data, generalize beyond observed examples, predict future outcomes, identify similarities and differences, and detect anomalies. At its core, machine learning transforms raw data into meaningful insights through pattern discovery and inference. Machine learning methods are categorized into two families. In supervised learning the dataset includes labeled examples, the algorithm learns from known input and output pairs, and the goal is to predict labels for new data; its security applications include spam detection, malware classification, phishing detection and malicious URL detection. In unsupervised learning the data is unlabeled, the algorithm identifies hidden structures or patterns, and it groups data or detects deviations from normal behavior. The two supervised tasks are classification, for example spam against legitimate, and regression, predicting numerical values such as risk scores.',
    markScheme: [
      'Machine learning defined — mathematical and statistical techniques transforming raw data into insight through pattern discovery and inference (2)',
      'All five capabilities listed (2.5)',
      'Supervised learning explained — labeled examples, input and output pairs, predict labels for new data (2)',
      'Unsupervised learning explained — unlabeled data, hidden structures, groups or detects deviations (2)',
      'Both supervised tasks named — classification and regression (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 7 · Uses of Machine Learning in Data Security',
    question: 'Machine learning applications in security fall into two categories. Differentiate between pattern recognition and anomaly detection, giving TWO examples of each, and explain why anomaly detection is prone to false positives.',
    modelAnswer: 'Pattern recognition focuses on identifying known characteristics within data. Examples include spam detection, malware detection, botnet detection and phishing classification. In these cases malicious activity exhibits recognizable features that can be learned. Anomaly detection defines normal behavior and flags deviations. Examples include network outlier detection, insider threat detection, access control anomaly detection and behavioral monitoring. The essential difference is that, unlike pattern recognition, anomaly detection does not require explicit malicious examples: instead it models normal activity and flags deviations, which is what allows it to catch an attack no one has seen before. That same property is its weakness. There may be infinitely many anomalous patterns, including those never observed during training, so anything unusual is flagged whether or not it is hostile — a new software update, a user working from a new location or an end-of-semester surge in portal traffic all deviate from the baseline. This makes anomaly detection powerful but also prone to false positives if it is not carefully designed.',
    markScheme: [
      'Pattern recognition defined — identifying known characteristics within data (2)',
      'Two pattern recognition examples given (1)',
      'Anomaly detection defined — defines normal behavior and flags deviations (2)',
      'Two anomaly detection examples given (1)',
      'Key difference stated — anomaly detection needs no explicit malicious examples (2)',
      'False positives explained — infinitely many anomalous patterns, including unseen ones, so unusual but legitimate events are flagged (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 7 · Access Control and Behavioral Intelligence in Big Data',
    question: 'Explain how machine learning enhances access control in big data. Illustrate your answer with the hospital example.',
    modelAnswer: 'Traditional rule-based access control systems are rigid and inflexible: a rule either permits an action or forbids it, with no account taken of whether this particular user doing this particular thing at this particular time is normal. Machine learning enhances access control by learning typical user access patterns, identifying abnormal behavior, and providing adaptive responses. Consider a hospital. Nurses access individual patient records, one at a time, for the patients in their care. Doctors query multiple patient records for diagnosis, so a doctor reading many records is ordinary while a nurse doing the same is not. A machine learning system can detect abnormal access patterns without blocking legitimate rare events — a nurse covering an unfamiliar ward will look unusual, and the system can flag it for review rather than refuse it, which a static rule could not do without either blocking real work or permitting real abuse.',
    markScheme: [
      'Rule-based access control criticised as rigid and inflexible (2)',
      'Three ways ML enhances access control — learns typical patterns, identifies abnormal behaviour, provides adaptive responses (3)',
      'Hospital example — nurses access individual records, doctors query multiple records (2)',
      'Detects abnormal patterns without blocking legitimate rare events (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 8 — SUPERVISED LEARNING FOR DATA SECURITY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 · Supervised Learning for Data Security',
    question: 'Define supervised learning as applied to data security. State the TWO common loss functions with their equations.',
    modelAnswer: 'Supervised learning trains a model using a labeled dataset, where every input example xᵢ is paired with its correct output label yᵢ. The goal is to learn a mapping function f: x → y that generalizes well to unseen data. In network security this approach is widely applied to classification tasks, such as distinguishing benign from malicious network traffic in intrusion detection, spam against non-spam emails, or normal and anomalous behavior. The model minimizes a loss function that measures the difference between predicted outputs and true labels. The two common loss functions are binary cross-entropy, for binary classification, L(y, ŷ) = −[y log(ŷ) + (1 − y) log(1 − ŷ)]; and categorical cross-entropy, for multi-class problems, L(y, ŷ) = − Σ(c=1 to C) y_c log(ŷ_c). Training typically uses optimization algorithms such as gradient descent or its variants, for example Adam or SGD with momentum.',
    markScheme: [
      'Supervised learning defined — labeled dataset, xᵢ paired with yᵢ, mapping f: x → y generalising to unseen data (3)',
      'Role of the loss function stated — measures difference between predicted outputs and true labels (1)',
      'Binary cross-entropy equation given correctly (2)',
      'Categorical cross-entropy equation given correctly (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 8 · Decision Trees (DT)',
    question: 'Explain decision trees and why they suit initial IDS prototyping. State the CART key algorithm, give the Gini impurity and information gain equations, and state the training procedure.',
    modelAnswer: 'Decision trees build a tree-like model where internal nodes represent feature tests, branches represent outcomes, and leaf nodes represent class labels or probability distributions. They are interpretable, handle mixed data types well, and require little preprocessing, making them popular for initial IDS prototyping — an analyst can read the rule that fired and defend it. The key algorithm is CART, Classification and Regression Trees, whose idea is to recursively split the data to maximize purity in child nodes. The common splitting criterion for classification is Gini impurity, Gini(t) = 1 − Σᵢ₌₁..ₖ pᵢ², where pᵢ is the proportion of class i at node t. Alternatively information gain using entropy may be used: Entropy(S) = − Σᵢ₌₁..ₖ pᵢ log₂(pᵢ) and Gain(S, A) = Entropy(S) − Σ over v ∈ Values(A) of (|Sᵥ| / |S|) · Entropy(Sᵥ). The training procedure is greedy recursive partitioning: start at the root with the full dataset; for each feature and possible split point, compute impurity reduction; choose the split that maximizes gain, or minimizes weighted child impurity; repeat until stopping criteria are met, such as max depth, minimum samples per leaf or minimum impurity decrease; and assign the majority class, or a probability, to each leaf.',
    markScheme: [
      'Tree structure explained — internal nodes test features, branches are outcomes, leaves are class labels (2)',
      'Why suited to IDS prototyping — interpretable, handles mixed data types, little preprocessing (2)',
      'CART key algorithm stated — recursively split to maximize purity in child nodes (1)',
      'Gini impurity equation with pᵢ defined (2)',
      'Entropy and information gain equations (2)',
      'All five steps of greedy recursive partitioning stated (3)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 · Hypothetical Classification Tree',
    figure: '/lecture-notes/cyb-224/decision-tree.webp',
    question: 'With the aid of a diagram, explain the hypothetical classification tree, stating the feature tested at each level and the leaf labels. State what the features and leaves would be in a network security setting.',
    modelAnswer: 'The tree begins at a root node, which performs the initial split. The first test is on income, dividing the data into income ≤ $75,000 and income > $75,000. On each side the next test is on family size, dividing into ≤ 4 family members and > 4 family members. Below that the test is on education, dividing into ≤ 12 years of education and > 12 years of education. The leaf nodes are labelled Purchaser and Non-Purchaser, so every path from root to leaf is a rule of the form: if income is above this threshold, and the family is this size, and education is this long, then the person is a purchaser. In network security the features might include packet size, inter-arrival time, source and destination ports and TCP flags, with the leaves predicting normal or a specific attack type. The value of the structure is that the rule is readable: an analyst can state exactly which conditions caused an alert.',
    markScheme: [
      'Root node and initial split identified (1)',
      'Income split at $75,000 given as the first test (2)',
      'Family-size split at 4 members given as the second test (2)',
      'Education split at 12 years given as the third test (2)',
      'Leaves labelled Purchaser and Non-Purchaser, with the network-security equivalent features or leaves named (1)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 8 · Support Vector Machines (SVM)',
    question: 'Explain the core idea of a Support Vector Machine. Give the hard-margin condition, the soft-margin formulation, the prediction function and the kernel trick, with equations.',
    modelAnswer: 'SVMs aim to find the optimal hyperplane that separates classes with the maximum margin. They are effective for high-dimensional data and remain popular in intrusion detection due to good generalization with relatively small labeled datasets. In the hard-margin case, for linearly separable data, the task is to find w and b such that yᵢ(wᵀxᵢ + b) ≥ 1 ∀i, and to maximize margin 2/‖w‖, which is equivalent to minimizing ½‖w‖². In the realistic soft-margin case, slack variables ξᵢ permit some violation: minimize ½‖w‖² + C Σ(i=1 to n) ξᵢ subject to yᵢ(wᵀxᵢ + b) ≥ 1 − ξᵢ, ξᵢ ≥ 0, where C controls the trade-off between margin maximization and classification error — a large C punishes misclassification and narrows the margin, a small C tolerates error for a wider one. The prediction function is f(x) = sign(wᵀx + b). For non-linear separation the kernel trick replaces xᵢᵀxⱼ with a kernel K(xᵢ, xⱼ), for example the RBF kernel K(xᵢ, xⱼ) = exp(−γ‖xᵢ − xⱼ‖²), which lets the model separate classes no straight line could divide without ever computing the higher-dimensional coordinates.',
    markScheme: [
      'SVM aim stated — optimal hyperplane separating classes with maximum margin (2)',
      'Why popular in intrusion detection — high-dimensional data, generalises from small labeled datasets (2)',
      'Hard-margin condition yᵢ(wᵀxᵢ + b) ≥ 1 ∀i given (2)',
      'Margin maximisation 2/‖w‖ shown equivalent to minimising ½‖w‖² (2)',
      'Soft-margin objective with slack variables, and the role of C explained (2)',
      'Kernel trick with the RBF kernel given (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 · Support Vector Machines (SVM) — representative diagrams',
    figure: '/lecture-notes/cyb-224/svm-margin.webp',
    question: 'With the aid of a diagram, identify and explain the maximum margin hyperplane, the positive hyperplane, the negative hyperplane, the support vectors and the maximum margin.',
    modelAnswer: 'On axes X1 and X2, with the two classes plotted as separate symbols, the maximum margin hyperplane is the solid line that separates them — it is the decision boundary the model will use, positioned so that the distance to the nearest point of either class is as large as possible. The positive hyperplane is the parallel boundary drawn on the side of the first class, and the negative hyperplane is the parallel boundary drawn on the side of the second class; together they mark the edges of the corridor within which no training point should fall. The support vectors are the data points that lie exactly on the positive and negative hyperplanes. They are the only points that determine where the boundary sits: move any other point and the boundary does not change, but move a support vector and it does. The maximum margin is the perpendicular gap between the positive and negative hyperplanes, and maximising it is the whole objective, because a wider corridor means a boundary less likely to be crossed by unseen data.',
    markScheme: [
      'Maximum margin hyperplane identified as the separating boundary, placed as far as possible from both classes (2)',
      'Positive hyperplane identified (1.5)',
      'Negative hyperplane identified (1.5)',
      'Support vectors identified as the points lying on those hyperplanes, and their role in fixing the boundary explained (2)',
      'Maximum margin identified as the gap between the two hyperplanes (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 · Support Vector Machines (SVM) — representative diagrams',
    figure: '/lecture-notes/cyb-224/svm-decision-boundary.webp',
    question: 'With the aid of a diagram, differentiate between the decision boundary and the hyperplane for each class, and define the margin.',
    modelAnswer: 'On axes x1 and x2 three parallel lines are drawn. The middle line is the decision boundary: it is what the trained model actually applies, and which side of it a new sample falls on decides the class it is assigned. Either side of it lies one hyperplane per class — the hyperplane for the first class and the hyperplane for the second class — each passing through the closest points of its own class. The support vectors are the ringed points lying on those two outer hyperplanes. The margin is the gap between the decision boundary and the hyperplanes. The distinction being drawn is one of naming rather than of geometry: this is the same arrangement as the maximum margin diagram, where the middle line was called the maximum margin hyperplane and the outer two the positive and negative hyperplanes. A student should recognise both sets of names, because the same picture is labelled either way.',
    markScheme: [
      'Decision boundary identified as the middle line the model applies (2)',
      'Hyperplane for the first class identified (1.5)',
      'Hyperplane for the second class identified (1.5)',
      'Support vectors identified as the points on the outer hyperplanes (2)',
      'Margin defined as the gap between the decision boundary and the hyperplanes (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 8 · Neural Networks (Feedforward / Multi-Layer Perceptron)',
    question: 'Explain feedforward neural networks. Give the forward pass for a single neuron and for an L-layer network, name the common activations, and state the typical training loop.',
    modelAnswer: 'Feedforward neural networks consist of an input layer, one or more hidden layers and an output layer. They excel at learning complex, non-linear patterns for modern network intrusion detection systems, especially with large traffic datasets. For a single neuron the forward pass is z = wᵀx + b, a = σ(z). Common activations σ include ReLU, max(0, z), sigmoid and tanh. For the overall L-layer network, a⁽ˡ⁾ = σ⁽ˡ⁾(W⁽ˡ⁾a⁽ˡ⁻¹⁾ + b⁽ˡ⁾) for l = 1, …, L. Training minimizes empirical risk, for example cross-entropy, using gradient descent, with gradients computed via the chain rule — the backpropagation algorithm. The typical training loop has three steps: the forward pass computes predictions and loss; the backward pass computes gradients ∂L/∂W⁽ˡ⁾ and ∂L/∂b⁽ˡ⁾; and the parameters are updated, W ← W − η ∂L/∂W, or using Adam and similar optimizers.',
    markScheme: [
      'Structure stated — input layer, one or more hidden layers, output layer (2)',
      'Why suited to modern NIDS — complex non-linear patterns, large traffic datasets (1)',
      'Single-neuron forward pass z = wᵀx + b, a = σ(z) (2)',
      'Common activations named — ReLU, sigmoid, tanh (1)',
      'L-layer model equation given (2)',
      'Training loop — forward pass, backward pass computing gradients, parameter update (2)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 8 · Choosing between the algorithms',
    question: 'Compare decision trees, Support Vector Machines and neural networks for use in an intrusion detection system, stating the trade-off each represents.',
    modelAnswer: 'Each method has trade-offs. Decision trees offer interpretability: the rule that fired can be read and defended, they handle mixed data types with little preprocessing, and they are cheap to train and to run — but they overfit readily, particularly on identifier-like features such as ports and addresses, and a small change to the training data can restructure the whole tree. SVMs provide strong theoretical guarantees in high dimensions and generalise well from relatively small labeled datasets, because the boundary depends only on the support vectors — but training cost grows roughly with the square of the sample count, so they do not scale to a full capture, and their output is a distance rather than a probability. Neural networks deliver top performance on large or complex datasets and predict cheaply once trained — but they need a large labeled dataset, which attack traffic rarely is, and a decision cannot be explained to an incident-response team. In practice many real-world IDS and IPS systems ensemble these methods or use deep learning hybrids, and neural approaches work best combined with feature engineering, autoencoders for anomaly-detection preprocessing, or modern variants such as CNNs, LSTMs and Transformers for traffic-sequence analysis.',
    markScheme: [
      'Decision trees — interpretability against a tendency to overfit (3)',
      'SVMs — strong in high dimensions and on small labeled sets, against poor scaling (3)',
      'Neural networks — top performance on large complex data, against data hunger and no explainability (3)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 9 — PRACTICAL ACTIVITIES
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 9 · PRACTICAL 2: Decision Tree Construction',
    question: 'A dataset of six packets contains three malicious and three benign. Calculate the root Gini impurity, showing your working. Then show the result of splitting on the SYN flag and state the final decision rule and the training accuracy.',
    modelAnswer: 'The formula is Gini = 1 − (P²malicious + P²benign). There are three malicious packets and three benign packets, so Pmalicious = 3/6 = 0.5 and Pbenign = 3/6 = 0.5. Therefore Gini = 1 − (0.5² + 0.5²) = 1 − (0.25 + 0.25) = 1 − 0.5 = 0.5. A Gini of 0.5 is the maximum for two classes and means the node is completely impure — the classes are evenly mixed and the node carries no information. Splitting on the SYN flag: if SYN = 1 all packets in that branch are malicious, so Gini = 0; if SYN = 0 all packets in that branch are benign, so Gini = 0. Both children are perfectly pure, which produces a perfect split. The final decision rule is therefore: IF SYN_Flag = 1 THEN Malicious ELSE Benign. The training accuracy is 6/6 = 100%.',
    markScheme: [
      'Class counts stated — three malicious, three benign (1)',
      'Proportions computed — 3/6 = 0.5 for each (2)',
      'Gini formula stated correctly (2)',
      'Root Gini computed as 0.5, with the arithmetic shown (2)',
      'Both branches shown pure with Gini = 0, giving a perfect split (2)',
      'Final decision rule and 100% training accuracy stated (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 9 · Function of SYN Flag; TCP Three-Way Handshake',
    question: 'What is the SYN flag and what is its function? With the aid of the three steps, explain the TCP three-way handshake.',
    modelAnswer: 'The SYN flag is a control bit in the Transmission Control Protocol header that is used to start a connection between two computers on a network. SYN stands for Synchronize, and it is mainly used during the initial stage of communication to synchronize sequence numbers between the sender and the receiver. Its function is to initiate a TCP connection before data transmission begins: it tells the receiving device that the sender wants to start a communication session. The SYN flag is part of the three-way handshake, which establishes a reliable TCP connection. Step 1 is SYN, client to server: the client sends a packet with SYN = 1, which means I want to start a connection. Step 2 is SYN-ACK, server to client: the server replies with SYN = 1 and ACK = 1, meaning connection request received. Step 3 is ACK, client to server: the client sends ACK = 1, and the connection is now established.',
    markScheme: [
      'SYN identified as a control bit in the TCP header, and SYN stated to stand for Synchronize (2)',
      'Function stated — initiate a connection and synchronize sequence numbers before data transmission (2)',
      'Step 1 SYN, client to server, SYN = 1 (1.5)',
      'Step 2 SYN-ACK, server to client, SYN = 1 and ACK = 1 (1.5)',
      'Step 3 ACK, client to server, connection established (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 9 · Discussion Question',
    question: 'A decision tree trained on six packets splits once on the SYN flag and achieves 100% training accuracy. Why might this tree overfit real network traffic data, and how could pruning improve generalization?',
    modelAnswer: 'The tree was fitted on six packets and a single feature. SYN = 1 happened to coincide with Malicious in all three malicious rows, so the split reaches Gini 0 on both sides and 100% training accuracy — but that accuracy is a property of those six rows, not of network traffic. Every normal TCP connection opens with SYN = 1, so applied to real traffic this rule flags the entire handshake volume of the network as malicious, producing false positives on essentially all legitimate connections, while detecting nothing that is not a SYN flood. The dataset is also too small to identify which feature carries the real signal: packet size splits the same six rows just as perfectly, since any threshold between 65 and 70 bytes separates the malicious 55, 60 and 65 from the benign 70, 1400 and 1500. With six rows there is no way to tell which perfect split reflects reality, so the tree simply takes the first it evaluates. Pruning addresses this by preventing the tree from memorising the training set. Pre-pruning stops growth early: cap the maximum depth, require a minimum number of samples per leaf, and require a minimum impurity decrease before a split is accepted. Post-pruning grows the full tree and then collapses any branch whose removal does not worsen performance on held-out data. Either way, only splits that survive on packets the tree has not seen are retained, and a leaf that is 60% confident over many samples generalises better than one that is perfect over two.',
    markScheme: [
      'Tree fitted on only six packets and one feature (2)',
      '100% training accuracy identified as a property of those rows, not of real traffic (2)',
      'Benign SYN packets in every handshake explained as the source of false positives (2)',
      'Pre-pruning stated — max depth, minimum samples per leaf, minimum impurity decrease (2)',
      'Post-pruning stated — collapse branches that do not improve held-out performance (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPICS 10-11 — OTHER PARADIGMS, DETECTION AND MITIGATION
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 10 · Unsupervised Learning; Reinforcement Learning; Deep Learning',
    question: 'Differentiate between unsupervised learning, reinforcement learning and deep learning. Name the techniques associated with each and give a network security use for each.',
    modelAnswer: 'Unsupervised learning involves training a model on data without labeled responses; the model tries to learn the underlying structure of the data by identifying patterns and relationships. Its techniques include clustering algorithms such as k-means and hierarchical clustering, which group similar data points together — in network security clustering can identify groups of similar network behaviors, for example grouping similar login attempts and identifying outliers that may indicate unauthorized access attempts. Anomaly detection also belongs here, using techniques such as Gaussian Mixture Models and Principal Component Analysis to identify data points that deviate significantly from the majority, which in security surfaces unusual traffic patterns that may indicate a breach. Reinforcement learning involves training a model to make a sequence of decisions by learning from the consequences of its actions: the model receives rewards for desired behaviors and penalties for undesired ones, optimizing its actions over time. Markov Decision Processes provide the mathematical framework for modeling decisions where outcomes are partly random and partly under the control of the decision-maker; in network security a reinforcement learning model could be trained to dynamically adjust firewall rules based on detected threats, optimizing the balance between security and network performance. Deep learning, a subset of ML, involves neural networks with many layers that can model complex patterns in data, and is particularly effective for high-dimensional data such as images and speech. Convolutional Neural Networks process grid-like data and can analyze network traffic represented as images, or detect malware by analyzing the binary code of executable files; Recurrent Neural Networks handle sequential data and can detect anomalies in network traffic over time, identifying ongoing attacks or data exfiltration.',
    markScheme: [
      'Unsupervised learning defined — no labeled responses, learns underlying structure (2)',
      'Clustering algorithms named with a security use (2)',
      'Reinforcement learning defined — sequence of decisions, rewards and penalties (2)',
      'MDP named and explained, with the firewall-rule example (2)',
      'Deep learning defined — neural networks with many layers, high-dimensional data (2)',
      'CNN and RNN named, each with a security use (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 10 · Convolutional Neural Networks; Recurrent Neural Networks',
    question: 'Differentiate between Convolutional Neural Networks and Recurrent Neural Networks, and state how each is applied in network security.',
    modelAnswer: 'Convolutional Neural Networks are specialized neural networks designed to process grid-like data, such as images. In network security, CNNs can be used to analyze network traffic data represented as images, identifying patterns indicative of malicious activity; for instance CNNs can be applied to detect malware by analyzing the binary code of executable files, where the binary is rendered as a two-dimensional grid and the network learns the visual texture characteristic of a malware family. Recurrent Neural Networks are designed to handle sequential data, which makes them suitable for tasks such as time-series analysis. In network security, RNNs can be used to detect anomalies in network traffic over time, identifying patterns that indicate ongoing attacks or data exfiltration attempts. The distinction is therefore one of what structure each exploits: a CNN assumes the data has spatial structure, where neighbouring values are related; an RNN assumes it has temporal order, where what came before conditions what comes next. An attack visible in a single packet suits a CNN; one visible only across a session suits an RNN.',
    markScheme: [
      'CNNs explained — specialized for grid-like data such as images (2)',
      'CNN security application — traffic as images, or malware detection from binary code (2)',
      'RNNs explained — designed for sequential data, suited to time-series analysis (2)',
      'RNN security application — anomalies over time, ongoing attacks or data exfiltration (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 11 · Detection and Mitigation of Threats in Big Data',
    figure: '/lecture-notes/cyb-224/ml-detection-pipeline.webp',
    question: 'With the aid of a diagram, state and explain the SIX stages of the machine learning threat-detection pipeline.',
    modelAnswer: 'The application of AI and ML in network security has fundamentally transformed the approach to detecting and mitigating network threats, enabling analysis of vast amounts of network data in real time. The pipeline has six stages. Data collection gathers network traffic — the raw packets and flow records the rest of the pipeline depends on. Data preprocessing performs cleansing and feature extraction, turning raw traffic into the numeric features a model can use and discarding what is unusable. Model training fits the detector, using neural networks, decision trees or SVMs on the prepared features. Real-time monitoring and detection applies the trained model to live traffic, establishing baseline behavior and performing anomaly detection against it. Threat identification and mitigation interprets what has been detected, using pattern recognition against known threats and predictive modeling for those not yet seen. Automated response acts without waiting for a human, blocking IPs and isolating devices. The order matters: each stage consumes what the previous one produces, and a failure early — poor feature extraction, or a baseline established while an attack was already running — propagates through everything after it.',
    markScheme: [
      'Data collection from network traffic (2)',
      'Data preprocessing — cleansing and feature extraction (2)',
      'Model training — neural networks, decision trees, SVM (2)',
      'Real-time monitoring and detection — baseline behavior and anomaly detection (2)',
      'Threat identification and mitigation — pattern recognition and predictive modeling (2)',
      'Automated response — blocking IPs and isolating devices (2)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 11 · Anomaly Detection',
    question: 'AI and ML models detect anomalies in network traffic by identifying deviations from established norms. State and explain the THREE key steps in this process.',
    modelAnswer: 'Baseline behavior modeling comes first: AI/ML systems establish a baseline of normal network behavior by analyzing historical data, understanding what constitutes regular traffic, user activities and system operations. Machine learning models can observe typical login times, frequency of data access and common communication patterns to create a comprehensive profile of normal activities. Real-time monitoring follows: once the baseline is established, the system continuously monitors network traffic and activities in real time, and any deviations from the established baseline are flagged as potential anomalies. Techniques such as statistical analysis, clustering and neural networks are commonly used; for example a sudden spike in data transfer volume or an unusual login time can trigger an alert for further investigation. Contextual analysis refines the result: advanced AI/ML systems incorporate contextual data to improve anomaly detection, so that user behavior analytics can differentiate between normal activities and suspicious actions based on context such as time of day, location and user role. By analyzing this contextual information the models can more accurately identify genuine threats and reduce false positives.',
    markScheme: [
      'Baseline behavior modeling — profile of normal built from historical data, with examples of what is observed (3)',
      'Real-time monitoring — continuous monitoring, deviations flagged, techniques named (3)',
      'Contextual analysis — UBA using time, location and role to improve accuracy and reduce false positives (3)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 11 · Threat Identification; Predictive Analytics',
    question: 'Explain threat identification and predictive analytics in big data security. In your answer treat pattern recognition, behavioral analysis, predictive modeling and risk assessment.',
    modelAnswer: 'AI and ML models are trained to recognize patterns associated with known threats and can identify new, previously unseen threats through behavioral analysis. In pattern recognition, models are trained on patterns associated with known threats: signature-based detection systems use predefined patterns of known malware, and machine learning enhances this by identifying variations and new patterns that signature-based systems might miss — for instance detecting polymorphic malware that frequently changes its code to evade traditional signature-based detection. In behavioral analysis, instead of relying solely on known patterns, the model analyzes the behavior of entities within the network: an increase in failed login attempts, unusual data transfers or unexpected communication patterns can trigger alerts. This is particularly useful for detecting zero-day attacks and advanced persistent threats, where the attacker behavior deviates from normal user activities even though no signature exists. Predictive analytics anticipates rather than reacts. Predictive modeling analyzes trends and historical data to identify vulnerabilities and anticipate future attacks, enabling proactive measures; for instance time-series analysis can forecast potential DDoS attacks by identifying patterns in traffic volume and alerting administrators to take preventive action. Risk assessment evaluates the potential impact and likelihood of various threats so that systems can prioritize responses and allocate resources effectively — a risk assessment model can determine the criticality of different assets and prioritize protection of high-value targets.',
    markScheme: [
      'Pattern recognition explained, with polymorphic malware as the example of what signatures miss (3)',
      'Behavioral analysis explained, with zero-day attacks and APTs as what it catches (3)',
      'Predictive modeling explained, with DDoS forecasting from traffic-volume trends (3)',
      'Risk assessment explained — impact and likelihood, prioritising high-value assets (3)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPICS 12-15 — THREAT DETECTION, EDA, EVALUATION, LIBRARIES
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 12 · The Procedural Workflow',
    question: 'In cybersecurity, supervised machine learning acts as a trained digital sentry. State and explain the FOUR stages of the procedural workflow a model undergoes before it can detect a threat.',
    modelAnswer: 'In cybersecurity, supervised machine learning acts as a trained digital sentry: it functions by learning from a labeled dataset of past incidents, identifying which patterns are harmless, or benign, and which are dangerous, or malicious. Before a model can detect a threat it must undergo a rigorous phase of four stages. Data labeling: experts provide the model with a dataset where every entry is tagged, for example 1 for malware and 0 for safe. Feature engineering: identifying the specific characteristics that signal a threat — for an email, features include the sender IP, the number of links, or the presence of urgent keywords. Training: the algorithm, the engine, processes the features to find a mathematical boundary between safe and unsafe. Testing and validation: the model is given new, unlabeled data to see if it can correctly predict the category, which is the only stage that says anything about how it will behave on traffic it has not seen.',
    markScheme: [
      'Data labeling — every entry tagged by experts, with the 1 and 0 convention (2)',
      'Feature engineering — identifying characteristics that signal a threat, with an email example (2)',
      'Training — algorithm finds a mathematical boundary between safe and unsafe (2)',
      'Testing and validation — new unlabeled data used to check prediction (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 12 · Deployment in Threat Detection in Big Data',
    question: 'Supervised learning is deployed in three main areas of threat detection. State each area, the common algorithms, the manual indicators used, and how it works.',
    modelAnswer: 'Supervised learning is categorized into two main tasks, classification — is this a threat — and regression — how high is the risk. It is deployed in three areas. Network intrusion detection monitors traffic to identify unauthorized access or attacks such as DDoS; the common algorithms are Random Forest and Support Vector Machines; the manual indicators are byte counts, packet intervals and TCP flag combinations; and it works by learning the profile of a standard connection, so that if a connection shows features similar to a labeled SYN Flood attack it triggers an alert. Malware analysis detects zero-day threats that signature-based antivirus software might miss; the common algorithms are Decision Trees and K-Nearest Neighbors; the manual indicators are file size, API calls made by the code and registry key changes; and it works by looking at behavioral features instead of a specific fingerprint, so that if a file behaves like previously labeled ransomware, for example by rapid file encryption, it is quarantined. Phishing and spam detection analyzes communication to stop social engineering; the common algorithms are Naive Bayes and Logistic Regression; the manual indicators are URL length, the use of IP addresses in place of domain names and suspicious call-to-action phrases; and it works by Naive Bayes calculating the probability that an email is phishing based on the frequency of specific suspicious words found in past labeled phishing campaigns.',
    markScheme: [
      'Both supervised tasks named — classification and regression (1)',
      'Network intrusion detection — algorithms, indicators and how it works (4)',
      'Malware analysis — algorithms, indicators and how it works (4)',
      'Phishing and spam detection — algorithms, indicators and how it works (3)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 12 · Algorithm Comparison',
    figure: '/lecture-notes/cyb-224/algorithm-comparison.webp',
    question: 'Name the FOUR algorithms in the comparison table and state the security task each is used for.',
    items: [
      { name: 'Naive Bayes', aliases: ['naive bayes'], explain: 'Phishing/Spam. Extremely fast and works well with text, but assumes features are independent.' },
      { name: 'Random Forest', aliases: ['random forest'], explain: 'Network Intrusion. Highly accurate and handles large data, but can be slow to run in real-time.' },
      { name: 'SVM', aliases: ['support vector machine'], explain: 'Malware Detection. Excellent for complex, high-dimensional data, but high memory consumption.' },
      { name: 'Logistic Regression', aliases: ['logistic regression'], explain: 'Fraud Detection. Provides a clear Risk Score from 0 to 100%, but struggles with non-linear threats.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 13 · Exploratory Data Analysis (EDA) for Network Security; TYPES OF EDA',
    question: 'Define Exploratory Data Analysis and state its functions. Explain the THREE types of EDA, stating the techniques and what each helps you understand.',
    modelAnswer: 'Exploratory Data Analysis is the process of examining, summarizing and visualizing a dataset to understand its main characteristics before applying formal models. It helps discover patterns, detect errors or missing values, identify relationships between variables and check assumptions for modeling. EDA is typically performed using libraries such as Pandas for data handling, Matplotlib for basic plots and Seaborn for advanced visuals. There are three types. Univariate analysis examines one variable, using the mean, median and mode along with histograms and boxplots; it helps to understand the distribution of a single feature. Bivariate analysis examines two variables, using scatter plots and correlation analysis; it helps to identify relationships between variables. Multivariate analysis examines multiple variables, using heatmaps and pair plots; it helps understand complex interactions. In a security context this order matters: a single feature tells you whether a value is unusual, two tell you whether two behaviours move together, and only the multivariate view shows the combination of features that marks an attack.',
    markScheme: [
      'EDA defined — examining, summarizing and visualizing a dataset before applying formal models (3)',
      'Functions of EDA stated — patterns, errors or missing values, relationships, assumptions (2)',
      'Univariate analysis — techniques and purpose (1.5)',
      'Bivariate analysis — techniques and purpose (1.5)',
      'Multivariate analysis — techniques and purpose (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 14 · Model Evaluation',
    question: 'Define the four components of the confusion matrix. State the equations for accuracy, precision, recall and F1-score.',
    modelAnswer: 'The confusion matrix summarizes the classification results by comparing the predicted labels with the actual labels, and consists of four main components. True Positive is a case where the model correctly identifies the threat pattern. True Negative is a case where the model correctly predicts that the system does not have a threat. False Positive is a case where the model incorrectly predicts a threat when there is none — a false alarm. False Negative is a case where the model fails to detect a threat when there is a threat in the system — a miss. From these, four metrics follow. Accuracy = (TP + TN) / (TP + TN + FP + FN), the proportion of correctly predicted instances out of all predictions. Precision = TP / (TP + FP), the proportion of positive predictions that are actually correct; a high value means fewer false alarms. Recall, also called sensitivity, = TP / (TP + FN), the proportion of actual positive cases correctly identified. F1 = 2 × (Precision × Recall) / (Precision + Recall), the harmonic mean of precision and recall.',
    markScheme: [
      'All four components defined — TP, TN, FP, FN (4)',
      'Accuracy equation given complete (2)',
      'Precision equation given complete (2)',
      'Recall equation given complete (2)',
      'F1 equation given complete (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 14 · Recall (Sensitivity); F1 Score',
    question: 'Why is recall particularly important for an intrusion detection system, and when is the F1-score preferred to accuracy?',
    modelAnswer: 'IDS recall is particularly important because failing to detect a true threat case, a false negative, may delay early intervention and response — the attack proceeds while the system reports nothing wrong. Therefore models used for threat screening are often designed to maximize recall, accepting more false alarms in exchange for missing fewer real intrusions, because an analyst can dismiss a false alarm but cannot act on an alert that was never raised. The F1-score is the harmonic mean of precision and recall and is preferred when the dataset is imbalanced, because it considers both precision and recall simultaneously. This is the normal situation in security: attacks are rare relative to benign traffic, so a model that predicts benign for everything can report very high accuracy while detecting nothing at all. A high F1-score indicates that the model achieves a good balance between correctly identifying threat cases and minimizing incorrect predictions, which accuracy alone cannot show.',
    markScheme: [
      'Recall maximised because a false negative delays intervention, and a missed attack cannot be recovered by an analyst (3)',
      'F1 preferred on imbalanced data, with the explanation that accuracy can be high while nothing is detected (3)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 15 · Different Libraries for Big Data Manipulation',
    question: 'Name the FOUR Python libraries used for big data manipulation and state the function of each.',
    items: [
      { name: 'Pandas', aliases: ['pd'], explain: 'Data manipulation and analysis — loads datasets, organizes them into DataFrames, cleans and preprocesses, performs statistical operations.' },
      { name: 'NumPy', aliases: ['np'], explain: 'Numerical computations and array operations — handles large numerical data, supports mathematical operations, works with multi-dimensional arrays.' },
      { name: 'Matplotlib', aliases: ['pyplot', 'plt'], explain: 'Basic data visualization — line charts, bar charts and histograms. Drawing graphs from scratch.' },
      { name: 'Seaborn', aliases: ['sns'], explain: 'Advanced and attractive statistical visualizations — builds on Matplotlib and handles complex visuals easily.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPICS 19-20 — K-MEANS AND k-NN
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 19 · Network Anomaly Detection (K-Means Clustering); Workflow',
    figure: '/lecture-notes/cyb-224/kmeans-workflow.webp',
    question: 'Explain network anomaly detection using K-Means clustering. State the role of each required library, the FIVE steps of the workflow, and give a practical example.',
    modelAnswer: 'In cybersecurity, threat detection often relies on identifying unusual patterns instead of known virus signatures, and NumPy, K-Means clustering and Matplotlib work together to detect anomalies in network behavior. NumPy converts raw security logs into structured numerical arrays, which allow fast mathematical computation. K-Means is an unsupervised learning algorithm that groups data into clusters; points that are far from cluster centers, or centroids, are considered anomalies. Matplotlib visualizes clustered data so analysts can easily identify suspicious outliers. Pandas is used for data manipulation and analysis before the data becomes an array. The workflow has five steps: collect network activity data, such as bytes transferred and session duration; convert the data into a NumPy array; apply K-Means clustering to group normal behaviors; identify data points far from cluster centroids; and visualize clusters and anomalies using Matplotlib. As a practical example, a user normally downloads small files of one to two megabytes; suddenly one session shows a ten gigabyte transfer at 3:00 AM. That session sits far from the cluster of normal sessions and may be flagged as anomalous — note that nothing had to be labelled as an attack in advance for this to be caught, which is the advantage of the unsupervised approach.',
    markScheme: [
      'Detection by unusual patterns rather than known signatures stated (1)',
      'NumPy role — converts raw logs into numerical arrays for fast computation (1.5)',
      'K-Means role — unsupervised clustering, points far from centroids are anomalies (2)',
      'Matplotlib role — visualizes clusters so outliers can be identified (1.5)',
      'All five workflow steps stated in order (3)',
      'Practical example given — normal small downloads against a 10 GB transfer at 3:00 AM (1)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 20 · The k-Nearest Neighbors (k-NN) Algorithm',
    question: 'Define the k-Nearest Neighbors algorithm and explain what is meant by lazy learning. State what happens in the training and classification phases, name the TWO distance metrics and when each is used, and give TWO advantages and TWO disadvantages.',
    modelAnswer: 'The k-Nearest Neighbors algorithm is a simple and well-known example of a lazy learning algorithm in machine learning. Lazy learning algorithms delay most computations until the classification stage instead of performing intensive computation during training. In the training phase, k-NN stores all training feature vectors and their corresponding labels; no model building or parameter learning is performed, which is why training is effectively instant. In the classification phase it calculates the distance between a test sample and all training samples, selects the k nearest neighbors, and assigns the most common label among those neighbors. Two distance metrics are used: Euclidean distance for continuous numerical data, and Hamming distance for discrete or categorical data. Its advantages are that it is simple to understand and implement, it has a very fast training phase, and it is useful for teaching machine-learning concepts. Its disadvantages are large memory usage, because all training data is stored, slow classification time, inefficiency for very large datasets, and dependence on the choice of k and the distance metric. Optimized data structures such as k-d trees can be used to speed up neighbor searching.',
    markScheme: [
      'k-NN defined as a lazy, instance-based classifier (2)',
      'Lazy learning explained — computation deferred from training to classification (2)',
      'Training phase — stores feature vectors and labels, no model built (2)',
      'Classification phase — distance to all samples, select k nearest, majority label (2)',
      'Both distance metrics named with when each is used (2)',
      'Any two advantages and any two disadvantages given (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 20 · Activity',
    question: 'Explain the role of the parameter k in k-NN. State what happens when k = 1 and when k is too large, how the best value of k is chosen, and how feature scaling affects k-NN performance.',
    modelAnswer: 'The parameter k sets how many neighbours vote on the label of a new sample, and with it the balance between fitting noise and over-smoothing. When k = 1 each sample simply takes the label of its single closest neighbour: training error falls to zero, which looks perfect and is not, because the boundary traces every point including noise and mislabelled traffic, giving high variance and poor generalisation. When k is too large the neighbourhood grows beyond the structure being detected and predictions drift toward the majority class; in an intrusion detection system this is dangerous rather than merely inaccurate, because attacks are rare, so a large k dilutes the few malicious neighbours and the model quietly predicts benign for everything. The best value is chosen by cross-validating across a range of candidate values and taking the k with the best validation score rather than the best training score; an odd k is used for a two-class problem so a vote cannot tie, and the square root of the sample count is a reasonable value to begin searching around. Feature scaling matters because Euclidean distance is dominated by whichever feature has the widest numeric range: an unscaled byte count in the millions swamps a SYN flag of 0 or 1 and a byte entropy between 0.30 and 0.95, so the model effectively measures one feature and ignores the rest. This is why the practicals treat StandardScaler as mandatory before fitting KNeighborsClassifier.',
    markScheme: [
      'Role of k explained — how many neighbours vote, trading noise against over-smoothing (2)',
      'k = 1 — zero training error, high variance, fits noise and mislabelled points (2)',
      'k too large — over-smooths, drifts to the majority class, dilutes rare attacks (2)',
      'Choosing k — cross-validation, odd k for two classes, square root of n as a starting point (2)',
      'Feature scaling — Euclidean distance dominated by the widest range, so scaling is required (2)',
    ],
  },
  // ══════════════════════════════════════════════════════════════════
  //  TOPICS 16-18, 21 — THE CODED PRACTICALS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 8 · Support Vector Machines (SVM) — representative diagrams',
    figure: '/lecture-notes/cyb-224/svm-candidates.webp',
    question: 'With the aid of a diagram, explain what is meant by hyperplanes that best separate different classes, and state why the maximum margin hyperplane is preferred over the alternatives.',
    modelAnswer: 'For a dataset whose two classes can be separated, there is rarely only one boundary that will do it. The diagram shows several candidate hyperplanes drawn through the same cloud of points, each dividing the plane differently, and each of them classifies every training point correctly. The question an SVM answers is which of them to keep. A boundary that passes close to the training points of one class separates that particular sample correctly but leaves almost no room for error: a new point drawn from the same distribution, falling slightly on the wrong side, is misclassified. The maximum margin hyperplane is the one placed so that the distance to the nearest point of either class is as large as possible, so it is the candidate least likely to be crossed by unseen data. This is why SVMs are described as generalising well: the criterion they optimise is not training accuracy, which many candidates achieve equally, but the width of the corridor around the boundary.',
    markScheme: [
      'Several candidate hyperplanes can separate the same data, all with correct training classification (2)',
      'A boundary close to the training points leaves no room for error on unseen data (2)',
      'Maximum margin hyperplane preferred as the one furthest from both classes, so least likely to be crossed (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 16 · Practice Exercise of Exploratory Data Analysis for IDS Data Set',
    question: 'State the steps you would follow to carry out exploratory data analysis on an intrusion detection dataset such as UNSW-NB15, naming what you would look at at each step.',
    modelAnswer: 'First import the libraries — pandas and numpy for handling the data, matplotlib and seaborn for the plots — and load the dataset with pd.read_csv. Second, carry out basic exploration: df.head() for the first rows, df.info() for the column types, df.shape for the size and df.columns for the column names, so you know what you are working with before you draw anything. Third, preprocess: check for missing values with df.isnull().sum() and take a statistical summary with df.describe(). Fourth, analyse the categorical features with value_counts, then the target variable itself — a countplot of label for the binary target and of attack_cat for the attack categories, ordered by frequency. Fifth, examine the numerical features: histograms of all numeric columns to see their distributions, and a correlation matrix drawn as a heatmap to see which features move together. Sixth, look for outliers using boxplots on the first several numeric features, and examine relationships with the target by plotting sbytes and dbytes against label. Finally check class imbalance with df["label"].value_counts(normalize=True), because in an IDS dataset the attack class is usually the minority and that governs which evaluation metric is meaningful.',
    markScheme: [
      'Import libraries and load the dataset (1.5)',
      'Basic exploration — head, info, shape, columns (1.5)',
      'Missing values checked and statistical summary taken (1.5)',
      'Target variable and attack category distributions examined (1.5)',
      'Correlation matrix and outlier detection with boxplots (1)',
      'Class imbalance checked, and why it matters stated (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 21 · Main Functions of Pandas; Main Functions of Scikit-Learn',
    question: 'State the function of the Pandas and Scikit-Learn libraries, and explain any THREE main functions of each.',
    modelAnswer: 'Pandas is a Python library used for data manipulation and analysis. Its main functions include data creation, building datasets using DataFrame and Series, for example df = pd.read_csv(path); data cleaning, handling missing values, removing duplicates and filtering unwanted records; data selection and filtering, selecting rows and columns, for example X = df.drop("label", axis=1); data transformation, modifying columns, converting data types and performing feature engineering; and data exploration, taking summary statistics with df.describe() and viewing the first rows with df.head(). In the intrusion detection code Pandas is used to create the simulated login dataset, organize login attempts and failed attempts, and separate the input features X from the labels y. Scikit-Learn is a Python library used for machine learning and predictive modeling. Its main functions include data splitting, dividing the dataset into training and testing sets using train_test_split(); model building, covering classification with Random Forest, SVM and Logistic Regression, as well as regression and clustering; model training, fitting a model to data with model.fit(X_train, y_train); and prediction, predicting outcomes with model.predict(X_test).',
    markScheme: [
      'Pandas function stated — data manipulation and analysis (1)',
      'Any three Pandas main functions named and explained (3)',
      'Scikit-Learn function stated — machine learning and predictive modeling (1)',
      'Any three Scikit-Learn main functions named and explained (3)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topics 17-18, 22 · the coded practicals',
    question: 'Name the FOUR scikit-learn classifiers used across the practicals in this course, and state the task each was applied to.',
    items: [
      { name: 'SVC / LinearSVC', aliases: ['svc', 'linearsvc', 'svm'], explain: 'Support Vector Machine for threat detection on UNSW-NB15. SVC with an RBF kernel first; LinearSVC in the alternative listing because it scales to datasets this size.' },
      { name: 'KNeighborsClassifier', aliases: ['knn', 'kneighborsclassifier', 'k-nn'], explain: 'k-Nearest Neighbors intrusion detection with n_neighbors=5. Feature scaling is mandatory before fitting it.' },
      { name: 'DecisionTreeClassifier', aliases: ['decision tree', 'decisiontreeclassifier'], explain: 'Decision Tree intrusion detection with criterion=gini, evaluated with 5-fold cross-validation.' },
      { name: 'RandomForestClassifier', aliases: ['random forest', 'randomforestclassifier'], explain: 'Random Forest in the credit-card fraud model comparison, with n_estimators=100.' },
    ],
  },
];
