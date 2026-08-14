import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import MathText from './MathText';

const PASS_MARK = 70;

// Shuffle a question's options so the correct answer isn't always in the same
// position — authored banks tend to skew correctIndex toward one or two slots,
// which makes the answer guessable when options render in declared order.
// correctIndex is remapped to wherever the right option lands.
function shuffleOptions(q) {
  const opts = q.options.map((text, i) => ({ text, correct: i === q.correctIndex }));
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return { ...q, options: opts.map((o) => o.text), correctIndex: opts.findIndex((o) => o.correct) };
}

// `itemIdFor` is optional: pass it when the caller's questions belong to a
// review-scheduled bank, and onComplete gains a third argument of per-item
// outcomes. Quiz stays generic — it never learns what a course or a slug is, the
// caller supplies the identity function (see CourseQuiz).
export default function Quiz({ questions, onComplete, itemIdFor }) {
  // Options are shuffled once per attempt (mount), and again on retake. The
  // prop stays stable for a given mount, so this initializer runs exactly once.
  const [items, setItems] = useState(() => questions.map(shuffleOptions));
  const [current, setCurrent] = useState(0);
  // One slot per question, null until answered. Indexed rather than appended
  // because the student can step back to re-read a question they've already
  // answered — appending would record the same answer twice on the way back.
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [finished, setFinished] = useState(false);

  const q = items[current];
  const selected = answers[current];
  const answered = selected !== null;
  // Derived rather than accumulated, so revisiting a question can't double-count
  // it. An answer is locked once given, so this only ever grows as you advance.
  const score = answers.reduce(
    (sum, a, i) => sum + (a !== null && a === items[i].correctIndex ? 1 : 0),
    0,
  );

  const handleSelect = (idx) => {
    if (answered) return;
    setAnswers(a => a.map((prev, i) => (i === current ? idx : prev)));
  };

  // Per-item results for the review scheduler. Built from `items` — the shuffled
  // copies — rather than the source questions; quizItemId sorts a question's
  // options precisely so an id built here matches one built from the bank.
  const outcomes = () => (
    itemIdFor
      ? items.map((item, i) => ({ id: itemIdFor(item), correct: answers[i] === item.correctIndex }))
      : []
  );

  const next = () => {
    if (current + 1 < items.length) {
      setCurrent(c => c + 1);
    } else {
      setFinished(true);
      // Reported once, at the end — not per answer. useProgress re-uploads the
      // whole progress blob on every change, so a per-question write would push
      // it on every tap.
      if (onComplete) onComplete(score, items.length, outcomes());
    }
  };

  const back = () => setCurrent(c => Math.max(0, c - 1));

  const restart = () => {
    setItems(questions.map(shuffleOptions));
    setCurrent(0);
    setAnswers(questions.map(() => null));
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / items.length) * 100);
    const passed = percent >= PASS_MARK;
    return (
      <div className="bg-paper border border-coffee-200 rounded-xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center ${passed ? 'bg-moss/15' : 'bg-rust/15'}`}>
            {passed
              ? <CheckCircle2 size={36} className="text-moss" />
              : <RotateCcw size={36} className="text-rust" />}
          </div>
          <h3 className="display-heading text-3xl text-ink mb-1">
            {score} / {items.length} <span className="text-coffee-500 text-xl">({percent}%)</span>
          </h3>
          <p className="text-xs font-mono text-coffee-500 mb-3">Pass mark: {PASS_MARK}%</p>
          <p className="text-coffee-700">
            {passed
              ? "Solid work! You've got a good grasp of this module."
              : "Keep at it — review the questions below, revisit the theory, and try again. You'll get it."}
          </p>
        </div>

        {/* Per-question breakdown */}
        <div className="space-y-2 mb-6 text-left">
          <p className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">Question breakdown</p>
          {items.map((question, i) => {
            const correct = answers[i] === question.correctIndex;
            return (
              <div
                key={i}
                className={`rounded-lg border px-4 py-3 text-sm flex gap-3 ${
                  correct ? 'border-moss/30 bg-moss/5' : 'border-rust/30 bg-rust/5'
                }`}
              >
                {correct
                  ? <CheckCircle2 size={16} className="text-moss shrink-0 mt-0.5" />
                  : <XCircle size={16} className="text-rust shrink-0 mt-0.5" />}
                <div className="min-w-0">
                  <p className="text-ink leading-snug"><MathText text={question.question} /></p>
                  {!correct && (
                    <p className="text-xs text-coffee-700 mt-1">
                      <span className="text-rust">Your answer:</span> <MathText text={question.options[answers[i]]} />
                      <span className="mx-1.5">·</span>
                      <span className="text-moss">Correct:</span> <MathText text={question.options[question.correctIndex]} />
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={restart} className="btn-ghost mx-auto">
          <RotateCcw size={16} /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-paper border border-coffee-200 rounded-xl p-6 sm:p-8">
      {/* Progress */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-coffee-700">
          Question {current + 1} of {items.length}
          <span className="mx-2 text-coffee-300">|</span>
          Pass mark: {PASS_MARK}%
        </span>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {items.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${
                i === current ? 'bg-ember-500' : answers[i] !== null ? 'bg-moss' : 'bg-coffee-200'
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-ink mb-6 leading-snug">
        <MathText text={q.question} />
      </h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let style = 'border-coffee-200 hover:border-coffee-500 bg-paper';
          let icon = null;
          if (answered) {
            if (idx === q.correctIndex) {
              style = 'border-moss bg-moss/10';
              icon = <CheckCircle2 size={18} className="text-moss" />;
            } else if (idx === selected) {
              style = 'border-rust bg-rust/10';
              icon = <XCircle size={18} className="text-rust" />;
            } else {
              style = 'border-coffee-200 opacity-50';
            }
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-between gap-3 ${style}`}
            >
              {/* The accessible name comes from the content rather than an
                  aria-label: an option may be maths, and KaTeX emits MathML a
                  screen reader can read properly, which a label of raw LaTeX
                  ("Option 1: \frac{dy}{dx}") would override. */}
              <span className="text-ink text-sm sm:text-base">
                <span className="sr-only">{`Option ${idx + 1}: `}</span>
                <MathText text={opt} />
              </span>
              {icon}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
      {answered && (
        <div
          className={`rounded-lg p-4 mb-6 animate-fade-in flex gap-3 ${
            selected === q.correctIndex
              ? 'bg-moss/10 border border-moss/30'
              : 'bg-rust/10 border border-rust/30'
          }`}
        >
          {selected === q.correctIndex
            ? <CheckCircle2 size={18} className="text-moss shrink-0 mt-0.5" />
            : <XCircle size={18} className="text-rust shrink-0 mt-0.5" />}
          <p className="text-sm leading-relaxed text-ink">
            <span className={`font-bold ${selected === q.correctIndex ? 'text-moss' : 'text-rust'}`}>
              {selected === q.correctIndex ? 'Correct. ' : 'Not quite. '}
            </span>
            <MathText text={q.explanation} />
          </p>
        </div>
      )}
      </div>

      {/* Back is offered whether or not the current question is answered — its
          job is letting a student re-read one they've already done, and an
          answered question renders with its answer and explanation intact. */}
      {(current > 0 || answered) && (
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {current > 0 && (
            <button onClick={back} className="btn-ghost justify-center sm:w-auto">
              <ArrowLeft size={16} /> Previous
            </button>
          )}
          {answered && (
            <button onClick={next} className="btn-primary flex-1 justify-center">
              {current + 1 < items.length ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
