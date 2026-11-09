// CYB 213 — Practice quiz bank, drawn topic by topic from
// src/data/lectureNotes/cyb213.js. Questions follow the lecture notes,
// including only material students can check in those notes.
// Every chapter matches a Notes heading. CourseQuiz draws a fresh sample
// and Quiz shuffles options per attempt; no answer depends on position.
// General MCQ practice: the examination format is not yet confirmed.

export const cyb213Quiz = [
  {
    "chapter": "Cybercrime: Definitions, Causes and Types",
    "question": "Which definition matches cybercrime in the notes?",
    "options": [
      "Illegal activity involving digital devices",
      "Any activity involving digital devices",
      "Only physical theft of computer equipment",
      "Only errors in a computer program"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime: Definitions, Causes and Types — Cybercrime: Cybercrime is illegal activity involving a computer, network or digital device."
  },
  {
    "chapter": "Cybercrime: Definitions, Causes and Types",
    "question": "Which is listed as a motivation for cybercrime?",
    "options": [
      "Data minimisation",
      "Revenge",
      "Patch management",
      "Evidence preservation"
    ],
    "correctIndex": 1,
    "explanation": "Cybercrime: Definitions, Causes and Types — Motivation of Cybercrime: The motivation list includes political reasoning, revenge, thrill seeking and state-sponsored attacks."
  },
  {
    "chapter": "Cybercrime: Definitions, Causes and Types",
    "question": "Which example is placed under computer or network as a target?",
    "options": [
      "Copyright infringement",
      "Sending unsolicited adverts",
      "DoS attack",
      "Spamming"
    ],
    "correctIndex": 2,
    "explanation": "Cybercrime: Definitions, Causes and Types — The Computer as a Tool or as a Target: The table places DoS attacks and malware in the target column."
  },
  {
    "chapter": "Cybercrime: Definitions, Causes and Types",
    "question": "Which set gives the three listed categories?",
    "options": [
      "Reconnaissance, delivery, installation",
      "Endpoint, network, application",
      "Persistent, volatile, original",
      "Property, individual, government"
    ],
    "correctIndex": 3,
    "explanation": "Cybercrime: Definitions, Causes and Types — Categories of Cybercrime: The Categories of Cybercrime list names property, individual and government."
  },
  {
    "chapter": "Cybercrime: Definitions, Causes and Types",
    "question": "Which listed threat concerns weaknesses in connected devices?",
    "options": [
      "IoT vulnerabilities",
      "Software piracy",
      "Cyber laundering",
      "Net extortion"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime: Definitions, Causes and Types — Cyber Security Threats: IoT vulnerabilities appear in the Cyber Security Threats list."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "What is the central idea of defence in depth?",
    "options": [
      "Only incident reporting",
      "Multiple security measures",
      "One perimeter firewall",
      "Only employee education"
    ],
    "correctIndex": 1,
    "explanation": "Cyber Defences: Defence in Depth — Cyber Defence in Depth: Defence in depth uses multiple security measures to safeguard organizational assets."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "Which tools keep operating systems and applications current?",
    "options": [
      "Privileged access tools",
      "Secret management tools",
      "Patch management tools",
      "Intrusion detection tools"
    ],
    "correctIndex": 2,
    "explanation": "Cyber Defences: Defence in Depth — Elements of Defence in Depth (Suitable for On-Premises IT Infrastructure): Patch management updates endpoints and addresses CVEs."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "Antivirus and EDR are examples of which element?",
    "options": [
      "Network security",
      "Patch management",
      "Adaptive authentication",
      "Endpoint security"
    ],
    "correctIndex": 3,
    "explanation": "Cyber Defences: Defence in Depth — Elements of Defence in Depth (Suitable for On-Premises IT Infrastructure): Endpoint security solutions include antivirus and Endpoint Detection and Response."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "Firewalls, VPNs and VLANs are grouped under which element?",
    "options": [
      "Network security",
      "Endpoint security",
      "Patch management",
      "Secret management"
    ],
    "correctIndex": 0,
    "explanation": "Cyber Defences: Defence in Depth — Elements of Defence in Depth (Suitable for On-Premises IT Infrastructure): The network security entry lists firewalls, VPNs and VLANs."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "Authentication varies with location, time and device. Which strategy is this?",
    "options": [
      "Secret rotation",
      "Adaptive MFA",
      "Patch management",
      "Network segmentation"
    ],
    "correctIndex": 1,
    "explanation": "Cyber Defences: Defence in Depth — Strategies: Adaptive multi-factor authentication uses contextual information and business rules to choose authentication factors."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "Which strategy protects credentials used by scripts and applications?",
    "options": [
      "Protect privileged access",
      "Adaptive authentication",
      "Secure developer tools",
      "Lock down critical endpoints"
    ],
    "correctIndex": 2,
    "explanation": "Cyber Defences: Defence in Depth — Strategies: Secure developer tools use secret management to protect, rotate and monitor non-human credentials."
  },
  {
    "chapter": "Cyber Defences: Defence in Depth",
    "question": "Restricting endpoint privilege to prevent lateral movement implements which strategy?",
    "options": [
      "Secure developer tools",
      "Adaptive authentication",
      "Public cloud deployment",
      "Lock down critical endpoints"
    ],
    "correctIndex": 3,
    "explanation": "Cyber Defences: Defence in Depth — Strategies: The endpoint strategy restricts privilege and helps prevent lateral movement and malware."
  },
  {
    "chapter": "Cybercrime as a Threat to National Critical Infrastructure",
    "question": "Which example fits the notes' definition of NCI?",
    "options": [
      "Water distribution network",
      "Personal photo collection",
      "Individual game preferences",
      "A local browser theme"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime as a Threat to National Critical Infrastructure — National Critical Infrastructure (NCI): NCI covers essential systems such as water, energy and telecommunications."
  },
  {
    "chapter": "Cybercrime as a Threat to National Critical Infrastructure",
    "question": "Why may a chemical plant require NCI protection even beyond daily service needs?",
    "options": [
      "Its choice of employee email provider",
      "Potential public health danger",
      "Its use of ordinary office software",
      "Its ability to publish advertisements"
    ],
    "correctIndex": 1,
    "explanation": "Cybercrime as a Threat to National Critical Infrastructure — National Critical Infrastructure (NCI): The notes include dangerous assets because attack or damage could create serious public health risks."
  },
  {
    "chapter": "Cybercrime as a Threat to National Critical Infrastructure",
    "question": "Which sector includes roads, bridges, airports and ports?",
    "options": [
      "Commercial facilities",
      "Government facilities",
      "Transportation",
      "Communications"
    ],
    "correctIndex": 2,
    "explanation": "Cybercrime as a Threat to National Critical Infrastructure — Sectors of NCI: Transportation is defined through these transport assets."
  },
  {
    "chapter": "Cybercrime as a Threat to National Critical Infrastructure",
    "question": "Manufacturing and supply chains for defence equipment belong to which sector?",
    "options": [
      "Government facilities",
      "Information technology",
      "Commercial facilities",
      "Defence industrial base"
    ],
    "correctIndex": 3,
    "explanation": "Cybercrime as a Threat to National Critical Infrastructure — Sectors of NCI: The Defence industrial base entry covers manufacturing and supply chains for defence equipment."
  },
  {
    "chapter": "Cybercrime as a Threat to National Critical Infrastructure",
    "question": "Which importance relates to withstanding attacks and natural disasters?",
    "options": [
      "Disaster resilience",
      "Economic stability",
      "Sector interdependence",
      "National security"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime as a Threat to National Critical Infrastructure — Importance of NCI: Disaster resilience is described as helping nations prevent and withstand attacks and disasters."
  },
  {
    "chapter": "Cybercrime as a Threat to National Critical Infrastructure",
    "question": "Which listed threat includes floods, storms and wildfire?",
    "options": [
      "Emerging technologies",
      "Natural disasters",
      "Regional conflicts",
      "Supply chain risks"
    ],
    "correctIndex": 1,
    "explanation": "Cybercrime as a Threat to National Critical Infrastructure — Threats to NCI: The natural-disaster entry names floods, storms, wildfire and climate effects."
  },
  {
    "chapter": "Investigation Process of Cybercrime",
    "question": "An employee exploits authorized company access to steal data. Which category fits?",
    "options": [
      "Cyber terrorist",
      "External cracker",
      "Insider attacker",
      "State-sponsored attacker"
    ],
    "correctIndex": 2,
    "explanation": "Investigation Process of Cybercrime — Description of Criminals: Insider attackers exploit employment-related access for theft, damage or other illegal activity."
  },
  {
    "chapter": "Investigation Process of Cybercrime",
    "question": "A nation attacks another country's systems for secret information. Which category fits?",
    "options": [
      "Insider attacker",
      "Independent investigator",
      "Private system administrator",
      "State-sponsored attacker"
    ],
    "correctIndex": 3,
    "explanation": "Investigation Process of Cybercrime — Description of Criminals: The state-sponsored entry covers information theft, disruption and competitive advantage by nations."
  },
  {
    "chapter": "Investigation Process of Cybercrime",
    "question": "Recovering deleted files and examining traffic logs belong to which technique?",
    "options": [
      "Digital forensics",
      "Witness interviewing",
      "Surveillance review",
      "Tracing money flows"
    ],
    "correctIndex": 0,
    "explanation": "Investigation Process of Cybercrime — Investigation Techniques of Cybercrime: Digital forensics preserves, collects and analyses digital evidence, including deleted files and logs."
  },
  {
    "chapter": "Investigation Process of Cybercrime",
    "question": "What does synergy among agencies and organizations mean here?",
    "options": [
      "Using only interviews instead of digital evidence",
      "Joint work by public and private bodies",
      "Replacing investigators with automated tools",
      "Keeping every investigation within one company"
    ],
    "correctIndex": 1,
    "explanation": "Investigation Process of Cybercrime — Investigation Techniques of Cybercrime: The notes describe cooperation among law enforcement, government and private cybersecurity firms."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Harvesting target information from social media is which stage?",
    "options": [
      "Exploitation",
      "Installation",
      "Reconnaissance",
      "Weaponisation"
    ],
    "correctIndex": 2,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Stage Setting for Cybercrime: Reconnaissance scans the environment and gathers information."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Pairing malicious code with an exploit is which stage?",
    "options": [
      "Reconnaissance",
      "Delivery",
      "Installation",
      "Weaponisation"
    ],
    "correctIndex": 3,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Stage Setting for Cybercrime: Weaponisation pairs code and an exploit to create a weapon."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Sending malware to a target through email or USB is which stage?",
    "options": [
      "Delivery",
      "Exploitation",
      "Installation",
      "Reconnaissance"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Stage Setting for Cybercrime: Delivery transmits the weapon or malware to the target."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "A delivered exploit is triggered to use a vulnerability. Which stage is this?",
    "options": [
      "Command and control",
      "Exploitation",
      "Weaponisation",
      "Delivery"
    ],
    "correctIndex": 1,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Stage Setting for Cybercrime: Exploitation triggers the delivered weapon to exploit a vulnerability."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Which stage creates a channel for remote manipulation of a victim?",
    "options": [
      "Weaponisation",
      "Reconnaissance",
      "Command and control",
      "Action on objectives"
    ],
    "correctIndex": 2,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Stage Setting for Cybercrime: Command and control establishes the remote command channel."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Researching an individual to craft a personal deceptive message is which attack?",
    "options": [
      "Deceptive phishing",
      "Whaling",
      "Generic spam",
      "Spear phishing"
    ],
    "correctIndex": 3,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Types of Phishing Attacks: Spear phishing researches a specific individual and creates a highly personalized message."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Which attack specifically targets high-profile individuals?",
    "options": [
      "Whaling",
      "Deceptive phishing",
      "Mass phishing",
      "Unresearched spam"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Types of Phishing Attacks: The Whaling entry specifies carefully planned phishing against high-profile individuals."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "One phishing email is sent widely with little research. Which type is described?",
    "options": [
      "Targeted impersonation",
      "Deceptive phishing",
      "Spear phishing",
      "Whaling"
    ],
    "correctIndex": 1,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Types of Phishing Attacks: Deceptive phishing sends a single email to many people, often without much research."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "How are instructions distributed in a decentralised botnet?",
    "options": [
      "Only by the victim's keyboard",
      "Only through a local backup",
      "Among the bots",
      "From one bot-herder server"
    ],
    "correctIndex": 2,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Botnet Attack Techniques: The notes contrast a single central server with instructions distributed among bots."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "What does the notes' virus description require for payload execution?",
    "options": [
      "A ransom paid before infection",
      "A network with no infected files",
      "A device with no running programs",
      "An active host running its code"
    ],
    "correctIndex": 3,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Computer Virus: The Computer Virus passage says the victim must run the code or payload and the host must be active."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Which type encrypts files and demands payment for a decryption key?",
    "options": [
      "Crypto ransomware",
      "Locker ransomware",
      "Double extortion ransomware",
      "Screen-locking malware"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Types of Ransomware: The Crypto ransomware entry links file encryption to a demand for a decryption key."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Which type blocks access rather than encrypting data?",
    "options": [
      "File-encrypting malware",
      "Locker ransomware",
      "Crypto ransomware",
      "Double extortion ransomware"
    ],
    "correctIndex": 1,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Types of Ransomware: Locker ransomware is a screen locker that blocks access instead of encrypting."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Which type combines encryption with a threat involving stolen data?",
    "options": [
      "Locker ransomware",
      "Screen-locking malware",
      "Double extortion ransomware",
      "Crypto ransomware"
    ],
    "correctIndex": 2,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Types of Ransomware: The double-extortion entry combines data encryption with the threat of data theft and publication."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "Why can a worm make systems unreliable or inaccessible as it spreads?",
    "options": [
      "It removes every vulnerable service",
      "It restores clean application settings",
      "It prevents all other malware from entering",
      "It consumes network bandwidth"
    ],
    "correctIndex": 3,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Worm: The Worm definition links replication and bandwidth consumption to overload and inaccessibility."
  },
  {
    "chapter": "Cybercrime Mode of Operation: Phishing and Malware",
    "question": "What immediately follows self-replication in the listed worm steps?",
    "options": [
      "Payload delivery",
      "Vulnerability exploitation",
      "Continuous spread",
      "Reconnaissance"
    ],
    "correctIndex": 0,
    "explanation": "Cybercrime Mode of Operation: Phishing and Malware — Steps of a Worm Attack: The sequence is vulnerability exploitation, self-replication, payload delivery and continuous spread."
  },
  {
    "chapter": "Countermeasures and Prevention Strategies",
    "question": "Which pair describes the stated prevention approaches?",
    "options": [
      "Only forensic reporting after prosecution",
      "Law enforcement and broad cooperation",
      "Only insurance and financial compensation",
      "Only password expiry and account removal"
    ],
    "correctIndex": 1,
    "explanation": "Countermeasures and Prevention Strategies — Cyber Security Strategies and Cybercrime Prevention Strategies: The passage combines law-enforcement responses with cooperation across governments, businesses, academia and the public."
  },
  {
    "chapter": "Countermeasures and Prevention Strategies",
    "question": "Which countermeasure directly addresses staff awareness?",
    "options": [
      "Endpoint Detection and Response",
      "Data encryption and backup",
      "Security awareness training",
      "Next Generation Firewall"
    ],
    "correctIndex": 2,
    "explanation": "Countermeasures and Prevention Strategies — Countermeasures: The list includes educating staff and security awareness training."
  },
  {
    "chapter": "Countermeasures and Prevention Strategies",
    "question": "Which pair is explicitly listed as a countermeasure?",
    "options": [
      "Publishing credentials and disabling logs",
      "Delaying patches and reducing monitoring",
      "Removing filters and ignoring alerts",
      "Encrypting and backing up data"
    ],
    "correctIndex": 3,
    "explanation": "Countermeasures and Prevention Strategies — Countermeasures: The Countermeasures list includes encrypting/backing up data."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "Which activity is characteristic of an OSN in the definition?",
    "options": [
      "Creating profiles and sharing content",
      "Only storing offline disk images",
      "Only executing local forensic tools",
      "Creating encrypted backups without interaction"
    ],
    "correctIndex": 0,
    "explanation": "Online Social Networks in Cybercrime Investigation — Online Social Networks (OSNs): OSNs enable profiles, interaction, content sharing and participation in online groups."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "Exploiting shared personal information to impersonate someone illustrates what?",
    "options": [
      "Network forensics",
      "Identity theft",
      "Cyberbullying",
      "Coordinated DDoS"
    ],
    "correctIndex": 1,
    "explanation": "Online Social Networks in Cybercrime Investigation — Overview of Cybercrime on Social Networks: The identity-theft entry says personal information shared online is exploited to steal identities."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "Which item is a listed digital footprint?",
    "options": [
      "An empty unopened storage device",
      "A printed blank investigation form",
      "Online purchase history",
      "An unpowered replacement keyboard"
    ],
    "correctIndex": 2,
    "explanation": "Online Social Networks in Cybercrime Investigation — Tracking Digital Footprints: The footprint definition includes visited websites, interactions, login information and online purchases."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "Which tool visualises links among people, phone numbers and email addresses?",
    "options": [
      "Hunchly",
      "Geofeedia",
      "Social Analyzer",
      "Maltego"
    ],
    "correctIndex": 3,
    "explanation": "Online Social Networks in Cybercrime Investigation — Tools for Social Network Investigation: Maltego provides data mining and link analysis to visualize entity relationships."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "Which tool captures and documents web pages while an investigator browses?",
    "options": [
      "Hunchly",
      "Maltego",
      "Geofeedia",
      "Social Analyzer"
    ],
    "correctIndex": 0,
    "explanation": "Online Social Networks in Cybercrime Investigation — Tools for Social Network Investigation: Hunchly helps gather and preserve online evidence by capturing browsed web pages."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "Which tool is described as location-based social media monitoring?",
    "options": [
      "Social Analyzer",
      "Geofeedia",
      "Maltego",
      "Hunchly"
    ],
    "correctIndex": 1,
    "explanation": "Online Social Networks in Cybercrime Investigation — Tools for Social Network Investigation: Geofeedia tracks and analyses social media content by geographic location."
  },
  {
    "chapter": "Online Social Networks in Cybercrime Investigation",
    "question": "What comes immediately after choosing a transform?",
    "options": [
      "Download and install",
      "Analyse the result",
      "Run the transform",
      "Create an account"
    ],
    "correctIndex": 2,
    "explanation": "Online Social Networks in Cybercrime Investigation — How to Use Maltego: The listed order is installation, account creation, choosing a transform, running it and analysing results."
  },
  {
    "chapter": "Cyber Terrorism",
    "question": "Which intention distinguishes the notes' definition of cyber terrorism?",
    "options": [
      "Routine improvement of network speed",
      "Accidental deletion of a private document",
      "Authorized testing of software performance",
      "Intimidation for ideological aims"
    ],
    "correctIndex": 3,
    "explanation": "Cyber Terrorism — Cyber Terrorism: The definition links network-based harm to intimidation for political, ideological or religious purposes."
  },
  {
    "chapter": "Cyber Terrorism",
    "question": "Which method is explicitly listed?",
    "options": [
      "Advanced Persistent Threat attacks",
      "Routine patch management",
      "Regular backup testing",
      "Multi-factor authentication"
    ],
    "correctIndex": 0,
    "explanation": "Cyber Terrorism — Methods Used for Cyber Terrorism: The methods list includes APT attacks and malware targeting IT control systems."
  },
  {
    "chapter": "Cyber Terrorism",
    "question": "Which action follows the notes' IoT advice?",
    "options": [
      "Allow anonymous administrative access",
      "Keep IoT devices off public networks",
      "Publish all IoT administrator credentials",
      "Disable updates on every connected device"
    ],
    "correctIndex": 1,
    "explanation": "Cyber Terrorism — Strategies to Defend Against Cyber Terrorism: The strategy says IoT devices should be secured and not accessible via public networks."
  },
  {
    "chapter": "Cyber Terrorism",
    "question": "Which listed sign merits investigation?",
    "options": [
      "Installation of an expected approved patch",
      "Creation of a documented user account",
      "Login attempts from strange locations",
      "Completion of a scheduled data backup"
    ],
    "correctIndex": 2,
    "explanation": "Cyber Terrorism — Signs to Notice on a Hacked System: The signs include logins or attempted logins from strange locations."
  },
  {
    "chapter": "Cyber Terrorism",
    "question": "Which account protection measure is explicitly listed?",
    "options": [
      "Sharing passwords with contacts",
      "Disabling service-provider alerts",
      "Removing recovery information",
      "Two-factor authentication"
    ],
    "correctIndex": 3,
    "explanation": "Cyber Terrorism — Defence Against Cyber Terrorism: The defence list includes setting up two-factor authentication."
  },
  {
    "chapter": "Computer Crime Investigation and Forensics",
    "question": "Which branch focuses on networks and traffic passing through them?",
    "options": [
      "Network forensics",
      "Forensic accounting",
      "Forensic archaeology",
      "Forensic dentistry"
    ],
    "correctIndex": 0,
    "explanation": "Computer Crime Investigation and Forensics — Computer Network and Forensic Investigation: Network forensics examines networks and traffic for malicious activities."
  },
  {
    "chapter": "Computer Crime Investigation and Forensics",
    "question": "What does digital or computer forensics investigate?",
    "options": [
      "Only medical causes of a person's death",
      "Data stored on digital devices",
      "Only physical evidence at excavation sites",
      "Only financial statements in paper ledgers"
    ],
    "correctIndex": 1,
    "explanation": "Computer Crime Investigation and Forensics — Computer Network and Forensic Investigation: The termlist defines digital/computer forensics through stored digital-device data."
  },
  {
    "chapter": "Computer Crime Investigation and Forensics",
    "question": "What do digital forensic tools enable?",
    "options": [
      "Guaranteed conviction from any seized device",
      "Creation of legal rules for every jurisdiction",
      "Retrieval and analysis of device information",
      "Automatic replacement of every investigator"
    ],
    "correctIndex": 2,
    "explanation": "Computer Crime Investigation and Forensics — Digital Forensic Tools: The notes describe retrieval, examination and analysis of information in electronic devices."
  },
  {
    "chapter": "Computer Crime Investigation and Forensics",
    "question": "Which is listed as a digital forensic tool?",
    "options": [
      "Geofeedia",
      "Social Analyzer",
      "Next Generation Firewall",
      "Volatility"
    ],
    "correctIndex": 3,
    "explanation": "Computer Crime Investigation and Forensics — Examples of Digital Forensic Tools: Volatility appears in the digital forensic tool list."
  },
  {
    "chapter": "Digital Evidence",
    "question": "Which information can constitute digital evidence in the definition?",
    "options": [
      "Data stored, received or transmitted electronically",
      "Only data printed and signed by a witness",
      "Only original files recovered from a hard drive",
      "Only messages copied from a confiscated phone"
    ],
    "correctIndex": 0,
    "explanation": "Digital Evidence — Digital Evidence: The definition includes information stored on, received by or transmitted by an electronic device."
  },
  {
    "chapter": "Digital Evidence",
    "question": "Which is explicitly listed as electronic evidence?",
    "options": [
      "A sealed empty evidence bag",
      "Metadata",
      "A blank paper label",
      "An unused power cable"
    ],
    "correctIndex": 1,
    "explanation": "Digital Evidence — Electronic Evidence: The Electronic Evidence definition lists files, logs, emails, metadata and internet history."
  },
  {
    "chapter": "Digital Evidence",
    "question": "Why may a running system require prompt evidence capture?",
    "options": [
      "Guaranteed admissibility",
      "Unlimited reproducibility",
      "Data volatility",
      "Storage permanence"
    ],
    "correctIndex": 2,
    "explanation": "Digital Evidence — Challenges of Digital Evidence Collection: Data volatility means crucial evidence can be altered or lost without prompt capture."
  },
  {
    "chapter": "Digital Evidence",
    "question": "Which example fits persistent data?",
    "options": [
      "Data only in RAM",
      "Data only in registers",
      "Data only in cache",
      "Data on a local hard drive"
    ],
    "correctIndex": 3,
    "explanation": "Digital Evidence — Types of Collection: Persistent data resides on non-volatile storage such as a local hard drive."
  },
  {
    "chapter": "Digital Evidence",
    "question": "What happens to the described volatile data when power is turned off?",
    "options": [
      "It is lost",
      "It becomes permanent",
      "It moves to a hard drive",
      "It becomes a printed record"
    ],
    "correctIndex": 0,
    "explanation": "Digital Evidence — Types of Collection: The notes describe register, cache and RAM data as volatile and lost on shutdown."
  },
  {
    "chapter": "Digital Evidence",
    "question": "Which order matches the listed process?",
    "options": [
      "Data collection, reporting, analysis",
      "Data collection, analysis, reporting",
      "Analysis, reporting, data collection",
      "Reporting, data collection, analysis"
    ],
    "correctIndex": 1,
    "explanation": "Digital Evidence — Process of Digital Evidence Collection: The process list gives collection, then analysis, then reporting."
  },
  {
    "chapter": "Cyber Law",
    "question": "Which phrase describes cyber law?",
    "options": [
      "Only methods for analysing network logs",
      "A catalogue of malicious software types",
      "Rules governing digital activities",
      "Only rules for replacing hardware"
    ],
    "correctIndex": 2,
    "explanation": "Cyber Law — Cyber Law: Cyber law, also called internet or digital law, governs digital activities."
  },
  {
    "chapter": "Cyber Law",
    "question": "Which type focuses on personal information protection?",
    "options": [
      "E-commerce law",
      "Cyber contracts law",
      "Intellectual property law",
      "Privacy law"
    ],
    "correctIndex": 3,
    "explanation": "Cyber Law — Types of Cyber Law: The privacy-law entry protects personal information against unauthorized access and use."
  },
  {
    "chapter": "Cyber Law",
    "question": "Which type defines offences and penalties for cybercriminals?",
    "options": [
      "Cybercrime laws",
      "Privacy laws",
      "E-signature laws",
      "Social media laws"
    ],
    "correctIndex": 0,
    "explanation": "Cyber Law — Types of Cyber Law: The cybercrime-laws entry defines and penalizes cybercrimes."
  },
  {
    "chapter": "Cyber Law",
    "question": "Which is explicitly listed as a benefit?",
    "options": [
      "Allowing unrestricted use of personal data",
      "Intellectual property protection",
      "Removing security standards",
      "Replacing all technical safeguards"
    ],
    "correctIndex": 1,
    "explanation": "Cyber Law — Benefits of Cyber Law: The benefits list includes intellectual property protection."
  },
  {
    "chapter": "The Cyber Law Framework in Nigeria: Challenges and Opportunities",
    "question": "Which 2015 Act is the main framework named in this lecture?",
    "options": [
      "Evidence Act",
      "A standalone Cybercrime Advisory Council Act",
      "Cybercrimes (Prohibition, Prevention, etc.) Act",
      "Nigeria Data Protection Act"
    ],
    "correctIndex": 2,
    "explanation": "The Cyber Law Framework in Nigeria: Challenges and Opportunities — General Cyber Law Framework: The framework passage names the Cybercrimes Act 2015; the adjacent note says to read it with the 2024 amendment and 2023 data protection law."
  },
  {
    "chapter": "The Cyber Law Framework in Nigeria: Challenges and Opportunities",
    "question": "Which is a listed challenge?",
    "options": [
      "Universal digital literacy",
      "Unlimited investigative resources",
      "Identical laws across borders",
      "Limited expertise"
    ],
    "correctIndex": 3,
    "explanation": "The Cyber Law Framework in Nigeria: Challenges and Opportunities — Challenges for Cyber Law and Countermeasures in Nigeria: The challenges include limited expertise, resources, awareness and cross-border issues."
  },
  {
    "chapter": "The Cyber Law Framework in Nigeria: Challenges and Opportunities",
    "question": "Which role is listed as a cyber-law opportunity?",
    "options": [
      "Cybersecurity compliance officer",
      "Defence equipment manufacturer",
      "Power transmission operator",
      "Wastewater treatment technician"
    ],
    "correctIndex": 0,
    "explanation": "The Cyber Law Framework in Nigeria: Challenges and Opportunities — Cyber Law Opportunities in Nigeria: The opportunities list includes a cybersecurity compliance officer."
  },
  {
    "chapter": "The Cyber Law Framework in Nigeria: Challenges and Opportunities",
    "question": "Which activity is in the Council's summarized mandate?",
    "options": [
      "Guarantee every digital record is admissible",
      "Provide general policy guidelines",
      "Personally investigate every cyber incident",
      "Replace all national evidence legislation"
    ],
    "correctIndex": 1,
    "explanation": "The Cyber Law Framework in Nigeria: Challenges and Opportunities — The Cybercrime Advisory Council (CAC): The summarized mandate includes formulating and providing general policy guidelines."
  },
  {
    "chapter": "The Cyber Law Framework in Nigeria: Challenges and Opportunities",
    "question": "Which education-related activity is in the Council's summarized mandate?",
    "options": [
      "Require every graduate to become a lawyer",
      "Limit cybersecurity training to private firms",
      "Promote graduate cybersecurity traineeship",
      "Replace all university computing degrees"
    ],
    "correctIndex": 2,
    "explanation": "The Cyber Law Framework in Nigeria: Challenges and Opportunities — The Cybercrime Advisory Council (CAC): The mandate explicitly includes graduate traineeship in cybersecurity."
  }
];
