import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, ArrowLeft, CloudUpload, BookOpen, BrainCircuit, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';

const VALUE_PROPS = [
  { icon: CloudUpload,   text: 'Progress syncs across all your devices automatically' },
  { icon: BookOpen,      text: 'Upload and access course materials shared by your class' },
  { icon: BrainCircuit,  text: 'AI Tutor calibrated to the UniUyo Cybersecurity curriculum' },
  { icon: Shield,        text: '4 years of content — 100L to 400L — always with you' },
];

// Google's brand "G" — lucide has no brand icons, so inline the official mark.
function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden focusable="false">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

export default function SignIn() {
  usePageTitle('Sign In');
  const { user, profileComplete, profileLoading, authLoading, authEnabled, signInWithEmail, signInWithGoogle } = useAuth();
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [resending,   setResending]   = useState(false);
  const [resendError, setResendError] = useState('');
  const [googleStatus, setGoogleStatus] = useState('idle'); // idle | redirecting | error

  if (!authLoading && user && profileComplete) return <Navigate to="/" replace />;
  // Only route an incomplete-profile user to setup once their profile has
  // actually been fetched — otherwise a returning user whose profile is still
  // loading (e.g. right after a Google redirect) flashes through /setup-profile
  // before being bounced back. While it loads, show a spinner, not the form.
  if (!authLoading && user && !profileLoading && !profileComplete) return <Navigate to="/setup-profile" replace />;
  if (!authLoading && user) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center" role="status" aria-label="Signing in">
        <Loader2 size={22} className="animate-spin text-coffee-500" />
        <span className="sr-only">Signing you in…</span>
      </div>
    );
  }

  // Supabase not configured (missing env vars): the auth actions would call
  // into a null client and throw, so surface an unavailable state instead of
  // rendering a form that crashes on submit. Mirrors how AuthButton hides the
  // sign-in link when auth is disabled.
  if (!authLoading && !authEnabled) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-coffee-100 flex items-center justify-center mb-6">
          <Shield size={22} className="text-coffee-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink mb-2">Sign-in is unavailable</h1>
        <p className="text-coffee-700 max-w-sm leading-relaxed mb-8">
          Accounts aren't configured for this deployment yet. You can still browse the
          curriculum, code lab, and tutor as a guest.
        </p>
        <Link to="/" className="btn-primary text-sm">Back to Arete</Link>
      </div>
    );
  }

  const send = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === 'sending') return;
    setStatus('sending');
    const { error } = await signInWithEmail(trimmed);
    setStatus(error ? 'error' : 'sent');
  };

  const google = async () => {
    if (googleStatus === 'redirecting') return;
    setGoogleStatus('redirecting');
    const { error } = await signInWithGoogle();
    // On success the browser navigates away to Google; we only land here on
    // failure (e.g. provider not enabled, network), so re-enable the button.
    if (error) setGoogleStatus('error');
  };

  const resend = async () => {
    if (resending) return;
    setResending(true);
    setResendError('');
    const { error } = await signInWithEmail(email.trim());
    if (error) setResendError('Could not resend the link — try again in a moment.');
    setResending(false);
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] md:grid md:grid-cols-2">

      {/* ── Left panel — branding (desktop only) ── */}
      <div className="hidden md:flex flex-col justify-between bg-ink px-10 py-16">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <img src="/arete.svg" alt="Arete logo" className="w-10 h-10 rounded-xl" />
            <div className="leading-tight">
              <div className="font-display text-xl font-bold text-cream">Arete</div>
              <div className="text-xs text-coffee-500 tracking-wide">Dept of Cybersecurity · UniUyo</div>
            </div>
          </div>

          <p className="font-display text-4xl font-bold text-cream leading-tight mb-4">
            The academic aid<br />built for UniUyo<br />Cybersecurity.
          </p>
          <p className="text-coffee-400 leading-relaxed mb-12 max-w-xs">
            Sign in once. Your progress, materials, and AI tutor follow you everywhere.
          </p>

          <ul className="space-y-6">
            {VALUE_PROPS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-coffee-900 border border-coffee-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={15} className="text-coffee-300" />
                </div>
                <p className="text-sm text-coffee-400 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-coffee-700 mt-16">
          University of Uyo · Department of Cybersecurity
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-coffee-600 hover:text-ink transition-colors mb-12 w-fit"
        >
          <ArrowLeft size={14} /> Back to Arete
        </Link>

        {status === 'sent' ? (
          /* ── Link-sent state ── */
          <div className="animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-moss/10 border border-moss/20 flex items-center justify-center mb-8">
              <Mail size={22} className="text-moss" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink mb-3">Check your email.</h1>
            <p className="text-coffee-700 leading-relaxed mb-2">
              We sent a sign-in link to{' '}
              <span className="font-semibold text-ink">{email}</span>.
            </p>
            <p className="text-coffee-600 text-sm leading-relaxed mb-8">
              Open it <span className="font-medium text-coffee-700">on this device</span> and click the link
              to sign in. It expires shortly and can only be used once.
            </p>

            {resendError && (
              <p className="text-xs text-rust leading-relaxed mb-4">{resendError}</p>
            )}

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={resend}
                disabled={resending}
                className="text-coffee-600 hover:text-ink underline underline-offset-2 transition-colors disabled:opacity-50"
              >
                {resending ? 'Resending…' : 'Resend link'}
              </button>
              <span className="text-coffee-300" aria-hidden>·</span>
              <button
                onClick={() => { setStatus('idle'); setEmail(''); setResendError(''); }}
                className="text-coffee-600 hover:text-ink underline underline-offset-2 transition-colors"
              >
                Use a different email
              </button>
            </div>
          </div>
        ) : (
          /* ── Sign-in form ── */
          <div>
            <h1 className="font-display text-4xl font-bold text-ink mb-2">Welcome.</h1>
            <p className="text-coffee-700 mb-10 leading-relaxed">
              Continue with Google, or get a sign-in link by email.
              No password. No fuss.
            </p>

            <button
              type="button"
              onClick={google}
              disabled={googleStatus === 'redirecting'}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-paper border border-coffee-200 text-sm font-semibold text-ink hover:border-coffee-400 hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon size={17} />
              {googleStatus === 'redirecting' ? 'Redirecting to Google…' : 'Continue with Google'}
            </button>

            {googleStatus === 'error' && (
              <p className="text-xs text-rust leading-relaxed mt-3">
                Could not start Google sign-in — please try again, or use your email below.
              </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 my-6" aria-hidden>
              <div className="h-px flex-1 bg-coffee-100" />
              <span className="text-xs text-coffee-500">or</span>
              <div className="h-px flex-1 bg-coffee-100" />
            </div>

            <form onSubmit={send} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-coffee-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  className="w-full px-4 py-3.5 text-sm bg-cream border border-coffee-200 rounded-xl text-ink placeholder:text-coffee-400 focus:outline-none focus:border-coffee-500 focus:ring-2 focus:ring-coffee-100 transition-all"
                />
              </div>

              {status === 'error' && (
                <p className="text-xs text-rust leading-relaxed">
                  Could not send the code — check the address and try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || !email.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-ink text-cream text-sm font-semibold hover:bg-coffee-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail size={15} />
                {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
              </button>
            </form>

            {/* Mobile value props */}
            <div className="mt-12 pt-8 border-t border-coffee-100 space-y-5 md:hidden">
              {VALUE_PROPS.slice(0, 3).map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-coffee-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-coffee-600" />
                  </div>
                  <p className="text-xs text-coffee-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
