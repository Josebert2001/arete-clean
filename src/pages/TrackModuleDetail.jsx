import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, Lightbulb, Rocket, Clock, Download,
  ChevronDown, PencilLine, Target, ListChecks,
} from 'lucide-react';
import { useTrack } from '../data/useTrack';
import { useProgress } from '../components/useProgress';
import { useMissionNotes, useGuidanceMode } from '../components/useMissionNotes';
import { useAuth } from '../context/AuthContext';
import CodeBlock from '../components/CodeBlock';
import CodePlayground from '../components/CodePlayground';
import FlagChallenge from '../components/FlagChallenge';
import Quiz from '../components/Quiz';
import Diagram from '../components/Diagram';
import ExplainSelection from '../components/ExplainSelection';
import Breadcrumbs from '../components/Breadcrumbs';
import UpgradePrompt from '../components/UpgradePrompt';
import { usePlan } from '../context/PlanContext';
import { FREE_CTF_ROOMS } from '../data/plans';
import { usePageTitle } from '../utils/usePageTitle';
import {
  GUIDANCE_MODES, buildMissionSteps, visibleSteps, countableSteps, stepId,
  levelLabel, timeLabel, proofLines, kindLabel, buildWriteup, NOTE_MAX_CHARS,
} from '../utils/missionSteps';

// Step ticks get their own user_progress row (like lecture-note reading), so
// they sync across devices with no migration and never touch a track's own
// completedModules — which the dashboards and the tutor read as "modules done".
const STEPS_STORAGE_KEY = 'mission-steps-v1';

const PLAYGROUND_TIP = {
  java:   'Change a value and run again. Cause an error on purpose — error messages are how you learn to debug.',
  python: 'Change a value and run again. Break it intentionally — Python\'s error messages tell you exactly what went wrong.',
  c:      'Edit the code and click Run. C errors can be cryptic — read them carefully: they give the line number and the fault.',
};

// Folded content for "Some guidance": the learner sees that help exists and
// chooses when to open it.
function Reveal({ label, forceOpen, children }) {
  const [open, setOpen] = useState(false);
  if (forceOpen || open) return children;
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-coffee-300 px-3 py-2 text-sm font-medium text-coffee-700 hover:border-coffee-500 hover:text-ink"
    >
      <Lightbulb size={15} /> {label}
    </button>
  );
}

function StepNote({ stepKey, prompt, value, onChange }) {
  const [open, setOpen] = useState(Boolean(value));
  const id = `note-${stepKey}`;
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-coffee-700 hover:text-ink"
      >
        <PencilLine size={14} /> Add a note for your write-up
      </button>
    );
  }
  return (
    <div className="mt-5">
      <label htmlFor={id} className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
        <PencilLine size={14} /> {prompt}
      </label>
      <textarea
        id={id}
        rows={3}
        maxLength={NOTE_MAX_CHARS}
        value={value}
        onChange={event => onChange(stepKey, event.target.value)}
        aria-describedby={`${id}-hint`}
        className="w-full rounded-lg border border-coffee-300 bg-paper p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-moss"
      />
      <p id={`${id}-hint`} className="mt-1 text-xs text-coffee-600">
        In your own words. Saved on this device and added to your write-up.
      </p>
    </div>
  );
}

function downloadText(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function TrackModuleDetail() {
  const { lang, id } = useParams();
  const { track, status } = useTrack(lang);
  const { user } = useAuth();

  const mod = useMemo(() => track?.getModuleById(id), [track, id]);
  const { isComplete, markComplete, markIncomplete, setQuizScore, progress } = useProgress(track?.storageKey);
  const stepProgress = useProgress(STEPS_STORAGE_KEY);
  const { notes, setNote } = useMissionNotes(user?.id, mod?.id);
  const [mode, setMode] = useGuidanceMode();
  const [justCompleted, setJustCompleted] = useState(false);
  const { gatesActive } = usePlan();

  const allSteps = useMemo(() => buildMissionSteps(mod), [mod]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, lang]);

  usePageTitle(track && mod ? `${mod.title} · ${track.label}` : 'Module not found');

  if (status === 'loading') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse" role="status" aria-label="Loading module">
        <div className="h-4 w-56 bg-coffee-100 rounded mb-8" />
        <div className="h-12 w-2/3 bg-coffee-100 rounded mb-4" />
        <div className="h-4 w-1/2 bg-coffee-100 rounded mb-10" />
        <div className="h-72 bg-coffee-100 rounded-xl" />
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  if (!track || !mod) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="display-heading text-3xl text-ink mb-4">Module not found</h1>
        <Link to="/lab" className="btn-ghost mx-auto">← Code Lab</Link>
      </div>
    );
  }

  const currentIndex = track.modules.findIndex(m => m.id === id);
  const prev = track.modules[currentIndex - 1];
  const next = track.modules[currentIndex + 1];
  const done = isComplete(mod.id);
  // Free tier: the first FREE_CTF_ROOMS rooms keep their flag challenge; later
  // rooms keep theory and practice but the challenge needs Premium. A room the
  // student already solved stays open — they earned it before the lock.
  const challengeLocked = Boolean(mod.challenge) && gatesActive && currentIndex >= FREE_CTF_ROOMS && !done;

  const steps = visibleSteps(allSteps, mode);
  const counted = countableSteps(steps);
  const stepDone = (key) => stepProgress.isComplete(stepId(mod.id, key));
  const doneCount = counted.filter(step => stepDone(step.key)).length;
  const percent = counted.length ? Math.round((doneCount / counted.length) * 100) : 0;
  const guided = mode === 'guided';
  const quizScore = progress.quizScores[mod.id] || null;
  const partLabel = track.slug === 'security' ? 'Room' : 'Part';

  const toggleStep = (key) => {
    const fullId = stepId(mod.id, key);
    if (stepProgress.isComplete(fullId)) stepProgress.markIncomplete(fullId);
    else stepProgress.markComplete(fullId);
  };
  const completeModule = () => {
    if (done) return;
    markComplete(mod.id);
    setJustCompleted(true);
    setTimeout(() => setJustCompleted(false), 600);
  };

  const writeup = () => buildWriteup({
    track, mod, steps: allSteps, notes, quizScore, completed: done,
    doneKeys: allSteps.filter(step => stepDone(step.key)).map(step => step.key),
  });

  const facts = [
    { label: 'Level', value: levelLabel(mod.difficulty) },
    { label: 'Time', value: timeLabel(mod.estimatedHours) },
    { label: 'Cost', value: challengeLocked ? 'Free · flag needs Premium' : 'Free' },
    { label: 'Runs in', value: 'Your browser' },
  ];

  const renderBody = (step) => {
    switch (step.kind) {
      case 'brief':
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-coffee-200 bg-paper p-5">
              <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-ink">
                <Target size={16} className="text-coffee-500" /> You will cover
              </h3>
              <ul className="space-y-2 text-sm text-coffee-700">
                {mod.theory.map(section => (
                  <li key={section.heading} className="flex gap-2"><span className="text-coffee-500">•</span>{section.heading}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-coffee-200 bg-paper p-5">
              <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-ink">
                <ListChecks size={16} className="text-coffee-500" /> You will prove it by
              </h3>
              <ul className="space-y-2 text-sm text-coffee-700">
                {proofLines(mod).map(line => (
                  <li key={line} className="flex gap-2"><span className="text-coffee-500">•</span>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'learn':
        return (
          <Reveal label="Show the explanation" forceOpen={guided}>
            <ExplainSelection context={{ courseCode: track.label, courseTitle: mod.title }}>
              <div className="rounded-xl border border-coffee-200 bg-paper p-6">
                <p className="text-reading text-coffee-700">{step.section.body}</p>
                {step.section.diagram && <Diagram name={step.section.diagram} />}
              </div>
            </ExplainSelection>
          </Reveal>
        );

      case 'code':
        return (
          <div className="space-y-8">
            {mod.codeExamples.map((ex, i) => (
              <div key={ex.title}>
                <h3 className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <span className="font-mono text-sm text-coffee-500">{String(i + 1).padStart(2, '0')}</span>
                  {ex.title}
                </h3>
                <CodeBlock code={ex.code} language={ex.language || track.language} />
                <div className="mt-2">
                  <Reveal label="Show what's happening" forceOpen={guided}>
                    <div className="rounded-r-lg border-l-[3px] border-coffee-500 bg-coffee-50 p-4">
                      <p className="text-sm leading-relaxed text-coffee-700">
                        <span className="font-bold text-ink">What's happening: </span>
                        {ex.explanation}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        );

      case 'try':
        return (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-coffee-700">
              Edit the code below and hit <span className="font-semibold text-ink">Run</span>. Break it, change it,
              experiment — reading code teaches you less than running it.
            </p>
            <CodePlayground initialCode={mod.playground} language={track.language} />
            <div className="rounded-lg bg-coffee-50 p-4 text-sm text-coffee-700">
              <span className="font-bold text-ink">Tip: </span>
              {PLAYGROUND_TIP[track.language] || PLAYGROUND_TIP.java}
            </div>
          </div>
        );

      case 'check':
        return (
          <Quiz
            questions={mod.practiceQuestions}
            moduleId={mod.id}
            onComplete={(score, total) => {
              setQuizScore(mod.id, score, total);
              stepProgress.markComplete(stepId(mod.id, 'check'));
            }}
          />
        );

      case 'flag':
        return challengeLocked ? (
          <UpgradePrompt title={`Room ${currentIndex + 1}'s challenge is part of Premium`}>
            The theory and practice questions for this room are free. Capturing the flag in rooms
            {' '}{FREE_CTF_ROOMS + 1}–{track.modules.length} comes with Premium, along with higher daily AI allowances.
          </UpgradePrompt>
        ) : (
          <FlagChallenge
            challenge={mod.challenge}
            moduleId={mod.id}
            onSolve={() => {
              stepProgress.markComplete(stepId(mod.id, 'flag'));
              completeModule();
            }}
          />
        );

      case 'build':
        return (
          <div>
            <div className="mb-6 rounded-xl bg-ink p-8 text-cream">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ember-400">
                <Rocket size={14} /> {mod.challenge ? 'Go further' : 'Build it yourself'}
              </div>
              <h3 className="display-heading mb-4 text-2xl">{mod.miniProject.title}</h3>
              <p className="leading-relaxed text-cream/90">{mod.miniProject.description}</p>
            </div>
            {mode !== 'solo' && (
              <Reveal label={`Show ${mod.miniProject.hints.length} hints`} forceOpen={guided}>
                <div className="rounded-xl border border-coffee-200 bg-paper p-6">
                  <h4 className="mb-4 flex items-center gap-2 font-display font-bold text-ink">
                    <Lightbulb size={18} className="text-coffee-500" /> Hints to get started
                  </h4>
                  <ul className="space-y-3">
                    {mod.miniProject.hints.map((hint, i) => (
                      <li key={hint} className="flex gap-3 text-sm text-coffee-700">
                        <span className="flex-shrink-0 font-mono text-coffee-500">{i + 1}.</span>
                        <span className="leading-relaxed">{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            <div className="mt-6 rounded-lg bg-coffee-50 p-4 text-sm text-coffee-700">
              <span className="font-bold text-ink">Stuck? </span>
              Ask the <Link to="/tutor" className="underline hover:text-ink">AI Tutor</Link>
              {' '}— or paste your code into the <Link to="/explainer" className="underline hover:text-ink">Code Explainer</Link>.
            </div>
          </div>
        );

      case 'wrap':
        return (
          <div className="rounded-xl border border-coffee-200 bg-paper p-6">
            <p className="mb-4 text-sm leading-relaxed text-coffee-700">
              {doneCount === counted.length
                ? 'Every step is ticked. Mark the module complete and keep your write-up — it is your record of the work.'
                : `${doneCount} of ${counted.length} steps ticked. You can mark the module complete now, or go back and finish the rest first.`}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => (done ? markIncomplete(mod.id) : completeModule())}
                className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                  done ? 'border-moss bg-moss/10 text-moss' : 'border-coffee-200 text-coffee-700 hover:border-coffee-500'
                } ${justCompleted ? 'complete-pulse' : ''}`}
              >
                {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                {done ? 'Completed' : 'Mark as complete'}
              </button>
              <button
                type="button"
                onClick={() => downloadText(`arete-${mod.id}.md`, writeup())}
                className="btn-ghost"
              >
                <Download size={16} /> Download my write-up
              </button>
            </div>
            <p className="mt-3 text-xs text-coffee-600">
              The write-up lists the steps you ticked, your notes and your practice score. It is your own record, not a certificate.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const notePrompt = {
    brief: 'Why are you doing this module?',
    learn: 'What did this teach you?',
    code: 'Which line surprised you, and why?',
    try: 'What did you change, and what happened?',
    flag: 'How did you find the flag?',
    build: 'What did you build, and what was hard?',
    wrap: 'What would you tell someone starting this module?',
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Code Lab', to: '/lab' },
        { label: `${track.label} modules`, to: track.listPath },
        { label: `${partLabel} ${String(mod.number).padStart(2, '0')}` },
      ]} />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
        <div className="min-w-0">
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className={`rounded px-2 py-0.5 font-mono text-xs ${track.accentBg} ${track.accentText}`}>
                {track.label}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-coffee-700">
                {partLabel} {mod.number} of {track.modules.length}
              </span>
              {done && (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-moss">
                  <CheckCircle2 size={13} /> Completed
                </span>
              )}
            </div>
            <h1 className="display-heading mb-2 text-4xl text-ink sm:text-5xl">{mod.title}</h1>
            <p className="text-lg text-coffee-700">{mod.subtitle}</p>
          </div>

          {/* Facts */}
          <dl className="mb-8 grid grid-cols-2 gap-3 border-y border-coffee-200 py-5 sm:grid-cols-4">
            {facts.map(fact => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-coffee-600">{fact.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {/* The path this module belongs to */}
          <details className="group mb-8 rounded-xl border border-coffee-200 bg-paper">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-medium text-ink">
              <span>
                This is {partLabel.toLowerCase()} {mod.number} of {track.modules.length} in the {track.label} path
                {prev ? <span className="text-coffee-700"> · follows “{prev.title}”</span> : null}
              </span>
              <ChevronDown size={16} className="flex-shrink-0 text-coffee-600 transition-transform group-open:rotate-180" />
            </summary>
            <ol className="border-t border-coffee-200 p-2">
              {track.modules.map(m => (
                <li key={m.id}>
                  {m.id === mod.id ? (
                    <span aria-current="step" className="flex items-center gap-3 rounded-lg bg-coffee-100 px-3 py-2 text-sm font-semibold text-ink">
                      <span className="w-6 font-mono text-xs text-coffee-600">{String(m.number).padStart(2, '0')}</span>
                      {m.title} <span className="font-mono text-[11px] uppercase text-coffee-600">You are here</span>
                    </span>
                  ) : (
                    <Link to={track.detailPath(m.id)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-coffee-700 hover:bg-coffee-50 hover:text-ink">
                      <span className="w-6 font-mono text-xs text-coffee-600">{String(m.number).padStart(2, '0')}</span>
                      <span className="flex-1">{m.title}</span>
                      {isComplete(m.id) && <CheckCircle2 size={14} className="text-moss" aria-label="Completed" />}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </details>

          {/* Guidance level */}
          <fieldset className="mb-10">
            <legend className="mb-3 font-display text-lg font-bold text-ink">How much guidance do you want?</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {GUIDANCE_MODES.map(option => (
                <label
                  key={option.key}
                  className={`cursor-pointer rounded-xl border-2 p-4 transition-colors ${
                    mode === option.key ? 'border-ink bg-paper' : 'border-coffee-200 hover:border-coffee-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="guidance"
                    value={option.key}
                    checked={mode === option.key}
                    onChange={() => setMode(option.key)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-semibold text-ink">{option.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-coffee-700">{option.blurb}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Progress — in the rail on wide screens, inline here on small ones */}
          <div className="mb-8 lg:hidden">
            <div className="mb-1 flex items-center justify-between text-xs text-coffee-700">
              <span className="font-mono uppercase tracking-wider">Your progress</span>
              <span>{doneCount} of {counted.length} steps</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-coffee-100">
              <div className={`h-full transition-all duration-500 ${track.dotColor}`} style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const ticked = stepDone(step.key);
              const tickable = step.kind !== 'brief' && step.kind !== 'wrap';
              return (
                <section key={step.key} id={`step-${step.key}`} aria-labelledby={`step-${step.key}-title`} className="scroll-mt-28">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 font-mono text-xs uppercase tracking-wider text-coffee-600">
                        Step {index} · {kindLabel(step.kind)}
                      </p>
                      <h2 id={`step-${step.key}-title`} className="font-display text-2xl font-bold text-ink">{step.title}</h2>
                    </div>
                    {tickable && (
                      <button
                        type="button"
                        onClick={() => toggleStep(step.key)}
                        aria-pressed={ticked}
                        className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                          ticked ? 'border-moss bg-moss/10 text-moss' : 'border-coffee-200 text-coffee-700 hover:border-coffee-500'
                        }`}
                      >
                        {ticked ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                        {ticked ? 'Done' : 'Mark done'}
                      </button>
                    )}
                  </div>
                  {renderBody(step)}
                  {notePrompt[step.kind] && (
                    <StepNote
                      key={`${mod.id}-${step.key}`}
                      stepKey={step.key}
                      prompt={notePrompt[step.kind]}
                      value={notes[step.key] || ''}
                      onChange={setNote}
                    />
                  )}
                </section>
              );
            })}
          </div>

          {mode === 'solo' && (
            <p className="mt-10 rounded-lg bg-coffee-50 p-4 text-sm text-coffee-700">
              The explanations and worked examples are hidden in “On my own”. Switch to
              {' '}<button type="button" onClick={() => setMode('guided')} className="font-semibold text-ink underline">Step by step</button>
              {' '}any time — your ticks and notes stay.
            </p>
          )}

          {/* Prev / Next */}
          <div className="mt-12 flex flex-col gap-4 border-t border-coffee-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <Link to={track.detailPath(prev.id)} className="btn-ghost flex-1 justify-center sm:flex-none">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">{prev.title}</span>
                <span className="sm:hidden">Prev</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={track.detailPath(next.id)} className="btn-primary flex-1 justify-center sm:flex-none">
                <span className="hidden sm:inline">Next: {next.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link to={track.listPath} className="btn-primary flex-1 justify-center sm:flex-none">
                Finish <CheckCircle2 size={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Step rail */}
        <aside className="hidden lg:block">
          <nav aria-label="Steps in this module" className="sticky top-28">
            <div className="mb-1 flex items-center justify-between text-xs text-coffee-700">
              <span className="font-mono uppercase tracking-wider">Steps</span>
              <span>{doneCount} of {counted.length}</span>
            </div>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-coffee-100">
              <div className={`h-full transition-all duration-500 ${track.dotColor}`} style={{ width: `${percent}%` }} />
            </div>
            <ol className="space-y-0.5">
              {steps.map((step, index) => (
                <li key={step.key}>
                  <a
                    href={`#step-${step.key}`}
                    className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm text-coffee-700 hover:bg-coffee-100 hover:text-ink"
                  >
                    {stepDone(step.key)
                      ? <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-moss" />
                      : <span className="mt-0.5 w-[15px] flex-shrink-0 text-center font-mono text-[11px] text-coffee-500">{index}</span>}
                    <span className="leading-snug">{step.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-coffee-600">
              <Clock size={12} /> {timeLabel(mod.estimatedHours)}
            </p>
          </nav>
        </aside>
      </div>
    </div>
  );
}
