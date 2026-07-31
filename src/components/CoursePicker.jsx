import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// Lets a foundation-mode student (see data/departments.js — no full catalogue
// authored for their department yet) pin the subset of shared courses that
// match their own programme, instead of always seeing every course for their
// level. An empty/cleared selection saves `null`, which means "auto — show
// everything for my level", matching today's behaviour for everyone else.
export default function CoursePicker({ catalogue }) {
  const { user, profile, refreshProfile } = useAuth();
  const [selected, setSelected] = useState(() => new Set(profile?.selected_courses ?? []));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const groups = useMemo(() => {
    const byLevel = new Map();
    for (const course of catalogue.courses) {
      if (!byLevel.has(course.level)) byLevel.set(course.level, []);
      byLevel.get(course.level).push(course);
    }
    return Array.from(byLevel.entries())
      .sort(([a], [b]) => a - b)
      .map(([level, courses]) => ({
        level,
        courses: [...courses].sort((a, b) => a.semester - b.semester || a.code.localeCompare(b.code)),
      }));
  }, [catalogue.courses]);

  const toggle = (slug) => {
    setSaved(false);
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  };

  const persist = async (list) => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const { error: dbErr } = await supabase
        .from('profiles')
        .update({ selected_courses: list, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (dbErr) {
        setError(dbErr.message || 'Could not save your courses. Please try again.');
        return;
      }
      setSaved(true);
      await refreshProfile();
    } catch {
      setError('Could not save your courses — check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const save = () => persist(selected.size ? Array.from(selected) : null);
  const showEverything = () => { setSelected(new Set()); persist(null); };

  return (
    <div className="bg-paper border border-coffee-200 rounded-2xl p-6">
      <h3 className="font-display font-bold text-ink mb-1">My courses</h3>
      <p className="text-xs text-coffee-600 leading-relaxed max-w-lg mb-5">
        Tick the courses that match your own programme, so Areté and your study planner focus on
        just those. Leave nothing ticked to keep seeing every foundation course for your level.
      </p>

      <div className="space-y-5">
        {groups.map(({ level, courses }) => (
          <div key={level}>
            <p className="text-xs font-mono uppercase tracking-widest text-coffee-500 mb-2">{level}L</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {courses.map(course => {
                const isOn = selected.has(course.slug);
                return (
                  <button
                    key={course.slug}
                    type="button"
                    onClick={() => toggle(course.slug)}
                    aria-pressed={isOn}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-left text-sm transition-colors ${
                      isOn
                        ? 'bg-moss/10 border-moss/40 text-ink'
                        : 'bg-cream border-coffee-200 text-coffee-700 hover:border-coffee-400'
                    }`}
                  >
                    {isOn
                      ? <CheckCircle2 size={15} className="text-moss shrink-0" />
                      : <Circle size={15} className="text-coffee-300 shrink-0" />}
                    <span className="truncate">
                      <span className="font-mono text-xs text-coffee-500 mr-1.5">{course.code}</span>
                      {course.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-coffee-100">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="btn-primary text-sm inline-flex items-center gap-2 disabled:opacity-50"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          Save my courses
        </button>
        <button type="button" onClick={showEverything} disabled={saving} className="btn-ghost text-sm">
          Show everything instead
        </button>
        {saved && !error && <span className="text-xs text-moss">Saved.</span>}
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-rust mt-3">
          <AlertCircle size={14} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
