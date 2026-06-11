import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  profile: null,
  authLoading: true,
  profileLoading: false,
  profileComplete: false,
  authEnabled: false,
  signInWithEmail: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser]                   = useState(null);
  const [profile, setProfile]             = useState(null);
  const [authLoading, setAuthLoading]     = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const loadProfile = useCallback(async (u) => {
    if (!u || !supabase) { setProfile(null); setProfileLoading(false); return; }
    setProfileLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, reg_number, level, created_at')
      .eq('id', u.id)
      .maybeSingle();
    setProfile(data ?? null);
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) { setAuthLoading(false); return; }

    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      setAuthLoading(false);
      loadProfile(u);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (!u) { setProfile(null); setProfileLoading(false); }
      else loadProfile(u);
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const signInWithEmail = (email) =>
    supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });

  const signOut = () => supabase.auth.signOut();

  const refreshProfile = () => loadProfile(user);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      authLoading,
      profileLoading,
      profileComplete: !!profile,
      authEnabled: isConfigured,
      signInWithEmail,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
