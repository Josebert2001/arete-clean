// UUY-CYB 123 — Web Authoring and Development
// Lecture notes transcribed from the departmental Laboratory Manual
// ("Introduction to Web Programming: A Laboratory Manual", by Victor E. Ekong,
// Uyinomen O. Ekong, Patience U. Usip, Ifiok J. Udo and Kingsley U. Joseph,
// Department of Computer Science, Faculty of Computing, University of Uyo).
//
// The manual is printed under the code CSC 121 "Introduction to Web
// Programming" — the same syllabus the department lists for students as
// UUY-CYB 123. Its 5 modules x 4 units map one-to-one onto the 20 topics below,
// numbered `module.unit` so a student can cross-reference the printed manual.
//
// `covers` / `partial` refer to 1-based indices in the course's `topics` array
// in courses.js — CourseDetail uses them to show which syllabus items the notes
// actually reach. Syllabus item 7 (XSS/CSRF) is deliberately unmapped: the
// manual does not cover web security at all.
//
// Figures live in public/lecture-notes/cyb-123/ (converted from the manual's
// embedded PNGs by scripts/optimize-lecture-images.mjs). Figures 1–17 of the
// manual are step-by-step Windows/Android screenshots of joining a Wi-Fi,
// Ethernet or dial-up connection; they are omitted here because they are tied
// to specific OS versions and the written steps carry the content. Figure
// numbers below are the manual's own.
//
// Where the manual's text was garbled, the prose has been repaired to its
// evident intent. Material genuinely added beyond the manual — including
// corrections where the manual is out of date or self-contradictory — is marked
// with a `note` section ("Added for clarity").

const IMG = '/lecture-notes/cyb-123';

export const cyb123LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  MODULE 1 — WEB PROGRAMMING BASICS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1.1',
    title: 'Web Programming, the Internet and the World Wide Web',
    covers: [1],
    sections: [
      {
        type: 'text',
        text: 'This module introduces the theoretical concepts behind the Internet and the Web. It explains the importance and the need for web programming, and elaborates on the Internet and World Wide Web programming models.',
      },
      {
        type: 'definition',
        heading: 'What is Web Programming?',
        text: 'Web programming is the process of writing code that will eventually create a website. Text and multimedia content can be manipulated by a web designer to produce an elegant page that is seen in a web browser. Web programming is therefore the creation of web pages that run over the Internet.',
      },
      {
        type: 'termlist',
        heading: 'Importance of Web Programming',
        items: [
          { term: 'Global reach', def: 'The Internet and the web allow businesses to reach a worldwide audience with their products and services.' },
          { term: 'Cost-effectiveness', def: 'Web development lets businesses reduce costs by automating processes, improving efficiency, and reducing the need for physical infrastructure.' },
          { term: 'Improved communication', def: 'Websites facilitate communication and collaboration across organisations and geographies, enabling better knowledge sharing and decision-making.' },
          { term: 'Enhanced customer experience', def: 'Web applications allow businesses to provide a more personalised, interactive and engaging customer experience.' },
          { term: 'Access to data', def: 'Web applications provide vast amounts of data that can be used for analysis, insights and informed decision-making.' },
          { term: 'Mobile access', def: 'Web applications enable businesses to reach customers through mobile devices, which have become increasingly important in our lives.' },
          { term: 'Innovation', def: 'Web applications drive innovation by providing a platform for new products, services and business models.' },
          { term: 'Social impact', def: 'Web technology can improve social and economic outcomes by providing access to education, healthcare and other essential services.' },
        ],
      },
      {
        type: 'text',
        text: 'In conclusion, web programming is a critical enabler of the digital economy, driving growth, innovation and social progress.',
      },
      {
        type: 'termlist',
        heading: 'Why Must I Learn Web Programming?',
        items: [
          { term: 'In-demand skills', def: 'Web development skills are in high demand, with many companies seeking professionals who can design, develop and maintain web-based applications.' },
          { term: 'Career opportunities', def: 'Learning web programming opens up careers in web development, web design, e-commerce and digital marketing.' },
          { term: 'Flexibility', def: 'Web programming can be used to build various applications and services, providing flexibility in the type of work that can be undertaken.' },
          { term: 'Entrepreneurship', def: 'Web programming provides a platform for entrepreneurship, enabling individuals to create and launch their own web-based businesses.' },
          { term: 'Creativity', def: 'Web programming allows creative expression through web design and development, providing opportunities to create visually appealing and engaging user interfaces.' },
          { term: 'Continuous learning', def: 'Web programming constantly evolves, providing continuous learning and skill development opportunities.' },
          { term: 'Remote work', def: 'Web programming skills are highly transferable and can be applied remotely, providing remote work and freelancing opportunities.' },
          { term: 'Competitive advantage', def: 'Knowledge of web programming provides a competitive advantage in the job market and in business, enabling individuals and companies to stay ahead of the curve.' },
        ],
      },
      {
        type: 'definition',
        heading: 'What is the Internet?',
        text: 'The Internet is a global communication system consisting of hardware and software infrastructure that provides connectivity between remote computers.',
      },
      {
        type: 'definition',
        heading: 'What is the Web?',
        text: 'The Web is a collection of interconnected documents and other resources, linked by hyperlinks and uniform resource locators (URLs). The World Wide Web is a hypermedia system — hypermedia being the addition of multimedia to hypertext. A combination of text, graphics, video or sound can be interlinked in hypermedia documents to offer a rich, often interactive, environment on the Web.',
      },
      {
        type: 'text',
        heading: 'The World Wide Web',
        text: 'The World Wide Web (WWW) is a hypermedia system. Invented by Tim Berners-Lee in 1994, it is a global collection of interconnected documents on the Internet. The WWW is the part of the Internet that uses the hypertext transport protocol (HTTP) to display hypertext and images in a graphical environment. It is a hypertext-based information retrieval tool: one can surf the web by jumping from one document to another using the links in those documents. These documents can be in many formats — text, graphics, animation, sound and video — or a combination of all of them. All the information on the Internet is presented to the user as a document, or web page. Web pages are linked to each other, or even to a section within a web page, and these links are known as hyperlinks. The tools used to view web pages are called Internet browsers: software developed to extract information on user request from the Internet and present it as web pages to the viewer.',
      },
      {
        type: 'note',
        text: 'The manual dates the invention of the Web to 1994. Tim Berners-Lee actually wrote the proposal in 1989 and built the first browser and server in 1990; the Web was released publicly in 1991. 1994 is the year he founded the World Wide Web Consortium (W3C), which is probably the source of the mix-up. Learn the manual\u2019s framing for the departmental exam, but know the real dates.',
      },
      {
        type: 'text',
        heading: 'Internet Address',
        text: 'Just as every house, office or location has an address, every web page on the Internet has a unique address, used to fetch the page for the user. Just as the address of a house is its postal address, the address on the Internet is known as a uniform resource locator (URL). A protocol is a set of rules that tells the computer how to interpret the information at that address.',
      },
      {
        type: 'code',
        heading: 'A Typical Secure URL',
        language: 'output',
        code: 'https://www.uniuyo.edu.ng/fc/se/victoreekong.htm\n\n  https:                     protocol, followed by a colon\n  //www.uniuyo.edu.ng        server, preceded by two slashes\n  /fc/se/victoreekong.htm    path, each segment preceded by one slash',
      },
      {
        type: 'termlist',
        heading: 'The Three Components of a URL',
        items: [
          { term: 'Protocol', def: 'Defines the manner for interpreting computer information. Many web pages use HTTP. Other protocols used on the Internet include File Transfer Protocol (FTP) for file transfer, and Simple Mail Transfer Protocol (SMTP) and Post Office Protocol 3 (POP3) for electronic mail.' },
          { term: 'Server', def: 'Identifies the computer system that stores the information you seek, and is always preceded by two slashes. A server is a computer that holds information and sends it to the client when a request is made. Each server on the Internet has a unique address name whose text refers to the organisation maintaining it — in this example, the University of Uyo.' },
          { term: 'Path', def: 'Defines the location within the server where the requested item will be found — here, faculty of computing / software engineering. Most web pages have .htm or .html as their extension.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'How to Connect to the Internet',
        items: [
          { term: 'Wireless broadband (Wi-Fi)', def: 'Go to your network settings, turn on Wi-Fi, and select your network name.' },
          { term: 'Ethernet cable', def: 'Use an Ethernet cable to connect your computer to your router or modem.' },
          { term: 'Dial-up', def: 'Plug your modem into the phone jack, then connect the modem to your computer.' },
        ],
      },
      {
        type: 'text',
        heading: 'Steps for Connection to the Internet',
        text: 'First, ensure that the source of the Internet is on. Understand that mobile devices can only connect to wireless broadband: smartphones, tablets, iPods and other hand-held devices cannot access the Internet through dial-up or Ethernet, which are limited to non-portable devices and computers. Then find the path to your network settings — this differs by operating system.',
      },
      {
        type: 'bullets',
        heading: 'Where the Network Settings Live',
        items: [
          'Windows 7: Start → Control Panel → Network and Internet',
          'Windows 8: Start → search "View Network Connections" → View Network Connections',
          'Windows 10/11: search "View Network Connections" → View Network Connections',
          'Mac OS X: System Preferences → Network',
          'Linux, Ubuntu or Fedora: Network Manager',
          'iOS (iPhone, iPad): Settings → Wi-Fi',
          'Android: Settings → Wi-Fi (or Network & Internet)',
          'Windows Phone: Settings → Wi-Fi',
        ],
      },
      {
        type: 'bullets',
        heading: 'Steps for Connecting using Wireless Broadband (Wi-Fi)',
        items: [
          'Find your device\u2019s network setting. The Wi-Fi option is in the settings menu on mobile devices and on the taskbar on computers — Windows and macOS both put a Wi-Fi icon there; on Android go to Settings → Network & Internet → Internet.',
          'Make sure Wi-Fi on your device is turned on.',
          'Go to the list of nearby Wi-Fi networks.',
          'Find the name of your network. A broadband router has its default name printed on it; a hotspot usually shows up as the name of the cellular device (e.g. "Victor\u2019s Galaxy A14").',
          'Enter the password to the network or hotspot. Some networks are public, but most are not. The default password is usually listed on the router. Protected public networks may issue a different password per person — a university may, for example, let students log on with their student ID number rather than a single shared password.',
          'Wait for the network to connect. It usually takes a few seconds; if the computer cannot reach the router it will time the attempt out. Move closer to the source, or disconnect and reconnect. The attempt also fails if the password was entered incorrectly.',
          'Test your Internet connection by opening a page in your browser. Load a reliable site such as https://www.google.com/ so you are not misled by a site that is itself down.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Steps for Connecting using an Ethernet Connection',
        items: [
          'Get an Ethernet cable and any needed adapter. Cat5, Cat5e or Cat6 cables are used depending on the speed of the network.',
          'Connect one end of the Ethernet cable to a broadband source — a modem or a router.',
          'Connect the other end of the cable to the Ethernet jack (port) on your laptop or computer.',
          'Access the computer\u2019s settings and ensure it is set to recognise the Ethernet rather than wireless. You may have to turn off the wireless connection so the computer uses the Ethernet connection instead. Test by opening a web browser.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Steps for Connecting using a Dial-up Connection',
        items: [
          'Understand that dial-up Internet is no longer widely supported, and many activities will be very difficult over it. You may be limited to browsing sites that are mostly text and images, without many add-ons or features.',
          'Ensure that you can connect to dial-up. It requires a phone line and can only serve one person per phone at a time — if the phone is being used for a call, the connection breaks until the call ends. Current computers lack the components to connect to dial-up, so you may need an external USB modem, a land line phone, and a computer with a modem jack.',
          'Plug in the modem to the phone jack, with the phone cable plugged into both the wall jack and the modem.',
          'Connect the modem to the computer: one end of the phone cable into the modem, the other into the computer\u2019s modem jack, marked by a small phone symbol.',
          'Access the computer\u2019s network settings to configure the dial-up connection — Windows 7/8: Network and Internet → Network and Sharing Center → Set up a new connection or network → Connect to the Internet → Dial-up; Windows 10/11: Network → Dial-up Connection; Mac OS X: Network → Internal/External Modem → Configuration; Linux, Ubuntu or Fedora: Network Manager → Connections → Modem Connections → Properties.',
          'Connect to the modem by providing the phone number, username and password, then open a webpage to confirm it works. Dial-up is slower than broadband, so pages take time to load.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 1',
        tasks: [
          'In your own words, define web programming.',
          'List 5 benefits of studying web programming.',
          'What is the difference between the WWW and the Internet?',
          'Write the full meanings of: Wi-Fi, FTP, HTTP, POP, SMTP, URL.',
          'What is a website? What is a web page?',
          'What is a web browser? Name five.',
          'What connectivity devices must you use to access the Internet through a public switched telephone network (PSTN)?',
          'State the steps for connecting to the Internet using your Android phone, a laptop, and a personal computer.',
          'Connect to the Internet and search for "IP to Location, IP Tracing, Broadband Speedtest". Record your IP address, your IP location, and the speed of your connection.',
        ],
      },
    ],
  },

  {
    number: '1.2',
    title: 'Internet Services and Communication Protocols',
    covers: [1],
    sections: [
      {
        type: 'definition',
        heading: 'Internet Protocols',
        text: 'The Internet is a large interconnection of computers across the globe, linked together through telecommunication networks. Communication on the Internet is guided by protocols. A network protocol is a standard way of regulating data transfer between computers: just as diplomats adhere to protocols — rules of behaviour — when in a foreign land, computers must obey agreed rules if they are to communicate with each other.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-18-network-protocol.webp`,
        width: 1400, height: 266,
        caption: 'Figure 18: Two computers communicating over an agreed network protocol',
      },
      {
        type: 'text',
        heading: 'The Internet Model',
        text: 'This is an ARPANET model, different from the Open Systems Interconnection (OSI) model. The OSI model is a seven-layer architecture for computer network communication, composed of the physical, data link, network, transport, session, presentation and application layers. The Internet model is composed of just four: the network access layer, the internetwork layer, the host-to-host layer and the application layer.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-19-internet-vs-osi-model.webp`,
        width: 1400, height: 1742,
        // Tall side-by-side portrait diagram — capped so it does not stretch to
        // several screens of height.
        maxWidth: 560,
        caption: 'Figure 19: The 4-layer Internet model beside the 7-layer OSI model',
      },
      {
        type: 'termlist',
        heading: 'The Four Layers of the Internet Model',
        items: [
          { term: 'Application layer', def: 'Combines the functionality of the topmost three OSI layers (session, presentation and application). Protocols at this layer include Telnet, e-mail, directory services (NFS) and network management services.' },
          { term: 'Host-to-host layer', def: 'Equivalent to the transport layer of the OSI model. The protocols here are the Transmission Control Protocol (TCP) and the User Datagram Protocol (UDP). TCP offers reliable services and full-duplex functions; UDP provides unreliable services that improve throughput when error correction is not required.' },
          { term: 'Internetwork layer', def: 'Corresponds to the network layer of the OSI model. It is responsible for routing packets within the Internet; gateways and routers operate here. The protocol at work in this layer is TCP/IP.' },
          { term: 'Network access layer', def: 'Combines the functions of the OSI physical and data link layers. It is responsible for the exchange of data between a host and the network, and for receiving data between two devices on the same network. Devices are identified on the network by their Internet Protocol (IP) addresses.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/fig-20-encapsulation.webp`,
        width: 578, height: 400,
        caption: 'Figure 20: Two hosts identified by IP address, with encapsulation on the way down the stack and decapsulation on the way up',
      },
      {
        type: 'bullets',
        heading: 'Communication Between Two Systems Over a Network',
        items: [
          'The message that needs to be sent is written in an application on Computer A and starts from the top of the protocol stack, moving downward.',
          'If the message is large, the stack layer breaks it into smaller chunks so that data management remains stable. These chunks are known as packets.',
          'The data moves from the application layer towards the TCP/IP layer, and each packet is assigned a port number.',
          'After processing at the TCP level, the packets move to the IP layer, which supplies the destination address. At this point each packet carries both a port number and an IP address.',
          'The hardware layer converts the alphanumeric message into a digital signal and sends it along the telecommunication path.',
          'The Internet service provider (ISP) is also attached to the Internet; the ISP router examines the recipient\u2019s address, and the next stop of the packet is another router.',
          'Eventually the packets reach the destination computer. This time they start from the bottom of the stack.',
          'As the packets move upwards, the data is unwrapped and the segments that helped it reach the destination — the IP address and port number — are removed. Wrapping and unwrapping the data is known as encapsulation and decapsulation respectively.',
          'On reaching the top of the stack at Computer B, all the packets are reassembled to form the original message sent by Computer A.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Application Layer Protocols',
        items: [
          { term: 'HTTP', def: 'A connectionless, text-based protocol through which clients (web browsers) send requests to web servers for web pages and images to be displayed. After the request is served, the connection between client and server is disconnected.' },
          { term: 'Telnet', def: 'Enables users to execute sessions with remote hosts, allowing login to another host at a remote location.' },
          { term: 'FTP', def: 'Enables the transfer of files between two hosts that are remote to each other. It performs the basic file transfer between hosts.' },
          { term: 'SMTP', def: 'Simple Mail Transfer Protocol — used for exchanging e-mail, or basic message delivery.' },
          { term: 'SNMP', def: 'Simple Network Management Protocol — used to manage the network by collecting information from connected devices for management purposes.' },
        ],
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 2',
        tasks: [
          'What is the Open Systems Interconnection (OSI) model, and how is it related to the Internet model?',
          'What are the protocols at each of the following layers: application, presentation, session, transport, network, data link, physical?',
          'What is Telnet?',
          'Which protocol is used for receiving e-mail?',
        ],
      },
    ],
  },

  {
    number: '1.3',
    title: 'Web Architecture and the Network Model',
    covers: [2],
    sections: [
      {
        type: 'definition',
        heading: 'Web Architecture',
        text: 'The World Wide Web operates on the HyperText Transfer Protocol (HTTP). This is a client-server architecture: the server resides at one end and serves web pages to a client at the other end. A browser on the client interprets the HyperText Markup Language (HTML) passed by the server.',
      },
      {
        type: 'text',
        text: 'Web pages or files are classified as static or dynamic. Static pages are fully interpreted at the client end, while dynamic pages are executed at the server end and the results passed to the client — typically running queries against a database server. A database server is a storage medium for data such as numbers and images, often held in relational database structures. The web server acts as a container for the web documents, with extensions like .html, .asp, .php and many more.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-21-web-architecture.webp`,
        width: 1400, height: 1569,
        maxWidth: 620,
        caption: 'Figure 21: Clients (laptops, PCs, workstations) making HTTP requests and receiving HTTP responses from servers',
      },
      {
        type: 'text',
        heading: 'The Web-Internet Model',
        text: 'The Web-Internet model makes it possible for a client to reach services on a large number of origin servers, each addressed by a unique URL. The content stored on the servers takes various formats, but HTML is predominant. HTML gives the content developer a means to describe the appearance of a service in a flat document structure. Where more advanced features such as procedural logic are needed, scripting languages such as JavaScript or VBScript may be used. On the Internet, standard communication protocols such as HTTP and TCP/IP are used.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-22-web-internet-model.webp`,
        width: 1400, height: 522,
        caption: 'Figure 22: A web client requesting a resource stored on a web server',
      },
      {
        type: 'text',
        text: 'The content available at the web server may be static or dynamic. Static content is produced once and not changed or updated very often — a company presentation, for example. Dynamic content is needed when the information provided by the service changes more often: timetables, news, stock quotes, account information. Technologies such as Active Server Pages (ASP), the Common Gateway Interface (CGI) and Servlets allow content to be generated dynamically.',
      },
      {
        type: 'text',
        heading: 'WAP Architecture',
        text: 'Internet access or binary data transfer over mobile devices requires a digital communication link, obtainable today with technologies such as the General Packet Radio Service (GPRS) and the Universal Mobile Telecommunication Service (UMTS). Where this link is in place, a Wireless Application Protocol (WAP) gateway is required to interface with the existing Internet. The WAP gateway is also connected to the transceiver station that provides the wireless connection to the mobile clients. Where a desktop browser interprets the HTML passed to the client in the web architecture, micro-browsers on mobile phones interpret the Wireless Markup Language (WML) passed to them in the WAP architecture.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-23-wap-architecture.webp`,
        width: 1400, height: 204,
        caption: 'Figure 23: Data transferred to mobile devices from servers via a WAP gateway',
      },
      {
        type: 'text',
        heading: 'The WAP Model',
        text: 'Without the WAP gateway/proxy, the WAP and Web models would be practically identical. The WAP gateway/proxy is the entity that connects the wireless domain with the Internet. The request sent from the wireless client to the gateway uses the Wireless Session Protocol (WSP), a binary version of HTTP. A markup language — WML — is used to develop optimised WAP applications. To save valuable bandwidth in the wireless network, WML is encoded into a compact binary format; encoding WML is one of the tasks performed by the WAP gateway/proxy.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-24-wap-model.webp`,
        width: 1400, height: 497,
        caption: 'Figure 24: The WAP programming model — WSP request, binary WML response, and the gateway\u2019s encoders and decoders',
      },
      {
        type: 'bullets',
        heading: 'How the WAP Model Works',
        items: [
          'The user selects an option on their mobile device that has a URL with WML content assigned to it.',
          'The phone sends the URL request via the phone network to a WAP gateway using the binary-encoded WAP protocol.',
          'The gateway translates this WAP request into a conventional HTTP request for the specified URL and sends it on to the Internet.',
          'The appropriate web server picks up the HTTP request.',
          'The server processes the request just as it would any other. If the URL refers to a static WML file, the server delivers it; if a CGI script is requested, it is processed and the content returned as usual.',
          'The web server adds the HTTP header to the WML content and returns it to the gateway.',
          'The WAP gateway compiles the WML into binary form.',
          'The gateway sends the WML response back to the phone.',
          'The phone receives the WML via the WAP protocol.',
          'The micro-browser processes the WML and displays the content on the screen.',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/fig-25-wap-programming-model.webp`,
        width: 1400, height: 710,
        caption: 'Figure 25: Client, gateway and content server — the gateway encodes and decodes content between them',
      },
      {
        type: 'note',
        text: 'WAP and WML were the mobile web of the late 1990s and early 2000s, and are effectively obsolete: modern phones run the same HTTP and HTML stack as desktops, and responsive CSS replaced the separate mobile markup language. The material is still examinable in this course, and the gateway/proxy idea is worth understanding on its own — it is the same pattern as a modern reverse proxy or CDN edge.',
      },
      {
        type: 'definition',
        heading: 'Web Application Architecture',
        text: 'A web application architecture is a 3-tier (or multi-user client-server) application that runs over the Internet. It comprises five basic components: the web browser, the web server, the database server, client-side programs and server-side programs.',
      },
      {
        type: 'termlist',
        heading: 'The Five Components',
        items: [
          { term: '1. Web browser (client)', def: 'Software residing on the client system that lets a user display and interact with text, images and other information located on a web page or a local area network. Browsers communicate with web servers using HTTP, which allows them to submit information as well as fetch pages. Their primary language is HTML; most also support scripting languages like JavaScript and markup languages like XML. Examples: Internet Explorer, Mozilla Firefox, Chrome, Safari, Opera.' },
          { term: '2. Web server (middleware)', def: 'Communicates with the browser using HTTP. All web transactions take place on the servers: while the database server stores the required information, the web server takes requests from clients, responds to them, and serves the appropriate web pages back. Examples: Apache HTTP Server, Apache Tomcat, Microsoft Internet Information Services (IIS), nginx, Google Web Server (GWS).' },
          { term: '3. Database server', def: 'Programs that provide database services to other systems — the database management systems (DBMS) that store, retrieve and manipulate data in a database or other repository. Examples: Oracle, Sybase, IBM DB2, MySQL, MS SQL Server, PostgreSQL, SQLite, MS Access, Apache Derby, MariaDB.' },
          { term: '4. Client-side programs', def: 'Programs written in HTML forms, JavaScript, VBScript, Flash and so on. In this course you will write client-side programs with HTML, XML and JavaScript.' },
          { term: '5. Server-side programs', def: 'Programs that work with web servers to interpret requests from clients, process them, interact with other programs needed to accomplish a task, and indicate to the web server which page to serve the client. Written in Java Servlets/JSP, ASP, PHP, Perl, Python, CGI and similar.' },
        ],
      },
      {
        type: 'text',
        heading: 'Internet Information Services (IIS)',
        text: 'Microsoft Internet Information Services is a major component of the Microsoft Server operating system, particularly of its Active Server Pages (ASP). IIS is recommended where both the middleware (ASP) and the database server (SQL Server) are Microsoft products.',
      },
      {
        type: 'text',
        heading: 'Apache HTTP Server',
        text: 'Apache is open-source free software that runs on Unix, Linux, MS Windows, Mac OS X and other platforms. It serves both static and dynamic content on the web in a reliable and secure manner, and offers server-side programming language support for authentication schemes. Examples of those languages include PHP, ASP, ColdFusion, JSP and Perl.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 3',
        tasks: [
          'What is a web browser?',
          'Write the full meanings of: ASP, GPRS, CGI, SMTP, UMTS, WAP, WSP, GWS, IIS, ISP, TCP/IP, NIC, WML, XML.',
          'List five client-side software packages.',
          'List five server-side software packages.',
          'What is a gateway in reference to a network?',
          'What is an application server?',
          'Draw a block diagram of the computer network connection in the software laboratory.',
        ],
      },
    ],
  },

  {
    number: '1.4',
    title: 'The Web Development Life Cycle',
    covers: [2],
    sections: [
      {
        type: 'definition',
        heading: 'What the Life Cycle Is',
        text: 'A web application goes through a development life cycle, which provides a strategically designed methodology for achieving an elegant result. Just like the software development life cycle, it involves all the stages that go into building a website — from formulating the idea, through coding, design and deployment, to maintenance. It is a standard, methodical set of steps to follow in achieving a well-functioning website.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-26-web-development-lifecycle.webp`,
        width: 1400, height: 638,
        caption: 'Figure 24: The web development life cycle',
      },
      {
        type: 'text',
        heading: '1. Research and Analysis',
        text: 'This phase involves gathering information about the project and the client in order to have a clear idea of the purpose, requirements and expectations for the web development task. You visualise what type of people the website will cater to, taking into consideration their age, gender, preferences and needs, then set goals and generate requirement elicitation documents.',
      },
      {
        type: 'text',
        heading: '2. Planning and Strategy',
        text: 'The website development plan involves strategising all aspects of the website — design, technology, content and marketing. Based on the information gathered and analysed in the first phase, informed decisions are made about the structure and features. A dedicated team is formed, each member having a defined role and delegated with clear tasks. Deciding on the content structure, the wireframe (schematics and rough designs), the technology stack and the software development methodology are important decisions to take before creation begins. A technology stack is the set of programming languages, web frameworks and software used to build a web application. Creating a sitemap, estimating timelines, defining deliverables and allocating resources are also essential parts of this phase.',
      },
      {
        type: 'text',
        heading: '3. Designing',
        text: 'The design stage involves designing the website layouts, bringing in creative user interface designers to do the task. Layouts start as rough sketches, which may be graphical, to get a feel for the design of the website. The purpose is to present an information structure enabling a visual tour of the content and base features for the client. The wireframe designed in the second phase is transformed into buttons, tabs, menus, dashboards, colour schemes, typography and graphics to create a base layout.',
      },
      {
        type: 'text',
        heading: '4. Content Creation',
        text: 'Content creation involves providing relevant information about the company in an easy-to-understand, attractive manner: adding calls-to-action, creative headlines, formatting, line editing, writing, and updating texts throughout the development life cycle. This phase develops the branding and marketing of the web application. It is the only way to interact with end users and convert them into customers, so keen attention and focus are given to it.',
      },
      {
        type: 'text',
        heading: '5. Development',
        text: 'The development phase involves the actual building of the website — developing both the client side and the server side. It is the most time-consuming part of the life cycle, and three layers of development task are identified in it.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Server-side (back-end)', def: 'All the processes that take place behind the scenes: managing databases, servers and logical components.' },
          { term: 'Client-side (front-end)', def: 'Developing an appealing visual representation and design. Front-end developers work on creating a seamless user experience (UX) through responsive web pages using HTML, CSS and JavaScript. A good user interface attracts users to a website.' },
          { term: 'Full stack', def: 'Combining the front end and the back end, encapsulating the whole process of website development. Here you deal with the entire stack of tasks and technologies involved in the cycle.' },
        ],
      },
      {
        type: 'text',
        heading: '6. Testing and Quality Assurance',
        text: 'After the website is developed, a set of rigorous tests is conducted to eliminate any bugs in the system. The quality assurance (QA) team performs repeated testing — unit testing, stress testing, integration testing and load testing — meticulously checking the functionality, usability, compatibility and performance of the web application.',
      },
      {
        type: 'text',
        heading: '7. Maintenance',
        text: 'Once the QA team certifies the web application, it is ready for deployment. Using File Transfer Protocol, the application is hosted on the web servers and made available for viewing. Continuous feedback from user interaction lets the developers know where improvements are needed, and the life cycle is executed again to make the necessary modifications. Regular maintenance and updates keep the site functioning perfectly and visibly.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 4',
        tasks: [
          'What is the web development life cycle, in your own words?',
          'Name the principal steps in the analysis phase.',
          'What are the three steps required to design a user interface and production processes?',
          'Why is it important to obtain client feedback and adjust web applications as appropriate?',
          'What is server-side development?',
          'What is client-side web development?',
          'Who is a full-stack web developer?',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  MODULE 2 — HYPERTEXT MARKUP LANGUAGE (HTML)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2.1',
    title: 'HTML Tags and Attributes',
    partial: [3],
    sections: [
      {
        type: 'definition',
        heading: 'What HTML Is',
        text: 'HTML is a markup language used to structure and format web pages. It is not a compiled or interpreted programming language; rather, it uses predefined tags and attributes that tell the browser how to display content.',
      },
      {
        type: 'termlist',
        heading: 'The Two Types of Tag',
        items: [
          { term: 'Paired tags', def: 'Come in opening and closing forms. For example, the <b> tag for bold text has an opening <b> and a closing </b>.' },
          { term: 'Empty tags', def: 'Do not require a closing tag. They stand alone and provide metadata or insert elements without enclosing content.' },
        ],
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 1',
        tasks: [
          'Using any HTML tag of your choice, decide on a display for a sample web page.',
        ],
      },
    ],
  },

  {
    number: '2.2',
    title: 'Structure of an HTML Page',
    partial: [3],
    sections: [
      {
        type: 'definition',
        heading: 'Head and Body',
        text: 'An HTML document is mainly divided into two sections: the head and the body. The head contains metadata and information about the document, while the body contains the visible content displayed in the browser.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-27-html-document-structure.webp`,
        width: 1400, height: 526,
        caption: 'The structure of an HTML document',
      },
      {
        type: 'code',
        heading: 'A Minimal HTML Document',
        language: 'html',
        code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First HTML Page</title>\n</head>\n<body>\n    <h2>This is a heading</h2>\n    <p>This is a paragraph.</p>\n</body>\n</html>',
      },
      {
        type: 'code',
        heading: 'A More Complete HTML Document',
        language: 'html',
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="author" content="Department of Software Engineering" />\n    <meta name="profile" content="Web Programming" />\n    <meta name="description" content="A computer science course portal" />\n    <title>Web Programming</title>\n</head>\n<body>\n    <h1>Web Programming</h1>\n    <p>A computer science course portal</p>\n</body>\n</html>',
      },
      {
        type: 'termlist',
        heading: 'Explanation of the Key Tags',
        items: [
          { term: '<!DOCTYPE html>', def: 'Declares the document type and version of HTML being used. It tells the browser that this is an HTML5 document.' },
          { term: '<html>', def: 'The root element of the document — all other elements are nested inside it. The lang="en" attribute specifies the language of the document.' },
          { term: '<head>', def: 'Contains metadata about the document: the title, character encoding, viewport settings, author information, and links to external stylesheets or scripts. Content inside <head> is not displayed on the page.' },
          { term: '<title>', def: 'Defines the title of the web page. It appears in the browser tab and in search engine results. The <link> tag within the head can reference external resources such as CSS stylesheets.' },
          { term: '<meta>', def: 'Provides metadata about the document. Common uses include specifying character encoding (charset="UTF-8"), viewport settings for responsive design, author information, page descriptions for search engines, and keywords.' },
          { term: '<script>', def: 'Used to include or reference JavaScript. Scripts can be placed inside the <head> or at the bottom of the <body> to control page behaviour and interactivity.' },
        ],
      },
      {
        type: 'text',
        heading: 'The Body Tag',
        text: 'The <body> tag contains all the visible content of the web page. The elements below are the ones most commonly used inside it.',
      },
      {
        type: 'table',
        headers: ['Element', 'Description'],
        rows: [
          ['<h1> to <h6>', 'Heading tags, from largest to smallest'],
          ['<p>', 'Paragraph tag'],
          ['<div> and <span>', 'Container tags for grouping content'],
          ['<b>, <i>, <u>', 'Bold, italic and underline formatting'],
          ['<ul>, <ol>, <li>', 'Unordered list, ordered list, and list item'],
          ['<img>', 'Embeds an image'],
          ['<a>', 'Creates a hyperlink'],
          ['<table>, <tr>, <td>', 'Table, table row, and table data cell'],
          ['<form>, <label>, <input>', 'Form elements for user input'],
        ],
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 2',
        prompt: 'Using the basic structure explained above, design a web page for this course showing the necessary tags and elements. Attach the printout of the displayed web page from your code, and write your code in the box provided (attach paper if necessary).',
      },
    ],
  },

  {
    number: '2.3',
    title: 'HTML Lists and Tables',
    partial: [3],
    sections: [
      {
        type: 'bullets',
        heading: 'The Tag Families',
        items: [
          'List tags: <ul>, <ol>, <li>, <dl>, <dt>, <dd>',
          'Table tags: table, tr, td, th, tbody, thead, tfoot, col, colgroup, caption',
          'Form tags: form, input, textarea, select, option, optgroup, button, label, fieldset, legend',
          'Scripting tags: script, noscript',
        ],
      },
      {
        type: 'definition',
        heading: 'A Table in HTML',
        text: 'A table is a group of cells organised in a two-dimensional structure with rows and columns — a representation of data arranged in rows and columns. It is one of the organisational constructs required to organise a web page\u2019s content. A table\u2019s cells normally hold data, but tables can also be used purely for presentation, providing a row-column layout scheme. Data tables can hold numbers, text and other types of content; a table is much like a spreadsheet.',
      },
      {
        type: 'termlist',
        heading: 'The Table Tags',
        items: [
          { term: '<table>', def: 'The main container of the table, marking its beginning and end.' },
          { term: '<tr>', def: 'Represents rows.' },
          { term: '<td>', def: 'Used to create data cells.' },
          { term: '<th>', def: 'Used to add table headings.' },
          { term: '<caption>', def: 'Used to insert captions.' },
          { term: '<thead>', def: 'Adds a separate header to the table.' },
          { term: '<tbody>', def: 'Shows the main body of the table.' },
          { term: '<tfoot>', def: 'Creates a separate footer for the table.' },
        ],
      },
      {
        type: 'code',
        heading: 'The HTML Table Syntax',
        language: 'html',
        code: '<table>\n    <tr>\n        <td>Cell 1</td>\n        <td>Cell 2</td>\n        <td>Cell 3</td>\n    </tr>\n    <tr>\n        <td>Cell 4</td>\n        <td>Cell 5</td>\n        <td>Cell 6</td>\n    </tr>\n</table>',
      },
      {
        type: 'text',
        text: 'This code displays a table of six cells, in two rows of three.',
      },
      {
        type: 'text',
        heading: 'Adding a Table Heading',
        text: 'The <th> tag is used to add headings to tables. In basic designs the heading always takes the top row, so <th> is declared in the first table row, followed by the actual data. By default the text in a heading is centred and bold.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<table>\n    <tr>\n        <th>First Name</th>\n        <th>Last Name</th>\n        <th>Email Address</th>\n    </tr>\n    <tr>\n        <td>Hillary</td>\n        <td>Nyakundi</td>\n        <td>tables@mail.com</td>\n    </tr>\n    <tr>\n        <td>Larry</td>\n        <td>Mark</td>\n        <td>developer@mail.com</td>\n    </tr>\n</table>',
      },
      {
        type: 'text',
        text: 'From this example we can tell which column contains which information — made possible by the <th> tag.',
      },
      {
        type: 'text',
        heading: 'Adding a Caption to a Table',
        text: 'The main use of a caption is to describe the data represented in the table. By default the caption is centred, and it can be placed at the top or the bottom of the table. To insert one, use the <caption> tag.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<table>\n    <caption>Free Coding Resources</caption>\n    <tr>\n        <th>Sites</th>\n        <th>Youtube Channels</th>\n        <th>Mobile Apps</th>\n    </tr>\n    <tr>\n        <td>Freecode Camp</td>\n        <td>Freecode Camp</td>\n        <td>Enki</td>\n    </tr>\n    <tr>\n        <td>W3 Schools</td>\n        <td>Academind</td>\n        <td>Programming Hero</td>\n    </tr>\n    <tr>\n        <td>Khan Academy</td>\n        <td>The Coding Train</td>\n        <td>Solo learn</td>\n    </tr>\n</table>',
      },
      {
        type: 'image',
        src: `${IMG}/fig-28-table-caption-output.webp`,
        width: 1400, height: 379,
        caption: 'The captioned table as the browser renders it',
      },
      {
        type: 'text',
        heading: 'The Scope Attribute',
        text: 'The scope attribute defines whether a specific header is intended for a column, a row, or a group of either. Its purpose is to show the target data so that the user does not have to rely on assumptions. The attribute is declared on the header cell <th>, and takes the values col, row, colgroup and rowgroup. The values col and row indicate that the header cell provides information for the columns or the rows respectively.',
      },
      {
        type: 'code',
        heading: 'Scope Syntax',
        language: 'html',
        code: '<table>\n    <tr>\n        <th scope="value">\n    </tr>\n</table>',
      },
      {
        type: 'code',
        heading: 'An Example Using scope',
        language: 'html',
        code: '<table>\n    <tr>\n        <th scope="col">Semester</th>\n        <th scope="col">Grade</th>\n    </tr>\n    <tr>\n        <td>1st</td>\n        <td>Jan - April</td>\n        <td>Credit</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>May - August</td>\n        <td>Pass</td>\n    </tr>\n    <tr>\n        <td>2</td>\n        <td>September - December</td>\n        <td>Distinction</td>\n    </tr>\n</table>',
      },
      {
        type: 'note',
        text: 'The manual\u2019s scope example is reproduced above exactly as printed, but it is internally inconsistent: it declares two header cells (Semester, Grade) while every data row supplies three cells. To make it correct, add a third header — <th scope="col">Period</th> — between Semester and Grade. Screen readers rely on scope to announce which header a cell belongs to, so a mismatched count defeats the whole point of the attribute.',
      },
      {
        type: 'text',
        heading: 'Rowspan and Colspan',
        text: 'The rowspan and colspan attributes let a single cell stretch across several rows or columns. When using them, declare the values correctly to avoid overlapping cells.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<table>\n    <tr>\n        <th>NAME</th>\n        <th>SUBJECTS</th>\n        <th>MARKS</th>\n    </tr>\n    <tr>\n        <td rowspan="2">Hillary</td>\n        <td>Advanced Web</td>\n        <td>75</td>\n    </tr>\n    <tr>\n        <td>Operating System</td>\n        <td>60</td>\n    </tr>\n    <tr>\n        <td rowspan="2">Larry</td>\n        <td>Advanced Web</td>\n        <td>80</td>\n    </tr>\n    <tr>\n        <td>Operating System</td>\n        <td>75</td>\n    </tr>\n    <tr>\n        <td colspan="3">Total Average: 72.5</td>\n    </tr>\n</table>',
      },
      {
        type: 'image',
        src: `${IMG}/fig-29-rowspan-colspan-output.webp`,
        width: 1215, height: 381,
        caption: 'The rowspan/colspan table as the browser renders it — the name cells span two rows, and the total row spans all three columns',
      },
      {
        type: 'text',
        heading: 'Header, Body and Footer',
        text: 'Just as a website or any other document has three main sections — header, body and footer — so does a table. <thead> provides a separate header, <tbody> contains the main content, and <tfoot> creates a separate footer. A table can have more than one body part; in that case each body groups the rows that are related together.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<table>\n    <thead>\n        <tr>\n            <th colspan="2">October</th>\n            <th colspan="2">November</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>Sales</td>\n            <td>Profit</td>\n            <td>Sales</td>\n            <td>Profit</td>\n        </tr>\n        <tr>\n            <td>\u20A6200,000</td>\n            <td>\u20A650,000</td>\n            <td>\u20A6300,000</td>\n            <td>\u20A670,000</td>\n        </tr>\n    </tbody>\n    <tfoot>\n        <tr>\n            <th colspan="4">November was more productive</th>\n        </tr>\n    </tfoot>\n</table>',
      },
      {
        type: 'bullets',
        heading: 'When to Use a Table',
        items: [
          'When you want to compare and contrast data with shared characteristics — the differences between A and B, or the scores of team X against team Y.',
          'When you want to give an overview of numerical data, such as the marks of students or the standings in a league table.',
          'When you want readers to find specific information quickly. Going through a long list of names, for example, a table subdivides the list and makes it easy to read.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practical Exercises 3 and 4',
        tasks: [
          'Write HTML to present the records of students offering this course — name, registration number, date of birth, state of origin, and so on. Attach a printout of the displayed web page showing the table.',
          'Update your table with the additional features you have learnt since (caption, scope, rowspan/colspan, thead/tbody/tfoot). Put down your code and attach the resulting table.',
        ],
      },
    ],
  },

  {
    number: '2.4',
    title: 'HTML Forms, Graphics and Links',
    covers: [3],
    sections: [
      {
        type: 'definition',
        heading: 'Creating the HTML Form',
        text: 'Forms are used to collect user input. In an HTML document, a form is set between the <FORM> container tags. The <FORM> tag takes two attributes: METHOD, which accepts either POST or GET, and ACTION, which accepts the URL of the script that will process the data from the form.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<FORM METHOD="how_to_send" ACTION="URL of script">\n    ...form data...\n</FORM>',
      },
      {
        type: 'table',
        heading: 'Form Elements',
        headers: ['Element', 'Description'],
        rows: [
          ['<form>', 'Defines an HTML form for user input'],
          ['<input>', 'Defines an input control'],
          ['<textarea>', 'Defines a multiline input control (text area)'],
          ['<label>', 'Defines a label for an element'],
          ['<radio button>', 'Defines a clickable button'],
          ['<select>', 'Defines a drop-down list'],
          ['<option>', 'Defines an option in a drop-down list'],
        ],
      },
      {
        type: 'note',
        text: 'There is no <radio button> element in HTML — the manual\u2019s table row is a slip. A radio button is an <input> with type="radio", exactly as the manual\u2019s own code examples further down show. The real element list is <form>, <input>, <textarea>, <label>, <select>, <option>, <button>, <fieldset> and <legend>.',
      },
      {
        type: 'text',
        heading: 'The <INPUT> Tag',
        text: 'The <INPUT> tag defines an input control. Its TYPE attribute decides what kind of control it is — text, password, checkbox, radio, reset or submit.',
      },
      {
        type: 'code',
        heading: 'Text, Password and Checkbox Inputs',
        language: 'html',
        code: 'Type of Computer: <INPUT TYPE="TEXT" NAME="computer" SIZE="50" MAXLENGTH="50" VALUE="Pentium">\n\nEnter Password: <INPUT TYPE="PASSWORD" NAME="password" SIZE="25" MAXLENGTH="25">\n\nType of computer(s) you own: <BR>\n<INPUT TYPE="CHECKBOX" NAME="Pentium" CHECKED> Pentium\n<INPUT TYPE="CHECKBOX" NAME="486"> 486-Series PC\n<INPUT TYPE="CHECKBOX" NAME="Macintosh"> Macintosh',
      },
      {
        type: 'code',
        heading: 'RESET and SUBMIT',
        language: 'html',
        code: '<!-- RESET clears the form; VALUE renames the button -->\n<INPUT TYPE="RESET">\n<INPUT TYPE="RESET" VALUE="Reset the Form">\n\n<!-- SUBMIT sends the entered data; it accepts only VALUE -->\n<INPUT TYPE="SUBMIT">\n<INPUT TYPE="SUBMIT" VALUE="SEND IT IN!">',
      },
      {
        type: 'text',
        heading: 'The <TEXTAREA> Tag',
        text: 'One of the more common uses for forms is to accept multiple lines of text from a user — for feedback, bug reports and similar. For this we use the <TEXTAREA> tag within the form. You can set the tag to control the number of rows and columns it displays, although it will generally accept as many characters as the user cares to enter.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<TEXTAREA NAME="variable_name" ROWS="number" COLS="number">\ndefault text\n</TEXTAREA>\n\n<FORM>\n    <TEXTAREA NAME="comments" ROWS="4" COLS="40">\n        Enter comments about this Web site\n        Good or Bad.\n    </TEXTAREA>\n</FORM>',
      },
      {
        type: 'text',
        heading: 'Radio Buttons',
        text: 'Unlike a checkbox, a radio button is designed to accept only one response from among its options. Radio buttons use the same attributes and basic format as checkboxes, but they require the VALUE attribute, and the NAME attribute must be the same for all the <INPUT> tags intended for the same group. VALUE, by contrast, should be different for each choice.',
      },
      {
        type: 'code',
        language: 'html',
        code: 'Choose the computer type you use most often:\n<BR>\n<INPUT TYPE="RADIO" NAME="Computer" VALUE="P" CHECKED> Pentium\n<INPUT TYPE="RADIO" NAME="Computer" VALUE="4"> 486-Series PC\n<INPUT TYPE="RADIO" NAME="Computer" VALUE="M"> Macintosh\n<INPUT TYPE="RADIO" NAME="Computer" VALUE="O"> Other',
      },
      {
        type: 'text',
        heading: 'Laying a Form Out with a Table',
        text: 'A form can be laid out inside a table so that labels and fields line up. Each <tr> represents a row, and within each row there are two <td> tags — one for the label and one for the input field. The for attribute of the <label> tag associates it with the corresponding input field through that input\u2019s id attribute.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<html>\n<head>\n<body>\n<table>\n    <tr>\n        <td><label for="surname">Surname:</label></td>\n        <td><input type="text" id="surname" name="surname"></td>\n    </tr>\n    <tr>\n        <td><label for="othernames">Other Names:</label></td>\n        <td><input type="text" id="othernames" name="othernames"></td>\n    </tr>\n    <tr>\n        <td><label for="email">Email:</label></td>\n        <td><input type="email" id="email" name="email"></td>\n    </tr>\n    <tr>\n        <td><label for="phone">Phone:</label></td>\n        <td><input type="tel" id="phone" name="phone"></td>\n    </tr>\n    <tr>\n        <td><label for="address">Address:</label></td>\n        <td><input type="text" id="address" name="address"></td>\n    </tr>\n</table>\n</body>\n</html>',
      },
      {
        type: 'image',
        src: `${IMG}/fig-31-form-table-output.webp`,
        width: 1089, height: 698,
        caption: 'The form laid out inside a table, as the browser renders it',
      },
      {
        type: 'code',
        heading: 'Text, Email and Submit Inputs',
        language: 'html',
        code: '<form action="/Test.html" method="POST">\n    <label for="fname">First name:</label><br>\n    <input type="text" id="fname" name="fname" placeholder="Enter your first name"><br>\n    <label for="lname">Last name:</label><br>\n    <input type="text" id="lname" name="lname" placeholder="Enter your last name">\n    <input type="submit" value="Submit">\n</form>\n\n<form>\n    <label for="email" id="email-label">Email:</label><br>\n    <input type="email" id="email" name="email" placeholder="Enter your email"><br>\n    <input type="submit" value="Submit">\n</form>\n\n<!-- With no value attribute the button reads "Submit" by default -->\n<form>\n    <input type="submit" value="Send">\n</form>',
      },
      {
        type: 'code',
        heading: 'Password, Number and Range Inputs',
        language: 'html',
        code: '<form>\n    <label for="user-password">Password</label>\n    <input type="password" id="user-password" name="user-password">\n</form>\n\n<form>\n    <label for="years">Years of experience:</label>\n    <input id="years" name="years" type="number" step="1">\n</form>\n\n<!-- A range input renders as a slider -->\n<form>\n    <label for="volume">Volume Control</label>\n    <input id="volume" name="volume" type="range" min="0" max="100" step="1">\n</form>',
      },
      {
        type: 'code',
        heading: 'Checkbox and Radio Inputs',
        language: 'html',
        code: '<form>\n    <p>Choose your ice cream flavor:</p>\n    <input id="vanilla" name="topping" type="checkbox" value="vanilla">\n    <label for="vanilla">Vanilla</label>\n    <br>\n    <input id="chocolate" name="topping" type="checkbox" value="chocolate">\n    <label for="chocolate">Chocolate</label>\n    <br>\n    <input id="strawberry" name="topping" type="checkbox" value="strawberry">\n    <label for="strawberry">Strawberry</label>\n</form>\n\n<form>\n    <p>What is sum of 1 + 1?</p>\n    <input type="radio" id="two" name="answer" value="2">\n    <label for="two">2</label>\n    <br>\n    <input type="radio" id="eleven" name="answer" value="11">\n    <label for="eleven">11</label>\n</form>',
      },
      {
        type: 'code',
        heading: 'Drop-Down List, Datalist and Textarea',
        language: 'html',
        code: '<form>\n    <label for="lunch">What\'s for lunch?</label>\n    <select id="fruits" name="fruits">\n        <option value="mango">Mango</option>\n        <option value="apple">Apple</option>\n        <option value="banana">Banana</option>\n    </select>\n</form>\n\n<form>\n    <label for="lunch">What\'s your favorite fruit?</label>\n    <input type="text" list="fruits" id="fruit" name="fruit">\n    <datalist id="fruits">\n        <option value="mango">Mango</option>\n        <option value="apple">Apple</option>\n        <option value="banana">Banana</option>\n    </datalist>\n</form>\n\n<form>\n    <label for="comment">Comment:</label>\n    <br>\n    <textarea id="comment" name="comment" rows="5" cols="30" placeholder="Adding text"></textarea>\n</form>',
      },
      {
        type: 'text',
        heading: 'Adding Graphics to Web Pages',
        text: 'We can choose either of two file types: GIF or JPEG. GIF (CompuServe Graphics Interchange Format) is the more popular among web browsers, but JPEG (Joint Photographic Experts Group) is also popular and widely used. To add graphics, use the empty <IMG> tag inside the body section. SRC accepts the name of the file you want to display — either an absolute (full URL) or a relative path for a local file.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<IMG SRC="image URL">\n<IMG SRC="path/filename">\n\n<IMG SRC="C:\\Dept of Software Engineering\\Uniuyologo.jpg" ALT="Department of Software Engineering">\n<h1>Welcome to Department of Software Engineering Website</h1>\n<h2><IMG SRC="C:/vicpix/vicpic.jpg" ALT="Photo of the Head of Department"></h2>\n<h2 align="middle">I am the HOD of the Department of Software Engineering, Faculty of Computing</h2>',
      },
      {
        type: 'note',
        text: 'GIF and JPEG are no longer the whole story. Today: use SVG for logos, icons and diagrams (it scales without blurring), PNG where you need lossless detail or transparency, WebP or AVIF for photographs on the web (far smaller than JPEG at the same quality), and reserve GIF for nothing at all. Also note that the manual\u2019s examples point SRC at absolute local paths like C:\\...; those break the moment the page leaves the author\u2019s machine — always use a relative path such as images/logo.png. Keep writing the ALT attribute: it is what screen readers announce, and what displays if the image fails to load.',
      },
      {
        type: 'text',
        heading: 'Adding Hypertext and Creating Links',
        text: 'The <A> tag creates a hyperlink. Besides linking to documents on your local computer or elsewhere on the Internet, you can link to another part of the same document, and you can turn an image into a link by wrapping it in the <A> tag.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<!-- A basic link -->\n<A HREF="URL">Text describing link</A>\n<A HREF="http://www.uniuyo.edu.ng/fc/se">Department of Software Engineering Information</A>\n\n<!-- A link to another section of the same document -->\n<A HREF="#section_name">Link to another section of this document</A>\n<A NAME="section_name">Beginning of new section</A>\n\n<!-- A mailto link -->\n<A HREF="mailto:webmaster@uniuyo.edu.ng">Send me e-mail</A>\n\n<!-- A graphical link -->\n<A HREF="http://www.uniuyo.edu.ng/"><IMG SRC="uniuyologo.gif" ALT="University of Uyo"></A>',
      },
      {
        type: 'code',
        heading: 'A Graphical Menu Bar',
        language: 'html',
        code: '<BODY>\n    <A HREF="http://www.uniuyo.edu.ng/index.html"><IMG SRC="home_button.gif" ALT="Back to Home"></A>\n    <A HREF="http://www.uniuyo.edu.ng/Faculties.html"><IMG SRC="fac_button.gif" ALT="To Faculties"></A>\n    <A HREF="http://www.uniuyo.edu.ng/about.html"><IMG SRC="about_button.gif" ALT="To About University of Uyo"></A>\n    <A HREF="http://www.uniuyo.edu.ng/service.html"><IMG SRC="serv_button.gif" ALT="To Services"></A>\n</BODY>',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 5 — Create an Order Form',
        prompt: 'Format the given form and perform the following actions. Paste the resulting lines of code, or attach additional paper.',
        tasks: [
          'Insert the missing document tags and give the web page a title.',
          'Make good use of container tags, physical tags and empty tags to present a well-formatted web page.',
          'Change the value of the submit button to SUBMIT.',
          'Change the value of the reset button to RESET THE FORM.',
          'Assign a maximum length attribute to the various fields as you deem fit.',
          'Make the Internet/Web the default checked item.',
          'Identify the comment statement and eliminate it.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  MODULE 3 — CASCADING STYLE SHEETS (CSS)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '3.1',
    title: 'Basics of Cascading Style Sheets',
    partial: [4],
    sections: [
      {
        type: 'definition',
        heading: 'What CSS Is For',
        text: 'CSS is the tool used for the presentation of a web page. Depending on the content and purpose of your website, the browser\u2019s default rendering of the document could be perfectly adequate; otherwise the presentation is changed with Cascading Style Sheets. To change the appearance of the text elements and the page background, simple style sheet rules apply.',
      },
      {
        type: 'text',
        text: 'Recall that the structural layer of the web page is created using HTML. This is the layer where the elements that accurately describe the meaning of the content are chosen. An understanding of the document\u2019s structure, and of the relationships between elements, is central to your work as a style sheet author.',
      },
      {
        type: 'bullets',
        heading: 'How Style Sheets Work',
        items: [
          'Start with a document that has been marked up in HTML.',
          'Write style rules for how you would like certain elements to appear on the web page.',
          'Attach the style rules to the document. When the browser displays the document, it follows your rules for rendering elements — unless the user has applied some mandatory styles of their own.',
        ],
      },
      {
        type: 'definition',
        heading: 'Writing the Rules',
        text: 'A style sheet is made up of one or more style instructions, called style rules, that describe how an element or group of elements should be displayed. Each rule selects an element and declares its appearance. The two main parts of a rule are the selector, which identifies the element or elements to be affected, and the declaration, which provides the rendering instructions. The declaration is in turn made up of a property (such as color) and its value (such as green), separated by a colon and a space. One or more declarations are placed inside curly brackets.',
      },
      {
        type: 'code',
        heading: 'The General Form of a Rule',
        language: 'css',
        code: 'selector { property: value; }\n\nselector {\n    property1: value1;\n    property2: value2;\n    property3: value3;\n}',
      },
      {
        type: 'text',
        heading: 'Selectors',
        text: 'Where an element name such as h1 or p is used as the selector, this is called an element type selector — the most basic type. The properties defined in the rule apply to every h1 or p element in the document respectively. An ID selector, by contrast, selects an element based on the value of its id attribute, and is indicated with the # symbol: the selector #recipe targets the element with id="recipe".',
      },
      {
        type: 'text',
        heading: 'Declarations and Properties',
        text: 'The declaration is made up of a property/value pair, and there can be more than one declaration in a single rule. The heart of style sheets lies in the collection of standard properties that can be applied to selected elements. The complete CSS specification defines dozens of properties, for everything from text indents to how table headers should be read aloud.',
      },
      {
        type: 'code',
        heading: 'Two Example Rules',
        language: 'css',
        code: '/* Makes every h1 element in the document green */\nh1 { color: green; }\n\n/* Sets paragraphs in a large, sans-serif font. Sans-serif fonts do not\n   have a little slab (a serif) at the ends of strokes, and tend to look\n   more sleek and modern. */\np { font-size: large; font-family: sans-serif; }',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 1',
        tasks: [
          'Define two types of CSS rule, showing the selector and declaration elements of each.',
          'Write complete code snippets embedding the style rules in an HTML document. (Attach an additional sheet of paper.)',
        ],
      },
    ],
  },

  {
    number: '3.2',
    title: 'Adding Style to HTML, Inheritance and the Cascade',
    partial: [4],
    sections: [
      {
        type: 'text',
        heading: 'Steps for Adding Style',
        text: 'Open index.html, place a <style> element inside the document head, add style rules within it, then save the file and look at it in the browser.',
      },
      {
        type: 'code',
        heading: 'Step (i) — the document head',
        language: 'html',
        code: '<head>\n<meta charset="utf-8">\n<title>UNIVERSITY OF UYO</title>\n<style>\n</style>\n</head>',
      },
      {
        type: 'code',
        heading: 'Step (iii) — the style rules',
        language: 'css',
        code: 'body {\n    background-color: #faf2e4;\n    margin: 0 10%;\n    font-family: sans-serif;\n}\nh1 {\n    text-align: center;\n    font-family: serif;\n    font-weight: normal;\n    text-transform: uppercase;\n    border-bottom: 1px solid #57b1dc;\n    margin-top: 30px;\n}\nh2 {\n    color: #d1633c;\n    font-size: 1em;\n}',
      },
      {
        type: 'termlist',
        heading: 'The Three Ways to Attach Styles',
        items: [
          { term: 'External style sheet', def: 'A separate, text-only document containing a number of style rules, named with the .css suffix. It is linked to (via the link element) or imported (via an @import rule) into one or more HTML documents, so all the files in a website may share the same style sheet. This is the most powerful and preferred method.' },
          { term: 'Embedded style sheet', def: 'Placed in a document via the style element, with rules that apply only to that document. The style element must be placed in the head of the document.' },
          { term: 'Inline styles', def: 'Properties and values applied to a single element using the style attribute on the element itself. Multiple properties are separated by semicolons. Inline styles apply only to the element in which they appear and should be avoided unless it is absolutely necessary to override styles from an embedded or external style sheet — they intersperse presentation information into the structural markup, and make changes harder because every style attribute must be hunted down in the source.' },
        ],
      },
      {
        type: 'code',
        language: 'html',
        code: '<!-- Embedded -->\n<head>\n    <title>Required document title here</title>\n    <style>\n        /* style rules go here */\n    </style>\n</head>\n\n<!-- Inline -->\n<h1 style="color: red">Introduction</h1>\n<h1 style="color: red; margin-top: 2em">Introduction</h1>',
      },
      {
        type: 'definition',
        heading: 'Inheritance',
        text: 'Inheritance provides a mechanism for styling elements that do not have any explicit style rules of their own. Accurate implementation depends on understanding the document structure, which is central to the presentation of a web page.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-40-document-tree.webp`,
        width: 1400, height: 464,
        caption: 'The document tree — html, with head and body, and their descendants',
      },
      {
        type: 'text',
        heading: 'Parents and Children',
        text: 'The document tree becomes a family tree when it comes to referring to the relationship between elements. All the elements contained within a given element are said to be its descendants: the h1, h2, p, em and img elements in the document are all descendants of the body element.',
      },
      {
        type: 'text',
        heading: 'Pass It On',
        text: 'When a font-related style rule is written using the p element as a selector, the rule applies to all the paragraphs in the document, as well as to the inline text elements they contain. In general, properties related to the styling of text — font size, colour, style and the like — are passed down. Properties such as borders, margins and backgrounds, which affect the boxed area around the element, tend not to be passed down: if you put a border around a paragraph, you would not want a border around every inline element (such as em, strong or a) it contains as well.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-41-inheritance.webp`,
        width: 576, height: 315,
        caption: 'Inheritance example: p { font-size: large; font-family: sans-serif; } — the selected elements inherit both properties from p',
      },
      {
        type: 'text',
        text: 'Inheritance is advantageous when writing style sheets. If you want all text elements to be blue, you could write a separate style rule for every element in the document and set the colour to blue. A better way is to write a single rule applying the color property to the body element and let all the elements it contains inherit that style. Note that any property applied to a specific element overrides the inherited value for that property.',
      },
      {
        type: 'definition',
        heading: 'Conflicting Styles: The Cascade',
        text: 'CSS allows you to apply several style sheets to the same document, which means there are bound to be conflicts. What should the browser do if a document\u2019s imported style sheet says h1 elements should be red, while its embedded style sheet says h1s should be purple? The cascade refers to what happens when several sources of style information vie for control of the elements on a page: style information is passed down — cascades down — until it is overridden by a style rule with more weight. Weight is decided by three things: the priority of the style rule source, the specificity of the selector, and rule order.',
      },
      {
        type: 'text',
        heading: 'Priority',
        text: 'If you apply no style information to a web page, it renders according to the browser\u2019s internal style sheet — the default rendering, which the W3C calls the user agent style sheet. Individual users can apply their own styles as well (the user style sheet, also called the reader style sheet), which override the browser defaults. However, if the author of the page has attached a style sheet (the author style sheet), that overrides both the user and the user agent styles. The one exception is a style the user has marked !important, which overrides all competing styles — this permits users to keep settings that accommodate a disability, such as extra-large type for sight impairment.',
      },
      {
        type: 'image',
        src: `${IMG}/fig-42-cascade-priority.webp`,
        width: 449, height: 396,
        caption: 'The manual\u2019s cascade priority chart, from highest to lowest',
      },
      {
        type: 'note',
        text: 'The figure above swaps two of its rows relative to the manual\u2019s own prose and to the CSS specification. The correct order, highest weight first, is: (1) user !important styles, (2) author !important styles, (3) author normal styles, (4) user normal styles, (5) user agent (browser) styles. The manual\u2019s text states this correctly — "all author styles, even those not marked !important, take precedence over the reader\u2019s styles" — so trust the prose, not the chart.',
      },
      {
        type: 'text',
        heading: 'Specificity',
        text: 'Conflicts can arise in which an element gets style instructions from more than one rule — say a rule that applies to paragraphs, and another for a paragraph with the ID "intro". When two rules in a style sheet conflict, the type of selector determines the winner: the more specific the selector, the more weight it is given to override conflicting declarations. Here the selector that includes the ID name (#intro) is more specific than a general element selector (p), so that rule applies to the "intro" paragraph, overriding the rules set for all paragraphs.',
      },
      {
        type: 'text',
        heading: 'Assigning Importance',
        text: 'If you want a rule not to be overridden by a subsequent conflicting rule, include the !important indicator just after the property value and before the semicolon. Even if the browser later encounters an inline style — which should normally override a document-wide style sheet — the !important rule wins, because it cannot be overridden by other styles in the author\u2019s style sheet. The only way an !important author rule may be overridden is by a conflicting rule in a reader style sheet that has also been marked !important. This ensures that special reader requirements, such as large type or high-contrast text for the visually impaired, are never overridden. Beware, though: !important is not a get-out-of-jail-free card. Best practice dictates that it be used sparingly, if at all, and never just to get yourself out of a sticky situation with inheritance and the cascade.',
      },
      {
        type: 'code',
        language: 'css',
        code: '/* Author style — guarantees blue paragraph text */\np { color: blue !important; }\n\n/* Even this inline style loses to the rule above */\n/* <p style="color: red"> */\n\n/* A reader style sheet with a plain rule still loses ... */\np { color: black; }\n\n/* ... but a reader rule marked !important wins over everything */\np { color: black !important; }',
      },
      {
        type: 'text',
        heading: 'Rule Order',
        text: 'After all the style sheet sources have been sorted by priority, and all the linked and imported style sheets shuffled into place, there are likely to be conflicts between rules of equal weight. When that is the case, the order in which the rules appear matters. The cascade follows a "last one wins" rule: whichever rule appears last has the last word.',
      },
      {
        type: 'code',
        language: 'css',
        code: '/* Paragraph text will be green — the last rule wins */\np { color: red; }\np { color: blue; }\np { color: green; }\n\n/* The same happens within a single declaration stack */\np { color: red;\n    color: blue;\n    color: green; }',
      },
      {
        type: 'text',
        text: 'The resulting colour is green because the last declaration overrides the previous two. It is easy to accidentally override earlier declarations within a rule once you get into compound properties, so this is important behaviour to keep in mind.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 2',
        tasks: [
          'Explain what happens when style sheet rules from different sources come into play.',
          'Embed the CSS from step (iii) into the HTML from step (i) to apply the defined style to the content.',
          'Explain the steps to run the combined HTML and CSS code as a single program. (Attach an additional sheet.)',
        ],
      },
    ],
  },

  {
    number: '3.3',
    title: 'CSS Text, Font and Colours; Validating Documents',
    partial: [4],
    sections: [
      {
        type: 'text',
        heading: 'Text, Font and Colour Properties',
        text: 'From the styling code presented in Unit 2, the text, font and colour properties are named in the rules themselves. font-family sets the typeface, text-align positions the text, font-weight and text-transform change its appearance, color sets its colour, and font-size sets its size.',
      },
      {
        type: 'code',
        language: 'css',
        code: 'body {\n    font-family: sans-serif;\n}\nh1 {\n    text-align: center;\n    font-family: serif;\n    font-weight: normal;\n    text-transform: uppercase;\n    border-bottom: 1px solid #57b1dc;\n    margin-top: 30px;\n}\nh2 {\n    color: #d1633c;\n    font-size: 1em;\n}',
      },
      {
        type: 'definition',
        heading: 'Validating Documents',
        text: 'To validate a document is to check your markup to make sure it conforms with all the rules of whatever version of HTML is in use. Documents that are error-free are said to be valid. Validation is strongly recommended, especially for professional sites: valid documents are more consistent across a variety of browsers, they display more quickly, and they are more accessible.',
      },
      {
        type: 'bullets',
        heading: 'What a Validator Checks',
        items: [
          'The inclusion of a DOCTYPE declaration, which defines the version of HTML to validate the source against.',
          'An indication of the character encoding for the document.',
          'The inclusion of required rules and attributes.',
          'Non-standard elements.',
          'Mismatched tags.',
          'Nesting errors — incorrectly putting elements inside other elements.',
          'Typos and other minor errors.',
        ],
      },
      {
        type: 'text',
        text: 'Always use a validator, for example html5.validator.nu. Files are either uploaded, or a link to the online page is submitted to the validator for checking and generation of a report.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 3',
        tasks: [
          'Write a complete program to test CSS text, font and colours.',
          'Subject your code to validation and outline the procedure. (Attach an additional sheet of paper.)',
        ],
      },
    ],
  },

  {
    number: '3.4',
    title: 'CSS Borders, Margin and Padding',
    covers: [4],
    sections: [
      {
        type: 'text',
        heading: 'Spacing and Border Declarations',
        text: 'CSS borders, margins and padding are specified in the style rules attached to the HTML. A margin adds space outside the element\u2019s box, padding adds space inside it, and a border draws a line between the two.',
      },
      {
        type: 'code',
        language: 'css',
        code: '/* A 100-pixel left margin on paragraphs (and on h2 headings as well) */\np  { margin-left: 100px; }\nh2 { margin-left: 100px; }\n\n/* An orange, 1-pixel border along the bottom of the h1 element */\nh1 { border-bottom: 1px solid orange; }\n\n/* Move the image to the right margin and let text flow around it */\nimg {\n    float: right;\n    margin: 0 12px;\n}',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 4',
        tasks: [
          'Based on the HTML and styling code presented in steps (i)–(iii), put the code together as specified and run the program. Print the output screen and attach it.',
          'Adjust the font styles and colours to define headings in terms of colour, font style and font size. (Hints: colour green, font family sans-serif, font size large.)',
          'Based on the appearance of the web page, present your line-by-line comments on the code snippets in (2) above.',
          'Run the inheritance and cascade snippet below, illustrate the concept of inheritance as shown in the output, and determine whether the narrative about the output is true or false.',
        ],
      },
      {
        type: 'code',
        heading: 'The Cascade Experiment',
        language: 'html',
        code: '<!-- STYLE DOCUMENT (external.css) -->\nh1 { color: red }\n\n<!-- HTML DOCUMENT -->\n<!DOCTYPE html>\n<html>\n<head>\n<title>...</title>\n<style>\n@import url(external.css); /* set to red first */\nh1 { color: purple; }      /* overridden by purple */\n</style>\n</head>\n<body>\n<h1 style="color: blue">Heading</h1> <!-- blue comes last and wins -->\n</body>\n</html>',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  MODULE 4 — JAVASCRIPT
  // ─────────────────────────────────────────────────────────────────
  {
    number: '4.1',
    title: 'Basics of JavaScript',
    partial: [5],
    sections: [
      {
        type: 'definition',
        heading: 'What JavaScript Is',
        text: 'JavaScript is a programming language used to create dynamic, interactive content on websites. It is an interpreted language, which means the code is executed line by line without the need for a compiler. JavaScript is primarily used on the client side, meaning it runs in the user\u2019s web browser — though it can also be used on the server side with environments like Node.js.',
      },
      {
        type: 'bullets',
        heading: 'What JavaScript Is Used For',
        items: [
          'Form validation — checking that the user has entered the correct data in a form before submitting it.',
          'Dynamic HTML content — modifying the HTML elements on a page without reloading the entire page.',
          'User interaction — responding to user actions such as clicks, mouse movements and key presses.',
          'Animations — creating visual effects and animations on a web page.',
          'Asynchronous communication — fetching data from a server without reloading the page (Ajax).',
          'Web applications — building complex applications that run in the browser.',
        ],
      },
      {
        type: 'text',
        heading: 'Creating JavaScript',
        text: 'JavaScript code is embedded in an HTML document using the <script> element. The code can be placed anywhere within the document, but it is common to place it in the <head> or <body> section.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<script>\n    // JavaScript code goes here\n    alert("Hello, World!");\n</script>',
      },
      {
        type: 'text',
        heading: 'External JavaScript',
        text: 'For larger scripts, or scripts used across multiple pages, it is better to place the code in an external file with a .js extension, then link it to the HTML document using the src attribute of the <script> element. The preferred placement for the <script> tag is just before the closing </body> tag: this ensures the HTML document is fully loaded before the JavaScript executes, which can improve the loading speed of the page.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<script src="script.js"></script>',
      },
      {
        type: 'text',
        heading: 'Date and Time',
        text: 'JavaScript provides built-in objects and methods for working with dates and times. The Date object represents a specific date and time.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: 'var today = new Date();\nvar hours = today.getHours();\nvar minutes = today.getMinutes();\nvar seconds = today.getSeconds();\ndocument.write("The current time is: " + hours + ":" + minutes + ":" + seconds);',
      },
      {
        type: 'code',
        heading: 'Hello World',
        language: 'javascript',
        code: '// This is a comment\ndocument.write("Hello, World!");',
      },
      {
        type: 'text',
        text: 'The text "Hello, World!" is written directly to the HTML document.',
      },
      {
        type: 'note',
        text: 'document.write() appears throughout this module because the manual teaches the classic style, but it is obsolete and should not be used in real work: calling it after the page has finished loading wipes the entire document, and it is blocked outright in several modern contexts. Write to the page with document.getElementById("output").textContent = "..." instead, or use console.log() while debugging. Likewise prefer let and const over var, which the manual uses throughout.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 1',
        tasks: [
          'Write a JavaScript program that displays the current date and time on a web page.',
        ],
      },
    ],
  },

  {
    number: '4.2',
    title: 'Arithmetic Operators and Functions',
    partial: [5],
    sections: [
      {
        type: 'table',
        heading: 'Arithmetic Operators in JavaScript',
        headers: ['Operator', 'Name', 'Example'],
        rows: [
          ['**', 'Exponentiation', '2**3'],
          ['*', 'Multiplication', '2*3'],
          ['/', 'Division', '5/4'],
          ['%', 'Division remainder (modulus)', '5%4'],
          ['+', 'Addition', '5+3'],
          ['-', 'Subtraction', '5-2'],
          ['+', 'Concatenation', '"John" + "son"'],
        ],
      },
      {
        type: 'text',
        text: 'Other operators supported by JavaScript are logical, bitwise, shift, comparison, relational, conditional (ternary) and assignment operators. The numbers used in an arithmetic operation are called operands; the operation is defined by an operator and its operands.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: 'let a = 1;\nlet b = 2;\nlet c = a + b;\n\nlet x = 5;\nlet z = x ** 2;',
      },
      {
        type: 'definition',
        heading: 'Functions',
        text: 'The basic building block of a script in JavaScript is the function. A function is essentially a "mini-program": it is passed a particular value, it works with that value to make something else happen, and then it returns a new value to the body of the program.',
      },
      {
        type: 'text',
        text: 'There are two times you need to work with functions. First you declare the function, which means defining how it will work. Second you call the function in the body of your script. Generally, your script will be just a series of function calls.',
      },
      {
        type: 'text',
        heading: 'Declaring the Function',
        text: 'A good rule — although not a requirement — is to declare your functions in the head of the document. The declaration needs to appear between <SCRIPT> tags, but you can have more than one set of <SCRIPT> tags in an HTML document.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<SCRIPT>\n<!--\nfunction function_name(value_name)\n{\n    ...function code...\n    return (new_value)\n}\n// end hiding -->\n</SCRIPT>',
      },
      {
        type: 'note',
        text: 'The <!-- ... // end hiding --> wrapper inside <SCRIPT> is a relic of the mid-1990s, when browsers that did not understand JavaScript would print the source as page text. Every browser in use today understands <script>, so omit the comment wrapper entirely — it serves no purpose and only obscures the code.',
      },
      {
        type: 'text',
        heading: 'Calling a Function',
        text: 'We call the function from the body of the script, generally in the body of the document. It does not matter where the function is declared — although, as noted, it is best declared between the <HEAD> tags — but it is best to put the function calls close to the parts of the document where they are needed. In the call, function_name must be the same name used in the declaration, and value can be anything that is to be passed to the function.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: 'function_name(value);',
      },
      {
        type: 'code',
        heading: 'Defining and Calling Functions',
        language: 'javascript',
        code: '// Function name, then the list of arguments, then the statements\n// that form the function inside braces.\nfunction displayHello() {\n    document.write("Hello");\n}\n\n// A function to add two numbers\nfunction add() {\n    document.write(5 + 5);\n}\nadd();\n\n// Functions performing other arithmetic operations\nfunction minus() {\n    document.write("" + (6 - 4));\n}\nfunction times() {\n    document.write("" + 6 * 4);\n}\n\nadd();\nminus();\ntimes();',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 2',
        tasks: [
          'Divide 10 by 2 and alert the result.',
          'Define the order of precedence of the arithmetic operators.',
          'Let x = 5, y = 2 and z = x / y, and alert the result.',
        ],
      },
    ],
  },

  {
    number: '4.3',
    title: 'Control Statements in JavaScript',
    partial: [5],
    sections: [
      {
        type: 'definition',
        heading: 'Statements',
        text: 'The basic units of a JavaScript program are statements, and a statement performs a single action. Control statements decide which statements run, and how many times.',
      },
      {
        type: 'code',
        heading: 'Simple Statements',
        language: 'javascript',
        code: 'hours = now.getHours();\nmins = now.getMinutes();\nsecs = now.getSeconds();',
      },
      {
        type: 'code',
        heading: 'Loop Statements — for, while, do',
        language: 'javascript',
        code: '// for\nfor (initialize the variable; test the condition; alter the value) { /* do something */ }\n\nfor (let i = 0; i < cars.length; i++) {\n    text += cars[i] + "<br>";\n}\n\n// while\nwhile (condition) { /* code block to be executed */ }\n\nwhile (i < 10) {\n    text += "The number is " + i;\n    i++;\n}',
      },
      {
        type: 'code',
        heading: 'Selection Statements — if, else, else if',
        language: 'javascript',
        code: '// if — run a block only when the condition is true\nif (total_score < 40) {\n    grade = "Fail";\n}\n\n// else — run a block when the condition is false\nif (hour < 40) {\n    grade = "Fail";\n} else {\n    grade = "Pass";\n}\n\n// else if — specify a new condition when the first is false\nif (total_score < 40) {\n    grade = "Fail";\n} else if (total_score < 45) {\n    grade = "E";\n} else if (total_score < 50) {\n    grade = "D";\n} else if (total_score < 60) {\n    grade = "C";\n} else if (total_score < 70) {\n    grade = "B";\n} else {\n    grade = "A";\n}',
      },
      {
        type: 'code',
        heading: 'The switch Statement',
        language: 'javascript',
        code: 'switch (expression) {\n    case x:\n        // code block\n        break;\n    case y:\n        // code block\n        break;\n    default:\n        // code block\n}\n\nswitch (new Date().getDay()) {\n    case 0:\n        day = "Sunday";\n        break;\n    case 1:\n        day = "Monday";\n        break;\n    case 2:\n        day = "Tuesday";\n        break;\n    case 3:\n        day = "Wednesday";\n        break;\n    case 4:\n        day = "Thursday";\n        break;\n    case 5:\n        day = "Friday";\n        break;\n    case 6:\n        day = "Saturday";\n}',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 3',
        prompt: 'Run the code snippet below to test the JavaScript random number function. Explain the functions of the control statements used in it, and paste your output.',
      },
      {
        type: 'code',
        language: 'html',
        code: '<html>\n<head>\n<title>Math example</title>\n</head>\n<body>\n<h1>Math example</h1>\n<p>How random are JavaScript random numbers?\nLet us generate 5000 and find out.</p>\n<script language="JavaScript" type="text/javascript">\ntotal = 0;\nfor (i = 1; i <= 5000; i++) {\n    num = Math.random();\n    total += num;\n    if (i % 1000 == 0)\n        document.write("Generated " + i + " numbers...<br>");\n}\naverage = total / 5000;\naverage = Math.round(average * 1000) / 1000;\ndocument.write("<H2>Average of 5000 numbers: " + average + "</H2>");\n</script>\n</body>\n</html>',
      },
      {
        type: 'note',
        text: 'The expected result is worth predicting before you run it: Math.random() draws uniformly from [0, 1), so the mean of 5000 draws should sit very close to 0.5 — typically 0.49 to 0.51. If your average is far from 0.5, the loop is wrong, not the generator.',
      },
    ],
  },

  {
    number: '4.4',
    title: 'Event Handlers in JavaScript',
    covers: [5],
    sections: [
      {
        type: 'definition',
        heading: 'What an Event Handler Is',
        text: 'An event handler is a special-purpose function, used only in client-side JavaScript. Event-handler functions are defined unusually: as fragments of JavaScript within the HTML tags of certain elements on a web page. They are used to handle and verify user input, user actions and browser actions — things expected to happen every time a page loads or closes, actions expected when a user clicks a button, and content that should be verified when a user inputs data.',
      },
      {
        type: 'table',
        heading: 'Common HTML Events',
        headers: ['Event', 'Description'],
        rows: [
          ['onchange', 'An HTML element has been changed'],
          ['onclick', 'The user clicks an HTML element'],
          ['onmouseover', 'The user moves the mouse over an HTML element'],
          ['onmouseout', 'The user moves the mouse away from an HTML element'],
          ['onkeydown', 'The user pushes a keyboard key'],
          ['onload', 'The browser has finished loading the page'],
        ],
      },
      {
        type: 'code',
        heading: 'A Button That Adds Two Numbers',
        language: 'html',
        code: '<FORM>\n<INPUT TYPE="submit" VALUE="Click me!" onClick="var sum=1+2; alert(sum);">\n</FORM>',
      },
      {
        type: 'text',
        text: 'This piece of JavaScript is actually a function: defining an event handler in an HTML tag creates a JavaScript function object, just as other function definitions do, and that object can be used as other function objects are. The main difference is that the function will be invoked automatically by the browser in response to the appropriate user action.',
      },
      {
        type: 'code',
        heading: 'The Basic Format of an Event Handler',
        language: 'html',
        code: '<HTML_TAG OTHER_ATTRIBUTES eventHandler="JavaScript Program">',
      },
      {
        type: 'text',
        text: 'While any JavaScript statements, methods or functions can appear inside the quotation marks of an event handler, typically the script that makes up the handler is a call to a function defined in the header of the document, or a single JavaScript command.',
      },
      {
        type: 'termlist',
        heading: 'The Available Event Handlers',
        items: [
          { term: 'onClick()', def: 'A click event occurs when a button, checkbox, radio button, reset button or submit button is clicked. Regularly used with a button to start script execution.' },
          { term: 'onSubmit()', def: 'A submit event occurs when the user submits a form. Regularly used with a form and a submit button to start form validation scripts.' },
          { term: 'onMouseOver()', def: 'Occurs when the user positions the mouse over a hyperlink, or a linked region of a client-side image map.' },
          { term: 'onMouseOut()', def: 'Occurs when the user moves the mouse off a hyperlink, or a linked region of a client-side image map.' },
          { term: 'onFocus()', def: 'Occurs when a user tabs into or clicks on a password field, text field, textarea or FileUpload field in a form — that element is then receiving the user\u2019s focus.' },
          { term: 'onLoad()', def: 'The load event triggers when the browser finishes loading a document, or all the frame pages within a <FRAMESET>.' },
          { term: 'onUnload()', def: 'The unload event occurs when you move to a new document — using the back button, or clicking a link to another page.' },
        ],
      },
      {
        type: 'code',
        heading: 'One Example of Each',
        language: 'html',
        code: '<INPUT TYPE="Button" VALUE="Click Me" onClick="window.alert(\'You Clicked me\');">\n\n<FORM action="http://www.xnu.com/formtest.asp" onSubmit="return checkform();">\n\n<a href="http://example.com/simpsons/" onMouseOver="window.status=\'The best Simpsons Webpage on the NET!\'; return true;">Click for information on the Simpsons.</a>\n\n<a href="http://example.com/simpsons/" onMouseOut="window.status=\'The best Simpsons Webpage on the NET!\'; return true;">Click for information on the Simpsons.</a>\n\n<INPUT TYPE="TEXT" NAME="Month" onFocus="window.status=\'(Please enter the Month as two digits 01 through 12)\'; return true;">\n\n<BODY onLoad="alert(\'Welcome to our website!\');">\n\n<BODY onUnload="alert(\'Thanks for checking out our site!\');">',
      },
      {
        type: 'code',
        heading: 'Changing the Background Colour on Hover',
        language: 'html',
        code: '<HTML>\n<HEAD>\n<TITLE>Background Colors</TITLE>\n<SCRIPT language="JavaScript">\nfunction newbg(thecolor) {\n    document.bgColor = thecolor;\n}\n</SCRIPT>\n</HEAD>\n<BODY bgColor="yellow">\n<B>Want a new background color? Change it by placing your mouse over one of the links below!</B> <p>\n<A HREF="#" onMouseover="newbg(\'lightblue\');">Light Blue</A> &nbsp;&nbsp;\n<A HREF="#" onMouseover="newbg(\'orange\');">Orange</A> &nbsp;&nbsp;\n<A HREF="#" onMouseover="newbg(\'beige\');">Beige</A> &nbsp;&nbsp;\n<A HREF="#" onMouseover="newbg(\'yellow\');">Yellow</A>\n</BODY>\n</HTML>',
      },
      {
        type: 'code',
        heading: 'The Same Thing with Buttons',
        language: 'html',
        code: '<HTML>\n<HEAD>\n<TITLE>Background Colors</TITLE>\n<SCRIPT language="JavaScript">\nfunction newbg(thecolor) {\n    document.bgColor = thecolor;\n}\n</SCRIPT>\n</HEAD>\n<BODY bgColor="yellow">\n<B>Want a new background colour? Change the colour by clicking a button below!</B> <P>\n<FORM>\n<INPUT TYPE="button" value="Light Blue" onClick="newbg(\'lightblue\');"> &nbsp;&nbsp;\n<INPUT TYPE="button" value="Orange" onClick="newbg(\'orange\');"> &nbsp;&nbsp;\n<INPUT TYPE="button" value="Beige" onClick="newbg(\'beige\');"> &nbsp;&nbsp;\n<INPUT TYPE="button" value="Yellow" onClick="newbg(\'yellow\');">\n</FORM>\n</BODY>\n</HTML>',
      },
      {
        type: 'note',
        text: 'document.bgColor is a legacy property retained only for backwards compatibility. The modern equivalent is document.body.style.backgroundColor = thecolor. Modern practice also attaches handlers in JavaScript rather than in HTML attributes — element.addEventListener("click", handler) — which keeps behaviour out of the markup and lets several handlers share one element.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 4',
        tasks: [
          'Run the code below and describe the functions of its JavaScript event handlers.',
          'Create a form named calcForm with two labelled input text fields for length and width. In the same form create two labelled output text fields named areaBox and perimeterBox, plus a Calculate button with an onClick handler that calls a function named calculate(). That function should calculate the area and perimeter of the rectangle from the inputted numbers and display the results in the output fields. Paste the output for both parts, or attach an additional sheet.',
        ],
      },
      {
        type: 'code',
        language: 'html',
        code: '<!DOCTYPE html>\n<html>\n<body>\n<h2>What Can JavaScript Do?</h2>\n<p>JavaScript can change HTML attribute values.</p>\n<p>In this case JavaScript changes the value of the src (source) attribute of an image.</p>\n<button onclick="document.getElementById(\'myImage\').src=\'pic_bulbon.gif\'">Turn on the light</button>\n<img id="myImage" src="pic_bulboff.gif" style="width:100px">\n<button onclick="document.getElementById(\'myImage\').src=\'pic_bulboff.gif\'">Turn off the light</button>\n</body>\n</html>',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  MODULE 5 — EXTENSIBLE MARKUP LANGUAGE (XML)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '5.1',
    title: 'XML Basics',
    partial: [6],
    sections: [
      {
        type: 'definition',
        heading: 'What XML Is',
        text: 'XML stands for Extensible Markup Language. It is a text-based markup language derived from the Standard Generalized Markup Language (SGML), used as a standard format for data exchange between applications over the Internet.',
      },
      {
        type: 'text',
        text: 'XML creates markup, or tags, for describing data of any type: mathematical formulae (as in LaTeX), software configuration instructions, chemical molecular structures, music, news, recipes and financial reports. XML therefore describes data in a way that both humans and computers can understand. Where HTML tags are used to display data, XML tags identify data and are used to store and organise it rather than specifying how to display it.',
      },
      {
        type: 'termlist',
        heading: 'Characteristics',
        items: [
          { term: 'XML is extensible', def: 'It allows you to create your own self-descriptive tags, or language, that suits your application.' },
          { term: 'XML carries data, it does not present it', def: 'It allows you to store the data irrespective of how it will be presented.' },
          { term: 'XML is a public standard', def: 'It was developed by the World Wide Web Consortium (W3C) and is available as an open standard.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'XML Usage',
        items: [
          'Simplifies the creation of HTML documents for large web sites.',
          'Exchanges information between organisations and systems.',
          'Offloads and reloads databases.',
          'Stores and arranges data, which can be customised to data handling needs.',
          'Can be merged with style sheets to create any desired output.',
          'Can represent any type of data.',
        ],
      },
      {
        type: 'code',
        heading: 'A Student CGPA Record in XML',
        language: 'xml',
        code: '<?xml version = "1.0"?>\n<!-- Fig. 1: student.xml -->\n<!-- University Student described with XML -->\n<student>\n    <firstName>Inemesit</firstName>\n    <lastName>Aniekan</lastName>\n    <deptName>Computer Science</deptName>\n    <CGPA>3.75</CGPA>\n</student>',
      },
      {
        type: 'text',
        text: 'XML documents contain text that represents data — such as Inemesit — and elements that specify the document\u2019s structure — such as firstName. Elements are delimited by a start tag and an end tag (<student> and </student>), which enclose the text representing a piece of data. Every XML document must have exactly one root element that contains all the other elements; the root element here is student.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 1',
        tasks: [
          'Create a simple XML document representing a book, with attributes such as title, author and publication year.',
        ],
      },
    ],
  },

  {
    number: '5.2',
    title: 'Formatting and Manipulating XML Documents',
    partial: [6],
    sections: [
      {
        type: 'text',
        heading: 'The Syntax Rules',
        text: 'The syntax rules of XML are simple and logical, easy to learn and easy to use. XML documents must contain one root element that is the parent of all other elements.',
      },
      {
        type: 'bullets',
        items: [
          'If the XML declaration is present, it must be placed as the first line in the document.',
          'If the declaration is included, it must contain the version number attribute.',
          'Parameter names and values are case-sensitive.',
          'The names are always in lower case.',
          'The order of the parameters matters. The correct order is: version, encoding, standalone.',
          'Either single or double quotes may be used.',
          'The XML declaration has no closing tag.',
        ],
      },
      {
        type: 'code',
        heading: 'XML Declaration Syntax',
        language: 'xml',
        code: '<?xml version = "version_number" encoding = "encoding_declaration" standalone = "standalone_status" ?>\n\n<!-- Version only -->\n<?xml version = "1.0"?>\n\n<!-- All parameters defined -->\n<?xml version = "1.0" encoding = "UTF-8" standalone = "no" ?>\n\n<!-- All parameters defined, in single quotes -->\n<?xml version = \'1.0\' encoding = \'iso-8859-1\' standalone = \'no\' ?>',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 2',
        tasks: [
          'Provide a practical example of how to use XML comments effectively to document sections of an XML document.',
        ],
      },
    ],
  },

  {
    number: '5.3',
    title: 'Viewing and Modifying XML Documents',
    partial: [6],
    sections: [
      {
        type: 'text',
        heading: 'How to View an XML Document',
        text: 'An XML document can be viewed using a simple text editor or any browser — most of the major browsers support XML. XML files can be opened by double-clicking the document, if it is a local file, or by typing the URL path in the address bar, if the file is on a server, in the same way as any other file. XML files are saved with a .xml extension.',
      },
      {
        type: 'code',
        heading: 'sample.xml',
        language: 'xml',
        code: '<?xml version = "1.0"?>\n<contact-info>\n    <name>Tanmay Patil</name>\n    <company>TutorialsPoint</company>\n    <phone>(011) 123-4567</phone>\n</contact-info>',
      },
      {
        type: 'termlist',
        heading: 'Two Ways to View It',
        items: [
          { term: 'Text editors', def: 'Any simple text editor — Notepad, TextPad or TextEdit — can be used to create or view an XML document.' },
          { term: 'A browser', def: 'Opening the same XML in Chrome displays the document as a collapsible tree of elements.' },
        ],
      },
      {
        type: 'text',
        heading: 'Errors in an XML Document',
        text: 'If the XML has tags missing or mismatched, the browser displays an error message instead of the document. In the example below the start and end tags do not match — contact_info opens but contact-info closes — so Chrome reports a tag mismatch.',
      },
      {
        type: 'code',
        language: 'xml',
        code: '<?xml version = "1.0"?>\n<contact_info>\n    <name>Kingsley Joseph</name>\n    <company>Kings Systems</company>\n    <phone>(234) 805-112-3359</phone>\n</contact-info>',
      },
      {
        type: 'note',
        text: 'The manual illustrates this unit with three screenshots (a TextPad window, the same file in Chrome, and Chrome\u2019s error message). They were not present as images in the source document, so they are described rather than shown. Reproduce them yourself in the laboratory: save the sample above as sample.xml, open it in a text editor and in Chrome, then break one closing tag and reload to see the parse error.',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 3',
        tasks: [
          'Add a new element <price> with a value to an existing XML document representing a product catalogue.',
        ],
      },
    ],
  },

  {
    number: '5.4',
    title: 'Processing and Validating XML Documents',
    covers: [6],
    sections: [
      {
        type: 'definition',
        heading: 'Processing Instructions',
        text: 'Processing instructions (PIs) allow documents to contain instructions for applications. They are not part of the character data of the document, but must be passed through to the application. PIs can appear anywhere in the document outside the markup — in the prolog, including the document type definition (DTD), in textual content, or after the document.',
      },
      {
        type: 'code',
        heading: 'PI Syntax',
        language: 'xml',
        code: '<?target instructions?>',
      },
      {
        type: 'termlist',
        items: [
          { term: 'target', def: 'Identifies the application to which the instruction is directed.' },
          { term: 'instruction', def: 'The characters describing the information for the application to process.' },
        ],
      },
      {
        type: 'text',
        text: 'A PI starts with the special tag <? and ends with ?>. Processing of the contents ends immediately after the string ?> is encountered. PIs are rarely used; mostly they link an XML document to a style sheet.',
      },
      {
        type: 'code',
        language: 'xml',
        code: '<?xml-stylesheet href = "tutorialspointstyle.css" type = "text/css"?>\n\n<!-- Two examples of valid PIs -->\n<?welcome to pg = 10 of tutorials point?>\n<?welcome?>',
      },
      {
        type: 'text',
        text: 'Here the target is xml-stylesheet, while href and type are the instructions the target application uses when processing the document. The browser recognises the target as indicating that the XML should be transformed before being shown: the first attribute states the type of the transform and the second points to its location. A PI can contain any data except the combination ?>, which is interpreted as the closing delimiter.',
      },
      {
        type: 'definition',
        heading: 'Validating XML Documents',
        text: 'Validation is the process by which an XML document is checked. A document is said to be valid if its contents match the elements, attributes and associated document type declaration (DTD), and if it complies with the constraints expressed in it. Validation is dealt with by the XML parser in two ways: the well-formed XML document, and the valid XML document.',
      },
      {
        type: 'bullets',
        heading: 'Rules for a Well-Formed XML Document',
        items: [
          'Non-DTD XML files must use the predefined character entities for & (amp), \u2018 (apos), > (gt), < (lt) and " (quot).',
          'It must follow the ordering of the tags — the inner tag must be closed before closing the outer tag.',
          'Each opening tag must have a closing tag, or must be a self-closing tag (<title>....</title> or <title/>).',
          'An attribute in a start tag must be quoted.',
          'Entities other than amp, apos, gt, lt and quot must be declared.',
        ],
      },
      {
        type: 'code',
        heading: 'A Well-Formed Document with a DTD',
        language: 'xml',
        code: '<?xml version = "1.0" encoding = "UTF-8" standalone = "yes" ?>\n<!DOCTYPE address\n[\n    <!ELEMENT address (name,company,phone)>\n    <!ELEMENT name (#PCDATA)>\n    <!ELEMENT company (#PCDATA)>\n    <!ELEMENT phone (#PCDATA)>\n]>\n<address>\n    <name>Kingsley Joseph</name>\n    <company>Kings Systems</company>\n    <phone>(234) 805-112-3359</phone>\n</address>',
      },
      {
        type: 'bullets',
        heading: 'Why That Example Is Well-Formed',
        items: [
          'It defines the type of document — here the document type is element type.',
          'It includes a root element named address.',
          'Each of the child elements — name, company and phone — is enclosed in its own self-explanatory tag.',
          'The order of the tags is maintained.',
        ],
      },
      {
        type: 'code',
        heading: 'An XML Document for E-mail',
        language: 'xml',
        code: '<?xml version="1.0" encoding="UTF-8"?>\n<emails>\n    <email>\n        <to>Victor</to>\n        <from>Kingsley</from>\n        <heading>Hello Sir</heading>\n        <body>Hello, how are you sir!</body>\n    </email>\n    <email>\n        <to>Patience</to>\n        <from>Ilok</from>\n        <heading>Birthday wish</heading>\n        <body>Happy birthday Ma!</body>\n    </email>\n    <email>\n        <to>Uyinomen</to>\n        <from>Victor</from>\n        <heading>Morning walk</heading>\n        <body>Please start morning walk to stay fit!</body>\n    </email>\n    <email>\n        <to>Kingsley</to>\n        <from>Patience</from>\n        <heading>Health Tips</heading>\n        <body>Smoking is injurious to health!</body>\n    </email>\n</emails>',
      },
      {
        type: 'casestudy',
        title: 'Practical Exercise 4',
        tasks: [
          'Create a DTD to define the structure of an XML document representing a customer profile.',
          'Associate the created DTD with an XML document and ensure that it adheres to the defined structure.',
        ],
      },
      {
        type: 'bullets',
        heading: 'References Cited by the Manual',
        items: [
          'Ballard, P. and Moncur, M. (2009). Teach Yourself Ajax, JavaScript and PHP. Sams, USA.',
          'Deitel, P. J. and Deitel, H. M. (2009). Internet and World Wide Web: How to Program. Pearson International Edition.',
          'Terry, F-M. (2009). Web Development and Design Foundations with XHTML. Pearson International Edition.',
          '"Structure of the Internet" — https://www.teachcomputerscience.com/',
          '"How to connect to the Internet" — https://www.wiki-how.com/',
          '"XML Tutorial" — https://www.tutorialspoint.com/xml/',
        ],
      },
    ],
  },
];
