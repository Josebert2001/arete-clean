import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquareHeart, X, Star, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// Floating feedback tab — bottom-left, so it never collides with FloatingHelp
// (bottom-right). Signed-in only: submissions are tied to auth.uid() and RLS
// (supabase/migrations/20260825000000_feedback.sql) rejects anonymous rows.
export default function FeedbackTab() {
  const { user, authEnabled } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Reset a finished or failed form on close; leave an in-progress draft alone.
  const dismiss = () => {
    setOpen(false);
    toggleRef.current?.focus();
    setStatus((s) => {
      if (s === 'sent' || s === 'error') {
        setRating(0);
        setMessage('');
        return 'idle';
      }
      return s;
    });
  };

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') dismiss();
    }
    function onClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) dismiss();
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  if (!authEnabled || !user) return null;

  const submit = async () => {
    if (!rating || status === 'sending') return;
    setStatus('sending');
    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      rating,
      message: message.trim() || null,
      page: pathname,
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('sent');
  };

  return (
    <div ref={panelRef} className="fixed bottom-3 left-3 z-50 print:hidden sm:bottom-5 sm:left-5">
      {open && (
        <div className="mb-3 w-[min(20rem,calc(100vw-1.5rem))] bg-paper border border-coffee-200 rounded-xl shadow-xl overflow-hidden">
          <div className="flex items-start justify-between px-4 py-3 border-b border-coffee-200 bg-cream/60">
            <div>
              <h3 className="font-display font-bold text-ink text-base leading-tight">How's Areté working for you?</h3>
              <p className="text-xs text-coffee-700 mt-0.5">Quick rating, or tell us more.</p>
            </div>
            <button
              onClick={dismiss}
              aria-label="Close feedback"
              className="text-coffee-700 hover:text-ink p-1 -mr-1 -mt-1"
            >
              <X size={18} />
            </button>
          </div>

          {status === 'sent' ? (
            <div className="px-4 py-6 flex flex-col items-center text-center gap-2">
              <div className="w-9 h-9 rounded-full bg-moss/20 text-moss flex items-center justify-center">
                <Check size={18} />
              </div>
              <p className="text-sm font-medium text-ink">Thanks — that helps.</p>
              <button
                onClick={dismiss}
                className="mt-1 text-xs font-medium text-coffee-700 hover:text-ink underline"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="px-4 py-4">
              <div className="flex items-center justify-center gap-1.5 mb-4" role="radiogroup" aria-label="Rate Areté">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n === 1 ? '' : 's'}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5"
                  >
                    <Star
                      size={26}
                      className={
                        n <= (hoverRating || rating)
                          ? 'fill-ember-500 text-ember-500'
                          : 'text-coffee-300'
                      }
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Anything you'd like us to know? (optional)"
                aria-label="Feedback message"
                rows={3}
                maxLength={2000}
                className="w-full resize-none bg-transparent border border-coffee-300 focus:border-ember-500 rounded-lg px-3 py-2 text-sm text-ink placeholder:text-coffee-400 outline-none transition-colors"
              />

              {status === 'error' && (
                <p className="text-xs text-rust mt-2">Couldn't send that — please try again.</p>
              )}

              <button
                onClick={submit}
                disabled={!rating || status === 'sending'}
                className="mt-3 w-full rounded-lg bg-ink text-cream text-sm font-medium py-2 hover:bg-coffee-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Send feedback'}
              </button>
            </div>
          )}
        </div>
      )}

      <button
        ref={toggleRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close feedback' : 'Give feedback'}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-ink px-3 py-3 text-cream shadow-lg transition-colors hover:bg-coffee-700 sm:px-4"
      >
        <MessageSquareHeart size={18} />
        <span className="text-sm font-medium hidden sm:inline">Feedback</span>
      </button>
    </div>
  );
}
