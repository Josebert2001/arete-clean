// All Java track module content (COS 211 / 221)
// Each module: id, number, title, summary, theory[], codeExamples[], practiceQuestions[], miniProject, difficulty

export const modules = [
  {
    id: 'foundations',
    number: 1,
    title: 'Java Foundations',
    subtitle: 'Variables, Data Types & Hello World',
    difficulty: 1,
    estimatedHours: 4,
    theory: [
      {
        heading: 'What is Java?',
        body: 'Java is a high-level, object-oriented programming language created by James Gosling at Sun Microsystems in 1995. It is now maintained by Oracle. Java is famous for its "Write Once, Run Anywhere" principle — code written on one platform can run on any device that has the Java Virtual Machine (JVM).'
      },
      {
        heading: 'How Java Works',
        body: 'When you write Java code, it gets compiled into bytecode (.class files). This bytecode is not machine code yet. The JVM reads this bytecode and translates it to machine instructions for whatever device you are running on. That is why Java works on Windows, Mac, Linux, and Android the same way.'
      },
      {
        heading: 'Structure of a Java Program',
        body: 'Every Java program lives inside a class. Every class lives inside a file with the same name as the class. The starting point of any Java program is the main() method. Without main(), Java does not know where to start running.'
      },
      {
        heading: 'Variables and Data Types',
        body: 'A variable is a named container that holds a value. Java is strongly typed — meaning you must declare what KIND of data a variable holds before using it. Common types: int (whole numbers), double (decimals), String (text), boolean (true/false), char (single character).'
      },
    ],
    codeExamples: [
      {
        title: 'Your first Java program',
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        explanation: 'public class HelloWorld defines a class. The main method is where execution starts. System.out.println prints text to the screen.'
      },
      {
        title: 'Declaring variables',
        code: `int age = 21;
double gpa = 4.85;
String name = "Josebert";
boolean isStudent = true;
char grade = 'A';

System.out.println(name + " is " + age + " years old");`,
        explanation: 'Notice how each variable starts with its TYPE (int, double, String, etc.) followed by a name and an optional value. The + operator joins strings together.'
      },
      {
        title: 'Taking input from the user',
        code: `import java.util.Scanner;

public class Greeter {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = input.nextLine();

        System.out.println("Hello, " + name + "!");
    }
}`,
        explanation: 'Scanner is a built-in Java tool for reading input. nextLine() captures whatever the user types until they press Enter.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which data type would you use to store the price of a textbook (e.g. 4500.50)?',
        options: ['int', 'double', 'String', 'boolean'],
        correctIndex: 1,
        explanation: 'double is used for decimal numbers. int only stores whole numbers, so it would lose the .50.'
      },
      {
        question: 'What does System.out.println() do?',
        options: ['Reads input from the user', 'Prints text and moves to a new line', 'Creates a new variable', 'Deletes a file'],
        correctIndex: 1,
        explanation: 'println prints whatever you pass to it AND moves the cursor to a new line. print() prints without a new line.'
      },
      {
        question: 'Which of these is a valid Java variable declaration?',
        options: ['int 2age = 20;', 'String name = "Amaka";', 'double = 4.5;', 'boolean is-student = true;'],
        correctIndex: 1,
        explanation: 'Variable names cannot start with numbers, must have a name, and cannot contain hyphens.'
      },
    ],
    playground: "public class Main {\n    public static void main(String[] args) {\n        String name = \"Josebert\";\n        int age = 21;\n        System.out.println(name + \" is \" + age + \" years old\");\n    }\n}",
    miniProject: {
      title: 'Student Info Greeter',
      description: 'Build a program that asks for the user\'s name, age, and department, then prints a personalized greeting like: "Welcome Josebert! You are 21 years old and studying Cybersecurity."',
      hints: [
        'Use Scanner for input',
        'Use nextLine() for text and nextInt() for numbers',
        'Use the + operator to join strings and variables'
      ]
    }
  },
  {
    id: 'control-flow',
    number: 2,
    title: 'Control Flow',
    subtitle: 'Making Decisions with if, else, switch',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'What is Control Flow?',
        body: 'Control flow is how a program decides which code to run and which to skip. Without it, programs run top-to-bottom mechanically. With it, programs can react to different situations — like checking if a student passed or failed.'
      },
      {
        heading: 'Boolean Logic',
        body: 'A boolean is either true or false. You combine booleans with: && (AND — both must be true), || (OR — at least one must be true), ! (NOT — flips true to false). These are the building blocks of every decision your program makes.'
      },
      {
        heading: 'The if statement',
        body: 'The simplest decision-maker. "If this is true, run this code." You can chain conditions with else-if and provide a fallback with else.'
      },
      {
        heading: 'The switch statement',
        body: 'When you have many possible values for ONE variable, switch is cleaner than many if-else statements. Always remember the break keyword — without it, execution falls through to the next case.'
      },
    ],
    codeExamples: [
      {
        title: 'Simple if-else',
        code: `int score = 75;

if (score >= 70) {
    System.out.println("Grade: A");
} else if (score >= 60) {
    System.out.println("Grade: B");
} else if (score >= 50) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}`,
        explanation: 'Java checks each condition top to bottom. The first one that is true runs. The rest are skipped.'
      },
      {
        title: 'Combining conditions',
        code: `int age = 19;
boolean hasMatricNumber = true;

if (age >= 16 && hasMatricNumber) {
    System.out.println("Eligible to register");
} else {
    System.out.println("Not eligible");
}`,
        explanation: 'Both conditions must be true for the message to print. If either is false, the else runs.'
      },
      {
        title: 'Switch statement',
        code: `String day = "MONDAY";

switch (day) {
    case "MONDAY":
        System.out.println("Java class today");
        break;
    case "TUESDAY":
        System.out.println("Cybersecurity lab");
        break;
    case "WEDNESDAY":
        System.out.println("Math tutorial");
        break;
    default:
        System.out.println("No class scheduled");
}`,
        explanation: 'Switch checks the value of day and runs the matching case. break stops execution. default runs if no case matches.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does the && operator do?',
        options: ['Returns true if either condition is true', 'Returns true only if BOTH conditions are true', 'Flips true to false', 'Joins two strings'],
        correctIndex: 1,
        explanation: '&& is the logical AND — both sides must be true. || is OR (either side).'
      },
      {
        question: 'What happens if you forget the break in a switch case?',
        options: ['The program crashes', 'Nothing — it works the same', 'Execution falls through to the next case', 'The compiler removes it automatically'],
        correctIndex: 2,
        explanation: 'Without break, Java continues running the next case too. This is called "fall-through" and is a common bug.'
      },
      {
        question: 'Given: int x = 50; if (x > 40) { ... } else if (x > 60) { ... } — which block runs?',
        options: ['The first one (x > 40)', 'The second one (x > 60)', 'Both run', 'Neither runs'],
        correctIndex: 0,
        explanation: 'Java stops at the first true condition. Even though x is not > 60, the first condition already matched so the second is skipped.'
      },
    ],
    playground: "public class Main {\n    public static void main(String[] args) {\n        int score = 75;\n        if (score >= 70) {\n            System.out.println(\"Grade: A\");\n        } else if (score >= 60) {\n            System.out.println(\"Grade: B\");\n        } else {\n            System.out.println(\"Grade: F\");\n        }\n    }\n}",
    miniProject: {
      title: 'University Grade Calculator',
      description: 'Build a program that takes a score (0-100) and prints the WAEC-style grade: 70+ = A, 60-69 = B, 50-59 = C, 45-49 = D, 40-44 = E, below 40 = F.',
      hints: [
        'Use if / else if / else chains',
        'Validate that score is between 0 and 100',
        'Print an error message if score is outside that range'
      ]
    }
  },
  {
    id: 'loops',
    number: 3,
    title: 'Loops',
    subtitle: 'Repeating Code with for, while, do-while',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Why Loops Exist',
        body: 'Imagine printing numbers 1 to 100. Without loops, you would write System.out.println 100 times. Loops let you repeat code until a condition is met. They are the foundation of automation in programming.'
      },
      {
        heading: 'The for loop',
        body: 'Best when you know HOW MANY TIMES to repeat. The for loop has three parts: initialization (start point), condition (when to stop), update (what changes each round).'
      },
      {
        heading: 'The while loop',
        body: 'Best when you do NOT know how many times to repeat — just when to stop. Keeps running as long as the condition stays true.'
      },
      {
        heading: 'do-while loop',
        body: 'Like while, but ALWAYS runs at least once before checking the condition. Useful for menus and user prompts where you want the question shown first.'
      },
      {
        heading: 'break and continue',
        body: 'break exits the loop immediately. continue skips the rest of the current iteration and moves to the next one. Use them to handle special cases mid-loop.'
      },
    ],
    codeExamples: [
      {
        title: 'for loop — printing numbers 1 to 10',
        code: `for (int i = 1; i <= 10; i++) {
    System.out.println("Number: " + i);
}`,
        explanation: 'i starts at 1. The loop runs while i <= 10. After each round, i increases by 1 (i++ means i = i + 1).'
      },
      {
        title: 'while loop — wait for correct input',
        code: `import java.util.Scanner;

Scanner input = new Scanner(System.in);
String password = "";

while (!password.equals("uniuyo2025")) {
    System.out.print("Enter password: ");
    password = input.nextLine();
}

System.out.println("Access granted!");`,
        explanation: 'The loop keeps asking until the user types the correct password. .equals() is how you compare strings in Java (not ==).'
      },
      {
        title: 'do-while loop — show menu first',
        code: `import java.util.Scanner;

Scanner input = new Scanner(System.in);
int choice;

do {
    System.out.println("1. Add student");
    System.out.println("2. View students");
    System.out.println("3. Exit");
    System.out.print("Choose: ");
    choice = input.nextInt();
} while (choice != 3);

System.out.println("Goodbye!");`,
        explanation: 'The menu shows at least once. Then it keeps showing until the user picks 3.'
      },
      {
        title: 'break and continue',
        code: `for (int i = 1; i <= 10; i++) {
    if (i == 5) continue;  // skip 5
    if (i == 8) break;     // stop at 8
    System.out.println(i);
}
// Prints: 1, 2, 3, 4, 6, 7`,
        explanation: 'continue jumps to the next iteration. break exits the loop entirely.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which loop ALWAYS runs at least once, even if the condition is false?',
        options: ['for', 'while', 'do-while', 'forever'],
        correctIndex: 2,
        explanation: 'do-while checks the condition AFTER running the body, so the body always runs at least once.'
      },
      {
        question: 'What does i++ mean in a for loop?',
        options: ['i is doubled', 'i is increased by 1', 'i is set to 1', 'i is compared to 1'],
        correctIndex: 1,
        explanation: 'i++ is shorthand for i = i + 1. It increases i by 1 each round.'
      },
      {
        question: 'What does break do in a loop?',
        options: ['Pauses the loop', 'Skips one iteration', 'Exits the loop completely', 'Restarts the loop'],
        correctIndex: 2,
        explanation: 'break exits the entire loop immediately. continue skips one iteration. There is no "pause" in Java loops.'
      },
    ],
    playground: "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(\"Count: \" + i);\n        }\n    }\n}",
    miniProject: {
      title: 'Multiplication Table Generator',
      description: 'Ask the user for a number and print its multiplication table from 1 to 12. Example for 5: "5 x 1 = 5", "5 x 2 = 10", etc.',
      hints: [
        'Use a for loop from 1 to 12',
        'Multiply the user input by the loop counter',
        'Format the output cleanly with the * symbol'
      ]
    }
  },
  {
    id: 'arrays',
    number: 4,
    title: 'Arrays',
    subtitle: 'Storing Multiple Values',
    difficulty: 2,
    estimatedHours: 5,
    theory: [
      {
        heading: 'What is an Array?',
        body: 'An array is a container that holds multiple values of the SAME type. Instead of creating 30 variables for 30 students, you create one array of 30 slots. Each slot has a position (called an index) starting from 0.'
      },
      {
        heading: 'Indexing Starts at 0',
        body: 'This trips up every beginner. The FIRST element is at index 0, the second at index 1, and so on. An array of 5 elements has indices 0, 1, 2, 3, 4 — NOT 1 to 5.',
        diagram: 'c-array'
      },
      {
        heading: 'Array Size is Fixed',
        body: 'Once you create an array of size 10, you cannot grow it to 11. You would need to create a new, larger array and copy values over. Later we will learn ArrayList which solves this.'
      },
      {
        heading: '2D Arrays',
        body: 'A 2D array is an array of arrays — like a spreadsheet with rows and columns. Useful for grids, matrices, game boards, and tabular data.'
      },
    ],
    codeExamples: [
      {
        title: 'Declaring and using an array',
        code: `int[] scores = new int[5];

scores[0] = 85;
scores[1] = 72;
scores[2] = 91;
scores[3] = 68;
scores[4] = 77;

System.out.println("Third score: " + scores[2]);
// Output: Third score: 91`,
        explanation: 'new int[5] creates space for 5 integers. We fill each slot using its index. scores[2] gets the third value (index counts from 0).'
      },
      {
        title: 'Array shortcut + loop',
        code: `String[] students = {"Josebert", "Amaka", "Salome", "Sammy"};

for (int i = 0; i < students.length; i++) {
    System.out.println((i + 1) + ". " + students[i]);
}`,
        explanation: '{...} initializes the array directly. .length tells you the size. The for loop walks through every position.'
      },
      {
        title: 'For-each loop (cleaner)',
        code: `int[] scores = {85, 72, 91, 68, 77};
int total = 0;

for (int score : scores) {
    total = total + score;
}

double average = total / (double) scores.length;
System.out.println("Average: " + average);`,
        explanation: 'The for-each loop hands you each value directly — no index needed. Great when you only care about the values, not the positions.'
      },
      {
        title: '2D array — student scores',
        code: `int[][] grid = {
    {85, 72, 91},
    {68, 77, 80},
    {90, 95, 88}
};

// Get row 1, column 2
System.out.println(grid[1][2]); // Output: 80

// Loop through all
for (int i = 0; i < grid.length; i++) {
    for (int j = 0; j < grid[i].length; j++) {
        System.out.print(grid[i][j] + " ");
    }
    System.out.println();
}`,
        explanation: 'A 2D array uses two indices: grid[row][column]. Nested loops walk through every cell.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the index of the LAST element in an array of size 10?',
        options: ['10', '9', '11', '0'],
        correctIndex: 1,
        explanation: 'Arrays start at 0. So size 10 means indices 0 through 9. The last index is always size - 1.'
      },
      {
        question: 'What does scores.length return?',
        options: ['The largest value in the array', 'The smallest value', 'The number of elements', 'The first element'],
        correctIndex: 2,
        explanation: '.length gives you the number of slots in the array, not the values.'
      },
      {
        question: 'Can you change the size of an array after creating it?',
        options: ['Yes, just assign new values', 'Yes, using .resize()', 'No, arrays have fixed size', 'Only if it is an int array'],
        correctIndex: 2,
        explanation: 'Arrays in Java are fixed-size. To resize, you create a new array and copy values. ArrayList (later) solves this.'
      },
    ],
    playground: "public class Main {\n    public static void main(String[] args) {\n        int[] scores = {85, 72, 91, 68, 77};\n        int total = 0;\n        for (int s : scores) {\n            total += s;\n        }\n        System.out.println(\"Average: \" + (total / (double) scores.length));\n    }\n}",
    miniProject: {
      title: 'Student Score Analyzer',
      description: 'Store 10 student scores in an array. Calculate and print: the average, the highest score, the lowest score, and how many students scored above average.',
      hints: [
        'Loop through the array to find max and min',
        'Sum all values, then divide by length for average',
        'Loop again to count students above average'
      ]
    }
  },
  {
    id: 'methods',
    number: 5,
    title: 'Methods',
    subtitle: 'Functions and Code Reuse',
    difficulty: 2,
    estimatedHours: 5,
    theory: [
      {
        heading: 'What is a Method?',
        body: 'A method is a named block of code that performs a specific task. Instead of repeating the same code in many places, you write it ONCE in a method and CALL it whenever you need it. This is called code reuse.'
      },
      {
        heading: 'Anatomy of a Method',
        body: 'A method has: a return type (what it gives back, or void if nothing), a name, parameters in parentheses (the inputs), and a body in braces. Example: public static int add(int a, int b) { return a + b; }'
      },
      {
        heading: 'Method Overloading',
        body: 'You can have multiple methods with the SAME NAME as long as they take different parameters. Java picks the right one based on what you pass in.'
      },
      {
        heading: 'Recursion',
        body: 'A method that calls itself. Useful for problems that break into smaller versions of themselves (factorial, fibonacci, tree traversal). Always need a base case to stop, otherwise infinite loop.'
      },
      {
        heading: 'Variable Scope',
        body: 'Variables declared inside a method only exist INSIDE that method. Once the method ends, they disappear. This is called local scope.'
      },
    ],
    codeExamples: [
      {
        title: 'Method that returns a value',
        code: `public class Calculator {

    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(15, 27);
        System.out.println("Sum: " + result);  // Output: Sum: 42
    }
}`,
        explanation: 'int before the method name means it returns an integer. The return keyword sends the value back to wherever the method was called.'
      },
      {
        title: 'Void method (no return)',
        code: `public static void greet(String name) {
    System.out.println("Hello, " + name + "!");
    System.out.println("Welcome to UniUyo");
}

// Calling it:
greet("Josebert");`,
        explanation: 'void means the method does not return anything. It just performs an action.'
      },
      {
        title: 'Method overloading',
        code: `public static int multiply(int a, int b) {
    return a * b;
}

public static double multiply(double a, double b) {
    return a * b;
}

public static int multiply(int a, int b, int c) {
    return a * b * c;
}

// Java picks the right one:
multiply(3, 4);          // First method
multiply(2.5, 4.0);      // Second method
multiply(2, 3, 4);       // Third method`,
        explanation: 'Same name, different parameter lists. Java figures out which version to use automatically.'
      },
      {
        title: 'Recursion — factorial',
        code: `public static int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;  // base case
    }
    return n * factorial(n - 1);  // recursive call
}

System.out.println(factorial(5));  // Output: 120`,
        explanation: 'factorial(5) calls factorial(4), which calls factorial(3), down to factorial(1). The base case stops it from going forever.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does void mean in a method declaration?',
        options: ['The method has no name', 'The method returns nothing', 'The method takes no parameters', 'The method is empty'],
        correctIndex: 1,
        explanation: 'void means the method performs an action but does not return a value to the caller.'
      },
      {
        question: 'What is method overloading?',
        options: ['When a method calls itself', 'Multiple methods with the same name but different parameters', 'When a method has too many parameters', 'When a method is too long'],
        correctIndex: 1,
        explanation: 'Overloading lets you have several versions of the same method, distinguished by their parameters.'
      },
      {
        question: 'What is essential for any recursive method?',
        options: ['A for loop', 'A return statement only', 'A base case to stop', 'Multiple parameters'],
        correctIndex: 2,
        explanation: 'Without a base case, the method would call itself forever and crash with a StackOverflowError.'
      },
    ],
    playground: "public class Main {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Sum: \" + add(15, 27));\n    }\n}",
    miniProject: {
      title: 'Math Utility Class',
      description: 'Build a class with these methods: add, subtract, multiply, divide, power (a^b), factorial (recursive), and isPrime. Call each from main and display results.',
      hints: [
        'Use method overloading for add (int and double versions)',
        'For power, use a loop or recursion',
        'For isPrime, check divisibility from 2 up to sqrt(n)'
      ]
    }
  },
  {
    id: 'oop-1',
    number: 6,
    title: 'OOP Part 1',
    subtitle: 'Classes, Objects & Encapsulation',
    difficulty: 3,
    estimatedHours: 6,
    theory: [
      {
        heading: 'What is OOP?',
        body: 'Object-Oriented Programming is a way of organizing code around "objects" — things that have data (fields) and behavior (methods). It mirrors how we think about the real world. A Student is an object. A Car is an object. Each has properties and things it can do.'
      },
      {
        heading: 'Class vs Object',
        body: 'A class is a blueprint. An object is a real thing built from that blueprint. "Student" is a class — the general idea. "Josebert" is an object — an actual student with real values for name, age, matric number.',
        diagram: 'java-class'
      },
      {
        heading: 'Constructors',
        body: 'A constructor is a special method that runs when you create a new object. It usually sets up the object\'s initial values. It has the same name as the class and no return type.'
      },
      {
        heading: 'Encapsulation',
        body: 'Encapsulation means hiding an object\'s internal data from the outside world. You make fields private and provide public getter/setter methods to access them. This protects data from invalid changes.'
      },
      {
        heading: 'The this keyword',
        body: 'Inside a class, "this" refers to the current object. Used to distinguish between a field and a parameter with the same name: this.name = name; means "set THIS object\'s name field to the value of the name parameter."'
      },
    ],
    codeExamples: [
      {
        title: 'Defining a class',
        code: `public class Student {
    String name;
    int age;
    String matricNumber;
    double gpa;

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Matric: " + matricNumber);
        System.out.println("GPA: " + gpa);
    }
}`,
        explanation: 'A class with 4 fields (data) and 1 method (behavior). This is the blueprint.'
      },
      {
        title: 'Creating objects',
        code: `public static void main(String[] args) {
    Student s1 = new Student();
    s1.name = "Josebert";
    s1.matricNumber = "22/CYB/001";
    s1.gpa = 4.85;

    Student s2 = new Student();
    s2.name = "Amaka";
    s2.matricNumber = "22/CYB/002";
    s2.gpa = 4.65;

    s1.displayInfo();
    s2.displayInfo();
}`,
        explanation: 'new Student() builds an actual student from the blueprint. We can build many — each independent of the others.'
      },
      {
        title: 'Constructor — cleaner setup',
        code: `public class Student {
    String name;
    String matricNumber;
    double gpa;

    public Student(String name, String matricNumber, double gpa) {
        this.name = name;
        this.matricNumber = matricNumber;
        this.gpa = gpa;
    }
}

// Now creating is one line:
Student s1 = new Student("Josebert", "22/CYB/001", 4.85);`,
        explanation: 'The constructor lets us pass values when creating the object. "this" refers to the object being created.'
      },
      {
        title: 'Encapsulation with getters/setters',
        code: `public class Student {
    private String name;
    private double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    public String getName() { return name; }

    public double getGpa() { return gpa; }

    public void setGpa(double gpa) {
        if (gpa >= 0 && gpa <= 5.0) {
            this.gpa = gpa;
        } else {
            System.out.println("Invalid GPA");
        }
    }
}`,
        explanation: 'private fields cannot be accessed directly from outside. The setter validates the new value before updating — protecting the object from bad data.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the difference between a class and an object?',
        options: ['No difference', 'A class is a blueprint, an object is built from it', 'An object is a blueprint, a class is built from it', 'Classes are for numbers, objects are for text'],
        correctIndex: 1,
        explanation: 'Think of a class like an architectural plan, and objects as the actual buildings constructed from that plan.'
      },
      {
        question: 'What is a constructor?',
        options: ['A method that destroys objects', 'A method that runs when an object is created', 'A method that calculates math', 'A type of variable'],
        correctIndex: 1,
        explanation: 'Constructors run automatically when you use "new" to create an object. They set up initial values.'
      },
      {
        question: 'Why do we use private fields with getters and setters?',
        options: ['To make code longer', 'To hide and protect data with controlled access', 'Java requires it', 'For better performance'],
        correctIndex: 1,
        explanation: 'This is encapsulation. It prevents outside code from setting invalid values and gives you control over how fields are accessed.'
      },
    ],
    playground: "public class Main {\n    static class Student {\n        String name;\n        double gpa;\n        Student(String name, double gpa) {\n            this.name = name;\n            this.gpa = gpa;\n        }\n        void show() {\n            System.out.println(name + \" - GPA: \" + gpa);\n        }\n    }\n    public static void main(String[] args) {\n        Student s = new Student(\"Josebert\", 4.85);\n        s.show();\n    }\n}",
    miniProject: {
      title: 'BankAccount Class',
      description: 'Create a BankAccount class with private fields: accountNumber, accountHolder, balance. Add methods: deposit(amount), withdraw(amount) — should reject if balance is insufficient, and displayBalance(). Create 2 accounts and perform transactions.',
      hints: [
        'Use a constructor to set initial values',
        'Validate amounts in deposit and withdraw',
        'Print clear error messages for invalid transactions'
      ]
    }
  },
  {
    id: 'oop-2',
    number: 7,
    title: 'OOP Part 2',
    subtitle: 'Inheritance, Polymorphism, Abstraction',
    difficulty: 4,
    estimatedHours: 8,
    theory: [
      {
        heading: 'Inheritance',
        body: 'Inheritance lets one class inherit fields and methods from another. The child class can use everything the parent has, plus add its own things. This avoids rewriting the same code in similar classes. Use the extends keyword.',
        diagram: 'java-inheritance'
      },
      {
        heading: 'Polymorphism',
        body: 'Polymorphism means "many forms." The same method name can behave differently depending on which object calls it. A Dog\'s makeSound() barks. A Cat\'s makeSound() meows. Both are called the same way.'
      },
      {
        heading: 'Method Overriding',
        body: 'When a child class provides its own version of a method that exists in the parent. Use the @Override annotation to make it clear. The new version replaces the parent\'s version for child objects.'
      },
      {
        heading: 'Abstract Classes',
        body: 'An abstract class is a class that cannot be instantiated directly — it exists only to be extended. It can have abstract methods (no body) that child classes MUST implement. Useful when you have a concept that only makes sense as a category, not a real thing (e.g., "Animal" — no animal is just an animal, it\'s a specific kind).'
      },
      {
        heading: 'Interfaces',
        body: 'An interface is a contract. It says "any class that implements me MUST provide these methods." Unlike inheritance (only one parent allowed), a class can implement many interfaces. Use the implements keyword.'
      },
    ],
    codeExamples: [
      {
        title: 'Basic inheritance',
        code: `public class Animal {
    String name;

    public void eat() {
        System.out.println(name + " is eating");
    }
}

public class Dog extends Animal {
    public void bark() {
        System.out.println(name + " says: Woof!");
    }
}

// Usage:
Dog rex = new Dog();
rex.name = "Rex";
rex.eat();   // inherited from Animal
rex.bark();  // Dog's own method`,
        explanation: 'Dog extends Animal — it gets name and eat() for free, plus adds bark().'
      },
      {
        title: 'Method overriding & polymorphism',
        code: `public class Animal {
    public void makeSound() {
        System.out.println("Some sound");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}

// Polymorphism in action:
Animal[] animals = { new Dog(), new Cat(), new Dog() };
for (Animal a : animals) {
    a.makeSound();  // Each calls its OWN version
}
// Output: Woof!  Meow!  Woof!`,
        explanation: 'Even though the array is typed as Animal, Java calls the actual object\'s overridden method. That is polymorphism.'
      },
      {
        title: 'Abstract class',
        code: `public abstract class Shape {
    abstract double area();  // must be implemented

    public void describe() {
        System.out.println("I am a shape with area " + area());
    }
}

public class Circle extends Shape {
    double radius;

    public Circle(double r) { this.radius = r; }

    @Override
    double area() {
        return 3.14159 * radius * radius;
    }
}

// Shape s = new Shape();  // ERROR — abstract!
Circle c = new Circle(5);
c.describe();  // works`,
        explanation: 'Shape cannot be instantiated. Every concrete subclass MUST implement area(). describe() works for all shapes.'
      },
      {
        title: 'Interface',
        code: `public interface Printable {
    void print();
}

public interface Saveable {
    void saveToFile();
}

public class Report implements Printable, Saveable {
    String content;

    @Override
    public void print() {
        System.out.println("Printing: " + content);
    }

    @Override
    public void saveToFile() {
        System.out.println("Saving to disk...");
    }
}`,
        explanation: 'A class can implement multiple interfaces. Each interface forces the class to provide its methods.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which keyword is used for inheritance in Java?',
        options: ['inherits', 'extends', 'implements', 'super'],
        correctIndex: 1,
        explanation: 'extends is for class inheritance. implements is for interfaces.'
      },
      {
        question: 'What does @Override do?',
        options: ['Required to override methods', 'Tells Java this method replaces a parent method (helps catch errors)', 'Makes the method run faster', 'Hides the method from child classes'],
        correctIndex: 1,
        explanation: '@Override is not strictly required but strongly recommended. If the method signature does not match the parent, the compiler will catch your mistake.'
      },
      {
        question: 'Can a class extend multiple classes in Java?',
        options: ['Yes, no limit', 'Yes, up to 3', 'No, only one parent class', 'Only if the parents are abstract'],
        correctIndex: 2,
        explanation: 'Java supports single inheritance for classes. But a class CAN implement multiple interfaces.'
      },
    ],
    playground: "public class Main {\n    static class Animal {\n        void makeSound() { System.out.println(\"Some sound\"); }\n    }\n    static class Dog extends Animal {\n        @Override void makeSound() { System.out.println(\"Woof!\"); }\n    }\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.makeSound();\n    }\n}",
    miniProject: {
      title: 'Animal Hierarchy',
      description: 'Build an Animal class (with name, eat method, makeSound method). Create Dog, Cat, Cow, and Bird subclasses, each with their own makeSound(). Create an array of mixed animals and loop through them, calling makeSound() on each.',
      hints: [
        'Make Animal abstract or give it a default makeSound',
        'Use @Override in each child class',
        'Demonstrate polymorphism with an Animal[] array'
      ]
    }
  },
  {
    id: 'exceptions',
    number: 8,
    title: 'Exception Handling',
    subtitle: 'Catching and Managing Errors',
    difficulty: 3,
    estimatedHours: 4,
    theory: [
      {
        heading: 'What is an Exception?',
        body: 'An exception is a runtime error — something that goes wrong WHILE the program is running. Dividing by zero, accessing an array index that does not exist, trying to convert "abc" to a number. These crash unprotected programs.'
      },
      {
        heading: 'try-catch-finally',
        body: 'Wrap risky code in a try block. If something goes wrong, the catch block runs instead of crashing. The finally block runs no matter what — used for cleanup like closing files.'
      },
      {
        heading: 'Checked vs Unchecked',
        body: 'Checked exceptions (IOException, SQLException) MUST be handled or declared. Unchecked exceptions (NullPointerException, ArithmeticException) are programmer mistakes and do not require handling — but should be prevented.'
      },
      {
        heading: 'throw and throws',
        body: 'throw lets you raise your own exception. throws (in a method signature) declares that the method might throw certain exceptions, forcing callers to handle them.'
      },
      {
        heading: 'Custom Exceptions',
        body: 'You can create your own exception classes by extending Exception. Useful for domain-specific errors like InsufficientFundsException or InvalidStudentIdException.'
      },
    ],
    codeExamples: [
      {
        title: 'try-catch basics',
        code: `public class Divider {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }

        System.out.println("Program continues...");
    }
}`,
        explanation: 'Without try-catch, this crashes. With it, we catch the error gracefully and continue.'
      },
      {
        title: 'Multiple catch blocks',
        code: `try {
    int[] nums = {1, 2, 3};
    System.out.println(nums[10]);

    String text = null;
    System.out.println(text.length());

} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Bad array index");
} catch (NullPointerException e) {
    System.out.println("Got a null value");
} catch (Exception e) {
    System.out.println("Something else went wrong: " + e.getMessage());
}`,
        explanation: 'Different exceptions get different responses. The generic Exception catches anything not caught above.'
      },
      {
        title: 'finally block',
        code: `try {
    System.out.println("Opening file...");
    // pretend to read file
    throw new RuntimeException("Read failed");
} catch (Exception e) {
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("Closing file...");  // ALWAYS runs
}`,
        explanation: 'finally runs whether or not an exception happened. Use it for cleanup that must always happen.'
      },
      {
        title: 'Custom exception',
        code: `public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class Account {
    double balance = 1000;

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Cannot withdraw " + amount + ", balance is " + balance);
        }
        balance -= amount;
    }
}`,
        explanation: 'We define our own exception type and throw it when business rules are violated. Callers must handle it.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What block runs whether or not an exception occurs?',
        options: ['try', 'catch', 'finally', 'throw'],
        correctIndex: 2,
        explanation: 'finally always runs. It is used for cleanup that must happen regardless of success or failure.'
      },
      {
        question: 'What exception is thrown when you divide an int by zero?',
        options: ['NullPointerException', 'ArithmeticException', 'NumberFormatException', 'IOException'],
        correctIndex: 1,
        explanation: 'Integer division by zero throws ArithmeticException. Note: dividing a double by zero gives Infinity, not an exception.'
      },
      {
        question: 'What does the throws keyword do?',
        options: ['Throws an exception immediately', 'Declares that a method might throw certain exceptions', 'Catches exceptions', 'Ignores exceptions'],
        correctIndex: 1,
        explanation: 'throws goes in the method signature to warn callers that they need to handle certain exceptions.'
      },
    ],
    playground: "public class Main {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n            System.out.println(result);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Cannot divide by zero!\");\n        }\n        System.out.println(\"Program continues...\");\n    }\n}",
    miniProject: {
      title: 'Safe Calculator',
      description: 'Build a calculator that takes user input for two numbers and an operation (+, -, *, /). Handle: division by zero, invalid numbers (e.g. "abc"), unsupported operations. Never crash — always recover with a helpful message.',
      hints: [
        'Use Scanner.nextLine() and Integer.parseInt() — wrap in try',
        'Catch NumberFormatException and ArithmeticException separately',
        'Use a while loop so the calculator keeps running after errors'
      ]
    }
  },
  {
    id: 'collections',
    number: 9,
    title: 'Collections',
    subtitle: 'ArrayList, HashSet, HashMap',
    difficulty: 3,
    estimatedHours: 5,
    theory: [
      {
        heading: 'Why Collections?',
        body: 'Arrays have fixed sizes and limited features. Collections are dynamic, can grow and shrink, and come with many built-in methods. The Java Collections Framework gives you the right data structure for the job.'
      },
      {
        heading: 'ArrayList — Dynamic Lists',
        body: 'Like an array but grows automatically. Add, remove, search, sort — all built in. Best for ordered lists where order matters and duplicates are allowed.'
      },
      {
        heading: 'HashSet — Unique Values',
        body: 'A set stores values but rejects duplicates. Adding the same item twice does nothing. Order is NOT preserved. Best for membership checks ("is this user already registered?").'
      },
      {
        heading: 'HashMap — Key-Value Pairs',
        body: 'A dictionary. You store values under keys, then look them up by key. Best when you have a unique identifier for each value (matric number → student object).'
      },
      {
        heading: 'Generics — Type Safety',
        body: 'The <> syntax (like ArrayList<String>) tells Java what kind of objects this collection holds. The compiler then prevents you from accidentally adding the wrong type.'
      },
    ],
    codeExamples: [
      {
        title: 'ArrayList basics',
        code: `import java.util.ArrayList;

ArrayList<String> students = new ArrayList<>();
students.add("Josebert");
students.add("Amaka");
students.add("Salome");

System.out.println(students.get(0));  // Josebert
System.out.println(students.size());  // 3

students.remove("Amaka");
System.out.println(students.contains("Salome"));  // true

for (String s : students) {
    System.out.println(s);
}`,
        explanation: 'ArrayList<String> means "a list of Strings." Common methods: add, get, remove, size, contains.'
      },
      {
        title: 'HashSet — no duplicates',
        code: `import java.util.HashSet;

HashSet<String> registered = new HashSet<>();
registered.add("22/CYB/001");
registered.add("22/CYB/002");
registered.add("22/CYB/001");  // duplicate — ignored

System.out.println(registered.size());  // 2

if (registered.contains("22/CYB/001")) {
    System.out.println("Already registered");
}`,
        explanation: 'Adding the same matric number twice does nothing. Sets only keep unique values.'
      },
      {
        title: 'HashMap — key-value lookup',
        code: `import java.util.HashMap;

HashMap<String, Double> gpas = new HashMap<>();
gpas.put("22/CYB/001", 4.85);
gpas.put("22/CYB/002", 4.65);
gpas.put("22/CYB/003", 3.95);

Double myGpa = gpas.get("22/CYB/001");
System.out.println(myGpa);  // 4.85

// Loop through all entries:
for (String key : gpas.keySet()) {
    System.out.println(key + " -> " + gpas.get(key));
}`,
        explanation: 'put(key, value) stores. get(key) retrieves. keySet() gives you all keys to loop through.'
      },
      {
        title: 'ArrayList of objects',
        code: `class Student {
    String name;
    double gpa;

    Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }
}

ArrayList<Student> students = new ArrayList<>();
students.add(new Student("Josebert", 4.85));
students.add(new Student("Amaka", 4.65));

for (Student s : students) {
    System.out.println(s.name + ": " + s.gpa);
}`,
        explanation: 'Collections can hold any type — including your own classes. This is how real applications manage data.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which collection rejects duplicates?',
        options: ['ArrayList', 'HashSet', 'HashMap', 'LinkedList'],
        correctIndex: 1,
        explanation: 'HashSet only stores unique values. ArrayList allows duplicates.'
      },
      {
        question: 'How do you retrieve a value from a HashMap?',
        options: ['map.find(key)', 'map.get(key)', 'map.search(key)', 'map.read(key)'],
        correctIndex: 1,
        explanation: 'put() stores, get() retrieves. Returns null if the key does not exist.'
      },
      {
        question: 'What does ArrayList<Integer> mean?',
        options: ['An array of integers', 'A list that holds only Integer objects', 'A list of unknown type', 'A fixed-size integer container'],
        correctIndex: 1,
        explanation: 'The <Integer> tells Java this list specifically holds Integer objects. Trying to add a String would fail to compile.'
      },
    ],
    playground: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> students = new ArrayList<>();\n        students.add(\"Josebert\");\n        students.add(\"Amaka\");\n        students.add(\"Salome\");\n        for (String s : students) {\n            System.out.println(s);\n        }\n        System.out.println(\"Total: \" + students.size());\n    }\n}",
    miniProject: {
      title: 'Student Records Manager',
      description: 'Build a menu-driven app using ArrayList<Student>: add a student, remove by matric, search by matric, list all sorted by GPA, find the student with highest GPA. Use HashMap to map matric to student for fast lookup.',
      hints: [
        'Create a Student class with name, matric, gpa',
        'Use ArrayList for the main list, HashMap for quick lookups',
        'Use a while loop with a switch for the menu'
      ]
    }
  },
  {
    id: 'files-threads',
    number: 10,
    title: 'Files & Threads',
    subtitle: 'I/O and Multithreading',
    difficulty: 3,
    estimatedHours: 6,
    theory: [
      {
        heading: 'Why File Handling?',
        body: 'Programs that lose all data when closed are not useful. File handling lets you save data permanently — settings, user records, logs. Java reads and writes files using streams.'
      },
      {
        heading: 'FileWriter and BufferedWriter',
        body: 'FileWriter writes characters to a file. BufferedWriter wraps it and adds efficiency (writes in chunks instead of one character at a time). Always close streams when done.'
      },
      {
        heading: 'What is a Thread?',
        body: 'A thread is a separate path of execution. Normally programs do one thing at a time. With threads, your program can do multiple things in parallel — like downloading a file while showing a progress bar.'
      },
      {
        heading: 'Thread Lifecycle',
        body: 'New (created but not started) → Runnable (ready to run) → Running (currently executing) → Blocked/Waiting (paused) → Dead (finished).'
      },
      {
        heading: 'Synchronization',
        body: 'When multiple threads access the same data, things can go wrong (race conditions). The synchronized keyword ensures only one thread can run a method or block at a time.'
      },
    ],
    codeExamples: [
      {
        title: 'Writing to a file',
        code: `import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;

public class Logger {
    public static void main(String[] args) {
        try {
            BufferedWriter writer = new BufferedWriter(
                new FileWriter("activity.txt", true)  // true = append
            );
            writer.write("User logged in at " + System.currentTimeMillis());
            writer.newLine();
            writer.close();
            System.out.println("Saved!");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
        explanation: 'FileWriter("file", true) opens for appending. close() flushes and releases the file. IOException must be handled.'
      },
      {
        title: 'Reading from a file',
        code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

try {
    BufferedReader reader = new BufferedReader(new FileReader("activity.txt"));
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
    reader.close();
} catch (IOException e) {
    System.out.println("Could not read file");
}`,
        explanation: 'readLine() returns one line at a time. Returns null when the file ends. The loop reads until done.'
      },
      {
        title: 'Creating a thread',
        code: `class DownloadTask extends Thread {
    String fileName;

    public DownloadTask(String name) { this.fileName = name; }

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(fileName + ": " + (i * 20) + "%");
            try { Thread.sleep(500); } catch (Exception e) {}
        }
    }
}

public static void main(String[] args) {
    DownloadTask t1 = new DownloadTask("Movie.mp4");
    DownloadTask t2 = new DownloadTask("Song.mp3");

    t1.start();  // not run() — start() launches a new thread
    t2.start();
}`,
        explanation: 'Both downloads run in parallel. start() begins the thread; run() defines what it does. Thread.sleep pauses execution.'
      },
      {
        title: 'Synchronization',
        code: `class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public int getCount() { return count; }
}`,
        explanation: 'synchronized ensures only one thread can run increment() at a time. Without it, two threads incrementing simultaneously can lose updates.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does the second argument "true" in new FileWriter("log.txt", true) do?',
        options: ['Makes the file read-only', 'Opens in append mode (adds to existing content)', 'Creates the file if missing', 'Encrypts the file'],
        correctIndex: 1,
        explanation: 'true means append. Without it (or with false), each write overwrites the file from scratch.'
      },
      {
        question: 'Which method starts a thread?',
        options: ['t.run()', 't.start()', 't.begin()', 't.execute()'],
        correctIndex: 1,
        explanation: 'start() launches a new thread that calls run(). If you call run() directly, it just runs on the current thread — no parallelism.'
      },
      {
        question: 'Why use synchronized?',
        options: ['To make code faster', 'To prevent multiple threads from interfering with shared data', 'To compress files', 'To debug code'],
        correctIndex: 1,
        explanation: 'synchronized ensures thread-safety when multiple threads access the same resource.'
      },
    ],
    playground: "public class Main {\n    static class Task extends Thread {\n        String name;\n        Task(String name) { this.name = name; }\n        public void run() {\n            for (int i = 1; i <= 3; i++) {\n                System.out.println(name + \": step \" + i);\n            }\n        }\n    }\n    public static void main(String[] args) throws InterruptedException {\n        Task t1 = new Task(\"Download\");\n        t1.start();\n        t1.join();\n        System.out.println(\"Done\");\n    }\n}",
    miniProject: {
      title: 'Activity Logger',
      description: 'Build a Java app that logs user actions to a text file. Each line: timestamp + username + action. Provide menu options to: log an action, view all logs, clear logs. Use threads to simulate multiple users logging simultaneously.',
      hints: [
        'Use BufferedWriter in append mode for logging',
        'Use BufferedReader to read all logs back',
        'Make the log method synchronized for thread safety'
      ]
    }
  },
  {
    id: 'strings',
    number: 11,
    title: 'String Operations',
    subtitle: 'Text Processing and Manipulation',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Strings are Objects',
        body: 'Unlike int or double, String is a class — an object with methods. That is why you can do "hello".toUpperCase() but not 5.toUpperCase(). Strings get special treatment from the compiler though, so they look like primitives.'
      },
      {
        heading: 'String Immutability',
        body: 'Strings cannot be changed once created. When you "modify" a string, Java actually creates a new string. "hello" + " world" creates a third string. The original two still exist unchanged.'
      },
      {
        heading: 'StringBuilder for Performance',
        body: 'For lots of string concatenation in loops, use StringBuilder. It is mutable and much faster. Build up the text with .append() then call .toString() at the end.'
      },
      {
        heading: 'equals() vs ==',
        body: 'THIS IS A COMMON BUG. == compares whether two variables point to the SAME object in memory. .equals() compares the CONTENTS. For Strings, always use .equals().'
      },
    ],
    codeExamples: [
      {
        title: 'Common String methods',
        code: `String text = "Hello, Cybersecurity!";

System.out.println(text.length());           // 21
System.out.println(text.toUpperCase());      // HELLO, CYBERSECURITY!
System.out.println(text.toLowerCase());      // hello, cybersecurity!
System.out.println(text.indexOf("Cyber"));   // 7
System.out.println(text.substring(7, 20));   // Cybersecurity
System.out.println(text.replace("Hello", "Hi")); // Hi, Cybersecurity!
System.out.println(text.contains("Cyber"));  // true`,
        explanation: 'These methods return NEW strings — the original text never changes.'
      },
      {
        title: 'equals() vs ==',
        code: `String a = "java";
String b = "java";
String c = new String("java");

System.out.println(a == b);          // true  (string pool)
System.out.println(a == c);          // false (different objects)
System.out.println(a.equals(c));     // true  (same content)

// RULE: ALWAYS use .equals() for strings.`,
        explanation: 'Java optimizes string literals (a and b point to the same object). But new String() creates a fresh object. .equals() is always safe.'
      },
      {
        title: 'StringBuilder for performance',
        code: `// Slow with regular concatenation:
String result = "";
for (int i = 1; i <= 1000; i++) {
    result += i + ", ";  // creates 1000 new strings!
}

// Fast with StringBuilder:
StringBuilder sb = new StringBuilder();
for (int i = 1; i <= 1000; i++) {
    sb.append(i).append(", ");
}
String result2 = sb.toString();`,
        explanation: 'StringBuilder modifies one buffer instead of creating new strings every iteration. For large loops, this is hundreds of times faster.'
      },
      {
        title: 'Splitting and joining',
        code: `String csv = "Josebert,Amaka,Salome,Sammy";
String[] names = csv.split(",");

for (String name : names) {
    System.out.println("- " + name);
}

// Join back:
String joined = String.join(" | ", names);
System.out.println(joined);  // Josebert | Amaka | Salome | Sammy`,
        explanation: 'split() breaks a string into an array. String.join() does the reverse.'
      }
    ],
    practiceQuestions: [
      {
        question: 'How do you correctly compare two strings in Java?',
        options: ['str1 == str2', 'str1.equals(str2)', 'str1.compareTo(str2) > 0', 'str1 = str2'],
        correctIndex: 1,
        explanation: '.equals() compares content. == compares references and can give wrong results unpredictably.'
      },
      {
        question: 'What does "hello".substring(1, 4) return?',
        options: ['"hell"', '"ell"', '"ello"', '"hel"'],
        correctIndex: 1,
        explanation: 'substring(start, end) starts at index start (inclusive) and ends BEFORE index end (exclusive). So 1-3 = "ell".'
      },
      {
        question: 'Why use StringBuilder instead of regular string concatenation?',
        options: ['It looks shorter', 'It is much faster for many concatenations', 'It supports more characters', 'It is required by Java'],
        correctIndex: 1,
        explanation: 'StringBuilder modifies a single buffer; regular concatenation creates a new String object every time, which is slow in loops.'
      },
    ],
    playground: "public class Main {\n    public static void main(String[] args) {\n        String text = \"Hello, Cybersecurity!\";\n        System.out.println(\"Length: \" + text.length());\n        System.out.println(\"Upper: \" + text.toUpperCase());\n        System.out.println(\"Contains Cyber: \" + text.contains(\"Cyber\"));\n    }\n}",
    miniProject: {
      title: 'Text Analyzer',
      description: 'Build a tool that takes a sentence and outputs: total characters, word count, the longest word, whether it is a palindrome, the reversed sentence, and how many vowels it contains.',
      hints: [
        'Use split(" ") to get words',
        'Use a loop to count characters and vowels',
        'For palindrome: compare original with reversed (use StringBuilder.reverse())'
      ]
    }
  },
  {
    id: 'jdbc',
    number: 12,
    title: 'JDBC',
    subtitle: 'Connecting Java to Databases',
    difficulty: 4,
    estimatedHours: 6,
    theory: [
      {
        heading: 'What is JDBC?',
        body: 'JDBC (Java Database Connectivity) is Java\'s standard way to talk to databases. With JDBC, your Java code can read from and write to MySQL, PostgreSQL, SQLite, Oracle — any database with a JDBC driver.'
      },
      {
        heading: 'The Four Steps',
        body: '1. Load the JDBC driver. 2. Get a Connection using a URL, username, password. 3. Create a Statement (or PreparedStatement). 4. Execute the SQL and process the ResultSet.'
      },
      {
        heading: 'PreparedStatement vs Statement',
        body: 'Statement is simple but unsafe — vulnerable to SQL injection if you build queries from user input. PreparedStatement uses placeholders (?) that are properly escaped. ALWAYS use PreparedStatement with user input.'
      },
      {
        heading: 'CRUD Operations',
        body: 'Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). These are the four basic things you do with database records. Every database app is some combination of these.'
      },
    ],
    codeExamples: [
      {
        title: 'Connecting to a database',
        code: `import java.sql.*;

public class DbConnect {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/uniuyo_db";
        String user = "root";
        String password = "your_password";

        try {
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Connected!");
            conn.close();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
        explanation: 'DriverManager opens the connection. The URL specifies database type, host, port, and database name. Always close connections.'
      },
      {
        title: 'INSERT with PreparedStatement',
        code: `String sql = "INSERT INTO students (matric, name, gpa) VALUES (?, ?, ?)";

try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setString(1, "22/CYB/001");
    ps.setString(2, "Josebert Sunday");
    ps.setDouble(3, 4.85);

    int rowsInserted = ps.executeUpdate();
    System.out.println(rowsInserted + " row(s) inserted");
}`,
        explanation: 'The ? placeholders are filled with set methods. This prevents SQL injection. executeUpdate returns how many rows were affected.'
      },
      {
        title: 'SELECT and ResultSet',
        code: `String sql = "SELECT matric, name, gpa FROM students WHERE gpa > ?";

try (PreparedStatement ps = conn.prepareStatement(sql)) {
    ps.setDouble(1, 4.0);
    ResultSet rs = ps.executeQuery();

    while (rs.next()) {
        String matric = rs.getString("matric");
        String name = rs.getString("name");
        double gpa = rs.getDouble("gpa");

        System.out.println(matric + " - " + name + " (" + gpa + ")");
    }
}`,
        explanation: 'ResultSet is a cursor over the results. rs.next() moves to the next row and returns true if one exists. getString/getDouble fetches columns.'
      },
      {
        title: 'UPDATE and DELETE',
        code: `// UPDATE
String updateSql = "UPDATE students SET gpa = ? WHERE matric = ?";
PreparedStatement up = conn.prepareStatement(updateSql);
up.setDouble(1, 4.90);
up.setString(2, "22/CYB/001");
up.executeUpdate();

// DELETE
String deleteSql = "DELETE FROM students WHERE matric = ?";
PreparedStatement del = conn.prepareStatement(deleteSql);
del.setString(1, "22/CYB/099");
del.executeUpdate();`,
        explanation: 'UPDATE and DELETE both use executeUpdate. Always include a WHERE clause — without it, UPDATE/DELETE affects EVERY row.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Why should you use PreparedStatement instead of Statement?',
        options: ['It is shorter', 'It prevents SQL injection and is more efficient', 'It is required by Java', 'It runs faster'],
        correctIndex: 1,
        explanation: 'PreparedStatement properly escapes user input, blocking SQL injection. It also pre-compiles the query, which is faster for repeated execution.'
      },
      {
        question: 'What does rs.next() do?',
        options: ['Closes the ResultSet', 'Moves to the next row, returns true if one exists', 'Skips a row', 'Counts the rows'],
        correctIndex: 1,
        explanation: 'rs.next() advances the cursor. Returns true if there is another row, false at the end.'
      },
      {
        question: 'What goes wrong if you forget the WHERE clause in an UPDATE?',
        options: ['Syntax error', 'Updates only the first row', 'Updates EVERY row in the table', 'Nothing — Java prevents it'],
        correctIndex: 2,
        explanation: 'Without WHERE, the update applies to all rows. Always double-check WHERE clauses before executing UPDATE or DELETE.'
      },
    ],
    playground: "// JDBC needs a live database connection, which cannot run in this sandbox.\n// This snippet shows the structure. Run it locally in NetBeans with a real DB.\npublic class Main {\n    public static void main(String[] args) {\n        String sql = \"SELECT name, gpa FROM students WHERE gpa > ?\";\n        System.out.println(\"Query ready: \" + sql);\n        System.out.println(\"(Connect to a real database in NetBeans to execute)\");\n    }\n}",
    miniProject: {
      title: 'Student Database App',
      description: 'Build a console app connected to MySQL (or SQLite for simplicity). Menu: Add student, view all, search by matric, update GPA, delete student. Use PreparedStatement throughout.',
      hints: [
        'For simplicity, use SQLite — no server setup needed',
        'Create a Student table with: matric (PK), name, department, gpa',
        'Wrap each operation in a separate method'
      ]
    }
  },
  {
    id: 'gui',
    number: 13,
    title: 'GUI Programming',
    subtitle: 'Java Swing Desktop Apps',
    difficulty: 4,
    estimatedHours: 6,
    theory: [
      {
        heading: 'What is a GUI?',
        body: 'A Graphical User Interface is the visual part of your app — windows, buttons, text fields, menus. Java Swing is the classic Java toolkit for building desktop GUIs. NetBeans makes this even easier with its drag-and-drop GUI Designer.'
      },
      {
        heading: 'Event-Driven Programming',
        body: 'GUI programs do not run top-to-bottom. They wait for events — clicks, key presses, window resizes — and respond to each. Your job is to write the response code (event listeners).'
      },
      {
        heading: 'Common Components',
        body: 'JFrame (window), JPanel (container for grouping), JButton, JLabel (text), JTextField (single-line input), JTextArea (multi-line), JComboBox (dropdown), JCheckBox, JRadioButton.'
      },
      {
        heading: 'Layout Managers',
        body: 'Layout managers decide WHERE components go. BorderLayout (5 zones: N, S, E, W, Center). FlowLayout (left to right, wraps). GridLayout (rows × columns). BoxLayout (vertical or horizontal stack).'
      },
      {
        heading: 'NetBeans GUI Designer',
        body: 'NetBeans lets you drag components onto a form and set properties visually. Behind the scenes it generates the Swing code. You write event handlers by double-clicking components.'
      },
    ],
    codeExamples: [
      {
        title: 'Basic window',
        code: `import javax.swing.*;

public class MyApp {
    public static void main(String[] args) {
        JFrame frame = new JFrame("My First Swing App");
        frame.setSize(400, 300);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);  // center

        JLabel label = new JLabel("Welcome to UniUyo", JLabel.CENTER);
        frame.add(label);

        frame.setVisible(true);
    }
}`,
        explanation: 'JFrame is the window. setVisible(true) shows it. EXIT_ON_CLOSE ends the program when the window is closed.'
      },
      {
        title: 'Button with event listener',
        code: `import javax.swing.*;
import java.awt.event.*;

public class ButtonDemo {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Click me!");
        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JButton button = new JButton("Press here");
        JLabel label = new JLabel("Not pressed yet");

        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                label.setText("Button was clicked!");
            }
        });

        JPanel panel = new JPanel();
        panel.add(button);
        panel.add(label);
        frame.add(panel);

        frame.setVisible(true);
    }
}`,
        explanation: 'addActionListener attaches an event handler. The actionPerformed method runs when the button is clicked.'
      },
      {
        title: 'Input form',
        code: `JFrame frame = new JFrame("Student Form");
frame.setSize(400, 250);
frame.setLayout(new java.awt.GridLayout(4, 2, 10, 10));

JTextField nameField = new JTextField();
JTextField matricField = new JTextField();
JButton submit = new JButton("Submit");
JLabel result = new JLabel("");

frame.add(new JLabel("Name:"));
frame.add(nameField);
frame.add(new JLabel("Matric:"));
frame.add(matricField);
frame.add(submit);
frame.add(result);

submit.addActionListener(e -> {
    String name = nameField.getText();
    String matric = matricField.getText();
    result.setText("Registered: " + name + " (" + matric + ")");
});

frame.setVisible(true);`,
        explanation: 'GridLayout arranges in rows and columns. The arrow syntax (e -> { ... }) is a lambda — a shorter way to write event listeners.'
      },
      {
        title: 'JOptionPane — quick dialogs',
        code: `// Info message
JOptionPane.showMessageDialog(null, "Saved successfully!");

// Yes/No question
int answer = JOptionPane.showConfirmDialog(null,
    "Delete this student?", "Confirm", JOptionPane.YES_NO_OPTION);

if (answer == JOptionPane.YES_OPTION) {
    System.out.println("Deleting...");
}

// Input prompt
String name = JOptionPane.showInputDialog("Enter your name:");
System.out.println("Hello, " + name);`,
        explanation: 'JOptionPane gives you pop-up dialogs without building a whole window. Great for messages, confirmations, and quick input.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which method makes a JFrame visible?',
        options: ['frame.show()', 'frame.display()', 'frame.setVisible(true)', 'frame.open()'],
        correctIndex: 2,
        explanation: 'setVisible(true) shows the window. setVisible(false) hides it.'
      },
      {
        question: 'How do you respond to a button click?',
        options: ['Override the click() method', 'Add an ActionListener', 'Use a while loop', 'It happens automatically'],
        correctIndex: 1,
        explanation: 'addActionListener attaches code to run when the button is clicked. The actionPerformed method contains your response.'
      },
      {
        question: 'What does GridLayout(3, 2) create?',
        options: ['3 columns, 2 rows', '3 rows, 2 columns', 'A 3x2 image', 'A grid of 3 by 2 pixels'],
        correctIndex: 1,
        explanation: 'GridLayout(rows, columns). So (3, 2) is 3 rows × 2 columns = 6 cells.'
      },
    ],
    playground: "// Swing GUIs open a window, which cannot display in this sandbox.\n// This logic-only version shows the calculation behind a grade calculator.\n// Build the real GUI in NetBeans.\npublic class Main {\n    public static void main(String[] args) {\n        double[] scores = {85, 90, 78, 92, 88};\n        double total = 0;\n        for (double s : scores) total += s;\n        double avg = total / scores.length;\n        System.out.println(\"Average: \" + avg);\n        System.out.println(\"Grade: \" + (avg >= 70 ? \"A\" : avg >= 60 ? \"B\" : \"C\"));\n    }\n}",
    miniProject: {
      title: 'GUI Grade Calculator',
      description: 'Build a Swing app with: input fields for student name, 5 course scores. A "Calculate" button. On click, show: total, average, letter grade. Use JOptionPane for errors (e.g., score out of range).',
      hints: [
        'Use NetBeans GUI Designer for fast layout',
        'Use Double.parseDouble() to convert text fields to numbers — wrap in try-catch',
        'Display results in a JLabel or JTextArea'
      ]
    }
  }
];

export const getModuleById = (id) => modules.find(m => m.id === id);
export const getModuleByNumber = (n) => modules.find(m => m.number === n);
