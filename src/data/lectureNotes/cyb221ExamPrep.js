// UUY-CYB 221 — Written (non-CBT) exam preparation bank.
//
// The course already ships an MCQ bank (cyb221Quiz.js) for CBT practice.
// This is the other half: the forms a written script actually uses —
// "define", "list and explain any five", "with the aid of a diagram",
// "differentiate between", "state the steps" — each with a full model
// answer and a per-point mark scheme the student ticks off against what
// they wrote. Self-marking is the skill an MCQ never teaches, and it
// works with no network and no AI call.
//
// Every question is drawn from src/data/lectureNotes/cyb221.js, which is a
// verbatim transcription of the departmental Laboratory Manual. `source`
// names the topic and the section heading to re-read, because the manual's
// headings carry no numbers — see that file's header for why.
//
// Where the manual states something the standard definition contradicts,
// the model answer follows the manual and the mark scheme says so, with the
// correction beside it. A student sits HIS paper; they should also know
// what an external examiner expects. The three places this bites are Triple
// DES ("168-bit Data Encryption Standard"), AH and non-repudiation, and the
// SYN flood called a DDoS.
//
// `figure` paths point at the manual's own diagrams under
// public/lecture-notes/cyb-221/, shown on reveal so a student can compare
// their sketch with the real thing.
//
// Mark values in each markScheme entry sum to the question's `marks`.

export const cyb221ExamPrep = [
  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 1 — THREATS, VULNERABILITIES AND THE CIA TRIAD
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 · Classification of Threats',
    question: 'Define a cyber-attack. State the TWO broad categories into which cyber-attacks are classified, and explain any FIVE web-based attacks.',
    modelAnswer: "A cyber-attack is an exploitation of computer systems and networks. It uses malicious code to alter computer code, logic or data and lead to cybercrimes, such as information and identity theft. Cyber-attacks are classified into two categories: web-based attacks, which occur on a website or web application, and system-based attacks, which are intended to compromise a computer or a computer network. Web-based attacks include: Injection attacks — data is injected into a web application to manipulate it and fetch the required information, for example SQL injection, code injection, log injection and XML injection. DNS spoofing — data is introduced into a DNS resolver's cache causing the name server to return an incorrect IP address, diverting traffic to the attacker's computer; it can continue undetected for a long period. Session hijacking — an attack on a user session over a protected network; web applications create cookies to store state and user sessions, and by stealing the cookies an attacker gains access to all of the user's data. Phishing — an attempt to steal sensitive information such as login credentials and credit card numbers by masquerading as a trustworthy entity in an electronic communication. Brute force — a trial-and-error method that generates a large number of guesses and validates them to obtain actual data such as a password or PIN. Denial of service — makes a server or network resource unavailable to users by flooding the target with traffic or sending information that triggers a crash, using a single system and a single internet connection; it is sub-divided into volume-based, protocol and application-layer attacks. URL interpretation — changing parts of a URL so the web server delivers pages the attacker is not authorized to browse. File inclusion attacks — abusing the include functionality to access unauthorized files on the web server or execute malicious files there. Man in the middle — the attacker intercepts the connection between client and server and acts as a bridge, gaining the ability to read, insert and modify data.",
    markScheme: [
      'Cyber-attack defined — exploitation of computer systems and networks using malicious code to alter code, logic or data (2)',
      'Both categories named: web-based and system-based (1)',
      'First web-based attack named and explained (1.4)',
      'Second web-based attack named and explained (1.4)',
      'Third web-based attack named and explained (1.4)',
      'Fourth web-based attack named and explained (1.4)',
      'Fifth web-based attack named and explained (1.4)',
    ],
  },

  {
    type: 'recall',
    marks: 10,
    source: 'Topic 1 · Classification of Threats',
    question: 'Name the TEN web-based attacks given in the manual.',
    items: [
      { name: 'Injection attacks', aliases: ['injection', 'sql injection'], explain: 'Data is injected into a web application to manipulate it and fetch information — SQL, code, log and XML injection.' },
      { name: 'DNS Spoofing', aliases: ['dns spoof', 'dns cache poisoning'], explain: 'Data is introduced into a DNS resolver’s cache so the name server returns an incorrect IP address, diverting traffic to the attacker.' },
      { name: 'Session Hijacking', aliases: ['session hijack'], explain: 'An attack on a user session over a protected network; stealing the cookies gives the attacker all of the user’s data.' },
      { name: 'Phishing', aliases: [], explain: 'Stealing credentials or card numbers by masquerading as a trustworthy entity in an electronic communication.' },
      { name: 'Brute force', aliases: ['bruteforce'], explain: 'Trial and error — generate a large number of guesses and validate them to obtain a password or PIN.' },
      { name: 'Denial of Service', aliases: ['dos'], explain: 'Makes a server or network resource unavailable by flooding it from a single system and single connection.' },
      { name: 'Dictionary attacks', aliases: ['dictionary attack'], explain: 'Stores a list of commonly used passwords and validates them to get the original password.' },
      { name: 'URL Interpretation', aliases: ['url manipulation'], explain: 'Changing parts of a URL to make the web server deliver pages the attacker is not authorized to browse.' },
      { name: 'File Inclusion attacks', aliases: ['file inclusion'], explain: 'Abusing the include functionality to reach unauthorized files or execute malicious files on the web server.' },
      { name: 'Man in the middle attacks', aliases: ['mitm', 'man-in-the-middle'], explain: 'The attacker intercepts the client-server connection and acts as a bridge, able to read, insert and modify data.' },
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 · Classification of Threats',
    question: 'List and explain the FIVE system-based attacks.',
    modelAnswer: "System-based attacks are the attacks which are intended to compromise a computer or a computer network. Virus — a type of malicious software program that spreads throughout the computer files without the knowledge of a user; it is self-replicating, replicating by inserting copies of itself into other computer programs when executed, and it can also execute instructions that cause harm to the system. Worm — a type of malware whose primary function is to replicate itself to spread to uninfected computers; it works the same as a computer virus and worms often originate from email attachments that appear to be from trusted senders. Trojan horse — a malicious program that causes unexpected changes to computer settings and unusual activity even when the computer should be idle; it misleads the user of its true intent, appearing to be a normal application while malicious code runs in the background when it is opened or executed. Backdoors — a method that bypasses the normal authentication process; a developer may create a backdoor so that an application or operating system can be accessed for troubleshooting or other purposes. Bots — short for robot, an automated process that interacts with other network services; some bot programs run automatically while others execute commands only when they receive specific input, common examples being the crawler, chatroom bots and malicious bots.",
    markScheme: [
      'Virus named and explained — self-replicating, inserts copies into other programs (2)',
      'Worm named and explained — replicates itself to spread to uninfected computers, often via email attachments (2)',
      'Trojan horse named and explained — misleads the user, malicious code runs in the background (2)',
      'Backdoors named and explained — bypasses the normal authentication process (2)',
      'Bots named and explained — automated process interacting with network services (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 · The 7 Layers of Cyber Security',
    figure: '/lecture-notes/cyb-221/seven-layers.webp',
    question: 'With the aid of a diagram, state and explain the SEVEN layers of cyber security.',
    modelAnswer: "The seven layers of cyber security should centre on the mission critical assets you are seeking to protect, and are drawn as concentric rings around them. Mission critical assets — this is the data you need to protect, and it sits at the centre. Data security — data security controls protect the storage and transfer of data. Application security — applications security controls protect access to an application, an application's access to your mission critical assets, and the internal security of the application. Endpoint security — endpoint security controls protect the connection between devices and the network. Network security — network security controls protect an organization's network and prevent unauthorized access of the network. Perimeter security — perimeter security controls include both the physical and digital security methodologies that protect the business overall. The human layer — humans are the weakest link in any cyber security posture; human security controls include phishing simulations and access management controls that protect mission critical assets from a wide variety of human threats, including cyber criminals, malicious insiders and negligent users.",
    markScheme: [
      'Mission critical assets — the data being protected, at the centre (1)',
      'Data security — protects storage and transfer of data (1)',
      'Application security — protects access to the application and its access to critical assets (1)',
      'Endpoint security — protects the connection between devices and the network (1)',
      'Network security — protects the network and prevents unauthorized access (1)',
      'Perimeter security — physical and digital methods protecting the business overall (1)',
      'The human layer — humans are the weakest link; phishing simulations and access management (1.5)',
      'Diagram drawn as concentric layers with mission critical assets at the centre (1.5)',
      'Layers given in the correct order rather than as an unordered list (1)',
    ],
  },

  {
    type: 'recall',
    marks: 7,
    source: 'Topic 1 · The 7 Layers of Cyber Security',
    question: 'Name the seven layers of cyber security, working outwards from the centre.',
    items: [
      { name: 'Mission Critical Assets', aliases: ['mission critical', 'critical assets'], explain: 'The data you need to protect — the centre every other layer surrounds.' },
      { name: 'Data Security', aliases: [], explain: 'Controls protecting the storage and transfer of data.' },
      { name: 'Application Security', aliases: [], explain: 'Controls protecting access to an application, its access to critical assets, and its internal security.' },
      { name: 'Endpoint Security', aliases: [], explain: 'Controls protecting the connection between devices and the network.' },
      { name: 'Network Security', aliases: [], explain: 'Controls protecting the organization’s network and preventing unauthorized access to it.' },
      { name: 'Perimeter Security', aliases: [], explain: 'Physical and digital security methodologies that protect the business overall.' },
      { name: 'The Human Layer', aliases: ['human layer', 'humans'], explain: 'The weakest link — phishing simulations and access management controls against criminals, malicious insiders and negligent users.' },
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 1 · Vulnerability, Threat, Harmful Acts',
    question: 'Distinguish between a cyber threat, a vulnerability and a risk. State any FOUR types of vulnerability in network security and the THREE categories of vulnerability.',
    modelAnswer: "Cyber threats are security incidents or circumstances with the potential to have a negative outcome for your network or other data management systems — for example a phishing attack that results in the installation of malware that infects your data, the failure of a staff member to follow data protection protocols, or a tornado that takes down the company's data headquarters. Vulnerabilities are the gaps or weaknesses in a system that make those threats possible and tempt threat actors to exploit them. Risk is what cyber security experts call threat probability multiplied by the potential loss that may result. Types of vulnerability in network security include, but are not limited to: SQL injections; server misconfigurations; cross-site scripting; and transmitting sensitive data in a non-encrypted plain text format. The three categories of vulnerability are: corrupted, which is a loss of integrity; leaky, which is a loss of confidentiality; and unavailable or very slow, which is a loss of availability.",
    markScheme: [
      'Threat defined — an incident or circumstance with the potential for a negative outcome (1.5)',
      'Vulnerability defined — the gap or weakness that makes the threat possible (1.5)',
      'Risk defined — threat probability multiplied by potential loss (1.5)',
      'Any two types of vulnerability named (1)',
      'Two further types of vulnerability named (1)',
      'Corrupted — loss of integrity (0.833)',
      'Leaky — loss of confidentiality (0.833)',
      'Unavailable or very slow — loss of availability (0.834)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 · CIA Triad',
    question: 'Explain the CIA Triad, and state the limitation of viewing security through it alone.',
    modelAnswer: "The CIA Triad is a security model that has been developed to help people think about various parts of IT security. Confidentiality — it is crucial for people to protect their sensitive, private information from unauthorized access. Protecting confidentiality depends on being able to define and enforce certain access levels for information; in some cases this involves separating information into collections organized by who needs access and how sensitive that information is, that is, the amount of damage suffered if confidentiality were breached. The most common means of managing confidentiality include access control lists, volume and file encryption, and Unix file permissions. Integrity — designed to protect data from deletion or modification by any unauthorized party, and it ensures that when an authorized person makes a change that should not have been made, the damage can be reversed. Availability — refers to the actual availability of your data; authentication mechanisms, access channels and systems all have to work properly for the information they protect to be available when it is needed. The limitation is that the CIA Triad is all about information: while this is considered the core factor of the majority of IT security, it promotes a limited view that ignores other important factors. For example, even though availability serves to make sure you do not lose access to the resources needed to provide information, thinking about information security in itself does not guarantee that someone else has not used your hardware resources without authorization. It is therefore important to understand both what the CIA Triad offers and the limitations it presents.",
    markScheme: [
      'Purpose of the model stated — helps people think about the various parts of IT security (1)',
      'Confidentiality explained — protecting sensitive information from unauthorized access (1.5)',
      'Means of managing confidentiality given — access control lists, encryption, file permissions (1)',
      'Integrity explained — protection from unauthorized deletion or modification (1.5)',
      'Integrity answer includes reversibility of an unauthorized change (0.5)',
      'Availability explained — data available when needed, mechanisms working properly (1.5)',
      'Limitation stated — the triad addresses information only and ignores other factors (2)',
      'The hardware-resources example, or an equivalent, given (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 · Assets and Threat',
    figure: '/lecture-notes/cyb-221/cyber-attacker-actions.webp',
    question: 'Define an asset and a threat. With the aid of a diagram, describe the THREE types of action from which operational cyber security risks arise, and the THREE categories of motivation behind deliberate actions.',
    modelAnswer: "An asset is any data, device or other component of an organization's systems that is valuable, often because it contains sensitive data or can be used to access such information. An employee's desktop computer, laptop or company phone would be considered an asset, as would applications on those devices; likewise critical infrastructure such as servers and support systems. An organization's most common assets are information assets — databases and physical files, the sensitive data that you store. A threat is any incident that could negatively affect an asset, for example if it is lost, knocked offline or accessed by an unauthorized party; threats compromise the confidentiality, integrity or availability of an asset and can be either intentional or accidental. Operational cyber security risks arise from three types of action: inadvertent actions, generally by insiders, taken without malicious or harmful intent; deliberate actions, by insiders or outsiders, taken intentionally and meant to do harm; and inaction, generally by insiders, such as a failure to act in a given situation because of a lack of appropriate skills, knowledge, guidance or availability of the correct person to take action. Of primary concern are deliberate actions, which have three categories of motivation: political motivations, such as destroying, disrupting or taking control of targets, espionage, and making political statements, protests or retaliatory actions; economic motivations, such as theft of intellectual property or other economically valuable assets, fraud, industrial espionage and sabotage, and blackmail; and socio-cultural motivations, which include philosophical, theological, political and humanitarian goals, as well as fun, curiosity and a desire for publicity or ego gratification.",
    markScheme: [
      'Asset defined, with at least one example (1.5)',
      'Threat defined — an incident that could negatively affect an asset (1.5)',
      'Inadvertent actions — by insiders, without malicious intent (1)',
      'Deliberate actions — by insiders or outsiders, intended to do harm (1)',
      'Inaction — failure to act through lack of skills, knowledge, guidance or the right person (1)',
      'Political motivations with an example (1)',
      'Economic motivations with an example (1)',
      'Socio-cultural motivations with an example (1)',
      'Diagram drawn as a tree: actions branching to the three types, deliberate branching to the three motivations (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 · Types of Cyber-Attacker Actions',
    question: 'Differentiate between active and passive attacks. State and explain the types of each.',
    modelAnswer: "An active attack is a network exploit in which a hacker attempts to make changes to data on the target or data en route to the target. Passive attacks are relatively scarce from a classification perspective, but can be carried out with relative ease, particularly if the traffic is not encrypted; the attacker does not alter anything, only observes. The types of active attack are: Masquerade — the intruder pretends to be a particular user of a system to gain access or greater privileges than they are authorized for, attempted through stolen login IDs and passwords, through finding security gaps in programs, or by bypassing the authentication mechanism. Session replay — a hacker steals an authorized user's login information by stealing the session ID, gaining access and the ability to do anything the authorized user can do on the website. Message modification — an intruder alters packet header addresses to direct a message to a different destination, or modifies the data on a target machine. Denial of service (DoS) — users are deprived of access to a network or web resource, generally by overwhelming the target with more traffic than it can handle. Distributed denial-of-service (DDoS) — large numbers of compromised systems, sometimes called a botnet or zombie army, attack a single target. The types of passive attack are: Eavesdropping, also called tapping — the attacker simply listens to messages exchanged by two entities; for the attack to be useful the traffic must not be encrypted, and any unencrypted information such as a password sent in response to an HTTP request may be retrieved. Traffic analysis — the attacker looks at the metadata transmitted in traffic to deduce information about the exchange and the participating entities, such as the form of the traffic, its rate and duration; where encrypted data is used, traffic analysis can also lead to attacks by cryptanalysis, through which the attacker may obtain information or succeed in decrypting the traffic.",
    markScheme: [
      'Active attack defined — the attacker attempts to change data on or en route to the target (1.5)',
      'Passive attack defined — the attacker observes without altering, easy where traffic is unencrypted (1.5)',
      'Masquerade explained (1)',
      'Session replay explained (1)',
      'Message modification explained (1)',
      'DoS explained (1)',
      'DDoS explained, including the botnet/zombie army (1)',
      'Eavesdropping/tapping explained, including the need for unencrypted traffic (1)',
      'Traffic analysis explained, including the use of metadata (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 2 — MALWARE, HARDWARE ATTACKS AND THREAT CATEGORIES
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 2 · Software Attacks: Malware',
    question: 'Define malicious code. Tabulate the characteristics of a virus, a worm, a Trojan horse and a logic bomb, giving an example of each where possible.',
    modelAnswer: "Malicious code, sometimes called malware, is a type of software designed to take over or damage a computer user's operating system without the user's knowledge or approval. It can be very difficult to remove and very damaging. Virus — a program that attempts to damage a computer system and replicate itself to other computer systems; it requires a host to replicate and usually attaches itself to a host file or hard drive sector, replicates each time the host is used, often focuses on destruction or corruption of data, usually attaches to executable files such as .doc, .exe and .bat extensions, and often distributes through email and may send itself to contacts. Examples: Stoned, Michelangelo, Melissa, I Love You. Worm — a self-replicating program that can perform harmful activities such as deleting files or sending documents through email; it can install a backdoor in an infected computer, is usually introduced through system vulnerabilities, and infects one system then spreads to other systems on the network. Example: Code Red. Trojan horse — a malicious program disguised as legitimate software; it cannot replicate itself, often contains spying functions such as packet sniffers or backdoor functions for remote control, and is often hidden inside useful software such as screen savers or games. Examples: Back Orifice, Net Bus, Whack-a-Mole. Logic bomb — malware that remains inactive until a specific trigger occurs; trigger activities may include a specific date or time, launching a program, or processing a specific activity, and logic bombs do not self-replicate.",
    markScheme: [
      'Malicious code defined — software designed to take over or damage the OS without the user’s knowledge or approval (1.5)',
      'Answer is presented as a table, as the question requires (0.5)',
      'Virus — needs a host, self-replicating, attaches to files, spreads by email (2)',
      'Worm — self-replicating without a host, spreads across the network through vulnerabilities (2)',
      'Trojan horse — disguised as legitimate software, CANNOT replicate itself (2)',
      'Logic bomb — inactive until a trigger fires, does not self-replicate (1.5)',
      'At least one correct named example given (0.5)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Topic 2 · Hardware Attacks and Cyber Threat Categories',
    question: 'Name the SIX common hardware attacks.',
    items: [
      { name: 'Manufacturing backdoors', aliases: ['manufacturing backdoor'], explain: 'Backdoors placed during manufacture for malware or other penetrative purposes; they reach embedded RFID chips and memory, not just software.' },
      { name: 'Eavesdropping', aliases: ['eavesdropping by gaining access to protected memory'], explain: 'Gaining access to protected memory without opening other hardware.' },
      { name: 'Inducing faults', aliases: ['fault induction', 'inducing fault'], explain: 'Causing the interruption of normal behaviour.' },
      { name: 'Hardware modification', aliases: ['hardware tampering', 'tampering'], explain: 'Tampering with invasive operations.' },
      { name: 'Backdoor creation', aliases: ['backdoor'], explain: 'Hidden methods for bypassing normal computer authentication systems.' },
      { name: 'Counterfeiting product assets', aliases: ['counterfeiting', 'counterfeit'], explain: 'Counterfeit assets that can produce extraordinary operations, and those made to gain malicious access to systems.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 2 · Hardware Attacks and Cyber Threat Categories',
    question: 'Differentiate between cyber warfare, cyber crime, cyber terrorism and cyber espionage.',
    modelAnswer: "Cyber warfare refers to the use of digital attacks, such as computer viruses and hacking, by one country to disrupt the vital computer systems of another, with the aim of creating damage, death and destruction; it involves the actions of a nation-state or international organization to attack and attempt to damage another nation's computers or information networks, for example through computer viruses or denial-of-service attacks. Cyber crime is criminal activity that either targets or uses a computer, a computer network or a networked device; it is committed by cybercriminals or hackers who want to make money, and is carried out by individuals or organizations, some organized, using advanced techniques and highly technically skilled, others novice hackers. Cyber terrorism is the convergence of cyberspace and terrorism: unlawful attacks and threats of attack against computers, networks and the information stored therein, done to intimidate or coerce a government or its people in furtherance of political or social objectives; examples are hacking into computer systems, introducing viruses to vulnerable networks, website defacing, denial-of-service attacks, and terroristic threats made via electronic communication. Cyber espionage, or cyber spying, is the act or practice of obtaining secrets and information without the permission and knowledge of the holder of that information. The four are separated chiefly by actor and objective: warfare is nation-state against nation-state for damage; crime is criminal against victim for money; terrorism is an actor against a population to intimidate or coerce for political or social ends; espionage is any of them against a holder of information, for the information itself and, unlike the other three, intended to go unnoticed.",
    markScheme: [
      'Cyber warfare defined — digital attacks by one country against another’s vital systems (1.5)',
      'Cyber crime defined — criminal activity targeting or using a computer, motivated by money (1.5)',
      'Cyber terrorism defined — attacks to intimidate or coerce a government or its people for political or social objectives (1.5)',
      'Cyber espionage defined — obtaining secrets and information without the holder’s permission or knowledge (1.5)',
      'An example given for at least two of the four (1)',
      'The basis of the distinction stated — who the actor is and what the objective is, not merely four definitions (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 3 — FIREWALLS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 3 · Network Security-Firewall: Definition of Firewall',
    question: 'Define a firewall. Explain why a firewall is described as more than the locked front door to your network, and state the THREE types of screening a firewall performs.',
    modelAnswer: "A firewall is a system that enforces an access control policy between two networks, such as your private LAN and the unsafe, public Internet. The firewall determines which inside services can be accessed from the outside, and vice versa. The actual means by which this is accomplished varies widely, but in principle a firewall can be thought of as a pair of mechanisms: one to block traffic and one to permit traffic. It is more than the locked front door to your network because it is your security guard as well: firewalls provide a single choke point where security and audits can be imposed, and a firewall can provide a network administrator with data about what kinds and amount of traffic passed through it, how many attempts were made to break into it, and so on. Like a closed-circuit security TV system, a firewall not only prevents access but also monitors who has been sniffing around, and assists in identifying those who attempt to breach your security. A firewall can screen both incoming and outgoing traffic; because incoming traffic poses a greater threat to the network, it is usually screened more closely. The three types of screening are: screening that blocks any incoming data not specifically ordered by a user on the network; screening by the address of the sender; and screening by the contents of the communication.",
    markScheme: [
      'Firewall defined — enforces an access control policy between two networks (1.5)',
      'Determines which inside services can be accessed from outside, and vice versa (1)',
      'Described as a pair of mechanisms — one to block traffic, one to permit traffic (1)',
      'The choke point / security guard argument — audit data on traffic and break-in attempts (1.5)',
      'Screening that blocks incoming data not specifically ordered by a user (1)',
      'Screening by the address of the sender (1)',
      'Screening by the contents of the communication (1)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 3 · Firewall Technologies',
    question: 'The ICSA classifies firewalls into three categories. Name and explain each, stating one weakness of the first.',
    modelAnswer: "The ICSA classifies firewalls into three categories: packet filter firewalls, application-level proxy servers, and stateful packet inspection firewalls. Packet filter firewall — every computer on a network has an address commonly referred to as an IP address; a packet filter firewall checks the address of incoming traffic and turns away anything that does not match the list of trusted addresses. It uses rules to deny access according to information located in each packet, such as the TCP/IP port number, the source or destination IP address, or the data type, and restrictions can be as tight or as loose as you want. Its weakness is that it is prone to source IP spoofing, a trick that makes data appear to come from a trusted source, even from your own network; packet filter firewalls are also arduous and confusing to configure, and any mistake in configuration could leave you wide open to attack. Application-level proxy server — examines the application used for each individual IP packet to verify its authenticity. Traffic from each application, such as HTTP for the web, FTP for file transfers and SMTP or POP3 for email, typically requires the installation and configuration of a different application proxy, and proxy servers often require administrators to reconfigure network settings and applications such as web browsers, which can be a labour-intensive process. Stateful packet inspection firewall — the latest generation in firewall technology, considered the most advanced and secure because it examines all parts of the IP packet to determine whether to accept or reject the requested communication. The firewall keeps track of all requests for information that originate from your network, then scans each incoming communication to see if it was requested and rejects anything that was not; requested data proceeds to the next level of screening. The screening software determines the state of each packet of data, hence the term stateful packet inspection.",
    markScheme: [
      'All three categories correctly named (1.5)',
      'Packet filter — checks addresses against a list of trusted addresses (1)',
      'Packet filter — rules use port number, source/destination IP, or data type (1)',
      'Weakness of the packet filter given — IP spoofing, and/or difficulty of configuration (1.5)',
      'Application-level proxy — examines the application used for each packet to verify authenticity (1.5)',
      'Application-level proxy — a separate proxy needed per application, labour-intensive to deploy (1)',
      'Stateful packet inspection — examines all parts of the packet, tracks requests originating from the network (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 3 · Additional Firewall Features and Functionality',
    question: 'Beyond core security capability, describe the additional features integrated into standard firewall products.',
    modelAnswer: "In addition to the security capability of a firewall, a wide range of additional features and functionalities are integrated into standard firewall products. These include support for public web and email servers, normally referred to as a demilitarized zone (DMZ); content filtering; virtual private networking (VPN) encryption support; and antivirus support. Demilitarized zone firewalls — a firewall that provides DMZ protection is effective for companies that invite customers to contact their network from any external source, for example a company that hosts a website or sells products over the Internet. The deciding factors are the number of outside users who access information on the network and how often they access it. A DMZ firewall creates a protected, demilitarized information area on the network: outsiders can get to the protected area but cannot get to the rest of the network, which allows outside users to get the information you want them to have and prevents them from getting to the information you do not. Content filtering — a website filter or content filter extends the firewall's capability to block access to certain websites, for example to ensure employees do not access pornography or racially intolerant material. You define categories of unwelcome material and obtain a service that lists thousands of websites including such material, then choose whether to block those sites totally or to allow access but log it; such a service should automatically update its list of banned websites on a regular basis. Virtual private networks — a VPN is a private data network that makes use of the public network infrastructure, that is, the Internet, to give a company the same capabilities as a private leased line but at much lower cost. It provides secure sharing of public resources by using encryption techniques so that only authorized users can view or tunnel into a company's private network. Antivirus support — firewalls are not designed to remove or clean viruses, but they can assist with virus detection, for example by requiring that every user's PC has the latest antivirus software running and enabled before the firewall permits that user to access the Internet or download email.",
    markScheme: [
      'The features named — DMZ, content filtering, VPN encryption support, antivirus support (1)',
      'DMZ explained — a protected area outsiders can reach without reaching the rest of the network (2)',
      'The deciding factor for a DMZ given — number of external users and how often they access (0.5)',
      'Content filtering explained — blocks access to categories of websites (1.5)',
      'Content filtering — the block-or-log choice, and the regularly updated list (1)',
      'VPN explained — private network over public infrastructure, leased-line capability at lower cost (1.5)',
      'VPN — encryption so only authorized users can view or tunnel in (0.5)',
      'Antivirus support explained — the firewall assists detection rather than removing viruses (1)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 3 · Choosing a Firewall',
    question: 'Compare router/firmware-based firewalls, software-based firewalls and dedicated firewall appliances.',
    modelAnswer: "Firewall functions can be implemented as software or as an addition to your router or gateway; alternatively, dedicated firewall appliances are increasing in popularity, mainly due to their ease of use, performance improvements and lower cost. Router or firmware-based firewalls — certain routers provide limited firewall capabilities, which can be augmented further with additional software or firmware options. However, great care must be taken not to overburden the router by running additional services like a firewall, and enhanced firewall-related functionality such as VPN, DMZ, content filtering or antivirus protection may not be available or may be expensive to implement. Software-based firewalls — typically sophisticated, complex applications that run on a dedicated UNIX or Windows server. These products become expensive when you account for the costs associated with the software, the server operating system, the server hardware, and the continual maintenance required to support their implementation. It is essential that system administrators constantly monitor and install the latest operating system and security patches as soon as they become available; without these patches to cover newly discovered security holes, the software firewall can be rendered useless. Dedicated firewall appliances — most are dedicated, hardware-based systems. Because these appliances run on an embedded operating system specifically tailored for firewall use, they are less susceptible to many of the security weaknesses inherent in general-purpose server operating systems. They are designed to satisfy extremely high throughput requirements or the processor-intensive requirements of stateful packet inspection, and because there is no need to harden the operating system they are usually easier to install and configure than software firewall products, potentially offering plug and play installation, minimal maintenance and a very complete solution, and proving extremely cost effective compared with other implementations.",
    markScheme: [
      'Router/firmware-based — limited firewall capability, augmented by software or firmware options (1.5)',
      'Router/firmware-based — risk of overburdening the router; enhanced functions unavailable or costly (1.5)',
      'Software-based — complex applications running on a dedicated server (1)',
      'Software-based — the true cost includes OS, hardware and continual maintenance (1)',
      'Software-based — useless without prompt patching of newly discovered holes (1)',
      'Appliance — hardware-based, embedded OS tailored for firewall use (1)',
      'Appliance — less attack surface than a general-purpose server OS, no hardening needed (1)',
      'Appliance — high throughput, easier to install, cost effective (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 3 · Designing a Firewall',
    question: 'Outline the decisions involved in designing a firewall, and state the principle that should govern the policy.',
    modelAnswer: "Once you have familiarized yourself with all of the different firewalls on the market, the next step is to define your firewall policy. For example, will the firewall explicitly deny all services except those critical to the mission of connecting to the Internet, or is it intended to provide a metered and audited method of queuing access in a nonthreatening manner? Decisions like these are less about engineering than politics. The next decision is what level of monitoring, redundancy and control you want; this involves juggling needs analysis with risk assessment, and then sorting through the often-conflicting requirements in order to determine what to implement. Where firewalls are concerned, the emphasis should be on security rather than connectivity. You should consider blocking everything by default and only allowing the services you need on a case-by-case basis — if you block all but a specific set of services, you make your job much easier.",
    markScheme: [
      'Defining the firewall policy identified as the first step (1)',
      'The deny-all versus metered-and-audited-access question posed (1)',
      'Notes that such decisions are less about engineering than politics (0.5)',
      'Level of monitoring, redundancy and control identified as the next decision (1)',
      'Needs analysis balanced against risk assessment (0.5)',
      'The governing principle stated — security rather than connectivity (1)',
      'Default-deny stated — block everything, allow only what is needed, case by case (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 4 — NETWORK FOUNDATIONS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 4 · ISO-OSI Reference Model',
    figure: '/lecture-notes/cyb-221/osi-model.webp',
    question: 'With the aid of a diagram, describe the seven layers of the ISO-OSI reference model and the function of each.',
    modelAnswer: "The communication problem in computer networks can be defined as the task of transferring data entered by an application user in one system to an application user in another system through one or more intermediate networks. It is solved using a layered approach through a collection of protocols forming a protocol suite: each layer deals with a particular aspect of the communication problem, is implemented with a particular protocol, and the protocols co-operate with each other to solve the entire problem. The Open Systems Interconnection (OSI) model is an abstract representation of the basic layers involved, drawn from Layer 7 at the top down to Layer 1 at the bottom. Application layer — specifies how one particular application uses a network and contacts the application program running on a remote machine. Presentation layer — deals with the translation and representation of data at the two end hosts of the communication. Session layer — responsible for establishing a communication session with a remote system, and handles security issues such as password authentication before the application user can connect to the remote system. Transport layer — provides end-to-end, reliable or best-effort, in-order data packet delivery along with support for flow control and congestion control. Network layer — deals with forwarding data packets from the source to the destination nodes of the communication. Data-link layer — deals with the organization of data into frames and provides reliable data delivery over the physical medium. Physical layer — provides the encoding and decoding schemes and the modulation and demodulation schemes for the actual transmission of data over the physical medium, as a sequence of bits of 1s and 0s.",
    markScheme: [
      'The communication problem stated — transferring data between application users through intermediate networks (1)',
      'The layered approach explained — a protocol suite in which each layer handles one aspect (1)',
      'Application layer function (1)',
      'Presentation layer function (1)',
      'Session layer function, including password authentication (1)',
      'Transport layer function, including flow and congestion control (1)',
      'Network layer function (1)',
      'Data-link layer function (1)',
      'Physical layer function (1)',
      'Diagram drawn with all seven layers in the correct order (1)',
    ],
  },

  {
    type: 'recall',
    marks: 7,
    source: 'Topic 4 · ISO-OSI Reference Model',
    question: 'Name the seven layers of the OSI model, from Layer 7 down to Layer 1.',
    items: [
      { name: 'Application', aliases: ['application layer'], explain: 'Layer 7 — specifies how an application uses the network and contacts the program on the remote machine.' },
      { name: 'Presentation', aliases: ['presentation layer'], explain: 'Layer 6 — translation and representation of data at the two end hosts.' },
      { name: 'Session', aliases: ['session layer'], explain: 'Layer 5 — establishes the session with the remote system and handles password authentication.' },
      { name: 'Transport', aliases: ['transport layer'], explain: 'Layer 4 — end-to-end, in-order delivery with flow control and congestion control.' },
      { name: 'Network', aliases: ['network layer'], explain: 'Layer 3 — forwards data packets from source to destination nodes.' },
      { name: 'Data-link', aliases: ['data link', 'datalink', 'data-link layer'], explain: 'Layer 2 — organizes data into frames and delivers them reliably over the physical medium.' },
      { name: 'Physical', aliases: ['physical layer'], explain: 'Layer 1 — encoding/decoding and modulation/demodulation for transmission as 1s and 0s.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 4 · TCP/IP Protocol Stack',
    figure: '/lecture-notes/cyb-221/tcpip-stack.webp',
    question: 'Explain why the TCP/IP protocol stack is used in place of the full OSI model, and map its four layers onto the OSI layers. State what a data packet is called at each of three layers.',
    modelAnswer: "The seven-layer OSI model is conceptual: it shows the different activities required for communication between application programs running in two different hosts, but its full implementation would result in excessive overhead and would lead to huge delays in data delivery at the destination. The TCP/IP (Transmission Control Protocol / Internet Protocol) protocol stack is therefore the commonly used model for wide area communications like the Internet, and is composed of the Application, Transport, Internet and Link layers, from top to bottom. The application layer of the TCP/IP model is in charge of the responsibilities of the application, presentation and session layers of the OSI model. The transport layer of the TCP/IP model is similar to the transport layer of the OSI model. The Internet layer takes care of addressing and routing the data packets across different heterogeneous networks; each machine and router in the Internet has a unique IP address. The link layer combines the functionalities of the data-link layer and physical layer of the OSI model, supporting the organization of data into frames and their encoding and decoding mechanisms; the structure and transmission of frames depends on the topology and hardware technology used for the network, such as Ethernet or Token Ring. A data packet is referred to as a segment, a datagram and a frame at the transport, internet and link layers respectively.",
    markScheme: [
      'The reason given — the OSI model is conceptual; full implementation means excessive overhead and delay (1.5)',
      'The four TCP/IP layers named in order (1)',
      'Application layer maps to OSI application, presentation and session (1.5)',
      'Transport layer maps to the OSI transport layer (0.5)',
      'Internet layer explained — addressing and routing across heterogeneous networks (1)',
      'Link layer maps to OSI data-link and physical (1)',
      'Segment at the transport layer (0.5)',
      'Datagram at the internet layer (0.5)',
      'Frame at the link layer (0.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 4 · TCP Connection Establishment and ICMP',
    figure: '/lecture-notes/cyb-221/tcp-handshake.webp',
    question: 'With the aid of a diagram, describe the TCP three-way handshake. Why do the two processes pick an arbitrary starting sequence number?',
    modelAnswer: "The two commonly used transport layer protocols in the TCP/IP protocol stack are TCP and UDP. TCP is a connection-oriented, byte-stream based protocol providing reliable, in-order data delivery, whereas UDP is connectionless and message-based, providing only best-effort service. Processes running TCP have to establish a connection before exchanging any data packet. During this connection establishment mechanism the two processes exchange information about the capabilities and resources available at their respective hosts for the session about to begin, which helps the TCP process running in one host to adjust its data sending rate according to the resources, such as memory buffer space, available for the TCP process at the receiving host. In order to avoid replay errors, the two processes pick an arbitrary starting sequence number for the data packets they send; each byte of data is given a unique, monotonically increasing sequence number, and the sequence number of a TCP data packet represents the sequence number of the first byte of data transmitted in that packet. The connection establishment process is a three-way handshake. First, a process at host A initiates a session with a process at host B by sending a Synchronization (SYN) packet with the initial sequence number set to X, including information about the memory resources available through the Advertised Window field of the TCP header. Second, if the process at host B is willing to establish the session it sends back a SYN/ACK packet indicating the memory resources available at host B, the starting sequence number of the packets coming from host B, and an acknowledgment for receiving the SYN packet from host A. Third, the process at host A responds with an ACK packet if it accepts the advertised window value of host B and is willing to tune down its data sending rate accordingly. Note that the acknowledgment sent for receiving a packet with sequence number X indicates the sequence number X+1 of the next packet expected. Typically host A is a client and host B is a server.",
    markScheme: [
      'TCP characterised — connection-oriented, byte-stream, reliable in-order delivery (1)',
      'Purpose of connection establishment — exchanging capability and resource information (1)',
      'Reason for the arbitrary starting sequence number — to avoid replay errors (1.5)',
      'Step 1: SYN from A with initial sequence number X and the advertised window (1.5)',
      'Step 2: SYN/ACK from B with its resources, its starting sequence number and the acknowledgment (1.5)',
      'Step 3: ACK from A accepting B’s advertised window (1.5)',
      'States that acknowledging X indicates X+1 is the next packet expected (1)',
      'Diagram drawn showing all three messages between the two hosts, correctly labelled (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 4 · Internet Control Message Protocol (ICMP)',
    question: 'What is ICMP, and what is it used for? Describe the ECHO Request/Reply message and name the two utilities that are built on ICMP.',
    modelAnswer: "IP provides best-effort service in delivering datagrams from one host to another through one or more intermediate networks. The TCP/IP protocol suite provides an error-reporting protocol called the Internet Control Message Protocol (ICMP) that operates in tandem with IP; IP uses ICMP to report errors and certain critical information to the end hosts. Each ICMP message is identified by an 8-bit type field. One of the commonly used ICMP messages is ECHO Request/Reply: an ECHO Request message is sent to the ICMP process running on a host computer to check whether the host is alive, and if the host is alive it sends a response using the ECHO Reply message. The ping utility sends exactly this ECHO Request and waits for the ECHO Reply, which is how it establishes whether a host is reachable. The tracert utility also builds on ICMP: it sends packets with deliberately small time-to-live values so that each router along the path returns an ICMP time exceeded message, revealing the route hop by hop. Note that the 8-bit Type field belongs to the ICMP header, the first octet of the ICMP message carried inside the IP payload; the IP header carries its own 8-bit Protocol field, and a value of 1 there is what identifies the payload as ICMP.",
    markScheme: [
      'ICMP identified as the error-reporting protocol of the TCP/IP suite, operating in tandem with IP (1.5)',
      'IP characterised as best-effort, which is why ICMP is needed (0.5)',
      'ICMP messages identified by an 8-bit type field (1)',
      'ECHO Request explained — sent to check whether a host is alive (1)',
      'ECHO Reply explained — the response when the host is alive (0.5)',
      'ping named and linked to ECHO Request/Reply (0.75)',
      'tracert named and linked to small TTL values and time exceeded messages (0.75)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 5 — CLASSICAL NETWORK ATTACKS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · Threats in Transit',
    question: 'Explain how a capable intruder can capture traffic not addressed to them. Define wiretapping, state any FOUR uses of a packet sniffer, and give TWO reasons why optical fibre is more secure than any other transmission medium.',
    modelAnswer: "The network interface card (NIC) of each host in a network is uniquely identified with a hardware address. The NIC is programmed to pick up only the packets addressed to the unicast hardware address corresponding to the host, the multicast hardware address corresponding to a multicast group of which the host is a member, and the broadcast hardware address. A capable intruder can reprogram the NIC with the hardware address of another host and accept packets addressed to that host; to avoid being caught, the intruder can put a copy of the packet back on the network. Wiretapping is the process of extracting information as it flows through a wire, and the process differs depending on the communication medium used; in cables it can be done through the use of a packet sniffer or through inductance. A packet sniffer is computer software or hardware that can intercept the traffic passing through a local area network cable, and can be used for both beneficial and malicious purposes: to analyze network problems and monitor network usage; to filter suspect content from network traffic; to study the structure of the packet headers of the different protocols used over the network; to detect network intrusion attempts; and to gather information for effecting a network intrusion. Because an ordinary wire emits radiation during the propagation of electrical signals through it, an intruder can tap the wire and read the radiated signals through inductance without making physical contact with the cable. An optical fibre, made of thin glass strands, carries light pulses over long distances without being much affected by electrical interference, and is more secure than any other transmission medium for two reasons: optical fibres are fine tuned to achieve total internal reflection, so the entire network would have to be re-tuned to facilitate tapping and interception; and optical fibres carry light energy and not electrical signals, so inductance-based tapping is not possible.",
    markScheme: [
      'The three hardware addresses a NIC accepts — unicast, multicast, broadcast (1.5)',
      'The intruder reprograms the NIC with another host’s hardware address (1)',
      'Puts a copy of the packet back on the network to avoid detection (0.5)',
      'Wiretapping defined — extracting information as it flows through a wire (1)',
      'Packet sniffer defined — software or hardware intercepting traffic on a LAN cable (1)',
      'Four uses of a packet sniffer given (2)',
      'Inductance explained — reading radiated signals without physical contact (1)',
      'Fibre reason 1 — tuned for total internal reflection, the network would have to be re-tuned (1)',
      'Fibre reason 2 — carries light, not electrical signals, so inductance tapping is impossible (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · TCP Session Hijacking',
    figure: '/lecture-notes/cyb-221/tcp-ack-storm.webp',
    question: 'Define TCP session hijacking. Explain how an attacker desynchronizes a session, and describe how a TCP ACK storm arises.',
    modelAnswer: "TCP session hijacking refers to the act of taking over an already established TCP session and injecting packets into the stream that are processed by the receiver as if the packets are coming from the authentic owner of the session. A TCP session is identified by the quadruple: client IP address, client port number, server IP address and server port number. Any packet that reaches either machine with the above identifiers is considered to be part of the existing session, so if attackers can spoof these items they can pass TCP packets to the client or server and have those packets processed as coming from the other machine. To successfully hijack an existing TCP session, an attacker has first to desynchronize the session and then inject the intended commands. To desynchronize a session between a client and a server, the attacker has to predict the sequence number that is about to be used by the client or server, and use that sequence number before they get a chance to use it. If the attacker has access to the network, a packet sniffer can be used to look into the packets belonging to the session and the expected sequence number can be predicted accurately from the ACK packets exchanged; if the attacker cannot sniff the session, they must try all possible options and guess the expected sequence number. When the attacker successfully hijacks the session and injects their own spoofed data packets as if they came from the original client, the server acknowledges receipt of the data packet to the original client by sending an ACK packet. As this ACK packet bears a sequence number the client is not expecting, the original client attempts to resynchronize with the server by sending an ACK packet with the sequence number it is expecting. That ACK packet in turn contains a sequence number the server is not expecting, so the server resends its last ACK packet. This cycle continues, and the rapid passing back and forth of the ACK packets creates the TCP ACK storm. As the attacker injects more and more data packets the size of the storm increases and can quickly bring down the performance of the network; after a certain number of unsuccessful resynchronization attempts the original client eventually gets exhausted and closes the connection with the server.",
    markScheme: [
      'Session hijacking defined — taking over an established session and injecting packets accepted as authentic (1.5)',
      'The quadruple named — client IP, client port, server IP, server port (2)',
      'States that spoofing the quadruple is what lets the attacker in (0.5)',
      'Desynchronization explained — predicting and using the next sequence number first (1.5)',
      'Sniffing gives accurate prediction from the ACK packets; otherwise the attacker must guess (1)',
      'The server’s ACK carries a sequence number the client does not expect (1)',
      'The client tries to resynchronize, and its ACK is in turn unexpected by the server (1)',
      'The cycle repeats — this is the ACK storm, degrading network performance (1)',
      'The client eventually exhausts its attempts and closes the connection (0.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 5 · Man in the Middle Attack',
    question: 'Describe a man-in-the-middle attack on public-key cryptography, using two communicating parties A and B and an attacker M.',
    modelAnswer: "With a man-in-the-middle (MITM) attack, an attacker can read, modify and insert messages between two communicating parties without either party knowing that the link between them has been compromised. To carry out the attack successfully, the attacker must be able to observe and intercept messages between the two victims. Let A and B be the two communicating parties and let M be the attacker who wants to deliver a false message to B. To get started, B sends its public key to A. If M can intercept the communication channel between A and B, then M gets access to the public key of B. M then sends A a spoofed message that claims to have come from B; in this message M sends its own public key, but A thinks it has received the public key of B. When A sends a data packet to B, it encrypts the packet with what A considers to be the public key of B and inserts the encrypted message in the channel. M intercepts the message and decrypts it with its own private key to extract the actual message sent by A to B. M then encrypts the message with the real public key of B — and M could even modify the message before encrypting it again. M inserts the new encrypted message back into the channel so that it can go to B, and B decrypts the message using its own private key and reads it, assuming it came from A.",
    markScheme: [
      'MITM defined — reading, modifying and inserting messages without either party knowing (1.5)',
      'The precondition stated — the attacker must observe and intercept messages between the victims (0.5)',
      'B sends its public key to A and M intercepts it (1)',
      'M sends A a spoofed message containing M’s own public key, which A believes is B’s (1.5)',
      'A encrypts to what it believes is B’s public key (1)',
      'M intercepts and decrypts with its own private key, and may modify the message (1)',
      'M re-encrypts with B’s real public key and reinserts the message (1)',
      'B decrypts with its private key and believes the message came from A (0.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · Echo-Chargen Attack',
    figure: '/lecture-notes/cyb-221/echo-chargen.webp',
    question: 'With the aid of a diagram, describe the Echo-Chargen attack. Describe the Smurf attack and state the TWO solutions adopted on the Internet to prevent it.',
    modelAnswer: "Chargen, the Character Generator, is a protocol of the TCP/IP protocol stack used for testing and performance measurement purposes, and runs on TCP port 19 and also on UDP port 19. When a client opens a TCP connection with a server on TCP port 19, the server starts sending arbitrary characters back to the client until the connection is closed; whenever a host sends a UDP message to a server on UDP port 19, the server responds with an arbitrary message of between 0 and 512 characters. An attacker can trigger the Echo-Chargen attack by spoofing a conversation between the Echo Request/Reply service and the Chargen service and then redirecting the output of each service to the other, creating a rapidly expanding spiral of traffic in the network. The attacker triggers the attack by sending a spoofed message to one of the targeted hosts, host A, running the Chargen service at UDP port 19; the message is spoofed so that it appears to have originated from the other targeted host, host B, at UDP port 7, which is the port used for Echo Request/Reply messaging. Host A now sends a UDP message from port 19 to port 7 of host B. Host B considers this an Echo Request and sends a Reply back to UDP port 19 of host A. Host A treats the Reply as a message for the Chargen service and sends a new arbitrary UDP message to port 7 of host B. This cycle continues and generates excessive traffic; eventually the attack consumes memory and processor power at both targeted hosts and causes them to become non-responsive to user commands. A perpetrator launches the Smurf attack by sending a spoofed Echo-Request message to a network's broadcast IP address, with the victim's IP address as the source IP address; hence each host receiving the broadcast Echo-Request sends an Echo-Reply message to the victim, who is overwhelmed with a flood of Echo-Reply messages, making the Smurf attack a kind of denial-of-service attack. Two solutions have been adopted on the Internet to prevent it: routers do not forward datagrams having a broadcast IP address as the destination address, and hosts are configured not to reply to Echo-Request messages received as a broadcast message.",
    markScheme: [
      'Chargen identified — a TCP/IP protocol for testing and performance measurement (1)',
      'Chargen runs on TCP port 19 and UDP port 19 (1)',
      'Echo Request/Reply identified with UDP port 7 (0.5)',
      'The trigger explained — a spoofed message to Chargen appearing to come from the Echo port of the other host (1.5)',
      'The loop traced — A to B port 7, B replies to port 19, A responds again (1.5)',
      'The effect stated — excessive traffic, memory and processor exhausted, hosts non-responsive (1)',
      'Diagram drawn showing the attacker’s trigger and the loop between the two hosts (1)',
      'Smurf explained — spoofed broadcast Echo-Request with the victim as source (1.5)',
      'Prevention 1 — routers do not forward datagrams addressed to a broadcast IP (0.5)',
      'Prevention 2 — hosts configured not to reply to broadcast Echo-Requests (0.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 5 · Attacks on Domain Name Service (DNS)',
    question: 'Explain DNS cache poisoning and traffic redirection, and describe the harm each causes.',
    modelAnswer: "A DNS server is a machine that holds a table, called the DNS cache, mapping domain names to IP addresses. The server queries other DNS servers higher up in the domain name hierarchy to resolve domain names for which it has no IP address entry in its cache, and updates its cache with the mapping learnt. DNS cache poisoning is an attack by which the DNS server is made to believe a domain name to IP address mapping is authentic when in reality it is not. Once the cache is poisoned, the entry stays for a while in the cache and affects every client that uses the DNS server in the meantime. For example, an attacker can replace the IP address information for a target file server with the IP address of a compromised file server the attacker controls, and create fake entries on the compromised server with file names matching those on the target server. These files could contain malicious content such as a worm or virus, so users who want to download files from the target file server may end up unknowingly downloading files with malicious content from the compromised server. Traffic redirection is a different attack: a compromised router sends out route update messages to all its neighbouring routers informing them that it lies on the shortest path to every network in the Internet. The neighbouring routers then forward all of their incoming data packets to this compromised router, which eventually gets flooded with data packets and starts dropping them, so the data packets do not make it to their destination.",
    markScheme: [
      'DNS server and DNS cache explained — the table mapping domain names to IP addresses (1)',
      'How the cache is populated — querying servers higher in the hierarchy (0.5)',
      'Cache poisoning defined — the server made to believe a false mapping is authentic (1.5)',
      'The persistence of the poisoned entry and its effect on every client using that server (1)',
      'The worked example — target file server replaced by a compromised one with matching file names (1)',
      'The harm — users unknowingly download malicious content (0.5)',
      'Traffic redirection explained — a compromised router claims the shortest path to every network (1.5)',
      'The harm — the router is flooded and drops packets, which never reach their destination (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 5 · Distributed Denial of Service (DDoS) Attacks',
    question: 'Describe how a DDoS attack is mounted, including the role of zombies and rootkits. Then describe the SYN flood attack.',
    modelAnswer: "DDoS attacks involve breaking into hundreds or thousands of machines all over the Internet. The attacker installs malicious software on all these compromised machines, called zombies, and controls them to launch coordinated attacks on victim sites. DDoS attacks are normally aimed at exhausting the network bandwidth, overwhelming a router's processing capacity and breaking network connectivity to the victims. The attacker uses any convenient method — such as exploiting a buffer overflow, or tricking the victim into opening and installing unknown code from an email attachment — to plant a Trojan horse on a target machine and transform it into a zombie by also installing rootkit software. The rootkit helps to conceal the presence of the Trojan horse and hide its malicious activities. After forming a sufficient number of zombies, the attacker sends a signal to all of them to launch the attack on a chosen victim machine, and each zombie may launch the same or a different type of attack. In the SYN flood attack, the server maintains a SYN_RECV queue during the TCP connection establishment process to keep track of connection requests for which it has allocated resources and responded with a SYN/ACK message, but for which the corresponding ACK from the client has not yet been received. The server eventually times out waiting for the ACK packet and removes the incomplete connection request from its queue. An attacker sends several SYN connection request messages using spoofed, non-existing IP addresses and never responds with the ACK messages, so the SYN_RECV queue of the server fills up with incomplete connection request messages; even though these are discarded after the timeout, if a genuine client attempts to establish a TCP connection with the server in the meantime, the server discards the SYN request from that client.",
    markScheme: [
      'DDoS defined — breaking into hundreds or thousands of machines to attack a victim in a coordinated way (1.5)',
      'Zombies defined — the compromised machines the attacker controls (1)',
      'Aims of a DDoS stated — exhaust bandwidth, overwhelm router capacity, break connectivity (1)',
      'The method of compromise — buffer overflow or a malicious email attachment planting a Trojan horse (1)',
      'Rootkit’s role — conceals the Trojan horse and hides its malicious activity (1)',
      'The signal to all zombies to launch on a chosen victim (0.5)',
      'SYN_RECV queue explained — tracks half-open connections awaiting the client’s ACK (1.5)',
      'The attack — many SYNs from spoofed, non-existing addresses, never acknowledged (1.5)',
      'The consequence — the queue fills and a genuine client’s SYN request is discarded (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 6 — ENCRYPTION CONTROLS AND VIRTUAL PRIVATE NETWORKS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 6 · Link Encryption Vs End-to-End Encryption',
    question: 'Differentiate between link encryption and end-to-end encryption. Tabulate any FOUR points of comparison between them.',
    modelAnswer: "Encryption applied between every pair of hosts connected by a link is called link-to-link encryption. Link encryption is preferred when all the hosts in the network are secure but the communication medium is shared among several users and is not secure. Almost all the components of a data frame, except the source and destination hardware addresses in the frame header, are encrypted before the frame is inserted onto the physical communications link. As the frame reaches the next hop receiver, which could be a router or the end host, the frame is decrypted at the bottom protocol layer and sent to the higher layers for further processing and forwarding. Since encryption is at the bottom protocol layer, the message is exposed in plaintext at all the other layers of the sender and receiver and at the link and Internet layers of the intermediate hosts, for hardware addressing and routing. Thus link encryption protects the message in transit between two computers, but the message is in plaintext inside the end hosts and the intermediate hosts, and one or more of the intermediate hosts may not be credible. Encryption applied between two application programs running at the end hosts of a communication is called end-to-end encryption. Here only the data portion of the packet is encrypted at the highest level, the application layer, and the packet is transmitted with the data in encrypted form throughout the Internet. Thus end-to-end encryption protects the data against disclosure while in transit, but the data packet could go through potentially insecure intermediate hosts. Points of comparison: on key sharing, link encryption requires the end hosts of every link to share a key and be able to encrypt and decrypt, whereas with end-to-end encryption the intermediate hosts of a transmission path do not need cryptographic facilities at all. On the number of keys, with N hosts and n users in a network where N is much smaller than n, link encryption needs N(N-1)/2 keys, whereas end-to-end encryption needs n(n-1)/2 keys for symmetric encryption and 2n for public-key encryption. On scope, all message transmissions have to be encrypted and decrypted at every link under link encryption, whereas end-to-end encryption is application and message specific and need not be done for all messages. On the choice of algorithm, one encryption algorithm may be used for all users in all links under link encryption, whereas each application user can deploy an encryption algorithm of choice under end-to-end encryption. On exposure, data is exposed at the end hosts and the intermediate hosts under link encryption, whereas under end-to-end encryption everything below the application layer stays encrypted at both the end hosts and the intermediate hosts.",
    markScheme: [
      'Link encryption defined — applied between every pair of hosts connected by a link (1.5)',
      'States what is and is not encrypted in the frame, and that each hop decrypts and re-encrypts (1.5)',
      'End-to-end encryption defined — applied between the two application programs at the end hosts (1.5)',
      'States that only the data portion is encrypted, at the application layer (1)',
      'Answer is presented as a table, as the question requires (0.5)',
      'Comparison point on key sharing or cryptographic facilities at intermediate hosts (1)',
      'Comparison point on the number of keys, with at least one formula correct (1)',
      'Comparison point on scope — every transmission versus application and message specific (1)',
      'Comparison point on choice of algorithm, or on where data is exposed (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 6 · Virtual Private Networks',
    figure: '/lecture-notes/cyb-221/ip-in-ip-tunneling.webp',
    question: 'Distinguish between public and private IP addresses, and explain why a private address cannot be routed across the public Internet. With the aid of a diagram, describe how a VPN uses IP-in-IP tunnelling to solve this.',
    modelAnswer: "There are two types of IP address: public and private. A public IP address is globally unique, and only one machine connected to the public Internet can have a given public IP address. Private IP addresses are one of the solutions to reduce the exhaustion of IP address space: a private IP address has to be unique only within the set of networks of a particular organization. Larger organizations have sites at different locations in the world, and the hosts in the different sites may be identified with a unique private IP address; but the same set of private IP addresses can be used in the networks of different organizations. Hence a packet with a private IP address as the destination IP address cannot be used to route packets from one site to another site of an organization through the public Internet, because that address is not unique on the Internet and no router there can tell which organization's host is meant. The virtual private network (VPN) technology uses IP-in-IP tunnelling to encrypt and encapsulate the IP datagram that carries the private IP addresses of the two end hosts, wrapping it in another IP header whose source and destination are the public IP addresses of the gateway routers for the two private networks. Each organization is required to have one or more gateway routers with a public IP address in order to facilitate communication over the public Internet. As the original IP datagram is encrypted, no intermediate forwarding host in the public Internet can look at the contents of the message. The datagram therefore passes through three phases: leaving host X it carries source IP X and destination IP Y with an unencrypted payload; after encryption at gateway router R1 it carries source IP R1 and destination IP R2 and contains the encapsulated, encrypted version of the original datagram, in which form it crosses the public Internet; and after decryption at gateway router R2 it is again the original datagram with source IP X, destination IP Y and an unencrypted payload, ready for delivery to host Y.",
    markScheme: [
      'Public IP address defined — globally unique, only one machine on the public Internet can hold it (1.5)',
      'Private IP address defined — unique only within one organization’s set of networks (1.5)',
      'The reason private addresses cannot be routed — the same addresses are reused by different organizations (1.5)',
      'IP-in-IP tunnelling explained — the original datagram is encrypted and encapsulated in a new IP header (2)',
      'The new header carries the public addresses of the two gateway routers (1)',
      'Each organization needs at least one gateway router with a public IP address (0.5)',
      'States that no intermediate host can read the contents because the original datagram is encrypted (1)',
      'Diagram drawn showing the three phases of the datagram, correctly labelled (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 7 — SECURE PROTOCOLS: SSH AND TLS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 7 · Secure Shell (SSH)',
    figure: '/lecture-notes/cyb-221/ssh-connection.webp',
    question: 'What is SSH and what did it replace? With the aid of a diagram, describe the THREE phases over which an SSH connection is established.',
    modelAnswer: "Secure Shell (SSH) is a network protocol that allows a user to interact securely with remote machines by establishing a secure channel for data exchange. SSH replaced TELNET and other insecure remote shell programs that were used in the past to send information in plaintext, including passwords, to remote systems. SSH encrypts the information sent over the insecure Internet and thus provides both confidentiality and integrity of data. It operates over a sequence of three phases. Step 1, host identification: the client machine needs to ensure that it is communicating with the remote machine it has been asked to reach by the application program, and not with another machine spoofing it; the server on the remote side also has the option of ensuring the user is connecting from the machine it appears to be. The client contacts the server and requests its public-key certificate. The client maintains a list of public keys for the server machines available to it, and if asked to contact a machine for which it has no locally held public key it warns the user that the key reported by the server is not in the list of known hosts and asks whether to continue. If the user agrees, the client verifies the authenticity of the Certifying Authority that issued the certificate and, if satisfied, accepts the public keys and adds them to its personal list of host public keys. Where the administrator has included the client's public key on the server, the server may in turn require the client to prove itself: the server creates a challenge encrypted with the client's host public key, only a genuine client can decrypt it with its private key, and the client returns the same challenge encrypted with the server's public key — if the server decrypts it and gets back what it sent, the client is genuine. Step 2, encryption: the objective is to establish a secure end-to-end link supporting encryption of the data transferred, so that even the password and other authentication information are encrypted and never transmitted in plaintext. The client sends a list of encryption algorithms it could use and their corresponding keys, encrypted with the server's public key; the server decrypts the list with its private key and chooses the strongest algorithm it can handle; the server notifies the client of the selected algorithm, encrypting the notification with its private key; the client generates the appropriate secret session key for that algorithm and notifies the server, encrypting the notification with the server's public key; and the server decrypts the notification with its private key and extracts the secret session key. Step 3, user authentication: the user proves to the server the right to perform operations as a particular user on that machine. The client asks the user for a username and password, encrypts them with the server's public key and sends them; the server checks their validity and, if everything is fine, accepts the connection request by sending a confirmation encrypted with its private key; the client decrypts the confirmation with the server's public key, and both are then set to exchange data securely using the selected encryption algorithm and the agreed session key.",
    markScheme: [
      'SSH defined — secure interaction with remote machines over a secure channel (1)',
      'States that it replaced TELNET and other shells that sent information, including passwords, in plaintext (1)',
      'States that SSH provides confidentiality and integrity (0.5)',
      'All three phases correctly named (1)',
      'Host identification — the client requests and validates the server’s public-key certificate via its CA (1.5)',
      'Host identification — the known-hosts list and the warning for an unknown key (0.5)',
      'Host identification — the server’s challenge to the client and how it proves genuineness (1)',
      'Encryption phase — the client offers algorithms, the server picks the strongest it can handle (1.5)',
      'Encryption phase — the client generates the session key and the server extracts it (1)',
      'User authentication — username and password encrypted with the server’s public key (1)',
      'User authentication — the server confirms, encrypted with its private key, and data exchange begins (1)',
      'Diagram drawn as a client-server timeline with the messages in order (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 7 · Transport Layer Security (TLS)',
    figure: '/lecture-notes/cyb-221/tls-handshake.webp',
    question: 'What is TLS and what is it used for? With the aid of a diagram, describe the sequence of steps followed to establish a TLS connection between a client and a server.',
    modelAnswer: "Transport Layer Security (TLS) is the successor of the Secure Sockets Layer (SSL) cryptographic protocol, and it provides secure communication of the datagrams of the transport layer protocols as part of an end-to-end connection across the network. TLS has been used for a wide variety of applications such as web browsing, electronic mail, voice-over-IP and instant messaging. The steps are as follows. The client initiates the connection request by sending a ClientHello message to the server containing the latest TLS version supported by the client, a random number arbitrarily chosen by the client, and a list of suggested cipher suites — that is, the encryption algorithms to be used, the key exchange and authentication algorithms, and the hashing algorithms used to generate message authentication codes. The server responds with a ServerHello message containing the TLS version chosen by the server based on the version information submitted by the client, a random number arbitrarily chosen by the server, and the cipher suite chosen from the list of choices offered by the client. The server also sends its public-key certificate to the client; the client may contact the CA that issued the certificate and confirm that it is authentic before proceeding, and the server also has the option of asking for the client's public-key certificate by sending a CertificateRequest message so that the connection can be mutually authenticated. The client generates a shared session key and sends it along with the client-side and server-side random numbers, all encrypted with the public key of the server; the random numbers are merely sent to enhance each other's authentication. The server decrypts the message with its private key and extracts the shared session key. The client then computes a hash of the messages received so far from the server using the hashing algorithm agreed upon, encrypts the hash value with the shared session key using the encryption algorithm selected, and sends it to the server. The server decrypts the client's message with the shared session key and independently calculates the hash of all its messages to the client; if the values match, the server accepts the connection request from its direction, then computes a hash of all the messages it has received so far from the client and sends it to the client encrypted with the shared session key. The client decrypts that message and independently computes a hash of all the messages it has sent to the server; if the locally computed value matches the value sent by the server, the client has authenticated the server, and the TLS connection is established.",
    markScheme: [
      'TLS defined — successor of SSL, securing transport layer datagrams end to end (1)',
      'Two or more applications of TLS named (0.5)',
      'ClientHello described with all three items of information (1.5)',
      'ServerHello described with all three items of information (1.5)',
      'The server sends its public-key certificate; the client may verify it with the CA (0.5)',
      'CertificateRequest mentioned as the option for mutual authentication (0.5)',
      'The client generates the shared session key and sends it encrypted with the server’s public key (1.5)',
      'The server decrypts with its private key and extracts the session key (0.5)',
      'The two hash exchanges described, and their purpose — confirming both directions (1.5)',
      'Diagram drawn as a client-server timeline with the messages in order (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 8 — IP SECURITY (IPSEC)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 8 · IP Security / Security Association',
    question: 'What is IPSec and what shortcomings of the IP layer is it designed to address? Name the two protocols it uses, and explain what a Security Association is.',
    modelAnswer: "The IP Security Protocol suite (IPSec) is implemented at the IP layer, so it does not require any change to existing transport layer and application layer protocols. IPSec is primarily designed to address the fundamental shortcomings of the IP layer, such as IP address spoofing, wiretapping and session hijacking. Two protocols are used to provide packet-level security for both IPv4 and IPv6: the IP Authentication Header, AH, whose Next Header protocol ID is 51, which provides integrity, authentication and non-repudiation; and the IP Encapsulating Security Payload, ESP, whose Next Header protocol ID is 50, which provides confidentiality along with authentication and integrity protection. The basis of IPSec is a Security Association (SA), characterized by the set of security parameters agreed upon for a secure communication channel between two communicating hosts. Each host can have several SAs in effect for communication with different remote hosts. An SA is identified using a Security Parameter Index (SPI), a 32-bit identifier, together with the IP address of the partner host on the other side of the SA; the SPI and the partner IP address are used to index into the Security Association Database (SADB), which holds information about the characteristics of the different SAs. An SA is characterized by the following parameters: the encryption algorithm, the encryption key, encryption parameters such as the initialization vector, integrity or authentication algorithms — the keyed-HMAC algorithms and the key — and the lifespan of the SA. An SA is unidirectional: for two hosts to communicate in either direction, SAs have to be established separately in both directions. For host A to send data securely to host B and have host B believe the packet came from host A, it must establish an SA with host B; such an SA is said to be outbound at A and inbound at B, and the IPSec header of a datagram sent from A to B should carry the secure features of the SA that is inbound at B.",
    markScheme: [
      'IPSec located at the IP layer, requiring no change to transport or application protocols (1.5)',
      'The shortcomings named — IP address spoofing, wiretapping and session hijacking (1.5)',
      'AH named with protocol ID 51 and what it provides (1)',
      'ESP named with protocol ID 50 and what it provides (1)',
      'SA defined — the set of security parameters agreed for a secure channel between two hosts (1.5)',
      'SPI defined as a 32-bit identifier, used with the partner IP address to index the SADB (1.5)',
      'Any three SA parameters named (1)',
      'SA is unidirectional — separate SAs are needed in each direction (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 8 · Security Association',
    question: 'Describe the procedure for establishing an IPSec Security Association between host A and host B, including what must happen before it can begin.',
    modelAnswer: "Prior to establishing an IPSec SA, the two end hosts need to exchange their public-key certificates, digitally certified by a trusted third-party certificate authority (CA). This is done through the Internet Key Exchange (IKE) protocol. Once the two hosts have exchanged each other's public-key certificates they are said to have established an IKE Security Association (IKE SA), and establishing an IKE SA is a pre-requisite to establishing an IPSec SA. The procedure is then as follows. Host A, wishing to send data packets to host B, needs to establish an inbound SA with host B. Host A picks an SPI that has not yet been chosen for communication with B and sends an SA Establishment Request message to B, containing the SPI for the inbound SA channel at host A, which is the outbound SA channel at host B; the lifespan of the association, negotiable by host B; and the packet-level security protocol chosen, AH or ESP, also negotiable by host B. If AH is chosen, the list of keyed-HMAC algorithms that could be used is specified, and host B will choose one from this list if it wishes to receive packets from host A. If ESP is chosen, the list of keyed-HMAC algorithms is sent along with the list of encryption algorithms and key-derivation functions that could be used. All negotiation messages, including the SA Establishment Request, are encrypted at the sender side using the receiver's public key and decrypted with the receiver's private key at the receiver side. Hosts A and B then agree on a shared session key using the Diffie-Hellman exchange algorithm; the shared session key is used for the keyed-HMAC algorithm; and each host uses the shared session key and the key-derivation function agreed upon to derive the secret key to be used for encryption and decryption of the data at hosts A and B respectively.",
    markScheme: [
      'The pre-requisite stated — public-key certificates exchanged through IKE, forming an IKE SA (1.5)',
      'Host A picks an unused SPI and sends an SA Establishment Request to B (1.5)',
      'The request carries the SPI for the inbound SA channel at A (1)',
      'The request carries the lifespan, negotiable by B (0.5)',
      'The request carries the chosen protocol, AH or ESP, negotiable by B (1)',
      'If AH — the list of keyed-HMAC algorithms is specified and B chooses one (1)',
      'If ESP — keyed-HMAC algorithms plus encryption algorithms and key-derivation functions (1)',
      'All negotiation messages encrypted with the receiver’s public key (0.5)',
      'Diffie-Hellman used to agree the shared session key (1)',
      'The key-derivation function used with the session key to derive the data encryption key (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 · Authentication Header (AH)',
    figure: '/lecture-notes/cyb-221/ah-header.webp',
    question: 'With the aid of a diagram, describe the structure of the IPSec Authentication Header and the function of each of its fields.',
    modelAnswer: "AH provides integrity and data origin authentication for IP datagrams. AH operates on top of IP, using IP protocol number 51. Its fields are as follows. Next Header — identifies the transport layer protocol. Payload Length, also called AH Length — indicates the length of the whole AH in 32-bit words. Reserved — indicates that this field is reserved for future use and must be set to zero. SPI — identifies the security association. Sequence Number — identifies the datagrams sent as part of an SA; this field is a monotonically increasing identifier and is used to assist in anti-replay protection. Authentication Data — contains the integrity or authentication check value, a keyed-HMAC, calculated over the entire packet including the header fields that do not change at the intermediate hosts; the size of the keyed-HMAC may vary with each SA and may not be exactly a multiple of 32 bits, in which case the HMAC will be padded. Note that although an earlier passage lists non-repudiation among AH's services, AH authenticates with a keyed HMAC whose key is held by both ends, so neither end can be proved to a third party to have produced a given check value; the accurate claim is integrity and data origin authentication.",
    markScheme: [
      'AH’s services stated — integrity and data origin authentication (1)',
      'AH operates on top of IP using protocol number 51 (0.5)',
      'Next Header — identifies the transport layer protocol (1)',
      'Payload Length / AH Length — length of the whole AH in 32-bit words (1)',
      'Reserved — for future use, must be set to zero (1)',
      'SPI — identifies the security association (1)',
      'Sequence Number — monotonically increasing, assists anti-replay protection (1)',
      'Authentication Data — keyed-HMAC over the entire packet including immutable header fields (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 · Encapsulated Security Payload (ESP)',
    figure: '/lecture-notes/cyb-221/esp-header.webp',
    question: 'With the aid of a diagram, describe the fields of the ESP header. State the difference in what AH and ESP each authenticate, and say which you would choose to build a VPN.',
    modelAnswer: "ESP provides origin authentication, integrity and confidentiality protection for IP datagrams; its Next Header protocol ID is 50. Its fields are as follows. SPI — identifies the security association. Sequence Number — identifies the datagrams sent as part of an SA; a monotonically increasing identifier used to assist in anti-replay protection. Payload data — indicates the data to be transferred. Padding — used with certain block ciphers for padding the payload data to a full block length. Pad length — indicates the size of the padding in bytes. Next Header — identifies the transport layer protocol. Authentication Data — the integrity or authentication check value, a keyed-HMAC, calculated over only the SPI and Sequence Number in the ESP header, the actual data, the padding data, the pad length and the Next Header field. The difference in scope is the key point: AH calculates its check value over the entire packet, including the fields of the outer IP header that do not change at intermediate hosts, whereas ESP authenticates only from the ESP header inwards and leaves the outer IP header outside its protection. AH therefore proves who sent a packet and that nobody altered it, but anyone watching the wire can still read the contents; ESP does all of that and encrypts the payload as well. For a VPN, ESP is the choice, because a VPN's purpose is to keep the traffic private across the public Internet, which requires the confidentiality that AH does not offer.",
    markScheme: [
      'SPI and Sequence Number described (1)',
      'Payload data described (0.5)',
      'Padding described — padding the payload to a full block length for block ciphers (1)',
      'Pad length described (0.5)',
      'Next Header described (0.5)',
      'Authentication Data described, with its restricted scope over the ESP header inwards (1.5)',
      'The difference stated — AH covers the whole packet including immutable IP header fields, ESP does not (1.5)',
      'ESP chosen for a VPN, with confidentiality given as the reason (1.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 9 — KERBEROS AND MOBILE DEVICE SECURITY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 9 · Kerberos',
    figure: '/lecture-notes/cyb-221/kerberos.webp',
    question: 'What is Kerberos and what assumption does its security depend on? Name the four entities involved, and with the aid of a diagram describe the four steps of the protocol.',
    modelAnswer: "Kerberos is an authentication protocol used by processes and hosts communicating over an insecure network to verify each other's identity in a secure manner. It is based on the idea that a central server provides authenticated tokens called tickets to requesting applications; a ticket is an unforgeable, non-replayable, authenticated object. The security of the protocol depends on the assumption that the participating machines maintain loosely synchronized time. The four entities involved are the Authentication Server (AS), the Ticket Granting Server (TGS), the Service Server (SS) and the Ticket Granting Ticket (TGT). A client authenticates itself to the AS once and obtains a ticket that can be used to obtain additional tickets from the TGS, without requiring the client to re-authenticate itself for every service requested. Step 1, user client-based logon: the user submits the username and password to the client machine, and the client uses a one-way function on the entered password to compute the secret key for the user. Step 2, client authentication: the client sends the username in plaintext to the AS; the AS checks the username in its database and, if an entry exists, sends back two messages. Message A contains the Client/TGS session key encrypted with the secret key for the user, derived from the user's password at the AS. Message B contains the Ticket Granting Ticket, which includes the username, the network address of the user's client machine, the validity period of the TGT and the Client/TGS session key, all encrypted using the secret key of the TGS. On receiving A and B the client decrypts message A with the user's secret key and extracts the Client/TGS session key. Step 3, client service authorization: the client sends message C, containing the TGT from message B and identification for the requested service, and message D, containing the username, the network address of the client machine and a timestamp, all encrypted using the Client/TGS session key. The TGS decrypts message C with its secret key and extracts the Client/TGS session key, decrypts message D with that session key, and sends back message E, containing the Client-to-Server ticket — the username, the network address of the client machine, the validity period of the ticket and the Client/Server session key, encrypted with the secret key of the server for the service requested — and message F, containing the Client/Server session key and the timestamp of message D incremented by 1, both encrypted with the Client/TGS session key. The client uses the Client/TGS session key to decrypt message F and extract the Client/Server session key. Step 4, client service request: the client sends message E, as received from the TGS, and message G, containing the username, the network address of the client machine and a timestamp, all encrypted with the Client/Server session key. The SS decrypts message E with its own secret key to extract the Client-to-Server ticket and the Client/Server session key, then decrypts message G with the Client/Server session key and extracts the client identification information. If the information in message G matches that in the Client-to-Server ticket, the SS increments the timestamp in message G by 1, encrypts it with the Client/Server session key and sends it back as message H. The client decrypts message H, and if the timestamp is the value it expected, the client trusts the server and starts sending service requests to it.",
    markScheme: [
      'Kerberos defined — mutual identity verification over an insecure network using tickets from a central server (1)',
      'A ticket characterised — unforgeable, non-replayable, authenticated object (0.5)',
      'The assumption stated — participating machines maintain loosely synchronized time (1)',
      'All four entities named (1.5)',
      'Step 1 — the client computes the user’s secret key with a one-way function on the password (1)',
      'Step 2 — the AS checks the username and returns messages A and B (1)',
      'Message B identified as the TGT, encrypted with the TGS secret key (1)',
      'Step 3 — messages C and D sent to the TGS, D encrypted with the Client/TGS session key (1)',
      'Messages E and F returned, E being the Client-to-Server ticket encrypted with the service’s secret key (1.5)',
      'Step 4 — E and G sent to the SS, which verifies G against the ticket (1)',
      'Message H returns the timestamp incremented by 1, which is how the client authenticates the server (1)',
      'Diagram drawn showing the client and the three servers with the messages labelled (0.5)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Topic 9 · Kerberos Advantages',
    question: 'State the FIVE advantages of Kerberos.',
    items: [
      { name: 'Password is not sent on the wire', aliases: ['password not sent', 'password never transmitted', 'no password on the wire'], explain: 'A user’s password is not sent on the wire, in plaintext or ciphertext, during session initiation.' },
      { name: 'Cryptographic protection against spoofing', aliases: ['protection against spoofing', 'anti-spoofing'], explain: 'Every service access request is mediated by the TGS, which knows the AS authenticated the client and processes the request encrypted with the Client/TGS session key.' },
      { name: 'Limited ticket validity period', aliases: ['limited validity', 'tickets expire', 'ticket lifetime'], explain: 'Each ticket has a limited validity period, so long-term cryptanalytic attacks cannot be launched.' },
      { name: 'Synchronized clocks and timestamp checking', aliases: ['synchronized clocks', 'clock synchronization', 'timestamps'], explain: 'Clocks across all clients and servers are assumed synchronized; a host responds only if the request’s timestamp is close to its own current time.' },
      { name: 'Mutual authentication', aliases: ['mutual auth'], explain: 'The TGS and SS reach their session keys only by decrypting with their own secret keys, which the client uses to indirectly authenticate the servers.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Topic 9 · Kerberos Weaknesses',
    question: 'State the SIX weaknesses of Kerberos.',
    items: [
      { name: 'Continuous availability of the ticket-granting server required', aliases: ['availability of the server', 'single point of failure', 'server must be available'], explain: 'Every access control and authentication check needs a trusted ticket-granting server that is up.' },
      { name: 'Trusted relationship needed with every service server', aliases: ['trusted relationship', 'authenticity of servers'], explain: 'Authenticity of servers requires a trusted relationship between the TGS and every service server.' },
      { name: 'Timely transactions required', aliases: ['timeliness', 'timely transactions'], explain: 'Transactions must be timely, or a user holding a genuine ticket may be denied service.' },
      { name: 'Password guessing still works', aliases: ['password guessing', 'dependent on user password'], explain: 'Guessing can still recover a valid secret key — the whole system remains dependent on the user password.' },
      { name: 'Does not scale well', aliases: ['scalability', 'poor scaling'], explain: 'The TGS must maintain a trustworthy relationship and a secret key for each SS; backup service servers complicate it further.' },
      { name: 'No network access without Kerberos authentication', aliases: ['all applications must go through kerberos', 'no access without kerberos'], explain: 'Network services cannot be reached without Kerberos authentication — every application on the network must go through it.' },
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 9 · Mobile Device Security',
    question: 'Why is security on phones and mobile devices at least as important as on desktop and laptop computers? State and explain any SIX measures to be considered for mobile devices.',
    modelAnswer: "Nowadays phones are like handheld laptops, able to browse the internet, and tablets are used to control other IoT devices. Security on phones and mobile devices is as important as it is on desktop and laptop computers, and even more so, because of the additional functionality that comes with an internet-connected device that can go almost anywhere — a compromised phone is not only a compromised phone, but a route into everything that phone controls. The measures to consider are as follows. Virus protection is extremely important on cellphones, as they utilize third-party networks while roaming and connect to an average of 160 different IP addresses daily. Physical security is equally important, since devices are small and can easily be slipped out of sight by a would-be thief. Mobile Device Management (MDM) software should be used to track devices through GPS and to track usage, and to remotely wipe the device or take photos if it is lost or stolen. Additional anti-theft software can be installed to further protect the device and its data, and it even remains installed after a factory reset. Practise the same think-before-you-click mindset on mobile devices that you have on desktop and laptop machines, since some phishing specifically targets mobile devices. Never do any online banking on a smartphone or tablet; only use a wired connection for added security. Utilize any encryption the device has built into its settings, usually found under Security. Never connect to unknown WiFi networks. Only turn on Bluetooth when you need to use it, for example when making phone calls in a car.",
    markScheme: [
      'The reason given — the extra functionality of an internet-connected device that goes anywhere (1.5)',
      'First measure named and explained (1.25)',
      'Second measure named and explained (1.25)',
      'Third measure named and explained (1.25)',
      'Fourth measure named and explained (1.25)',
      'Fifth measure named and explained (1.25)',
      'Sixth measure named and explained (1.25)',
    ],
  },

];
