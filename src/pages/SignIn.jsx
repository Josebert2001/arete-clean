import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, CloudUpload, BookOpen, BrainCircuit, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';

const VALUE_PROPS = [
  { icon: CloudUpload,   text: 'Progress syncs across all your devices automatically' },
  { icon: BookOpen,      text: 'Upload and access course materials shared by your class' },
  { icon: BrainCircuit,  text: 'AI Tutor calibrated to the UniUyo Cybersecurity curriculum' },
  { icon: Shield,        text: '4 years of content — 100L to 400L — always with you' },
];

export default function SignIn() {
  usePageTitle('Sign In');
  const { user, profileComplete, authLoading, signInWithEmail } = useAuth();
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  if (!authLoading && user && profileComplete)  return <Navigate to="/" replace />;
  if (!authLoading && user && !profileComplete) return <Navigate to="/setup-profile" replace />;

  const send = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || status === 'sending') return;
    setStatus('sending');
    const { error } = await signInWithEmail(trimmed);
    setStatus(error ? 'error' : 'sent');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] md:grid md:grid-cols-2">

      {/* ── Left panel — branding (desktop only) ── */}
      <div className="hidden md:flex flex-col justify-between bg-ink px-10 py-16">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-coffee-800 flex items-center justify-center">
              <span className="font-display text-[1.35rem] font-bold leading-none text-coffee-300">a</span>
            </div>
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
          /* ── Email sent state ── */
          <div className="animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-moss/10 border border-moss/20 flex items-center justify-center mb-8">
              <Mail size={22} className="text-moss" />
            </div>
            <h1 className="font-display text-3xl font-bold text-ink mb-3">Check your email.</h1>
            <p className="text-coffee-700 leading-relaxed mb-8">
              We sent a sign-in link to{' '}
              <span className="font-semibold text-ink">{email}</span>.
              Open it on this device to finish signing in.
              The link expires in 1 hour.
            </p>
            <div className="flex items-start gap-3 px-4 py-3.5 bg-cream border border-coffee-200 rounded-2xl text-sm text-coffee-700 mb-8">
              <CheckCircle2 size={16} className="text-coffee-400 mt-0.5 shrink-0" />
              No password needed — ever. Just click the link in your email.
            </div>
            <button
              onClick={() => { setStatus('idle'); setEmail(''); }}
              className="text-sm text-coffee-600 hover:text-ink underline underline-offset-2 transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          /* ── Sign-in form ── */
          <div>
            <h1 className="font-display text-4xl font-bold text-ink mb-2">Welcome.</h1>
            <p className="text-coffee-700 mb-10 leading-relaxed">
              Enter your email and we'll send you a sign-in link.
              No password. No fuss.
            </p>

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
                  Could not send the link — check the address and try again.
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
