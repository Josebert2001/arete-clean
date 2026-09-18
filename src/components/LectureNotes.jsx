import { useState, useRef, useEffect, useMemo, useCallback, useId, Fragment } from 'react';
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
import ListenToTopic from './ListenToTopic';

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
// The read-along strip: the chunk actually being spoken, with the exact word
// the engine just reported lit up. Rendered above the section being read — in
// the text flow, where the student's eyes already are — rather than in the
// player bar, which sits screens above the voice on a long topic.
//
// It reads useSpeech's own utterance text, not the note on screen: the same
// words, but letter-spaced acronyms and converted maths included, exactly as
// heard. That is what keeps it perfectly in sync with no mapping back to the
// rendered note to maintain — the section-level wash already marks *where* in
// the notes the voice is; this says exactly *what* it is saying right now.
// `caption.start === -1` is a chunk that has started but has not had its
// first word boundary yet (always true on Safari, which fires none at all) —
// shown plain, with nothing picked out. Hidden from assistive tech: the same
// words are already in the document as the actual note text, so a screen
// reader repeating this every few hundred milliseconds would just be noise.
// `data-read-along` is the hook the follow scroll and the tests use to find it.
function ReadAlongStrip({ caption }) {
  if (!caption) return null;
  return (
    <div data-read-along="true" aria-hidden="true" className="mb-4 rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2">
      <p className="mb-1 text-[11px] font-mono font-bold uppercase tracking-widest text-coffee-500">
        Listening — read along
      </p>
      <p className="text-sm leading-relaxed text-coffee-600">
        {caption.start >= 0 ? (
          <>
            {caption.text.slice(0, caption.start)}
            <span className="rounded bg-ember-500/20 px-0.5 font-semibold text-ink">
              {caption.text.slice(caption.start, caption.end)}
            </span>
            {caption.text.slice(caption.end)}
          </>
        ) : caption.text}
      </p>
    </div>
  );
}

function Section({ section, speaking = false, simplifyReady, explainReady, explanations, simplifyText, bundledSimplified, plainEnglishMode, context, collapsible = false, isOpen = true, onToggle, anchorId }) {
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
    // The wash marks the section the voice is reading: a tint and a left rule
    // rather than a full border.
    //
    // EVERY box-affecting class is present in both states and only the colours
    // change, because the alternative reflows the page. Adding the padding and
    // the rule only while speaking grew the section by their own size and shoved
    // everything below it down each time the voice moved on — under the eyes of
    // someone reading along, which is worse than having no highlight at all.
    // Hence the transparent border and the horizontal-only padding, cancelled by
    // the negative margin so the text keeps the same measure as the rest.
    <div
      // What the follow-the-voice scroll in TopicAccordion aims at. An attribute
      // rather than a ref per section: the sections are rendered from three
      // different branches below, and threading a ref through all of them to
      // find the one element that is already marked would be work for nothing.
      data-speaking={speaking ? 'true' : undefined}
      className={`${open ? 'mb-6' : 'mb-1'} -mx-3 px-3 scroll-mt-24 rounded-lg border-l-2 transition-colors ${
        speaking ? 'border-ember-500 bg-ember-500/10' : 'border-transparent'
      }`}
    >
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

// ── Following the voice down the page ────────────────────────────────────────
// §4.10 of docs/audio-playback-plan.md said no auto-scroll — "the wash is cheap
// to find, worth revisiting only if the phone passes say otherwise". They said
// otherwise: on a phone the section being read is usually a screen and a half
// below the player by the time the voice reaches it, so following along meant
// scrolling by hand every time it moved on.
//
// So it follows, but only when it has to. Nothing moves while the section is
// already in the band a reader is looking at, which is the whole of the
// read-along case, and a wheel or touch gesture holds it off for long enough
// that it never pulls the page out from under someone reading something else.
const FOLLOW_BAND_TOP = 88;      // clears the sticky navbar
const FOLLOW_BAND_BOTTOM = 0.6;  // of the viewport height
const FOLLOW_PAUSE_MS = 8000;
// How long after our own scrollIntoView a `scroll` event is still ours. Chrome's
// smooth scroll settles well inside this for any distance the follow covers;
// overrunning it only costs one skipped follow, whereas too short a window would
// have the page read its own scrolling as the student taking over.
const SELF_SCROLL_MS = 1200;

function TopicAccordion({ topic, index, isOpen, onToggle, simplifyReady, simplifiedMap, explainReady, explanations, summarizeReady, context, tracksReading, isRead, onSetRead, mapEntry, mapPart, onJumpToTopic, headingLevel = 3 }) {
  const panelId = `lecture-panel-${index}`;
  const buttonId = `lecture-header-${index}`;
  // Drops to h4 when the topics are nested inside a part section, so the
  // document outline matches what is on screen instead of running h3 under h3.
  const Heading = headingLevel === 4 ? 'h4' : 'h3';

  // Serialised once per topic and reused for both the Key points call and the
  // auto-mark dwell, so a long topic asks for proportionally more reading time.
  const plain = useMemo(() => topicToPlainText(topic), [topic]);
  const showKeyPoints = summarizeReady && canSummarize(topic, plain);

  const { panelRef, sentinelRef } = useAutoMarkRead({
    active: tracksReading && isOpen && !isRead,
    charCount: plain.length,
    onRead: () => onSetRead(true),
  });

  // Hearing a topic out is a read signal, and a stronger one than the dwell
  // timer beside it: the dwell timer infers attention from a visible panel,
  // whereas finishing the audio is elapsed time the student actually spent on
  // this material. `clean` is false when they skipped, so pressing next to the
  // end does not count — which is the same reason "Expand all" plus a fast
  // scroll marks nothing (see useAutoMarkRead). Both run in parallel; whichever
  // happens first marks the topic, and setRead is idempotent.
  const onListenFinished = useCallback((clean) => {
    if (clean && tracksReading && !isRead) onSetRead(true);
  }, [tracksReading, isRead, onSetRead]);

  const items = useMemo(() => buildOutline(topic.sections), [topic.sections]);

  // Outline index per section object, for placing the read-along strip. The
  // grouped branch below knows its index from the loop; the flat branch
  // renders raw sections, so it looks each one up here instead.
  const outlineIndexBySection = useMemo(() => {
    const bySection = new Map();
    items.forEach((it, ii) => {
      for (const s of it.head ? [it.head, ...(it.tail ?? [])] : [it.standalone]) bySection.set(s, ii);
    });
    return bySection;
  }, [items]);

  // Which outline item the voice is currently reading, or null when nothing is
  // playing. `items` here and the units ListenToTopic speaks come from the SAME
  // buildOutline call over the same sections, so the index means the same thing
  // on both sides — see topicToSpeechUnits' outlineIndex.
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [following, setFollowing] = useState(true);
  // Latched on the first section the voice reaches, and never cleared until the
  // topic unmounts — NOT gated on `speakingIdx`, which goes back to null the
  // moment the player is paused. Pausing to scroll up and re-read something is
  // exactly the case this suppression exists for, and listeners that were off
  // during the pause left nothing to suppress: resuming yanked the page
  // straight back down.
  const [followArmed, setFollowArmed] = useState(false);
  // The read-along strip: the caption useSpeech is voicing, and the outline
  // item it belongs to. Reported by ListenToTopic and rendered below, above
  // the section being read, so the student reads along in the text flow
  // rather than in the player bar.
  //
  // Latched per report like followArmed above, not gated on speakingIdx:
  // pausing freezes the caption on the sentence the voice stopped at, so the
  // strip stays where the student left it instead of vanishing mid-re-read.
  const [readAlong, setReadAlong] = useState(null);
  const onReadAlong = (caption, outlineIndex) => {
    setReadAlong(
      caption && outlineIndex !== null && outlineIndex !== undefined
        ? { caption, outlineIndex }
        : null,
    );
  };
  // When the student last moved the page themselves, and the window in which a
  // scroll is ours rather than theirs.
  const userScrolledAt = useRef(0);
  const selfScrollUntil = useRef(0);

  useEffect(() => {
    if (!followArmed) return undefined;
    const seen = () => { userScrolledAt.current = Date.now(); };
    // `wheel` and `touchmove` are unambiguous — a programmatic scroll fires
    // neither — and they land before the page has even moved.
    //
    // But they are not every way a page gets scrolled: PageDown, Space, the
    // arrow keys, dragging the scrollbar and find-in-page all move it without
    // either, and a student reading ahead that way was being pulled back to the
    // voice. `scroll` catches all of those — at the cost of also firing for our
    // own smooth scroll, which is what `selfScrollUntil` exists to discount.
    const onScroll = () => { if (Date.now() >= selfScrollUntil.current) seen(); };
    window.addEventListener('wheel', seen, { passive: true });
    window.addEventListener('touchmove', seen, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', seen);
      window.removeEventListener('touchmove', seen);
      window.removeEventListener('scroll', onScroll);
    };
  }, [followArmed]);

  useEffect(() => {
    if (!following || speakingIdx === null) return;
    if (Date.now() - userScrolledAt.current < FOLLOW_PAUSE_MS) return;
    // The element the wash is on, whichever branch below rendered it.
    const el = panelRef.current?.querySelector('[data-speaking="true"]');
    if (!el?.scrollIntoView) return; // jsdom, and any browser that lacks it
    const { top } = el.getBoundingClientRect();
    const bottom = (window.innerHeight || 0) * FOLLOW_BAND_BOTTOM;
    if (top >= FOLLOW_BAND_TOP && top <= bottom) return; // already where they are reading
    // Claim the scrolls this is about to cause, so the listener above does not
    // read our own smooth scroll as the student taking over.
    selfScrollUntil.current = Date.now() + SELF_SCROLL_MS;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [speakingIdx, following, panelRef]);

  // The sections that outline item covers, as a Set of the section objects
  // themselves. Matching on identity rather than on an index because the two
  // render branches below index differently — the grouped one by outline item,
  // the flat one by section — and because a group's tail sections are being read
  // just as much as its heading is.
  const speakingSections = useMemo(() => {
    const item = speakingIdx === null ? null : items[speakingIdx];
    if (!item) return null;
    return new Set(item.head ? [item.head, ...(item.tail ?? [])] : [item.standalone]);
  }, [items, speakingIdx]);

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

  // Told by ListenToTopic which outline item the voice has reached, and whether
  // the student wants the page to follow it.
  //
  // Opening the group here rather than in an effect on `speakingIdx`: the voice
  // reads straight through a topic including the groups the student has
  // collapsed — and only one is open by default — so without this the highlight
  // spends most of a listen inside a closed panel, which is the same as not
  // having it. Opening is deliberately one-way; nothing re-collapses behind the
  // voice, so a student who opened something to read along keeps it open.
  const onSpeakingOutlineIndex = (idx, opts) => {
    setFollowing(opts?.follow !== false);
    setSpeakingIdx(idx);
    if (idx === null) return;
    setFollowArmed(true);
    setOpenSections((prev) => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const toggleAllSections = () =>
    setOpenSections(allSectionsOpen ? new Set() : new Set(headedIndices));

  const jumpToSection = (ii) => {
    setOpenSections((prev) => new Set(prev).add(ii));
    document.getElementById(`${panelId}-sec-${ii}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const lead = firstGroupIdx === -1 ? items : items.slice(0, firstGroupIdx);
  const rest = firstGroupIdx === -1 ? [] : items.slice(firstGroupIdx);

  // The strip above an outline item's block, when the voice is (or was just)
  // there. One strip per topic: a group that produces no speech is skipped by
  // the player, so its index can never arrive here.
  const readAlongFor = (outlineIndex) => (
    readAlong && readAlong.outlineIndex === outlineIndex
      ? <ReadAlongStrip caption={readAlong.caption} />
      : null
  );

  return (
    <div className="border border-coffee-200 rounded-xl bg-paper overflow-hidden">
      {/* Header — heading wraps a real button (WAI-ARIA accordion pattern) */}
      <Heading className="m-0">
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
      </Heading>

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

          {/* Renders nothing without the Web Speech API, or on a topic that is
              listings with a sentence of glue — see canNarrate. No availability
              probe: the voice is on the device, so there is no endpoint to ask. */}
          <ListenToTopic topic={topic} onFinished={onListenFinished} onSpeakingOutlineIndex={onSpeakingOutlineIndex} onReadAlong={onReadAlong} />

          {showKeyPoints && <KeyPoints topic={topic} plain={plain} context={context} />}

          {collapsibleSections ? (
            <>
              {lead.map((it, ii) => (
                <Fragment key={ii}>
                  {readAlongFor(ii)}
                  <Section section={it.standalone} speaking={Boolean(speakingSections?.has(it.standalone))} simplifyReady={simplifyReady} explainReady={explainReady} explanations={explanations} context={sectionContext} />
                </Fragment>
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
                    <Fragment key={ii}>
                      {readAlongFor(ii)}
                      <Section section={it.standalone} speaking={Boolean(speakingSections?.has(it.standalone))} simplifyReady={simplifyReady} explainReady={explainReady} explanations={explanations} context={sectionContext} />
                    </Fragment>
                  );
                }
                const openG = openSections.has(ii);
                return (
                  <Fragment key={ii}>
                    {readAlongFor(ii)}
                    <div>
                      <Section
                        section={it.head}
                        speaking={Boolean(speakingSections?.has(it.head))}
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
                        <Section key={si} section={s} speaking={Boolean(speakingSections?.has(s))} simplifyReady={simplifyReady} explainReady={explainReady} explanations={explanations} context={sectionContext} />
                      ))}
                    </div>
                  </Fragment>
                );
              })}
            </>
          ) : (
            topic.sections.map((section, si) => {
              // Several flat sections can share one outline item (a head with
              // its tail), but the strip belongs above the group — so only the
              // first section of it takes the strip.
              const outlineIndex = outlineIndexBySection.get(section);
              const firstOfGroup = si === 0 || outlineIndexBySection.get(topic.sections[si - 1]) !== outlineIndex;
              return (
                <Fragment key={si}>
                  {firstOfGroup && readAlongFor(outlineIndex)}
                  <Section
                    section={section}
                    speaking={Boolean(speakingSections?.has(section))}
                    simplifyReady={simplifyReady}
                    explainReady={explainReady} explanations={explanations}
                    simplifyText={groupText.get(section)}
                    bundledSimplified={simplifiedForGroup.get(section)}
                    plainEnglishMode={plainEnglish}
                    context={sectionContext}
                  />
                </Fragment>
              );
            })
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
// One part of a course's reading map: a named, collapsible group of topics.
//
// A course with twenty-odd topics rendered as one flat list is a wall — the
// student has to read every title to find out what the course even contains,
// and the length alone is discouraging. Six named parts, five of them closed,
// is a page they can decide something from: "I am revising the machine
// learning half" picks one box, not fourteen rows.
//
// The parts come from the course's own `noteMap`, so this is not a layout the
// component invents — it is the reading order the map already declares, made
// visible. Courses with no map keep the flat list.
function PartSection({ part, isOpen, onToggle, readCount, tracksReading, children }) {
  const uid = useId();
  const buttonId = `part-header-${uid}`;
  const panelId = `part-panel-${uid}`;
  const total = part.indices.length;
  const allRead = tracksReading && readCount === total;

  return (
    <section className="border border-coffee-200 rounded-2xl bg-paper overflow-hidden">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={`w-full px-4 sm:px-5 py-4 text-left transition-colors ${
            isOpen ? 'bg-coffee-50' : 'hover:bg-coffee-50'
          }`}
        >
          {/* Spans, not divs — this is all inside a <button>. */}
          <span className="flex items-center gap-3 sm:gap-4">
            {part.id && (
              <span className="bg-ink text-cream font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg shrink-0">
                Part {part.id}
              </span>
            )}
            <span className="display-heading text-lg sm:text-xl text-ink leading-snug flex-1">
              {part.title}
            </span>
            <span className="hidden sm:block text-xs font-mono text-coffee-500 shrink-0">
              {total} {total === 1 ? 'topic' : 'topics'}
            </span>
            <ChevronDown
              size={18}
              className={`text-coffee-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>

          {part.blurb && (
            <span className="block text-sm text-coffee-600 leading-snug mt-2">{part.blurb}</span>
          )}

          {tracksReading && (
            <span className="flex items-center gap-3 mt-3">
              {/* aria-hidden: the count beside it already says this in words,
                  and role="progressbar" is not valid inside a button. */}
              <span aria-hidden="true" className="h-1.5 flex-1 overflow-hidden rounded-full bg-coffee-100">
                <span
                  className="block h-full rounded-full bg-moss transition-all duration-500"
                  style={{ width: `${total ? (readCount / total) * 100 : 0}%` }}
                />
              </span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-mono shrink-0 ${allRead ? 'font-bold text-moss' : 'text-coffee-500'}`}>
                {allRead && <CheckCircle2 size={12} />}
                {allRead ? `All ${total} read` : `${readCount} of ${total} read`}
              </span>
            </span>
          )}
        </button>
      </h3>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="border-t border-coffee-100 px-3 sm:px-4 pt-3 pb-4 space-y-3"
        >
          {children}
        </div>
      )}
    </section>
  );
}

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

  // The course re-grouped into the parts its map declares, as arrays of indices
  // into `topics` — indices, not copies, so every `openSet` entry, panel id and
  // read mark keeps pointing at the same topic it always did.
  //
  // Topics appear inside their part rather than in printed order. For a course
  // assembled from several sources those differ: CYB 224 prints the big data
  // life cycle last and the whole management half after twenty-two practicals,
  // while its map puts the first with topics 1-3 and the second with topic 4.
  // Nothing is renumbered — the badge still reads "Topic 26", it just sits
  // beside Topic 3, where it is meant to be read.
  const groups = useMemo(() => {
    if (!map?.parts?.length) return [{ id: null, indices: topics.map((_, i) => i) }];

    const byNumber = new Map(topics.map((t, i) => [String(t.number), i]));
    const claimed = new Set();
    const out = map.parts
      .map((p) => {
        const indices = (p.topics || [])
          .map((n) => byNumber.get(String(n)))
          .filter((i) => i !== undefined);
        indices.forEach((i) => claimed.add(i));
        return { id: p.id, title: p.title, blurb: p.blurb, indices };
      })
      // A part whose topics are all still untranscribed would otherwise render
      // as an empty box the student can open and find nothing in.
      .filter((g) => g.indices.length > 0);

    // Transcribed after the map was last updated. Shown in a trailing group
    // rather than silently dropped off the page.
    const unplaced = topics.map((_, i) => i).filter((i) => !claimed.has(i));
    if (unplaced.length) {
      out.push({
        id: null,
        title: 'Also in this course',
        blurb: 'Topics added since this course’s reading map was last updated.',
        indices: unplaced,
      });
    }
    return out;
  }, [topics, map]);

  const grouped = groups.length > 1 || Boolean(groups[0].id);

  // First part open, the rest closed — the point of grouping is that the page
  // does not open as every topic at once, but an all-closed page reads as
  // broken rather than as tidy.
  const [openParts, setOpenParts] = useState(() => new Set([0]));

  const togglePart = (gi) =>
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(gi)) next.delete(gi);
      else next.add(gi);
      return next;
    });

  const toggleAll = () => {
    const opening = !allOpen;
    setOpenSet(opening ? new Set(topics.map((_, i) => i)) : new Set());
    // Expanding every topic inside a collapsed part would expand nothing the
    // student can see, so the parts move with them.
    setOpenParts(opening ? new Set(groups.map((_, gi) => gi)) : new Set());
  };

  // Following a link from one topic to another: open the target and scroll to
  // it. Same idiom as jumpToSection above. A link to a note that is not on the
  // page (a course whose map runs ahead of its transcription) is ignored rather
  // than scrolling to nothing.
  const jumpToTopic = (noteNumber) => {
    const ti = topics.findIndex((t) => String(t.number) === String(noteNumber));
    if (ti === -1) return;
    setOpenSet((prev) => new Set(prev).add(ti));
    // The target usually lives in a different part, and following a link into
    // a collapsed one would scroll to a header that is not on the page.
    const gi = groups.findIndex((g) => g.indices.includes(ti));
    const partWasClosed = gi !== -1 && !openParts.has(gi);
    if (gi !== -1) setOpenParts((prev) => new Set(prev).add(gi));
    // Two frames, not zero: opening the target panel changes the height of
    // everything below it, so measuring before React has re-rendered scrolls to
    // where the header *used* to be and lands mid-topic. The first frame lets
    // the re-render commit, the second lets layout settle after the expansion.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById(`lecture-header-${ti}`)?.scrollIntoView({
        // Instant when a whole part had to be expanded on the way. That inserts
        // a screenful of topics above the target, and a smooth scroll animating
        // towards an offset measured a frame earlier gets overtaken by the
        // reflow and stops short — observed landing on the link you clicked
        // rather than on the topic you asked for. Nothing can overtake a jump.
        behavior: partWasClosed ? 'auto' : 'smooth',
        block: 'start',
      });
    }));
  };

  // Note number -> the part it belongs to, so each topic can name its part
  // without every accordion re-scanning the map.
  const partOf = useMemo(() => {
    const m = new Map();
    (map?.parts || []).forEach((p) => p.topics.forEach((n) => m.set(String(n), p)));
    return m;
  }, [map]);

  const renderTopic = (ti, headingLevel) => {
    const topic = topics[ti];
    return (
      <TopicAccordion
        key={ti}
        topic={topic}
        index={ti}
        headingLevel={headingLevel}
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
        // Only when the list is flat. Once the topics sit under a part header
        // that names the part, repeating it inside every panel is noise.
        mapPart={grouped ? undefined : partOf.get(String(topic.number))}
        onJumpToTopic={jumpToTopic}
      />
    );
  };

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

      {grouped ? (
        <div className="space-y-4">
          {groups.map((g, gi) => (
            <PartSection
              key={g.id ?? `unplaced-${gi}`}
              part={g}
              isOpen={openParts.has(gi)}
              onToggle={() => togglePart(gi)}
              readCount={g.indices.filter((ti) => isRead(topics[ti])).length}
              tracksReading={tracksReading}
            >
              {g.indices.map((ti) => renderTopic(ti, 4))}
            </PartSection>
          ))}
        </div>
      ) : (
        <div className="space-y-3">{groups[0].indices.map((ti) => renderTopic(ti, 3))}</div>
      )}

      <div className="flex items-center gap-2 text-xs text-coffee-500 font-mono pt-5 mt-2">
        <BookOpen size={11} />
        End of uploaded lecture notes · More topics will appear as notes are added
      </div>
    </div>
  );
}
