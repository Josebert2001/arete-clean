import { useState } from 'react';
import { AlertCircle, ArrowRight, GraduationCap, Hash, Loader2, School, User } from 'lucide-react';
import { SELECTABLE_DEPARTMENTS } from '../data/departments';

const LEVELS = ['100L', '200L', '300L', '400L'];

// Sentinel for "my department isn't listed yet" — resolves to the 'general'
// foundation-mode department, with the typed name kept for department_other
// (see departments.js and CLAUDE.md → Common Tasks for how that becomes a
// full department later).
const OTHER_DEPARTMENT = '__other__';

// Shared by SetupProfile (first-time signup) and ProfileSettings (editing
// later), so the validation rules and the department/level pickers can't drift
// between the two. Owns its own field state and error display; the page owns
// what saving actually means.
//
// onSave receives values already resolved out of the OTHER_DEPARTMENT sentinel
// — { full_name, reg_number, level, department, department_other } exactly as
// they should be written to `profiles` — and returns an error string to
// display, or null/undefined on success. reg_number is optional and always
// arrives as a trimmed, uppercased string or null — never ''.
export default function ProfileForm({
  initial = {},
  submitLabel = 'Save',
  savingLabel = 'Saving…',
  onSave,
}) {
  const [form, setForm] = useState({
    full_name: initial.full_name ?? '',
    reg_number: initial.reg_number ?? '',
    level: initial.level ?? '',
    // A stored 'general' department is shown as the "not listed" option, with
    // the free-text name the student typed alongside it.
    department: initial.department === 'general' ? OTHER_DEPARTMENT : (initial.department ?? ''),
    department_other: initial.department_other ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const setField = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const isOtherDept = form.department === OTHER_DEPARTMENT;

  const submit = async (e) => {
    e.preventDefault();
    const name = form.full_name.trim();
    const reg = form.reg_number.trim().toUpperCase();
    const departmentOther = form.department_other.trim();
    if (!name || !form.level || !form.department) { setError('Please fill in all fields.'); return; }
    if (isOtherDept && !departmentOther)  { setError('Please tell us your department.'); return; }
    // Reg number is optional — fresh students often don't have one yet — but
    // whatever is typed must still look real. A real reg number always mixes
    // letters and digits (e.g. CYB/21/1234); reject obvious junk before it
    // lands in the department record.
    if (reg) {
      if (reg.length < 4) { setError('Enter a valid reg number.'); return; }
      if (!/[A-Z]/.test(reg) || !/[0-9]/.test(reg)) {
        setError('Enter a valid reg number — it should contain both letters and digits.');
        return;
      }
    }

    setSaving(true);
    setError('');
    const message = await onSave({
      full_name: name,
      // Never save '' — the DB's format CHECK constraint passes automatically
      // on NULL but would reject an empty string.
      reg_number: reg || null,
      level: form.level,
      department: isOtherDept ? 'general' : form.department,
      department_other: isOtherDept ? departmentOther : null,
    });
    // On success the page navigates away or re-renders; only re-enable the
    // form when it hands back something to show.
    if (message) {
      setError(message);
      setSaving(false);
    }
  };

  const ready = form.full_name.trim() && form.level && form.department
    && (!isOtherDept || form.department_other.trim());

  return (
    <form onSubmit={submit} className="space-y-6">

      {/* Full name */}
      <div>
        <label htmlFor="profile-full-name" className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
          <User size={12} /> Full name
        </label>
        <input
          id="profile-full-name"
          type="text"
          required
          value={form.full_name}
          onChange={setField('full_name')}
          placeholder="e.g. Josebert Sunday"
          autoComplete="name"
          className="w-full px-4 py-3.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
        />
      </div>

      {/* Reg number */}
      <div>
        <label htmlFor="profile-reg-number" className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-2">
          <Hash size={12} /> Reg number <span className="font-normal text-coffee-500">(optional)</span>
        </label>
        <input
          id="profile-reg-number"
          type="text"
          value={form.reg_number}
          onChange={setField('reg_number')}
          placeholder="e.g. CYB/21/1234"
          className="w-full px-4 py-3.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all font-mono tracking-wide"
        />
        <p className="text-xs text-coffee-500 mt-2 pl-0.5">
          Add it now or later in Profile settings — it links you to materials shared for your class.
        </p>
      </div>

      {/* Department picker */}
      <div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-3">
          <School size={12} /> Your department
        </span>
        <div className="grid grid-cols-1 gap-2.5">
          {SELECTABLE_DEPARTMENTS.map(dept => (
            <button
              key={dept.slug}
              type="button"
              aria-pressed={form.department === dept.slug}
              onClick={() => setForm(f => ({ ...f, department: dept.slug }))}
              className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 text-left transition-all ${
                form.department === dept.slug
                  ? 'bg-ink border-ink text-cream shadow-sm'
                  : 'bg-cream border-coffee-200 text-coffee-700 hover:border-coffee-400 hover:text-ink'
              }`}
            >
              {dept.name}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={isOtherDept}
            onClick={() => setForm(f => ({ ...f, department: OTHER_DEPARTMENT }))}
            className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 text-left transition-all ${
              isOtherDept
                ? 'bg-ink border-ink text-cream shadow-sm'
                : 'bg-cream border-coffee-200 text-coffee-700 hover:border-coffee-400 hover:text-ink'
            }`}
          >
            My department isn't listed yet
          </button>
        </div>
        {isOtherDept && (
          <div className="mt-3">
            <input
              type="text"
              value={form.department_other}
              onChange={setField('department_other')}
              maxLength={60}
              aria-label="Your department name"
              placeholder="e.g. Mechanical Engineering"
              className="w-full px-4 py-3.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
            />
            <p className="text-xs text-coffee-500 mt-2 pl-0.5">
              You'll get the shared foundation courses and every interactive track now. That shared
              list is richest at 100–200 level; the four interactive tracks are complete at every
              level. Your full curriculum follows once we add your department.
            </p>
          </div>
        )}
      </div>

      {/* Level picker */}
      <div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-coffee-700 mb-3">
          <GraduationCap size={12} /> Your current level
        </span>
        <div className="grid grid-cols-4 gap-2.5">
          {LEVELS.map(l => (
            <button
              key={l}
              type="button"
              aria-pressed={form.level === l}
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
        <div role="alert" className="flex items-center gap-2 text-sm text-rust">
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
          ? <><Loader2 size={15} className="animate-spin" /> {savingLabel}</>
          : <>{submitLabel} <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}
