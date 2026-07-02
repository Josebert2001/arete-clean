import { useState } from 'react';
import { ShieldAlert, ShieldCheck, Timer } from 'lucide-react';
import { Q_DAY_OPTIONS, yearsUntilQDay, moscaVerdict } from '../utils/mosca';

const VERDICTS = {
  risk: {
    icon: ShieldAlert,
    tone: 'border-rust/30 bg-rust/10 text-rust',
    title: 'Already at risk',
    message: (m) =>
      `Data you encrypt today will still need to be secret ${Math.abs(m)} year${Math.abs(m) === 1 ? '' : 's'} after Q-Day. By Mosca's Theorem, migration should already have started.`,
  },
  tight: {
    icon: Timer,
    tone: 'border-ember-500/30 bg-ember-500/10 text-ember-500',
    title: 'Cutting it close',
    message: (m) =>
      `Only ${m} year${m === 1 ? '' : 's'} of margin. One delay in the migration plan and you cross into the risk zone — planning needs to start now.`,
  },
  safe: {
    icon: ShieldCheck,
    tone: 'border-moss/30 bg-moss/10 text-moss',
    title: 'Within the window',
    message: (m) =>
      `${m} years of margin — but only if migration actually starts on schedule. The margin shrinks by one every year you wait.`,
  },
};

function Slider({ label, value, unit, min, max, onChange }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm text-coffee-700">{label}</span>
        <span className="font-mono text-sm font-bold text-ink">{value} {unit}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-coffee-700"
      />
    </label>
  );
}

function Bar({ label, years, maxYears, colorClass }) {
  const pct = maxYears > 0 ? Math.max(4, Math.round((years / maxYears) * 100)) : 4;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs font-mono text-coffee-500">{label}</span>
        <span className="text-xs font-mono font-bold text-ink">{years} yrs</span>
      </div>
      <div className="h-3 rounded-full bg-coffee-100 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// Interactive Mosca's Theorem calculator, embedded in lecture notes via a
// section of type 'mosca' (see LectureNotes.jsx). Defaults reproduce the
// UNIUYO example from the CYB 222 PQC note: 20-year records + 7-year
// migration against a ~2032 Q-Day — already behind.
export default function MoscaCalculator() {
  const [secrecyYears, setSecrecyYears] = useState(20);
  const [migrationYears, setMigrationYears] = useState(7);
  const [qDayYear, setQDayYear] = useState(2032);

  const yearsLeft = yearsUntilQDay(qDayYear, new Date().getFullYear());
  const verdict = moscaVerdict({ secrecyYears, migrationYears, yearsLeft });
  const v = VERDICTS[verdict.level];
  const Icon = v.icon;
  const barMax = Math.max(verdict.needed, yearsLeft, 1);

  return (
    <div className="border border-coffee-200 rounded-xl bg-paper p-5 mb-5">
      <p className="text-xs font-mono text-coffee-500 mb-4">
        X + Y &gt; Z &nbsp;→&nbsp; secrecy lifetime + migration time vs. years until Q-Day
      </p>

      <div className="space-y-4 mb-5">
        <Slider
          label="How long must your data stay secret? (X)"
          value={secrecyYears} unit="yrs" min={0} max={40}
          onChange={setSecrecyYears}
        />
        <Slider
          label="How long would migrating to PQC take? (Y)"
          value={migrationYears} unit="yrs" min={0} max={15}
          onChange={setMigrationYears}
        />
        <div>
          <span className="block text-sm text-coffee-700 mb-1.5">Q-Day estimate (Z)</span>
          <div className="flex gap-2" role="group" aria-label="Q-Day estimate">
            {Q_DAY_OPTIONS.map((year) => (
              <button
                key={year}
                type="button"
                aria-pressed={qDayYear === year}
                onClick={() => setQDayYear(year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                  qDayYear === year
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-paper text-coffee-600 border-coffee-200 hover:border-coffee-400'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <Bar
          label={`Protection you need (X + Y = ${verdict.needed})`}
          years={verdict.needed} maxYears={barMax}
          colorClass={verdict.level === 'risk' ? 'bg-rust' : verdict.level === 'tight' ? 'bg-ember-500' : 'bg-moss'}
        />
        <Bar
          label="Time until Q-Day (Z)"
          years={yearsLeft} maxYears={barMax}
          colorClass="bg-ink"
        />
      </div>

      <div className={`flex gap-3 rounded-xl border p-4 ${v.tone}`} role="status">
        <Icon size={18} className="shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold mb-0.5">{v.title}</p>
          <p className="text-sm text-coffee-700">{v.message(verdict.margin)}</p>
        </div>
      </div>
    </div>
  );
}
