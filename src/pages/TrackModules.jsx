import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useTrack } from '../data/useTrack';
import { useProgress } from '../components/useProgress';
import Breadcrumbs from '../components/Breadcrumbs';
import { usePageTitle } from '../utils/usePageTitle';

export default function TrackModules() {
  const { lang } = useParams();
  const { track, status } = useTrack(lang);
  const { isComplete, progress } = useProgress(track?.storageKey);
  usePageTitle(track ? `${track.label} Modules` : 'Track not found');

  if (status === 'loading') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 animate-pulse" role="status" aria-label="Loading modules">
        <div className="h-4 w-48 bg-coffee-100 rounded mb-8" />
        <div className="h-12 w-64 bg-coffee-100 rounded mb-4" />
        <div className="h-4 w-full max-w-2xl bg-coffee-100 rounded mb-10" />
        <div className="space-y-3">
          {[0, 1, 2, 3].map(i => <div key={i} className="h-24 bg-coffee-100 rounded-xl" />)}
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-coffee-700 mb-4">Track not found.</p>
        <Link to="/lab" className="btn-ghost">← Code Lab</Link>
      </div>
    );
  }

  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / track.modules.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Code Lab', to: '/lab' },
        { label: track.label },
      ]} />

      {/* Header */}
      <div className="mb-10">
      <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${track.accentBg} ${track.accentText}`}>
            {track.label}
          </span>
          {track.courseCode && (
            <span className="text-xs font-mono text-coffee-700">{track.courseCode}</span>
          )}
        </div>
        <h1 className="display-heading text-5xl text-ink mb-3">{track.moduleCount} Modules</h1>
        <p className="text-lg text-coffee-700 max-w-2xl">{track.description}</p>
      </div>

      {/* Progress bar */}
      {completedCount > 0 && (
        <div className="bg-cream border border-coffee-200 rounded-xl p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-0.5">Your Progress</div>
            <div className="font-display text-xl font-bold text-ink">
              {completedCount} of {track.modules.length} modules complete
            </div>
          </div>
          <div className="flex-1 max-w-xs w-full">
            <div className="h-2 bg-coffee-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-700 ${track.dotColor}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-xs text-coffee-700 mt-1 text-right">{progressPercent}%</div>
          </div>
        </div>
      )}

      {/* Module list */}
      <div className="space-y-3">
        {track.modules.map(m => (
          <Link
            key={m.id}
            to={track.detailPath(m.id)}
            className="block bg-paper border border-coffee-200 rounded-xl p-5 sm:p-6 hover:border-coffee-500 hover:shadow-md transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-display text-xl font-bold flex-shrink-0 ${
                isComplete(m.id) ? 'bg-moss text-cream' : `${track.accentBg} ${track.accentText}`
              }`}>
                {isComplete(m.id) ? <CheckCircle2 size={22} /> : String(m.number).padStart(2, '0')}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h2 className="font-display text-xl font-bold text-ink group-hover:text-coffee-700 transition-colors">
                    {m.title}
                  </h2>
                  <span className="text-xs font-mono text-coffee-700">
                    {'●'.repeat(m.difficulty)}{'○'.repeat(5 - m.difficulty)}
                  </span>
                </div>
                <p className="text-sm text-coffee-700 mb-2">{m.subtitle}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-coffee-700">
                  <span className="flex items-center gap-1"><Clock size={12} /> ~{m.estimatedHours}h</span>
                  <span>{m.practiceQuestions.length} questions</span>
                  <span>{m.codeExamples.length} examples</span>
                  {progress.quizScores[m.id] && (
                    <span className="text-moss">
                      Quiz: {progress.quizScores[m.id].score}/{progress.quizScores[m.id].total}
                    </span>
                  )}
                </div>
              </div>

              <ArrowRight size={18} className="text-coffee-700 group-hover:text-ink group-hover:translate-x-1 transition-all hidden sm:block" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-6 bg-cream border border-coffee-200 rounded-xl">
        <h3 className="font-display font-bold text-ink mb-2">Final Project</h3>
        <p className="text-sm text-coffee-700">
          After completing all {track.moduleCount} modules, build something real using every concept from the track.
          Take what you've learned and apply it to a project of your choice — the best way to solidify your skills.
        </p>
      </div>
    </div>
  );
}
