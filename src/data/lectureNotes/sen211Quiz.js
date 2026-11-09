// SEN 211 — Practice quiz bank, drawn topic by topic from
// src/data/lectureNotes/sen211.js. Questions follow the lecture notes,
// including only material students can check in those notes.
// Every chapter matches a Notes heading. CourseQuiz draws a fresh sample
// and Quiz shuffles options per attempt; no answer depends on position.
// General MCQ practice: the examination format is not yet confirmed.

export const sen211Quiz = [
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which description best matches software engineering?",
    "options": [
      "Systematic software design, testing and maintenance",
      "Source coding without requirements or maintenance",
      "Hardware assembly with occasional software repair",
      "Software deployment without design or validation"
    ],
    "correctIndex": 0,
    "explanation": "Software Engineering Concepts and Principles — Definition: The definition covers systematic design, development, testing and maintenance guided by principles and methodologies."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "A team works iteratively and adapts to customer feedback. Which methodology fits?",
    "options": [
      "High-Level Design",
      "Agile",
      "Waterfall",
      "CMMI"
    ],
    "correctIndex": 1,
    "explanation": "Software Engineering Concepts and Principles — Methodologies: Agile emphasizes iterative development, customer collaboration and flexibility."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which approach integrates development and operations through automated workflows?",
    "options": [
      "Abstraction",
      "Modularity",
      "DevOps",
      "Waterfall"
    ],
    "correctIndex": 2,
    "explanation": "Software Engineering Concepts and Principles — Methodologies: DevOps improves collaboration and productivity by integrating development and operations and automating workflows."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Independently developed and tested components illustrate which principle?",
    "options": [
      "Abstraction",
      "Encapsulation",
      "Deployment",
      "Modularity"
    ],
    "correctIndex": 3,
    "explanation": "Software Engineering Concepts and Principles — Core Principles of Software Engineering: Modularity breaks software into smaller manageable components developed and tested independently."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which principle hides complex implementation details behind necessary interfaces?",
    "options": [
      "Abstraction",
      "Encapsulation",
      "Reusability",
      "Integration"
    ],
    "correctIndex": 0,
    "explanation": "Software Engineering Concepts and Principles — Core Principles of Software Engineering: Abstraction exposes necessary parts while hiding complex implementation details."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Bundling data with its methods to protect internal state illustrates what?",
    "options": [
      "Deployment",
      "Encapsulation",
      "Modularity",
      "Reusability"
    ],
    "correctIndex": 1,
    "explanation": "Software Engineering Concepts and Principles — Core Principles of Software Engineering: Encapsulation combines data and methods within one unit and protects the internal state."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "A component is designed for use in several projects. Which principle does this support?",
    "options": [
      "Deployment",
      "Feasibility",
      "Reusability",
      "Abstraction"
    ],
    "correctIndex": 2,
    "explanation": "Software Engineering Concepts and Principles — Core Principles of Software Engineering: Reusability saves time and resources through components usable across projects."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Why integrate code changes frequently and automate deployment?",
    "options": [
      "Replace all requirements with source code",
      "Delay feedback until the final release",
      "Keep development separate from operations",
      "Improve quality and delivery speed"
    ],
    "correctIndex": 3,
    "explanation": "Software Engineering Concepts and Principles — Core Principles of Software Engineering: The CI/CD entry links frequent integration and automated deployment to better quality and delivery speed."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which practice supports maintainability as requirements evolve?",
    "options": [
      "Well-structured code and documentation",
      "Avoiding changes after the first release",
      "Using no shared development guidelines",
      "Deferring all design until after deployment"
    ],
    "correctIndex": 0,
    "explanation": "Software Engineering Concepts and Principles — Importance of Software Engineering: The maintainability and scalability entry links structure and documentation to easier modification and scaling."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which benefit follows from clear development guidelines for a team?",
    "options": [
      "Guaranteed success without requirements",
      "Better communication and problem-solving",
      "Removal of every need for system testing",
      "Elimination of all future maintenance work"
    ],
    "correctIndex": 1,
    "explanation": "Software Engineering Concepts and Principles — Importance of Software Engineering: The Collaboration entry says clear guidelines improve teamwork, communication and problem-solving."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which two fields does software engineering bridge?",
    "options": [
      "Graphic design and technical drawing",
      "Network cabling and electrical installation",
      "Computer science and engineering",
      "Accounting and financial auditing"
    ],
    "correctIndex": 2,
    "explanation": "Software Engineering Concepts and Principles — Software Engineering and Its Place in the Computing Discipline: The notes describe software engineering as bridging computer science and engineering."
  },
  {
    "chapter": "Software Engineering Concepts and Principles",
    "question": "Which goal is stated for software engineering?",
    "options": [
      "Software with no maintenance phase",
      "Code produced without user input",
      "Design that ignores project costs",
      "Quality software that can evolve"
    ],
    "correctIndex": 3,
    "explanation": "Software Engineering Concepts and Principles — Goal: The stated goal is high-quality, cost-effective software meeting user needs and evolving over time."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "What is the main purpose of requirement analysis?",
    "options": [
      "Understand user needs and their reasons",
      "Release software to the live environment",
      "Convert a technical design into source code",
      "Measure the load capacity of finished code"
    ],
    "correctIndex": 0,
    "explanation": "Software Development Process and the SDLC — Phase 1: Requirement Analysis: Requirement analysis establishes what users need and why they need it."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which is the notes' example of a functional requirement?",
    "options": [
      "Usability",
      "User login",
      "Performance",
      "Scalability"
    ],
    "correctIndex": 1,
    "explanation": "Software Development Process and the SDLC — Types of Requirements: Functional requirements state what a system does, with user login as the example."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "A requirement concerns system scalability. Which category fits?",
    "options": [
      "Deployment strategy",
      "Implementation output",
      "Non-functional requirement",
      "Functional requirement"
    ],
    "correctIndex": 2,
    "explanation": "Software Development Process and the SDLC — Types of Requirements: Non-functional requirements describe how the system performs, including scalability."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which document is an output of requirement analysis?",
    "options": [
      "Software Design Document",
      "Deployment documentation",
      "Test summary report",
      "Software Requirement Specification"
    ],
    "correctIndex": 3,
    "explanation": "Software Development Process and the SDLC — Output of Requirement Analysis: The output list names the SRS and use cases/user stories."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which item belongs to high-level design in the notes?",
    "options": [
      "System architecture",
      "API specifications",
      "Class diagrams",
      "Algorithm details"
    ],
    "correctIndex": 0,
    "explanation": "Software Development Process and the SDLC — Design Levels: HLD covers architecture, technology stack and database design; API specifications and algorithms are listed under LLD."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which item is listed under low-level design?",
    "options": [
      "High-level database design",
      "API specifications",
      "Technology stack selection",
      "Overall system architecture"
    ],
    "correctIndex": 1,
    "explanation": "Software Development Process and the SDLC — Design Levels: LLD includes API specifications, class diagrams, database schema, algorithms and data structures."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which activity belongs to implementation?",
    "options": [
      "Training production users",
      "Conducting feasibility workshops",
      "Reviewing source code",
      "Gathering initial requirements"
    ],
    "correctIndex": 2,
    "explanation": "Software Development Process and the SDLC — Phase 3: Implementation (Coding): The implementation activity list includes writing and reviewing code, version control and continuous integration."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which testing checks interactions between modules?",
    "options": [
      "Unit testing",
      "Acceptance testing",
      "Performance testing",
      "Integration testing"
    ],
    "correctIndex": 3,
    "explanation": "Software Development Process and the SDLC — Types of Testing: Integration testing is module interaction testing."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "After a change, which testing checks that existing functionality still works?",
    "options": [
      "Regression testing",
      "Acceptance testing",
      "Performance testing",
      "Unit testing"
    ],
    "correctIndex": 0,
    "explanation": "Software Development Process and the SDLC — Types of Testing: Regression testing ensures new changes do not break existing functionality."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which testing is described as user validation?",
    "options": [
      "Security testing",
      "Acceptance testing",
      "Integration testing",
      "Performance testing"
    ],
    "correctIndex": 1,
    "explanation": "Software Development Process and the SDLC — Types of Testing: The testing list defines acceptance testing as user validation."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which testing focuses on load and scalability?",
    "options": [
      "Acceptance testing",
      "Security testing",
      "Performance testing",
      "Regression testing"
    ],
    "correctIndex": 2,
    "explanation": "Software Development Process and the SDLC — Types of Testing: The notes associate performance testing with load and scalability."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Which phase releases software into production?",
    "options": [
      "Requirement analysis",
      "Implementation",
      "System design",
      "Deployment"
    ],
    "correctIndex": 3,
    "explanation": "Software Development Process and the SDLC — Phase 5: Deployment: Deployment releases the software to the production environment."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Data migration and user training belong to which phase?",
    "options": [
      "Deployment",
      "System design",
      "Requirement analysis",
      "Implementation"
    ],
    "correctIndex": 0,
    "explanation": "Software Development Process and the SDLC — Activities involved: The Deployment activities list includes environment configuration, migration, training and release management."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Fixing a discovered bug after release is which maintenance type?",
    "options": [
      "Preventive",
      "Corrective",
      "Adaptive",
      "Perfective"
    ],
    "correctIndex": 1,
    "explanation": "Software Development Process and the SDLC — Types of Maintenance: Corrective maintenance fixes bugs and defects."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Updating software to operate in a changed environment is which maintenance type?",
    "options": [
      "Perfective",
      "Preventive",
      "Adaptive",
      "Corrective"
    ],
    "correctIndex": 2,
    "explanation": "Software Development Process and the SDLC — Types of Maintenance: Adaptive maintenance updates software for new or changing environments."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Adding features or improving performance is which maintenance type?",
    "options": [
      "Corrective",
      "Adaptive",
      "Preventive",
      "Perfective"
    ],
    "correctIndex": 3,
    "explanation": "Software Development Process and the SDLC — Types of Maintenance: Perfective maintenance improves performance or adds new features."
  },
  {
    "chapter": "Software Development Process and the SDLC",
    "question": "Changes made to prevent future problems illustrate which maintenance type?",
    "options": [
      "Preventive",
      "Corrective",
      "Adaptive",
      "Perfective"
    ],
    "correctIndex": 0,
    "explanation": "Software Development Process and the SDLC — Types of Maintenance: Preventive maintenance averts future problems and improves maintainability."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "Which project is a good fit for Waterfall according to the notes?",
    "options": [
      "A project delivering independently useful increments",
      "A small project with stable requirements",
      "A high-risk project needing repeated risk analysis",
      "A project needing continuous customer-led changes"
    ],
    "correctIndex": 1,
    "explanation": "Software Process Models and CMMI — 1. Waterfall Model: The Waterfall advantages name small and stable projects."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "What is a stated disadvantage of Waterfall?",
    "options": [
      "It cannot define a sequence of project phases",
      "It delivers too many early functional increments",
      "Changes are difficult after development starts",
      "It requires continuous stakeholder feedback"
    ],
    "correctIndex": 2,
    "explanation": "Software Process Models and CMMI — 1. Waterfall Model: The notes describe Waterfall as non-flexible, with difficult changes once development starts."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "What distinguishes the incremental model?",
    "options": [
      "One fixed sequential pass through phases",
      "Repeated cycles driven primarily by risk",
      "A testing phase paired with every design phase",
      "Delivery in small functional parts"
    ],
    "correctIndex": 3,
    "explanation": "Software Process Models and CMMI — 2. Incremental Model: Each increment has functionality and delivers part of the software."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "Which model combines iterative development with repeated risk analysis?",
    "options": [
      "Spiral",
      "Waterfall",
      "Incremental",
      "V-Model"
    ],
    "correctIndex": 0,
    "explanation": "Software Process Models and CMMI — 3. Spiral Model: The Spiral Model is explicitly risk-driven and uses repeated cycles."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "Which project best matches a stated Spiral advantage?",
    "options": [
      "A project requiring no iteration",
      "A large, high-risk project",
      "A small, stable project",
      "A project avoiding risk analysis"
    ],
    "correctIndex": 1,
    "explanation": "Software Process Models and CMMI — 3. Spiral Model: The Spiral advantages identify large and high-risk projects and early handling of risk."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "Which pair is given as examples of Agile approaches?",
    "options": [
      "Verification and Validation",
      "Requirement Analysis and Deployment",
      "Extreme Programming and Scrum",
      "High-Level Design and Low-Level Design"
    ],
    "correctIndex": 2,
    "explanation": "Software Process Models and CMMI — 4. Agile Model: The Agile description gives Extreme Programming and Scrum as examples."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "How does the V-Model extend Waterfall?",
    "options": [
      "Each increment removes the need for testing",
      "Risk analysis replaces every development phase",
      "Operations are excluded from the software process",
      "Each development phase has a testing phase"
    ],
    "correctIndex": 3,
    "explanation": "Software Process Models and CMMI — 5. V-Model (Verification and Validation Model): The V-Model pairs each development phase with a corresponding testing phase."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "What is CMMI used for?",
    "options": [
      "Process improvement",
      "Source-code execution",
      "User interface rendering",
      "Production data migration"
    ],
    "correctIndex": 0,
    "explanation": "Software Process Models and CMMI — Capability Maturity Model Integration (CMMI): CMMI helps organizations develop and refine processes for performance, quality and efficiency."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "At which CMMI level are processes documented and standardized?",
    "options": [
      "4",
      "3",
      "1",
      "2"
    ],
    "correctIndex": 1,
    "explanation": "Software Process Models and CMMI — Levels of CMMI: The table assigns documented and standardized processes to Level 3, Defined."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "At which CMMI level are processes measured and controlled?",
    "options": [
      "3",
      "5",
      "4",
      "2"
    ],
    "correctIndex": 2,
    "explanation": "Software Process Models and CMMI — Levels of CMMI: The table assigns measurement and control to Level 4, Quantitatively Managed."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "Which description belongs to Level 5, Optimizing?",
    "options": [
      "Ad-hoc and chaotic processes",
      "Repeating past project successes",
      "Documenting standardized processes",
      "Continuous process improvement"
    ],
    "correctIndex": 3,
    "explanation": "Software Process Models and CMMI — Levels of CMMI: Level 5 focuses on applying continuous process improvement."
  },
  {
    "chapter": "Software Process Models and CMMI",
    "question": "Which is a stated limitation of CMMI?",
    "options": [
      "It can be documentation-heavy",
      "It prevents project consistency",
      "It excludes process improvement",
      "It eliminates customer confidence"
    ],
    "correctIndex": 0,
    "explanation": "Software Process Models and CMMI — Limitations of CMMI: The limitations include expense, heavy documentation, implementation time and difficulty for small teams."
  }
];
