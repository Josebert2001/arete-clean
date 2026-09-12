import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Star, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// Feedback prompt — no floating button any more. The bottom-left corner now
// belongs to the campus map launcher, and a second permanent pill beside it
// read as clutter; a button that is always there is also a button nobody ever
// presses. So this asks once, unprompted, after the student has actually used
// the app for a while, then gets out of the way for a month.
//
// Signed-in only: submissions are tied to auth.uid() and RLS
// (supabase/migrations/20260825000000_feedback.sql) rejects anonymous rows.
const PROMPT_KEY = 'feedback-prompt-v1';

// "Actually used the app" is both conditions, not either. Three minutes with a
// single page open is a student who walked away from their phone; five pages in
// twenty seconds is someone hunting for something they have not found yet.
// Asking either one for a rating gets a rating of the wrong thing.
const MIN_SESSION_MS = 3 * 60 * 1000;
const MIN_PAGES = 5;

// A dismissal is an answer — "not now" — so it is honoured for a month. A
// rating ends it: that student is never asked again.
const SNOOZE_MS = 30 * 24 * 60 * 60 * 1000;

// Progress towards the gate lives in sessionStorage, not in a ref, because a
// ref is wiped by every full page load — and this app gets reloaded a lot: the
// PWA cold-starts, a student follows a shared course link, or simply hits
// refresh. Counting only client-side navigation would mean a student who
// reloads twice an hour is never asked at all. sessionStorage is exactly the
// right scope: it survives reloads within the tab and dies with it, so a new
// visit genuinely starts a new session.
const SESSION_KEY = 'feedback-session-v1';

function readSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (s && typeof s.startedAt === 'number' && Array.isArray(s.pages)) return s;
  } catch {
    /* fall through to a fresh session */
  }
  return null;
}

function writeSession(session) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* private mode — the gate falls back to this page load alone */
  }
}

function readState() {
  try {
    return JSON.parse(localStorage.getItem(PROMPT_KEY)) || null;
  } catch {
    return null;
  }
}

function writeState(status) {
  try {
    localStorage.setItem(PROMPT_KEY, JSON.stringify({ status, at: Date.now() }));
  } catch {
    /* private mode — the prompt simply comes back in a later session */
  }
}

// A missing or unparseable record means "never asked", which is the right
// default: the cost of asking once more is far lower than never asking at all.
function isSuppressed(now = Date.now()) {
  const saved = readState();
  if (!saved) return false;
  if (saved.status === 'rated') return true;
  return saved.status === 'dismissed'
    && typeof saved.at === 'number'
    && now - saved.at < SNOOZE_MS;
}

export default function FeedbackPrompt() {
  const { user, authEnabled } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // Once this page load has asked, it is finished either way. Without this a
  // student whose localStorage write failed would meet the prompt again on the
  // very next navigation.
  const askedThisSession = useRef(false);

  useEffect(() => {
    if (!authEnabled || !user) return undefined;

    // Record the visit before any gate check, so the page the student is on
    // when they are ineligible still counts towards the next check.
    const session = readSession() || { startedAt: Date.now(), pages: [] };
    if (!session.pages.includes(pathname)) session.pages.push(pathname);
    writeSession(session);

    if (askedThisSession.current || isSuppressed()) return undefined;

    const ask = () => {
      askedThisSession.current = true;
      setOpen(true);
    };

    const waited = Date.now() - session.startedAt;
    if (session.pages.length < MIN_PAGES) return undefined;
    if (waited >= MIN_SESSION_MS) {
      ask();
      return undefined;
    }
    // The page count came first. Wait out the remaining time here rather than
    // making the student navigate once more just to be asked — on a long
    // lecture-note page that next navigation may be a while coming.
    const timer = setTimeout(() => {
      if (!askedThisSession.current && !isSuppressed()) ask();
    }, MIN_SESSION_MS - waited);
    return () => clearTimeout(timer);
  }, [pathname, authEnabled, user]);

  // Closing always records an outcome, so the prompt cannot reappear on the
  // next navigation. There is deliberately no click-outside handler: this
  // panel opens unbidden, and dismissing it by accident would silence it for
  // a month without the student ever deciding to.
  const close = useCallback((outcome) => {
    setOpen(false);
    writeState(outcome);
    if (outcome === 'rated') {
      setRating(0);
      setMessage('');
      setStatus('idle');
    }
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close('dismissed');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!authEnabled || !user || !open) return null;

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
    // Recorded the moment it lands, not when the panel is closed: the student
    // has answered, and a reload before they press Close must not re-ask.
    writeState('rated');
  };

  return (
    <div
      role="dialog"
      aria-label="Feedback on Areté"
      className="feedback-pop fixed bottom-24 left-4 z-50 w-[min(20rem,calc(100vw-1.5rem))] print:hidden sm:bottom-28 sm:left-6"
    >
      <div className="bg-paper border border-coffee-200 rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-start justify-between px-4 py-3 border-b border-coffee-200 bg-cream/60">
          <div>
            <h3 className="font-display font-bold text-ink text-base leading-tight">How&apos;s Areté working for you?</h3>
            <p className="text-xs text-coffee-700 mt-0.5">Quick rating, or tell us more.</p>
          </div>
          <button
            onClick={() => close('dismissed')}
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
              onClick={() => close('rated')}
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
              <p className="text-xs text-rust mt-2">Couldn&apos;t send that — please try again.</p>
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
    </div>
  );
}
