import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import { getDepartment } from '../data/departments';
import ProfileForm from '../components/ProfileForm';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProfileSettings() {
  usePageTitle('Profile Settings');
  const { user, profile, authLoading, profileLoading, refreshProfile } = useAuth();
  const [saved, setSaved] = useState(false);

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
    </div>
  );
}
