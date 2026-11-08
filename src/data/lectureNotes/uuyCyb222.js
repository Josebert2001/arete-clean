export const uuyCyb222LectureNotes = [
      {
        number: '1',
        title: 'Foundations: Web & Mobile Applications',
        covers: [],  // groundwork for the outline, not an outline item itself
        sections: [
          {
            type: 'definition',
            heading: 'Introduction',
            text: 'The web is a collection of documents. The system stores web pages, images, videos, and other resources on a server, all connected through hyperlinks.',
          },
          {
            type: 'bullets',
            heading: 'Key Topics Covered',
            items: [
              'Web app risk',
              'Distinguishing between web apps and mobile apps',
              'Comparison between web risk and mobile app risk',
              'Website attacks, strengths & weaknesses',
              'Best practices for defense',
            ],
          },
          {
            type: 'definition',
            heading: 'Web Application',
            text: 'A web application is software controlled by a centralized server and accessed through browsers with an internet connection. Web apps use a combination of server-side (e.g. PHP, ASP.NET) and client-side (HTML, CSS) scripts to process and present data to the user. Server-side scripts manage the storage and retrieval of data, ensuring web app functions are handled correctly. Web apps support various protocols, such as HTTP (Hypertext Transfer Protocol).',
          },
          {
            type: 'note',
            items: [
              'PHP and ASP.NET are server-side languages — they run on the web server, not in the user’s browser, and are responsible for things like talking to a database or processing a login.',
              'HTML and CSS are client-side — they run in the browser itself and control what the page looks like.',
              'Because web apps depend on a central server, anyone who compromises that server can potentially affect every single user — the core reason web risk is described as “centralized” later in these notes.',
            ],
          },
          {
            type: 'text',
            heading: 'How a Web Application Works',
            text: 'A web application functions using a combination of server-side and client-side scripts. Server-side scripts, written in languages like PHP or ASP.NET, manage the storage and retrieval of data, ensuring the application’s core functions are executed on the server. Client-side scripts — typically HTML, CSS and JavaScript — handle the presentation of that information and build the user interface. When a user interacts with a web application, their browser sends a request to the server; the server processes it and returns the necessary data; the browser then uses client-side scripts to display that data in a readable, interactive format. This request–response cycle is what allows a web application to serve dynamic content.',
          },
          {
            type: 'bullets',
            heading: 'Features of Web Applications',
            items: [
              'Presentation of information to users',
              'Built using the best available web technology, without direct access to device functionality',
              'Support for a variety of protocols — for example HTTP (Hypertext Transfer Protocol)',
            ],
          },
          {
            type: 'note',
            text: '“Without direct access to device functionality” means a web app runs inside the browser’s sandbox — it cannot freely reach the phone’s camera, contacts, or files the way an installed mobile app can. This is a deliberate browser security feature, and it is also why native mobile apps can feel more powerful than websites.',
          },
          {
            type: 'definition',
            heading: 'Mobile Application',
            text: 'A mobile application is software installed directly on a user’s device (iOS or Android), designed to run on a mobile device or tablet. Some mobile apps can also be accessed via an internet connection and a web browser. Mobile apps typically require a version built for each platform, and can provide a more dynamic, interactive user experience with strong collaboration and fast sharing features.',
          },
          {
            type: 'table',
            heading: 'Comparison: Web App vs Mobile App',
            headers: ['Aspect', 'Web Application', 'Mobile Application'],
            rows: [
              ['Access', 'Runs in a web browser and can be reached from any device with an internet connection', 'Designed for a specific platform and must be downloaded and installed on the device before use'],
              ['Development', 'Uses a combination of server-side and client-side scripts to process and present data', 'Uses server-side and client-side scripts as well as native code that reaches the device’s own features'],
              ['Cost', 'Easier and cheaper to develop and maintain — a single version works across all platforms and devices', 'More complex and expensive to develop and update — it must be built for each platform separately'],
              ['Convenience', 'Universally accessible; nothing to download or install, which saves the user time and storage', 'Must be downloaded and installed, consuming time and storage space on the device'],
              ['Performance', 'Depends on the speed and reliability of the user’s internet connection and browser', 'Offers offline access and faster performance, which can improve the user experience'],
              ['Compatibility', 'Faces browser-compatibility issues, since browsers differ in how they interpret code', 'No browser-compatibility issues — it is built for specific platforms and devices'],
              ['Security', 'More exposed to attacks such as XSS and SQL injection, because it depends on the internet and web servers', 'Data is stored on the device and protected with encryption and authentication methods'],
            ],
          },
          {
            type: 'note',
            items: [
              'Read the Security row alongside the “Web Risk vs Mobile App Risk” table in Topic 7 — it is the same distinction the lecturer expects in the exam: web risk is centralised on the server, mobile risk is decentralised onto individual devices.',
              'A mobile app is not automatically “more secure”. Storing data on the device removes the single-server blast radius, but it hands the data to a device an attacker may physically hold — which is why Topic 7 lists insecure data storage and reverse engineering as the top mobile risks.',
              'Watch the Performance and Access rows: a mobile app can work offline, a web app cannot. Several of the guaranteed exam answers turn on exactly that point.',
            ],
          },
        ],
      },
      {
        number: '2',
        title: 'Impact of the Internet & Web Applications on Business',
        date: '8 Jul 2026',
        covers: [1],
        sections: [
          {
            type: 'definition',
            heading: 'Introduction',
            text: 'The internet and web applications have a significant impact on business operations, enabling new models of commerce, communication, and marketing. The sections below outline the key areas of impact: e-commerce, teleconferencing and remote collaboration, marketing and customer engagement, and supply chain and logistics.',
          },
          {
            type: 'definition',
            heading: 'E-commerce',
            text: 'E-commerce refers to markets enabled by the internet — the buying and selling of goods and services online.',
          },
          {
            type: 'table',
            heading: 'Types of E-commerce Models',
            headers: ['Model', 'Description', 'Example'],
            rows: [
              ['Business-to-Business (B2B)', 'Businesses dealing with other businesses, including manufacturers. Big businesses connect with smaller businesses.', 'Alibaba.com'],
              ['Business-to-Consumer (B2C)', 'A business sells directly to consumers; the manufacturer sends products straight to the customer.', 'Konga, Jumia, Temu'],
              ['Consumer-to-Business (C2B)', 'The reverse of B2C — a consumer offers products or services to businesses, and often advertises those businesses themselves.', '—'],
              ['Consumer-to-Consumer (C2C)', 'Consumers provide goods and services to other consumers, usually through a platform that connects them.', '—'],
            ],
          },
          {
            type: 'note',
            items: [
              'An easy way to keep the models apart is to read each one left-to-right as “seller-to-buyer”: B2B is a business selling to a business, B2C a business selling to a consumer, C2B a consumer selling to a business, and C2C a consumer selling to another consumer.',
              'The examples matter for exams: Alibaba is the classic B2B marketplace, while Jumia, Konga and Temu are B2C stores that sell straight to the shopper.',
              'C2B and C2C are the two students most often forget — anchor them to platforms you already use (a paid gig on Fiverr is C2B; a Jiji listing between two individuals is C2C).',
            ],
          },
          {
            type: 'bullets',
            heading: 'Benefits of E-commerce to Business',
            items: [
              'Reduces operational cost',
              'Extends the operating hours of the business — an online store never closes',
              'Increases sales conversion',
              'Optimises business processes',
            ],
          },
          {
            type: 'definition',
            heading: 'Teleconferencing & Remote Collaboration',
            text: 'Teleconferencing is the use of digital technology to communicate between businesses or individuals located in different geographical areas.',
          },
          {
            type: 'termlist',
            heading: 'Types of Teleconferencing / Remote Collaboration',
            items: [
              { term: 'Audio Conferencing', def: 'communication by voice only, with no video — e.g. a conference phone call' },
              { term: 'Video Conferencing', def: 'participants see and hear each other in real time — e.g. Zoom or Google Meet' },
              { term: 'Web Conferencing', def: 'online meetings that add shared screens, slides and documents to the call' },
              { term: 'Hybrid Conferencing', def: 'combines in-person and remote participants in the same meeting' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Benefits of Teleconferencing & Remote Collaboration',
            items: [
              'Fosters faster decision-making',
              'Lowers or eliminates travel and transport costs',
              'Gives a business access to a wider pool of talent, regardless of location',
            ],
          },
          {
            type: 'definition',
            heading: 'Marketing, Advertising & Customer Engagement',
            text: 'The internet lets businesses reach and engage customers directly, and much of it is powered by tracking. When a cookie is dropped on a platform, it records that a person searched for a particular item — which lets the business show that person targeted adverts later.',
          },
          {
            type: 'note',
            text: 'A cookie is a small text file a website stores in your browser to remember you — which items you viewed, whether you are logged in, what is in your cart. Advertisers use these to build a picture of your interests and serve “targeted” ads. It is also why the same product seems to follow you around the web after you look at it once, and it is exactly the kind of tracking that the data-privacy laws mentioned under the challenges below try to regulate.',
          },
          {
            type: 'bullets',
            heading: 'Types of Marketing / Advertising',
            items: [
              'Search Engine Optimization (SEO) — researching and using the right keywords so a page attracts relevant search traffic',
              'Content and social media marketing',
              'Email marketing',
              'Affiliate marketing',
              'Advertising by SMS',
            ],
          },
          {
            type: 'bullets',
            heading: 'Benefits of Marketing, Advertising & Customer Engagement',
            items: [
              'Cost-effective, with a higher return on investment',
              'Precise targeting and optimisation',
              'Geographic flexibility — reach customers anywhere',
              'Enables two-way communication with customers',
            ],
          },
          {
            type: 'definition',
            heading: 'Supply Chain & Logistics',
            text: 'Logistics and supply chain management benefit significantly from internet connectivity and web applications, which coordinate the flow of goods, information and resources.',
          },
          {
            type: 'bullets',
            heading: 'Types of Logistics Coordination',
            items: [
              'Flow-based coordination model',
              'Mechanism-based coordination',
              'Technology and data',
            ],
          },
          {
            type: 'bullets',
            heading: 'Benefits of Deploying Supply Chain & Logistics Online',
            items: [
              'Reduces operational cost',
              'Improves customer satisfaction and loyalty',
              'Increases efficiency and productivity',
              'Enhances data visibility across the chain',
            ],
          },
          {
            type: 'bullets',
            heading: 'Challenges of Businesses Impacted by the Internet',
            items: [
              'Cybersecurity threats',
              'Data privacy and compliance',
              'High cost',
              'Bandwidth management of internet services',
            ],
          },
          {
            type: 'bullets',
            heading: 'Solutions',
            items: [
              'Avoid service providers that do not offer reliable internet service',
              'Implement an automatic failover system',
              'Install a firewall and antivirus on your devices',
            ],
          },
          {
            type: 'note',
            text: 'Notice that the very first challenge listed is “cybersecurity threats.” Every benefit on this page — an always-open store, remote meetings, customer tracking, connected logistics — also widens the attack surface a business must defend. That is exactly why this course exists: the topics that follow look at how these web and mobile channels are attacked, and how to secure them.',
          },
        ],
      },
      {
        number: '3',
        title: 'Principles & Strategies for Secure Design',
        covers: [2],
        sections: [
          {
            type: 'definition',
            heading: 'Introduction',
            text: 'These notes cover the design principles and practical strategies used to secure web and mobile applications against unauthorized access and data compromise, with an emphasis on writing systems and software that make it difficult for intruders to exploit security loopholes. By the end of this topic you should be able to explain why systems are targeted, describe the categories of people who attempt unauthorized access, and identify the design-level security controls that can be layered together to protect an application.',
          },
          {
            type: 'text',
            heading: 'Understanding the Threat Landscape',
            text: 'Before a system can be secured, it is important to understand who attacks systems and why. Motive shapes method: an attacker seeking financial gain behaves differently from one motivated by activism or curiosity, and a well-designed system anticipates this range of behaviour rather than defending against a single type of adversary.',
          },
          {
            type: 'termlist',
            heading: 'Why Systems Are Attacked',
            items: [
              { term: 'Recreational / “for fun”', def: 'curiosity or a technical challenge, without intent to cause damage' },
              { term: 'Fame', def: 'the desire for recognition within a hacking community' },
              { term: 'Activism (“hacktivism”)', def: 'pursuing a political, social, or ideological cause' },
              { term: 'Financial gain', def: 'the most common driver of serious cybercrime — fraud, extortion, data resale' },
              { term: 'Coercion', def: 'an individual is forced or blackmailed into compromising a system' },
              { term: 'Destruction', def: 'intent to disrupt, delete, or disable systems and data' },
              { term: 'Espionage', def: 'gathering confidential information for competitive, corporate, or state advantage' },
            ],
          },
          {
            type: 'note',
            text: 'Keep this list apart from the one that follows. This one answers why a system is attacked — the motive — while the next answers who attacks it. They overlap in wording, since “activism” is a motive and “activists” are the people holding it, so read the heading of the question carefully: a question asking you to list threat actors earns nothing for a list of motives.',
          },
          {
            type: 'termlist',
            heading: 'Threat Actor Profiles',
            items: [
              { term: 'Hobbyists', def: 'informal, curiosity-driven individuals, often with limited resources' },
              { term: 'Government & law-enforcement agencies', def: 'acting under legal authority, though their tools and techniques mirror those of attackers' },
              { term: 'Activists', def: 'acting in pursuit of a cause rather than personal gain' },
              { term: 'Cyberterrorists', def: 'seeking to cause fear, disruption, or harm at scale' },
              { term: 'Criminal actors', def: 'organized groups pursuing financial gain' },
              { term: 'Insiders', def: 'employees or contractors who already hold legitimate access, making them uniquely positioned to cause damage' },
              { term: 'AI-augmented hackers', def: 'an emerging category using automated and AI-assisted tools to scale reconnaissance and attacks' },
            ],
          },
          {
            type: 'note',
            text: 'Design implication: because insiders already hold valid credentials, controls such as time/volume-constrained access and input/request filtering matter as much as authentication controls that only stop outsiders. An authentication-only strategy is defeated by anyone who is already legitimately logged in.',
          },
          {
            type: 'text',
            heading: 'Core Principles for Securing a System',
            text: 'The controls that follow are layered, not alternatives — a well-designed system combines several of them so that if one layer fails, another still limits the damage an intruder can do. This is the principle known as defence in depth.',
          },
          {
            type: 'definition',
            heading: 'Authentication vs Authorization',
            text: 'Authentication is the process of verifying the identity of a user, device, or service before granting access to protected digital resources. Authorization is the process of giving a verified user permission to access a physical location or digital information. Authentication answers “who are you?”; authorization answers “what are you allowed to do, now that we know who you are?”',
          },
          {
            type: 'note',
            items: [
              'The banking example used in class: every teller and every manager authenticates the same way when signing in, but they are authorized differently — a teller can only approve transactions up to a set limit, while the branch manager holds higher clearance.',
              'Authentication always comes first. A system cannot decide what you are permitted to do until it has established who you are.',
              'These two are what the course calls the security/tracking models. Expect a question asking you to define each and distinguish them — the marks are on the two definitions plus one example of differing permission levels.',
            ],
          },
          {
            type: 'definition',
            heading: 'Password Security & Creation',
            text: 'Password policy is the most basic layer of access control, and it should be enforced at the point a user or account is created, not applied after the fact.',
          },
          {
            type: 'bullets',
            heading: 'What a Strong Password Policy Requires',
            items: [
              'A minimum length — at least six characters, though longer is stronger',
              'Mixed case — at least one uppercase letter combined with lowercase letters',
              'At least one special character or symbol — e.g. @, #, comma, full stop, hyphen, underscore, forward slash, or backslash',
            ],
          },
          {
            type: 'note',
            items: [
              'The handout calls that second requirement “camel casing”. It is a loose use of the term, and worth getting right because you will meet the real one in programming. camelCase is a naming convention for identifiers: the words are run together with no spaces and every word after the first is capitalised, as in “myVariableName” or “totalStudentCount”. It says nothing about passwords. What the policy is actually asking for is mixed case — that the password contain both capital and small letters. If a question uses the lecturer’s wording, answer that it means mixed case; the requirement is the same either way, only the label is borrowed.',
              'Beyond the lecture: current guidelines such as NIST SP 800-63B now favour length and passphrase uniqueness over forced complexity, and recommend checking new passwords against known breached-password lists. The point worth holding on to is that complexity rules alone do not guarantee a password has not been reused somewhere else that has already been breached.',
              'The six-character minimum is the lecturer’s figure and is what to reproduce if he asks. In practice it is far too short — six characters falls to an offline brute-force attack in seconds, which is why the modern advice is a long passphrase rather than a short password decorated with symbols.',
            ],
          },
          {
            type: 'definition',
            heading: 'Two-Factor Authentication (2FA)',
            text: '2FA adds a second, independently generated credential on top of the known password. During registration the system collects an alternative contact point — typically a phone number or email address — and at login it sends a one-time code (commonly 4–8 digits) to that channel. The correct password alone is not sufficient; the generated code must also be supplied. Banking systems commonly trigger 2FA for transactions above a customer’s normal threshold, for example requiring an OTP only once a transfer exceeds a set amount, even when the PIN entered is correct.',
          },
          {
            type: 'note',
            text: 'The classic social-engineering attack on 2FA: a criminal who already has a card’s PIN or CVV calls the victim, fabricates an urgent story, and asks them to read out the OTP that was just sent to their phone — completing the second factor for the attacker. Be ready to explain why a legitimate institution never needs a customer to read back an OTP over the phone.',
          },
          {
            type: 'definition',
            heading: 'Three-Factor Authentication (3FA)',
            text: '3FA requires evidence from three independent categories of proof, not merely three steps or three devices. The three factors are: something you know — a password, PIN or passphrase; something you have — a phone, hardware token or smart card; and something you are — a fingerprint, face or iris. The strength comes from the categories being independent: an attacker who steals your password has one factor, an attacker who steals your phone has another, and neither alone gets in. Adding a second password would not be a third factor at all, because it is more of something you already had.',
          },
          {
            type: 'termlist',
            heading: 'The Three Factors',
            items: [
              { term: 'Something you know', def: 'a secret held in memory — password, PIN, passphrase or answer to a security question. Cheap to deploy, but it can be guessed, phished, or reused from a site that has already been breached' },
              { term: 'Something you have', def: 'a physical object in your possession — a registered phone receiving an OTP, a hardware token, or a smart card. It resists remote attack, because the attacker must obtain the object, but it can be lost or stolen' },
              { term: 'Something you are', def: 'a biometric measured from your body — fingerprint, face or iris. Hard to steal remotely, but it cannot be reissued: a leaked password can be changed, a leaked fingerprint cannot' },
            ],
          },
          {
            type: 'definition',
            heading: 'Dual Control & Multi-Device Approval',
            text: 'Separately from the factors above, a system may require that a request initiated on one device be approved from a different one, so that no single device can both request and approve access. A transaction started on one workstation needs sign-off from another; a request raised on a phone must be confirmed from a separate computer. This is typical of banking-sector workflows, where a transaction is initiated by one staff member, reviewed by a second, and authorized by a branch manager before it completes — sometimes with a deliberate delay built in while approvals are finalized. It is often called dual control, or the four-eyes principle.',
          },
          {
            type: 'definition',
            heading: 'Multi-Party Authentication',
            text: 'In multi-party authentication, the individual originating a request must wait for a second individual with higher-level credentials to approve it before access is granted. A familiar consumer example is location- or device-based step-up verification: if a user’s VPN shows them logging in from one country and, within an implausibly short time, a new login attempt appears from a different country, providers such as Google or Apple may require verification from another trusted device or person before granting access — precisely because the same credentials used from two “impossible” locations in a short window is a strong signal of compromise.',
          },
          {
            type: 'note',
            items: [
              'Read this one carefully, because the handout and the standard definition disagree. The handout defines 3FA as approval arriving from two or more separate devices. That is not what three-factor authentication means anywhere else — in the textbooks, in NIST SP 800-63B, and in industry, the three factors are the three categories of evidence above: something you know, something you have, something you are. This course uses the standard definition, because it is the one an examiner outside this room, an interviewer, or a certification paper will expect.',
              'What the handout was actually describing is dual control — a second device or a second officer approving the request — which is a real and important control, just not a third factor. It now has its own heading above, so nothing from the lecture is lost; it is only filed under the right name.',
              'The exam risk is real, so plan for it. If a question simply says “explain three-factor authentication”, give the three factors and name one example of each. If it says “explain 3FA as covered in this course”, or the marks clearly expect the device answer, give the three factors first and then add one sentence: “the course notes also use 3FA for dual-device approval, where a request raised on one device must be approved from another.” That sentence costs you nothing and covers both mark schemes.',
              'The three factors and dual control answer different questions. The factors ask how confident we are that you are who you claim to be. Dual control asks whether one person acting alone should be able to do this at all — which is why banks use it for large transfers even when the operator has already authenticated perfectly.',
              'The “impossible travel” case is the one to reach for in an exam — a login from Uyo followed eight minutes later by one from London on the same account. Nobody travels that fast, so the same credentials are almost certainly in two pairs of hands.',
            ],
          },
          {
            type: 'definition',
            heading: 'Time- or Volume-Constrained Access',
            text: 'Even after legitimate access is granted, a system should limit how long a session may run and how much data may be retrieved within a given period. When a session exceeds its allotted time or volume threshold, the system should automatically terminate it and require re-authentication.',
          },
          {
            type: 'bullets',
            heading: 'Why Constrain Time and Volume',
            items: [
              'Large-scale data theft takes time — the larger the dataset, the longer it takes to copy over a network, so a session that runs unusually long or transfers unusually large volumes is a red flag',
              'Idle sessions are a liability — an authenticated session left open, such as a banking app left unattended, is an opportunity for someone else to act on the user’s behalf',
            ],
          },
          {
            type: 'note',
            text: 'Everyday examples: open-access academic databases such as IEEE Xplore cap the number of downloads or views in a period, and banking apps expire a session after a period of inactivity or a set duration.',
          },
          {
            type: 'definition',
            heading: 'Graceful Degradation',
            text: 'Graceful degradation is the practice of designing a system so that, if part of it is compromised or attacked, only the affected component is isolated or shut down while the rest continues to function. The goal is to contain a breach to the smallest possible part of the system, buying time to resolve it while the service remains available to legitimate users.',
          },
          {
            type: 'bullets',
            heading: 'Practices That Support Graceful Degradation',
            items: [
              'Migrating data that is not needed for real-time operations offline, so it is not exposed to a live attack surface',
              'Designing fallback functionality so that a compromised data table or module can be cut off and shut down temporarily without taking the entire application offline',
            ],
          },
          {
            type: 'note',
            text: 'A concrete picture: an online store finds that its product-review module is being exploited. Graceful degradation means switching reviews off and leaving browsing, the cart and checkout running, rather than pulling the whole site down while the fix is written. It is the same instinct as a circuit breaker tripping one room instead of the whole building — and it is why the Key Takeaways at the end of this topic describe it as containing a breach rather than preventing one.',
          },
          {
            type: 'definition',
            heading: 'Biometric Authentication & Liveness Detection',
            text: 'Biometric authentication verifies identity using a physical characteristic rather than — or in addition to — a password. Liveness detection is used alongside it to confirm that the biometric sample comes from a live person and not a photograph, mask, or other spoof.',
          },
          {
            type: 'bullets',
            heading: 'Common Biometric Modalities',
            items: [
              'Facial recognition',
              'Iris recognition',
              'Fingerprint recognition',
              'Full palm recognition',
            ],
          },
          {
            type: 'note',
            text: 'Typical liveness checks prompt the user to blink (the eye blinks involuntarily within roughly 60 seconds) or to open their mouth (the tongue and soft tissue cannot be held perfectly still). Financial platforms use this during tiered KYC verification in mobile money apps, as part of onboarding a customer to a higher access level.',
          },
          {
            type: 'definition',
            heading: 'Input & Request Filtering',
            text: 'Every request or input directed at a system — a login attempt, a save operation, a data request — carries a “signature” that can be inspected for consistency. A common check is whether the requesting device’s IP address remains stable within a short window, for example 60 seconds. If the IP address changes unexpectedly within that window it may indicate the use of a VPN or another anomaly, and the system can flag or restrict the request rather than granting it outright. The same principle underlies geo-gating, where access from IP ranges associated with certain regions is blocked, and VPN detection, where traffic identified as coming from a VPN is denied access to protected resources.',
          },
          {
            type: 'note',
            items: [
              'The “signature” of a request here is not a cryptographic signature. It is the bundle of properties that travel with the request — source IP address, browser user-agent, timing, the order the form fields were filled in — which should stay consistent for one genuine user in one sitting.',
              'Name the trade-off if the question asks you to evaluate this control: geo-gating and VPN detection block real customers too. A student in Uyo studying over a VPN, or a traveller whose IP changes mid-session, looks exactly like the anomaly the filter is hunting, which is why sensible systems flag and re-challenge rather than deny outright.',
            ],
          },
          {
            type: 'definition',
            heading: 'Cryptography & Encryption',
            text: 'Encryption converts data into a form that cannot easily be read by anyone who does not hold the means to reverse the process. It is essential whenever data is transmitted between two devices over a network, particularly where only part of a system’s data is meant to be shared externally.',
          },
          {
            type: 'termlist',
            heading: 'Categories of Cryptographic Protection',
            items: [
              { term: 'Symmetric encryption', def: 'the same key encrypts and decrypts the data — fast, but the key itself must be shared securely between both parties (e.g. AES)' },
              { term: 'Asymmetric encryption', def: 'uses a mathematically linked key pair; the public key encrypts data that only the corresponding private key can decrypt, removing the need to share a single secret (e.g. RSA)' },
              { term: 'Hash functions', def: 'produce a fixed-length, one-way “fingerprint” of data that cannot practically be reversed — used to verify integrity, not to conceal and later recover the original (e.g. SHA-256)' },
            ],
          },
          {
            type: 'note',
            items: [
              'Exam wording for the definition: encryption is the conversion of information into ciphertext — text that is unreadable to unauthorised users.',
              'Exam wording for the distinction: symmetrical encryption uses a single key to both lock and unlock the data; asymmetrical encryption uses two keys — a public key and a private key.',
              'Write those two sentences first, then add the trade-off if the question asks you to explain: the single symmetric key is fast but must itself be shared securely, while the asymmetric pair removes the need to share a secret at all.',
            ],
          },
          {
            type: 'definition',
            heading: 'Steganography',
            text: 'Steganography hides data or a message inside an ordinary-looking file — commonly an image — rather than encrypting it into obviously unreadable ciphertext. A sensitive text file describing a security vulnerability could be embedded within an innocuous photograph and transmitted over a public channel.',
          },
          {
            type: 'note',
            text: 'Encryption and steganography solve different problems and can be combined: encryption protects the confidentiality of a message but signals that something is being protected, while steganography conceals the very existence of the message from anyone intercepting the file.',
          },
          {
            type: 'table',
            heading: 'Summary: Layered Security Controls at a Glance',
            headers: ['Control', 'What It Protects Against', 'Typical Real-World Example'],
            rows: [
              ['Password policy', 'Weak or easily guessed credentials', 'Account sign-up requirements'],
              ['2FA', 'Stolen or guessed password used alone', 'Bank OTP on large transfers'],
              ['3FA', 'A stolen password and a stolen device used together', 'Banking app: PIN, registered phone and fingerprint'],
              ['Dual control (multi-device approval)', 'One compromised account or device acting alone', 'Multi-officer transaction approval'],
              ['Multi-party authentication', 'Anomalous access patterns', 'Impossible-travel login alerts'],
              ['Time/volume-constrained access', 'Bulk data exfiltration; idle-session hijack', 'Auto session timeout; download caps'],
              ['Graceful degradation', 'Full-system outage during an attack', 'Isolating a compromised module'],
              ['Biometrics + liveness', 'Impersonation; spoofed credentials', 'Facial/fingerprint login with blink check'],
              ['Input/request filtering', 'Anomalous or automated requests', 'Geo-gating; VPN detection'],
              ['Cryptography/encryption', 'Interception of data in transit', 'TLS-protected network traffic'],
              ['Steganography', 'Detection of the message itself', 'Data hidden inside an image file'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Takeaways',
            items: [
              'No single control is sufficient on its own — secure design relies on layering multiple, independent controls (defence in depth)',
              'Understanding attacker motive and profile shapes which controls matter most; insiders in particular defeat authentication-only strategies',
              'Authentication controls (password, 2FA, 3FA, multi-party) address who is let in; behavioural controls (time/volume limits, input filtering) address what happens after access is granted',
              'Graceful degradation accepts that a breach may happen and focuses on containing its impact rather than assuming perfect prevention',
              'Encryption protects the confidentiality of data; steganography protects the existence of data — they solve different problems and can be combined',
            ],
          },
          {
            type: 'bullets',
            heading: 'Suggested Further Study',
            items: [
              'OWASP Top 10 web application security risks',
              'NIST SP 800-63B — Digital Identity Guidelines (authentication and password policy)',
              'Basic principles of symmetric vs asymmetric cryptography (AES vs RSA) and common hash algorithms (SHA-256)',
              'Mobile app security guidance from the OWASP Mobile Application Security Project',
            ],
          },
        ],
      },
      {
        number: '4',
        title: 'Mobile Threats & Secure Development Practices',
        covers: [3],
        partial: [6],
        sections: [
          {
            type: 'definition',
            heading: 'Why Mobile Is a Separate Security Problem',
            text: 'A mobile application runs on hardware the user carries, lends and loses, on an operating system the developer does not control, over networks the developer cannot trust. The server-side defences a web application leans on — host firewalls, intrusion detection, antivirus, a locked server room — simply are not present on a handset. Secure mobile development therefore starts from the assumption that the device itself is hostile: the code will be reverse-engineered, the local storage will be read, and the traffic will be intercepted.',
          },
          {
            type: 'note',
            text: 'Read this topic against the web-vs-mobile comparison in Topic 1 and the risk tables in Topic 7. The distinction the lecturer keeps returning to is where the blast radius sits: web risk is centralised on the server, so one compromised server affects every user; mobile risk is decentralised onto thousands of individual devices, each of which an attacker may physically hold.',
          },
          {
            type: 'termlist',
            heading: 'Top Issues Facing Mobile Devices',
            items: [
              { term: 'Physical security', def: 'Information is lost with the device itself, or read by whoever borrows it. On mobile, physical security has historically meant little-to-no security.' },
              { term: 'Secure data storage on disk', def: 'Password files, tokens and other sensitive material are held locally, and must be kept from unauthorised readers while remaining available to the applications that legitimately need them.' },
              { term: 'Strong authentication with poor keyboards', def: 'A password mixing letters, numbers, special characters and spaces is difficult, if not impossible, to type on a small on-screen keyboard — so users pick weaker secrets.' },
              { term: 'Multiple-user support with security', def: 'Unlike a desktop OS, a phone has no real notion of logging in as a different user, and no separation between business and personal applications. Security has to be modelled per application instead.' },
              { term: 'Safe browsing environment', def: 'The lack of screen real estate hides the full URL — or the URL entirely — which makes phishing easier, and links are followed far more readily on a phone than on a desktop.' },
              { term: 'Secure operating systems', def: 'Hardening the OS is difficult but unavoidable for a vendor. A weak OS costs more than data — it also costs uptime and user experience.' },
              { term: 'Application isolation', def: 'Corporate, gaming and social applications sit side by side on one device; isolating each application and the data it holds from the others is critical.' },
              { term: 'Information disclosure', def: 'The data on a device is usually worth more than the device, and a phone is far more likely to be lost or stolen than a desktop. Onward access from the device to corporate networks (VPN, mail) widens the exposure.' },
              { term: 'Viruses, worms, Trojans, spyware and malware', def: 'Mobile platforms face the same malware classes as the desktop, plus new ones specific to the mobile environment — premium-rate toll fraud, for example.' },
              { term: 'Difficult patching and update process', def: 'Patching is a coordination problem rather than a technical one: the OS developer, the handset vendor and the carrier must all agree, and carriers have very little time to test.' },
              { term: 'Strong use and enforcement of SSL', def: 'Older devices lacked the processing power to run SSL without hurting the user experience, and some organisations still fall back to clear text on the assumption that sniffing a mobile network is hard. The many transitive networks between handset and server make that assumption unsafe.' },
              { term: 'Phishing', def: 'Users click links on a phone with fewer safety concerns, and the browser often cannot show them the URL they are about to visit.' },
              { term: 'Cross-Site Request Forgery (CSRF)', def: 'A serious problem for vulnerable mobile HTML sites: victims are easy to lure into clicking, and a successful CSRF lets an attacker change the victim’s address, email or password on the target application.' },
              { term: 'Location privacy and security', def: 'Carrying a phone already erodes location privacy, and users give away precise position voluntarily through check-in and mapping services.' },
              { term: 'Insecure device drivers', def: 'Ordinary applications should not have system-level access, but drivers must have it. A poorly written third-party driver hands attackers a way around the platform’s protection scheme.' },
              { term: 'Multifactor authentication', def: 'Soft schemes that fingerprint the browser, IP range or HTTP headers are easy to spoof. A device signature built from HTTP headers and connection properties is far weaker than the checks a native application can perform.' },
            ],
          },
          {
            type: 'note',
            items: [
              'Several of these issues are the same weakness described from different angles — physical security, secure data storage and information disclosure all reduce to "assume an attacker eventually holds the unlocked device".',
              'Note which issues are the developer’s to fix and which are not. Patching delays and insecure drivers belong to the vendor and carrier; storage, transport, authentication and input handling belong to whoever writes the app.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Tips for Secure Mobile Application Development',
            items: [
              { term: 'Leverage TLS/SSL', def: 'Turn transport security on by default, and enable both confidentiality and integrity protection — many deployments enforce confidentiality but quietly skip integrity.' },
              { term: 'Follow secure programming practices', def: 'Short deadlines and small budgets push developers to skip security checks. Use the security frameworks and coding guidelines that already exist rather than inventing your own.' },
              { term: 'Validate input', def: 'Mandatory for both native and mobile web applications. A phone has no host firewall, no IDS and no antivirus, so basic sanitisation of every input is the only line of defence.' },
              { term: 'Leverage the OS permissions model', def: 'The permission model on the device itself is reasonably strong; use the isolation iOS and Android already provide. Be aware that an external SD card may not be covered by it.' },
              { term: 'Use the least-privilege model for system access', def: 'Enumerate the smallest set of services, permissions, files and processes the application actually needs, and limit it to those. Least privilege keeps a compromised application from affecting anything else.' },
              { term: 'Store sensitive information properly', def: 'Never write usernames, passwords or tokens to the device in clear text — use the platform’s own encryption and credential-store APIs.' },
              { term: 'Sign the application’s code', def: 'Signing does not make the code safer, but it proves the application followed the store’s required practices and it determines the privileges the OS grants. An unsigned application gets fewer privileges and cannot be distributed through the normal channels.' },
              { term: 'Design a secure, strong update process', def: 'An unpatched application endangers itself, the OS and the user. Updates must be quick, easy and cheap in bandwidth, or users will not take them.' },
              { term: 'Understand the mobile browser’s strengths and limits', def: 'Do not treat a mobile browser like a desktop one. Know how it handles cookies, local page caching, "remember password" boxes and cached credentials.' },
              { term: 'Zero out the non-threats', def: 'Not every mobile threat matters to every application. Build a threat model: enumerate the real threats, design mitigations for them, and record the rest as consciously accepted risk.' },
              { term: 'Use secure, intuitive mobile URLs', def: 'A mobile site hosted by a third party often sits on a domain that is not the organisation’s own, which trains users to trust unfamiliar domains. m.example.com is intuitive; example.mobilevendor.com is not.' },
            ],
          },
          {
            type: 'note',
            text: 'The threat-modelling tip is the one that ties the list together. The STRIDE categories used by the OWASP mobile threat model — spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege — give you a checklist for enumerating threats rather than guessing at them.',
          },
          {
            type: 'termlist',
            heading: 'The OWASP Mobile Top 10 Risks',
            items: [
              { term: 'Insecure data storage', def: 'Store only what is absolutely required, never in a public area such as an SD card. Use secure containers and the platform’s encryption APIs, and never mark files world-readable or world-writable.' },
              { term: 'Weak server-side controls', def: 'A mobile front end does not remove the server’s obligations. Apply the existing body of knowledge — the OWASP Web, Cloud and Web Services Top 10s, the cheat sheets and development guides — to the backend the app talks to.' },
              { term: 'Insufficient transport layer protection', def: 'Encrypt all sensitive data leaving the device, over carrier networks, Wi-Fi and NFC alike. When the platform throws a security exception it is usually right — do not suppress it.' },
              { term: 'Client-side injection', def: 'Sanitise or escape untrusted data before rendering or executing it, use prepared statements for database calls rather than string concatenation, and minimise the native capabilities exposed to hybrid web content.' },
              { term: 'Poor authorisation and authentication', def: 'Contextual signals help only as part of a genuine multi-factor scheme. Out-of-band verification is meaningless when both factors arrive on the same device, and a device ID or subscriber ID must never be the sole authenticator.' },
              { term: 'Improper session handling', def: 'Do not be afraid to re-authenticate periodically, make sure tokens can be revoked quickly when a device is lost or stolen, and generate tokens from high-entropy, well-tested sources.' },
              { term: 'Security decisions via untrusted inputs', def: 'Check the caller’s permissions at every input boundary, prompt for additional authorisation before acting, and where a permission check is impossible require extra steps before a sensitive action can run.' },
              { term: 'Side-channel data leakage', def: 'Never log credentials or personal data to system logs. Strip sensitive data before screenshots, disable keystroke logging per field, apply anti-caching directives to web content, watch what files your app creates while debugging, review third-party libraries and the data they consume, and test across as many platform versions as possible.' },
              { term: 'Broken cryptography', def: 'Storing the key alongside the encrypted data negates the encryption entirely. Use battle-tested crypto libraries rather than writing your own, and take advantage of what the platform already provides.' },
              { term: 'Sensitive information disclosure', def: 'Private API keys are private for a reason — keep them off the client. Keep proprietary business logic on the server, and accept that there is almost never a legitimate reason to hardcode a password.' },
            ],
          },
          {
            type: 'note',
            text: 'Read this alongside the website attacks in Topic 8 and the best practices in Topic 9. Injection, weak authentication and sensitive-data exposure appear on both the web and the mobile list, but insecure data storage, side-channel leakage and improper session handling on a lost device are mobile-specific — they exist precisely because the client is a device the attacker can hold.',
          },
          {
            type: 'bullets',
            heading: 'Key Takeaways',
            items: [
              'Secure mobile development begins from a different assumption than web development: the client device is under the attacker’s physical control, so nothing stored, computed or hidden on it can be trusted',
              'Most of the sixteen issues collapse into four underlying problems — an attacker who holds the device, data written where it can be read, credentials too weak to type on a small keyboard, and input arriving from channels the developer does not control',
              'Separate what you can fix from what you cannot: storage, transport, authentication and input handling are the developer’s; patching delays and insecure drivers belong to the vendor and the carrier',
              'Threat-model rather than guess — STRIDE gives you the checklist, and consciously accepting a risk you have named is very different from never having considered it',
              'The OWASP Mobile Top 10 is the risk vocabulary an examiner expects; know each risk by name and by the one control that answers it',
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'Mobile Platform Security Models — iOS vs Android',
        covers: [3],
        sections: [
          {
            type: 'definition',
            heading: 'What This Topic Answers',
            text: 'Topic 4 established what an attacker can do to a device the developer does not control. This topic is the other half of the answer: what the two dominant platforms already do about it, and where their protections stop. Both iOS and Android isolate applications from each other and harden memory against overflow attacks — but they reach that isolation by different routes, and the differences decide what a developer must supply themselves.',
          },
          {
            type: 'note',
            text: 'Read the comparison table first and treat it as the map. Everything after it is detail filling in one cell or another, and the exam-usable contrasts — distribution and review, code signing, how isolation is enforced, when permissions are granted, and where credentials are stored — are all in the table.',
          },
          {
            type: 'table',
            heading: 'Comparison: iOS and Android Security Models',
            headers: ['Aspect', 'Apple iOS', 'Google Android'],
            rows: [
              ['Distribution', 'App Store only; every application is reviewed by Apple before release and can be revoked at Apple’s discretion', 'Google Play or side-loading; the package installer rejects any unsigned application'],
              ['Code signing', 'Requires a valid code-signing certificate tied to membership of the Apple Developer Program — self-signing is not allowed', 'Every application must be signed, but developers may self-sign with a certificate they generate themselves'],
              ['Application isolation', 'Each application is installed into its own GUID directory and cannot read or write another application’s directory', 'Each application is given a unique Linux user ID (UID) at install time; UNIX file permissions keep applications apart'],
              ['Permissions', 'Requested at the point of use, through a popup shown to the user when the API is first called', 'Declared in the application manifest and shown to the user before install; once installed, the permission set cannot be changed'],
              ['Credential storage', 'Keychain — a dedicated encrypted store for passwords, certificates and secrets (its API works only on a physical device)', 'SharedPreferences and application-private files, protected by UNIX permissions rather than a dedicated secret store'],
              ['External storage', 'No user-accessible removable storage', 'Memory cards are widely supported, and data written to them is unprotected and readable by other applications'],
              ['Reverse engineering', 'Objective-C decompiles fairly easily with standard OS X developer tools; preventing reverse engineering is not possible', 'SDK code runs in the Dalvik/ART VM and is similarly recoverable from the package'],
              ['Memory protections', 'Non-executable stack and heap by default (NX bit), plus address space layout randomisation', 'ProPolice, safe_iop, hardened OpenBSD malloc/calloc, NX, mmap_min_addr and ASLR'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Apple iOS — Development and Security Testing',
            items: [
              'Development is done in Xcode with the iPhone SDK; an application can be run in the emulator or on a physical device, and debugged inside Xcode via gdb',
              'Objective-C code decompiles fairly easily using standard OS X developer tools — it is not possible to prevent reverse engineering, so no secret should live in the binary',
              'Using the high-level Objective-C APIs reduces, but does not eliminate, the threat of classic C exploits',
              'Avoid manual memory management and prefer Cocoa objects such as NSString for string handling to avoid buffer overflows — integer overflows remain possible even with NSInteger',
              'Double-frees, where already-released memory is deallocated a second time, are a recurring problem',
              'Most commercial static-analysis tools are weak at Objective-C-specific flaws, but simple free tools will find abuse of the underlying C APIs',
            ],
          },
          {
            type: 'bullets',
            heading: 'Apple iOS — Application Format and Distribution',
            items: [
              'Applications are compiled in Xcode with the GNU GCC compiler and cross-compiled for the ARM processor, or for the local machine when targeting the emulator',
              'Each application bundle carries a unique ID, a plist of entitlements and preferences, a code signature, any media assets, and the executable itself',
              'All applications are distributed through the App Store, must be approved by Apple before distribution, and can be revoked at any time at Apple’s discretion',
              'Every application must be signed with a valid code-signing certificate, which requires membership of the iPhone Developer Program',
              'On jailbroken devices, Cydia and Installer are the common routes for installing unauthorised third-party software — which bypasses the review and signing controls entirely',
            ],
          },
          {
            type: 'bullets',
            heading: 'Apple iOS — Permissions and Runtime Protections',
            items: [
              'Permission for specific functionality such as location or contacts is granted by the user through a popup, at the moment the API is first used',
              'Applications are installed into their own GUID directory; they get limited read access to some system areas, but cannot read or write directories belonging to other applications',
              'Both the heap and the stack are non-executable by default, and newer versions add Address Space Layout Randomisation (ASLR) to randomise key memory locations',
            ],
          },
          {
            type: 'termlist',
            heading: 'Apple iOS — Local Data Storage',
            items: [
              { term: 'SQLite storage', def: 'The popular way to persist application data — and, like any SQL database, subject to injection. Use parameterised queries so third-party SQL cannot be executed accidentally.' },
              { term: 'Keychain storage', def: 'The credential store inherited from OS X, holding passwords and other secrets as a dictionary of key/value pairs. Its API is simpler than the Cocoa API, and it only works on a physical device — not in the emulator.' },
              { term: 'Shared keychain storage', def: 'Lets separate applications share keychain data by declaring additional entitlements. The developer must explicitly add the attribute and define the entitlement, so sharing is never accidental.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Apple iOS — Networking APIs',
            items: [
              { term: 'URL Loading API', def: 'Handles HTTP, HTTPS, FTP and file resources through NSURLConnection and NSURLDownload with an NSURL input. Note that HTTP and HTTPS results are cached on the device by default, and every cookie it stores is reachable by any other application using the URL loading system.' },
              { term: 'NSStream', def: 'Used for network sockets speaking protocols the URL loading system does not handle, or wherever the application needs finer control over connection behaviour.' },
              { term: 'Peer-to-peer (P2P)', def: 'Device-to-device networking over Bluetooth. Because both games and non-games use it for collaboration and data exchange, it widens the opportunity for data theft — and anything streamed in from a peer is untrusted input that must be validated.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Apple iOS — Push Notifications, Copy/Paste and Other IPC',
            items: [
              { term: 'Push notifications', def: 'Let an application notify the user while it is not running. The device and the push service authenticate each other with mutual certificates, and a notification may be a popup or a badge update. Delivery is not guaranteed, so nothing security-critical should depend on it.' },
              { term: 'UIPasteboard', def: 'Handles copy and paste inside one application, or shares data between applications. Data on a shared pasteboard must be treated as untrusted and potentially malicious, and sanitised before use.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Google Android — Development',
            items: [
              'The SDK provides free build and debug tooling for developers on Linux, Windows and OS X',
              'It ships an emulator for ARM-based devices which can also emulate alternative virtual hardware configurations',
              'Debugging support is built into the platform, so working against a real device or the emulator is largely interchangeable',
              'Code written with the SDK generally runs inside the Dalvik virtual machine rather than as native code',
            ],
          },
          {
            type: 'bullets',
            heading: 'Google Android — Platform Security Architecture',
            items: [
              'The platform re-purposes traditional operating-system security controls towards three objectives: protect user data, protect system resources including the network, and provide application isolation',
              'Robust security at the OS level, inherited from the Linux kernel',
              'A mandatory application sandbox for every application, with no opt-out',
              'Secure interprocess communication (IPC) mechanisms',
              'Application signing',
              'Permissions that are defined by applications and granted by the user',
            ],
          },
          {
            type: 'bullets',
            heading: 'Google Android — Security Model and the UID Sandbox',
            items: [
              'Android builds on the Linux security model, with some abstractions of its own, and uses Linux user accounts to silo applications from each other',
              'Permissions are the rights an application is given to take pictures, use the GPS, place calls and so on',
              'At install time each application is assigned a unique user identifier (UID), and that UID is what protects the application’s data from every other application',
              'Requiring permissions limits the damage malicious software can do — unless the user grants powerful rights to dubious software',
              'The runtime tracks which permissions each application holds; they are granted either when the OS was installed or when the user installs the application',
            ],
          },
          {
            type: 'note',
            text: 'The two isolation mechanisms are worth picturing rather than memorising. Android gives every installed application its own Linux user account, so the operating system keeps two applications apart in exactly the way it keeps two people’s home folders apart on a shared computer — ordinary file permissions do all the work. iOS instead installs each application into its own directory named by a GUID, a long randomly generated identifier, and refuses reads and writes across those directories. Same outcome, different machinery — and on both platforms the standing exception is the memory card, covered further down.',
          },
          {
            type: 'bullets',
            heading: 'Google Android — Manifest Permissions',
            items: [
              'Android uses manifest permissions to record what the user has allowed an application to do — sending SMS, using the camera, and so on',
              'Before installation the user is shown every permission the application requests',
              'Once the application is installed, its permission set cannot be changed',
            ],
          },
          {
            type: 'note',
            text: 'The all-or-nothing install-time grant is the weakness of this design: a user who wants the application has to accept every permission it asks for, which is exactly why over-requesting permissions is treated as a security smell. Contrast it with the iOS model of prompting at the point of use, where the user sees the request in context and can refuse one capability without abandoning the application.',
          },
          {
            type: 'table',
            heading: 'Android Permission Protection Levels',
            headers: ['Protection Level', 'Protection Behaviour'],
            rows: [
              ['Normal', 'For features whose consequences are minor — VIBRATE, which lets an application vibrate the device, is the standard example. Suitable for rights users are unlikely to care about; they can review them but may not be explicitly warned.'],
              ['Dangerous', 'For permissions such as WRITE_SETTINGS and SEND_SMS, which could reconfigure the device or incur charges. Use this level for anything a user would be interested in or surprised by. Android warns the user at install, though the exact behaviour varies by Android version and device.'],
              ['Signature', 'Granted only to applications signed with the same key as the program that declared the permission. This allows a developer’s own applications to coordinate securely without publishing a public interface.'],
              ['SignatureOrSystem', 'As Signature, except that programs on the system image also qualify. It exists so custom Android builds can integrate with system components, and is not normally needed by third-party developers.'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Google Android — Securable IPC Mechanisms',
            items: [
              { term: 'Activity', def: 'An interactive screen used to communicate with the user. An Intent specifies which Activity is wanted.' },
              { term: 'Broadcast', def: 'A way to send a message between applications; the sender puts the message into an Intent and broadcasts it.' },
              { term: 'Service', def: 'A background process that does its work quietly, without a user interface.' },
              { term: 'ContentProvider', def: 'Shares relational data between processes efficiently and securely. ContentProviders are SQL-based, which is also why they are an injection target.' },
              { term: 'Binder', def: 'A highly efficient low-level communication mechanism, commonly used to bridge Java and native code running in separate processes.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Google Android — Application Signing',
            items: [
              'Every application run on the platform must be signed by its developer; an unsigned application is rejected by Google Play or by the package installer on the device',
              'The signed certificate is what associates a user ID with an application, and that association is what stops one application reaching another except through well-defined IPC',
              'Applications may be signed by a third party or self-signed — Android deliberately allows developer-generated self-signed certificates, requiring no external assistance or permission',
            ],
          },
          {
            type: 'note',
            text: 'Self-signing sounds weaker than it is, and the distinction is a favourite exam point. A self-signed certificate is simply one the developer generated themselves, so nobody vouches for who they are — Android accepts this, Apple does not. What it still guarantees is continuity: only whoever holds that same key can publish an update to that application, which is what stops a stranger pushing a malicious “update” to your users. Signing proves the same hands wrote both versions; it says nothing at all about whether either version is secure.',
          },
          {
            type: 'bullets',
            heading: 'Google Android — Memory-Management Hardening',
            items: [
              'ProPolice, to prevent stack buffer overruns',
              'safe_iop, to reduce integer overflows',
              'Extensions to OpenBSD dlmalloc, to prevent double-free vulnerabilities and chunk consolidation attacks',
              'OpenBSD calloc, to prevent integer overflows during memory allocation',
              'Format-string vulnerability protections',
              'Hardware-based No eXecute (NX), to prevent code execution on the stack and heap',
              'Linux mmap_min_addr, to mitigate null-pointer-dereference privilege escalation',
              'Address Space Layout Randomisation (ASLR), to randomise key locations in memory',
            ],
          },
          {
            type: 'note',
            text: 'None of these are things a developer switches on — they are protections the compiler and the operating system apply for you, which is why the answer to “how does the platform harden memory?” is a list of names. The two to know are NX (No eXecute), which marks the stack and heap as data-only so code an attacker manages to write there cannot be run, and ASLR (Address Space Layout Randomisation), which shuffles where things sit in memory on every run so the attacker cannot predict an address to jump to. ProPolice, safe_iop and the hardened OpenBSD allocators are the same idea aimed at specific bug classes — stack overruns, integer overflows and double-frees — and the flaw they all exist to blunt is the buffer overflow defined in Topic 8.',
          },
          {
            type: 'bullets',
            heading: 'Google Android — Files, Preferences and Mass Storage',
            items: [
              'UNIX-style file permissions apply throughout; since each application runs as its own user, files created by one application cannot be read or altered by another unless the user allows it',
              'SharedPreferences is a system feature backed by an ordinary file, carrying ordinary file permissions',
              'Devices commonly support add-on file systems mounted on memory cards, because on-board storage is limited',
              'Data written to a memory card is unprotected — it sits outside the per-application UID sandbox and can be read by other applications on the device, which is why sensitive data must never be stored there',
            ],
          },
          {
            type: 'note',
            items: [
              'The Keychain and SharedPreferences sit in the same row of the comparison table, but they are not equivalents. The Keychain is a purpose-built encrypted store for secrets; SharedPreferences is an ordinary file in the application’s own directory, protected by nothing more than the UNIX permissions described above.',
              'That gap opens the moment a device is rooted, because rooting removes the very user-account boundary the Android model rests on, and a SharedPreferences file that was private becomes readable. Topic 7 lists jailbreak and rooting as a mobile vulnerability for exactly this reason.',
              'The rule that survives on either platform: put secrets in the platform’s own credential store, and treat anything you write yourself as something somebody will eventually read.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Enterprise Device Security Options',
            items: [
              { term: 'PIN', def: 'The first step in securing a device, and enough to make an unmotivated attacker wipe and resell it rather than break in. A four-digit PIN needs only 10,000 guesses, but most devices impose a delay after ten failures; on some, the SIM card carries its own PIN as well.' },
              { term: 'Remote wipe', def: 'Essential for corporate devices — it turns a lost handset from a breach into an inconvenience. Both iOS and Android support it.' },
              { term: 'Secure local storage', def: 'Many applications still write usernames and passwords to the device in clear text. iOS answers this with the Keychain, which stores, retrieves and reads passwords, certificates and other secrets.' },
              { term: 'Encryption', def: 'Full-disk encryption arrived late on mobile relative to the desktop — iOS 4 and Android 4.0 (Ice Cream Sandwich) were the first mainstream versions to offer it. Native local email encryption is generally absent and supplied by third-party enterprise products, while file-level encryption is supported by most major mobile OSes.' },
              { term: 'Application sandboxing', def: 'Serves three goals at once: protect each application from the others, protect the underlying OS from the application, and isolate a bad application from the good ones.' },
              { term: 'Application signing', def: 'A vetting process that gives users some assurance about an application and ties authorship and privileges to it. It is not a measure of how secure the code is. Most mobile OSes require it; Android accepts self-signed certificates, iOS does not.' },
              { term: 'Buffer overflow protection', def: 'A major attack class wherever the OS is written in C, Objective-C or C++. iOS marks the stack and heap non-executable using the NX bit, so an attempt to execute there raises an exception; Android relies on ProPolice for stack-smashing protection, OpenBSD malloc/calloc to make heap overflows harder, and safe_iop for safe integer operations.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Takeaways',
            items: [
              'Both platforms enforce isolation, but by different means — iOS through App Store review, mandatory Apple-issued code signing and per-GUID directories; Android through per-application Linux UIDs, manifest permissions and self-signed certificates',
              'Permission timing is the sharpest contrast between the two: Android grants everything at install and freezes it, iOS prompts in context at the moment of use',
              'Code signing on either platform proves provenance and sets privileges — it is never a statement that the code is secure',
              'The platform gives you encryption, credential stores, sandboxing and memory hardening for free; the recurring failures are developer decisions to bypass them — clear-text storage, disabled TLS checks, unsanitised input, keys shipped in the binary',
              'External storage is the standing exception to the sandbox: anything written to a memory card leaves the protection of the per-application UID and is readable by any other application',
              'Neither platform prevents reverse engineering, so no secret may live in the binary on either one',
            ],
          },
        ],
      },
      {
        number: '6',
        title: 'Mobile Bearer Layers — WAP, Bluetooth, SMS/MMS & Location',
        partial: [3, 8],
        sections: [
          {
            type: 'definition',
            heading: 'What This Topic Answers',
            text: 'Topics 4 and 5 dealt with the application and the platform it runs on. Everything in this topic sits below both: the bearers that carry data to and from the handset — the WAP gateway, the Bluetooth radio, the SMS and MMS messaging stack, and the positioning systems that tell an application where it is. Each one is a channel the application does not control, delivering input the application must not trust, and each has a failure history of its own.',
          },
          {
            type: 'note',
            text: 'The pattern to carry through all four is the same one Topic 4 opened with, pushed one layer down: wherever data changes hands, ask who can read it in transit, who can forge it, and what the receiving code does with a malformed message. The WAP gap, Bluetooth’s negotiable key length, the SMS PDU and the EXIF thumbnail parser are four instances of that single question.',
          },
          {
            type: 'bullets',
            heading: 'Mobile Service Layers — WAP and Mobile HTML',
            items: [
              'WAP was the original method of reaching the internet from a mobile device, with a WAP gateway acting as a proxy that translated content between the handset and an ordinary HTTP server',
              'WAP 1.0 used WTLS between client and gateway and SSL/TLS between gateway and server, so traffic was decrypted and re-encrypted at the gateway — the plaintext exposure known as the "WAP gap"',
              'WAP 2.0 supports full end-to-end TLS, which closes the WAP gap; the gateway becomes optional and is kept only for optimisation, and WTLS is no longer needed',
              'Small keyboards push WAP and mobile HTML sites towards 4-to-8-digit mobile PINs instead of strong passwords, trading security for usability and making brute force far easier',
              'Crossover between SMS and mobile HTML applications adds exposure — an application that returns an account balance to any SMS with the right caller ID trusts a value that is trivially spoofed',
              'Traditional web attacks work against mobile HTML sites: XSS, SQL injection, CSRF, malicious HTTP redirects, phishing, session fixation and non-SSL login',
              'Mobile browsers have their own weaknesses: incomplete support for the HTTPOnly and SECURE cookie flags, permissive cache handling, and the general limitations of WAP',
            ],
          },
          {
            type: 'note',
            items: [
              'The acronyms, expanded once: WAP is the Wireless Application Protocol, the pre-smartphone way of reaching the internet from a handset; WTLS is Wireless TLS, a cut-down TLS built for slow radio links; WSP is the Wireless Session Protocol, WAP’s equivalent of HTTP.',
              'A gateway here is simply a proxy standing between the phone and an ordinary web server, translating between the two. The “WAP gap” is what that translation costs you — the gateway must decrypt the WTLS traffic arriving from the phone before re-encrypting it as TLS towards the server, so for an instant your data sits in plain text on a machine belonging neither to you nor to the site you are visiting.',
              'This is why “end-to-end” is worth reading literally. WAP 1.0 encrypts each half of the journey separately, which is not end-to-end at all; WAP 2.0 encrypts the whole journey in one TLS session, which is precisely why the gateway becomes optional.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Bluetooth Security Features',
            items: [
              { term: 'Pairing', def: 'The process by which two devices establish a link and agree to communicate, generating the keys later used for authentication and encryption. Before v2.1 pairing relied on a PIN of up to 128 bits; v2.1 introduced Secure Simple Pairing, using Elliptic Curve Diffie-Hellman for key exchange and link key generation.' },
              { term: 'Authentication', def: 'A challenge-response exchange in which the verifier checks the claimant’s identity. The response is computed from a random number, the claimant’s Bluetooth device address and the secret key generated at pairing; after a failure the verifier delays the next attempt to blunt repeated attacks.' },
              { term: 'Authorisation', def: 'Decides what a given device or service may access. Devices are trusted (previously paired, full access) or untrusted (not paired, restricted access); services are Level 1 (authentication and authorisation required), Level 2 (authentication only) or Level 3 (open to all devices).' },
              { term: 'Confidentiality', def: 'Provided by the E0 stream cipher in one of three modes — Mode 1 encrypts nothing, Mode 2 encrypts point-to-point traffic but leaves broadcasts in the clear, and Mode 3 encrypts both.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Bluetooth Threats, Vulnerabilities and Recommendations',
            items: [
              'Bluetooth is exposed to the usual wireless threats — eavesdropping, impersonation, denial of service and man-in-the-middle — plus location tracking, key-management problems, bluejacking, and implementation flaws such as bluesnarfing, bluebugging and car whispering',
              'Before v1.2 the unit key is reusable and becomes public once used; before v2.1 short PINs are permitted and the encryption keystream repeats',
              'Across all versions: the strength of the random number generator behind challenge-response is unknown, the encryption key length is negotiable down to a single byte, the master key is shared, and E0 is weak enough to admit a theoretical known-plaintext attack',
              'Recommendations: use complex PINs; limit radio power in high-security environments; enable only the services and profiles actually needed; keep devices non-discoverable except while pairing; require mutual authentication; configure the maximum allowable encryption key size; and unpair a lost or stolen device from everything it was paired with',
            ],
          },
          {
            type: 'note',
            items: [
              'The four “blue” attacks are easy to mix up, so order them by severity and they stay put: bluejacking pushes an unwanted message to a nearby device (a nuisance), bluesnarfing steals data such as contacts from it without pairing (a breach), bluebugging takes control of the device to place calls or read messages (a full compromise), and car whispering is bluesnarfing aimed at hands-free car kits still using their default PIN.',
              '“The encryption key length is negotiable down to a single byte” is the sharpest line on this page. One byte is eight bits, which is 256 possible keys — an attacker can try every one of them faster than you can read this sentence. The two devices agree that length between themselves, so the weaker device sets the standard for both, and configuring a maximum key size is the recommendation that answers it.',
              'Notice how much of this section is version history rather than design: the unit key before v1.2, short PINs and a repeating keystream before v2.1. On a device you cannot update, the mitigation is operational — keep it non-discoverable, pair only when you must, and unpair anything you no longer hold.',
            ],
          },
          {
            type: 'bullets',
            heading: 'SMS and MMS Attack Surface',
            items: [
              'SMS carries a short message of up to 160 characters between subscribers; the raw message is a Protocol Data Unit (PDU) carrying header fields — recipient number, encoding, length — as well as the message body',
              'MMS carries images, audio and video as well as text; although it looks identical to SMS from the user’s point of view, it is a fundamentally different protocol that retrieves content over WSP/HTTP',
              'Protocol attacks abuse legitimate functionality that is meant to be hidden from the user — administrative and provisioning traffic such as updates and voicemail notifications. Examples include the WAP push attack, forged MMS notifications, battery-draining attacks, silent billing attacks and over-the-air (OTA) settings attacks',
              'Protocol attacks also target flaws in the implementations of the SMS protocols themselves, sending a corrupted message that makes the victim’s phone run hostile code',
              'Application attacks target the software that consumes the message, and unlike protocol attacks they are highly specific to the software version — historically the browser, the MMS client or the image parser',
              'Two classic examples: a mobile Safari heap overflow triggered by viewing a malicious page, allowing arbitrary code execution; and a Motorola RAZR overflow in the way it parsed thumbnails in a JPEG EXIF header',
            ],
          },
          {
            type: 'note',
            text: 'The split to hold on to is who the attacker is talking to. A protocol attack talks to the phone’s messaging stack itself — the PDU is the raw wire format of an SMS, carrying header fields for sender, encoding and length alongside the text — and it works broadly, because every handset on the network parses that same format. An application attack talks to whatever software opens the message, which is why the Motorola RAZR case is so narrow: the flaw was in the code that drew the small preview image tucked inside a photograph’s EXIF header, so only that model running that firmware was vulnerable. Both are the Topic 4 lesson one layer down — the message is untrusted input, and the parser is the attack surface.',
          },
          {
            type: 'table',
            heading: 'Mobile Geolocation Methods',
            headers: ['Method', 'Typical Accuracy', 'How It Works and Where It Fails'],
            rows: [
              ['Tower triangulation', '50 m – 1,000 m', 'The oldest widely used method: it compares the relative power levels of the radio signals between handset and cell towers, and needs at least two towers. Distance from the towers and varying signal strength make it fairly inexact.'],
              ['GPS', '5 m – 15 m', 'Uses satellite signals rather than cellular or wireless infrastructure, and can provide continuous updates, which suits real-time applications. Reception is often poor indoors.'],
              ['802.11 (Wi-Fi positioning)', '10 m – 200 m, but sometimes badly wrong', 'Looks up nearby wireless access points in a large wardriving database. Faster and more accurate than tower triangulation and works on devices with no GPS, but an access point that has been physically moved yields a confidently wrong answer.'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Geolocation — Implementation, Risks and Best Practice',
            items: [
              'On Android, geolocation is requested through the manifest and granted at install time: ACCESS_COARSE_LOCATION for cell or Wi-Fi positioning, ACCESS_FINE_LOCATION for GPS',
              'On iOS the user approves location access each time an application using the geolocation APIs is launched, and the application chooses an accuracy class — best, nearest ten metres, hundred metres or three kilometres',
              'Risks to the end user: positional data held on remote servers and tied to an individual is a new avenue for data theft, a privacy breach, and a potential source of evidence in court; voluntarily broadcasting location can also enable stalking and harassment',
              'Risks to the service provider: negative publicity after a breach, legal or congressional subpoenas, exposure to claims of assisting criminal acts, and legal obligations under privacy law such as the UK Data Protection Act — often for stored data that was never needed to deliver the feature',
              'Best practice: use the least precise measurement that works, discard data after use, keep it anonymous, indicate clearly when tracking is on, make it opt-in, publish a privacy policy, do not share positional data with other users or services, and know the local law',
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Takeaways',
            items: [
              'Everything below the application layer — WAP gateways, Bluetooth pairing, SMS PDUs, geolocation lookups — is another untrusted input channel, and each has to be threat-modelled rather than assumed safe',
              'The WAP gap is the standing example of encryption that is end-to-end in name only: WAP 1.0 decrypts and re-encrypts at the gateway, WAP 2.0 closes it with full end-to-end TLS',
              'Small keyboards drive the whole layer towards weak secrets — 4-to-8-digit mobile PINs and Bluetooth PINs alike — which is why brute force is a live threat here rather than a theoretical one',
              'Bluetooth’s protections are only as strong as what the pair negotiated: the encryption key length can be negotiated down to a single byte, and pre-2.1 devices allow short PINs and a repeating keystream',
              'Messaging splits into two attack classes worth naming separately: protocol attacks abuse hidden provisioning traffic and work broadly, while application attacks target one parser in one software version',
              'Location data is a liability as much as a feature — collect the least precise fix that works, keep it anonymous, discard it after use, and make tracking visible and opt-in',
            ],
          },
        ],
      },
      {
        number: '7',
        title: 'Risks & Threats',
        covers: [4],
        sections: [
          {
            type: 'definition',
            heading: 'Web-Based Risk',
            text: 'Web-based risk is any threat, vulnerability, or exposure associated with using the internet that can result in data breaches, financial losses, and service disruption.',
          },
          {
            type: 'note',
            text: 'Learn that sentence exactly as written — “define web-based risk” is one of the questions the lecturer flagged as certain to appear, and the marks are on the three consequences: data breaches, financial losses, service disruption.',
          },
          {
            type: 'definition',
            heading: 'Mobile App Risks',
            text: 'Mobile app risk refers to attacks associated with the device and OS features — vulnerabilities, threats, and security flaws that occur when mobile apps connect to the internet for data exchange, such as data leakage, spyware, cryptographic issues, and phishing attacks.',
          },
          {
            type: 'note',
            items: [
              'Data leakage: sensitive information escaping the device unintentionally — e.g. an app quietly copying your contacts or location history to its own server.',
              'Spyware: malicious software that secretly monitors what you do on the device (messages, calls, location) and reports it back to an attacker.',
              'Cryptographic issues: weak or wrongly implemented encryption — such as using an outdated algorithm, or hardcoding the encryption key inside the app where a reverse engineer can find it.',
              'Phishing attacks: fake login screens or messages that trick you into typing your password into an attacker-controlled form.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Common Mobile Vulnerabilities',
            items: [
              'Insecure data storage',
              'Insecure network communication',
              'Reverse engineering & code tampering',
              'Push notification spam',
              'Jailbreak / rooting',
              'Permission abuse',
            ],
          },
          {
            type: 'note',
            items: [
              'Insecure Data Storage: sensitive data (passwords, tokens, personal info) saved on the device in plain, unencrypted form, so anyone with access to the device can read it.',
              'Reverse Engineering & Code Tampering: attackers decompile the app to study its code, find hidden secrets (like API keys), or modify it to bypass security checks.',
              'Jailbreak / Rooting: a jailbroken or rooted phone removes the manufacturer’s built-in security restrictions, making it far easier for malicious apps to access data they shouldn’t.',
              'Permission Abuse: apps requesting far more device permissions (camera, contacts, location) than they actually need, which increases the damage if the app is malicious or compromised.',
            ],
          },
          {
            type: 'text',
            heading: 'Why Mobile Risk Is Different',
            text: 'Mobile applications send processing out into “the wild” — onto user devices. They do benefit from built-in operating-system protections such as biometrics and sandboxing, but the attacker may have physical access to the device and to its runtime memory, and the developer has surrendered control of the environment the code runs in.',
          },
          {
            type: 'termlist',
            heading: 'Four Core Mobile Application Risks',
            items: [
              { term: 'Insecure data storage', def: 'unencrypted data written to the local file system — cached passwords or personal information — can be read by physically acquiring the device, or by another malicious app on it' },
              { term: 'Reverse engineering & tampering', def: 'bad actors decompile the application binary to extract hardcoded API keys, or alter the original app’s code' },
              { term: 'Man-in-the-Middle (MitM) attacks', def: 'devices frequently switch networks — from secure home Wi-Fi to a spoofed public hotspot — which makes unencrypted network traffic highly vulnerable to interception' },
              { term: 'Unpatched vulnerabilities', def: 'developers must surrender control of the operating environment, so security teams depend heavily on end users actually updating their apps and OS' },
            ],
          },
          {
            type: 'note',
            text: 'Man-in-the-Middle deserves a picture, because it is the one term here that is pure jargon. You join free Wi-Fi in a café, but the access point named “Free_WiFi” belongs to the person sitting two tables away. Every request your phone makes now passes through their laptop on its way to the internet, so anything sent without encryption is theirs to read and to alter. It is the same failure as the WAP gap in Topic 6 — readable at a point in the middle — and it takes the same answer: encrypt end to end, and never suppress the certificate warnings the platform raises.',
          },
          {
            type: 'definition',
            heading: 'Web App Risks / Threats',
            text: 'Web app threats refer to vulnerabilities and attacks that exploit weaknesses in web-based systems. These threats lead to unauthorized access, data breaches, and service disruption — driven especially by the growth of online banking and e-commerce transactions. This historical progression has driven an ever-increasing sophistication among cybercriminals, alongside a continuous need for advancement in IT security measures.',
          },
          {
            type: 'bullets',
            heading: 'Common Threats to Web Apps',
            items: [
              'Injection vulnerabilities — e.g. SQL injection, Cross-Site Scripting (XSS)',
              'Broader web-based risks — e.g. email phishing, privacy risk (cookies), financial risk (DoS — Denial of Service), operational/network risk (subject to user mistakes)',
            ],
          },
          {
            type: 'note',
            items: [
              'The handout labels that second bullet “remote remediation”. Remediation means fixing a problem, not causing one, so the label is a transcription slip — everything listed under it is a risk, not a remedy. It has been relabelled here so the two bullets read as what they are: the injection flaws, and then everything else.',
              'The items in that second bullet are the same categories set out in the next section, just written out in a line. If a question asks for common threats to web applications, lead with the injection flaws — SQL injection and XSS, both worked through in Topic 8 — and then name the broader categories.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Web-Based Risk Categories',
            items: [
              'Security risk',
              'Privacy risk — e.g. cookies',
              'Financial risk',
              'Denial of Service (DoS)',
              'Operational risk',
              'Network risk — subject to user mistakes',
            ],
          },
          {
            type: 'note',
            text: 'Watch the odd one out. Five of these six name a kind of harm — security, privacy, financial, operational, network. Denial of Service names an attack, not a harm; the harm it does is the financial and operational loss that follows. Reproduce all six as given if you are asked to list them, because that is the lecturer’s list — but if you are asked to explain them, say that DoS is the attack through which the financial and operational risks are realised. Topic 12 makes the same distinction in OWASP’s language, where the attack and the impact are two separate stages of one risk path.',
          },
          {
            type: 'termlist',
            heading: 'Top Web Application Security Risks',
            items: [
              { term: 'Injection', def: 'untrusted data is sent to an interpreter inside a command or query; the injected code looks like normal code and tricks the interpreter into executing unexpected commands or returning data without proper permission, which can bypass authorization entirely. Common flaws are SQL, NoSQL and LDAP injection' },
              { term: 'Denial of Service (DoS) / Distributed Denial of Service (DDoS)', def: 'attackers generate fake traffic through different vectors to overload the target server until it slows down and stops serving legitimate users; DDoS is the same attack at far larger scale, using botnets of thousands or millions of controlled devices' },
              { term: 'Cross-Site Request Forgery (CSRF)', def: 'victims are tricked into making unwanted requests, and the attacker leverages their existing authentication to impersonate them and act on their behalf' },
              { term: 'Cross-Site Scripting (XSS)', def: 'client-side scripts are injected into web pages to intercept sessions, impersonate users, read sensitive information, tamper with the site, or redirect to malicious URLs; it occurs whenever an application embeds untrusted data in a page without proper validation' },
              { term: 'Security misconfiguration', def: 'security controls set incorrectly in the application or surrounding infrastructure — unpatched known vulnerabilities, cloud storage exposed to the internet with no authentication, insecure defaults left as-is, misconfigured HTTP headers, or error messages detailed enough to leak information to an attacker' },
              { term: 'XML External Entities (XXE)', def: 'a misconfigured XML processor evaluates external entity references in XML files, letting an attacker expose internal server files, scan internal ports, use the web server for DoS, or achieve remote code execution' },
              { term: 'Vulnerable (insecure) deserialization', def: 'untrusted, attacker-authored data is rebuilt into objects by the language’s deserialization mechanism; in severe cases this enables remote code execution, and otherwise privilege escalation, code injection, and replay attacks' },
            ],
          },
          {
            type: 'note',
            items: [
              'Deserialization is the reverse of serialization: an object is flattened into a stream of bytes so it can be stored or sent, then rebuilt at the other end. If those bytes came from an attacker, the rebuild step is running on attacker-controlled input.',
              'Security misconfiguration is one of the most common risks precisely because it needs no clever exploit — an unpatched server or a public storage bucket is enough on its own.',
              'Note where the boundary sits: injection, XSS and XXE are input-handling failures; DoS/DDoS is an availability failure; misconfiguration is an operational failure. Grouping them this way makes them much easier to recall under exam pressure.',
            ],
          },
          {
            type: 'table',
            heading: 'Comparison: Web Risk vs Mobile App Risk',
            headers: ['Feature', 'Web Risk', 'Mobile App Risk'],
            rows: [
              ['Centralization', 'Centralized risk — concentrated on the server', 'Decentralized risk — spread across individual devices'],
              ['Attack location', 'Client–server attacks; the attack lands on the server and is distributed across users', 'The attack lands directly on the victim’s own device'],
              ['Data breach impact', 'A breach affects the entire database, and therefore every user in it', 'Data leakage from a single device, usually following physical loss or theft of the phone'],
              ['Connectivity', 'Requires an internet connection to function at all', 'Can work offline; data-exchange risk applies once it connects'],
              ['Common attack types', 'SQL injection, DDoS, CSRF', 'Reverse engineering, code tampering, permission abuse'],
            ],
          },
          {
            type: 'note',
            text: '“Differentiate between web application risk and mobile application risk” is a guaranteed question. Answer it with these five contrasts in this order — centralized vs decentralized, server vs device, whole database vs physical loss of one device, internet required vs works offline — and name one or two attack types on each side. Do not pad it with best-practice material; that is a separate question with a separate mark scheme.',
          },
        ],
      },
      {
        number: '8',
        title: 'Website Attacks',
        covers: [4],
        sections: [
          {
            type: 'definition',
            heading: 'Website Attacks',
            text: 'A website attack is any malicious action aimed at compromising a site’s availability, integrity, and confidentiality. Attackers exploit vulnerabilities in web code, servers, and user interactions to steal sensitive data, inject malware, hijack user details, or take the site completely offline.',
          },
          {
            type: 'termlist',
            heading: 'Data and Database Attacks',
            items: [
              { term: 'SQL Injection', def: 'attackers inject malicious code into search bars, login forms, or other input fields, prompting the backend database to reveal sensitive data' },
              { term: 'Cross-Site Scripting (XSS)', def: 'attackers inject harmful scripts into web pages that are then viewed by other users' },
            ],
          },
          {
            type: 'note',
            items: [
              'Telling them apart: SQL injection targets the database (backend) to extract or manipulate stored data; XSS targets other users’ browsers (frontend) by getting a malicious script to run when they view the page.',
              'Backend vs frontend: the backend is the server-side logic and database a user never sees directly; the frontend is everything rendered in the browser that the user interacts with.',
            ],
          },
          {
            type: 'note',
            items: [
              'What SQL injection actually looks like: a login form builds its query by pasting whatever you typed into a string, so entering \' OR \'1\'=\'1 in the username box turns “find the user whose name is X” into a condition that is always true, and the database hands back the first account in the table. The fix is not to ban that one string but to use parameterised queries, so input can never be read as part of the command.',
              'What XSS actually looks like: a comment box that saves what you type and shows it to the next visitor will just as happily save a <script> tag, and that script then runs in their browser, inside their logged-in session — which is how a stolen cookie becomes a hijacked account.',
              'Two flavours of XSS are worth naming: stored XSS is saved on the server and hits every visitor who loads the page, while reflected XSS is bounced straight back from a crafted URL and only hits the person who clicked the link. Stored is the more damaging, reflected the more common in phishing.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Integrity and Availability Attacks',
            items: [
              { term: 'Distributed Denial of Service (DDoS)', def: 'attackers use a network of compromised devices to flood a website with excessive traffic, overloading the server and making the site unavailable to legitimate users' },
              { term: 'Brute force & credential stuffing', def: 'automated bots test thousands of username and password combinations to break into administrative dashboards or user accounts' },
            ],
          },
          {
            type: 'note',
            text: 'The “network of compromised devices” used in a DDoS attack has a name: a botnet — thousands of infected computers, phones, and even smart-home gadgets that an attacker remotely commands to fire traffic at a single target at the same time. The “Distributed” in DDoS refers to the traffic coming from many places at once, which makes it much harder to block than a flood from one machine.',
          },
          {
            type: 'termlist',
            heading: 'Defacement and Deception Attacks',
            items: [
              { term: 'Defacement', def: 'attackers gain unauthorized access to hosting files and replace the homepage with their own message — often political statements' },
              { term: 'Deception attacks', def: 'e.g. phishing and spoofing, where attackers create a fake version of a site or message to trick users' },
            ],
          },
          {
            type: 'definition',
            heading: 'Cross-Site Request Forgery (CSRF)',
            text: 'CSRF tricks a victim into unknowingly submitting a malicious request, exploiting the victim’s logged-in identity and privileges to perform an action they never intended — enabling attacks such as financial theft, data breaches, and identity theft.',
          },
          {
            type: 'note',
            text: 'CSRF in practice: imagine you are logged in to your bank in one tab and open a malicious link in another. That page silently submits a transfer request to the bank — and because your browser automatically attaches your logged-in session cookie to every request to that site, the bank believes you made the request yourself. Common defences are CSRF tokens (a secret the malicious page cannot know) and re-confirming sensitive actions.',
          },
          {
            type: 'definition',
            heading: 'Buffer Overflow',
            text: 'A buffer overflow is a type of vulnerability where a program, while writing data to a buffer, overruns the buffer’s boundary and overwrites adjacent memory, leading to a system crash.',
          },
          {
            type: 'note',
            text: 'A buffer is simply a block of memory set aside to hold a fixed amount of data. If the program never checks that the incoming data fits, the excess spills into whatever memory sits next to it. A crash is the visible outcome, but the dangerous case is quieter: if the overwritten memory held the address the program was going to jump to next, a careful attacker can steer execution into code of their own choosing.',
          },
          {
            type: 'bullets',
            heading: 'Five Website Attacks to Name in an Exam',
            items: [
              'SQL Injection (SQLi) — malicious input in a search bar, login form or other field manipulates the backend database, giving unauthorized access, data theft, or compromise of the host system',
              'Cross-Site Scripting (XSS) — a harmful script is injected into a page and executes in another user’s browser, hijacking their session or stealing cookies',
              'Malware / backdoor attacks — malicious code, or a hidden route back into the site, is planted on the server',
              'Brute-force login attacks — automated bots test thousands of credential combinations against admin dashboards or user accounts',
              'Phishing — a fake copy of a legitimate site tricks visitors into giving up credit card numbers or login credentials',
            ],
          },
          {
            type: 'note',
            text: 'This is the exact list to give when a question says “define a website attack and give five examples”. Open with the definition — any malicious action aimed at compromising a site’s availability, integrity, or confidentiality by exploiting web code or server–user interactions — then name the five. The marks are on those terms, not on the length of the prose around them.',
          },
        ],
      },
      {
        number: '9',
        title: 'Strengths, Weaknesses & Best Practice',
        covers: [4, 5, 6],
        sections: [
          {
            type: 'bullets',
            heading: 'Strengths of a Website',
            items: [
              'Universally accessible from any device with an internet connection and a browser, ensuring broad accessibility and ease of use',
              'Supports dynamic and interactive content',
              'Easier to deploy than installed applications',
              'Updates and maintenance are simple and instant, since developers update directly on the server',
            ],
          },
          {
            type: 'note',
            text: 'Static vs dynamic websites: a static website shows the same fixed content to every visitor (just HTML/CSS), while a dynamic website generates content based on user input, database queries, or other variables — most modern web apps (social media, banking, e-commerce) are dynamic.',
          },
          {
            type: 'proscons',
            heading: 'Web App — Advantages & Disadvantages',
            advantages: [
              'Accessibility',
              'Convenience',
              'Cost-effective — one version works across platforms, no separate iOS/Android builds to maintain',
              'Updatability — changes go live for everyone the moment the server is updated',
              'Security',
              'Collaboration',
            ],
            disadvantages: [
              'Cannot be used without an internet connection',
              'Performance depends on the speed and reliability of the user’s internet connection',
              'Browser compatibility issues',
              'Extra development effort required to ensure cross-browser/cross-device compatibility',
            ],
          },
          {
            type: 'note',
            text: '“Security” appears as an advantage here, yet the comparison table in Topic 1 lists the web app as the more exposed of the two. Both are true, and an examiner will accept either provided you say which sense you mean. The strength is centralised control: one patch on the server protects every user at once, and nobody is left running last year’s version. The weakness is exposure: that same server is reachable by anyone with an internet connection, which is why every attack in Topic 8 is aimed straight at it.',
          },
          {
            type: 'bullets',
            heading: 'Solutions to These Challenges',
            items: ['Regular security audits', 'Regular software updates'],
          },
          {
            type: 'text',
            heading: 'Best Practice — Defending Web & Mobile Apps',
            text: 'There are two broad approaches to defense: testing methodologies that find vulnerabilities before or during runtime, and protective mechanisms that actively block attacks in real time.',
          },
          {
            type: 'termlist',
            heading: 'Testing Methodologies',
            items: [
              { term: 'Static Application Security Testing (SAST)', def: 'analyzes the app’s source code during development, before the app is running' },
              { term: 'Software Composition Analysis (SCA)', def: 'identifies known vulnerabilities in third-party libraries and open-source components used in the app' },
              { term: 'Interactive Application Security Testing (IAST)', def: 'observes app behavior — input, output, data flow, and logic — to conduct run-time analysis from inside the running application' },
              { term: 'Dynamic Application Security Testing (DAST)', def: 'analyzes the app while it is running, including servers, and typically requires manual configuration' },
            ],
          },
          {
            type: 'note',
            items: [
              'An easy way to keep SAST and DAST apart: SAST is like proofreading a recipe before you cook (reading the source code); DAST is like tasting the finished dish (probing the running app from the outside, the way an attacker would).',
              'IAST is often described as combining SAST and DAST: it runs during testing like DAST, but has visibility into the actual code like SAST.',
            ],
          },
          {
            type: 'note',
            text: 'SCA is the odd one out of the four, because it does not examine code you wrote at all. A modern application is mostly assembled from third-party libraries, so SCA reads your list of dependencies and checks each one against public vulnerability databases — catching the case where your own code is faultless but the logging library you imported has a known hole in it. That is why “regular software updates” sits in the solutions list above, and it is the tooling answer to the OWASP risk of vulnerable and outdated components.',
          },
          {
            type: 'termlist',
            heading: 'Protective Mechanisms',
            items: [
              { term: 'Web Application Firewall (WAF)', def: 'protects a web app against malicious attacks by filtering and monitoring HTTP traffic' },
              { term: 'Runtime Application Self-Protection (RASP)', def: 'detects, protects against, and blocks attacks by employing app instrumentation directly inside the running application' },
            ],
          },
          {
            type: 'note',
            text: 'WAF vs RASP in one line: a WAF stands guard in front of the application, inspecting HTTP traffic before it arrives; RASP lives inside the running application and stops an attack at the exact moment the code would execute it. They complement each other rather than compete.',
          },
          {
            type: 'termlist',
            heading: 'Web Application Security Best Practices',
            items: [
              { term: 'Execute input validation', def: 'verify all data submitted to the application for type, length, format and range before processing it, so attackers cannot inject malicious code — the primary mitigation for SQL injection and XSS' },
              { term: 'Employ up-to-date encryption', def: 'use Transport Layer Security (TLS) with current recommended cipher suites and protocols for data in transit, and store user passwords using strong cryptographic hash functions such as SHA-256 or SHA-512 before they go into the database' },
              { term: 'Enhance authentication and authorization', def: 'implement multi-factor authentication (MFA), set complex password requirements, limit failed login attempts to blunt brute-force attacks, and use role-based access control (RBAC) so each user holds only the permissions their role needs' },
              { term: 'Track API usage', def: 'ensure every API the application uses has adequate authentication and authorization and communicates over encrypted channels; monitor usage routinely and analyse access logs for unusual activity' },
              { term: 'Record code changes', def: 'keep accurate records of updates, bug fixes and new features using a version control system such as Git, so a security problem introduced by a recent modification can be traced quickly' },
              { term: 'Employ dynamic testing for security validation', def: 'run DAST across every stage of the development lifecycle — early testing, staging and production — to catch injection, XSS, broken authentication and session management, and insecure direct object references; this is what “shifting security left” means in practice' },
            ],
          },
          {
            type: 'note',
            items: [
              'These six are their own exam question. Keep them separate from the web/mobile risk answers — the lecturer specifically warned against mixing the two, because a best-practice question earns no marks for describing risks.',
              'Each best practice pairs with a risk from Topic 7: input validation answers injection and XSS, up-to-date encryption answers interception, stronger authentication answers brute force, API tracking and change records answer misconfiguration. If a question asks you to justify a practice, name the risk it closes.',
            ],
          },
        ],
      },
      {
        number: '10',
        title: 'Audit, Compliance & Quality Assurance',
        date: '8 Jul 2026',
        covers: [7],
        sections: [
          {
            type: 'text',
            heading: 'Overview',
            text: 'Beyond the testing methodologies and protective mechanisms in the previous topic, keeping a web or mobile application secure is an ongoing operational discipline. The following are practical measures for maintaining audit compliance and quality assurance in day-to-day operation.',
          },
          {
            type: 'definition',
            heading: 'Quality Assurance (QA)',
            text: 'Quality assurance ensures that software products meet the desired standard. It is measured against a fixed set of evaluation metrics, so that “the product is good” becomes a claim that can actually be tested and evidenced.',
          },
          {
            type: 'termlist',
            heading: 'QA Evaluation Metrics',
            items: [
              { term: 'Functionality', def: 'the product does what it was specified to do' },
              { term: 'Performance', def: 'it responds and processes within acceptable time and load limits' },
              { term: 'Reliability', def: 'it behaves consistently and remains available over time' },
              { term: 'Usability', def: 'users can operate it correctly, without confusion' },
              { term: 'Compatibility', def: 'it works across the intended browsers, devices and platforms' },
              { term: 'Security', def: 'it protects data and withstands attack' },
            ],
          },
          {
            type: 'note',
            text: 'Memorise the six as a list — Functionality, Performance, Reliability, Usability, Compatibility, Security. “Write short notes on quality assurance” and “list the evaluation metrics” are the same question in this course, and the marks are awarded for naming all six, not for describing any of them at length. Lead with the one-line definition, then the list.',
          },
          {
            type: 'bullets',
            heading: 'Practical Measures for Audit Compliance & QA',
            items: [
              'Ensure devices are properly secured',
              'Apply regular updates and patches',
              'Train staff on threat awareness',
              'Implement Multi-Factor Authentication (MFA)',
              'Allocate bandwidth to your devices and monitor them regularly',
              'Organise regular maintenance',
              'Make sure data is encrypted',
              'Implement compliance management tools',
              'Perform regular audits',
              'Have a technical expert available for support',
              'Set up an in-house IT team within your staff',
              'Keep proper documentation for all system and network configurations',
            ],
          },
          {
            type: 'note',
            items: [
              'Audit, compliance and QA are easy to confuse: an audit is a check of what you actually did (reviewing logs and configurations after the fact), compliance means meeting the rules a standard or law requires, and quality assurance (QA) is testing that the app behaves correctly and securely before and after release.',
              'MFA (Multi-Factor Authentication) asks for a second proof of identity — a one-time code, a phone prompt, or a fingerprint — on top of the password, so a stolen password alone is not enough to log in.',
              'Encrypting data “at rest and in transit” means scrambling it both while it is stored and while it travels over the network, so that intercepted or stolen data is unreadable without the key.',
              'Proper documentation is a security control in its own right: you cannot audit, patch, or recover a system whose configuration nobody has written down.',
            ],
          },
          {
            type: 'note',
            text: 'These operational measures complement the testing methodologies from the previous topic — SAST, DAST, IAST and SCA find flaws in the code, while audits, patching, staff training and documentation keep the running system secure over time. Exam questions often ask you to connect the two: a vulnerability found in testing is only truly fixed once the patch is deployed and the change is documented and audited.',
          },
        ],
      },
      {
        number: '11',
        title: 'Web Application Security & the Security Lifecycle',
        covers: [5],
        partial: [9],
        sections: [
          {
            type: 'definition',
            heading: 'Web Application Security',
            text: 'Web application security is the practice of detecting and preventing cyber attacks on websites and web applications — building websites that are secure to begin with. It is the set of security controls built into a web application to protect it from a growing variety of cyber threats.',
          },
          {
            type: 'text',
            heading: 'A Lifecycle, Not a Stage',
            text: 'Web applications inevitably contain bugs and misconfigurations, and some of those are security vulnerabilities an attacker can exploit. Web application security addresses them by leveraging secure development practices, implementing security testing throughout the software development lifecycle (SDLC), resolving design-level defects, and avoiding security problems during deployment and at runtime. Security is therefore not a phase bolted on before release — it runs from design through development, testing, deployment and live operation.',
          },
          {
            type: 'note',
            text: 'This is the “lifecycle approach” item on the course outline. A design-level defect — say, an application that was architected to trust input from its own mobile client — cannot be patched away later by a firewall rule; it has to be caught in design. That is the whole argument for spreading security across the lifecycle rather than testing once at the end.',
          },
          {
            type: 'definition',
            heading: 'Why Web Security Testing Is Important',
            text: 'Web security testing focuses on identifying security vulnerabilities in web applications and their configurations, and its primary objective is the application layer. Testing typically involves delivering various input types to provoke errors and cause unexpected system behaviour. These “negative tests” investigate whether the system is performing tasks it was never designed to execute.',
          },
          {
            type: 'note',
            items: [
              'A positive test asks “does the login form accept a valid password?” A negative test asks “what happens if I put a quote mark, 10,000 characters, or a script tag in the username field?” Security lives almost entirely in the second question.',
              'The value of vulnerability and security assessment is that it converts an unknown risk into a known, prioritised defect that can be scheduled, fixed and verified — which is precisely what the audit and QA discipline in Topic 10 then has to evidence.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Two Ways to Defend',
            items: [
              'Prevention — find and remove the vulnerability before an attacker reaches it, using SAST, SCA, IAST and DAST',
              'Blocking — stop the attack in real time as it arrives, using a Web Application Firewall (WAF) or Runtime Application Self-Protection (RASP)',
            ],
          },
          {
            type: 'note',
            text: 'Ideally an organisation employs both methods, not one. The individual tools are defined in Topic 9 — this topic is about where each of them sits in the lifecycle: SAST and SCA during development, IAST and DAST during testing and staging, WAF and RASP in production.',
          },
        ],
      },
      {
        number: '12',
        title: 'The OWASP Top 10 — Ranking Web Application Risk',
        covers: [4],
        partial: [5, 9],
        sections: [
          {
            type: 'definition',
            heading: 'The OWASP Top 10',
            text: 'The OWASP Top 10 is a published list of the ten most critical security risks facing web applications. Each entry is named after the type of attack, the type of weakness, or the type of impact it causes — OWASP chose whichever name was already best known, because the primary aim of the list is to educate. It is a place to start and an awareness document, not a complete catalogue of everything that can go wrong with an application.',
          },
          {
            type: 'note',
            items: [
              'OWASP is the Open Web Application Security Project, a non-profit that publishes the list along with free tools and testing guides. Nobody is obliged to adopt it; it carries weight because the industry settled on it as the common vocabulary for web risk.',
              'This topic teaches the 2013 edition, because the ratings and the figures below are that edition’s and the numbering has to match. The current edition is 2021, and the last table in this topic maps every 2013 entry onto where it now sits. Whenever you quote the Top 10 — in an exam answer or a report — say which edition you mean.',
              'Topic 7 already named seven of these risks. This topic is where that vocabulary comes from, and it adds the part Topic 7 leaves out: how OWASP decides that one risk outranks another.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Traditional Areas of Concern',
            items: [
              { term: 'Confidentiality', def: 'only those authorised to see the data can see it' },
              { term: 'Integrity', def: 'the data is what it is supposed to be, and any unauthorised change is prevented or detected' },
              { term: 'Availability', def: 'the system is there and working when a legitimate user needs it' },
              { term: 'Accountability', def: 'every action can be traced back to whoever performed it, so nobody can plausibly deny what they did' },
            ],
          },
          {
            type: 'note',
            items: [
              'Topic 7 and CYB 122 teach the first three of these as the CIA triad. Neither list is wrong. Accountability is the fourth property practitioners add once a system has real users, because confidentiality, integrity and availability can all be intact while nobody can say who made a change. If a question asks for the triad, give three; if it asks what security protects, four is the better answer — and name the fourth as accountability, the property that makes non-repudiation possible.',
              'Security is dependent on context. A teaching hospital’s records, a student portal and a payment gateway do not want the same balance of these four, so an organisation’s security requirements follow from what it actually does rather than from a standard list.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Three Levels of Security',
            items: [
              { term: 'Physical', def: 'doors, walls and locks — controlling who can reach the machine at all' },
              { term: 'Network', def: 'the operating system, the network itself, and the firewalls between its segments' },
              { term: 'Application', def: 'the software running at the application layer, and the data it handles' },
            ],
          },
          {
            type: 'note',
            text: 'Every risk in this topic lives at the third level, and that is the whole reason the list exists. A firewall doing its job perfectly still forwards an injection payload, because the payload arrives inside an ordinary HTTP request on a port the firewall is meant to leave open. Physical and network controls cannot see it — only the application can.',
          },
          {
            type: 'termlist',
            heading: 'Perceived Security vs Actual Security',
            items: [
              { term: 'Security theatre', def: 'a control that looks reassuring but changes nothing an attacker actually has to do' },
              { term: 'FUD — fear, uncertainty and doubt', def: 'justifying a control by frightening people rather than by naming the risk it closes' },
              { term: 'Absolutism', def: 'the belief that a system can be made totally secure. Nothing is. Security raises the cost of an attack; it does not reduce risk to zero' },
            ],
          },
          {
            type: 'text',
            heading: 'The Risk Path',
            text: 'Attackers can potentially use many different paths through your application to do harm to your business or organisation, and each of those paths represents a risk that may — or may not — be serious enough to warrant attention. OWASP models a single path as a chain of six stages, and every entry in the Top 10 is named after one stage or another of that chain.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/01-risk-path-model.webp',
            width: 1400, height: 168, maxWidth: 720,
            alt: 'A single left-to-right chain of six stages joined by dotted blue arrows: a stick figure labelled "Threat Agents" glowing yellow, then an "Attack Vector" arrow-shaped box, then a wide "Weakness" box with a white arrow entering it, then a "Control" box, then a database cylinder labelled "Technical Impacts", and finally a document-shaped box labelled "Business Impacts"',
            caption: 'Figure 1: one path through an application — threat agent, attack vector, weakness, control, technical impact, business impact.',
          },
          {
            type: 'termlist',
            heading: 'The Six Stages, Defined',
            items: [
              { term: 'Threat agent', def: 'an individual or group that can manifest a threat. It is fundamental to identify who would want to exploit the assets of a company, and how they might use them against the company' },
              { term: 'Attack', def: 'the techniques attackers use to exploit vulnerabilities in applications' },
              { term: 'Vulnerability', def: 'a hole or weakness in the application — a design flaw or an implementation bug — that allows an attacker to cause harm to the stakeholders of an application. The term is often used very loosely' },
              { term: 'Control', def: 'a defensive technology or module used to detect, deter or deny attacks. A weakness or design flaw in a control, or the absence of a necessary control, is itself a vulnerability' },
              { term: 'Technical impact', def: 'the system damage resulting from a successful breach — the effect on the technology only, not on the business' },
              { term: 'Business impact', def: 'the impact on the business, generally counted in money, lives, reputation, customers or speed' },
            ],
          },
          {
            type: 'note',
            items: [
              'Read the chain as one sentence: a threat agent detects a weakness in the application and its controls, then launches an attack that causes both technical and business impacts.',
              'The last link is the one engineers skip and the one that gets the work funded. “The orders table can be read” is a technical impact; “every customer’s address and card reference can be read, which is a regulatory penalty and a front-page story” is the business impact. The business risk is what justifies investment in fixing the security problem.',
              'Notice that a vulnerability gets defined twice over — as a weakness in the application, and as a missing or flawed control. That is deliberate: forgetting to add a check is exactly as exploitable as writing a broken one.',
            ],
          },
          {
            type: 'text',
            heading: 'Many Paths, One Risk',
            text: 'A real application does not offer one path; it offers hundreds. The next figure fans the same six stages out into every route an attacker might take through a system, and then picks one of those routes out in red.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/02-example-security-risk.webp',
            width: 1400, height: 639, maxWidth: 720,
            alt: 'The risk-path diagram fanned out into many parallel routes. On the left two threat-agent stick figures, one glowing yellow; three "Attack Vector" boxes lead right into four rows of "Weakness" and "Control" boxes, which converge on two "Technical Impacts" database cylinders and then on three "Business Impacts" documents. Blue dotted lines show all the possible routes; one route is picked out in thick red dotted line and yellow highlighting — the glowing threat agent takes an attack vector, drops down past the controls to an unprotected weakness on the bottom row, through a control shaded red to show it was bypassed, and up into a technical impact and a business impact',
            caption: 'Figure 2: every route an attacker might take, with one successful route highlighted.',
          },
          {
            type: 'note',
            items: [
              'Follow the red route. The highlighted threat agent picks one attack vector out of three, drops past the rows where a control stands in front of the weakness, and reaches the one weakness on the bottom row with nothing guarding it — the control shaded red is the one that was bypassed. From there the route runs into a technical impact and out into a business impact.',
              'That is the lesson of the picture: the controls above did not fail, and they did not matter. An attacker needs one open path; a defender has to close every one. Since no team can close every one, the work has to be ordered by risk.',
              'OWASP orders it as Risk = Likelihood × Impact. Likelihood is how plausible the path is, impact is what it costs at the end of it. A frightening-looking weakness nobody can reach scores low; a mundane one sitting on an open path scores high.',
            ],
          },
          {
            type: 'text',
            heading: 'How OWASP Rates a Risk',
            text: 'Every entry in the Top 10 carries the same four ratings, and each rating sits over a stage of the risk path. Exploitability, prevalence and detectability together estimate the likelihood; impact estimates the cost. The strip below is the one OWASP published for A1 Injection — the other nine ratings are gathered into the table that follows.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/03-a1-injection-rating.webp',
            width: 1400, height: 253, maxWidth: 700,
            alt: 'OWASP\'s risk-rating strip for A1 Injection. A blue band across the top repeats the risk path — Threat Agents, Attack Vector, Weakness, Technical Impacts, Business Impacts — and a band of coloured cells beneath rates each stage: Exploitability EASY on red, Prevalence COMMON on amber, detectability AVERAGE on amber, Impact SEVERE on red. The threat-agent and business-impact cells are grey and left blank, because those are application-specific',
            caption: 'Figure 3: how OWASP rates one risk — the ratings sit directly over the stages of the risk path.',
          },
          {
            type: 'note',
            items: [
              'Read the four columns as questions. Exploitability: how much skill and effort does the attack take? Prevalence: how often does this weakness turn up in real applications? Detectability: how easily can an attacker find it — not how easily your own team can. Impact: how much technical damage does it do when it works?',
              'Two cells in the strip are grey and deliberately empty. Who would attack your application, and what a breach would cost your organisation, are specific to your application — OWASP cannot fill them in for you, and filling them in is exactly what a real risk assessment is.',
              'Injection is EASY to exploit, COMMON, and SEVERE in impact, which is what put it at number one. Its detectability is only AVERAGE — easy to exploit and not especially easy to spot is a worse combination than merely widespread.',
            ],
          },
          {
            type: 'table',
            heading: 'The Ten Risks, and How the 2013 List Rated Them',
            headers: ['#', 'Risk', 'Exploitability', 'Prevalence', 'Detectability', 'Impact'],
            rows: [
              ['A1', 'Injection', 'EASY', 'COMMON', 'AVERAGE', 'SEVERE'],
              ['A2', 'Broken Authentication and Session Management', 'AVERAGE', 'COMMON', 'AVERAGE', 'SEVERE'],
              ['A3', 'Cross-Site Scripting (XSS)', 'AVERAGE', 'VERY WIDESPREAD', 'EASY', 'MODERATE'],
              ['A4', 'Insecure Direct Object References', 'EASY', 'COMMON', 'EASY', 'MODERATE'],
              ['A5', 'Security Misconfiguration', 'EASY', 'COMMON', 'EASY', 'MODERATE'],
              ['A6', 'Sensitive Data Exposure', 'DIFFICULT', 'UNCOMMON', 'AVERAGE', 'SEVERE'],
              ['A7', 'Missing Function Level Access Control', 'EASY', 'UNCOMMON', 'AVERAGE', 'MODERATE'],
              ['A8', 'Cross-Site Request Forgery (CSRF)', 'AVERAGE', 'WIDESPREAD', 'EASY', 'MODERATE'],
              ['A9', 'Using Components with Known Vulnerabilities', 'AVERAGE', 'WIDESPREAD', 'DIFFICULT', 'MODERATE'],
              ['A10', 'Unvalidated Redirects and Forwards', 'AVERAGE', 'UNCOMMON', 'EASY', 'MODERATE'],
            ],
          },
          {
            type: 'note',
            items: [
              'A6 is the instructive row. It is DIFFICULT to exploit and UNCOMMON, and it still made the list — because the impact is SEVERE. That is Risk = Likelihood × Impact doing its work: a rare, hard attack outranks a frequent easy one once the loss is large enough.',
              'A3 carries the highest prevalence on the list, VERY WIDESPREAD, but only MODERATE impact. Common is not the same as serious, and an exam answer that ranks risks by how often they occur has missed half the formula.',
              'A9 is the only entry rated DIFFICULT to detect, and that is from the defender’s side as much as the attacker’s: most teams cannot list the third-party components their own application depends on, which is precisely why the risk survives.',
            ],
          },
          {
            type: 'termlist',
            heading: 'What Each of the Ten Means',
            items: [
              { term: 'A1 Injection', def: 'Injection flaws, such as SQL, OS and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing unauthorized data.' },
              { term: 'A2 Broken Authentication and Session Management', def: 'Application functions related to authentication and session management are often not implemented correctly, allowing attackers to compromise passwords, keys or session tokens, or to exploit other implementation flaws to assume other users’ identities.' },
              { term: 'A3 Cross-Site Scripting (XSS)', def: 'XSS flaws occur whenever an application takes untrusted data and sends it to a web browser without proper validation and escaping. XSS allows attackers to execute scripts in the victim’s browser, which can hijack user sessions, deface web sites, or redirect the user to malicious sites.' },
              { term: 'A4 Insecure Direct Object References', def: 'A direct object reference occurs when a developer exposes a reference to an internal implementation object, such as a file, directory or database key. Without an access control check or other protection, attackers can manipulate these references to access unauthorized data.' },
              { term: 'A5 Security Misconfiguration', def: 'Good security requires a secure configuration defined and deployed for the application, frameworks, application server, web server, database server and platform. All these settings should be defined, implemented and maintained, as many are not shipped with secure defaults.' },
              { term: 'A6 Sensitive Data Exposure', def: 'Many web applications do not properly protect sensitive data — credit cards, national identity numbers, authentication credentials — with appropriate encryption or hashing. Attackers may steal or modify such weakly protected data to conduct identity theft, credit card fraud, or other crimes.' },
              { term: 'A7 Missing Function Level Access Control', def: 'Not all users should have access to all functions. Sometimes function level protection is managed through configuration and the system is misconfigured; sometimes developers simply forget to include the proper checks.' },
              { term: 'A8 Cross-Site Request Forgery (CSRF)', def: 'A CSRF attack forces a logged-on victim’s browser to send a forged HTTP request, including the victim’s session cookie and any other automatically included authentication information, to a vulnerable web application. This forces the victim’s browser to generate requests the application thinks are legitimate.' },
              { term: 'A9 Using Components with Known Vulnerabilities', def: 'Virtually every application has these issues, because most development teams do not focus on keeping their components and libraries up to date. In many cases the developers do not even know all the components they are using, never mind their versions. Component dependencies make things even worse.' },
              { term: 'A10 Unvalidated Redirects and Forwards', def: 'Web applications frequently redirect and forward users to other pages and websites, and use untrusted data to determine the destination pages. Without proper validation, attackers can redirect victims to phishing or malware sites, or use forwards to access unauthorized pages.' },
            ],
          },
          {
            type: 'note',
            text: 'Learn these ten as a vocabulary, not as ten separate essays. Four of them — A1, A3, A5 and A8 — you already met under different headings in Topics 7 and 8, and the mobile equivalents of most of them are in Topic 4’s OWASP Mobile Top 10. The five sections that follow take one risk each and show what it looks like from the outside, which is the part a definition cannot give you.',
          },
          {
            type: 'text',
            heading: 'A1 Injection — Watching It Happen',
            text: 'The demonstration used a bank’s messaging feature: three pages, each of which takes the message the user typed and hands it on to something that interprets text.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/04-injection-demo-flow.webp',
            width: 1400, height: 258, maxWidth: 700,
            alt: 'Three rounded slate-grey boxes joined left to right by grey block arrows. First, "LeaveMsg.asp — allows user to enter a message for the bank; only one message per user at a time". Second, "confirmMsg.asp — saves message into queue (form\'s target); confirms message saved". Third, "Email.asp — generates HTML for email to user"',
            caption: 'Figure 4: the injection demonstration — one message, three interpreters.',
          },
          {
            type: 'note',
            items: [
              'Trace the untrusted string. The user types it on LeaveMsg.asp; confirmMsg.asp writes it into a database queue, where it is read as part of a SQL statement; Email.asp reads it back out and builds HTML from it. One piece of input, three chances to be treated as code rather than as text — which is why injection and XSS keep appearing together.',
              'Injection is not only SQL. Any interpreter that takes a string can be injected: the shell (OS command injection), a directory service (LDAP injection), an XML parser, a template engine. The rule is the same everywhere — never build a command by pasting input into a string, and use parameterised queries or the equivalent so input can never cross into the command.',
              'Topic 8 shows the payload itself and the always-true condition that gets you past a login form; this flow shows why it is so hard to stamp out. If you want the joke that makes it stick, it is xkcd 327, “Exploits of a Mom”, at https://xkcd.com/327/ — a mother whose son’s registered name is written so that the school’s database reads it as a command to delete the students table. Sanitise your database inputs.',
              'The bank in this demonstration was a deliberately vulnerable practice site, and it has been offline since around 2017 — as have the other demonstration sites in this topic. The flows are the teaching material; do not go looking for the sites, and never point a tool at a system you do not own or have written permission to test.',
            ],
          },
          {
            type: 'text',
            heading: 'A6 Sensitive Data Exposure — Reading an Error Page',
            text: 'Sensitive data exposure is usually taught as unencrypted card numbers, but its cheapest form is an error message. The screenshot below took no tool and no payload: a page expects a record identifier in the URL, and the tester replaced it with the word “foo”.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/05-sensitive-data-exposure.webp',
            width: 1325, height: 941, maxWidth: 660,
            alt: 'An Internet Explorer window whose address bar, ringed in red, reads "http://localhost:62275/Genre.aspx?ID=foo". The page is an ASP.NET yellow-screen-of-death: a red heading "Server Error in \'/\' Application", the message "Conversion failed when converting from a character string to uniqueidentifier", then Description, Exception Details naming System.Data.SqlClient.SqlException, Source Error, and a Stack Trace panel listing internal .NET database calls such as SqlConnection.OnError, TdsParser.ThrowExceptionAndWarning and SqlDataReader.ReadInternal',
            caption: 'Figure 5: one wrong parameter, and the application describes its own internals.',
          },
          {
            type: 'note',
            items: [
              'Work through what the page gives away. The address bar, ringed in red, ends in ?ID=foo — that is the whole attack. Anyone can edit a URL, so this is a test every user of the site could run by accident.',
              'The message — “Conversion failed when converting from a character string to uniqueidentifier” — says the ID column is a GUID, and that the value went from the URL into the query without ever being validated as a GUID first. That is the same missing check an injection attempt would exploit.',
              'The exception type, System.Data.SqlClient.SqlException, names the data access provider, so the attacker now knows the backend is Microsoft SQL Server reached through ADO.NET — and therefore which dialect of SQL to write, and which quoting and comment syntax will work.',
              'The stack trace lists internal calls such as SqlConnection.OnError, TdsParser.ThrowExceptionAndWarning and SqlDataReader.ReadInternal. That is the shape of the data-access layer, the framework in use, and often its version. None of it is customer data, but it is the map that makes finding customer data quick.',
              'The fix has two halves, and both are needed. Validate the parameter before it reaches the query, so “foo” is rejected as a bad request rather than passed to the database. And configure production to show a plain, custom error page while the detail goes to a server-side log — a debug configuration deployed to production is A5 Security Misconfiguration handing an attacker A6.',
            ],
          },
          {
            type: 'text',
            heading: 'A8 Cross-Site Request Forgery — A Request You Never Made',
            text: 'The CSRF demonstration targeted a home router rather than a bank, and the flow is worth following because of what the middle step does not require.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/06-csrf-demo-flow.webp',
            width: 1400, height: 320, maxWidth: 700,
            alt: 'Three rounded boxes joined left to right by grey block arrows. First, "Login.asp — user logs in and is given session cookie". Second, drawn in black to mark it as the attacker\'s step, "User opens another page in new browser tab — img tab sends request \'on behalf of user\' to one of routers CGI pages". Third, "Router system processes message as if it was a user request"',
            caption: 'Figure 6: the attacker’s step is the black box in the middle — and it is only an image tag.',
          },
          {
            type: 'note',
            items: [
              'Topic 8 explains the bank-transfer version of CSRF and the token that stops it. Two things this flow adds. First, the forged request needs no form and no click: an image tag whose source is not an image but an administration URL is enough, because the browser fetches image sources automatically as it renders the page.',
              'Second, look at the target. The router’s administration interface is not reachable from the internet — but it is reachable from your browser, which sits inside your network. CSRF turns the victim’s browser into a bridge across that boundary, which is why the technique is used against routers, printers and internal dashboards as much as against banks.',
              'The application cannot tell the difference on its own, because the request is genuinely well formed and genuinely carries the user’s session cookie. That is why the defence has to add something the attacker’s page cannot know — a per-session CSRF token — rather than trying to inspect the request more carefully.',
            ],
          },
          {
            type: 'text',
            heading: 'A9 Components with Known Vulnerabilities — the Conference’s Own Site',
            text: 'The best example of this risk in the original talk was the website of the conference the talk was given at. It had been defaced through a component nobody had patched.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/07-defacement-anztb.webp',
            width: 586, height: 1039, maxWidth: 320,
            alt: 'An iPhone screenshot of the site anztb.org in Safari. The top of the page still shows the legitimate ANZTB and ISTQB logos, the navigation bar, a banner for "ANZTB Test 2017, Testing for Tomorrow, 5 May 2017 in Wellington", and four content tiles. Below that the page has been overwritten with a grid of defacement images — orange and black graphics reading "TURKHACKTEAM", a Turkish flag crest, and a black banner captioned "TURK HACK TEAM" between rows of stars',
            caption: 'Figure 7: the conference site, still showing its own logos above the defacement.',
          },
          {
            type: 'note',
            items: [
              'Nobody had to invent an exploit here. The vulnerability was public, the patch was public, and the only thing missing was somebody applying it — which is what makes this risk different in kind from the others. It is not a coding mistake; it is an operational one.',
              'Notice that the site’s own header survives above the defacement. Defacement is defined in Topic 8 as replacing the page with the attacker’s message, and it is the loudest possible use of that access. The same foothold could have been used quietly to read the site’s database instead, and nobody would have known.',
              'The tooling answer is SCA from Topic 9 — it reads your dependency list and checks each entry against public vulnerability databases — and the operational answer is the “regular software updates” line in the same topic. Between them they turn “we did not know we were running that” into a report somebody has to act on.',
            ],
          },
          {
            type: 'text',
            heading: 'A10 Unvalidated Redirects and Forwards — Login, Then Surprise',
            text: 'The last demonstration is the subtlest, and the slide is a PowerPoint build, so the flow appears twice with one copy offset behind the other. The run you can read is the one that starts from a link in an email.',
          },
          {
            type: 'image',
            src: '/lecture-notes/uuy-cyb-222/08-redirect-demo-flow.webp',
            width: 1400, height: 273, maxWidth: 700,
            alt: 'Three rounded boxes joined left to right by grey block arrows, each drawn with a second identical box stacked behind it to show a second run of the same flow. In front: "Link to site in email — user is not logined in, redirect to login.asp", then "Login.asp — user logs in and is given session cookie", then a black box reading "Surprise!"',
            caption: 'Figure 8: the redirect demonstration — a genuine login, then a destination nobody validated.',
          },
          {
            type: 'note',
            items: [
              'Follow it. A link in an email points at the real site. The user is not logged in, so the application redirects them to its own login page; they log in and are given a session cookie; and then the application forwards them on to wherever the original link said they were going — the “Surprise!” box. The destination came from the untrusted link, and nothing checked it.',
              'This works on careful people, and that is the point. Every piece of advice students are given about phishing — check the domain, do not log in from an emailed link — is satisfied here. The domain is real, the login page is real, the password went to the right server. Only the last hop was the attacker’s.',
              'The fix is to stop putting destinations in parameters at all. Redirect to a fixed page, or send a short key that the server maps to an approved destination on its own side. If a full URL genuinely must travel in the request, check it against an allow-list of your own hosts before you obey it.',
            ],
          },
          {
            type: 'table',
            heading: 'Where Each 2013 Risk Went in the 2021 List',
            headers: ['2013 entry', 'In the OWASP Top 10 2021'],
            rows: [
              ['A1 Injection', 'A03:2021 Injection — still here, but XSS was folded into it'],
              ['A2 Broken Authentication and Session Management', 'A07:2021 Identification and Authentication Failures (renamed)'],
              ['A3 Cross-Site Scripting', 'Merged into A03:2021 Injection — XSS is no longer its own entry'],
              ['A4 Insecure Direct Object References', 'Merged into A01:2021 Broken Access Control'],
              ['A5 Security Misconfiguration', 'A05:2021 Security Misconfiguration (unchanged)'],
              ['A6 Sensitive Data Exposure', 'A02:2021 Cryptographic Failures — renamed to name the cause rather than the symptom'],
              ['A7 Missing Function Level Access Control', 'Merged into A01:2021 Broken Access Control'],
              ['A8 Cross-Site Request Forgery', 'Merged into A01:2021 Broken Access Control; dropped as its own entry in 2017, once frameworks shipped protection by default'],
              ['A9 Using Components with Known Vulnerabilities', 'A06:2021 Vulnerable and Outdated Components (renamed)'],
              ['A10 Unvalidated Redirects and Forwards', 'Dropped from the Top 10 in 2017; the access-control half now sits under A01:2021'],
            ],
          },
          {
            type: 'bullets',
            heading: 'New in 2021, With No 2013 Ancestor',
            items: [
              'A04:2021 Insecure Design — flaws that no amount of careful coding can fix, because the design itself was wrong',
              'A08:2021 Software and Data Integrity Failures — trusting code, updates or serialised data whose integrity was never verified',
              'A09:2021 Security Logging and Monitoring Failures — the breach nobody noticed, because nothing was recorded or watched',
              'A10:2021 Server-Side Request Forgery (SSRF) — making the server itself fetch a URL an attacker chose',
            ],
          },
          {
            type: 'note',
            items: [
              'The headline change is A01:2021 Broken Access Control, now the largest category in the list. It absorbed three separate 2013 entries — A4, A7 and A8 — because all three were the same failure wearing different names: the application did not check whether this user was allowed to do this thing.',
              'CSRF is the encouraging story in this table. It stopped needing its own entry once the major web frameworks began shipping token protection switched on by default. A Top 10 entry can be retired by better defaults, which is a stronger fix than any amount of testing.',
              'A09:2021 has no 2013 ancestor at all, and it is worth pausing on: it is the only entry about not knowing. Everything else on the list is a hole in the application; this one is a hole in what the organisation can see, and it is why the audit and logging material in Topic 10 is a security control rather than paperwork.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Tools to Try This Yourself',
            items: [
              'Your browser’s developer tools — the Network panel shows every request and its parameters, and the Storage panel shows the cookies a session actually carries',
              'OWASP ZAP — a free proxy and scanner from OWASP itself, which sits between browser and site so you can read and modify requests',
              'Burp Suite Community Edition — the same idea, and the tool most of the industry uses; the free edition is enough for everything in this topic',
              'PortSwigger Web Security Academy — free labs for every risk on the list, with a deliberately vulnerable target you are allowed to attack',
            ],
          },
          {
            type: 'note',
            items: [
              'The 2017 talk this topic follows recommended a set of Firefox add-ons that no longer exist — Firefox replaced its extension system that year, and browser developer tools have since absorbed most of what they did. The four above are the current equivalents.',
              'Practise only on a target you own or have been explicitly permitted to test. Under the Cybercrimes Act 2015, unauthorised access to a computer system is an offence in Nigeria whether or not anything was damaged, and “I was only learning” is not a defence. The Academy labs exist precisely so you do not need one.',
            ],
          },
          {
            type: 'bullets',
            heading: 'What the Top 10 Is Actually For',
            items: [
              'The Top 10 is a place to start. It does not define all the possible threats.',
              'Its role is to educate — to introduce a number of critical threats, in language a whole team can share.',
              'Testing for weaknesses does not provide as much assurance as having a secure development lifecycle.',
              'Build security in; do not bolt it on.',
            ],
          },
          {
            type: 'note',
            text: 'The last two points are Topic 11’s argument arriving from the other direction. Assessment is worth doing — it is how an unknown risk becomes a scheduled, verifiable defect — but a list of ten risks is a checklist for finding problems, not a method for not creating them. A team that only tests against the Top 10 will keep finding Top 10 problems.',
          },
          {
            type: 'note',
            heading: 'Source & Attribution',
            items: [
              'This topic follows “Introduction to web security”, a talk given by Ian Ross at the ANZTB conference in March 2017. The demonstrations, the defaced-site screenshot and the framing are his.',
              'The risk-path diagrams and the risk-rating tables are OWASP’s own, from the OWASP Top 10 2013, used here under the Creative Commons Attribution-ShareAlike 3.0 licence (CC BY-SA 3.0).',
              'The 2013-to-2021 mapping, and the tooling list, are this course’s additions — the talk predates the 2021 edition, and its tools have not survived.',
            ],
          },
        ],
      },
      {
        number: '13',
        title: 'Exam Focus — The Lecturer’s Guaranteed Questions',
        covers: [],  // revision aid over the topics above, not an outline item
        sections: [
          {
            type: 'text',
            heading: 'How to Use This Topic',
            text: 'These are the questions the lecturer flagged in class as certain to appear, with the answers in the wording he gave. Each one is set out in full in the topic named beside it — this page is a revision checklist, not a substitute for the notes.',
          },
          {
            type: 'bullets',
            heading: 'The Golden Rules He Gave',
            items: [
              'Hit the marking points. Pages of prose that never name the technical terms score nothing — the marks sit on the terms themselves.',
              'Do not mix the answers up. Keep the best-practices answer separate from the web/mobile risk answers; they are different questions with different mark schemes.',
              'Get the class rep’s photos of the board notes, especially the short notes on SQL injection and cross-site scripting.',
            ],
          },
          {
            type: 'termlist',
            heading: 'Model Answers at a Glance',
            items: [
              { term: 'Write short notes on quality assurance / list the evaluation metrics', def: 'QA ensures software products meet the desired standard. The metrics are Functionality, Performance, Reliability, Usability, Compatibility and Security. (Topic 10)' },
              { term: 'Define web-based risk', def: 'Any threat, vulnerability, or exposure associated with using the internet that can result in data breaches, financial losses, and service disruption. (Topic 7)' },
              { term: 'Differentiate web application risk from mobile application risk', def: 'Web: centralized risk, client–server attacks landing on the server, a breach affecting the entire database, and an internet connection required. Mobile: decentralized risk, attacks on the individual device, data leakage usually following physical loss of the device, and the ability to work offline. (Topic 7)' },
              { term: 'Explain the security/tracking models — authentication vs authorization', def: 'Authentication is the process of verifying the identity of a user, device, or service before granting access to protected digital resources. Authorization is the process of giving a verified user permission to access a physical location or digital information — a bank teller has a transaction limit, while the branch manager holds higher clearance. (Topic 3)' },
              { term: 'Distinguish symmetrical from asymmetrical encryption', def: 'Encryption converts information into ciphertext, which is unreadable to unauthorized users. Symmetrical encryption uses a single key to both lock and unlock; asymmetrical encryption uses two keys — a public key and a private key. (Topic 3)' },
              { term: 'Define a website attack and give five examples', def: 'Any malicious action aimed at compromising a site’s availability, integrity, or confidentiality by exploiting web code or server–user interactions. Five examples: SQL injection (SQLi), cross-site scripting (XSS), malware/backdoor attacks, brute-force login attacks, and phishing. (Topic 8)' },
            ],
          },
          {
            type: 'note',
            text: 'Use the “Study as cards” button above to drill these six — the question is the front of the card, the model answer is the back.',
          },
          {
            type: 'note',
            items: [
              'A structure that protects your marks: one sentence of definition using the question’s own keywords, then the list, then one line per item only if the question asks you to explain. Writing the list before the explanation means a shortage of time costs you the elaboration, not the marks.',
              'Where a question says “differentiate” or “distinguish”, answer in contrasting pairs rather than describing one side and then the other — it makes each contrast visible to whoever is marking.',
              'These six are the flagged questions, not the whole syllabus. Topics 1–12 all remain examinable — note that none of the six touch the mobile material in Topics 4–6, which covers outline item 3 and can still be asked.',
            ],
          },
        ],
      },
    ];
