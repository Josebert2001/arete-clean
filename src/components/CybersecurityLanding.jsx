import { ArrowRight, Shield, Flag, Terminal, Users, CheckCircle2 } from 'lucide-react';
import { SECURITY_SIGN_IN } from '../utils/learningEntry';
import { PREMIUM_PASS, FREE_CTF_ROOMS, formatNaira } from '../data/plans';

const topics = [
  ['01—04', 'Build your security foundations', 'The security mindset, encoding, classical ciphers, and hashing. Learn to question what you see and check whether data has changed.'],
  ['05—08', 'Understand passwords, networks, and the web', 'Work through password cracking puzzles, ports and protocols, HTTP evidence, and SQL injection examples.'],
  ['09—12', 'Investigate and defend', 'Read Linux command output, examine forensic evidence, spot phishing, and reason about firewall rules.'],
];

export const CYBERSECURITY_TITLE = 'Learn cybersecurity through practice | Areté';
export const CYBERSECURITY_DESCRIPTION = 'Start cybersecurity with 12 guided CTF rooms covering crypto, networking, web security, forensics, and phishing. Open to learners everywhere. Try a free sample.';

// Also rendered at build time: public content and CTAs work without a Router.
//
// `teamContact` is the live page's email link. It is passed in rather than
// written here so the address never lands in the prerendered HTML, which is
// what address harvesters read; a visitor with JS (everyone but a crawler —
// main.jsx replaces this markup on load) always gets the real link.
export default function CybersecurityLanding({ sample, teamContact }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="py-14 sm:py-20 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-rust mb-6"><Shield size={16} /> Areté · Cybersecurity</p>
          <h1 className="display-heading text-4xl sm:text-6xl text-ink leading-tight mb-6">Learn the thinking.<br /><span className="text-rust">Capture the flag.</span></h1>
          <p className="text-lg text-coffee-700 leading-relaxed max-w-xl mb-7">Build your cybersecurity foundations with guided puzzles in cryptography, web security, networks, and digital forensics. Start wherever you are. No university enrolment required.</p>
          <div className="flex flex-wrap gap-3">
            <a href={SECURITY_SIGN_IN} className="btn-primary">Start learning <ArrowRight size={16} /></a>
            <a href="#try-it" className="btn-ghost">Try an exercise first</a>
          </div>
          <p className="text-xs text-coffee-600 mt-4">Google or email sign-in · No card needed to start</p>
        </div>
        <div className="bg-ink text-cream rounded-2xl overflow-hidden border border-coffee-700">
          <div className="flex items-center justify-between gap-3 border-b border-cream/20 p-5 font-mono text-xs"><span className="flex items-center gap-2"><Terminal size={15} /> YOUR FIRST INVESTIGATION</span><Flag size={16} /></div>
          <div className="p-6 sm:p-8">
            <p className="text-coffee-300 font-mono text-xs mb-5">Observe → question → investigate → explain</p>
            <p className="font-display text-2xl mb-4">A familiar name.<br />An unfamiliar sender.</p>
            <p className="text-cream/80 leading-relaxed mb-6">An email says your account will be closed. Before you click, which piece of evidence deserves a closer look?</p>
            <a href="#try-it" className="inline-flex items-center gap-2 text-sm text-cream underline underline-offset-4">Examine the message <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <div className="border-y border-coffee-200 py-5 flex flex-wrap gap-x-10 gap-y-3 text-sm text-coffee-700">
        <span><strong className="text-ink">12</strong> introductory CTF rooms</span>
        <span>Browser puzzles · No lab installation</span>
        <span>Hints, quizzes, and explanations</span>
      </div>

      <section id="try-it" className="py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-rust mb-3">A two-minute sample · No account needed</p>
          <h2 className="display-heading text-3xl sm:text-4xl text-ink mb-4">Would you trust this message?</h2>
          <p className="text-coffee-700 leading-relaxed">This fictional email is a practice example. Inspect the sender and request, then decide what you would do next.</p>
        </div>
        {sample || <div className="bg-paper border border-coffee-200 rounded-xl p-6"><p className="font-mono text-sm break-all">From: Areté Support &lt;help@arete-account-check.example&gt;</p><p className="mt-3 text-coffee-700">“Your account closes today. Reply with your sign-in link to keep access.”</p><details className="mt-5"><summary className="cursor-pointer font-semibold text-ink">Reveal the reasoning</summary><p className="mt-3 text-coffee-700">The display name does not establish identity, and a sign-in link can grant account access. Do not reply with it. Open the service through your saved address and verify through its official support channel.</p></details><a href={SECURITY_SIGN_IN} className="btn-primary mt-6">Explore the security rooms <ArrowRight size={15} /></a></div>}
      </section>

      <section className="pb-14 sm:pb-20">
        <h2 className="display-heading text-3xl sm:text-4xl text-ink mb-8">A route through the fundamentals</h2>
        <div className="border-t border-coffee-200">{topics.map(([rooms, title, body]) => <div key={rooms} className="grid sm:grid-cols-[100px_1fr] gap-3 sm:gap-8 py-7 border-b border-coffee-200"><span className="font-mono text-sm text-rust">Rooms {rooms}</span><div><h3 className="font-display text-xl font-bold text-ink mb-2">{title}</h3><p className="text-coffee-700 leading-relaxed max-w-2xl">{body}</p></div></div>)}</div>
        <p className="text-sm text-coffee-600 mt-5">These are introductory puzzles using prepared examples and evidence. Completion tracks your personal practice; it is not a professional certification.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 pb-14 sm:pb-20">
        <div className="bg-paper border border-coffee-200 rounded-2xl p-6 sm:p-8">
          <Flag size={23} className="text-rust mb-5" />
          <h2 className="font-display text-2xl font-bold text-ink mb-3">Start as a learner</h2>
          <p className="text-coffee-700 leading-relaxed mb-5">The first {FREE_CTF_ROOMS} challenges are included in the free plan. Every room has theory and practice questions. Premium adds the remaining challenges and lifts personal daily allowances.</p>
          <p className="flex items-center gap-2 text-sm text-coffee-700 mb-5"><CheckCircle2 size={16} className="text-moss shrink-0" /> {formatNaira(PREMIUM_PASS.priceKobo)} for {PREMIUM_PASS.durationDays} days · One-time payment</p>
          <a href={SECURITY_SIGN_IN} className="btn-primary">Create your free account <ArrowRight size={15} /></a>
          <a href="/premium" className="block mt-4 text-sm text-coffee-700 underline underline-offset-4">Check Premium availability and allowances</a>
        </div>
        <div id="teams" className="bg-moss/5 border border-moss/30 rounded-2xl p-6 sm:p-8 scroll-mt-24">
          <Users size={23} className="text-moss mb-5" />
          <p className="text-xs font-mono uppercase tracking-widest text-moss mb-2">For educators and organizations</p>
          <h2 className="font-display text-2xl font-bold text-ink mb-3">Shape a training pilot with us</h2>
          <p className="text-coffee-700 leading-relaxed mb-5">Tell us who you want to train, the skills they need, and your timeline. We can discuss whether the current learning content fits a small pilot and agree its scope together.</p>
          <p className="text-sm text-coffee-600 mb-6">Team administration and verified assessment reports are planned. They are not included in the current learner plan.</p>
          {teamContact || <a className="btn-ghost" href="/privacy">Contact us to discuss a team pilot <ArrowRight size={15} /></a>}
        </div>
      </section>

      <section className="border-t border-coffee-200 pt-8 text-sm text-coffee-700 flex flex-wrap justify-between gap-4">
        <p>Studying at UniUyo? Your course hub is here too.</p>
        <a href="/courses" className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">Explore university courses <ArrowRight size={14} /></a>
      </section>
    </div>
  );
}
