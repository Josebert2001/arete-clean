import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FileSpreadsheet, Loader2, Lock, Printer } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLecturer } from '../components/useLecturer';
import { getDepartment } from '../data/departments';

/**
 * Lecturer attendance register for one course (offering).
 *
 * Two purposes, cleanly separated:
 *  - A FORMAL sheet for presentation (print / Save-as-PDF): university header,
 *    S/N table, signature lines. Print-styled so it looks official, not like a
 *    web page.
 *  - A DATA file (real .xls that Excel opens) with sized columns and real
 *    date/time text — no "####", nothing lost.
 *
 * No document libraries are added to the app bundle: the spreadsheet is a tiny
 * self-contained SpreadsheetML string, and the PDF comes from the browser's own
 * print engine over the print-styled layout.
 */
export default function Register() {
  const { status: roleStatus, isLecturer, offerings } = useLecturer();

  const [offeringId, setOfferingId] = useState('');
  const [summary, setSummary]       = useState([]);
  const [detail, setDetail]         = useState([]);
  const [totalHeld, setTotalHeld]   = useState(0);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  // Derived, not stateful: a plain `useState` + effect to seed the first
  // offering once `offerings` arrives would call setState synchronously from
  // an effect just to compute an initial value React already has on hand.
  // `offeringId` stays real state only for what the student actually picks.
  const effectiveOfferingId = offeringId || offerings[0]?.id || '';

  const offering = useMemo(
    () => offerings.find(o => o.id === effectiveOfferingId) ?? null,
    [offerings, effectiveOfferingId],
  );

  // `token` guards against two overlapping loads (switching the Course dropdown
  // quickly fires a new load before the previous one resolves) — only the
  // most recent call's response is allowed to commit state, or a fast switch
  // A → B could have A's response land after B's and print/export A's data
  // under B's heading.
  const loadToken = useRef(0);

  const load = useCallback(async () => {
    if (!effectiveOfferingId) return;
    const token = ++loadToken.current;
    setLoading(true);
    setError('');

    // Keep the roster current before reading it — additive only, so this
    // never drops a manually-added student, only adds newly-matching ones.
    const syncRes = await supabase.rpc('sync_offering_roster', { p_offering_id: effectiveOfferingId });
    if (token !== loadToken.current) return;
    if (syncRes.error) {
      setError('Could not refresh the roster. Please try again.');
      setLoading(false);
      return;
    }

    const sumRes = await supabase.rpc('register_summary', { p_offering_id: effectiveOfferingId });
    const detRes = await supabase
      .from('attendance_records')
      .select('session_id, student_id, full_name_snapshot, reg_number_snapshot, status, capture, marked_at, class_sessions!inner(offering_id, held_on, title, status)')
      .eq('class_sessions.offering_id', effectiveOfferingId)
      .order('marked_at', { ascending: true });

    if (token !== loadToken.current) return;
    if (sumRes.error || detRes.error) {
      setError('Could not load the register. Please try again.');
      setLoading(false);
      return;
    }
    setSummary(sumRes.data ?? []);
    setTotalHeld((sumRes.data?.[0]?.total_held) ?? 0);
    setDetail(detRes.data ?? []);
    setLoading(false);
  }, [effectiveOfferingId]);

  useEffect(() => { (async () => { await load(); })(); }, [load]);

  function pct(attended, total) {
    return total ? Math.round((attended / total) * 100) : 0;
  }

  const sessions = useMemo(() => {
    const map = new Map();
    for (const r of detail) {
      const sid = r.session_id;
      if (!map.has(sid)) {
        map.set(sid, {
          session_id: sid,
          held_on: r.class_sessions?.held_on,
          title: r.class_sessions?.title,
          marked_at: r.marked_at,
          rows: [],
        });
      }
      map.get(sid).rows.push(r);
    }
    return [...map.values()].sort((a, b) => new Date(b.marked_at) - new Date(a.marked_at));
  }, [detail]);

  // The canonical display name from the department registry — matches
  // Navbar.jsx, rather than reinventing "dataScience" → "Data Science" with a
  // regex that stays correct only by coincidence and drifts from any future
  // department slug that doesn't camelCase cleanly.
  const deptLabel = offering?.department ? getDepartment(offering.department).name : '';

  // Every row in one offering's summary carries the same threshold_pct — read
  // it from the data instead of hardcoding 70, or a custom per-offering
  // threshold (course_offerings.threshold_pct) silently has no effect here.
  const thresholdPct = summary[0]?.threshold_pct ?? 70;

  // ── Real spreadsheet export (SpreadsheetML — Excel opens it natively) ───────
  function downloadXlsx() {
    const esc = v => String(v ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const cell = (v, type = 'String') => `<Cell><Data ss:Type="${type}">${esc(v)}</Data></Cell>`;
    const wideCols = widths => widths.map(w => `<Column ss:Width="${w}"/>`).join('');

    const sumHeader = '<Row>' +
      ['S/N', 'Name', 'Reg Number', 'Department', 'Attended', 'Held', 'Percentage']
        .map(h => cell(h)).join('') + '</Row>';
    const sumRows = summary.map((s, i) => {
      const p = pct(Number(s.attended), Number(s.total_held));
      return '<Row>' + [
        cell(i + 1, 'Number'), cell(s.full_name), cell(s.reg_number), cell(deptLabel),
        cell(Number(s.attended), 'Number'), cell(Number(s.total_held), 'Number'), cell(p + '%'),
      ].join('') + '</Row>';
    }).join('');

    const detHeader = '<Row>' +
      ['Name', 'Reg Number', 'Date', 'Time', 'How'].map(h => cell(h)).join('') + '</Row>';
    const detRows = detail.map(r => {
      const dt = new Date(r.marked_at);
      return '<Row>' + [
        cell(r.full_name_snapshot), cell(r.reg_number_snapshot),
        cell(dt.toLocaleDateString()), cell(dt.toLocaleTimeString()),
        cell(r.capture === 'manual' ? 'manual' : 'self'),
      ].join('') + '</Row>';
    }).join('');

    const xml =
`<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Summary">
  <Table>${wideCols([40, 200, 140, 150, 70, 60, 90])}${sumHeader}${sumRows}</Table>
 </Worksheet>
 <Worksheet ss:Name="Check-in record">
  <Table>${wideCols([200, 140, 110, 110, 70])}${detHeader}${detRows}</Table>
 </Worksheet>
</Workbook>`;

    const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${(offering?.course_code || 'course').replace(/\s+/g, '')}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (roleStatus === 'loading') {
    return <Centered><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></Centered>;
  }
  if (!isLecturer) {
    return (
      <Centered>
        <Lock className="mb-3 h-6 w-6 text-coffee-400" />
        <h1 className="display-heading mb-2 text-2xl text-ink">Lecturers only</h1>
        <p className="text-coffee-700">This page is for staff viewing class registers.</p>
      </Centered>
    );
  }
  if (!offerings.length) {
    return (
      <Centered>
        <h1 className="display-heading mb-2 text-2xl text-ink">No courses assigned</h1>
        <p className="text-coffee-700">No courses are linked to your account yet.</p>
      </Centered>
    );
  }

  const now = new Date();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Controls — hidden when printing */}
      <div className="no-print">
        <header className="mb-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-coffee-500">Lecturer</p>
          <h1 className="display-heading text-3xl text-ink sm:text-4xl">Attendance register</h1>
        </header>

        {error && (
          <div role="alert" className="mb-6 rounded-xl border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-rust">
            {error}
          </div>
        )}

        <div className="mb-8 flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Course</span>
            <select
              value={effectiveOfferingId}
              onChange={e => setOfferingId(e.target.value)}
              className="rounded-lg border border-coffee-300 bg-paper px-3 py-2 text-ink"
            >
              {offerings.map(o => (
                <option key={o.id} value={o.id}>{o.course_code} · {o.level} · {o.academic_session}</option>
              ))}
            </select>
          </label>

          <button type="button" onClick={() => window.print()} className="btn-primary text-sm">
            <Printer className="mr-1.5 inline h-4 w-4" /> Print / Save as PDF
          </button>
          <button type="button" onClick={downloadXlsx} className="btn-ghost text-sm">
            <FileSpreadsheet className="mr-1.5 inline h-4 w-4" /> Download Excel
          </button>
        </div>
      </div>

      {loading ? (
        <Centered><Loader2 className="h-5 w-5 animate-spin text-coffee-500" /></Centered>
      ) : (
        <div className="print-sheet">
          {/* Formal header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold uppercase tracking-wide text-ink">University of Uyo</h2>
            <p className="text-base font-semibold uppercase text-ink">
              Department of {deptLabel || 'Cyber Security'}
            </p>
            <p className="mt-2 text-sm text-coffee-700">Class Attendance Register</p>
          </div>

          {/* Course meta */}
          <div className="mb-4 text-sm text-ink">
            <p><span className="font-semibold">Course:</span> {offering?.course_code}{offering?.course_title ? ` — ${offering.course_title}` : ''}</p>
            <p><span className="font-semibold">Level / Session:</span> {offering?.level} · {offering?.academic_session}</p>
            <p><span className="font-semibold">Classes held (closed sessions):</span> {totalHeld}</p>
            <p><span className="font-semibold">Attendance requirement:</span> {thresholdPct}%</p>
            <p className="text-xs text-coffee-500">Generated {now.toLocaleDateString()} {now.toLocaleTimeString()}</p>
          </div>

          {/* Formal summary table (header repeats each printed page) */}
          {summary.length === 0 ? (
            <p className="rounded-xl border border-coffee-200 bg-cream px-4 py-6 text-center text-coffee-700 no-print">
              No students match this course's department and level yet.
            </p>
          ) : (
            <table className="reg-table w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-coffee-400 px-2 py-1 text-center">S/N</th>
                  <th className="border border-coffee-400 px-2 py-1 text-left">Name</th>
                  <th className="border border-coffee-400 px-2 py-1 text-left">Reg Number</th>
                  <th className="border border-coffee-400 px-2 py-1 text-left">Department</th>
                  <th className="border border-coffee-400 px-2 py-1 text-center">Attended</th>
                  <th className="border border-coffee-400 px-2 py-1 text-center">Held</th>
                  <th className="border border-coffee-400 px-2 py-1 text-center">%</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((s, i) => {
                  const p = pct(Number(s.attended), Number(s.total_held));
                  const below = Number(s.total_held) > 0 && p < (s.threshold_pct ?? 70);
                  return (
                    <tr key={s.student_id}>
                      <td className="border border-coffee-300 px-2 py-1 text-center">{i + 1}</td>
                      <td className="border border-coffee-300 px-2 py-1">{s.full_name || '—'}</td>
                      <td className="border border-coffee-300 px-2 py-1 font-mono text-xs">{s.reg_number || '—'}</td>
                      <td className="border border-coffee-300 px-2 py-1">{deptLabel}</td>
                      <td className="border border-coffee-300 px-2 py-1 text-center">{Number(s.attended)}</td>
                      <td className="border border-coffee-300 px-2 py-1 text-center">{Number(s.total_held)}</td>
                      <td className={`border border-coffee-300 px-2 py-1 text-center font-semibold ${below ? 'text-rust' : ''}`}>
                        {p}%{below ? ' ⚠' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Signature block */}
          <div className="signatures mt-16 flex justify-between gap-8 text-sm">
            <div className="flex-1"><div className="border-t border-ink pt-1">Lecturer's Name &amp; Signature</div></div>
            <div className="flex-1"><div className="border-t border-ink pt-1">H.O.D's Name &amp; Signature</div></div>
          </div>

          {/* Evidence detail — screen only, kept off the formal printed sheet */}
          {sessions.length > 0 && (
            <div className="mt-12 no-print">
              <h3 className="mb-4 font-display text-lg font-bold text-ink">Check-in record (by class)</h3>
              <div className="space-y-6">
                {sessions.map(sess => (
                  <div key={sess.session_id} className="overflow-hidden rounded-xl border border-coffee-200">
                    <div className="border-b border-coffee-200 bg-cream px-4 py-2">
                      <p className="font-medium text-ink">{sess.held_on}{sess.title ? ` · ${sess.title}` : ''}</p>
                      <p className="text-xs text-coffee-500">{sess.rows.length} present</p>
                    </div>
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-coffee-200 text-left text-xs text-coffee-500">
                          <th className="px-4 py-1.5">Name</th>
                          <th className="px-4 py-1.5">Reg Number</th>
                          <th className="px-4 py-1.5">Time</th>
                          <th className="px-4 py-1.5">How</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sess.rows.map((r, i) => (
                          <tr key={i} className="border-b border-coffee-100 last:border-0">
                            <td className="px-4 py-1.5">{r.full_name_snapshot || '—'}</td>
                            <td className="px-4 py-1.5 font-mono text-xs">{r.reg_number_snapshot || '—'}</td>
                            <td className="px-4 py-1.5">{new Date(r.marked_at).toLocaleTimeString()}</td>
                            <td className="px-4 py-1.5 text-coffee-600">{r.capture === 'manual' ? 'manual' : 'self'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scoped print styling — formal document look, hides app chrome. */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-sheet, .print-sheet * { visibility: visible; }
          .print-sheet { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .reg-table { font-size: 11px; }
          .reg-table thead { display: table-header-group; }
          .reg-table tr { page-break-inside: avoid; }
          .signatures { page-break-inside: avoid; }
          @page { margin: 14mm; }
        }
      `}</style>
    </div>
  );
}

function Centered({ children }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      {children}
    </div>
  );
}
