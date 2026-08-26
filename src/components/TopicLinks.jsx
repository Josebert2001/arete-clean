import { ArrowLeft, ArrowRight, Repeat2, AlertTriangle } from 'lucide-react';

// The orientation strip at the top of a lecture-note topic.
//
// Some courses are transcribed from material that was never written to be read
// in one pass — CYB 224 is assembled from two sources, introduces anomaly
// detection five separate times, and prints one practical three topics before
// the theory that explains it. A student reading topic 17 has no way to know
// that topic 20 is the missing half.
//
// This strip says so, from data (`src/data/lectureNotes/cyb224Map.js`) rather
// than by editing the transcription. Three relationships, deliberately named
// for what a reader does with them rather than for the graph edge they are:
//
//   Read first  (buildsOn)    — this topic assumes it
//   Finished in (continuesIn) — the rest of this topic lives there
//   Same idea   (alsoSee)     — covered again elsewhere under another heading
//
// Renders nothing when a course declares no map, so every other course is
// unaffected.

const GROUPS = [
  { key: 'buildsOn', label: 'Read first', Icon: ArrowLeft },
  { key: 'continuesIn', label: 'Finished in', Icon: ArrowRight },
  { key: 'alsoSee', label: 'Same idea in', Icon: Repeat2 },
];

export default function TopicLinks({ entry, part, onJumpTo }) {
  if (!entry) return null;

  const groups = GROUPS
    .map((g) => ({ ...g, links: entry[g.key] || [] }))
    .filter((g) => g.links.length > 0);

  if (!groups.length && !entry.warning && !part) return null;

  return (
    <div className="mb-5 rounded-xl border border-coffee-100 bg-coffee-50/60 p-4">
      {part && (
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-coffee-500 uppercase tracking-widest shrink-0">
            Part {part.id}
          </span>
          <span className="text-sm text-ink font-medium">{part.title}</span>
        </div>
      )}

      {entry.warning && (
        <p className="flex items-start gap-2 mb-3 text-sm text-rust">
          <AlertTriangle size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
          <span>{entry.warning}</span>
        </p>
      )}

      {groups.length > 0 && (
        <div className="space-y-2.5">
          {groups.map(({ key, label, Icon, links }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
              <span className="flex items-center gap-1.5 text-xs font-mono text-coffee-500 uppercase tracking-wider shrink-0 sm:w-32">
                <Icon size={12} aria-hidden="true" />
                {label}
              </span>
              {/* One per line. These carry a sentence-long reason each, so
                  wrapping them inline runs two links together into what reads
                  as a single broken sentence. */}
              <ul className="flex flex-col gap-y-1 m-0 p-0 list-none">
                {links.map((link) => (
                  <li key={`${key}-${link.n}`}>
                    <button
                      type="button"
                      onClick={() => onJumpTo?.(link.n)}
                      className="text-left text-sm text-coffee-700 hover:text-ink transition-colors group"
                    >
                      <span className="font-mono font-medium text-ink border-b border-coffee-300 group-hover:border-rust">
                        Topic {link.n}
                      </span>
                      {link.why && <span className="text-coffee-600"> — {link.why}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
