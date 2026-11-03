// SEN 211 — Introduction to Software Engineering
// Lecture notes transcribed from the lecturer's handwritten notes, typed up and
// proofread (phonetic and spelling errors corrected).
//
// Three topics so far; the course outline lists twelve areas. Topic number = the
// order in the notes, not the outline. Still to come, in outline order:
//
//    Software Engineering Laws
//    Software Measurement and Estimation Techniques
//    Software Configuration Management
//    Software Requirements and Specification (beyond the SDLC phase summary)
//    Software Design, Architecture Development, Testing and Validation
//    Software Project Management and Risk Analysis
//    Software Quality and Quality Assurance
//    Software Evaluation, Maintenance and Maintainable Software
//    Software Re-engineering, Legacy Systems and Software Reuse
//
// Which syllabus items each topic reaches is recorded on the course as
// `noteCoverage` (courses.js), not here.
//
// No figures. Material added beyond the lecturer's notes is marked with a
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
];
