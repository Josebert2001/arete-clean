import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Hides content behind its own toggle — for the worked answer to a practice
// exercise (`reveal: { label, note }` on a lecture-note code section), so the
// student attempts it first.
//
// Deliberately separate from the notes' section-group collapse: "Expand all"
// and read-aloud open every group, and must not hand over the answers with
// them. Used by both LectureNotes and CodeWalkthrough, so the answer is gated
// on every surface that renders the listing. Without `reveal` it renders its
// children unchanged.
export default function RevealGate({ reveal, children }) {
  const [shown, setShown] = useState(false);
  if (!reveal) return <>{children}</>;
  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-expanded={shown}
        className="inline-flex items-center gap-1.5 rounded-full border border-coffee-200 bg-paper px-3 py-1.5 text-xs font-mono font-medium text-coffee-600 transition-colors hover:border-coffee-400 hover:text-ink"
      >
        <ChevronDown size={13} className={`transition-transform ${shown ? 'rotate-180' : ''}`} />
        {shown ? 'Hide' : (reveal.label || 'Show the answer')}
      </button>
      {shown && <div className="mt-3">{children}</div>}
    </div>
  );
}
