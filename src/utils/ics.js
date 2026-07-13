// ─── iCalendar (.ics) builder ─────────────────────────────────────────────────
// Turns a list of plain "plan events" into an RFC 5545 calendar that Google,
// Apple, and Outlook all import cleanly. Also produces per-event "Add to Google
// Calendar" template links. No dependencies, no backend — everything is built
// as a string in the browser.
//
// A plan event is timezone-naive wall-clock (what the student sees on their
// timetable) anchored to Africa/Lagos, which is a gift: Nigeria is UTC+1 with
// NO daylight saving, so a single fixed offset is always correct.
//
// PlanEvent shape:
//   {
//     uid,                       // stable unique id, e.g. 'phy111-mo-study'
//     title,                     // SUMMARY
//     description,               // DESCRIPTION (optional)
//     location,                  // LOCATION (optional, e.g. a venue)
//     byday,                     // 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU'
//     start: '17:00',            // wall-clock HH:MM (Africa/Lagos)
//     end:   '18:00',            // wall-clock HH:MM (Africa/Lagos)
//     firstDate: Date,           // date of the FIRST occurrence (local midnight ok)
//     untilDate: Date,           // date the weekly series stops on/after
//     alarmMinutes,              // optional reminder lead time (default 30)
//   }

const TZID = 'Africa/Lagos';
const LAGOS_OFFSET_HOURS = 1; // UTC+1, no DST — safe to hard-code.
const DAY_TO_NUM = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

// A minimal but valid VTIMEZONE for Africa/Lagos. One standard offset, no DST
// transitions, so a single STANDARD block covers the whole year.
const LAGOS_VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  `TZID:${TZID}`,
  'BEGIN:STANDARD',
  'DTSTART:19700101T000000',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0100',
  'TZNAME:WAT',
  'END:STANDARD',
  'END:VTIMEZONE',
];

// Escape text per RFC 5545 §3.3.11 (backslash, semicolon, comma, newlines).
function escapeText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

const pad = (n) => String(n).padStart(2, '0');

// 'YYYYMMDDTHHMMSS' from a date + wall-clock time — the local/TZID form (no Z).
function localStamp(date, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(h)}${pad(m)}00`
  );
}

// 'YYYYMMDDTHHMMSSZ' — UTC form, used for DTSTAMP and Google template links.
function utcStamp(dateUtc) {
  return (
    `${dateUtc.getUTCFullYear()}${pad(dateUtc.getUTCMonth() + 1)}${pad(dateUtc.getUTCDate())}` +
    `T${pad(dateUtc.getUTCHours())}${pad(dateUtc.getUTCMinutes())}00Z`
  );
}

// Build a real UTC instant from a Lagos wall-clock (date + HH:MM). Because Lagos
// is a fixed +1, we subtract the offset from the wall-clock components. Using
// Date.UTC keeps this correct no matter what timezone the viewer's browser is in.
function lagosWallClockToUtc(date, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return new Date(Date.UTC(
    date.getFullYear(), date.getMonth(), date.getDate(),
    h - LAGOS_OFFSET_HOURS, m, 0,
  ));
}

// The date of the first weekly occurrence on/after `from` that lands on `byday`.
export function firstOccurrenceOnOrAfter(from, byday) {
  const target = DAY_TO_NUM[byday];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const delta = (target - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + delta);
  return d;
}

// Fold lines to <=75 octets (approximated as chars; our content is ASCII) per
// RFC 5545 §3.1, continuation lines start with a single space.
function foldLine(line) {
  if (line.length <= 75) return line;
  const chunks = [];
  let rest = line;
  chunks.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 74) {
    chunks.push(' ' + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length) chunks.push(' ' + rest);
  return chunks.join('\r\n');
}

function serialize(lines) {
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

// Build one VEVENT (a weekly-recurring block anchored in Africa/Lagos).
function buildVEvent(ev, dtstamp) {
  const first = firstOccurrenceOnOrAfter(ev.firstDate, ev.byday);
  // RRULE UNTIL must be UTC per the spec; use the end-of-day instant so the last
  // week is included.
  const untilUtc = lagosWallClockToUtc(ev.untilDate, '23:59');
  const alarm = ev.alarmMinutes ?? 30;

  const lines = [
    'BEGIN:VEVENT',
    `UID:${ev.uid}@aretecyb.tech`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${TZID}:${localStamp(first, ev.start)}`,
    `DTEND;TZID=${TZID}:${localStamp(first, ev.end)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${ev.byday};UNTIL=${utcStamp(untilUtc)}`,
    `SUMMARY:${escapeText(ev.title)}`,
  ];
  if (ev.location)    lines.push(`LOCATION:${escapeText(ev.location)}`);
  if (ev.description) lines.push(`DESCRIPTION:${escapeText(ev.description)}`);
  if (alarm > 0) {
    lines.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(ev.title)}`,
      `TRIGGER:-PT${alarm}M`,
      'END:VALARM',
    );
  }
  lines.push('END:VEVENT');
  return lines;
}

// Build the full .ics document from plan events.
export function buildIcs(events, { calendarName = 'Areté Timetable' } = {}) {
  const dtstamp = utcStamp(new Date());
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arete//Timetable//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    `X-WR-TIMEZONE:${TZID}`,
    ...LAGOS_VTIMEZONE,
  ];
  for (const ev of events) lines.push(...buildVEvent(ev, dtstamp));
  lines.push('END:VCALENDAR');
  return serialize(lines);
}

// Trigger a browser download of an .ics file.
export function downloadIcs(filename, icsString) {
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick so the download has a chance to start.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

// A one-click "Add to Google Calendar" link for a single recurring event.
// Google's template endpoint wants UTC times and an unfolded RRULE on `recur`.
export function googleCalendarLink(ev) {
  const first = firstOccurrenceOnOrAfter(ev.firstDate, ev.byday);
  const startUtc = utcStamp(lagosWallClockToUtc(first, ev.start));
  const endUtc   = utcStamp(lagosWallClockToUtc(first, ev.end));
  const untilUtc = utcStamp(lagosWallClockToUtc(ev.untilDate, '23:59'));

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${startUtc}/${endUtc}`,
    recur: `RRULE:FREQ=WEEKLY;BYDAY=${ev.byday};UNTIL=${untilUtc}`,
    ctz: TZID,
  });
  if (ev.location)    params.set('location', ev.location);
  if (ev.description) params.set('details', ev.description);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
