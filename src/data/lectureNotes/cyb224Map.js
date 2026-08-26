// CYB 224 — the links between the topics.
//
// Notes 1-22 are transcribed faithfully from two sources (class sessions for
// 1-3, the printed workbook for 4-22), and neither source was written to be
// read as one course. The result is that no algorithm is taught in one place,
// anomaly detection is introduced five separate times, and k-NN's practical
// (note 17) sits three topics *before* the theory that explains it (note 20).
//
// Notes 23-26 are different again: they are authored from the course outline
// and the set texts to cover outline items 2, 4, 5 and 6, which neither source
// ever handed out. They sit at the end of the list but belong near the front of
// the reading order, which is exactly the kind of thing this file exists to say.
//
// Nothing here changes a word of the transcription. This file is a separate
// layer that says how the existing topics relate: which part of the course a
// topic belongs to, what it assumes you have already read, where it gets
// finished, and where the same idea turns up again under a different heading.
//
// Every link below is derived from content actually present in the notes. If a
// link claims note 9 completes note 8, it is because note 9 works the Gini
// formula that note 8 states. Nothing is asserted that the pages do not support.
//
// Shape is deliberately generic so another scattered course can declare one:
//   parts[]    — the course re-grouped into a readable arc (ids are stable)
//   strands[]  — one algorithm/technique followed across every note it touches
//   threads[]  — a concept that recurs in many notes, listed once
//   topics{}   — per-note links, keyed by the note `number` string
//
// `n` values are note numbers as strings, matching `lectureNotes[].number`.

export const cyb224Map = {
  // ── The arc the material has once it is grouped ──────────────────
  // Six parts. The notes are not in this order on the page and are not being
  // reordered — this is the shape to hold in your head while reading them.
  parts: [
    {
      id: 'A',
      title: 'What big data is',
      topics: ['1', '2', '3', '26'],
      blurb: 'The vocabulary. Characteristics, where the data comes from, the stages it passes through, the technology stack, and the skills the rest of the course assumes.',
    },
    {
      id: 'B',
      title: 'Securing and managing it',
      topics: ['4', '23', '24', '25'],
      blurb: 'The classical information security half of the course: why perimeter thinking fails at scale and the four pillars that replace it (4), then the management side — objectives, the design process and life cycles, policy, principles and methodologies (23-25).',
    },
    {
      id: 'C',
      title: 'What you are defending against',
      topics: ['5', '6'],
      blurb: 'The threat taxonomy, and the economics that decide which threats you actually face.',
    },
    {
      id: 'D',
      title: 'How machine learning works',
      topics: ['7', '8', '9', '10', '20'],
      blurb: 'The algorithms and their mathematics. Everything in parts E and F is an application of this part.',
    },
    {
      id: 'E',
      title: 'Turning ML into a detector',
      topics: ['11', '12', '14'],
      blurb: 'The pipeline from raw traffic to an automated response, where each algorithm is deployed, and how you tell whether it works.',
    },
    {
      id: 'F',
      title: 'Doing it in Python',
      topics: ['13', '15', '16', '17', '18', '19', '21', '22'],
      blurb: 'The practicals. Read part D for the algorithm and part E for the metric, then these are just the same ideas in scikit-learn.',
    },
  ],

  // ── One technique, followed across every note it appears in ──────
  // This is the view that answers "I am revising decision trees — where is all
  // of it?", which the reading order makes into a hunt.
  strands: [
    {
      name: 'Decision tree',
      steps: [
        { n: '8', role: 'theory + Gini and entropy equations' },
        { n: '9', role: 'worked by hand on six packets' },
        { n: '18', role: 'DecisionTreeClassifier on UNSW-NB15' },
      ],
    },
    {
      name: 'Support Vector Machine',
      steps: [
        { n: '8', role: 'theory, margin maths, three diagrams' },
        { n: '17', role: 'SVC and LinearSVC on UNSW-NB15' },
      ],
    },
    {
      name: 'k-Nearest Neighbours',
      steps: [
        { n: '17', role: 'KNeighborsClassifier — the code comes first' },
        { n: '20', role: 'the theory that explains it' },
      ],
      warning: 'These two are the wrong way round on the page. Read 20 before 17.',
    },
    {
      name: 'K-Means',
      steps: [
        { n: '10', role: 'named as a clustering algorithm' },
        { n: '19', role: 'the full anomaly-detection practical' },
      ],
    },
    {
      name: 'Neural networks',
      steps: [
        { n: '8', role: 'feedforward / MLP, forward pass, backpropagation' },
        { n: '10', role: 'CNNs and RNNs as the deep-learning extension' },
      ],
    },
    {
      name: 'Random Forest',
      steps: [
        { n: '12', role: 'named for network intrusion detection' },
        { n: '22', role: 'coded in the credit-card model comparison' },
      ],
    },
    {
      name: 'Isolation Forest',
      steps: [
        { n: '21', role: 'the only place it appears' },
      ],
    },
    {
      name: 'Naive Bayes · Logistic Regression',
      steps: [
        { n: '12', role: 'named in the comparison table' },
        { n: '22', role: 'Logistic Regression returns in the fraud comparison' },
      ],
      warning: 'Naive Bayes is named for phishing detection but never coded anywhere in the course.',
    },
  ],

  // ── Concepts that recur under different headings ─────────────────
  // Each of these is introduced as if new in every note listed. They are not
  // separate topics — they are one topic told repeatedly.
  threads: [
    {
      name: 'Anomaly detection',
      notes: ['7', '10', '11', '19', '21'],
      note: 'Introduced five times: as the counterpart to pattern recognition (7), as an unsupervised technique with GMM and PCA (10), as a three-step process (11), then coded twice — K-Means (19) and Isolation Forest (21).',
    },
    {
      name: 'Supervised vs unsupervised',
      notes: ['7', '8', '10', '11', '12'],
      note: 'Defined in 7, redefined in 8, extended in 10, tabled again in 11’s activity, and split into classification and regression in 12.',
    },
    {
      name: 'Evaluation metrics',
      notes: ['11', '14', '17', '18', '22'],
      note: 'Note 11 discusses false positives and false negatives in plain language; note 14 gives them their names and equations. Every practical then prints them.',
    },
    {
      name: 'The Python libraries',
      notes: ['15', '21'],
      note: 'Pandas, NumPy, Matplotlib and Seaborn in 15; Pandas covered a second time alongside Scikit-Learn in 21.',
    },
    {
      name: 'Adversarial machine learning',
      notes: ['5', '6', '7', '11'],
      note: 'The stop-sign attack (5), attacker economics (6), and the same question asked as an activity in both 7 and 11.',
    },
    {
      name: 'Protecting data at every stage',
      notes: ['4', '24', '26'],
      note: 'Note 4 says data must be protected at all stages because it is constantly in motion; note 26 lists what those stages actually are; note 24 attaches a control to each of them and calls the result lifecycle security management. Three statements of one idea.',
    },
    {
      name: 'Life cycles',
      notes: ['24', '26'],
      note: 'Four different life cycles are named across these two notes and are easy to confuse: the security design process / SecSDLC (building one system), Plan-Do-Check-Act (running the security programme), Identify-Protect-Detect-Respond-Recover (day-to-day operations), and the big data life cycle (what happens to the data). The table in 24.6 separates the first three; note 26 owns the fourth.',
    },
    {
      name: 'The Vs',
      notes: ['1', '4'],
      note: 'Five Vs as characteristics of big data (1); three of the same Vs as reasons traditional security fails (4). Different purposes, not a contradiction.',
    },
  ],

  // ── Per-note links ───────────────────────────────────────────────
  topics: {
    '1': {
      part: 'A',
      continuesIn: [
        { n: '26', why: 'the stages this data passes through, and the technology stack that moves it' },
        { n: '4', why: 'the workbook’s own security definition, and three of these same Vs' },
      ],
      alsoSee: [{ n: '4', why: 'the 3Vs there are these Vs used for a different purpose' }],
    },
    '2': {
      part: 'A',
      buildsOn: [{ n: '1', why: 'what big data is' }],
      alsoSee: [{ n: '26', why: 'the same technologies split by layer instead of by purpose' }],
    },
    '3': {
      part: 'A',
      buildsOn: [{ n: '1', why: 'what big data is' }],
      continuesIn: [
        { n: '13', why: 'the analytical skills listed here, actually performed' },
        { n: '15', why: 'the programming and framework skills, as real libraries' },
      ],
      alsoSee: [{ n: '26', why: 'the adoption barriers these skills are the answer to' }],
    },
    '4': {
      part: 'B',
      buildsOn: [{ n: '1', why: 'the characteristics of big data' }],
      continuesIn: [
        { n: '5', why: 'the threats these pillars defend against' },
        { n: '23', why: 'the management half — what these controls are meant to achieve, and who is accountable' },
      ],
      alsoSee: [
        { n: '1', why: 'five Vs there, three here — read them together' },
        { n: '7', why: 'the UEBA mentioned here is anomaly detection, covered properly there' },
        { n: '24', why: '"protect at all stages" restated as lifecycle security management, with a control per stage' },
        { n: '25', why: 'the policy and principles a big data security programme is written from' },
        { n: '26', why: 'the governance and security layer, in its place in the platform stack' },
      ],
    },
    '5': {
      part: 'C',
      buildsOn: [{ n: '4', why: 'what is being protected' }],
      continuesIn: [
        { n: '6', why: 'why attackers choose one threat over another' },
        { n: '7', why: 'the machine learning only defined in passing here' },
      ],
      alsoSee: [
        { n: '9', why: 'the SYN scanning pattern from this note’s log activity, worked through' },
        { n: '11', why: 'adversarial ML asked again as an activity' },
      ],
    },
    '6': {
      part: 'C',
      buildsOn: [{ n: '5', why: 'the threats being bought and sold' }],
      alsoSee: [{ n: '11', why: 'the same adversarial-thinking questions' }],
    },
    '7': {
      part: 'D',
      buildsOn: [{ n: '5', why: 'the AI and ML definitions' }],
      continuesIn: [
        { n: '8', why: 'supervised learning in full, with the algorithms' },
        { n: '10', why: 'unsupervised, reinforcement and deep learning' },
        { n: '20', why: 'k-NN, which is filed on its own well after the others' },
      ],
      alsoSee: [
        { n: '4', why: 'the UEBA named there is the anomaly detection defined here' },
        { n: '11', why: 'anomaly detection again, as a three-step process' },
        { n: '12', why: 'supervised vs unsupervised again, as classification vs regression' },
      ],
    },
    '8': {
      part: 'D',
      buildsOn: [{ n: '7', why: 'the supervised / unsupervised split' }],
      continuesIn: [
        { n: '9', why: 'the Gini equation worked by hand' },
        { n: '12', why: 'where each of these algorithms is actually deployed' },
        { n: '17', why: 'the SVM here, in scikit-learn' },
        { n: '18', why: 'the decision tree here, in scikit-learn' },
      ],
      alsoSee: [
        { n: '10', why: 'CNNs and RNNs, which extend the neural network here' },
        { n: '20', why: 'k-NN, the classifier this note leaves out' },
        { n: '14', why: 'how any of these models is judged' },
      ],
    },
    '9': {
      part: 'D',
      buildsOn: [{ n: '8', why: 'the Gini impurity equation' }],
      continuesIn: [{ n: '18', why: 'the same tree, fitted by scikit-learn' }],
      alsoSee: [{ n: '5', why: 'the SYN scanning pattern in the log activity' }],
    },
    '10': {
      part: 'D',
      buildsOn: [{ n: '7', why: 'what unsupervised learning means' }],
      continuesIn: [
        { n: '11', why: 'these paradigms assembled into a detection pipeline' },
        { n: '19', why: 'the K-Means named here, as a full practical' },
        { n: '21', why: 'a second unsupervised detector on the same data' },
      ],
      alsoSee: [{ n: '8', why: 'the neural networks that CNNs and RNNs extend' }],
    },
    '11': {
      part: 'E',
      buildsOn: [
        { n: '7', why: 'pattern recognition and anomaly detection' },
        { n: '10', why: 'the algorithm families the pipeline draws on' },
      ],
      continuesIn: [{ n: '12', why: 'where each algorithm is actually deployed' }],
      alsoSee: [
        { n: '5', why: 'the adversarial-ML question this note asks again' },
        { n: '6', why: 'the attacker economics behind the same activity' },
        { n: '7', why: 'where anomaly detection was first defined' },
        { n: '14', why: 'the false positives and negatives discussed here get their equations there' },
        { n: '19', why: 'this pipeline implemented as a K-Means practical' },
      ],
    },
    '12': {
      part: 'E',
      buildsOn: [
        { n: '8', why: 'the algorithms being deployed' },
        { n: '11', why: 'the detection pipeline' },
      ],
      continuesIn: [
        { n: '17', why: 'the SVM and KNN named here' },
        { n: '18', why: 'the decision tree named here' },
        { n: '22', why: 'the Random Forest and Logistic Regression named here' },
      ],
      alsoSee: [
        { n: '7', why: 'the supervised / unsupervised split this note re-frames' },
        { n: '14', why: 'the metrics that decide between these algorithms' },
      ],
    },
    '13': {
      part: 'F',
      buildsOn: [{ n: '3', why: 'the analytical skills this puts to work' }],
      continuesIn: [{ n: '16', why: 'all three types of EDA, in code' }],
      alsoSee: [{ n: '15', why: 'the libraries named here' }],
    },
    '14': {
      part: 'E',
      buildsOn: [{ n: '8', why: 'you need a trained model before you can score one' }],
      continuesIn: [
        { n: '17', why: 'these metrics printed by the SVM and KNN listings' },
        { n: '18', why: 'the same metrics, plus cross-validation' },
        { n: '22', why: 'the metrics used to compare four models at once' },
      ],
      alsoSee: [
        { n: '11', why: 'the same false positives and negatives, in plain language' },
        { n: '12', why: 'the algorithm comparison these metrics settle' },
      ],
    },
    '15': {
      part: 'F',
      buildsOn: [{ n: '3', why: 'the programming skills this makes concrete' }],
      continuesIn: [{ n: '16', why: 'all four libraries used together on a real dataset' }],
      alsoSee: [
        { n: '13', why: 'the EDA these libraries are for' },
        { n: '21', why: 'Pandas covered a second time, with Scikit-Learn' },
      ],
    },
    '16': {
      part: 'F',
      buildsOn: [
        { n: '13', why: 'the three types of EDA' },
        { n: '15', why: 'the four libraries' },
      ],
      continuesIn: [
        { n: '17', why: 'the same dataset, now modelled' },
        { n: '18', why: 'the same dataset, with a decision tree' },
      ],
      alsoSee: [{ n: '22', why: 'the same EDA moves on the credit-card data' }],
    },
    '17': {
      part: 'F',
      buildsOn: [
        { n: '8', why: 'the SVM theory and its margin' },
        { n: '20', why: 'what k is — this note uses it before it has been explained' },
      ],
      continuesIn: [{ n: '22', why: 'both models again, compared against two others' }],
      alsoSee: [
        { n: '12', why: 'why these two algorithms are the ones deployed here' },
        { n: '14', why: 'the metrics these listings print' },
        { n: '16', why: 'the EDA on this same dataset' },
      ],
      warning: 'This practical uses KNeighborsClassifier three topics before note 20 explains k-NN. Read note 20 first.',
    },
    '18': {
      part: 'F',
      buildsOn: [
        { n: '8', why: 'the CART algorithm and Gini' },
        { n: '9', why: 'the same split, worked by hand' },
      ],
      alsoSee: [
        { n: '12', why: 'why a decision tree is deployed for this task' },
        { n: '14', why: 'the metrics, and why cross-validation is reported' },
        { n: '16', why: 'the EDA on this same dataset' },
        { n: '22', why: 'a decision tree again, in the model comparison' },
      ],
    },
    '19': {
      part: 'F',
      buildsOn: [{ n: '10', why: 'clustering as an unsupervised method' }],
      alsoSee: [
        { n: '21', why: 'Isolation Forest, on the same traffic array' },
        { n: '11', why: 'the anomaly-detection process this implements' },
      ],
    },
    '20': {
      part: 'D',
      buildsOn: [{ n: '7', why: 'supervised learning' }],
      continuesIn: [{ n: '17', why: 'k-NN in scikit-learn — printed earlier in the notes' }],
      alsoSee: [
        { n: '8', why: 'the other supervised classifiers, which this note sits apart from' },
        { n: '22', why: 'KNN as one of the four compared models' },
      ],
      warning: 'The practical for this topic is note 17, which comes before it on the page.',
    },
    '21': {
      part: 'F',
      buildsOn: [
        { n: '10', why: 'where unsupervised anomaly detection was introduced' },
        { n: '15', why: 'Pandas, covered here a second time' },
      ],
      alsoSee: [{ n: '19', why: 'K-Means on the identical traffic array' }],
    },
    '22': {
      part: 'F',
      buildsOn: [
        { n: '14', why: 'the metrics the comparison is built on' },
        { n: '17', why: 'the SVM and KNN being compared' },
        { n: '18', why: 'the decision tree being compared' },
      ],
      alsoSee: [
        { n: '12', why: 'the algorithm comparison table this puts to the test' },
        { n: '16', why: 'the same EDA moves, on a different dataset' },
        { n: '20', why: 'the k-NN theory behind one of the four models' },
      ],
    },
    '23': {
      part: 'B',
      buildsOn: [{ n: '4', why: 'the technical controls this topic decides how to manage' }],
      continuesIn: [
        { n: '24', why: 'the process and life cycles that deliver these objectives' },
        { n: '25', why: 'the policy and principles that put them in writing' },
      ],
      alsoSee: [{ n: '26', why: 'the life cycle and adoption picture the management problem sits inside' }],
      warning: 'Printed last, but belongs immediately after note 4. It is the management half of the same subject.',
    },
    '24': {
      part: 'B',
      buildsOn: [{ n: '23', why: 'the objectives the process exists to deliver' }],
      continuesIn: [{ n: '25', why: 'the policy and design principles applied in the design stage' }],
      alsoSee: [
        { n: '4', why: 'the same "protect at all stages" idea, stated technically' },
        { n: '26', why: 'the big data life cycle these controls attach to' },
      ],
    },
    '25': {
      part: 'B',
      buildsOn: [{ n: '23', why: 'the objectives policy is written to achieve' }],
      alsoSee: [
        { n: '24', why: 'where in the design process these principles are applied' },
        { n: '4', why: 'the pillars a big data security policy has to mandate' },
      ],
    },
    '26': {
      part: 'A',
      buildsOn: [{ n: '1', why: 'what big data is and where it comes from' }],
      continuesIn: [{ n: '24', why: 'securing each of these stages, as lifecycle security management' }],
      alsoSee: [
        { n: '2', why: 'the same technologies split by purpose rather than by layer' },
        { n: '3', why: 'the skills each stage of the life cycle demands' },
        { n: '4', why: 'the governance and security layer, in detail' },
        { n: '23', why: 'why this scale and these copies make security management harder' },
      ],
      warning: 'Printed last, but belongs with notes 1-3.',
    },
  },
};
