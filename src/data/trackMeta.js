// Lightweight track metadata — safe to import anywhere (Home, Courses, Tracks,
// AI Tutor, ProgressDashboard) without pulling in the full module content.
// The heavy theory/code/quiz data lives in modules.js / pythonModules.js /
// cModules.js and is only bundled into the track pages via trackConfig.js.
//
// moduleIndex must stay in sync with the full module files — this is enforced
// by scripts/validate-modules.mjs, which runs before every build.
//
// Each entry also carries difficulty, hours and steps (the number of guided steps
// the module page shows, from buildMissionSteps). The Code Lab catalogue renders
// 49 module cards from these alone; without them it would have to download all
// four ~90 kB module files to print a level and a time. The validator checks
// these too, so an edited module that gains a theory section fails the build
// until its `steps` here is bumped.

export const trackMeta = {
  java: {
    slug: 'java',
    label: 'Java',
    fullName: 'Java (COS 221)',
    tagline: 'Computer Programming II — OOP from foundations to GUI',
    description: 'The complete Java track for COS 221 (Computer Programming II): 13 modules covering Java fundamentals, OOP, collections, file I/O, JDBC, and Swing GUI.',
    storageKey: 'cos222-progress-v1',
    listPath: '/tracks/java',
    detailPath: (id) => `/tracks/java/${id}`,
    language: 'java',
    accentBg: 'bg-ink',
    accentText: 'text-cream',
    accentLight: 'bg-coffee-100 text-coffee-800',
    dotColor: 'bg-ember-500',
    courseCode: 'COS 221',
    moduleIndex: [
      { id: 'foundations', number: 1, title: 'Java Foundations', difficulty: 1, hours: 4, steps: 8 },
      { id: 'control-flow', number: 2, title: 'Control Flow', difficulty: 2, hours: 4, steps: 8 },
      { id: 'loops', number: 3, title: 'Loops', difficulty: 2, hours: 4, steps: 9 },
      { id: 'arrays', number: 4, title: 'Arrays', difficulty: 2, hours: 5, steps: 8 },
      { id: 'methods', number: 5, title: 'Methods', difficulty: 2, hours: 5, steps: 9 },
      { id: 'oop-1', number: 6, title: 'OOP Part 1', difficulty: 3, hours: 6, steps: 9 },
      { id: 'oop-2', number: 7, title: 'OOP Part 2', difficulty: 4, hours: 8, steps: 9 },
      { id: 'exceptions', number: 8, title: 'Exception Handling', difficulty: 3, hours: 4, steps: 9 },
      { id: 'collections', number: 9, title: 'Collections', difficulty: 3, hours: 5, steps: 9 },
      { id: 'files-threads', number: 10, title: 'Files & Threads', difficulty: 3, hours: 6, steps: 9 },
      { id: 'strings', number: 11, title: 'String Operations', difficulty: 2, hours: 4, steps: 8 },
      { id: 'jdbc', number: 12, title: 'JDBC', difficulty: 4, hours: 6, steps: 8 },
      { id: 'gui', number: 13, title: 'GUI Programming', difficulty: 4, hours: 6, steps: 9 },
    ],
  },
  python: {
    slug: 'python',
    label: 'Python',
    fullName: 'Python (COS 121)',
    tagline: 'From Hello World to OOP, files, and standard libraries',
    description: '12 modules covering Python 3: variables, control flow, functions, data structures, OOP, file handling, exceptions, and modules.',
    storageKey: 'python-progress-v1',
    listPath: '/tracks/python',
    detailPath: (id) => `/tracks/python/${id}`,
    language: 'python',
    accentBg: 'bg-moss',
    accentText: 'text-cream',
    accentLight: 'bg-moss/10 text-moss',
    dotColor: 'bg-moss',
    courseCode: 'COS 121',
    moduleIndex: [
      { id: 'py-foundations', number: 1, title: 'Python Foundations', difficulty: 1, hours: 3, steps: 8 },
      { id: 'py-control-flow', number: 2, title: 'Control Flow', difficulty: 1, hours: 3, steps: 8 },
      { id: 'py-loops', number: 3, title: 'Loops', difficulty: 2, hours: 4, steps: 8 },
      { id: 'py-functions', number: 4, title: 'Functions', difficulty: 2, hours: 5, steps: 8 },
      { id: 'py-lists-tuples', number: 5, title: 'Lists & Tuples', difficulty: 2, hours: 4, steps: 8 },
      { id: 'py-dicts-sets', number: 6, title: 'Dictionaries & Sets', difficulty: 2, hours: 4, steps: 8 },
      { id: 'py-strings', number: 7, title: 'String Methods', difficulty: 2, hours: 3, steps: 8 },
      { id: 'py-oop-1', number: 8, title: 'OOP Part 1', difficulty: 3, hours: 5, steps: 8 },
      { id: 'py-oop-2', number: 9, title: 'OOP Part 2', difficulty: 3, hours: 6, steps: 8 },
      { id: 'py-file-handling', number: 10, title: 'File Handling', difficulty: 3, hours: 4, steps: 8 },
      { id: 'py-exceptions', number: 11, title: 'Exception Handling', difficulty: 3, hours: 4, steps: 8 },
      { id: 'py-modules', number: 12, title: 'Modules & the Standard Library', difficulty: 2, hours: 3, steps: 8 },
    ],
  },
  c: {
    slug: 'c',
    label: 'C',
    fullName: 'C Programming',
    tagline: 'Systems programming: pointers, memory, structs, and file I/O',
    description: '12 modules covering C from compilation to dynamic memory: operators, functions, arrays, pointers, structs, and the preprocessor.',
    storageKey: 'c-progress-v1',
    listPath: '/tracks/c',
    detailPath: (id) => `/tracks/c/${id}`,
    language: 'c',
    accentBg: 'bg-ember-500',
    accentText: 'text-cream',
    accentLight: 'bg-ember-500/10 text-ember-500',
    dotColor: 'bg-ember-500',
    courseCode: null,
    moduleIndex: [
      { id: 'c-foundations', number: 1, title: 'C Foundations', difficulty: 1, hours: 3, steps: 8 },
      { id: 'c-variables', number: 2, title: 'Variables and Data Types', difficulty: 1, hours: 3, steps: 8 },
      { id: 'c-operators', number: 3, title: 'Operators in C', difficulty: 2, hours: 3, steps: 8 },
      { id: 'c-control-flow', number: 4, title: 'Control Flow', difficulty: 2, hours: 3, steps: 8 },
      { id: 'c-loops', number: 5, title: 'Loops in C', difficulty: 2, hours: 4, steps: 8 },
      { id: 'c-functions', number: 6, title: 'Functions in C', difficulty: 2, hours: 4, steps: 8 },
      { id: 'c-arrays-strings', number: 7, title: 'Arrays and Strings', difficulty: 3, hours: 5, steps: 8 },
      { id: 'c-pointers', number: 8, title: 'Pointers', difficulty: 4, hours: 6, steps: 8 },
      { id: 'c-structs', number: 9, title: 'Structs and Enums', difficulty: 3, hours: 4, steps: 8 },
      { id: 'c-file-handling', number: 10, title: 'File Handling', difficulty: 3, hours: 4, steps: 8 },
      { id: 'c-dynamic-memory', number: 11, title: 'Dynamic Memory Allocation', difficulty: 4, hours: 5, steps: 8 },
      { id: 'c-preprocessor', number: 12, title: 'The C Preprocessor', difficulty: 3, hours: 3, steps: 8 },
    ],
  },
  security: {
    slug: 'security',
    label: 'Security',
    fullName: 'Security Fundamentals',
    tagline: 'Hands-on cybersecurity: crypto, web, forensics — capture the flag',
    description: '12 CTF-style rooms covering the security fundamentals behind your degree: the CIA triad, encoding, classical and modern crypto, hashing, password cracking, networking, HTTP, SQL injection, the Linux CLI, digital forensics, phishing, and firewalls. Each room ends with a flag you capture in your browser.',
    storageKey: 'security-progress-v1',
    listPath: '/tracks/security',
    detailPath: (id) => `/tracks/security/${id}`,
    language: 'text',
    accentBg: 'bg-rust',
    accentText: 'text-cream',
    accentLight: 'bg-rust/10 text-rust',
    dotColor: 'bg-rust',
    courseCode: 'CYB',
    moduleIndex: [
      { id: 'sec-intro', number: 1, title: 'The Security Mindset', difficulty: 1, hours: 2, steps: 7 },
      { id: 'sec-encoding', number: 2, title: 'Encoding Is Not Encryption', difficulty: 1, hours: 2, steps: 7 },
      { id: 'sec-classical-crypto', number: 3, title: 'Classical Ciphers', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-hashing', number: 4, title: 'Hashing & File Integrity', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-passwords', number: 5, title: 'Password Cracking', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-networking', number: 6, title: 'Ports, Protocols & Insecure Services', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-http-headers', number: 7, title: 'HTTP & Reading the Wire', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-web-sqli', number: 8, title: 'SQL Injection', difficulty: 3, hours: 3, steps: 7 },
      { id: 'sec-linux-cli', number: 9, title: 'The Linux Command Line', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-forensics', number: 10, title: 'Digital Forensics', difficulty: 3, hours: 2, steps: 7 },
      { id: 'sec-phishing', number: 11, title: 'Social Engineering & Phishing', difficulty: 2, hours: 2, steps: 7 },
      { id: 'sec-firewall', number: 12, title: 'Firewalls & Defense in Depth', difficulty: 3, hours: 2, steps: 7 },
    ],
  },
};

// Derive counts from the index so they can never disagree.
for (const track of Object.values(trackMeta)) {
  track.moduleCount = track.moduleIndex.length;
}

export function getTrackMeta(slug) {
  return trackMeta[slug] || null;
}
