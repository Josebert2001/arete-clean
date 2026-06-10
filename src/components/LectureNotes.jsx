import { BookOpen, Lightbulb, Table2, CheckSquare, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

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
    </div>
  );
}

export default function LectureNotes({ topics }) {
  if (!topics?.length) return null;

  return (
    <div className="space-y-10">
      {topics.map((topic, ti) => (
        <div key={ti}>
          {/* Topic header */}
          <div className="flex items-start gap-4 mb-6 pb-4 border-b border-coffee-200">
            <span className="bg-ink text-cream font-mono text-xs font-bold px-2.5 py-1.5 rounded-lg shrink-0 mt-0.5">
              Topic {topic.number}
            </span>
            <div>
              <h3 className="display-heading text-2xl text-ink leading-snug">{topic.title}</h3>
              {topic.date && (
                <span className="text-xs font-mono text-coffee-500 mt-0.5 block">Lecture date: {topic.date}</span>
              )}
            </div>
          </div>

          {/* Sections */}
          {topic.sections.map((section, si) => (
            <Section key={si} section={section} />
          ))}
        </div>
      ))}

      <div className="flex items-center gap-2 text-xs text-coffee-500 font-mono pt-2 border-t border-coffee-100">
        <BookOpen size={11} />
        End of uploaded lecture notes · More topics will appear as notes are added
      </div>
    </div>
  );
}
