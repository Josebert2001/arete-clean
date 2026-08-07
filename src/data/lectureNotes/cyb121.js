// UUY-CYB 121 — Introduction to Computer Networks
// Lecture notes transcribed from the CYB 121 study guide compiled from the
// departmental lecture notes of Sir Robinson and Sir Ubong Ntia, with the
// practical cabling material lectured by Mr. Mike Umeh.
//
// The guide's seven numbered sections map one-to-one onto the seven topics
// below, numbered to match so a student can cross-reference the printed
// handout.
//
// `covers` / `partial` refer to 1-based indices in the course's `topics` array
// in courses.js — CourseDetail uses them to show which syllabus items the notes
// actually reach. Syllabus items 6 (network layer: IP/ARP/ICMP, subnetting,
// RIP/OSPF/BGP), 7 (transport layer) and 8 (application layer, IPv6) are
// deliberately unmapped: the guide never reaches them. Topic 6 does describe a
// router as a network-layer device that reads IP addresses, but that single
// paragraph is nowhere near item 6's syllabus, so it is not claimed as a
// partial — those three items still need the textbook.
//
// Figures live in public/lecture-notes/cyb-121/ (extracted from the guide's
// embedded images by scripts/optimize-lecture-images.mjs). Figure numbers below
// are ours — the guide numbers none of its figures.
//
// Material genuinely added beyond the guide — including clarifications where
// the guide is terse or dated — is marked with a `note` section
// ("Added for clarity").

const IMG = '/lecture-notes/cyb-121';

export const cyb121LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  1 — FUNDAMENTALS OF COMPUTER NETWORKING
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'Fundamentals of Computer Networking',
    covers: [1],
    partial: [5],
    sections: [
      {
        type: 'text',
        text: 'Computer networking forms the backbone of modern digital communication, enabling interconnected devices to share hardware, software and data resources. This first section establishes what a network actually is, the vocabulary the rest of the course depends on, and how networks are classified by the ground they cover.',
      },
      {
        type: 'definition',
        heading: 'What is Computer Networking?',
        text: 'Computer networking is the process of connecting two or more autonomous computing devices to enable resource sharing — information, printers, files, data and servers. For communication to succeed, a network must possess a common physical or logical connecting link, and the communicating devices must adhere to mutually agreed-upon rules known as protocols.',
      },
      {
        type: 'termlist',
        heading: 'Key Terminology',
        items: [
          { term: 'Protocol', def: 'A formal set of rules and conventions that govern how data is transmitted and received between computers across a network.' },
          { term: 'MAC (Media Access Control) address', def: 'A unique hardware identifier assigned to a network interface controller (NIC), used as the device’s address within a network segment.' },
          { term: 'IP (Internet Protocol) address', def: 'A numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication.' },
        ],
      },
      {
        type: 'note',
        text: 'Hold on to the distinction between the two addresses — it is the single most examined idea in this course. A MAC address is burned into the hardware and only has meaning inside one network segment; an IP address is assigned by software and is what carries a packet across the world. Section 6 returns to it: a switch reads MAC addresses, a router reads IP addresses.',
      },
      {
        type: 'text',
        heading: 'Classifications of Computer Networks',
        text: 'Networks are categorised by their geographic scope and scale. Each type nests inside a larger one, scaling from a single room out to a global reach.',
      },
      {
        type: 'image',
        src: `${IMG}/lan-man-wan.webp`,
        width: 1400, height: 1200, maxWidth: 620,
        alt: 'Concentric circles showing a PC inside a LAN, inside a MAN, inside a WAN',
        caption: 'Figure 1: Network scope — each network type nests inside a larger one.',
      },
      {
        type: 'table',
        headers: ['Network Type', 'Geographic Scope', 'Characteristics & Technologies'],
        rows: [
          ['Local Area Network (LAN)', 'Small geographic area (a single room, office building or laboratory)', 'Low cost to operate; connects a small number of computers via physical cables; runs at high speeds, typically between 10 Mbps and 100 Mbps.'],
          ['Metropolitan Area Network (MAN)', 'City-wide scope (e.g. Uyo metropolis)', 'Spans a larger area than a LAN while using similar networking technologies; moderately expensive.'],
          ['Wide Area Network (WAN)', 'Large geographical scale spanning countries or continents', 'Connects multiple distinct networks across vast geographical distances using telecommunication circuits.'],
          ['Wireless networks', 'Flexible coverage without physical wired constraints', 'The fastest-growing segment in modern computing, letting mobile devices such as laptops and notebooks connect seamlessly to enterprise offices.'],
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  2 — ORGANIZATIONAL COMPUTATIONAL MODELS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2',
    title: 'Organizational Computational Models',
    partial: [3],
    sections: [
      {
        type: 'text',
        text: 'When designing a network — whether a LAN or a WAN — the overarching goals are to establish efficient data sharing, provide centralised services, maintain security and administration, and minimise equipment costs. Three primary organisational models govern how processing and data storage are distributed.',
      },
      {
        type: 'definition',
        heading: 'Centralized Computing',
        text: 'In a centralized computing model, all processing power and data storage reside at a single central location — typically a mainframe, UNIX host or powerful server. Connected client terminals (historically dumb terminals) act merely as input/output interfaces.',
      },
      {
        type: 'proscons',
        advantages: [
          'Excellent security, since all data and applications reside on one machine',
          'Simplified centralised administration — one place to patch, back up and audit',
        ],
        disadvantages: [
          'High network traffic between the clients and the central host',
          'Performance bottlenecks: system response slows as terminal concurrency increases',
        ],
      },
      {
        type: 'definition',
        heading: 'Distributed Computing',
        text: 'Distributed computing replaces dumb terminals with autonomous personal computers. Each workstation can operate independently for local tasks while still interacting with network servers to retrieve shared files or resources. The application logic is executed on the client workstation rather than on the server.',
      },
      {
        type: 'proscons',
        advantages: [
          'Lower entry cost, with flexible hardware arrangements',
          'Computing resources can be scaled up or down as needed',
        ],
        disadvantages: [
          'Operates primarily on shared-level security rather than strict centralised administration',
          'Client workstations require higher processing power of their own',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/centralized-vs-distributed.webp`,
        width: 1400, height: 700,
        alt: 'Left: terminals radiating from a single mainframe. Right: six PCs interconnected as peers',
        caption: 'Figure 2: Centralized computing (all processing on one host) versus distributed computing (each PC has its own processing power and storage).',
      },
      {
        type: 'definition',
        heading: 'Collaborative (Cooperative) Computing',
        text: 'Collaborative computing enables multiple computers to share both resources and processing tasks. In a client-server database architecture such as Microsoft SQL Server, a client submits a query, the database server performs the heavy backend processing — filtering and sorting records — and returns only the processed results to the client for final presentation.',
      },
      {
        type: 'note',
        text: 'Notice that collaborative computing is not a third place to put the work — it is the work being split. That is why the query in the example runs on the server (which holds the data and can filter it fastest) while the formatting runs on the client. Ask of any system: which side is doing which half, and why?',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  3 — NETWORK MODELS: PEER-TO-PEER VS SERVER-BASED
  // ─────────────────────────────────────────────────────────────────
  {
    number: '3',
    title: 'Network Models: Peer-to-Peer vs Server-Based',
    partial: [3],
    sections: [
      {
        type: 'text',
        text: 'Networks are architected differently depending on scale, security requirements and administrative overhead. The two models below are the standard answer to "how are responsibilities divided between the machines on this network?"',
      },
      {
        type: 'image',
        src: `${IMG}/client-server-vs-p2p.webp`,
        width: 501, height: 408, maxWidth: 460,
        alt: 'Top: two clients both connected to a central server. Bottom: two peers connected directly to each other',
        caption: 'Figure 3: The client/server model versus the peer-to-peer model. (Source: Wikimedia Commons)',
      },
      {
        type: 'definition',
        heading: 'Peer-to-Peer (P2P) Networking Model',
        text: 'In a peer-to-peer network, every connected machine functions simultaneously as both a client and a server. No dedicated server is required.',
      },
      {
        type: 'bullets',
        items: [
          'Characteristics: ideal for small environments, typically fewer than 10 machines; provides shared-level security. Systems such as MS Windows 95, 98 and NT Workstation support P2P configurations.',
          'Applications: small workgroups, file sharing, blockchain networks and distributed backup storage.',
        ],
      },
      {
        type: 'proscons',
        advantages: [
          'Inexpensive to implement',
          'Zero requirement for dedicated server hardware',
        ],
        disadvantages: [
          'Administration overhead grows painfully as the network grows',
          'Weak security controls — permissions are attached to shares, not to people',
        ],
      },
      {
        type: 'definition',
        heading: 'Server-Based (Client-Server) Networking Model',
        text: 'Server-based networks require dedicated servers — such as Windows NT Server or NetWare — to manage network resources and enforce user-level security. Permissions and access rights are tied to authenticated user accounts maintained centrally by the server.',
      },
      {
        type: 'bullets',
        items: [
          'Examples: web browsing (HTTP/HTTPS), email systems (SMTP/IMAP) and centralised client-server database systems.',
        ],
      },
      {
        type: 'proscons',
        advantages: [
          'Robust user-level security',
          'Centralised administration: logon scripts, user management and backups',
          'Scales across large enterprise environments',
        ],
        disadvantages: [
          'Higher initial cost, because of the dedicated server hardware',
        ],
      },
      {
        type: 'note',
        text: 'Shared-level versus user-level security is the phrase to remember. Shared-level security protects a resource with a password attached to the share itself — anyone holding it is in, and you cannot tell afterwards who that was. User-level security attaches rights to a named account, so access can be granted, revoked and audited per person. That difference is exactly why the ten-machine rule of thumb exists.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  4 — NETWORK SERVICES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '4',
    title: 'Network Services',
    partial: [3],
    sections: [
      {
        type: 'text',
        text: 'Network services define the functional capabilities a server provides to the client systems on the network. A single physical server commonly runs several of them at once.',
      },
      {
        type: 'termlist',
        heading: 'The Three Core Server Roles',
        items: [
          { term: 'File servers', def: 'Provide a centralised repository for storing files, letting multiple users access common data securely and making centralised backup possible.' },
          { term: 'Print servers', def: 'Manage and coordinate access to one or more shared network printers on behalf of multiple clients.' },
          { term: 'Application servers', def: 'Host and execute software applications on behalf of clients, processing data on the server side and delivering the results across the network.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  5 — PROTOCOL LAYERING AND TRANSMISSION MEDIA
  // ─────────────────────────────────────────────────────────────────
  {
    number: '5',
    title: 'Protocol Layering and Transmission Media',
    partial: [4],
    sections: [
      {
        type: 'definition',
        heading: 'Protocol Layering and Architecture',
        text: 'To manage design complexity, networks are structured as a hierarchy of layers or levels, where each layer builds upon the services of the layer directly beneath it.',
      },
      {
        type: 'image',
        src: `${IMG}/protocol-layering.webp`,
        width: 966, height: 584,
        alt: 'Three stacked layers on two machines; each layer instance talks to its peer across a labelled protocol line',
        caption: 'Figure 4: Layered protocol communication — peer layers exchange data via defined protocols, with data encapsulated as it passes down the stack. (Source: Wikimedia Commons)',
      },
      {
        type: 'termlist',
        heading: 'The Vocabulary of Layering',
        items: [
          { term: 'Interface', def: 'The boundary between two adjacent layers on the same machine. It defines the primitive operations the lower layer offers to the one above it.' },
          { term: 'Protocol', def: 'An agreement between communicating peer layers on different machines, governing how that communication proceeds.' },
          { term: 'Protocol stack', def: 'The complete ordered list of protocols in use by a system — one protocol per layer.' },
          { term: 'Data encapsulation and flow', def: 'Data flows downward through the sender’s layers to the physical medium, crosses the physical channel, and ascends upward through the receiver’s layers.' },
        ],
      },
      {
        type: 'note',
        text: 'The two horizontal lines in Figure 4 are the whole idea. Layer 4 on one machine behaves as though it is talking straight across to layer 4 on the other — that is the protocol, and it is a fiction the lower layers maintain. Nothing actually crosses horizontally; every byte goes down the sender’s stack, over the wire, and back up the receiver’s. Layer 4 simply never has to know that.',
      },
      {
        type: 'text',
        heading: 'Practical Networking and Cabling',
        text: 'Lectured by Mr. Mike Umeh. Practical network implementation comes down to specialised cabling and the tools that terminate it.',
      },
      {
        type: 'definition',
        heading: 'CAT 5 Cable',
        text: 'A standardised twisted-pair cable containing four pairs of colour-coded wires, designed for laboratory and enterprise networking.',
      },
      {
        type: 'bullets',
        heading: 'Colour Coding — T568 Standard Order',
        items: [
          'Pin 1 — White-Orange',
          'Pin 2 — Orange',
          'Pin 3 — White-Green',
          'Pin 4 — Blue',
          'Pin 5 — White-Blue',
          'Pin 6 — Green',
          'Pin 7 — White-Brown',
          'Pin 8 — Brown',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/rj45-pinout.webp`,
        width: 798, height: 599,
        alt: 'Two RJ-45 connectors with pins 1 to 8; straight wires join pin 1 to 1, 2 to 2, 3 to 3 and 6 to 6, leaving 4, 5, 7 and 8 unconnected',
        caption: 'Figure 5: RJ-45 pin numbering used by the T568 wiring standard — pins 1, 2, 3 and 6 are the conductors that carry 10/100 Mbps Ethernet. (Source: Wikimedia Commons)',
      },
      {
        type: 'text',
        heading: 'Twisted Wire Order',
        text: 'When arranged and crimped, the functional pairing order follows: 1, 2, 3, 6, 4, 5, 7, 8.',
      },
      {
        type: 'note',
        text: 'That ordering looks arbitrary until you line it up against Figure 5. Pins 1 and 2 are the transmit pair and pins 3 and 6 the receive pair, which is why they are listed first — they are the four wires 10/100 Mbps Ethernet actually uses. Pins 4, 5, 7 and 8 come afterwards because they are the pairs left over (Gigabit Ethernet does use all four pairs). Note also that the colour sequence given above is the T568B variant; T568A swaps the orange and green pairs. Either is fine as long as both ends of a straight-through cable use the same one.',
      },
      {
        type: 'termlist',
        heading: 'Essential Tools',
        items: [
          { term: 'Trimmer / stripper', def: 'Strips the cable’s outer jacket safely without damaging the conductors inside. Do not substitute a knife or scissors.' },
          { term: 'Crimper', def: 'A plier-like tool that attaches RJ-45 connectors securely to the cable ends.' },
          { term: 'RJ-45 connector', def: 'A transparent modular connector carrying 8 gold-plated contact pins.' },
          { term: 'LAN tester', def: 'An electronic testing device that verifies electrical continuity across all 8 pins after crimping.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/rj45-connector.webp`,
        width: 772, height: 599, maxWidth: 560,
        alt: 'Close-up of a grey UTP patch cable terminated in a transparent RJ-45 plug, the eight coloured conductors visible inside',
        caption: 'Figure 6: An RJ-45 connector terminated on UTP cable, showing the eight colour-coded conductors. (Source: Wikimedia Commons)',
      },
      {
        type: 'image',
        src: `${IMG}/cabling-tools.webp`,
        width: 798, height: 599,
        alt: 'An open tool case containing a stripper, a two-part master/remote cable tester, a punch-down tool and a crimping plier',
        caption: 'Figure 7: Essential cabling tools — cable stripper, cable tester and crimping tool. (Source: Wikimedia Commons)',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  6 — INTERNETWORKING DEVICES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '6',
    title: 'Internetworking Devices',
    partial: [2, 5],
    sections: [
      {
        type: 'text',
        text: 'Network hardware devices operate at different layers of the OSI model to connect segments and manage traffic. The layer a device works at tells you exactly how much of the packet it is able to read — and therefore how intelligent its forwarding decisions can be.',
      },
      {
        type: 'definition',
        heading: 'Hub (Physical Layer)',
        text: 'A multiport repeater that broadcasts an incoming electrical signal across all of its active ports.',
      },
      {
        type: 'termlist',
        heading: 'Types of Hub',
        items: [
          { term: 'Passive hub', def: 'Purely connects cable segments together, without regenerating the signal.' },
          { term: 'Active hub', def: 'Regenerates and amplifies the signal before repeating it.' },
          { term: 'Intelligent hub', def: 'An active hub that additionally incorporates network management protocols such as SNMP.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/hub.webp`,
        width: 497, height: 328, maxWidth: 460,
        alt: 'A small four-port Ethernet hub',
        caption: 'Figure 8: A 4-port Ethernet hub, a physical layer device. (Source: Wikimedia Commons)',
      },
      {
        type: 'definition',
        heading: 'Multiplexer',
        text: 'Combines multiple distinct signals onto a single transmission medium.',
      },
      {
        type: 'definition',
        heading: 'Bridge (Data Link Layer)',
        text: 'Connects two separate network segments into one logical whole by examining MAC addresses.',
      },
      {
        type: 'definition',
        heading: 'Switch (Data Link Layer)',
        text: 'Often described as a high-performance multiport bridge, supporting dozens or hundreds of ports, with each port providing exclusive dedicated bandwidth — for example 10 or 100 Mbps per port.',
      },
      {
        type: 'image',
        src: `${IMG}/switch.webp`,
        width: 904, height: 599,
        alt: 'A rack-mount network switch with a row of Ethernet ports',
        caption: 'Figure 9: A network switch, a data link layer device. (Source: Wikimedia Commons)',
      },
      {
        type: 'definition',
        heading: 'Router (Network Layer)',
        text: 'The most sophisticated internetworking device. It examines network-layer addresses — IP addresses — to make intelligent routing decisions across complex interconnected networks.',
      },
      {
        type: 'image',
        src: `${IMG}/router.webp`,
        width: 784, height: 599, maxWidth: 560,
        alt: 'A consumer wireless router with external antennas',
        caption: 'Figure 10: A wireless router, a network layer device. (Source: Wikimedia Commons)',
      },
      {
        type: 'table',
        heading: 'The Devices Side by Side',
        headers: ['Device', 'OSI Layer', 'What it reads', 'Forwarding behaviour'],
        rows: [
          ['Hub', 'Physical', 'Nothing — only the electrical signal', 'Broadcasts to every active port'],
          ['Bridge', 'Data link', 'MAC addresses', 'Joins two segments into one logical network'],
          ['Switch', 'Data link', 'MAC addresses', 'Forwards to the one port that owns the destination MAC; each port gets dedicated bandwidth'],
          ['Router', 'Network', 'IP addresses', 'Chooses a path between distinct networks'],
        ],
      },
      {
        type: 'note',
        text: 'Read that table upwards and the pattern falls out: the higher the layer, the more of the packet the device can read, and the more selective its forwarding becomes. A hub cannot tell one frame from another so it shouts at everybody; a switch reads the destination MAC and sends the frame down exactly one port; a router reads the destination IP and picks a route to a whole other network. This is also why a hub is a security problem — every machine on it can see every other machine’s traffic. It is the reason hubs have essentially disappeared from real networks.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  7 — CONNECTION TYPES AND PHYSICAL TOPOLOGIES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '7',
    title: 'Connection Types and Physical Topologies',
    covers: [2],
    sections: [
      {
        type: 'termlist',
        heading: 'Connection Types',
        items: [
          { term: 'Point-to-point (P2P)', def: 'A dedicated direct link connecting exactly two devices — for example a computer connected directly to a printer.' },
          { term: 'Multipoint', def: 'A single shared communication medium connected among three or more devices, where the total bandwidth is shared among all active participants.' },
        ],
      },
      {
        type: 'image',
        src: `${IMG}/p2p-vs-multipoint.webp`,
        width: 1400, height: 585,
        alt: 'Left: a PC linked directly to a printer. Right: four devices tapped onto one shared backbone cable',
        caption: 'Figure 11: A point-to-point link connects exactly two devices; a multipoint link shares one medium among three or more.',
      },
      {
        type: 'definition',
        heading: 'Physical Topologies',
        text: 'Physical topology defines the geometric arrangement of devices and cables in a network. Network designers evaluate topologies on ease of installation, simplicity of troubleshooting, and fault tolerance against media failures.',
      },
      {
        type: 'text',
        heading: 'Bus Topology',
        text: 'Devices connect to a single central cable, the backbone. Easy to install, but a break in the backbone disables the entire segment.',
      },
      {
        type: 'image',
        src: `${IMG}/topology-bus.webp`,
        width: 1400, height: 1000, maxWidth: 620,
        alt: 'Several PCs tapped onto one horizontal backbone cable terminated at both ends',
        caption: 'Figure 12: Bus topology.',
      },
      {
        type: 'text',
        heading: 'Ring Topology',
        text: 'Devices are connected in a closed circular loop. Data travels in one direction, and a single node failure can disrupt the ring.',
      },
      {
        type: 'image',
        src: `${IMG}/topology-ring.webp`,
        width: 1200, height: 1200, maxWidth: 560,
        alt: 'Six PCs connected in a closed circular loop',
        caption: 'Figure 13: Ring topology.',
      },
      {
        type: 'text',
        heading: 'Star Topology',
        text: 'All devices connect to a central hub or switch. Highly reliable: the failure of a peripheral cable affects only that one device, not the rest of the network.',
      },
      {
        type: 'image',
        src: `${IMG}/topology-star.webp`,
        width: 1200, height: 1200, maxWidth: 560,
        alt: 'Several PCs each cabled to a single central hub',
        caption: 'Figure 14: Star topology.',
      },
      {
        type: 'text',
        heading: 'Mesh Topology',
        text: 'Every node possesses a dedicated point-to-point link to every other node in the network, offering exceptional fault tolerance and redundancy against media failures.',
      },
      {
        type: 'image',
        src: `${IMG}/topology-mesh.webp`,
        width: 1200, height: 1200, maxWidth: 560,
        alt: 'Six PCs arranged in a hexagon, every one linked directly to all five others',
        caption: 'Figure 15: Mesh topology — every device has a dedicated link to every other device.',
      },
      {
        type: 'text',
        heading: 'Hybrid-Mesh Topology',
        text: 'A combination of two or more distinct topologies, tailored to the needs of the organisation.',
      },
      {
        type: 'note',
        text: 'The star hides a catch worth stating in an exam answer: it survives any cable failure, but the central hub or switch is a single point of failure for the whole segment. Mesh has no such weak point, which is why it is the fault-tolerance answer — but the cost is n(n-1)/2 links, so a 6-node mesh already needs 15 cables and a 20-node mesh would need 190. That arithmetic is why real networks are almost always hybrid: star-wired at the edge where cable failures are common and cheap to isolate, meshed only in the core where an outage is expensive.',
      },
    ],
  },
];
