// ============================================================================
//  Arete — PlanEvent → Google Calendar event resource (Vercel)
//  Deliberately duplicates the small pure date/RRULE helpers from
//  src/utils/ics.js instead of importing across the browser/Node boundary —
//  ics.js also exports downloadIcs, which touches document/Blob and has no
//  place in a serverless bundle. Keep the two in sync by hand; the shapes
//  they both consume (PlanEvent) and the Lagos-fixed-offset reasoning are
//  documented in src/utils/ics.js.
// ============================================================================

const TZID = 'Africa/Lagos';
const LAGOS_OFFSET_HOURS = 1; // UTC+1, no DST.
const DAY_TO_NUM = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

const pad = (n) => String(n).padStart(2, '0');

function firstOccurrenceOnOrAfter(from, byday) {
  const target = DAY_TO_NUM[byday];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const delta = (target - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + delta);
  return d;
}

// 'YYYY-MM-DDTHH:MM:00' local wall-clock — paired with timeZone in the event
// resource, so Google interprets it in Africa/Lagos without us doing UTC math.
function localDateTimeString(date, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(h)}:${pad(m)}:00`;
}

// RRULE UNTIL must be UTC regardless of the event's own timeZone field.
function untilStampUtc(date, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const utc = new Date(Date.UTC(
    date.getFullYear(), date.getMonth(), date.getDate(),
    h - LAGOS_OFFSET_HOURS, m, 0,
  ));
  return `${utc.getUTCFullYear()}${pad(utc.getUTCMonth() + 1)}${pad(utc.getUTCDate())}` +
    `T${pad(utc.getUTCHours())}${pad(utc.getUTCMinutes())}00Z`;
}

// Builds a Google Calendar API event resource from a PlanEvent whose
// firstDate/untilDate arrive as ISO date strings (JSON has no Date type).
export function buildGoogleEventResource(ev) {
  const firstDate = new Date(ev.firstDate);
  const untilDate = new Date(ev.untilDate);
  const first = firstOccurrenceOnOrAfter(firstDate, ev.byday);
  const alarm = Number.isFinite(ev.alarmMinutes) ? ev.alarmMinutes : 30;

  const resource = {
    summary: ev.title,
    start: { dateTime: localDateTimeString(first, ev.start), timeZone: TZID },
    end: { dateTime: localDateTimeString(first, ev.end), timeZone: TZID },
    recurrence: [`RRULE:FREQ=WEEKLY;BYDAY=${ev.byday};UNTIL=${untilStampUtc(untilDate, '23:59')}`],
  };
  if (ev.location) resource.location = ev.location;
  if (ev.description) resource.description = ev.description;
  if (alarm > 0) {
    resource.reminders = { useDefault: false, overrides: [{ method: 'popup', minutes: alarm }] };
  }
  return resource;
}
