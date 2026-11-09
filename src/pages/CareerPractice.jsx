import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCareer } from '../components/useCareer';
import { careerStarters, getCareerPath } from '../data/careers';
import { careerRequest } from '../utils/careerApi';
import { usePageTitle } from '../utils/usePageTitle';
import { CAREER_SIGN_IN } from '../utils/learningEntry';

function Notebook({ path, saved, ownerId }) {
  const starter = careerStarters[path];
  const [notes, setNotes] = useState(saved?.notes ?? '');
  const [feedback, setFeedback] = useState(saved?.reflected ?? false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  async function save() {
    setBusy(true); setError(''); setMessage('');
    try { await careerRequest('practice', { path, notes, reflected: feedback }, ownerId); setMessage('Reflection saved to your account.'); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  function download() {
    const text = `${starter.title}\nIntroductory practice; not independently assessed.\n\n${starter.evidence.map(([id, body]) => `${id}: ${body}`).join('\n')}\n\nMy reflection\n${notes}`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const link = document.createElement('a'); link.href = url; link.download = `arete-${path}-reflection.txt`; link.click(); URL.revokeObjectURL(url);
  }
  return <section className="mt-8">
    <label htmlFor="career-reflection" className="block font-display text-xl text-ink mb-3">Your evidence-backed reflection</label><p className="text-sm text-coffee-700 mb-4">{starter.prompt}</p>
    <textarea id="career-reflection" value={notes} maxLength={6000} rows={9} onChange={event => { setNotes(event.target.value); setMessage(''); }} className="w-full rounded-xl border border-coffee-300 bg-paper text-ink p-4 focus:outline-none focus:ring-2 focus:ring-moss" placeholder="Cite artifact IDs, separate facts from inference, and explain your next step." />
    <p className="text-xs text-coffee-600 mt-2">{notes.length}/6,000 characters · Use fictional evidence only. Save before leaving this page.</p>
    <div className="flex flex-wrap gap-3 mt-5"><button className="btn-primary" disabled={busy || !notes.trim()} onClick={save}>{busy ? 'Saving…' : 'Save reflection'}</button><button className="btn-ghost" disabled={!notes.trim()} onClick={() => setFeedback(true)}>Compare with feedback</button><button className="btn-ghost" disabled={!notes.trim()} onClick={download}>Download my reflection</button></div>
    {message && <p role="status" className="text-sm text-moss mt-4">{message}</p>}{error && <p role="alert" className="text-sm text-rust mt-4">{error} You can download your reflection instead.</p>}
    {feedback && <div className="bg-moss/5 border border-moss/30 rounded-xl p-6 mt-6"><h2 className="font-display text-xl text-ink mb-3">Compare your reasoning</h2><p className="text-sm text-coffee-700 leading-relaxed">{starter.feedback}</p><p className="text-sm font-semibold text-ink mt-4">Revise one unsupported claim, then add one check that would strengthen your conclusion.</p><p className="text-xs text-coffee-600 mt-3">This is a worked example for self-reflection. No human review or pass has been recorded.</p></div>}
  </section>;
}
function PracticeWorkspace({ path, ownerId }) {
  const career = useCareer();
  if (career.status === 'loading') return <p role="status" className="mt-8 text-coffee-600">Loading your saved reflection…</p>;
  return <>{career.error && <p className="text-sm text-coffee-600 mt-6">Account saving is unavailable. You can still write and download your reflection.</p>}<Notebook key={path} path={path} ownerId={ownerId} saved={career.notes.find(note => note.path === path)} /></>;
}
export default function CareerPractice() {
  usePageTitle('Career starter practice');
  const { path } = useParams();
  const { user } = useAuth();
  const starter = Object.hasOwn(careerStarters, path ?? '') ? careerStarters[path] : null;
  if (!starter) return <div className="max-w-3xl mx-auto px-6 py-16"><h1 className="display-heading text-3xl text-ink mb-4">This starter is not available</h1><Link to="/careers" className="btn-primary">Explore available directions</Link></div>;
  return <div className="max-w-3xl mx-auto px-6 py-12"><Link to="/career" className="text-sm underline text-coffee-600">Your career roadmap</Link><p className="text-xs font-mono uppercase tracking-widest text-rust mt-8 mb-3">{getCareerPath(path).name} · Introductory evidence worksheet</p><h1 className="display-heading text-4xl text-ink mb-4">{starter.title}</h1><p className="text-coffee-700 leading-relaxed mb-7">{starter.brief}</p>
    <div className="space-y-3">{starter.evidence.map(([id, body]) => <article key={id} className="rounded-xl border border-coffee-200 bg-paper p-5"><h2 className="font-mono text-sm text-rust mb-2">{id}</h2><p className="text-sm text-coffee-800 leading-relaxed">{body}</p></article>)}</div>
    {user ? <PracticeWorkspace key={`${user.id}:${path}`} path={path} ownerId={user.id} /> : <div className="mt-8"><p className="text-sm text-coffee-700 mb-4">{starter.prompt}</p><Link to={CAREER_SIGN_IN} className="btn-primary">Sign in to write and save a reflection</Link></div>}
    {path === 'blue' && user && <Link to="/career/investigation" className="btn-ghost mt-8">Try the independent investigation · pilot availability</Link>}
  </div>;
}
