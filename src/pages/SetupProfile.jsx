import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, GraduationCap, Hash, Loader2, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';

const LEVELS = ['100L', '200L', '300L', '400L'];

export default function SetupProfile() {
  usePageTitle('Set Up Profile');
  const { user, profileComplete, authLoading, profileLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form,   setForm]   = useState({ full_name: '', reg_number: '', level: '' });
  const [error,  setError]  = useState('');
  const [saving, setSaving] = useState(false);

  if (!authLoading && !user)                      return <Navigate to="/signin" replace />;
  if (!authLoading && !profileLoading && profileComplete) return <Navigate to="/" replace />;

  const setField = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const { full_name, reg_number, level } = form;
    const name = full_name.trim();
    const reg  = reg_number.trim().toUpperCase();
    if (!name || !reg || !level) { setError('Please fill in all fields.'); return; }
    if (reg.length < 4)          { setError('Enter a valid reg number.'); return; }
    // A real reg number always mixes letters and digits (e.g. CYB/21/1234);
    // reject obvious junk before it lands in the department record.
    if (!/[A-Z]/.test(reg) || !/[0-9]/.test(reg)) {
      setError('Enter a valid reg number — it should contain both letters and digits.');
      return;
    }

    setSaving(true);
    setError('');
    const { error: dbErr } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: name,
      reg_number: reg,
      level,
      updated_at: new Date().toISOString(),
    });
    if (dbErr) {
      setError(dbErr.message ?? 'Could not save your profile. Please try again.');
      setSaving(false);
      return;
    }
    await refreshProfile();
    navigate('/welcome', { replace: true });
  };

  const ready = form.full_name.trim() && form.reg_number.trim() && form.level;

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-6 py-14">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 bg-moss/10 text-moss border border-moss/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
            You're signed in
          </span>
          <h1 className="font-display text-3xl font-bold text-ink mb-3">One last step.</h1>
          <p className="text-coffee-700 leading-relaxed">
            Set up your profile so Arete knows who you are.
            This links your progress and uploads to your department record.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6">

          {/* Full name */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
              <User size={12} /> Full name
            </label>
            <input
              type="text"
              required
              value={form.full_name}
              onChange={setField('full_name')}
              placeholder="e.g. Josebert Sunday"
              autoComplete="name"
              autoFocus
              className="w-full px-4 py-3.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
            />
          </div>

          {/* Reg number */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
              <Hash size={12} /> Reg number
            </label>
            <input
              type="text"
              required
              value={form.reg_number}
              onChange={setField('reg_number')}
              placeholder="e.g. CYB/21/1234"
              className="w-full px-4 py-3.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all font-mono tracking-wide"
            />
            <p className="text-xs text-coffee-500 mt-2 pl-0.5">
              As it appears on your university ID card or student portal.
            </p>
          </div>

          {/* Level picker */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-3">
              <GraduationCap size={12} /> Your current level
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {LEVELS.map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, level: l }))}
                  className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    form.level === l
                      ? 'bg-ink border-ink text-cream shadow-sm'
                      : 'bg-cream border-coffee-200 text-coffee-700 hover:border-coffee-400 hover:text-ink'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-rust">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving || !ready}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-ink text-cream text-sm font-semibold hover:bg-coffee-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving
              ? <><Loader2 size={15} className="animate-spin" /> Setting up…</>
              : <>Set up my profile <ArrowRight size={15} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
