// Department registry — mirrors the trackMeta.js / trackConfig.js split: this
// file is lightweight metadata safe to import anywhere, while loadCatalogue()
// pulls the actual course data lazily so Vite code-splits each department into
// its own chunk (see trackConfig.js's comment for why that split matters).
//
// 'full' departments have their own authored catalogue (courses.js today).
// 'foundation' is a single shared department for every student outside
// Cybersecurity: the ~22 courses common to most University of Uyo science/
// engineering programmes (GST, MTH, PHY, STA, COS, CSC, ENT, INS, UUY-CSC),
// filtered from courses.js via the crossDepartmental flag.
//
// Adding a department: author its own <name>Courses.js (same course-object
// shape as courses.js), add an entry here with status: 'full' and a
// loadCatalogue() that imports it, then register its knowledge builder in
// api/_lib/courseData.js. See CLAUDE.md → Common Tasks.

// Builds the catalogue shape every consumer (Courses.jsx, CourseDetail.jsx,
// Planner.jsx, useCatalogue) expects, from any course list — the full
// catalogue or a department's filtered subset.
function buildCatalogue(courseList, LEVELS, levelMeta) {
  const byLevel = (level) => courseList.filter(c => c.level === level);
  return {
    courses: courseList,
    LEVELS,
    levelMeta: Object.fromEntries(
      LEVELS.map(level => [level, {
        ...levelMeta[level],
        totalUnits: byLevel(level).reduce((s, c) => s + c.units, 0),
      }])
    ),
    getCourseBySlug: (slug) => courseList.find(c => c.slug === slug),
    getCoursesByLevel: byLevel,
    getCoursesByLevelAndSemester: (level, semester) =>
      courseList.filter(c => c.level === level && c.semester === semester),
  };
}

const loaders = {
  cybersecurity: () =>
    import('./courses').then(m => buildCatalogue(m.courses, m.LEVELS, m.levelMeta)),
  general: () =>
    import('./courses').then(m => buildCatalogue(m.getCrossDepartmentalCourses(), m.LEVELS, m.levelMeta)),
};

export const departments = {
  cybersecurity: {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    degree: 'B.Sc. Cybersecurity',
    status: 'full',
    loadCatalogue: loaders.cybersecurity,
  },
  general: {
    slug: 'general',
    name: 'Other departments',
    degree: null,
    status: 'foundation',
    loadCatalogue: loaders.general,
  },
};

export const DEFAULT_DEPARTMENT = 'cybersecurity';

// Falls back to the default department for an unknown/missing slug rather
// than returning null — every caller needs a catalogue to resolve.
export function getDepartment(slug) {
  return departments[slug] || departments[DEFAULT_DEPARTMENT];
}

// Departments a student can pick directly at signup. 'general' (foundation
// mode) is offered separately as "my department isn't listed yet" — see
// SetupProfile.jsx — since it isn't a real named department.
export const SELECTABLE_DEPARTMENTS = Object.values(departments).filter(d => d.status === 'full');
