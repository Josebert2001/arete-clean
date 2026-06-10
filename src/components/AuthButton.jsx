import { useEffect, useRef, useState } from 'react';
import { LogIn, LogOut, UserCircle2, Mail, CloudUpload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthButton() {
  const { user, authEnabled, signInWithEmail, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
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

  if (!authEnabled) return null;

  const sendLink = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === 'sending') return;
    setStatus('sending');
    const { error } = await signInWithEmail(trimmed);
    setStatus(error ? 'error' : 'sent');
  };

  return (
    <div ref={panelRef} className="relative">
      <button
        ref={toggleRef}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={user ? 'Account' : 'Sign in'}
        className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          user ? 'text-moss hover:bg-moss/10' : 'text-ink hover:bg-coffee-100'
        }`}
      >
        {user ? <UserCircle2 size={16} /> : <LogIn size={16} />}
        <span className="hidden lg:inline">{user ? 'Account' : 'Sign in'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(18rem,calc(100vw-2rem))] bg-paper border border-coffee-200 rounded-xl shadow-xl p-4 z-50">
          {user ? (
            <>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-moss/15 flex items-center justify-center shrink-0">
                  <CloudUpload size={17} className="text-moss" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{user.email}</p>
                  <p className="text-xs text-coffee-700 mt-0.5">
                    Progress syncs to the cloud — it follows you across devices.
                  </p>
                </div>
              </div>
              <button
                onClick={() => { signOut(); setOpen(false); }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-coffee-300 text-ink text-xs font-medium hover:bg-coffee-100 transition-colors"
              >
                <LogOut size={13} /> Sign out
              </button>
            </>
          ) : status === 'sent' ? (
            <div className="text-sm text-ink">
              <p className="font-medium mb-1 flex items-center gap-1.5"><Mail size={14} className="text-moss" /> Check your email</p>
              <p className="text-xs text-coffee-700 leading-relaxed">
                We sent a sign-in link to <span className="font-medium text-ink">{email}</span>. Open it on this
                device to finish signing in.
              </p>
            </div>
          ) : (
            <form onSubmit={sendLink}>
              <p className="text-sm font-medium text-ink mb-1">Sync your progress</p>
              <p className="text-xs text-coffee-700 mb-3 leading-relaxed">
                Sign in with your email and your module progress follows you on any device — no password needed.
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full px-3 py-2 mb-2 text-sm bg-cream border border-coffee-200 rounded-lg text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500"
              />
              {status === 'error' && (
                <p className="text-xs text-rust mb-2">Could not send the link. Check the email and try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-ink text-cream text-xs font-medium hover:bg-coffee-700 transition-colors disabled:opacity-50"
              >
                <Mail size={13} />
                {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
