import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Code2, CheckSquare, Rocket, CheckCircle2, Circle, Lightbulb, Play } from 'lucide-react';
import { getTrack } from '../data/trackConfig';
import { useProgress } from '../components/useProgress';
import CodeBlock from '../components/CodeBlock';
import CodePlayground from '../components/CodePlayground';
import Quiz from '../components/Quiz';

export default function TrackModuleDetail() {
  const { lang, id } = useParams();
  const track = getTrack(lang);
  const [tab, setTab] = useState('theory');

  const mod = useMemo(() => track?.getModuleById(id), [track, id]);
  const { isComplete, markComplete, markIncomplete, setQuizScore } = useProgress(track?.storageKey);

  useEffect(() => {
    setTab('theory');
    window.scrollTo(0, 0);
  }, [id, lang]);

  if (!track || !mod) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="display-heading text-3xl text-ink mb-4">Module not found</h1>
        <Link to="/tracks" className="btn-ghost mx-auto">← Language Tracks</Link>
      </div>
    );
  }

  const currentIndex = track.modules.findIndex(m => m.id === id);
  const prev = track.modules[currentIndex - 1];
  const next = track.modules[currentIndex + 1];
  const done = isComplete(mod.id);

  const tabs = [
    { key: 'theory',     label: 'Theory',       icon: BookOpen },
    { key: 'code',       label: 'Code Examples', icon: Code2 },
    { key: 'playground', label: 'Try It',        icon: Play },
    { key: 'quiz',       label: 'Practice',      icon: CheckSquare },
    { key: 'project',    label: 'Mini Project',  icon: Rocket },
  ];

  const playgroundTip = {
    java:   'Try changing a value and running again. Cause an error on purpose — error messages are how you learn to debug.',
    python: 'Change a value and run again. Try breaking it intentionally — Python\'s error messages tell you exactly what went wrong.',
    c:      'Edit the code and click Run. C errors can be cryptic — read them carefully: they show you the line number and what\'s wrong.',
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <Link
        to={track.listPath}
        className="inline-flex items-center gap-1.5 text-sm text-coffee-700 hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> {track.label} modules
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${track.accentBg} ${track.accentText}`}>
            {track.label}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-coffee-700">
            Module {String(mod.number).padStart(2, '0')}
          </span>
          <span className="text-xs font-mono text-coffee-700">
            {'●'.repeat(mod.difficulty)}{'○'.repeat(5 - mod.difficulty)}
          </span>
          <span className="text-xs text-coffee-700">~{mod.estimatedHours} hours</span>
        </div>
        <h1 className="display-heading text-4xl sm:text-5xl text-ink mb-2">{mod.title}</h1>
        <p className="text-lg text-coffee-700">{mod.subtitle}</p>
      </div>

      {/* Mark complete button */}
      <button
        onClick={() => done ? markIncomplete(mod.id) : markComplete(mod.id)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium mb-8 transition-all ${
          done
            ? 'border-moss bg-moss/10 text-moss'
            : 'border-coffee-200 text-coffee-700 hover:border-coffee-500'
        }`}
      >
        {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
        {done ? 'Completed' : 'Mark as complete'}
      </button>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-coffee-200 pb-3">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              tab === t.key ? 'tab-active' : 'tab-inactive'
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[300px]">

        {tab === 'theory' && (
          <div className="space-y-6 animate-fade-in">
            {mod.theory.map((section, i) => (
              <div key={i} className="bg-paper border border-coffee-200 rounded-xl p-6">
                <h3 className="font-display text-xl font-bold text-ink mb-3">{section.heading}</h3>
                <p className="text-coffee-700 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'code' && (
          <div className="space-y-8 animate-fade-in">
            {mod.codeExamples.map((ex, i) => (
              <div key={i}>
                <h3 className="font-display text-lg font-bold text-ink mb-1 flex items-center gap-2">
                  <span className="text-coffee-400 font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                  {ex.title}
                </h3>
                <CodeBlock code={ex.code} />
                <div className="bg-coffee-50 rounded-r-lg p-4 mt-2" style={{ borderLeft: '3px solid #8E5A1F' }}>
                  <p className="text-sm text-coffee-700 leading-relaxed">
                    <span className="font-bold text-ink">What's happening: </span>
                    {ex.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'playground' && (
          <div className="animate-fade-in space-y-4">
            <div className="bg-paper border border-coffee-200 rounded-xl p-5">
              <h3 className="font-display text-lg font-bold text-ink mb-1">
                Write and run {track.label}, right here
              </h3>
              <p className="text-sm text-coffee-700 leading-relaxed">
                Edit the code below and hit <span className="font-semibold text-ink">Run</span> to execute it.
                Break it, change it, experiment — that's how you learn. This is the most important tab in the module.
              </p>
            </div>
            <CodePlayground
              initialCode={mod.playground || mod.codeExamples[0]?.code || ''}
              language={track.language}
            />
            <div className="p-4 bg-coffee-50 rounded-lg text-sm text-coffee-700">
              <span className="font-bold text-ink">Tip: </span>
              {playgroundTip[track.language] || playgroundTip.java}
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="animate-fade-in">
            <Quiz
              questions={mod.practiceQuestions}
              moduleId={mod.id}
              onComplete={(score, total) => setQuizScore(mod.id, score, total)}
            />
          </div>
        )}

        {tab === 'project' && (
          <div className="animate-fade-in">
            <div className="bg-ink text-cream rounded-xl p-8 mb-6">
              <div className="flex items-center gap-2 text-ember-400 text-xs font-mono uppercase tracking-wider mb-3">
                <Rocket size={14} /> Build it yourself
              </div>
              <h3 className="display-heading text-2xl mb-4">{mod.miniProject.title}</h3>
              <p className="text-cream/90 leading-relaxed">{mod.miniProject.description}</p>
            </div>

            <div className="bg-paper border border-coffee-200 rounded-xl p-6">
              <h4 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-coffee-500" /> Hints to get started
              </h4>
              <ul className="space-y-3">
                {mod.miniProject.hints.map((hint, i) => (
                  <li key={i} className="flex gap-3 text-sm text-coffee-700">
                    <span className="font-mono text-coffee-400 flex-shrink-0">{i + 1}.</span>
                    <span className="leading-relaxed">{hint}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 bg-coffee-50 rounded-lg text-sm text-coffee-700">
              <span className="font-bold text-ink">Stuck? </span>
              Head to the{' '}
              <Link to="/tutor" className="underline hover:text-ink">AI Tutor</Link>
              {' '}and ask for help — or paste your code in the{' '}
              <Link to="/explainer" className="underline hover:text-ink">Code Explainer</Link>.
            </div>
          </div>
        )}
      </div>

      {/* Prev / Next nav */}
      <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-coffee-200">
        {prev ? (
          <Link to={track.detailPath(prev.id)} className="btn-ghost flex-1 sm:flex-none justify-center">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">{prev.title}</span>
            <span className="sm:hidden">Prev</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={track.detailPath(next.id)} className="btn-primary flex-1 sm:flex-none justify-center">
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Link to={track.listPath} className="btn-primary flex-1 sm:flex-none justify-center">
            Finish <CheckCircle2 size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
