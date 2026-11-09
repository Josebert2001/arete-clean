import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { useCareer } from './useCareer';
import { getCareerPath } from '../data/careers';

export default function CareerHomeCard() {
  const { profile } = useCareer();
  const chosen = getCareerPath(profile?.chosen_path);
  return <section className="bg-paper border border-moss/30 rounded-2xl p-6 sm:p-8 mb-8">
    <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-moss mb-3"><Compass size={16} /> Your career direction</p>
    <h2 className="font-display text-2xl text-ink mb-3">{chosen ? `Keep exploring ${chosen.name.toLowerCase()}` : 'Find the work you want to practise'}</h2>
    <p className="text-coffee-700 mb-5">{chosen ? `Your ${chosen.name.toLowerCase()} direction is saved. Continue your starter reflection and review your preparation topics.` : 'Compare blue team, red team, GRC, and application security through a discovery quiz and introductory evidence tasks.'}</p>
    <Link to="/career" className="btn-primary">{profile ? 'Open my career roadmap' : 'Find my career direction'} <ArrowRight size={15} /></Link>
    <p className="text-xs text-coffee-600 mt-4">Discovery and starter practice · Full assessed pathways and Linux labs are in development</p>
  </section>;
}
