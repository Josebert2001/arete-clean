// B.Sc. Data Science — University of Uyo, Faculty of Computing.
//
// Course structure (codes, titles, units, LH/PH, level, semester) is transcribed
// from Chapter 4 §4.1 of the Students' Information Handbook, pp. 29–34. Every
// course in the programme is compulsory ("C" status) — there are no electives,
// which is why no course here carries an elective flag.
//
// Descriptions, topics, textbooks, searchTerms and studyTips are authored study
// material, not handbook text — the handbook lists only the structure tables.
// Treat the structure as authoritative and the content as a well-informed guide.
//
// Deliberately standalone: this file must NOT import from courses.js. Each
// department catalogue is a separate Vite chunk (see departments.js), so
// reaching into the Cybersecurity catalogue for the ~24 shared courses would
// drag its whole ~800 kB payload into a Data Science student's bundle. The
// shared courses are re-authored here with Data-Science framing instead.
//
// The non-DTS courses — those owned by other departments and taken across
// several UniUyo programmes — carry crossDepartmental: true, matching what the
// flag means in courses.js: a foundation course every programme takes. A Data
// Science student gets the whole catalogue either way; the flag drives which
// course_materials pool the uploads land in (materialsDepartmentFor).
//
// CYB 211 is the exception and uses sharedMaterials instead — Cybersecurity owns
// it and both departments take it, so its notes pool, but it is not a foundation
// course and must not join the foundation catalogue. See departments.js for why
// the two flags are separate.
//
// Lecture notes are the ONE thing that is shared rather than re-authored:
// they are transcribed from the lecturer's own workbook, so GST 121 is the
// same GST 121 whichever programme a student is enrolled on. Course prose
// (description/topics/studyTips) stays department-specific; notes come from
// the single copy in ./lectureNotes/ so a fix there reaches every department.
import { ent221Quiz } from './lectureNotes/ent221Quiz.js';

export const courses = [

  // ═══════════════════════════════════════════════════════════════
  //  100 LEVEL — FIRST SEMESTER  (18 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 111',
    slug: 'gst-111',
    title: 'Communication in English',
    units: 2, level: 100, semester: 1, lh: 15, ph: 45,
    subject: 'gst',
    crossDepartmental: true,
    description: 'Develops the English language skills required for academic and professional success: sound patterns, word classes, sentence construction, logical/critical reasoning, and writing craft. Data science is a communication discipline as much as a technical one — an analysis nobody can read is an analysis nobody will act on.',
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
      'How to write a data analysis report',
      'Technical writing basics for science students',
    ],
    studyTips: [
      'Do not treat GST courses as unimportant — writing skills decide the grade on every project report you will ever submit',
      'Practice essay writing by timing yourself: 45 minutes per essay, as you will in the exam',
      'The inductive/deductive reasoning section is the same logic you will formalise in MTH 212 and use in statistical inference — learn it properly once',
      'Keep a small notebook of common grammar errors you make and review it weekly',
    ],
  },
  {
    code: 'MTH 111',
    slug: 'mth-111',
    title: 'General Mathematics I',
    units: 2, level: 100, semester: 1, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'Algebra and trigonometry for university-level computation: set theory, real and complex numbers, sequences and series, quadratic equations, and circular measure. The algebraic fluency built here is assumed by every later mathematics, statistics and machine-learning course in the programme.',
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
      'Set theory here is the direct foundation for MTH 212 and for how you will reason about probability events in DTS 226',
      'Keep a formula sheet and update it every week; review before each lecture',
      'Khan Academy is free and covers every topic in this course at the right level',
    ],
  },
  {
    code: 'PHY 111',
    slug: 'phy-111',
    title: 'General Physics I',
    units: 2, level: 100, semester: 1, lh: 30, ph: 0,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Classical mechanics: vectors, kinematics, Newtonian dynamics, conservation principles, rotational motion, and gravitation. Beyond the physics itself, this is where you first meet a mathematical model of a real system — the same modelling instinct data science applies to data.',
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
      'Vectors for physics students tutorial',
    ],
    studyTips: [
      'Always draw a free-body diagram before attempting any mechanics problem',
      'Learn units and dimensions first — dimensional analysis catches most errors, and the same habit catches unit bugs in real datasets',
      'Vector operations here are exactly the vector operations you will use on feature vectors in machine learning — the notation carries over',
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
    description: 'Laboratory practicals accompanying PHY 111. Quantitative measurement, treatment of measurement errors, and graphical analysis. For a data scientist this is the first formal training in error, uncertainty, and honest reporting of a number — the discipline the whole degree rests on.',
    topics: [
      'Laboratory safety and quantitative measurement techniques',
      'Treatment of measurement errors: systematic vs random error, propagation of uncertainty',
      'Significant figures and the honest reporting of a measured value',
      'Simple pendulum, Hooke\'s law and elasticity experiments',
      'Vernier calliper and micrometer screw gauge measurement',
      'Viscosity, surface tension and density determinations',
      'Graphical analysis: choosing axes, plotting, drawing the line of best fit, extracting a gradient',
      'Laboratory report writing: aim, apparatus, procedure, results, discussion, conclusion',
    ],
    textbooks: [
      { title: 'Practical Physics', authors: 'G.L. Squires', note: '4th ed. — the classic on measurement and error analysis' },
      { title: 'An Introduction to Error Analysis', authors: 'John R. Taylor', note: '2nd ed. — the clearest treatment of uncertainty you will find' },
    ],
    searchTerms: [
      'Error analysis and uncertainty propagation tutorial',
      'How to plot a line of best fit and find the gradient',
      'Physics practical lab report format',
      'Vernier calliper and micrometer reading practice',
    ],
    studyTips: [
      'Record raw readings immediately and never "adjust" a number in your lab book — this is the same integrity rule that governs data science',
      'Plot your graph in pencil first; examiners award marks for axis labels, units and scale, not just the line',
      'Learn error propagation properly now — it is the physical-world version of confidence intervals in DTS 224',
      'Write the report the same day you do the experiment, while the procedure is still fresh',
    ],
  },
  {
    code: 'STA 111',
    slug: 'sta-111',
    title: 'Descriptive Statistics',
    units: 3, level: 100, semester: 1, lh: 45, ph: 0,
    subject: 'stats',
    crossDepartmental: true,
    description: 'The first statistics course of the degree and arguably the most important: how to collect, organise, summarise and present data honestly. Everything from exploratory data analysis to the summary tables in your final-year project traces back to this course.',
    topics: [
      'Statistical data: types, sources, methods of collection',
      'Presentation of data: tables, charts, frequency distributions, histograms and ogives',
      'Measures of location: mean, median, mode, quartiles, deciles and percentiles',
      'Measures of dispersion: range, mean deviation, variance, standard deviation, coefficient of variation',
      'Measures of skewness and kurtosis; shape of a distribution',
      'Rates, ratios and index numbers',
      'Correlation: scatter diagrams, Pearson and Spearman rank correlation',
      'Simple linear regression and the method of least squares',
      'Elementary probability: sample space, events, addition and multiplication rules',
    ],
    textbooks: [
      { title: 'Fundamentals of Mathematical Statistics', authors: 'S.C. Gupta & V.K. Kapoor', note: 'The standard Nigerian university reference for descriptive statistics' },
      { title: 'Statistics for Management', authors: 'Levin & Rubin', note: '7th ed. — very readable, strong on interpretation' },
      { title: 'OpenIntro Statistics', authors: 'Diez, Çetinkaya-Rundel & Barr', note: '4th ed. — free PDF at openintro.org; excellent modern treatment' },
    ],
    searchTerms: [
      'Descriptive statistics full course free',
      'Mean median mode variance standard deviation worked examples',
      'Pearson vs Spearman correlation explained',
      'OpenIntro Statistics free textbook',
    ],
    studyTips: [
      'This is the foundation course of your entire degree — a shaky STA 111 makes DTS 224 and DTS 226 twice as hard',
      'For every summary statistic, learn the formula AND when it lies: the mean is worthless on skewed income data, correlation is worthless on a curved relationship',
      'Redo every lecture example in Excel or in R (you meet R formally in DTS 211) — seeing the same number come out twice cements it',
      'Always sketch the data before computing anything; a histogram tells you which statistic is even appropriate',
    ],
  },
  {
    code: 'COS 111',
    slug: 'cos-111',
    title: 'Introduction to Computing Sciences',
    units: 3, level: 100, semester: 1, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    description: 'A broad first pass over computing: how a computer is organised, how it represents data, how software is built, and how systems and networks fit together. Gives you the vocabulary the rest of the Faculty of Computing curriculum assumes you already have.',
    topics: [
      'Historical perspectives and generations of computing',
      'Overview of computer systems: hardware, software, firmware and peopleware',
      'Computer organisation: CPU, memory hierarchy, input/output and storage devices',
      'Number systems and data representation: binary, octal, hexadecimal, BCD, character encoding',
      'Boolean algebra and logic gates',
      'Operating system concepts: processes, memory management, file systems',
      'Software: system vs application software; the program development cycle',
      'Introduction to databases, computer networks and the Internet',
      'Computer ethics, security awareness and the social impact of computing',
    ],
    textbooks: [
      { title: 'Computer Science: An Overview', authors: 'J. Glenn Brookshear & Dennis Brylow', note: '13th ed. — the ideal breadth-first introduction' },
      { title: 'Computer Organization and Design', authors: 'Patterson & Hennessy', note: 'For the hardware chapters; deeper than you need now but excellent' },
    ],
    searchTerms: [
      'Introduction to computer science full course free',
      'Binary hexadecimal conversion practice questions',
      'How a CPU works explained simply',
      'Harvard CS50 introduction to computer science free',
    ],
    studyTips: [
      'Drill binary/hex conversion until it is automatic — it reappears in COS 211, CSC 223 and in every "why is my file corrupted" moment',
      'Understanding the memory hierarchy now pays off directly in DTS 312 (Big Data Computing), where the whole subject is "the data does not fit in memory"',
      'Do the practical hours seriously; the exam has a practical component and it is the easiest part to score full marks on',
      'Harvard CS50 is free and covers most of this course with far better production quality than any textbook',
    ],
  },
  {
    code: 'UUY-DTS 111',
    slug: 'uuy-dts-111',
    title: 'Fundamentals of Data Science',
    units: 3, level: 100, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Your orientation to the discipline: what data science actually is, what a data scientist does day to day, and the end-to-end lifecycle of a data project from question to deployed insight. Heavily practical — you will handle real datasets in your first semester.',
    topics: [
      'What data science is: the intersection of statistics, computing and domain knowledge',
      'Roles in the field: data analyst, data scientist, data engineer, ML engineer',
      'The data science lifecycle: problem framing, collection, cleaning, exploration, modelling, communication, deployment',
      'Types of data: structured, semi-structured and unstructured; quantitative vs qualitative',
      'Data sources: surveys, sensors, transactions, logs, web scraping, open data portals',
      'Data quality: missing values, duplicates, outliers, inconsistent coding',
      'Exploratory data analysis and basic visualisation',
      'Tools of the trade: spreadsheets, Python/R notebooks, SQL, version control',
      'Case studies of data science in health, agriculture, finance and government in Nigeria',
    ],
    textbooks: [
      { title: 'Data Science from Scratch', authors: 'Joel Grus', note: '2nd ed. — builds every idea from first principles in plain Python' },
      { title: 'R for Data Science', authors: 'Hadley Wickham & Garrett Grolemund', note: '2nd ed. — free at r4ds.hadley.nz; the best lifecycle overview anywhere' },
      { title: 'Doing Data Science', authors: 'Cathy O\'Neil & Rachel Schutt', note: 'Strong on what the job actually looks like' },
    ],
    searchTerms: [
      'What is data science full beginner course',
      'Data science lifecycle explained',
      'Exploratory data analysis tutorial for beginners',
      'Kaggle Learn free micro-courses',
    ],
    studyTips: [
      'Pick one real dataset in your first month (Nigeria open data, NBS, or a Kaggle set) and carry it through every stage of the lifecycle as you learn each stage',
      'Cleaning is 70–80% of real data work and is barely 10% of the syllabus — over-invest in it anyway',
      'Start a public GitHub repository now; by 400 Level it is the portfolio that gets you hired',
      'Learn to state the business question before touching the data — an elegant model answering the wrong question scores zero',
    ],
  },
  {
    code: 'UUY-DTS 112',
    slug: 'uuy-dts-112',
    title: 'Introduction to Database Technology',
    units: 2, level: 100, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'How data is stored, structured and retrieved at scale. Relational modelling, normalisation, and SQL — the single most reusable practical skill in the degree, and the one most often tested in data-science job interviews.',
    topics: [
      'File systems vs database systems; why databases exist',
      'Database system architecture: the three-schema architecture and data independence',
      'Data models: hierarchical, network, relational, object and document models',
      'Entity-relationship modelling: entities, attributes, relationships, cardinality, ER diagrams',
      'The relational model: relations, tuples, keys (primary, candidate, foreign), integrity constraints',
      'Normalisation: functional dependency, 1NF, 2NF, 3NF and BCNF',
      'SQL data definition: CREATE, ALTER, DROP, constraints',
      'SQL data manipulation: SELECT, WHERE, ORDER BY, GROUP BY, HAVING, JOIN, subqueries, aggregate functions',
      'Transactions and the ACID properties; introduction to NoSQL alternatives',
    ],
    textbooks: [
      { title: 'Database System Concepts', authors: 'Silberschatz, Korth & Sudarshan', note: '7th ed. — the standard university text' },
      { title: 'Learning SQL', authors: 'Alan Beaulieu', note: '3rd ed. — the fastest route to practical SQL fluency' },
    ],
    searchTerms: [
      'SQL tutorial for beginners full course',
      'Database normalisation 1NF 2NF 3NF worked example',
      'ER diagram tutorial with examples',
      'SQLBolt free interactive SQL lessons',
    ],
    studyTips: [
      'Install PostgreSQL or SQLite locally in week one and write real queries — SQL cannot be learnt by reading',
      'Normalisation questions are guaranteed in the exam: practise taking an unnormalised table to 3NF and stating the functional dependency that forced each step',
      'Master JOINs properly (INNER, LEFT, RIGHT, FULL) — they are the number one SQL interview topic and reappear in DTS 314',
      'SQLBolt and pgexercises.com are free, interactive, and better practice than any past question paper',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  100 LEVEL — SECOND SEMESTER  (15 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 121',
    slug: 'gst-121',
    title: 'Nigerian Peoples and Culture',
    units: 2, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'gst',
    crossDepartmental: true,
    description: 'The peoples, cultures, institutions and social history of Nigeria, and the forces shaping national identity and development. Context matters in data science: the population you are modelling is the one this course describes.',
    topics: [
      'Nigerian history, culture and the origins of the Nigerian nation',
      'Peoples and cultures of the pre-colonial, colonial and post-colonial eras',
      'Nigeria under colonial rule and the evolution of the Nigerian state',
      'Culture areas of Nigeria and their characteristics',
      'Evolution of Nigeria as a political unit; indigene/settler phenomenon',
      'Concepts of trade, economic self-reliance and social justice',
      'Norms and values; negative attitudes and conducts (cultism, kidnapping, corruption)',
      'Re-orientation strategies: MAMSER, War Against Indiscipline, EFCC and ICPC',
      'Nigerian human rights, citizenship and national development',
    ],
    textbooks: [
      { title: 'Nigerian Peoples and Culture', authors: 'Various UniUyo GST course team', note: 'Use the departmental handout — exams follow it closely' },
      { title: 'The Trouble with Nigeria', authors: 'Chinua Achebe', note: 'Short, sharp context on leadership and national development' },
    ],
    searchTerms: [
      'Nigerian peoples and culture GST past questions',
      'History of Nigeria pre-colonial to independence summary',
      'Nigeria national development challenges explained',
      'Ethnic groups of Nigeria overview',
    ],
    studyTips: [
      'This is a memory-heavy course — make a one-page timeline of Nigerian political history and revise it weekly',
      'The GST exam is usually objective/multiple-choice; drill past questions rather than writing long notes',
      'Where a question allows it, ground your answer in data (population figures, census history) — it reads far stronger from a data science student',
      'Do not leave this course to the last week; it is easy marks that many students throw away',
    ],
    notesKey: 'gst121',
    // Chapters 1–2 are the only ones transcribed so far. Chapter 1's item 8 is
    // `partial` rather than `covers`: the chapter's reorientation strategies are
    // the 3Rs, indigenization and the NYSC, not the MAMSER/WAI/EFCC/ICPC ones
    // our outline names. Cybersecurity words that item as "the 3Rs", so it
    // marks the same chapter as full coverage — which is why these indices
    // live per course. Chapter 2 (apprenticeship) fully covers item 6, the
    // trade/self-reliance topic.
    noteCoverage: {
      1: { partial: [5, 6, 8] },
      2: { covers: [6] },
    },
  },
  {
    code: 'MTH 121',
    slug: 'mth-121',
    title: 'General Mathematics II',
    units: 2, level: 100, semester: 2, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'Single-variable calculus: limits, continuity, differentiation and integration, with applications. Calculus is the machinery behind optimisation — and optimisation is how essentially every machine learning model is actually trained.',
    topics: [
      'Functions of a real variable: graphs, limits and the idea of continuity',
      'The derivative as a limit; differentiation from first principles',
      'Rules of differentiation: product, quotient and chain rules',
      'Differentiation of implicit, parametric, trigonometric, exponential and logarithmic functions',
      'Applications of differentiation: rates of change, maxima and minima, curve sketching',
      'Extreme-value problems and optimisation',
      'Integration as the inverse of differentiation; indefinite and definite integrals',
      'Methods of integration: substitution, integration by parts, partial fractions',
      'Applications of integration: area under a curve, volumes of revolution',
    ],
    textbooks: [
      { title: 'Calculus: Early Transcendentals', authors: 'James Stewart', note: '8th ed. — the global standard calculus text' },
      { title: 'Engineering Mathematics', authors: 'K.A. Stroud', note: '8th ed. — programmed learning style, excellent for self-study' },
    ],
    searchTerms: [
      'Khan Academy calculus 1 full course free',
      'Differentiation rules worked examples',
      'Integration by parts and substitution tutorial',
      '3Blue1Brown Essence of Calculus YouTube',
    ],
    studyTips: [
      'Watch 3Blue1Brown\'s "Essence of Calculus" series before revising — it makes derivatives and integrals intuitive rather than mechanical',
      'Maxima/minima is the single most important topic for your degree: gradient descent, the algorithm behind neural networks, is exactly "find the minimum"',
      'Do not skip integration techniques because "the computer does it" — you need them to read the probability density functions in DTS 226',
      'Work problems until you can do a full differentiation without looking up a rule',
    ],
    notesKey: 'mth121',
    // Which of the topics above each workbook unit reaches. The indices are ours
    // alone — the note file is shared with Cybersecurity, whose outline for the
    // same course is worded and ordered differently. Unit 6 is the tutorial
    // question set, so it marks nothing as taught.
    noteCoverage: {
      1: { covers: [1] },
      2: { covers: [2, 3, 4] },
      3: { covers: [5, 6] },
      4: { covers: [7, 8] },
      5: { covers: [9] },
    },
  },
  {
    code: 'PHY 121',
    slug: 'phy-121',
    title: 'General Physics II',
    units: 2, level: 100, semester: 2, lh: 30, ph: 0,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Electricity, magnetism and modern physics: electrostatics, circuits, electromagnetic induction, and an introduction to atomic and quantum ideas. The physical layer beneath every sensor, network link and storage device that produces the data you will analyse.',
    topics: [
      "Electrostatics: charge, Coulomb's law, electric field and potential",
      "Gauss's law and its applications; capacitance and dielectrics",
      "Current electricity: Ohm's law, resistivity, DC circuits and Kirchhoff's laws",
      'Electrical energy and power; measuring instruments',
      'Magnetic fields, magnetic force on currents, and electromagnetic induction',
      "Faraday's and Lenz's laws; inductance and AC circuits",
      'Wave optics: reflection, refraction, interference and diffraction',
      'Modern physics: the photoelectric effect, atomic models, and an introduction to quantum ideas',
    ],
    textbooks: [
      { title: 'University Physics with Modern Physics', authors: 'Young & Freedman', note: '15th ed. — thorough treatment of electromagnetism' },
      { title: 'Fundamentals of Physics', authors: 'Halliday, Resnick & Walker', note: '11th ed. — very strong problem sets' },
    ],
    searchTerms: [
      'Khan Academy electricity and magnetism free',
      "Kirchhoff's laws circuit problems worked examples",
      'Electromagnetic induction explained simply',
      'Photoelectric effect explained',
    ],
    studyTips: [
      "Kirchhoff's laws are just a linear system of equations — solving them is good practice for the matrix algebra you meet in MTH 212 and MTH 211",
      'Draw the circuit and label every current direction before writing a single equation',
      'Connect topics to technology: induction underpins hard-disk storage, wave optics underpins fibre-optic data links',
      'Physics exams reward method marks — always show the formula, the substitution and the units',
    ],
  },
  {
    code: 'PHY 128',
    slug: 'phy-128',
    title: 'General Practical Physics II',
    units: 1, level: 100, semester: 2, lh: 0, ph: 45,
    subject: 'phy',
    crossDepartmental: true,
    description: 'Laboratory practicals accompanying PHY 121: electrical, magnetic and optical experiments with quantitative data analysis and graphing. More practice in the core scientific skill of turning noisy measurements into a defensible number.',
    topics: [
      'Electrical measurement: ammeters, voltmeters, multimeters and the oscilloscope',
      'Verification of Ohm\'s law and determination of resistivity',
      'Wheatstone bridge and metre bridge experiments',
      'Potentiometer: comparison of e.m.f. and internal resistance',
      'Capacitor charge and discharge; time-constant determination',
      'Magnetic field mapping and the tangent galvanometer',
      'Optics: focal length of lenses and mirrors, refractive index determination',
      'Graphical analysis and error treatment for electrical measurements',
    ],
    textbooks: [
      { title: 'Practical Physics', authors: 'G.L. Squires', note: '4th ed. — the reference for experimental method' },
      { title: 'Advanced Level Practical Physics', authors: 'M. Nelkon & J.M. Ogborn', note: 'Classic, closely matched to the experiments you will actually run' },
    ],
    searchTerms: [
      'Wheatstone bridge experiment procedure and theory',
      'Potentiometer experiment physics practical',
      'Capacitor charging discharging experiment time constant',
      'How to plot experimental data and estimate error',
    ],
    studyTips: [
      'Take at least five readings per measurement and average them — one reading is a guess, not a measurement',
      'Learn to read a multimeter and an oscilloscope confidently; the practical exam is time-pressured',
      'Your graph is worth more marks than your arithmetic — label axes with quantity AND unit every time',
      'Quote every final result with its uncertainty; a number without an error bar is incomplete',
    ],
    // Section 1 of the departmental practical manual — the four theoretical
    // background chapters. See src/data/lectureNotes/phy128.js for provenance
    // and the errata list. Section 2 (the experiments) is not transcribed yet.
    notesKey: 'phy128',
    // Which of the topics above each manual chapter reaches. Written for this
    // outline specifically — Cybersecurity takes the same PHY 128 against a
    // different one. Chapter 3 (sound) is absent: nothing in this outline
    // covers it. Note also that despite its title, Chapter 4 has no magnetism
    // content, so topic 6 stays unclaimed; and no chapter reaches topic 5.
    noteCoverage: {
      1: { covers: [8] },
      2: { covers: [7] },
      4: { covers: [2, 3, 4], partial: [1, 8] },
    },
  },
  {
    code: 'COS 121',
    slug: 'cos-121',
    title: 'Problem Solving',
    units: 2, level: 100, semester: 2, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    hasInteractiveModules: true,
    interactiveTrackPath: '/tracks/python',
    interactiveLabel: 'Python',
    interactiveModuleCount: 12,
    description: 'Algorithmic thinking and systematic problem solving, taught through programming. Problem identification, solution design with pseudocode and flowcharts, and implementation — your first real programming course, and the gateway to every practical course that follows.',
    topics: [
      'Problems and problem-solving: routine vs non-routine problems',
      'Methods of solving computing problems: algorithms and heuristics',
      'Solvable and unsolvable problems; the limits of computation',
      'Solution techniques: abstraction, brainstorming, trial and error, divide and conquer, root cause analysis',
      'The general problem-solving process',
      'Solution formulation and design: flowcharts, pseudocode, decision tables, decision trees',
      'Implementation, evaluation and refinement',
      'Programming fundamentals: variables, control flow, loops, functions, lists and dictionaries',
      'Debugging and testing strategies',
    ],
    textbooks: [
      { title: 'Python Crash Course', authors: 'Eric Matthes', note: '3rd ed. — the best beginner Python book; very practical' },
      { title: 'Think Python: How to Think Like a Computer Scientist', authors: 'Allen Downey', note: '2nd ed. — free PDF at greenteapress.com' },
      { title: 'How to Solve It', authors: 'George Pólya', note: 'The classic on problem-solving method; short and worth reading once' },
    ],
    searchTerms: [
      'Python for beginners full course freeCodeCamp YouTube',
      'Flowchart and pseudocode tutorial',
      'Python problem solving exercises for beginners',
      'CS50P Introduction to Programming with Python Harvard free',
    ],
    studyTips: [
      'Areté has 12 full interactive Python modules for this course — use them from day one',
      'Python is the primary language of data science; the fluency you build here carries through UUY-DTS 224, UUY-DTS 313 and your final-year project',
      'Never copy-paste code examples — type every line yourself so your fingers learn the syntax',
      'Solve at least one small coding problem daily; consistency beats cramming for programming',
    ],
    notesKey: 'cos121',
  },
  {
    code: 'UUY-DTS 121',
    slug: 'uuy-dts-121',
    title: 'Foundation of Web Technologies for Data Science',
    units: 3, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'How the web works and how to get data out of it. HTML, CSS and JavaScript fundamentals, HTTP and APIs, and the beginnings of web scraping — because a great deal of the data you will ever analyse lives behind a URL.',
    topics: [
      'Internet and web fundamentals: clients, servers, DNS, URLs and the request/response cycle',
      'HTTP: methods, status codes, headers, cookies and sessions',
      'HTML: document structure, semantic elements, lists, tables and forms',
      'CSS: selectors, the box model, layout with flexbox and grid, responsive design',
      'JavaScript basics: variables, control flow, functions, DOM manipulation and events',
      'The Document Object Model as a data structure you can query',
      'Web APIs and JSON: consuming a REST endpoint, parsing responses',
      'Introduction to web scraping: HTML parsing, selectors, pagination, and the ethics and legality of scraping',
      'Serving a simple data dashboard on the web',
    ],
    textbooks: [
      { title: 'HTML and CSS: Design and Build Websites', authors: 'Jon Duckett', note: 'Visual, beginner-friendly, and genuinely enjoyable' },
      { title: 'Eloquent JavaScript', authors: 'Marijn Haverbeke', note: '4th ed. — free at eloquentjavascript.net' },
      { title: 'Web Scraping with Python', authors: 'Ryan Mitchell', note: '3rd ed. — the practical reference for the data-collection half of this course' },
    ],
    searchTerms: [
      'HTML CSS JavaScript full course for beginners',
      'How HTTP works request response explained',
      'Web scraping with BeautifulSoup tutorial',
      'MDN Web Docs learn web development',
    ],
    studyTips: [
      'Open dev tools (F12) on every site you visit and read the Network tab — you learn HTTP faster by watching it than by reading about it',
      'Focus your effort on the DOM and on APIs/JSON; those are the parts a data scientist uses weekly, unlike CSS layout',
      'Always check a site\'s robots.txt and terms before scraping, and rate-limit your requests — the ethics questions are examined and the habit matters professionally',
      'Build one small thing that fetches a public API and charts the result; it is the best possible revision for this course',
    ],
  },
  {
    code: 'UUY-DTS 122',
    slug: 'uuy-dts-122',
    title: 'Introduction to Information and Communication Management',
    units: 3, level: 100, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'How organisations create, move, store and govern information, and how ICT infrastructure supports that. The organisational context in which data work actually happens — systems, stakeholders, policy and communication.',
    topics: [
      'Information concepts: data, information, knowledge and wisdom; the DIKW hierarchy',
      'Information systems in organisations: TPS, MIS, DSS and executive information systems',
      'The information lifecycle: creation, storage, retrieval, distribution, archiving and disposal',
      'Communication models, channels and barriers in an organisational setting',
      'ICT infrastructure: networks, servers, cloud services and collaboration platforms',
      'Records and document management; metadata and classification',
      'Information governance: quality, ownership, stewardship and retention policy',
      'Data privacy and protection: NDPR, GDPR principles, and confidentiality obligations',
      'Presenting information to non-technical stakeholders',
    ],
    textbooks: [
      { title: 'Management Information Systems: Managing the Digital Firm', authors: 'Laudon & Laudon', note: '17th ed. — the standard MIS text' },
      { title: 'Information Systems Today', authors: 'Valacich & Schneider', note: '9th ed. — accessible and case-driven' },
    ],
    searchTerms: [
      'Management information systems introduction course',
      'DIKW hierarchy data information knowledge wisdom',
      'Nigeria Data Protection Regulation NDPR summary',
      'Information governance explained',
    ],
    studyTips: [
      'Learn the NDPR basics properly — Nigerian data protection law is directly examinable here and again in DTS 318',
      'For every system type (TPS/MIS/DSS), memorise one concrete Nigerian example; scenario questions ask you to classify a system',
      'The communication half of this course is not filler: explaining a result to a non-technical manager is a graded skill in DTS 413 and a career-defining one after',
      'Draw the DIKW pyramid and the information lifecycle from memory — both are near-certain exam diagrams',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  200 LEVEL — FIRST SEMESTER  (17 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 211',
    slug: 'gst-211',
    title: 'Philosophy, Logic and Human Existence',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'gst',
    crossDepartmental: true,
    description: 'Philosophical method, formal logic, and the perennial questions about knowledge, value and human existence. The logic half is directly technical — it is the same propositional calculus you will formalise in MTH 212 and implement in code.',
    topics: [
      'The meaning, scope and branches of philosophy',
      'Philosophy and logic: the nature of argument, premises and conclusions',
      'Deductive and inductive reasoning; validity, soundness and cogency',
      'Symbolic logic: propositions, connectives, truth tables and truth-functional analysis',
      'Rules of inference and methods of proof',
      'Informal fallacies: ad hominem, straw man, false cause, hasty generalisation, appeal to authority',
      'Epistemology: sources and limits of knowledge; scepticism',
      'Ethics: consequentialism, deontology and virtue ethics',
      'Human existence, freedom, determinism and the meaning of life',
    ],
    textbooks: [
      { title: 'Philosophy and Logic: An Introduction', authors: 'Various UniUyo GST course team', note: 'Use the departmental text — the exam follows it closely' },
      { title: 'A Concise Introduction to Logic', authors: 'Patrick J. Hurley', note: '13th ed. — the best treatment of truth tables and fallacies' },
    ],
    searchTerms: [
      'Introduction to logic truth tables tutorial',
      'Common logical fallacies explained with examples',
      'Deductive vs inductive reasoning difference',
      'Crash Course Philosophy YouTube playlist',
    ],
    studyTips: [
      'Truth tables are free marks — practise until you can build one for any compound proposition without hesitating',
      'The fallacies section is the most examined: learn each one with a one-line example you invented yourself, not the textbook\'s',
      'Statistical reasoning is inductive; understanding why induction can never give certainty makes DTS 224 hypothesis testing click',
      'For essay questions, define your terms in the first paragraph — examiners reward it explicitly',
    ],
  },
  {
    code: 'MTH 211',
    slug: 'mth-211',
    title: 'Mathematical Methods I',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'The analytical toolkit for scientific computing: sequences and series, partial differentiation, vector calculus and an introduction to differential equations. These are the methods that underpin optimisation, gradient-based learning and statistical modelling.',
    topics: [
      'Sequences and infinite series; tests of convergence',
      'Power series, Taylor and Maclaurin expansions',
      'Functions of several variables; limits and continuity in several variables',
      'Partial derivatives; the chain rule for multivariable functions',
      'Total differential, gradient, directional derivative, divergence and curl',
      'Maxima and minima of functions of several variables; Lagrange multipliers',
      'Multiple integrals: double and triple integrals and their applications',
      'First-order ordinary differential equations: separable, homogeneous, exact and linear',
      'Second-order linear differential equations with constant coefficients',
    ],
    textbooks: [
      { title: 'Advanced Engineering Mathematics', authors: 'Erwin Kreyszig', note: '10th ed. — the comprehensive reference for these methods' },
      { title: 'Engineering Mathematics', authors: 'K.A. Stroud', note: '8th ed. — gentler, with fully worked programmes' },
    ],
    searchTerms: [
      'Partial derivatives and gradient explained',
      'Lagrange multipliers worked examples',
      'Taylor series expansion tutorial',
      'MIT 18.02 Multivariable Calculus OpenCourseWare',
    ],
    studyTips: [
      'The gradient is THE central object of machine learning — every training algorithm you meet in UUY-DTS 313 is gradient descent on a loss surface. Learn it here properly and that course becomes much easier',
      'Lagrange multipliers are constrained optimisation, which is exactly what a support vector machine solves — the connection is not decorative',
      'Taylor series is how numerical methods approximate everything; MTH 223 next semester assumes you have it cold',
      'Practise partial differentiation until you stop confusing it with total differentiation — that specific mistake costs marks every year',
    ],
  },
  {
    code: 'MTH 212',
    slug: 'mth-212',
    title: 'Sets, Logic and Algebra',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'Rigorous foundations: set theory, formal logic, relations and functions, and an introduction to abstract algebraic structures. This is where mathematical proof is taught properly, and where the language of the rest of your theoretical courses is set.',
    topics: [
      'Set theory: operations, laws, power sets, Cartesian products, indexed families',
      'Propositional logic: connectives, truth tables, tautologies, logical equivalence',
      'Predicate logic: quantifiers, bound and free variables, negation of quantified statements',
      'Methods of proof: direct proof, contraposition, contradiction, mathematical induction',
      'Relations: reflexive, symmetric, transitive; equivalence relations and partitions',
      'Partial orders, Hasse diagrams and lattices',
      'Functions: injective, surjective, bijective; composition and inverse functions; cardinality',
      'Binary operations and algebraic structures: groups, subgroups, cyclic groups',
      'Rings and fields: definitions, examples and elementary properties',
    ],
    textbooks: [
      { title: 'Discrete Mathematics and Its Applications', authors: 'Kenneth H. Rosen', note: '8th ed. — the standard text; superb exercise sets' },
      { title: 'Book of Proof', authors: 'Richard Hammack', note: '3rd ed. — free at richardhammack.github.io; the clearest proof primer available' },
    ],
    searchTerms: [
      'Set theory and logic university course free',
      'Mathematical induction proof examples',
      'Equivalence relations and partitions explained',
      'Introduction to group theory basics',
    ],
    studyTips: [
      'Proof is a skill, not knowledge — you must write proofs yourself, badly at first, to learn it. Reading proofs feels productive and is not',
      'Equivalence relations and partitions are the mathematical basis of clustering: a clustering is literally a partition of your dataset',
      'Learn to negate a quantified statement mechanically (¬∀x P(x) ≡ ∃x ¬P(x)) — it is examined and it is how you state a null hypothesis correctly',
      'Hammack\'s Book of Proof is free and will teach you more in three chapters than a term of passive lectures',
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
    description: 'Structured and object-oriented programming in a compiled, statically typed language. Classes, inheritance, collections, exceptions and file I/O — the engineering discipline that separates a script that ran once from software other people can rely on.',
    topics: [
      'Program structure, compilation and execution; primitive types and operators',
      'Control flow: conditionals, loops and switch',
      'Methods, parameter passing, scope and recursion',
      'Arrays and strings',
      'Object-oriented programming: classes, objects, constructors and encapsulation',
      'Inheritance, polymorphism, abstract classes and interfaces',
      'Exception handling and defensive programming',
      'Collections: lists, sets and maps',
      'File input/output and basic database connectivity',
    ],
    textbooks: [
      { title: 'Head First Java', authors: 'Kathy Sierra & Bert Bates', note: '3rd ed. — by far the friendliest route into OOP' },
      { title: 'Java: The Complete Reference', authors: 'Herbert Schildt', note: '12th ed. — the reference to keep on the desk' },
    ],
    searchTerms: [
      'Java full course for beginners freeCodeCamp',
      'Object oriented programming concepts explained',
      'Java collections framework tutorial',
      'Java exception handling best practices',
    ],
    studyTips: [
      'Areté has 13 full interactive Java modules for this course — work through them alongside lectures',
      'Do not memorise syntax; understand why encapsulation and interfaces exist. The concepts transfer to Python, R and Scala, the syntax does not',
      'Type discipline feels like friction after Python, but it is exactly what makes large data pipelines maintainable — Spark, which you meet in DTS 312, is written in a JVM language',
      'Build every mini project; the practical exam and your confidence both depend on having written real code, not read it',
    ],
  },
  {
    code: 'CYB 211',
    slug: 'cyb-211',
    title: 'Introduction to Cybersecurity and Strategy',
    units: 2, level: 200, semester: 1, lh: 30, ph: 0,
    subject: 'cyb',
    // sharedMaterials, not crossDepartmental: Cybersecurity owns this course and
    // both departments take it, so the uploads pool together — but it is not one
    // of the foundation courses, so it must stay out of the foundation catalogue.
    // The courses.js copy carries the same flag; the two must agree (see the
    // pool-agreement test in departments.test.js).
    sharedMaterials: true,
    description: 'The threat landscape and the frameworks used to defend against it. For a data scientist this is the course that explains why the data you hold is a liability as well as an asset — and what your obligations are when it leaks.',
    topics: [
      'Cybersecurity concepts: the CIA triad, threats, vulnerabilities, risk and controls',
      'The threat landscape: malware, phishing, social engineering, ransomware, insider threats',
      'Attack lifecycle: reconnaissance, weaponisation, delivery, exploitation, persistence, exfiltration',
      'Authentication, authorisation and access control models',
      'Cryptography fundamentals: symmetric vs asymmetric encryption, hashing, digital signatures',
      'Network security basics: firewalls, IDS/IPS, VPNs',
      'The NIST Cybersecurity Framework: Identify, Protect, Detect, Respond, Recover',
      'Cybersecurity governance, policy and national strategy; the Nigerian context',
      'Data breach response and disclosure obligations',
    ],
    textbooks: [
      { title: 'Cybersecurity Essentials', authors: 'Charles J. Brooks et al.', note: 'Broad and accessible introduction' },
      { title: 'Cybersecurity and Cyberwar: What Everyone Needs to Know', authors: 'P.W. Singer & Allan Friedman', note: 'Excellent on the strategic and policy dimension' },
    ],
    searchTerms: [
      'NIST Cybersecurity Framework explained',
      'CIA triad information security explained',
      'Types of cyber attacks overview',
      'Data breach response plan steps',
    ],
    studyTips: [
      'The NIST CSF five functions are near-certain exam content — learn all five and be ready to apply them to a scenario',
      'Anonymisation and re-identification risk is the direct data-science application here: understand why removing names does not make a dataset anonymous',
      'Areté has a 12-room interactive Security track — the early rooms cover this course\'s ground hands-on',
      'Learn the CIA triad well enough to argue which leg a given incident violated; that framing answers half the essay questions',
    ],
  },
  {
    code: 'DTS 211',
    slug: 'dts-211',
    title: 'Introduction to R Programming',
    units: 2, level: 200, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'R from the ground up: the language, its data structures, and the tidyverse workflow for importing, tidying, transforming, visualising and modelling data. R is the statistician\'s language, and it is the fastest route from a dataset to a publication-quality figure.',
    topics: [
      'The R environment and RStudio; scripts, projects and the console',
      'Atomic vectors, coercion and vectorised operations',
      'Data structures: vectors, matrices, lists, factors and data frames',
      'Control flow, functions and the apply family',
      'Reading and writing data: CSV, Excel, delimited files and databases',
      'The tidyverse: dplyr verbs (filter, select, mutate, arrange, summarise, group_by)',
      'Tidy data principles and reshaping with tidyr',
      'Visualisation with ggplot2: the grammar of graphics, aesthetics, geoms, facets and themes',
      'Reproducible reporting with R Markdown / Quarto',
    ],
    textbooks: [
      { title: 'R for Data Science', authors: 'Hadley Wickham, Mine Çetinkaya-Rundel & Garrett Grolemund', note: '2nd ed. — free at r4ds.hadley.nz; the definitive text for this course' },
      { title: 'The Art of R Programming', authors: 'Norman Matloff', note: 'Stronger on the language itself and on programming style' },
    ],
    searchTerms: [
      'R programming full course for beginners',
      'dplyr tutorial data manipulation in R',
      'ggplot2 tutorial grammar of graphics',
      'R for Data Science free online book',
    ],
    studyTips: [
      'Install R and RStudio in week one and never read R code without running it',
      'Learn the six dplyr verbs cold — filter, select, mutate, arrange, group_by, summarise. Together they solve most real data-wrangling tasks',
      'ggplot2 feels strange until the grammar of graphics clicks: data → aesthetic mapping → geometry. Once it clicks it is faster than anything else',
      'Do everything in an R Markdown / Quarto document from the start so your work is reproducible — you will need exactly this for DTS 417',
    ],
  },
  {
    code: 'DTS 212',
    slug: 'dts-212',
    title: 'Introduction to Data Science',
    units: 2, level: 200, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'The formal treatment of the data science process, building on UUY-DTS 111: problem formulation, data acquisition, feature construction, model families, evaluation, and the ethics and limits of inference from data.',
    topics: [
      'Framing a data science problem: from a vague question to a measurable target',
      'Data acquisition strategies and sampling; sampling bias and its consequences',
      'Data cleaning and preparation: missing data mechanisms, imputation, outlier treatment',
      'Feature engineering, encoding categorical variables, scaling and normalisation',
      'Exploratory data analysis: distributions, relationships, and the grammar of graphics',
      'Supervised vs unsupervised learning; regression vs classification',
      'Model evaluation: train/test split, cross-validation, and the bias–variance trade-off',
      'Overfitting, underfitting and regularisation as concepts',
      'Communicating results; reproducibility and the ethics of data-driven claims',
    ],
    textbooks: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie & Tibshirani', note: '2nd ed. — free at statlearning.com; the single best book for this course' },
      { title: 'Python Data Science Handbook', authors: 'Jake VanderPlas', note: 'Free at jakevdp.github.io; the practical companion' },
    ],
    searchTerms: [
      'Introduction to Statistical Learning free book and videos',
      'Bias variance tradeoff explained',
      'Cross validation explained simply',
      'Feature engineering techniques tutorial',
    ],
    studyTips: [
      'The bias–variance trade-off is the conceptual centre of this course and of the whole degree — be able to explain it with a picture, in words, and with a formula',
      'Never evaluate a model on data it was trained on. Internalise this now and it will save your final-year project',
      'Watch the free ISLR video lectures from the authors; they follow the book chapter by chapter',
      'For every technique, learn the assumption it makes and what breaks when the assumption fails — that is what distinguishes a data scientist from a button-pusher',
    ],
  },
  {
    code: 'UUY-DTS 211',
    slug: 'uuy-dts-211',
    title: 'Introduction to Data Analytics',
    units: 2, level: 200, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Analytics as a business discipline: the four analytics types (descriptive, diagnostic, predictive, prescriptive), KPI design, dashboarding, and turning an analysis into a decision. Practical and tool-focused.',
    topics: [
      'The analytics maturity ladder: descriptive, diagnostic, predictive and prescriptive analytics',
      'Defining metrics and KPIs; leading vs lagging indicators',
      'Data preparation for analysis: joins, aggregation, pivoting and derived measures',
      'Cohort analysis, funnel analysis and time-series trends',
      'Spreadsheet analytics: pivot tables, lookup functions and what-if analysis',
      'Business intelligence tools: Power BI / Tableau / Looker Studio fundamentals',
      'Dashboard design: audience, hierarchy of information, and avoiding chart junk',
      'A/B testing basics and the interpretation of experimental results',
      'From insight to recommendation: writing the analytics brief',
    ],
    textbooks: [
      { title: 'Storytelling with Data', authors: 'Cole Nussbaumer Knaflic', note: 'The best book on communicating an analysis; short and practical' },
      { title: 'Data Science for Business', authors: 'Foster Provost & Tom Fawcett', note: 'Excellent on why an analysis matters commercially' },
    ],
    searchTerms: [
      'Descriptive diagnostic predictive prescriptive analytics explained',
      'Power BI full tutorial for beginners',
      'Dashboard design best practices',
      'How to define good KPIs',
    ],
    studyTips: [
      'Build one real dashboard on a dataset you care about — a portfolio dashboard is worth more at interview than a grade',
      'The four analytics types are a guaranteed exam question; be ready with a Nigerian example of each',
      'Practise writing a three-sentence "so what" for every chart you make. If you cannot, the chart is not finished',
      'Learn pivot tables properly — an enormous amount of professional analytics still happens in a spreadsheet',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  200 LEVEL — SECOND SEMESTER  (17 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'ENT 221',
    slug: 'ent-221',
    title: 'Entrepreneurship and Innovation',
    units: 2, level: 200, semester: 2, lh: 30, ph: 0,
    subject: 'ent',
    crossDepartmental: true,
    description: 'The concepts and practice of entrepreneurship: opportunity identification, business models, innovation, and the mechanics of starting and financing a venture in Nigeria. Foundation for ENT 321 and DTS 426 in the final year.',
    topics: [
      'Concept and nature of entrepreneurship; the entrepreneurial mindset',
      'Theories of entrepreneurship and the entrepreneur\'s role in economic development',
      'Opportunity identification, idea generation and feasibility analysis',
      'Innovation: types, sources and the diffusion of innovation',
      'Business models and the business model canvas',
      'Forms of business ownership and business registration in Nigeria (CAC)',
      'Entrepreneurial finance: bootstrapping, angel investment, venture capital, government schemes',
      'Marketing fundamentals for a new venture',
      'Small business management, growth and common causes of failure',
    ],
    textbooks: [
      { title: 'Entrepreneurship: Theory, Process, Practice', authors: 'Donald F. Kuratko', note: '11th ed. — the standard academic text' },
      { title: 'The Lean Startup', authors: 'Eric Ries', note: 'On validated learning and iterating toward a product people want' },
    ],
    searchTerms: [
      'Business model canvas explained with examples',
      'Entrepreneurship full course free',
      'How to register a business in Nigeria CAC',
      'Lean startup methodology summary',
    ],
    studyTips: [
      'Learn the business model canvas well enough to draw all nine blocks from memory — it is examined and it is genuinely useful',
      'Anchor every abstract concept to a real Nigerian startup you can name; examiners reward concrete local examples',
      'Data-driven ventures are the natural application for you — think about what a data product built on Nigerian open data could be worth',
      'This course sets up DTS 426 in final year; keep your notes',
    ],
    notesKey: 'ent221',
    // Chapters 1–18 of the workbook against our outline. The indices are ours
    // alone; Cybersecurity maps the same notes onto a differently-worded
    // outline and reaches different answers — chapter 6, for instance, is
    // full coverage for them (their item is concept/dimensions/knowledge-and-
    // change, all of which chapter 6 teaches) but our item names diffusion of
    // innovation, which the chapter only mentions in passing while citing
    // Rogers.
    //
    // Three of our items land badly against this workbook and are worth knowing
    // about when planning revision: item 5 (business model canvas) is never
    // taught — chapter 9 is the business *plan*, a different artefact; item 8
    // (marketing) survives only as a section of that plan (plus, now, chapter
    // 15's digital-marketing subsection — still no dedicated chapter); and item
    // 3 is split across chapters 5, 7 and 9 without any one of them teaching all
    // of opportunity identification, idea generation and feasibility.
    //
    // Chapter 11 (women entrepreneurship) maps to nothing here. Our outline has
    // no equivalent item, so it marks nothing rather than being forced onto a
    // near-miss. Entrepreneurial finance (item 7) is the reverse surprise: it is
    // chapter 12, the youth chapter, that actually teaches it. Chapter 14
    // (incubators, accelerators and business associations) lands as a partial
    // for item 9 — it's growth support for an existing small business, not a
    // clean match, but the nearest thing our outline has. Chapter 15 is
    // Cybersecurity's e-commerce chapter (their item 9) — we have no
    // e-commerce item, but its digital-marketing subsection (15.5.4) is a
    // reasonable partial for our item 8. Chapter 16 is almost entirely
    // intellectual property law — no home in our outline at all — except its
    // opening CAMA section (16.2), which is squarely business registration in
    // Nigeria, a partial for item 6. Chapter 17 (technopreneurship) splits two
    // ways: 17.6.1 (business structure and registration) reinforces item 6
    // too, and 17.4.1's DeFi/blockchain funding mechanisms (ICOs, STOs, peer-
    // to-peer lending) are a modern partial for item 7's entrepreneurial
    // finance — everything else in that chapter (blockchain's other uses,
    // cloud, renewable energy, IoT, AI) has no home in our outline either.
    // Chapter 18 is Cybersecurity's virtual-office/networking chapter (their
    // item 7, which we don't have) — but its 18.6 "Navigating the Startup
    // Ecosystem" section covers access to capital (a partial for our item 7)
    // and market/mentorship/legal survival factors for a growing small
    // business (a partial for our item 9). Everything else in the chapter
    // (skills/tech solutions, virtual office, mixed reality, networking,
    // sustainability/CSR) has no home in our outline.
    noteCoverage: {
      1: { covers: [1], partial: [2] },
      2: { partial: [1] },
      3: { partial: [9] },
      4: { covers: [2] },
      5: { partial: [3] },
      6: { covers: [4] },
      7: { partial: [3, 6] },
      8: { covers: [6] },
      9: { partial: [3, 5, 8] },
      10: { partial: [2] },
      12: { covers: [7] },
      13: { partial: [7] },
      14: { partial: [9] },
      15: { partial: [8] },
      16: { partial: [6] },
      17: { partial: [6, 7] },
      18: { partial: [7, 9] },
    },
    // Shared with Cybersecurity — see src/data/lectureNotes/ent221Quiz.js.
    // 367 questions across all 18 chapters; one bank for both catalogues
    // since it tests the shared lecture notes, not either outline.
    quiz: ent221Quiz,
  },
  {
    code: 'MTH 223',
    slug: 'mth-223',
    title: 'Introduction to Numerical Analysis',
    units: 2, level: 200, semester: 2, lh: 30, ph: 0,
    subject: 'math',
    crossDepartmental: true,
    description: 'How to compute answers to mathematical problems that have no closed-form solution, and how to know when the computed answer is wrong. Error, convergence and stability — the reason floating-point arithmetic sometimes betrays you.',
    topics: [
      'Sources of error: round-off, truncation, and floating-point representation',
      'Absolute, relative and percentage error; error propagation and conditioning',
      'Solution of nonlinear equations: bisection, false position, Newton–Raphson, secant method',
      'Convergence criteria and rates of convergence',
      'Solution of linear systems: Gaussian elimination, LU decomposition, pivoting',
      'Iterative methods: Jacobi and Gauss–Seidel',
      'Interpolation: Lagrange and Newton divided-difference polynomials; spline interpolation',
      'Numerical differentiation and integration: trapezoidal rule, Simpson\'s rules',
      'Numerical solution of ordinary differential equations: Euler and Runge–Kutta methods',
    ],
    textbooks: [
      { title: 'Numerical Analysis', authors: 'Richard L. Burden & J. Douglas Faires', note: '10th ed. — the standard text, with algorithms in pseudocode' },
      { title: 'Numerical Methods in Engineering with Python 3', authors: 'Jaan Kiusalaas', note: 'Implements each method in Python — ideal for this programme' },
    ],
    searchTerms: [
      'Newton Raphson method worked examples',
      'Gaussian elimination with partial pivoting tutorial',
      'Numerical integration trapezoidal Simpson rule',
      'Floating point arithmetic what every programmer should know',
    ],
    studyTips: [
      'Implement every method in Python as you learn it — a method you have coded is a method you understand',
      'Newton–Raphson is the same algorithm family as gradient descent; recognising that makes UUY-DTS 313 far less mysterious',
      'Learn WHY floating-point comparison with == is unsafe; this single fact prevents a whole class of real bugs in data pipelines',
      'Exam questions usually ask for two or three iterations by hand — practise tabulating iterations neatly and carrying enough decimal places',
    ],
  },
  {
    code: 'COS 221',
    slug: 'cos-221',
    title: 'Computer Programming II',
    units: 3, level: 200, semester: 2, lh: 30, ph: 45,
    subject: 'cs',
    crossDepartmental: true,
    hasInteractiveModules: true,
    interactiveTrackPath: '/tracks/c',
    interactiveLabel: 'C',
    interactiveModuleCount: 12,
    description: 'Programming closer to the machine, plus the data structures and algorithms that make code fast. Pointers, memory management, and the classic structures — lists, stacks, queues, trees, hash tables — with their complexity analysis.',
    topics: [
      'Program structure, compilation, and the memory model: stack vs heap',
      'Pointers, pointer arithmetic and dynamic memory allocation',
      'Structures, unions and user-defined types',
      'File handling and string manipulation',
      'Algorithm analysis: big-O notation, time and space complexity',
      'Linear data structures: arrays, linked lists, stacks and queues',
      'Trees: binary trees, binary search trees, traversals',
      'Hashing and hash tables; collision resolution',
      'Sorting and searching algorithms: insertion, merge, quick sort; linear and binary search',
    ],
    textbooks: [
      { title: 'The C Programming Language', authors: 'Brian Kernighan & Dennis Ritchie', note: '2nd ed. — the definitive, famously concise reference' },
      { title: 'Data Structures and Algorithm Analysis in C', authors: 'Mark Allen Weiss', note: '2nd ed. — rigorous and well-paced' },
    ],
    searchTerms: [
      'C programming full course for beginners',
      'Pointers in C explained visually',
      'Big O notation explained with examples',
      'Data structures and algorithms full course',
    ],
    studyTips: [
      'Areté has 12 interactive C modules covering this course — the pointer modules in particular repay slow, careful work',
      'Draw the memory diagram every single time you work with a pointer. Everyone who skips this stage struggles',
      'Big-O is not academic ceremony: it is why your 10-million-row job finishes in a minute or in a week. DTS 312 assumes you have it',
      'Implement a linked list, a stack, a BST and a hash table from scratch at least once — interviewers still ask',
    ],
  },
  {
    code: 'CSC 223',
    slug: 'csc-223',
    title: 'Discrete Structures',
    units: 2, level: 200, semester: 2, lh: 30, ph: 0,
    subject: 'cs',
    crossDepartmental: true,
    description: 'The mathematics of discrete objects — counting, graphs, trees, recurrence relations and Boolean algebra. Graph theory in particular is the direct foundation for network analysis, recommendation systems and the web-data work in UUY-DTS 311.',
    topics: [
      'Review of sets, relations and functions in a computing context',
      'Propositional and predicate logic; logical equivalence and inference',
      'Proof techniques: induction and strong induction; recursive definitions',
      'Counting: the product and sum rules, permutations, combinations, the pigeonhole principle',
      'Binomial coefficients and combinatorial identities; inclusion–exclusion',
      'Recurrence relations and their solution; the Master theorem informally',
      'Graph theory: graphs, digraphs, degree, paths, cycles, connectivity',
      'Graph representations (adjacency matrix and list), traversal, shortest paths, spanning trees',
      'Trees: rooted trees, binary trees, traversal; Boolean algebra and logic circuit minimisation',
    ],
    textbooks: [
      { title: 'Discrete Mathematics and Its Applications', authors: 'Kenneth H. Rosen', note: '8th ed. — comprehensive; the exercises are the value' },
      { title: 'Discrete Mathematics with Applications', authors: 'Susanna S. Epp', note: '5th ed. — gentler and stronger on proof writing' },
    ],
    searchTerms: [
      'Discrete mathematics full course free',
      'Graph theory basics tutorial',
      'Recurrence relations solving methods',
      'Combinatorics permutations combinations worked examples',
    ],
    studyTips: [
      'Counting problems are deceptively hard — do many, and always ask "does order matter?" and "is repetition allowed?" before choosing a formula',
      'Graph theory is the highest-value topic for a data scientist here: social networks, web link structures and recommendation graphs are all this',
      'Recurrence relations explain the running time of recursive algorithms from COS 221 — study the two courses together',
      'Rosen\'s exercises are the best preparation for the exam; work them rather than re-reading notes',
    ],
  },
  {
    code: 'DTS 224',
    slug: 'dts-224',
    title: 'Statistical Inference and Modelling',
    units: 3, level: 200, semester: 2, lh: 45, ph: 0,
    subject: 'stats',
    description: 'Reasoning from a sample to a population: estimation, confidence intervals, hypothesis testing, and the linear model. The core statistical machinery of the degree — and the part most often misused in practice.',
    topics: [
      'Populations, samples, parameters and statistics; sampling distributions',
      'The Central Limit Theorem and its practical consequences',
      'Point estimation: unbiasedness, efficiency, consistency; method of moments and maximum likelihood',
      'Interval estimation: confidence intervals for means, proportions and variances',
      'Hypothesis testing: null and alternative hypotheses, test statistics, p-values, Type I and Type II errors, power',
      'One- and two-sample tests: z, t, chi-square and F tests',
      'Analysis of variance (ANOVA): one-way and two-way',
      'Simple and multiple linear regression: estimation, interpretation, inference on coefficients',
      'Model diagnostics: residual analysis, multicollinearity, and the assumptions of the linear model',
    ],
    textbooks: [
      { title: 'Mathematical Statistics with Applications', authors: 'Wackerly, Mendenhall & Scheaffer', note: '7th ed. — rigorous and complete' },
      { title: 'Statistical Inference', authors: 'George Casella & Roger L. Berger', note: '2nd ed. — the graduate-level reference; consult rather than read cover to cover' },
      { title: 'OpenIntro Statistics', authors: 'Diez, Çetinkaya-Rundel & Barr', note: '4th ed. — free; the best explanations of p-values and confidence intervals' },
    ],
    searchTerms: [
      'Hypothesis testing explained step by step',
      'Confidence interval interpretation common mistakes',
      'Central Limit Theorem visualised',
      'Linear regression assumptions and diagnostics',
    ],
    studyTips: [
      'Learn what a p-value actually is and — more importantly — what it is not. Almost everyone gets this wrong, and examiners specifically test the misinterpretations',
      'A confidence interval is a statement about the procedure, not about the parameter. Say it correctly once and it stays right forever',
      'Simulate the Central Limit Theorem yourself in R (DTS 211): draw 1000 samples, plot the means, watch it become normal. Nothing else makes it as concrete',
      'For every test, memorise the assumptions alongside the formula — "which test do I use here?" is the exam\'s favourite question',
    ],
  },
  {
    code: 'DTS 226',
    slug: 'dts-226',
    title: 'Probability for Data Science',
    units: 3, level: 200, semester: 2, lh: 45, ph: 0,
    subject: 'stats',
    description: 'The mathematics of uncertainty: probability axioms, random variables, distributions, expectation, and the limit theorems. Probability is the language machine learning is written in — every model output is ultimately a probability statement.',
    topics: [
      'Sample spaces, events and the axioms of probability',
      'Conditional probability, independence, the law of total probability and Bayes\' theorem',
      'Discrete random variables: probability mass functions, expectation and variance',
      'Discrete distributions: Bernoulli, binomial, geometric, hypergeometric, Poisson',
      'Continuous random variables: density and distribution functions',
      'Continuous distributions: uniform, exponential, gamma, normal',
      'Joint, marginal and conditional distributions; covariance and correlation',
      'Transformations of random variables; moment generating functions',
      'Laws of large numbers and the Central Limit Theorem; introduction to Markov chains',
    ],
    textbooks: [
      { title: 'A First Course in Probability', authors: 'Sheldon Ross', note: '10th ed. — the standard; work the problems' },
      { title: 'Introduction to Probability', authors: 'Blitzstein & Hwang', note: '2nd ed. — free PDF; the Harvard Stat 110 text, with superb free video lectures' },
    ],
    searchTerms: [
      'Harvard Stat 110 Probability full lecture series free',
      'Bayes theorem explained intuitively',
      'Common probability distributions and when to use them',
      'Joint and conditional distributions tutorial',
    ],
    studyTips: [
      'Bayes\' theorem is the most important single formula in the course — it is the entire basis of Naive Bayes classifiers and of Bayesian inference',
      'Watch Joe Blitzstein\'s Stat 110 lectures (free on YouTube); they are the best probability teaching available anywhere',
      'For each distribution, learn the story that generates it ("number of successes in n trials", "waiting time until first event") — then you never have to guess which one applies',
      'Draw the sample space for small problems. Most probability mistakes are modelling mistakes, not arithmetic mistakes',
    ],
  },
  {
    code: 'UUY-DTS 224',
    slug: 'uuy-dts-224',
    title: 'Programming in Data Science',
    units: 2, level: 200, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'The working Python data stack: NumPy, pandas, Matplotlib and scikit-learn. Where the mathematics of the other 200 Level courses becomes code you can run on a real dataset.',
    topics: [
      'The scientific Python ecosystem; notebooks, environments and package management',
      'NumPy: ndarrays, dtypes, vectorisation, broadcasting, slicing and linear algebra routines',
      'pandas: Series and DataFrame, indexing, selection and filtering',
      'Data cleaning in pandas: missing values, type conversion, duplicates, string operations',
      'Reshaping and combining data: groupby, pivot, melt, merge and concat',
      'Time-series handling: datetime indexes, resampling and rolling windows',
      'Visualisation with Matplotlib and Seaborn',
      'An introduction to scikit-learn: the estimator API, fit/predict, pipelines',
      'Writing reusable code: functions, modules, virtual environments and version control with Git',
    ],
    textbooks: [
      { title: 'Python for Data Analysis', authors: 'Wes McKinney', note: '3rd ed. — written by the creator of pandas; free at wesmckinney.com/book' },
      { title: 'Python Data Science Handbook', authors: 'Jake VanderPlas', note: 'Free at jakevdp.github.io; excellent on NumPy and scikit-learn' },
    ],
    searchTerms: [
      'pandas tutorial full course for data analysis',
      'NumPy broadcasting explained',
      'Matplotlib and Seaborn plotting tutorial',
      'scikit-learn getting started guide',
    ],
    studyTips: [
      'Learn groupby properly — the split-apply-combine pattern solves an astonishing share of real analysis tasks',
      'Write vectorised NumPy/pandas code rather than Python loops; on a large dataset the difference is minutes versus hours',
      'Keep every notebook in Git from day one. Reproducibility is a graded expectation by DTS 417',
      'Recreate a chart you have seen in a news article using Matplotlib; matching a real design teaches more than following a tutorial',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  300 LEVEL — FIRST SEMESTER  (15 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'GST 311',
    slug: 'gst-311',
    title: 'Peace and Conflict Resolution',
    units: 2, level: 300, semester: 1, lh: 30, ph: 0,
    subject: 'gst',
    crossDepartmental: true,
    description: 'The nature of conflict, the conditions for peace, and the practical machinery of resolution — negotiation, mediation and arbitration. Applied to the Nigerian and West African context.',
    topics: [
      'Basic concepts: peace, conflict, violence, security and human security',
      'Types and causes of conflict: economic, political, ethnic, religious and resource conflict',
      'Theories of conflict and conflict dynamics; conflict escalation and de-escalation',
      'Peace as a process: peacekeeping, peacemaking, peacebuilding and peace enforcement',
      'Conflict resolution mechanisms: negotiation, mediation, conciliation, arbitration and adjudication',
      'Alternative dispute resolution (ADR) and traditional African conflict-resolution systems',
      'The role of government, civil society, NGOs and international bodies (UN, AU, ECOWAS)',
      'Case studies of conflict and resolution in Nigeria and West Africa',
      'Developing a culture of peace; the role of the media and of data in early warning',
    ],
    textbooks: [
      { title: 'Peace and Conflict Studies', authors: 'David P. Barash & Charles P. Webel', note: '5th ed. — the standard international text' },
      { title: 'Introduction to Peace and Conflict Resolution', authors: 'UniUyo GST course team', note: 'Use the departmental handout; the exam follows it' },
    ],
    searchTerms: [
      'Peace and conflict resolution course introduction',
      'Negotiation mediation arbitration difference explained',
      'Conflict resolution in Nigeria case studies',
      'ECOWAS conflict prevention framework',
    ],
    studyTips: [
      'Learn the resolution mechanisms as a ladder from least to most binding (negotiation → mediation → arbitration → adjudication); scenario questions ask you to pick the right rung',
      'Have two Nigerian case studies fully prepared — specificity is what separates an A from a C in the essay',
      'Conflict early-warning systems are increasingly data-driven; mentioning that connection is a genuine differentiator in your answers',
      'This is another GST course of easy marks; do the past questions rather than over-reading',
    ],
  },
  {
    code: 'DTS 312',
    slug: 'dts-312',
    title: 'Big Data Computing',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'What changes when the data no longer fits on one machine. Distributed storage and computation, the MapReduce model, Hadoop and Spark, and the architectural patterns of modern data platforms.',
    topics: [
      'Characterising big data: volume, velocity, variety, veracity and value',
      'Why scale-up fails and scale-out wins; commodity clusters and fault tolerance',
      'Distributed file systems: HDFS architecture, blocks, replication, NameNode and DataNodes',
      'The MapReduce programming model: map, shuffle, reduce; worked word-count and join examples',
      'The Hadoop ecosystem: YARN, Hive, HBase, Sqoop, Flume',
      'Apache Spark: RDDs, DataFrames, lazy evaluation, transformations vs actions, in-memory computation',
      'Spark SQL and PySpark for data processing',
      'Stream processing concepts: Kafka, windowing, and batch vs streaming architectures',
      'NoSQL stores and the CAP theorem; cloud big-data services',
    ],
    textbooks: [
      { title: 'Hadoop: The Definitive Guide', authors: 'Tom White', note: '4th ed. — the reference for HDFS and MapReduce' },
      { title: 'Learning Spark', authors: 'Damji, Wenig, Das & Lee', note: '2nd ed. — covers the modern DataFrame API; free from Databricks' },
      { title: 'Designing Data-Intensive Applications', authors: 'Martin Kleppmann', note: 'The best book on distributed data systems; read it slowly over the year' },
    ],
    searchTerms: [
      'MapReduce explained with word count example',
      'Apache Spark tutorial PySpark for beginners',
      'HDFS architecture explained',
      'CAP theorem explained simply',
    ],
    studyTips: [
      'Be able to trace a word-count through map → shuffle → reduce by hand; it is the classic exam question and it teaches the model properly',
      'Install Spark locally (or use a free Databricks Community workspace) and run PySpark on a few million rows — the concepts stay abstract until you see a job execute',
      'Understand WHY Spark is faster than MapReduce (in-memory, DAG scheduling, lazy evaluation) rather than just asserting it',
      'The CAP theorem is examined nearly every year: know what each letter means and why you can only have two',
    ],
  },
  {
    code: 'DTS 314',
    slug: 'dts-314',
    title: 'Data Management I',
    units: 3, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Database systems for the data professional, going well beyond UUY-DTS 112: advanced SQL, indexing and query performance, transactions and concurrency, and the design of data models that survive real workloads.',
    topics: [
      'Review of the relational model and relational algebra',
      'Advanced SQL: window functions, common table expressions, recursive queries, set operations',
      'Views, stored procedures, triggers and user-defined functions',
      'Physical design: storage structures, indexing (B-tree, hash), and when an index hurts',
      'Query processing and optimisation; reading an execution plan',
      'Transactions: ACID properties, concurrency control, locking, isolation levels and deadlock',
      'Recovery, backup strategies and write-ahead logging',
      'Database security: privileges, roles, injection prevention and encryption at rest',
      'Distributed databases and NoSQL families: key-value, document, column-family and graph stores',
    ],
    textbooks: [
      { title: 'Database System Concepts', authors: 'Silberschatz, Korth & Sudarshan', note: '7th ed. — the definitive university text' },
      { title: 'SQL Performance Explained', authors: 'Markus Winand', note: 'Short and exceptional on indexing; use-the-index-luke.com is the free companion' },
    ],
    searchTerms: [
      'SQL window functions tutorial',
      'Database indexing explained B-tree',
      'Transaction isolation levels explained',
      'How to read a SQL execution plan',
    ],
    studyTips: [
      'Window functions are the highest-leverage SQL skill you can learn at this level — running totals, rankings and period-over-period comparisons all become one query',
      'Run EXPLAIN on your slow queries and read the plan. Knowing why a query is slow is a rarer skill than writing SQL at all',
      'Learn the isolation levels with the anomaly each one permits (dirty read, non-repeatable read, phantom) — that table is a standing exam question',
      'Practise on a database with at least a million rows; performance concepts are invisible on toy data',
    ],
  },
  {
    code: 'DTS 318',
    slug: 'dts-318',
    title: 'Ethics and Legal Issues in Data Science',
    units: 2, level: 300, semester: 1, lh: 30, ph: 0,
    subject: 'dts',
    description: 'The obligations that come with holding and modelling data about people: privacy law, consent, algorithmic fairness, transparency and accountability. The course that determines whether your technical skill does good or harm.',
    topics: [
      'Ethical frameworks applied to data: consequentialist, deontological and virtue perspectives',
      'Privacy: informational self-determination, consent, purpose limitation and data minimisation',
      'Anonymisation, pseudonymisation and re-identification risk; k-anonymity and differential privacy in outline',
      'Data protection law: the Nigeria Data Protection Act, the NDPR, and the GDPR as a comparator',
      'Rights of data subjects: access, rectification, erasure, portability and objection',
      'Algorithmic bias and fairness: sources of bias, fairness metrics, and their trade-offs',
      'Transparency, explainability and the right to an explanation; black-box models in high-stakes decisions',
      'Accountability, auditing, and the governance of automated decision-making',
      'Professional codes of conduct and case studies of data science failures',
    ],
    textbooks: [
      { title: 'Weapons of Math Destruction', authors: 'Cathy O\'Neil', note: 'The essential account of how models cause real-world harm' },
      { title: 'Ethics and Data Science', authors: 'Loukides, Mason & Patil', note: 'Short, free, and practical on day-to-day decisions' },
      { title: 'Fairness and Machine Learning', authors: 'Barocas, Hardt & Narayanan', note: 'Free at fairmlbook.org; the rigorous treatment of fairness metrics' },
    ],
    searchTerms: [
      'Nigeria Data Protection Act 2023 summary',
      'Algorithmic bias examples and explanations',
      'GDPR principles explained simply',
      'Differential privacy explained intuitively',
    ],
    studyTips: [
      'Know the Nigeria Data Protection Act and the NDPR specifically — Nigerian law is what you are examined on and what will actually govern your work',
      'Learn why the different fairness metrics are mathematically incompatible; "just make it fair" is not an available option and examiners want you to know that',
      'Prepare three real case studies (e.g. COMPAS, a credit-scoring case, a facial-recognition case) in enough detail to analyse rather than merely name',
      'This is the course whose content you will most often actually need after graduation — treat it as professional training, not a compliance box',
    ],
  },
  {
    code: 'UUY-DTS 311',
    slug: 'uuy-dts-311',
    title: 'Analytics of Web Data',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Measuring and analysing behaviour on the web: clickstream and log data, web analytics platforms, funnels and attribution, plus text and network analysis of web content. Builds directly on UUY-DTS 121.',
    topics: [
      'Sources of web data: server logs, clickstream, tags, cookies and event tracking',
      'Web analytics platforms: metrics, dimensions, sessions, users and events (GA4 model)',
      'Traffic analysis: acquisition channels, bounce and engagement, retention and cohorts',
      'Conversion funnels, goals and attribution models',
      'Segmentation of web audiences; behavioural clustering',
      'A/B testing and experimentation on the web: design, sample size and interpretation',
      'Web content mining: scraping at scale, parsing, deduplication and storage',
      'Text analytics on web content: tokenisation, TF-IDF, sentiment analysis, topic modelling',
      'Web structure mining: link graphs, PageRank, and social network analysis measures',
    ],
    textbooks: [
      { title: 'Web Analytics 2.0', authors: 'Avinash Kaushik', note: 'The classic on measurement strategy rather than tool mechanics' },
      { title: 'Mining the Social Web', authors: 'Matthew A. Russell & Mikhail Klassen', note: '3rd ed. — practical Python for web and social data' },
      { title: 'Mining of Massive Datasets', authors: 'Leskovec, Rajaraman & Ullman', note: 'Free at mmds.org; the reference for PageRank and link analysis' },
    ],
    searchTerms: [
      'Google Analytics 4 tutorial for beginners',
      'PageRank algorithm explained',
      'TF-IDF explained with example',
      'A/B testing statistics sample size',
    ],
    studyTips: [
      'Set up analytics on any small site (even a personal page) and watch real traffic — the vocabulary only sticks when attached to real numbers',
      'PageRank is an eigenvector computation, which connects straight back to your linear algebra; understanding it that way is what earns the top marks',
      'A/B testing is applied DTS 224 — the sample-size and p-value questions are the same statistics in a commercial costume',
      'Be careful with the ethics of scraping here; the legal boundaries you learned in DTS 318 are examinable in this context too',
    ],
  },
  {
    code: 'UUY-DTS 313',
    slug: 'uuy-dts-313',
    title: 'Machine Learning and Applications',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'The core machine learning course: supervised and unsupervised algorithms, how they are trained, how they are evaluated, and how they fail. The technical centrepiece of the degree.',
    topics: [
      'The learning problem: supervised, unsupervised, semi-supervised and reinforcement learning',
      'Linear and logistic regression; loss functions and gradient descent',
      'Regularisation: ridge, lasso, and the bias–variance trade-off revisited',
      'k-nearest neighbours, Naive Bayes and support vector machines',
      'Decision trees, and ensembles: bagging, random forests and gradient boosting',
      'Unsupervised learning: k-means, hierarchical clustering, DBSCAN',
      'Dimensionality reduction: principal component analysis and t-SNE',
      'Model evaluation: confusion matrix, precision, recall, F1, ROC/AUC, cross-validation, hyperparameter tuning',
      'Introduction to neural networks: perceptrons, backpropagation, and where deep learning applies',
    ],
    textbooks: [
      { title: 'An Introduction to Statistical Learning', authors: 'James, Witten, Hastie & Tibshirani', note: '2nd ed. — free at statlearning.com; the ideal level for this course' },
      { title: 'Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow', authors: 'Aurélien Géron', note: '3rd ed. — the best practical companion' },
      { title: 'The Elements of Statistical Learning', authors: 'Hastie, Tibshirani & Friedman', note: '2nd ed. — free; the rigorous reference for when you want the mathematics' },
    ],
    searchTerms: [
      'Machine learning full course Andrew Ng free',
      'Random forest and gradient boosting explained',
      'Precision recall F1 score ROC AUC explained',
      'PCA principal component analysis explained visually',
    ],
    studyTips: [
      'Accuracy is a misleading metric on imbalanced data — learn precision, recall and the ROC curve properly, and be able to argue which matters for a given problem',
      'Implement linear regression and k-means from scratch in NumPy once. After that, using scikit-learn is informed rather than magical',
      'For every algorithm, learn its inductive bias — what it assumes about the data. That is what tells you when to reach for it',
      'Compete in one beginner Kaggle competition; the feedback loop teaches evaluation discipline faster than any lecture',
    ],
  },
  {
    code: 'UUY-DTS 317',
    slug: 'uuy-dts-317',
    title: 'Basic Operating Systems for Data Science',
    units: 2, level: 300, semester: 1, lh: 15, ph: 45,
    subject: 'cs',
    description: 'Operating system fundamentals with a practical Linux emphasis: processes, memory, file systems, the shell, and containers. The environment every data pipeline actually runs in.',
    topics: [
      'Operating system functions, structure and system calls',
      'Processes and threads: states, scheduling, context switching and inter-process communication',
      'Concurrency: race conditions, mutual exclusion, semaphores and deadlock',
      'Memory management: paging, segmentation, virtual memory and thrashing',
      'File systems: structure, permissions, links, mounting and I/O',
      'The Linux shell: navigation, pipes and redirection, grep/awk/sed, process control',
      'Shell scripting and job scheduling with cron',
      'Package management, environments and dependency isolation',
      'Virtualisation and containers: Docker images, containers and volumes for reproducible analysis',
    ],
    textbooks: [
      { title: 'Operating System Concepts', authors: 'Silberschatz, Galvin & Gagne', note: '10th ed. — the standard text' },
      { title: 'The Linux Command Line', authors: 'William Shotts', note: '2nd ed. — free at linuxcommand.org; the fastest route to shell fluency' },
    ],
    searchTerms: [
      'Linux command line tutorial for beginners',
      'Operating system processes and threads explained',
      'Virtual memory and paging explained',
      'Docker tutorial for data science',
    ],
    studyTips: [
      'Use Linux (or WSL on Windows) as your daily environment for one semester — nothing else builds shell fluency',
      'Learn grep, awk, sed and pipes properly: on a 10 GB log file the command line beats pandas, and it beats it by a lot',
      'Docker is the answer to "it works on my machine" — containerise one of your own projects and the concept lands permanently',
      'Deadlock conditions (mutual exclusion, hold-and-wait, no preemption, circular wait) are a guaranteed exam question — memorise all four',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  300 LEVEL — SECOND SEMESTER  (15 units) — industrial placement
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'DTS 399',
    slug: 'dts-399',
    title: 'SIWES',
    units: 6, level: 300, semester: 2, lh: 0, ph: 270,
    subject: 'siwes',
    description: 'Students Industrial Work Experience Scheme — a full-semester supervised industrial placement. Six units and 270 practical hours, the largest single course in the programme, assessed on your logbook, technical report and defence.',
    topics: [
      'Securing a placement relevant to data science: analytics teams, banks, telcos, research institutes, government agencies, tech companies',
      'Workplace conduct, confidentiality and professional ethics',
      'Applying the data lifecycle in an organisational setting',
      'Maintaining the SIWES logbook: daily entries, tasks, tools and skills acquired',
      'Industrial supervisor and institution-based supervisor assessment',
      'Writing the SIWES technical report: structure, evidence and reflection',
      'Oral defence of the placement experience',
      'Identifying a real-world problem that could become your final-year project',
    ],
    textbooks: [
      { title: 'ITF SIWES Guidelines', authors: 'Industrial Training Fund', note: 'The official rules on logbooks, forms and assessment — read them before you start' },
      { title: 'Departmental SIWES Handbook', authors: 'Department of Data Science, UniUyo', note: 'Report format and marking scheme; follow it exactly' },
    ],
    searchTerms: [
      'SIWES logbook how to fill correctly',
      'SIWES technical report sample format',
      'Data analyst internship tasks examples',
      'ITF SIWES registration process Nigeria',
    ],
    studyTips: [
      'Start looking for a placement a full semester early — the good data-related placements go first and generic clerical placements waste your six units',
      'Fill the logbook the same day, every day. Reconstructing five months of entries the week before submission is obvious to any examiner and costs marks',
      'Ask to be given at least one end-to-end task you own; a placement where you only observed is very hard to write six units of report about',
      'Treat SIWES as final-year project reconnaissance — the best projects come from a real problem you saw at your placement',
    ],
  },
  {
    code: 'UUY-DTS 321',
    slug: 'uuy-dts-321',
    title: 'Computing Skills',
    units: 3, level: 300, semester: 2, lh: 0, ph: 120,
    subject: 'dts',
    description: 'A wholly practical course consolidating the professional toolchain: version control, environments, testing, documentation and deployment. The skills that make you employable rather than merely knowledgeable.',
    topics: [
      'Version control with Git: commits, branches, merging, rebasing, pull requests and collaboration',
      'Project structure and dependency management for reproducible analysis',
      'Writing clean, documented, reusable code; style guides and code review',
      'Testing: unit tests for data code, assertions and data validation',
      'Command-line productivity and automation',
      'Notebooks vs scripts vs packages: choosing the right artefact',
      'Documentation: READMEs, docstrings and technical writing for code',
      'Deployment basics: APIs for models, containerisation and cloud hosting',
      'Building and presenting a professional portfolio',
    ],
    textbooks: [
      { title: 'Pro Git', authors: 'Scott Chacon & Ben Straub', note: '2nd ed. — free at git-scm.com/book; the definitive Git reference' },
      { title: 'The Pragmatic Programmer', authors: 'David Thomas & Andrew Hunt', note: '20th anniversary ed. — on professional craft rather than any one tool' },
    ],
    searchTerms: [
      'Git and GitHub full course for beginners',
      'Python project structure best practices',
      'Writing unit tests for data pipelines',
      'How to build a data science portfolio',
    ],
    studyTips: [
      'Make small, frequent commits with real messages. "update" and "final v2 final" are habits that will embarrass you professionally',
      'Every project you have ever done should end up in a public GitHub repo with a README that explains the problem, the data and the result',
      'Learn branching and pull requests properly — this is how every team you will ever join actually works',
      'Testing data code feels unnecessary until a silent schema change corrupts a month of results. Write the assertions',
    ],
  },
  {
    code: 'UUY-DTS 322',
    slug: 'uuy-dts-322',
    title: 'Industry-based Innovation',
    units: 3, level: 300, semester: 2, lh: 0, ph: 120,
    subject: 'dts',
    description: 'A practical, industry-facing innovation project: identify a real problem in an organisation or sector, design a data-driven solution, and demonstrate it. Runs alongside SIWES and feeds directly into your final-year work.',
    topics: [
      'Identifying an innovation opportunity within an industry context',
      'Stakeholder engagement and requirements gathering',
      'Design thinking: empathise, define, ideate, prototype, test',
      'Assessing data availability, quality and access constraints for a proposed solution',
      'Rapid prototyping of a data product',
      'Feasibility: technical, operational, economic and legal',
      'Measuring impact: defining success metrics before building',
      'Pitching a solution to a non-technical audience',
      'Documentation and handover of an innovation project',
    ],
    textbooks: [
      { title: 'The Lean Startup', authors: 'Eric Ries', note: 'Build–measure–learn applied to any new product, including internal ones' },
      { title: 'Data Science for Business', authors: 'Foster Provost & Tom Fawcett', note: 'On framing a data project so that it actually creates value' },
    ],
    searchTerms: [
      'Design thinking process explained',
      'How to build a data product MVP',
      'Requirements gathering techniques',
      'Pitching a technical project to non-technical stakeholders',
    ],
    studyTips: [
      'Choose a problem you have personally observed — a real irritation you witnessed at your SIWES placement beats an impressive-sounding invented one',
      'Check data availability before you commit to an idea; the most common failure here is a great plan with no obtainable data',
      'Define your success metric in week one and hold yourself to it — this is exactly what UUY-DTS 211 taught you',
      'Prototype ugly and early. A working rough demo persuades far more than a polished slide deck',
    ],
  },
  {
    code: 'UUY-DTS 323',
    slug: 'uuy-dts-323',
    title: 'Seminar',
    units: 3, level: 300, semester: 2, lh: 0, ph: 40,
    subject: 'dts',
    description: 'Research and presentation skills: select a current topic in data science, review the literature, and present and defend it before staff and peers. Preparation for the literature review and defence of DTS 417/428.',
    topics: [
      'Selecting and scoping a seminar topic in data science',
      'Literature search: Google Scholar, arXiv, IEEE Xplore, ACM Digital Library, open-access sources',
      'Evaluating sources: peer review, preprints, predatory journals and credibility',
      'Reading a research paper efficiently: the three-pass method',
      'Synthesising a literature review rather than summarising papers one by one',
      'Citation and referencing styles; reference managers (Zotero, Mendeley)',
      'Academic integrity and plagiarism avoidance',
      'Designing effective slides and speaking to a technical audience',
      'Handling questions and defending your position',
    ],
    textbooks: [
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — the best short guide to technical writing and presenting' },
      { title: 'How to Read a Paper', authors: 'S. Keshav', note: 'A three-page paper describing the three-pass method; read it first' },
    ],
    searchTerms: [
      'How to read a research paper three pass method',
      'How to write a literature review',
      'Zotero tutorial reference manager',
      'Academic presentation slide design tips',
    ],
    studyTips: [
      'Pick a topic narrow enough to cover properly — "AI in healthcare" is a book; "deep learning for malaria diagnosis from blood smear images" is a seminar',
      'Read 15–20 papers but present the synthesis, not the list. A literature review that goes "Paper A said…, Paper B said…" scores poorly',
      'Use a reference manager from your first paper; reformatting 30 citations by hand is a self-inflicted wound',
      'Rehearse out loud with a timer at least three times. The questions afterwards are where marks are won and lost — prepare for the obvious ones',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  //  400 LEVEL — FIRST SEMESTER  (15 units)
  // ═══════════════════════════════════════════════════════════════
  {
    code: 'COS 411',
    slug: 'cos-411',
    title: 'Research Methodology and Technical Report Writing',
    units: 2, level: 400, semester: 1, lh: 45, ph: 0,
    subject: 'cs',
    crossDepartmental: true,
    description: 'How research is designed, conducted and written up: problem formulation, research design, data collection and analysis, and the structure of a technical report. Runs in parallel with DTS 417, which is where you apply all of it.',
    topics: [
      'The nature and purpose of research; basic vs applied research',
      'Identifying a research problem; aims, objectives, research questions and hypotheses',
      'Literature review: purpose, sources, synthesis and identifying the research gap',
      'Research design: experimental, quasi-experimental, survey, case study and design science',
      'Sampling techniques and sample-size determination',
      'Data collection instruments; validity and reliability',
      'Data analysis and the presentation of results; tables and figures in a report',
      'Structure of a technical report/thesis: abstract, introduction, literature, methodology, results, discussion, conclusion',
      'Referencing, plagiarism, research ethics and the ethics of AI-assisted writing',
    ],
    textbooks: [
      { title: 'Research Methodology: Methods and Techniques', authors: 'C.R. Kothari & Gaurav Garg', note: '4th ed. — the standard text in Nigerian universities' },
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — specifically about writing up computing research well' },
    ],
    searchTerms: [
      'Research methodology full course free',
      'How to write a research proposal',
      'Sample size determination formula explained',
      'Final year project report structure computer science',
    ],
    studyTips: [
      'Write your DTS 417 proposal as the coursework for this course — do the work once and use it twice',
      'Aims vs objectives vs research questions is examined every year and confused by most students. Learn the distinction precisely',
      'Your methodology chapter must be reproducible: another student should be able to repeat your study from it alone',
      'Learn your department\'s referencing style now and apply it from your first note; retrofitting citations is miserable',
    ],
  },
  {
    code: 'INS 411',
    slug: 'ins-411',
    title: 'Project Management',
    units: 2, level: 400, semester: 1, lh: 30, ph: 0,
    subject: 'ins',
    crossDepartmental: true,
    description: 'Planning, executing and controlling projects: scope, schedule, cost, risk and stakeholders, across both traditional and agile approaches. Directly applicable to running your final-year project on time.',
    topics: [
      'Project characteristics, the project lifecycle and the role of the project manager',
      'Project initiation: charter, stakeholders and scope definition',
      'Work breakdown structure and activity definition',
      'Scheduling: Gantt charts, network diagrams, CPM and PERT; critical path and float',
      'Resource allocation, levelling and cost estimation; budgeting',
      'Risk management: identification, qualitative and quantitative analysis, response planning',
      'Quality management and change control',
      'Agile approaches: Scrum roles, sprints, backlogs and ceremonies; Kanban',
      'Monitoring and control: earned value analysis; project closure and lessons learned',
    ],
    textbooks: [
      { title: 'A Guide to the Project Management Body of Knowledge (PMBOK Guide)', authors: 'Project Management Institute', note: '7th ed. — the reference framework the exam follows' },
      { title: 'Project Management: A Systems Approach', authors: 'Harold Kerzner', note: '13th ed. — thorough on planning and control techniques' },
    ],
    searchTerms: [
      'Critical path method CPM worked example',
      'PERT analysis three point estimation',
      'Scrum framework explained in 10 minutes',
      'Earned value management explained',
    ],
    studyTips: [
      'CPM/PERT network problems are guaranteed and are pure method marks — practise drawing the network, computing earliest/latest times and identifying the critical path until it is mechanical',
      'Know the difference between agile and waterfall well enough to argue which suits a data science project (usually agile — requirements shift as you learn what the data supports)',
      'Actually build a Gantt chart for your DTS 417 project; students who plan their project finish it',
      'Learn the earned value formulas (CV, SV, CPI, SPI) — they are compact, examinable and frequently forgotten',
    ],
  },
  {
    code: 'DTS 413',
    slug: 'dts-413',
    title: 'Data Visualization for Data-driven Decision Making',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'The theory and craft of visual communication: perception, encoding, chart selection, dashboard design and narrative. How an analysis becomes a decision.',
    topics: [
      'Why visualisation works: visual perception, pre-attentive attributes and cognitive load',
      'The grammar of graphics: data, aesthetic mappings, geometries, scales, facets',
      'Choosing an encoding: position, length, angle, area, colour, shape — and their accuracy ranking',
      'Chart selection for comparison, distribution, composition, relationship and trend',
      'Colour: sequential, diverging and categorical palettes; colour-blind-safe design',
      'Common distortions: truncated axes, dual axes, misleading area, cherry-picked ranges',
      'Dashboard design: layout, hierarchy, interactivity and the audience\'s question',
      'Interactive and web visualisation: Plotly, Dash/Streamlit, D3 concepts',
      'Data storytelling: narrative structure, annotation and the single message per chart',
    ],
    textbooks: [
      { title: 'The Visual Display of Quantitative Information', authors: 'Edward R. Tufte', note: '2nd ed. — the foundational text; still the best' },
      { title: 'Fundamentals of Data Visualization', authors: 'Claus O. Wilke', note: 'Free at clauswilke.com/dataviz; the most practical modern guide' },
      { title: 'Storytelling with Data', authors: 'Cole Nussbaumer Knaflic', note: 'On the communication half; short and immediately applicable' },
    ],
    searchTerms: [
      'Data visualization best practices guide',
      'How to choose the right chart type',
      'Colorblind safe palettes for data visualization',
      'Streamlit dashboard tutorial python',
    ],
    studyTips: [
      'Learn the accuracy ranking of visual encodings (position beats length beats angle beats area beats colour) — it answers most "which chart?" questions on its own',
      'Never use a pie chart with more than three slices, and be ready to justify that rule in the exam',
      'Collect bad charts from newspapers and rebuild them properly; critique-and-redesign is the fastest way to develop judgement',
      'Every chart should have one message. If you cannot state it in a sentence, split the chart in two',
    ],
  },
  {
    code: 'DTS 417',
    slug: 'dts-417',
    title: 'Final Year Project I',
    units: 3, level: 400, semester: 1, lh: 0, ph: 135,
    subject: 'dts',
    description: 'The first half of the capstone: choose a problem, review the literature, design the methodology, secure the data, and defend a proposal. What you do this semester determines whether DTS 428 is manageable or miserable.',
    topics: [
      'Selecting a feasible project topic with a genuine data source',
      'Defining the problem statement, aims, objectives and research questions',
      'Conducting and writing the literature review; establishing the research gap',
      'Designing the methodology: data, methods, evaluation criteria and tools',
      'Data acquisition, ethical clearance and data-use agreements where required',
      'Preliminary exploratory analysis and feasibility demonstration',
      'Project planning: milestones, deliverables and risk register',
      'Writing chapters one to three of the project report',
      'The proposal defence: presenting and defending your design',
    ],
    textbooks: [
      { title: 'Research Methodology: Methods and Techniques', authors: 'C.R. Kothari & Gaurav Garg', note: 'Use alongside COS 411; the methodology chapter follows it' },
      { title: 'Departmental Project Handbook', authors: 'Department of Data Science, UniUyo', note: 'Format, margins, chapter structure and marking scheme — follow it literally' },
    ],
    searchTerms: [
      'Data science final year project ideas',
      'How to write chapter 1 to 3 of a project',
      'Literature review writing guide',
      'Project proposal defence tips',
    ],
    studyTips: [
      'Confirm you can actually obtain the data before you commit to the topic. No-data is the number one cause of a stalled project',
      'Choose a supervisor whose interests match your topic and agree a fixed meeting rhythm in week one',
      'Do the entire pipeline on a tiny sample early — an end-to-end rough version in month one beats a perfect chapter one and no code',
      'Write as you go. Chapters one to three written in the last two weeks are visibly written in the last two weeks',
    ],
  },
  {
    code: 'UUY-DTS 410',
    slug: 'uuy-dts-410',
    title: 'Special Topics in Data Science',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'A rotating course on current developments in the field — the content varies year to year with staff expertise and what is moving in the discipline. Recent themes include deep learning, large language models, MLOps and causal inference.',
    topics: [
      'Current research directions in data science and machine learning',
      'Deep learning architectures: CNNs for images, RNNs/Transformers for sequences',
      'Large language models: pretraining, fine-tuning, prompting and retrieval-augmented generation',
      'Natural language processing pipelines and embeddings',
      'MLOps: experiment tracking, model registries, monitoring and drift detection',
      'Causal inference: correlation vs causation, randomised experiments, difference-in-differences',
      'Responsible and explainable AI: SHAP, LIME and model interpretability',
      'Edge cases and emerging areas: federated learning, synthetic data, AutoML',
      'Reading and critiquing a current research paper',
    ],
    textbooks: [
      { title: 'Deep Learning', authors: 'Goodfellow, Bengio & Courville', note: 'Free at deeplearningbook.org; the standard reference' },
      { title: 'Designing Machine Learning Systems', authors: 'Chip Huyen', note: 'The best book on ML in production — the MLOps half of this course' },
    ],
    searchTerms: [
      'Deep learning specialisation free course',
      'Transformers explained attention is all you need',
      'MLOps fundamentals explained',
      'SHAP values model interpretability tutorial',
    ],
    studyTips: [
      'Confirm this year\'s actual syllabus with the lecturer in week one — the content genuinely rotates, so last year\'s notes may not apply',
      'Whatever the theme, the assessment usually involves reading current papers; practise the three-pass method from UUY-DTS 323',
      'This is the course closest to what employers are hiring for right now — treat it as career investment, not a filler 2 units',
      'Reproduce one result from a paper on a small dataset; "I reimplemented it" is a strong thing to say in an interview',
    ],
  },
  {
    code: 'UUY-DTS 411',
    slug: 'uuy-dts-411',
    title: 'Bio-Analytics Systems and Applications',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Data science applied to biological and health data: genomics, clinical records, epidemiological modelling and public-health surveillance, with the specific statistical and ethical challenges those domains bring.',
    topics: [
      'Introduction to biological data: genomic, transcriptomic, proteomic and clinical data types',
      'Biological databases and formats: GenBank, FASTA/FASTQ, VCF, UniProt',
      'Sequence analysis: alignment, BLAST, and motif finding',
      'Gene expression analysis and the high-dimension/low-sample-size problem',
      'Multiple testing and false discovery rate correction',
      'Electronic health records: structure, coding systems (ICD, SNOMED) and data quality',
      'Survival analysis: Kaplan–Meier curves, hazard functions, Cox regression',
      'Epidemiological modelling: incidence, prevalence, SIR/SEIR compartment models',
      'Health data privacy, consent and the ethics of biomedical data',
    ],
    textbooks: [
      { title: 'Bioinformatics and Functional Genomics', authors: 'Jonathan Pevsner', note: '3rd ed. — the standard broad introduction' },
      { title: 'Biostatistics: A Foundation for Analysis in the Health Sciences', authors: 'Daniel & Cross', note: '11th ed. — the statistical half of this course' },
    ],
    searchTerms: [
      'Bioinformatics for beginners full course',
      'Survival analysis Kaplan Meier explained',
      'SIR model epidemiology explained',
      'False discovery rate multiple testing correction',
    ],
    studyTips: [
      'The multiple-testing problem is the defining statistical issue in genomics: with 20,000 genes tested at p < 0.05 you get 1,000 false positives by chance. Understand Bonferroni and Benjamini–Hochberg',
      'Survival analysis is the one technique here that transfers everywhere — customer churn and equipment failure are the same mathematics',
      'Use real public data (NCBI, WHO, NCDC) for practicals; health data science is unusually well served by open datasets',
      'The ethics content is not decorative — health data carries the strictest consent and privacy obligations of any domain you will work in',
    ],
  },
  {
    code: 'UUY-DTS 412',
    slug: 'uuy-dts-412',
    title: 'Data Management II',
    units: 2, level: 400, semester: 1, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Enterprise-scale data management, continuing DTS 314: data architecture, pipelines and orchestration, master data and quality management, governance, and the modern data stack.',
    topics: [
      'Enterprise data architecture: operational vs analytical systems',
      'Data integration: ETL vs ELT, batch vs streaming ingestion',
      'Pipeline orchestration and scheduling; DAGs and tools such as Airflow',
      'Data lakes, data warehouses and the lakehouse pattern; file formats (Parquet, Avro, ORC)',
      'Master data management and reference data',
      'Data quality: dimensions, profiling, validation rules and monitoring',
      'Metadata management, data catalogues and data lineage',
      'Data governance: ownership, stewardship, policy and regulatory compliance',
      'Data lifecycle management: retention, archiving and secure disposal',
    ],
    textbooks: [
      { title: 'Fundamentals of Data Engineering', authors: 'Joe Reis & Matt Housley', note: 'The best current overview of the whole discipline' },
      { title: 'DAMA-DMBOK: Data Management Body of Knowledge', authors: 'DAMA International', note: '2nd ed. — the governance framework this course follows' },
      { title: 'The Data Warehouse Toolkit', authors: 'Ralph Kimball & Margy Ross', note: '3rd ed. — read alongside UUY-DTS 423' },
    ],
    searchTerms: [
      'ETL vs ELT explained',
      'Apache Airflow tutorial for beginners',
      'Data lake vs data warehouse vs lakehouse',
      'Data governance framework DAMA DMBOK',
    ],
    studyTips: [
      'Build one real pipeline end to end (ingest → transform → store → schedule), even a small one. Data engineering is understood by doing',
      'Know why Parquet beats CSV for analytics (columnar, compressed, typed) — a favourite short-answer question and a genuinely useful fact',
      'Data quality dimensions (accuracy, completeness, consistency, timeliness, validity, uniqueness) are examinable as a list — memorise them',
      'Governance sounds bureaucratic until you inherit an undocumented database. Frame your answers around that reality',
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
    description: 'From idea to operating business: opportunity validation, the business plan, funding, registration and launch. The practical sequel to ENT 221, assessed largely on a venture you actually develop.',
    topics: [
      'Opportunity screening and validation; customer discovery',
      'Developing the business plan: market, operations, management and financial sections',
      'Market research and competitive analysis',
      'Financial projections: startup costs, cash flow, break-even and unit economics',
      'Sources of funding in Nigeria: grants, competitions, BOI/BOA, angels and venture capital',
      'Legal formation: CAC registration, taxation, intellectual property and contracts',
      'Building and managing a founding team',
      'Go-to-market strategy, pricing and customer acquisition',
      'Pitching to investors: the pitch deck and the elevator pitch',
    ],
    textbooks: [
      { title: 'The Lean Startup', authors: 'Eric Ries', note: 'On validating before building — the core discipline of this course' },
      { title: 'Business Model Generation', authors: 'Osterwalder & Pigneur', note: 'The canvas, in depth and visually' },
    ],
    searchTerms: [
      'How to write a business plan step by step',
      'Startup financial projections template explained',
      'Pitch deck structure for investors',
      'Startup funding options in Nigeria',
    ],
    studyTips: [
      'Talk to at least ten potential customers before finalising your plan; the marks and the reality both reward evidence over assertion',
      'Get the financial section right — it is where most student business plans collapse, and where markers look hardest',
      'A data-focused venture is your natural advantage: analytics-as-a-service for SMEs, agricultural data products, health analytics',
      'Rehearse a 60-second pitch until it is effortless. You will use it far beyond this course',
    ],
  },
  {
    code: 'DTS 426',
    slug: 'dts-426',
    title: 'Data Science Innovation and Entrepreneurship',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Entrepreneurship specific to data: what makes a data product commercially viable, how data businesses are structured, and how to price, protect and scale an offering built on data and models.',
    topics: [
      'The data product landscape: analytics services, embedded models, data marketplaces, decision tools',
      'Identifying commercially viable data opportunities; the value of a prediction',
      'Data as an asset: acquisition, ownership, licensing and the data moat',
      'Business models for data products: subscription, usage-based, freemium, marketplace',
      'Costing a data product: infrastructure, compute, storage and human-in-the-loop costs',
      'Building an MVP for a data product; when a spreadsheet is the right first version',
      'Intellectual property for data and models; trade secrets vs patents',
      'Regulatory constraints on data businesses in Nigeria',
      'Scaling: from a one-off analysis to a repeatable, automated service',
    ],
    textbooks: [
      { title: 'Data Science for Business', authors: 'Foster Provost & Tom Fawcett', note: 'The core text for thinking commercially about data' },
      { title: 'Prediction Machines', authors: 'Agrawal, Gans & Goldfarb', note: 'On the economics of AI — what falling prediction cost changes about a business' },
    ],
    searchTerms: [
      'Data product management fundamentals',
      'AI startup business models explained',
      'How to price a SaaS or data product',
      'Data monetisation strategies',
    ],
    studyTips: [
      'The central question of this course is "who pays, and why?" — a technically excellent model with no buyer is a hobby',
      'Prediction Machines\' framing (AI reduces the cost of prediction; judgement becomes the scarce input) is a genuinely useful lens for essay answers',
      'Cost out the infrastructure for your idea honestly; cloud compute has bankrupted more data startups than bad models have',
      'Combine this with ENT 321 and DTS 428 — one coherent venture built on your project is worth far more than three disconnected submissions',
    ],
  },
  {
    code: 'DTS 428',
    slug: 'dts-428',
    title: 'Final Year Project II',
    units: 3, level: 400, semester: 2, lh: 0, ph: 135,
    subject: 'dts',
    description: 'The capstone completed: implement the methodology designed in DTS 417, evaluate the results, write the full report and defend it. The single largest determinant of your final-year classification.',
    topics: [
      'Implementing the methodology: data preparation, modelling and iteration',
      'Experimental rigour: baselines, controls, reproducible pipelines and version control',
      'Evaluation against the criteria set in the proposal; statistical validity of the comparison',
      'Interpreting results honestly, including negative and inconclusive findings',
      'Writing chapters four and five: results, discussion, conclusion and recommendations',
      'Producing publication-quality tables and figures',
      'Assembling the complete report to the departmental format',
      'Preparing the demonstration/artefact for assessment',
      'The final defence: presentation, demonstration and viva questions',
    ],
    textbooks: [
      { title: 'Writing for Computer Science', authors: 'Justin Zobel', note: '3rd ed. — how to write up results and discussion well' },
      { title: 'Departmental Project Handbook', authors: 'Department of Data Science, UniUyo', note: 'Binding format and marking scheme — deviations cost marks' },
    ],
    searchTerms: [
      'How to write chapter 4 and 5 of a project',
      'Final year project defence questions and answers',
      'Presenting research results effectively',
      'Reproducible research checklist',
    ],
    studyTips: [
      'A negative result honestly analysed scores better than a suspiciously perfect one. Examiners have seen fabricated accuracy figures before',
      'Always report a baseline. "My model got 87%" means nothing without "and the trivial baseline gets 85%"',
      'Rehearse the defence with a friend playing hostile examiner. Prepare specifically for "why this method and not X?" and "what are the limitations?"',
      'Freeze your code and results two weeks before submission and spend that time on the report. Late changes are what break projects',
    ],
  },
  {
    code: 'UUY-DTS 421',
    slug: 'uuy-dts-421',
    title: 'Data Science Risk and Management',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'What goes wrong with data and models, and how to manage it: model risk, data risk, operational failure, and the governance structures that catch problems before they reach production.',
    topics: [
      'Risk concepts: threat, vulnerability, likelihood, impact and the risk register',
      'Data risk: quality failures, silent schema change, leakage, and loss of provenance',
      'Model risk: overfitting, target leakage, spurious correlation, and inappropriate deployment',
      'Concept drift and data drift; monitoring models in production',
      'Bias, fairness and discrimination risk in deployed models',
      'Security risk for data systems: access control, adversarial inputs, model theft, privacy attacks',
      'Regulatory and compliance risk; auditability of automated decisions',
      'Model risk management frameworks, validation and independent review',
      'Business continuity, incident response and post-incident review for data systems',
    ],
    textbooks: [
      { title: 'Designing Machine Learning Systems', authors: 'Chip Huyen', note: 'Strong on drift, monitoring and production failure modes' },
      { title: 'Weapons of Math Destruction', authors: 'Cathy O\'Neil', note: 'The harm case studies that motivate the whole course' },
      { title: 'ISO 31000 / NIST AI Risk Management Framework', authors: 'ISO / NIST', note: 'The frameworks; the NIST AI RMF is free and short' },
    ],
    searchTerms: [
      'Model risk management framework explained',
      'Data drift vs concept drift explained',
      'NIST AI Risk Management Framework summary',
      'Target leakage in machine learning examples',
    ],
    studyTips: [
      'Target leakage is the classic silent killer: a feature that would not exist at prediction time gives 99% accuracy in testing and fails completely in production. Learn to spot it',
      'Be able to distinguish data drift (the inputs changed) from concept drift (the relationship changed) with an example of each',
      'Build a risk register for your DTS 428 project — it is real practice and it genuinely protects the project',
      'The NIST AI RMF is free, short and current; reading it is the highest-value hour you can spend on this course',
    ],
  },
  {
    code: 'UUY-DTS 422',
    slug: 'uuy-dts-422',
    title: 'Cloud Application Development',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Building and deploying applications on cloud infrastructure: service models, core compute and storage services, containers and serverless, and the deployment of data and ML workloads to the cloud.',
    topics: [
      'Cloud computing concepts: IaaS, PaaS, SaaS; public, private and hybrid clouds',
      'Core cloud services: virtual machines, object storage, managed databases, networking basics',
      'Identity and access management; the principle of least privilege',
      'Containers in the cloud: images, registries and orchestration concepts',
      'Serverless computing: functions, event-driven architecture and their trade-offs',
      'Building and deploying a REST API for a model',
      'Managed data and ML services on cloud platforms',
      'Infrastructure as code and CI/CD pipelines',
      'Cost management, scaling, monitoring and cloud security fundamentals',
    ],
    textbooks: [
      { title: 'Cloud Computing: Concepts, Technology and Architecture', authors: 'Thomas Erl', note: 'The conceptual grounding, platform-agnostic' },
      { title: 'Architecting the Cloud', authors: 'Michael J. Kavis', note: 'On choosing service models and designing for the cloud' },
    ],
    searchTerms: [
      'AWS cloud practitioner full course free',
      'Serverless vs containers explained',
      'Deploy machine learning model as REST API',
      'Infrastructure as code Terraform tutorial',
    ],
    studyTips: [
      'Use a free tier (AWS, GCP or Azure) and deploy something real. Set a billing alert first — every student has a horror story',
      'Deploy your DTS 428 model as an API; a live URL in your project defence is memorable and demonstrates the whole stack',
      'IaaS/PaaS/SaaS classification questions are guaranteed — have a concrete example of each ready',
      'Least privilege is the security rule that matters most here, and the one most often violated in student projects',
    ],
  },
  {
    code: 'UUY-DTS 423',
    slug: 'uuy-dts-423',
    title: 'Data Warehousing and Multidimensional Modeling',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Designing the analytical database: dimensional modelling, star and snowflake schemas, slowly changing dimensions, OLAP operations, and the ETL that populates it all.',
    topics: [
      'Why analytical and operational databases differ: OLTP vs OLAP workloads',
      'Data warehouse architecture: staging, core warehouse, data marts; Inmon vs Kimball approaches',
      'Dimensional modelling: facts, dimensions, grain, and the four-step design process',
      'Star schema and snowflake schema; when to denormalise',
      'Fact table types: transaction, periodic snapshot and accumulating snapshot',
      'Dimension design: surrogate keys, hierarchies, conformed dimensions, degenerate dimensions',
      'Slowly changing dimensions: Types 0 through 3 and their trade-offs',
      'OLAP operations: roll-up, drill-down, slice, dice and pivot; cubes and MOLAP/ROLAP',
      'ETL design for the warehouse; incremental loading and change data capture',
    ],
    textbooks: [
      { title: 'The Data Warehouse Toolkit', authors: 'Ralph Kimball & Margy Ross', note: '3rd ed. — the definitive book on dimensional modelling; this course is essentially it' },
      { title: 'Building the Data Warehouse', authors: 'W.H. Inmon', note: '4th ed. — the alternative architectural school; know both for the exam' },
    ],
    searchTerms: [
      'Star schema vs snowflake schema explained',
      'Slowly changing dimensions type 1 2 3 explained',
      'Kimball dimensional modelling four step process',
      'OLAP operations roll up drill down explained',
    ],
    studyTips: [
      'Kimball\'s four-step process (choose the business process, declare the grain, identify dimensions, identify facts) is the exam\'s favourite structured answer — memorise it and apply it to any scenario given',
      'Declaring the grain is the step students skip and the step everything depends on. State it as a single sentence: "one row per…"',
      'SCD Type 2 (add a new row with validity dates) is the most examined and the most used in practice — be able to draw the before/after table',
      'Design a small warehouse for a scenario you know (university results, a shop\'s sales) — it makes every abstract term concrete',
    ],
  },
  {
    code: 'UUY-DTS 424',
    slug: 'uuy-dts-424',
    title: 'Intelligent Computing and Analytics for Urban Centres',
    units: 2, level: 400, semester: 2, lh: 15, ph: 45,
    subject: 'dts',
    description: 'Data science applied to cities: sensor and IoT data, mobility and transport analytics, geospatial analysis, and the smart-city systems that use them — with the Nigerian urban context front and centre.',
    topics: [
      'Smart city concepts, domains and architectures',
      'Urban data sources: IoT sensors, GPS traces, mobile network data, satellite imagery, open city data',
      'IoT fundamentals for urban sensing: devices, gateways, protocols (MQTT, LoRaWAN) and edge computing',
      'Geospatial data: coordinate systems, vector and raster data, GeoJSON and shapefiles',
      'Spatial analysis: geocoding, spatial joins, buffers, density and hotspot analysis',
      'Mobility and transport analytics: origin–destination matrices, traffic flow, route optimisation',
      'Urban applications: energy, waste, water, public safety, health and environmental monitoring',
      'Real-time dashboards and decision support for city administration',
      'Challenges in the Nigerian context: data scarcity, informal settlements, infrastructure and surveillance ethics',
    ],
    textbooks: [
      { title: 'Urban Analytics', authors: 'Alex Singleton, Seth Spielman & David Folch', note: 'The core text on data-driven urban analysis' },
      { title: 'Geographic Data Science with Python', authors: 'Rey, Arribas-Bel & Wolf', note: 'Free at geographicdata.science; the practical geospatial companion' },
    ],
    searchTerms: [
      'Geospatial data analysis with Python GeoPandas',
      'Smart city architecture explained',
      'Spatial analysis hotspot detection tutorial',
      'Urban mobility data analysis case study',
    ],
    studyTips: [
      'Learn GeoPandas and QGIS practically — geospatial skills are rare among Nigerian graduates and immediately marketable',
      'Coordinate reference systems cause more bugs than any other geospatial topic; understand why you cannot mix WGS84 and a projected CRS in one calculation',
      'Use real local data (OpenStreetMap for Uyo, NASA/Copernicus satellite imagery) — a local case study is far stronger in assessment than a foreign one',
      'The surveillance-ethics angle connects straight back to DTS 318; smart-city sensing is one of the sharpest privacy trade-offs in the field',
    ],
  },
];

// ─── Lookup helpers ─────────────────────────────────────────────
// Same surface as courses.js, so any consumer built against that catalogue
// works unchanged against this one.

export function getCourseBySlug(slug) {
  return courses.find(c => c.slug === slug);
}

export function getCoursesByLevel(level) {
  return courses.filter(c => c.level === level);
}

export function getCoursesByLevelAndSemester(level, semester) {
  return courses.filter(c => c.level === level && c.semester === semester);
}

export const LEVELS = [100, 200, 300, 400];

export const levelMeta = {
  100: { label: '100L', description: 'First Year', totalUnits: courses.filter(c => c.level === 100).reduce((s, c) => s + c.units, 0) },
  200: { label: '200L', description: 'Second Year', totalUnits: courses.filter(c => c.level === 200).reduce((s, c) => s + c.units, 0) },
  300: { label: '300L', description: 'Third Year (incl. SIWES)', totalUnits: courses.filter(c => c.level === 300).reduce((s, c) => s + c.units, 0) },
  400: { label: '400L', description: 'Final Year', totalUnits: courses.filter(c => c.level === 400).reduce((s, c) => s + c.units, 0) },
};
