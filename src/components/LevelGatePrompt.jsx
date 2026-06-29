import { useEffect } from 'react';
import { X, LogIn, CloudUpload, BrainCircuit, BookOpen } from 'lucide-react';
import { levelMeta } from '../data/courses';

const GATE_BENEFITS = [
  { icon: CloudUpload,  text: 'Your progress saves and follows you across your phone and laptop' },
  { icon: BrainCircuit, text: 'The AI Tutor tailors help to where you are in the course' },
  { icon: BookOpen,     text: 'Pick up right where you left off, every time' },
];

// ─── The soft, dismissible sign-in prompt ─────────────────────────────────────
// Explains *why* signing in helps and what guest mode means, so the choice is
// informed rather than a blank wall.

export function LevelGatePrompt({ level, onSignIn, onGuest, onClose }) {
  const meta = levelMeta[level];

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="level-gate-title"
        className="relative w-full max-w-md bg-paper border border-coffee-200 rounded-2xl shadow-xl overflow-hidden animate-fade-in"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 text-coffee-500 hover:text-ink transition-colors"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="w-11 h-11 rounded-xl bg-moss/10 border border-moss/20 flex items-center justify-center mb-5">
            <LogIn size={20} className="text-moss" />
          </div>

          <h2 id="level-gate-title" className="display-heading text-2xl text-ink mb-2">
            Sign in to save your {meta.label} progress
          </h2>
          <p className="text-sm text-coffee-700 leading-relaxed mb-5">
            Arete is free to browse — signing in (one tap, no password) just unlocks a few things worth having:
          </p>

          <ul className="space-y-3 mb-7">
            {GATE_BENEFITS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-coffee-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={13} className="text-coffee-600" />
                </div>
                <p className="text-sm text-coffee-700 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>

          <button
            onClick={onSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink text-cream text-sm font-semibold hover:bg-coffee-700 transition-colors mb-3"
          >
            <LogIn size={15} /> Sign in or sign up
          </button>
          <button
            onClick={onGuest}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-coffee-700 hover:bg-coffee-100 transition-colors"
          >
            Continue without signing in
          </button>
          <p className="text-xs text-coffee-500 text-center mt-3 leading-relaxed">
            No account needed to read — your progress just stays on this one device.
          </p>
        </div>
      </div>
    </div>
  );
}
