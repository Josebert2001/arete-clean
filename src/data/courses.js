import { cyb224Quiz } from './lectureNotes/cyb224Quiz.js';
import { cyb222Quiz } from './lectureNotes/cyb222Quiz.js';
import { uuyCyb222Quiz } from './lectureNotes/uuyCyb222Quiz.js';
// Extension is required: scripts/validate-modules.mjs imports this file through
// plain Node ESM, which does not do Vite's extensionless resolution.
import { cyb121Quiz } from './lectureNotes/cyb121Quiz.js';
import { cyb123Quiz } from './lectureNotes/cyb123Quiz.js';
import { cyb122ExamPrep } from './lectureNotes/cyb122ExamPrep.js';
import { cyb221ExamPrep } from './lectureNotes/cyb221ExamPrep.js';
import { cyb224ExamPrep } from './lectureNotes/cyb224ExamPrep.js';
import { cyb224Map } from './lectureNotes/cyb224Map.js';
import { cyb221Quiz } from './lectureNotes/cyb221Quiz.js';
import { cyb222ExamPrep } from './lectureNotes/cyb222ExamPrep.js';
import { cybInnovationExamPrep } from './lectureNotes/cybInnovationExamPrep.js';
import { cos221ExamPrep } from './lectureNotes/cos221ExamPrep.js';
import { ins224ExamPrep } from './lectureNotes/ins224ExamPrep.js';
import { ent221Quiz } from './lectureNotes/ent221Quiz.js';

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
    description: 'Classical mechanics: vectors, kinematics, Newtonian dynamics, conservation principles, rotational motion, and gravitation. Builds the physical intuition that underpins electronics, networking signals, and the hardware concepts met in later computing courses.',
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
    description: 'The language of data: types, sources, and methods of data collection; presentation, errors and approximations; and the core measures used to summarise a dataset. A foundation for every analysis task in research and data-driven decision-making.',
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
    description: 'Diagnosing and resolving common hardware and software problems across PCs, laptops, tablets, and mobile phones. Covers network connectivity/security troubleshooting, backup and restore, and virus/anti-virus procedures — practical skills every computing professional needs.',
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
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-08-05' },
    title: 'Nigerian Peoples and Culture',
    units: 2, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'gst',
    crossDepartmental: true,
    description: 'An introduction to Nigeria\'s ethnic diversity, cultural heritage, colonial and political history, and nation-building challenges. Provides context for the social and policy dimensions of technology in Nigeria.',
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
      'Cybercrime and digital-policy topics connect directly to computing degrees — pay extra attention there',
      'Past questions drive most of the exam content for GST courses — collect and study them',
    ],
    // Transcribed from the Directorate of General Studies' official GST 121
    // textbook (May 2024) — see src/data/lectureNotes/gst121.js for provenance
    // and the full 17-chapter table of contents.
    notesKey: 'gst121',
    // Chapters 1–2 are the only ones transcribed so far. Chapter 1 fully covers
    // the 3Rs and national orientation strategies, and touches the Civil War
    // and the indigenization/self-reliance material; Chapter 2 fully covers the
    // apprenticeship strand of the trade/self-reliance topic. Kept here rather
    // than in the shared note file because Data Science takes GST 121 against
    // its own outline.
    noteCoverage: {
      1: { covers: [8], partial: [4, 5] },
      2: { covers: [5] },
    },
  },
  {
    code: 'COS 121',
    slug: 'cos-121',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-08-01' },
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
    notesKey: 'cos121',
  },
  {
    code: 'MTH 121',
    slug: 'mth-121',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-08-02' },
    title: 'General Mathematics II (Calculus)',
    units: 2, level: 100, semester: 2, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'Single-variable calculus: limits, continuity, differentiation, integration, and their applications. Builds the analytical foundation for probability, statistics, and the signal theory used across science and engineering.',
    // Matched to the departmental workbook the lecture notes are transcribed
    // from. The outline previously opened with trigonometric identities and
    // closed with ordinary differential equations; MTH 121 teaches neither, so
    // both items sat permanently at "no notes yet".
    topics: [
      'Functions of a real variable: domain, range, composition',
      'Limits, continuity, and the derivative',
      'Rules of differentiation: product, quotient, chain',
      'Implicit, parametric, exponential and logarithmic differentiation',
      'Applications of derivatives: tangents, rates, max/min',
      'Definite and indefinite integrals',
      'Techniques of integration: substitution, by parts, partial fractions',
      'Applications of integration: area, volume',
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
    // Transcribed from the Department of Mathematics' workbook ("MTH 121:
    // General Mathematics II — Workbook Manual 2025") — see
    // src/data/lectureNotes/mth121.js for provenance and the errata list. All
    // five units, plus the closing tutorial questions.
    notesKey: 'mth121',
    // Which of the topics above each workbook unit reaches. Lives here rather
    // than in the shared note file because Data Science takes the same MTH 121
    // against a different outline. Unit 6 is the tutorial question set, so it
    // marks nothing as taught.
    noteCoverage: {
      1: { covers: [1], partial: [2] },  // functions; the limits/continuity half of 2
      2: { covers: [2, 3, 4] },          // the derivative closes out 2
      3: { covers: [5] },
      4: { covers: [6, 7] },
      5: { covers: [8] },
    },
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
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-08-08' },
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
    // Section 1 of the departmental practical manual — the four theoretical
    // background chapters. See src/data/lectureNotes/phy128.js for provenance
    // and the errata list. Section 2 (the experiments) is not transcribed yet.
    notesKey: 'phy128',
    // Which of the topics above each manual chapter reaches. Lives here rather
    // than in the shared note file because Data Science takes the same PHY 128
    // against a different outline. Chapters 2 (optics) and 3 (sound) are
    // deliberately absent: this outline is an electricity-and-magnetism one, so
    // those chapters are background the manual supplies beyond the syllabus.
    noteCoverage: {
      1: { covers: [5, 7], partial: [1, 2, 3] },
      4: { covers: [4], partial: [3, 6] },
    },
  },
  {
    code: 'UUY-CYB 121',
    slug: 'uuy-cyb-121',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    // Transcribed from the CYB 121 study guide (lecture notes of Sir Robinson
    // and Sir Ubong Ntia; practical cabling by Mr. Mike Umeh) — see
    // src/data/lectureNotes/cyb121.js for provenance and the coverage mapping.
    // The guide stops at the data link / physical layers, so topics 6-8
    // (network, transport and application layers) are not covered by it.
    notesKey: 'cyb121',
    // CBT paper, so an MCQ bank rather than examPrep. Drawn note by note from
    // the guide — see src/data/lectureNotes/cyb121Quiz.js. It stops where the
    // guide stops: topics 6-8 are not examined by this bank.
    quiz: cyb121Quiz,
  },
  {
    code: 'UUY-CYB 123',
    slug: 'uuy-cyb-123',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    notesKey: 'cyb123',
    // CBT paper, so an MCQ bank rather than examPrep. Drawn note by note from
    // the manual — see src/data/lectureNotes/cyb123Quiz.js. It stops where the
    // notes stop: topic 7 (XSS/CSRF) is not examined by this bank.
    quiz: cyb123Quiz,
  },
  {
    code: 'UUY-CYB 122',
    slug: 'uuy-cyb-122',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-08-08' },
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
      'Scope triage: the examinable core is what was actually lectured — Lectures 1–4, which are sections 7–12 of the lecture notes (Whitman & Mattord chapters 1–4). Cryptography/steganography and funds transfer/e-voting sit in the course outline but were never taught, so revise them last if at all',
      'Written paper, not CBT: a 10-mark question wants roughly five distinct points, each named and then explained in a sentence or two. One long unbroken paragraph scores badly even when everything in it is correct — the marker is counting points',
      'Structure every long answer the same way: define the term, explain the mechanism, give an example or a diagram, then link it to a neighbouring concept. A repeatable skeleton stops you freezing on a question you half-know',
      'Practise reproducing the diagrams from memory with their labels — the McCumber Cube, the TCP three-way handshake, the SDLC waterfall, top-down vs bottom-up. "With the aid of a diagram" is a standard question stem and the labels are where the marks are',
      'On a four-from-six paper in two hours, budget about 30 minutes per question: 5 planning the points, 20 writing, 5 checking. Read all six and pick your four before you write a single word',
      'Where a list is long (the fifteen threat categories, for instance) the question will ask for "any five" — so learn five you can explain properly rather than fifteen you can only name',
    ],
    // Sections 1-6 transcribed from the department's "Principles and Practice
    // of Information Security: Polished Master Study Guide"; sections 7-12
    // from the lecturer's own combined slide deck for Lectures 1-4 (Whitman &
    // Mattord, "Principles of Information Security", 4th ed., Chapters 1-4).
    // See src/data/lectureNotes/cyb122.js for full provenance and the
    // coverage mapping. Together they never reach cryptography/steganography
    // (topic 4) or funds-transfer/e-voting security (topic 6).
    notesKey: 'cyb122',
    // Written-exam bank, not MCQ — this course is examined on paper. See
    // src/data/lectureNotes/cyb122ExamPrep.js for the question types and why
    // coverage is weighted towards the lectured sections.
    examPrep: cyb122ExamPrep,
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
      'Ethical technology topics (privacy, AI, cybercrime) connect directly to your computing courses',
      'Argument mapping: writing out premises and conclusions explicitly prevents exam errors',
    ],
  },
  {
    code: 'COS 211',
    slug: 'cos-211',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-02' },
    title: 'Computer Programming I',
    units: 3, level: 200, semester: 1, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    // Taught in MATLAB (scientific programming), not Java — the lecturer's notes
    // and the lab manual "Problem Solving and Programming with MATLAB" are both
    // MATLAB throughout. The Java track belongs to COS 221.
    notesKey: 'cos211',
    // Notes 1–6 are the class notes, 7–12 the lab manual's Modules 1–6.
    noteCoverage: {
      1: { covers: [1, 2, 3], partial: [4] },
      2: { covers: [5], partial: [6] },
      3: { partial: [9] },
      4: { partial: [9, 10, 11] },
      5: { covers: [13], partial: [3] },
      6: { partial: [9, 10, 11] },
      7: { covers: [4], partial: [3] },
      8: { covers: [6, 7], partial: [10] },
      9: { covers: [8] },
      10: { covers: [9] },
      11: { partial: [10] },
      12: { covers: [12] },
    },
    description: 'An introduction to scientific programming in MATLAB. You learn to solve a problem on paper first — identifying it, designing an algorithm, writing pseudocode and drawing a flowchart — and then to code it: variables and data types, operators and precedence, decisions and loops, matrices, functions, plotting and object-oriented programming. Taught from the lab manual Problem Solving and Programming with MATLAB.',
    topics: [
      'Scientific problem solving: identifying the problem, designing an algorithm, implementing, testing and validating',
      'Programming fundamentals: data, data types, variables and keywords; syntax, logical and run-time errors',
      'Algorithms: characteristics and properties, designing an algorithm, poorly vs well-structured algorithms, pseudocode',
      'Flowcharts: the standard symbols, flowcharting rules, and worked examples with decisions and loops',
      'Programming paradigms: imperative (procedural, object-oriented), declarative, functional and data-driven',
      'MATLAB variables and data types: naming rules; numeric, logical, character/string and complex types; type conversion',
      'Operator precedence and evaluating expressions in MATLAB',
      'Relational and logical operators; element-wise vs short-circuit logic',
      'Flow control: if/elseif/else, switch, for and while loops, break and continue',
      'Arrays and matrices: indexing, matrix operations and functions (det, inv, eig, transpose); structures, cell arrays and tables',
      'User-defined functions; plotting and visualisation (plot, histogram, bar)',
      'Object-oriented programming in MATLAB: classdef, properties, methods and inheritance',
      'Generative AI for programmers: prompt engineering and the limits of AI-written code',
    ],
    textbooks: [
      { title: 'MATLAB: A Practical Introduction to Programming and Problem Solving', authors: 'Stormy Attaway', note: 'Algorithms, flowcharts and MATLAB in the same order this course takes them' },
      { title: 'Essential MATLAB for Engineers and Scientists', authors: 'Brian H. Hahn & Daniel T. Valentine', note: 'Short, example-led, and strong on matrices and plotting' },
    ],
    searchTerms: [
      'MATLAB Onramp free course MathWorks',
      'MATLAB tutorial for beginners full course',
      'flowchart and pseudocode tutorial for beginners',
      'MATLAB matrix operations and plotting tutorial',
    ],
    studyTips: [
      'No MATLAB licence? GNU Octave is free and runs almost every listing in these notes unchanged — practise on it daily',
      'Draw the flowchart before you write the code: the lab practicals ask for both, and the symbols and flowcharting rules are examined directly',
      'Learn the confusable pairs cold — = vs ==, ^ vs .^, & vs && — the manual\'s "Common Errors to Avoid" table is exam material',
      'Trace every loop by hand, writing down the loop variable and the running total on each pass, as the notes do for the factorial and series examples',
      'Use the AI Tutor and "Explain this code" freely, but run and test what they tell you — the course\'s own lecture on generative AI makes exactly that point',
    ],
  },
  {
    code: 'CYB 211',
    slug: 'cyb-211',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-02' },
    title: 'Introduction to Cybersecurity and Strategy',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    // Data Science takes this course too, so its uploads pool under 'general'
    // for both departments. Not crossDepartmental: it is a CYB-owned course,
    // not one of the foundation courses every UniUyo programme takes.
    sharedMaterials: true,
    notesKey: 'cyb211',
    // Note 1 (law, regulation, national policy, GDPR) covers item 7 and reaches
    // into 8 (privacy, impact) and 9 (ISO/IEC 27001). Note 2 (cryptography,
    // RSA) covers the cryptography half of item 4 and the CIA/authentication/
    // non-repudiation goals of item 1.
    noteCoverage: {
      1: { covers: [7], partial: [8, 9] },
      2: { partial: [1, 4] },
    },
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
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-02' },
    title: 'Cybercrime, Law and Countermeasures',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    notesKey: 'cyb213',
    // Not transcribed yet: international jurisdiction (item 7's second half)
    // and cyber law in Europe, the Americas and Asia (item 8).
    noteCoverage: {
      1: { partial: [1] },
      2: { partial: [3] },
      3: { partial: [1] },
      4: { partial: [2] },
      5: { partial: [2, 3] },
      6: { partial: [2] },
      7: { covers: [4] },
      8: { partial: [3] },
      9: { partial: [5] },
      10: { covers: [6] },
      11: { partial: [7] },
      12: { partial: [9] },
    },
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
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-10-25' },
    title: 'Introduction to Software Engineering',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'sen',
    notesKey: 'sen211',
    // Topic 1 covers outline item 1; topics 2–3 (SDLC, process models + CMMI)
    // cover part of item 2 — process metrics are not transcribed yet.
    noteCoverage: {
      1: { covers: [1] },
      2: { partial: [2] },
      3: { partial: [2] },
    },
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
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
    title: 'Entrepreneurship and Innovation',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'ent',
    crossDepartmental: true,
    description: 'Business thinking for technical students: entrepreneurship and intrapreneurship theory, entrepreneurial characteristics and thinking, innovation, enterprise formation, and e-commerce principles. Directly applicable to consulting, startup, and freelance careers in technology.',
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
      'Apply every concept to a technology business idea from your own field — it makes abstract topics concrete and exam-ready',
      'The Business Model Canvas is the most exam-critical framework — practise filling it in for different scenarios',
      'Nigeria\'s NITDA and other agencies offer technology grants — research them as part of your learning',
      'This course matters for your career: many technology professionals eventually consult or freelance',
    ],
    notesKey: 'ent221',
    // Chapters 1–18 of the workbook against our outline. The indices are ours
    // alone — Data Science takes ENT 221 too, off a differently-worded outline,
    // so it keeps its own map.
    //
    // Item 6 (enterprise formation) is deliberately three `partial`s rather than
    // one `covers`: chapter 7 does formation/partnership/networking, 8 does the
    // ownership forms and 9 the business plan, and no single chapter carries the
    // whole item. Item 8 (entrepreneurship in Nigeria) works the same way across
    // chapters 3 and 10–14 — chapter 14 adds non-governmental support
    // institutions (incubators, accelerators, non-profits, associations) to
    // chapter 13's governmental ones. Item 9 (e-commerce) sat uncovered through
    // chapter 13 — chapter 15 finally reaches it, dedicated entirely to
    // e-commerce principles.
    //
    // Item 7 (contemporary entrepreneurship issues: intellectual property,
    // virtual office, networking) is named after exactly three sub-topics, and
    // between them chapters 16 and 18 now teach all three: chapter 16
    // (16.5–16.9) is intellectual property in depth; chapter 18 dedicates 18.3
    // to virtual offices (plus mixed reality) and 18.4 to networking. Both are
    // marked `covers` rather than `partial` for that reason, even though each
    // chapter individually only carries part of the item. Chapter 17
    // (technopreneurship) also lands a lighter partial on item 7 via its own
    // IP subsection (17.6.2); the rest of that chapter's blockchain/cloud/
    // IoT/AI material, and chapter 18's sections on skills/tech solutions and
    // sustainability/CSR, have no home in our outline.
    noteCoverage: {
      1: { covers: [1], partial: [2, 3] },
      2: { partial: [3] },
      3: { partial: [8] },
      4: { covers: [2] },
      5: { covers: [4] },
      6: { covers: [5] },
      7: { partial: [6, 7] },
      8: { partial: [6] },
      9: { partial: [6] },
      10: { partial: [8] },
      11: { partial: [8] },
      12: { partial: [8] },
      13: { partial: [8] },
      14: { partial: [8] },
      15: { covers: [9] },
      16: { covers: [7] },
      17: { partial: [7] },
      18: { covers: [7] },
    },
    // Shared with Data Science — see src/data/lectureNotes/ent221Quiz.js.
    // 367 questions across all 18 chapters; one bank for both catalogues
    // since it tests the shared lecture notes, not either outline.
    quiz: ent221Quiz,
  },
  {
    code: 'COS 221',
    slug: 'cos-221',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-08-22' },
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
    notesKey: 'cos221',
    // Shared with Data Science — see src/data/lectureNotes/cos221.js. Modules
    // 1-4 (fundamentals, flow control, arrays, methods) are COS 211 review and
    // land on no item here; module 7 is not yet transcribed. Items 3-5
    // (Collections API, searching/sorting, recursion) have no module reaching
    // them yet either — left uncovered rather than force-fit, same as ENT 221's
    // item 9 before chapter 15 arrived.
    noteCoverage: {
      5: { partial: [1] },
      6: { covers: [1], partial: [2] },
      8: { covers: [7] },
      12: { covers: [8], partial: [6] },
    },
    examPrep: cos221ExamPrep,
  },
  {
    code: 'INS 224',
    slug: 'ins-224',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    notesKey: 'ins224',
    examPrep: ins224ExamPrep,
  },
  {
    code: 'CYB 224',
    slug: 'cyb-224',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    // Notes 4-22 are transcribed from the lecturer's scanned handout, printed
    // pages 3-71, and follow its wording and headings.
    //
    // Notes 23-26 are neither transcribed nor from a class session: they are
    // authored from the course outline above and the two set texts, to cover
    // outline items 2, 4, 5 and 6 (big data technology and adoption; the system
    // and management view; the systems-design process and lifecycle security
    // management; policies and methodologies). None of that was ever handed
    // out, and the exam draws on it. Each of the four says so in a leading
    // `note` block, and the noteMap places them where they belong in the
    // reading order rather than at the end where they are printed.
    //
    // Notes 1-3 come from the class sessions instead, and are labelled as such
    // on the page. They are not in the workbook: the 5Vs, operational-vs-
    // analytical and big-data-skills material appears nowhere in any of the
    // five scanned PDFs or their six transcriptions, and two of the three carry
    // class dates the rest do not. The one genuine overlap is the Vs - the
    // workbook prints Volume, Velocity and Variety on page 3 as "The 3Vs of Big
    // Data Security Challenges" (note 4), framed as why traditional controls
    // fail at scale, while the class session gave all five as characteristics
    // of big data. Note 1 carries a cross-reference so students do not read the
    // two as contradicting each other.
    //
    // Printing slips in the handout that these notes silently normalise, so a
    // future editor does not "correct" them back:
    //   - p.16 numbers both sub-headings "i." (Pattern Recognition and Anomaly
    //     Detection); the second is rendered "ii." here.
    //   - pp.42-43 leave Pandas unnumbered and then run "i. NumPy", "ii.
    //     Matplotlib", "iii. Seaborn", so the run starts one item late.
    //   - p.62 numbers Pandas "i." but p.63 numbers Scikit-Learn "2."; both are
    //     rendered as roman numerals here.
    //   - pp.40-41 truncate three equations and drop two numerals; recorded on
    //     the page itself, in note 14, because a student needs to know.
    //   - p.55 heads the K-Means material "THREAT ANALYSIS USING SUPPORT VECTOR
    //     MACHINE", which describes neither that page nor the ones after it.
    //   - Bullet lists print inconsistently with and without terminal full
    //     stops; these notes punctuate them consistently.
    //
    // The figures are redrawn for these notes. The handout prints four diagrams
    // and numbers none of them: the classification tree (p.20) and three SVM
    // diagrams (two on p.22, one on p.23). All four are reproduced; the rest of
    // the figures visualise tables the handout prints as text, and their captions
    // say so.
    notesKey: 'cyb224',
    quiz: cyb224Quiz,
    // Written-exam bank alongside the MCQ bank above. The workbook's own
    // activities are written ones — "define", "differentiate between", "with the
    // aid of a diagram", "state the steps" — so the course needs both forms.
    // See src/data/lectureNotes/cyb224ExamPrep.js.
    examPrep: cyb224ExamPrep,
    // How the 26 topics relate to each other. The notes come from three sources
    // and no algorithm is taught in one place, so each topic needs to say what
    // completes it. See src/data/lectureNotes/cyb224Map.js.
    noteMap: cyb224Map,
  },
  {
    code: 'CYB 222',
    slug: 'cyb-222',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    notesKey: 'cyb222',
    quiz: cyb222Quiz,
    // Written-exam bank — the group research topics rewritten as define /
    // list-and-explain / differentiate questions. See
    // src/data/lectureNotes/cybInnovationExamPrep.js.
    examPrep: cybInnovationExamPrep,
  },
  {
    code: 'UUY-CYB 221',
    slug: 'uuy-cyb-221',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    notesKey: 'cyb221',
    quiz: cyb221Quiz,
    // Written-exam bank alongside the MCQ one — the manual's own questions are
    // "define", "list and explain any five", "with the aid of a diagram". See
    // src/data/lectureNotes/cyb221ExamPrep.js.
    examPrep: cyb221ExamPrep,
  },
  {
    code: 'UUY-CYB 222',
    slug: 'uuy-cyb-222',
    contentReview: { owner: 'Areté editorial (student-built)', reviewed: '2026-11-03' },
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
    // Topics 1–3 and 7–10 are the class lecture notes. Topics 11 and 13, and
    // the additions marked as exam wording throughout, come from the lecturer's
    // handout "Cybersecurity Concepts: Web and Mobile Application Security"
    // plus the exam guidance he gave in class (the six flagged questions in
    // Topic 13). Topic 12 is the OWASP Top 10, worked up from Ian Ross's
    // ANZTB 2017 talk "Introduction to web security" — it teaches the 2013
    // edition, because the figures and ratings are that edition's, and closes
    // with a 2013→2021 mapping so nobody mistakes it for the current list.
    //
    // Topics 4–6 cover outline item 3 (secure mobile development), which the
    // class notes leave uncovered; they sit at positions 4–6 so the topics read
    // in outline order, which is why the later numbers skip. They were one
    // 351-line topic until it was split three ways — threats and developer
    // practice, then the two platform security models, then the bearer layers
    // (WAP, Bluetooth, SMS/MMS, location) that sit below both. No content from
    // the handout was dropped in the split: the OWASP Mobile Top 10 moved up
    // beside the other risk material, and the single Key Takeaways list was
    // rewritten as one per topic.
    notesKey: 'uuyCyb222',
    quiz: uuyCyb222Quiz,
    // This course is examined on paper, not by CBT, so the written bank is the
    // one that matches the exam — the MCQs above stay as low-stakes recall
    // practice. See src/data/lectureNotes/cyb222ExamPrep.js for why the two
    // banks are kept separate.
    examPrep: cyb222ExamPrep,
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
      'Tie cyber-conflict topics back to your own security or computing courses for cross-course reinforcement',
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
    description: 'Foundations of AI: intelligent agents, search algorithms, knowledge representation, semantic networks, natural language processing, and expert systems. Directly relevant to AI-powered anomaly detection, prediction, and automated analysis across computing.',
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
      'Connect AI to a concrete application in your own field in every exam answer — applied answers score higher',
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
    description: 'The practical mechanics of launching a business: opportunity identification, business planning, entrepreneurial finance, marketing and e-commerce, and applying emerging technologies to new ventures. Prepares graduates who want to start consultancies or technology ventures.',
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
      'Frame your venture creation around a real service gap you identified during SIWES',
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
