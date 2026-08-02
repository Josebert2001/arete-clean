import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';
import ProfileForm from '../components/ProfileForm';

export default function SetupProfile() {
  usePageTitle('Set Up Profile');
  const { user, profileComplete, authLoading, profileLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && !user)                              return <Navigate to="/signin" replace />;
  if (!authLoading && !profileLoading && profileComplete) return <Navigate to="/" replace />;

  // Returns an error string for ProfileForm to display, or nothing on success.
  const save = async (values) => {
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      ...values,
      updated_at: new Date().toISOString(),
    });
    if (error) return error.message ?? 'Could not save your profile. Please try again.';
    await refreshProfile();
    navigate('/welcome', { replace: true });
  };

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
            Set up your profile so Areté knows who you are.
            This links your progress and uploads to your department record.
          </p>
        </div>

        <ProfileForm
          submitLabel="Set up my profile"
          savingLabel="Setting up…"
          onSave={save}
        />
      </div>
    </div>
  );
}
