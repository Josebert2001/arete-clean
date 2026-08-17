import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase, isConfigured } from '../lib/supabase';

// Default value, used only when a consumer renders outside AuthProvider. That
// means no auth is in flight and nobody is signed in, so authLoading is false —
// matching profileLoading beside it. Claiming `true` here would strand any such
// consumer that waits for auth to settle (e.g. useCatalogue) on a load that
// never completes. Inside the provider these are always the real values.
const AuthContext = createContext({
  user: null,
  profile: null,
  authLoading: false,
  profileLoading: false,
  profileComplete: false,
  authEnabled: false,
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
});

// Last profile fetched per student, so a network failure while offline (e.g.
// reopening the installed PWA with no connectivity) can fall back to it
// instead of reading as "no profile" — see loadProfile below.
const PROFILE_CACHE_KEY = 'arete-profile-cache';

function readCachedProfile(userId) {
  try {
    const cached = JSON.parse(localStorage.getItem(PROFILE_CACHE_KEY));
    return cached?.id === userId ? cached : null;
  } catch {
    return null;
  }
}

function cacheProfile(userId, profile) {
  try {
    if (profile) localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
    else if (readCachedProfile(userId)) localStorage.removeItem(PROFILE_CACHE_KEY);
  } catch { /* private mode — skip cache */ }
}

export function AuthProvider({ children }) {
  const [user, setUser]                   = useState(null);
  const [profile, setProfile]             = useState(null);
  // Loading only matters when Supabase is configured (a session to fetch);
  // without it there's nothing to load, so start settled and avoid a
  // synchronous setState in the effect below.
  const [authLoading, setAuthLoading]     = useState(Boolean(supabase));
  const [profileLoading, setProfileLoading] = useState(false);
  // Whose session is currently applied. Compared against every incoming auth
  // event so a re-announcement of the same student is ignored — see the
  // applySession comment below.
  const appliedUserId = useRef(null);

  const loadProfile = useCallback(async (u) => {
    if (!u || !supabase) { setProfile(null); setProfileLoading(false); return; }
    setProfileLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, reg_number, level, department, department_other, selected_courses, created_at')
      .eq('id', u.id)
      .maybeSingle();
    if (error) {
      // A failed fetch (e.g. offline, reopening the installed PWA with no
      // connectivity) looks identical to "no row" unless we check `error`
      // explicitly. Treating it as "no profile" bounced students who had
      // already completed setup back to setup-profile. Fall back to the last
      // profile fetched for this student instead of clearing it.
      setProfile(readCachedProfile(u.id));
      setProfileLoading(false);
      return;
    }
    setProfile(data ?? null);
    cacheProfile(u.id, data ?? null);
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return; // authLoading already initialised to false

    // Adopts a session only when it belongs to a *different* student than the
    // one already applied, and reports whether it did.
    //
    // supabase-js re-announces the current session far more often than the
    // student actually changes: its auth client listens for `visibilitychange`
    // and runs _recoverAndRefresh() on every hidden→visible transition, which
    // ends in an unconditional SIGNED_IN notification. TOKEN_REFRESHED lands on
    // a timer as well. Acting on those replaced `user` with a fresh object and
    // refetched the profile, so profileLoading flipped true→false and
    // useCatalogue fell back to 'loading' — every catalogue page tore down its
    // content for the skeleton and remounted it. Switching to another app or
    // tab and coming back therefore looked exactly like a page refresh: scroll
    // position, open lecture-note sections and in-progress quizzes all reset.
    const applySession = (u) => {
      if ((u?.id ?? null) === appliedUserId.current) return false;
      appliedUserId.current = u?.id ?? null;
      setUser(u);
      if (!u) { setProfile(null); setProfileLoading(false); }
      else loadProfile(u);
      return true;
    };

    supabase.auth.getSession().then(({ data }) => {
      applySession(data.session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      const changed = applySession(u);
      // Mark a genuine sign-in (not a session restore on reload, which fires
      // INITIAL_SESSION) so AuthStateWatcher can resume the user one time.
      // Gated on `changed` so a re-announced session never re-arms the resume.
      if (changed && u && event === 'SIGNED_IN') {
        try { sessionStorage.setItem('arete-just-signed-in', '1'); } catch { /* private mode — skip resume */ }
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  // Passwordless sign-in via a magic link emailed to the student. Supabase's
  // free tier + default email provider only supports its built-in *link*
  // template — custom 6-digit-code templates require a paid plan or custom
  // SMTP — so we use the link flow: the student clicks the emailed link, lands
  // back on /signin, and the PKCE code in the URL is exchanged for a session
  // automatically (detectSessionInUrl). shouldCreateUser registers first-time
  // students. Note: PKCE ties the link to the browser that requested it, so it
  // must be opened on the same device.
  const signInWithEmail = (email) =>
    supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/signin`,
      },
    });

  // Google OAuth. Supabase redirects the user to Google, then back to its own
  // /auth/v1/callback, then here to /signin — whose route guards forward a
  // returning user to /setup-profile (new) or / (existing profile). The
  // redirect target must be in the Supabase Auth "Redirect URLs" allow-list.
  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/signin` },
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
      signInWithGoogle,
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
