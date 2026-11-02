// COS 211 — Computer Programming I (Introduction to Scientific Programming)
// Transcribed from two sources, in this order:
//
//   Topics 1–6  — the lecturer's class notes, 20/10/2025 to 18/2/2026, kept in
//                 lecture order with each session's date on its first section.
//   Topics 7–12 — the departmental lab manual, "Problem Solving and Programming
//                 with MATLAB", Modules 1–6. The manual's blank "Practical
//                 Assessment 1" answer sheet is omitted.
//
// The course is taught in MATLAB. Listings use `language: 'matlab'`.
//
// Which syllabus items each topic reaches is recorded on the course as
// `noteCoverage` (courses.js / dataScienceCourses.js), not here — these notes
// are shared between catalogues.
//
// Figures: the scanned flowcharts were redrawn as SVG from the scans
// (public/lecture-notes/cos-211/), with labels as printed. Handwritten
// formulas and matrices are typeset as `math` sections instead of images.
// Corrections and anything added beyond the sources are marked with a `note`
// section ("Added for clarity") rather than silently changed.

const IMG = '/lecture-notes/cos-211';

export const cos211LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 1 — INTRODUCTION TO SCIENTIFIC PROGRAMMING (20/10/2025)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'Introduction to Scientific Programming',
    sections: [
      {
        type: 'bullets',
        heading: 'Steps to Follow in Solving a Scientific Problem',
        date: '20/10/2025',
        items: [
          '1. Problem identification: you should be able to identify the problem and analyse the problem.',
          '2. Algorithm design → flowchart; mathematical model; natural language; pseudocode.',
          '3. Implementation (coding and programming).',
          '4. Testing and validation.',
        ],
      },
      {
        type: 'termlist',
        heading: 'Things to Know in Programming',
        items: [
          { term: 'Data', def: 'Values that will be used in programming for computation. Data can be numeric, text, sign and image.' },
          { term: 'Data type', def: 'The format in which a value is represented or exists in programming. Data types are classified as primitive and non-primitive.' },
          { term: 'Variable', def: 'A data identifier, a placeholder, or a container whose value is subject to change during program execution.' },
          { term: 'Error', def: 'A mistake that occurs during programming as a result of a violation of the rules and regulations that govern a particular programming language, use of wrong logic, or wrong input supplied.' },
          { term: 'Keywords', def: 'Reserved library functions with pre-defined meaning. They are not used as variables.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Types of Data Type',
        items: ['Integer', 'Float', 'Double', 'Strings', 'Boolean', 'Char / character'],
      },
      {
        type: 'termlist',
        heading: 'Standard or Common Types of Errors',
        items: [
          { term: 'Syntax or compilation error', def: 'The code does not follow the rules of programming. Wrong spelling of words also causes a syntax error.' },
          { term: 'Logical or semantic error', def: 'The program runs but the output is incorrect.' },
          { term: 'Run-time error', def: 'The program encounters wrong input while running. Division by zero also causes a run-time error, as does going past an index boundary.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Algorithms',
        text: 'An algorithm is a step-by-step procedure or set of rules to solve a particular problem. It is a recipe.',
      },
      {
        type: 'bullets',
        heading: 'Uses of Algorithms',
        items: ['In computing', 'Artificial intelligence', 'Cyber security', 'Mathematics'],
      },
      {
        type: 'bullets',
        heading: 'Characteristics of an Algorithm',
        items: [
          'Unambiguous',
          'Ordered — the steps in the algorithm must follow a sequence.',
          'Finite — an algorithm must terminate after reaching its final procedures.',
          'Clarity',
          'Generality',
          'Input/output',
          'Effective',
        ],
      },
      {
        type: 'bullets',
        heading: 'Properties of an Algorithm',
        items: [
          'It should terminate after a finite number of steps.',
          'It should produce at least one output.',
          'It should take zero (0) or more inputs.',
          'It must be deterministic.',
          'Every step in the algorithm must be effective.',
        ],
      },
      {
        type: 'proscons',
        heading: 'Advantages and Disadvantages of Algorithms',
        advantages: [
          'It is easy to understand.',
          'It is a step-wise representation of a solution to a given problem.',
          'The problem is broken down into smaller pieces.',
        ],
        disadvantages: [
          'It is time consuming.',
          'Branching and looping statements are difficult to show.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Why Do We Need Algorithms?',
        items: ['Efficiency', 'Consistency', 'Scalability', 'Problem decomposition'],
      },
      {
        type: 'bullets',
        heading: 'How to Design an Algorithm',
        items: [
          '1. The problem that is to be solved by the algorithm.',
          '2. The constraints of the problem must be considered while solving it.',
          '3. The inputs to be taken.',
          '4. The output that is expected.',
          '5. The solution to the problem.',
        ],
      },
      {
        type: 'text',
        heading: 'Example: Add Three Numbers and Print the Sum',
        text: 'Constraint: the input should contain only digits and no other characters.',
      },
      {
        type: 'bullets',
        heading: 'Algorithm to Add Three Numbers and Print the Sum',
        items: [
          '1. START',
          '2. Declare three integer variables as num1, num2 and num3.',
          '3. Take the three numbers to be added as input num1, num2 and num3.',
          '4. Declare a variable as sum.',
          '5. Add the three numbers and store the result in the variable sum.',
          '6. Print the value of the variable sum.',
          '7. END',
        ],
      },
      {
        type: 'bullets',
        heading: 'Algorithm to Find the Product of Three Integers',
        items: [
          '1. START',
          '2. Declare three integer variables as num1, num2 and num3.',
          '3. Take the three numbers to be multiplied as input num1, num2 and num3.',
          '4. Declare a variable as product.',
          '5. Multiply the three numbers and store the result in the variable product.',
          '6. Print the value of the variable product.',
          '7. END',
        ],
      },
      {
        type: 'termlist',
        heading: 'Ways to Express an Algorithm',
        items: [
          { term: 'Flowchart', def: 'A graphical or pictorial representation of the algorithm (below).' },
          { term: 'Pseudocode', def: 'Annotations and informative text written in plain English, similar to code but with no syntax of any programming language.' },
          { term: 'Programming code', def: 'The actual representation in a programming language.' },
        ],
      },
      {
        type: 'text',
        heading: 'Poorly and Well-Structured Algorithms',
        text: 'The algorithm to add three numbers above is the poorly structured version. The well-structured version has eight steps instead of seven: it adds a check as step 3 — "Ensure that the numbers are non-negative" — before the numbers are used, and ends at step 8 (END). For the algorithm to multiply three numbers, the well-structured version likewise adds step 3: "Ensure that the numbers are not zero."',
      },
      {
        type: 'note',
        text: 'In the notes only the new step 3 and END are written out for the well-structured versions; the other steps are left blank, and are the same as in the poorly structured versions. The point is that a well-structured algorithm validates its input before using it.',
      },
      {
        type: 'definition',
        heading: 'Pseudocode',
        text: 'Pseudocode expresses an algorithm in plain-English statements that look like code but follow no programming language\'s syntax.',
      },
      {
        type: 'code',
        heading: 'Calculate the Area of a Rectangle',
        language: 'pseudocode',
        code: 'START\nREAD LENGTH, WIDTH\nAREA = LENGTH * WIDTH\nPRINT AREA\nEND',
      },
      {
        type: 'code',
        heading: 'Convert Minutes to Seconds',
        language: 'pseudocode',
        code: 'START\nREAD MINUTES\nSECONDS = MINUTES * 60\nPRINT SECONDS\nEND',
      },
      {
        type: 'bullets',
        heading: 'Converting an Algorithm to Pseudocode: Is a Number Even or Odd?',
        items: [
          'Algorithm — 1. START',
          '2. Read a number.',
          '3. Check whether the number MOD 2 = 0; if so, it is even.',
          '4. Otherwise it is odd.',
          '5. END',
        ],
      },
      {
        type: 'code',
        heading: 'The Same Algorithm as Pseudocode',
        language: 'pseudocode',
        code: 'START\nREAD NUM\nIF NUM MOD 2 = 0 THEN\n    PRINT "NUM IS EVEN"\nELSE\n    PRINT "NUM IS ODD"\nEND IF\nEND',
      },
      {
        type: 'definition',
        heading: 'Flowchart',
        text: 'A flowchart is a graphical or pictorial representation of an algorithm.',
      },
      {
        type: 'image',
        src: `${IMG}/flowchart-symbols.svg`,
        width: 800, height: 360,
        caption: 'Flowchart symbols. The lecture drew the terminal, process, input/output and decision symbols and the flowlines; the lab manual (Topic 7) adds the predefined process and connectors.',
        alt: 'Seven flowchart symbols: terminal (an oval), process (a rectangle), input/output (a parallelogram), decision (a diamond), predefined process (a rectangle with double side bars), flow lines (arrows in four directions), and connectors (a circle for on-page, a pointed box for off-page).',
      },
      {
        type: 'bullets',
        heading: 'Flowlines',
        items: ['A flowline must always have an arrow.', 'A flowchart must have one entry point.'],
      },
      {
        type: 'text',
        heading: 'Exercise: Positive, Negative or Zero',
        text: 'Draw a flowchart to accept an input and determine whether it is positive, negative or zero.',
      },
      {
        type: 'image',
        src: `${IMG}/sign-flowchart.svg`,
        width: 720, height: 630,
        caption: 'The flowchart from the notes: test N ≤ 0 first, then N < 0',
        alt: 'Flowchart: START, READ NUMBER, then a decision IF N ≤ 0. NO leads to PRINT N IS POSITIVE. YES leads to a second decision IF N < 0: YES prints N IS NEGATIVE, NO prints N IS ZERO. All three paths end at END.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 2 — PROGRAMMING PARADIGMS, VARIABLES AND DATA TYPES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2',
    title: 'Programming Paradigms, Variables and Data Types',
    sections: [
      {
        type: 'definition',
        heading: 'Introduction to Programming Paradigms',
        date: '7/1/2026',
        text: 'A paradigm is a method to solve a problem. A programming paradigm is a method of solving a problem using a specific programming language.',
      },
      {
        type: 'bullets',
        heading: 'Types of Programming Paradigm',
        items: [
          '1. Imperative paradigm — includes object-oriented programming (OOP), the parallel processing approach (PPA) and the procedural paradigm.',
          '2. Declarative programming paradigm — the style of building programs that expresses the logic of a computation without talking about its control flow.',
          '3. PROLOG',
          '4. Functional programming paradigm',
          '5. Database / data-driven programming approach',
        ],
      },
      {
        type: 'note',
        text: 'PROLOG is a programming language, not a paradigm: it is the standard example of logic programming, a kind of declarative programming. It appears as item 3 in the notes.',
      },
      {
        type: 'proscons',
        heading: 'Imperative Programming',
        advantages: ['It is easy to implement, and contains loops and variables.'],
        disadvantages: ['Complex problems cannot be solved, and it is less efficient.'],
      },
      {
        type: 'bullets',
        heading: 'Variables in MATLAB',
        items: [
          'In MATLAB, variables are the basic building blocks for storing data and performing operations.',
          'A variable name must not contain spaces or special characters.',
          'Variable names are case sensitive.',
          'A variable must not have the same name as a keyword.',
          'The maximum variable-name length is given by namelengthmax.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Data Types',
        items: ['Numeric data type', 'Logical (>, <, ==)', 'Character and string array'],
      },
      {
        type: 'bullets',
        heading: 'Data Types in MATLAB',
        date: '14/1/2026',
        items: [
          'Data types are the format in which we represent a value.',
          'MATLAB has implicit data types — you do not declare a type before using a variable.',
          'The Workspace keeps a history of any program you run.',
        ],
      },
      {
        type: 'table',
        heading: 'Format Specifiers',
        headers: ['Specifier', 'Prints'],
        rows: [
          ['%s', 'String'],
          ['%d', 'Integer'],
          ['%f', 'Float'],
        ],
      },
      {
        type: 'table',
        heading: 'MATLAB Class Practical: Greek Letters',
        headers: ['Symbol', 'Read as (in the notes)', 'Name to use in code'],
        rows: [
          ['μ', 'meu', 'mu'],
          ['θ', 'teta', 'theta'],
          ['φ', 'Phi', 'phi'],
          ['Ω', 'ohm', 'omega'],
          ['α', 'alp', 'alpha'],
          ['β', 'beta', 'beta'],
          ['γ', 'gamma', 'gamma'],
        ],
      },
      {
        type: 'note',
        text: 'The third column is added: MATLAB variable names must be plain letters, so a Greek symbol in a formula becomes its English name in code (Ω is the capital Greek letter omega, the symbol for the ohm).',
      },
      {
        type: 'text',
        heading: 'Write a MATLAB Program to Find the Value of σ',
        text: 'Find σ if −R = 2, Q = π/2 and x = 4. In MATLAB the formula is written abs(-R*Q)/sqrt(x^2).',
      },
      { type: 'math', tex: '\\sigma = \\frac{|-RQ|}{\\sqrt{x^2}}' },
      {
        type: 'note',
        text: 'Worked value (added): −R = 2 means R = −2, so |−RQ| = |2 × π/2| = π and √(4²) = 4, giving σ = π/4 ≈ 0.7854.',
      },
      {
        type: 'text',
        heading: 'Write a MATLAB Program to Find the Value of n',
        text: 'The notes rearrange the combined gas equation for n:',
      },
      { type: 'math', tex: '\\frac{n^2 P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2} \\quad\\Longrightarrow\\quad n = \\sqrt{\\frac{P_2 V_2 T_1}{P_1 V_1 T_2}}' },
      {
        type: 'note',
        text: 'The denominator in the scan reads "P₁ X₁ T₂"; from the line above it is P₁ V₁ T₂. In MATLAB: n = sqrt((P2*V2*T1)/(P1*V1*T2)).',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 3 — CONTROL STRUCTURES: THE IF STATEMENT
  // ─────────────────────────────────────────────────────────────────
  {
    number: '3',
    title: 'Control Structures: The if Statement',
    sections: [
      {
        type: 'bullets',
        heading: 'Control Structure',
        items: [
          '1. Transfer — if-end, if-else-end, if-elseif-end, if-elseif-else-end',
          '2. Looping',
        ],
      },
      {
        type: 'code',
        heading: '1. if-end',
        language: 'matlab',
        code: String.raw`if (condition)
    stmt(s)
end

if (x > 0)
    x^2
end`,
      },
      {
        type: 'code',
        heading: '2. if-else-end',
        language: 'matlab',
        code: String.raw`if (x > 0)
    x^2
else
    x/2
end`,
      },
      {
        type: 'code',
        heading: '3. if-elseif-end',
        language: 'matlab',
        code: String.raw`if x > 0
    disp(x^2);
elseif x < 0
    disp(x/2);
end`,
      },
      {
        type: 'note',
        text: 'Corrected in transcription: the notes repeat the first test in the elseif line; the second test is x < 0.',
      },
      {
        type: 'text',
        heading: 'Positive or Negative?',
        text: 'Write a MATLAB program to determine / verify whether the value of i is positive or negative. Test values for i: 0, −5, 10, 11, −3.',
      },
      {
        type: 'code',
        language: 'matlab',
        code: String.raw`i = 0;
if (i > 0)
    current = "+ve";
elseif (i < 0)
    current = "-ve";
else
    current = "Neutral";
end
disp(current);`,
      },
      {
        type: 'bullets',
        heading: 'Disease Outbreaks',
        items: [
          'Write a MATLAB program to determine the degree of a disease outbreak as endemic, epidemic or pandemic depending on the death rate:',
          'Death rate [comparison sign overwritten in the notes] 100 is endemic.',
          'Death rate < 500 is epidemic.',
          'Death rate > 500 is pandemic.',
          'Then test your values using a model.',
        ],
      },
      {
        type: 'note',
        text: 'The sign before 100 is written over in the notes. Read it as "less than 100 is endemic" so the three bands do not overlap: under 100 endemic, 100 to under 500 epidemic, above 500 pandemic. An if-elseif chain tests them in that order. Note that a death rate of exactly 500 falls in no band as written. (Module 4\'s Practice Question 5 is the same exercise with different thresholds.)',
      },
      {
        type: 'text',
        heading: 'Divisible or Not?',
        text: 'The notes then write "x sin x" with test values for x: 20, 50 and π/2, followed by this divisibility check:',
      },
      {
        type: 'code',
        language: 'matlab',
        code: String.raw`x = 0;
if ((mod(x,5) == 0))
    "Divisible"
else
    "Not divisible"
end`,
      },
      {
        type: 'note',
        text: 'To the right of the condition the notes also write (mod(x,7) == 0), with no joining operator visible. To test divisibility by both 5 and 7, join the two with &&: if (mod(x,5) == 0) && (mod(x,7) == 0).',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 4 — ARRAYS AND LOOPS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '4',
    title: 'Arrays and Loops',
    sections: [
      {
        type: 'text',
        heading: 'Array',
        date: '28/1/2026',
        text: 'An array can be one-dimensional or two-dimensional. You access an element of an array using its index, for example x(2).',
      },
      {
        type: 'code',
        language: 'matlab',
        code: 'x = [3, 2, 9, 11];\nx(2)',
      },
      {
        type: 'note',
        text: 'MATLAB indices start at 1, so x(2) is the second element, 2. (The original statement about indexing was corrected in transcription.)',
      },
      {
        type: 'definition',
        heading: 'Looping',
        text: 'Looping is the process of repeating an action over and over again. It is also called iteration.',
      },
      {
        type: 'code',
        heading: 'The for Loop',
        language: 'matlab',
        code: String.raw`% General for-loop template; define k and j first.
for i = k:j
    % Statements to repeat
end`,
      },
      {
        type: 'text',
        text: 'k stands for the initial value (start); j stands for the final value.',
      },
      {
        type: 'code',
        heading: 'Display the Numbers 1 to 10',
        language: 'matlab',
        code: 'for i = 1:10\n    i\nend',
      },
      {
        type: 'code',
        heading: 'Display Odd Numbers',
        language: 'matlab',
        code: 'for i = 1:2:10\n    i\nend',
      },
      {
        type: 'code',
        heading: 'Display Even Numbers',
        language: 'matlab',
        code: 'for i = 2:2:10\n    i\nend',
      },
      {
        type: 'code',
        heading: 'Display "MATLAB" Five Times',
        language: 'matlab',
        code: 'for k = 1:5\n    disp("MATLAB")\nend',
      },
      {
        type: 'code',
        heading: 'The Square of Even Numbers',
        language: 'matlab',
        code: 'for evenNum = 2:2:20\n    evenNum^2\nend',
      },
      {
        type: 'code',
        heading: 'Enter the Scores of Three Students',
        language: 'matlab',
        code: 'for k = 1:3\n    score = input("Enter Score")\nend\nscore',
      },
      {
        type: 'text',
        text: 'The output displays only the last input: score is overwritten on each pass. Indexing score(k) stores all three:',
      },
      {
        type: 'code',
        language: 'matlab',
        code: 'for k = 1:3\n    score(k) = input("Enter Score:");\nend\nscore',
      },
      {
        type: 'text',
        text: 'Output: score = 20 30 50, which are the values entered.',
      },
      {
        type: 'code',
        heading: 'Fractions with rats',
        language: 'matlab',
        code: 'for i = 1:5\n    rats(1/i^2)\nend',
      },
      {
        type: 'text',
        text: 'The rats function converts a decimal to a fraction, so this prints 1, 1/4, 1/9, 1/16, 1/25.',
      },
      {
        type: 'code',
        heading: 'Sum of a Series',
        language: 'matlab',
        code: 'sumSeries = 0;\nfor i = 1:5\n    sumSeries = sumSeries + (1/i^2);\nend\nsumSeries',
      },
      {
        type: 'text',
        text: 'It adds the five terms together:',
      },
      { type: 'math', tex: '1 + \\tfrac{1}{4} + \\tfrac{1}{9} + \\tfrac{1}{16} + \\tfrac{1}{25} = 1.4636 \\text{ (rounded)}' },
      {
        type: 'note',
        text: 'The notes also write the result as the fraction 3659/2500. That is the rounded 1.4636 written as a fraction, not the sum itself: the exact sum is 5269/3600 = 1.463611…, which is what rats(sumSeries) returns.',
      },
      {
        type: 'code',
        heading: 'The Same Sum with a Different Variable Name',
        language: 'matlab',
        code: 'sigma = 0;\nfor i = 1:5\n    sigma = sigma + (1/i^2);\nend\nsigma',
      },
      {
        type: 'code',
        heading: 'The while Loop',
        date: '4/2/2026',
        language: 'matlab',
        code: String.raw`% General while-loop template
while condition
    % Statements that update the condition
end`,
      },
      {
        type: 'code',
        heading: 'Incorrect: an Infinite Loop',
        language: 'matlab',
        code: String.raw`i = 1;
while (i <= 10)
    i
end
% Incorrect: i never changes, so the loop does not stop.`,
      },
      {
        type: 'code',
        heading: 'To Increment',
        language: 'matlab',
        code: 'i = 1;\nwhile (i <= 10)\n    i\n    i = i + 1;\nend',
      },
      {
        type: 'code',
        heading: 'To Generate Odd Numbers',
        language: 'matlab',
        code: 'i = 1;\nwhile (i <= 10)\n    i\n    i = i + 2;\nend',
      },
      {
        type: 'code',
        heading: 'Even Numbers',
        language: 'matlab',
        code: 'i = 2;\nwhile (i <= 10)\n    i\n    i = i + 2;\nend',
      },
      {
        type: 'code',
        heading: 'Display the List x',
        language: 'matlab',
        code: 'x = [4, 9, 3, 6, 17];\ni = 1;\nwhile (i <= 5)\n    x(i)\n    i = i + 1;\nend',
      },
      {
        type: 'termlist',
        heading: 'Break and Continue Statements',
        items: [
          { term: 'break', def: 'Immediately terminates the execution of the entire loop.' },
          { term: 'continue', def: 'Skips the remaining statements in the current iteration and proceeds to the next iteration of the loop.' },
        ],
      },
      {
        type: 'code',
        heading: 'Plot in MATLAB',
        language: 'matlab',
        code: String.raw`x = [0:pi/2:10];
figure
plot(x)

x = pi/2:pi/2:10; % Exclude zero from the denominator
y = 1 ./ x;
figure;
plot(x, y, 'b--');`,
      },
      {
        type: 'text',
        text: 'Use ./ for element-wise division of a vector. The notes annotate the line-style argument: the letters g, b, k, y, r, m choose a colour (green, blue, black, yellow, red, magenta), and symbols such as +, o, * pick a marker while - and -- pick a solid or dashed line. \'b--\' therefore draws a blue dashed line.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 5 — GENERATIVE CODING AND PROMPT ENGINEERING
  // ─────────────────────────────────────────────────────────────────
  {
    number: '5',
    title: 'Generative Coding and Prompt Engineering',
    sections: [
      {
        type: 'definition',
        heading: 'Generative Coding',
        text: 'Generative AI (Gen AI) refers to AI systems that can create new content such as text, images, audio, etc.',
      },
      {
        type: 'text',
        text: 'Gen AI can write code, create code, translate code between languages, generate documentation and suggest improvements.',
      },
      {
        type: 'text',
        heading: 'Key Models and Types of Generative AI',
        text: 'These include large language models, e.g. ChatGPT and Gemini, which are trained on massive text data and can understand programming syntax, predict the next token in code, and generate structured programs.',
      },
      {
        type: 'bullets',
        heading: 'Why AI Cannot Replace the Programmer',
        items: [
          'AI is not a substitute for understanding algorithms.',
          'It is not a replacement for computational thinking.',
          'It is not a guarantee of correctness.',
          'AI does not truly understand the problem.',
          'It predicts likely code, not correct code.',
          'It may introduce hidden assumptions.',
          'It may generate inefficient solutions.',
        ],
      },
      {
        type: 'text',
        text: 'In summary, programming knowledge remains fundamental. AI only amplifies skill; it does not create it.',
      },
      {
        type: 'definition',
        heading: 'Prompt Engineering',
        text: 'Prompt engineering is the process of designing clear instructions to guide AI output. It is similar to having a human in the loop.',
      },
      {
        type: 'bullets',
        items: ['Poor prompt = poor output.', 'Clear prompt = structured output.'],
      },
      {
        type: 'bullets',
        heading: 'Content of a Good Prompt',
        items: ['1. Objective', '2. Constraint', '3. Input description', '4. Expected output', '5. Boundary cases', '6. Test cases'],
      },
      {
        type: 'termlist',
        heading: 'Limitations of AI',
        items: [
          { term: 'Hallucination', def: 'It may use incorrect syntax, and may refer to fake libraries.' },
          { term: 'Logic errors', def: 'Code may run without errors yet produce incorrect results.' },
          { term: 'Overconfidence', def: 'AI states wrong answers as confidently as right ones.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'The Student Must',
        items: [
          'Run the code.',
          'Test boundary cases.',
          'Compare expected versus actual output.',
          'Debug or make corrections if necessary.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Example 1: Accept and Sum the Scores 32, 54, 90, 78, 30',
        items: [
          'START',
          'Step 1: sum = 0',
          'Step 2: Get a score',
          'Step 3: Add the score to sum',
          'Step 4: Go to step 2',
          'Step 5: Output sum',
        ],
      },
      {
        type: 'note',
        text: 'Step 4 sends the algorithm back to step 2 forever, so step 5 is never reached. This is Algorithm 2 of the lab manual\'s Example 1.1 (Topic 7), which explains the problem and fixes it with a sentinel value.',
      },
      {
        type: 'bullets',
        heading: 'Example 2: Dial and Receive a Call',
        items: [
          'Step 1: Start.',
          'Step 2: Get a cell phone.',
          'Step 3: Find or dial the contact.',
          '4. Is the contact correct?',
          '5. If no, recheck the contact.',
          '6. Call back again.',
          '7. Is the call connecting? If NO, go back to step 5.',
          '8. Is the call connecting? If yes, wait and listen.',
          '9. Stop.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Assignment',
        prompt: 'Find the application of the Fibonacci sequence in real life.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 6 — LOOPS IN PRACTICE, VISUALISATION, FUNCTIONS, MATRICES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '6',
    title: 'Factorials, Fibonacci, Visualisation, Functions and Matrices',
    sections: [
      {
        type: 'code',
        heading: 'Control Structure: Factorial',
        date: '18/2/2026',
        language: 'matlab',
        code: 'n = 5;\nfact = 1;\nfor k = 1:n\n    fact = fact * k;\nend\ndisp(fact);\nfact',
      },
      {
        type: 'code',
        language: 'output',
        code: 'fact = 120',
      },
      {
        type: 'text',
        heading: 'Fibonacci Sequence',
        text: '1, 1, 2, 3, 5, 8, 13, … — each term is the sum of the two before it.',
      },
      {
        type: 'code',
        language: 'matlab',
        code: 'fibo = zeros(1, 10);\nfibo(1:2) = [1, 1];\nfor k = 3:10\n    fibo(k) = fibo(k-1) + fibo(k-2);\nend\ndisp(fibo);',
      },
      {
        type: 'bullets',
        heading: 'Visualisation in MATLAB',
        items: [
          'The line plot is used to display the relationship between trend and time.',
          'Histogram — shows frequency; a normal distribution gives a bell shape.',
        ],
      },
      {
        type: 'note',
        text: 'The notes read "train & time"; "trend and time" is the likely word. The histogram line continues "It is used to display implicit curve" — as transcribed.',
      },
      {
        type: 'code',
        heading: 'Histogram',
        language: 'matlab',
        code: 'data = randn(1000, 1);\nhistogram(data);',
      },
      {
        type: 'code',
        heading: 'Bar Chart',
        language: 'matlab',
        code: String.raw`loc = 1:10;
data = rand(1, 10);
bar(loc, data);
title('Bar chart')
xlabel('x-axis')
ylabel('y-axis')`,
      },
      {
        type: 'text',
        heading: 'Functions',
        text: 'Functions are blocks of code that perform a particular task. A function should have inputs and outputs. Functions can be classified as argument and non-argument, or parameterised and non-parameterised. Traditionally, all built-in functions are parameterised functions. A function can return a single value or multiple values.',
      },
      {
        type: 'code',
        heading: 'Built-in Functions',
        language: 'matlab',
        code: 'sin(pi/2)\ncos(0)\nabs(-5)\nmod(7, 2)\nsqrt(9)',
      },
      {
        type: 'code',
        heading: 'Syntax of a Function',
        language: 'matlab',
        code: String.raw`% Illustrative template; save as functionName.m
function output = functionName(input)
    output = input; % Replace with the required computation
end`,
      },
      {
        type: 'note',
        text: 'The notes write the syntax as "function [functionVariable] = functionName(…)" followed by % comment lines; the scan cuts off the parameter list, so the complete template above was added in transcription. All functions must start with the function keyword and end with the end keyword.',
      },
      {
        type: 'text',
        heading: 'Matrix and Array',
        text: 'The notes label the rows and columns of A with their indices 1, 2, 3.',
      },
      {
        type: 'math',
        tex: 'A = \\begin{pmatrix} 2 & 4 & 1 \\\\ -3 & 3 & 2 \\\\ 2 & 8 & 1 \\end{pmatrix} \\quad B = \\begin{pmatrix} 3 & 4 & 3 \\\\ -7 & 1 & -2 \\end{pmatrix} \\quad C = \\begin{pmatrix} 11 & 4 & 9 & 2 \\end{pmatrix} \\quad D = \\begin{pmatrix} 4 \\\\ 2 \\\\ 1 \\\\ 9 \\end{pmatrix}',
      },
      {
        type: 'code',
        heading: 'Matrix Functions',
        language: 'matlab',
        code: 'det(A)\nsize(A)\ndiag(A)\ninv(A)\ntranspose(B)\nA(:,:)   % All rows, all columns',
      },
      {
        type: 'bullets',
        heading: 'Exercises',
        items: [
          'Return matrix C and the transpose of D as a new matrix E.',
          'The third row of matrix A.',
        ],
      },
      {
        type: 'code',
        heading: 'Row Statistics',
        language: 'matlab',
        code: String.raw`mean(A, 2)       % Mean of each row
max(A, [], 2)    % Maximum of each row
min(A, [], 2)    % Minimum of each row
zeros(3, 3)      % A 3-by-3 zero matrix`,
      },
      {
        type: 'note',
        items: [
          'C is a 1×4 row and D a 4×1 column, so the transpose of D is also 1×4: E = [C; D\'] stacks them into a 2×4 matrix.',
          'The third row of A is A(3, :), which returns [2 8 1].',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 7 — LAB MANUAL MODULE 1: ALGORITHMS AND FLOWCHARTS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '7',
    title: 'Lab Manual Module 1: Introduction to Algorithms and Flowcharts',
    sections: [
      {
        type: 'definition',
        text: 'An algorithm is a well-defined sequence of steps that provides a solution to a specific problem. Flowcharts are visual representations of these steps, using symbols to describe processes, decisions and outputs.',
      },
      {
        type: 'definition',
        heading: 'Flowchart',
        text: 'A flowchart is a graphical or symbolic representation of an algorithm. Put differently, it is the diagrammatic or pictorial representation of the step-by-step solution to a given problem.',
      },
      {
        type: 'text',
        text: 'Program design consists of the steps a programmer should follow before coding a program in a specific language. Good program design helps in the proper documentation and maintenance of the program in future.',
      },
      {
        type: 'text',
        text: 'Flowcharting is an excellent way of documenting a process. Process improvement begins with an understanding of the process, and flowcharting is the first step towards process understanding. We present seven (7) basic flowcharting symbols. Although these are not the only symbols used during flowcharting, they are most often used and sufficient to drive home what we intend to illustrate. The seven symbols are: terminal, process, input/output, decision, predefined process and connectors.',
      },
      {
        type: 'note',
        text: 'The sentence names six symbols; the seventh, in the manual\'s table, is flow lines.',
      },
      {
        type: 'image',
        src: `${IMG}/flowchart-symbols.svg`,
        width: 800, height: 360,
        caption: 'The seven basic flowcharting symbols',
        alt: 'Seven flowchart symbols: terminal (an oval), process (a rectangle), input/output (a parallelogram), decision (a diamond), predefined process (a rectangle with double side bars), flow lines (arrows in four directions), and connectors (a circle for on-page, a pointed box for off-page).',
      },
      {
        type: 'table',
        heading: 'Flowchart Symbols',
        headers: ['Name', 'Function'],
        rows: [
          ['Terminal', 'Indicates the beginning and ending of a program\'s process or an interrupt.'],
          ['Process', 'Indicates any type of internal operation inside the processor or memory (e.g. computations).'],
          ['Input/output', 'Used for any input/output (I/O) operation. Indicates that the computer is to obtain data or produce results.'],
          ['Decision', 'Used to ask a question whose answer is either (yes, no), (true, false), or (0, 1).'],
          ['Predefined process', 'Used to invoke a subroutine or an interrupt program, or to do housekeeping (initialisation of variables, for instance).'],
          ['Flow lines', 'Used to show the direction of program flow.'],
          ['Connectors', 'Used to connect breaks in a flowchart. The circle represents an on-page connector, while the other symbol represents an off-page connector.'],
        ],
      },
      {
        type: 'bullets',
        heading: 'Flowcharting Rules',
        items: [
          'All symbols of a flowchart are connected with arrows (not lines).',
          'Flowchart symbols have an entry point on the top of the symbol with no other entry points. The exit point for all flowchart symbols is on the bottom, except for the decision symbol.',
          'The decision symbol has two exit points; these can be on the sides, or a side and the bottom.',
          'It is good practice to always channel flowcharts from top to bottom.',
          'Connectors are used to link breaks in the flowchart — for instance, from one page to another (off-page), or from the bottom of the page to the top of the same page (on-page).',
          'Subroutines and interrupt programs have their own, independent flowcharts.',
          'All flowcharts start with a terminal or predefined process (for interrupts and subroutines) symbol.',
          'All flowcharts end with a terminal or a continuous loop.',
        ],
      },
      {
        type: 'note',
        text: 'The manual prints the last rule as "a contentious loop"; "continuous" is the intended word — a program such as a controller\'s main loop may run forever by design.',
      },
      {
        type: 'text',
        heading: 'Example 1.1: Sum Five Scores',
        text: 'Write a narrative of steps (algorithm) and draw the corresponding pictorial version (flowchart) to accept and sum the following scores: 32, 54, 90, 78, 30. In this example, common mistakes made in algorithm/flowchart design are presented, and the steps required to refine the design into a more robust one are discussed.',
      },
      {
        type: 'bullets',
        heading: 'Algorithm 1',
        items: [
          'Step 1: sum = 0',
          'Step 2: get the first score',
          'Step 3: add the first score to sum',
          'Step 4: get the second score',
          'Step 5: add the second score to sum',
          'Step 6: get the third score',
          'Step 7: add the third score to sum',
          'Step 8: get the fourth score',
          'Step 9: add the fourth score to sum',
          'Step 10: get the fifth score',
          'Step 11: add the fifth score to sum',
          'Step 12: output sum',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/sum-scores-1.svg`,
        width: 680, height: 650,
        caption: 'Flowchart for Algorithm 1 — connector A joins the two columns',
        alt: 'Flowchart in two columns. Left: Start, sum = 0, get first score, sum = sum + first score, get second score, sum = sum + second score, get third score, connector A. Right: connector A, sum = sum + third score, get fourth score, sum = sum + fourth score, get fifth score, sum = sum + fifth score, output sum, Stop.',
      },
      {
        type: 'text',
        text: 'Algorithm 1 can be shortened by repeating the get-score process after adding the score to the sum. This process is called looping. Hence, the resulting algorithm becomes:',
      },
      {
        type: 'bullets',
        heading: 'Algorithm 2',
        items: ['Step 1: sum = 0', 'Step 2: get a score', 'Step 3: add the score to sum', 'Step 4: go to step 2', 'Step 5: output sum'],
      },
      {
        type: 'image',
        src: `${IMG}/sum-scores-2.svg`,
        width: 460, height: 520,
        caption: 'Flowchart for Algorithm 2 — the loop never exits',
        alt: 'Flowchart: Start, sum = 0, get score, sum = sum + score, with an arrow from sum = sum + score looping back to get score. Below are output sum and Stop, which the loop never reaches.',
      },
      {
        type: 'text',
        text: 'Algorithm 2, though shorter, repeats the input and sum processes forever, resulting in an infinite algorithm or flowchart, and will never get to print the sum (output). This is poor programming, unacceptable, and should be avoided. There are various ways of resolving this problem. One way is to add a final value to the list of numbers we desire to sum. Such a value should be unique, and should be tested each time we get a score to process. So, a unique score may be \'-1\' or \'999\', etc. Our list of scores now becomes: 32, 54, 90, 78, 30, −1; and the algorithm becomes:',
      },
      {
        type: 'bullets',
        heading: 'Algorithm 3',
        items: [
          'Step 1: sum = 0',
          'Step 2: get a score',
          'Step 3: is score equal to −1?',
          'Step 4: yes: go to step 7',
          'Step 5: no: add score to sum (or sum = sum + score)',
          'Step 6: go to step 2 (to get the next score)',
          'Step 7: output sum',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/sum-scores-3.svg`,
        width: 660, height: 570,
        caption: 'Flowchart for Algorithm 3 — the sentinel −1 ends the loop',
        alt: 'Flowchart: Start, sum = 0, get score, decision "is score = −1?". No leads to sum = sum + score and back up to get score. Yes leads to output sum, then Stop.',
      },
      {
        type: 'note',
        text: 'A value like −1 that marks the end of the data is called a sentinel. It must be a value that can never be a real score, which is why the manual says it must be unique.',
      },
      {
        type: 'bullets',
        heading: 'Example 1.2: Dial and Receive a Call',
        items: [
          'Step 1: get a cell phone',
          'Step 2: find the number / type the number',
          'Step 3: is the number correct?',
          'Step 4: no: go to step 2',
          'Step 5: yes: dial the number',
          'Step 6: is the call connected?',
          'Step 7: no: go to step 5',
          'Step 8: yes: wait and listen',
          'Step 9: is the call answered?',
          'Step 10: no: go to step 8',
          'Step 11: yes: say "HELLO" and continue talking till done',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/dial-call.svg`,
        width: 540, height: 1110,
        maxWidth: 440,
        caption: 'Flowchart for Example 1.2',
        alt: 'Flowchart: Start, Type a number, decision "is number correct?" (N loops back to Type a number), dial number, decision "is call connected?" (N loops back to dial number), Wait and listen, decision "is call answered?" (N loops back to Wait and listen), Start talking, decision "is call complete?" (N goes to Keep talking and back to the decision), End call, Stop.',
      },
      {
        type: 'text',
        heading: 'Example 1.3: Generate n Even Numbers',
        text: 'Write down the steps (an algorithm) to generate a set of n even numbers, and draw the corresponding flowchart.',
      },
      {
        type: 'bullets',
        heading: 'Algorithm 1 (Using a while Loop)',
        items: ['Step 1: input n', 'Step 2: i = 2', 'Step 3: is i ≤ n?', 'Step 4: no: stop', 'Step 5: yes:', 'Step 6: print i', 'Step 6: i = i + 2', 'Step 7: goto step 3'],
      },
      {
        type: 'image',
        src: `${IMG}/even-while.svg`,
        width: 580, height: 580,
        caption: 'Flowchart 1 (using a while loop)',
        alt: 'Flowchart: Start, input n, i = 2, decision "is i ≤ n?". No leads to Stop. Yes leads to print i, then i = i + 2, then back up to the decision.',
      },
      {
        type: 'bullets',
        heading: 'Algorithm 2 (Using a for Loop)',
        items: ['Step 1: input n', 'Step 2: for i = 2 to n in steps of 2', 'Step 3: is i > n?', 'Step 4: yes: stop', 'Step 5: no: print i', 'Step 6: goto step 3'],
      },
      {
        type: 'image',
        src: `${IMG}/even-for.svg`,
        width: 580, height: 500,
        caption: 'Flowchart 2 (using a for loop)',
        alt: 'Flowchart: Start, input n, process "i = 2 to n, step 2", decision "is i > n?". Yes leads to Stop. No leads to print i, then back up to the loop box.',
      },
      {
        type: 'note',
        text: 'Algorithm 1 numbers two steps as 6, as printed. In Algorithm 2 the loop box itself steps i on by 2, which is why the flowchart\'s arrow returns to the loop box rather than to the decision.',
      },
      {
        type: 'text',
        heading: 'Example 1.4: Find the Smallest Element',
        text: 'Consider a nonempty array DATA with N numerical values. Write an algorithm to find the location, LOC, and the value of the least element, MIN, of the array. An instance of the problem is shown below — the location with the least element is LOC = 4, and the least element is DATA[4].',
      },
      {
        type: 'table',
        headers: ['Location', 'DATA', 'Element'],
        rows: [
          ['1', '5', 'DATA[1]'],
          ['2', '7', 'DATA[2]'],
          ['3', '4', 'DATA[3]'],
          ['4', '2', 'DATA[4] — the least element'],
          ['⋮', '⋮', '⋮'],
          ['N', '6', 'DATA[N]'],
        ],
      },
      {
        type: 'bullets',
        heading: 'Algorithm',
        items: [
          'Step 1: initialise MIN = DATA[1]',
          'Step 2: initialise LOC = 1',
          'Step 3: initialise K = 2',
          'Step 4: input N',
          'Step 5: is K > N?',
          'Step 6: yes:',
          'Step 7: print LOC',
          'Step 8: print MIN',
          'Step 9: stop',
          'Step 10: no:',
          'Step 11: is MIN > DATA[K]?',
          'Step 12: yes:',
          'Step 13: LOC = K',
          'Step 14: MIN = DATA[K]',
          'Step 15: K = K + 1',
          'Step 16: goto 5',
          'Step 17: no:',
          'Step 18: K = K + 1',
          'Step 19: goto 5',
        ],
      },
      {
        type: 'image',
        src: `${IMG}/find-min.svg`,
        width: 700, height: 800,
        caption: 'Flowchart for Example 1.4 — the three initialisations sit in one predefined-process box',
        alt: 'Flowchart: Start, a predefined process box with MIN = DATA[1], LOC = 1, K = 2, then Input N, then decision "is K > N?". Yes leads to print LOC, print MIN, then Stop. No leads to decision "is MIN > DATA[K]?": yes sets LOC = K and MIN = DATA[K]; both branches then reach K = K + 1, which loops back to "is K > N?".',
      },
      {
        type: 'casestudy',
        title: 'Practice Question 1: Course Result Sheet',
        prompt: 'Write a MATLAB script that:',
        tasks: [
          'Asks you to input four courses you have taken this semester.',
          'Prompts for the grade and unit of each course.',
          'Calculates the grade point (GP) using the scale A = 5, B = 4, C = 3, D = 2, F = 0. Hint: GP = unit multiplied by the grade scale.',
          'Execute your program, displaying the courses offered, the grade, unit and GP. Copy the code and output of the script.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 2: Basic Login System',
        prompt: 'Write a MATLAB script that:',
        tasks: [
          'Stores your registration number as username and first name as password.',
          'Prompts you to input the username and password.',
          'Checks the entered credentials against the stored ones.',
          'Grants or denies access based on the match: output \'ACCESS GRANTED\' or \'ACCESS DENIED\'.',
          'If access is denied twice, displays \'ACCOUNT LOCKED\'.',
          'Execute your program for (1) the access-granted condition and (2) the account-locked condition, and copy the code and output.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 3: Simple Calculator (Flowcharting)',
        prompt: 'Draw a flowchart that:',
        tasks: [
          'Prompts the user to enter two numbers.',
          'Asks the user to choose an arithmetic operation: +, -, *, or /.',
          'Performs the operation and displays the result.',
          'Handles division by zero with a proper message.',
          'Displays the result clearly.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 4: Simple Calculator (Programming)',
        prompt: 'Write a MATLAB script that:',
        tasks: [
          'Prompts you to enter an \'A\' and \'E\' score.',
          'Asks you to choose an arithmetic operation: +, -, *, or /.',
          'Performs the operation and displays the result.',
          'Handles division by zero with a proper message.',
          'Displays the result for a successful calculation using any of the operators, and for a case of division by zero. Copy the code and output.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 5: A Student\'s Average Score',
        prompt: 'Write a MATLAB script that:',
        tasks: [
          'Creates a variable for your full name (string).',
          'Stores 3 test scores of your choice (numeric array).',
          'Calculates and displays the average score. Copy the code and output.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 6: Solving a Quadratic Equation',
        prompt: 'Write a MATLAB script that prompts you to enter the coefficients a, b and c (representing three denominations of Nigerian currency), to solve a quadratic equation of the form ax² + bx + c = 0.',
        tasks: [
          'Calculates the discriminant and finds the roots using the quadratic formula.',
          'Displays the solution of the quadratic equation. Execute it for any of the options and copy the code and output.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 7: Traffic Light (Flowcharting)',
        prompt: 'Draw a flowchart that:',
        tasks: [
          'Simulates a traffic light with Red, Yellow and Green lights.',
          'Displays each light in sequence with an appropriate message.',
          'Waits 5 seconds for Red, 2 seconds for Yellow, 4 seconds for Green.',
          'Repeats the cycle 3 times.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 8: Traffic Light (Programming)',
        prompt: 'Write MATLAB code that:',
        tasks: [
          'Simulates a traffic light with Red, Yellow and Green lights.',
          'Displays each light in sequence with the time of wait.',
          'Waits 1 minute for Red, 2 minutes for Yellow, 30 seconds for Green.',
          'Repeats the cycle 3 times. Copy the code and output.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 9: Simple Voting System',
        prompt: 'Write a MATLAB script that:',
        tasks: [
          'Defines as strings three parties you know in Nigeria.',
          'Requests the total number of voters.',
          'For each party, generates a random number not exceeding one third of the number of voters.',
          'Tallies the votes and displays the total votes per party. Copy the code and output.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 8 — LAB MANUAL MODULE 2: VARIABLES AND DATA TYPES
  // ─────────────────────────────────────────────────────────────────
  {
    number: '8',
    title: 'Lab Manual Module 2: Variables and Data Types',
    sections: [
      {
        type: 'text',
        text: 'Variables can be described as a core component of any program. They are where dynamic data and information are stored. In programming, a variable is a value that can change, depending on conditions or on information passed to the program. Typically, a program consists of instructions (a finite sequence of orders directed to a computer processor by a computer program) that tell the computer what to do and what data the computer needs when the program is running.',
      },
      {
        type: 'text',
        text: 'Data may be constants or fixed values (which will never change during program execution), or variable values (usually initialised to \'0\' or some default value, because the actual values will be supplied by a program user, or the default value can be replaced by the result of an expression). Usually, both constants and variables have data type definitions. Each data type prescribes and limits the form of the data, i.e., has predefined characteristics. Examples of data types are: integer, floating point number, character, string and pointer.',
      },
      {
        type: 'text',
        text: 'Languages that leave little room for programmers to define their own data types are said to be strongly-typed languages. During program execution, the data type of a variable may change implicitly or explicitly to another data type. This process is called type conversion, typecasting or coercion. Programming languages do this by taking advantage of certain features of type hierarchies or type representations.',
      },
      {
        type: 'text',
        text: 'In MATLAB, variables are the basic building blocks for storing data and performing operations. A variable is essentially a name that refers to a value, and a data type specifies what kind of data that variable can hold. MATLAB supports a wide variety of data types and allows for dynamic typing, which means you don\'t have to declare a variable\'s type before using it — it\'s automatically determined by the value assigned.',
      },
      {
        type: 'code',
        heading: 'Declaring Variables',
        language: 'matlab',
        code: String.raw`x = 10;         % Numeric scalar (double by default)
y = 3.14;       % Floating-point number
name = 'John';  % Character array (string of characters)
flag = true;    % Logical value (Boolean)`,
      },
      {
        type: 'text',
        text: 'Declaring a variable in MATLAB involves simply assigning a value to a variable name. MATLAB automatically creates the variable with the appropriate type based on the value.',
      },
      {
        type: 'bullets',
        heading: 'Variable Naming Rules',
        items: [
          'Variable names must start with a letter and must not exceed namelengthmax characters. The trailing characters may be numbers, letters or underscores. Some choices are forbidden, such as including operators (a*b signifies a multiplication of the variables a and b) or a.b (the value of the \'b\' component of the object \'a\'). These rules also hold for naming files; however, a single dot after a file name tells MATLAB what type of file it is dealing with.',
          'Variable names in MATLAB are case sensitive, therefore abc and Abc mean two different objects.',
          'It is good programming practice to use meaningful variable names, i.e., variable names must be unique and should reflect what is being stored.',
          'Variable names should not coincide with predefined commands or with any user-defined subroutines. To confirm whether a name is already in use, type the command type <variable-name> or which <variable-name> at the MATLAB command prompt (e.g. >> which sum) — this tells whether the name corresponds to existing code or an intrinsic function.',
        ],
      },
      {
        type: 'bullets',
        heading: 'A Variable Therefore',
        items: [
          'Must start with a letter',
          'Can include letters, numbers and underscores',
          'Must not contain spaces or special characters',
          'Cannot be the same as MATLAB reserved keywords (e.g., for, end, function)',
        ],
      },
      {
        type: 'code',
        heading: 'Valid Variable Names',
        language: 'matlab',
        code: 'x\nspeed\nvalue1\nheight\nxy123\ndataSet2023\ntemperature_C\naverageScore',
      },
      {
        type: 'code',
        heading: 'Invalid Variable Names',
        language: 'matlab',
        code: String.raw`1stValue      % starts with a number
speed-limit   % contains hyphen
full name     % contains space
@value        % contains special character
for           % MATLAB keyword`,
      },
      {
        type: 'note',
        text: 'Corrected in transcription: valid names must begin with a letter, so the manual\'s examples that began with an underscore were moved out of the valid list.',
      },
      {
        type: 'code',
        heading: 'Checking Variable Properties',
        language: 'matlab',
        code: String.raw`x = 25;
class(x)      % Returns 'double'
isnumeric(x)  % Returns true
ischar(x)     % Returns false

whos          % Lists all variables and their types`,
      },
      {
        type: 'code',
        heading: 'Numeric Types',
        language: 'matlab',
        code: String.raw`a = 42;             % double
b = 3.14159;        % double
c = single(3.14);   % single precision
x = int32(100);     % 32-bit signed integer
y = uint8(255);     % 8-bit unsigned integer

sum_ab = a + b;
difference_ab = a - b;
product = a * b;
quotient = a / b;`,
      },
      {
        type: 'text',
        text: 'MATLAB supports a rich set of data types. The default numeric type is double (double-precision floating point), and you can perform arithmetic operations on all the numeric types.',
      },
      {
        type: 'code',
        heading: 'Logical Type',
        language: 'matlab',
        code: String.raw`isGreater = (5 > 3); % returns true (1)
isEqual = (5 == 3);  % returns false (0)
flag = true;         % explicitly assign a logical value`,
      },
      {
        type: 'code',
        heading: 'Character and String Arrays',
        language: 'matlab',
        code: String.raw`charArray = 'Hello'; % Character array
str = "Hello World"; % String (string object)

% Concatenation
msg = [charArray, ' World']; % 'Hello World'

% Convert between string and char
strToChar = char(str);
charToStr = string(charArray);`,
      },
      {
        type: 'code',
        heading: 'Complex Numbers',
        language: 'matlab',
        code: String.raw`z = 3 + 4i;           % Complex number
absVal = abs(z);      % Magnitude = 5
angleVal = angle(z);  % Phase angle in radians
realPart = real(z);
imagPart = imag(z);`,
      },
      {
        type: 'code',
        heading: 'Type Conversion',
        language: 'matlab',
        code: String.raw`x = 10.75;
y = int32(x);      % Convert to integer
s = num2str(x);    % Convert number to string
n = str2double(s); % Convert string to number`,
      },
      {
        type: 'text',
        heading: 'Precedence: The Order in Which Computations Are Performed',
        text: 'The order of performing calculations is one of the most common sources of errors, and it is often difficult to detect. Recall the principle of BODMAS (brackets, then division, multiplication, addition, subtraction). This principle for basic mathematical expressions is still very useful. In MATLAB brackets should always appear in pairs, and the mathematics contained in them is evaluated first. This makes (3-2)/6 and (3-2/6) different: the former means (3 − 2)/6 = 0.1667, while the latter means 3 − 2/6 = 2.6667.',
      },
      {
        type: 'bullets',
        heading: 'MATLAB Operator Precedence (Highest to Lowest)',
        items: [
          '1. Transpose (.\'), power (.^), complex conjugate transpose (\'), matrix power (^)',
          '2. Unary plus (+), unary minus (-), logical negation (~)',
          '3. Multiplication (.*), right division (./), left division (.\\), matrix multiplication (*), matrix right division (/), matrix left division (\\)',
          '4. Addition (+), subtraction (-)',
          '5. Colon operator (:)',
          '6. Less than (<), less than or equal to (<=), greater than (>), greater than or equal to (>=), equal to (==), not equal to (~=)',
          '7. Element-wise logical AND (&)',
          '8. Element-wise logical OR (|)',
          '9. Short-circuit logical AND (&&)',
          '10. Short-circuit logical OR (||)',
        ],
      },
      {
        type: 'code',
        heading: 'Evaluate the Following MATLAB Expressions Manually',
        language: 'matlab',
        code: '1+2/3*4-5\n1/2/3/4\n1/2+3/4*5\n5-2*3*(2+7)\n(1+3)*(2-3)/3*4\n(2-3*(4-3))*4/5',
      },
      {
        type: 'math',
        tex: '\\begin{aligned} 1+(2/3)*4-5 &= 1 + \\tfrac{8}{3} - 5 = -\\tfrac{4}{3} \\\\ ((1/2)/3)/4 &= \\tfrac{1}{24} \\\\ (1/2)+(3/4)*5 &= \\tfrac{1}{2} + \\tfrac{3}{4}\\cdot 5 = \\tfrac{17}{4} \\\\ 5-(2*3)*(2+7) &= 5 - 6(9) = -49 \\\\ ((1+3)*(2-3))/3*4 &= \\tfrac{4 \\cdot (-1)}{3}\\cdot 4 = -\\tfrac{16}{3} \\\\ (2-3*(4-3))*(4/5) &= (2 - 3\\cdot 1)\\,\\tfrac{4}{5} = -\\tfrac{4}{5} \\end{aligned}',
        caption: 'The evaluations, with brackets added to show the order MATLAB uses',
      },
      {
        type: 'text',
        text: 'The above can also be verified in MATLAB. Use the command format rat to force MATLAB to output the results as rational numbers, i.e., fractions. MATLAB also has a number of intrinsic constants which a programmer can use, for instance pi and eps. The former is π = 3.14159265…, and the latter is the distance from 1 to the next larger floating-point number. Numbers can also be entered in mantissa–exponent form, i.e. mantissa × 10^exponent:',
      },
      {
        type: 'table',
        headers: ['Number', 'Mantissa–exponent', 'MATLAB form'],
        rows: [
          ['789.38', '7.8938 × 10²', '7.8938e2'],
          ['0.0001', '1 × 10⁻⁴', '1e-4'],
          ['3', '3 × 10⁰', '3'],
          ['400000', '4 × 10⁵', '4e5'],
        ],
      },
      {
        type: 'code',
        heading: 'Arrays and Matrices',
        language: 'matlab',
        code: String.raw`A = [1 2 3];        % Row vector
B = [1; 2; 3];      % Column vector
M = [1 2 3; 4 5 6]; % 2x3 Matrix

% Access elements
val = A(2);     % Second element of A
row = M(2, :);  % Second row
col = M(:, 3);  % Third column`,
      },
      {
        type: 'code',
        heading: 'Structures',
        language: 'matlab',
        code: String.raw`student.name = 'Alice';
student.age = 21;
student.scores = [85 90 78];

% Access fields
disp(student.name);
average = mean(student.scores);`,
      },
      {
        type: 'text',
        text: 'MATLAB is built around matrix and array mathematics. Structures are containers for dissimilar types of data grouped under field names; cell arrays store different types of data in the same container; tables store data in tabular form, which is useful for datasets.',
      },
      {
        type: 'code',
        heading: 'Cell Arrays',
        language: 'matlab',
        code: String.raw`C = {42, 'text', [1 2 3]};
val1 = C{1}; % Access first element: 42
val2 = C{2}; % Access second element: 'text'`,
      },
      {
        type: 'code',
        heading: 'Tables',
        language: 'matlab',
        code: String.raw`Names = {'John'; 'Mary'; 'David'};
Ages = [22; 24; 21];
Scores = [88; 92; 79];
tbl = table(Names, Ages, Scores);

% Accessing table data
tbl(1, :);   % First row
tbl.Scores;  % Scores column`,
      },
      {
        type: 'casestudy',
        title: 'Practice Question: Variable Naming and Validity',
        prompt: 'Using your registration number or name, formulate two valid variable names in MATLAB. Then say which of the following are valid variable names in MATLAB, and explain why each is valid or invalid:',
        tasks: ['Matlab', 'Copy', 'Edit', 'score_1', '1stScore', 'Full Name', 'total-score', '_temp', 'End', 'userName123', '@value', 'maxValue!', 'For'],
      },
      {
        type: 'casestudy',
        title: 'Practice Question: Rename for Validity',
        prompt: 'Rewrite these invalid variable names into valid ones without changing the meaning of the variable:',
        tasks: ['2ndPlace', 'grand total', 'for', 'email-id', 'price\\$'],
      },
      {
        type: 'code',
        heading: 'Practice Question: Extracting Values Above Average (Contains Deliberate Errors)',
        language: 'matlab',
        code: String.raw`data = [45, 67, 89, 52, 90, 71];
avg = mean(data);
aboveAvg = data <= avg;
result = data(aboveAvg);
disp('Values above average: ' + result)`,
      },
      {
        type: 'casestudy',
        title: 'Tasks',
        prompt: 'The script above is meant to extract and display all values greater than the average of a dataset.',
        tasks: [
          'Run the program in MATLAB.',
          'Identify and explain the error encountered.',
          'Correct the error, and write the corrected code.',
          'Copy the correct code and the exact output displayed.',
        ],
      },
      {
        type: 'code',
        heading: 'Corrected Reference Code (Added in Transcription Review)',
        language: 'matlab',
        code: String.raw`data = [45, 67, 89, 52, 90, 71];
avg = mean(data);
result = data(data > avg);
fprintf('Values above average: ');
disp(result);`,
      },
      {
        type: 'note',
        text: 'Use > to select values above the mean, and print the label separately from the numeric array — adding a char label to a numeric array with + does arithmetic on the character codes instead of joining text.',
      },
      {
        type: 'code',
        heading: 'Practice Question: Square of Even Numbers (Contains Deliberate Errors)',
        language: 'matlab',
        code: String.raw`nums = 1:10;
squares = [];
for i = 1:length(nums)
    if mod(nums(i), 2) = 0
        squares(i) = nums(i)^2;
    end
end
disp(squares)`,
      },
      {
        type: 'casestudy',
        title: 'Tasks',
        prompt: 'The code above is intended to store the square of the even numbers from a given range into a new array.',
        tasks: [
          'Execute the program and observe the error message.',
          'Identify all logical and syntax errors.',
          'Fix the errors so the code stores only even squares.',
          'Copy the correct code and the exact output displayed.',
        ],
      },
      {
        type: 'code',
        heading: 'Corrected Reference Code (Added in Transcription Review)',
        language: 'matlab',
        code: String.raw`nums = 1:10;
squares = [];
for i = 1:numel(nums)
    if mod(nums(i), 2) == 0
        squares(end+1) = nums(i)^2;
    end
end
disp(squares);`,
      },
      {
        type: 'note',
        text: 'Use == in the condition, and append only the selected squares with squares(end+1) — writing to squares(i) leaves zeros in the odd positions.',
      },
      {
        type: 'code',
        heading: 'Practice Question: Invalid Scores and Grade Assignment (Contains Deliberate Errors)',
        language: 'matlab',
        code: String.raw`function processScores()
    scores = [78, 90, 165, 30, 85, 102, -5];
    grades = gradeStudents(scores);
    disp('Average score is: ' + mean(scores));
    disp('Grades assigned: ');
    disp(grades);
end
function grades = gradeStudents(scoreList)
for i = 0:length(scoreList)
    if scoreList(i) > 70
        grades{i} = 'A';
    elseif scoreList(i) <= 60
        grades{i} = 'B';
    elseif scoreList(i) < 50
        grades{i} = 'C';
    elseif scoreList(i) >= 0
        grades{i} = 'D';
    else
        grades{i} = 'Invalid';
    end
end`,
      },
      {
        type: 'casestudy',
        title: 'Tasks',
        prompt: 'The script above is supposed to assign grades based on a list of student scores.',
        tasks: [
          'Execute the script and take note of any errors.',
          'Identify any mistakes in logic or syntax.',
          'Correct the code to skip invalid scores, use proper indexing, return correct letter grades, and display the average using proper string formatting.',
          'Copy the correct code and the exact output displayed.',
        ],
      },
      {
        type: 'code',
        heading: 'Corrected Reference Code (Added in Transcription Review)',
        language: 'matlab',
        code: String.raw`function processScores()
    scores = [78, 90, 165, 30, 85, 102, -5];
    validScores = scores(isfinite(scores) & scores >= 0 & scores <= 100);
    grades = gradeStudents(scores);
    fprintf('Average valid score: %.2f\n', mean(validScores));
    disp('Grades assigned:');
    disp(grades);
end

function grades = gradeStudents(scoreList)
    grades = cell(size(scoreList));
    for i = 1:numel(scoreList)
        s = scoreList(i);
        if ~isfinite(s) || s < 0 || s > 100
            grades{i} = 'Invalid';
        elseif s >= 70
            grades{i} = 'A';
        elseif s >= 60
            grades{i} = 'B';
        elseif s >= 50
            grades{i} = 'C';
        elseif s >= 45
            grades{i} = 'D';
        else
            grades{i} = 'F';
        end
    end
end`,
      },
      {
        type: 'note',
        text: 'Save as processScores.m and call processScores. MATLAB indices start at 1, so a loop from 0 fails on the first pass; invalid scores are excluded from the mean; and the grade bands are tested from the top down, matching the grading example in Module 4.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 9 — LAB MANUAL MODULE 3: LOGIC AND RELATIONAL OPERATORS
  // ─────────────────────────────────────────────────────────────────
  {
    number: '9',
    title: 'Lab Manual Module 3: Logic and Relational Operators',
    sections: [
      {
        type: 'text',
        text: 'In MATLAB, logic and relational operators are used to compare values, make decisions, and control program flow. These operators return logical values (true or false, represented as 1 and 0 in MATLAB) and are essential in conditional statements (if, while, for, etc.). Understanding how to use these operators is fundamental to writing intelligent and responsive code.',
      },
      {
        type: 'table',
        heading: 'Relational Operators',
        headers: ['Operator', 'Description', 'Example', 'Result'],
        rows: [
          ['==', 'Equal to', '5 == 5', '1 (true)'],
          ['~=', 'Not equal to', '4 ~= 3', '1 (true)'],
          ['>', 'Greater than', '7 > 10', '0 (false)'],
          ['<', 'Less than', '3 < 5', '1 (true)'],
          ['>=', 'Greater than or equal', '8 >= 8', '1 (true)'],
          ['<=', 'Less than or equal', '6 <= 2', '0 (false)'],
        ],
      },
      {
        type: 'code',
        language: 'matlab',
        code: 'a = 10;\nb = 15;\nresult = a < b  % Output: 1',
      },
      {
        type: 'table',
        heading: 'Logical Operators',
        headers: ['Operator', 'Description', 'Syntax example', 'Result'],
        rows: [
          ['&', 'Logical AND', '(a > 5) & (b < 10)', 'true if both true'],
          ['|', 'Logical OR', '… | (a == 3)', '—'],
          ['~', 'Logical NOT (negation)', '~(a > 7)', 'inverts true/false'],
          ['xor()', 'Exclusive OR', 'xor(true, false)', 'true if one only'],
        ],
      },
      {
        type: 'note',
        text: 'The OR row is damaged in the manual: the | glyph did not print, and the result column is blank. | is true if at least one side is true.',
      },
      {
        type: 'code',
        language: 'matlab',
        code: 'x = 7;\ny = 9;\nresult = (x > 5) & (y < 10); % Output: 1 (true)',
      },
      {
        type: 'table',
        heading: 'Element-wise vs. Short-circuit Operators',
        headers: ['Type', 'Operators', 'Use'],
        rows: [
          ['Element-wise', '&, |', 'Arrays / vectors'],
          ['Short-circuit', '&&, ||', 'Scalar conditions'],
        ],
      },
      {
        type: 'text',
        text: 'Note: use && and || only in conditions where both sides are scalars. They evaluate the second operand only if needed (short-circuit behaviour).',
      },
      {
        type: 'code',
        heading: 'Using Operators in Conditional Statements: if',
        language: 'matlab',
        code: "x = 12;\nif x > 10 && x < 20\n    disp('x is between 10 and 20');\nend",
      },
      {
        type: 'code',
        heading: 'Using Operators in Conditional Statements: while',
        language: 'matlab',
        code: "count = 1;\nwhile count <= 5\n    disp(['Count: ', num2str(count)]);\n    count = count + 1;\nend",
      },
      {
        type: 'code',
        heading: 'Practical Example: Checking Eligibility',
        language: 'matlab',
        code: "age = 17;\nhasID = true;\nif age >= 18 && hasID\n    disp('Access granted');\nelse\n    disp('Access denied');\nend",
      },
      {
        type: 'code',
        heading: 'Practical Example: Finding Even Numbers',
        language: 'matlab',
        code: 'nums = 1:10;\nevenNums = nums(mod(nums,2)==0);\ndisp(evenNums); % Output: [2 4 6 8 10]',
      },
      {
        type: 'code',
        heading: 'Practical Example: Logical Array Filtering',
        language: 'matlab',
        code: 'grades = [55, 72, 48, 91, 66];\npassed = grades >= 50;\ndisp(grades(passed)); % Output: [55 72 91 66]',
      },
      {
        type: 'table',
        heading: 'Common Errors to Avoid',
        headers: ['Mistake', 'Why it\'s wrong'],
        rows: [
          ['Using = instead of ==', '= is assignment, == is comparison'],
          ['Using && with arrays', '&& works only with scalars'],
          ['Forgetting parentheses', 'Causes ambiguous logic in complex expressions'],
          ['Using ^ instead of .^', 'Use .^ for element-wise powers; use ^ for matrix powers'],
        ],
      },
      {
        type: 'bullets',
        heading: 'Summary',
        items: [
          'Relational operators compare values and return logical results.',
          'Logical operators combine or negate logical expressions.',
          'These operators are essential for decision-making, filtering and control flow in MATLAB.',
          'Use short-circuit operators (&&, ||) for scalar decisions.',
          'Combine operators in conditional statements to build intelligent logic.',
        ],
      },
      {
        type: 'text',
        heading: 'Practice Question 1: Translate the Following Expressions to MATLAB',
        text: 'Write each expression as a single line of MATLAB.',
      },
      {
        type: 'math',
        tex: '\\begin{aligned} &(a)\\quad \\sqrt{RQ} + \\frac{\\lambda\\alpha}{y}G \\qquad &&(b)\\quad \\frac{p1}{v2}(R1) - \\beta \\\\[4pt] &(c)\\quad \\frac{4i}{\\gamma} + pq + \\left(\\frac{b}{c-d}\\right) \\qquad &&(d)\\quad \\frac{n+y^2}{e - \\frac{\\partial b}{6}} \\\\[4pt] &(e)\\quad h - \\sqrt{\\frac{F}{D+X}} + fk - pq \\qquad &&(f)\\quad \\frac{fk + y}{p^{-2y} + 4xk} + \\pi\\lambda \\end{aligned}',
      },
      {
        type: 'note',
        text: 'Two symbols are unclear in the scan: the last term of (b) prints as ",3" (β is the likeliest reading), and the first term of (f) prints as "jk" (fk, as in (e), is likely).',
      },
      {
        type: 'casestudy',
        title: 'Practice Question 2: Accepted or Not Accepted?',
        prompt: 'Indicate which of the following expressions are acceptable / not acceptable in MATLAB by writing "Accepted" or "Not Accepted". If not acceptable, state the reason why. (Some deliberately contain invalid MATLAB syntax; notation and unmatched parentheses are reproduced as printed.)',
        tasks: [
          'sqrt(alpha) * pi² * r/lamda',
          '√(p₁ + Q₂) - tan(sqrt(fk - pq)',
          'f_x + (x0 - x1)/f_x + (x1 - x2)/f_x1',
          '2 * abs(T + fk) - beta',
          'n1 = (p1 * v1)/(T1P2V1)',
          'sin(sigma + π) - exp(sqrt(alpha))',
          'V + (a * t^2)/2 + v1',
        ],
      },
      {
        type: 'text',
        heading: 'Practice Question 3: Execute in MATLAB with the Assigned Values',
        text: 'Only parts (a) and (b) appear in the manual.',
      },
      {
        type: 'math',
        tex: '\\begin{aligned} &(a)\\quad \\sigma^{-(\\pi)^{-1}} \\Big/ \\left(\\sqrt[3]{4\\alpha\\mu}\\right)\\sigma; \\qquad \\alpha = 1,\\ \\mu = 2,\\ \\sigma = 1 \\\\[4pt] &(b)\\quad \\frac{\\log \\cos xy}{3z^{-xy}}; \\qquad x = 2,\\ y = 3,\\ z = 1 \\end{aligned}',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 10 — LAB MANUAL MODULE 4: FLOW CONTROL
  // ─────────────────────────────────────────────────────────────────
  {
    number: '10',
    title: 'Lab Manual Module 4: Flow Control in MATLAB',
    sections: [
      {
        type: 'text',
        text: 'Flow control structures are essential in programming because they allow a script or program to make decisions, repeat operations, or execute specific blocks of code depending on various conditions. In MATLAB, flow control is mainly achieved through conditional statements (if, switch) and loops (for, while). These constructs are powerful tools that guide the program\'s behaviour based on input values, logical tests and variable ranges.',
      },
      {
        type: 'text',
        heading: 'Conditional Statements',
        text: 'Conditional statements allow a program to choose different paths of execution depending on whether a condition is true or false.',
      },
      {
        type: 'code',
        heading: 'if … end',
        language: 'matlab',
        code: String.raw`% Syntax
if condition
    % statements
end

% Example
t = 0;
if t < 0
    signal_val = -1;
end`,
      },
      {
        type: 'text',
        text: 'This is the simplest form of conditional control. The if block consists of a condition, a block of statements to execute if the condition is true, and an end to close the block.',
      },
      {
        type: 'code',
        heading: 'if … else … end',
        language: 'matlab',
        code: String.raw`num = input('Enter a number: ');
if num < 100
    fprintf('Number is less than 100\n');
else
    fprintf('Number is not less than 100\n');
end`,
      },
      {
        type: 'text',
        text: 'This structure allows for two alternatives: one block if the condition is true, and another if it is false.',
      },
      {
        type: 'code',
        heading: 'if … elseif … else … end',
        language: 'matlab',
        code: String.raw`t = 0;
if t < 0
    signal_val = -1;
elseif t > 0
    signal_val = 1;
else
    signal_val = 0;
end`,
      },
      {
        type: 'code',
        heading: 'Example: Grading System',
        language: 'matlab',
        code: String.raw`score = input('Enter a Score: ');
validateattributes(score, {'numeric'}, ...
    {'scalar', 'real', 'finite', '>=', 0, '<=', 100});
if score >= 70
    grade = 'A';
elseif score >= 60
    grade = 'B';
elseif score >= 50
    grade = 'C';
elseif score >= 45
    grade = 'D';
else
    grade = 'F';
end
disp(['Grade: ', grade]);`,
      },
      {
        type: 'note',
        text: 'Corrected in transcription: the manual writes elif (Python\'s keyword); MATLAB\'s is elseif.',
      },
      {
        type: 'code',
        heading: 'switch … case … end',
        language: 'matlab',
        code: String.raw`n = input('Enter a value: ');
switch n
    case -1
        disp('negative one');
    case 0
        disp('zero');
    case 1
        disp('positive one');
    otherwise
        disp('other value');
end`,
      },
      {
        type: 'text',
        text: 'The switch statement is used to select one of many blocks of code to be executed. The for loop repeats statements a fixed number of times; a while loop continues to execute as long as a specified condition is true.',
      },
      {
        type: 'code',
        heading: 'for Loop: Display Even Numbers',
        language: 'matlab',
        code: 'for i = 2:2:100\n    disp(i);\nend',
      },
      {
        type: 'code',
        heading: 'for Loop: Sum of Even Numbers',
        language: 'matlab',
        code: 'sumeven = 0;\nfor i = 2:2:50\n    sumeven = sumeven + i;\nend\ndisp(sumeven);',
      },
      {
        type: 'code',
        heading: 'for Loop: Factorial of a Number',
        language: 'matlab',
        code: String.raw`n = input('Enter a number: ');
validateattributes(n, {'numeric'}, ...
    {'scalar', 'real', 'finite', 'integer', 'nonnegative'});
fact = 1;
for i = n:-1:1
    fact = fact * i;
end
disp(fact);`,
      },
      {
        type: 'code',
        heading: 'for Loop: Prime Numbers',
        language: 'matlab',
        code: String.raw`n = input('Enter n: ');
for i = 2:n
    count = 0;
    for j = i:-1:2
        if mod(i, j) == 0
            count = count + 1;
        end
    end
    if count == 1
        disp(i);
    end
end`,
      },
      {
        type: 'note',
        text: 'How the prime test works: the inner loop counts the divisors of i between 2 and i. Every i divides itself, so a count of exactly 1 means nothing else divides it — i is prime.',
      },
      {
        type: 'code',
        heading: 'for Loop: Fibonacci Sequence',
        language: 'matlab',
        code: 'fibo = zeros(1, 10);\nfibo(1:2) = [1, 1];\nfor k = 3:10\n    fibo(k) = fibo(k-1) + fibo(k-2);\nend\ndisp(fibo);',
      },
      {
        type: 'code',
        heading: 'while Loop: Sum of the First 10 Numbers',
        language: 'matlab',
        code: 'n = 1;\ntotal = 0;\nwhile n <= 10\n    total = total + n;\n    n = n + 1;\nend\ndisp(total);',
      },
      {
        type: 'code',
        heading: 'Logical Operators: Check for Equal Roots of a Quadratic Equation',
        language: 'matlab',
        code: 'if (b^2 - 4*a*c == 0) & (a ~= 0)\n    x = -b / (2 * a);\nend',
      },
      {
        type: 'text',
        text: 'Logical operators evaluate expressions involving conditions: & is logical AND, | is logical OR, ~ is logical NOT. Nested if statements are used when one if condition depends on another.',
      },
      {
        type: 'code',
        heading: 'Nested if: Quadratic Roots',
        language: 'matlab',
        code: String.raw`a = input('Enter a: ');
b = input('Enter b: ');
c = input('Enter c: ');
d = b^2 - 4*a*c;
if a == 0
    disp('a cannot be zero. Enter a non-zero value.');
else
    if d < 0
        disp('Roots are complex');
    else
        x1 = (-b + sqrt(d)) / (2 * a);
        x2 = (-b - sqrt(d)) / (2 * a);
        disp([x1, x2]);
    end
end`,
      },
      {
        type: 'casestudy',
        title: 'Practice Questions',
        tasks: [
          'Using the rand() function, generate a 1-dimensional array of scores within the grade range of \'C\' and \'A\'. Apply an if-statement to replace all odd scores in the array with 0, and even numbers with 1. Execute your program and copy the output for 5 generated scores.',
          'Write a MATLAB program to accept a value x and compute y = x³ for x > 0, y = x² + 1 for x < 0, and y = x⁰ for x = 0. Then test your program and give the output for the following values of x: (a) sin(rand()⁻¹) (b) round(cos270 0) [as printed].',
          'Write a MATLAB program to output the sum of 15 terms of the reciprocal of odd-numbered registration numbers in your department, starting with your registration number.',
          'Write a MATLAB script to output the inverse of the squares of the first 30 even-numbered registration numbers in your department, starting with your registration number (keep your output to 2 decimal places).',
          'Write a MATLAB program to accept the average death rate, R, and determine the outbreak of a disease as: Endemic, when R is less than 0.5; Pandemic, when R is above 1; Epidemic, when R is between 0.5 and 1. Test your program and give the output for R = 2cosπ and R = π/100.',
          'Using the if…end construct, determine the fasting blood sugar (FBS) test result as Low-Sugar, Normal or High-Sugar for values less than 50, between 50 and 130, and greater than 130, respectively. Then test your program with the values (a) (sinπ)⁻¹ (b) rand()*5.',
          'Write a MATLAB script using switch…case to implement a menu-driven program to choose a room in a hotel: 1 – Single room, 2 – Twin room, 3 – Executive room, and 4 – Presidential room. Your output should display the room selected.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 11 — LAB MANUAL MODULE 5: MATRIX
  // ─────────────────────────────────────────────────────────────────
  {
    number: '11',
    title: 'Lab Manual Module 5: Matrix',
    sections: [
      {
        type: 'text',
        text: 'MATLAB is a powerful tool for matrix operations, and it provides a wide range of functions and tools for working with matrices. Here are some key aspects of matrix operations in MATLAB.',
      },
      {
        type: 'termlist',
        heading: 'Matrix Creation',
        items: [
          { term: 'Matrix definition', def: 'Matrices can be defined using square brackets [ ], with elements separated by spaces or commas.' },
          { term: 'Matrix functions', def: 'MATLAB provides various functions for creating matrices, such as zeros(), ones(), eye() and rand().' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Matrix Operations',
        items: [
          { term: 'Basic operations', def: 'MATLAB supports basic matrix operations like addition (+), subtraction (-), multiplication (*) and division (/).' },
          { term: 'Element-wise operations', def: 'Performed using operators like .*, ./ and .^' },
          { term: 'Matrix transpose', def: 'Obtained using the \' operator or the transpose() function.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Matrix Manipulation',
        items: [
          { term: 'Indexing', def: 'Matrix elements can be accessed and modified using indexing, which allows for efficient manipulation of matrix data.' },
          { term: 'Reshaping', def: 'Matrices can be reshaped using the reshape() function, which changes the dimensions of the matrix without altering its elements.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Matrix Analysis',
        items: [
          { term: 'Determinant', def: 'Calculated using the det() function.' },
          { term: 'Inverse', def: 'Calculated using the inv() function.' },
          { term: 'Eigenvalues and eigenvectors', def: 'Calculated using the eig() function.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Practical Applications',
        items: [
          { term: 'Linear algebra', def: 'Solving systems of linear equations, finding eigenvalues and eigenvectors, and performing other linear algebra tasks.' },
          { term: 'Data analysis', def: 'Matrix operations are essential for data analysis, including data manipulation, filtering and visualisation.' },
          { term: 'Machine learning', def: 'Matrix operations are used extensively in machine learning algorithms, such as neural networks and principal component analysis.' },
        ],
      },
      {
        type: 'code',
        heading: 'Example 5.1: Matrix Multiplication and Addition',
        language: 'matlab',
        code: String.raw`% Define two matrices
A = [1, 2; 3, 4];
B = [5, 6; 7, 8];
% Perform matrix multiplication
C = A * B;
% Perform matrix addition
D = A + B;
% Display the result
disp(C)
disp(D)`,
      },
      {
        type: 'code',
        heading: 'Example 5.2: Element-wise Multiplication',
        language: 'matlab',
        code: String.raw`% Define two matrices
A = [1, 2; 3, 4];
B = [5, 6; 7, 8];
% Perform element-wise multiplication
C = A .* B;
% Display the result
disp(C)`,
      },
      {
        type: 'note',
        text: 'Compare the results: A * B is the matrix product, [19 22; 43 50]; A .* B multiplies matching elements, [5 12; 21 32].',
      },
      {
        type: 'code',
        heading: 'Example 5.3: Matrix Transpose, Inverse and Determinant',
        language: 'matlab',
        code: String.raw`% Define a matrix
A = [1, 2; 3, 4];
% Calculate the transpose of A
trans_A = A';
% Calculate the inverse of A
inv_A = inv(A);
% Calculate the determinant of A
det_A = det(A);
% Display the result
disp('Transpose of matrix A'); disp(trans_A)
disp('Inverse of matrix A'); disp(inv_A)
disp('Determinant of matrix A'); disp(det_A)`,
      },
      {
        type: 'code',
        heading: 'Example 5.4: Eigenvalues and Eigenvectors',
        language: 'matlab',
        code: String.raw`% Define a matrix
A = [1, 2; 3, 4];
% Calculate the eigenvalues and eigenvectors of A
[V, D] = eig(A);
% Display the eigenvalues
disp(D);
% Display the eigenvectors
disp(V)`,
      },
      {
        type: 'code',
        heading: 'Example 5.5: Sum of Matrix Elements',
        language: 'matlab',
        code: String.raw`% Define a matrix
A = [1, 2, 3; 4, 5, 6; 7, 8, 9];
% Calculate the sum of all elements in the matrix
sum_all = sum(A(:));
% Display the result
disp(sum_all)
% Calculate the sum of each row
sum_rows = sum(A, 2);
% Display the result
disp(sum_rows)
% Calculate the sum of each column
sum_cols = sum(A, 1);
% Display the result
disp(sum_cols)`,
      },
      {
        type: 'code',
        heading: 'Example 5.6: Mean of Matrix Elements',
        language: 'matlab',
        code: String.raw`% Define a matrix
A = [-1, 2, -3; -4, 5, 6; 7, -8, -9];
% Calculate the mean of all elements in the matrix
mean_all = mean(A(:));
% Display the result
disp(mean_all)
% Calculate the mean of each row
mean_rows = mean(A, 2);
% Display the result
disp(mean_rows)
% Calculate the mean of each column
mean_cols = mean(A, 1);
% Display the result
disp(mean_cols)`,
      },
      {
        type: 'code',
        heading: 'Example 5.7: Selecting Elements in a Matrix',
        language: 'matlab',
        code: String.raw`% Define a matrix
A = [1, 2, 3; 4, 5, 6; 7, 8, 9];
% Select a single element (row 2, column 3)
single_element = A(2, 3);
% Display the result
disp(single_element)
% Select all elements in a row (row 2)
row_elements = A(2, :);
% Display the result
disp(row_elements)
% Select all elements in a column (column 2)
col_elements = A(:, 2);
% Display the result
disp(col_elements)`,
      },
      {
        type: 'note',
        text: 'In sum(A, dim) and mean(A, dim), dim = 1 works down the columns (one result per column) and dim = 2 works across the rows (one result per row). A(:) lays every element out in one column, which is why sum(A(:)) totals the whole matrix.',
      },
      {
        type: 'math',
        tex: 'A = \\begin{bmatrix} 12 & 9 & 10 \\\\ 7 & 17 & 8 \\\\ 10 & 6 & 5 \\end{bmatrix}',
        caption: 'Matrix for Practice Question 1 (the bottom-middle digit reads 6 on enlargement)',
      },
      {
        type: 'casestudy',
        title: 'Practice Question 1: Matrix Operations',
        prompt: 'Given the matrix A above, write matrix functions to:',
        tasks: [
          'Calculate the sum of all elements in the matrix.',
          'Calculate the mean of each row.',
          'Select all elements in the second row.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Practice Question 2: Data Analysis',
        prompt: 'Given a matrix of University of Uyo student scores, use the rand() function to generate an n × m matrix of n scores between the grades of \'E\' and \'C\' for m courses.',
        tasks: [
          'Calculate the average score for each student.',
          'Calculate the average score for each course.',
        ],
      },
      {
        type: 'math',
        tex: "A = \\begin{bmatrix} 8 & -4 & 0 \\\\ 0 & 2 & 5 \\\\ 2 & -2 & -9 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 3 & 0 & -5 \\\\ -4 & 3 & -2 \\\\ 2 & 3 & -7 \\end{bmatrix}, \\quad C' = \\begin{bmatrix} 1 & -2 & 0 \\\\ 0 & 2 & -1 \\\\ 4 & 2 & 4 \\end{bmatrix}",
        caption: 'Matrices for Practice Question 3',
      },
      {
        type: 'casestudy',
        title: 'Practice Question 3: Matrix Manipulation',
        prompt: 'Given the matrices above:',
        tasks: [
          'Return the determinants of A, B and C as a new matrix D.',
          'Return A and the transpose of the 3rd row of B as matrix E.',
          'Return the size, diagonal and inverse of E.',
        ],
      },
      {
        type: 'note',
        text: 'The manual gives C′, the transpose of C, rather than C itself. In MATLAB, C = Cprime\'. A matrix and its transpose have the same determinant, so det(C) = det(C′) either way.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 12 — LAB MANUAL MODULE 6: OBJECT-ORIENTED PROGRAMMING
  // ─────────────────────────────────────────────────────────────────
  {
    number: '12',
    title: 'Lab Manual Module 6: Object-Oriented Programming',
    sections: [
      {
        type: 'text',
        text: 'MATLAB supports object-oriented programming (OOP) concepts, which enable developers to create reusable and modular code. Here is an overview of OOP in MATLAB.',
      },
      {
        type: 'termlist',
        heading: 'Classes and Objects',
        items: [
          { term: 'Class', def: 'A blueprint or template that defines the properties and behaviour of an object. In MATLAB, classes are defined using the classdef keyword.' },
          { term: 'Object', def: 'An instance of a class, which has its own set of attributes (data) and methods (functions).' },
        ],
      },
      {
        type: 'termlist',
        heading: 'OOP Concepts',
        items: [
          { term: 'Encapsulation', def: 'Bundling data and the methods that operate on that data within a single unit, making it harder for other parts of the program to access or modify the data directly.' },
          { term: 'Inheritance', def: 'Allows one class to inherit the properties and behaviour of another class, promoting code reuse and facilitating the creation of a hierarchy of related classes.' },
          { term: 'Polymorphism', def: 'The ability of an object to take on multiple forms, depending on the context in which it is used.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Benefits of OOP in MATLAB',
        items: [
          { term: 'Modularity', def: 'OOP lets developers create self-contained units of code that can be reused and combined to solve complex problems.' },
          { term: 'Reusability', def: 'Classes and objects can be used in multiple contexts.' },
          { term: 'Easier maintenance', def: 'OOP makes code easier to modify and maintain by providing a clear structure and organisation.' },
        ],
      },
      {
        type: 'code',
        heading: 'Example 6.1: OOP in MATLAB (save as Person.m)',
        language: 'matlab',
        code: String.raw`classdef Person
    properties
        Name
        Age
    end
    methods
        function obj = Person(name, age)
            obj.Name = name;
            obj.Age = age;
        end
        function displayInfo(obj)
            fprintf('Name: %s, Age: %d\n', obj.Name, obj.Age);
        end
    end
end`,
      },
      {
        type: 'text',
        text: 'This program defines Person as a class, with object properties Name and Age, and methods Person() and displayInfo() to initialise the object and display its information.',
      },
      {
        type: 'code',
        heading: 'Creating Objects and Using Methods',
        language: 'matlab',
        code: String.raw`% Create a Person object
person = Person('John Doe', 30);
% Display the person's information
person.displayInfo();`,
      },
      {
        type: 'text',
        text: 'The code above creates an object of the class Person as person, and calls its displayInfo() method to display the person\'s information.',
      },
      {
        type: 'code',
        heading: 'Example 6.2: Bank Account Class (save as BankAccount.m)',
        language: 'matlab',
        code: String.raw`classdef BankAccount < handle
    properties
        AccountNumber
        Balance
    end
    methods
        function obj = BankAccount(accountNumber, initialBalance)
            validateattributes(accountNumber, {'numeric'}, ...
                {'scalar', 'real', 'finite', 'integer', 'positive'});
            validateattributes(initialBalance, {'numeric'}, ...
                {'scalar', 'real', 'finite', 'nonnegative'});
            obj.AccountNumber = accountNumber;
            obj.Balance = initialBalance;
        end
        function deposit(obj, amount)
            validateattributes(amount, {'numeric'}, ...
                {'scalar', 'real', 'finite', 'positive'});
            obj.Balance = obj.Balance + amount;
        end
        function withdraw(obj, amount)
            validateattributes(amount, {'numeric'}, ...
                {'scalar', 'real', 'finite', 'positive'});
            if obj.Balance >= amount
                obj.Balance = obj.Balance - amount;
            else
                disp('Insufficient funds');
            end
        end
        function displayBalance(obj)
            fprintf('Account Number: %d, Balance: %.2f\n', ...
                obj.AccountNumber, obj.Balance);
        end
    end
end`,
      },
      {
        type: 'text',
        text: 'The class derives from handle so that method calls update the existing account. You can use it as follows:',
      },
      {
        type: 'code',
        language: 'matlab',
        code: String.raw`account = BankAccount(12345789, 5000);
account.displayBalance();
account.deposit(50);
account.displayBalance();
account.withdraw(200);
account.displayBalance();
% Expected balances: 5000.00, 5050.00, 4850.00`,
      },
      {
        type: 'note',
        text: 'Why "< handle" matters: an ordinary MATLAB class is a value class, so deposit(obj, amount) would change a copy of the account and the balance would never move. A handle class passes a reference, so the change sticks.',
      },
      {
        type: 'code',
        heading: 'Example 6.3: Vehicle Class (save as Vehicle.m)',
        language: 'matlab',
        code: String.raw`classdef Vehicle
    properties
        Make
        Model
        Year
    end
    methods
        function obj = Vehicle(make, model, year)
            obj.Make = make;
            obj.Model = model;
            obj.Year = year;
        end
        function displayInfo(obj)
            fprintf('Make: %s, Model: %s, Year: %d\n', ...
                obj.Make, obj.Model, obj.Year);
        end
    end
end`,
      },
      {
        type: 'code',
        heading: 'Subclass Car (save as Car.m)',
        language: 'matlab',
        code: String.raw`classdef Car < Vehicle
    properties
        NumDoors
    end
    methods
        function obj = Car(make, model, year, numDoors)
            obj = obj@Vehicle(make, model, year);
            obj.NumDoors = numDoors;
        end
        function displayInfo(obj)
            displayInfo@Vehicle(obj);
            fprintf('Number of Doors: %d\n', obj.NumDoors);
        end
    end
end`,
      },
      {
        type: 'code',
        heading: 'Using the Classes',
        language: 'matlab',
        code: "car = Car('Toyota', 'Camry', 2020, 4);\ncar.displayInfo();",
      },
      {
        type: 'casestudy',
        title: 'Practice Questions',
        tasks: [
          'Class definition: define a MATLAB class for any shape of your choice, with properties Length and Width, and a method to calculate the area.',
          'Class definition: create a MATLAB class for Applicants applying for a Computer job in the Akwa Ibom State Ministry of Finance, with properties Name, ID and Salary, and methods to display employee information and calculate a bonus.',
          'Object creation: create an object of the Rectangle class and calculate its area.',
          'Object creation: create an object of the Employee class and display its information.',
          'Inheritance: with your knowledge of your family history, create any subclass demonstrating how you inherit a round eye from your parent.',
          'Inheritance: create any subclass demonstrating how a Manager in Value Plus Supermarket inherits from the Employee class and has a method to calculate a bonus based on performance.',
          'Real-world application: using your knowledge of banking operations in Nigeria, apply OOP to model the Union Bank of Nigeria system with classes for Account Operation, Registered Customer and Customer Transaction.',
          'Real-world application: use OOP to model your Faculty with classes for Student, Course and Faculty.',
        ],
      },
    ],
  },
];
