import { Link } from 'react-router-dom';
import { ArrowRight, Flag, Code2, User } from 'lucide-react';
import { trackMeta } from '../data/trackMeta';
import { useProgress } from './useProgress';
import CareerHomeCard from './CareerHomeCard';

export default function IndependentLearningHome({ profile, welcome = false }) {
  const security = trackMeta.security;
  const { progress } = useProgress(security.storageKey);
  const completed = security.moduleIndex.filter(mod => progress.completedModules.includes(mod.id)).length;
  const next = security.moduleIndex.find(mod => !progress.completedModules.includes(mod.id)) || security.moduleIndex[0];
  const name = profile?.full_name?.trim().split(/\s+/)[0] || 'there';
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
      <p className="text-xs font-mono uppercase tracking-widest text-rust mb-4">Your learning space</p>
      <h1 className="display-heading text-4xl sm:text-5xl text-ink mb-4">{welcome ? `Welcome, ${name}.` : `Keep exploring, ${name}.`}</h1>
      <p className="text-coffee-700 leading-relaxed mb-8 max-w-2xl">Your security rooms and programming tracks are ready. Work at your own pace, use hints when you need them, and build your understanding one exercise at a time.</p>
      <CareerHomeCard />
      <section className="bg-ink text-cream rounded-2xl p-6 sm:p-8 mb-8">
        <p className="flex items-center gap-2 text-sm text-cream/80 mb-3"><Flag size={17} /> Security fundamentals · {completed}/{security.moduleCount} rooms marked complete</p>
        <h2 className="font-display text-2xl font-bold mb-3">{next.title}</h2>
        <p className="text-cream/80 mb-6">Read the theory, examine the evidence, and try the flag challenge.</p>
        <Link to={security.detailPath(next.id)} className="btn-primary">{completed ? 'Continue security practice' : 'Start your first security room'} <ArrowRight size={15} /></Link>
        <Link to={security.listPath} className="block mt-4 text-sm underline underline-offset-4">Browse all security rooms</Link>
      </section>
      <div className="grid sm:grid-cols-2 gap-5">
        <section className="bg-paper border border-coffee-200 rounded-xl p-6"><Code2 size={21} className="text-moss mb-3" /><h2 className="font-display text-xl font-bold text-ink mb-2">Build your coding foundations</h2><p className="text-sm text-coffee-700 mb-4">Java, Python, and C tracks include examples, quizzes, and mini projects.</p><Link to="/lab" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4">Explore Code Lab <ArrowRight size={14} /></Link></section>
        <section className="bg-paper border border-coffee-200 rounded-xl p-6"><User size={21} className="text-rust mb-3" /><h2 className="font-display text-xl font-bold text-ink mb-2">Make this your learning space</h2><p className="text-sm text-coffee-700 mb-4">Change your details or switch to a UniUyo curriculum whenever it suits you.</p><Link to="/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4">Profile settings <ArrowRight size={14} /></Link></section>
      </div>
      <Link to="/cybersecurity" className="inline-block mt-8 text-sm text-coffee-700 underline underline-offset-4">About cybersecurity learning and team pilots</Link>
    </div>
  );
}
