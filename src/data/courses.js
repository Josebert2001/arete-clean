// Extension is required: scripts/validate-modules.mjs imports this file through
// plain Node ESM, which does not do Vite's extensionless resolution.
import { cyb123LectureNotes } from './lectureNotes/cyb123.js';
import { cyb221LectureNotes } from './lectureNotes/cyb221.js';
import { gst121LectureNotes } from './lectureNotes/gst121.js';

export const courses = [

  // ═══════════════════════════════════════════════════════════════
  //  100 LEVEL — FIRST SEMESTER  (17 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 111',
    slug: 'gst-111',
    title: 'Communication in English',
    units: 2, level: 100, semester: 1, lh: 15, ph: 45,
    subject: 'gst',
    crossDepartmental: true,
    description: 'Develops the English language skills required for academic and professional success: sound patterns, word classes, sentence construction, logical/critical reasoning, and writing craft. A foundation course that improves every other course you will take.',
    topics: [
      'Sound patterns in English: vowels, consonants, phonetics and phonology',
      'Word classes: lexical and grammatical words, forms and usage',
      'Sentence types: structural, functional, simple and complex',
      'Grammar and usage: tense, mood, modality, and concord',
      'Logical and critical thinking: syllogism, inductive and deductive reasoning, analogy',
      'Ethical considerations, copyright rules and infringements',
      'Writing process: pre-writing, drafting, editing and proofreading; essays, CVs, reports',
      'Comprehension strategies and reading types',
      'ICT in modern language learning; public speaking and listening',
    ],
    textbooks: [
      { title: 'Communicating in English', authors: 'Aremo, Adetayo & Farinde', note: 'The standard text used across most Nigerian universities' },
      { title: 'English Grammar in Use', authors: 'Raymond Murphy', note: '5th ed. — the best practical grammar reference' },
    ],
    searchTerms: [
      'Academic essay writing tutorial for university',
      'English grammar in use free exercises',
      'How to write a university assignment',
      'Technical writing basics for engineering students',
    ],
    studyTips: [
      'Do not treat GST courses as unimportant — writing skills affect your grades in every other course',
      'Practice essay writing by timing yourself: 45 minutes per essay, as you will in the exam',
      'Build vocabulary by reading one news article daily and noting unfamiliar words',
      'Keep a small notebook of common grammar errors you make and review it weekly',
    ],
  },
  {
    code: 'MTH 111',
    slug: 'mth-111',
    title: 'Elementary Mathematics I (Algebra and Trigonometry)',
    units: 2, level: 100, semester: 1, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'Algebra and trigonometry for university-level computation: set theory, real and complex numbers, sequences and series, quadratic equations, and circular measure. Bridges secondary-school maths with the rigour needed for the programme.',
    topics: [
      'Elementary set theory: subsets, union, intersection, complements, Venn diagrams',
      'Real numbers: integers, rational and irrational numbers, mathematical induction',
      'Real sequences and series',
      'Theory of quadratic equations and the binomial theorem',
      'Complex numbers: algebra of complex numbers, the Argand diagram',
      "De Moivre's theorem and nth roots of unity",
      'Circular measure and trigonometric functions of angles of any magnitude',
      'Addition and factor formulae',
    ],
    textbooks: [
      { title: 'Engineering Mathematics', authors: 'K.A. Stroud', note: '8th ed. — outstanding worked examples; used across all years' },
      { title: 'Further Mathematics', authors: 'Tuttuh-Adegun, Sivasubramaniam & Adegoke', note: 'West African secondary/early uni standard; bridges the gap well' },
    ],
    searchTerms: [
      'Khan Academy algebra full course free',
      'Sequences and series complete tutorial',
      'Logarithms and indices exam questions Nigeria',
      'MIT mathematics for computer science free',
    ],
    studyTips: [
      'Work at least 10 practice problems per topic — mathematics is only learnt by doing',
      'Keep a formula sheet and update it every week; review before each lecture',
      'Khan Academy is free and covers every topic in this course at the right level',
      'Form a study group: explaining a solution to a classmate reveals whether you truly understand it',
    ],
  },
  {
    code: 'PHY 111',
    slug: 'phy-111',
    title: 'General Physics I (Mechanics)',
    units: 2, level: 100, semester: 1, lh: 30, ph: 0,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Classical mechanics: vectors, kinematics, Newtonian dynamics, conservation principles, rotational motion, and gravitation. Builds the physical intuition that underpins electronics, networking signals, and hardware concepts encountered in later cybersecurity courses.',
    topics: [
      'Space, time, units and dimensions; vectors and scalars',
      'Differentiation of vectors: displacement, velocity, acceleration; kinematics',
      "Newton's laws of motion: inertial frames, impulse, momentum conservation",
      'Equations of motion and application of Newtonian mechanics',
      'Conservation principles: conservative forces, kinetic and potential energy',
      'System of particles, centre of mass, rotational motion and torque',
      'Angular momentum, polar coordinates, circular motion, moments of inertia',
      "Gravitation: Newton's Law of Gravitation, Kepler's Laws, escape velocity, satellite orbits",
    ],
    textbooks: [
      { title: 'University Physics with Modern Physics', authors: 'Young & Freedman', note: '15th ed. — the most widely used physics text worldwide' },
      { title: 'Fundamentals of Physics', authors: 'Halliday, Resnick & Walker', note: '11th ed. — clear explanations and many worked examples' },
    ],
    searchTerms: [
      'Khan Academy physics mechanics free',
      "Newton's laws of motion explained simply",
      'University physics mechanics full course YouTube',
      'Waves and thermodynamics lecture series',
    ],
    studyTips: [
      'Always draw a free-body diagram before attempting any mechanics problem',
      'Learn units and dimensions first — dimensional analysis catches most errors',
      'Connect physics concepts to real technology: waves → WiFi signals, thermodynamics → CPU cooling',
      'Khan Academy Physics covers this entire course for free — use it alongside lectures',
    ],
  },
  {
    code: 'PHY 117',
    slug: 'phy-117',
    title: 'General Practical Physics I',
    units: 1, level: 100, semester: 1, lh: 0, ph: 45,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Laboratory practicals that accompany PHY 111. Quantitative measurement, treatment of measurement errors, and graphical analysis across mechanical, electrical, light, heat, and viscosity experiments. Develops precision, scientific method, and report-writing discipline.',
    topics: [
      'Laboratory safety and quantitative measurement techniques',
      'Treatment of measurement errors',
      'Studies of meters and the oscilloscope',
      'Mechanical systems experiments',
      'Electrical and mechanical resonant systems',
      'Light, heat, and viscosity experiments',
      'Graphical analysis of experimental data',
      'Scientific report writing',
    ],
    textbooks: [
      { title: 'Practical Physics', authors: 'G.L. Squires', note: '4th ed. — the standard lab manual reference' },
      { title: 'Experimental Physics', authors: 'R.A. Dunlap', note: 'Good treatment of error analysis and reporting' },
    ],
    searchTerms: [
      'How to write a physics lab report',
      'Error analysis in physics experiments',
      'Simple pendulum experiment calculation',
      "Vernier calliper how to read",
    ],
    studyTips: [
      'Take measurements three times and average them — always follow good experimental practice',
      'Write up your lab report on the same day as the experiment while it is fresh in your memory',
      'Show all calculations clearly — marks in practicals are awarded for method, not just the answer',
      'Understand the theory behind each experiment before you arrive at the lab',
    ],
  },
  {
    code: 'COS 111',
    slug: 'cos-111',
    title: 'Introduction to Computing Sciences',
    units: 3, level: 100, semester: 1, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    description: 'A broad survey of the computing field: hardware, software, human-ware, information processing, and the many specializations within computing. Lays the conceptual vocabulary and hands-on device familiarity for everything that follows in your degree.',
    topics: [
      'Brief history of computing',
      'Basic components of a computer/computing device; input/output devices and peripherals',
      'Hardware, software and human-ware',
      'Diverse and growing computer/digital applications',
      'Information processing and its role in society',
      'The Internet: applications and impact on the world today',
      'Areas and specializations within the computing discipline; job specializations for computing professionals',
      'The future of computing',
      'Lab work: OS across desktops/laptops/tablets/phones, common applications, browsers, search engines, online resources',
    ],
    textbooks: [
      { title: 'Introduction to Computers and Information Technology', authors: 'Gary B. Shelly & Misty E. Vermaat', note: 'Clear, visual, beginner-friendly' },
      { title: 'Computer Science: An Overview', authors: 'J. Glenn Brookshear & Dennis Brylow', note: '13th ed. — comprehensive and rigorous' },
    ],
    searchTerms: [
      'How computers work crash course computer science',
      'Number systems binary hexadecimal explained',
      'Introduction to computing sciences full lecture',
      'CS50 Introduction to Computer Science Harvard free',
    ],
    studyTips: [
      'This is the course that sets the tone — learn number conversions until they are automatic',
      'CrashCourse Computer Science on YouTube (free) covers most of this course in engaging 10-minute episodes',
      'Harvard CS50 (free on edX) is the gold standard introduction to computing — bookmark it',
      'Link every abstract concept to something physical: binary → two states of a switch/transistor',
    ],
  },
  {
    code: 'STA 111',
    slug: 'sta-111',
    title: 'Descriptive Statistics',
    units: 3, level: 100, semester: 1, lh: 45, ph: 0,
    subject: 'stats',
    crossDepartmental: true,
    description: 'The language of data: types, sources, and methods of data collection; presentation, errors and approximations; and the core measures used to summarise a dataset. A foundation for every analysis task in cybersecurity, research, and data-driven decision-making.',
    topics: [
      'Statistical data: types, sources and methods of collection',
      'Presentation of data: tables, charts and graphs',
      'Errors and approximations',
      'Frequency and cumulative distributions',
      'Measures of location: mean, median, mode',
      'Measures of partition and dispersion: range, variance, standard deviation',
      'Skewness and kurtosis',
      'Rates, ratios and index numbers',
    ],
    textbooks: [
      { title: 'Statistics for Management and Economics', authors: 'Gerald Keller', note: '11th ed. — very practical with real-world examples' },
      { title: 'Introductory Statistics', authors: 'Neil A. Weiss', note: '10th ed. — clear exposition, good for self-study' },
    ],
    searchTerms: [
      'Descriptive statistics full course Khan Academy',
      'Mean median mode standard deviation explained',
      'StatQuest with Josh Starmer YouTube',
      'Statistics for beginners complete course',
    ],
    studyTips: [
      'StatQuest with Josh Starmer on YouTube makes every stats concept intuitive — start there',
      'Always choose the right measure of central tendency: mean for symmetric data, median for skewed data',
      'Practice calculating variance and standard deviation by hand at least 5 times before the exam',
      'Draw histograms and box plots manually — you see patterns that summary numbers hide',
    ],
  },
  {
    code: 'UUY-CSC 111',
    slug: 'uuy-csc-111',
    title: 'Computer Operations',
    units: 2, level: 100, semester: 1, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    description: 'Practical computer skills: laboratory safety, hardware components, operating system navigation, productivity software, internet operations, and an introduction to statistical computing with SPSS. The hands-on companion to COS 111.',
    topics: [
      'Laboratory ethics and safety precautions; basic components of a computer system',
      'Booting a PC; Windows, Unix, Linux and Macintosh operating systems',
      'File systems: directories, subdirectories and file paths',
      'Application packages: Word, Excel, Access, PowerPoint, CorelDraw',
      'Internet operations: web browsers, e-mail, search engines',
      'Document creation, editing, formatting and printing',
      'Modern statistical computing and data management; verifying and transferring data',
      'Introduction to SPSS: summarising data, hypothesis testing, correlation, regression, and probability distributions',
    ],
    textbooks: [
      { title: 'Microsoft Office 365: In Practice', authors: 'Randy Nordell', note: '2021 ed. — practical step-by-step coverage' },
      { title: 'Computer Literacy for IC3', authors: 'Connie Morrison & Faithe Wempen', note: '5th ed. — good for foundational skills' },
    ],
    searchTerms: [
      'Microsoft Office complete tutorial free YouTube',
      'Excel for beginners full course',
      'Linux command line basics tutorial',
      'Google Workspace tutorial for students',
    ],
    studyTips: [
      'Practise every application feature you learn immediately on your own computer',
      'Learn Excel functions early — VLOOKUP, SUMIF, and pivot tables appear in research projects later',
      'Touch-type practice daily (use keybr.com free) — speed matters more than you expect',
      'Save all your university work to Google Drive or OneDrive so nothing is ever lost',
    ],
  },
  {
    code: 'UUY-CSC 112',
    slug: 'uuy-csc-112',
    title: 'Computer Troubleshooting',
    units: 2, level: 100, semester: 1, lh: 15, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    description: 'Diagnosing and resolving common hardware and software problems across PCs, laptops, tablets, and mobile phones. Covers network connectivity/security troubleshooting, backup and restore, and virus/anti-virus procedures — practical skills every cybersecurity professional needs.',
    topics: [
      'Fundamentals of hardware',
      'Handling, testing and troubleshooting personal computer problems',
      'Diagnosis and repair of laptops, tablets and mobile phones',
      'Internet connections, network services, and network security troubleshooting',
      'Maintenance of computer networks and peripherals',
      'System backup and restore operations',
      'Viruses and anti-virus procedures',
      'Inbuilt and external diagnostic tools; installing, configuring, optimizing and upgrading systems',
    ],
    textbooks: [
      { title: 'CompTIA A+ Core 1 (220-1101) and Core 2 (220-1102)', authors: 'Mike Meyers', note: 'The industry-standard hardware troubleshooting guide' },
      { title: 'PC Maintenance and Repair', authors: 'Jean Andrews', note: '10th ed. — detailed and practice-oriented' },
    ],
    searchTerms: [
      'CompTIA A+ full course free YouTube Professor Messer',
      'PC troubleshooting step by step guide',
      'How to install Windows 11 fresh install tutorial',
      'Computer hardware assembly tutorial beginner',
    ],
    studyTips: [
      'Professor Messer on YouTube has a free, comprehensive CompTIA A+ course that covers this entire course',
      'When troubleshooting, always follow a systematic approach: most common cause → less common',
      'Build a habit of documenting every problem and its solution — this is how senior technicians work',
      'If you can access a spare PC to disassemble and reassemble, do it until it is routine',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  100 LEVEL — SECOND SEMESTER  (16 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 121',
    slug: 'gst-121',
    title: 'Nigerian Peoples and Culture',
    units: 2, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'gst',
    crossDepartmental: true,
    description: 'An introduction to Nigeria\'s ethnic diversity, cultural heritage, colonial and political history, and nation-building challenges. Provides context for the social and policy dimensions of cybersecurity in Nigeria.',
    topics: [
      'Nigerian history, culture and art up to 1800 (Yoruba, Hausa, Igbo, and minority groups)',
      'Nigeria under colonial rule and colonial administration',
      'Evolution of Nigeria as a political unit: amalgamation, nationalist movement, independence',
      'Challenges of nation-building: military intervention, the Nigerian Civil War',
      'Trade and economics of self-reliance: indigenous trade, apprenticeship, skill acquisition',
      'Social justice, national development, and the judiciary',
      'Individual norms and values; citizenship acquisition and civic responsibilities',
      'Re-orientation and national values: the 3Rs and national orientation strategies',
    ],
    textbooks: [
      { title: 'Nigerian Peoples and Culture', authors: 'Emmanuel N. Emeka', note: 'Standard Nigerian university text for this course' },
      { title: 'The History of Nigeria', authors: 'Toyin Falola', note: 'Concise and authoritative account' },
    ],
    searchTerms: [
      'History of Nigeria overview documentary',
      'Nigerian ethnic groups cultures explained',
      'Cybercrime in Nigeria EFCC statistics',
      'Nigerian constitution branches of government',
    ],
    studyTips: [
      'Link course topics to current events — Nigerian news puts everything in context',
      'For the culture component, draw on your own background and community knowledge',
      'Cybercrime topics connect directly to your degree — pay extra attention there',
      'Past questions drive most of the exam content for GST courses — collect and study them',
    ],
    // Transcribed from the Directorate of General Studies' official GST 121
    // textbook (May 2024) — see src/data/lectureNotes/gst121.js for provenance,
    // the full 17-chapter table of contents, and the coverage mapping.
    lectureNotes: gst121LectureNotes,
  },
  {
    code: 'COS 121',
    slug: 'cos-121',
    title: 'Problem Solving',
    units: 3, level: 100, semester: 2, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    hasInteractiveModules: true,
    interactiveTrackPath: '/tracks/python',
    interactiveLabel: 'Python',
    interactiveModuleCount: 12,
    description: 'Algorithmic thinking and systematic problem solving using Python and C. Covers problem identification, solution techniques, pseudocode/flowcharts, and programming fundamentals — the first real programming course in the degree. Strong performance here builds confidence for all future programming courses.',
    topics: [
      'Problems and problem-solving: routine vs non-routine problems',
      'Methods of solving computing problems: algorithms and heuristics',
      'Solvable and unsolvable problems',
      'Solution techniques: abstraction, brainstorming, trial and error, divide and conquer, root cause analysis',
      'General problem-solving process',
      'Solution formulation and design: flowchart, pseudocode, decision table, decision tree',
      'Implementation, evaluation and refinement',
      'Programming in C and Python',
    ],
    textbooks: [
      { title: 'Python Crash Course', authors: 'Eric Matthes', note: '3rd ed. — the best beginner Python book; very practical' },
      { title: 'Think Python: How to Think Like a Computer Scientist', authors: 'Allen Downey', note: '2nd ed. — free PDF at greenteapress.com' },
    ],
    searchTerms: [
      'Python for beginners full course freeCodeCamp YouTube',
      'Flowchart and pseudocode tutorial',
      'Python problem solving exercises for beginners',
      'CS50P Introduction to Programming with Python Harvard free',
    ],
    studyTips: [
      'Areté has 12 full interactive Python modules for this course — use them from day one',
      'Never copy-paste code examples — type every line yourself so your fingers learn the syntax',
      'Solve at least one coding problem daily, even if small; consistency beats cramming',
      'Harvard CS50P (Introduction to Programming with Python) is free and excellent',
    ],
    lectureNotes: [
      {
        number: '1',
        title: 'Concept of Computing',
        sections: [
          {
            type: 'definition',
            text: 'Computing is the study and use of computer systems to process data, solve problems, and automate tasks. It involves hardware, software, algorithms, and programming to achieve effective and efficient solutions.',
          },
          {
            type: 'bullets',
            heading: 'Core Concepts of Computing',
            items: [
              'Data and information policy processing',
              'Programming',
              'Computer Hardware & Software',
              'Algorithms & Problem Solving',
              'Networking & Communication',
              'Artificial Intelligence (A.I)',
            ],
          },
          {
            type: 'bullets',
            heading: 'Features of Computing',
            items: ['Automation', 'Speed', 'Versatility', 'Connectivity'],
          },
        ],
      },
      {
        number: '2',
        title: 'Problem and Problem Solving',
        sections: [
          {
            type: 'definition',
            text: 'Problem solving is a process of finding solutions to complex challenges. It involves breaking down a problem, analyzing it, and applying systematic methods to find a solution using algorithms and programming techniques.',
          },
          {
            type: 'bullets',
            heading: 'Steps in Solving a Problem',
            items: [
              'Understanding the problem',
              'Break down the problem',
              'Explore possible solutions',
              'Choose the best solution',
              'Implement the best solution',
              'Test and debug',
              'Evaluate the system',
            ],
          },
          {
            type: 'bullets',
            heading: 'Features of Problem Solving',
            items: [
              'Being able to approach a problem (Logical reasoning)',
              'Creativity',
              'Analytical thinking ability',
              'Persistent: easy to refine and optimize questions',
            ],
          },
          {
            type: 'text',
            heading: 'Problem Identification and Types of Problem',
            text: 'A well-identified problem should be:',
          },
          {
            type: 'bullets',
            items: ['Clearly defined', 'Measurable', 'Feasible'],
          },
          {
            type: 'text',
            heading: 'Types of Problem',
            text: 'Problems can be categorized based on complexity and how frequently they occur:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Routine problem', def: 'They are common and occur frequently in similar conditions. These problems often have pre-defined solutions and can be solved using standard procedures and algorithms. Solutions are standard and do not require creativity.' },
              { term: 'Non-routine problem', def: 'They are complex and do not have straightforward solutions. They require creative thinking, experimentation, and new strategies to solve the problem.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Methods of Solving Computing Problems',
            items: [
              { term: 'Algorithm', def: 'A structured approach to problem solving. A step-by-step procedure or set of rules used to solve a specific problem. Features: There must be inputs. There must be outputs. It must be definite. It is finite, correct, and efficient.' },
              { term: 'Heuristic', def: "An approximate approach. It finds a satisfactory solution in a place where an optimal solution is impracticable. It doesn't guarantee a perfect solution but is aimed at finding a good enough solution quickly. It is applied when you can't get an optimal solution." },
            ],
          },
          {
            type: 'termlist',
            heading: 'Solution Techniques in Problem Solving',
            items: [
              { term: 'Abstraction', def: 'Focuses on relevant details and not irrelevant details. Abstraction can be applied in software development, artificial intelligence, and cybersecurity.' },
              { term: 'Analogy', def: 'Using past experience to solve a problem. Features: Uses past experience; encourages pattern recognition commonly used in machine learning.' },
              { term: 'Brainstorming', def: 'A group or individual problem-solving technique where multiple ideas are generated. Features: Encourages creative thinking; mostly used in business, software development, and research.' },
              { term: 'Trial & Error', def: 'Trying different solutions with the intention of taking the best.' },
              { term: 'Hypothesis Testing', def: 'This involves simulating an assumption and testing it through experiment or observation.' },
              { term: 'Reduction', def: 'Simplifies a complex problem by breaking it down into simpler equivalent problems that are easier to solve. Mostly used in mathematics and computing.' },
              { term: 'Literal Thinking', def: 'Involves applying a logical and direct approach to a problem solution without assumption or abstract interpretation. Features: Avoids assumption and abstract interpretation.' },
              { term: 'Means-end Analysis', def: 'It involves comparing the current state of a problem with a desired goal and determining the best way to close the gap.' },
              { term: 'Root Cause Analysis (RCA)' },
              { term: 'Proof', def: 'The process of logically verifying the correctness of a solution using mathematical or formal proving.' },
              { term: 'Divide and Conquer', def: 'This is where a complex problem is divided into smaller tasks, solved individually, and the solutions are combined.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'General Problem Solving Process',
            items: [
              'Problem definition',
              'Analysis of the problem',
              'Develop an algorithm',
              'Implement the solution',
              'Test and debug',
              'Document and maintain',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Python Programming',
        sections: [
          {
            type: 'text',
            heading: 'History of Python Programming',
            text: 'Python was created by Guido Van Rossum in the year 1991. It made use of a user-friendly language and is a multipurpose language that is compatible with other programming languages and operating systems like Windows, Linux, and macOS. (Important Note: Python 2.0 - 2000, Python 3.0 - 2008).',
          },
          {
            type: 'definition',
            heading: 'Definition',
            text: 'Python Programming is a script of sequence information and commands evaluated and resolved by an interpreter called a shell. It consists of primitive constructs, syntax, and static semantics.',
          },
          {
            type: 'bullets',
            heading: 'Fundamental Concepts of Python Programming',
            items: ['Variables', 'Data types', 'Operators'],
          },
          {
            type: 'bullets',
            heading: '1. Variables',
            items: [
              "It doesn't start with a digit.",
              "It doesn't start with verb words.",
              'It can only contain letters, digits, and underscores (_).',
              'Can be assigned different values. It allows multiple variables to hold a particular value by using an assignment operator (=). Different values can be assigned to different variables. Variables are locations where data is stored.',
              'Variables in Python are case-sensitive.',
              "You can't use Python reserved words or keywords as a variable (e.g., if, for).",
            ],
          },
          {
            type: 'termlist',
            heading: '2. Data Types',
            items: [
              { term: 'Numeric', def: 'Scalar objects assigned to variables used for mathematical operations.' },
              { term: 'Sequence Type', def: 'Used to store ordered, changeable collections.' },
              { term: 'Boolean' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Numeric Types',
            items: [
              { term: 'Integer (int)', def: 'Whole numbers (negative or positive).' },
              { term: 'Float', def: 'Decimal numbers.' },
              { term: 'Complex' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Sequence Types',
            items: [
              { term: 'String (str)', def: 'Represented by data in a single quote or double quote in the memory.' },
              { term: 'List', def: 'Stores ordered, changeable collections.' },
              { term: 'Tuple', def: 'Ordered but unchangeable.' },
              { term: 'Dictionary (dict)' },
              { term: 'Set', def: "Ordered and mutable collection used for storage of unique elements and can't be accessed by using indexing." },
            ],
          },
          {
            type: 'text',
            heading: '3. Operators',
            text: 'Operators are used to perform mathematical operations or sequence operations on variables and values.',
          },
          {
            type: 'termlist',
            heading: 'Arithmetic Operators',
            items: [
              { term: 'Addition (+)', def: 'a + b' },
              { term: 'Subtraction (-)', def: 'a - b' },
              { term: 'Division (/)', def: 'a / b' },
              { term: 'Multiplication (*)', def: 'a * b' },
              { term: 'Modulus (%)', def: 'a % b' },
              { term: 'Floor Division (//)', def: 'a // b' },
              { term: 'Exponential/Power (**)', def: 'a ** b' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Logical Operators',
            items: ['AND (and, &)', 'OR (or, |)', 'NOT (not, !, ~)'],
          },
          {
            type: 'table',
            heading: 'Truth Table',
            headers: ['A', 'B', 'A and B', 'A or B', 'not A', 'not B'],
            rows: [
              ['F', 'F', 'F', 'F', 'T', 'T'],
              ['F', 'T', 'F', 'T', 'T', 'F'],
              ['T', 'F', 'F', 'T', 'F', 'T'],
              ['T', 'T', 'T', 'T', 'F', 'F'],
            ],
          },
          {
            type: 'table',
            heading: 'Assignment Operators',
            headers: ['Operator', 'Symbol', 'Output'],
            rows: [
              ['=', 'x = 3', 'x = 3'],
              ['+=', 'x += 3', 'x = x + 3'],
              ['-=', 'x -= 3', 'x = x - 3'],
              ['*=', 'x *= 3', 'x = x * 3'],
              ['/=', 'x /= 3', 'x = x / 3'],
              ['//=', 'x //= 3', 'x = x // 3'],
              ['%=', 'x %= 3', 'x = x % 3'],
              ['**=', 'x **= 3', 'x = x ** 3'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Comparison / Relational Operators',
            items: [
              { term: 'Equals to', def: '==' },
              { term: 'Greater than', def: '>' },
              { term: 'Less than', def: '<' },
              { term: 'Greater than or equal', def: '>=' },
              { term: 'Less than or equal', def: '<=' },
            ],
          },
          {
            type: 'text',
            text: '(Note: = is assignment, == is comparison. The answer to a logical/comparison operation is a boolean).',
          },
          {
            type: 'bullets',
            heading: 'Precedence Operation (BEDMAS)',
            items: ['Bracket', 'Exponential', 'Division', 'Multiplication', 'Addition', 'Subtraction'],
          },
        ],
      },
      {
        number: '4',
        title: 'Control Structures',
        sections: [
          {
            type: 'termlist',
            heading: 'Conditional Statements',
            items: [
              { term: 'if', def: 'One condition, one action' },
              { term: 'if else', def: 'One condition, two actions' },
              { term: 'if elif', def: 'Two conditions, two actions' },
              { term: 'if elif else', def: 'Two conditions, three actions' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Loops',
            items: [
              { term: 'The for Loop', def: 'Used for iterating over a sequence.' },
              { term: 'The while Loop', def: 'Repeatedly executes a code block as long as its condition remains true.' },
              { term: 'Nested Loop', def: 'When a loop is inside another loop.' },
            ],
          },
          {
            type: 'code',
            heading: 'The for Loop — Example',
            code: "modulus = ['Algebra', 'Physics', 'Chemistry', 'python']\n\nfor subject in modulus:\n    print(f\"Studying {subject}\")",
          },
        ],
      },
      {
        number: '5',
        title: 'Arrays and Lists',
        sections: [
          {
            type: 'code',
            code: '# Creating a list\nmarks = [75, 88, 62, 95, 50]\n\n# Accessing elements\nprint(marks[0]) # 75 (first element)\nprint(marks[3]) # 95 (fourth element)',
          },
          {
            type: 'text',
            text: 'append is a command used to assign a value or item to the end of the list.',
          },
        ],
      },
      {
        number: '6',
        title: 'Functions and Classes',
        sections: [
          {
            type: 'definition',
            heading: 'Functions',
            text: 'A function is a subprogram or module and a unit of a program. In some programming languages, it is called a procedure. It performs a specific task and is reusable. You can call a function as many times as required.',
          },
          {
            type: 'code',
            heading: 'Defining a Function',
            code: 'def greet(name):\n    "Display a personalized greeting"\n    print(f"Good day {name}")\n\ngreet("Alice") # Output: Good day Alice',
          },
          {
            type: 'termlist',
            heading: 'Scope',
            items: [
              { term: 'Local variable', def: 'A variable that exists within a function.' },
              { term: 'Global variable', def: 'A variable that exists outside functions.' },
            ],
          },
          {
            type: 'text',
            text: 'The scope of a variable determines where in the code it can be accessed (LEGB rules: Local, Enclosing, Global, Built-in).',
          },
          {
            type: 'termlist',
            heading: 'Arguments',
            items: [
              { term: '*args', def: 'Defines undefined positional values in a variable.' },
              { term: '**kwargs', def: 'Defines undefined keyword values in a variable.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Object-Oriented Programming (OOP)',
            text: 'OOP is a programming paradigm that organizes software around objects. An object means instances that bundle together data attributes.',
          },
          {
            type: 'termlist',
            heading: 'Fundamental Principles of OOP',
            items: [
              { term: 'Encapsulation', def: 'Bundling data and methods; private attributes accessed via getter/setter methods.' },
              { term: 'Abstraction', def: 'Exposing only necessary details.' },
              { term: 'Inheritance', def: 'A child class inherits properties from a parent class.' },
              { term: 'Polymorphism', def: 'Different classes implement the same method name differently.' },
            ],
          },
          {
            type: 'table',
            heading: 'Summary of OOP Concepts',
            headers: ['OOP Concept', 'Python Implementation'],
            rows: [
              ['Class', 'Defined with the class keyword. It is a blueprint/template.'],
              ['Object', 'Created by calling the class: Object = ClassName(args)'],
              ['Constructor', '__init__ method - initializes instance attributes.'],
              ['Instance attribute', 'Defined as self.attribute inside a method.'],
              ['Class attribute', 'Defined directly in the class body (shared by all objects).'],
              ['Method', 'Function defined inside a class; first parameter is self.'],
            ],
          },
        ],
      },
      {
        number: '7',
        title: 'Writing Mathematical Formulas in Python',
        sections: [
          {
            type: 'text',
            text: 'To write formulas in Python, they must be written in a straight line format.',
          },
          {
            type: 'table',
            heading: 'Examples',
            headers: ['Rule', 'Example / Formula', 'Python'],
            rows: [
              ['Formula', 'B = nPR / xy²', 'B = (n * P * R) / (x * (y ** 2))'],
              ['Subscripts', 'P₁', 'P1 or P_1'],
              ['Greek letters', 'θ²R / αβ (use their names, e.g., theta, alpha, beta)', '((theta ** 2) * R) / (alpha * beta)'],
              ['Square root', '√x', 'math.sqrt(x)'],
            ],
          },
        ],
      },
      {
        number: '8',
        title: 'Input, Output, and Type-Casting',
        sections: [
          {
            type: 'code',
            heading: 'Input Function',
            code: 'x = input("Enter x: ")',
          },
          {
            type: 'code',
            heading: 'Output Function',
            code: 'print("Box") # Defined string\nprint(f"Value is {box}") # Format printing',
          },
          {
            type: 'text',
            heading: 'Type-Casting',
            text: 'Changing a value from one data type to another.',
          },
          {
            type: 'bullets',
            items: ['int()', 'float()', 'str()'],
          },
        ],
      },
      {
        number: '9',
        title: 'GUI with Tkinter',
        sections: [
          {
            type: 'definition',
            text: 'tkinter is a package used for creating Graphical User Interfaces.',
          },
          {
            type: 'code',
            heading: 'Basic Setup',
            code: 'import tkinter as tk\n\nroot = tk.Tk() # root can be called windows or screen\nroot.geometry("400x350")\nroot.title("Python Class")\n\nlabel1 = tk.Label(root, text="Python Programming")\nlabel1.place(x=100, y=100)\n\nroot.mainloop() # Must be the last line',
          },
          {
            type: 'casestudy',
            title: 'Assignment',
            prompt: 'Create a window, add caption "Arithmetic operation". Include inputs for "First number" and "Second number", a result box, and buttons for Add, Sub, Mul, Div, and Exit.',
          },
        ],
      },
    ],
  },
  {
    code: 'MTH 121',
    slug: 'mth-121',
    title: 'Elementary Mathematics II (Calculus)',
    units: 2, level: 100, semester: 2, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'Calculus and trigonometry: differentiation, integration, and their applications. Builds the analytical foundation for probability, statistics, and signal theory used in cybersecurity analysis.',
    topics: [
      'Trigonometric functions and identities',
      'Limits, continuity, and the derivative',
      'Rules of differentiation: product, quotient, chain',
      'Applications of derivatives: tangents, rates, max/min',
      'Definite and indefinite integrals',
      'Techniques of integration: substitution, by parts',
      'Applications of integration: area, volume',
      'Introduction to ordinary differential equations',
    ],
    textbooks: [
      { title: 'Engineering Mathematics', authors: 'K.A. Stroud', note: '8th ed. — the most student-friendly maths text for engineers' },
      { title: 'Calculus: Early Transcendentals', authors: 'James Stewart', note: '9th ed. — comprehensive; the global standard' },
    ],
    searchTerms: [
      'Khan Academy calculus derivatives integrals free',
      '3Blue1Brown essence of calculus YouTube',
      'Integration techniques full tutorial',
      'MIT OCW single variable calculus 18.01',
    ],
    studyTips: [
      '3Blue1Brown "Essence of Calculus" on YouTube builds genuine geometric intuition — watch it',
      'Calculus rewards consistent daily practice more than any last-minute cramming',
      "Understand the concept of a derivative as 'rate of change' before memorising rules",
      'Khan Academy calculus is free, self-paced, and covers this entire course',
    ],
  },
  {
    code: 'PHY 121',
    slug: 'phy-121',
    title: 'General Physics II (Electricity & Magnetism)',
    units: 2, level: 100, semester: 2, lh: 30, ph: 0,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Electrostatics, DC circuits, magnetism, and electromagnetic induction. The electromagnetic foundations of this course directly underpin networking, wireless communications, and electronics studied in later years.',
    topics: [
      "Electrostatics: electric charge, Coulomb's law and superposition",
      'Electric field and potential; Gauss\'s law; capacitance; electric dipoles',
      'Conductors, insulators, and energy in electric fields',
      "DC circuits: current, voltage, resistance, Ohm's law, resistor combinations",
      "Magnetic fields: Lorentz force, Biot-Savart and Ampère's laws, magnetic dipoles",
      "Electromagnetic induction: Faraday and Lenz's laws, self and mutual inductance",
      'Transformers and Maxwell\'s equations',
      'Electromagnetic oscillations and waves; AC voltages and currents in inductors, capacitors, and resistors',
    ],
    textbooks: [
      { title: 'University Physics with Modern Physics', authors: 'Young & Freedman', note: '15th ed. Vol. 2 — electricity and magnetism section' },
      { title: 'Fundamentals of Physics', authors: 'Halliday, Resnick & Walker', note: '11th ed. — strong on electromagnetic applications' },
    ],
    searchTerms: [
      'Electricity and magnetism full course Khan Academy',
      'Faraday Lenz law electromagnetic induction explained',
      'AC circuits impedance tutorial',
      'MIT physics 8.02 electricity and magnetism lectures',
    ],
    studyTips: [
      'Connect electricity topics to real circuits: every concept has a practical application',
      'Draw circuit diagrams before applying Kirchhoff\'s laws — never solve blind',
      'AC circuit analysis uses complex numbers from MTH — revise those in parallel',
      'MIT OCW 8.02 Electricity and Magnetism lectures are free and excellent',
    ],
  },
  {
    code: 'PHY 128',
    slug: 'phy-128',
    title: 'General Practical Physics II',
    units: 1, level: 100, semester: 2, lh: 0, ph: 45,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Laboratory practicals continuing from PHY 117, covering the theoretical concepts of PHY 121 through quantitative measurement, treatment of measurement errors, and graphical analysis.',
    topics: [
      'Continuation of quantitative measurement techniques from PHY 117',
      'Treatment of measurement errors',
      'Graphical analysis of experimental data',
      'Electricity and magnetism experiments',
      'Data collection and tabulation of observations',
      'Numerical and graphical analysis, drawing conclusions from data',
      'Preparation and presentation of practical reports',
    ],
    textbooks: [
      { title: 'Practical Physics', authors: 'G.L. Squires', note: '4th ed. — standard lab reference' },
      { title: 'Physics Laboratory Manual', authors: 'Loyd', note: '4th ed. — detailed procedures and analysis guides' },
    ],
    searchTerms: [
      "Ohm's law experiment procedure and results",
      'How to write a physics experiment report',
      "Kirchhoff's laws lab experiment",
      'Electromagnetic induction experiment tutorial',
    ],
    studyTips: [
      'Arrive at every practical knowing the theory — lab demonstrators mark understanding, not just results',
      'Record ALL raw readings in your lab notebook before doing any calculations',
      'Always quote uncertainties with your measurements — it demonstrates scientific rigour',
      'Submit lab reports on time; late submissions lose marks even when the content is perfect',
    ],
  },
  {
    code: 'UUY-CYB 121',
    slug: 'uuy-cyb-121',
    title: 'Introduction to Computer Networks',
    units: 2, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Foundational networking: how data travels across local and wide area networks, the OSI/TCP-IP models, IP addressing and subnetting, routing protocols, and simulation with Packet Tracer. Critical groundwork for network security courses in later years.',
    topics: [
      'Fundamentals of computer networks: LAN/MAN/WAN, Internet, Intranet, Extranet',
      'Network topology, devices, and modes of data transmission',
      'Network architecture: peer-to-peer, client-server, WLAN and IEEE standards',
      'OSI reference model and TCP/IP protocol suite; physical and link layer functionalities',
      'LAN technologies: Ethernet, Token Ring, multiple access schemes (CSMA/CD, CSMA/CA), MAC addressing',
      'Network layer: IP, ARP, ICMP; IPv4 addressing and subnetting; routing protocols (RIP, OSPF, BGP)',
      'Transport layer: UDP and TCP, ports and sockets, connection establishment, flow/congestion control',
      'Application layer protocols (HTTP, FTP, DNS, SMTP, TELNET) and IPv6 transition',
    ],
    textbooks: [
      { title: 'Computer Networks', authors: 'Andrew S. Tanenbaum & David J. Wetherall', note: '5th ed. — the definitive networking textbook' },
      { title: 'CompTIA Network+ Study Guide', authors: 'Todd Lammle', note: '5th ed. — excellent for practical concepts and certification prep' },
    ],
    searchTerms: [
      'OSI model explained in 7 minutes',
      'TCP/IP model vs OSI model comparison',
      'Subnetting explained for beginners',
      'Professor Messer Network+ free course YouTube',
    ],
    studyTips: [
      'Memorise the 7 OSI layers and what happens at each — this appears in every networking exam',
      'Practice subnetting until it is instinctive: it reappears in Network Defense and Security courses',
      'Professor Messer\'s free Network+ course on YouTube is one of the best networking courses available',
      'Use Cisco Packet Tracer (free) to simulate and visualise network configurations hands-on',
    ],
  },
  {
    code: 'UUY-CYB 123',
    slug: 'uuy-cyb-123',
    title: 'Web Authoring and Development',
    units: 2, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Building web pages from scratch: web architecture and the client-server model, HTML structure, CSS styling, JavaScript interactivity, and XML documents. An entry point into web security topics and the front-end layer targeted by many cybersecurity attacks.',
    topics: [
      'Web programming basics: the Internet, WWW, and internet services/protocols',
      'Web application architecture, the network model, and the web development life cycle',
      'HTML: tags and attributes, page structure, lists, tables, and forms',
      'CSS: basics, adding style to HTML, text/font/colour, borders, margin and padding',
      'JavaScript: basics, arithmetic operators, control statements, event handlers',
      'Extensible Markup Language (XML): basics, formatting, viewing, and validating documents',
      'Introduction to web security: XSS, CSRF concepts',
    ],
    textbooks: [
      { title: 'HTML and CSS: Design and Build Websites', authors: 'Jon Duckett', note: 'The most visual and beginner-friendly web book available' },
      { title: 'JavaScript: The Good Parts', authors: 'Douglas Crockford', note: 'Short, essential reading for JavaScript fundamentals' },
    ],
    searchTerms: [
      'freeCodeCamp responsive web design certification free',
      'HTML CSS full course for beginners Traversy Media YouTube',
      'JavaScript DOM manipulation tutorial',
      'How XSS cross-site scripting attacks work',
    ],
    studyTips: [
      'freeCodeCamp Responsive Web Design certification is free and covers exactly this curriculum',
      'Build at least one real web page per week — the only way to learn web development is to build',
      'Inspect real websites using browser DevTools (F12) to see how professional sites are structured',
      'Learn the web security concepts early — XSS and CSRF from this course appear in later security courses',
    ],
    // Transcribed from the departmental Laboratory Manual (printed under the
    // code CSC 121) — see src/data/lectureNotes/cyb123.js for provenance and the
    // coverage mapping. Topic 7 (XSS/CSRF) is not covered by the manual.
    lectureNotes: cyb123LectureNotes,
  },
  {
    code: 'UUY-CYB 122',
    slug: 'uuy-cyb-122',
    title: 'Principles and Practice of Information Security',
    units: 2, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'An introduction to the core principles of information security: operating system protection mechanisms, intrusion detection, formal security models, cryptography and steganography, and the policy/regulatory dimension of protecting information and value across networks.',
    topics: [
      'Operating system protection mechanisms',
      'Intrusion detection systems',
      'Formal models of security',
      'Cryptography and steganography',
      'Network and distributed system security',
      'Transfer of funds/value across networks; electronic voting security',
      'Secure application design',
      'Homeland cybersecurity policy and government regulation of information technology',
    ],
    textbooks: [
      { title: 'Principles of Information Security', authors: 'Michael E. Whitman & Herbert J. Mattord', note: '6th ed. — the standard undergraduate security text' },
      { title: 'CompTIA Security+ Study Guide', authors: 'Mike Chapple & David Seidl', note: '8th ed. — excellent practical coverage, aligns with SY0-601' },
    ],
    searchTerms: [
      'CIA triad information security explained',
      'CompTIA Security+ full course free Professor Messer',
      'Social engineering attacks and prevention',
      'Introduction to information security full course',
    ],
    studyTips: [
      'The CIA triad (Confidentiality, Integrity, Availability) is the lens through which every security concept is understood — internalise it',
      'Read real breach case studies (Troy Hunt\'s blog, Krebs on Security) — they make abstract threats concrete',
      'Professor Messer\'s free Security+ course covers most of this curriculum and is excellent',
      'Social engineering is the most common attack vector — understand human psychology, not just technical controls',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  200 LEVEL — FIRST SEMESTER  (15 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 212',
    slug: 'gst-212',
    title: 'Philosophy, Logic and Human Existence',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'gst',
    crossDepartmental: true,
    description: 'An examination of philosophical reasoning, formal logic, and the human condition. The logic component — syllogism, symbolic logic, and rules of inference — directly supports discrete mathematics and the formal reasoning used in security proofs and algorithm design.',
    topics: [
      'Scope, notions, meanings, branches and problems of philosophy',
      'Logic as an indispensable tool of philosophy',
      'Elements of syllogism and symbolic logic; the first nine rules of inference',
      'Informal fallacies, laws of thought, and the nature of arguments',
      'Valid and invalid arguments; logic of form vs logic of content',
      'Deduction, induction, and inference; creative and critical thinking',
      'Impact of philosophy on human existence and conduct',
      'Philosophy and politics, religion, human values, and character moulding',
    ],
    textbooks: [
      { title: 'Introduction to Logic', authors: 'Irving M. Copi & Carl Cohen', note: '14th ed. — the most used logic text; strong on formal reasoning' },
      { title: 'Philosophy: The Basics', authors: 'Nigel Warburton', note: '5th ed. — readable overview for non-philosophy students' },
    ],
    searchTerms: [
      'Introduction to logic truth tables explained',
      'Propositional logic tutorial for computer science',
      'Logical fallacies complete list with examples',
      'Technology ethics issues AI and privacy',
    ],
    studyTips: [
      'The logic component matters most for your degree — practise truth tables until they are automatic',
      'Logical validity and logical truth are different concepts — do not confuse them in exams',
      'Ethical technology topics (privacy, AI, cybercrime) connect directly to CYB 211 and CYB 213',
      'Argument mapping: writing out premises and conclusions explicitly prevents exam errors',
    ],
  },
  {
    code: 'COS 211',
    slug: 'cos-211',
    title: 'Computer Programming I',
    units: 3, level: 200, semester: 1, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    hasInteractiveModules: true,
    interactiveTrackPath: '/tracks/java',
    interactiveLabel: 'Java',
    interactiveModuleCount: 13,
    description: 'Object-oriented programming in Java: from variables and control flow through full OOP, collections, exception handling, file I/O, and GUI development with Swing. The primary programming course of the degree and the subject most likely to determine your programming competence throughout your career.',
    topics: [
      'Programming paradigms: functional, declarative, logic, and object-oriented',
      'Java syntax: variables, data types, expressions, operators',
      'Control flow: if/else, switch, loops; arrays (1D and 2D)',
      'Methods: parameters, return types, overloading',
      'Classes and objects; abstraction, constructors and encapsulation',
      'Inheritance, polymorphism, and abstract classes; interfaces',
      'Exception handling: try, catch, finally, custom exceptions',
      'Collections API: ArrayList, HashMap, HashSet, Stack, Queue, iterators/enumerators',
      'Strings and string processing; searching, sorting, and recursive algorithms',
      'Event-driven programming: event-handling methods and event propagation',
      'File I/O: reading and writing text files; GUI programming with Java Swing',
      'Basic JDBC: connecting Java to a database',
    ],
    textbooks: [
      { title: 'Introduction to Java Programming and Data Structures', authors: 'Y. Daniel Liang', note: '12th ed. — the course standard at most Nigerian universities' },
      { title: 'Head First Java', authors: 'Kathy Sierra & Bert Bates', note: '3rd ed. — the most beginner-friendly Java book ever written' },
    ],
    searchTerms: [
      'Java programming full course for beginners freeCodeCamp YouTube',
      'Java OOP inheritance polymorphism tutorial',
      'Java exception handling complete guide',
      'Java Swing GUI tutorial beginner',
    ],
    studyTips: [
      'Areté has 13 full interactive modules for this course with live playgrounds and quizzes — use them every day',
      'Type every code example yourself; copying and pasting prevents your brain from building muscle memory',
      'Java OOP is the most exam-critical section — understand inheritance diagrams and method overriding',
      'The AI Tutor on this app can explain any Java concept or debug your code any time',
    ],
  },
  {
    code: 'CYB 211',
    slug: 'cyb-211',
    title: 'Introduction to Cybersecurity and Strategy',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    description: 'A strategic overview of the cybersecurity landscape: basic concepts (confidentiality, integrity, availability, authentication, non-repudiation), security policy and incident response, risk management, and the national/organisational strategies that guide security decision-making at scale.',
    topics: [
      'Basic concepts: cyber, security, CIA, authentication, access control, non-repudiation',
      'Security policies, best current practices, testing, and incident response',
      'Risk management, disaster recovery, and access control',
      'Basic cryptography and software application vulnerabilities; evolution of cyber-attacks',
      'Operating system protection, IDS, formal security models, steganography, DoS/worms/viruses',
      'Transfer of funds/value across networks and electronic voting security',
      'Cybersecurity policy, guidelines, and government regulation of information technology',
      'Main actors of cyberspace; impact on civil/military institutions, privacy, business, government',
      'Ethical obligations of security professionals; standards and frameworks',
    ],
    textbooks: [
      { title: 'Cybersecurity Essentials', authors: 'Charles J. Brooks et al.', note: 'Cisco NetAcad companion; covers fundamentals well' },
      { title: 'The Art of Intrusion', authors: 'Kevin Mitnick', note: 'Engaging real-world case studies that bring strategy to life' },
    ],
    searchTerms: [
      'Cybersecurity kill chain explained',
      'NIST cybersecurity framework overview',
      'Nigeria national cybersecurity policy',
      'Cybersecurity strategy course Coursera free',
    ],
    studyTips: [
      'Follow cybersecurity news (Krebs on Security, The Hacker News) — exam questions often reference current events',
      'Understand the cyber kill chain model deeply — it frames every attack and defence strategy in the field',
      'Nigeria\'s National Cybersecurity Policy is public and freely available — read the executive summary',
      'Link strategic concepts back to technical mechanisms from UUY-CYB 122 to build integrated understanding',
    ],
  },
  {
    code: 'CYB 213',
    slug: 'cyb-213',
    title: 'Cybercrime, Law and Countermeasures',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    description: 'The legal and regulatory landscape of cybercrime: Nigerian cybercrime law, international frameworks, types of cybercrime, investigative procedures, and technical countermeasures. Essential context for any cybersecurity professional.',
    topics: [
      'Definition, types and categories of cybercrime; threats to national critical infrastructure',
      'Investigation process and procedure for cybercrime; strategies of perpetrators and prevention',
      'Technical aspects of cybercrime investigations; attacks and defences used by terrorists and criminals',
      'Use of online social networks in cybercrime investigation',
      'Computer and network forensics: concepts, trends, and methods',
      'Digital evidence collection and evaluation',
      'Legal issues, international jurisdiction, and privacy issues',
      'Cyber law application internationally: Europe, North/South America, Asia',
      'The cyber law framework in Nigeria (Cybercrime Act 2015, EFCC); challenges and opportunities for enforcement',
    ],
    textbooks: [
      { title: 'Cybercrime and the Law', authors: 'Susan W. Brenner', note: 'Comprehensive and widely cited in the field' },
      { title: 'Cybercrime: An Introduction to an Emerging Phenomenon', authors: 'Joseph F. Donnermeyer', note: 'Good sociological perspective alongside legal coverage' },
    ],
    searchTerms: [
      'Nigeria Cybercrime Act 2015 full text PDF',
      'Budapest Convention on Cybercrime explained',
      'Cybercrime law tutorial for students',
      'EFCC cybercrime Nigeria prosecutions',
    ],
    studyTips: [
      'Download and read the actual Nigeria Cybercrime Act 2015 — it is short and publicly available',
      'Case studies of Nigerian cybercrime prosecution are in EFCC press releases — use them in exam answers',
      'Distinguish clearly between cybercrime as a tool, as a target, and as an environment',
      'Link every legal concept to a technical mechanism: knowing both sides earns the best marks',
    ],
  },
  {
    code: 'SEN 211',
    slug: 'sen-211',
    title: 'Introduction to Software Engineering',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'sen',
    description: 'The principles and practices of building software systematically: software development lifecycle models, requirements engineering, system design, testing, and project management. Context for how secure software is planned and built.',
    topics: [
      'Software engineering concepts, principles, and its place as a computing discipline',
      'Software processes: lifecycle and process models, process assessment and metrics',
      'Software requirements, specifications, design, and architecture',
      'Software quality, testing, and validation',
      'Software evolution: maintenance, re-engineering, legacy systems, and software reuse',
      'Software project management: team management, scheduling, estimation, risk analysis',
      'Software quality assurance and configuration management',
      'Version control with Git and GitHub',
      'Software engineering and law; secure software development lifecycle',
    ],
    textbooks: [
      { title: 'Software Engineering', authors: 'Ian Sommerville', note: '10th ed. — the global standard software engineering text' },
      { title: 'Clean Code', authors: 'Robert C. Martin', note: 'Excellent companion for writing maintainable, quality code' },
    ],
    searchTerms: [
      'Software engineering full course Ian Sommerville',
      'UML diagrams tutorial for beginners',
      'Git and GitHub tutorial for beginners',
      'Agile software development explained',
    ],
    studyTips: [
      'Learn Git now — it is used for every programming project in years 3 and 4',
      'UML diagrams appear heavily in exams: practise class and sequence diagrams until they are fast to draw',
      'Relate SDLC models to the projects you build in COS 211 — theory becomes concrete immediately',
      'The Secure SDLC section links directly to your cybersecurity courses — connect them explicitly',
    ],
  },
  {
    code: 'UUY-CYB 214',
    slug: 'uuy-cyb-214',
    title: 'Fundamentals of IoT',
    units: 2, level: 200, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'The architecture, protocols, market segments, and security challenges of the Internet of Things. Covers sensing/actuation, cloud data collection and analysis, smart-city and industrial use cases, and the unique vulnerabilities of IoT devices — a rapidly growing attack surface.',
    topics: [
      'Internet of Things (IoT): market segments, examples, and the IoT value stack',
      'IoT data collection: sensing and actuation',
      'IoT data collection, aggregation, analysis, and visualization in the cloud',
      'Smart products and high-resolution data',
      'Technology and protocols for IoT communication and networking; machine-to-machine communication',
      'Driving technologies for smart cities, smart transportation, Industry 4.0, and digital health',
      'Opportunities, possibilities, challenges, security, and privacy of IoT',
      'IoT specializations: industrial, medical/healthcare, automotive, energy/utilities, and blockchain-based IoT',
    ],
    textbooks: [
      { title: 'Internet of Things: A Hands-On Approach', authors: 'Arshdeep Bahga & Vijay Madisetti', note: '2nd ed. — practical and covers security well' },
      { title: 'Practical Internet of Things Security', authors: 'Brian Russell & Drew Van Duren', note: '2nd ed. — security-focused; directly relevant to your degree' },
    ],
    searchTerms: [
      'IoT architecture layers explained',
      'MQTT protocol tutorial for beginners',
      'OWASP IoT Top 10 vulnerabilities explained',
      'Arduino Raspberry Pi IoT security project',
    ],
    studyTips: [
      'OWASP IoT Top 10 is a free, authoritative list of IoT vulnerabilities — read it fully',
      'If you can access an Arduino or Raspberry Pi, build a simple sensor project to make concepts tangible',
      'IoT security connects to network security, cryptography, and embedded systems — build cross-course links',
      'Real-world IoT breaches (Mirai botnet, industrial ICS attacks) make the best exam examples',
    ],
  },
  {
    code: 'UUY-CYB 212',
    slug: 'uuy-cyb-212',
    title: 'Ethical Hacking Fundamentals',
    units: 2, level: 200, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'An introduction to offensive security thinking: information security fundamentals, the hacking cycle, and countermeasures across passwords, social engineering, networks, web/mobile/IoT applications, wireless, and the cloud. Covers the legal/ethical framework under which penetration testing operates.',
    topics: [
      'Information security fundamentals; threats and vulnerabilities',
      'Stages of the hacking cycle',
      'Password cracking techniques and countermeasures',
      'Social engineering techniques and countermeasures',
      'Network-level attacks and countermeasures',
      'Web application attacks and countermeasures (OWASP Top 10)',
      'Wireless, mobile, and IoT attacks and countermeasures',
      'Cloud computing threats and countermeasures',
      'Penetration testing fundamentals',
    ],
    textbooks: [
      { title: 'The Web Application Hacker\'s Handbook', authors: 'Stuttard & Pinto', note: '2nd ed. — the definitive web hacking reference' },
      { title: 'Penetration Testing', authors: 'Georgia Weidman', note: 'Hands-on, practical, and very readable for beginners' },
    ],
    searchTerms: [
      'Ethical hacking full course free TryHackMe',
      'Nmap tutorial for beginners',
      'OWASP Top 10 vulnerabilities 2023 explained',
      'Penetration testing methodology step by step',
    ],
    studyTips: [
      'TryHackMe.com has free beginner "learning paths" that cover exactly this curriculum hands-on',
      'Every technique must be practised only on systems you own or have explicit written permission to test',
      'Understand OWASP Top 10 deeply — it is the foundation of web application security in later courses',
      'A good pen test report is as important as the test itself: practise clear, structured writing',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  200 LEVEL — SECOND SEMESTER  (16 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'ENT 221',
    slug: 'ent-221',
    title: 'Entrepreneurship and Innovation',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'ent',
    crossDepartmental: true,
    description: 'Business thinking for technical students: entrepreneurship and intrapreneurship theory, entrepreneurial characteristics and thinking, innovation, enterprise formation, and e-commerce principles. Directly applicable to cybersecurity consulting, startup, and freelance careers.',
    topics: [
      'Concept of entrepreneurship and intrapreneurship/corporate entrepreneurship',
      'Theories, rationale and relevance: Schumpeterian perspective, risk-taking, creative destruction',
      'Characteristics of entrepreneurs: opportunity seeker, risk taker, innovator',
      'Entrepreneurial thinking: critical, reflective, and creative thinking',
      'Innovation: concept, dimensions, and its relationship to knowledge and change',
      'Enterprise formation, partnership and networking: business plans, ownership forms, registration',
      'Contemporary entrepreneurship issues: intellectual property, virtual office, networking',
      'Entrepreneurship in Nigeria: youth/women entrepreneurship, support institutions, barriers',
      'Basic principles of e-commerce',
    ],
    textbooks: [
      { title: 'Entrepreneurship: Successfully Launching New Ventures', authors: 'Barringer & Ireland', note: '6th ed. — used across most Nigerian universities' },
      { title: 'The Lean Startup', authors: 'Eric Ries', note: 'The most influential startup methodology book of the last decade' },
    ],
    searchTerms: [
      'Business model canvas explained',
      'How to start a cybersecurity consulting business',
      'Entrepreneurship course for university students free',
      'How to write a feasibility study',
    ],
    studyTips: [
      'Apply every concept to a cybersecurity business idea — it makes abstract topics concrete and exam-ready',
      'The Business Model Canvas is the most exam-critical framework — practise filling it in for different scenarios',
      'Nigeria\'s NITDA and other agencies offer technology grants — research them as part of your learning',
      'This course matters for your career: many cybersecurity professionals eventually consult or freelance',
    ],
    lectureNotes: [
      {
        number: '1',
        title: 'The Concept of Entrepreneurship',
        sections: [
          {
            type: 'text',
            text: 'Authors: Prof. Ntiedo J. Umoren and Sunday S. Akpan, Ph.D',
          },
          {
            type: 'definition',
            heading: '1.1 Introduction',
            text: "The concept of entrepreneurship has evolved over several centuries, reflecting the changing nature of economic activity and the role of individuals in driving innovation and growth. Historically, the term \"entrepreneur\" originated from the French word \"entreprendre,\" which means \"to undertake.\" In the early 18th century, the term was used to describe individuals who undertook the risk of new enterprise. Over time, the definition of entrepreneurship has expanded to encompass a wide range of activities, from starting small businesses to leading large-scale innovations in established corporations. Entrepreneurship is often associated with the creation of new ventures, but it also involves the identification and exploitation of opportunities within existing organizations. This broader perspective recognizes that entrepreneurial activity can take many forms and occur in diverse contexts. Whether it's a solo entrepreneur starting a tech company or a corporate manager spearheading a new product line, the essence of entrepreneurship lies in the ability to recognize value and take the necessary steps to realize it. In today's rapidly changing global economy, entrepreneurship is more important than ever. It is a key driver of economic development, job creation, and social change. By challenging the status quo and introducing new ideas, entrepreneurs play a vital role in shaping the future. This chapter explores the fundamental concepts of entrepreneurship, including the characteristics of entrepreneurs, the different types of entrepreneurial activity, and the challenges and opportunities associated with this dynamic field.",
          },
          {
            type: 'definition',
            heading: '1.2 Who is an “Entrepreneur?”',
            text: 'An entrepreneur is an individual who identifies an opportunity and organizes the necessary resources to exploit it. This definition highlights two key aspects of entrepreneurship: opportunity recognition and resource mobilization. Entrepreneurs are often seen as risk-takers, as they are willing to invest their time, money, and effort into ventures with uncertain outcomes. However, successful entrepreneurs are also adept at managing and mitigating risk through careful planning and strategic decision-making. The characteristics of entrepreneurs have been a subject of much study and debate. While there is no single "entrepreneurial personality," several traits are commonly associated with successful entrepreneurs. These include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Creativity and Innovation', def: 'The ability to think outside the box and develop new solutions to problems.' },
              { term: 'Resilience and Perseverance', def: 'The capacity to bounce back from failure and keep going in the face of obstacles.' },
              { term: 'Self-Confidence', def: "A strong belief in one's abilities and the value of one's ideas." },
              { term: 'Vision', def: 'The ability to see the big picture and anticipate future trends.' },
              { term: 'Need for Achievement', def: "A strong drive to succeed and reach one's goals." },
            ],
          },
          {
            type: 'text',
            text: 'In addition to these personal traits, entrepreneurs also possess a unique set of skills, such as leadership, communication, and problem-solving. These skills enable them to build and lead teams, attract investors, and navigate the complexities of the business world. Ultimately, an entrepreneur is someone who is not afraid to take the lead and make things happen.',
          },
          {
            type: 'definition',
            heading: '1.3 The Concept and Meaning of Entrepreneurship',
            text: 'Entrepreneurship is a multifaceted concept that can be understood from various perspectives. At its core, it is the process of creating value by bringing together a unique package of resources to exploit an opportunity. This process involves several stages, from the initial spark of an idea to the successful launch and growth of a venture.',
          },
          {
            type: 'text',
            text: 'One way to think about entrepreneurship is as a mindset. This mindset is characterized by a proactive and innovative approach to problem-solving and a willingness to embrace change. It involves looking at the world through a lens of opportunity rather than limitation. This entrepreneurial mindset is not limited to those who start their own businesses; it can also be found in individuals working within established organizations, non-profits, and government agencies.',
          },
          {
            type: 'text',
            text: 'Another perspective on entrepreneurship focuses on the economic role of the entrepreneur. In this view, entrepreneurs are seen as "agents of change" who drive economic growth by introducing new products, services, and processes. By challenging existing markets and creating new ones, they foster competition and innovation, which ultimately benefits consumers and society as a whole. This economic perspective highlights the importance of entrepreneurship in promoting efficiency and progress.',
          },
          {
            type: 'text',
            text: "Entrepreneurship can also be seen as a social process. It involves building relationships and networks, and it often has a significant impact on communities and society. Social entrepreneurship, in particular, focuses on using entrepreneurial principles to solve social and environmental problems. Whether it's providing clean water to rural communities or developing sustainable energy solutions, social entrepreneurs are driven by a desire to make a positive difference in the world.",
          },
          {
            type: 'definition',
            heading: '1.4 The Concept of Intrapreneurship',
            text: 'Intrapreneurship, also known as corporate entrepreneurship, refers to the practice of fostering an entrepreneurial mindset and behaviors within an established organization. It involves encouraging employees to think and act like entrepreneurs, identifying and pursuing new opportunities that can drive growth and innovation for the company. Intrapreneurs are individuals who take the initiative to develop new products, services, or processes within the context of their existing jobs.',
          },
          {
            type: 'text',
            text: 'The concept of intrapreneurship recognizes that large organizations can often become bureaucratic and resistant to change. By empowering employees to be intrapreneurial, companies can tap into the creativity and talent of their workforce and stay competitive in a rapidly changing market. Intrapreneurship can take many forms, from formal innovation programs to more informal efforts to encourage employee-led initiatives.',
          },
          {
            type: 'text',
            text: 'Successful intrapreneurship requires a supportive organizational culture that values innovation and risk-taking. This involves providing employees with the resources, autonomy, and incentives they need to pursue new ideas. It also requires a willingness on the part of management to embrace failure as a learning opportunity and to support projects that may not have immediate or certain outcomes. By fostering an intrapreneurial environment, companies can create a more dynamic and resilient organization that is better equipped to navigate the challenges of the future.',
          },
          {
            type: 'definition',
            heading: '1.5 Corporate Entrepreneurship Defined',
            text: "Corporate entrepreneurship is a broad term that encompasses a variety of activities aimed at fostering innovation and growth within an established firm. It can be defined as the process by which teams within an established company conceive, foster, launch and manage a new business that is distinct from the parent company but leverages the parent's assets, market position, capabilities or other resources. There are several different types of corporate entrepreneurship, including:",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Corporate Venturing', def: 'This involves the creation of new businesses by an established firm. This can be done through internal corporate venturing, where the new business is developed within the company, or external corporate venturing, where the company invests in or partners with outside startups.' },
              { term: 'Strategic Entrepreneurship', def: "This refers to a firm's efforts to achieve creativity and innovation in its strategic areas, such as its business model, product services, or served markets. It involves using entrepreneurial thinking to gain a competitive advantage and drive long-term growth." },
            ],
          },
          {
            type: 'text',
            text: "Corporate entrepreneurship is not just about starting new businesses; it's also about transforming the existing organization. It involves challenging the status quo and introducing new ways of thinking and acting throughout the company. By embracing corporate entrepreneurship, firms can become more agile, innovative, and better able to respond to the changing needs of their customers and the market.",
          },
          {
            type: 'definition',
            heading: '1.6 Entrepreneurial Mindset and Behaviours',
            text: 'It is not a big idea alone that paves the path to ultimate entrepreneurial success; the mindset and behaviour of the "would-be" entrepreneur plays a crucial role. Entrepreneurs are often seen as innovators, risk-takers, and visionaries who create value and solve problems in the world, but what makes them different from other people and how they think and act in ways that enable them to achieve their goals lies in their mindset, which is a set of beliefs, attitudes, and habits that shape their behavior and influence their actions. In other words, entrepreneurial mindset encompasses a unique set of attitudes and behaviors that drive individuals to innovate, take risks, and create opportunities. This mindset is characterized by a strong desire to solve problems, think creatively, and constantly seek new challenges.',
          },
          {
            type: 'text',
            text: 'Thus, entrepreneurial mindset is a combination of creativity, resilience, and a relentless drive to succeed. The entrepreneurial mindset is unique in that one must be creative, communicative, and highly motivated to succeed, yet open to risk and failure. Opportunity recognition, self-efficacy, proactivity, resourcefulness and value creation constitute the basic aspects of entrepreneurial mindset. Having an entrepreneurial mindset is not only essential for starting and growing a business, but also for personal and professional development in any field or context. This mindset is not limited to starting a business; it can be applied in various contexts, including within established organizations, non-profits, or personal projects.',
          },
          {
            type: 'text',
            text: 'Entrepreneurial behaviors refer to the actions and characteristics exhibited by individuals who are venturing into new business opportunities. These behaviors include a high level of risk-taking, creativity, innovation, leadership, and persistence. Moreover, entrepreneurial behaviors also involve strong networking skills, adaptability, and a willingness to learn from failures. Building a successful business often requires forming strong relationships with other industry professionals, potential clients, and investors. Entrepreneurs must be able to adapt to changing market conditions and consumer preferences in order to stay competitive and relevant.',
          },
          {
            type: 'definition',
            heading: '1.7 Challenges in Developing an Entrepreneurial Mindset',
            text: 'The mind is often regarded as the most powerful attribute and weapon every human has. Whatever we become is always attributed to the state of our mind. Thus, developing an enterprise is chiefly a function of the state of our mind and that is where the battle for life and success began. Here, few of the challenges and how entrepreneurial mindset can be developed:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Overcoming the Fear of Failure', def: 'One of the primary hurdles to fostering an entrepreneurial mindset is surmounting the fear of failure. Many individuals shy away from taking risks and initiating their ventures due to concerns about potential negative consequences. Overcoming this fear requires a shift in perspective, recognizing failures as valuable learning experiences that contribute to personal and professional growth.' },
              { term: 'Cultivating Self-Confidence', def: 'Entrepreneurs must possess unwavering self-confidence in their abilities to navigate the uncertainties of the business world. A lack of self-confidence can impede decision-making processes and create obstacles to pursuing new opportunities. Cultivating self-confidence involves recognizing strengths, acknowledging achievements, and embracing challenges as opportunities for skill development.' },
              { term: 'Embracing Change', def: 'Entrepreneurship is synonymous with change, innovation, and continuous learning. Those resistant to change may find it challenging to adapt to new situations and acquire the necessary skills for success. Embracing change involves fostering a mindset that welcomes innovation, values adaptability, and views challenges as catalysts for growth.' },
              { term: 'Managing Uncertainty', def: 'The inherent uncertainty of entrepreneurship makes decision-making challenging without knowing the outcome. Developing a tolerance for uncertainty is crucial, requiring the ability to make informed decisions despite limited information. Entrepreneurial individuals must hone skills in risk assessment, strategic planning, and adapting to unforeseen circumstances.' },
              { term: 'Financial Stability Concerns', def: 'Commencing a new venture often involves financial risks, and the apprehension of financial instability can hinder the development of an entrepreneurial mindset. Mitigating these concerns involves careful financial planning, risk assessment, and a strategic approach to resource allocation. Developing financial literacy is integral to navigating the entrepreneurial landscape with confidence.' },
              { term: 'Building a Supportive Ecosystem', def: 'Entrepreneurs thrive in supportive environments with access to resources like funding, mentorship, and networking opportunities. The absence of such support can hinder the development of necessary skills and knowledge for success. Building a robust support network involves seeking mentorship, engaging in networking activities, and accessing resources that foster entrepreneurial growth.' },
              { term: 'Balancing Work and Life', def: 'Entrepreneurs often grapple with long working hours and challenges in maintaining a healthy work-life balance. Managing personal well-being and relationships while pursuing a new venture requires intentional efforts to prioritize self-care, set boundaries, and cultivate resilience amidst the demands of entrepreneurship.' },
              { term: 'Resilience to Criticism and Rejection', def: 'Entrepreneurs frequently encounter criticism, rejection, and skepticism from others. Developing resilience and the ability to persevere despite criticism is crucial for success. Fortifying mental strength involves reframing criticism as constructive feedback, learning from setbacks, and maintaining a steadfast focus on long-term goals.' },
              { term: 'Sustaining Motivation and Perseverance', def: 'The entrepreneurial journey is a protracted and challenging endeavor. Sustaining motivation, focus, and perseverance is vital, especially during setbacks and obstacles. Entrepreneurs must cultivate a resilient mindset, set achievable milestones, and celebrate small victories to stay motivated on the path to long-term success.' },
              { term: 'Fostering Creative and Innovative Thinking', def: 'Entrepreneurship demands creative problem-solving and innovative thinking. Developing these skills can be challenging, particularly for individuals with traditional educational or professional backgrounds. Fostering creative thinking involves embracing curiosity, experimenting with diverse perspectives, and fostering an environment that encourages unconventional ideas and solutions.' },
            ],
          },
          {
            type: 'definition',
            heading: '1.8 Rationale and Relevance of Entrepreneurship',
            text: 'Entrepreneurship as we see has to do with the persistent of opportunity to create wealth through innovative creation of product or service that meets a need of customers, using scarce resources in any way that result in enterprise development and growth which satisfies the expectation of stakeholders whose roles sustain the business. It is therefore a process which involves a vision of a future state regarding an idea, product or service. This process has played vital roles in the economic development of any nation, amongst which are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Creation of Employment', def: 'It has been pointed out at various times and with varying degrees of emphasis that entrepreneurship creates employment for the teaming population of any nation. In Nigeria, for instance, it is documented that small and medium scale business, the catalyst of entrepreneurship employs about 30% of the entire labour force (Acquah, 1986).' },
              { term: 'Transformation of Traditional Industry', def: "Entrepreneurial activities help to transform the traditional sector thereby helping in the economic development of a nation. In one respect, it helps in modernizing the people's perception of life, and in another, it modernizes the traditional handicraft prevalent in the rural economies, by introducing the use of anarchies instead of manual labour in most economics. Again, the skills of traditional craftsmen are modernized and synchronized with the developments in entrepreneurial activities." },
              { term: 'Utilization of Resources', def: 'Entrepreneurship helps to mobilize resources that would otherwise remain idle in the lands of people and employ them productively. By so doing, capital formation which is a vital engine of economic growth is encouraged.' },
              { term: 'Better Standard of Living', def: "As a result of their numerous economic activities, entrepreneurship activities make large quantities of goods and services available to people. With increased supply of goods and services individual's demands increase as well. This increase in demand, in turn, results in a better standard of living for the people." },
              { term: 'Rural-Urban Migration', def: 'Majority of the small business, which constitute the bedrock for entrepreneurship are found in the rural areas- Nigeria is still a rural economy. By providing employment for the rural population, these business enterprises reduce the incidence of urban migration, thereby, thereby enhancing the economic growth of such rural areas.' },
              { term: 'Innovation', def: 'Unless there are individuals who are willing to assume the risks of introducing new techniques of production, there would be no major breakthrough in technological development. This can be made possible through the activities in entrepreneurial pursuits. These individuals (entrepreneurs) provide the major sources of new ideas and inventions which result in the production of quality goods and services which are needed to improve the standard of living of the citizenry. This in turn enhances the economic growth and development of such nation.' },
            ],
          },
          {
            type: 'definition',
            heading: '1.9 Summary and Conclusion',
            text: 'The concept of entrepreneurship has evolved significantly, yet its definition remains a topic of scholarly debate. From this chapter, the essence of entrepreneurship can be distilled into a simpler framework focused on the development and validation of ideas. This perspective highlights the importance of opportunity recognition and innovation, proposing a coherent understanding that separates entrepreneurship from management practices. The multifaceted nature of entrepreneurship encompasses both positive contributions to economic growth and potential negative societal impacts, revealing its complex role in contemporary economies. Similarly, the concept of intrapreneurship, corporate entrepreneurship, entrepreneurial mindset and behaviours, challenges in developing an entrepreneurial mindset, rationale and relevance of entrepreneurship have all been discussed in this chapter. By emphasizing these fundamental elements, the definition of entrepreneurship presented above and other conceptual definitions / explanations allows for a more accessible approach to understanding entrepreneurial activities. As scholars continue to explore this dynamic field, it is essential to consider both individual skills and broader environmental factors that shape entrepreneurial success.',
          },
        ],
      },
      {
        number: '2',
        title: 'Classification and Biographical Study of Entrepreneur',
        sections: [
          {
            type: 'text',
            text: 'Authors: Prof. Essien E. Akpanuko and Ekwere R. Enang, Ph.D',
          },
          {
            type: 'definition',
            heading: '2.1 Introduction',
            text: 'The study of entrepreneurship involves understanding the diverse ways in which individuals identify and exploit opportunities. This chapter focuses on the classification of entrepreneurs and the biographical study of their characteristics. By categorizing entrepreneurs based on various criteria, we can gain a deeper understanding of the different types of entrepreneurial activity and the factors that contribute to their success. Classification of entrepreneurs is essential for several reasons. First, it helps researchers and policymakers to identify and support different types of entrepreneurial ventures. Second, it provides a framework for understanding the diverse motivations and characteristics of entrepreneurs. Finally, it enables us to analyze the impact of different types of entrepreneurship on economic growth and development. The biographical study of entrepreneurs involves examining their backgrounds, experiences, and personal traits. This approach recognizes that the individual entrepreneur is at the heart of the entrepreneurial process. By studying the lives and careers of successful entrepreneurs, we can identify common patterns and insights that can inform our understanding of entrepreneurship more broadly.',
          },
          {
            type: 'text',
            heading: '2.2 Classification and Types of Entrepreneurships',
            text: 'Entrepreneurs can be classified into several different types based on various criteria, such as their motivation, level of innovation, and the scale of their operations. These classifications are not mutually exclusive, and many entrepreneurs may fall into multiple categories.',
          },
          {
            type: 'text',
            heading: '2.2.1 Clarence Danhof Classifications',
            text: 'Clarence Danhof (1949) classified entrepreneurs into four categories based on their level of innovation and willingness to embrace change:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Innovating Entrepreneurs', def: 'These are individuals who introduce new products, services, or processes to the market. They are often seen as the "true" entrepreneurs, as they drive economic growth and progress through their creativity and vision.' },
              { term: 'Imitative (Adoptive) Entrepreneurs', def: 'These individuals do not innovate themselves but instead adopt and adapt successful innovations from others. They play an important role in spreading innovation and increasing competition in the market.' },
              { term: 'Fabian Entrepreneurs', def: 'These individuals are cautious and skeptical of change. They only adopt new innovations when they are forced to do so by market pressure or when the success of the innovation has been clearly demonstrated by others.' },
              { term: 'Drone Entrepreneurs', def: 'These individuals are resistant to change and refuse to adopt new innovations, even when they are facing significant challenges or competition. They are often associated with traditional or declining industries.' },
            ],
          },
          {
            type: 'text',
            heading: '2.2.2 Classification by Arthur H. Cole',
            text: 'Arthur H. Cole classified entrepreneurs based on their role in the economy:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Empirical Entrepreneurs', def: 'These individuals rely on their experience and intuition to make decisions. They are often found in traditional or small-scale businesses.' },
              { term: 'Rational Entrepreneurs', def: 'These individuals use formal analysis and planning to make decisions. They are more likely to be found in larger or more complex organizations.' },
              { term: 'Cognitive Entrepreneurs', def: 'These individuals are driven by their vision and their ability to recognize and exploit new opportunities. They are the primary drivers of innovation and change in the economy.' },
            ],
          },
          {
            type: 'text',
            heading: '2.2.3 Classification by Naidu and Rao (2008)',
            text: 'Naidu and Rao (2008) provided several classifications based on different dimensions:',
          },
          {
            type: 'termlist',
            heading: 'Motivational Classification',
            items: [
              { term: 'First-generation entrepreneur', def: 'Starts from scratch without family business background.' },
              { term: 'Self-actualizer entrepreneurs', def: 'Driven by the desire for autonomy and personal fulfillment.' },
              { term: 'Dissatisfied entrepreneurs', def: 'Start a business because they are unhappy with their previous employment.' },
              { term: 'Family business entrepreneurs', def: "Inherit and develop their family's business." },
            ],
          },
          {
            type: 'termlist',
            heading: 'Classification Based on Entrepreneurial Experience',
            items: [
              { term: 'Novice Entrepreneurs', def: 'Individuals with no prior business ownership experience.' },
              { term: 'Habitual Entrepreneurs', def: 'Individuals who have owned at least two or more separate businesses at the same time.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Classification Based on Technical Experience',
            items: [
              { term: '"Research" Technical entrepreneur', def: 'Has prior expertise in technological research.' },
              { term: '"Producer" technological entrepreneur', def: 'Has a background in direct commercial production.' },
              { term: '"User" technical entrepreneur', def: 'Has experience as an end user of the relevant product/technology.' },
              { term: '"Opportunist" technical entrepreneur', def: 'Has found and imagined a technology-based opportunity and seized it.' },
            ],
          },
          {
            type: 'termlist',
            heading: '2.2.4 Classification Based on Ownership',
            items: [
              { term: 'Private entrepreneurship', def: 'Independent entrepreneurs engaging in business where the entrepreneurial process is dominant. These are often small, simple, and economical to set up, motivated by profit.' },
              { term: 'Public entrepreneurship', def: 'In developing countries, the government may take the initiative in businesses, leading to government-linked corporations (GLCs) or state-owned firms. Popular examples include State Economic Development Corporations (SEDCs).' },
            ],
          },
          {
            type: 'termlist',
            heading: '2.3.5 Classification Based on Scale of Enterprise',
            items: [
              { term: 'Small scale entrepreneurship', def: 'Particularly popular in developing nations. Small business owners often face obstacles such as maintaining consistent cash balance, balancing family time, keeping up with trends, and brand management.' },
              { term: 'Scalable startup', def: 'Rarer but garner significant media interest. These begin on a small scale as the "germ" of an idea and are nurtured and scaled up, often with venture funding.' },
              { term: 'A big corporation', def: 'Entrepreneurs can function within larger, existing organizations to expand into new consumer segments and broaden the scope of a well-established enterprise.' },
            ],
          },
          {
            type: 'text',
            heading: '2.3.6 New Entrepreneurial Classifications',
            text: 'In recent years, various new classifications have emerged:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Solo entrepreneurs', def: 'Prefer to start and run their businesses on their own, providing their own cash and skills.' },
              { term: 'Active partners', def: 'Entrepreneurs who work together by pooling their resources and participating in daily operations.' },
              { term: 'Inventors', def: 'Involved mostly in R&D, having a creative personality for developing new goods and technologies.' },
              { term: 'Challengers', def: 'Take on obstacles to develop a commercial enterprise as a symbol of success.' },
              { term: 'Buyers (entrepreneurs)', def: 'Look for possibilities to acquire existing units that may be seized or are in working condition, using their knowledge to repair them.' },
              { term: 'Life timers', def: 'Think of business as an integral part of their lives, driven by a strong desire to take personal responsibility.' },
            ],
          },
          {
            type: 'definition',
            heading: '2.4 Biographical Study of Entrepreneurs',
            text: 'This addresses the characteristics or attributes of an entrepreneur from sociological, psychological, and economic perspectives. Key traits include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Self Confidence', def: 'High internal locus of control; believing in oneself rather than fate.' },
              { term: 'Risk Taking Ability', def: 'Propelled by the idea that higher risk often leads to higher profit.' },
              { term: 'Task (Result) Oriented', def: 'Setting clear and measurable goals with persistence and determination.' },
              { term: 'Leadership', def: 'Important for successful discharge of duties; not being too rigid or dogmatic.' },
              { term: 'Future Oriented (Visionary)', def: 'Possessing foresight and perception of the future.' },
              { term: 'Creativity (Innovative Behaviour)', def: 'Making the business outlive the entrepreneur through flexible changes.' },
              { term: 'Originality (Uniqueness)', def: 'Being original in thoughts and innovations rather than merely copying.' },
              { term: 'Need for Achievement', def: "Driven by the psychologist David C. McClelland's theory of \"acquired need.\"" },
              { term: 'Drive and Energy', def: 'Ability to handle complex and demanding entrepreneurial jobs.' },
              { term: 'Taking Initiative (Conceptual Ability)', def: "Being one's own boss and taking initiatives as needs arise." },
              { term: 'Long-term Involvement', def: 'Setting eyes on tomorrow to build a business that outlives them.' },
              { term: 'Deviant Behaviour', def: "A high propensity to leave other's employment to open their own business." },
              { term: 'Taking Personal Responsibility', def: "Assuming control for one's own decisions and actions." },
            ],
          },
          {
            type: 'definition',
            heading: '2.5 Summary and Conclusion',
            text: 'Classification of entrepreneurs can be done based on various criteria such as motivation, level of innovation, scale of operation, and industry focus. By categorizing entrepreneurs based on these criteria, researchers and policymakers can better understand the diverse motivations and characteristics that drive entrepreneurial activity. Biographical study of entrepreneurs involves examining their backgrounds, experiences, and personal traits that have shaped their entrepreneurial journey. By studying the biographies of successful entrepreneurs, researchers can gain insights into the factors that contribute to entrepreneurial success, such as passion, resilience, and resourcefulness.',
          },
        ],
      },
      {
        number: '3',
        title: 'Barriers and Critical Success Factors in Entrepreneurship',
        sections: [
          {
            type: 'text',
            text: 'Authors: Akpan J. Williams, Ph.D and Uduakobong A. Inyang, Ph.D',
          },
          {
            type: 'definition',
            heading: '3.1 Introduction',
            text: 'Entrepreneurship is often hailed as the engine of economic growth, driving innovation, creating jobs, and fostering competition. However, the path to successful entrepreneurship is fraught with challenges and obstacles. This chapter explores the various barriers that entrepreneurs face and the critical success factors that can help them overcome these challenges and achieve their goals. Understanding these barriers is essential for aspiring entrepreneurs, policymakers, and support organizations. By identifying the common pitfalls and hurdles, stakeholders can develop strategies to mitigate risks and create a more conducive environment for entrepreneurial activity. Similarly, identifying the critical success factors provides a roadmap for entrepreneurs to build resilient and sustainable businesses.',
          },
          {
            type: 'definition',
            heading: '3.2 General Barriers to Entrepreneurship',
            text: "Entrepreneurs face a wide range of general barriers that can impede their progress at various stages of the entrepreneurial process. These barriers can be internal, related to the entrepreneur's own characteristics and skills, or external, related to the economic, social, and political environment. Some of the most common general barriers include:",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Lack of Access to Finance', def: 'Securing adequate funding is one of the most significant challenges for entrepreneurs. Many struggle to obtain loans from traditional financial institutions due to a lack of collateral or a proven track record.' },
              { term: 'Inadequate Infrastructure', def: 'Poor infrastructure, such as unreliable power supply, inadequate transportation networks, and limited access to high-speed internet, can significantly increase the cost of doing business and hinder growth.' },
              { term: 'Bureaucratic Red Tape', def: 'Complex and time-consuming administrative procedures for business registration, licensing, and taxation can deter potential entrepreneurs and stifle innovation.' },
              { term: 'Lack of Skilled Labour', def: 'Finding and retaining employees with the necessary skills and expertise can be a major challenge, particularly in specialized or high-tech industries.' },
              { term: 'Market Competition', def: 'Entrepreneurs must navigate intense competition from established firms and other startups. Gaining market share and building brand loyalty can be difficult and costly.' },
            ],
          },
          {
            type: 'definition',
            heading: '3.3 Cultural Barriers to Entrepreneurship',
            text: 'Cultural factors play a significant role in shaping entrepreneurial attitudes and behaviors. In some societies, cultural norms and values may discourage risk-taking and innovation, making it difficult for entrepreneurs to gain support and recognition. Common cultural barriers include:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Fear of Failure', def: 'In cultures where failure is stigmatized, individuals may be less likely to take the risks associated with starting a new business.' },
              { term: 'Preference for Stability', def: 'Some cultures place a high value on stable, long-term employment, which can discourage individuals from pursuing entrepreneurial ventures.' },
              { term: 'Social Norms and Expectations', def: 'Traditional social norms may dictate certain career paths or roles, which can limit the opportunities available to certain groups, such as women or young people.' },
              { term: 'Lack of Role Models', def: 'A lack of successful entrepreneurial role models in a community can make it difficult for aspiring entrepreneurs to envision themselves as successful business owners.' },
            ],
          },
          {
            type: 'text',
            heading: '3.3.1 Strategies for Overcoming Cultural Barriers',
            text: 'Overcoming cultural barriers to entrepreneurship requires a shift in mindset and a concerted effort to challenge and change cultural norms and attitudes towards entrepreneurship. This can be achieved through education, awareness-raising campaigns, and the creation of support systems and resources for aspiring entrepreneurs. By addressing cultural barriers to entrepreneurship, societies can unlock the potential of their entrepreneurs and drive economic growth and innovation. Some specific strategies are as follows:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Embrace Cultural Intelligence', def: 'Cultural intelligence or cultural quotient (CQ) refers to the skill to relate and work effectively in culturally diverse situations. It is the capability to cross boundaries and prosper in multiple cultures. It involves understanding and appreciating different cultural norms, values, and communication styles. By embracing cultural intelligence, entrepreneurs can adapt their strategies and approaches to resonate with local customers and stakeholders.' },
              { term: 'Build Cross-Cultural Relationships', def: 'Establishing strong relationships with individuals from different cultures is key to overcoming barriers. By fostering trust and mutual understanding, entrepreneurs can navigate cultural differences more effectively. Networking events, partnerships, and mentorship programs can facilitate cross-cultural relationship building.' },
              { term: 'Conduct Market Research', def: "Thorough market research is crucial to identify cultural nuances and preferences. By understanding the target market's cultural context, entrepreneurs can tailor their products, services, and marketing strategies accordingly. This may involve adapting branding, packaging, messaging, and even product features to align with cultural expectations." },
              { term: 'Adapt Communication Styles', def: 'Effective communication is vital when dealing with cultural barriers. Entrepreneurs should be mindful of language nuances, non-verbal cues, and communication etiquette in different cultures. Adapting communication styles to match the cultural context can enhance understanding and build stronger connections with customers and stakeholders. Also, providing multilingual customer support or hiring translators can help bridge the gap.' },
              { term: 'Hire Local Talent', def: 'Employing individuals who possess local cultural knowledge and language proficiency can be invaluable. Local employees can provide insights, bridge cultural gaps, and help navigate challenges specific to the target market. Their expertise can contribute to better decision-making and more culturally sensitive business practices.' },
              { term: 'Collaborate with Local Partners', def: 'Partnering with local businesses or organizations can facilitate market entry and expansion. Local partners can provide valuable guidance, access to networks, and a deeper understanding of the cultural landscape. Collaborative efforts can lead to mutually beneficial outcomes and help overcome cultural barriers.' },
              { term: 'Respect and Adapt to Local Customs', def: 'Demonstrating respect for local customs and traditions is essential for building trust and credibility. Entrepreneurs should be aware of cultural sensitivities, religious practices, and social norms. Adapting business practices to align with local customs can foster positive relationships and avoid potential misunderstandings.' },
              { term: 'Leverage Technology', def: 'Technology can bridge cultural gaps and facilitate communication in diverse markets. Utilizing translation tools, localization software, and cross-cultural collaboration platforms can enhance efficiency and effectiveness. Embracing technology can also help overcome language barriers and streamline operations in global markets. It should be noted that cultural competitiveness is an ongoing process that requires continuous learning, adaptation, and an open mindset. By embracing cultural diversity and proactively addressing cultural barriers and challenges, entrepreneurs can position their businesses for success in the global market.' },
            ],
          },
          {
            type: 'definition',
            heading: '3.4 Environmental Barriers to Entrepreneurship',
            text: "Environmental barriers are commonly seen as negative features of the environment that impede the operation of an entrepreneur or hinder one's ability to start and grow successful businesses. Some of the barriers are discussed below:",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Regulatory and Legal Barriers', def: 'The rules, regulations, policies and laws of the government and other regulatory bodies can restrict as well as support the ability of entrepreneurs to start and grow their businesses. In addition to red tape, these barriers can make it challenging for individuals to navigate the requirements of starting a business, further hindering entrepreneurial efforts. Regulations such as licensing requirements, zoning laws, and tax policies can create significant hurdles for entrepreneurs looking to start their own businesses. Navigating these regulations can be time-consuming and costly, particularly for small business owners who may not have the resources to hire legal counsel or compliance experts. As a result, many potential entrepreneurs are deterred from starting businesses due to the perceived complexity and uncertainty of regulatory compliance.' },
              { term: 'Lack of Access to Capital', def: 'Entrepreneurs require capital to start a business. In many communities, there is a lack of financial infrastructure and resources to support new businesses. Without access to funding and resources, individuals may struggle to get their businesses off the ground and grow them successfully. Many aspiring entrepreneurs struggle to secure funding to start or expand their businesses, as traditional financial institutions may be hesitant to lend to startups with limited track records. Additionally, entrepreneurs from marginalized communities or underrepresented groups may face additional obstacles in accessing capital due to systemic bias and discrimination. Thus, a lack of access to capital can make it difficult for aspiring entrepreneurs to start their businesses.' },
              { term: 'Market Conditions', def: 'A major barrier to entrepreneurship can be the local market and economic environment. For example, it might be challenging for business owners to prosper in an area with high unemployment rates and low levels of consumer demand.' },
              { term: 'Infrastructure and Resource Constraints', def: 'For entrepreneurs to run and expand their businesses, physical infrastructure like roads, energy, and telephones must be accessible. Operating and growing a firm can be challenging for entrepreneurs without a solid infrastructure.' },
              { term: 'Environmental Degradation', def: 'Degradation of the environment might also prevent entrepreneurship. For instance, it can be challenging for business owners to operate sustainably and may incur more expenditures for them to handle environmental difficulties due to pollution, soil deterioration, and other environmental harm.' },
              { term: 'Societal Attitudes towards Entrepreneurship', def: 'In some communities, entrepreneurship may not be viewed as a desirable career path, leading to the lack of support and encouragement for individuals interested in starting their own businesses. Also, stereotypes and misconceptions about entrepreneurs can perpetuate negative attitudes towards entrepreneurship, making it more challenging for aspiring entrepreneurs to pursue their dreams.' },
              { term: 'Lack of Supportive Entrepreneurial Ecosystem', def: 'Entrepreneurial ecosystems are interconnected networks of entrepreneurs, investors, institutions, and supporting organizations, influenced by culture and norms, that foster the development and growth of businesses within a particular region or community. The absence of this constitutes a serious environmental setback to potential entrepreneurs.' },
              { term: 'Environmental Sustainability Concerns', def: "Environmental sustainability is the practice of interacting with the planet responsibly to avoid depleting natural resources and compromising the future generation's ability to meet their daily needs. This is important because the Earth is a finite place, with limited land, water, and wildlife. Neglecting these concerns could pose serious hindrance to aspiring entrepreneurs to start or expand a business." },
              { term: 'Technological and Digital Divides', def: 'This refers to the existing divide between people who have access to the Internet and Information and Communication Technologies (ICT), and those who do not, or who have limited access. Where this divide exists, it may hinder entrepreneurs from venturing into business.' },
              { term: 'Geopolitical and Economic Instability', def: 'This refers to the unpredictable and often violent fluctuations in political, economic, and social conditions that affect international/regional relations and global markets. Such instability can arise from various factors, including territorial disputes, political upheaval, economic crises, or social unrest, inflation and it often leads to uncertainty for investors and businesses operating across borders. This can serve as a serious environmental barrier to entrepreneurs.' },
            ],
          },
          {
            type: 'text',
            heading: '3.4.1 Strategies for Overcoming Environmental Barriers',
            text: 'Environmental barriers to entrepreneurship pose significant challenges for aspiring business owners looking to start and grow successful businesses. There are however, various strategies that entrepreneurs can employ to navigate and overcome the barriers which they face in the realm of operation environmental. These strategies are as follows:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Embracing Innovation and Leverage Technological Advancements', def: 'By adopting cutting-edge technologies and exploring new approaches, entrepreneurs can develop sustainable solutions and address environmental challenges in creative and impactful ways.' },
              { term: 'Building Collaborative Networks', def: 'Entrepreneurs can establish partnerships with like-minded organizations, government agencies, and local communities to pool resources, share knowledge, and collectively work towards sustainable solutions. These collaborative networks foster a supportive ecosystem for environmental entrepreneurship.' },
              { term: 'Engaging Stakeholders', def: 'Entrepreneurs can actively involve stakeholders such as customers, suppliers, employees, and local communities in decision-making processes. By incorporating diverse perspectives and insights, entrepreneurs can develop more robust and sustainable strategies and navigate the volatile environment successfully.' },
              { term: 'Implementing Sustainable Business Models', def: 'As a key to long-term success, entrepreneurs can integrate principles of circular economy, renewable energy, and resource efficiency into their operations. By prioritizing sustainability, they can create value while minimizing environmental impact and start/grow their business sustainably.' },
              { term: 'Continuous Learning and Adaptation', def: 'Environment is dynamic and so are its barriers. Aspiring entrepreneurs must continuously learn and adapt to changing circumstances. By staying updated on the latest research, industry trends, and regulatory developments, entrepreneurs can proactively adjust their strategies and remain resilient in the face of challenges.' },
            ],
          },
          {
            type: 'definition',
            heading: '3.5 Critical Success Factors in Entrepreneurship',
            text: "To begin with, anyone with a strong desire to earn money may set up and start a company. However, not all entrepreneurs are successful. Many aspects of entrepreneurship are thought to be crucial to business growth. The reality is that in the field of entrepreneurship, all of these qualities are needed (Kanu, 2018). There are some characteristics of entrepreneurship that contribute to the venture's success, and we will discuss these characteristics in this article.",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Optimum Resources Utilization', def: 'Entrepreneurship is regarded as an entrepreneurial practice because it entails a great deal of ingenuity as well as the workings of a company with the aim of maximizing benefit but still ensuring adequate resource usage. Both of these operations are carried out in a specific category of market setting, and hence Entrepreneurship is viewed as a competitive force.' },
              { term: 'The Path to Success is Innovation', def: 'To capture the interest of their future clients, a constant and random quest for new and creative business ideas is needed. It is the duty of an entrepreneur to review and assess all company processes on a regular basis in order to create a framework that is both reliable and competitive. An organization’s ongoing attempt to improve performance is known as performance optimization.' },
              { term: 'Seek Out the Objectives', def: 'A business often starts with a set of objectives that must be met in order for the company to stay afloat. To achieve their goals and increase profits, an entrepreneur must have certain optimistic inspirations. Without an objective and the means to achieve it, not even a business can survive.' },
              { term: 'Profit Maximization', def: 'The profit potential is described as the expected amount of return or earning that a business organisation would gain by taking a gamble and launching a business venture with some creative ideas. If there is no benefit opportunity, the effort of an entrepreneur would remain hypothetical and a form of leisure activity dependent on philosophy.' },
              { term: 'Risk Taking', def: 'Entrepreneurship is inextricably linked to risk, and an entrepreneur must consider the amount of risk involved with the establishment of a company. The core of entrepreneurship is a desire to gamble the development and execution of such new innovations. Some of the new theories are provisional and therefore the findings are not favourable or even immediate.' },
              { term: 'Manage the Human Resources', def: 'It is impossible to operate a company without employing even one employee. Both business operations cannot be done effectively as an entrepreneur, and there is an apparent need for manpower to do the different activities relevant to business performance in a better way.' },
              { term: 'Strong Abilities to Establish Networking', def: 'The practice involved in the field of Entrepreneurship is the creation of networks and the expansion of relationships. In addition, an entrepreneur must increase their opportunities by expanding their network. The best approach is to network with other entrepreneurs at networking gatherings, business parties, get-togethers, and other functions where you can get some ideas for growing your business.' },
              { term: 'Self-Motivation', def: 'When a company wishes to reach new heights of prosperity, it must always challenge itself and remain inspired. There will be ups and downs in the business world, but staying focused will allow you to seize opportunities that are beneficial to your company.' },
              { term: 'Hard Work and Commitment', def: 'Entrepreneurship necessitates a significant amount of time and effort, as well as dedication and commitment. To generate a variety of new ideas, improve strategic strategies, and ensure the firmness of vital capital, a mixture of hard work and excitement is required. It is a strong sense of personal duty combined with a high degree of motivation.' },
              { term: 'Rewards', def: 'Entrepreneurship is synonymous with a variety of incentives, whether financial or non-financial, so it either satisfies financial targets or provides a high degree of personal satisfaction. Monetary incentives are viewed as a symbol of success for Entrepreneurship, while non-monetary rewards include an incentive to contribute to social well-being while still receiving some social attention.' },
              { term: 'Passion is a Must', def: "It is often necessary in the world of Entrepreneurship to be passionate but still prioritizing one's goods or services. When you are frustrated, there is always inspiration to propel you up and make you move towards your passion. Every successful entrepreneur is guided by a strong sense of purpose. If it is discovered that one's interest is fading, this is a sign that it is time to move on to something new." },
              { term: 'Set a Vision', def: "It is inarguable that entrepreneurship must establish a vision. The overall goal of an Entrepreneurship must be discussed with members of the team so that they understand how much work they must put in to achieve the same. The Entrepreneur's vision is straightforward, and it should also fulfill the business's goals. This is the obvious consideration that must be considered for great encouragement and taking the company to the next level." },
              { term: 'Adaptability', def: 'This is the most critical thing to consider when it comes to surviving in today’s ever-changing corporate world. It is necessary to stay competitive and adapt in order to succeed in a variety of market conditions. The willingness to respond to change is important for Entrepreneurship.' },
              { term: 'Core Values', def: 'Without values, entrepreneurship cannot survive for a long time. If you want to run the business efficiently and effectively, then there is a need for establishing some set of core values. Some of the core values should be fairly treating all business operations and make sure all deal with employees is honest and stay away from any fraud. This is not applied in case of business activities but also in terms of treating customers as well as clients in a fair manner. These are the part of business etiquette that are required to follow all the times.' },
              { term: 'Leading Abilities', def: 'Entrepreneurship is all about directing all staff in the same direction with the appropriate amount of commitment. A simple vision often brings meaning, but it requires a significant amount of resources to transition from vision to practice. Entrepreneurs hire a variety of staff to manage various company activities such as production, sourcing, distributing, accounting, and so on. Since an entrepreneur cannot handle all tasks on his or her own, he or she can only guide others in the path of target achievement.' },
              { term: 'Active-minded', def: 'A successful entrepreneur still understands what situation will get to them what kind of business opportunities. As a result, it can be used to improve the market and generate income in the future. To illustrate, when demonetization occurred, an online-based enterprise may introduce their online services, which increased the success of that company during that time span. As a result, it gave the business a massive boost and caused it to grow rapidly over that time span.' },
              { term: 'Highly Optimistic', def: 'Business fluctuates constantly due to changing business dynamics, and an entrepreneur must have an optimistic attitude at all times. Entrepreneurship must remain optimistic during times of disappointment and ups and downs are a part of any company, regardless of its existence.' },
              { term: 'Communication Skills', def: 'An entrepreneur must effectively collaborate with all of his or her staff as well as customers. It is not only beneficial to the company, but it also creates a very favorable impact and a high degree of trust. Furthermore, it puts the recipient and sender on the same page and makes it simple to grasp everything.' },
              { term: 'Knowledge About the Niche', def: 'An enterprise is often founded on a certain niche, and it is clear that an entrepreneur must be well-versed in the intricacies of the good or service with which they are concerned. Furthermore, it is important to be mindful of the marketing plans for goods and services, as well as how to improve them. The technical information about the pros and cons of these services must be thoroughly researched.' },
              { term: 'Urge to Learn', def: 'As an entrepreneur, you must understand all of the modern and emerging facets of industry so that you can keep up with the changing business environment. However, if you are unable to learn anything new, it is clear that entrepreneurship is not for you.' },
            ],
          },
          {
            type: 'definition',
            heading: '3.6 Summary and Conclusion',
            text: 'Entrepreneurship is not a part-time career, but rather a full-time opportunity to increase profit as far as possible. There is no point in starting and running a company if there is no change in business goals. However, if you have a creative and innovative concept, you must plan ahead of time in order to launch a new company. All of the above characteristics of an Entrepreneurship propel the company to new heights of growth. Do it once and you never know what would happen if you never try it.',
          },
          {
            type: 'bullets',
            heading: 'References',
            items: [
              "Alabladejo, M. (2002). Promoting SMEs in Africa: Keys Areas of Intervention. UNIDO's contribution to the preparation of AFDB's Lines of Credit Support to Small and Medium Scale Enterprises in Africa. sl: UNIDO.",
              "Ali, I., Tajddini, K., ur Rehman, K., Ali, J. F., & Ahmed, I. (2010). University student's inclination of governance and its effects on entrepreneurial intentions: an empirical analysis. International Journal of Trade, Economics and Finance, 1(1), 36.",
              'Baena, V. (2012). Market conditions driving international franchising in emerging markets. International Journal of Emerging Markets, 7(1), 49-71.',
              'El Nemar, S., Ghazzawi, K., El Danaoui, S., Tout, S., & Dennaoui, H. (2016). Entrepreneurship barriers and entrepreneurial inclination in Lebanon. Management, 6(1), 21-28.',
              'Hsieh, C., Parker, S. C., & van Praag, C. M. (2017). Risk, balanced skills and entrepreneurship. Small Business Economics, 48, 287-302.',
              'Iwarsson, S., Nygren, C., Oswald, F., Wahl, H. W., & Tomsone, S. (2006). Environmental barriers and housing accessibility problems over a one-year period in later life in three European countries. Journal of Housing for the Elderly, 20(3), 23-43.',
              "Kanu, A. (2018). Benefits and Barriers of Entrepreneurial Ventures: -A Literature Review Point of View. The Int'l Journal of Entrepreneurship and Business Innovation, 1(01), 27.",
              "Kooyman, R. (2015). Creative Entrepreneurs: Cultural Ants 'Identity, Perspectives and Dilemmas'. Int'l Journal of Economics, Commerce and Management, 3(9), 15-26.",
              'Laclé, F. A. (2010). Entrepreneurship, Economic Development and the Barriers in Between. s.l:s.n',
              'Onyebinama, U. A. U., & Onyebinama, I. C. (2010). Extension education and entrepreneurship development in Nigerian agriculture. Agricultural Journal, 5(2), 63-69.',
              'Radikoko, I., Maswabi, B., & Dzimiri, M. (2015). Investigating Factors Affecting Entrepreneurship Development in Botswana. Archives of Business Research, 3(6).',
              'Ray, C. (1998). Culture, intellectual property and territorial rural development. Sociologia ruralis, 38(1), 3-20.',
              'Singh Sandhu, M., Fahmi Sidique, S., & Riaz, S. (2011). Entrepreneurship barriers and entrepreneurial inclination among Malaysian postgraduate students. International journal of entrepreneurial behavior & research, 17(4), 428-449.',
              "Staniewski, M., & Awruk, K. (2015). Motivating factors and barriers in the commencement of one's own business for potential entrepreneurs. Economic research-Ekonomska istraživanja, 28(1), 583-592.",
            ],
          },
        ],
      },
      {
        number: '4',
        title: 'Theories of Entrepreneurship',
        sections: [
          {
            type: 'text',
            text: 'Authors: Prof. Micheal P. Nnamesh and Mrs. Emem Akainyene, Ph.D',
          },
          {
            type: 'definition',
            heading: '4.1 Introduction',
            text: 'The term "theory" is used by scientists to describe the interactions between evidence. Put it differently, theory is some ordering principles. There are variety of entrepreneurship myths that can be explained from different perspectives. Economists, Sociologists, and Psychologists. These theories have been supported and given by various thinkers over the period of more than two and half centuries. Although, a coordinated and comprehensive theory of entrepreneurship is yet to come, some authorities have compounded theories on entrepreneurship and these theories are constructed from either psychological or sociological elements. Interestingly, these various theories are named after their proponents. For the purpose of this course, we shall, in this chapter, present and discuss the under-listed theories of entrepreneurship propounded by the different eminent social thinkers.',
          },
          {
            type: 'bullets',
            items: [
              'Krizner Theory',
              'Joseph Schumpeter Theory',
              'Knight Theory',
              'Shackle Theory',
              'Casson Theory',
              'Max Weber Theory',
              'Frank Young Theory',
              'Evarer Hagen Theory',
              'John Kunkel Theory',
              'David McClelland Theory and',
              'Thomas Cochran Theory',
            ],
          },
          {
            type: 'definition',
            heading: '4.2 Krizner Theory (1997)',
            text: 'According to K. Kirzner, an entrepreneur is a person or someone who is alert to and perceives profitable opportunities. He is an intermediary who is able to opportunities for trade. He is of the Austrian school of thought and an Austrian decent. The highlight of his theory is entrepreneurial (opportunity) discovery in the phase of disequilibrium. The key words associated with this theorist are disequilibrium in the market and discovery.',
          },
          {
            type: 'definition',
            heading: '4.3 Joseph Schumpeter Theory (1928)',
            text: "This theory is otherwise referred to as the Innovation Theory of entrepreneurship or a dynamic theory of entrepreneurship. It is named after Schumpeter since he was the first theorist to advocate for it. He belongs to the radical school of thought with key highlights on innovation, creative destruction, and detaching risk from entrepreneur. Entrepreneurship, according to Schumpeter, is the catalyst that disrupts the economy's stationary circular flow and thus initiates and sustains the growth process. The inventor activates the economy to a higher stage of growth by embarking on 'new variations' of the forces of production, which he succinctly refers to as creativity. In addition to taking chances and organizing manufacturing, Schumpeter developed the idea of creativity as a central force in entrepreneurship. Entrepreneurship, according to Schumpeter, is \"an innovative practice.\" An inventor is someone who creates innovative goods or services and also introduces them into the market. He sees creativity as an entrepreneur's weapon. The inventor is regarded as the \"driver of innovation.\" He sees the potential to introduce new goods, new markets, new sources of production, new forms of industrial and commercial enterprise, or for the development of newly discovered resources. By this theory, Schumpeter sees an entrepreneur as a special Person vis-à-vis an innovator who brings about ideas from the introduction of new technological process and product. Schumpeter was the first major economic economist to place the human agent at the center of the production process. He is quite clear about the entrepreneur's economic role. The entrepreneur is the driving force behind economic development; his job is to create new combinations or reinvent. Schumpeter distinguishes between innovators and inventors. A designer develops novel materials and techniques. An innovator, on the other hand, is someone who uses or implements inventions and discoveries to create new combinations. An engineer is concerned with his scientific innovation work, while an entrepreneur is concerned with converting the technical work into economic efficiency. An innovator differs from an entrepreneur in that he not only creates something new, but also goes beyond mere creation to the commercialization of that which has been originated.",
          },
          {
            type: 'definition',
            heading: '4.4 Knight Theory (1921)',
            text: "An Austrian decent with theoretic focus on distinguishing between uncertainties, risks, and relating them to profit and entrepreneurship. His key words are uncertainty, risk and profit. Knight described an entrepreneur to be a specialized group of persons who bears uncertainty. Uncertainty is defined as a risk which cannot be insured against and is incalculable. The entrepreneur according to him is the economic functionary who undertakes such responsibility of uncertainty, which by its very nature cannot be insured, or capitalized, or salaried too. By this theory, risk bearing is seen as the primary element of entrepreneurship. The underlying tenets Knight's theory is as follows:",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Risk creates Profit', def: "According to the Knight's theory of risk-bearing, the entrepreneur or capitalist makes money by undertaking risks." },
              { term: 'More Risk More Gain', def: 'The level of risk varies depending on the industry. Entrepreneurs take varying degrees of risk based on their skill and tendency. According to risk theory, the more dangerous the essence of a company, the greater the profit it would receive.' },
              { term: 'Profit as Reward and Cost', def: "Profit is the entrepreneur's incentive for taking chances. As a result, it is still considered part of the usual cost of production." },
              { term: "Entrepreneur's Income is Uncertain", def: 'He defines uncertainty as a condition in which the probabilities of alternative results cannot be calculated either a priori or statistically. In an economic scenario involving a one-of-a-kind case, a priori logic is clearly meaningless. Benefit, according to this principle, is the incentive for an entrepreneur\'s investment in bearing uninsurable risks and uncertainties, and the amount of benefit received is proportional to the degree of uncertainty assumed.' },
            ],
          },
          {
            type: 'text',
            text: "In all, Knight contends that the degree of instability in an enterprise could be minimized by 'consolidation.' Consolidation is to uncertainty; what insurance is to risk. In other words, consolidation is similar to insurance in that it is a way of minimizing absolute volatility by pooling individual instances. The elasticity of self-confidence supply is the single most significant determinant of benefit and the number of entrepreneurs.",
          },
          {
            type: 'definition',
            heading: '4.5 Shackle Theory (1970)',
            text: "An Austrian school of thought advocates having theoretic focus on entrepreneurship and decision-making with the key word \"decision-making\". He sees an entrepreneur as someone who is creative, imaginative and original whereas Krizner's entrepreneur perceives opportunities; Shackle's entrepreneur creates and imagines the opportunities.",
          },
          {
            type: 'definition',
            heading: '4.6 Casson Theory (1995)',
            text: 'An entrepreneur is someone with different skills from others. He needs skills to coordinate scarce resources and make judgment decisions. Cason developed an economic theory of entrepreneur that fits alongside neo-classical constructs. He also developed the modern economic theory of entrepreneurship through the combination of the ideas of Joseph Schumpeter, Friedrich Hayek and Frank Knight. According to this theory, successful entrepreneurs demonstrate good judgment in making risky innovations, and are compensated through either profits or salaries depending on whether they act as owners or managers of their firms. He also emphasized the significance of emotional rewards and cost of accessing information, while remaining detached from the views of Schumpeter and Krizner.',
          },
          {
            type: 'definition',
            heading: '4.7 Max Weber Theory (1904 – 1906)',
            text: 'A German protestant, Max Weber theory of entrepreneurship believes that the protestant ethics encourages hard work, which leads to accumulation of capital and investment. According to him, certain religious beliefs create either a positive or a negative attitude towards profit generation and wealth accumulation. According to Max Weber\'s theory, religion has a significant influence on entrepreneurial growth. Some sects, according to Weber, have fundamental beliefs in how to earn and accumulate wealth, while others have fewer. He refers to them as having a "capitalist spirit" and an "adventurous spirit." When society\'s mental outlook is favorable to capitalism, the essence of capitalism will emerge. According to Max Weber, the acceptance of exogenously-supplied religious values generates moving entrepreneurial resources. These values are what lead to intense effort in professional endeavors, organized ordering of means to ends, and wealth accumulation. According to his theory, Hinduism, Buddhism, and Islam do not promote entrepreneurship. Many sociologists have questioned his position. Nevertheless, the colonial rulers liked Max Weber\'s theory because it encouraged European entrepreneurship in India. However, subsequent scholars have criticized it. The hypothesis is based on the following false assumptions:',
          },
          {
            type: 'bullets',
            items: [
              'There is a single Hindu belief structure.',
              'The Indian society internalized those beliefs and put them into practice on a daily basis, and',
              'The exponential rise in entrepreneurship in India after independence demonstrates that Hinduism is not anti-capitalist or anti-adventurous.',
            ],
          },
          {
            type: 'text',
            text: 'Many thinkers agree with Weber\'s assessment of the relationship between religious belief and entrepreneurial development. However, this viewpoint is not uniformly shared. Weber\'s opinion was criticized by Samuelson, who said that capitalism evolved in cultures where the protestant ethic was "not widespread." Hoselitz concluded that Protestants in France were unable to establish businesses because they lacked political stability.',
          },
          {
            type: 'definition',
            heading: '4.8 Frank Young Theory (1971)',
            text: "A sociological theorist of entrepreneurship, his theory is one of change, based on society's incorporation of reactive sub-groups. He believes that entrepreneurs are not super normal individuals. This indicates that inter-group relationship affects entrepreneurial activities. In Young's opinion, entrepreneurial traits are seen in small communities where individuals grow as entrepreneurs. Young came by the group level trend behavior of entrepreneurs based on his research on groups of entrepreneurs known as Thematic Appreciation Test (TAT). The test showed a propensity to characterize the situation as a problem to be solved, understanding the practical effort involved, faith in their own abilities to solve the problem, and a tendency to examine the situation from each individual's perspective before proposing a solution. Young's theory is a transition theory focused around the inclusion of reactive subgroups in society. If the following three conditions occur, a group becomes reactive:",
          },
          {
            type: 'bullets',
            items: [
              'When access to critical social networks is denied;',
              "When a group's standing is low; and",
              "When a group's institutional capabilities are superior to that of other classes in society at the same stage.",
            ],
          },
          {
            type: 'definition',
            heading: '4.9 Everett Hagen Theory (1962)',
            text: "He views an entrepreneur as a creative problem solver, who is interested in things in the technological and practical realms with a motivation of duty to achieve. Hagen proposed an important principle of entrepreneurial behavior known as the removal of status esteem. Hagen attributes the emergence of entrepreneurship to the withdrawal of a group's status respect. The withdrawal of rank, of esteem, according to Hagen, is the cause factor for changes in personality development. Status withdrawal happens when members of a social community believe that their goals and ideals in life are not respected by the groups in society that they love and support. Hagen proposes four forms of incidents that may lead to status withdrawal:",
          },
          {
            type: 'bullets',
            items: [
              'Displacement of a conventional elite community from its former position by another traditional supply physical force.',
              "Denigration of valuable symbols as a result of a change in the superior group's mindset.",
              'Inconsistency of status markers with changing economic power distribution.',
              "Refusal to recognize one's expected status after migrating to a foreign community.",
            ],
          },
          {
            type: 'text',
            text: 'Hagen goes on to hypothesize that the removal of status esteem will result in four potential responses and four distinct personality types, which are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Retreatist', def: 'An entrepreneur who continues to serve in society but is unconcerned with his job or status.' },
              { term: 'Ritualist', def: "Someone who performs according to society's expectations but has no intention of improving his working standards or status." },
              { term: 'Reformist', def: 'A rebel who attempts to introduce modern methods of living and a new culture.' },
              { term: 'Innovator', def: 'An inventor who is innovative who strives to accomplish his or her own goals.' },
            ],
          },
          {
            type: 'text',
            text: 'According to Hagen (1962), the key cause of entrepreneurship is the ingenuity of a marginalized minority community. He established this case based on the Japanese samurai culture. This culture had formerly held a high reputation, which was later revoked. To reclaim its lost glory, it became more active and robust, giving birth to a slew of entrepreneurs.',
          },
          {
            type: 'definition',
            heading: '4.10 John Kunkel Theory',
            text: "A behaviouralistic theorist, Kunkel argues that entrepreneurial behaviour is a function of the surrounding social structures. He further argues that the type of social values that exists in the society determines the type of entrepreneurial skill. The overtly articulated behaviors of individuals and their relationships to historically and currently surrounding social environments and physical circumstances are the focus of Kunkel's behavioral model. In this model, rewarding and aversive stimuli in the social environment decide behavioral patterns. As a result, entrepreneurial behavior is motivated by manipulative economic and social pressures and is a part of the surrounding social system, both past and present. In furthering the explanation, the psychologists opined that entrepreneurship is more likely to occur when a population has an ample supply of people with specific psychological traits. Below are the major characteristics of the Kunkel's theory:",
          },
          {
            type: 'bullets',
            items: [
              'a potential for institutions to see problems in new ways (vision),',
              'mental and physical energy to break free from ingrained thought patterns,',
              'a strong desire to act,',
              'to realize a fantasy',
              'the will to persevere in the face of adversity; and',
              'a strong will to succeed',
            ],
          },
          {
            type: 'definition',
            heading: '4.11 David McClelland Theory (1961)',
            text: 'McClelland argues that it is the drive for achievement (not just competence), that makes people venture into entrepreneurial ventures. It is the need for achievement that motivates entrepreneurial activities. According to McClelland, an entrepreneur has two characteristics: first, doing things in a new and better way, and second, making decisions in the face of uncertainty. The most critical aspect for entrepreneurs, according to McClelland, is success orientation. Individuals that have a strong success orientation are unaffected by monetary or other potential rewards. Profit and incentives are merely yardsticks by which entrepreneurs with a high achievement orientation measure their success. According to him, as a result of one\'s life experience, one develops three types of needs which include need for:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Achievements', def: 'Desire for success, advancement, and development or growth.' },
              { term: 'Power', def: 'A need to control or manipulate people, and circumstances.' },
              { term: 'Affiliation', def: 'A strong desire to form pleasant and near interpersonal bonds.' },
            ],
          },
          {
            type: 'definition',
            heading: '4.13 Thomas Cochran Theory',
            text: "A sociological Theorist of entrepreneurship. Cochran argued that the environment in which the individual is brought up determines the entrepreneurial urge in an individual. He believes the key factors in entrepreneurship are: Cultural values, role expectation and social sanctions. The entrepreneur, as he claims, reflects the community's personality model. Cochran argued that entrepreneur's success is determined by factors such as his own attitudes toward his work, sanctioning groups' task preferences, and the job's organizational requirements. From all the above theories of entrepreneurship, we can deduce that an entrepreneur is a middleman, creative, alert to opportunities, perceives opportunities, a special person, an innovator, original, resourceful, imaginative, a risk taker, a reward seeker, and a coordinator of resources etc.",
          },
          {
            type: 'definition',
            heading: '4.14 Application of Entrepreneurship Theories',
            text: "Theories are framework which serves as a guide to a particular subject matter. Various theories of entrepreneurship have emerged which has led to the development of the entrepreneurship field. Some of the theories are applied to explain the origin or etymology of entrepreneurship both as a field of study or noble profession and as a practice. For instance, the earliest theories, especially those of the early 18th century are today used to introduce the perception of an entrepreneur from economic perspective. Also, theories with psychological undertone are applied to explain how individual's personality or traits, psychodynamic model and the need for achievement transcend into his/her entrepreneurial pursuit be it positively or negatively. Other theories with sociological tenets are used to discuss the social context within which entrepreneurship can emerged and thrive. The innovation-based theories are applied to explain entrepreneurship as being a function of criticisms and dissatisfaction from the status-quo. Theories that are based on economic thoughts and principles are applied to explain entrepreneurship as resulting from one's ability to combine the factors of production (Machine, labour, capital) together to produce economic value (goods and services); and also, one who originates changes, innovations and new.",
          },
          {
            type: 'definition',
            heading: '4.15 Summary and Conclusion',
            text: "The Chapter deals with the multi-dimensional concept of entrepreneurship wherein the theories of entrepreneurship have been discussed in detail. The most important was the Schumpeter's theory of innovation wherein Schumpeter emphasises the importance of innovation in entrepreneurship. The second important theory of entrepreneurship is written by McClelland as a function of achievement that is doing things in a better way and taking critical decisions in a new enterprise. From the above theories we can see that Schumpeter and McClelland have given primary importance to the individual. While Schumpeter has stressed on innovativeness or creativity of the individual as an important determinant for entrepreneurship, McClelland stresses more on the internal factors, specifically, the need for achievement. Weber has touched upon the religious belief system which is part of culture and which has a great influence in determining the individual's behaviour in every aspect of his life. Hegan's views economic development as a process which is brought about by withdrawal of status respect of a group. Young lays greater emphasis on the nature of the groups, group's assistance and coordination. Like Weber and McClelland, Cochran also speaks in different terms but explicitly, of cultural values and social structure (which include role expectations and social sanction) as playing a vital role in economic development. As observed, every theorist has looked at the entrepreneur and entrepreneurship on the basis of his perception, and therefore, can, at best, provide only a limited view of entrepreneurial phenomenon. No view is right or wrong, or more or less; in fact, the various factors which cause the emergence of entrepreneurship are integral and not additive. They care interlocking, mutually dependent and usually reinforcing.",
          },
          {
            type: 'bullets',
            heading: 'References',
            items: [
              'Ardichvilia, A. R., & Ray S. (2000). A theory of entrepreneurial opportunity identification and development, Journal of Business Venturing, 18, 105–123.',
              'Bathia, D. (2013). Theories of entrepreneurship. Retrieved from http://slideshare/theoriesofentrepreneurship.html',
              'Brandenburg, F. (1962). A Contribution to the Theory of Entrepreneurship and Economic Development: The Case of Mexico, I Inter-American Economic Affairs 16: 3-24.',
              'Bygrave W. D. and Hofer C. W. (1991), Theorizing about Entrepreneurship. Entrepreneurship Theory and Practice, 11-22.',
              'Cherukara, J. M. & Manalel, J. (2011). Evolution of entrepreneurship theories through different schools of thought. The Ninth Biennial Conference on Entrepreneurship at EDI, Ahmedabad, February 16-18, 2011.',
              'Desai, V. (2009). The Dynamics of Entrepreneurial Development and Management – Planning for Future Sustainable Growth. India: Himalaya Publishing House.',
              'Drucker Peter F. (1985). Innovation and Entrepreneurship. Harper & Row, New York, p.143.',
              'Khalil, E. (2006). Entrepreneurship and Economic Theory MPRA Paper No. 501, posted 07.',
              'Kwabena, N. S. (2011). Entrepreneurship theories and empirical research: A summary review of the literature. European Journal of Business and Management, 3(6), 1-9.',
              'Landstrom, H. (1998). The Roots of Entrepreneurship Research, Conference proceedings, Lyon, France, November 26-27.',
              'Leff, N. H. (1979). Entrepreneurship and Economic Development: The Problem Revisited, Journal of Economic Literature 17: 46-64.',
              'Linden, P. (2015). Entrepreneurship: Theory and Application in a University Arts Management Setting. Professional Work – Communication. Paper 138.',
              'Murphy, J. P., Liao, J. & Welsch, P.H. (2006). A Conceptual history of entrepreneurial thought. Journal of Management History. 12, 9-24.',
              'Nelson R. R. & Pack, H. (1999). The Asian Miracle and Modern Growth Theory. The Economic Journal 109 (457): 416–36.',
              'Rotter, J. (1966). Generalised expectancies for internal versus external control reinforcementl, Psychological Monographs, 80, Whole No. 609.',
              "Schumpeter, J.'A. (1934). The Theory of Economic Development, translated by Opie R. Harvard University Press, Cambridge, MA., pp 42–46, 78–89.",
              'Sharma, Balraj, & Sandeep (2005). Entrepreneurship Development. Delhi.: Wisdom Publications.',
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'Entrepreneurial Thinking and Creativity',
        sections: [
          {
            type: 'text',
            text: 'Authors: Prof. Anietie E. Effi and Francis Bassey, Ph.D.',
          },
          {
            type: 'definition',
            heading: '5.1 Introduction',
            text: "Entrepreneurial thinking and creativity are two essential elements that drive innovation and success in business today. In today's competitive and rapidly changing business environment, entrepreneurs must constantly be thinking outside the box and coming up with creative solutions to problems. This requires a mindset that is constantly looking for new opportunities and ways to improve existing products or services. Therefore, entrepreneurial success is measured by creativity and innovative thinking. It would be impossible to create a value-added firm without these two characteristics. The major aspect of entrepreneurial thinking is the ability to adapt to change and embrace uncertainty as well as take risks and think creatively. Entrepreneurs are not afraid to try new things and push the boundaries of what is possible. They are constantly looking for ways to disrupt the status quo and create something new and innovative. This requires a high level of creativity and the ability to think in unconventional ways. Thus, companies have devoted a significant amount of their resources in research and development (R&D) to remain competitive. These investments have enabled them to be creative, and this innovation must be maintained if they are to be successful. These firms' inventiveness has enabled them to develop new goods, differentiate themselves, and become market leaders in their respective industries. In this chapter, emphasis is placed on explaining different forms of entrepreneurial thinking and creativity within the context of entrepreneurial venturesome.",
          },
          {
            type: 'definition',
            heading: '5.2 The concept of creativity',
            text: 'Creativity is defined as the capacity to create new objects, ideas, products, and procedures via inventive abilities. Most creative entrepreneurs are highly enthusiastic about their business, and are prepared to take chances, and trust their intuition. Creativity is the capacity to create or bring into being something new, whether it be a new solution to a problem or a new method or technique. All invention begins with a spark of creativity. Creativity is also a mindset, as well as the capacity to embrace change and seek out new ideas and opportunities. Entrepreneurs that are creative work hard to better ideas and discover answers to challenges by gradually modifying and refining their products. People are driven to be creative for three reasons: (i) a need to be unique, varied, and complicated stimulation; (ii) a need to express ideas and ideals; and (iii) a need to solve problems. Creativity manifests itself in various ways. A variety of thinkers have proposed models of the creative person. According to one paradigm, there are several types of creativity or Creativity Profiles that result in growth, invention, speed, and so on. These profiles are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Incubate', def: 'This is long-term development' },
              { term: 'Imagine', def: 'This means a breakthrough idea' },
              { term: 'Improve', def: 'This implies incremental adjustments' },
              { term: 'Invest', def: 'These are the short-term goals' },
            ],
          },
          {
            type: 'definition',
            heading: '5.3 The concept of creative thinking',
            text: "Creative thinking on the other hand may be defined as the art of solving problems via the use of one's imagination and logic. It is a mental activity that seeks solutions to some of life's issues. Entrepreneurs face dynamic and changing difficulties in a dynamic and changing environment. They take on new shapes and necessitate a highly creative approach. Creative entrepreneurs use their minds to think creatively in order to produce ideas and products that will stand the test of time. When we come up with a new idea, we apply the process of creative thinking. As identified and explained by Harris (2012), the following are descriptions of creative thinking:",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Ability', def: 'Creative thinking is defined as the capacity to envision or invent a new thing.' },
              { term: 'An Attitude', def: 'Creative thinking is also an attitude: the capacity to embrace change and newness, a desire to experiment with ideas and possibilities, a flexible view, and the habit of appreciating the excellent while seeking ways to better it.' },
              { term: 'A Process', def: 'Creative individuals work hard and constantly to better ideas and solutions by gradually modifying and refining their works. The creative individual understands that there is always space for development.' },
            ],
          },
          {
            type: 'definition',
            heading: '5.4 Approaches of Creative thinking',
            text: 'Creativity is a process of producing ideas, thoughts, and associations that is fueled by both conscious and unconscious knowledge. To improve your creative thinking abilities, you must alter your perspective. You must seek for unusual relationships between people and things, and you must have an open, inquiring mind to do so. You may also employ strategies to help you think more creatively. Here are five creative approaches for coming up with ideas and addressing problems:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Evolution', def: 'method of incremental improvement, as new ideas stem from other ideas. Evolution is all about steadily improving things.' },
              { term: 'Synthesis', def: 'method of combining two ideas into a third (new) idea. Synthesis is all about combining multiple ideas and "connecting them" into a new idea.' },
              { term: 'Revolution', def: 'method of marked change from the previous ones, a completely different. The third way to generate fresh ideas and solve issues is to do something entirely different from what you are presently doing.' },
              { term: 'Reapplication', def: 'Reapplication is a fourth creative process that involves utilizing or doing something in a new way.' },
              { term: 'Changing direction (or Pivoting)', def: 'This is a way to utilize when you wish to approach an issue from a completely new perspective. It is a method of creative insight, and or breakthroughs.' },
            ],
          },
          {
            type: 'definition',
            heading: '5.5 The concept of Critical Thinking',
            text: "Critical thinking is much of the thinking done in formal education. It stresses analytical abilities, teaching pupils how to analyze statements and follow or build logical arguments. Creative thinking is concerned with the exploration of ideas, the generation of options, and the search for several correct solutions rather than just one simple solution. Both creative and critical thinking are essential for an entrepreneur's successful working life.",
          },
          {
            type: 'definition',
            heading: '5.6 Critical thinking and creative thinking compared',
            text: 'Critical thinking and creative thinking play vital roles in entrepreneurship. Critical thinking involves analyzing, evaluating, and problem-solving, while creative thinking entails generating new ideas, perspectives, and solutions. Both skills are crucial for launching and growing a successful business. In the world of entrepreneurship, critical thinking is essential for making sound business decisions. Entrepreneurs must be able to assess risks, analyze market trends, and evaluate various options to make strategic choices. Critical thinking helps entrepreneurs navigate through challenges, setbacks, and uncertainties that are inevitable in the business world. By using critical thinking skills, entrepreneurs can minimize risks, anticipate obstacles, and make informed decisions that can lead to success. On the other hand, creative thinking is crucial for innovation and differentiation in entrepreneurship. Entrepreneurs need to think outside the box, come up with unique ideas, and create disruptive solutions to stand out in a competitive market. Creative thinking allows entrepreneurs to identify new opportunities, develop innovative products or services, and explore unconventional approaches to solve problems. By unleashing their creativity, entrepreneurs can differentiate themselves from competitors, attract customers, and drive business growth. These two types of thinking are distinguished as follows:',
          },
          {
            type: 'table',
            heading: 'Table 6.1: Differences between critical and creative thinking',
            headers: ['Critical Thinking', 'Creative Thinking'],
            rows: [
              ['Analytic', 'Generative'],
              ['Convergent', 'Divergent'],
              ['Vertical', 'Lateral'],
              ['Probability', 'Possibility'],
              ['Judgment', 'Suspended Judgment'],
              ['Focused', 'Diffuse'],
              ['Objective', 'Subjective'],
              ['Answer', 'An answer'],
              ['Left brain', 'Right brain'],
              ['Verbal', 'Visual'],
              ['Linear', 'Associative'],
              ['Reasoning', 'Richness, novelty'],
              ['Yes but', 'Yes and'],
            ],
          },
          {
            type: 'definition',
            heading: '5.7 The concept of Reflective Thinking',
            text: 'Reflectiveness implies the use of metacognitive skills (thinking about thinking), creative abilities and taking a critical stance. For short, reflective thinking can be defined simply to mean the process of "Thinking about thinking". It is a part of the thinking process that focuses on analyzing and drawing conclusions regarding past actions. Reflective thinking is action oriented; Simply put, reflective thinking is defined as constantly thinking and analyzing what someone has done, is doing, have experienced, or have learnt as well as how what was learnt was learned. Reflective thinking is essential for success in unpredictable and complex situations such as working with customers or clients which is typical of an entrepreneurial venturesome. Thus, reflective thinking is a critical skill that plays a significant role in entrepreneurship. As an entrepreneur, one must continuously assess their decisions and actions in order to learn and grow from their experiences. Reflective thinking involves evaluating what worked well and what did not, identifying areas for improvement, and adapting strategies accordingly. It allows entrepreneurs to make more informed decisions and ultimately increases their chances of success.',
          },
          {
            type: 'text',
            text: 'Two key aspects underscore reflective thinking in entrepreneurship, namely:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'The ability to objectively analyze failures', def: 'Failure is inevitable in the world of entrepreneurship, but it is how one responds to failure that ultimately determines their success. Reflective thinking allows entrepreneurs to unpack the reasons behind their failures, identify the lessons learned, and apply those lessons to future endeavors. By reflecting on past mistakes, entrepreneurs can avoid making the same errors in the future and ultimately improve their chances of achieving their goals.' },
              { term: 'The ability to think creatively and adapt to changing circumstances', def: 'Entrepreneurs often face unexpected challenges and obstacles along their journey. Reflective thinking allows them to approach these challenges with a fresh perspective, brainstorm potential solutions, and adjust their strategies accordingly. By thinking critically and reflecting on their experiences, entrepreneurs can navigate uncertainty and make informed decisions that lead to success.' },
            ],
          },
          {
            type: 'definition',
            heading: '5.8 Framework and Structures of Creativity',
            text: 'This explains how creativity grows and or researched and conceived as well as how areas of creativity interact with one another. Three ways have been identified to include the Four P (4Ps) framework, the Five A (5As) framework and the Five C (5Cs) framework.',
          },
          {
            type: 'text',
            heading: '5.8.1 The 4Ps structure',
            text: 'Was developed by Rhodes (1961) to evaluated the existing literature to see how creativity was investigated. He categorized everything about creativity into four major categories known as the Four Ps: Person, Product, Process, and Press (i.e., environment).',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Person', def: "emphasizes on the creative person's nature considers more broad intellectual habits such as openness, autonomy, expertise, inquisitive activity, etc." },
              { term: 'Product', def: 'assess creativity and the capacity to generate increasingly often include an emphasis on creative Product' },
              { term: 'Process', def: 'Theories focusing on process Cognitive methods that attempt to define thought systems and procedures for creative thinking have an emphasis on Process' },
              { term: 'Press or Place (or environment)', def: 'A emphasis on Place analyzes the conditions that foster creativity, such as degrees of autonomy, access to resources, and the type of gatekeepers.' },
            ],
          },
          {
            type: 'text',
            heading: '5.8.2 The 5As structure',
            text: 'This framework explains creativity from the point of 5As: Actors, Audiences, Actions, Artifacts, and Affordances, it addresses questions on any creative innovation such as whether or not do performers relate to their audiences, what socio-cultural and material affordances are made available by creative action, and whether or not do creative actors use existing artifacts to create new ones?',
          },
          {
            type: 'text',
            heading: '5.8.3 The 5Cs structure',
            text: 'The 4Ps and 5As are structures that investigate how creativity is operationalized, the 4Cs (mini-c, little-c, Pro-c, and Big-C) are more concerned with the person. "Mini-c" means one\'s personal and self-recognized significant and novel discovery; "Little c" means daily creativity; "Pro-c" mean one\'s personal significant and novel discovery recognized by others and the "Big-C" means one\'s brilliant creativity that remains a legacy for years after his or her death. The 4Cs framework is a developmental trajectory that begins with mini-c and end with the Big-C.',
          },
          {
            type: 'definition',
            heading: '5.9 Theories and drivers of creativity',
            text: 'Creativity can mean so many different things that simply cataloging the most-cited theories would be coherent. However, among these theories, there is reasonable consensus regarding the definition of creativity, which is that it is something both new and task-related. In spite of that, there is still no (successful or widely accepted) grand theory of creativity that takes into account every possible question, variable, or approach nor, truly, is there any particular need for one. Creativity is so complex and multi-faceted that any theory that tried to explain everything would be unwieldly to the point of being incomprehensible. Creativity theories vary greatly. This is apparent when one looks at the different views on creativity. This depends on the topic itself, which incorporates the many types of individual insight as well as the greatest achievements of human brilliance throughout history; this may be dubbed "the finest of the mind\'s work" (Perkins, 1981). The range of possible definitions, conceptualizations, domains, disciplines, research techniques, and degrees of analysis that reflect on the study of creativity, as well as fundamental and applied research orientations, greatly affects the variety of creative theories. However, it is hoped that creativity theorists will think carefully about what underlying question they are trying to address. A good theory tells a story and that is consistent with existing empirical research and suggests interesting questions that can be tested. A good theory will make the often-contradictory study easier to understand, instead of further muddying the waters. A sense of sameness across different viewpoints is absolutely vital in order to apply a unifying theory of creativity. Ten key theory types have been identified and arranged in order of importance thus: developmental, psychometric, economic, stage and componential process, cognitive, problem solving and expertise-based, problem finding, evolutionary, typological, and systems. Each category is discussed as follows:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Developmental Theories', def: 'By these theories, creativity is most practical. They consider all the many elements of creativity: person, location, and potential and focus more on products, while playing an essential, albeit often implicit, function in any creative expression.' },
              { term: 'Psychometric Theories', def: 'Psychometric theories deal with difficulties of assessment reliability and validity in any scientific study on creativity. Their methodology differs from previous theories of creativity in that they concentrate on measurement. Reliability represents consistency of measurement. It encompasses inter-judge reliability as well as inter-item dependability. Validity refers to the precision of measurement.' },
              { term: 'Economic Theories', def: 'Economic theories also give empirical ideas about creative endeavors. Wider groups will dampen collective creativity, for instance, because it is more difficult to be innovative when you have a larger audience. They anticipate that experts will be less flexible when it comes to alternative ideas that challenge their beliefs than less involved experts.' },
              { term: 'Stage and componential process – Theories', def: 'Some theories of the creative process offer phases, which might be sequential or recursive, or underlie componential cognitive processes. Such models put more emphasis on process and creative magnitude. An issue is defined before information is gathered and the process starts until it gets to discoveries and the "Eureka!" moments.' },
              { term: 'Cognitive Theories', def: "These theories highlight the significance of cognitive processes and place emphasis on the creative process, which involves using one's cognitive systems and exceptional cognitive talents to bring about conceptual product and creative achievement." },
              { term: 'Problem solving and expertise-based Theories', def: 'These theories are rooted on cognitive psychology, stress problem-solving processes and expert knowledge. Principal focus is on based largely on creative person and the creative process.' },
              { term: 'Problem finding Theories', def: 'Once creativity was applied to addressing problems, "problem finding" gained popularity. These theories argue that the standard problem-solving approach cannot sufficiently explain how creators discover that a problem exists, and how they are motivated to proactively go about addressing the problem.' },
              { term: 'Evolutionary Theories', def: 'These theories explain creativity based on evolutionary biology principles drawn from Darwin with the Darwinian theory (formerly known as "chance-configuration") being the most explanatory.' },
              { term: 'Typological Theories', def: 'These theories integrate the problem-solving/expertise and Darwinian perspectives of creativity. It is thus, a unified theory of creativity and it stresses variations in individual creative capacities rather than nomothetic tendencies.' },
              { term: 'Systems Theories', def: 'In contrast to theories previously mentioned, systems theories embrace a very wide and frequently highly qualitative approach to creativity. They conceive of creativity as originating from a complex system that includes all its component elements and has to be accounted for in order to accurately comprehend creativity.' },
            ],
          },
          {
            type: 'table',
            heading: 'Table 5.1: Summary of Theories of Creativity',
            headers: ['Creativity theories', 'Primary Assertion', 'Key Concepts', "Six P's Focus", 'Level of scale'],
            rows: [
              ['Developmental', 'Creativity develops over time (from potential to achievement); mediated by an interaction of person and environment.', 'Place and family structures; Role of play; Support during transitions; longitudinal process; Multivariate influences', 'Person, Place, Potential, & Product', 'Mini-c to Pro-c'],
              ['Psychometric', 'Creativity can be measured reliability and validity; differentiating it from related constructs (IQ) and highlighting its domain-specific nature', 'Reliable & valid measurement; Discriminant validity; Thresholds; Domain specificity', 'Primarily Product', 'Little-c to Big-C'],
              ['Economic', 'Creative ideation and behavior is influenced by "market forces" and cost-benefit analyses.', 'Influence of macro-level factors; Psychoeconomic perspective; Markets of creativity; Investment decisions', 'Person, Place, Product, & Persuasion', 'Little-c to Big-C'],
              ['Stage and Componential Process', 'Creative expression proceeds through a series of stages or components; the process can have linear and recursive elements', 'Preparation stages; Incubation and insight; Verification and evaluation; Component mechanisms', 'Primarily Process', 'Mini-c to Big-C'],
              ['Cognitive', 'Ideational thought processes are foundational to creative persons and accomplishments', 'Remote association; Divergent/convergent thinking; Conceptual combination, expansion; Metaphorical thinking, imagery; Meta-cognitive processes', 'Person & Process', 'Little-c to Big-C'],
              ['Problem Solving and Expertise-Based', 'Creative solutions to ill-defined problems result from a rational process, which relies on general cognitive processes and domain expertise.', 'Vague problems; Cognitive, computational approach; Expertise-based approaches; Problem depiction & heuristics', 'Person, Process, & Product', 'Little-c to Big-C'],
              ['Problem Finding', 'Creative people proactively engage in a subjective and exploratory process of identifying problems to be solved.', 'Subjective creative processes; Exploratory behaviors; On-line discovery', 'Process, Person, & Potential', 'Primarily Mini-c'],
              ['Evolutionary', 'Eminent creativity results from the evolutionary-like processes of blind generation and selective retention.', 'Chance-configuration; Blind generation of ideas; Selective retention of ideas; Equal-odds rule; Social judgment and chance', 'Person, Process, Place, & Product', 'Primarily Big-C'],
              ['Typological', 'Creators vary along key individual differences, which are related to both macro- and micro-level factors and can be classified via typologies.', 'Individual differences; Categories of creators; Seekers versus finders; Integrate multiple levels of analysis', 'Primarily Person; but also Process, Product, & Place', 'Little-c to Big-C'],
              ['Systems', 'Creativity results from a complex system of interacting and interrelated factors.', 'Evolving systems; Network of enterprises; Domain and field; Gatekeepers; Collaborative Creativity; Chaos and Complexity', "Varying emphasis across all P's", 'Little-c to Big-C'],
            ],
          },
          {
            type: 'text',
            text: 'Source: From cited literatures',
          },
          {
            type: 'text',
            text: "From the above explanations, theories of creativity explain the drivers and forms of creativity and what makes a creative individual. In other words, theories of creativity (particularly investigation of why some people are more creative than others) have focused on various aspects of creativity. Creative individuals and teams must be a part of an innovative culture. Individuals' and teams' creativity is encouraged in cultures that are innovation-oriented.",
          },
          {
            type: 'definition',
            heading: '5.10 Types of creative contribution',
            text: 'Contributors who are creative have varied choices on how to show their talent. We developed a propulsion theory of creative contributions (Sternberg, 1999b; Sternberg, Kaufman, & Pretz, 2001, 2002) to address the question of how people select where to invest their creative resources. Taxonomy of creative contributions must address not just the question of whether a contribution is creative in what domain, but also what sort of creative contribution it is (Gardner, 1993). A creative contribution is an attempt to move a field from where it is to where the creator feels it should be. Thus, by definition, creativity is propulsion. It shifts a field from one location to another. It is also usually associated with a decision to exert leadership. The creator attempts to lead people to a certain place in the multidimensional creative realm. The endeavor might succeed or fail. Depending on how the creator decides to be creative, he or she may strive to practice various types of creative leadership. The propulsion model proposes eight different sorts of contributions to an area of endeavor at any one moment as categorized below:',
          },
          {
            type: 'text',
            heading: '5.10.1 Contributions that accept current paradigms:',
            text: 'These include replication, redefinition, forward incrementation and advance forward incrementation. Replication is the act of imitating or duplicating but ensuring that the field remains in its correct form. Redefinition is an attempt to redefine where the field is and how it is viewed or a reinterpretation of the field in terms of its current state. Incrementation (or forward Incrementation) - is an act making innovative contribution to moving the field ahead in the direction it is already headed. For example, the propulsion causes the vehicle to move ahead. Advance forward Incrementation - is an act of advancing the field beyond the point where others are ready for it to go. In other words, this is an incrementation in the direction of the future.',
          },
          {
            type: 'text',
            heading: '5.10.2 Contributions that reject current paradigms:',
            text: 'These are redirection, reconstruction / redirection, re-initiation. Redirection - this is a re-direction of resources which moves the field in a new or different direction. Reconstruction / redirection - is an attempt to bring the field back to where it previously was (a reconstruction of the past), in order for it to continue ahead from that point, but in a different path from the one it followed from that moment onward. Re-initiation/Starting over is an attempt to move the field to a different and as yet not reached starting point and then to move the field in a different direction from that point.',
          },
          {
            type: 'text',
            heading: '5.10.3 Paradigms that attempt to integrate multiple current paradigms:',
            text: 'This involves only one type of creative contribution called "Integration" otherwise called "synergetic creativity". It synthesizes current paradigms by combining two or more diverse ways of thinking about the field into a single way of thinking. It is an act of re-starting the process.',
          },
          {
            type: 'definition',
            heading: '5.11 Attributes of creative personality',
            text: 'A creative personality is characterized by the ability to think outside the box, come up with innovative solutions, and take risks. This trait is essential for entrepreneurs to differentiate themselves from competitors, create unique products or services, and adapt to changing market conditions. These attributes as follows:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Energetic', def: 'Creative individuals radiate energy' },
              { term: 'Intelligent', def: 'A clever person is also creative' },
              { term: 'Sensitive', def: 'Creative individuals also are more subservient. They are empathetic because their hearts are always open to the world. Many things cause them to weep' },
              { term: 'Ambitious', def: 'Creatives are ambitious in their goals. They have an eagerness to move on to the next endeavor. Nothing daunts their desire to try something new' },
              { term: 'Naive', def: "Creatives are frequently subservient. It's perfectly safe to be naive, because it helps creatives learn from their mistakes and develop." },
              { term: 'Rebellious', def: 'Most creative people are rather rebellious. They take chances and not frightened to fail since they recognize the positive aspects of failure.' },
              { term: 'Extroverted and Introverted', def: 'Can someone be both outgoing and introverted? Yes, they can. Creative individuals have two sides, their private and public side. Extroversion has its benefits, so does introversion. Creative people accept new ideas and see the benefits of finding the proper balance between extroversion and introversion.' },
              { term: 'Playful', def: 'It is in our nature to be fun. They experiment with ideas until they find the solution. Nothing good happens by design' },
              { term: 'Open minded', def: 'If anybody is open-minded, it is your creative buddy, or anyone who is creative in our world. Open-mindedness encourages creatives to climb mountains and explore mysterious regions.' },
              { term: 'Dreamer', def: "Never-ending creativity. They daydream the whole day, in their heads continually, in the evening, and the next day, too. They dream because they're motivated, and their dreams reflect that reality" },
            ],
          },
          {
            type: 'definition',
            heading: '5.12 Obstacle to creative thinking',
            text: 'Everyone possesses powerful creative talents and capabilities, but they have to be unlocked. There are six key behavioral factors that could be hindering your efforts to boost your corporate problem-solving abilities. One of these people might be holding you back.',
          },
          {
            type: 'bullets',
            items: [
              'Lack of direction from yourself or others:',
              'The fear of failure:',
              'Fear of rejection:',
              'Never changing or adapting to the situation.',
              'Not thinking proactively.',
              'You rationalize, but never improve:',
            ],
          },
          {
            type: 'definition',
            heading: '5.13 Summary and Conclusion',
            text: 'Successful entrepreneurs are able to balance critical thinking and creative thinking. They use critical thinking to analyze data, assess market trends, and make informed decisions, while also utilizing creative thinking to come up with innovative ideas, design unique products, and create compelling marketing strategies. Reflective thinking is a valuable skill that can greatly benefit entrepreneurs in their quest for success. By actively engaging in reflective thinking, entrepreneurs can learn from their experiences, adapt to changing circumstances, and ultimately increase their chances of achieving their goals. One key aspect of entrepreneurial thinking is the ability to take risks and think creatively. Another important aspect of entrepreneurial thinking is the ability to adapt to change and embrace uncertainty. Critical thinking and creative thinking are indispensable skills for entrepreneurs who aspire to build thriving businesses in today\'s dynamic and competitive landscape. Entrepreneurs must be willing to take risks, think creatively, and adapt to change in order to thrive in a competitive and rapidly changing environment. By fostering a mindset that is always looking for new opportunities and ways to innovate, entrepreneurs can set themselves apart and achieve great success. By combining critical and creative thinking, and also reflective thinking, entrepreneurs can develop a winning business strategy, adapt to changing market conditions, and seize opportunities for growth. Finally, the attribute of a creative personality in entrepreneurship is essential for driving innovation, differentiation, and success in the business world. Entrepreneurs who possess this trait are better equipped to navigate the challenges of the entrepreneurial journey and capitalize on opportunities to create value for their customers and society as a whole. By cultivating and honing their creative skills, entrepreneurs can unlock their full potential and achieve sustainable growth and success in their ventures.',
          },
          {
            type: 'bullets',
            heading: 'References',
            items: [
              'Baer, J. (2011). Why grand theories of creativity distort, distract, and disappoint. International Journal of Creativity and Problem Solving, 21(1), 73-100.',
              'Barron, F. (1955). The disposition toward originality. The Journal of Abnormal and Social Psychology, 51(3), 478.',
              'Couros, A. (2003). Innovation, change theory and the acceptance of new technologies: A literature review. Unpublished manuscript.',
              'Damiano Jr., R.J. (2011). What is innovation? Innovations: Technology and Techniques in Cardiothoracic and Vascular Surgery, 6(2), 65.',
              'Hennessey, B. A., & Amabile, T. M. (2010). Creativity. Annual Review of Psychology, 61, 569-598.',
              'Naiman, R. J. (Ed.). (2012). Watershed management: balancing sustainability and environmental change. Springer Science & Business Media.',
              'Okpara, F. (2005). The Practice of Entrepreneurship. Precision Publishers Limited, Enugu, Nigeria.',
              'Simonton, D. K. (2012). Teaching creativity: Current findings, trends, and controversies in the psychology of creativity. Teaching of Psychology, 39(3), 217-222.',
            ],
          },
        ],
      },
      {
        number: '6',
        title: 'Innovations and Change Management',
        sections: [
          {
            type: 'text',
            text: 'Authors: Nseabasi I. Etukafia, PhD and Mr. Michael Efiom',
          },
          {
            type: 'definition',
            heading: '6.1 Introduction',
            text: "Innovation and change management are critical components of entrepreneurship, particularly in today's rapidly evolving global landscape. There are however, a number of thoughts and perspectives regarding innovations and change management. But, like most concepts in management sciences, little consensus exists on what are actually are and because this has proven to be a never-ending subject of dispute, this chapter is devoted to discussing these concepts in order to demystify and simplify it for any interested person. As a result, in this chapter, we describe and cover all of the most significant issues in innovation and change management.",
          },
          {
            type: 'definition',
            heading: '6.2 The concept of innovation',
            text: 'There is scarcely a business event or discussion these days that does not include the phrase "Innovation." Innovation is the process of transforming an idea or invention into a product or service that adds value or for which people will pay. It is the process by which organizations use their skills and resources to develop new goods and services or to develop new production and operating systems so that they can better respond to the needs of their customers. To be considered an innovation, a concept must be repeatable at a low cost and must meet a specific need. According to Sagagi et al. (2020), the concept of innovation and its corollary development encompasses five tasks or functions:',
          },
          {
            type: 'bullets',
            items: [
              'Innovation is the process of taking new ideas effectively and profitability through to satisfy customers.',
              'Innovation is the successful exploration of new ideas; it is a profitable outcome of the creative process, which involves generating and applying in a specific context product, services, procedures, and processes that are desirable and viable.',
              'Innovation is the process of creating a commercial product from an invention.',
              'Innovation is the post hoc recognition of creativity, involving a new and valuable discovery of some kind. In other words, innovation can only be said to have taken place after the event. It is an outcome phenomenon.',
              'Innovation is the specific tool of entrepreneurs, the means by which they exploit change as an opportunity for a different business or service. It is capable of being presented as a discipline, capable of being learned, and capable of being practiced.',
            ],
          },
          {
            type: 'text',
            text: 'The above definition and explanation of innovation clearly shows how importance entrepreneurs consider innovation. According to Okpara (2005) as cited in Sagagi et al. (2020), the following aspects of innovation are present in the definition of innovation:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Challenge', def: 'what we are trying to change or accomplish-the-"pull".' },
              { term: 'Customer focus', def: 'creating value for your customers-the "push".' },
              { term: 'Creativity', def: 'generating and sharing the idea(s)- the "brain"' },
              { term: 'Communication', def: 'The flow of information and ideas-the "life blood"' },
              { term: 'Collaboration', def: 'people coming together to work together on the idea(s)- the "heart"' },
              { term: 'Completion', def: 'implementing the new idea- the muscle"' },
              { term: 'Contemplation', def: 'learning and sharing lesson lead to higher competency - the "ladder"' },
              { term: 'Culture', def: 'the playing field of innovation includes:' },
              { term: 'Leadership', def: 'sees the possibilities and positions of the team for action- the role model' },
              { term: 'People', def: 'diverse groups of radically empowered people innovate-the source of innovation.' },
              { term: 'Basic values', def: 'trust and respect defines and distinguish innovation organization-the backbone' },
              { term: 'Innovation values', def: 'certain values stoke the fire that makes the "impossible" possible-the spark.' },
              { term: 'Context', def: 'innovation is shaped by interactions with the world' },
            ],
          },
          {
            type: 'text',
            text: 'As can be seen from the examples above, innovation may be defined as a strategic instrument that is required for organizational survival. It is equally crucial to note that creativity precedes innovation. Simply said, companies seek to achieve and maintain a competitive edge via innovation. There three basic forms where innovation exist:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Process innovation', def: 'including modifications and technique enhancement. These all lead to increased production, which reduces costs and helps to boost demand.' },
              { term: 'Product or service innovation', def: 'While progressive innovation predominates, radical innovation creates new markets. This leads to a rise in effective demand, which stimulates further investment and job creation.' },
              { term: 'Management and work organization innovation', def: 'as well as human resource exploitation, and the ability to anticipate approaches' },
            ],
          },
          {
            type: 'definition',
            heading: '6.3 Types of Innovation',
            text: 'Because the environment and consumer demands continually change, organizations must be able to adjust different aspects of their business to fix growing problems and create new value for customers. Because of this, understanding which innovations a corporation has to pursue allows them to identify the most suited ones. Disruptive, gradual, radical, and sustaining innovations are common ways to categorized innovation. Innovation may be characterized in several other ways, and some of those classifications overlap. It is possible to group innovation according to two dimensions: the underlying technology and the specific market. The innovation matrix is useful in visualizing different forms of innovation thus:',
          },
          {
            type: 'table',
            heading: 'Innovation Matrix (Impact on the Market × Technology Newness)',
            headers: ['', 'Low Technology Newness', 'High Technology Newness'],
            rows: [
              ['High Impact on the Market', 'Sustaining: A significant improvement on a productive that aims to sustain the position in an existing market.', 'Disruptive: Technology or new business model that disrupts the existing market.'],
              ['Low Impact on the Market', 'Incremental: Gradual, continuous improvements on existing products and services.', 'Radical: Technological breakthrough that transforms industries, often creates a new market.'],
            ],
          },
          {
            type: 'text',
            text: 'The above four categories of innovation in the innovation matrix are commonly used to describe the technology a new innovation employs and the effects it has on the market. To generate actionable outcomes, innovation should be addressed holistically. In this section, additional kinds of innovation may be utilized to improve and unlock new value across the organization.',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Product innovation', def: 'Innovation and product improvement go hand in hand, and are far and away the most prevalent forms of innovation. It can employ components that are not used in prior products.' },
              { term: 'Service innovation', def: 'This refers to a new or significantly improved service concept, product, or process in a new or existing market. It could be a new customer interaction or distribution channel, a system that improves the delivery process, or new customer interface solutions.' },
              { term: 'Process innovation', def: 'A process brings together all of the things required to create goods or offer services, Process innovation typically means implementing a new or improved manufacturing or delivery technique.' },
              { term: 'Technological innovation', def: 'Entails the incorporation of new or improved technology, such as a new type of machinery or the modification of some form of technology into a product, process, or method of service delivery' },
              { term: 'Marketing innovation', def: 'People must be able to locate and benefit from an innovation for it to be successful. The primary goal of marketing innovation is to expand into new markets or gain market share.' },
              { term: 'Architectural innovation', def: 'The reconfiguration of current product technology that results in an improvement in how components, some of which are not necessarily creative when joined, are integrated. Networked computer systems and flexible manufacturing systems are examples' },
              { term: 'Social innovation', def: 'Social innovations are innovative practices or technical breakthroughs that attempt to better fulfill social demands than existing solutions.' },
            ],
          },
          {
            type: 'definition',
            heading: '6.4 Dimensions of innovations',
            text: 'As mentioned before innovation can be classified into many different classes and into two categories. Now we can continue to divide innovation to smaller dimensions popularly called "The 4Ps of innovation space" namely process, position, product and paradigm (Francis & Bessant, 2005; Tidd & Bessant, 2009).',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Product innovation (first P of the 4Ps)', def: 'is the easiest to understand. It means changes in the things which an organization offers.' },
              { term: 'Process innovation (second P of 4Ps)', def: "is also quite easy to understand. It means changes in the organization's processes. In the other words it means changes in the ways in which organization is created and delivered." },
              { term: 'Position innovation (third P of 4Ps)', def: 'to understand needs some thinking and it is not as clear as the first two innovation types. It means changes in the context in which the products/services are introduced.' },
              { term: 'The last P', def: 'is meaning for paradigm innovation. It is by far the hardest to understand. Changes in the underlying mental models which frame what the organization does.' },
            ],
          },
          {
            type: 'text',
            text: 'In the above framework every innovation can be mapped somewhere in the four-dimension space. First two dimensions, product and process, are the most common innovation dimensions that exist.',
          },
          {
            type: 'definition',
            heading: '6.5 Sources of Innovation',
            text: 'There are innovations that result from a stroke of brilliance. Most inventions, particularly successful ones, are the product of a deliberate, purposeful search for innovation possibilities, which are found only in a few settings. Within a firm or industry, four such areas of opportunity exist: unexpected occurrences, incongruities, process needs, and industry and market shifts. Outside of a company\'s social and intellectual context, three more sources of opportunity exist: demographic changes, changes in perception, and new knowledge. These sources overlap, as distinct as they are in terms of risk, difficulty, and complexity and the potential for innovation may reside in more than one area at the same time. They do, however, account for the vast majority of all innovation opportunities. However, the sources of innovation include: (i) unexpected occurrences, (ii) incongruities of various kinds, (iii) process needs, (iv) changes in an industry or market, (v) demographic changes (vi) changes in perceptions, and (vii) new knowledge.',
          },
          {
            type: 'definition',
            heading: '6.6 Innovation management',
            text: 'This is the process of handling all the actions needed to "bring anything new," which in reality involves things like generating ideas, developing, prioritizing, and executing them, as well as introducing new procedures. It involves making decisions, doing actions, and implementing the innovation plan. Innovation management thus covers all measures to foster innovation and produce value. Examples are new products to serve new markets better products and services to compete to mention but a few. Four aspects of innovation management are:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Capabilities', def: 'This is a catch-all phrase for all the varied capabilities and resources the company has to support innovation.' },
              { term: 'Structures', def: 'The difference between structures and capabilities is that structures permit efficient utilization of the specified skills. This practice means the organizational structure, methods, and infrastructure.' },
              { term: 'Culture', def: 'Culture is what enables the company to gain the qualities relevant to individuals. Culture has a significant role in whether or not the company is able to recruit and retain the proper individuals. A pro-innovation environment fosters proper conduct and discourages the opposite.' },
              { term: 'Strategy', def: 'Finally, strategy is the long-term goals of the company. But what is essential to comprehend is that strategy is about making a conscious choice from a variety of plausible choices with the aim of having the highest chance of "winning."' },
            ],
          },
          {
            type: 'text',
            text: 'Innovation management is the process of planning, organizing, implementing and monitoring the development of new products, services, processes or business models that create value for customers, stakeholders and the organization. Innovation management involves identifying opportunities, generating ideas, selecting and testing solutions, scaling and diffusing innovations, and evaluating their impact and performance. Innovation management requires a combination of creativity, strategic thinking, collaboration, risk-taking and learning from failures. Simply glancing at the definition clarifies everything about the word. Innovation management is essentially the process of devising and implementing innovative approaches to the business, no matter how. Innovation management involves managing both innovation processes and change management.',
          },
          {
            type: 'definition',
            heading: '6.7 Change and Change Management',
            text: "Change in the organization (nay organizational change) is the process by which organizations move from their present state to some desired future state to increase their effectiveness. Change is described as the process of organization's transformation and modification of those factors that maintain system behavior. It is both an internal and external makeover for organizations. Most entrepreneurs and company managers are accustomed to the idea of continual change and so they must monitor and adapt to it correctly. However, the reality remains that for entrepreneurs to respond effectively to these developments, they must first comprehend the reasons behind these shifts. And they must accept that change is required and must be able to manage or deal with it, hence the need for change management. Change management is the process of planning, implementing and evaluating changes in an organization. Change management aims to achieve desired outcomes, minimize risks and disruptions, and increase stakeholder acceptance and support. Change management can involve changes in strategy, structure, culture, technology, processes, policies, or people. Change management requires a clear vision, effective communication, stakeholder involvement, and continuous monitoring and feedback.",
          },
          {
            type: 'definition',
            heading: '6.8 Forces Responsible for Change',
            text: 'Entrepreneurs must recognize and understand the variables that bring change within the business environment where they carry out their business operations. Entrepreneurs can discover a number of alternatives open to them to acquire competitive advantage because they grasp the dynamics that bring about change. These forces responsible for change are:',
          },
          {
            type: 'bullets',
            items: [
              'Economic factors',
              'Change in technology',
              'Social causes',
              'Political and legal changes and',
              'Intense competition',
            ],
          },
          {
            type: 'definition',
            heading: '6.9 Resistance to change',
            text: 'An entrepreneur tends to resist change since it is simpler to follow well-established and learned pathways than it is to alter or learn and adapt to new techniques where the consequences may not be as predictable. Some of the variables that contribute to entrepreneur reluctance to change are as follows:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Uncertainty about the Impact of Change', def: 'Uncertainty about the impact of change is one of the primary reasons why an entrepreneur may oppose change. An entrepreneur, for example, might fight the change if it may entail an adverse shift in government policy affecting its company operations or problems encountered when compelled to relocate.' },
              { term: 'Economic Implications', def: "When compelled to relocate, an entrepreneur would fight the move since it may influence the cost of obtaining a new location, client loss, which may damage his/her market share or profit, and, in certain circumstances, the cost of operation." },
              { term: 'Lack of Proper Communication', def: 'If the need for change is not communicated to entrepreneurs and small company owners in a timely and appropriate way, it might result in resistance.' },
              { term: 'The Group Resistance', def: 'Individual entrepreneurs and small company owners may oppose change because the group to which they belong does. Individual entrepreneurs typically adhere to group norms and rules and support collective attitudes.' },
              { term: 'Emotional Reasons', def: "One of the primary reasons for an entrepreneur's aversion to change is the emotional anguish that a change may bring, especially if previous experiences with changes have not been beneficial." },
            ],
          },
          {
            type: 'definition',
            heading: '6.10 Critical change areas',
            text: 'A brief outline of what the future may hold for change in small business operations in seven critical areas of planning during the current world economic environment are as follows:',
          },
          {
            type: 'termlist',
            items: [
              { term: 'Capital', def: 'It will grow more difficult and expensive to get, and many small firms may find it almost impossible to obtain at any price.' },
              { term: 'Raw materials', def: 'They will also become more expensive and difficult to get. Smaller businesses may need to rely on greater inventories or move to more plentiful replacements.' },
              { term: 'Labor', def: "This is a company's most abundant resource. Scarce capital will be replaced by abundant labor." },
              { term: 'Technology', def: 'In the future, technology will be more crucial to small businesses than it has been in the past.' },
              { term: 'Markets', def: 'Markets based on items that use huge amounts of more expensive resources will tend to decrease, whereas markets based on products that make fewer demands on irreplaceable resources or actively preserve them will likely to thrive.' },
              { term: 'Government regulation', def: 'As government regulatory agencies fight to keep the country wealthy, regulation is probably guaranteed to rise.' },
              { term: 'Management', def: 'Entrepreneurs will need to be more competent and foresighted if they are to steer the small company sector through the economic downturn' },
            ],
          },
          {
            type: 'definition',
            heading: '6.11 Change management strategies',
            text: "In today's world, the one constant that surrounds us is change. It is no different in business. Employees may find this difficult to handle and unpleasant. Among the techniques for dealing with change resistance are:",
          },
          {
            type: 'termlist',
            items: [
              { term: 'Education and Communication', def: 'If entrepreneurs do not have enough knowledge about government policy pertaining to their company operations, or if the information they do have is erroneous, it is important to educate them about the change, its process, and its functioning. Training sessions, seminars, and conferences can all be used to provide this information.' },
              { term: 'Participation and Involvement', def: 'Involvement of entrepreneurs and small company owners in changes to government policy affecting their operations will guarantee commitment to the execution of such reform.' },
              { term: 'Negotiation and Agreement', def: 'Managing change opposition necessitates negotiation and agreement with all relevant parties.' },
              { term: 'Timing of Change', def: 'The time of change has a large impact on the amount of change resistance. When there is a need for organizational transformation, entrepreneurs should select a moment when the organizational environment is most conducive to change.' },
              { term: 'Leadership', def: "The entrepreneur's reputation and status may inspire workers to participate in the change process." },
            ],
          },
          {
            type: 'definition',
            heading: '6.12 Change and innovations management contrasted',
            text: 'Innovation management and change management are related but distinct concepts. Innovation management focuses on generating and implementing new ideas that create value for customers or stakeholders, while change management focuses on managing the transition from the current state to the desired state.',
          },
          {
            type: 'table',
            heading: 'Table 1: Differences between Innovation and Change management in Entrepreneurship',
            headers: ['Innovation Management', 'Change Management'],
            rows: [
              ['Proactive: Seeks to create new opportunities or solve existing problems', 'Reactive: Responds to changes that have already occurred or are inevitable'],
              ['Exploratory: Experimenting with different possibilities, testing assumptions, and learning from failures', 'Explanatory: Explaining the rationale, benefits, and impacts of the change, and addressing concerns and objections'],
              ['Creative: Generating novel and useful ideas, challenging conventional wisdom, and thinking outside the box', 'Analytical: Assessing the current situation, identifying gaps and risks, and planning and executing actions.'],
              ['Divergent: Encourages diversity of opinions, perspectives, and solutions', 'Convergent: Seeks alignment, consensus, and commitment.'],
            ],
          },
          {
            type: 'text',
            text: 'However, innovation management and change management also have some similarities. They both:',
          },
          {
            type: 'bullets',
            items: [
              'aims to improve the performance or competitiveness of the organization,',
              'involve people and processes, they both require communication and collaboration, and',
              'face challenges such as resistance to change, lack of resources, or organizational inertia.',
            ],
          },
          {
            type: 'text',
            text: 'Therefore, innovation management and change management should not be seen as separate or competing activities, but rather as complementary and interdependent ones. Innovation can trigger change, and change can enable innovation. A successful organization needs both innovation and change capabilities to adapt to changing customer needs, market conditions, technological trends, or regulatory requirements.',
          },
          {
            type: 'definition',
            heading: '6.13 Knowledge and innovation',
            text: 'Knowledge and innovation are two pivotal elements in the realm of entrepreneurship, yet they serve distinct purposes. Innovation refers to the process of developing new ideas or improving existing products and services, thereby driving entrepreneurial success. In contrast, knowledge encompasses the information, skills, and expertise that entrepreneurs possess or acquire through experience and education. While innovation is often viewed as a catalyst for economic growth and competitive advantage, knowledge serves as a foundation that enhances the effectiveness of innovative endeavors. Thus, knowledge and innovation are foundational pillars of entrepreneurship, driving both individual ventures and regional economic development. As highlighted by Kraus (2021), entrepreneurial activity, especially during its nascent stages, is heavily dependent on innovative practices that stimulate economic growth. The interplay between knowledge and innovation varies across different types of enterprises and underscores the necessity for firms to cultivate an environment where knowledge sharing and innovative thinking thrive, thus enhancing overall performance. For instance, family-owned small and medium-sized enterprises (SMEs) often rely on both innovation and knowledge to achieve high performance levels. Thus, the relationship between knowledge and innovation is said to be pronounced in family-owned businesses because family firms often leverage their unique knowledge dynamics to gain a competitive advantage in innovation (McDowell, 2013). Research indicates that while innovation is crucial for all SMEs, knowledge plays an especially significant role in family businesses by augmenting the impact of innovative activities. This distinction highlights how various organizational contexts can influence the relationship between these two critical components of entrepreneurship.',
          },
          {
            type: 'definition',
            heading: '6.14 Summary and Conclusion',
            text: 'Innovations and change management are critical components in the evolution of organizations. Effective change in in organizations necessitates a nuanced understanding of individual behaviors, as acceptance is paramount for successful implementation. Innovation thrives in collaborative environments where communication is prioritized. Successful change management requires early engagement of employees, enabling them to contribute actively to innovation processes. Thus, integrating effective change management strategies with innovative practices is vital for entrepreneurial success in a dynamic world.',
          },
          {
            type: 'bullets',
            heading: 'References',
            items: [
              'Al-Shammari, M., Aziz, W. A., & Jasimuddin, S. M. (2023). Emerging trends in innovation management and entrepreneurship development in the 21st century: issues, challenges, and opportunities. Frontiers in Psychology, 14, 1145727.',
              'Chatzinikolaou, D., & Vlados, C. (2022). Crisis, innovation and change management: a blind spot for micro-firms? Journal of Entrepreneurship in Emerging Economies, 16(3), 698-719.',
              'Damiano Jr., R.J. (2011). What is innovation? Innovations: Technology and Techniques in Cardiothoracic and Vascular Surgery, 6(2), 65.',
              'Dormant, D. (2011). The Chocolate Model of Change. San Bernardino, CA.',
              'Drucker, P. (1985). Innovation and entrepreneurship. New York: HarperCollins.',
              'Hall, G. E. (1979). The concerns-based approach to facilitating change. Educational Horizons, 57(4), 202-208.',
              'Hisrich, R.D., Peters, M.P & Shepherd, D.A. (2008). Entrepreneurship (7th edition). Singapore: McGraw-Hill.',
              'Kraus, S., McDowell, W., Ribeiro-Soriano, D. E., & Rodríguez-García, M. (2021). The role of innovation and knowledge for entrepreneurship and regional development. Entrepreneurship & Regional Development, 33(3-4), 175-184',
              'Liu, S., Zhou, Y., Wang, C., & Yu, Y. (2022). The influence of entrepreneurship on the innovation path of cultural enterprises under the background of digital transformation. Frontiers in Psychology, 13, 892348.',
              'Milella, F., Minelli, E. A., Strozzi, F., & Croce, D. (2021). Change and innovation in healthcare: findings from literature. Clinico Economics and outcomes research, 395-408.',
              'Misra, D. K., Hill, L. A., Laroia, G., & Hamacher, C. (2024). A Better Way to Unlock Innovation and Drive Change. MIT Sloan Management Review, 66(1), 31-35.',
              'Price, D. P., Stoica, M., & Boncella, R. J. (2013). The relationship between innovation, knowledge, and performance in family and non-family firms: an analysis of SMEs. Journal of innovation and Entrepreneurship, 2, 1-20.',
              'Rogers, E. M. (2003). Diffusion of innovations, 5th ed. New York: Free Press',
              'Sriboonnark, N. (2021). Innovation and Change Management. RICE Journal of Creative Entrepreneurship and Management, 1(3), 36-45.',
              'Zimmermer, T.W., Scarborough, N.M. and Wilson, D. (2008). Essentials of entrepreneurship and small business management. (5th edition). New Jersey: Prentice Hall.',
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'COS 221',
    slug: 'cos-221',
    title: 'Computer Programming II',
    units: 3, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    hasInteractiveModules: true,
    interactiveTrackPath: '/tracks/java',
    interactiveLabel: 'Java',
    interactiveModuleCount: 13,
    description: 'Advanced programming building on COS 211: deeper object-oriented programming (polymorphism, abstract classes, interfaces), the Collections API, searching/sorting/recursion, event-driven and GUI programming. Bridges programming skills and the algorithmic thinking required for security tool development.',
    topics: [
      'Advanced OOP review: polymorphism, abstract classes, and interfaces',
      'Class hierarchies and programme organization using packages/namespaces',
      'Collections API: iterators/enumerators, List, Stack, Queue',
      'Searching and sorting algorithms',
      'Recursive algorithms',
      'Event-driven programming: event-handling methods and event propagation',
      'Exception handling',
      'Graphical User Interface (GUI) programming',
    ],
    textbooks: [
      { title: 'Data Structures and Algorithms in Java', authors: 'Robert Lafore', note: '2nd ed. — beginner-friendly bridge from COS 211' },
      { title: 'Introduction to Algorithms (CLRS)', authors: 'Cormen, Leiserson, Rivest, Stein', note: '4th ed. — the definitive algorithms reference' },
    ],
    searchTerms: [
      'Data structures and algorithms full course Java freeCodeCamp',
      'Big O notation explained for beginners',
      'Sorting algorithms visualised comparison',
      'VisuAlgo data structures animations free',
    ],
    studyTips: [
      'VisuAlgo (visualgo.net) provides free visual animations for every data structure — use it constantly',
      'Implement every data structure from scratch at least once — never just read about it',
      'Trace sorting algorithms step by step on a 5-element array by hand before every exam',
      'Areté Java modules cover the programming foundation; use them for the Java component of this course',
    ],
  },
  {
    code: 'INS 224',
    slug: 'ins-224',
    title: 'Systems Analysis and Design',
    units: 3, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'ins',
    crossDepartmental: true,
    description: 'A structured approach to analysing information system needs and designing solutions: the software development lifecycle, top-down and bottom-up design, dataflow diagramming, entity-relationship modelling, and file/database and user-interface design.',
    topics: [
      'Structured approach to analysis and design of information systems for businesses',
      'Software development lifecycle (SDLC)',
      'Structured top-down and bottom-up design',
      'Dataflow diagramming and entity-relationship modelling',
      'Computer-aided software engineering (CASE)',
      'Input/output, prototyping design and validation',
      'File and database design',
      'Design of user interfaces',
      'Comparison of structured and object-oriented design',
    ],
    textbooks: [
      { title: 'Systems Analysis and Design', authors: 'Kenneth Kendall & Julie Kendall', note: '10th ed. — most widely used globally' },
      { title: 'Modern Systems Analysis and Design', authors: 'Hoffer, George & Valacich', note: '8th ed. — strong practical coverage' },
    ],
    searchTerms: [
      'System analysis and design full course tutorial',
      'Data flow diagram DFD tutorial step by step',
      'Entity relationship diagram ER tutorial',
      'System development lifecycle phases explained',
    ],
    studyTips: [
      'DFDs and ER diagrams are the most commonly examined topics — practise drawing them from scratch',
      'Use DRAW.IO (free, online) to practise system diagrams until speed and accuracy improve',
      'Normalisation (1NF, 2NF, 3NF) has a logical pattern — understand it conceptually before memorising rules',
      'Relate everything to a real system you interact with (a bank app, university portal) to aid understanding',
    ],
    lectureNotes: [
      {
        number: '1',
        title: 'Introduction to System Analysis and Design',
        sections: [
          {
            type: 'definition',
            heading: 'What is a System?',
            text: 'The term “system” originates from the Greek word “systema”. A system is an orderly grouping of interdependent components linked together to achieve a specific goal. According to Wasson, a system is an integrated set of interoperable elements — each with explicitly specified and bounded capabilities — working synergistically to perform value-added processing that satisfies user operational needs in a prescribed environment with a specified outcome.',
          },
          {
            type: 'bullets',
            heading: 'Basic Components of a System',
            items: [
              'Resources',
              'Procedures or rules',
              'Data or information',
              'Processes or functions',
            ],
          },
          {
            type: 'bullets',
            heading: 'Properties of a System',
            items: [
              'Organization',
              'Interaction',
              'Interdependence',
              'Integration',
              'Central Objective',
            ],
          },
          {
            type: 'text',
            heading: 'System Diagram',
            text: 'A typical system can be visualised as a process: Input is fed into a System (function), which produces Output. A crucial part of the model is Feedback — information from the output is fed back into the system to adjust its functions and ensure the desired outcome.',
          },
          {
            type: 'termlist',
            heading: 'Elements of a System',
            items: [
              { term: 'Input', def: 'data or resources entering the system' },
              { term: 'Processor', def: 'the component that transforms input into output' },
              { term: 'Output', def: 'the results or products generated by the system' },
              { term: 'Control', def: 'mechanisms that guide the system’s operation and ensure it meets its objectives, including boundaries and interactions' },
              { term: 'Feedback', def: 'information about the system’s output returned to the input or control mechanisms to adjust performance' },
            ],
          },
          {
            type: 'note',
            text: 'The control element guides the system’s operation — for example, the behaviour of a computer is controlled by its operating system. In a dynamic system, feedback control provides this control.',
          },
          {
            type: 'definition',
            heading: 'System Analysis',
            text: 'System analysis is a problem-solving technique: the process of collecting and interpreting facts, identifying problems, and decomposing a system into its components or sub-systems.',
          },
          {
            type: 'definition',
            heading: 'System Design',
            text: 'System design is the planning of a new business system — or the replacement of an existing one — by defining its components or modules to satisfy specific requirements. System analysis and design is a systematic process that includes planning, analysis, design, deployment, and maintenance.',
          },
          {
            type: 'termlist',
            heading: 'Types of Systems',
            items: [
              { term: 'Open System', def: 'interacts freely with external factors in its environment' },
              { term: 'Closed System', def: 'contained within itself; does not interact with the environment' },
              { term: 'Information Management / Computerised System', def: 'an interconnected set of resources used to manage data for a particular organisation under direct management' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Categories of Information Systems',
            items: [
              { term: 'Strategic Information', def: 'used for long-term planning and management' },
              { term: 'Managerial Information', def: 'an organised collection of people, procedures, databases, and devices that provides routine information to managers' },
              { term: 'Operational Information', def: 'day-to-day operational data captured and used by lower-level management to enforce daily activities; highly structured' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Qualities of a System Analyst',
            items: [
              'A problem solver',
              'Business-oriented',
              'Has strong analytical skills',
              'Inquisitive and eager to learn new technologies',
              'Possesses the technical skills to understand existing business processes',
            ],
          },
        ],
      },
      {
        number: '2',
        title: 'Feasibility Study',
        sections: [
          {
            type: 'definition',
            heading: 'Feasibility Study',
            text: 'A feasibility study determines whether a proposed system is achievable, practical, and justified. It is a formal evaluation of a proposed project that examines whether the solution is technically possible, economically justified, operationally reliable, legally compliant, and achievable within the desired timeframe. Its output is a feasibility report, which recommends proceeding with, modifying, or abandoning the project.',
          },
          {
            type: 'text',
            heading: 'Problem Identification',
            text: 'Problem identification involves recognising that a problem exists, understanding its nature, and defining what the system is expected to address. A problem is any gap between the current state of a system and the desired state.',
          },
          {
            type: 'bullets',
            heading: 'How Problems Manifest',
            items: [
              'Inefficiency in business processes',
              'Inaccurate and inaccessible information',
              'High operational costs due to manual effort',
              'Failure to meet regulatory or compliance requirements',
              'Poor user satisfaction with an existing system',
            ],
          },
          {
            type: 'bullets',
            heading: 'What to State in Problem Identification',
            items: [
              'What the problem is',
              'Where it occurs',
              'Who is affected',
              'When it occurs',
              'Why it matters',
            ],
          },
          {
            type: 'note',
            text: 'A common pitfall is confusing symptoms with root causes. Symptoms are the observable effects of an underlying problem, while root causes are the actual sources of the dysfunction.',
          },
          {
            type: 'termlist',
            heading: 'Fact-Finding Techniques',
            items: [
              { term: 'Interviews', def: 'structured, unstructured, or semi-structured discussions with stakeholders' },
              { term: 'Questionnaires and Surveys', def: 'used to collect data from a larger group' },
              { term: 'Observation', def: 'directly observing processes and user interactions' },
              { term: 'Document Review', def: 'analysing existing documents, reports, and records' },
              { term: 'Joint Application Development (JAD)', def: 'collaborative workshops involving users and developers' },
              { term: 'Prototyping', def: 'developing preliminary versions of the system to gather feedback' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Types of Feasibility',
            items: [
              { term: 'Technical Feasibility', def: 'whether the system can be built and implemented with existing technology and resources — e.g. whether a hospital’s real-time patient-monitoring technology is available and can be integrated' },
              { term: 'Economic Feasibility', def: 'a cost-benefit analysis determining whether the benefits outweigh the costs' },
              { term: 'Operational Feasibility', def: 'whether the system will work effectively within the organisation’s existing environment and meet user needs' },
              { term: 'Legal Feasibility', def: 'whether the system complies with all applicable laws, regulations, contractual obligations, and ethical standards' },
              { term: 'Schedule Feasibility', def: 'whether the project can be completed within the required or desired timeframe' },
            ],
          },
          {
            type: 'note',
            text: 'The feasibility types are interconnected. For example, a retail company planning an AI-powered stock-management system would run a brief study across every dimension, identifying at least one concern per dimension.',
          },
        ],
      },
      {
        number: '3',
        title: 'Software Development Life Cycle (SDLC)',
        sections: [
          {
            type: 'definition',
            heading: 'Software Development Life Cycle (SDLC)',
            text: 'The SDLC is a structured, systematic process used by software engineers and project teams to plan, create, test, deploy, and maintain software systems. It defines a series of well-defined phases — each with specific activities, deliverables, and roles — that guide a project from initial conception through to retirement.',
          },
          {
            type: 'text',
            heading: 'Why “Life Cycle”?',
            text: 'The term is deliberate: software, like a living organism, has a life span. It is born (planned and built), matures (deployed and used), ages (maintained and updated), and is eventually retired (replaced or decommissioned).',
          },
          {
            type: 'bullets',
            heading: 'The Seven SDLC Phases',
            items: [
              'Planning',
              'Analysis',
              'Design',
              'Implementation',
              'Testing',
              'Deployment',
              'Maintenance',
            ],
          },
          {
            type: 'note',
            text: 'SDLC phases are the fundamental activities that must occur in any software project; SDLC models (such as the Waterfall and Agile models) determine how and in what order those phases are executed.',
          },
          {
            type: 'termlist',
            heading: 'Planning Phase',
            items: [
              { term: 'Core question', def: '“Should we build this system?”' },
              { term: 'Key activities', def: 'feasibility studies, project scope definition, resource and schedule planning, risk assessment, and deliverables identification' },
            ],
          },
          {
            type: 'text',
            heading: 'Analysis Phase',
            text: 'Once a project is approved, the team turns to a deep understanding of what the system must accomplish. The analysis phase gathers, documents, and validates the requirements that form the detailed description of what the software must do.',
          },
          {
            type: 'termlist',
            heading: 'Types of Requirements',
            items: [
              { term: 'Functional Requirements', def: 'describe what the system does — its behaviour, features, and functions' },
              { term: 'Non-Functional Requirements', def: 'describe how well the system performs — quality attributes such as performance, security, reliability, scalability, usability, and maintainability' },
            ],
          },
          {
            type: 'text',
            heading: 'Design Phase',
            text: 'With a clear understanding of what the system must do, the design phase addresses how it will be done, translating requirements into a blueprint for construction — just as an architect produces detailed plans before builders break ground.',
          },
          {
            type: 'termlist',
            heading: 'Levels of Design',
            items: [
              { term: 'High-Level Design (Architectural Design)', def: 'decomposition of the system into sub-systems or modules, selection of architectural patterns, definition of interfaces between major components, and technology-stack decisions' },
              { term: 'Low-Level Design (Detailed Design)', def: 'data structures and algorithms, database schema design, UI wireframes and screen layouts, and detailed class, sequence, and state diagrams' },
            ],
          },
        ],
      },
      {
        number: '4',
        title: 'Software Development Models — Overview',
        sections: [
          {
            type: 'definition',
            heading: 'Introduction',
            text: 'Software development models provide structured approaches to managing the complexity of building software systems. This unit covers the main models studied in System Analysis and Design: the Waterfall, Spiral, V-Model, Incremental, Evolutionary, and Prototype models — including the phases, advantages, disadvantages, and when each one is best used.',
          },
          {
            type: 'bullets',
            heading: 'Models Covered',
            items: [
              'Waterfall Model — linear, sequential',
              'Spiral Model — risk-driven and iterative',
              'V-Model — verification and validation',
              'Incremental Model — delivered in functional increments',
              'Evolutionary Model — software that evolves with feedback',
              'Prototyping Model — refine a working model with the user',
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'The Waterfall Model',
        sections: [
          {
            type: 'definition',
            heading: 'The Waterfall Model',
            text: 'A traditional, linear-sequential approach where each phase must be completed and reviewed before the next can begin. The output of one phase is the input to the next, giving a structured, phase-by-phase progression.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/waterfall.webp',
            width: 1100, height: 768,
            caption: 'Figure 1: Waterfall Model — linear sequential phases',
          },
          {
            type: 'bullets',
            heading: 'Phases',
            items: [
              'Requirements Analysis and Specification',
              'Design',
              'Development (Implementation / Coding)',
              'Testing and Deployment',
              'Maintenance',
            ],
          },
          {
            type: 'termlist',
            heading: 'Phases in Detail',
            items: [
              { term: 'Requirements Analysis and Specification', def: 'gather, analyse, and validate all functional and non-functional requirements, producing a formal Software Requirement Specification (SRS) that acts as the project blueprint' },
              { term: 'Design', def: 'translate the SRS into a system design — High-Level Design (HLD) for the overall architecture and Low-Level Design (LLD) for each component — documented in a Software Design Document (SDD)' },
              { term: 'Development (Coding)', def: 'convert the design into working source code; individual modules are built and unit-tested in isolation' },
              { term: 'Testing and Deployment', def: 'integration, system, and acceptance testing confirm the software meets requirements, after which it is released to the production environment with setup and user training' },
              { term: 'Maintenance', def: 'keep the software working after release — corrective (fixing bugs), perfective (enhancing features), and adaptive (adjusting to new environments) maintenance' },
            ],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: [
              'Simple to understand and manage due to its clear structure',
              'Works well when requirements are well understood and stable',
              'Produces extensive documentation, useful for knowledge transfer and maintenance',
              'Easy to estimate time and cost at the outset',
            ],
            disadvantages: [
              'Very inflexible — accommodating changes mid-project is costly and disruptive',
              'Customer sees the working product only at the very end, risking misalignment',
              'Defects discovered late (during testing) are expensive to fix',
              'Not suitable for complex or long-duration projects where requirements evolve',
            ],
          },
          {
            type: 'bullets',
            heading: 'When to Use',
            items: [
              'When requirements are constant and not changed regularly',
              'When the application is small, simple, and not complicated',
              'When the tools and technology used are consistent and stable',
            ],
          },
        ],
      },
      {
        number: '6',
        title: 'The Spiral Model',
        sections: [
          {
            type: 'definition',
            heading: 'The Spiral Model',
            text: 'Proposed by Barry Boehm in 1986, the Spiral Model is a risk-driven, iterative process that combines the Waterfall Model with iterative prototyping, emphasising risk analysis at each stage. It is well suited to large, complex projects where risks are high and requirements may evolve. Each loop of the spiral is a complete development cycle divided into four quadrants.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/spiral.webp',
            width: 1100, height: 1165,
            caption: 'Figure 2: Spiral Model — risk-driven iterative development (Boehm, 1986)',
          },
          {
            type: 'bullets',
            heading: 'Quadrants (Phases)',
            items: [
              'Objectives Determination and Planning',
              'Risk Analysis and Resolution',
              'Development and Testing (Engineering)',
              'Review and Planning (Evaluation)',
            ],
          },
          {
            type: 'termlist',
            heading: 'Quadrants in Detail',
            items: [
              { term: 'Objectives Determination and Planning', def: 'define the goals, requirements, and constraints for this iteration and produce a detailed plan of tasks, schedules, and responsibilities' },
              { term: 'Risk Analysis and Resolution', def: 'the most critical quadrant — identify, analyse, and mitigate technical and management risks, using prototypes, simulations, or feasibility studies before major investment' },
              { term: 'Development and Testing (Engineering)', def: 'design, code, and thoroughly test the selected features, producing a working version (prototype, module, or incremental release)' },
              { term: 'Review and Planning (Evaluation)', def: 'stakeholders (including the customer) evaluate the increment; feedback decides whether to continue, modify the plan, or stop, and the next iteration is planned' },
            ],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: [
              'Effective risk handling at every phase',
              'Suitable for large, mission-critical, and complex projects',
              'Changing requirements can be accommodated, even at later stages',
              'Early customer feedback through extensive use of prototypes',
              'Iterative development allows gradual refinement',
              'Regular reviews foster better communication between stakeholders',
            ],
            disadvantages: [
              'Complex to manage and requires highly particular risk-analysis expertise',
              'Can be a costly model to use',
              'Does not work well for smaller, low-risk projects',
              'The spiral may continue indefinitely if not properly managed',
              'A large number of spiral stages requires excessive documentation',
            ],
          },
        ],
      },
      {
        number: '7',
        title: 'The V-Model',
        sections: [
          {
            type: 'definition',
            heading: 'The V-Model',
            text: 'Also called the Verification and Validation Model, the V-Model is an extension of the Waterfall Model that pairs each development phase with a corresponding testing phase. The V-shape shows testing activities being planned in parallel with development, with coding at the bottom joining the two sides.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/vmodel.webp',
            width: 1100, height: 637,
            caption: 'Figure 3: V-Model — verification and validation lifecycle',
          },
          {
            type: 'bullets',
            heading: 'Verification Phases (Left Side)',
            items: [
              'Business Requirement Analysis — overall system requirements from a business perspective',
              'System Design — business requirements translated into system-level specifications',
              'Architectural Design — high-level design: modules and their interactions',
              'Module Design — detailed design of each individual module',
            ],
          },
          {
            type: 'bullets',
            heading: 'Validation Phases (Right Side)',
            items: [
              'Unit Testing — tests individual modules',
              'Integration Testing — tests interaction between integrated modules',
              'System Testing — tests the complete system against the system design',
              'Acceptance Testing — tests the system against business requirements with user involvement',
            ],
          },
          {
            type: 'text',
            heading: 'Connecting Phase — Coding',
            text: 'At the bottom of the V, the detailed module designs are converted into actual source code by developers, joining the verification (left) and validation (right) branches.',
          },
          {
            type: 'note',
            text: 'Each validation (testing) phase verifies its matching design phase: Unit Testing ↔ Module Design, Integration Testing ↔ Architectural Design, System Testing ↔ System Design, and Acceptance Testing ↔ Business Requirement Analysis.',
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: [
              'Proactive defect tracking — defects are found at an early stage',
              'Each phase has a corresponding test phase, giving a clearer understanding of requirements and design',
              'Test cases are designed early, increasing the chance of a successful product',
            ],
            disadvantages: [
              'Inflexible to changes once development has started',
              'Limited for large, complex projects with unclear or changing requirements',
              'Produces no early prototypes, delaying customer feedback',
            ],
          },
        ],
      },
      {
        number: '8',
        title: 'The Incremental Model',
        sections: [
          {
            type: 'definition',
            heading: 'The Incremental Model',
            text: 'Software is built and delivered in small, functional increments. Requirements are divided into standalone modules; each module passes through requirement, design, implementation, and testing phases, and every subsequent release adds functionality to the previous one until the complete system is achieved.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/incremental.webp',
            width: 1100, height: 503,
            caption: 'Figure 4: Incremental Model — phased delivery per increment',
          },
          {
            type: 'bullets',
            heading: 'Phases (per increment)',
            items: [
              'Requirement Gathering and Analysis',
              'Design',
              'Implementation',
              'Testing',
            ],
          },
          {
            type: 'termlist',
            heading: 'Phases in Detail',
            items: [
              { term: 'Requirement Gathering and Analysis', def: 'collect and analyse all functional and non-functional requirements, then prioritise and divide them into manageable sets for each increment' },
              { term: 'Design', def: 'design the architecture and detailed design for the current increment — algorithms, DFDs, activity/class diagrams, and database design' },
              { term: 'Implementation', def: 'translate the design into source code using programming frameworks and languages' },
              { term: 'Testing', def: 'test the performance of each existing feature plus the newly added functionality, ensuring new features do not break existing ones' },
            ],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: [
              'Easier to test and debug smaller increments',
              'Risks are handled during each iteration',
              'Changes are easier and less expensive to implement',
              'Early delivery of operational software lets customers use core functions sooner',
            ],
            disadvantages: [
              'May require more resources due to continuous iterations',
              'Needs well-defined module interfaces and a clear architectural vision',
              'Architectural problems can arise if requirements are not collected upfront',
              'Project completion dates can be uncertain as requirements evolve',
            ],
          },
          {
            type: 'bullets',
            heading: 'When to Use',
            items: [
              'When core requirements are clearly understood but quick releases of prioritised features are needed',
              'For projects with long development schedules',
              'Common for web applications and product-based companies',
            ],
          },
          {
            type: 'note',
            text: 'In the source notes one disadvantages list is labelled “Iterative Model” even though it appears under the Incremental Model — the Iterative and Incremental models are closely related, which explains the overlap.',
          },
        ],
      },
      {
        number: '9',
        title: 'The Evolutionary Process Model',
        sections: [
          {
            type: 'definition',
            heading: 'The Evolutionary Process Model',
            text: 'A general term for iterative models that let software evolve over time — also called the successive version model. The requirement is first broken into several parts that are built incrementally, taking customer feedback at each stage, on the understanding that requirements often change and the software must change with them.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/evolutionary.webp',
            width: 1100, height: 1099,
            caption: 'Figure 5: Evolutionary Process Model — iterative refinement cycle',
          },
          {
            type: 'bullets',
            heading: 'Types of Evolutionary Models',
            items: [
              'The Prototyping Model',
              'The Spiral Model (see Topic 6)',
              'The Incremental and Iterative models are also commonly grouped here',
            ],
          },
          {
            type: 'bullets',
            heading: 'Characteristics',
            items: [
              'Iterative and incremental — each iteration adds or refines functionality',
              'Actively incorporates customer feedback throughout',
              'Highly adaptable to changing requirements and evolving needs',
              'Manages risk by refining the system in smaller, manageable steps',
            ],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: [
              'Useful for very large products with unclear upfront requirements',
              'Continuous user involvement builds customer confidence',
              'Users gain early experience with partially developed software',
              'Thorough testing of core modules reduces errors and overall cost',
            ],
            disadvantages: [
              'Managing multiple iterations and evolving requirements is complex',
              'Requires careful resource management and coordination across iterations',
              'Scope can expand indefinitely without proper control',
            ],
          },
        ],
      },
      {
        number: '10',
        title: 'The Prototyping Model',
        sections: [
          {
            type: 'definition',
            heading: 'The Prototyping Model',
            text: 'An evolutionary approach where a working model (prototype) of the system is built to understand requirements better, then refined through iterations based on user feedback until the final system is developed.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/prototyping.webp',
            width: 1100, height: 1238,
            caption: 'Figure 6: Prototyping Model — iterative prototype refinement',
          },
          {
            type: 'bullets',
            heading: 'Phases',
            items: [
              'Requirement Gathering',
              'Quick Design',
              'Build Prototype',
              'Customer Evaluation of Prototype',
              'Refinement and Iteration',
            ],
          },
          {
            type: 'termlist',
            heading: 'Phases in Detail',
            items: [
              { term: 'Requirement Gathering', def: 'gather basic requirements, focusing on core functionality and UI needs rather than exhaustive detail' },
              { term: 'Quick Design', def: 'create a preliminary, non-final blueprint representing the key aspects of the system' },
              { term: 'Build Prototype', def: 'build a working prototype, possibly with limited functionality or low fidelity, to demonstrate key features' },
              { term: 'Customer Evaluation', def: 'the customer interacts with the prototype and gives feedback on functionality, usability, and missing or incorrect features' },
              { term: 'Refinement and Iteration', def: 'refine the prototype and repeat until the customer is satisfied; the result either evolves into the final system or is discarded and rebuilt from the refined requirements' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Types of Prototyping',
            items: [
              { term: 'Throwaway Prototyping', def: 'a prototype built quickly to elicit requirements, then discarded; the final system is built from scratch' },
              { term: 'Evolutionary Prototyping', def: 'the prototype is progressively refined until it becomes the final system' },
              { term: 'Incremental Prototyping', def: 'multiple prototypes are built for different subsystems and then integrated into the complete product' },
              { term: 'Extreme Prototyping', def: 'common in web development — three layers built in sequence: static prototype, simulated services, then real services' },
            ],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: [
              'Does not require full upfront knowledge of inputs, outputs, and processes',
              'Good where requirements are changing',
              'Customers are actively involved, improving satisfaction',
              'Errors and design flaws are detected much earlier',
              'Flexible design and effective communication among the team',
            ],
            disadvantages: [
              'Requires significant client involvement, which is not always feasible',
              'Can be costly and time-consuming, especially with frequent changes',
              'Documentation is often poor as requirements change frequently',
              'Users may confuse the prototype with the final system',
              'Developers may become overly attached to the prototype',
            ],
          },
        ],
      },
      {
        number: '11',
        title: 'The Agile Model',
        date: 'Prof. Victor Ekong',
        sections: [
          {
            type: 'definition',
            heading: 'What is the Agile Model?',
            text: 'The Agile model is a modern, iterative, and incremental approach to software development that prioritises flexibility, collaboration, and delivering working software over comprehensive documentation. It emerged as a response to the rigidity and documentation-heaviness of traditional models like Waterfall, building software in short iterations of 1 to 4 weeks so that development stays aligned with changing business needs.',
          },
          {
            type: 'bullets',
            heading: 'Core Ideas',
            items: [
              'Builds software incrementally using short iterations of 1 to 4 weeks.',
              'Aligns the development process with changing business needs.',
              'Uses frequent feedback — a workable product is delivered after each 1 to 4 week iteration instead of lengthy timelines.',
              'Emphasises flexibility, continuous improvement, customer collaboration, and rapid delivery.',
            ],
          },
          {
            type: 'bullets',
            heading: 'The Agile Manifesto',
            items: [
              'Individuals and interactions over processes and tools — prioritise communication, collaboration, and teamwork.',
              'Working software over comprehensive documentation — functional software matters more than excessive documents.',
              'Customer collaboration over contract negotiation — customers are involved throughout development.',
              'Responding to change over following a plan — Agile supports changing requirements even during development.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Agile Principles',
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
            heading: 'Agile Model Flow',
            text: 'The Agile model flow consists of iterative sprints. Each sprint contains Sprint Planning → Development → Demo → Test → Deployment (optional). This cycle repeats (Sprint 1, Sprint 2 … Sprint N) until the final deployment.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/agile_model_flow.webp',
            width: 1485, height: 885,
            caption: 'Figure 1: Agile Model Flow — repeating sprint cycle from planning to deployment',
          },
          {
            type: 'bullets',
            heading: 'Agile Software Development Life Cycle',
            items: [
              'Requirement Gathering',
              'Sprint — Planning',
              'Sprint — Design',
              'Sprint — Development',
              'Sprint — Testing',
              'Sprint — Deployment',
              'Review and Feedback',
            ],
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/agile_sdlc.webp',
            width: 1185, height: 1035,
            caption: 'Figure 2: Agile SDLC — stages from requirement gathering through review and feedback',
          },
          {
            type: 'bullets',
            heading: 'Design & Development',
            items: [
              'Design — prepare the system architecture.',
              'Design — develop interface designs.',
              'Design — plan databases and modules.',
              'Development — coding and implementation.',
              'Development — continuous integration.',
              'Development — collaboration among developers.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Testing & Deployment',
            items: [
              'Testing runs continuously throughout development: unit testing.',
              'Integration testing.',
              'System testing.',
              'Acceptance testing.',
              'Deployment — release working software incrementally.',
              'Deployment — deliver updates regularly.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Review & Feedback',
            items: [
              'Collect customer feedback.',
              'Evaluate sprint performance.',
              'Improve future iterations.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Agile Team Structure',
            items: [
              'Scrum Master',
              'Product Owner',
              'Development Team (cross-functional team)',
            ],
          },
          {
            type: 'text',
            heading: 'Scrum Master',
            text: 'A Scrum Master is a team leader and facilitator who helps team members follow Agile practices so they can meet their commitments.',
          },
          {
            type: 'bullets',
            heading: 'Responsibilities of the Scrum Master',
            items: [
              'Enable close co-operation between all roles and functions.',
              'Remove any blocks.',
              'Shield the team from any disturbances.',
              'Work with the organisation to track the progress and processes of the company.',
              'Ensure Agile inspect-and-adapt processes are leveraged properly — daily stand-ups, planned meetings, demo, review, and retrospective meetings — and facilitate team meetings and decision-making.',
            ],
          },
          {
            type: 'text',
            heading: 'Product Owner',
            text: 'A Product Owner drives the product from a business perspective.',
          },
          {
            type: 'bullets',
            heading: 'Responsibilities of the Product Owner',
            items: [
              'Define the requirements and prioritise their values.',
              'Determine the release date and contents.',
              'Take an active role in iteration planning and release planning meetings.',
              'Ensure the team is working on the most valued requirement.',
              'Represent the voice of the customer.',
              'Accept the user stories that meet the definition of done and the defined acceptance criteria.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Development Team',
            items: [
              'A self-sufficient team of 5 to 9 members, averaging 6 to 10 years of experience.',
              'Typically 3 to 4 developers.',
              '1 tester.',
              '1 technical lead.',
              '1 product owner.',
              '1 scrum master.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Agile Frameworks',
            items: [
              'Scrum',
              'Kanban',
              'Extreme Programming (XP)',
              'SAFe (Scaled Agile Framework)',
            ],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages of Agile',
            advantages: [
              'Highly responsive to changing requirements; ideal for dynamic environments.',
              'Continuous delivery of value through working software.',
              'Improved product quality due to frequent testing and review.',
              'Strong customer involvement reduces the risk of building the wrong product.',
              'High team morale through collaboration, transparency, and regular achievements.',
            ],
            disadvantages: [
              'Difficult to predict final cost and timeline upfront due to evolving scope.',
              'Requires a highly engaged and available customer/Product Owner.',
              'Not ideal for projects where requirements must be completely defined upfront.',
              'Documentation may be insufficient, creating challenges for maintenance.',
              'Scaling Agile to large teams or organisations is complex.',
            ],
          },
          {
            type: 'bullets',
            heading: 'When to Use the Agile Model',
            items: [
              'When startups and product companies build software in uncertain, competitive markets.',
              'When projects have rapidly changing or unclear requirements.',
              'When building web and mobile applications.',
              'When you have a team of experienced, self-disciplined analysts and developers.',
            ],
          },
        ],
      },
      {
        number: '12',
        title: 'The Scrum Framework',
        date: 'Prof. Victor Ekong',
        sections: [
          {
            type: 'text',
            heading: 'The Scrum Model',
            text: 'Scrum is the most widely used Agile framework. Work flows from the Product Backlog → Sprint Backlog → Daily Scrum Meeting (a 24-hour loop within a 2–4 week sprint) → finished work ready for production deployment.',
          },
          {
            type: 'image',
            src: '/lecture-notes/ins-224/scrum_agile_model.webp',
            width: 1635, height: 735,
            caption: 'Figure 3: The Scrum model — from product backlog to a production-ready increment',
          },
          {
            type: 'bullets',
            heading: 'How Scrum Works',
            items: [
              'Work is divided into fixed-length iterations called Sprints (typically 1–4 weeks).',
              'The Product Backlog contains all desired features, prioritised by the Product Owner.',
              'At the start of each sprint, the team selects items for the Sprint Backlog.',
              'Daily stand-up meetings (Daily Scrum) keep the team aligned.',
              'At the end of each sprint, a working increment is demonstrated (Sprint Review).',
              'The team reflects on the process (Sprint Retrospective) and improves.',
            ],
          },
          {
            type: 'definition',
            heading: 'Scrum Artifact: Product Backlog',
            text: 'A set of functional and non-functional product requirements — a prioritised list of all features, requirements, enhancements, bug fixes, and tasks needed to develop the software. It serves as the main source of work for the Agile development team.',
          },
          {
            type: 'bullets',
            heading: 'Why the Product Backlog Matters',
            items: [
              'Keeps all requirements centralised (organises project requirements).',
              'Ensures important features are developed first (prioritises development tasks).',
              'Provides a shared understanding of project goals (guides Agile development).',
              'Allows changes and new requirements to be added easily.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Contents of the Product Backlog',
            items: [
              'User stories',
              'New features',
              'Bug fixes',
              'Technical tasks',
              'Security improvements',
              'Performance enhancements',
              'Documentation requirements',
            ],
          },
          {
            type: 'table',
            heading: 'Example: Product Backlog (Online Shopping System)',
            headers: ['Priority', 'Backlog Item'],
            rows: [
              ['High', 'User login system'],
              ['High', 'Payment gateway integration'],
              ['Medium', 'Product search feature'],
              ['Medium', 'Email notifications'],
              ['Low', 'Dark mode interface'],
            ],
          },
          {
            type: 'definition',
            heading: 'Scrum Artifact: Sprint Backlog',
            text: 'A subset of the product backlog containing the specific tasks and user stories the team commits to completing within a particular sprint.',
          },
          {
            type: 'bullets',
            heading: 'Characteristics of the Sprint Backlog',
            items: [
              'Short-term work plan.',
              'Updated daily.',
              'Focused on sprint goals.',
              'Owned by the development team.',
              'Flexible during the sprint.',
            ],
          },
          {
            type: 'bullets',
            heading: 'Components of the Sprint Backlog',
            items: [
              'User stories',
              'Tasks',
              'Bug fixes',
              'Technical enhancements',
              'Estimated effort or time',
            ],
          },
          {
            type: 'bullets',
            heading: 'Why the Sprint Backlog Matters',
            items: [
              'Helps developers understand assigned tasks clearly.',
              'Allows teams to monitor completed and pending tasks.',
              'Keeps the team focused on delivering sprint objectives.',
              'Encourages communication among Agile team members.',
            ],
          },
          {
            type: 'table',
            heading: 'Example: Sprint Backlog (E-commerce Website)',
            headers: ['Task', 'Status'],
            rows: [
              ['Design login page', 'In Progress'],
              ['Implement payment API', 'Pending'],
              ['Test shopping cart', 'Completed'],
              ['Fix checkout bug', 'Pending'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Characteristics of Scrum',
            items: [
              'Iterative and incremental: working software is delivered at the end of every sprint.',
              'Customer collaboration: the Product Owner is continuously involved.',
              'Self-organising teams: small (5–9 members), cross-functional, and empowered.',
              'Adaptive: requirements can change between sprints based on feedback.',
              'Test-driven: testing is embedded throughout each sprint, not a separate phase.',
            ],
          },
          {
            type: 'table',
            heading: 'Comparison of the SDLC Models',
            headers: ['Criterion', 'Waterfall', 'Spiral', 'Incremental', 'Prototyping', 'Agile'],
            rows: [
              ['Approach', 'Linear, sequential', 'Iterative + risk-driven', 'Incremental delivery', 'Prototype-based iteration', 'Iterative, incremental'],
              ['Flexibility', 'Very low', 'Moderate', 'Moderate', 'Moderate to high', 'Very high'],
              ['Customer Involvement', 'Beginning and end only', 'Each iteration', 'After each increment', 'Throughout prototype cycles', 'Continuous (daily/weekly)'],
              ['Risk Management', 'Weak', 'Excellent (core focus)', 'Moderate', 'Moderate', 'Moderate (via sprints)'],
              ['Requirements', 'Must be fixed upfront', 'Can evolve per spiral', 'Partially fixed', 'Clarified via prototype', 'Continuously refined'],
              ['Delivery', 'Single, at the end', 'Multiple prototypes then final', 'Working product per increment', 'Prototype + final system', 'Working software every sprint'],
              ['Documentation', 'Heavy', 'Moderate to heavy', 'Moderate', 'Light', 'Light'],
              ['Project Size', 'Small to medium', 'Large, complex', 'Medium to large', 'Small to medium', 'Small to large'],
              ['Cost Predictability', 'High', 'Low to moderate', 'Moderate', 'Low', 'Dynamic, fast-changing'],
              ['Best For', 'Stable, well-defined projects', 'High-risk, novel projects', 'Partial early delivery needed', 'Unclear requirements', 'Dynamic, fast-changing projects'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Key Observations',
            items: [
              { term: 'Requirements stability', def: 'The primary axis of differentiation. Waterfall demands stable requirements; Agile thrives on change. Spiral manages risk formally, while Prototyping uses a working model to clarify requirements.' },
              { term: 'Customer involvement', def: 'Correlates with success. Models with more frequent customer contact (Agile, Prototyping) better meet actual user needs — but require customers who are available and engaged.' },
              { term: 'Risk', def: 'Handled most rigorously by the Spiral model, making it uniquely suited for high-stakes or technically novel projects. Other models handle risk implicitly or reactively.' },
              { term: 'Documentation', def: 'Heaviest in Waterfall and lightest in Agile. Waterfall documentation aids long-term maintenance; Agile speed can create challenges when team members leave.' },
              { term: 'Cost and schedule predictability', def: 'Highest in Waterfall (with truly stable requirements) and lowest in Agile. For fixed-bid contracts or regulatory compliance, Waterfall or Incremental may be preferable.' },
            ],
          },
        ],
      },
      {
        number: '13',
        title: 'Conclusion & References',
        sections: [
          {
            type: 'text',
            heading: 'Conclusion',
            text: 'Each model suits different situations: Waterfall for stable requirements, Spiral for complex high-risk projects, the V-Model for strong verification and validation, Incremental and Evolutionary models for staged delivery and changing requirements, Prototyping for clarifying requirements through early working models, and Agile for fast-changing, collaborative projects that value working software over heavy documentation. Choosing a model depends on project size, complexity, risk, clarity of requirements, and the flexibility needed.',
          },
          {
            type: 'bullets',
            heading: 'References',
            items: [
              'GeeksforGeeks — Waterfall Model (Software Engineering)',
              'GeeksforGeeks — Spiral Model in Software Engineering',
              'GeeksforGeeks — SDLC V-Model (Software Engineering)',
              'GeeksforGeeks — Incremental Process Model (Software Engineering)',
              'GeeksforGeeks — What are Evolutionary Process Models?',
              'GeeksforGeeks — Prototyping Model (Software Engineering)',
              'GeeksforGeeks — Agile Software Development & the Scrum Framework',
            ],
          },
        ],
      },
      {
        number: '14',
        title: 'Requirement Analysis',
        sections: [
          {
            type: 'definition',
            heading: 'What is Requirement Analysis?',
            text: 'Requirement analysis is the second phase of every SDLC model. It determines what a software system must do before any design or coding begins.',
          },
          {
            type: 'table',
            heading: 'SDLC Phases, Key Questions, and Primary Outputs',
            headers: ['SDLC Phase', 'Key Question Answered', 'Primary Output'],
            rows: [
              ['Planning / preliminary investigation', 'Is the project feasible and worth pursuing?', 'Feasibility report, project charter'],
              ['Requirement analysis', 'What must the software system do?', 'Requirement specification'],
              ['System design', 'How will the system be built?', 'Architecture, data and interface design'],
              ['Implementation', 'How is the design translated into code?', 'Working software modules'],
              ['Testing', 'Does the system meet the requirement?', 'Test report, defect logs'],
              ['Maintenance', 'How is the system kept useful over time?', 'Change request set, patches, upgrades'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Types of System Requirement',
            items: [
              { term: 'Functional requirement', def: 'Describes what the system must do — its features, its behaviour, the data manipulation expected of it, and the rules it must support.' },
              { term: 'Non-functional requirement', def: 'Also called a quality attribute. Deals with how well the system must perform its functions, setting measurable targets for qualities such as performance, usability, reliability, and security.' },
            ],
          },
          {
            type: 'table',
            heading: 'Non-Functional Requirement Categories',
            headers: ['Category', 'Description', 'Example'],
            rows: [
              ['Performance', 'Speed, throughput, response time', 'The system shall return search results within 2 seconds under normal load.'],
              ['Reliability', 'Availability, fault tolerance, MTBF', 'The system shall be available 99.5% of the time during business hours.'],
              ['Usability', 'Ease of learning', 'A first-time user shall be able to complete registration without training.'],
              ['Security', 'Protection of data and access control', 'The system shall enforce role-based access control for all administrative functions.'],
              ['Scalability', 'Ability to grow with demand', 'The system shall support up to 10,000 concurrent users with graceful degradation.'],
              ['Maintainability', 'Ease of modification and support', 'Modules shall follow a documented coding standard to ease future maintenance.'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Requirement Analysis Process',
            items: [
              'Requirement elicitation',
              'Requirement analysis and negotiation',
              'Requirement specification (documentation)',
              'Requirement validation',
            ],
          },
        ],
      },
    ],
    quiz: [
      { question: "The word 'system' originates from the Greek word 'systema'. What does a system most accurately describe?", options: ["A single isolated component", "Any individual piece of physical computer hardware", "A list of unrelated tasks", "An orderly grouping of interdependent components linked to achieve a specific goal"], correctIndex: 3, explanation: "A system is an orderly grouping of interdependent components working together toward a specific goal." },
      { question: "In the input-process-output model, which element feeds output information back to adjust the system's functions?", options: ["Feedback", "Processor", "Control", "Boundary"], correctIndex: 0, explanation: "Feedback returns information about the output to the input or control mechanisms so the system can adjust its performance." },
      { question: "Which element of a system transforms input into output?", options: ["Control", "Processor", "Feedback", "Output stage"], correctIndex: 1, explanation: "The processor is the component that transforms input into output." },
      { question: "What distinguishes an open system from a closed system?", options: ["An open system has no feedback", "A closed system is always larger", "An open system interacts freely with its environment; a closed system does not", "An open system cannot be implemented as a computerised system"], correctIndex: 2, explanation: "An open system interacts freely with external factors in its environment, while a closed system is contained within itself." },
      { question: "System analysis is best described as:", options: ["The activity of writing the final production source code for the finished system", "Buying hardware", "Marketing the software", "A problem-solving technique that collects and interprets facts and decomposes a system into sub-systems"], correctIndex: 3, explanation: "System analysis collects and interprets facts, identifies problems, and decomposes a system into its components or sub-systems." },
      { question: "Which category of information is highly structured and used by lower-level management for day-to-day activities?", options: ["Operational information", "Strategic-level information", "Managerial information", "Archival information"], correctIndex: 0, explanation: "Operational information is the highly structured day-to-day data used by lower-level management to run daily activities." },
      { question: "What is the primary output of a feasibility study?", options: ["The completed software product delivered to the customer", "A feasibility report recommending to proceed, modify, or abandon", "The source code", "A marketing plan"], correctIndex: 1, explanation: "A feasibility study produces a feasibility report that recommends proceeding with, modifying, or abandoning the project." },
      { question: "A cost-benefit analysis to check whether benefits outweigh costs is which type of feasibility?", options: ["Technical feasibility", "Legal feasibility", "Economic feasibility", "Schedule feasibility"], correctIndex: 2, explanation: "Economic feasibility uses cost-benefit analysis to determine whether the benefits outweigh the costs." },
      { question: "Checking whether a system can be built with existing technology and resources is which feasibility type?", options: ["Operational feasibility", "Legal feasibility", "Economic feasibility", "Technical feasibility"], correctIndex: 3, explanation: "Technical feasibility assesses whether the system can be built and implemented with existing technology and resources." },
      { question: "Ensuring a system complies with applicable laws, regulations, and contractual obligations is:", options: ["Legal feasibility", "Schedule feasibility", "Operational feasibility", "Technical feasibility"], correctIndex: 0, explanation: "Legal feasibility checks compliance with laws, regulations, contracts, and ethical standards." },
      { question: "In problem identification, a 'problem' is defined as:", options: ["Any bug or defect discovered in the program code", "A gap between the current state of a system and the desired state", "A hardware failure", "A missing document"], correctIndex: 1, explanation: "A problem is any gap between the current state of a system and the desired state." },
      { question: "What is the difference between symptoms and root causes?", options: ["They are interchangeable terms for the same concept", "Root causes are always visible", "Symptoms are observable effects; root causes are the actual sources of dysfunction", "Symptoms are the real problem"], correctIndex: 2, explanation: "Symptoms are observable effects of an underlying problem; root causes are the actual sources of the dysfunction." },
      { question: "JAD, a collaborative workshop fact-finding technique, stands for:", options: ["Java Application Design", "Joint Analysis Document", "Just-in-time Agile Delivery cycle", "Joint Application Development"], correctIndex: 3, explanation: "JAD (Joint Application Development) uses collaborative workshops involving users and developers to gather requirements." },
      { question: "What does SDLC stand for?", options: ["Software Development Life Cycle", "System Design Logic Control", "Standard Data Layer Configuration", "Sequential Design and Logic Cycle"], correctIndex: 0, explanation: "SDLC is the Software Development Life Cycle — a structured process to plan, create, test, deploy, and maintain software." },
      { question: "How many phases make up the SDLC as taught in this course?", options: ["Fourteen", "Seven", "Five", "Ten"], correctIndex: 1, explanation: "The seven SDLC phases are Planning, Analysis, Design, Implementation, Testing, Deployment, and Maintenance." },
      { question: "Which question best characterises the SDLC Planning phase?", options: ["How do we code this?", "Who will test it?", "Should we build this system?", "When do we retire the system?"], correctIndex: 2, explanation: "The Planning phase asks 'Should we build this system?', covering feasibility, scope, resources, schedule, and risk." },
      { question: "Performance, security, reliability, and usability are examples of which kind of requirement?", options: ["Functional requirements", "Business-level requirements only", "Hardware requirements", "Non-functional requirements"], correctIndex: 3, explanation: "Non-functional requirements describe how well the system performs — quality attributes like performance, security, and usability." },
      { question: "What is the relationship between SDLC phases and SDLC models?", options: ["Phases are the fundamental activities; models determine how and in what order those phases are executed", "They are identical", "Models replace phases", "The phases only apply when using the Agile methodology"], correctIndex: 0, explanation: "SDLC phases are the activities any project must do; models (Waterfall, Agile, etc.) decide how and in what order they happen." },
      { question: "The Waterfall Model is best described as:", options: ["A risk-driven spiral", "A linear-sequential approach where each phase finishes before the next begins", "A set of parallel overlapping sprints running simultaneously", "A prototype-based loop"], correctIndex: 1, explanation: "Waterfall is a linear-sequential model where each phase is completed and reviewed before the next begins." },
      { question: "In the Waterfall Model, the requirements phase produces which formal document?", options: ["The detailed Software Design Document (SDD)", "Product Backlog", "Software Requirement Specification (SRS)", "Sprint Backlog"], correctIndex: 2, explanation: "The requirements analysis phase produces a formal Software Requirement Specification (SRS) that acts as the project blueprint." },
      { question: "Which is a key disadvantage of the Waterfall Model?", options: ["It accommodates requirement changes easily at any stage", "It produces no documentation", "It is only for huge projects", "The customer sees the working product only at the very end, and changes are costly"], correctIndex: 3, explanation: "Waterfall is inflexible: the customer sees the product only at the end, and late changes or defects are expensive." },
      { question: "When is the Waterfall Model most appropriate?", options: ["When requirements are stable and the application is small and simple", "When requirements change constantly", "For highly experimental research and development projects", "When the customer must be involved daily"], correctIndex: 0, explanation: "Waterfall suits projects with stable, well-understood requirements and small, simple, stable technology." },
      { question: "Who proposed the Spiral Model, and in what year?", options: ["Winston Royce, 1970", "Barry Boehm, 1986", "Ken Schwaber, 2001", "Edsger Dijkstra, 1968"], correctIndex: 1, explanation: "The Spiral Model was proposed by Barry Boehm in 1986 as a risk-driven, iterative process." },
      { question: "Which quadrant is described as the most critical part of the Spiral Model?", options: ["Objectives Determination and Planning", "Development and Testing", "Risk Analysis and Resolution", "Review and Planning"], correctIndex: 2, explanation: "Risk Analysis and Resolution is the most critical quadrant — risks are identified and mitigated before major investment." },
      { question: "A key disadvantage of the Spiral Model is that it:", options: ["Ignores risk", "Cannot accommodate change", "Produces no early working versions of the software", "Is costly and does not suit smaller, low-risk projects"], correctIndex: 3, explanation: "The Spiral Model is complex and costly, requiring risk expertise, and is overkill for small, low-risk projects." },
      { question: "The V-Model is also known as the:", options: ["Verification and Validation Model", "Variable Velocity Delivery Model", "Vertical Value Model", "Visual Vector Model"], correctIndex: 0, explanation: "The V-Model is the Verification and Validation Model, pairing each development phase with a corresponding testing phase." },
      { question: "Where does the Coding phase sit in the V-Model?", options: ["At the top-left", "At the bottom of the V, joining the verification and validation branches", "On the right side only", "It has no defined place in the standard V-Model"], correctIndex: 1, explanation: "Coding sits at the bottom of the V, connecting the verification (left) and validation (right) branches." },
      { question: "In the V-Model, which testing phase corresponds to (verifies) Module Design?", options: ["Acceptance Testing", "System Testing", "Unit Testing", "Integration Testing"], correctIndex: 2, explanation: "Unit Testing pairs with Module Design — each validation phase verifies its matching design phase." },
      { question: "In the V-Model, Acceptance Testing corresponds to which design/analysis phase?", options: ["Module Design", "High-level Architectural Design", "System Design", "Business Requirement Analysis"], correctIndex: 3, explanation: "Acceptance Testing verifies the Business Requirement Analysis, with user involvement." },
      { question: "A noted limitation of the V-Model is that it:", options: ["Produces no early prototypes, delaying customer feedback, and is inflexible to change", "Only finds important defects late, after they have been introduced", "Has no testing phases", "Cannot be documented"], correctIndex: 0, explanation: "The V-Model is inflexible once development starts and produces no early prototypes, so customer feedback is delayed." },
      { question: "The Incremental Model delivers software by:", options: ["Releasing the entire system in a single delivery at the very end", "Building and delivering small, functional increments that each add to the previous release", "Only building prototypes", "Skipping testing"], correctIndex: 1, explanation: "In the Incremental Model, requirements are divided into modules and each release adds functionality to the previous one." },
      { question: "Which is an advantage of the Incremental Model?", options: ["No need for module interfaces", "Requirements never need to be formally defined or documented", "Early delivery of operational software and easier testing of smaller increments", "It guarantees a fixed completion date"], correctIndex: 2, explanation: "The Incremental Model delivers core functions early and makes smaller increments easier to test and debug." },
      { question: "The Evolutionary Process Model is also called the:", options: ["Big Bang model", "Frozen model", "Single-pass linear model", "Successive version model"], correctIndex: 3, explanation: "The Evolutionary Process Model (successive version model) lets software evolve over time with customer feedback at each stage." },
      { question: "The Prototyping Model primarily helps a team to:", options: ["Build a working model to understand requirements better, then refine it through feedback", "Avoid the customer", "Skip the design phase", "Deliver written documentation without building any working software"], correctIndex: 0, explanation: "Prototyping builds a working model to clarify requirements, then refines it iteratively based on user feedback." },
      { question: "In throwaway prototyping, the prototype is:", options: ["Refined into the final system", "Built to elicit requirements and then discarded, with the final system built from scratch", "Never shown to the customer", "Immediately deployed as the live production system without changes"], correctIndex: 1, explanation: "A throwaway prototype is built quickly to elicit requirements, then discarded; the final system is built separately." },
      { question: "In evolutionary prototyping, the prototype is:", options: ["Discarded immediately after the first demonstration", "Only a paper sketch", "Progressively refined until it becomes the final system", "Built by the customer"], correctIndex: 2, explanation: "In evolutionary prototyping the prototype is continuously refined until it becomes the final delivered system." },
      { question: "A common disadvantage of the Prototyping Model is that:", options: ["It detects errors too late", "It needs no client involvement", "It cannot handle changing requirements once development begins", "Users may confuse the prototype with the final system and documentation is often poor"], correctIndex: 3, explanation: "Prototyping risks users mistaking the prototype for the final product, and frequent changes lead to poor documentation." },
      { question: "The Agile model is best described as:", options: ["An iterative, incremental approach delivering working software in short 1-4 week iterations", "A rigid, documentation-heavy process", "A single-phase delivery", "A purely sequential model where every phase must finish before the next starts"], correctIndex: 0, explanation: "Agile is iterative and incremental, prioritising flexibility, collaboration, and working software in short iterations." },
      { question: "Which is one of the four values of the Agile Manifesto?", options: ["Comprehensive documentation over working software", "Working software over comprehensive documentation", "Contract negotiation over customer collaboration", "Following a plan over responding to change"], correctIndex: 1, explanation: "The Agile Manifesto values working software over comprehensive documentation (among its four value statements)." },
      { question: "How long is a typical Agile iteration (sprint)?", options: ["6 to 12 months", "1 to 2 days", "1 to 4 weeks", "Exactly 1 year"], correctIndex: 2, explanation: "Agile builds software in short iterations of 1 to 4 weeks, delivering a workable product after each." },
      { question: "What is the main role of the Scrum Master?", options: ["To write all of the production code for the project", "To represent the customer's commercial interests", "To approve the project budget", "To facilitate Agile practices, remove blocks, and shield the team from disturbances"], correctIndex: 3, explanation: "The Scrum Master is a facilitator who helps the team follow Agile practices, removes blockers, and shields the team." },
      { question: "Which responsibility belongs to the Product Owner?", options: ["Defining and prioritising requirements and representing the voice of the customer", "Removing technical blockers", "Running and maintaining the automated build server and pipeline", "Facilitating the daily stand-up"], correctIndex: 0, explanation: "The Product Owner drives the product from a business view — prioritising requirements and representing the customer." },
      { question: "What is the typical size of an Agile/Scrum development team?", options: ["1 to 2 members", "5 to 9 members", "20 to 30 members", "Exactly 12 members"], correctIndex: 1, explanation: "A self-sufficient Agile development team is typically 5 to 9 members, cross-functional and empowered." },
      { question: "Which of these is an Agile framework?", options: ["Waterfall", "V-Model", "Scrum", "Spiral"], correctIndex: 2, explanation: "Scrum is an Agile framework (alongside Kanban, Extreme Programming, and SAFe)." },
      { question: "A disadvantage of Agile is that it:", options: ["Cannot handle change", "Produces too much documentation", "Completely excludes the customer from the development process", "Makes final cost and timeline hard to predict and needs a highly engaged customer"], correctIndex: 3, explanation: "Agile's evolving scope makes cost/timeline hard to predict, and it depends on an available, engaged customer/Product Owner." },
      { question: "Which Agile framework is described as the most widely used?", options: ["Scrum", "Kanban", "Extreme Programming", "SAFe"], correctIndex: 0, explanation: "Scrum is the most widely used Agile framework, organising work into sprints with defined roles and artifacts." },
      { question: "In Scrum, the Product Backlog is:", options: ["A subset of tasks for one sprint", "A prioritised list of all features and requirements, owned by the Product Owner", "The final signed-off testing report produced at the end of the project", "A list of completed work only"], correctIndex: 1, explanation: "The Product Backlog is the prioritised master list of all features, fixes, and tasks, maintained by the Product Owner." },
      { question: "How does the Sprint Backlog differ from the Product Backlog?", options: ["They are the same backlog under two different names", "The Sprint Backlog holds every future feature", "The Sprint Backlog is a subset the team commits to for one sprint, owned by the development team", "The Sprint Backlog is owned by the customer"], correctIndex: 2, explanation: "The Sprint Backlog is the subset of product backlog items the team commits to completing in a given sprint." },
      { question: "What is the purpose of the Daily Scrum (daily stand-up)?", options: ["To formally demo the finished product to the customer", "To negotiate the contract", "To replace all other meetings", "To keep the team aligned each day during the sprint"], correctIndex: 3, explanation: "Daily stand-up meetings (the Daily Scrum) keep the team aligned on progress and obstacles during the sprint." },
      { question: "What is the difference between a Sprint Review and a Sprint Retrospective?", options: ["The Review demonstrates the working increment; the Retrospective reflects on and improves the process", "They are identical activities that serve the same purpose", "The Review fixes bugs; the Retrospective writes code", "Only the Retrospective involves the customer"], correctIndex: 0, explanation: "The Sprint Review demos the increment to stakeholders, while the Retrospective reflects on the process to improve it." },
      { question: "Across the SDLC models, which one treats risk management as its core focus?", options: ["Waterfall", "Spiral", "Prototyping", "V-Model"], correctIndex: 1, explanation: "The Spiral Model handles risk most rigorously — risk analysis is its central, defining focus." },
      { question: "Which model offers the highest flexibility and continuous customer involvement?", options: ["Waterfall", "V-Model", "Agile", "Spiral"], correctIndex: 2, explanation: "Agile has very high flexibility and continuous (daily/weekly) customer involvement." },
      { question: "Documentation tends to be heaviest in which model and lightest in which?", options: ["Heaviest in Agile, lightest in Waterfall", "Equal in all models", "Heaviest in Prototyping, lightest in Spiral", "Heaviest in Waterfall, lightest in Agile"], correctIndex: 3, explanation: "Documentation is heaviest in Waterfall (aiding maintenance) and lightest in Agile (favouring speed)." },
      { question: "For fixed-bid contracts or strict regulatory compliance with stable requirements, which approach is often preferable?", options: ["Waterfall or Incremental", "Agile", "Pure throwaway prototyping", "No model at all"], correctIndex: 0, explanation: "When cost/schedule predictability matters (fixed-bid or compliance), Waterfall or Incremental are often preferable to Agile." },
    ],
  },
  {
    code: 'CYB 224',
    slug: 'cyb-224',
    title: 'Information and Big Data Security',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Big data fundamentals — characteristics, sources, platforms, and analytics — paired with the security side: information and big data security requirements, lifecycle security management, risk management, and cloud-based big data security.',
    topics: [
      'Big data fundamentals: small vs big data, characteristics (3Vs/6Vs), sources and formats',
      'Big data technology, platforms, components, and governance; using the cloud for big data',
      'Operational and analytical big data; business intelligence vs big data vs data mining',
      'System and management view of information and big data security',
      'Requirements for information and big data security; systems-design process and lifecycle security management',
      'Basic policies on information security and methodologies; security risk management',
      'Laws related to information security and management of operational systems',
      'Applying machine learning and analytical tools to big data; cloud-based big data analysis',
    ],
    textbooks: [
      { title: 'Big Data Security', authors: 'Bhavani Thuraisingham', note: 'Comprehensive coverage of the field' },
      { title: 'Database Security and Auditing', authors: 'Hassan Afyouni', note: 'Practical focus on database security mechanisms' },
    ],
    searchTerms: [
      'GDPR explained for students',
      'Nigeria Data Protection Act NDPA overview',
      'SQL injection attack and prevention tutorial',
      'Data encryption at rest and in transit explained',
    ],
    studyTips: [
      'Read the Nigeria Data Protection Act — it is publicly available and short; exam questions reference it',
      'SQL injection from this course connects directly to web security in UUY-CYB 222 — study them together',
      'The cloud shared responsibility model is exam-critical: know clearly what the provider vs customer secures',
      'Use OWASP resources on SQL injection and data security — they are free and authoritative',
    ],
    lectureNotes: [
      {
        number: '1',
        title: 'Introduction to Big Data Security',
        sections: [
          {
            type: 'definition',
            heading: '1.1 Definition',
            text: 'Big Data Security refers to the tools, policies, and measures used to protect large volumes of data from unauthorized access, breaches, and misuse throughout its lifecycle — from collection to processing and storage.',
          },
          {
            type: 'fivers',
            heading: '1.2 Characteristics of Big Data — The 5Vs',
            items: [
              { term: 'Volume', def: 'Large amount of data generated and stored' },
              { term: 'Velocity', def: 'Speed at which data is generated and processed' },
              { term: 'Variety', def: 'Different types and formats of data' },
              { term: 'Veracity', def: 'Quality, accuracy, and reliability of the data' },
              { term: 'Value', def: 'Turning processed data into meaningful insight' },
            ],
          },
          {
            type: 'termlist',
            heading: '1.3 Where Does Big Data Come From?',
            items: [
              { term: 'M2M (Machine to Machine)', def: 'data exchanged between connected devices' },
              { term: 'People to Machine', def: 'data generated through human interactions with technology' },
              { term: 'Organisational Data', def: 'data produced by businesses and institutions' },
            ],
          },
        ],
      },
      {
        number: '2',
        title: 'Operational and Analytical Big Data',
        date: '02/06/2026',
        sections: [
          {
            type: 'definition',
            heading: '2.1 Operational Big Data',
            text: 'Operational Big Data refers to real or nearly real-time data used to support daily business operations and decision making. It processes data immediately as it is generated, supports transactional systems, and requires fast processing.',
          },
          {
            type: 'bullets',
            heading: 'Sources',
            items: ['Social media activities', 'Online transactions', 'ATM transactions', 'Sensor and IoT devices', 'Mobile applications', 'GPS tracking systems'],
          },
          {
            type: 'bullets',
            heading: 'Examples',
            items: ['Online banking transactions', 'E-commerce order processing', 'Hospital patient monitoring systems', 'Airline reservation systems', 'Traffic management systems'],
          },
          {
            type: 'bullets',
            heading: 'Technologies Used',
            items: ['Apache Kafka', 'Apache Storm', 'Apache Flink'],
          },
          {
            type: 'proscons',
            heading: 'Advantages & Disadvantages',
            advantages: ['Real-time decision making', 'Faster response to customer needs', 'Improved operational efficiency', 'Enhanced customer experience'],
            disadvantages: ['High infrastructure cost', 'Data security concerns', 'Complex management'],
          },
          {
            type: 'definition',
            heading: '2.2 Analytical Big Data',
            text: 'Analytical Big Data refers to historical and accumulated data used for analysis, forecasting, reporting, and strategic decision making. It focuses on past and current data, supports business intelligence, and is often stored in data warehouses.',
          },
          {
            type: 'bullets',
            heading: 'Sources',
            items: ['Historical transaction records', 'Customer databases', 'Business reports', 'Data warehouses', 'Web logs'],
          },
          {
            type: 'bullets',
            heading: 'Examples',
            items: ['Sales trends analysis', 'Customer behaviour analysis', 'Market forecasting', 'Fraud detection', 'Academic research'],
          },
          {
            type: 'bullets',
            heading: 'Technologies Used',
            items: ['Apache Spark', 'Business intelligence tools', 'Machine learning platforms'],
          },
          {
            type: 'table',
            heading: '2.3 Comparison: Operational vs Analytical Big Data',
            headers: ['Aspect', 'Operational', 'Analytical'],
            rows: [
              ['Nature', 'Real-time / near real-time', 'Historical / accumulated'],
              ['Purpose', 'Daily operations & decisions', 'Analysis, forecasting, strategy'],
              ['Data freshness', 'Continuously updated', 'Stored in data warehouses'],
              ['Focus', 'Transactional systems', 'Business intelligence & trends'],
              ['Technologies', 'Kafka, Storm, Flink', 'Spark, BI tools, ML platforms'],
              ['Examples', 'ATM txn, GPS, e-commerce', 'Sales trends, fraud detection'],
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Big Data Skills',
        date: '09/06/2026',
        sections: [
          {
            type: 'definition',
            heading: 'Definition',
            text: 'Big Data Skills are the knowledge, abilities, and competencies required to collect, process, store, analyze, visualize, and interpret large amounts of data.',
          },
          {
            type: 'termlist',
            heading: '3.1 Categories of Big Data Skills',
            items: [
              { term: 'Technical Skills', def: 'programming, database management, big data frameworks' },
              { term: 'Analytical Skills', def: 'data analysis, pattern recognition, statistical analysis' },
              { term: 'Business Skills', def: 'translating insights into actionable business strategies' },
              { term: 'Communication Skills', def: 'presenting findings clearly to non-technical audiences' },
              { term: 'Problem Solving Skills', def: 'using data-driven approaches to solve complex problems' },
            ],
          },
          {
            type: 'termlist',
            heading: '3.2 Technical Skills (Detail)',
            items: [
              { term: 'Programming', def: 'ability to write code to manipulate and process data' },
              { term: 'Database Skills', def: 'MySQL, Oracle — querying and managing structured data' },
              { term: 'Big Data Frameworks', def: 'Hadoop, Spark, Kafka — large-scale data processing tools' },
            ],
          },
          {
            type: 'text',
            heading: '3.3 Analytical Skills — Data Analysis',
            text: 'Data analysis involves examining data to discover useful information, patterns, and insights. Key skills include data transformation, statistical analysis, and pattern recognition. Tools commonly used: Python, Excel, Apache Spark.',
          },
          {
            type: 'text',
            heading: '3.4 Business Skills',
            text: 'Business skills involve transforming analyzed data into actionable insights that support business goals and strategic decisions. Data professionals must understand the business context to make their analysis relevant.',
          },
          {
            type: 'bullets',
            heading: '3.5 Communication Skills',
            items: ['Report writing', 'Presentation skills', 'Team collaboration', 'Storytelling with data — presenting findings visually and narratively'],
          },
          {
            type: 'termlist',
            heading: '3.6 Problem Solving — Steps',
            items: [
              { term: 'Step 1', def: 'Identify the problem' },
              { term: 'Step 2', def: 'Collect relevant data' },
              { term: 'Step 3', def: 'Analyse the data' },
              { term: 'Step 4', def: 'Generate insights' },
              { term: 'Step 5', def: 'Recommend solutions' },
            ],
          },
          {
            type: 'casestudy',
            prompt: 'University of Uyo wants to improve student performance using big data analytics.',
            tasks: [
              'Identify possible data sources',
              'Explain how the data can be collected and stored',
              'Determine the type of analytics that can be applied',
              'Recommend tools and technology for implementation',
              'Discuss expected benefits and possible challenges',
            ],
          },
        ],
      },
      {
        number: '4',
        title: 'Concepts of Big Data Security',
        sections: [
          {
            type: 'definition',
            heading: '4.1 Definition',
            text: 'Big Data security is the collective term for the guardrails, policies, and technologies used to protect massive volumes of data — both structured and unstructured — from unauthorized access, theft, exposure, and modification.',
          },
          {
            type: 'text',
            heading: '4.2 How It Differs from Traditional Security',
            text: 'Traditional security focuses on securing perimeter walls (like firewalls) around static databases. Big Data security is unique because the data is constantly moving, changing, and being analysed at an immense scale — so protection has to travel with the data instead of sitting only at the boundary.',
          },
          {
            type: 'termlist',
            heading: '4.3 The 3Vs of Big Data Security Challenges',
            items: [
              { term: 'Volume', def: 'Protecting petabytes or exabytes of data requires security tools that scale dynamically without creating processing bottlenecks' },
              { term: 'Velocity', def: 'Data streams into systems in real time (IoT sensors, network logs), so encryption and threat detection must happen on the fly without causing latency' },
              { term: 'Variety', def: 'Structured SQL databases, semi-structured JSON, and unstructured video, audio and text all coexist — a one-size-fits-all security policy does not work' },
            ],
          },
          {
            type: 'text',
            heading: '4.4 Core Pillars of Big Data Security',
            text: 'To secure a Big Data ecosystem (such as Hadoop, Spark, or a cloud-based data lake), organisations implement a multi-layered security framework resting on four pillars.',
          },
          {
            type: 'termlist',
            heading: 'Pillar 1 — Data Encryption and Privacy',
            items: [
              { term: 'Encryption in transit', def: 'Protecting data as it moves between nodes, clusters, or users — typically using TLS/SSL' },
              { term: 'Encryption at rest', def: 'Safeguarding data stored on disks using strong encryption standards such as AES-256' },
              { term: 'Data masking & tokenization', def: 'Replacing sensitive data (card numbers, PII) with realistic but fake values or tokens before it enters the analytics pipeline, so data scientists can work with it safely' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Pillar 2 — Centralized Access Control',
            items: [
              { term: 'Role-Based Access Control (RBAC)', def: 'Assigning permissions based on organisational roles' },
              { term: 'Attribute-Based Access Control (ABAC)', def: 'A finer-grained approach where access is decided by contextual attributes — e.g. allow access only if the user is a Data Analyst AND the request comes from an internal IP during working hours' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Pillar 3 — Endpoint and Infrastructure Security',
            items: [
              { term: 'Node authentication', def: 'Ensuring only authorised servers/nodes can join the computing cluster — often managed via Kerberos' },
              { term: 'API security', def: 'Protecting the endpoints and APIs that applications use to connect to and query the data lake' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Pillar 4 — Real-Time Monitoring and Auditing',
            items: [
              'With massive infrastructure, detecting a breach manually is impossible — monitoring must be automated',
              'Maintain continuous audit logs of who accessed what data and when',
              'Employ AI and machine-learning-driven User and Entity Behaviour Analytics (UEBA) to spot anomalous data access patterns that may indicate an insider threat or compromised credentials',
            ],
          },
          {
            type: 'image',
            heading: '4.5 Common Tools in the Big Data Security Ecosystem',
            src: '/lecture-notes/cyb-224/security-ecosystem.webp',
            width: 1600, height: 238,
            alt: 'Four tools mapped to their functions: Apache Ranger/Sentry to centralized security administration and access control, Kerberos to network authentication, Knox Gateway to secure perimeter access for REST APIs, and SIEM systems (Splunk, Elastic) to log aggregation and analysis at scale',
            caption: 'Figure 1: The Big Data security ecosystem — each tool mapped to its primary function',
          },
          {
            type: 'table',
            headers: ['Tool / Technology', 'Primary Function'],
            rows: [
              ['Apache Ranger / Apache Sentry', 'Centralized security administration and fine-grained access control for Hadoop/Spark ecosystems'],
              ['Kerberos', 'Network authentication protocol used to verify the identity of users and nodes in a cluster'],
              ['Knox Gateway', 'Provides a single, secure point of access (perimeter security) for Big Data cluster REST APIs'],
              ['SIEM systems (Splunk, Elastic)', 'Security Information and Event Management systems used to aggregate and analyse security logs at scale'],
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'Artificial Intelligence and Big Data Security',
        sections: [
          {
            type: 'definition',
            heading: '5.1 Artificial Intelligence',
            text: 'Artificial Intelligence (AI) is the branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence — learning, reasoning, problem-solving, perception, and language understanding. It spans a wide range of technologies, from rule-based systems to machine learning and deep learning.',
          },
          {
            type: 'definition',
            heading: '5.2 Machine Learning',
            text: 'Machine Learning (ML), a subset of AI, is the study of algorithms and statistical models that let computers perform specific tasks without explicit instructions, relying instead on patterns and inference derived from data. The goal is to build models that generalise from training data to unseen data, making predictions or decisions on new inputs.',
          },
          {
            type: 'text',
            heading: '5.3 Application of ML in Data Security',
            text: 'Applying AI and ML to network security means analysing large amounts of network data, identifying patterns, and detecting anomalies that may indicate security threats. This enables real-time detection and mitigation, which matters because of the increasing complexity and volume of attacks. The digital landscape is defined by two converging trends: the ubiquity of machine learning, and the increasing vulnerability of interconnected systems (e.g. microprocessor flaws like Spectre and Meltdown).',
          },
          {
            type: 'image',
            heading: '5.4 Cybersecurity Threat Categories',
            src: '/lecture-notes/cyb-224/threat-taxonomy.webp',
            width: 1400, height: 704,
            alt: 'Mind map of cybersecurity threats in three branches: Malware (worm, trojan, ransomware, bot, rootkit, adware, botnet, spyware, backdoor), Network Attacks (login attack, phishing, spear phishing, keylogger, spam, exploit, account takeover, social engineering, sniffing, scanning, DoS/DDoS) and Advanced Threats (APT, zero-day)',
            caption: 'Figure 2: Threat taxonomy — malware, network attacks, and advanced threats',
          },
          {
            type: 'table',
            headers: ['Threat Category', 'Definition', 'Example'],
            rows: [
              ['Malware', 'Malicious software designed to damage systems, steal data, or gain unauthorized access', 'A program that secretly deletes company files after installation'],
              ['Worm', 'Self-replicating malware that spreads automatically across networks without user action', 'A worm spreading through a university network by exploiting a vulnerability'],
              ['Trojan', 'Malware disguised as legitimate software to trick users into installing it', "A fake 'Free Antivirus' app that installs hidden spyware"],
              ['Spyware', 'Software that secretly monitors and collects user information without consent', 'A program that tracks browsing history and sends it to attackers'],
              ['Adware', 'Software that automatically displays unwanted advertisements on a device', 'Constant pop-up ads appearing during internet browsing'],
              ['Ransomware', 'Malware that encrypts files and demands payment to restore access', "A hospital's records encrypted until ransom is paid"],
              ['Rootkit', 'A hidden tool that gives attackers privileged access while remaining undetected', 'An attacker installing a rootkit to hide a server intrusion'],
              ['Backdoor', 'A secret method of bypassing normal authentication to access a system', 'A hidden login password embedded in an application'],
              ['Bot', 'An infected computer remotely controlled by an attacker', 'A laptop unknowingly sending spam emails under attacker control'],
              ['Botnet', 'A group of infected devices controlled together by an attacker', 'Thousands of compromised devices launching a coordinated attack'],
              ['Exploit', 'Code that takes advantage of a specific software weakness', 'Using an unpatched browser flaw to gain system access'],
              ['Scanning', 'Actively searching systems or networks to identify vulnerabilities', 'Using automated tools to detect open ports on a server'],
              ['Sniffing', 'Monitoring network traffic to capture sensitive information', 'Capturing login details on unsecured public Wi-Fi'],
              ['Keylogger', 'A tool that records every keystroke typed on a device', "Recording a victim's banking password as they type"],
              ['Spam', 'Unwanted bulk electronic messages, often for advertising or malicious purposes', 'Receiving hundreds of unsolicited promotional emails'],
              ['Login attack', 'Automated attempts to guess usernames and passwords', 'Trying thousands of password combinations to access an account'],
              ['Account Takeover (ATO)', "Unauthorized access to someone's legitimate account", 'Hackers accessing a social media account and changing the password'],
              ['Phishing', 'Fraudulent communication pretending to be from a trusted source', 'An email pretending to be from a bank requesting login details'],
              ['Spear phishing', 'Targeted phishing aimed at a specific individual or organisation', 'An email sent to a CEO pretending to be from a board member'],
              ['Social engineering', 'Manipulating individuals into revealing confidential information', 'A caller pretending to be IT support asking for credentials'],
              ['Incendiary speech', 'Harmful or discriminatory speech intended to incite hostility', 'Online posts targeting a group with harmful statements'],
              ['Denial of Service (DoS/DDoS)', 'Flooding a system with traffic to make it unavailable', 'Overloading an e-commerce website during peak sales'],
              ['Advanced Persistent Threat (APT)', 'A long-term targeted cyberattack where attackers remain undetected', 'Attackers secretly monitoring a government network for months'],
              ['Zero-day vulnerability', 'A newly discovered software flaw exploited before a fix is released', 'Hackers exploiting a new OS weakness before patching'],
            ],
          },
          {
            type: 'text',
            heading: '5.5 Protecting ML Systems from Adversarial Attacks',
            text: 'Just as no modern computer system can be absolutely assured, there is no fail-safe way to protect an AI or ML system — research into defending ML tools is ongoing. The realistic goal is a systems-security approach that reduces the risk and impact of attacks to acceptable levels.',
          },
          {
            type: 'termlist',
            heading: 'Three Protections to Insist On',
            items: [
              { term: 'Robustness', def: 'Integrity of the tool itself, plus protection of the confidentiality of what it holds' },
              { term: 'Resilience', def: 'Resistance to attacks during both training and classification' },
              { term: 'Reliable input', def: 'Evidence that the input data is reliable and representative' },
            ],
          },
          {
            type: 'text',
            heading: 'Worked Example — The Stop Sign Attack',
            text: 'ML tools contain well-known vulnerabilities, many of them susceptible to adversary manipulation. Self-driving cars use ML to identify street signs; by deliberately altering a small section of a stop sign with a purpose-designed sticker, an adversary can make these operational ML tools reliably misclassify the stop sign as a 45-mile-per-hour speed limit sign. In cybersecurity the manipulated input is usually far less obvious to an analyst than a sticker on a traffic sign — so any security system built on ML must take these threats seriously.',
          },
          {
            type: 'bullets',
            heading: 'What to Ask Developers and Suppliers',
            items: [
              'How does the design and deployment of the ML tool protect against well-documented classes of attack? (Not an abstract question about all possible attacks.)',
              "What protections are in place for the integrity of the tool's decisions, during both training and deployment?",
              'What protects the confidentiality of sensitive information used by the tool?',
              'What evidence is there that the input data is reliable and representative?',
              'Cybersecurity cannot prevent all attacks, and does not claim to — any ML tool deployed in a security context should be part of an explicit risk assessment',
            ],
          },
          {
            type: 'bullets',
            heading: '5.6 The Upshot — Why Sensitive Data Is Attacked',
            items: [
              'The motivations behind cyber-attacks are complex and largely economically driven',
              'Cybercrime has a functioning marketplace',
              'Hacking tools are commoditized',
              'Monetization pathways are layered and indirect',
              'Defensive systems increase complexity, forcing attackers to adapt',
              'The result is a continuous adversarial cycle between attackers and defenders',
            ],
          },
          {
            type: 'termlist',
            heading: '5.7 Activity 1 — Threat Identification from Logs',
            items: [
              { term: 'Which patterns may indicate scanning activity?', def: 'Repeated SYN packets without completed handshakes; multiple connection attempts to different ports in a short timeframe from the same IP' },
              { term: 'Which patterns suggest a brute-force login attempt?', def: 'Repeated failed login attempts from one IP in a short window; a high frequency of authentication requests' },
              { term: 'Which features would you extract to train an ML model to detect DDoS attacks?', def: 'Number of unique destination ports; packet rate / requests per second' },
            ],
          },
          {
            type: 'table',
            heading: '5.8 Activity 2 — Threat Classification Mapping',
            headers: ['Threat Type', 'Main Target'],
            rows: [
              ['Ransomware', 'Encrypts user or organisation data/files for ransom'],
              ['Phishing', 'Targets human trust to steal credentials'],
              ['Botnet', 'Compromises multiple machines to control remotely'],
              ['Spyware', 'Monitors user activity and steals information'],
              ['DoS', 'Targets network availability to disrupt service'],
            ],
          },
        ],
      },
      {
        number: '6',
        title: "The Cyber Attacker's Economy",
        sections: [
          {
            type: 'definition',
            heading: '6.1 Security as an Economic Problem',
            text: 'Cybersecurity is not only a technical battle but also an economic one. Modern cybercrime operates within a structured financial ecosystem where monetary gain is the primary motivation. Understanding attacker incentives helps security professionals design stronger detection and prevention systems.',
          },
          {
            type: 'text',
            heading: '6.2 From Reputation to Revenue',
            text: 'Early cyber-attacks were often motivated by curiosity, mischief, or reputation within hacker communities. Today, most cyber-attacks are financially motivated — as long as cybercrime produces meaningful financial returns, attackers will continue to innovate.',
          },
          {
            type: 'bullets',
            heading: 'What Modern Attackers Target',
            items: [
              'Online payment platforms',
              'Financial institutions',
              'Gift card systems',
              'Cryptocurrency wallets',
              'E-commerce platforms',
              'Identity databases',
            ],
          },
          {
            type: 'text',
            heading: '6.3 Marketplace for Hacking Skills',
            text: 'The commoditization of hacking has lowered the barrier to entry. Darknet marketplaces sell exploits, malware kits, stolen credentials, and even subscription-based hacking services.',
          },
          {
            type: 'text',
            heading: '6.4 Zero-Day Vulnerability Markets',
            text: 'Zero-day vulnerabilities are unknown software weaknesses. They can be sold legally through bug bounty programmes or illegally in underground markets. Selling an exploit often provides faster and lower-risk financial returns than launching the attack directly.',
          },
          {
            type: 'table',
            heading: '6.5 Attack Supply Chain Mapping',
            headers: ['Role in Ecosystem', 'Description'],
            rows: [
              ['Vulnerability researcher', 'Finds and documents unpatched security flaws'],
              ['Exploit developer', 'Writes code that weaponizes a discovered flaw into a usable attack'],
              ['Malware distributor', 'Spreads the malware to victims via phishing, infected downloads, or botnets'],
              ['Botnet operator', 'Manages networks of infected devices and rents them out for DDoS attacks'],
              ['Data reseller', 'Buys and sells stolen data (credentials, card numbers) on dark web markets'],
            ],
          },
          {
            type: 'termlist',
            heading: '6.6 Activity — Economic Motivation Analysis',
            items: [
              { term: 'Why have cyber-attacks shifted from reputation-based to monetary motivations?', def: 'The rise of e-commerce, cryptocurrency, and organised cybercrime markets made data and access directly convertible to cash, turning attacks into a business rather than a hobby' },
              { term: 'Why might attackers avoid large financial institutions despite the high potential reward?', def: 'Large institutions invest heavily in security — SOC teams for detection, encryption, regulatory compliance — making attacks costly and risky to execute' },
              { term: 'How do weaker organisations become attractive targets?', def: 'Small businesses often have limited security budgets, no dedicated IT/security staff, and outdated systems' },
            ],
          },
          {
            type: 'termlist',
            heading: '6.7 Activity — Machine Learning Implications',
            items: [
              { term: 'How does the commercialization of hacking increase attack volume?', def: 'Ready-made hacking tools and malware-as-a-service let low-skill attackers launch attacks at scale, multiplying the number of incidents' },
              { term: 'Why must machine learning models be scalable in modern environments?', def: 'As data size increases, models need to keep processing in real time without breaking down' },
              { term: 'How does attacker innovation pressure defensive systems to evolve?', def: 'As attackers develop new evasion techniques, defensive systems must continuously retrain and adapt or become obsolete against novel threats' },
            ],
          },
          {
            type: 'casestudy',
            heading: '6.8 Activity — Case Scenario',
            prompt: 'A small online retail company experiences a sudden increase in login attempts from multiple geographic locations.',
            tasks: [
              'Why might this company be targeted instead of a major bank?',
              'What economic incentive might motivate the attacker?',
              'Which machine learning approach would you recommend — supervised, anomaly detection, or hybrid — and why?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Why this company, not a major bank?', def: 'Smaller companies have weaker defences and less monitoring, making them easier and faster to breach even though the payout per victim is smaller' },
              { term: 'Economic incentive', def: 'Stored payment data, or ransom potential from disrupting a business that cannot afford downtime' },
              { term: 'ML approach', def: 'A hybrid: supervised learning catches known attack patterns effectively, while anomaly detection catches unknown attacks that do not match existing signatures' },
            ],
          },
          {
            type: 'termlist',
            heading: '6.9 Activity — General Understanding',
            items: [
              { term: 'How does understanding attacker economics improve defensive strategy design?', def: 'Knowing what makes a target profitable (weak security, valuable data) helps a defender prioritise protecting the most attractive assets first' },
              { term: 'Why is cybersecurity considered an adversarial machine learning problem?', def: 'Unlike static datasets, the data is generated by an intelligent opponent actively adapting to evade detection' },
              { term: 'In what ways does the underground marketplace accelerate threat evolution?', def: 'Attackers buy, sell, and share tools and techniques instantly, so improvements spread across the criminal community faster than defenders can respond' },
            ],
          },
        ],
      },
      {
        number: '7',
        title: 'Machine Learning for Data Security',
        sections: [
          {
            type: 'definition',
            heading: '7.1 What Machine Learning Is',
            text: 'Machine learning refers to a set of mathematical and statistical techniques that enable computer systems to learn patterns from historical data, generalise beyond observed examples, predict future outcomes, identify similarities and differences, and detect anomalies. At its core, machine learning transforms raw data into meaningful insights through pattern discovery and inference.',
          },
          {
            type: 'text',
            heading: 'Why It Matters in Security',
            text: 'Since the beginning of the technological age, researchers have aimed to design computer systems capable of reasoning, generalising, and making intelligent decisions from complex data — and ML is one of the primary approaches used to achieve it. In security, ML analyses vast amounts of data such as network traffic, learning from historical records and using that knowledge to make predictions about new and unseen events.',
          },
          {
            type: 'bullets',
            heading: '7.2 Supervised Learning',
            items: [
              'The dataset includes labeled examples',
              'The algorithm learns from known input and output pairs',
              'The goal is to predict labels for new data',
              'Security applications: spam detection, malware classification, phishing detection, malicious URL detection',
              'Tasks: classification (spam vs legitimate) and regression (predicting numerical values such as risk scores)',
            ],
          },
          {
            type: 'bullets',
            heading: '7.3 Unsupervised Learning',
            items: [
              'Data is unlabeled',
              'The algorithm identifies hidden structures or patterns',
              'It groups data, or detects deviations from normal behaviour',
            ],
          },
          {
            type: 'bullets',
            heading: '7.4 Use 1 — Pattern Recognition',
            items: [
              'Focuses on identifying known characteristics within data',
              'Examples: spam detection, malware detection, botnet detection, phishing classification',
              'Works because malicious activity exhibits recognisable features that can be learned',
            ],
          },
          {
            type: 'bullets',
            heading: '7.5 Use 2 — Anomaly Detection',
            items: [
              'Defines normal behaviour and flags deviations from it',
              'Examples: network outlier detection, insider threat detection, access control anomaly detection, behavioural monitoring',
              'Unlike pattern recognition, it does not require explicit malicious examples — it models normal activity instead',
            ],
          },
          {
            type: 'note',
            text: 'There may be infinitely many anomalous patterns, including ones never observed during training. That is what makes anomaly detection powerful — and also what makes it prone to false positives if it is not carefully designed.',
          },
          {
            type: 'text',
            heading: '7.6 Access Control and Behavioural Intelligence',
            text: 'Traditional rule-based access control systems are rigid and inflexible. Machine learning enhances access control by learning typical user access patterns, identifying abnormal behaviour, and providing adaptive responses.',
          },
          {
            type: 'bullets',
            heading: 'Example Scenario — A Hospital',
            items: [
              'Nurses access individual patient records',
              'Doctors query multiple patient records for diagnosis',
              'An ML system can detect abnormal access patterns without blocking legitimate rare events',
            ],
          },
          {
            type: 'termlist',
            heading: '7.7 Activity — Machine Learning Application',
            items: [
              { term: 'Which threats are best suited to supervised learning models, and why?', def: "Well-labeled threats such as phishing, malware and spam — there is plenty of historical labeled data to train on" },
              { term: 'Which threats require anomaly detection (unsupervised learning), and why?', def: 'Zero-day attacks, insider threats and unusual network behaviour, where no prior labeled examples exist' },
              { term: 'What makes cybersecurity data different from standard ML datasets?', def: 'Attacks are rare compared with normal traffic; patterns constantly evolve; adversaries actively try to evade detection; and labeled attack data is scarce and sensitive' },
            ],
          },
        ],
      },
      {
        number: '8',
        title: 'Supervised Learning Algorithms for Intrusion Detection',
        sections: [
          {
            type: 'definition',
            heading: '8.1 The Supervised Learning Set-up',
            text: 'Supervised learning trains a model on a labeled dataset where every input example xᵢ is paired with its correct output label yᵢ. The goal is to learn a mapping f : x → y that generalises well to unseen data. In network security this is applied to classification tasks such as separating benign from malicious traffic (intrusion detection), spam from non-spam email, or normal from anomalous behaviour.',
          },
          {
            type: 'code',
            heading: 'Loss Functions',
            language: 'math',
            code: 'Binary cross-entropy (binary classification):\n  L(y, ŷ) = −[ y·log(ŷ) + (1 − y)·log(1 − ŷ) ]\n\nCategorical cross-entropy (multi-class):\n  L(y, ŷ) = − Σ(c = 1..C) y_c · log(ŷ_c)\n\nThe model minimises the loss using gradient descent\nor a variant (Adam, SGD with momentum).',
          },
          {
            type: 'text',
            heading: '8.2 Decision Trees (DT)',
            text: 'Decision trees build a tree-like model where internal nodes represent feature tests, branches represent outcomes, and leaf nodes represent class labels or probability distributions. They are interpretable, handle mixed data types well, and require little preprocessing — which makes them popular for initial IDS prototyping.',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/decision-tree.webp',
            width: 1400, height: 578,
            alt: 'A decision tree branching from a root node on income (≤ or > $75,000), then on family size (≤ or > 4 members), then on education (≤ or > 12 years), with leaf nodes labelled Purchaser or Non-Purchaser',
            caption: 'Figure 3: Decision tree structure — each internal node tests a feature, each leaf assigns a class',
          },
          {
            type: 'code',
            heading: 'CART Splitting Criteria',
            language: 'math',
            code: 'Gini impurity:\n  Gini(t) = 1 − Σ(i = 1..k) p_i²\n  where p_i is the proportion of class i at node t\n\nInformation gain using entropy:\n  Entropy(S) = − Σ(i = 1..k) p_i · log₂(p_i)\n  Gain(S, A) = Entropy(S) − Σ(v ∈ Values(A)) (|S_v| / |S|) · Entropy(S_v)',
          },
          {
            type: 'bullets',
            heading: 'Training Procedure — Greedy Recursive Partitioning',
            items: [
              'Start at the root with the full dataset',
              'For each feature and possible split point, compute the impurity reduction',
              'Choose the split that maximises gain (or minimises weighted child impurity)',
              'Repeat until a stopping criterion is met — max depth, min samples per leaf, min impurity decrease',
              'Assign the majority class (or a probability) to each leaf',
              'In network security the features might be packet size, inter-arrival time, source/destination ports and flags, with leaves predicting "normal" or a specific attack type',
            ],
          },
          {
            type: 'text',
            heading: '8.3 Support Vector Machines (SVM)',
            text: 'SVMs find the optimal hyperplane that separates classes with the maximum margin. They are effective on high-dimensional data and remain popular in intrusion detection because they generalise well from relatively small labeled datasets.',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/svm-margin.webp',
            width: 1100, height: 860,
            alt: 'Diagram relating support vectors to the positive and negative hyperplanes, with the maximum margin hyperplane sitting between them and the margin measured across the gap',
            caption: 'Figure 4: SVM geometry — support vectors define the margin around the separating hyperplane',
          },
          {
            type: 'code',
            heading: 'SVM Equations',
            language: 'math',
            code: 'Hard margin (linearly separable case):\n  find w, b such that  y_i(wᵀx_i + b) ≥ 1   for all i\n  maximise margin 2/||w||  ⟺  minimise ½||w||²\n\nSoft margin (realistic case, slack variables ξ):\n  minimise  ½||w||² + C · Σ(i = 1..n) ξ_i\n  subject to  y_i(wᵀx_i + b) ≥ 1 − ξ_i,  ξ_i ≥ 0\n  C trades off margin size against classification error\n\nPrediction:\n  f(x) = sign(wᵀx + b)\n\nKernel trick (non-linear separation) — replace xᵢᵀxⱼ with K(xᵢ, xⱼ):\n  RBF:  K(xᵢ, xⱼ) = exp(−γ·||xᵢ − xⱼ||²)',
          },
          {
            type: 'text',
            heading: '8.4 Neural Networks (Feedforward / Multi-Layer Perceptron)',
            text: 'Feedforward neural networks consist of an input layer, one or more hidden layers, and an output layer. They excel at learning complex, non-linear patterns, which suits modern network intrusion detection on large traffic datasets.',
          },
          {
            type: 'code',
            heading: 'Forward Pass and Training',
            language: 'math',
            code: 'Single neuron:\n  z = wᵀx + b\n  a = σ(z)\n  common activations σ: ReLU max(0, z), sigmoid, tanh\n\nL-layer network:\n  a^[l] = σ^[l]( W^[l] · a^[l−1] + b^[l] ),   l = 1, ..., L\n\nTraining loop:\n  1. Forward pass  → compute predictions and loss\n  2. Backward pass → compute gradients ∂L/∂W^[l], ∂L/∂b^[l]\n  3. Update        → W ← W − η · ∂L/∂W   (or Adam, etc.)',
          },
          {
            type: 'text',
            heading: '8.5 Choosing Between Them',
            text: 'Each method has trade-offs: decision trees offer interpretability, SVMs provide strong theoretical guarantees in high dimensions, and neural networks deliver top performance on large or complex datasets. Neural approaches work best combined with feature engineering, autoencoders for anomaly-detection preprocessing, or modern variants (CNNs, LSTMs, Transformers) for traffic sequence analysis. In practice many real-world IDS/IPS systems ensemble these methods or use deep learning hybrids.',
          },
        ],
      },
      {
        number: '9',
        title: 'Practical — Building Detection Models by Hand',
        sections: [
          {
            type: 'text',
            heading: '9.1 Objective',
            text: 'These activities combine discussion, manual calculation, and coding practice, to help you understand the strengths and weaknesses of different machine learning algorithms applied to real network security problems.',
          },
          {
            type: 'casestudy',
            heading: '9.2 Practical 1 — Algorithm Comparison',
            prompt: 'You are designing an Intrusion Detection System (IDS) that analyses these network traffic features: packet size, source and destination IP address, source and destination port, TCP flags (e.g. SYN), TTL (Time To Live), and packet inter-arrival time. Work in small groups, each group taking one algorithm — Decision Tree, SVM, or Neural Network (MLP).',
            tasks: [
              'What are three advantages of your algorithm for IDS?',
              'What are three disadvantages?',
              'How could overfitting occur when detecting network attacks?',
              'What techniques could reduce overfitting?',
              'Which model suits a small labeled dataset from a university network, and which suits a massive real-time traffic dataset?',
            ],
          },
          {
            type: 'table',
            heading: '9.3 Practical 2 — Decision Tree Construction',
            headers: ['Packet', 'Packet Size', 'Src Port < 1024', 'SYN Flag', 'Label'],
            rows: [
              ['1', '60', 'Yes', '1', 'Malicious'],
              ['2', '1500', 'No', '0', 'Benign'],
              ['3', '55', 'Yes', '1', 'Malicious'],
              ['4', '1400', 'No', '0', 'Benign'],
              ['5', '70', 'Yes', '0', 'Benign'],
              ['6', '65', 'Yes', '1', 'Malicious'],
            ],
          },
          {
            type: 'code',
            heading: 'Step 1 — Root Gini Impurity',
            language: 'math',
            code: 'Gini = 1 − ( p²_malicious + p²_benign )\n\nmalicious packets = 3,  benign packets = 3\n  p_malicious = 3/6 = 0.5\n  p_benign    = 3/6 = 0.5\n\nGini = 1 − (0.5² + 0.5²)\nGini = 0.5',
          },
          {
            type: 'code',
            heading: 'Step 2 — Split on the SYN Flag',
            language: 'math',
            code: 'If SYN = 1 → all packets Malicious → Gini = 0\nIf SYN = 0 → all packets Benign    → Gini = 0\n\nA perfect split.\n\nFinal decision rule:\n  IF SYN_Flag = 1 THEN Malicious\n  ELSE Benign\n\nTraining accuracy = 6/6 = 100%',
          },
          {
            type: 'casestudy',
            title: 'Discussion Question',
            prompt: 'Why might this tree overfit real network traffic data, and how could pruning improve generalisation?',
          },
          {
            type: 'definition',
            heading: 'Background — The SYN Flag',
            text: 'The SYN ("synchronize") flag is a control bit in the TCP header used to start a connection between two computers on a network. It is used mainly during the initial stage of communication to synchronize sequence numbers between sender and receiver, telling the receiving device that the sender wants to start a session.',
          },
          {
            type: 'termlist',
            heading: 'The TCP Three-Way Handshake',
            items: [
              { term: 'Step 1 — SYN (client → server)', def: 'The client sends a packet with SYN = 1, meaning "I want to start a connection"' },
              { term: 'Step 2 — SYN-ACK (server → client)', def: 'The server replies with SYN = 1 and ACK = 1, meaning "connection request received"' },
              { term: 'Step 3 — ACK (client → server)', def: 'The client sends ACK = 1, and the connection is now established' },
            ],
          },
          {
            type: 'table',
            heading: '9.4 Practical 3 — SVM for Malicious Traffic Detection',
            headers: ['Packet', 'Packet Rate', 'Byte Entropy', 'SYN Flag', 'Label', 'Converted Label'],
            rows: [
              ['1', '12', '0.30', '0', 'Benign', '0'],
              ['2', '15', '0.35', '0', 'Benign', '0'],
              ['3', '18', '0.40', '0', 'Benign', '0'],
              ['4', '40', '0.85', '1', 'Malicious', '1'],
              ['5', '45', '0.90', '1', 'Malicious', '1'],
              ['6', '50', '0.95', '1', 'Malicious', '1'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Reading the Dataset',
            items: [
              { term: 'Packet rate', def: 'Number of packets per second' },
              { term: 'Byte entropy', def: 'Randomness in the packet data' },
              { term: 'SYN flag', def: 'Indicates a connection request' },
              { term: 'Converted label', def: 'SVMs need numeric targets — Benign → 0, Malicious → 1' },
            ],
          },
        ],
      },
      {
        number: '10',
        title: 'Unsupervised, Reinforcement and Deep Learning',
        sections: [
          {
            type: 'definition',
            heading: '10.1 Unsupervised Learning',
            text: 'Unsupervised learning trains a model on data without labeled responses. The model learns the underlying structure of the data by identifying patterns and relationships on its own.',
          },
          {
            type: 'text',
            heading: 'Clustering Algorithms',
            text: 'Clustering algorithms such as k-means and hierarchical clustering group similar data points together. In network security, clustering identifies groups of similar network behaviours, which helps detect abnormal activity — for example grouping similar login attempts and identifying the outliers that may indicate unauthorized access.',
          },
          {
            type: 'text',
            heading: 'Anomaly Detection Techniques',
            text: 'Anomaly detection identifies data points that deviate significantly from the majority of the data. Gaussian Mixture Models (GMM) and Principal Component Analysis (PCA) are commonly used. In network security this surfaces unusual traffic patterns that may indicate a breach.',
          },
          {
            type: 'definition',
            heading: '10.2 Reinforcement Learning',
            text: 'Reinforcement learning trains a model to make a sequence of decisions by learning from the consequences of its actions — rewards for desired behaviour, penalties for undesired behaviour — optimising its actions over time.',
          },
          {
            type: 'text',
            heading: 'Markov Decision Processes (MDP)',
            text: 'MDPs provide a mathematical framework for modelling decisions where outcomes are partly random and partly under the control of the decision-maker. In network security, reinforcement learning can develop adaptive security policies that respond to evolving threats — for example dynamically adjusting firewall rules based on detected threats, balancing security against network performance.',
          },
          {
            type: 'definition',
            heading: '10.3 Deep Learning',
            text: 'Deep learning, a subset of ML, uses neural networks with many layers (deep neural networks) to model complex patterns. It is particularly effective on high-dimensional data such as images and speech.',
          },
          {
            type: 'text',
            heading: 'Convolutional Neural Networks (CNNs)',
            text: 'CNNs are specialised networks for grid-like data such as images. In network security, CNNs analyse traffic data represented as images to identify patterns indicative of malicious activity — and can detect malware by analysing the binary code of executable files.',
          },
          {
            type: 'text',
            heading: 'Recurrent Neural Networks (RNNs)',
            text: 'RNNs handle sequential data, which suits time-series analysis. In network security, RNNs detect anomalies in network traffic over time, identifying patterns that indicate ongoing attacks or data exfiltration attempts.',
          },
        ],
      },
      {
        number: '11',
        title: 'Detection and Mitigation of Threats in Big Data',
        sections: [
          {
            type: 'text',
            heading: '11.1 How AI/ML Changed Threat Detection',
            text: 'Applying AI and ML to network security has fundamentally transformed how threats are detected and mitigated. These technologies analyse vast amounts of network data in real time, identifying and responding to potential threats more effectively and efficiently than traditional methods, and enabling proactive defences that adapt to the evolving threat landscape.',
          },
          {
            type: 'image',
            src: '/lecture-notes/cyb-224/ml-detection-pipeline.webp',
            width: 1000, height: 1174,
            maxWidth: 620,
            alt: 'A six-stage pipeline: data collection from network traffic, data preprocessing (cleansing and feature extraction), model training with neural networks, decision trees and SVM, real-time monitoring and detection, threat identification and mitigation, then automated response such as blocking IPs and isolating devices',
            caption: 'Figure 5: The ML threat-detection pipeline, from raw traffic to automated response',
          },
          {
            type: 'termlist',
            heading: '11.2 Anomaly Detection',
            items: [
              { term: 'Baseline behaviour modeling', def: 'The system first establishes what normal looks like by analysing historical data — typical login times, frequency of data access, common communication patterns — building a profile of regular activity' },
              { term: 'Real-time monitoring', def: 'Traffic and activity are watched continuously and any deviation from the baseline is flagged; statistical analysis, clustering, and neural networks are common here. A sudden spike in data transfer volume or an unusual login time triggers an alert' },
              { term: 'Contextual analysis', def: 'User behaviour analytics (UBA) separates normal activity from suspicious action using context — time of day, location, user role — which improves accuracy and reduces false positives' },
            ],
          },
          {
            type: 'termlist',
            heading: '11.3 Threat Identification',
            items: [
              { term: 'Pattern recognition', def: 'Models are trained to recognise patterns associated with known threats. Signature-based detection uses predefined malware patterns; ML extends this to variations and new patterns signatures would miss, such as polymorphic malware that changes its code to evade detection' },
              { term: 'Behavioural analysis', def: "Rather than relying only on known patterns, the model analyses how entities behave — a rise in failed logins, unusual data transfers, unexpected communication. This is especially useful for zero-day attacks and APTs, where the attacker's behaviour deviates from normal user activity" },
            ],
          },
          {
            type: 'termlist',
            heading: '11.4 Predictive Analytics',
            items: [
              { term: 'Predictive modeling', def: 'Trends and historical data are used to anticipate attacks and identify vulnerabilities before they are exploited — time-series analysis can forecast a potential DDoS by spotting patterns in traffic volume and alerting administrators to act' },
              { term: 'Risk assessment', def: 'Evaluating the potential impact and likelihood of different threats lets the system prioritise responses and allocate resources — determining the criticality of assets and protecting high-value targets first' },
            ],
          },
          {
            type: 'table',
            heading: '11.5 Activity — Supervised or Unsupervised?',
            headers: ['Scenario', 'Approach', 'Why'],
            rows: [
              ['Spam detection', 'Supervised', 'Labeled examples of spam and non-spam are available'],
              ['Unknown network traffic patterns', 'Unsupervised', 'No prior labels exist for new or evolving attack patterns'],
              ['Malware family classification', 'Supervised', 'Historical data exists for the different malware families'],
              ['Insider behaviour anomaly detection', 'Unsupervised', 'Insider threats are rare and often lack predefined labels'],
            ],
          },
          {
            type: 'termlist',
            heading: '11.6 Activity — Adversarial Thinking',
            items: [
              { term: 'How might attackers use machine learning to bypass security systems?', def: 'To generate evasive malware, craft sophisticated phishing campaigns, or learn to mimic normal user behaviour and avoid detection' },
              { term: 'Why must ML systems in cybersecurity consider adversarial threats?', def: 'Because attackers actively adapt to evade detection, models must be robust against adversarial examples and continuously updated to counter new evasion techniques' },
              { term: 'What is adversarial machine learning?', def: 'The field that studies the vulnerability of ML models to malicious inputs (adversarial examples) and develops techniques to make those models more robust' },
            ],
          },
          {
            type: 'termlist',
            heading: '11.7 Activity — Pattern Recognition vs Anomaly Detection',
            items: [
              { term: 'A problem best solved by pattern recognition?', def: 'Detecting known malware variants from their characteristic code signatures or network traffic patterns' },
              { term: 'A problem best solved by anomaly detection?', def: 'Identifying a zero-day attack or insider threat, where no signature exists but the behaviour deviates sharply from the established baseline' },
              { term: 'Why can anomaly detection generate false positives?', def: 'It flags any deviation from normal, so legitimate but unusual events — a new software update, a user working from a new location — can be mistaken for anomalies' },
              { term: 'Why can there be infinitely many anomalous patterns?', def: 'Anomalies are defined by deviation from the norm, and the ways something can differ from the norm are theoretically infinite — attackers also keep inventing new, unforeseen attack vectors' },
            ],
          },
          {
            type: 'casestudy',
            heading: '11.8 Activity — Case Study',
            prompt: 'A company observes that one employee suddenly accesses 50 times more files than usual, at 2:00 AM, from a new geographic location.',
            tasks: [
              'Is this a pattern recognition or an anomaly detection problem?',
              'What features would you extract to analyse this case?',
              'What risks exist if the model makes an incorrect prediction?',
            ],
          },
          {
            type: 'termlist',
            items: [
              { term: 'Which problem type?', def: "Anomaly detection — the scenario describes a significant deviation from the employee's usual behaviour in time, volume and location" },
              { term: 'Features to extract', def: 'Login time; login location (IP address, geo-coordinates); number of files accessed; type of files accessed; historical access patterns for that user; typical access patterns for users in similar roles' },
              { term: 'Risk of a false positive', def: 'Flagging legitimate activity as malicious causes unnecessary investigations, user inconvenience, and erosion of trust in the security system' },
              { term: 'Risk of a false negative', def: 'Missing genuine malicious activity can result in a data breach, financial loss, reputational damage, and compromise of the entire system' },
            ],
          },
        ],
      },
      {
        number: '12',
        title: 'Supervised Machine Learning for Threat Detection',
        sections: [
          {
            type: 'definition',
            heading: '12.1 The Trained Digital Sentry',
            text: 'In cybersecurity, supervised machine learning acts as a trained digital sentry. It learns from a labeled dataset of past incidents, identifying which patterns are harmless (benign) and which are dangerous (malicious). The two main tasks are classification — is this a threat? — and regression — how high is the risk?',
          },
          {
            type: 'termlist',
            heading: '12.2 The Procedural Workflow',
            items: [
              { term: 'Data labeling', def: 'Experts provide a dataset where every entry is tagged — for example 1 for malware, 0 for safe' },
              { term: 'Feature engineering', def: "Identifying the characteristics that signal a threat. For an email that might be the sender's IP, the number of links, or the presence of urgent-sounding keywords" },
              { term: 'Training', def: 'The algorithm processes the features to find a mathematical boundary between safe and unsafe' },
              { term: 'Testing / validation', def: 'The model is given new, unlabeled data to see whether it predicts the correct category' },
            ],
          },
          {
            type: 'termlist',
            heading: '12.3 Network Intrusion Detection (NIDS)',
            items: [
              { term: 'Purpose', def: 'Monitors traffic to identify unauthorized access or attacks such as DDoS' },
              { term: 'Common algorithms', def: 'Random Forest, Support Vector Machines' },
              { term: 'Indicators used', def: 'Byte counts, packet intervals, TCP flag combinations' },
              { term: 'How it works', def: 'The model learns the profile of a standard connection; if a connection shows features similar to a labeled SYN flood attack, it triggers an alert' },
            ],
          },
          {
            type: 'termlist',
            heading: '12.4 Malware Analysis',
            items: [
              { term: 'Purpose', def: 'Detecting zero-day threats that signature-based antivirus software might miss' },
              { term: 'Common algorithms', def: 'Decision Trees, K-Nearest Neighbors (KNN)' },
              { term: 'Indicators used', def: 'File size, API calls made by the code, registry key changes' },
              { term: 'How it works', def: 'Instead of looking for a specific fingerprint, the model looks at behavioural features — if a file behaves like previously labeled ransomware (rapid file encryption, for instance), it is quarantined' },
            ],
          },
          {
            type: 'termlist',
            heading: '12.5 Phishing and Spam Detection',
            items: [
              { term: 'Purpose', def: 'Analysing communication to stop social engineering' },
              { term: 'Common algorithms', def: 'Naive Bayes, Logistic Regression' },
              { term: 'Indicators used', def: 'URL length, use of IP addresses in place of domain names, suspicious call-to-action phrases' },
              { term: 'How it works', def: 'Naive Bayes calculates the probability that an email is phishing from the frequency of suspicious words seen in past labeled phishing campaigns' },
            ],
          },
          {
            type: 'image',
            heading: '12.6 Algorithm Comparison',
            src: '/lecture-notes/cyb-224/algorithm-comparison.webp',
            width: 1400, height: 596,
            alt: 'Mind map of security algorithms: Naive Bayes (phishing/spam, fast and text-friendly, assumes feature independence), Random Forest (network intrusion, accurate on large data, slow in real time), SVM (malware detection, strong on high-dimensional data, memory intensive), and Logistic Regression (fraud detection, gives a risk score, struggles with non-linear threats)',
            caption: 'Figure 6: Four supervised algorithms with their security use, strength, and weakness',
          },
          {
            type: 'table',
            headers: ['Algorithm', 'Typically Used For', 'Strength', 'Weakness'],
            rows: [
              ['Naive Bayes', 'Phishing / spam', 'Extremely fast; works well with text', 'Assumes features are independent'],
              ['Random Forest', 'Network intrusion', 'Highly accurate; handles large data', 'Can be slow to run in real time'],
              ['SVM', 'Malware detection', 'Excellent for complex, high-dimensional data', 'High memory consumption'],
              ['Logistic Regression', 'Fraud detection', 'Provides a clear risk score (0–100%)', 'Struggles with non-linear threats'],
            ],
          },
        ],
      },
      {
        number: '13',
        title: 'Exploratory Data Analysis and the Python Toolkit',
        sections: [
          {
            type: 'definition',
            heading: '13.1 What EDA Is',
            text: 'Exploratory Data Analysis (EDA) is the process of examining, summarising, and visualising a dataset to understand its main characteristics before applying formal models.',
          },
          {
            type: 'bullets',
            heading: '13.2 What EDA Is For',
            items: [
              'Discovering patterns in the data',
              'Detecting errors or missing values',
              'Identifying relationships between variables',
              'Checking the assumptions required for modelling',
            ],
          },
          {
            type: 'termlist',
            heading: '13.3 Types of EDA',
            items: [
              { term: 'Univariate (one variable)', def: 'Mean, median, mode; histograms and boxplots — used to understand the distribution of a single feature' },
              { term: 'Bivariate (two variables)', def: 'Scatter plots and correlation analysis — used to identify relationships between variables' },
              { term: 'Multivariate (many variables)', def: 'Heatmaps and pair plots — used to understand complex interactions' },
            ],
          },
          {
            type: 'text',
            heading: '13.4 Pandas — Data Manipulation and Analysis',
            text: 'Pandas loads datasets (CSV, Excel and more), organises data into tables called DataFrames, cleans and preprocesses that data, and performs statistical operations.',
          },
          {
            type: 'code',
            language: 'python',
            code: `import pandas as pd

df = pd.read_csv("data.csv")   # Load dataset
df.head()                      # View first rows
df.describe()                  # Summary statistics
df.isnull().sum()              # Check missing values`,
          },
          {
            type: 'text',
            heading: '13.5 NumPy — Numerical Computation',
            text: 'NumPy handles large numerical datasets efficiently, supports mathematical operations, and works with multi-dimensional arrays. In simple terms: NumPy is fast maths on numbers and arrays.',
          },
          {
            type: 'code',
            language: 'python',
            code: `import numpy as np

arr = np.array([1, 2, 3])
np.mean(arr)   # Mean
np.std(arr)    # Standard deviation
np.max(arr)    # Maximum value`,
          },
          {
            type: 'text',
            heading: '13.6 Matplotlib — Basic Visualisation',
            text: 'Matplotlib creates plots such as line charts, bar charts, and histograms. In simple terms: Matplotlib draws graphs from scratch.',
          },
          {
            type: 'code',
            language: 'python',
            code: `import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [4, 5, 6])
plt.title("Simple Plot")
plt.show()`,
          },
          {
            type: 'text',
            heading: '13.7 Seaborn — Statistical Visualisation',
            text: 'Seaborn builds on Matplotlib to provide attractive, easy-to-use statistical plots and handles complex visualisations easily. In simple terms: Seaborn draws beautiful and smarter graphs.',
          },
          {
            type: 'code',
            language: 'python',
            code: `import seaborn as sns

sns.countplot(x='label', data=df)             # Bar chart
sns.heatmap(df.corr())                        # Correlation heatmap
sns.boxplot(x='label', y='value', data=df)    # Boxplot`,
          },
        ],
      },
      {
        number: '14',
        title: 'Model Evaluation — Confusion Matrix and Metrics',
        sections: [
          {
            type: 'definition',
            heading: '14.1 The Confusion Matrix',
            text: 'Evaluation metrics for threat-detection models are derived from the confusion matrix, which summarises classification results by comparing the predicted labels with the actual labels.',
          },
          {
            type: 'termlist',
            heading: 'The Four Components',
            items: [
              { term: 'True Positive (TP)', def: 'The model correctly identifies a threat pattern' },
              { term: 'True Negative (TN)', def: 'The model correctly predicts that the system has no threat' },
              { term: 'False Positive (FP)', def: 'The model predicts a threat where there is none — a false alarm' },
              { term: 'False Negative (FN)', def: 'The model fails to detect a threat that is present — a miss' },
            ],
          },
          {
            type: 'text',
            heading: '14.2 Accuracy',
            text: 'Accuracy measures the proportion of correctly predicted instances out of all predictions made. It gives a general measure of overall performance — a higher accuracy means the model correctly classifies a large proportion of the dataset.',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Accuracy = (TP + TN) / (TP + TN + FP + FN)',
          },
          {
            type: 'text',
            heading: '14.3 Precision',
            text: 'Precision measures the proportion of positive predictions that are actually correct. A high precision value means the model produces fewer false alarms.',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Precision = TP / (TP + FP)',
          },
          {
            type: 'text',
            heading: '14.4 Recall (Sensitivity)',
            text: 'Recall measures the proportion of actual positive cases the model correctly identifies. In an IDS, recall matters especially because failing to detect a real threat (a false negative) delays intervention and response — so threat-screening models are often tuned to maximise recall.',
          },
          {
            type: 'code',
            language: 'math',
            code: 'Recall = TP / (TP + FN)',
          },
          {
            type: 'text',
            heading: '14.5 F1 Score',
            text: 'The F1-score is the harmonic mean of precision and recall, giving a balanced measure when both false positives and false negatives matter. It is especially useful on imbalanced datasets because it considers both quantities simultaneously.',
          },
          {
            type: 'code',
            language: 'math',
            code: 'F1 = 2 × (Precision × Recall) / (Precision + Recall)',
          },
        ],
      },
      {
        number: '15',
        title: 'Practical — EDA on the UNSW-NB15 IDS Dataset',
        sections: [
          {
            type: 'code',
            heading: '15.1 Load and Explore',
            language: 'python',
            code: `# 1. Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_style("whitegrid")

# 2. Load Dataset
file_path = "UNSW_NB15_dataset.csv"   # update path if needed
df = pd.read_csv(file_path)

# 3. Basic Exploration
print("First 5 rows:")
print(df.head())

print("\\nDataset Info:")
print(df.info())
print("\\nDataset Shape:")
print(df.shape)
print("\\nColumn Names:")
print(df.columns)

# 4. Preprocessing - Missing Values
print("\\nMissing Values:")
missing = df.isnull().sum()
print(missing[missing > 0])

# 5. Statistical Summary
print("\\nStatistical Summary:")
print(df.describe())

# 6. Categorical Features Analysis
categorical_cols = df.select_dtypes(include='object').columns
for col in categorical_cols:
    print(f"\\nValue Counts for {col}:")
    print(df[col].value_counts().head())`,
          },
          {
            type: 'code',
            heading: '15.2 Target and Feature Distributions',
            language: 'python',
            code: `# 7. Target Variable Analysis - binary label
plt.figure()
sns.countplot(x='label', data=df)
plt.title("Distribution of Target Variable (Label)")
plt.show()

# Attack categories
plt.figure(figsize=(10, 5))
sns.countplot(x='attack_cat', data=df, order=df['attack_cat'].value_counts().index)
plt.xticks(rotation=45)
plt.title("Attack Category Distribution")
plt.show()

# 8. Numerical Features Distribution
num_cols = df.select_dtypes(include=np.number).columns
df[num_cols].hist(figsize=(15, 12))
plt.suptitle("Histogram of Numerical Features")
plt.show()

# 9. Correlation Matrix
plt.figure(figsize=(12, 10))
corr = df[num_cols].corr()
sns.heatmap(corr, cmap='coolwarm', annot=False)
plt.title("Correlation Matrix")
plt.show()`,
          },
          {
            type: 'code',
            heading: '15.3 Outliers, Relationships and Class Imbalance',
            language: 'python',
            code: `# 10. Boxplots for Outlier Detection
plt.figure(figsize=(15, 10))
for i, col in enumerate(num_cols[:10]):   # first 10 features
    plt.subplot(2, 5, i + 1)
    sns.boxplot(y=df[col])
    plt.title(col)

plt.tight_layout()
plt.show()

# 11. Pairplot (sampled for performance)
sample_df = df.sample(n=1000, random_state=42)
sns.pairplot(sample_df[['dur', 'spkts', 'dpkts', 'sbytes', 'dbytes', 'label']], hue='label')
plt.show()

# 12. Feature Relationships with Target
plt.figure(figsize=(10, 6))
sns.boxplot(x='label', y='sbytes', data=df)
plt.title("sbytes vs Label")
plt.show()

plt.figure(figsize=(10, 6))
sns.boxplot(x='label', y='dbytes', data=df)
plt.title("dbytes vs Label")
plt.show()

# 13. Class Imbalance Check
print("\\nClass Distribution:")
print(df['label'].value_counts(normalize=True))`,
          },
        ],
      },
      {
        number: '16',
        title: 'Practical — SVM and KNN for Intrusion Detection',
        sections: [
          {
            type: 'code',
            heading: '16.1 SVM with an RBF Kernel',
            language: 'python',
            code: `# 1. Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import (accuracy_score, precision_score,
                             recall_score, f1_score, confusion_matrix,
                             ConfusionMatrixDisplay, classification_report)

# 2. Load Dataset
df = pd.read_csv('/content/UNSW_NB15_dataset.csv')

# 3. Data Preprocessing - drop missing values
df = df.dropna()

# Encode categorical features
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Split features and target
X = df.iloc[:, :-1]   # all columns except last
y = df.iloc[:, -1]    # last column as target

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 5. Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 6. Train SVM Model
svm_model = SVC(kernel='rbf', C=1.0, gamma='scale')
svm_model.fit(X_train, y_train)

# 7. Predictions
y_pred = svm_model.predict(X_test)

# 8. Evaluation Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print("===== SVM Performance =====")
print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1-score : {f1:.4f}")
print("\\nClassification Report:\\n")
print(classification_report(y_test, y_pred))

# 9. Confusion Matrix Plot
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.title("Confusion Matrix - SVM")
plt.show()

# 10. Performance Metrics Bar Plot
metrics = ['Accuracy', 'Precision', 'Recall', 'F1-score']
values = [accuracy, precision, recall, f1]
plt.figure()
plt.bar(metrics, values)
plt.title("SVM Performance Metrics")
plt.xlabel("Metrics")
plt.ylabel("Score")
plt.show()`,
          },
          {
            type: 'code',
            heading: '16.2 Alternative — LinearSVC with an ROC Curve',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.metrics import (classification_report, confusion_matrix,
                             accuracy_score, precision_score,
                             recall_score, f1_score, roc_curve, auc)

# 1. Load the dataset
df = pd.read_csv('UNSW_NB15_dataset.csv')

# 2. Preprocessing - drop non-predictive columns and the multiclass target
X = df.drop(['id', 'attack_cat', 'label'], axis=1)
y = df['label']

# Convert categorical features (proto, service, state) to dummy variables
X = pd.get_dummies(X, columns=['proto', 'service', 'state'], drop_first=True)

# 3. Split into training and testing sets (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Feature Scaling (crucial for SVM performance)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 5. Model Training (LinearSVC is optimised for large datasets)
svm_model = LinearSVC(dual=False, random_state=42, max_iter=5000)
svm_model.fit(X_train_scaled, y_train)

# 6. Evaluation
y_pred = svm_model.predict(X_test_scaled)
print("Performance Metrics:")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))

# 7. Plotting Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix - SVM')
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.savefig('confusion_matrix_svm.png')

# 8. Plotting ROC Curve
y_score = svm_model.decision_function(X_test_scaled)
fpr, tpr, _ = roc_curve(y_test, y_score)
roc_auc = auc(fpr, tpr)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', linestyle='--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve - SVM')
plt.legend(loc="lower right")
plt.savefig('roc_curve_svm.png')`,
          },
          {
            type: 'code',
            heading: '16.3 Intrusion Detection Using KNN',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (classification_report, confusion_matrix,
                             accuracy_score, precision_score,
                             recall_score, f1_score, roc_curve, auc)

# 1. Load data
df = pd.read_csv('UNSW_NB15_dataset.csv')

# 2. Preprocessing
X = df.drop(['id', 'attack_cat', 'label'], axis=1)
y = df['label']
X = pd.get_dummies(X, columns=['proto', 'service', 'state'], drop_first=True)

# 3. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                    random_state=42)

# 4. Feature Scaling (mandatory for KNN)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 5. Train KNN Model (k=5)
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train_scaled, y_train)

# 6. Predictions and Probability
y_pred = knn.predict(X_test_scaled)
y_prob = knn.predict_proba(X_test_scaled)[:, 1]

# 7. Print Performance
print(f'Accuracy: {accuracy_score(y_test, y_pred):.4f}')
print(classification_report(y_test, y_pred))

# 8. Plot Confusion Matrix
plt.figure(figsize=(8, 6))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Greens')
plt.title('Confusion Matrix - KNN')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.savefig('confusion_matrix_knn.png')

# 9. Plot ROC Curve
fpr, tpr, _ = roc_curve(y_test, y_prob)
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='forestgreen', label=f'AUC = {auc(fpr, tpr):.2f}')
plt.plot([0, 1], [0, 1], linestyle='--')
plt.title('ROC Curve - KNN')
plt.legend()
plt.savefig('roc_curve_knn.png')`,
          },
        ],
      },
      {
        number: '17',
        title: 'Practical — Decision Tree for Intrusion Detection',
        sections: [
          {
            type: 'text',
            heading: '17.1 About This Implementation',
            text: 'A full Decision Tree model for intrusion detection on the UNSW-NB15 dataset: data loading, preprocessing, training, evaluation, and k-fold cross-validation. Note that feature scaling is optional for a decision tree — splits are threshold-based, so the scale of a feature does not change the tree — but it is kept here so the same preprocessing serves other models too.',
          },
          {
            type: 'code',
            heading: '17.2 Load, Preprocess and Train',
            language: 'python',
            code: `# 1. Import Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             f1_score, confusion_matrix,
                             ConfusionMatrixDisplay, classification_report)

# 2. Load Dataset
df = pd.read_csv('UNSW_NB15_dataset.csv')

# 3. Data Preprocessing - drop missing values
df = df.dropna()

# Encode categorical features
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Features and target
X = df.iloc[:, :-1]  # all columns except last
y = df.iloc[:, -1]   # last column (target)

# 4. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 5. Feature Scaling (optional for a Decision Tree)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 6. Train Decision Tree Model
dt_model = DecisionTreeClassifier(
    criterion='gini',   # or 'entropy'
    max_depth=None,     # you can tune this
    random_state=42
)
dt_model.fit(X_train, y_train)

# 7. Predictions
y_pred = dt_model.predict(X_test)`,
          },
          {
            type: 'code',
            heading: '17.3 Evaluate and Cross-Validate',
            language: 'python',
            code: `# 8. Evaluation Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted')
recall = recall_score(y_test, y_pred, average='weighted')
f1 = f1_score(y_test, y_pred, average='weighted')

print("===== Decision Tree Performance =====")
print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1-score : {f1:.4f}")

print("\\nClassification Report:\\n")
print(classification_report(y_test, y_pred))

# 9. Confusion Matrix Plot
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)
disp.plot()
plt.title("Confusion Matrix - Decision Tree")
plt.show()

# 10. Performance Metrics Bar Plot
metrics = ['Accuracy', 'Precision', 'Recall', 'F1-score']
values = [accuracy, precision, recall, f1]

plt.figure()
plt.bar(metrics, values)
plt.title("Decision Tree Performance Metrics")
plt.xlabel("Metrics")
plt.ylabel("Score")
plt.show()

# 11. K-Fold Cross-Validation
cv_scores = cross_val_score(dt_model, X, y, cv=5, scoring='accuracy')

print("\\nCross-Validation Scores:", cv_scores)
print("Mean CV Accuracy:", np.mean(cv_scores))`,
          },
        ],
      },
      {
        number: '18',
        title: 'Network Anomaly Detection with K-Means',
        sections: [
          {
            type: 'definition',
            heading: '18.1 Detecting Patterns, Not Signatures',
            text: 'In cybersecurity, threat detection often relies on identifying unusual patterns rather than known virus signatures. NumPy, K-Means clustering, and Matplotlib work together to detect anomalies in network behaviour without any labeled attack data.',
          },
          {
            type: 'termlist',
            heading: '18.2 The Tools and Their Roles',
            items: [
              { term: 'NumPy — data preparation', def: 'Converts raw security logs into structured numerical arrays, which allow fast mathematical computation' },
              { term: 'Scikit-learn (K-Means) — detection', def: 'An unsupervised algorithm that groups data into clusters; points far from the cluster centres (centroids) are considered anomalies' },
              { term: 'Matplotlib — visualisation', def: 'Displays the clustered data so analysts can identify suspicious outliers at a glance' },
              { term: 'Pandas — data handling', def: 'Used for loading, manipulating and analysing the log data before it is turned into arrays' },
            ],
          },
          {
            type: 'image',
            heading: '18.3 Workflow',
            src: '/lecture-notes/cyb-224/kmeans-workflow.webp',
            width: 1000, height: 1148,
            maxWidth: 560,
            alt: 'Five-step flow: collect network activity data, convert to a NumPy array, apply K-Means clustering, identify data points far from centroids, then visualise clusters and anomalies',
            caption: 'Figure 7: The K-Means anomaly detection workflow',
          },
          {
            type: 'bullets',
            items: [
              'Collect network activity data — for example bytes transferred and session duration',
              'Convert the data into a NumPy array',
              'Apply K-Means clustering to group normal behaviours',
              'Identify data points far from the cluster centroids',
              'Visualise clusters and anomalies using Matplotlib',
            ],
          },
          {
            type: 'casestudy',
            title: 'Practical Example',
            prompt: 'A user normally downloads small files of 1–2 MB. Suddenly, one session shows a 10 GB transfer at 3:00 AM. This behaviour would sit far from the cluster of normal sessions and be flagged as anomalous.',
          },
          {
            type: 'code',
            heading: '18.4 Python Implementation',
            language: 'python',
            code: `# Import Libraries
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 1. Organize Data (example: network activity)
# Format: [Data Volume, Session Duration]
data = np.array([[1, 2],
                 [1, 1],
                 [2, 1.5],
                 [10, 10]])   # potential threat (anomaly)

# 2. Apply K-Means Clustering
kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(data)

# 3. Visualize Results
plt.scatter(data[:, 0], data[:, 1], c=kmeans.labels_)
plt.scatter(kmeans.cluster_centers_[:, 0],
            kmeans.cluster_centers_[:, 1],
            marker='X', s=200)
plt.xlabel("Data Volume")
plt.ylabel("Session Duration")
plt.title("Anomaly Detection Using K-Means")
plt.show()`,
          },
          {
            type: 'code',
            heading: '18.5 Variant — Simulated Traffic',
            language: 'python',
            code: `import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Simulated traffic data
traffic = np.array([[10, 100],
                    [12, 120],
                    [11, 110],
                    [200, 1000],   # anomaly
                    [9, 95]])

kmeans = KMeans(n_clusters=2, random_state=42)
kmeans.fit(traffic)
labels = kmeans.labels_

plt.scatter(traffic[:, 0], traffic[:, 1], c=labels)
plt.xlabel("Requests per Second")
plt.ylabel("Data Volume")
plt.show()`,
          },
        ],
      },
      {
        number: '19',
        title: 'The k-Nearest Neighbours (k-NN) Algorithm',
        sections: [
          {
            type: 'definition',
            heading: '19.1 Lazy Learning',
            text: 'The k-Nearest Neighbours (k-NN) algorithm is a simple and well-known example of a lazy learning algorithm. Lazy learners delay most computation until the classification stage instead of doing intensive work during training.',
          },
          {
            type: 'bullets',
            heading: '19.2 Training Phase',
            items: [
              'Stores all training feature vectors and their corresponding labels',
              'No model building or parameter learning is performed',
            ],
          },
          {
            type: 'bullets',
            heading: '19.3 Classification Phase',
            items: [
              'Calculates the distance between the test sample and all training samples',
              'Selects the k nearest neighbours',
              'Assigns the most common label among those neighbours',
            ],
          },
          {
            type: 'termlist',
            heading: '19.4 Distance Metrics',
            items: [
              { term: 'Euclidean distance', def: 'Used for continuous numerical data' },
              { term: 'Hamming distance', def: 'Used for discrete or categorical data' },
            ],
          },
          {
            type: 'proscons',
            heading: '19.5 Advantages and Disadvantages',
            advantages: [
              'Simple to understand and implement',
              'Very fast training phase',
              'Useful for teaching machine learning concepts',
            ],
            disadvantages: [
              'Large memory usage — it stores all the training data',
              'Slow classification time',
              'Not efficient for very large datasets',
              'Performance depends on the choice of k and the distance metric',
            ],
          },
          {
            type: 'note',
            text: 'Optimised data structures such as k-d trees can speed up the neighbour search. Overall: k-NN is simple and intuitive, storing training data and predicting from similarity — effective on small datasets but inefficient for large-scale real-world applications.',
          },
          {
            type: 'casestudy',
            heading: '19.6 Activity — k-NN Review Questions',
            tasks: [
              'Define the k-Nearest Neighbours (k-NN) algorithm.',
              'What is meant by lazy learning?',
              'What happens during the training phase of k-NN?',
              'What happens during the classification phase?',
              'Explain the role of the parameter k.',
              'When is Hamming distance used?',
              'Why is k-NN considered memory inefficient?',
              'What is the purpose of a k-d tree in k-NN?',
              'What happens if k = 1?',
              'What happens if k is too large?',
              'How would you choose the best value of k?',
              'How does feature scaling affect k-NN performance?',
              'Compare k-NN with Random Forest in terms of training time and prediction time.',
            ],
          },
        ],
      },
      {
        number: '20',
        title: 'Anomaly Detection with Pandas and Scikit-learn',
        sections: [
          {
            type: 'termlist',
            heading: '20.1 Main Functions of Pandas',
            items: [
              { term: 'Data creation', def: 'Build datasets using DataFrame and Series — e.g. df = pd.read_csv(path)' },
              { term: 'Data cleaning', def: 'Handle missing values, remove duplicates, filter unwanted records' },
              { term: 'Data selection and filtering', def: 'Select rows and columns — e.g. X = df.drop("label", axis=1)' },
              { term: 'Data transformation', def: 'Modify columns, convert data types, engineer features' },
              { term: 'Data exploration', def: 'Summary statistics with df.describe(), first rows with df.head()' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Pandas in an Intrusion Detection Script',
            items: [
              'Creating the simulated login dataset',
              'Organising login attempts and failed attempts',
              'Separating the input features (X) from the labels (y)',
            ],
          },
          {
            type: 'termlist',
            heading: '20.2 Main Functions of Scikit-learn',
            items: [
              { term: 'Data splitting', def: 'Split the dataset into training and testing sets with train_test_split()' },
              { term: 'Model building', def: 'Classification (Random Forest, SVM, Logistic Regression), regression, and clustering' },
              { term: 'Model training', def: 'Fit the model to the data with model.fit(X_train, y_train)' },
              { term: 'Prediction', def: 'Predict outcomes with model.predict(X_test)' },
            ],
          },
          {
            type: 'code',
            heading: '20.3 Isolation Forest — Unsupervised Anomaly Detection',
            language: 'python',
            code: `from sklearn.ensemble import IsolationForest

model = IsolationForest(contamination=0.2)
model.fit(traffic)

anomalies = model.predict(traffic)
print("Anomaly Labels:", anomalies)
# -1 = anomaly, 1 = normal`,
          },
        ],
      },
      {
        number: '21',
        title: 'Practical — Credit Card Fraud Anomaly Detection',
        sections: [
          {
            type: 'resource',
            href: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
            label: 'Credit Card Fraud Detection dataset',
            filename: 'creditcard.csv',
            meta: 'Kaggle · mlg-ulb/creditcardfraud',
          },
          {
            type: 'code',
            heading: '21.1 Exploratory Analysis',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Optional - better looking plots
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("muted")

df = pd.read_csv('/content/creditcard.csv')   # change path if needed
df.head(5)
df.tail(5)

print("Shape:", df.shape)
print("\\nColumns:")
print(df.columns.tolist())
print(df.info())

# Summarize the dataset
print(df.describe().T[['mean', 'std', 'min', '50%', 'max']])

# Check target distribution
print("\\nClass distribution:")
print(df['Class'].value_counts())
print(df['Class'].value_counts(normalize=True).mul(100).round(3))

plt.figure(figsize=(5, 4))
sns.countplot(data=df, x='Class')
plt.title("Class Distribution\\n(0 = Normal 1 = Fraud)")
plt.xlabel("Class (0 = genuine, 1 = fraud)")
plt.ylabel("Count")
plt.show()

# Missing values?
print("\\nMissing values:")
print(df.isna().sum().sum(), "missing values in total")

# Time feature analysis
plt.figure(figsize=(14, 5))

plt.subplot(1, 2, 1)
sns.histplot(df['Time'] / 3600, bins=48, kde=True)
plt.title("Transaction Time (hours from first record)")
plt.xlabel("Time (hours)")

plt.subplot(1, 2, 2)
sns.boxplot(x='Class', y='Time', data=df)
plt.title("Time by Class")
plt.show()

# Amount feature (very skewed!)
print("\\nAmount statistics:")
print(df['Amount'].describe())

plt.figure(figsize=(14, 5))

plt.subplot(1, 2, 1)
sns.histplot(df['Amount'], bins=60, kde=True)
plt.title("Transaction Amount (original scale)")
plt.xlim(0, 500)

plt.subplot(1, 2, 2)
sns.histplot(np.log1p(df['Amount']), bins=60, kde=True)
plt.title("log1p(Amount) - much better behaved")
plt.show()

# Compare amounts by class
plt.figure(figsize=(10, 6))
sns.boxplot(x='Class', y='Amount', data=df, showfliers=False)   # hide outliers for a better view
plt.title("Transaction Amount by Class")
plt.yscale('log')
plt.show()

# PCA features (V1-V28) - density plots, fraud vs non-fraud
v_cols = [f'V{i}' for i in range(1, 29)]
selected = ['V3', 'V4', 'V10', 'V11', 'V12', 'V14', 'V17']   # often the most discriminative

plt.figure(figsize=(14, 10))
for i, col in enumerate(selected, 1):
    plt.subplot(3, 3, i)
    sns.kdeplot(data=df, x=col, hue='Class', common_norm=False)
    plt.title(f"{col} distribution by class")
    plt.xlabel(col)

plt.tight_layout()
plt.show()

# Correlation heatmap - focus on the top features plus Class and Amount
plt.figure(figsize=(12, 10))
corr_cols = ['Time', 'Amount', 'Class'] + selected
corr = df[corr_cols].corr()
sns.heatmap(corr, annot=True, fmt='.2f')
plt.show()`,
          },
          {
            type: 'code',
            heading: '21.2 Model Comparison — SVM, KNN, Decision Tree, Random Forest',
            language: 'python',
            code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (classification_report, confusion_matrix,
                             precision_recall_curve, roc_curve, auc,
                             accuracy_score)

# Load data
df = pd.read_csv('creditcard.csv')

# Preprocessing: scale Amount and Time
scaler = StandardScaler()
df['Amount'] = scaler.fit_transform(df['Amount'].values.reshape(-1, 1))
df['Time'] = scaler.fit_transform(df['Time'].values.reshape(-1, 1))

# Features and target
X = df.drop('Class', axis=1)
y = df['Class']

# To keep models within time limits, use a stratified 10% sample of the data
X_sample, _, y_sample, _ = train_test_split(X, y, train_size=0.1, stratify=y, random_state=42)

# Now split the sample into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_sample, y_sample, test_size=0.3,
                                                    stratify=y_sample, random_state=42)

print(f"Training set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")
print(f"Fraud cases in training: {y_train.sum()}")
print(f"Fraud cases in test: {y_test.sum()}")

models = {
    "SVM": LinearSVC(random_state=42, max_iter=2000),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
}

results = []

# Create plots
fig_cm, axes_cm = plt.subplots(2, 2, figsize=(15, 12))
axes_cm = axes_cm.ravel()

plt.figure(figsize=(10, 8))
plt.title('ROC Curves')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')

plt.figure(figsize=(10, 8))
plt.title('Precision-Recall Curves')
plt.xlabel('Recall')
plt.ylabel('Precision')

for i, (name, model) in enumerate(models.items()):
    print(f"Processing {name}...")
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Probabilities / scores
    if hasattr(model, "predict_proba"):
        y_score = model.predict_proba(X_test)[:, 1]
    else:
        y_score = model.decision_function(X_test)

    # Metrics
    report = classification_report(y_test, y_pred, output_dict=True)
    results.append({
        "Model": name,
        "Accuracy": accuracy_score(y_test, y_pred),
        "Precision (Fraud)": report['1']['precision'],
        "Recall (Fraud)": report['1']['recall'],
        "F1-Score (Fraud)": report['1']['f1-score']
    })

    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=axes_cm[i])
    axes_cm[i].set_title(f'Confusion Matrix: {name}')

    # ROC Curve
    fpr, tpr, _ = roc_curve(y_test, y_score)
    roc_auc = auc(fpr, tpr)
    plt.figure(1)  # ROC figure
    plt.plot(fpr, tpr, label=f'{name} (AUC = {roc_auc:.2f})')

    # PR Curve
    precision, recall, _ = precision_recall_curve(y_test, y_score)
    plt.figure(2)  # PR figure
    plt.plot(recall, precision, label=name)

# Finalize and Save
fig_cm.savefig('confusion_matrices.png')

plt.figure(1)
plt.plot([0, 1], [0, 1], 'k--')
plt.legend()
plt.savefig('roc_curves.png')

plt.figure(2)
plt.legend()
plt.savefig('precision_recall_curves.png')

summary_df = pd.DataFrame(results)
print("\\n--- Performance Comparison ---")
print(summary_df.to_string(index=False))`,
          },
          {
            type: 'table',
            heading: '21.3 Report Your Results',
            headers: ['Model', 'Accuracy', 'Precision', 'Recall', 'F1-score'],
            rows: [
              ['SVM', '', '', '', ''],
              ['KNN', '', '', '', ''],
              ['Decision Tree', '', '', '', ''],
              ['Random Forest', '', '', '', ''],
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'CYB 222',
    slug: 'cyb-222',
    title: 'Cybersecurity Innovation and New Technologies',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Emerging technologies and their cybersecurity implications: AI in security, blockchain, quantum computing threats to cryptography, zero-trust architecture, and the innovation lifecycle in the security industry.',
    topics: [
      'AI and machine learning in threat detection',
      'Blockchain technology and its security properties',
      'Quantum computing and the threat to current cryptography',
      'Zero-trust architecture: principles and implementation',
      'Security automation: SOAR platforms overview',
      'Emerging threat vectors: deepfakes, AI-generated attacks',
      'Security innovation lifecycle and technology adoption',
      'Open-source intelligence (OSINT) modern tools',
    ],
    textbooks: [
      { title: 'AI and Machine Learning for Coders', authors: 'Laurence Moroney', note: 'Accessible entry point to AI for non-ML specialists' },
      { title: 'Blockchain Basics', authors: 'Daniel Drescher', note: 'Clear, non-mathematical introduction to blockchain' },
    ],
    searchTerms: [
      'Zero trust architecture explained simply',
      'AI in cybersecurity threat detection use cases',
      'Quantum computing threat to encryption explained',
      'Blockchain security properties tutorial',
    ],
    studyTips: [
      'Stay current — this course changes rapidly; subscribe to a cybersecurity newsletter (SANS, Dark Reading)',
      'Zero trust ("never trust, always verify") is a major industry direction — understand it thoroughly',
      'Quantum threats to RSA and AES connect directly to your Cryptography course in 300L',
      'For exam essays, structure answers around: what the technology is, its security benefit, and its risk',
    ],
    lectureNotes: [
      {
        number: '0',
        title: 'AI & Machine Learning in Threat Detection',
        sections: [
          {
            type: 'text',
            text: 'Group 0 research project — by Amasi Rhema. An assigned project topic for CYB 222, examining how Artificial Intelligence (AI) and Machine Learning (ML) are transforming cybersecurity threat detection.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              'Signature-based detection only catches attacks it has already seen — zero-days, polymorphic malware and insider abuse walk straight past it',
              'AI and ML detect by behaviour instead: baseline what normal looks like, flag the deviation, adapt in real time',
              'Three ML families do the work — supervised (spam, malware classification), unsupervised (anomaly detection), and deep learning (CNN, RNN, LSTM)',
              'Applied across IDS, malware and phishing detection, fraud, IoT monitoring and automated incident response',
              'The cost: false positives, model bias, adversarial attacks, privacy exposure and heavy compute — which is why human oversight and Explainable AI remain essential',
            ],
          },
          {
            type: 'definition',
            heading: 'Abstract',
            text: 'Traditional security relied on signature-based detection, matching known attack patterns against incoming data — an approach that fails against the rapid evolution of cyberattacks. AI and ML fundamentally change threat detection by letting systems learn from data, recognise behavioural anomalies, and adapt to emerging threats in real time. The trade-off is a new set of challenges — false positives, adversarial attacks, privacy concerns, computational cost, and a lack of interpretability — which is why human oversight and ethical frameworks remain essential.',
          },
          {
            type: 'bullets',
            heading: 'Why Traditional Detection Falls Short',
            items: [
              'Signature-based systems only catch previously known attacks',
              'Zero-day attacks have no existing signature to match',
              'Polymorphic malware constantly changes its signature',
              'Credential abuse and insider threats look like legitimate activity',
              'Malicious traffic hidden inside encryption evades inspection',
            ],
          },
          {
            type: 'note',
            text: "Think of a hostel gateman holding a photo album of known troublemakers. Signature-based detection is him checking every face against the album — anyone not pictured strolls straight in. AI-based detection is the gateman who has watched the hostel for years: he doesn't need your photo to notice you carrying someone else's mattress out at 2 a.m. He knows what normal looks like, so the unusual stands out — even on a face he has never seen before.",
          },
          {
            type: 'bullets',
            heading: 'Where AI & ML Are Applied (Use Cases)',
            items: [
              'Intrusion Detection Systems (IDS) — anomaly-based detection of unseen attacks',
              'Malware detection — analyses behaviour, not just stored signatures',
              'Phishing detection — NLP on email content, URLs, and sender behaviour',
              'Fraud detection — flags unusual transactions and login locations',
              'Threat intelligence & behavioural analysis — links attacks, surfaces emerging threats',
              'IoT security — monitors device behaviour for compromise',
              'Automated incident response — prioritises alerts, isolates compromised systems',
              'Predictive threat detection — forecasts attacks from historical and live data',
            ],
          },
          {
            type: 'termlist',
            heading: 'Machine Learning Techniques Used',
            items: [
              { term: 'Supervised Learning', def: 'Trained on labelled normal/malicious data — spam filtering, malware classification, IDS, fraud. Algorithms: Decision Trees, Random Forest, SVM, Logistic Regression, Naive Bayes.' },
              { term: 'Unsupervised Learning', def: 'Finds hidden patterns in unlabelled data for anomaly detection and user-behaviour analytics. Techniques: K-Means, PCA, Autoencoders, density-based clustering.' },
              { term: 'Deep Learning', def: 'Neural networks for large, complex datasets — malware detection, traffic classification, advanced IDS. Models: CNN, RNN, LSTM, Transformers.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Behavioural Analysis & Monitoring',
            items: [
              'Baselines normal behaviour: login patterns, file access, network activity, typing patterns',
              'Flags deviations from the baseline as potential threats',
              'Key tooling: UEBA (User & Entity Behaviour Analytics), EDR, and SIEM',
            ],
          },
          {
            type: 'table',
            heading: 'Traditional vs AI-Based Threat Detection',
            headers: ['Traditional Systems', 'AI-Based Systems'],
            rows: [
              ['Signature-based detection', 'Behaviour-based detection'],
              ['Detects known threats only', 'Detects known and unknown threats'],
              ['Mostly reactive', 'Predictive and proactive'],
              ['Manual analysis required', 'Automated analysis'],
              ['Limited scalability', 'Highly scalable'],
              ['Slower response time', 'Real-time response capability'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Challenges & Limitations',
            items: [
              'False positives and false negatives from poor or incomplete training data',
              'Bias in models when training datasets are skewed or incomplete',
              'Adversarial attacks — crafted inputs that mislead the model (an "arms race")',
              'Privacy concerns from large-scale collection of user and network data',
              'High computational cost — deep learning needs GPUs and large infrastructure',
              'Lack of regulation and standardisation across the industry',
            ],
          },
          {
            type: 'bullets',
            heading: 'Recommendations',
            items: [
              'Strengthen AI governance and regulation (accountability, transparency, data protection)',
              'Adopt Explainable AI (XAI) instead of opaque "black-box" models',
              'Provide continuous cybersecurity training on AI-driven threats',
              'Use human–AI collaboration — AI assists analysts, it does not replace them',
              'Invest in adversarial-defence research to harden models',
              'Improve data-privacy practices (anonymisation, federated learning)',
              'Build scalable infrastructure to support AI workloads',
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'AI and ML significantly enhance cybersecurity through real-time detection, behavioural analysis, and predictive forecasting — but they cannot replace human expertise. Their effectiveness depends on responsible implementation, ethical governance, and continuous human oversight. AI strengthens digital defence, yet cannot eliminate risk entirely.',
          },
          {
            type: 'resource',
            label: 'Read the full research report — Group 0',
            filename: 'group 0.docx',
            meta: 'DOCX · 27 KB',
            href: 'https://ggzucldiniltagxnktsv.supabase.co/storage/v1/object/public/course-materials/cyb-222/1783192051656-d7ps9wntatu.docx',
          },
        ],
      },
      {
        number: '1',
        title: 'Zero Trust Architecture',
        sections: [
          {
            type: 'text',
            text: 'Group 1 research project. An assigned project topic for CYB 222 — a comprehensive study of Zero Trust Architecture (ZTA), from its origins to its future directions.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              '“Never trust, always verify” — coined by John Kindervag at Forrester in 2010, after cloud, remote work and BYOD dissolved the castle-and-moat perimeter',
              'Four principles: never trust/always verify, least privilege, assume breach, and micro-segmentation to contain lateral movement',
              'Assembled from IAM, MFA, ZTNA (which replaces the VPN), device trust and EDR, pervasive encryption, and SIEM/UEBA monitoring',
              'Standardised by NIST SP 800-207 (Policy Decision Point + Policy Enforcement Point) and CISA’s maturity model; rollout runs Visualise → Mitigate → Optimise',
              'Real limits: cost and complexity, authentication fatigue, insider threats, and “Zero Trust washing” — partial rollouts that buy false confidence',
            ],
          },
          {
            type: 'definition',
            heading: 'Abstract',
            text: 'Zero Trust Architecture is a modern security paradigm built on the principle "Never Trust, Always Verify." Coined by John Kindervag at Forrester Research in 2010, it has moved from theory to a framework endorsed by governments and enterprises worldwide. ZTA eliminates implicit trust, enforces least-privilege access, and continuously validates every user, device, and transaction — regardless of network location. A 2024 report found more than two-thirds of organisations are now implementing Zero Trust policies.',
          },
          {
            type: 'bullets',
            heading: 'Why the Perimeter Model Failed',
            items: [
              'The "castle-and-moat" model trusts everything inside the network by default',
              'Cloud, remote work, SaaS, and BYOD dissolved the clear "inside vs outside" boundary',
              'Once inside, attackers move laterally with little resistance',
              'Major breaches exploited implicit trust: Target (2013), WannaCry (2017), SolarWinds (2020)',
              'Average data breach cost reached $4.88M in 2024 (IBM), ~194 days to identify',
            ],
          },
          {
            type: 'note',
            text: "Campus analogy: perimeter security is the main gate checking your ID once — after that you can wander into any lab, office, or exam hall unchallenged. Zero Trust is every door doing its own check: the library scanner, the exam-hall invigilator, the server-room keypad — and your ID only opens rooms you are actually timetabled for, at the times you are expected. Lose your card and a thief gets one room for one hour, not the whole campus.",
          },
          {
            type: 'termlist',
            heading: 'Evolution of Zero Trust',
            items: [
              { term: '1994 — Marsh', def: 'Stephen Paul Marsh formalises trust as a computational concept.' },
              { term: '2004 — Jericho Forum', def: 'Forms to address "de-perimeterisation" of the enterprise network.' },
              { term: '2010 — Kindervag', def: 'Coins "Zero Trust" at Forrester: trust itself is a vulnerability.' },
              { term: '2011 / 2014 — Google BeyondCorp', def: 'Implements then publishes Zero Trust after Operation Aurora; becomes the enterprise blueprint.' },
              { term: '2020 — NIST SP 800-207', def: 'First comprehensive government-endorsed ZTA framework.' },
              { term: '2021 — Executive Order 14028', def: 'Mandates Zero Trust for all US federal agencies.' },
              { term: '2023 — CISA ZTMM v2.0', def: 'Zero Trust Maturity Model across five pillars.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Core Principles',
            items: [
              { term: 'Never Trust, Always Verify', def: 'Every request is authenticated and continuously, contextually re-verified — not a one-time login.' },
              { term: 'Least Privilege Access', def: 'Access is scoped, time-limited, and contextual, shrinking the blast radius of any compromise.' },
              { term: 'Assume Breach', def: 'Design as if attackers are already inside: encrypt everything, segment, monitor, and plan recovery.' },
              { term: 'Micro-Segmentation', def: 'Divide the network into isolated segments — down to individual workloads — to contain lateral movement.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Architectural Components & Technologies',
            items: [
              { term: 'Identity & Access Management (IAM)', def: 'Identity — not network location — is the primary security boundary; SSO, RBAC, ABAC, risk-based auth.' },
              { term: 'Multi-Factor Authentication (MFA)', def: 'Two or more factors (know / have / are); mandatory for sensitive access; adaptive to risk.' },
              { term: 'Zero Trust Network Access (ZTNA)', def: 'Replaces VPNs — grants access to specific resources, not the whole network.' },
              { term: 'Device Trust & EDR', def: 'Verifies device health and compliance before access; EDR/MDM monitor and can quarantine endpoints.' },
              { term: 'Data Security & Encryption', def: 'Classify data; encrypt in transit (TLS/SSL) and at rest; DLP and attribute-based access control.' },
              { term: 'SIEM & UEBA', def: 'Aggregate and correlate logs; ML baselines behaviour and flags anomalies — the monitoring backbone.' },
            ],
          },
          {
            type: 'table',
            heading: 'Zero Trust vs Traditional Security',
            headers: ['Dimension', 'Traditional Security', 'Zero Trust Architecture'],
            rows: [
              ['Trust Model', 'Implicit trust for internal users', 'No implicit trust; every request verified'],
              ['Network Boundary', 'Defined perimeter (firewall, VPN)', 'No perimeter; identity-based boundary'],
              ['Authentication', 'Login once; session persists', 'Continuous, contextual re-authentication'],
              ['Access Control', 'Broad network access after login', 'Least privilege; per-resource access'],
              ['Lateral Movement', 'Unrestricted once inside', 'Blocked by micro-segmentation'],
              ['Data Protection', 'Perimeter-focused encryption', 'Pervasive encryption in transit and at rest'],
              ['Visibility', 'Limited internal monitoring', 'Full visibility across all traffic'],
              ['Cloud Readiness', 'Poorly suited to cloud', 'Natively designed for hybrid and cloud'],
              ['Remote Work', 'Relies on VPNs; scalability issues', 'Seamless; location-agnostic'],
              ['Threat Response', 'Reactive; detect after breach', 'Proactive; assume breach, limit blast radius'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Implementation Roadmap',
            items: [
              'NIST SP 800-207 — Policy Decision Point (PDP) and Policy Enforcement Point (PEP) evaluate and enforce every request',
              'CISA Maturity Model — progress through Traditional → Initial → Advanced → Optimal',
              'Phase 1 · Visualise — catalogue every user, device, app, and data store; map transaction flows',
              'Phase 2 · Mitigate — deploy MFA and SSO, begin micro-segmentation, replace VPN with ZTNA, enable logging',
              'Phase 3 · Optimise — expand segmentation, automate with SOAR, add data-centric security and threat intel, red-team',
            ],
          },
          {
            type: 'bullets',
            heading: 'Benefits',
            items: [
              'Reduced attack surface — a stolen credential alone is no longer enough',
              'Enhanced visibility and control over who accesses what, from where',
              'Supports modern work — remote, cloud, BYOD, and third-party access',
              'Eases regulatory compliance (GDPR, HIPAA, PCI-DSS, NDPR)',
              'Resilience against ransomware and supply-chain attacks via segmentation',
            ],
          },
          {
            type: 'bullets',
            heading: 'Challenges & Limitations',
            items: [
              'Complexity and cost — integrating IAM, MFA, EDR, SIEM, and segmenting legacy systems',
              'Cultural resistance and "authentication fatigue" from more frequent prompts',
              '"Zero Trust washing" — superficial or partial implementations create false confidence',
              'Insider threats — authorised users acting maliciously remain a hard limit',
              'Operational overhead — many policies and alerts can cause SOC alert fatigue',
            ],
          },
          {
            type: 'bullets',
            heading: 'Future Directions',
            items: [
              'AI/ML-driven adaptive trust (CARTA) — risk-scored decisions beyond binary allow/deny',
              'Zero Trust for autonomous AI agents — identity and revocable permissions for non-human actors',
              'Extending ZTA to resource-constrained IoT and OT environments',
              'Convergence with SASE and adoption of post-quantum cryptography',
              'Accelerating adoption across Nigeria and Africa (CBN framework, NDPR)',
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'Zero Trust is a security philosophy, not a single product: "trust must always be earned, never assumed." Implemented rigorously, it reduces the attack surface, limits lateral movement, and improves visibility across cloud-centric environments. Full maturity is a journey — guided by NIST SP 800-207 and the CISA Maturity Model — but the alternative of relying on an outpaced perimeter carries far greater risk.',
          },
          {
            type: 'resource',
            label: 'Read the full research report — Group 1',
            filename: 'group 1.docx',
            meta: 'DOCX · 29 KB',
            href: 'https://ggzucldiniltagxnktsv.supabase.co/storage/v1/object/public/course-materials/cyb-222/1783192081930-qp7gfj9wk69.docx',
          },
        ],
      },
      {
        number: '2',
        title: 'Post-Quantum Cryptography & Migration Frameworks',
        sections: [
          {
            type: 'text',
            text: 'Group 2 research project — by Sunday Robert, Iwok Abigail Sylvester, Onyejiaka Patrick Chiemerie, James Joseph Essien, Samuel Emmanuel Ette and Ndem Dennis Victor. An assigned project topic for CYB 222: an assessment of post-quantum cryptography (PQC) encryptions and migration frameworks for cyber defense.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              'Shor’s algorithm breaks RSA, ECC and Diffie-Hellman in polynomial time the moment a Cryptographically Relevant Quantum Computer exists — consensus puts Q-Day between 2030 and 2035',
              'Bigger keys do not help: the design itself must change. Grover only halves symmetric security, so AES-128 → AES-256 and SHA-256 → SHA-384/512 is sufficient there',
              '“Harvest Now, Decrypt Later” means traffic captured today is already at risk. Mosca’s Theorem makes it concrete: migration time + data secrecy lifetime > years to Q-Day = already exposed',
              'The NIST standards are ML-KEM (FIPS 203), ML-DSA (204), SLH-DSA (205), Falcon (206) and HQC — drawn from five mathematical families for structural diversity',
              'Migration is hybrid-first (X25519 + ML-KEM-768, already Chrome’s default), then hardware refit, then quantum-native — set out as a four-phase plan for UNIUYO',
            ],
          },
          {
            type: 'definition',
            heading: 'Abstract',
            text: "Large-scale quantum computing threatens the public-key cryptography that secures the internet. RSA, ECC and Diffie-Hellman all rest on integer factorization and discrete logarithms — problems Shor's Algorithm solves in polynomial time, breaking them the moment a Cryptographically Relevant Quantum Computer (CRQC) exists. This seminar assesses Post-Quantum Cryptography around the NIST standards finalised from August 2024: the five mathematical families (lattice, code, hash, multivariate, isogeny), the standardized algorithms (ML-KEM, ML-DSA, SLH-DSA, Falcon, HQC), the implementation challenges, and a phased migration framework for institutional cyber defense — with specific reference to the University of Uyo.",
          },
          {
            type: 'table',
            heading: 'A Brief History of Cryptography — Caesar to Quantum',
            headers: ['Era', 'Period', 'Key Development'],
            rows: [
              ['Classical', '~50 BC', 'Caesar Cipher — letter substitution, broken by frequency analysis'],
              ['Medieval', '9th C.', 'Al-Kindi pioneers cryptanalysis; polyalphabetic ciphers emerge'],
              ['Industrial', 'WWII', 'Enigma rotor machine — broken by Turing’s Bombe at Bletchley Park'],
              ['Digital', '1976', 'Diffie-Hellman key exchange published; RSA follows in 1977'],
              ['Modern', '1994–2016', "Shor's Algorithm proven (1994); NIST PQC competition launched (2016)"],
              ['Post-Quantum', '2024–', 'NIST publishes FIPS 203/204/205 — first quantum-safe standards'],
            ],
          },
          {
            type: 'definition',
            heading: 'What Is a Quantum Computer?',
            text: 'A quantum computer is a different computational paradigm, exploiting superposition, entanglement and interference. Where a classical bit is 0 or 1, a qubit can be both at once, so n qubits represent 2ⁿ states simultaneously. As of 2026 the largest machines reach ~96 logical qubits; breaking RSA-2048 via Shor needs roughly 4,096 stable logical qubits. The consensus estimate for "Q-Day" — the arrival of a CRQC — is between 2030 and 2035.',
          },
          {
            type: 'definition',
            heading: 'Analogy — The Maze',
            text: 'A classical computer searches a maze one path at a time: hit a dead end, backtrack, try again. A quantum computer, through superposition, effectively evaluates many paths at once and converges exponentially faster. For everyday computing this offers no advantage — but the exact mathematical structures protecting RSA and ECC are precisely the kind of problem this parallelism dismantles.',
          },
          {
            type: 'table',
            heading: "Shor's Algorithm — Classical vs Quantum Complexity",
            headers: ['Problem', 'Classical', 'Quantum (Shor)'],
            rows: [
              ['RSA-2048 factoring', 'Sub-exponential', 'Polynomial — O((log N)³)'],
              ['ECC-256 discrete log', 'Sub-exponential', 'Polynomial — O((log N)³)'],
              ['Time to break RSA-2048', 'Millions of years', 'Hours'],
            ],
          },
          {
            type: 'text',
            text: "Because Shor's Algorithm solves both factorization (RSA) and the discrete logarithm problem (DSA, Diffie-Hellman, ECC) in polynomial time, larger keys add only modest linear overhead — not exponential resistance. RSA and ECC therefore require complete replacement, not reinforcement.",
          },
          {
            type: 'note',
            text: "Why bigger keys don't help: RSA's padlock design assumes a thief must try keys one at a time, so a bigger padlock buys decades. Shor's Algorithm is a master tool that opens that entire design of padlock in one motion — a bigger padlock of the same design just gives the tool more to grip. The design itself has to change, and that new design is post-quantum cryptography.",
          },
          {
            type: 'table',
            heading: "Grover's Algorithm — Symmetric Key Degradation",
            headers: ['Algorithm', 'Classical', 'After Grover', 'Status'],
            rows: [
              ['AES-128', '128-bit', '64-bit', 'Not safe — upgrade'],
              ['AES-256', '256-bit', '128-bit', 'Safe — retain'],
              ['SHA-256', '128-bit collision', '64-bit collision', 'Upgrade to SHA-384/512'],
            ],
          },
          {
            type: 'text',
            text: "Symmetric crypto is only weakened, not broken: Grover's quadratic speed-up halves the effective security level. The remedy is simple — move AES-128 to AES-256 and SHA-256 to SHA-384/512. RSA and ECC enjoy no such reprieve.",
          },
          {
            type: 'bullets',
            heading: 'Harvest Now, Decrypt Later (HNDL) — Three Phases',
            items: [
              'Phase 1 — Harvest (today): adversaries intercept and archive encrypted traffic at scale; the FBI, GCHQ and NSA have confirmed this is occurring',
              'Phase 2 — Wait: the encrypted archive is held while quantum capability matures — nothing must be broken yet',
              'Phase 3 — Decrypt (Q-Day onward): all data under RSA or ECC is decrypted retroactively and permanently, exposing records with 20–30-year sensitivity lifetimes',
            ],
          },
          {
            type: 'note',
            text: "Picture a thief carting away your locked safe today, even though no machine on earth can cut its key yet. He isn't worried — he knows the machine is coming in a few years, and the documents inside will still matter then. That is Harvest Now, Decrypt Later: the stealing happens now, the opening happens later, and moving your documents to a quantum-proof safe only protects what hasn't already been carried off.",
          },
          {
            type: 'definition',
            heading: "Mosca's Theorem — Quantifying the Urgency",
            text: 'If (Migration Time) + (Data Secrecy Lifetime) > (Years until Q-Day), the organisation is already at risk. Applied to UNIUYO: a 7-year migration plus a 20-year record-confidentiality requirement = 27 years of protection needed against an ~8-year window. The University is already behind — planning must begin now, not on confirmation of Q-Day.',
          },
          {
            type: 'mosca',
            heading: 'Try It — Is Your Data Already at Risk?',
          },
          {
            type: 'fivers',
            heading: 'The Five Mathematical Families of PQC',
            items: [
              { term: 'Lattice', def: 'LWE / Shortest Vector Problem — the primary standard (ML-KEM, ML-DSA)' },
              { term: 'Code', def: 'Syndrome decoding of linear codes — HQC backup KEM' },
              { term: 'Hash', def: 'Collision / pre-image resistance — SLH-DSA signatures' },
              { term: 'Multivar', def: 'Non-linear multivariate quadratics — short signatures (research)' },
              { term: 'Isogeny', def: 'Maps between elliptic curves — SIKE was broken in 2022' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Points on the Families',
            items: [
              'Lattice-based is dominant: the Module-LWE problem has no known sub-exponential quantum attack',
              'Hash-based SLH-DSA rests only on SHA-2/SHA-3 — a conservative fallback needing no new assumption',
              'Code-based HQC (2025) is independent of lattices and has been studied since McEliece in 1978',
              'Isogeny-based SIKE was broken in ~1 hour on a classical computer (KU Leuven, 2022) — elegance is no substitute for cryptanalysis, validating the multi-family approach',
            ],
          },
          {
            type: 'table',
            heading: 'NIST Post-Quantum Standards (FIPS 2024–2026)',
            headers: ['Standard', 'Algorithm', 'Type', 'Basis'],
            rows: [
              ['FIPS 203', 'ML-KEM', 'Key encapsulation', 'Lattice (M-LWE)'],
              ['FIPS 204', 'ML-DSA', 'Digital signature', 'Lattice (M-LWE)'],
              ['FIPS 205', 'SLH-DSA', 'Digital signature', 'Hash-based'],
              ['FIPS 206', 'Falcon (FN-DSA)', 'Compact signature', 'Lattice (NTRU)'],
              ['2025', 'HQC', 'Key encapsulation', 'Code-based'],
            ],
          },
          {
            type: 'termlist',
            heading: 'The Standardized Algorithms in Brief',
            items: [
              { term: 'ML-KEM (FIPS 203)', def: 'Primary KEM replacing RSA/Diffie-Hellman; from CRYSTALS-Kyber; ML-KEM-768 recommended; ~17× faster than ECDH on a Cortex-M0+ with 94% less energy; live by default in Google Chrome TLS 1.3' },
              { term: 'ML-DSA (FIPS 204)', def: 'Primary signature replacing ECDSA/RSA; from CRYSTALS-Dilithium; signatures 2,420–4,627 bytes (38–72× larger than ECDSA); rejection sampling causes variable signing latency' },
              { term: 'SLH-DSA (FIPS 205)', def: "Stateless hash-based signature from SPHINCS+; the suite's insurance policy; very large signatures (7,856–49,856 bytes); for low-frequency, high-security signing" },
              { term: 'Falcon (FIPS 206)', def: 'Compact lattice (NTRU) signature ~666 bytes — best for DNS; hard to implement (constant-time floating-point) and the highest side-channel risk' },
              { term: 'HQC', def: 'Code-based KEM backup to ML-KEM (NIST, March 2025); larger keys but lattice-independent; chosen over BIKE for its stable decryption-failure rate' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Implementation Challenges',
            items: [
              'Larger keys, ciphertexts and signatures stress TLS handshakes, storage and memory-constrained IoT hardware',
              'Side-channels: timing/power leaks (e.g. the KyberSlash flaw); ML-DSA rejection sampling and Falcon Gaussian sampling are especially delicate',
              'Countermeasures such as masking and operation shuffling add ~20–35% computational overhead',
              'DNS/DNSSEC: PQC signatures exceed the ~1,232-byte UDP limit, forcing fragmentation and TCP fallback',
            ],
          },
          {
            type: 'definition',
            heading: 'Analogy — Postcards and Textbooks (the DNS problem)',
            text: 'Classical 64-byte DNSSEC signatures are postcards: small and accepted everywhere. An ML-DSA signature at 2,420 bytes is a textbook mailed with postcard postage — the network must fragment the oversized response, firewalls drop the fragments as suspicious, the lookup fails and falls back to heavier, stateful TCP. Parts of the internet’s foundational plumbing must themselves be re-engineered.',
          },
          {
            type: 'definition',
            heading: 'Hybrid Cryptography — Two Locks on One Door',
            text: "Best practice for the transition is a dual-mode hybrid: run a classical and a PQC algorithm together (e.g. X25519 + ML-KEM-768) so the session secret combines both and an attacker must defeat both. If a quantum computer breaks the classical lock, the PQC lock holds; if a flaw is found in the new lattice scheme, the classical lock holds. This is exactly Google Chrome's default.",
          },
          {
            type: 'table',
            heading: 'Who Is Already Deploying PQC?',
            headers: ['Organisation', 'Implementation', 'Status'],
            rows: [
              ['Google Chrome', 'X25519 + ML-KEM-768 hybrid TLS 1.3 by default', 'Live — billions of users'],
              ['Apple iMessage', 'PQ3 — ML-KEM re-keying on every message', 'Live since Feb 2024'],
              ['Signal', 'PQXDH with ML-KEM-1024', 'Live since Sep 2023'],
              ['Cloudflare', 'Most human-initiated TLS traffic PQC-protected', 'Live (Oct 2025)'],
              ['US Govt (CNSA 2.0)', 'PQC mandatory for national security systems', 'Mandated by 2033'],
            ],
          },
          {
            type: 'bullets',
            heading: 'A Four-Phase Migration Framework for UNIUYO',
            items: [
              'Phase 1 · Discovery — inventory every use of RSA/ECC/Diffie-Hellman and build a risk register prioritised by data sensitivity lifetime (Mosca applied institutionally)',
              'Phase 2 · Hybrid integration — enable X25519 + ML-KEM-768 on web properties, the VPN, APIs and the student portal for immediate HNDL protection',
              'Phase 3 · Hardware refit — upgrade routers, firewalls, IDS and HSMs to handle the larger PQC key and signature payloads',
              'Phase 4 · Quantum-native enforcement — after NIST’s 2030 RSA/ECC deprecation, enforce standalone ML-KEM/ML-DSA and adopt crypto-agility policies',
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'Post-Quantum Cryptography is a present operational necessity, not a distant theory. The HNDL attack means data sent today may already be harvested for future decryption, and Mosca’s Theorem makes the calculus unambiguous for any long-lived data. NIST’s standards (ML-KEM, ML-DSA, SLH-DSA, Falcon, HQC) already protect billions of users. The migration challenges — larger payloads, side-channels, DNS re-engineering — are engineering problems with known solutions. The critical variable is time: organisations that begin now get phased, risk-managed transitions; those that wait face emergency migrations with years of harvested data already exposed.',
          },
          {
            type: 'bullets',
            heading: 'Recommendations',
            items: [
              'Immediately deploy hybrid schemes (ECDH + ML-KEM) — configuration only, no infrastructure replacement',
              'Audit and prioritise every RSA/ECC/Diffie-Hellman dependency, flagging long-lifetime data first',
              'Mandate crypto-agility in all new software development and procurement',
              'Migrate AES-128 to AES-256 — the simplest step, fully neutralising Grover',
              'Build local PQC research capacity for the African digital ecosystem',
              "Formally apply Mosca's Theorem to calculate organisational quantum risk",
            ],
          },
          {
            type: 'resource',
            label: 'Read the full research report — Group 2',
            filename: 'group 2.docx',
            meta: 'DOCX · 48 KB',
            href: 'https://ggzucldiniltagxnktsv.supabase.co/storage/v1/object/public/course-materials/cyb-222/1783192145897-ctewqen05ns.docx',
          },
        ],
      },
      {
        number: '3',
        title: 'Behavioral Biometrics & Continuous Authentication',
        sections: [
          {
            type: 'text',
            text: 'Group 3 research project. An assigned project topic for CYB 222 — examining behavioral biometrics as a shift from point-in-time login checks to continuous, frictionless identity assurance.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              'Legacy MFA verifies once at the gate and then trusts the session for hours — behavioural biometrics verifies continuously, closing that point-of-entry blind spot',
              'What defeats static MFA: adversary-in-the-middle proxy phishing, MFA fatigue prompt-bombing, and stolen session tokens — all of which survive a perfectly valid login',
              'It validates how you act, not what you know or hold: keystroke dynamics, mouse paths, touch gestures, device kinematics, navigation habits and context',
              'Four-stage pipeline — collection → processing → analysis (LSTM baseline compared by cosine similarity) → response in under 0.5 seconds',
              'The output is a 0.0–1.0 anomaly score, not a yes/no: below 0.3 allow, 0.3–0.7 step-up challenge, 0.7 and above block. Privacy-by-design and adaptive baselines are what keep it workable',
            ],
          },
          {
            type: 'definition',
            heading: 'The Paradigm Shift in Identity Assurance',
            text: 'Legacy access control verifies identity only at the gateway — the moment of login. Once a session token or cookie is issued it stays valid for hours or days without re-verification, creating a "point-of-entry blind spot": if an attacker seizes the terminal three minutes after a valid login, the system never notices. Behavioral biometrics closes this gap by continuously verifying who is actually operating the session.',
          },
          {
            type: 'note',
            text: "A cybercafé attendant checks your ticket when you sit down, then never looks your way again — whoever slides into your seat two minutes later browses on your ticket. That is point-of-entry authentication. Behavioral biometrics is the attendant who keeps half an eye on the room: he may not know the newcomer's name, but he can tell it isn't you typing — the rhythm, the posture, the way you scroll — and he quietly walks over to ask for the ticket again.",
          },
          {
            type: 'bullets',
            heading: 'Why Static MFA Falls Short',
            items: [
              'Adversary-in-the-Middle (AitM) proxy phishing (e.g. Evilginx) intercepts the live MFA token/session cookie and replays it — bypassing MFA entirely',
              'MFA fatigue (prompt bombing): repeated push notifications until a tired user finally taps "approve"',
              'Session hijacking / token theft: infostealers scrape active session tokens from browser memory and replay them from another device',
              'User friction: re-verifying every 15–30 minutes causes "security fatigue" and insecure workarounds',
            ],
          },
          {
            type: 'definition',
            heading: 'The Core Idea — Verify How You Act',
            text: 'Instead of validating what you know (passwords), what you possess (tokens), or your static physical traits (face, iris), behavioral biometrics validates how you act: the subconscious motor and cognitive patterns in your typing rhythm, cursor motion, touch gestures and device handling. Harvested silently in the background, these micro-interactions turn authentication from a disruptive gatekeeper into a continuous assurance fabric.',
          },
          {
            type: 'table',
            heading: 'Static vs Continuous Authentication',
            headers: ['Dimension', 'Static (Legacy MFA)', 'Continuous (Behavioral)'],
            rows: [
              ['Verification frequency', 'Only at entry / token expiry', 'Every second across the whole session'],
              ['User friction', 'High — codes, taps, prompts', 'Zero — silent background operation'],
              ['Replay risk', 'High — tokens can be copied, sold, replayed', 'Low — live motor telemetry cannot be written down or replayed'],
              ['Defence vs token theft', 'None — a copied token is accepted', 'Detects a changed operator within seconds'],
              ['Underlying logic', 'Deterministic — binary match of strings', 'Probabilistic — ML confidence scoring'],
            ],
          },
          {
            type: 'termlist',
            heading: 'The Six Categories of Behavioral Data',
            items: [
              { term: 'Keystroke Dynamics', def: 'Millisecond timing of key presses and releases — even on the same password, timing signatures differ per person.' },
              { term: 'Mouse Patterns', def: 'The whole cursor journey — velocity changes, angular shifts and path curvature, not just the final click.' },
              { term: 'Touch Gestures', def: 'How a finger scrolls, taps and zooms on a touchscreen, shaped by hand ergonomics and reach.' },
              { term: 'Device Handling & Kinematics', def: 'Accelerometer/gyroscope data — hold angle, grip stability and muscle micro-tremors while walking or sitting.' },
              { term: 'Application Navigation', def: 'The habitual sequence of tabs, shortcuts and fields a familiar user follows through a workflow.' },
              { term: 'Location & Context', def: 'Environmental metadata — ISP routing, device configuration and alignment with the user’s usual schedule.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Granular Keystroke Metrics',
            items: [
              { term: 'Dwell (hold) time', def: 'Time a key is held down = key-release time − key-press time; reflects finger velocity and muscle memory.' },
              { term: 'Flight time', def: 'The key-to-key interval — how long between releasing one key and pressing the next.' },
              { term: 'Error cadence', def: 'How fast a user notices a typo, hits Backspace, corrects, and resumes rhythm — a distinctive cognitive signature.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Distinguishing Humans from Bots (Cursor & Touch)',
            items: [
              'Path tortuosity: human cursor paths curve and jitter with corrective micro-adjustments; bots move in mathematically perfect vectors',
              'Click cadence & peak force: humans slip slightly between press and release; bots click with perfect spatial precision',
              'Personalised deceleration curves: humans brake biologically as they near a target; bots hold constant or uniform velocity',
              'Touch & sensors: swipe velocity, contact-area/pressure scaling, multi-touch offsets, plus accelerometer (walking stride) and gyroscope (tilt angle)',
            ],
          },
          {
            type: 'termlist',
            heading: 'The Four-Stage Analysis Pipeline',
            items: [
              { term: '1 · Collection', def: 'A passive background agent hooks input events (keydown, mousemove, touchstart) and polls sensors at ~50–100 Hz — zero-friction, no setup wizard.' },
              { term: '2 · Processing', def: 'Cleans noise and latency spikes, smooths jitter, extracts features (velocity, acceleration, jerk) and normalises across screens, DPI and layouts.' },
              { term: '3 · Analysis', def: 'An enrolled baseline (e.g. 500 words / 100 mouse moves) is modelled with LSTM/autoencoder networks; live data is compared via cosine similarity.' },
              { term: '4 · Response', def: 'Maps the anomaly score to a policy action in under 0.5s — allow, step-up challenge, or block.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Probabilistic Anomaly Scoring',
            text: 'Rather than a binary match/mismatch, the engine outputs a continuous anomaly score between 0.0 and 1.0, measuring how far live behavior deviates from the baseline. Live vectors (A) are compared against the historical model (B) using cosine similarity — the cosine of the angle between two multi-dimensional vectors, A·B / (‖A‖‖B‖).',
          },
          {
            type: 'table',
            heading: 'Response by Anomaly Risk Score',
            headers: ['Anomaly Score', 'Path', 'Action'],
            rows: [
              ['< 0.3', 'Allow', 'Continuous silent pass — seamless, no prompts'],
              ['0.3 – 0.7', 'Challenge', 'Step-up auth (push/face scan); if verified, baseline is safely updated'],
              ['≥ 0.7', 'Block', 'Terminate session, clear storage, isolate device, alert the SOC'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Real-World Enterprise Applications',
            items: [
              { term: 'Banking & Finance', def: 'Detects Authorized Push Payment (APP) fraud and social engineering via induced hesitation, jerky trajectories and abnormal workflow sequences — holding the transfer before funds leave.' },
              { term: 'Workplace Terminals', def: 'Stops "desk-walk takeovers" — an unauthorised operator at an unlocked desk is identified within seconds by abnormal typing/cursor profiles and the workstation is locked.' },
              { term: 'E-Commerce', def: 'Defeats credential stuffing and account takeover by separating organic human delays and typos from instant, mechanically precise bot input.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Critical Challenges & Mitigations',
            items: [
              { term: 'Privacy (GDPR / CCPA)', def: 'Mitigated by data minimisation — store abstract timing deltas, never raw keystrokes — and irreversible, encrypted vectorisation that cannot be reconstructed.' },
              { term: 'False positives (drift)', def: 'Hardware swaps (mouse → trackpad) or injury shift telemetry; adaptive threshold tuning over an aggregated window, with a low-friction challenge, avoids wrongful lockout.' },
              { term: 'Long-term biological change', def: 'Aging and motor changes are handled by continuous model adaptation — each high-confidence login gently updates the baseline.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Strategic Optimisation Pathways',
            items: [
              'Advanced deep learning — LSTM and transformer sequence models capture subtle temporal nuance, cutting false rejections',
              'Multi-modal fusion — combine keystroke, mouse, device and context channels so a drift in one is balanced by the others',
              'End-to-end cryptography — protect telemetry with AES-GCM-256 and salted hashing to prevent interception and replay',
              'Transparent consumer controls — dashboards, opt-in/opt-out and clear retention to dismantle the "Big Brother" stigma and build trust',
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'Behavioral biometrics reframes authentication from a one-time gate into a continuous, frictionless watch. By scoring how a user types, moves and holds their device against a learned baseline — probabilistically, not as a binary match — it detects session hijacking, insider takeovers and bots that static MFA cannot. Its success depends on privacy-by-design, adaptive baselines and multi-modal fusion to stay accurate as real users naturally change.',
          },
          {
            type: 'resource',
            label: 'Read the full research report — Group 3',
            filename: 'group 3.docx',
            meta: 'DOCX · 230 KB',
            href: 'https://ggzucldiniltagxnktsv.supabase.co/storage/v1/object/public/course-materials/cyb-222/1783192456664-wipm3jxkwg.docx',
          },
        ],
      },
      {
        number: '4',
        title: 'Blockchain Technology',
        sections: [
          {
            type: 'text',
            text: 'Group 4 research project — by Bisong Malachi Obanghe, Archibong Samuel Samuel, Ekpo Blessing Edidiong, Francis Kalu, Akpan Ikouwem Albert and Uwemedimoh Anthony Ayah. An assigned project topic for CYB 222, examining blockchain technology and its role in cyber security.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              'A distributed ledger in which every block carries the previous block’s hash — so altering any historical record breaks every link after it and the whole network notices',
              'Three moving parts: cryptographic hashing (SHA-256), a peer-to-peer network of nodes holding copies, and a consensus mechanism (Proof of Work, Proof of Stake, PBFT). Smart contracts make it programmable',
              'Four types — public, private, consortium and hybrid — each trading decentralisation against speed and control',
              'As a security tool: decentralised identity, tamper-proof audit trails, IoT device authentication, DNS resilience, and threat-intel sharing between organisations that do not trust each other',
              'As a security target: smart contract bugs, wallet and private-key theft, cross-chain bridge attacks and 51% attacks — plus the quantum threat to ECDSA now driving post-quantum migration roadmaps',
            ],
          },
          {
            type: 'definition',
            heading: 'Introduction',
            text: 'A blockchain is a distributed, shared and continuously synchronised digital ledger that records transactions across many computers such that no single record can be altered retroactively without altering every subsequent record and gaining the agreement of the network. This idea — a record of events that many parties can trust without needing to trust each other or any single central authority — has expanded far beyond its original use in cryptocurrency into finance, healthcare, supply chain management, voting systems and, increasingly, cyber security.',
          },
          {
            type: 'definition',
            heading: 'Why Cyber Security Cares About Blockchain',
            text: 'Cyber security professionals are interested in blockchain not because it replaces existing security tools, but because it solves a particular problem well: establishing trust and verifying integrity in environments where a central authority is undesirable, unavailable, or itself a point of failure. This report builds a technical understanding of what blockchain is, how it works, and relates it directly to cyber security — how its properties strengthen digital defences, where it introduces new attack surfaces, and how the field is converging with emerging threats such as quantum computing.',
          },
          {
            type: 'termlist',
            heading: 'Early Foundations (1980s–1990s)',
            items: [
              { term: '1982 — David Chaum', def: 'Proposed a blockchain-like protocol in his dissertation, introducing early ideas around cryptographically secured, tamper-evident records.' },
              { term: '1991 — Haber & Stornetta', def: 'Described a cryptographically secured chain of blocks designed to timestamp documents so they could not be altered or backdated — the first practical work resembling a blockchain.' },
              { term: '1998 — Nick Szabo', def: '"Bit Gold" — a precursor concept to modern cryptocurrency, never implemented but introducing ideas around decentralised digital scarcity.' },
            ],
          },
          {
            type: 'definition',
            heading: 'The Birth of Bitcoin (2008–2010)',
            text: 'In October 2008, a person or group using the pseudonym Satoshi Nakamoto published the whitepaper "Bitcoin: A Peer-to-Peer Electronic Cash System," combining peer-to-peer networking, cryptographic hashing and proof-of-work into a single system that solved the long-standing "double-spending problem" without a trusted central authority. In January 2009, the Bitcoin network went live with the mining of the first block — the Genesis Block.',
          },
          {
            type: 'bullets',
            heading: 'Expansion, Maturity & Diversification (2013–Present)',
            items: [
              '2013–2015 — Ethereum: Vitalik Buterin proposed Ethereum, introducing smart contracts and turning blockchain into a programmable platform for decentralised applications',
              '2015 onward — Enterprise interest: banking, logistics and healthcare began exploring private/permissioned blockchains (e.g. Hyperledger Fabric, R3 Corda) for internal record-keeping',
              'ICOs, DeFi and NFTs expanded blockchain\'s commercial applications from 2017 onward',
              'Regulatory frameworks for digital assets and stablecoins matured significantly through the mid-2020s',
              'Blockchain security became a dedicated discipline as value secured by smart contracts grew into the hundreds of billions of dollars, attracting sophisticated attackers',
              'Research has shifted toward the long-term threat quantum computing poses to blockchain cryptography',
            ],
          },
          {
            type: 'termlist',
            heading: 'Structure of a Block',
            items: [
              { term: 'Block header', def: 'Metadata about the block, including a timestamp and a reference to the previous block.' },
              { term: 'Previous block hash', def: 'A cryptographic fingerprint of the prior block that physically "chains" the blocks together — changing any block changes its hash, breaking the link to every subsequent block.' },
              { term: 'Merkle root', def: 'A single hash summarising all transactions in the block via a Merkle tree, allowing efficient, secure verification without downloading the entire block.' },
              { term: 'Transaction data', def: 'The actual records being stored — financial transactions, smart contract calls, or other data, depending on the blockchain\'s purpose.' },
              { term: 'Nonce', def: 'A number used in proof-of-work systems that miners adjust repeatedly to find a valid block hash.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Cryptographic Hashing',
            text: 'Hashing is the backbone of blockchain integrity. A hash function (such as SHA-256, used by Bitcoin) takes any input data and produces a fixed-length string of characters. Because each block contains the hash of the previous block, tampering with any historical transaction changes that block\'s hash, breaking the chain and immediately alerting the network to the tampering.',
          },
          {
            type: 'bullets',
            heading: 'Properties of Cryptographic Hash Functions',
            items: [
              'Determinism — the same input always produces the same hash',
              'Avalanche effect — changing even a single character of the input produces a completely different hash',
              'One-way function — it is computationally infeasible to reverse a hash back into its original input',
            ],
          },
          {
            type: 'definition',
            heading: 'The Peer-to-Peer Network',
            text: 'Rather than being stored on one central server, a full copy (or relevant portion) of the blockchain ledger is distributed across many independent nodes worldwide. When a new transaction occurs, it is broadcast to the network, validated by nodes according to the network\'s rules, and — once confirmed — added to a new block that is propagated to every node, keeping all copies of the ledger synchronised.',
          },
          {
            type: 'termlist',
            heading: 'Consensus Mechanisms',
            items: [
              { term: 'Proof of Work (PoW)', def: 'Used by Bitcoin. Miners compete to solve a computationally difficult puzzle (finding a nonce producing a hash meeting certain criteria); the first to solve it adds the block and is rewarded. Attacking the network requires more computing power than the rest of the network combined (a "51% attack").' },
              { term: 'Proof of Stake (PoS)', def: 'Used by Ethereum since its 2022 transition ("The Merge"). Validators stake (lock up) cryptocurrency as collateral instead of competing with computing power, and lose their stake if they act maliciously — far more energy-efficient than PoW.' },
              { term: 'Other models', def: 'Delegated Proof of Stake, Practical Byzantine Fault Tolerance (PBFT) and Proof of Authority — often used in private/enterprise blockchains where speed and known validators are prioritised over full decentralisation.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Smart Contracts',
            text: 'On programmable blockchains such as Ethereum, smart contracts are self-executing pieces of code stored on the blockchain that automatically run when predetermined conditions are met, removing the need for a trusted intermediary to enforce an agreement — for example, automatically releasing payment once a delivery is confirmed. They underpin most modern blockchain applications, including DeFi platforms, NFT marketplaces and decentralised identity systems, but also introduce their own security risks.',
          },
          {
            type: 'note',
            text: "Picture a class where one student keeps the only attendance register — they could quietly change a mark and no one would know. Now picture every student keeping an identical copy, comparing notes after each lecture: if one register is altered, it no longer matches the rest and the tampering is obvious immediately. That's decentralisation and immutability in one image — no single keeper to trust or corrupt, because everyone is watching everyone else's copy.",
          },
          {
            type: 'table',
            heading: 'Key Features of Blockchain',
            headers: ['Feature', 'Description'],
            rows: [
              ['Decentralisation', 'No single entity controls the ledger; control and data are spread across many independent nodes'],
              ['Immutability', 'Once data is confirmed and added to the chain, it is extremely difficult to alter or delete without network-wide consensus'],
              ['Transparency', 'On public blockchains, all transactions are visible to every participant, enabling open verification'],
              ['Cryptographic security', 'Hashing and digital signatures protect data integrity and verify the authenticity of transactions'],
              ['Consensus-driven trust', 'Agreement on the state of the ledger is reached collectively, removing the need for a trusted third party'],
              ['Traceability / auditability', 'Every transaction is timestamped and permanently recorded, creating a verifiable audit trail'],
              ['Pseudonymity', 'Users are typically identified by cryptographic addresses rather than real-world identities (varies by network)'],
            ],
          },
          {
            type: 'termlist',
            heading: 'Types of Blockchain',
            items: [
              { term: 'Public Blockchain', def: 'Open networks anyone can join, read from and submit transactions to, without permission (e.g. Bitcoin, Ethereum) — maximum decentralisation and transparency, but slower and more resource-intensive.' },
              { term: 'Private Blockchain', def: 'Restricted networks controlled by a single organisation that decides who may participate — faster and more efficient, but sacrifices some decentralisation since the controlling organisation could alter the rules.' },
              { term: 'Consortium (Federated) Blockchain', def: 'Controlled by a pre-selected group of organisations rather than a single entity or the public — balances decentralisation with efficiency and governance for inter-company collaboration.' },
              { term: 'Hybrid Blockchain', def: 'Combines public and private elements, letting an organisation keep some data private while leveraging a public network\'s verifiability and transparency for other operations.' },
            ],
          },
          {
            type: 'table',
            heading: 'Types of Blockchain — Quick Comparison',
            headers: ['Type', 'Access', 'Speed', 'Example Use'],
            rows: [
              ['Public', 'Open to all', 'Slower', 'Bitcoin, Ethereum'],
              ['Private', 'Single organisation', 'Fast', 'Internal corporate ledgers'],
              ['Consortium', 'Select group', 'Fast', 'Banking alliances'],
              ['Hybrid', 'Mixed', 'Variable', 'Supply chain tracking'],
            ],
          },
          {
            type: 'bullets',
            heading: 'Applications of Blockchain',
            items: [
              'Cryptocurrency and payments — Bitcoin, Ethereum and stablecoins enable peer-to-peer value transfer without banks',
              'Decentralised Finance (DeFi) — lending, borrowing and trading platforms operating without traditional financial intermediaries',
              'Supply chain management — tracking goods from origin to consumer, improving transparency and reducing fraud/counterfeiting',
              'Healthcare — securely storing and sharing patient records across providers while maintaining data integrity and patient control',
              'Identity management — decentralised digital identities letting individuals control their own credentials',
              'Voting systems — experimental blockchain-based voting aims to improve transparency and reduce tampering, though challenges remain',
              'Smart contracts and legal agreements — automating contract execution once agreed conditions are met',
              'Education — issuing and verifying tamper-proof academic credentials and certificates',
              'Cyber security — secure data storage, decentralised authentication, and integrity verification for IoT devices',
            ],
          },
          {
            type: 'bullets',
            heading: 'Advantages of Blockchain',
            items: [
              'Enhanced security — cryptographic hashing and decentralisation make unauthorised data tampering extremely difficult',
              'Transparency and trust — shared, verifiable ledgers reduce reliance on a trusted intermediary',
              'Reduced fraud — immutability and traceability make it far harder to falsify records undetected',
              'Elimination of single points of failure — distributing data across many nodes removes the central target traditional databases present to attackers',
              'Improved efficiency — smart contracts automate processes that previously required manual verification, reducing cost and delay',
              'Greater traceability — every transaction is timestamped and permanently recorded, simplifying audits and compliance',
            ],
          },
          {
            type: 'bullets',
            heading: 'Challenges of Blockchain',
            items: [
              'Scalability — public blockchains process far fewer transactions per second than centralised payment systems like Visa, causing congestion and high fees at peak demand',
              'Energy consumption — proof-of-work mining consumes significant electricity, though Proof of Stake networks have greatly reduced this',
              'Regulatory uncertainty — laws governing crypto and blockchain assets are still evolving and vary widely between countries',
              'Irreversibility risk — immutability is a security strength, but mistaken transactions, stolen funds or coding errors generally cannot be reversed',
              'Smart contract vulnerabilities — bugs in contract code are permanent once deployed and have led to losses of hundreds of millions of dollars',
              'Private key management — users are entirely responsible for safeguarding their own keys; losing one means permanently losing access, with no "forgot password" option',
              'Interoperability — different blockchains often cannot communicate natively, complicating cross-chain transactions and data sharing',
              '51% attacks — if a single entity gains control of the majority of a network\'s computing power (PoW) or stake (PoS), it could theoretically manipulate transaction history, though this is extremely costly on large networks',
            ],
          },
          {
            type: 'definition',
            heading: 'Blockchain as a Cyber Security Tool',
            text: 'Blockchain and cyber security intersect in two directions: blockchain as a security tool, and blockchain as a security target. Blockchain\'s core properties — decentralisation, immutability and cryptographic verification — map directly onto long-standing cyber security goals.',
          },
          {
            type: 'termlist',
            heading: 'Blockchain-Powered Security Capabilities',
            items: [
              { term: 'Decentralised identity & access management', def: 'Self-sovereign identity systems where individuals control their own credentials cryptographically, reducing reliance on centralised identity databases that are common breach targets.' },
              { term: 'Tamper-proof audit trails', def: 'Security logs, software update records and digital evidence anchored to a blockchain so any retroactive tampering is immediately detectable.' },
              { term: 'Securing IoT devices', def: 'Authenticating the enormous number of devices in IoT networks and verifying firmware integrity without a single centralised server that, if compromised, would put every device at risk.' },
              { term: 'DNS and domain security', def: 'Decentralised domain name systems are more resistant to the kind of centralised DNS attacks that have caused major outages in the past.' },
              { term: 'Secure data sharing', def: 'Organisations share verified data (such as threat intelligence) across institutional boundaries without needing to fully trust each other\'s internal systems.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Blockchain as a Security Target',
            text: 'Blockchain is not immune to attack, and the growing value secured on-chain has made it an attractive target. Ransomware, data breaches and intrusions persist across the ecosystem, and traditional blockchain security audits have struggled to keep pace with attacker sophistication — attackers increasingly target the human and infrastructural layers around the blockchain (wallets, bridges, exchanges) rather than the core protocol itself.',
          },
          {
            type: 'termlist',
            heading: 'Attack Surfaces on Blockchain Systems',
            items: [
              { term: 'Smart contract exploits', def: 'Poorly written contract code remains one of the most exploited weaknesses in the blockchain ecosystem.' },
              { term: 'Wallet and private key theft', def: 'Phishing, malware and social engineering targeting cryptocurrency wallets remain a leading cause of loss — the underlying cryptography is rarely the weak point, the user\'s key management is.' },
              { term: 'Cross-chain bridge attacks', def: 'Bridges connecting different blockchains are a frequent target, holding large amounts of locked value while relying on more centralised or experimental security models than the chains they connect.' },
              { term: '51% and consensus attacks', def: 'Smaller blockchains with less distributed mining or staking power remain vulnerable to attackers who can temporarily dominate the consensus process.' },
            ],
          },
          {
            type: 'definition',
            heading: 'The Quantum Computing Threat',
            text: 'Perhaps the most significant long-term cyber security concern for blockchain is the eventual arrival of practical quantum computers. Most current blockchains rely on elliptic curve cryptography (such as ECDSA) to secure digital signatures and wallets — future quantum computers using Shor\'s algorithm may be able to break this cryptography with fewer qubits than previously estimated. In response, the industry is moving toward post-quantum cryptography (PQC), replacing vulnerable signature schemes with quantum-resistant alternatives such as lattice-based Dilithium and Falcon, though these come with trade-offs: post-quantum signatures are typically far larger, which can slow block propagation and increase storage requirements. Major networks have already begun migration roadmaps — the XRP Ledger, for example, set milestones for the first half of 2026 targeting a post-quantum transition by 2028, designing for "cryptographic agility" so the network can adopt new NIST-standardised algorithms as the landscape matures.',
          },
          {
            type: 'definition',
            heading: 'Outlook',
            text: 'The relationship between blockchain and cyber security is likely to deepen along several lines: routine integration of zero-knowledge proofs (letting one party prove a claim is true without revealing the underlying sensitive data) into privacy and security tooling; continuous, automated smart-contract auditing rather than one-off static reviews; broader adoption of decentralised identity for authentication; and an industry-wide migration toward quantum-resistant cryptographic standards well before quantum computers become a practical threat.',
          },
          {
            type: 'termlist',
            heading: 'Recent Developments (2026)',
            items: [
              { term: 'Post-Quantum Cryptography Migration', def: 'Following responsible-disclosure research from Google\'s quantum security team in early 2026 (which used a zero-knowledge proof to demonstrate quantum vulnerabilities in elliptic curve cryptography without revealing exploitable details), major blockchain ecosystems accelerated their post-quantum roadmaps, including hybrid transition models supporting both classical and post-quantum cryptography simultaneously.' },
              { term: 'Quantum-Resistant Zero-Knowledge Proofs', def: 'Next-generation ZKP systems (zk-STARKs, lattice-based constructions) remain secure against quantum attacks, unlike older schemes depending on the discrete-logarithm assumption; new identity-centric ZK authorization frameworks aim to replace bulky post-quantum signatures with compact, cheaper-to-verify proofs.' },
              { term: 'Real-World Asset Tokenisation', def: 'Tokenised real-world assets, including gold and other commodities, are increasingly issued on public blockchains with mechanisms for physical redemption; stablecoins remain crypto\'s most important real-world use case as regulatory clarity improves.' },
              { term: 'AI, Blockchain & Cyber Security Convergence', def: 'AI is increasingly used to monitor blockchain networks for anomalous transaction patterns in real time, while blockchain creates tamper-evident logs of AI model decisions and data provenance — each technology reinforcing the other\'s trustworthiness.' },
              { term: 'Enterprise-Grade Infrastructure', def: 'Blockchain development is shifting from experimental pilots toward production-grade infrastructure — hosted nodes, fast indexers, monitoring dashboards and developer APIs lower the barrier for businesses to integrate blockchain features.' },
              { term: 'Continuous Smart Contract Security', def: 'Security researchers are pushing the industry away from static, one-time audits toward continuous, automated, always-on monitoring of deployed contracts, blending algorithmic anomaly detection with ongoing expert review.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'Blockchain technology has matured from a niche cryptographic experiment into a foundational piece of digital infrastructure with direct and growing relevance to cyber security. Its core properties — decentralisation, immutability, transparency and cryptographic integrity — make it a powerful tool for identity management, tamper-evident logging and trust between organisations that do not otherwise trust each other. At the same time it introduces its own attack surface, from smart contract vulnerabilities to the looming threat of quantum computing. For students of cyber security, blockchain is best understood not as a silver bullet but as one more tool in a broader security architecture, whose strengths and weaknesses must be evaluated as rigorously as any other technology.',
          },
        ],
      },
      {
        number: '5',
        title: 'Cloud Native Security',
        sections: [],
      },
      {
        number: '6',
        title: 'Privacy Enhancing Technologies (PET)',
        sections: [
          {
            type: 'text',
            text: 'Group 6 research project — by Mitchel Ifiok Nkan, Oto-abasi Effiok Offiong, Timothy David Richard, Felix Uwem Umoesen, Etim Ebenezer Mfon, Essien Emmanuel Festus, Essien Michael John, Ekpo Ebenezer Ime, Umoh Uyaiabasi Anthony and Igwechima Grace Chiamaka. An assigned project topic for CYB 222, examining Privacy Enhancing Technologies (PET) — mechanisms, applications and challenges in the modern digital ecosystem.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              'PETs protect personal data while still allowing useful processing, resting on three principles: data minimisation, user control, and privacy by design',
              'Security defends against outsiders; privacy constrains what the service provider itself may collect and link — a highly secure system can still be deeply privacy-invasive',
              'Three classes: Hard PETs (Differential Privacy, Homomorphic Encryption, Zero-Knowledge Proofs, SMPC, Federated Learning), Soft PETs (anonymisation, consent management, Self-Sovereign Identity), and Network PETs (Tor, VPNs, mix networks)',
              'Already deployed at scale — Apple’s Local DP since 2016, Google Gboard’s federated learning, Zcash’s zk-SNARKs, Estonia’s e-Residency, the COVID-19 exposure-notification API',
              'The barriers: fully homomorphic encryption runs 100–1,000× slower than plaintext, DP trades accuracy for privacy, and Nigeria’s NDPA 2023 mandates no specific PET — both an adoption gap and a research opening',
            ],
          },
          {
            type: 'definition',
            heading: 'Abstract',
            text: 'Privacy Enhancing Technologies (PETs) are a broad class of technical tools and methodologies designed to protect personal information while enabling useful data processing and communication. As digital systems increasingly mediate every aspect of modern life, how personal data is collected, processed and protected has become central to cybersecurity, law and human rights discourse. PETs represent a paradigm shift from reactive data protection to proactive, mathematically provable privacy guarantees. They are classified into three broad categories: Hard PETs (cryptographic mechanisms — Differential Privacy, Homomorphic Encryption, Zero-Knowledge Proofs, Secure Multi-Party Computation, Federated Learning), Soft PETs (policy-technical hybrids — anonymization, consent management, Self-Sovereign Identity), and Network PETs (communication anonymity tools — Tor, VPNs, Mix Networks).',
          },
          {
            type: 'definition',
            heading: 'What Is a Privacy Enhancing Technology?',
            text: 'PETs are technical tools, systems and methodologies designed to protect personal information by minimizing data collection, limiting data exposure, and enabling users to control their own digital identities — while still allowing useful data processing and communication. The term was first coined in 1995, in a report co-authored by the Dutch Data Protection Authority and the Office of the Information & Privacy Commissioner of Ontario, Canada.',
          },
          {
            type: 'bullets',
            heading: 'Three Foundational Principles of PET',
            items: [
              'Data Minimization — collect only what is strictly necessary for the stated purpose; nothing unnecessary is stored or exposed',
              'User Control — individuals manage their own identity and decide what data is shared, retaining agency even after data has reached legitimate parties',
              'Privacy by Design — privacy built into systems from the ground up, not bolted on later',
            ],
          },
          {
            type: 'note',
            text: "Think of a landlord who asks for your full bank statement, employer letter and family history just to rent you a room, versus one who only asks whether you can pay this month's rent and keeps that answer to himself. Traditional security is the second landlord locking the gate so no burglar gets in — but he can still be the first landlord, hoarding far more of your information than the job requires. PET is the discipline of being both: locking the gate AND never asking for more than the room needs.",
          },
          {
            type: 'table',
            heading: 'Traditional Security vs Privacy Enhancing Technology',
            headers: ['Dimension', 'Traditional Security', 'Privacy Enhancing Technology'],
            rows: [
              ['Protects data from', 'External attackers only', 'Even the service provider itself'],
              ['Identity model', 'Identity-based authentication', 'Anonymous or pseudonymous access'],
              ['Core mechanism', 'Access control', 'Data minimization — only necessary data is ever collected'],
              ['Encryption scope', 'In transit and at rest', 'End-to-end unlinkability, mathematically guaranteed'],
              ['Guiding model', 'CIA Triad (Confidentiality, Integrity, Availability)', 'CIA + Privacy, with provable mathematical guarantees'],
            ],
          },
          {
            type: 'definition',
            heading: 'Security vs Privacy — and Privacy by Design',
            text: 'Security is a property of a system — how well it defends against unauthorised access, modification or destruction of data. Privacy is a property of data processing — whether that processing respects the reasonable expectations of the individuals whose data is used. A highly secure system can still be deeply privacy-invasive: a government database with state-of-the-art encryption may still violate privacy if it collects more data than necessary or links records across departments without consent. Privacy by Design (Ann Cavoukian, 1995) argues privacy must be embedded into system architecture from the start, resting on seven principles: proactive not reactive; privacy as the default setting; privacy embedded into design; full functionality; end-to-end security; visibility and transparency; and respect for user privacy.',
          },
          {
            type: 'termlist',
            heading: 'Classification of PETs',
            items: [
              { term: 'Hard PETs', def: 'Cryptographic/mathematical mechanisms with provably strong privacy guarantees, not contingent on organisational trust — Differential Privacy, Homomorphic Encryption, Zero-Knowledge Proofs, Secure Multi-Party Computation, Federated Learning.' },
              { term: 'Soft PETs', def: 'Policy + technical hybrids that combine technical controls with organisational policy and law — Anonymization & Pseudonymization, Consent Management Platforms, Access Control Frameworks, Self-Sovereign Identity, Data Minimization Policies.' },
              { term: 'Network PETs', def: 'Communication-layer tools that anonymise identity and location as data traverses networks — Onion Routing (Tor), VPNs, Mix Networks, Private Information Retrieval, Anonymous Credentials.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Hard PET #1 — Differential Privacy (DP)',
            text: 'Differential Privacy adds calibrated statistical noise to datasets, ensuring that including or excluding any single individual’s data does not significantly affect query results. Introduced by Cynthia Dwork in 2006. Formally, a randomized mechanism M satisfies ε-differential privacy if for any two neighboring datasets D and D’ differing by exactly one record, and for any output set S: Pr[M(D) ∈ S] ≤ e^ε × Pr[M(D’) ∈ S]. A smaller epsilon gives stronger privacy but reduces data utility.',
          },
          {
            type: 'termlist',
            heading: 'Types of Differential Privacy',
            items: [
              { term: 'Global DP', def: 'Noise added at the aggregator/server — users trust the server to apply noise faithfully before publishing results.' },
              { term: 'Local DP', def: 'Noise added on-device before data leaves the user’s device — Apple’s approach since 2016; eliminates the need to trust a central aggregator.' },
              { term: 'Shuffle DP', def: 'Local DP combined with shuffling to reduce the noise requirement while maintaining strong privacy guarantees.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Real-World Differential Privacy Deployments',
            items: [
              'Apple — iOS keyboard & emoji analytics collected using Local DP since 2016',
              'Google — Chrome RAPPOR system for browser behaviour statistics',
              'US Census — DP applied to all published tables from the 2020 Census',
              'Healthcare — clinical trial data sharing, preserving individual patient privacy while enabling population-level research',
            ],
          },
          {
            type: 'definition',
            heading: 'Homomorphic Encryption (HE)',
            text: 'Homomorphic Encryption allows computation on encrypted data without decrypting it first — the result, when decrypted, matches the result of the same operations on plaintext. Transformative for cloud computing and outsourced data processing. Use case: a hospital sends encrypted patient data to a cloud AI model and receives a diagnosis — the cloud never sees raw data. Libraries such as Microsoft SEAL, IBM HElib and OpenFHE are making it progressively more accessible.',
          },
          {
            type: 'termlist',
            heading: 'Types of Homomorphic Encryption',
            items: [
              { term: 'PHE (Partially HE)', def: 'Supports either addition or multiplication, but not both simultaneously.' },
              { term: 'SHE (Somewhat HE)', def: 'Supports a limited number of mixed operations.' },
              { term: 'FHE (Fully HE)', def: 'Supports any arbitrary computation — most powerful but very computationally expensive, with overheads of 100x to 10,000x versus plaintext computation.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Zero-Knowledge Proofs (ZKP)',
            text: 'A Zero-Knowledge Proof lets a prover convince a verifier that a statement is true without revealing any information beyond the fact of its truth. Introduced by Goldwasser, Micali and Rackoff (1985). Classic example: proving you are over 18 to a website without revealing your exact date of birth or showing your ID card — the verifier gets mathematically confirmed proof but learns nothing else.',
          },
          {
            type: 'bullets',
            heading: 'Real-World ZKP Applications',
            items: [
              'Zcash — shielded cryptocurrency transactions; amount, sender and receiver all hidden via zk-SNARKs',
              'zkSync — Ethereum Layer 2 privacy scaling protocol',
              'W3C DID — decentralised digital identity systems built on Verifiable Credentials and Decentralised Identifiers',
            ],
          },
          {
            type: 'definition',
            heading: 'Federated Learning',
            text: 'Federated Learning is a distributed machine learning paradigm in which model training occurs across many devices or nodes, each holding local data that never leaves the device or gets centralised — only model parameters (gradients) are aggregated by a central server. Used by Apple (Siri), Google (Gboard) and healthcare AI research institutions. Key advantage: protection against breaches at a central server and regulatory compliance with data localisation requirements. Main limitation: vulnerability to model inversion and gradient leakage attacks, often requiring additional DP noise to mitigate.',
          },
          {
            type: 'termlist',
            heading: 'How Federated Learning Works',
            items: [
              { term: '1 · Global Model', def: 'The server sends an initial model to all participating devices.' },
              { term: '2 · Local Training', def: 'Each device trains the model exclusively on its own local data.' },
              { term: '3 · Gradient Sharing', def: 'Devices send only model updates (gradients), not raw data, back to the server.' },
              { term: '4 · Aggregation', def: 'The server aggregates all updates to produce an improved global model.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Secure Multi-Party Computation (SMPC)',
            text: 'SMPC enables multiple parties to jointly compute a function over their combined inputs without any party learning the individual inputs of the others. Rooted in Yao’s Millionaires’ Problem (1982): two billionaires determine who is richer without either revealing their actual net worth to the other.',
          },
          {
            type: 'bullets',
            heading: 'SMPC Applications',
            items: [
              'Privacy-preserving financial audits across institutions',
              'Federated fraud detection networks — multiple banks train a fraud model jointly without sharing raw customer records',
              'Joint medical research — no individual patient data is shared across hospital boundaries',
              'Cryptographically secure electronic voting — vote tallying verifiable without revealing individual votes',
            ],
          },
          {
            type: 'termlist',
            heading: 'Soft PETs',
            items: [
              { term: 'Anonymization', def: 'Permanently removes identifiers so data cannot be re-linked to any individual; successful anonymisation falls outside GDPR/NDPA scope, but re-identification attacks using auxiliary information show naive anonymisation is often insufficient.' },
              { term: 'Pseudonymization', def: 'Replaces direct identifiers with pseudonyms while preserving the ability to re-link records using a separately held key — GDPR Article 4(5) recognises it as a technical measure that reduces risk while keeping analytical utility.' },
              { term: 'Data Masking', def: 'Dynamically obscures sensitive data fields — e.g. showing only the last four digits of a card number, or masking patient names for a billing officer.' },
              { term: 'Consent Management Platforms (CMPs)', def: 'Technical systems that record, manage and enforce user consent under GDPR/NDPA — cookie consent banners are the most visible example.' },
              { term: 'Self-Sovereign Identity (SSI)', def: 'Built on W3C Verifiable Credentials and Decentralised Identifiers; users own and fully control their credentials, issuing them on demand without a central identity provider, enabling ZKP-based selective disclosure.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Network Privacy Tools',
            items: [
              { term: 'Tor (Onion Routing)', def: 'Routes traffic through multiple encrypted relay nodes; each node knows only the previous and next hop, never both source and destination — anonymising IP and location.' },
              { term: 'VPN', def: 'Encrypts all traffic between a user’s device and a VPN server, masking the user’s IP from websites, ISPs and network-level surveillance.' },
              { term: 'Mix Networks', def: 'Collect messages from multiple senders, shuffle and re-encrypt them, then forward in a different order — preventing traffic-analysis correlation of input/output flows.' },
              { term: 'Private Information Retrieval (PIR)', def: 'Cryptographic protocols letting a user query a database without the server learning which record was retrieved.' },
              { term: 'Anonymous Credentials', def: 'Prove attributes (age, nationality, membership) without disclosing the holder’s identity.' },
            ],
          },
          {
            type: 'table',
            heading: 'Legal & Regulatory Frameworks',
            headers: ['Regulation', 'Region', 'Core Privacy Principle', 'Direct PET Mandate'],
            rows: [
              ['GDPR 2018', 'EU', 'Privacy by Design (Art. 25)', 'Pseudonymization and encryption explicitly required'],
              ['NDPA 2023', 'Nigeria', 'Appropriate technical measures', 'No specific PET prescribed — principle-based approach'],
              ['CCPA 2020', 'California, USA', 'Right to opt-out of data sale', 'Reasonable security measures — no specific PET required'],
              ['HIPAA', 'USA Healthcare', 'PHI protection', 'Safe Harbor and Expert Determination de-identification methods'],
              ['ISO/IEC 27701', 'International', 'Privacy Information Management', 'Implementation guidance for GDPR/NDPA compliance'],
            ],
          },
          {
            type: 'definition',
            heading: 'GDPR and Nigeria’s NDPA 2023',
            text: 'GDPR Article 5 establishes data minimization; Article 25 mandates Privacy by Design and by Default, explicitly requiring pseudonymization and other technical measures; Article 17 grants the right to erasure; Article 20 establishes data portability. Nigeria’s NDPA 2023 (NITDA) requires appropriate technical measures, Data Protection Impact Assessments for high-risk processing, and cross-border transfer restrictions — directly mandating PET-equivalent controls in principle. Its critical gap: unlike GDPR Article 25, the NDPA does not prescribe particular PET methods, creating both a compliance challenge and an innovation opportunity for PET adoption in Nigeria.',
          },
          {
            type: 'bullets',
            heading: 'Real-World Applications Across Sectors',
            items: [
              'Healthcare — Federated Learning enabled NHS England + Google DeepMind to train an eye-disease detection model across hospital trusts without centralising patient records; DP applied to clinical trial data sharing',
              'Finance — SMPC enables cross-bank fraud detection on combined transaction data; Homomorphic Encryption is piloted for privacy-preserving credit scoring on encrypted financial profiles',
              'E-Government — Estonia’s e-Residency uses cryptographic credentials for identity proof and document signing without revealing unnecessary personal information; ZKPs are emerging for next-generation national identity systems',
              'Mobile devices — Apple’s iOS uses Local DP for emoji/keyboard analytics; Google Gboard’s next-word prediction is trained via Federated Learning',
              'COVID-19 contact tracing — the Google/Apple Exposure Notification API computes exposure locally with rotating pseudonymous identifiers; no location data or contact lists are ever transmitted to a server',
              'Blockchain — Zcash deploys zk-SNARKs for shielded transactions; Monero uses Ring Signatures and stealth addresses for similar anonymity at consumer scale',
            ],
          },
          {
            type: 'definition',
            heading: 'Case Study — Apple’s Differential Privacy',
            text: 'In 2016, Apple became the first major tech company to deploy Local Differential Privacy at consumer scale — collecting iOS behavioural statistics without ever compromising individual user privacy, bridging academic theory and consumer technology.',
          },
          {
            type: 'termlist',
            heading: 'The Five-Stage Pipeline',
            items: [
              { term: 'Stage 1 — User Device', def: 'Raw data is generated on-device (keystrokes, emoji usage, Safari crashes).' },
              { term: 'Stage 2 — Noise Added', def: 'DP noise is applied on-device before any data leaves the device.' },
              { term: 'Stage 3 — Data Sent', def: 'Only noisy, privacy-protected data is transmitted to Apple servers.' },
              { term: 'Stage 4 — Aggregation', def: 'Apple aggregates millions of individually noisy records.' },
              { term: 'Stage 5 — Insight', def: 'Useful population-level trends are extracted from the aggregated noisy data.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Key Technical Facts',
            items: [
              'Applied to emoji usage frequency, QuickType keyboard predictions, Safari crash reports and Health app trends',
              'Privacy guarantee: even Apple engineers cannot determine any individual’s specific behaviour from the transmitted data',
              'Technical approach: Local DP using randomized response protocols (CMS, HCMS, PCMS, SFP), noise added on-device before transmission',
              'Industry impact: first major commercial Local DP deployment at global consumer scale, catalysing adoption by Google (RAPPOR, TensorFlow Privacy) and the US Census Bureau (2020 Census)',
            ],
          },
          {
            type: 'note',
            text: "Researchers at Google and UC Berkeley found Apple's real-world epsilon values may be higher (weaker) than formally claimed, and that composing many noisy reports from the same device over time erodes the effective privacy guarantee — the fundamental tension between utility (lower epsilon = less useful data) and privacy (higher epsilon = weaker guarantee). Discussion question worth sitting with: could this Local DP model apply to Nigeria's NIN and BVN enrolment data analytics, and what would a lower-resource context require to adapt it?",
          },
          {
            type: 'termlist',
            heading: 'Technical Challenges',
            items: [
              { term: 'Performance overhead', def: 'FHE is 100x–1,000x slower than plaintext computation; every PET layer of cryptographic protection adds latency, challenging real-time use.' },
              { term: 'Accuracy trade-offs', def: 'DP noise degrades accuracy at high epsilon values, particularly problematic for small populations or rare events such as medical research.' },
              { term: 'Implementation complexity', def: 'ZKP and SMPC require advanced cryptographic expertise; incorrect implementation can silently eliminate the privacy guarantee entirely.' },
              { term: 'Re-identification risk', def: 'The Netflix Prize dataset (2007/2008) was partially de-anonymised by correlating it with public information — naive anonymisation alone is insufficient.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Adoption Challenges',
            items: [
              { term: 'Low PET awareness', def: 'Particularly in developing economies including Nigeria, most organisations have limited awareness of PET beyond basic encryption.' },
              { term: 'High implementation costs', def: 'Advanced PETs such as FHE and ZKP-based systems are unaffordable for most Nigerian SMEs without substantial external support.' },
              { term: 'Absence of local expertise', def: 'PET expertise is largely absent from local tech ecosystems, creating a significant skills gap.' },
              { term: 'Regulatory ambiguity', def: 'NDPA 2023 lacks specific PET mandates, reducing urgency and allowing compliance claims without meaningful technical implementation.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Ethical Challenges',
            items: [
              { term: 'Dual-use technology', def: 'Tor, originally built by the US Naval Research Laboratory, serves both legitimate privacy-sensitive uses (journalism, activism, abuse-victim support) and illegal marketplaces — strong anonymisation is inevitably used for both.' },
              { term: 'Tension with law enforcement', def: 'The privacy vs. law-enforcement-access debate remains unresolved; government demands for encryption "backdoors" threaten to undermine PET security for everyone.' },
              { term: 'Bias in synthetic data', def: 'Synthetic DP data may amplify pre-existing biases in the original dataset, adding a fairness concern alongside the privacy benefit.' },
            ],
          },
          {
            type: 'bullets',
            heading: 'Nigerian Context — Recommendations',
            items: [
              'Universities (including UniUyo) — integrate PET into cybersecurity curricula: Differential Privacy theory, Federated Learning frameworks and ZKP fundamentals as standard course content',
              'NITDA and policymakers — issue clear, sector-specific PET implementation guidelines under the NDPA 2023, starting with high-risk sectors (healthcare, fintech, government identity systems)',
              'Nigerian fintechs — adopt Federated Learning for cross-institutional fraud detection, beginning with sandbox collaborations between two or three willing partner banks',
              'Government digital identity programmes — commission a technical feasibility study for ZKP-based selective disclosure in the NIN and BVN systems',
              'Research community — establish PET research centres at Nigerian universities adapted for African contexts: lower computational resources, mobile-first architectures, multilingual data environments',
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'PET represents the frontier where cryptography, law and human rights converge. Understanding PET is not optional for cybersecurity professionals — it is the foundation of building trustworthy digital systems in an era where data is both the most valuable and the most abused resource. PET provides mathematical privacy guarantees beyond what traditional security offers, protecting individuals even from the systems that legitimately hold their data. DP, HE, ZKP, Federated Learning and SMPC are the core Hard PETs to master; GDPR and Nigeria’s NDPA 2023 give clear legal motivation for adoption; and Nigeria’s adoption gaps present real research and innovation opportunities for the next generation of cybersecurity professionals.',
          },
        ],
      },
      {
        number: '7',
        title: 'Automated Vulnerability Research',
        sections: [],
      },
      {
        number: '8',
        title: 'Agentic AI',
        sections: [
          {
            type: 'text',
            text: 'Group 8 seminar presentation — by Charles Prosper Obot, Abasiakara Bassey Samuel, Victor Gregory Tom, Edikan Amaowoh Joseph, Victor Archibong Akaninyene and Uwaoma Eze Ebisike. An assigned project topic for CYB 222, examining Agentic AI — autonomous systems that plan, decide and act with minimal human supervision, and what that autonomy means for cybersecurity.',
          },
          {
            type: 'bullets',
            heading: 'In brief',
            items: [
              'Agentic AI is given a goal rather than a command — it plans, acts and adapts toward that goal with minimal human intervention',
              'Perceive → reason and plan → act → monitor and adapt is the loop that separates an agent from a model that merely answers when spoken to',
              'Assembled from five components: machine learning, natural language processing, a memory system, a reasoning engine, and a planning/execution module',
              'In cybersecurity it drives threat detection, incident response, vulnerability management, malware detection and continuous monitoring',
              'Strictly dual-use — the same autonomy lets attackers run sophisticated campaigns at scale. Black-box decisions, privacy exposure and cost are why human oversight stays mandatory',
            ],
          },
          {
            type: 'definition',
            heading: 'Abstract',
            text: 'Agentic AI refers to autonomous systems that can plan, decide, and act toward specific goals with little to no human supervision. Unlike traditional AI that simply responds to inputs, agentic systems continuously perceive, reason, and adapt — making them fundamentally different from conventional models. Tracing back to the early expert systems of the 1950s, through the BDI architectures of the 1990s, to today’s LLM-powered agents, agentic AI has grown into a critical force in modern technology. In cybersecurity this cuts both ways: defenders use it to automate threat detection and incident response, while attackers exploit the same autonomy to launch sophisticated, large-scale campaigns. This dual nature makes agentic AI one of the most consequential developments in the cybersecurity landscape today, demanding careful oversight, governance, and responsible deployment.',
          },
          {
            type: 'definition',
            heading: 'Introduction',
            text: 'Artificial Intelligence has evolved significantly over the years, progressing from simple rule-based systems to intelligent technologies capable of learning, reasoning, and making decisions. One of the latest developments in this field is Agentic AI, a new generation of AI systems that can plan, act, and solve problems with minimal human intervention. Unlike traditional AI, which performs specific tasks based on predefined instructions, Agentic AI can perceive its environment, make autonomous decisions, adapt to changing situations, and work toward achieving defined goals. It combines machine learning, natural language processing, reasoning models and memory systems to perform complex tasks more efficiently. It is being adopted across healthcare, finance, education, robotics and cybersecurity — and in cybersecurity specifically it automates threat detection, incident response and security monitoring, helping organisations respond more quickly to evolving threats.',
          },
          {
            type: 'definition',
            heading: 'History of Artificial Intelligence and Agentic AI',
            text: 'The history of Artificial Intelligence dates back to the 1950s, when scientists began exploring the idea of creating machines capable of performing tasks that normally require human intelligence. In 1956 the term “Artificial Intelligence” was officially introduced by computer scientist John McCarthy during the Dartmouth Conference, widely regarded as the birth of AI as a field of study. Agentic AI is the modern stage of that development — systems designed not only to respond to commands but to reason, plan, adapt and act autonomously, completing tasks, interacting with tools and analysing situations with minimal supervision.',
          },
          {
            type: 'termlist',
            heading: 'From Rule-Based Programs to Agentic AI — the Timeline',
            items: [
              { term: '1950s', def: 'Scientists begin exploring machines capable of tasks that normally require human intelligence. Early systems are rule-based programs that solve mathematical problems, play simple games and perform basic reasoning — but cannot learn and are inflexible.' },
              { term: '1956 — Dartmouth Conference', def: 'John McCarthy formally introduces the term “Artificial Intelligence”. This is widely regarded as the birth of AI as a field of study.' },
              { term: '1960s–1970s', def: 'AI research expands into natural language processing, robotics and expert systems.' },
              { term: '1980s — expert systems', def: 'Systems that use stored knowledge and rules to imitate human decision-making in specialised fields such as medicine and engineering become popular. Limitations in computing power and data then cause a slowdown known as the “AI Winter”.' },
              { term: '1990s–early 2000s — resurgence', def: 'Improvements in processing power, internet growth and the availability of large datasets revive the field. Machine learning and neural networks advance, letting systems learn patterns from data instead of relying only on fixed rules.' },
              { term: '2010s — deep learning and LLMs', def: 'Deep learning and large language models transform AI capability: speech recognition, image analysis, translation, recommendation systems and intelligent conversation. Virtual assistants, autonomous vehicles and advanced chatbots emerge.' },
              { term: 'Intelligent agents → Agentic AI', def: 'Researchers introduce intelligent agents — systems that perceive environments, make decisions and take actions to achieve goals. This leads directly to Agentic AI, now applied in cybersecurity, healthcare, finance, education, robotics and business automation.' },
            ],
          },
          {
            type: 'definition',
            heading: 'What Is Agentic AI?',
            text: 'Agentic AI is a type of Artificial Intelligence that can independently make decisions, plan actions, solve problems and complete tasks with minimal human intervention. Unlike traditional AI systems, which mainly respond to specific commands or perform predefined tasks, Agentic AI acts as an intelligent agent that can reason, adapt to changing situations and work toward achieving a defined goal. It combines machine learning (ML), natural language processing (NLP), reasoning models, memory systems and automation tools to analyse information, make informed decisions and execute multi-step tasks. It can also learn from previous interactions and adjust its actions based on new information, making it more flexible and efficient than conventional AI.',
          },
          {
            type: 'table',
            heading: 'Traditional AI vs Agentic AI',
            headers: ['Dimension', 'Traditional AI', 'Agentic AI'],
            rows: [
              ['Trigger', 'Responds to a specific command or input', 'Receives a goal, then decides for itself what to do'],
              ['Task scope', 'Performs predefined, single-step tasks', 'Plans and executes complex, multi-step tasks'],
              ['Instructions', 'Depends heavily on human instructions', 'Operates with minimal human intervention'],
              ['Response to change', 'Fixed behaviour — rules must be rewritten', 'Adapts its behaviour to changing situations and new information'],
              ['Learning', 'Learns only where the model is explicitly retrained', 'Learns from previous interactions and feedback, improving over time'],
              ['Security use', 'Relies on predefined detection rules', 'Reasons about new attack patterns and decides in real time'],
            ],
          },
          {
            type: 'definition',
            heading: 'Evolution of Agentic AI',
            text: 'The evolution of Agentic AI is closely linked to the advancement of Artificial Intelligence generally. Early AI systems were rule-based and could only perform tasks according to predefined instructions. As machine learning and deep learning developed, AI gained the ability to learn from data, recognise patterns and improve its performance over time. The emergence of large language models (LLMs), advanced reasoning techniques and automation tools transformed these systems further, enabling AI to understand complex instructions, retain context, plan multiple steps and interact with other software and digital environments. Agentic AI represents the next stage: rather than simply responding to user commands, it independently plans, decides, adapts and completes tasks with minimal human intervention.',
          },
          {
            type: 'bullets',
            heading: 'How Agentic AI Works',
            items: [
              'Receive — the system is given a goal or instruction by a user',
              'Perceive — it gathers relevant information from its environment or available data sources',
              'Reason and plan — it analyses that information, reasons through possible solutions, and creates a plan to accomplish the task',
              'Act — it executes the required actions, interacting with software, databases or other digital tools',
              'Monitor and adapt — it continuously monitors the results, learns from feedback, and adjusts its actions when necessary to improve performance',
            ],
          },
          {
            type: 'note',
            text: 'The difference between traditional AI and an agent is the difference between a calculator and an accountant. You hand a calculator two numbers and an operation, and it returns one answer — it does exactly and only what you typed. You hand an accountant a goal ("file this year’s returns"), and they go and find the receipts, decide what still needs checking, do the work in whatever order makes sense, and come back if something does not add up. The perceive → reason → plan → act → adapt loop above is what turns the calculator into the accountant — and it is also precisely why an agent that is compromised or badly aimed can do far more damage than a compromised calculator ever could.',
          },
          {
            type: 'termlist',
            heading: 'Characteristics of Agentic AI',
            items: [
              { term: 'Autonomy', def: 'Performs tasks and makes decisions with minimal human intervention.' },
              { term: 'Goal-oriented', def: 'Focuses on achieving specific objectives by planning and executing actions.' },
              { term: 'Adaptability', def: 'Adjusts its behaviour based on changes in its environment or new information.' },
              { term: 'Reasoning', def: 'Analyses situations and selects the most appropriate course of action.' },
              { term: 'Learning ability', def: 'Improves its performance over time through experience and feedback.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Components of Agentic AI',
            items: [
              { term: 'Machine Learning (ML)', def: 'Enables the system to learn from data and improve accuracy.' },
              { term: 'Natural Language Processing (NLP)', def: 'Allows the AI to understand and communicate using human language.' },
              { term: 'Memory system', def: 'Stores and retrieves information from previous interactions.' },
              { term: 'Reasoning engine', def: 'Evaluates information and supports intelligent decision-making.' },
              { term: 'Planning and execution module', def: 'Creates action plans and carries out tasks to achieve defined goals.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Applications of Agentic AI',
            items: [
              { term: 'Cybersecurity', def: 'Detects cyber threats, automates incident response, and strengthens security monitoring.' },
              { term: 'Healthcare', def: 'Assists in disease diagnosis, patient monitoring and treatment recommendations.' },
              { term: 'Finance', def: 'Detects fraudulent transactions, manages risk and supports investment decisions.' },
              { term: 'Education', def: 'Provides personalised learning experiences and intelligent tutoring systems.' },
              { term: 'Business automation', def: 'Automates customer service, workflow management and administrative tasks.' },
              { term: 'Manufacturing', def: 'Optimises production processes, predictive maintenance and quality control.' },
              { term: 'Robotics', def: 'Enables autonomous robots to navigate, make decisions and perform complex tasks in dynamic environments.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Agentic AI in Cybersecurity',
            text: 'Agentic AI is transforming cybersecurity by enabling security systems to detect, analyse and respond to cyber threats with minimal human intervention. Unlike traditional security tools that rely on predefined rules, Agentic AI can reason, adapt to new attack patterns, and make real-time decisions to protect digital systems. The same autonomy, however, is available to attackers — who can use it to launch sophisticated, large-scale campaigns — which is why the technology is described as dual-use and why governance and human oversight remain essential.',
          },
          {
            type: 'termlist',
            heading: 'Key Security Applications',
            items: [
              { term: 'Threat detection', def: 'Identifies suspicious activities and emerging cyber threats in real time.' },
              { term: 'Incident response', def: 'Automatically investigates and responds to security incidents, reducing response time.' },
              { term: 'Vulnerability management', def: 'Scans systems for weaknesses and recommends or applies appropriate security measures.' },
              { term: 'Malware detection', def: 'Detects and analyses malicious software using intelligent learning techniques.' },
              { term: 'Security monitoring', def: 'Continuously monitors networks and systems to identify unusual behaviour.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Benefits of Agentic AI',
            items: [
              { term: 'Increased automation', def: 'Performs repetitive and complex tasks with little human intervention, improving operational efficiency and reducing manual workload.' },
              { term: 'Faster decision-making', def: 'Analyses large volumes of data in real time and decides much faster than humans, especially in time-sensitive situations.' },
              { term: 'Improved productivity', def: 'Automates multi-step workflows, allowing employees to focus on strategic and creative tasks rather than routine activities.' },
              { term: 'Enhanced cybersecurity', def: 'Continuously monitors systems, detects threats, investigates suspicious activity and responds to incidents more quickly than traditional security tools.' },
              { term: 'Adaptability', def: 'Unlike rule-based systems, learns from new information, adapts to changing environments and improves its performance over time.' },
              { term: 'Scalability', def: 'Manages multiple tasks simultaneously across large and complex systems without a significant increase in human resources.' },
            ],
          },
          {
            type: 'termlist',
            heading: 'Challenges of Agentic AI',
            items: [
              { term: 'Security risks', def: 'If compromised by attackers, an autonomous AI system could make harmful decisions or be manipulated into performing malicious actions.' },
              { term: 'Privacy concerns', def: 'Agentic AI often requires access to large amounts of personal or organisational data, raising data-protection and unauthorised-access concerns.' },
              { term: 'Lack of transparency', def: 'Some agentic systems operate as “black boxes”, making it difficult to understand how they reached a particular decision.' },
              { term: 'Ethical issues', def: 'Autonomous decision-making creates ethical dilemmas, especially in healthcare, finance and law enforcement where AI decisions significantly affect people’s lives.' },
              { term: 'High development and implementation costs', def: 'Building, deploying and maintaining agentic systems requires significant investment in computing resources, skilled professionals and infrastructure.' },
              { term: 'Dependence on data quality', def: 'Effectiveness depends on the accuracy and quality of the data received — poor or biased data leads to incorrect decisions and unreliable outcomes.' },
              { term: 'Human oversight', def: 'Despite its autonomy, Agentic AI still requires human supervision to ensure its actions remain safe, ethical and aligned with organisational objectives.' },
            ],
          },
          {
            type: 'definition',
            heading: 'Conclusion',
            text: 'Agentic AI represents the next stage in the evolution of Artificial Intelligence, enabling systems to make decisions, adapt to changing situations and perform tasks with minimal human intervention. Its ability to combine reasoning, learning, planning and automation makes it more efficient than traditional AI systems. As adoption continues to grow across industries — particularly in cybersecurity — Agentic AI is improving threat detection, incident response and overall operational efficiency. Although challenges such as security, privacy and ethical concerns remain, responsible development and human oversight can help maximise its benefits. Overall, Agentic AI has the potential to transform the future of intelligent systems and drive innovation across many sectors.',
          },
          {
            type: 'bullets',
            heading: 'References',
            items: [
              'Russell, S., & Norvig, P. (2021). Artificial Intelligence: A Modern Approach (4th ed.). Pearson.',
              'NIST. (2024). Artificial Intelligence Risk Management Framework (AI RMF 1.0).',
              'OWASP. (2025). Top 10 Risks for Large Language Model Applications.',
              'Microsoft. (2024). Security Copilot Documentation.',
              'OpenAI. (2025–2026). ChatGPT and AI Agent documentation.',
              'IBM. (2024). What Is Agentic AI?',
              'Google Cloud. (2025). Agentic AI Explained.',
              'Gartner. (2025). Top Strategic Technology Trends.',
            ],
          },
        ],
      },
      {
        number: '9',
        title: 'Deepfake Detection',
        sections: [],
      },
    ],
    quiz: [
      { question: "Which quantum algorithm breaks RSA and ECC by solving factorization and discrete logarithms in polynomial time?", options: ["Grover's Algorithm", "Shor's Algorithm", "Mosca's Theorem", "The Quantum Fourier Sieve"], correctIndex: 1, explanation: "Shor's Algorithm (1994) solves both integer factorization and the discrete logarithm problem in polynomial time, breaking RSA, ECC and Diffie-Hellman." },
      { question: "What effect does Grover's Algorithm have on symmetric cryptography such as AES?", options: ["It breaks AES completely", "It has no measurable effect on the cipher", "It roughly halves the effective bit-security level", "It doubles the required key size automatically"], correctIndex: 2, explanation: "Grover's quadratic speed-up turns O(N) search into O(√N), effectively halving the bit-security of a symmetric primitive." },
      { question: "What is the recommended response to Grover's Algorithm for symmetric encryption?", options: ["Abandon AES entirely", "Replace AES with RSA", "Switch to ECC", "Upgrade AES-128 to AES-256"], correctIndex: 3, explanation: "Doubling the key size (AES-128 → AES-256) restores the security margin; no new algorithm is needed for symmetric crypto." },
      { question: "What is the 'Harvest Now, Decrypt Later' (HNDL) attack?", options: ["Storing encrypted traffic today to decrypt it once a quantum computer exists", "Encrypting data then deleting the key", "A phishing campaign against key servers", "A denial-of-service flood aimed at overwhelming TLS handshakes"], correctIndex: 0, explanation: "Adversaries intercept and archive encrypted data now, intending to decrypt it retroactively after Q-Day — so long-lived data is already at risk." },
      { question: "Mosca's Theorem says an organisation is already at risk when:", options: ["Migration time alone exceeds years until Q-Day", "Migration time + data secrecy lifetime exceeds years until Q-Day", "Data secrecy lifetime alone exceeds the years until Q-Day", "It never quantifies risk numerically"], correctIndex: 1, explanation: "If (Migration Time) + (Data Secrecy Lifetime) > (Years until Q-Day), the organisation is already in a state of cryptographic risk." },
      { question: "How many core mathematical families underpin modern post-quantum cryptography?", options: ["Three", "Seven", "Five", "Two"], correctIndex: 2, explanation: "PQC is built across five families: lattice-based, code-based, hash-based, multivariate and isogeny-based — providing structural diversity." },
      { question: "Which mathematical family is the primary basis of the main NIST standards ML-KEM and ML-DSA?", options: ["Code-based", "Hash-based", "Isogeny-based", "Lattice-based"], correctIndex: 3, explanation: "Both ML-KEM and ML-DSA are built on the Module Learning With Errors (M-LWE) lattice problem." },
      { question: "Which PQC candidate was dramatically broken in 2022 on a classical computer in about an hour?", options: ["SIKE (isogeny-based)", "ML-KEM", "SLH-DSA (stateless hash-based)", "HQC"], correctIndex: 0, explanation: "SIKE, the leading isogeny-based candidate, was broken by KU Leuven researchers in 2022 — a key lesson in valuing cryptanalytic scrutiny over elegance." },
      { question: "Which NIST standard specifies ML-KEM?", options: ["FIPS 204", "FIPS 203", "FIPS 205", "FIPS 206"], correctIndex: 1, explanation: "FIPS 203 is the Module-Lattice-Based Key-Encapsulation Mechanism Standard (ML-KEM)." },
      { question: "Which NIST standard specifies ML-DSA?", options: ["FIPS 203", "FIPS 205", "FIPS 204", "FIPS 206"], correctIndex: 2, explanation: "FIPS 204 is the Module-Lattice-Based Digital Signature Standard (ML-DSA), derived from CRYSTALS-Dilithium." },
      { question: "SLH-DSA, the stateless hash-based signature standard, is published as:", options: ["FIPS 203", "FIPS 204", "FIPS 206", "FIPS 205"], correctIndex: 3, explanation: "FIPS 205 is the Stateless Hash-Based Digital Signature Standard (SLH-DSA), derived from SPHINCS+." },
      { question: "What is ML-KEM primarily used for?", options: ["Secure key establishment (key encapsulation)", "Digital signatures", "Hashing passwords", "Secure cryptographic random number generation"], correctIndex: 0, explanation: "A Key Encapsulation Mechanism establishes a shared secret over a public network, replacing RSA and Diffie-Hellman key exchange." },
      { question: "ML-KEM was derived from which competition submission?", options: ["CRYSTALS-Dilithium", "CRYSTALS-Kyber", "SPHINCS+", "Falcon"], correctIndex: 1, explanation: "ML-KEM is the standardized form of the CRYSTALS-Kyber KEM." },
      { question: "Which standardized signature scheme produces the smallest (~666-byte) signatures, making it suited to DNS?", options: ["ML-DSA", "SLH-DSA", "Falcon", "HQC"], correctIndex: 2, explanation: "Falcon (FN-DSA) produces ~666-byte signatures — roughly 3.6× smaller than ML-DSA-44 — favouring packet-size-constrained DNS." },
      { question: "What is the main drawback of SLH-DSA?", options: ["Weak security", "It fundamentally depends on lattice mathematics", "It has no formal standard", "Very large signatures and slow signing"], correctIndex: 3, explanation: "SLH-DSA signatures range from 7,856 to 49,856 bytes, so it suits low-frequency, high-security signing rather than high-throughput use." },
      { question: "HQC, selected by NIST in 2025, derives its security from which problem?", options: ["Syndrome decoding of linear error-correcting codes", "Learning With Errors", "Classical integer factorization of very large numbers", "Discrete logarithm"], correctIndex: 0, explanation: "HQC is a code-based KEM built on the Syndrome Decoding Problem, independent of lattice mathematics and studied since 1978." },
      { question: "Why does NIST deliberately standardize algorithms from multiple mathematical families?", options: ["To make them faster", "For cryptographic diversity, so one mathematical break does not collapse everything", "For patent and intellectual-property licensing reasons", "To reduce key sizes"], correctIndex: 1, explanation: "Multi-family diversity means a breakthrough against one foundation (as happened to SIKE) does not eliminate all standardized options." },
      { question: "When is 'Q-Day' — the arrival of a Cryptographically Relevant Quantum Computer — generally estimated?", options: ["It already happened in 2024", "Around 2050", "Between 2030 and 2035", "It will never happen"], correctIndex: 2, explanation: "The consensus estimate for a CRQC capable of breaking RSA-2048 is roughly 2030–2035." },
      { question: "Roughly how many stable logical qubits are estimated to break RSA-2048 with Shor's Algorithm?", options: ["About 96", "About 512", "About one million", "About 4,096"], correctIndex: 3, explanation: "Breaking RSA-2048 needs roughly 4,096 stable logical qubits; as of 2026 the largest machines reach only ~96." },
      { question: "What does dual-mode hybrid cryptography mean during the PQC transition?", options: ["Running a classical and a PQC algorithm together so both must be defeated", "Using two passwords", "Hashing data twice", "Using two separate certificate authorities to issue certificates"], correctIndex: 0, explanation: "A hybrid combines outputs of a classical algorithm and a PQC algorithm (e.g. X25519 + ML-KEM) so an attacker must break both." },
      { question: "Which hybrid key exchange does Google Chrome deploy by default?", options: ["RSA + AES", "X25519 + ML-KEM-768", "ECDSA plus Falcon signatures", "SHA-256 + HQC"], correctIndex: 1, explanation: "Chrome uses an X25519 + ML-KEM-768 hybrid in TLS 1.3 by default, already protecting billions of connections." },
      { question: "Why is DNSSEC a particular challenge for PQC migration?", options: ["The generated signatures become too small for verifiers to check", "DNS cannot be encrypted at all", "PQC signatures exceed UDP packet-size limits, forcing fragmentation and TCP fallback", "DNS is already fully quantum-safe"], correctIndex: 2, explanation: "DNSSEC assumed small signatures; PQC signatures exceed the ~1,232-byte UDP limit, causing fragmentation, dropped packets and TCP fallback." },
      { question: "KyberSlash is an example of what kind of weakness?", options: ["A complete mathematical break of the underlying lattice problem", "A DNS amplification attack", "A new quantum algorithm", "A timing side-channel in certain ML-KEM implementations"], correctIndex: 3, explanation: "KyberSlash exploited timing variation in a division operation in some ML-KEM implementations — a sound standard can still be implemented insecurely." },
      { question: "Which configuration remains safe even after Grover's Algorithm?", options: ["AES-256", "AES-128", "SHA-256 collision resistance", "RSA-2048"], correctIndex: 0, explanation: "Grover reduces AES-256 to a 128-bit security level, which is still considered safe; AES-128 drops to an unsafe 64-bit level." },
      { question: "By when does NIST's timeline call for deprecating RSA and ECC from federal systems?", options: ["2026", "2030", "2040", "Never"], correctIndex: 1, explanation: "NIST's current timeline deprecates RSA and ECC by 2030, with mandatory full PQC compliance by 2035." },
      { question: "Why don't larger RSA or ECC keys defend against Shor's Algorithm?", options: ["Because the encryption keys cannot be made any larger", "Because Grover assists the attack", "Because Shor is polynomial, so bigger keys add only linear overhead", "They do fully defend against it"], correctIndex: 2, explanation: "Shor runs in polynomial time, so increasing key size adds only modest linear cost for the attacker — not exponential resistance." },
      { question: "Which countermeasure splits sensitive intermediate values into random shares to resist power analysis?", options: ["Rejection sampling", "Fragmentation", "Hybrid mode", "Masking"], correctIndex: 3, explanation: "Cryptographic masking splits secret values into random shares that individually reveal nothing, defeating side-channel analysis (at ~20–35% overhead)." },
      { question: "What is the first phase of the proposed institutional PQC migration framework?", options: ["Discovery and cryptographic asset inventory", "Enforce quantum-native algorithms immediately", "Buy all-new hardware first", "Do nothing until Q-Day"], correctIndex: 0, explanation: "Phase 1 audits every instance of vulnerable public-key crypto and builds a risk register prioritised by data sensitivity lifetime." },
      { question: "Lattice-based cryptography's security commonly rests on which hard problem?", options: ["Syndrome decoding", "Learning With Errors (LWE)", "Hash collisions", "Classical integer factorization"], correctIndex: 1, explanation: "Lattice schemes rely on the Learning With Errors problem (and its Module variant), for which no sub-exponential quantum algorithm is known." },
      { question: "Approximately how much larger are ML-DSA signatures compared with a 64-byte ECDSA signature?", options: ["About 2×", "About 5×", "About 38–72×", "They are smaller"], correctIndex: 2, explanation: "ML-DSA signatures range from 2,420 to 4,627 bytes — roughly 38× to 72× the size of a 64-byte ECDSA signature." },
      { question: "What is the core principle of Zero Trust Architecture?", options: ["Trust but verify", "Trust all internal users", "Defend only the outer perimeter", "Never trust, always verify"], correctIndex: 3, explanation: "Zero Trust eliminates implicit trust: every user, device and request is authenticated and continuously verified regardless of location." },
      { question: "Who coined the term 'Zero Trust' in 2010?", options: ["John Kindervag at Forrester", "Michele Mosca at the University", "Peter Shor", "Stephen Marsh"], correctIndex: 0, explanation: "John Kindervag coined 'Zero Trust' at Forrester Research in 2010, arguing that trust itself is a vulnerability." },
      { question: "Which Google initiative is the well-known enterprise blueprint for Zero Trust?", options: ["Project Zero", "BeyondCorp", "Operation Aurora", "Titan"], correctIndex: 1, explanation: "Google built and later published BeyondCorp after the Operation Aurora attacks, becoming the model for enterprise Zero Trust." },
      { question: "Which document is the first comprehensive government-endorsed Zero Trust framework?", options: ["NIST SP 800-53 rev 5", "FIPS 203", "NIST SP 800-207", "ISO 27001"], correctIndex: 2, explanation: "NIST SP 800-207 (2020) defines the Policy Decision Point / Policy Enforcement Point model for Zero Trust." },
      { question: "In Zero Trust, what does the 'assume breach' principle mean?", options: ["Ignore attackers", "Trust the perimeter firewall", "Disable security logging to save resources", "Design as if attackers are already inside — encrypt, segment, monitor"], correctIndex: 3, explanation: "Assume breach means building defences on the premise that adversaries already have a foothold, so everything is segmented and monitored." },
      { question: "Micro-segmentation in Zero Trust primarily limits:", options: ["Lateral movement by attackers", "Encryption overhead", "Repeated user authentication prompts", "Log volume"], correctIndex: 0, explanation: "Dividing the network into isolated segments contains an intruder and blocks the lateral movement that perimeter models allow." },
      { question: "ZTNA (Zero Trust Network Access) is designed to replace which legacy technology?", options: ["Firewalls", "VPNs", "Antivirus", "DNS"], correctIndex: 1, explanation: "ZTNA grants access to specific resources rather than the whole network, replacing the broad access a VPN provides." },
      { question: "Which legacy model does Zero Trust replace?", options: ["The traditional zero-trust security model", "Defense in depth", "The 'castle-and-moat' perimeter model", "Least privilege"], correctIndex: 2, explanation: "Zero Trust replaces the castle-and-moat perimeter model, which trusts everything inside the network by default." },
      { question: "What is the goal of least-privilege access?", options: ["Grant every user the broadest possible level of access", "Eliminate authentication", "Speed up logins", "Shrink the blast radius of any single compromise"], correctIndex: 3, explanation: "Scoped, time-limited, contextual access ensures a compromised account or device exposes as little as possible." },
      { question: "Why did signature-based detection drive the move to AI/ML in threat detection?", options: ["It only catches previously known attacks, missing zero-day and polymorphic malware", "It caught too many threats", "It was too slow to install", "It relied on too little training data to work in production"], correctIndex: 0, explanation: "Signature matching only flags known patterns, so zero-day, polymorphic and behaviour-based attacks slip through." },
      { question: "Which machine-learning approach is trained on labelled normal/malicious data for tasks like spam and malware classification?", options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning only", "No learning"], correctIndex: 1, explanation: "Supervised learning trains on labelled examples; algorithms include Decision Trees, Random Forest, SVM and Naive Bayes." },
      { question: "Unsupervised learning is most useful in security for:", options: ["Matching against a database of previously known attack signatures", "Encrypting traffic", "Anomaly detection and behaviour analytics on unlabelled data", "Patching systems"], correctIndex: 2, explanation: "Unsupervised methods (K-Means, PCA, autoencoders) find hidden patterns and anomalies without labels." },
      { question: "What does UEBA stand for in behavioural monitoring?", options: ["Unified Endpoint Backup Agent", "Universal Encryption Bridging Architecture", "User Event Bus Aggregator", "User & Entity Behaviour Analytics"], correctIndex: 3, explanation: "UEBA (User & Entity Behaviour Analytics) baselines normal behaviour and flags deviations as potential threats." },
      { question: "What is the recommended posture for using AI in cybersecurity?", options: ["Human–AI collaboration with continuous human oversight", "Full end-to-end automation that completely replaces all human analysts", "Avoid AI entirely", "Rely only on signatures"], correctIndex: 0, explanation: "AI augments analysts but cannot replace human expertise; responsible use needs oversight, governance and explainability." },
      { question: "A key limitation of AI-based threat detection is:", options: ["It never makes mistakes", "False positives and susceptibility to adversarial attacks", "It needs no training data", "It fully replaces the need for human security analysts"], correctIndex: 1, explanation: "Poor training data causes false positives/negatives, and crafted adversarial inputs can mislead models — an ongoing arms race." },
      { question: "What core weakness of point-in-time authentication does behavioral biometrics address?", options: ["The widespread use of weak and easily guessable passwords", "Slow login speed", "The point-of-entry blind spot — no re-verification after login", "Lack of encryption"], correctIndex: 2, explanation: "Once login succeeds, legacy systems stop verifying the operator, so a session takeover minutes later goes unnoticed; continuous biometrics removes this blind spot." },
      { question: "Behavioral biometrics validates identity based on:", options: ["What you know (such as passwords or PINs)", "What you possess (tokens)", "Your iris pattern only", "How you act dynamically (typing, mouse, touch)"], correctIndex: 3, explanation: "It is a behavioral, not a knowledge, possession or static-physical factor — it measures the dynamic patterns of how a person interacts." },
      { question: "Which attack floods a user with repeated push prompts until they approve one?", options: ["MFA fatigue (prompt bombing)", "AitM proxy phishing", "Token theft", "Automated credential stuffing"], correctIndex: 0, explanation: "MFA fatigue spams push notifications until a frustrated or confused user taps approve, handing the attacker access." },
      { question: "How do Adversary-in-the-Middle toolkits like Evilginx defeat static MFA?", options: ["By guessing thousands of common passwords until one works", "By intercepting and replaying the live session cookie/token in real time", "By brute force", "By denial of service"], correctIndex: 1, explanation: "AitM proxies capture the live MFA token or session cookie and inject it into the attacker's browser, bypassing MFA entirely." },
      { question: "In keystroke dynamics, what is 'dwell time'?", options: ["The timing interval between two consecutive keys", "The number of typos", "The time a single key is held down (press to release)", "Finger pressure"], correctIndex: 2, explanation: "Dwell (hold) time is key-release minus key-press time for one key, reflecting finger velocity and muscle memory." },
      { question: "'Flight time' in keystroke dynamics measures:", options: ["How long a single key is held down", "Typing error rate", "Touch pressure", "The interval between consecutive keystrokes"], correctIndex: 3, explanation: "Flight time is the key-to-key interarrival interval — the gap between releasing one key and pressing the next." },
      { question: "How do behavioral systems distinguish humans from bots in cursor movement?", options: ["Human paths show natural curvature/tortuosity while bots use mathematically perfect vectors", "Bots jitter more than humans", "Real humans always move the mouse cursor in perfectly straight lines", "They cannot tell them apart"], correctIndex: 0, explanation: "Human muscle movement has physiological noise and corrective micro-adjustments; bots tend to move in perfect vectors or uniform curves." },
      { question: "How many distinct behavioral data dimensions does a comprehensive profile aggregate?", options: ["Three", "Six", "Four", "Ten"], correctIndex: 1, explanation: "The profile combines six dimensions: keystroke dynamics, mouse patterns, touch gestures, device handling, application navigation, and location/context." },
      { question: "Which metric compares live behavior vectors against the stored baseline?", options: ["The Hamming distance", "Jaccard index", "Cosine similarity", "MD5 checksum"], correctIndex: 2, explanation: "Cosine similarity measures the cosine of the angle between the live vector and the historical baseline vector to assess match accuracy." },
      { question: "Instead of a binary match/mismatch, the analysis engine outputs:", options: ["A password", "A simple yes/no", "A fixed symmetric encryption key", "A continuous anomaly score between 0.0 and 1.0"], correctIndex: 3, explanation: "It produces a probabilistic anomaly score representing how far current behavior deviates from the baseline." },
      { question: "In the response pipeline, an anomaly score of ≥ 0.7 triggers which path?", options: ["Block — terminate the session", "Allow (silent pass)", "Challenge with step-up authentication", "Ignore"], correctIndex: 0, explanation: "A sharp spike (≥0.7) suggests hijacking or bot takeover, so the engine terminates tokens, isolates the device and alerts the SOC." },
      { question: "A mid-range anomaly score (0.3–0.7) typically triggers:", options: ["Silent pass", "A step-up authentication challenge", "An immediate and permanent account lockout", "Account deletion"], correctIndex: 1, explanation: "Moderate drift prompts a low-friction step-up (push or face scan); if verified, the baseline is safely updated." },
      { question: "Why is the 'desk-walk takeover' mitigated by behavioral biometrics?", options: ["It simply enforces the use of a much longer and more complex password at the initial login screen only", "It disables the mouse", "It detects the new operator's abnormal typing/cursor profile within seconds and locks the terminal", "It only checks at login"], correctIndex: 2, explanation: "Continuous monitoring spots the distinct cadence of an unauthorised operator at an unlocked desk and locks the workstation in seconds." },
      { question: "How do behavioral systems support GDPR/CCPA compliance through data minimization?", options: ["By storing raw keystrokes", "By openly sharing all of the collected raw data with various third parties", "By encrypting only passwords", "By recording abstract timing deltas and discarding raw key values"], correctIndex: 3, explanation: "Systems capture timing patterns (e.g. dwell = 42ms) rather than literal characters, avoiding accidental harvesting of passwords or messages." },
      { question: "Which technique maximises resilience by combining several behavioral channels so a drift in one is offset by others?", options: ["Multi-modal biometric fusion", "Basic single-factor matching only", "Password rotation", "Disabling sensors"], correctIndex: 0, explanation: "Multi-modal fusion samples keystroke, mouse, device and context streams together, so a temporary change in one channel does not break authentication." },
      { question: "What is a Privacy Enhancing Technology (PET)?", options: ["A firewall configuration standard", "Technical tools/methodologies that protect personal information while still enabling useful data processing", "A type of malware scanner", "A password complexity policy"], correctIndex: 1, explanation: "PETs minimize data collection, limit exposure, and give users control over their identity, while still allowing useful data processing and communication." },
      { question: "What is the key difference between security and privacy as properties of a system?", options: ["They are the same thing", "Security is a property of data processing; privacy is a property of the system", "Security is a property of the system; privacy is a property of data processing", "Privacy only applies to encrypted systems"], correctIndex: 2, explanation: "Security describes how well a system defends against unauthorised access; privacy describes whether data processing respects the reasonable expectations of the individuals involved." },
      { question: "Which of the following is one of PET's three foundational principles?", options: ["Maximum data collection", "Data Minimization", "Perimeter-only defence", "Centralised identity control"], correctIndex: 1, explanation: "Data Minimization — collecting only what is strictly necessary — is one of PET's three foundational principles, alongside User Control and Privacy by Design." },
      { question: "Into which three categories does this seminar classify PETs?", options: ["Hard, Soft, and Network PETs", "Public, Private, and Hybrid PETs", "Free, Paid, and Enterprise PETs", "Legal, Technical, and Physical PETs"], correctIndex: 0, explanation: "Hard PETs (cryptographic), Soft PETs (policy-technical hybrids), and Network PETs (communication anonymity tools) form the three-category taxonomy used." },
      { question: "Who introduced Differential Privacy, and in what year?", options: ["Cynthia Dwork, 2006", "Ann Cavoukian, 1995", "Shafi Goldwasser, 1985", "Andrew Yao, 1982"], correctIndex: 0, explanation: "Cynthia Dwork introduced Differential Privacy in 2006, a mathematical framework adding calibrated noise to protect individual records in a dataset." },
      { question: "In Differential Privacy, what does a smaller epsilon (ε) value mean?", options: ["Weaker privacy but higher utility", "Stronger privacy but reduced data utility", "No effect on privacy or utility", "Faster query processing only"], correctIndex: 1, explanation: "A smaller epsilon tightens the bound Pr[M(D) ∈ S] ≤ e^ε × Pr[M(D') ∈ S], giving stronger privacy at the cost of noisier, less useful results." },
      { question: "Which type of Differential Privacy adds noise on-device before data ever leaves the user, as used by Apple since 2016?", options: ["Global DP", "Shuffle DP", "Local DP", "Aggregate DP"], correctIndex: 2, explanation: "Local DP applies noise on-device before transmission, eliminating the need to trust a central aggregator — Apple's approach since 2016." },
      { question: "What does Homomorphic Encryption uniquely allow?", options: ["Faster key exchange over TLS", "Computation directly on encrypted data without decrypting it first", "Permanent deletion of encryption keys", "Passwordless login via biometrics"], correctIndex: 1, explanation: "Homomorphic Encryption allows operations on ciphertext whose decrypted result matches the same operations performed on plaintext." },
      { question: "Which type of Homomorphic Encryption supports arbitrary computation but carries the heaviest performance overhead (100x–10,000x)?", options: ["PHE (Partially HE)", "SHE (Somewhat HE)", "FHE (Fully HE)", "Standard AES encryption"], correctIndex: 2, explanation: "FHE supports any arbitrary computation, unlike PHE (one operation type) or SHE (limited mixed operations), at the cost of very heavy overhead." },
      { question: "A Zero-Knowledge Proof allows a prover to convince a verifier of a statement's truth by:", options: ["Revealing the full underlying data", "Sharing an encryption key", "Revealing nothing beyond the fact that the statement is true", "Requiring a trusted third-party escrow"], correctIndex: 2, explanation: "ZKPs (Goldwasser, Micali & Rackoff, 1985) prove a statement — e.g. being over 18 — without revealing any information beyond its truth." },
      { question: "In Federated Learning, what is sent back to the central server after local training?", options: ["The user's raw personal data", "Only model updates (gradients), not raw data", "A copy of the entire local dataset", "The device's IP address and location"], correctIndex: 1, explanation: "Devices train on local data and share only gradients/model updates, which the server aggregates into an improved global model." },
      { question: "Secure Multi-Party Computation (SMPC) is rooted in which classic problem?", options: ["Yao's Millionaires' Problem (1982)", "The Byzantine Generals Problem", "The Halting Problem", "Shor's factoring problem"], correctIndex: 0, explanation: "SMPC traces to Andrew Yao's 1982 Millionaires' Problem: two billionaires determine who is richer without revealing their actual net worth." },
      { question: "Which Soft PET replaces direct identifiers with a reversible substitute, using a separately held key to re-link records if needed?", options: ["Anonymization", "Pseudonymization", "Data masking", "Federated Learning"], correctIndex: 1, explanation: "Pseudonymization replaces identifiers with pseudonyms while preserving re-linkage via a separately held key, per GDPR Article 4(5)." },
      { question: "How does Tor (Onion Routing) protect user anonymity?", options: ["By encrypting only the final destination server", "Each relay node knows only the previous and next hop, never both source and destination", "By routing all traffic through a single trusted VPN server", "By deleting browser cookies automatically"], correctIndex: 1, explanation: "Tor routes traffic through multiple encrypted relays where no single node can see both who is asking and what they are asking for." },
      { question: "Under GDPR, which article mandates Privacy by Design and by Default?", options: ["Article 5", "Article 17", "Article 20", "Article 25"], correctIndex: 3, explanation: "GDPR Article 25 mandates Privacy by Design and by Default, explicitly requiring pseudonymization and other technical measures." },
      { question: "What is the key regulatory gap in Nigeria's NDPA 2023 compared to GDPR Article 25?", options: ["NDPA has no privacy law at all", "NDPA does not prescribe specific PET methods, unlike GDPR's explicit technical mandates", "NDPA bans all forms of encryption", "NDPA only applies to government agencies"], correctIndex: 1, explanation: "NDPA 2023 requires 'appropriate technical measures' in principle but, unlike GDPR Article 25, does not prescribe particular PET methods." },
      { question: "In Apple's Local Differential Privacy pipeline, at which stage is noise added?", options: ["After aggregation on Apple's servers", "On-device, before any data leaves the device", "During data transmission over the network", "Only when a user opts in via settings"], correctIndex: 1, explanation: "Stage 2 of Apple's five-stage pipeline adds DP noise on-device, before the noisy (not raw) data is ever transmitted to Apple's servers." },
      { question: "What did Google/UC Berkeley researchers find in their critical analysis of Apple's Differential Privacy deployment?", options: ["Apple's epsilon values may be higher (weaker) than formally claimed", "Apple's implementation had no privacy protection at all", "Apple's DP noise made the data completely useless", "Apple never actually deployed Local DP"], correctIndex: 0, explanation: "Researchers suggested Apple's real-world epsilon values may provide weaker guarantees than claimed, and that repeated reporting over time erodes the effective privacy guarantee." },
      { question: "What did the 2007/2008 Netflix Prize dataset incident demonstrate about anonymisation?", options: ["Anonymised data can be partially de-anonymised by correlating it with public information", "Anonymisation is mathematically impossible to break", "Netflix never anonymised its data", "Homomorphic Encryption fully prevents re-identification"], correctIndex: 0, explanation: "Researchers Narayanan and Shmatikov showed 'anonymised' Netflix data could be partially de-anonymised via auxiliary public information, exposing naive anonymisation's limits." },
      { question: "Why is Tor described as a 'dual-use technology' in the ethical challenges of PET?", options: ["It only works on mobile devices", "It serves both legitimate privacy uses (journalism, activism) and illegal marketplaces", "It requires two separate licenses to operate", "It doubles internet bandwidth usage"], correctIndex: 1, explanation: "Strong anonymisation tools like Tor inevitably serve both beneficial purposes (journalism, activism, abuse-victim support) and harmful ones (illegal marketplaces)." },
      { question: "Which recommendation is proposed for Nigerian fintechs to advance PET adoption?", options: ["Avoid all forms of encryption to reduce cost", "Adopt Federated Learning for cross-institutional fraud detection via sandbox bank collaborations", "Wait for GDPR to become law in Nigeria before acting", "Outsource all customer data storage to unregulated third parties"], correctIndex: 1, explanation: "The seminar recommends Nigerian fintechs begin sandbox collaborations between a few partner banks to adopt Federated Learning for joint fraud detection." },
      { question: "What is a blockchain, at its core?", options: ["A single centralized database managed by one bank", "A distributed, shared, continuously synchronised ledger recorded across many computers", "A type of firewall for cryptocurrency exchanges", "A password manager for digital wallets"], correctIndex: 1, explanation: "A blockchain records transactions across many computers such that no record can be altered retroactively without altering every subsequent record and network agreement." },
      { question: "Which 2008 whitepaper combined peer-to-peer networking, cryptographic hashing and proof-of-work to solve the double-spending problem?", options: ["Ethereum Yellow Paper", "\"Bitcoin: A Peer-to-Peer Electronic Cash System\" by Satoshi Nakamoto", "Bit Gold by Nick Szabo", "The Byzantine Generals Problem paper"], correctIndex: 1, explanation: "Satoshi Nakamoto's 2008 whitepaper combined these ideas into a coherent system, and the Bitcoin network went live in January 2009 with the Genesis Block." },
      { question: "What innovation did Ethereum introduce that transformed blockchain into a programmable platform?", options: ["Proof of Work mining", "Smart contracts", "The Merkle root", "51% attack resistance"], correctIndex: 1, explanation: "Vitalik Buterin's Ethereum (2013–2015) introduced smart contracts — self-executing code on the blockchain — enabling decentralised applications." },
      { question: "What physically 'chains' blocks together in a blockchain?", options: ["The nonce alone", "A shared username across all nodes", "The previous block's cryptographic hash, stored in the next block", "A centralized timestamp server"], correctIndex: 2, explanation: "Each block stores the hash of the prior block; changing any block changes its hash and breaks the link to every subsequent block." },
      { question: "Which property of cryptographic hash functions means changing a single character of input produces a completely different hash?", options: ["Determinism", "Avalanche effect", "One-way function", "Nonce adjustment"], correctIndex: 1, explanation: "The avalanche effect ensures even tiny input changes cascade into a completely different output hash, making tampering immediately detectable." },
      { question: "In Proof of Work (PoW), what must an attacker control to successfully rewrite transaction history?", options: ["More than 51% of the network's computing power", "A single node's password", "The Merkle root of one block", "The DNS server for the network"], correctIndex: 0, explanation: "A '51% attack' requires an attacker to control the majority of the network's mining power, making it extremely costly on large networks like Bitcoin." },
      { question: "How does Proof of Stake (PoS) differ from Proof of Work (PoW)?", options: ["PoS requires more electricity than PoW", "PoS has validators stake cryptocurrency as collateral instead of competing with computing power", "PoS eliminates the need for any consensus mechanism", "PoS is only used by private blockchains"], correctIndex: 1, explanation: "PoS validators lock up cryptocurrency as collateral and lose it if they act maliciously, making it far more energy-efficient than PoW mining." },
      { question: "Which type of blockchain is open to anyone to join, read from, and submit transactions to, without permission?", options: ["Private blockchain", "Consortium blockchain", "Public blockchain", "Hybrid blockchain"], correctIndex: 2, explanation: "Public blockchains like Bitcoin and Ethereum offer maximum decentralisation and transparency but are slower and more resource-intensive." },
      { question: "Which blockchain type is controlled by a pre-selected group of organisations, common in banking alliances?", options: ["Public blockchain", "Consortium (federated) blockchain", "Private blockchain", "None of the above"], correctIndex: 1, explanation: "Consortium blockchains balance decentralisation with the efficiency and governance control needed for inter-company collaboration." },
      { question: "How can blockchain strengthen IoT device security?", options: ["By replacing all IoT hardware with new devices", "By authenticating devices and verifying firmware integrity without a single centralised server as a point of failure", "By disabling encryption on IoT networks", "By requiring all IoT devices to mine cryptocurrency"], correctIndex: 1, explanation: "Blockchain can authenticate the many devices in an IoT network without relying on one centralised server whose compromise would put every device at risk." },
      { question: "According to the report, where do attackers increasingly focus their efforts in the blockchain ecosystem?", options: ["The core cryptographic protocol itself", "The human and infrastructural layers — wallets, bridges, and exchanges", "Government regulatory bodies", "Academic research papers"], correctIndex: 1, explanation: "Attackers increasingly target wallets, bridges and exchanges rather than the underlying protocol, since these layers are often the weaker link." },
      { question: "Why are cross-chain bridges a frequent attack target?", options: ["They contain no valuable assets", "They hold large amounts of locked value while often relying on more centralised or experimental security models", "They are immune to smart contract bugs", "They only connect private blockchains"], correctIndex: 1, explanation: "Bridges connecting different blockchains hold significant locked value but often use less mature security models than the chains they connect." },
      { question: "What long-term cryptographic threat does the report identify for blockchain's elliptic curve cryptography (ECDSA)?", options: ["Classical brute-force attacks", "Shor's algorithm on future quantum computers", "SQL injection", "DDoS flooding of mining pools"], correctIndex: 1, explanation: "Future quantum computers running Shor's algorithm may break the elliptic curve cryptography protecting digital signatures and wallets, motivating a shift to post-quantum cryptography." },
      { question: "What design principle is the XRP Ledger following in its post-quantum migration roadmap?", options: ["Committing permanently to a single quantum-resistant algorithm", "\"Cryptographic agility\" — the ability to adopt new NIST-standardised algorithms as the landscape matures", "Ignoring quantum computing until it becomes an active threat", "Abandoning blockchain entirely in favour of centralized databases"], correctIndex: 1, explanation: "The XRP Ledger is designing for cryptographic agility so the network can adopt new NIST-standardised PQC algorithms without committing to just one scheme." },
    ],
  },
  {
    code: 'UUY-CYB 221',
    slug: 'uuy-cyb-221',
    title: 'Network Defense Fundamentals',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Practical network security: identification/authentication/authorization, threat classification, firewalls, administrative/physical/technical controls, virtualization and cloud, wireless/mobile/IoT security, and cryptography/PKI. Builds directly on the networking foundation from UUY-CYB 121.',
    topics: [
      'Network security fundamentals; identification, authentication and authorization',
      'Classification of threats: malware, intrusions, denial of service',
      'Fundamentals of firewalls and implementation approaches',
      'Network security controls: administrative, physical, and technical',
      'Virtualization and cloud computing security',
      'Wireless network security, mobile device security, and IoT device security',
      'Data security: cryptography and public key infrastructure (PKI)',
      'Network traffic monitoring; basic network utilities (ipconfig, ping, tracert, netstat)',
    ],
    textbooks: [
      { title: 'Network Security Essentials', authors: 'William Stallings', note: '6th ed. — thorough and widely adopted' },
      { title: 'CompTIA CySA+ Study Guide', authors: 'Mike Chapple & David Seidl', note: '3rd ed. — aligns with analyst-level network defence skills' },
    ],
    searchTerms: [
      'Wireshark tutorial network analysis for beginners',
      'Firewalls IDS IPS explained difference',
      'VPN how it works IPSec SSL explained',
      'SIEM basics security monitoring tutorial',
    ],
    studyTips: [
      'Install Wireshark (free) and capture your own network traffic — hands-on analysis builds intuition fast',
      'Use Cisco Packet Tracer (free) to build and defend virtual networks before exams',
      'Know the difference between IDS (detect only) and IPS (detect + block) — exam-critical',
      'Relate every defence mechanism to a specific attack from UUY-CYB 212 — show the attack/defence pairing',
    ],
    // Transcribed from the departmental Laboratory Manual — see
    // src/data/lectureNotes/cyb221.js for provenance and the coverage mapping.
    lectureNotes: cyb221LectureNotes,
  },
  {
    code: 'UUY-CYB 222',
    slug: 'uuy-cyb-222',
    title: 'Web and Mobile Applications Security',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Attacking and defending web and mobile applications. Covers the OWASP Top 10 in depth, secure coding practices for Java/Python/Kotlin/Swift, audit and QA testing, and mobile-specific threats on iOS and Android platforms.',
    // The lecturer's official course content outline, in its given order.
    // Lecture-note topics declare which of these numbers they cover via
    // `covers` / `partial`, so CourseDetail can flag the gaps.
    topics: [
      'The impact of the internet and web applications on the business world',
      'Principles and strategies for the design and implementation of secure applications — writing software that makes it difficult for intruders to exploit security loopholes in applications/code',
      'Secure program development for mobile (Android, iOS) and web',
      'Delineation of web-based risks, common website attacks, weaknesses, and security best practices',
      'Value and importance of vulnerability and security assessment for web and mobile applications',
      'Attributes and qualities of secure coding practices',
      'Role and importance of audit compliance and quality assurance testing for web/mobile applications',
      'Next-generation challenges in securing web/mobile applications and data',
      'Lifecycle approach to web/mobile application security',
    ],
    textbooks: [
      { title: 'The Web Application Hacker\'s Handbook', authors: 'Stuttard & Pinto', note: '2nd ed. — the definitive reference; highly detailed' },
      { title: 'Real-World Bug Hunting', authors: 'Peter Yaworski', note: 'Practical case studies of real vulnerabilities; very engaging' },
    ],
    searchTerms: [
      'OWASP Top 10 2023 explained with examples',
      'SQL injection tutorial hands-on DVWA',
      'XSS cross-site scripting attack tutorial',
      'PortSwigger Web Security Academy free labs',
    ],
    studyTips: [
      'PortSwigger Web Security Academy is free and has labs for every OWASP Top 10 vulnerability — essential',
      'DVWA (Damn Vulnerable Web Application) is a free practice target you can run locally',
      'For every vulnerability, know: how it works, how to exploit it, and how to fix it',
      'Bug bounty write-ups on HackerOne and Bugcrowd are the best real-world case studies',
    ],
    // Topics 1–7 are the class lecture notes. Topics 8–9, and the additions
    // marked as exam wording throughout, come from the lecturer's handout
    // "Cybersecurity Concepts: Web and Mobile Application Security" plus the
    // exam guidance he gave in class (the six flagged questions in Topic 9).
    lectureNotes: [
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
              'Read the Security row alongside the “Web Risk vs Mobile App Risk” table in Topic 4 — it is the same distinction the lecturer expects in the exam: web risk is centralised on the server, mobile risk is decentralised onto individual devices.',
              'A mobile app is not automatically “more secure”. Storing data on the device removes the single-server blast radius, but it hands the data to a device an attacker may physically hold — which is why Topic 4 lists insecure data storage and reverse engineering as the top mobile risks.',
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
              'Mixed case (“camel casing”) — at least one uppercase letter combined with lowercase letters',
              'At least one special character or symbol — e.g. @, #, comma, full stop, hyphen, underscore, forward slash, or backslash',
            ],
          },
          {
            type: 'note',
            text: 'Beyond the lecture: current guidelines such as NIST SP 800-63B now favour length and passphrase uniqueness over forced complexity, and recommend checking new passwords against known breached-password lists. The point worth holding on to is that complexity rules alone do not guarantee a password has not been reused somewhere else that has already been breached.',
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
            text: '3FA differs from 2FA in requiring authorization from two or more distinct devices, rather than allowing a single device to both request and approve access. A request initiated on a phone may need to be approved from a separate computer, or a transaction started on one workstation may need sign-off from another. This is typical of banking-sector workflows, where a transaction is initiated by one staff member, reviewed by a second, and authorized by a branch manager before it completes — sometimes with a deliberate delay built in while approvals are finalized.',
          },
          {
            type: 'definition',
            heading: 'Multi-Party Authentication',
            text: 'In multi-party authentication, the individual originating a request must wait for a second individual with higher-level credentials to approve it before access is granted. A familiar consumer example is location- or device-based step-up verification: if a user’s VPN shows them logging in from one country and, within an implausibly short time, a new login attempt appears from a different country, providers such as Google or Apple may require verification from another trusted device or person before granting access — precisely because the same credentials used from two “impossible” locations in a short window is a strong signal of compromise.',
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
              ['3FA', 'Single-device compromise', 'Multi-officer transaction approval'],
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
            type: 'definition',
            heading: 'Web App Risks / Threats',
            text: 'Web app threats refer to vulnerabilities and attacks that exploit weaknesses in web-based systems. These threats lead to unauthorized access, data breaches, and service disruption — driven especially by the growth of online banking and e-commerce transactions. This historical progression has driven an ever-increasing sophistication among cybercriminals, alongside a continuous need for advancement in IT security measures.',
          },
          {
            type: 'bullets',
            heading: 'Common Threats to Web Apps',
            items: [
              'Injection vulnerabilities — e.g. SQL injection, Cross-Site Scripting (XSS)',
              'Remote remediation — e.g. email phishing, privacy risk (cookies), financial risk (DoS — Denial of Service), operational/network risk (subject to user mistakes)',
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
        number: '5',
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
        number: '6',
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
              'Each best practice pairs with a risk from Topic 4: input validation answers injection and XSS, up-to-date encryption answers interception, stronger authentication answers brute force, API tracking and change records answer misconfiguration. If a question asks you to justify a practice, name the risk it closes.',
            ],
          },
        ],
      },
      {
        number: '7',
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
        number: '8',
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
              'The value of vulnerability and security assessment is that it converts an unknown risk into a known, prioritised defect that can be scheduled, fixed and verified — which is precisely what the audit and QA discipline in Topic 7 then has to evidence.',
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
            text: 'Ideally an organisation employs both methods, not one. The individual tools are defined in Topic 6 — this topic is about where each of them sits in the lifecycle: SAST and SCA during development, IAST and DAST during testing and staging, WAF and RASP in production.',
          },
        ],
      },
      {
        number: '9',
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
              { term: 'Write short notes on quality assurance / list the evaluation metrics', def: 'QA ensures software products meet the desired standard. The metrics are Functionality, Performance, Reliability, Usability, Compatibility and Security. (Topic 7)' },
              { term: 'Define web-based risk', def: 'Any threat, vulnerability, or exposure associated with using the internet that can result in data breaches, financial losses, and service disruption. (Topic 4)' },
              { term: 'Differentiate web application risk from mobile application risk', def: 'Web: centralized risk, client–server attacks landing on the server, a breach affecting the entire database, and an internet connection required. Mobile: decentralized risk, attacks on the individual device, data leakage usually following physical loss of the device, and the ability to work offline. (Topic 4)' },
              { term: 'Explain the security/tracking models — authentication vs authorization', def: 'Authentication is the process of verifying the identity of a user, device, or service before granting access to protected digital resources. Authorization is the process of giving a verified user permission to access a physical location or digital information — a bank teller has a transaction limit, while the branch manager holds higher clearance. (Topic 3)' },
              { term: 'Distinguish symmetrical from asymmetrical encryption', def: 'Encryption converts information into ciphertext, which is unreadable to unauthorized users. Symmetrical encryption uses a single key to both lock and unlock; asymmetrical encryption uses two keys — a public key and a private key. (Topic 3)' },
              { term: 'Define a website attack and give five examples', def: 'Any malicious action aimed at compromising a site’s availability, integrity, or confidentiality by exploiting web code or server–user interactions. Five examples: SQL injection (SQLi), cross-site scripting (XSS), malware/backdoor attacks, brute-force login attacks, and phishing. (Topic 5)' },
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
              'These six are the flagged questions, not the whole syllabus. Topics 1–8 remain examinable, and the outline items on secure mobile/web development and next-generation challenges are not yet covered by any topic here.',
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: 'What is a web application?',
        options: ['Software installed directly on a device that runs without any server', 'Software controlled by a centralized server and accessed through a browser with an internet connection', 'A collection of static hyperlinks and text with no underlying program code', 'A hardware firewall that filters web traffic'],
        correctIndex: 1,
        explanation: 'A web application is software controlled by a centralized server and accessed through browsers over an internet connection.',
      },
      {
        question: 'Which of these is a server-side technology used by web apps?',
        options: ['HTML', 'CSS', 'PHP', 'A browser cookie'],
        correctIndex: 2,
        explanation: 'PHP (like ASP.NET) is a server-side language that runs on the web server — for example talking to a database or processing a login.',
      },
      {
        question: 'What do HTML and CSS control in a web application?',
        options: ['Database storage and retrieval on the server', 'The end-to-end encryption of network traffic in transit', 'Server-side authentication logic', 'What the page looks like in the user\'s browser (client side)'],
        correctIndex: 3,
        explanation: 'HTML and CSS are client-side — they run in the browser and control what the page looks like.',
      },
      {
        question: 'Which protocol is commonly used by web applications?',
        options: ['HTTP', 'SMTP', 'FTP', 'SSH'],
        correctIndex: 0,
        explanation: 'Web apps support protocols such as HTTP (Hypertext Transfer Protocol).',
      },
      {
        question: 'What best describes a mobile application?',
        options: ['Software that only runs inside a web browser', 'Software installed directly on a user\'s device (iOS or Android)', 'A server-side script written in the ASP.NET web application framework', 'A type of web cookie'],
        correctIndex: 1,
        explanation: 'A mobile application is software installed directly on a user\'s device, designed to run on a mobile device or tablet.',
      },
      {
        question: 'Why is web risk described as "centralized"?',
        options: ['Because every user must install the same app', 'Because individual mobile devices store all of the data', 'Because compromising the central server can potentially affect every user', 'Because the risk only affects one user at a time'],
        correctIndex: 2,
        explanation: 'Web apps depend on a central server, so anyone who compromises that server can potentially affect every single user.',
      },
      {
        question: 'A key practical difference of mobile apps compared to web apps is that mobile apps typically:',
        options: ['Never need an internet connection', 'Run entirely on the web server', 'Cannot store any data locally on the device', 'Require a separate version built for each platform (iOS, Android)'],
        correctIndex: 3,
        explanation: 'Mobile apps typically require a version built for each platform and run on the device itself.',
      },
      {
        question: 'Mobile app risk primarily refers to attacks associated with:',
        options: ['The device and OS features when apps connect to the internet', 'The centralized web server only', 'Printed documentation', 'The internal HTML and CSS rendering engine inside a web browser'],
        correctIndex: 0,
        explanation: 'Mobile app risk refers to attacks associated with the device and OS features — flaws that occur when mobile apps connect to the internet for data exchange.',
      },
      {
        question: 'What is "insecure data storage" on a mobile device?',
        options: ['Using HTTPS to send data', 'Storing sensitive data in plain, unencrypted form on the device', 'Encrypting all authentication tokens before saving them', 'Refusing to store any data at all'],
        correctIndex: 1,
        explanation: 'Insecure data storage means sensitive data (passwords, tokens, personal info) is saved on the device unencrypted, so anyone with device access can read it.',
      },
      {
        question: 'In a mobile context, what is "reverse engineering and code tampering"?',
        options: ['Encrypting the app\'s source code', 'Updating the app through the official store', 'Decompiling the app to study its code, find secrets, or modify it to bypass security checks', 'Flooding the central web server with junk network traffic'],
        correctIndex: 2,
        explanation: 'Attackers decompile the app to study its code, find hidden secrets like API keys, or modify it to bypass security checks.',
      },
      {
        question: 'Why does a jailbroken or rooted phone increase security risk?',
        options: ['It speeds up the processor', 'It automatically encrypts all application data on the device by default', 'It blocks all internet connections', 'It removes the manufacturer\'s built-in security restrictions, making it easier for malicious apps to access protected data'],
        correctIndex: 3,
        explanation: 'A jailbroken/rooted phone removes built-in security restrictions, making it far easier for malicious apps to access data they shouldn\'t.',
      },
      {
        question: 'What is "permission abuse" by a mobile app?',
        options: ['Requesting far more device permissions than the app actually needs', 'Refusing all permissions', 'Asking the user to log in twice', 'Silently encrypting the device camera feed in the background'],
        correctIndex: 0,
        explanation: 'Permission abuse is when apps request more permissions (camera, contacts, location) than needed, increasing damage if the app is compromised.',
      },
      {
        question: 'Web application threats are vulnerabilities and attacks that exploit weaknesses in:',
        options: ['Only offline desktop software that never connects to the internet', 'Web-based systems, leading to unauthorized access, data breaches, and service disruption', 'Physical hardware locks', 'Printer drivers'],
        correctIndex: 1,
        explanation: 'Web app threats exploit weaknesses in web-based systems, leading to unauthorized access, data breaches, and service disruption.',
      },
      {
        question: 'Which pair are examples of injection vulnerabilities?',
        options: ['Device jailbreaking and rooting', 'WAF and RASP', 'SQL injection and Cross-Site Scripting (XSS)', 'SAST and DAST'],
        correctIndex: 2,
        explanation: 'Injection vulnerabilities include SQL injection and Cross-Site Scripting (XSS).',
      },
      {
        question: 'In the web-based risk categories, cookies are given as an example of which risk?',
        options: ['Financial risk', 'Denial of Service', 'Network risk', 'Privacy risk'],
        correctIndex: 3,
        explanation: 'Privacy risk is exemplified by cookies in the web-based risk categories.',
      },
      {
        question: 'According to the web-vs-mobile comparison, where does a web attack typically take place?',
        options: ['On the server, distributed across users', 'Directly on the victim\'s individual device', 'Only on paper records', 'Inside the phone\'s SIM card'],
        correctIndex: 0,
        explanation: 'For web risk the attack is on the server and distributed across users, whereas mobile attacks are on the client/device side.',
      },
      {
        question: 'In the comparison, a data breach in a web app most directly affects:',
        options: ['A single lost phone', 'The whole database/server', 'Only the attacker\'s device', 'Nothing — web apps store no data'],
        correctIndex: 1,
        explanation: 'A web data breach affects the whole database/server, while mobile data leakage is typically from a single lost or stolen device.',
      },
      {
        question: 'Which set of attacks is listed as common for WEB risk in the comparison?',
        options: ['Reverse engineering, code tampering, permission abuse', 'Jailbreaking and rooting', 'SQL injection, DDoS, CSRF', 'Insecure data storage and push spam'],
        correctIndex: 2,
        explanation: 'Common web attack types listed are SQL injection, DDoS, and CSRF.',
      },
      {
        question: 'Which set of attacks is listed as common for MOBILE app risk in the comparison?',
        options: ['SQL injection, DDoS, CSRF', 'Widespread website defacement and large-scale phishing campaigns', 'SAST and DAST', 'Reverse engineering, code tampering, permission abuse'],
        correctIndex: 3,
        explanation: 'Common mobile attack types listed are reverse engineering, code tampering, and permission abuse.',
      },
      {
        question: 'A website attack is any malicious action aimed at compromising a site\'s:',
        options: ['Availability, integrity, and confidentiality', 'The website color scheme and fonts', 'Domain name length', 'Marketing budget'],
        correctIndex: 0,
        explanation: 'A website attack aims to compromise a site\'s availability, integrity, and confidentiality.',
      },
      {
        question: 'How does SQL injection typically work?',
        options: ['By flooding the target web server with junk traffic from many devices', 'By injecting malicious code into input fields so the backend database reveals sensitive data', 'By replacing the homepage with a political message', 'By tricking a logged-in user into submitting a request'],
        correctIndex: 1,
        explanation: 'SQL injection injects malicious code into input fields (search bars, login forms), prompting the backend database to reveal sensitive data.',
      },
      {
        question: 'Cross-Site Scripting (XSS) involves:',
        options: ['Deliberately overloading a target web server with a huge volume of junk traffic', 'Decompiling a mobile app', 'Injecting harmful scripts into web pages that are then viewed by other users', 'Encrypting the database'],
        correctIndex: 2,
        explanation: 'XSS injects harmful scripts into web pages that are then viewed (and run) by other users.',
      },
      {
        question: 'What is the key difference between SQL injection and XSS?',
        options: ['SQL injection targets web browsers, whereas XSS targets the database', 'They are two names for the same attack', 'Neither involves injecting code', 'SQL injection targets the database (backend); XSS targets other users\' browsers (frontend)'],
        correctIndex: 3,
        explanation: 'SQL injection targets the database/backend; XSS targets other users\' browsers/frontend.',
      },
      {
        question: 'Which statement correctly describes "backend" vs "frontend"?',
        options: ['The backend is the server-side logic and database the user never sees directly; the frontend is what is rendered in the browser', 'The backend is what the user sees; the frontend is the database', 'Both run only on the user\'s phone', 'The frontend is the part that stores user passwords in unencrypted plain text'],
        correctIndex: 0,
        explanation: 'The backend is server-side logic and the database (unseen by users); the frontend is everything rendered in the browser.',
      },
      {
        question: 'A Distributed Denial of Service (DDoS) attack works by:',
        options: ['Stealing data quietly from a database', 'Using a network of compromised devices to flood a site with traffic until it is unavailable', 'Replacing the homepage with the attacker\'s message', 'Tricking a user into clicking a malicious phishing link'],
        correctIndex: 1,
        explanation: 'DDoS uses a network of compromised devices to flood a website with excessive traffic, overloading the server and making it unavailable.',
      },
      {
        question: 'Website "defacement" refers to:',
        options: ['Encrypting the entire website and demanding a ransom payment to decrypt it', 'Sending spam push notifications', 'Gaining unauthorized access to hosting files and replacing the homepage with the attacker\'s own message', 'Reverse engineering a mobile app'],
        correctIndex: 2,
        explanation: 'Defacement is gaining unauthorized access to hosting files and replacing the homepage, often with a political statement.',
      },
      {
        question: 'Phishing and spoofing are examples of which category of attack?',
        options: ['Injection attacks', 'Availability attacks', 'Permission abuse', 'Deception attacks'],
        correctIndex: 3,
        explanation: 'Phishing and spoofing are deception attacks — creating a fake site or message to trick users.',
      },
      {
        question: 'Cross-Site Request Forgery (CSRF) works by:',
        options: ['Tricking a victim into unknowingly submitting a malicious request using their logged-in identity', 'Flooding the target server with junk network traffic requests', 'Injecting SQL into a login form', 'Decompiling the application code'],
        correctIndex: 0,
        explanation: 'CSRF tricks a victim into unknowingly submitting a malicious request, exploiting their logged-in identity and privileges.',
      },
      {
        question: 'Which is listed as a strength of a website?',
        options: ['It works without any internet connection', 'It is universally accessible from any device with an internet connection and a browser', 'It requires installing a separate version per platform', 'It cannot be updated or changed once it has been deployed'],
        correctIndex: 1,
        explanation: 'A website is universally accessible from any device with an internet connection and a browser.',
      },
      {
        question: 'Why are updates and maintenance simpler for websites than for installed apps?',
        options: ['Because users must manually reinstall each time', 'Because websites never change', 'Because developers update directly on the server, making changes instant', 'Because every user has to compile the code themselves'],
        correctIndex: 2,
        explanation: 'Updates are simple and instant because developers update directly on the server.',
      },
      {
        question: 'What distinguishes a dynamic website from a static one?',
        options: ['A dynamic website always shows the same fixed content to every visitor', 'A static website requires a database for every page', 'A static website changes for each visitor', 'A dynamic website generates content based on user input, database queries, or other variables'],
        correctIndex: 3,
        explanation: 'A static site shows fixed content to all visitors; a dynamic site generates content based on input, database queries, or variables.',
      },
      {
        question: 'Which is a disadvantage of web apps mentioned in the notes?',
        options: ['They cannot be used without an internet connection', 'They are impossible to update or change', 'They never work in a browser', 'They require no testing'],
        correctIndex: 0,
        explanation: 'A key disadvantage is that web apps cannot be used without an internet connection, and performance depends on connection speed.',
      },
      {
        question: 'Which two solutions are recommended for addressing web app challenges?',
        options: ['Jailbreaking and rooting', 'Regular security audits and regular software updates', 'Disabling the network firewall and deleting all the logs', 'Storing passwords in plain text'],
        correctIndex: 1,
        explanation: 'The notes list regular security audits and regular software updates as solutions.',
      },
      {
        question: 'The two broad approaches to defending web & mobile apps are:',
        options: ['Jailbreaking and rooting', 'Phishing and spoofing', 'Testing methodologies that find vulnerabilities, and protective mechanisms that block attacks in real time', 'The differences between static and dynamic websites and how each is built'],
        correctIndex: 2,
        explanation: 'Defense splits into testing methodologies (find vulnerabilities) and protective mechanisms (block attacks in real time).',
      },
      {
        question: 'Static Application Security Testing (SAST) analyzes:',
        options: ['The app while it is running in production', 'Network traffic passing through the perimeter firewall', 'Only third-party libraries', 'The app\'s source code during development, before the app is running'],
        correctIndex: 3,
        explanation: 'SAST analyzes the app\'s source code during development, before the app is running.',
      },
      {
        question: 'Software Composition Analysis (SCA) is mainly used to:',
        options: ['Identify known vulnerabilities in third-party libraries and open-source components', 'Flood a server with traffic', 'Replace the homepage', 'Encrypt the backend database at rest on disk'],
        correctIndex: 0,
        explanation: 'SCA identifies known vulnerabilities in third-party libraries and open-source components used in the app.',
      },
      {
        question: 'Interactive Application Security Testing (IAST) performs analysis by:',
        options: ['Reading only static source code', 'Observing app behavior from inside the running application at run time', 'Scanning printed documentation', 'Filtering incoming and outgoing HTTP traffic much like a network firewall'],
        correctIndex: 1,
        explanation: 'IAST observes app behavior (input, output, data flow, logic) to conduct run-time analysis from inside the running application.',
      },
      {
        question: 'Dynamic Application Security Testing (DAST) analyzes the app:',
        options: ['Before it is written', 'Only by reading its source code', 'While it is running, including servers, typically requiring manual configuration', 'By decompiling the compiled mobile application binary'],
        correctIndex: 2,
        explanation: 'DAST analyzes the app while it is running (including servers) and typically requires manual configuration.',
      },
      {
        question: 'IAST is often described as combining which two approaches?',
        options: ['WAF and RASP', 'Phishing and spoofing', 'SQLi and XSS', 'SAST and DAST'],
        correctIndex: 3,
        explanation: 'IAST combines SAST and DAST: it runs during testing like DAST but has visibility into the code like SAST.',
      },
      {
        question: 'A Web Application Firewall (WAF) protects a web app by:',
        options: ['Filtering and monitoring HTTP traffic to block malicious attacks', 'Decompiling mobile apps', 'Encrypting all of the application source code files', 'Rooting the device'],
        correctIndex: 0,
        explanation: 'A WAF protects a web app by filtering and monitoring HTTP traffic.',
      },
      {
        question: 'Runtime Application Self-Protection (RASP) works by:',
        options: ['Analyzing source code before deployment', 'Using app instrumentation inside the running application to detect and block attacks', 'Only scanning third-party open-source libraries', 'Sending phishing emails to test users'],
        correctIndex: 1,
        explanation: 'RASP detects, protects against, and blocks attacks using app instrumentation directly inside the running application.',
      },
      {
        question: 'WAF and RASP are examples of which category of defense?',
        options: ['Testing methodologies', 'Injection attacks', 'Protective mechanisms', 'Deception attacks'],
        correctIndex: 2,
        explanation: 'WAF and RASP are protective mechanisms that actively block attacks, as opposed to testing methodologies.',
      },
      {
        question: 'Which is listed among the additional best practices for securing apps?',
        options: ['Disable all authentication', 'Store API keys in the frontend', 'Avoid recording any code changes', 'Execute input validation and authorization'],
        correctIndex: 3,
        explanation: 'Additional best practices include input validation & authorization, enhanced authentication, recording code changes, and tracking API usage.',
      },
      {
        question: "Why can a web app NOT freely use the phone's camera or contacts the way an installed mobile app can?",
        options: ['Because HTTP forbids any use of hardware', "Because web apps run inside the browser's sandbox, without direct access to device functionality", 'Because web servers cannot process images', 'Because HTML automatically encrypts the camera feed'],
        correctIndex: 1,
        explanation: "Web apps run inside the browser's sandbox and lack direct access to device functionality — a deliberate browser security feature.",
      },
      {
        question: 'The "network of compromised devices" used to launch a DDoS attack is known as:',
        options: ['A botnet', 'A firewall', 'A sandbox', 'A honeypot'],
        correctIndex: 0,
        explanation: 'A botnet is a network of infected computers, phones, and smart devices that an attacker remotely commands to flood a target with traffic.',
      },
      {
        question: 'In the CSRF example, why does the bank accept the forged transfer request?',
        options: ['Because the bank has no database', 'Because the attacker guessed the password', "Because the victim's browser automatically attaches their logged-in session cookie to the request", 'Because DDoS traffic overloaded the bank'],
        correctIndex: 2,
        explanation: 'The browser automatically attaches the logged-in session cookie to every request to that site, so the bank believes the victim made the request.',
      },
      {
        question: 'Spyware on a mobile device is best described as:',
        options: ['A firewall that filters HTTP traffic', 'A tool for testing app source code', 'An app update delivered through the official store', 'Malicious software that secretly monitors your activity and reports it to an attacker'],
        correctIndex: 3,
        explanation: 'Spyware secretly monitors what you do on the device (messages, calls, location) and reports it back to an attacker.',
      },
      {
        question: '"Cryptographic issues" in mobile apps refer to:',
        options: ['Using too much encryption', 'Weak or wrongly implemented encryption, such as outdated algorithms or hardcoded keys', 'Encrypting data with a WAF', 'Refusing to store any data on the device'],
        correctIndex: 1,
        explanation: 'Cryptographic issues are weak or wrongly implemented encryption — like outdated algorithms or hardcoding the key inside the app where a reverse engineer can find it.',
      },
      {
        question: 'In the recipe analogy for security testing, "tasting the finished dish" corresponds to:',
        options: ['SAST — reading the source code', 'SCA — scanning third-party libraries', 'DAST — probing the running app from the outside', 'WAF — filtering HTTP traffic'],
        correctIndex: 2,
        explanation: 'DAST probes the running application from the outside, like tasting the finished dish; SAST is proofreading the recipe (source code) before cooking.',
      },
      {
        question: 'Why are web apps described as cost-effective compared to mobile apps?',
        options: ['One version works across platforms, so there is no need to maintain separate iOS and Android builds', 'They never need a server', 'They require no developers at all', 'Browsers pay for the hosting'],
        correctIndex: 0,
        explanation: 'A single web version works across platforms, avoiding the cost of building and maintaining separate iOS and Android apps.',
      },
      {
        question: 'What is e-commerce?',
        options: ['A programming language for online stores', 'Markets enabled by the internet — the buying and selling of goods and services online', 'A type of teleconferencing', 'A firewall for retail websites'],
        correctIndex: 1,
        explanation: 'E-commerce refers to markets enabled by the internet, involving the buying and selling of goods and services online.',
      },
      {
        question: 'Alibaba.com is given as an example of which e-commerce model?',
        options: ['Business-to-Consumer (B2C)', 'Consumer-to-Business (C2B)', 'Business-to-Business (B2B)', 'Consumer-to-Consumer (C2C)'],
        correctIndex: 2,
        explanation: 'Alibaba.com is the classic B2B example — businesses dealing with other businesses, including manufacturers.',
      },
      {
        question: 'Konga, Jumia and Temu are examples of which e-commerce model?',
        options: ['Business-to-Consumer (B2C)', 'Business-to-Business (B2B)', 'Consumer-to-Business (C2B)', 'Consumer-to-Consumer (C2C)'],
        correctIndex: 0,
        explanation: 'They sell directly to consumers — the business (or manufacturer) sends products straight to the customer, which is B2C.',
      },
      {
        question: 'In the Consumer-to-Consumer (C2C) model:',
        options: ['A manufacturer ships directly to shoppers', 'Consumers provide goods and services to other consumers', 'Big businesses connect with smaller businesses', 'A consumer offers services to a business'],
        correctIndex: 1,
        explanation: 'C2C deals with the process by which some consumers provide goods and services to other consumers.',
      },
      {
        question: 'Which of these is listed as a benefit of e-commerce to business?',
        options: ['It shortens the operating hours of the business', 'It guarantees zero cybersecurity risk', 'It removes the need for marketing', 'It reduces operational cost and extends the operating hours of the business'],
        correctIndex: 3,
        explanation: 'E-commerce reduces operational cost, extends operating hours (an online store never closes), increases sales conversion, and optimises processes.',
      },
      {
        question: 'What is teleconferencing?',
        options: ['Using digital technology to communicate between businesses or individuals in different geographical areas', 'A method of encrypting phone calls', 'Selling goods to other businesses online', 'A search-engine keyword strategy'],
        correctIndex: 0,
        explanation: 'Teleconferencing is the use of digital technology to communicate between businesses or individuals located in different geographical areas.',
      },
      {
        question: 'Audio conferencing differs from video conferencing in that it:',
        options: ['Requires participants to be in the same room', 'Uses voice communication only, with nothing shown visually', 'Always includes shared screens and slides', 'Combines in-person and remote participants'],
        correctIndex: 1,
        explanation: 'Audio conferencing is communication by voice only; video conferencing lets participants see and hear each other; hybrid combines in-person and remote.',
      },
      {
        question: 'When a cookie is "dropped" on a platform after a user searches for an item, what does it enable?',
        options: ['Automatic virus scanning of the device', 'Free products for the user', 'Targeted advertising and customer engagement based on what the person searched for', 'Faster internet bandwidth'],
        correctIndex: 2,
        explanation: 'The cookie records that the person searched for a particular item, letting the business show targeted adverts later.',
      },
      {
        question: 'Search Engine Optimization (SEO) involves:',
        options: ['Optimising activities and research so that keywords attract relevant traffic', 'Sending bulk advertising by SMS', 'Paying consumers to advertise a business', 'Encrypting search results'],
        correctIndex: 0,
        explanation: 'SEO is about researching and using the right keywords so a page attracts relevant search traffic.',
      },
      {
        question: 'Which of these is listed as a CHALLENGE for businesses impacted by the internet?',
        options: ['Two-way communication with customers', 'Cybersecurity threats and data privacy/compliance', 'Faster decision making', 'Higher return on investment'],
        correctIndex: 1,
        explanation: 'The challenges listed are cybersecurity threats, data privacy and compliance, high cost, and bandwidth management of internet services.',
      },
      {
        question: 'Why does Multi-Factor Authentication (MFA) improve security?',
        options: ['It makes passwords longer', 'It encrypts data at rest', 'It removes the need for passwords entirely', 'A stolen password alone is not enough to log in — a second proof of identity is required'],
        correctIndex: 3,
        explanation: 'MFA asks for a second proof of identity (a one-time code, phone prompt, or fingerprint) on top of the password.',
      },
      {
        question: 'Which of these is among the practical measures for audit compliance and quality assurance?',
        options: ['Perform regular audits and keep proper documentation of all system and network configurations', 'Disable software updates to keep systems stable', 'Share one admin password across the team', 'Avoid staff training to save costs'],
        correctIndex: 0,
        explanation: 'The measures include regular audits, proper documentation, regular updates and patches, staff threat-awareness training, MFA, and encryption.',
      },
      {
        question: 'What is the difference between an audit and quality assurance (QA)?',
        options: ['They are the same activity', 'An audit blocks attacks in real time; QA is a type of firewall', 'An audit reviews what was actually done (logs, configurations) after the fact; QA tests that the app behaves correctly and securely', 'QA is only for mobile apps; audits are only for web apps'],
        correctIndex: 2,
        explanation: 'An audit is a check of what you actually did; compliance means meeting required rules; QA is testing that the app behaves correctly and securely.',
      },
      {
        question: 'Why is proper documentation of system and network configurations a security control in its own right?',
        options: ['It replaces the need for encryption', 'You cannot audit, patch, or recover a system whose configuration nobody has written down', 'It makes the system run faster', 'Auditors are only allowed to read documents, not systems'],
        correctIndex: 1,
        explanation: 'Without documented configurations there is nothing reliable to audit against, patch consistently, or rebuild from after an incident.',
      },
      {
        question: 'How do operational measures like patching and audits relate to testing methodologies like SAST and DAST?',
        options: ['They replace testing entirely', 'Testing finds flaws in the code, while audits, patching and documentation keep the running system secure over time', 'Operational measures only apply before release', 'SAST and DAST are operational measures'],
        correctIndex: 1,
        explanation: 'A vulnerability found in testing is only truly fixed once the patch is deployed and the change is documented and audited.',
      },
      {
        question: 'Which motive is described as the most common driver of serious cybercrime?',
        options: ['Fame', 'Recreational curiosity', 'Financial gain', 'Coercion'],
        correctIndex: 2,
        explanation: 'Financial gain — fraud, extortion and data resale — is the most common driver of serious cybercrime.',
      },
      {
        question: 'Why are insiders a uniquely dangerous category of threat actor?',
        options: ['They have the most advanced hacking tools', 'They already hold legitimate access, so authentication controls alone do not stop them', 'They always act for financial gain', 'They can only attack from outside the network'],
        correctIndex: 1,
        explanation: 'Insiders are employees or contractors who already hold valid credentials — which is why behavioural controls like time/volume limits and request filtering matter as much as authentication.',
      },
      {
        question: 'What does "hacktivism" refer to as a motive for attack?',
        options: ['Attacking systems for a political, social or ideological cause', 'Attacking systems purely for the technical challenge', 'Being blackmailed into compromising a system', 'Gathering confidential information for a state'],
        correctIndex: 0,
        explanation: 'Activism, or "hacktivism", means attacking in pursuit of a political, social or ideological cause rather than for personal gain.',
      },
      {
        question: 'The principle of layering several independent security controls, so that one failure does not expose the whole system, is known as:',
        options: ['Graceful degradation', 'Defence in depth', 'Multi-party authentication', 'Steganography'],
        correctIndex: 1,
        explanation: 'Defence in depth means combining controls so that if one layer fails, another still limits the damage.',
      },
      {
        question: 'According to the password policy in the notes, "camel casing" in a password means:',
        options: ['Using at least six characters', 'Using a special character such as @ or #', 'Mixing at least one uppercase letter with lowercase letters', 'Never reusing a password across sites'],
        correctIndex: 2,
        explanation: 'Camel casing refers to mixed case — at least one uppercase letter combined with lowercase letters.',
      },
      {
        question: 'What distinguishes Three-Factor Authentication (3FA) from Two-Factor Authentication (2FA) in these notes?',
        options: ['3FA requires a biometric as the third factor', '3FA requires authorization from two or more distinct devices rather than one', '3FA sends a longer one-time code', '3FA applies only to mobile applications'],
        correctIndex: 1,
        explanation: '3FA requires authorization from two or more distinct devices — a request initiated on a phone may need approval from a separate computer.',
      },
      {
        question: 'A criminal who already has a victim\'s PIN calls them with an urgent story and asks them to read out the code just sent to their phone. This attack targets:',
        options: ['The password layer', 'The 2FA one-time code', 'The biometric liveness check', 'The encryption key'],
        correctIndex: 1,
        explanation: 'This is the classic social-engineering attack on 2FA — the attacker needs the victim to hand over the OTP to complete the second factor. A legitimate institution never asks a customer to read back an OTP.',
      },
      {
        question: 'Why should a system limit how long a session runs or how much data it can retrieve?',
        options: ['To reduce server hosting costs', 'Because large-scale data theft takes time, and idle authenticated sessions can be hijacked', 'Because encryption slows down long sessions', 'To comply with browser cookie limits'],
        correctIndex: 1,
        explanation: 'Copying a large dataset over a network takes time, so unusually long or high-volume sessions are a red flag; and a session left open is an opportunity for someone else to act on the user\'s behalf.',
      },
      {
        question: 'Graceful degradation means designing a system so that:',
        options: ['Performance slowly declines as more users log in', 'A compromised component is isolated or shut down while the rest of the system keeps running', 'Old data is deleted automatically after a set period', 'The system reverts to an earlier version after an attack'],
        correctIndex: 1,
        explanation: 'Graceful degradation contains a breach to the smallest possible part of the system, keeping the service available to legitimate users while the issue is resolved.',
      },
      {
        question: 'What is the purpose of liveness detection alongside biometric authentication?',
        options: ['To speed up fingerprint matching', 'To confirm the biometric sample comes from a live person and not a photo, mask or other spoof', 'To store the biometric template securely', 'To allow login without an internet connection'],
        correctIndex: 1,
        explanation: 'Liveness checks — such as prompting a blink or an open mouth — confirm a real person is present rather than a spoofed image.',
      },
      {
        question: 'In input and request filtering, why does a device\'s IP address changing within about 60 seconds raise a flag?',
        options: ['It always means the device is infected with malware', 'It may indicate VPN use or another anomaly, so the request can be restricted rather than granted outright', 'It proves the password has been stolen', 'It shows the encryption key has expired'],
        correctIndex: 1,
        explanation: 'A request signature that shifts unexpectedly within a short window suggests a VPN or other anomaly — the same principle behind geo-gating and VPN detection.',
      },
      {
        question: 'Which cryptographic category uses a mathematically linked key pair, so no single secret key has to be shared?',
        options: ['Symmetric encryption', 'Asymmetric encryption', 'Hash functions', 'Steganography'],
        correctIndex: 1,
        explanation: 'Asymmetric encryption uses a public/private key pair — the public key encrypts data that only the private key can decrypt.',
      },
      {
        question: 'What are hash functions used for?',
        options: ['Concealing data so it can later be recovered', 'Producing a fixed-length, one-way fingerprint used to verify integrity', 'Sharing a secret key between two parties', 'Hiding a message inside an image'],
        correctIndex: 1,
        explanation: 'A hash is one-way and cannot practically be reversed — it verifies that data has not been altered, rather than concealing and later recovering it.',
      },
      {
        question: 'How does steganography differ from encryption?',
        options: ['It is faster than encryption', 'It hides the existence of the message rather than making it unreadable', 'It uses a longer key than encryption', 'It only works on text files'],
        correctIndex: 1,
        explanation: 'Encryption signals that a message is protected; steganography conceals the very existence of the message by hiding it inside an ordinary-looking file such as an image.',
      },
      {
        question: 'Authentication controls and behavioural controls differ in that:',
        options: ['Authentication controls address who is let in, while behavioural controls address what happens after access is granted', 'Behavioural controls apply only to mobile apps', 'Authentication controls run on the server and behavioural controls run in the browser', 'They are two names for the same thing'],
        correctIndex: 0,
        explanation: 'Password, 2FA, 3FA and multi-party authentication govern entry; time/volume limits and input filtering govern conduct once inside.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  300 LEVEL — FIRST SEMESTER  (16 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 312',
    slug: 'gst-312',
    title: 'Peace and Conflict Resolution',
    units: 2, level: 300, semester: 1, lh: 30, ph: 0,
    subject: 'gst',
    crossDepartmental: true,
    description: 'The causes, dynamics, and resolution of conflict in a multi-ethnic nation: types and theories of conflict, root causes of conflict and violence in Africa, peacebuilding strategies, and the roles of international organisations, media, and traditional institutions.',
    topics: [
      'Concepts of peace, conflict, and security in a multi-ethnic nation',
      'Types and theories of conflict: ethnic, religious, economic, geo-political',
      'Root causes of conflict and violence in Africa; selected conflict case studies',
      'Peacebuilding, management of conflicts and security',
      'Insurgency and terrorism; peace mediation and peacekeeping',
      'Alternative Dispute Resolution: dialogue, arbitration, negotiation, collaboration',
      'Roles of international organisations: UN, African Union, ECOWAS',
      'Media and traditional institutions in peacebuilding',
      'Managing post-conflict situations: refugees, IDPs, and the role of NGOs',
    ],
    textbooks: [
      { title: 'The Handbook of Conflict Resolution', authors: 'Morton Deutsch, Peter T. Coleman & Eric C. Marcus', note: '3rd ed. — comprehensive academic reference' },
      { title: 'Peace and Conflict Studies', authors: 'David P. Barash & Charles P. Webel', note: '4th ed. — accessible and widely used in Nigeria' },
    ],
    searchTerms: [
      'Peace and conflict resolution course lectures',
      'Cyber conflict information warfare explained',
      'Conflict resolution models comparison',
      'Nigeria conflict resolution case studies',
    ],
    studyTips: [
      'Tie cyber conflict topics directly to CYB 211 (Cybersecurity Strategy) for cross-course reinforcement',
      'Current events in Nigeria provide excellent case studies for conflict analysis questions',
      'Understand the UN Charter and its limitations regarding cyber operations — examined often',
      'Mediator vs arbitrator vs conciliator: know the distinctions precisely',
    ],
  },
  {
    code: 'CSC 319',
    slug: 'csc-319',
    title: 'Artificial Intelligence',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    description: 'Foundations of AI: intelligent agents, search algorithms, knowledge representation, semantic networks, natural language processing, and expert systems. Directly relevant to AI-powered threat detection, anomaly detection, and automated vulnerability analysis in cybersecurity.',
    topics: [
      'Overview, history, goals, types, branches and applications of AI',
      'Intelligent agents: performance, faculties, rationality, environment, architectures',
      'Search: general classes of AI search problems, techniques and strategies',
      'Knowledge representation: predicate logic, non-monotonic logic, probabilistic reasoning',
      'Semantic networks and frames',
      'Natural language processing: syntactic and semantic structures',
      'Expert systems: characteristics, components, types, development',
      'Programming languages for AI; introduction to computer image recognition',
      'Lab: Turing test, facial recognition, chatbots, spam detection, sentiment analysis, machine translation',
    ],
    textbooks: [
      { title: 'Artificial Intelligence: A Modern Approach', authors: 'Stuart Russell & Peter Norvig', note: '4th ed. — the definitive AI textbook used worldwide (AIMA)' },
      { title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', authors: 'Aurélien Géron', note: '3rd ed. — practical ML with Python; excellent lab companion' },
    ],
    searchTerms: [
      'Artificial intelligence full course freeCodeCamp YouTube',
      'Machine learning for beginners crash course',
      'A* search algorithm explained visual',
      'AI in cybersecurity use cases 2024',
    ],
    studyTips: [
      'Understand A* search intuitively by tracing it on a grid before studying the formal algorithm',
      'Connect AI to cybersecurity in every exam answer — your degree makes this connection valuable',
      'Google\'s free Machine Learning Crash Course covers supervised/unsupervised ML at the right level',
      'AI ethics questions (bias, fairness) appear frequently — develop considered, referenced arguments',
    ],
  },
  {
    code: 'CYB 311',
    slug: 'cyb-311',
    title: 'Cryptography Techniques, Algorithms and Applications',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'The mathematical and algorithmic foundations of modern cryptography: symmetric and asymmetric cryptosystems, key management, hash functions, digital signatures, PKI, and protocol security. The theoretical backbone of all secure communications.',
    topics: [
      'Introduction to cryptography: symmetric and asymmetric cryptosystems, key management',
      'Cryptanalysis; stream ciphers, block ciphers, and Feistel ciphers',
      'Hash functions; data integrity, authentication, and perfect secrecy',
      'Public-key cryptography and discrete algorithms: ElGamal, algorithmic number theory, primality testing',
      'Security of ElGamal and RSA encryption; RSA key generation; discrete logarithm schemes',
      'Selected cryptosystems: DES, RSA, and the AES symmetric block cipher',
      'PKI, SSL, and VPN',
      'Digital signatures, pseudo-random number generation, and cryptographic protocols',
      'Certificate authorities; policies and procedures for the proper use of cryptography',
    ],
    textbooks: [
      { title: 'Cryptography and Network Security', authors: 'William Stallings', note: '8th ed. — the most used cryptography text in the field' },
      { title: 'Introduction to Modern Cryptography', authors: 'Katz & Lindell', note: '3rd ed. — mathematically rigorous; excellent for proofs' },
    ],
    searchTerms: [
      'Cryptography full course for beginners YouTube',
      'RSA algorithm explained step by step',
      'AES encryption how it works visual',
      'TLS handshake explained in detail',
    ],
    studyTips: [
      'Work through RSA key generation by hand at least twice — the maths is not complex once you step through it',
      'Know the difference between confidentiality (encryption), integrity (MAC/hash), and authentication (signature)',
      'Computerphile on YouTube has outstanding, accessible videos on every topic in this course — free',
      'Quantum threats from this course directly link to CYB 222 (Innovation) and CYB 411 (Vulnerability Assessment)',
    ],
  },
  {
    code: 'CYB 312',
    slug: 'cyb-312',
    title: 'Biometrics Security',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Biometric authentication systems: digital image/signal processing, matching algorithms, error metrics, and data security. Covers implementation in national identity systems and access control.',
    topics: [
      'Introduction to biometrics and digital image processing',
      'Biometric algorithms and systems: face, fingerprint, iris, voice',
      'Automated biometric identification and multimodal biometrics',
      'Biometric data: raw data, template data, and data methods',
      'Matching basics: enrolment, match threshold, matching performance',
      'Calculating error rates and graphs (FAR, FRR, EER)',
      'Storage of biometric data: transactions, quality upgrades, data security and integrity',
      'Privacy issues; security strength and recognition rates',
      'Applications of biometrics and future trends; alternatives to passwords and smart cards',
    ],
    textbooks: [
      { title: 'Introduction to Biometrics', authors: 'Anil K. Jain, Arun A. Ross & Karthik Nandakumar', note: 'The leading academic text on biometrics' },
      { title: 'Biometric System and Data Analysis', authors: 'Ted Dunstone & Neil Yager', note: 'Good coverage of performance evaluation and testing' },
    ],
    searchTerms: [
      'How fingerprint biometric systems work',
      'FAR FRR EER biometric metrics explained',
      'Face recognition attack liveness detection',
      'Biometric systems security vulnerabilities',
    ],
    studyTips: [
      'FAR vs FRR trade-off is the most examined concept — understand the EER graphically',
      'Nigeria\'s NIN (National Identity Number) system is a real-world case study for national biometrics',
      'Biometric privacy connects to the Nigeria Data Protection Act from CYB 224 — link them',
      'Presentation attack / spoofing scenarios make excellent exam answers for "practical examples"',
    ],
  },
  {
    code: 'CYB 313',
    slug: 'cyb-313',
    title: 'Cybersecurity Risks Analysis, Challenges and Mitigation',
    units: 2, level: 300, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    description: 'Systematic methods for identifying, analysing, and treating cybersecurity risks. Covers applied information security management, risk mitigation in the cloud, governance and security policy, the ISO 27000 series, and the economic/geopolitical factors behind Africa\'s cyber risk exposure.',
    topics: [
      'Principles of applied information security management',
      'Cybersecurity risks, challenges, and the path forward; recognizing risks',
      'Decision and risk analysis techniques; mitigating risks and vulnerabilities',
      'Effective use of assessments for cybersecurity risk mitigation, including in the cloud',
      'Economic and geopolitical factors behind Africa\'s vulnerability to cyber-attacks',
      'Governance and security policy; threat and vulnerability management',
      'Incident management, risk assessment and risk management frameworks',
      'Information leakage, crisis management, and business continuity',
      'ISO 27000 series and the Plan-Do-Check-Act model',
      'Incident response, forensics, and investigations; legal and regulatory drivers',
    ],
    textbooks: [
      { title: 'Risk Analysis and the Security Survey', authors: 'James F. Broder & Gene Tucker', note: '4th ed. — practical security risk survey approach' },
      { title: 'CompTIA Security+ Study Guide', authors: 'Mike Chapple & David Seidl', note: 'The risk management chapters align closely with this course' },
    ],
    searchTerms: [
      'Cybersecurity risk assessment framework tutorial',
      'STRIDE threat modelling explained',
      'ALE SLE ARO quantitative risk calculation',
      'NIST risk management framework steps',
    ],
    studyTips: [
      'Practise ALE/SLE/ARO calculations until they are automatic — they appear in nearly every exam',
      'STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation) — memorise and apply it to any system',
      'Risk registers are a practical exam task — practise building one for a sample organisation',
      'BCP and DR are distinct: BCP keeps the business running, DR recovers IT systems — know the difference',
    ],
  },
  {
    code: 'UUY-CYB 314',
    slug: 'uuy-cyb-314',
    title: 'Information Security Models',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'The formal models that underpin access control and multi-level security: Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash, and the access-control mechanisms (MAC, RBAC, ACLs, lattice-based control) that implement them in real systems.',
    topics: [
      'Basic concepts of formal security models; Access Control Lists (ACL)',
      'Bell-LaPadula model (confidentiality) and the Biba model (integrity)',
      'Brewer and Nash model (Chinese Wall) and the Clark-Wilson model',
      'Capability-based security and the Object-Capability Model',
      'Context-Based Access Control (CBAC) and Graham-Denning model',
      'Harrison-Ruzzo-Ullman (HRU) and the Take-Grant protection model',
      'Lattice-Based Access Control (LBAC), Mandatory Access Control (MAC), and Multi-Level Security (MLS)',
      'Non-interference security; Role-Based Access Control (RBAC)',
      'Protection rings and the High-Water Mark security model',
    ],
    textbooks: [
      { title: 'Computer Security: Principles and Practice', authors: 'William Stallings & Lawrie Brown', note: '4th ed. — covers Bell-LaPadula, Biba, and Clark-Wilson in depth' },
      { title: 'Security Engineering', authors: 'Ross Anderson', note: '3rd ed. — free online; excellent treatment of access control models' },
    ],
    searchTerms: [
      'Bell-LaPadula model explained',
      'Biba integrity model vs Bell-LaPadula',
      'Role-based access control RBAC explained',
      'Clark-Wilson model information security',
    ],
    studyTips: [
      'Contrast Bell-LaPadula (confidentiality: "no read up, no write down") with Biba (integrity: the reverse) — this pairing is exam-critical',
      'Draw the lattice for MLS/LBAC by hand — visualising the ordering makes the model click',
      'Link RBAC and MAC back to UUY-CYB 122 and UUY-CYB 221, where these controls are applied practically',
      'Memorise which model addresses which property (confidentiality, integrity, or conflict of interest) — a common exam table',
    ],
  },
  {
    code: 'UUY-CYB 315',
    slug: 'uuy-cyb-315',
    title: 'Lab for Cyber Attacks and Vulnerability Testing',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Hands-on laboratory course in offensive/defensive security: operating system file structures, formal security models, intrusion detection, vulnerability testing, and countermeasures for denial-of-service, worm, and virus attacks.',
    topics: [
      'Operating system file structure and protection mechanisms',
      'Formal models of security',
      'Cryptography and steganography',
      'Network and distributed system security',
      'Vulnerability testing on networked infrastructure',
      'Intrusion detection tasks on networked computer systems',
      'Denial-of-service attack strategies and prevention',
      'Worms and viruses: attack strategies and countermeasures',
      'Transfer of funds/value across networks; electronic voting security',
    ],
    textbooks: [
      { title: 'The Hacker Playbook 3', authors: 'Peter Kim', note: 'Red team tactics used by professionals; very practical' },
      { title: 'Kali Linux Revealed', authors: 'Raphaël Hertzog & Jim O\'Gorman', note: 'Free official Kali documentation; the lab OS reference' },
    ],
    searchTerms: [
      'Kali Linux setup guide beginner 2024',
      'Metasploit framework tutorial for beginners',
      'Burp Suite web application testing tutorial',
      'TryHackMe HackTheBox beginner labs free',
    ],
    studyTips: [
      'Set up a local lab with VirtualBox + Kali Linux + Metasploitable before the first lab session',
      'TryHackMe and HackTheBox both have beginner paths that map directly to this lab content — free tiers available',
      'Document everything in your lab notebook: tools used, commands run, findings, screenshots',
      'Practise on legal targets ONLY: Metasploitable, DVWA, HackTheBox, TryHackMe — never on live systems',
    ],
  },
  {
    code: 'UUY-CYB 316',
    slug: 'uuy-cyb-316',
    title: 'Database Management and Control Systems',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'ins',
    description: 'Securing database systems from the ground up: installing and configuring a database product, security architecture and operating-system security principles, user/privilege/role administration, and database auditing models and practice.',
    topics: [
      'Enterprise security issues in database systems',
      'Installing a typical database product',
      'Security architecture and operating system security principles',
      'Administration of users, profiles, and password policies',
      'Privileges and roles',
      'Database application security models',
      'Database auditing models and application data auditing',
      'Practices of database auditing',
    ],
    textbooks: [
      { title: 'Database System Concepts', authors: 'Silberschatz, Korth & Sudarshan', note: '7th ed. — the standard database textbook globally' },
      { title: 'Database Security and Auditing', authors: 'Hassan Afyouni', note: 'Comprehensive coverage of database-specific security controls' },
    ],
    searchTerms: [
      'Database security architecture explained',
      'Database user roles and privileges tutorial',
      'Database auditing models and practice',
      'SQL injection prevention parameterised queries',
    ],
    studyTips: [
      'Use MySQL Workbench or pgAdmin (both free) to practise installing and securing a database hands-on',
      'Database roles and privileges follow the same access-control logic as UUY-CYB 314 (Information Security Models) — connect them',
      'Practise setting up a users/privileges/password-policy scheme for a sample organisation — a common practical exam task',
      'SQL injection prevention from CYB 224 directly applies here — connect both courses in exam answers',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  300 LEVEL — SECOND SEMESTER  (15 units — SIWES)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'CYB 311',
    slug: 'cyb-311-siwes-1',
    title: 'SIWES I (Student Industrial Work Experience Scheme)',
    units: 3, level: 300, semester: 2, lh: 0, ph: 135,
    subject: 'siwes',
    description: 'The first industrial training placement: three months attached to a private or public organisation during the second-year long break, gaining practical cybersecurity experience under supervision, with a defended report at the end.',
    topics: [
      'IT department integration and workplace orientation',
      'Practical network administration and monitoring',
      'Security operations: log review, alert triage, incident handling',
      'Help desk and technical support operations',
      'Observing penetration testing or vulnerability management',
      'Documenting processes and writing technical reports',
      'Professional communication and teamwork in IT environments',
      'Identifying and reporting your learning outcomes',
    ],
    textbooks: [
      { title: 'SIWES Student Handbook', authors: 'ITF (Industrial Training Fund)', note: 'Download from the ITF portal — contains guidelines and log book templates' },
      { title: 'The IT Professional\'s Guide to Career Development', authors: 'Various', note: 'Use professional certifications (Security+, CEH) study guides to supplement placement learning' },
    ],
    searchTerms: [
      'SIWES placement cybersecurity Nigeria guide',
      'ITF industrial training fund Nigeria student',
      'How to write a SIWES technical report',
      'Cybersecurity internship what to expect',
    ],
    studyTips: [
      'Start searching for a placement organisation at the end of 200L second semester — do not wait',
      'Security operations centres (SOCs), banks, telecoms companies, and NITDA are good placement targets',
      'Keep a daily log of what you do — your SIWES report grade depends on evidence of engagement',
      'Ask your supervisor for tasks beyond basic support — every real challenge is a learning opportunity',
    ],
  },
  {
    code: 'CYB 312',
    slug: 'cyb-312-siwes-2',
    title: 'SIWES II (Student Industrial Work Experience Scheme)',
    units: 3, level: 300, semester: 2, lh: 0, ph: 135,
    subject: 'siwes',
    description: 'The second, more advanced industrial placement: three months attached to a private or public organisation during the third-year long break, building on SIWES I with additional practical cybersecurity experience and a defended report.',
    topics: [
      'Advanced security monitoring and SIEM usage in production',
      'Participation in or observation of incident response',
      'Vulnerability assessment contribution',
      'Security awareness training participation',
      'Independent security research or mini-investigation',
      'Cross-functional collaboration with non-IT departments',
      'Professional certification preparation (optional but valuable)',
      'SIWES II technical report and supervisor evaluation',
    ],
    textbooks: [
      { title: 'SIWES Student Handbook', authors: 'ITF (Industrial Training Fund)', note: 'The official log book and reporting requirements' },
      { title: 'CompTIA Security+ or CEH Study Guide', authors: 'Various', note: 'Use your placement time to work towards a professional certification' },
    ],
    searchTerms: [
      'How to write industrial training report Nigeria',
      'SIWES final report format sample',
      'Cybersecurity professional certifications to get as a student',
      'Security operations centre SOC analyst daily tasks',
    ],
    studyTips: [
      'Use SIWES to begin working towards a professional certification: Security+, CEH, or OSCP',
      'Build your LinkedIn profile during SIWES — document your work and achievements professionally',
      'Network actively: every senior professional you meet is a potential reference or employer',
      'Your SIWES report is a professional document — write it to the standard you would send to a client',
    ],
  },
  {
    code: 'CYB 313',
    slug: 'cyb-313-report-writing',
    title: 'Report Writing',
    units: 3, level: 300, semester: 2, lh: 15, ph: 45,
    subject: 'siwes',
    description: 'The craft of professional and technical report writing, focused on documenting the SIWES I and II placements: structuring findings, presenting technical work clearly, and defending a written report before a panel.',
    topics: [
      'Structure of a professional technical report',
      'Documenting workplace experience and technical assignments',
      'Clarity, precision, and objectivity in technical writing',
      'Figures, tables, and appendices in a technical report',
      'Referencing and academic/professional integrity',
      'Editing and proofreading technical documents',
      'Preparing to defend a written report before a panel',
      'Common pitfalls in student technical reports',
    ],
    textbooks: [
      { title: 'Technical Report Writing Today', authors: 'Daniel G. Riordan', note: '11th ed. — practical, example-driven guide' },
      { title: 'The Elements of Technical Writing', authors: 'Gary Blake & Robert W. Bly', note: 'Short, focused, and highly practical' },
    ],
    searchTerms: [
      'How to write a technical report for SIWES',
      'Technical report structure and format',
      'Report writing tips for engineering students',
      'How to defend a report before a panel',
    ],
    studyTips: [
      'Draft this report alongside your SIWES I/II placements rather than after — memory of details fades fast',
      'Use the ITF SIWES logbook as your raw source material, then structure it into a formal report',
      'Have a peer or supervisor read a draft before submission — clarity gaps are hard to see in your own writing',
      'Practise a short verbal summary of your report; panels often ask you to explain it in your own words',
    ],
  },
  {
    code: 'CYB 314',
    slug: 'mini-project-300l',
    title: 'Mini Project',
    units: 3, level: 300, semester: 2, lh: 15, ph: 45,
    subject: 'cs',
    description: 'A supervised mini research or development project that demonstrates integration of skills acquired across the first six semesters. Serves as a preparation and rehearsal for the 400L Final Year Project.',
    topics: [
      'Topic selection: scope, feasibility, and originality',
      'Literature review methodology',
      'Research/development methodology selection',
      'Designing and building a cybersecurity solution or tool',
      'Data collection, analysis, or system implementation',
      'Academic writing: introduction, methodology, results, conclusion',
      'Referencing and academic integrity',
      'Oral presentation and project defence',
    ],
    textbooks: [
      { title: 'Research Methods for Computer Science', authors: 'Stuart Shapiro', note: 'Practical guide to research design in computing' },
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — essential for academic and technical writing' },
    ],
    searchTerms: [
      'How to write a mini project for university',
      'Cybersecurity project ideas for final year students',
      'Literature review how to write guide',
      'Academic referencing APA 7th edition guide',
    ],
    studyTips: [
      'Choose a project topic that excites you — you will work on it for a full semester',
      'Select a topic that connects to your SIWES experience — it gives you real-world data and context',
      'Start your literature review early: academic papers take time to find and read',
      'The mini project is a rehearsal for FYP — treat it seriously and document everything',
    ],
  },
  {
    code: 'CYB 399',
    slug: 'seminar-300l',
    title: 'Seminar',
    units: 3, level: 300, semester: 2, lh: 15, ph: 45,
    subject: 'cs',
    description: 'A series of student-led presentations on advanced topics in cybersecurity. Develops research, critical analysis, and public speaking skills in a professional academic setting.',
    topics: [
      'Selecting a cutting-edge cybersecurity topic',
      'Academic literature search and evaluation',
      'Structuring a 20-minute technical presentation',
      'Slide design for technical audiences',
      'Handling questions from examiners and peers',
      'Peer review and constructive feedback',
      'Current trends: AI security, quantum threat, ransomware economics',
      'Writing a seminar paper to accompany the presentation',
    ],
    textbooks: [
      { title: 'The Craft of Research', authors: 'Booth, Colomb & Williams', note: '4th ed. — how to find, frame, and present academic arguments' },
      { title: 'Presentation Zen', authors: 'Garr Reynolds', note: 'Best book on making visual presentations clear and compelling' },
    ],
    searchTerms: [
      'How to present a technical seminar university',
      'Academic presentation slide design tips',
      'How to write a seminar paper',
      'Current cybersecurity research topics 2024',
    ],
    studyTips: [
      'Choose a seminar topic from an area where you have genuine curiosity — passion shows in delivery',
      'Rehearse your presentation at least three full times before the seminar day',
      'Anticipate questions: list five things an examiner might ask and prepare short, confident answers',
      'Clear slides with minimal text and good diagrams outperform bullet-point-heavy decks every time',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  400 LEVEL — FIRST SEMESTER  (16 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'CYB 411',
    slug: 'cyb-411',
    title: 'Systems Vulnerability Assessment and Testing',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Advanced vulnerability assessment methodology: systematic identification, testing, and mitigation of risks to a company\'s infrastructure. Covers penetration testing methodologies, information gathering, password cracking, social engineering, and reporting at a professional level.',
    topics: [
      'Definition of systems vulnerability; assessment and testing methods',
      'Mitigation of risks and enhancing infrastructure security',
      'Penetration testing methodologies, test planning and scheduling',
      'Information gathering and password cracking',
      'Social engineering, internal and external penetration testing',
      'Router penetration testing, security analysis, reporting and documentation',
      'Operating systems fingerprinting and remote network mapping',
      'Software and operational vulnerabilities and how to overcome them',
      'Attack surface analysis, fuzz testing, patch management, and security auditing',
    ],
    textbooks: [
      { title: 'The Hacker Playbook 3', authors: 'Peter Kim', note: 'Advanced red team operations; directly relevant' },
      { title: 'Penetration Testing', authors: 'Georgia Weidman', note: 'Systematic methodology that applies to formal assessments' },
    ],
    searchTerms: [
      'CVSS scoring system explained',
      'Nessus vulnerability scanner tutorial',
      'CVE NVD database how to use',
      'Vulnerability assessment report writing guide',
    ],
    studyTips: [
      'CVE/CVSS is the universal language of vulnerabilities — understand Base, Temporal, and Environmental scoring',
      'Practice building a full assessment report from scanner output — this is the deliverable clients pay for',
      'Connect each discovered vulnerability to the cryptography or network concepts from earlier courses',
      'OWASP WSTG (Web Security Testing Guide) is the free, comprehensive standard for web assessments',
    ],
  },
  {
    code: 'CYB 412',
    slug: 'cyb-412',
    title: 'Steganography: Access Methods and Data Hiding',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'The art and science of concealing information: history of secret writing, steganography vs encryption, text/image/audio/video steganography techniques, information hiding and steganalysis, and steganography detection.',
    topics: [
      'History of secret writing; overview of steganography',
      'Why steganography is important; steganography vs encryption',
      'Steganography types and methods: text, image, video and audio steganography',
      'Survey of steganography techniques for encrypting data',
      'Information hiding: steganography and steganalysis',
      'Data hiding methods, techniques, and access methods',
      'Steganographic algorithms and their security',
      'Steganography detection: finding images and verifying hidden content',
    ],
    textbooks: [
      { title: 'Hiding in Plain Sight: Steganography and the Art of Covert Communication', authors: 'Eric Cole', note: 'Accessible and comprehensive treatment of the field' },
      { title: 'Digital Steganography and Watermarking', authors: 'Fátima Terroso-Saenz et al.', note: 'Technical and mathematical treatment for advanced study' },
    ],
    searchTerms: [
      'Steganography explained tutorial with examples',
      'LSB image steganography Python tutorial',
      'Steganalysis how to detect hidden data',
      'Digital watermarking explained',
    ],
    studyTips: [
      'Implement a simple LSB steganography tool in Python — it takes one hour and permanently fixes the concept',
      'Understand why steganography matters for forensics: hidden data in images is a real-world challenge',
      'Tools like Steghide, OpenStego, and SilentEye are free — use them to both hide and detect',
      'Connect steganography to CYB 423 (Digital Forensics) — detection is a key forensic skill',
    ],
  },
  {
    code: 'CYB 413',
    slug: 'cyb-413',
    title: 'Cyber Threat Intelligence and Cyber Conflict',
    units: 2, level: 400, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    description: 'Techniques for detecting, responding to, and defeating organised cybercrime and cyberwar activities. Covers cyber threat intelligence (tactical, operational, and strategic), the kill chain, indicator lifecycle, and the evolution of counterterrorism and cyber conflict.',
    topics: [
      'Detecting, responding to, and defeating organised cybercrimes and cyberwar activities',
      'Analysing successful and unsuccessful APT and malware campaigns',
      'National and international policies for combating cyber terrorism',
      'Cyber threat intelligence: defining threats, indicators of compromise',
      'Tactical threat intelligence: the kill chain and intrusion analysis; indicator lifecycle',
      'Operational threat intelligence: information sharing, campaigns and threat actors',
      'Strategic threat intelligence: threat modelling, organisational security posturing',
      'Event recording and incident sharing; evolution of counterterrorism and cyber conflict',
    ],
    textbooks: [
      { title: 'The Threat Intelligence Handbook', authors: 'CrowdStrike', note: 'Free PDF from CrowdStrike; concise and current' },
      { title: 'Cyber War: The Next Threat to National Security', authors: 'Richard A. Clarke & Robert K. Knake', note: 'Excellent strategic overview of nation-state cyber operations' },
    ],
    searchTerms: [
      'MITRE ATT&CK framework tutorial beginner',
      'Threat intelligence types explained',
      'APT advanced persistent threat examples',
      'OSINT threat hunting techniques',
    ],
    studyTips: [
      'MITRE ATT&CK (attack.mitre.org) is free and should be explored thoroughly — it is the industry standard',
      'Use MISP or OpenCTI in a lab environment to understand how threat intel is operationalised',
      'APT case studies (APT28/Fancy Bear, APT41, Lazarus Group) provide excellent exam material',
      'Cyber conflict geopolitics from CYB 211 provides the strategic context — connect them explicitly',
    ],
  },
  {
    code: 'CYB 414',
    slug: 'cyb-414',
    title: 'Cloud Computing Security',
    units: 2, level: 400, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    description: 'Securing cloud environments: cloud service and deployment models, data-centre and virtualisation security, the cloud cube model, threat mitigation, and the standards (NIST, Cloud Security Alliance) that govern effective cloud management.',
    topics: [
      'Cloud computing, vendors, threats, and the cloud reference model',
      'Cloud-enabling technologies, services, and service-oriented architectures',
      'Cloud service models (IaaS, PaaS, SaaS) and deployment models (Public, Private, Hybrid, Community)',
      'Data centres: servers, storage, networking and virtualisation',
      'The cloud cube model and security for cloud computing',
      'Cloud threats, threat mitigation, and security risks',
      'Cloud Security Alliance, NIST Information Assurance Framework, cloud audit',
      'Cloud business continuity planning and architectural best practices for designing for the cloud',
      'Economics of the cloud; cloud strategy and standards',
    ],
    textbooks: [
      { title: 'Cloud Security and Privacy', authors: 'Tim Mather, Subra Kumaraswamy & Shahed Latif', note: 'Foundational and widely referenced text' },
      { title: 'AWS Certified Security Specialty Study Guide', authors: 'Chad Smith', note: 'Practical AWS security; aligns well with the practical portion' },
    ],
    searchTerms: [
      'AWS cloud security tutorial free',
      'Cloud shared responsibility model explained',
      'Cloud IAM identity access management explained',
      'Google Cloud security free training',
    ],
    studyTips: [
      'AWS, Azure, and Google Cloud all offer free tiers — create an account and explore IAM hands-on',
      'Cloud certifications (AWS Security Specialty, Azure SC-900) can be pursued during 400L',
      'Shared responsibility is the most exam-critical concept: draw the model from memory',
      'OWASP Cloud Top 10 is a free, authoritative reference for cloud-specific attack vectors',
    ],
  },
  {
    code: 'COS 411',
    slug: 'cos-411',
    title: 'Research Methodology and Technical Report Writing',
    units: 3, level: 400, semester: 1, lh: 45, ph: 0,
    subject: 'cs',
    crossDepartmental: true,
    description: 'The rigorous methods for conducting and communicating academic and technical research: research types and approaches, scientific investigation and problem formulation, data collection instruments, and the structure of technical reports. Essential preparation for the Final Year Project.',
    topics: [
      'Foundations, types, and approaches of research; significance of research',
      'Research methods versus methodology; the research process; criteria for good research',
      'Scientific investigation, problem formulation, and definition of the research problem',
      'Data collection: primary and secondary data; questionnaires and interview guidelines',
      'Research proposals, research plans, and hypothesis formulation and testing',
      'Literature review procedure and referencing cited works',
      'Sampling design: types and steps in sampling',
      'Methods of analysis: processing, interpretation, and presentation of results',
      'Types of reports; technical report writing, layout, and documentation standards',
    ],
    textbooks: [
      { title: 'Research Methods for Computer Science', authors: 'Stuart Shapiro', note: 'Focused on CS research specifically' },
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — the best book on technical writing in computing' },
    ],
    searchTerms: [
      'Research methodology for final year project computer science',
      'APA 7th edition referencing guide',
      'How to write a literature review step by step',
      'Research design types explained comparison',
    ],
    studyTips: [
      'This course is CYB 497 (FYP) preparation — every lecture directly applies to your final year project',
      'Use Zotero (free reference management software) to organise your literature from the start',
      'Plagiarism software is used on all final year projects: understand what constitutes academic misconduct',
      'Begin identifying your FYP topic in this course — approach your supervisor before the semester ends',
    ],
  },
  {
    code: 'CYB 497',
    slug: 'cyb-497',
    title: 'Final Year Project I',
    units: 3, level: 400, semester: 1, lh: 0, ph: 135,
    subject: 'siwes',
    description: 'The first phase of the capstone Final Year Project: an independent or group investigation of a cybersecurity-related problem, culminating in a written proposal covering the problem statement, objectives, scope, research gap, and proposed methodology. Supervised closely by an academic supervisor.',
    topics: [
      'Identifying a researchable cybersecurity project topic under supervisor guidance',
      'Literature review to establish the research gap',
      'Referencing and acknowledging sources of information',
      'Conceptualising and designing a research methodology',
      'Determining tools for analysing data based on research objectives',
      'Writing a coherent project proposal: problem, aim, objectives, scope, significance',
      'Estimated schedule of completion and resources needed',
      'Oral presentation of the written project proposal',
      'Emerging-trend topics: AI, steganography, quantum computing, big data, cloud security, ethical hacking, digital forensics, blockchain, IoT, 5G security',
    ],
    textbooks: [
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — essential for FYP writing' },
      { title: 'The Craft of Research', authors: 'Booth, Colomb & Williams', note: '4th ed. — for structuring your arguments and literature' },
    ],
    searchTerms: [
      'Final year project computer science cybersecurity ideas',
      'How to write a project proposal university',
      'Literature review for cybersecurity research',
      'System design for final year project',
    ],
    studyTips: [
      'Meet your supervisor regularly — at minimum twice a month; consistent updates prevent last-minute crises',
      'Choose a topic that either solves a real local cybersecurity problem or contributes something novel',
      'Begin writing from day one: a rough chapter is easier to improve than a blank page',
      'Document all design decisions and their justifications — examiners ask "why this approach?"',
    ],
  },
  {
    code: 'UUY-CYB 411',
    slug: 'uuy-cyb-411',
    title: 'Business Intelligence in Small and Medium-Scale Enterprises (BISME)',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'ins',
    description: 'Data analytics and business intelligence tools in the context of small and medium enterprises: BI applications in Excel and R, reporting tools, data warehousing and dimensional modelling, ETL, and how BI connects to big data and cloud computing.',
    topics: [
      'Overview of BI concepts and applications using Excel and R',
      'SQL Server Reporting Services, Power BI, and Tableau',
      'BI architecture: data warehouse and BI architecture framework',
      'BI development approaches: Kimball\'s bus architecture vs Inmon\'s Corporate Information Factory',
      'Data governance and the TDWI BI maturity model',
      'Data models: entity-relationship (E/R) and dimensional modelling; OLAP',
      'Data integration: extract, transform, load (ETL)',
      'Big data and cloud computing in relation to BI and business analytics',
    ],
    textbooks: [
      { title: 'Business Intelligence: A Managerial Perspective on Analytics', authors: 'Ramesh Sharda, Dursun Delen & Efraim Turban', note: '4th ed. — comprehensive and current' },
      { title: 'Data Warehousing in the Age of Big Data', authors: 'Krish Krishnan', note: 'Practical focus on modern data warehousing' },
    ],
    searchTerms: [
      'Power BI tutorial for beginners free Microsoft Learn',
      'Data warehouse star schema explained',
      'Business intelligence full course free',
      'ETL extract transform load process explained',
    ],
    studyTips: [
      'Microsoft Power BI Desktop is free — build a real dashboard using any Nigerian public dataset',
      'Star schema vs snowflake schema is exam-critical — understand the trade-offs with real examples',
      'Connect BI security to CYB 224 (Data Security) — BI platforms are high-value data targets',
      'Microsoft Learn (free) has a complete Power BI learning path with certifications',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  400 LEVEL — SECOND SEMESTER  (15 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'ENT 321',
    slug: 'ent-321',
    title: 'Venture Creation',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'ent',
    crossDepartmental: true,
    description: 'The practical mechanics of launching a business: opportunity identification, business planning, entrepreneurial finance, marketing and e-commerce, and applying emerging technologies to new ventures. Prepares graduates who want to start cybersecurity consultancies or technology ventures.',
    topics: [
      'Opportunity identification: sources of business opportunities in Nigeria, market gaps',
      'New business development: business planning and market research',
      'Entrepreneurial finance: venture capital, microfinance, business plan competitions',
      'Entrepreneurial marketing and e-commerce: B2B, B2C, C2C models',
      'Small business/family business management: leadership, basic bookkeeping',
      'Negotiation and business communication',
      'Opportunity discovery: idea generation, pitching, brainstorming',
      'Technological solutions for new ventures: AI, VR/MR, IoT, Blockchain, Cloud Computing',
    ],
    textbooks: [
      { title: 'Entrepreneurship: Successfully Launching New Ventures', authors: 'Barringer & Ireland', note: '6th ed. — builds on ENT 221' },
      { title: 'Zero to One', authors: 'Peter Thiel & Blake Masters', note: 'Essential startup thinking from one of Silicon Valley\'s most influential voices' },
    ],
    searchTerms: [
      'How to register a company in Nigeria CAC',
      'Business plan template cybersecurity consulting',
      'Startup funding Nigeria NIRSAL grants',
      'Cybersecurity consulting business how to start',
    ],
    studyTips: [
      'Actually complete the CAC registration process research — knowing the real steps sets exam answers apart',
      'Frame your venture creation around a cybersecurity service gap you identified during SIWES',
      'A completed business plan is typically the coursework submission — start it week one',
      'Connect this to ENT 221 — build on the feasibility study you conceptualised in 200L',
    ],
  },
  {
    code: 'CYB 421',
    slug: 'cyb-421',
    title: 'Ethical Hacking and Reverse Engineering',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Advanced offensive security: perimeter defences, privilege escalation, malware and social engineering, system and network hacking, web/wireless/mobile attacks, and reverse engineering of code and network exploits as a method for developing countermeasures.',
    topics: [
      'Ethical hacking strategies; how perimeter defences work and how intruders escalate privileges',
      'Intrusion detection, policy creation, and social engineering',
      'Attack phases; footprinting, reconnaissance, and scanning networks',
      'Enumeration, system hacking, and malware threats; sniffing; physical security',
      'Password vulnerabilities and cracking passwords',
      'Denial of service, session hijacking; hacking web servers and web applications, SQL injection',
      'Hacking wireless networks and mobile platforms',
      'Evading IDS, firewalls, and honeypots',
      'Reverse engineering of code and network exploits for countermeasure development',
    ],
    textbooks: [
      { title: 'Hacking: The Art of Exploitation', authors: 'Jon Erickson', note: '2nd ed. — the classic exploit development and low-level hacking text' },
      { title: 'Practical Malware Analysis', authors: 'Sikorski & Honig', note: 'The definitive malware analysis guide; pairs with lab work' },
    ],
    searchTerms: [
      'Ghidra reverse engineering tutorial beginner',
      'Buffer overflow exploit development tutorial',
      'Malware analysis practical course free',
      'OSCP preparation guide 2024',
    ],
    studyTips: [
      'Ghidra (from the NSA — free) is the primary tool for this course: practise weekly from 300L onward',
      'Buffer overflows become clearer once you understand assembly and memory layout — invest the time',
      'Malware.analysis.me and ANY.RUN provide safe malware samples and sandboxes for practice',
      'OSCP certification aligns almost perfectly with this course — consider it post-graduation',
    ],
  },
  {
    code: 'CYB 422',
    slug: 'cyb-422',
    title: 'Deep and Dark Web Security',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'The architecture, technologies, and security landscape of the dark web. Covers Tor network internals, cryptocurrency and crypto-trading, safe and anonymous access techniques, and the risks and monitoring of dark/deep web activity.',
    topics: [
      'Dark web, deep web, and clear net; how to get on the dark web',
      'Tor, onion routing, hidden services, and Tor alternatives (I2P, Matrix, Orbot, FreeNet)',
      'Privacy and anonymity; accessing the deep/dark web via VPN + Tor safely',
      'Cryptocurrencies: crypto trading, cryptomining, anonymity and security',
      'Navigating the dark web: search engines, the Hidden Wiki, darknet email and messaging',
      'Dark web markets and takedown case studies (Silk Road and others)',
      'Cyber threats and dangers on the deep/dark web; safety practices',
      'Dark web and deep web monitoring',
    ],
    textbooks: [
      { title: 'Dark Web Intelligence', authors: 'Joseph M. Straw', note: 'Practical intelligence-gathering focus' },
      { title: 'Tor and the Dark Art of Anonymity', authors: 'Lance Henderson', note: 'Technical overview of Tor internals and usage patterns' },
    ],
    searchTerms: [
      'How Tor network onion routing works explained',
      'Dark web cybercrime ecosystem overview',
      'OSINT dark web investigation techniques',
      'Silk Road darknet market case study FBI',
    ],
    studyTips: [
      'Use Tor Browser (legal) to understand the surface experience — but only on trusted, legal .onion sites',
      'Dark web case studies (Silk Road, BTC-e, AlphaBay takedowns) are the best exam material',
      'Distinguish carefully between anonymity and privacy — examiners look for precision',
      'OSINT Forum and Intel Techniques (Michael Bazzell) provide excellent, legal dark web investigation training',
    ],
  },
  {
    code: 'CYB 423',
    slug: 'cyb-423',
    title: 'Digital Forensics and Investigation Methods',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'The science and practice of digital forensics: securing, processing, acquiring, examining, and reporting digital evidence; the cyber trail; and the role of computers in crime, technology, and law. Covers portable and stationary device forensics.',
    topics: [
      'Introduction to digital forensics and digital evidence',
      'Challenging aspects of digital evidence; best practices in securing and processing evidence',
      'The cyber trail and its challenges; cyber auditing',
      'Brief history of computer crime and cybercrime investigation; evolution of investigative tools',
      'Role of computers in crime, technology, and law: jurisdiction, privacy, copyright, digital IP theft',
      'The investigative process and investigative reconstruction with digital evidence',
      'Techniques and tools for computer forensics: acquisition, preservation, recovery, analysis',
      'Forensic examination of portable and stationary storage devices, PDAs, and cell phones',
    ],
    textbooks: [
      { title: 'Digital Forensics with Open Source Tools', authors: 'Cory Altheide & Harlan Carvey', note: 'Free tool-focused; practical and current' },
      { title: 'The Art of Memory Forensics', authors: 'Ligh, Case, Levy & Walters', note: 'The definitive memory forensics reference; Volatility-based' },
    ],
    searchTerms: [
      'Digital forensics full course free Autopsy FTK',
      'Volatility memory forensics tutorial',
      'Chain of custody evidence digital forensics',
      'Mobile forensics Android iPhone investigation',
    ],
    studyTips: [
      'Autopsy (free, open source) is the standard forensic tool for this course — install and practise immediately',
      'DFIR.training has free forensic exercises and challenge images — the best way to build skill',
      'Chain of custody documentation is as important as technical analysis in real cases — know it perfectly',
      'Connect steganography detection (CYB 412) and network analysis (UUY-CYB 221) to forensics workflows',
    ],
  },
  {
    code: 'CYB 498',
    slug: 'cyb-498',
    title: 'Final Year Project II',
    units: 3, level: 400, semester: 2, lh: 0, ph: 135,
    subject: 'siwes',
    description: 'A continuation of CYB 497: completing the research methodology, statistical data analysis, prototype/simulation development, and the formal written report (chapters four and five), submitted for final grading with an oral defence before the external examiner.',
    topics: [
      'Continuation of CYB 497: research methodology and data analysis using statistical tools',
      'Performance evaluation of the research/development work',
      'Standard documentation of the project and referencing style',
      'Programming of the prototype or simulation model, where required',
      'Plagiarism and grammar checks',
      'Chapters four and five of the formal written report, approved by the supervisor',
      'PowerPoint presentation skills',
      'Oral defence of the project in the final examination before the external examiner',
    ],
    textbooks: [
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — final check of writing quality before submission' },
      { title: 'How to Write a Better Thesis', authors: 'Evans, Gruba & Zobel', note: '4th ed. — practical guidance at the final write-up stage' },
    ],
    searchTerms: [
      'Final year project write up guide university',
      'How to prepare for a project viva oral examination',
      'Academic thesis proofreading checklist',
      'How to format a dissertation APA 7',
    ],
    studyTips: [
      'Do not submit on the deadline — submit at least 48 hours early; technical problems are common',
      'Have at least two people proofread your thesis before submission',
      'For the viva, prepare a 10-minute verbal summary of your project and its contribution',
      'Know your own work deeply enough to answer "why did you not use X approach?" for every major decision',
    ],
  },
  {
    code: 'UUY-CYB 424',
    slug: 'uuy-cyb-424',
    title: 'Enterprise Security and Information Assurance',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Security governance at the enterprise level: information security principles, governance and risk management, security architecture and design, and end-to-end security of e-business and cyber environments — from data-centre security to backup and disaster recovery.',
    topics: [
      'Information security principles; governance and risk management',
      'Security architecture and design',
      'Security of e-business and cyber environments end-to-end, including data-centre and access security',
      'The information security phases: inspection, protection, detection, reaction, reflection',
      'Server and application security; virtual local area networks (VLANs)',
      'Secure access and financial transaction techniques',
      'Backup and disaster recovery techniques',
      'Software development security; law, investigations, and ethics',
    ],
    textbooks: [
      { title: 'Official (ISC)² Guide to the CISSP CBK', authors: 'Adam Gordon', note: '5th ed. — CISSP aligns closely with enterprise security management' },
      { title: 'Information Security Management Handbook', authors: 'Harold F. Tipton & Kevin Henry', note: '6th ed. — comprehensive enterprise security reference' },
    ],
    searchTerms: [
      'ISO 27001 ISMS implementation guide',
      'Enterprise security governance and risk management',
      'Data center security architecture explained',
      'CISSP study guide enterprise security domain',
    ],
    studyTips: [
      'ISO 27001 is the global standard for information security management — understand Annex A controls',
      'The five information security phases (inspection, protection, detection, reaction, reflection) are exam-critical — memorise the sequence',
      'The CISSP certification is the gold standard for enterprise security leadership — this course is a foundation',
      'Security policy writing is a practical exam task: practise writing an acceptable use policy from scratch',
    ],
  },
  {
    code: 'UNIUYO-CYB 425',
    slug: 'uniuyo-cyb-425-voip',
    title: 'VoIP and Multimedia Security',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'cyb',
    description: 'Securing voice-over-IP and multimedia traffic: VoIP network architecture and call-control protocols (H.323, SIP, MGCP), NAT/firewall traversal, and the encryption and best practices that mitigate VoIP-specific risks.',
    topics: [
      'Multimedia elements, characteristics, and storage formats',
      'Techniques for streaming data traffic: VoIP and multimedia traffic',
      'VoIP network architecture and protocols; SIP-based VoIP security issues',
      'Call-control protocols: H.323, Session Initiation Protocol (SIP), MGCP — threats and security holes',
      'How NAT and firewalls impact call setup, media streams, and latency',
      'SIP NAT traversal: STUN, TURN, and ICE',
      'VoIP risks, threats, vulnerabilities, and cryptographic protocols for VoIP security',
      'VoIP management tools and best practices for risk mitigation',
    ],
    textbooks: [
      { title: 'VoIP and PBX Security and Forensics', authors: 'Iosif I. Androulidakis', note: '2nd ed. — focused specifically on VoIP security threats' },
      { title: 'Hacking VoIP', authors: 'Himanshu Dwivedi', note: 'Practical, attack-focused treatment of VoIP protocol security' },
    ],
    searchTerms: [
      'SIP protocol security explained',
      'VoIP security threats and countermeasures',
      'STUN TURN ICE NAT traversal explained',
      'H.323 vs SIP VoIP protocols comparison',
    ],
    studyTips: [
      'Draw the SIP call-setup flow from memory — most exam questions probe understanding of the signalling sequence',
      'Understand why NAT breaks VoIP by default before learning STUN/TURN/ICE as the fix — the problem motivates the solution',
      'Connect VoIP encryption (SRTP, TLS for SIP) back to the cryptography course (CYB 311)',
      'Wireshark can capture and analyse real SIP/RTP traffic in a lab — practise identifying a call setup in a capture',
    ],
  },
];

// ─── Lookup helpers ─────────────────────────────────────────────

export function getCourseBySlug(slug) {
  return courses.find(c => c.slug === slug);
}

export function getCoursesByLevel(level) {
  return courses.filter(c => c.level === level);
}

export function getCoursesByLevelAndSemester(level, semester) {
  return courses.filter(c => c.level === level && c.semester === semester);
}

// The subset of courses shared across science/engineering programmes at
// University of Uyo (GST, MTH, PHY, STA, COS, CSC, ENT, INS, UUY-CSC) — used
// by the 'general' foundation-mode department for students outside Cybersecurity.
export function getCrossDepartmentalCourses() {
  return courses.filter(c => c.crossDepartmental);
}

export const firstSemesterCourses = courses.filter(c => c.semester === 1 && c.level === 200);
export const secondSemesterCourses = courses.filter(c => c.semester === 2 && c.level === 200);

export const LEVELS = [100, 200, 300, 400];

export const levelMeta = {
  100: { label: '100L', description: 'First Year', totalUnits: courses.filter(c => c.level === 100).reduce((s, c) => s + c.units, 0) },
  200: { label: '200L', description: 'Second Year', totalUnits: courses.filter(c => c.level === 200).reduce((s, c) => s + c.units, 0) },
  300: { label: '300L', description: 'Third Year (incl. SIWES)', totalUnits: courses.filter(c => c.level === 300).reduce((s, c) => s + c.units, 0) },
  400: { label: '400L', description: 'Final Year', totalUnits: courses.filter(c => c.level === 400).reduce((s, c) => s + c.units, 0) },
};
