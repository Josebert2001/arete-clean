// Lightweight track metadata — safe to import anywhere (Home, Courses, Tracks,
// AI Tutor, ProgressDashboard) without pulling in the full module content.
// The heavy theory/code/quiz data lives in modules.js / pythonModules.js /
// cModules.js and is only bundled into the track pages via trackConfig.js.
//
// moduleIndex must stay in sync with the full module files — this is enforced
// by scripts/validate-modules.mjs, which runs before every build.

export const trackMeta = {
  java: {
    slug: 'java',
    label: 'Java',
    fullName: 'Java (COS 211)',
    tagline: 'Computer Programming I — OOP from foundations to GUI',
    description: 'The complete COS 211 track: 13 modules covering Java fundamentals, OOP, collections, file I/O, JDBC, and Swing GUI. Also supports COS 221 (Computer Programming II).',
    storageKey: 'cos222-progress-v1',
    listPath: '/tracks/java',
    detailPath: (id) => `/tracks/java/${id}`,
    language: 'java',
    accentBg: 'bg-ink',
    accentText: 'text-cream',
    accentLight: 'bg-coffee-100 text-coffee-800',
    dotColor: 'bg-ember-500',
    courseCode: 'COS 211',
    moduleIndex: [
      { id: 'foundations', number: 1, title: 'Java Foundations' },
      { id: 'control-flow', number: 2, title: 'Control Flow' },
      { id: 'loops', number: 3, title: 'Loops' },
      { id: 'arrays', number: 4, title: 'Arrays' },
      { id: 'methods', number: 5, title: 'Methods' },
      { id: 'oop-1', number: 6, title: 'OOP Part 1' },
      { id: 'oop-2', number: 7, title: 'OOP Part 2' },
      { id: 'exceptions', number: 8, title: 'Exception Handling' },
      { id: 'collections', number: 9, title: 'Collections' },
      { id: 'files-threads', number: 10, title: 'Files & Threads' },
      { id: 'strings', number: 11, title: 'String Operations' },
      { id: 'jdbc', number: 12, title: 'JDBC' },
      { id: 'gui', number: 13, title: 'GUI Programming' },
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
      { id: 'py-foundations', number: 1, title: 'Python Foundations' },
      { id: 'py-control-flow', number: 2, title: 'Control Flow' },
      { id: 'py-loops', number: 3, title: 'Loops' },
      { id: 'py-functions', number: 4, title: 'Functions' },
      { id: 'py-lists-tuples', number: 5, title: 'Lists & Tuples' },
      { id: 'py-dicts-sets', number: 6, title: 'Dictionaries & Sets' },
      { id: 'py-strings', number: 7, title: 'String Methods' },
      { id: 'py-oop-1', number: 8, title: 'OOP Part 1' },
      { id: 'py-oop-2', number: 9, title: 'OOP Part 2' },
      { id: 'py-file-handling', number: 10, title: 'File Handling' },
      { id: 'py-exceptions', number: 11, title: 'Exception Handling' },
      { id: 'py-modules', number: 12, title: 'Modules & the Standard Library' },
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
      { id: 'c-foundations', number: 1, title: 'C Foundations' },
      { id: 'c-variables', number: 2, title: 'Variables and Data Types' },
      { id: 'c-operators', number: 3, title: 'Operators in C' },
      { id: 'c-control-flow', number: 4, title: 'Control Flow' },
      { id: 'c-loops', number: 5, title: 'Loops in C' },
      { id: 'c-functions', number: 6, title: 'Functions in C' },
      { id: 'c-arrays-strings', number: 7, title: 'Arrays and Strings' },
      { id: 'c-pointers', number: 8, title: 'Pointers' },
      { id: 'c-structs', number: 9, title: 'Structs and Enums' },
      { id: 'c-file-handling', number: 10, title: 'File Handling' },
      { id: 'c-dynamic-memory', number: 11, title: 'Dynamic Memory Allocation' },
      { id: 'c-preprocessor', number: 12, title: 'The C Preprocessor' },
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
