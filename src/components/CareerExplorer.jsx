import { ArrowRight, Compass, Shield, Target } from 'lucide-react';
import { careerPaths, careerResources, ENTRY_PATHS } from '../data/careers';
import { CAREER_SIGN_IN } from '../utils/learningEntry';

export const CAREERS_TITLE = 'Find your cybersecurity career direction | Areté';
export const CAREERS_DESCRIPTION = 'Explore blue team, red team, GRC, application security, and future specialties. Discover a starting direction and try introductory evidence worksheets.';

// Shared by the interactive route and build-time prerender. No router/auth hooks.
export default function CareerExplorer({ signedIn = false }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 sm:py-20">
      <section className="max-w-3xl mb-12">
        <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rust mb-5"><Compass size={17} /> Your cybersecurity career starts with a direction</p>
        <h1 className="display-heading text-4xl sm:text-6xl text-ink mb-6">Find work you want<br /><span className="text-rust">to get good at.</span></h1>
        <p className="text-lg text-coffee-700 leading-relaxed mb-7">Explore defence, ethical testing, risk, and secure software. A 30-question discovery quiz compares your interests and practical judgment, then suggests a starting direction and preparation topics.</p>
        <div className="flex flex-wrap gap-3"><a href={signedIn ? '/career-quiz' : CAREER_SIGN_IN} className="btn-primary">Find my direction <ArrowRight size={16} /></a>{signedIn && <a href="/career" className="btn-ghost">My career roadmap</a>}</div>
        <p className="text-sm text-coffee-600 mt-4">About 12–18 minutes · No prior cybersecurity experience required · Change direction anytime</p>
      </section>
      <section className="bg-ink text-cream rounded-2xl p-6 sm:p-8 mb-12">
        <h2 className="font-display text-2xl mb-3">Discover → practise → reflect → decide your next step</h2>
        <p className="text-cream/80 leading-relaxed max-w-3xl">Career discovery and introductory evidence worksheets are the first release. Full assessed pathways, practitioner reviews, employer referrals, and browser Linux labs are in development. The quiz offers guidance, not a qualification or a promise of employment.</p>
      </section>
      <h2 className="display-heading text-3xl text-ink mb-6">Four starting directions</h2>
      <div className="grid sm:grid-cols-2 gap-5 mb-14">
        {careerPaths.filter(path => ENTRY_PATHS.includes(path.id)).map(path => <article key={path.id} className="bg-paper rounded-2xl border border-coffee-200 p-6 flex flex-col">
          <p className="text-xs font-mono uppercase tracking-widest text-rust mb-3">Starter practice available</p>
          <h3 className="font-display text-2xl text-ink mb-1">{path.name}</h3><p className="text-sm font-semibold text-coffee-600 mb-4">{path.subtitle}</p>
          <p className="text-coffee-700 mb-4">{path.description}</p><p className="text-sm text-coffee-600 mb-4">Directions to explore: {path.roles.join(' · ')}</p>
          <p className="text-xs font-semibold text-coffee-600 mb-2">Existing study resources</p><ul className="flex flex-wrap gap-x-4 gap-y-2 mb-5">{careerResources[path.id].map(([label, href]) => <li key={href}><a href={href} className="text-xs text-coffee-700 underline underline-offset-4">{label}</a></li>)}</ul>
          <a href={`/career/practice/${path.id}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ink underline underline-offset-4">Try {path.practice.toLowerCase()} <ArrowRight size={14} /></a>
        </article>)}
      </div>
      <h2 className="display-heading text-3xl text-ink mb-6">Where you could progress</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">{careerPaths.filter(path => !ENTRY_PATHS.includes(path.id)).map(path => <article key={path.id} className="border border-coffee-200 rounded-xl p-5">
        <p className="text-xs font-mono uppercase text-coffee-500 mb-2">Planned specialization</p><h3 className="font-display text-xl text-ink mb-2">{path.name}</h3><p className="text-sm text-coffee-700 mb-3">{path.description}</p><p className="text-xs text-coffee-600">Preparation: {path.preparation}</p>
      </article>)}</div>
      <section className="border-t border-coffee-200 pt-8 grid md:grid-cols-2 gap-8">
        <div><h2 className="flex items-center gap-2 font-display text-xl text-ink mb-3"><Shield size={19} /> What about grey or white hats?</h2><p className="text-sm text-coffee-700 leading-relaxed">Grey-box testing means working with partial system knowledge. Grey-hat describes behavior that may lack permission; it is not a placement category. White-hat or ethical work requires authorization. Learners interested in finding weaknesses can explore the red-team direction.</p></div>
        <div><h2 className="flex items-center gap-2 font-display text-xl text-ink mb-3"><Target size={19} /> Interested in both attack and defence?</h2><p className="text-sm text-coffee-700 leading-relaxed">Purple-team work connects controlled offensive testing with better detection and response. Explore blue and red foundations first; the purple specialization will require practical prerequisites before enrollment opens.</p></div>
      </section>
    </div>
  );
}
