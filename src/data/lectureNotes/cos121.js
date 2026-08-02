// COS 121 — Problem Solving (Python)
// Lecture notes transcribed from the lecturer's course material. Shared by
// every department catalogue that carries COS 121 (Cybersecurity and Data
// Science both take it) — edit here once rather than per catalogue.

export const cos121LectureNotes = [
  {
    number: '1',
    title: 'Concept of Computing',
    sections: [
      {
        type: 'definition',
        text: 'Computing is the study and use of computer systems to process data, solve problems, and automate tasks. It involves hardware, software, algorithms, and programming to achieve effective and efficient solutions.',
      },
      {
        type: 'bullets',
        heading: 'Core Concepts of Computing',
        items: [
          'Data and information policy processing',
          'Programming',
          'Computer Hardware & Software',
          'Algorithms & Problem Solving',
          'Networking & Communication',
          'Artificial Intelligence (A.I)',
        ],
      },
      {
        type: 'bullets',
        heading: 'Features of Computing',
        items: ['Automation', 'Speed', 'Versatility', 'Connectivity'],
      },
    ],
  },
  {
    number: '2',
    title: 'Problem and Problem Solving',
    sections: [
      {
        type: 'definition',
        text: 'Problem solving is a process of finding solutions to complex challenges. It involves breaking down a problem, analyzing it, and applying systematic methods to find a solution using algorithms and programming techniques.',
      },
      {
        type: 'bullets',
        heading: 'Steps in Solving a Problem',
        items: [
          'Understanding the problem',
          'Break down the problem',
          'Explore possible solutions',
          'Choose the best solution',
          'Implement the best solution',
          'Test and debug',
          'Evaluate the system',
        ],
      },
      {
        type: 'bullets',
        heading: 'Features of Problem Solving',
        items: [
          'Being able to approach a problem (Logical reasoning)',
          'Creativity',
          'Analytical thinking ability',
          'Persistent: easy to refine and optimize questions',
        ],
      },
      {
        type: 'text',
        heading: 'Problem Identification and Types of Problem',
        text: 'A well-identified problem should be:',
      },
      {
        type: 'bullets',
        items: ['Clearly defined', 'Measurable', 'Feasible'],
      },
      {
        type: 'text',
        heading: 'Types of Problem',
        text: 'Problems can be categorized based on complexity and how frequently they occur:',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Routine problem', def: 'They are common and occur frequently in similar conditions. These problems often have pre-defined solutions and can be solved using standard procedures and algorithms. Solutions are standard and do not require creativity.' },
          { term: 'Non-routine problem', def: 'They are complex and do not have straightforward solutions. They require creative thinking, experimentation, and new strategies to solve the problem.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Methods of Solving Computing Problems',
        items: [
          { term: 'Algorithm', def: 'A structured approach to problem solving. A step-by-step procedure or set of rules used to solve a specific problem. Features: There must be inputs. There must be outputs. It must be definite. It is finite, correct, and efficient.' },
          { term: 'Heuristic', def: "An approximate approach. It finds a satisfactory solution in a place where an optimal solution is impracticable. It doesn't guarantee a perfect solution but is aimed at finding a good enough solution quickly. It is applied when you can't get an optimal solution." },
        ],
      },
      {
        type: 'termlist',
        heading: 'Solution Techniques in Problem Solving',
        items: [
          { term: 'Abstraction', def: 'Focuses on relevant details and not irrelevant details. Abstraction can be applied in software development, artificial intelligence, and cybersecurity.' },
          { term: 'Analogy', def: 'Using past experience to solve a problem. Features: Uses past experience; encourages pattern recognition commonly used in machine learning.' },
          { term: 'Brainstorming', def: 'A group or individual problem-solving technique where multiple ideas are generated. Features: Encourages creative thinking; mostly used in business, software development, and research.' },
          { term: 'Trial & Error', def: 'Trying different solutions with the intention of taking the best.' },
          { term: 'Hypothesis Testing', def: 'This involves simulating an assumption and testing it through experiment or observation.' },
          { term: 'Reduction', def: 'Simplifies a complex problem by breaking it down into simpler equivalent problems that are easier to solve. Mostly used in mathematics and computing.' },
          { term: 'Literal Thinking', def: 'Involves applying a logical and direct approach to a problem solution without assumption or abstract interpretation. Features: Avoids assumption and abstract interpretation.' },
          { term: 'Means-end Analysis', def: 'It involves comparing the current state of a problem with a desired goal and determining the best way to close the gap.' },
          { term: 'Root Cause Analysis (RCA)' },
          { term: 'Proof', def: 'The process of logically verifying the correctness of a solution using mathematical or formal proving.' },
          { term: 'Divide and Conquer', def: 'This is where a complex problem is divided into smaller tasks, solved individually, and the solutions are combined.' },
        ],
      },
      {
        type: 'bullets',
        heading: 'General Problem Solving Process',
        items: [
          'Problem definition',
          'Analysis of the problem',
          'Develop an algorithm',
          'Implement the solution',
          'Test and debug',
          'Document and maintain',
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Python Programming',
    sections: [
      {
        type: 'text',
        heading: 'History of Python Programming',
        text: 'Python was created by Guido Van Rossum in the year 1991. It made use of a user-friendly language and is a multipurpose language that is compatible with other programming languages and operating systems like Windows, Linux, and macOS. (Important Note: Python 2.0 - 2000, Python 3.0 - 2008).',
      },
      {
        type: 'definition',
        heading: 'Definition',
        text: 'Python Programming is a script of sequence information and commands evaluated and resolved by an interpreter called a shell. It consists of primitive constructs, syntax, and static semantics.',
      },
      {
        type: 'bullets',
        heading: 'Fundamental Concepts of Python Programming',
        items: ['Variables', 'Data types', 'Operators'],
      },
      {
        type: 'bullets',
        heading: '1. Variables',
        items: [
          "It doesn't start with a digit.",
          "It doesn't start with verb words.",
          'It can only contain letters, digits, and underscores (_).',
          'Can be assigned different values. It allows multiple variables to hold a particular value by using an assignment operator (=). Different values can be assigned to different variables. Variables are locations where data is stored.',
          'Variables in Python are case-sensitive.',
          "You can't use Python reserved words or keywords as a variable (e.g., if, for).",
        ],
      },
      {
        type: 'termlist',
        heading: '2. Data Types',
        items: [
          { term: 'Numeric', def: 'Scalar objects assigned to variables used for mathematical operations.' },
          { term: 'Sequence Type', def: 'Used to store ordered, changeable collections.' },
          { term: 'Boolean' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Numeric Types',
        items: [
          { term: 'Integer (int)', def: 'Whole numbers (negative or positive).' },
          { term: 'Float', def: 'Decimal numbers.' },
          { term: 'Complex' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Sequence Types',
        items: [
          { term: 'String (str)', def: 'Represented by data in a single quote or double quote in the memory.' },
          { term: 'List', def: 'Stores ordered, changeable collections.' },
          { term: 'Tuple', def: 'Ordered but unchangeable.' },
          { term: 'Dictionary (dict)' },
          { term: 'Set', def: "Ordered and mutable collection used for storage of unique elements and can't be accessed by using indexing." },
        ],
      },
      {
        type: 'text',
        heading: '3. Operators',
        text: 'Operators are used to perform mathematical operations or sequence operations on variables and values.',
      },
      {
        type: 'termlist',
        heading: 'Arithmetic Operators',
        items: [
          { term: 'Addition (+)', def: 'a + b' },
          { term: 'Subtraction (-)', def: 'a - b' },
          { term: 'Division (/)', def: 'a / b' },
          { term: 'Multiplication (*)', def: 'a * b' },
          { term: 'Modulus (%)', def: 'a % b' },
          { term: 'Floor Division (//)', def: 'a // b' },
          { term: 'Exponential/Power (**)', def: 'a ** b' },
        ],
      },
      {
        type: 'bullets',
        heading: 'Logical Operators',
        items: ['AND (and, &)', 'OR (or, |)', 'NOT (not, !, ~)'],
      },
      {
        type: 'table',
        heading: 'Truth Table',
        headers: ['A', 'B', 'A and B', 'A or B', 'not A', 'not B'],
        rows: [
          ['F', 'F', 'F', 'F', 'T', 'T'],
          ['F', 'T', 'F', 'T', 'T', 'F'],
          ['T', 'F', 'F', 'T', 'F', 'T'],
          ['T', 'T', 'T', 'T', 'F', 'F'],
        ],
      },
      {
        type: 'table',
        heading: 'Assignment Operators',
        headers: ['Operator', 'Symbol', 'Output'],
        rows: [
          ['=', 'x = 3', 'x = 3'],
          ['+=', 'x += 3', 'x = x + 3'],
          ['-=', 'x -= 3', 'x = x - 3'],
          ['*=', 'x *= 3', 'x = x * 3'],
          ['/=', 'x /= 3', 'x = x / 3'],
          ['//=', 'x //= 3', 'x = x // 3'],
          ['%=', 'x %= 3', 'x = x % 3'],
          ['**=', 'x **= 3', 'x = x ** 3'],
        ],
      },
      {
        type: 'termlist',
        heading: 'Comparison / Relational Operators',
        items: [
          { term: 'Equals to', def: '==' },
          { term: 'Greater than', def: '>' },
          { term: 'Less than', def: '<' },
          { term: 'Greater than or equal', def: '>=' },
          { term: 'Less than or equal', def: '<=' },
        ],
      },
      {
        type: 'text',
        text: '(Note: = is assignment, == is comparison. The answer to a logical/comparison operation is a boolean).',
      },
      {
        type: 'bullets',
        heading: 'Precedence Operation (BEDMAS)',
        items: ['Bracket', 'Exponential', 'Division', 'Multiplication', 'Addition', 'Subtraction'],
      },
    ],
  },
  {
    number: '4',
    title: 'Control Structures',
    sections: [
      {
        type: 'termlist',
        heading: 'Conditional Statements',
        items: [
          { term: 'if', def: 'One condition, one action' },
          { term: 'if else', def: 'One condition, two actions' },
          { term: 'if elif', def: 'Two conditions, two actions' },
          { term: 'if elif else', def: 'Two conditions, three actions' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Loops',
        items: [
          { term: 'The for Loop', def: 'Used for iterating over a sequence.' },
          { term: 'The while Loop', def: 'Repeatedly executes a code block as long as its condition remains true.' },
          { term: 'Nested Loop', def: 'When a loop is inside another loop.' },
        ],
      },
      {
        type: 'code',
        heading: 'The for Loop — Example',
        code: "modulus = ['Algebra', 'Physics', 'Chemistry', 'python']\n\nfor subject in modulus:\n    print(f\"Studying {subject}\")",
      },
    ],
  },
  {
    number: '5',
    title: 'Arrays and Lists',
    sections: [
      {
        type: 'code',
        code: '# Creating a list\nmarks = [75, 88, 62, 95, 50]\n\n# Accessing elements\nprint(marks[0]) # 75 (first element)\nprint(marks[3]) # 95 (fourth element)',
      },
      {
        type: 'text',
        text: 'append is a command used to assign a value or item to the end of the list.',
      },
    ],
  },
  {
    number: '6',
    title: 'Functions and Classes',
    sections: [
      {
        type: 'definition',
        heading: 'Functions',
        text: 'A function is a subprogram or module and a unit of a program. In some programming languages, it is called a procedure. It performs a specific task and is reusable. You can call a function as many times as required.',
      },
      {
        type: 'code',
        heading: 'Defining a Function',
        code: 'def greet(name):\n    "Display a personalized greeting"\n    print(f"Good day {name}")\n\ngreet("Alice") # Output: Good day Alice',
      },
      {
        type: 'termlist',
        heading: 'Scope',
        items: [
          { term: 'Local variable', def: 'A variable that exists within a function.' },
          { term: 'Global variable', def: 'A variable that exists outside functions.' },
        ],
      },
      {
        type: 'text',
        text: 'The scope of a variable determines where in the code it can be accessed (LEGB rules: Local, Enclosing, Global, Built-in).',
      },
      {
        type: 'termlist',
        heading: 'Arguments',
        items: [
          { term: '*args', def: 'Defines undefined positional values in a variable.' },
          { term: '**kwargs', def: 'Defines undefined keyword values in a variable.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Object-Oriented Programming (OOP)',
        text: 'OOP is a programming paradigm that organizes software around objects. An object means instances that bundle together data attributes.',
      },
      {
        type: 'termlist',
        heading: 'Fundamental Principles of OOP',
        items: [
          { term: 'Encapsulation', def: 'Bundling data and methods; private attributes accessed via getter/setter methods.' },
          { term: 'Abstraction', def: 'Exposing only necessary details.' },
          { term: 'Inheritance', def: 'A child class inherits properties from a parent class.' },
          { term: 'Polymorphism', def: 'Different classes implement the same method name differently.' },
        ],
      },
      {
        type: 'table',
        heading: 'Summary of OOP Concepts',
        headers: ['OOP Concept', 'Python Implementation'],
        rows: [
          ['Class', 'Defined with the class keyword. It is a blueprint/template.'],
          ['Object', 'Created by calling the class: Object = ClassName(args)'],
          ['Constructor', '__init__ method - initializes instance attributes.'],
          ['Instance attribute', 'Defined as self.attribute inside a method.'],
          ['Class attribute', 'Defined directly in the class body (shared by all objects).'],
          ['Method', 'Function defined inside a class; first parameter is self.'],
        ],
      },
    ],
  },
  {
    number: '7',
    title: 'Writing Mathematical Formulas in Python',
    sections: [
      {
        type: 'text',
        text: 'To write formulas in Python, they must be written in a straight line format.',
      },
      {
        type: 'table',
        heading: 'Examples',
        headers: ['Rule', 'Example / Formula', 'Python'],
        rows: [
          ['Formula', 'B = nPR / xy²', 'B = (n * P * R) / (x * (y ** 2))'],
          ['Subscripts', 'P₁', 'P1 or P_1'],
          ['Greek letters', 'θ²R / αβ (use their names, e.g., theta, alpha, beta)', '((theta ** 2) * R) / (alpha * beta)'],
          ['Square root', '√x', 'math.sqrt(x)'],
        ],
      },
    ],
  },
  {
    number: '8',
    title: 'Input, Output, and Type-Casting',
    sections: [
      {
        type: 'code',
        heading: 'Input Function',
        code: 'x = input("Enter x: ")',
      },
      {
        type: 'code',
        heading: 'Output Function',
        code: 'print("Box") # Defined string\nprint(f"Value is {box}") # Format printing',
      },
      {
        type: 'text',
        heading: 'Type-Casting',
        text: 'Changing a value from one data type to another.',
      },
      {
        type: 'bullets',
        items: ['int()', 'float()', 'str()'],
      },
    ],
  },
  {
    number: '9',
    title: 'GUI with Tkinter',
    sections: [
      {
        type: 'definition',
        text: 'tkinter is a package used for creating Graphical User Interfaces.',
      },
      {
        type: 'code',
        heading: 'Basic Setup',
        code: 'import tkinter as tk\n\nroot = tk.Tk() # root can be called windows or screen\nroot.geometry("400x350")\nroot.title("Python Class")\n\nlabel1 = tk.Label(root, text="Python Programming")\nlabel1.place(x=100, y=100)\n\nroot.mainloop() # Must be the last line',
      },
      {
        type: 'casestudy',
        title: 'Assignment',
        prompt: 'Create a window, add caption "Arithmetic operation". Include inputs for "First number" and "Second number", a result box, and buttons for Add, Sub, Mul, Div, and Exit.',
      },
    ],
  },
];
