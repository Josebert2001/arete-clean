import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Code2, Terminal, Coffee } from 'lucide-react';
import { modules } from '../data/modules';
import { trackConfig } from '../data/trackConfig';
import { useProgress } from '../components/useProgress';

const trackHighlights = [
  {
    slug: 'java',
    icon: Coffee,
    color: 'bg-ink',
    text: 'text-cream',
    label: 'Java',
    tag: 'COS 222',
    count: 13,
    blurb: 'OOP, collections, JDBC, Swing GUI — full interactive track.',
  },
  {
    slug: 'python',
    icon: Code2,
    color: 'bg-moss',
    text: 'text-cream',
    label: 'Python',
    tag: null,
    count: 12,
    blurb: 'From Hello World to OOP, files, and the standard library.',
  },
  {
    slug: 'c',
    icon: Terminal,
    color: 'bg-ember-500',
    text: 'text-cream',
    label: 'C',
    tag: 'COS 211',
    count: 12,
    blurb: 'Pointers, memory, structs — the language that explains how computers work.',
  },
];

function TrackProgressBar({ track }) {
  const { progress } = useProgress(trackConfig[track.slug].storageKey);
  const done = progress.completedModules.length;
  if (done === 0) return null;
  const pct = Math.round((done / track.count) * 100);
  return (
    <div className="mt-2">
      <div className="h-1 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/70 transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs mt-1 opacity-60">{done}/{track.count} done</p>
    </div>
  );
}

export default function Home() {
  const { progress, isComplete } = useProgress();
  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div>
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-6">
              <Sparkles size={12} />
              <span>Java · Python · C — 37 interactive modules</span>
            </div>

            {/* Name + tagline */}
            <div className="flex items-baseline gap-4 mb-4">
              <h1 className="display-heading text-5xl sm:text-7xl lg:text-8xl text-ink tracking-tight">Arete</h1>
              <span className="font-display text-lg text-coffee-600 italic hidden sm:inline">ἀρετή</span>
            </div>

            <p className="display-heading text-2xl sm:text-3xl text-coffee-700 mb-3 leading-snug">
              Code your <span className="underline-sketch text-ink">excellence.</span>
            </p>

            <p className="text-lg text-coffee-700 mb-8 max-w-xl leading-relaxed">
              The ancient Greeks believed excellence isn't a gift — it's earned through daily practice
              and discipline. So is coding. Three language tracks, built for students who want to
              learn properly. No shortcuts.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/tracks" className="btn-primary">
                Pick a language <ArrowRight size={16} />
              </Link>
              <Link to="/install" className="btn-ghost">
                Install Java first
              </Link>
            </div>

            <p className="text-xs text-coffee-600 mt-6 font-display italic">
              ἀρετή (ar-eh-TAY) · Greek · "excellence achieved through practice"
            </p>
          </div>

          {/* Hero code card */}
          <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="relative">
              <div className="bg-ink text-cream p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rust/60" />
                    <span className="w-3 h-3 rounded-full bg-coffee-400/60" />
                    <span className="w-3 h-3 rounded-full bg-moss/60" />
                  </div>
                  <span className="text-xs font-mono text-coffee-400 tracking-widest">Excellence.java</span>
                </div>

                <div className="flex gap-3 mb-4 opacity-50">
                  <span className="steam text-coffee-300 text-lg">∿</span>
                  <span className="steam text-coffee-300 text-lg" style={{ animationDelay: '0.4s' }}>∿</span>
                  <span className="steam text-coffee-300 text-lg" style={{ animationDelay: '0.8s' }}>∿</span>
                </div>

                <pre className="font-mono text-sm leading-relaxed">
{`public class Excellence {

  // Arete: excellence through practice

  public static void main(
      String[] args) {

    String motto = "No shortcuts.";
    int daysOfPractice = 0;

    while (!isExcellent()) {
      practice();
      daysOfPractice++;
    }

    System.out.println("Ready.");
  }
}`}
                </pre>

                <div className="mt-6 pt-4 border-t border-coffee-700 flex items-center justify-between text-xs text-coffee-400">
                  <span className="font-mono">$ javac Excellence.java</span>
                  <span className="text-ember-400">● Running</span>
                </div>
              </div>

              <div className="sticky-note absolute -bottom-5 -left-5 p-4 w-40 hidden sm:block">
                <p className="font-display text-sm text-ink leading-snug">
                  "Type every example. Don't copy-paste."
                </p>
                <p className="text-xs text-coffee-700 mt-1">— Rule #1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JAVA PROGRESS STRIP */}
      {completedCount > 0 && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="bg-cream border border-coffee-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-1">Java Progress</div>
              <div className="font-display text-2xl font-bold text-ink">
                {completedCount} of {modules.length} modules complete
              </div>
            </div>
            <div className="flex-1 max-w-md w-full">
              <div className="h-2 bg-coffee-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ember-500 transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-xs text-coffee-700 mt-2 text-right">{progressPercent}% — keep going</div>
            </div>
          </div>
        </section>
      )}

      {/* THREE TRACKS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-8 mb-10">
          <h2 className="display-heading text-4xl sm:text-5xl text-ink shrink-0">Three tracks.</h2>
          <div className="h-px flex-1 bg-coffee-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {trackHighlights.map(track => {
            const Icon = track.icon;
            return (
              <Link
                key={track.slug}
                to={trackConfig[track.slug].listPath}
                className={`${track.color} ${track.text} rounded-2xl p-6 group hover:opacity-90 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon size={24} className="opacity-80" />
                  <div className="flex items-center gap-2">
                    {track.tag && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/15">
                        {track.tag}
                      </span>
                    )}
                    <span className="text-xs font-mono opacity-60">{track.count} modules</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-2xl mb-1">{track.label}</h3>
                <p className="text-sm opacity-75 leading-relaxed mb-4">{track.blurb}</p>
                <TrackProgressBar track={track} />
                <div className="flex items-center gap-1.5 text-sm font-medium mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  Open track <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/tracks" className="btn-ghost">
            Compare all three tracks <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-8 mb-12">
          <h2 className="display-heading text-4xl sm:text-5xl text-ink shrink-0">What's inside</h2>
          <div className="h-px flex-1 bg-coffee-200" />
        </div>

        <div className="border-t border-coffee-200">
          {[
            { num: '01', title: '37 Modules', body: 'Java (13), Python (12), and C (12) — full interactive learning tracks. Theory, code examples, quizzes, playgrounds, and mini projects for every module.' },
            { num: '02', title: 'Run Real Code', body: 'Write and execute Java, Python, or C in your browser, every module. No local setup, no friction — just code and run.' },
            { num: '03', title: 'Practice Quizzes', body: 'Test your understanding after each module before advancing. 7 questions per module, with explanations for every answer.' },
            { num: '04', title: 'AI Tutor', body: "Ask any programming question. When the code examples aren't clicking, the tutor fills the gap." },
          ].map((f, i) => (
            <div key={i} className="py-7 border-b border-coffee-200 flex gap-5 group">
              <span className="font-mono text-xs text-coffee-400 tabular-nums pt-1.5 w-6 shrink-0">{f.num}</span>
              <div className="flex-1 sm:flex sm:items-baseline sm:gap-6 md:gap-12">
                <h3 className="display-heading text-2xl text-ink group-hover:text-coffee-600 transition-colors duration-200 mb-1 sm:mb-0 sm:w-48 shrink-0">{f.title}</h3>
                <p className="text-coffee-700 leading-relaxed text-sm sm:text-base">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JAVA MODULES PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="display-heading text-4xl text-ink">Java track preview.</h2>
          <Link to="/modules" className="text-sm font-medium text-coffee-700 hover:text-ink hidden sm:inline-flex items-center gap-1">
            All 13 modules <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.slice(0, 6).map(m => (
            <Link
              key={m.id}
              to={`/modules/${m.id}`}
              className="module-card bg-paper border border-coffee-200 rounded-xl p-5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-coffee-700">MODULE {String(m.number).padStart(2, '0')}</span>
                <span className="text-xs text-coffee-400">{'●'.repeat(m.difficulty)}{'○'.repeat(5 - m.difficulty)}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-1 group-hover:text-coffee-700 transition-colors">
                {m.title}
              </h3>
              <p className="text-sm text-coffee-700 mb-3">{m.subtitle}</p>
              <div className="flex items-center justify-between text-xs text-coffee-700">
                <span>~{m.estimatedHours} hours</span>
                {isComplete(m.id) && <CheckCircle2 size={14} className="text-moss" />}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/modules" className="btn-ghost">
            See all 13 Java modules <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden md:block" aria-hidden>
          <span className="display-heading leading-none text-coffee-100" style={{ fontSize: 'clamp(10rem, 22vw, 20rem)' }}>ἀ</span>
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="display-heading text-ink leading-none mb-1" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}>
            "Excellence is never
          </p>
          <p className="display-heading text-coffee-500 leading-none mb-1 italic" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)', paddingLeft: 'clamp(1.5rem, 4vw, 4rem)' }}>
            an accident.
          </p>
          <p className="display-heading text-ink leading-none mb-10" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)' }}>
            It is the result<br />of practice."
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-display text-sm text-coffee-600 italic">— Adapted from Aristotle</span>
            <div className="h-px bg-coffee-200 flex-1 min-w-12 max-w-32" />
            <Link
              to="/tracks"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink border-b border-ink/25 hover:text-coffee-700 hover:border-coffee-700 transition-all pb-0.5"
            >
              Pick your track <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
