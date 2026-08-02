// MTH 121 — General Mathematics II
// Lecture notes transcribed from the departmental workbook
// ("MTH 121: General Mathematics II — Workbook Manual 2025", Department of
// Mathematics, Faculty of Physical Sciences, University of Uyo; published by
// University of Calabar Press, © 2025).
//
// COVERAGE: the complete workbook. All five units:
//   UNIT ONE   Introduction: Functions, Limits and Continuity   p.3
//   UNIT TWO   Differentiation                                  p.8
//   UNIT THREE Extrema                                          p.18
//   UNIT FOUR  Integration                                      p.26
//   UNIT FIVE  Application of Integration to Areas and Volumes  p.42
// plus the twelve closing tutorial questions.
//
// STRUCTURE: one topic per workbook unit, so topic N is always Unit N and the
// unit's numbered sections (1.1, 1.2, …) are headings inside it. Topic 6 is
// the exception — the workbook's closing tutorial set, which spans all five
// units and so declares no `covers`/`partial` of its own.
//
// Which syllabus items each unit reaches is NOT recorded here. This file is
// imported verbatim by every department that takes MTH 121, and each department
// writes its own `topics` array, so a single set of indices cannot be right for
// all of them — it silently pointed Data Science students at the Cybersecurity
// outline. The mapping lives on each course instead, as `noteCoverage` keyed by
// the unit numbers below (see courses.js / dataScienceCourses.js).
//
// Maths is written as LaTeX, exactly as the workbook's own source had it:
// $...$ for inline expressions, and `math` sections for display equations.
// Rendered by KaTeX — see src/components/MathText.jsx.
//
// The workbook numbers its worked examples 1–10 continuously across sections
// 1.1 and 1.2, then restarts at 1 for section 1.3; that numbering is preserved
// here so students can cross-reference the printed copy. Unit Two restarts at
// 1 and runs to 20 (with no Example 6 — the manual itself skips it); Unit Three
// restarts at 1 and runs to 9; Unit Four runs 1–14 and Unit Five 1–10.
//
// ERRATA (units two and three). The printed manual carries three genuine
// mathematical errors, all in Unit Three and all corrected here, with a `note`
// section beside each so a student reading the printed copy is not confused:
//   * p.23 Example 7 — the manual computes $f''(2) = 62$; it is 72.
//   * p.23 Example 7 — the question asks for the maximum *and* minimum on a
//     closed interval, but the manual stops at the interior minimum. The
//     endpoints are evaluated here.
//   * p.24 Example 9 — the manual gives the maximum point as $(-1, 25/6)$; it
//     is $(-1, 37/6)$. It subtracted the $-2(-1)$ term instead of adding it.
// The manual also has typographical slips that change no answer (the chain
// rule misprinted on p.10, a mislabelled $f(1)$ on p.20, a dropped factor on
// p.24). Those are silently right here and flagged in a closing note per unit.
//
// No errata list was supplied for units four and five. Every one of their 24
// worked examples was re-checked by hand against the source and the arithmetic
// holds; the only thing worth a reader's note is the notation shift in the
// definite-integral substitution rule, flagged in place.

export const mth121LectureNotes = [
  {
    number: '1',
    title: 'Unit One — Introduction: Functions, Limits and Continuity',
    sections: [
      {
        type: 'definition',
        heading: '1.1 Functions',
        text: 'Let $X$ and $Y$ be nonempty sets, then a mapping from $X$ to $Y$ is a rule that assigns a unique object $y \\in Y$ to each object $x \\in X$. If $Y \\subseteq \\mathbb{R}$, then the mapping $f$ is called a function. Also, a function is a rule that associates or maps an input, first entry set, independent variables called the domain to an output, second entry set, dependent variables called the co-domain.',
      },
      {
        type: 'bullets',
        heading: 'Notation and terminology',
        items: [
          '(i) We write $f: X \\to Y$ with $f(x) = y$ being the unique value assigned to $x$.',
          '(ii) The set $X$ is called the domain of the function while $Y$ is called its co-domain.',
          '(iii) The value $y$ in $Y$ uniquely assigned to $x$ is called the image (denoted by $f(x)$) of $x$ under $f$ — that is, if $y = f(x)$ then $y$ or $f(x)$ is called the image of $x$ under $f$.',
          '(iv) Generally $f(x)$ is called the image of $x$ under $f$. If $D$ is a subset of the domain $X$ (that is, $D \\subseteq X$) then $f(D)$ is called the image of the set $D$ under $f$, and the image $f(X)$ of the domain $X$ under $f$ is called the range of the function. The range of a function $f: X \\to Y$ is given by $f(X)$ (the image of the domain), and the value $f(x)$ of $f$ at $x \\in X$ is called the image of $x$.',
        ],
      },
      {
        type: 'text',
        text: 'If $X, Y \\subseteq \\mathbb{R}$, then the function $f: X \\to Y$ is called a function of real variables or a real-valued function. The range is a subset of the co-domain. However, if all the elements of the co-domain have been mapped to, then the range is also the co-domain.',
      },
      {
        type: 'table',
        heading: 'Examples of some functions',
        headers: ['#', 'Function type', 'Equation'],
        rows: [
          ['1.', 'Polynomial function', '$f(x) = x^2 + 3x - 1$'],
          ['2.', 'Trigonometric function', '$f(x) = \\cos 4x$'],
          ['3.', 'Absolute value function', '$f(x) = |x + 1|$'],
          ['4.', 'Rational function', '$f(x) = \\frac{x^2 + 5}{2x - 1}$'],
          ['5.', 'Logarithmic function', '$f(x) = \\log_3 2x$'],
          ['6.', 'Root function', '$f(x) = \\sqrt{9 - x^2}$'],
        ],
      },

      {
        type: 'text',
        heading: 'Example 1 — Domain of a rational function',
        text: 'Find the domain of the function $\\frac{x+2}{x^2-9}$ such that the function is defined.',
      },
      {
        type: 'text',
        text: 'Solution: the function will not be defined when the denominator equals zero.',
      },
      { type: 'math', tex: '\\implies x^2 - 9 \\neq 0 \\implies x^2 \\neq 9 \\implies x \\neq \\pm 3' },
      {
        type: 'math',
        tex: '\\therefore \\text{dom} \\left( \\frac{x+2}{x^2-9} \\right) = \\mathbb{R} - \\{-3, 3\\}',
        caption: 'or, in interval notation, (−∞, −3) ∪ (−3, 3) ∪ (3, ∞)',
      },

      {
        type: 'text',
        heading: 'Example 2 — Domain of a root function',
        text: 'Find the domain of the function $f(x) = \\sqrt{\\frac{x-3}{x+1}}$ such that the function is real.',
      },
      {
        type: 'text',
        text: 'Solution: the domain of definition is when everything inside the root (i.e. the argument) is equal to or greater than zero. Further, $x$ must not be $-1$ (to avoid division by zero).',
      },
      { type: 'math', tex: '\\frac{x-3}{x+1} \\geq 0' },
      {
        type: 'text',
        text: 'Multiply the inequality by $(x+1)^2$ and simplify to get:',
      },
      { type: 'math', tex: '(x+1)(x-3) \\geq 0' },
      {
        type: 'text',
        text: 'A product is non-negative exactly when its two factors share a sign, so there are two cases to take. Throughout, $x = -1$ stays excluded — it makes the original denominator zero.',
      },
      {
        type: 'math',
        tex: '\\text{Case 1: } x+1 > 0 \\;\\text{ and }\\; x-3 \\geq 0 \\iff x > -1 \\;\\text{ and }\\; x \\geq 3 \\iff x \\geq 3',
      },
      {
        type: 'math',
        tex: '\\text{Case 2: } x+1 < 0 \\;\\text{ and }\\; x-3 \\leq 0 \\iff x < -1 \\;\\text{ and }\\; x \\leq 3 \\iff x < -1',
      },
      {
        type: 'math',
        tex: '\\therefore \\{x < -1\\} \\cup \\{x \\geq 3\\}',
        caption: 'or, in interval notation, (−∞, −1) ∪ [3, ∞)',
      },
      {
        type: 'note',
        text: 'The manual runs both cases together across two lines without the word "or" between them, which makes it read as one broken chain of equivalences. The two cases are separated here; the answer is the manual\'s own.',
      },

      {
        type: 'text',
        heading: 'Example 3 — Range of a rational function',
        text: 'Find the range of the function $y = \\frac{x+2}{x-1}$.',
      },
      { type: 'math', tex: '\\frac{y}{1} = \\frac{x+2}{x-1} \\implies y(x-1) = 1(x+2)' },
      { type: 'math', tex: 'xy - y = x + 2 \\implies xy - x = 2 + y' },
      { type: 'math', tex: 'x(y-1) = 2 + y \\implies x = \\frac{2+y}{y-1}' },
      {
        type: 'text',
        text: 'For the function above to be defined, $y-1 \\neq 0 \\implies y \\neq 1$.',
      },
      {
        type: 'math',
        tex: '\\therefore \\text{Range} = \\mathbb{R} \\setminus \\{1\\}',
        caption: 'also written $\\mathbb{R} - \\{1\\}$, or in interval notation (−∞, 1) ∪ (1, ∞)',
      },

      {
        type: 'text',
        heading: 'Example 4 — Composite function',
        text: 'If $g(x) = e^{2x}$ and $h(x) = \\sin(x-2)$, find the composite function $h \\circ g$.',
      },
      { type: 'math', tex: 'h \\circ g = h(g) = \\sin(g-2) = \\sin(e^{2x} - 2)' },

      {
        type: 'text',
        heading: 'Example 5 — Composition of three functions',
        text: 'If $f(x) = 2x+5$, $g(x) = e^x$ and $h(x) = \\sin 2x$, find $h \\circ f \\circ g$.',
      },
      { type: 'math', tex: 'h \\circ f \\circ g = h(f(g)) = \\sin[2f(g)]' },
      { type: 'math', tex: '= \\sin[2(2g+5)] = \\sin[2(2e^x+5)]' },
      { type: 'math', tex: '\\therefore h \\circ f \\circ g = \\sin(4e^x + 10)' },

      {
        type: 'definition',
        heading: '1.2 Limits',
        text: 'The limit of a function is the value which the dependent variable approaches when the independent variable tends to a certain value, say $a$.',
      },
      { type: 'math', tex: '\\lim_{x \\to a} f(x) = L' },
      {
        type: 'bullets',
        heading: 'The two forms of a limit',
        items: [
          '(1) $\\lim_{x \\to \\infty} f(x)$ — the independent variable grows without bound.',
          '(2) $\\lim_{x \\to a} f(x)$ — the independent variable tends to a finite value $a$.',
        ],
      },

      {
        type: 'text',
        heading: 'Example 6 — Limit by factorisation',
        text: 'Evaluate $\\lim_{x \\to 2} \\frac{x^3-8}{x^2-4}$.',
      },
      { type: 'text', text: 'Solution: by factorisation, we have' },
      {
        type: 'math',
        tex: '\\lim_{x \\to 2} \\frac{x^3-8}{x^2-4} = \\lim_{x \\to 2} \\frac{(x-2)(x^2+2x+4)}{(x-2)(x+2)}',
      },
      {
        type: 'math',
        tex: '= \\lim_{x \\to 2} \\frac{x^2+2x+4}{x+2} = \\frac{2^2+2 \\times 2+4}{2+2} = \\frac{12}{4} = 3',
      },

      {
        type: 'text',
        heading: 'Example 7 — One-sided limits of the greatest integer function',
        text: 'Evaluate (i) $\\lim_{x \\to 2^+} [2x]$ and (ii) $\\lim_{x \\to 2^-} [2x]$.',
      },
      { type: 'text', text: 'Solution: $[\\;]$ means the greatest integer function.' },
      { type: 'math', tex: '[2x] \\text{ as } x \\to 2^+ \\implies [4]^+ = 4' },
      { type: 'math', tex: '[2x] \\text{ as } x \\to 2^- \\implies [4]^- = 3' },

      {
        type: 'text',
        heading: 'Example 8 — Two methods for the same limit',
        text: 'Evaluate $\\lim_{x \\to 0} \\frac{1-\\cos x}{x^2}$.',
      },
      { type: 'text', text: "Solution, method 1: using L'Hôpital's rule," },
      {
        type: 'math',
        tex: '\\lim_{x \\to 0} \\frac{\\sin x}{2x} = \\lim_{x \\to 0} \\frac{\\cos x}{2} = \\frac{\\cos 0}{2} = \\frac{1}{2}',
      },
      {
        type: 'text',
        text: 'Method 2: recall that $1 - \\cos^2 x = \\sin^2 x$ and $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$. Hence',
      },
      {
        type: 'math',
        tex: '(1+\\cos x)(1-\\cos x) = \\sin^2 x \\implies 1 - \\cos x = \\frac{\\sin^2 x}{1+\\cos x}',
      },
      {
        type: 'math',
        tex: '\\frac{1-\\cos x}{x^2} \\implies \\frac{\\sin^2 x}{x^2(1+\\cos x)} = \\frac{\\sin x}{x} \\cdot \\frac{\\sin x}{x} \\cdot \\frac{1}{1+\\cos x}',
      },
      { type: 'text', text: 'Consequently,' },
      {
        type: 'math',
        tex: '\\lim_{x \\to 0} \\frac{1-\\cos x}{x^2} = \\lim_{x \\to 0} \\frac{\\sin x}{x} \\cdot \\frac{\\sin x}{x} \\cdot \\frac{1}{1+\\cos x} = 1 \\cdot 1 \\cdot \\frac{1}{1+\\cos 0} = 1 \\cdot 1 \\cdot \\frac{1}{2} = \\frac{1}{2}',
      },

      {
        type: 'text',
        heading: 'Example 9 — Limit at infinity',
        text: 'Evaluate $\\lim_{x \\to \\infty} \\frac{x}{\\sqrt{x^2-1}}$.',
      },
      {
        type: 'math',
        tex: '\\lim_{x \\to \\infty} \\frac{x}{\\sqrt{x^2-1}} = \\lim_{x \\to \\infty} \\frac{\\frac{x}{x}}{\\sqrt{\\frac{x^2}{x^2}-\\frac{1}{x^2}}} = \\lim_{x \\to \\infty} \\frac{1}{\\sqrt{1-\\frac{1}{x^2}}} = \\frac{1}{\\sqrt{1-0}} = 1',
      },

      {
        type: 'text',
        heading: 'Example 10 — Rationalising the numerator',
        text: 'Evaluate $\\lim_{x \\to 1} \\frac{x-1}{\\sqrt{x}-1}$.',
      },
      { type: 'text', text: 'Solution, method 1:' },
      {
        type: 'math',
        tex: '\\lim_{x \\to 1} \\frac{x-1}{\\sqrt{x}-1} \\cdot \\frac{\\sqrt{x}+1}{\\sqrt{x}+1} = \\lim_{x \\to 1} \\frac{(x-1)(\\sqrt{x}+1)}{x-1} = \\lim_{x \\to 1}(\\sqrt{x}+1) = 2',
      },
      { type: 'text', text: "Method 2: also using L'Hôpital's rule," },
      { type: 'math', tex: '\\lim_{x \\to 1} \\frac{1}{\\frac{1}{2\\sqrt{x}}} = \\lim_{x \\to 1} 2\\sqrt{x} = 2' },

      {
        type: 'definition',
        heading: '1.3 Continuity',
        text: 'A function $f(x)$ is said to be continuous at $x = a$ if the three conditions below are satisfied. If any of them is not satisfied, then the function is said to be discontinuous.',
      },
      {
        type: 'bullets',
        heading: 'The three conditions for continuity at $x = a$',
        items: [
          '(i) $f(a)$ is defined.',
          '(ii) $\\lim_{x \\to a} f(x)$ exists.',
          '(iii) $\\lim_{x \\to a} f(x) = f(a)$.',
        ],
      },

      {
        type: 'text',
        heading: 'Example 1 — Finding the constant that makes a function continuous',
        text: 'Find the value of $c$ for the function to be continuous, where $h(x) = \\begin{cases} \\frac{x^2-4}{x-2}, & x \\neq 2 \\\\ c+1, & x = 2 \\end{cases}$',
      },
      { type: 'text', text: 'Solution: $f(2) = c+1$, so it is defined.' },
      {
        type: 'math',
        tex: '\\lim_{x \\to 2} f(x) = \\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x-2} = 2+2 = 4',
      },
      {
        type: 'text',
        text: 'For the limit to exist and equal $f(2)$:',
      },
      { type: 'math', tex: 'c+1 = 4 \\implies c = 3' },
      {
        type: 'note',
        text: 'For the function to be continuous, $c = 3$.',
      },

      {
        type: 'casestudy',
        title: 'Exercises',
        prompt: 'The workbook sets these three problems at the end of Unit One.',
        tasks: [
          'Find the domain and range of the function $g(x) = \\sqrt{2x+4}$.',
          'Find the domain and range of the function $h(x) = \\begin{cases} 2x+1, & \\text{if } x > 0 \\\\ x^2, & \\text{if } x \\leq 0 \\end{cases}$',
          'Find the domain and range of $g(x) = \\frac{\\sqrt{4-x^2}}{x-1}$.',
        ],
      },
    ],
  },

  {
    number: '2',
    title: 'Unit Two — Differentiation',
    sections: [
      {
        type: 'definition',
        heading: '2.1 Introduction',
        text: 'The study of calculus is divided into two parts: differentiation and integration. Differentiation deals with the rate of change of one quantity with respect to another. For example, if $y$ is a function of $x$, then the derivative of $y$ with respect to $x$ is the rate at which $y$ changes as $x$ changes.',
      },

      {
        type: 'text',
        heading: '2.2 Derivative of functions',
        text: 'In science and engineering, we often need to know how one quantity changes in relation to another. For instance, we may want to know how the displacement of an object changes with time. If $s(t)$ is the displacement of an object at time $t$, then the average velocity between time $t_0$ and $t_1$ is given by:',
      },
      { type: 'math', tex: '\\text{Average velocity} = \\frac{s(t_1) - s(t_0)}{t_1 - t_0}' },
      {
        type: 'text',
        text: 'The instantaneous velocity at time $t_0$ is the limit of the average velocity as $t_1$ approaches $t_0$.',
      },
      {
        type: 'text',
        text: 'Consider a function $y = f(x)$. Let $x$ change by a small amount $\\Delta x$. Then $y$ will change by a corresponding amount $\\Delta y$. The average rate of change of $y$ with respect to $x$ is $\\frac{\\Delta y}{\\Delta x}$. The derivative of $y$ with respect to $x$, denoted by $\\frac{dy}{dx}$ or $f\'(x)$, is defined as:',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x} = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}',
        caption: 'equation (2.1) — provided the limit exists',
      },
      {
        type: 'bullets',
        heading: 'Notations for derivatives',
        items: [
          '$\\frac{dy}{dx}$ — Leibniz notation.',
          '$f\'(x)$ — Lagrange notation.',
          '$D_y$ or $D(f(x))$ — operator notation.',
        ],
      },

      {
        type: 'definition',
        heading: '2.2.1 Differentiability',
        text: 'A function $f(x)$ is said to be differentiable at $x = a$ if the limit $\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$ exists.',
      },
      {
        type: 'text',
        text: 'In order for $f(x)$ to be differentiable at $x = a$, the function must be defined for all values of $x$ on both sides of $a$ and in its immediate neighbourhood. If $x$ changes from $a$ to $a+h$, where $h$ is either positive or negative, the average gradient from $x = a$ to $x = a+h$ is:',
      },
      { type: 'math', tex: '\\frac{\\Delta y}{\\Delta x} = \\frac{f(a+h) - f(a)}{h}, \\quad h \\neq 0' },
      {
        type: 'text',
        text: 'If this tends to the same limit as $h$ approaches $0$ through both positive and negative values, the limit is $f\'(a)$ and the function is said to be differentiable at $x = a$. If a different limit is obtained according as $h$ approaches zero through positive or negative values, the function is not differentiable at $x = a$. If a function is differentiable at a point, it must be continuous at that point; however, the converse is not always true. A function differentiable on a closed interval $[a, b]$ is differentiable on the open interval $(a, b)$ if the right-hand derivative and left-hand derivative exist at $a$ and $b$ respectively.',
      },

      {
        type: 'table',
        heading: 'Differentiation formulas',
        headers: ['Rule name', 'Formula'],
        rows: [
          ['Power rule', '$\\frac{d}{dx}(x^n) = nx^{n-1}$'],
          ['Sum / difference rule', '$\\frac{d}{dx}[f(x) \\pm g(x)] = f\'(x) \\pm g\'(x)$'],
          ['Product rule', '$\\frac{d}{dx}[u \\cdot v] = u \\frac{dv}{dx} + v \\frac{du}{dx}$'],
          ['Quotient rule', '$\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v \\frac{du}{dx} - u \\frac{dv}{dx}}{v^2}$'],
          ['Chain rule', '$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$'],
          ['Implicit function', '$y^n = f(x, y) \\implies \\frac{dy^n}{dx} = ny^{n-1}\\frac{dy}{dx}$'],
          ['Exponential function', '$y = e^x \\implies \\frac{dy}{dx} = e^x$'],
          ['Logarithmic function', '$y = \\log x \\implies \\frac{dy}{dx} = \\frac{1}{x}$'],
          ['Parametric equation', '$y = f(t),\\; x = g(t) \\implies \\frac{dy}{dx} = \\frac{df/dt}{dg/dt}$'],
        ],
      },
      {
        type: 'note',
        items: [
          'The printed manual (p.10) mistypes the chain rule as $\\frac{du}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$. The left-hand side should be $\\frac{dy}{dx}$, as in the table above.',
          'Throughout this manual $\\log$ means the natural logarithm — that is why the table gives $\\frac{d}{dx}(\\log x) = \\frac{1}{x}$, and why Example 16 below differentiates $\\log(x^2+1)$ to $\\frac{2x}{x^2+1}$. If $\\log$ meant $\\log_{10}$, every one of those answers would carry an extra factor of $\\frac{1}{\\ln 10}$. Read $\\log$ as $\\ln$ here, and check which convention any other textbook is using before you copy a result across.',
        ],
      },

      {
        type: 'text',
        heading: 'Example 1 — Slope of a tangent from first principles',
        text: 'Find the slope of the tangent to the curve $y = f(x) = 3x^2 + 5$ at the point $(-1, 8)$ using the first principle.',
      },
      {
        type: 'math',
        tex: 'f(x + \\Delta x) = 3(x + \\Delta x)^2 + 5 = 3(x^2 + 2x\\Delta x + (\\Delta x)^2) + 5 = 3x^2 + 6x\\Delta x + 3(\\Delta x)^2 + 5',
      },
      { type: 'math', tex: '\\Delta y = f(x + \\Delta x) - f(x) = 6x\\Delta x + 3(\\Delta x)^2' },
      { type: 'math', tex: '\\frac{\\Delta y}{\\Delta x} = 6x + 3\\Delta x' },
      { type: 'math', tex: '\\frac{dy}{dx} = \\lim_{\\Delta x \\to 0} (6x + 3\\Delta x) = 6x' },
      {
        type: 'text',
        text: 'At $x = -1$, $\\frac{dy}{dx} = 6(-1) = -6$. The slope of the tangent is $-6$.',
      },

      {
        type: 'text',
        heading: 'Example 2 — Derivative of $\\sin x$ from first principles',
        text: 'Find the derivative of $y = \\sin x$ using the first principle.',
      },
      {
        type: 'text',
        text: 'Solution: $\\Delta y = \\sin(x + \\Delta x) - \\sin x$. Using $\\sin A - \\sin B = 2 \\cos\\left(\\frac{A+B}{2}\\right) \\sin\\left(\\frac{A-B}{2}\\right)$:',
      },
      { type: 'math', tex: '\\Delta y = 2 \\cos\\left(x + \\frac{\\Delta x}{2}\\right) \\sin\\left(\\frac{\\Delta x}{2}\\right)' },
      {
        type: 'math',
        tex: '\\frac{\\Delta y}{\\Delta x} = \\frac{2 \\cos(x + \\Delta x/2) \\sin(\\Delta x/2)}{\\Delta x} = \\cos\\left(x + \\frac{\\Delta x}{2}\\right) \\cdot \\frac{\\sin(\\Delta x/2)}{\\Delta x/2}',
      },
      {
        type: 'math',
        tex: '\\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x} = \\cos x \\cdot 1 = \\cos x \\quad \\therefore \\frac{d}{dx}(\\sin x) = \\cos x',
      },

      {
        type: 'text',
        heading: 'Example 3 — Power rule with a fractional index',
        text: 'Find the derivative of $y = \\frac{1}{\\sqrt[7]{x}}$, $x \\neq 0$.',
      },
      { type: 'math', tex: 'y = \\frac{1}{\\sqrt[7]{x}} = x^{-1/7}' },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = -\\frac{1}{7} x^{-\\frac{1}{7} - 1} = -\\frac{1}{7} x^{-8/7} = -\\frac{1}{7\\sqrt[7]{x^{8}}}, \\quad x \\neq 0',
      },

      {
        type: 'text',
        heading: 'Example 4 — Where a derivative vanishes',
        text: 'If $f(x) = x^2 + \\frac{1}{x^2}$, $x \\neq 0$, find $f\'(x)$ and determine the values of $x$ for which $f\'(x) = 0$.',
      },
      { type: 'math', tex: 'f(x) = x^2 + x^{-2} \\implies f\'(x) = 2x - 2x^{-3} = 2x - \\frac{2}{x^3}' },
      { type: 'math', tex: 'f\'(x) = 0 \\implies 2x = \\frac{2}{x^3} \\implies x^4 = 1 \\implies x = \\pm 1' },

      {
        type: 'text',
        heading: 'Example 5 — Product rule',
        text: 'Differentiate $y = x^2 \\sin x$ with respect to $x$.',
      },
      {
        type: 'math',
        tex: 'u = x^2,\\; v = \\sin x \\implies \\frac{dy}{dx} = x^2 \\cos x + 2x \\sin x',
      },

      {
        type: 'note',
        text: 'The manual\'s numbering jumps from Example 5 straight to Example 7 — there is no Example 6 in the original. The gap is left as printed rather than renumbering, so the examples here match the printed copy.',
      },

      {
        type: 'text',
        heading: 'Example 7 — Expand before differentiating',
        text: 'Differentiate $y = x(x^2 + 1)(x^3 + 4)$ with respect to $x$.',
      },
      { type: 'math', tex: 'y = (x^3 + x)(x^3 + 4) = x^6 + 4x^3 + x^4 + 4x' },
      { type: 'math', tex: '\\frac{dy}{dx} = 6x^5 + 12x^2 + 4x^3 + 4 = 6x^5 + 4x^3 + 12x^2 + 4' },

      {
        type: 'text',
        heading: 'Example 8 — Quotient rule: derivative of $\\tan x$',
        text: 'Differentiate $y = \\tan x$ with respect to $x$.',
      },
      {
        type: 'text',
        text: 'Solution: $y = \\frac{\\sin x}{\\cos x}$, so with $u = \\sin x$ and $v = \\cos x$,',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = \\frac{\\cos x(\\cos x) - \\sin x(-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x',
      },

      {
        type: 'text',
        heading: 'Example 9 — Chain rule',
        text: 'Differentiate $y = \\sin(x^2 + 3x - 1)$ with respect to $x$.',
      },
      {
        type: 'math',
        tex: 'u = x^2 + 3x - 1,\\; y = \\sin u \\implies \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx} = \\cos u \\cdot (2x + 3)',
      },
      { type: 'math', tex: '\\therefore \\frac{dy}{dx} = (2x + 3)\\cos(x^2 + 3x - 1)' },

      {
        type: 'text',
        heading: 'Example 10 — Product and chain rules together',
        text: 'Find the differential coefficient of $y = (1 + x^3)^4 \\sec(5x + 2)$.',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = (1 + x^3)^4 [5 \\sec(5x + 2) \\tan(5x + 2)] + \\sec(5x + 2) [4(1 + x^3)^3 (3x^2)]',
      },
      {
        type: 'math',
        tex: '= (1 + x^3)^3 \\sec(5x + 2) [5(1 + x^3) \\tan(5x + 2) + 12x^2]',
      },

      {
        type: 'text',
        heading: 'Example 11 — Negative index with the chain rule',
        text: 'Differentiate $y = \\frac{1}{(9x + 1)^3}$ with respect to $x$.',
      },
      {
        type: 'math',
        tex: 'y = (9x + 1)^{-3} \\implies \\frac{dy}{dx} = -3(9x + 1)^{-4} \\cdot 9 = -27(9x + 1)^{-4} = \\frac{-27}{(9x + 1)^4}',
      },

      {
        type: 'text',
        heading: 'Example 12 — Implicit differentiation',
        text: 'If $x^3 + xy + y^5 - 11 = 0$, find $\\frac{dy}{dx}$ at the point $(2, 1)$.',
      },
      {
        type: 'math',
        tex: '3x^2 + \\left(x \\frac{dy}{dx} + y\\right) + 5y^4 \\frac{dy}{dx} = 0',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx}(x + 5y^4) = -(3x^2 + y) \\implies \\frac{dy}{dx} = -\\frac{3x^2 + y}{x + 5y^4}',
      },
      {
        type: 'math',
        tex: '\\text{At } (2, 1): \\quad \\frac{dy}{dx} = -\\frac{3(2^2) + 1}{2 + 5(1^4)} = -\\frac{12 + 1}{2 + 5} = -\\frac{13}{7}',
      },

      {
        type: 'text',
        heading: 'Example 13 — Exponential function',
        text: 'Differentiate $y = e^{5 - 2x}$ with respect to $x$.',
      },
      {
        type: 'text',
        text: 'Method 1: take the natural log of both sides, $\\ln y = \\ln e^{5 - 2x} = 5 - 2x$, then differentiate both sides.',
      },
      {
        type: 'math',
        tex: '\\frac{1}{y}\\frac{dy}{dx} = -2 \\implies \\frac{dy}{dx} = -2y = -2e^{5 - 2x}',
      },
      { type: 'text', text: 'Method 2: let $u = 5 - 2x$, then $y = e^u$.' },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = e^u \\cdot (-2) = -2e^{5 - 2x}',
      },

      {
        type: 'text',
        heading: 'Example 14 — Logarithmic differentiation',
        text: 'Differentiate $y = 2^x$ with respect to $x$.',
      },
      { type: 'text', text: 'Solution: take the natural log of both sides, $\\ln y = x \\ln 2$.' },
      {
        type: 'math',
        tex: '\\frac{1}{y} \\frac{dy}{dx} = \\ln 2 \\implies \\frac{dy}{dx} = y \\ln 2 = 2^x \\ln 2',
      },

      {
        type: 'text',
        heading: 'Example 15 — A variable raised to a variable power',
        text: 'Differentiate $y = x^x$ with respect to $x$.',
      },
      { type: 'math', tex: '\\ln y = x \\ln x \\implies \\frac{1}{y} \\frac{dy}{dx} = x \\cdot \\frac{1}{x} + 1 \\cdot \\ln x = 1 + \\ln x' },
      { type: 'math', tex: '\\therefore \\frac{dy}{dx} = x^x(1 + \\ln x)' },

      {
        type: 'text',
        heading: 'Example 16 — Derivative of a logarithm',
        text: 'Differentiate $y = \\log(x^2 + 1)$ with respect to $x$.',
      },
      { type: 'math', tex: '\\frac{dy}{dx} = \\frac{1}{x^2 + 1} \\cdot 2x = \\frac{2x}{x^2 + 1}' },

      {
        type: 'text',
        heading: 'Example 17 — Inverse sine',
        text: 'If $y = \\sin^{-1} x$, find $\\frac{dy}{dx}$.',
      },
      { type: 'math', tex: 'x = \\sin y \\implies 1 = \\cos y \\frac{dy}{dx} \\implies \\frac{dy}{dx} = \\frac{1}{\\cos y}' },
      {
        type: 'math',
        tex: '\\cos y = \\sqrt{1 - \\sin^2 y} = \\sqrt{1 - x^2} \\implies \\frac{dy}{dx} = \\frac{1}{\\sqrt{1 - x^2}}',
      },

      {
        type: 'text',
        heading: 'Example 18 — Inverse cosine',
        text: 'If $y = \\cos^{-1} x$, find $\\frac{dy}{dx}$.',
      },
      { type: 'math', tex: 'x = \\cos y \\implies \\frac{dx}{dy} = -\\sin y \\implies \\frac{dy}{dx} = -\\frac{1}{\\sin y}' },
      {
        type: 'math',
        tex: '\\sin y = \\sqrt{1 - \\cos^{2} y} = \\sqrt{1 - x^{2}} \\implies \\frac{dy}{dx} = -\\frac{1}{\\sqrt{1 - x^{2}}}',
      },

      {
        type: 'text',
        heading: 'Example 19 — Parametric differentiation',
        text: 'Find $\\frac{dy}{dx}$ for $x = \\frac{t - 1}{t + 1}$ and $y = \\frac{2t - 1}{t - 2}$.',
      },
      {
        type: 'math',
        tex: '\\frac{dx}{dt} = \\frac{(t + 1)(1) - (t - 1)(1)}{(t + 1)^2} = \\frac{2}{(t + 1)^2}',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dt} = \\frac{(t - 2)(2) - (2t - 1)(1)}{(t - 2)^2} = \\frac{2t - 4 - 2t + 1}{(t - 2)^2} = \\frac{-3}{(t - 2)^2}',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{-3}{(t - 2)^2} \\cdot \\frac{(t + 1)^2}{2} = -\\frac{3(t + 1)^2}{2(t - 2)^2}',
      },

      {
        type: 'text',
        heading: 'Example 20 — Hyperbolic function',
        text: 'If $y = \\ln \\cosh x$, obtain $\\frac{dy}{dx}$.',
      },
      { type: 'math', tex: '\\frac{dy}{dx} = \\frac{1}{\\cosh x} \\cdot \\sinh x = \\tanh x' },

      {
        type: 'note',
        heading: 'Reading the printed copy',
        text: 'Two further slips in the manual\'s Unit Two change no answer but will trip you up: on p.9 the first-principles line is printed as $y_1 = f(f(x_0 + \\Delta x))$ (the $f$ is doubled — it should be $y_1 = f(x_0 + \\Delta x)$), and on p.12 the substitution $w = x^3 + 4$ is followed by "$\\frac{dv}{dx} = 3x^2$" where it should read $\\frac{dw}{dx} = 3x^2$. Both are correct above.',
      },

      {
        type: 'casestudy',
        title: 'Unit Two Exercises',
        prompt: 'The workbook sets these three problems at the end of Unit Two.',
        tasks: [
          'Find the derivative of $f(x) = \\sqrt{x}$, $x > 0$, at each point in its domain.',
          'Find $\\frac{dy}{dx}$ at $\\left(-\\frac{1}{2}, \\frac{1}{2}\\right)$ if $\\frac{1}{2}x \\sin(\\pi y) + y - x^2 = 0$.',
          'Differentiate with respect to $x$ the function $\\text{sech}^3 x$.',
        ],
      },
    ],
  },

  {
    number: '3',
    title: 'Unit Three — Extrema',
    sections: [
      {
        type: 'definition',
        heading: '3.1 Introduction',
        text: 'Maxima and minima refer to the extreme values of a function, and in calculus they are found using derivatives. A particularly important application of differentiation is the problem of finding the maximum and minimum values of a given function $f(x)$. Stationary points (or critical points) are points on the curve where the tangent becomes horizontal and $\\frac{dy}{dx} = 0$. A stationary point is called a turning point if the derivative changes sign there — from positive to negative, or the other way round.',
      },
      {
        type: 'bullets',
        heading: 'The two types of turning point',
        items: [
          '(i) A local maximum — the largest value of the function in the region.',
          '(ii) A local minimum — the smallest value of the function in the region.',
        ],
      },
      {
        type: 'text',
        text: 'Points where $\\frac{dy}{dx} = 0$ but the sign of the derivative does not change are known as points of inflexion, or saddle points.',
      },

      {
        type: 'bullets',
        heading: 'First derivative test',
        items: [
          'Let $f(x)$ be continuous at a critical point $c$ such that $f\'(c) = 0$.',
          '(i) If $f\'(x)$ changes sign from positive to negative as $x$ increases through $c$, then $c$ is a point of local maximum.',
          '(ii) If $f\'(x)$ changes sign from negative to positive as $x$ increases through $c$, then $c$ is a point of local minimum.',
          '(iii) If $f\'(x)$ does not change sign, then $c$ is a point of inflection.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Second derivative test',
        items: [
          'Let $f(x)$ be twice differentiable at $c$.',
          '(i) If $f\'(c) = 0$ and $f\'\'(c) < 0$, then $f(c)$ is a local maximum.',
          '(ii) If $f\'(c) = 0$ and $f\'\'(c) > 0$, then $f(c)$ is a local minimum.',
          '(iii) If $f\'(c) = 0$ and $f\'\'(c) = 0$, the test fails and the first derivative test must be used instead.',
        ],
      },

      {
        type: 'text',
        heading: 'Example 1 — Second derivative test',
        text: 'Find the local maximum and minimum of the function $f(x) = 2x^3 + 3x^2 - 12x + 5$.',
      },
      { type: 'math', tex: 'f\'(x) = 6x^2 + 6x - 12 = 6(x^2 + x - 2) = 6(x + 2)(x - 1)' },
      { type: 'text', text: 'Stationary points occur at $x = 1$ and $x = -2$. The second derivative is $f\'\'(x) = 12x + 6$.' },
      { type: 'math', tex: 'f\'\'(1) = 18 > 0 \\implies \\text{local minimum at } (1, -2)' },
      { type: 'math', tex: 'f\'\'(-2) = -18 < 0 \\implies \\text{local maximum at } (-2, 25)' },

      {
        type: 'text',
        heading: 'Example 2 — Coordinates and nature of turning points',
        text: 'Find the coordinates and nature of the turning points of the function $f(x) = x^{3} - 3x^{2} - 45x$.',
      },
      {
        type: 'math',
        tex: 'f\'(x) = 3x^{2} - 6x - 45 = 3(x^{2} - 2x - 15) = 3(x - 5)(x + 3) = 0 \\implies x = -3 \\text{ or } x = 5',
      },
      { type: 'text', text: 'Using the second derivative test, $f\'\'(x) = 6x - 6$.' },
      { type: 'math', tex: 'f\'\'(-3) = -24 < 0 \\;\\text{(maximum)}, \\qquad f\'\'(5) = 24 > 0 \\;\\text{(minimum)}' },
      {
        type: 'text',
        text: 'Evaluating $f(x)$ at each point gives $f(-3) = 81$ and $f(5) = -175$. So the turning points are a local maximum at $(-3, 81)$ and a local minimum at $(5, -175)$.',
      },

      {
        type: 'text',
        heading: 'Example 3 — First derivative test',
        text: 'Investigate the local maxima and local minima of $f(x) = 2x^{3} - 3x^{2} - 12x + 5$ using the first derivative test.',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = 6x^{2} - 6x - 12 = 6(x^{2} - x - 2) = 6(x + 1)(x - 2) = 0 \\implies x = -1,\\; x = 2',
      },
      { type: 'text', text: 'For the critical point $x = -1$, test either side at $x = -2$ and $x = 0$:' },
      { type: 'math', tex: 'f\'(-2) = 6(4 + 2 - 2) = 24 > 0, \\qquad f\'(0) = 6(0 - 0 - 2) = -12 < 0' },
      {
        type: 'text',
        text: 'The derivative changes from positive to negative as $x$ increases through $-1$, so $x = -1$ is a point of local maxima, with maximum value $f(-1) = 2(-1)^{3} - 3(-1)^{2} - 12(-1) + 5 = 12$.',
      },
      { type: 'text', text: 'For the critical point $x = 2$, test at $x = 1$ and $x = 3$:' },
      { type: 'math', tex: 'f\'(1) = 6(1 - 1 - 2) = -12 < 0, \\qquad f\'(3) = 6(9 - 3 - 2) = 24 > 0' },
      {
        type: 'text',
        text: 'The derivative changes from negative to positive as $x$ increases through $2$, so $x = 2$ is a point of local minima, with minimum value $f(2) = 2(2)^{3} - 3(2)^{2} - 12(2) + 5 = -15$.',
      },

      {
        type: 'text',
        heading: 'Example 4 — Maximum height of a projectile',
        text: 'A stone is thrown in the air. Its height at any time $t$ is given by $h = -5t^2 + 10t + 4$. Find its maximum height.',
      },
      { type: 'math', tex: '\\frac{dh}{dt} = -10t + 10 = 0 \\implies t = 1' },
      { type: 'math', tex: '\\frac{d^2h}{dt^2} = -10 < 0 \\implies \\text{maximum turning point}' },
      { type: 'math', tex: 'h(1) = -5(1)^2 + 10(1) + 4 = 9 \\text{ units}' },

      {
        type: 'text',
        heading: 'Example 5 — Optimisation: the largest rectangle',
        text: 'Show that for all rectangles of given perimeter $p$ and area $A$, the one with the largest area is a square.',
      },
      { type: 'math', tex: '2x + 2y = p \\implies y = \\frac{p}{2} - x' },
      { type: 'math', tex: 'A = xy = x\\left(\\frac{p}{2} - x\\right) = \\frac{px}{2} - x^2' },
      { type: 'math', tex: 'A\'(x) = \\frac{p}{2} - 2x = 0 \\implies x = \\frac{p}{4} \\implies y = \\frac{p}{2} - \\frac{p}{4} = \\frac{p}{4}' },
      { type: 'text', text: 'Since $x = y$, the rectangle is a square.' },

      {
        type: 'text',
        heading: 'Example 6 — Minimum sum for a fixed product',
        text: 'The product of two positive integers is $36$. What is the minimum value of their sum?',
      },
      {
        type: 'text',
        text: 'Solution: let the numbers be $x$ and $y$ and let $S$ be their sum, so $xy = 36$ and $S = x + y$. Eliminating $y$ gives $S = x + \\frac{36}{x}$.',
      },
      {
        type: 'math',
        tex: '\\frac{dS}{dx} = 1 - \\frac{36}{x^{2}} = 0 \\implies x = \\pm 6 \\implies x = 6 \\;(\\text{positive})',
      },
      {
        type: 'math',
        tex: '\\frac{d^{2}S}{dx^{2}} = \\frac{72}{x^{3}}, \\qquad \\left.\\frac{d^{2}S}{dx^{2}}\\right|_{x=6} = \\frac{72}{216} = \\frac{1}{3} > 0',
      },
      {
        type: 'text',
        text: 'Hence $x = 6$ gives a minimum. Since $xy = 36$, it follows that $y = 6$, and the minimum value of the sum is $S = x + y = 6 + 6 = 12$.',
      },

      {
        type: 'text',
        heading: 'Example 7 — Extrema on a closed interval',
        text: 'Find the maximum and minimum values of $f(x) = 3x^{4} - 8x^{3} + 12x^{2} - 48x + 25$ on the closed interval $[0, 3]$.',
      },
      {
        type: 'math',
        tex: 'f\'(x) = 12x^{3} - 24x^{2} + 24x - 48 = 12(x^{3} - 2x^{2} + 2x - 4) = 12(x - 2)(x^{2} + 2)',
      },
      {
        type: 'text',
        text: 'At stationary points $f\'(x) = 0$, so $x - 2 = 0$ or $x^{2} + 2 = 0$. The latter has no real roots, so only $x = 2 \\in [0, 3]$ is considered. Deploying the second derivative test, $f\'\'(x) = 36x^{2} - 48x + 24$.',
      },
      { type: 'math', tex: 'f\'\'(2) = 36(4) - 48(2) + 24 = 144 - 96 + 24 = 72 > 0' },
      {
        type: 'math',
        tex: '\\implies \\text{minimum turning point at } x = 2, \\quad f(2) = 48 - 64 + 48 - 96 + 25 = -39',
      },
      {
        type: 'text',
        text: 'On a closed interval the maximum may occur at an endpoint, so $f$ must also be evaluated there:',
      },
      { type: 'math', tex: 'f(0) = 25, \\qquad f(3) = 243 - 216 + 108 - 144 + 25 = 16' },
      {
        type: 'text',
        text: 'Comparing $f(0) = 25$, $f(2) = -39$ and $f(3) = 16$: the maximum value is $25$ at $x = 0$ and the minimum value is $-39$ at $x = 2$.',
      },
      {
        type: 'note',
        heading: 'Corrected from the printed manual',
        items: [
          'The manual (p.23) computes $f\'\'(2) = 62$. The correct value is $72$, as above. The conclusion is unaffected — it is still positive, so still a minimum — but the printed number is wrong.',
          'The manual also stops at the interior minimum and states no maximum, leaving the question half answered. On a closed interval the extreme values may sit at the endpoints, so $f(0)$ and $f(3)$ are evaluated here.',
        ],
      },

      {
        type: 'text',
        heading: 'Example 8 — When the second derivative test fails',
        text: 'Analyse the stationary points of $y = x^3 - 6x^2 + 12x - 5$ and classify them.',
      },
      { type: 'math', tex: '\\frac{dy}{dx} = 3x^2 - 12x + 12 = 3(x - 2)^2 = 0 \\implies x = 2' },
      {
        type: 'math',
        tex: '\\frac{d^2y}{dx^2} = 6x - 12, \\qquad \\left.\\frac{d^2y}{dx^2}\\right|_{x=2} = 0 \\;\\text{(test fails)}',
      },
      { type: 'text', text: 'Falling back on the first derivative test:' },
      {
        type: 'math',
        tex: '\\left.\\frac{dy}{dx}\\right|_{x=1} = 3(1 - 2)^2 = 3 > 0, \\qquad \\left.\\frac{dy}{dx}\\right|_{x=3} = 3(3 - 2)^2 = 3 > 0',
      },
      { type: 'text', text: 'Since the sign does not change, $x = 2$ is a point of inflection.' },

      {
        type: 'text',
        heading: 'Example 9 — Turning points of a cubic',
        text: 'Find the turning points on the graph of $y = \\frac{x^{3}}{3} - \\frac{x^{2}}{2} - 2x + 5$.',
      },
      {
        type: 'math',
        tex: '\\frac{dy}{dx} = x^{2} - x - 2 = (x - 2)(x + 1) = 0 \\implies x = 2 \\text{ and } x = -1',
      },
      { type: 'text', text: 'To determine their nature, use the second derivative test: $\\frac{d^{2}y}{dx^{2}} = 2x - 1$.' },
      {
        type: 'math',
        tex: '\\text{At } x = 2: \\quad \\frac{d^{2}y}{dx^{2}} = 2(2) - 1 = 3 > 0 \\implies \\text{minimum}',
      },
      {
        type: 'math',
        tex: 'y = \\frac{(2)^{3}}{3} - \\frac{(2)^{2}}{2} - 2(2) + 5 = \\frac{8}{3} - 2 - 4 + 5 = \\frac{5}{3}',
      },
      { type: 'math', tex: '\\therefore \\text{the minimum point is } \\left(2, \\frac{5}{3}\\right)' },
      {
        type: 'math',
        tex: '\\text{At } x = -1: \\quad \\frac{d^{2}y}{dx^{2}} = 2(-1) - 1 = -3 < 0 \\implies \\text{maximum}',
      },
      {
        type: 'math',
        tex: 'y = \\frac{(-1)^{3}}{3} - \\frac{(-1)^{2}}{2} - 2(-1) + 5 = -\\frac{1}{3} - \\frac{1}{2} + 2 + 5 = \\frac{37}{6}',
      },
      { type: 'math', tex: '\\therefore \\text{the maximum point is } \\left(-1, \\frac{37}{6}\\right)' },
      {
        type: 'note',
        heading: 'Corrected from the printed manual',
        text: 'The manual (p.24) gives the maximum point as $\\left(-1, \\frac{25}{6}\\right)$. It subtracted the $-2(-1)$ term instead of adding it, so the printed value is short by exactly $2 = \\frac{12}{6}$. The correct maximum point is $\\left(-1, \\frac{37}{6}\\right)$. The minimum point $\\left(2, \\frac{5}{3}\\right)$ is printed correctly.',
      },

      {
        type: 'note',
        heading: 'Reading the printed copy',
        text: 'Two typographical slips in the manual\'s Unit Three change no answer. On p.20 (Example 1) the line "$f(1) = 2(-2)^3 + 3(-2)^2 - 12(-2) + 5 = 25$" should be labelled $f(-2)$ — the value $25$ is right. On p.24 (Example 8) the line "At $x = 3$, $\\frac{dy}{dx} = 3(3)^2 - 12 + 12 = 3$" drops a factor of $3$ from the middle term; it should read $3(3)^2 - 12(3) + 12 = 3$.',
      },

      {
        type: 'casestudy',
        title: 'Unit Three Exercises',
        prompt: 'The workbook sets these three problems at the end of Unit Three.',
        tasks: [
          'What is the value of the function $f(x) = (x - 1)(x - 2)^2$ at its maxima?',
          'Find the points of inflexion, if any, on the graph of $y = 3x^5 - 5x^4 + x + 4$.',
          'At what value of $x$ does the function $f(x) = x^{-x}$, $x \\in \\mathbb{R}$, attain a maximum?',
        ],
      },
    ],
  },

  {
    number: '4',
    title: 'Unit Four — Integration',
    sections: [
      {
        type: 'definition',
        heading: '4.1 Introduction',
        text: 'In this unit, familiarity with the basic concepts and techniques of differentiating common functions (including but not limited to polynomials, trigonometric, exponential and natural logarithm functions) is assumed. Integration is another name for anti-derivative or anti-differentiation, which simply means the reverse of differentiation.',
      },

      {
        type: 'text',
        heading: 'Basic concepts',
        text: 'Consider a function $F(x) = 2x^2 + 5x - 7$. We may write its derivative as $f(x)$:',
      },
      {
        type: 'math',
        tex: 'f(x) = \\frac{d}{dx}(F(x)) \\implies f(x) = \\frac{d}{dx}(2x^2 + 5x - 7) = 4x + 5',
      },
      {
        type: 'text',
        text: 'The function $F(x)$ is the antiderivative of $f(x)$. The symbol for integration is $\\int$, and we write $\\int f(x)dx$ to mean the indefinite integral of $f(x)$ with respect to $x$. If the derivative of $F(x)$ is $f(x)$, then an indefinite integral of $f(x)$ with respect to $x$ is $F(x)$.',
      },
      {
        type: 'math',
        tex: '\\text{Symbolically,} \\quad \\frac{d}{dx}(F(x)) = f(x) \\;\\text{ then }\\; \\int f(x)dx = F(x)',
      },
      {
        type: 'math',
        tex: '\\text{For example,} \\quad \\frac{d}{dx}(x^3) = 3x^2 \\;\\text{ therefore }\\; \\int 3x^2 dx = x^3',
      },
      {
        type: 'text',
        text: 'Take note that we said "an" indefinite integral, not "the" indefinite integral. This is because the indefinite integral is not unique. For instance, the derivative of $x^3 + 5$ is also $3x^2$. In fact, for any constant $c$, the derivative of $x^3 + c$ is $3x^2$, so $x^3 + c$ is an indefinite integral of $3x^2$.',
      },
      {
        type: 'math',
        tex: '\\int 3x^2 dx = x^3 + c',
        caption: 'where c is called the constant of integration',
      },

      {
        type: 'text',
        heading: 'Some basic rules of integration',
        text: 'Recall that $\\frac{d}{dx}(k f(x)) = k \\frac{d}{dx}(f(x))$. Similarly, for any constant $k$:',
      },
      {
        type: 'math',
        tex: '\\int (k f(x))dx = k \\int (f(x))dx',
        caption: 'equation (4.1)',
      },
      {
        type: 'math',
        tex: '\\text{For example,} \\quad \\int 8 \\cos xdx = 8 \\int \\cos xdx = 8 \\sin x + c',
      },
      {
        type: 'text',
        text: 'Recall also that $\\frac{d}{dx}(f(x) + g(x)) = \\frac{d}{dx}(f(x)) + \\frac{d}{dx}(g(x))$. Similarly:',
      },
      {
        type: 'math',
        tex: '\\int (f(x) + g(x))dx = \\int f(x)dx + \\int g(x)dx',
        caption: 'equation (4.2)',
      },
      {
        type: 'math',
        tex: '\\text{For example,} \\quad \\int (e^x + 2x)dx = \\int e^x dx + \\int 2xdx = e^x + x^2 + c',
      },
      { type: 'text', text: 'We say that integration is linear.' },

      {
        type: 'text',
        heading: 'Integrating powers of $x$',
        text: 'Recall that $\\frac{d}{dx}(x^n) = n x^{n-1}$, therefore $\\int n x^{n-1} dx = x^n + c$. Similarly, $\\frac{d}{dx}(x^{n+1}) = (n + 1)x^n$, so:',
      },
      { type: 'math', tex: '\\int (n + 1)x^n dx = x^{n+1} + c', caption: 'equation (4.3)' },
      {
        type: 'text',
        text: 'Now observe that $\\int x^n dx = \\int \\left[\\frac{1}{n+1}\\right](n+1)x^n dx$, since $\\frac{1}{n+1}$ and $n+1$ simply cancel to give 1. By taking the constant $\\frac{1}{n+1}$ outside the integral symbol we have:',
      },
      {
        type: 'math',
        tex: '\\int x^n dx = \\frac{1}{n+1} \\int (n + 1)x^n dx',
        caption: 'equation (4.4)',
      },
      { type: 'text', text: 'Thus substituting the right-hand side of (4.3) into (4.4), we obtain:' },
      {
        type: 'math',
        tex: '\\int x^n dx = \\frac{1}{n+1} x^{n+1} + c',
        caption: 'equation (4.5) — holds for all values of n except n = −1',
      },
      {
        type: 'text',
        text: 'When $n = -1$, $\\int x^n dx$ becomes $\\int x^{-1}dx$, which is $\\int \\frac{1}{x} dx$. Since $\\frac{d}{dx}(\\ln x) = \\frac{1}{x}$:',
      },
      { type: 'math', tex: '\\int \\frac{1}{x} dx = \\ln|x| + c' },
      {
        type: 'note',
        text: 'The manual prints this as $\\ln x + c$, without the absolute value. $\\ln x$ is only defined for $x > 0$, while $\\frac{1}{x}$ is defined for every $x \\neq 0$, so the antiderivative is $\\ln|x|$ — which is how the manual itself writes it once it reaches partial fractions in Examples 11 and 12. Write the bars.',
      },

      {
        type: 'text',
        heading: 'Example 1 — Term-by-term integration',
        text: 'Evaluate the indefinite integral $\\int (4 + 5x - 7x^2 + 2 \\cos x)dx$.',
      },
      {
        type: 'math',
        tex: '\\int (4 + 5x - 7x^2 + 2 \\cos x)dx = \\int 4dx + \\int 5xdx - \\int 7x^2dx + \\int 2 \\cos xdx',
      },
      { type: 'math', tex: '= 4x + \\frac{5}{2} x^2 - \\frac{7}{3} x^3 + 2 \\sin x + c' },

      {
        type: 'text',
        heading: 'Example 2 — Constants outside the integral',
        text: 'Evaluate the indefinite integral $\\int \\left(3 \\cos x - \\frac{1}{2} e^x + 10 \\sec x \\tan x\\right)dx$.',
      },
      {
        type: 'math',
        tex: '= 3 \\int \\cos xdx - \\frac{1}{2} \\int e^xdx + 10 \\int \\sec x \\tan xdx',
      },
      { type: 'math', tex: '= 3 \\sin x - \\frac{1}{2} e^x + 10 \\sec x + c' },

      {
        type: 'note',
        heading: 'Method of substitution',
        // The workbook prints this heading bare and goes straight into Example
        // 3; the sentence below is editorial, so it renders as a note rather
        // than passing for the manual's own words.
        text: 'Where the integrand contains a function together with its own derivative, replacing that inner function with a single variable $u$ reduces the integral to a standard form.',
      },
      {
        type: 'text',
        heading: 'Example 3 — Substituting under a root',
        text: 'Find the indefinite integral $\\int \\frac{\\cos x}{\\sqrt{1 + \\sin x}} dx$.',
      },
      {
        type: 'text',
        text: 'Solution: notice that $\\cos x\\,dx$ is the differential of $\\sin x$ and of $1 + \\sin x$. Substitute $u = 1 + \\sin x$, so $du = \\cos x\\,dx$.',
      },
      {
        type: 'math',
        tex: '\\int \\frac{du}{\\sqrt{u}} = \\int u^{-1/2}du = \\frac{u^{1/2}}{1/2} = 2\\sqrt{u} = 2\\sqrt{1 + \\sin x} + c',
      },

      {
        type: 'text',
        heading: 'Example 4 — Substituting a logarithm',
        text: 'Find the indefinite integral $\\int \\frac{dx}{x \\ln x}$.',
      },
      {
        type: 'text',
        text: 'Solution: let $u = \\ln x$, so $du = \\frac{1}{x} dx$. Hence:',
      },
      { type: 'math', tex: '\\int \\frac{du}{u} = \\ln|u| = \\ln|\\ln x| + c' },

      {
        type: 'text',
        heading: 'Integrating composite functions using the chain rule',
        text: 'Examples of composite functions are $\\cos(2x + 1)$, $(3x^2 + 5)^{10}$ and $\\ln(\\sqrt{3x - 1})$. Recall that if $y = f(x)$ and $u = g(x)$, so $y = f(g(x))$, then $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$, and in function notation $\\frac{dy}{dx} = f\'(g(x)) \\cdot g\'(x)$, so $\\frac{d}{dx}(f(g(x))) = f\'(g(x)) \\cdot g\'(x)$. Thus using the chain rule in reverse:',
      },
      {
        type: 'math',
        tex: '\\int f\'(g(x)) \\cdot g\'(x)dx = f(g(x)) + c',
        caption: 'equation (4.6)',
      },
      {
        type: 'text',
        text: 'Consider for instance $\\int 2x \\cos(x^2 + 3)dx$. We may rewrite this as $\\int \\cos(x^2 + 3) \\cdot 2x\\,dx$. Note that $\\cos(x^2 + 3)$ is the composite function and $2x$ is the derivative of $x^2 + 3$. Let $f\'(g(x)) = \\cos(x^2 + 3)$ and $u = x^2 + 3$, then $f\'(g(x)) = f\'(u) = \\cos u$. Hence $f(u) = \\sin u$, and $f(g(x)) = \\sin(x^2 + 3)$.',
      },
      { type: 'math', tex: '\\therefore \\int \\cos(x^2 + 3) \\cdot 2xdx = \\sin(x^2 + 3) + c' },

      {
        type: 'text',
        heading: 'Example 5 — Chain rule in reverse',
        text: 'Find the indefinite integral $\\int 6x(3x^2 - 5)^4dx$.',
      },
      {
        type: 'text',
        text: 'Solution: rewrite as $\\int (3x^2 - 5)^4 \\cdot 6x\\,dx$. Let $f\'(g(x)) = (3x^2 - 5)^4$ and $u = g(x) = 3x^2 - 5$, so $g\'(x) = 6x$. Then $f\'(u) = u^4$, $f(u) = \\frac{u^5}{5}$ and $f(g(x)) = \\frac{(3x^2 - 5)^5}{5}$. Applying $\\int f\'(g(x)) \\cdot g\'(x)dx = f(g(x)) + c$:',
      },
      { type: 'math', tex: '\\int (3x^2 - 5)^4 \\cdot 6xdx = \\frac{(3x^2 - 5)^5}{5} + c' },

      {
        type: 'text',
        heading: 'Example 6 — Recognising the inner derivative',
        text: 'Find the indefinite integral $\\int \\frac{\\sin \\sqrt{x}}{2\\sqrt{x}} dx$.',
      },
      {
        type: 'text',
        text: 'Solution: rewrite the integral as $\\int \\sin \\sqrt{x} \\cdot \\frac{1}{2\\sqrt{x}} dx$. Let $f\'(g(x)) = \\sin \\sqrt{x}$ and $u = g(x) = \\sqrt{x}$, thus $g\'(x) = \\frac{1}{2\\sqrt{x}}$. Then $f\'(u) = \\sin u$, $f(u) = -\\cos u$ and $f(g(x)) = -\\cos \\sqrt{x}$. Applying the same formula:',
      },
      { type: 'math', tex: '\\int \\sin \\sqrt{x} \\cdot \\frac{1}{2\\sqrt{x}} dx = -\\cos(\\sqrt{x}) + c' },
      {
        type: 'note',
        text: 'When in doubt, one can always differentiate the answer immediately to check.',
      },

      {
        type: 'text',
        heading: 'Definite integrals',
        text: 'The definite integral $\\int_a^b f(x)dx$ is a uniquely defined real number depending on $a$, $b$ and $f$. If $F(x)$ is the antiderivative of $f(x)$, then by the Fundamental Theorem of Calculus:',
      },
      {
        type: 'math',
        tex: '\\int_a^b f(x)dx = [F(x)]_a^b = F(b) - F(a)',
        caption: 'which is a real number',
      },

      {
        type: 'text',
        heading: 'Example 7 — Evaluating a definite integral',
        text: 'Evaluate the definite integral $\\int_0^1 (x + 2x^2)^2 dx$.',
      },
      { type: 'text', text: 'Solution: first find the indefinite integral.' },
      {
        type: 'math',
        tex: '\\int (x^2 + 4x^3 + 4x^4)dx = \\frac{1}{3} x^3 + x^4 + \\frac{4}{5} x^5 + c',
      },
      {
        type: 'math',
        tex: '\\int_0^1 (x + 2x^2)^2 dx = \\left[\\frac{1}{3} x^3 + x^4 + \\frac{4}{5} x^5 + c\\right]_0^1',
      },
      {
        type: 'math',
        tex: '= \\left[\\frac{1}{3} + 1 + \\frac{4}{5} + c\\right] - \\left[\\frac{1}{3}(0) + 0 + \\frac{4}{5}(0) + c\\right] = \\frac{32}{15} + c - c = \\frac{32}{15}',
      },
      {
        type: 'note',
        text: 'One may take $c = 0$ from the start, since the constant of integration always cancels in a definite integral.',
      },

      {
        type: 'text',
        heading: 'Substitution for definite integrals',
        text: 'When the variable is changed, the limits change with it — $a$ and $b$ are limits on $x$, so they must be converted to limits on $u$.',
      },
      {
        type: 'math',
        tex: '\\int_a^b f\'(g(x)) \\cdot g\'(x)dx = [f(g(b)) - f(g(a))] = f(d) - f(c) = \\int_c^d f\'(u)du',
        caption: 'where g(a) = c and g(b) = d',
      },
      {
        type: 'note',
        text: 'The manual writes this line with a capital $F$ and drops the prime in the final integrand. It is the same rule either way — with the primed convention of (4.6) above, the antiderivative of $f\'$ is $f$, so the endpoints are $f(d) - f(c)$ and the transformed integral is $\\int_c^d f\'(u)du$. Written the other common way, $\\int_a^b f(g(x))g\'(x)dx = \\int_c^d f(u)du$.',
      },

      {
        type: 'text',
        heading: 'Example 8 — Substitution with changed limits',
        text: 'Evaluate the definite integral $\\int_0^{\\pi/3} \\frac{\\sin x}{\\cos^2 x} dx$.',
      },
      {
        type: 'text',
        text: 'Solution: substitute $u = \\cos x$, so $du = -\\sin x\\,dx$. When $x = 0$, $u = \\cos 0 = 1$; when $x = \\pi/3$, $u = \\cos \\pi/3 = 1/2$.',
      },
      {
        type: 'math',
        tex: '\\int_1^{1/2} -\\frac{du}{u^2} = \\left[\\frac{1}{u}\\right]_1^{1/2} = 2 - 1 = 1',
      },

      {
        type: 'text',
        heading: 'Trigonometric substitutions',
        text: 'Radical expressions like $\\sqrt{a^2 - x^2}$, $\\sqrt{a^2 + x^2}$ and $\\sqrt{x^2 - a^2}$ often appear in integrals. We use the following identities:',
      },
      { type: 'math', tex: '1 - \\sin^2 \\theta = \\cos^2 \\theta', caption: 'equation (4.7)' },
      { type: 'math', tex: '1 + \\tan^2 \\theta = \\sec^2 \\theta', caption: 'equation (4.8)' },
      { type: 'math', tex: '\\sec^2 \\theta - 1 = \\tan^2 \\theta', caption: 'equation (4.9)' },
      {
        type: 'table',
        heading: 'Which substitution to use',
        headers: ['Radical', 'Substitute', 'Result'],
        rows: [
          ['$\\sqrt{a^2 - x^2}$', '$x = a \\sin \\theta$', '$\\sqrt{a^2 - a^2 \\sin^2 \\theta} = a \\cos \\theta$'],
          ['$\\sqrt{a^2 + x^2}$', '$x = a \\tan \\theta$', '$\\sqrt{a^2 + a^2 \\tan^2 \\theta} = a \\sec \\theta$'],
          ['$\\sqrt{x^2 - a^2}$', '$x = a \\sec \\theta$', '$\\sqrt{a^2 \\sec^2 \\theta - a^2} = a \\tan \\theta$'],
        ],
      },

      {
        type: 'text',
        heading: 'Example 9 — Sine substitution',
        text: 'Evaluate the integral $\\int \\frac{1}{\\sqrt{1-x^2}} dx$.',
      },
      {
        type: 'text',
        text: 'Solution: let $x = \\sin \\theta$, then $dx = \\cos \\theta\\, d\\theta$ and $\\theta = \\sin^{-1} x$.',
      },
      {
        type: 'math',
        tex: '\\int \\frac{1}{\\sqrt{1-x^2}} dx = \\int \\frac{\\cos \\theta\\, d\\theta}{\\sqrt{1-\\sin^2 \\theta}} = \\int \\frac{\\cos \\theta\\, d\\theta}{\\cos \\theta} = \\int d\\theta = \\theta + c = \\sin^{-1} x + c',
      },

      {
        type: 'text',
        heading: 'Example 10 — Tangent substitution',
        text: 'Evaluate the integral $\\int \\frac{1}{1+x^2} dx$.',
      },
      {
        type: 'text',
        text: 'Solution: let $x = \\tan \\theta$, then $dx = \\sec^2 \\theta\\, d\\theta$ and $\\theta = \\tan^{-1} x$.',
      },
      {
        type: 'math',
        tex: '\\int \\frac{1}{1+x^2} dx = \\int \\frac{\\sec^2 \\theta}{1+\\tan^2 \\theta} d\\theta = \\int \\frac{\\sec^2 \\theta}{\\sec^2 \\theta} d\\theta = \\int d\\theta = \\theta + c = \\tan^{-1} x + c',
      },

      {
        type: 'text',
        heading: 'Integration by partial fractions',
        text: 'A rational function is $f(x) = \\frac{p(x)}{q(x)}$ where $p$ and $q$ are polynomials, with $p(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_2x^2 + a_1x + a_0$. The degree of $p$, written $\\deg(p)$, is $n$. Suppose $\\deg(p) < \\deg(q)$, then:',
      },
      {
        type: 'math',
        tex: '\\frac{p(x)}{q(x)} = \\frac{p_1(x)}{q_1(x)} + \\frac{p_2(x)}{q_2(x)} + \\dots + \\frac{p_n(x)}{q_n(x)}',
        caption: 'equation (4.10)',
      },

      {
        type: 'text',
        heading: 'Example 11 — Two distinct linear factors',
        text: 'Evaluate $\\int \\frac{7}{2x^2 + 5x - 12} dx$.',
      },
      { type: 'text', text: 'Solution: factorise the denominator, $2x^2 + 5x - 12 = (2x-3)(x+4)$.' },
      {
        type: 'math',
        tex: '\\frac{7}{(2x-3)(x+4)} = \\frac{A}{2x-3} + \\frac{B}{x+4} \\implies A(x+4) + B(2x-3) = 7',
      },
      {
        type: 'math',
        tex: '\\text{Setting } x = -4 \\implies B(-11) = 7 \\implies B = -\\frac{7}{11}',
      },
      {
        type: 'math',
        tex: '\\text{Setting } x = \\tfrac{3}{2} \\implies A\\left(\\tfrac{11}{2}\\right) = 7 \\implies A = \\frac{14}{11}',
      },
      {
        type: 'math',
        tex: '\\int \\frac{7}{2x^2+5x-12} dx = \\frac{14}{11} \\int \\frac{1}{2x-3} dx - \\frac{7}{11} \\int \\frac{1}{x+4} dx',
      },
      {
        type: 'math',
        tex: '= \\frac{7}{11} \\ln|2x-3| - \\frac{7}{11} \\ln|x+4| + C = \\frac{7}{11} \\ln \\left|\\frac{2x-3}{x+4}\\right| + C',
      },

      {
        type: 'text',
        heading: 'Example 12 — Completing a substitution first',
        text: 'Evaluate $\\int \\frac{1}{(x+2)^2-9} dx$.',
      },
      { type: 'text', text: 'Solution: let $u = x + 2$, so $du = dx$.' },
      {
        type: 'math',
        tex: '\\int \\frac{1}{u^2-3^2} du = \\int \\frac{1}{(u-3)(u+3)} du',
      },
      {
        type: 'math',
        tex: '\\frac{1}{(u-3)(u+3)} = \\frac{A}{u-3} + \\frac{B}{u+3} \\implies A(u+3) + B(u-3) = 1',
      },
      { type: 'math', tex: 'A = \\frac{1}{6}, \\qquad B = -\\frac{1}{6}' },
      {
        type: 'math',
        tex: '\\int \\frac{1}{(u-3)(u+3)} du = \\frac{1}{6} \\left[\\ln|u-3| - \\ln|u+3|\\right] = \\frac{1}{6} \\ln \\left|\\frac{u-3}{u+3}\\right|',
      },
      {
        type: 'math',
        tex: '\\text{Substituting back:} \\quad \\frac{1}{6} \\ln \\left|\\frac{x+2-3}{x+2+3}\\right| + c = \\frac{1}{6} \\ln \\left|\\frac{x-1}{x+5}\\right| + c',
      },

      {
        type: 'text',
        heading: 'Integration by parts',
        text: 'From the product rule for differentials, $d(uv) = v\\,du + u\\,dv$, so $u\\,dv = d(uv) - v\\,du$. Integrating both sides:',
      },
      { type: 'math', tex: '\\int u\\,dv = uv - \\int v\\,du' },

      {
        type: 'text',
        heading: 'Example 13 — Parts with a trigonometric factor',
        text: 'Evaluate $\\int x \\cos x\\,dx$.',
      },
      {
        type: 'text',
        text: 'Solution: let $u = x$, $du = dx$, $dv = \\cos x\\,dx$ and $v = \\sin x$.',
      },
      {
        type: 'math',
        tex: '\\int x \\cos xdx = x \\sin x - \\int \\sin xdx = x \\sin x + \\cos x + c',
      },

      {
        type: 'text',
        heading: 'Example 14 — Parts over a definite interval',
        text: 'Evaluate $\\int_0^1 xe^{-x}dx$.',
      },
      {
        type: 'text',
        text: 'Solution: let $u = x$, $du = dx$, $dv = e^{-x}dx$ and $v = -e^{-x}$.',
      },
      {
        type: 'math',
        tex: '\\int_0^1 xe^{-x}dx = \\left[-xe^{-x}\\right]_0^1 - \\int_0^1 -e^{-x}dx = \\left[-xe^{-x} - e^{-x}\\right]_0^1',
      },
      {
        type: 'math',
        tex: '= (-e^{-1} - e^{-1}) - (0 - 1) = -2e^{-1} + 1',
      },

      {
        type: 'casestudy',
        title: 'Unit Four Exercises',
        prompt: 'Evaluate the following integrals.',
        tasks: [
          '$\\int \\sin x \\cos x\\,dx$',
          '$\\int \\cos x\\, e^{\\sin x} dx$',
          '$\\int \\frac{5x^2 + 3x - 2}{x^4 + x^3 - 2x^2} dx$',
        ],
      },
    ],
  },

  {
    number: '5',
    title: 'Unit Five — Application of Integration to Areas and Volumes',
    sections: [
      {
        type: 'definition',
        heading: '5.1 Introduction',
        text: 'Integration is used to calculate areas and volumes.',
      },

      {
        type: 'text',
        heading: '5.2 Area of plane regions',
        text: 'Case 1 — area under a curve, measured against the $x$-axis. If $f(x)$ is continuous and non-negative on $[a, b]$, the area is $A = \\int_a^b f(x)dx$.',
      },

      {
        type: 'text',
        heading: 'Example 1 — Area under a parabola',
        text: 'Find the area in the first quadrant bounded by $f(x) = 4x - x^2$ and the $x$-axis.',
      },
      {
        type: 'math',
        tex: 'f(x) = 0 \\implies 4x - x^2 = 0 \\implies x(4-x) = 0 \\implies x = 0,\\; 4',
      },
      {
        type: 'math',
        tex: 'A = \\int_0^4 (4x - x^2)dx = \\left[2x^2 - \\frac{x^3}{3}\\right]_0^4 = 32 - \\frac{64}{3} = \\frac{32}{3} \\text{ square units}',
      },

      {
        type: 'text',
        heading: 'Case 2 — Area against the $y$-axis',
        text: 'When the region is bounded horizontally, integrate in $y$ instead: $A = \\int_c^d g(y)dy$.',
      },

      {
        type: 'text',
        heading: 'Example 2 — Integrating in $y$',
        text: 'Find the first quadrant area bounded by $y = x^2 + 2$, $y = 4$ and $x = 0$.',
      },
      {
        type: 'text',
        text: 'Solution: here $c = 2$ and $d = 4$, and rearranging gives $x = \\sqrt{y-2}$.',
      },
      {
        type: 'math',
        tex: 'A = \\int_2^4 \\sqrt{y-2}\\,dy = \\left[\\frac{2}{3}(y-2)^{3/2}\\right]_2^4 = \\frac{2}{3}\\left(2^{3/2}\\right) = \\frac{4\\sqrt{2}}{3} \\text{ square units}',
      },

      {
        type: 'text',
        heading: 'Case 3 — Area between two curves',
        text: 'Subtract the lower boundary from the upper one and integrate the absolute difference:',
      },
      {
        type: 'math',
        tex: 'A = \\int_a^b |f(x) - g(x)|dx \\qquad \\text{or} \\qquad A = \\int_c^d |g(y) - h(y)|dy',
      },

      {
        type: 'text',
        heading: 'Example 3 — Between an exponential and a parabola',
        text: 'Find the area enclosed by $y_1 = e^x$, $y_2 = x^2 - 1$, $x = -1$ and $x = 1$.',
      },
      {
        type: 'math',
        tex: 'A = \\int_{-1}^1 (e^x - x^2 + 1)dx = \\left[e^x - \\frac{x^3}{3} + x\\right]_{-1}^1',
      },
      {
        type: 'math',
        tex: '= \\left(e - \\frac{1}{3} + 1\\right) - \\left(e^{-1} + \\frac{1}{3} - 1\\right) = e - e^{-1} + \\frac{4}{3} \\text{ square units}',
      },

      {
        type: 'text',
        heading: 'Example 4 — Two curves meeting in $y$',
        text: 'Find the area enclosed by $x_1 = y^2 - 2$ and $x_2 = y$.',
      },
      {
        type: 'math',
        tex: 'y^2 - 2 = y \\implies (y-2)(y+1) = 0 \\implies y = 2,\\; -1',
      },
      {
        type: 'math',
        tex: 'A = \\int_{-1}^2 |y^2 - y - 2|dy = \\left|\\left[\\frac{y^3}{3} - \\frac{y^2}{2} - 2y\\right]_{-1}^2\\right| = \\frac{9}{2} \\text{ square units}',
      },

      {
        type: 'text',
        heading: 'Example 5 — Two parabolas',
        text: 'Find the area bounded by $y_1 = x^2 + 1$, $y_2 = 4 - x^2$ and $x = \\pm 1$.',
      },
      {
        type: 'math',
        tex: 'A = \\int_{-1}^1 |(x^2 + 1) - (4 - x^2)|dx = \\int_{-1}^1 |2x^2 - 3|dx = \\frac{14}{3} \\text{ square units}',
      },

      {
        type: 'text',
        heading: '5.3 Volume of a solid of revolution',
        text: 'Rotating the curve $y = f(x)$ about the $x$-axis sweeps out a solid whose volume is:',
      },
      { type: 'math', tex: 'V = \\int_a^b \\pi[f(x)]^2dx' },

      {
        type: 'text',
        heading: 'Example 6 — Revolving a cosine curve',
        text: 'Find the volume generated by $y = 5 \\cos 2x$ between $x = 0$ and $x = \\pi/4$, rotated about the $x$-axis.',
      },
      {
        type: 'math',
        tex: 'V = \\int_0^{\\pi/4} 25\\pi \\cos^2 2x\\, dx = \\frac{25\\pi}{2} \\int_0^{\\pi/4} (1 + \\cos 4x)dx',
      },
      {
        type: 'math',
        tex: '= \\frac{25\\pi}{2} \\left[x + \\frac{\\sin 4x}{4}\\right]_0^{\\pi/4} = \\frac{25\\pi^2}{8} \\text{ cubic units}',
      },

      {
        type: 'text',
        heading: 'The disc method',
        text: 'When a region lies between two curves, the solid has a hole through it, and the volume is the difference of two discs:',
      },
      { type: 'math', tex: 'V = \\int_a^b \\pi\\left[f(x)^2 - g(x)^2\\right]dx' },

      {
        type: 'text',
        heading: 'Example 7 — A cone by revolution',
        text: 'Find the volume generated by $y = x$, $y = 0$, $x = 0$ and $x = 4$ about the $x$-axis.',
      },
      {
        type: 'math',
        tex: 'V = \\pi \\int_0^4 x^2dx = \\pi \\left[\\frac{x^3}{3}\\right]_0^4 = \\frac{64\\pi}{3} \\text{ cubic units}',
      },

      {
        type: 'text',
        heading: 'Example 8 — Difference of two discs',
        text: 'Find the volume between $y_1 = \\cos x$ and $y_2 = \\sin x$ for $x \\in [0, \\pi/4]$, about the $x$-axis.',
      },
      {
        type: 'math',
        tex: 'V = \\pi \\int_0^{\\pi/4} (\\cos^2 x - \\sin^2 x)dx = \\pi \\int_0^{\\pi/4} \\cos 2x\\, dx',
      },
      {
        type: 'math',
        tex: '= \\frac{\\pi}{2} \\left[\\sin 2x\\right]_0^{\\pi/4} = \\frac{\\pi}{2} \\text{ cubic units}',
      },

      {
        type: 'text',
        heading: 'The shell method',
        text: 'The alternative is to sum cylindrical shells, integrating in the other variable:',
      },
      { type: 'math', tex: 'V = \\int_{y_1}^{y_2} 2\\pi y\\, l(y)dy' },

      {
        type: 'text',
        heading: 'Example 9 — Shells under a square root',
        text: 'Find the volume generated by $y = \\sqrt{x}$ and $x = 12$ about the $x$-axis.',
      },
      { type: 'text', text: 'Solution: the shell length is $l(y) = 12 - y^2$.' },
      {
        type: 'math',
        tex: 'V = \\int_0^{\\sqrt{12}} 2\\pi y(12 - y^2)dy = 2\\pi \\left[6y^2 - \\frac{1}{4}y^4\\right]_0^{\\sqrt{12}} = 72\\pi \\text{ cubic units}',
      },

      {
        type: 'text',
        heading: 'Example 10 — Shells under a parabola',
        text: 'Find the volume generated by $y = x^2$, $y = 0$, $x = 0$ and $x = 4$ about the $x$-axis.',
      },
      {
        type: 'math',
        tex: 'V = 2\\pi \\int_0^{16} y(4 - \\sqrt{y})dy = 2\\pi \\left[2y^2 - \\frac{2}{5}y^{5/2}\\right]_0^{16} = \\frac{1024\\pi}{5} \\text{ cubic units}',
      },

      {
        type: 'casestudy',
        title: 'Unit Five Exercises',
        prompt: 'The workbook sets these three problems at the end of Unit Five.',
        tasks: [
          'Find the area for $y = \\frac{x^3}{3}$, $x = 0$, $x = 4$.',
          'Find the area between $y = \\cos x$ and $y = \\sin x$ for $x = 0$ to $x = \\pi/2$.',
          'Find the volume outside $y = x^2$ and between $y = 2x-1$ and $y = x+2$, about the $y$-axis.',
        ],
      },
    ],
  },

  {
    number: '6',
    title: 'Tutorial Questions — whole-course revision',
    // Not a workbook unit: the closing question set, spanning units one to
    // five. Deliberately left out of every course's `noteCoverage` — these are
    // practice problems, not teaching material, so they should not mark any
    // outline item as taught.
    sections: [
      {
        type: 'text',
        heading: 'About this set',
        text: 'The workbook closes with twelve tutorial questions drawing on all five units — domain and range from Unit One, differentiation from Unit Two, optimisation from Unit Three, integration from Unit Four, and areas and volumes from Unit Five. They are the best single guide to the shape of the exam.',
      },
      {
        type: 'casestudy',
        title: 'Tutorial Questions',
        prompt: 'The twelve questions set at the end of the workbook.',
        tasks: [
          'Find the domain and range of $f(x) = x$.',
          'Find the domain and range of $f(x) = \\frac{1}{\\sqrt{2x}} + 5$.',
          'Find $\\frac{dy}{dx}$ of: (a) $\\sqrt{x^3}$, $x > 0$; (b) $x^{\\sqrt{2}}$; (c) $\\frac{1}{\\sqrt[5]{x^6}}$, $x \\neq 0$.',
          'Find the derivative of $\\frac{x-1}{x+1}$.',
          'Find the derivative of $\\sin^7 x \\cos x$.',
          'Find $\\frac{dy}{dx}$ if $x = 2 + t^2$ and $y = \\frac{t}{2+t^2}$.',
          'Find the maximum area of a rectangle with perimeter $100$ cm.',
          'Find the least surface area of a cylinder with capacity $4\\,m^3$.',
          'Evaluate $\\int \\frac{\\sin x}{\\sqrt{1 - \\cos x}} dx$.',
          'Evaluate $\\int \\csc^2(3x + 2)dx$.',
          'Find the area between $x = 2y^2$ and $x = 4 + y^2$.',
          'Find the volume generated by $y = x^3$, $x = 2$, $y = 0$ about the $x$-axis.',
        ],
      },
    ],
  },
];
