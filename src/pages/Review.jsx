import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Play, CheckCircle2, AlertCircle, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { useCatalogue } from '../data/useCatalogue';
import { useProgress } from '../components/useProgress';
import Quiz from '../components/Quiz';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  buildQueue, dueCount, selectLeeches,
  REVIEW_STORAGE_KEY, ITEM_KINDS, DEFAULT_LIMIT,
} from '../utils/reviewSchedule';
import { collectReviewItems, toQuizQuestions, quizQuestionId } from '../utils/reviewItems';

export default function Review() {
  usePageTitle('Review');
  const { profile } = useAuth();
  const { catalogue, department, status: catalogueStatus } = useCatalogue();
  const { progress, recordReviews } = useProgress(REVIEW_STORAGE_KEY);

  // null = not started; otherwise the queue in play.
  const [queue, setQueue] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState(null);

  // Foundation pins are slugs from the FOUNDATION list, so applying them to a
  // full department catalogue would filter it down to nothing. Same guard the
  // Planner uses.
  const selectedCourses = department?.status === 'foundation' ? profile?.selected_courses : null;

  // Only MCQ items for now. Written questions and lecture-note flashcards need
  // their own session UI and are not yet emitting outcomes anywhere.
  const pool = useMemo(
    () => collectReviewItems(catalogue?.courses ?? [], {
      selectedCourses,
      kinds: [ITEM_KINDS.quiz],
    }),
    [catalogue, selectedCourses],
  );

  // Memoised: `progress.items || {}` would be a fresh object every render, so
  // the leech memo below would never actually memoise.
  const items = useMemo(() => progress.items || {}, [progress.items]);
  const due = dueCount(items, pool);
  const leeches = useMemo(() => selectLeeches(items, pool), [items, pool]);
  const started = pool.filter((i) => items[i.id]).length;

  // Built up front rather than on click, so the button can name the real session
  // length. A queue is due work *plus* a capped intake of never-seen questions,
  // so labelling it from `due` alone would under-promise — a student with one
  // item due would be told "1 item" and handed eleven.
  const next = useMemo(
    () => buildQueue(items, pool, { limit: DEFAULT_LIMIT }),
    [items, pool],
  );

  const start = () => {
    setQueue(next);
    setAttempt((a) => a + 1);
    setDone(null);
  };

  const finish = (score, total, outcomes) => {
    recordReviews(outcomes);
    setDone({ score, total });
    setQueue(null);
  };

  // ── Catalogue still resolving, or failed ──────────────────────
  if (catalogueStatus !== 'ready') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50">
          <AlertCircle size={18} className="text-coffee-700 shrink-0 mt-0.5" />
          <p className="text-sm text-coffee-700">
            {catalogueStatus === 'error'
              ? "Your courses didn't download — check your connection and reload the page."
              : 'Loading your courses…'}
          </p>
        </div>
      </div>
    );
  }

  // ── A session in play ─────────────────────────────────────────
  if (queue?.length) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-4">
          Review session · {queue.length} item{queue.length === 1 ? '' : 's'}
        </p>
        <Quiz
          key={attempt}
          questions={toQuizQuestions(queue)}
          itemIdFor={quizQuestionId}
          onComplete={finish}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Review' }]} />

      <div className="flex items-start gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-ember-500/10 text-ember-500 flex items-center justify-center shrink-0">
          <Brain size={22} />
        </div>
        <div>
          <h1 className="display-heading text-3xl text-ink mb-1">Review</h1>
          <p className="text-sm text-coffee-700 leading-relaxed">
            A short mixed set drawn from every course you take — questions due to
            come back, topped up with ones you haven&apos;t met yet. Get one right and
            it returns later; get it wrong and it returns tomorrow.
          </p>
        </div>
      </div>

      {done && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl border border-moss/30 bg-moss/5">
          <CheckCircle2 size={18} className="text-moss shrink-0" />
          <p className="text-sm text-coffee-700">
            Session saved — <span className="font-bold text-ink">{done.score} / {done.total}</span>.
            Each answer moved its question forward or back in the schedule.
          </p>
        </div>
      )}

      {/* ── Counts ── */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Stat label="Due now" value={due} accent={due > 0} />
        <Stat label="Being tracked" value={started} />
        <Stat label="In your courses" value={pool.length} />
      </div>

      {next.length > 0 ? (
        <>
          <button onClick={start} className="btn-primary w-full sm:w-auto justify-center mb-2">
            <Play size={15} />
            Start {next.length} question{next.length === 1 ? '' : 's'}
          </button>
          <p className="text-xs text-coffee-500 mb-6">
            {due > 0
              ? `${due} due for review${next.length > due ? `, plus ${next.length - due} you haven't seen yet` : ''}.`
              : 'Nothing due — these are questions you haven\'t seen yet.'}
          </p>
        </>
      ) : pool.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nothing to review yet"
          body="None of your courses have a question bank yet. Once one does, its questions show up here."
          to="/courses"
          cta="Browse your courses"
        />
      ) : (
        <EmptyState
          icon={CheckCircle2}
          title="You're caught up"
          body="Nothing is due right now. Come back tomorrow, or take a new practice quiz to start tracking more questions."
          to="/courses"
          cta="Practise something new"
        />
      )}

      {/* Items missed so often that rescheduling has stopped helping. Sent to
          the notes rather than round-tripped through the queue again. */}
      {leeches.length > 0 && (
        <div className="mt-8 pt-6 border-t border-coffee-200">
          <div className="flex items-start gap-3 mb-3">
            <Layers size={16} className="text-rust shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display font-bold text-ink">Worth re-reading</h2>
              <p className="text-sm text-coffee-700 leading-relaxed">
                You&apos;ve missed these repeatedly — another attempt isn&apos;t the fix.
                Go back to the notes for the course first.
              </p>
            </div>
          </div>
          <ul className="space-y-2">
            {leeches.slice(0, 5).map((item) => (
              <li key={item.id}>
                <Link
                  to={`/courses/${item.courseSlug}`}
                  className="block px-4 py-3 rounded-xl border border-coffee-200 hover:border-rust bg-paper transition-colors"
                >
                  <span className="text-xs font-mono text-coffee-500">{item.courseCode}</span>
                  <p className="text-sm text-ink leading-snug mt-0.5">{item.question.question}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent = false }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${accent ? 'border-ember-500/40 bg-ember-500/5' : 'border-coffee-200 bg-paper'}`}>
      <p className={`display-heading text-2xl ${accent ? 'text-ember-500' : 'text-ink'}`}>{value}</p>
      <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mt-0.5">{label}</p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, body, to, cta }) {
  return (
    <div className="rounded-xl border border-coffee-200 bg-coffee-50 px-5 py-6 text-center">
      <Icon size={22} className="text-coffee-500 mx-auto mb-3" />
      <h2 className="font-display font-bold text-ink mb-1">{title}</h2>
      <p className="text-sm text-coffee-700 leading-relaxed max-w-md mx-auto mb-4">{body}</p>
      <Link to={to} className="btn-ghost mx-auto w-fit">{cta}</Link>
    </div>
  );
}
