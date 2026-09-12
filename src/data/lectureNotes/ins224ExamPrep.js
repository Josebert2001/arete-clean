// INS 224 — Systems Analysis and Design. Written (non-CBT) exam preparation bank.
//
// Sourced entirely from the transcribed lecture notes in src/data/courses.js
// (the INS 224 entry, topics 1-27). The notes are organised as seven numbered
// chapters, and six of the seven end with the lecturer's own Review Questions
// block; chapter 1 calls its block "Revision Questions". Those 44 questions are
// the backbone of this bank — each one is reproduced as a `longform` question
// with a model answer and a mark scheme written from the chapter it came from,
// exactly as the standing convention requires. The recall drills around them
// are the lists the notes actually enumerate (the five components of an
// information system, the seven SDLC phases, the DFD symbols, and so on) —
// the material a written paper asks you to name before it asks you to discuss.
//
// Every question carries a `chapter` label, which is what the chapter picker in
// CourseExamPrep.jsx groups on: a student revising only the SDLC models draws
// from chapter 4 alone. `source` stays the finer "where to re-read" pointer,
// naming the topic and the numbered heading inside it.
//
// Where a review question asks for a drawing (a level-2 DFD, a BPMN diagram, a
// sequence diagram), the model answer describes the diagram in words precisely
// enough to draw it — elements, labels and connections named in order — since a
// text answer cannot print one. The notes' own worked figures are named as the
// pattern to copy.
//
// Mark values in each markScheme entry sum to the question's `marks`.

export const ins224ExamPrep = [
  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 1 — INTRODUCTION TO SYSTEMS ANALYSIS AND DESIGN
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.2.1 What Is a System? / 1.2.2 The Essential Characteristics of Systems',
    question: 'Define a system. Explain any FOUR characteristics of a system with relevant examples.',
    modelAnswer: "The word system comes from the Greek systema, meaning an organized relationship between a set of components to accomplish a specific purpose, goal or objective. Wasson (2005) defines a system as an orderly grouping of interdependent components linked together according to a plan to achieve a specific goal. Four of its defining characteristics are as follows. First, purpose and goals: every system exists for a reason, and without a clearly stated purpose you cannot judge whether the system is working or decide which components belong in it — a manufacturing system exists to produce goods, while a customer service system may exist to minimise cost, to maximise satisfaction, or both, and each purpose leads to a different design. Second, inputs and outputs: a system takes inputs from its environment, processes them, and produces outputs — a manufacturing system takes in raw materials and produces finished goods, while an information system takes in data and produces information, decisions or actions. Third, boundaries: every system has a boundary separating what is inside it from what is outside, which may be physical (the walls of a warehouse) or conceptual (a customer service system covers enquiries, ticketing and resolution but not product development); the boundary decides what you are responsible for, and it is usually where problems occur, because it is where your system meets other systems. Fourth, feedback and control: a system needs a mechanism to monitor its own performance and adjust — a thermostat measures temperature (feedback), compares it with the target (control) and switches heating on or off; in an organisation the same loop is built from satisfaction surveys, sales figures and quality measurements. Other characteristics the notes give are components and relationships, interdependence, and hierarchy and decomposition.",
    markScheme: [
      'System correctly defined — an orderly grouping of interdependent components linked according to a plan to achieve a specific goal (2)',
      'First characteristic named and explained with an example (2)',
      'Second characteristic named and explained with an example (2)',
      'Third characteristic named and explained with an example (2)',
      'Fourth characteristic named and explained with an example (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.1.2 Relationship between Systems Analysis and Systems Design',
    question: 'Differentiate between Systems Analysis and Systems Design. Highlight at least FOUR differences between the two concepts.',
    modelAnswer: "Systems analysis is the study of the current state and the desired future state of a situation. It is investigative and diagnostic: the analyst asks what problem is to be solved, what the business actually needs, how the present system works and where it is inefficient, what the constraints and requirements are, who the stakeholders are and what data must be collected, processed and reported. Systems design is the creation of a blueprint for the solution. It is creative and prescriptive: the designer asks what architecture will serve the need, how the data should be organised, what components are required and how they should interact, what technologies to adopt, and how security, reliability and performance will be achieved. The differences follow from this. (i) The question asked: analysis asks what and why, design asks how. (ii) Its nature: analysis is investigation and discovery of what already exists or is needed, while design is synthesis and choice among alternatives. (iii) Its output: analysis produces findings, requirements and specifications, while design produces architectures, data models and technical blueprints from which the system is built. (iv) Its position: analysis comes first and feeds design, so a design built on shallow analysis will faithfully solve the wrong problem. The two are nevertheless symbiotic rather than strictly sequential: as you design you uncover constraints and dependencies that force you back into analysis, so in practice the activities iterate until both the problem and the solution are clear. Many projects fail precisely because analysis is shortchanged — a cursory requirements exercise, some assumptions, then straight into building, with the wrong assumptions discovered halfway through when rework is expensive.",
    markScheme: [
      'Systems analysis defined — investigative and diagnostic, establishing the problem and what the business needs (2)',
      'Systems design defined — creative and prescriptive, producing the blueprint for the solution (2)',
      'Difference 1: analysis asks what and why, design asks how (1.5)',
      'Difference 2: analysis is discovery/investigation, design is synthesis and choice (1.5)',
      'Difference 3: analysis outputs requirements and findings, design outputs architecture, data models and specifications (1.5)',
      'Difference 4: analysis precedes and feeds design, but the relationship is iterative, not one-way (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.2.3-1.2.7 Characteristics of Systems / 1.5.1 Components of an Information System',
    question: 'Describe the components of a system. Explain the roles of input, process, output, feedback and control in an information system.',
    modelAnswer: "A system consists of multiple components that stand in defined relationships to one another; in an information system those components are five — hardware (the physical equipment: computers, servers, storage, networking), software (the programs in which the system's logic, rules and algorithms live), data (the records the system collects, stores, processes and produces, often its most valuable asset), processes (the procedures and workflows people follow when using the system) and people (the stakeholders: the management responsible for the system, the users inside and outside the organisation, and the IT staff who build and support it). The components are interdependent: hardware cannot be chosen without knowing what software will run on it, software cannot be designed without knowing what data it will process, and processes cannot be designed without considering the people who must follow them. The operating cycle of the system is then input → process → output, with feedback and control wrapped around it. Input is what the system receives from its environment — the data captured from forms, sensors, transactions or users. Process is the transformation the system applies to that input: validating, calculating, sorting, storing, matching against rules. Output is what the system produces for its environment — reports, information, decisions or actions — and it must be in the right format and available at the right time to be useful. Feedback is information about the system's own performance returned to it, such as satisfaction surveys, sales metrics or quality measurements. Control is the comparison of that feedback against the target and the adjustment made in response — the thermostat reads the temperature (feedback), compares it with the setting and switches the heating (control). Without feedback and control a system cannot learn or adapt; it goes on doing what it has always done even after it stops working. Diagnosing a failing system means asking which of these is at fault: bad input (garbage in, garbage out), faulty processing, or correct output delivered in the wrong form or too late.",
    markScheme: [
      "Components of a system described, with an information system's five named — hardware, software, data, processes, people (2.5)",
      'Input explained — what the system receives from its environment (1.5)',
      'Process explained — the transformation applied to the input (1.5)',
      'Output explained — what the system produces, in the right format and at the right time (1.5)',
      'Feedback explained — information about the system’s own performance returned to it (1.5)',
      'Control explained — comparing feedback against the target and adjusting, with an example such as the thermostat (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.5 Information Systems',
    question: 'A university intends to develop a new student registration system. What is an information system?',
    modelAnswer: "An information system is a specific type of system designed to collect, process, store and distribute information in order to support decision-making and organisational operations. It is an interconnected set of information resources, under direct management control, that manages data for a particular organisation, and it comprises hardware, software, communications, data and applications that together produce information according to the organisation's needs. Its five components are hardware, software, data, processes and people, and they are interdependent. Airline seat reservation systems, banking systems and learning management systems are standard examples. The proposed student registration system is exactly such a system: its inputs are the student's details and course selections, its data are the student, course and fee records, its processes are the university's registration and eligibility rules, its people are the students, departmental officers and finance staff who use it, and its outputs are confirmed registrations, class lists and the reports on which departmental decisions are taken.",
    markScheme: [
      'Information system defined — collects, processes, stores and distributes information (2)',
      'Purpose stated — to support decision-making and organisational operations (1)',
      'Components named — hardware, software, data, processes, people (or hardware, software, communications, data and applications) (1)',
      'Applied to the student registration example, or another valid example given (1)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.6 The System Analyst / 1.6.1 The Systems Analyst Responsibilities',
    question: 'List FIVE responsibilities of a systems analyst.',
    items: [
      { name: 'Analyse the business situation in the organisation', aliases: ['analyze the business situation', 'study the business'], explain: 'The analyst studies how the organisation actually operates before proposing anything — the notes make this the first of the three duties that define the role.' },
      { name: 'Identify solutions for improvement', aliases: ['identify solutions', 'propose improvements'], explain: 'Having understood the situation, the analyst works out what could be done better and puts forward the options.' },
      { name: 'Model the analysis findings toward the improvement', aliases: ['model the findings', 'modelling'], explain: 'The findings are turned into models — diagrams and specifications — that the project team can build from.' },
      { name: 'Gather the necessary data and develop the plan for the new system', aliases: ['gather data', 'requirements gathering', 'develop the plan'], explain: 'The notes call this the actual work of the role: the analyst is the person whose work is central to the whole system development.' },
      { name: 'Work with, and reconcile, every group the project touches', aliases: ['liaise with stakeholders', 'resolve conflicts', 'work with the project team'], explain: 'Customers and clients, technical people (network administrators, programmers), business people (the steering committee and stakeholders), and vendors and consultants — the role is multifaceted because there are many people to satisfy and many conflicts to resolve.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.6.1 The Systems Analyst Responsibilities (Figure 1.4)',
    question: 'Name the SIX roles a systems analyst may take, and state the focus of each.',
    items: [
      { name: 'Business analyst', aliases: ['business'], explain: 'Focuses on the business issues surrounding the system.' },
      { name: 'Requirement analyst', aliases: ['requirements analyst'], explain: 'Focuses on eliciting the requirements from the stakeholders associated with the new system.' },
      { name: 'Infrastructure analyst', aliases: ['infrastructure'], explain: "Focuses on the technical issues surrounding the ways the system will interact with the organisation's technical infrastructure — hardware, software, networks and databases." },
      { name: 'Software architect', aliases: ['architect'], explain: "Takes the holistic view of the organisation's entire IT environment and guides application design decisions within that context." },
      { name: 'Change management analyst', aliases: ['change management'], explain: 'Focuses on the people and management issues surrounding the system installation.' },
      { name: 'Project manager', aliases: ['project management'], explain: 'A seasoned systems analyst who ensures the project is completed on time and within budget and that the system delivers the expected value to the organisation.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.2.5 Boundaries',
    question: 'What is meant by system boundary?',
    modelAnswer: "A system boundary is the line that defines what is inside the system and what is outside it. Boundaries may be physical — the walls of a warehouse define the boundary of the warehouse system — or conceptual: a customer service system includes customer interactions, ticket management and resolution processes, but not product development. Boundaries matter for two reasons. First, they determine responsibility: what you must manage and design, as against what you may treat as stable and external. Second, a system's boundary is very often where problems occur, because it is precisely where your system meets other systems. If payment processing falls inside your order system's boundary, you are responsible for making that integration work; if it falls outside, you are responsible instead for understanding the interface between your system and the payment processor. Drawing the boundary is therefore one of the first acts of analysis — in a context diagram it is the single process bubble, and everything drawn outside it as an external entity is beyond the boundary.",
    markScheme: [
      'Boundary defined — what is inside the system as against what is outside (2)',
      'Boundaries may be physical or conceptual, with an example of each (1.5)',
      'Why it matters — it fixes responsibility, and boundaries are where problems occur because they are where systems meet (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.3.1-1.3.9 The Importance of Systems Analysis and Design',
    question: 'Discuss the importance of systems analysis and design in the successful development of information systems. (Discuss any SIX.)',
    modelAnswer: "Systems analysis and design matter for eight reasons in the notes; any six discussed fully will earn the marks. (1) Preventing costly mistakes. Building a system without analysis and design is like building a house without blueprints: it may look sound while structural faults wait to surface. Fixing a mistake after the system is built costs exponentially more than preventing it, and a NIST study found design flaws account for nearly 30% of the cost of software development — flaws that analysis and design catch before a line of code is written. (2) Aligning with business goals. Systems exist to serve a business purpose, and a system that does not align with that purpose wastes resources. Many failed projects were technically sound but solved the wrong problem; analysis establishes what the business actually needs rather than what the team assumes or finds technically interesting. (3) Managing complexity. Modern systems involve many technologies, teams, stakeholders and dependencies. Analysis gives a structured way to break that complexity into manageable pieces; design gives a way to organise the pieces so they cohere. (4) Enabling communication. The requirements and blueprints produced become a common language: developers learn what to build, managers what it will cost and how long it will take, and customers what they are getting. Without them each group holds a different picture of the same system. (5) Facilitating change. Analysis records why decisions were taken and design records how components interact, so when requirements change the team can see what a modification will affect. A poorly designed system is fragile — change one thing and something unrelated breaks. (6) Supporting scalability. A system designed for 100 users may not survive 10,000; designing for growth from the start is far cheaper than retrofitting it. (7) Ensuring quality. Quality cannot be tested in, it must be designed in: analysis establishes what quality means for this system, and design builds reliability, performance, security and maintainability into it. (8) Reducing risk — of building the wrong thing, of running late or over budget, of failing on deployment, of being insecure. Analysis and design surface risks early, when they are cheap to address, and support mitigation and contingency planning.",
    markScheme: [
      'First reason named and discussed, not merely listed (2)',
      'Second reason named and discussed (2)',
      'Third reason named and discussed (2)',
      'Fourth reason named and discussed (2)',
      'Fifth reason named and discussed (2)',
      'Sixth reason named and discussed (2)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.5.3 Levels of Information / 1.5.2 Modern Information Systems',
    question: 'Describe the different types of information systems and their applications in modern organizations.',
    modelAnswer: "Information systems are classified by the level of the organisation they serve, and the notes give three. Operational information is required by low-level management for daily and short-term planning, to carry out day-to-day operational activities. Its users are the clerical, operational and administrative staff who have the most day-to-day contact with the system, and the processing involved is keeping employee attendance records, tracking overdue purchase orders, holding the current inventory of goods available, and recording daily revenues, payments received and invoices. Managerial or supervisory information is required by middle management for short and intermediate range planning, measured in months — sales analysis, cash flow projections and annual financial statements — and is delivered by a management information system (MIS). Strategic information is required by top management for long-term policy planning over the next several years — trends in revenues, financial investments, human resources and population growth — and is delivered by a decision support system (DSS). The higher the level, the longer the time horizon, the more summarised the information and the less structured the decision it supports. Modern organisations add internet-based systems to these, since business today is shaped by rapid globalisation, technology integration across laptops and smartphones, and the growth of cloud computing. The standard form is a series of web pages providing a user interface that communicates with database management software and a web-based data server. E-commerce takes two forms: business to consumer (B2C), a computerised system that facilitates the exchange of products, services and information directly between businesses and individual consumers over the internet; and business to business (B2B), which supports the exchange of information, products, services and transactions between business organisations to improve operational efficiency and collaboration.",
    markScheme: [
      'Operational information described, with its users and an example of the processing involved (2)',
      'Managerial or supervisory information described, with its time horizon and MIS named (2)',
      'Strategic information described, with its time horizon and DSS named (2)',
      'The three levels tied to the level of management served and how the information changes as you go up (1.5)',
      'Modern internet-based systems covered, with B2C and B2B distinguished (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.4.1 Open vs. Closed Systems',
    question: 'Explain the concepts of open systems and closed systems with examples.',
    modelAnswer: "A closed system has minimal interaction with its environment. It is self-contained and exchanges little with the outside world, so it can largely be understood on its own terms. Truly closed systems are rare in practice; the nearest examples are found in a laboratory or a tightly controlled manufacturing environment. An open system interacts extensively with its environment: it takes inputs from that environment, produces outputs for it, and is itself influenced by environmental change. Most real-world systems are open. A business is an open system because it interacts continuously with customers, suppliers, competitors and regulators, and must respond when any of them change. The distinction matters for the analyst because an open system is harder to analyse and design: you must understand not only the system itself but also the environment it operates in and how changes in that environment will affect it — which is why boundary definition and the interfaces across the boundary get so much attention in analysis.",
    markScheme: [
      'Closed system defined — minimal interaction with its environment, self-contained (1.5)',
      'Open system defined — exchanges inputs and outputs with its environment and is influenced by it (1.5)',
      'A valid example of each, noting that truly closed systems are rare and most real systems are open (1.5)',
      'Consequence for the analyst — an open system requires the environment and its changes to be analysed too (1.5)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.4 Types of Systems',
    question: 'Name the FOUR ways of classifying systems given in the notes, stating both sides of each pair.',
    items: [
      { name: 'Open vs. closed', aliases: ['open and closed'], explain: 'An open system exchanges inputs and outputs with its environment and is influenced by it; a closed system is self-contained and interacts with its environment minimally.' },
      { name: 'Technical vs. organizational', aliases: ['technical and organisational', 'technical vs organisational'], explain: 'A technical system is built chiefly of machines, equipment or software; an organizational system is built chiefly of people, processes and structures. Most real systems are hybrids — a hospital has equipment, and also doctors, nurses and procedures.' },
      { name: 'Static vs. dynamic', aliases: ['static and dynamic'], explain: 'A static system is relatively stable over time; a dynamic system changes and evolves constantly. Most modern systems are dynamic, which is why flexibility matters in design.' },
      { name: 'Deterministic vs. probabilistic', aliases: ['deterministic and probabilistic'], explain: 'A deterministic system gives the same output for the same input every time; a probabilistic system gives outputs that vary even for identical inputs — you cannot predict exactly how long a support ticket will take to resolve.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 1 · Introduction to SAD',
    source: 'Topic 1 · 1.5.1 Components of an Information System (Figure 1.2)',
    question: 'Name the FIVE components of an information system and state what each contributes.',
    items: [
      { name: 'Hardware', aliases: ['physical equipment'], explain: 'The physical equipment — computers, servers, storage devices, networking equipment, printers — that provides the platform on which software runs and data is stored. Hardware decisions drive performance, reliability, scalability and cost.' },
      { name: 'Software', aliases: ['programs', 'applications'], explain: "The programs and applications — operating systems, databases, business applications, custom code — in which the system's logic lives: the rules, algorithms and processes that turn inputs into outputs." },
      { name: 'Data', aliases: ['information', 'records'], explain: 'What the system collects, stores, processes and produces. Often the most valuable component: a customer database represents years of accumulated knowledge. Data design settles what to collect, how to organise it, how to assure its quality and how to protect it.' },
      { name: 'Processes', aliases: ['procedures', 'workflows'], explain: 'The procedures and workflows people follow when using the system — how data flows, how decisions are made, how exceptions are handled. A system is only as good as the processes that govern its use.' },
      { name: 'People', aliases: ['stakeholders', 'users'], explain: 'The stakeholders: the management group responsible for the system, the users inside and outside the organisation, and the IT staff — analysts, programmers, network administrators — who develop and support it. A well-designed system that people will not use still fails.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 2 — FEASIBILITY STUDY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.1.2 Causes vs. Symptoms',
    question: 'Distinguish between a symptom and a root cause in the context of problem identification. Provide an original example.',
    modelAnswer: "A symptom is an observable effect of an underlying problem — the thing people notice and complain about. A root cause is the actual source of the dysfunction, the condition that produces the symptom. Confusing the two is a common pitfall in problem identification, and it is expensive: a system built to remove a symptom leaves the cause untouched, so the symptom returns in another form. The notes illustrate the distinction with pairs such as customers complaining about long wait times (symptom) caused by an inefficient manual data-entry process (root cause), frequently inaccurate reports (symptom) caused by a lack of data validation in the system (root cause), consistent staff overtime (symptom) caused by inadequate system automation (root cause), and duplicate records in the database (symptom) caused by the absence of unique key constraints (root cause). An original example: in a university, lecturers complain that examination results are published late each semester — that is the symptom. Tracing it back, results are late because each department compiles scores in separate spreadsheets that must be manually merged and re-keyed by the examinations office, and every keying error must be queried and corrected before publication; the root cause is the absence of a single shared score-entry system with validation at the point of entry. Hiring extra clerks would ease the symptom for one semester; removing the re-keying removes the cause. To get from one to the other, analysts use techniques such as the 5 Whys, asking why repeatedly until the chain of causes ends, and cause-and-effect (fishbone) diagrams, which group candidate causes by category so that none is overlooked.",
    markScheme: [
      'Symptom defined — an observable effect of an underlying problem (2)',
      'Root cause defined — the actual source of the dysfunction (2)',
      'An original example given, naming both the symptom and the cause behind it (2)',
      'A tracing technique named — the 5 Whys, or a cause-and-effect (fishbone) diagram (1)',
      'Consequence stated — treating the symptom leaves the cause in place, so the problem recurs (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.2.1 Interviews / 2.2.2 Questionnaires and Surveys',
    question: 'Compare and contrast interviews and questionnaires as fact-finding techniques. Under what circumstances would each be preferred?',
    modelAnswer: "An interview is a direct conversation between the analyst and a key stakeholder — a manager, end user or technical staff member. It may be structured, following a predetermined set of questions so that responses can be compared; unstructured, open-ended and exploratory, useful for discovering issues a rigid format would miss; or semi-structured, combining the two. It is the most widely used fact-finding technique. Its advantages are that it yields rich, detailed information, gives the analyst the opportunity to probe deeper when an answer is incomplete or surprising, and builds rapport with the users whose cooperation the project will later need. Its disadvantages are that it is time-consuming, it is subject to interviewer bias, and interviewees may be reluctant to reveal problems, particularly where those problems reflect on them. A questionnaire distributes a set of written questions to a large group of users or stakeholders, and is useful when information is needed from many people spread across different locations. Its advantages are that it reaches a large audience quickly, its responses are easy to quantify, and it is less intimidating for the respondent than sitting across from an analyst. Its disadvantages are low response rates, the fact that an ambiguous question yields misleading data, and the absence of any opportunity for follow-up — a puzzling answer cannot be pursued. The contrast is therefore depth against breadth. An interview is preferred where the group is small and senior, where the subject matter is complex or sensitive, where the analyst does not yet know enough to frame precise questions, and where probing and rapport matter. A questionnaire is preferred where the population is large and geographically dispersed, where the questions are already well understood and can be asked unambiguously, where quantifiable responses are wanted so that findings can be counted and compared, and where budget and time do not permit interviewing everyone. In practice the two are combined: interviews first to discover what the issues are, then a questionnaire to establish how widely each issue is felt.",
    markScheme: [
      'Interviews described, with structured, unstructured and semi-structured distinguished (2)',
      'Questionnaires described — written questions distributed to a large, possibly dispersed group (2)',
      'Advantages and disadvantages of interviews given (2)',
      'Advantages and disadvantages of questionnaires given (2)',
      'Circumstances in which each is preferred, stated as depth against breadth (2)',
    ],
  },

  {
    type: 'longform',
    marks: 15,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.3 Types of Feasibility (Figure 3)',
    question: 'A retail company plans to implement an AI-powered stock management system. Conduct a brief feasibility analysis across all five dimensions, identifying at least ONE concern per dimension.',
    modelAnswer: "Technical feasibility asks whether the organisation has, or can acquire, the technology, hardware, software and technical expertise to build and operate the system. Concern: an AI forecasting model needs a clean, complete history of sales and stock movements to train on, and the retailer's records are likely to sit in point-of-sale and spreadsheet systems that were never designed to be joined; the company must also find or hire staff able to maintain a model in production, and must check that the system can integrate with the existing POS and supplier systems. Economic feasibility asks whether the financial benefits justify the costs. The costs here are development (software, hardware or cloud compute, labour, consultancy), implementation (data migration, installation, training) and operational (licensing, maintenance, support), plus the intangible cost of disruption during the transition; the benefits are tangible — lower holding costs, fewer stockouts and lost sales, less manual counting — and intangible, such as better buying decisions. Concern: AI projects carry uncertain benefit estimates, so the payback period may be far longer than the business expects; the case should be tested with break-even analysis, ROI, NPV or a payback calculation before funding. Operational feasibility asks whether the system will work within the organisation's people, processes and culture. Concern: store managers who currently decide re-order quantities by judgement may not trust a machine's recommendation and may override it, so the benefits never materialise — user acceptance, visible management support and training must all be planned for. Legal feasibility asks whether the system complies with applicable law, regulation, contracts and ethical standards. Concern: if the system consumes customer purchase data to forecast demand it must comply with the Nigeria Data Protection Act 2023 (and GDPR for any European-facing arm), and any third-party model, dataset or library used must be properly licensed; existing supplier contracts may also restrict how data is shared. Schedule feasibility asks whether the project can be delivered when it is needed. Concern: retail has a hard seasonal peak, and attempting to migrate stock data and retrain staff during the festive trading period would be reckless; the timeline must be tested with a Gantt chart, PERT or critical path analysis, and the risk of overrun assessed against the launch window. The five verdicts must finally be presented as one integrated conclusion rather than five isolated ones, because the dimensions interact — reducing cost by choosing unproven technology would immediately weaken technical feasibility.",
    markScheme: [
      'Technical feasibility explained and at least one concern identified for this system (3)',
      'Economic feasibility explained, with costs and benefits, and at least one concern identified (3)',
      'Operational feasibility explained and at least one concern identified (3)',
      'Legal feasibility explained and at least one concern identified (3)',
      'Schedule feasibility explained and at least one concern identified (3)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.3.3 Operational Feasibility / 2.4 The Interrelationship Among Feasibility Types',
    question: 'Why is operational feasibility often considered the most frequently underestimated dimension in practice?',
    modelAnswer: "Operational feasibility assesses whether the proposed system will actually work within the organisation's existing environment — its people, its processes and its culture. It is the dimension most often underestimated, for several connected reasons. First, the other dimensions are measurable and this one is not: technical capacity can be benchmarked, costs can be totalled, legal obligations can be looked up and schedules can be drawn on a Gantt chart, whereas user acceptance is a matter of behaviour and attitude that cannot be settled by calculation, and therefore tends to be assumed rather than investigated. Second, the people conducting the study are technical, and technical teams naturally weight technical and financial questions more heavily than human ones. Third, the factors that determine it are easy to overlook until late: user acceptance, meaning whether users willingly adopt and correctly use the system; management support, since projects without visible leadership endorsement often fail at the implementation stage; training requirements, since complex systems demand substantial training investment; and impact on jobs, since systems that threaten job security or significantly change roles meet strong resistance. Fourth, the failure appears only after deployment, when the money has already been spent, so the lesson arrives too late to influence the decision that caused it. The consequence is severe, because operational failure destroys the other dimensions' verdicts retrospectively: a system that ignores user resistance may never realise the economic benefits on which it was approved. The notes' example is an automated payroll system that is both technically and economically feasible, but whose operational feasibility is low because the HR department is unwilling to abandon established manual practices and fears job losses — unless change management strategies are put in place, the project should not proceed on the strength of the other four verdicts alone.",
    markScheme: [
      "Operational feasibility defined — whether the system will work within the organisation's people, processes and culture (2)",
      'Reason given: unlike the other dimensions it cannot be measured or calculated, so it is assumed rather than investigated (2)',
      'The factors that drive it named — user acceptance, management support, training requirements, impact on jobs (2)',
      'Consequence explained, with an example: operational failure prevents the economic benefits from ever being realised (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.4 The Interrelationship Among Feasibility Types / 2.3.5 Schedule Feasibility',
    question: 'Explain how a weakness in schedule feasibility can affect economic feasibility.',
    modelAnswer: "Schedule feasibility asks whether the project can be completed within the required timeframe; economic feasibility asks whether its benefits justify its costs. The two are linked because time is itself a cost. A schedule that overruns keeps the project team, the consultants and the infrastructure employed for longer than budgeted, and since labour is the largest component of development cost, weeks of delay convert directly into money spent. Second, delay defers the benefits: the savings or extra revenue on which the business case rests begin later than assumed, which lengthens the payback period and reduces net present value, because a benefit received later is worth less than the same benefit received now. A project approved on a 2.9-year payback may no longer be approvable on a four-year one. Third, the attempts made to recover a slipping schedule cost money in themselves — overtime, additional staff who must first be brought up to speed, or the purchase of licensed components rather than building them. Fourth, where the deadline is external — a regulatory compliance date, a product launch, the start of an academic session — missing it may forfeit the benefit entirely or attract a penalty, so the economic case collapses rather than merely weakening. This is one instance of the general principle that the five dimensions are not independent: a weakness in one undermines the others, which is why a feasibility study must present an integrated conclusion rather than five separate verdicts.",
    markScheme: [
      'The link stated — time is itself a cost, so a schedule weakness is an economic weakness (1.5)',
      'Overrun keeps the team and resources employed for longer, raising development cost (1.5)',
      'Delay defers the benefits, lengthening payback and reducing net present value (1.5)',
      'An external or regulatory deadline missed may forfeit the benefit entirely, or recovery actions add cost (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.0 Introduction to Feasibility Studies',
    question: 'What is a feasibility study? State the question it answers, how it differs from a full system analysis, and the dimensions it evaluates.',
    modelAnswer: "A feasibility study is a preliminary investigation conducted early in the systems development life cycle to assess whether a proposed system is achievable, practical and justified. More formally, it is a formal evaluation of a proposed project that examines whether the solution is technically possible, economically justified, operationally viable, legally compliant and achievable within the desired timeframe. It answers one fundamental question: should we develop this system at all? It differs from a full system analysis in purpose rather than in subject: analysis sets out to understand the problem in depth and specify what the system must do, and design sets out to produce the blueprint, whereas the feasibility study does neither — its goal is not to design the system but to decide whether the project should move forward. It evaluates the proposal across five dimensions: technical, economic, operational, legal and schedule feasibility. It is conducted by a systems analyst in collaboration with project stakeholders, and its output is a feasibility report submitted to decision-makers, typically a steering committee or senior management, which recommends proceeding with the project, modifying it, or abandoning it. As the notes put it, the report does not design the system; it evaluates whether design should begin.",
    markScheme: [
      'Feasibility study defined — a preliminary investigation into whether a proposed system is achievable, practical and justified (2)',
      'The question it answers stated — should we develop this system? (1)',
      'The five dimensions named — technical, economic, operational, legal, schedule (2.5)',
      'Distinguished from full analysis and design — it does not design the system, it decides whether design should begin (1.5)',
      'Who conducts it and what it produces — the analyst with stakeholders; a report recommending proceed, modify or abandon (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.1 Problem Identification / 2.1.1 The Problem Statement',
    question: 'What is a problem in systems analysis, and what must a well-written problem statement cover? Write a problem statement of your own that covers every element.',
    modelAnswer: "A problem in systems analysis is any gap between the current state of a system and the desired state. That gap shows itself as inefficiency in business processes such as slow order processing, as inaccurate or inaccessible information such as outdated inventory records, as high operational costs caused by manual effort, as failure to meet regulatory or compliance requirements, or as poor user satisfaction with an existing system. Once a problem is recognised, the analyst formulates a problem statement: a concise, unambiguous description of the issue. It must cover five things — what the problem is, where it occurs (which department, process or system), who is affected, when it occurs (its frequency and duration), and why it matters (its impact on the organisation). The notes' own example is: the accounts department manually reconciles purchase orders and invoices using spreadsheets, a process that takes three working days per month, is prone to human error, and has led to overpayments totalling ₦4.2 million in the last fiscal year. An original statement in the same form: in the Faculty of Science, course registration is captured on paper forms that departmental officers re-key into three separate spreadsheets at the start of each semester; the exercise occupies four officers for two weeks, affects roughly 3,200 students whose registrations cannot be confirmed until it is complete, and in the last session produced 180 disputed class lists that had to be reconciled by hand before results could be released. A statement written this way is testable — each element can be checked against evidence — which is what makes it usable as the basis of a feasibility study.",
    markScheme: [
      'Problem defined — a gap between the current state of a system and the desired state (1)',
      'At least two ways the gap manifests given — inefficiency, inaccurate information, high manual cost, non-compliance, poor satisfaction (1)',
      'All five elements of a problem statement named — what, where, who, when, why (2.5)',
      'An original problem statement written that covers every one of the five elements (1.5)',
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.3 Types of Feasibility',
    question: 'Name the FIVE dimensions of feasibility and state what each one assesses.',
    items: [
      { name: 'Technical feasibility', aliases: ['technical'], explain: 'Whether the organisation has, or can acquire, the technology, hardware, software and technical expertise needed to build and operate the system — including whether it can meet the required performance criteria and integrate with existing systems.' },
      { name: 'Economic feasibility', aliases: ['economic', 'cost-benefit analysis', 'financial feasibility'], explain: 'Whether the financial benefits justify the costs. Also called cost-benefit analysis, and arguably the most influential dimension since it directly affects the decision to fund the project.' },
      { name: 'Operational feasibility', aliases: ['operational'], explain: "Whether the system will work effectively within the organisation's existing people, processes and culture — user acceptance, management support, training and impact on jobs." },
      { name: 'Legal feasibility', aliases: ['legal'], explain: 'Whether the system complies with applicable laws, regulations, contractual obligations and ethical standards — data protection, intellectual property, industry-specific regulation, contracts and employment law.' },
      { name: 'Schedule feasibility', aliases: ['schedule', 'time feasibility'], explain: 'Whether the project can be completed within the required or desired timeframe, given its scope, the availability of people, and any external deadlines.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.2 Fact-Finding Techniques (Figure 2)',
    question: 'Name the SIX fact-finding techniques covered in the notes and state what each involves.',
    items: [
      { name: 'Interviews', aliases: ['interview'], explain: 'Direct structured, unstructured or semi-structured conversations between the analyst and key stakeholders — managers, end users and technical staff. The most widely used technique.' },
      { name: 'Questionnaires and surveys', aliases: ['questionnaires', 'surveys'], explain: 'A set of written questions distributed to a large group of users or stakeholders, useful when information is needed from many people across different locations.' },
      { name: 'Observation', aliases: ['observing users'], explain: 'The analyst watches workers performing their tasks in their natural work environment — valuable for understanding workflow, spotting bottlenecks, and verifying what interviews and questionnaires claimed.' },
      { name: 'Document review', aliases: ['document analysis', 'record review'], explain: 'Examining existing documents — organisational charts, procedure manuals, forms, reports, previous system documentation and data flow diagrams — for historical context and to validate other findings.' },
      { name: 'Joint Application Development (JAD)', aliases: ['JAD', 'joint application design'], explain: 'Structured group workshops bringing users, managers and IT professionals together under a facilitator, to reach consensus on requirements interactively.' },
      { name: 'Prototyping', aliases: ['prototype'], explain: 'Building a simple model of part of the proposed system and showing it to users to elicit feedback — useful when users cannot articulate requirements abstractly.' },
    ],
  },

  {
    type: 'recall',
    marks: 7,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.5 The Feasibility Report (Figure 4)',
    question: 'List the SEVEN components of a feasibility report.',
    items: [
      { name: 'Executive summary', aliases: ['summary'], explain: 'The condensed account for the decision-makers who will not read the full report.' },
      { name: 'Problem statement and objectives', aliases: ['problem statement', 'objectives'], explain: 'What the problem is and what the project is meant to achieve.' },
      { name: 'Description of proposed solutions (alternatives considered)', aliases: ['proposed solutions', 'alternatives'], explain: 'The options evaluated, not merely the one recommended — showing that alternatives were considered is part of the evaluation.' },
      { name: 'Assessment of each feasibility type', aliases: ['feasibility assessment'], explain: 'The verdict on each of the five dimensions, presented as an integrated conclusion rather than five isolated ones.' },
      { name: 'Recommended course of action', aliases: ['recommendation'], explain: 'Proceed, modify, or abandon.' },
      { name: 'Risks and mitigation strategies', aliases: ['risks', 'mitigation'], explain: 'What could go wrong, and what would be done about it.' },
      { name: 'Preliminary project plan and cost estimates', aliases: ['project plan', 'cost estimates'], explain: 'An outline plan and costing — preliminary, because the report evaluates whether design should begin rather than designing anything.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.3.2 Economic Feasibility',
    question: 'Name the FOUR common economic analysis tools used in assessing economic feasibility, and state what each measures.',
    items: [
      { name: 'Break-even analysis', aliases: ['break even'], explain: 'Determines when cumulative benefits equal cumulative costs.' },
      { name: 'Return on Investment (ROI)', aliases: ['ROI'], explain: 'Measures the financial return relative to the cost of the investment.' },
      { name: 'Net Present Value (NPV)', aliases: ['NPV'], explain: 'Accounts for the time value of money when comparing future benefits against current costs.' },
      { name: 'Payback period', aliases: ['payback'], explain: 'Estimates how long it takes before the investment is recovered — a ₦10 million system saving ₦3.5 million a year pays back in about 2.9 years.' },
    ],
  },

  {
    type: 'recall',
    marks: 3,
    chapter: 'Chapter 2 · Feasibility Study',
    source: 'Topic 2 · 2.3.5 Schedule Feasibility',
    question: 'Name the THREE common scheduling tools used in assessing schedule feasibility, and state what each does.',
    items: [
      { name: 'Gantt chart', aliases: ['gantt'], explain: 'A bar chart mapping tasks against a timeline, showing start and end dates and the dependencies between tasks.' },
      { name: 'PERT (Programme Evaluation and Review Technique)', aliases: ['PERT'], explain: 'Analyses task durations probabilistically to estimate the overall project duration.' },
      { name: 'Critical Path Method (CPM)', aliases: ['CPM', 'critical path'], explain: 'Identifies the longest sequence of dependent tasks, which determines the minimum possible project duration.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 3 — THE SOFTWARE DEVELOPMENT LIFE CYCLE
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.1 Definition of SDLC / 3.2 Why the SDLC Matters',
    question: 'Define the Software Development Life Cycle (SDLC) and explain why a structured approach to software development is necessary.',
    modelAnswer: "The Software Development Life Cycle is a structured, systematic process used by software engineers and project teams to plan, create, test, deploy and maintain software systems. It defines a series of well-defined phases, each with its own activities, deliverables and roles, which together guide a project from initial conception through to retirement. The term life cycle is deliberate: software, like a living organism, has a lifespan — it is born when it is planned and built, matures as it is deployed and used, ages as it is maintained and updated, and eventually retires when it is replaced or decommissioned. The classical SDLC has seven phases: planning, analysis, design, implementation, testing, deployment and maintenance. A structured approach is necessary because without one, development becomes chaotic: teams build the wrong thing, exceed budgets, miss deadlines, or deliver systems riddled with defects. The life cycle addresses those risks in five ways. It provides clarity of purpose at each stage, so everyone knows what is being decided now and what is deferred. It enables project management, because defined milestones and deliverables give something concrete to plan and track against. It facilitates communication among stakeholders, developers, testers and clients, who otherwise hold different pictures of the same system. It supports quality assurance by embedding testing and review at multiple points rather than leaving quality to the end. And it creates a traceable record of decisions and design choices, so that later maintainers can see why the system is as it is. The discipline was not always present: software development in the 1950s and 1960s was largely ad hoc, with programmers writing code to personal preference, and it was only as systems grew complex and failure grew costly that formal models — beginning with Winston Royce's articulation of the Waterfall model in 1970 — emerged.",
    markScheme: [
      'SDLC defined — a structured, systematic process to plan, create, test, deploy and maintain software, in well-defined phases (2)',
      'The life-cycle idea explained — born, matures, ages, retires (1)',
      'The seven phases named (2)',
      'At least three reasons a structured approach is necessary, from the five the notes give (3)',
      'The consequence of having no structure stated — wrong product, overrun budgets, missed deadlines, defects (1)',
      'Historical context — ad hoc practice in the 1950s-60s, formal models from Royce (1970) onward (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.2.1 Types of Requirements',
    question: 'Distinguish between functional and non-functional requirements. Give TWO examples of each for a university course registration system.',
    modelAnswer: "A functional requirement states what the system does — its behaviours, features and functions. It is verifiable by checking whether the stated behaviour occurs. The notes' example is \"the system shall allow users to reset their password via email.\" A non-functional requirement states how well the system performs, expressed as a quality attribute: performance, security, reliability, scalability, usability and maintainability are the usual categories. The notes' example is \"the system shall respond to any user request within 2 seconds under normal load.\" The distinction is therefore between capability and quality of service: functional requirements say what must be possible, non-functional requirements constrain how the system must behave while doing it. Both must be written to be testable; a non-functional requirement without a number is not verifiable and should not be accepted. For a university course registration system, two functional requirements would be: the system shall allow a student to register for courses up to the maximum credit units permitted for their level; and the system shall prevent registration for a course whose prerequisite the student has not passed. Two non-functional requirements would be: the system shall support 5,000 concurrent students during the registration window without response times exceeding three seconds; and the system shall encrypt all student records in transit and at rest, in compliance with the Nigeria Data Protection Act. Note that failing a functional requirement means the system cannot do something it must do, while failing a non-functional requirement means it does the right thing unacceptably — a registration system that works correctly but collapses in the first hour of the registration window has met its functional requirements and failed as a system.",
    markScheme: [
      'Functional requirement defined — what the system does: its behaviours, features and functions (1.5)',
      'Non-functional requirement defined — how well it performs, as quality attributes (1.5)',
      'Two valid functional requirements given for a course registration system (2)',
      'Two valid non-functional requirements given for a course registration system (2)',
      'The distinction sharpened — capability against quality of service, and both must be verifiable (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.3.1 Levels of Design',
    question: 'What is the difference between high-level design and low-level design? Illustrate your answer with examples.',
    modelAnswer: "Design proceeds at two levels. High-level design, also called architectural design, concerns the overall structure of the system: the decomposition of the system into subsystems or modules, the selection of an architectural pattern such as client-server, microservices or a layered architecture, the definition of the interfaces between the major components, and the technology stack decisions — programming language, database system and frameworks. It answers the question of what the major pieces are and how they fit together. Low-level design, also called detailed design, concerns the internal logic of the individual components: the data structures and algorithms used, the database schema (entity-relationship diagrams and normalisation), the user interface wireframes and screen layouts, the detailed class diagrams, sequence diagrams and state diagrams used in object-oriented design, and the data dictionary. It answers the question of how each piece works inside. To illustrate with a university result-processing system: the high-level design decides that the system is split into a registration subsystem, a score-entry subsystem and a reporting subsystem; that it will follow a three-layer architecture with a web front end, an application layer and a relational database; that the score-entry subsystem will expose a REST interface to the reporting subsystem; and that it will be built in Java over PostgreSQL. The low-level design then specifies the STUDENT, COURSE, ENROLMENT and SCORE tables with their keys and normalisation to third normal form, the algorithm that computes a weighted grade point average, the wireframe of the score-entry screen, and the class diagram of the classes implementing the grading rules. A useful way to express the relationship is that the design phase produces a logical and a physical blueprint: the logical design describes what components exist and how they relate, while the physical design specifies how those components will be implemented in concrete technology.",
    markScheme: [
      'High-level (architectural) design defined — the overall structure of the system (1.5)',
      'Its elements named — decomposition into subsystems, architectural pattern, interfaces between components, technology stack (1.5)',
      'Low-level (detailed) design defined — the internal logic of individual components (1.5)',
      'Its elements named — data structures and algorithms, database schema, UI wireframes, class/sequence/state diagrams, data dictionary (1.5)',
      'Illustrated with a worked example showing what each level decides for the same system (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.5.1 Levels of Testing / 3.5.5.2 Types of Testing',
    question: 'Describe FOUR types of software testing. For each type, state its purpose and indicate at what stage of the SDLC it is primarily conducted.',
    modelAnswer: "Unit testing tests individual functions or methods in isolation, to verify that each smallest unit of code is correct on its own. It is written and run by the developer, and although testing has its own phase, unit testing is conducted during the implementation (coding) phase, as an integral part of writing the code. Integration testing tests the interactions between combined modules, to verify that units that work individually also work together across their interfaces — the defects it finds are mismatches in data passed between modules rather than faults inside them. It is performed by the developer or tester as components are progressively integrated, at the boundary of implementation and testing. System testing tests the complete, integrated system against its requirements, to verify that the system as a whole behaves as specified. It is performed by the quality assurance team, and it is conducted in the testing phase. Acceptance testing is a conformance test performed by the user, client or end user, matching the delivered system against the business requirements for consistency; its purpose is validation — establishing that the right system was built, not merely that it was built right. It is conducted at the end of the testing phase, immediately before deployment, and its outcome is the client's sign-off. Beyond these levels, testing may also be categorised by approach: functional (black-box) testing verifies that features behave as specified; non-functional testing evaluates performance through load and stress testing, security through penetration testing, usability and reliability; regression testing re-runs existing tests after a change, to ensure new code has not broken previously working functionality, and is therefore conducted continuously through implementation, testing and maintenance; alpha testing is conducted by internal users within the development organisation, and beta testing by a selected group of external users in a real-world environment before general release. Whichever types are used, Dijkstra's principle holds: testing can show the presence of bugs, but not their absence — and the cost of fixing a defect rises dramatically the later it is found, so a defect caught in unit testing costs a fraction of the same defect found in production.",
    markScheme: [
      'First type named, its purpose stated, and the SDLC stage at which it is conducted identified (3)',
      'Second type named, purpose and stage identified (3)',
      'Third type named, purpose and stage identified (3)',
      'Fourth type named, purpose and stage identified (3)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.6.1 Deployment Strategies',
    question: 'Compare and contrast the "big bang" and "phased" deployment strategies. Under what circumstances would each be appropriate?',
    modelAnswer: "Big bang deployment, also called direct cutover, switches the old system off and the new system on simultaneously: at a single moment the entire user population moves across. Phased deployment, or incremental rollout, deploys the new system to a subset of users or locations first and then extends it gradually until the whole organisation is covered. The contrast between them is essentially one of risk against cost and duration. Big bang is simple to execute, needs no period of running two systems in parallel, avoids the difficulty of keeping two sets of data consistent, and delivers the benefits to everyone at once; but it is high-risk, because if problems arise there is no fallback, and every user is affected simultaneously. Phased deployment allows issues to be caught and resolved at small scale, limits the blast radius of any failure, lets the support team learn from the first group before facing the rest, and permits the rollout to be paused; but it takes longer, costs more to manage, and requires the old and new systems to interoperate and share data during the transition, which can be technically awkward. Big bang is appropriate where the system is small or the user population is small and homogeneous, where the old and new systems cannot sensibly run at once (for example where both would write to the same accounts), where a regulatory or contractual deadline forces a single switch date, and where the consequences of a short failure are tolerable. Phased deployment is appropriate where the organisation is large or spread across many locations or branches, where the system is business-critical so that a total failure cannot be risked, where the user base is diverse enough that different groups will meet different problems, and where there is time to roll out gradually. The notes give further strategies on the same spectrum — parallel running, where both systems run simultaneously and their outputs are compared, which is expensive but the highest safety net; pilot deployment to a single representative site; blue-green deployment between two identical production environments; and canary release, which routes a small percentage of users to the new version and raises the proportion as confidence grows.",
    markScheme: [
      'Big bang (direct cutover) defined — old system off and new system on simultaneously (2)',
      'Phased deployment (incremental rollout) defined — a subset of users or locations first, then gradually wider (2)',
      'Contrasted on risk, fallback and blast radius, and on cost and duration (2)',
      'Circumstances in which big bang is appropriate (2)',
      'Circumstances in which phased deployment is appropriate (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.7.1 Categories of Maintenance',
    question: 'Using the four-category classification of software maintenance (corrective, adaptive, perfective, preventive), classify each of the following maintenance activities, justifying each classification: (a) Fixing a login bug reported by users after the system went live. (b) Updating the system to support a newly mandated file format. (c) Adding a dashboard feature requested in a post-launch user survey. (d) Rewriting poorly structured code to improve future changeability.',
    modelAnswer: "(a) Fixing a login bug reported after go-live is corrective maintenance. Corrective maintenance is the repair of defects discovered after deployment — the system is failing to do what it was already specified to do, and the change restores the intended behaviour rather than adding anything. The notes' parallel example is patching a bug that causes incorrect tax calculations. (b) Updating the system to support a newly mandated file format is adaptive maintenance. Adaptive maintenance modifies the system so that it continues to work in a changed environment; here the environment has changed by regulation rather than by technology, but the principle is the same as the notes' example of updating software to run on a new operating system version — the system was not defective, its surroundings moved. (c) Adding a dashboard feature requested in a post-launch survey is perfective maintenance. Perfective maintenance enhances or extends the system's functionality in response to evolving user needs, exactly as in the notes' example of adding a new report type requested by users. This category accounts for the largest share of maintenance effort, typically 50-60%, because user needs continue to evolve throughout the system's life. (d) Rewriting poorly structured code to improve future changeability is preventive maintenance. Preventive maintenance makes changes that improve maintainability and forestall future problems without altering visible behaviour — the notes name refactoring code to reduce technical debt as the example. Nothing is broken and no user gains a feature today; the benefit is that the next change will be cheaper and less likely to introduce a regression.",
    markScheme: [
      '(a) Corrective maintenance, justified as repairing a defect found after deployment (2)',
      '(b) Adaptive maintenance, justified as modifying the system for a changed environment (2)',
      '(c) Perfective maintenance, justified as enhancing or extending functionality for evolving user needs (2)',
      '(d) Preventive maintenance, justified as improving maintainability and preventing future problems (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.7 Phase 7: Maintenance / 3.5.7.2 Challenges of Maintenance',
    question: 'Explain why the maintenance phase is considered the longest and often most costly phase of the SDLC.',
    modelAnswer: "Maintenance encompasses all activities that occur after initial deployment to keep the system operational, relevant and aligned with evolving user needs and technological environments. It is the longest phase simply because it spans the system's entire operational life: development may take months or a year or two, but the system then runs for years or decades, and maintenance begins the moment deployment ends and continues until retirement. It is the most costly for several reasons. First, user needs continually evolve, so the system is never finished; perfective maintenance — adding and enhancing features — alone accounts for around 50-60% of maintenance effort. Second, the environment keeps changing around the system, so adaptive work is required merely to stand still: new operating system versions, new regulations, new file formats and new integrations. Third, maintenance work is intrinsically harder than original development, because of the challenges the notes identify: developers must understand legacy code they did not write, often with inadequate documentation; every change carries a regression risk, since fixing one defect or adding one feature may inadvertently break another part of the system, which forces retesting far beyond the area changed; technical debt accumulates as shortcuts and poor design decisions from earlier phases make the system progressively harder to change; and configuration management grows complex as multiple versions run across different client installations and deployment environments. Fourth, the cost of defects is highest here — a defect found in production costs a large multiple of the same defect found during unit testing. The combined effect is that organisations typically spend more money maintaining existing software than developing new systems. Eventually the position becomes untenable: when maintenance costs outweigh the benefits, or the underlying technology is too outdated to sustain, the system is retired — replaced by a new system, which triggers a fresh SDLC, or simply decommissioned.",
    markScheme: [
      'Maintenance defined — all activities after initial deployment to keep the system operational and relevant (1.5)',
      "Longest because it spans the system's whole operational life, from deployment to retirement (1.5)",
      'Evolving user needs make it continuous — perfective maintenance alone is some 50-60% of the effort (1.5)',
      'At least two challenges named and explained — legacy code, regression risk, technical debt, configuration management (2)',
      'Conclusion — organisations spend more on maintaining than on new development, and the system is retired when cost outweighs benefit (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.4 SDLC Models vs. SDLC Phases',
    question: 'Distinguish between SDLC phases and SDLC models.',
    modelAnswer: "SDLC phases are the fundamental activities that must occur in any software project, whatever its size, domain or methodology: planning, analysis, design, implementation, testing, deployment and maintenance. They are the building blocks — the work that has to be done for a system to exist and keep working. SDLC models are the frameworks that determine how and in what order those phases are executed. Waterfall runs them once, strictly in sequence, each completed before the next begins. Iterative models repeat them in cycles, each cycle returning the product to earlier stages as requirements evolve. The Spiral model iterates with an explicit risk assessment in every loop. Agile is highly iterative, using short sprints with continuous stakeholder collaboration. DevOps adds continuous integration and delivery, blurring the boundary between development and deployment. The essential point is that changing the model does not remove any phase; an Agile team still plans, analyses, designs, codes, tests, deploys and maintains — it simply does all of them inside every sprint rather than once across the project. No single model is universally superior: the appropriate choice depends on the nature of the project, the stability of the requirements, the size of the team and the organisation's tolerance for risk.",
    markScheme: [
      'SDLC phases defined — the fundamental activities that must occur in any software project, and named (2)',
      'SDLC models defined — frameworks determining how and in what order the phases are executed, with examples named (2)',
      'The relationship stated — a model reorders or repeats the phases but removes none of them (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.1 Phase 1: Planning',
    question: 'Describe the activities carried out in the planning phase of the SDLC and the deliverables it produces.',
    modelAnswer: "Planning is the foundation on which the whole project rests: before any technical work begins, the stakeholders must answer one question — is this project worth doing, and can we do it successfully? The phase answers \"should we build this?\", where the analysis phase that follows asks \"what should we build?\". Four activities make it up. First, the feasibility study, which evaluates the project across several dimensions: technical feasibility (does the required technology exist, and does the team have the skills?), economic feasibility (will the benefits justify the costs, and what is the expected return on investment?), operational feasibility (will the intended users accept and use the system?) and legal or ethical feasibility (are there regulatory or ethical constraints?). Second, project scope definition, which settles what the system will and will not do; a clear scope is the defence against scope creep, the gradual, uncontrolled expansion of requirements that frequently causes delays and cost overruns. Third, resource and schedule planning, in which project managers identify the personnel, hardware, software tools and budget required, and establish timelines and milestones in a project schedule, often visualised with Gantt charts or network diagrams. Fourth, risk assessment, in which technical, financial and personnel-related risks are identified and mitigation strategies planned. The phase delivers four artefacts: a project charter or proposal, a feasibility report, a preliminary project plan and schedule, and a risk register.",
    markScheme: [
      'The question the phase answers stated — should we build this, as against what should we build (1)',
      'Feasibility study described, with its dimensions named (2)',
      'Scope definition described, and scope creep correctly defined (2)',
      'Resource and schedule planning, and risk assessment, both described (2)',
      'The four deliverables named — project charter/proposal, feasibility report, preliminary plan and schedule, risk register (1)',
    ],
  },

  {
    type: 'recall',
    marks: 7,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5 Phases of the SDLC (Figure 3.1)',
    question: 'Name the SEVEN phases of the classical SDLC, in order, and state what each one does.',
    items: [
      { name: 'Planning', aliases: ['planning phase'], explain: 'Answers "should we build this?" — feasibility study, scope definition, resource and schedule planning, risk assessment. Delivers the project charter, feasibility report, preliminary plan and risk register.' },
      { name: 'Analysis (Requirements Analysis)', aliases: ['analysis', 'requirements analysis'], explain: 'Answers "what should we build?" — gathering, documenting and validating requirements. Delivers the Software Requirements Specification (SRS), use cases, context-level DFDs and stakeholder sign-off.' },
      { name: 'Design', aliases: ['design phase'], explain: 'Translates requirements into a blueprint — high-level (architectural) and low-level (detailed) design. Delivers the architecture document, database design, wireframes, detailed specifications and the data dictionary.' },
      { name: 'Implementation (Coding)', aliases: ['implementation', 'coding', 'development'], explain: 'Translates the blueprint into executable software — coding, version control, code reviews, unit testing, integration and coding standards. Delivers source code, unit tests, builds and technical documentation.' },
      { name: 'Testing', aliases: ['testing phase'], explain: 'Systematically evaluates the software to detect defects, verify it meets its requirements and validate it against user expectations. Delivers the test plan, test cases, defect reports and the test summary report.' },
      { name: 'Deployment', aliases: ['deployment phase', 'release'], explain: 'Releases the tested, approved software into the production environment — environment preparation, data migration, user training, documentation delivery and go-live support.' },
      { name: 'Maintenance', aliases: ['maintenance phase'], explain: 'The longest phase: everything after deployment that keeps the system operational and relevant — corrective, adaptive, perfective and preventive work, ending in retirement.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.7.1 Categories of Maintenance',
    question: 'Name the FOUR categories of software maintenance defined by the IEEE standard, with an example of each.',
    items: [
      { name: 'Corrective maintenance', aliases: ['corrective'], explain: 'Fixing defects discovered after deployment — for example, patching a bug that causes incorrect tax calculations.' },
      { name: 'Adaptive maintenance', aliases: ['adaptive'], explain: 'Modifying the system to work in a changed environment — for example, updating the software to run on a new operating system version.' },
      { name: 'Perfective maintenance', aliases: ['perfective'], explain: "Enhancing or extending the system's functionality — for example, adding a new report type requested by users. The largest share of maintenance effort, typically 50-60%." },
      { name: 'Preventive maintenance', aliases: ['preventive'], explain: 'Changes that improve maintainability and prevent future problems — for example, refactoring code to reduce technical debt.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.5.1 Levels of Testing',
    question: 'Name the FOUR levels of testing, stating what each tests and who performs it.',
    items: [
      { name: 'Unit testing', aliases: ['unit test'], explain: 'Individual functions or methods, tested in isolation by the developer.' },
      { name: 'Integration testing', aliases: ['integration test'], explain: 'The interactions between combined modules, tested by the developer or the tester.' },
      { name: 'System testing', aliases: ['system test'], explain: 'The complete, integrated system, tested by the quality assurance team.' },
      { name: 'Acceptance testing', aliases: ['acceptance test', 'user acceptance testing', 'UAT'], explain: 'A conformance test performed by the user, client or end user, matching the system against the business requirements for consistency.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.6.1 Deployment Strategies',
    question: 'Name the SIX deployment strategies given in the notes and state what each involves.',
    items: [
      { name: 'Big Bang (Direct Cutover)', aliases: ['big bang', 'direct cutover'], explain: 'The old system is switched off and the new one switched on simultaneously. Simple to execute but high-risk: if problems arise there is no fallback.' },
      { name: 'Phased Deployment (Incremental Rollout)', aliases: ['phased', 'incremental rollout'], explain: 'The new system goes to a subset of users or locations first, then is rolled out more broadly — so issues are caught and resolved at small scale.' },
      { name: 'Parallel Running', aliases: ['parallel'], explain: 'Both old and new systems run simultaneously for a period and their outputs are compared to verify correctness. Expensive, but the highest safety net.' },
      { name: 'Pilot Deployment', aliases: ['pilot'], explain: 'A complete deployment to a single representative site or user group before organisation-wide rollout.' },
      { name: 'Blue-Green Deployment', aliases: ['blue green'], explain: 'Two identical production environments are maintained; the new version is deployed to the green environment while blue keeps serving users, and traffic is switched once the new version is validated.' },
      { name: 'Canary Release', aliases: ['canary'], explain: 'A small percentage of users are routed to the new version at first, and the proportion is raised as confidence grows.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.3.2 Design Principles',
    question: 'Name the FOUR design principles that promote quality in software design, and state what each requires.',
    items: [
      { name: 'Modularity', aliases: ['modular design'], explain: 'Dividing the system into discrete, cohesive components.' },
      { name: 'Abstraction', aliases: ['information hiding'], explain: 'Hiding implementation details and exposing only the necessary interfaces.' },
      { name: 'Separation of concerns', aliases: ['separation'], explain: 'Ensuring each module has a single, well-defined responsibility.' },
      { name: 'Coupling and cohesion', aliases: ['low coupling high cohesion', 'coupling', 'cohesion'], explain: 'Minimising dependencies between modules (low coupling) while maximising the relatedness of the elements within a module (high cohesion).' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 3 · The SDLC',
    source: 'Topic 3 · 3.5.5.3 The Testing Process',
    question: 'Name the SIX steps of the structured testing process, in order.',
    items: [
      { name: 'Test planning', aliases: ['planning'], explain: 'Define the test objectives, scope and approach.' },
      { name: 'Test case design', aliases: ['test design', 'writing test cases'], explain: 'Write specific test cases, each specifying input data, execution conditions and expected outcomes.' },
      { name: 'Test environment setup', aliases: ['environment setup'], explain: 'Prepare the hardware, software and data needed to run the tests.' },
      { name: 'Test execution', aliases: ['execution', 'running the tests'], explain: 'Run the tests and record the actual outcomes.' },
      { name: 'Defect reporting and tracking', aliases: ['defect reporting', 'bug tracking'], explain: 'Log the defects found, assign them for resolution and track their status.' },
      { name: 'Test closure', aliases: ['closure'], explain: 'Evaluate the test completion criteria and produce a test summary report.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 4 — SDLC MODELS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 5 · 4.1.7 Key Characteristics / 4.1.9 Disadvantages',
    question: 'Why is the Waterfall model considered unsuitable for projects with rapidly changing requirements?',
    modelAnswer: "The Waterfall model, proposed by Winston Royce in 1970, organises development into a linear sequence of phases — requirements analysis, system design, implementation, testing, deployment, maintenance — in which each phase must be fully completed before the next begins, like water flowing down a cascade of steps. Four of its characteristics make it unsuitable where requirements change. First, it is sequential and rigid: progress flows strictly in one direction, so there is no provision for returning to an earlier phase. A requirement that changes after the SRS has been signed off invalidates work already completed downstream. Second, it is documentation-heavy: each phase produces formal deliverables before the next can begin, so one changed requirement forces the SRS, the design document, the test plans and the schedule all to be revised — the cost of a change is not the cost of the change itself but the cost of every document that described the old version. Third, there is no customer involvement after the requirements phase: the client is engaged at the start and again at delivery, and sees the working product only at the very end. Where requirements are moving, this maximises the chance that what is delivered is already out of date, and the misalignment is discovered when it is most expensive to correct. Fourth, testing is late: errors are discovered only after the system is built, and a defect found in the testing phase costs far more than one found at the point it was introduced. Waterfall is therefore appropriate for short, well-defined projects with stable requirements, such as government contracts with fixed specifications, projects where the technology is mature, and environments where formal documentation and regulatory compliance are mandatory — its own advantages (simplicity, predictable estimates, extensive documentation) all rest on the assumption that requirements are settled before work begins. Remove that assumption and the model's strengths become liabilities.",
    markScheme: [
      'Waterfall described — a linear sequence in which each phase is fully completed before the next begins (2)',
      'Rigidity explained — progress flows in one direction, so accommodating change mid-project is costly and disruptive (1.5)',
      'Customer involvement — the client is engaged only at the start and at delivery, so misalignment surfaces at the end (1.5)',
      'Late testing — defects are found only after the system is built and are expensive to fix (1.5)',
      "Conclusion — the model's advantages all depend on requirements being stable, so it suits well-defined projects instead (1.5)",
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 10 · 4.6 The Spiral Model / Topic 7 · 4.3 Iterative Models',
    question: 'Explain how the Spiral model differs from simple iteration. What role does risk play in each loop?',
    modelAnswer: "A simple iterative model begins with some requirements and analysis, develops a first version of the software, and then produces a further version whenever changes are needed; each version is called an iteration, and after the final version the product is deployed. Its cycle is requirement gathering and analysis, design and coding, testing, review — in which the software is assessed against current requirements and further requirements are refined for the next iteration — and finally deployment and maintenance. Risk is handled implicitly here: the notes note that risks are identified and resolved during the iteration, but there is no separate risk activity and no requirement to address risk before committing to the iteration's work. The Spiral model, proposed by Barry Boehm in 1986, combines the iterative nature of prototyping with the systematic control of the Waterfall model, and adds a strong and explicit emphasis on risk analysis. Its process is drawn as a spiral in which each loop passes through four quadrants: planning, in which the objectives, alternatives and constraints for this iteration are defined; risk analysis, in which risks are identified and evaluated and prototypes or simulations are developed to address the most critical of them; engineering, in which the product for the current iteration is developed and verified; and evaluation, in which customer feedback is obtained and the next iteration planned. Each pass advances the software towards greater completeness, from a concept to a prototype to a refined product. The difference is therefore that risk is the organising principle of the Spiral rather than a by-product of it: every iteration begins with a formal risk assessment, and the work chosen for that loop is the work that retires the largest risk. That is why the Spiral is uniquely suited to large, high-risk or technically novel projects — aerospace, defence, mission-critical systems — and why its costs are correspondingly high: it is complex to manage, requires experienced risk analysts, and the number of iterations is hard to predict, which makes scheduling difficult. A simple iterative model, by contrast, carries none of that overhead, and is the better choice on a large application whose requirements are clearly understood but expected to change.",
    markScheme: [
      'Simple iteration described — successive versions, each cycle ending in a review that refines requirements for the next (2)',
      'Spiral model described — Boehm 1986, iterative prototyping combined with the systematic control of Waterfall (2)',
      'The four quadrants of a spiral loop named — planning, risk analysis, engineering, evaluation (2)',
      'Role of risk in the Spiral — a formal risk assessment begins every loop, and prototypes are built to address the most critical risks (2)',
      'Role of risk in simple iteration — handled implicitly within the iteration, with no formal assessment step (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 8 · 4.4 Incremental Model / Topic 11 · 4.7 The Prototyping Model',
    question: 'What is the key difference between the Incremental model and the Prototyping model in terms of what is delivered and when?',
    modelAnswer: "The Incremental model divides the software into a series of small, buildable units called increments, each adding functionality to the version already delivered. What is delivered at the end of each increment is a working partial product — real, tested, production software. Build 1 produces a core version with the essential functionality; subsequent builds add features until the complete system is delivered, and each increment goes through its own mini-cycle of design and development, testing, then implementation and delivery. The customer therefore has usable software, and the value that comes with it, from the first increment onward, which is why the model is chosen when an early working product is needed — for example to gain early market presence — and why it reduces the risk of total project failure, since earlier increments still have value even if the project stops. The Prototyping model delivers something quite different: a prototype, a working model that simulates some aspects of the product but is explicitly not the final deliverable. It is built before the real system, to help stakeholders and developers clarify requirements that the users could not articulate in the abstract, and the customer interacts with it in cycles of build, evaluate and refine. What happens to the prototype then depends on the type: in throwaway (rapid) prototyping it is discarded and the final system is built from scratch on the insights gained; in evolutionary prototyping it is progressively refined until it becomes the final system; in incremental prototyping several prototypes are built for different subsystems and then integrated; in extreme prototyping, used in web development, three layers are built in sequence. The key difference is therefore one of purpose as much as timing. An increment is production software that accumulates towards the finished system, delivered iteratively over the life of the project; a prototype is a learning device delivered early to reduce ambiguity, and in the commonest form it is thrown away. This also explains their characteristic risks: an increment risks integration difficulty if the architecture was poorly partitioned, whereas a prototype risks the customer mistaking it for a finished product and forming unrealistic expectations, and risks scope creep as customers keep requesting more.",
    markScheme: [
      'Incremental model — what is delivered: a working partial product (a build) at the end of each increment, starting with a core version (2)',
      'Prototyping model — what is delivered: a prototype, a working model that simulates some aspects but is not the final deliverable (2)',
      'When each is delivered — increments accumulate usable software across the project; the prototype comes first, to clarify requirements before the real system is built (2)',
      'The key difference drawn out — production software that accumulates, against a learning device that may be discarded (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 12 · 4.8.1 Agile Manifesto',
    question: 'Describe the four values of the Agile Manifesto. How do they challenge assumptions made by traditional SDLC models?',
    modelAnswer: "The Agile Manifesto of 2001 established four core values, each stated as a preference rather than a rejection. First, individuals and interactions over processes and tools: the quality of a system depends more on the people building it and the conversations between them than on the methodology or toolset imposed on them. Second, working software over comprehensive documentation: the measure of progress is software that runs, not documents that describe software that does not yet exist. Third, customer collaboration over contract negotiation: the customer is a continuous participant whose feedback shapes the product, rather than a counterparty whose agreement is fixed in a specification at the outset. Fourth, responding to change over following a plan: a plan is a hypothesis about an uncertain future, and when reality contradicts it, reality should win. These values challenge four assumptions on which traditional models rest. Waterfall assumes requirements can be frozen upfront and captured completely in an SRS that serves as a contract between the development team and the customer; Agile denies that this is possible for most projects and welcomes changing requirements even late in development. Traditional models treat documentation as the primary deliverable of each phase, with each phase producing formal artefacts before the next can begin; Agile treats a working increment at the end of every sprint as the deliverable that matters, and accepts lighter documentation as the price. Traditional models place the customer at the beginning and end of the project, with a sign-off in between; Agile requires business people and developers to work together daily, and makes the Product Owner a continuous presence. And traditional models treat the plan as the instrument of control, measuring the project by adherence to it; Agile treats adaptation as the instrument of control, measuring the project by delivered, working software. The trade-offs are real and the notes state them: Agile makes final cost and timeline hard to predict, demands a highly engaged and available customer, is unsuited to projects whose requirements must be completely defined upfront, may leave documentation too thin for later maintenance, and is complex to scale to large organisations.",
    markScheme: [
      'Value 1 stated and explained — individuals and interactions over processes and tools (1.5)',
      'Value 2 stated and explained — working software over comprehensive documentation (1.5)',
      'Value 3 stated and explained — customer collaboration over contract negotiation (1.5)',
      'Value 4 stated and explained — responding to change over following a plan (1.5)',
      'Two traditional assumptions identified and shown to be challenged — frozen requirements, documentation as the deliverable (2)',
      'Two further assumptions challenged — the customer as a signatory rather than a participant, and the plan as the instrument of control (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 13 · 4.9 Comparison of SDLC Models / Topic 5 · 4.1.10 When to Use Waterfall Model',
    question: 'A bank is developing a new core banking system with 500 documented regulatory requirements that cannot change. Which SDLC model would you recommend and why?',
    modelAnswer: "I would recommend the Waterfall model, or its V-model variant, for this project. The recommendation follows from the comparison table's own criteria. On requirements, Waterfall demands that requirements be fixed upfront — usually its greatest weakness, but here the premise of the question: the 500 requirements are documented and cannot change, so the one precondition the model needs is already satisfied, and the flexibility that Agile or Spiral would buy has nothing to buy it for. On documentation, Waterfall is the heaviest of the five models, and in a regulated banking environment that is an asset rather than a cost: formal documentation and traceability from each requirement through design, code and test evidence are exactly what a regulator or auditor will demand, and the notes list environments where formal documentation and regulatory compliance are mandatory among the model's proper uses. On cost and schedule predictability, Waterfall is the highest of the five when requirements are truly stable, which matters where the bank must budget and commit to a delivery date in advance. On project size, the table rates Waterfall as suited to small and medium projects, and a core banking system is large; this is the honest weakness in the recommendation, and it is why the Incremental model is the credible alternative, delivering the 500 requirements in partitioned builds while retaining heavy documentation and moderate predictability. Within the Waterfall family the V-model is the better choice still, because it plans each level of testing in parallel with the corresponding level of development — the system test plan alongside the requirements, the integration test plan alongside high-level design, component tests alongside low-level design — so defects are tracked proactively and prevented from flowing downward, which is what a system handling customer money requires. What I would not recommend is Agile: its very high flexibility is worthless where requirements cannot change, its light documentation is a liability under audit, and its low cost predictability is unacceptable for a fixed regulatory programme.",
    markScheme: [
      'Waterfall (or the V-model) recommended, and the recommendation stated clearly (1.5)',
      'Justified on requirements — they are fixed upfront, which is the precondition Waterfall needs (1.5)',
      'Justified on documentation and traceability — heaviest in Waterfall, and mandatory in a regulated environment (1.5)',
      'Justified on cost and schedule predictability — highest in Waterfall when requirements are stable (1.5)',
      'A weakness of the recommendation acknowledged, or the V-model/Incremental alternative argued, and Agile explicitly rejected with a reason (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 13 · 4.9 Comparison of SDLC Models / Topic 12 · 4.8.7 When to Use Agile Model',
    question: 'A startup is building a mobile app for a new market where user preferences are unknown. Which model is most appropriate? Justify your answer using at least THREE criteria from the comparison table.',
    modelAnswer: "The Agile model is the most appropriate, and the comparison table justifies it on several criteria. First, requirements: the table records that Agile requirements are continuously refined, where Waterfall requires them to be fixed upfront. In a new market where user preferences are unknown, nobody can write a correct specification in advance; the requirements will be discovered by releasing something and watching what users do, and only a model that welcomes changing requirements even late in development can absorb that. Second, flexibility, rated very high for Agile and very low for Waterfall: when the first release reveals that the assumed user need was wrong, the startup must be able to change direction without invalidating a project plan. Third, delivery: Agile delivers working software every sprint, where Waterfall delivers once at the end. For a startup this is existential — each sprint's increment is an experiment in the market, and the feedback it produces is the input to the next sprint's backlog. Fourth, customer involvement is continuous in Agile, daily or weekly, which reduces the risk of building the wrong product — the risk that dominates this project. Fifth, project size: Agile suits small to large projects, so a small startup team of five to nine self-organising members is well within its range. The trade-offs must be acknowledged. Agile has low to moderate cost predictability, which makes it hard to promise investors a fixed cost and date; it requires a highly engaged and available Product Owner, which in a startup usually means a founder giving real time to it; and its documentation is light, which will create maintenance difficulties later, particularly if early team members leave. The Prototyping model is the reasonable alternative and could be combined with Agile: its whole purpose is clarifying requirements the customer cannot articulate until they can see something, which is precisely the startup's position, and an early throwaway prototype of the interface would de-risk the first sprints.",
    markScheme: [
      'Agile recommended (1.5)',
      'First criterion from the table used — requirements continuously refined rather than fixed upfront (2)',
      'Second criterion used — flexibility rated very high (2)',
      'Third criterion used — working software delivered every sprint, and continuous customer involvement (2)',
      'Trade-offs acknowledged — low cost predictability, need for an engaged Product Owner, light documentation (1.5)',
      'A credible alternative named and related to the recommendation, such as Prototyping to clarify the unknown preferences (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 13 · 4.9 Comparison of SDLC Models / 4.9.1 Key Observations',
    question: 'Compare documentation practices across all five SDLC models. What are the long-term implications of light documentation?',
    modelAnswer: "The comparison table rates documentation across the five models as follows. Waterfall is heavy: each phase must produce formal deliverables before the next can begin, so the SRS, the software design document, the test plans and the reports all exist as signed artefacts, and this extensive documentation is listed among the model's advantages because it aids knowledge transfer and later maintenance. Spiral is moderate to heavy: it inherits the systematic control of Waterfall and adds the risk analyses and prototype evaluations produced in every loop, so it documents substantially, though less ceremonially than Waterfall. Incremental is moderate: each increment is planned, designed, tested and delivered, so it produces real documentation, but partitioned by build rather than as one exhaustive set written before development begins. Prototyping is light, and the notes name neglected documentation explicitly as a disadvantage — documentation is often skipped during rapid prototyping because the prototype itself is doing the communicating. Agile is light by principle, not by accident: the second value of the Manifesto is working software over comprehensive documentation, and the notes observe that Agile's lighter documentation enables speed but can create challenges when team members leave. The long-term implications of light documentation fall almost entirely on the maintenance phase, which is the longest and most expensive phase of the life cycle. First, knowledge lives in people rather than artefacts, so when the original team disperses the organisation loses its understanding of why the system is as it is — and maintainers must then comprehend legacy code they did not write with inadequate documentation, one of the named challenges of maintenance. Second, changes become riskier: without design documentation, a maintainer cannot see what a modification will affect, so regression risk rises and technical debt accumulates faster. Third, onboarding new developers costs more and takes longer. Fourth, regulated organisations may simply be unable to demonstrate compliance, since traceability from requirement to test evidence is itself a deliverable — which is why the notes advise that where fixed-bid contracts or regulatory compliance documentation are required, Waterfall or Incremental may be preferable. The practical conclusion is not that Agile teams should document like Waterfall teams, but that light documentation is a deliberate trade of future maintainability for present speed, and should be made knowingly.",
    markScheme: [
      'Waterfall documentation characterised as heavy, with formal deliverables gating each phase (1.5)',
      'Spiral characterised as moderate to heavy, and Incremental as moderate (2)',
      'Prototyping characterised as light, with documentation often neglected during rapid prototyping (1.5)',
      'Agile characterised as light by principle — working software over comprehensive documentation (1.5)',
      'Implication: knowledge is lost when the team disperses, and maintainers face legacy code with inadequate documentation (1.5)',
      'Further implications — higher regression risk and technical debt, costlier onboarding, or inability to demonstrate regulatory compliance (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 13 · 4.9.2 Summary',
    question: 'In what scenario might an organization combine elements of two or more SDLC models? Give a concrete example.',
    modelAnswer: "No single SDLC model is universally superior, and the factors that decide the choice — requirements clarity, project size and complexity, risk tolerance, customer availability, the regulatory environment, and team experience and culture — frequently point in different directions within the same project. When they do, a pure model forces the organisation to accept a weakness it cannot afford, and the sensible response is a hybrid. The notes give two examples: using Agile sprints within an overall incremental delivery plan, and applying Spiral-style risk analysis at the start of an Agile project. A concrete scenario: a university is replacing its student information system. The registration, results and fees modules must be delivered in that order because the academic session demands it, and the project must produce traceable documentation because it is publicly funded and will be audited — both of which point to an incremental, documentation-bearing approach. But within each module the requirements are only partly understood, because departments work differently from one another and cannot describe their own exceptions until they see a screen — which points to Agile. The hybrid is therefore an incremental delivery plan of three releases, each with its own documented scope, design and acceptance criteria, and within each release two-week Agile sprints with the faculty officers acting as Product Owners, ending in a demonstration. Before the first release, a Spiral-style risk analysis is run on the one genuinely high-risk item — migrating twelve years of legacy student records — and a throwaway prototype of the migration is built to retire that risk before any production work depends on it. Each element is chosen because a named factor demands it: incremental for the fixed delivery order and the audit trail, Agile for the uncertain intra-module requirements and the available stakeholders, Spiral risk analysis for the one item whose failure would sink the project. The notes' closing point applies: a systems analyst must understand each model in isolation and also develop the judgment to blend them appropriately.",
    markScheme: [
      'Explains why hybrids arise — no model is universally superior, and the deciding factors can point in different directions on one project (2)',
      "One of the notes' own examples given — Agile sprints inside an incremental delivery plan, or Spiral risk analysis at the start of an Agile project (2)",
      'A concrete scenario described, not merely asserted (2)',
      'Each borrowed element tied to the specific factor that demands it (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 6 · 4.2 V-Model',
    question: 'Describe the V-model. How does it differ from the Waterfall model, and what are its advantages and disadvantages?',
    modelAnswer: "The V-model means the Verification and Validation model. Like Waterfall it is a sequential path of execution in which each phase must be completed before the next begins, but it is drawn as a V rather than a cascade, because every development phase on the descending left-hand side has a corresponding testing phase planned in parallel with it on the ascending right-hand side. The life cycle begins with requirements — the business requirement specification (BRS) and the SRS, as in Waterfall — except that before development starts, a system test plan is created, focused on meeting the functionality specified during requirements gathering. The high-level design phase follows, concerned with system architecture and design, giving an overview of the solution, platform, system, product and process; an integration test plan is created in this phase, to test the ability of the pieces of the software system to work together. The low-level design phase designs the actual software components, defining the logic for each one — class diagrams with all their methods and the relationships between classes belong here — and the component tests are created in this phase too. At the bottom of the V comes coding, where the module design is converted into code by the developers. Once coding is complete, execution continues up the right-hand side, where the test plans developed earlier are put to use. The difference from Waterfall is therefore not the sequence of development work, which is the same, but when testing is designed: Waterfall leaves testing until after the system is built, whereas the V-model designs each level of test at the same time as the corresponding level of development. Its advantages follow: it is simple and easy to use; test planning and test design happen well before coding, which saves a great deal of time and gives it a higher chance of success than Waterfall; defect tracking is proactive, so defects are found at an early stage; and it avoids the downward flow of defects from one phase into the next. Its disadvantages are that it is very rigid and the least flexible of the models; that software is developed only in the implementation phase, so no early prototypes are produced; and that if any change happens midway, the test documents as well as the requirement documents must all be updated. It works well for small projects whose requirements are easily understood.",
    markScheme: [
      'V-model defined — Verification and Validation; sequential, each phase completed before the next (2)',
      'Testing planned in parallel with development: system test plan at requirements, integration test plan at high-level design, component tests at low-level design (3)',
      'Coding at the bottom of the V, after which execution rises up the right-hand side using the test plans prepared earlier (1.5)',
      'Difference from Waterfall stated — the same development sequence, but tests are designed alongside each phase rather than after the build (1.5)',
      'Advantages given — early test design, proactive defect tracking, no downward flow of defects (1)',
      'Disadvantages given — very rigid, no early prototypes, changes force every test and requirement document to be updated (1)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 9 · 4.5 Evolutionary Process Models',
    question: 'What is an evolutionary process model? Name the models it comprises.',
    modelAnswer: "The evolutionary process model, also referred to as the successive version model, is a combination of the iterative and the incremental models — iterative plus incremental equals evolutionary. In it, the software requirement is first broken down into several modules that can be incrementally constructed. Customer feedback is taken on each module, and the product is delivered to the customer module by module rather than as a single finished whole. It is therefore evolutionary in two senses at once: the system grows by the addition of modules (the incremental part), and each module is refined through successive versions in response to feedback (the iterative part). The evolutionary models comprise the Spiral model and the Prototyping model.",
    markScheme: [
      'Evolutionary model defined — also called the successive version model; iterative plus incremental (2)',
      'How it works — requirements broken into modules built incrementally, with customer feedback taken on each and delivery made module by module (2)',
      'Its two members named — the Spiral model and the Prototyping model (1)',
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 4 · 4.0 Introduction',
    question: 'Name the SIX SDLC models covered in this chapter.',
    items: [
      { name: 'Waterfall model', aliases: ['waterfall'], explain: 'Linear and sequential; each phase fully completed before the next begins. Royce, 1970.' },
      { name: 'V-Model', aliases: ['v model', 'verification and validation model'], explain: 'Sequential like Waterfall, but each level of testing is planned in parallel with the corresponding level of development.' },
      { name: 'Iterative model', aliases: ['iterative'], explain: 'Successive versions of the software, each iteration reviewed and refined into the next.' },
      { name: 'Incremental process model', aliases: ['incremental'], explain: 'The system is divided into increments, each adding functionality to a working partial product already delivered.' },
      { name: 'Evolutionary Process Model', aliases: ['evolutionary', 'successive version model'], explain: 'Iterative plus incremental — comprises the Prototyping model and the Spiral model.' },
      { name: 'Agile model', aliases: ['agile'], explain: 'Highly iterative and incremental, using short sprints with continuous customer collaboration; prioritises working software over documentation.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 10 · 4.6.1 Phases of Each Spiral Loop',
    question: 'Name the FOUR quadrants of each loop of the Spiral model, in order, and state what happens in each.',
    items: [
      { name: 'Planning', aliases: ['objective setting'], explain: 'Define the objectives, alternatives and constraints for this iteration.' },
      { name: 'Risk Analysis', aliases: ['risk assessment'], explain: 'Identify and evaluate the risks, and develop prototypes or simulations to address the most critical of them.' },
      { name: 'Engineering (Development and Testing)', aliases: ['engineering', 'development and testing'], explain: 'Develop and verify the product for the current iteration.' },
      { name: 'Evaluation', aliases: ['customer evaluation'], explain: 'Obtain customer feedback and plan the next iteration.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 11 · 4.7.1 Types of Prototyping',
    question: 'Name the FOUR types of prototyping and state how each treats the prototype.',
    items: [
      { name: 'Throwaway (Rapid) Prototyping', aliases: ['throwaway', 'rapid prototyping'], explain: 'The prototype is built quickly to elicit requirements, then discarded; the final system is built from scratch on the insights gained.' },
      { name: 'Evolutionary Prototyping', aliases: ['evolutionary'], explain: 'The prototype is progressively refined and improved until it evolves into the final system.' },
      { name: 'Incremental Prototyping', aliases: ['incremental'], explain: 'Multiple prototypes are built for different subsystems and then integrated.' },
      { name: 'Extreme Prototyping', aliases: ['extreme'], explain: 'Used in web development; builds three layers — static, simulated services, then real services — in sequence.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 12 · 4.8.3 How Agile Works (Scrum Framework)',
    question: 'Describe how Scrum works, naming SIX elements of the framework.',
    items: [
      { name: 'Sprints', aliases: ['sprint', 'iterations'], explain: 'Work is divided into fixed-length iterations, typically 1-4 weeks long.' },
      { name: 'Product Backlog', aliases: ['backlog'], explain: 'Contains all the desired features, prioritised by the Product Owner.' },
      { name: 'Sprint Backlog', aliases: ['sprint planning'], explain: 'At the start of each sprint the team selects the items it will work on from the product backlog.' },
      { name: 'Daily stand-up (Daily Scrum)', aliases: ['daily scrum', 'stand-up'], explain: 'A short daily meeting that keeps the team aligned.' },
      { name: 'Sprint Review', aliases: ['review', 'demonstration'], explain: 'At the end of each sprint a working increment is demonstrated.' },
      { name: 'Sprint Retrospective', aliases: ['retrospective'], explain: 'The team reflects on its process and improves it for the next sprint.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 5 · 4.1.7 Key Characteristics',
    question: 'Name the FOUR key characteristics of the Waterfall model.',
    items: [
      { name: 'Sequential and rigid', aliases: ['sequential', 'rigid', 'linear'], explain: 'Progress flows strictly in one direction; there is no provision for returning to a completed phase.' },
      { name: 'Documentation-heavy', aliases: ['heavy documentation'], explain: 'Each phase produces formal deliverables before the next can begin.' },
      { name: 'No customer involvement after requirements', aliases: ['limited customer involvement'], explain: 'The client is engaged at the start and again at delivery, and sees the working product only at the very end.' },
      { name: 'Late testing', aliases: ['testing at the end'], explain: 'Errors are often discovered only after the system is built, when they are expensive to fix.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 4 · SDLC Models',
    source: 'Topic 13 · 4.9.2 Summary',
    question: 'Name the SIX factors on which the choice of an SDLC model depends.',
    items: [
      { name: 'Requirements clarity', aliases: ['requirements stability', 'clarity of requirements'], explain: 'Are the requirements known, evolving, or unknown? This is the primary axis of differentiation — Waterfall demands stable requirements, Agile thrives on change.' },
      { name: 'Project size and complexity', aliases: ['size', 'complexity'], explain: 'A small internal tool and an enterprise-level system call for different models.' },
      { name: 'Risk tolerance', aliases: ['risk'], explain: 'How critical is failure, and what is the cost of defects? Risk is handled most rigorously by the Spiral model.' },
      { name: 'Customer availability', aliases: ['customer involvement', 'stakeholder availability'], explain: 'Can stakeholders be engaged continuously? Agile and Prototyping both require customers who are available and engaged.' },
      { name: 'Regulatory environment', aliases: ['regulation', 'compliance'], explain: 'Are formal documentation and traceability required? If so, Waterfall or Incremental may be preferable.' },
      { name: 'Team experience and culture', aliases: ['team culture', 'experience'], explain: 'Do the developers work best with structure or with autonomy?' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 5 — REQUIREMENT ANALYSIS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.1.1 Functional Requirements / 5.1.2 Non-Functional Requirements / 5.1.3 Comparison',
    question: 'Distinguish between functional and non-functional requirements, providing TWO examples of each.',
    modelAnswer: "Functional requirements define what a system should do — the specific behaviours, functions and features it must support. They describe the interactions between the system and its environment, and the responses the system should produce for given inputs. They are typically expressed as \"the system shall…\" statements, are derived from user goals and business processes, and can be tested directly through functional or acceptance testing, so a functional requirement either passes or fails. Two examples: \"the system shall allow registered users to log in using a valid email address and password\"; and \"the system shall generate a monthly sales report in PDF format.\" Non-functional requirements define how well the system performs its functions. Rather than specifying what the system does, they specify the quality attributes, constraints and standards it must adhere to, and they are sometimes called quality requirements or system properties. Two examples: \"the system shall respond to search queries within 2 seconds\"; and \"the system shall achieve 99.9% uptime per calendar month.\" The notes compare the two across five aspects. In focus, functional requirements concern what the system does and non-functional requirements how well it does it. In expression, the first are features, functions and behaviours, the second constraints, qualities and standards. In testability, functional requirements are directly testable on a pass/fail basis, while non-functional requirements are measured against benchmarks — which is why a non-functional requirement must carry a number to be verifiable at all. In source, functional requirements come from users, stakeholders and business rules, whereas non-functional requirements come from technical teams, regulations and standards. The illustrative pair the notes give captures it: \"user can reset password\" is functional, \"the password reset email arrives within 30 seconds\" is non-functional. Non-functional requirements matter because a system can satisfy every functional requirement and still fail if it is too slow, insecure or difficult to use.",
    markScheme: [
      'Functional requirements defined — what the system does, expressed as "the system shall…" statements (2)',
      'Non-functional requirements defined — how well it performs, as quality attributes, constraints and standards (2)',
      'Two valid functional examples given (2)',
      'Two valid non-functional examples given, each measurable (2)',
      'Compared on at least two further aspects — testability (pass/fail against benchmark) and source (users against technical teams and regulation) (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2 Requirement Elicitation Techniques / 5.2.5 Comparing Elicitation Techniques',
    question: 'A company is replacing its legacy payroll system. Which elicitation technique(s) would you recommend and why?',
    modelAnswer: "I would recommend a combination of all four techniques, applied in a deliberate order, since the comparison table shows each is best used in circumstances that this project presents at different moments. Document review should come first. The table gives it as the technique of choice when legacy systems or regulatory context must be understood, and a payroll system is both: the existing system documentation, user manuals and data dictionaries describe what the legacy system does; the process documents and standard operating procedures describe how payroll is currently run; the legal and regulatory documents carry the statutory rules on PAYE tax, pension contributions and minimum wage that the new system must implement exactly; and sample data — payslips, transaction records and log files — shows the real input and output formats. It costs little, involves no stakeholder time, and produces objective information that is not shaped by anyone's bias. Interviews should follow, with the payroll officers, the HR manager, the finance controller and the IT staff who maintain the legacy system. The table recommends interviews where deep understanding is needed from specific individuals, which is exactly the position: payroll is full of special cases — acting allowances, backdated promotions, loan deductions, terminal benefits — that only the people who process them can explain, and a semi-structured interview lets the analyst probe each one as it surfaces. Observation should run alongside, because payroll staff have performed these tasks for years and will not think to mention what has become second nature; shadowing the monthly payroll run will expose the informal spreadsheets and manual cross-checks that no document records and no interview would volunteer. A questionnaire has a narrower but real role: the employees who receive payslips are far too numerous to interview, and a short questionnaire is the scalable, low-cost way to learn what they find wrong with the current payslip and self-service portal, and to prioritise improvements. Relying on any one of these alone would be a mistake — document review would describe a system that may no longer be operated as documented, interviews would capture what staff believe they do, observation would show a single month's run, and the questionnaire would reach the least-informed group. Triangulating them is what produces complete and reliable requirements.",
    markScheme: [
      'Document review recommended, justified by the legacy system and the statutory/regulatory rules a payroll system must implement (2.5)',
      'Interviews recommended, justified by the depth needed from the specific staff who handle payroll exceptions (2.5)',
      'Observation recommended, justified by the undocumented workarounds in a long-established manual process (2)',
      "A role for questionnaires identified, or its omission justified, with reference to the technique's scalability (1.5)",
      'A triangulated approach argued, with a sensible order of application (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.2.2 Why observation is valuable',
    question: 'Why might observation reveal requirements that interviews fail to uncover? Illustrate with an example.',
    modelAnswer: "An interview captures what a user can describe; observation captures what a user actually does, and the gap between the two is where requirements hide. Users often cannot fully articulate their own work, particularly for tasks that have become second nature — the steps are performed automatically and are no longer consciously available to be reported. What observation reveals is tacit knowledge: the implicit understanding and informal practices that users take for granted and would never think to mention. Interviews also suffer from a reporting bias that observation escapes: an interviewee may give the socially desirable answer rather than the honest one, and will usually describe the official procedure rather than the real one, especially where the real one involves a workaround that might be seen as improper. The notes' example makes the point exactly. A bank teller asked \"how do you process a withdrawal?\" will describe the formal procedure laid down in the manual. Through observation, however, the analyst may discover that the teller also cross-checks an informal handwritten log — a workaround captured in no official document and mentioned in no interview. That log is a requirement: either the new system must provide the control the teller was compensating for, or the teller will keep the log alongside the new system and the data will diverge. The general advantages follow: observation reveals actual rather than reported or idealised behaviour, uncovers unstated requirements and informal workflows, provides the context of the work environment, and reduces the risk of misinterpretation. Its limits should be stated too — the observer or Hawthorne effect means users may change their behaviour when they know they are being watched, it is time-intensive and logistically complex, it is unsuitable for tasks that are rare, confidential or physically hazardous, and it may raise privacy concerns. This is why the standard practice is to combine observation with interviews, using the interview to validate and explain what was observed.",
    markScheme: [
      'The core reason stated — users cannot fully articulate work that has become second nature (2)',
      'Tacit knowledge and informal practice identified as what observation reveals (2)',
      "Illustrated with a concrete example, such as the notes' bank teller and the informal handwritten log (2)",
      'The contrast drawn — actual behaviour against reported or idealised behaviour — and a limitation such as the Hawthorne effect acknowledged (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.3.3 Disadvantages / 5.2.3.4 Standard Questionnaire Administration Practices',
    question: 'What are the main limitations of questionnaires as a requirement elicitation technique, and how can these be mitigated?',
    modelAnswer: "Questionnaires have four main limitations, and the standard administration practices exist precisely to mitigate them. First, there is a limited ability to probe or clarify ambiguous responses: the respondent completes the form alone, so an unexpected or unclear answer cannot be followed up as it could in an interview. This is mitigated by using a mix of closed and open questions, so that a respondent can explain in their own words as well as choose from options, and by treating the questionnaire as one technique among several — following it with interviews of a subset of respondents to explore the answers that were surprising. Second, low response rates are common, especially for long questionnaires. This is mitigated by keeping the questionnaire concise, since long surveys lead to respondent fatigue; by stating the purpose clearly so that respondents see why their time is worth giving; by ensuring anonymity where appropriate; and by setting a clear deadline with reminders. Third, poorly worded questions can lead to misleading data — an ambiguous or leading question produces answers that look quantitative and authoritative but mean nothing, and the error is not discoverable after the fact. This is mitigated by pilot-testing the questionnaire with a small group before wide distribution, which is the only reliable way to find out that a question reads differently to its respondents than to its author. Fourth, questionnaires are not effective for exploring complex or nuanced requirements: they collect self-reported data at low stakeholder involvement, so they cannot draw out the exceptions, conflicts and tacit practices that interviews and observation reach. This is mitigated by choosing the technique for what it is good at — the comparison table rates questionnaires as low cost and highly scalable, so they are best used where large groups must be consulted efficiently, and especially for validating and prioritising requirements that have already been identified through other techniques, rather than for discovering requirements in the first place. Used that way, their remaining advantages tell: they are cost-effective, they allow anonymous responses which encourages honesty, and they produce standardised data that can be analysed statistically.",
    markScheme: [
      'Limitation: no ability to probe or clarify ambiguous responses — mitigated by mixing open with closed questions and following up with interviews (2.5)',
      'Limitation: low response rates — mitigated by keeping it concise, stating the purpose, assuring anonymity, and setting a deadline with reminders (2.5)',
      'Limitation: poorly worded questions mislead — mitigated by pilot-testing with a small group before wide distribution (2.5)',
      'Limitation: ineffective for complex or nuanced requirements — mitigated by using questionnaires to validate and prioritise rather than to discover (2.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.5 Comparing Elicitation Techniques',
    question: 'Explain why a triangulated approach to requirement elicitation is generally preferable to relying on a single technique.',
    modelAnswer: "A triangulated approach combines two or more elicitation techniques so that each compensates for the blind spots of the others. It is preferable because every technique has a systematic weakness that no amount of care within that technique can remove. Interviews give depth but are low in scalability, expensive in time, dependent on the analyst's communication skill, and vulnerable to socially desirable answers rather than honest ones. Observation reveals what people actually do rather than what they report, but it is time-intensive, unsuitable for rare, confidential or hazardous tasks, and distorted by the observer effect. Questionnaires are cheap and highly scalable, but they cannot probe, they suffer low response rates, and they are ineffective for complex or nuanced requirements. Document review is objective and undisturbed by stakeholder bias, but documents may be outdated, incomplete or inaccurate, and they describe what was required rather than what is needed now. Because the weaknesses are of different kinds, combining the techniques removes them rather than compounding them: what a document does not record, observation may show; what observation cannot explain, an interview can; what an interview cannot establish about the wider population, a questionnaire can. The notes set out the natural sequence. Document review establishes a baseline understanding of the current system; interviews reveal what users actually want; observation exposes undocumented workarounds; and questionnaires help prioritise features across a wider user base. Triangulation also provides verification rather than mere coverage: where two techniques disagree — the procedure manual says one thing and the observed practice another — the contradiction is itself a finding, and the standard practice in document review is to cross-reference document content against interviews and observation and to flag contradictions or gaps for follow-up. Since poor requirements are consistently identified as one of the leading causes of project failure, and errors introduced at this stage are the most expensive to correct later, the extra cost of a second technique is small against the cost of getting the requirements wrong.",
    markScheme: [
      'Triangulation defined — combining two or more techniques rather than relying on one (1.5)',
      'Each technique shown to have a systematic weakness that another technique covers (2)',
      "The notes' worked sequence given — document review for a baseline, interviews for what users want, observation for workarounds, questionnaires to prioritise (3)",
      'Verification benefit stated — contradictions between techniques are themselves findings, to be flagged and followed up (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.0 Introduction',
    question: 'Define requirement analysis and explain why it is critical to the success of a software project.',
    modelAnswer: "Requirement analysis is the process of identifying, documenting and managing the needs and expectations of stakeholders for a software system. Its goal is to ensure that the final product solves the right problem in the right way, before a single line of code is written. It is a foundational phase of the software development life cycle, and its product is a Software Requirements Specification (SRS) — a formal artefact capturing what the system must do and the conditions under which it must operate, which serves as the reference for design, development and testing and as the contract between the development team and the client. It is critical because the consequences of doing it badly are not local. Without thorough requirement analysis, projects risk scope creep, budget overruns, missed deadlines and, ultimately, systems that do not satisfy user needs; studies in software engineering consistently identify poor requirements as one of the leading causes of project failure. The reason is that a requirements error propagates: it is carried into the design, implemented in code, verified by tests written from the same faulty requirement, and discovered only when users meet the delivered system — by which time correcting it means revisiting every artefact built on it. That is why the notes describe requirements errors as the most expensive to correct and why requirement analysis is called the bedrock on which all subsequent design, development and testing activities are built. Effective requirement analysis demands both technical skill and interpersonal sensitivity, since it is as much about drawing out what stakeholders cannot easily articulate as about writing it down precisely.",
    markScheme: [
      'Requirement analysis defined — identifying, documenting and managing stakeholder needs and expectations (2)',
      'Its goal stated — that the product solves the right problem in the right way, before any code is written (1)',
      'Consequences of poor requirements given — scope creep, budget overruns, missed deadlines, systems that do not satisfy users (2)',
      'The SRS named as its output, and its role as the reference and contract explained (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.1.1 Types of Interviews / 5.2.1.4 Standard Interview Process',
    question: 'Describe the THREE types of interview used in requirement elicitation, and outline the standard interview process.',
    modelAnswer: "An interview is a direct, structured conversation between a requirements analyst and one or more stakeholders, and it is one of the oldest and most widely used elicitation techniques. It takes three forms. In a structured interview the analyst follows a predefined list of questions; this ensures consistency and makes it easier to compare responses across interviewees, and it is best used when the analyst already has a clear understanding of what information is needed. In an unstructured interview the conversation is open-ended and exploratory, with the analyst allowing the interviewee to guide the discussion; this is useful early in a project, when little is known about the domain and the analyst does not yet know enough to ask precise questions. A semi-structured interview is the hybrid: the analyst begins with a set of core questions but follows up with spontaneous probing questions based on the responses given, and this is the most common format in practice, because it combines comparability with the freedom to pursue whatever the interviewee reveals. The standard process has four elements. Prepare the questions in advance and share them with the interviewees beforehand, so that they can gather figures or documents and are not forced to answer from memory. Record the sessions, with consent, so that the documentation is accurate rather than reconstructed from notes. Interview different types of stakeholder — end users, managers and IT staff — to capture diverse perspectives, since each group sees a different part of the system and their accounts will conflict in informative ways. And follow up each interview with a written summary sent to the interviewee for review and sign-off, which both corrects misunderstandings while they are cheap to correct and creates a record the stakeholder has agreed to.",
    markScheme: [
      'Structured interview described, with when it is best used (1.5)',
      'Unstructured interview described, with when it is best used (1.5)',
      'Semi-structured interview described, and identified as the most common in practice (1.5)',
      'Questions prepared in advance and shared with interviewees beforehand (1)',
      'The remaining practices given — recording with consent, interviewing diverse stakeholder types, and following up with a written summary for sign-off (2.5)',
    ],
  },

  {
    type: 'recall',
    marks: 8,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.1.2.1 Common Categories of Non-Functional Requirements',
    question: 'Name the EIGHT common categories of non-functional requirement, with an example of each.',
    items: [
      { name: 'Performance', aliases: ['speed', 'responsiveness'], explain: 'Speed and responsiveness — "the system shall respond to search queries within 2 seconds."' },
      { name: 'Reliability', aliases: ['uptime', 'fault tolerance'], explain: 'Uptime and fault tolerance — "the system shall achieve 99.9% uptime per calendar month."' },
      { name: 'Security', aliases: ['data protection', 'access control'], explain: 'Data protection and access control — "all user passwords shall be encrypted using bcrypt hashing."' },
      { name: 'Scalability', aliases: ['growth'], explain: 'The ability to handle growth — "the system shall support up to 10,000 concurrent users."' },
      { name: 'Usability', aliases: ['ease of use'], explain: 'Ease of use — "new users shall complete registration within 3 minutes."' },
      { name: 'Maintainability', aliases: ['ease of modification'], explain: 'Ease of modification — "the codebase shall follow MVC architecture."' },
      { name: 'Portability', aliases: ['cross-platform'], explain: 'Operation across environments — "the application shall run on Windows, macOS and Linux."' },
      { name: 'Compliance', aliases: ['regulatory', 'standards'], explain: 'Adherence to standards and regulations — "the system shall comply with GDPR regulations."' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.5 Comparing Elicitation Techniques',
    question: 'Name the FOUR most widely used requirement elicitation techniques and state when each is best used.',
    items: [
      { name: 'Interviews', aliases: ['interview'], explain: 'Best used when deep understanding is needed from specific individuals. High stakeholder involvement, high cost, low scalability.' },
      { name: 'Observation', aliases: ['shadowing', 'ethnographic study'], explain: 'Best used when real-world workflows are complex or poorly documented. Moderate (indirect) involvement, high cost, low scalability.' },
      { name: 'Questionnaires', aliases: ['surveys'], explain: 'Best used when large groups need to be consulted efficiently. Low (self-reported) involvement, low cost, high scalability.' },
      { name: 'Document review', aliases: ['document analysis'], explain: 'Best used when legacy systems or regulatory context must be understood. No stakeholder involvement, low cost, medium scalability.' },
    ],
  },

  {
    type: 'recall',
    marks: 2,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.2.1 Types of Observation',
    question: 'Name the TWO types of observation and state what distinguishes them.',
    items: [
      { name: 'Passive observation (shadowing)', aliases: ['passive', 'shadowing'], explain: 'The analyst observes without interfering; users carry out their tasks naturally while the analyst takes notes. Gives an accurate picture of real-world workflows.' },
      { name: 'Active observation (participatory observation)', aliases: ['active', 'participatory'], explain: 'The analyst participates in the tasks alongside the users — particularly useful for complex tasks that are difficult to understand from the outside.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.4.1 Types of Documents Reviewed',
    question: 'Name the FIVE types of document examined in a document review.',
    items: [
      { name: 'Existing system documentation', aliases: ['system documentation'], explain: 'User manuals, technical specifications and data dictionaries.' },
      { name: 'Process documents', aliases: ['process documentation', 'SOPs'], explain: 'Business process models, standard operating procedures (SOPs) and workflow diagrams.' },
      { name: 'Legal and regulatory documents', aliases: ['legal documents', 'regulatory documents'], explain: 'Compliance requirements, contracts and industry standards such as ISO or the GDPR.' },
      { name: 'Organizational records', aliases: ['organisational records'], explain: 'Forms, reports, templates, meeting minutes and previous project deliverables.' },
      { name: 'Sample data', aliases: ['data samples'], explain: 'Input and output examples, log files and transaction records.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.1.1.1 Characteristics of Functional Requirements',
    question: 'Name the FOUR characteristics of functional requirements.',
    items: [
      { name: 'Describe system behaviour and business logic', aliases: ['describe behaviour', 'business logic'], explain: 'They state what the system does — its behaviours, functions and features — and the responses it produces for given inputs.' },
      { name: 'Expressed as "The system shall…" statements', aliases: ['the system shall', 'shall statements'], explain: 'The standard phrasing, which forces each requirement to name a single obligation the system must meet.' },
      { name: 'Testable directly through functional or acceptance testing', aliases: ['directly testable', 'testable'], explain: 'Each one either passes or fails, unlike a non-functional requirement, which is measured against a benchmark.' },
      { name: 'Derived from user goals and business processes', aliases: ['derived from users', 'from business processes'], explain: 'They come from stakeholders and users through elicitation sessions, and they form the bulk of the SRS document.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 5 · Requirement Analysis',
    source: 'Topic 14 · 5.2.3.4 Standard Questionnaire Administration Practices',
    question: 'Name the FIVE standard practices for administering a questionnaire.',
    items: [
      { name: 'Keep it concise', aliases: ['keep questionnaires short'], explain: 'Long surveys lead to respondent fatigue and depress the response rate.' },
      { name: 'Pilot-test before wide distribution', aliases: ['pilot test', 'pre-test'], explain: 'Trial it with a small group first — the only reliable way to discover that a question reads differently to respondents than to its author.' },
      { name: 'Use a mix of closed and open questions', aliases: ['mix question types'], explain: 'Closed questions give quantitative data that is easy to analyse; open questions give the richer qualitative detail. The mix balances breadth against depth.' },
      { name: 'State the purpose clearly and ensure anonymity where appropriate', aliases: ['state the purpose', 'anonymity'], explain: 'Respondents give their time when they see why it matters, and anonymity encourages honesty.' },
      { name: 'Set a clear deadline with reminders', aliases: ['deadline', 'reminders'], explain: 'Boosts the response rate, which is otherwise the technique’s commonest failure.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 6 — SYSTEM MODELING (structured analysis, DFD, BPMN,
  //  ERD, decision tables and trees)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 15 · 6.0 Introduction to System Modeling / 6.1 Why Model Systems?',
    question: 'What is system modeling, and why is it an essential part of the systems development lifecycle?',
    modelAnswer: "System modeling is the process of developing abstract models of a system, each model presenting a different view or perspective of that system. The models help analysts, designers and stakeholders understand how a system works, what data it processes and how it should behave under various conditions. In the analysis of information systems, modeling serves as a bridge between the problem domain — the real world — and the solution domain, the software system. It is not about writing code: it is about understanding and communicating what a system must do before deciding how to build it. There are five reasons it is essential. Complexity management: real-world systems are too complex to understand all at once, and a model lets the analyst isolate and examine one aspect at a time. Communication: models provide a common language between technical developers and non-technical stakeholders, so that both can see and correct the same picture. Documentation: models are permanent records that can be maintained and updated throughout the system's lifecycle, which is what allows a later maintainer to understand a system the original team has left. Error detection: inconsistencies and gaps in requirements are far easier to find in a model than in a completed system, because a model exposes ambiguity that prose conceals. Cost reduction: identifying problems during modeling is far cheaper than fixing them after development, which is the same economics that governs the SDLC as a whole — the cost of correcting a defect rises steeply with the phase in which it is found. The notes group the models themselves into five categories: process models such as DFDs and BPMN, which show how data is processed and transformed; data models such as ERDs, which show the structure of data and its relationships; behavioural models such as decision tables and decision trees, which show decision logic; object models such as UML class diagrams, which combine data and behaviour; and interface models such as prototypes and wireframes, which show how users interact with the system.",
    markScheme: [
      'System modeling defined — abstract models, each presenting a different view of the system (2)',
      'Its role stated — a bridge between the problem domain and the solution domain; understanding what before deciding how (1.5)',
      'Complexity management and communication explained as reasons to model (2)',
      'At least two further reasons given — documentation, error detection, cost reduction (2.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 15 · 6.3 Structured Analysis Tools / 6.3.2 Core Principles / 6.3.3 The Structured Analysis Toolkit',
    question: 'What is structured analysis? State its core principles and the tools that make up its toolkit.',
    modelAnswer: "Structured analysis is a classical approach to systems development that emerged in the 1970s, championed by pioneers such as Tom DeMarco, Ed Yourdon and Larry Constantine. It is a top-down, graphical approach to defining the requirements of a system: it breaks a system down from its highest level of abstraction to detailed specifications using a set of standard tools, and it emphasises decomposing the system into its functional components and examining the flow of data among them. Its defining commitment is that it focuses on WHAT the system does, not HOW it does it — the separation of what from how is a fundamental principle of good systems design, because a requirement expressed in terms of a particular implementation forecloses design choices that have not yet been made, and becomes obsolete the moment the technology changes. Its core principles are five. Abstraction: represent complex systems at different levels of detail, so that each level can be understood on its own. Decomposition: break large, complex problems into smaller, manageable sub-problems. Logical versus physical separation: model what the system does before specifying how it will be implemented. Consistency: all models must be internally consistent with one another — the data dictionary must match the DFDs, and so on. Completeness: all inputs, outputs and processes must be accounted for. Its toolkit consists of several interlocking tools that together describe a system from multiple perspectives: Data Flow Diagrams, which show how data flows through the system and how it is processed; the Data Dictionary, which defines all data elements, their structure and allowable values; Process Specifications, which describe in detail what each process in the DFD does; Entity Relationship Diagrams, which model the structure of the data stored in the system; Decision Tables and Decision Trees, which specify complex decision logic in a clear, testable format; and the Structured Chart, which shows the hierarchical organisation of the system's modules. The data dictionary deserves particular mention: it is the central repository defining every data element, and acts as the glue tying the other models together — without it, the names used in DFDs, ERDs and process specifications may mean different things to different people.",
    markScheme: [
      'Structured analysis defined — a top-down, graphical approach from highest abstraction down to detailed specification (2)',
      'The what-not-how commitment stated, and why the separation matters (1.5)',
      'Its origin given — the 1970s, DeMarco, Yourdon and Constantine (1)',
      'At least four core principles named and explained — abstraction, decomposition, logical/physical separation, consistency, completeness (3)',
      'The toolkit named — DFD, data dictionary, process specifications, ERD, decision tables and trees, structured chart (2.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 16 · 6.5.2.1 Context Diagram (Level 0) / 6.5.2.2 Level 1 DFD',
    question: 'Explain the difference between a context diagram and a Level 1 DFD. What information appears in each?',
    modelAnswer: "A context diagram is the Level 0 DFD — the highest-level view of the system. It contains exactly one process, representing the entire system; it shows all the external entities that interact with that system; and it shows all the data flows that cross the system boundary. It deliberately does not show internal processes, data stores or internal flows. Its purpose is to establish the system boundary clearly and to give the big picture: what is inside the system, what is outside it, and what passes between them. In the notes' example, a university course registration system appears as a single circle, with Students and the University administration as external entities, connected by flows such as student details, course details and an acceptance or denial note. A Level 1 DFD decomposes that single process into its major functional areas — typically three to nine processes — and shows the major data stores for the first time. Three rules govern it. Each process is numbered 1.0, 2.0, 3.0 and so on. The data flows from the context diagram must all appear at Level 1, which is the conservation of data flows: nothing that crossed the boundary may disappear when the system is opened up. New data stores and internal flows may be introduced at this level, since they were deliberately hidden at Level 0. The difference is therefore one of scope and purpose rather than of notation — both use the same four symbols. The context diagram answers what the system exchanges with the outside world; the Level 1 DFD answers what the system does internally to make those exchanges happen. Decomposition continues in the same way at Level 2 and beyond, each level expanding one parent process into its sub-processes, until primitive processes are reached that cannot be meaningfully decomposed further.",
    markScheme: [
      'Context diagram identified as the Level 0 DFD, the highest level (1.5)',
      'Its characteristics given — exactly one process, all external entities, all flows crossing the boundary, no internal processes, stores or flows (2.5)',
      'Level 1 DFD defined — decomposes the single process into its major functional areas, typically 3-9 processes, showing major data stores (2)',
      'Level 1 rules stated — processes numbered 1.0, 2.0…; conservation of the context diagram’s data flows; new data stores and internal flows may be introduced (2)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 16 · 6.5.2.3 Level 2 DFD (Figure 6.3)',
    question: 'Consider a library management system whose partial Level 1 DFD has external entities Member, Librarian and Publisher; processes 1.0 Register Member, 2.0 Issue Book, 3.0 Return Book and 4.0 Order Books; and data stores D1 Member File, D2 Book Catalog and D3 Loan Records. Draw a Level 2 DFD for the system. (Describe every element and flow of your diagram in full.)',
    modelAnswer: "A Level 2 DFD expands ONE Level 1 process into its sub-processes, so the first decision is which parent to decompose; I take 2.0 Issue Book, the process with the most internal logic. Its children are numbered from the parent — 2.1, 2.2, 2.3, 2.4 — and drawn as circles or rounded rectangles, each labelled with a verb phrase. Before drawing anything, note what must balance: the parent 2.0 receives a 'book request' from the Member (via the Librarian), reads D1 Member File and D2 Book Catalog, writes to D3 Loan Records, and returns an 'issue slip' to the Member. Every one of those flows must appear somewhere in the child diagram, and no new external flow may appear. The diagram is then as follows. Process 2.1 Verify Membership Status receives the flow 'book request' (carrying member ID and book ID) from the external entity Member; it reads 'member record' from D1 Member File and outputs 'verified member details' to 2.2, or 'rejection notice' back to Member where membership is expired or suspended. Process 2.2 Check Book Availability receives 'verified member details' from 2.1; it reads 'book record' from D2 Book Catalog and outputs 'available book details' to 2.3, or 'unavailable notice' back to the Member. Process 2.3 Check Borrowing Limit receives 'available book details' from 2.2; it reads 'current loans' from D3 Loan Records, counts the member's outstanding loans against the permitted limit, and outputs 'approved loan details' to 2.4, or 'limit exceeded notice' to the Member. Process 2.4 Record Loan and Update Catalog receives 'approved loan details' from 2.3; it writes a 'new loan record' to D3 Loan Records, writes 'updated availability status' to D2 Book Catalog, and outputs the 'issue slip' to the Member. Checking the diagram against the rules: no data flows directly from one external entity to another; no flow runs directly between two data stores — D2 and D3 are both updated by 2.4 and never by each other; every process has at least one input and at least one output, so there are no black holes or miracles; every flow is named with a noun phrase describing the data it carries; every process name is unique and begins with a verb; and the diagram balances, since 'book request' and 'issue slip' are the same flows that crossed the boundary of the parent, and D1, D2 and D3 are accessed exactly as the parent required. The remaining Level 1 processes would be decomposed the same way in a full model — for example 4.0 Order Books into 4.1 Identify Low Stock Titles, 4.2 Prepare Purchase Order and 4.3 Record Received Stock, with the Publisher as the external entity.",
    markScheme: [
      'One Level 1 process correctly chosen as the parent, and its children numbered from it (2.1, 2.2, …) (2)',
      'Sub-processes identified, each named with a verb phrase and each performing a distinct step (3)',
      'The relevant data stores used, with correctly directed read and write flows to each (2.5)',
      'Data flows named with noun phrases, and external entities shown only where the parent had them (2.5)',
      'Balance demonstrated — every flow into and out of the parent process appears in the child diagram, with no new external flow (2)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 16 · 6.5.3 Rules for Drawing DFDs',
    question: 'Describe THREE rules that DFDs must follow and explain why each rule is important.',
    modelAnswer: "First: no direct entity-to-entity flows. Data cannot flow directly between two external entities; it must pass through a process. This matters because a DFD models what the system does, and a flow between two outside parties is not something the system does at all — drawing it claims responsibility the system does not have, and hides the fact that either the system should be processing that data or it does not belong on the diagram. Second: no process with only inputs, known as a black hole. Every process must have at least one output data flow. This matters because a process that consumes data and produces nothing is either mis-specified or the analyst has failed to discover where the data goes, and in either case the model is wrong in a way that will become a missing feature later. Its mirror image, a process with only outputs, is called a miracle, and every process must have at least one input data flow — data cannot be created out of nothing. Third: balanced decomposition. All data flows entering and leaving a parent process must appear in its child DFD. This matters because the levels of a DFD are a single model shown at different magnifications, not several independent drawings; if a flow present at Level 1 vanishes at Level 2, the two levels describe different systems and the analyst cannot tell which one the developers should build. The notes give four further rules: no direct store-to-store flows, since data cannot move between two data stores without a process in between; every data flow must have a meaningful name describing the data it carries, so that the diagram can be checked against the data dictionary; and each process must have a unique, descriptive name in the form of a verb phrase, so that two processes cannot be silently confused.",
    markScheme: [
      'First rule stated correctly and its importance explained, not merely asserted (3)',
      'Second rule stated correctly and its importance explained (3)',
      'Third rule stated correctly and its importance explained (3)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 17 · 6.6 Business Process Modeling and Notations (BPMN)',
    question: 'What is BPMN? Describe its four categories of components and state the benefits of using it.',
    modelAnswer: "Business Process Modeling and Notation (BPMN) is a standardised graphical notation developed by the Object Management Group (OMG) for depicting business processes. It provides a clear, intuitive way to visualise and communicate how business operations are carried out across different departments or systems within an organisation, and during requirement modeling the analyst uses it as a standard language of shapes and symbols representing events, processes and workflows. Its elements fall into four categories. Flow objects are the core elements defining the behaviour of a process, and there are three: events, which represent something that happens during a process — a start event indicating where the process begins, an intermediate event occurring during it, and an end event indicating where it ends — drawn as a circle; activities, representing work performed within the process, either a task (a single unit of work) or a sub-process (a group of related tasks), drawn as a rounded rectangle; and gateways, which control the flow of the process by making decisions and splitting or merging paths, comprising the exclusive gateway (XOR), the inclusive gateway (OR) and the parallel gateway (AND), drawn as a diamond. Connecting objects join flow objects together: a sequence flow shows the order in which activities are performed, drawn as a solid arrow; a message flow shows communication between different participants or organisations, drawn as a dashed arrow; and an association links artifacts or data to process elements, drawn as a dotted line. Swim lanes organise activities according to participants or responsibilities: a pool represents a participant, organisation or business entity, and a lane represents a department, role or individual within a pool — so a pool might be 'University' with lanes for the Admissions Office, the Finance Department and the Student. Artifacts provide additional information without affecting the flow: a data object represents information used or produced by activities, a group logically groups activities without affecting process flow, and a text annotation provides explanatory notes. The benefits are that the notation is standardised and widely understood; that it improves communication across business and IT teams, who would otherwise describe the same process in incompatible terms; that it facilitates process automation using workflow engines, since a BPMN model can be executed rather than merely read; that it helps identify redundancies and optimise workflows by making the whole process visible at once; and that it supports business process reengineering and digital transformation initiatives. Tools for drawing it include Camunda Modeler, Bizagi Modeler, Lucidchart or Draw.io, Signavio and IBM Blueworks Live.",
    markScheme: [
      'BPMN defined — a standardised graphical notation from the OMG for depicting business processes (2)',
      'Flow objects described — events, activities and gateways, with their symbols and sub-types (3)',
      'Connecting objects described — sequence flow, message flow and association, with their symbols (2.5)',
      'Swim lanes described — pool and lane, with an example (2)',
      'Artifacts described — data object, group, text annotation (1.5)',
      'At least two benefits of using BPMN given (1)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 16 · 6.5.1 DFD Notation and Symbols',
    question: 'Name the FOUR symbols used in a Data Flow Diagram and state what each represents.',
    items: [
      { name: 'Process', aliases: ['bubble', 'transform'], explain: 'An activity or function that transforms input data into output data. Labelled with a verb — Process Order, Verify Login.' },
      { name: 'Data Store', aliases: ['data store', 'store'], explain: 'Data at rest, or stored information — for example a Customer Database.' },
      { name: 'Data Flow', aliases: ['flow', 'arrow'], explain: 'The movement of data between processes, data stores and external entities. Labelled with nouns — Order Details, Payment Info.' },
      { name: 'Entity', aliases: ['external entity', 'terminator'], explain: 'An outside system or person that provides input to, or receives output from, the system — a Customer, a Bank.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 15 · 6.2 Categories of System Models',
    question: 'Name the FIVE categories of system model and give an example of each.',
    items: [
      { name: 'Process Models', aliases: ['process model'], explain: 'Show how data is processed and transformed — Data Flow Diagrams (DFD), Business Process Modeling Notation (BPMN).' },
      { name: 'Data Models', aliases: ['data model'], explain: 'Show the structure of data and the relationships within it — Entity Relationship Diagrams (ERD).' },
      { name: 'Behavioral Models', aliases: ['behavioural models', 'behaviour models'], explain: 'Show system behaviour and decision logic — decision tables and decision trees.' },
      { name: 'Object Models', aliases: ['object model'], explain: 'Combine data and behaviour — UML class diagrams.' },
      { name: 'Interface Models', aliases: ['interface model'], explain: 'Show how users interact with the system — prototypes and wireframes.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 15 · 6.3.2 Core Principles of Structured Analysis',
    question: 'Name the FIVE core principles of structured analysis.',
    items: [
      { name: 'Abstraction', aliases: ['levels of detail'], explain: 'Represent complex systems at different levels of detail.' },
      { name: 'Decomposition', aliases: ['breaking down'], explain: 'Break large, complex problems into smaller, manageable sub-problems.' },
      { name: 'Logical vs. physical separation', aliases: ['logical physical separation'], explain: 'Model what the system does (logical) before specifying how it will be implemented (physical).' },
      { name: 'Consistency', aliases: ['internal consistency'], explain: 'All models must be internally consistent with each other — the data dictionary must match the DFDs, and so on.' },
      { name: 'Completeness', aliases: ['complete coverage'], explain: 'All inputs, outputs and processes must be accounted for.' },
    ],
  },

  {
    type: 'recall',
    marks: 7,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 15 · 6.4 The Role of the Data Dictionary (Data Dictionary Notation)',
    question: 'State the meaning of each of the SEVEN data dictionary notations: =, +, { }, [ ], ( ), **, @',
    items: [
      { name: '= means "is composed of"', aliases: ['equals', 'is composed of', 'definition'], explain: 'Introduces the definition of a data element.' },
      { name: '+ means "and"', aliases: ['plus', 'and'], explain: 'Joins sequential components of a data element.' },
      { name: '{ } means iteration', aliases: ['braces', 'curly brackets', 'iteration'], explain: 'One or more occurrences of the enclosed element.' },
      { name: '[ ] means selection', aliases: ['square brackets', 'selection'], explain: 'One of several alternatives.' },
      { name: '( ) means optional', aliases: ['parentheses', 'round brackets', 'optional'], explain: 'The enclosed component may or may not be present.' },
      { name: '** encloses a comment', aliases: ['asterisks', 'comment', 'annotation'], explain: 'A comment or annotation, not part of the data itself.' },
      { name: '@ marks a key field', aliases: ['at sign', 'key field', 'identifier'], explain: 'The identifier — the key field of the data element.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 16 · 6.5.2 Levels of DFDs (DFD Level Hierarchy)',
    question: 'Describe the FOUR levels of the DFD hierarchy.',
    items: [
      { name: 'Level 0 (Context Diagram)', aliases: ['level 0', 'context diagram'], explain: 'Shows the entire system as a single process with all external entities and all data flows crossing the boundary. Provides the big picture.' },
      { name: 'Level 1 DFD', aliases: ['level 1'], explain: 'Expands the single process into its major sub-processes, typically 3-9 of them, and shows the major data stores.' },
      { name: 'Level 2 DFD', aliases: ['level 2'], explain: 'Expands each Level 1 process into its component sub-processes, revealing more detail.' },
      { name: 'Level n DFD', aliases: ['level n', 'primitive processes'], explain: 'Decomposition continues until primitive processes are reached — processes that cannot be further decomposed meaningfully.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 17 · 6.6.1 Components of BPMN',
    question: 'Name the FOUR categories of BPMN element and state what each contributes.',
    items: [
      { name: 'Flow objects', aliases: ['flow object'], explain: 'The core elements defining the behaviour of the process — events (circles), activities (rounded rectangles) and gateways (diamonds).' },
      { name: 'Connecting objects', aliases: ['connecting object', 'connectors'], explain: 'Join flow objects together — sequence flow (solid arrow), message flow (dashed arrow) and association (dotted line).' },
      { name: 'Swim lanes', aliases: ['swimlanes', 'pools and lanes'], explain: 'Organise activities by participant or responsibility — a pool for a participant or organisation, a lane for a department, role or individual within it.' },
      { name: 'Artifacts', aliases: ['artefacts'], explain: 'Provide additional information without affecting the flow — data objects, groups and text annotations.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.1.1 Entities',
    question: 'Differentiate between a strong entity and a weak entity in an ERD, providing an example of each from a university context.',
    modelAnswer: "An entity is a person, place, thing, event or concept about which the system stores data, and it is drawn as a rectangle in an ERD. A strong entity has its own unique identifier — a primary key made up of its own attributes — so an instance of it can be identified on its own, without reference to any other entity. In a university context, STUDENT is a strong entity: a student is identified by their registration number, which is unique in itself and depends on nothing else. COURSE is likewise strong, identified by its course code, and so is LECTURER, identified by a staff number. A weak entity cannot be uniquely identified without referencing a strong entity. It has at most a partial key — an attribute that distinguishes its instances only within the context of one owner — so its identity is borrowed from the entity it depends on. The notes' example is DEPENDENT, which depends on EMPLOYEE. In a university context, COURSE-OFFERING is a weak entity: an offering is identified by the session and semester in which it runs, but 'First semester, 2025/2026' is meaningless on its own and identifies a particular offering only once the COURSE it belongs to is known. A second example is EXAM-SCRIPT, identified by a script number that is only unique within a given examination. The difference has a direct consequence when the ERD is converted to a relational schema: a strong entity becomes a table whose own primary key attribute becomes the table's primary key, whereas a weak entity becomes a table whose primary key is a composite of its partial key together with the primary key of the owning strong entity. The notes name a third type alongside these two — the associative entity, which represents a many-to-many relationship and may carry its own attributes, such as ENROLLMENT between STUDENT and COURSE.",
    markScheme: [
      'Strong entity defined — has its own unique identifier, a primary key of its own attributes (2)',
      'Weak entity defined — cannot be uniquely identified without referencing a strong entity (2)',
      'A valid university example of each, with the identifier explained (2)',
      "Consequence stated — a weak entity's primary key combines its partial key with the owner's primary key (2)",
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.2 Cardinality and Participation',
    question: 'A sales system has the following entities: CUSTOMER, ORDER, PRODUCT, SALES-PERSON. Identify at least THREE relationships between these entities, state their cardinality, and justify each with a business rule.',
    modelAnswer: "First relationship: CUSTOMER places ORDER, with cardinality one-to-many (1:N). Business rule: a customer may place many orders over the lifetime of their account, but every order is placed by exactly one customer — an order with no customer could not be delivered or invoiced, and an order shared between two customers could not be paid for unambiguously. Participation is total on the ORDER side, since an order cannot exist without a customer, and partial on the CUSTOMER side, since a registered customer may not yet have ordered anything. In the relational schema this becomes a CustomerID foreign key on the ORDER table, added to the many side referencing the one side's primary key. Second relationship: ORDER contains PRODUCT, with cardinality many-to-many (M:N). Business rule: a single order may contain many different products, and any given product may appear on many different orders. This relationship also carries its own attributes — the quantity ordered and the unit price at the time of sale, which must be recorded on the relationship rather than on PRODUCT, because the price on an old order must not change when the catalogue price changes. It is therefore modelled as an associative entity, ORDER-LINE, and implemented as a junction table whose composite primary key is the pair of foreign keys OrderID and ProductID. Third relationship: SALES-PERSON handles ORDER, with cardinality one-to-many (1:N). Business rule: each order is credited to exactly one salesperson, because commission must be attributable to a single individual, while a salesperson handles many orders in a period. This becomes a SalesPersonID foreign key on ORDER. A fourth relationship can reasonably be added: SALES-PERSON serves CUSTOMER, one-to-many, where the business operates an account-manager model in which every customer is assigned to one salesperson who handles their account, though each salesperson looks after many customers. Note that if the business allowed a customer to be served by several salespersons, this would become many-to-many and would need its own junction table in the same way as ORDER-LINE — which illustrates the general point that cardinality is not a property of the data but a statement of the organisation's business rules, and must be confirmed with the client rather than assumed.",
    markScheme: [
      'First relationship named, its cardinality stated correctly, and justified by a business rule (4)',
      'Second relationship named, its cardinality stated correctly, and justified by a business rule (4)',
      'Third relationship named, its cardinality stated correctly, and justified by a business rule (4)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.5 ERD to Relational Schema',
    question: 'State the rules for converting an ERD into a relational database schema.',
    modelAnswer: "The transformation from an ERD to a relational schema is systematic, and the notes give six rules. A strong entity becomes a table, and its primary key attribute becomes that table's primary key — so STUDENT with attributes StudentID, Name, Department and DOB becomes a STUDENT table keyed on StudentID. A weak entity also becomes a table, but its primary key is a combination of its own partial key and the primary key of the owning strong entity, since by definition it cannot be identified on its own; DEPENDENT, owned by EMPLOYEE, is keyed on (EmployeeID, DependentName) rather than on the name alone. A one-to-one relationship is implemented by adding a foreign key to either side, preferring the side with total participation — placing the key on the side that must participate avoids rows whose foreign key is null. A one-to-many relationship is implemented by adding a foreign key to the many side, referencing the primary key of the one side: since one DEPARTMENT employs many EMPLOYEES, the EMPLOYEE table carries DepartmentID. A many-to-many relationship cannot be implemented with a foreign key on either side, because neither side can hold a single value; it requires a new junction table containing foreign keys to both entities, which together form its composite primary key — so STUDENTS enrolling in many COURSES produces an ENROLLMENT table keyed on (StudentID, CourseCode), which is also the natural place to store attributes belonging to the relationship itself, such as the session and the score. Finally, a multi-valued attribute cannot be stored in a single column without violating first normal form, so it becomes a separate table with a foreign key back to the parent entity: an EMPLOYEE with several PhoneNumbers yields a PHONE table keyed on (EmployeeID, PhoneNumber). Following these rules mechanically produces a schema that is already close to normalised, which is why the last of the seven steps to create an ERD is to normalise and refine — checking for redundancy and applying the normalisation rules.",
    markScheme: [
      "Strong entity → a table whose own primary key attribute becomes the table's primary key (1.5)",
      "Weak entity → a table whose primary key combines its partial key with the owning entity's primary key (2)",
      '1:1 relationship → a foreign key on either side, preferring the total-participation side (1.5)',
      "1:N relationship → a foreign key on the many side referencing the one side's primary key (2)",
      'M:N relationship → a new junction table holding foreign keys to both entities as a composite primary key (2)',
      'Multi-valued attribute → a separate table with a foreign key back to the parent entity (1)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.8.4 Steps to Construct a Decision Table / 6.8.5 Example: Bank Loan Decision Table',
    question: 'Construct a decision table for the following scenario. A cinema offers discounts based on whether the customer is a member (Yes/No), whether it is a weekday (Yes/No), and whether the customer is an elderly person (Yes/No). Members get 20% off, elders get 15% off, weekday screenings get 10% off. Combinations can stack, but the maximum total discount is 30%.',
    modelAnswer: "Step 1 — identify the conditions. There are three: Member? Weekday? Elderly? Step 2 — identify the actions. The possible outcomes are the discount rates that can result: 30%, 25%, 20%, 15%, 10%, and no discount. Step 3 — calculate the maximum number of rules. For n binary conditions the maximum is 2 to the power n, so 2^3 = 8 rules, R1 to R8. Step 4 — enumerate the condition entries systematically, halving the run length on each row: Member? reads Y Y Y Y N N N N across R1-R8; Weekday? reads Y Y N N Y Y N N; Elderly? reads Y N Y N Y N Y N. Step 5 — determine the action for each rule by stacking the applicable discounts and then applying the 30% cap. R1 (member, weekday, elderly) = 20 + 10 + 15 = 45%, capped to 30%. R2 (member, weekday, not elderly) = 20 + 10 = 30%. R3 (member, not weekday, elderly) = 20 + 15 = 35%, capped to 30%. R4 (member, not weekday, not elderly) = 20%. R5 (not member, weekday, elderly) = 10 + 15 = 25%. R6 (not member, weekday, not elderly) = 10%. R7 (not member, not weekday, elderly) = 15%. R8 (not member, not weekday, not elderly) = no discount. Step 6 — verify completeness: all eight combinations are present and each has exactly one action, so no combination is unhandled and none is ambiguous. Step 7 — simplify. Two rules may be merged when they produce identical actions and differ in exactly one condition, the differing condition being replaced by a dash. R1 and R2 both give 30% and differ only in Elderly?, so they merge into a single rule reading Member = Y, Weekday = Y, Elderly = '-' → apply 30%. R3 also gives 30% but differs from the merged rule in two conditions, so it cannot be merged further, and the table reduces from eight rules to seven. Laid out on paper, the table has its condition stubs (the three question names) in the upper-left quadrant and their Y/N entries in the upper right; the action stubs (Apply 30%, Apply 25%, Apply 20%, Apply 15%, Apply 10%, No discount) in the lower left, with an X in the lower-right quadrant under each rule that triggers that action.",
    markScheme: [
      'The three conditions identified, and the maximum number of rules calculated as 2^3 = 8 (2)',
      'All eight combinations of Y and N enumerated systematically, not haphazardly (3)',
      'The discounts stacked correctly for each rule (3)',
      'The 30% cap applied correctly to the rules that would otherwise exceed it — R1 at 45% and R3 at 35% (2)',
      'Actions marked against each rule, and the table checked for completeness or simplified by merging where a condition makes no difference (2)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.9 Decision Trees / 6.9.4 Comparison between Decision Tree and Decision Table',
    question: 'Convert the cinema decision table into a decision tree. Which format is more appropriate for presenting it to the cinema management? Justify your answer.',
    modelAnswer: "A decision tree has three kinds of node: the root node, the first condition to be evaluated, drawn at the far left; internal or decision nodes, each representing a condition to be tested, with two or more branches emerging from it; and leaf or terminal nodes at the far right, each representing the final action. Branches are labelled with the outcome of the condition tested at the node they leave. Taking Member? as the root, since it carries the largest single discount, the tree is as follows. From the root, the Yes branch leads to an internal node testing Weekday? From that node, the Yes branch leads to a node testing Elderly?, whose Yes branch ends in a leaf 'Apply 30% (capped from 45%)' and whose No branch ends in a leaf 'Apply 30%'. Still under Member = Yes, the No branch of Weekday? leads to a node testing Elderly?, whose Yes branch ends in 'Apply 30% (capped from 35%)' and whose No branch ends in 'Apply 20%'. Back at the root, the No branch leads to a second Weekday? node. Its Yes branch leads to an Elderly? node whose Yes branch ends in 'Apply 25%' and whose No branch ends in 'Apply 10%'. Its No branch leads to an Elderly? node whose Yes branch ends in 'Apply 15%' and whose No branch ends in 'No discount'. The tree has eight leaves, one for each rule of the table, and is read left to right: start at the root, evaluate the condition, follow the matching branch, and continue until a leaf is reached. For presenting this to cinema management, the decision tree is the more appropriate format. The comparison the notes give settles it on three counts: on audience suitability, the table is better for technical audiences while the tree is better for management and non-technical readers; on readability, the tree is clearer for sequential decisions, since a manager can trace the single path that applies to one customer rather than scanning a matrix of eight columns; and on condition hierarchy, the tree shows conditions in priority order, so management can see immediately that membership is the dominant factor, where the table treats all conditions equally. The trade-off should be acknowledged: completeness is easy to check on a table, where you simply count the columns against 2^n, but harder on a tree, where every branch must be traced. That is exactly why the notes recommend using both — build the decision table first to guarantee completeness, then convert it to a decision tree for presentation to stakeholders.",
    markScheme: [
      'Decision tree structure correctly described — root node, internal (decision) nodes, labelled branches, leaf (action) nodes (2)',
      'The tree correctly derived from the table, with all eight outcomes present as leaves (3)',
      'The decision tree recommended for presenting to management (1.5)',
      'Justified from the comparison — better for non-technical audiences, clearer for sequential decisions, shows conditions in priority order (2)',
      'The trade-off acknowledged — completeness is easier to verify on a table, so build the table first and convert it for presentation (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.9.4 Comparison between Decision Tree and Decision Table / 6.9.6 When to Use Which Tool',
    question: 'Compare decision tables and decision trees, and state when each should be used.',
    modelAnswer: "Both tools represent the same decision logic, but they differ in six respects. In format, a decision table is a tabular matrix, while a decision tree is a graphical, branching structure. In the completeness check, the table is easy — you count the columns and verify them against the 2^n combinations expected — whereas on a tree every branch must be traced, which is harder and easier to get wrong. In readability for complex logic, the table becomes hard to read as conditions multiply, while the tree is clearer for sequential decisions. In audience suitability, the table is better for technical audiences and the tree better for management and non-technical readers. In condition hierarchy, the table treats all conditions equally, while the tree necessarily shows them in priority order — whichever condition is at the root is evaluated first. In the space required, a table grows horizontally as conditions are added (2^n columns), while a tree grows deeper. Both convert to code readily: the table maps directly to structured code, and the tree maps well to nested IF-ELSE statements or a switch. Their individual strengths follow. A decision table ensures all combinations are considered, is easy to verify and test, is unambiguous because each rule has one outcome, translates directly to code, and doubles as test case documentation; against that, it grows to 2^n rules, cannot show sequence or timing, is less intuitive for unfamiliar stakeholders, and does not show the hierarchy of conditions. A decision tree is very intuitive and visual, accessible to non-technical stakeholders, shows the priority and sequence of decisions, is easy to follow along a single path and maps naturally to a flowchart; against that, it can become large and complex, forces conditions to be evaluated in a fixed sequence, is inefficient when conditions interact equally, duplicates the same action across many leaves, and may need redrawing entirely when the logic changes. Use a decision table when the conditions are independent, when you need to ensure completeness, when all combinations matter, and when the audience is technical. Use a decision tree when the conditions are naturally sequential or hierarchical, when the audience is non-technical, or when you want to show which conditions are evaluated first. Best of all, use both together: build the decision table first to ensure completeness, then convert it to a decision tree for presentation to stakeholders.",
    markScheme: [
      'Format contrasted — tabular matrix against graphical branching structure (1.5)',
      'Completeness check contrasted — easy to count columns on a table, harder to trace every branch on a tree (1.5)',
      'Audience suitability contrasted — table for technical readers, tree for management and non-technical readers (1.5)',
      'Condition hierarchy contrasted — all conditions treated equally on a table, shown in priority order on a tree (1.5)',
      'Growth contrasted — a table grows horizontally with 2^n columns, a tree grows deeper (1.5)',
      'When each should be used stated, and the combined strategy given — build the table first for completeness, then convert for presentation (2.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.8 Decision Tables / 6.8.1 Structure of a Decision Table / 6.8.2 Terminology',
    question: 'What is a decision table? Describe its structure and define the terms rule, condition and action.',
    modelAnswer: "A decision table is a structured, tabular representation of complex decision logic. It sets out the various conditions that may exist, the actions that can be taken, and the combinations of conditions that lead to each action. It is particularly useful when several interrelated conditions together determine an outcome, and the notes give a practical rule of thumb: decision tables are especially valuable where you find yourself writing deeply nested IF-ELSE logic, so if you need more than three levels of nesting, consider a decision table instead. Its structure has four quadrants, formed by dividing the table horizontally into conditions above and actions below, and vertically into stubs on the left and entries on the right. The upper-left quadrant holds the condition stubs — the names or descriptions of each condition. The upper-right quadrant holds the condition entries — Y or N for a binary table, or specific values for an extended one — one column per rule. The lower-left quadrant holds the action stubs, the names or descriptions of each possible action. The lower-right quadrant holds the action entries: an X or tick marking which actions apply under each rule. As for the terminology: a rule is a single column of the table, representing one specific combination of conditions together with the actions that result from that combination. A condition is a factor or variable that affects the outcome of the decision; each condition may take one of two values (Y or N in a binary, limited-entry table) or one of several values in an extended table. An action is what the system does when a particular combination of conditions holds, and more than one action may apply to a single rule.",
    markScheme: [
      'Decision table defined — a structured tabular representation of complex decision logic, showing conditions, actions and the combinations linking them (2)',
      'The four quadrants described — condition stubs and entries above, action stubs and entries below (2.5)',
      'Rule defined — a single column representing one combination of conditions and the actions that follow (1.5)',
      'Condition defined — a factor affecting the outcome, binary or multi-valued (1)',
      'Action defined — what the system does when a combination holds, with more than one possible per rule (1)',
    ],
  },

  {
    type: 'recall',
    marks: 3,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.1.1 Entities',
    question: 'Name the THREE types of entity identified in an ERD, with an example of each.',
    items: [
      { name: 'Strong entity', aliases: ['strong'], explain: 'Has its own unique identifier (primary key) — STUDENT, COURSE, EMPLOYEE.' },
      { name: 'Weak entity', aliases: ['weak'], explain: 'Cannot be uniquely identified without referencing a strong entity — DEPENDENT, which depends on EMPLOYEE.' },
      { name: 'Associative entity', aliases: ['associative', 'junction entity'], explain: 'Represents a many-to-many relationship and may have its own attributes — ENROLLMENT, between STUDENT and COURSE.' },
    ],
  },

  {
    type: 'recall',
    marks: 5,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.1.2 Attributes',
    question: 'Name the FIVE types of attribute in an ERD, with an example of each.',
    items: [
      { name: 'Simple attribute', aliases: ['simple', 'atomic attribute'], explain: 'Cannot be subdivided — Age, StudentID.' },
      { name: 'Composite attribute', aliases: ['composite'], explain: 'Made up of multiple sub-attributes — Address, comprising Street, City and Postcode.' },
      { name: 'Derived attribute', aliases: ['derived'], explain: 'Calculated from other attributes — Age, derived from DateOfBirth.' },
      { name: 'Multi-valued attribute', aliases: ['multivalued', 'multi valued'], explain: 'Can hold multiple values — PhoneNumbers. In the relational schema it becomes a separate table.' },
      { name: 'Key attribute', aliases: ['key', 'primary key attribute'], explain: 'Uniquely identifies each entity instance — StudentID.' },
    ],
  },

  {
    type: 'recall',
    marks: 3,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.2.1 Cardinality Ratios',
    question: 'Name the THREE cardinality ratios, with a real-world example of each.',
    items: [
      { name: 'One-to-One (1:1)', aliases: ['1:1', 'one to one'], explain: 'One instance of entity A relates to at most one instance of entity B — one EMPLOYEE manages one DEPARTMENT as its head, and one DEPARTMENT has one head.' },
      { name: 'One-to-Many (1:N)', aliases: ['1:N', 'one to many'], explain: 'One instance of A relates to many instances of B — one DEPARTMENT employs many EMPLOYEES, and each EMPLOYEE belongs to one DEPARTMENT.' },
      { name: 'Many-to-Many (M:N)', aliases: ['M:N', 'many to many'], explain: 'Many instances of A relate to many of B — STUDENTS enrol in many COURSES, and each COURSE has many STUDENTS. Requires a junction or associative table in implementation.' },
    ],
  },

  {
    type: 'recall',
    marks: 7,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.4 Steps to Create an ERD',
    question: 'List the SEVEN steps to create an ERD, in order.',
    items: [
      { name: 'Identify all entities', aliases: ['identify entities'], explain: 'Look for nouns in the requirements that represent things the system must remember.' },
      { name: 'Identify attributes for each entity', aliases: ['identify attributes'], explain: 'What information must be stored about each entity?' },
      { name: 'Identify primary keys', aliases: ['primary keys'], explain: 'What uniquely identifies each entity instance?' },
      { name: 'Identify relationships', aliases: ['relationships'], explain: 'Which entities interact with each other? Use verbs to name the relationships.' },
      { name: 'Determine cardinality and participation', aliases: ['cardinality', 'participation'], explain: 'How many of each entity can participate in the relationship, and must every instance participate?' },
      { name: 'Identify weak entities and associative entities', aliases: ['weak entities', 'associative entities'], explain: 'Do any entities depend on others for their identity, or resolve a many-to-many relationship?' },
      { name: 'Normalize and refine', aliases: ['normalise', 'normalisation'], explain: 'Check for redundancy and apply the normalisation rules.' },
    ],
  },

  {
    type: 'recall',
    marks: 2,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 18 · 6.7.2.2 Participation Constraints',
    question: 'Name the TWO participation constraints and state what each means.',
    items: [
      { name: 'Total participation (mandatory)', aliases: ['total', 'mandatory'], explain: 'Every instance of the entity must participate in the relationship — every EMPLOYEE must be assigned to a DEPARTMENT.' },
      { name: 'Partial participation (optional)', aliases: ['partial', 'optional'], explain: 'Some instances may not participate — an EMPLOYEE may or may not manage a PROJECT.' },
    ],
  },

  {
    type: 'recall',
    marks: 3,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.8.3 Types of Decision Tables',
    question: 'Name the THREE types of decision table and state what distinguishes each.',
    items: [
      { name: 'Limited-Entry Table', aliases: ['limited entry'], explain: 'Each condition entry is only Y or N. Simple, but may require many rules — for n conditions, a maximum of 2^n rules.' },
      { name: 'Extended-Entry Table', aliases: ['extended entry'], explain: 'Condition entries may take more than two values, such as age ranges (<18, 18-65, >65), which reduces the number of rules needed.' },
      { name: 'Mixed-Entry Table', aliases: ['mixed entry'], explain: 'Combines Y/N conditions and multi-valued conditions in the same table.' },
    ],
  },

  {
    type: 'recall',
    marks: 7,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.8.4 Steps to Construct a Decision Table',
    question: 'List the SEVEN steps to construct a decision table, in order.',
    items: [
      { name: 'Identify all conditions', aliases: ['identify conditions'], explain: 'List every condition or factor that influences the decision.' },
      { name: 'Identify all possible actions', aliases: ['identify actions'], explain: 'List every action the system can take.' },
      { name: 'Calculate the maximum number of rules', aliases: ['calculate rules', 'maximum rules'], explain: 'For n binary conditions, the maximum is 2^n rules.' },
      { name: 'Fill in the condition entries', aliases: ['condition entries'], explain: 'Systematically enumerate all combinations of Y and N.' },
      { name: 'Determine the actions for each rule', aliases: ['determine actions'], explain: 'Mark an X for each action that applies under that rule.' },
      { name: 'Verify completeness', aliases: ['verify', 'completeness'], explain: 'Check that all possible combinations have been covered.' },
      { name: 'Simplify the table', aliases: ['simplify', 'merge rules'], explain: 'Merge rules where a condition makes no difference, replacing it with a dash. Two rules merge when they produce identical actions and differ in exactly one condition.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 6 · System Modeling',
    source: 'Topic 19 · 6.9.1 Structure of a Decision Tree',
    question: 'Name the FOUR components of a decision tree and state what each represents.',
    items: [
      { name: 'Root node', aliases: ['root'], explain: 'The starting point — the first condition to be evaluated, drawn at the far left or the top.' },
      { name: 'Internal nodes (decision nodes)', aliases: ['internal nodes', 'decision nodes'], explain: 'Represent conditions to be tested; each has two or more branches emerging from it.' },
      { name: 'Branches', aliases: ['branch'], explain: 'Lines connecting nodes, labelled with the outcome or value of the condition being tested — Yes/No, or specific values.' },
      { name: 'Leaf nodes (terminal nodes)', aliases: ['leaf nodes', 'terminal nodes'], explain: 'Represent the final action or result when no more conditions need to be evaluated, drawn at the far right or the bottom.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  CHAPTER 7 — UML DIAGRAMS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 15,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 20-27 Review Questions · Q1 / Topic 17 · 6.6.1 Components of BPMN',
    question: "University of Uyo students' course registration process involves the following steps: (a) a student submits a course registration form; (b) the department reviews the course selection; (c) if approved, the finance office verifies fee payment; (d) if payment is confirmed, the student is registered; (e) if payment is not confirmed, the student is notified to complete payment. Draw a BPMN diagram representing the above process, and identify and explain the BPMN components used: Events, Activities, Gateways and Sequence flows. (Describe every element of your diagram in full.)",
    modelAnswer: "The diagram is drawn in one pool, 'University of Uyo', divided into three lanes — Student, Department and Finance Office — so that each element sits in the lane of whoever performs it. In the Student lane, a start event (a thin circle) labelled 'Registration opens' begins the process, followed by the task 'Submit course registration form' (a rounded rectangle). A sequence flow (a solid arrow) carries the flow into the Department lane, to the task 'Review course selection'. From that task a sequence flow leads to an exclusive gateway (a diamond, XOR) labelled 'Selection approved?' with two outgoing flows, each carrying a guard label. The 'No' flow returns to the Student lane, to the task 'Revise course selection', whose outgoing flow loops back into 'Review course selection' — this is the rework path the stated process implies. The 'Yes' flow crosses into the Finance Office lane, to the task 'Verify fee payment'. From that task, a second exclusive gateway labelled 'Payment confirmed?' splits the flow. Its 'Yes' branch leads to the task 'Register student', in the Department lane, and then to an end event (a thick circle) labelled 'Student registered'. Its 'No' branch leads to the task 'Notify student to complete payment', and then either to a second end event labelled 'Registration incomplete', or — if the process is modelled as allowing the student to return — back to 'Verify fee payment' after the student pays. A data object may be attached to the first task with a dotted association line, labelled 'Course registration form'. The components used are as follows. Events represent something that happens during the process, and are drawn as circles: a start event indicates where the process begins ('Registration opens'), an intermediate event occurs during it, and an end event indicates where it ends ('Student registered'). Activities represent work performed within the process and are drawn as rounded rectangles; each of 'Submit course registration form', 'Review course selection', 'Verify fee payment', 'Register student' and 'Notify student to complete payment' is a task, the single unit of work, while a group of related tasks would be a sub-process. Gateways control the flow by making decisions and splitting or merging paths, and are drawn as diamonds; both gateways here are exclusive (XOR) gateways, because exactly one outgoing path is taken — the selection is either approved or not, and the payment is either confirmed or not. The other kinds are the inclusive gateway (OR), where one or more paths may be taken, and the parallel gateway (AND), where all paths are taken concurrently. Sequence flows show the order in which activities are performed and are drawn as solid arrows; the flows leaving a gateway carry guard labels ('Yes'/'No') naming the condition under which each is followed. Message flows, drawn as dashed arrows, would be used instead where the communication crossed to a separate pool — for instance to an external bank verifying the payment.",
    markScheme: [
      'Start event and end event(s) identified, drawn as circles, and correctly placed (2)',
      'All five activities identified as tasks and drawn as rounded rectangles (3)',
      'Gateways identified as diamonds, with the exclusive (XOR) type named and the two decision points correctly placed (3)',
      'Sequence flows shown as solid arrows, with guard labels on the flows leaving each gateway (2)',
      'Pool and lanes used to assign each element to the Student, Department or Finance Office (2)',
      'The process traced correctly end to end, including the path taken when payment is not confirmed (3)',
    ],
  },

  {
    type: 'longform',
    marks: 15,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 23 · 7.4.3 Sequence Diagram',
    question: 'A university plans to develop a Library Management System with the following functions: (a) register library members; (b) manage book inventory; (c) issue and return books; (d) calculate fines for overdue books; (e) generate reports on book usage. Develop a Sequence diagram for the Library Management System. (Describe every lifeline, message and fragment of your diagram in full.)',
    modelAnswer: "A sequence diagram models one scenario, not a whole system, so I model the return-a-book scenario, which exercises both the loan records and the fine calculation. Five lifelines are drawn as boxes across the top, each with a dashed vertical line running downward to represent the object's lifetime: the actor :Member, and the objects :LibrarianUI, :LoanManager, :FineCalculator and :LibraryDatabase. Time runs downward, and each message is a horizontal arrow from the sender's lifeline to the receiver's; a thin activation box is drawn on a lifeline for the period in which that object is active and controlling the flow. The messages, in order, are these. The Member sends returnBook(bookID) to :LibrarianUI — a synchronous message, drawn as a solid arrow with a filled head, because the sender waits for the response. :LibrarianUI sends processReturn(bookID) to :LoanManager, also synchronous. :LoanManager sends findLoan(bookID) to :LibraryDatabase, which replies with the loan record on a return message, drawn as a dashed arrow. :LoanManager then sends a self message, checkDueDate(), an arrow from its own lifeline back to itself, evaluating whether the due date has passed. An alt combined fragment — a frame labelled 'alt', divided into two compartments by a dashed line, each guarded by a condition — encloses what happens next. In the first compartment, guarded by [returnDate > dueDate], :LoanManager sends calculateFine(daysOverdue) to :FineCalculator, which returns the fine amount on a return message; :LoanManager then sends recordFine(memberID, amount) to :LibraryDatabase. In the second compartment, guarded by [else], no fine messages are sent. After the fragment closes, :LoanManager sends closeLoan(loanID) to :LibraryDatabase and updateStatus(bookID, 'available') to the same lifeline, then returns a receipt to :LibrarianUI on a dashed return message, which in turn returns the confirmation and any fine notice to the Member. Where the librarian returns several books in one visit, the whole exchange would be wrapped in a loop combined fragment. The other fragment types available are opt, for optional behaviour with no else branch, and par, for concurrent execution. Note that asynchronous messages — solid arrows with an open line head, where the sender does not wait — would be used for something like a notification email sent to the member, since the system need not block on it.",
    markScheme: [
      'Lifelines identified and drawn as boxes with dashed vertical lines, including an actor and the participating objects (3)',
      "Activation boxes shown on the lifelines for the periods in which each object is active (1.5)",
      'Messages shown as horizontal arrows in time order, with synchronous and return messages distinguished by their arrow styles (4)',
      'A combined fragment used correctly for the conditional logic — alt with guard conditions, or loop where repetition applies (3)',
      'One coherent scenario modelled end to end, rather than an attempt to draw all five system functions at once (2.5)',
      'Time correctly ordered top to bottom, and a self message or asynchronous message used appropriately (1)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 21 · 7.4.1 Use Case Diagrams',
    question: 'A hospital outpatient appointment system follows these steps: (a) a patient requests an appointment; (b) the receptionist checks doctor availability; (c) if the doctor is available, an appointment is scheduled; (d) if the doctor is not available, the patient is asked to choose another date; (e) the patient receives confirmation of the appointment. Draw a use case diagram to represent the outpatient appointment process. (Describe every element of your diagram in full.)',
    modelAnswer: "A use case diagram describes the functional requirements of the system from the user's perspective — what the system should do, not how it does it. The diagram has a system boundary drawn as a rectangle labelled 'Outpatient Appointment System', with the actors outside it and the use cases inside. Three actors are drawn as stick figures: Patient, the primary actor who initiates the process; Receptionist, who operates the system on the patient's behalf; and Doctor, a secondary actor whose schedule the system consults and who receives the appointment. Inside the boundary, the use cases are drawn as ovals, each naming a goal an actor wants to achieve: 'Request Appointment', 'Check Doctor Availability', 'Schedule Appointment', 'Propose Alternative Date' and 'Send Confirmation'. The relationships are as follows. Associations, drawn as plain solid lines, connect Patient to 'Request Appointment' and to 'Send Confirmation'; Receptionist to 'Check Doctor Availability', 'Schedule Appointment' and 'Propose Alternative Date'; and Doctor to 'Check Doctor Availability' and 'Schedule Appointment'. An include relationship, drawn as a dashed arrow labelled «include», runs from 'Schedule Appointment' to 'Check Doctor Availability', because availability is always checked whenever an appointment is scheduled — include denotes mandatory, unconditional inclusion of another use case's functionality. A second include runs from 'Schedule Appointment' to 'Send Confirmation', since step (e) says the patient always receives a confirmation once an appointment is made. An extend relationship, drawn as a dashed arrow labelled «extend» pointing from the extending use case to the base one, runs from 'Propose Alternative Date' to 'Check Doctor Availability', because proposing another date happens only under a condition — when the doctor is not available — and extend is precisely the notation for behaviour that occurs optionally, under certain conditions. A generalization, drawn as a solid line with a hollow triangle, could be added if the hospital distinguished a 'Returning Patient' actor inheriting from 'Patient'. Note what is deliberately absent: a use case diagram shows no sequence, no timing and no decision logic, so the if/else structure of steps (c) and (d) is expressed by the extend relationship rather than by a branch — an activity diagram or BPMN model would be the right tool to show the flow itself. Use case diagrams of this kind are applied in requirements gathering and analysis, system scope definition, communication with stakeholders and the derivation of test cases.",
    markScheme: [
      'Actors identified and drawn as stick figures outside the boundary — Patient, Receptionist, and Doctor or equivalent (2.5)',
      'Use cases identified and drawn as ovals, each named as a goal the actor wants to achieve (3)',
      'System boundary drawn as a rectangle separating internal use cases from external actors (1.5)',
      'Associations drawn between actors and the use cases they participate in (2)',
      'Include and/or extend relationships used correctly, with the mandatory/conditional distinction justified (3)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 20 · 7.0 Introduction to UML / 7.1 Purpose / 7.3 Categories of UML Diagrams',
    question: 'What is UML? State its purposes and describe the two categories into which UML diagrams are classified.',
    modelAnswer: "The Unified Modeling Language (UML) is a standardised visual language used in software engineering for specifying, visualising, constructing and documenting software systems. It was developed in the mid-1990s by Grady Booch, Ivar Jacobson and James Rumbaugh at Rational Software, and has become the industry standard for object-oriented analysis and design. It serves five purposes. It provides a common language in which developers, analysts and stakeholders can communicate a system's design, so that the same picture means the same thing to all of them. It enables the visualisation of system architecture and behaviour before implementation, when changing it is still cheap. It facilitates documentation that can be maintained throughout the software lifecycle rather than written once and abandoned. It supports both forward engineering — generating code from models — and reverse engineering, generating models from existing code. And it helps identify design flaws and potential issues early in the development process. UML is maintained by the Object Management Group, an international technology standards consortium. The current major version is UML 2.x, which introduced significant enhancements over UML 1.x, including improved diagram types and better support for component-based development; UML 2.5.1, released in 2017, is the latest stable version, and it defines 14 diagram types in two categories. Structural diagrams represent the static aspects of the system, showing the organisation of its components — class diagrams, component diagrams and deployment diagrams belong here. Behavioural diagrams represent the dynamic aspects, showing how the system behaves over time — use case diagrams, sequence diagrams, activity diagrams and state chart diagrams belong here. The distinction matters in practice because the two answer different questions: a structural diagram tells you what the system is made of, while a behavioural diagram tells you what it does, and a design review needs both.",
    markScheme: [
      'UML defined — a standardised visual language for specifying, visualising, constructing and documenting software systems (2)',
      'Its originators and period given — Booch, Jacobson and Rumbaugh at Rational Software, mid-1990s (1)',
      'At least three of its five purposes stated (3)',
      'Maintained by the OMG; UML 2.5.1 (2017) with 14 diagram types (1)',
      'Structural diagrams defined as the static aspects, with examples (1.5)',
      'Behavioural diagrams defined as the dynamic aspects, with examples (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 22 · 7.4.2 Class Diagram / 7.4.2.1 Key Components',
    question: 'Describe the key components of a class diagram, including the compartments of a class, the visibility modifiers, and the relationships that may hold between classes.',
    modelAnswer: "Class diagrams are structural diagrams representing the static structure of a system by showing its classes, their attributes and methods, and the relationships among them. They are the most commonly used UML diagrams and form the foundation of object-oriented design. A class is drawn as a rectangle divided into three compartments. The top compartment holds the class name, in bold and centred. The middle compartment holds the attributes — the data members — each with a visibility modifier. The bottom compartment holds the methods, or operations, again with visibility modifiers. Four visibility modifiers are used: + for public, meaning accessible from anywhere; - for private, accessible only within the class; # for protected, accessible within the class and its subclasses; and ~ for package, accessible within the same package. Six relationships may hold between classes. An association is a semantic relationship between classes, drawn as a solid line, and may carry a multiplicity at each end — 1, 0..1, 1..*, or * — stating how many instances of one class relate to an instance of the other. An aggregation is a 'has-a' relationship representing a whole-part relationship in which the part can exist independently of the whole, drawn with a hollow diamond at the whole end: a Department has Lecturers, but a Lecturer continues to exist if the department is dissolved. A composition is the stronger 'contains-a' relationship in which the part cannot exist without the whole, drawn with a filled diamond: an Order contains OrderLines, and deleting the order destroys them. An inheritance or generalization is an 'is-a' relationship representing inheritance, drawn as a solid line with a hollow triangle arrowhead pointing at the parent class. A dependency is a weaker relationship in which one class merely depends on another — using it as a parameter or a local variable, say — drawn as a dashed arrow. A realization or implementation shows that a class implements an interface, drawn as a dashed line with a hollow triangle. Class diagrams are used in object-oriented analysis and design, in database schema design, for code generation, and for system architecture documentation.",
    markScheme: [
      'The class rectangle and its three compartments described — name, attributes, methods (2.5)',
      'The four visibility modifiers given with their meanings — + public, - private, # protected, ~ package (2)',
      'Association described, with multiplicity (1.5)',
      'Aggregation and composition distinguished — hollow against filled diamond, and whether the part can exist independently (3)',
      'Inheritance/generalization described as the is-a relationship with a hollow triangle arrow (1.5)',
      'Dependency and realization described, with their notations (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 24 · 7.4.4 Activity Diagrams',
    question: 'Describe the key components of an activity diagram and state when it should be used.',
    modelAnswer: "Activity diagrams are behavioural diagrams that model the flow of control or data through a system, showing the sequence of activities and the decisions that affect that flow. They resemble flowcharts but provide more sophisticated modelling capabilities, particularly for concurrent and parallel processes. Their components are as follows. The initial node, a filled circle, marks the start of the activity flow. A final node ends it: an activity final node, a circle containing a filled inner circle, ends all flows, while a flow final node, a circle containing a cross, ends only the single flow that reaches it. An action, drawn as a rounded rectangle, is a single step or operation in the workflow. A decision node, drawn as a diamond, is a conditional branch where the flow splits according to a condition, with guards written on the outgoing edges; a merge node, drawn as the same diamond shape, is where several flows converge back into one. A fork node, drawn as a thick horizontal or vertical bar, splits a single flow into multiple concurrent flows, and a join node, drawn as the same bar, synchronises several concurrent flows back into one — this pair is what distinguishes an activity diagram from an ordinary flowchart, which cannot express concurrency. Swimlanes, also called partitions, are vertical or horizontal divisions organising the activities according to who performs them or which system component is responsible. Control flow arrows show the order in which activities are performed, while object flows show how data or objects move between activities. Activity diagrams are used for business process modelling, for workflow documentation, for representing an algorithm, and for modelling concurrent and parallel processes — the last being the case where no simpler notation will do.",
    markScheme: [
      'Activity diagram defined — models the flow of control or data, with the sequence of activities and the decisions affecting it (1.5)',
      'Initial node and final nodes described, with activity final and flow final distinguished (1.5)',
      'Action described as a rounded rectangle representing a single step (1)',
      'Decision node and merge node described, with guards on the outgoing edges of a decision (2)',
      'Fork node and join node described as splitting into and synchronising concurrent flows (2)',
      'Swimlanes (partitions) described (1)',
      'Control flow and object flow distinguished, and at least one proper use of the diagram stated (1)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 25 · 7.4.5 State Chart Diagram',
    question: 'Describe the key components of a state chart diagram and state when it should be used.',
    modelAnswer: "State chart diagrams, also called state machine diagrams, are behavioural diagrams that model the dynamic behaviour of a system by showing how an object transitions through different states in response to events. They are particularly useful for event-driven systems and for lifecycle modelling. A state is drawn as a rounded rectangle representing a condition or situation during the life of an object, and may specify four things: its name, which identifies it; an entry action, performed when the state is entered; an exit action, performed when it is left; and a do activity, an ongoing activity performed while the object remains in that state. Two pseudo-states bound the machine: the initial state, a filled circle indicating where the state machine starts, and the final state, a circle containing a filled inner circle representing its termination. A transition is an arrow from one state to another, and its label has three parts, any of which may be present: the event, the trigger that causes the transition to occur; the guard condition, a Boolean expression that must be true for the transition to be taken; and the action, an operation performed during the transition itself. Two further constructs allow hierarchy: a composite state is a state that contains sub-states, permitting hierarchical modelling so that a complex state can be described by its own internal state machine; and a history state is a special pseudo-state that remembers the last active sub-state when a composite state is exited, so that re-entering the composite resumes where it left off rather than restarting. State charts are used for modelling an object's lifecycle, for modelling user interface behaviour, in protocol specifications, and for modelling embedded systems and control logic — in each case, because the system's correct response to an input depends on what has already happened, which is exactly what a state records.",
    markScheme: [
      'State chart defined — models how an object transitions through states in response to events (1.5)',
      'State described as a rounded rectangle, with name, entry action, exit action and do activity (2.5)',
      'Initial state and final state described with their notations (1.5)',
      'Transition described as an arrow labelled with an event, a guard condition and an action (3)',
      'Composite state and history state described (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 26 · 7.4.6 Component Diagram / Topic 27 · 7.4.7 Deployment Diagrams',
    question: 'Distinguish between a component diagram and a deployment diagram, describing the key elements of each.',
    modelAnswer: "Both are structural diagrams, but they answer different questions: a component diagram shows how the software is organised, while a deployment diagram shows where that software physically runs. A component diagram shows the organisation of, and the dependencies among, the physical or logical components of a system, illustrating the high-level architecture and how software components are interconnected. Its elements are these. A component is drawn as a rectangle bearing a component icon — two smaller rectangles on its left side — and represents a modular, deployable and replaceable part of the system that encapsulates its implementation and exposes interfaces. An interface is the contract specifying the operations a component provides or requires: a provided interface, the services the component offers to others, is drawn as a lollipop or ball on a stick; a required interface, the services it needs from others, is drawn as a socket or semicircle. A port is the interaction point between a component and its environment, through which the provided and required interfaces are exposed. A dependency, drawn as a dashed arrow, shows that one component depends on another. An assembly connector links the required interface of one component to the provided interface of another, showing how the components are wired together — the ball fitting into the socket. A deployment diagram models the physical deployment of software artifacts onto hardware nodes, showing the runtime configuration of hardware devices and execution environments and how the software is distributed across the infrastructure. Its elements are these. A node is drawn as a three-dimensional box representing a computational resource, physical or virtual, on which artifacts are deployed; it is either a device node, meaning physical hardware such as a server, workstation, mobile device or sensor, or an execution environment node, meaning a software container or platform such as an operating system, a JVM, a web server or a database server. An artifact is a physical piece of information used or produced by the development process, drawn as a rectangle with an artifact icon — executable files (.exe, .jar), libraries (.dll, .so), configuration files, database schemas and documents. A communication path is a line connecting nodes, representing a network connection or protocol such as HTTP, TCP/IP or JDBC. A deployment specification carries configuration details for a deployed artifact, such as memory or processor requirements. A manifestation, drawn as a dashed arrow with the «manifest» stereotype, shows that an artifact implements or realises a component — which is precisely the link between the two diagram types. Component diagrams are used in system architecture design and component-based development; deployment diagrams in infrastructure planning, installation planning, capacity planning, and cloud or distributed system architecture.",
    markScheme: [
      'The distinction stated — a component diagram shows how the software is organised, a deployment diagram where it physically runs (1.5)',
      'Component described, with provided and required interfaces and their lollipop and socket notations (2.5)',
      'Port, dependency and assembly connector described (2)',
      'Deployment diagram defined, and the node described as a three-dimensional box, with device and execution environment nodes distinguished (2.5)',
      'Artifact and communication path described, with examples (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 21 · 7.4.1.1 Key Components',
    question: 'Describe the components and relationships of a use case diagram, distinguishing clearly between the include and extend relationships.',
    modelAnswer: "A use case diagram is a behavioural diagram describing the functional requirements of a system from the user's perspective. It shows the interactions between actors and the system, representing what the system should do without specifying how it accomplishes those tasks. Its components are as follows. Actors are the external entities that interact with the system, drawn as stick figures; an actor may be a human user, another system, or a hardware device. Use cases are the specific functionalities or services the system provides, drawn as ovals, each describing a goal that an actor wants to achieve. The system boundary is a rectangle defining the scope of the system, separating the internal use cases from the external actors — everything inside is the system's responsibility, everything outside is not. Four relationships may appear. An association is a communication link between an actor and a use case, drawn as a plain solid line. An include relationship means that one use case includes the functionality of another, and the inclusion is mandatory: the included use case is always performed as part of the base use case, so 'Withdraw Cash' includes 'Authenticate Customer', because authentication happens on every withdrawal without exception. An extend relationship means that one use case extends another under certain conditions, and is therefore optional: the extending behaviour occurs only when its condition holds, so 'Print Receipt' extends 'Withdraw Cash' only when the customer asks for one. The mandatory/conditional contrast is the whole of the distinction, and the arrow directions differ accordingly — include points from the base use case to the one it includes, while extend points from the extending use case back to the base it extends. A generalization is an inheritance relationship between use cases, or between actors, drawn with a hollow triangle. Use case diagrams are applied in requirements gathering and analysis, in system scope definition, in communication with stakeholders, and in the derivation of test cases.",
    markScheme: [
      'Actors and use cases described, with their notations — stick figures and ovals (2)',
      'System boundary described as a rectangle separating internal use cases from external actors (1)',
      'Association described as the communication link between an actor and a use case (1.5)',
      'Include described correctly as mandatory inclusion of another use case (1.5)',
      'Extend described correctly as conditional, optional behaviour (1.5)',
      'Generalization described as the inheritance relationship between use cases or actors (0.5)',
    ],
  },

  {
    type: 'recall',
    marks: 7,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 27 · 7.5 Summary',
    question: 'Name the SEVEN UML diagram types covered in this chapter and state what each is for.',
    items: [
      { name: 'Use Case diagrams', aliases: ['use case'], explain: 'Capture functional requirements and user interactions — what the system should do, from the user’s perspective. Behavioural.' },
      { name: 'Class diagrams', aliases: ['class diagram'], explain: 'Define the static structure and relationships of system components — classes, attributes, methods. Structural, and the foundation of object-oriented design.' },
      { name: 'Sequence diagrams', aliases: ['sequence'], explain: 'Illustrate time-ordered message exchanges between objects in a particular scenario. Behavioural.' },
      { name: 'Activity diagrams', aliases: ['activity'], explain: 'Model workflow and business processes, including concurrent and parallel flows. Behavioural.' },
      { name: 'State Chart diagrams', aliases: ['state chart', 'state machine'], explain: 'Represent state-dependent behaviour and an object’s lifecycle, showing transitions in response to events. Behavioural.' },
      { name: 'Component diagrams', aliases: ['component'], explain: 'Show the organisation of software modules and their dependencies, and the interfaces they provide and require. Structural.' },
      { name: 'Deployment diagrams', aliases: ['deployment'], explain: 'Depict physical deployment and runtime infrastructure — which artifacts run on which nodes. Structural.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 22 · 7.4.2.1 Key Components (Visibility Modifiers)',
    question: 'State the FOUR UML visibility modifiers and what each means.',
    items: [
      { name: '+ (public)', aliases: ['public', 'plus'], explain: 'Accessible from anywhere.' },
      { name: '- (private)', aliases: ['private', 'minus'], explain: 'Accessible only within the class.' },
      { name: '# (protected)', aliases: ['protected', 'hash'], explain: 'Accessible within the class and its subclasses.' },
      { name: '~ (package)', aliases: ['package', 'tilde'], explain: 'Accessible within the same package.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 22 · 7.4.2.1 Key Components (Relationships)',
    question: 'Name the SIX relationships that may appear on a class diagram, with the notation for each.',
    items: [
      { name: 'Association', aliases: ['associate'], explain: 'A semantic relationship between classes, drawn as a solid line, and able to carry multiplicity (1, 0..1, 1..*, *).' },
      { name: 'Aggregation', aliases: ['has-a'], explain: "A 'has-a' whole-part relationship where the part can exist independently of the whole. Hollow diamond at the whole end." },
      { name: 'Composition', aliases: ['contains-a'], explain: "A stronger 'contains-a' relationship where the part cannot exist without the whole. Filled diamond at the whole end." },
      { name: 'Inheritance / Generalization', aliases: ['inheritance', 'generalization', 'is-a'], explain: "An 'is-a' relationship representing inheritance. Solid line with a hollow triangle arrowhead pointing at the parent." },
      { name: 'Dependency', aliases: ['depends on'], explain: 'A weaker relationship where one class depends on another. Dashed arrow.' },
      { name: 'Realization / Implementation', aliases: ['realization', 'implementation'], explain: 'Implementation of an interface. Dashed line with a hollow triangle.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 23 · 7.4.3.1 Key Components (Messages)',
    question: 'Name the FOUR types of message on a sequence diagram and state how each is drawn.',
    items: [
      { name: 'Synchronous message', aliases: ['synchronous'], explain: 'A solid arrow with a filled head — the sender waits for a response before continuing.' },
      { name: 'Asynchronous message', aliases: ['asynchronous'], explain: 'A solid arrow with an open line head — the sender does not wait.' },
      { name: 'Return message', aliases: ['return'], explain: 'A dashed arrow, indicating the return from a method call.' },
      { name: 'Self message', aliases: ['self call', 'reflexive message'], explain: 'A message from an object to itself, drawn as an arrow leaving and re-entering the same lifeline.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 23 · 7.4.3.1 Key Components (Combined Fragments)',
    question: 'Name the FOUR combined fragments used on a sequence diagram and state what each expresses.',
    items: [
      { name: 'alt (alternative)', aliases: ['alt'], explain: 'Conditional logic — the if-else structure, with each compartment guarded by a condition.' },
      { name: 'opt (option)', aliases: ['opt'], explain: 'Optional behaviour — an if with no else.' },
      { name: 'loop', aliases: ['looping'], explain: 'Repeated behaviour.' },
      { name: 'par (parallel)', aliases: ['par'], explain: 'Concurrent execution of the enclosed interactions.' },
    ],
  },

  {
    type: 'recall',
    marks: 6,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 24 · 7.4.4.1 Key Components',
    question: 'Name SIX components of an activity diagram and state what each represents.',
    items: [
      { name: 'Initial node', aliases: ['initial'], explain: 'A filled circle marking the start of the activity flow.' },
      { name: 'Final node', aliases: ['final', 'activity final', 'flow final'], explain: 'A circle with a filled inner circle ends all flows (activity final); a circle with a cross ends a single flow (flow final).' },
      { name: 'Action', aliases: ['activity', 'action node'], explain: 'A rounded rectangle representing a single step or operation in the workflow.' },
      { name: 'Decision node / Merge node', aliases: ['decision node', 'merge node'], explain: 'A diamond where the flow splits on a condition, with guards on the outgoing edges (decision), or where several flows converge into one (merge).' },
      { name: 'Fork node / Join node', aliases: ['fork', 'join'], explain: 'A thick bar where one flow splits into several concurrent flows (fork), or where concurrent flows synchronise back into one (join).' },
      { name: 'Swimlanes (partitions)', aliases: ['swimlanes', 'partitions'], explain: 'Divisions organising activities by who performs them or which component is responsible.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    chapter: 'Chapter 7 · UML Diagrams',
    source: 'Topic 27 · 7.4.7.1 Key Components',
    question: 'Name FOUR elements of a deployment diagram and state what each represents.',
    items: [
      { name: 'Device node', aliases: ['device'], explain: 'Physical hardware — servers, workstations, mobile devices, sensors. Drawn as a three-dimensional box.' },
      { name: 'Execution environment node', aliases: ['execution environment'], explain: 'A software container or platform — an operating system, JVM, web server or database server.' },
      { name: 'Artifact', aliases: ['artefact'], explain: 'A physical piece of information used or produced by development — executables (.exe, .jar), libraries (.dll, .so), configuration files, database schemas, documents.' },
      { name: 'Communication path', aliases: ['communication'], explain: 'A line connecting nodes, representing a network connection or protocol such as HTTP, TCP/IP or JDBC.' },
    ],
  },
];
