// Department registry — mirrors the trackMeta.js / trackConfig.js split: this
// file is lightweight metadata safe to import anywhere, while loadCatalogue()
// pulls the actual course data lazily so Vite code-splits each department into
// its own chunk (see trackConfig.js's comment for why that split matters).
//
// 'full' departments have their own authored catalogue (courses.js for
// Cybersecurity, dataScienceCourses.js for Data Science). 'foundation' is a
// single shared department for every student outside those: the ~22 courses
// common to most University of Uyo science/engineering programmes (GST, MTH,
// PHY, STA, COS, CSC, ENT, INS, UUY-CSC), filtered from courses.js via the
// crossDepartmental flag.
//
// Adding a department: author a SELF-CONTAINED <name>Courses.js exporting
// `courses`, `LEVELS` and `levelMeta` (same shape as courses.js), add an entry
// here with status: 'full' and a loadCatalogue() that imports it, then add it
// to the DEPARTMENTS registry in api/_lib/courseData.js so the tutor scopes to
// it. See CLAUDE.md → Common Tasks.
//
// Department catalogues are deliberately standalone — they do NOT import each
// other's course lists. The ~16-course overlap between programmes is smaller
// than it looks (Data Science takes GST 211/311 and MTH 211/212/223 where
// Cybersecurity takes GST 212/312), and each department frames its shared
// courses for its own students. Cross-importing would also drag another
// department's entire ~800 kB payload into this one's Vite chunk.
//
// The one exception is lecture notes: those are transcribed from the
// lecturer's workbook, so every catalogue imports the single copy in
// ./lectureNotes/ rather than duplicating it.

// The four year levels, as numbers. courses.js exports the same list, but
// importing it there costs the whole ~800 kB catalogue — so pages that only
// need to validate or render a level (Welcome, the Course Hub's URL parsing,
// the Planner's level buttons) read it from here instead. A test asserts this
// stays identical to the catalogue's own LEVELS so the cheap copy can't drift.
export const YEAR_LEVELS = [100, 200, 300, 400];

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

// Foundation mode is a filtered view of the Cybersecurity catalogue, so it
// would otherwise inherit that catalogue's levelMeta — including "Third Year
// (incl. SIWES)", which is wrong for a student whose own programme's SIWES
// isn't in Areté at all. Neutral labels instead; buildCatalogue recomputes
// totalUnits from the filtered list either way.
const FOUNDATION_LEVEL_META = {
  100: { label: '100L', description: 'First Year' },
  200: { label: '200L', description: 'Second Year' },
  300: { label: '300L', description: 'Third Year' },
  400: { label: '400L', description: 'Final Year' },
};

const loaders = {
  cybersecurity: () =>
    import('./courses').then(m => buildCatalogue(m.courses, m.LEVELS, m.levelMeta)),
  dataScience: () =>
    import('./dataScienceCourses').then(m => buildCatalogue(m.courses, m.LEVELS, m.levelMeta)),
  general: () =>
    import('./courses').then(m => buildCatalogue(m.getCrossDepartmentalCourses(), m.LEVELS, FOUNDATION_LEVEL_META)),
};

export const departments = {
  cybersecurity: {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    degree: 'B.Sc. Cybersecurity',
    status: 'full',
    loadCatalogue: loaders.cybersecurity,
  },
  dataScience: {
    slug: 'dataScience',
    name: 'Data Science',
    degree: 'B.Sc. Data Science',
    status: 'full',
    loadCatalogue: loaders.dataScience,
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
// ProfileForm.jsx — since it isn't a real named department.
export const SELECTABLE_DEPARTMENTS = Object.values(departments).filter(d => d.status === 'full');

// Matches the free-text department a foundation student typed at signup
// (profiles.department_other) against the departments now fully authored, so we
// can tell them their catalogue has arrived. Without this the demand signal is
// write-only: the students who asked for Data Science would sit in foundation
// mode on 22 courses and never learn the other 55 exist.
//
// Deliberately strict — an exact match once punctuation, spacing, case and the
// usual "Department of" / "B.Sc." wrappers are stripped. Fuzzy matching would
// read "Computer Science" as "Data Science" and move a student onto the wrong
// curriculum, which is far worse than missing a match: nothing here changes the
// profile, it only offers a link, and a missed match just leaves things as they
// are today.
const normalizeDepartmentName = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/\b(department|dept\.?|of|b\.?\s*sc\.?|bachelor(?:'s)?|degree|programme|program)\b/g, '')
    .replace(/[^a-z0-9]/g, '');

export function findDepartmentByName(typedName) {
  const target = normalizeDepartmentName(typedName);
  if (!target) return null;
  return SELECTABLE_DEPARTMENTS.find(d =>
    normalizeDepartmentName(d.name) === target || normalizeDepartmentName(d.degree) === target
  ) || null;
}

// Which materials pool a course's uploads belong to (course_materials.department).
//
// Courses shared across programmes pool under 'general', so lecture notes a
// Cybersecurity student uploads for GST 111 also reach the Data Science and
// foundation-mode students taking the very same course. Specialist courses stay
// scoped to the catalogue that owns them, which is what stops two departments'
// distinct courses colliding when they happen to share a slug.
//
// TWO flags mean "pool under general", because the two questions they answer are
// not the same one:
//   * crossDepartmental — a foundation course (GST/MTH/PHY/…) that every UniUyo
//     programme takes. Also what getCrossDepartmentalCourses() in courses.js
//     selects on to build the foundation catalogue.
//   * sharedMaterials — a course OWNED by one department that another authored
//     department also takes (CYB 211: Cybersecurity's course, on the Data Science
//     curriculum too). Its notes should pool, but it must NOT appear in the
//     foundation catalogue, so it cannot borrow crossDepartmental to say so.
// Every catalogue carrying the same course must set the same flag, or the two
// departments silently read different pools — departments.test.js asserts this.
//
// Kept here rather than at the call sites so the upload path, the read path and
// the tutor's note lookup can't drift apart. Mirrored server-side in
// api/_lib/courseData.js (resolveMaterialsDepartment).
export function materialsDepartmentFor(course, departmentSlug) {
  const pooled = course?.crossDepartmental || course?.sharedMaterials;
  return pooled ? 'general' : (departmentSlug || DEFAULT_DEPARTMENT);
}
