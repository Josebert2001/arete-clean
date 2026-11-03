// CYB 213 — Cybercrime, Law and Countermeasures
// Transcribed from the lecturer's handwritten notes (44 scanned pages, dated
// 8/1/2026 to 29/1/2026 where a date is written), spelling and grammar lightly
// normalised. Topic number = the order in the notes.
//
// Where the notes state something technically or legally loose — "Write Once,
// Read Many" as the meaning of worm, typosquatting described as pharming, a
// recovery procedure that would reinstall the malware — the wording is kept
// and a `note` section ("Added for clarity") says what is accurate. Wording
// that could not be confidently interpreted ("VIP 2.0", "Harm assault",
// "E-commerce defamation") is left as written and flagged, not replaced.
//
// Both diagrams in the scans restate the surrounding text (botnet → individual
// / team, and the four worm steps), so they are not reproduced.
//
// Which syllabus items each topic reaches is recorded on the course as
// `noteCoverage` (courses.js), not here.

export const cyb213LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 1 — CYBERCRIME: DEFINITIONS, CAUSES AND TYPES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'Cybercrime: Definitions, Causes and Types',
    sections: [
      {
        type: 'definition',
        heading: 'Cybercrime',
        text: 'Cybercrime is any illegal activity that involves a computer, a computer network or digital devices.',
      },
      {
        type: 'bullets',
        heading: 'It Can Encompass a Wide Range of Activities, Including',
        items: ['1. Theft.', '2. Fraud.', '3. Extortion.', '4. Disruption.'],
      },
      {
        type: 'text',
        text: 'Cybercrime can also be defined as the illegal use of any communication device to commit, or to facilitate committing, any illegal act. It is explained as a type of crime that targets or uses a computer or a group of computers under one network.',
      },
      {
        type: 'bullets',
        heading: 'Causes of Cybercrime in Nigeria',
        items: ['1. Unemployment.', '2. Desire for wealth.', '3. The lack of a strong cybercrime law.', '4. Inadequate security measures.'],
      },
      {
        type: 'note',
        text: 'This list is the lecture\'s own assessment, not the result of a cited study.',
      },
      {
        type: 'bullets',
        heading: 'Motivation of Cybercrime',
        items: ['1. Political or ideological reasoning.', '2. Revenge.', '3. Thrill seeking.', '4. State-sponsored attacks.'],
      },
      {
        type: 'casestudy',
        title: 'Assignment 1',
        prompt: 'Summarise the history of cybercrime by decade.',
      },
      {
        type: 'bullets',
        heading: 'Types of Cybercrimes',
        items: [
          '1. Hacking.',
          '2. Phishing.',
          '3. Identity theft.',
          '4. Malware.',
          '5. Denial of Service (DoS) attack.',
          '6. Virus dissemination.',
          '7. Software piracy.',
          '8. Net extortion.',
          'Also: cyber trespassing, cyber contraband, cyber terrorism, cyber laundering, cyber theft, cyber pornography, data breaches.',
        ],
      },
      {
        type: 'note',
        text: 'Hacking is a crime only when it is unauthorised — authorised penetration testing is a profession. Likewise, in the next list it is copyright infringement, not copyright, that is the offence.',
      },
      {
        type: 'table',
        heading: 'The Computer as a Tool or as a Target',
        headers: ['Computer or network as a tool', 'Computer or network as a target'],
        rows: [
          ['Copyright', 'DoS attack'],
          ['Spamming', 'Malware'],
        ],
      },
      {
        type: 'bullets',
        heading: 'Categories of Cybercrime',
        items: ['Property.', 'Individual.', 'Government.'],
      },
      {
        type: 'bullets',
        heading: 'System Target',
        items: ['Virus.', 'Worms.', 'Trojan horses.'],
      },
      {
        type: 'bullets',
        heading: 'Cyber Security Threats',
        items: [
          '1. Ransomware attacks.',
          '2. Internet of Things (IoT) vulnerabilities.',
          '3. Social engineering and phishing attacks.',
          '4. Supply chain attacks.',
          '5. AI-powered cyber threats.',
          '6. Advanced Persistent Threats (APTs).',
          '7. Zero-day exploits.',
          '8. Cloud security risks.',
          '9. Mobile malware and vulnerabilities.',
          '10. Insider threats.',
          '11. Artificial Intelligence (AI) misuse.',
          '12. Data breaches and privacy violations.',
          '13. Advanced phishing techniques.',
          '14. Nation-state cyber attacks.',
          '15. Cryptocurrency-related threats.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Assignment 2',
        prompt: 'Explain each of the threats above.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 2 — CYBER DEFENCES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2',
    title: 'Cyber Defences: Defence in Depth',
    sections: [
      {
        type: 'definition',
        heading: 'Cyber Defence in Depth',
        text: 'Cyber defence in depth is a strategy that uses multiple security measures to safeguard all of an organisation\'s assets.',
      },
      {
        type: 'termlist',
        heading: 'Elements of Defence in Depth (Suitable for On-Premises IT Infrastructure)',
        items: [
          { term: 'Endpoint security solutions', def: 'Such as antivirus software and Endpoint Detection and Response (EDR) tools, to defend against threats.' },
          { term: 'Patch management tools', def: 'Used to ensure that endpoint operating systems and applications are kept up to date, and to address Common Vulnerabilities and Exposures (CVEs).' },
          { term: 'Network security solutions', def: 'Including firewalls, VPNs, VLANs, etc., used to protect traditional enterprise networks and on-premises IT systems.' },
          { term: 'Intrusion detection/prevention (IDS/IPS) tools', def: 'Used to detect malicious activity and prevent attacks in traditional on-premises IT infrastructure.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Defence in Depth in the Digital Era — Where Assets Now Live',
        items: ['Data centres.', 'Private clouds.', 'Public clouds and SaaS (AWS, Azure, GCP).', 'Microsoft 365, Google Workspace.'],
      },
      {
        type: 'termlist',
        heading: 'Strategies',
        items: [
          { term: 'Protect privileged access', def: 'Using privileged access management solutions to monitor and secure access to privileged accounts — local and domain administrator accounts, and application administrative accounts — by both human and non-human identities such as applications, scripts and bots.' },
          { term: 'Lock down critical endpoints', def: 'Using advanced endpoint privilege management solutions to restrict privilege across all endpoints, prevent lateral movement, and defend against ransomware and other malware.' },
          { term: 'Adaptive multi-factor authentication', def: 'Using contextual information like location, time of day, IP address and device type, along with business rules, to decide which authentication factors to apply to a specific user in a particular situation.' },
          { term: 'Secure developer tools', def: 'Using secret management solutions to protect, manage, rotate and monitor secrets and other credentials used by applications, automation scripts and other non-human identities.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 3 — NATIONAL CRITICAL INFRASTRUCTURE
  // ─────────────────────────────────────────────────────────────────
  {
    number: '3',
    title: 'Cybercrime as a Threat to National Critical Infrastructure',
    sections: [
      {
        type: 'definition',
        heading: 'National Critical Infrastructure (NCI)',
        text: 'National Critical Infrastructure includes the essential systems, facilities and networks that are crucial for a country and its economy to function properly — for example water, the energy sector and telecommunication networks.',
      },
      {
        type: 'text',
        text: 'NCI also covers assets that may not be necessary for daily life but require protection because of their potential danger, such as nuclear power stations or chemical plants that could pose a serious public health risk if attacked or damaged.',
      },
      {
        type: 'termlist',
        heading: 'Sectors of NCI',
        items: [
          { term: 'Defence industrial base', def: 'Manufacturing and supply chain for defence equipment.' },
          { term: 'Energy', def: 'Power generation, transmission and distribution.' },
          { term: 'Water and wastewater', def: 'Treatment, distribution and disposal.' },
          { term: 'Transportation', def: 'Roads, bridges, airports, railways and ports.' },
          { term: 'Government facilities', def: 'Federal, state and local government buildings and operations.' },
          { term: 'Banking and finance', def: 'Financial institutions and markets.' },
          { term: 'Healthcare and public health', def: 'Hospitals, clinics and public health systems.' },
          { term: 'Dams', def: 'Hydropower generation and flood control.' },
          { term: 'Food and agriculture', def: 'Production, processing and distribution.' },
          { term: 'Nuclear reactors, materials and waste', def: 'Nuclear power plants and related facilities.' },
          { term: 'Chemical', def: 'Manufacturing, storage and transportation of chemicals.' },
          { term: 'Information technology', def: 'IT systems and infrastructure.' },
          { term: 'Communications', def: 'Telecommunications, internet and broadcasting.' },
          { term: 'Commercial facilities', def: 'Large commercial buildings and complexes.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Safeguarding NCI',
        text: 'Ghosting or the Gold Standard (GS) approach: backing up the data of an infected hard drive, transferring the data onto a new hard drive, and reinstalling all user applications and settings.',
      },
      {
        type: 'note',
        text: 'Do not follow this as a recovery procedure: copying an infected drive\'s applications and settings can carry the malware across. Preserve any evidence you need, then rebuild from known-clean systems and backups, checking for persistence and reinfection (see the CISA ransomware guide).',
      },
      {
        type: 'bullets',
        heading: 'Importance of NCI',
        items: [
          '1. National security: NCI plays a crucial role in supporting national defence and security operations.',
          '2. Public safety: NCI provides essential services like water, electricity, healthcare and transportation; any disruption could seriously affect the safety and wellbeing of the population.',
          '3. Economic stability.',
          '4. Disaster resilience: NCI helps nations prevent and withstand terrorist attacks, cyber attacks and natural disasters.',
          '5. Sector interdependence.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Threats to NCI',
        items: [
          '1. Vandalism: NCI may face vandalism, terrorism or sabotage from internal staff or external malicious actors.',
          '2. Natural disasters: such as floods, storms, wildfire and climate change effects.',
          '3. Regional conflicts.',
          '4. Supply chain risks.',
          '5. Emerging technologies: artificial intelligence and quantum computing may introduce new threats to NCI, requiring continuous research and protective measures.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 4 — INVESTIGATION PROCESS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '4',
    title: 'Investigation Process of Cybercrime',
    sections: [
      {
        type: 'definition',
        heading: 'Computer Cybercrime Investigation',
        text: 'Investigating computer crimes involves finding and stopping illegal activities that occur on computers and digital devices. The process requires special tools and methods to analyse crimes such as hacking, phishing, malware, data breaches and identity theft.',
      },
      {
        type: 'termlist',
        heading: 'Description of Criminals',
        items: [
          { term: 'Cyber terrorists', def: 'Individuals or groups who carry out attacks over the internet for various reasons.' },
          { term: 'Insider attackers', def: 'Employees or part-time workers who exploit their access to company data or networks to steal, damage property or commit other illegal activities.' },
          { term: 'Cyber crackers/hackers', def: 'Individuals skilled in computers who break into systems without authorisation to steal information or cause damage.' },
          { term: 'State-sponsored attackers', def: 'Some nations attack the computer systems of other countries to gain secret information, disrupt operations or gain a competitive advantage.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Investigation Techniques of Cybercrime',
        items: [
          { term: 'Digital forensics', def: 'Preserving, collecting and analysing digital evidence. It may include recovering deleted files, examining data details, or investigating network traffic logs. Special software such as EnCase, FTK and Autopsy is used.' },
          { term: 'Alternative methods', def: 'Interviewing witnesses; analysing surveillance camera footage; tracing the flow of money; social engineering.' },
          { term: 'Synergy among agencies and organisations', def: 'Law enforcement, government entities and private cyber security firms working together.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 5 — MODE OF OPERATION (8/1/2026, 9/1/2026)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '5',
    title: 'Cybercrime Mode of Operation: Phishing and Malware',
    sections: [
      {
        type: 'termlist',
        heading: 'Stage Setting for Cybercrime',
        date: '8/1/2026',
        items: [
          { term: '1. Reconnaissance', def: 'Scanning the environment, e.g. harvesting information from social media.' },
          { term: '2. Weaponisation', def: 'Pairing malicious code with an exploit to create a weapon.' },
          { term: '3. Delivery', def: 'Transmitting the weapon or malware to a target via email, USB or website.' },
          { term: '4. Exploitation', def: 'Once delivered, the weapon or malware code is triggered by an action, to exploit the vulnerability.' },
          { term: '5. Installation', def: 'The weapon installs malware on the system.' },
          { term: '6. Command and control', def: 'A command channel for remote manipulation of the victim.' },
          { term: '7. Action on objectives', def: 'With hands-on access, the attacker can achieve their objective.' },
        ],
      },
      {
        type: 'note',
        text: 'These seven stages are the Cyber Kill Chain, published by Lockheed Martin in 2011 ("Intelligence-Driven Computer Network Defense"). Knowing the name helps when an exam question asks for it.',
      },
      {
        type: 'bullets',
        heading: 'In Short',
        items: ['Preparation to attack.', 'Initiate the attack.', 'Evasion.', 'Gathering information.'],
      },
      {
        type: 'text',
        heading: 'Strategies of Cybercrime Perpetrators',
        text: 'Phishing attack techniques include spear phishing, which involves finding out information about the target, using it to build a connection with the target, and using that connection to make the target perform an action.',
      },
      {
        type: 'termlist',
        heading: 'Types of Phishing Attacks',
        items: [
          { term: 'Pharming', def: 'The attacker clones a domain name of the real site, hoping that the target will mistype the URL.' },
          { term: 'Deceptive phishing', def: 'Sending a single phishing email to many people, often without much research.' },
          { term: 'Spear phishing', def: 'The attacker researches a specific individual to craft a highly personalised, convincing message, often impersonating a trusted source to trick the victim into revealing sensitive data.' },
          { term: 'Whaling', def: 'Targets high-profile individuals with carefully planned phishing.' },
        ],
      },
      {
        type: 'note',
        text: 'A lookalike domain that waits for a mistyped URL is typosquatting. Pharming proper redirects users to a fraudulent site by technical means — poisoning DNS, or altering a victim\'s hosts file — so even a correctly typed address lands on the fake site (NIST glossary).',
      },
      {
        type: 'bullets',
        heading: 'Malware Attack Techniques — Stages',
        items: ['1. Entry point.', '2. Breaking in.', '3. Takeover.', '4. Infection.', '5. Execution.'],
      },
      {
        type: 'termlist',
        heading: 'Types of Malware Attacks',
        items: [
          { term: 'Botnet', def: 'Programs that infiltrate computers and create a network of compromised devices controlled by a central server.' },
          { term: 'Ransomware', def: 'Locks the victim\'s computer, demanding payment to regain access. Typically used for financial gain.' },
          { term: 'Computer virus', def: 'Duplicates itself and spreads rapidly.' },
          { term: 'Worm', def: 'Duplicates and spreads without user intervention.' },
        ],
      },
      {
        type: 'text',
        heading: 'Botnet',
        date: '9/1/2026',
        text: 'Botnet attacks operate using a command-and-control system that enables hackers to control infected devices, like zombie bots, from a remote location. A botnet may be run by an individual or a team.',
      },
      {
        type: 'text',
        heading: 'Botnet Attack Techniques',
        text: 'Centralised model: a centralised botnet attack is carried out by a single server acting as the bot herder, while in a decentralised botnet attack the responsibility for giving instructions is distributed among the bots in the botnet.',
      },
      {
        type: 'bullets',
        items: ['Finding a vulnerable website/application.', 'Infecting user devices.', 'Mobilising the botnet.'],
      },
      {
        type: 'note',
        text: 'Strictly, a botnet is the network of compromised devices itself, not a program; the malware on each device is the bot.',
      },
      {
        type: 'text',
        heading: 'Computer Virus',
        text: 'These programs spread through infected programs/files and wait for commands to execute. A crucial aspect of any computer virus is that it needs a victim to run its code or payload, which requires the host to be active.',
      },
      {
        type: 'bullets',
        heading: 'Computer Virus Attack Techniques',
        items: ['USB drives, hard drives.', 'File downloads from the internet.', 'Email messages.'],
      },
      {
        type: 'bullets',
        heading: 'Signs of Computer Virus Attacks',
        items: [
          '1. Mass volume of emails sent from the user\'s email account.',
          '2. Crashing of devices.',
          '3. Changes to the computer\'s homepage.',
          '4. Pop-up windows.',
          '5. Account being logged out.',
          '6. Slowness in system speed.',
          '7. Programs self-executing.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Types of Viruses',
        items: [
          'Web scripting viruses.',
          'Direct action.',
          'Network viruses.',
          'Overwrite viruses.',
          'Resident viruses.',
          'Browser hijacker.',
          'File infector.',
          'Multipartite viruses.',
          'Boot sector viruses.',
        ],
      },
      {
        type: 'definition',
        heading: 'Ransomware',
        text: 'Ransomware is a type of malware that encrypts the victim\'s personal data until a ransom is paid.',
      },
      {
        type: 'bullets',
        heading: 'Ransomware Attack Techniques',
        items: [
          'Mostly spread through social media, social engineering tactics or software vulnerabilities.',
          'Attackers commonly use phishing emails containing harmful attachments or links to infect victims\' devices.',
          'Can also spread through unpatched software vulnerabilities such as exposed Remote Desktop Protocol (RDP), insecure websites, or outdated software.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Types of Ransomware',
        items: [
          { term: 'Double extortion ransomware', def: 'Combines data encryption with the threat of data theft. These attackers mostly target businesses, as publishing sensitive data can have serious financial and reputational consequences.' },
          { term: 'Crypto ransomware', def: 'Encrypts the victim\'s files and then demands a ransom payment in exchange for a decryption key.' },
          { term: 'Locker ransomware', def: 'Also known as a screen locker; blocks access to the victim\'s system or specific files instead of encrypting them.' },
        ],
      },
      {
        type: 'note',
        text: 'The opening definition says ransomware encrypts data, but locker ransomware (above) blocks access without encrypting. The broader definition: ransomware denies access to data or systems — by encryption or by locking — until a ransom is paid.',
      },
      {
        type: 'definition',
        heading: 'Worm',
        text: 'A worm is malicious software that can quickly replicate and spread through devices on a network. It consumes bandwidth as it spreads, which can overload infected systems and make them unreliable and inaccessible. It can modify or delete data, as well as introduce other malware.',
      },
      {
        type: 'note',
        text: 'The notes expand worm as "Write Once, Read Many". That is WORM, a storage term (media that can be written once and then only read) — it has nothing to do with the malware, whose name is just the English word.',
      },
      {
        type: 'bullets',
        heading: 'Worm Attack Techniques',
        items: [
          'Can spread through worms. [As written; the sentence is circular.]',
          'Exploit social engineering tactics to trick users into opening malicious files.',
          'Can also spread via removable drives such as USB drives, taking advantage of the automatic sending and receiving of files on networked computers.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Steps of a Worm Attack',
        items: ['1. Vulnerability exploitation.', '2. Self-replication.', '3. Payload delivery.', '4. Continuous spread.'],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 6 — COUNTERMEASURES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '6',
    title: 'Countermeasures and Prevention Strategies',
    sections: [
      {
        type: 'text',
        heading: 'Cyber Security Strategies and Cybercrime Prevention Strategies',
        text: 'Cybercrime prevention strategies involve efforts to address cybercrime directly or indirectly. They include (1) law enforcement responses, and (2) promoting cooperation between governments, businesses, academic institutions, organisations and the public to control and reduce cybercrime.',
      },
      {
        type: 'bullets',
        heading: 'Countermeasures',
        items: [
          'Keep software updated.',
          'Use a Next Generation Firewall (NGFW).',
          'Educate staff and employees.',
          'Install spam filters and anti-malware software.',
          'Encrypt / back up data.',
          'Consider cyber security insurance.',
          'Protect confidential data.',
          'Use Endpoint Detection and Response (EDR).',
          'Security awareness training.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 7 — ONLINE SOCIAL NETWORKS (12/1/2026, 15/1/2026)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '7',
    title: 'Online Social Networks in Cybercrime Investigation',
    sections: [
      {
        type: 'definition',
        heading: 'Online Social Networks (OSNs)',
        date: '12/1/2026',
        text: 'Online Social Networks are web-based platforms where individuals create profiles, interact with friends, share content such as posts, photos and videos, and take part in online groups. They allow user communication and content distribution — which also exposes their users to vulnerabilities and online security challenges.',
      },
      {
        type: 'termlist',
        heading: 'Overview of Cybercrime on Social Networks',
        items: [
          { term: 'Cyberstalking', def: 'Individuals use the platforms to threaten others.' },
          { term: 'Identity theft', def: 'Personal information shared online is exploited to steal identities.' },
          { term: 'Online fraud', def: 'Includes scams such as phishing schemes.' },
          { term: 'Coordinated cyber attacks', def: 'Such as Distributed Denial of Service (DDoS) attacks.' },
          { term: 'Cyberbullying', def: 'Using the platforms to harass, humiliate or intimidate others.' },
        ],
      },
      {
        type: 'text',
        heading: 'Investigative Techniques in Social Networks',
        text: 'Investigators can monitor social media activities without arousing suspicion, gather evidence, and identify potential networks of criminal collaborators.',
      },
      {
        type: 'bullets',
        heading: 'Steps in Investigation',
        items: [
          '1. Investigators start by finding a suspect\'s social media account using basic search techniques and specialised investigation tools such as Maltego.',
          '2. They analyse posts, connections and activity to uncover potential evidence such as incriminating messages, photos or geotagged locations.',
          '3. Open source intelligence (OSINT) techniques.',
        ],
      },
      {
        type: 'text',
        text: 'Maltego is an open source intelligence and forensic tool for cybercrime investigation.',
      },
      {
        type: 'note',
        text: '"Open source intelligence" means intelligence gathered from publicly available sources — it does not mean the tool is open-source software. Maltego is a commercial product with a limited free edition.',
      },
      {
        type: 'bullets',
        heading: 'How to Use Maltego',
        items: [
          '1. Download and install.',
          '2. Create an account.',
          '3. Choose a transform — e.g. search for an account, or profile.',
          '4. Run the transform.',
          '5. Analyse the result.',
        ],
      },
      {
        type: 'definition',
        heading: 'Tracking Digital Footprints',
        text: 'The technique of observing and analysing the traces of data that people leave behind when they engage in online activities. This footprint comprises websites visited, social media interactions, login information, online purchases, etc.',
      },
      {
        type: 'termlist',
        heading: 'Tools for Social Network Investigation',
        date: '15/1/2026',
        items: [
          { term: 'Maltego', def: 'A data mining and link analysis tool used in cybercrime investigation and intelligence collection. It helps visualise relationships between entities such as people, phone numbers, email addresses and social media accounts, so online interactions can be tracked easily.' },
          { term: 'Hunchly', def: 'Helps investigators capture and document web pages while browsing, so that online evidence is gathered and preserved for legal purposes.' },
          { term: 'Social Analyzer', def: 'An open-source tool that lets investigators analyse and observe social media profiles across social media platforms.' },
          { term: 'Geofeedia', def: 'A location-based social media monitoring tool that helps users track, analyse and record social media content based on geographic location.' },
        ],
      },
      {
        type: 'note',
        text: 'The notes say Hunchly guarantees that evidence is fit for legal purposes. No tool can guarantee admissibility — that depends on how the evidence was collected, its documented chain of custody, and the court.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 8 — CYBER TERRORISM
  // ─────────────────────────────────────────────────────────────────
  {
    number: '8',
    title: 'Cyber Terrorism',
    sections: [
      {
        type: 'definition',
        heading: 'Cyber Terrorism',
        text: 'Cyber terrorism refers to the use of computer networks and internet technology to disrupt, destroy or damage critical infrastructure, computer systems or electronic data, with the intention of intimidating individuals, organisations or governments for political, ideological or religious purposes.',
      },
      {
        type: 'bullets',
        heading: 'Cyber Terrorism Tactics',
        items: ['1. Hijacking.', '2. Kidnapping.', '3. Bombing.', '4. Assassination.', '5. Harm assault [wording as written].', '6. Barricade hostage.'],
      },
      {
        type: 'note',
        text: 'These are the classic tactics of terrorism in general. They are not themselves cyber attacks — cyber terrorism uses computer networks to achieve the same aim of intimidation.',
      },
      {
        type: 'bullets',
        heading: 'Methods Used for Cyber Terrorism',
        items: [
          'Advanced Persistent Threat (APT) attacks.',
          'The use of computer viruses, worms and malware to target IT control systems.',
          'Examples: 1. Unauthorised access into computer systems or devices. 2. Phishing attacks. 3. Disruption of major websites. 4. Cyber espionage.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Strategies to Defend Against Cyber Terrorism',
        items: [
          'Ensure IoT devices are secured and not accessible via public networks.',
          'Regular backup and continuous monitoring of network infrastructure.',
          'Ensure or enforce strict password authentication procedures.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Signs to Notice on a Hacked System',
        items: ['1. Being logged out of an account.', '2. Logins or attempted logins from strange locations.'],
      },
      {
        type: 'bullets',
        heading: 'Defence Against Cyber Terrorism',
        items: [
          '1. Keep your devices updated.',
          '2. Contact your service provider.',
          '3. Change passwords regularly.',
          '4. Set up two-factor authentication.',
          '5. Notify your contacts about a blocked account.',
        ],
      },
      {
        type: 'note',
        text: 'Current guidance (NIST SP 800-63B) no longer recommends changing passwords on a schedule — only when there is evidence of compromise. A strong, unique password per account plus multi-factor authentication does more than routine expiry.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 9 — COMPUTER CRIME INVESTIGATION AND FORENSICS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '9',
    title: 'Computer Crime Investigation and Forensics',
    sections: [
      {
        type: 'termlist',
        heading: 'Computer Network and Forensic Investigation',
        items: [
          { term: 'Forensics', def: 'Using science and technology to investigate and establish facts in criminal and civil court cases.' },
          { term: 'Network forensics', def: 'A subset of digital forensics that focuses on examining networks and the traffic passing through them to identify potential malicious activities.' },
          { term: 'Digital or computer forensics', def: 'Investigating and analysing data that is stored on digital devices.' },
          { term: 'Forensic investigation', def: 'The scientific techniques used to solve crime. It involves gathering and analysing physical evidence related to a crime to determine a suspect.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Types of Forensic Investigations',
        items: [
          '1. Forensic accounting/auditing.',
          '2. Computer or cyber forensics.',
          '3. Crime scene forensics.',
          '4. Forensic archaeology.',
          '5. Forensic dentistry.',
          '6. Forensic entomology.',
          '7. Forensic pathology.',
          '8. Forensic psychology.',
          '9. Forensic science.',
          '10. Forensic toxicology.',
          '11. Forensic graphology.',
        ],
      },
      {
        type: 'text',
        heading: 'Digital Forensic Tools',
        text: 'Digital forensic software is a set of tools specially designed to investigate digital devices. These tools enable the retrieval, examination and analysis of information stored in electronic devices like computers, phones, etc.',
      },
      {
        type: 'bullets',
        heading: 'Examples of Digital Forensic Tools',
        items: [
          'Autopsy.',
          'Forensic Toolkit (FTK).',
          'VIP 2.0 [name as written].',
          'Sleuth Kit.',
          'Cellebrite UFED.',
          'X-Ways Forensics.',
          'Volatility.',
          'Magnet AXIOM.',
          'OSForensics.',
          'Paladin Forensic Suite.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Questions',
        tasks: [
          'Briefly describe cyber terrorism and the strategies to defend against it.',
          'Differentiate between the different types of forensic investigations.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 10 — DIGITAL EVIDENCE
  // ─────────────────────────────────────────────────────────────────
  {
    number: '10',
    title: 'Digital Evidence',
    sections: [
      {
        type: 'definition',
        heading: 'Digital Evidence',
        text: 'Digital evidence refers to valuable information and data for an investigator that is stored on, received by or transmitted by an electronic device.',
      },
      {
        type: 'text',
        text: 'This evidence is obtained when electronic devices are confiscated and secured for analysis. Digital evidence is hidden, like fingerprints or DNA evidence; it easily crosses jurisdictional borders; and it can be altered, damaged or destroyed with minimal effort.',
      },
      {
        type: 'note',
        text: 'Digital evidence is not limited to confiscated devices — it can also be lawfully collected from networks, cloud services and service providers. Wherever it comes from, keep its provenance, integrity (e.g. hash values) and a documented chain of custody.',
      },
      {
        type: 'definition',
        heading: 'Electronic Evidence',
        text: 'In cyber forensics, electronic evidence is any digital data that is valuable for investigating cybercrimes or legal matters. This can include files, logs, emails, metadata and internet history.',
      },
      {
        type: 'text',
        text: 'Forensic experts use their knowledge and techniques to analyse digital artefacts found on seized devices like computers, Solid State Drives (SSDs), hard drives, Compact Disc Read-Only Memory (CD-ROMs) and USB flash drives, as well as electronic documents such as emails, images, chat logs and phone logs.',
      },
      {
        type: 'termlist',
        heading: 'Challenges of Digital Evidence Collection',
        items: [
          { term: 'Data volatility', def: 'Crucial evidence can easily be altered or lost if not captured promptly from a running system.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Process of Digital Evidence Collection',
        items: ['1. Data collection.', '2. Analysis.', '3. Reporting.'],
      },
      {
        type: 'termlist',
        heading: 'Types of Collection',
        items: [
          { term: 'Persistent data', def: 'Data stored on a non-volatile storage device, such as a local hard drive.' },
          { term: 'Volatile data', def: 'Data stored in volatile memory — registers, cache, RAM — that is lost when the computer is turned off.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Types of Evidence',
        items: [
          { term: 'Real evidence', def: 'Includes physical items.' },
          { term: 'Hearsay evidence', def: 'Out-of-court statements offered to prove the truth of a matter in court.' },
          { term: 'Original evidence', def: 'Involves statements made by individuals.' },
          { term: 'Testimony', def: 'When a witness swears an oath in court and gives their statement.' },
        ],
      },
      {
        type: 'note',
        text: 'These are simplified definitions. What each kind of evidence means, and whether it is admissible, depends on the evidence law that applies — in Nigeria, the Evidence Act 2011, whose section 84 governs computer-generated evidence.',
      },
      {
        type: 'text',
        heading: 'Digital Evidence Evaluation Criteria',
        text: 'The ITSEC evaluation criteria are used to assess security methods that protect the integrity of digital evidence. The ITSEC model includes nine sub-criteria used to evaluate integrity protection mechanisms across three categories:',
      },
      {
        type: 'bullets',
        items: [
          'Security properties.',
          'Time binding.',
          'Accuracy.',
          'Strength of mechanism.',
          'Computational efficiency.',
          'Binding of functionality.',
          'Ease of use, complexity or simplicity.',
          'Identification and authentication.',
          'Attacks and vulnerability assessment.',
        ],
      },
      {
        type: 'note',
        text: 'The notes do not name the three categories, and attributing these nine sub-criteria to ITSEC (the 1991 European IT security evaluation criteria) could not be confirmed from the standard itself. Learn the list as the lecture gives it.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 11 — CYBER LAW (29/1/2026)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '11',
    title: 'Cyber Law',
    sections: [
      {
        type: 'definition',
        heading: 'Cyber Law',
        date: '29/1/2026',
        text: 'Cyber law, also known as internet law or digital law, refers to the legal rules and regulations that govern digital activities.',
      },
      {
        type: 'bullets',
        heading: 'Benefits of Cyber Law',
        items: [
          '1. Protection against cybercrime.',
          '2. Data privacy.',
          '3. E-commerce regulation.',
          '4. Intellectual property protection.',
          '5. Cyber security standards.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Types of Cyber Law',
        items: [
          '1. Privacy law: focuses on protecting individuals\' personal information from unauthorised access and use.',
          '2. Cybercrime laws: define and penalise various cybercrimes, ensuring legal consequences for offenders.',
          '3. Intellectual property law.',
          '4. E-commerce law.',
          '5. Cyber defamation.',
          '6. Cyber security laws.',
          '7. Social media laws.',
          '8. Cyber contracts and e-signature laws.',
          '9. International cyber laws.',
          '10. Data breach notification law.',
        ],
      },
      {
        type: 'text',
        heading: 'Cyber Law Application',
        text: 'Cyber law covers a wide range of legal issues related to the internet, technology and digital communication. Some general areas of application include:',
      },
      {
        type: 'bullets',
        items: [
          'Privacy protection.',
          'Cyber security.',
          'Intellectual property rights.',
          'Online harassment.',
          'E-commerce defamation [wording as written].',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 12 — CYBER LAW IN NIGERIA
  // ─────────────────────────────────────────────────────────────────
  {
    number: '12',
    title: 'The Cyber Law Framework in Nigeria: Challenges and Opportunities',
    sections: [
      {
        type: 'text',
        heading: 'General Cyber Law Framework',
        text: 'Nigeria\'s cyber law is mainly based on the Cybercrimes (Prohibition, Prevention, etc.) Act of 2015. This law offers a complete legal structure for dealing with cybercrime and related matters in the country.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Definition of cybercrime', def: 'The Act outlines various cybercrimes, including cyberstalking, cyberbullying, identity theft, computer fraud and cyber terrorism.' },
          { term: 'Penalties', def: 'The Act describes penalties for the different cybercrimes, ranging from fines to imprisonment.' },
        ],
      },
      {
        type: 'note',
        text: 'Read the 2015 Act together with the Cybercrimes (Prohibition, Prevention, etc.) (Amendment) Act 2024, which revised several offences and penalties, and with the Nigeria Data Protection Act 2023. The final assignment below asks for exactly this.',
      },
      {
        type: 'bullets',
        heading: 'Challenges for Cyber Law and Countermeasures in Nigeria',
        items: [
          '1. Outdated legislation.',
          '2. Emerging cybercrimes.',
          '3. Lack of resources.',
          '4. Cross-border issues.',
          '5. Limited expertise.',
          '6. Low digital literacy.',
          '7. Lack of awareness.',
          '8. Financial losses.',
          '9. Reputational damage.',
          '10. Corruption and impunity.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Cyber Law Opportunities in Nigeria',
        items: [
          '1. Cyber security lawyer.',
          '2. Cybercrime investigator.',
          '3. Cyber security consultant.',
          '4. Cyber law researcher.',
          '5. Cyber security compliance officer.',
        ],
      },
      {
        type: 'text',
        heading: 'The Cybercrime Advisory Council (CAC)',
        text: 'The Cybercrime Advisory Council was created by the Cybercrimes Act 2015 to develop policy and guidelines. Under section 43, the Act gives it the following mandate:',
      },
      {
        type: 'bullets',
        items: [
          'Formulate and provide general policy guidelines.',
          'Promote graduate traineeship in cyber security.',
          'Create an enabling environment for members to share knowledge.',
          'Advise on measures to prevent and combat computer-related offences, cybercrime and threats.',
        ],
      },
      {
        type: 'note',
        text: 'This is a summary of section 43, not its full statutory wording; ngCERT publishes the Council\'s official description.',
      },
      {
        type: 'casestudy',
        title: 'Assignment',
        prompt: 'Using the Cybercrimes Act 2015 together with the 2024 Amendment Act, briefly outline in tabular format the different cybercrimes or offences and their penalties — fines and imprisonment.',
      },
    ],
  },
];
