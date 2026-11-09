// Public career descriptions and placement prompts. Answer keys live only in api/_lib.
export const PLACEMENT_VERSION = 'career-v2';
export const ENTRY_PATHS = ['blue', 'red', 'grc', 'appsec'];

export const careerPaths = [
  { id: 'blue', name: 'Blue team', subtitle: 'Security operations & incident response', description: 'Investigate activity, separate real incidents from noise, and help a team respond.', roles: ['SOC trainee', 'Junior security analyst'], skills: ['Log investigation', 'Evidence and timelines', 'Containment and verification'], preparation: 'Networking, accounts, timestamps, and clear written explanations.', practice: 'Investigate a suspicious account', status: 'starter' },
  { id: 'red', name: 'Red team', subtitle: 'Ethical testing foundations', description: 'Find and validate weaknesses within an agreed scope, then help the owner verify a fix.', roles: ['Vulnerability assessment trainee', 'Supervised pentest intern'], skills: ['Scope and authorization', 'Finding validation', 'Remediation and retesting'], preparation: 'Linux, networking, HTTP, and written test scope.', practice: 'Review a scoped test finding', status: 'starter' },
  { id: 'grc', name: 'Governance, risk & compliance', subtitle: 'Risk, controls & audit evidence', description: 'Understand business risks, evaluate control evidence, and prioritize realistic improvements.', roles: ['GRC trainee', 'IT audit intern'], skills: ['Risk prioritization', 'Control evidence', 'Management communication'], preparation: 'Business context, evidence handling, and structured writing.', practice: 'Assess an access-review evidence gap', status: 'starter' },
  { id: 'appsec', name: 'Application security', subtitle: 'Secure software & remediation', description: 'Understand how an application can expose information, then explain and verify a correction.', roles: ['Application security intern', 'Security-minded developer'], skills: ['Authorization', 'Secure design', 'Regression testing'], preparation: 'HTTP, basic programming, and application data flows.', practice: 'Design an authorization regression check', status: 'starter' },
  { id: 'purple', name: 'Purple team', subtitle: 'Attack and defence working together', description: 'Connect controlled offensive exercises to defensive visibility and detection improvements.', skills: ['Detection validation', 'Attack/defence collaboration'], preparation: 'Assessed blue and red foundations, or reviewed equivalent experience.', status: 'planned' },
  { id: 'cloud', name: 'Cloud & network security', subtitle: 'Protect infrastructure', description: 'Review configurations, segmentation, and cloud controls, then verify improvements.', skills: ['Network controls', 'Cloud configuration'], preparation: 'Networking, Linux, and cloud fundamentals.', status: 'planned' },
  { id: 'forensics', name: 'Digital forensics', subtitle: 'Preserve and interpret evidence', description: 'Analyze artifacts and reconstruct events while preserving evidence and uncertainty.', skills: ['Evidence handling', 'Artifact analysis'], preparation: 'Operating systems, evidence preservation, and timelines.', status: 'planned' },
  { id: 'identity', name: 'Identity & access security', subtitle: 'Accounts, permissions & authentication', description: 'Review account lifecycles, authentication, and access, and verify appropriate permissions.', skills: ['Access reviews', 'Least privilege'], preparation: 'Accounts, groups, authentication, and basic administration.', status: 'planned' },
  { id: 'intelligence', name: 'Threat intelligence & malware analysis', subtitle: 'Understand threats', description: 'Evaluate threat information and controlled artifacts to support defensive decisions.', skills: ['Source evaluation', 'Controlled artifact analysis'], preparation: 'Systems, networking, research methods, and a suitable isolated lab.', status: 'planned' },
  { id: 'architecture', name: 'Security architecture & leadership', subtitle: 'Design and guide security programs', description: 'Evaluate design trade-offs and guide practical improvements across an organization.', skills: ['Security design', 'Program decisions'], preparation: 'Broader technical and organizational experience; a longer-term progression.', status: 'planned' },
];
export const getCareerPath = id => careerPaths.find(path => path.id === id);

// Existing lessons remain study practice, not verified career qualifications.
export const careerResources = {
  blue: [['Linux command output', '/tracks/security/sec-linux-cli'], ['Forensic evidence', '/tracks/security/sec-forensics'], ['Phishing', '/tracks/security/sec-phishing'], ['Firewall rules', '/tracks/security/sec-firewall']],
  red: [['Passwords', '/tracks/security/sec-passwords'], ['Networks', '/tracks/security/sec-networking'], ['HTTP', '/tracks/security/sec-http-headers'], ['SQL injection concepts', '/tracks/security/sec-web-sqli']],
  appsec: [['HTTP', '/tracks/security/sec-http-headers'], ['SQL injection concepts', '/tracks/security/sec-web-sqli'], ['Python foundations', '/tracks/python'], ['Java foundations', '/tracks/java']],
  grc: [['Introductory control-evidence worksheet', '/career/practice/grc']],
};

const interests = [
  ['blue', 'Compare activity records to understand unexpected account behavior.'],
  ['blue', 'Decide which security alert needs attention first and explain why.'],
  ['blue', 'Reconstruct an incident and hand clear findings to a response team.'],
  ['grc', 'Interview a business team to understand its security risks.'],
  ['grc', 'Compare security policy with evidence of what people actually do.'],
  ['grc', 'Help a manager prioritize security improvements with limited resources.'],
  ['appsec', 'Understand how application behavior could expose information.'],
  ['appsec', 'Compare vulnerable and corrected code to understand a security fix.'],
  ['appsec', 'Write a reproducible finding that helps a developer fix a problem.'],
  ['red', 'Plan an authorized test within an agreed scope.'],
  ['red', 'Reproduce a suspected weakness and rule out false positives.'],
  ['red', 'Explain a finding to the owner and check whether the correction worked.'],
];
const judgments = [
  ['blue', 'One account shows 20 failed sign-ins in five minutes, then nothing. What is supported?', ['Likely password guessing: check whether any attempt succeeded and where they came from', 'The account is compromised: reset the password and close the alert', 'The user forgot their password, so no action is needed']],
  ['blue', 'An account signs in successfully from an IP never seen for that user. What do you compare first?', ['Whether the IP is on a public blocklist', 'Usual devices, locations and sessions, and whether the access was expected through travel or VPN', 'Whether the password meets the complexity policy']],
  ['blue', 'You revoke a suspicious session. How do you confirm containment worked?', ['The admin console reported the revoke as successful', 'Fresh logs show the session token rejected and no new session for the account', 'Ask the user whether they still notice anything unusual']],
  ['grc', 'Policy requires quarterly access reviews. What is the best evidence they happen?', ['An approved policy signed by the security lead', 'A dated review record, reviewer, removed access and follow-up', 'A manager’s email confirming reviews happen every quarter']],
  ['grc', 'The budget covers only some identified risks. What next?', ['Fix the cheapest risks first to close the most items', 'Fund last year’s audit findings, then the rest by cost', 'Rank by likelihood and impact, treat the highest within budget, and record owners and acceptance for the rest']],
  ['grc', 'A control is listed as in place, but no evidence can be found. What should the register say?', ['Compliant because the owner says it is in place', 'Non-compliant, raised as a failed control', 'Evidence gap: not yet verified, with an owner and a date to obtain evidence or test it']],
  ['appsec', 'Changing an ID in a URL shows another user’s invoice. What is the best fix?', ['Replace sequential IDs with random ones', 'Check on the server that the invoice belongs to the signed-in user', 'Hide other users’ invoice links in the interface']],
  ['appsec', 'User input is concatenated into a SQL query. What is the best correction?', ['Use parameterized queries', 'Escape quote characters before building the query', 'Limit input length in the browser']],
  ['appsec', 'A developer says an access-control bug is fixed. What is the best verification?', ['Rerun the automated vulnerability scanner', 'Read the diff to confirm the check was added', 'Retest with two accounts: the owner gets access, the other account is refused']],
  ['red', 'During an authorized test, a reachable server is outside the written scope. What next?', ['Run a light non-intrusive scan to see whether it is worth raising', 'Leave it alone and say nothing because it is out of scope', 'Do not test it; ask the client whether it should be added to scope']],
  ['red', 'A scanner reports a critical weakness on an in-scope lab host. What makes it reportable?', ['The scanner’s critical rating and CVE reference', 'Confirming the installed version matches the vulnerable one', 'Confirming the condition manually within scope and recording evidence of actual impact']],
  ['red', 'An owner asks whether a fix worked. What is the best answer?', ['Repeat the original test within scope and report the result and limits', 'Confirm the patched version is installed', 'Close the finding because the recommended fix was applied']],
];
const foundations = [
  ['Which is a confidentiality failure?', ['An outsider reads payroll records', 'The payroll server goes offline on pay day', 'A salary figure is changed without approval']],
  ['Which gives an account the strongest protection?', ['A long password reused across sites', 'A unique password plus app-based or hardware MFA', 'A complex password changed every 30 days']],
  ['What does an IP in a log identify most directly?', ['The person who performed the action', 'The network address the request came from, possibly shared, a VPN or a proxy', 'The device’s physical location']],
  ['What is 10:00 at UTC+1 in UTC?', ['11:00', '09:00', '10:00']],
  ['What does an HTTP 403 response generally mean?', ['The server understood the request but refuses access', 'The page does not exist', 'The server crashed']],
  ['Before testing a live organization’s system, what is needed?', ['Confirmation that the system is publicly reachable', 'Approval from a staff member who uses the system', 'Explicit written authorization from the owner and an agreed scope']],
];
export const interestOptions = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
export const placementQuestions = [
  ...interests.map(([path, prompt], index) => ({ id: `I${index + 1}`, kind: 'interest', path, prompt: `I would enjoy this work: ${prompt}`, options: interestOptions })),
  ...judgments.map(([path, prompt, options], index) => ({ id: `J${index + 1}`, kind: 'judgment', path, prompt, options: [...options, 'Not sure yet'] })),
  ...foundations.map(([prompt, options], index) => ({ id: `B${index + 1}`, kind: 'foundation', prompt, options: [...options, 'Not sure yet'] })),
];

export const foundationTopics = [
  { id: 'B1', title: 'Confidentiality, integrity, availability', explanation: 'Confidentiality limits who can read information. Integrity protects its accuracy and authorized changes. Availability keeps a service usable when needed. Describe which property is at risk before recommending a control.' },
  { id: 'B2', title: 'Account protection', explanation: 'Use a unique password for each service and appropriate multi-factor authentication. Reused passwords let a compromise at one service affect another. MFA adds another factor, but does not make every session or message trustworthy.' },
  { id: 'B3', title: 'IP addresses and evidence', explanation: 'An IP address records network context, not a verified human identity or intent. VPNs, shared connections and changing addresses affect interpretation. Compare account, device, session, timing and approved behavior before concluding that activity is malicious.' },
  { id: 'B4', title: 'Normalize timestamps', explanation: 'Keep the original timestamp and offset, then convert to UTC before ordering events. Subtract a positive offset: 10:00 at UTC+1 is 09:00 UTC. Record any clock uncertainty instead of inventing an exact sequence.' },
  { id: 'B5', title: 'HTTP and authorization', explanation: 'HTTP 403 generally means a request was refused for access reasons. Authentication asks who is making the request; authorization decides whether that identity may perform the requested action. Test permitted and forbidden access separately.' },
  { id: 'B6', title: 'Permission and scope', explanation: 'Get explicit authorization and an agreed scope before testing a live system. Being able to reach a system is not permission to test it. If a useful-looking target is outside scope, pause and ask the owner to clarify before proceeding.' },
];

// Formative evidence, not live VM exercises or an independently verified assessment.
export const careerStarters = {
  blue: { title: 'Investigate a suspicious account', brief: 'An employee reports unexpected mailbox behavior. Decide what these fictional records support.', evidence: [
    ['AUTH-01', '08:45 UTC: Four failed sign-ins for account riley. No session was created.'],
    ['AUTH-02', '08:51 UTC: Successful sign-in for riley from an unfamiliar device; session ST-3.'],
    ['MAIL-01', '08:54 UTC: Session ST-3 creates an external forwarding rule.'],
    ['NOTE-01', 'The account owner says they did not create a forwarding rule. External forwarding requires approval; no approval is recorded.'],
  ], prompt: 'State the likely issue, cite at least two records, explain what remains unproven, and recommend a next action and verification.', feedback: 'AUTH-01 proves failed attempts, not compromise. AUTH-02 and MAIL-01 link successful access to a concerning configuration change; NOTE-01 strengthens the case for unauthorized activity. The records do not prove that data left the mailbox or that the failures caused the access. Recommend authorized session revocation and rule removal, preserve evidence, and verify the session is rejected and the rule is absent.' },
  red: { title: 'Review a scoped test finding', brief: 'You are reviewing a fictional assessment. No live testing or external targets are involved.', evidence: [
    ['SCOPE-01', 'Written authorization covers the supplied training application only; the payroll service is excluded.'],
    ['SCAN-01', 'An automated report labels a training application issue “high.” No reproduction or impact evidence is included.'],
    ['FIX-01', 'The owner says a new version was deployed, but there is no retest record.'],
  ], prompt: 'Explain what you can claim, what testing scope permits, what evidence is missing, and how you would verify the reported correction.', feedback: 'SCOPE-01 excludes payroll even if it is reachable. SCAN-01 is a lead to validate within the assigned lab, not a confirmed high-impact finding. Record a reproducible permitted check, observed impact and limitations. FIX-01 does not verify remediation; retest the original condition and document the result. This worksheet does not demonstrate live penetration-testing ability.' },
  grc: { title: 'Assess an access-review evidence gap', brief: 'A fictional business must review sensitive-system access quarterly. Assess the available evidence.', evidence: [
    ['POL-01', 'Policy requires a quarterly review with an accountable owner and follow-up on excessive access.'],
    ['REV-01', 'The latest spreadsheet is undated and unsigned. Two former staff accounts remain listed as active.'],
    ['NOTE-01', 'A manager says the review happened but cannot provide a completed review or removal tickets.'],
  ], prompt: 'Record the evidence gap, a justified risk, an owner and priority for follow-up, and what would verify a completed correction.', feedback: 'POL-01 establishes the fictional requirement, while REV-01 and NOTE-01 do not demonstrate a completed review. Record an evidence gap and potential inappropriate access, not a proven breach. Request current account status and dated owner-approved review evidence; assign follow-up and verify appropriate removals. Consider account sensitivity and business impact when setting priority.' },
  appsec: { title: 'Design an authorization regression check', brief: 'A fictional application permits a user to read another account’s document by changing its identifier.', evidence: [
    ['TEST-01', 'User A can read document A-1 and also document B-1 belonging to user B.'],
    ['PATCH-01', 'A developer hides the document link in the browser. The server’s document endpoint is unchanged.'],
    ['RULE-01', 'The application requires server-side ownership checks for every private document request.'],
  ], prompt: 'Explain the weakness, whether the patch addresses it, and the allowed and forbidden requests a regression test must check.', feedback: 'TEST-01 supports an object-level authorization failure under RULE-01. PATCH-01 changes presentation but leaves direct requests possible. Enforce authorization on the server for each document. Verify A can read A-1, A cannot read B-1, B can read B-1, and unauthenticated requests are denied. Document observed responses and avoid claiming impact beyond the supplied evidence.' },
};
