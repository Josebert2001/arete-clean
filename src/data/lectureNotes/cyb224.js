export const cyb224LectureNotes = [
      {
        number: '1',
        title: 'Introduction to Big Data Security',
        sections: [
          {
            type: 'note',
            text: 'From the class sessions, not the printed workbook. The workbook itself starts at Concepts of Big Data Security (note 4).',
          },
          {
            type: 'definition',
            heading: '1.1 Definition',
            text: 'Big Data Security refers to the tools, policies, and measures used to protect large volumes of data from unauthorized access, breaches, and misuse throughout its lifecycle — from collection to processing and storage.',
          },
          {
            type: 'fivers',
            heading: '1.2 Characteristics of Big Data — The 5Vs',
            items: [
              { term: 'Volume', def: 'Large amount of data generated and stored' },
              { term: 'Velocity', def: 'Speed at which data is generated and processed' },
              { term: 'Variety', def: 'Different types and formats of data' },
              { term: 'Veracity', def: 'Quality, accuracy, and reliability of the data' },
              { term: 'Value', def: 'Turning processed data into meaningful insight' },
            ],
          },
          {
            type: 'termlist',
            heading: '1.3 Where Does Big Data Come From?',
            items: [
              { term: 'M2M (Machine to Machine)', def: 'data exchanged between connected devices' },
              { term: 'People to Machine', def: 'data generated through human interactions with technology' },
              { term: 'Organisational Data', def: 'data produced by businesses and institutions' },
            ],
          },
          {
            type: 'note',
            text: 'Do not confuse the 5Vs above with the 3Vs in note 4. These five describe big data itself. The workbook uses only the first three - Volume, Velocity and Variety - and uses them for a different purpose: to explain why traditional security controls fail at this scale. Both can be asked; read them together.',
          },
        ],
      },
      {
        number: '2',
        title: 'Operational and Analytical Big Data',
        date: '02/06/2026',
        sections: [
          {
            type: 'note',
            text: 'From the class session of 02/06/2026, not the printed workbook.',
          },
          {
            type: 'definition',
            heading: '2.1 Operational Big Data',
            text: 'Operational Big Data refers to real or nearly real-time data used to support daily business operations and decision making. It processes data immediately as it is generated, supports transactional systems, and requires fast processing.',
          },
          {
            type: 'bullets',
            heading: 'Sources',
            items: ['Social media activities', 'Online transactions', 'ATM transactions', 'Sensor and IoT devices', 'Mobile applications', 'GPS tracking systems'],
          },
          {
            type: 'bullets',
            heading: 'Examples',
            items: ['Online banking transactions', 'E-commerce order processing', 'Hospital patient monitoring systems', 'Airline reservation systems', 'Traffic management systems'],
          },
          {
            type: 'bullets',
            heading: 'Technologies Used',
            items: ['Apache Kafka', 'Apache Storm', 'Apache Flink'],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: ['Real-time decision making', 'Faster response to customer needs', 'Improved operational efficiency', 'Enhanced customer experience'],
            disadvantages: ['High infrastructure cost', 'Data security concerns', 'Complex management'],
          },
          {
            type: 'definition',
            heading: '2.2 Analytical Big Data',
            text: 'Analytical Big Data refers to historical and accumulated data used for analysis, forecasting, reporting, and strategic decision making. It focuses on past and current data, supports business intelligence, and is often stored in data warehouses.',
          },
          {
            type: 'bullets',
            heading: 'Sources',
            items: ['Historical transaction records', 'Customer databases', 'Business reports', 'Data warehouses', 'Web logs'],
          },
          {
            type: 'bullets',
            heading: 'Examples',
            items: ['Sales trends analysis', 'Customer behaviour analysis', 'Market forecasting', 'Fraud detection', 'Academic research'],
          },
          {
            type: 'bullets',
            heading: 'Technologies Used',
            items: ['Apache Spark', 'Business intelligence tools', 'Machine learning platforms'],
          },
          {
            type: 'table',
            heading: '2.3 Comparison: Operational vs Analytical Big Data',
            headers: ['Aspect', 'Operational', 'Analytical'],
            rows: [
              ['Nature', 'Real-time / near real-time', 'Historical / accumulated'],
              ['Purpose', 'Daily operations & decisions', 'Analysis, forecasting, strategy'],
              ['Data freshness', 'Continuously updated', 'Stored in data warehouses'],
              ['Focus', 'Transactional systems', 'Business intelligence & trends'],
              ['Technologies', 'Kafka, Storm, Flink', 'Spark, BI tools, ML platforms'],
              ['Examples', 'ATM txn, GPS, e-commerce', 'Sales trends, fraud detection'],
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Big Data Skills',
        date: '09/06/2026',
        sections: [
          {
            type: 'note',
            text: 'From the class session of 09/06/2026, not the printed workbook.',
          },
          {
            type: 'definition',
            heading: 'Definition',
            text: 'Big Data Skills are the knowledge, abilities, and competencies required to collect, process, store, analyze, visualize, and interpret large amounts of data.',
          },
          {
            type: 'termlist',
            heading: '3.1 Categories of Big Data Skills',
            items: [
              { term: 'Technical Skills', def: 'programming, database management, big data frameworks' },
              { term: 'Analytical Skills', def: 'data analysis, pattern recognition, statistical analysis' },
              { term: 'Business Skills', def: 'translating insights into actionable business strategies' },
              { term: 'Communication Skills', def: 'presenting findings clearly to non-technical audiences' },
              { term: 'Problem Solving Skills', def: 'using data-driven approaches to solve complex problems' },
            ],
          },
          {
            type: 'termlist',
            heading: '3.2 Technical Skills (Detail)',
            items: [
              { term: 'Programming', def: 'ability to write code to manipulate and process data' },
              { term: 'Database Skills', def: 'MySQL, Oracle — querying and managing structured data' },
              { term: 'Big Data Frameworks', def: 'Hadoop, Spark, Kafka — large-scale data processing tools' },
            ],
          },
          {
            type: 'text',
            heading: '3.3 Analytical Skills — Data Analysis',
            text: 'Data analysis involves examining data to discover useful information, patterns, and insights. Key skills include data transformation, statistical analysis, and pattern recognition. Tools commonly used: Python, Excel, Apache Spark.',
          },
          {
            type: 'text',
            heading: '3.4 Business Skills',
            text: 'Business skills involve transforming analyzed data into actionable insights that support business goals and strategic decisions. Data professionals must understand the business context to make their analysis relevant.',
          },
          {
            type: 'bullets',
            heading: '3.5 Communication Skills',
            items: ['Report writing', 'Presentation skills', 'Team collaboration', 'Storytelling with data — presenting findings visually and narratively'],
          },
          {
            type: 'termlist',
            heading: '3.6 Problem Solving — Steps',
            items: [
              { term: 'Step 1', def: 'Identify the problem' },
              { term: 'Step 2', def: 'Collect relevant data' },
              { term: 'Step 3', def: 'Analyse the data' },
              { term: 'Step 4', def: 'Generate insights' },
              { term: 'Step 5', def: 'Recommend solutions' },
            ],
          },
          {
            type: 'casestudy',
            prompt: 'University of Uyo wants to improve student performance using big data analytics.',
            tasks: [
              'Identify possible data sources',
              'Explain how the data can be collected and stored',
              'Determine the type of analytics that can be applied',
              'Recommend tools and technology for implementation',
              'Discuss expected benefits and possible challenges',
            ],
          },
          {
            type: 'note',
            text: 'The answers below are worked answers, not the lecturer\'s.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Data sources', def: 'Records the university already holds: semester results and GPA history per course, lecture attendance registers, student-portal login and activity logs, library borrowing and e-resource access, JAMB and O-level entry scores, departmental and level enrolment figures, fee-payment timing, and student feedback or questionnaire responses' },
              { term: 'Collection and storage', def: 'Most of this starts on paper or in departmental spreadsheets, so the first tasks are digitising it and agreeing one student identifier that works across departments. Structured records go into a central data warehouse; feedback text and portal logs suit a data lake. Loading can be batched at the end of each semester — nothing here needs streaming. Student records are personal data under the Nigeria Data Protection Act, so access control, encryption at rest and anonymisation before analysis belong in the design rather than being added afterwards' },
              { term: 'Type of analytics', def: 'All four, in order. Descriptive answers what happened — pass rates by course and level. Diagnostic asks why — which factors track with failure. Predictive identifies which students are likely to carry over a course while there is still time to act. Prescriptive recommends which intervention to offer whom' },
              { term: 'Tools and technology', def: 'Python with pandas for the analysis, PostgreSQL or MySQL for the warehouse, and Power BI or Excel for dashboards that deans will actually open. Hadoop and Spark are the fashionable answer and the wrong one here: a single university produces gigabytes, not petabytes, and one relational database server handles that comfortably. Reach for a cluster only when the volume genuinely stops fitting' },
              { term: 'Benefits and challenges', def: 'Benefits: at-risk students identified before they carry over a course, better lecturer and timetable allocation, and evidence to support accreditation. Challenges: incomplete and inconsistent records, no single student identifier across departments, staff with no analytics training, unreliable power and connectivity, resistance from those who dislike being measured, and the privacy risk created by concentrating everything about every student in one database' },
            ],
          },
        ],
      },
      {
        number: '4',
        title: 'Concepts of Big Data Security',
        sections: [
          {
            type: 'definition',
            text: 'Big Data security is the collective term for the guardrails, policies, and technologies used to protect massive volumes of data, both structured and unstructured, from unauthorized access, theft, exposure, and modification.',
          },
          {
            type: 'text',
            text: 'While traditional security focuses on securing perimeter walls (like firewalls) around static databases, Big Data security is unique because the data is constantly moving, changing, and being analyzed at an immense scale. Here is a breakdown of why it is different, the core challenges it addresses, and how it is implemented.',
          },
          {
            type: 'text',
            heading: 'The 3Vs of Big Data Security Challenges',
            text: 'Traditional security measures often fail when applied to Big Data because of its fundamental characteristics:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Volume', def: 'Protecting petabytes or exabytes of data requires security tools that can scale dynamically without creating processing bottlenecks.' },
              { term: 'Velocity', def: 'Data streams into systems in real-time (e.g., IoT sensors, network logs). Security mechanisms like encryption and threat detection must happen on the fly without causing latency.' },
              { term: 'Variety', def: 'Big Data includes structured SQL databases, semi-structured JSON files, and unstructured data like video, audio, and text. A one-size-fits-all security policy does not work here.' },
            ],
          },
          {
            type: 'text',
            heading: 'Core Pillars of Big Data Security',
            text: 'To secure a Big Data ecosystem (such as Hadoop, Spark, or cloud-based data lakes), organizations implement a multi-layered security framework:',
          },
          {
            type: 'text',
            heading: '1. Data Encryption and Privacy',
            text: 'Because data is constantly in motion across distributed networks, it must be protected at all stages:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Encryption in Transit', def: 'Protecting data as it moves between nodes, clusters, or users (typically using TLS/SSL).' },
              { term: 'Encryption at Rest', def: 'Safeguarding data stored on disks using strong encryption standards (like AES-256).' },
              { term: 'Data Masking & Tokenization', def: 'Replacing sensitive data (like credit card numbers or PII) with realistic but fake data or tokens before it enters the analytics pipeline so data scientists can work with it safely.' },
            ],
          },
          {
            type: 'text',
            heading: '2. Centralized Access Control',
            text: 'When dealing with thousands of users and automated processes, managing who can see what is critical:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Role-Based Access Control (RBAC)', def: 'Assigning permissions based on organizational roles.' },
              { term: 'Attribute-Based Access Control (ABAC)', def: 'A finer-grained approach where access is determined by contextual attributes (e.g., "Allow access only if the user is a Data Analyst AND the request comes from an internal IP during working hours").' },
            ],
          },
          {
            type: 'text',
            heading: '3. Endpoint and Infrastructure Security',
            text: 'Big Data relies on distributed computing, meaning data is split across hundreds or thousands of server nodes.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Node Authentication', def: 'Ensuring that only authorized servers/nodes can join the computing cluster (often managed via Kerberos).' },
              { term: 'API Security', def: 'Protecting the endpoints and APIs that applications use to connect to and query the data lake.' },
            ],
          },
          {
            type: 'text',
            heading: '4. Real-Time Monitoring and Auditing',
            text: 'With massive infrastructure, detecting a breach manually is impossible. Big Data environments use specialized security tools to:',
          },
          {
            type: 'bullets',
            items: [
              'Maintain continuous audit logs of who accessed what data and when.',
              'Employ AI and Machine Learning-driven User and Entity Behavior Analytics (UEBA) to spot anomalous data access patterns that might indicate an insider threat or compromised credentials.',
            ],
          },
          {
            type: 'text',
            heading: 'Common Tools in the Big Data Security Ecosystem',
            text: 'Security in this domain is typically integrated directly into the data architecture. Some widely used tools include:',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/security-ecosystem.webp',
            width: 1600, height: 238,
            alt: 'Four tools mapped to their functions: Apache Ranger/Sentry to centralized security administration and access control, Kerberos to network authentication, Knox Gateway to secure perimeter access for REST APIs, and SIEM systems (Splunk, Elastic) to log aggregation and analysis at scale',
            caption: 'Figure 1: The Big Data security ecosystem — each tool mapped to its primary function',
          },
          {
            type: 'table',
            headers: ['Tool/Technology', 'Primary Function'],
            rows: [
              ['Apache Ranger / Apache Sentry', 'Centralized security administration and fine-grained access control for Hadoop/Spark ecosystems.'],
              ['Kerberos', 'Network authentication protocol used to verify the identity of users and nodes in a cluster.'],
              ['Knox Gateway', 'Provides a single, secure point of access (perimeter security) for Big Data cluster REST APIs.'],
              ['SIEM Systems (Splunk, Elastic)', 'Security Information and Event Management systems used to aggregate and analyze security logs at scale.'],
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'Artificial Intelligence and Big Data Security',
        sections: [
          {
            type: 'definition',
            text: 'Artificial Intelligence (AI) is the branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding. AI consists a wide range of technologies and methodologies, from rule-based systems to more advanced forms like machine learning and deep learning.',
          },
          {
            type: 'definition',
            text: 'Machine Learning (ML), a subset of AI, is the study of algorithms and statistical models that enable computers to perform specific tasks without using explicit instructions. Instead, ML systems rely on patterns and inference derived from data and information. The primary goal of ML is to build models that can generalize from training data to unseen data, making predictions or decisions based on new inputs.',
          },
          {
            type: 'text',
            heading: 'Application of ML in Data Security',
            text: 'The application of AI and ML in network security involves using these technologies to analyze large amounts of network data, identify patterns, and detect anomalies that may indicate security threats. This approach allows for real-time detection and mitigation of cyber threats, which is crucial given the increasing complexity and volume of attacks. The digital landscape is defined by two converging trends: the ubiquity of machine learning and the increasing vulnerability of interconnected systems (e.g., microprocessors like Spectre/Meltdown). Table 2 shows the breakdown of various security threats in the data.',
          },
          {
            type: 'image',
            heading: 'Table 2: Cybersecurity Threat Categories with Definitions and Examples',
            src: '/lecture-notes/cyb-224/threat-taxonomy.webp',
            width: 1400, height: 704,
            alt: 'Mind map of cybersecurity threats in three branches: Malware (worm, trojan, ransomware, bot, rootkit, adware, botnet, spyware, backdoor), Network Attacks (login attack, phishing, spear phishing, keylogger, spam, exploit, account takeover, social engineering, sniffing, scanning, DoS/DDoS) and Advanced Threats (APT, zero-day)',
            caption: 'Figure 2: Threat taxonomy — malware, network attacks, and advanced threats',
          },
          {
            type: 'table',
            headers: ['Threat Category', 'Definition', 'Example'],
            rows: [
              ['Malware', 'Malicious software designed to damage systems, steal data, or gain unauthorized access.', 'A program that secretly deletes company files after installation.'],
              ['Worm', 'Self-replicating malware that spreads automatically across networks without user action.', 'A worm spreading through a university network by exploiting a vulnerability.'],
              ['Trojan', 'Malware disguised as legitimate software to trick users into installing it.', "A fake 'Free Antivirus' app that installs hidden spyware."],
              ['Spyware', 'Software that secretly monitors and collects user information without consent.', 'A program that tracks browsing history and sends it to attackers.'],
              ['Adware', 'Software that automatically displays unwanted advertisements on a device.', 'Constant pop-up ads appearing during internet browsing.'],
              ['Ransomware', 'Malware that encrypts files and demands payment to restore access.', "A hospital's records encrypted until ransom is paid."],
              ['Rootkit', 'A hidden tool that gives attackers privileged access while remaining undetected.', 'An attacker installing a rootkit to hide server intrusion.'],
              ['Backdoor', 'A secret method of bypassing normal authentication to access a system.', 'A hidden login password embedded in an application.'],
              ['Bot', 'An infected computer remotely controlled by an attacker.', 'A laptop unknowingly sending spam emails under attacker control.'],
              ['Botnet', 'A group of infected devices controlled together by an attacker.', 'Thousands of compromised devices launching a coordinated attack.'],
              ['Exploit', 'Code that takes advantage of a specific software weakness.', 'Using an unpatched browser flaw to gain system access.'],
              ['Scanning', 'Actively searching systems or networks to identify vulnerabilities.', 'Using automated tools to detect open ports on a server.'],
              ['Sniffing', 'Monitoring network traffic to capture sensitive information.', 'Capturing login details on unsecured public Wi-Fi.'],
              ['Keylogger', 'A tool that records every keystroke typed on a device.', "Recording a victim's banking password as they type."],
              ['Spam', 'Unwanted bulk electronic messages, often for advertising or malicious purposes.', 'Receiving hundreds of unsolicited promotional emails.'],
              ['Login Attack', 'Automated attempts to guess usernames and passwords.', 'Trying thousands of password combinations to access an account.'],
              ['Account Takeover (ATO)', "Unauthorized access to someone's legitimate account.", 'Hackers accessing a social media account and changing the password.'],
              ['Phishing', 'Fraudulent communication pretending to be from a trusted source.', 'An email pretending to be from a bank requesting login details.'],
              ['Spear Phishing', 'Targeted phishing aimed at a specific individual or organization.', 'An email sent to a CEO pretending to be a board member.'],
              ['Social Engineering', 'Manipulating individuals into revealing confidential information.', 'A caller pretending to be IT support asking for credentials.'],
              ['Incendiary Speech', 'Harmful or discriminatory speech intended to incite hostility.', 'Online posts targeting a group with harmful statements.'],
              ['Denial of Service (DoS/DDoS)', 'Flooding a system with traffic to make it unavailable.', 'Overloading an e-commerce website during peak sales.'],
              ['Advanced Persistent Threat (APT)', 'A long-term targeted cyberattack where attackers remain undetected.', 'Attackers secretly monitoring a government network for months.'],
              ['Zero-Day Vulnerability', 'A newly discovered software flaw exploited before a fix is released.', 'Hackers exploiting a new OS weakness before patching.'],
            ],
          },
          {
            type: 'text',
            heading: 'How to Protect the System from Adversarial Attacks',
            text: 'This question aims to prepare you for the fact that, in the same way that no modern computer system can be absolutely assured, there is no fail-safe way to protect an AI or ML system. Research into defending ML tools is ongoing. Responses to this question should acknowledge this fact and take a systems-security approach for reducing the risk and the impact of attacks to acceptable levels. Three important examples of such protection include the following:',
          },
          {
            type: 'bullets',
            items: [
              'robustness in the integrity of the tool as well as the protection of confidentiality;',
              'resilience against attacks during training and classification; and',
              'evidence that the input data is reliable and representative.',
            ],
          },
          {
            type: 'text',
            text: 'ML tools contain well-known vulnerabilities, many of which are susceptible to adversary manipulation. As a poignant example of attacks against ML tools, consider the case of self-driving cars. Such cars use ML tools to identify street signs, among other things. By intentionally manipulating a small section of a stop sign with a purpose-designed sticker, an adversary can make these operational ML tools reliably misclassify a stop sign as a 45-mile-per-hour speed limit sign.',
          },
          {
            type: 'text',
            text: 'Adversaries constantly expose cybersecurity tools to input that is likely less obvious to an analyst than a sticker on a traffic-control sign. Therefore, any cybersecurity system you implement using ML tools should take these threats seriously.',
          },
          {
            type: 'text',
            text: 'To prepare for such possible manipulation, you should ask the developers and suppliers you are working with how the design and deployment of the ML tool protect against well-known attacks. This is not an',
          },
          {
            type: 'note',
            text: 'The sentence above breaks off mid-page: printed page 9 is missing from the scanned handout, so the rest of this section is not recorded here.',
          },
          {
            type: 'termlist',
            heading: 'Activity 1: Threat Identification from Logs',
            items: [
              { term: 'Which patterns may indicate scanning activity?', def: 'Repeated SYN packets without completed handshakes; multiple connection attempts to different ports in a short time, from the same IP address' },
              { term: 'Which patterns suggest a brute-force login attempt?', def: 'A high frequency of authentication requests; attempts across many usernames from a single source' },
              { term: 'Which features would you extract to train an ML model to detect DDoS attacks?', def: 'Packet rate; source IP entropy; number of destination ports; SYN-to-ACK ratio' },
            ],
          },
          {
            type: 'table',
            heading: 'Activity 2: Threat Classification Mapping',
            headers: ['Threat Type', 'Main Target'],
            rows: [
              ['Ransomware', 'Files and data'],
              ['Phishing', 'Individuals'],
              ['Botnet', 'Computers'],
              ['Spyware', 'User data'],
              ['DoS', 'Services and network availability'],
            ],
          },
        ],
      },
      {
        number: '6',
        title: "The Cyber Attacker's Economy",
        sections: [
          {
            type: 'definition',
            text: 'Cybersecurity is not only a technical battle but also an economic one. Modern cybercrime operates within a structured financial ecosystem where monetary gain is the primary motivation. Understanding attacker incentives helps security professionals design stronger detection and prevention systems.',
          },
          {
            type: 'text',
            heading: 'From Reputation to Revenue',
            text: 'Early cyber-attacks were often motivated by curiosity, mischief, or reputation within hacker communities. Today, most cyber-attacks are financially motivated. Modern attackers target:',
          },
          {
            type: 'bullets',
            items: [
              'Online payment platforms',
              'Financial institutions',
              'Gift card systems',
              'Cryptocurrency wallets',
              'E-commerce platforms',
              'Identity databases',
            ],
          },
          {
            type: 'text',
            heading: 'Marketplace for Hacking Skills',
            text: 'The commoditization of hacking has lowered the barrier to entry. Darknet marketplaces sell exploits, malware kits, stolen credentials, and even subscription-based hacking services.',
          },
          {
            type: 'text',
            heading: 'Zero-Day Vulnerability Markets',
            text: 'Zero-day vulnerabilities are unknown software weaknesses that can be sold legally through bug bounty programs or illegally in underground markets. Selling exploits often provides faster and lower-risk financial returns than directly launching attacks.',
          },
          {
            type: 'note',
            heading: 'Activities',
            text: 'The handout prints the questions below with blank answer lines for you to fill in. The answers that follow each set are worked answers, not the lecturer\'s.',
          },
          {
            type: 'casestudy',
            heading: 'Activity 1: Economic Motivation Analysis',
            tasks: [
              'Why have cyber-attacks shifted from reputation-based motivations to monetary motivations?',
              'Why might attackers avoid large financial institutions despite high potential reward?',
              'Explain how weaker organizations become attractive targets in the attacker economy.',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Why the shift to monetary motivations?', def: 'The rise of e-commerce, cryptocurrency, and organised cybercrime markets made data and access directly convertible to cash, turning attacks into a business rather than a hobby' },
              { term: 'Why avoid large financial institutions?', def: 'Large institutions invest heavily in security — SOC teams for detection, encryption, regulatory compliance — making attacks costly and risky to execute' },
              { term: 'Why weaker organisations become targets', def: 'Small businesses often have limited security budgets, no dedicated IT/security staff, and outdated systems' },
            ],
          },
          {
            type: 'table',
            heading: 'Activity 2: Attack Supply Chain Mapping',
            headers: ['Role in Ecosystem', 'Description'],
            rows: [
              ['Vulnerability Researcher', 'Finds and documents unpatched security flaws'],
              ['Exploit Developer', 'Writes code that weaponizes a discovered flaw into a usable attack'],
              ['Malware Distributor', 'Spreads the malware to victims via phishing, infected downloads, or botnets'],
            ],
          },
          {
            type: 'note',
            text: 'The handout\'s table runs on past Malware Distributor onto printed page 13, which is missing from the scan. The case scenario that Activity 2 goes on to ask about, and its first question, are on that same missing page — the two questions below are printed on page 14.',
          },
          {
            type: 'casestudy',
            tasks: [
              'What economic incentive might motivate the attacker?',
              'Which machine learning approach would you recommend? (Supervised, Anomaly Detection, Hybrid) Explain your choice.',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Economic incentive', def: 'Stored payment data, or ransom potential from disrupting a business that cannot afford downtime' },
              { term: 'ML approach', def: 'A hybrid: supervised learning catches known attack patterns effectively, while anomaly detection catches unknown attacks that do not match existing signatures' },
            ],
          },
          {
            type: 'casestudy',
            heading: 'Activity',
            tasks: [
              'How does understanding attacker economics improve defensive strategy design?',
              'Why is cybersecurity considered an adversarial machine learning problem?',
              'In what ways does the underground marketplace accelerate threat evolution?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'How attacker economics improves defensive design', def: 'Knowing what makes a target profitable (weak security, valuable data) helps a defender prioritise protecting the most attractive assets first' },
              { term: 'Why cybersecurity is an adversarial ML problem', def: 'Unlike static datasets, the data is generated by an intelligent opponent actively adapting to evade detection' },
              { term: 'How the underground marketplace accelerates threats', def: 'Attackers buy, sell, and share tools and techniques instantly, so improvements spread across the criminal community faster than defenders can respond' },
            ],
          },
        ],
      },
      {
        number: '7',
        title: 'Machine Learning for Data Security',
        sections: [
          {
            type: 'text',
            heading: 'Machine Learning',
            text: 'Machine learning refers to a set of mathematical and statistical techniques that enable computer systems to:',
          },
          {
            type: 'bullets',
            items: [
              'Learn patterns from historical data.',
              'Generalize beyond observed examples.',
              'Predict future outcomes.',
              'Identify similarities and differences.',
              'Detect anomalies.',
            ],
          },
          {
            type: 'text',
            text: 'At its core, machine learning transforms raw data into meaningful insights through pattern discovery and inference. Since the beginning of the technological age, researchers have aimed to design computer systems capable of reasoning, generalizing, and making intelligent decisions from complex data. Machine learning (ML) is one of the primary approaches used to achieve this goal. Machine learning allows systems to analyze vast amounts of data such as network traffic. It learns from historical data and uses that knowledge to make predictions about new and unseen events. It is subdivided into supervised and unsupervised learning.',
          },
          {
            type: 'text',
            heading: 'Types of Machine Learning',
            text: 'Machine learning methods are categorized into two families:',
          },
          {
            type: 'text',
            heading: 'Supervised Learning',
            text: 'In supervised learning:',
          },
          {
            type: 'bullets',
            items: [
              'The dataset includes labeled examples.',
              'The algorithm learns from known input and output pairs.',
              'The goal is to predict labels for new data.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Applications in Security',
            items: [
              'Spam detection.',
              'Malware classification.',
              'Phishing detection.',
              'Malicious URL detection.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Tasks',
            items: [
              'Classification (e.g., spam vs. legitimate).',
              'Regression (predicting numerical values such as risk scores).',
            ],
          },
          {
            type: 'text',
            heading: 'Unsupervised Learning',
            text: 'In unsupervised learning:',
          },
          {
            type: 'bullets',
            items: [
              'Data is unlabeled.',
              'The algorithm identifies hidden structures or patterns.',
              'It groups data or detects deviations from normal behavior.',
            ],
          },
          {
            type: 'text',
            heading: 'Uses of Machine Learning in Data Security',
            text: 'Machine learning applications in security generally fall into two categories:',
          },
          {
            type: 'text',
            heading: 'i. Pattern Recognition',
            text: 'Pattern recognition focuses on identifying known characteristics within data. Examples:',
          },
          {
            type: 'bullets',
            items: [
              'Spam detection.',
              'Malware detection.',
              'Botnet detection.',
              'Phishing classification.',
            ],
          },
          {
            type: 'text',
            text: 'In these cases, malicious activity exhibits recognizable features that can be learned.',
          },
          {
            type: 'text',
            heading: 'ii. Anomaly Detection',
            text: 'Anomaly detection defines normal behavior and flagging deviations. E.g.',
          },
          {
            type: 'bullets',
            items: [
              'Network outlier detection.',
              'Insider threat detection.',
              'Access control anomaly detection.',
              'Behavioral monitoring.',
            ],
          },
          {
            type: 'text',
            text: 'Unlike pattern recognition, anomaly detection does not require explicit malicious examples. Instead, it models normal activity and flags deviations.',
          },
          {
            type: 'note',
            text: 'There may be infinitely many anomalous patterns, including those never observed during training. This makes anomaly detection powerful but also prone to false positives if not carefully designed.',
          },
          {
            type: 'text',
            heading: 'Access Control and Behavioral Intelligence in Big Data',
            text: 'Traditional rule-based access control systems are rigid and inflexible. Machine learning enhances access control by:',
          },
          {
            type: 'bullets',
            items: [
              'Learning typical user access patterns.',
              'Identifying abnormal behavior.',
              'Providing adaptive responses.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Example scenario',
            items: [
              'In a hospital:',
              'Nurses access individual patient records.',
              'Doctors query multiple patient records for diagnosis.',
              'An ML system can detect abnormal access patterns without blocking legitimate rare events.',
            ],
          },
          {
            type: 'note',
            text: 'The handout prints the two activities below with blank answer lines. The answers under each are worked answers, not the lecturer\'s.',
          },
          {
            type: 'casestudy',
            heading: 'Activity: Machine Learning Application',
            tasks: [
              'Which threats are best suited for supervised learning detection models? Why?',
              'Which threats may require anomaly detection (unsupervised learning)? Why?',
              'What challenges make cybersecurity data different from standard ML datasets?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Best suited to supervised learning', def: 'Well-labeled threats such as phishing, malware and spam — there is plenty of historical labeled data to train on' },
              { term: 'Requiring anomaly detection', def: 'Zero-day attacks, insider threats and unusual network behaviour, where no prior labeled examples exist' },
              { term: 'What makes cybersecurity data different', def: 'Attacks are rare compared with normal traffic; patterns constantly evolve; adversaries actively try to evade detection; and labeled attack data is scarce and sensitive' },
            ],
          },
          {
            type: 'casestudy',
            heading: 'Activity',
            tasks: [
              'Why is it important to understand attacker motivations before designing detection systems?',
              'How does the adversarial nature of cybersecurity affect machine learning model design?',
              'Why are zero-day vulnerabilities difficult to detect using signature-based systems?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Why attacker motivations matter first', def: 'Motivation predicts behaviour — a financially driven attacker goes after payment data and credentials, while an espionage actor goes after long, quiet access. Knowing which you face tells you which assets to instrument, what normal looks like around them, and which detections are worth the false positives' },
              { term: 'How the adversarial setting changes model design', def: 'The data is produced by an opponent who watches your defences and adapts. Models must therefore be retrained continuously, be robust to deliberately crafted inputs, and avoid relying on features an attacker can cheaply change' },
              { term: 'Why signatures miss zero-days', def: 'A signature can only match something already seen and catalogued. A zero-day is by definition unseen, so no signature exists for it — which is why behavioural and anomaly-based detection is needed alongside signatures' },
            ],
          },
        ],
      },
      {
        number: '8',
        title: 'Supervised Learning for Data Security',
        sections: [
          {
            type: 'definition',
            text: 'Supervised learning trains a model using a labeled dataset, where every input example, xᵢ, is paired with its correct output label yᵢ. The goal is to learn a mapping function f: x → y that generalizes well to unseen data. In network security, this approach is widely applied to classification tasks, such as distinguishing benign from malicious network traffic (e.g., intrusion detection), spam vs. non-spam emails, or normal and anomalous behavior.',
          },
          {
            type: 'text',
            text: 'The model minimizes a loss function that measures the difference between predicted outputs and true labels. Common loss functions include:',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Binary cross-entropy (for binary classification) is expressed in Equation:\n  L(y, ŷ) = −[ y log(ŷ) + (1 − y) log(1 − ŷ) ]\n\nCategorical cross-entropy (for multi-class) is expressed in Equation:\n  L(y, ŷ) = − Σ(c=1 to C) y_c log(ŷ_c)',
          },
          {
            type: 'text',
            text: 'Training typically uses optimization algorithms like gradient descent or its variants (e.g., Adam, SGD with momentum). Below are three popular supervised algorithms frequently used in network security, along with their core ideas, key equations, and typical training procedures.',
          },
          {
            type: 'text',
            heading: 'Decision Trees (DT)',
            text: 'Decision trees build a tree-like model where internal nodes represent feature tests, branches represent outcomes, and leaf nodes represent class labels (or probability distributions). They are interpretable, handle mixed data types well, and require little preprocessing, making them popular for initial IDS prototyping.',
          },
          {
            type: 'bullets',
            heading: 'Key algorithm (CART — Classification and Regression Trees)',
            items: ['Recursively split the data to maximize purity in child nodes.'],
          },
          {
            type: 'code',
            heading: 'Common splitting criterion (for classification)',
            language: 'math',
            code: 'Gini impurity is expressed in Equation:\n  Gini(t) = 1 − Σᵢ₌₁..ₖ pᵢ²\n  where pᵢ is the proportion of class i at node t.\n\nOr Information Gain using entropy:\n  Entropy(S) = − Σᵢ₌₁..ₖ pᵢ log₂(pᵢ)\n  Gain(S, A) = Entropy(S) − Σ over v ∈ Values(A) of (|Sᵥ| / |S|) · Entropy(Sᵥ)',
          },
          {
            type: 'bullets',
            heading: 'Training procedure (greedy recursive partitioning)',
            items: [
              'Start at root with full dataset.',
              'For each feature and possible split point, compute impurity reduction.',
              'Choose the split that maximizes gain (or minimizes weighted child impurity).',
              'Repeat until stopping criteria (max depth, min samples per leaf, min impurity decrease, etc.).',
              'Assign majority class (or probability) to each leaf.',
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/decision-tree.webp',
            width: 1800, height: 640,
            alt: 'A decision tree headed Root Node (Initial Split), branching on Income <= $75,000 and Income > $75,000, then on <= 4 family members and > 4 family members, then on <= 12 years of education and > 12 years of education, ending in leaves labelled Purchaser and Non-Purchaser',
            caption: 'Hypothetical Classification Tree (redrawn from the handout, printed page 20)',
          },
          {
            type: 'text',
            text: 'In network security, features might include packet size, inter-arrival time, source/destination ports, flags, etc., with leaves predicting "normal" or specific attack types.',
          },
          {
            type: 'text',
            heading: 'Support Vector Machines (SVM)',
            text: 'SVMs aim to find the optimal hyperplane that separates classes with the maximum margin. They are effective for high-dimensional data and remain popular in intrusion detection due to good generalization with relatively small labeled datasets.',
          },
          {
            type: 'code',
            heading: 'Core idea (hard-margin SVM — linearly separable case)',
            language: 'math',
            code: 'Find w and b such that:\n  yᵢ (wᵀ xᵢ + b) ≥ 1 ∀i\n\nMaximize margin 2/‖w‖ → equivalent to minimizing ½‖w‖².',
          },
          {
            type: 'code',
            heading: 'Soft-margin SVM (realistic case with slack variables)',
            language: 'math',
            code: 'Minimize:  ½‖w‖² + C Σ(i=1 to n) ξᵢ\n\nsubject to:  yᵢ (wᵀ xᵢ + b) ≥ 1 − ξᵢ, ξᵢ ≥ 0\n\nC controls the trade-off between margin maximization\nand classification error.',
          },
          {
            type: 'code',
            heading: 'Prediction function',
            language: 'math',
            code: 'f(x) = sign(wᵀx + b)',
          },
          {
            type: 'code',
            heading: 'Kernel trick (for non-linear separation)',
            language: 'math',
            code: 'Replace xᵢᵀxⱼ with kernel K(xᵢ, xⱼ)\n(e.g., RBF: K(xᵢ, xⱼ) = exp(−γ ‖xᵢ − xⱼ‖²)).',
          },
          {
            type: 'text',
            text: 'Here are representative SVM diagrams showing the hyperplane and margin:',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/svm-candidates.webp',
            width: 1500, height: 820,
            maxWidth: 720,
            alt: 'A cloud of two kinds of point on unlabelled axes, cut by three thick straight boundaries that meet at a single junction, dividing the plane into three regions. A callout box reading "Hyperplanes that Best Separates Different Classes" points to where the boundaries meet',
            caption: 'Support Vector Machines (SVM) — hyperplanes that best separate different classes (redrawn from printed page 22)',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/svm-margin.webp',
            width: 1500, height: 900,
            maxWidth: 720,
            alt: 'On X1 and X2 axes, a solid maximum margin hyperplane with a dashed positive hyperplane above right and a dashed negative hyperplane below left. Diamonds lie beyond the positive hyperplane and circles beyond the negative one; the two points sitting on the dashed planes are labelled the support vectors, and the band between the solid line and the positive hyperplane is labelled the maximum margin',
            caption: 'The maximum margin hyperplane, with the positive and negative hyperplanes either side (redrawn from printed page 22)',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/svm-decision-boundary.webp',
            width: 1500, height: 880,
            maxWidth: 720,
            alt: 'On x1 and x2 axes, three parallel lines: a thin solid hyperplane for the first class on the left, a thick dashed decision boundary in the middle, and a thin solid hyperplane for the second class on the right. Circles lie left of the boundary and squares right of it; three points on the outer planes are ringed as support vectors, and a double-headed arrow between the first-class hyperplane and the decision boundary is labelled the margin',
            caption: 'The same picture named differently — decision boundary, one hyperplane per class, and the margin between them (redrawn from printed page 23)',
          },
          {
            type: 'text',
            heading: 'Neural Networks (Feedforward / Multi-Layer Perceptron)',
            text: 'Feedforward neural networks consist of an input layer, one or more hidden layers, and an output layer. They excel at learning complex, non-linear patterns for modern network intrusion detection systems, especially with large traffic datasets.',
          },
          {
            type: 'code',
            heading: 'Forward pass (single neuron)',
            language: 'math',
            code: 'z = wᵀx + b   a = σ(z)\n\nCommon activations σ: ReLU (max (0, z)), sigmoid, tanh.',
          },
          {
            type: 'code',
            heading: 'Overall model (L-layer network)',
            language: 'math',
            code: 'a⁽ˡ⁾ = σ⁽ˡ⁾( W⁽ˡ⁾ a⁽ˡ⁻¹⁾ + b⁽ˡ⁾ )   l = 1, …, L',
          },
          {
            type: 'text',
            heading: 'Loss + backpropagation',
            text: 'Minimize empirical risk (e.g., cross-entropy) using gradient descent. Gradients computed via chain rule → backpropagation algorithm.',
          },
          {
            type: 'bullets',
            heading: 'Typical training loop',
            items: [
              'Forward pass — compute predictions and loss.',
              'Backward pass — compute gradients ∂L/∂W⁽ˡ⁾, ∂L/∂b⁽ˡ⁾.',
              'Update parameters: W ← W − η ∂L/∂W (or using Adam, etc.).',
            ],
          },
          {
            type: 'text',
            text: 'These models are effective in network security when combined with feature engineering, autoencoders for anomaly-detection preprocessing, or modern variants (CNNs, LSTMs, Transformers) for traffic-sequence analysis. Each method has trade-offs: decision trees offer interpretability, SVMs provide strong theoretical guarantees in high dimensions, and neural networks deliver top performance on large/complex datasets. In practice, many real-world IDS/IPS systems ensemble them or use deep learning hybrids.',
          },
        ],
      },
      {
        number: '9',
        title: 'Practical Activities',
        sections: [
          {
            type: 'text',
            text: 'This practical manual contains activities designed to help students understand how machine learning algorithms are applied in network intrusion detection systems (IDS). The exercises combine discussion, manual calculations, and coding practice.',
          },
          {
            type: 'text',
            heading: 'Objective',
            text: 'To help students understand the strengths and weaknesses of different machine learning algorithms when applied to real network security problems.',
          },
          {
            type: 'text',
            heading: 'Scenario',
            text: 'You are designing an Intrusion Detection System (IDS) that analyzes the following network traffic features:',
          },
          {
            type: 'bullets',
            items: [
              'Packet size.',
              'Source and destination IP address.',
              'Source and destination port.',
              'TCP flags (e.g., SYN).',
              'TTL (Time To Live).',
              'Packet inter-arrival time.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Task',
            items: [
              'Divide students into small groups.',
              'Assign each group one algorithm: Decision Tree; Support Vector Machine (SVM); Neural Network (MLP).',
              'Each group should discuss and answer the following questions:',
            ],
          },
          {
            type: 'casestudy',
            tasks: [
              'What are three advantages of the algorithm for IDS?',
              'What are three disadvantages?',
              'How could overfitting occur when detecting network attacks?',
              'What techniques could reduce overfitting?',
            ],
          },
          {
            type: 'note',
            text: 'The handout gives each group one algorithm. All three are answered below so you can revise the whole comparison; these are worked answers, not the lecturer\'s.',
          },
          {
            type: 'table',
            headers: ['Algorithm', 'Three advantages for IDS', 'Three disadvantages'],
            rows: [
              ['Decision Tree', 'Interpretable — an analyst can read the rule that fired and defend it in an incident report; handles the mixed feature types here (packet size and TTL alongside TCP flags) with no preprocessing; fast to train and fast enough to predict at line rate', 'Overfits readily, worst of all on high-cardinality features like port or IP; a small change in the training capture can restructure the whole tree; axis-parallel splits can only approximate a diagonal relationship, such as packet rate against entropy, as a staircase'],
              ['Support Vector Machine', 'Generalises well from a relatively small labelled capture, which is what a university network can realistically produce; the kernel trick separates classes no straight line can divide; the boundary depends only on the support vectors, so the bulk of ordinary traffic cannot drag it around', 'Training cost grows roughly with the square of the sample count, so a full day of capture is impractical; it outputs a signed distance rather than a probability, so ranking alerts by confidence needs extra calibration; features must be scaled first and C and gamma both have to be tuned'],
              ['Neural Network (MLP)', 'Learns the non-linear combinations of packet size, TTL and inter-arrival time that mark an attack without being told which to combine; scales to the traffic volume a campus actually generates; extends naturally to sequence models when an attack is spread over time', 'Needs a large labelled dataset, and labelled attack traffic is exactly what is scarce; a decision cannot be explained to an incident-response team; expensive to train and sensitive to architecture and learning-rate choices'],
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'How overfitting arises here', def: 'The model learns the capture instead of the attack. The IP address features are the worst offenders: a tree that splits on a specific source address scores perfectly on the capture and detects nothing once the attacker moves host. Port numbers and TTL do the same more quietly. And because benign traffic outnumbers attacks heavily, a model can report high accuracy while missing every intrusion in the set' },
              { term: 'Techniques that reduce it', def: 'Drop or generalise identifier-like features — bucket ports into ranges instead of splitting on one number, and prefer behavioural features (packet rate, byte entropy, SYN-to-ACK ratio) that an attacker cannot change for free. Constrain the model: maximum depth, minimum samples per leaf and minimum impurity decrease for trees; L2 or dropout for the MLP; a smaller C for the SVM. Validate on traffic captured on a different day, cross-validate rather than trusting one split, and balance or reweight the classes so the rare attack still counts' },
            ],
          },
          {
            type: 'casestudy',
            heading: 'Which model is suitable for',
            tasks: [
              'A small labeled dataset from a university network',
              'A massive real-time traffic dataset',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Small labelled dataset from a university network', def: 'Support Vector Machine. The theory section states that SVMs generalise well from relatively small labelled datasets, and because the margin is fixed by a handful of support vectors, a few hundred labelled flows can still place a usable boundary. A pruned decision tree is the sensible second choice where the analyst has to be able to read the rule' },
              { term: 'Massive real-time traffic dataset', def: 'Neural network. The theory section puts its best performance on large and complex datasets, and once trained it predicts cheaply, which is what real time depends on. Note what the practicals do at that scale: they switch from the kernel SVM to LinearSVC for precisely this reason, because kernel training does not scale' },
            ],
          },
          {
            type: 'table',
            heading: 'PRACTICAL 2: Decision Tree Construction — Dataset',
            headers: ['Packet', 'Packet Size', 'Src Port < 1024', 'SYN Flag', 'Label'],
            rows: [
              ['1', '60', 'Yes', '1', 'Malicious'],
              ['2', '1500', 'No', '0', 'Benign'],
              ['3', '55', 'Yes', '1', 'Malicious'],
              ['4', '1400', 'No', '0', 'Benign'],
              ['5', '70', 'Yes', '0', 'Benign'],
              ['6', '65', 'Yes', '1', 'Malicious'],
            ],
          },
          {
            type: 'code',
            heading: 'Step 1: Calculate Root Gini Impurity',
            language: 'math',
            code: 'Formula:\n  Gini = 1 − ( P²_malicious + P²_benign )\n\nNumber of malicious packets = 3.\nNumber of benign packets = 3.\nP_malicious = 3/6 = 0.5.\nP_benign = 3/6 = 0.5.\n\nGini = 1 − (0.5² + 0.5²)\nGini = 0.5',
          },
          {
            type: 'text',
            text: 'The SYN flag is a control bit in the Transmission Control Protocol header that is used to start a connection between two computers on a network. "SYN" stands for Synchronize. It is mainly used during the initial stage of communication to synchronize sequence numbers between the sender and receiver.',
          },
          {
            type: 'text',
            heading: 'Function of SYN Flag',
            text: 'The SYN flag is used to initiate a TCP connection before data transmission begins. It tells the receiving device that the sender wants to start a communication session.',
          },
          {
            type: 'text',
            heading: 'TCP Three-Way Handshake',
            text: 'The SYN flag is part of the three-way handshake, which establishes a reliable TCP connection.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Step 1: SYN — Client → Server', def: 'The client sends a packet with SYN = 1. This means "I want to start a connection."' },
              { term: 'Step 2: SYN-ACK — Server → Client', def: 'The server replies with SYN = 1 and ACK = 1. Meaning "Connection request received."' },
              { term: 'Step 3: ACK — Client → Server', def: 'The client sends ACK = 1. The connection is now established.' },
            ],
          },
          {
            type: 'code',
            heading: 'Step 2: Split Using SYN Flag (The SYN flag is used to initiate a TCP connection before data transmission begins. It tells the receiving device that the sender wants to start a communication session).',
            language: 'math',
            code: 'If SYN = 1\n  All packets → Malicious.\n  Gini = 0.\n\nIf SYN = 0\n  All packets → Benign.\n  Gini = 0.\n\nThis produces a perfect split.\n\nFinal Decision Rule:\n  IF SYN_Flag = 1 → Malicious ELSE → Benign\n\nTraining Accuracy:\n  Accuracy = 6/6 = 100%',
          },
          {
            type: 'casestudy',
            heading: 'Discussion Question',
            prompt: 'Why might this tree overfit real network traffic data, and how could pruning improve generalization?',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Why the tree overfits', def: 'It was fitted on six packets and one feature. SYN = 1 happened to coincide with Malicious in all three malicious rows, so the split reaches Gini 0 on both sides and 100% training accuracy — but that accuracy is a property of those six rows, not of network traffic. Every normal TCP connection opens with SYN = 1, so on real traffic this rule flags the whole handshake volume of the network as malicious, and it detects nothing that is not a SYN flood' },
              { term: 'What the tree cannot know', def: 'Packet size splits the same six rows just as perfectly — any threshold between 65 and 70 bytes separates the malicious 55, 60 and 65 from the benign 70, 1400 and 1500. With six rows there is no way to tell which of several perfect splits reflects the real signal, so the tree simply takes the first one it evaluates' },
              { term: 'How pruning improves generalisation', def: 'Pre-pruning stops the tree before it can memorise: cap the maximum depth, require a minimum number of samples per leaf, and require a minimum impurity decrease before a split is accepted. Post-pruning grows the tree first, then collapses any branch whose removal does not hurt performance on held-out data. Either way only the splits that survive on unseen packets are kept, and a leaf that is 60% confident over many samples is worth more than one that is perfect over two' },
            ],
          },
          {
            type: 'text',
            heading: 'Practical Question 3: Support Vector Machine (SVM) for Malicious Traffic Detection',
            text: 'To use Support Vector Machine (SVM) to classify network traffic as Benign or Malicious using a simple dataset.',
          },
          {
            type: 'table',
            headers: ['Packet', 'Packet Rate', 'Byte Entropy', 'SYN Flag', 'Label'],
            rows: [
              ['1', '12', '0.30', '0', 'Benign'],
              ['2', '15', '0.35', '0', 'Benign'],
              ['3', '18', '0.40', '0', 'Benign'],
              ['4', '40', '0.85', '1', 'Malicious'],
              ['5', '45', '0.90', '1', 'Malicious'],
              ['6', '50', '0.95', '1', 'Malicious'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Where',
            items: [
              { term: 'Packet Rate', def: 'number of packets per second.' },
              { term: 'Byte Entropy', def: 'randomness in packet data.' },
              { term: 'SYN Flag', def: 'indicates connection request.' },
              { term: 'Label', def: 'traffic type.' },
            ],
          },
          {
            type: 'text',
            heading: 'Practical Tasks — Question 1',
            text: 'Convert the labels: Benign → 0. Malicious → 1.',
          },
          {
            type: 'table',
            headers: ['Packet', 'Packet Rate', 'Byte Entropy', 'SYN Flag', 'Label', 'Converted Label'],
            rows: [
              ['1', '12', '0.30', '0', 'Benign', '0'],
              ['2', '15', '0.35', '0', 'Benign', '0'],
              ['3', '18', '0.40', '0', 'Benign', '0'],
              ['4', '40', '0.85', '1', 'Malicious', '1'],
              ['5', '45', '0.90', '1', 'Malicious', '1'],
              ['6', '50', '0.95', '1', 'Malicious', '1'],
            ],
          },
        ],
      },
      {
        number: '10',
        title: 'Unsupervised, Reinforcement and Deep Learning',
        sections: [
          {
            type: 'definition',
            heading: 'Unsupervised Learning',
            text: 'Unsupervised learning involves training a model on data without labeled responses. The model tries to learn the underlying structure of the data by identifying patterns and relationships.',
          },
          {
            type: 'text',
            heading: 'Clustering Algorithms',
            text: 'Clustering algorithms, such as k-means and hierarchical clustering, group similar data points together. In network security, clustering can be used to identify groups of similar network behaviors, which can help in detecting abnormal activities. For example, clustering can be used to group similar login attempts and identify outliers that may indicate unauthorized access attempts.',
          },
          {
            type: 'text',
            heading: 'Anomaly Detection',
            text: 'Anomaly detection involves identifying data points that deviate significantly from the majority of the data. Techniques such as Gaussian Mixture Models (GMM) and Principal Component Analysis (PCA) are commonly used for this purpose. In network security, anomaly detection can be used to identify unusual network traffic patterns that may indicate a security breach.',
          },
          {
            type: 'definition',
            heading: 'Reinforcement Learning',
            text: 'Reinforcement learning involves training a model to make a sequence of decisions by learning from the consequences of its actions. The model receives rewards for desired behaviors and penalties for undesired ones, optimizing its actions over time.',
          },
          {
            type: 'text',
            heading: 'Markov Decision Processes (MDP)',
            text: 'MDPs provide a mathematical framework for modeling decision-making in situations where outcomes are partly random and partly under the control of the decision-maker. In network security, reinforcement learning can be used to develop adaptive security policies that respond to evolving threats. For example, a reinforcement learning model could be trained to dynamically adjust firewall rules based on detected threats, optimizing the balance between security and network performance.',
          },
          {
            type: 'definition',
            heading: 'Deep Learning',
            text: 'Deep learning, a subset of ML, involves neural networks with many layers (deep neural networks) that can model complex patterns in data. Deep learning techniques are particularly effective for tasks that involve high-dimensional data, such as image and speech recognition.',
          },
          {
            type: 'text',
            heading: 'Convolutional Neural Networks (CNNs)',
            text: 'CNNs are specialized neural networks designed to process grid-like data, such as images. In network security, CNNs can be used to analyze network traffic data represented as images, identifying patterns indicative of malicious activity. For instance, CNNs can be applied to detect malware by analyzing the binary code of executable files.',
          },
          {
            type: 'text',
            heading: 'Recurrent Neural Networks (RNNs)',
            text: 'RNNs are designed to handle sequential data, making them suitable for tasks like time-series analysis. In network security, RNNs can be used to detect anomalies in network traffic over time, identifying patterns that indicate ongoing attacks or data exfiltration attempts. By employing these AI/ML techniques, network security systems can achieve higher accuracy in threat detection and response, ultimately enhancing the overall security posture of organizations. The integration of AI/ML into network security not only improves the ability to detect and mitigate threats but also enables proactive defense mechanisms that adapt to the evolving threat landscape.',
          },
        ],
      },
      {
        number: '11',
        title: 'Detection and Mitigation of Threats in Big Data',
        sections: [
          {
            type: 'text',
            text: 'The application of AI and ML in network security has fundamentally transformed the approach to detecting and mitigating network threats. These technologies enable the analysis of vast amounts of network data in real-time, providing enhanced capabilities for identifying and responding to potential threats more effectively and efficiently than traditional methods.',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/ml-detection-pipeline.webp',
            width: 1000, height: 1294,
            maxWidth: 620,
            alt: 'A six-stage pipeline: data collection from network traffic, data preprocessing (cleansing and feature extraction), model training with neural networks, decision trees and SVM, real-time monitoring and detection (baseline behavior, anomaly detection), threat identification and mitigation (pattern recognition, predictive modeling), then automated response such as blocking IPs and isolating devices',
            caption: 'Figure 5: The ML threat-detection pipeline, from raw traffic to automated response',
          },
          {
            type: 'text',
            heading: 'Anomaly Detection',
            text: 'AI and ML models excel at detecting anomalies in network traffic by identifying deviations from established norms. This process involves several key steps:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Baseline Behavior Modeling', def: 'AI/ML systems first establish a baseline of normal network behavior by analyzing historical data. This involves understanding what constitutes regular traffic, user activities, and system operations. For instance, machine learning models can observe typical login times, frequency of data access, and common communication patterns to create a comprehensive profile of normal activities.' },
              { term: 'Real-Time Monitoring', def: 'Once the baseline is established, the system continuously monitors network traffic and activities in real-time. Any deviations from the established baseline are flagged as potential anomalies. Techniques such as statistical analysis, clustering, and neural networks are commonly used. For example, a sudden spike in data transfer volume or an unusual login time can trigger an alert for further investigation.' },
              { term: 'Contextual Analysis', def: 'Advanced AI/ML systems also incorporate contextual data to improve anomaly detection. For instance, user behavior analytics (UBA) can differentiate between normal activities and suspicious actions based on the context, such as time of day, location, and user role. By analyzing this contextual information, AI/ML models can more accurately identify genuine threats and reduce false positives.' },
            ],
          },
          {
            type: 'text',
            heading: 'Threat Identification',
            text: 'AI and ML models are trained to recognize patterns associated with known threats and can identify new, previously unseen threats through behavioral analysis.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Pattern Recognition', def: 'AI/ML models are trained to recognize patterns associated with known threats. For example, signature-based detection systems use predefined patterns of known malware to identify threats. Machine learning enhances this by identifying variations and new patterns that signature-based systems might miss. For instance, machine learning models can detect polymorphic malware that frequently changes its code to evade traditional signature-based detection.' },
              { term: 'Behavioral Analysis', def: "Instead of relying solely on known patterns, AI/ML can analyze the behavior of entities within the network. For example, an increase in failed login attempts, unusual data transfers, or unexpected communication patterns can trigger alerts. This is particularly useful for detecting zero-day attacks and advanced persistent threats (APTs), where the attacker's behavior may deviate from normal user activities." },
            ],
          },
          {
            type: 'text',
            heading: 'Predictive Analytics',
            text: 'AI and ML can predict potential threats by analyzing trends and historical data, enabling proactive measures.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Predictive Modeling', def: 'AI/ML can predict potential threats by analyzing trends and historical data. Predictive models can identify vulnerabilities and anticipate future attacks, enabling proactive measures. For instance, time-series analysis can forecast potential DDoS attacks by identifying patterns in traffic volume and alerting administrators to take preventive actions.' },
              { term: 'Risk Assessment', def: 'AI/ML systems can assess the risk associated with different types of threats. By evaluating the potential impact and likelihood of various threats, these systems can prioritize responses and allocate resources effectively. For example, a risk assessment model can determine the criticality of different assets and prioritize the protection of high-value targets.' },
            ],
          },
          {
            type: 'text',
            heading: 'Examples of AI/ML Algorithms Used',
            text: 'Neural Networks: Neural networks are powerful tools for detecting and mitigating network threats due to their ability to model complex relationships in data.',
          },
          {
            type: 'note',
            text: 'The handout leaves the four activities below blank for you to fill in. The table entries and the answers that follow each set are worked answers, not the lecturer\'s.',
          },
          {
            type: 'text',
            heading: 'Activity 2: Supervised vs Unsupervised',
            text: 'Fill in the table:',
          },
          {
            type: 'table',
            headers: ['Scenario', 'Supervised or Unsupervised?', 'Why?'],
            rows: [
              ['Spam detection', 'Supervised', 'Labeled examples of spam and non-spam are available'],
              ['Unknown network traffic patterns', 'Unsupervised', 'No prior labels exist for new or evolving attack patterns'],
              ['Malware family classification', 'Supervised', 'Historical data exists for the different malware families'],
              ['Insider behavior anomaly detection', 'Unsupervised', 'Insider threats are rare and often lack predefined labels'],
            ],
          },
          {
            type: 'casestudy',
            heading: 'Activity 3: Adversarial Thinking',
            tasks: [
              'How might attackers use machine learning to bypass security systems?',
              'Why must machine learning systems in cybersecurity consider adversarial threats?',
              'What is adversarial machine learning?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'How attackers use ML to bypass defences', def: 'To generate evasive malware, craft sophisticated phishing campaigns, or learn to mimic normal user behaviour and avoid detection' },
              { term: 'Why adversarial threats must be considered', def: 'Because attackers actively adapt to evade detection, models must be robust against adversarial examples and continuously updated to counter new evasion techniques' },
              { term: 'Adversarial machine learning', def: 'The field that studies the vulnerability of ML models to malicious inputs (adversarial examples) and develops techniques to make those models more robust' },
            ],
          },
          {
            type: 'casestudy',
            heading: 'Activity 4: Pattern Recognition vs Anomaly Detection',
            tasks: [
              'Give one example of a security problem best solved using pattern recognition.',
              'Give one example best solved using anomaly detection.',
              'Why can anomaly detection generate false positives?',
              'Explain why there can be infinitely many anomalous patterns.',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Best solved by pattern recognition', def: 'Detecting known malware variants from their characteristic code signatures or network traffic patterns' },
              { term: 'Best solved by anomaly detection', def: 'Identifying a zero-day attack or insider threat, where no signature exists but the behaviour deviates sharply from the established baseline' },
              { term: 'Why false positives arise', def: 'It flags any deviation from normal, so legitimate but unusual events — a new software update, a user working from a new location — can be mistaken for anomalies' },
              { term: 'Why anomalous patterns are unbounded', def: 'Anomalies are defined by deviation from the norm, and the ways something can differ from the norm are theoretically infinite — attackers also keep inventing new, unforeseen attack vectors' },
            ],
          },
          {
            type: 'casestudy',
            heading: 'Activity 5: Case Study',
            prompt: 'Scenario: A company observes that one employee suddenly accesses 50 times more files than usual, at 2:00 AM from a new geographic location.',
            tasks: [
              'Would this be a pattern recognition or anomaly detection problem?',
              'What features would you extract to analyze this case?',
              'What risks exist if the model makes incorrect predictions?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Which problem type', def: "Anomaly detection — the scenario describes a significant deviation from the employee's usual behaviour in time, volume and location" },
              { term: 'Features to extract', def: 'Login time; login location (IP address, geo-coordinates); number of files accessed; type of files accessed; historical access patterns for that user; typical access patterns for users in similar roles' },
              { term: 'Risk of a false positive', def: 'Flagging legitimate activity as malicious causes unnecessary investigations, user inconvenience, and erosion of trust in the security system' },
              { term: 'Risk of a false negative', def: 'Missing genuine malicious activity can result in a data breach, financial loss, reputational damage, and compromise of the entire system' },
            ],
          },
        ],
      },
      {
        number: '12',
        title: 'Machine Learning for Threat Detection in Big Data',
        sections: [
          {
            type: 'definition',
            text: 'In cybersecurity, Supervised Machine Learning acts as a trained digital sentry. It functions by learning from a labeled dataset of past incidents, identifying which patterns are harmless (benign) and which are dangerous (malicious).',
          },
          {
            type: 'text',
            heading: 'The Procedural Workflow',
            text: 'Before a model can detect a threat, it must undergo a rigorous phase.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Data Labeling', def: 'Experts provide the model with a dataset where every entry is tagged (e.g., 1 for malware, 0 for safe).' },
              { term: 'Feature Engineering', def: "Identifying specific characteristics that signal a threat. Example: For an email, features include the sender's IP, number of links, or presence of \"urgent\" keywords." },
              { term: 'Training', def: 'The algorithm (the "engine") processes the features to find a mathematical boundary between safe and unsafe.' },
              { term: 'Testing/Validation', def: 'The model is given new, unlabeled data to see if it can correctly predict the category.' },
            ],
          },
          {
            type: 'text',
            heading: 'Deployment in Threat Detection in Big Data',
            text: 'Supervised learning is categorized into two main tasks: Classification (Is this a threat?) and Regression (How high is the risk in big data?).',
          },
          {
            type: 'text',
            heading: '1. Network Intrusion Detection (NIDS)',
            text: 'NIDS monitors traffic to identify unauthorized access or attacks like DDoS.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Common Algorithms', def: 'Random Forest, Support Vector Machines (SVM).' },
              { term: 'Manual Indicators', def: 'Byte counts, packet intervals, and TCP flag combinations.' },
              { term: 'How it works', def: 'The model learns the "profile" of a standard connection. If a connection show features similar to a labeled "SYN Flood" attack, it triggers an alert.' },
            ],
          },
          {
            type: 'text',
            heading: '2. Malware Analysis',
            text: 'Detecting "Zero-day" threats that signature-based antivirus software might miss.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Common Algorithms', def: 'Decision Trees, K-Nearest Neighbors (KNN).' },
              { term: 'Manual Indicators', def: 'File size, API calls made by the code, and registry key changes.' },
              { term: 'How it works', def: 'Instead of looking for a specific "fingerprint," the model looks at behavioral features. If a file behaves like previously labeled ransomware (e.g., rapid file encryption), it is quarantined.' },
            ],
          },
          {
            type: 'text',
            heading: '3. Phishing and Spam Detection',
            text: 'Analyzing communication to stop social engineering.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Common Algorithms', def: 'Naive Bayes, Logistic Regression.' },
              { term: 'Manual Indicators', def: 'URL length, use of IP addresses in place of domain names, and suspicious "call to action" phrases.' },
              { term: 'How it works', def: 'Naive Bayes calculates the probability that an email is phishing based on the frequency of specific suspicious words found in past "labeled" phishing campaigns.' },
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/algorithm-comparison.webp',
            width: 1400, height: 596,
            alt: 'Mind map of security algorithms: Naive Bayes (phishing/spam, fast and text-friendly, assumes feature independence), Random Forest (network intrusion, accurate on large data, slow in real time), SVM (malware detection, strong on high-dimensional data, memory intensive), and Logistic Regression (fraud detection, gives a risk score, struggles with non-linear threats)',
            caption: 'The same four algorithms as a map — drawn for these notes; the handout prints only the table below',
          },
          {
            type: 'table',
            heading: 'Algorithm Comparison',
            headers: ['Algorithm', 'Used', 'Strength', 'Weakness'],
            rows: [
              ['Naive Bayes', 'Phishing/Spam', 'Extremely fast; works well with text.', 'Assumes features are independent.'],
              ['Random Forest', 'Network Intrusion', 'Highly accurate; handles large data.', 'Can be slow to run in real-time.'],
              ['SVM', 'Malware Detection', 'Excellent for complex, high-dimensional data.', 'High memory consumption.'],
              ['Logistic Regression', 'Fraud Detection', 'Provides a clear "Risk Score" (0–100%).', 'Struggles with non-linear threats.'],
            ],
          },
        ],
      },
      {
        number: '13',
        title: 'Exploratory Data Analysis (EDA) for Network Security',
        sections: [
          {
            type: 'definition',
            text: 'Exploratory Data Analysis (EDA) is the process of examining, summarizing, and visualizing a dataset to understand its main characteristics before applying formal models.',
          },
          {
            type: 'text',
            heading: 'Functions of EDA',
            text: 'It helps discover patterns, detect errors or missing values, identify relationships between variables, and check assumptions for modeling. EDA is typically performed using libraries like: Pandas → data handling, Matplotlib → basic plots, Seaborn → advanced visuals.',
          },
          {
            type: 'termlist',
            heading: 'TYPES OF EDA',
            items: [
              { term: 'i. Univariate Analysis (one variable)', def: 'Mean, median, mode. Histogram, boxplot. It helps to understand the distribution of a single feature.' },
              { term: 'ii. Bivariate Analysis (two variables)', def: 'Scatter plots. Correlation analysis. It helps to identify relationships between variables.' },
              { term: 'iii. Multivariate Analysis (multiple variables)', def: 'Heatmaps. Pair plots. It helps understand complex interactions.' },
            ],
          },
        ],
      },
      {
        number: '14',
        title: 'Model Evaluation',
        sections: [
          {
            type: 'definition',
            text: 'To evaluate the performance of the machine learning models used for threat detection, several evaluation metrics are used. These metrics are derived from the confusion matrix, which summarizes the classification results by comparing the predicted labels with the actual labels.',
          },
          {
            type: 'text',
            text: 'The confusion matrix consists of four main components:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'True Positive (TP)', def: 'Cases where the model correctly analysis the threat pattern' },
              { term: 'True Negative (TN)', def: 'Cases where the model correctly predicts that the system does not have threat.' },
              { term: 'False Positive (FP)', def: 'Cases where the model incorrectly predicts threat when there is no threat.' },
              { term: 'False Negative (FN)', def: 'Cases where the model fails to detect threat when there is threat in system' },
            ],
          },
          {
            type: 'text',
            text: 'These values are used to compute several performance metrics that measure the effectiveness of the classification model. It includes the following',
          },
          {
            type: 'note',
            text: 'Three of the equations on printed pages 40-41 are cut off in the handout itself - it shows Accuracy = (TP + T)/(TP+TN+FP+FN), Precision = TP/(TP+) and F1 = 2x(Precision x Recall)/(Precision+Re). The complete forms are given below, since those are what you need in the exam. The handout also drops the equation number for Accuracy (Precision, Recall and F1 are numbered 3.19, 3.20 and 3.21), leaves Recall unnumbered in the i/ii/iii run and then numbers F1 Score "i." where it should read "iii.", and its False Positive line carries a stray word "child".',
          },
          {
            type: 'text',
            heading: 'i. Accuracy',
            text: 'Accuracy measures the proportion of correctly predicted instances out of the total number of predictions made by the model as shown in Equation',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Accuracy = (TP + TN) / (TP + TN + FP + FN)',
          },
          {
            type: 'text',
            text: 'Accuracy provides a general measure of how well the model performs overall. A higher accuracy indicates that the model correctly classifies a large proportion of the dataset.',
          },
          {
            type: 'text',
            heading: 'ii. Precision',
            text: 'Precision measures the proportion of positive predictions that are actually correct as presented in Equation 3.19',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Precision = TP / (TP + FP)',
          },
          {
            type: 'text',
            text: 'A high precision value indicates that the model produces fewer false alarms (false positives).',
          },
          {
            type: 'text',
            heading: 'Recall (Sensitivity)',
            text: 'Recall, also known as sensitivity, measures the proportion of actual positive cases that are correctly identified by the model in Equation 3.20',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Recall = TP / (TP + FN)',
          },
          {
            type: 'text',
            text: 'IDS recall is particularly important because failing to detect a true threat case (false negative) may delay early intervention and treatment. Therefore, models used for threat screening are often designed to maximize recall.',
          },
          {
            type: 'text',
            heading: 'iii. F1 Score',
            text: 'The F1-score is the harmonic mean of precision and recall, providing a balanced measure when both false positives and false negatives are important as shown in Equation 3.21',
          },
          {
            type: 'code',
            language: 'math',
            code: 'F1 = 2 × (Precision × Recall) / (Precision + Recall)',
          },
          {
            type: 'text',
            text: 'The F1-score is useful when the dataset is imbalanced because it considers both precision and recall simultaneously. A high F1-score indicates that the model achieves a good balance between correctly identifying threat cases and minimizing incorrect predictions. (The handout stops at "minimizing incorrect.")',
          },
        ],
      },
      {
        number: '15',
        title: 'Different Libraries for Big Data Manipulation',
        sections: [
          {
            type: 'bullets',
            heading: 'Pandas (import pandas as pd)',
            items: [
              'Function: Pandas is used for data manipulation and analysis.',
              'Loads datasets (CSV, Excel, etc.).',
              'Organizes data into tables (DataFrames).',
              'Cleans and preprocesses data.',
              'Performs statistical operations.',
            ],
          },
          {
            type: 'code',
            language: 'python',
            code: `import pandas as pd

df = pd.read_csv("data.csv")   # Load dataset
df.head()                      # View first rows
df.describe()                  # Summary statistics
df.isnull().sum()              # Check missing values`,
          },
          {
            type: 'bullets',
            heading: 'i. NumPy (import numpy as np)',
            items: [
              'Function: NumPy is used for numerical computations and array operations.',
              'Handles large numerical data efficiently.',
              'Supports mathematical operations.',
              'Works with multi-dimensional arrays.',
              'In simple terms: NumPy = fast math operations on numbers and arrays.',
            ],
          },
          {
            type: 'code',
            language: 'python',
            code: `import numpy as np

arr = np.array([1, 2, 3])
np.mean(arr)   # Mean
np.std(arr)    # Standard deviation
np.max(arr)    # Maximum value`,
          },
          {
            type: 'bullets',
            heading: 'ii. Matplotlib (import matplotlib.pyplot as plt)',
            items: [
              'Function: Matplotlib is used for basic data visualization.',
              'What it does: Creates plots like:',
              'Line charts',
              'Bar charts',
              'Histograms',
              'In simple terms: Matplotlib = drawing graphs from scratch.',
            ],
          },
          {
            type: 'code',
            language: 'python',
            code: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [4, 5, 6])
plt.title("Simple Plot")
plt.show()`,
          },
          {
            type: 'bullets',
            heading: 'iii. Seaborn (import seaborn as sns)',
            items: [
              'Function: Seaborn is used for advanced and attractive statistical visualizations.',
              'How does it work.',
              'Builds on Matplotlib.',
              'Provides beautiful, easy-to-use plots.',
              'Handles complex visualizations easily.',
              'In simple terms: Seaborn = beautiful and smarter graphs.',
            ],
          },
          {
            type: 'note',
            text: 'Two changes to the printed snippet below so it runs: the import line is added (the handout gives it only in the heading), and df.corr() becomes df.corr(numeric_only=True), because corr() cannot handle the text columns in these datasets. The handout also re-prints the two Pandas import lines a second time at the end of its Pandas block, which looks like a copy-paste slip and is not repeated here.',
          },
          {
            type: 'code',
            language: 'python',
            code: `import seaborn as sns

# df is the DataFrame loaded in the Pandas example above
sns.countplot(x='label', data=df)             # Bar chart
sns.heatmap(df.corr(numeric_only=True))       # Correlation heatmap
                                              # (numeric_only skips text columns,
                                              #  which corr() cannot handle)
sns.boxplot(x='label', y='value', data=df)    # Boxplot`,
          },
        ],
      },
      {
        number: '16',
        title: 'Practice Exercise of Exploratory Data Analysis for IDS Data Set',
        sections: [
          {
            type: 'note',
            text: 'The three blocks below are one continuous script — run them in order in the same notebook. The second and third reuse df and num_cols from the block before them, so running the last one on its own raises a NameError.',
          },
          {
            type: 'code',
            language: 'python',
            code: `# 1. Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set style
sns.set_style("whitegrid")

# 2. Load Dataset
file_path = "UNSW_NB15_dataset.csv"   # update path if needed
df = pd.read_csv(file_path)

# 3. Basic Exploration
print("First 5 rows:")
print(df.head())

print("\\nDataset Info:")
print(df.info())
print("\\nDataset Shape:")
print(df.shape)
print("\\nColumn Names:")
print(df.columns)

# 4.  Preprocessing data -Missing Values
print("\\nMissing Values:")
missing = df.isnull().sum()
print(missing[missing > 0])

# 5. Statistical Summary
print("\\nStatistical Summary:")
print(df.describe())

# 6. Categorical Features Analysis
categorical_cols = df.select_dtypes(include='object').columns
for col in categorical_cols:
    print(f"\\nValue Counts for {col}:")
    print(df[col].value_counts().head())`,
          },
          {
            type: 'code',
            heading: 'Target and Feature Distributions',
            language: 'python',
            code: `# 7. Target Variable Analysis
# Binary label
plt.figure()
sns.countplot(x='label', data=df)
plt.title("Distribution of Target Variable (Label)")
plt.show()

# Attack categories
plt.figure(figsize=(10, 5))
sns.countplot(x='attack_cat', data=df, order=df['attack_cat'].value_counts().index)
plt.xticks(rotation=45)
plt.title("Attack Category Distribution")
plt.show()

# 8. Numerical Features Distribution
num_cols = df.select_dtypes(include=np.number).columns
df[num_cols].hist(figsize=(15, 12))
plt.suptitle("Histogram of Numerical Features")
plt.show()

# 9. Correlation Matrix
plt.figure(figsize=(12, 10))
corr = df[num_cols].corr()
sns.heatmap(corr, cmap='coolwarm', annot=False)
plt.title("Correlation Matrix")
plt.show()`,
          },
          {
            type: 'code',
            heading: 'Outliers, Relationships and Class Imbalance',
            language: 'python',
            code: `# 10. Boxplots for Outlier Detection
plt.figure(figsize=(15, 10))
for i, col in enumerate(num_cols[:10]):   # first 10 features
    plt.subplot(2, 5, i + 1)
    sns.boxplot(y=df[col])
    plt.title(col)

plt.tight_layout()
plt.show()

# 11. Pairplot (sampled for performance)
sample_df = df.sample(n=1000, random_state=42)
sns.pairplot(sample_df[['dur', 'spkts', 'dpkts', 'sbytes', 'dbytes', 'label']], hue='label')
plt.show()

# 12. Feature Relationships with Target
plt.figure(figsize=(10, 6))
sns.boxplot(x='label', y='sbytes', data=df)
plt.title("sbytes vs Label")
plt.show()

plt.figure(figsize=(10, 6))
sns.boxplot(x='label', y='dbytes', data=df)
plt.title("dbytes vs Label")
plt.show()

# 13. Class Imbalance Check
print("\\nClass Distribution:")
print(df['label'].value_counts(normalize=True))`,
          },
        ],
      },
      {
        number: '17',
        title: 'Practical — SVM and KNN for Intrusion Detection',
        sections: [
          {
            type: 'note',
            text: 'A kernel SVM (SVC) scales roughly with the square of the number of samples, so the first listing below, run on the full UNSW-NB15 file, can take hours. Train it on a stratified subsample first — or use the LinearSVC version under ALTERNATIVE CODES, which is built for datasets this size.',
          },
          {
            type: 'code',
            heading: 'Practice Exercise Using Support Vector Machine (SVM) for Threat Detection',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import (accuracy_score, precision_score,
                             recall_score, f1_score, confusion_matrix,
                             ConfusionMatrixDisplay, classification_report)

# 2. Load Dataset
df = pd.read_csv('/content/UNSW_NB15_dataset.csv')

# 3. Data Preprocessing
# Drop missing values (if any)
df = df.dropna()

# Encode categorical features
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Split features and target
# Drop 'id' (a row number, not a signal) and 'attack_cat' - attack_cat
# names the attack family, so leaving it in leaks the answer to the model
X = df.drop(['id', 'attack_cat', 'label'], axis=1)
y = df['label']

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 5. Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 6. Train SVM Model
svm_model = SVC(kernel='rbf', C=1.0, gamma='scale')
svm_model.fit(X_train, y_train)

# 7. Predictions
y_pred = svm_model.predict(X_test)

# 8. Evaluation Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print("===== SVM Performance =====")
print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1-score : {f1:.4f}")
print("\\nClassification Report:\\n")
print(classification_report(y_test, y_pred))

# 9. Confusion Matrix Plot
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.title("Confusion Matrix - SVM")
plt.show()

# 10. Performance Metrics Bar Plot
metrics = ['Accuracy', 'Precision', 'Recall', 'F1-score']
values = [accuracy, precision, recall, f1]
plt.figure()
plt.bar(metrics, values)
plt.title("SVM Performance Metrics")
plt.xlabel("Metrics")
plt.ylabel("Score")
plt.show()`,
          },
          {
            type: 'code',
            heading: 'ALTERNATIVE CODES',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.metrics import (classification_report, confusion_matrix,
                             accuracy_score, precision_score,
                             recall_score, f1_score, roc_curve, auc)

# 1. Load the dataset
df = pd.read_csv('UNSW_NB15_dataset.csv')

# Drop rows with missing values - the real file has blank service entries,
# and StandardScaler passes NaN straight through to LinearSVC.fit()
df = df.dropna()

# 2. Preprocessing
# Drop non-predictive columns and the multiclass target 'attack_cat'
X = df.drop(['id', 'attack_cat', 'label'], axis=1)
y = df['label']

# Convert categorical features (proto, service, state) to dummy variables
X = pd.get_dummies(X, columns=['proto', 'service', 'state'], drop_first=True)

# 3. Split into training and testing sets (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Feature Scaling (Crucial for SVM performance)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 5. Model Training (LinearSVC is optimized for large datasets)
svm_model = LinearSVC(dual=False, random_state=42, max_iter=5000)
svm_model.fit(X_train_scaled, y_train)

# 6. Evaluation
y_pred = svm_model.predict(X_test_scaled)
print("Performance Metrics:")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))

# 7. Plotting Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix - SVM')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.savefig('confusion_matrix_svm.png')

# 8. Plotting ROC Curve
y_score = svm_model.decision_function(X_test_scaled)
fpr, tpr, _ = roc_curve(y_test, y_score)
roc_auc = auc(fpr, tpr)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', linestyle='--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve - SVM')
plt.legend(loc="lower right")
plt.savefig('roc_curve_svm.png')`,
          },
          {
            type: 'code',
            heading: 'Intrusion Detection Using KNN',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (classification_report, confusion_matrix,
                             accuracy_score, precision_score,
                             recall_score, f1_score, roc_curve, auc)

# 1. Load data
df = pd.read_csv('UNSW_NB15_dataset.csv')

# Drop rows with missing values - StandardScaler passes NaN through and
# KNeighborsClassifier.fit() then raises ValueError: Input X contains NaN
df = df.dropna()

# 2. Preprocessing
X = df.drop(['id', 'attack_cat', 'label'], axis=1)
y = df['label']
X = pd.get_dummies(X, columns=['proto', 'service', 'state'], drop_first=True)

# 3. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                    random_state=42)

# 4. Feature Scaling (Mandatory for KNN)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 5. Train KNN Model (k=5)
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train_scaled, y_train)

# 6. Predictions and Probability
y_pred = knn.predict(X_test_scaled)
y_prob = knn.predict_proba(X_test_scaled)[:, 1]

# 7. Print Performance
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))

# 8. Plot Confusion Matrix
plt.figure(figsize=(8, 6))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Greens')
plt.title('Confusion Matrix - KNN')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.savefig('confusion_matrix_knn.png')

# 9. Plot ROC Curve
fpr, tpr, _ = roc_curve(y_test, y_prob)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='forestgreen', label=f'AUC = {auc(fpr, tpr):.2f}')
plt.plot([0, 1], [0, 1], linestyle='--')
plt.title('ROC Curve - KNN')
plt.legend()
plt.savefig('roc_curve_knn.png')`,
          },
        ],
      },
      {
        number: '18',
        title: 'Intrusion Detection Using Decision Tree (DT)',
        sections: [
          {
            type: 'text',
            heading: 'About This Implementation',
            text: 'A full Decision Tree model for intrusion detection on the UNSW-NB15 dataset: data loading, preprocessing, training, evaluation, and k-fold cross-validation. Note that feature scaling is optional for a decision tree — splits are threshold-based, so the scale of a feature does not change the tree — but it is kept here so the same preprocessing serves other models too.',
          },
          {
            type: 'note',
            text: 'The two blocks below are one continuous script — the second reuses the model and the split from the first. Both drop the id and attack_cat columns before training: attack_cat names the attack family, so a model that can see it is just reading the answer, and the accuracy it reports would be meaningless.',
          },
          {
            type: 'code',
            heading: 'Intrusion Detection Using Decision Tree (DT)',
            language: 'python',
            code: `# 1. Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             f1_score, confusion_matrix,
                             ConfusionMatrixDisplay, classification_report)

# 2. Load Dataset
df = pd.read_csv('UNSW_NB15_dataset.csv')

# 3. Data Preprocessing
# Drop missing values (if any)
df = df.dropna()

# Encode categorical features
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Features and target
# Drop 'id' (a row number, not a signal) and 'attack_cat' - attack_cat
# names the attack family, so leaving it in leaks the answer to the model
X = df.drop(['id', 'attack_cat', 'label'], axis=1)
y = df['label']

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 5. Feature Scaling (Optional for DT)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 6. Train Decision Tree Model
dt_model = DecisionTreeClassifier(
    criterion='gini',   # or 'entropy'
    max_depth=None,     # you can tune this
    random_state=42
)
dt_model.fit(X_train, y_train)

# 7. Predictions
y_pred = dt_model.predict(X_test)`,
          },
          {
            type: 'code',
            heading: 'Evaluate and Cross-Validate',
            language: 'python',
            code: `# 8. Evaluation Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print("===== Decision Tree Performance =====")
print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1-score : {f1:.4f}")

print("\\nClassification Report:\\n")
print(classification_report(y_test, y_pred))

# 9. Confusion Matrix Plot
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.title("Confusion Matrix - Decision Tree")
plt.show()

# 10. Performance Metrics Bar Plot
metrics = ['Accuracy', 'Precision', 'Recall', 'F1-score']
values = [accuracy, precision, recall, f1]

plt.figure()
plt.bar(metrics, values)
plt.title("Decision Tree Performance Metrics")
plt.xlabel("Metrics")
plt.ylabel("Score")
plt.show()

# 11. K-Fold Cross-Validation
cv_scores = cross_val_score(dt_model, X, y, cv=5, scoring='accuracy')

print("\\nCross-Validation Scores:", cv_scores)
print("Mean CV Accuracy:", np.mean(cv_scores))`,
          },
        ],
      },
      {
        number: '19',
        title: 'Network Anomaly Detection (K-Means Clustering)',
        sections: [
          {
            type: 'note',
            text: 'Printed page 55 heads this section "THREAT ANALYSIS USING SUPPORT VECTOR MACHINE". Everything under it is K-Means clustering, not SVM - the heading appears to be left over from the previous practical.',
          },
          {
            type: 'definition',
            text: 'In cybersecurity, threat detection often relies on identifying unusual patterns instead of known virus signatures. This demonstrates how NumPy, K-Means clustering, and Matplotlib work together to detect anomalies in network behavior.',
          },
          {
            type: 'bullets',
            heading: 'Required Libraries',
            items: [
              'NumPy — Numerical data processing',
              'Scikit-Learn (K-Means) — Clustering algorithm',
              'Matplotlib — Data visualization',
              'Pandas is a Python library used for data manipulation and analysis.',
            ],
          },
          {
            type: 'text',
            heading: 'NumPy (Data Preparation)',
            text: 'NumPy converts raw security logs into structured numerical arrays. These arrays allow fast mathematical computation.',
          },
          {
            type: 'text',
            heading: 'K-Means Clustering (Detection)',
            text: 'K-Means is an unsupervised learning algorithm that groups data into clusters. Points that are far from cluster centers (centroids) are considered anomalies.',
          },
          {
            type: 'text',
            heading: 'Matplotlib (Visualization)',
            text: 'Matplotlib visualizes clustered data so analysts can easily identify suspicious outliers.',
          },
          {
            type: 'image',
            heading: 'Workflow',
            src: '/lecture-notes/cyb-224/kmeans-workflow.webp',
            width: 1000, height: 1148,
            maxWidth: 560,
            alt: 'Five-step flow: collect network activity data, convert to a NumPy array, apply K-Means clustering, identify data points far from centroids, then visualize clusters and anomalies',
            caption: 'Figure 7: The K-Means anomaly detection workflow',
          },
          {
            type: 'bullets',
            items: [
              'Step 1: Collect network activity data (e.g., bytes transferred, session duration).',
              'Step 2: Convert the data into a NumPy array.',
              'Step 3: Apply K-Means clustering to group normal behaviors.',
              'Step 4: Identify data points far from cluster centroids.',
              'Step 5: Visualize clusters and anomalies using Matplotlib.',
            ],
          },
          {
            type: 'casestudy',
            heading: 'Practical Example',
            prompt: 'Example scenario: A user normally downloads small files (1–2MB). Suddenly, one session shows 10GB transfer at 3:00 AM. This behavior may be flagged as anomalous.',
          },
          {
            type: 'code',
            heading: '7. Python Implementation',
            language: 'python',
            code: `# Import Libraries
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 1. Organize Data (example: network activity)
# Format: [Data Volume, Session Duration]
data = np.array([[1, 2],
                 [1, 1],
                 [2, 1.5],
                 [10, 10]])   # potential threat (anomaly)

# 2. Apply K-Means Clustering
kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(data)

# 3. Visualize Results
plt.scatter(data[:, 0], data[:, 1], c=kmeans.labels_)
plt.scatter(kmeans.cluster_centers_[:, 0],
            kmeans.cluster_centers_[:, 1],
            marker='X', s=200)
plt.xlabel("Data Volume")
plt.ylabel("Session Duration")
plt.title("Anomaly Detection Using K-Means")
plt.show()`,
          },
          {
            type: 'code',
            language: 'python',
            code: `import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Simulated traffic data
traffic = np.array([[10, 100],
                    [12, 120],
                    [11, 110],
                    [200, 1000],   # anomaly
                    [9, 95]])

kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(traffic)
labels = kmeans.labels_

plt.scatter(traffic[:, 0], traffic[:, 1], c=labels)
plt.xlabel("Requests per Second")
plt.ylabel("Data Volume")
plt.show()`,
          },
        ],
      },
      {
        number: '20',
        title: 'The k-Nearest Neighbors (k-NN) Algorithm',
        sections: [
          {
            type: 'definition',
            text: 'The k-Nearest Neighbors (k-NN) algorithm is a simple and well-known example of a lazy learning algorithm in machine learning.',
          },
          {
            type: 'text',
            heading: 'Lazy Learning Concept',
            text: 'Lazy learning algorithms delay most computations until the classification stage instead of performing intensive computation during training.',
          },
          {
            type: 'text',
            heading: 'How k-NN Works',
            text: 'k-NN performs no work up front; the effort moves to the moment a new sample must be classified.',
          },
          {
            type: 'bullets',
            heading: 'Training Phase',
            items: [
              'Stores all training feature vectors and their corresponding labels.',
              'No model building or parameter learning is performed.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Classification Phase',
            items: [
              'Calculates the distance between a test sample and all training samples.',
              'Selects the k nearest neighbors.',
              'Assigns the most common label among those neighbors.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Distance Metrics',
            items: [
              { term: 'Euclidean Distance', def: 'Used for continuous numerical data.' },
              { term: 'Hamming Distance', def: 'Used for discrete or categorical data.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Advantages',
            items: [
              'Simple to understand and implement.',
              'Very fast training phase.',
              'Useful for teaching machine learning concepts.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Disadvantages',
            items: [
              'Large memory usage (stores all training data).',
              'Slow classification time.',
              'Not efficient for very large datasets.',
              'Performance depends on the choice of k and distance metric.',
            ],
          },
          {
            type: 'text',
            text: 'Optimized data structures such as k-d trees can be used to speed up neighbor searching.',
          },
          {
            type: 'note',
            text: 'k-NN is a simple and intuitive classification algorithm that stores training data and makes predictions based on similarity. It is effective for small datasets but inefficient for large-scale real-world applications.',
          },
          {
            type: 'casestudy',
            heading: 'Activity',
            tasks: [
              'Define the k-Nearest Neighbors (k-NN) algorithm.',
              'What is meant by lazy learning?',
              'What happens during the training phase of k-NN?',
              'What happens during the classification phase?',
              'Explain the role of the parameter k.',
              'When is Hamming distance used?',
              'Why is k-NN considered memory inefficient?',
              'What is the purpose of a k-d tree in k-NN?',
              'What happens if k = 1?',
              'What happens if k is too large?',
              'How would you choose the best value of k?',
              'How does feature scaling affect k-NN performance?',
              'Compare k-NN with Random Forest in terms of training time and prediction time.',
            ],
          },
          {
            type: 'note',
            text: 'The answers below are worked answers, not the lecturer\'s.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Definition', def: 'k-NN is a lazy, instance-based classifier: it stores the labelled training vectors, then classifies a new sample by finding the k closest stored samples and taking the most common label among them' },
              { term: 'Lazy learning', def: 'The algorithm does no work at training time and defers the computation to classification. Nothing is generalised into a model in advance, no parameters are fitted, and every prediction re-reads the training set' },
              { term: 'Training phase', def: 'It stores all training feature vectors with their labels. No model is built and no parameter is learned, which is why training is effectively instant' },
              { term: 'Classification phase', def: 'It measures the distance from the test sample to every stored training sample, selects the k nearest, and assigns the label held by the majority of those neighbours' },
              { term: 'Role of k', def: 'k sets how many neighbours vote, and with it the balance between fitting noise and over-smoothing. A small k follows the data closely and is sensitive to individual mislabelled points; a large k averages over a wider neighbourhood and gives a smoother, more stable boundary' },
              { term: 'When Hamming distance is used', def: 'For discrete or categorical features, where subtracting one value from another is meaningless — it counts the positions at which two vectors differ. Euclidean distance is used for continuous numerical data' },
              { term: 'Why it is memory inefficient', def: 'Because the training set is the model. Every vector has to be kept for the lifetime of the classifier and all of it is consulted on each prediction, so memory grows with the size of the dataset rather than with the complexity of the boundary' },
              { term: 'Purpose of a k-d tree', def: 'It indexes the stored points spatially so the search for nearest neighbours can discard whole regions instead of comparing against every sample. It attacks the slow classification phase, not the memory cost' },
              { term: 'If k = 1', def: 'Each sample takes the label of its single closest neighbour. Training error falls to zero, which looks perfect and is not: the boundary traces every point including noise and mislabelled traffic, so variance is high and it generalises poorly' },
              { term: 'If k is too large', def: 'The neighbourhood grows past the structure being detected and predictions drift toward the majority class. In an IDS that is dangerous rather than merely inaccurate — attacks are rare, so a large k dilutes the few malicious neighbours and the model quietly predicts benign for everything' },
              { term: 'Choosing the best k', def: 'Cross-validate across a range of candidate values and take the k with the best validation score, not the best training score. Use an odd k for a two-class problem so a vote cannot tie, and the square root of the sample count is a reasonable value to start searching around' },
              { term: 'Effect of feature scaling', def: 'Euclidean distance is dominated by whichever feature has the widest numeric range, so an unscaled byte count in the millions swamps a SYN flag of 0 or 1 and a byte entropy between 0.30 and 0.95 — the model ends up measuring one feature and ignoring the rest. That is why the practicals in this course treat StandardScaler as mandatory before KNeighborsClassifier' },
              { term: 'k-NN against Random Forest', def: 'The costs are inverted. k-NN trains in almost no time and pays at prediction, because each prediction searches the whole training set; Random Forest pays up front to build its trees, then predicts quickly by dropping a sample through them. For an IDS that has to keep up with live traffic, prediction time is the binding constraint, which favours Random Forest' },
            ],
          },
        ],
      },
      {
        number: '21',
        title: 'Anomaly Detection Using Pandas and Scikit-Learn Libraries',
        sections: [
          {
            type: 'text',
            heading: 'Functions of Pandas and Scikit-Learn Libraries',
            text: 'The two libraries below do the work in the intrusion-detection listings: Pandas prepares the data, Scikit-Learn builds and runs the model.',
          },
          {
            type: 'definition',
            heading: 'i. Pandas Library',
            text: 'Pandas is a Python library used for data manipulation and analysis.',
          },
          {
            type: 'termlist',
            heading: 'Main Functions of Pandas',
            items: [
              { term: 'Data Creation', def: 'Create datasets using DataFrame and Series. Example: df = pd.read_csv(\'/specify the path\')' },
              { term: 'Data Cleaning', def: 'Handle missing values. Remove duplicates. Filter unwanted records.' },
              { term: 'Data Selection and Filtering', def: 'Select rows and columns. Example: X = df.drop("label", axis=1)' },
              { term: 'Data Transformation', def: 'Modify columns. Convert data types. Perform feature engineering.' },
              { term: 'Data Exploration', def: 'Summary statistics using df.describe(). View the first rows using df.head().' },
            ],
          },
          {
            type: 'text',
            heading: 'Application in Intrusion Detection Code',
            text: 'Pandas is used to:',
          },
          {
            type: 'bullets',
            items: [
              'Create the simulated login dataset.',
              'Organize login attempts and failed attempts.',
              'Separate input features (X) and labels (y).',
            ],
          },
          {
            type: 'definition',
            heading: 'ii. Scikit-Learn Library',
            text: 'Scikit-Learn is a Python library used for machine learning and predictive modeling.',
          },
          {
            type: 'termlist',
            heading: 'Main Functions of Scikit-Learn',
            items: [
              { term: 'Data Splitting', def: 'Split the dataset into training and testing sets using train_test_split().' },
              { term: 'Model Building', def: 'Classification, including Random Forest, SVM, and Logistic Regression. Regression. Clustering.' },
              { term: 'Model Training', def: 'Fit a model to data: model.fit(X_train, y_train)' },
              { term: 'Prediction', def: 'Predict outcomes: model.predict(X_test)' },
            ],
          },
          {
            type: 'code',
            heading: 'Isolation Forest',
            language: 'python',
            code: `import numpy as np
from sklearn.ensemble import IsolationForest

# same simulated traffic as the K-Means variant above
traffic = np.array([[10, 100],
                    [12, 120],
                    [11, 110],
                    [200, 1000],
                    [9, 95]])

model = IsolationForest(contamination=0.2)
model.fit(traffic)

anomalies = model.predict(traffic)
print("Anomaly Labels:", anomalies)
# -1 = anomaly, 1 = normal`,
          },
        ],
      },
      {
        number: '22',
        title: 'Practical Illustration of Anomaly Detection in Customer Credit Card',
        sections: [
          {
            type: 'resource',
            href: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
            label: 'Credit Card Fraud Detection dataset',
            filename: 'creditcard.csv',
            meta: 'Kaggle · mlg-ulb/creditcardfraud',
          },
          {
            type: 'code',
            heading: 'Practical Illustration of Anomaly Detection in Customer Credit Card',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Optional - better looking plots
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("muted")

df = pd.read_csv('/content/creditcard.csv')   # change path if needed
df.head(5)

# Display the tail of the dataset
df.tail(5)

print("Shape:", df.shape)
print("\\nColumns:")
print(df.columns.tolist())
print(df.info())

# Summarize the dataset
print(df.describe().T[['mean', 'std', 'min', '50%', 'max']])

# Check target distribution
print("\\nClass distribution:")
print(df['Class'].value_counts())
print(df['Class'].value_counts(normalize=True).mul(100).round(3))

plt.figure(figsize=(5, 4))
sns.countplot(data=df, x='Class')
plt.title("Class Distribution\\n(0 = Normal 1 = Fraud)")
plt.xlabel("Class (0 = genuine, 1 = fraud)")
plt.ylabel("Count")
plt.show()

# Missing values?
print("\\nMissing values:")
print(df.isna().sum().sum(), "missing values in total")

# Time feature analysis
plt.figure(figsize=(14, 5))

plt.subplot(1, 2, 1)
sns.histplot(df['Time'] / 3600, bins=48, kde=True)
plt.title("Transaction Time (hours from first record)")
plt.xlabel("Time (hours)")

plt.subplot(1, 2, 2)
sns.boxplot(x='Class', y='Time', data=df)
plt.title("Time by Class")
plt.show()

# Amount feature (very skewed!)
print("\\nAmount statistics:")
print(df['Amount'].describe())

plt.figure(figsize=(14, 5))

plt.subplot(1, 2, 1)
sns.histplot(df['Amount'], bins=60, kde=True)
plt.title("Transaction Amount (original scale)")
plt.xlim(0, 500)

plt.subplot(1, 2, 2)
sns.histplot(np.log1p(df['Amount']), bins=60, kde=True)
plt.title("log1p(Amount) — much better behaved")
plt.show()

# Compare amounts by class
plt.figure(figsize=(10, 6))
sns.boxplot(x='Class', y='Amount', data=df, showfliers=False)   # remove outliers for better view
plt.title("Transaction Amount by Class (with few outliers)")
plt.yscale('log')
plt.show()

# PCA features (V1-V28) - distribution comparison
v_cols = [f'V{i}' for i in range(1, 29)]

# Density plots - fraud vs non-fraud (selected features)
selected = ['V3', 'V4', 'V10', 'V11', 'V12', 'V14', 'V17']   # often most discriminative

plt.figure(figsize=(14, 10))
for i, col in enumerate(selected, 1):
    plt.subplot(3, 3, i)
    sns.kdeplot(data=df, x=col, hue='Class', common_norm=False)
    plt.title(f"{col} distribution by class")
    plt.xlabel(col)

plt.tight_layout()
plt.show()

# 7. Correlation heatmap (focus on important parts)
plt.figure(figsize=(12, 10))

# Full correlation is messy - focus on top features + Class + Amount
corr_cols = ['Time', 'Amount', 'Class'] + selected
corr = df[corr_cols].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', vmin=-0.6, vmax=0.6)
plt.title("Correlation Matrix — Selected Features + Target")
plt.show()

# 8. Most discriminative features (quick ranking)
# Absolute point-biserial correlation with Class (a simple univariate signal)
correlations = {}
for col in v_cols + ['Time', 'Amount']:
    correlations[col] = df[col].corr(df['Class'], method='pearson')

corr_df = pd.Series(correlations).sort_values(key=abs, ascending=False)
print("\\nTop features by absolute correlation with fraud:")
print(corr_df.head(12))

# 9. Quick outlier / extreme value check (Amount)
print("\\nTop 10 largest transactions:")
print(df.nlargest(10, 'Amount')[['Time', 'Amount', 'Class']])`,
          },
          {
            type: 'note',
            text: 'Report your results',
          },
          {
            type: 'code',
            heading: 'Exercise on Creditcard',
            language: 'python',
            code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
df = pd.read_csv('creditcard.csv')

# 1. Basic Information
print(df.info())
print(df.describe())

# 2. Check Class Imbalance
fraud_pct = (df['Class'].value_counts()[1] / len(df)) * 100
print(f"Fraudulent Transactions: {fraud_pct:.3f}%")

plt.figure(figsize=(8, 6))
sns.countplot(x='Class', data=df)
plt.title('Distribution of Classes (0: Normal, 1: Fraud)')
plt.show()

# 3. Distribution of Amount and Time
f, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
sns.histplot(df['Amount'], bins=50, ax=ax1, kde=True)
ax1.set_title('Distribution of Transaction Amount')
sns.histplot(df['Time'], bins=50, ax=ax2, kde=True)
ax2.set_title('Distribution of Transaction Time')
plt.show()

# 4. Correlation Heatmap
plt.figure(figsize=(12, 10))
corr = df.corr()
sns.heatmap(corr, cmap='coolwarm_r', annot=False)
plt.title('Correlation Matrix Heatmap')
plt.show()

# 5. Boxplots for key features
f, axes = plt.subplots(ncols=4, figsize=(20, 4))
sns.boxplot(x='Class', y='V14', data=df, ax=axes[0])
axes[0].set_title('V14 vs Class Negative Correlation')
sns.boxplot(x='Class', y='V12', data=df, ax=axes[1])
axes[1].set_title('V12 vs Class Negative Correlation')
sns.boxplot(x='Class', y='V17', data=df, ax=axes[2])
axes[2].set_title('V17 vs Class Negative Correlation')
sns.boxplot(x='Class', y='V10', data=df, ax=axes[3])
axes[3].set_title('V10 vs Class Negative Correlation')
plt.show()`,
          },
          {
            type: 'code',
            heading: 'MODEL COMPARISON',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (classification_report, confusion_matrix,
                             precision_recall_curve, roc_curve, auc,
                             accuracy_score)

# Load data
df = pd.read_csv('creditcard.csv')

# Features and Target
X = df.drop('Class', axis=1)
y = df['Class']

# To ensure models run within time limits, we use a stratified sample (10%) of the data
X_sample, _, y_sample, _ = train_test_split(X, y, train_size=0.1, stratify=y, random_state=42)

# Now split the 10% sample into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_sample, y_sample, test_size=0.3,
                                                    stratify=y_sample, random_state=42)

# Preprocessing: Scale Amount and Time - but AFTER the split, fitting only on
# the training rows.
# Scaling the whole frame first would let the test set's mean and standard
# deviation influence the training data, flattering every score below.
X_train = X_train.copy()
X_test = X_test.copy()
scaler = StandardScaler()
X_train[['Amount', 'Time']] = scaler.fit_transform(X_train[['Amount', 'Time']])
X_test[['Amount', 'Time']] = scaler.transform(X_test[['Amount', 'Time']])

print(f"Training set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")
print(f"Fraud cases in training: {y_train.sum()}")
print(f"Fraud cases in test: {y_test.sum()}")

models = {
    "SVM": LinearSVC(random_state=42, max_iter=2000),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
}

results = []

# Create plots
fig_cm, axes_cm = plt.subplots(2, 2, figsize=(15, 12))
axes_cm = axes_cm.ravel()

# Keep handles to these figures - plt.figure(1) would grab the confusion
# matrix figure created above, drawing the curves into the wrong plot
fig_roc = plt.figure(figsize=(10, 8))
plt.title('ROC Curves')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')

fig_pr = plt.figure(figsize=(10, 8))
plt.title('Precision-Recall Curves')
plt.xlabel('Recall')
plt.ylabel('Precision')

for i, (name, model) in enumerate(models.items()):
    print(f"Processing {name}...")
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Probabilities/Scores
    if hasattr(model, "predict_proba"):
        y_score = model.predict_proba(X_test)[:, 1]
    else:
        y_score = model.decision_function(X_test)

    # Metrics
    report = classification_report(y_test, y_pred, output_dict=True)
    results.append({
        "Model": name,
        "Accuracy": accuracy_score(y_test, y_pred),
        "Precision (Fraud)": report['1']['precision'],
        "Recall (Fraud)": report['1']['recall'],
        "F1-Score (Fraud)": report['1']['f1-score']
    })

    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=axes_cm[i])
    axes_cm[i].set_title(f'Confusion Matrix: {name}')

    # ROC Curve
    fpr, tpr, _ = roc_curve(y_test, y_score)
    roc_auc = auc(fpr, tpr)
    plt.figure(fig_roc.number)
    plt.plot(fpr, tpr, label=f'{name} (AUC = {roc_auc:.2f})')

    # PR Curve
    precision, recall, _ = precision_recall_curve(y_test, y_score)
    plt.figure(fig_pr.number)
    plt.plot(recall, precision, label=name)

# Finalize and Save
fig_cm.savefig('confusion_matrices.png')

plt.figure(fig_roc.number)
plt.plot([0, 1], [0, 1], 'k--')
plt.legend()
plt.savefig('roc_curves.png')

plt.figure(fig_pr.number)
plt.legend()
plt.savefig('precision_recall_curves.png')

summary_df = pd.DataFrame(results)
print("\\n--- Performance Comparison ---")
print(summary_df.to_string(index=False))`,
          },
          {
            type: 'table',
            heading: 'REPORT YOUR RESULTS IN A TABULAR FORM',
            headers: ['MODEL', 'ACCURACY', 'PRECISION', 'RECALL', 'F1-SCORE'],
            rows: [
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
            ],
          },
        ],
      },
      {
        number: '23',
        title: 'Security Management and Its Objectives',
        sections: [
          {
            type: 'note',
            text: 'Notes 23-26 are not from the printed workbook and not from a class session. The workbook covers the machine-learning half of this course; items 2, 4, 5 and 6 of the course outline — big data technology and adoption, the system and management view of security, the systems-design process and lifecycle security management, and basic policies and methodologies — were never handed out as notes. These four topics are written from that outline and from the two set texts and standard practice (ISO/IEC 27001, NIST SP 800-37 and the NIST Cybersecurity Framework), so that the outline is covered end to end. Where the lecturer later supplies wording of their own, it takes precedence over these four.',
          },
          {
            type: 'definition',
            heading: '23.1 Definition',
            text: 'Security management is the continuous process of planning, organising, directing and controlling the people, processes and technology that protect an organisation’s information assets. It is a management discipline before it is a technical one: it decides what is worth protecting, how much protection is justified, who is accountable for it, and how the organisation proves the protection is working.',
          },
          {
            type: 'text',
            text: 'The distinction that matters in this course is between security as a set of mechanisms — firewalls, encryption, access control — and security as something that has to be managed. A mechanism protects one thing at one moment. Management is what keeps a thousand mechanisms aligned with the organisation’s risk appetite as the data, the threats and the staff all change.',
          },
          {
            type: 'termlist',
            heading: '23.2 Objectives of Security Management — the Security Properties',
            items: [
              { term: 'Confidentiality', def: 'Information is disclosed only to parties authorised to see it. Protected by encryption at rest and in transit, access control and data classification.' },
              { term: 'Integrity', def: 'Information is accurate and complete, and is changed only by authorised parties in authorised ways. Protected by hashing, digital signatures, checksums and change control.' },
              { term: 'Availability', def: 'Information and the systems holding it are accessible to authorised users when needed. Protected by redundancy, backups, capacity planning and denial-of-service defences.' },
              { term: 'Authenticity', def: 'The data is genuine and its claimed source is the real source. Protected by authentication, certificates and message authentication codes.' },
              { term: 'Accountability', def: 'Every significant action can be traced back to the identity that performed it. Protected by unique user accounts, logging and audit trails — the reason shared administrator accounts are a management failure, not a convenience.' },
              { term: 'Non-repudiation', def: 'A party cannot credibly deny having performed an action they did perform. Protected by digital signatures and tamper-evident logs.' },
            ],
          },
          {
            type: 'note',
            text: 'Confidentiality, Integrity and Availability are the CIA triad, and are the three most likely to be asked for by name. The other three extend the triad and are worth adding when a question asks for "the objectives of security management" rather than "the CIA triad".',
          },
          {
            type: 'termlist',
            heading: '23.3 Objectives of Security Management — the Management Goals',
            items: [
              { term: 'Protect the organisation’s information assets', def: 'Identify what data, systems and people the organisation depends on, and give each a level of protection proportionate to its value.' },
              { term: 'Reduce risk to an acceptable level', def: 'Not to eliminate risk, which is impossible and unaffordable, but to bring it within the level management has agreed to accept.' },
              { term: 'Support the business objectives', def: 'Security exists to let the organisation operate, not to prevent it. A control that blocks legitimate work will be worked around, and an unenforceable control provides no protection.' },
              { term: 'Ensure legal and regulatory compliance', def: 'Meet the obligations imposed by data-protection law and sector regulation — in Nigeria, the Nigeria Data Protection Act; for organisations handling EU residents’ data, the GDPR.' },
              { term: 'Ensure business continuity', def: 'Keep critical operations running through an incident and restore them afterwards, through backup, redundancy and tested recovery plans.' },
              { term: 'Preserve trust and reputation', def: 'A breach costs more in lost customer confidence and regulatory penalty than in remediation. Protecting reputation is a management objective, not a public-relations afterthought.' },
            ],
          },
          {
            type: 'table',
            heading: '23.4 The System View and the Management View',
            headers: ['Aspect', 'System view', 'Management view'],
            rows: [
              ['Question asked', 'How is this system protected?', 'Is the organisation acceptably secure?'],
              ['Scope', 'One host, network or application', 'The whole organisation and its suppliers'],
              ['Concerned with', 'Mechanisms — encryption, firewalls, patching, access control', 'Risk, policy, budget, accountability, compliance'],
              ['Measured by', 'Technical tests: scans, penetration tests, configuration audits', 'Risk registers, audit findings, incident and compliance metrics'],
              ['Owned by', 'System administrators and security engineers', 'Executive management, the CISO and data owners'],
              ['Failure looks like', 'An unpatched server, a weak cipher', 'No owner for a dataset, no policy, an unfunded control'],
            ],
          },
          {
            type: 'text',
            text: 'Both views are needed. A system view without a management view produces well-hardened systems protecting data nobody has classified, with no one accountable when it leaks. A management view without a system view produces policy documents that describe a security posture the organisation does not actually have.',
          },
          {
            type: 'termlist',
            heading: '23.5 The Six Areas a Security Programme Manages',
            items: [
              { term: 'Planning', def: 'Strategic, tactical and operational planning for security, aligned to the organisation’s own plans.' },
              { term: 'Policy', def: 'The written rules that state what is required, permitted and forbidden — see note 25.' },
              { term: 'Programs', def: 'The ongoing security activities that are not projects: awareness training, risk management, business continuity.' },
              { term: 'Protection', def: 'The controls themselves — technical, administrative and physical — selected through risk management.' },
              { term: 'People', def: 'Staffing the security function, and managing everyone else: screening, training, separation of duties, and revoking access on exit.' },
              { term: 'Projects', def: 'Discrete pieces of security work with a start and an end, managed with normal project discipline.' },
            ],
          },
          {
            type: 'termlist',
            heading: '23.6 Why Big Data Changes the Management Problem',
            items: [
              { term: 'Aggregation raises sensitivity', def: 'Datasets that are individually harmless become identifying when joined. Classification must be applied to the combination, not just to each source.' },
              { term: 'Copies multiply', def: 'A big data platform ingests, replicates and caches. One dataset exists in a dozen places at different sensitivities, and access control has to follow it into all of them.' },
              { term: 'The perimeter is gone', def: 'Data is distributed across clusters and often across a cloud provider’s infrastructure, so protection has to attach to the data rather than to a boundary around it.' },
              { term: 'Volume defeats manual oversight', def: 'No team can review the logs a big data platform produces. Monitoring must itself be automated — which is why the machine-learning half of this course exists.' },
              { term: 'Retention becomes a liability', def: 'Big data culture keeps everything in case it is useful later. Data-protection law requires the opposite: keep it only as long as the stated purpose needs it.' },
            ],
          },
          {
            type: 'note',
            text: 'Note 4 gives the technical answer to the same problem — the four pillars of big data security. Read this topic for what management is trying to achieve, and note 4 for the controls that achieve it.',
          },
        ],
      },
      {
        number: '24',
        title: 'The Security Design Process and the Security Management Life Cycle',
        sections: [
          {
            type: 'note',
            text: 'Written from course outline item 5 — "requirements for information and big data security; systems-design process and lifecycle security management" — not from the printed workbook. See the note at the head of topic 23.',
          },
          {
            type: 'definition',
            heading: '24.1 Definition',
            text: 'The security design process is the sequence of stages by which security requirements are identified, turned into a design, built into a system, verified, and then maintained for as long as the system runs. Its central principle is that security is designed in from the start rather than added afterwards: a control retrofitted to a finished system costs more, fits worse and covers less than the same control designed into it.',
          },
          {
            type: 'termlist',
            heading: '24.2 Major Stages of the Security Design Process',
            items: [
              { term: '1. Requirements definition', def: 'Establish what has to be protected and to what standard. Identify the assets, their owners and their classification, and capture the legal, regulatory and contractual obligations that apply. The output is a set of stated security requirements, not a list of products.' },
              { term: '2. Risk assessment', def: 'Identify the threats to those assets and the vulnerabilities they could exploit, then estimate the likelihood and impact of each. This produces the ranked risk register that justifies everything spent in the later stages.' },
              { term: '3. Security architecture and design', def: 'Decide the structure of the protection: trust boundaries, where data is encrypted, how identity flows, where the monitoring points sit. This is where the design principles of note 25 — least privilege, defence in depth, fail-safe defaults — are applied.' },
              { term: '4. Control selection', def: 'Choose the specific technical, administrative and physical countermeasures that meet each requirement, and decide for each remaining risk whether it is mitigated, transferred, avoided or accepted.' },
              { term: '5. Implementation', def: 'Build and configure the controls, following secure development and secure configuration standards. Controls are documented here so that the people who operate them later know what they are for.' },
              { term: '6. Verification and validation', def: 'Test that the controls work and that they meet the stated requirements — code review, configuration audit, vulnerability scanning and penetration testing. Verification asks "was it built right"; validation asks "was the right thing built".' },
              { term: '7. Deployment and authorisation', def: 'Release the system into production, with management formally accepting the residual risk. This step is what makes the risk decision explicit and accountable rather than implicit.' },
              { term: '8. Operation, monitoring and maintenance', def: 'Run the controls, monitor them, patch, review access, and respond to incidents. The longest stage by far, and the one where most designs decay.' },
              { term: '9. Disposal', def: 'Retire the system and destroy or securely archive its data. A decommissioned server with readable disks undoes every stage before it.' },
            ],
          },
          {
            type: 'table',
            heading: '24.3 The Security Systems Development Life Cycle (SecSDLC)',
            headers: ['Phase', 'What happens', 'Key output'],
            rows: [
              ['Investigation', 'Management defines the problem, scope, objectives and constraints, and authorises the work', 'Programme charter, feasibility'],
              ['Analysis', 'Existing policies are reviewed and a risk assessment of current assets and threats is performed', 'Risk register, legal requirements'],
              ['Logical design', 'The security blueprint is drawn — what controls are needed, independent of product', 'Blueprint, incident and continuity plans'],
              ['Physical design', 'Specific technologies are evaluated and selected against the blueprint', 'Chosen controls, acceptance criteria'],
              ['Implementation', 'Controls are bought or built, configured, tested and staff are trained', 'Working, tested controls'],
              ['Maintenance and change', 'The system is monitored, tested and updated as threats and the business change', 'Continuous assurance'],
            ],
          },
          {
            type: 'text',
            text: 'The SecSDLC mirrors the ordinary systems development life cycle stage for stage. That is the point: security is not a separate project running alongside development, it is the same life cycle with security requirements carried through every phase of it.',
          },
          {
            type: 'termlist',
            heading: '24.4 Phases of the Security Management Life Cycle (Plan-Do-Check-Act)',
            items: [
              { term: 'Plan', def: 'Establish the information security management system. Define its scope and the security policy, identify and assess risks, select control objectives and controls, and obtain management approval for the residual risk.' },
              { term: 'Do', def: 'Implement and operate the ISMS. Deploy the selected controls, allocate resources and responsibilities, train staff, and run the day-to-day security operations and incident handling.' },
              { term: 'Check', def: 'Monitor and review. Measure control effectiveness, review logs and incidents, run internal audits and management reviews, and re-assess risk in the light of what the measurements show.' },
              { term: 'Act', def: 'Maintain and improve. Apply corrective and preventive action to the weaknesses found in Check, update the policy, controls and risk assessment, and re-enter Plan. The cycle never terminates.' },
            ],
          },
          {
            type: 'text',
            text: 'This is the life cycle of ISO/IEC 27001. Its significance is that security is treated as a continuous management cycle rather than a one-off implementation: a control that was adequate when it was deployed becomes inadequate as the threat changes, and only the Check and Act phases detect that.',
          },
          {
            type: 'termlist',
            heading: '24.5 The Operational Life Cycle (NIST Cybersecurity Framework)',
            items: [
              { term: 'Identify', def: 'Know the assets, data, people, suppliers and risks — you cannot protect what you have not catalogued.' },
              { term: 'Protect', def: 'Apply the safeguards: access control, awareness training, data security, maintenance, protective technology.' },
              { term: 'Detect', def: 'Discover events in a timely way through continuous monitoring, anomaly detection and detection processes.' },
              { term: 'Respond', def: 'Contain and mitigate a detected incident: response planning, communications, analysis, mitigation, improvement.' },
              { term: 'Recover', def: 'Restore capabilities and services, and feed the lessons back into planning.' },
            ],
          },
          {
            type: 'table',
            heading: '24.6 The Three Compared',
            headers: ['Model', 'Applies to', 'Phases', 'Answers'],
            rows: [
              ['Security design process / SecSDLC', 'One system being built', 'Investigation → Analysis → Logical design → Physical design → Implementation → Maintenance', 'How is security built into this system?'],
              ['Security management life cycle (PDCA)', 'The organisation’s whole security programme', 'Plan → Do → Check → Act', 'Is the programme still effective?'],
              ['Operational life cycle (NIST CSF)', 'Day-to-day security operations', 'Identify → Protect → Detect → Respond → Recover', 'What do we do about threats as they arrive?'],
            ],
          },
          {
            type: 'termlist',
            heading: '24.7 Lifecycle Security Management for Big Data',
            items: [
              { term: 'Create / collect', def: 'Classify the data at the point of capture and record its lawful basis and retention period. Everything downstream depends on this label existing.' },
              { term: 'Store', def: 'Encrypt at rest, replicate for availability, and apply access control at the storage layer rather than trusting each application to enforce it.' },
              { term: 'Use / process', def: 'Enforce least privilege on the processing cluster, mask or tokenise sensitive fields for analysts who do not need the real values, and log every access.' },
              { term: 'Share / transmit', def: 'Encrypt in transit, authenticate both ends, and control onward disclosure — including to the analytics tools and third parties the platform feeds.' },
              { term: 'Archive', def: 'Move cold data to cheaper storage without dropping its classification, and keep the keys needed to read it later.' },
              { term: 'Destroy', def: 'Delete securely when the retention period expires, across every replica and backup. Data destroyed in the warehouse but left in three caches has not been destroyed.' },
            ],
          },
          {
            type: 'note',
            text: 'The phrase "lifecycle security management" in the course outline means exactly this: security applied at every stage through which data passes, rather than at one boundary. It is the management-side statement of the same idea note 4 states technically — that big data must be protected at all stages because it is constantly in motion.',
          },
        ],
      },
      {
        number: '25',
        title: 'Information Security Policy, Principles and Methodologies',
        sections: [
          {
            type: 'note',
            text: 'Written from course outline item 6 — "basic policies on information security and methodologies; security risk management" — not from the printed workbook. See the note at the head of topic 23.',
          },
          {
            type: 'definition',
            heading: '25.1 Definition',
            text: 'An information security policy is a formal, management-approved statement of the rules governing how an organisation’s information and information systems are to be protected. It states what must be achieved and who is responsible for achieving it, and it derives its force from management authority rather than from technical enforcement.',
          },
          {
            type: 'text',
            text: 'Policy is the foundation of a security programme because every other element refers back to it. A control with no policy behind it cannot be justified when it is inconvenient; a breach of a rule that was never written down cannot be enforced against the person who breached it.',
          },
          {
            type: 'termlist',
            heading: '25.2 Policy, Standard, Procedure, Guideline',
            items: [
              { term: 'Policy', def: 'Mandatory. States what must be done and why. High level and technology-independent, so it survives the systems it governs. Example: "All confidential data must be encrypted at rest and in transit."' },
              { term: 'Standard', def: 'Mandatory. States the specific requirement that satisfies the policy. Example: "AES-256 is the approved algorithm for data at rest."' },
              { term: 'Procedure', def: 'Mandatory. The step-by-step instructions for carrying out the standard. Example: the numbered steps for enabling encryption on a new HDFS cluster.' },
              { term: 'Guideline', def: 'Advisory. Recommended practice where judgement is allowed. Example: "Prefer managed key services over self-hosted key stores where available."' },
            ],
          },
          {
            type: 'note',
            text: 'The distinction is examinable and easy to lose marks on. Policy says what and why; standard says to what specification; procedure says how, step by step; guideline says what is advisable. Only the first three are mandatory.',
          },
          {
            type: 'termlist',
            heading: '25.3 The Three Types of Information Security Policy',
            items: [
              { term: 'Enterprise Information Security Policy (EISP)', def: 'The organisation-wide policy, issued by executive management. Sets the strategic direction, scope, tone and allocation of responsibility for security across the whole organisation. There is one of these.' },
              { term: 'Issue-Specific Security Policy (ISSP)', def: 'Governs one particular technology or activity — acceptable use of email and the internet, remote working, use of personal devices, use of the analytics platform. There are many of these and they are updated often.' },
              { term: 'System-Specific Security Policy (SysSP)', def: 'The rules and configurations for one system: access control lists, firewall rulesets, database privileges. Often expressed directly as configuration rather than as prose.' },
            ],
          },
          {
            type: 'termlist',
            heading: '25.4 Components of an Information Security Policy',
            items: [
              { term: 'Purpose / objective', def: 'Why the policy exists and what it is intended to achieve. Without it, the rules read as arbitrary.' },
              { term: 'Scope', def: 'Who and what the policy applies to — which staff, contractors, systems, data and locations. Ambiguous scope is the most common reason a policy cannot be enforced.' },
              { term: 'Policy statements', def: 'The rules themselves, written as clear mandatory requirements using "must" and "must not" rather than "should where possible".' },
              { term: 'Roles and responsibilities', def: 'Who owns the policy, who owns each data set, who approves exceptions, and what is expected of every user. Named roles, not named individuals, so the policy survives staff changes.' },
              { term: 'Compliance and enforcement', def: 'How compliance is measured, and the consequences of breach — which must be stated for the policy to have any force in a disciplinary process.' },
              { term: 'Exceptions', def: 'The route by which a legitimate exception is requested, who may approve it, and for how long. Without a documented route, users create undocumented ones.' },
              { term: 'Review and revision', def: 'How often the policy is reviewed and who approves changes. A policy with no review date silently becomes obsolete.' },
              { term: 'Definitions and references', def: 'The terms used, and the laws, standards and other policies this one depends on.' },
              { term: 'Approval and effective date', def: 'The management sign-off and the date from which the policy applies. This is what converts a document into an instruction.' },
            ],
          },
          {
            type: 'table',
            heading: '25.5 Principles of Information Security and How They Protect Organisational Information',
            headers: ['Principle', 'What it requires', 'How it protects the organisation'],
            rows: [
              ['Least privilege', 'Every user and process gets the minimum access needed for its task, and no more', 'Caps the damage of any single compromised account — a stolen analyst login cannot delete the warehouse'],
              ['Need to know', 'Access is granted to specific data on demonstrated business need, not by seniority', 'Stops sensitive datasets spreading to staff who have no reason to hold them'],
              ['Separation of duties', 'No single person controls a whole sensitive transaction end to end', 'Makes fraud and unilateral abuse require collusion, which is far harder and easier to detect'],
              ['Defence in depth', 'Multiple independent layers of control, so no single failure is fatal', 'A bypassed firewall still leaves encryption, access control and monitoring in the attacker’s way'],
              ['Fail-safe defaults', 'Access is denied unless explicitly granted; on failure the system fails closed', 'A misconfiguration or crash leaves data inaccessible rather than exposed'],
              ['Complete mediation', 'Every access is checked against authority, every time — never cached and trusted', 'Prevents privilege that was revoked from continuing to work through a stale session'],
              ['Economy of mechanism', 'Keep security mechanisms as simple as possible', 'Simple controls can be reviewed and verified; complex ones hide flaws'],
              ['Open design', 'Security rests on the secrecy of keys, not on the secrecy of the design', 'Survives disclosure of the design, and allows the mechanism to be independently reviewed'],
              ['Psychological acceptability', 'Controls must be usable enough that staff do not route around them', 'An unusable control provides no protection, because it will not be used'],
              ['Accountability', 'Every action is attributable to a unique identity and logged', 'Enables detection, investigation and discipline — and deters insiders who know they are traceable'],
            ],
          },
          {
            type: 'definition',
            heading: '25.6 Information Security Methodologies',
            text: 'An information security methodology is a structured, repeatable framework for establishing, operating and assessing security, so that the result depends on the method rather than on the judgement of whoever happened to do the work.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'ISO/IEC 27001 and 27002', def: '27001 specifies the requirements for an information security management system, run on the Plan-Do-Check-Act cycle of note 24, and is the standard organisations are certified against. 27002 is the companion code of practice giving the control objectives and controls themselves.' },
              { term: 'NIST Cybersecurity Framework', def: 'Organises security around the five functions Identify, Protect, Detect, Respond and Recover, with implementation tiers describing how mature the practice is. Widely used as a common language between technical and executive staff.' },
              { term: 'NIST SP 800-53 and SP 800-37', def: '800-53 is a catalogue of security and privacy controls; 800-37 is the Risk Management Framework that selects, implements, assesses, authorises and monitors them across a system’s life.' },
              { term: 'COBIT', def: 'An IT governance framework. Broader than security alone, it aligns IT objectives, including security, with business objectives and is the usual vehicle when the audit function drives the programme.' },
              { term: 'OCTAVE', def: 'An asset- and operationally-focused risk assessment methodology, driven by the business units that own the assets rather than by the IT department, which makes the risk decisions the owners’ rather than IT’s.' },
              { term: 'ISO/IEC 27005', def: 'The information security risk management methodology used alongside 27001: context, identification, analysis, evaluation, treatment, acceptance, communication and monitoring.' },
              { term: 'Defence in depth', def: 'A design methodology rather than a governance one: layer independent controls so that penetrating one leaves the attacker facing the next.' },
              { term: 'Zero trust', def: 'Assume no implicit trust from network location. Authenticate and authorise every request, verify device posture, and segment aggressively. The natural fit for big data platforms, which have no meaningful perimeter.' },
            ],
          },
          {
            type: 'termlist',
            heading: '25.7 Security Risk Management',
            items: [
              { term: 'Risk identification', def: 'Inventory the assets, classify them, and identify the threats and vulnerabilities that apply to each.' },
              { term: 'Risk analysis', def: 'Estimate the likelihood of each threat and the impact if it materialises — qualitatively on a scale, or quantitatively as expected loss.' },
              { term: 'Risk evaluation', def: 'Rank the risks and compare them against the organisation’s stated risk appetite to decide which need treatment.' },
              { term: 'Risk treatment', def: 'Choose one of four responses: mitigate by applying controls, transfer by insurance or contract, avoid by not doing the activity, or accept the risk with documented management approval.' },
              { term: 'Residual risk', def: 'What remains after treatment. It must be explicitly accepted by management, not silently ignored — this is the step that makes the risk decision accountable.' },
              { term: 'Monitoring and review', def: 'Re-assess as assets, threats and controls change. A risk register that is a year old describes an organisation that no longer exists.' },
            ],
          },
          {
            type: 'bullets',
            heading: '25.8 Why Policies Fail',
            items: [
              'They are written but never distributed, so staff cannot comply with rules they have not read.',
              'They are not read or acknowledged, so breach cannot be enforced in a disciplinary process.',
              'They are unenforceable in practice, so they are ignored and the whole document loses authority.',
              'They conflict with how the work actually has to be done, so staff build undocumented workarounds.',
              'They are never reviewed, so they govern systems the organisation retired years ago.',
              'They have no named owner, so nobody updates them when the environment changes.',
            ],
          },
          {
            type: 'note',
            text: 'For a written question on "how the principles contribute to protecting organisational information", the marks are in the third column of the table in 25.5 — not in naming the principle. State the principle, say what it requires, then say what attack or failure it defeats.',
          },
        ],
      },
      {
        number: '26',
        title: 'Big Data Stages, Technologies and Adoption',
        sections: [
          {
            type: 'note',
            text: 'Written from course outline item 2 — "big data technology, platforms, components, and governance; using the cloud for big data" — not from the printed workbook. See the note at the head of topic 23.',
          },
          {
            type: 'definition',
            heading: '26.1 The Big Data Life Cycle',
            text: 'The big data life cycle is the sequence of stages through which data passes from the moment it is generated to the moment it is destroyed. Each stage transforms the data, and each stage has its own security exposure — which is why note 4 insists data must be protected at all stages rather than at a single boundary.',
          },
          {
            type: 'termlist',
            heading: '26.2 Stages of the Big Data Life Cycle',
            items: [
              { term: '1. Data generation', def: 'Data is produced at its sources — M2M sensors and IoT devices, people interacting with systems, and organisational transaction systems. The organisation usually does not control this stage, only what it accepts from it.' },
              { term: '2. Data acquisition / ingestion', def: 'Data is collected from those sources and moved into the platform, either in batches or as a continuous stream. This is where authentication of the source and validation of the payload belong.' },
              { term: '3. Data storage', def: 'Data is landed in a distributed file system, data lake or NoSQL store, replicated for durability. The store must handle structured, semi-structured and unstructured data together.' },
              { term: '4. Data cleaning and pre-processing', def: 'Missing values are handled, duplicates removed, formats normalised, and features scaled or encoded. Poor work here propagates into every result afterwards.' },
              { term: '5. Data processing and analysis', def: 'Batch or stream processing, statistical analysis and machine-learning modelling — the stage that produces the insight the platform exists for.' },
              { term: '6. Visualisation and interpretation', def: 'Results are turned into dashboards, charts and reports that a decision maker can act on. An insight nobody can read has produced no value.' },
              { term: '7. Archival and disposal', def: 'Cold data is moved to cheaper storage and, when its retention period expires, securely destroyed across every replica and backup.' },
            ],
          },
          {
            type: 'table',
            heading: '26.3 Security at Each Stage',
            headers: ['Stage', 'Principal exposure', 'Control that belongs there'],
            rows: [
              ['Generation', 'Spoofed or compromised source devices', 'Device authentication, signed telemetry'],
              ['Ingestion', 'Interception in transit; poisoned input', 'TLS, mutual authentication, schema and range validation'],
              ['Storage', 'Bulk theft of the data at rest', 'Encryption at rest, storage-layer access control, replication'],
              ['Cleaning', 'Analysts handling raw identifiers they do not need', 'Masking, tokenisation, pseudonymisation'],
              ['Processing / analysis', 'Over-privileged jobs and users; model poisoning', 'Least privilege on the cluster, job isolation, training-data integrity'],
              ['Visualisation', 'Over-disclosure through a dashboard', 'Row- and column-level access control, aggregation thresholds'],
              ['Archival / disposal', 'Forgotten copies and readable retired media', 'Retention schedule, key destruction, secure media disposal'],
            ],
          },
          {
            type: 'table',
            heading: '26.4 Big Data Technologies by Layer',
            headers: ['Layer', 'Purpose', 'Representative technologies'],
            rows: [
              ['Ingestion', 'Move data from sources into the platform', 'Apache Kafka, Flume, Sqoop, NiFi'],
              ['Storage', 'Hold large volumes durably and cheaply', 'HDFS, Amazon S3, HBase, Cassandra, MongoDB'],
              ['Batch processing', 'Process large accumulated datasets', 'MapReduce, Apache Hive, Apache Pig'],
              ['Stream processing', 'Process data as it arrives, in real time', 'Apache Storm, Apache Flink, Spark Streaming'],
              ['Resource management', 'Schedule work across the cluster', 'YARN, Apache Mesos, Kubernetes'],
              ['Analytics and ML', 'Model, predict and classify', 'Apache Spark and MLlib, scikit-learn, TensorFlow'],
              ['Visualisation', 'Present results to decision makers', 'Tableau, Power BI, Matplotlib, Seaborn'],
              ['Governance and security', 'Control, audit and catalogue access', 'Apache Ranger, Apache Sentry, Knox Gateway, Kerberos, Apache Atlas'],
            ],
          },
          {
            type: 'note',
            text: 'Note 2 gives the same technologies split a different way — Kafka, Storm and Flink as operational big data, Spark and BI tools as analytical. That split is by what the data is for; this one is by where the tool sits in the stack. Both can be asked.',
          },
          {
            type: 'termlist',
            heading: '26.5 Components of a Big Data Platform',
            items: [
              { term: 'Data sources', def: 'The systems, devices and people producing the data.' },
              { term: 'Ingestion layer', def: 'The pipelines that collect it and deliver it into the platform.' },
              { term: 'Storage layer', def: 'The distributed file system, data lake or NoSQL stores that hold it.' },
              { term: 'Processing layer', def: 'The batch and stream engines that transform and compute over it.' },
              { term: 'Analytics layer', def: 'The statistical, query and machine-learning tools that extract insight.' },
              { term: 'Visualisation layer', def: 'The dashboards and reports through which insight reaches decision makers.' },
              { term: 'Governance and security layer', def: 'Authentication, authorisation, encryption, auditing, lineage and data quality — cutting across every layer above rather than sitting between two of them.' },
            ],
          },
          {
            type: 'definition',
            heading: '26.6 Big Data Adoption',
            text: 'Big data adoption is the process by which an organisation moves from not using big data at all to running it as a routine part of how decisions are made. It is an organisational change as much as a technical one: the technology can be bought in a week, and the skills, data culture and governance take years.',
          },
          {
            type: 'termlist',
            heading: 'Drivers of Adoption',
            items: [
              { term: 'Competitive pressure', def: 'Rivals making faster and better-evidenced decisions force the organisation to match them.' },
              { term: 'Falling cost of storage and computing', def: 'Commodity hardware and cloud pricing brought analysis within reach of organisations that could never have afforded it.' },
              { term: 'Data availability', def: 'Mobile, social, IoT and transaction systems now generate far more data than the organisation was designed to use.' },
              { term: 'Customer expectation', def: 'Personalisation, real-time service and instant fraud alerts are expected, and all of them are analytics products.' },
              { term: 'Regulatory and risk demands', def: 'Anti-fraud, anti-money-laundering and reporting obligations increasingly require analysis at a scale only these platforms provide.' },
              { term: 'Maturity of the tools', def: 'Managed cloud services removed the need to build and operate a cluster before any analysis could start.' },
            ],
          },
          {
            type: 'termlist',
            heading: '26.7 Stages of Big Data Adoption',
            items: [
              { term: '1. Awareness / educate', def: 'The organisation is learning what big data is and what it might be worth. No investment yet, and no data initiative.' },
              { term: '2. Exploration / explore', def: 'A business case is developed, requirements and gaps are assessed, and a strategy is drafted.' },
              { term: '3. Engagement / pilot', def: 'A limited proof of concept is run on a real problem with a real dataset, to test value and feasibility at small scale.' },
              { term: '4. Execution / adoption', def: 'One or two big data initiatives are deployed into production, delivering value to a specific business function.' },
              { term: '5. Transformation / optimisation', def: 'Big data is embedded across the organisation: it is how decisions are routinely made, governance is mature, and the platform is continuously extended.' },
            ],
          },
          {
            type: 'bullets',
            heading: '26.8 Barriers to Adoption',
            items: [
              'Shortage of skills — the categories in note 3 are scarce and expensive, especially in combination.',
              'Cost of infrastructure and of the specialists to run it.',
              'Poor data quality, and data locked in departmental silos that will not join.',
              'Privacy, security and regulatory concerns, particularly where personal data crosses borders.',
              'Absence of a clear business case, so projects cannot show a return and lose funding.',
              'Cultural resistance — decision makers who trust experience over evidence.',
              'Weak data governance: no ownership, no classification, no lineage, so nobody can vouch for a result.',
              'Integration with legacy systems that were never designed to export their data.',
            ],
          },
          {
            type: 'bullets',
            heading: '26.9 Critical Success Factors',
            items: [
              'Visible executive sponsorship, and a business problem worth solving as the starting point rather than the technology.',
              'Start with a narrow pilot that can demonstrate value quickly, then extend.',
              'Data governance from the beginning — ownership, classification and quality — not retrofitted after the platform is full.',
              'Security and privacy designed in at each life-cycle stage, per topic 24.',
              'Investment in skills, both by hiring and by training the analysts already in the organisation.',
              'Results delivered in a form decision makers actually use, which is a communication problem as much as a technical one.',
            ],
          },
          {
            type: 'termlist',
            heading: '26.10 Using the Cloud for Big Data',
            items: [
              { term: 'Elasticity', def: 'Capacity is added for a large job and released afterwards, so the organisation stops paying for a cluster sized for its busiest hour.' },
              { term: 'No capital outlay', def: 'Storage and computing are rented, which removes the up-front investment that blocks most first big data projects.' },
              { term: 'Managed services', def: 'The provider operates the cluster, so a small team can run a platform that would otherwise need specialist staff.' },
              { term: 'Global reach', def: 'Data can be processed near where it is generated — which is also where data-residency law becomes a constraint.' },
              { term: 'The trade-off', def: 'Data leaves the organisation’s own infrastructure. Multi-tenancy, provider access, jurisdiction and vendor lock-in all become security and compliance questions that an on-premises cluster never raised.' },
            ],
          },
          {
            type: 'table',
            heading: '26.11 The Shared Responsibility Model',
            headers: ['Responsibility', 'Cloud provider', 'Customer'],
            rows: [
              ['Physical data centre and hardware', 'Yes', 'No'],
              ['Hypervisor, host OS, network infrastructure', 'Yes', 'No'],
              ['Guest OS patching (IaaS)', 'No', 'Yes'],
              ['Application and platform configuration', 'No', 'Yes'],
              ['Identity and access management', 'Provides the service', 'Configures who may access what'],
              ['Encryption of customer data and key management', 'Provides the service', 'Decides what is encrypted and controls the keys'],
              ['Classification of the data', 'No', 'Yes'],
            ],
          },
          {
            type: 'note',
            text: 'The rule the model reduces to: the provider is responsible for security *of* the cloud, and the customer for security *in* the cloud. Almost every publicised cloud data breach has been a customer-side misconfiguration — an open storage bucket, an over-permissive access policy — not a failure of the provider’s infrastructure.',
          },
        ],
      },
    ];
