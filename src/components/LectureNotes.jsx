import { useState, useRef, useEffect, useMemo } from 'react';
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle2, Circle, XCircle, ChevronDown, Layers, List, Sparkles, FileDown, ExternalLink, ListChecks } from 'lucide-react';
import MoscaCalculator from './MoscaCalculator';
import CodeBlock from './CodeBlock';
import ExplainCode from './ExplainCode';
import TopicLinks from './TopicLinks';
import { useExplanations } from './useExplanations';
import { loadSimplified } from '../data/lectureNotes/simplified';
import RichText from './RichText';
import MathText, { MathBlock } from './MathText';
import { useApiAvailability } from '../utils/apiClient';
import {
  buildOutline,
  groupToPlainText,
  hashText,
  canSimplifyGroup,
  getCachedSimplification,
  requestSimplification,
} from '../utils/simplifySection';
import {
  topicToPlainText,
  canSummarize,
  getCachedSummary,
  requestSummary,
} from '../utils/summarizeTopic';
import { useAutoMarkRead } from './useReadingProgress';

function DefinitionBox({ text }) {
  return (
    <div className="bg-coffee-50 border-l-4 border-coffee-500 rounded-r-xl px-5 py-4 mb-5">
      <p className="text-reading text-ink"><MathText text={text} /></p>
    </div>
  );
}

function TermList({ items }) {
  // Term/definition pairs double as flashcards: front = term, tap to reveal
  // the definition. Only offered when every item has both halves.
  const cardable = items.length >= 3 && items.every((it) => it && typeof it === 'object' && it.term && it.def);
  const [cardMode, setCardMode] = useState(false);
  const [revealed, setRevealed] = useState(() => new Set());

  const toggleMode = () => {
    setCardMode((m) => !m);
    setRevealed(new Set());
  };

  const toggleReveal = (i) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="mb-5">
      {cardable && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={toggleMode}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-coffee-600 hover:text-ink transition-colors"
          >
            {cardMode ? <List size={12} /> : <Layers size={12} />}
            {cardMode ? 'List view' : 'Study as cards'}
          </button>
        </div>
      )}

      {cardable && cardMode ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, i) => {
            const isOpen = revealed.has(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleReveal(i)}
                aria-expanded={isOpen}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  isOpen ? 'bg-coffee-50 border-coffee-300' : 'bg-paper border-coffee-200 hover:border-coffee-400'
                }`}
              >
                <span className="block font-display font-bold text-ink text-lg leading-snug"><MathText text={item.term} /></span>
                {isOpen ? (
                  <span className="block mt-2 text-reading-sm text-coffee-700"><MathText text={item.def} /></span>
                ) : (
                  <span className="block mt-2 text-xs font-mono text-coffee-400">Tap to reveal</span>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-reading">
              <span className="font-mono font-bold text-coffee-700 shrink-0 w-5 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-ink">
                {'term' in item ? (
                  <><span className="font-semibold"><MathText text={item.term} /></span>
                  {item.def && <span className="text-coffee-700"> — <MathText text={item.def} /></span>}</>
                ) : <MathText text={item} />}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2 mb-5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-reading text-coffee-700">
          <span className="w-1.5 h-1.5 rounded-full bg-coffee-400 shrink-0 mt-3" />
          <span><MathText text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

function ProsCons({ advantages, disadvantages }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div className="bg-moss/10 border border-moss/25 rounded-xl p-4">
        <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-moss uppercase tracking-widest mb-3">
          <CheckCircle2 size={13} /> Advantages
        </h4>
        <ul className="space-y-1.5">
          {advantages.map((a, i) => (
            <li key={i} className="flex gap-2 text-reading-sm text-coffee-700">
              <CheckCircle2 size={13} className="text-moss shrink-0 mt-1" />
              <MathText text={a} />
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rust/10 border border-rust/25 rounded-xl p-4">
        <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-rust uppercase tracking-widest mb-3">
          <XCircle size={13} /> Disadvantages
        </h4>
        <ul className="space-y-1.5">
          {disadvantages.map((d, i) => (
            <li key={i} className="flex gap-2 text-reading-sm text-coffee-700">
              <XCircle size={13} className="text-rust shrink-0 mt-1" />
              <MathText text={d} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ComparisonTable({ title, headers, rows }) {
  return (
    <div className="mb-5">
      {title && <h4 className="font-display font-bold text-ink text-lg mb-2">{title}</h4>}
      <div className="overflow-x-auto rounded-xl border border-coffee-200">
        <table className="w-full text-reading-sm">
        <thead>
          <tr className="bg-ink text-cream">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-paper' : 'bg-coffee-50'}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 text-coffee-700 leading-snug ${j === 0 ? 'font-semibold text-ink' : ''}`}>
                  <MathText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

function CaseStudy({ title, prompt, tasks }) {
  return (
    <div className="bg-ember-500/10 border border-ember-500/25 rounded-xl p-5 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={15} className="text-ember-500 shrink-0" />
        <span className="text-xs font-mono font-bold text-ember-500 uppercase tracking-wider">Case Study / Assignment</span>
      </div>
      {title && <h4 className="font-display font-bold text-ink text-lg mb-2">{title}</h4>}
      {prompt && <p className="text-reading text-coffee-700 mb-3"><MathText text={prompt} /></p>}
      {tasks && (
        <ol className="space-y-2">
          {tasks.map((task, i) => (
            <li key={i} className="flex gap-2.5 text-reading text-coffee-700">
              <span className="font-mono font-bold text-ember-500 shrink-0">{i + 1}.</span>
              <MathText text={task} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Figure({ src, alt, caption, width, height, maxWidth }) {
  return (
    <figure className="mb-5">
      <div className="rounded-xl border border-coffee-200 bg-paper p-3">
        {/* width/height are the intrinsic pixel size — with w-full h-auto the
            browser uses them only to reserve aspect-ratio space, preventing
            layout shift as the lazy image loads.
            `maxWidth` caps how wide a figure may render, for tall portrait
            diagrams that would otherwise be stretched to several screens of
            height by w-full. Capped figures centre themselves. */}
        <img
          src={src}
          alt={alt || caption || ''}
          loading="lazy"
          width={width}
          height={height}
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
          className="w-full h-auto rounded-lg mx-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs font-mono text-coffee-500 text-center">{caption}</figcaption>
      )}
    </figure>
  );
}

function NoteBox({ text, items }) {
  return (
    <div className="bg-moss/10 border border-moss/25 rounded-xl p-4 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb size={14} className="text-moss shrink-0" />
        <span className="text-xs font-mono font-bold text-moss uppercase tracking-wider">Added for clarity</span>
      </div>
      {text && <p className="text-reading text-coffee-700"><MathText text={text} /></p>}
      {items && (
        <ul className={`space-y-2 ${text ? 'mt-2' : ''}`}>
          {items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-reading text-coffee-700">
              <span className="w-1.5 h-1.5 rounded-full bg-moss shrink-0 mt-3" />
              <span><MathText text={item} /></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// A download card linking to the full source document a topic was summarised
// from (e.g. a student group's uploaded .docx). Self-contained — it carries its
// own label, so the section usually omits `heading`.
function ResourceLink({ href, label, filename, meta }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-coffee-200 bg-paper p-4 mb-5 transition-all hover:border-ink hover:shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-coffee-100 transition-colors group-hover:bg-ink/5">
        <FileDown size={18} className="text-coffee-600 group-hover:text-ink" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{label || 'Read the full documentation'}</span>
        {(filename || meta) && (
          <span className="block truncate text-xs text-coffee-600">
            {filename}{filename && meta ? ' · ' : ''}{meta}
          </span>
        )}
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-medium text-coffee-600 transition-colors group-hover:text-ink">
        Open
        <ExternalLink size={12} />
      </span>
    </a>
  );
}

function FiveVs({ items }) {
  const colors = ['bg-moss', 'bg-ink', 'bg-rust', 'bg-ember-500', 'bg-coffee-700'];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
      {items.map((item, i) => (
        <div key={i} className={`${colors[i]} text-cream rounded-xl p-4 flex flex-col gap-1.5`}>
          <span className="font-display font-bold text-2xl leading-none">{item.term}</span>
          <span className="text-xs opacity-75 leading-snug">{item.def}</span>
        </div>
      ))}
    </div>
  );
}

// `simplifyText` is the serialised text of the whole heading group this section
// heads — supplied by TopicAccordion, which is the only level that knows which
// sections belong under which heading. Sections that don't head a group (and the
// `resource` cards, which have nothing to rewrite) get none and show no button.
function Section({ section, simplifyReady, explainReady, explanations, simplifyText, bundledSimplified, plainEnglishMode, context, collapsible = false, isOpen = true, onToggle, anchorId }) {
  const [simplify, setSimplify] = useState({ status: 'idle', text: '', error: '' });
  const [showOriginal, setShowOriginal] = useState(false);
  const abortRef = useRef(null);
  useEffect(() => () => abortRef.current?.abort(), []);
  const open = !collapsible || isOpen;

  const plain = simplifyText ?? '';
  const canSimplify = simplifyReady && Boolean(section.heading) && canSimplifyGroup(plain);

  // The topic-level Plain English toggle takes this heading over entirely when
  // a bundled rewrite exists for it — no fetch, no manual click, shown the
  // instant the panel is open. Sections without one (too short to pre-generate,
  // or added after the script last ran) are unaffected by the toggle.
  const showBundled = plainEnglishMode && Boolean(bundledSimplified);

  const onSimplify = async () => {
    if (simplify.status === 'done') {
      setSimplify({ status: 'idle', text: '', error: '' });
      return;
    }
    // A pre-generated rewrite answers a manual click instantly too, toggle or
    // not — most headings that qualify for Simplify have one, since the script
    // generates for the same population canSimplifyGroup gates on.
    if (bundledSimplified) {
      setSimplify({ status: 'done', text: bundledSimplified, error: '' });
      return;
    }
    const cached = getCachedSimplification(plain);
    if (cached) {
      setSimplify({ status: 'done', text: cached, error: '' });
      return;
    }
    setSimplify({ status: 'loading', text: '', error: '' });
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const data = await requestSimplification({ text: plain, context, signal: controller.signal });
    if (controller.signal.aborted || data.aborted) return;
    if (data.simplified) {
      setSimplify({ status: 'done', text: data.simplified, error: '' });
    } else {
      setSimplify({ status: 'error', text: '', error: data.error || 'Failed to simplify this section.' });
    }
  };

  return (
    <div className={open ? 'mb-6' : 'mb-1'}>
      {section.heading && (
        <h4
          id={anchorId}
          className={`font-display font-bold text-ink text-xl flex items-center gap-2 scroll-mt-24 ${open ? 'mb-3' : 'mb-0'}`}
        >
          {collapsible ? (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isOpen}
              className="flex flex-1 items-center gap-2 py-1 text-left transition-colors hover:text-coffee-600"
            >
              <ChevronDown
                size={15}
                className={`text-coffee-400 shrink-0 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
              />
              <span className="flex-1"><MathText text={section.heading} /></span>
              {section.date && (
                <span className="text-xs font-mono font-normal text-coffee-500">— {section.date}</span>
              )}
            </button>
          ) : (
            <>
              <MathText text={section.heading} />
              {section.date && (
                <span className="text-xs font-mono font-normal text-coffee-500 ml-1">— {section.date}</span>
              )}
            </>
          )}
          {canSimplify && open && !showBundled && (
            <button
              type="button"
              onClick={onSimplify}
              disabled={simplify.status === 'loading'}
              className="ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full border border-coffee-200 bg-paper px-2.5 py-1 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-60"
            >
              <Sparkles size={11} className={simplify.status === 'loading' ? 'animate-pulse text-ember-500' : 'text-ember-500'} />
              {simplify.status === 'loading' ? 'Simplifying…'
                : simplify.status === 'done' ? 'Hide'
                : simplify.status === 'error' ? 'Retry'
                : 'Simplify'}
            </button>
          )}
        </h4>
      )}

      {open && (
        <>
          {simplify.status === 'error' && (
            <p className="rounded-lg border border-rust/25 bg-rust/10 px-3 py-2 text-sm text-rust mb-3">
              {simplify.error}
            </p>
          )}

          {(simplify.status === 'done' || showBundled) && (
            <div className="bg-coffee-50 border border-coffee-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-ember-500 shrink-0" />
                  <span className="text-xs font-mono font-bold text-coffee-600 uppercase tracking-wider">In plain English</span>
                </div>
                {showBundled && (
                  <button
                    type="button"
                    onClick={() => setShowOriginal((v) => !v)}
                    className="text-xs font-mono font-medium text-coffee-500 hover:text-ink transition-colors shrink-0"
                  >
                    {showOriginal ? 'Hide original wording' : 'Show original wording'}
                  </button>
                )}
              </div>
              <div className="text-reading text-ink">
                <RichText text={showBundled ? bundledSimplified : simplify.text} />
              </div>
            </div>
          )}

          {(!showBundled || showOriginal) && (
            <>
              {section.type === 'definition' && section.text && <DefinitionBox text={section.text} />}
              {section.type === 'fivers' && <FiveVs items={section.items} />}
              {section.type === 'termlist' && <TermList items={section.items} />}
              {section.type === 'bullets' && <BulletList items={section.items} />}
              {section.type === 'proscons' && <ProsCons advantages={section.advantages} disadvantages={section.disadvantages} />}
              {/* heading is rendered by the section-level <h4> above, like every other type — don't repeat it inside the table */}
              {section.type === 'table' && <ComparisonTable headers={section.headers} rows={section.rows} />}
              {section.type === 'casestudy' && <CaseStudy title={section.title} prompt={section.prompt} tasks={section.tasks} />}
              {section.type === 'text' && <p className="text-reading text-coffee-700 mb-3"><MathText text={section.text} /></p>}
              {section.type === 'math' && <MathBlock tex={section.tex} caption={section.caption} />}
              {section.type === 'note' && <NoteBox text={section.text} items={section.items} />}
              {section.type === 'image' && <Figure src={section.src} alt={section.alt} caption={section.caption} width={section.width} height={section.height} maxWidth={section.maxWidth} />}
              {section.type === 'code' && (
                <>
                  <CodeBlock code={section.code} language={section.language || 'python'} showLineNumbers={false} />
                  {/* Program listings only. A `language: 'output'` block is the run
                      transcript, not code, and the explainer would try to read it
                      as a program. */}
                  {section.language !== 'output' && (
                    <ExplainCode
                      code={section.code}
                      language={section.language || 'python'}
                      ready={explainReady}
                      {...(explanations ?? {})}
                    />
                  )}
                </>
              )}
              {section.type === 'mosca' && <MoscaCalculator />}
              {section.type === 'resource' && <ResourceLink href={section.href} label={section.label} filename={section.filename} meta={section.meta} />}
            </>
          )}
        </>
      )}
    </div>
  );
}

// The revision recap for a whole topic. Distinct from the per-section Simplify
// above: that one explains a section you did not understand, this one gives back
// the key points of a topic you have already read. Same visual language, so the
// two read as one family, but the label says which is which.
function KeyPoints({ topic, plain, context }) {
  const [state, setState] = useState({ status: 'idle', text: '', error: '' });
  const abortRef = useRef(null);
  useEffect(() => () => abortRef.current?.abort(), []);

  const run = async () => {
    if (state.status === 'done') {
      setState({ status: 'idle', text: '', error: '' });
      return;
    }
    const cached = getCachedSummary(plain);
    if (cached) {
      setState({ status: 'done', text: cached, error: '' });
      return;
    }
    setState({ status: 'loading', text: '', error: '' });
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const data = await requestSummary({
      text: plain,
      context: { ...context, topicTitle: topic.title },
      signal: controller.signal,
    });
    if (controller.signal.aborted || data.aborted) return;
    if (data.summary) {
      setState({ status: 'done', text: data.summary, error: '' });
    } else {
      setState({ status: 'error', text: '', error: data.error || 'Failed to summarise this topic.' });
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={run}
          disabled={state.status === 'loading'}
          className="inline-flex items-center gap-1.5 rounded-full border border-coffee-200 bg-paper px-3 py-1.5 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink disabled:opacity-60"
        >
          <ListChecks size={12} className={state.status === 'loading' ? 'animate-pulse text-ember-500' : 'text-ember-500'} />
          {state.status === 'loading' ? 'Summarising…'
            : state.status === 'done' ? 'Hide key points'
            : state.status === 'error' ? 'Retry'
            : 'Key points'}
        </button>
      </div>

      {state.status === 'error' && (
        <p className="rounded-lg border border-rust/25 bg-rust/10 px-3 py-2 text-sm text-rust mb-4">
          {state.error}
        </p>
      )}

      {state.status === 'done' && (
        <div className="bg-coffee-50 border border-coffee-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ListChecks size={13} className="text-ember-500 shrink-0" />
            <span className="text-xs font-mono font-bold text-coffee-600 uppercase tracking-wider">Key points</span>
          </div>
          <div className="text-reading text-ink">
            <RichText text={state.text} />
          </div>
        </div>
      )}
    </>
  );
}

function TopicAccordion({ topic, index, isOpen, onToggle, simplifyReady, simplifiedMap, explainReady, explanations, summarizeReady, context, tracksReading, isRead, onSetRead, mapEntry, mapPart, onJumpToTopic }) {
  const panelId = `lecture-panel-${index}`;
  const buttonId = `lecture-header-${index}`;

  // Serialised once per topic and reused for both the Key points call and the
  // auto-mark dwell, so a long topic asks for proportionally more reading time.
  const plain = useMemo(() => topicToPlainText(topic), [topic]);
  const showKeyPoints = summarizeReady && canSummarize(topic, plain);

  const { panelRef, sentinelRef } = useAutoMarkRead({
    active: tracksReading && isOpen && !isRead,
    charCount: plain.length,
    onRead: () => onSetRead(true),
  });

  const items = useMemo(() => buildOutline(topic.sections), [topic.sections]);

  // Simplify text per heading group, keyed by the heading section itself so
  // either render branch below can look it up. Built here because buildOutline
  // is what knows which sections fall under which heading — a Section on its own
  // can only see itself, which is why the button used to be missing from most
  // headings.
  const groupText = useMemo(() => {
    const map = new Map();
    for (const it of items) {
      if (it.head) map.set(it.head, groupToPlainText(it.head, it.tail));
    }
    return map;
  }, [items]);

  // Bundled rewrite per heading section (keyed by the section object itself, so
  // both render branches below — grouped and flat — can look it up the same way
  // `groupText` already does). A miss means the group is either too short to
  // pre-generate or was added after the script last ran; that heading just
  // behaves as it did before this feature.
  const simplifiedForGroup = useMemo(() => {
    const map = new Map();
    if (!simplifiedMap) return map;
    for (const it of items) {
      if (!it.head) continue;
      const text = groupText.get(it.head);
      const rewrite = text && simplifiedMap[hashText(text)];
      if (rewrite) map.set(it.head, rewrite);
    }
    return map;
  }, [items, groupText, simplifiedMap]);
  const hasBundledContent = simplifiedForGroup.size > 0;

  // One click swaps every heading in the topic to its plain-English rewrite at
  // once, instead of un-collapsing and clicking Simplify on each in turn.
  const [plainEnglish, setPlainEnglish] = useState(false);

  const firstGroupIdx = items.findIndex((it) => it.head);
  const headedIndices = items.reduce((acc, it, ii) => (it.head ? [...acc, ii] : acc), []);
  // Sub-sections collapse only when there are enough of them to feel like a
  // wall of text; the first one starts open so the topic never looks empty.
  const collapsibleSections = headedIndices.length >= 2;
  const [openSections, setOpenSections] = useState(() => new Set(firstGroupIdx >= 0 ? [firstGroupIdx] : []));
  const allSectionsOpen = headedIndices.every((ii) => openSections.has(ii));

  const togglePlainEnglish = () => {
    setPlainEnglish((prev) => {
      const next = !prev;
      // Turning it on also opens every sub-section — the whole point is reading
      // straight through without un-collapsing anything first. Turning it off
      // leaves sections as they are; collapsing them back would be surprising.
      if (next) setOpenSections(new Set(headedIndices));
      return next;
    });
  };

  const sectionContext = { ...context, topicTitle: topic.title };

  const toggleSection = (ii) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(ii)) next.delete(ii);
      else next.add(ii);
      return next;
    });

  const toggleAllSections = () =>
    setOpenSections(allSectionsOpen ? new Set() : new Set(headedIndices));

  const jumpToSection = (ii) => {
    setOpenSections((prev) => new Set(prev).add(ii));
    document.getElementById(`${panelId}-sec-${ii}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const lead = firstGroupIdx === -1 ? items : items.slice(0, firstGroupIdx);
  const rest = firstGroupIdx === -1 ? [] : items.slice(firstGroupIdx);

  return (
    <div className="border border-coffee-200 rounded-xl bg-paper overflow-hidden">
      {/* Header — heading wraps a real button (WAI-ARIA accordion pattern) */}
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left transition-colors ${
            isOpen ? 'bg-coffee-50' : 'hover:bg-coffee-50'
          }`}
        >
          {/* Read marker. An icon, not a control — the accordion header is
              already a <button> and nesting one inside it is invalid HTML. The
              toggle lives at the end of the panel, where you finish reading. */}
          {tracksReading && (isRead ? (
            <CheckCircle2 size={16} className="text-moss shrink-0" aria-label="Read" />
          ) : (
            <Circle size={16} className="text-coffee-300 shrink-0" aria-hidden="true" />
          ))}
          <span className="bg-ink text-cream font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg shrink-0">
            Topic {topic.number}
          </span>
          <span className="display-heading text-lg sm:text-xl text-ink leading-snug flex-1">
            {topic.title}
          </span>
          {topic.date && (
            <span className="hidden sm:block text-xs font-mono text-coffee-500 shrink-0">{topic.date}</span>
          )}
          <ChevronDown
            size={18}
            className={`text-coffee-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>

      {/* Panel */}
      {isOpen && (
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-labelledby={buttonId}
          className="px-4 sm:px-5 pt-2 pb-5 border-t border-coffee-100"
        >
          {topic.date && (
            <span className="sm:hidden text-xs font-mono text-coffee-500 mb-4 block">Lecture date: {topic.date}</span>
          )}

          {/* Where this topic sits, and which others complete it. Data-driven —
              renders nothing for a course that declares no map. */}
          <TopicLinks entry={mapEntry} part={mapPart} onJumpTo={onJumpToTopic} />

          {hasBundledContent && (
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={togglePlainEnglish}
                aria-pressed={plainEnglish}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                  plainEnglish
                    ? 'border-ember-500/40 bg-ember-500/10 text-ember-500'
                    : 'border-coffee-200 bg-paper text-coffee-600 hover:border-coffee-400 hover:text-ink'
                }`}
              >
                <Sparkles size={12} className="text-ember-500" />
                {plainEnglish ? 'Original wording' : 'Plain English'}
              </button>
            </div>
          )}

          {showKeyPoints && <KeyPoints topic={topic} plain={plain} context={context} />}

          {collapsibleSections ? (
            <>
              {lead.map((it, ii) => (
                <Section key={ii} section={it.standalone} simplifyReady={simplifyReady} explainReady={explainReady} explanations={explanations} context={sectionContext} />
              ))}

              {headedIndices.length >= 4 && (
                <nav aria-label={`Sections in ${topic.title}`} className="mb-5 rounded-xl border border-coffee-100 bg-coffee-50/60 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-coffee-500 uppercase tracking-widest">On this topic</span>
                    <button
                      type="button"
                      onClick={toggleAllSections}
                      className="text-xs font-mono font-medium text-coffee-600 hover:text-ink transition-colors"
                    >
                      {allSectionsOpen ? 'Collapse all sections' : 'Expand all sections'}
                    </button>
                  </div>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5">
                    {rest.map((it, i) => {
                      if (!it.head) return null;
                      const ii = firstGroupIdx + i;
                      return (
                        <li key={ii}>
                          <button
                            type="button"
                            onClick={() => jumpToSection(ii)}
                            className="py-0.5 text-left text-sm leading-snug text-coffee-600 hover:text-ink transition-colors"
                          >
                            <MathText text={it.head.heading} />
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              )}

              {rest.map((it, i) => {
                const ii = firstGroupIdx + i;
                if (it.standalone) {
                  return (
                    <Section key={ii} section={it.standalone} simplifyReady={simplifyReady} explainReady={explainReady} explanations={explanations} context={sectionContext} />
                  );
                }
                const openG = openSections.has(ii);
                return (
                  <div key={ii}>
                    <Section
                      section={it.head}
                      simplifyReady={simplifyReady}
                      explainReady={explainReady} explanations={explanations}
                      simplifyText={groupText.get(it.head)}
                      bundledSimplified={simplifiedForGroup.get(it.head)}
                      plainEnglishMode={plainEnglish}
                      context={sectionContext}
                      collapsible
                      isOpen={openG}
                      onToggle={() => toggleSection(ii)}
                      anchorId={`${panelId}-sec-${ii}`}
                    />
                    {openG && it.tail.map((s, si) => (
                      <Section key={si} section={s} simplifyReady={simplifyReady} explainReady={explainReady} explanations={explanations} context={sectionContext} />
                    ))}
                  </div>
                );
              })}
            </>
          ) : (
            topic.sections.map((section, si) => (
              <Section
                key={si}
                section={section}
                simplifyReady={simplifyReady}
                explainReady={explainReady} explanations={explanations}
                simplifyText={groupText.get(section)}
                bundledSimplified={simplifiedForGroup.get(section)}
                plainEnglishMode={plainEnglish}
                context={sectionContext}
              />
            ))
          )}

          {/* End of topic. The sentinel is what tells useAutoMarkRead the student
              got to the bottom; the button is how they correct it either way. */}
          {tracksReading && (
            <>
              <div ref={sentinelRef} aria-hidden="true" />
              <div className="flex justify-end pt-4 mt-2 border-t border-coffee-100">
                <button
                  type="button"
                  onClick={() => onSetRead(!isRead)}
                  aria-pressed={isRead}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                    isRead
                      ? 'border-moss/40 bg-moss/10 text-moss hover:border-moss'
                      : 'border-coffee-200 bg-paper text-coffee-600 hover:border-coffee-400 hover:text-ink'
                  }`}
                >
                  {isRead ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                  {isRead ? 'Read — mark unread' : 'Mark as read'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * @param {Object} [props.reading] `{ isRead, setRead }` from useReadingProgress,
 *   owned by the *page* rather than by this component. Two useProgress hooks on
 *   the same storage key keep independent React state, so if this component
 *   mounted its own, marking a topic here would never reach the tab badge in
 *   CourseDetail — both would write the same localStorage record and neither
 *   would re-render the other. One owner, passed down.
 *
 *   Omitting it renders the notes without any reading UI. That is a real
 *   (if currently unused) mode, not a fallback — a caller that does not track
 *   reading gets no progress bar rather than a bar that silently does nothing.
 */
export default function LectureNotes({ topics, context, reading, notesKey, map }) {
  // Split so the availability probes in the inner component only fire on
  // courses that actually have lecture notes.
  if (!topics?.length) return null;
  return <LectureNotesInner topics={topics} context={context} reading={reading} notesKey={notesKey} map={map} />;
}

function LectureNotesInner({ topics, context, reading, notesKey, map }) {
  // First topic open by default; rest collapsed.
  const [openSet, setOpenSet] = useState(() => new Set([0]));
  const simplifyStatus = useApiAvailability('/api/simplify');
  const explainStatus = useApiAvailability('/api/explainer');
  // Bundled walkthroughs for this course's listings, when they have been
  // generated — checked before the live call, and the reason the button can
  // appear at all offline.
  const explanations = useExplanations(notesKey);
  const summarizeStatus = useApiAvailability('/api/summarize');

  // Pre-generated plain-English rewrites for this course, loaded once and
  // shared by every topic below. Undefined while loading, null once it's clear
  // there is no generated file for this course — both render as "not bundled
  // yet" to a topic, which just falls back to the live per-heading button.
  const [simplifiedMap, setSimplifiedMap] = useState(null);
  useEffect(() => {
    let cancelled = false;
    loadSimplified(notesKey).then((map) => { if (!cancelled) setSimplifiedMap(map); });
    return () => { cancelled = true; };
  }, [notesKey]);

  const tracksReading = Boolean(reading);
  const isRead = (topic) => Boolean(reading?.isRead(topic));
  const setRead = (topic, read) => reading?.setRead(topic, read);

  // Counted off the topics actually on screen rather than the stored total, so
  // a topic that was renamed (and so lost its mark) shows as unread here
  // instead of inflating the bar past the number of topics on the page.
  const readCount = topics.filter((t) => isRead(t)).length;
  const allRead = readCount === topics.length;

  const allOpen = openSet.size === topics.length;

  const toggle = (i) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const toggleAll = () =>
    setOpenSet(allOpen ? new Set() : new Set(topics.map((_, i) => i)));

  // Following a link from one topic to another: open the target and scroll to
  // it. Same idiom as jumpToSection above. A link to a note that is not on the
  // page (a course whose map runs ahead of its transcription) is ignored rather
  // than scrolling to nothing.
  const jumpToTopic = (noteNumber) => {
    const ti = topics.findIndex((t) => String(t.number) === String(noteNumber));
    if (ti === -1) return;
    setOpenSet((prev) => new Set(prev).add(ti));
    // Two frames, not zero: opening the target panel changes the height of
    // everything below it, so measuring before React has re-rendered scrolls to
    // where the header *used* to be and lands mid-topic. The first frame lets
    // the re-render commit, the second lets layout settle after the expansion.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById(`lecture-header-${ti}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };

  // Note number -> the part it belongs to, so each topic can name its part
  // without every accordion re-scanning the map.
  const partOf = useMemo(() => {
    const m = new Map();
    (map?.parts || []).forEach((p) => p.topics.forEach((n) => m.set(String(n), p)));
    return m;
  }, [map]);

  return (
    <div>
      {/* Reading progress + expand / collapse all */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${allRead && tracksReading ? 'font-bold text-moss' : 'text-coffee-500'}`}>
            {allRead && tracksReading && <CheckCircle2 size={12} />}
            {!tracksReading
              ? `${topics.length} ${topics.length === 1 ? 'topic' : 'topics'}`
              : allRead
                ? `All ${topics.length} ${topics.length === 1 ? 'topic' : 'topics'} read`
                : `${readCount} of ${topics.length} ${topics.length === 1 ? 'topic' : 'topics'} read`}
          </span>
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs font-mono font-medium text-coffee-600 hover:text-ink transition-colors shrink-0"
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
        {tracksReading && (
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-coffee-100"
            role="progressbar"
            aria-valuenow={readCount}
            aria-valuemin={0}
            aria-valuemax={topics.length}
            aria-label="Topics read"
          >
            <div
              className="h-full rounded-full bg-moss transition-all duration-500"
              style={{ width: `${topics.length ? (readCount / topics.length) * 100 : 0}%` }}
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        {topics.map((topic, ti) => (
          <TopicAccordion
            key={ti}
            topic={topic}
            index={ti}
            isOpen={openSet.has(ti)}
            onToggle={() => toggle(ti)}
            simplifyReady={simplifyStatus === 'ready'}
            simplifiedMap={simplifiedMap}
            explainReady={explainStatus === 'ready'}
            explanations={explanations}
            summarizeReady={summarizeStatus === 'ready'}
            context={context}
            tracksReading={tracksReading}
            isRead={isRead(topic)}
            onSetRead={(read) => setRead(topic, read)}
            mapEntry={map?.topics?.[String(topic.number)]}
            mapPart={partOf.get(String(topic.number))}
            onJumpToTopic={jumpToTopic}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-coffee-500 font-mono pt-5 mt-2">
        <BookOpen size={11} />
        End of uploaded lecture notes · More topics will appear as notes are added
      </div>
    </div>
  );
}
