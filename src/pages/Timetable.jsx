import { Link } from 'react-router-dom';
import { CalendarDays, FlaskConical, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import {
  DAYS, TIMETABLE_100, TIMETABLE_CAVEATS, canSeeTimetable, formatTime, slotsForDay,
} from '../data/timetable';

// getDay(): 0 = Sunday … 6 = Saturday; the timetable runs Monday to Friday.
const TODAY = DAYS[new Date().getDay() - 1] ?? null;

/**
 * The 100 Level Cybersecurity lecture timetable for the current semester.
 * Static data (src/data/timetable.js) — no network call, so it works offline
 * with the rest of the PWA.
 */
export default function Timetable() {
  usePageTitle('100 Level timetable');
  const { profile, authLoading } = useAuth();

  if (authLoading) return null;

  if (!canSeeTimetable(profile)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="display-heading text-3xl text-ink">Timetable</h1>
        <p className="mt-3 text-coffee-700">
          This timetable is for 100 Level Cybersecurity students. You can change your
          department or level any time in your profile.
        </p>
        <Link to="/profile" className="mt-5 inline-block text-sm font-semibold text-ember underline">
          Open my profile
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">
          100 Level · Semester {TIMETABLE_100.semester} · {TIMETABLE_100.session}
        </p>
        <h1 className="display-heading text-3xl text-ink sm:text-4xl">Your timetable</h1>
        <p className="mt-2 text-coffee-700">
          Every 100 Level first-semester class this week, with its room.
        </p>
      </header>

      <div className="space-y-6">
        {DAYS.map(day => {
          const slots = slotsForDay(day);
          const isToday = day === TODAY;
          return (
            <section
              key={day}
              aria-labelledby={`day-${day}`}
              className={`overflow-hidden rounded-2xl border bg-cream ${isToday ? 'border-ember' : 'border-coffee-200'}`}
            >
              <h2
                id={`day-${day}`}
                className="flex items-center gap-2 border-b border-coffee-200 px-4 py-3 font-display text-lg font-bold text-ink"
              >
                <CalendarDays className="h-4 w-4 text-coffee-500" aria-hidden="true" />
                {day}
                {isToday && (
                  <span className="rounded-full bg-ember/15 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-ember">
                    Today
                  </span>
                )}
              </h2>

              {slots.length === 0 ? (
                <p className="px-4 py-3 text-sm text-coffee-500">No classes.</p>
              ) : (
                <ul className="divide-y divide-coffee-200">
                  {slots.map(s => (
                    <li key={`${s.day}-${s.start}-${s.course}`} className="flex gap-4 px-4 py-3">
                      <p className="w-28 shrink-0 font-mono text-sm text-coffee-700">
                        {formatTime(s.start)}
                        <span className="text-coffee-500"> – </span>
                        {formatTime(s.end)}
                      </p>
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">
                          <Link to={`/courses/${s.slug}`} className="hover:text-ember hover:underline">
                            {s.course}
                          </Link>
                          <span className="font-normal text-coffee-700"> · {s.title}</span>
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-sm text-coffee-700">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {s.venue}
                          </span>
                          {s.kind === 'lab' && (
                            <span className="inline-flex items-center gap-1 text-moss">
                              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" /> Practical
                            </span>
                          )}
                        </p>
                        {s.note && <p className="mt-1 text-xs text-coffee-500">{s.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <aside className="mt-8 rounded-2xl border border-coffee-200 bg-paper px-4 py-4">
        <h2 className="font-display text-base font-bold text-ink">Before you rely on this</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-coffee-700">
          {TIMETABLE_CAVEATS.map(c => <li key={c}>{c}</li>)}
        </ul>
        <p className="mt-3 text-xs text-coffee-500">
          Last updated {TIMETABLE_100.updated}. Areté is student-built and independent of the University of Uyo.
        </p>
      </aside>
    </div>
  );
}
