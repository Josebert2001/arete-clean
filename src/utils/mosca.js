// Mosca's Theorem: if (migration time) + (data secrecy lifetime) exceeds the
// years remaining until Q-Day, the organisation is *already* at cryptographic
// risk — data encrypted today will still need to be secret after a quantum
// computer can decrypt it. Pure logic for the interactive calculator in the
// CYB 222 lecture notes (rendered by src/components/MoscaCalculator.jsx).

export const Q_DAY_OPTIONS = [2030, 2032, 2035];

export function yearsUntilQDay(qDayYear, nowYear) {
  return Math.max(0, qDayYear - nowYear);
}

// Returns { level: 'risk' | 'tight' | 'safe', needed, margin }.
//   needed — total years of protection required (secrecy + migration)
//   margin — years to spare before Q-Day (negative = already behind)
export function moscaVerdict({ secrecyYears, migrationYears, yearsLeft }) {
  const needed = secrecyYears + migrationYears;
  const margin = yearsLeft - needed;
  if (margin < 0) return { level: 'risk', needed, margin };
  if (margin <= 2) return { level: 'tight', needed, margin };
  return { level: 'safe', needed, margin };
}
