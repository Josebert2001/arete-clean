import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { usePlan } from '../context/PlanContext';
import { FEATURE_LABELS, formatNaira } from '../data/plans';

// Shown in place of a gated action once the free allowance is spent (or, for a
// locked CTF room, instead of the challenge). Says what ran out, when it comes
// back on the free plan, and what Premium costs — so the student can make the
// call on the spot instead of being bounced to a pricing page blind.
export default function UpgradePrompt({ feature, limit, title, children, compact = false }) {
  const { pass } = usePlan();
  const label = FEATURE_LABELS[feature];
  const heading = title || (label && limit
    ? `You've used today's ${limit} free ${label}`
    : 'This is a Premium feature');
  const months = Math.round((pass.durationDays || 180) / 30);

  return (
    <div className={`rounded-xl border border-ember/40 bg-ember/5 ${compact ? 'p-4' : 'p-5 sm:p-6'}`} role="status">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-ember/15 text-ember flex items-center justify-center shrink-0">
          <Sparkles size={18} />
        </div>
        <div className="min-w-0">
          <p className="font-display font-bold text-ink">{heading}</p>
          <div className="mt-1 text-sm text-coffee-700 leading-relaxed">
            {children || (label && limit
              ? 'Your free allowance refills tomorrow. Premium removes the daily limit.'
              : 'Premium unlocks it, along with unlimited AI help and practice.')}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link to="/premium" className="btn-primary text-sm">
              Get Premium · {formatNaira(pass.priceKobo)} for {months} months
            </Link>
            <span className="text-xs text-coffee-500">One payment. Card, transfer or USSD.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
