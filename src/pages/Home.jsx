import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { modules } from '../data/modules';
import { useProgress } from '../components/useProgress';

export default function Home() {
  const { progress, isComplete } = useProgress();
  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div>
      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 animate-fade-up">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-coffee-100 border border-coffee-200 rounded-full text-xs font-medium text-coffee-700 mb-6">
              <Sparkles size={12} />
              <span>Java Track · 13 modules · COS 222 & beyond</span>
            </div>

            {/* Name + tagline */}
            <div className="flex items-baseline gap-4 mb-4">
              <h1 className="display-heading text-7xl sm:text-8xl text-ink tracking-tight">Arete</h1>
              <span className="font-display text-lg text-coffee-600 italic hidden sm:inline">ἀρετή</span>
            </div>

            <p className="display-heading text-2xl sm:text-3xl text-coffee-700 mb-3 leading-snug">
              Code your <span className="underline-sketch text-ink">excellence.</span>
            </p>

            <p className="text-lg text-coffee-700 mb-8 max-w-xl leading-relaxed">
              The ancient Greeks believed excellence isn't a gift — it's earned through daily practice and discipline. So is coding.
              13 Java modules, built for students who want to learn it properly. No shortcuts.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/modules" className="btn-primary">
                Start Learning <ArrowRight size={16} />
              </Link>
              <Link to="/install" className="btn-ghost">
                Install Java first
              </Link>
            </div>

            {/* Greek etymology note */}
            <p className="text-xs text-coffee-600 mt-6 font-display italic">
              ἀρετή (ar-eh-TAY) · Greek · "excellence achieved through practice"
            </p>
          </div>

          {/* Hero code card */}
          <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="relative">
              <div className="bg-ink text-cream p-8 rounded-2xl shadow-xl relative overflow-hidden">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rust/60" />
                    <span className="w-3 h-3 rounded-full bg-coffee-400/60" />
                    <span className="w-3 h-3 rounded-full bg-moss/60" />
                  </div>
                  <span className="text-xs font-mono text-coffee-400 tracking-widest">Excellence.java</span>
                </div>

                {/* Steam above the code */}
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

              {/* Sticky note */}
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

      {/* PROGRESS STRIP */}
      {completedCount > 0 && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="bg-cream border border-coffee-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-1">Your Progress</div>
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

      {/* WHAT'S INSIDE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-8 mb-12">
          <h2 className="display-heading text-4xl sm:text-5xl text-ink shrink-0">What's inside</h2>
          <div className="h-px flex-1 bg-coffee-200" />
        </div>

        <div className="border-t border-coffee-200">
          {[
            { num: '01', title: '13 Modules', body: 'Foundations → OOP → JDBC → Swing GUI. Every core Java concept, sequenced the way you need to learn it.' },
            { num: '02', title: 'Run Real Code', body: 'Write and execute Java in your browser, every module. No local setup, no friction.' },
            { num: '03', title: 'Practice Quizzes', body: 'Test your understanding after each module before advancing. Repetition is how this works.' },
            { num: '04', title: 'AI Tutor', body: "Ask any Java question. When the examples aren't clicking, the tutor fills the gap." },
          ].map((f, i) => (
            <div key={i} className="py-7 border-b border-coffee-200 flex gap-5 group">
              <span className="font-mono text-xs text-coffee-400 tabular-nums pt-1.5 w-6 shrink-0">{f.num}</span>
              <div className="flex-1 sm:flex sm:items-baseline sm:gap-12">
                <h3 className="display-heading text-2xl text-ink group-hover:text-coffee-600 transition-colors duration-200 mb-1 sm:mb-0 sm:w-48 shrink-0">{f.title}</h3>
                <p className="text-coffee-700 leading-relaxed text-sm sm:text-base">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="display-heading text-4xl text-ink">13 modules. One language. Zero shortcuts.</h2>
          <Link to="/modules" className="text-sm font-medium text-coffee-700 hover:text-ink hidden sm:inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
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
            See all 13 modules <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none" aria-hidden>
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
              to="/modules"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink border-b border-ink/25 hover:text-coffee-700 hover:border-coffee-700 transition-all pb-0.5"
            >
              Start Module 1 <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
