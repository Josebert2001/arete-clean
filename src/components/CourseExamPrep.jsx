import { useMemo, useState } from 'react';
import {
  PenLine, Play, ArrowLeft, ArrowRight, Eye, CheckCircle2, Circle, XCircle,
  Award, RotateCcw, Lightbulb, BookOpen,
} from 'lucide-react';
import MathText from './MathText';
import { useProgress } from './useProgress';
import { examItemId, gradeFromMarks, REVIEW_STORAGE_KEY } from '../utils/reviewSchedule';

// Written-exam practice, as opposed to the MCQ `course.quiz` bank. Nothing
// here is auto-scored against a correct option, because a written answer has
// no options — the student writes on paper, reveals the model answer, and
// ticks the mark-scheme points they actually earned. Self-marking is the
// point: reading a mark scheme is the skill the MCQ bank cannot teach, and it
// needs no network and no AI call, which matters the night before a paper.
//
// Scores share the same progress record shape as CourseQuiz, under their own
// storage key, so a course can carry both banks without them colliding.
const STORAGE_KEY = 'course-exam-prep-v1';

// Written answers are kept locally and never synced. They are bulky, they are
// the student's own rough working rather than a result, and a half-finished
// answer is not something to push to a server — but losing 200 words to a
// reload would make typing in-app worse than paper, so they do persist.
//
// Keyed by question text rather than index: a set is sampled and shuffled per
// attempt, so an index points at a different question next time round.
const ANSWERS_KEY = 'course-exam-answers-v1';

function loadAnswer(slug, question) {
  try {
    const all = JSON.parse(localStorage.getItem(ANSWERS_KEY)) || {};
    return all[`${slug}::${question}`] || '';
  } catch {
    return '';
  }
}

function saveAnswer(slug, question, text) {
  try {
    const all = JSON.parse(localStorage.getItem(ANSWERS_KEY)) || {};
    if (text.trim()) all[`${slug}::${question}`] = text;
    else delete all[`${slug}::${question}`];
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(all));
  } catch { /* private mode — the answer just lives for this session */ }
}

// Recall answers are matched leniently: the student is being tested on whether
// they remember the item, not on their spelling under time pressure. Strip
// case, punctuation and any leading article, then collapse spaces. Anything
// non-alphanumeric becomes a space, which covers accented input too.
function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/^(the|a|an)\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// An answer counts if it matches the item's name or any alias, in either
// direction — "signature" matches "signature-based detection", and a student
// who writes the full phrase for an alias of one word still matches.
function matchesItem(answer, item) {
  const a = normalize(answer);
  if (!a) return false;
  const candidates = [item.name, ...(item.aliases || [])].map(normalize);
  return candidates.some((c) => c && (a === c || a.includes(c) || c.includes(a)));
}

function Pill({ children }) {
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-coffee-100 text-coffee-700 whitespace-nowrap">
      {children}
    </span>
  );
}

// ── Longform: question → student answers → reveal + self-mark ─────────
//
// The answer box gates the reveal, and the reason is not suspicion — nobody is
// being marked here, and a student who skips is only cheating themselves. It
// is the fluency illusion: reading a well-written model answer feels like
// knowing it, so a student can go through all 45 questions, recognise every
// one, and still be unable to produce a paragraph on the day. Forcing even a
// few words of retrieval first is what makes the practice work.
//
// One box serves two ways of working. Type the whole answer if you are at a
// keyboard; jot the five points you would make if you are on a phone or the
// question wants a diagram, which cannot be typed at all. Either way the text
// then sits beside the mark scheme, which beats marking against paper.
function LongformQuestion({ q, courseSlug, awarded, onAward }) {
  const [revealed, setRevealed] = useState(false);
  const [ticked, setTicked] = useState([]);
  const [answer, setAnswer] = useState(() => loadAnswer(courseSlug, q.question));

  const updateAnswer = (text) => {
    setAnswer(text);
    saveAnswer(courseSlug, q.question, text);
  };

  const toggle = (i) => {
    const next = ticked.includes(i) ? ticked.filter((t) => t !== i) : [...ticked, i];
    setTicked(next);
    // Each scheme line carries its mark value in trailing parentheses.
    const earned = next.reduce((sum, idx) => {
      const m = q.markScheme[idx].match(/\(([0-9.]+)\)\s*$/);
      return sum + (m ? parseFloat(m[1]) : 0);
    }, 0);
    onAward(Math.round(earned * 10) / 10);
  };

  return (
    <div>
      <p className="text-ink leading-relaxed mb-5">
        <MathText text={q.question} />
      </p>

      {!revealed ? (
        <div>
          <label
            htmlFor={`answer-${q.source}`}
            className="block text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2"
          >
            Your answer
          </label>
          <textarea
            id={`answer-${q.source}`}
            value={answer}
            onChange={(e) => updateAnswer(e.target.value)}
            rows={7}
            placeholder={
              q.figure
                ? 'Type your answer here, and sketch the diagram on paper — you can compare it against the real one once you reveal. Short points are fine.'
                : 'Type your answer here. Full prose if you are at a keyboard, or just the points you would make — either works.'
            }
            className="w-full px-4 py-3 rounded-xl border-2 border-coffee-200 focus:border-rust focus:outline-none bg-paper text-ink text-sm leading-relaxed resize-y"
          />
          <p className="text-xs text-coffee-700 mt-2 mb-4 leading-relaxed">
            Answer before you look. Reading a model answer feels like knowing it — writing
            one first is the only way to find out whether you do. Saved as you type.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setRevealed(true)}
              disabled={!answer.trim()}
              className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Eye size={15} /> Reveal model answer &amp; mark scheme
            </button>
            <button
              onClick={() => setRevealed(true)}
              className="text-xs text-coffee-600 hover:text-ink underline underline-offset-2"
            >
              Skip — just show me the answer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-fade-in">
          {answer.trim() && (
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">
                What you wrote
              </p>
              <div className="rounded-xl border-2 border-coffee-200 bg-paper p-4">
                <p className="text-sm text-ink leading-relaxed whitespace-pre-line">{answer}</p>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">
              Model answer
            </p>
            <div className="rounded-xl border border-coffee-200 bg-coffee-50 p-4">
              <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
                <MathText text={q.modelAnswer} />
              </p>
            </div>
          </div>

          {q.figure && (
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">
                Compare your diagram
              </p>
              <img
                src={q.figure}
                alt="The figure this question asks you to reproduce"
                loading="lazy"
                className="rounded-xl border border-coffee-200 bg-paper w-full max-w-lg"
              />
            </div>
          )}

          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">
              Mark scheme — tick what you actually wrote
            </p>
            <div className="space-y-2">
              {q.markScheme.map((point, i) => {
                const on = ticked.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    aria-pressed={on}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-start gap-3 ${
                      on ? 'border-moss bg-moss/10' : 'border-coffee-200 bg-paper hover:border-coffee-500'
                    }`}
                  >
                    {on
                      ? <CheckCircle2 size={17} className="text-moss shrink-0 mt-0.5" />
                      : <Circle size={17} className="text-coffee-300 shrink-0 mt-0.5" />}
                    <span className="text-sm text-ink leading-snug">
                      <MathText text={point} />
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-coffee-700 mt-3">
              You scored{' '}
              <span className="font-bold text-ink">{awarded} / {q.marks}</span>
              {awarded < q.marks && (
                <> — the gaps above are what to re-read in <span className="font-mono">{q.source}</span>.</>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Recall: unaided list recall, then the "and explain each" half ──────
function RecallQuestion({ q, awarded, onAward }) {
  const [entries, setEntries] = useState(() => q.items.map(() => ''));
  const [checked, setChecked] = useState(false);

  // Each blank is credited against any not-yet-claimed item, so order does not
  // matter — an exam would not require the list in sequence either.
  const results = useMemo(() => {
    if (!checked) return null;
    const claimed = new Set();
    return entries.map((entry) => {
      const idx = q.items.findIndex((it, i) => !claimed.has(i) && matchesItem(entry, it));
      if (idx >= 0) claimed.add(idx);
      return idx;
    });
  }, [checked, entries, q.items]);

  const check = () => {
    const claimed = new Set();
    entries.forEach((entry) => {
      const idx = q.items.findIndex((it, i) => !claimed.has(i) && matchesItem(entry, it));
      if (idx >= 0) claimed.add(idx);
    });
    setChecked(true);
    onAward(claimed.size);
  };

  const retry = () => {
    setEntries(q.items.map(() => ''));
    setChecked(false);
    onAward(0);
  };

  return (
    <div>
      <p className="text-ink leading-relaxed mb-1">
        <MathText text={q.question} />
      </p>
      <p className="text-xs text-coffee-700 mb-5">
        Closed book — no notes. Order does not matter.
      </p>

      <div className="space-y-2.5 mb-5">
        {entries.map((value, i) => {
          const hit = results ? results[i] >= 0 : null;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-mono text-coffee-500 w-5 shrink-0">{i + 1}.</span>
              <input
                type="text"
                value={value}
                disabled={checked}
                onChange={(e) => {
                  const next = [...entries];
                  next[i] = e.target.value;
                  setEntries(next);
                }}
                onKeyDown={(e) => e.key === 'Enter' && !checked && check()}
                aria-label={`Item ${i + 1}`}
                className={`flex-1 min-w-0 px-3 py-2.5 rounded-xl border-2 bg-paper text-ink text-sm focus:outline-none ${
                  checked
                    ? hit ? 'border-moss bg-moss/5' : 'border-rust bg-rust/5'
                    : 'border-coffee-200 focus:border-rust'
                }`}
              />
              {checked && (hit
                ? <CheckCircle2 size={17} className="text-moss shrink-0" />
                : <XCircle size={17} className="text-rust shrink-0" />)}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button onClick={check} className="btn-primary text-sm">
          <Eye size={15} /> Check my recall
        </button>
      ) : (
        <div className="animate-fade-in">
          <p className="text-sm text-coffee-700 mb-4">
            You recalled <span className="font-bold text-ink">{awarded} / {q.marks}</span>.
            Naming them is half the marks — an exam asks you to explain each as well:
          </p>
          <div className="space-y-2 mb-4">
            {q.items.map((item) => (
              <div key={item.name} className="rounded-lg border border-coffee-200 bg-coffee-50 px-4 py-3">
                <p className="text-sm font-bold text-ink mb-0.5">{item.name}</p>
                <p className="text-sm text-coffee-700 leading-relaxed">
                  <MathText text={item.explain} />
                </p>
              </div>
            ))}
          </div>
          <button onClick={retry} className="btn-ghost text-sm">
            <RotateCcw size={15} /> Try this one again
          </button>
        </div>
      )}
    </div>
  );
}

export default function CourseExamPrep({ course }) {
  const bank = course.examPrep || [];
  const { progress, setQuizScore } = useProgress(STORAGE_KEY);
  // Review scheduling keeps its own record — see REVIEW_STORAGE_KEY.
  const { recordReviews } = useProgress(REVIEW_STORAGE_KEY);
  const last = progress.quizScores?.[course.slug];

  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [awards, setAwards] = useState({});
  const [finished, setFinished] = useState(false);

  const start = (list) => {
    setQuestions(list);
    setCurrent(0);
    setAwards({});
    setFinished(false);
  };

  const totalMarks = questions ? questions.reduce((s, q) => s + q.marks, 0) : 0;
  const earnedMarks = Object.values(awards).reduce((s, v) => s + v, 0);

  if (bank.length === 0) return null;

  // ── Results ───────────────────────────────────────────────────
  if (questions && finished) {
    const percent = totalMarks ? Math.round((earnedMarks / totalMarks) * 100) : 0;
    return (
      <div className="bg-paper border border-coffee-200 rounded-xl p-6 sm:p-8">
        <div className="text-center mb-7">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-rust/10">
            <Award size={30} className="text-rust" />
          </div>
          <h3 className="display-heading text-3xl text-ink mb-1">
            {Math.round(earnedMarks * 10) / 10} / {totalMarks}{' '}
            <span className="text-coffee-500 text-xl">({percent}%)</span>
          </h3>
          <p className="text-sm text-coffee-700">
            Self-marked across {questions.length} question{questions.length === 1 ? '' : 's'}.
          </p>
        </div>

        <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">
          Where to revise
        </p>
        <div className="space-y-2 mb-6">
          {questions.map((q, i) => {
            const got = awards[i] || 0;
            const full = got >= q.marks;
            return (
              <div
                key={i}
                className={`rounded-lg border px-4 py-3 text-sm flex gap-3 ${
                  full ? 'border-moss/30 bg-moss/5' : 'border-rust/30 bg-rust/5'
                }`}
              >
                {full
                  ? <CheckCircle2 size={16} className="text-moss shrink-0 mt-0.5" />
                  : <Circle size={16} className="text-rust shrink-0 mt-0.5" />}
                <div className="min-w-0 flex-1">
                  <p className="text-ink leading-snug">{q.question}</p>
                  <p className="text-xs text-coffee-700 mt-1">
                    {Math.round(got * 10) / 10} / {q.marks} · lecture notes {q.source}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => setQuestions(null)} className="btn-ghost mx-auto">
          <RotateCcw size={16} /> Back to the question picker
        </button>
      </div>
    );
  }

  // ── In-session ────────────────────────────────────────────────
  if (questions) {
    const q = questions[current];
    const awarded = awards[current] ?? 0;
    const award = (marks) => setAwards((a) => ({ ...a, [current]: marks }));

    const next = () => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
      } else {
        setFinished(true);
        const pct = totalMarks ? Math.round((earnedMarks / totalMarks) * 100) : 0;
        setQuizScore(course.slug, pct, 100);
        // One write for the whole set, not one per question — useProgress
        // re-uploads the entire blob on every change. A self-marked answer is
        // graded pass/fail against the question's marks (see REVIEW_PASS_FRACTION),
        // since the scheduler wants a binary outcome.
        recordReviews(questions.map((question, i) => ({
          id: examItemId(course.slug, question),
          correct: gradeFromMarks(awards[i] ?? 0, question.marks),
        })));
      }
    };

    return (
      <div>
        <button onClick={() => setQuestions(null)} className="btn-ghost mb-5 text-sm">
          <ArrowLeft size={15} /> Leave this set
        </button>

        <div className="bg-paper border border-coffee-200 rounded-xl p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-coffee-700">
              Question {current + 1} of {questions.length}
            </span>
            <Pill>[{q.marks} marks]</Pill>
            <Pill>{q.type === 'recall' ? 'Recall drill' : 'Written answer'}</Pill>
            <Pill>notes {q.source}</Pill>
          </div>

          {q.type === 'recall'
            ? <RecallQuestion key={current} q={q} awarded={awarded} onAward={award} />
            : <LongformQuestion key={current} q={q} courseSlug={course.slug} awarded={awarded} onAward={award} />}

          <button onClick={next} className="btn-primary w-full justify-center mt-7">
            {current + 1 < questions.length ? 'Next question' : 'See results'}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  // ── Picker ────────────────────────────────────────────────────
  const longform = bank.filter((q) => q.type === 'longform');
  const recall = bank.filter((q) => q.type === 'recall');
  const shuffled = (list, n) => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  };

  return (
    <div>
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center shrink-0">
          <PenLine size={20} />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-ink mb-1">Written Exam Prep</h2>
          <p className="text-sm text-coffee-700 leading-relaxed">
            {bank.length} questions in the forms a written paper actually uses. You write
            the answer, then mark yourself against the scheme — the same way the examiner will.
          </p>
        </div>
      </div>

      {last && (
        <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50">
          <Award size={18} className={last.score >= 70 ? 'text-moss' : 'text-ember-500'} />
          <p className="text-sm text-coffee-700">
            Your last self-marked set: <span className="font-bold text-ink">{last.score}%</span>
          </p>
        </div>
      )}

      <div className="rounded-xl border border-coffee-200 bg-coffee-50 p-4 mb-6">
        <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2.5 flex items-center gap-2">
          <Lightbulb size={14} /> How to write this paper
        </p>
        <ul className="space-y-1.5 text-sm text-coffee-700 leading-relaxed">
          <li>· A 10-mark question wants about five distinct points, each named then explained in a sentence or two. One unbroken paragraph scores badly even when it is all correct — the marker is counting points.</li>
          <li>· Structure every long answer the same way: <span className="text-ink font-medium">define → explain → example or diagram → link</span> to a neighbouring concept.</li>
          <li>· On a four-from-six paper in two hours, budget 30 minutes a question: 5 planning, 20 writing, 5 checking. Read all six and choose before you write anything.</li>
          <li>· Where a list is long, the question asks for &ldquo;any five&rdquo; — learn five you can explain rather than fifteen you can only name.</li>
        </ul>
      </div>

      <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-3">
        Pick a set
      </p>
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => start(shuffled(bank, Math.min(5, bank.length)))}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-coffee-200 hover:border-rust hover:bg-rust/5 transition-all text-sm font-medium text-ink"
        >
          <Play size={13} className="text-rust" /> Quick · 5 mixed
        </button>
        {longform.length > 0 && (
          <button
            onClick={() => start(shuffled(longform, Math.min(4, longform.length)))}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-coffee-200 hover:border-rust hover:bg-rust/5 transition-all text-sm font-medium text-ink"
          >
            <BookOpen size={13} className="text-rust" /> Mock paper · 4 written
          </button>
        )}
        {recall.length > 0 && (
          <button
            onClick={() => start(shuffled(recall, recall.length))}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-coffee-200 hover:border-rust hover:bg-rust/5 transition-all text-sm font-medium text-ink"
          >
            <Play size={13} className="text-rust" /> All {recall.length} recall drills
          </button>
        )}
        <button
          onClick={() => start(shuffled(bank, bank.length))}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-ink bg-ink text-cream hover:bg-coffee-800 transition-all text-sm font-medium"
        >
          <Play size={13} /> Everything · all {bank.length}
        </button>
      </div>
    </div>
  );
}
