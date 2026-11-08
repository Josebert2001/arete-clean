import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePlan } from '../context/PlanContext';
import { FREE_DAILY_LIMITS } from '../data/plans';
import { usedToday, recordUse } from '../utils/dailyUsage';

// Client-side free-tier gate for one feature ('quiz' | 'examPrep').
//
//   const gate = useUsageGate('quiz');
//   if (!gate.consume()) return;   // blocked: render <UpgradePrompt> instead
//
// `active` is false whenever PlanContext's gatesActive is (Premium, billing
// off, status unknown), and then consume() always succeeds and records nothing,
// so a Premium student's count never builds up behind their back.
export function useUsageGate(feature) {
  const { user } = useAuth();
  const { gatesActive } = usePlan();
  const userId = user?.id ?? null;
  const limit = FREE_DAILY_LIMITS[feature];
  const active = gatesActive && Number.isFinite(limit);

  // Re-read when the account changes, during render rather than in an effect —
  // the same pattern CourseQuiz uses for its slug reset.
  const [usage, setUsage] = useState(() => ({ userId, used: usedToday(feature, userId) }));
  let used = usage.used;
  if (usage.userId !== userId) {
    used = usedToday(feature, userId);
    setUsage({ userId, used });
  }

  const remaining = active ? Math.max(0, limit - used) : Infinity;

  const consume = () => {
    if (!active) return true;
    // Read storage again rather than trusting state: another tab may have
    // spent some of the allowance since this one rendered.
    const current = usedToday(feature, userId);
    if (current >= limit) {
      setUsage({ userId, used: current });
      return false;
    }
    setUsage({ userId, used: recordUse(feature, userId) });
    return true;
  };

  return { active, limit, used, remaining, blocked: active && remaining <= 0, consume };
}
