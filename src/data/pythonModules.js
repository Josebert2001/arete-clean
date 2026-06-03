// All Python learning module content
// Each module: id, number, title, subtitle, theory[], codeExamples[], practiceQuestions[], miniProject, difficulty

export const pythonModules = [
  {
    id: 'py-foundations',
    number: 1,
    title: 'Python Foundations',
    subtitle: 'print(), Variables, Data Types & f-strings',
    difficulty: 1,
    estimatedHours: 3,
    theory: [
      {
        heading: 'What is Python?',
        body: 'Python is a high-level, interpreted programming language created by Guido van Rossum and first released in 1991. It emphasizes code readability and simplicity, using indentation instead of braces to define code blocks. Python is one of the most popular languages in the world, used in web development, data science, AI, and automation.'
      },
      {
        heading: 'Variables and Data Types',
        body: 'A variable is a named container that stores a value. Unlike Java, Python uses dynamic typing — you do not declare the type; Python figures it out automatically. The four core types are: int (whole numbers like 42), float (decimals like 3.14), str (text like "hello"), and bool (True or False). You can check any value\'s type using the built-in type() function.'
      },
      {
        heading: 'The print() Function and f-strings',
        body: 'print() outputs text or variable values to the screen. You can embed variables into a string using f-strings — prefix the string with f and place variables inside curly braces: f"Hello, {name}!". F-strings are the modern, recommended way to format strings in Python 3.6 and above.'
      },
      {
        heading: 'Getting Input from the User',
        body: 'The input() function reads a line of text typed by the user and returns it as a string. If you need a number, you must convert it explicitly using int() or float(). For example: age = int(input("Enter your age: ")) converts the string "21" into the integer 21 so you can do arithmetic with it.'
      }
    ],
    codeExamples: [
      {
        title: 'Variables, types, and print()',
        code: `# Assigning different data types
name = "Josebert"
age = 21
gpa = 4.85
is_student = True

print(name)              # Josebert
print(type(age))         # <class 'int'>
print(type(gpa))         # <class 'float'>
print(type(name))        # <class 'str'>
print(type(is_student))  # <class 'bool'>`,
        explanation: 'Python infers the type automatically. type() is a handy built-in that tells you what kind of data a variable holds.'
      },
      {
        title: 'f-strings and arithmetic operators',
        code: `name = "Amaka"
age = 20
gpa = 4.65

# f-string formatting
print(f"Hello, {name}!")
print(f"{name} is {age} years old with a GPA of {gpa}")

# Basic arithmetic
x = 10
y = 3
print(x + y)   # 13   addition
print(x - y)   # 7    subtraction
print(x * y)   # 30   multiplication
print(x / y)   # 3.333...  true division
print(x // y)  # 3    integer (floor) division
print(x % y)   # 1    modulus (remainder)
print(x ** y)  # 1000 exponentiation`,
        explanation: 'f-strings let you embed any expression directly inside curly braces. The // operator gives the whole-number portion of a division and % gives the remainder.'
      },
      {
        title: 'User input with type conversion',
        code: `name = input("What is your name? ")
age = int(input("How old are you? "))
height = float(input("Your height in metres? "))

print(f"Hello, {name}!")
print(f"In 5 years you will be {age + 5} years old.")
print(f"Your height is {height:.2f} metres.")`,
        explanation: 'input() always returns a string. Wrap it with int() or float() to convert it for calculations. The :.2f format specifier inside an f-string rounds to 2 decimal places.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does the type() function return for the value 3.14?',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'double'>"],
        correctIndex: 1,
        explanation: '3.14 has a decimal point, so Python classifies it as a float. There is no "double" type in Python.'
      },
      {
        question: 'Which operator gives the remainder of a division in Python?',
        options: ['/', '//', '**', '%'],
        correctIndex: 3,
        explanation: '% is the modulus operator. 10 % 3 gives 1 because 10 divided by 3 leaves a remainder of 1.'
      },
      {
        question: 'What does input() always return?',
        options: ['An integer', 'A float', 'A string', 'A boolean'],
        correctIndex: 2,
        explanation: 'input() always returns a str, even if the user types a number. You must convert it with int() or float() if you need arithmetic.'
      },
      {
        question: 'Which of the following is a valid Python f-string?',
        options: ['f"Hello " + name', '"Hello {name}"', 'f"Hello {name}"', '"f Hello {name}"'],
        correctIndex: 2,
        explanation: 'An f-string must have the f prefix immediately before the opening quote, and variables go inside curly braces inside the string.'
      },
      {
        question: 'What is the result of 10 // 3 in Python?',
        options: ['3.333', '1', '3', '0'],
        correctIndex: 2,
        explanation: '// is integer (floor) division. It discards the decimal portion, so 10 // 3 = 3.'
      },
      {
        question: 'Which data type stores True or False in Python?',
        options: ['int', 'str', 'bit', 'bool'],
        correctIndex: 3,
        explanation: 'The bool type holds exactly two values: True or False (capital first letter). Internally, True equals 1 and False equals 0.'
      },
      {
        question: 'What will print(2 ** 8) output?',
        options: ['16', '64', '256', '28'],
        correctIndex: 2,
        explanation: '** is the exponentiation operator. 2 ** 8 means 2 to the power of 8, which equals 256.'
      }
    ],
    playground: `# Python Foundations Playground
name = "Josebert"
age = 21
gpa = 4.85

print(f"Student: {name}")
print(f"Age:     {age}")
print(f"GPA:     {gpa}")

# Arithmetic
score_a = 85
score_b = 92
average = (score_a + score_b) / 2
print(f"Average score: {average}")

# Type checking
print(type(name))
print(type(age))
print(type(gpa))`,
    miniProject: {
      title: 'Personal Profile Card',
      description: 'Build a program that asks the user for their name, age, department, and CGPA. Then print a neatly formatted profile card using f-strings, showing all details plus a message indicating whether they are on the Dean\'s List (CGPA >= 4.5).',
      hints: [
        'Use input() four times to collect the four pieces of information',
        'Convert age with int() and CGPA with float()',
        'Use a conditional f-string or if/else to set the Dean\'s List message',
        'Use f-strings with alignment specifiers like {label:<12} for a tidy layout',
        'Add a border of dashes above and below the card for visual separation'
      ]
    }
  },

  {
    id: 'py-control-flow',
    number: 2,
    title: 'Control Flow',
    subtitle: 'if, elif, else, Comparison & Logical Operators',
    difficulty: 1,
    estimatedHours: 3,
    theory: [
      {
        heading: 'Making Decisions with if/elif/else',
        body: 'Control flow lets a program choose which code to run based on conditions. The if statement evaluates a condition; if it is True, the indented block below runs. elif ("else if") provides additional conditions to check in order. else runs when none of the above conditions were True. Python uses indentation (4 spaces) to define which lines belong to each branch.',
        diagram: 'py-indentation'
      },
      {
        heading: 'Comparison Operators',
        body: 'Comparison operators compare two values and return True or False: == (equal to), != (not equal), > (greater than), < (less than), >= (greater than or equal), <= (less than or equal). Note that == checks equality while = assigns a value — mixing them up is a very common beginner mistake.'
      },
      {
        heading: 'Logical Operators: and, or, not',
        body: 'You can combine boolean expressions with logical operators. "and" returns True only if both sides are True. "or" returns True if at least one side is True. "not" flips True to False and vice versa. Python uses the English words and, or, not rather than symbols like && or ||.'
      },
      {
        heading: 'Truthy and Falsy Values',
        body: 'In Python, every value has an implicit boolean meaning. Falsy values include: 0, 0.0, empty string "", empty list [], None, and False itself. Everything else is truthy. This lets you write clean conditions like "if name:" to check if a string is non-empty, instead of "if name != """:".'
      }
    ],
    codeExamples: [
      {
        title: 'Grade classifier with if/elif/else',
        code: `score = 75

if score >= 70:
    print("Grade: A")
elif score >= 60:
    print("Grade: B")
elif score >= 50:
    print("Grade: C")
elif score >= 45:
    print("Grade: D")
else:
    print("Grade: F")

# Output: Grade: A`,
        explanation: 'Python checks each condition from top to bottom and runs the first matching block. Once a match is found, all remaining elif and else blocks are skipped.'
      },
      {
        title: 'Logical operators in conditions',
        code: `age = 18
has_id = True
is_registered = False

# and: both must be True
if age >= 18 and has_id:
    print("Access granted")

# or: at least one must be True
if age >= 18 or is_registered:
    print("Eligible")

# not: flips the boolean
if not is_registered:
    print("Please register first")`,
        explanation: '"and" requires both conditions True. "or" needs just one. "not" inverts the result. Python uses readable English words instead of symbols.'
      },
      {
        title: 'Truthy and falsy value checks',
        code: `name = ""
score = 0
students = []

# Falsy check — cleaner than name == ""
if not name:
    print("Name is empty!")

if not score:
    print("Score is zero!")

if not students:
    print("No students yet.")

# Truthy check
username = "Josebert"
if username:
    print(f"Welcome, {username}")`,
        explanation: 'Empty strings, 0, and empty lists are falsy in Python. Using "if not x:" or "if x:" is the idiomatic Pythonic way to check for emptiness.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the output of: x = 10; print(x > 5 and x < 20)?',
        options: ['True', 'False', 'Error', '10'],
        correctIndex: 0,
        explanation: 'x > 5 is True and x < 20 is True. True and True evaluates to True.'
      },
      {
        question: 'Which of these values is FALSY in Python?',
        options: ['"hello"', '1', '[]', 'True'],
        correctIndex: 2,
        explanation: 'An empty list [] is falsy. Non-empty strings, non-zero numbers, and True are all truthy.'
      },
      {
        question: 'What does the "not" operator do?',
        options: ['Combines two conditions', 'Returns True only if both are True', 'Flips True to False and False to True', 'Checks if a value is None'],
        correctIndex: 2,
        explanation: '"not" is a unary operator that inverts a boolean. not True gives False, and not False gives True.'
      },
      {
        question: 'What is the difference between = and == in Python?',
        options: ['No difference', '= assigns a value, == compares for equality', '== assigns, = compares', 'Both are for comparison'],
        correctIndex: 1,
        explanation: '= is the assignment operator that stores a value in a variable. == is the equality operator that compares two values and returns True or False.'
      },
      {
        question: 'In an if/elif/else chain, how many blocks can run?',
        options: ['All that match', 'Only the last one', 'At most one', 'Exactly two'],
        correctIndex: 2,
        explanation: 'Python runs the first matching block and skips the rest. At most one block executes — or zero if no condition is met and there is no else.'
      },
      {
        question: 'What does "or" return when both sides are False?',
        options: ['True', 'False', 'None', 'Error'],
        correctIndex: 1,
        explanation: '"or" returns True only when at least one side is True. If both sides are False, the result is False.'
      },
      {
        question: 'Which comparison operator checks "not equal to"?',
        options: ['<>', '!=', '=/=', 'not =='],
        correctIndex: 1,
        explanation: '!= is the not-equal operator in Python 3. The old <> syntax from Python 2 is no longer valid.'
      }
    ],
    playground: `# Control Flow Playground
score = 72

if score >= 70:
    grade = "A"
elif score >= 60:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"

print(f"Score: {score} => Grade: {grade}")

# Logical operators
age = 20
has_ticket = True

if age >= 18 and has_ticket:
    print("Entry allowed")
else:
    print("Entry denied")`,
    miniProject: {
      title: 'University Grade Calculator',
      description: 'Write a program that asks for a student\'s exam score (0-100), validates it is within range, then prints the corresponding letter grade (A: 70+, B: 60-69, C: 50-59, D: 45-49, E: 40-44, F: below 40) along with a short motivational message for each grade.',
      hints: [
        'First check if score < 0 or score > 100 and print an error if so',
        'Use if/elif/else to determine the grade band',
        'Store the grade and message in variables before printing',
        'Use an f-string to display the score, grade, and message together',
        'Test with boundary values: 70, 69, 50, 45, 40, 39'
      ]
    }
  },

  {
    id: 'py-loops',
    number: 3,
    title: 'Loops',
    subtitle: 'for, while, range(), break, continue & enumerate()',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'The for Loop and range()',
        body: 'A for loop iterates over any sequence — a string, list, or range of numbers. range(n) generates numbers from 0 up to but not including n. range(start, stop) gives numbers from start up to stop. range(start, stop, step) also controls the increment. For loops are best when you know in advance how many times to repeat.'
      },
      {
        heading: 'The while Loop',
        body: 'A while loop keeps running as long as its condition is True. It is best when you do not know in advance how many iterations you need — for example, repeating until the user provides valid input. Always ensure the condition will eventually become False; otherwise you get an infinite loop.'
      },
      {
        heading: 'break and continue',
        body: 'break exits the loop immediately, skipping any remaining iterations. continue skips the rest of the current iteration and jumps to the next one. Both work inside for and while loops. Use them sparingly — overuse can make loops hard to follow.'
      },
      {
        heading: 'enumerate() and Nested Loops',
        body: 'enumerate(sequence) yields pairs of (index, value) so you can track position without a manual counter variable. Nested loops are loops inside loops — the inner loop runs completely for each iteration of the outer loop. They are commonly used to process 2D data like tables or grids.'
      }
    ],
    codeExamples: [
      {
        title: 'for loop with range()',
        code: `# Count 1 to 5
for i in range(1, 6):
    print(i)

# Count down from 10 to 1
for i in range(10, 0, -1):
    print(i, end=" ")
print()  # newline after

# Sum of first 10 natural numbers
total = 0
for n in range(1, 11):
    total += n
print(f"Sum 1 to 10: {total}")  # 55`,
        explanation: 'range(1, 6) produces 1, 2, 3, 4, 5. A negative step counts downward. The end=" " argument prints values on the same line separated by spaces.'
      },
      {
        title: 'while loop and input validation',
        code: `# Keep asking until a valid score is entered
score = -1
while score < 0 or score > 100:
    score = int(input("Enter a score (0-100): "))
    if score < 0 or score > 100:
        print("Invalid! Try again.")

print(f"Valid score accepted: {score}")

# Count-controlled while loop
count = 0
while count < 5:
    print(f"Count is {count}")
    count += 1`,
        explanation: 'The while loop validates input by repeating until the condition is met. The count variable must be incremented manually or the loop runs forever.'
      },
      {
        title: 'break, continue, and enumerate()',
        code: `# break — stop when target found
numbers = [4, 7, 2, 9, 1, 5]
for num in numbers:
    if num == 9:
        print("Found 9!")
        break

# continue — skip even numbers
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i, end=" ")  # 1 3 5 7 9
print()

# enumerate — index + value together
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")`,
        explanation: 'break stops the loop entirely when the target is found. continue skips even numbers to print only odds. enumerate() pairs each item with its index — cleaner than a separate counter.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does range(3, 8) produce?',
        options: ['3, 4, 5, 6, 7, 8', '3, 4, 5, 6, 7', '4, 5, 6, 7, 8', '3, 5, 7'],
        correctIndex: 1,
        explanation: 'range(start, stop) includes start but excludes stop. range(3, 8) gives 3, 4, 5, 6, 7.'
      },
      {
        question: 'What does break do inside a loop?',
        options: ['Skips the current iteration', 'Exits the loop immediately', 'Restarts the loop', 'Pauses until input'],
        correctIndex: 1,
        explanation: 'break terminates the loop entirely and execution continues after the loop body. Use continue to skip just one iteration.'
      },
      {
        question: 'What does enumerate(["a", "b", "c"]) yield?',
        options: ['("a", 0), ("b", 1), ("c", 2)', '(0, "a"), (1, "b"), (2, "c")', '[0, 1, 2]', '["a", "b", "c"]'],
        correctIndex: 1,
        explanation: 'enumerate() yields (index, value) tuples, starting at index 0 by default. You can change the start with enumerate(seq, start=1).'
      },
      {
        question: 'Which loop type is best when you do not know the number of iterations in advance?',
        options: ['for', 'while', 'do-while', 'range'],
        correctIndex: 1,
        explanation: 'while loops are best for open-ended repetition where you keep going until a condition changes. for loops are cleaner when you know the count or are iterating a sequence.'
      },
      {
        question: 'What is the output of: for i in range(0, 10, 3): print(i, end=" ")?',
        options: ['0 3 6 9', '0 3 6', '1 4 7', '0 3 6 9 12'],
        correctIndex: 0,
        explanation: 'range(0, 10, 3) starts at 0, adds 3 each step, and stops before 10: 0, 3, 6, 9.'
      },
      {
        question: 'What does continue do in a loop?',
        options: ['Exits the entire loop', 'Skips the rest of the current iteration and goes to the next', 'Repeats the current iteration', 'Does nothing'],
        correctIndex: 1,
        explanation: 'continue jumps back to the loop header, skipping remaining code in the current iteration but keeping the loop running.'
      },
      {
        question: 'How do you iterate over every character in the string "hello" using a for loop?',
        options: ['for i in len("hello"):', 'for ch in "hello":', 'for ch = "hello":', 'while "hello":'],
        correctIndex: 1,
        explanation: 'In Python, strings are iterable sequences of characters. "for ch in string:" gives you one character per iteration directly.'
      }
    ],
    playground: `# Loops Playground
# Multiplication table for 7
print("Multiplication table for 7:")
for i in range(1, 13):
    print(f"7 x {i:2} = {7 * i}")

print()

# Sum 1 to 100 with while
total = 0
n = 1
while n <= 100:
    total += n
    n += 1
print(f"Sum of 1 to 100: {total}")

# enumerate example
names = ["Josebert", "Amaka", "Salome"]
for idx, name in enumerate(names, start=1):
    print(f"{idx}. {name}")`,
    miniProject: {
      title: 'Multiplication Table Generator',
      description: 'Ask the user for a number between 1 and 20. Validate the input with a while loop (keep asking if out of range). Then print the full multiplication table for that number from 1 to 12, formatted neatly. Also print the sum of all results in the table.',
      hints: [
        'Use a while loop to validate the input range before proceeding',
        'Use a for loop with range(1, 13) to generate table rows',
        'Use f-string format specifiers like {i:2} and {result:4} to align columns',
        'Accumulate the sum in a variable inside the loop',
        'Print the total sum after the loop finishes'
      ]
    }
  },

  {
    id: 'py-functions',
    number: 4,
    title: 'Functions',
    subtitle: 'def, Parameters, return, *args/**kwargs & lambda',
    difficulty: 2,
    estimatedHours: 5,
    theory: [
      {
        heading: 'Defining and Calling Functions',
        body: 'A function is a named, reusable block of code. You define it once with the def keyword and call it by name whenever needed. Functions make code shorter, easier to test, and easier to read. A function can accept inputs (parameters) and send back a result with the return statement. If no return is given, the function returns None.'
      },
      {
        heading: 'Default Arguments and *args / **kwargs',
        body: 'Default arguments let you define parameters with fallback values, making them optional in calls. *args collects any number of positional arguments into a tuple, allowing flexible function signatures. **kwargs collects any number of keyword arguments into a dictionary. These tools are widely used in Python libraries to create flexible APIs.'
      },
      {
        heading: 'Variable Scope: Local vs Global',
        body: 'A variable created inside a function is local — it only exists while the function is running and cannot be accessed outside. Variables defined outside all functions are global. Inside a function you can read a global variable, but to modify it you must explicitly use the global keyword. Keeping data local is generally safer and preferred.'
      },
      {
        heading: 'Lambda Functions',
        body: 'A lambda is a small, anonymous function written in a single expression: lambda x: x * 2. Lambdas are useful when you need a short function for a brief purpose — like a sort key — and do not want to write a full def. They can take multiple parameters but can only contain one expression, not full statements.'
      }
    ],
    codeExamples: [
      {
        title: 'Basic functions with parameters and return',
        code: `def greet(name):
    """Return a greeting string for the given name."""
    return f"Hello, {name}!"

def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0

print(greet("Josebert"))   # Hello, Josebert!
print(add(15, 27))          # 42
print(is_even(8))           # True
print(is_even(7))           # False`,
        explanation: 'def names the function and lists parameters. return sends the result back. The triple-quoted string is a docstring — documentation for the function.'
      },
      {
        title: 'Default arguments and *args',
        code: `# Default argument
def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25  (uses default exponent=2)
print(power(2, 10))  # 1024

# *args — accept any number of positional arguments
def total(*numbers):
    result = 0
    for n in numbers:
        result += n
    return result

print(total(1, 2, 3))          # 6
print(total(10, 20, 30, 40))   # 100`,
        explanation: 'Default arguments have a value used when that argument is not passed. *numbers collects however many positional arguments are given into a tuple.'
      },
      {
        title: 'Lambda and higher-order functions',
        code: `# Lambda — inline anonymous function
square = lambda x: x ** 2
print(square(5))   # 25

# Lambda as sort key
students = [
    {"name": "Amaka",    "gpa": 4.65},
    {"name": "Josebert", "gpa": 4.85},
    {"name": "Salome",   "gpa": 4.20},
]
students.sort(key=lambda s: s["gpa"], reverse=True)
for s in students:
    print(f'{s["name"]}: {s["gpa"]}')

# map and filter with lambda
nums = [1, 2, 3, 4, 5, 6]
evens   = list(filter(lambda x: x % 2 == 0, nums))
doubled = list(map(lambda x: x * 2, nums))
print(evens)    # [2, 4, 6]
print(doubled)  # [2, 4, 6, 8, 10, 12]`,
        explanation: 'Lambdas are most useful as short callbacks. filter() keeps elements where the lambda returns True; map() transforms every element.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does a function return if it has no return statement?',
        options: ['0', 'False', 'None', 'An empty string'],
        correctIndex: 2,
        explanation: 'Python functions implicitly return None when there is no return statement or when return is used without a value.'
      },
      {
        question: 'What does *args do in a function definition?',
        options: ['Makes all arguments optional', 'Collects extra positional arguments into a tuple', 'Passes a list to the function', 'Creates keyword arguments'],
        correctIndex: 1,
        explanation: '*args (the asterisk is what matters) packs any extra positional arguments into a tuple. The name args is convention, not required.'
      },
      {
        question: 'What is a lambda function?',
        options: ['A function defined with class', 'A small anonymous function written in one expression', 'A recursive function', 'A function with no parameters'],
        correctIndex: 1,
        explanation: 'lambda parameters: expression creates a small nameless function. It is limited to one expression and is typically used for short callbacks.'
      },
      {
        question: 'What is the output of: f = lambda x, y: x + y; print(f(3, 4))?',
        options: ['34', '7', 'Error', 'None'],
        correctIndex: 1,
        explanation: 'The lambda adds its two arguments. f(3, 4) evaluates 3 + 4 = 7.'
      },
      {
        question: 'What is variable scope?',
        options: ['The size of a variable', 'The type of a variable', 'Where in the program a variable is accessible', 'How fast a variable is accessed'],
        correctIndex: 2,
        explanation: 'Scope defines where a variable can be seen and used. A variable defined inside a function is local and invisible outside it.'
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'func', 'define', 'def'],
        correctIndex: 3,
        explanation: 'def is the keyword. A function definition looks like: def function_name(parameters):'
      },
      {
        question: 'What happens when you call power(3) if power is defined as def power(base, exponent=2)?',
        options: ['Error — exponent is missing', 'Returns 3', 'Returns 9', 'Returns 6'],
        correctIndex: 2,
        explanation: 'exponent defaults to 2 when not provided. So power(3) computes 3 ** 2 = 9.'
      }
    ],
    playground: `# Functions Playground
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

def calculate_average(*scores):
    if not scores:
        return 0
    return sum(scores) / len(scores)

def describe_student(name, **info):
    print(f"Student: {name}")
    for key, value in info.items():
        print(f"  {key}: {value}")

print(greet("Josebert"))
print(greet("Amaka", "Welcome"))
avg = calculate_average(85, 90, 78, 92, 88)
print(f"Average: {avg:.2f}")
describe_student("Salome", department="Cybersecurity", gpa=4.2, year=2)`,
    miniProject: {
      title: 'Math Utility Module',
      description: 'Create a set of utility functions: factorial(n) using recursion, is_prime(n) that returns True or False, celsius_to_fahrenheit(c) and back, and a summary(*numbers) function that returns a dict with min, max, total, and average. Call each from a main block and display the results.',
      hints: [
        'For factorial, the base case is: if n <= 1: return 1',
        'For is_prime, check divisibility from 2 up to int(n**0.5) + 1',
        'Celsius to Fahrenheit formula: F = (C * 9/5) + 32',
        'Use the built-in min(), max(), sum() inside your summary function',
        'Return a dictionary from summary() and print each key-value pair'
      ]
    }
  },

  {
    id: 'py-lists-tuples',
    number: 5,
    title: 'Lists & Tuples',
    subtitle: 'Indexing, Slicing, List Methods & Comprehensions',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Lists: Ordered and Mutable',
        body: 'A list is an ordered, mutable (changeable) sequence of items enclosed in square brackets. Items can be of any type, even mixed. You access items by their index starting at 0, and negative indices count from the end (-1 is the last item). Lists are one of the most used data structures in Python.',
        diagram: 'py-list'
      },
      {
        heading: 'Slicing',
        body: 'Slicing extracts a portion of a list using the syntax list[start:stop:step]. start is inclusive, stop is exclusive. Omitting start defaults to 0; omitting stop defaults to the end. Slices always return a new list and never raise an IndexError, even if indices are out of range.'
      },
      {
        heading: 'Common List Methods',
        body: 'append(item) adds to the end; insert(index, item) adds at a position; pop() removes and returns the last item (or any index); remove(value) removes the first occurrence; sort() sorts in place; reverse() reverses in place; len() returns the count. These are the core operations you will use constantly.'
      },
      {
        heading: 'List Comprehensions and Tuples',
        body: 'A list comprehension builds a new list in one readable line: [expression for item in iterable if condition]. It replaces a for loop that builds a list. Tuples are like lists but immutable — once created, they cannot be changed. Use () instead of []. They are faster and signal "this data should not change".'
      }
    ],
    codeExamples: [
      {
        title: 'List basics: indexing and slicing',
        code: `scores = [85, 92, 78, 95, 88, 70]

# Indexing
print(scores[0])    # 85  — first element
print(scores[-1])   # 70  — last element
print(scores[2])    # 78  — third element

# Slicing [start:stop:step]
print(scores[1:4])   # [92, 78, 95]
print(scores[:3])    # [85, 92, 78]  — first three
print(scores[3:])    # [95, 88, 70]  — from index 3 onward
print(scores[::2])   # [85, 78, 88]  — every other element
print(scores[::-1])  # [70, 88, 95, 78, 92, 85]  — reversed`,
        explanation: 'Negative indices count from the end. Slices always return a new list. [::-1] is the idiomatic Pythonic way to reverse a list.'
      },
      {
        title: 'Essential list methods',
        code: `students = ["Josebert", "Amaka", "Salome"]

students.append("Sammy")        # Add to end
students.insert(1, "Emeka")     # Insert at index 1
print(students)

removed = students.pop()        # Remove and return last
students.remove("Emeka")        # Remove by value
print(students)

nums = [3, 1, 4, 1, 5, 9, 2, 6]
nums.sort()                     # Sort ascending in place
print(nums)
nums.sort(reverse=True)         # Sort descending
print(nums)

print(len(students))            # Count items
print("Amaka" in students)      # Membership test`,
        explanation: 'Most list methods modify the list in place and return None. append and pop operate at the end (fast). insert and remove can operate anywhere.'
      },
      {
        title: 'List comprehensions and tuples',
        code: `# Traditional loop to build a list
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# List comprehension — one line
squares = [n ** 2 for n in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# Comprehension with condition
evens = [n for n in range(1, 21) if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Tuples — immutable
point = (3, 7)
x, y = point       # tuple unpacking
print(f"x={x}, y={y}")
# point[0] = 10   # TypeError — tuples cannot be changed`,
        explanation: 'List comprehensions are concise and Pythonic. Tuples use () and are immutable — ideal for fixed data like coordinates or RGB colors. Tuple unpacking assigns multiple variables at once.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does scores[-1] return for scores = [10, 20, 30, 40]?',
        options: ['10', '30', '40', 'Error'],
        correctIndex: 2,
        explanation: 'Negative indices count from the end. -1 is the last element, which is 40.'
      },
      {
        question: 'What is the difference between a list and a tuple?',
        options: ['Lists use (), tuples use []', 'Lists are mutable; tuples are immutable', 'Tuples can hold more items', 'There is no difference'],
        correctIndex: 1,
        explanation: 'Lists (square brackets) can be changed after creation. Tuples (parentheses) are immutable — you cannot add, remove, or modify their elements.'
      },
      {
        question: 'What does append() do?',
        options: ['Inserts at index 0', 'Adds an item to the end of the list', 'Removes the last item', 'Sorts the list'],
        correctIndex: 1,
        explanation: 'append(item) adds the item to the end of the list. It modifies the list in place and returns None.'
      },
      {
        question: 'What does [x**2 for x in range(4)] produce?',
        options: ['[1, 4, 9, 16]', '[0, 1, 4, 9]', '[0, 2, 4, 6]', '[1, 2, 3, 4]'],
        correctIndex: 1,
        explanation: 'range(4) gives 0, 1, 2, 3. Squaring each: 0, 1, 4, 9. So the result is [0, 1, 4, 9].'
      },
      {
        question: 'What does list.pop() return?',
        options: ['The first element, removing it', 'The last element, removing it', 'The length of the list', 'None'],
        correctIndex: 1,
        explanation: 'pop() with no argument removes and returns the last element. pop(index) removes and returns the element at that index.'
      },
      {
        question: 'What does scores[1:4] return for scores = [10, 20, 30, 40, 50]?',
        options: ['[10, 20, 30]', '[20, 30, 40]', '[20, 30, 40, 50]', '[10, 20, 30, 40]'],
        correctIndex: 1,
        explanation: 'Slicing is start-inclusive, stop-exclusive. [1:4] returns indices 1, 2, 3 which are 20, 30, 40.'
      },
      {
        question: 'Which expression checks if a value exists in a list?',
        options: ['list.find(value)', 'list.exists(value)', 'value in list', 'list.contains(value)'],
        correctIndex: 2,
        explanation: 'The "in" operator is the Pythonic way to test membership. It returns True or False and works on lists, strings, tuples, and more.'
      }
    ],
    playground: `# Lists & Tuples Playground
scores = [85, 92, 78, 95, 88, 70, 66, 91]

print(f"All scores:  {scores}")
print(f"Highest:     {max(scores)}")
print(f"Lowest:      {min(scores)}")
print(f"Average:     {sum(scores)/len(scores):.2f}")
print(f"Sorted:      {sorted(scores)}")

# List comprehension — scores above 80
high_scores = [s for s in scores if s >= 80]
print(f"Above 80:    {high_scores}")

# Tuples
student = ("Josebert", 21, "Cybersecurity")
name, age, dept = student
print(f"{name} — Age {age} — {dept}")`,
    miniProject: {
      title: 'Student Score Analyser',
      description: 'Store 10 exam scores in a list. Using list methods and comprehensions, print: the sorted list, the top 3 scores, the bottom 3, the average, how many are above average, and a new list of letter grades corresponding to each score.',
      hints: [
        'Use sorted() to get a sorted copy without changing the original',
        'Slice the sorted list to get the top and bottom 3',
        'Calculate the average first, then use a list comprehension to count above-average scores',
        'Build the grade list with a list comprehension calling a grade function',
        'Use zip(scores, grades) to print each score alongside its letter grade'
      ]
    }
  },

  {
    id: 'py-dicts-sets',
    number: 6,
    title: 'Dictionaries & Sets',
    subtitle: '.get(), .keys(), .values(), dict comprehensions & set operations',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Dictionaries: Key-Value Stores',
        body: 'A dictionary stores data as key-value pairs enclosed in curly braces: {"name": "Josebert", "age": 21}. Each key must be unique and immutable (strings and numbers are common keys). Dictionaries maintain insertion order in Python 3.7+. They provide very fast lookups by key, making them ideal for representing real-world entities.',
        diagram: 'py-dict'
      },
      {
        heading: 'Accessing and Updating Dictionaries',
        body: 'Access a value with dict[key] — this raises KeyError if the key is missing. The safer .get(key) method returns None (or a default you specify) instead of crashing. Add or update with dict[key] = value. Remove with del dict[key] or dict.pop(key). Use dict.keys(), dict.values(), and dict.items() to iterate.'
      },
      {
        heading: 'Sets: Unique, Unordered Collections',
        body: 'A set is an unordered collection of unique items, also using curly braces but without key-value pairs: {1, 2, 3}. Sets automatically remove duplicates. Use set() to create an empty set (not {} which creates an empty dict). Sets are very fast for membership testing and are perfect for deduplication tasks.'
      },
      {
        heading: 'Set Operations',
        body: 'Sets support mathematical operations: union (|) combines both sets; intersection (&) gives elements in both; difference (-) gives elements in the first but not the second; symmetric difference (^) gives elements in either but not both. These make set operations on data — such as finding students enrolled in two courses — elegant and readable.'
      }
    ],
    codeExamples: [
      {
        title: 'Dictionary creation, access, and update',
        code: `student = {
    "name": "Josebert",
    "matric": "22/CYB/001",
    "gpa": 4.85,
    "department": "Cybersecurity"
}

# Access
print(student["name"])               # Josebert
print(student.get("gpa"))            # 4.85
print(student.get("email", "N/A"))   # N/A (safe default)

# Update and add
student["gpa"] = 4.90
student["year"] = 3
del student["department"]

# Iterate over key-value pairs
for key, value in student.items():
    print(f"  {key}: {value}")`,
        explanation: '.get() is safer than direct bracket access because it returns a default instead of raising KeyError. .items() gives (key, value) pairs for iteration.'
      },
      {
        title: 'Dict comprehensions and nested dicts',
        code: `# Dict comprehension — square of each number
squares = {n: n**2 for n in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Nested dict — students keyed by matric number
students = {
    "22/CYB/001": {"name": "Josebert", "gpa": 4.85},
    "22/CYB/002": {"name": "Amaka",    "gpa": 4.65},
    "22/CYB/003": {"name": "Salome",   "gpa": 4.20},
}

# Access nested value
print(students["22/CYB/001"]["name"])  # Josebert

# Find top student
top = max(students.values(), key=lambda s: s["gpa"])
print(f"Top student: {top['name']} ({top['gpa']})")`,
        explanation: 'Dict comprehensions follow {key_expr: value_expr for item in iterable}. Nested dicts model real-world hierarchical data well.'
      },
      {
        title: 'Sets and set operations',
        code: `cs_students   = {"Alice", "Bob", "Charlie", "Diana"}
math_students = {"Bob", "Diana", "Eve", "Frank"}

# Core set operations
print(cs_students | math_students)   # union — all unique students
print(cs_students & math_students)   # intersection — in both courses
print(cs_students - math_students)   # difference — CS only
print(cs_students ^ math_students)   # symmetric diff — in one but not both

# Membership test (very fast)
print("Alice" in cs_students)  # True

# Deduplication
raw = [1, 2, 2, 3, 3, 3, 4]
unique = sorted(set(raw))
print(unique)  # [1, 2, 3, 4]`,
        explanation: 'Set operations mirror mathematical notation. Converting a list to a set and back is a quick deduplication trick, though it does not preserve order.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does dict.get("key", "default") return if "key" is not in the dictionary?',
        options: ['KeyError', 'None', '"default"', '0'],
        correctIndex: 2,
        explanation: '.get(key, default) returns the specified default value when the key is not found, instead of raising KeyError.'
      },
      {
        question: 'What is the result of {1, 2, 3} & {2, 3, 4}?',
        options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{1, 2, 3, 2, 3, 4}'],
        correctIndex: 1,
        explanation: '& is the intersection operator — it returns only elements that appear in both sets. 2 and 3 appear in both, so the result is {2, 3}.'
      },
      {
        question: 'How do you create an empty set in Python?',
        options: ['{}', 'set()', '[]', 'dict()'],
        correctIndex: 1,
        explanation: '{} creates an empty dictionary, not an empty set. To create an empty set you must use set().'
      },
      {
        question: 'Which method returns all keys of a dictionary?',
        options: ['.items()', '.values()', '.keys()', '.all()'],
        correctIndex: 2,
        explanation: '.keys() returns a view of all dictionary keys. .values() returns values, and .items() returns (key, value) pairs.'
      },
      {
        question: 'Can a set contain duplicate values?',
        options: ['Yes, as many as you like', 'Yes, up to one duplicate per value', 'No, sets only hold unique values', 'Only if they are strings'],
        correctIndex: 2,
        explanation: 'Sets automatically enforce uniqueness. Adding a duplicate element has no effect — the set remains unchanged.'
      },
      {
        question: 'What does {k: v*2 for k, v in {"a": 1, "b": 2}.items()} produce?',
        options: ["{'a': 1, 'b': 2}", "{'a': 2, 'b': 4}", "{'a': 2, 'b': 2}", "{'aa': 1, 'bb': 2}"],
        correctIndex: 1,
        explanation: 'The dict comprehension iterates over items, doubling each value. "a" maps to 1*2=2, "b" maps to 2*2=4.'
      },
      {
        question: 'What is the | operator for sets?',
        options: ['Intersection', 'Difference', 'Union', 'Symmetric difference'],
        correctIndex: 2,
        explanation: '| is the union operator — it returns all elements from both sets combined, with no duplicates. & is intersection, - is difference, ^ is symmetric difference.'
      }
    ],
    playground: `# Dicts & Sets Playground
student = {"name": "Josebert", "gpa": 4.85, "dept": "Cybersecurity"}

print(student.get("name"))
print(student.get("email", "Not provided"))

# Word frequency counter
sentence = "the cat sat on the mat the cat"
words = sentence.split()
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1
print(freq)

# Set operations
set_a = {1, 2, 3, 4, 5}
set_b = {3, 4, 5, 6, 7}
print(f"Union:        {set_a | set_b}")
print(f"Intersection: {set_a & set_b}")
print(f"Difference:   {set_a - set_b}")`,
    miniProject: {
      title: 'Word Frequency Counter',
      description: 'Ask the user to enter a sentence. Build a dictionary mapping each unique word (case-insensitive) to how many times it appears. Print: total unique words, the top 3 most frequent words, a sorted alphabetical list of all words, and a set of words that appear more than once.',
      hints: [
        'Use sentence.lower().split() to normalize and split the input',
        'Use freq.get(word, 0) + 1 to count without KeyError',
        'Sort by frequency with sorted(freq.items(), key=lambda x: x[1], reverse=True)',
        'Slice the sorted list to get the top 3 entries',
        'Build the repeated-words set with a set comprehension: {w for w, c in freq.items() if c > 1}'
      ]
    }
  },

  {
    id: 'py-strings',
    number: 7,
    title: 'String Methods',
    subtitle: 'upper/lower/strip/split/join/replace/find, Slicing & Immutability',
    difficulty: 2,
    estimatedHours: 3,
    theory: [
      {
        heading: 'Strings are Immutable Sequences',
        body: 'A string in Python is an immutable, ordered sequence of characters. Immutable means you cannot change individual characters — trying to do so raises a TypeError. Every string method returns a NEW string; the original is untouched. Because strings are sequences, you can index, slice, and iterate over them exactly like lists.'
      },
      {
        heading: 'Case, Whitespace, and Search Methods',
        body: 'upper() and lower() change case. strip() removes leading and trailing whitespace; lstrip() and rstrip() remove from one side. find(sub) returns the index of the first occurrence or -1 if not found; count(sub) counts non-overlapping occurrences. The "in" operator also works for substring checks. These methods are essential for data cleaning.'
      },
      {
        heading: 'split() and join()',
        body: 'split(delimiter) breaks a string into a list of substrings. With no argument it splits on any whitespace and removes extra spaces. join(iterable) is the inverse: it concatenates an iterable of strings with a separator between each pair. join is much more efficient than repeated concatenation in a loop.'
      },
      {
        heading: 'replace() and f-string Formatting',
        body: 'replace(old, new) returns a new string with all occurrences of old replaced with new. An optional third argument limits the number of replacements. F-strings support format specifiers like {value:.2f} for floats or {value:>10} for right-alignment. These make precise, readable string formatting straightforward.'
      }
    ],
    codeExamples: [
      {
        title: 'Core string methods',
        code: `text = "  Hello, Cybersecurity World!  "

print(text.strip())          # "Hello, Cybersecurity World!"
print(text.strip().upper())  # "HELLO, CYBERSECURITY WORLD!"
print(text.strip().lower())  # "hello, cybersecurity world!"

s = "Python is great. Python is fun."
print(s.find("Python"))      # 0  — index of first occurrence
print(s.count("Python"))     # 2  — number of occurrences
print(s.replace("Python", "Coding"))     # replaces both
print(s.replace("Python", "Coding", 1)) # replaces only first

print(s.startswith("Python"))  # True
print(s.endswith("fun."))      # True`,
        explanation: 'All these methods return new strings. Chaining is possible because each method returns a string you can immediately call another method on.'
      },
      {
        title: 'split(), join(), and string slicing',
        code: `# split — break into a list
csv = "Josebert,Amaka,Salome,Sammy"
names = csv.split(",")
print(names)  # ['Josebert', 'Amaka', 'Salome', 'Sammy']

sentence = "  hello   world  "
words = sentence.split()  # splits on any whitespace
print(words)  # ['hello', 'world']

# join — reassemble
print(" | ".join(names))  # Josebert | Amaka | Salome | Sammy
print(", ".join(words))   # hello, world

# String slicing (same syntax as list slicing)
s = "Cybersecurity"
print(s[0])     # C
print(s[-1])    # y
print(s[0:5])   # Cyber
print(s[::-1])  # ytirucesrebyC  (reversed)`,
        explanation: 'split() is one of the most used methods for parsing text. join() is the efficient way to combine strings — much faster than using + in a loop.'
      },
      {
        title: 'f-string formatting techniques',
        code: `name = "Josebert"
score = 4.8567
rank = 1

# Basic embedding
print(f"Name: {name}, Score: {score}")

# Format specifiers
print(f"Score:  {score:.2f}")   # 4.86  (2 decimal places)
print(f"Score:  {score:.0f}")   # 5     (rounded integer)
print(f"Rank:   {rank:03d}")    # 001   (zero-padded width 3)

# Expressions inside f-strings
print(f"Passes? {score >= 4.0}")

# Aligned table header and row
print(f"{'Name':<12} {'Score':>8}")
print(f"{name:<12} {score:>8.2f}")`,
        explanation: 'Format specifiers after the colon control how values are displayed. < left-aligns, > right-aligns, numbers set width, .2f means 2 decimal places.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does "hello world".split() return?',
        options: ['"hello", "world"', "['hello', 'world']", "('hello', 'world')", "['hello world']"],
        correctIndex: 1,
        explanation: 'split() with no argument splits on whitespace and returns a list. The result is [\'hello\', \'world\'].'
      },
      {
        question: 'What does "Python".find("xyz") return?',
        options: ['None', 'False', '-1', 'Error'],
        correctIndex: 2,
        explanation: 'find() returns the starting index of the substring if found, or -1 if it is not present. This avoids an exception, unlike index().'
      },
      {
        question: 'Why are strings called immutable?',
        options: ['They cannot contain numbers', 'They cannot be stored in variables', 'Their characters cannot be changed after creation', 'They expire after use'],
        correctIndex: 2,
        explanation: 'Strings are immutable — you cannot modify individual characters. All methods return new strings. Trying s[0] = "X" on a string raises TypeError.'
      },
      {
        question: 'What does "-".join(["a", "b", "c"]) produce?',
        options: ['["a", "b", "c"]', '"a-b-c"', '"abc"', '"-a-b-c-"'],
        correctIndex: 1,
        explanation: 'join() concatenates the list elements with the separator string between each pair. "-".join(["a","b","c"]) gives "a-b-c".'
      },
      {
        question: 'What does "  hello  ".strip() return?',
        options: ['"  hello  "', '"hello  "', '"hello"', '"  hello"'],
        correctIndex: 2,
        explanation: 'strip() removes whitespace from BOTH ends of the string. lstrip() removes from the left only; rstrip() from the right only.'
      },
      {
        question: 'What is the f-string syntax to print a float to 2 decimal places?',
        options: ['f"{value, 2f}"', 'f"{value:.2f}"', 'f"{value:2.f}"', 'f"{value(2f)}"'],
        correctIndex: 1,
        explanation: 'Format specs come after a colon inside the braces: {value:.2f}. The . means decimal, 2 is the number of places, f is for float.'
      },
      {
        question: 'What does "abcdef"[2:5] return?',
        options: ['"abc"', '"bcde"', '"cde"', '"bcd"'],
        correctIndex: 2,
        explanation: 'String slicing [start:stop] is start-inclusive, stop-exclusive. [2:5] gives characters at indices 2, 3, 4 which are c, d, e.'
      }
    ],
    playground: `# String Methods Playground
text = "  Python is Amazing and Python is Powerful  "

clean = text.strip()
print(clean)
print(clean.upper())
print(clean.lower())
print(clean.replace("Python", "Coding"))
print(f"Count of 'Python': {clean.count('Python')}")

words = clean.split()
print(f"Word count: {len(words)}")
print(" | ".join(words[:4]))

# f-string alignment
name = "Josebert"
gpa  = 4.857
print(f"{'Student':<12}: {name}")
print(f"{'GPA':<12}: {gpa:.2f}")`,
    miniProject: {
      title: 'Text Analyser',
      description: 'Write a program that accepts a sentence from the user and prints: word count, character count excluding spaces, the sentence in UPPER and lower case, each word reversed individually, whether the sentence is a palindrome (ignoring spaces and case), and the most common character.',
      hints: [
        'Use split() for words and replace(" ", "") for character count without spaces',
        'Reverse each word with word[::-1] inside a list comprehension, then join',
        'For palindrome: strip spaces, lowercase, then compare s == s[::-1]',
        'For most common character, build a frequency dict and use max(freq, key=freq.get)',
        'Wrap the logic in a function that takes the sentence as a parameter'
      ]
    }
  },

  {
    id: 'py-oop-1',
    number: 8,
    title: 'OOP Part 1',
    subtitle: 'class, __init__, self, Attributes & __str__',
    difficulty: 3,
    estimatedHours: 5,
    theory: [
      {
        heading: 'Classes and Objects',
        body: 'Object-Oriented Programming organises code around objects — entities that bundle data (attributes) and behaviour (methods) together. A class is the blueprint; an object is an instance built from that blueprint. You define a class with the class keyword. Each object created from the class is independent and holds its own data.',
        diagram: 'java-class'
      },
      {
        heading: '__init__ and self',
        body: '__init__ is the initialiser method — Python calls it automatically when you create a new object. The first parameter is always self, which refers to the specific object being created or acted on. Inside __init__ you use self.attribute_name = value to attach data to the object. You never pass self explicitly when calling — Python handles it.'
      },
      {
        heading: 'Instance vs Class Attributes',
        body: 'Instance attributes (defined with self.name inside __init__ or other methods) belong to one specific object. Class attributes are defined directly in the class body outside any method and are shared by all instances. Changing a class attribute affects all objects; changing an instance attribute only affects that one object.'
      },
      {
        heading: 'Instance Methods and __str__',
        body: 'Instance methods are functions defined inside a class that always receive self as the first argument. They can read and modify the object\'s attributes. __str__ is a special dunder method — when you pass an object to print() or str(), Python calls __str__ to get a human-readable string representation. Defining it makes debugging and display much easier.'
      }
    ],
    codeExamples: [
      {
        title: 'Defining a class and creating objects',
        code: `class Student:
    # Class attribute — shared by all instances
    university = "University of Uyo"

    def __init__(self, name, matric, gpa):
        # Instance attributes — unique to each object
        self.name = name
        self.matric = matric
        self.gpa = gpa

    def display(self):
        print(f"Name: {self.name}, Matric: {self.matric}, GPA: {self.gpa}")

    def __str__(self):
        return f"Student({self.name}, {self.matric})"

# Creating objects
s1 = Student("Josebert", "22/CYB/001", 4.85)
s2 = Student("Amaka",    "22/CYB/002", 4.65)

s1.display()
s2.display()
print(Student.university)  # shared class attribute
print(s1)                  # calls __str__`,
        explanation: '__init__ runs automatically at creation time. self.attribute binds data to the instance. __str__ controls what print(object) shows.'
      },
      {
        title: 'Methods that read and modify state',
        code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit amount must be positive.")
            return
        self.balance += amount
        self.transactions.append(f"+{amount}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds.")
            return
        self.balance -= amount
        self.transactions.append(f"-{amount}")

    def __str__(self):
        return f"Account({self.owner}, Balance: {self.balance})"

acc = BankAccount("Josebert", 1000)
acc.deposit(500)
acc.withdraw(200)
print(acc)               # Account(Josebert, Balance: 1300)
print(acc.transactions)  # ['+500', '-200']`,
        explanation: 'Methods can read and update instance attributes via self. Validation logic inside methods protects the object\'s state from invalid values.'
      },
      {
        title: 'Class attributes and multiple instances',
        code: `class Counter:
    count = 0  # class attribute — shared

    def __init__(self, name):
        self.name = name        # instance attribute
        Counter.count += 1      # modify class attribute
        self.id = Counter.count # each gets a unique id

    def __str__(self):
        return f"{self.name} (ID: {self.id})"

c1 = Counter("Alpha")
c2 = Counter("Beta")
c3 = Counter("Gamma")

print(c1)             # Alpha (ID: 1)
print(c2)             # Beta (ID: 2)
print(Counter.count)  # 3 — total instances created`,
        explanation: 'All three Counter instances share the class attribute count. Each time __init__ runs, Counter.count grows. Instance ids are captured at creation time.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the purpose of __init__ in a Python class?',
        options: ['To destroy an object', 'To initialise an object when it is created', 'To define class variables', 'To inherit from another class'],
        correctIndex: 1,
        explanation: '__init__ is the initialiser called automatically by Python when you create a new instance. It sets up the object\'s initial state.'
      },
      {
        question: 'What does "self" refer to in a method?',
        options: ['The class itself', 'The specific object the method is called on', 'The parent class', 'The return value'],
        correctIndex: 1,
        explanation: 'self is a reference to the current instance. Every instance method receives it as the first argument so it can access and modify that object\'s data.'
      },
      {
        question: 'What is the difference between a class attribute and an instance attribute?',
        options: ['No difference', 'Class attributes are shared; instance attributes belong to one object', 'Instance attributes are faster', 'Class attributes cannot be changed'],
        correctIndex: 1,
        explanation: 'Class attributes live on the class and are shared by all instances. Instance attributes (set with self.name) are unique to each object.'
      },
      {
        question: 'What does __str__ control?',
        options: ['How the object is stored in memory', 'The string returned when print() is called on the object', 'How the object is deleted', 'The name of the class'],
        correctIndex: 1,
        explanation: '__str__ is called by print() and str() to get a human-readable string for the object. Without it, you see something like <__main__.Student object at 0x...>.'
      },
      {
        question: 'How do you create an instance of a class called Dog?',
        options: ['Dog.new()', 'new Dog()', 'Dog()', 'create Dog()'],
        correctIndex: 2,
        explanation: 'You call the class like a function: Dog(). This triggers __init__ and returns the new object. There is no "new" keyword in Python.'
      },
      {
        question: 'What happens if you define two methods with the same name in a class?',
        options: ['Both run when called', 'The first one runs', 'The second one overrides the first', 'A syntax error occurs'],
        correctIndex: 2,
        explanation: 'Python uses the last definition. Unlike Java, Python does not support method overloading — defining the same name twice simply replaces the first definition.'
      },
      {
        question: 'How do you access an instance attribute "name" on object "s"?',
        options: ['s->name', 's::name', 's.name', 'name(s)'],
        correctIndex: 2,
        explanation: 'Python uses dot notation: s.name. The -> syntax is from C/C++ and :: is from C++/Ruby. Python only uses the dot.'
      }
    ],
    playground: `# OOP Part 1 Playground
class Student:
    university = "University of Uyo"

    def __init__(self, name, matric, gpa):
        self.name   = name
        self.matric = matric
        self.gpa    = gpa

    def is_honours(self):
        return self.gpa >= 4.5

    def __str__(self):
        tag = " (Honours)" if self.is_honours() else ""
        return f"{self.name} | {self.matric} | GPA: {self.gpa}{tag}"

students = [
    Student("Josebert", "22/CYB/001", 4.85),
    Student("Amaka",    "22/CYB/002", 4.65),
    Student("Salome",   "22/CYB/003", 3.90),
]

for s in students:
    print(s)

print(f"University: {Student.university}")`,
    miniProject: {
      title: 'Library Book System',
      description: 'Create a Book class with attributes: title, author, year, is_available (default True), and checked_out_by (default None). Add methods: checkout(borrower_name) that marks the book unavailable (or prints "already checked out"), return_book() that marks it available again, and a __str__ showing all details. Create 5 books and simulate checkouts and returns.',
      hints: [
        'Set is_available=True and checked_out_by=None as defaults in __init__',
        'In checkout(), check is_available first and print a message if False',
        'In return_book(), reset both is_available and checked_out_by',
        'Store all Book objects in a list and loop to display them',
        'Use an f-string in __str__ that shows "Available" or f"Out ({self.checked_out_by})"'
      ]
    }
  },

  {
    id: 'py-oop-2',
    number: 9,
    title: 'OOP Part 2',
    subtitle: 'Inheritance, super(), Polymorphism, @property & @staticmethod',
    difficulty: 3,
    estimatedHours: 6,
    theory: [
      {
        heading: 'Inheritance and super()',
        body: 'Inheritance lets a child class acquire the attributes and methods of a parent class. Use class Child(Parent): to declare it. The child can add new methods or override existing ones. super() calls a method from the parent class — most commonly used in __init__ to run the parent\'s initialisation before adding attributes unique to the child.',
        diagram: 'java-inheritance'
      },
      {
        heading: 'Method Overriding and Polymorphism',
        body: 'Method overriding means a child class redefines a method that exists in the parent. When you call that method on a child object, Python uses the child\'s version. Polymorphism is the ability to call the same method name on different objects and get behaviour appropriate to each object\'s type — this is what makes loops over mixed object types so powerful.'
      },
      {
        heading: '@property Decorator',
        body: 'The @property decorator turns a method into a virtual attribute — you call it like an attribute (no parentheses) but it runs method code underneath. This lets you add validation or computation without changing the calling code. Pair it with @attribute_name.setter to allow controlled assignment.'
      },
      {
        heading: '@staticmethod and @classmethod',
        body: '@staticmethod defines a method that belongs to the class namespace but does not receive self or cls. Use it for utility functions logically related to the class. @classmethod receives cls (the class) as its first argument instead of an instance. It is commonly used as an alternative constructor or to access class-level state.'
      }
    ],
    codeExamples: [
      {
        title: 'Inheritance with super()',
        code: `class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age  = age

    def speak(self):
        return "..."

    def __str__(self):
        return f"{self.__class__.__name__}(name={self.name}, age={self.age})"

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # run Animal's __init__
        self.breed = breed           # add Dog-specific attribute

    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Rex", 3, "Labrador")
cat = Cat("Whiskers", 5)

print(dog)          # Dog(name=Rex, age=3)
print(dog.speak())  # Woof!
print(cat.speak())  # Meow!`,
        explanation: 'super().__init__() runs the parent\'s constructor before the child adds its own attributes. Dog inherits __str__ from Animal without redefining it.'
      },
      {
        title: 'Polymorphism with a shared interface',
        code: `class Shape:
    def area(self):
        raise NotImplementedError("Subclasses must implement area()")

    def describe(self):
        print(f"I am a {self.__class__.__name__} with area {self.area():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width  = width
        self.height = height
    def area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base   = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for shape in shapes:
    shape.describe()  # each calls its own area()`,
        explanation: 'The same describe() method works for all shapes because each class provides its own area() implementation. The loop calls the correct version automatically.'
      },
      {
        title: '@property, @staticmethod, and @classmethod',
        code: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius   # _ signals "private by convention"

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @staticmethod
    def absolute_zero():
        return -273.15

    @classmethod
    def from_fahrenheit(cls, f):
        return cls((f - 32) * 5 / 9)

t = Temperature(100)
print(t.celsius)     # 100
print(t.fahrenheit)  # 212.0

t.celsius = 0        # uses the setter
print(t.fahrenheit)  # 32.0

print(Temperature.absolute_zero())      # -273.15
boiling = Temperature.from_fahrenheit(212)
print(boiling.celsius)                  # 100.0`,
        explanation: '@property makes fahrenheit look like an attribute but computes on-the-fly. The setter validates input. @classmethod creates an alternative constructor. @staticmethod is a plain helper tied to the class by concept, not by data.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does super().__init__() do in a child class?',
        options: ['Creates a new parent object', 'Calls the parent class\'s __init__ method', 'Deletes the parent class', 'Copies all parent methods'],
        correctIndex: 1,
        explanation: 'super() returns a proxy to the parent class. super().__init__() runs the parent\'s initialiser, ensuring inherited attributes are set up properly.'
      },
      {
        question: 'What is polymorphism in Python?',
        options: ['Having multiple classes in one file', 'The ability to call the same method on different objects and get type-appropriate behaviour', 'Inheriting from multiple parents', 'Using decorators'],
        correctIndex: 1,
        explanation: 'Polymorphism means "many forms" — the same interface (method name) works across different types, with each type providing its own implementation.'
      },
      {
        question: 'What does the @property decorator do?',
        options: ['Makes a method private', 'Allows a method to be called like an attribute', 'Prevents the method from being overridden', 'Makes the attribute read-only by default'],
        correctIndex: 1,
        explanation: '@property lets you define getter logic inside a method but access it as if it were a plain attribute, without parentheses.'
      },
      {
        question: 'What is the difference between @staticmethod and @classmethod?',
        options: ['No difference', '@staticmethod receives cls; @classmethod receives self', '@staticmethod receives neither self nor cls; @classmethod receives cls', '@classmethod is faster'],
        correctIndex: 2,
        explanation: '@staticmethod is a plain function scoped to the class — no automatic first argument. @classmethod receives cls (the class) so it can access class-level data or create instances.'
      },
      {
        question: 'In Python inheritance, can a child class override a parent method?',
        options: ['No, inherited methods are final', 'Yes, by defining a method with the same name', 'Only with the @override decorator', 'Only if the parent method is marked as virtual'],
        correctIndex: 1,
        explanation: 'Simply define a method with the same name in the child class. Python will call the child\'s version when invoked on a child instance. No special decorator is required.'
      },
      {
        question: 'What does self.__class__.__name__ return inside a method?',
        options: ['The method name', 'The name of the actual class of the object', 'The module name', 'The parent class name'],
        correctIndex: 1,
        explanation: '__class__ is a reference to the class of the current object. __name__ is the string name. For a Dog instance it returns "Dog", not "Animal".'
      },
      {
        question: 'How do you call a parent class method explicitly inside a child method?',
        options: ['parent.method(self)', 'super().method()', 'base.method()', 'this.super().method()'],
        correctIndex: 1,
        explanation: 'super().method() is the standard Python way. It automatically resolves the Method Resolution Order (MRO) to find the correct parent class.'
      }
    ],
    playground: `# OOP Part 2 Playground
class Vehicle:
    def __init__(self, make, speed_kmh):
        self.make   = make
        self._speed = speed_kmh

    @property
    def speed(self):
        return self._speed

    @speed.setter
    def speed(self, value):
        if value < 0:
            raise ValueError("Speed cannot be negative")
        self._speed = value

    def describe(self):
        print(f"{self.__class__.__name__}: {self.make} at {self.speed} km/h")

class Car(Vehicle):
    def __init__(self, make, speed_kmh, doors):
        super().__init__(make, speed_kmh)
        self.doors = doors

class Truck(Vehicle):
    def __init__(self, make, speed_kmh, payload_tonnes):
        super().__init__(make, speed_kmh)
        self.payload = payload_tonnes

fleet = [Car("Toyota", 120, 4), Truck("DAF", 90, 20), Car("Honda", 110, 2)]
for v in fleet:
    v.describe()`,
    miniProject: {
      title: 'Employee Payroll System',
      description: 'Create a base Employee class with name, employee_id, and base_salary. Create FullTimeEmployee (adds monthly_bonus) and PartTimeEmployee (adds hours_worked and hourly_rate). Override calculate_pay() in each subclass. Add a @property for annual_salary. Include a @staticmethod that returns the current tax rate. Print pay details for a mixed list of employees.',
      hints: [
        'FullTimeEmployee.calculate_pay() returns base_salary + monthly_bonus',
        'PartTimeEmployee.calculate_pay() returns hours_worked * hourly_rate',
        'Define annual_salary as a @property returning calculate_pay() * 12',
        'Make tax_rate() a @staticmethod that returns 0.15',
        'Store a mixed list of Employee objects and call calculate_pay() polymorphically in a loop'
      ]
    }
  },

  {
    id: 'py-file-handling',
    number: 10,
    title: 'File Handling',
    subtitle: 'open(), read/write/append, with statement & os.path',
    difficulty: 3,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Opening Files with open()',
        body: 'The built-in open(filename, mode) function opens a file and returns a file object. The mode controls how the file is accessed: "r" reads (default), "w" writes (creates or overwrites), "a" appends (adds to end), "r+" reads and writes. By default files are opened in text mode; add "b" for binary mode. Always close the file when done.'
      },
      {
        heading: 'Reading Files',
        body: 'read() reads the entire file content as one string. readline() reads one line at a time. readlines() reads all lines into a list. You can also iterate directly over the file object with a for loop — each iteration gives one line including the newline character. strip() is commonly used to remove trailing newlines.'
      },
      {
        heading: 'The with Statement (Context Manager)',
        body: 'The with statement is the recommended way to work with files. It automatically closes the file when the block exits, even if an exception occurs. This prevents resource leaks. The syntax is: with open(filename, mode) as f: — inside the block, f is your file object. No need to call f.close() explicitly.'
      },
      {
        heading: 'Writing and os.path Basics',
        body: 'write(string) writes text to the file. writelines(list) writes a list of strings. Neither adds a newline automatically — you must include "\\n" yourself. The os module provides path utilities: os.path.exists(path) checks if a file exists, os.path.join() builds paths safely across operating systems, and os.path.getsize() returns the file size in bytes.'
      }
    ],
    codeExamples: [
      {
        title: 'Writing and reading with the with statement',
        code: `# Writing a file
with open("students.txt", "w") as f:
    f.write("Josebert,22/CYB/001,4.85\\n")
    f.write("Amaka,22/CYB/002,4.65\\n")
    f.write("Salome,22/CYB/003,4.20\\n")

print("File written!")

# Reading the entire file
with open("students.txt", "r") as f:
    content = f.read()
print(content)

# Reading line by line
with open("students.txt", "r") as f:
    for line in f:
        parts = line.strip().split(",")
        print(f"Name: {parts[0]}, GPA: {parts[2]}")`,
        explanation: 'The with block ensures the file is closed even if an error occurs. Mode "w" creates or overwrites. Reading line by line is memory-efficient for large files.'
      },
      {
        title: 'Appending and readlines()',
        code: `# Append — adds to existing file without overwriting
with open("students.txt", "a") as f:
    f.write("Sammy,22/CYB/004,3.95\\n")

# Read all lines into a list
with open("students.txt", "r") as f:
    lines = f.readlines()

print(f"Total students: {len(lines)}")
for i, line in enumerate(lines, start=1):
    print(f"{i}. {line.strip()}")`,
        explanation: 'Mode "a" opens for appending — the file pointer starts at the end. readlines() returns a list of strings, each ending with \\n, which strip() removes.'
      },
      {
        title: 'os.path utilities',
        code: `import os

filename = "students.txt"

if os.path.exists(filename):
    size = os.path.getsize(filename)
    print(f"{filename} exists ({size} bytes)")
else:
    print(f"{filename} does not exist")

# Build paths safely across operating systems
folder = "data"
path = os.path.join(folder, "records", "students.txt")
print(path)  # data/records/students.txt on Unix

# List .txt files in current directory
txt_files = [f for f in os.listdir(".") if f.endswith(".txt")]
print(txt_files)`,
        explanation: 'os.path.exists prevents errors from trying to open non-existent files. os.path.join builds cross-platform paths safely — never concatenate paths with the + operator.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does open("data.txt", "w") do if data.txt already exists?',
        options: ['Appends to it', 'Raises an error', 'Overwrites it, starting empty', 'Opens it read-only'],
        correctIndex: 2,
        explanation: 'Mode "w" creates the file if it does not exist, or truncates (empties) it if it does. Use "a" to append without overwriting.'
      },
      {
        question: 'What is the main advantage of using "with open()" over just "open()"?',
        options: ['It is faster', 'It automatically closes the file when the block exits', 'It supports more modes', 'It allows reading and writing simultaneously'],
        correctIndex: 1,
        explanation: 'The with statement is a context manager that guarantees the file is closed when the block ends, even if an exception is raised — preventing resource leaks.'
      },
      {
        question: 'What does f.readlines() return?',
        options: ['A single string with all content', 'A list of all lines as strings', 'One line at a time', 'The number of lines'],
        correctIndex: 1,
        explanation: 'readlines() returns a list where each element is one line from the file, including the \\n newline character at the end of each line.'
      },
      {
        question: 'How do you write a newline when writing to a text file?',
        options: ['f.newline()', 'f.write(endl)', 'f.write("\\n")', 'The file adds it automatically'],
        correctIndex: 2,
        explanation: 'Python\'s write() does not add newlines automatically. You must include "\\n" in your string explicitly to create line breaks in the file.'
      },
      {
        question: 'What does os.path.exists("file.txt") return?',
        options: ['The file size', 'True or False', 'The file contents', 'The file path'],
        correctIndex: 1,
        explanation: 'os.path.exists() returns True if the path points to an existing file or directory, and False otherwise.'
      },
      {
        question: 'Which mode opens a file for reading AND writing without truncating it?',
        options: ['"rw"', '"w"', '"r+"', '"wr"'],
        correctIndex: 2,
        explanation: '"r+" opens for both reading and writing with the file pointer at the start, without truncating. "a+" opens for reading and appending.'
      },
      {
        question: 'What is the correct way to iterate over every line in a file object f?',
        options: ['for line in f.read():', 'while f.read():', 'for line in f:', 'foreach line in f:'],
        correctIndex: 2,
        explanation: 'File objects are iterable — "for line in f:" is the cleanest, most memory-efficient way to read a file line by line.'
      }
    ],
    playground: `# File Handling Playground
import os

filename = "demo_output.txt"

# Write some data
with open(filename, "w") as f:
    for i in range(1, 6):
        f.write(f"Line {i}: Student {i} recorded.\\n")

print(f"Written to {filename}")
print(f"File size: {os.path.getsize(filename)} bytes")

# Read it back
with open(filename, "r") as f:
    lines = f.readlines()

print(f"Lines read: {len(lines)}")
for line in lines:
    print(line.strip())

# Append one more line
with open(filename, "a") as f:
    f.write("Line 6: Appended entry.\\n")

print("Append done.")`,
    miniProject: {
      title: 'Student Records File Manager',
      description: 'Build a console app that: (1) saves student records (name, matric, GPA) to a CSV-style text file, (2) reads them all back and displays them in a formatted table, (3) searches by name and prints the matching record, and (4) calculates and displays the class average GPA from the file. Handle the case where the file does not exist yet.',
      hints: [
        'Use os.path.exists() before reading so the app does not crash on first run',
        'Format each line as "name,matric,gpa\\n" for easy parsing',
        'On read, split each line by comma and convert GPA with float()',
        'For the table display, use f-string alignment: {name:<20}{matric:<15}{gpa:.2f}',
        'Accumulate GPAs in a list, then compute average with sum(gpas)/len(gpas)'
      ]
    }
  },

  {
    id: 'py-exceptions',
    number: 11,
    title: 'Exception Handling',
    subtitle: 'try/except/else/finally, raise & Custom Exceptions',
    difficulty: 3,
    estimatedHours: 4,
    theory: [
      {
        heading: 'What is an Exception?',
        body: 'An exception is an error that occurs during program execution, disrupting the normal flow. Common examples: ValueError (wrong value type, like int("abc")), TypeError (wrong type for an operation), ZeroDivisionError (dividing by zero), FileNotFoundError (opening a file that does not exist), and IndexError (accessing a list index out of range). Unhandled exceptions crash the program with a traceback.'
      },
      {
        heading: 'try / except / else / finally',
        body: 'Wrap risky code in a try block. except catches specific exceptions and provides a recovery path — always catch the most specific exception you can. The else block runs only if no exception was raised in try, which is useful for code that should only run on success. finally always runs regardless of whether an exception occurred, making it perfect for cleanup.'
      },
      {
        heading: 'Raising Exceptions with raise',
        body: 'You can raise an exception yourself with the raise keyword to signal that something has gone wrong according to your business logic, even when Python itself would not raise one. raise ValueError("Age cannot be negative") gives the caller a meaningful error. You can also re-raise a caught exception inside an except block with a bare raise.'
      },
      {
        heading: 'Custom Exception Classes',
        body: 'Create your own exception types by inheriting from Exception or a more specific built-in. Custom exceptions make your error handling expressive and domain-specific: InsufficientFundsError is clearer than a generic Exception. You can add extra attributes to carry context, and callers can catch just your exception type without accidentally catching unrelated errors.'
      }
    ],
    codeExamples: [
      {
        title: 'try/except with multiple exception types',
        code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")
        return None
    except TypeError:
        print("Error: Both arguments must be numbers.")
        return None
    else:
        print(f"{a} / {b} = {result}")
        return result
    finally:
        print("safe_divide() finished.\\n")

safe_divide(10, 2)    # prints result then "finished"
safe_divide(10, 0)    # ZeroDivisionError then "finished"
safe_divide(10, "x")  # TypeError then "finished"`,
        explanation: 'Each except clause handles a specific exception type. else only runs when no exception occurred. finally always runs — even when an exception was caught.'
      },
      {
        title: 'Validation with raise and except',
        code: `while True:
    try:
        age = int(input("Enter your age: "))
        if age < 0 or age > 120:
            raise ValueError(f"Age {age} is not realistic.")
        break  # exit loop on valid input
    except ValueError as e:
        print(f"Invalid input: {e}. Try again.")

print(f"Age accepted: {age}")`,
        explanation: '"as e" captures the exception object so you can print its message. raise ValueError inside the try is caught by the same except — custom validation fits naturally into this pattern.'
      },
      {
        title: 'Custom exception classes',
        code: `class InsufficientFundsError(Exception):
    def __init__(self, amount, balance):
        self.amount  = amount
        self.balance = balance
        super().__init__(
            f"Cannot withdraw {amount:.2f}. Balance is only {balance:.2f}."
        )

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner   = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.balance:
            raise InsufficientFundsError(amount, self.balance)
        self.balance -= amount

acc = BankAccount("Josebert", 500)
try:
    acc.withdraw(800)
except InsufficientFundsError as e:
    print(f"Bank error: {e}")
except ValueError as e:
    print(f"Value error: {e}")`,
        explanation: 'A custom exception carries extra context (amount, balance) and inherits the standard Exception interface. Callers can catch it by name for precise, readable error handling.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What exception is raised by int("hello")?',
        options: ['TypeError', 'ValueError', 'AttributeError', 'NameError'],
        correctIndex: 1,
        explanation: 'int() raises ValueError when the string cannot be converted to an integer because the value is inappropriate, even though the type (str) is technically acceptable.'
      },
      {
        question: 'When does the else block in a try/except run?',
        options: ['Always', 'Only when an exception was raised', 'Only when NO exception was raised in try', 'After finally'],
        correctIndex: 2,
        explanation: 'The else block runs only when the try block completed without raising any exception. It is a clean way to write "success-only" code.'
      },
      {
        question: 'What does the finally block guarantee?',
        options: ['The code never raises an exception', 'It runs only if an exception occurs', 'It always runs, exception or not', 'It catches all exceptions'],
        correctIndex: 2,
        explanation: 'finally is guaranteed to execute whether or not an exception occurred, and even if a return statement is hit. Use it for cleanup that must happen regardless.'
      },
      {
        question: 'How do you create a custom exception class in Python?',
        options: ['class MyError(Error):', 'class MyError(Exception):', 'def MyError(Exception):', 'exception MyError:'],
        correctIndex: 1,
        explanation: 'Custom exceptions inherit from Exception (or a more specific built-in like ValueError). This gives them all standard exception behaviour.'
      },
      {
        question: 'What does "except Exception as e" do?',
        options: ['Catches only ValueError', 'Ignores all exceptions', 'Catches any exception and binds it to the variable e', 'Creates a new exception'],
        correctIndex: 2,
        explanation: 'Exception is the base class for almost all built-in exceptions. "as e" binds the caught exception to variable e so you can inspect its message.'
      },
      {
        question: 'What exception is raised when you access list[10] on a 5-element list?',
        options: ['ValueError', 'KeyError', 'IndexError', 'OutOfRangeError'],
        correctIndex: 2,
        explanation: 'IndexError is raised when a sequence index is out of range. KeyError is for missing dictionary keys. ValueError is for wrong values of the right type.'
      },
      {
        question: 'What does a bare "raise" (with no argument) do inside an except block?',
        options: ['Creates a new exception', 'Re-raises the currently caught exception', 'Exits the function', 'Does nothing'],
        correctIndex: 1,
        explanation: 'A bare raise re-raises the exception that was just caught, passing it up the call stack. Useful when you want to log or partially handle an error but still propagate it.'
      }
    ],
    playground: `# Exception Handling Playground
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero!")
        return None
    except TypeError as e:
        print(f"Type error: {e}")
        return None
    else:
        print(f"Result: {result:.4f}")
        return result
    finally:
        print("Operation complete.\\n")

divide(10, 3)
divide(10, 0)
divide(10, "two")

# Validate input
def parse_score(s):
    score = int(s)  # may raise ValueError
    if not (0 <= score <= 100):
        raise ValueError(f"Score {score} is out of range 0-100")
    return score

for test in ["85", "abc", "150", "72"]:
    try:
        print(f"Parsed: {parse_score(test)}")
    except ValueError as e:
        print(f"Invalid: {e}")`,
    miniProject: {
      title: 'Robust Calculator',
      description: 'Build a calculator that continuously asks for two numbers and an operation (+, -, *, /). Handle: non-numeric input (ValueError), division by zero (ZeroDivisionError), and unsupported operators with a custom UnsupportedOperationError. Print results clearly and loop until the user types "quit". Use finally to always print "Ready for next input."',
      hints: [
        'Define class UnsupportedOperationError(Exception) at the top of the file',
        'Use a while True loop broken only when user types "quit"',
        'Wrap each calculation in try/except with the three specific exception types',
        'Use float() to parse numbers so both integers and decimals work',
        'Put "Ready for next input." in the finally block so it always shows'
      ]
    }
  },

  {
    id: 'py-modules',
    number: 12,
    title: 'Modules & the Standard Library',
    subtitle: 'import, from...import, as, os, math, random, datetime & pip',
    difficulty: 2,
    estimatedHours: 3,
    theory: [
      {
        heading: 'What is a Module?',
        body: 'A module is a file containing Python code — functions, classes, and variables — that can be reused in other programs. Python comes with a large standard library of built-in modules (os, math, random, datetime, json, etc.) that you can use without installing anything. You can also create your own modules by saving Python code in a .py file and importing it.'
      },
      {
        heading: 'import, from...import, and as',
        body: 'import module_name loads the whole module; you access its contents with module_name.function(). from module_name import function imports just that function directly into the current namespace. import module_name as alias gives the module a shorter local name. Circular imports — where two modules import each other — are a common pitfall to avoid.'
      },
      {
        heading: 'Key Standard Library Modules',
        body: 'os gives access to the operating system: file paths, environment variables, directory listing. math provides mathematical functions: sqrt, floor, ceil, pi, e, log. random generates pseudo-random data: random(), randint(), choice(), shuffle(). datetime handles dates and times: getting today\'s date, formatting, and arithmetic with timedelta.'
      },
      {
        heading: 'What is pip?',
        body: 'pip is Python\'s package manager — a command-line tool for installing third-party libraries not included in the standard library. You run it in your terminal: pip install requests installs the popular HTTP library. Installed packages are stored in your Python environment and can then be imported in your code. pip install -r requirements.txt installs all packages listed in a requirements file.'
      }
    ],
    codeExamples: [
      {
        title: 'Importing and using math and os',
        code: `import math
import os

# math module
print(math.pi)             # 3.141592653589793
print(math.sqrt(144))      # 12.0
print(math.floor(3.9))     # 3
print(math.ceil(3.1))      # 4
print(math.log(100, 10))   # 2.0  (log base 10 of 100)

# os module
print(os.getcwd())         # current working directory
print(os.path.exists("students.txt"))  # True or False
py_files = [f for f in os.listdir(".") if f.endswith(".py")]
print(py_files)`,
        explanation: 'import gives you the full module under its name. You must prefix every call with math. or os. Use "from math import sqrt" if you prefer calling just "sqrt()".'
      },
      {
        title: 'random, datetime, and aliased imports',
        code: `import random
from datetime import datetime, date, timedelta
import math as m

# random
print(random.randint(1, 100))          # random int 1-100
print(random.random())                 # float 0.0-1.0
print(random.choice(["A", "B", "C"])) # pick one randomly

items = [1, 2, 3, 4, 5]
random.shuffle(items)
print(items)  # shuffled in place

sample = random.sample(range(1, 50), 6)  # 6 unique numbers
print(sorted(sample))

# datetime
today = date.today()
print(today)                          # e.g. 2026-06-01
now = datetime.now()
print(now.strftime("%d/%m/%Y %H:%M")) # 01/06/2026 14:30

in_30 = today + timedelta(days=30)
print(f"30 days from now: {in_30}")

# alias
print(m.sqrt(256))  # 16.0`,
        explanation: 'from datetime import date lets you use date directly without a prefix. as m shortens math to m. random.sample ensures no duplicates in the selection.'
      },
      {
        title: 'Creating and importing your own module',
        code: `# --- File: mathutils.py ---
PI = 3.14159265358979

def circle_area(radius):
    """Return the area of a circle."""
    return PI * radius ** 2

def is_prime(n):
    """Return True if n is a prime number."""
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def factorial(n):
    """Return n! recursively."""
    return 1 if n <= 1 else n * factorial(n - 1)

# --- File: main.py (same directory) ---
from mathutils import circle_area, is_prime, factorial

print(circle_area(5))   # 78.539...
print(is_prime(17))     # True
print(factorial(6))     # 720

primes = [n for n in range(2, 30) if is_prime(n)]
print(primes)`,
        explanation: 'Any .py file is a module. Import from it just like the standard library. The if __name__ == "__main__": guard prevents module-level code from running on import.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does "import math as m" allow you to do?',
        options: ['Import only part of math', 'Use m.sqrt() instead of math.sqrt()', 'Make math faster', 'Import math twice'],
        correctIndex: 1,
        explanation: '"as" creates an alias. After "import math as m", you write m.sqrt() instead of math.sqrt(). This is useful for modules with long names.'
      },
      {
        question: 'What is pip used for?',
        options: ['Running Python scripts', 'Debugging Python code', 'Installing third-party Python packages', 'Formatting Python code'],
        correctIndex: 2,
        explanation: 'pip is Python\'s package installer. You use it to install packages not in the standard library, such as requests, numpy, or flask, from the command line.'
      },
      {
        question: 'What does random.choice(["a", "b", "c"]) do?',
        options: ['Returns all three items', 'Returns a random item from the list', 'Sorts the list randomly', 'Returns the index of a random item'],
        correctIndex: 1,
        explanation: 'random.choice(seq) returns one randomly selected element from the sequence. It works on any non-empty sequence.'
      },
      {
        question: 'What does math.floor(4.9) return?',
        options: ['5', '4', '4.9', '0'],
        correctIndex: 1,
        explanation: 'math.floor() rounds DOWN to the nearest integer. 4.9 becomes 4. math.ceil() would give 5.'
      },
      {
        question: 'What is the difference between "import os" and "from os import getcwd"?',
        options: ['No difference', '"import os" loads the module; "from os import getcwd" imports just that function into the current namespace', '"from os import getcwd" is slower', '"import os" is deprecated'],
        correctIndex: 1,
        explanation: '"import os" makes the whole module available as os. "from os import getcwd" imports just that one function directly, so you call getcwd() instead of os.getcwd().'
      },
      {
        question: 'What does datetime.now().strftime("%Y-%m-%d") produce?',
        options: ['The current time in seconds', 'A formatted date string like "2026-06-01"', 'A datetime object', 'The timezone name'],
        correctIndex: 1,
        explanation: 'strftime() formats a datetime object as a string. %Y is the 4-digit year, %m is the 2-digit month, %d is the 2-digit day.'
      },
      {
        question: 'What guard prevents module-level code from running when the file is imported?',
        options: ['if __module__ == "__main__":', 'if __name__ == "__main__":', 'if __file__ == "__main__":', 'import __main__'],
        correctIndex: 1,
        explanation: 'When a Python file is run directly, __name__ equals "__main__". When it is imported, __name__ equals the module\'s filename. This guard lets you have runnable demo code that does not execute on import.'
      }
    ],
    playground: `# Modules Playground
import math
import random
from datetime import date, timedelta

# math
print(f"pi       = {math.pi:.6f}")
print(f"sqrt(225)= {math.sqrt(225):.0f}")
print(f"ceil(2.1)= {math.ceil(2.1)}, floor(2.9)= {math.floor(2.9)}")

# random
lucky = random.sample(range(1, 50), 6)
print(f"Lucky numbers: {sorted(lucky)}")

words = ["Python", "Modules", "Import", "Library"]
print(f"Random word: {random.choice(words)}")

# datetime
today = date.today()
print(f"Today:        {today}")
print(f"In 30 days:   {today + timedelta(days=30)}")
print(f"100 days ago: {today - timedelta(days=100)}")

# Primes using math.sqrt
def is_prime(n):
    if n < 2: return False
    return all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1))

primes = [n for n in range(2, 50) if is_prime(n)]
print(f"Primes under 50: {primes}")`,
    miniProject: {
      title: 'Mini Python Toolkit',
      description: 'Create a module file called toolkit.py with functions: days_until(date_str) that parses a "YYYY-MM-DD" string and returns how many days away it is, random_password(length) that generates a random password from letters and digits, prime_factors(n) that returns a list of prime factors, and celsius_to_fahrenheit(c). Then create main.py that imports from toolkit and demonstrates all four functions.',
      hints: [
        'Use datetime.strptime(date_str, "%Y-%m-%d").date() to parse the date string',
        'Use random.choices(string.ascii_letters + string.digits, k=length) for the password',
        'For prime_factors, divide n repeatedly starting from 2, appending each divisor to a list',
        'In main.py use: from toolkit import days_until, random_password, prime_factors, celsius_to_fahrenheit',
        'Add if __name__ == "__main__": in toolkit.py to prevent demo code from running on import'
      ]
    }
  }
];

export function getPythonModuleById(id) {
  return pythonModules.find(m => m.id === id);
}
