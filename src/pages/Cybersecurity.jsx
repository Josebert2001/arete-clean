import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CybersecurityLanding, { CYBERSECURITY_TITLE, CYBERSECURITY_DESCRIPTION } from '../components/CybersecurityLanding';
import { usePageMeta } from '../utils/usePageTitle';

function PhishingSample() {
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-paper border border-coffee-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-coffee-200 text-sm space-y-2"><p className="font-semibold text-ink">Subject: Action required: keep your account</p><p className="text-coffee-700 break-all">From: Areté Support &lt;help@arete-account-check.example&gt;</p></div>
        <div className="p-5 text-coffee-700 leading-relaxed"><p>Your account closes today. Reply with your latest sign-in link so we can keep your access active.</p><p className="mt-5 text-xs text-coffee-600">Fictional training message · No links or attachments</p></div>
      </div>
      <form className="bg-cream border border-coffee-200 rounded-xl p-5" onSubmit={(event) => { event.preventDefault(); setChecked(true); }}>
        <fieldset><legend className="font-semibold text-ink mb-4">What is the safest next step?</legend>
          {[
            ['reply', 'Reply with the sign-in link before the deadline.'],
            ['verify', 'Open the service through a saved address and verify with official support.'],
            ['trust', 'Trust it because the display name says Areté Support.'],
          ].map(([value, label]) => <label key={value} className={`flex gap-3 p-3 mb-2 rounded-lg border text-sm cursor-pointer ${answer === value ? 'border-moss bg-moss/5 text-ink' : 'border-coffee-200 bg-paper text-coffee-700'}`}><input type="radio" name="sample-answer" value={value} checked={answer === value} onChange={() => { setAnswer(value); setChecked(false); }} className="mt-0.5 shrink-0" />{label}</label>)}
        </fieldset>
        <button type="submit" disabled={!answer} className="btn-primary mt-3 disabled:opacity-50">Check my reasoning</button>
        {checked && <div role="status" className="mt-4 border-l-2 border-moss pl-4 text-sm text-coffee-700 leading-relaxed"><p className="font-semibold text-ink mb-2">{answer === 'verify' ? 'Good call. Verify through a trusted route.' : 'Take another look before sharing anything.'}</p><p>A display name does not prove who sent a message. The unfamiliar domain and urgent request deserve scrutiny. A sign-in link can grant account access: keep it private and contact support through the service’s official site.</p></div>}
      </form>
    </div>
  );
}

// Kept out of CybersecurityLanding so the address is not in the prerendered page.
const TEAM_PILOT_MAILTO = 'mailto:robertsunday333@gmail.com?subject=Aret%C3%A9%20cybersecurity%20training%20pilot&body=Organization%3A%0ALearner%20count%3A%0ASkills%20to%20develop%3A%0APreferred%20timeline%3A';

export default function Cybersecurity() {
  usePageMeta(CYBERSECURITY_TITLE, CYBERSECURITY_DESCRIPTION, '/cybersecurity');
  return (
    <CybersecurityLanding
      sample={<PhishingSample />}
      teamContact={<a className="btn-ghost" href={TEAM_PILOT_MAILTO}>Discuss a team pilot <ArrowRight size={15} /></a>}
    />
  );
}
