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
      <p className="text-xs text-coffee-500 mb-10">Last updated: 2 November 2026</p>

      <p className="text-sm text-coffee-700 leading-relaxed mb-8">
        Areté is a student-built academic platform for University of Uyo students.
        This page explains what data we collect, why, and how it's used. It isn't a substitute for legal advice
        — if you have questions, contact us (details at the bottom).
      </p>

      <Section title="1. Information we collect">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium text-ink">Account info</span> — your email address, and once you complete setup, your full name, registration number, and level (100L–400L), used to identify your profile.</li>
          <li><span className="font-medium text-ink">Progress data</span> — which modules and quizzes you've completed, and your scores, so progress syncs across devices.</li>
          <li><span className="font-medium text-ink">Attendance and rosters</span> — your department and level can place you on a course roster. Check-ins record the class, time, attendance status, and your name and registration number at the time, when present. Lecturers can also mark a student manually and record a reason. Lecturers assigned to that course can see its roster and register, add, change, or delete attendance, and download the register. You can see your own attendance and course percentages.</li>
          <li><span className="font-medium text-ink">Check-in location</span> — when you check in, the browser requests your coordinates and sends them to the attendance system. If a lecturer enabled a location boundary, the system uses them to block an out-of-area check-in. Successful check-ins store the precise latitude and longitude supplied by your browser in the attendance record, even when no boundary is set. Lecturers assigned to the class can access those records. A lecturer's location and chosen radius are stored with the class when they enable a boundary. If your browser does not provide a location, the coordinates are null; a class with an enforced boundary will reject the check-in.</li>
          <li><span className="font-medium text-ink">Device binding</span> — the browser keeps a randomly generated device identifier in local storage and sends it at check-in. Despite the database field's name, the identifier is stored as sent, not hashed. It is linked to your account and successful check-ins so later check-ins require the same identifier and one identifier cannot check in twice for the same class. A lecturer for your course can reset your account's device binding if you change devices.</li>
          <li><span className="font-medium text-ink">Course reps, lecturers, and invitations</span> — the system records staff roles, course-rep appointments, course assignments, and invitation email addresses, senders, recipients, decisions, and dates. Reps can manage offerings and lecturer invitations for their own department and level; they cannot see or mark attendance as lecturers. Invitees can see invitations addressed to their email. Admins can search accounts, appoint reps and staff, review invitations, and approve a first-time lecturer before that person gets lecturer access. Admins can also review a log of manual attendance additions, changes, and deletions, including the affected student's name, registration number, and attendance details.</li>
          <li><span className="font-medium text-ink">In-app feedback</span> — if you send a rating, we store its value, your optional message, the page you were on, your account ID, and the submission time. Feedback is reviewed by people with Supabase dashboard access; other students, lecturers, and course reps cannot read submissions through the app. The prompt also keeps per-account visit and dismissal state in your browser.</li>
          <li><span className="font-medium text-ink">Uploaded course materials</span> — files you add to a course page. These are visible to other signed-in students viewing that course, and their extracted text may be used to give the AI Tutor context.</li>
          <li><span className="font-medium text-ink">AI Tutor / Code Explainer / Explain-this / Simplify-this content</span> — messages, code, and text you submit to these features are sent to our AI providers to generate a response. We don't use this content to train our own models; our AI providers' own policies govern what they do with it (see below).</li>
          <li><span className="font-medium text-ink">Code Playground submissions</span> — code you run is sent to JDoodle to execute and return output.</li>
          <li><span className="font-medium text-ink">Google Calendar connection (optional)</span> — if you connect your Google account from the Study Planner, we store a Google-issued refresh token so we can create calendar events on your behalf. We never see your Google password. Disconnecting at any time deletes this token and revokes our access.</li>
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
          We have not set a published retention period for account, attendance, invitation, or feedback data.
          To request deletion of your account or associated data, email us using the address below. There is
          no in-app deletion control. Removing an account cascades to its feedback, roster, attendance, and
          device-binding rows. The admin audit log of manual attendance changes is separate and can retain
          copies of changed or deleted attendance rows, so include it in any deletion request.
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
          Areté is built for university students and isn't directed at children under 13. If you believe a child
          has used the platform and shared personal data with us, contact us and we'll remove it.
        </p>
      </Section>

      <Section title="7. Changes to this policy">
        <p>We'll update the "last updated" date above when this policy changes. Material changes will be noted on this page.</p>
      </Section>

      <Section title="8. Contact">
        <p>Questions about this policy: <a href="mailto:robertsunday333@gmail.com" className="font-medium text-ink underline hover:text-ember">robertsunday333@gmail.com</a></p>
      </Section>
    </div>
  );
}
