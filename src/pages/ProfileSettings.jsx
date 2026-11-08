import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { supabase, getAccessToken } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { getDepartment } from '../data/departments';
import ProfileForm from '../components/ProfileForm';
import Breadcrumbs from '../components/Breadcrumbs';
import { getGoogleStatus } from '../utils/googleApi';
import { assembleUserData } from '../utils/userDataExport';
import { usePlan } from '../context/PlanContext';
import { formatNaira } from '../data/plans';

// Billing rows are optional in the export: the tables arrive with a migration
// that is applied by hand, and a missing table must not block a student from
// downloading everything else.
async function loadBilling(userId) {
  const [passes, payments] = await Promise.all([
    supabase.from('premium_passes').select('source, reference, starts_at, ends_at, created_at').eq('user_id', userId),
    supabase.from('billing_payments').select('reference, plan, amount_kobo, currency, duration_days, provider, status, created_at, paid_at').eq('user_id', userId),
  ]);
  if (passes.error || payments.error) {
    console.error('ProfileSettings: billing records unavailable for export:', passes.error?.message || payments.error?.message);
    return null;
  }
  return { passes: passes.data ?? [], payments: payments.data ?? [] };
}

function PlanSection() {
  const plan = usePlan();
  if (plan.status !== 'ready' || !plan.enabled) return null;
  const until = plan.premiumUntil
    ? new Date(plan.premiumUntil).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  return (
    <section className="mt-10 rounded-xl border border-ember/40 bg-cream p-5">
      <h2 className="font-display text-lg font-bold text-ink flex items-center gap-2"><Sparkles size={16} className="text-ember" /> Your plan</h2>
      {plan.isPremium ? (
        <p className="mt-1 text-sm text-coffee-700">Premium until <span className="font-medium text-ink">{until}</span>. Higher daily AI allowances and unlimited quizzes and exam prep.</p>
      ) : (
        <p className="mt-1 text-sm text-coffee-700">Free plan — notes are unlimited; AI help, quizzes and exam prep have daily allowances. Premium is {formatNaira(plan.pass.priceKobo)} per semester.</p>
      )}
      <Link to="/premium" className="btn-ghost mt-3 text-sm">{plan.isPremium ? 'Extend Premium' : 'See Premium'}</Link>
    </section>
  );
}

export default function ProfileSettings() {
  usePageTitle('Profile Settings');
  const { user, profile, authLoading, profileLoading, refreshProfile, signOut } = useAuth();
  const [saved, setSaved] = useState(false);
  const [dataError, setDataError] = useState('');
  const [exporting, setExporting] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleting, setDeleting] = useState(false);

  async function deleteAccount() {
    if (deleteText !== 'DELETE') return;
    setDeleting(true);
    setDataError('');
    try {
      const token = await getAccessToken();
      const res = await fetch('/api/account/delete', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ confirm: 'DELETE' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not delete your account. Please try again.');
      await signOut();
    } catch (err) { setDataError(err?.message ?? 'Could not delete your account. Please try again.'); }
    finally { setDeleting(false); }
  }

  async function downloadData() {
    setExporting(true);
    setDataError('');
    try {
      const [progress, attendance, materials, google, billing] = await Promise.all([
        supabase.from('user_progress').select('*').eq('user_id', user.id),
        supabase.from('attendance_records').select('*').eq('student_id', user.id),
        supabase.from('course_materials_visible').select('id, course_code, course_slug, department, display_name, file_size, file_type, description, uploaded_at, uploaded_by_me').eq('uploaded_by_me', true),
        getGoogleStatus(),
        loadBilling(user.id),
      ]);
      if (progress.error || attendance.error || materials.error || google.error) throw new Error('Could not load all your data. Please try again.');
      const data = assembleUserData({ profile, progress: progress.data ?? [], attendance: attendance.data ?? [], materials: materials.data ?? [], google, billing });
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'arete-my-data.json';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setDataError(err?.message ?? 'Could not download your data. Please try again.');
    } finally { setExporting(false); }
  }

  if (!authLoading && !user) return <Navigate to="/signin" replace />;
  // A student with no profile row yet belongs in the first-time setup flow.
  if (!authLoading && !profileLoading && !profile) return <Navigate to="/setup-profile" replace />;

  if (authLoading || profileLoading || !profile) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 animate-pulse" role="status" aria-label="Loading your profile">
        <div className="h-8 w-48 bg-coffee-100 rounded mb-6" />
        <div className="h-4 w-full bg-coffee-100 rounded mb-10" />
        <div className="space-y-6">
          {[0, 1, 2].map(i => <div key={i} className="h-14 bg-coffee-100 rounded-xl" />)}
        </div>
        <span className="sr-only">Loading your profile…</span>
      </div>
    );
  }

  // Returns an error string for ProfileForm to display, or nothing on success.
  const save = async (values) => {
    // selected_courses pins a subset of the FOUNDATION course list by slug
    // (see CoursePicker.jsx). Those slugs are meaningless against a different
    // department's catalogue, so a department change clears the pins rather
    // than silently filtering the new catalogue down to nothing.
    const departmentChanged = values.department !== profile.department;
    const { error } = await supabase
      .from('profiles')
      .update({
        ...values,
        ...(departmentChanged && { selected_courses: null }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) return error.message ?? 'Could not save your changes. Please try again.';
    await refreshProfile();
    setSaved(true);
  };

  const department = getDepartment(profile.department);
  const isFoundation = department.status === 'foundation';

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Profile settings' }]} />

      <div className="mb-10">
        <h1 className="display-heading text-3xl text-ink mb-3">Profile settings</h1>
        <p className="text-coffee-700 leading-relaxed text-sm">
          Update your details, level, or department. Changing your department switches which
          curriculum Areté shows you — your track progress and quiz scores are saved against your
          account, so they carry over.
        </p>
      </div>

      {isFoundation && (
        <div className="mb-8 p-4 bg-cream border border-coffee-200 rounded-xl">
          <p className="text-xs text-coffee-700 leading-relaxed">
            <span className="font-medium text-ink">You're in foundation mode. </span>
            You see the courses shared across University of Uyo programmes. If your department is
            on the list below now, pick it to get its full curriculum.
          </p>
        </div>
      )}

      {saved && (
        <div role="status" className="mb-6 flex items-center gap-2 text-sm text-moss">
          <CheckCircle2 size={15} className="shrink-0" />
          Saved. <Link to="/courses" className="underline hover:text-ink transition-colors">View your courses</Link>
        </div>
      )}

      <ProfileForm
        key={profile.id}
        initial={profile}
        submitLabel="Save changes"
        savingLabel="Saving…"
        onSave={async (values) => { setSaved(false); return save(values); }}
      />
      <PlanSection />
      <section className="mt-10 rounded-xl border border-coffee-200 bg-cream p-5">
        <h2 className="font-display text-lg font-bold text-ink">Your data</h2>
        <p className="mt-1 text-sm text-coffee-700">Download a JSON copy of your profile, progress, attendance, visible uploads, Google connection status, and any Premium payments. Feedback is excluded because it is not readable from your account.</p>
        <button type="button" onClick={downloadData} disabled={exporting} className="btn-ghost mt-3 text-sm">{exporting ? 'Preparing…' : 'Download my data'}</button>
        {dataError && <p role="alert" className="mt-2 text-sm text-rust">{dataError}</p>}
      </section>
      <section className="mt-6 rounded-xl border border-rust/30 bg-cream p-5">
        <h2 className="font-display text-lg font-bold text-ink">Delete my account</h2>
        <p className="mt-1 text-sm text-coffee-700">This removes your profile, progress, uploads, and attendance records. Staff and course reps must contact an admin first.</p>
        <label htmlFor="delete-confirm" className="mt-3 block text-sm text-ink">Type DELETE to confirm</label>
        <input id="delete-confirm" value={deleteText} onChange={e => setDeleteText(e.target.value)} className="mt-1 w-full rounded border border-coffee-300 bg-paper px-3 py-2 text-sm" />
        <button type="button" onClick={deleteAccount} disabled={deleting || deleteText !== 'DELETE'} className="mt-3 rounded bg-rust px-3 py-2 text-sm font-semibold text-cream disabled:opacity-50">{deleting ? 'Deleting…' : 'Delete my account'}</button>
      </section>
    </div>
  );
}
