import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { QUOTA_EVENT } from '../utils/quotaEvents';
import { usePlan } from '../context/PlanContext';
import { formatNaira } from '../data/plans';

// App-wide listener for a spent server-side allowance (see utils/quotaEvents).
// The feature that hit the limit still shows its own error; this adds the one
// thing it can't — a way to lift the limit — without each feature needing its
// own upgrade UI.
export default function UpgradeToast() {
  const [notice, setNotice] = useState(null);
  const { pass } = usePlan();
  const { pathname } = useLocation();

  useEffect(() => {
    const onQuota = (e) => setNotice(e.detail || {});
    window.addEventListener(QUOTA_EVENT, onQuota);
    return () => window.removeEventListener(QUOTA_EVENT, onQuota);
  }, []);

  // No point advertising Premium on the page that sells it.
  if (!notice || pathname === '/premium') return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm" role="status" aria-live="polite">
      <div className="rounded-xl border border-ember/40 bg-paper shadow-lg p-4 flex items-start gap-3">
        <Sparkles size={18} className="text-ember shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-ink leading-relaxed">
            {notice.message || "You've used today's free allowance."}
          </p>
          <Link
            to="/premium"
            onClick={() => setNotice(null)}
            className="mt-2 inline-flex text-sm font-semibold text-ember hover:text-ink underline underline-offset-2"
          >
            Get more with Premium — {formatNaira(pass.priceKobo)} per semester
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setNotice(null)}
          aria-label="Dismiss"
          className="text-coffee-500 hover:text-ink shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
