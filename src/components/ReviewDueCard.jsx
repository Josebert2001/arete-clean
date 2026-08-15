import { Link } from 'react-router-dom';
import { Brain, ArrowRight } from 'lucide-react';
import { useProgress } from './useProgress';
import { REVIEW_STORAGE_KEY, dueCountFromState } from '../utils/reviewSchedule';

// The dashboard's entry point to /review. Without it the review queue is
// reachable only by typing the URL, and a queue nobody opens does nothing.
//
// Counts straight off the stored review state and deliberately does NOT call
// useCatalogue: the dashboard renders on every visit, and pulling ~800 kB of
// courses for one number is exactly what StudentDashboard's own comment warns
// against. See dueCountFromState for the trade that buys.
export default function ReviewDueCard() {
  const { progress } = useProgress(REVIEW_STORAGE_KEY);
  const items = progress.items;
  const tracked = items ? Object.keys(items).length : 0;

  // Nothing tracked yet means the student has not finished a practice quiz, so
  // there is nothing honest to say here — the Getting Started checklist and the
  // tracks card are better uses of the space until then.
  if (tracked === 0) return null;

  const due = dueCountFromState(items);

  return (
    <Link
      to="/review"
      className={`group flex items-center gap-3 rounded-2xl p-5 border transition-colors ${
        due > 0
          ? 'border-ember-500/30 bg-ember-500/5 hover:border-ember-500/50'
          : 'bg-paper border-coffee-200 hover:border-coffee-400'
      }`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          due > 0 ? 'bg-ember-500/15 text-ember-600' : 'bg-coffee-100 text-coffee-600'
        }`}
      >
        <Brain size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ink text-sm">
          {due > 0
            ? `${due} question${due === 1 ? '' : 's'} due for review`
            : 'Nothing due right now'}
        </p>
        <p className="text-xs text-coffee-600">
          {due > 0
            ? 'Answer them before you forget them'
            : `${tracked} question${tracked === 1 ? '' : 's'} being tracked`}
        </p>
      </div>
      <ArrowRight
        size={15}
        className={`shrink-0 transition-colors ${
          due > 0 ? 'text-ember-600' : 'text-coffee-400 group-hover:text-ink'
        }`}
      />
    </Link>
  );
}
