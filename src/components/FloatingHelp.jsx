import { useState, useEffect, useRef } from 'react';
import { HelpCircle, X, MessageCircle, Mail } from 'lucide-react';

// Edit these to set the humans students can reach for each track.
// phone is in international format with no +, spaces, or dashes (used in wa.me link).
// email is optional — omit it to show WhatsApp only.
const CONTACTS = [
  {
    track: 'C',
    name: 'Mally',
    role: 'C track mentor',
    phone: '2348146212376',
  },
  {
    track: 'Python',
    name: 'Edikan',
    role: 'Python track mentor',
    phone: '2348139576211',
  },
];

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-50 print:hidden">
      {open && (
        <div className="mb-3 w-[19rem] max-w-[calc(100vw-2.5rem)] bg-paper border border-coffee-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-start justify-between px-4 py-3 border-b border-coffee-200 bg-cream/60">
            <div>
              <h3 className="font-display font-bold text-ink text-base leading-tight">Need help?</h3>
              <p className="text-xs text-coffee-700 mt-0.5">
                Talk to a real person if something isn't clear.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close help"
              className="text-coffee-700 hover:text-ink p-1 -mr-1 -mt-1"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="divide-y divide-coffee-100">
            {CONTACTS.map((c) => (
              <li key={c.track} className="px-4 py-3">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-display font-bold text-ink text-sm">
                      {c.track} track
                    </div>
                    <div className="text-xs text-coffee-700 truncate">
                      {c.name} · {c.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href={`https://wa.me/${c.phone}?text=${encodeURIComponent(
                      `Hi ${c.name}, I'm stuck on the ${c.track} track on Arete and need help.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ink text-cream text-xs font-medium hover:bg-coffee-700 transition-colors"
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                  {c.email && (
                    <a
                      href={`mailto:${c.email}?subject=${encodeURIComponent(
                        `Arete ${c.track} track — need help`
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-coffee-300 text-ink text-xs font-medium hover:bg-coffee-100 transition-colors"
                    >
                      <Mail size={14} />
                      Email
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="px-4 py-2.5 text-[11px] text-coffee-600 bg-cream/40 border-t border-coffee-100">
            Replies usually within a day. For track-specific help, ask in your class group.
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close help' : 'Open help'}
        aria-expanded={open}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-ink text-cream shadow-lg hover:bg-coffee-700 transition-colors"
      >
        <HelpCircle size={18} />
        <span className="text-sm font-medium hidden sm:inline">Need help?</span>
      </button>
    </div>
  );
}
