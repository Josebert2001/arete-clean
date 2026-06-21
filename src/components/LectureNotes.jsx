import { useState } from 'react';
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

function DefinitionBox({ text }) {
  return (
    <div className="bg-coffee-50 border-l-4 border-coffee-500 rounded-r-xl px-5 py-4 mb-5">
      <p className="text-sm text-ink leading-relaxed">{text}</p>
    </div>
  );
}

function TermList({ items }) {
  return (
    <ul className="space-y-2 mb-5">
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
    <div className="mb-5 overflow-x-auto rounded-xl border border-coffee-200">
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
  );
}

function CaseStudy({ title, prompt, tasks }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={15} className="text-amber-600 shrink-0" />
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">Case Study / Assignment</span>
      </div>
      {title && <h4 className="font-display font-bold text-ink mb-2">{title}</h4>}
      {prompt && <p className="text-sm text-coffee-700 mb-3 leading-relaxed">{prompt}</p>}
      {tasks && (
        <ol className="space-y-1.5">
          {tasks.map((task, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-coffee-700">
              <span className="font-mono font-bold text-amber-600 shrink-0">{i + 1}.</span>
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

function Section({ section }) {
  return (
    <div className="mb-6">
      {section.heading && (
        <h4 className="font-display font-bold text-ink text-lg mb-3 flex items-center gap-2">
          {section.heading}
          {section.date && (
            <span className="text-xs font-mono font-normal text-coffee-500 ml-1">— {section.date}</span>
          )}
        </h4>
      )}
      {section.type === 'definition' && section.text && <DefinitionBox text={section.text} />}
      {section.type === 'fivers' && <FiveVs items={section.items} />}
      {section.type === 'termlist' && <TermList items={section.items} />}
      {section.type === 'bullets' && <BulletList items={section.items} />}
      {section.type === 'proscons' && <ProsCons advantages={section.advantages} disadvantages={section.disadvantages} />}
      {section.type === 'table' && <ComparisonTable title={section.heading} headers={section.headers} rows={section.rows} />}
      {section.type === 'casestudy' && <CaseStudy title={section.title} prompt={section.prompt} tasks={section.tasks} />}
      {section.type === 'text' && <p className="text-sm text-coffee-700 leading-relaxed mb-3">{section.text}</p>}
      {section.type === 'note' && <NoteBox text={section.text} items={section.items} />}
      {section.type === 'image' && <Figure src={section.src} alt={section.alt} caption={section.caption} width={section.width} height={section.height} />}
    </div>
  );
}

function TopicAccordion({ topic, index, isOpen, onToggle }) {
  const panelId = `lecture-panel-${index}`;
  const buttonId = `lecture-header-${index}`;

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
          {topic.sections.map((section, si) => (
            <Section key={si} section={section} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LectureNotes({ topics }) {
  // First topic open by default; rest collapsed.
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  if (!topics?.length) return null;

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
