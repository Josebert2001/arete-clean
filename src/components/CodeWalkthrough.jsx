import { useEffect, useState } from 'react';
import { Terminal, ChevronDown, PenLine, Sparkles, AlertTriangle } from 'lucide-react';
import CodeBlock from './CodeBlock';
import ExplainCode from './ExplainCode';
import RichText from './RichText';
import MathText from './MathText';
import { topicsWithCode } from '../utils/explainCode';

// The practicals, in order, with the code already explained.
//
// The lecture-notes tab is organised for reading the course: theory first, the
// twelve practicals from topic 10. That is the wrong shape for the night before
// a paper, when a student wants the programs — all of them, in order, explained
// — and then the questions that could be asked about each. This tab is that
// shape, and it is composed entirely from what already exists: the transcribed
// listings, their verified outputs, the note blocks, and the exam bank.
//
// The walkthroughs are shown inline rather than behind a button, which is only
// affordable because they are pre-generated (see
// scripts/pregenerate-explanations.mjs). Where a course has no generated file
// the button appears instead, so this tab degrades to the same behaviour as the
// notes rather than to an empty page.

const isListing = (s) => s?.type === 'code' && (s.language || 'python') !== 'output';
const isOutput = (s) => s?.type === 'code' && (s.language || 'python') === 'output';

// One listing: the pre-generated walkthrough if there is one, else the live
// button. Resolved on mount rather than on click — the whole point of this tab
// is that the explanation is already there.
function Walkthrough({ code, language, explainReady, explanations }) {
  const { getPregenerated, hasPregenerated } = explanations ?? {};
  const [text, setText] = useState(null);
  const [resolved, setResolved] = useState(!hasPregenerated);

  useEffect(() => {
    if (!hasPregenerated || !getPregenerated) return undefined;
    let cancelled = false;
    (async () => {
      const found = await getPregenerated(code, language, 'walkthrough');
      if (cancelled) return;
      setText(found);
      setResolved(true);
    })();
    return () => { cancelled = true; };
  }, [code, language, getPregenerated, hasPregenerated]);

  if (!resolved) {
    return (
      <div role="status" className="my-4 h-24 animate-pulse rounded-xl bg-coffee-100">
        <span className="sr-only">Loading the walkthrough…</span>
      </div>
    );
  }

  // Nothing generated for this listing — fall back to asking for it live.
  if (!text) {
    return (
      <ExplainCode
        code={code}
        language={language}
        ready={explainReady}
        {...(explanations ?? {})}
      />
    );
  }

  return (
    <div className="my-4 rounded-xl border border-coffee-200 bg-coffee-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles size={13} className="shrink-0 text-ember-500" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-coffee-600">
          Line by line
        </span>
      </div>
      <div className="text-reading text-ink">
        <RichText text={text} />
      </div>
    </div>
  );
}

function Practical({ topic, index, isOpen, onToggle, explainReady, explanations, examCount, onOpenExam }) {
  const sections = topic.sections ?? [];
  const brief = sections.find((s) => s.type === 'casestudy');
  const objective = sections.find((s) => s.type === 'bullets');
  const notes = sections.filter((s) => s.type === 'note');

  return (
    <div className="overflow-hidden rounded-xl border border-coffee-200 bg-paper">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-coffee-50"
      >
        <span className="w-6 shrink-0 font-mono text-xs tabular-nums text-coffee-400">{index + 1}</span>
        <span className="flex-1 font-display font-bold text-ink">{topic.title}</span>
        {examCount > 0 && (
          <span className="shrink-0 rounded-full bg-coffee-100 px-2 py-0.5 font-mono text-xs text-coffee-600">
            {examCount} Q
          </span>
        )}
        <ChevronDown
          size={16}
          className={`shrink-0 text-coffee-400 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-coffee-200 px-5 py-5">
          {/* The brief, so the listing is read against the problem it solves. */}
          {brief?.prompt && (
            <p className="mb-4 text-reading text-coffee-700"><MathText text={brief.prompt} /></p>
          )}
          {!brief && objective?.items?.length > 0 && (
            <ul className="mb-4 space-y-1 text-reading text-coffee-700">
              {objective.items.map((item, i) => (
                <li key={i}>· <MathText text={typeof item === 'string' ? item : item?.term ?? ''} /></li>
              ))}
            </ul>
          )}

          {sections.map((section, si) => {
            if (isListing(section)) {
              const language = section.language || 'python';
              return (
                <div key={si}>
                  {section.heading && (
                    <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-coffee-600">
                      {section.heading}
                    </h4>
                  )}
                  <CodeBlock code={section.code} language={language} />
                  <Walkthrough
                    code={section.code}
                    language={language}
                    explainReady={explainReady}
                    explanations={explanations}
                  />
                </div>
              );
            }
            if (isOutput(section)) {
              return (
                <div key={si}>
                  <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-coffee-600">
                    {section.heading || 'What it prints'}
                  </h4>
                  <CodeBlock code={section.code} language="output" showLineNumbers={false} />
                </div>
              );
            }
            return null;
          })}

          {/* The gotchas are already written in the notes — they are the lines a
              paper is most likely to ask about, so they are surfaced here rather
              than left behind in the reading tab. */}
          {notes.length > 0 && (
            <div className="mt-5 rounded-xl border border-ember-500/30 bg-ember-500/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle size={13} className="shrink-0 text-ember-500" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-coffee-600">
                  Watch out for
                </span>
              </div>
              <ul className="space-y-1.5 text-sm leading-relaxed text-coffee-700">
                {notes.flatMap((n, ni) => [
                  ...(n.text ? [<li key={`${ni}-t`}><MathText text={n.text} /></li>] : []),
                  ...(n.items ?? []).map((item, ii) => (
                    <li key={`${ni}-${ii}`}>· <MathText text={item} /></li>
                  )),
                ])}
              </ul>
            </div>
          )}

          {examCount > 0 && onOpenExam && (
            <button onClick={onOpenExam} className="btn-ghost mt-5 text-sm">
              <PenLine size={14} />
              {examCount} exam question{examCount === 1 ? '' : 's'} on this practical
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CodeWalkthrough({ topics, course, explainReady, explanations, onOpenExam }) {
  const practicals = topicsWithCode(topics);
  // First one open: a tab that opens fully collapsed makes a student click
  // before they can read anything.
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  if (practicals.length === 0) return null;

  const toggle = (i) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const allOpen = openSet.size === practicals.length;

  // Questions are tied to a topic by the `source` string the bank already
  // carries ("Topic 10 · Practical 1 · Program Listing"), so nothing new has to
  // be authored to link the two.
  const examCountFor = (topic) =>
    (course?.examPrep ?? []).filter((q) => String(q.source ?? '').startsWith(`Topic ${topic.number} ·`)).length;

  return (
    <div>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rust/10 text-rust">
          <Terminal size={20} />
        </div>
        <div>
          <h2 className="mb-1 font-display text-xl font-bold text-ink">Code Walkthrough</h2>
          <p className="text-sm leading-relaxed text-coffee-700">
            The {practicals.length} practicals in order, each with the listing explained line by line,
            what it prints, and the questions that could be set on it. Read the code, then go and
            answer something about it.
          </p>
        </div>
      </div>

      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={() => setOpenSet(allOpen ? new Set() : new Set(practicals.map((_, i) => i)))}
          className="shrink-0 font-mono text-xs font-medium text-coffee-600 transition-colors hover:text-ink"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="space-y-3">
        {practicals.map((topic, i) => (
          <Practical
            key={topic.number ?? i}
            topic={topic}
            index={i}
            isOpen={openSet.has(i)}
            onToggle={() => toggle(i)}
            explainReady={explainReady}
            explanations={explanations}
            examCount={examCountFor(topic)}
            onOpenExam={onOpenExam}
          />
        ))}
      </div>
    </div>
  );
}
