import { useMemo, useState } from 'react';
import {
  GraduationCap, Play, Award, ArrowLeft, ListFilter, CheckCircle2, Circle,
} from 'lucide-react';
import Quiz from './Quiz';
import { useProgress } from './useProgress';
import { quizItemId, REVIEW_STORAGE_KEY } from '../utils/reviewSchedule';

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
  // Memoised for the same reason CourseExamPrep memoises its own: the `|| []`
  // fallback is a fresh array every render, and the chapter grouping below
  // depends on it.
  const bank = useMemo(() => course.quiz || [], [course.quiz]);
  const { progress, setQuizScore } = useProgress(STORAGE_KEY);
  // Review scheduling keeps its own record — see REVIEW_STORAGE_KEY. Two hook
  // instances rather than one, so the item map never bloats the quiz-score row
  // that this page and the Planner both read.
  const { recordReviews } = useProgress(REVIEW_STORAGE_KEY);
  const last = progress.quizScores?.[course.slug];

  // null = on the length picker; otherwise the sampled question set in play.
  const [questions, setQuestions] = useState(null);
  // attempt bumps on every start so <Quiz> remounts with fresh internal state.
  const [attempt, setAttempt] = useState(0);
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);

  // CourseDetail renders this at a fixed position and doesn't remount it on
  // prev/next navigation between courses — `selected` would otherwise survive
  // a slug change with labels from the old course's chapters. The next
  // course's bank almost certainly doesn't share those labels, so the filter
  // below would silently empty the pool (or, on a course with same-named
  // chapters, draw from the wrong ones). Chapter selection is scoped to one
  // course, so reset it during render on a slug change — the same pattern
  // CourseDetail itself uses for its remembered tab — rather than in an
  // effect, which would commit the stale selection's render first. `error`
  // resets alongside it: its text names the previous pool's bounds ("Enter a
  // number between 1 and 1"), which would otherwise sit under the new
  // course's picker, unearned by anything typed there.
  const [selectedFor, setSelectedFor] = useState(course.slug);
  if (selectedFor !== course.slug) {
    setSelectedFor(course.slug);
    setSelected([]);
    setError('');
  }

  // A bank authored chapter by chapter tags every question with the chapter it
  // came from (ENT 221 — 367 questions over the workbook's 18 chapters). That
  // tag is what makes the bank usable mid-semester: a student being taught
  // chapter 9 this week wants chapter 9, not a random draw across a whole
  // year's material. Selecting chapters narrows the *pool* rather than starting
  // a set of its own, so the length picker below keeps working unchanged —
  // "Quick · 5" on two selected chapters means five questions from those two.
  // A bank with no `chapter` anywhere (every other shipped bank) yields no
  // entries here, renders no pills, and behaves exactly as it always has.
  const chapters = useMemo(() => {
    const counts = new Map();
    for (const q of bank) {
      if (!q.chapter) continue;
      counts.set(q.chapter, (counts.get(q.chapter) || 0) + 1);
    }
    return [...counts.entries()];
  }, [bank]);

  const pool = useMemo(
    () => (selected.length ? bank.filter((q) => selected.includes(q.chapter)) : bank),
    [bank, selected],
  );

  // The error names the pool size, so narrowing has to clear a stale one —
  // "enter a number between 1 and 367" is wrong the moment a chapter is picked.
  const toggleChapter = (label) => {
    setSelected((prev) => (
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    ));
    setError('');
  };

  const start = (count) => {
    // Guards a pool of zero — reachable only for the one render where a stale
    // `selected` from a just-left course doesn't match the new course's
    // chapters yet, before the effect above clears it. Quiz indexes its first
    // question unconditionally, so handing it an empty set crashes rather
    // than showing nothing.
    if (pool.length === 0) return;
    const n = Math.max(1, Math.min(count, pool.length));
    setQuestions(sample(pool, n));
    setAttempt((a) => a + 1);
    setError('');
  };

  const startCustom = () => {
    const n = parseInt(custom, 10);
    if (!Number.isInteger(n) || n < 1 || n > pool.length) {
      setError(`Enter a number between 1 and ${pool.length}.`);
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
          <ArrowLeft size={15} /> Back to the question picker
        </button>
        <Quiz
          key={attempt}
          questions={questions}
          itemIdFor={(q) => quizItemId(course.slug, q)}
          onComplete={(score, total, outcomes) => {
            setQuizScore(course.slug, score, total);
            recordReviews(outcomes);
          }}
        />
      </div>
    );
  }

  // ── Length picker view ────────────────────────────────────────
  // Presets only make sense below the pool size; "Full" always covers the rest.
  const presets = [5, 10, 20].filter((n) => n < pool.length);
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
            {bank.length} questions cover this course&apos;s lecture notes.
            {chapters.length > 1
              ? ' Pick the chapters you are revising, then choose how many questions you want'
              : ' Choose how many you want'}
            {' '}— they are drawn at random, so each attempt is different.
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

      {chapters.length > 1 && (
        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-3 flex items-center gap-2">
            <ListFilter size={14} /> Pick by chapter
            <span className="font-sans normal-case tracking-normal text-coffee-500">
              — optional
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {chapters.map(([label, count]) => {
              const on = selected.includes(label);
              return (
                <button
                  key={label}
                  onClick={() => toggleChapter(label)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 transition-all text-sm text-left ${
                    on ? 'border-rust bg-rust/10 text-ink' : 'border-coffee-200 hover:border-coffee-500 text-coffee-700'
                  }`}
                >
                  {on
                    ? <CheckCircle2 size={14} className="text-rust shrink-0" />
                    : <Circle size={14} className="text-coffee-300 shrink-0" />}
                  {label}
                  <span className="text-xs text-coffee-500">({count})</span>
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <p className="text-sm text-coffee-700 mt-3">
              Drawing from{' '}
              <span className="font-bold text-ink">{pool.length} questions</span> in{' '}
              {selected.length} chapter{selected.length === 1 ? '' : 's'}.{' '}
              <button
                onClick={() => { setSelected([]); setError(''); }}
                className="text-coffee-600 hover:text-ink underline underline-offset-2"
              >
                Clear
              </button>
            </p>
          )}
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
          onClick={() => start(pool.length)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-ink bg-ink text-cream hover:bg-coffee-800 transition-all text-sm font-medium"
        >
          <Play size={13} />
          Full · all {pool.length} question{pool.length === 1 ? '' : 's'}
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
            max={pool.length}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startCustom()}
            placeholder={`1–${pool.length}`}
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
