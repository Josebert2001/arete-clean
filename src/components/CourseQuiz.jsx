import { useState } from 'react';
import { GraduationCap, Play, Award, ArrowLeft } from 'lucide-react';
import Quiz from './Quiz';
import { useProgress } from './useProgress';

// All course practice-quiz results share one progress record, keyed by course
// slug inside quizScores. This needs no schema change — useProgress already
// stores { score, total, date } per key in localStorage + Supabase.
const STORAGE_KEY = 'course-quizzes-v1';

// Fisher–Yates shuffle, then take the first `n`. Returns a new array so the
// source bank is never mutated, and retakes can draw a fresh selection.
function sample(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function CourseQuiz({ course }) {
  const bank = course.quiz || [];
  const { progress, setQuizScore } = useProgress(STORAGE_KEY);
  const last = progress.quizScores?.[course.slug];

  // null = on the length picker; otherwise the sampled question set in play.
  const [questions, setQuestions] = useState(null);
  // attempt bumps on every start so <Quiz> remounts with fresh internal state.
  const [attempt, setAttempt] = useState(0);
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');

  const start = (count) => {
    const n = Math.max(1, Math.min(count, bank.length));
    setQuestions(sample(bank, n));
    setAttempt((a) => a + 1);
    setError('');
  };

  const startCustom = () => {
    const n = parseInt(custom, 10);
    if (!Number.isInteger(n) || n < 1 || n > bank.length) {
      setError(`Enter a number between 1 and ${bank.length}.`);
      return;
    }
    start(n);
  };

  if (bank.length === 0) return null;

  // ── In-quiz view ──────────────────────────────────────────────
  if (questions) {
    return (
      <div>
        <button
          onClick={() => setQuestions(null)}
          className="btn-ghost mb-5 text-sm"
        >
          <ArrowLeft size={15} /> Choose a different length
        </button>
        <Quiz
          key={attempt}
          questions={questions}
          onComplete={(score, total) => setQuizScore(course.slug, score, total)}
        />
      </div>
    );
  }

  // ── Length picker view ────────────────────────────────────────
  // Presets only make sense below the bank size; "Full" always covers the rest.
  const presets = [5, 10, 20].filter((n) => n < bank.length);
  const lastPercent = last ? Math.round((last.score / last.total) * 100) : null;

  return (
    <div>
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center shrink-0">
          <GraduationCap size={20} />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-ink mb-1">Practice Quiz</h2>
          <p className="text-sm text-coffee-700 leading-relaxed">
            {bank.length} questions cover this course&apos;s lecture notes. Choose how many
            you want — questions are drawn at random, so each attempt is different.
          </p>
        </div>
      </div>

      {last && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50">
          <Award size={18} className={lastPercent >= 70 ? 'text-moss' : 'text-ember-500'} />
          <p className="text-sm text-coffee-700">
            Your last attempt:{' '}
            <span className="font-bold text-ink">
              {last.score} / {last.total} ({lastPercent}%)
            </span>
          </p>
        </div>
      )}

      <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-3">
        Pick a length
      </p>
      <div className="flex flex-wrap gap-2.5 mb-6">
        {presets.map((n) => (
          <button
            key={n}
            onClick={() => start(n)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-coffee-200 hover:border-rust hover:bg-rust/5 transition-all text-sm font-medium text-ink"
          >
            <Play size={13} className="text-rust" />
            {n === 5 ? 'Quick' : n === 10 ? 'Standard' : 'Extended'} · {n} questions
          </button>
        ))}
        <button
          onClick={() => start(bank.length)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-ink bg-ink text-cream hover:bg-coffee-800 transition-all text-sm font-medium"
        >
          <Play size={13} />
          Full · all {bank.length} questions
        </button>
      </div>

      <div className="pt-5 border-t border-coffee-200">
        <label className="block text-xs font-mono uppercase tracking-wider text-coffee-700 mb-3">
          Or choose your own number
        </label>
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="number"
            min="1"
            max={bank.length}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startCustom()}
            placeholder={`1–${bank.length}`}
            aria-label="Number of questions"
            className="w-28 px-3 py-2.5 rounded-xl border-2 border-coffee-200 focus:border-rust focus:outline-none bg-paper text-ink text-sm"
          />
          <button onClick={startCustom} className="btn-primary text-sm">
            <Play size={14} /> Start
          </button>
        </div>
        {error && <p className="text-xs text-rust mt-2">{error}</p>}
      </div>
    </div>
  );
}
