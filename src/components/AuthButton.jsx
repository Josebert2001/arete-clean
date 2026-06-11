import { useEffect, useRef, useState } from 'react';
import { LogIn, LogOut, UserCircle2, CloudUpload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthButton() {
  const { user, profile, authEnabled, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const panelRef  = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey   = (e) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const onClick = (e) => { if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClick); };
  }, [open]);

  if (!authEnabled) return null;

  if (!user) {
    return (
      <Link
        to="/signin"
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-coffee-100 transition-colors"
      >
        <LogIn size={16} />
        <span className="hidden lg:inline">Sign in</span>
      </Link>
    );
  }

  const firstName = profile?.full_name?.split(' ')[0] ?? user.email.split('@')[0];
  const initial   = firstName[0]?.toUpperCase() ?? '?';

  return (
    <div ref={panelRef} className="relative">
      <button
        ref={toggleRef}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="Account"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-moss hover:bg-moss/10 transition-colors"
      >
        <div className="w-6 h-6 rounded-md bg-ink flex items-center justify-center text-cream text-[11px] font-bold font-mono shrink-0">
          {initial}
        </div>
        <span className="hidden lg:inline">{firstName}</span>
        {profile?.level && (
          <span className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 bg-moss/15 text-moss rounded-full leading-none">
            {profile.level}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-2rem))] bg-paper border border-coffee-200 rounded-2xl shadow-xl overflow-hidden z-50">
          {/* Profile header */}
          <div className="flex items-start gap-3 p-4 bg-ink">
            <div className="w-11 h-11 rounded-xl bg-coffee-700 flex items-center justify-center shrink-0 font-display font-bold text-xl text-coffee-300">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-cream truncate">{profile?.full_name ?? firstName}</p>
              {profile?.reg_number && (
                <p className="text-[11px] font-mono text-coffee-400 mt-0.5">{profile.reg_number}</p>
              )}
              {profile?.level && (
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 bg-coffee-800 text-coffee-300 rounded-full mt-1.5">
                  {profile.level}
                </span>
              )}
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2.5 px-3 py-2.5 bg-moss/8 border border-moss/15 rounded-xl">
              <CloudUpload size={14} className="text-moss shrink-0" />
              <p className="text-xs text-moss leading-snug">Progress syncing to cloud automatically</p>
            </div>

            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-coffee-200 text-coffee-700 text-xs font-medium hover:bg-coffee-100 hover:text-ink hover:border-coffee-400 transition-all"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
