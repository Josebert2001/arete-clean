import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Play, Sparkles, CheckCircle2 } from 'lucide-react';
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
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">What's inside</div>
          <h2 className="display-heading text-4xl text-ink">Everything you need to actually learn it</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: BookOpen, title: '13 Modules', body: 'Foundations → OOP → JDBC → Swing GUI. Every core Java concept.' },
            { icon: Play, title: 'Run Real Code', body: 'Write and run Java in your browser, every module. No setup needed.' },
            { icon: CheckCircle2, title: 'Practice Quizzes', body: 'Test yourself after each module before moving on.' },
            { icon: Brain, title: 'AI Tutor', body: 'Stuck? Ask any Java question and get a clear answer instantly.' },
          ].map((f, i) => (
            <div key={i} className="bg-paper border border-coffee-200 rounded-xl p-6 hover:border-coffee-500 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-coffee-100 flex items-center justify-center mb-4">
                <f.icon size={18} className="text-coffee-700" />
              </div>
              <h3 className="font-display font-bold text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-coffee-700 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODULES PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Java Track</div>
            <h2 className="display-heading text-4xl text-ink">13 modules. One language. Zero shortcuts.</h2>
          </div>
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
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-ink text-cream rounded-2xl p-10 sm:p-14 text-center">
          <p className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6">
            "Excellence is never an accident.<br/>
            <span className="text-coffee-300">It is the result of practice."</span>
          </p>
          <p className="text-coffee-400 text-sm mb-8">— Adapted from Aristotle</p>
          <Link to="/modules" className="inline-flex items-center gap-2 bg-cream text-ink px-6 py-3 rounded-lg font-bold hover:bg-coffee-100 transition-colors">
            Start Module 1 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
