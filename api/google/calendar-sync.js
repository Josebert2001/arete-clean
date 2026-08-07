// ============================================================================
//  Arete — Sync a study plan to the student's Google Calendar (Vercel)
//  Creates (or replaces) a dedicated secondary calendar named after the plan,
//  so re-syncing after editing the plan is idempotent instead of piling up
//  duplicate events in the student's primary calendar.
// ============================================================================

import { google } from 'googleapis';
import { applyApiHeaders, enforceRateLimit, setRateLimitHeaders, logRequest } from '../_lib/request-policy.js';
import { getStudentFromRequest } from '../_lib/supabase.js';
import { captureApiError } from '../_lib/sentry.js';
import { clientForUser, deleteGoogleConnection } from '../_lib/googleAuth.js';
import { buildGoogleEventResource } from '../_lib/googleEvents.js';

const RATE_LIMIT = {
  namespace: 'google-calendar-sync',
  limit: 6,
  windowMs: 10 * 60 * 1000,
};

const MAX_EVENTS = 60;
const BYDAY_RE = /^(MO|TU|WE|TH|FR|SA|SU)$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function isValidEvent(ev) {
  return ev && typeof ev === 'object'
    && typeof ev.title === 'string' && ev.title.trim() && ev.title.length <= 200
    && BYDAY_RE.test(ev.byday)
    && TIME_RE.test(ev.start) && TIME_RE.test(ev.end)
    && !Number.isNaN(new Date(ev.firstDate).getTime())
    && !Number.isNaN(new Date(ev.untilDate).getTime());
}

export default async function handler(req, res) {
  applyApiHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const rateLimit = enforceRateLimit(req, RATE_LIMIT);
  setRateLimitHeaders(res, rateLimit);
  if (!rateLimit.allowed) {
    logRequest(req, 'google-calendar-sync');
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({ error: 'Too many sync attempts. Please wait a few minutes and try again.' });
  }

  const student = await getStudentFromRequest(req);
  if (!student) {
    return res.status(401).json({ error: 'Please sign in.' });
  }

  const { events, calendarName } = req.body || {};
  if (!Array.isArray(events) || events.length === 0) {
    return res.status(400).json({ error: 'No study plan events to sync.' });
  }
  if (events.length > MAX_EVENTS || !events.every(isValidEvent)) {
    return res.status(400).json({ error: 'Study plan looks invalid. Please regenerate it and try again.' });
  }
  const name = (typeof calendarName === 'string' && calendarName.trim().slice(0, 100)) || 'Study Plan';

  const oauth2Client = await clientForUser(student.user.id);
  if (!oauth2Client) {
    return res.status(409).json({ error: 'Connect Google first.', kind: 'not_connected' });
  }

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const summary = `Areté — ${name}`;

  try {
    // Idempotent re-sync: drop a prior calendar with the same summary before
    // creating a fresh one, rather than appending events into it forever.
    const existing = await calendar.calendarList.list({ maxResults: 250 });
    const stale = (existing.data.items || []).find((c) => c.summary === summary && !c.primary);
    if (stale) {
      await calendar.calendars.delete({ calendarId: stale.id }).catch(() => {});
    }

    const created = await calendar.calendars.insert({
      requestBody: { summary, timeZone: 'Africa/Lagos' },
    });
    const calendarId = created.data.id;

    for (const ev of events) {
      await calendar.events.insert({
        calendarId,
        requestBody: buildGoogleEventResource(ev),
      });
    }

    return res.status(200).json({
      success: true,
      eventCount: events.length,
      calendarId,
      htmlLink: `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`,
    });
  } catch (err) {
    const reason = err?.response?.data?.error || err?.message || '';
    if (String(reason).includes('invalid_grant')) {
      await deleteGoogleConnection(student.user.id);
      return res.status(409).json({ error: 'Your Google connection expired. Please reconnect.', kind: 'reconnect_required' });
    }
    console.error('google calendar sync error:', err);
    await captureApiError(err, { route: 'google-calendar-sync' });
    return res.status(500).json({ error: 'Could not sync to Google Calendar. Please try again.' });
  }
}
