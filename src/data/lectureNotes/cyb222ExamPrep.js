// UUY-CYB 222 (Web and Mobile Applications Security) — written exam bank.
//
// Note on the name: `cyb222` here means UUY-CYB 222, following the convention
// already set by cyb221Quiz.js (UUY-CYB 221). The catalogue also contains a
// separate CYB 222 (Cloud & Big Data Security) with its own inline MCQ bank —
// nothing in this file relates to that course.
//
// This course is examined on paper, not by CBT. The existing `quiz` bank on the
// course stays as low-stakes recall practice, but an MCQ cannot rehearse what
// this paper actually asks for: unaided recall of a named list, and an answer
// structured so a marker can find the points. The lecturer was explicit about
// that in class (Topic 12): "Pages of prose that never name the technical terms
// score nothing — the marks sit on the terms themselves."
//
// So every question here is the form a real script uses — "define", "list and
// explain any five", "differentiate between", "with reference to…" — and each
// carries a model answer plus a per-point mark scheme the student ticks off
// against what they actually wrote. Self-marking is the point: reading a mark
// scheme is the skill an MCQ never teaches, and it needs no network and no AI.
//
// Question types:
//   longform — question + marks + modelAnswer + markScheme[]
//   recall   — unaided list recall: items[] of { name, aliases[], explain },
//              rendered as blanks and fuzzy-matched, then each item's `explain`
//              revealed so the "and explain each" half is drilled too.
//
// Mark values in each markScheme entry sum to the question's `marks`, and a
// recall drill scores one mark per item — scripts/validate-modules.mjs asserts
// both. Every question carries a `source` naming the topic it came from.
//
// Ordering is deliberate: the six questions the lecturer flagged as guaranteed
// come first, in his own wording, so a student short on time drills those and
// stops. The rest follow the topic order of the notes.

export const cyb222ExamPrep = [

  // ══════════════════════════════════════════════════════════════════
  //  THE SIX FLAGGED QUESTIONS — Topic 12
  //  Answers in the wording the lecturer gave in class.
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 10 — Audit, Compliance & Quality Assurance',
    question: 'Write short notes on quality assurance, and list the evaluation metrics against which it is measured.',
    modelAnswer: 'Quality assurance (QA) ensures that software products meet the desired standard. It is measured against a fixed set of evaluation metrics, so that a claim like "the product is good" becomes something that can actually be tested and evidenced. The evaluation metrics are: Functionality — the product does what it was specified to do; Performance — it responds and processes within acceptable time and load limits; Reliability — it behaves consistently and remains available over time; Usability — users can operate it correctly, without confusion; Compatibility — it works across the intended browsers, devices and platforms; and Security — it protects data and withstands attack.',
    markScheme: [
      'QA defined — ensures software products meet the desired standard (2)',
      'Functionality named (1)',
      'Performance named (1)',
      'Reliability named (1)',
      'Usability named (1)',
      'Compatibility named (1)',
      'Security named (1)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Topic 10 — Audit, Compliance & Quality Assurance',
    question: 'List the SIX quality assurance evaluation metrics.',
    items: [
      { name: 'Functionality', aliases: ['functional'], explain: 'The product does what it was specified to do.' },
      { name: 'Performance', aliases: [], explain: 'It responds and processes within acceptable time and load limits.' },
      { name: 'Reliability', aliases: ['reliable'], explain: 'It behaves consistently and remains available over time.' },
      { name: 'Usability', aliases: ['usable', 'ease of use'], explain: 'Users can operate it correctly, without confusion.' },
      { name: 'Compatibility', aliases: ['compatible'], explain: 'It works across the intended browsers, devices and platforms.' },
      { name: 'Security', aliases: ['secure'], explain: 'It protects data and withstands attack.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Topic 7 — Risks & Threats',
    question: 'Define web-based risk.',
    modelAnswer: 'Web-based risk is any threat, vulnerability, or exposure associated with using the internet that can result in data breaches, financial losses, and service disruption.',
    markScheme: [
      'Defined as any threat, vulnerability or exposure associated with using the internet (2)',
      'Consequence — data breaches (1)',
      'Consequence — financial losses (1)',
      'Consequence — service disruption (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 7 — Risks & Threats',
    question: 'Differentiate between web application risk and mobile application risk.',
    modelAnswer: 'Web application risk is centralized — it is concentrated on the server — while mobile application risk is decentralized, spread across thousands of individual devices. A web attack is a client–server attack that lands on the server and is then distributed across all its users, whereas a mobile attack lands directly on the victim’s own device. A web breach therefore affects the entire database and every user in it, while mobile risk is data leakage from a single device, usually following the physical loss or theft of the phone. A web application requires an internet connection to function at all; a mobile application can work offline, and the data-exchange risk only applies once it connects. The common web attacks are SQL injection, DDoS and CSRF; the common mobile attacks are reverse engineering, code tampering and permission abuse.',
    markScheme: [
      'Centralization — web risk centralized on the server vs mobile risk decentralized across devices (2)',
      'Attack location — client–server attack landing on the server vs attack landing on the victim’s own device (2)',
      'Breach impact — whole database and every user vs leakage from one device after physical loss (2)',
      'Connectivity — internet connection required vs able to work offline (2)',
      'At least one attack type named on each side (SQLi/DDoS/CSRF vs reverse engineering/tampering/permission abuse) (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain the security/tracking models, distinguishing clearly between authentication and authorization.',
    modelAnswer: 'Authentication is the process of verifying the identity of a user, device, or service before granting access to protected digital resources — it answers the question "who are you?". Authorization is the process of giving a verified user permission to access a physical location or digital information — it answers "what are you allowed to do, now that we know who you are?". Authentication always comes first: a system cannot decide what a user is permitted to do until it has established who that user is. In a bank, every teller and every manager authenticates the same way when signing in, but they are authorized differently — a teller can only approve transactions up to a set limit, while the branch manager holds higher clearance.',
    markScheme: [
      'Authentication defined — verifying the identity of a user, device or service before granting access (3)',
      'Authorization defined — giving a verified user permission to access a location or information (3)',
      'Authentication precedes authorization (1)',
      'Worked example of differing permission levels — bank teller’s transaction limit vs branch manager’s clearance (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Distinguish between symmetrical and asymmetrical encryption.',
    modelAnswer: 'Encryption is the conversion of information into ciphertext — text that is unreadable to unauthorised users. Symmetrical encryption uses a single key to both lock and unlock the data. Asymmetrical encryption uses two keys — a public key and a private key — where the public key encrypts data that only the corresponding private key can decrypt. The trade-off is that the single symmetric key is fast, but the key itself must be shared securely between both parties; the asymmetric key pair removes the need to share a secret at all.',
    markScheme: [
      'Encryption defined — conversion of information into ciphertext, unreadable to unauthorised users (2)',
      'Symmetrical — a single key both locks and unlocks the data (2)',
      'Asymmetrical — two keys, a public key and a private key (2)',
      'Trade-off — the symmetric key is fast but must be shared securely, while the asymmetric pair removes the need to share a secret (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 8 — Website Attacks',
    question: 'Define a website attack and give FIVE examples.',
    modelAnswer: 'A website attack is any malicious action aimed at compromising a site’s availability, integrity, or confidentiality. Attackers exploit vulnerabilities in web code, servers, and user interactions in order to steal sensitive data, inject malware, hijack user details, or take the site completely offline. Five examples are: SQL injection (SQLi), where malicious input in a search bar or login form manipulates the backend database; cross-site scripting (XSS), where a harmful script is injected into a page and executes in another user’s browser; malware and backdoor attacks, where malicious code or a hidden route back into the site is planted on the server; brute-force login attacks, where automated bots test thousands of credential combinations against admin dashboards or user accounts; and phishing, where a fake copy of a legitimate site tricks visitors into giving up card numbers or login credentials.',
    markScheme: [
      'Defined as any malicious action compromising a site’s availability, integrity or confidentiality (3)',
      'Exploiting vulnerabilities in web code, servers and server–user interactions (2)',
      'SQL injection (SQLi) named (1)',
      'Cross-site scripting (XSS) named (1)',
      'Malware / backdoor attacks named (1)',
      'Brute-force login attacks named (1)',
      'Phishing named (1)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Topic 8 — Website Attacks',
    question: 'Name the FIVE website attacks listed for exam use.',
    items: [
      { name: 'SQL Injection', aliases: ['SQLi', 'SQL'], explain: 'Malicious input in a search bar, login form or other field manipulates the backend database, giving unauthorized access, data theft, or compromise of the host system.' },
      { name: 'Cross-Site Scripting', aliases: ['XSS'], explain: 'A harmful script is injected into a page and executes in another user’s browser, hijacking their session or stealing cookies.' },
      { name: 'Malware / backdoor attacks', aliases: ['malware', 'backdoor', 'backdoor attack'], explain: 'Malicious code, or a hidden route back into the site, is planted on the server.' },
      { name: 'Brute-force login attacks', aliases: ['brute force', 'bruteforce', 'credential stuffing'], explain: 'Automated bots test thousands of credential combinations against admin dashboards or user accounts.' },
      { name: 'Phishing', aliases: [], explain: 'A fake copy of a legitimate site tricks visitors into giving up credit card numbers or login credentials.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 1 — Foundations: Web & Mobile Applications
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 1 — Foundations: Web & Mobile Applications',
    question: 'Define a web application and explain how it works.',
    modelAnswer: 'A web application is software controlled by a centralized server and accessed through browsers with an internet connection. It functions using a combination of server-side and client-side scripts. Server-side scripts, written in languages such as PHP or ASP.NET, manage the storage and retrieval of data, ensuring the application’s core functions are executed on the server. Client-side scripts — typically HTML, CSS and JavaScript — handle the presentation of that information and build the user interface. When a user interacts with a web application, their browser sends a request to the server; the server processes it and returns the necessary data; the browser then uses client-side scripts to display that data in a readable, interactive format. This request–response cycle is what allows a web application to serve dynamic content. Web applications support various protocols, such as HTTP (Hypertext Transfer Protocol).',
    markScheme: [
      'Defined — software controlled by a centralized server, accessed through browsers with an internet connection (2)',
      'Server-side scripts manage storage and retrieval of data; PHP or ASP.NET named (2)',
      'Client-side scripts present the information and build the interface; HTML/CSS named (2)',
      'Request–response cycle — the browser sends a request, the server processes it and returns data (2)',
      'The browser then renders the returned data in a readable, interactive format (1)',
      'Supports protocols such as HTTP (1)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 1 — Foundations: Web & Mobile Applications',
    question: 'Differentiate between a web application and a mobile application.',
    modelAnswer: 'A mobile application is software installed directly on a user’s device (iOS or Android), designed to run on a mobile device or tablet, whereas a web application runs in a browser and is controlled by a centralized server. They differ as follows. Access: a web app can be reached from any device with an internet connection, while a mobile app is designed for a specific platform and must be downloaded and installed before use. Cost: a web app is easier and cheaper to develop and maintain because a single version works across all platforms, while a mobile app is more complex and expensive because it must be built for each platform separately. Performance: a web app depends on the speed and reliability of the user’s internet connection, while a mobile app offers offline access and faster performance. Compatibility: a web app faces browser-compatibility issues since browsers differ in how they interpret code, while a mobile app has none because it is built for specific platforms. Security: a web app is more exposed to attacks such as XSS and SQL injection because it depends on the internet and web servers, while a mobile app stores data on the device and protects it with encryption and authentication.',
    markScheme: [
      'Mobile application defined — software installed directly on the user’s device, built for iOS or Android (2)',
      'Access — reachable from any device with a connection vs must be downloaded and installed for a specific platform (2)',
      'Cost — one version across all platforms vs a separate build per platform (2)',
      'Performance — dependent on the internet connection vs offline access and faster performance (2)',
      'Compatibility — browser-compatibility issues vs none, being built for specific platforms (2)',
      'Security — exposed to XSS and SQL injection vs data stored on the device with encryption and authentication (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 1 — Foundations: Web & Mobile Applications',
    question: 'Distinguish between server-side and client-side scripts, giving examples of each.',
    modelAnswer: 'Server-side scripts run on the web server rather than in the user’s browser, and are responsible for managing the storage and retrieval of data — tasks such as talking to a database or processing a login. Examples are PHP and ASP.NET. Client-side scripts run in the browser itself and control the presentation of information and what the page looks like. Examples are HTML and CSS, together with JavaScript.',
    markScheme: [
      'Server-side scripts run on the web server, not in the browser, and manage storage and retrieval of data (2)',
      'Server-side examples — PHP, ASP.NET (1)',
      'Client-side scripts run in the browser and present the information / build the interface (2)',
      'Client-side examples — HTML, CSS (JavaScript) (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 2 — Impact of the Internet & Web Applications on Business
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'Define e-commerce and explain the FOUR types of e-commerce model, giving examples.',
    modelAnswer: 'E-commerce refers to markets enabled by the internet — the buying and selling of goods and services online. There are four models. Business-to-Business (B2B) is businesses dealing with other businesses, including manufacturers, where big businesses connect with smaller businesses; the classic example is Alibaba.com. Business-to-Consumer (B2C) is a business selling directly to consumers, with the manufacturer sending products straight to the customer; examples are Konga, Jumia and Temu. Consumer-to-Business (C2B) is the reverse of B2C — a consumer offers products or services to businesses, and often advertises those businesses themselves. Consumer-to-Consumer (C2C) is consumers providing goods and services to other consumers, usually through a platform that connects them.',
    markScheme: [
      'E-commerce defined — markets enabled by the internet, the buying and selling of goods and services online (2)',
      'B2B — businesses dealing with other businesses, including manufacturers (2)',
      'B2C — a business selling directly to consumers (2)',
      'C2B — the reverse of B2C, a consumer offering products or services to businesses (2)',
      'C2C — consumers providing goods and services to other consumers through a connecting platform (2)',
      'At least two correct examples named (Alibaba for B2B; Konga, Jumia or Temu for B2C) (2)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'Name the FOUR e-commerce models.',
    items: [
      { name: 'Business-to-Business', aliases: ['B2B'], explain: 'Businesses dealing with other businesses, including manufacturers — big businesses connecting with smaller ones. Example: Alibaba.com.' },
      { name: 'Business-to-Consumer', aliases: ['B2C'], explain: 'A business sells directly to consumers; the manufacturer sends products straight to the customer. Examples: Konga, Jumia, Temu.' },
      { name: 'Consumer-to-Business', aliases: ['C2B'], explain: 'The reverse of B2C — a consumer offers products or services to businesses, and often advertises those businesses themselves.' },
      { name: 'Consumer-to-Consumer', aliases: ['C2C'], explain: 'Consumers provide goods and services to other consumers, usually through a platform that connects them.' },
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'State FOUR benefits of e-commerce to a business.',
    modelAnswer: 'E-commerce reduces operational cost; it extends the operating hours of the business, since an online store never closes; it increases sales conversion; and it optimises business processes.',
    markScheme: [
      'Reduces operational cost (1)',
      'Extends the operating hours of the business — an online store never closes (1)',
      'Increases sales conversion (1)',
      'Optimises business processes (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'Define teleconferencing and state THREE benefits of teleconferencing and remote collaboration to a business.',
    modelAnswer: 'Teleconferencing is the use of digital technology to communicate between businesses or individuals located in different geographical areas. Its benefits are that it fosters faster decision-making; it lowers or eliminates travel and transport costs; and it gives a business access to a wider pool of talent, regardless of location.',
    markScheme: [
      'Teleconferencing defined — use of digital technology to communicate between businesses or individuals in different geographical areas (3)',
      'Fosters faster decision-making (1)',
      'Lowers or eliminates travel and transport costs (1)',
      'Gives access to a wider pool of talent regardless of location (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'Name the FOUR types of teleconferencing / remote collaboration.',
    items: [
      { name: 'Audio Conferencing', aliases: ['audio'], explain: 'Communication by voice only, with no video — for example a conference phone call.' },
      { name: 'Video Conferencing', aliases: ['video'], explain: 'Participants see and hear each other in real time — for example Zoom or Google Meet.' },
      { name: 'Web Conferencing', aliases: ['web'], explain: 'Online meetings that add shared screens, slides and documents to the call.' },
      { name: 'Hybrid Conferencing', aliases: ['hybrid'], explain: 'Combines in-person and remote participants in the same meeting.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'Name FIVE types of internet marketing or advertising.',
    items: [
      { name: 'Search Engine Optimization', aliases: ['SEO'], explain: 'Researching and using the right keywords so a page attracts relevant search traffic.' },
      { name: 'Content and social media marketing', aliases: ['content marketing', 'social media marketing', 'social media'], explain: 'Reaching customers through published content and social platforms.' },
      { name: 'Email marketing', aliases: ['email'], explain: 'Marketing delivered directly to the customer’s inbox.' },
      { name: 'Affiliate marketing', aliases: ['affiliate'], explain: 'Third parties promote the business in exchange for a share of the resulting sales.' },
      { name: 'Advertising by SMS', aliases: ['SMS', 'SMS advertising', 'text message advertising'], explain: 'Marketing messages delivered as text messages to the customer’s phone.' },
    ],
  },

  {
    type: 'longform',
    marks: 7,
    source: 'Topic 2 — Impact of the Internet & Web Applications on Business',
    question: 'State FOUR challenges faced by businesses impacted by the internet, and THREE solutions to them.',
    modelAnswer: 'The challenges are cybersecurity threats; data privacy and compliance; high cost; and bandwidth management of internet services. The solutions are to avoid service providers that do not offer reliable internet service; to implement an automatic failover system; and to install a firewall and antivirus on your devices.',
    markScheme: [
      'Challenge — cybersecurity threats (1)',
      'Challenge — data privacy and compliance (1)',
      'Challenge — high cost (1)',
      'Challenge — bandwidth management of internet services (1)',
      'Solution — avoid service providers that do not offer reliable internet service (1)',
      'Solution — implement an automatic failover system (1)',
      'Solution — install a firewall and antivirus on your devices (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 3 — Principles & Strategies for Secure Design
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 7,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'State SEVEN reasons why systems are attacked.',
    items: [
      { name: 'Recreational', aliases: ['for fun', 'fun', 'curiosity', 'recreation'], explain: 'Curiosity or a technical challenge, without intent to cause damage.' },
      { name: 'Fame', aliases: ['recognition', 'notoriety'], explain: 'The desire for recognition within a hacking community.' },
      { name: 'Activism', aliases: ['hacktivism', 'hacktivist'], explain: 'Pursuing a political, social, or ideological cause.' },
      { name: 'Financial gain', aliases: ['money', 'financial', 'profit'], explain: 'The most common driver of serious cybercrime — fraud, extortion, data resale.' },
      { name: 'Coercion', aliases: ['blackmail', 'coerced'], explain: 'An individual is forced or blackmailed into compromising a system.' },
      { name: 'Destruction', aliases: ['disruption', 'destroy'], explain: 'Intent to disrupt, delete, or disable systems and data.' },
      { name: 'Espionage', aliases: ['spying', 'spy'], explain: 'Gathering confidential information for competitive, corporate, or state advantage.' },
    ],
  },

  {
    type: 'recall',
    marks: 7,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Name SEVEN threat actor profiles.',
    items: [
      { name: 'Hobbyists', aliases: ['hobbyist'], explain: 'Informal, curiosity-driven individuals, often with limited resources.' },
      { name: 'Government & law-enforcement agencies', aliases: ['government', 'law enforcement', 'state actors', 'police'], explain: 'Acting under legal authority, though their tools and techniques mirror those of attackers.' },
      { name: 'Activists', aliases: ['activist', 'hacktivists'], explain: 'Acting in pursuit of a cause rather than personal gain.' },
      { name: 'Cyberterrorists', aliases: ['cyberterrorist', 'terrorists'], explain: 'Seeking to cause fear, disruption, or harm at scale.' },
      { name: 'Criminal actors', aliases: ['criminals', 'organized crime', 'criminal'], explain: 'Organized groups pursuing financial gain.' },
      { name: 'Insiders', aliases: ['insider', 'employees', 'insider threat'], explain: 'Employees or contractors who already hold legitimate access, making them uniquely positioned to cause damage.' },
      { name: 'AI-augmented hackers', aliases: ['AI hackers', 'AI augmented', 'AI-assisted hackers'], explain: 'An emerging category using automated and AI-assisted tools to scale reconnaissance and attacks.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain why an authentication-only security strategy fails against the insider threat, and state what controls answer it.',
    modelAnswer: 'Insiders are employees or contractors who already hold legitimate access to the system. Because they already possess valid credentials, they are uniquely positioned to cause damage: they pass every authentication check by design, so an authentication-only strategy — which is built to stop outsiders getting in — is defeated by anyone who is already legitimately logged in. What answers the insider threat is behavioural control applied after access is granted: time- and volume-constrained access, which terminates a session that runs unusually long or transfers unusually large volumes, and input and request filtering, which inspects each request for consistency rather than trusting it because the user is authenticated.',
    markScheme: [
      'Insider defined — an employee or contractor who already holds legitimate access (2)',
      'Uniquely positioned to cause damage because they already hold valid credentials (2)',
      'An authentication-only strategy is therefore defeated by someone already legitimately logged in (1)',
      'Controls that answer it — time/volume-constrained access and input/request filtering (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain two-factor authentication (2FA) and how it operates.',
    modelAnswer: '2FA adds a second, independently generated credential on top of the known password. During registration the system collects an alternative contact point — typically a phone number or email address. At login, the system sends a one-time code, commonly of four to eight digits, to that channel. The correct password alone is not sufficient: the generated code must also be supplied before access is granted. Banking systems commonly trigger 2FA for transactions above a customer’s normal threshold — for example requiring an OTP only once a transfer exceeds a set amount, even when the PIN entered is correct.',
    markScheme: [
      '2FA defined — a second, independently generated credential on top of the known password (2)',
      'Registration collects an alternative contact point — a phone number or email address (2)',
      'At login a one-time code, commonly 4–8 digits, is sent to that channel (2)',
      'The password alone is not sufficient; the generated code must also be supplied (1)',
      'Banking example — an OTP triggered for transactions above the customer’s normal threshold (1)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Describe the classic social-engineering attack against two-factor authentication, and explain how a customer can recognise it.',
    modelAnswer: 'The attacker already holds the card’s PIN or CVV, but not the one-time code. They telephone the victim, fabricate an urgent story, and ask the victim to read out the OTP that has just been sent to their phone. If the victim complies, the attacker has completed the second factor themselves and the transaction goes through. A customer can recognise it by one rule: a legitimate institution never needs a customer to read back an OTP over the phone, because the institution is the party that generated the code in the first place.',
    markScheme: [
      'The attacker already holds the PIN or CVV (1)',
      'They telephone the victim and fabricate an urgent story (1)',
      'They ask the victim to read out the OTP just sent to their phone (1)',
      'The attacker thereby supplies the second factor and completes the transaction (1)',
      'Recognition rule — a legitimate institution never asks a customer to read back an OTP (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain three-factor authentication (3FA) and multi-party authentication, showing how each differs from 2FA.',
    modelAnswer: '3FA differs from 2FA in requiring authorization from two or more distinct devices, rather than allowing a single device to both request and approve access. A request initiated on a phone may need to be approved from a separate computer. This is typical of banking-sector workflows, where a transaction is initiated by one staff member, reviewed by a second, and authorized by a branch manager before it completes — sometimes with a deliberate delay built in while approvals are finalized. In multi-party authentication, the individual originating a request must wait for a second individual holding higher-level credentials to approve it before access is granted. A familiar consumer example is location-based step-up verification: if a user appears to log in from one country and, within an implausibly short time, a new login attempt appears from another, providers such as Google or Apple may require verification from another trusted device before granting access — because the same credentials used from two impossible locations in a short window is a strong signal of compromise.',
    markScheme: [
      '3FA defined — requires authorization from two or more distinct devices (2)',
      'A single device cannot both request and approve access (1)',
      'Banking workflow example — initiated by one officer, reviewed by a second, authorized by a manager (2)',
      'Multi-party authentication — the originator waits for a second individual with higher-level credentials to approve (2)',
      'Impossible-travel example — verification required from another trusted device (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain time- or volume-constrained access, and give TWO reasons why a system should apply it.',
    modelAnswer: 'Even after legitimate access is granted, a system should limit how long a session may run and how much data may be retrieved within a given period. When a session exceeds its allotted time or volume threshold, the system should automatically terminate it and require re-authentication. The first reason is that large-scale data theft takes time: the larger the dataset, the longer it takes to copy over a network, so a session that runs unusually long or transfers unusually large volumes is a red flag. The second is that idle sessions are a liability — an authenticated session left open, such as a banking app left unattended, is an opportunity for someone else to act on the user’s behalf.',
    markScheme: [
      'Defined — limiting how long a session may run and how much data may be retrieved in a period (2)',
      'A session exceeding the threshold is terminated automatically and must re-authenticate (1)',
      'Reason — large-scale data theft takes time, so an unusually long session or large transfer is a red flag (2)',
      'Reason — idle authenticated sessions are a liability, allowing someone else to act on the user’s behalf (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Define graceful degradation and state TWO practices that support it.',
    modelAnswer: 'Graceful degradation is the practice of designing a system so that, if part of it is compromised or attacked, only the affected component is isolated or shut down while the rest continues to function. The goal is to contain a breach to the smallest possible part of the system, buying time to resolve it while the service remains available to legitimate users. Two practices support it: migrating data that is not needed for real-time operations offline, so it is not exposed to a live attack surface; and designing fallback functionality so that a compromised data table or module can be cut off and shut down temporarily without taking the entire application offline.',
    markScheme: [
      'Defined — if part of the system is compromised, only the affected component is isolated or shut down while the rest continues (3)',
      'Goal — contain the breach to the smallest part, buying time while the service stays available (1)',
      'Practice — migrate data not needed for real-time operations offline (1)',
      'Practice — design fallback functionality so a compromised module can be cut off without taking the whole application down (1)',
    ],
  },

  {
    type: 'longform',
    marks: 7,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain biometric authentication and liveness detection, naming common modalities and TWO typical liveness checks.',
    modelAnswer: 'Biometric authentication verifies identity using a physical characteristic rather than — or in addition to — a password. Liveness detection is used alongside it to confirm that the biometric sample comes from a live person and not a photograph, mask, or other spoof. Common modalities are facial recognition, iris recognition, fingerprint recognition and full palm recognition. Typical liveness checks prompt the user to blink, since the eye blinks involuntarily within roughly sixty seconds, or to open their mouth, since the tongue and soft tissue cannot be held perfectly still. Financial platforms use this during tiered KYC verification in mobile money apps, as part of onboarding a customer to a higher access level.',
    markScheme: [
      'Biometric authentication defined — verifying identity using a physical characteristic rather than or alongside a password (2)',
      'Liveness detection defined — confirming the sample comes from a live person, not a photograph, mask or other spoof (2)',
      'At least two modalities named from facial, iris, fingerprint, full palm (1)',
      'Liveness check — blinking, as the eye blinks involuntarily within roughly sixty seconds (1)',
      'Liveness check — opening the mouth, as the tongue and soft tissue cannot be held perfectly still (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Define steganography and distinguish it from encryption.',
    modelAnswer: 'Steganography hides data or a message inside an ordinary-looking file — commonly an image — rather than encrypting it into obviously unreadable ciphertext. For example, a sensitive text file describing a security vulnerability could be embedded within an innocuous photograph and transmitted over a public channel. The distinction from encryption is that encryption protects the confidentiality of a message but signals that something is being protected, since the ciphertext is visibly unreadable, whereas steganography conceals the very existence of the message from anyone intercepting the file. They solve different problems and can be combined.',
    markScheme: [
      'Steganography defined — hiding data or a message inside an ordinary-looking file, commonly an image (2)',
      'Example — a sensitive text file embedded within an innocuous photograph and sent over a public channel (1)',
      'Encryption protects confidentiality but signals that something is being protected (1.5)',
      'Steganography conceals the very existence of the message (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 3 — Principles & Strategies for Secure Design',
    question: 'Explain the principle of defence in depth, and describe any FOUR design-level security controls that can be layered to protect an application.',
    modelAnswer: 'Defence in depth is the principle that security controls are layered rather than alternatives: a well-designed system combines several of them so that if one layer fails, another still limits the damage an intruder can do. No single control is sufficient on its own. Four such controls are: a password policy, which enforces minimum length, mixed case and at least one special character at the point an account is created, defending against weak or easily guessed credentials; two-factor authentication, which adds an independently generated one-time code so that a stolen password alone is not enough; time- or volume-constrained access, which terminates sessions that run too long or retrieve too much data, defending against bulk exfiltration and idle-session hijack; and input and request filtering, which inspects the signature of each request for consistency — for example whether the requesting IP address remains stable within a short window — and flags or restricts anomalous requests, which also underlies geo-gating and VPN detection.',
    markScheme: [
      'Defence in depth stated — controls are layered rather than alternatives, so that if one fails another still limits the damage (2)',
      'First control correctly named and explained (2)',
      'Second control correctly named and explained (2)',
      'Third control correctly named and explained (2)',
      'Fourth control correctly named and explained (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 4 — Mobile Threats & Secure Development Practices
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 4 — Mobile Threats & Secure Development Practices',
    question: 'Explain why secure mobile development starts from a different assumption than secure web development.',
    modelAnswer: 'A mobile application runs on hardware the user carries, lends and loses; on an operating system the developer does not control; and over networks the developer cannot trust. The server-side defences a web application leans on — host firewalls, intrusion detection, antivirus and a locked server room — are simply not present on a handset. Secure mobile development therefore starts from the assumption that the device itself is hostile: the code will be reverse-engineered, the local storage will be read, and the traffic will be intercepted. The underlying difference is where the blast radius sits: web risk is centralised on the server, so one compromised server affects every user, while mobile risk is decentralised onto thousands of individual devices, each of which an attacker may physically hold.',
    markScheme: [
      'Runs on hardware the user carries, lends and loses (2)',
      'Runs on an OS the developer does not control, over networks the developer cannot trust (2)',
      'Server-side defences are absent — no host firewall, IDS, antivirus or locked server room (2)',
      'Assume the device is hostile — code reverse-engineered, storage read, traffic intercepted (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 4 — Mobile Threats & Secure Development Practices',
    question: 'List and explain any FIVE of the top issues facing mobile devices.',
    modelAnswer: 'Physical security — information is lost with the device itself, or read by whoever borrows it; on mobile, physical security has historically meant little-to-no security. Secure data storage on disk — password files, tokens and other sensitive material are held locally and must be kept from unauthorised readers while remaining available to the applications that legitimately need them. Strong authentication with poor keyboards — a password mixing letters, numbers, special characters and spaces is difficult if not impossible to type on a small on-screen keyboard, so users pick weaker secrets. Application isolation — corporate, gaming and social applications sit side by side on one device, so isolating each application and the data it holds from the others is critical. Difficult patching and update process — patching is a coordination problem rather than a technical one, since the OS developer, the handset vendor and the carrier must all agree, and carriers have very little time to test. (Other acceptable answers include multiple-user support, safe browsing environment, secure operating systems, information disclosure, malware, enforcement of SSL, phishing, CSRF, location privacy, insecure device drivers and multifactor authentication.)',
    markScheme: [
      'First issue correctly named and explained (2)',
      'Second issue correctly named and explained (2)',
      'Third issue correctly named and explained (2)',
      'Fourth issue correctly named and explained (2)',
      'Fifth issue correctly named and explained (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 4 — Mobile Threats & Secure Development Practices',
    question: 'State and explain any FIVE tips for secure mobile application development.',
    modelAnswer: 'Leverage TLS/SSL — turn transport security on by default and enable both confidentiality and integrity protection, since many deployments enforce confidentiality but quietly skip integrity. Validate input — mandatory for both native and mobile web applications, because a phone has no host firewall, no IDS and no antivirus, so basic sanitisation of every input is the only line of defence. Use the least-privilege model for system access — enumerate the smallest set of services, permissions, files and processes the application actually needs and limit it to those, so a compromised application cannot affect anything else. Store sensitive information properly — never write usernames, passwords or tokens to the device in clear text; use the platform’s own encryption and credential-store APIs. Zero out the non-threats — build a threat model, enumerate the real threats, design mitigations for them, and record the rest as consciously accepted risk. (Other acceptable answers include following secure programming practices, leveraging the OS permissions model, signing the application’s code, designing a secure update process, understanding the mobile browser’s limits, and using secure, intuitive mobile URLs.)',
    markScheme: [
      'First tip correctly named and explained (2)',
      'Second tip correctly named and explained (2)',
      'Third tip correctly named and explained (2)',
      'Fourth tip correctly named and explained (2)',
      'Fifth tip correctly named and explained (2)',
    ],
  },

  {
    type: 'recall',
    marks: 10,
    source: 'Topic 4 — Mobile Threats & Secure Development Practices',
    question: 'Name the TEN risks on the OWASP Mobile Top 10.',
    items: [
      { name: 'Insecure data storage', aliases: ['insecure storage'], explain: 'Store only what is absolutely required, never in a public area such as an SD card. Use secure containers and the platform’s encryption APIs, and never mark files world-readable or world-writable.' },
      { name: 'Weak server-side controls', aliases: ['weak server side controls', 'server-side controls'], explain: 'A mobile front end does not remove the server’s obligations — apply the OWASP Web, Cloud and Web Services Top 10s to the backend the app talks to.' },
      { name: 'Insufficient transport layer protection', aliases: ['transport layer protection', 'insufficient transport protection'], explain: 'Encrypt all sensitive data leaving the device, over carrier networks, Wi-Fi and NFC alike. When the platform throws a security exception it is usually right.' },
      { name: 'Client-side injection', aliases: ['client side injection', 'injection'], explain: 'Sanitise or escape untrusted data before rendering or executing it, use prepared statements rather than string concatenation, and minimise native capabilities exposed to hybrid web content.' },
      { name: 'Poor authorisation and authentication', aliases: ['poor authorization and authentication', 'weak authentication'], explain: 'Out-of-band verification is meaningless when both factors arrive on the same device, and a device ID or subscriber ID must never be the sole authenticator.' },
      { name: 'Improper session handling', aliases: ['session handling', 'improper sessions'], explain: 'Re-authenticate periodically, ensure tokens can be revoked quickly when a device is lost or stolen, and generate tokens from high-entropy sources.' },
      { name: 'Security decisions via untrusted inputs', aliases: ['security decisions from untrusted inputs', 'untrusted inputs'], explain: 'Check the caller’s permissions at every input boundary and prompt for additional authorisation before acting on a sensitive request.' },
      { name: 'Side-channel data leakage', aliases: ['side channel data leakage', 'data leakage', 'side-channel leakage'], explain: 'Never log credentials or personal data to system logs; strip sensitive data before screenshots, disable per-field keystroke logging, and apply anti-caching directives to web content.' },
      { name: 'Broken cryptography', aliases: ['broken crypto', 'weak cryptography'], explain: 'Storing the key alongside the encrypted data negates the encryption entirely. Use battle-tested crypto libraries rather than writing your own.' },
      { name: 'Sensitive information disclosure', aliases: ['information disclosure', 'sensitive data disclosure'], explain: 'Keep private API keys off the client, keep proprietary business logic on the server, and never hardcode a password.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 5 — Mobile Platform Security Models: iOS vs Android
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 5 — Mobile Platform Security Models — iOS vs Android',
    question: 'Compare the Apple iOS and Google Android security models under any SIX aspects.',
    modelAnswer: 'Distribution: iOS applications are distributed through the App Store only, reviewed by Apple before release and revocable at Apple’s discretion, while Android allows Google Play or side-loading, with the package installer rejecting any unsigned application. Code signing: iOS requires a valid code-signing certificate tied to membership of the Apple Developer Program and does not permit self-signing, while Android requires every application to be signed but permits developers to self-sign with a certificate they generate themselves. Application isolation: each iOS application is installed into its own GUID directory and cannot read or write another application’s directory, while each Android application is given a unique Linux user ID at install time and kept apart by UNIX file permissions. Permissions: iOS requests them at the point of use through a popup shown when the API is first called, while Android declares them in the application manifest and shows them before install, after which the permission set cannot be changed. Credential storage: iOS provides the Keychain, a dedicated encrypted store for passwords, certificates and secrets, while Android offers SharedPreferences and application-private files protected by UNIX permissions rather than a dedicated secret store. External storage: iOS has no user-accessible removable storage, while Android widely supports memory cards, and data written to them is unprotected and readable by other applications.',
    markScheme: [
      'Distribution — App Store only with Apple review vs Play or side-loading with unsigned packages rejected (2)',
      'Code signing — Apple Developer Program certificate required, no self-signing vs self-signed certificates permitted (2)',
      'Application isolation — per-GUID directory vs unique Linux UID with UNIX file permissions (2)',
      'Permissions — requested at point of use via popup vs declared in the manifest and frozen at install (2)',
      'Credential storage — the Keychain vs SharedPreferences and application-private files (2)',
      'External storage — no removable storage vs memory cards whose contents are unprotected (2)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 5 — Mobile Platform Security Models — iOS vs Android',
    question: 'Name the FOUR Android permission protection levels.',
    items: [
      { name: 'Normal', aliases: [], explain: 'For features whose consequences are minor — VIBRATE is the standard example. Users can review them but may not be explicitly warned.' },
      { name: 'Dangerous', aliases: [], explain: 'For permissions such as WRITE_SETTINGS and SEND_SMS, which could reconfigure the device or incur charges. Android warns the user at install.' },
      { name: 'Signature', aliases: [], explain: 'Granted only to applications signed with the same key as the program that declared the permission, letting a developer’s own applications coordinate securely.' },
      { name: 'SignatureOrSystem', aliases: ['signature or system'], explain: 'As Signature, except that programs on the system image also qualify. It exists so custom Android builds can integrate with system components.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    source: 'Topic 5 — Mobile Platform Security Models — iOS vs Android',
    question: 'Name the FIVE securable inter-process communication (IPC) mechanisms in Android.',
    items: [
      { name: 'Activity', aliases: ['activities'], explain: 'An interactive screen used to communicate with the user. An Intent specifies which Activity is wanted.' },
      { name: 'Broadcast', aliases: ['broadcasts', 'broadcast receiver'], explain: 'A way to send a message between applications; the sender puts the message into an Intent and broadcasts it.' },
      { name: 'Service', aliases: ['services'], explain: 'A background process that does its work quietly, without a user interface.' },
      { name: 'ContentProvider', aliases: ['content provider'], explain: 'Shares relational data between processes efficiently and securely. ContentProviders are SQL-based, which is also why they are an injection target.' },
      { name: 'Binder', aliases: [], explain: 'A highly efficient low-level communication mechanism, commonly used to bridge Java and native code running in separate processes.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 5 — Mobile Platform Security Models — iOS vs Android',
    question: 'Explain application signing on both mobile platforms, and state what it does and does not guarantee.',
    modelAnswer: 'Every application run on Android must be signed by its developer; an unsigned application is rejected by Google Play or by the package installer on the device. The signed certificate is what associates a user ID with an application, and that association is what stops one application reaching another except through well-defined IPC. Android deliberately allows developer-generated self-signed certificates, requiring no external assistance or permission. Apple iOS, by contrast, requires a valid code-signing certificate tied to membership of the Apple Developer Program, and does not allow self-signing. Signing proves the application followed the store’s required practices and determines the privileges the operating system grants it — an unsigned application receives fewer privileges and cannot be distributed through normal channels. What signing does not do is make the code safer: it is a vetting process that ties authorship and privileges to an application, not a measure of how secure that application is.',
    markScheme: [
      'Every Android application must be signed; unsigned applications are rejected by Play or the package installer (1)',
      'The signed certificate associates a user ID with the application, keeping applications apart (1)',
      'Android permits developer self-signed certificates (1)',
      'iOS requires a certificate tied to Apple Developer Program membership and forbids self-signing (1)',
      'Signing proves required practices were followed and determines the privileges the OS grants (1)',
      'Signing is not a statement that the code is secure (1)',
    ],
  },

  {
    type: 'recall',
    marks: 8,
    source: 'Topic 5 — Mobile Platform Security Models — iOS vs Android',
    question: 'Name the EIGHT memory-management hardening measures used by Android.',
    items: [
      { name: 'ProPolice', aliases: ['pro police'], explain: 'Prevents stack buffer overruns.' },
      { name: 'safe_iop', aliases: ['safe iop'], explain: 'Reduces integer overflows.' },
      { name: 'OpenBSD dlmalloc extensions', aliases: ['dlmalloc', 'openbsd dlmalloc', 'malloc'], explain: 'Extensions to OpenBSD dlmalloc, to prevent double-free vulnerabilities and chunk consolidation attacks.' },
      { name: 'OpenBSD calloc', aliases: ['calloc'], explain: 'Prevents integer overflows during memory allocation.' },
      { name: 'Format-string vulnerability protections', aliases: ['format string protections', 'format string'], explain: 'Guards against format-string vulnerabilities.' },
      { name: 'No eXecute (NX)', aliases: ['NX', 'NX bit', 'no execute'], explain: 'Hardware-based protection preventing code execution on the stack and heap.' },
      { name: 'mmap_min_addr', aliases: ['mmap min addr'], explain: 'Linux protection mitigating null-pointer-dereference privilege escalation.' },
      { name: 'Address Space Layout Randomisation', aliases: ['ASLR', 'address space layout randomization'], explain: 'Randomises key locations in memory so an attacker cannot predict them.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 6 — Mobile Bearer Layers
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 6 — Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
    question: 'Explain the "WAP gap", and state how WAP 2.0 addresses it.',
    modelAnswer: 'WAP was the original method of reaching the internet from a mobile device, with a WAP gateway acting as a proxy that translated content between the handset and an ordinary HTTP server. Under WAP 1.0, WTLS was used between the client and the gateway, and SSL/TLS between the gateway and the server. Because these are two separate encrypted sessions, traffic had to be decrypted and then re-encrypted at the gateway, meaning it existed briefly in plaintext at that point. That plaintext exposure is what is known as the WAP gap. WAP 2.0 supports full end-to-end TLS, which closes the gap: the gateway becomes optional and is kept only for optimisation, and WTLS is no longer needed.',
    markScheme: [
      'WAP was the original method of reaching the internet from a mobile device (1)',
      'The WAP gateway acts as a proxy translating content between handset and HTTP server (2)',
      'WAP 1.0 used WTLS between client and gateway, and SSL/TLS between gateway and server (2)',
      'Traffic is decrypted and re-encrypted at the gateway, existing in plaintext there — the WAP gap (2)',
      'WAP 2.0 supports full end-to-end TLS, making the gateway optional and WTLS unnecessary (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 6 — Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
    question: 'Name the FOUR Bluetooth security features.',
    items: [
      { name: 'Pairing', aliases: ['pair'], explain: 'Two devices establish a link and agree to communicate, generating the keys later used for authentication and encryption. Before v2.1 this relied on a PIN of up to 128 bits; v2.1 introduced Secure Simple Pairing using Elliptic Curve Diffie-Hellman.' },
      { name: 'Authentication', aliases: ['authenticate'], explain: 'A challenge-response exchange in which the verifier checks the claimant’s identity, computed from a random number, the claimant’s Bluetooth device address and the secret key generated at pairing.' },
      { name: 'Authorisation', aliases: ['authorization', 'authorise', 'authorize'], explain: 'Decides what a device or service may access. Devices are trusted or untrusted; services are Level 1 (authentication and authorisation), Level 2 (authentication only) or Level 3 (open to all).' },
      { name: 'Confidentiality', aliases: ['encryption', 'confidential'], explain: 'Provided by the E0 stream cipher in one of three modes — Mode 1 encrypts nothing, Mode 2 encrypts point-to-point traffic only, and Mode 3 encrypts both point-to-point and broadcast traffic.' },
    ],
  },

  {
    type: 'longform',
    marks: 7,
    source: 'Topic 6 — Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
    question: 'State SEVEN recommendations for securing Bluetooth devices.',
    modelAnswer: 'Use complex PINs; limit radio power in high-security environments; enable only the services and profiles actually needed; keep devices non-discoverable except while pairing; require mutual authentication; configure the maximum allowable encryption key size; and unpair a lost or stolen device from everything it was paired with.',
    markScheme: [
      'Use complex PINs (1)',
      'Limit radio power in high-security environments (1)',
      'Enable only the services and profiles actually needed (1)',
      'Keep devices non-discoverable except while pairing (1)',
      'Require mutual authentication (1)',
      'Configure the maximum allowable encryption key size (1)',
      'Unpair a lost or stolen device from everything it was paired with (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 6 — Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
    question: 'Distinguish SMS from MMS, and differentiate protocol attacks from application attacks against them.',
    modelAnswer: 'SMS carries a short message of up to 160 characters between subscribers; the raw message is a Protocol Data Unit (PDU) carrying header fields — recipient number, encoding, length — as well as the message body. MMS carries images, audio and video as well as text, and although it looks identical to SMS from the user’s point of view, it is a fundamentally different protocol that retrieves content over WSP/HTTP. Protocol attacks abuse legitimate functionality that is meant to be hidden from the user — administrative and provisioning traffic such as updates and voicemail notifications — with examples including the WAP push attack, forged MMS notifications, battery-draining attacks, silent billing attacks and over-the-air settings attacks; they also target flaws in the implementations of the SMS protocols themselves. Application attacks instead target the software that consumes the message and, unlike protocol attacks, are highly specific to the software version — historically the browser, the MMS client or the image parser.',
    markScheme: [
      'SMS — up to 160 characters, carried as a Protocol Data Unit with header fields and a body (2)',
      'MMS — carries images, audio and video, and is a different protocol retrieving content over WSP/HTTP (2)',
      'Protocol attacks abuse hidden legitimate functionality such as administrative and provisioning traffic (2)',
      'Application attacks target the consuming software and are highly specific to the software version (2)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Topic 6 — Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
    question: 'Describe the THREE mobile geolocation methods, giving the typical accuracy of each and where each fails.',
    modelAnswer: 'Tower triangulation is accurate to roughly 50 m – 1,000 m. It is the oldest widely used method: it compares the relative power levels of the radio signals between handset and cell towers, and needs at least two towers. Distance from the towers and varying signal strength make it fairly inexact. GPS is accurate to roughly 5 m – 15 m. It uses satellite signals rather than cellular or wireless infrastructure and can provide continuous updates, which suits real-time applications, but reception is often poor indoors. 802.11 or Wi-Fi positioning is accurate to roughly 10 m – 200 m, though it is sometimes badly wrong. It looks up nearby wireless access points in a large wardriving database; it is faster and more accurate than tower triangulation and works on devices with no GPS, but an access point that has been physically moved yields a confidently wrong answer.',
    markScheme: [
      'Tower triangulation named, with accuracy of roughly 50 m – 1,000 m (1)',
      'Tower triangulation — compares relative signal power between handset and towers, needing at least two (1)',
      'Tower triangulation — inexact because of distance from towers and varying signal strength (1)',
      'GPS named, with accuracy of roughly 5 m – 15 m (1)',
      'GPS — uses satellite signals and can provide continuous updates for real-time applications (1)',
      'GPS — reception is often poor indoors (1)',
      '802.11 / Wi-Fi positioning named, with accuracy of roughly 10 m – 200 m (1)',
      'Wi-Fi positioning — looks up nearby access points in a large wardriving database (1)',
      'Wi-Fi positioning — an access point that has been physically moved yields a confidently wrong answer (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 6 — Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
    question: 'State EIGHT best practices for handling geolocation data in a mobile application.',
    modelAnswer: 'Use the least precise measurement that works; discard the data after use; keep it anonymous; indicate clearly when tracking is on; make it opt-in; publish a privacy policy; do not share positional data with other users or services; and know the local law.',
    markScheme: [
      'Use the least precise measurement that works (1)',
      'Discard the data after use (1)',
      'Keep it anonymous (1)',
      'Indicate clearly when tracking is on (1)',
      'Make it opt-in (1)',
      'Publish a privacy policy (1)',
      'Do not share positional data with other users or services (1)',
      'Know the local law (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 7 — Risks & Threats
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 7,
    source: 'Topic 7 — Risks & Threats',
    question: 'Name SEVEN top web application security risks.',
    items: [
      { name: 'Injection', aliases: ['SQL injection', 'SQLi', 'injection flaws'], explain: 'Untrusted data is sent to an interpreter inside a command or query, tricking it into executing unexpected commands or returning data without proper permission. Common flaws are SQL, NoSQL and LDAP injection.' },
      { name: 'Denial of Service', aliases: ['DoS', 'DDoS', 'distributed denial of service'], explain: 'Attackers generate fake traffic to overload the target server until it stops serving legitimate users; DDoS is the same attack at far larger scale, using botnets of thousands or millions of controlled devices.' },
      { name: 'Cross-Site Request Forgery', aliases: ['CSRF'], explain: 'Victims are tricked into making unwanted requests, and the attacker leverages their existing authentication to impersonate them and act on their behalf.' },
      { name: 'Cross-Site Scripting', aliases: ['XSS'], explain: 'Client-side scripts are injected into web pages to intercept sessions, impersonate users, read sensitive information, tamper with the site, or redirect to malicious URLs.' },
      { name: 'Security misconfiguration', aliases: ['misconfiguration'], explain: 'Security controls set incorrectly — unpatched known vulnerabilities, cloud storage exposed with no authentication, insecure defaults, misconfigured HTTP headers, or overly detailed error messages.' },
      { name: 'XML External Entities', aliases: ['XXE', 'XML external entity'], explain: 'A misconfigured XML processor evaluates external entity references, letting an attacker expose internal server files, scan internal ports, cause DoS, or achieve remote code execution.' },
      { name: 'Vulnerable deserialization', aliases: ['insecure deserialization', 'deserialization'], explain: 'Untrusted, attacker-authored data is rebuilt into objects by the language’s deserialization mechanism; in severe cases this enables remote code execution, and otherwise privilege escalation, code injection and replay attacks.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Topic 7 — Risks & Threats',
    question: 'Name SIX common mobile vulnerabilities.',
    items: [
      { name: 'Insecure data storage', aliases: ['insecure storage'], explain: 'Sensitive data — passwords, tokens, personal information — saved on the device in plain, unencrypted form, so anyone with access to the device can read it.' },
      { name: 'Insecure network communication', aliases: ['insecure communication', 'insecure network'], explain: 'Traffic sent without adequate encryption, leaving it open to interception as the device moves between networks.' },
      { name: 'Reverse engineering & code tampering', aliases: ['reverse engineering', 'code tampering', 'tampering'], explain: 'Attackers decompile the app to study its code, find hidden secrets such as API keys, or modify it to bypass security checks.' },
      { name: 'Push notification spam', aliases: ['push notifications', 'push spam'], explain: 'Abuse of the notification channel to deliver unwanted or malicious content to the user.' },
      { name: 'Jailbreak / rooting', aliases: ['jailbreak', 'rooting', 'rooted'], explain: 'A jailbroken or rooted phone removes the manufacturer’s built-in security restrictions, making it far easier for malicious apps to access data they should not.' },
      { name: 'Permission abuse', aliases: ['permissions abuse', 'excessive permissions'], explain: 'Apps requesting far more device permissions — camera, contacts, location — than they actually need, increasing the damage if the app is malicious or compromised.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 7 — Risks & Threats',
    question: 'Explain the FOUR core mobile application risks.',
    modelAnswer: 'Insecure data storage — unencrypted data written to the local file system, such as cached passwords or personal information, can be read by physically acquiring the device, or by another malicious app on it. Reverse engineering and tampering — bad actors decompile the application binary to extract hardcoded API keys, or alter the original app’s code. Man-in-the-Middle (MitM) attacks — devices frequently switch networks, from secure home Wi-Fi to a spoofed public hotspot, which makes unencrypted network traffic highly vulnerable to interception. Unpatched vulnerabilities — developers must surrender control of the operating environment, so security teams depend heavily on end users actually updating their apps and operating system.',
    markScheme: [
      'Insecure data storage — unencrypted local data readable by acquiring the device or via another malicious app (2)',
      'Reverse engineering and tampering — decompiling the binary to extract hardcoded API keys or alter the code (2)',
      'Man-in-the-Middle attacks — frequent network switching leaves unencrypted traffic open to interception (2)',
      'Unpatched vulnerabilities — the developer surrenders control of the environment and depends on users updating (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 8 — Website Attacks
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 8 — Website Attacks',
    question: 'Differentiate between SQL injection and cross-site scripting (XSS).',
    modelAnswer: 'In SQL injection, attackers inject malicious code into search bars, login forms, or other input fields, prompting the backend database to reveal sensitive data. In cross-site scripting, attackers inject harmful scripts into web pages that are then viewed by other users. The distinction is in the target: SQL injection targets the database — the backend — in order to extract or manipulate stored data, whereas XSS targets other users’ browsers — the frontend — by getting a malicious script to run when they view the page. The backend is the server-side logic and database a user never sees directly; the frontend is everything rendered in the browser that the user interacts with.',
    markScheme: [
      'SQL injection defined — malicious code injected into input fields, prompting the backend database to reveal sensitive data (2)',
      'XSS defined — harmful scripts injected into web pages that are then viewed by other users (2)',
      'SQL injection targets the database / backend to extract or manipulate stored data (2)',
      'XSS targets other users’ browsers / frontend by running a malicious script when they view the page (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 8 — Website Attacks',
    question: 'Explain a distributed denial of service (DDoS) attack, and state what makes it harder to block than a simple flood.',
    modelAnswer: 'In a DDoS attack, attackers use a network of compromised devices to flood a website with excessive traffic, overloading the server and making the site unavailable to legitimate users. That network of compromised devices is called a botnet — thousands of infected computers, phones and even smart-home gadgets that an attacker remotely commands to fire traffic at a single target at the same time. The "distributed" in DDoS refers to the traffic coming from many places at once, which is what makes it much harder to block than a flood originating from one machine, since there is no single source address to filter.',
    markScheme: [
      'DDoS defined — a network of compromised devices floods the site with excessive traffic (2)',
      'The server is overloaded and the site becomes unavailable to legitimate users (1)',
      'The network of compromised devices is called a botnet (2)',
      '"Distributed" means traffic arrives from many places at once, making it harder to block (1)',
    ],
  },

  {
    type: 'longform',
    marks: 7,
    source: 'Topic 8 — Website Attacks',
    question: 'Explain cross-site request forgery (CSRF) and state TWO common defences against it.',
    modelAnswer: 'CSRF tricks a victim into unknowingly submitting a malicious request, exploiting the victim’s logged-in identity and privileges to perform an action they never intended — enabling attacks such as financial theft, data breaches and identity theft. In practice, a user logged in to their bank in one tab opens a malicious link in another; that page silently submits a transfer request to the bank, and because the browser automatically attaches the logged-in session cookie to every request to that site, the bank believes the user made the request themselves. Two common defences are CSRF tokens — a secret value the malicious page cannot know, which must accompany the request — and re-confirming sensitive actions before they are carried out.',
    markScheme: [
      'CSRF defined — the victim is tricked into unknowingly submitting a malicious request (2)',
      'It exploits the victim’s logged-in identity and privileges to perform an unintended action (2)',
      'The browser automatically attaches the session cookie, so the site believes the user made the request (1)',
      'Defence — CSRF tokens, a secret the malicious page cannot know (1)',
      'Defence — re-confirming sensitive actions (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 8 — Website Attacks',
    question: 'Define a buffer overflow and explain why it is dangerous beyond simply crashing the program.',
    modelAnswer: 'A buffer overflow is a type of vulnerability where a program, while writing data to a buffer, overruns the buffer’s boundary and overwrites adjacent memory, leading to a system crash. A buffer is a block of memory set aside to hold a fixed amount of data; if the program never checks that the incoming data fits, the excess spills into whatever memory sits next to it. A crash is the visible outcome, but the dangerous case is quieter: if the overwritten memory held the address the program was going to jump to next, a careful attacker can steer execution into code of their own choosing.',
    markScheme: [
      'Defined — writing to a buffer overruns its boundary and overwrites adjacent memory (3)',
      'The immediate consequence is a system crash (1)',
      'A buffer is a block of memory set aside to hold a fixed amount of data (1)',
      'The dangerous case — overwriting the address the program will jump to lets an attacker steer execution (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 9 — Strengths, Weaknesses & Best Practice
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 4,
    source: 'Topic 9 — Strengths, Weaknesses & Best Practice',
    question: 'Name the FOUR application security testing methodologies.',
    items: [
      { name: 'Static Application Security Testing', aliases: ['SAST', 'static testing'], explain: 'Analyzes the app’s source code during development, before the app is running.' },
      { name: 'Software Composition Analysis', aliases: ['SCA'], explain: 'Identifies known vulnerabilities in third-party libraries and open-source components used in the app.' },
      { name: 'Interactive Application Security Testing', aliases: ['IAST', 'interactive testing'], explain: 'Observes app behavior — input, output, data flow and logic — to conduct run-time analysis from inside the running application.' },
      { name: 'Dynamic Application Security Testing', aliases: ['DAST', 'dynamic testing'], explain: 'Analyzes the app while it is running, including servers, and typically requires manual configuration.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 9 — Strengths, Weaknesses & Best Practice',
    question: 'Explain the FOUR testing methodologies used to secure web and mobile applications.',
    modelAnswer: 'Static Application Security Testing (SAST) analyzes the application’s source code during development, before the application is running. Software Composition Analysis (SCA) identifies known vulnerabilities in the third-party libraries and open-source components used in the application. Interactive Application Security Testing (IAST) observes application behaviour — input, output, data flow and logic — to conduct run-time analysis from inside the running application. Dynamic Application Security Testing (DAST) analyzes the application while it is running, including its servers, and typically requires manual configuration.',
    markScheme: [
      'SAST — analyzes source code during development, before the app is running (2)',
      'SCA — identifies known vulnerabilities in third-party libraries and open-source components (2)',
      'IAST — run-time analysis from inside the running application, observing input, output, data flow and logic (2)',
      'DAST — analyzes the running application including servers, typically requiring manual configuration (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 9 — Strengths, Weaknesses & Best Practice',
    question: 'Distinguish between a Web Application Firewall (WAF) and Runtime Application Self-Protection (RASP).',
    modelAnswer: 'A Web Application Firewall protects a web application against malicious attacks by filtering and monitoring HTTP traffic. Runtime Application Self-Protection detects, protects against, and blocks attacks by employing application instrumentation directly inside the running application. The difference is where each sits: a WAF stands guard in front of the application, inspecting HTTP traffic before it arrives, whereas RASP lives inside the running application and stops an attack at the exact moment the code would execute it. They complement each other rather than compete.',
    markScheme: [
      'WAF defined — protects a web app by filtering and monitoring HTTP traffic (2)',
      'RASP defined — blocks attacks using application instrumentation inside the running application (2)',
      'A WAF sits in front of the application, inspecting traffic before it arrives (1)',
      'RASP sits inside the application and stops the attack as the code would execute it (1)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    source: 'Topic 9 — Strengths, Weaknesses & Best Practice',
    question: 'Name the SIX web application security best practices.',
    items: [
      { name: 'Execute input validation', aliases: ['input validation', 'validate input'], explain: 'Verify all data submitted to the application for type, length, format and range before processing it — the primary mitigation for SQL injection and XSS.' },
      { name: 'Employ up-to-date encryption', aliases: ['up to date encryption', 'encryption', 'use encryption'], explain: 'Use TLS with current recommended cipher suites for data in transit, and store passwords using strong hash functions such as SHA-256 or SHA-512.' },
      { name: 'Enhance authentication and authorization', aliases: ['authentication and authorization', 'strong authentication', 'MFA'], explain: 'Implement MFA, set complex password requirements, limit failed login attempts, and use role-based access control so each user holds only the permissions their role needs.' },
      { name: 'Track API usage', aliases: ['API tracking', 'monitor APIs', 'API usage'], explain: 'Ensure every API has adequate authentication and authorization and communicates over encrypted channels; monitor usage and analyse access logs for unusual activity.' },
      { name: 'Record code changes', aliases: ['version control', 'code changes', 'change records'], explain: 'Keep accurate records of updates, bug fixes and new features using a version control system such as Git, so a problem introduced by a recent change can be traced quickly.' },
      { name: 'Employ dynamic testing for security validation', aliases: ['dynamic testing', 'DAST', 'shift security left'], explain: 'Run DAST across every stage of the lifecycle — early testing, staging and production — to catch injection, XSS, broken authentication and insecure direct object references.' },
    ],
  },

  {
    type: 'longform',
    marks: 12,
    source: 'Topic 9 — Strengths, Weaknesses & Best Practice',
    question: 'State and explain the SIX web application security best practices.',
    modelAnswer: 'Execute input validation — verify all data submitted to the application for type, length, format and range before processing it, so attackers cannot inject malicious code; this is the primary mitigation for SQL injection and XSS. Employ up-to-date encryption — use Transport Layer Security with current recommended cipher suites and protocols for data in transit, and store user passwords using strong cryptographic hash functions such as SHA-256 or SHA-512 before they go into the database. Enhance authentication and authorization — implement multi-factor authentication, set complex password requirements, limit failed login attempts to blunt brute-force attacks, and use role-based access control so each user holds only the permissions their role needs. Track API usage — ensure every API the application uses has adequate authentication and authorization and communicates over encrypted channels, and monitor usage routinely while analysing access logs for unusual activity. Record code changes — keep accurate records of updates, bug fixes and new features using a version control system such as Git, so a security problem introduced by a recent modification can be traced quickly. Employ dynamic testing for security validation — run DAST across every stage of the development lifecycle, from early testing through staging to production, to catch injection, XSS, broken authentication and session management, and insecure direct object references.',
    markScheme: [
      'Execute input validation — verifying type, length, format and range before processing (2)',
      'Employ up-to-date encryption — TLS in transit and strong hashing such as SHA-256/SHA-512 for stored passwords (2)',
      'Enhance authentication and authorization — MFA, complex passwords, failed-login limits, role-based access control (2)',
      'Track API usage — authentication, encrypted channels, routine monitoring and log analysis (2)',
      'Record code changes — version control such as Git so a problem from a recent change can be traced (2)',
      'Employ dynamic testing — DAST across every stage of the development lifecycle (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 9 — Strengths, Weaknesses & Best Practice',
    question: 'State SIX advantages and FOUR disadvantages of web applications.',
    modelAnswer: 'The advantages are accessibility; convenience; cost-effectiveness, since one version works across platforms with no separate iOS and Android builds to maintain; updatability, since changes go live for everyone the moment the server is updated; security; and collaboration. The disadvantages are that a web application cannot be used without an internet connection; that its performance depends on the speed and reliability of the user’s internet connection; that it faces browser compatibility issues; and that extra development effort is required to ensure cross-browser and cross-device compatibility.',
    markScheme: [
      'Advantage — accessibility (1)',
      'Advantage — convenience (1)',
      'Advantage — cost-effective, one version across platforms (1)',
      'Advantage — updatability, changes go live the moment the server is updated (1)',
      'Advantage — security (1)',
      'Advantage — collaboration (1)',
      'Disadvantage — cannot be used without an internet connection (1)',
      'Disadvantage — performance depends on the speed and reliability of the connection (1)',
      'Disadvantage — browser compatibility issues (1)',
      'Disadvantage — extra development effort for cross-browser/cross-device compatibility (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 10 — Audit, Compliance & Quality Assurance
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 10 — Audit, Compliance & Quality Assurance',
    question: 'State EIGHT practical measures for maintaining audit compliance and quality assurance in the day-to-day operation of a web or mobile application.',
    modelAnswer: 'Ensure devices are properly secured; apply regular updates and patches; train staff on threat awareness; implement multi-factor authentication; allocate bandwidth to your devices and monitor them regularly; organise regular maintenance; make sure data is encrypted; and implement compliance management tools. Other acceptable measures are performing regular audits, having a technical expert available for support, setting up an in-house IT team, and keeping proper documentation for all system and network configurations.',
    markScheme: [
      'Ensure devices are properly secured (1)',
      'Apply regular updates and patches (1)',
      'Train staff on threat awareness (1)',
      'Implement Multi-Factor Authentication (1)',
      'Allocate bandwidth to devices and monitor them regularly (1)',
      'Organise regular maintenance / perform regular audits (1)',
      'Make sure data is encrypted (1)',
      'Implement compliance management tools / keep proper documentation of configurations (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 10 — Audit, Compliance & Quality Assurance',
    question: 'Distinguish between an audit, compliance, and quality assurance.',
    modelAnswer: 'An audit is a check of what you actually did — reviewing logs and configurations after the fact to establish whether the system was operated as intended. Compliance means meeting the rules that a standard or a law requires. Quality assurance is testing that the application behaves correctly and securely, both before and after release. They are complementary: testing finds a flaw, compliance sets the standard the fix must meet, and the audit is the evidence that the fix was actually applied.',
    markScheme: [
      'Audit — a check of what was actually done, reviewing logs and configurations after the fact (2)',
      'Compliance — meeting the rules a standard or law requires (2)',
      'Quality assurance — testing that the app behaves correctly and securely before and after release (2)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  TOPIC 11 — Web Application Security & the Security Lifecycle
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    source: 'Topic 11 — Web Application Security & the Security Lifecycle',
    question: 'Define web application security and explain the lifecycle approach to it.',
    modelAnswer: 'Web application security is the practice of detecting and preventing cyber attacks on websites and web applications — building websites that are secure to begin with. It is the set of security controls built into a web application to protect it from a growing variety of cyber threats. Web applications inevitably contain bugs and misconfigurations, and some of those are security vulnerabilities an attacker can exploit. Web application security addresses them by leveraging secure development practices, implementing security testing throughout the software development lifecycle, resolving design-level defects, and avoiding security problems during deployment and at runtime. Security is therefore not a phase bolted on before release: it runs from design through development, testing, deployment and live operation. The argument for this is that a design-level defect — an application architected to trust input from its own mobile client, say — cannot be patched away later by a firewall rule; it has to be caught in design.',
    markScheme: [
      'Defined — the practice of detecting and preventing cyber attacks on websites and web applications (2)',
      'A set of security controls built into the application; building websites secure to begin with (1)',
      'Leveraging secure development practices (1)',
      'Implementing security testing throughout the software development lifecycle (SDLC) (2)',
      'Resolving design-level defects (2)',
      'Avoiding security problems during deployment and at runtime (1)',
      'Security is not a phase bolted on before release — it runs from design to live operation (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Topic 11 — Web Application Security & the Security Lifecycle',
    question: 'Explain why web security testing is important, and what is meant by a "negative test".',
    modelAnswer: 'Web security testing focuses on identifying security vulnerabilities in web applications and their configurations, and its primary objective is the application layer. Testing typically involves delivering various input types to provoke errors and cause unexpected system behaviour. These are called negative tests: rather than confirming that the system does what it was designed to do, they investigate whether the system is performing tasks it was never designed to execute. A positive test asks whether the login form accepts a valid password; a negative test asks what happens if a quote mark, ten thousand characters, or a script tag is placed in the username field — and security lives almost entirely in that second question.',
    markScheme: [
      'Testing identifies security vulnerabilities in web applications and their configurations (1)',
      'Its primary objective is the application layer (1)',
      'It involves delivering various input types to provoke errors and unexpected system behaviour (2)',
      'Negative tests investigate whether the system performs tasks it was never designed to execute (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Topic 11 — Web Application Security & the Security Lifecycle',
    question: 'Distinguish between prevention and blocking as approaches to defence, naming the tools used for each and where each sits in the lifecycle.',
    modelAnswer: 'Prevention means finding and removing the vulnerability before an attacker ever reaches it. The tools are SAST, SCA, IAST and DAST. Blocking means stopping the attack in real time as it arrives, without necessarily having removed the underlying flaw. The tools are a Web Application Firewall (WAF) and Runtime Application Self-Protection (RASP). Each sits at a different point in the lifecycle: SAST and SCA operate during development, IAST and DAST during testing and staging, and WAF and RASP in production. Ideally an organisation employs both methods rather than choosing one, since prevention reduces the number of flaws while blocking covers the ones that were missed.',
    markScheme: [
      'Prevention — find and remove the vulnerability before an attacker reaches it (2)',
      'Prevention tools — SAST, SCA, IAST, DAST (1)',
      'Blocking — stop the attack in real time as it arrives (2)',
      'Blocking tools — Web Application Firewall (WAF) and Runtime Application Self-Protection (RASP) (1)',
      'Lifecycle placement — SAST/SCA in development, IAST/DAST in testing and staging, WAF/RASP in production (1)',
      'Ideally an organisation employs both methods, not one (1)',
    ],
  },
];
