export const ins224LectureNotes = [
      {
        number: '1',
        title: 'Introduction to Systems Analysis and Design',
        sections: [
          {
            type: 'text',
            heading: '1.0 Introduction',
            text: 'Systems analysis and design is the discipline of understanding what needs to be built, how it should work, and how to construct it in a way that’s maintainable, scalable, and aligned with business goals. It sits at the intersection of business strategy, technical architecture, and human behavior. When done well, it prevents costly mistakes, reduces rework, and creates systems that actually solve the problems they were meant to solve. When neglected, it leads to the kind of chaos that eventually forces organizations to rebuild everything from scratch.',
          },
          {
            type: 'text',
            text: 'In this chapter, we’ll explore what systems analysis and design really means, why it matters more than ever in our increasingly digital world, and how it serves as the foundation for all successful technology projects. Whether you’re building software, redesigning business processes, or modernizing legacy systems, the principles and principles you’ll learn here will transform how you approach complex problems.',
          },
          {
            type: 'text',
            heading: '1.1 Understanding Systems',
            text: 'Before we can analyze or design systems, we need to understand what a system actually is. Most people think of systems as software code, databases or applications. But that’s too narrow. A system is any set of interconnected components that work together to achieve a specific purpose. A system can be technical, but it can also be organizational, operational, or a combination of all three.',
          },
          {
            type: 'text',
            text: 'Consider a retail business’s order fulfillment system. It includes the e-commerce website customers use to browse and buy, the inventory management software that tracks stock levels, the warehouse management system that picks and packs orders, the shipping integration that labels packages, the payment processing system that handles transactions, and the customer service system that handles returns and inquiries. But it also includes the people who work in the warehouse, the business processes they follow, the suppliers who replenish inventory, and the metrics that determine whether the system is working well. A true system encompasses all of these elements.',
          },
          {
            type: 'text',
            text: 'This matters because when you focus only on the technical components, you miss critical dependencies and failure points. You might build a beautiful, efficient order management system that perfectly tracks every order; but if the warehouse staff doesn’t use it because it’s cumbersome, if suppliers can’t integrate their systems with yours, or if your payment processor has different validation rules than your order system expects, the whole thing breaks down. Systems analysis forces you to see the complete picture.',
          },
          {
            type: 'text',
            text: 'A system has several defining characteristics. First, it has a clear purpose or goal, that is, a reason for existing, Second, it has multiple components or parts that are interdependent; remove one piece, and the whole system degrades. Third, it has boundaries that define what’s inside the system and what’s outside. Fourth, it receives inputs, processes them, and produces outputs. Finally, it includes feedback mechanisms that help it adapt and improve.',
          },
          {
            type: 'text',
            text: 'When you understand these characteristics, you start asking better questions. What are the system’s boundaries? What components does it include, and how do they depend on each other? What happens if one component fails? How does the system know whether it’s achieving its purpose? These questions are the beginning of systems analysis.',
          },
          {
            type: 'text',
            heading: '1.1.1 Why Systems Analysis and Design',
            text: 'Why is systems analysis and design so critical today? After all, people have been building systems for decades. The answer lies in the explosion of complexity and interconnectedness in the modern world.',
          },
          {
            type: 'text',
            text: 'Thirty years ago, building a business application meant creating a single software system that ran on servers on data centers. It was self-contained. Users controlled the hardware, the operating system, the database, everything. If something went wrong, they would investigate it locally and fix it. Nowadays, that same application might run across multiple cloud providers, integrate with dozens of third-party services, process data from Internet of things (IoT) devices, handle transactions in multiple currencies and regulatory jurisdictions, and serve users across the globe in different time zones. The complexity has increased exponentially.',
          },
          {
            type: 'text',
            text: 'At the same time, the cost of failure has risen dramatically. A broken system might not just frustrate a few users, it could expose customer data, cause financial losses, damage brand reputation, or violate regulations. In 2023, a single software bug caused a global outage affecting millions of people across airlines, banks, and media companies. The estimated cost was in billions of naira. That’s not an outlier; it’s a sign of how interconnected and fragile our systems have become.',
          },
          {
            type: 'text',
            text: 'The business environment has also accelerated. Companies need to launch new products faster, respond to market changes quickly, and adapt to customer demands in real time. This creates pressure to cut corners, skip planning, and just start coding. Yet ironically, the faster you need to move, the more important it is to have a clear design. A well-designed system can be modified and extended quickly. A poorly designed system becomes a bottleneck that slows everything down.',
          },
          {
            type: 'text',
            text: 'Finally, the stakes for getting it right have never been higher. Digital systems now run critical infrastructure, power grids, water systems, hospitals and transportation networks. They handle sensitive personal information, financial transactions, and confidential business data. They influence elections, shape public opinion, and affect people’s lives in profound ways. Building these systems without careful analysis and thoughtful design isn’t just inefficient; it’s irresponsible.',
          },
          {
            type: 'text',
            heading: '1.1.2 Relationship between Systems Analysis and Systems Design',
            text: 'Systems analysis and design is often treated as a single discipline, but it’s really two distinct activities that work together. Understanding the difference is crucial.',
          },
          {
            type: 'text',
            text: 'Systems analysis is about understanding the current state and the desired future state. It’s investigative and diagnostic. When you’re doing analysis, you’re asking: What problems are we trying to solve? What does the business actually need? How do our current systems work, and where are the inefficiencies? What constraints and requirements do we have? Who are the stakeholders, and what do they care about? What data do we need to collect, process, and report? Analysis is about discovery, uncovering the truth about a situation so that you can make informed decisions.',
          },
          {
            type: 'text',
            text: 'Systems design is about creating a blueprint for how to build the solution. It’s creative and prescriptive. When you’re doing design, you’re asking: What architecture will best serve our needs? How should we organize the data? What components do we need, and how should they interact? What technologies and tools should we use? How will we ensure the system is secure, reliable, and performant? Design is about making choices, it’s about deciding how to structure the solution so it achieves the goals identified during analysis.',
          },
          {
            type: 'text',
            text: 'The relationship between analysis and design is symbiotic. Good analysis informs good design. If you don’t understand the problem deeply, you’ll design a solution that doesn’t actually solve it. But design also influences analysis. As you start designing, you discover constraints and dependencies that force you to revisit your analysis. In practice, these activities are iterative, you analyze, you design, you discover something that requires more analysis, you refine your design, and so on.',
          },
          {
            type: 'text',
            text: 'Many projects fail because they skip or shortchange analysis. Teams are eager to start building, so they do a cursory requirements gathering, make some assumptions, and jump into design and development. Then, halfway through the project, they discover that their assumptions were wrong, their requirements were incomplete, or the design doesn’t actually address the real problem. At that point, they’ve already spent significant time and money, and fixing it requires rework and delays.',
          },
          {
            type: 'text',
            heading: '1.1.3 The Real-World Impact: From Problem to Solution',
            text: 'To understand why this matters, let’s trace through a realistic example. Imagine you work at University of Uyo Teaching Hospital (UUTH), a healthcare institution that is struggling with patient scheduling. Doctors are overbooked, patients wait weeks for appointments, and staff spend hours manually coordinating schedules across different departments. The management team decides to implement a new scheduling system.',
          },
          {
            type: 'text',
            text: 'Without proper analysis and design, here’s what might happen: The IT team gets a budget, researches scheduling software on the market, picks one that looks good, and starts implementing it. Six months later, they realize the software does not handle the hospital’s complex rules for doctor availability, does not integrate with the electronic health records system, and does not account for the way the hospital actually works. The project is over budget, behind schedule, and the software has not solved the original problem.',
          },
          {
            type: 'text',
            text: 'With proper analysis and design, here’s what would happen differently: First, you will analyze the current situation. You will interview doctors, nurses, schedulers, and patients. You will then map the current scheduling process, identifying bottlenecks and pain points. You could discover that the real problem is not just scheduling; it’s that doctors have complex availability rules, some patients need specific doctors, some appointments require special equipment or facilities, and the current system cannot handle these constraints. You could also discover that scheduling decisions affect other systems such as, billing, patient communications, and resource allocation.',
          },
          {
            type: 'text',
            text: 'Next, you design a solution that accounts for these realities. You could decide that the scheduling system needs to integrate with the EHR system, needs to enforce complex rules about doctor availability, and needs to communicate with billing and patient notification systems. Then, you design the data model to represent all the constraints. You could plan the implementation in phases, starting with the core scheduling functionality and adding complexity gradually. You identify risks such as, staff resistance to change and plan mitigation strategies.',
          },
          {
            type: 'text',
            text: 'Finally, you build the solution with a clear blueprint, knowing that you are addressing the real problem, not a fictional version of it. The result is a system that actually improves scheduling, that integrates with the hospital’s other systems, and that staff adopt because it makes their jobs easier.',
          },
          {
            type: 'text',
            text: 'The difference is not just about success or failure. It’s about the cost of failure. A poorly analyzed and designed project might fail after spending millions of naira and years of effort. A well-analyzed and designed project might still face challenges, but it’s much more likely to succeed and to do so efficiently.',
          },
          {
            type: 'text',
            heading: '1.2 Systems Defined',
            text: 'A young entrepreneur launches an e-commerce business from her garage. She builds a website, sets up a payment processor, and starts taking orders. For the first few months, everything works beautifully. Then something unexpected happens. A customer places an order, the payment goes through, but the order never appears in her fulfillment system. Another customer receives an invoice for a product they never ordered. A third customer’s shipping address gets corrupted, and packages start going to the wrong places. The entrepreneur is confused. Each individual piece; the website, the payment system, the inventory database, the shipping integration, works fine in isolation. So why is everything falling apart?',
          },
          {
            type: 'text',
            text: 'The answer is that she is building a system, but she does not understand what a system is. She’s focused on individual components without understanding how they interconnect, how they depend on each other, and how failures in one component cascade through the entire system.',
          },
          {
            type: 'text',
            heading: '1.2.1 What Is a System? A Clear Definition',
            text: 'The word System is derived from Greek word Systema, which means an organized relationship between any set of components to accomplish a specific purpose, goal or objective.',
          },
          {
            type: 'definition',
            text: 'A system is “an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal” (Wasson, 2005).',
          },
          {
            type: 'definition',
            text: 'A system is an integrated set of interoperable elements, each with explicitly specified and bounded capabilities, working synergistically to perform value-added processing to enable a user to satisfy mission-oriented operational needs in a prescribed operating environment that guarantees a specified outcome and probability of success” (Wasson, 2008).',
          },
          {
            type: 'text',
            text: 'From the entrepreneur’s example, the website, payment processor, order database, and shipping system are interdependent. The website depends on the payment processor to validate transactions. The payment processor depends on the order database to know what was ordered. The shipping system depends on the order database to know what to ship and where. If any one of these fails, the whole system breaks down.',
          },
          {
            type: 'text',
            text: 'Organized means the components are arranged in a structured way, not randomly. There’s a logic to how they connect and interact. Some components process information, some store it, some communicate it. The organization reflects the system’s purpose and the way it’s designed to work.',
          },
          {
            type: 'text',
            text: 'Accomplish a specific purpose means the system exists for a reason, It’s designed to do something; process orders, manage inventory, schedule appointments, control traffic flow, or any of thousands of other functions. This purpose is fundamental. It’s what determines which components belong in the system and how they should be organized. A system without a clear objective is bound to fail.',
          },
          {
            type: 'text',
            text: 'Interdependent means the components rely on each other. They’re not independent pieces that happen to sit next to each other. Remove one component, and the others can’t function properly. In the e-commerce example, the website is just a collection of stuff.',
          },
          {
            type: 'text',
            text: 'Notice what this definition doesn’t include. It doesn’t say the system has to be technical. A system can be entirely manual; a library’s card catalog system, a hospital’s patient intake process, a restaurant’s reservation system. It can be partially automated; a manufacturing plant with both machines and human workers. It can be entirely digital; a cloud-based software application. The definition applies to all of them.',
          },
          {
            type: 'text',
            text: 'Also notice that a system is a conceptual entity. When we talk about "the order fulfillment system" at an e-commerce company, we’re not talking about a physical thing you can point to. We’re talking about the collection of processes, technologies, and people that a works together to fulfill orders. The system is the whole, not the parts.',
          },
          {
            type: 'text',
            text: 'This distinction is crucial because it means that analyzing and designing a system requires thinking holistically. You can’t just optimize one component without considering how that optimization affects the other components. You can’t implement new technology without understanding how it will integrate with existing processes and people. You can’t solve a problem in one part of the system without understanding how that solution might create problems elsewhere.',
          },
          {
            type: 'text',
            heading: '1.2.2 The Essential Characteristics of Systems',
            text: 'All systems, regardless of their type or purpose, share certain characteristics. Understanding these characteristics is essential because they determine how systems behave, how they fail, and how they need to be managed. Figure 1.1 shows some elements that a system possesses.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/elements-of-a-system.png',
            width: 1322, height: 509,
            caption: 'Figure 1.1: The elements of a System',
          },
          {
            type: 'text',
            heading: '1.2.3 Purpose and Goals',
            text: 'Every system exists for a reason. That reason might be explicit; a manufacturing system exists to produce goods or implicitly; a family system exists to provide support and nurture its members. Without a clear purpose, you can’t evaluate whether the system is working well. You can’t make decisions about what components to include or how to organize them. Many organizational problems arise because people haven’t clearly defined the system’s purpose. Is the customer service system designed to minimize costs, maximize customer satisfaction, or both? The answer determines how you design it. Different purposes lead to different designs.',
          },
          {
            type: 'text',
            heading: '1.2.4 Inputs and Outputs',
            text: 'Every system receives inputs from its environment, processes those inputs, and produces outputs. A manufacturing system receives raw materials as input and produces finished goods as output. A customer service system receives customer inquiries as input and produces resolutions and customer satisfaction as output. An information system receives data as input and produces information, decisions, or actions as output. Understanding a system’s inputs and outputs is essential because it helps you understand the system’s purpose and how to evaluate whether it’s working well. If a system isn’t producing the desired outputs, the problem might be with the inputs (garbage in, garbage out), with the processing (the system is transforming inputs incorrectly), or with the outputs (the system is producing the right things but in the wrong format or at the wrong time).',
          },
          {
            type: 'text',
            heading: '1.2.5 Boundaries',
            text: 'Every system has boundaries that define what’s inside the system and what’s outside. These boundaries can be physical, for example, the walls of a warehouse define the boundary of the warehouse system. They can be conceptual, for example, the customer service system includes customer interactions, ticket management, and resolution processes, but not product development. Boundaries matter because they determine what will be your responsibility and what is not. They determine what you need to manage and what you can assume is stable. A system’s boundary is often where problems occur, because that’s where your system interacts with other systems. If your order system’s boundary includes payment processing, you need to ensure that integration works. If payment processing is outside your boundary, you need to understand the interface between your system and the payment processor.',
          },
          {
            type: 'text',
            heading: '1.2.6 Feedback and Control',
            text: 'Systems need mechanisms to monitor their performance and adjust their behavior. These mechanisms are called feedback loops. A thermostat is a simple example. It monitors temperature (feedback), compares it to the desired temperature (control), and adjusts heating or cooling to maintain the target. In an organization, feedback might come from customer satisfaction surveys, sales metrics, quality measurements, or employee feedback. The organization uses this feedback to adjust its processes and strategies. Without feedback mechanisms, systems can’t learn or adapt. They just keep doing what they’ve always done, even if it’s no longer working.',
          },
          {
            type: 'text',
            heading: '1.2.7 Components and Relationships',
            text: 'A system consists of multiple components, and those components have relationships with each other. In an information system, components might include hardware, software, databases, networks, and people. The relationships define how components interact. One component produces output that becomes input for another component. One component depends on another for data or services. When you’re analyzing or designing a system, you need to understand not just what components exist, but how they relate to each other. The relationship between components is often more important than the components themselves. Two systems might have similar components but very different relationships, leading to very different behaviors.',
          },
          {
            type: 'text',
            heading: '1.2.8 Interdependence',
            text: 'The components of a system are interdependent, meaning they rely on each other and influence each other. This interdependence is what makes something a system rather than just a collection of independent pieces. In an interdependent system, you can’t change one component without affecting others. This is why systems thinking is so important. If you optimize one component without considering the rest of the system, you might make the overall system worse, A classic example is inventory management. If you optimize the warehouse system to minimize storage costs, you might reduce inventory levels. But if that leads to frequent stockouts, the sales system suffers, and overall profitability declines. The components are interdependent, so you need to optimize the whole system, not individual parts.',
          },
          {
            type: 'text',
            heading: '1.2.9 Hierarchy and Decomposition',
            text: 'Systems are often organized hierarchically. A large system can be decomposed into smaller subsystems, which can be further decomposed into even smaller components. A manufacturing company’s overall system includes a production system, a supply chain system, a quality control system, and a distribution system. The production system includes machine operations, worker coordination, and material handling. This hierarchical structure is useful because it lets you analyze and manage systems at different levels of detail. When you’re designing the overall manufacturing system, you don’t need to worry about the details of how individual machines work. But when you’re designing the machine operation subsystem, you need that level of detail.',
          },
          {
            type: 'text',
            heading: '1.3 Defining Systems Analysis and Design',
            text: 'Systems analysis and design, as a discipline, is the integrated practice of analyzing problems, understanding requirements, and designing solutions. It’s the process of taking a complex, often poorly understood problem and transforming it into a clear specification and a well-designed solution. It combines investigation and creativity, analysis and synthesis, understanding and innovation.',
          },
          {
            type: 'text',
            text: 'The relationship between analysis and design is sequential but iterative. You do analysis first to understand the problem. You then do design based on that understanding. But as you design, you often discover that your analysis was incomplete or incorrect, so you go back and do more analysis. This cycle continues until you have both a clear understanding of the problem and a solid design for the solution.',
          },
          {
            type: 'text',
            heading: '1.3.1 The Importance of Systems Analysis and Design',
            text: 'Why does systems analysis and design matter? Why should you care about these disciplines? The answer is that systems analysis and design are fundamental to success in the modern world. The importance are as follows:',
          },
          {
            type: 'text',
            heading: '1.3.2 Preventing Costly Mistakes',
            text: 'The most obvious reason to do systems analysis and design is to prevent mistakes. Building a system without proper analysis and design is like building a house without blueprints. You might end up with something that looks okay on the surface, but it has structural problems that will cause failures later. The cost of fixing mistakes after a system is built is exponentially higher than preventing them through proper analysis and design. A study by the National Institute of Standards and Technology (NIST) found that design flaws account for nearly 30% of the cost of software development. Proper analysis and design can catch many of these flaws before any code is written.',
          },
          {
            type: 'text',
            heading: '1.3.3 Aligning with Business Goals',
            text: 'Systems exist to serve business purposes. If a system doesn’t align with business goals, it’s a waste of resources. Systems analysis ensures that you understand what the business actually needs, not what you think it needs or what seems technically interesting. Systems design ensures that the solution you build actually addresses those business needs. Many failed technology projects fail because they solved the wrong problem. They were technically sound but didn’t address the real business need. Proper analysis and design prevent this disconnect.',
          },
          {
            type: 'text',
            heading: '1.3.4 Managing Complexity',
            text: 'Modern systems are complex. They involve multiple technologies, multiple teams, multiple stakeholders, and multiple dependencies. Without a systematic approach to analyzing and designing these systems, the complexity becomes overwhelming. Systems analysis provides a structured way to break down complexity into manageable pieces. Systems design provides a way to organize those pieces so they work together coherently. Both disciplines provide tools and techniques for managing complexity.',
          },
          {
            type: 'text',
            heading: '1.3.5 Enabling Communication',
            text: 'When you analyze a system, you create documentation that describes the system’s requirements, constraints, and specifications. When you design a system, you create blueprints that describe the architecture and technical details. This documentation serves as a common language that different stakeholders can use to communicate. Developers can understand what needs to be built. Managers can understand the timeline and resource requirements. Customers can understand what they’re getting. Without this documentation, different people have different understandings of what’s being built, leading to misalignment and disappointment.',
          },
          {
            type: 'text',
            heading: '1.3.6 Facilitating Change',
            text: 'Systems change. Business requirements change, technology evolves, customer needs shift. A system that’s well-analyzed and well-designed is easier to change than one that isn’t. Why? Because the analysis documents the rationale behind design decisions, making it clear why things are the way they are. The design documentation describes how components interact, making it clear what will be affected by changes. When you need to modify the system, you can do so with confidence that you understand the implications, A poorly analyzed and designed system is fragile, that is, change one thing, and unexpected things break elsewhere.',
          },
          {
            type: 'text',
            heading: '1.3.7 Supporting Scalability',
            text: 'As organizations grow and systems become more important, systems need to scale. A system designed for 100 users might not work for 10,000 users. A system designed for one location might not work across multiple locations. Systems analysis and design for scalability means thinking about growth from the beginning. It means designing data structures that can handle growth, choosing technologies that scale, and creating architectures that can be extended. Trying to add scalability after the fact is much harder and more expensive than building it in from the start.',
          },
          {
            type: 'text',
            heading: '1.3.8 Ensuring Quality',
            text: 'A quality system is one that meets requirements, is reliable, performs well, is secure, and is maintainable, Systems analysis and design are essential for ensuring quality. Analysis ensures that you understand what quality means for your specific system. Design ensures that quality is built in, not added later. Quality can’t be tested in; it must be designed in. A system that’s poorly designed will never be truly reliable or maintainable, no matter how much testing you do.',
          },
          {
            type: 'text',
            heading: '1.3.9 Reducing Risk',
            text: 'Every system project involves risk. There’s the risk that you’ll build the wrong thing. There’s the risk that the system will be late or over budget. There’s the risk that the system will fail when it’s deployed. There’s the risk that the system will be insecure or unreliable. Systems analysis and design are risk management activities. They help you identify risks early, when they’re easier and cheaper to address. They help you make informed decisions about how to mitigate risks. They help you create contingency plans for things that might go wrong.',
          },
          {
            type: 'text',
            heading: '1.4 Types of Systems',
            text: 'Systems come in many varieties, and categorizing them helps us understand their characteristics and challenges. Here are the main ways systems are classified.',
          },
          {
            type: 'text',
            heading: '1.4.1 Open vs. Closed Systems',
            text: 'A closed system has minimal interaction with its environment. It’s self-contained and doesn’t exchange much with the outside world. In reality, truly closed systems are rare. A closed system might exist in a laboratory or a controlled manufacturing environment. An open system interacts extensively with its environment. It receives inputs from the environment, produces outputs for the environment, and is influenced by environmental changes. Most real-world systems are open. A business is an open system because it interacts with customers, suppliers, competitors, and regulators. An open system is more complex to analyze and design because you need to understand not just the system itself, but also the environment it operates in and how environmental changes affect the system.',
          },
          {
            type: 'text',
            heading: '1.4.2 Technical vs. Organizational Systems',
            text: 'A technical system is one where the primary components are machines, equipment, or software. An automated manufacturing line is a technical system. A software application is a technical system. An organizational system is one where the primary components are people, processes, and structures. A sales organization, a government agency, and a university are organizational systems. Most real-world systems are hybrid, that is, they combine technical and organizational elements. A hospital has medical equipment (technical), but it also has doctors, nurses, administrators, and procedures (organizational). An effective analysis and design process considers both elements.',
          },
          {
            type: 'text',
            heading: '1.4.3 Static vs. Dynamic Systems',
            text: 'A static system is relatively stable and doesn’t change much over time. A dynamic system is constantly changing and evolving. Most modern systems are dynamic. Customer preferences change, technology evolves, regulations shift, and competitive landscapes transform. A system designed for a static environment will fail in a dynamic one. This is why flexibility and adaptability are so important in modern system design. You need to design systems that can evolve and respond to change, not systems that are optimized for a specific, unchanging situation.',
          },
          {
            type: 'text',
            heading: '1.4.4 Deterministic vs. Probabilistic Systems',
            text: 'A deterministic system produces predictable outputs given specific inputs. If you give it the same inputs, you’ll always get the same outputs. A simple manufacturing process might be deterministic; feed in the same raw materials and settings, and you’ll get the same product. A probabilistic system produces outputs that vary even with the same inputs. There’s randomness or uncertainty involved. A customer service system is probabilistic, that is, you can’t predict exactly how long it will take to resolve each ticket, even if the tickets are similar. Understanding whether a system is deterministic or probabilistic affects how you design it and how you measure its performance.',
          },
          {
            type: 'text',
            heading: '1.5 Information Systems',
            text: 'An information system is a specific type of system designed to collect, process, store, and distribute information to support decision-making and organizational operations. It is an interconnected set of information resources to manage data for a particular organization, under direct management control. It includes hardware, software, communication, data and applications for producing information according to the need of an organization. This system is directly dependent on the computer for managing business applications. E.g. Airline seat reservation systems, banking system, Learning management systems, etc.',
          },
          {
            type: 'text',
            heading: '1.5.1 Components of an Information System',
            text: 'An information system is composed of five main components working together: hardware, software, data, people, and processes. Understanding each component and how they interact is essential for analyzing and designing effective information systems. This is shown in Figure 1.2.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/components-of-information-system.png',
            width: 1430, height: 662,
            caption: 'Figure 1.2: The components of an Information System (Adapted from Rosenblatt, 2017)',
          },
          {
            type: 'text',
            heading: '1.5.1.1 Hardware',
            text: 'Hardware is the physical equipment that comprises the system. This includes computers, servers, storage devices, networking equipment, printers, and any other physical devices. Hardware provides the platform on which software runs and data is stored. When designing an information system, hardware decisions affect performance, reliability, scalability, and cost. Should you use on-premise servers or cloud infrastructure? How much processing power and storage capacity do you need? What about redundancy and backup systems? These are hardware design questions that significantly impact the system’s effectiveness.',
          },
          {
            type: 'text',
            heading: '1.5.1.2 Software',
            text: 'Software consists of the programs and applications that run on the hardware and perform the actual work of the system. Software includes operating systems, databases, business applications, and custom-developed code. Software is where the logic of the system lives—the rules, algorithms, and processes that transform inputs into outputs. Software design is about creating efficient, reliable, maintainable code that implements the system’s logic correctly. Poor software design leads to bugs, performance problems, and systems that are hard to modify and maintain.',
          },
          {
            type: 'text',
            heading: '1.5.1.3 Data',
            text: 'Data is the information that the system collects, stores, processes, and produces. Data includes customer information, transaction records, inventory levels, financial data, and any other information relevant to the system’s purpose. Data is often the most valuable component of an information system. A company’s customer database, for example, represents years of accumulated knowledge about customers. Data design is about deciding what data to collect, how to organize it, how to ensure its quality and accuracy, and how to protect it from unauthorized access or loss. Poor data design leads to data quality problems, security vulnerabilities, and difficulty extracting useful information from the system.',
          },
          {
            type: 'text',
            heading: '1.5.1.4 Processes',
            text: 'Processes are the procedures and workflows that people follow when using the system. Processes define how data flows through the system, how decisions are made, how exceptions are handled, and how work gets done. Processes are often overlooked in system design, but they’re critical. A system is only as good as the processes that govern its use. If your processes are inefficient, outdated, or poorly designed, the system won’t perform well, even if the hardware, software, and data are excellent. Process design is about creating workflows that are efficient, clear, and aligned with the system’s purpose.',
          },
          {
            type: 'text',
            heading: '1.5.1.5 People',
            text: 'People who have an interest in an information system are called stakeholders and they include; the management group responsible for the system, the users inside and outside the organization who will interact with the system, IT staff members such as systems analysts, programmers and network administrators who develop and support the system. People design the system, build it, operate it, maintain it, and use it. People are often the most unpredictable component of an information system. They make mistakes, they resist change, they have different skill levels, and they have needs and preferences that must be considered. A beautifully designed system that people don’t understand or don’t want to use will fail. Effective system design includes consideration of the people who will interact with it, their skills, their needs, their workflows, and their resistance points.',
          },
          {
            type: 'text',
            text: 'These five components are interdependent. You can’t design hardware without considering what software will run on it. You can’t design software without understanding what data it will process. You can’t design data structures without understanding what processes will use the data. You can’t design processes without considering the people who will follow them. Effective information system design integrates all five components into a coherent whole.',
          },
          {
            type: 'text',
            heading: '1.5.2 Modern Information Systems',
            text: 'Information systems today are built around the business of the organization. To design a successful system, a systems analyst must understand the organizations business operations. Each situation is different, for example a retail store, a medical practice, a university system, a hotel chain; these all have unique information systems requirements. With the changing dynamics in the business world, systems analyst are expected to work in new kinds of organizations that will require innovative IT solutions. Businesses today are shaped by three major trends; rapidly increasing globalization, technology integration for seamless information access across a wide variety of devices such as laptops and smartphones, and the rapid growth of cloud based computing and software services. These trend are driven by the intense power of the internet. Internet-based systems involve various hardware and software designs, but a typical model is a series of Web pages that provides a user interface, which communicates with database management software and a Web-based data server. Internet-based commerce or e-commerce (electronic commerce) is an example and it consists of the following information system:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Business to Consumer (B2C)', def: 'a computerized system that facilitates the exchange of products, services, and information directly between businesses and individual consumers through the internet.' },
              { term: 'Business to Business (B2B)', def: 'a computerized information system that supports the exchange of information, products, services, and transactions between business organizations through the internet to improve operational efficiency and collaboration.' },
            ],
          },
          {
            type: 'text',
            heading: '1.5.3 Levels of Information',
            text: 'Information systems that relate to the levels of an organization include: 1. Operational Information 2. Managerial or Supervisory Information 3. Strategic information. Figure 1.3 shows the information levels and the roles.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/levels-of-information.png',
            width: 1488, height: 562,
            caption: 'Figure 1.3: The 3 categories of Information and the decisions managers make (Dennis, Wixom and Roth, 2015)',
          },
          {
            type: 'text',
            heading: '1.5.3.1 Operational Information',
            text: 'This type of information is required by low level management for daily and short term planning to enforce day-to-day operational activities. Operational users are the clerical, operational and administrative people who handle the most day-to-day contact with the system. At this level information processing systems will perform keeping employee attendance records, overdue purchase orders, current inventory of goods available, daily revenues or payments received, invoices, etc.',
          },
          {
            type: 'text',
            heading: '1.5.3.2 Managerial or Supervisory Information',
            text: 'This type of information is required by middle level management for short and intermediate range planning which is in terms of months. E.g. Sales analysis, cash flow projections, annual financial statements. This is achieved with the aid of a management information system (MIS).',
          },
          {
            type: 'text',
            heading: '1.5.3.3 Strategic Information',
            text: 'These are information required by top management for long term planning policies for the next few years. E.g. Trends in revenues, financial investments, human resources and population growth. This type of information is achieved with the aid of decision support systems (DSS).',
          },
          {
            type: 'text',
            heading: '1.6 The System Analyst',
            text: 'The system analyst is the person whose work is central to the whole system development. It is the systems analyst job to do the actual work of gathering the necessary data and developing plan for new systems. The system analyst:',
          },
          {
            type: 'bullets',
            items: [
              'Analyzing the business situation in the organization',
              'Identify solution for improvements',
              'Model the analysis finding toward the improvement',
            ],
          },
          {
            type: 'text',
            heading: '1.6.1 The Systems Analyst Responsibilities',
            text: 'The Systems analyst role in developing information systems is multifaceted because they are many people to be satisfied and many conflicts to be resolved. The system analysts interact with many groups of people and they include:',
          },
          {
            type: 'bullets',
            items: [
              'Customers/clients',
              'Technical people (network admins, programmers, etc.)',
              'Business people (steering committee, stakeholders)',
              'Vendors and consultants',
            ],
          },
          {
            type: 'text',
            text: 'The systems analyst plays a key role in information systems development projects and so must possess the following skills:',
          },
          {
            type: 'bullets',
            items: [
              'He must be business-oriented',
              'Must be knowledgeable in technical skills',
              'He works closely with all project team members so that the team develops the right system in an effective way.',
              'He must be able to analyze the business situation in the organization.',
              'He must identify solutions for improvements and',
              'Model the analysis findings toward the improvement',
            ],
          },
          {
            type: 'text',
            text: 'In this context, the system analyst takes many roles, such as:',
          },
          {
            type: 'bullets',
            items: [
              'Business analyst focusing on the business issues surrounding the system',
              'Requirement analyst focusing on eliciting the requirements from stakeholders associated with the new system',
              'Infrastructure analyst focusing on technical issues surrounding the ways the system will interact with the organization’s technical infrastructure (hardware, software, networks, and databases).',
              'Software architect focuses on the holistic view of the organization’s entire IT environment and guides application design decisions within that context',
              'Change management analyst focuses on the people and management issues surrounding the system installation.',
              'Project manager, a seasoned systems analyst whose role is to ensure that the project is completed on time and within budget and that the system delivers the expected value to the organization.',
            ],
          },
          {
            type: 'text',
            text: 'The roles and names used vary from organization to organization. These roles are depicted graphically in Figure 1.4.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/roles-of-a-systems-analyst.png',
            width: 1149, height: 597,
            caption: 'Figure 1.4: The roles of a systems analyst',
          },
          {
            type: 'bullets',
            heading: 'Revision Questions',
            items: [
              'Define a system. Explain any four characteristics of a system with relevant examples.',
              'Differentiate between Systems Analysis and Systems Design. Highlight at least four differences between the two concepts.',
              'Describe the components of a system. Explain the roles of input, process, output, feedback, and control in an information system.',
              'A university intends to develop a new student registration system. What is an information system?',
              'List five responsibilities of a systems analyst.',
              'What is meant by system boundary?',
              'Discuss the importance of systems analysis and design in the successful development of information systems.',
              'Describe the different types of information systems and their applications in modern organizations.',
              'Explain the concepts of open systems and closed systems with examples.',
            ],
          },
        ],
      },
      {
        number: '2',
        title: 'Feasibility Study in Systems Analysis and Design',
        sections: [
          {
            type: 'text',
            heading: '2.0 Introduction to Feasibility Studies',
            text: 'Before any information system is built or upgraded, an organization must determine whether it is worthwhile to proceed. This determination is made through a feasibility study. This is a preliminary investigation conducted early in the systems development life cycle to assess whether a proposed system is achievable, practical, and justified.',
          },
          {
            type: 'text',
            text: 'A feasibility study is not the same as a full system analysis. Its goal is not to design the system, but to decide whether the project should move forward at all. It answers the fundamental question: "Should we develop this system?"',
          },
          {
            type: 'text',
            text: 'A feasibility study is a formal evaluation of a proposed project that examines whether the solution is technically possible, economically justified, operationally viable, legally compliant, and achievable within a desired timeframe. Feasibility studies are typically conducted by a systems analyst in collaboration with project stakeholders. The output is a feasibility report that either recommends proceeding, modifying, or abandoning the proposed project.',
          },
          {
            type: 'text',
            heading: '2.1 Problem Identification',
            text: 'Problem identification is the first and arguably most critical step in any feasibility study. It involves recognizing that a problem exists, understanding its nature, and clearly defining what the system is expected to address. Without accurate problem identification, any proposed solution, no matter how technically elegant, risks solving the wrong problem.',
          },
          {
            type: 'text',
            text: 'A problem in systems analysis refers to any gap between the current state of a system and the desired state. This gap may manifest as:',
          },
          {
            type: 'bullets',
            items: [
              'Inefficiency in business processes (e.g., slow order processing)',
              'Inaccurate or inaccessible information (e.g., outdated inventory records)',
              'High operational costs due to manual effort',
              'Failure to meet regulatory or compliance requirements',
              'Poor user satisfaction with an existing system',
            ],
          },
          {
            type: 'text',
            heading: '2.1.1 The Problem Statement',
            text: 'Once a problem is recognized, analysts formulate a problem statement, which is a concise, unambiguous description of the issue. A well-written problem statement typically covers:',
          },
          {
            type: 'bullets',
            items: [
              'What the problem is',
              'Where it occurs (department, process, or system)',
              'Who is affected',
              'When it occurs (frequency, duration)',
              'Why it matters (impact on the organization)',
            ],
          },
          {
            type: 'text',
            text: 'Example: The accounts department manually reconciles purchase orders and invoices using spreadsheets, a process that takes three working days per month, is prone to human error, and has led to overpayments totaling ₦4.2 million in the last fiscal year.',
          },
          {
            type: 'text',
            heading: '2.1.2 Causes vs. Symptoms',
            text: 'A common pitfall in problem identification is confusing symptoms with root causes. Symptoms are observable effects of an underlying problem; root causes are the actual sources of dysfunction.',
          },
          {
            type: 'table',
            headers: ['Symptom', 'Possible Root Cause'],
            rows: [
              ['Customers complain about long wait times', 'Inefficient manual data entry process'],
              ['Reports are frequently inaccurate', 'Lack of data validation in the system'],
              ['Staff work overtime consistently', 'Inadequate system automation'],
              ['Duplicate records in the database', 'Absence of unique key constraints'],
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/symptoms-vs-root-causes.png',
            width: 3120, height: 584,
            caption: 'Figure 1: Symptoms vs. Possible Root Causes',
          },
          {
            type: 'text',
            text: 'Analysts use techniques such as the 5 Whys and cause-and-effect (fishbone) diagrams to trace symptoms back to their root causes before defining the scope of a solution.',
          },
          {
            type: 'text',
            heading: '2.2 Fact-Finding Techniques',
            text: 'Once a problem has been identified, the analyst must gather detailed information about the current system, user requirements, and organizational constraints. This process is called fact-finding (also known as requirements elicitation or information gathering). The quality of the feasibility study depends heavily on the quality of the facts collected. The following are the major fact-finding techniques used in systems analysis.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/fact-finding-techniques-overview.png',
            width: 3120, height: 1532,
            caption: 'Figure 2: Overview of Fact-Finding Techniques',
          },
          {
            type: 'text',
            heading: '2.2.1 Interviews',
            text: 'Interviews involve direct, structured or semi-structured conversations between the analyst and key stakeholders — managers, end users, and technical staff. They are the most widely used fact-finding technique.',
          },
          {
            type: 'text',
            text: 'Types of interviews:',
          },
          {
            type: 'bullets',
            items: [
              'Structured interviews follow a predetermined set of questions, making responses easier to compare and analyze.',
              'Unstructured interviews are open-ended and exploratory, useful for discovering issues that a rigid format might miss.',
              'Semi-structured interviews combine both approaches.',
            ],
          },
          {
            type: 'proscons',
            advantages: ['Rich, detailed information', 'Opportunity to probe deeper', 'Builds rapport with users'],
            disadvantages: ['Time-consuming; subject to interviewer bias', 'Interviewees may be reluctant to reveal problems'],
          },
          {
            type: 'text',
            heading: '2.2.2 Questionnaires and Surveys',
            text: 'Questionnaires involve distributing a set of written questions to a large group of users or stakeholders. They are particularly useful when the analyst needs to gather information from many people across different locations.',
          },
          {
            type: 'proscons',
            advantages: ['Can reach a large audience quickly', 'Responses are easy to quantify', 'It is less intimidating for respondents'],
            disadvantages: ['Low response rates; ambiguous questions can lead to misleading data', 'No opportunity for follow-up'],
          },
          {
            type: 'text',
            heading: '2.2.3 Observation',
            text: 'The analyst directly observes workers performing their tasks in their natural work environment. This technique is especially valuable for understanding workflow, identifying bottlenecks, and verifying information gathered from interviews or questionnaires.',
          },
          {
            type: 'proscons',
            advantages: ['Reveals what actually happens, not just what people say happens', 'Identifies inefficiencies that users may not articulate'],
            disadvantages: ['Workers may alter their behaviour when observed (the Hawthorne effect)', 'Time-consuming', 'Observer may misinterpret activities'],
          },
          {
            type: 'text',
            heading: '2.2.4 Document Review',
            text: 'Analysts examine existing documents such as organizational charts, procedure manuals, forms, reports, previous system documentation, and data flow diagrams. This technique provides historical context and helps validate information gathered through other methods.',
          },
          {
            type: 'proscons',
            advantages: ['Documents already exist', 'Provides a baseline understanding of current processes'],
            disadvantages: ['Documents may be outdated or incomplete', 'Does not capture informal processes or workarounds'],
          },
          {
            type: 'text',
            heading: '2.2.5 Joint Application Development (JAD)',
            text: 'JAD sessions bring together users, managers, and IT professionals in structured group workshops facilitated by an analyst. The goal is to reach consensus on system requirements in an interactive setting.',
          },
          {
            type: 'proscons',
            advantages: ['Encourages collaboration', 'Reduces time for requirements gathering', 'Discovers conflicting requirements early'],
            disadvantages: ['Requires skilled facilitation', 'Scheduling group sessions can be difficult', 'Dominant participants may overshadow others'],
          },
          {
            type: 'text',
            heading: '2.2.6 Prototyping',
            text: 'A simple model or prototype of part of the proposed system is built and shown to users to elicit feedback. This is particularly useful when users have difficulty articulating requirements abstractly.',
          },
          {
            type: 'proscons',
            advantages: ['Makes requirements tangible', 'Discovers misunderstandings early', 'Increases user engagement'],
            disadvantages: ['Users may confuse the prototype with the final system', 'It can lead to scope creep'],
          },
          {
            type: 'text',
            heading: '2.3 Types of Feasibility',
            text: 'After gathering facts, the analyst evaluates the proposed system across five dimensions of feasibility. Each addresses a different set of risks and constraints.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/five-dimensions-of-feasibility.png',
            width: 3120, height: 856,
            caption: 'Figure 3: Five Dimensions of Feasibility',
          },
          {
            type: 'text',
            heading: '2.3.1 Technical Feasibility',
            text: 'Technical feasibility assesses whether the organization has, or can acquire the technology, hardware, software, and technical expertise needed to build and operate the proposed system. Key questions include:',
          },
          {
            type: 'bullets',
            items: [
              'Does the required technology exist and is it mature enough for production use?',
              'Can the current IT infrastructure support the new system, or will significant upgrades be necessary?',
              'Does the organization have staff with the technical skills to develop, implement, and maintain the system?',
              'Can the system meet the required performance criteria (e.g., response time, throughput, storage)?',
              'Can the system be integrated with existing systems?',
            ],
          },
          {
            type: 'text',
            text: 'Example: A hospital proposing to implement a real-time patient monitoring system must assess whether its network bandwidth and server capacity can support continuous data streams from hundreds of devices simultaneously. If the required technology does not exist or the cost of acquiring it is prohibitive, the project may be technically infeasible in its current form.',
          },
          {
            type: 'text',
            heading: '2.3.2 Economic Feasibility',
            text: 'Economic feasibility (also called cost-benefit analysis) determines whether the financial benefits of the proposed system justify its costs. It is arguably the most influential type of feasibility, as it directly affects the decision to fund a project.',
          },
          {
            type: 'text',
            text: 'Costs to consider:',
          },
          {
            type: 'table',
            headers: ['Category', 'Examples'],
            rows: [
              ['Development costs', 'Software, hardware, labour, consultancy fees'],
              ['Implementation costs', 'Data migration, installation, user training'],
              ['Operational costs', 'Maintenance, licensing, support, running costs'],
              ['Intangible costs', 'Staff disruption, productivity loss during transition'],
            ],
          },
          {
            type: 'text',
            text: 'Benefits to consider:',
          },
          {
            type: 'table',
            headers: ['Category', 'Examples'],
            rows: [
              ['Tangible benefits', 'Reduced labour costs, increased sales, faster processing'],
              ['Intangible benefits', 'Improved customer satisfaction, better decision-making'],
            ],
          },
          {
            type: 'text',
            text: 'Common economic analysis tools:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Break-Even Analysis', def: 'Determines when cumulative benefits equal cumulative costs.' },
              { term: 'Return on Investment (ROI)', def: 'Measures the financial return relative to the cost of investment.' },
              { term: 'Net Present Value (NPV)', def: 'Accounts for the time value of money when comparing future benefits against current costs.' },
              { term: 'Payback Period', def: 'Estimates how long before the investment is recovered.' },
            ],
          },
          {
            type: 'text',
            text: 'Example: If a new procurement system costs ₦10 million to develop and will save ₦3.5 million annually in administrative costs, the payback period is approximately 2.9 years. If this is acceptable to management, the project is economically feasible.',
          },
          {
            type: 'text',
            heading: '2.3.3 Operational Feasibility',
            text: 'Operational feasibility assesses whether the proposed system will work effectively within the organization’s existing environment, including its people, processes, and culture. A system that is technically brilliant and economically sound may still fail if users refuse to adopt it or if it disrupts critical operations. Key questions include:',
          },
          {
            type: 'bullets',
            items: [
              'Will end users accept the new system, or is there likely to be resistance to change?',
              'Does the system align with the organization’s goals, policies, and culture?',
              'Will the system improve current workflows or introduce unnecessary complexity?',
              'Is the organization prepared to manage the transition (change management)?',
              'Does the system meet the needs of all stakeholders (managers, users, customers)?',
            ],
          },
          {
            type: 'text',
            text: 'Factors affecting operational feasibility:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'User acceptance', def: 'The degree to which users willingly adopt and correctly use the system.' },
              { term: 'Management support', def: 'Projects without visible leadership endorsement often fail at the implementation stage.' },
              { term: 'Training requirements', def: 'Complex systems require substantial training investment.' },
              { term: 'Impact on jobs', def: 'Systems that threaten job security or significantly change job roles may face strong resistance.' },
            ],
          },
          {
            type: 'text',
            text: 'Example: An automated payroll system may be technically and economically feasible, but if the HR department is unwilling to change established manual practices and fears job losses, operational feasibility is low unless change management strategies are put in place.',
          },
          {
            type: 'text',
            heading: '2.3.4 Legal Feasibility',
            text: 'Legal feasibility examines whether the proposed system complies with all applicable laws, regulations, contractual obligations, and ethical standards. Ignoring legal constraints can expose the organization to litigation, regulatory sanctions, and reputational damage. Areas of legal concern include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Data protection and privacy laws', def: 'Systems that store or process personal data must comply with relevant legislation (e.g., Nigeria Data Protection Act 2023, GDPR for European-facing systems).' },
              { term: 'Intellectual property', def: 'Software components, databases, or algorithms used in the system must be properly licensed.' },
              { term: 'Industry-specific regulations', def: 'Financial systems must comply with banking regulations; healthcare systems must meet patient confidentiality standards.' },
              { term: 'Contract obligations', def: 'Existing vendor contracts may restrict the ability to switch platforms or integrate third-party tools.' },
              { term: 'Employment law', def: 'Systems that monitor employee activity (e.g., keystroke logging) may face legal scrutiny.' },
            ],
          },
          {
            type: 'text',
            text: 'Example: A Fintech startup proposing a mobile lending platform must ensure the system complies with Central Bank regulations on interest rate disclosure, anti-money laundering (AML) requirements, and data residency laws. If a proposed system cannot be made legally compliant without fundamentally redesigning it, the project may need to be restructured or abandoned.',
          },
          {
            type: 'text',
            heading: '2.3.5 Schedule Feasibility',
            text: 'Schedule feasibility determines whether the project can be completed within the required or desired timeframe. Even a technically sound, cost-effective, operationally accepted, and legally compliant system is problematic if it cannot be delivered when needed. Key questions include:',
          },
          {
            type: 'bullets',
            items: [
              'Is the proposed timeline realistic given the scope and complexity of the project?',
              'Are the required human resources available within the project window?',
              'Are there external deadlines (e.g., regulatory compliance dates, product launches) that constrain the schedule?',
              'What is the risk of schedule overrun, and what is its impact?',
            ],
          },
          {
            type: 'text',
            text: 'Common scheduling tools:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Gantt Charts', def: 'Bar charts that map tasks against a timeline, showing start and end dates and task dependencies.' },
              { term: 'PERT (Programme Evaluation and Review Technique)', def: 'Analyses task durations probabilistically to estimate overall project duration.' },
              { term: 'Critical Path Method (CPM)', def: 'Identifies the longest sequence of dependent tasks that determines the minimum project duration.' },
            ],
          },
          {
            type: 'text',
            text: 'Factors that threaten schedule feasibility:',
          },
          {
            type: 'bullets',
            items: [
              'Poorly defined scope (scope creep)',
              'Underestimation of task complexity',
              'Unavailability of key personnel or specialist skills',
              'Dependencies on external vendors or third-party systems',
              'Inadequate risk planning',
            ],
          },
          {
            type: 'text',
            text: 'Example: A university proposing to replace its student information system before the start of the next academic session must determine whether development, testing, data migration, and staff training can all be completed within that window. If the timeline is too compressed, the project’s schedule feasibility is in question.',
          },
          {
            type: 'text',
            heading: '2.4 The Interrelationship Among Feasibility Types',
            text: 'The five types of feasibility are not independent; they interact and influence one another. A weakness in one dimension can undermine feasibility across others. Consider the following interactions:',
          },
          {
            type: 'bullets',
            items: [
              'A technically complex solution may increase cost (economic) and time (schedule).',
              'A legally non-compliant design may require redesign, affecting technical and schedule feasibility.',
              'A system that ignores operational concerns (user resistance) may never realise its economic benefits even after deployment.',
              'Cutting costs may involve using unproven technologies, reducing technical feasibility.',
            ],
          },
          {
            type: 'text',
            text: 'A comprehensive feasibility study must therefore evaluate all five dimensions collectively and present an integrated conclusion, not isolated verdicts.',
          },
          {
            type: 'text',
            heading: '2.5 The Feasibility Report',
            text: 'The output of a feasibility study is a feasibility report submitted to decision-makers (typically a steering committee or senior management). The report typically includes:',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/feasibility-report-components.png',
            width: 3120, height: 252,
            caption: 'Figure 4: Components of a Feasibility Report',
          },
          {
            type: 'bullets',
            items: [
              'Executive summary',
              'Problem statement and objectives',
              'Description of proposed solutions (alternatives considered)',
              'Assessment of each feasibility type',
              'Recommended course of action',
              'Risks and mitigation strategies',
              'Preliminary project plan and cost estimates',
            ],
          },
          {
            type: 'text',
            text: 'The report does not design the system; it evaluates whether design should begin.',
          },
          {
            type: 'bullets',
            heading: 'Review Questions',
            items: [
              'Distinguish between a symptom and a root cause in the context of problem identification. Provide an original example.',
              'Compare and contrast interviews and questionnaires as fact-finding techniques. Under what circumstances would each be preferred?',
              'A retail company plans to implement an AI-powered stock management system. Conduct a brief feasibility analysis across all five dimensions, identifying at least one concern per dimension.',
              'Why is operational feasibility often considered the most frequently underestimated dimension in practice?',
              'Explain how a weakness in schedule feasibility can affect economic feasibility.',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'The Software Development Life Cycle (SDLC)',
        sections: [
          {
            type: 'text',
            heading: '3.0 Introduction',
            text: 'The systems life cycle is a structured step-by-step approach to the development of complex systems. It is an organisational process of developing and maintaining systems. It helps in establishing a system project plan because it gives overall list of processes and sub processes required in developing a system. In systems analysis and design terminology, the system development life cycle (SDLC) means software development life cycle. It is an organized set of activities that guides those involved through the development of an information system and to maintain and monitor ongoing activities. These activities are grouped into phases.',
          },
          {
            type: 'text',
            text: 'Understanding the SDLC is foundational to any study of systems analysis and design as well as software engineering. It provides a common vocabulary, a shared framework, and a disciplined approach that transforms abstract user needs into working, maintainable software products.',
          },
          {
            type: 'text',
            heading: '3.1 Definition of SDLC',
            text: 'The Software Development Life Cycle (SDLC) is a structured, systematic process used by software engineers and project teams to plan, create, test, deploy, and maintain software systems. It defines a series of well-defined phases, each with specific activities, deliverables, and roles, that collectively guide a software project from initial conception through to retirement.',
          },
          {
            type: 'text',
            text: 'The term life cycle is deliberate: it conveys the idea that software, like a living organism, has a lifespan. It is born (planned and built), matures (deployed and used), ages (maintained and updated), and eventually retires (replaced or decommissioned).',
          },
          {
            type: 'text',
            heading: '3.2 Why the SDLC Matters',
            text: 'Without a structured life cycle, software development risks becoming chaotic; teams may build the wrong thing, exceed budgets, miss deadlines, or deliver systems riddled with defects. The SDLC addresses these risks by:',
          },
          {
            type: 'bullets',
            items: [
              'Providing clarity of purpose at each stage of development.',
              'Enabling project management through defined milestones and deliverables.',
              'Facilitating communication among stakeholders, developers, testers, and clients.',
              'Supporting quality assurance by embedding testing and review at multiple points.',
              'Creating a traceable record of decisions and design choices.',
            ],
          },
          {
            type: 'text',
            heading: '3.3 Historical Context',
            text: 'Early software development in the 1950s and 1960s was largely ad hoc; programmers wrote code according to personal preference with little formal methodology. As software systems grew in complexity and the costs of failure escalated, the need for a principled engineering approach became evident. This gave rise to formal software engineering practices and, by the 1970s, the articulation of structured life cycle models such as the Waterfall Model by Winston Royce (1970). Since then, numerous SDLC models have been developed; Iterative, Spiral, and Agile approaches, each adapting the core phases to different project needs and team cultures.',
          },
          {
            type: 'text',
            heading: '3.4 SDLC Models vs. SDLC Phases',
            text: 'It is important to distinguish between SDLC phases and SDLC models: SDLC phases are the fundamental activities that must occur in any software project (planning, analysis, design, etc.), while SDLC models (Waterfall, Agile, Spiral, etc.) determine how and in what order those phases are executed.',
          },
          {
            type: 'text',
            heading: '3.5 Phases of the SDLC',
            text: 'The classical SDLC consists of seven major phases, each building upon the last: as shown in Figure 3.1.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/sdlc-seven-phases.png',
            width: 2385, height: 584,
            caption: 'Figure 3.1: The Seven Phases of the Software Development Life Cycle',
          },
          {
            type: 'text',
            heading: '3.5.1 Phase 1: Planning',
            text: 'Planning is the foundation upon which the entire project rests. Before a single line of code is written and before any technical work begins, the project stakeholders must answer a fundamental question: Is this project worth doing, and can we do it successfully?',
          },
          {
            type: 'text',
            heading: '3.5.1.1 Feasibility Study',
            text: 'The team evaluates the project across several dimensions:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Technical feasibility', def: 'Does the required technology exist? Does the team have the skills?' },
              { term: 'Economic feasibility', def: 'Will the benefits justify the costs? What is the expected return on investment (ROI)?' },
              { term: 'Operational feasibility', def: 'Will the intended users accept and use the system?' },
              { term: 'Legal/ethical feasibility', def: 'Are there regulatory or ethical constraints?' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.1.2 Project Scope Definition',
            text: 'The scope defines what the system will and will not do. A clear scope prevents scope creep, that is, the gradual, uncontrolled expansion of project requirements that frequently leads to delays and cost overruns.',
          },
          {
            type: 'text',
            heading: '3.5.1.3 Resource and Schedule Planning',
            text: 'Project managers identify the personnel, hardware, software tools, and budget required. A project schedule (often visualised using Gantt charts or network diagrams) establishes timelines and milestones.',
          },
          {
            type: 'text',
            heading: '3.5.1.4 Risk Assessment',
            text: 'Potential risks which include; technical, financial and personnel-related risks are identified and mitigation strategies are planned.',
          },
          {
            type: 'text',
            heading: '3.5.1.5 Deliverables',
            text: 'The deliverables in this phase include:',
          },
          {
            type: 'bullets',
            items: [
              'Project charter or proposal',
              'Feasibility report',
              'Preliminary project plan and schedule',
              'Risk register',
            ],
          },
          {
            type: 'text',
            text: 'This phase essentially answers the question "Should we build this?" before the analysis phase asks "What should we build?"',
          },
          {
            type: 'text',
            heading: '3.5.2 Phase 2: Analysis (Requirements Analysis)',
            text: 'Once a project is approved for development, the team turns its attention to a deep understanding of what the system must accomplish. The analysis phase is concerned with gathering, documenting, and validating requirements, the detailed descriptions of what the software must do. Getting requirements right is arguably the most critical activity in software development. Research consistently shows that errors introduced during requirements analysis are the most expensive to correct, as they propagate through all subsequent phases.',
          },
          {
            type: 'text',
            heading: '3.5.2.1 Types of Requirements',
            text: 'Requirements are typically classified into two categories:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Functional Requirements', def: 'This is what the system does, its behaviours, features, and functions. For example, "The system shall allow users to reset their password via email."' },
              { term: 'Non-Functional Requirements', def: 'Non-functional requirements encompass performance, security, reliability, scalability, usability, and maintainability, among others. This tells how well the system performs, using quality attributes. For example, "The system shall respond to any user request within 2 seconds under normal load."' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.2.2 Requirements Gathering Techniques',
            text: 'A systems analyst uses a variety of methods to elicit requirements from stakeholders:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Interviews', def: 'One-on-one discussions with users, managers, or domain experts.' },
              { term: 'Surveys and questionnaires', def: 'Useful when stakeholders are numerous or geographically dispersed.' },
              { term: 'Observation (ethnographic study)', def: 'Watching users perform their current tasks to understand workflows and pain points.' },
              { term: 'Workshops and focus groups', def: 'Bringing multiple stakeholders together to collaboratively define needs.' },
              { term: 'Prototyping', def: 'Creating a rough, early model of the system to help stakeholders articulate their needs more concretely.' },
              { term: 'Document analysis', def: 'Reviewing existing forms, reports, and system documentation.' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.2.3 Requirements Documentation',
            text: 'Gathered requirements are recorded in a Software Requirements Specification (SRS) — a formal document that serves as a contract between the development team and the client. The SRS should be clear, complete, consistent, and verifiable. Requirements that are vague, contradictory, or incomplete are a leading cause of software project failure. Analysts must rigorously validate requirements with stakeholders before proceeding.',
          },
          {
            type: 'bullets',
            heading: '3.5.2.4 Deliverables',
            items: [
              'Software Requirements Specification (SRS)',
              'Use case diagrams and descriptions',
              'Data flow diagrams (context level)',
              'Approval/sign-off from stakeholders',
            ],
          },
          {
            type: 'text',
            heading: '3.5.3 Phase 3: Design',
            text: 'With a clear understanding of what the system must do, the design phase addresses how it will be done. Design translates requirements into a blueprint for construction. Just as an architect produces detailed plans before builders break ground, software designers produce detailed technical specifications before programmers write code. Design decisions made in this phase have long-lasting consequences for the system’s quality, performance, and maintainability.',
          },
          {
            type: 'text',
            heading: '3.5.3.1 Levels of Design',
            text: 'Design typically proceeds at two levels:',
          },
          {
            type: 'text',
            heading: 'High-Level Design (Architectural Design)',
            text: 'This concerns the overall structure of the system:',
          },
          {
            type: 'bullets',
            items: [
              'Decomposition into subsystems or modules',
              'Selection of architectural patterns (e.g., client-server, microservices, layered architecture)',
              'Definition of interfaces between major components',
              'Technology stack decisions (programming language, database system, frameworks)',
            ],
          },
          {
            type: 'text',
            heading: 'Low-Level Design (Detailed Design)',
            text: 'This concerns the internal logic of individual components:',
          },
          {
            type: 'bullets',
            items: [
              'Data structures and algorithms',
              'Database schema design (entity-relationship diagrams, normalisation)',
              'User interface wireframes and screen layouts',
              'Detailed class diagrams, sequence diagrams, and state diagrams (in object-oriented design)',
              'Data dictionary',
            ],
          },
          {
            type: 'text',
            heading: '3.5.3.2 Design Principles',
            text: 'Good software design adheres to principles that promote quality:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Modularity', def: 'Dividing the system into discrete, cohesive components.' },
              { term: 'Abstraction', def: 'Hiding implementation details and exposing only necessary interfaces.' },
              { term: 'Separation of concerns', def: 'Ensuring each module has a single, well-defined responsibility.' },
              { term: 'Coupling and cohesion', def: 'Minimising dependencies between modules (low coupling) while maximising the relatedness of elements within a module (high cohesion).' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.3.3 Deliverables',
            text: 'This phase delivers the following:',
          },
          {
            type: 'bullets',
            items: [
              'System architecture document',
              'Database design (ER diagrams, schema)',
              'UI/UX wireframes and prototypes',
              'Detailed design specifications (class diagrams, sequence diagrams)',
              'Data dictionary',
            ],
          },
          {
            type: 'text',
            text: 'The design phase produces a logical and physical blueprint. The logical design describes what components exist and how they relate; the physical design specifies how those components will be implemented in concrete technology.',
          },
          {
            type: 'text',
            heading: '3.5.4 Phase 4 - Implementation (Coding)',
            text: 'Implementation is often called the coding or development phase — it is where the design blueprint is translated into actual, executable software. Programmers write source code according to the specifications produced in the design phase, using chosen programming languages, frameworks, and development tools.',
          },
          {
            type: 'text',
            text: 'While implementation is often the phase most visibly associated with "software development" in popular imagination, it is worth noting that, in well-managed projects, it should be the most straightforward phase, provided that planning, analysis, and design have been carried out rigorously.',
          },
          {
            type: 'text',
            heading: '3.5.4.1.1 Coding',
            text: 'Developers implement individual modules, components, and features. Good code is not merely functional; it is also readable, maintainable, and efficient.',
          },
          {
            type: 'text',
            heading: '3.5.4.1.2 Version Control',
            text: 'Source code is managed using version control systems (e.g., Git) that track changes, enable collaboration, and allow rollback to previous versions if needed.',
          },
          {
            type: 'text',
            heading: '3.5.4.1.3 Code Reviews',
            text: 'Peer review of code improves quality by catching defects early and sharing knowledge among team members.',
          },
          {
            type: 'text',
            heading: '3.5.4.1.4 Unit Testing',
            text: 'Developers write and run unit tests. Automated tests that verify the correctness of individual functions or modules in isolation. Though testing has its own dedicated phase, unit testing is an integral part of the coding process.',
          },
          {
            type: 'text',
            heading: '3.5.4.1.5 Integration',
            text: 'As individual components are completed, they are progressively integrated. Continuous Integration (CI) practices automate this process, building and testing the code base automatically whenever new code is committed.',
          },
          {
            type: 'text',
            heading: '3.5.4.1.6 Coding Standards',
            text: 'Development teams typically adopt coding standards, agreed-upon conventions for naming, formatting, commenting, and structuring code. Standards improve readability and reduce the cognitive load on developers who must later maintain or extend the system.',
          },
          {
            type: 'bullets',
            heading: '3.5.4.2 Deliverables',
            items: [
              'Source code (properly versioned and documented)',
              'Unit test cases and results',
              'Build/executable files',
              'Technical documentation (inline comments, API documentation)',
            ],
          },
          {
            type: 'text',
            text: 'In iterative and Agile models, implementation happens in short cycles called sprints or iterations, each producing a small, working increment of the software rather than attempting to build the entire system at once.',
          },
          {
            type: 'text',
            heading: '3.5.5 Phase 5: Testing',
            text: 'Testing is the systematic process of evaluating software to detect defects, verify that it meets its requirements, and validate that it satisfies user expectations. No matter how skilled the development team, software of any significant complexity will contain defects. Testing makes those defects visible so they can be corrected before the software reaches users. A fundamental principle of software testing, articulated by Edsger Dijkstra, is that "testing can show the presence of bugs, but not their absence." Testing reduces risk; it cannot guarantee perfection.',
          },
          {
            type: 'text',
            heading: '3.5.5.1 Levels of Testing',
            text: 'Testing is conducted at multiple levels, each with a different scope and objective:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Unit Testing', def: 'Individual functions or methods tested by the developer' },
              { term: 'Integration Testing', def: 'Interactions between combined modules tested by the developer or Tester' },
              { term: 'System Testing', def: 'A complete, integrated system test. Performed by Quality Assurance Team' },
              { term: 'Acceptance Testing', def: 'A conformance test performed by a user, client or end user that is matched with the business requirements for consistency' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.5.2 Types of Testing',
            text: 'Beyond these levels, testing can be categorised by approach:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Functional testing', def: 'Verifies that features behave as specified (black-box testing).' },
              { term: 'Non-functional testing', def: 'Evaluates performance (load testing, stress testing), security (penetration testing), usability, and reliability.' },
              { term: 'Regression testing', def: 'Re-runs existing tests after changes to ensure that new code has not broken previously working functionality.' },
              { term: 'Alpha testing', def: 'Conducted by internal users within the development organization.' },
              { term: 'Beta testing', def: 'Conducted by a selected group of external users in a real-world environment before general release.' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.5.3 The Testing Process',
            text: 'Testing follows a structured process:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Test planning', def: 'Define test objectives, scope, and approach.' },
              { term: 'Test case design', def: 'Write specific test cases — each specifying input data, execution conditions, and expected outcomes.' },
              { term: 'Test environment setup', def: 'Prepare the hardware, software, and data needed to run tests.' },
              { term: 'Test execution', def: 'Run the tests and record actual outcomes.' },
              { term: 'Defect reporting and tracking', def: 'Log defects found, assign them for resolution, and track their status.' },
              { term: 'Test closure', def: 'Evaluate test completion criteria and produce a test summary report.' },
            ],
          },
          {
            type: 'bullets',
            heading: '3.5.5.4 Deliverables',
            items: [
              'Test plan',
              'Test cases and test data',
              'Defect/bug reports',
              'Test summary report',
            ],
          },
          {
            type: 'text',
            text: 'The cost of fixing a defect increases dramatically the later it is discovered. A defect found and fixed during unit testing costs a fraction of what it costs to fix the same defect discovered in production after deployment.',
          },
          {
            type: 'text',
            heading: '3.5.6 Phase 6: Deployment',
            text: 'Deployment is the phase in which the tested, approved software is released to its intended users and made operational in the production environment. It marks the transition from development to live use, but it is far more than simply "switching the system on." Careful planning is required to ensure a smooth, disruption-free rollout.',
          },
          {
            type: 'text',
            heading: '3.5.6.1 Deployment Strategies',
            text: 'Several strategies exist for deploying software, each with different risk profiles:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Big Bang (Direct Cutover)', def: 'The old system is switched off and the new system is switched on simultaneously. Simple to execute but high-risk; if problems arise, there is no fallback.' },
              { term: 'Phased Deployment (Incremental Rollout)', def: 'The new system is deployed to a subset of users or locations first, then gradually rolled out more broadly. Allows issues to be caught and resolved at small scale.' },
              { term: 'Parallel Running', def: 'Both the old and new systems run simultaneously for a period. Outputs are compared to verify correctness. Expensive but provides the highest safety net.' },
              { term: 'Pilot Deployment', def: 'A complete deployment to a single representative site or user group before organisation-wide rollout.' },
              { term: 'Blue-Green Deployment', def: 'Two identical production environments are maintained; the new version is deployed to the "green" environment while the "blue" environment continues serving users. Traffic is switched once the new version is validated.' },
              { term: 'Canary Release', def: 'A small percentage of users are routed to the new version initially, with the proportion gradually increased as confidence grows.' },
            ],
          },
          {
            type: 'termlist',
            heading: '3.5.6.2 Deployment Activities',
            items: [
              { term: 'Environment preparation', def: 'Configuring servers, databases, and network infrastructure to host the new system.' },
              { term: 'Data migration', def: 'Transferring data from legacy systems into the new system’s data stores, including data cleansing and transformation.' },
              { term: 'User training', def: 'Ensuring that end users understand how to use the new system effectively.' },
              { term: 'Documentation delivery', def: 'Providing user manuals, help guides, and system documentation.' },
              { term: 'Go-live support', def: 'Having technical staff on standby during and immediately after deployment to resolve any issues rapidly.' },
            ],
          },
          {
            type: 'bullets',
            heading: '3.5.6.3 Deliverables',
            items: [
              'Deployed and operational system',
              'Deployment plan and runbook',
              'User training materials and user manuals',
              'System administration guide',
              'Post-deployment review report',
            ],
          },
          {
            type: 'text',
            text: 'Deployment is not the end of the project — it is the beginning of the system’s operational life. The maintenance phase begins as soon as the system enters production.',
          },
          {
            type: 'text',
            heading: '3.5.7 Phase 7: Maintenance',
            text: 'Once deployed, software enters its longest phase: maintenance. Software maintenance encompasses all activities that occur after initial deployment to keep the system operational, relevant, and aligned with evolving user needs and technological environments. In practice, organisations typically spend more money maintaining existing software than developing new systems. Understanding maintenance is therefore essential for any practitioner.',
          },
          {
            type: 'text',
            heading: '3.5.7.1 Categories of Maintenance',
            text: 'Software maintenance is classified into four types, as defined by the IEEE standard:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Corrective Maintenance', def: 'Fixing defects discovered after deployment. For example, patching a bug that causes incorrect tax calculations.' },
              { term: 'Adaptive Maintenance', def: 'Modifying the system to work in a changed environment. For example, updating the software to run on a new operating system version.' },
              { term: 'Perfective Maintenance', def: 'Enhancing or extending the system’s functionality. For example, adding a new report type requested by users.' },
              { term: 'Preventive Maintenance', def: 'Making changes to improve maintainability and prevent future problems. For example refactoring code to reduce technical debt.' },
            ],
          },
          {
            type: 'text',
            text: 'Studies show that perfective maintenance (adding and enhancing features) accounts for the largest proportion of maintenance effort, typically around 50–60%, thus reflecting the reality that user needs continually evolve.',
          },
          {
            type: 'text',
            heading: '3.5.7.2 Challenges of Maintenance',
            text: 'Maintenance presents several distinctive challenges:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Understanding legacy code', def: 'Developers must comprehend code they did not write, often with inadequate documentation.' },
              { term: 'Regression risk', def: 'Changes made to fix one defect or add one feature may inadvertently break other parts of the system.' },
              { term: 'Technical debt', def: 'Accumulated shortcuts and poor design decisions from earlier phases make the system progressively harder to change.' },
              { term: 'Configuration management', def: 'Tracking multiple versions of the system across different client installations or deployment environments.' },
            ],
          },
          {
            type: 'text',
            heading: '3.5.7.3 Software Retirement',
            text: 'Eventually, a system reaches a point where maintenance costs outweigh benefits, or where the underlying technology is so outdated that continued maintenance is no longer feasible. At this point, the system is retired, either replaced by a new system (triggering a fresh SDLC) or simply decommissioned.',
          },
          {
            type: 'bullets',
            heading: '3.5.7.4 Deliverables',
            items: [
              'Patch and update releases',
              'Updated documentation',
              'Change request logs',
              'Maintenance records',
              'System retirement plan (when applicable)',
            ],
          },
          {
            type: 'text',
            heading: '3.6 SDLC Models',
            text: 'The phases described earlier are the building blocks of all SDLC models. The major models differ in how they sequence and iterate those phases, for example:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Waterfall', def: 'This is a sequential method, where each phase is completed before the next begins. It is well-defined, has stable requirements and is used for safety critical problems.' },
              { term: 'Iterative models', def: 'Here the phases are repeated in cycles, with each cycle returning the product to earlier stages as requirements evolve incrementally.' },
              { term: 'Spiral model', def: 'They are iterative with explicit risk assessment at each cycle. They fit large, high-risk projects.' },
              { term: 'Agile model', def: 'They are highly iterative; using short sprints; continuous collaboration with stakeholders. They fit projects with rapidly changing requirements; user-facing products.' },
              { term: 'DevOps', def: 'Encompassing continuous integration and delivery. They blur the development/deployment boundary. They fit projects requiring frequent releases and high operational reliability.' },
            ],
          },
          {
            type: 'text',
            text: 'No single model is universally superior. The appropriate choice depends on the nature of the project, the stability of requirements, the size of the team, and the risk tolerance of the organization.',
          },
          {
            type: 'text',
            heading: '3.7 Summary',
            text: 'The Software Development Life Cycle provides a disciplined framework for producing software that is correct, reliable, maintainable, and aligned with user needs. Its seven phases: Planning, Analysis, Design, Implementation, Testing, Deployment, and Maintenance, represent distinct but interconnected stages of work, each with defined inputs, activities, and outputs.',
          },
          {
            type: 'text',
            text: 'Key takeaways from this chapter:',
          },
          {
            type: 'bullets',
            items: [
              'The SDLC ensures software development is purposeful, structured, and quality-oriented rather than ad hoc.',
              'Requirements errors are the most costly and should be caught as early as possible.',
              'Design decisions have lasting consequences for software quality and maintainability.',
              'Testing is a risk-reduction activity, not a guarantee of perfection.',
              'Deployment requires careful strategy to minimise disruption.',
              'Maintenance typically consumes the majority of a system’s total lifetime cost.',
              'Different SDLC models adapt the core phases to different project contexts.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Review Questions',
            items: [
              'Define the Software Development Life Cycle (SDLC) and explain why a structured approach to software development is necessary.',
              'Distinguish between functional and non-functional requirements. Give two examples of each for a university course registration system.',
              'What is the difference between high-level design and low-level design? Illustrate your answer with examples.',
              'Describe four types of software testing. For each type, state its purpose and indicate at what stage of the SDLC it is primarily conducted.',
              'Compare and contrast the "big bang" and "phased" deployment strategies. Under what circumstances would each be appropriate?',
              'Using the four-category classification of software maintenance (corrective, adaptive, perfective, preventive), classify each of the following maintenance activities: a. Fixing a login bug reported by users after the system went live. b. Updating the system to support a newly mandated file format. c. Adding a dashboard feature requested in a post-launch user survey. d. Rewriting poorly structured code to improve future changeability.',
              'Explain why the maintenance phase is considered the longest and often most costly phase of the SDLC.',
            ],
          },
        ],
      },
      {
        number: '4',
        title: 'Software Development Life Cycle Models — Overview',
        sections: [
          {
            type: 'text',
            heading: '4.0 Introduction',
            text: 'The Software Development Life Cycle (SDLC) is a structured process that guides the planning, creation, testing, and deployment of software systems. A model is a conceptual framework that defines the sequence and structure of activities developers follow to build software. Choosing the right SDLC model is one of the most consequential decisions a software team can make, as it shapes team roles, documentation practices, risk exposure, and ultimately the quality of the product delivered.',
          },
          {
            type: 'text',
            text: 'Each model reflects a different philosophy about how software should be built: whether requirements can be frozen upfront, how to handle uncertainty, when to involve customers, and how to respond to change. Understanding the strengths and weaknesses of each model equips a software engineer with the judgment to select or adapt the right approach for any given project context. SDLC models include:',
          },
          {
            type: 'bullets',
            items: [
              'Waterfall model',
              'V-Model',
              'Iterative model',
              'Incremental process model',
              'Evolutionary Process Model (Prototyping model and Spiral model)',
              'Agile model',
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'The Waterfall Model',
        sections: [
          {
            type: 'text',
            heading: '4.1 The Waterfall Model',
            text: 'The Waterfall model is the oldest and most straightforward SDLC model. Proposed by Winston W. Royce in 1970, it organizes software development into a linear sequence of phases, where each phase must be fully completed before the next begins, like water flowing down a cascade of steps.',
          },
          {
            type: 'text',
            text: 'The classic Waterfall model comprises the following sequential phases shown in Figure 4.1:',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/waterfall-model.png',
            width: 1190, height: 800,
            caption: 'Figure 4.1: Waterfall model',
          },
          {
            type: 'text',
            heading: '4.1.1 Requirements Analysis',
            text: 'All functional and non-functional requirements are gathered and documented comprehensively in a Software Requirements Specification (SRS) document. The aim of this phase is to understand the exact requirements of the customer and to document them properly. They discuss the functions, performance and interfacing requirements of the software. The software requirement specification (SRS) is created in this phase. It contains a detailed description of what the system will do in a common language. SRS document serves as a contract between the development team and the customer.',
          },
          {
            type: 'text',
            heading: '4.1.2 System Design',
            text: 'The architecture, data structures, interfaces, and algorithms are designed based on the requirements. All gathered requirements are converted into a suitable design. We define the overall software architecture together with high level and detailed designs. High level designs include; Algorithms, Flowcharts, Decision trees, Database design, etc. Low level design include rough paper designs or sketches, user interface components, etc. All finished designs are documented, programming languages required for coding, database or other hardware requirements are finalized. All this work is documented as a software design document (SDD).',
          },
          {
            type: 'text',
            heading: '4.1.3 Development or Implementation (Coding)',
            text: 'Developers write the actual source code according to the design documents. In this phase software design is translated into source codes using the specified programming languages. The developer first develops small programs called unit after that they are integrated. Unit testing is done in this phase to check whether each module is working properly or not.',
          },
          {
            type: 'text',
            heading: '4.1.4 Testing',
            text: 'In this phase individual modules are integrated and the entire system is tested for defects. The tester perform all the testing activities to make sure that the system meets the client requirement or not. After combining all unit modules, integration testing is done for any faults and failures. In case of any anomaly, it is reported. This phase generates test cases and test reports.',
          },
          {
            type: 'text',
            heading: '4.1.5 Deployment',
            text: 'The verified software is released to the production environment. The product is developed in the customer or user environment or released into the market.',
          },
          {
            type: 'text',
            heading: '4.1.6 Maintenance',
            text: 'In the maintenance phase, there are some issues that may come up in the client environment. To fix these issues patches are released. Bug fixes, patches, and minor enhancements are made after deployment. Also, to enhance the product, some better version are released. Maintenance is done to deliver these changes in the customer environment.',
          },
          {
            type: 'text',
            text: 'Process Flow: Requirements → Design → Implementation → Testing → Deployment → Maintenance',
          },
          {
            type: 'bullets',
            heading: '4.1.7 Key Characteristics',
            items: [
              'Sequential and rigid: Progress flows strictly in one direction.',
              'Documentation-heavy: Each phase produces formal deliverables before the next can begin.',
              'No customer involvement after requirements: The client is engaged at the start and at delivery.',
              'Late testing: Errors are often discovered only after the system is built.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.1.8 Advantages',
            items: [
              'Simple to understand and manage due to its clear structure.',
              'Works well when requirements are well-understood, stable, and unlikely to change.',
              'Produces extensive documentation, which is useful for knowledge transfer and maintenance.',
              'Easy to estimate time and cost at the outset.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.1.9 Disadvantages',
            items: [
              'Very inflexible; accommodating changes mid-project is costly and disruptive.',
              'Customer sees the working product only at the very end, increasing the risk of misalignment.',
              'Defects discovered late (during testing) are expensive to fix.',
              'Not suitable for complex or long-duration projects where requirements evolve.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.1.10 When to Use Waterfall Model',
            items: [
              'Short, well-defined projects with stable requirements (e.g., government contracts with fixed specs).',
              'Projects where the technology is mature and well-understood.',
              'Environments where formal documentation and regulatory compliance are mandatory.',
            ],
          },
        ],
      },
      {
        number: '6',
        title: 'The V-Model',
        sections: [
          {
            type: 'text',
            heading: '4.2 V-Model',
            text: 'The V-model means Verification and Validation model. Just like the waterfall model, the V-shaped life cycle is a sequential path of execution of processes. Each phase must be completed before the next phase begins. Testing of the product is planned in parallel with a corresponding phase of development in V-model as shown in Figure 4.2. The phases of the V-model include:',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/v-model-lifecycle.png',
            width: 1580, height: 1200,
            caption: 'Figure 4.2: The V-model life cycle',
          },
          {
            type: 'text',
            heading: '4.2.1 Requirements',
            text: 'Business requirement specification (BRS) and SRS begin the life cycle model just like the waterfall model. But, in this model before development is started, a system test plan is created. The test plan focuses on meeting the functionality specified in the requirements gathering.',
          },
          {
            type: 'text',
            heading: '4.2.2 The high-level design (HLD) phase',
            text: 'This phase focuses on system architecture and design. It provides overview of solution, platform, system, product and service/process. An integration test plan is created in this phase as well in order to test the pieces of the software systems ability to work together.',
          },
          {
            type: 'text',
            heading: '4.2.3 The low-level design (LLD) phase',
            text: 'This is where the actual software components are designed. It defines the actual logic for each and every component of the system. Class diagrams with all the methods and relation between classes comes under LLD. Component tests are created in this phase as well.',
          },
          {
            type: 'text',
            heading: '4.2.4 The Implementation phase',
            text: 'This is where all coding takes place. Once coding is complete, the path of execution continues up the right side of the V where the test plans developed earlier are now put to use.',
          },
          {
            type: 'text',
            heading: '4.2.5 Coding',
            text: 'This is at the bottom of the V-Shape model. Module design is converted into code by the developers.',
          },
          {
            type: 'bullets',
            heading: '4.2.6 Advantages',
            items: [
              'Simple and easy to use.',
              'Testing activities like planning, test designing happens well before coding. This saves a lot of time. Hence higher chance of success over the waterfall model.',
              'Proactive defect tracking, that is, defects are found at early stage.',
              'Avoids the downward flow of the defects.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.2.7 Disadvantages',
            items: [
              'Very rigid and least flexible.',
              'Software is developed during the implementation phase, so no early prototypes of the software are produced.',
              'If any changes happen in midway, then the test documents along with requirement documents has to be updated.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.2.8 When to Use V Model',
            items: [
              'Works well for small projects where requirements are easily understood.',
            ],
          },
        ],
      },
      {
        number: '7',
        title: 'Iterative Models',
        sections: [
          {
            type: 'text',
            heading: '4.3 Iterative Models',
            text: 'Iterative models begin with some requirements and analysis. It develops first version of the software. If they are any changes, a new version is created. Again, if they are further changes, yet another new version is created. These versions are called iterations. After the final version the product is deployed. Iterative models have the following phases as shown in Figure 4.3.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/iterative-sdlc-models.png',
            width: 1600, height: 730,
            caption: 'Figure 4.3: Iterative SDLC models',
          },
          {
            type: 'text',
            heading: '4.3.1 Requirement Gathering and Analysis Phase',
            text: 'The aim of this phase is to understand the exact requirement of the client. The system analyst analyses the requirement that whether the requirement can be fulfilled or not. If the client requirement can be fulfilled then whether these requirements are fulfilled within budget or out of the budget. If all is okay, then collected requirements are then planned accordingly for developing the system.',
          },
          {
            type: 'text',
            heading: '4.3.2 Design and Coding Phase',
            text: 'It designs the overall software architecture together with high level detailed designs. Designer designs the algorithm, data flow diagram, activity diagram, class diagram, state transition diagrams, sequence diagrams, database design, etc. These designs are translated into specific codes. Programmers use suitable programming languages, frameworks and databases.',
          },
          {
            type: 'text',
            heading: '4.3.3 Testing Phase',
            text: 'In this phase, the tester performs all the testing activities to make sure that the system meets the customer requirements or not. There are many test methods to adopt, but the most common are white box, black box and grey box testing methods.',
          },
          {
            type: 'text',
            heading: '4.3.4 Review Phase',
            text: 'The review phase is where the software is estimated and checked as per current requirements. Then, further requirements are reviewed, discussed and refined to propose for an update in the next iteration.',
          },
          {
            type: 'text',
            heading: '4.3.5 Deployment and Maintenance Phase',
            text: 'After completing the software product, it is deployed in the customer or client environment. After deployment of the software in the working environment, there may be some bugs, some errors or new updates are required that are solved in the maintenance phase.',
          },
          {
            type: 'bullets',
            heading: '4.3.6 When to Use Iterative models',
            items: [
              'When requirements are defined clearly and easy to understand.',
              'When there is a requirement of changes in future.',
              'When the software application is large.',
              'A new technology is being used and is being learnt by the development team while working on a project.',
              'There are some high risk features and goals which change in the future.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.3.7 Advantages',
            items: [
              'Testing and debugging during smaller iterations is easy.',
              'A parallel development can plan.',
              'It is easily acceptable to ever changing needs of the project.',
              'Risks are identified and resolved during the iteration.',
              'Limited time is spent on documentation and extra time is spent on design, testing and deployment.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.3.8 Disadvantages',
            items: [
              'It is not suitable for smaller projects.',
              'More resources may be required.',
              'Design can be changed again and again because of imperfect requirements.',
              'Requirements changes can cause over budget.',
              'Project completion date not confirmed because of changing requirements.',
            ],
          },
        ],
      },
      {
        number: '8',
        title: 'The Incremental Model',
        sections: [
          {
            type: 'text',
            heading: '4.4 Incremental Model',
            text: 'The Incremental model divides the software into a series of small, buildable units called increments. Each increment adds functionality to the previously delivered version. Rather than delivering the entire system at once, a working (partial) product is delivered at the end of each increment. The incremental process model has the following phases as shown in Figure 4.4.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/incremental-model-lifecycle.png',
            width: 1270, height: 720,
            caption: 'Figure 4.4: Incremental Model lifecycle',
          },
          {
            type: 'text',
            heading: '4.4.1 Requirement Gathering and Analysis',
            text: 'The business analyst, product manager collect all the functional and non-functional requirements of customers. The full set of requirements is divided into groups, each assigned to an increment or build. Build 1 produces a core version with essential functionality.',
          },
          {
            type: 'text',
            heading: '4.4.2 Design and Development Phase',
            text: 'In this phase the overall software architecture together with high level and detailed designs such as algorithms, DFD, activity diagram, class diagram, state transition diagram, database design, etc. are designed. The software design is translated into specific source code. Programmers use suitable programming languages, frameworks and databases.',
          },
          {
            type: 'text',
            heading: '4.4.3 Testing Phase',
            text: 'In this phase, the tester checks the performance of each existing function as well as additional functionality as per the customer requirement. There are many test methods, but the most common are white box, black box and grey box testing methods.',
          },
          {
            type: 'text',
            heading: '4.4.4 Implementation',
            text: 'The product is deployed after testing to the customer in increments. Subsequent increments (Build 2, Build 3) add features until the complete system is delivered. Each increment goes through its own mini-cycle: design & development (code) → test → implement/deliver.',
          },
          {
            type: 'bullets',
            heading: '4.4.5 Advantages',
            items: [
              'The customer receives a working product early, providing immediate value.',
              'Reduces the risk of complete project failure; earlier increments still have value.',
              'Easier to test and debug because each increment is smaller.',
              'Staff and resources can be deployed incrementally as needed.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.4.6 Disadvantages',
            items: [
              'Requires careful planning upfront to partition the system into meaningful increments.',
              'Integration of increments can be complex, especially with poor architectural design.',
              'Total cost may be higher than single delivery due to repeated integration and testing.',
              'Later increments may require changes to earlier ones if architecture is poorly designed.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.4.7 When to Use Incremental models',
            items: [
              'When an early working product is needed (e.g., to gain early market presence).',
              'When core functionality can be separated from secondary features.',
              'Medium to large projects where requirements are reasonably well-understood but not entirely fixed.',
            ],
          },
        ],
      },
      {
        number: '9',
        title: 'Evolutionary Process Models',
        sections: [
          {
            type: 'text',
            heading: '4.5 Evolutionary Process Models',
            text: 'Evolutionary process model is also referred to as the successive version model. It is a combination of iterative and incremental model: Iterative + incremental = Evolutionary.',
          },
          {
            type: 'text',
            text: 'In Evolutionary model, the software requirement is first broken down into several modules that can be incrementally constructed. This means, it take customer feedback of each module, it then delivers a product module by module to the customer. Figure 4.5 shows the flows in an evolutionary life cycle.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/evolutionary-lifecycle-model.png',
            width: 1670, height: 1050,
            caption: 'Figure 4.5: Evolutionary life cycle model and the workflows',
          },
          {
            type: 'text',
            text: 'Evolutionary models comprise of the following:',
          },
          {
            type: 'bullets',
            items: [
              'Spiral model',
              'Prototyping model',
            ],
          },
        ],
      },
      {
        number: '10',
        title: 'The Spiral Model',
        sections: [
          {
            type: 'text',
            heading: '4.6 The Spiral Model',
            text: 'The Spiral model was proposed by Barry Boehm in 1986. It combines the iterative nature of prototyping with the systematic control of the Waterfall model, with a strong emphasis on risk analysis. The process is visualized as a spiral, where each loop (or iteration) passes through a consistent set of activities. The phases in a spiral model are shown in Figure 4.6.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/spiral-lifecycle-model.png',
            width: 1570, height: 950,
            caption: 'Figure 4.6: The spiral life cycle model',
          },
          {
            type: 'text',
            heading: '4.6.1 Phases of Each Spiral Loop',
            text: 'Each cycle of the spiral consists of four quadrants:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Planning', def: 'Define objectives, alternatives, and constraints for this iteration.' },
              { term: 'Risk Analysis', def: 'Identify and evaluate risks; develop prototypes or simulations to address the most critical risks.' },
              { term: 'Engineering (Development and Testing)', def: 'Develop and verify the product for the current iteration.' },
              { term: 'Evaluation', def: 'Obtain customer feedback and plan the next iteration.' },
            ],
          },
          {
            type: 'text',
            text: 'Spiral Loop (each iteration): Planning → Risk Analysis → Engineering → Customer Evaluation → (next loop)',
          },
          {
            type: 'text',
            text: 'Each pass through the spiral advances the software toward greater completeness, starting from a concept, progressing to a prototype, then to a refined product.',
          },
          {
            type: 'termlist',
            heading: '4.6.2 Key Characteristics',
            items: [
              { term: 'Risk-driven', def: 'Every iteration begins with a formal risk assessment.' },
              { term: 'Iterative', def: 'The software evolves with each loop, incorporating customer feedback.' },
              { term: 'Flexible', def: 'Requirements can be added or revised between iterations.' },
              { term: 'Expensive upfront', def: 'Risk analysis and prototyping require specialist expertise.' },
            ],
          },
          {
            type: 'bullets',
            heading: '4.6.3 Advantages',
            items: [
              'Explicitly manages risk, making it suitable for high-risk or novel projects.',
              'Allows changes and refinements at each spiral loop.',
              'Customer involvement and feedback is built into every iteration.',
              'Produces prototypes that help in requirements clarification.',
              'Suitable for large-scale, complex, and long-duration projects.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.6.4 Disadvantages',
            items: [
              'Complex to manage; requires experienced risk analysts.',
              'Can be very costly due to frequent prototyping and risk evaluation.',
              'The number of iterations can be hard to predict, making scheduling difficult.',
              'Not suitable for small, low-risk, or low-budget projects.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.6.5 When to Use Spiral model',
            items: [
              'Large, high-risk software projects (e.g., aerospace, defence, mission-critical systems).',
              'Projects where requirements are unclear or likely to change significantly.',
              'Projects where early prototyping is needed to clarify user expectations.',
            ],
          },
        ],
      },
      {
        number: '11',
        title: 'The Prototyping Model',
        sections: [
          {
            type: 'text',
            heading: '4.7 The Prototyping Model',
            text: 'The Prototyping model involves building a preliminary version of the software, a prototype, to help stakeholders and developers clarify requirements before the final system is built. The prototype is a working model that simulates some aspects of the product but is not the final deliverable. The prototyping process is shown in Figure 4.7.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/prototyping-model.png',
            width: 1630, height: 1100,
            caption: 'Figure 4.7: The Prototyping model',
          },
          {
            type: 'termlist',
            heading: '4.7.1 Types of Prototyping',
            items: [
              { term: 'Throwaway (Rapid) Prototyping', def: 'The prototype is built quickly to elicit requirements, then discarded. The final system is built from scratch based on the insights gained.' },
              { term: 'Evolutionary Prototyping', def: 'The prototype is progressively refined and improved until it evolves into the final system.' },
              { term: 'Incremental Prototyping', def: 'Multiple prototypes are built for different subsystems and then integrated.' },
              { term: 'Extreme Prototyping', def: 'Used in web development; builds three layers (static, simulated services, real services) in sequence.' },
            ],
          },
          {
            type: 'termlist',
            heading: '4.7.2 Key Characteristics',
            items: [
              { term: 'Early customer involvement', def: 'The customer interacts with the prototype before committing to full development.' },
              { term: 'Requirements clarification', def: 'Reduces ambiguity by making ideas tangible.' },
              { term: 'Iterative', def: 'Multiple cycles of build → evaluate → refine.' },
              { term: 'Risk of scope creep', def: 'Continuous refinement can lead to an ever-expanding system.' },
            ],
          },
          {
            type: 'bullets',
            heading: '4.7.3 Advantages',
            items: [
              'Helps identify requirements that users could not articulate upfront.',
              'Reduces risk of misunderstanding between customers and developers.',
              'Enables early detection of design flaws and usability issues.',
              'Increases customer satisfaction by involving them actively.',
              'Useful for innovative or experimental systems.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.7.4 Disadvantages',
            items: [
              'Customers may mistake the prototype for a finished product, creating unrealistic expectations.',
              'Can lead to scope creep as customers keep requesting more features.',
              'Throwaway prototypes represent wasted development effort if not managed carefully.',
              'Documentation is often neglected during rapid prototyping.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.7.5 When to Use Prototyping',
            items: [
              'When requirements are vague, unclear, or likely to change.',
              'When building novel applications where there is no precedent.',
              'For user interface-heavy applications where look and feel must be validated early.',
              'When the customer is unsure of what they want until they can "see" something.',
            ],
          },
        ],
      },
      {
        number: '12',
        title: 'The Agile Model',
        sections: [
          {
            type: 'text',
            heading: '4.8 The Agile Model',
            text: 'The Agile model is a modern, iterative, and incremental approach to software development that prioritizes flexibility, collaboration, and delivering working software over comprehensive documentation. Agile emerged as a response to the rigidity and documentation-heaviness of traditional models like Waterfall.',
          },
          {
            type: 'text',
            heading: '4.8.1 Agile Manifesto',
            text: 'The Agile Manifesto (2001) established four core values:',
          },
          {
            type: 'bullets',
            items: [
              'Individuals and interactions over processes and tools',
              'Working software over comprehensive documentation',
              'Customer collaboration over contract negotiation',
              'Responding to change over following a plan',
            ],
          },
          {
            type: 'bullets',
            heading: '4.8.2 Key Principles of Agile',
            items: [
              'Deliver working software frequently (weeks, not months).',
              'Welcome changing requirements, even late in development.',
              'Business people and developers must work together daily.',
              'Build projects around motivated individuals and trust them.',
              'Sustainable development: teams should maintain a constant pace indefinitely.',
            ],
          },
          {
            type: 'text',
            heading: '4.8.3 How Agile Works (Scrum Framework)',
            text: 'Agile is a philosophy, not a single method. Popular frameworks include Scrum, Kanban, Extreme Programming (XP), and SAFe. Scrum is the most widely adopted as shown in Figure 4.8.',
          },
          {
            type: 'bullets',
            items: [
              'Work is divided into fixed-length iterations called Sprints (typically 1–4 weeks).',
              'The Product Backlog contains all desired features, prioritized by the Product Owner.',
              'At the start of each sprint, the team selects items for the Sprint Backlog.',
              'Daily stand-up meetings (Daily Scrum) keep the team aligned.',
              'At the end of each sprint, a working increment is demonstrated (Sprint Review).',
              'The team reflects on the process (Sprint Retrospective) and improves.',
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/agile-scrum-model.png',
            width: 1680, height: 950,
            caption: 'Figure 4.8: Agile–Scrum model',
          },
          {
            type: 'termlist',
            heading: '4.8.4 Key Characteristics',
            items: [
              { term: 'Iterative and incremental', def: 'Working software is delivered at the end of every sprint.' },
              { term: 'Customer collaboration', def: 'The Product Owner is continuously involved.' },
              { term: 'Self-organizing teams', def: 'Small (5–9 members), cross-functional, and empowered.' },
              { term: 'Adaptive', def: 'Requirements can change between sprints based on feedback.' },
              { term: 'Test-driven', def: 'Testing is embedded throughout each sprint, not a separate phase.' },
            ],
          },
          {
            type: 'bullets',
            heading: '4.8.5 Advantages',
            items: [
              'Highly responsive to changing requirements; ideal for dynamic environments.',
              'Continuous delivery of value through working software.',
              'Improved product quality due to frequent testing and review.',
              'Strong customer involvement reduces the risk of building the wrong product.',
              'High team morale through collaboration, transparency, and regular achievements.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.8.6 Disadvantages',
            items: [
              'Difficult to predict final cost and timeline upfront due to evolving scope.',
              'Requires a highly engaged and available customer/Product Owner.',
              'Not ideal for projects where requirements must be completely defined upfront.',
              'Documentation may be insufficient, creating challenges for maintenance.',
              'Scaling Agile to large teams or organizations is complex.',
            ],
          },
          {
            type: 'bullets',
            heading: '4.8.7 When to Use Agile Model',
            items: [
              'Startups and product companies building software in uncertain, competitive markets.',
              'Projects with rapidly changing or unclear requirements.',
              'Web and mobile application development.',
              'Teams with experienced, self-disciplined members.',
            ],
          },
        ],
      },
      {
        number: '13',
        title: 'Comparison of SDLC Models',
        sections: [
          {
            type: 'text',
            heading: '4.9 Comparison of SDLC Models',
            text: 'The table below summarizes the key distinguishing characteristics of all five models across critical dimensions.',
          },
          {
            type: 'table',
            headers: ['Criterion', 'Waterfall', 'Spiral', 'Incremental', 'Prototyping', 'Agile'],
            rows: [
              ['Approach', 'Linear, sequential', 'Iterative + risk-driven', 'Incremental delivery', 'Prototype-based iteration', 'Iterative, incremental'],
              ['Flexibility', 'Very low', 'Moderate', 'Moderate', 'Moderate to High', 'Very high'],
              ['Customer Involvement', 'Beginning and end only', 'Each iteration', 'After each increment', 'Throughout prototype cycles', 'Continuous (daily/weekly)'],
              ['Risk Management', 'Weak', 'Excellent (core focus)', 'Moderate', 'Moderate', 'Moderate (via sprints)'],
              ['Requirements', 'Must be fixed upfront', 'Can evolve per spiral', 'Partially fixed', 'Clarified via prototype', 'Continuously refined'],
              ['Delivery', 'Single, at the end', 'Multiple prototypes then final', 'Working product per increment', 'Prototype + final system', 'Working software every sprint'],
              ['Documentation', 'Heavy', 'Moderate to heavy', 'Moderate', 'Light', 'Light'],
              ['Project Size', 'Small to medium', 'Large, complex', 'Medium to large', 'Small to medium', 'Small to large'],
              ['Cost Predictability', 'High', 'Low to moderate', 'Moderate', 'Low', 'Low to moderate'],
              ['Best For', 'Stable, well-defined projects', 'High-risk, novel projects', 'Partial early delivery needed', 'Unclear requirements', 'Dynamic, fast-changing projects'],
            ],
          },
          {
            type: 'termlist',
            heading: '4.9.1 Key Observations',
            items: [
              { term: 'Requirements stability', def: 'Is the primary axis of differentiation. Waterfall demands stable requirements; Agile thrives on change. Spiral and Prototyping both tolerate unclear requirements but do so differently — Spiral manages risk formally, while Prototyping uses a working model to clarify it.' },
              { term: 'Customer involvement', def: 'Correlates with project success. Models with more frequent customer contact (Agile, Prototyping) generally produce systems that better meet actual user needs, but they require customers who are available and engaged.' },
              { term: 'Risk', def: 'Is handled most rigorously by the Spiral model, making it uniquely suited for high-stakes or technically novel projects. The other models handle risk implicitly or reactively.' },
              { term: 'Documentation', def: 'Is heaviest in Waterfall and lightest in Agile. Waterfall’s documentation aids long-term maintenance; Agile’s lighter documentation enables speed but can create challenges when team members leave.' },
              { term: 'Cost and schedule predictability', def: 'Is highest in Waterfall (when requirements are truly stable) and lowest in Agile. For organizations that must produce fixed-bid contracts or regulatory compliance documentation, Waterfall or Incremental may be preferable.' },
            ],
          },
          {
            type: 'text',
            heading: '4.9.2 Summary',
            text: 'No single SDLC model is universally superior. The choice depends on a careful analysis of the following factors:',
          },
          {
            type: 'bullets',
            items: [
              'Requirements clarity: Are they known, evolving, or unknown?',
              'Project size and complexity: Small internal tool vs. enterprise-level system?',
              'Risk tolerance: How critical is failure? What is the cost of defects?',
              'Customer availability: Can stakeholders be engaged continuously?',
              'Regulatory environment: Are formal documentation and traceability required?',
              'Team experience and culture: Do developers work best with structure or autonomy?',
            ],
          },
          {
            type: 'text',
            text: 'In practice, many modern organizations adopt hybrid approaches, for example, using Agile sprints within an overall incremental delivery plan, or applying Spiral-style risk analysis at the start of an Agile project. A systems analyst must not only understand each model in isolation but also develop the judgment to blend them appropriately.',
          },
          {
            type: 'bullets',
            heading: 'Review Questions',
            items: [
              'Why is the Waterfall model considered unsuitable for projects with rapidly changing requirements?',
              'Explain how the Spiral model differs from simple iteration. What role does risk play in each loop?',
              'What is the key difference between the Incremental model and the Prototyping model in terms of what is delivered and when?',
              'Describe the four values of the Agile Manifesto. How do they challenge assumptions made by traditional SDLC models?',
              'A bank is developing a new core banking system with 500 documented regulatory requirements that cannot change. Which SDLC model would you recommend and why?',
              'A startup is building a mobile app for a new market where user preferences are unknown. Which model is most appropriate? Justify your answer using at least three criteria from the comparison table.',
              'Compare documentation practices across all five models. What are the long-term implications of light documentation?',
              'In what scenario might an organization combine elements of two or more SDLC models? Give a concrete example.',
            ],
          },
        ],
      },
      {
        number: '14',
        title: 'Requirement Analysis',
        sections: [
          {
            type: 'text',
            heading: '5.0 Introduction',
            text: 'Requirement analysis is a foundational phase in the software development life cycle (SDLC). It is the process of identifying, documenting, and managing the needs and expectations of stakeholders for a software system. The goal is to ensure that the final product solves the right problem in the right way, before a single line of code is written.',
          },
          {
            type: 'text',
            text: 'Without thorough requirement analysis, projects risk scope creep, budget overruns, missed deadlines, and ultimately, systems that do not satisfy user needs. Studies in software engineering consistently identify poor requirements as one of the leading causes of project failure.',
          },
          {
            type: 'text',
            text: 'Requirement analysis typically results in a Software Requirements Specification (SRS) document, a formal artifact that captures what the system must do and the conditions under which it must operate.',
          },
          {
            type: 'text',
            heading: '5.1 Types of Requirements',
            text: 'Requirements are broadly classified into two categories: functional and non-functional. Understanding the distinction between these is essential, as they each guide different aspects of system design and development.',
          },
          {
            type: 'text',
            heading: '5.1.1 Functional Requirements',
            text: 'Functional requirements define what a system should do, the specific behaviours, functions, and features the system must support. They describe the interactions between the system and its environment, and the responses the system should produce for given inputs.',
          },
          {
            type: 'bullets',
            heading: '5.1.1.1 Characteristics of Functional Requirements',
            items: [
              'Describe system behaviour and business logic',
              'Are typically expressed as "The system shall..." statements',
              'Can be tested directly through functional or acceptance testing',
              'Are derived from user goals and business processes',
            ],
          },
          {
            type: 'bullets',
            heading: '5.1.1.2 Typical Examples',
            items: [
              '"The system shall allow registered users to log in using a valid email address and password."',
              '"The system shall generate a monthly sales report in PDF format."',
              '"The system shall send an email notification when an order is placed."',
              '"The system shall allow administrators to add, update, and delete product listings."',
            ],
          },
          {
            type: 'text',
            text: 'Functional requirements are usually gathered directly from stakeholders and users through elicitation sessions, and they form the bulk of the SRS document.',
          },
          {
            type: 'text',
            heading: '5.1.2 Non-Functional Requirements',
            text: 'Non-functional requirements (NFRs) define how well the system performs its functions. Rather than specifying what the system does, they specify the quality attributes, constraints, and standards the system must adhere to. They are sometimes called quality requirements or system properties.',
          },
          {
            type: 'table',
            heading: '5.1.2.1 Common Categories of Non-Functional Requirements',
            headers: ['Category', 'Description', 'Example'],
            rows: [
              ['Performance', 'Speed and responsiveness', 'The system shall respond to search queries within 2 seconds.'],
              ['Reliability', 'Uptime and fault tolerance', 'The system shall achieve 99.9% uptime per calendar month.'],
              ['Security', 'Data protection and access control', 'All user passwords shall be encrypted using bcrypt hashing.'],
              ['Scalability', 'Ability to handle growth', 'The system shall support up to 10,000 concurrent users.'],
              ['Usability', 'Ease of use', 'New users shall complete registration within 3 minutes.'],
              ['Maintainability', 'Ease of modification', 'The codebase shall follow MVC architecture.'],
              ['Portability', 'Operation across environments', 'The application shall run on Windows, macOS, and Linux.'],
              ['Compliance', 'Adherence to standards/regulations', 'The system shall comply with GDPR regulations.'],
            ],
          },
          {
            type: 'text',
            heading: '5.1.2.2 Why non-functional requirements matter',
            text: 'A system can satisfy all its functional requirements and still fail if it is too slow, insecure, or difficult to use. NFRs are often more difficult to measure and verify, but they are critical to user satisfaction and system viability.',
          },
          {
            type: 'table',
            heading: '5.1.3 Comparison of Functional and Non-Functional Requirements',
            headers: ['Aspect', 'Functional Requirements', 'Non-Functional Requirements'],
            rows: [
              ['Focus', 'What the system does', 'How well the system does it'],
              ['Expressed as', 'Features, functions, behaviours', 'Constraints, qualities, standards'],
              ['Testability', 'Directly testable (pass/fail)', 'Measured against benchmarks'],
              ['Source', 'Users, stakeholders, business rules', 'Technical teams, regulations, standards'],
              ['Example', 'User can reset password', 'Password reset email arrives within 30 seconds'],
            ],
          },
          {
            type: 'text',
            heading: '5.2 Requirement Elicitation Techniques',
            text: 'Requirement elicitation is the process of gathering requirements from stakeholders and other sources. It is one of the most challenging aspects of requirement analysis because stakeholders often struggle to articulate their needs precisely, and different stakeholders may have conflicting expectations.',
          },
          {
            type: 'text',
            text: 'Several structured techniques exist to help analysts draw out accurate, complete requirements. The four most widely used are: interviews, observation, questionnaires, and document review.',
          },
          {
            type: 'text',
            heading: '5.2.1 Interviews',
            text: 'An interview is a direct, structured conversation between a requirements analyst and one or more stakeholders. It is one of the oldest and most widely used elicitation techniques.',
          },
          {
            type: 'termlist',
            heading: '5.2.1.1 Types of Interviews',
            items: [
              { term: 'Structured interviews', def: 'The analyst follows a predefined list of questions. This ensures consistency and makes it easier to compare responses across interviewees. Best used when the analyst has a clear understanding of what information is needed.' },
              { term: 'Unstructured interviews', def: 'The conversation is open-ended and exploratory. The analyst allows the interviewee to guide the discussion, which is useful early in a project when little is known about the domain.' },
              { term: 'Semi-structured interviews', def: 'A hybrid approach where the analyst begins with a set of core questions but follows up with spontaneous probing questions based on the responses given. This is the most common format in practice.' },
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.1.2 Advantages',
            items: [
              'Enables deep, nuanced understanding of stakeholder needs',
              'Allows the analyst to probe for clarification and uncover hidden requirements',
              'Builds rapport and trust with stakeholders',
              'It is flexible, that is, the analyst can adapt the conversation in real time',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.1.3 Disadvantages',
            items: [
              'Time-consuming, especially when many stakeholders are involved',
              'Quality of output depends heavily on the analyst\'s communication skills',
              'Interviewees may give socially desirable answers rather than honest ones',
              'Not scalable for large groups',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.1.4 Standard Interview Process',
            items: [
              'Prepare questions in advance and share them with interviewees beforehand',
              'Record sessions (with consent) for accurate documentation',
              'Interview different types of stakeholders (end users, managers, IT staff) to capture diverse perspectives',
              'Follow up interviews with a written summary for stakeholder review and sign-off',
            ],
          },
          {
            type: 'text',
            heading: '5.2.2 Observation',
            text: 'Observation involves the analyst watching users perform their actual work tasks in their natural environment to understand how they interact with existing systems, tools, and processes. This technique is grounded in ethnographic research methods.',
          },
          {
            type: 'termlist',
            heading: '5.2.2.1 Types of Observation',
            items: [
              { term: 'Passive observation (shadowing)', def: 'The analyst observes without interfering. Users carry out their tasks naturally, and the analyst takes notes. This provides an accurate picture of real-world workflows.' },
              { term: 'Active observation (participatory observation)', def: 'The analyst actively participates in the tasks alongside the users. This is particularly useful for complex tasks that are difficult to understand from the outside.' },
            ],
          },
          {
            type: 'text',
            heading: '5.2.2.2 Why observation is valuable',
            text: 'Users often cannot fully articulate what they do, particularly for tasks that have become second nature. Observation reveals tacit knowledge, implicit understanding and informal practices that users take for granted and would never think to mention in an interview. For example, a bank teller asked "how do you process a withdrawal?" might describe the formal procedure. But through observation, the analyst may discover that the teller also cross-checks an informal handwritten log, a workaround not captured in any official document.',
          },
          {
            type: 'bullets',
            heading: '5.2.2.3 Advantages',
            items: [
              'Reveals actual behaviour, not just reported or idealized behavior',
              'Uncovers unstated requirements and informal workflows',
              'Provides context that helps analysts understand the work environment',
              'Reduces the risk of misinterpretation',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.2.4 Disadvantages',
            items: [
              'The observer effect (Hawthorne Effect): users may change their behaviour when they know they are being watched',
              'Time-intensive and logistically complex',
              'Not suitable for tasks that are rare, confidential, or physically hazardous',
              'May raise privacy concerns',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.2.5 Standard Observation Practices',
            items: [
              'Obtain informed consent from participants and management',
              'Be unobtrusive, that is, minimise disruptions to normal workflow',
              'Combine with interviews to validate and explain what was observed',
              'Take detailed, timestamped notes or use video recording where permitted',
            ],
          },
          {
            type: 'text',
            heading: '5.2.3 Questionnaires',
            text: 'A questionnaire is a written set of questions distributed to a large number of stakeholders to gather their views, preferences, or information about current processes. Unlike interviews, questionnaires are completed independently by respondents.',
          },
          {
            type: 'termlist',
            heading: '5.2.3.1 Types of Questions',
            items: [
              { term: 'Closed questions', def: 'Respondents select from predefined options (e.g., yes/no, Likert scales, multiple choice). These produce quantitative data that is easy to analyze. Example: "On a scale of 1-5, how satisfied are you with the current reporting system?"' },
              { term: 'Open questions', def: 'Respondents provide free-text answers. These produce rich qualitative data but are harder to analyze at scale. Example: "Describe the biggest challenge you face when generating reports."' },
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.3.2 Advantages',
            items: [
              'Cost-effective and scalable, it can reach hundreds or thousands of respondents',
              'Allows anonymous responses, which encourages honesty',
              'Produces standardized data that can be analyzed statistically',
              'Useful for validating and prioritizing requirements identified through other techniques',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.3.3 Disadvantages',
            items: [
              'Limited ability to probe or clarify ambiguous responses',
              'Low response rates are common, especially for long questionnaires',
              'Poorly worded questions can lead to misleading data',
              'Not effective for exploring complex or nuanced requirements',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.3.4 Standard Questionnaire Administration Practices',
            items: [
              'Keep questionnaires concise, that is, long surveys lead to respondent fatigue',
              'Pilot-test the questionnaire with a small group before wide distribution',
              'Use a mix of closed and open questions to balance breadth and depth',
              'State the purpose clearly, and ensure anonymity where appropriate',
              'Set a clear deadline with reminders to boost response rates',
            ],
          },
          {
            type: 'text',
            heading: '5.2.4 Document Review',
            text: 'Document review involves the systematic examination of existing documentation to extract information about current systems, processes, and requirements. Rather than gathering information directly from people, the analyst mines knowledge embedded in organizational records.',
          },
          {
            type: 'termlist',
            heading: '5.2.4.1 Types of Documents Reviewed',
            items: [
              { term: 'Existing system documentation', def: 'User manuals, technical specifications, data dictionaries' },
              { term: 'Process documents', def: 'Business process models, standard operating procedures (SOPs), workflow diagrams' },
              { term: 'Legal and regulatory documents', def: 'Compliance requirements, contracts, industry standards (e.g., International Standards Organization (ISO), General Data Protection Regulation (GDPR))' },
              { term: 'Organizational records', def: 'Forms, reports, templates, meeting minutes, previous project deliverables' },
              { term: 'Sample data', def: 'Input/output examples, log files, transaction records' },
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.4.2 Advantages',
            items: [
              'Provides objective, pre-existing information not influenced by stakeholder bias',
              'Helps uncover legal, regulatory, and technical constraints',
              'Useful for understanding legacy systems that may need to be replaced or integrated',
              'Less disruptive to stakeholders than interviews or observation',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.4.3 Disadvantages',
            items: [
              'Documents may be outdated, incomplete, or inaccurate',
              'Relevant documents may be difficult to locate or inaccessible',
              'Documents describe what was required, not necessarily what is needed now',
              'Requires significant analytical effort to extract and interpret relevant information',
            ],
          },
          {
            type: 'bullets',
            heading: '5.2.4.4 Standard Practices in Document Reviews',
            items: [
              'Identify key documents through consultation with stakeholders before reviewing',
              'Note the date and version of every document reviewed',
              'Cross-reference document content with information gathered through interviews and observation to verify accuracy',
              'Flag contradictions or gaps in documentation for follow-up',
            ],
          },
          {
            type: 'table',
            heading: '5.2.5 Comparing Elicitation Techniques',
            headers: ['Technique', 'Best Used When', 'Stakeholder Involvement', 'Cost', 'Scalability'],
            rows: [
              ['Interviews', 'Deep understanding needed from specific individuals', 'High (direct engagement)', 'High', 'Low'],
              ['Observation', 'Real-world workflows are complex or poorly documented', 'Moderate (indirect)', 'High', 'Low'],
              ['Questionnaires', 'Large groups need to be consulted efficiently', 'Low (self-reported)', 'Low', 'High'],
              ['Document Review', 'Legacy systems or regulatory context must be understood', 'None', 'Low', 'Medium'],
            ],
          },
          {
            type: 'text',
            text: 'In practice, requirement analysts rarely rely on a single technique. A triangulated approach, combining two or more techniques, produces more complete and reliable requirements. For example, document review might establish a baseline understanding of the current system, interviews might reveal what users actually want, observation might expose undocumented workarounds, and questionnaires might help prioritize features across a wider user base.',
          },
          {
            type: 'text',
            heading: '5.3 Summary',
            text: 'Requirement analysis is the process of understanding and documenting what a software system must do and the conditions under which it must operate. Requirements fall into two main categories:',
          },
          {
            type: 'bullets',
            items: [
              'Functional requirements describe the specific features and behaviors the system must provide.',
              'Non-functional requirements describe quality attributes such as performance, security, and reliability.',
            ],
          },
          {
            type: 'text',
            text: 'To gather these requirements, analysts employ structured elicitation techniques:',
          },
          {
            type: 'bullets',
            items: [
              'Interviews offer depth and flexibility for one-on-one stakeholder engagement.',
              'Observation reveals how work actually happens in practice, uncovering tacit knowledge.',
              'Questionnaires enable efficient, scalable data collection from large groups.',
              'Document review surfaces institutional knowledge embedded in existing records.',
            ],
          },
          {
            type: 'text',
            text: 'Effective requirement analysis demands both technical skill and interpersonal sensitivity. It forms the bedrock upon which all subsequent design, development, and testing activities are built.',
          },
          {
            type: 'bullets',
            heading: 'Review Questions',
            items: [
              'Distinguish between functional and non-functional requirements, providing two examples of each.',
              'A company is replacing its legacy payroll system. Which elicitation technique(s) would you recommend and why?',
              'Why might observation reveal requirements that interviews fail to uncover? Illustrate with an example.',
              'What are the main limitations of questionnaires as a requirement elicitation technique, and how can these be mitigated?',
              'Explain why a triangulated approach to requirement elicitation is generally preferable to relying on a single technique.',
            ],
          },
        ],
      },
      {
        number: '15',
        title: 'System Modeling Overview & Structured Analysis',
        sections: [
          {
            type: 'text',
            heading: '6.0 Introduction to System Modeling',
            text: 'System modeling is the process of developing abstract models of a system, with each model presenting a different view or perspective of that system. These models help analysts, designers, and stakeholders understand how a system works, what data it processes, and how it should behave under various conditions.',
          },
          {
            type: 'text',
            text: 'In the context of system analysis of information systems, modeling serves as a bridge between the problem domain (the real world) and the solution domain (the software system). Good models reduce complexity, expose ambiguities, and facilitate communication among project stakeholders.',
          },
          {
            type: 'text',
            text: 'System modeling is not about writing code. It is about understanding and communicating what a system must do before deciding how to build it.',
          },
          {
            type: 'text',
            heading: '6.1 Why Model Systems?',
            text: 'Before discussing specific tools, it is important to understand why modeling is an essential part of the systems development lifecycle (SDLC):',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Complexity management', def: 'Real-world systems are too complex to understand all at once. Models allow us to isolate and examine one aspect at a time.' },
              { term: 'Communication', def: 'Models provide a common language between technical developers and non-technical stakeholders.' },
              { term: 'Documentation', def: 'Models serve as permanent records that can be maintained and updated throughout the system’s lifecycle.' },
              { term: 'Error detection', def: 'Inconsistencies and gaps in requirements are easier to find in a model than in a completed system.' },
              { term: 'Cost reduction', def: 'Identifying problems early in modeling is far cheaper than fixing them after development.' },
            ],
          },
          {
            type: 'table',
            heading: '6.2 Categories of System Models',
            headers: ['Model Category', 'Description & Examples'],
            rows: [
              ['Process Models', 'Show how data is processed and transformed. Example: Data Flow Diagrams (DFD), Business process model notations (BPMN)'],
              ['Data Models', 'Show the structure of data and relationships. Example: Entity Relationship Diagrams (ERD)'],
              ['Behavioral Models', 'Show system behavior and decision logic. Example: Decision Tables, Decision Trees'],
              ['Object Models', 'Combine data and behavior. Example: UML Class Diagrams (covered elsewhere)'],
              ['Interface Models', 'Show how users interact with the system. Example: Prototypes, wireframes'],
            ],
          },
          {
            type: 'text',
            heading: '6.3 Structured Analysis Tools',
            text: 'Structured analysis is a classical approach to systems development that emerged in the 1970s. It was championed by pioneers such as Tom DeMarco, Ed Yourdon, and Larry Constantine. The structured analysis methodology emphasizes decomposing a system into its functional components and examining the flow of data among those components.',
          },
          {
            type: 'text',
            heading: '6.3.1 What is Structured Analysis?',
            text: 'Structured analysis is a top-down, graphical approach to defining the requirements of a system. It breaks a system down from its highest level of abstraction to detailed specifications using a set of standard tools. Structured Analysis focuses on WHAT the system does, not HOW it does it. This separation of “what” from “how” is a fundamental principle of good systems design.',
          },
          {
            type: 'termlist',
            heading: '6.3.2 Core Principles of Structured Analysis',
            items: [
              { term: 'Abstraction', def: 'Represent complex systems at different levels of detail.' },
              { term: 'Decomposition', def: 'Break large, complex problems into smaller, manageable sub-problems.' },
              { term: 'Logical vs. Physical separation', def: 'Model what the system does (logical) before specifying how it will be implemented (physical).' },
              { term: 'Consistency', def: 'All models must be internally consistent with each other (data dictionaries must match DFDs, etc.).' },
              { term: 'Completeness', def: 'All inputs, outputs, and processes must be accounted for.' },
            ],
          },
          {
            type: 'text',
            heading: '6.3.3 The Structured Analysis Toolkit',
            text: 'Structured analysis employs several interlocking tools that together describe a system from multiple perspectives:',
          },
          {
            type: 'table',
            headers: ['Core Structured Analysis Tools', 'Description'],
            rows: [
              ['Data Flow Diagrams (DFD)', 'Show how data flows through the system and how it is processed'],
              ['Data Dictionary', 'Define all data elements, their structure, and allowable values'],
              ['Process Specifications', 'Describe in detail what each process in the DFD does'],
              ['Entity Relationship Diagrams (ERD)', 'Model the structure of data stored in the system'],
              ['Decision Tables & Trees', 'Specify complex decision logic in a clear, testable format'],
              ['Structured Chart', 'Show the hierarchical organization of system modules'],
            ],
          },
          {
            type: 'text',
            heading: '6.4 The Role of the Data Dictionary',
            text: 'The data dictionary is a central repository that defines every data element in the system. It acts as a glue that ties all the other models together. Without a data dictionary, the names used in DFDs, ERDs, and process specifications may mean different things to different people.',
          },
          {
            type: 'table',
            heading: 'Data Dictionary Notation',
            headers: ['Notation', 'Meaning'],
            rows: [
              ['=', 'Is composed of (definition)'],
              ['+', 'And (sequential components)'],
              ['{ }', 'Iteration (one or more occurrences)'],
              ['[ ]', 'Selection (one of several alternatives)'],
              ['( )', 'Optional component'],
              ['**', 'Comment or annotation'],
              ['@', 'Key field (identifier)'],
            ],
          },
        ],
      },
      {
        number: '16',
        title: 'Data Flow Diagrams (DFD)',
        sections: [
          {
            type: 'text',
            heading: '6.5 Data Flow Diagrams (DFD)',
            text: 'A Data Flow Diagram (DFD) is a graphical representation of the “flow” of data through an information system. DFDs model the processes that transform inputs into outputs, the data stores where information is held, and the external entities that interact with the system. They were formalized by Tom DeMarco (1979) and Ed Yourdon.',
          },
          {
            type: 'text',
            heading: '6.5.1 DFD Notation and Symbols',
            text: 'A DFD uses four main symbols: Process, Data store, Data flow and Entity. A DFD shows only DATA flows, not control flows. If we want to show timing, decisions, or sequencing, we need a different diagram type such as a flowchart or state diagram.',
          },
          {
            type: 'table',
            headers: ['Symbol and Name', 'Description'],
            rows: [
              ['Process', 'Represents an activity or function that transforms input data into output data. Labeled with a verb (e.g., Process Order; Verify Login).'],
              ['Data Store', 'Represents data at rest or stored information (e.g., Customer Database).'],
              ['Data Flow', 'Represents movement of data between processes, data stores, and external entities. Labeled with nouns (e.g., Order Details, Payment Info).'],
              ['Entity', 'Represents an outside system or person that provides input to or receives output from the system (e.g., Customer, Bank).'],
            ],
          },
          {
            type: 'text',
            heading: '6.5.2 Levels of DFDs',
            text: 'DFDs are developed in levels, from very general to very specific. This hierarchical approach manages complexity effectively.',
          },
          {
            type: 'table',
            heading: 'DFD Level Hierarchy',
            headers: ['Level', 'Description'],
            rows: [
              ['Level 0 (Context Diagram)', 'Shows the entire system as a single process with all external entities and data flows. Provides the big picture.'],
              ['Level 1 DFD', 'Expands the single process into its major sub-processes (typically 3-9 processes). Shows major data stores.'],
              ['Level 2 DFD', 'Expands each Level 1 process into its component sub-processes. More detail revealed.'],
              ['Level n DFD', 'Further decomposition continues until primitive processes are reached (processes that cannot be further decomposed meaningfully).'],
            ],
          },
          {
            type: 'text',
            heading: '6.5.2.1 Context Diagram (Level 0)',
            text: 'The context diagram is the highest-level DFD. Key characteristics:',
          },
          {
            type: 'bullets',
            items: [
              'Contains exactly ONE process representing the entire system',
              'Shows all external entities that interact with the system',
              'Shows all data flows crossing the system boundary',
              'Does NOT show internal processes, data stores, or internal flows',
              'Establishes the system boundary clearly',
            ],
          },
          {
            type: 'text',
            heading: 'Example',
            text: 'A university course registration system context diagram would show the system as one circle, with external entities: Students, University administration, connected by data flows like student details, course details, and Acceptance denial note.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/level-0-dfd-course-registration.png',
            width: 1800, height: 720,
            caption: 'Figure 6.1: Level 0 DFD of a University Course Registration System',
          },
          {
            type: 'text',
            heading: '6.5.2.2 Level 1 DFD',
            text: 'The Level 1 DFD decomposes the single system process into its major functional areas. Rules for Level 1:',
          },
          {
            type: 'bullets',
            items: [
              'Each process is numbered (1.0, 2.0, 3.0, etc.)',
              'Data flows from the context diagram must appear at Level 1 (conservation of data flows)',
              'New data stores and internal flows may be introduced',
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/level-1-dfd-course-registration.png',
            width: 1800, height: 1070,
            caption: 'Figure 6.2: Level 1 DFD of the University Course Registration System',
          },
          {
            type: 'text',
            heading: '6.5.2.3 Level 2 DFD',
            text: 'This level provides more detailed decomposition of Level 1 processes. It breaks down a single process from the Level 1 DFD into smaller sub-processes, showing how data moves between them.',
          },
          {
            type: 'text',
            text: 'For example, in the level 1 DFD of the University Course Registration System shown in Figure 6.3, there is a process called 1.0 Validate Inputted details. This process is further decomposed into 1.1 Check that the required information is all true, 1.2 Check that the student is eligible for the course and 1.3 Check that the results are true and not tampered. We have the same for 2.0 Process Application. The key characteristics of a level 2 DFD are:',
          },
          {
            type: 'bullets',
            items: [
              'It provides more detail than a Level 1 DFD.',
              'Decomposes one Level 1 process into several sub-processes.',
              'Maintains data balance with the parent Level 1 process.',
              'Shows internal processing logic and data movement.',
              'Uses the same DFD symbols as Context and Level 1 diagrams.',
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/level-2-dfd-course-registration.png',
            width: 1800, height: 1076,
            caption: 'Figure 6.3: Level 2 DFD of the University Course Registration System',
          },
          {
            type: 'text',
            heading: '6.5.3 Rules for Drawing DFDs',
            text: 'DFDs must follow strict rules to be correct and meaningful:',
          },
          {
            type: 'table',
            headers: ['Rule', 'Explanation'],
            rows: [
              ['No direct entity-to-entity flows', 'Data cannot flow directly between two external entities; it must go through a process'],
              ['No direct store-to-store flows', 'Data cannot flow between two data stores without a process in between'],
              ['No process with only inputs (black hole)', 'Every process must have at least one output data flow'],
              ['No process with only outputs (miracle)', 'Every process must have at least one input data flow'],
              ['Balanced decomposition', 'All data flows entering/leaving a parent process must appear in its child DFD'],
              ['Named flows', 'Every data flow must have a meaningful name describing the data it carries'],
              ['Unique process names', 'Each process must have a unique, descriptive name (verb phrase)'],
            ],
          },
          {
            type: 'text',
            heading: '6.5.4 Balancing DFDs',
            text: 'Balancing refers to the requirement that when you decompose a process into a lower-level DFD, the data flows entering and leaving the parent process must match exactly the net inputs and outputs of the child diagram. This ensures consistency across all levels.',
          },
          {
            type: 'table',
            heading: '6.5.5 Advantages and Limitations of DFDs',
            headers: ['Advantages', 'Limitations'],
            rows: [
              ['Easy for non-technical users to understand', 'Does not show timing or sequence of events'],
              ['Focuses on data rather than procedures', 'Cannot show decision logic or conditions'],
              ['Supports top-down decomposition', 'Becomes complex with large systems'],
              ['Technology-independent (logical model)', 'Does not show error handling'],
              ['Widely understood and standardized', 'No standard for consistency checking'],
            ],
          },
        ],
      },
      {
        number: '17',
        title: 'Business Process Modeling Notation (BPMN)',
        sections: [
          {
            type: 'text',
            heading: '6.6 Business Process Modeling and Notations (BPMN)',
            text: 'A Business Process Modeling and Notations (BPMN) is a standardized graphical notation developed by the Object Management Group (OMG) for depicting business processes. It provides a clear, intuitive way to visualize and communicate how business operations are carried out across different departments or systems within an organization. During requirement modeling, the analyst creates models that use a standard language called business process modeling notations (BPMN). BPMN includes various shapes and symbols that represent events, processes and workflows.',
          },
          {
            type: 'text',
            text: 'Figure 6.4 shows a BPM for an Order Processing System (Scott & Harry, 2017).',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/bpm-order-processing-system.png',
            width: 1587, height: 895,
            caption: 'Figure 6.4: A BPM for an Order Processing System (Scott & Harry, 2017)',
          },
          {
            type: 'text',
            heading: '6.6.1 Components of BPMN',
            text: 'BPMN diagrams are composed of four main categories of elements:',
          },
          {
            type: 'bullets',
            items: ['Flow objects', 'Connecting objects', 'Swim lanes', 'Artifacts'],
          },
          {
            type: 'text',
            heading: '6.6.1.1 Flow Objects',
            text: 'These are the core elements that define the behavior of a business process and they include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Events', def: 'Represent something that happens during a process (Start Event that indicates where a process begins, Intermediate Event that occurs during the process and End Event, that indicates where a process ends). The symbol is a circle.' },
              { term: 'Activities', def: 'Represent work performed within a process (Task, a single unit of work, Sub-process, a group of related tasks). The symbol is a rounded rectangle.' },
              { term: 'Gateways', def: 'Control the flow of a process by making decisions, splitting, or merging paths. They include Exclusive Gateway (XOR), Inclusive Gateway (OR) and Parallel Gateway (AND). The symbol is a diamond shape.' },
            ],
          },
          {
            type: 'text',
            heading: '6.6.1.2 Connecting Objects',
            text: 'These elements connect flow objects together and they include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Sequence Flow', def: 'Shows the order in which activities are performed. The symbol is a solid arrow.' },
              { term: 'Message Flow', def: 'Shows communication between different participants or organizations. The symbol is a dashed arrow.' },
              { term: 'Association', def: 'Links artifacts or data to process elements. The symbol is a dotted line.' },
            ],
          },
          {
            type: 'text',
            heading: '6.6.1.3 Swim Lanes',
            text: 'These swim lanes organize activities according to participants or responsibilities. They include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Pool', def: 'Represents a participant, organization, or business entity.' },
              { term: 'Lane', def: 'Represents a department, role, or individual within a pool.' },
            ],
          },
          {
            type: 'text',
            text: 'Example: Pool — University; Lanes — Admissions Office, Finance Department, Student.',
          },
          {
            type: 'text',
            heading: '6.6.1.4 Artifacts',
            text: 'Artifacts provide additional information about a process. They include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Data Object', def: 'Represents information used or produced by activities.' },
              { term: 'Group', def: 'Used to logically group activities without affecting process flow.' },
              { term: 'Text Annotation', def: 'Provides explanatory notes or comments.' },
            ],
          },
          {
            type: 'bullets',
            heading: '6.6.2 Tools for BPMN',
            items: ['Camunda Modeler', 'Bizagi Modeler', 'Lucidchart/Draw.io', 'Signavio', 'IBM Blueworks Live'],
          },
          {
            type: 'bullets',
            heading: '6.6.3 Benefits of using BPMN',
            items: [
              'Standardized and widely understood notation.',
              'Improves communication across business and IT teams.',
              'Facilitates process automation using workflow engines.',
              'Helps identify redundancies and optimize workflows.',
              'Supports business process reengineering (BPR) and digital transformation initiatives.',
            ],
          },
        ],
      },
      {
        number: '18',
        title: 'Entity Relationship Diagrams (ERD)',
        sections: [
          {
            type: 'text',
            heading: '6.7 Entity Relationship Diagram (ERD)',
            text: 'An Entity Relationship Diagram (ERD) is a data modeling technique that graphically illustrates the logical structure of data in a system. ERDs were proposed by Peter Chen in 1976 and have since become the standard tool for database design. They show the data that exists in a system, how that data is organized, and how different pieces of data relate to each other.',
          },
          {
            type: 'text',
            heading: '6.7.1 Core Concepts of ERDs',
            text: 'The basic building blocks of the Entity Relationship Diagram data model are entities, attributes, and relationships.',
          },
          {
            type: 'text',
            heading: '6.7.1.1 Entities',
            text: 'An entity is a person, place, thing, event, or concept about which the system stores data. An entity is represented as a rectangle in an ERD. For example, STUDENT, LECTURER, EMPLOYEE and COURSE are entities, as shown below.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/entity-examples.png',
            width: 1439, height: 132,
            caption: 'Entity examples — STUDENT, LECTURER, EMPLOYEE, and COURSE, each represented as a rectangle',
          },
          {
            type: 'text',
            text: 'Three types of entities are identified: Strong, Weak and Associative.',
          },
          {
            type: 'table',
            headers: ['Entity Type', 'Description and Example'],
            rows: [
              ['Strong Entity', 'Has its own unique identifier (primary key). Example: STUDENT, COURSE, EMPLOYEE'],
              ['Weak Entity', 'Cannot be uniquely identified without referencing a strong entity. Example: DEPENDENT (depends on EMPLOYEE)'],
              ['Associative Entity', 'Represents a many-to-many relationship and may have its own attributes. Example: ENROLLMENT (between STUDENT and COURSE)'],
            ],
          },
          {
            type: 'table',
            heading: '6.7.1.2 Attributes',
            headers: ['Types of Attributes', 'Description'],
            rows: [
              ['Simple Attribute', 'Cannot be subdivided. Example: Age, StudentID'],
              ['Composite Attribute', 'Made up of multiple sub-attributes. Example: Address (Street, City, Postcode)'],
              ['Derived Attribute', 'Calculated from other attributes. Example: Age (derived from DateOfBirth)'],
              ['Multi-valued Attribute', 'Can have multiple values. Example: PhoneNumbers'],
              ['Key Attribute', 'Uniquely identifies each entity instance. Example: StudentID'],
            ],
          },
          {
            type: 'text',
            text: 'Student entity with attributes (StudentID, Name, Department, DOB) can be represented in an ERD as shown in Figure 6.5.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/entity-with-attributes.png',
            width: 1800, height: 675,
            caption: 'Figure 6.5: An entity with its attributes in an ERD',
          },
          {
            type: 'text',
            heading: '6.7.1.3 Relationships',
            text: 'A relationship represents an association or connection between two or more entities. Relationships are represented by a diamond shape. For example, the relationship (Employs) between a Project and an Employee is shown in Figure 6.6.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/relationship-association-example.png',
            width: 1800, height: 413,
            caption: 'Figure 6.6: Relationship association',
          },
          {
            type: 'text',
            heading: '6.7.2 Cardinality and Participation',
            text: 'Cardinality defines the numerical relationships between instances of entities. It specifies the minimum and maximum number of times an instance of one entity can be associated with instances of another entity.',
          },
          {
            type: 'table',
            heading: '6.7.2.1 Cardinality Ratios',
            headers: ['Cardinality Type', 'Meaning and Real-World Example'],
            rows: [
              ['One-to-One (1:1)', 'One instance of entity A is related to at most one instance of entity B. Example: One EMPLOYEE manages one DEPARTMENT (as department head); one DEPARTMENT has one head.'],
              ['One-to-Many (1:N)', 'One instance of entity A can relate to many instances of entity B. Example: One DEPARTMENT employs many EMPLOYEES; each EMPLOYEE belongs to one DEPARTMENT.'],
              ['Many-to-Many (M:N)', 'Many instances of entity A can relate to many instances of entity B. Example: STUDENTS enroll in many COURSES; each COURSE has many STUDENTS. Requires a junction/associative table in implementation.'],
            ],
          },
          {
            type: 'bullets',
            items: [
              '1:1 — EMPLOYEE (1) Manages (1) DEPARTMENT',
              '1:N — DEPARTMENT (1) Employs (N) EMPLOYEES',
              'M:N — STUDENTS (M) Enroll (N) COURSES',
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/cardinality-of-associations.png',
            width: 1800, height: 868,
            caption: 'Figure 6.7: The cardinality of associations between entities',
          },
          {
            type: 'text',
            heading: '6.7.2.2 Participation Constraints',
            text: 'Participation defines whether all or only some entity instances participate in a relationship:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Total participation (mandatory)', def: 'Every instance of the entity must participate. Example: Every EMPLOYEE must be assigned to a DEPARTMENT.' },
              { term: 'Partial participation (optional)', def: 'Some instances may not participate. An EMPLOYEE may or may not manage a PROJECT.' },
            ],
          },
          {
            type: 'text',
            heading: '6.7.3 ERD Notations',
            text: 'The notation used by Chen is widely utilized to represent ER notions. They include:',
          },
          {
            type: 'table',
            headers: ['Notation', 'Characteristics'],
            rows: [
              ['Rectangle', 'Rectangles are used to represent entities'],
              ['Oval', 'Used for representing attributes'],
              ['Diamond', 'Diamond is used for representing relationship sets'],
              ['Lines', 'Lines are used to link attributes to entity sets and entity sets to relationships'],
            ],
          },
          {
            type: 'termlist',
            heading: '6.7.4 Steps to Create an ERD',
            items: [
              { term: 'Identify all entities', def: 'Look for nouns in requirements that represent things the system must remember.' },
              { term: 'Identify attributes for each entity', def: 'What information must be stored about each entity?' },
              { term: 'Identify primary keys', def: 'What uniquely identifies each entity instance?' },
              { term: 'Identify relationships', def: 'Which entities interact with each other? Use verbs to create relationships.' },
              { term: 'Determine cardinality and participation', def: 'How many of each entity can participate in the relationship?' },
              { term: 'Identify weak entities and associative entities', def: 'Do any entities depend on others?' },
              { term: 'Normalize and refine', def: 'Check for redundancy and apply normalization rules.' },
            ],
          },
          {
            type: 'text',
            heading: '6.7.5 ERD to Relational Schema',
            text: 'An ERD must eventually be converted into a relational database schema for implementation. The rules for this transformation are systematic:',
          },
          {
            type: 'table',
            headers: ['ERD Element', 'Relational Schema Rule'],
            rows: [
              ['Strong Entity', 'Becomes a table; primary key attribute becomes the table’s primary key'],
              ['Weak Entity', 'Becomes a table; its primary key is a combination of its partial key and the primary key of the owning strong entity'],
              ['1:1 Relationship', 'Add foreign key to either side (prefer the total participation side)'],
              ['1:N Relationship', 'Add foreign key to the “many” side referencing the “one” side’s primary key'],
              ['M:N Relationship', 'Create a new junction table with foreign keys to both entities as a composite primary key'],
              ['Multi-valued Attribute', 'Create a separate table with foreign key back to the parent entity'],
            ],
          },
          {
            type: 'text',
            heading: '6.7.6 Example: Hospital Management System ERD',
            text: 'Consider a hospital management system with the following requirements:',
          },
          {
            type: 'bullets',
            items: [
              'The hospital has multiple wards, and each ward has many beds.',
              'Patients are admitted to a specific bed in a ward.',
              'Doctors treat patients, and a patient may be treated by many doctors.',
              'Each doctor specializes in one medical specialty.',
            ],
          },
          {
            type: 'text',
            text: 'Entities identified: PATIENT, DOCTOR, WARD, BED, SPECIALTY, TREATMENT. The entity attributes are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'PATIENT', def: 'PatientID, Name, DateOfBirth, Address, BloodType' },
              { term: 'DOCTOR', def: 'DoctorID, Name, LicenseNumber, PhoneNumber' },
              { term: 'WARD', def: 'WardID, WardName, WardType, Capacity' },
              { term: 'BED', def: 'BedNumber, WardID (FK), Status (occupied/available)' },
              { term: 'SPECIALTY', def: 'SpecialtyID, SpecialtyName, Description' },
              { term: 'TREATMENT', def: 'PatientID (FK), DoctorID (FK), Date, Diagnosis' },
            ],
          },
          {
            type: 'text',
            text: 'Figure 6.8 shows the ERD of the Hospital management system.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/erd-hospital-management-system.png',
            width: 1931, height: 1079,
            caption: 'Figure 6.8: ERD for the Hospital management system',
          },
        ],
      },
      {
        number: '19',
        title: 'Decision Tables and Decision Trees',
        sections: [
          {
            type: 'text',
            heading: '6.8 Decision Tables',
            text: 'A decision table is a structured, tabular representation of complex decision logic. It shows the various conditions that may exist, the actions that can be taken, and the combinations of conditions that lead to each action. Decision tables are particularly useful when there are multiple interrelated conditions that determine outcomes. Decision tables are especially valuable when you find yourself writing deeply nested IF-ELSE logic. If you need more than 3 levels of nesting, consider a decision table.',
          },
          {
            type: 'text',
            heading: '6.8.1 Structure of a Decision Table',
            text: 'A decision table has four main quadrants:',
          },
          {
            type: 'table',
            headers: ['Decision Table Structure', 'STUBS', 'ENTRIES'],
            rows: [
              ['CONDITIONS (upper half)', 'Condition Stubs: Names/descriptions of each condition', 'Condition Entries: Y/N or specific values for each rule column'],
              ['ACTIONS (lower half)', 'Action Stubs: Names/descriptions of each possible action', 'Action Entries: X or tick marks indicating which actions apply for each rule'],
            ],
          },
          {
            type: 'text',
            text: 'Figure 6.8 shows a worked decision table for a shop deciding whether a customer qualifies for a discount, based on whether advance payment was made, whether the purchase amount is at least ₦50,000, and whether the customer is a regular customer.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/decision-table-discount-example.png',
            width: 1800, height: 1020,
            caption: 'Figure 6.8: Decision table for determining customer type and discount rates',
          },
          {
            type: 'termlist',
            heading: '6.8.2 Decision Table Terminology',
            items: [
              { term: 'Rule', def: 'A single column in the decision table representing one specific combination of conditions and the actions that result from that combination.' },
              { term: 'Condition', def: 'A factor or variable that affects the outcome of a decision. Each condition can have one of two values (Y/N for binary tables) or multiple values (extended tables).' },
              { term: 'Action', def: 'What the system does when a particular combination of conditions is true. Multiple actions can apply for a single rule.' },
            ],
          },
          {
            type: 'table',
            heading: '6.8.3 Types of Decision Tables',
            headers: ['Type', 'Description'],
            rows: [
              ['Limited-Entry Table', 'Each condition entry is only Y (yes) or N (no). Simple but may require many rules. For n conditions, maximum 2^n rules.'],
              ['Extended-Entry Table', 'Condition entries can have more than two values (e.g., age ranges: <18, 18-65, >65). Reduces the number of rules needed.'],
              ['Mixed-Entry Table', 'Combines both Y/N conditions and multi-valued conditions in the same table.'],
            ],
          },
          {
            type: 'termlist',
            heading: '6.8.4 Steps to Construct a Decision Table',
            items: [
              { term: 'Identify all conditions', def: 'List every condition or factor that influences the decision.' },
              { term: 'Identify all possible actions', def: 'List every action the system can take.' },
              { term: 'Calculate the maximum number of rules', def: 'For n binary conditions, maximum = 2^n rules.' },
              { term: 'Fill in the condition entries', def: 'Systematically enumerate all combinations of Y and N.' },
              { term: 'Determine the actions for each rule', def: 'Mark X for each action that applies.' },
              { term: 'Verify completeness', def: 'Check that all possible combinations have been covered.' },
              { term: 'Simplify the table', def: 'Merge rules where a condition makes no difference (replace with a dash “-”).' },
            ],
          },
          {
            type: 'text',
            heading: '6.8.5 Example: Bank Loan Decision Table',
            text: 'A bank approves loans based on three conditions: credit score (Good/Poor), income level (Sufficient/Insufficient), and existing debt (Low/High). The possible actions are: Approve Loan, Approve with Higher Interest, Request More Documents, Reject Loan.',
          },
          {
            type: 'table',
            headers: ['Conditions / Actions', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'],
            rows: [
              ['Credit Score Good?', 'Y', 'Y', 'Y', 'Y', 'N', 'N', 'N', 'N'],
              ['Income Sufficient?', 'Y', 'Y', 'N', 'N', 'Y', 'Y', 'N', 'N'],
              ['Existing Debt Low?', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'Y', 'N'],
              ['Approve Loan', 'X', '-', '-', '-', '-', '-', '-', '-'],
              ['Approve w/ High Int.', '-', 'X', 'X', '-', 'X', '-', '-', '-'],
              ['Request More Docs', '-', '-', '-', 'X', '-', 'X', 'X', '-'],
              ['Reject Loan', '-', '-', '-', '-', '-', '-', '-', 'X'],
            ],
          },
          {
            type: 'text',
            heading: '6.8.6 Simplifying Decision Tables',
            text: 'Tables can often be simplified by identifying rules where one or more conditions are irrelevant to the outcome. When a condition does not affect the result, it is replaced by a dash (-), and two rules can be merged into one. This process reduces the number of columns needed.',
          },
          {
            type: 'text',
            text: 'Rule for merging: Two rules can be merged into one if they produce identical actions and differ in exactly one condition. The merged rule uses “-” for that condition.',
          },
          {
            type: 'table',
            heading: '6.8.7 Advantages and Disadvantages',
            headers: ['Advantages', 'Disadvantages'],
            rows: [
              ['Ensures all combinations are considered', 'Can become very large with many conditions (2^n rules)'],
              ['Easy to verify and test', 'Not suitable for showing sequence or timing'],
              ['Unambiguous, each rule has one outcome', 'Less intuitive for stakeholders unfamiliar with the format'],
              ['Directly translatable to code', 'Extended tables can be harder to read'],
              ['Serves as test case documentation', 'Does not show the hierarchy of conditions well'],
            ],
          },
          {
            type: 'text',
            heading: '6.9 Decision Trees',
            text: 'A decision tree is a graphical representation of decision logic that shows conditions and actions in a branching, tree-like structure. Each internal node represents a condition, each branch represents the outcome of testing that condition, and each leaf node represents an action or result. Decision trees are widely used in systems analysis, machine learning, and business process modeling.',
          },
          {
            type: 'text',
            heading: '6.9.1 Structure of a Decision Tree',
            text: 'A decision tree consists of three types of nodes:',
          },
          {
            type: 'table',
            headers: ['Decision Tree Components', 'Description'],
            rows: [
              ['Root Node', 'The starting point — the first condition to be evaluated. Drawn as a rectangle or circle at the far left (or top).'],
              ['Internal Nodes (Decision Nodes)', 'Represent conditions to be tested. Each has two or more branches emerging from it.'],
              ['Branches', 'Lines connecting nodes, labeled with the outcome or value of the condition being tested (e.g., Yes/No, or specific values).'],
              ['Leaf Nodes (Terminal Nodes)', 'Represent the final action or result when no more conditions need to be evaluated. Usually drawn as rectangles at the far right (or bottom).'],
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/decision-tree-example.png',
            width: 1800, height: 1286,
            caption: 'Figure 6.9: Example of a decision tree, showing the root node, internal (decision) nodes, branches, and leaf (action) nodes',
          },
          {
            type: 'text',
            heading: '6.9.2 Reading and Drawing Decision Trees',
            text: 'Decision trees are read from left to right (or top to bottom). To trace a path:',
          },
          {
            type: 'bullets',
            items: [
              'Start at the root node (first condition).',
              'Evaluate the condition and follow the appropriate branch (Yes or No).',
              'Continue evaluating conditions at each internal node.',
              'When a leaf node is reached, that is the action/outcome for that combination of conditions.',
            ],
          },
          {
            type: 'text',
            heading: '6.9.3 Example: Student Grade Classification',
            text: 'A university uses the following logic to classify students:',
          },
          {
            type: 'bullets',
            items: [
              'If attendance >= 75% AND exam score >= 70: Award Grade A',
              'If attendance >= 75% AND exam score 50-69: Award Grade B',
              'If attendance >= 75% AND exam score < 50: Refer for Supplementary',
              'If attendance < 75% AND exam score >= 50: Issue Warning and allow Resit',
              'If attendance < 75% AND exam score < 50: Fail the student',
            ],
          },
          {
            type: 'text',
            text: 'The two decision trees below are worked examples using the same discount scenario as the decision table in Figure 6.8, plus a second example for a university admission policy.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/decision-tree-discount-example.png',
            width: 1800, height: 1162,
            caption: 'Figure 6.10: Decision tree for determining the customer type that should qualify for discounts',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/decision-tree-admission-example.png',
            width: 1800, height: 1129,
            caption: 'Figure 6.11: Decision tree for determining university admission into the Department of Computer Science',
          },
          {
            type: 'text',
            heading: '6.9.4 Comparison between Decision Tree and Decision Table',
            text: 'Both tools represent the same decision logic but have different strengths:',
          },
          {
            type: 'table',
            headers: ['Feature', 'Decision Table', 'Decision Tree'],
            rows: [
              ['Format', 'Tabular/matrix format', 'Graphical, branching format'],
              ['Completeness check', 'Easy — count and verify all columns', 'Harder — must trace all branches'],
              ['Readability for complex logic', 'Becomes hard to read with many conditions', 'Clearer for sequential decisions'],
              ['Audience suitability', 'Better for technical audiences', 'Better for management/non-technical'],
              ['Condition hierarchy', 'All conditions treated equally', 'Conditions shown in priority order'],
              ['Space required', 'Grows horizontally with more conditions', 'Grows deeper with more conditions'],
              ['Conversion to code', 'Direct mapping to structured code', 'Maps well to nested IF-ELSE or switch'],
            ],
          },
          {
            type: 'table',
            heading: '6.9.5 Advantages and Limitations of Decision Trees',
            headers: ['Advantages', 'Limitations'],
            rows: [
              ['Very intuitive and visual', 'Can become very large and complex'],
              ['Easy for non-technical stakeholders', 'Conditions must be evaluated in a fixed sequence'],
              ['Shows priority and sequence of decisions', 'Not efficient when conditions interact equally'],
              ['Easy to follow a single path through', 'Duplication occurs when same action appears at many leaves'],
              ['Maps naturally to flowchart/code', 'Changes to logic can require redrawing the entire tree'],
            ],
          },
          {
            type: 'text',
            heading: '6.9.6 When to Use Which Tool',
            text: 'Choosing the right tool depends on the nature of the decision logic and the audience:',
          },
          {
            type: 'bullets',
            items: [
              'Use Decision Tables when: conditions are independent, you need to ensure completeness, all combinations matter, and the audience is technical.',
              'Use Decision Trees when: conditions are naturally sequential or hierarchical, the audience is non-technical, or when you want to show which conditions are evaluated first.',
              'Use both together: Build a decision table first (to ensure completeness), then convert to a decision tree for presentation to stakeholders.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Review Questions',
            items: [
              'Explain the difference between a context diagram and a Level 1 DFD. What information appears in each?',
              'Consider a library management system. A partial Level 1 DFD might include: (a) External entities: Member, Librarian, Publisher; (b) Processes: 1.0 Register Member, 2.0 Issue Book, 3.0 Return Book, 4.0 Order Books; (c) Data stores: D1 Member File, D2 Book Catalog, D3 Loan Records; (d) Flows: “membership application” flows from Member to Process 1.0, and “member record” flows from Process 1.0 to D1 Member File. Draw a level 2 DFD diagram for the system.',
              'A sales system has the following entities: CUSTOMER, ORDER, PRODUCT, SALES-PERSON. Identify at least three relationships between these entities, state their cardinality, and justify each with a business rule.',
              'Construct a decision table for the following scenario: A cinema offers discounts based on whether the customer is a member (Yes/No), whether it is a weekday (Yes/No), and whether the customer is an elderly person (Yes/No). Members get 20% off, elders get 15% off, weekday screenings get 10% off. Combinations can stack, but maximum total discount is 30%.',
              'Convert the decision table from Question 4 into a decision tree. Which format is more appropriate for presenting it to the cinema management? Justify your answer.',
              'Describe three rules that DFDs must follow and explain why each rule is important.',
              'Differentiate between a strong entity and a weak entity in an ERD, providing an example of each from a university context.',
            ],
          },
        ],
      },
      {
        number: '20',
        title: 'Introduction to UML',
        sections: [
          {
            type: 'text',
            heading: '7.0 Introduction to UML',
            text: 'The Unified Modeling Language (UML) is a standardized visual language used in software engineering for specifying, visualizing, constructing, and documenting software systems. Developed in the mid-1990s by Grady Booch, Ivar Jacobson, and James Rumbaugh at Rational Software, UML has become the industry standard for object-oriented analysis and design.',
          },
          {
            type: 'text',
            heading: '7.1 Purpose and Importance',
            text: 'UML serves several critical purposes in software development:',
          },
          {
            type: 'bullets',
            items: [
              'Provides a common language for software developers, analysts, and stakeholders to communicate system design.',
              'Enables visualization of system architecture and behavior before implementation.',
              'Facilitates documentation that can be maintained throughout the software lifecycle.',
              'Supports both forward engineering (generating code from models) and reverse engineering (generating models from code).',
              'Helps identify design flaws and potential issues early in the development process.',
            ],
          },
          {
            type: 'text',
            heading: '7.2 UML Versions and Standards',
            text: 'UML is maintained by the Object Management Group (OMG), an international technology standards consortium. The current major version is UML 2.x, which introduced significant enhancements over UML 1.x, including improved diagram types and better support for component-based development. UML 2.5.1, released in 2017, is the latest stable version and includes 14 different diagram types organized into two main categories: structural diagrams and behavioral diagrams.',
          },
          {
            type: 'text',
            heading: '7.3 Categories of UML Diagrams',
            text: 'UML diagrams are classified into two broad categories:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Structural Diagrams', def: 'Represent the static aspects of the system, showing the organization of system components (e.g., Class diagrams, Component diagrams, Deployment diagrams).' },
              { term: 'Behavioral Diagrams', def: 'Represent the dynamic aspects of the system, showing how the system behaves over time (e.g., Use Case diagrams, Sequence diagrams, Activity diagrams, State Chart diagrams).' },
            ],
          },
        ],
      },
      {
        number: '21',
        title: 'Use Case Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.1 Use Case Diagrams',
            text: "Use Case diagrams are behavioral diagrams that describe the functional requirements of a system from the user's perspective. They show the interactions between actors (users or external systems) and the system, representing what the system should do without specifying how it accomplishes those tasks.",
          },
          {
            type: 'text',
            heading: '7.4.1.1 Key Components',
            text: 'The key components of a Use case diagram are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Actors', def: 'External entities that interact with the system (represented as stick figures). Actors can be human users, other systems, or hardware devices.' },
              { term: 'Use Cases', def: 'Specific functionalities or services that the system provides (represented as ovals). Each use case describes a goal that an actor wants to achieve.' },
            ],
          },
          {
            type: 'text',
            text: 'Relationships: Connections between actors and use cases, or between use cases themselves:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Association', def: 'Communication link between an actor and a use case.' },
              { term: 'Include', def: 'One use case includes the functionality of another (mandatory).' },
              { term: 'Extend', def: 'One use case extends another under certain conditions (optional).' },
              { term: 'Generalization', def: 'Inheritance relationship between use cases or actors.' },
            ],
          },
          {
            type: 'text',
            text: 'System Boundary: A rectangle that defines the scope of the system, separating internal use cases from external actors.',
          },
          {
            type: 'text',
            heading: '7.4.1.2 Example: A bank ATM processing',
            text: 'Figure 7.1 shows a use case diagram for a bank ATM system where the actor is a customer and the use cases involve the use of the ATM by the customer.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/use-case-diagram-atm.png',
            width: 1800, height: 1089,
            caption: 'Figure 7.1: A use case diagram for the Bank ATM withdrawal process, showing the primary actor, secondary actor, system boundary, and use cases',
          },
          {
            type: 'text',
            heading: '7.4.1.3 Applications of Use case diagram',
            text: 'Use case diagrams are applied in the following areas:',
          },
          {
            type: 'bullets',
            items: [
              'Requirements gathering and analysis.',
              'System scope definition.',
              'Communication with stakeholders.',
              'Test case derivation.',
            ],
          },
        ],
      },
      {
        number: '22',
        title: 'Class Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.2 Class Diagram',
            text: 'Class diagrams are structural diagrams that represent the static structure of a system by showing its classes, attributes, methods, and the relationships among classes. They are the most commonly used UML diagrams and form the foundation of object-oriented design.',
          },
          {
            type: 'text',
            heading: '7.4.2.1 Key Components',
            text: 'Classes: Represented as rectangles divided into three compartments:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Top compartment', def: 'Class name (in bold, centered).' },
              { term: 'Middle compartment', def: 'Attributes (data members) with visibility modifiers.' },
              { term: 'Bottom compartment', def: 'Methods (operations) with visibility modifiers.' },
            ],
          },
          {
            type: 'text',
            text: 'Visibility Modifiers:',
          },
          {
            type: 'termlist',
            items: [
              { term: '+ (public)', def: 'Accessible from anywhere.' },
              { term: '- (private)', def: 'Accessible only within the class.' },
              { term: '# (protected)', def: 'Accessible within the class and its subclasses.' },
              { term: '~ (package)', def: 'Accessible within the same package.' },
            ],
          },
          {
            type: 'text',
            text: 'Relationships:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Association', def: 'A semantic relationship between classes (solid line). Can include multiplicity (e.g., 1, 0..1, 1..*, *).' },
              { term: 'Aggregation', def: "A 'has-a' relationship representing a whole-part relationship where the part can exist independently (hollow diamond)." },
              { term: 'Composition', def: "A stronger 'contains-a' relationship where the part cannot exist without the whole (filled diamond)." },
              { term: 'Inheritance/Generalization', def: "An 'is-a' relationship representing inheritance (hollow triangle arrow)." },
              { term: 'Dependency', def: 'A weaker relationship where one class depends on another (dashed arrow).' },
              { term: 'Realization/Implementation', def: 'Implementation of an interface (dashed line with hollow triangle).' },
            ],
          },
          {
            type: 'text',
            heading: '7.4.2.3 When to use Class Diagrams',
            text: 'Class diagrams are used in the following contexts:',
          },
          {
            type: 'bullets',
            items: [
              'In Object-oriented design and analysis (OOAD).',
              'For database schema design.',
              'For code generation.',
              'For system architecture documentation.',
            ],
          },
        ],
      },
      {
        number: '23',
        title: 'Sequence Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.3 Sequence Diagram',
            text: 'Sequence diagrams are behavioral diagrams that show how objects interact with each other in a particular scenario, emphasizing the time-ordered sequence of messages. They are particularly useful for modeling dynamic behavior and understanding the flow of control in a system.',
          },
          {
            type: 'text',
            heading: '7.4.3.1 Key Components',
            text: 'The key components of a Sequence diagram are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Lifelines', def: 'Represent individual participants (objects or actors) in the interaction. Shown as boxes at the top with dashed vertical lines extending downward representing the lifetime of the object.' },
              { term: 'Activation Boxes', def: 'Thin rectangles on lifelines indicating when an object is active or controlling the flow.' },
            ],
          },
          {
            type: 'text',
            text: 'Messages: Horizontal arrows between lifelines representing communication. Types include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Synchronous message', def: 'Solid arrow with filled head (sender waits for response).' },
              { term: 'Asynchronous message', def: 'Solid arrow with line head (sender does not wait).' },
              { term: 'Return message', def: 'Dashed arrow indicating return from a method call.' },
              { term: 'Self message', def: 'Message from an object to itself.' },
            ],
          },
          {
            type: 'text',
            text: 'Combined Fragments: Frames that enclose interactions to show control structures:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'alt (alternative)', def: 'Conditional logic (if-else).' },
              { term: 'opt (option)', def: 'Optional behavior (if without else).' },
              { term: 'loop', def: 'Repeated behavior.' },
              { term: 'par (parallel)', def: 'Concurrent execution.' },
            ],
          },
          {
            type: 'text',
            text: 'Figure 7.2 shows a sequence diagram of a working bank ATM, illustrating the objects (lifelines) that participate in a withdrawal — the Customer, the ATM Machine, the Bank account, and the Accounts store — and the messages exchanged between them in the order they occur.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/sequence-diagram-atm-withdrawal.png',
            width: 1800, height: 1210,
            caption: 'Figure 7.2: Sequence diagram of a working bank ATM withdrawal',
          },
          {
            type: 'text',
            heading: '7.4.3.2 When to use Sequence Diagrams',
            text: 'Sequence diagrams are used in the following contexts:',
          },
          {
            type: 'bullets',
            items: [
              'When modeling specific use case scenarios.',
              'For understanding message flow between objects.',
              'For detailed design of method interactions.',
              'For debugging and troubleshooting communication issues.',
            ],
          },
        ],
      },
      {
        number: '24',
        title: 'Activity Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.4 Activity Diagrams',
            text: 'Activity diagrams are behavioral diagrams that model the flow of control or data through a system, showing the sequence of activities and the decisions that affect the flow. They are similar to flowcharts but provide more sophisticated modeling capabilities for concurrent and parallel processes.',
          },
          {
            type: 'text',
            heading: '7.4.4.1 Key Components',
            text: 'The key components of an Activity diagram are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Initial Node', def: 'Filled circle marking the start of the activity flow.' },
              { term: 'Final Node', def: 'Circle with a filled inner circle representing the end of all flows (activity final) or a circle with a cross representing the end of a single flow (flow final).' },
              { term: 'Action', def: 'Rounded rectangle representing a single step or operation in the workflow.' },
              { term: 'Decision Node', def: 'Diamond shape representing a conditional branch where the flow splits based on a condition (with guards on outgoing edges).' },
              { term: 'Merge Node', def: 'Diamond shape where multiple flows converge into a single flow.' },
              { term: 'Fork Node', def: 'Thick horizontal or vertical bar where a single flow splits into multiple concurrent flows.' },
              { term: 'Join Node', def: 'Thick horizontal or vertical bar where multiple concurrent flows synchronize into a single flow.' },
              { term: 'Swimlanes (Partitions)', def: 'Vertical or horizontal divisions that organize activities based on who performs them or which system component is responsible.' },
              { term: 'Control Flow', def: 'Arrows showing the order in which activities are performed.' },
              { term: 'Object Flow', def: 'Shows how data or objects move between activities.' },
            ],
          },
          {
            type: 'text',
            heading: '7.4.4.3 When to use Activity Diagrams',
            text: 'Activity diagrams are used in the following contexts:',
          },
          {
            type: 'bullets',
            items: [
              'For business process modeling.',
              'For workflow documentation.',
              'For algorithm representation.',
              'For modeling concurrent and parallel processes.',
            ],
          },
        ],
      },
      {
        number: '25',
        title: 'State Chart Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.5 State Chart Diagram',
            text: 'State Chart diagrams (also called State Machine diagrams) are behavioral diagrams that model the dynamic behavior of a system by showing how an object transitions through different states in response to events. They are particularly useful for modeling event-driven systems and lifecycle modeling.',
          },
          {
            type: 'text',
            heading: '7.4.5.1 Key Components',
            text: 'State: Rounded rectangle representing a condition or situation during the life of an object. States can have:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Name', def: 'Identifier for the state.' },
              { term: 'Entry action', def: 'Action performed when entering the state.' },
              { term: 'Exit action', def: 'Action performed when exiting the state.' },
              { term: 'Do activity', def: 'Ongoing activity while in the state.' },
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Initial State', def: 'Filled circle indicating the starting point of the state machine.' },
              { term: 'Final State', def: 'Circle with a filled inner circle representing the termination of the state machine.' },
            ],
          },
          {
            type: 'text',
            text: 'Transition: Arrow from one state to another, labeled with:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Event', def: 'Trigger that causes the transition to occur.' },
              { term: 'Guard condition', def: 'Boolean expression that must be true for transition to occur.' },
              { term: 'Action', def: 'Operation performed during the transition.' },
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Composite State', def: 'State that contains sub-states, allowing hierarchical state modeling.' },
              { term: 'History State', def: 'Special pseudo-state that remembers the last active sub-state when exiting a composite state.' },
            ],
          },
          {
            type: 'text',
            heading: '7.4.5.3 When to use a State chart',
            text: 'State chart diagrams are used in the following contexts:',
          },
          {
            type: 'bullets',
            items: [
              'For the modeling of object lifecycle.',
              'For modeling user interface behavior.',
              'In protocol specifications.',
              'For modeling embedded systems and control logic.',
            ],
          },
        ],
      },
      {
        number: '26',
        title: 'Component Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.6 Component Diagram',
            text: 'Component diagrams are structural diagrams that show the organization and dependencies among physical or logical components in a system. They illustrate the high-level architecture and help visualize how software components are interconnected.',
          },
          {
            type: 'termlist',
            heading: '7.4.6.1 Key Components',
            items: [
              { term: 'Component', def: 'Represented as a rectangle with a component icon (two smaller rectangles on the left side). Components are modular, deployable, and replaceable parts of a system that encapsulate implementation and expose interfaces.' },
            ],
          },
          {
            type: 'text',
            text: 'Interface: Contract that specifies operations a component provides or requires:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Provided Interface', def: 'Services the component offers to others (shown as a lollipop or ball on a stick).' },
              { term: 'Required Interface', def: 'Services the component needs from others (shown as a socket or semicircle).' },
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Port', def: 'Interaction point between a component and its environment through which provided and required interfaces are exposed.' },
              { term: 'Dependency', def: 'Dashed arrow showing that one component depends on another.' },
              { term: 'Assembly Connector', def: 'Links a required interface of one component to a provided interface of another, showing how components are wired together.' },
            ],
          },
          {
            type: 'text',
            heading: '7.4.6.3 When to use Component Diagrams',
            text: 'Component diagrams are used in the following contexts:',
          },
          {
            type: 'bullets',
            items: [
              'System architecture design.',
              'Modeling physical system structure.',
              'Component-based development.',
              'Documenting software libraries and frameworks.',
            ],
          },
        ],
      },
      {
        number: '27',
        title: 'Deployment Diagrams',
        sections: [
          {
            type: 'text',
            heading: '7.4.7 Deployment Diagrams',
            text: 'Deployment diagrams are structural diagrams that model the physical deployment of software artifacts on hardware nodes. They show the runtime configuration of hardware devices, execution environments, and how software components are distributed across the infrastructure.',
          },
          {
            type: 'text',
            heading: '7.4.7.1 Key Components',
            text: 'Node: Three-dimensional box representing a computational resource (physical or virtual) where artifacts are deployed. Types include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Device Node', def: 'Physical hardware (servers, workstations, mobile devices, sensors).' },
              { term: 'Execution Environment Node', def: 'Software container or platform (OS, JVM, web server, database server).' },
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Artifact', def: 'Physical piece of information used or produced by a software development process. Represented as a rectangle with an artifact icon. Examples include executable files (exe, jar), libraries (.dll, .so), configuration files, database schemas, and documents.' },
              { term: 'Communication Path', def: 'Line connecting nodes representing network connections or communication protocols (e.g., HTTP, TCP/IP, JDBC).' },
              { term: 'Deployment Specification', def: 'Configuration details for deployed artifacts, such as memory requirements, processor specifications, or deployment parameters.' },
              { term: 'Manifestation', def: 'Dashed arrow with «manifest» stereotype showing that an artifact implements or realizes a component.' },
            ],
          },
          {
            type: 'text',
            heading: '7.4.7.3 When to use Deployment Diagrams',
            text: 'Deployment diagrams are used in the following contexts:',
          },
          {
            type: 'bullets',
            items: [
              'Infrastructure planning and documentation.',
              'System deployment and installation planning.',
              'Performance analysis and capacity planning.',
              'Cloud and distributed system architecture.',
            ],
          },
          {
            type: 'text',
            heading: '7.5 Summary',
            text: 'UML provides a comprehensive and standardized approach to modeling software systems. The seven diagram types covered in this chapter serve different purposes:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Use Case diagrams', def: 'capture functional requirements and user interactions.' },
              { term: 'Class diagrams', def: 'define the static structure and relationships of system components.' },
              { term: 'Sequence diagrams', def: 'illustrate time-ordered message exchanges between objects.' },
              { term: 'Activity diagrams', def: 'model workflow and business processes.' },
              { term: 'State Chart diagrams', def: 'represent state-dependent behavior and lifecycle.' },
              { term: 'Component diagrams', def: 'show the organization of software modules and their dependencies.' },
              { term: 'Deployment diagrams', def: 'depict physical deployment and runtime infrastructure.' },
            ],
          },
          {
            type: 'text',
            text: 'Together, these diagrams provide a complete toolkit for systems analyst and software engineers to analyze, design, document, and communicate complex systems effectively. Mastery of UML enables better collaboration among development teams, clearer communication with stakeholders, and more robust system design. As software systems continue to grow in complexity, UML remains an essential skill for undergraduate students pursuing careers in software engineering and related fields.',
          },
          {
            type: 'bullets',
            heading: 'Review Questions',
            items: [
              "University of Uyo students' course registration process involves the following steps: (a) a student submits a course registration form; (b) the department reviews the course selection; (c) if approved, the finance office verifies fee payment; (d) if payment is confirmed, the student is registered; (e) if payment is not confirmed, the student is notified to complete payment. Draw a BPMN diagram representing the above process. Identify and explain the following BPMN components used in your diagram: Events, Activities, Gateways and Sequence flows.",
              'A university plans to develop a Library Management System with the following functions: (a) register library members; (b) manage book inventory; (c) issue and return books; (d) calculate fines for overdue books; (e) generate reports on book usage. Develop a Sequence diagram for the Library Management System.',
              'A hospital outpatient appointment system follows these steps: (a) a patient requests an appointment; (b) the receptionist checks doctor availability; (c) if the doctor is available, an appointment is scheduled; (d) if the doctor is not available, the patient is asked to choose another date; (e) the patient receives confirmation of the appointment. Draw a use case diagram to represent the outpatient appointment process.',
            ],
          },
        ],
      },
    ];
