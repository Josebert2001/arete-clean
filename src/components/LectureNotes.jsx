import { useState, useRef, useEffect, useMemo } from 'react';
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle2, XCircle, ChevronDown, Layers, List, Sparkles, FileDown, ExternalLink } from 'lucide-react';
import MoscaCalculator from './MoscaCalculator';
import CodeBlock from './CodeBlock';
import RichText from './RichText';
import { useApiAvailability } from '../utils/apiClient';
import {
  sectionToPlainText,
  getCachedSimplification,
  requestSimplification,
} from '../utils/simplifySection';

function DefinitionBox({ text }) {
  return (
    <div className="bg-coffee-50 border-l-4 border-coffee-500 rounded-r-xl px-5 py-4 mb-5">
      <p className="text-sm text-ink leading-relaxed">{text}</p>
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
                <span className="block font-display font-bold text-ink leading-snug">{item.term}</span>
                {isOpen ? (
                  <span className="block mt-2 text-sm text-coffee-700 leading-relaxed">{item.def}</span>
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
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-mono font-bold text-coffee-700 shrink-0 w-5 pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-ink">
                {'term' in item ? (
                  <><span className="font-semibold">{item.term}</span>
                  {item.def && <span className="text-coffee-700"> — {item.def}</span>}</>
                ) : item}
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
    <ul className="space-y-1.5 mb-5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-coffee-700">
          <span className="w-1.5 h-1.5 rounded-full bg-coffee-400 shrink-0 mt-2" />
          <span>{item}</span>
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
            <li key={i} className="flex gap-2 text-sm text-coffee-700">
              <CheckCircle2 size={13} className="text-moss shrink-0 mt-0.5" />
              {a}
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
            <li key={i} className="flex gap-2 text-sm text-coffee-700">
              <XCircle size={13} className="text-rust shrink-0 mt-0.5" />
              {d}
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
      {title && <h4 className="font-display font-bold text-ink mb-2">{title}</h4>}
      <div className="overflow-x-auto rounded-xl border border-coffee-200">
        <table className="w-full text-sm">
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
                  {cell}
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
      {title && <h4 className="font-display font-bold text-ink mb-2">{title}</h4>}
      {prompt && <p className="text-sm text-coffee-700 mb-3 leading-relaxed">{prompt}</p>}
      {tasks && (
        <ol className="space-y-1.5">
          {tasks.map((task, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-coffee-700">
              <span className="font-mono font-bold text-ember-500 shrink-0">{i + 1}.</span>
              {task}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function Figure({ src, alt, caption, width, height }) {
  return (
    <figure className="mb-5">
      <div className="rounded-xl border border-coffee-200 bg-paper p-3">
        {/* width/height are the intrinsic pixel size — with w-full h-auto the
            browser uses them only to reserve aspect-ratio space, preventing
            layout shift as the lazy image loads. */}
        <img src={src} alt={alt || caption || ''} loading="lazy" width={width} height={height} className="w-full h-auto rounded-lg" />
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
      {text && <p className="text-sm text-coffee-700 leading-relaxed">{text}</p>}
      {items && (
        <ul className={`space-y-1.5 ${text ? 'mt-2' : ''}`}>
          {items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-coffee-700">
              <span className="w-1.5 h-1.5 rounded-full bg-moss shrink-0 mt-2" />
              <span>{item}</span>
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

// Section types worth an AI rewrite; text/image/note/casestudy are either
// already plain, already editorial, or have no prose to simplify.
const SIMPLIFIABLE_TYPES = new Set(['definition', 'bullets', 'termlist', 'table', 'proscons']);
const MIN_SIMPLIFY_CHARS = 260;
const MAX_SIMPLIFY_CHARS = 4000;

function Section({ section, simplifyReady, context, collapsible = false, isOpen = true, onToggle, anchorId }) {
  const [simplify, setSimplify] = useState({ status: 'idle', text: '', error: '' });
  const abortRef = useRef(null);
  useEffect(() => () => abortRef.current?.abort(), []);
  const open = !collapsible || isOpen;

  const plain = sectionToPlainText(section);
  const canSimplify =
    simplifyReady &&
    Boolean(section.heading) &&
    SIMPLIFIABLE_TYPES.has(section.type) &&
    plain.length >= MIN_SIMPLIFY_CHARS &&
    plain.length <= MAX_SIMPLIFY_CHARS;

  const onSimplify = async () => {
    if (simplify.status === 'done') {
      setSimplify({ status: 'idle', text: '', error: '' });
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
          className={`font-display font-bold text-ink text-lg flex items-center gap-2 scroll-mt-24 ${open ? 'mb-3' : 'mb-0'}`}
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
              <span className="flex-1">{section.heading}</span>
              {section.date && (
                <span className="text-xs font-mono font-normal text-coffee-500">— {section.date}</span>
              )}
            </button>
          ) : (
            <>
              {section.heading}
              {section.date && (
                <span className="text-xs font-mono font-normal text-coffee-500 ml-1">— {section.date}</span>
              )}
            </>
          )}
          {canSimplify && open && (
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

          {simplify.status === 'done' && (
            <div className="bg-coffee-50 border border-coffee-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={13} className="text-ember-500 shrink-0" />
                <span className="text-xs font-mono font-bold text-coffee-600 uppercase tracking-wider">In plain English</span>
              </div>
              <div className="text-sm text-ink">
                <RichText text={simplify.text} />
              </div>
            </div>
          )}

          {section.type === 'definition' && section.text && <DefinitionBox text={section.text} />}
          {section.type === 'fivers' && <FiveVs items={section.items} />}
          {section.type === 'termlist' && <TermList items={section.items} />}
          {section.type === 'bullets' && <BulletList items={section.items} />}
          {section.type === 'proscons' && <ProsCons advantages={section.advantages} disadvantages={section.disadvantages} />}
          {/* heading is rendered by the section-level <h4> above, like every other type — don't repeat it inside the table */}
          {section.type === 'table' && <ComparisonTable headers={section.headers} rows={section.rows} />}
          {section.type === 'casestudy' && <CaseStudy title={section.title} prompt={section.prompt} tasks={section.tasks} />}
          {section.type === 'text' && <p className="text-sm text-coffee-700 leading-relaxed mb-3">{section.text}</p>}
          {section.type === 'note' && <NoteBox text={section.text} items={section.items} />}
          {section.type === 'image' && <Figure src={section.src} alt={section.alt} caption={section.caption} width={section.width} height={section.height} />}
          {section.type === 'code' && <CodeBlock code={section.code} language={section.language || 'python'} showLineNumbers={false} />}
          {section.type === 'mosca' && <MoscaCalculator />}
          {section.type === 'resource' && <ResourceLink href={section.href} label={section.label} filename={section.filename} meta={section.meta} />}
        </>
      )}
    </div>
  );
}

// Splits a topic's flat section list into an outline: each heading-bearing
// section starts a collapsible group that absorbs the headingless sections
// after it. `resource` download cards stay standalone (always visible) so a
// collapsed last section can't bury them.
function buildOutline(sections) {
  const items = [];
  let lastGroup = null;
  for (const s of sections) {
    if (s.type === 'resource') {
      items.push({ standalone: s });
    } else if (s.heading) {
      lastGroup = { head: s, tail: [] };
      items.push(lastGroup);
    } else if (lastGroup) {
      lastGroup.tail.push(s);
    } else {
      items.push({ standalone: s });
    }
  }
  return items;
}

function TopicAccordion({ topic, index, isOpen, onToggle, simplifyReady, context }) {
  const panelId = `lecture-panel-${index}`;
  const buttonId = `lecture-header-${index}`;

  const items = useMemo(() => buildOutline(topic.sections), [topic.sections]);
  const firstGroupIdx = items.findIndex((it) => it.head);
  const headedIndices = items.reduce((acc, it, ii) => (it.head ? [...acc, ii] : acc), []);
  // Sub-sections collapse only when there are enough of them to feel like a
  // wall of text; the first one starts open so the topic never looks empty.
  const collapsibleSections = headedIndices.length >= 2;
  const [openSections, setOpenSections] = useState(() => new Set(firstGroupIdx >= 0 ? [firstGroupIdx] : []));
  const allSectionsOpen = headedIndices.every((ii) => openSections.has(ii));

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
          <span className="bg-ink text-cream font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg shrink-0">
            Topic {topic.number}
          </span>
          <span className="display-heading text-base sm:text-lg text-ink leading-snug flex-1">
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
          role="region"
          aria-labelledby={buttonId}
          className="px-4 sm:px-5 pt-2 pb-5 border-t border-coffee-100"
        >
          {topic.date && (
            <span className="sm:hidden text-xs font-mono text-coffee-500 mb-4 block">Lecture date: {topic.date}</span>
          )}

          {collapsibleSections ? (
            <>
              {lead.map((it, ii) => (
                <Section key={ii} section={it.standalone} simplifyReady={simplifyReady} context={sectionContext} />
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
                            {it.head.heading}
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
                    <Section key={ii} section={it.standalone} simplifyReady={simplifyReady} context={sectionContext} />
                  );
                }
                const openG = openSections.has(ii);
                return (
                  <div key={ii}>
                    <Section
                      section={it.head}
                      simplifyReady={simplifyReady}
                      context={sectionContext}
                      collapsible
                      isOpen={openG}
                      onToggle={() => toggleSection(ii)}
                      anchorId={`${panelId}-sec-${ii}`}
                    />
                    {openG && it.tail.map((s, si) => (
                      <Section key={si} section={s} simplifyReady={simplifyReady} context={sectionContext} />
                    ))}
                  </div>
                );
              })}
            </>
          ) : (
            topic.sections.map((section, si) => (
              <Section key={si} section={section} simplifyReady={simplifyReady} context={sectionContext} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function LectureNotes({ topics, context }) {
  // Split so the /api/simplify availability probe in the inner component only
  // fires on courses that actually have lecture notes.
  if (!topics?.length) return null;
  return <LectureNotesInner topics={topics} context={context} />;
}

function LectureNotesInner({ topics, context }) {
  // First topic open by default; rest collapsed.
  const [openSet, setOpenSet] = useState(() => new Set([0]));
  const simplifyStatus = useApiAvailability('/api/simplify');

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

  return (
    <div>
      {/* Expand / collapse all */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-coffee-500">
          {topics.length} {topics.length === 1 ? 'topic' : 'topics'}
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-mono font-medium text-coffee-600 hover:text-ink transition-colors"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
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
            context={context}
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
