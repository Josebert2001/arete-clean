import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, CheckCircle2, Loader2, AlertCircle, ShieldCheck, Smartphone, CalendarClock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePlan } from '../context/PlanContext';
import { usePageTitle } from '../utils/usePageTitle';
import { startCheckout, verifyPayment, referenceFromSearch } from '../utils/billingApi';
import { formatNaira, planComparison, PREMIUM_DAILY_LIMITS, FEATURE_LABELS } from '../data/plans';
import Breadcrumbs from '../components/Breadcrumbs';

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return String(iso).slice(0, 10);
  }
}

const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

// Paystack sends the student back here with ?reference=…. The webhook may
// settle the payment a moment before or after this page asks, so a 'pending'
// answer is retried a few times before we tell the student to check back.
const VERIFY_DELAYS_MS = [0, 2000, 4000, 8000];

export default function Premium() {
  usePageTitle('Premium');
  const { user, authLoading } = useAuth();
  const plan = usePlan();
  const { refresh } = plan;
  const location = useLocation();
  const navigate = useNavigate();
  const reference = referenceFromSearch(location.search);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  // null | { state: 'granted', premiumUntil, reference } | { state: 'pending' | 'failed', message, reference }.
  // While a ?reference is being checked there is no result yet, and the page
  // shows the checking state from that alone.
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!reference || authLoading || !user) return undefined;
    let cancelled = false;
    (async () => {
      let outcome = null;
      for (const delay of VERIFY_DELAYS_MS) {
        if (delay) await sleep(delay);
        if (cancelled) return;
        outcome = await verifyPayment(reference);
        if (cancelled) return;
        if (outcome.status && outcome.status !== 'pending') break;
      }
      if (outcome?.status === 'granted') {
        setResult({ state: 'granted', premiumUntil: outcome.premiumUntil, reference });
        refresh();
      } else if (outcome?.status === 'refunded') {
        setResult({ state: 'refunded', reference, message: 'This payment was refunded. Premium from this payment is not active.' });
        refresh();
      } else if (outcome?.status === 'failed' || outcome?.status === 'abandoned') {
        setResult({ state: 'failed', reference, message: 'The payment was not completed, so you have not been charged. You can try again below.' });
      } else if (outcome?.status === 'pending' || !outcome?.status) {
        setResult({
          state: 'pending',
          reference,
          message: outcome?.error || "Paystack hasn't confirmed this payment yet. Bank transfers can take a few minutes — Premium switches on by itself once it lands. Refresh this page to check.",
        });
      } else {
        setResult({ state: 'failed', reference, message: "We couldn't match this payment to your account. If you were charged, email us with the reference below and we'll sort it out." });
      }
      // Drop ?reference from the address bar so a refresh or a shared link
      // doesn't re-run the check. The result stays in state.
      navigate('/premium', { replace: true });
    })();
    return () => { cancelled = true; };
  }, [reference, authLoading, user, navigate, refresh]);

  const checkout = async () => {
    setBusy(true);
    setError('');
    const data = await startCheckout();
    if (data.authorizationUrl) {
      window.location.assign(data.authorizationUrl);
      return; // leaving the page; keep the button disabled
    }
    setError(data.error || 'Could not start the payment. Please try again.');
    setBusy(false);
  };

  const { pass } = plan;
  const price = formatNaira(pass.priceKobo);
  const months = Math.round(pass.durationDays / 30);
  const billingOff = plan.status !== 'loading' && !plan.enabled;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Premium' }]} />

      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-ember mb-3">
        <Sparkles size={14} /> Areté Premium
      </span>
      <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-3">More room to study with Premium</h1>
      <p className="text-coffee-700 leading-relaxed mb-8 max-w-2xl">
        Lecture notes, outlines and flashcards stay free for everyone — always. Premium raises the
        daily allowances for AI tools and code runs, with unlimited practice quizzes, written exam
        prep and access to every Security CTF room.
      </p>

      {(result || reference) && (
        <PaymentResult
          result={result || (!authLoading && !user
            ? { state: 'pending', reference, message: 'Sign in with the account you paid from to confirm this payment.' }
            : { state: 'checking' })}
        />
      )}

      <section className="rounded-2xl border-2 border-ink bg-paper p-6 sm:p-8 mb-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-coffee-600 mb-1">{pass.name}</p>
            <p className="font-display text-4xl font-bold text-ink">
              {price}
              <span className="text-base font-body font-normal text-coffee-600"> · {months} months</span>
            </p>
          </div>
          {plan.isPremium && (
            <p className="inline-flex items-center gap-2 text-sm text-moss font-medium">
              <CheckCircle2 size={16} /> Premium until {formatDate(plan.premiumUntil)}
            </p>
          )}
        </div>

        <ul className="space-y-2 mb-6 text-sm text-coffee-700">
          <li className="flex items-start gap-2"><CalendarClock size={16} className="text-coffee-500 shrink-0 mt-0.5" /> One payment covers a full semester and its exams. It does not renew by itself.</li>
          <li className="flex items-start gap-2"><Smartphone size={16} className="text-coffee-500 shrink-0 mt-0.5" /> Pay with card, bank transfer or USSD on Paystack&apos;s secure page.</li>
          <li className="flex items-start gap-2"><ShieldCheck size={16} className="text-coffee-500 shrink-0 mt-0.5" /> Areté never sees your card or bank details.</li>
        </ul>

        {billingOff ? (
          <p className="text-sm text-coffee-700 bg-cream border border-coffee-200 rounded-xl px-4 py-3">
            Payments aren&apos;t switched on yet, so every feature is free and unlimited for now.
          </p>
        ) : !authLoading && !user ? (
          <Link to="/signin" className="btn-primary">Sign in to get Premium</Link>
        ) : (
          <button
            type="button"
            onClick={checkout}
            disabled={busy || plan.status === 'loading' || authLoading}
            className="btn-primary disabled:opacity-60"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {plan.isPremium ? `Add another ${months} months · ${price}` : `Get Premium · ${price}`}
          </button>
        )}
        {plan.isPremium && !billingOff && (
          <p className="text-xs text-coffee-500 mt-2">Buying again adds {months} months after your current pass ends — nothing is lost.</p>
        )}
        {error && <p role="alert" className="mt-3 text-sm text-rust">{error}</p>}
      </section>

      <h2 className="font-display text-xl font-bold text-ink mb-4">Free vs Premium</h2>
      <div className="overflow-x-auto rounded-xl border border-coffee-200 mb-3">
        <table className="w-full text-sm">
          <thead className="bg-coffee-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-ink">Feature</th>
              <th className="px-4 py-3 font-semibold text-ink">Free</th>
              <th className="px-4 py-3 font-semibold text-ember">Premium</th>
            </tr>
          </thead>
          <tbody>
            {planComparison().map((row) => (
              <tr key={row.feature} className="border-t border-coffee-200">
                <td className="px-4 py-3 text-ink">{row.feature}</td>
                <td className="px-4 py-3 text-coffee-700">{row.free}</td>
                <td className="px-4 py-3 text-ink font-medium">{row.premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-coffee-500 mb-10">
        Premium daily fair-use limits: {Object.entries(PREMIUM_DAILY_LIMITS).map(([feature, limit]) =>
          `${limit} ${FEATURE_LABELS[feature]}`
        ).join('; ')}. Allowances refill every 24 hours.{' '}
        * Code runs go through a shared execution service with a daily budget for the whole platform.
        Runs can still pause when that shared budget is used up.
      </p>

      <h2 className="font-display text-xl font-bold text-ink mb-4">Questions</h2>
      <div className="space-y-4 text-sm text-coffee-700 leading-relaxed">
        <div>
          <p className="font-semibold text-ink">Will my notes ever be locked?</p>
          <p>No. Lecture notes, course outlines, flashcards and pre-written code walkthroughs are free on every plan.</p>
        </div>
        <div>
          <p className="font-semibold text-ink">I paid but I&apos;m not Premium yet.</p>
          <p>Card payments switch on within seconds. Bank transfers can take a few minutes to confirm — reopen this page and it updates by itself. If it hasn&apos;t after an hour, email <a href="mailto:robertsunday333@gmail.com" className="underline hover:text-ink">robertsunday333@gmail.com</a> with your payment reference.</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Can I use it on my phone and laptop?</p>
          <p>Yes. Premium belongs to your account, not the device — sign in anywhere.</p>
        </div>
      </div>
    </div>
  );
}

function PaymentResult({ result }) {
  if (result.state === 'checking') {
    return (
      <div role="status" className="mb-8 flex items-center gap-3 rounded-xl border border-coffee-200 bg-cream px-4 py-3 text-sm text-coffee-700">
        <Loader2 size={16} className="animate-spin shrink-0" /> Confirming your payment with Paystack…
      </div>
    );
  }
  if (result.state === 'granted') {
    return (
      <div role="status" className="mb-8 flex items-start gap-3 rounded-xl border border-moss/40 bg-moss/10 px-4 py-3 text-sm text-ink">
        <CheckCircle2 size={18} className="text-moss shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Payment confirmed — you&apos;re Premium{result.premiumUntil ? ` until ${formatDate(result.premiumUntil)}` : ''}.</p>
          <p className="text-coffee-700 mt-0.5">Your Premium allowances are active. <Link to="/courses" className="underline hover:text-ink">Back to your courses</Link></p>
        </div>
      </div>
    );
  }
  return (
    <div role="alert" className="mb-8 flex items-start gap-3 rounded-xl border border-rust/40 bg-rust/5 px-4 py-3 text-sm text-ink">
      <AlertCircle size={18} className="text-rust shrink-0 mt-0.5" />
      <div>
        <p>{result.message}</p>
        {result.reference && <p className="text-xs text-coffee-600 mt-1 font-mono break-all">Reference: {result.reference}</p>}
      </div>
    </div>
  );
}
