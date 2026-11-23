// Lecture timetable for 100 Level Cybersecurity, first semester 2026/27.
//
// Transcribed 23 November 2026 from the printed department sheets (Computer
// Science, Physics PHY 117 lab schedule, Mathematics MTH 111 schedule) and
// confirmed slot by slot with a course mate. It is a student-built copy, not
// the university's official timetable — the page says so. When the department
// changes a slot, edit it here; nothing else reads these numbers.
//
// `course` is a catalogue course code and `slug` its page in /courses, so
// `timetable.test.js` can fail the build if a slot names a course that is not
// a 100 Level first-semester course.

export const TIMETABLE_100 = {
  level: 100,
  department: 'cybersecurity',
  session: '2026/27',
  semester: 1,
  updated: '2026-11-23',
};

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// `kind`: lecture | lab. Times are 24-hour 'HH:MM' so they sort as strings.
export const TIMETABLE_SLOTS = [
  { day: 'Monday',   start: '08:00', end: '10:00', course: 'GST 111',     slug: 'gst-111',     title: 'Communication in English',        venue: '600C / ICT II',         kind: 'lecture' },
  { day: 'Monday',   start: '10:00', end: '12:00', course: 'PHY 111',     slug: 'phy-111',     title: 'General Physics I (Mechanics)',   venue: '600C / ICT II',         kind: 'lecture' },
  { day: 'Monday',   start: '12:00', end: '13:00', course: 'UUY-CSC 111', slug: 'uuy-csc-111', title: 'Computer Operations',             venue: 'Agric Lecture Theatre', kind: 'lecture' },
  { day: 'Monday',   start: '13:00', end: '14:30', course: 'PHY 117',     slug: 'phy-117',     title: 'General Practical Physics I',     venue: 'Lab II',                kind: 'lab',
    note: 'Cyber Security is Group A. The Physics sheet lists the first session for 23 November 2026.' },
  { day: 'Monday',   start: '15:00', end: '17:00', course: 'UUY-CSC 112', slug: 'uuy-csc-112', title: 'Computer Troubleshooting',        venue: 'Computer Lab',          kind: 'lab' },
  { day: 'Tuesday',  start: '08:00', end: '10:00', course: 'STA 111',     slug: 'sta-111',     title: 'Descriptive Statistics',          venue: 'ICT II',                kind: 'lecture' },
  { day: 'Tuesday',  start: '10:00', end: '12:00', course: 'MTH 111',     slug: 'mth-111',     title: 'Elementary Mathematics I',        venue: '600C / ICT II',         kind: 'lecture' },
  { day: 'Tuesday',  start: '15:00', end: '17:00', course: 'COS 111',     slug: 'cos-111',     title: 'Introduction to Computing Sciences', venue: '600C',               kind: 'lecture' },
  { day: 'Thursday', start: '12:00', end: '13:00', course: 'UUY-CSC 111', slug: 'uuy-csc-111', title: 'Computer Operations',             venue: 'Computer Lab',          kind: 'lab' },
  { day: 'Thursday', start: '14:00', end: '15:00', course: 'COS 111',     slug: 'cos-111',     title: 'Introduction to Computing Sciences', venue: 'Computer Lab',       kind: 'lab' },
  { day: 'Friday',   start: '08:00', end: '10:00', course: 'MTH 111',     slug: 'mth-111',     title: 'Elementary Mathematics I',        venue: 'ICT II',                kind: 'lecture' },
];

// What a student should double-check, shown under the timetable.
export const TIMETABLE_CAVEATS = [
  'Built from printed department sheets and checked with a course mate. Confirm any slot with your lecturer or course rep before you rely on it.',
  'GST 111, PHY 111, STA 111 and the Tuesday MTH 111 slot come from the Computer Science sheet, which was photographed at an angle.',
  'The PHY 117 lab schedule gives one dated session for Cyber Security. Ask the Physics department whether it repeats weekly.',
];

/** Slots for one day, earliest first. */
export function slotsForDay(day, slots = TIMETABLE_SLOTS) {
  return slots.filter(s => s.day === day).sort((a, b) => a.start.localeCompare(b.start));
}

/** '14:30' → '2:30 PM'. */
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`;
}

/** Who may see this timetable: signed-in 100 Level Cybersecurity students. */
export function canSeeTimetable(profile) {
  if (!profile) return false;
  const level = parseInt(String(profile.level ?? ''), 10);
  return profile.department === TIMETABLE_100.department && level === TIMETABLE_100.level;
}
