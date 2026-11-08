// ============================================================================
//  Arete — Plan entitlement + free-tier daily quotas (Vercel functions)
//
//  Every metered endpoint calls denyIfOverDailyQuota() right after its existing
//  per-10-minute limit. That short limit bounds abuse for everyone; this is the
//  free-tier allowance and the higher Premium fair-use allowance.
//
//  Built on consume_rate_limit() (migration 20260827000000) with a 24-hour
//  window and a `daily:<feature>` namespace, so it is per-student, held in
//  Postgres and shared across every lambda instance — no new counter table.
//
//  WHEN NOTHING IS METERED
//  Billing has to be switched on (PAYSTACK_SECRET_KEY and the service-role key
//  both set). Until then there is no way to buy Premium, and capping students
//  who cannot pay to lift the cap would just be a worse free tier — so every
//  check here passes and the app behaves exactly as it did before billing.
//
//  FAILS OPEN, like the limiter it sits on. If the Premium lookup errors (say
//  the migration has not been applied yet) we cannot tell a paying student from
//  a free one, and charging a paying student's quota is the worse mistake.
// ============================================================================

import { FREE_DAILY_LIMITS, PREMIUM_DAILY_LIMITS, FEATURE_LABELS, DAY_MS } from '../../src/data/plans.js';
import { paystackConfigured } from './paystack.js';
import { serviceRoleConfigured } from './serviceRole.js';
import { enforceUserRateLimit, logRequest } from './request-policy.js';

export function billingEnabled() {
  return paystackConfigured() && serviceRoleConfigured();
}

// { premium: boolean, premiumUntil: ISO string | null, unknown: boolean }
// Uses the student's own RLS-scoped client: premium_passes is readable by its
// owner, so no service-role key is needed just to answer "am I Premium?".
export async function getPlan(student) {
  if (!student?.db || !student?.user?.id) return { premium: false, premiumUntil: null, unknown: true };
  try {
    const { data, error } = await student.db
      .from('premium_passes')
      .select('ends_at')
      .eq('user_id', student.user.id)
      .gt('ends_at', new Date().toISOString())
      .order('ends_at', { ascending: false })
      .limit(1);
    if (error) {
      console.error('plan: premium lookup failed, treating plan as unknown:', error.message);
      return { premium: false, premiumUntil: null, unknown: true };
    }
    const until = data?.[0]?.ends_at ?? null;
    return { premium: Boolean(until), premiumUntil: until, unknown: false };
  } catch (err) {
    console.error('plan: premium lookup threw, treating plan as unknown:', err);
    return { premium: false, premiumUntil: null, unknown: true };
  }
}

function aboutHours(retryAfterSeconds) {
  const hours = Math.max(1, Math.ceil((Number(retryAfterSeconds) || 0) / 3600));
  return `about ${hours} hour${hours === 1 ? '' : 's'}`;
}

export function quotaMessage(feature, limit, retryAfterSeconds) {
  const label = FEATURE_LABELS[feature] || 'free uses';
  return `You've used today's ${limit} free ${label}. Your allowance refills in ${aboutHours(retryAfterSeconds)} — or get Premium for higher daily allowances.`;
}

export function fairUseMessage(feature, limit, retryAfterSeconds) {
  const label = FEATURE_LABELS[feature] || 'uses';
  return `You've reached today's fair-use limit of ${limit} ${label}. It resets in ${aboutHours(retryAfterSeconds)}.`;
}

// Returns true when the handler should stop (it has already written the 429).
// Call as `if (await denyIfOverDailyQuota(req, res, student, 'tutor')) return;`
export async function denyIfOverDailyQuota(req, res, student, feature) {
  if (!FREE_DAILY_LIMITS[feature] || !billingEnabled()) return false;

  const plan = await getPlan(student);
  if (plan.unknown) return false;
  const limit = (plan.premium ? PREMIUM_DAILY_LIMITS : FREE_DAILY_LIMITS)[feature];
  if (!limit) return false;

  const verdict = await enforceUserRateLimit(student, {
    namespace: `daily:${feature}`,
    limit,
    windowMs: DAY_MS,
  });

  // Lets the client show "3 of 10 left today" after any successful call.
  res.setHeader('X-Quota-Limit', String(limit));
  res.setHeader('X-Quota-Remaining', String(verdict.remaining));
  if (verdict.allowed) return false;

  logRequest(req, feature, { denied: plan.premium ? 'fair_use' : 'daily_quota' });
  res.setHeader('Retry-After', String(verdict.retryAfterSeconds));
  res.status(429).json({
    error: plan.premium
      ? fairUseMessage(feature, limit, verdict.retryAfterSeconds)
      : quotaMessage(feature, limit, verdict.retryAfterSeconds),
    kind: plan.premium ? 'fair_use' : 'quota_exceeded',
    feature,
    limit,
    ...(!plan.premium ? { upgradePath: '/premium' } : {}),
  });
  return true;
}
