import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { getDepartment, YEAR_LEVELS } from '../data/departments';
import { deriveGettingStartedSteps, readClicked, writeClicked } from '../utils/gettingStarted';

// Day-one replacement for the returning-user dashboard cards (streak nag,
// daily challenge) — see StudentDashboard.jsx for when this shows instead of
// them. Derives its own checklist from the profile + progress signals the
// dashboard already has; only the dismiss action is owned by the parent,
// since dismissing also switches the rest of the dashboard's layout back.
export default function GettingStartedCard({ profile, completedCount, lastPath, onDismiss }) {
  const department = getDepartment(profile?.department);
  const isFoundation = department.status === 'foundation';
  const levelNum = parseInt(String(profile?.level ?? ''), 10);
  const levelNumber = YEAR_LEVELS.includes(levelNum) ? levelNum : null;
  const [clicked, setClicked] = useState(() => readClicked(profile?.id));

  const steps = deriveGettingStartedSteps({
    levelNumber,
    isFoundation,
    hasSelectedCourses: (profile?.selected_courses?.length ?? 0) > 0,
    hasRegNumber: Boolean(profile?.reg_number),
    completedCount,
    lastPath,
    clicked,
  });

  const markClicked = (id) => () => setClicked(writeClicked(profile?.id, id));

  return (
    <div className="bg-paper border border-coffee-200 rounded-2xl p-6">
      <h2 className="display-heading text-2xl text-ink mb-4">Getting started</h2>

      <div className="space-y-1.5 mb-2">
        {steps.map(({ id, label, to, done }) => (
          <Link
            key={id}
            to={to}
            onClick={markClicked(id)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-coffee-100 transition-colors"
          >
            {done
              ? <CheckCircle2 size={16} className="text-moss shrink-0" />
              : <Circle size={16} className="text-coffee-300 shrink-0" />}
            <span className={`text-sm ${done ? 'text-coffee-500' : 'text-ink font-medium'}`}>
              {label}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex justify-end pt-2 border-t border-coffee-100">
        <button
          type="button"
          onClick={onDismiss}
          className="text-xs text-coffee-500 hover:text-ink transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
