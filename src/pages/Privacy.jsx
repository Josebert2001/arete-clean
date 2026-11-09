import { usePageTitle } from '../utils/usePageTitle';

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-bold text-ink mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-coffee-700 leading-relaxed">{children}</div>
    </section>
  );
}

const THIRD_PARTIES = [
  { name: 'Supabase', role: 'authentication, database, and file storage', url: 'https://supabase.com/privacy' },
  { name: 'Groq', role: 'AI Tutor, Code Explainer, and Explain-this', url: 'https://groq.com/privacy-policy/' },
  { name: 'Google Gemini API', role: 'AI Tutor — Google’s free tier may use submitted content to improve their models', url: 'https://ai.google.dev/gemini-api/terms' },
  { name: 'OpenRouter', role: 'AI Tutor fallback provider', url: 'https://openrouter.ai/privacy' },
  { name: 'JDoodle', role: 'runs code submitted in the Code Playground', url: 'https://www.jdoodle.com/privacy-policy' },
  { name: 'Brevo', role: 'delivers sign-in emails', url: 'https://www.brevo.com/legal/privacypolicy/' },
  { name: 'Paystack', role: 'processes Premium payments — card, bank and USSD details go to Paystack, never to Areté', url: 'https://paystack.com/privacy' },
  { name: 'Sentry', role: 'error monitoring (optional, technical data only)', url: 'https://sentry.io/privacy/' },
  { name: 'Google Calendar API', role: 'only if you connect your Google account from the Study Planner', url: 'https://policies.google.com/privacy' },
];

export default function Privacy() {
  usePageTitle('Privacy Policy');
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-coffee-500 mb-3">
        Legal
      </span>
      <h1 className="display-heading text-3xl sm:text-4xl text-ink mb-2">Privacy Policy</h1>
      <p className="text-xs text-coffee-500 mb-10">Last updated: 9 November 2026</p>

      <p className="text-sm text-coffee-700 leading-relaxed mb-8">
        Areté is a student-built learning platform for independent cybersecurity and coding learners, and University of Uyo students.
        This page explains what data we collect, why, and how it's used. It isn't a substitute for legal advice
        — if you have questions, contact us (details at the bottom).
      </p>

      <Section title="1. Information we collect">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium text-ink">Account info</span> — your email address, full name, and learning mode. UniUyo curriculum learners also choose a department and level (100L–400L) and may provide a registration number. Independent learners do not need academic details.</li>
          <li><span className="font-medium text-ink">Progress data</span> — which modules and quizzes you've completed, and your scores, so progress syncs across devices.</li>
          <li><span className="font-medium text-ink">Attendance and rosters</span> — your department and level can place you on a course roster. Check-ins record the class, time, attendance status, and your name and registration number at the time, when present. Lecturers can also mark a student manually and record a reason. Lecturers assigned to that course can see its roster and register, add, change, or delete attendance, and download the register. You can see your own attendance and course percentages.</li>
          <li><span className="font-medium text-ink">Check-in location</span> — when you check in, the browser requests your coordinates and sends them to the attendance system. If a lecturer enforces a location boundary for the class, the system uses them to block an out-of-area check-in and stores the precise latitude and longitude with a successful check-in. Without an enforced boundary, successful check-ins do not store your coordinates. Check-ins made before this change may still hold the coordinates recorded at the time. Lecturers assigned to the class can access its attendance records. A lecturer's location and chosen radius are stored with the class when they enable a boundary. If your browser does not provide a location, the coordinates are null; a class with an enforced boundary will reject the check-in.</li>
          <li><span className="font-medium text-ink">Device binding</span> — the browser keeps a randomly generated device identifier in local storage and sends it at check-in. The database stores only a one-way SHA-256 hash of that identifier in device bindings, successful check-ins, and attendance audit snapshots, so later check-ins require the same identifier and one identifier cannot check in twice for the same class. A lecturer for your course can reset your account's device binding if you change devices.</li>
          <li><span className="font-medium text-ink">Course reps, lecturers, and invitations</span> — the system records staff roles, course-rep appointments, course assignments, and invitation email addresses, senders, recipients, decisions, and dates. Reps can manage offerings and lecturer invitations for their own department and level; they cannot see or mark attendance as lecturers. Invitees can see invitations addressed to their email. Admins can search accounts, appoint reps and staff, review invitations, and approve a first-time lecturer before that person gets lecturer access. Admins can also review a log of manual attendance additions, changes, and deletions, including the affected student's name, registration number, and attendance details.</li>
          <li><span className="font-medium text-ink">In-app feedback</span> — if you send a rating, we store its value, your optional message, the page you were on, your account ID, and the submission time. Feedback is reviewed by people with Supabase dashboard access; other students, lecturers, and course reps cannot read submissions through the app. The prompt also keeps per-account visit and dismissal state in your browser.</li>
          <li><span className="font-medium text-ink">Uploaded course materials and reports</span> — files you add to a course page. The list of files is shown to signed-in students viewing that course, but anyone with a file's link can download it without signing in. Do not upload anything you would not want shared. Extracted text from these files may be used to give the AI Tutor context. Students can report a file; we store the reporter's account ID, reason, optional details, and review outcome. Admins can hide or remove reported files. A hidden file's public link may remain usable until it is removed from storage.</li>
          <li><span className="font-medium text-ink">AI Tutor / Code Explainer / Explain-this / Simplify-this content</span> — messages, code, and text you submit to these features are sent to our AI providers to generate a response. We don't use this content to train our own models; our AI providers' own policies govern what they do with it (see below).</li>
          <li><span className="font-medium text-ink">Code Playground submissions</span> — code you run is sent to JDoodle to execute and return output.</li>
          <li><span className="font-medium text-ink">Google Calendar connection (optional)</span> — if you connect your Google account from the Study Planner, we store a Google-issued refresh token so we can create calendar events on your behalf. We never see your Google password. Disconnecting at any time deletes this token and revokes our access.</li>
          <li><span className="font-medium text-ink">Premium payments (optional)</span> — if you buy Premium, we store a payment reference, the amount, currency, status and dates, and the start and end of your Premium period. Your email is sent to Paystack for the receipt. Paystack collects your card, bank or USSD details on its own page; Areté never receives them. If you delete your account, your Premium periods are deleted and the payment record keeps only the reference, amount and dates, with no link to you.</li>
          <li><span className="font-medium text-ink">Daily usage counts</span> — to apply free-plan allowances, we count how many times your account used each AI feature or code runs in the past 24 hours. Quiz and exam-prep counts are kept in your browser only.</li>
          <li><span className="font-medium text-ink">Technical/error data</span> — if something breaks, error details (not your personal messages) may be sent to Sentry to help us fix bugs.</li>
          <li><span className="font-medium text-ink">Local device storage</span> — study progress and a few preferences are cached in your browser so the app loads faster; this stays on your device except for what syncs to your account as described above.</li>
        </ul>
      </Section>

      <Section title="2. What we don't do">
        <ul className="list-disc pl-5 space-y-2">
          <li>We don't sell your data.</li>
          <li>We don't run third-party advertising or tracking scripts — there are no ad networks or analytics trackers on this site.</li>
          <li>We don't request access to your Google account beyond what a feature you explicitly turn on needs (currently: creating Calendar events for your study plan).</li>
        </ul>
      </Section>

      <Section title="3. Third-party services we use">
        <p>Each of the services below processes a narrow slice of your data to provide their part of Areté. We encourage you to read their own privacy policies.</p>
        <ul className="list-disc pl-5 space-y-2">
          {THIRD_PARTIES.map((t) => (
            <li key={t.name}>
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline hover:text-ember">{t.name}</a>
              {' '}— {t.role}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="4. How long we keep your data">
        <p>
          Our proposed retention defaults are: rate-limit counters for 7 days; feedback for 2 years;
          attendance and course rosters for the academic session plus 2 years; and resolved material
          reports for 1 year. The automatic cleanup is not active until the owner approves and schedules it.
          For accounts inactive for 3 years, we plan to notify the owner before deletion; inactivity-based
          deletion is not automatic. You can download your readable data or request deletion from Profile
          settings. Staff, lecturers, and course reps must contact an admin first. A student account deletion
          also removes its attendance records and related audit snapshots.
        </p>
      </Section>

      <Section title="5. Your rights">
        <p>
          If you're in Nigeria, the Nigeria Data Protection Act 2023 gives you rights over your personal data,
          including access, correction, and deletion. Contact us to exercise any of these.
        </p>
      </Section>

      <Section title="6. Who can use Areté">
        <p>
          Areté is built for university students and adult independent learners, and isn't directed at children under 13. If you believe a child
          has used the platform and shared personal data with us, contact us and we'll remove it.
        </p>
      </Section>

      <Section title="7. Changes to this policy">
        <p>We'll update the "last updated" date above when this policy changes. Material changes will be noted on this page.</p>
      </Section>

      <Section title="8. Contact">
        <p>Questions about this policy: <a href="mailto:robertsunday333@gmail.com" className="font-medium text-ink underline hover:text-ember">robertsunday333@gmail.com</a></p>
        <p>To report a security issue privately, read our <a href="https://github.com/Josebert2001/arete-clean/security/policy" className="font-medium text-ink underline hover:text-ember">security policy</a>.</p>
      </Section>
    </div>
  );
}
