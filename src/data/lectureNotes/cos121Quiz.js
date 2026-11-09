// COS 121 — Practice quiz bank, drawn topic by topic from
// src/data/lectureNotes/cos121.js. One shared bank imported by both
// catalogues; questions follow the notes, not either catalogue outline.
// Every chapter matches a Notes heading. CourseQuiz draws a fresh sample
// and Quiz shuffles options per attempt; no answer depends on position.
// General MCQ practice: the examination format is not yet confirmed.

export const cos121Quiz = [
  {
    "chapter": "Concept of Computing",
    "question": "Which activity best illustrates computing as defined in the notes?",
    "options": [
      "Processing data to solve a problem",
      "Storing papers without processing data",
      "Drawing a case without considering data",
      "Naming components without using a system"
    ],
    "correctIndex": 0,
    "explanation": "Concept of Computing — Definition: Computing uses computer systems to process data, solve problems and automate tasks."
  },
  {
    "chapter": "Concept of Computing",
    "question": "Which feature is illustrated when a system repeats a task automatically?",
    "options": [
      "Programming",
      "Automation",
      "Versatility",
      "Connectivity"
    ],
    "correctIndex": 1,
    "explanation": "Concept of Computing — Features of Computing: Automation is one of the listed features of computing."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "A recurring problem already has a standard procedure. How is it classified?",
    "options": [
      "Hypothesis testing",
      "Means-end analysis",
      "Routine problem",
      "Non-routine problem"
    ],
    "correctIndex": 2,
    "explanation": "Problem and Problem Solving — Types of Problem: Routine problems recur in similar conditions and have predefined solutions."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "An optimal solution is impracticable, so a quick satisfactory one is sought. Which approach fits?",
    "options": [
      "Algorithm",
      "Reduction",
      "Abstraction",
      "Heuristic"
    ],
    "correctIndex": 3,
    "explanation": "Problem and Problem Solving — Methods of Solving Computing Problems: A heuristic aims at a good enough solution quickly without guaranteeing perfection."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "Which property means an algorithm must eventually finish?",
    "options": [
      "It is finite",
      "It has inputs",
      "It has outputs",
      "It is definite"
    ],
    "correctIndex": 0,
    "explanation": "Problem and Problem Solving — Methods of Solving Computing Problems: Finiteness is one of the algorithm features listed in the notes."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "Which technique focuses on relevant details while leaving irrelevant ones aside?",
    "options": [
      "Hypothesis testing",
      "Abstraction",
      "Brainstorming",
      "Trial and error"
    ],
    "correctIndex": 1,
    "explanation": "Problem and Problem Solving — Solution Techniques in Problem Solving: Abstraction focuses on relevant details."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "Which technique solves smaller tasks individually and then combines their solutions?",
    "options": [
      "Hypothesis Testing",
      "Literal Thinking",
      "Divide and Conquer",
      "Means-end Analysis"
    ],
    "correctIndex": 2,
    "explanation": "Problem and Problem Solving — Solution Techniques in Problem Solving: Divide and conquer divides a complex problem, solves the parts and combines the results."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "A team compares its current state with a desired goal to close the gap. Which technique is it using?",
    "options": [
      "Hypothesis Testing",
      "Root Cause Analysis",
      "Divide and Conquer",
      "Means-end Analysis"
    ],
    "correctIndex": 3,
    "explanation": "Problem and Problem Solving — Solution Techniques in Problem Solving: Means-end analysis compares the current state with the desired goal."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "In the general process, what comes immediately after implementing the solution?",
    "options": [
      "Test and debug",
      "Develop an algorithm",
      "Analysis of the problem",
      "Document and maintain"
    ],
    "correctIndex": 0,
    "explanation": "Problem and Problem Solving — General Problem Solving Process: The listed sequence is implementation, test and debug, then document and maintain."
  },
  {
    "chapter": "Problem and Problem Solving",
    "question": "Which set describes a well-identified problem?",
    "options": [
      "Finite, implicit, independent of inputs",
      "Clearly defined, measurable, feasible",
      "Clearly defined, routine, unchangeable",
      "Creative, approximate, unmeasurable"
    ],
    "correctIndex": 1,
    "explanation": "Problem and Problem Solving — Problem Identification and Types of Problem: The notes require clear definition, measurability and feasibility."
  },
  {
    "chapter": "Python Programming",
    "question": "Which year do the notes give for the creation of Python?",
    "options": [
      "2008",
      "1998",
      "1991",
      "2000"
    ],
    "correctIndex": 2,
    "explanation": "Python Programming — History of Python Programming: The history section dates Python's creation by Guido Van Rossum to 1991."
  },
  {
    "chapter": "Python Programming",
    "question": "Which pair represents distinct Python variable names because names are case-sensitive?",
    "options": [
      "score and score",
      "score_1 and score_1",
      "Score and Score",
      "score and Score"
    ],
    "correctIndex": 3,
    "explanation": "Python Programming — 1. Variables: The variable rules state that Python variable names are case-sensitive."
  },
  {
    "chapter": "Python Programming",
    "question": "Which type is used for a decimal number?",
    "options": [
      "Float",
      "Integer",
      "Tuple",
      "String"
    ],
    "correctIndex": 0,
    "explanation": "Python Programming — Numeric Types: The Numeric Types list describes floats as decimal numbers."
  },
  {
    "chapter": "Python Programming",
    "question": "Which collection is described as ordered but unchangeable?",
    "options": [
      "Numeric variable",
      "Tuple",
      "List",
      "String variable"
    ],
    "correctIndex": 1,
    "explanation": "Python Programming — Sequence Types: The Sequence Types section explicitly describes a tuple as ordered but unchangeable."
  },
  {
    "chapter": "Python Programming",
    "question": "What is the result of 17 % 5?",
    "options": [
      "3.4",
      "85",
      "2",
      "3"
    ],
    "correctIndex": 2,
    "explanation": "Python Programming — Arithmetic Operators: The arithmetic table identifies % as modulus; the remainder after dividing 17 by 5 is 2."
  },
  {
    "chapter": "Python Programming",
    "question": "What is the result of 17 // 5?",
    "options": [
      "2",
      "3.4",
      "85",
      "3"
    ],
    "correctIndex": 3,
    "explanation": "Python Programming — Arithmetic Operators: The table identifies // as floor division; 17 divided by 5 has floor 3."
  },
  {
    "chapter": "Python Programming",
    "question": "Starting with x = 4, what value does x += 3 assign to x?",
    "options": [
      "7",
      "1",
      "12",
      "64"
    ],
    "correctIndex": 0,
    "explanation": "Python Programming — Assignment Operators: The assignment table expands x += 3 to x = x + 3."
  },
  {
    "chapter": "Python Programming",
    "question": "When A is false and B is true, what are A and B and A or B, respectively?",
    "options": [
      "False, false",
      "False, true",
      "True, false",
      "True, true"
    ],
    "correctIndex": 1,
    "explanation": "Python Programming — Truth Table: The F,T row of the truth table gives F for and and T for or."
  },
  {
    "chapter": "Python Programming",
    "question": "Which operator compares two values for equality?",
    "options": [
      ">=",
      "<=",
      "==",
      "="
    ],
    "correctIndex": 2,
    "explanation": "Python Programming — Comparison / Relational Operators: The note below the operators distinguishes == for comparison from = for assignment."
  },
  {
    "chapter": "Control Structures",
    "question": "Which loop repeats while its condition remains true?",
    "options": [
      "for loop",
      "nested loop",
      "if else statement",
      "while loop"
    ],
    "correctIndex": 3,
    "explanation": "Control Structures — Loops: The Loops section defines while by continued truth of its condition."
  },
  {
    "chapter": "Control Structures",
    "question": "A loop placed inside another loop is called what?",
    "options": [
      "Nested loop",
      "Sequence loop",
      "Conditional branch",
      "Global function"
    ],
    "correctIndex": 0,
    "explanation": "Control Structures — Loops: The notes define a nested loop as a loop inside another loop."
  },
  {
    "chapter": "Control Structures",
    "question": "In the subject loop, what is the first line printed?",
    "options": [
      "Studying python",
      "Studying Algebra",
      "Studying Physics",
      "Studying Chemistry"
    ],
    "correctIndex": 1,
    "explanation": "Control Structures — The for Loop — Example: The loop visits the list in order, starting with Algebra, and formats Studying before the subject."
  },
  {
    "chapter": "Arrays and Lists",
    "question": "For marks = [75, 88, 62, 95, 50], what does print(marks[3]) print?",
    "options": [
      "88",
      "50",
      "95",
      "62"
    ],
    "correctIndex": 2,
    "explanation": "Arrays and Lists — Creating a list: The listing explicitly shows index 3 selecting the fourth element, 95."
  },
  {
    "chapter": "Arrays and Lists",
    "question": "Where does append place a new item in a list?",
    "options": [
      "At the beginning",
      "Before every item",
      "At a sorted position",
      "At the end"
    ],
    "correctIndex": 3,
    "explanation": "Arrays and Lists — append: The text defines append as adding a value or item to the end."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Why can a function reduce repeated code for the same task?",
    "options": [
      "It is reusable",
      "It is always global",
      "It stores only numbers",
      "It prevents parameters"
    ],
    "correctIndex": 0,
    "explanation": "Functions and Classes — Functions: The Functions definition calls a function a reusable unit performing a specific task."
  },
  {
    "chapter": "Functions and Classes",
    "question": "What does greet(\"Alice\") print in the notes' example?",
    "options": [
      "Good day {name}",
      "Good day Alice",
      "Good day name",
      "Display a personalized greeting"
    ],
    "correctIndex": 1,
    "explanation": "Functions and Classes — Defining a Function: The function formats its name parameter into Good day Alice, as the listing's output comment confirms."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Which variable is described as existing within a function?",
    "options": [
      "Class attribute",
      "Built-in scope",
      "Local variable",
      "Global variable"
    ],
    "correctIndex": 2,
    "explanation": "Functions and Classes — Scope: The Scope list defines a local variable as one that exists within a function."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Which notation accepts unspecified keyword values?",
    "options": [
      "*args",
      "__init__",
      "self.attribute",
      "**kwargs"
    ],
    "correctIndex": 3,
    "explanation": "Functions and Classes — Arguments: The Arguments section distinguishes **kwargs for keyword values from *args for positional values."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Private attributes accessed through getter/setter methods illustrate which principle?",
    "options": [
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "Abstraction"
    ],
    "correctIndex": 0,
    "explanation": "Functions and Classes — Fundamental Principles of OOP: Encapsulation bundles data and methods and uses getter/setter access for private attributes."
  },
  {
    "chapter": "Functions and Classes",
    "question": "A child class gains properties from a parent class. Which principle is illustrated?",
    "options": [
      "Polymorphism",
      "Inheritance",
      "Encapsulation",
      "Abstraction"
    ],
    "correctIndex": 1,
    "explanation": "Functions and Classes — Fundamental Principles of OOP: Inheritance is defined as a child class inheriting properties from a parent."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Different classes implement the same method name differently. Which principle is this?",
    "options": [
      "Inheritance",
      "Abstraction",
      "Polymorphism",
      "Encapsulation"
    ],
    "correctIndex": 2,
    "explanation": "Functions and Classes — Fundamental Principles of OOP: The notes define polymorphism using different implementations of the same method name."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Which method initializes instance attributes?",
    "options": [
      "mainloop",
      "greet",
      "append",
      "__init__"
    ],
    "correctIndex": 3,
    "explanation": "Functions and Classes — Summary of OOP Concepts: The summary table names __init__ as the constructor that initializes instance attributes."
  },
  {
    "chapter": "Functions and Classes",
    "question": "Where is an attribute shared by all objects defined?",
    "options": [
      "In the class body",
      "Inside every local function",
      "In each function argument",
      "Only outside all classes"
    ],
    "correctIndex": 0,
    "explanation": "Functions and Classes — Summary of OOP Concepts: The table says a class attribute is defined directly in the class body and shared by all objects."
  },
  {
    "chapter": "Writing Mathematical Formulas in Python",
    "question": "Which expression matches the notes' formula B = nPR / xy??",
    "options": [
      "B = (n * P * R) / (x + (y ** 2))",
      "B = (n * P * R) / (x * (y ** 2))",
      "B = (n + P + R) / (x * (y ** 2))",
      "B = (n * P * R) / ((x * y) ** 2)"
    ],
    "correctIndex": 1,
    "explanation": "Writing Mathematical Formulas in Python — Examples: The Examples table groups x times y squared as the denominator and writes multiplication explicitly."
  },
  {
    "chapter": "Writing Mathematical Formulas in Python",
    "question": "Which function represents the square root of x in the table?",
    "options": [
      "math.power(x)",
      "math.root2(x)",
      "math.sqrt(x)",
      "math.square(x)"
    ],
    "correctIndex": 2,
    "explanation": "Writing Mathematical Formulas in Python — Examples: The square-root row gives math.sqrt(x)."
  },
  {
    "chapter": "Input, Output, and Type-Casting",
    "question": "Which statement requests a value from the user in the notes?",
    "options": [
      "x = print(\"Enter x: \")",
      "x = str(\"Enter x: \")",
      "x = float(\"Enter x: \")",
      "x = input(\"Enter x: \")"
    ],
    "correctIndex": 3,
    "explanation": "Input, Output, and Type-Casting — Input Function: The Input Function listing uses input with the prompt Enter x."
  },
  {
    "chapter": "Input, Output, and Type-Casting",
    "question": "What does type-casting mean?",
    "options": [
      "Changing a value's data type",
      "Changing a variable's spelling",
      "Changing a loop's stopping rule",
      "Changing a function's location"
    ],
    "correctIndex": 0,
    "explanation": "Input, Output, and Type-Casting — Type-Casting: Type-Casting is defined as changing a value from one data type to another."
  },
  {
    "chapter": "GUI with Tkinter",
    "question": "What is tkinter used to create?",
    "options": [
      "Arithmetic operator precedence",
      "Graphical user interfaces",
      "Relational database schemas",
      "Network communication protocols"
    ],
    "correctIndex": 1,
    "explanation": "GUI with Tkinter — Definition: The opening definition calls tkinter a package for creating graphical user interfaces."
  },
  {
    "chapter": "GUI with Tkinter",
    "question": "Which call sets the window caption in the Tkinter example?",
    "options": [
      "tk.Label(root, text=\"Python Programming\")",
      "label1.place(x=100, y=100)",
      "root.title(\"Python Class\")",
      "root.geometry(\"400x350\")"
    ],
    "correctIndex": 2,
    "explanation": "GUI with Tkinter — Basic Setup: The setup uses root.title for the caption; geometry controls size and place controls position."
  },
  {
    "chapter": "GUI with Tkinter",
    "question": "Which call is placed last in the Tkinter setup?",
    "options": [
      "root.geometry(\"400x350\")",
      "root.title(\"Python Class\")",
      "label1.place(x=100, y=100)",
      "root.mainloop()"
    ],
    "correctIndex": 3,
    "explanation": "GUI with Tkinter — Basic Setup: The listing marks root.mainloop() as the last line."
  }
];
