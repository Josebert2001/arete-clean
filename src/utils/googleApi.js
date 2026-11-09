import { getAccessToken } from '../lib/supabase';
import { fetchJsonWithFallback } from './apiClient';

async function authedPost(url, body) {
  const token = await getAccessToken();
  return fetchJsonWithFallback(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    },
    'unavailable'
  );
}

export function getGoogleStatus() {
  return authedPost('/api/google/status', {});
}

// Redirects the browser to Google's consent screen. Resolves only if the
// request itself fails before the redirect — a successful call never returns
// to the caller (the page navigates away).
export async function connectGoogle(returnTo = window.location.pathname) {
  const data = await authedPost('/api/google/connect', { returnTo });
  if (data.url) {
    window.location.href = data.url;
    return;
  }
  throw new Error(data.error || 'Could not start the Google connection.');
}

export function disconnectGoogle() {
  return authedPost('/api/google/disconnect', {});
}

function localCalendarDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function syncPlanToGoogleCalendar(events, calendarName) {
  // Planner's Dates are local midnight. Send the calendar day before JSON can
  // turn it into a UTC instant on the previous day in Lagos.
  return authedPost('/api/google/calendar-sync', {
    events: events.map(ev => ({
      ...ev,
      firstDate: localCalendarDate(ev.firstDate),
      untilDate: localCalendarDate(ev.untilDate),
    })),
    calendarName,
  });
}
