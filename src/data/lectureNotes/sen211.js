// SEN 211 — Introduction to Software Engineering
// Topics 1–3 are transcribed from the lecturer's handwritten notes, typed up and
// proofread (phonetic and spelling errors corrected). Topics 4–10 are
// transcribed from the typed course notes ("Lecture Notes - SEN 211", 25 pp.,
// the Phoenix copy), with line-break hyphenation and typing slips corrected
// and nothing added. That document's figures are described in text
// sections headed "(figure in the notes)" / "Figure N".
//
// Ten topics; the course outline lists twelve areas. Topic number = the order
// in the notes, not the outline. Still to come, in outline order:
//
//    Software Engineering Laws
//    Software Measurement and Estimation Techniques
//    Software Configuration Management
//    Software Reuse
//    Version control with Git and GitHub
//    Secure software development lifecycle
//
// Which syllabus items each topic reaches is recorded on the course as
// `noteCoverage` (courses.js), not here.
//
// No image figures. Material added beyond the lecturer's notes is marked with a
// `note` section ("Added for completeness").

export const sen211LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 1 — SOFTWARE ENGINEERING CONCEPTS AND PRINCIPLES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'Software Engineering Concepts and Principles',
    sections: [
      {
        type: 'definition',
        text: 'Software engineering is the systematic design, development, testing, and maintenance of software applications, guided by key principles and methodologies to ensure quality and efficiency.',
      },
      {
        type: 'termlist',
        heading: 'Key Concepts in Software Engineering',
        items: [
          { term: 'Software Engineering', def: 'The application of engineering principles to software development in a methodical way. It encompasses the entire software life cycle, from requirements gathering to design, implementation, testing, and maintenance.' },
          { term: 'Software Development Life Cycle (SDLC)', def: 'Includes phases such as planning, analysis, design, implementation, testing, deployment, and maintenance. Each phase has specific deliverables and activities that contribute to the overall success of the software project.' },
          { term: 'Methodologies', def: 'Various methodologies guide software development: Agile, Waterfall and DevOps (below).' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Methodologies',
        items: [
          { term: 'Agile', def: 'Focuses on iterative development, customer collaboration, and flexibility to change.' },
          { term: 'Waterfall', def: 'A linear approach where each phase must be completed before the next phase begins.' },
          { term: 'DevOps', def: 'Integrates development and operations to improve collaboration and productivity by automating workflows.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Core Principles of Software Engineering',
        items: [
          { term: 'Modularity', def: 'Breaking down software into smaller, manageable components that can be developed and tested independently; this enhances manageability and reusability.' },
          { term: 'Abstraction', def: 'Hiding complex implementation details and exposing only the necessary parts of a component to simplify interactions.' },
          { term: 'Encapsulation', def: 'Bundling data and methods that operate on data within a single unit, protecting the internal state from external interference.' },
          { term: 'Reusability', def: 'Designing components that can be reused across different projects, saving time and resources.' },
          { term: 'Testing', def: 'Ensuring that software meets its requirements and is free of defects through various testing methods, including unit testing, integration testing, and system testing.' },
          { term: 'Continuous Integration and Deployment (CI/CD)', def: 'Practices that encourage frequent integration of code changes and automated deployment to improve software quality and delivery speed.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Importance of Software Engineering',
        items: [
          { term: 'Quality Assurance', def: 'Adhering to software engineering principles in order to minimize defects, improve reliability, and ensure that the software meets user expectations.' },
          { term: 'Efficiency and Productivity', def: 'Best practices streamline development processes, reducing waste and accelerating delivery.' },
          { term: 'Collaboration', def: 'Clear guidelines foster effective teamwork, enhancing communication and problem-solving.' },
          { term: 'Maintainability and Scalability', def: 'Well-structured code and documentation make it easier to modify and scale software as requirements evolve.' },
        ],
      },
      {
        type: 'text',
        heading: 'Conclusion',
        text: 'Software engineering is a critical discipline that combines technical skills with systematic processes to create high-quality software. By understanding and applying its core concepts and principles, software engineers can effectively navigate the complexities of software development, ensuring that applications are reliable, efficient, and aligned with user needs.',
      },
      {
        type: 'text',
        heading: 'Software Engineering and Its Place in the Computing Discipline',
        text: 'Software Engineering (S.E.) is a core branch of computing that applies engineering principles to the design, development, testing, and maintenance of software systems. It bridges computer science and engineering, ensuring that software is not only functional, but also reliable, scalable, and maintainable.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'What is Software Engineering?', def: 'The systematic application of engineering approaches to software development. It involves requirement analysis, design, coding, testing, and maintenance.' },
          { term: 'Goal', def: 'To produce high-quality software that meets user needs, is cost-effective, and can evolve over time.' },
          { term: 'Scope', def: 'Covers small applications to large enterprise systems, embedded systems, and mission-critical software.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 3 — SOFTWARE DEVELOPMENT PROCESS AND SDLC
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2',
    title: 'Software Development Process and the SDLC',
    sections: [
      {
        type: 'definition',
        heading: 'Software Development Process',
        text: 'A structured set of activities used to design, build, test, and deploy a software system. Its goal is to deliver high-quality software that meets user requirements, time, and budget.',
      },
      {
        type: 'text',
        heading: 'Software Development Life Cycle (SDLC)',
        text: 'The SDLC defines the phases through which software passes from idea to development.',
      },
      {
        type: 'bullets',
        heading: 'Phases of the SDLC',
        items: [
          'Requirement Analysis',
          'System Design',
          'Implementation (Coding)',
          'Testing',
          'Deployment',
          'Maintenance',
        ],
      },

      // Phase 1
      {
        type: 'text',
        heading: 'Phase 1: Requirement Analysis',
        text: 'Purpose: to understand what the user needs and why they need it.',
      },
      {
        type: 'bullets',
        heading: 'Activities involved in Requirement Analysis',
        items: [
          'Stakeholder interviews',
          'Requirement gathering workshops',
          'Feasibility study (technically, economically, and operationally)',
          'Requirement prioritization',
        ],
      },
      {
        type: 'termlist',
        heading: 'Types of Requirements',
        items: [
          { term: 'Functional Requirements', def: 'What the system should do (e.g., user login).' },
          { term: 'Non-Functional Requirements', def: 'How the system performs (e.g., performance, security, scalability, usability).' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Output of Requirement Analysis',
        items: [
          'Software Requirement Specification (SRS)',
          'Use Cases / User Stories',
        ],
      },

      // Phase 2
      {
        type: 'text',
        heading: 'Phase 2: System Design',
        text: 'Purpose: converts requirements into a technical blueprint.',
      },
      {
        type: 'termlist',
        heading: 'Design Levels',
        items: [
          { term: 'High-Level Design (HLD)', def: 'Involves system architecture, technology stack, and database design.' },
          { term: 'Low-Level Design (LLD)', def: 'Involves API specifications, class diagrams, database schema, algorithms, and data structures.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Output of System Design',
        items: [
          { term: 'Software Design Document (SDD)', def: 'Designing the system architecture and documenting it.' },
          { term: 'UML (Unified Modeling Language) Diagrams', def: 'Class, Sequence, and Architecture diagrams.' },
        ],
      },

      // Phase 3
      {
        type: 'text',
        heading: 'Phase 3: Implementation (Coding)',
        text: 'Purpose: converting the design into working software.',
      },
      {
        type: 'bullets',
        heading: 'Activities involved',
        items: [
          'Write source code',
          'Review source code',
          'Version control',
          'Continuous integration',
        ],
      },
      {
        type: 'bullets',
        heading: 'Best Practices',
        items: [
          'Coding standards',
          'Reusability',
          'Modular coding',
          'Secure coding practices',
        ],
      },
      {
        type: 'bullets',
        heading: 'Output of Implementation',
        items: [
          'Source code',
          'Executables or builds',
        ],
      },

      // Phase 4
      {
        type: 'text',
        heading: 'Phase 4: Testing',
        text: 'Purpose: to ensure that the product is bug-free and meets requirements.',
      },
      {
        type: 'termlist',
        heading: 'Types of Testing',
        items: [
          { term: 'Unit Testing', def: 'Individual module testing.' },
          { term: 'Integration Testing', def: 'Module interaction testing.' },
          { term: 'System Testing', def: 'Testing the complete system.' },
          { term: 'Acceptance Testing', def: 'User validation.' },
          { term: 'Regression Testing', def: 'Ensuring new changes do not break existing functionality.' },
          { term: 'Performance Testing', def: 'Load and scalability testing.' },
          { term: 'Security Testing', def: 'Vulnerability assessment.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Testing Techniques',
        items: [
          'Manual testing',
          'Automated testing',
        ],
      },
      {
        type: 'bullets',
        heading: 'Testing Phase Output',
        items: [
          'Test cases',
          'Test bug (defect) report',
          'Test summary',
        ],
      },

      // Phase 5
      {
        type: 'text',
        heading: 'Phase 5: Deployment',
        text: 'Purpose: software is released to the production environment.',
      },
      {
        type: 'bullets',
        heading: 'Activities involved',
        items: [
          'Environment configuration',
          'Data migration',
          'User training',
          'Release management',
        ],
      },
      {
        type: 'bullets',
        heading: 'Deployment Strategies',
        items: [
          'Big bang deployment',
          'Phased deployment',
          'Blue-green deployment',
          'Canary release',
        ],
      },
      {
        type: 'bullets',
        heading: 'Output of Deployment',
        items: [
          'Live application',
          'Deployment documentation',
        ],
      },

      // Phase 6
      {
        type: 'text',
        heading: 'Phase 6: Maintenance',
        text: 'Purpose: keeps the system running efficiently after release/use.',
      },
      {
        type: 'termlist',
        heading: 'Types of Maintenance',
        items: [
          { term: 'Corrective Maintenance', def: 'Fixing bugs and defects.' },
          { term: 'Adaptive Maintenance', def: 'Updating software to work in new or changing environments.' },
          { term: 'Perfective Maintenance', def: 'Improving performance or adding new features.' },
          { term: 'Preventive Maintenance', def: 'Making changes to prevent future problems and improve maintainability.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 3 — SOFTWARE PROCESS MODELS AND CMMI
  // ─────────────────────────────────────────────────────────────────
  {
    number: '3',
    title: 'Software Process Models and CMMI',
    sections: [
      {
        type: 'text',
        heading: '1. Waterfall Model',
        text: 'A linear and sequential model where each phase must be completed before moving to another phase.',
      },
      {
        type: 'bullets',
        heading: 'Advantages',
        items: ['Simple and easy to understand.', 'Good for small and stable projects.'],
      },
      {
        type: 'bullets',
        heading: 'Disadvantages',
        items: ['Changes are difficult once development starts.', 'Non-flexible.'],
      },

      {
        type: 'text',
        heading: '2. Incremental Model',
        text: 'Software is developed and delivered in small functional parts (increments). Each increment has its own functionality.',
      },
      {
        type: 'bullets',
        heading: 'Advantages',
        items: ['Early delivery of working software.', 'Easier to manage changes.'],
      },
      {
        type: 'bullets',
        heading: 'Disadvantages',
        items: ['Requires good upfront planning and design.', 'Total cost is often higher than the Waterfall model.'],
      },

      {
        type: 'text',
        heading: '3. Spiral Model',
        text: 'A risk-driven model combining iterative development and risk analysis in repeated cycles.',
      },
      {
        type: 'bullets',
        heading: 'Advantages',
        items: ['Good for large and high-risk projects.', 'Risk is handled early.'],
      },
      {
        type: 'bullets',
        heading: 'Disadvantages',
        items: ['Can be expensive and complex to manage.', 'Requires expertise in risk assessment.'],
      },

      {
        type: 'text',
        heading: '4. Agile Model',
        text: 'Focuses on customer collaboration and rapid, iterative delivery (e.g., Extreme Programming, Scrum).',
      },
      {
        type: 'bullets',
        heading: 'Advantages',
        items: ['Adapts easily to changes.', 'Continuous feedback from stakeholders.'],
      },

      {
        type: 'text',
        heading: '5. V-Model (Verification and Validation Model)',
        text: 'Focuses on verification and validation. It is an extension of the Waterfall model where each development phase has a corresponding testing phase.',
      },
      {
        type: 'bullets',
        heading: 'Advantages',
        items: ['Strong focus on testing and quality.'],
      },

      {
        type: 'note',
        text: 'Added for completeness: the disadvantages listed for the Incremental and Spiral models were not in the original notes. For the exam, remember that Agile and the V-Model each have the advantages above, and be ready to compare any two models on flexibility, cost, risk handling and suitability for project size.',
      },
      {
        type: 'definition',
        heading: 'Capability Maturity Model Integration (CMMI)',
        text: 'CMMI is a process improvement framework that helps organizations develop and refine their processes for better performance, quality, and efficiency.',
      },
      {
        type: 'table',
        heading: 'Levels of CMMI',
        headers: ['Level', 'Name', 'Description'],
        rows: [
          ['1', 'Initial', 'Processes are ad-hoc and chaotic.'],
          ['2', 'Repeatable (Managed)', 'Past successes can be repeated.'],
          ['3', 'Defined', 'Processes are documented and standardized.'],
          ['4', 'Managed (Quantitatively Managed)', 'Processes are measured and controlled.'],
          ['5', 'Optimizing', 'Focuses on applying continuous process improvement.'],
        ],
      },
      {
        type: 'bullets',
        heading: 'Advantages of CMMI',
        items: [
          'Improves consistency across projects.',
          'Reduces project failure rates.',
          'Enhances customer confidence.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Limitations of CMMI',
        items: [
          'Can be expensive and documentation-heavy.',
          'Time-consuming to implement.',
          'Difficult for small teams to adopt.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 4 — REQUIREMENTS ANALYSIS AND REQUIREMENTS ENGINEERING
  //  (Phoenix lecture notes, pp. 1–8)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '4',
    title: 'Requirements Analysis and Requirements Engineering',
    sections: [
      {
        type: 'bullets',
        heading: 'IEEE definition of a requirement',
        items: [
          'A condition or capability needed by a user to solve a problem or achieve an objective.',
          'A condition or a capability that must be met or possessed by a system to satisfy a contract, standard, specification, or other formally imposed document.',
        ],
      },
      {
        type: 'definition',
        heading: 'Requirements engineering (RE)',
        text: 'The requirements for a system are the descriptions of what the system should do — the services that it provides and the constraints on its operation. The process of finding out, analyzing, documenting and checking these services and constraints is called requirements engineering (RE).',
      },
      {
        type: 'text',
        text: 'These requirements reflect the needs of customers for a system that serves a certain purpose, such as controlling a device, placing an order, or finding information. The goal of the requirements activity is to produce the Software Requirements Specification (SRS), which describes what the proposed software should do without describing how the software will do it.',
      },
      {
        type: 'text',
        text: 'Requirements engineering provides the appropriate mechanism for understanding what the customer wants, analyzing need, assessing feasibility, negotiating a reasonable solution, specifying the solution unambiguously, validating the specification and managing the requirements as they are transformed into an operational system.',
      },
      {
        type: 'termlist',
        heading: 'User requirements and system requirements',
        items: [
          { term: 'User requirements', def: 'High-level, abstract statements, in a natural language plus diagrams, of what services the system is expected to provide to system users and the constraints under which it must operate.' },
          { term: 'System requirements', def: 'More detailed descriptions of the software system’s functions, services, and operational constraints. The system requirements document (sometimes called a functional specification) should define exactly what is to be implemented. It may be part of the contract between the system buyer and the software developers.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'The requirements process',
        items: [
          'The process of understanding and defining what services are required from the system and identifying the constraints on the system’s operation and development.',
          'Requirements engineering is a particularly critical stage of the software process, as errors at this stage inevitably lead to later problems in the system design and implementation.',
          'The requirements engineering process aims to produce an agreed requirements document that specifies a system satisfying stakeholder requirements.',
        ],
      },
      {
        type: 'text',
        heading: 'The requirements engineering process (figure in the notes)',
        text: 'The lecturer’s figure shows the flow of the process: a Feasibility Study produces a Feasibility Report and leads into Requirements Elicitation and Analysis; elicitation and analysis produces System Models and feeds Requirements Specification; specification leads into Requirements Validation, with arrows running back from specification to elicitation. (The bottom of the figure — the documents the last two activities produce — is cut off in the copy of the notes this was transcribed from.)',
      },
      {
        type: 'termlist',
        heading: 'The four main activities in the requirements engineering process',
        items: [
          { term: 'I. Feasibility study', def: 'An estimate is made of whether the identified user needs may be satisfied using current software and hardware technologies. The study considers whether the proposed system will be cost-effective from a business point of view and if it can be developed within existing budgetary constraints. A feasibility study should be relatively cheap and quick. The result should inform the decision of whether or not to go ahead with a more detailed analysis.' },
          { term: 'II. Requirements elicitation and analysis', def: 'The process of deriving the system requirements through observation of existing systems, discussions with potential users and procurers, task analysis, and so on. This may involve the development of one or more system models and prototypes, which help one to understand the system to be specified.' },
          { term: 'III. Requirements specification', def: 'The activity of translating the information gathered during the analysis activity into a document that defines a set of requirements.' },
          { term: 'IV. Requirements validation', def: 'This activity checks the requirements for realism, consistency, and completeness. During this process, errors in the requirements document are inevitably discovered. It must then be modified to correct these problems.' },
        ],
      },
      {
        type: 'note',
        text: 'N/B: The activities in the requirements process are not simply carried out in a strict sequence. Requirements analysis continues during definition and specification, and new requirements come to light throughout the process. Therefore, the activities of analysis, definition, and specification are interleaved.',
      },
      {
        type: 'termlist',
        heading: 'Properties of a good SRS document',
        items: [
          { term: 'Concise', def: 'The SRS document should be concise and at the same time unambiguous, consistent, and complete. Verbose and irrelevant descriptions reduce readability and also increase error possibilities.' },
          { term: 'Structured', def: 'It should be well-structured. A well-structured document is easy to understand and modify. In practice, the SRS document undergoes several revisions to cope with the customer requirements, which often evolve over a period of time. Therefore, to make modifications to the SRS document easy, it is important to make the document well-structured.' },
          { term: 'Black-box view', def: 'It should only specify what the system should do and refrain from stating how to do it. The SRS document should specify the external behavior of the system and not discuss implementation issues: it views the system to be developed as a black box and specifies its externally visible behavior. For this reason, the SRS document is also called the black-box specification of a system.' },
          { term: 'Conceptual integrity', def: 'It should show conceptual integrity so that the reader can easily understand it.' },
          { term: 'Response to undesired events', def: 'It should characterize acceptable responses to undesired events. These are called system response to exceptional conditions.' },
          { term: 'Verifiable', def: 'All requirements of the system as documented in the SRS document should be verifiable. This means that it should be possible to determine whether or not requirements have been met in an implementation.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Problems without an SRS document',
        items: [
          'The system would not be implemented according to customer needs.',
          'Software developers would not know whether what they are developing is exactly what the customer requires.',
          'It would be very difficult for maintenance engineers to understand the functionality of the system.',
          'It would be very difficult for user-document writers to write the users’ manuals properly without understanding the SRS document.',
        ],
      },
      {
        type: 'text',
        heading: 'Functional and non-functional requirements',
        text: 'Software system requirements are often classified as functional requirements or non-functional requirements.',
      },
      {
        type: 'bullets',
        heading: 'Functional requirements',
        items: [
          'Statements of services the system should provide, how the system should react to particular inputs, and how the system should behave in particular situations.',
          'Functional requirements may also explicitly state what the system should not do.',
          'A functional requirements specification should be Complete — all services required by the user should be defined — and Consistent — it should not have contradictory definitions (and should also avoid ambiguity).',
        ],
      },
      {
        type: 'bullets',
        heading: 'Non-functional requirements',
        items: [
          'Requirements that are not directly concerned with the specific services delivered by the system to its users.',
          'Non-functional requirements, such as performance, security, or availability, usually specify or constrain characteristics of the system as a whole.',
          'They typically relate to the system as a whole rather than to individual system features.',
          'They can often be the deciding factor in the survival of the system (e.g. reliability, cost, response time).',
          'They arise through user needs, because of budget constraints, organizational policies, the need for interoperability with other software or hardware systems, or external factors such as safety regulations or privacy legislation.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Requirements specification',
        items: [
          'The process of writing down the user and system requirements in a requirements document. Ideally, the user and system requirements should be clear, unambiguous, easy to understand, complete, and consistent.',
          'The user requirements for a system should describe the functional and non-functional requirements so that they are understandable by system users who do not have detailed technical knowledge.',
          'System requirements are expanded versions of the user requirements that are used by software engineers as the starting point for the system design. They add detail and explain how the user requirements should be provided by the system.',
          'System requirements should simply describe the external behavior of the system and its operational constraints. They should not be concerned with how the system should be designed or implemented.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Requirements elicitation and analysis',
        items: [
          'The second stage in the requirements engineering process.',
          'In this stage, software engineers work with customers and system end-users to find out about the application domain, what services the system should provide, the required performance of the system, hardware constraints, etc.',
          'It may involve a variety of different kinds of people in an organization — stakeholders: people who have some direct or indirect influence on the system’s requirements.',
          'Stakeholders include end-users, engineers, business managers, domain experts and trade union representatives.',
        ],
      },
      {
        type: 'text',
        heading: 'The elicitation and analysis process (figure in the notes)',
        text: 'The lecturer’s figure draws the process as a cycle of four numbered activities: 1. Requirements Discovery → 2. Requirements Classification and Organization → 3. Requirements Prioritization and Negotiation → 4. Requirements Specification, and from specification back round to discovery.',
      },
      {
        type: 'termlist',
        heading: 'Activities of the elicitation and analysis phase',
        items: [
          { term: 'a) Requirements discovery', def: 'The process of interacting with stakeholders of the system to discover their requirements. Domain requirements from stakeholders and documentation are also discovered during this activity.' },
          { term: 'b) Requirements classification and organization', def: 'Takes the unstructured collection of requirements, groups related requirements, and organizes them into coherent clusters.' },
          { term: 'c) Requirements prioritization and negotiation', def: 'Inevitably, when multiple stakeholders are involved, requirements will conflict. This activity is concerned with prioritizing requirements, and finding and resolving requirements conflicts through negotiation.' },
          { term: 'd) Requirements specification', def: 'Requirements are documented and a formal or informal requirements document is produced.' },
        ],
      },
      {
        type: 'text',
        heading: 'Tools used in requirements elicitation',
        text: 'The notes list four: interviews, ethnography (observation), scenarios, and use cases.',
      },
      {
        type: 'bullets',
        heading: 'Ethnography (observation)',
        items: [
          'A social scientist spends a considerable time observing and analysing how people actually work.',
          'People do not have to explain or articulate their work.',
          'Social and organisational factors of importance may be observed.',
          'Ethnographic studies have shown that work is usually richer and more complex than suggested by simple system models.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Scenarios',
        items: [
          'Scenarios are descriptions of how a system is used in practice.',
          'They are helpful in requirements elicitation, as people can relate to these more readily than to an abstract statement of what they require from a system.',
          'Scenarios are particularly useful for adding detail to an outline requirements description.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Use cases',
        items: [
          'The use case is a requirements elicitation technique that was first introduced in the Objectory method.',
          'A use case specifies the functionality of a system by specifying the behavior of the system, captured as interactions of the users with the system.',
          'A use case identifies the actors involved in an interaction and names the type of interaction.',
          'Use cases are documented using a high-level use case diagram.',
          'The set of use cases represents all of the possible interactions that will be described in the system requirements.',
          'Actors in the process, who may be human or other systems, are represented as stick figures. Each class of interaction is represented as a named ellipse.',
          'Lines link the actors with the interaction.',
        ],
      },
      {
        type: 'table',
        heading: 'Example: use cases for a patient information system (figure in the notes)',
        headers: ['Actor', 'Use cases the actor is linked to'],
        rows: [
          ['Medical Receptionist', 'Register Patient; View Personal Info.'],
          ['Manager', 'View Personal Info.; Export Statistics; Generate Report'],
          ['Nurse', 'View Record; Edit Record'],
          ['Doctor', 'View Record; Edit Record; Setup Consultation; Generate Report'],
        ],
      },
      {
        type: 'termlist',
        heading: 'Use case terminology',
        items: [
          { term: 'Actor', def: 'A person or a system which uses the system being built for achieving some goal.' },
          { term: 'Primary Actor', def: 'The main actor for whom a use case is initiated and whose goal satisfaction is the main objective of the use case.' },
          { term: 'Scenario', def: 'A set of actions that are performed to achieve a goal under some specified conditions.' },
          { term: 'Main Success Scenario', def: 'Describes the interaction if nothing fails and all steps in the scenario succeed.' },
          { term: 'Extension Scenario', def: 'Describes the system behavior if some of the steps in the main scenario do not complete successfully.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Requirements validation',
        items: [
          'Requirements validation is the process of checking that requirements actually define the system that the customer really wants.',
          'Requirements error costs are high, so validation is very important.',
          'Fixing a requirements error after delivery may cost up to 100 times the cost of fixing an implementation error.',
          'During the requirements validation process, different types of checks should be carried out on the requirements in the requirements document: validity, consistency, completeness, realism and verifiability.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Requirements validation techniques (used individually or together)',
        items: [
          { term: 'i. Reviews', def: 'The requirements are analyzed systematically by a team of reviewers who check for errors and inconsistencies.' },
          { term: 'ii. Prototyping', def: 'Developing an executable model of a system and using this with end-users and customers to see if it meets their needs and expectations. Stakeholders experiment with the system and feed back requirement changes to the development team.' },
          { term: 'iii. Test-case generation', def: 'Requirements should be testable. If the tests for the requirements are devised as part of the validation process, this often reveals requirements problems. If a test is difficult or impossible to design, this usually means that the requirements will be difficult to implement and should be reconsidered. Developing tests from the user requirements before any code is written is an integral part of test-driven development.' },
          { term: 'iv. Automated consistency analysis', def: 'Checking the consistency of a structured requirements description.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 5 — SOFTWARE DEVELOPMENT AND DESIGN
  //  (Phoenix lecture notes, pp. 8–10)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '5',
    title: 'Software Development and Design',
    sections: [
      {
        type: 'definition',
        heading: 'Software development',
        text: 'Software development — also known as application development, software design, software application development, enterprise application development, or platform development — is the development of a software product.',
      },
      {
        type: 'termlist',
        heading: 'Kinds of software systems',
        items: [
          { term: 'a) Stand-alone applications', def: 'Application systems that run on a local computer, such as a PC. They include all necessary functionality and do not need to be connected to a network.' },
          { term: 'b) Interactive transaction-based applications', def: 'Applications that execute on a remote computer and are accessed by users from their own PCs or terminals. These include web applications such as e-commerce applications.' },
          { term: 'c) Embedded control systems', def: 'Software control systems that control and manage hardware devices. Numerically, there are probably more embedded systems than any other type of system.' },
          { term: 'd) Batch processing systems', def: 'Business systems that are designed to process data in large batches. They process large numbers of individual inputs to create corresponding outputs.' },
          { term: 'e) Entertainment systems', def: 'Systems that are primarily for personal use and which are intended to entertain the user.' },
          { term: 'f) Systems for modeling and simulation', def: 'Systems developed by scientists and engineers to model physical processes or situations, which include many separate, interacting objects.' },
          { term: 'g) Data collection systems', def: 'Systems that collect data from their environment using a set of sensors and send that data to other systems for processing.' },
          { term: 'h) Systems of systems', def: 'Systems that are composed of several other software systems.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Software design',
        text: 'Software design is a process of transforming user requirements into some suitable form, which helps the programmer in software coding and implementation. It is a description of the structure of the software to be implemented, the data models and structures used by the system, the interfaces between system components and, sometimes, the algorithms used.',
      },
      {
        type: 'bullets',
        items: [
          'Designers do not arrive at a finished design immediately but develop the design iteratively.',
          'We cannot just ask programmers to start programming without any detailed plans.',
          'Design is a highly creative stage in software development, where the designer plans how the system or program should meet the customer’s needs, and how to make the system effective and efficient.',
        ],
      },
      {
        type: 'bullets',
        heading: 'The three stages for tackling any design problem',
        items: [
          'Study and understand the problem.',
          'Identify gross features of at least one possible solution.',
          'Describe each abstraction used in the solution.',
        ],
      },
      {
        type: 'table',
        heading: 'General model of the design process (figure in the notes)',
        headers: ['Stage', 'What the figure shows'],
        rows: [
          ['Design inputs', 'Platform Information; Requirements Specification; Data Description'],
          ['Design activities', 'Architectural Design → Interface Design → Component Design, with all three feeding Database Design'],
          ['Design outputs', 'System Architecture; Database Specification; Interface Specification; Component Specification'],
        ],
      },
      {
        type: 'termlist',
        heading: 'The design inputs',
        items: [
          { term: 'Platform information', def: 'Most software interfaces with other software systems. These make up the ‘software platform’: the environment in which the software will execute. Information about this platform is an essential input to the design process, as designers must decide how best to integrate it with the software’s environment.' },
          { term: 'Requirements specification', def: 'A description of the functionality the software must provide and its performance and dependability requirements.' },
          { term: 'Data description', def: 'If the system is to process existing data, then the description of that data may be included in the platform specification; otherwise the data description must be an input to the design process so that the system data organization can be defined.' },
        ],
      },
      {
        type: 'text',
        heading: '1. Architectural design',
        text: 'The architectural design is the highest abstract version of the system. It identifies the software as a system with many components interacting with each other. At this level, the designers get the idea of the proposed solution domain.',
      },
      {
        type: 'bullets',
        items: [
          'Here sub-systems are identified and a framework for sub-system control and communication is established.',
          'Activities necessary for architectural design include: system structuring, control modeling, and modular decomposition.',
          'The output of the architectural design is an architectural design document (System Architecture).',
        ],
      },
      {
        type: 'text',
        heading: '2. Interface design',
        text: 'Here the interfaces between system components are defined. This interface specification must be unambiguous. With a precise interface, a component can be used without other components having to know how it is implemented. Once interface specifications are agreed, the components can be designed and developed concurrently. For each sub-system, its interface is designed and implemented.',
      },
      {
        type: 'text',
        heading: '3. Component design',
        text: 'One can take each system component and design how it will operate. This may be a simple statement of the expected functionality to be implemented, with the specific design left to the programmer.',
      },
      {
        type: 'bullets',
        items: [
          'Services are allocated to different components and the interfaces of the components are designed.',
          'This phase entails detailed implementation design of the interfaces that are identified in the interface design.',
          'Services that are allocated to each subsystem are designed so as to be implemented.',
        ],
      },
      {
        type: 'text',
        heading: '4. Database design',
        text: 'Here one designs the system data structures and how these are to be represented in a database. Again, the work here depends on whether an existing database is to be reused or a new database is to be created.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 6 — PROGRAMMING ENVIRONMENTS AND CASE TOOLS
  //  (Phoenix lecture notes, pp. 10–12)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '6',
    title: 'Programming Environments and CASE Tools',
    sections: [
      {
        type: 'definition',
        heading: 'Development environment',
        text: 'In computer program and software product development, the development environment is the set of processes and programming tools used to create the program or software product. The term may sometimes also imply the physical environment.',
      },
      {
        type: 'definition',
        heading: 'Integrated Development Environment (IDE)',
        text: 'An IDE is one in which the processes and tools are coordinated to provide developers an orderly interface to, and convenient view of, the development process (or at least the processes of writing code, testing it, and packaging it for use).',
      },
      {
        type: 'bullets',
        items: [
          'Examples of IDE software include Eclipse, Microsoft Visual Studio, NetBeans, Xcode, Code::Blocks, Microsoft Visual C++ and Aptana Studio.',
          'The term computer-assisted software environment (CASE) is generally used to describe a set of tools and practices that facilitate management of a software development project.',
        ],
      },
      {
        type: 'bullets',
        heading: 'CASE environment tools',
        items: [
          'CASE is the use of software tools to assist in the development and maintenance of software. Tools used to assist in this way are known as CASE tools.',
          'Using CASE allows designers, code writers, testers, planners, and managers to share a common view of where a project stands at each stage of development.',
          'A number of CASE tools are available to simplify the various stages of the Software Development Life Cycle — analysis tools, design tools, project management tools, database management tools and documentation tools, to name a few.',
          'Use of CASE tools accelerates the development of a project to produce the desired result, and helps to uncover flaws before moving ahead with the next stage in software development.',
        ],
      },
      {
        type: 'bullets',
        heading: 'CASE workbenches',
        items: [
          'CASE workbenches are collections of integrated tools which support a specific software life cycle stage.',
          'CASE tools to support analysis & design, programming and testing are widely used in industry.',
          'The integration mechanism can be either public or proprietary.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Open and closed workbenches',
        items: [
          { term: 'Public (open system)', def: 'The users can add their own tools to the workbench. Such a workbench is an open system.' },
          { term: 'Proprietary (closed system)', def: 'The addition of third-party tools is usually impossible. Such a workbench is a closed system.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Advantages of open workbenches',
        items: [
          'New specialist tools can be added.',
          'The outputs from tools can be used by other systems, for example a configuration management system.',
          'More complex tools can be gradually introduced.',
          'Different tool vendors can be used.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Programming workbenches — a set of integrated tools to support the process of program development. A typical one includes:',
        items: [
          'Language compiler.',
          'Structured editor — to create and edit source programs.',
          'Linker — to link object code components.',
          'Loader — to load an executable program into the computer memory.',
          'Cross-referencer — to produce cross-reference listings of source programs.',
          'Static analyzer — to analyze source programs in order to find anomalies.',
          'Dynamic analyzer — to analyze how many times each statement of a source program has been executed when the program was run.',
          'Interactive debugger — to trace and control the execution of a user program.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Analysis & design workbenches — typical components',
        items: [
          { term: 'Diagramming editors', def: 'Used to create DFDs, ERD charts, etc. The editor is not just a drawing tool but understands the meaning of the different symbols/objects. It captures information about these objects and saves it in a central repository.' },
          { term: 'Checking facilities', def: 'Used to ensure that models created by analysts/designers are internally consistent and complete, and that all models are consistent with one another (externally consistent).' },
          { term: 'Query language facilities', def: 'Used to browse the repository and examine completed designs.' },
          { term: 'Data dictionary facilities', def: 'Used to maintain information about the objects used in the various diagrams.' },
          { term: 'Report generation facilities', def: 'Used to automatically generate system documentation.' },
          { term: 'Form generation tools', def: 'Used to specify screen and document formats.' },
          { term: 'Skeleton code generators', def: 'Used to generate code or code segments automatically from the design stored in the central repository.' },
          { term: 'Import/export facilities', def: 'Allow the interchange of information with other development tools.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Testing workbenches — open collections of testing tools. A typical one consists of:',
        items: [
          { term: 'Test manager', def: 'To record testing.' },
          { term: 'Test data generator', def: 'To generate test cases.' },
          { term: 'Oracle', def: 'To generate predictions of expected results.' },
          { term: 'File comparators', def: 'To compare the results of program tests.' },
          { term: 'Report generator', def: 'To automatically generate system documentation.' },
          { term: 'Dynamic analyzer', def: 'To analyze how many times each statement of a source program has been executed when the program was run. It is useful for producing an execution profile of the tested program, to achieve proper coverage for white-box testing.' },
          { term: 'Simulator', def: 'To simulate an environment (e.g. hardware, users) for tested programs. Simulators are very useful when testing real-time systems.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 7 — SOFTWARE TESTING
  //  (Phoenix lecture notes, pp. 13–16)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '7',
    title: 'Software Testing',
    sections: [
      {
        type: 'text',
        text: 'In a software development project, errors can be introduced at any stage during development. Though errors are detected after each phase by techniques like inspections, some errors remain undetected. Ultimately, these remaining errors are reflected in the code. Hence, the final code is likely to have some requirements errors and design errors, in addition to errors introduced during the coding activity. To ensure the quality of the final delivered software, these defects will have to be removed.',
      },
      {
        type: 'definition',
        heading: 'Testing',
        text: 'Testing is intended to show that a program does what it is intended to do and to discover program defects before it is put into use. When you test software, you execute a program using artificial data, and check the results of the test run for errors, anomalies, or information about the program’s non-functional attributes.',
      },
      {
        type: 'bullets',
        heading: 'When you test software, you are trying to do two things',
        items: [
          'i. Demonstrate to the developer and the customer that the software meets its requirements.',
          'ii. Find inputs or input sequences where the behavior of the software is incorrect, undesirable, or does not conform to its specification. These are caused by defects (bugs) in the software. When you test software to find defects, you are trying to root out undesirable system behavior such as system crashes, unwanted interactions with other systems, incorrect computations, and data corruption.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Validation testing and defect testing',
        items: [
          { term: 'Validation testing (the first aim)', def: 'You expect the system to perform correctly using a set of test cases that reflect the system’s expected use.' },
          { term: 'Defect testing (the second aim)', def: 'The test cases are designed to expose defects. They can be deliberately obscure and need not reflect how the system is normally used.' },
        ],
      },
      {
        type: 'text',
        text: 'There is no definite boundary between these two approaches to testing. During validation testing you will find defects in the system; during defect testing, some of the tests will show that the program meets its requirements.',
      },
      {
        type: 'definition',
        heading: 'Verification and Validation (V&V)',
        text: 'Software testing is often referred to as Verification and Validation (V&V). Verification refers to the set of activities that ensure that software correctly implements a specific function. Validation is a set of activities that ensure that the software that has been built is traceable to customer requirements.',
      },
      {
        type: 'table',
        headers: ['', 'Verification', 'Validation'],
        rows: [
          ['Question asked', 'Does the product meet system specifications?', 'Does the product meet user expectations?'],
          ['In short', 'Have we built the product right?', 'Have we built the right product?'],
        ],
      },
      {
        type: 'text',
        text: 'Verification and validation processes are concerned with checking that software being developed meets its specification and delivers the functionality expected by the people paying for the software. These checking processes start as soon as requirements become available and continue through all stages of the development process. The ultimate goal of verification and validation is to establish confidence that the software system is ‘fit for purpose’ — that the system is good enough for its intended use.',
      },
      {
        type: 'text',
        heading: 'Objectives of software testing',
        text: 'The correct approach to testing a scientific theory is not to try to verify it, but to seek to refute the theory — that is, to prove that it has errors.',
      },
      {
        type: 'bullets',
        items: [
          'i. The goal of testing is to expose latent defects in a software system before it is put to use.',
          'ii. A software tester tries to break the system. The objective is to show the presence of a defect, not the absence of it.',
          'iii. Testing cannot show the absence of a defect. It only increases your confidence in the software.',
          'iv. This is because exhaustive testing of software is not possible — it is simply too expensive and needs virtually infinite resources.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Some terms associated with testing',
        items: [
          { term: 'Defect', def: 'A variance from a desired product attribute. These attributes may involve system specifications as well as user expectation. Anything that may cause customer dissatisfaction is a defect. Whether these defects are in system specifications or in the software products, it is essential to point them out and fix them.' },
          { term: 'Error', def: 'Used in two different ways. (1) The discrepancy between a computed, observed, or measured value and the true, specified, or theoretically correct value — the difference between the actual output of a software and the correct output; in this interpretation, error is essentially a measure of the difference between the actual and the ideal. (2) Human action that results in software containing a defect or fault.' },
          { term: 'Fault', def: 'A condition that causes a system to fail in performing its required function. A fault is the basic reason for software malfunction and is practically synonymous with the commonly used term bug, or the somewhat more general term defect. The term error is also often used to refer to defects (taking a variation of the second definition of error).' },
          { term: 'Failure', def: 'The inability of a system or component to perform a required function according to its specifications. A software failure occurs if the behavior of the software is different from the specified behavior. Failures may be caused by functional or performance factors. The definition does not imply that a failure must be observed: it is possible that a failure may occur but not be detected.' },
        ],
      },
      {
        type: 'text',
        heading: 'Levels of testing',
        text: 'Testing is usually relied upon to detect the faults remaining from earlier stages, in addition to the faults introduced during coding itself. Due to this, different levels of testing are used in the testing process; each level aims to test different aspects of the system, and attempts to detect different types of faults.',
      },
      {
        type: 'termlist',
        items: [
          { term: 'i. Unit testing', def: 'Essentially for verification of the code produced by individual programmers, and typically done by the programmer of the module. Individual program units or object classes are tested. Unit testing should focus on testing the functionality of objects or methods.' },
          { term: 'ii. Integration testing', def: 'Several individual units are integrated to create composite components. Component testing should focus on testing the component interfaces that provide access to the component functions. The goal is to see if the modules can be integrated properly, so the emphasis is on testing interfaces between modules. This testing activity can be considered testing the design.' },
          { term: 'iii. System testing', def: 'The entire software system is tested. The reference document for this process is the requirements document, and the goal is to see if the software meets its requirements. This is often a large exercise, which for large projects may last many weeks or months. It is essentially a validation exercise, and in many situations it is the only validation activity.' },
          { term: 'iv. Acceptance testing', def: 'Often performed with realistic data of the client to demonstrate that the software is working satisfactorily. It may be done in the setting in which the software is to eventually function. Acceptance testing essentially tests whether the system satisfactorily solves the problems for which it was commissioned. It may reveal errors and omissions in the system requirements definition, because the real data exercise the system in different ways from the test data. It may also reveal requirements problems where the system’s facilities do not really meet the user’s needs or the system performance is unacceptable.' },
          { term: 'v. Regression testing', def: 'Performed when some changes are made to an existing system. Changes are fundamental to software; any software must undergo changes. When modifications are made to an existing system, testing also has to be done to make sure that the modification has not had the undesired side effect of making some of the earlier services faulty. Besides ensuring the desired behavior of the new services, testing has to ensure that the desired behavior of the old services is maintained. This is the task of regression testing.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Alpha and beta testing',
        items: [
          { term: 'Alpha testing', def: 'Another name for acceptance testing. Custom systems are developed for a single client; the alpha testing process continues until the system developer and the client agree that the delivered system is an acceptable implementation of the requirements.' },
          { term: 'Beta testing', def: 'Used when a system is to be marketed as a software product. The system is delivered to a number of potential customers who agree to use it and report problems to the system developers. This exposes the product to real use and detects errors that may not have been anticipated by the system builders. After this feedback, the system is modified and released either for further beta testing or for general sale.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 8 — SOFTWARE EVOLUTION, LEGACY SYSTEMS, MAINTENANCE AND
  //  RE-ENGINEERING  (Phoenix lecture notes, pp. 16–21)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '8',
    title: 'Software Evolution, Legacy Systems, Maintenance and Re-engineering',
    sections: [
      {
        type: 'text',
        heading: 'Software evolution',
        text: 'Large software systems usually have a long lifetime. During their lifetime, operational software systems have to change if they are to remain useful. Business changes and changes to user expectations generate new requirements for the software. Parts of the software may have to be modified to correct errors that are found in operation, to adapt it for changes to its hardware and software platform, and to improve its performance or other non-functional characteristics. Software products and apps have to evolve to cope with platform changes and new features introduced by their competitors. Software systems, therefore, adapt and evolve during their lifetime from initial deployment to final retirement.',
      },
      {
        type: 'text',
        text: 'As with all software processes, there is no standard software change or evolution process. The most appropriate evolution process for a software system depends on the type of software being maintained, the software development processes used in an organization, and the skills of the people involved. For some types of system, such as mobile apps, evolution may be an informal process, where change requests mostly come from conversations between system users and developers. For other types of systems, such as embedded critical systems, software evolution may be formalized, with structured documentation produced at each stage in the process.',
      },
      {
        type: 'text',
        heading: 'Figure 1 — Change identification and evolution process',
        text: 'The processes of change identification and system evolution are cyclical and continue throughout the lifetime of a system. The figure draws them as a cycle: Change identification process → Change proposals → Software evolution process → New system → back to the change identification process.',
      },
      {
        type: 'text',
        heading: 'Figure 2 — General model of the software evolution process',
        text: 'The process includes the fundamental activities of change analysis, release planning, system implementation, and releasing a system to customers. The cost and impact of the changes are assessed to see how much of the system is affected by the change and how much it might cost to implement. The figure runs: Change requests → Impact analysis → Release planning → Change implementation → System release, and back to change requests. Release planning branches into three kinds of change: fault repair, platform adaptation and system enhancement.',
      },
      {
        type: 'text',
        text: 'If the proposed changes are accepted, a new release of the system is planned. During release planning, all proposed changes (fault repair, adaptation, and new functionality) are considered. A decision is then made on which changes to implement in the next version of the system. The changes are implemented and validated, and a new version of the system is released. The process then iterates with a new set of changes proposed for the next release.',
      },
      {
        type: 'text',
        text: 'In situations where development and evolution are integrated, change implementation is simply an iteration of the development process: revisions to the system are designed, implemented, and tested. The only difference between initial development and evolution is that customer feedback after delivery has to be considered when planning new releases of an application.',
      },
      {
        type: 'definition',
        heading: 'Program understanding',
        text: 'Where different teams are involved, a critical difference between development and evolution is that the first stage of change implementation requires program understanding. During the program understanding phase, new developers have to understand how the program is structured, how it delivers functionality, and how the proposed change might affect the program. They need this understanding to make sure that the implemented change does not cause new problems when it is introduced into the existing system.',
      },
      {
        type: 'text',
        heading: 'Legacy systems',
        text: 'Large companies started computerizing their operations in the 1960s, so for the past 50 years or so, more and more software systems have been introduced. Many of these systems have been replaced (sometimes several times) as the business has changed and evolved. However, a lot of old systems are still in use and play a critical part in the running of the business. These older software systems are sometimes called legacy systems.',
      },
      {
        type: 'definition',
        heading: 'Legacy system',
        text: 'An older system that relies on languages and technology that are no longer used for new systems development. Typically, legacy systems have been maintained over a long period, and their structure may have been degraded by the changes that have been made. Legacy software may be dependent on older hardware, such as mainframe computers, and may have associated legacy processes and procedures. It may be impossible to change to more effective business processes because the legacy software cannot be modified to support new processes.',
      },
      {
        type: 'text',
        text: 'Legacy systems are not just software systems but broader sociotechnical systems that include hardware, software, libraries, and other supporting software and business processes.',
      },
      {
        type: 'termlist',
        heading: 'The logical parts of a legacy system',
        items: [
          { term: 'i. System hardware', def: 'Legacy systems may have been written for hardware that is no longer available, that is expensive to maintain, and that may not be compatible with current organizational IT purchasing policies.' },
          { term: 'ii. Support software', def: 'The legacy system may rely on a range of support software, from the operating system and utilities provided by the hardware manufacturer through to the compilers used for system development. Again, these may be obsolete and no longer supported by their original providers.' },
          { term: 'iii. Application software', def: 'The application system that provides the business services is usually made up of a number of application programs that have been developed at different times. Some of these programs will also be part of other application software systems.' },
          { term: 'iv. Application data', def: 'The data processed by the application system. In many legacy systems, an immense volume of data has accumulated over the lifetime of the system. This data may be inconsistent, may be duplicated in several files and may be spread over a number of different databases.' },
          { term: 'v. Business processes', def: 'Processes used in the business to achieve some business objective — in an insurance company, issuing an insurance policy; in a manufacturing company, accepting an order for products and setting up the associated manufacturing process. Business processes may be designed around a legacy system and constrained by the functionality that it provides.' },
          { term: 'vi. Business policies and rules', def: 'Definitions of how the business should be carried out and constraints on the business. Use of the legacy application system may be embedded in these policies and rules.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Software maintenance',
        text: 'Software maintenance is the general process of changing a system after it has been delivered. The term is usually applied to custom software, where separate groups are involved before and after delivery. The changes made may be simple changes to correct coding errors, more extensive changes to correct design errors, or significant enhancements to correct specification errors or to accommodate new requirements. Changes are implemented by modifying existing system components and, where necessary, by adding new components to the system.',
      },
      {
        type: 'termlist',
        heading: 'The three types of software maintenance',
        items: [
          { term: 'a) Fault repairs — to fix bugs and vulnerabilities', def: 'Coding errors are usually relatively cheap to correct; design errors are more expensive because they may involve rewriting several program components. Requirements errors are the most expensive to repair because extensive system redesign may be necessary.' },
          { term: 'b) Environmental adaptation — to adapt the software to new platforms and environments', def: 'Required when some aspect of a system’s environment, such as the hardware, the platform operating system, or other support software, changes. Application systems may have to be modified to cope with these environmental changes.' },
          { term: 'c) Functionality addition — to add new features and to support new requirements', def: 'Necessary when system requirements change in response to organizational or business change. The scale of the changes required to the software is often much greater than for the other types of maintenance.' },
        ],
      },
      {
        type: 'text',
        text: 'In practice, there is no clear-cut distinction between these types of maintenance. When you adapt a system to a new environment, you may add functionality to take advantage of new environmental features. Software faults are often exposed because users use the system in unanticipated ways; changing the system to accommodate their way of working is the best way to fix these faults.',
      },
      {
        type: 'termlist',
        heading: 'Other names for the maintenance types',
        items: [
          { term: 'Corrective maintenance', def: 'Universally used to refer to maintenance for fault repair.' },
          { term: 'Adaptive maintenance', def: 'Sometimes means adapting to a new environment, and sometimes means adapting the software to new requirements.' },
          { term: 'Perfective maintenance', def: 'Sometimes means perfecting the software by implementing new requirements; in other cases, it means maintaining the functionality of the system but improving its structure and its performance.' },
        ],
      },
      {
        type: 'text',
        heading: 'Software re-engineering',
        text: 'Software maintenance involves understanding the program that has to be changed and then implementing any required changes. However, many systems, especially older legacy systems, are difficult to understand and change. The programs may have been optimized for performance or space utilization at the expense of understandability, or, over time, the initial program structure may have been corrupted by a series of changes.',
      },
      {
        type: 'definition',
        heading: 'Re-engineering',
        text: 'To make legacy software systems easier to maintain, you can re-engineer these systems to improve their structure and understandability. Re-engineering may involve re-documenting the system, refactoring the system architecture, translating programs to a modern programming language, or modifying and updating the structure and values of the system’s data. The functionality of the software is not changed, and, normally, you should try to avoid making major changes to the system architecture.',
      },
      {
        type: 'termlist',
        heading: 'Two important advantages of re-engineering over replacement',
        items: [
          { term: '1. Reduced risk', def: 'There is a high risk in redeveloping business-critical software. Errors may be made in the system specification or there may be development problems. Delays in introducing the new software may mean that business is lost and extra costs are incurred.' },
          { term: '2. Reduced cost', def: 'The cost of re-engineering may be significantly less than the cost of developing new software.' },
        ],
      },
      {
        type: 'text',
        heading: 'Figure 3 — The re-engineering process',
        text: 'The input to the process is a legacy program, and the output is an improved and restructured version of the same program. In the figure, the Original program goes through Source code translation; from there, Reverse engineering produces Program documentation, and Program structure improvement produces a Restructured program. Program modularization works on the restructured program and the documentation to give the Re-engineered program, and Data re-engineering turns the Original data into Re-engineered data.',
      },
      {
        type: 'termlist',
        heading: 'Activities in the re-engineering process',
        items: [
          { term: 'i. Source code translation', def: 'Using a translation tool, the program is converted from an old programming language to a more modern version of the same language or to a different language.' },
          { term: 'ii. Reverse engineering', def: 'The program is analyzed and information extracted from it. This helps to document its organization and functionality. This process is usually completely automated.' },
          { term: 'iii. Program structure improvement', def: 'The control structure of the program is analyzed and modified to make it easier to read and understand. This can be partially automated, but some manual intervention is usually required.' },
          { term: 'iv. Program modularization', def: 'Related parts of the program are grouped together and, where appropriate, redundancy is removed. In some cases, this stage may involve architectural refactoring (e.g. a system that uses several different data stores may be refactored to use a single repository). This is a manual process.' },
          { term: 'v. Data re-engineering', def: 'The data processed by the program is changed to reflect program changes. This may mean redefining database schemas and converting existing databases to the new structure. You should usually also clean up the data — finding and correcting mistakes, removing duplicate records, and so on. This can be a very expensive and prolonged process.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 9 — SOFTWARE PROJECT MANAGEMENT AND RISK MANAGEMENT
  //  (Phoenix lecture notes, pp. 21–24)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '9',
    title: 'Software Project Management and Risk Management',
    sections: [
      {
        type: 'text',
        text: 'Software project management is an essential part of software engineering. Projects need to be managed because professional software engineering is always subject to organizational budget and schedule constraints. The project manager’s job is to ensure that the software project meets and overcomes these constraints as well as delivering high-quality software. Good management cannot guarantee project success. However, bad management usually results in project failure: the software may be delivered late, cost more than originally estimated, or fail to meet the expectations of customers.',
      },
      {
        type: 'termlist',
        heading: 'Why software management is particularly challenging — how software engineering differs from other engineering',
        items: [
          { term: 'a. The product is intangible', def: 'A manager of a shipbuilding or a civil engineering project can see the product being developed. If a schedule slips, the effect on the product is visible — parts of the structure are obviously unfinished. Software is intangible: it cannot be seen or touched. Software project managers cannot see progress by looking at the artifact that is being constructed. Rather, they rely on others to produce evidence that they can use to review the progress of the work.' },
          { term: 'b. Large software projects are often “one-off” projects', def: 'Every large software development project is unique, because every environment where software is developed is, in some ways, different from all others. Even managers who have a large body of previous experience may find it difficult to anticipate problems. Furthermore, rapid technological changes in computers and communications can make experience obsolete. Lessons learned from previous projects may not be readily transferable to new projects.' },
          { term: 'c. Software processes are variable and organization-specific', def: 'The engineering process for some types of system, such as bridges and buildings, is well understood. However, different companies use quite different software development processes. We cannot reliably predict when a particular software process is likely to lead to development problems. This is especially true when the software project is part of a wider systems engineering project or when completely new software is being developed.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Project management activities',
        items: [
          { term: '1. Project planning', def: 'Project managers are responsible for planning, estimating, and scheduling project development and assigning people to tasks. They supervise the work to ensure that it is carried out to the required standards, and they monitor progress to check that the development is on time and within budget.' },
          { term: '2. Risk management', def: 'Project managers have to assess the risks that may affect a project, monitor these risks, and take action when problems arise (see below).' },
          { term: '3. People management', def: 'Project managers are responsible for managing a team of people. They have to choose people for their team and establish ways of working that lead to effective team performance.' },
          { term: '4. Reporting', def: 'Project managers are usually responsible for reporting on the progress of a project to customers and to the managers of the company developing the software. They have to be able to communicate at a range of levels, from detailed technical information to management summaries. They have to write concise, coherent documents that abstract critical information from detailed project reports, and present them during reviews.' },
          { term: '5. Proposal writing', def: 'The first stage in a software project may involve writing a proposal to win a contract to carry out an item of work. The proposal describes the objectives of the project and how it will be carried out. It usually includes cost and schedule estimates, and justifies why the project contract should be awarded to a particular organization or team.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Risk management',
        text: 'You can think of a risk as something that you’d prefer not to have happen. Risks may threaten the project, the software that is being developed, or the organization. Risk management involves anticipating risks that might affect the project schedule or the quality of the software being developed, and then taking action to avoid these risks.',
      },
      {
        type: 'termlist',
        heading: 'Classifying risks by what they affect',
        items: [
          { term: 'i. Project risk', def: 'Affects the project schedule or resources. Example: the loss of an experienced system architect. Finding a replacement architect with appropriate skills and experience may take a long time; consequently, it will take longer to develop the software design than originally planned.' },
          { term: 'ii. Product risk', def: 'Affects the quality or performance of the software being developed. Example: the failure of a purchased component to perform as expected. This may affect the overall performance of the system so that it is slower than expected.' },
          { term: 'iii. Business risk', def: 'Affects the organization developing or procuring the software. Example: a competitor introducing a new product. The introduction of a competitive product may mean that the assumptions made about sales of existing software products may be unduly optimistic.' },
        ],
      },
      {
        type: 'table',
        heading: 'Figure 4 — The risk management process',
        headers: ['Stage', 'Output'],
        rows: [
          ['Risk identification', 'List of potential risks'],
          ['Risk analysis', 'Prioritized risk list'],
          ['Risk planning', 'Risk avoidance and contingency plans'],
          ['Risk monitoring', 'Risk assessment'],
        ],
      },
      {
        type: 'text',
        text: 'In the figure the four stages run in sequence, each producing its output, and an arrow loops from risk monitoring back to risk analysis: the process repeats throughout the project.',
      },
      {
        type: 'termlist',
        heading: 'The four stages of risk management',
        items: [
          { term: 'a) Risk identification', def: 'Identifying the risks that could pose a major threat to the software engineering process, the software being developed, or the development organization.' },
          { term: 'b) Risk analysis', def: 'You consider each identified risk and make a judgment about the probability and seriousness of that risk. There is no easy way to do so: you have to rely on your judgment and experience of previous projects and the problems that arose in them.' },
          { term: 'c) Risk planning', def: 'Develops strategies to manage the key risks that threaten the project. For each risk, you think of actions that you might take to minimize the disruption to the project if the problem identified in the risk occurs. You should also think about the information that you need to collect while monitoring the project, so that emerging problems can be detected before they become serious.' },
          { term: 'd) Risk monitoring', def: 'The process of checking that your assumptions about the product, process, and business risks have not changed. You should regularly assess each of the identified risks to decide whether or not that risk is becoming more or less probable, and whether or not the effects of the risk have changed. To do this, you look at other factors, such as the number of requirements change requests, which give you clues about the risk probability and its effects.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 10 — SOFTWARE QUALITY AND QUALITY ASSURANCE
  //  (Phoenix lecture notes, pp. 24–25)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '10',
    title: 'Software Quality and Quality Assurance',
    sections: [
      {
        type: 'bullets',
        heading: 'How do you know when you have produced good-quality software? Two ways of going about it',
        items: [
          'Measuring the attributes of software that has been developed (quality control).',
          'Monitoring and controlling the process of development of the software (quality assurance).',
        ],
      },
      {
        type: 'definition',
        heading: 'Quality software',
        text: 'A software which fulfils, and continues to meet, the purpose for which it was produced is a quality software.',
      },
      {
        type: 'termlist',
        heading: 'Desirable software qualities — designed to cover the complete range of attributes of software, except the cost of construction',
        items: [
          { term: 'Correctness', def: 'The extent to which the software meets its specification and meets its users’ requirements.' },
          { term: 'Reliability', def: 'The degree to which the software continues to work without failing.' },
          { term: 'Performance', def: 'The amount of main memory and processor time that the software uses.' },
          { term: 'Integrity', def: 'The degree to which the software enforces control over access to information by users.' },
          { term: 'Usability', def: 'The ease of use of the software.' },
          { term: 'Maintainability', def: 'The effort required to find and fix a fault.' },
          { term: 'Flexibility', def: 'The effort required to change the software to meet changed requirements.' },
          { term: 'Testability', def: 'The effort required to test the software effectively.' },
          { term: 'Portability', def: 'The effort required to transfer the software to a different hardware and/or software platform.' },
          { term: 'Reusability', def: 'The extent to which the software (or a component within it) can be reused within some other software.' },
          { term: 'Interoperability', def: 'The effort required to make the software work in conjunction with some other software.' },
          { term: 'Security', def: 'The extent to which the software is safe from external sabotage that may damage it and impair its use.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Software quality assurance',
        text: 'Quality assurance means ensuring that a software system meets its quality goals. The goals differ from one project to another. They must be clear, and can be selected from the list of quality factors. To achieve its goals, a project must use effective tools and methods. Checks must also be carried out during the development process at every available opportunity to see that the process is being carried out correctly.',
      },
      {
        type: 'termlist',
        heading: 'Quality manual, standards and procedures',
        items: [
          { term: 'Quality manual', def: 'To ensure that effective tools and methods are being used, an organization distils its best practices and documents them in a quality manual. This is like a library of all the effective tools, methods and notations — like a recipe book in cooking, except that it contains only the very best recipes. The manual describes all the standards and procedures that are available to be used.' },
          { term: 'Standard', def: 'Defines a range, limit, tolerance or norm of some measurable attribute against which compliance can be judged. Example: during white-box testing, every source code statement must be executed at least once. (In the kitchen: all peeled potatoes must be inspected to ensure there is no skin remaining on them.)' },
          { term: 'Procedure', def: 'Prescribes a way of doing something (rules, steps, guidelines, plans). Example: black-box testing, white-box testing and a walkthrough must be used to verify each component of software.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Planning quality assurance — it must be planned in advance, along with all other aspects of the project. The project manager:',
        items: [
          'i. Decides which quality factors are important for the particular project (e.g. high reliability and maintainability).',
          'ii. Selects standards and procedures from the quality manual that are appropriate to meeting the quality goals (e.g. the use of complexity metrics to check maintainability).',
          'iii. Assembles these into a quality assurance plan for the project. This describes what the procedures and standards are, when they will be done, and who does them.',
        ],
      },
      {
        type: 'definition',
        heading: 'Quality controls',
        text: 'A quality plan describes a number of quality controls. A quality control is an activity that checks that the project’s quality factors are being achieved, and produces some documentary evidence which should be made available to anyone with an interest in checking that the quality of the product is assured.',
      },
    ],
  },
];
