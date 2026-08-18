// UUY-CYB 221 — Network Defense Fundamentals
// Lecture notes transcribed from the departmental Laboratory Manual, whose
// title page reads "CYB 224: NETWORK DEFENSE FUNDAMENTALS — LABORATORY MANUAL",
// prepared by Dr. Samuel A. Robinson, Department of Cyber Security,
// University of Uyo.
//
// COURSE CODE DISCREPANCY: the manual's title page says CYB 224, but this
// catalogue carries Network Defense Fundamentals as UUY-CYB 221 and lists
// CYB 224 as Information and Big Data Security. Unresolved — do not "fix"
// either entry without checking what the department actually examines.
//
// SECTION NUMBERS: the manual's body headings carry NO numbers — every printed
// heading is bare (`CLASSIFICATION OF THREATS`, `CIA Triad`, `Kerberos`…). The
// numbers used in the headings below are the row numbers of the manual's own
// `OUTLINES` table on printed pp. 2–3, which has 24 rows. Rows 1–24 are checked
// against that table one by one; two mismatches were found and fixed:
//   · outline row 8 is a single row, "Hardware Attacks and Cyber Threat
//     Categories" — it had been split into two note sections, 8 and a
//     fabricated 9.
//   · "Definition of a Firewall" is outline row 9, not 10, and "Firewall
//     Technologies" is row 10 — it had been left unnumbered.
// Mobile Device Security (printed p. 38) has NO outline row; the manual's
// theory simply runs past the end of its own outline.
//
// `covers` / `partial` refer to 1-based indices in the course's `topics` array
// in courses.js — CourseDetail uses them to show which syllabus items the notes
// actually reach. The manual's 24-item outline does not line up with the 8-item
// departmental syllabus; the mapping below is against the syllabus.
//
// Figures live in public/lecture-notes/cyb-221/. Two provenances:
//   · Figures 1–15 (the borrowed paper's sequence) come from the lecturer's own
//     source images, supplied as a .docx transcription of the manual. Each one
//     was checked side by side against the corresponding PDF page scan before
//     use; all 15 match the print exactly, in their original colour.
//   · `seven-layers.webp` and `cyber-attacker-actions.webp` are cropped from the
//     page photographs, because the .docx carried a *different* seven-layers
//     diagram (no numbers, sub-text, icons or title) and omitted the
//     cyber-attacker tree entirely.
// Cropping from the scans uses the page's embedded photo at native resolution;
// everything is converted by scripts/optimize-lecture-images.mjs.
//
// FIGURE PLACEMENT: the manual prints Figures 4, 5, 7, 8 and 15 before the prose
// that explains them, and prints Figures 4 and 5 side by side. Here each figure
// sits beside the paragraph it illustrates. The diagrams and their captions are
// unchanged; only where they fall in the reading order differs.
//
// WARNING FOR FUTURE EDITORS: the figures that were here before this pass were
// Mermaid diagrams drawn from the surrounding prose and captioned as if they
// were the manual's. They contained content the lecturer never wrote (the fake
// Figure 3 invented "Advertised Window" arrow labels and a "Connection
// Established" state box). Never generate a figure and caption it as the
// manual's — crop it, or leave it out and say so.
//
// NOTE ON FIGURE NUMBERING: the manual contains two independent figure
// sequences. Its own "Figure 1. Seven Layers of Cyber Security" (p. 6, printed
// with a period) is unrelated to "Figure 1: OSI Model" (p. 19, printed with a
// colon) — pp. 18–38 are lifted from a published paper, which the manual refers
// to as "this paper" and cites as [8], [9], [26]. That paper carries its own
// Figures 1–15.
//
// TRANSCRIPTION POLICY: the lecturer's wording is reproduced as printed,
// including his own errors, spellings and typography. Where a printed statement
// conflicts with the standard definition, the statement is KEPT and a `note`
// section names the conflict — it is never silently corrected. Material added
// beyond the manual is marked "Added for clarity" or stated in the section text.

const IMG = '/lecture-notes/cyb-221';

export const cyb221LectureNotes = [
  {
    number: '1',
    title: 'Threats, Vulnerabilities and the CIA Triad',
    covers: [2],
    partial: [1],
    sections: [
      {
        type: 'definition',
        heading: '1. Classification of Threats',
        text: 'A cyber-attack is an exploitation of computer systems and networks. It uses malicious code to alter computer code, logic or data and lead to cybercrimes, such as information and identity theft.',
      },
      {
        type: 'bullets',
        heading: 'Cyber-attacks can be classified into the following categories:',
        items: [
          'Web-based attacks',
          'System-based attacks',
        ],
      },
      {
        type: 'text',
        heading: 'Web-based attacks',
        text: 'These are the attacks which occur on a website or web applications. Some of the important web-based attacks are as follows-',
      },
      {
        type: 'termlist',
        items: [
          { term: '1. Injection attacks', def: 'It is the attack in which some data will be injected into a web application to manipulate the application and fetch the required information. Example- SQL Injection, code Injection, log Injection, XML Injection etc.' },
          { term: '2. DNS Spoofing', def: 'DNS Spoofing is a type of computer security hacking. Whereby a data is introduced into a DNS resolver’s cache causing the name server to return an incorrect IP address, diverting traffic to the attacker’s computer or any other computer. The DNS spoofing attacks can go on for a long period of time without being detected and can cause serious security issues.' },
          { term: '3. Session Hijacking', def: 'It is a security attack on a user session over a protected network. Web applications create cookies to store the state and user sessions. By stealing the cookies, an attacker can have access to all of the user data.' },
          { term: '4. Phishing', def: 'Phishing is a type of attack which attempts to steal sensitive information like user login credentials and credit card number. It occurs when an attacker is masquerading as a trustworthy entity in electronic communication.' },
          { term: '5. Brute force', def: 'It is a type of attack which uses a trial-and-error method. This attack generates a large number of guesses and validates them to obtain actual data like user password and personal identification number. This attack may be used by criminals to crack encrypted data, or by security, analysts to test an organization’s network security.' },
          { term: '6. Denial of Service', def: 'It is an attack which meant to make a server or network resource unavailable to the users. It accomplishes this by flooding the target with traffic or sending it information that triggers a crash. It uses the single system and single internet connection to attack a server. It can be classified into the following-' },
        ],
      },
      {
        type: 'bullets',
        items: [
          'Volume-based attacks- Its goal is to saturate the bandwidth of the attacked site, and is measured in bit per second.',
          'Protocol attacks- It consumes actual server resources, and is measured in a packet.',
          'Application layer attacks- Its goal is to crash the web server and is measured in request per second.',
        ],
      },
      {
        type: 'termlist',
        items: [
          { term: '7. Dictionary attacks', def: 'This type of attack stored the list of a commonly used password and validated them to get original password.' },
          { term: '8. URL Interpretation', def: 'It is a type of attack where we can change the certain parts of a URL, and one can make a web server to deliver web pages for which he is not authorized to browse.' },
          { term: '9. File Inclusion attacks', def: 'It is a type of attack that allows an attacker to access unauthorized or essential files which is available on the web server or to execute malicious files on the web server by making use of the include functionality.' },
          { term: '10. Man in the middle attacks', def: 'It is a type of attack that allows an attacker to intercepts the connection between client and server and acts as a bridge between them. Due to this, an attacker will be able to read, insert and modify the data in the intercepted connection.' },
        ],
      },
      {
        type: 'text',
        heading: 'System-based attacks',
        text: 'These are the attacks which are intended to compromise a computer or a computer network. Some of the important system-based attacks are as follows-',
      },
      {
        type: 'termlist',
        items: [
          { term: '1. Virus', def: 'It is a type of malicious software program that spread throughout the computer files without the knowledge of a user. It is a self-replicating malicious computer program that replicates by inserting copies of itself into other computer programs when executed. It can also execute instructions that cause harm to the system.' },
          { term: '2. Worm', def: 'It is a type of malware whose primary function is to replicate itself to spread to uninfected computers. It works same as the computer virus. Worms often originate from email attachments that appear to be from trusted senders.' },
          { term: '3. Trojan horse', def: 'It is a malicious program that occurs unexpected changes to computer setting and unusual activity, even when the computer should be idle. It misleads the user of its true intent. It appears to be a normal application but when opened/executed some malicious code will run in the background.' },
          { term: '4. Backdoors', def: 'It is a method that bypasses the normal authentication process. A developer may create a backdoor so that an application or operating system can be accessed for troubleshooting or other purposes.' },
          { term: '5. Bots', def: 'A bot (short for "robot") is an automated process that interacts with other network services. Some bots program run automatically, while others only execute commands when they receive specific input. Common examples of bots program are the crawler, chatroom bots, and malicious bots.' },
        ],
      },

      {
        type: 'definition',
        heading: '2. The 7 Layers of Cyber Security',
        text: 'The 7 layers of cyber security should Centre on the mission critical assets you are seeking to protect.',
      },
      {
        type: 'image',
        src: `${IMG}/seven-layers.webp`,
        width: 1100, height: 816,
        caption: 'Figure 1. Seven Layers of Cyber Security',
        alt: 'Concentric half-rings labelled, from the outside in: 1 The Human Layer, 2 Perimeter Security, 3 Network Security, 4 Endpoint Security, 5 Application Security, 6 Data Security, 7 Mission Critical Assets',
      },
      {
        type: 'note',
        items: [
          'The figure and the text below it number the layers in opposite directions. The figure counts inwards — 1 is the human layer and 7 is mission-critical assets. The lecturer’s own list, reproduced below, counts outwards — 1 is mission-critical assets and 7 is the human layer. Learn the list, not the badge numbers on the diagram.',
          'The figure also titles itself "THE 7 LAYERS OF CYBERSECURITY" while the printed section heading reads "THE 7 LAYERS OF CYBER SECURITY".',
        ],
      },
      {
        type: 'bullets',
        items: [
          '1: Mission Critical Assets – This is the data you need to protect',
          '2: Data Security – Data security controls protect the storage and transfer of data.',
          '3: Application Security – Applications security controls protect access to an application, an application’s access to your mission critical assets, and the internal security of the application.',
          '4: Endpoint Security – Endpoint security controls protect the connection between devices and the network.',
          '5: Network Security – Network security controls protect an organization’s network and prevent unauthorized access of the network.',
          '6: Perimeter Security – Perimeter security controls include both the physical and digital security methodologies that protect the business overall.',
          '7: The Human Layer – Humans are the weakest link in any cyber security posture. Human security controls include phishing simulations and access management controls that protect mission critical assets from a wide variety of human threats, including cyber criminals, malicious insiders, and negligent users.',
        ],
      },

      {
        type: 'definition',
        heading: '3. Vulnerability, Threat, Harmful Acts',
        text: 'As the recent epidemic of data breaches illustrates, no system is immune to attacks. Any company that manages, transmits, stores, or otherwise handles data has to institute and enforce mechanisms to monitor their cyber environment, identify vulnerabilities, and close up security holes as quickly as possible. Before identifying specific dangers to modern data systems, it is crucial to understand the distinction between cyber threats and vulnerabilities.',
      },
      {
        type: 'text',
        text: 'Cyber threats are security incidents or circumstances with the potential to have a negative outcome for your network or other data management systems.',
      },
      {
        type: 'text',
        text: 'Examples of common types of security threats include phishing attacks that result in the installation of malware that infects your data, failure of a staff member to follow data protection protocols that cause a data breach, or even a tornado that takes down your company’s data headquarters, disrupting access.',
      },
      {
        type: 'text',
        text: 'Vulnerabilities are the gaps or weaknesses in a system that make threats possible and tempt threat actors to exploit them.',
      },
      {
        type: 'bullets',
        heading: 'Types of Vulnerabilities',
        items: [
          'Types of vulnerabilities in network security include but are not limited to',
          'i. SQL injections,',
          'ii. server misconfigurations,',
          'iii. cross-site scripting',
          'iv. transmitting sensitive data in a non-encrypted plain text format.',
        ],
      },
      {
        type: 'text',
        text: 'When threat probability is multiplied by the potential loss that may result, cyber security experts, refer to this as a risk.',
      },
      {
        type: 'bullets',
        heading: 'SECURITY VULNERABILITIES, THREATS AND ATTACKS — Categories of vulnerabilities',
        items: [
          'Corrupted (Loss of integrity)',
          'Leaky (Loss of confidentiality)',
          'Unavailable or very slow (Loss of availability)',
        ],
      },
      {
        type: 'bullets',
        items: [
          'Threats represent potential security harm to an asset when vulnerabilities are exploited',
          'Attacks are threats that have been carried out',
          'Passive – Make use of information from the system without affecting system resources',
          'Active – Alter system resources or affect operation',
          'Insider – Initiated by an entity inside the organization',
          'Outsider – Initiated from outside the perimeter',
        ],
      },
      {
        type: 'text',
        heading: 'Computer criminals',
        text: 'Computer criminals have access to enormous amounts of hardware, software, and data; they have the potential to cripple much of effective business and government throughout the world. In a sense, the purpose of computer security is to prevent these criminals from doing damage.',
      },
      {
        type: 'text',
        text: 'We say computer crime is any crime involving a computer or aided by the use of one. Although this definition is admittedly broad, it allows us to consider ways to protect ourselves, our businesses, and our communities against those who use computers maliciously.',
      },
      {
        type: 'text',
        text: 'One approach to prevention or moderation is to understand who commits these crimes and why. Many studies have attempted to determine the characteristics of computer criminals. By studying those who have already used computers to commit crimes, we may be able in the future to spot likely criminals and prevent the crimes from occurring.',
      },

      {
        type: 'definition',
        heading: '4. CIA Triad',
        text: 'The CIA Triad is actually a security model that has been developed to help people think about various parts of IT security.',
      },
      {
        type: 'text',
        text: 'CIA triad broken down:',
      },
      {
        type: 'text',
        heading: 'Confidentiality',
        text: 'It’s crucial in today’s world for people to protect their sensitive, private information from unauthorized access.',
      },
      {
        type: 'text',
        text: 'Protecting confidentiality is dependent on being able to define and enforce certain access levels for information.',
      },
      {
        type: 'text',
        text: 'In some cases, doing this involves separating information into various collections that are organized by who needs access to the information and how sensitive that information actually is - i.e. the amount of damage suffered if the confidentiality was breached.',
      },
      {
        type: 'text',
        text: 'Some of the most common means used to manage confidentiality include access control lists, volume and file encryption, and Unix file permissions.',
      },
      {
        type: 'text',
        heading: 'Integrity',
        text: 'Data integrity is what the "I" in CIA Triad stands for.',
      },
      {
        type: 'text',
        text: 'This is an essential component of the CIA Triad and designed to protect data from deletion or modification from any unauthorized party, and it ensures that when an authorized person makes a change that should not have been made the damage can be reversed.',
      },
      {
        type: 'text',
        heading: 'Availability',
        text: 'This is the final component of the CIA Triad and refers to the actual availability of your data. Authentication mechanisms, access channels and systems all have to work properly for the information they protect and ensure it’s available when it is needed.',
      },
      {
        type: 'text',
        heading: 'Understanding the CIA triad',
        text: 'The CIA Triad is all about information. While this is considered the core factor of the majority of IT security, it promotes a limited view of the security that ignores other important factors.',
      },
      {
        type: 'text',
        text: 'For example, even though availability may serve to make sure you don’t lose access to resources needed to provide information when it is needed, thinking about information security in itself doesn’t guarantee that someone else hasn’t used your hardware resources without authorization.',
      },
      {
        type: 'text',
        text: 'It is important to understand what the CIA Triad is, how it is used to plan and also to implement a quality security policy while understanding the various principles behind it. It’s also important to understand the limitations it presents. When you are informed, you can utilize the CIA Triad for what it has to offer and avoid the consequences that may come along by not understanding it.',
      },

      {
        type: 'definition',
        heading: '5. Assets and Threat',
        text: 'What is an Asset: An asset is any data, device or other component of an organization’s systems that is valuable – often because it contains sensitive data or can be used to access such information.',
      },
      {
        type: 'text',
        text: 'For example: An employee’s desktop computer, laptop or company phone would be considered an asset, as would applications on those devices. Likewise, critical infrastructure, such as servers and support systems, are assets. An organization’s most common assets are information assets. These are things such as databases and physical files – i.e. the sensitive data that you store',
      },
      {
        type: 'text',
        text: 'What is a threat: A threat is any incident that could negatively affect an asset – for example, if it’s lost, knocked offline or accessed by an unauthorized party.',
      },
      {
        type: 'text',
        text: 'Threats can be categorized as circumstances that compromise the confidentiality, integrity or availability of an asset, and can either be intentional or accidental.',
      },
      {
        type: 'text',
        text: 'Intentional threats include things such as criminal hacking or a malicious insider stealing information, whereas accidental threats generally involve employee error, a technical malfunction or an event that causes physical damage, such as a fire or natural disaster.',
      },
      {
        type: 'text',
        heading: 'Motive of Attackers',
        text: 'The categories of cyber-attackers enable us to better understand the attackers\' motivations and the actions they take. As shown in Figure, operational cyber security risks arise from three types of actions: i) inadvertent actions (generally by insiders) that are taken without malicious or harmful intent; ii) deliberate actions (by insiders or outsiders) that are taken intentionally and are meant to do harm; and iii) inaction (generally by insiders), such as a failure to act in a given situation, either because of a lack of appropriate skills, knowledge, guidance, or availability of the correct person to take action Of primary concern here are deliberate actions, of which there are three categories of motivation.',
      },
      {
        type: 'bullets',
        items: [
          '1. Political motivations: examples include destroying, disrupting, or taking control of targets; espionage; and making political statements, protests or retaliatory actions.',
          '2. Economic motivations: examples include theft of intellectual property or other economically valuable assets (e.g., funds, credit card information); fraud; industrial espionage and sabotage; and blackmail.',
          '3. Socio-cultural motivations: examples include attacks with philosophical, theological, political, and even humanitarian goals. Socio-cultural motivations also include fun, curiosity, and a desire for publicity or ego gratification.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/cyber-attacker-actions.webp`,
        width: 1313, height: 745,
        caption: 'Cyber-Attacker Actions (printed without a figure number or caption)',
        alt: 'Tree diagram: Cyber-Attacker Actions branches to Inadvertent, Deliberate and Inaction; Deliberate branches further to Political, Economic and Socio-Cultural',
      },
      {
        type: 'note',
        items: [
          'The manual prints this diagram with no caption and no figure number, and the sentence above it reads "As shown in Figure," — the number is missing in the printed text too, not lost in transcription.',
        ],
      },

      {
        type: 'definition',
        heading: '6. Types of Cyber-Attacker Actions',
        text: 'Active attacks: An active attack is a network exploit in which a hacker attempts to make changes to data on the target or data en route to the target.',
      },
      {
        type: 'termlist',
        heading: 'Types of Active attacks:',
        items: [
          { term: 'Masquerade', def: 'in this attack, the intruder pretends to be a particular user of a system to gain access or to gain greater privileges than they are authorized for. A masquerade may be attempted through the use of stolen login IDs and passwords, through finding security gaps in programs or through bypassing the authentication mechanism.' },
          { term: 'Session replay', def: 'In this type of attack, a hacker steals an authorized user’s log in information by stealing the session ID. The intruder gains access and the ability to do anything the authorized user can do on the website.' },
          { term: 'Message modification', def: 'In this attack, an intruder alters packet header addresses to direct a message to a different destination or modify the data on a target machine.' },
          { term: 'Denial of service (DoS)', def: 'In a denial of service (DoS) attack, users are deprived of access to a network or web resource. This is generally accomplished by overwhelming the target with more traffic than it can handle.' },
          { term: 'Distributed denial-of-service (DDoS)', def: 'In a distributed denial-of-service (DDoS) exploit, large numbers of compromised systems (sometimes called a botnet or zombie army) attack a single target.' },
        ],
      },
      {
        type: 'definition',
        text: 'Passive Attacks: Passive attacks are relatively scarce from a classification perspective, but can be carried out with relative ease, particularly if the traffic is not encrypted.',
      },
      {
        type: 'termlist',
        heading: 'Types of Passive Attacks',
        items: [
          { term: 'Eavesdropping (tapping)', def: 'the attacker simply listens to messages exchanged by two entities. For the attack to be useful, the traffic must not be encrypted. Any unencrypted information, such as a password sent in response to an HTTP request, may be retrieved by the attacker.' },
          { term: 'Traffic analysis', def: 'the attacker looks at the metadata transmitted in traffic in order to deduce information relating to the exchange and the participating entities, e.g. the form of the exchanged traffic (rate, duration, etc.). In the cases where encrypted data are used, traffic analysis can also lead to attacks by cryptanalysis, whereby the attacker may obtain information or succeed in unencrypting the traffic.' },
        ],
      },
    ],
  },

  {
    number: '2',
    title: 'Malware, Hardware Attacks and Threat Categories',
    covers: [2],
    sections: [
      {
        type: 'definition',
        heading: '7. Software Attacks: Malware',
        text: 'Software Attacks: Malicious code (sometimes called malware) is a type of software designed to take over or damage a computer user\'s operating system, without the user\'s knowledge or approval. It can be very difficult to remove and very damaging. Common malware examples are listed in the following table:',
      },
      {
        type: 'table',
        heading: 'Cyber Attacks and Their Characteristics',
        headers: ['Attack', 'Characteristics'],
        rows: [
          ['Virus', 'A virus is a program that attempts to damage a computer system and replicate itself to other computer systems. • Requires a host to replicate and usually attaches itself to a host file or hard drive sector. • Replicates each time the host is used. • Often focuses on destruction or corruption of data. • Usually attaches to executable files such as .doc, .exe and .bat extensions. • Often distributes through e-mail and may send itself to contacts. • Examples: Stoned, Michelangelo, Melissa, I Love You.'],
          ['Worm', 'A worm is a self-replicating program that can perform harmful activities such as deleting files or sending documents through e-mail. • Can install a backdoor in an infected computer. • Usually introduced through system vulnerabilities. • Infects one system and spreads to other systems on the network. • Example: Code Red.'],
          ['Trojan Horse', 'A Trojan horse is a malicious program disguised as legitimate software. • Cannot replicate itself. • Often contains spying functions such as packet sniffers or backdoor functions for remote control. • Often hidden inside useful software such as screen savers or games. • Examples: Back Orifice, Net Bus, Whack-a-Mole.'],
          ['Logic Bomb', 'A Logic Bomb is malware that remains inactive until a specific trigger occurs. • Trigger activities may include a specific date/time, launching a program, or processing a specific activity. • Logic bombs do not self-replicate.'],
        ],
      },
      {
        type: 'note',
        items: [
          'The virus row lists ".doc" among "executable files". A .doc file is a Word document, not an executable — it is data that Word opens. The reason it belongs on a list of infection vectors is macro viruses: a .doc can carry VBA macro code that runs when the document is opened. Melissa, named two lines later in the same row, was exactly that. Reproduce the lecturer\'s list if he asks for it, but know why .doc is the odd one out.',
        ],
      },

      {
        type: 'definition',
        heading: '8. Hardware Attacks and Cyber Threat Categories',
        text: 'Hardware Attacks: Common hardware attacks include:',
      },
      {
        type: 'bullets',
        items: [
          'Manufacturing backdoors, for malware or other penetrative purposes; backdoors aren’t limited to software and hardware, but they also affect embedded radio-frequency identification (RFID) chips and memory',
          'Eavesdropping by gaining access to protected memory without opening other hardware',
          'Inducing faults, causing the interruption of normal behaviour',
          'Hardware modification tampering with invasive operations',
          'Backdoor creation; the presence of hidden methods for bypassing normal computer authentication systems',
          'Counterfeiting product assets that can produce extraordinary operations and those made to gain malicious access to systems.',
        ],
      },
      {
        type: 'note',
        items: [
          'The first bullet contradicts itself as printed: it appears under "Hardware Attacks" yet says backdoors "aren’t limited to software and hardware". The sense intended is that backdoors are not limited to software — they reach into hardware too, such as RFID chips and memory. The wording above is left exactly as the manual prints it.',
        ],
      },
      {
        type: 'text',
        heading: 'Cyber Threats-Cyber Warfare',
        text: 'Cyber warfare refers to the use of digital attacks -- like computer viruses and hacking -- by one country to disrupt the vital computer systems of another, with the aim of creating damage, death and destruction. Future wars will see hackers using computer code to attack an enemy\'s infrastructure, fighting alongside troops using conventional weapons like guns and missiles.',
      },
      {
        type: 'text',
        text: 'Cyber warfare involves the actions by a nation-state or international organization to attack and attempt to damage another nation\'s computers or information networks through, for example, computer viruses or denial-of-service attacks.',
      },
      {
        type: 'text',
        heading: 'Cyber Crime',
        text: 'Cybercrime is criminal activity that either targets or uses a computer, a computer network or a networked device. Cybercrime is committed by cybercriminals or hackers who want to make money. Cybercrime is carried out by individuals or organizations.',
      },
      {
        type: 'text',
        text: 'Some cybercriminals are organized, use advanced techniques and are highly technically skilled. Others are novice hackers.',
      },
      {
        type: 'text',
        heading: 'Cyber Terrorism',
        text: 'Cyber terrorism is the convergence of cyberspace and terrorism. It refers to unlawful attacks and threats of attacks against computers, networks and the information stored therein when done to intimidate or coerce a government or its people in furtherance of political or social objectives.',
      },
      {
        type: 'text',
        text: 'Examples are hacking into computer systems, introducing viruses to vulnerable networks, web site defacing, Denial-of-service attacks, or terroristic threats made via electronic communication.',
      },
      {
        type: 'text',
        heading: 'Cyber Espionage',
        text: 'Cyber spying, or cyber espionage, is the act or practice of obtaining secrets and information without the permission and knowledge of the holder of the information from …',
      },
      {
        type: 'note',
        items: [
          'The manual\'s sentence stops there. It ends on the dangling word "from" at the foot of printed page 14, and the next line is the heading NETWORK SECURITY-FIREWALL — nothing was lost in transcription, and no continuation appears anywhere later. The missing words are presumably "…from that holder", i.e. the individual, competitor, rival group, government or enemy who owns the information.',
        ],
      },
    ],
  },

  {
    number: '3',
    title: 'Firewalls',
    covers: [3],
    sections: [
      {
        type: 'definition',
        heading: '9. Network Security-Firewall: Definition of Firewall',
        text: 'A firewall is a system that enforces an access control policy between two networks such as your private LAN and the unsafe, public Internet. The firewall determines which inside services can be accessed from the out-side, and vice versa.',
      },
      {
        type: 'text',
        text: 'The actual means by which this is accomplished varies widely, but in principle, the firewall can be thought of as a pair of mechanisms: one to block traffic, and one to permit traffic. A firewall is more than the locked front door to your network. It your security guard as well. Firewalls are also important because they provide a single “choke point” where security and audits can be imposed. A firewall can provide a net-work administrator with data about what kinds and amount of traffic passed through it, how many attempts were made to break into it, and so on. Like a closed-circuit security TV system, your firewall not only prevents access but also monitors who’s been sniffing around, and assists in identifying those who attempt to breach your security.',
      },
      {
        type: 'note',
        items: [
          '"It your security guard as well" is printed exactly as it appears — the manual drops the word "is". Read it as "It is your security guard as well."',
        ],
      },
      {
        type: 'text',
        heading: 'Screening Levels of Firewalls',
        text: 'A firewall can screen both incoming and outgoing traffic. Because incoming traffic poses a greater threat to the network, it’s usually screened more closely than outgoing traffic.',
      },
      {
        type: 'text',
        text: 'When you are looking at firewall hardware or software products, you’ll probably hear about three types of screening that firewalls perform:',
      },
      {
        type: 'bullets',
        items: [
          'Screening that blocks any incoming data not specifically ordered by a user on the network',
          'Screening by the address of the sender',
          'Screening by the contents of the communication',
        ],
      },
      {
        type: 'text',
        text: 'Think of screening levels as a process of elimination. The firewall first determines whether the incoming transmission is something requested by a user on the network, rejecting anything else. Anything that is allowed in is then examined more closely. The firewall checks the sender’s computer address to ensure that it is a trusted site. It also checks the contents of the transmission.',
      },

      {
        type: 'definition',
        heading: '10. Firewall Technologies',
        text: 'Firewalls come in all shapes, sizes, and prices. Choosing the correct one depends mainly on your business requirements and the size of your net-work. This section discusses the different types of firewall technologies and formats available. Above all, no matter what type of firewall you choose or its functionality, you must ensure that it is secure and that a trusted third party, such as the International Computer Security Association (ICSA), has certified it.',
      },
      {
        type: 'text',
        text: 'The ICSA classifies firewalls into three categories: packet filter fire-walls, application-level proxy servers, and stateful packet inspection fire-walls.',
      },
      {
        type: 'text',
        heading: '1. Packet Filter Firewall',
        text: 'Every computer on a network has an address commonly referred to as an IP address. A packet filter firewall checks the address of incoming traffic and turns away anything that doesn’t match the list of trusted addresses. The packet filter firewall uses rules to deny access according to information located in each packet such as: the TCP/IP port number, source/destination IP address, or data type. Restrictions can be as tight or as loose as you want. An ordinary router on a network may be able to screen traffic by address, but hackers have a little trick called source IP spoofing that makes data appear to come from a trusted source, even from your own network. Unfortunately, packet filter firewalls are prone to IP spoofing and are also arduous and confusing to configure. And any mistake in configuration could potentially leave you wide open to attack.',
      },
      {
        type: 'text',
        heading: 'Application-Level Proxy Server',
        text: 'An application-level proxy server examines the application used for each individual IP packet to verify its authenticity. Traffic from each application such as HTTP for Web, FTP for file transfers, and SMTP/POP3 for e-mail typically requires the installation and configuration of a different application proxy. Proxy servers often require administrators to reconfigure their network settings and applications (i.e., Web browsers) to support the proxy, and this can be a labor-intensive process.',
      },
      {
        type: 'text',
        heading: '2. Stateful Packet Inspection Firewall',
        text: 'This is the latest generation in firewall technology. Stateful packet inspection is considered by Internet experts to be the most advanced and secure fire-wall technology because it examines all parts of the IP packet to determine whether to accept or reject the requested communication.',
      },
      {
        type: 'text',
        text: 'The firewall keeps track of all requests for information that originate from your network. Then it scans each incoming communication to see if it was requested, and rejects anything that wasn’t. Requested data proceeds to the next level of screening. The screening software determines the state of each packet of data, hence the term stateful packet inspection.',
      },
      {
        type: 'note',
        items: [
          'The manual’s numbering here is broken. It announces three ICSA categories, then numbers the first "1." and the third "2.", leaving Application-Level Proxy Server — the second category — with no number and its heading run into the body text. The same running sequence then continues into the next section as "3.", "4." and "5." for DMZ, content filtering and VPN, which are additional firewall *features*, not ICSA categories. The numbers below are reproduced as printed; do not read 3, 4 and 5 as a fourth, fifth and sixth kind of firewall.',
        ],
      },

      {
        type: 'text',
        heading: 'Additional Firewall Features and Functionality',
        text: 'In addition to the security capability of a firewall, a wide range of additional features and functionalities are being integrated into standard fire-wall products. These include support for public Web and e-mail servers, normally referred to as a demilitarized zone (DMZ), content filtering, virtual private networking (VPN) encryption support, and antivirus support.',
      },
      {
        type: 'text',
        heading: '3. Demilitarized Zone Firewalls',
        text: 'A firewall that provides DMZ protection is effective for companies that invite customers to contact their net-work from any external source, through the Internet or any other route for example, a company that hosts a Web site or sells its products or services over the Internet.',
      },
      {
        type: 'text',
        text: 'The deciding factors for a DMZ fire-wall would be the number of out-siders or external users who access information on the network and how often they access it. A DMZ firewall creates a protected (“demilitarized”) information area on the network. Outsiders can get to the protected area but can’t get to the rest of the network. This allows outside users to get to the information you want them to have and prevents them from getting to the information you don’t want them to have.',
      },
      {
        type: 'text',
        heading: '4. Content Filtering',
        text: 'A Web site filter or content filter extends the firewall’s capability to block access to certain Web sites. You can use this add-on to ensure that employees do not access particular content, such as pornography or racially intolerant material. With this functionality you can define cate-gories of unwelcome material and obtain a service that lists thousands of Web sites that include such mater-ial. You can then choose whether to totally block those sites, or to allow access but log it. Such a service should automatically update its list of banned Web sites on a regular basis.',
      },
      {
        type: 'text',
        heading: '5. Virtual Private Networks',
        text: 'A VPN is a private data network that makes use of the public network infrastructure, that is, the Internet. The idea of the VPN is to give the company the same capabilities as a private leased line but at much lower cost. A VPN provides secure sharing of public resources for data by using encryption techniques to ensure that only authorized users can view or “tunnel” into a company’s private network.',
      },
      {
        type: 'text',
        text: 'Companies today are looking at VPNs as a cost-effective means of securely connecting branch offices, remote workers, and privileged partners/cus-tomers to their private LANs. A grow-ing range of firewalls now have VPN encryption capability built in or offer it as an optional extra. This offers companies a simple, cost-effective alternative to traditional private leased lines or modem remote access.',
      },
      {
        type: 'text',
        text: 'When implementing a VPN, you need to ensure that all devices support the same level of encryption and that it is sufficiently secure. To date, 168-bit Data Encryption Standard (3DES) is the strongest level of encryption pub-licly available and is deemed unbreak-able by security experts. One thing to bear in mind is that the stronger the encryption level, the more processing power is required by the firewall. A small number of firewall vendors are now offering VPN hardware accelera-tion to improve VPN traffic performance.',
      },
      {
        type: 'note',
        items: [
          'Two things about the sentence above. First, "168-bit Data Encryption Standard (3DES)" mislabels the algorithm: 3DES is Triple DES, which runs DES three times over a 168-bit key. Plain DES is a 56-bit cipher. Write Triple DES in an exam answer.',
          'Second, "the strongest level of encryption publicly available and deemed unbreakable" was true of the era this passage was written in, not now. NIST deprecated 3DES in 2017 and disallowed it after 2023. AES (128, 192 or 256-bit) is today\'s standard for this role — which Practical 3 in this manual demonstrates when it compares Caesar, DES and AES.',
        ],
      },
      {
        type: 'text',
        heading: 'Antivirus Protection',
        text: 'Everyone should be concerned about the threat of viruses, which are among the most pernicious forms of computer hacking. Users can quickly damage entire networks by unknowingly downloading and launching dangerous computer viruses. Companies have lost enormous amounts of money due to resulting lost productivity and network repair costs. Firewalls are not designed to remove or clean viruses, but they can assist with virus detection, which is an important part of an overall virus protection plan. It is important to note that a firewall can only protect the network from the wide area device to which it is attached. A remote access server or a PC with a modem could provide a back door into your network that circumvents the firewall. The same is true if an employee inserts a virus-infected floppy disk into a PC. The ultimate place for antivirus software is on every user’s PC; however, a fire-wall can assist in virus detection by requiring that every user’s PC have the latest antivirus software running and enabled before the firewall permits that user to access the Internet or download e-mail.',
      },
      {
        type: 'text',
        heading: 'Choosing a Firewall',
        text: 'Firewall functions can be implemented as software or as an addition to your router/gateway. Alternatively, dedicated firewall appliances are increasing in popularity, mainly due to their ease of use, performance improvements, and lower cost.',
      },
      {
        type: 'text',
        heading: 'Router/Firmware-Based Firewalls',
        text: 'Certain routers provide limited firewall capabilities. These can be augmented further with additional software/firmware options. However, great care must be taken not to overburden your router by running additional services like a firewall. Enhanced firewall-related functionality such as VPN, DMZ, content filtering, or antivirus protection may not be available or may be expensive to implement.',
      },
      {
        type: 'text',
        heading: 'Software-Based Firewalls',
        text: 'Software-based firewalls are typically sophisticated, complex applications that run on a dedicated UNIX or Windows NT server. These products become expensive when your account for the costs associated with the software, server operating system, server hardware, and continual maintenance required to support their implementation. It is essential that system administrators constantly monitor and install the latest operating system and security patches as soon as they become available. Without these patches to cover newly discovered security holes, the software firewall can be rendered useless.',
      },
      {
        type: 'text',
        heading: 'Dedicated Firewall Appliances',
        text: 'Most firewall appliances are dedicated, hardware-based systems. Because these appliances run on an embedded operating system specifically tailored for firewall use, they are less susceptible to many of the security weaknesses inherent in Windows NT and UNIX operating systems. These high-performance firewalls are designed to satisfy the extremely high throughput requirements or the processor-intensive requirements of stateful packet inspection firewalls. Because there is no need to harden the operating system, firewall appliances are usually easier to install and configure than software firewall products, and can potentially offer plug and play installation, minimal maintenance, and a very complete solution. They also prove to be extremely cost effective when compared to other firewall implementations.',
      },
      {
        type: 'note',
        items: [
          'Windows NT dates this passage to the late 1990s / early 2000s, and the manual reproduces it unchanged. The security argument still holds — a purpose-built embedded OS exposes less attack surface than a general-purpose server OS — but read "Windows NT and UNIX" as "a general-purpose server operating system".',
        ],
      },
      {
        type: 'text',
        heading: 'Designing a Firewall',
        text: 'Once you have familiarized yourself with all of the different firewalls on the market, the next step is to define your firewall policy. For example, will the firewall explicitly deny all services except those critical to the mission of connecting to the Internet? Or is it intended to provide a metered and audited method of “queuing” access in a nonthreatening manner? Decisions like these are less about engineering than politics. The next decision is what level of monitoring, redundancy, and control you want. This involves juggling needs analysis with risk assessment, and then sorting through the often-conflicting requirements in order to determine what to implement. Where firewalls are concerned, the emphasis should be on security rather than connectivity. You should consider blocking everything by default, and only allowing the services you need on a case-by-case basis. If you block all but a specific set of services, you make your job much easier.',
      },
    ],
  },

  {
    number: '4',
    title: 'Network Foundations: OSI, TCP/IP and Connection Setup',
    partial: [4, 8],
    sections: [
      {
        type: 'definition',
        heading: '11. Network Security Controls',
        text: 'Network security comprises of the measures adopted to protect the resources and integrity of a computer network. This section reviews the basics of computer networks and Internet in order to lay a strong foundation for the reader to understand the rest of this paper on network security.',
      },
      {
        type: 'note',
        items: [
          'Printed as "NETWORK SECUITY CONTROLS" — the manual drops the R from SECURITY.',
          'The manual calls itself "this paper" here, and cites sources as [8], [9] and [26] further on. Everything from this heading to the end of the theory is lifted from a published paper, which is also why its figures are numbered from 1 again even though the manual already had a Figure 1 on page 6.',
        ],
      },

      {
        type: 'definition',
        heading: '12. ISO-OSI Reference Model',
        text: 'The communication problem in computer networks can be defined as the task of transferring data entered by an application user in one system to an application user in another system through one or more intermediate networks.',
      },
      {
        type: 'text',
        text: 'The communication problem is solved using a layered approach through a collection of protocols forming the so-called protocol suite. Each layer, dealing with a particular aspect of the communication problem, is implemented with a particular protocol and the protocols co-operate with each other to solve the entire communication problem.',
      },
      {
        type: 'text',
        text: 'The Open Systems Interconnection (OSI) model is an abstract representation of the basic layers involved to solve the communication problem: Application, Presentation, Session, Transport, Network, Data-link and Physical layers.',
      },
      {
        type: 'text',
        text: 'The application layer specifies how one particular application uses a network and contacts the application program running on a remote machine. The presentation layer deals with the translation and/or representation of data at the two end hosts of the communication.',
      },
      {
        type: 'text',
        text: 'The session layer is responsible for establishing a communication session with a remote system and it also handles security issues like password authentication before the application user can connect to the remote system.',
      },
      {
        type: 'text',
        text: 'The transport layer provides end-to-end, reliable or best-effort, in-order data packet delivery along with support for flow control and congestion control.',
      },
      {
        type: 'text',
        text: 'The network layer deals with forwarding data packets from the source to the destination nodes of the communication.',
      },
      {
        type: 'text',
        text: 'The data-link layer deals with the organization of data into frames and provides reliable data delivery over the physical medium.',
      },
      {
        type: 'text',
        text: 'The physical layer provides encoding/decoding schemes and the modulation/demodulation schemes for the actual transmission of data, over the physical medium, as a sequence of bits of 1s and 0s.',
      },
      {
        type: 'image',
        src: `${IMG}/osi-model.webp`,
        width: 214, height: 232,
        maxWidth: 430,
        caption: 'Figure 1: OSI Model',
        alt: 'The seven OSI layers, numbered Layer 7 Application down to Layer 1 Physical',
      },
      {
        type: 'image',
        src: `${IMG}/tcpip-stack.webp`,
        width: 676, height: 164,
        maxWidth: 820,
        caption: 'Figure 2: TCP/IP Protocol Stack and the Structure of a Data Packet',
        alt: 'Segment, datagram and frame shown as successive encapsulations of Data, beside the four TCP/IP layers Application, Transport, Internet and Link',
      },
      {
        type: 'text',
        heading: 'TCP/IP Protocol Stack',
        text: 'The seven-layer OSI model is conceptual: It shows the different activities required for communication between application programs running in two different hosts. Its full implementation will result in excessive overhead and will lead to huge delays in data delivery at the destination. The TCP/IP (Transmission Control Protocol/ Internet Protocol) protocol stack shown in Figure 2, is the commonly used model for wide area communications, like the Internet. The TCP/IP protocol stack is composed of the Application, Transport, Internet and the Link layers (from top to bottom).',
      },
      {
        type: 'text',
        text: 'The application layer of the TCP/IP model is in-charge of the responsibilities of the application, presentation and session layers of the OSI model. The transport layer of the TCP/IP model is similar to the transport layer of the OSI model.',
      },
      {
        type: 'text',
        text: 'The Internet layer takes care of addressing and routing the data packets across different heterogeneous networks. Each machine and router in the Internet has a unique IP address.',
      },
      {
        type: 'text',
        text: 'The link layer of the TCP/IP model combines the functionalities of the data-link layer and physical layer of the OSI model. The link layer supports the organization of data into frames and their encoding/decoding mechanisms. The structure and transmission of the frames depend on the topology and hardware technology (like Ethernet, Token Ring and etc) used for the network. A data packet is referred to as segment, datagram and frame at the transport, internet and the link layers respectively.',
      },

      {
        type: 'definition',
        heading: '13. TCP Connection Establishment and ICMP',
        text: 'The two commonly used transport layer protocols in the TCP/IP protocol stack are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP) . TCP is a connection-oriented, byte-stream based protocol and provides reliable, in-order data delivery. UDP is a connectionless, message-based protocol and provides only best-effort service for end-to-end data delivery.',
      },
      {
        type: 'text',
        text: 'Processes running TCP have to establish a connection before exchanging any data packet. During this connection establishment mechanism, the two processes exchange information about the capabilities and resources available at their respective hosts for the particular communication session that is about to begin. This will help the TCP process running in one host to adjust its data sending rate according to the resources (like the memory buffer space) available for the TCP process at the receiving host.',
      },
      {
        type: 'text',
        text: 'In order to avoid replay errors, the two processes pick an arbitrary starting sequence number for the data packets sent by them. Each byte of data is given a unique, monotonically increasing sequence number. The sequence number of a data packet sent using TCP represents the sequence number of the first byte of the data transmitted in that packet. The TCP connection-establishment process (shown in Figure 3) is a three-way handshake mechanism and is explained as follows through this example:',
      },
      {
        type: 'text',
        text: 'Let a process running in host A initiate a session with a process at host B by sending a Synchronization (SYN) packet to host B with the initial sequence number set to X. The process at host A will include information about the memory resources available (through the ‘Advertised Window’ field of the TCP header) in the SYN packet. If the process at host B is willing to establish a communication session with the process at host A, then it sends back a SYN/ACK packet that will indicate the memory resources available at host B for this communication, the starting sequence number of the data packets coming from the process at host B and an acknowledgment for receiving the SYN packet from the process at host A. The process at host A will respond back with an ACK packet if it accepts to the advertised window value of host B and is willing to tune down its data sending rate accordingly. Note that the acknowledgment sent to a process/host for receiving a packet with a particular sequence number (say X) indicates the sequence number (X+1) of the next packet expected from the process/host. Typically, host A could be a client and host B could be a server.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-handshake.webp`,
        width: 345, height: 336,
        maxWidth: 690,
        caption: 'Figure 3: TCP Connection Establishment Mechanism',
        alt: 'Three sloped arrows between Host A and Host B: SYN Seq Num = X; SYN Seq Num = Y with ACK Seq Num = X+1; ACK Seq Num = Y+1',
      },
      {
        type: 'text',
        heading: 'Internet Control Message Protocol (ICMP)',
        text: 'IP provides best-effort service in delivering datagrams from one host to another host through one or more intermediate networks. The TCP/IP protocol suite provides an error-reporting protocol called the Internet Control Message Protocol (ICMP) that operates in tandem with IP. IP uses ICMP to report errors and certain critical information to the end hosts. Each ICMP message is identified by an 8-bit type field in the IP header. One of the commonly used ICMP message is ECHO Request/Reply. An ECHO request message is sent to the ICMP process running on a host computer to check whether the host is alive. If the host is alive, the host sends a response using the ECHO Reply message.',
      },
      {
        type: 'note',
        items: [
          '"Each ICMP message is identified by an 8-bit type field in the IP header" is printed exactly as it appears, and it is wrong. The 8-bit Type field belongs to the ICMP header — the first octet of the ICMP message, which travels inside the IP payload. The IP header has its own 8-bit field, Protocol, and a value of 1 there is what says "the payload is ICMP". The two 8-bit fields are easy to conflate; know which is which.',
          'ECHO Request/Reply is exactly what the ping utility sends, so the syllabus item on basic network utilities (ipconfig, ping, tracert, netstat) rests on this paragraph. tracert builds on ICMP too: it sends packets with deliberately small TTL values so each router along the path returns an ICMP "time exceeded" message, revealing the route hop by hop.',
        ],
      },
    ],
  },

  {
    number: '5',
    title: 'Classical Network Attacks',
    covers: [2],
    partial: [8],
    sections: [
      {
        type: 'definition',
        heading: '14. Classical Network Attacks',
        text: 'In this section, we describe some of the classical attacks that have exploited the typical vulnerabilities of computer networks and the solutions deployed to combat or reduce the chances of some of these attacks.',
      },

      {
        type: 'definition',
        heading: '15. Threats in Transit',
        text: 'The network interface card (NIC) of each host in a network is uniquely identified with a hardware address. The NIC will be programmed to pick up only the packets addressed to: (i) The unicast hardware address corresponding to the host, (ii) The multicast hardware address corresponding to the multicast group in which the host is a member of and (iii) The broadcast hardware address. A capable intruder can reprogram the NIC with the hardware address of another host and accept packets addressed to that host. To avoid being caught, the intruder can put a copy of the packet back to the network.',
      },
      {
        type: 'text',
        text: 'Wiretapping is the process of extracting information as it flows through a wire. The process of wiretapping differs depending on the communication medium used. In cables, wiretapping can be done through the use of a packet sniffer or through inductance.',
      },
      {
        type: 'text',
        text: 'A packet sniffer is a computer software or hardware that can intercept the traffic passing through a local area network (LAN) cable. A packet sniffer can be used for both beneficial and malicious purposes: (i) To analyze network problems and monitor network usage, (ii) To filter suspect content from network traffic, (iii) To study the structure of the packet headers of the different protocols used over the network, (iv) To detect network intrusion attempts and (v) To gather information for effecting a network intrusion. As an ordinary wire emits radiation during the propagation of electrical signals through it, an intruder can tap the wire and read radiated signals through inductance without making physical contact with the cable. An intruder intercepting the signals on a broadband cable has to separate the targeted signal from all the multiplexed signals.',
      },
      {
        type: 'text',
        text: 'Wireless signals are broadcast through the open space and are more susceptible for tapping. For example, the signal path of microwave signals has to be fairly wide to make sure the antenna of the receiver will be hit by the transmitted signal. But, the wider the signal path, the more it is easy for an intruder to interfere with the line of sight of transmission between the sender and the receiver and also to pick up the entire transmission from an antenna located closely to the receiver. Similarly, with satellite communication, there is a tradeoff between coverage and secure communication.',
      },
      {
        type: 'text',
        text: 'A footprint is defined as the pattern produced on the surface of the earth from the satellite’s transmitter. A broader footprint is needed to maximize coverage because the signals can be picked up over a huge region. On the other hand, a smaller footprint is desirable to reduce the risk of interception. The angle of dispersion of a satellite transponder is a parameter that could be controlled to adjust the spread of a footprint.',
      },
      {
        type: 'text',
        text: 'An optical fiber, made of thin glass strands, can carry light pulses over long distances without being much affected by electrical interference. Optical fibers are more secure than any other transmission media because of the following two reasons: (i) Optical fibers are fine tuned to achieve total internal reflection. So, the entire network should be returned to facilitate tapping and interception and (ii) Optical fibers carry light energy and not electrical signals. So, inductance-based tapping would not be possible.',
      },
      {
        type: 'note',
        items: [
          'The word "returned" in the optical-fibre reason (i) is printed exactly as it appears. It is a typo for "re-tuned": the point is that a fibre is tuned to hold light inside by total internal reflection, so an attacker cannot simply clamp a tap onto it — the whole network would have to be re-tuned before any light leaked out to be intercepted.',
        ],
      },

      {
        type: 'definition',
        heading: '16. TCP Session Hijacking',
        text: 'TCP Session Hijacking refers to the act of taking over an already established TCP session and injecting packets into the stream that are processed by the receiver as if the packets are coming from the authentic owner of the session. A TCP session is identified by the quadruple: client IP address, client port number, server IP address and server port number. Any packet that reaches either machine with the above identifiers is considered to be part of the existing session. If attackers can spoof these items, they can pass TCP packets to the client or server and have those packets processed as coming from the other machine.',
      },
      {
        type: 'text',
        text: 'To successfully hijack an existing TCP session, an attacker has to first desynchronize the session and then inject the intended commands. To desynchronize an existing TCP session (refer Figure 4) between a client and server, the attacker has to first predict the sequence number that is about to be used by a client (or server) and use that sequence number before the client (or server) gets a chance to use. If the attacker has access to the network, a packet sniffer can be used to look into the packets belonging to the TCP session and one can accurately predict the expected sequence number from the ACK packets exchanged. If the attacker cannot sniff the TCP session between the client and server, then the attacker has to try all possible options and guess the expected sequence number.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-desync.webp`,
        width: 671, height: 505,
        maxWidth: 820,
        caption: 'Figure 4: Desynchronizing a TCP Session',
        alt: 'Client-server message trace: a normal handshake and data exchange, then an injected DATA = 1000 bytes packet from the attacker that shifts the client sequence numbers',
      },
      {
        type: 'text',
        text: 'When the attacker successfully hijacks the TCP session and injects own spoofed data packets (as if the data packets are coming from the original client), the server will acknowledge the receipt of the data packet to the original client by sending it an ACK packet. As this ACK packet will most likely bear a sequence number that is not expected by it, the original client will attempt to resynchronize with the server by sending it an ACK packet with the sequence number that it is expecting. This ACK packet will in turn contain a sequence number that the server is not expecting and so the server will resend its last ACK packet. This cycle will continue and the rapid passing back and forth of the ACK packets creates the TCP ACK storm (refer Figure 5). As the attacker injects more and more data packets, the size of the ACK storm increases and can quickly bring down performance of the network. After a certain number of unsuccessful resynchronization attempts, the original client eventually gets exhausted and closes the connection with the server.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-ack-storm.webp`,
        width: 668, height: 433,
        maxWidth: 820,
        caption: 'Figure 5: Creating a TCP ACK Storm',
        alt: 'Client and server exchanging ACK Client 5279 / Server 8001 and ACK Server 8001 / Client 3279 back and forth without progressing, after an injected DATA = 1000 bytes packet',
      },
      {
        type: 'text',
        heading: 'Man in the Middle Attack',
        text: 'With a Man-In-The-Middle (MITM) attack [8], an attacker can read, modify and insert messages between two communicating parties, without either party knowing that the link between them has been compromised. To successfully carry out this attack, one must be able to observe and intercept messages between the two victims. We now describe an example for an MITM attack on public-key cryptography.',
      },
      {
        type: 'text',
        text: 'Let A and B be the two communicating parties and let M be the attacker who wants to deliver a false message to B. To get started, B sends its public key to A. If M can intercept the communication channel between A and B, then M gets access to the public key of B. Then, M sends A, a spoofed message that claims to have come from B. In this message, M sends its own public key, but A thinks it has received the public key of B. When A sends a data packet to B, it encrypts the packet with (what A considers as) the public key of B and inserts the encrypted message in the channel. M intercepts the message and decrypts it with its own private key to extract the actual message sent by A to B. M then encrypts the message with the public key of B. Note that M could even modify the message before encrypting it again. M inserts the new encrypted message back in the channel so that the message can go to B. B decrypts the message using its own private key and reads the message assuming it came from A.',
      },

      {
        type: 'definition',
        heading: '17. Echo-Chargen Attack',
        text: 'Chargen (Character Generator) [9] is a protocol of the TCP/IP protocol stack and is used for testing and performance measurement purposes. Chargen runs on TCP port 19 and also on UDP port 19. When a client opens a TCP connection with a server on TCP port 19, the server starts sending arbitrary characters back to the client, until the TCP connection is closed. Whenever a host sends a UDP message to a server on UDP port 19, the server responds back with an arbitrary message and the number of characters in the message will be in the range [0...512].',
      },
      {
        type: 'image',
        src: `${IMG}/echo-chargen.webp`,
        width: 736, height: 107,
        maxWidth: 820,
        caption: 'Figure 6: A Typical Echo-Chargen Attack',
        alt: 'Attacker sends a trigger spoofed packet to UDP port 19 on host A; random chars go from A to UDP port 7 on host B, and characters are echoed back to UDP port 19',
      },
      {
        type: 'text',
        text: 'An attacker can trigger the Echo-Chargen attack by spoofing a conversation between the Echo Request/Reply service and the Chargen service and then redirecting the output of each service to the other, creating a rapidly expanding spiral of traffic in the network. In Figure 6, we see an attacker triggering the attack by sending a spoofed message to one of the targeted hosts (host A) running the Chargen service at UDP port 19. The message is spoofed in such a way that it appears to have originated from the other targeted host (host B) and UDP port 7, which is the port number used for Echo-Request/Reply messaging. Host A now sends a UDP message from port 19 to port 7 of host B. Host B will consider this as an Echo Request message and sends back a Reply message to UDP port 19 of host A. Host A will treat the Reply message as a message received for the Chargen service and sends back a new arbitrary UDP message to port 7 of host B. This cycle of message exchange between the two services will continue and generate excessive traffic in the network. Eventually, the attack consumes memory and processor power at the two targeted hosts A and B and causes them to become non-responsive to user commands.',
      },
      {
        type: 'text',
        heading: 'Smurf Attack',
        text: 'A perpetrator can launch the Smurf attack [8] by sending a spoofed Echo-Request message to a network’s broadcast IP address. The spoofed Echo-Request message has the victim’s IP address as the source IP address. Hence, each host receiving the broadcast Echo-Request message will send an Echo-Reply message to the victim. The victim will be overwhelmed with a flood of Echo-Reply messages. Thus, the Smurf attack is a kind of Denial-of-Service (DoS) attack. Two solutions have been currently adopted in the Internet to prevent a Smurf attack: (i) Routers do not forward datagrams having the destination address as a broadcast IP address and (ii) Hosts are configured not to reply for Echo-Request messages that were received as a broadcast message.',
      },
      {
        type: 'text',
        heading: 'Traffic Redirection',
        text: 'A compromised router can send out route update messages to all its neighboring routers informing them that it lies on the shortest path to every network in the Internet. The neighboring routers forward all of their incoming data packets to this compromised router, which will get eventually flooded with the data packets and starts dropping them. The data packets do not make it to the destination.',
      },
      {
        type: 'text',
        heading: 'Attacks on Domain Name Service (DNS)',
        text: 'A DNS server is a machine that holds a table (called the DNS cache) mapping the domain names to IP addresses. The server queries other DNS servers higher up in the domain name hierarchy to resolve domain names for which it does not have an IP address entry in its DNS cache and updates its cache with the mapping learnt. DNS cache poisoning is an attack using which the DNS server is made to believe a domain name-IP address mapping as authentic, while, in reality, it is not. Once the DNS cache is poisoned, the entry stays for a while in the cache and affects the clients who use the DNS server in the meantime. For example, an attacker can replace the IP address information for a target file server with the IP address of a compromised file server which the attacker controls. The attacker creates fake entries in the compromised server with file names matching those on the target server. These files could contain malicious contents such as a worm or virus. Users who want to download files from the target file server may end up unknowingly downloading files with malicious content from the compromised file server.',
      },
      {
        type: 'text',
        heading: 'Distributed Denial of Service (DDoS) Attacks',
        text: 'DDoS attacks involve breaking into hundreds or thousands of machines all over the Internet. The attacker installs malicious software on all these compromised machines (called zombies) and controls them to launch coordinated attacks on victim sites. DDoS attacks are normally aimed at exhausting the network bandwidth, overwhelming a router’s processing capacity and breaking network connectivity to the victims.',
      },
      {
        type: 'text',
        text: 'The attacker uses any convenient method (like exploiting the buffer overflow attack or tricking the victim to open and install an unknown code from an email attachment) to plant a Trojan Horse on a target machine and transform it into a zombie by also installing a rootkit software. The rootkit helps to conceal the presence of the Trojan Horse and hide its malicious activities. After forming sufficient number of zombies, the attacker sends a signal to all the zombies to launch the DDoS attack on a chosen victim machine. Each zombie may launch the same or a different type of attack on the victim.',
      },

      {
        type: 'definition',
        heading: '18. Syn Flood Attack',
        text: 'During the TCP connection establishment process, the server maintains a SYN_RECV queue to keep track of the connection requests for which it has allocated the resources and responded back with a SYN/ACK message, but the corresponding ACK from the client has not yet been received. The server eventually times out waiting for the ACK packet and removes the incomplete connection request from its queue. An attacker can launch a DDOS attack by sending several SYN connection request messages using spoofed non-existing IP addresses and never respond back with the ACK messages. The SYN_RECV queue of the server gets filled up with incomplete connection request messages. Even though these incomplete connection requests are discarded after the timeout, if a genuine client attempts to establish a TCP connection with the server in the meantime, the server discards the SYN request from that client.',
      },
      {
        type: 'note',
        items: [
          'The paragraph calls this "a DDOS attack". As described it is a plain DoS: one attacker sending SYN packets from spoofed source addresses. A SYN flood becomes a *distributed* denial of service only when it is launched from many compromised machines at once, as in the DDoS section above. The manual\'s own outline names this section "SYN Flood Attack", and the printed heading spells it "Syn Flood Attack".',
        ],
      },
    ],
  },

  {
    number: '6',
    title: 'Encryption Controls and Virtual Private Networks',
    covers: [7],
    partial: [4],
    sections: [
      {
        type: 'definition',
        heading: '19. Network Security Controls',
        text: 'This section describes several network security controls that have been adopted in modern day computer networks to combat the threats and prevent or reduce the chances of an attack.',
      },
      {
        type: 'note',
        items: [
          'The manual prints this heading twice: once on page 18 (as "NETWORK SECUITY CONTROLS", outline row 11) and again here on page 25. The two are different sections — row 11 introduces the network chapter, row 19 introduces the encryption controls. The manual\'s own outline calls this one "Encryption Techniques: Link and End-to-End Encryption".',
        ],
      },
      {
        type: 'text',
        heading: 'Link Encryption Vs End-to-End Encryption',
        text: 'Encryption applied between every pair of hosts connected by a link is called link-to-link encryption. Link encryption is preferred when all the hosts in the network are secure, but the communication medium is shared among several users and is not secure. Almost all the components of a data frame (except the source and destination hardware addresses in the frame header) are encrypted before the frame is inserted onto the physical communications link. As the frame reaches the next hop receiver (could be a router or the end host), the frame is decrypted at the bottom protocol layer and sent to the higher layers for further processing and forwarding. Since encryption is at the bottom protocol layer, the message is exposed in plaintext at all the other layers of the sender and receiver and at the link and Internet layers of the intermediate hosts for hardware addressing and routing. Thus, link encryption protects the message in transit between two computers, but the message is in plaintext inside the end hosts and the intermediate hosts. One or more of the intermediate hosts may not be credible.',
      },
      {
        type: 'table',
        heading: 'Table 1: Comparison of Link Encryption and End-to-End Encryption',
        headers: ['Link Encryption', 'End-to-End Encryption'],
        rows: [
          ['End hosts of every link should share a key and should be able to do encryption and decryption', 'The intermediate hosts of a transmission path do not need to have cryptographic facilities.'],
          ['If there are N hosts and n users in a network (N << n), the number of keys needed would be N (N -1)/2', 'The number of keys needed for symmetric encryption and public-key encryption would be n (n -1)/2 and 2n respectively.'],
          ['All message transmissions have to be encrypted and decrypted at every link.', 'Encryption is application and message specific and need not be done for all messages.'],
          ['One encryption algorithm may be used for all users in all links', 'Each application user can deploy an encryption algorithm of choice.'],
          ['Data is exposed at the end hosts and the intermediate hosts', 'Except the application layer, data is encrypted at both the end hosts and the intermediate hosts'],
        ],
      },
      {
        type: 'note',
        items: [
          'The last row is printed as it appears and it contradicts itself: it says end-to-end encryption leaves data encrypted "at both the end hosts and the intermediate hosts", when the point of end-to-end encryption is that the data is in plaintext at the end hosts — that is where the application encrypts and decrypts it. Read the row as: everything below the application layer is encrypted, all the way through, including at the intermediate hosts.',
        ],
      },
      {
        type: 'text',
        text: 'Encryption applied between two application programs running at the end hosts of a communication is called end-to-end encryption. Here, only the data portion of the packet is encrypted at the highest level (i.e. the application layer) and the packet is transmitted with the data in encrypted form throughout the Internet. Thus, end-to-end encryption protects the data against disclosure while in transit, but the data packet could go through potentially insecure intermediate hosts. Table 1 compares the pros and cons of link encryption and end-to-end encryption.',
      },

      {
        type: 'definition',
        heading: '20. Virtual Private Networks',
        text: 'There are two types of IP addresses: public and private. A public IP address is globally unique and only one machine connected to the public Internet can have a public IP address. Private IP addresses are one of the solutions to reduce the exhaustion of IP address space. A private IP address has to be unique only within the set of networks of a particular organization. Larger organizations have sites at different locations in the world. The hosts in the different sites of the organization may be identified with a unique private IP address. But the same set of private IP addresses can be used in the networks of different organizations. Hence, a packet with a private IP address as the destination IP address cannot be used to route packets from one site to another site of an organization through the public Internet.',
      },
      {
        type: 'image',
        src: `${IMG}/vpn.webp`,
        width: 744, height: 171,
        maxWidth: 820,
        caption: 'Figure 7: Virtual Private Network',
        alt: 'Host X in Site 1 private network reaches gateway router R1, crosses the public Internet to router R2, and on to host Y in Site 2 private network',
      },
      {
        type: 'text',
        text: 'The virtual private network (VPN) technology uses IP-in-IP tunneling to encrypt and encapsulate the IP datagram that has the private IP addresses of the two end hosts with another IP header that has the source and destination IP addresses as the public IP address of the gateway routers for these two private networks. Each organization is required to have one or more gateway routers with a public IP address in order to facilitate communication over the public Internet. As the original IP datagram is encrypted, no intermediate forwarding host in the public Internet can look at the contents of the message. Figure 7 illustrates the notion of a VPN and Figure 8 displays the structure of an IP datagram as it goes through the different phases of IP-in-IP tunneling.',
      },
      {
        type: 'image',
        src: `${IMG}/ip-in-ip-tunneling.webp`,
        width: 603, height: 310,
        maxWidth: 820,
        caption: 'Figure 8: Structure of an IP Datagram during Different Phases of IP-in-IP Tunneling',
        alt: 'Three stages of a datagram: Source IP X / Dest. IP Y with an original unencrypted payload; after encryption at R1, Source IP R1 / Dest. IP R2 wrapping the encapsulated encrypted version of the original datagram for transmission through the public Internet; after decryption at R2, Source IP X / Dest. IP Y with the original unencrypted payload again',
      },
    ],
  },

  {
    number: '7',
    title: 'Secure Protocols: SSH and TLS',
    covers: [7],
    sections: [
      {
        type: 'definition',
        heading: '21. Secure Shell (SSH)',
        text: 'Secure Shell (SSH) is a network protocol that allows a user to securely interact with remote machines by establishing a secure channel for data exchange. SSH replaced TELNET and other insecure remote shell programs that were used in the past to send information in plaintext, including passwords, to remote systems. SSH encrypts the information sent over the insecure Internet and thus provides both confidentiality and integrity of data. SSH operates over a sequence of three phases as illustrated by the timeline diagram shown in Figure 9. The three phases are described below:',
      },
      {
        type: 'text',
        heading: 'Step 1: Host Identification',
        text: 'The client machine needs to ensure that it is communicating with the remote machine it has been asked to by the application program, and not with another machine that is spoofing it. The server machine on the remote side also has the option to ensure that the user is connecting from the machine as it appears to be, and not from another machine that is spoofing it. This step is accomplished as outlined below:',
      },
      {
        type: 'bullets',
        items: [
          'The client contacts the server and requests for its public-key certificate.',
          'The client maintains a list of public keys for server machines available to it. If it is asked to contact a machine for which it does not have a public key locally held, it will warn the user with a message telling that the public key reported by the server is not in the list of known hosts and ask the user whether the user wants to continue connecting.',
          'If the user agrees to continue connecting, the client verifies the authenticity of the Certifying Authority (CA) that issued the public key certificate for the server and if satisfied, accepts the public keys. The machine then adds the server’s public keys to its personal list of host public keys.',
          'When the administrator has included the public key for the client machine in the per-machine list of known host public keys on the server machine, the server may want the client machine to prove that it is what it claims to be.',
          'The server will create a “challenge” encrypted with the client’s host public key and send it to the client. Only a genuine client machine will be able to decrypt this message with its private key. The client then sends the same challenge encrypted with the public key of the server. If the server when decrypting the message gets the same challenge it sent, the client is genuine.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ssh-connection.webp`,
        width: 745, height: 404,
        maxWidth: 820,
        caption: 'Figure 9: Steps to Establish a Secure Shell (SSH) Connection',
        alt: 'Client-server timeline: request to establish a connection; public key certificate; the client authenticates the server’s CA; then E-Pub-s(List of encryption algorithms), E-Pri-s(Name of the selected encryption algorithm), E-Pub-s(Session Key S-K), E-Pub-s(Username and password) and E-Pri-s(Result of user authentication)',
      },
      {
        type: 'text',
        heading: 'Step 2: Encryption',
        text: 'The objective of this step is to establish a secure end-to-end link that supports encryption of the data transferred. Even the password and other authentication information are encrypted and are not transmitted in plaintext. This step is accomplished as outlined below:',
      },
      {
        type: 'bullets',
        items: [
          'Once the host identification step is successfully done, the client sends a list of encryption algorithms it could use and their corresponding keys. This is sent encrypted with the public key of the server.',
          'The server decrypts the list with its private key and chooses the strongest encryption algorithm that it could handle from the list sent by the client.',
          'The server then notifies the selected encryption algorithm to the client by encrypting the notification using its private key.',
          'The client generates the appropriate secret session key for the encryption algorithm selected and notifies the session key to the server by encrypting the notification with the public key of the server.',
          'The server decrypts the notification with its private key and extracts the secret session key.',
        ],
      },
      {
        type: 'text',
        heading: 'Step 3: User Authentication',
        text: 'In this step, the user proves to the server that he/she has the right to perform operations as a particular user on the server machine. This is accomplished as outlined below:',
      },
      {
        type: 'bullets',
        items: [
          'The client asks for the username and password from the user, encrypts them with the server’s public key and sends to the server.',
          'The server checks the validity of the username and password and if everything is fine, accepts the connection request by sending the confirmation encrypted with its private key.',
          'The client decrypts the confirmation with the server’s public key and the client and server are all set to exchange data securely using the encryption algorithm selected and the secret session key agreed.',
        ],
      },

      {
        type: 'definition',
        heading: '22. Transport Layer Security (TLS)',
        text: 'Transport Layer Security (TLS) is the successor of the Secure Sockets Layer (SSL) cryptographic protocol and it provides secure communication of the datagrams of the transport layer protocols as part of an end-to-end connection across the network. TLS has been used for a wide-variety of applications like web browsing, electronic mail, voice-over-IP, instant messaging and etc.',
      },
      {
        type: 'image',
        src: `${IMG}/tls-handshake.webp`,
        width: 778, height: 411,
        maxWidth: 820,
        caption: 'Figure 10: TLS Connection Establishment Mechanism',
        alt: 'Client-server timeline: ClientHello (TLS-version, RN-c, List of Cipher suites) as C-M1; ServerHello (TLS-version, RN-s, Chosen Cipher suite) as S-M1; Public-key certificate as S-M2; the client authenticates the server’s CA; E-Pub-s(Session Key S-K, RN-c, RN-s) as C-M2; E-S-K(Hash(S-M1, S-M2)); the server checks; E-S-K(Hash(C-M1, C-M2)); the client checks and takes the final decision',
      },
      {
        type: 'text',
        text: 'We now explain the sequence of steps to be followed to establish a TLS connection between a client and a server and it is pictorially illustrated in Figure 10:',
      },
      {
        type: 'bullets',
        items: [
          'The client initiates the connection request by sending a ClientHello message to the server. This message has the following information: (i) The latest TLS-version supported by the client; (ii) A random number arbitrarily chosen by the client and (iii) A list of suggested cipher suites (i.e., the encryption algorithms to be used, the key exchange and authentication algorithms, as well as the hashing algorithms to generate message authentication codes).',
          'The server responds back with a ServerHello message that includes the following information: (i) The TLS version chosen by the server based on the version information submitted by the client; (ii) A random number arbitrarily chosen by the server and (iii) The cipher-suite chosen from the list of choices offered by the client.',
          'The server also sends its public-key certificate to the client. The client may contact the CA that issued the certificate and confirm that the certificate is authentic before proceeding. The server also has the option of asking for the client’s public-key certificate by sending a CertificateRequest message, so that the connection can be mutually authenticated.',
          'The client generates a shared session key and sends it along with the client-side and server-side random numbers, all encrypted with the public key of the server. The client-side and server-side random numbers are merely sent to enhance each other’s authentication.',
          'The server decrypts the message received with its private key and extracts the shared session key.',
          'The client then computes a hash of the messages received so far from the server using the hashing algorithm agreed upon, encrypts the hash value with the shared session key using the encryption algorithm selected and sends it to the server.',
          'The server decrypts the client’s message with the shared session key using the decryption algorithm selected. The server then independently calculates the hash of all its messages to the client using the hashing algorithm agreed upon. If the hash value matches with the hash value in the message sent by the client, the server basically accepts the connection request from its direction. The server then computes a hash of all the messages it has received so far from the client and then sends it to the client by encrypting the hash value with the shared session key.',
          'The client decrypts the message with the shared session key and independently computes a hash of all the messages it has sent to the server. If the hash value locally computed matches with the hash value sent by the server, then the client has basically authenticated the server. Thus, a TLS connection is established.',
        ],
      },
    ],
  },

  {
    number: '8',
    title: 'IP Security (IPSec)',
    covers: [7],
    sections: [
      {
        type: 'definition',
        heading: '23. IP Security',
        text: 'The IP Security Protocol suite (IPSec) is implemented at the IP layer, so it does not require any change to existing transport layer and application layer protocols. IPSec is primarily designed to address the fundamental shortcomings of the IP layer such as IP address spoofing, wiretapping and session hijacking. The following two protocols are used to provide packet-level security for both IPv4 and IPv6:',
      },
      {
        type: 'bullets',
        items: [
          'IP Authentication Header, AH (Next Header protocol ID: 51) provides integrity, authentication and non-repudiation',
          'IP Encapsulating Security Payload, ESP (Next Header protocol ID: 50) provides confidentiality, along with authentication and integrity protection.',
        ],
      },
      {
        type: 'definition',
        heading: 'Security Association',
        text: 'The basis of IPSec is a Security Association (SA), characterized by the set of security parameters agreed upon for a secure communication channel between two communicating hosts. Each host can have several SAs in effect for communication with different remote hosts. A SA is identified using a Security Parameter Index (SPI) – a 32-bit identifier and the IP address of the partner host on the other side of the SA. The SPI and the partner IP address are used to index to the Security Association Database (SADB) that has information about the characteristics of different SAs. A SA is characterized by the following parameters: Encryption algorithm, Encryption key, Encryption parameters like the Initialization Vector, Integrity/Authentication algorithms (keyed-HMAC algorithms and the key) and Lifespan of the SA.',
      },
      {
        type: 'text',
        text: 'A SA is unidirectional. For two hosts to communicate in either direction, SAs have to be established separately in both directions. For host A to securely send data packets to host B, and make host B to believe that the data packet did come from host A, it should establish a SA with host B. Such a SA is said to be “outbound” at A and “inbound” at B. An IPSec header of a datagram sent from host A to host B, should have the secure features of the SA that is “inbound” at B and similarly the IPSec header of a datagram sent from host B to host A should have the secure features of the SA that is “inbound” at A.',
      },
      {
        type: 'text',
        text: 'Prior to establishing an IPSec SA, the two end hosts need to exchange their public-key certificates digitally certified by a trusted third-party certificate authority (CA). This is done through the Internet Key Exchange (IKE) protocol. Once the two hosts have exchanged each other’s public-key certificates, then they are said to have established an IKE Security Association (IKE SA). Establishing an IKE SA is a pre-requisite to establish an IPSec SA. The procedure to establish an IPSec SA is explained as follows:',
      },
      {
        type: 'bullets',
        items: [
          'Host A wishing to send data packets to host B needs to establish an “inbound SA” with host B.',
          'Host A picks a SPI that has not been yet chosen for communication with B and sends a "SA Establishment Request" message to B which contains the following: SPI for the inbound SA channel at host A (i.e., the outbound SA channel at host B); Lifespan of the association – negotiable by host B; The packet-level security protocol chosen (AH or ESP) – negotiable by host B.',
          'If AH is chosen, then the list of keyed-HMAC algorithms that could be used is specified. Host B will choose one from this list if it wishes to receive packets from host A.',
          'If ESP is chosen, then the list of keyed-HMAC algorithms along with the list of encryption algorithms and key-derivation functions that could be used will be sent.',
          'All negotiation messages (including the SA Establishment Request) are encrypted at the sender side using the receiver’s public key and decrypted with the receiver’s private key at the receiver side.',
          'Hosts A and B agree on a shared session key using the Diffie-Hellman exchange algorithm.',
          'The shared session key would be used for the keyed-HMAC algorithm.',
          'Each host uses the shared session key and the key-derivation function agreed upon to derive the secret key to be used for encryption and decryption of the data at hosts A and B respectively.',
        ],
      },
      {
        type: 'note',
        items: [
          'This is the only place in the whole manual where Diffie-Hellman is named. If you are asked how the two hosts end up with a shared secret they never transmitted, this bullet is the answer the lecturer wrote.',
        ],
      },
      {
        type: 'definition',
        heading: 'Authentication Header (AH)',
        text: 'AH provides integrity and data origin authentication for IP datagrams. AH operates on the top of IP, using the IP protocol number 51. The different fields in an AH are described below (also refer Figure 11). The structure of an original IPv4 datagram and IPv4 datagram with AH is shown in Figure 12.',
      },
      {
        type: 'note',
        items: [
          'The bullet on the previous page says AH provides "integrity, authentication and non-repudiation"; this section, describing the same header, claims only integrity and data origin authentication. Both are printed as they appear. The narrower claim is the correct one — AH authenticates with a shared-key HMAC, and a value two parties can both compute cannot prove to a third party which of them produced it, which is what non-repudiation requires.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ah-header.webp`,
        width: 649, height: 189,
        maxWidth: 820,
        caption: 'Figure 11: Structure of an Authentication Header (AH)',
        alt: 'A 32-bit-wide header laid out over bit positions 0, 8, 16 and 31: Next Header, Payload Length and RESERVED on the first word, then Security Parameters Index (SPI), then Sequence Number, then Authentication Data (variable)',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Next Header', def: 'Identifies the transport layer protocol' },
          { term: 'Payload Length (AH Length)', def: 'Indicates the length of the whole AH in 32-bit words' },
          { term: 'Reserved', def: 'Indicates that this field is reserved for future use and it must be set to zero' },
          { term: 'SPI', def: 'Identifies the security association' },
          { term: 'Sequence Number', def: 'Identifies the datagrams sent as part of a SA. This field is a monotonically increasing identifier and is used to assist in anti-replay protection' },
          { term: 'Authentication Data', def: 'Contains the integrity/authentication check value (keyed-HMAC) calculated over the entire packet, including the header fields that do not change at the intermediate hosts. The size of the keyed-HMAC may vary with each SA and may not be exactly multiple of 32 bits. If this is the case, the HMAC will be padded.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ipv4-with-ah.webp`,
        width: 1211, height: 596,
        caption: 'Figure 12: Original IPv4 Datagram and IPv4 Datagram with AH Header',
        alt: 'Two datagrams side by side. The original: IP header with Protocol = TCP, then TCP header and payload. With AH: the same IP header but Packet Length + AH Size and Protocol = AH, then the AH header (Next Header, Payload Length, RESERVED, SPI, Sequence Number, Authentication Data), then the TCP header and payload. Shading marks the fields used to compute the AH authentication data',
      },
      {
        type: 'definition',
        heading: 'Encapsulated Security Payload (ESP)',
        text: 'ESP provides origin authentication, integrity and confidentiality protection for the IP datagrams. The different fields in an ESP header are described below (also refer Figure 13). The structure of an original IPv4 datagram and IPv4 datagram with ESP header is shown in Figure 14.',
      },
      {
        type: 'note',
        items: [
          'The manual names this protocol two different ways: the bullet on page 31 calls it the "IP Encapsulating Security Payload", the heading here calls it the "Encapsulated Security Payload". Both are printed as they appear. The RFC name is Encapsulating Security Payload.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/esp-header.webp`,
        width: 690, height: 334,
        maxWidth: 820,
        caption: 'Figure 13: Structure of an Encapsulated Security Payload (ESP) Header',
        alt: 'A 32-bit-wide header over bit positions 0, 8, 16, 24 and 31: Security Parameters Index (SPI), then Sequence Number, then Payload Data (variable), then Padding (0-255 bytes), then Pad Length and Next Header sharing a word, then Authentication Data (variable)',
      },
      {
        type: 'termlist',
        items: [
          { term: 'SPI', def: 'Identifies the security association' },
          { term: 'Sequence Number', def: 'Identifies the datagrams sent as part of a SA. This field is a monotonically increasing identifier and is used to assist in anti-replay protection' },
          { term: 'Payload data', def: 'Indicates the data to be transferred' },
          { term: 'Padding', def: 'Used with certain block ciphers for padding the payload data to a full block length.' },
          { term: 'Pad length', def: 'Indicates the size of the padding in bytes' },
          { term: 'Next Header', def: 'Identifies the transport layer protocol' },
          { term: 'Authentication Data', def: 'This is the integrity/ authentication check value (keyed-HMAC) calculated over only the SPI, Sequence Number in the ESP header, the actual data, padding data, pad length and the Next Header field.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ipv4-with-esp.webp`,
        width: 1223, height: 572,
        caption: 'Figure 14: Original IPv4 Datagram and IPv4 Datagram with ESP Header',
        alt: 'Two datagrams side by side. The original: IP header with Protocol = TCP, then TCP header and payload. With ESP: the IP header with Protocol = ESP, then the ESP header (SPI, Sequence Number), then the TCP header and payload, Padding (0-255 bytes), Pad Length and Next Header = TCP, then Authentication Data. Brackets mark which span is encrypted and which is authenticated',
      },
      {
        type: 'note',
        items: [
          'Added for clarity — the manual does not draw this comparison. AH proves who sent a packet and that nobody altered it, but anyone watching the wire can still read the contents; ESP additionally encrypts the payload, which is why VPN deployments use ESP.',
          'Added for clarity — AH covers the immutable fields of the outer IP header, including the addresses, so a NAT device that rewrites those addresses invalidates the AH check value. ESP authenticates only from the ESP header inwards, so it is unaffected by the rewrite, though ESP still has to be wrapped in UDP (NAT-T) to get through most NAT devices at all.',
        ],
      },
    ],
  },

  {
    number: '9',
    title: 'Kerberos Authentication and Mobile Device Security',
    covers: [1],
    partial: [6],
    sections: [
      {
        type: 'definition',
        heading: '24. Kerberos',
        text: 'Kerberos [26] is an authentication protocol used by processes/hosts communicating over an insecure network to verify each other’s identity in a secure manner. It is based on the idea that a central server provides authenticated tokens called "tickets" to requesting applications. A ticket is an unforgeable, non-replayable, authenticated object. The security of the protocol depends on the assumption that the participating machines maintain loosely synchronized time. The four entities involved in Kerberos are: (i) Authentication Server, AS; (ii) Ticket Granting Server, TGS; (iii) Service Server; SS and (iv) Ticket Granting Ticket, TGT. A client authenticates itself to the AS once and obtains a ticket that can be used to obtain additional tickets from the SS without requiring the client to re-authenticate itself for every service requested. The sequence of steps of the protocol is described below (also shown in Figure 15):',
      },
      {
        type: 'note',
        items: [
          '"obtains a ticket that can be used to obtain additional tickets from the SS" is printed exactly as it appears, and it is wrong. The additional tickets come from the TGS, not the SS — that is the whole point of the Ticket Granting Server, and the steps below say so. The SS is the machine hosting the service you finally want to reach.',
        ],
      },
      {
        type: 'text',
        heading: 'Kerberos Protocol Steps',
        text: 'Step 1: User Client-based Logon – The user submits the username and password information to the client machine. The client machine uses a one-way function on the entered password to compute the secret key for the user.',
      },
      {
        type: 'image',
        src: `${IMG}/kerberos.webp`,
        width: 799, height: 494,
        maxWidth: 820,
        caption: 'Figure 15: Kerberos Protocol Steps',
        alt: 'Client exchanging messages with three servers. To the Authentication Server: User ID, back A: E-User-Secret-Key(Client/TGS Session Key) and B: E-TGS-Secret-Key(Ticket Granting Ticket). To the Ticket Granting Server: C: E-TGS-Secret-Key(Ticket Granting Ticket) with Service ID and D: E-Client/TGS Session Key(User ID, Client ID, Timestamp), back F and E. To the Service Server: E: E-Service-Secret-Key(Client-to-Server Ticket) and G: E-Client/Server Session Key(User ID, Client ID, Timestamp), back H: E-Client/Server Session Key(Timestamp++)',
      },
      {
        type: 'text',
        heading: 'Step 2: Client Authentication',
        text: 'The client sends the username in plaintext to the Kerberos AS. The AS checks the username in its database, and if an entry exists, the AS sends back two messages:',
      },
      {
        type: 'bullets',
        items: [
          'Message A: contains the Client/ TGS session key encrypted with the secret key for the user (derived from the user’s password at the AS).',
          'Message B: contains the Ticket-Granting Ticket, TGT, which includes the following: (i) username, (ii) network address of the user’s client machine, (iii) validity period of the TGT and (iv) Client/ TGS session key. The TGT is encrypted using the secret key of the TGS.',
        ],
      },
      {
        type: 'text',
        text: 'Once the client receives messages A and B, the client decrypts message A with the secret key of the user and extracts the Client/ TGS session key.',
      },
      {
        type: 'text',
        heading: 'Step 3: Client Service Authorization',
        text: 'The client sends the following two messages to the TGS:',
      },
      {
        type: 'bullets',
        items: [
          'Message C: contains the TGT from message B and identification for the requested service.',
          'Message D: contains the authentication information for the user/client. The authentication information submitted includes the username, the network address of the user/client machine and a timestamp. All of this information is encrypted using the Client/ TGS session key.',
        ],
      },
      {
        type: 'text',
        text: 'After receiving message C, the TGS decrypts the message with its secret key and extracts the Client/TGS session key. The TGS then decrypts message D using the Client/ TGS session key and sends back the following two messages to the client:',
      },
      {
        type: 'bullets',
        items: [
          'Message E: contains the Client-to-Server Ticket, which includes the username, the network address of the user/client machine, the validity period the ticket and the Client/Server session key. The ticket is encrypted with the secret key of the server for the service requested.',
          'Message F: contains the Client/Server session key and the timestamp of message D incremented by 1. Both the key and the timestamp are encrypted with the Client/ TGS session key.',
        ],
      },
      {
        type: 'text',
        text: 'After the client receives messages E and F, it uses the Client/ TGS session key to decrypt message F to extract the Client/ Server session key.',
      },
      {
        type: 'text',
        heading: 'Step 4: Client Service Request',
        text: 'The client sends the following two messages to the SS: (i) message E (received from the TGS) and (ii) message G, containing the username, the network address of the user/client machine and the timestamp, all encrypted with the Client/Server session key. The SS decrypts message E using its secret key and extracts the Client-to-Server ticket and the Client/Server session key. The SS decrypts message G using the Client/Server session key and extracts the user/client identification information. If the user/client identification information in message G matches with the user/client information in the Client-to-Server ticket, the SS increments the timestamp information in message G by 1. The incremented timestamp is encrypted using the Client/Server session key and sent back to the client (as message H). The client on receiving message H decrypts the message with the Client/Server session key. If the timestamp value in message H is the value expected by the client, the client trusts the server and start sending service requests to it.',
      },
      {
        type: 'note',
        items: [
          '"the validity period the ticket" in message E is printed as it appears — the manual drops the word "of".',
          'Figure 15 lists message F above message E on its arrows, in the opposite order to the text. The text is the one to follow.',
        ],
      },
      {
        type: 'proscons',
        heading: 'Kerberos Advantages and Kerberos Weaknesses',
        advantages: [
          'A user’s password is not sent on the wire (either in plaintext or ciphertext) during session initiation.',
          'Kerberos provides cryptographic protection against spoofing. Each service access request is mediated by the TGS, which knows that the identity of the user/client is authenticated by the Kerberos AS and processes the user/client request encrypted with the Client/TGS session key',
          'As each ticket has a limited validity period, long-term cryptanalytic attacks cannot be launched.',
          'Kerberos assumes that the clocks across all the clients and the servers are synchronized. A host responds back only if the request messages have timestamp value close to the current time at the host.',
          'Kerberos provides mutual authentication. The TGS and SS can respectively get access to the Client/TGS session key and the Client/Server session key only after they can decrypt the messages containing these keys with their appropriate secret keys. The client uses this approach to indirectly authenticate the servers.',
        ],
        disadvantages: [
          'Kerberos requires continuous availability of a trusted ticket-granting server for all access control and authentication checks.',
          'Authenticity of servers requires a trusted relationship between the TGS and every service server.',
          'Timely transactions are required to reduce chances of a user with genuine ticket being denied service.',
          'Password guessing could still work to get the valid secret key for a user. The whole system is still dependent on the user password.',
          'Kerberos does not scale well as the number of service servers is increased. The TGS has to maintain a trustworthy relationship and maintain the secret key for each SS. Adding backup service servers further complicates the situation.',
          'Network services cannot be accessed without obtaining Kerberos authentication. All applications run by the users in the network need to go through Kerberos authentication.',
        ],
      },

      {
        type: 'definition',
        heading: 'Mobile Device Security',
        text: 'Technology has jumped by leaps and bounds since the advent of cellphones and mobile devices. At one time a flip phone was considered cutting edge if it had a camera and the ability to text. Nowadays, phones are like handheld laptops, able to browse the internet and tablets are used to control other IOT devices. Security on phones and mobile devices is as important as it is on desktop and laptop computers, even more so because of the additional functionality that comes with an internet-connected device that can go almost anywhere. Here are a few things to consider with regard to mobile devices:',
      },
      {
        type: 'bullets',
        items: [
          'Virus protection is extremely important on cellphones as they utilize third-party networks while roaming and connect to an average of 160 different IP addresses daily.',
          'Physical security is equally important since devices are small and can be easily slipped out of sight by a would-be thief.',
          'Mobile Device Management (MDM) software should be used to be able to track devices (through GPS) and usage, and even be able to remotely wipe or take photos if the device is lost or stolen.',
          'Additional anti-theft software can be installed to further protect the device and data, and even remains installed after a factory reset.',
          'Practice the same ‘think-before-you-click’ mindset on your mobile devices that you have on your desktop and laptop machines. Some phishing specifically targets mobile devices.',
          'Never do any online banking on a smartphone or tablet; only use a wired connection for added security.',
          'Utilize any encryption that the device has built into its settings (usually under Security).',
          'Never connect to unknown WiFi networks,',
          'Only turn on Bluetooth when you need to use it (i.e. making phone calls in a car).',
        ],
      },
      {
        type: 'note',
        items: [
          'This section is where the manual\'s theory ends, on printed page 38. It has no row in the manual\'s own outline, which stops at row 24 (Kerberos) — so it carries no section number here.',
          'The manual spells it "IOT"; the usual spelling is IoT, for Internet of Things.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  LABORATORY PRACTICALS
  //  Each practical states its objective, the instructions for
  //  execution, the program listing and the expected output. Outputs
  //  labelled "Verified output" were produced by actually running the
  //  listing; the few that need root, a live network or a personal API
  //  key say so instead of inventing a result.
  // ─────────────────────────────────────────────────────────────────

  {
    number: '10',
    title: 'Practical 1: Strings, Files and Basic Network Communication',
    partial: [8],
    sections: [
      {
        type: 'bullets',
        heading: 'Objective',
        items: [
          'Perform string manipulation',
          'Read from and write to a file',
          'Implement a basic example of network communication',
        ],
      },
      {
        type: 'bullets',
        heading: 'Instructions for Execution',
        items: [
          'String manipulation: this part of the script reverses a given string.',
          'File read and write: create a file named input.txt in the same directory as the script with some content. The script reads this file, reverses its content, and writes it to output.txt.',
          'Basic network communication: this is a simple server that echoes received messages. To test it you will need a separate client script, or a network tool to send data to the server. Uncomment the simple_server(65432) line to run the server.',
        ],
      },
      {
        type: 'code',
        heading: 'Program Listing',
        language: 'python',
        code: String.raw`import socket

# String Manipulation Function
def reverse_string(s):
    return s[::-1]

# File Read and Write Function
def read_and_reverse_write(input_file, output_file):
    with open(input_file, 'r') as file:
        content = file.read()
        reversed_content = reverse_string(content)
    with open(output_file, 'w') as file:
        file.write(reversed_content)

# Basic Network Communication Function
def simple_server(port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', port))
    server_socket.listen(1)
    print(f"Server listening on port {port}...")
    conn, addr = server_socket.accept()
    print(f"Connected by {addr}")
    while True:
        data = conn.recv(1024)
        if not data:
            break
        conn.sendall(data)
        conn.close()

# Main Execution
if __name__ == "__main__":
    # String Manipulation
    original_string = "Hello, World!"
    reversed_str = reverse_string(original_string)
    print(f"Original String: {original_string}")
    print(f"Reversed String: {reversed_str}")
    # File Read and Write
    read_and_reverse_write('input.txt', 'output.txt')
    # Simple Network Communication (Uncomment to run the server)
    # Note: Running the server will require a client to connect and send data.
    # simple_server(65432)`,
      },
      {
        type: 'code',
        heading: 'Verified Output',
        language: 'output',
        code: String.raw`Original String: Hello, World!
Reversed String: !dlroW ,olleH

# Contents of output.txt after the run:
bal 122BYC olleh`,
      },
    ],
  },

  {
    number: '11',
    title: 'Practical 2: Basic Encryption and Decryption Algorithms',
    covers: [7],
    sections: [
      {
        type: 'bullets',
        heading: 'Objective',
        items: [
          'Implement Caesar Cipher encryption and decryption',
          'Implement AES and DES encryption and decryption',
        ],
      },
      {
        type: 'code',
        heading: 'Program Listing',
        language: 'python',
        code: String.raw`from Crypto.Cipher import AES, DES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

# Caesar Cipher
def caesar_cipher_encrypt(text, shift):
    result = ""
    for i in range(len(text)):
        char = text[i]
        if char.isupper():
            result += chr((ord(char) + shift - 65) % 26 + 65)
        else:
            result += chr((ord(char) + shift - 97) % 26 + 97)
    return result

def caesar_cipher_decrypt(text, shift):
    return caesar_cipher_encrypt(text, -shift)

# AES Encryption/Decryption
def aes_encrypt(plain_text, key):
    cipher = AES.new(key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(plain_text.encode('utf-8'), AES.block_size))
    iv = base64.b64encode(cipher.iv).decode('utf-8')
    ct = base64.b64encode(ct_bytes).decode('utf-8')
    return iv, ct

def aes_decrypt(iv, ct, key):
    iv = base64.b64decode(iv)
    ct = base64.b64decode(ct)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    pt = unpad(cipher.decrypt(ct), AES.block_size)
    return pt.decode('utf-8')

# DES Encryption/Decryption
def des_encrypt(plain_text, key):
    cipher = DES.new(key, DES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(plain_text.encode('utf-8'), DES.block_size))
    iv = base64.b64encode(cipher.iv).decode('utf-8')
    ct = base64.b64encode(ct_bytes).decode('utf-8')
    return iv, ct

def des_decrypt(iv, ct, key):
    iv = base64.b64decode(iv)
    ct = base64.b64decode(ct)
    cipher = DES.new(key, DES.MODE_CBC, iv)
    pt = unpad(cipher.decrypt(ct), DES.block_size)
    return pt.decode('utf-8')

# Main Execution
if __name__ == "__main__":
    # Caesar Cipher Example
    shift = 4
    original_text = "HelloWorld"
    encrypted = caesar_cipher_encrypt(original_text, shift)
    decrypted = caesar_cipher_decrypt(encrypted, shift)
    print(f"Caesar Cipher: {original_text} -> {encrypted} -> {decrypted}")
    # AES Example
    aes_key = get_random_bytes(16)  # AES key must be either 16, 24, or 32 bytes long
    iv, encrypted = aes_encrypt(original_text, aes_key)
    decrypted = aes_decrypt(iv, encrypted, aes_key)
    print(f"AES: {original_text} -> {encrypted} -> {decrypted}")
    # DES Example
    des_key = get_random_bytes(8)  # DES key must be 8 bytes long
    iv, encrypted = des_encrypt(original_text, des_key)
    decrypted = des_decrypt(iv, encrypted, des_key)
    print(f"DES: {original_text} -> {encrypted} -> {decrypted}")`,
      },
      {
        type: 'code',
        heading: 'Verified Output',
        language: 'output',
        code: String.raw`Caesar Cipher: HelloWorld -> LippsAsvph -> HelloWorld
AES: HelloWorld -> dMouGCIJloCkYFVHkOLsBg== -> HelloWorld
DES: HelloWorld -> IM5VbCG93S7tbIlZLnrEZw== -> HelloWorld`,
      },
      {
        type: 'note',
        items: [
          'The AES and DES ciphertexts change on every run, because get_random_bytes generates a fresh key and CBC mode generates a fresh initialisation vector each time. Only the Caesar line is reproducible.',
          'The Caesar implementation here assumes every character is a letter — the else branch applies the lowercase arithmetic to spaces, digits and punctuation too, which is why the manual only ever feeds it "HelloWorld". Practical 3 fixes this.',
        ],
      },
    ],
  },

  {
    number: '12',
    title: 'Practical 3: Cryptography Challenge — Hybrid Security',
    covers: [7],
    sections: [
      {
        type: 'casestudy',
        title: 'Scenario',
        prompt: 'You are a security engineer tasked with upgrading a legacy communication system. The system currently uses an ancient, insecure Caesar Cipher to encrypt sensitive data files before transmitting them. Your team wants to migrate this process to industry-standard symmetric encryption using AES (Advanced Encryption Standard), and to evaluate DES (Data Encryption Standard) along the way to document why it should no longer be used.',
        tasks: [
          'Debug the code and call your functions.',
          'Rewrite the code and display the outputs confirming successful decryption.',
        ],
      },
      {
        type: 'code',
        heading: 'Skeleton Given in the Manual',
        language: 'python',
        code: String.raw`# Ensure the library is installed
# !pip install pycryptodome
import base64
from Crypto.Cipher import AES, DES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

# Create dummy source file
with open("source_data.txt", "w") as f:
    f.write("Confidential Launch Codes: 2026-SECURE")

# === 1. CAESAR CIPHER IMPLEMENTATION ===
def caesar_cipher(text, shift, mode="encrypt"):
    # TODO: Implement basic shift-based logic
    pass

# 2. AES IMPLEMENTATION
def aes_encrypt_decrypt(plaintext):
    # Hint: Use AES.block_size for padding
    aes_key = get_random_bytes(32)  # 256-bit key
    # TODO: Implement AES-CBC encryption & decryption
    pass

# 3. DES IMPLEMENTATION
def des_encrypt_decrypt(plaintext):
    des_key = get_random_bytes(8)  # 64-bit key
    # TODO: Implement DES-CBC encryption & decryption
    pass

# Main Execution Evaluation
if __name__ == "__main__":
    with open("source_data.txt", "r") as f:
        original_text = f.read()
    print(f"Original Text: {original_text}\n")
    # TODO:`,
      },
      {
        type: 'text',
        heading: 'Suggested Solution',
        text: 'The TODO sections of the original listing (Caesar, AES-CBC and DES-CBC) have been implemented below, and an evaluation step added. This completed listing is not part of the original manual.',
      },
      {
        type: 'code',
        language: 'python',
        code: String.raw`# Ensure the library is installed
# !pip install pycryptodome
import base64
from Crypto.Cipher import AES, DES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

# Create dummy source file
with open("source_data.txt", "w") as f:
    f.write("Confidential Launch Codes: 2026-SECURE")

# === 1. CAESAR CIPHER IMPLEMENTATION ===
def caesar_cipher(text, shift, mode="encrypt"):
    """Shift each alphabetic character by 'shift' places, preserving case.
    Non-alphabetic characters are passed through unchanged."""
    if mode == "decrypt":
        shift = -shift
    result = []
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            result.append(chr((ord(ch) - base + shift) % 26 + base))
        else:
            result.append(ch)
    return "".join(result)

# 2. AES IMPLEMENTATION
def aes_encrypt_decrypt(plaintext):
    """Encrypt then decrypt with AES-256 in CBC mode. Returns (ciphertext_b64, recovered)."""
    aes_key = get_random_bytes(32)                       # 256-bit key
    cipher = AES.new(aes_key, AES.MODE_CBC)              # random IV generated for us
    iv = cipher.iv
    ciphertext = cipher.encrypt(pad(plaintext.encode(), AES.block_size))
    decipher = AES.new(aes_key, AES.MODE_CBC, iv)
    recovered = unpad(decipher.decrypt(ciphertext), AES.block_size).decode()
    return base64.b64encode(ciphertext).decode(), recovered

# 3. DES IMPLEMENTATION
def des_encrypt_decrypt(plaintext):
    """Encrypt then decrypt with DES in CBC mode. Returns (ciphertext_b64, recovered)."""
    des_key = get_random_bytes(8)                        # 64-bit key
    cipher = DES.new(des_key, DES.MODE_CBC)
    iv = cipher.iv
    ciphertext = cipher.encrypt(pad(plaintext.encode(), DES.block_size))
    decipher = DES.new(des_key, DES.MODE_CBC, iv)
    recovered = unpad(decipher.decrypt(ciphertext), DES.block_size).decode()
    return base64.b64encode(ciphertext).decode(), recovered

# Main Execution Evaluation
if __name__ == "__main__":
    with open("source_data.txt", "r") as f:
        original_text = f.read()
    print(f"Original Text: {original_text}\n")

    # --- Caesar ---
    caesar_ct = caesar_cipher(original_text, 3, "encrypt")
    caesar_pt = caesar_cipher(caesar_ct, 3, "decrypt")
    print("[1] CAESAR CIPHER (shift = 3)")
    print(f"    Encrypted : {caesar_ct}")
    print(f"    Decrypted : {caesar_pt}")
    print(f"    Match     : {caesar_pt == original_text}\n")

    # --- AES ---
    aes_ct, aes_pt = aes_encrypt_decrypt(original_text)
    print("[2] AES-256 (CBC mode)")
    print(f"    Encrypted : {aes_ct}")
    print(f"    Decrypted : {aes_pt}")
    print(f"    Match     : {aes_pt == original_text}\n")

    # --- DES ---
    des_ct, des_pt = des_encrypt_decrypt(original_text)
    print("[3] DES (CBC mode)")
    print(f"    Encrypted : {des_ct}")
    print(f"    Decrypted : {des_pt}")
    print(f"    Match     : {des_pt == original_text}\n")

    # --- Evaluation ---
    print("[4] SECURITY EVALUATION")
    print(f"    Caesar : 25 possible keys  - broken by brute force instantly.")
    print(f"    DES    : {8 * 8}-bit key ({7 * 8}-bit effective) - broken in hours; deprecated.")
    print(f"    AES    : {32 * 8}-bit key - no practical attack; the current standard.")`,
      },
      {
        type: 'code',
        heading: 'Verified Output',
        language: 'output',
        code: String.raw`Original Text: Confidential Launch Codes: 2026-SECURE

[1] CAESAR CIPHER (shift = 3)
    Encrypted : Frqilghqwldo Odxqfk Frghv: 2026-VHFXUH
    Decrypted : Confidential Launch Codes: 2026-SECURE
    Match     : True

[2] AES-256 (CBC mode)
    Encrypted : 7OY2ftPIdvcxbqo/0ffgcVbYkn5ptT39U1vmyQe+5PmnncBFa6c8VKTXfiSqHaq9
    Decrypted : Confidential Launch Codes: 2026-SECURE
    Match     : True

[3] DES (CBC mode)
    Encrypted : VNgSGJn/WRsAHpL3QU98CVYSNeEzeKXGFoizaahpdKlKdV3MAM4iuQ==
    Decrypted : Confidential Launch Codes: 2026-SECURE
    Match     : True

[4] SECURITY EVALUATION
    Caesar : 25 possible keys  - broken by brute force instantly.
    DES    : 64-bit key (56-bit effective) - broken in hours; deprecated.
    AES    : 256-bit key - no practical attack; the current standard.`,
      },
    ],
  },

  {
    number: '13',
    title: 'Practical 4: Detecting File Tampering and Credential Integrity',
    covers: [7],
    sections: [
      {
        type: 'casestudy',
        title: 'Scenario',
        prompt: 'You are a Security Analyst at a financial tech company. A system administrator has downloaded a critical software update patch named patch_v4.2.bin and needs to be sure it was not corrupted during download, or maliciously tampered with by a man-in-the-middle attacker. The vendor lists the expected SHA-256 integrity hash as 872e4e50ce9990d8b041330c47e9ddd11bec65b74c1029da351ad47b1a20f3a1. At the same time your team is checking a suspected compromised string in the database: they found a plaintext string and need to confirm whether it matches a legacy MD5 hash recovered from a system log, 68e109f0f40ca72a15e05cc22786f8e6.',
        tasks: [
          'Generate MD5 and SHA-256 hashes for strings.',
          'Verify hashes of strings.',
        ],
      },
      {
        type: 'code',
        heading: 'Program Listing',
        language: 'python',
        code: String.raw`import hashlib

# 1. CORE FUNCTIONS FOR HASHING & VERIFICATION
def generate_hashes(input_string):
    """Generates both MD5 and SHA-256 hashes for a given input string."""
    # Convert string to bytes since hashing algorithms require byte inputs
    encoded_bytes = input_string.encode("utf-8")
    # Generate MD5 Hash
    md5_obj = hashlib.md5(encoded_bytes)
    md5_hex = md5_obj.hexdigest()
    # Generate SHA-256 Hash
    sha256_obj = hashlib.sha256(encoded_bytes)
    sha256_hex = sha256_obj.hexdigest()
    return md5_hex, sha256_hex

def verify_hash(input_string, known_hash):
    """Checks if a given input string matches a known MD5 or SHA-256 hash.
    Automatically identifies the algorithm type based on character length."""
    # MD5 hashes are always 32 hex characters
    if len(known_hash) == 32:
        calculated_hash = hashlib.md5(input_string.encode("utf-8")).hexdigest()
    # SHA-256 hashes are always 64 hex characters
    elif len(known_hash) == 64:
        calculated_hash = hashlib.sha256(input_string.encode("utf-8")).hexdigest()
    else:
        print("[ERROR] Unknown hash format. Length must be 32 or 64.")
        return False
    # Return True if they match, False otherwise
    return calculated_hash.lower() == known_hash.lower()

# 2. MAIN EXECUTION & DEMO
if __name__ == "__main__":
    # Test String
    original_text = "SecureData2026"
    print(f"--- Original Text: '{original_text}' ---\n")

    # Task 1: Generate MD5 and SHA-256 hashes
    md5_result, sha256_result = generate_hashes(original_text)
    print("1. GENERATED HASHES:")
    print(f" - MD5 (32 chars): {md5_result}")
    print(f" - SHA-256 (64 chars): {sha256_result}\n")

    # Task 2: Verify hashes (True & False cases)
    print("2. HASH VERIFICATION DEMO:")
    # Case A: Verifying correct matching information
    is_md5_valid = verify_hash(original_text, md5_result)
    is_sha256_valid = verify_hash(original_text, sha256_result)
    print(f" - Is MD5 match valid? -> {is_md5_valid} (Expected: True)")
    print(f" - Is SHA-256 match valid? -> {is_sha256_valid} (Expected: True)")
    # Case B: Tampering detection (Verifying altered text against original hash)
    tampered_text = "SecureData2026!"
    is_tamper_detected = verify_hash(tampered_text, sha256_result)
    print(f" - Is tampered text valid? -> {is_tamper_detected} (Expected: False)")`,
      },
      {
        type: 'code',
        heading: 'Verified Output',
        language: 'output',
        code: String.raw`--- Original Text: 'SecureData2026' ---

1. GENERATED HASHES:
 - MD5 (32 chars): f5e98407ec19c4d13fd952bcb90330d8
 - SHA-256 (64 chars): 2422ab18ee45c54cbf3a50e42fbc092fa52f2afca6d46475755185790a873bb7

2. HASH VERIFICATION DEMO:
 - Is MD5 match valid? -> True (Expected: True)
 - Is SHA-256 match valid? -> True (Expected: True)
 - Is tampered text valid? -> False (Expected: False)`,
      },
      {
        type: 'note',
        items: [
          'Adding a single "!" to the string changes the entire SHA-256 digest — the avalanche effect that makes hashes useful for tamper detection.',
          'MD5 appears here only because the scenario involves a legacy system log. It has been broken for collision resistance since 2004 and must never be used for new integrity or password work; SHA-256 is the right default.',
        ],
      },
    ],
  },

  {
    number: '14',
    title: 'Practical 5: Client-Server Application and Socket Programming',
    partial: [8],
    sections: [
      {
        type: 'bullets',
        heading: 'Objective',
        items: [
          'Create a simple TCP server and client',
          'Understand the basics of socket programming in Python',
        ],
      },
      {
        type: 'bullets',
        heading: 'Instructions',
        items: [
          'Run the server script first. It listens for incoming connections on localhost (127.0.0.1) and port 65432.',
          'Once the server is running, run the client script. The client connects to the server, sends a message, and receives an echo back.',
          'This demonstrates a basic TCP/IP socket connection where the server listens for connections and the client sends a message.',
        ],
      },
      {
        type: 'code',
        heading: 'Program Listing',
        language: 'python',
        code: String.raw`import socket
import threading
import time

# 1. TCP SERVER IMPLEMENTATION
def start_server(host="127.0.0.1", port=65432):
    """Starts a simple TCP Echo Server."""
    # AF_INET = IPv4, SOCK_STREAM = TCP
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        # Bind the socket to the address and port
        s.bind((host, port))
        # Listen for incoming connections
        s.listen()
        print(f"[SERVER] Listening on {host}:{port}")
        # Accept a client connection (this blocks until a client connects)
        conn, addr = s.accept()
        with conn:
            print(f"[SERVER] Connected successfully by client address: {addr}")
            while True:
                # Receive data payload up to 1024 bytes
                data = conn.recv(1024)
                if not data:
                    break  # Client disconnected
                print(f"[SERVER] Received: '{data.decode()}' -> Echoing back to client.")
                # Echo the exact data back to the client
                conn.sendall(data)
        print("[SERVER] Server closed cleanly.")

# 2. TCP CLIENT IMPLEMENTATION
def start_client(host="127.0.0.1", port=65432):
    """Starts a TCP Client to send a message to the server."""
    # Wait briefly to ensure the background server thread has started up
    time.sleep(1)
    print(f"[CLIENT] Attempting to connect to server at {host}:{port}...")
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        print("[CLIENT] Connected!")
        # Send data payload message
        message = "Hello, TCP Server! This is SecureData2026."
        print(f"[CLIENT] Sending message: '{message}'")
        s.sendall(message.encode('utf-8'))
        # Receive the echoed response back from the server
        data = s.recv(1024)
        print(f"[CLIENT] Received echo from server: '{data.decode('utf-8')}'")

# 3. EXECUTION CONTROL
if __name__ == "__main__":
    # Define connection parameters
    # '127.0.0.1' (localhost) is used for internal loopback communication
    HOST = '127.0.0.1'
    PORT = 65432
    # Run the server in a separate background thread so it doesn't lock the main execution
    server_thread = threading.Thread(target=start_server, args=(HOST, PORT), daemon=True)
    server_thread.start()
    # Run the client in the foreground main execution thread
    start_client(HOST, PORT)`,
      },
      {
        type: 'code',
        heading: 'Verified Output',
        language: 'output',
        code: String.raw`[SERVER] Listening on 127.0.0.1:65432
[CLIENT] Attempting to connect to server at 127.0.0.1:65432...
[CLIENT] Connected!
[CLIENT] Sending message: 'Hello, TCP Server! This is SecureData2026.'
[SERVER] Connected successfully by client address: ('127.0.0.1', 38936)
[SERVER] Received: 'Hello, TCP Server! This is SecureData2026.' -> Echoing back to client.
[CLIENT] Received echo from server: 'Hello, TCP Server! This is SecureData2026.'
[SERVER] Server closed cleanly.`,
      },
      {
        type: 'note',
        items: [
          'The client port in the server line (38936 here) is an ephemeral port picked by the operating system, so it differs on every run.',
          'This is the three-way handshake from section 13 in practice: s.listen() puts the server in the state where it will answer a SYN, and s.connect() sends it.',
        ],
      },
    ],
  },

  {
    number: '15',
    title: 'Practical 6: Live Packet Analysis',
    covers: [8],
    sections: [
      {
        type: 'casestudy',
        title: 'Scenario',
        prompt: 'As a Network Security Consultant, you suspect that an unauthorised application is sending unsecured traffic across your local network segment. You need to verify which layer protocols are active and identify what sensitive data might be leaking in plaintext. Using Python and the scapy packet manipulation framework, you must build a lightweight packet sniffer that monitors the network interface, extracts layer-specific fields, and audits payload content.',
        tasks: [
          'Environment setup: ensure scapy is dynamically installed in the runtime environment.',
          'Targeted packet sniffing: capture a maximum stream volume of 5 network packets.',
          'IP layer: extract and print the source IP and destination IP.',
          'Transport layer: check whether the packet uses TCP or UDP, and extract the source and destination ports.',
          'Payload analysis: if the packet carries a raw data payload, decode it to string format and inspect it for human-readable information.',
        ],
      },
      {
        type: 'text',
        heading: 'Corrected Program Listing',
        text: 'The listing below is corrected: the two packet-construction blocks in the original were missing their closing parenthesis, and Scapy’s Raw layer had been scanned as RAW.',
      },
      {
        type: 'code',
        language: 'python',
        code: String.raw`# 1. Install Scapy package dynamically inside the environment
import os
try:
    import scapy
except ImportError:
    print("Installing Scapy library...")
    os.system('pip install scapy')

import threading
import time
from scapy.all import IP, Raw, TCP, UDP, sniff

# 2. PACKET ANALYSIS LOGIC
def process_packet(packet):
    """Callback function designed to analyze layers and payloads of captured network packets."""
    print("\n" + "=" * 50)
    print(f'Captured Packet: {packet.summary()}')
    print("-" * 50)
    # Check for Network Layer (IPv4)
    if packet.haslayer(IP):
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        print(f"[IP LAYER] Source: {src_ip} -> Destination: {dst_ip}")
        # Check for Transport Layer: TCP
        if packet.haslayer(TCP):
            src_port = packet[TCP].sport
            dst_port = packet[TCP].dport
            print(f'[TRANSPORT LAYER] Protocol: TCP | Src Port: {src_port} -> Dst Port: {dst_port}')
        # Check for Transport Layer: UDP
        elif packet.haslayer(UDP):
            src_port = packet[UDP].sport
            dst_port = packet[UDP].dport
            print(f"[TRANSPORT LAYER] Protocol: UDP | Src Port: {src_port} -> Dst Port: {dst_port}")
        # Check for Application Data Payload
        if packet.haslayer(Raw):
            raw_payload = packet[Raw].load
            try:
                # Attempt to decode byte array to readable ASCII text
                decoded_payload = raw_payload.decode("utf-8", errors="ignore")
                print(f"[APPLICATION PAYLOAD] Raw Data: '{decoded_payload}'")
            except Exception:
                print(f" [APPLICATION PAYLOAD] Binary Data (Hex): {raw_payload.hex()}")
    else:
        print("[NON-IP LAYER] Layer 2 or Alternative Broadcast Frame Captured.")

def start_sniffing():
    """Initializes packet monitoring execution block."""
    print("Initializing engine... Network Packet Sniffer Status: ACTIVE")
    print("Monitoring traffic metrics (Capturing 5 sample packets)...")
    # sniff loops traffic collection on local interface. prn targets execution callback.
    sniff(prn=process_packet, count=5, timeout=10)
    print("\n" + "=" * 50)
    print("Analysis Task Complete. Sniffer engine stopped.")

# 3. TRAFFIC INJECTION SIMULATOR
def simulate_network_traffic():
    """Generates synthetic network injection packets into loopback layer
    to ensure the code produces output results within restricted cloud notebooks."""
    time.sleep(2)  # Wait for sniffer to spin up active sockets
    from scapy.all import send
    print("\n[SIMULATOR] Generating secure web packet (TCP Port 443)...")
    pkt1 = (
        IP(src="192.168.1.50", dst="10.0.0.1")
        / TCP(sport=49321, dport=443)
        / b"GET /index.html HTTP/1.1"
    )
    send(pkt1, verbose=False)
    time.sleep(1)
    print("\n[SIMULATOR] Generating Rogue network telemetry packet...")
    pkt2 = (
        IP(src="185.220.101.38", dst="192.168.1.1")
        / UDP(sport=53, dport=53)
        / b"UNSECURED_DATAFEED LEAK"
    )
    send(pkt2, verbose=False)

# 4. MAIN PROGRAM RUNTIME CONTROL
if __name__ == "__main__":
    # Start the local interface packet injection thread in background
    sim_thread = threading.Thread(target=simulate_network_traffic, daemon=True)
    sim_thread.start()
    # Launch the live packet analyzer
    start_sniffing()`,
      },
      {
        type: 'text',
        heading: 'Verified Output',
        text: 'Raw packet capture requires root, so the analysis callback was exercised against the same two packets the script’s own simulator generates.',
      },
      {
        type: 'code',
        language: 'output',
        code: String.raw`Initializing engine... Network Packet Sniffer Status: ACTIVE
Monitoring traffic metrics (Capturing 5 sample packets)...

==================================================
Captured Packet: IP / TCP 192.168.1.50:49321 > 10.0.0.1:https S / Raw
--------------------------------------------------
[IP LAYER] Source: 192.168.1.50 -> Destination: 10.0.0.1
[TRANSPORT LAYER] Protocol: TCP | Src Port: 49321 -> Dst Port: 443
[APPLICATION PAYLOAD] Raw Data: 'GET /index.html HTTP/1.1'

==================================================
Captured Packet: IP / UDP 185.220.101.38:domain > 192.168.1.1:domain / Raw
--------------------------------------------------
[IP LAYER] Source: 185.220.101.38 -> Destination: 192.168.1.1
[TRANSPORT LAYER] Protocol: UDP | Src Port: 53 -> Dst Port: 53
[APPLICATION PAYLOAD] Raw Data: 'UNSECURED_DATAFEED LEAK'

==================================================
Analysis Task Complete. Sniffer engine stopped.`,
      },
      {
        type: 'note',
        items: [
          'The second packet is the point of the exercise: a payload reading UNSECURED_DATAFEED LEAK is visible in plaintext because it was never encrypted — exactly the "threats in transit" problem from section 15.',
          'Sniffing traffic requires administrator/root privileges because it puts the network interface into promiscuous mode. Only ever run this on a network you are authorised to monitor.',
        ],
      },
    ],
  },

  {
    number: '16',
    title: 'Practical 7: Creating a Web Scraper to Gather Data from Websites',
    sections: [
      {
        type: 'bullets',
        heading: 'Objective',
        items: [
          'Scrape data from a web page',
          'Extract and save specific resources from the web page',
        ],
      },
      {
        type: 'code',
        heading: 'Program Listing',
        language: 'python',
        code: String.raw`import os
import requests

def download_pdf(url, output_filename):
    print(f'Connecting to: {url}...')
    # Send an HTTP request to the URL
    response = requests.get(url, stream=True)
    # Check if the request was successful
    if response.status_code == 200:
        # Verify if the content type is actually a PDF
        if 'application/pdf' in response.headers.get('Content-Type', ""):
            # Open a local file in 'write binary' (wb) mode
            with open(output_filename, 'wb') as pdf_file:
                for chunk in response.iter_content(chunk_size=8192):
                    pdf_file.write(chunk)
            print(f'Success! PDF successfully downloaded and saved as: \'{output_filename}\'')
        else:
            print("Warning: The URL did not point to a valid PDF file.")
    else:
        print(f"Failed to retrieve the file. Status code: {response.status_code}")

if __name__ == "__main__":
    target_url = "https://www.iitmgoi.in/download/Information_Technology/Lab_Manual/8th_sem/Information_Security.pdf"
    output_name = "Information_Security_Manual.pdf"
    download_pdf(target_url, output_name)`,
      },
      {
        type: 'text',
        heading: 'Expected Output',
        text: 'Not run here: this practical downloads a PDF over the public internet, which was blocked in the environment the outputs were verified in. On a connected machine it prints the connection URL, then either a success line with the saved filename, or an error if the Content-Type is not application/pdf.',
      },
      {
        type: 'note',
        items: [
          'The objective in the manual mentions BeautifulSoup, but the listing given does not use it — it is a straight HTTP file download with requests. No HTML parsing takes place.',
          'stream=True plus iter_content is the right pattern for large files: it writes the response in 8 KB chunks instead of loading the whole PDF into memory first.',
        ],
      },
    ],
  },

  {
    number: '17',
    title: 'Practical 8: Simple Penetration Testing Tasks',
    covers: [8],
    partial: [2],
    sections: [
      {
        type: 'bullets',
        heading: 'Objective — Part A: Port Scanner',
        items: [
          'Create a simple port scanner using Python',
          'Scan a target host to identify open ports',
        ],
      },
      {
        type: 'code',
        heading: 'Program Listing — Port Scanner',
        language: 'python',
        code: String.raw`import socket

def scan_port(ip, port):
    """Scans a single TCP port on the target IP address."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)  # Timeout of 1 second
            result = s.connect_ex((ip, port))
            return result == 0
    except socket.error:
        return False

def port_scanner(target_ip, port_range):
    """Loops through the specified range of ports and prints open ones."""
    print(f"Starting scan on host: {target_ip}")
    for port in range(*port_range):
        if scan_port(target_ip, port):
            print(f"Port {port} is open")

if __name__ == "__main__":
    # Replace with the target IP address you have permission to scan
    target_ip = "192.168.1.1"
    # Scanning the first 1024 ports (1 to 1025 non-inclusive)
    port_range = (1, 1025)
    port_scanner(target_ip, port_range)`,
      },
      {
        type: 'text',
        heading: 'Verified Output — Port Scanner',
        text: 'Scanned against 127.0.0.1 with listeners opened on ports 8080, 8443 and 9000, since the original target 192.168.1.1 was not reachable from the verification environment.',
      },
      {
        type: 'code',
        language: 'output',
        code: String.raw`Starting scan on host: 127.0.0.1
Port 8080 is open
Port 8443 is open
Port 9000 is open`,
      },
      {
        type: 'note',
        items: [
          'Port scanning a host you do not own or have written permission to test is unlawful in most jurisdictions, including under Nigeria’s Cybercrimes Act. The comment in the listing — "the target IP address you have permission to scan" — is the operative instruction, not a formality.',
          'connect_ex returns an error code rather than raising, so a return value of 0 means the TCP handshake completed and the port is open.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Part B: VirusTotal URL Check',
        prompt: 'You are a Security Analyst investigating a phishing alert. A user received an email containing a suspicious link (http://malicious-example.com). Instead of visiting the link manually, you decide to programmatically query the VirusTotal API v2 to check whether any security vendors have already flagged it as a threat.',
      },
      {
        type: 'code',
        heading: 'Program Listing — VirusTotal Check',
        language: 'python',
        code: String.raw`import requests

# Function to check a URL using the VirusTotal API v2
def check_url_virustotal(api_key, url):
    url_report_endpoint = 'https://www.virustotal.com/vtapi/v2/url/report'
    params = {'apikey': api_key, 'resource': url}
    try:
        response = requests.get(url_report_endpoint, params=params)
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 204:
            print("API Limit reached! (VirusTotal public API allows 4 requests/min)")
            return None
        else:
            print(f'Failed to query VirusTotal. Status code: {response.status_code}')
            return None
    except requests.exceptions.RequestException as e:
        print(f"Network error: {e}")
        return None

# Main Execution
if __name__ == "__main__":
    # Standard placeholder for API Key
    MY_API_KEY = "YOUR_VIRUSTOTAL_API_KEY"
    suspicious_url = "http://malicious-example.com"
    result = check_url_virustotal(MY_API_KEY, suspicious_url)
    if result:
        # Check if the URL is registered in the database (response_code == 1)
        if result.get('response_code') == 1:
            positives = result.get('positives', 0)
            total = result.get('total', 0)
            if positives > 0:
                print(f"\nALERT: URL '{suspicious_url}' detected as potentially malicious!")
                print(f"Security Detection Ratio: {positives}/{total} vendors flagged it.")
            else:
                print(f"\nURL '{suspicious_url}' appears to be clean (0/{total} flags).")
        else:
            print(f"\nURL '{suspicious_url}' was not found in VirusTotal's database. It might be unindexed.")`,
      },
      {
        type: 'text',
        heading: 'Expected Output — VirusTotal Check',
        text: 'Not run here: this requires a personal VirusTotal API key. With a valid key it prints the URL’s detection ratio — how many of the scanning engines flagged the target as malicious out of the total that examined it — or reports that the URL is not in VirusTotal’s database.',
      },
      {
        type: 'note',
        items: [
          'Never commit an API key into a script you share or submit. Read it from an environment variable instead — os.environ["VT_API_KEY"] — and keep the key out of version control.',
          'The public VirusTotal API is limited to 4 requests per minute, which is why the listing handles HTTP 204 separately from other failures.',
        ],
      },
    ],
  },

  {
    number: '18',
    title: 'Practical 9: Scripts for Basic Static Malware Analysis',
    covers: [2],
    sections: [
      {
        type: 'bullets',
        heading: 'Objective',
        items: [
          'Perform basic static analysis on files to identify potential malware',
          'Calculate file hashes, extract strings, and analyse file headers',
        ],
      },
      {
        type: 'text',
        heading: 'Prerequisites',
        text: 'Before you begin you may need to install additional libraries, such as pefile for PE file analysis. hashlib is part of the Python standard library.',
      },
      {
        type: 'code',
        heading: 'Program Listing',
        language: 'python',
        code: String.raw`import hashlib
import re
import sys
import pefile

# Function to calculate a file's hash
def calculate_hash(filename):
    hasher = hashlib.sha256()
    try:
        with open(filename, 'rb') as file:
            buf = file.read()
            hasher.update(buf)
            return hasher.hexdigest()
    except FileNotFoundError:
        print(f"Error: The file '{filename}' was not found.")
        sys.exit(1)

# Function to extract printable strings from the file (ASCII sequences of 4 characters or more)
def extract_strings(filename):
    with open(filename, 'rb') as file:
        content = file.read()
        # Find all printable sequences
        strings = re.findall(b'[\x20-\x7E]{4,}', content)
        return [s.decode('utf-8', errors='ignore') for s in strings]

# Function to analyze PE file headers
def analyze_pe_file(filename):
    try:
        pe = pefile.PE(filename)
        # We slice dump_info() output because the full dump can be thousands of lines long
        return True, pe.dump_info()[:800]
    except pefile.PEFormatError:
        return False, "Result: Not a valid Windows PE file (or it is a different format like ELF/Mach-O)."

# Main Execution
if __name__ == "__main__":
    # Check if a filename was provided via command-line arguments
    if len(sys.argv) < 2:
        print("Usage error: You must provide a file path.")
        print("Example: python get_info.py sample.exe")
        sys.exit(1)
    target_filename = sys.argv[1]
    print(f'Analyzing file: {target_filename}')
    print("-" * 50)
    # 1. Calculate Hash
    print("[+] Calculating file hash...")
    file_hash = calculate_hash(target_filename)
    print(f"SHA-256 Hash: {file_hash}\n")
    # 2. Extract Strings
    print("[+] Extracting strings...")
    extracted_strings = extract_strings(target_filename)
    print(f"Extracted strings (showing first 5): {extracted_strings[:5]}...\n")
    # 3. Analyze PE Headers
    print("[+] Analyzing PE file headers...")
    is_pe, pe_info = analyze_pe_file(target_filename)
    print(pe_info)`,
      },
      {
        type: 'text',
        heading: 'Verified Output',
        text: 'Run against a minimal PE32 sample; the header dump is truncated.',
      },
      {
        type: 'code',
        language: 'output',
        code: String.raw`Analyzing file: sample.exe
--------------------------------------------------
[+] Calculating file hash...
SHA-256 Hash: 7c8ee5fbd7d4fa66608609319e2af64322b214f065c754f30b938017654a21f0

[+] Extracting strings...
Extracted strings (showing first 5): ['.text', 'SampleMalwareString', 'CreateRemoteThread', 'kernel32.dll', 'VirtualAllocEx']...

[+] Analyzing PE file headers...
----------Parsing Warnings----------
Byte 0x00 makes up 89.6484% of the file's contents. This may indicate truncation / malformation.
----------DOS_HEADER----------`,
      },
      {
        type: 'note',
        items: [
          'Static analysis means examining a file without executing it — the safe first step with a suspect sample.',
          'The extracted strings are the real signal here: CreateRemoteThread and VirtualAllocEx together are the classic API pair for injecting code into another running process, which is why they stand out in a sample.',
        ],
      },
    ],
  },

  {
    number: '19',
    title: 'Practical 10: Intrusion Detection and Traffic Monitoring',
    covers: [8],
    partial: [2],
    sections: [
      {
        type: 'casestudy',
        title: 'Scenario',
        prompt: 'You are a Security Engineer safeguarding a legacy internal intranet dashboard at 192.168.1.1. To guard against basic denial-of-service conditions, where a machine rapidly spams the web host, you run this Python utility. During the 20-second monitoring window an employee computer (192.168.1.45) behaves normally, but a misconfigured automation bot script on another device (192.168.1.99) goes haywire and floods the server with over 120 rapid page requests.',
      },
      {
        type: 'text',
        heading: 'Corrected Program Listing',
        text: 'The listing below is corrected: the scan of the original lost all indentation and mis-read several identifiers (ip_sre, tep_dport, TARGET _IP, THRESHOLD REQUESTS), as well as the __main__ guard and two print statements.',
      },
      {
        type: 'code',
        language: 'python',
        code: String.raw`from scapy.all import sniff, IP, TCP
from collections import Counter
import sys

# Configuration
MONITOR_DURATION = 20        # Time in seconds to capture traffic
THRESHOLD_REQUESTS = 50      # Trigger alert if a single IP sends more than this many requests
TARGET_IP = "192.168.1.1"    # The IP of the server we are protecting

# Global counter to track incoming packets by their source IP
request_counter = Counter()

# Packet processing function called for every packet captured
def process_packet(packet):
    # Safely verify the packet contains both Network (IP) and Transport (TCP) layers
    if packet.haslayer(IP) and packet.haslayer(TCP):
        ip_src = packet[IP].src
        ip_dst = packet[IP].dst
        tcp_dport = packet[TCP].dport
        # Check if the traffic is destined for our target server on standard HTTP port 80
        if ip_dst == TARGET_IP and tcp_dport == 80:
            request_counter[ip_src] += 1

# Intrusion Detection Function
def detect_intrusion():
    print(f"[*] Initializing IDS... Monitoring traffic to {TARGET_IP} on Port 80.")
    print(f"[*] Capturing packets for {MONITOR_DURATION} seconds...")
    print("-" * 60)
    try:
        # Sniff network packets using the callback function
        sniff(prn=process_packet, timeout=MONITOR_DURATION, store=False)
    except PermissionError:
        print("\n[!] Execution Error: Scapy requires administrator/root privileges "
              "to sniff raw network packets")
        print("    Try running with 'sudo python script.py' on Linux/macOS.")
        sys.exit(1)
    print("\n[*] Monitoring period complete. Analyzing traffic patterns...")
    print("-" * 60)
    alert_triggered = False
    # Evaluate collected data against our threshold limits
    for ip, count in request_counter.items():
        if count > THRESHOLD_REQUESTS:
            print(f"[ALERT] Potential DoS / Intrusion detected from Source IP: {ip}")
            print(f"        Total requests received: {count} "
                  f"(Threshold: {THRESHOLD_REQUESTS})")
            alert_triggered = True
    if not alert_triggered:
        print("[*] Analysis complete. No malicious request patterns or "
              "thresholds exceeded.")

# Main Execution
if __name__ == "__main__":
    detect_intrusion()`,
      },
      {
        type: 'text',
        heading: 'Verified Output',
        text: 'Raw capture requires root, so the detection logic was exercised against the scenario in the brief — 12 requests from 192.168.1.45 and 124 from 192.168.1.99.',
      },
      {
        type: 'code',
        language: 'output',
        code: String.raw`[*] Initializing IDS... Monitoring traffic to 192.168.1.1 on Port 80.
[*] Capturing packets for 20 seconds...
------------------------------------------------------------

[*] Monitoring period complete. Analyzing traffic patterns...
------------------------------------------------------------
[ALERT] Potential DoS / Intrusion detected from Source IP: 192.168.1.99
        Total requests received: 124 (Threshold: 50)`,
      },
      {
        type: 'note',
        items: [
          'The employee machine at 192.168.1.45 sent 12 requests, well under the threshold of 50, so it never appears in the output — the detector only reports what crosses the line.',
          'This is a threshold-based IDS, the simplest kind. It cannot tell a misconfigured bot from a deliberate attacker, and a slow attack that stays under 50 requests would pass unnoticed.',
        ],
      },
    ],
  },

  {
    number: '20',
    title: 'Practical 11: Threat Detection',
    partial: [2],
    sections: [
      {
        type: 'text',
        heading: 'Exercise',
        text: 'Complete the function that reads an IP address from a file, queries a threat-intelligence API about it, and returns the complete threat information. The API is mocked in the setup section so the exercise runs without a network connection or an API key.',
      },
      {
        type: 'text',
        heading: 'Corrected Program Listing',
        text: 'The listing below is corrected: the scan of the original lost all indentation and dropped part of the mock response class and the body of the POST request.',
      },
      {
        type: 'code',
        language: 'python',
        code: String.raw`import json
import requests

# --- Setup for Simulation (You do not need to modify this) ---
# Create a dummy file containing the IP address
with open("ip_to_check.txt", "w") as f:
    f.write("185.220.101.38\n")

# Mock server class to simulate the API response
class MockResponse:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data

# This mock function simulates the API's logic
def mock_api_call(url, json=None):
    prompt_text = json.get("prompt", "")
    # Mock data includes the country field
    if "185.220.101.38" in prompt_text:
        response_data = {
            "ip": "185.220.101.38",
            "risk_level": "high",
            "country": "Germany",
            "reason": "Associated with C2 servers.",
        }
    else:
        response_data = {
            "ip": "unknown",
            "risk_level": "low",
            "country": "Unknown",
            "reason": "No threat data found.",
        }
    return MockResponse(response_data, 200)

# Replace the real requests.post with our mock for this exercise
requests.post = mock_api_call

# --- Your Function to Implement ---
def check_ip_threat_details(filename, api_url):
    """Reads an IP from a file, queries an LLM API, and returns complete
    threat information."""
    # 1. Read the IP address from the file and strip whitespace.
    with open(filename, "r") as f:
        ip_address = f.read().strip()
    # 2. Create a prompt for the LLM.
    prompt = f"Analyze this IP address for security threats: {ip_address}"
    # 3. Prepare the JSON payload for the API request.
    payload = {"prompt": prompt}
    # 4. Make the POST request and get the JSON response.
    response = requests.post(api_url, json=payload)
    response_data = response.json()
    # Extract all relevant data points from the mock API response
    is_high_risk = response_data.get("risk_level") == "high"
    country = response_data.get("country", "Unknown")
    reason = response_data.get("reason", "No reason provided.")
    return ip_address, is_high_risk, country, reason

# --- Example Usage ---
api_endpoint = "https://api.threat-intel-llm.com/v1/enrich"
ip, is_high_risk, country, threat_reason = check_ip_threat_details(
    "ip_to_check.txt", api_endpoint
)

print("=== THREAT DETECTION REPORT ===")
print(f"Target IP Address   : {ip}")
print(f"Origin Country      : {country}")
print(f"Is High-Risk Threat?: {is_high_risk}")
print(f"Threat Flag Details : {threat_reason}")`,
      },
      {
        type: 'code',
        heading: 'Verified Output',
        language: 'output',
        code: String.raw`=== THREAT DETECTION REPORT ===
Target IP Address   : 185.220.101.38
Origin Country      : Germany
Is High-Risk Threat?: True
Threat Flag Details : Associated with C2 servers.`,
      },
      {
        type: 'note',
        items: [
          'C2 stands for "command and control" — the servers an attacker uses to issue instructions to compromised machines. An IP associated with C2 infrastructure is a strong indicator of compromise.',
          'Note the shadowing in mock_api_call: the parameter is named json, which hides the imported json module inside that function. It works here only because the module is never used inside it.',
        ],
      },
    ],
  },

  {
    number: '21',
    title: 'Practical 12: Firewall Screening of Incoming and Outgoing Packets',
    covers: [3, 8],
    sections: [
      {
        type: 'bullets',
        heading: 'Questions This Program Answers',
        items: [
          'What is my machine’s current local IP address? It dynamically checks the active network path to see exactly what address your computer uses to speak to the local network (e.g. 192.168.1.45).',
          'Is data moving inward or outward? By comparing packet source and destination IPs against your local IP, it identifies whether a packet is INCOMING (sent to you), OUTGOING (sent by you), or FORWARDED (routed through you).',
          'What applications are creating my network traffic? Instead of showing raw port numbers, it translates standard ports into human-readable application types such as HTTPS (Secure Web), HTTP (Unencrypted Web), or DNS (Domain Lookups).',
          'How much cumulative data volume has my machine processed? It keeps a running tally of every byte crossing your network card, and outputs an audited data snapshot in kilobytes after every 10 packets.',
          'Am I communicating with a specific flagged or restricted IP address? It acts as a mini intrusion detection system: if any packet touches a designated address (such as 8.8.8.8), it tags that log entry with a bright [!!! SECURITY ALERT !!!] warning.',
        ],
      },
      {
        type: 'text',
        heading: 'Suggested Solution',
        text: 'The manual states the problem above and instructs "write Python code to address the above problem", but gives no listing. The program below answers all five questions. It is a suggested solution, not part of the original manual.',
      },
      {
        type: 'code',
        language: 'python',
        code: String.raw`"""Firewall Screening: Incoming and Outgoing Packets.

Answers the five questions posed in the manual:
  1. What is my machine's current local IP address?
  2. Is data moving inward or outward?
  3. What applications are creating my network traffic?
  4. How much cumulative data volume has my machine processed?
  5. Am I communicating with a specific flagged or restricted IP address?
"""
# pip install scapy
import socket
from scapy.all import sniff, IP, TCP, UDP, Ether

# --- Configuration -------------------------------------------------------
FLAGGED_IPS = {"8.8.8.8", "185.220.101.38"}   # restricted / watch-list addresses
REPORT_EVERY = 10                             # print a data snapshot every N packets

# Well-known ports mapped to human-readable application types
PORT_MAP = {
    20: "FTP-Data", 21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP",
    53: "DNS (Domain Lookups)", 67: "DHCP", 68: "DHCP", 80: "HTTP (Unencrypted Web)",
    110: "POP3", 143: "IMAP", 443: "HTTPS (Secure Web)", 445: "SMB",
    3389: "RDP", 3306: "MySQL", 8080: "HTTP-Alt",
}

# Running totals
stats = {"packets": 0, "bytes": 0, "in": 0, "out": 0, "fwd": 0, "alerts": 0}

# --- Question 1: what is my local IP address? ---------------------------
def get_local_ip():
    """Determine the address this machine uses to reach the local network."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))      # no data is sent; just selects a route
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()

LOCAL_IP = get_local_ip()

# --- Question 3: which application does a port belong to? ---------------
def identify_application(pkt):
    if pkt.haslayer(TCP):
        proto, sport, dport = "TCP", pkt[TCP].sport, pkt[TCP].dport
    elif pkt.haslayer(UDP):
        proto, sport, dport = "UDP", pkt[UDP].sport, pkt[UDP].dport
    else:
        return pkt[IP].proto and "Other IP protocol", None, None
    app = PORT_MAP.get(dport) or PORT_MAP.get(sport) or f"Unknown ({proto} {dport})"
    return app, sport, dport

# --- Question 2: direction of travel ------------------------------------
def classify_direction(src, dst):
    if dst == LOCAL_IP:
        stats["in"] += 1
        return "INCOMING"
    if src == LOCAL_IP:
        stats["out"] += 1
        return "OUTGOING"
    stats["fwd"] += 1
    return "FORWARDED"

def screen_packet(pkt):
    if not pkt.haslayer(IP):
        return
    src, dst = pkt[IP].src, pkt[IP].dst
    size = len(pkt)
    stats["packets"] += 1
    stats["bytes"] += size
    direction = classify_direction(src, dst)
    app, sport, dport = identify_application(pkt)
    line = (f"[{direction:<10}] {src:>15} -> {dst:<15} "
            f"| {app:<24} | {size:>5} bytes")
    # --- Question 5: is a flagged address involved? ---
    if src in FLAGGED_IPS or dst in FLAGGED_IPS:
        stats["alerts"] += 1
        line += "   [!!! SECURITY ALERT !!!]"
    print(line)
    # --- Question 4: cumulative data volume ---
    if stats["packets"] % REPORT_EVERY == 0:
        print(f"    ---- DATA SNAPSHOT: {stats['packets']} packets, "
              f"{stats['bytes'] / 1024:.2f} KB processed ----")

def summary():
    print("-" * 78)
    print(f"Local IP address        : {LOCAL_IP}")
    print(f"Total packets screened  : {stats['packets']}")
    print(f"  Incoming / Outgoing   : {stats['in']} / {stats['out']}"
          f"  (forwarded: {stats['fwd']})")
    print(f"Total volume processed  : {stats['bytes'] / 1024:.2f} KB")
    print(f"Security alerts raised  : {stats['alerts']}")
    print("-" * 78)

def simulated_traffic():
    """Synthetic packets so the screening logic can be demonstrated without
    root privileges or a live network interface."""
    return [
        Ether() / IP(src=LOCAL_IP, dst="142.250.185.14") / TCP(sport=51544, dport=443) / (b"x" * 460),
        Ether() / IP(src="142.250.185.14", dst=LOCAL_IP) / TCP(sport=443, dport=51544) / (b"x" * 1400),
        Ether() / IP(src=LOCAL_IP, dst="8.8.8.8") / UDP(sport=57333, dport=53) / (b"x" * 40),
        Ether() / IP(src="8.8.8.8", dst=LOCAL_IP) / UDP(sport=53, dport=57333) / (b"x" * 96),
        Ether() / IP(src=LOCAL_IP, dst="93.184.216.34") / TCP(sport=51600, dport=80) / (b"x" * 320),
        Ether() / IP(src="93.184.216.34", dst=LOCAL_IP) / TCP(sport=80, dport=51600) / (b"x" * 1180),
        Ether() / IP(src="192.168.1.77", dst=LOCAL_IP) / TCP(sport=49888, dport=22) / (b"x" * 120),
        Ether() / IP(src=LOCAL_IP, dst="192.168.1.77") / TCP(sport=22, dport=49888) / (b"x" * 200),
        Ether() / IP(src="192.168.1.20", dst="192.168.1.30") / TCP(sport=50100, dport=445) / (b"x" * 640),
        Ether() / IP(src="185.220.101.38", dst=LOCAL_IP) / TCP(sport=6667, dport=51999) / (b"x" * 512),
    ]

if __name__ == "__main__":
    print("=" * 78)
    print("FIREWALL SCREENING - INCOMING AND OUTGOING PACKETS")
    print("=" * 78)
    print(f"[*] This machine's local IP address: {LOCAL_IP}")
    print(f"[*] Watch-list addresses: {', '.join(sorted(FLAGGED_IPS))}")
    print("-" * 78)
    try:
        sniff(prn=screen_packet, count=20, timeout=15, store=False)
        if stats["packets"] == 0:
            raise PermissionError("no packets captured")
    except (PermissionError, OSError) as exc:
        print(f"[!] Live capture unavailable ({exc}).")
        print("[*] Falling back to simulated traffic so the logic can be demonstrated.")
        print("-" * 78)
        for pkt in simulated_traffic():
            screen_packet(pkt)
    summary()`,
      },
      {
        type: 'text',
        heading: 'Verified Output',
        text: 'Live capture requires root, so the script fell back to its built-in simulated traffic. On a real machine the local IP would be the address of your network card (e.g. 192.168.1.45) rather than 127.0.0.1.',
      },
      {
        type: 'code',
        language: 'output',
        code: String.raw`==============================================================================
FIREWALL SCREENING - INCOMING AND OUTGOING PACKETS
==============================================================================
[*] This machine's local IP address: 127.0.0.1
[*] Watch-list addresses: 185.220.101.38, 8.8.8.8
------------------------------------------------------------------------------
[!] Live capture unavailable ([Errno 1] Operation not permitted).
[*] Falling back to simulated traffic so the logic can be demonstrated.
------------------------------------------------------------------------------
[OUTGOING  ]       127.0.0.1 -> 142.250.185.14  | HTTPS (Secure Web)       |   514 bytes
[INCOMING  ]  142.250.185.14 -> 127.0.0.1       | HTTPS (Secure Web)       |  1454 bytes
[OUTGOING  ]       127.0.0.1 -> 8.8.8.8         | DNS (Domain Lookups)     |    82 bytes   [!!! SECURITY ALERT !!!]
[INCOMING  ]         8.8.8.8 -> 127.0.0.1       | DNS (Domain Lookups)     |   138 bytes   [!!! SECURITY ALERT !!!]
[OUTGOING  ]       127.0.0.1 -> 93.184.216.34   | HTTP (Unencrypted Web)   |   374 bytes
[INCOMING  ]   93.184.216.34 -> 127.0.0.1       | HTTP (Unencrypted Web)   |  1234 bytes
[INCOMING  ]    192.168.1.77 -> 127.0.0.1       | SSH                      |   174 bytes
[OUTGOING  ]       127.0.0.1 -> 192.168.1.77    | SSH                      |   254 bytes
[FORWARDED ]    192.168.1.20 -> 192.168.1.30    | SMB                      |   694 bytes
[INCOMING  ]  185.220.101.38 -> 127.0.0.1       | Unknown (TCP 51999)      |   566 bytes   [!!! SECURITY ALERT !!!]
    ---- DATA SNAPSHOT: 10 packets, 5.36 KB processed ----
------------------------------------------------------------------------------
Local IP address        : 127.0.0.1
Total packets screened  : 10
  Incoming / Outgoing   : 5 / 4  (forwarded: 1)
Total volume processed  : 5.36 KB
Security alerts raised  : 3
------------------------------------------------------------------------------`,
      },
      {
        type: 'note',
        items: [
          'This is a screening firewall in the sense of section 10: it inspects source, destination, port and direction, and applies a policy. It only logs rather than blocking, which makes it a monitor rather than an enforcement point.',
          'The last simulated packet is the interesting one — inbound from a watch-listed address to a high port with no recognised service, which is the shape a command-and-control callback takes.',
        ],
      },
    ],
  },
];
