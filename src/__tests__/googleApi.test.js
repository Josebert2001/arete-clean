import { afterEach, expect, it, vi } from 'vitest';
import { syncPlanToGoogleCalendar } from '../utils/googleApi';
import { buildGoogleEventResource } from '../../api/_lib/googleEvents.js';

const mocks = vi.hoisted(() => ({ post: vi.fn() }));
vi.mock('../lib/supabase', () => ({ getAccessToken: async () => 'student-token' }));
vi.mock('../utils/apiClient', () => ({ fetchJsonWithFallback: mocks.post }));

afterEach(() => vi.clearAllMocks());

it('sends Planner local-midnight dates without shifting the synced calendar', async () => {
  const event = {
    uid: 'study-mo', title: 'Study', byday: 'MO', start: '09:00', end: '10:00',
    firstDate: new Date(2026, 10, 3), untilDate: new Date(2026, 11, 2),
    location: 'Library', description: 'Read chapter 2', alarmMinutes: 15,
  };
  const firstDate = event.firstDate;
  const untilDate = event.untilDate;
  const result = { success: true, eventCount: 1 };
  mocks.post.mockResolvedValue(result);

  expect(await syncPlanToGoogleCalendar([event], 'Semester plan')).toEqual(result);
  const [url, request] = mocks.post.mock.calls[0];
  const payload = JSON.parse(request.body);
  const resource = buildGoogleEventResource(payload.events[0]);
  // In Lagos, JSON.stringify(Date) used to turn Tuesday the 3rd into Monday
  // the 2nd at 23:00Z. The first Monday on/after the 3rd must be the 9th.
  expect(resource.start.dateTime).toBe('2026-11-09T09:00:00');
  expect(resource.end.dateTime).toBe('2026-11-09T10:00:00');
  expect(resource.recurrence).toEqual(['RRULE:FREQ=WEEKLY;BYDAY=MO;UNTIL=20261202T225900Z']);
  expect(url).toBe('/api/google/calendar-sync');
  expect(request.method).toBe('POST');
  expect(request.headers.Authorization).toBe('Bearer student-token');
  expect(payload).toEqual({
    calendarName: 'Semester plan',
    events: [{ ...event, firstDate: '2026-11-03', untilDate: '2026-12-02' }],
  });
  // The same plan also feeds ICS export, which still needs its Date objects.
  expect(event.firstDate).toBe(firstDate);
  expect(event.untilDate).toBe(untilDate);
});
