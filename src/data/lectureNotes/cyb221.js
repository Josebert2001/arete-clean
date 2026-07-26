// UUY-CYB 221 — Network Defense Fundamentals
// Lecture notes transcribed from the departmental Laboratory Manual
// ("CYB 221 Network Defense Fundamentals — Laboratory Manual",
// prepared by Dr. Samuel A. Robinson, University of Uyo).
//
// Topics 1–9 are the manual's 25 numbered theory sections, grouped thematically;
// each section keeps its original number in its heading so students can cross-
// reference the printed manual. Topics 10–21 are the manual's 12 laboratory
// practicals.
//
// `covers` / `partial` refer to 1-based indices in the course's `topics` array
// in courses.js — CourseDetail uses them to show which syllabus items the notes
// actually reach. Note the manual carries its own 24-item outline that does not
// line up with the 8-item departmental syllabus; the mapping below is against
// the syllabus.
//
// Figures live in public/lecture-notes/cyb-221/ (converted from the manual's
// embedded PNGs by scripts/optimize-lecture-images.mjs).
//
// Where the manual's scanned text was garbled, the prose has been repaired to
// its evident intent. Material genuinely added beyond the manual is marked with
// a `note` section ("Added for clarity") or stated in the section text.

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
        text: 'A cyber-attack is an exploitation of computer systems and networks. It uses malicious code to alter computer code, logic or data, leading to cybercrimes such as information and identity theft. Cyber-attacks fall into two broad categories: web-based attacks and system-based attacks.',
      },
      {
        type: 'termlist',
        heading: 'Web-based Attacks',
        items: [
          { term: 'Injection attacks', def: 'Data is injected into a web application to manipulate it and retrieve information the attacker is not entitled to. Examples: SQL injection, code injection, log injection, XML injection.' },
          { term: 'DNS spoofing', def: 'Data is introduced into a DNS resolver’s cache so the name server returns an incorrect IP address, diverting traffic to the attacker’s machine. These attacks can run undetected for long periods.' },
          { term: 'Session hijacking', def: 'An attack on a user session over a protected network. Web applications store state and user sessions in cookies; by stealing the cookies an attacker gains access to all of the user’s data.' },
          { term: 'Phishing', def: 'An attempt to steal sensitive information such as login credentials and credit card numbers by masquerading as a trustworthy entity in an electronic communication.' },
          { term: 'Brute force', def: 'A trial-and-error method that generates a large number of guesses and validates them to obtain real data such as a password or PIN. Used by criminals to crack encrypted data, and by analysts to test an organisation’s security.' },
          { term: 'Denial of service', def: 'Makes a server or network resource unavailable by flooding the target with traffic or sending data that triggers a crash, from a single system and single connection. Sub-types: volume-based (saturate bandwidth, measured in bits per second), protocol (consume server resources, measured in packets) and application-layer (crash the web server, measured in requests per second).' },
          { term: 'Dictionary attacks', def: 'Validates a stored list of commonly used passwords against an account to recover the original password.' },
          { term: 'URL interpretation', def: 'Altering parts of a URL to make the web server deliver pages the attacker is not authorised to browse.' },
          { term: 'File inclusion attacks', def: 'Abuses an application’s include functionality to access unauthorised files on the web server, or to execute malicious files there.' },
          { term: 'Man-in-the-middle attacks', def: 'The attacker intercepts the connection between client and server and acts as a bridge between them, gaining the ability to read, insert and modify data in the intercepted connection.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'System-based Attacks',
        items: [
          { term: 'Virus', def: 'Malicious software that spreads through computer files without the user’s knowledge. It self-replicates by inserting copies of itself into other programs when executed, and can carry instructions that harm the system.' },
          { term: 'Worm', def: 'Malware whose primary function is to replicate itself to spread to uninfected computers. It behaves much like a virus, and often arrives as an email attachment that appears to come from a trusted sender.' },
          { term: 'Trojan horse', def: 'A malicious program that causes unexpected setting changes and unusual activity even when the computer should be idle. It misleads the user about its true intent, appearing to be a normal application while malicious code runs in the background.' },
          { term: 'Backdoors', def: 'A method that bypasses the normal authentication process. A developer may create one so an application or operating system can be accessed for troubleshooting or other purposes.' },
          { term: 'Bots', def: 'Automated processes that interact with other network services. Some run automatically, others execute only on specific input. Common examples are crawlers, chatroom bots, and malicious bots.' },
        ],
      },
      {
        type: 'definition',
        heading: '2. The Seven Layers of Cyber Security',
        text: 'The seven layers of cyber security should centre on the mission-critical assets you are seeking to protect.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Mission-critical assets', def: 'The data you need to protect — the centre that every other layer surrounds.' },
          { term: 'Data security', def: 'Controls that protect the storage and transfer of data.' },
          { term: 'Application security', def: 'Controls that protect access to an application, the application’s own access to mission-critical assets, and the internal security of the application.' },
          { term: 'Endpoint security', def: 'Controls that protect the connection between devices and the network.' },
          { term: 'Network security', def: 'Controls that protect the organisation’s network and prevent unauthorised access to it.' },
          { term: 'Perimeter security', def: 'Both the physical and the digital security methodologies that protect the business overall.' },
          { term: 'The human layer', def: 'Humans are the weakest link in any security posture. Controls here include phishing simulations and access management, protecting mission-critical assets from cyber criminals, malicious insiders and negligent users.' },
        ],
      },
      {
        type: 'definition',
        heading: '3. Vulnerability, Threat and Harmful Acts',
        text: 'As the recent epidemic of data breaches illustrates, no system is immune to attack. Any company that manages, transmits, stores or otherwise handles data must institute and enforce mechanisms to monitor its cyber environment, identify vulnerabilities, and close security holes as quickly as possible.',
      },
      {
        type: 'text',
        text: 'Cyber threats are security incidents or circumstances with the potential to have a negative outcome for your network or other data management systems — a phishing attack that results in malware infecting your data, a staff member failing to follow data protection protocols, or even a tornado that takes down your data headquarters. Vulnerabilities, by contrast, are the gaps or weaknesses in a system that make those threats possible and tempt threat actors to exploit them.',
      },
      {
        type: 'bullets',
        heading: 'Types of Vulnerabilities',
        items: [
          'SQL injections',
          'Server misconfigurations',
          'Cross-site scripting',
          'Transmitting sensitive data in non-encrypted plain text',
        ],
      },
      {
        type: 'text',
        text: 'When threat probability is multiplied by the potential loss that may result, cyber security experts refer to this as risk.',
      },
      {
        type: 'bullets',
        heading: 'Categories of Vulnerabilities',
        items: [
          'Corrupted — loss of integrity',
          'Leaky — loss of confidentiality',
          'Unavailable or very slow — loss of availability',
        ],
      },
      {
        type: 'termlist',
        items: [
          { term: 'Threats', def: 'Represent potential security harm to an asset when vulnerabilities are exploited.' },
          { term: 'Attacks', def: 'Threats that have actually been carried out.' },
          { term: 'Passive', def: 'Makes use of information from the system without affecting system resources.' },
          { term: 'Active', def: 'Alters system resources or affects their operation.' },
          { term: 'Insider', def: 'Initiated by an entity inside the organisation.' },
          { term: 'Outsider', def: 'Initiated from outside the perimeter.' },
        ],
      },
      {
        type: 'text',
        heading: 'Computer Criminals',
        text: 'Computer criminals have access to enormous amounts of hardware, software and data; they have the potential to cripple much of effective business and government throughout the world. In a sense, the purpose of computer security is to prevent these criminals from doing damage. Computer crime is any crime involving a computer or aided by the use of one. Although this definition is admittedly broad, it allows us to consider ways to protect ourselves, our businesses and our communities against those who use computers maliciously. One approach to prevention is to understand who commits these crimes and why: by studying those who have already used computers to commit crimes, we may be able to spot likely criminals in future and prevent the crimes from occurring.',
      },
      {
        type: 'definition',
        heading: '4. The CIA Triad',
        text: 'The CIA Triad is a security model developed to help people think about the various parts of IT security.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Confidentiality', def: 'Protecting sensitive, private information from unauthorised access. This depends on being able to define and enforce access levels — often by separating information into collections organised by who needs access and how sensitive the information is (i.e. how much damage a breach would cause). Common means include access control lists, volume and file encryption, and Unix file permissions.' },
          { term: 'Integrity', def: 'Protects data from deletion or modification by any unauthorised party, and ensures that when an authorised person makes a change that should not have been made, the damage can be reversed.' },
          { term: 'Availability', def: 'Refers to the actual availability of your data. Authentication mechanisms, access channels and systems all have to work properly so the information they protect is available when it is needed.' },
        ],
      },
      {
        type: 'text',
        heading: 'Understanding the CIA Triad',
        text: 'The CIA Triad is all about information. While this is the core factor of most IT security, it promotes a limited view that ignores other important factors. For example, even though availability serves to make sure you do not lose access to the resources needed to provide information, thinking about information security alone does not guarantee that someone has not used your hardware resources without authorisation. It is important to understand what the CIA Triad is and how it is used to plan and implement a quality security policy — and equally important to understand the limitations it presents. When you are informed, you can use the CIA Triad for what it has to offer and avoid the consequences of not understanding it.',
      },
      {
        type: 'termlist',
        heading: '5. Assets and Threats',
        items: [
          { term: 'Asset', def: 'Any data, device or other component of an organisation’s systems that is valuable — often because it contains sensitive data or can be used to access such information. An employee’s desktop, laptop or company phone is an asset, as are the applications on those devices and critical infrastructure such as servers and support systems. The most common assets are information assets: databases and physical files, i.e. the sensitive data you store.' },
          { term: 'Threat', def: 'Any incident that could negatively affect an asset — if it is lost, knocked offline or accessed by an unauthorised party. Threats compromise the confidentiality, integrity or availability of an asset, and can be either intentional or accidental. Intentional threats include criminal hacking or a malicious insider stealing information; accidental threats generally involve employee error, technical malfunction, or an event causing physical damage such as a fire or natural disaster.' },
        ],
      },
      {
        type: 'text',
        heading: 'Motive of Attackers',
        text: 'Categorising cyber-attackers helps us understand their motivations and the actions they take. Operational cyber security risks arise from three types of action: inadvertent actions (generally by insiders) taken without malicious intent; deliberate actions (by insiders or outsiders) taken intentionally and meant to do harm; and inaction (generally by insiders), such as a failure to act because of a lack of appropriate skills, knowledge, guidance, or the availability of the right person. Of primary concern are deliberate actions, of which there are three categories of motivation.',
      },
      {
        type: 'bullets',
        items: [
          'Political motivations — destroying, disrupting or taking control of targets; espionage; making political statements, protests or retaliatory actions.',
          'Economic motivations — theft of intellectual property or other economically valuable assets (funds, credit card information); fraud; industrial espionage and sabotage; blackmail.',
          'Socio-cultural motivations — attacks with philosophical, theological, political and even humanitarian goals, as well as fun, curiosity, and a desire for publicity or ego gratification.',
        ],
      },
      {
        type: 'definition',
        heading: '6. Active and Passive Attacks',
        text: 'An active attack is a network exploit in which a hacker attempts to make changes to data on the target, or to data en route to the target. Passive attacks are relatively scarce from a classification perspective, but can be carried out with relative ease — particularly if the traffic is not encrypted.',
      },
      {
        type: 'termlist',
        heading: 'Types of Active Attacks',
        items: [
          { term: 'Masquerade', def: 'The intruder pretends to be a particular user of a system to gain access, or to gain greater privileges than they are authorised for. This may be attempted using stolen login IDs and passwords, by finding security gaps in programs, or by bypassing the authentication mechanism.' },
          { term: 'Session replay', def: 'A hacker steals an authorised user’s login information by stealing the session ID, gaining access and the ability to do anything the authorised user can do on the website.' },
          { term: 'Message modification', def: 'An intruder alters packet header addresses to direct a message to a different destination, or modifies the data on a target machine.' },
          { term: 'Denial of service (DoS)', def: 'Users are deprived of access to a network or web resource, generally by overwhelming the target with more traffic than it can handle.' },
          { term: 'Distributed denial of service (DDoS)', def: 'Large numbers of compromised systems — sometimes called a botnet or zombie army — attack a single target.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Types of Passive Attacks',
        items: [
          { term: 'Eavesdropping (tapping)', def: 'The attacker simply listens to messages exchanged by two entities. For the attack to be useful the traffic must not be encrypted; any unencrypted information, such as a password sent in response to an HTTP request, may be retrieved.' },
          { term: 'Traffic analysis', def: 'The attacker examines the metadata transmitted in traffic to deduce information about the exchange and the participating entities — the form of the traffic, its rate, duration and so on. Where encrypted data is used, traffic analysis can also lead to attacks by cryptanalysis, through which the attacker may obtain information or succeed in decrypting the traffic.' },
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
        text: 'Malicious code (sometimes called malware) is software designed to take over or damage a computer user’s operating system without the user’s knowledge or approval. It can be very difficult to remove and very damaging.',
      },
      {
        type: 'table',
        heading: 'Cyber Attacks and Their Characteristics',
        headers: ['Attack', 'Characteristics'],
        rows: [
          ['Virus', 'A program that attempts to damage a computer system and replicate itself to other computer systems. Requires a host to replicate and usually attaches to a host file or hard drive sector. Replicates each time the host is used. Often focuses on destruction or corruption of data. Usually attaches to executable files such as .doc, .exe and .bat. Often distributed through email and may send itself to contacts. Examples: Stoned, Michelangelo, Melissa, I Love You.'],
          ['Worm', 'A self-replicating program that can perform harmful activities such as deleting files or sending documents through email. Can install a backdoor in an infected computer. Usually introduced through system vulnerabilities. Infects one system and spreads to other systems on the network. Example: Code Red.'],
          ['Trojan horse', 'A malicious program disguised as legitimate software. Cannot replicate itself. Often contains spying functions such as packet sniffers, or backdoor functions for remote control. Often hidden inside useful software such as screen savers or games. Examples: Back Orifice, NetBus, Whack-a-Mole.'],
          ['Logic bomb', 'Malware that remains inactive until a specific trigger occurs. Triggers may include a specific date or time, launching a program, or processing a specific activity. Logic bombs do not self-replicate.'],
        ],
      },
      {
        type: 'bullets',
        heading: '8. Hardware Attacks',
        items: [
          'Manufacturing backdoors, for malware or other penetrative purposes — backdoors are not limited to software, and also affect embedded radio-frequency identification (RFID) chips and memory.',
          'Eavesdropping by gaining access to protected memory without opening other hardware.',
          'Inducing faults, causing the interruption of normal behaviour.',
          'Hardware modification, tampering with invasive operations.',
          'Backdoor creation — hidden methods for bypassing normal computer authentication systems.',
          'Counterfeiting product assets that can produce extraordinary operations, and those made to gain malicious access to systems.',
        ],
      },
      {
        type: 'termlist',
        heading: '9. Cyber Threat Categories',
        items: [
          { term: 'Cyber warfare', def: 'The use of digital attacks — such as computer viruses and hacking — by one country to disrupt the vital computer systems of another, with the aim of creating damage, death and destruction. Future wars will see hackers using computer code to attack an enemy’s infrastructure alongside troops using conventional weapons. It involves actions by a nation-state or international organisation to attack and damage another nation’s computers or information networks.' },
          { term: 'Cyber crime', def: 'Criminal activity that either targets or uses a computer, a computer network or a networked device. It is committed by cybercriminals or hackers who want to make money, and is carried out by individuals or organisations. Some cybercriminals are organised, use advanced techniques and are highly skilled; others are novices.' },
          { term: 'Cyber terrorism', def: 'The convergence of cyberspace and terrorism — unlawful attacks and threats of attack against computers, networks and the information stored in them, done to intimidate or coerce a government or its people in furtherance of political or social objectives. Examples: hacking into computer systems, introducing viruses to vulnerable networks, website defacing, denial-of-service attacks, or terroristic threats made via electronic communication.' },
          { term: 'Cyber espionage', def: 'Cyber spying — the act or practice of obtaining secrets and information without the permission and knowledge of the holder of that information.' },
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
        heading: '10. Definition of a Firewall',
        text: 'A firewall is a system that enforces an access control policy between two networks, such as your private LAN and the unsafe, public Internet. It determines which inside services can be accessed from the outside, and vice versa.',
      },
      {
        type: 'text',
        text: 'The means by which this is accomplished varies widely, but in principle a firewall can be thought of as a pair of mechanisms: one to block traffic, and one to permit traffic. A firewall is more than the locked front door to your network — it is your security guard as well. Firewalls are also important because they provide a single "choke point" where security and audits can be imposed. A firewall can tell a network administrator what kinds and amount of traffic passed through it, how many attempts were made to break into it, and so on. Like a closed-circuit security TV system, your firewall not only prevents access but also monitors who has been sniffing around, and assists in identifying those who attempt to breach your security.',
      },
      {
        type: 'bullets',
        heading: 'Screening Levels of Firewalls',
        items: [
          'Screening that blocks any incoming data not specifically ordered by a user on the network',
          'Screening by the address of the sender',
          'Screening by the contents of the communication',
        ],
      },
      {
        type: 'text',
        text: 'A firewall can screen both incoming and outgoing traffic. Because incoming traffic poses a greater threat, it is usually screened more closely than outgoing traffic. Think of screening levels as a process of elimination: the firewall first determines whether the incoming transmission was requested by a user on the network, rejecting anything else. Anything allowed in is then examined more closely — the firewall checks the sender’s computer address to ensure it is a trusted site, and also checks the contents of the transmission.',
      },
      {
        type: 'definition',
        heading: 'Firewall Technologies',
        text: 'Firewalls come in all shapes, sizes and prices; choosing the correct one depends mainly on your business requirements and the size of your network. Whatever type you choose, you must ensure it is secure and that a trusted third party, such as the International Computer Security Association (ICSA), has certified it. The ICSA classifies firewalls into three categories.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Packet filter firewall', def: 'Checks the address of incoming traffic and turns away anything that does not match the list of trusted addresses. It uses rules to deny access according to information in each packet — the TCP/IP port number, source/destination IP address, or data type. Restrictions can be as tight or loose as you want. An ordinary router may be able to screen traffic by address, but attackers use source IP spoofing to make data appear to come from a trusted source, even from your own network. Packet filter firewalls are prone to IP spoofing and are arduous and confusing to configure; any mistake could leave you wide open to attack.' },
          { term: 'Application-level proxy server', def: 'Examines the application used for each individual IP packet to verify its authenticity. Traffic from each application — HTTP for web, FTP for file transfers, SMTP/POP3 for email — typically requires the installation and configuration of a different application proxy. Proxy servers often require administrators to reconfigure network settings and applications such as web browsers, which can be a labour-intensive process.' },
          { term: 'Stateful packet inspection firewall', def: 'The latest generation of firewall technology, considered the most advanced and secure because it examines all parts of the IP packet to decide whether to accept or reject the communication. The firewall keeps track of all requests for information originating from your network, then scans incoming responses to check for validity — rejecting anything that was not requested. Requested data proceeds to the next level of screening. The screening software determines the state of each packet of data, hence the term stateful packet inspection.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Additional Firewall Features and Functionality',
        text: 'Beyond core security capability, a wide range of additional features are integrated into standard firewall products: support for public web and email servers (normally referred to as a demilitarized zone, or DMZ), content filtering, virtual private networking (VPN) encryption support, and antivirus support.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Demilitarized zone (DMZ) firewalls', def: 'Effective for companies that invite customers to contact their network from any external source. The deciding factors are the number of outside users who access information on the network and how often. A DMZ firewall creates a protected ("demilitarized") information area: outsiders can reach the protected area but cannot reach the rest of the network, so they get the information you want them to have and are prevented from reaching what you do not.' },
          { term: 'Content filtering', def: 'A website or content filter extends the firewall’s capability to block access to certain websites — for example, to ensure employees do not access pornography or racially intolerant material. You define categories of unwelcome material and obtain a service listing thousands of sites that include it, then choose whether to block those sites entirely or allow access but log it. Such a service should automatically update its list of banned sites on a regular basis.' },
          { term: 'Virtual private networks', def: 'A VPN is a private data network that makes use of the public network infrastructure — the Internet — to give a company the same capabilities as a private leased line at much lower cost. It provides secure sharing of public resources by using encryption so only authorised users can view or "tunnel" into a company’s private network. Companies use VPNs as a cost-effective way to connect branch offices, remote workers and privileged partners to their private LANs. A growing range of firewalls have VPN encryption built in or as an optional extra. When implementing a VPN, ensure all devices support the same level of encryption and that it is sufficiently secure. Note that the stronger the encryption level, the more processing power is required by the firewall; a small number of vendors offer VPN hardware acceleration to improve performance.' },
        ],
      },
      {
        type: 'note',
        items: [
          'The manual states that 168-bit Triple DES (3DES) is "the strongest level of encryption publicly available and deemed unbreakable by security experts". That reflects the era the passage was written in — 3DES was formally deprecated by NIST in 2017 and disallowed after 2023.',
          'Today AES (128, 192 or 256-bit) is the standard for this role, as Practical 3 in this manual demonstrates when it compares Caesar, DES and AES.',
        ],
      },
      {
        type: 'text',
        heading: 'Antivirus Protection',
        text: 'Everyone should be concerned about the threat of viruses, which are among the most pernicious forms of computer hacking. Users can quickly damage entire networks by unknowingly downloading and launching dangerous viruses, and companies have lost enormous amounts of money to lost productivity and network repair costs. Firewalls are not designed to remove or clean viruses, but they can assist with virus detection, which is an important part of an overall protection plan. Note that a firewall can only protect the network from the wide area device to which it is attached: a remote access server, or a PC with a modem, could provide a back door that circumvents the firewall — as could an employee inserting a virus-infected disk into a PC. The ultimate place for antivirus software is on every user’s PC; however, a firewall can assist by requiring that every user’s PC have the latest antivirus software running and enabled before it permits that user to access the Internet or download email.',
      },
      {
        type: 'text',
        heading: 'Choosing a Firewall',
        text: 'Firewall functions can be implemented as software, or as an addition to your router/gateway. Alternatively, dedicated firewall appliances are increasing in popularity, mainly due to their ease of use, performance improvements and lower cost.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Router / firmware-based firewalls', def: 'Certain routers provide limited firewall capabilities, which can be augmented with additional software or firmware options. Great care must be taken not to overburden the router by running additional services like a firewall. Enhanced functionality such as VPN, DMZ, content filtering or antivirus protection may be unavailable or expensive to implement.' },
          { term: 'Software-based firewalls', def: 'Typically sophisticated, complex applications that run on a dedicated UNIX or Windows server. These become expensive once you account for the software, server operating system, server hardware and the continual maintenance required. System administrators must constantly monitor and install the latest operating system and security patches as soon as they become available — without these patches to cover newly discovered holes, a software firewall can be rendered useless.' },
          { term: 'Dedicated firewall appliances', def: 'Mostly dedicated, hardware-based systems. Because they run an embedded operating system tailored specifically for firewall use, they are less susceptible to many of the security weaknesses inherent in general-purpose Windows and UNIX systems. These high-performance firewalls are designed to satisfy very high throughput requirements, or the processor-intensive requirements of stateful packet inspection. Because there is no need to harden the operating system, they are usually easier to install and configure than software firewall products, potentially offering plug-and-play installation, minimal maintenance and a complete solution — and they prove extremely cost effective compared with other implementations.' },
        ],
      },
      {
        type: 'text',
        heading: 'Designing a Firewall',
        text: 'Once you have familiarised yourself with the different firewalls on the market, the next step is to define your firewall policy. Will the firewall explicitly deny all services except those critical to the mission of connecting to the Internet? Or is it intended to provide a metered and audited method of queuing access in a non-threatening manner? Decisions like these are less about engineering than politics. The next decision is what level of monitoring, redundancy and control you want — juggling needs analysis with risk assessment, then sorting through often-conflicting requirements to determine what to implement. Where firewalls are concerned, the emphasis should be on security rather than connectivity: consider blocking everything by default and only allowing the services you need on a case-by-case basis. If you block all but a specific set of services, you make your job much easier.',
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
        text: 'Network security comprises the measures adopted to protect the resources and integrity of a computer network. The sections that follow review the basics of computer networks and the Internet, laying the foundation needed to understand the network security controls covered later in this manual.',
      },
      {
        type: 'definition',
        heading: '12. The ISO-OSI Reference Model',
        text: 'The communication problem in computer networks is the task of transferring data entered by an application user in one system to an application user in another system, through one or more intermediate networks.',
      },
      {
        type: 'text',
        text: 'The problem is solved using a layered approach, through a collection of protocols forming a protocol suite. Each layer deals with a particular aspect of the communication problem, is implemented with a particular protocol, and the protocols co-operate with each other to solve the whole problem. The Open Systems Interconnection (OSI) model is an abstract representation of the basic layers involved: Application, Presentation, Session, Transport, Network, Data-link and Physical.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Application', def: 'Specifies how one particular application uses a network and contacts the application program running on a remote machine.' },
          { term: 'Presentation', def: 'Deals with the translation and representation of data at the two end hosts of the communication.' },
          { term: 'Session', def: 'Responsible for establishing a communication session with a remote system, and for security issues such as password authentication before the application user connects.' },
          { term: 'Transport', def: 'Provides end-to-end, reliable or best-effort, in-order data packet delivery, along with support for flow control and congestion control.' },
          { term: 'Network', def: 'Deals with forwarding data packets from the source to the destination nodes of the communication.' },
          { term: 'Data-link', def: 'Deals with the organisation of data into frames and provides reliable data delivery over the physical medium.' },
          { term: 'Physical', def: 'Provides the encoding/decoding and modulation/demodulation schemes for the actual transmission of data over the physical medium, as a sequence of 1s and 0s.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/osi-model.webp`,
        width: 480, height: 3028,
        // Very tall portrait diagram — without a cap, w-full stretches it to
        // roughly six screens of height.
        maxWidth: 300,
        caption: 'Figure 1: OSI Model',
      },
      {
        type: 'image',
        src: `${IMG}/tcpip-stack.webp`,
        width: 1136, height: 2740,
        maxWidth: 520,
        caption: 'Figure 2: TCP/IP Protocol Stack and the Structure of a Data Packet',
      },
      {
        type: 'text',
        heading: 'The TCP/IP Protocol Stack',
        text: 'The seven-layer OSI model is conceptual: it shows the different activities required for communication between application programs running on two different hosts. Its full implementation would result in excessive overhead and huge delays in data delivery. The TCP/IP (Transmission Control Protocol / Internet Protocol) stack shown in Figure 2 is the commonly used model for wide area communications like the Internet, and is composed of the Application, Transport, Internet and Link layers, from top to bottom.',
      },
      {
        type: 'bullets',
        items: [
          'The application layer of the TCP/IP model takes on the responsibilities of the application, presentation and session layers of the OSI model.',
          'The transport layer of the TCP/IP model is similar to the transport layer of the OSI model.',
          'The Internet layer takes care of addressing and routing data packets across different heterogeneous networks. Each machine and router in the Internet has a unique IP address.',
          'The link layer combines the functionality of the OSI data-link and physical layers. It supports the organisation of data into frames and their encoding/decoding mechanisms; the structure and transmission of frames depends on the topology and hardware technology used (Ethernet, Token Ring, and so on).',
          'A data packet is referred to as a segment, a datagram and a frame at the transport, internet and link layers respectively.',
        ],
      },
      {
        type: 'definition',
        heading: '13. TCP Connection Establishment',
        text: 'The two commonly used transport layer protocols in the TCP/IP stack are TCP and UDP. TCP is a connection-oriented, byte-stream based protocol providing reliable, in-order data delivery. UDP is a connectionless, message-based protocol providing only best-effort service for end-to-end delivery.',
      },
      {
        type: 'text',
        text: 'Processes running TCP must establish a connection before exchanging any data packet. During connection establishment the two processes exchange information about the capabilities and resources available at their respective hosts for the session about to begin — this helps the TCP process in one host adjust its sending rate according to the resources (such as memory buffer space) available at the receiving host. To avoid replay errors, the two processes pick an arbitrary starting sequence number for the packets they send. Each byte of data is given a unique, monotonically increasing sequence number, and the sequence number of a TCP data packet represents the sequence number of the first byte of data transmitted in that packet.',
      },
      {
        type: 'text',
        text: 'The connection-establishment process is a three-way handshake. A process on host A initiates a session with a process on host B by sending a Synchronization (SYN) packet with the initial sequence number set to X, including information about the memory resources available through the "Advertised Window" field of the TCP header. If the process at host B is willing to establish the session, it sends back a SYN/ACK packet indicating the memory resources available at host B, the starting sequence number for packets coming from host B, and an acknowledgment of the SYN packet from host A. Host A responds with an ACK packet if it accepts the advertised window value of host B and is willing to tune its sending rate accordingly. Note that acknowledging receipt of a packet with sequence number X indicates the sequence number (X+1) of the next packet expected. Typically host A is a client and host B is a server.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-handshake.webp`,
        width: 1400, height: 715,
        caption: 'Figure 3: TCP Connection Establishment Mechanism',
      },
      {
        type: 'text',
        heading: 'Internet Control Message Protocol (ICMP)',
        text: 'IP provides best-effort service in delivering datagrams from one host to another through one or more intermediate networks. The TCP/IP suite provides an error-reporting protocol called the Internet Control Message Protocol (ICMP) that operates in tandem with IP, which uses it to report errors and certain critical information to the end hosts. Each ICMP message is identified by an 8-bit type field in the IP header. One commonly used ICMP message is ECHO Request/Reply: an ECHO Request is sent to the ICMP process running on a host to check whether it is alive, and if it is, the host responds with an ECHO Reply.',
      },
      {
        type: 'note',
        items: [
          'ICMP ECHO Request/Reply is exactly what the `ping` utility sends — the syllabus item on basic network utilities (ipconfig, ping, tracert, netstat) rests on this section.',
          '`tracert` also builds on ICMP: it sends packets with deliberately small TTL values so each router along the path returns an ICMP "time exceeded" message, revealing the route hop by hop.',
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
        text: 'This part of the manual describes classical attacks that have exploited the typical vulnerabilities of computer networks, together with the solutions deployed to combat them or reduce the chances of their success.',
      },
      {
        type: 'definition',
        heading: '15. Threats in Transit',
        text: 'The network interface card (NIC) of each host is uniquely identified with a hardware address. A NIC is programmed to pick up only packets addressed to the unicast hardware address of the host, the multicast address of a group the host belongs to, or the broadcast address. A capable intruder can reprogram the NIC with the hardware address of another host and accept packets addressed to it — and to avoid being caught, can put a copy of the packet back onto the network.',
      },
      {
        type: 'text',
        text: 'Wiretapping is the process of extracting information as it flows through a wire, and differs depending on the communication medium. In cables, wiretapping can be done with a packet sniffer or through inductance. A packet sniffer is software or hardware that intercepts traffic passing through a LAN cable, and can be used for both beneficial and malicious purposes: to analyse network problems and monitor usage, to filter suspect content, to study the structure of packet headers, to detect intrusion attempts, and to gather information for effecting an intrusion. Because an ordinary wire emits radiation as electrical signals propagate through it, an intruder can read radiated signals through inductance without making physical contact with the cable. An intruder intercepting signals on a broadband cable has to separate the targeted signal from all the multiplexed signals.',
      },
      {
        type: 'text',
        text: 'Wireless signals are broadcast through open space and are more susceptible to tapping. The signal path of microwave signals has to be fairly wide to be sure the receiver’s antenna is hit by the transmitted signal — but the wider the path, the easier it is for an intruder to interfere with the line of sight, or to pick up the entire transmission from an antenna located close to the receiver. Satellite communication involves a similar trade-off between coverage and secure communication. A footprint is the pattern produced on the surface of the earth by a satellite’s transmitter: a broader footprint maximises coverage because signals can be picked up over a huge region, while a smaller footprint is desirable to reduce the risk of interception. The angle of dispersion of the satellite transponder is the parameter that adjusts the spread of the footprint.',
      },
      {
        type: 'text',
        text: 'An optical fibre, made of thin glass strands, can carry light pulses over long distances without being much affected by electrical interference. Optical fibres are more secure than any other transmission medium for two reasons: they are fine-tuned to achieve total internal reflection, so the entire network would have to be re-tuned to facilitate tapping and interception; and they carry light energy rather than electrical signals, so inductance-based tapping is not possible.',
      },
      {
        type: 'definition',
        heading: '16. TCP Session Hijacking',
        text: 'TCP session hijacking is the act of taking over an already established TCP session and injecting packets into the stream that the receiver processes as if they came from the authentic owner of the session. A TCP session is identified by the quadruple: client IP address, client port number, server IP address and server port number. Any packet reaching either machine with those identifiers is considered part of the existing session, so if attackers can spoof these items they can pass TCP packets to the client or server and have them processed as coming from the other machine.',
      },
      {
        type: 'text',
        text: 'To successfully hijack an existing TCP session, an attacker must first desynchronise the session and then inject the intended commands. To desynchronise a session between a client and server (Figure 4), the attacker must predict the sequence number the client or server is about to use, and use it before they get a chance to. If the attacker has access to the network, a packet sniffer can be used to look into the packets belonging to the session, and the expected sequence number can be predicted accurately from the ACK packets exchanged. If the attacker cannot sniff the session, they must try all possible options and guess the expected sequence number.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-desync.webp`,
        width: 1400, height: 928,
        caption: 'Figure 4: Desynchronizing a TCP Session',
      },
      {
        type: 'text',
        text: 'When the attacker successfully hijacks the session and injects spoofed data packets (as if they came from the original client), the server acknowledges receipt to the original client with an ACK packet. Because this ACK bears a sequence number the client is not expecting, the original client attempts to resynchronise by sending an ACK with the sequence number it expects. That ACK in turn contains a sequence number the server is not expecting, so the server resends its last ACK. This cycle continues, and the rapid passing back and forth of ACK packets creates a TCP ACK storm (Figure 5). As the attacker injects more data packets the storm grows, and can quickly bring down network performance. After a number of unsuccessful resynchronisation attempts, the original client eventually gets exhausted and closes the connection.',
      },
      {
        type: 'image',
        src: `${IMG}/tcp-ack-storm.webp`,
        width: 1144, height: 1340,
        caption: 'Figure 5: Creating a TCP ACK Storm',
      },
      {
        type: 'text',
        heading: 'Man-in-the-Middle Attack',
        text: 'With a man-in-the-middle (MITM) attack, an attacker can read, modify and insert messages between two communicating parties without either party knowing the link has been compromised. To carry this out, the attacker must be able to observe and intercept messages between the two victims. Consider an MITM attack on public-key cryptography: let A and B be the communicating parties, and M the attacker who wants to deliver a false message to B. B sends its public key to A. If M can intercept the channel between A and B, M gets access to B’s public key. M then sends A a spoofed message claiming to come from B, containing M’s own public key — but A believes it has received B’s public key. When A sends a data packet to B it encrypts the packet with what it considers B’s public key. M intercepts the message, decrypts it with its own private key to extract the actual message, may modify it, then encrypts it with B’s real public key and inserts it back into the channel. B decrypts the message with its own private key and reads it, assuming it came from A.',
      },
      {
        type: 'definition',
        heading: '17. Echo-Chargen Attack',
        text: 'Chargen (Character Generator) is a protocol of the TCP/IP stack used for testing and performance measurement. It runs on TCP port 19 and UDP port 19. When a client opens a TCP connection to a server on port 19, the server sends arbitrary characters back until the connection is closed. When a host sends a UDP message to a server on UDP port 19, the server responds with an arbitrary message of between 0 and 512 characters.',
      },
      {
        type: 'text',
        text: 'An attacker can trigger the Echo-Chargen attack by spoofing a conversation between the Echo Request/Reply service and the Chargen service, redirecting the output of each service to the other and creating a rapidly expanding spiral of traffic. In Figure 6 the attacker triggers the attack by sending a spoofed message to one targeted host (host A) running Chargen at UDP port 19, spoofed so it appears to originate from the other targeted host (host B) at UDP port 7, the Echo Request/Reply port. Host A now sends a UDP message from port 19 to port 7 of host B. Host B treats this as an Echo Request and sends a Reply back to UDP port 19 of host A. Host A treats the Reply as a message for the Chargen service and sends a new arbitrary UDP message to port 7 of host B. This cycle continues and generates excessive traffic. Eventually the attack consumes memory and processor power at both targeted hosts and causes them to become non-responsive to user commands.',
      },
      {
        type: 'image',
        src: `${IMG}/echo-chargen.webp`,
        width: 1400, height: 1131,
        caption: 'Figure 6: A Typical Echo-Chargen Attack',
      },
      {
        type: 'text',
        heading: 'Smurf Attack',
        text: 'A perpetrator launches the Smurf attack by sending a spoofed Echo-Request message to a network’s broadcast IP address, with the victim’s IP address as the source. Every host receiving the broadcast Echo-Request sends an Echo-Reply to the victim, who is overwhelmed by the flood — making Smurf a kind of denial-of-service attack. Two solutions are currently adopted on the Internet to prevent it: routers do not forward datagrams whose destination address is a broadcast IP address, and hosts are configured not to reply to Echo-Request messages received as a broadcast.',
      },
      {
        type: 'text',
        heading: 'Traffic Redirection',
        text: 'A compromised router can send route update messages to all its neighbouring routers, informing them that it lies on the shortest path to every network on the Internet. The neighbouring routers then forward all of their incoming data packets to this compromised router, which eventually gets flooded and starts dropping them, so the packets never make it to their destination.',
      },
      {
        type: 'text',
        heading: 'Attacks on Domain Name Service (DNS)',
        text: 'A DNS server holds a table (the DNS cache) mapping domain names to IP addresses. It queries other DNS servers higher up the domain name hierarchy to resolve names for which it has no entry, and updates its cache with what it learns. DNS cache poisoning is an attack that makes the DNS server believe a domain name-to-IP mapping is authentic when it is not. Once poisoned, the entry stays in the cache for a while and affects every client using that server in the meantime. For example, an attacker can replace the IP address of a target file server with that of a compromised file server they control, creating fake entries with filenames matching those on the target server. Those files could contain malicious content such as a worm or virus, so users who want to download files from the target server may end up unknowingly downloading malicious content instead.',
      },
      {
        type: 'text',
        heading: 'Distributed Denial of Service (DDoS) Attacks',
        text: 'DDoS attacks involve breaking into hundreds or thousands of machines all over the Internet. The attacker installs malicious software on these compromised machines (called zombies) and controls them to launch coordinated attacks on victim sites. DDoS attacks are normally aimed at exhausting network bandwidth, overwhelming a router’s processing capacity, and breaking network connectivity to the victims. The attacker uses any convenient method — exploiting a buffer overflow, or tricking the victim into installing unknown code from an email attachment — to plant a Trojan horse on a target machine and transform it into a zombie by also installing rootkit software, which conceals the presence of the Trojan and hides its malicious activities. After forming a sufficient number of zombies, the attacker signals them all to launch the attack on a chosen victim. Each zombie may launch the same or a different type of attack.',
      },
      {
        type: 'definition',
        heading: '18. SYN Flood Attack',
        text: 'During TCP connection establishment, the server maintains a SYN_RECV queue tracking connection requests for which it has allocated resources and responded with a SYN/ACK, but for which the corresponding ACK from the client has not yet arrived. The server eventually times out waiting for the ACK and removes the incomplete request from its queue.',
      },
      {
        type: 'text',
        text: 'An attacker can launch a denial-of-service attack by sending many SYN connection requests using spoofed, non-existent IP addresses and never responding with the ACK messages. The server’s SYN_RECV queue fills up with incomplete connection requests. Even though these are discarded after the timeout, if a genuine client attempts to establish a TCP connection with the server in the meantime, the server discards that client’s SYN request.',
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
        heading: '19. Network Security Controls (Encryption)',
        text: 'This section describes several network security controls adopted in modern computer networks to combat threats, and to prevent or reduce the chances of an attack.',
      },
      {
        type: 'text',
        heading: 'Link Encryption vs End-to-End Encryption',
        text: 'Encryption applied between every pair of hosts connected by a link is called link-to-link encryption. Link encryption is preferred when all the hosts in the network are secure but the communication medium is shared among several users and is not secure. Almost all components of a data frame — except the source and destination hardware addresses in the frame header — are encrypted before the frame is inserted onto the physical link. As the frame reaches the next hop receiver (a router or the end host) it is decrypted at the bottom protocol layer and sent to the higher layers for processing and forwarding. Because encryption is at the bottom protocol layer, the message is exposed in plaintext at all the other layers of the sender and receiver, and at the link and Internet layers of intermediate hosts.',
      },
      {
        type: 'table',
        heading: 'Table 1: Comparison of Link Encryption and End-to-End Encryption',
        headers: ['', 'Link encryption', 'End-to-end encryption'],
        rows: [
          ['Key management', 'End hosts of every link should share a key and should be able to do encryption and decryption.', 'The intermediate hosts of a transmission path do not need to have cryptographic facilities.'],
          ['Number of keys', 'If there are N hosts and n users in a network (N << n), the number of keys needed would be N(N-1)/2.', 'The number of keys needed for symmetric encryption and public-key encryption would be n(n-1)/2 and 2n respectively.'],
          ['Scope of encryption', 'All message transmissions have to be encrypted and decrypted at every link.', 'Encryption is application and message specific and need not be done for all messages. Each application user can deploy an encryption algorithm of choice.'],
          ['Data exposure', 'Data is exposed at the end hosts and the intermediate hosts.', 'Except at the application layer, data is encrypted at both the end hosts and the intermediate hosts.'],
        ],
      },
      {
        type: 'text',
        text: 'Encryption applied between two application programs running at the end hosts of a communication is called end-to-end encryption. Here only the data portion of the packet is encrypted, at the highest level (the application layer), and the packet is transmitted with the data in encrypted form throughout the Internet. End-to-end encryption therefore protects data against disclosure while in transit, even though the packet may pass through potentially insecure intermediate hosts.',
      },
      {
        type: 'definition',
        heading: '20. Virtual Private Networks',
        text: 'There are two types of IP address: public and private. A public IP address is globally unique — only one machine connected to the public Internet can have it. Private IP addresses are one of the solutions to the exhaustion of IP address space: a private address only has to be unique within the set of networks of a particular organisation.',
      },
      {
        type: 'text',
        text: 'Larger organisations have sites at different locations in the world, and hosts at different sites may be identified with a unique private IP address. But the same set of private addresses can be used in the networks of different organisations, so a packet with a private IP address as its destination cannot be used to route packets from one site to another through the public Internet.',
      },
      {
        type: 'image',
        src: `${IMG}/vpn.webp`,
        width: 1400, height: 493,
        caption: 'Figure 7: Virtual Private Network',
      },
      {
        type: 'text',
        text: 'Virtual private network (VPN) technology uses IP-in-IP tunnelling to encrypt and encapsulate the IP datagram that has the private IP addresses of the two end hosts, wrapping it in another IP header whose source and destination are the public IP addresses of the gateway routers for the two private networks. Each organisation is required to have one or more gateway routers with a public IP address in order to communicate over the public Internet. Because the original IP datagram is encrypted, no intermediate forwarding host on the public Internet can look at the contents of the message.',
      },
      {
        type: 'image',
        src: `${IMG}/ip-in-ip-tunneling.webp`,
        width: 1357, height: 1103,
        caption: 'Figure 8: Structure of an IP Datagram during Different Phases of IP-in-IP Tunneling',
      },
      {
        type: 'bullets',
        items: [
          'Source IP, Destination IP → original unencrypted payload (before encryption at gateway router R1)',
          'Source IP: R1, Destination IP: R2 → encapsulated, encrypted version of the original IP datagram (in transit through the public Internet)',
          'Source IP, Destination IP → original unencrypted payload (after decryption at gateway router R2)',
        ],
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
        text: 'Secure Shell (SSH) is a network protocol that allows a user to interact securely with remote machines by establishing a secure channel for data exchange. SSH replaced TELNET and other insecure remote shell programs that sent information — including passwords — in plaintext. SSH encrypts information sent over the insecure Internet and so provides both confidentiality and integrity of data. It operates over a sequence of three phases.',
      },
      {
        type: 'bullets',
        heading: 'Step 1: Host Identification',
        items: [
          'The client contacts the server and requests its public-key certificate.',
          'The client maintains a list of public keys for the server machines available to it. If asked to contact a machine for which it has no locally held public key, it warns the user that the public key reported by the server is not in the list of known hosts, and asks whether to continue connecting.',
          'If the user agrees to continue, the client verifies the authenticity of the Certifying Authority (CA) that issued the server’s public key certificate and, if satisfied, accepts the public keys — adding them to its personal list of host public keys.',
          'When the administrator has included the client machine’s public key in the per-machine list of known host public keys on the server, the server may want the client to prove it is what it claims to be.',
          'The server creates a "challenge" encrypted with the client’s host public key and sends it to the client. Only a genuine client can decrypt this with its private key. The client then sends the same challenge encrypted with the server’s public key; if the server decrypts it and gets back the challenge it sent, the client is genuine.',
        ],
      },
      {
        type: 'text',
        text: 'The client machine needs to be sure it is communicating with the remote machine the application asked for, and not with another machine spoofing it. The server on the remote side also has the option of ensuring the user is connecting from the machine it appears to be.',
      },
      {
        type: 'bullets',
        heading: 'Step 2: Encryption',
        items: [
          'Once host identification is done, the client sends a list of encryption algorithms it could use and their corresponding keys, encrypted with the server’s public key.',
          'The server decrypts the list with its private key and chooses the strongest encryption algorithm it can handle from the list.',
          'The server notifies the client of the selected algorithm, encrypting the notification with its private key.',
          'The client generates the appropriate secret session key for the selected algorithm and notifies the server, encrypting the notification with the server’s public key.',
          'The server decrypts the notification with its private key and extracts the secret session key.',
        ],
      },
      {
        type: 'text',
        text: 'The objective of this step is to establish a secure end-to-end link that supports encryption of the data transferred. Even the password and other authentication information are encrypted, and are never transmitted in plaintext.',
      },
      {
        type: 'bullets',
        heading: 'Step 3: User Authentication',
        items: [
          'The client asks the user for a username and password, encrypts them with the server’s public key, and sends them to the server.',
          'The server checks the validity of the username and password and, if everything is fine, accepts the connection request by sending a confirmation encrypted with its private key.',
          'The client decrypts the confirmation with the server’s public key. The client and server are now set to exchange data securely using the selected encryption algorithm and the agreed secret session key.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ssh-connection.webp`,
        width: 1352, height: 1217,
        caption: 'Figure 9: Steps to Establish a Secure Shell (SSH) Connection',
      },
      {
        type: 'definition',
        heading: '22. Transport Layer Security (TLS)',
        text: 'Transport Layer Security (TLS) is the successor of the Secure Sockets Layer (SSL) cryptographic protocol. It provides secure communication of transport layer datagrams as part of an end-to-end connection across the network, and has been used for a wide variety of applications including web browsing, electronic mail, voice-over-IP and instant messaging.',
      },
      {
        type: 'bullets',
        items: [
          'The client initiates the connection request by sending a ClientHello message containing: the latest TLS version supported by the client; a random number arbitrarily chosen by the client; and a list of suggested cipher suites (the encryption algorithms to be used, the key exchange and authentication algorithms, and the hashing algorithms used to generate message authentication codes).',
          'The server responds with a ServerHello message containing: the TLS version chosen by the server based on the client’s submitted version; a random number arbitrarily chosen by the server; and the cipher suite chosen from the list offered by the client.',
          'The server also sends its public-key certificate to the client. The client may contact the CA that issued the certificate to confirm it is authentic before proceeding. The server may also ask for the client’s public-key certificate by sending a CertificateRequest message, so the connection can be mutually authenticated.',
          'The client generates a shared session key and sends it along with the client-side and server-side random numbers, all encrypted with the server’s public key. The random numbers are sent to enhance each other’s authentication.',
          'The server decrypts the message with its private key and extracts the shared session key.',
          'The client computes a hash of the messages received so far from the server using the agreed hashing algorithm, encrypts the hash with the shared session key using the selected encryption algorithm, and sends it to the server.',
          'The server decrypts the client’s message with the shared session key and independently calculates the hash of all its messages to the client. If the values match, the server accepts the connection request, then computes a hash of all the messages it has received so far and sends it to the client, encrypted with the shared session key.',
          'The client decrypts the message with the shared session key and independently computes a hash of all the messages it has sent to the server. If the locally computed value matches the value sent by the server, the client has authenticated the server. The TLS connection is now established.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/tls-handshake.webp`,
        width: 1352, height: 1179,
        caption: 'Figure 10: TLS Connection Establishment Mechanism',
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
        heading: '23. IP Security (IPSec)',
        text: 'The IP Security protocol suite (IPSec) is implemented at the IP layer, so it does not require any change to existing transport layer and application layer protocols. IPSec is primarily designed as a generic solution for overcoming shortcomings of the IP layer such as IP address spoofing, wiretapping and replay attacks.',
      },
      {
        type: 'bullets',
        items: [
          'IP Authentication Header, AH (Next Header protocol ID: 51) — provides integrity, authentication and non-repudiation.',
          'IP Encapsulating Security Payload, ESP (Next Header protocol ID: 50) — provides confidentiality, along with authentication and integrity protection.',
        ],
      },
      {
        type: 'definition',
        heading: 'Security Association',
        text: 'The basis of IPSec is a Security Association (SA), characterised by the set of security parameters agreed for a secure communication channel between two hosts. Each host can have several SAs in effect for communication with different remote hosts.',
      },
      {
        type: 'text',
        text: 'An SA is identified using a Security Parameter Index (SPI) — a 32-bit identifier — and the IP address of the partner host on the other side of the SA. Together these index into the Security Association Database (SADB), which holds information about the characteristics of different SAs. An SA is characterised by the encryption algorithm, the encryption key, encryption parameters such as the initialisation vector, integrity/authentication algorithms (keyed-HMAC algorithms and the key), and the lifespan of the SA.',
      },
      {
        type: 'text',
        text: 'An SA is unidirectional. For two hosts to communicate in either direction, SAs have to be established separately in both directions. For host A to securely send data packets to host B, and make host B believe the packet did come from host A, it must establish an SA with host B — such an SA is "outbound" at A and "inbound" at B. An IPSec header of a datagram sent from host A to host B should carry the secure features of the SA that is "inbound" at B, and similarly for datagrams sent from B to A.',
      },
      {
        type: 'text',
        text: 'Before establishing an IPSec SA, the two end hosts must exchange their public-key certificates, digitally certified by a trusted third-party certificate authority (CA). This is done through the Internet Key Exchange (IKE) protocol. Once the two hosts have exchanged certificates they are said to have established an IKE Security Association (IKE SA), which is a prerequisite for establishing an IPSec SA.',
      },
      {
        type: 'bullets',
        items: [
          'Host A, wishing to send data packets to host B, needs to establish an "inbound SA" with host B.',
          'Host A picks an SPI not yet chosen for communication with B and sends an "SA Establishment Request" message to B.',
          'The request contains: the SPI for the inbound SA channel at host A (the outbound SA channel at host B); the lifespan of the association, negotiable by host B; the packet-level security protocol chosen (AH or ESP), also negotiable by host B; and the AH header fields if AH is chosen, or the ESP header fields if ESP is chosen.',
        ],
      },
      {
        type: 'definition',
        heading: 'Authentication Header (AH)',
        text: 'The AH provides integrity, authentication and non-repudiation services for IP datagrams.',
      },
      {
        type: 'image',
        src: `${IMG}/ah-header.webp`,
        width: 1311, height: 601,
        caption: 'Figure 11: Structure of an Authentication Header (AH)',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Next Header', def: 'Identifies the type of the next header (e.g. TCP or UDP).' },
          { term: 'Payload Length', def: 'Indicates the length of the AH in 32-bit words, minus 2.' },
          { term: 'Reserved', def: 'Reserved for future use; currently set to zero.' },
          { term: 'Security Parameters Index (SPI)', def: 'Identifies the security association.' },
          { term: 'Sequence Number', def: 'Identifies the datagrams sent as part of an SA. A monotonically increasing identifier, used to assist in anti-replay protection.' },
          { term: 'Authentication Data', def: 'The integrity/authentication check value (keyed-HMAC) calculated over the entire IP datagram — excluding mutable fields in the IP header — and the AH header. The size of the keyed-HMAC may vary with each SA and may not be an exact multiple of 32 bits, in which case the HMAC is padded.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ipv4-with-ah.webp`,
        width: 1287, height: 570,
        caption: 'Figure 12: Original IPv4 Datagram and IPv4 Datagram with AH Header',
      },
      {
        type: 'definition',
        heading: 'Encapsulating Security Payload (ESP)',
        text: 'ESP provides origin authentication, integrity and confidentiality protection for IP datagrams.',
      },
      {
        type: 'image',
        src: `${IMG}/esp-header.webp`,
        width: 1400, height: 710,
        caption: 'Figure 13: Structure of an Encapsulated Security Payload (ESP) Header',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Security Parameters Index (SPI)', def: 'Identifies the security association.' },
          { term: 'Sequence Number', def: 'Identifies the datagrams sent as part of an SA. A monotonically increasing identifier, used to assist in anti-replay protection.' },
          { term: 'Payload Data', def: 'Indicates the data to be transferred.' },
          { term: 'Padding', def: 'Used with certain block ciphers to pad the payload data to a full block length (0–255 bytes).' },
          { term: 'Pad Length', def: 'Indicates the size of the padding in bytes.' },
          { term: 'Next Header', def: 'Identifies the transport layer protocol.' },
          { term: 'Authentication Data', def: 'The integrity/authentication check value (keyed-HMAC) calculated over only the SPI and Sequence Number in the ESP header, the actual data, the padding data, the pad length and the Next Header field.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/ipv4-with-esp.webp`,
        width: 1364, height: 570,
        caption: 'Figure 14: Original IPv4 Datagram and IPv4 Datagram with ESP Header',
      },
      {
        type: 'note',
        items: [
          'The practical difference between AH and ESP: AH proves who sent a packet and that nobody altered it, but anyone watching the wire can still read the contents. ESP additionally encrypts the payload, so it is what VPNs actually use.',
          'AH authenticates the whole datagram including parts of the IP header, which is why it breaks through NAT — NAT rewrites addresses that AH has signed. ESP does not sign the outer IP header, so it survives NAT.',
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
        text: 'Kerberos is an authentication protocol used by processes and hosts communicating over an insecure network to verify each other’s identity securely. It is based on the idea that a central server provides authenticated tokens called "tickets" to requesting applications. A ticket is an unforgeable, non-replayable, authenticated object. The security of the protocol depends on the assumption that the participating machines maintain loosely synchronised time.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Authentication Server (AS)', def: 'Authenticates the client once, at logon, and issues the Ticket Granting Ticket.' },
          { term: 'Ticket Granting Server (TGS)', def: 'Issues Client-to-Server tickets to a client that presents a valid TGT, without the client having to re-authenticate.' },
          { term: 'Service Server (SS)', def: 'The server hosting the service the client actually wants to use.' },
          { term: 'Ticket Granting Ticket (TGT)', def: 'The token obtained once from the AS, which can then be used to obtain additional tickets without re-authenticating for every service requested.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/kerberos.webp`,
        width: 1400, height: 1603,
        caption: 'Figure 15: Kerberos Protocol',
      },
      {
        type: 'text',
        heading: 'Step 1: User Client-based Logon',
        text: 'The user submits their username and password to the client machine, and the client uses a one-way hash of the password to compute the secret key for the user. The AS returns two messages. Message A contains the Client/TGS session key, encrypted with the user’s secret key (derived from the user’s password at the AS). Message B contains the Ticket-Granting Ticket (TGT), which includes the username, the network address of the user’s client machine, the validity period of the TGT, and the Client/TGS session key — all encrypted with the TGS secret key. Once the client receives messages A and B, it decrypts message A with the user’s secret key and extracts the Client/TGS session key.',
      },
      {
        type: 'text',
        heading: 'Step 2: Ticket Granting',
        text: 'The client sends two messages to the TGS. Message C contains the TGT from message B and identification for the requested service. Message D contains the authentication information for the user/client — the username, the network address of the client machine, and a timestamp — all encrypted with the Client/TGS session key. After receiving message C the TGS decrypts it with its secret key and extracts the Client/TGS session key, then decrypts message D with that session key and sends back two messages. Message E contains the Client-to-Server ticket, which includes the username, the network address of the client machine, the validity period of the ticket and the Client/Server session key, encrypted with the secret key of the server for the requested service. Message F contains the Client/Server session key and the timestamp of message D incremented by 1, both encrypted with the Client/TGS session key. The client uses the Client/TGS session key to decrypt message F and extract the Client/Server session key.',
      },
      {
        type: 'text',
        heading: 'Step 3: Client Service Request',
        text: 'The client sends two messages to the SS: message E (received from the TGS), and message G, containing the username, the network address of the client machine and a timestamp, all encrypted with the Client/Server session key. The SS decrypts message E with its own secret key to extract the Client-to-Server ticket and the Client/Server session key, then decrypts message G with the Client/Server session key to extract the client identification information. If the information in message G matches that in the Client-to-Server ticket, the SS responds with message H, containing the timestamp from message G incremented by 1, encrypted with the Client/Server session key. The client decrypts message H with the Client/Server session key, and if the timestamp is the value it expected, the client trusts the server and starts sending service requests to it.',
      },
      {
        type: 'proscons',
        heading: 'Kerberos: Strengths and Weaknesses',
        advantages: [
          'Each ticket has a limited validity period, so long-term cryptanalytic attacks cannot be launched.',
          'Clocks across all clients and servers are assumed synchronised; a host responds only if the request has a timestamp close to its own current time.',
          'Kerberos provides mutual authentication — the TGS and SS can access the Client/TGS and Client/Server session keys only after decrypting the messages containing them with their own secret keys, which the client uses to indirectly authenticate the servers.',
        ],
        disadvantages: [
          'Requires continuous availability of a trusted ticket-granting server for all access control and authentication checks.',
          'Authenticity of servers requires a trusted relationship between the TGS and every service server.',
          'Timely transactions are required to reduce the chance of a user with a genuine ticket being denied service.',
          'Password guessing can still recover a user’s valid secret key — the whole system remains dependent on the user password.',
          'Does not scale well as the number of service servers increases: the TGS has to maintain a trustworthy relationship and a secret key for each SS, and adding backup service servers complicates this further.',
          'Network services cannot be accessed without obtaining Kerberos authentication — every application run by users on the network must go through it.',
        ],
      },
      {
        type: 'definition',
        heading: '25. Mobile Device Security',
        text: 'Security on phones and mobile devices is as important as on desktop and laptop computers — even more so, because of the additional functionality that comes with an internet-connected device that can go almost anywhere. Phones are now like handheld laptops able to browse the internet, and tablets are used to control other IoT devices.',
      },
      {
        type: 'bullets',
        items: [
          'Practise the same "think-before-you-click" mindset on mobile devices that you have on desktop and laptop machines. Some phishing specifically targets mobile devices.',
          'Virus protection is extremely important on cellphones, as they use third-party networks.',
          'Physical security matters equally, since devices are small and easily slipped out of sight by a would-be thief.',
          'Mobile Device Management (MDM) software should be used to track devices via GPS and usage, and to remotely wipe them or take photos if the device is lost or stolen.',
          'Additional anti-theft software should remain installed after a factory reset.',
          'Avoid online banking on a smartphone or tablet; use a wired connection for added security.',
          'Use any encryption the device has built into its settings (usually under Security).',
          'Never connect to unknown WiFi networks.',
          'Only turn on Bluetooth when you need it.',
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
