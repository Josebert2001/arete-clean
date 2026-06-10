import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PlayCircle, TrendingUp } from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useAuth } from '../context/AuthContext';
import { useProgress } from './useProgress';

function getTrackProgress(track, progress) {
  const completed = (progress.completedModules || []).filter(id =>
    track.moduleIndex.some(m => m.id === id)
  );
  const total = track.moduleIndex.length;
  const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  const nextModule = track.moduleIndex.find(m => !completed.includes(m.id)) || null;
  return { completed: completed.length, total, percent, nextModule };
}

export default function ProgressDashboard() {
  const { user } = useAuth();
  // useProgress merges cloud-synced progress for signed-in students, so the
  // dashboard matches the track pages on any device — not just this one.
  const progressBySlug = {
    java: useProgress(trackMeta.java.storageKey).progress,
    python: useProgress(trackMeta.python.storageKey).progress,
    c: useProgress(trackMeta.c.storageKey).progress,
  };
  const tracks = Object.values(trackMeta).map(track => ({
    track,
    ...getTrackProgress(track, progressBySlug[track.slug]),
  }));

  const started = tracks.filter(t => t.completed > 0);
  if (started.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-8">
      <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={16} className="text-moss" />
          <h2 className="display-heading text-2xl text-ink">My progress</h2>
          <span className="text-xs font-mono text-coffee-700">
            {user ? 'synced to your account' : 'saved on this device'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {started.map(({ track, completed, total, percent, nextModule }) => (
            <div
              key={track.slug}
              className="border border-coffee-200 rounded-xl p-5 flex flex-col gap-3 bg-cream"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-ink">{track.label}</h3>
                {track.courseCode && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-coffee-100 text-coffee-700">
                    {track.courseCode}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-coffee-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-moss" />
                    {completed} of {total} modules
                  </span>
                  <span className="font-mono font-bold text-ink">{percent}%</span>
                </div>
                <div
                  className="h-2 bg-coffee-100 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${track.label} track ${percent}% complete`}
                >
                  <div
                    className={`h-full rounded-full ${track.dotColor} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {nextModule ? (
                <Link
                  to={track.detailPath(nextModule.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-coffee-700 hover:gap-2.5 transition-all mt-auto"
                >
                  <PlayCircle size={14} className="text-moss" />
                  Continue: {nextModule.title}
                  <ArrowRight size={12} />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-moss mt-auto">
                  <CheckCircle2 size={14} /> Track complete — well done!
                </span>
              )}
            </div>
          ))}
        </div>

        {started.length < tracks.length && (
          <p className="text-xs text-coffee-700 mt-4">
            Not started yet:{' '}
            {tracks
              .filter(t => t.completed === 0)
              .map(({ track }, i, arr) => (
                <span key={track.slug}>
                  <Link to={track.listPath} className="text-ink font-medium hover:text-coffee-700 underline underline-offset-2">
                    {track.label}
                  </Link>
                  {i < arr.length - 1 ? ' · ' : ''}
                </span>
              ))}
          </p>
        )}
      </div>
    </section>
  );
}
