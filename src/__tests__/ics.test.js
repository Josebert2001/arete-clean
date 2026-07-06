import { describe, it, expect } from 'vitest';
import { buildIcs, googleCalendarLink, firstOccurrenceOnOrAfter } from '../utils/ics';

// A Monday: 2026-01-05 is a Monday.
const MONDAY = new Date(2026, 0, 5);
const UNTIL  = new Date(2026, 3, 20);

function sampleEvent(overrides = {}) {
  return {
    uid: 'phy111-mo-study',
    title: 'PHY 111 — Study',
    description: 'General Physics I; commas, and; semicolons',
    location: 'Self-study',
    byday: 'MO',
    start: '17:00',
    end: '18:00',
    firstDate: MONDAY,
    untilDate: UNTIL,
    alarmMinutes: 30,
    ...overrides,
  };
}

describe('firstOccurrenceOnOrAfter', () => {
  it('returns the same day when it already matches', () => {
    const d = firstOccurrenceOnOrAfter(MONDAY, 'MO');
    expect(d.getDay()).toBe(1);
    expect(d.getDate()).toBe(5);
  });

  it('advances to the next matching weekday', () => {
    const wed = firstOccurrenceOnOrAfter(MONDAY, 'WE'); // Wed after Mon 5th → 7th
    expect(wed.getDay()).toBe(3);
    expect(wed.getDate()).toBe(7);
  });
});

describe('buildIcs', () => {
  it('produces a valid calendar envelope with the Lagos timezone', () => {
    const ics = buildIcs([sampleEvent()]);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('BEGIN:VTIMEZONE');
    expect(ics).toContain('TZID:Africa/Lagos');
    // CRLF line endings per RFC 5545.
    expect(ics).toContain('\r\n');
  });

  it('emits a weekly RRULE anchored to the event day with a UTC UNTIL', () => {
    const ics = buildIcs([sampleEvent()]);
    expect(ics).toContain('RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=');
    expect(ics).toMatch(/UNTIL=\d{8}T\d{6}Z/); // UTC form
    expect(ics).toContain('DTSTART;TZID=Africa/Lagos:20260105T170000');
    expect(ics).toContain('DTEND;TZID=Africa/Lagos:20260105T180000');
  });

  it('escapes commas and semicolons in text fields', () => {
    const ics = buildIcs([sampleEvent()]);
    expect(ics).toContain('commas\\, and\\; semicolons');
  });

  it('includes a VALARM when alarmMinutes is set, omits it when zero', () => {
    expect(buildIcs([sampleEvent()])).toContain('TRIGGER:-PT30M');
    expect(buildIcs([sampleEvent({ alarmMinutes: 0 })])).not.toContain('BEGIN:VALARM');
  });
});

describe('googleCalendarLink', () => {
  it('builds a TEMPLATE url with UTC dates and a recurrence rule', () => {
    const url = googleCalendarLink(sampleEvent());
    expect(url).toContain('calendar.google.com/calendar/render');
    expect(url).toContain('action=TEMPLATE');
    // 17:00 Lagos (UTC+1) → 16:00 UTC.
    expect(url).toContain('20260105T160000Z');
    expect(url).toContain('FREQ%3DWEEKLY'); // RRULE is URL-encoded
    expect(url).toContain('ctz=Africa%2FLagos');
  });
});
