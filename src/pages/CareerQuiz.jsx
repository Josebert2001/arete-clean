import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCareer } from '../components/useCareer';
import { placementQuestions, PLACEMENT_VERSION } from '../data/careers';
import { careerRequest } from '../utils/careerApi';
import { usePageTitle } from '../utils/usePageTitle';
import { CAREER_SIGN_IN } from '../utils/learningEntry';

function QuizForm({ ownerId }) {
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const attemptId = useRef(null);
  const heading = useRef(null);
  const navigate = useNavigate();
  const questions = placementQuestions.slice(page * 5, page * 5 + 5);
  const complete = questions.every(q => Number.isInteger(answers[q.id]));
  const section = page < 2 ? 'Your interests' : page === 2 ? 'Interests and judgment' : page < 5 ? 'Practical judgment' : 'Foundations';

  function changePage(next) {
    setPage(next);
    setError('');
    heading.current?.focus();
  }
  async function submit(event) {
    event.preventDefault();
    if (!complete || busy) return;
    if (page < 5) return changePage(page + 1);
    setBusy(true); setError('');
    try {
      attemptId.current ||= crypto.randomUUID();
      await careerRequest('submit', { version: PLACEMENT_VERSION, answers, attemptId: attemptId.current }, ownerId);
      navigate('/career', { replace: true });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit}>
    <div className="flex justify-between gap-3 text-sm text-coffee-600 mb-3"><span>Step {page + 1} of 6 · {section}</span><span>{Object.keys(answers).length}/30 answered</span></div>
    <progress value={Object.keys(answers).length} max={30} aria-label="Questions answered" className="w-full h-2 accent-moss mb-8" />
    <h2 ref={heading} tabIndex={-1} className="font-display text-2xl text-ink mb-6 outline-none">{section}</h2>
    <div className="space-y-7">{questions.map((question, index) => <fieldset key={question.id} className="bg-paper border border-coffee-200 rounded-xl p-5 sm:p-6">
      <legend className="sr-only">Question {page * 5 + index + 1}: {question.prompt}</legend>
      <p aria-hidden="true" className="text-xs font-mono text-rust mb-2">QUESTION {page * 5 + index + 1}</p><p aria-hidden="true" className="font-semibold text-ink mb-4">{question.prompt}</p>
      <div className="space-y-2">{question.options.map((option, value) => <label key={value} className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer ${answers[question.id] === value ? 'border-moss bg-moss/5' : 'border-coffee-200 hover:border-coffee-400'}`}>
        <input type="radio" name={question.id} value={value} checked={answers[question.id] === value} onChange={() => {
          setAnswers(current => ({ ...current, [question.id]: value }));
          attemptId.current = null; // A revised failed request is a new attempt.
        }} disabled={busy} className="mt-1 accent-moss" /><span className="text-sm text-coffee-800">{option}</span>
      </label>)}</div>
    </fieldset>)}</div>
    {error && <p role="alert" className="mt-6 rounded-xl border border-rust/30 p-4 text-sm text-rust">{error} Your choices are still on this page.</p>}
    <div className="flex justify-between gap-3 mt-8"><button type="button" className="btn-ghost" disabled={page === 0 || busy} onClick={() => changePage(page - 1)}><ArrowLeft size={15} /> Back</button><button type="submit" disabled={!complete || busy} className="btn-primary">{busy ? 'Saving your recommendation…' : page === 5 ? 'Find my direction' : 'Continue'} <ArrowRight size={15} /></button></div>
  </form>;
}

function QuizAvailability({ ownerId }) {
  const { status, error, refresh } = useCareer();
  if (status === 'loading') return <p role="status" className="text-coffee-600">Checking career quiz availability…</p>;
  if (status === 'error') return <div className="rounded-xl border border-coffee-200 p-6"><p role="alert" className="text-coffee-700 mb-4">{error}</p><button onClick={refresh} className="btn-ghost">Try again</button><Link to="/careers" className="inline-block ml-4 underline text-sm">Explore career directions and starter tasks</Link></div>;
  return <QuizForm ownerId={ownerId} />;
}

export default function CareerQuiz() {
  usePageTitle('Career discovery quiz');
  const { user } = useAuth();
  return <div className="max-w-3xl mx-auto px-6 py-12">
    <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-coffee-600 mb-8"><ArrowLeft size={14} /> Explore careers</Link>
    <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rust mb-4"><Compass size={16} /> A starting direction, not a permanent label</p>
    <h1 className="display-heading text-4xl text-ink mb-4">What work draws your curiosity?</h1>
    <p className="text-coffee-700 leading-relaxed mb-4">Answer honestly. Interests carry more weight than prior knowledge. “Not sure yet” is useful too. Your result explains a starting direction and preparation gaps; it is not a hiring test or verified skills assessment.</p>
    <p className="text-sm text-coffee-600 mb-8">Submitting saves your answers, recommendation, and chosen direction privately to your account until account deletion. Retakes keep earlier results. Unsaved choices remain only in this page; leaving or reloading clears them. <Link to="/privacy" className="underline">Privacy details</Link></p>
    {user ? <QuizAvailability key={user.id} ownerId={user.id} /> : <Link to={CAREER_SIGN_IN} className="btn-primary">Sign in to find my direction <ArrowRight size={15} /></Link>}
  </div>;
}
