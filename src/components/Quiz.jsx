import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const PASS_MARK = 70;

export default function Quiz({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setAnswers(a => [...a, idx]);
    if (idx === q.correctIndex) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const finalScore = score;
      if (onComplete) onComplete(finalScore, questions.length);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
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
            {score} / {questions.length} <span className="text-coffee-500 text-xl">({percent}%)</span>
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
          {questions.map((question, i) => {
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
                  <p className="text-ink leading-snug">{question.question}</p>
                  {!correct && (
                    <p className="text-xs text-coffee-700 mt-1">
                      <span className="text-rust">Your answer:</span> {question.options[answers[i]]}
                      <span className="mx-1.5">·</span>
                      <span className="text-moss">Correct:</span> {question.options[question.correctIndex]}
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
          Question {current + 1} of {questions.length}
          <span className="mx-2 text-coffee-300">|</span>
          Pass mark: {PASS_MARK}%
        </span>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${
                i < current ? 'bg-moss' : i === current ? 'bg-ember-500' : 'bg-coffee-200'
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-ink mb-6 leading-snug">
        {q.question}
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
              aria-label={`Option ${idx + 1}: ${opt}`}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-between gap-3 ${style}`}
            >
              <span className="text-ink text-sm sm:text-base">{opt}</span>
              {icon}
            </button>
          );
        })}
      </div>

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
            {q.explanation}
          </p>
        </div>
      )}

      {answered && (
        <button onClick={next} className="btn-primary w-full justify-center">
          {current + 1 < questions.length ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}
