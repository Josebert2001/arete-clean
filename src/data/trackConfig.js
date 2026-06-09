import { modules, getModuleById } from './modules';
import { pythonModules, getPythonModuleById } from './pythonModules';
import { cModules, getCModuleById } from './cModules';

export const trackConfig = {
  java: {
    slug: 'java',
    label: 'Java',
    fullName: 'Java (COS 211)',
    tagline: 'Computer Programming I — OOP from foundations to GUI',
    description: 'The complete COS 211 track: 13 modules covering Java fundamentals, OOP, collections, file I/O, JDBC, and Swing GUI. Also supports COS 221 (Computer Programming II).',
    modules,
    getModuleById,
    storageKey: 'cos222-progress-v1',
    listPath: '/tracks/java',
    detailPath: (id) => `/tracks/java/${id}`,
    language: 'java',
    moduleCount: 13,
    accentBg: 'bg-ink',
    accentText: 'text-cream',
    accentLight: 'bg-coffee-100 text-coffee-800',
    dotColor: 'bg-ember-500',
    courseCode: 'COS 211',
  },
  python: {
    slug: 'python',
    label: 'Python',
    fullName: 'Python (COS 121)',
    tagline: 'From Hello World to OOP, files, and standard libraries',
    description: '12 modules covering Python 3: variables, control flow, functions, data structures, OOP, file handling, exceptions, and modules.',
    modules: pythonModules,
    getModuleById: getPythonModuleById,
    storageKey: 'python-progress-v1',
    listPath: '/tracks/python',
    detailPath: (id) => `/tracks/python/${id}`,
    language: 'python',
    moduleCount: 12,
    accentBg: 'bg-moss',
    accentText: 'text-cream',
    accentLight: 'bg-moss/10 text-moss',
    dotColor: 'bg-moss',
    courseCode: 'COS 121',
  },
  c: {
    slug: 'c',
    label: 'C',
    fullName: 'C Programming',
    tagline: 'Systems programming: pointers, memory, structs, and file I/O',
    description: '12 modules covering C from compilation to dynamic memory: operators, functions, arrays, pointers, structs, and the preprocessor.',
    modules: cModules,
    getModuleById: getCModuleById,
    storageKey: 'c-progress-v1',
    listPath: '/tracks/c',
    detailPath: (id) => `/tracks/c/${id}`,
    language: 'c',
    moduleCount: 12,
    accentBg: 'bg-ember-500',
    accentText: 'text-cream',
    accentLight: 'bg-ember-500/10 text-ember-500',
    dotColor: 'bg-ember-500',
    courseCode: null,
  },
};

export function getTrack(slug) {
  return trackConfig[slug] || null;
}
