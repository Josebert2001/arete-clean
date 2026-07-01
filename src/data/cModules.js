// All C programming module content
// Each module: id, number, title, subtitle, theory[], codeExamples[], practiceQuestions[], playground, miniProject, difficulty, estimatedHours

export const cModules = [
  {
    id: 'c-foundations',
    number: 1,
    title: 'C Foundations',
    subtitle: 'What is C, Compilation, and Your First Program',
    difficulty: 1,
    estimatedHours: 3,
    theory: [
      {
        heading: 'What is C?',
        body: 'C is a general-purpose, procedural programming language created by Dennis Ritchie at Bell Labs in 1972. It is one of the most influential languages ever written — the Linux kernel, Python interpreter, and many operating systems are built in C. C gives you direct control over memory and hardware, making it extremely fast and portable.'
      },
      {
        heading: 'How C Programs Are Compiled',
        body: 'C source code (.c files) is compiled into machine code by a compiler such as GCC. The command gcc hello.c -o hello translates your code into an executable binary. Unlike Java, there is no virtual machine — the output runs directly on the CPU. This is why C programs are among the fastest that exist.'
      },
      {
        heading: 'The Structure of a C Program',
        body: 'Every C program must have a main() function — that is where execution begins. The #include <stdio.h> directive pulls in the Standard Input/Output library, which provides printf() and scanf(). Comments are written with // for single lines or /* ... */ for blocks.'
      },
      {
        heading: 'printf() and Format Specifiers',
        body: 'printf() prints formatted text to the console. You embed format specifiers inside the string to print variables: %d for integers, %f for floats, %lf for doubles, %c for characters, and %s for strings. For example, printf("%d items cost %.2f\\n", 3, 9.99) prints "3 items cost 9.99".'
      }
    ],
    codeExamples: [
      {
        title: 'Hello, World in C',
        code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        explanation: '#include <stdio.h> imports the standard I/O library. main() is the entry point. printf prints to the screen. return 0 signals the OS that the program succeeded. Compile with: gcc hello.c -o hello'
      },
      {
        title: 'printf with format specifiers',
        code: `#include <stdio.h>

int main() {
    int age = 20;
    float gpa = 4.75f;
    char grade = 'A';
    char name[] = "Josebert";

    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);
    return 0;
}`,
        explanation: 'Each %specifier in the format string is replaced by the matching argument. %.2f limits a float to 2 decimal places. \\n is the newline escape sequence.'
      },
      {
        title: 'Comments in C',
        code: `#include <stdio.h>

/* This is a multi-line comment.
   It can span several lines.
   Often used for file headers. */

int main() {
    // This is a single-line comment
    int x = 10; // inline comment

    printf("x = %d\\n", x); /* prints the value */
    return 0;
}`,
        explanation: '// comments run to the end of the line. /* */ comments can span multiple lines. Comments are ignored by the compiler — they are only for humans reading the code.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which GCC command compiles hello.c into an executable named hello?',
        options: ['gcc hello', 'compile hello.c hello', 'gcc -run hello.c', 'gcc hello.c -o hello'],
        correctIndex: 3,
        explanation: 'gcc hello.c -o hello tells GCC to compile hello.c and output (-o) an executable named hello.'
      },
      {
        question: 'What does #include <stdio.h> do?',
        options: ['Imports the standard input/output library', 'Starts running the program from the main function', 'Declares a variable', 'Ends the program'],
        correctIndex: 0,
        explanation: '#include <stdio.h> includes the Standard I/O header, which provides printf, scanf, and other I/O functions.'
      },
      {
        question: 'Which format specifier is used to print an integer with printf()?',
        options: ['%f', '%d', '%s', '%c'],
        correctIndex: 1,
        explanation: '%d is the format specifier for integers. %f is for floats, %s for strings, %c for characters.'
      },
      {
        question: 'What does return 0; at the end of main() indicate?',
        options: ['The program will restart', 'There was an error', 'The program finished successfully', 'Nothing — it is purely optional decorative syntax'],
        correctIndex: 2,
        explanation: 'By convention, returning 0 from main tells the operating system that the program exited normally without errors. Non-zero values indicate errors.'
      },
      {
        question: 'Which of the following is a valid single-line comment in C?',
        options: ['# this is a comment', '-- this is a comment', '** this is a comment', '// this is a comment'],
        correctIndex: 3,
        explanation: '// starts a single-line comment in C. /* ... */ is used for multi-line comments.'
      },
      {
        question: 'Which format specifier MUST be used with scanf() to read a double-precision floating point value?',
        options: ['%lf', '%d', '%f', '%lld'],
        correctIndex: 0,
        explanation: '%lf is required for scanf when reading a double — using %f tells scanf to read a float and storing it through a double* is undefined behaviour. In printf, both %f and %lf work for double because float is promoted to double in variadic calls.'
      },
      {
        question: 'Which of the following correctly starts the main function in C?',
        options: ['void main[]', 'int main()', 'function main()', 'start main()'],
        correctIndex: 1,
        explanation: 'int main() is the standard C entry point. It returns an int (exit code). Older code sometimes uses void main() but int main() is the standard.'
      }
    ],
    playground: `#include <stdio.h>

int main() {
    char name[] = "Josebert";
    int age = 21;
    float gpa = 4.85f;

    printf("Name : %s\\n", name);
    printf("Age  : %d\\n", age);
    printf("GPA  : %.2f\\n", gpa);
    return 0;
}`,
    miniProject: {
      title: 'Personal Profile Card',
      description: 'Write a C program that prints a formatted profile card to the console. Include your name, age, department, year of study, and GPA. Use printf with the correct format specifiers for each data type.',
      hints: [
        'Use %s for strings, %d for integers, %.2f for GPA with 2 decimal places',
        'Use \\n to move to a new line after each field',
        'Add a decorative border using printf("==========\\n")',
        'Store each value in the correct variable type before printing'
      ]
    }
  },

  {
    id: 'c-variables',
    number: 2,
    title: 'Variables and Data Types',
    subtitle: 'int, float, double, char, const, and scanf()',
    difficulty: 1,
    estimatedHours: 3,
    theory: [
      {
        heading: 'Primitive Data Types in C',
        body: 'C has four fundamental data types: int stores whole numbers (typically 4 bytes, range roughly -2 billion to 2 billion), float stores 32-bit decimal numbers, double stores 64-bit decimal numbers with greater precision, and char stores a single character (1 byte). You must always declare a variable\'s type before using it.'
      },
      {
        heading: 'Variable Declaration and Initialisation',
        body: 'A variable is declared by writing its type followed by a name: int count; You can optionally initialise it at declaration: int count = 0; Uninitialised variables contain garbage values — whatever bytes happen to be in memory at that address. Always initialise variables before reading them.'
      },
      {
        heading: 'Constants: const and #define',
        body: 'Use const to declare a variable whose value cannot change: const float PI = 3.14159f; The compiler enforces that PI is never reassigned. #define is a preprocessor directive: #define MAX_SIZE 100 — it performs a text substitution before compilation, replacing every occurrence of MAX_SIZE with 100. Neither approach uses memory the same way as a regular variable.'
      },
      {
        heading: 'Reading Input with scanf()',
        body: 'scanf() reads formatted input from the keyboard. It uses the same format specifiers as printf but requires the address of the variable using the & operator: scanf("%d", &age). For strings (char arrays), do not use & because the array name is already an address. Always match the specifier to the variable type to avoid undefined behaviour.'
      }
    ],
    codeExamples: [
      {
        title: 'Declaring and using variables',
        code: `#include <stdio.h>

int main() {
    int age = 20;
    float height = 1.75f;
    double salary = 250000.50;
    char initial = 'J';

    printf("Age     : %d\\n", age);
    printf("Height  : %.2f m\\n", height);
    printf("Salary  : %.2lf\\n", salary);
    printf("Initial : %c\\n", initial);
    return 0;
}`,
        explanation: 'Each variable is declared with its type. float literals use the f suffix. double does not need a suffix. char values are enclosed in single quotes.'
      },
      {
        title: 'Constants with const and #define',
        code: `#include <stdio.h>

#define MAX_STUDENTS 50
#define SCHOOL_NAME "UniUyo"

int main() {
    const float PI = 3.14159f;
    const int PASSING_SCORE = 40;

    printf("School       : %s\\n", SCHOOL_NAME);
    printf("Max students : %d\\n", MAX_STUDENTS);
    printf("PI           = %.5f\\n", PI);
    printf("Passing score: %d\\n", PASSING_SCORE);

    /* PI = 3.0;  -- compile error: cannot change a const */
    return 0;
}`,
        explanation: '#define constants are substituted at the preprocessor stage — they have no type. const variables have a type and are enforced by the compiler. Both cannot be changed after being set.'
      },
      {
        title: 'Reading user input with scanf()',
        code: `#include <stdio.h>

int main() {
    int age;
    float gpa;
    char name[50];

    printf("Enter your name: ");
    scanf("%49s", name);       /* reads one word; no & needed for arrays */

    printf("Enter your age: ");
    scanf("%d", &age);         /* & required for non-array variables */

    printf("Enter your GPA: ");
    scanf("%f", &gpa);

    printf("\\nHello %s! Age: %d, GPA: %.2f\\n", name, age, gpa);
    return 0;
}`,
        explanation: '& gives scanf the memory address of the variable so it can write the value there. For char arrays, the name itself is already a pointer to the first element, so no & is needed.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which data type would you use to store the value 3.14159265358979 with maximum precision?',
        options: ['int', 'float', 'double', 'boolean'],
        correctIndex: 2,
        explanation: 'double provides 64-bit double-precision floating point, giving about 15-17 significant digits. float only gives about 6-7 significant digits.'
      },
      {
        question: 'What is the correct way to read an integer from the user into a variable called age?',
        options: ['scanf("%d", age)', 'scanf(age)', 'input("%d", &age)', 'scanf("%d", &age)'],
        correctIndex: 3,
        explanation: 'scanf needs the address of the variable (&age) so it knows where in memory to store the value. Passing age without & passes the value, not the address.'
      },
      {
        question: 'What happens if you read an uninitialised int variable in C?',
        options: ['You get a garbage/undefined value', 'It returns 0 automatically', 'The program refuses to compile at all', 'It returns -1'],
        correctIndex: 0,
        explanation: 'Uninitialised variables in C contain whatever bytes are already in that memory location — effectively a garbage value. Always initialise variables before use.'
      },
      {
        question: 'Which of the following correctly declares a float constant named TAX_RATE?',
        options: ['constant float TAX_RATE = 0.075;', 'const float TAX_RATE = 0.075f;', 'float const = 0.075;', '#const TAX_RATE = 0.075'],
        correctIndex: 1,
        explanation: 'const goes before the type, followed by the variable name and value. The f suffix marks the literal as a float.'
      },
      {
        question: 'What does #define PI 3.14159 do?',
        options: ['Declares a floating-point variable named PI and immediately assigns it a value', 'Creates a constant integer', 'Instructs the preprocessor to replace PI with 3.14159 everywhere in the code', 'Imports a math library'],
        correctIndex: 2,
        explanation: '#define is a preprocessor directive. Before compilation, every occurrence of PI in the source code is textually replaced with 3.14159.'
      },
      {
        question: 'Which format specifier reads a float with scanf()?',
        options: ['%lf', '%d', '%c', '%f'],
        correctIndex: 3,
        explanation: '%f is used with scanf() to read a float. For double with scanf you must use %lf, not %f.'
      },
      {
        question: 'How many bytes does a char typically occupy in C?',
        options: ['1', '4', '2', '8'],
        correctIndex: 0,
        explanation: 'A char is guaranteed to be exactly 1 byte (8 bits) in C. It can store values from -128 to 127 (signed) or 0 to 255 (unsigned).'
      }
    ],
    playground: `#include <stdio.h>

#define UNIVERSITY "University of Uyo"

int main() {
    const int YEAR = 2025;
    char dept[30] = "Cybersecurity";
    int level = 200;
    double cgpa = 4.85;

    printf("University : %s\\n", UNIVERSITY);
    printf("Department : %s\\n", dept);
    printf("Level      : %d\\n", level);
    printf("Year       : %d\\n", YEAR);
    printf("CGPA       : %.2lf\\n", cgpa);
    return 0;
}`,
    miniProject: {
      title: 'Student Details Collector',
      description: 'Write a C program that asks the user to enter their name, age, department, level, and GPA. Store each in the correct variable type and print a formatted summary. Define the passing GPA (1.5) as a const and print whether the student is in good standing.',
      hints: [
        'Use a char array for name and department',
        'Use int for age and level, double for GPA',
        'Use const double PASSING_GPA = 1.5 and compare with an if statement',
        'Format the output table-style using spaces or \\t for alignment'
      ]
    }
  },

  {
    id: 'c-operators',
    number: 3,
    title: 'Operators in C',
    subtitle: 'Arithmetic, Relational, Logical, Bitwise, and More',
    difficulty: 2,
    estimatedHours: 3,
    theory: [
      {
        heading: 'Arithmetic and Assignment Operators',
        body: 'C supports the standard arithmetic operators: + (add), - (subtract), * (multiply), / (divide), and % (modulo — remainder). Integer division truncates: 7 / 2 gives 3, not 3.5. The modulo operator % only works on integers. Compound assignment operators combine an operation with assignment: +=, -=, *=, /=, %= all modify the variable in place.'
      },
      {
        heading: 'Relational and Logical Operators',
        body: 'Relational operators compare two values and produce 1 (true) or 0 (false): == (equal), != (not equal), <, >, <=, >=. Logical operators combine boolean results: && (AND — both must be true), || (OR — at least one true), ! (NOT — flips true/false). In C, any non-zero value is considered true and 0 is false.'
      },
      {
        heading: 'Bitwise Operators',
        body: 'Bitwise operators work directly on the binary representation of integers: & (AND), | (OR), ^ (XOR), ~ (bitwise NOT/complement), << (left shift), >> (right shift). Left shifting by n is equivalent to multiplying by 2^n; right shifting by n divides by 2^n. Bitwise operations are extremely fast and widely used in embedded systems, networking, and cryptography.'
      },
      {
        heading: 'sizeof, Type Casting, and the Ternary Operator',
        body: 'sizeof(type) returns the size in bytes of a type or variable at compile time. Type casting converts a value to another type: (double)7 / 2 gives 3.5 whereas 7 / 2 gives 3. The ternary operator is a compact if-else: condition ? value_if_true : value_if_false. For example, max = (a > b) ? a : b assigns the larger of a and b to max.'
      }
    ],
    codeExamples: [
      {
        title: 'Arithmetic and modulo',
        code: `#include <stdio.h>

int main() {
    int a = 17, b = 5;

    printf("a + b = %d\\n", a + b);   /* 22 */
    printf("a - b = %d\\n", a - b);   /* 12 */
    printf("a * b = %d\\n", a * b);   /* 85 */
    printf("a / b = %d\\n", a / b);   /* 3  (integer division) */
    printf("a %% b = %d\\n", a % b);  /* 2  (remainder) */

    /* Cast to double for real division */
    printf("a / b (real) = %.2f\\n", (double)a / b); /* 3.40 */
    return 0;
}`,
        explanation: 'Integer division truncates the decimal part. Use %% inside printf to print a literal percent sign. Casting one operand to double forces floating-point division.'
      },
      {
        title: 'Bitwise operators',
        code: `#include <stdio.h>

int main() {
    unsigned int x = 12; /* 00001100 in binary */
    unsigned int y = 10; /* 00001010 in binary */

    printf("x & y  = %u\\n", x & y);   /* AND  = 8  (00001000) */
    printf("x | y  = %u\\n", x | y);   /* OR   = 14 (00001110) */
    printf("x ^ y  = %u\\n", x ^ y);   /* XOR  = 6  (00000110) */
    printf("x << 1 = %u\\n", x << 1);  /* left shift  = 24 */
    printf("x >> 1 = %u\\n", x >> 1);  /* right shift = 6  */
    return 0;
}`,
        explanation: 'Each bit is processed independently. Left shift multiplies by 2; right shift divides by 2. XOR is useful for toggling bits and simple encryption schemes.'
      },
      {
        title: 'sizeof, casting, and ternary operator',
        code: `#include <stdio.h>

int main() {
    printf("sizeof(int)    = %zu bytes\\n", sizeof(int));
    printf("sizeof(double) = %zu bytes\\n", sizeof(double));
    printf("sizeof(char)   = %zu bytes\\n", sizeof(char));

    /* Type casting */
    int total = 95, count = 4;
    double average = (double)total / count;
    printf("Average = %.2f\\n", average);  /* 23.75 */

    /* Ternary operator */
    int score = 65;
    char *result = (score >= 40) ? "PASS" : "FAIL";
    printf("Result: %s\\n", result);
    return 0;
}`,
        explanation: '%zu is the correct format specifier for sizeof results (type size_t). Casting total to double before division preserves the decimal part. The ternary selects between two values based on a condition.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the result of 15 % 4 in C?',
        options: ['3.75', '3', '4', '1'],
        correctIndex: 1,
        explanation: '15 % 4 gives the remainder when 15 is divided by 4. 4 goes into 15 three times (12), leaving a remainder of 3.'
      },
      {
        question: 'What does the expression (double)7 / 2 evaluate to?',
        options: ['3', '4', '3.5', '3.50'],
        correctIndex: 2,
        explanation: 'Casting 7 to double makes it 7.0, so the division becomes 7.0 / 2 = 3.5. Without the cast, integer division gives 3.'
      },
      {
        question: 'Which operator is the bitwise XOR in C?',
        options: ['&', '|', '~', '^'],
        correctIndex: 3,
        explanation: '^ is the bitwise XOR operator. & is AND, | is OR, and ~ is the bitwise NOT (one\'s complement).'
      },
      {
        question: 'What does the ternary expression (x > 0) ? "positive" : "non-positive" do?',
        options: ['Returns "positive" if x > 0, otherwise "non-positive"', 'Always returns "positive"', 'Returns 1 or 0', 'This is invalid syntax and will not compile in C'],
        correctIndex: 0,
        explanation: 'The ternary operator evaluates the condition and returns the first value if true, the second if false. It is a compact alternative to if-else.'
      },
      {
        question: 'What is the result of 5 << 2 (left shift 5 by 2 positions)?',
        options: ['10', '20', '7', '2'],
        correctIndex: 1,
        explanation: 'Left shifting by n positions multiplies by 2^n. 5 << 2 = 5 * 4 = 20. In binary: 00000101 becomes 00010100.'
      },
      {
        question: 'What does sizeof(double) typically return on a 64-bit system?',
        options: ['4', '2', '8', '16'],
        correctIndex: 2,
        explanation: 'double is a 64-bit (8-byte) type on nearly all modern systems. int is typically 4 bytes, char is 1 byte.'
      },
      {
        question: 'In C, what integer value represents "true" in a logical expression?',
        options: ['Only the literal 1', 'Only positive values', 'Only the keyword true', 'Any non-zero value'],
        correctIndex: 3,
        explanation: 'C has no built-in boolean type (before stdbool.h). Any non-zero integer is treated as true; 0 is false. This includes negative numbers.'
      }
    ],
    playground: `#include <stdio.h>

int main() {
    int a = 25, b = 7;

    printf("Arithmetic:\\n");
    printf("  %d + %d = %d\\n", a, b, a + b);
    printf("  %d / %d = %d (integer)\\n", a, b, a / b);
    printf("  %d %% %d = %d (remainder)\\n", a, b, a % b);

    printf("\\nBitwise:\\n");
    printf("  %d & %d = %d\\n", a, b, a & b);
    printf("  %d | %d = %d\\n", a, b, a | b);

    int max = (a > b) ? a : b;
    printf("\\nMax of %d and %d = %d\\n", a, b, max);
    return 0;
}`,
    miniProject: {
      title: 'Bitwise Permission Checker',
      description: 'Model a simple file-permission system using bitwise operators. Define READ=4, WRITE=2, EXECUTE=1 using #define. Store a user\'s permissions in an int using bitwise OR. Then check each permission using bitwise AND and print which permissions the user has.',
      hints: [
        'Use #define READ 4, #define WRITE 2, #define EXECUTE 1',
        'Combine permissions with |: int perms = READ | WRITE',
        'Check a permission with &: if (perms & READ) printf("Can read\\n")',
        'Try revoking a permission with &= ~WRITE and check again'
      ]
    }
  },

  {
    id: 'c-control-flow',
    number: 4,
    title: 'Control Flow',
    subtitle: 'if, else, switch, and Decision Making in C',
    difficulty: 2,
    estimatedHours: 3,
    theory: [
      {
        heading: 'if, else if, and else',
        body: 'The if statement evaluates a condition and runs a block of code only if it is true (non-zero). else provides an alternative that runs when the condition is false. else if chains let you test multiple conditions in sequence — the first true one runs and all others are skipped.'
      },
      {
        heading: 'Common Mistake: = vs ==',
        body: 'In C, = is assignment and == is comparison. Writing if (x = 5) assigns 5 to x and then evaluates to true because 5 is non-zero — this is almost always a bug. Always use == inside conditions. Some programmers write if (5 == x) (Yoda conditions) to get a compile error if they accidentally type = instead of ==.'
      },
      {
        heading: 'The switch Statement',
        body: 'switch is cleaner than a long if-else chain when you are testing one variable against many constant values. Each case label marks where to start executing. The break statement exits the switch — without it, execution falls through into the next case. The default case runs if no other case matches, similar to a final else.'
      },
      {
        heading: 'Nested if and the Ternary Operator',
        body: 'if statements can be nested inside other if statements to test multiple related conditions. For simple one-line decisions, the ternary operator (condition ? a : b) is more concise. Nesting more than 2-3 levels deep usually indicates the logic should be restructured into separate functions.'
      }
    ],
    codeExamples: [
      {
        title: 'Grade classification with if-else if-else',
        code: `#include <stdio.h>

int main() {
    int score;
    printf("Enter score (0-100): ");
    scanf("%d", &score);

    if (score >= 70) {
        printf("Grade: A\\n");
    } else if (score >= 60) {
        printf("Grade: B\\n");
    } else if (score >= 50) {
        printf("Grade: C\\n");
    } else if (score >= 40) {
        printf("Grade: D\\n");
    } else {
        printf("Grade: F\\n");
    }
    return 0;
}`,
        explanation: 'C checks each condition from top to bottom. Once a true condition is found, its block runs and all remaining else-if branches are skipped.'
      },
      {
        title: 'switch with break and default',
        code: `#include <stdio.h>

int main() {
    int day;
    printf("Enter day number (1-7): ");
    scanf("%d", &day);

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 6:
        case 7:
            printf("Weekend!\\n");
            break;
        default:
            printf("Weekday (Thu or Fri)\\n");
    }
    return 0;
}`,
        explanation: 'Cases 6 and 7 share the same code block — intentional fall-through. Without break, every case below would also execute.'
      },
      {
        title: 'Nested if and ternary operator',
        code: `#include <stdio.h>

int main() {
    int age, hasID;
    printf("Enter age: ");
    scanf("%d", &age);
    printf("Have student ID? (1=yes 0=no): ");
    scanf("%d", &hasID);

    if (age >= 16) {
        if (hasID) {
            printf("Eligible to register.\\n");
        } else {
            printf("Need a student ID first.\\n");
        }
    } else {
        printf("Too young to register.\\n");
    }

    /* Same logic with ternary */
    char *status = (age >= 16 && hasID) ? "Eligible" : "Not eligible";
    printf("Status: %s\\n", status);
    return 0;
}`,
        explanation: 'Nested if checks a secondary condition inside a primary one. The ternary collapses the entire logic into one expression — useful for simple assignments.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the bug in: if (score = 100) { printf("Perfect!"); }',
        options: ['The condition uses = (assignment) instead of == (comparison)', 'The score variable should really have been declared as a double', 'printf needs a newline', 'There is no bug'],
        correctIndex: 0,
        explanation: 'if (score = 100) assigns 100 to score and evaluates to true because 100 is non-zero. This always executes the block, regardless of the original value of score.'
      },
      {
        question: 'What happens if you forget break at the end of a switch case?',
        options: ['Compilation fails', 'Execution falls through into the next case', 'The program immediately skips straight to the default case', 'The program terminates'],
        correctIndex: 1,
        explanation: 'Without break, C continues executing the code in the next case — this is called fall-through. It can be intentional or a hard-to-find bug.'
      },
      {
        question: 'In C, which of these is evaluated as false?',
        options: ['1', '-5', '0', '100'],
        correctIndex: 2,
        explanation: 'In C, 0 is the only false value. Every other integer — positive or negative — is true.'
      },
      {
        question: 'What does the default case in a switch statement do?',
        options: ['It is required and must be first', 'It runs always before other cases', 'It runs only if there are no break statements in the switch', 'It runs when no case label matches the switch expression'],
        correctIndex: 3,
        explanation: 'default is optional and typically placed last. It executes when none of the case values match the switch expression.'
      },
      {
        question: 'Which condition correctly checks if score is between 50 and 59 inclusive?',
        options: ['if (score >= 50 && score <= 59)', 'if (50 < score < 59)', 'if (score >= 50 || score <= 59)', 'if (score == 50-59)'],
        correctIndex: 0,
        explanation: 'C does not support chained comparisons like 50 < score < 59. Use && to combine two separate conditions.'
      },
      {
        question: 'What does: char *msg = (x % 2 == 0) ? "even" : "odd"; do?',
        options: ['Calls a function that is named either even or odd depending on x', 'Assigns "even" to msg if x is divisible by 2, else "odd"', 'Always assigns "even"', 'This is a compile error'],
        correctIndex: 1,
        explanation: 'x % 2 == 0 checks for even numbers. The ternary operator selects "even" if true, "odd" if false, and stores the result in msg.'
      },
      {
        question: 'How many else if blocks can you chain after an if statement in C?',
        options: ['Only 1', 'Only 3', 'As many as needed', 'Up to a maximum of 10'],
        correctIndex: 2,
        explanation: 'There is no language limit on the number of else if branches. In practice, more than 4-5 branches often suggests a switch or lookup table would be cleaner.'
      }
    ],
    playground: `#include <stdio.h>

int main() {
    int score = 73;

    if (score >= 70) {
        printf("A - Distinction\\n");
    } else if (score >= 60) {
        printf("B - Credit\\n");
    } else if (score >= 50) {
        printf("C - Merit\\n");
    } else if (score >= 40) {
        printf("D - Pass\\n");
    } else {
        printf("F - Fail\\n");
    }

    char *verdict = (score >= 40) ? "PASS" : "FAIL";
    printf("Overall: %s\\n", verdict);
    return 0;
}`,
    miniProject: {
      title: 'University Grade and GPA Calculator',
      description: 'Write a C program that reads a course score (0-100), converts it to a letter grade (A/B/C/D/F), maps that grade to grade points (A=5, B=4, C=3, D=2, F=0), and prints both. Use if-else to determine the grade and switch to look up the grade points.',
      hints: [
        'Use if-else if to determine the letter grade from the score',
        'Then use a switch on the grade character to get the grade points',
        'Validate the input: if score < 0 or > 100, print an error and exit',
        'Print a motivational message using the ternary operator based on whether the student passed'
      ]
    }
  },

  {
    id: 'c-loops',
    number: 5,
    title: 'Loops in C',
    subtitle: 'for, while, do-while, break, and continue',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'The for Loop',
        body: 'The for loop is best when you know in advance how many iterations to perform. Its header has three parts separated by semicolons: initialisation (runs once), condition (checked before each iteration), and update (runs after each iteration). Example: for (int i = 0; i < 10; i++) runs exactly 10 times.'
      },
      {
        heading: 'The while Loop',
        body: 'The while loop checks its condition before each iteration. If the condition is false on the first check, the body never runs. Use while when you do not know how many iterations are needed — only when to stop. An infinite while loop is written as while (1) and must use break to exit.'
      },
      {
        heading: 'The do-while Loop',
        body: 'The do-while loop checks its condition after the body executes, so the body always runs at least once. This is ideal for interactive menus and input validation where you want to display the prompt before checking the answer. Syntax: do { ... } while (condition);'
      },
      {
        heading: 'break, continue, and Nested Loops',
        body: 'break exits the innermost enclosing loop immediately. continue skips the rest of the current iteration and jumps to the loop\'s update step (for) or condition check (while). In nested loops, break and continue only affect the innermost loop. Nested loops are essential for 2D arrays and pattern printing.'
      }
    ],
    codeExamples: [
      {
        title: 'for loop — sum and multiplication table',
        code: `#include <stdio.h>

int main() {
    /* Sum 1 to 100 */
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("Sum 1 to 100 = %d\\n", sum);  /* 5050 */

    /* Multiplication table for 7 */
    printf("\\n7 times table:\\n");
    for (int j = 1; j <= 12; j++) {
        printf("7 x %2d = %3d\\n", j, 7 * j);
    }
    return 0;
}`,
        explanation: 'The %2d and %3d format specifiers pad numbers with spaces for clean alignment. i++ is shorthand for i = i + 1.'
      },
      {
        title: 'while loop and do-while menu',
        code: `#include <stdio.h>

int main() {
    /* while: guess-the-number */
    int secret = 42, guess = 0;
    while (guess != secret) {
        printf("Guess a number: ");
        scanf("%d", &guess);
        if (guess < secret)      printf("Too low!\\n");
        else if (guess > secret) printf("Too high!\\n");
    }
    printf("Correct!\\n");

    /* do-while: menu */
    int choice;
    do {
        printf("\\n1. Add  2. View  3. Exit\\nChoice: ");
        scanf("%d", &choice);
    } while (choice != 3);

    printf("Goodbye!\\n");
    return 0;
}`,
        explanation: 'The while loop keeps asking until the guess is correct. The do-while menu always displays at least once before checking if the user wants to exit.'
      },
      {
        title: 'break, continue, and nested loops',
        code: `#include <stdio.h>

int main() {
    /* break and continue */
    printf("1-10, skipping 5, stopping at 8:\\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) continue;  /* skip 5 */
        if (i == 8) break;     /* stop before 8 */
        printf("%d ", i);
    }
    printf("\\n");

    /* Nested loops — star triangle */
    printf("\\nStar triangle:\\n");
    for (int row = 1; row <= 5; row++) {
        for (int col = 1; col <= row; col++) {
            printf("* ");
        }
        printf("\\n");
    }
    return 0;
}`,
        explanation: 'Output of first loop: 1 2 3 4 6 7. continue jumps back to the for update; break exits the loop entirely. Nested loops let the inner loop run fully for each outer iteration.'
      }
    ],
    practiceQuestions: [
      {
        question: 'How many times does this loop execute: for (int i = 0; i < 5; i++)?',
        options: ['4', '6', '0', '5'],
        correctIndex: 3,
        explanation: 'i starts at 0 and increments to 4 (while i < 5). Values: 0, 1, 2, 3, 4 — that is 5 iterations.'
      },
      {
        question: 'Which loop guarantees its body runs at least once?',
        options: ['do-while', 'for', 'while', 'infinite loop'],
        correctIndex: 0,
        explanation: 'do-while checks the condition after the body, so the body always executes at least once regardless of the condition.'
      },
      {
        question: 'What does continue do inside a for loop?',
        options: ['Exits the loop', 'Skips the rest of the current iteration and goes to the update step', 'Restarts execution of the whole program again from the very beginning', 'Pauses execution'],
        correctIndex: 1,
        explanation: 'continue skips the remaining code in the current iteration and jumps to the for loop\'s update expression (e.g., i++), then re-checks the condition.'
      },
      {
        question: 'What is an infinite loop in C?',
        options: ['A loop that never compiles', 'A loop that always runs exactly one thousand times', 'A loop whose condition never becomes false', 'A loop inside another loop'],
        correctIndex: 2,
        explanation: 'An infinite loop occurs when the condition is always true (such as while(1)). It loops forever unless exited with break or return.'
      },
      {
        question: 'In nested loops, what does break affect?',
        options: ['All loops at once', 'Only the single outermost enclosing loop of them all', 'The entire program', 'Only the innermost loop containing the break'],
        correctIndex: 3,
        explanation: 'break only exits the immediately enclosing loop. To break out of multiple nested levels you need multiple breaks or a flag variable.'
      },
      {
        question: 'What is the output of: for (int i = 1; i <= 3; i++) printf("%d\\n", i * i);',
        options: ['1 4 9', '1 2 3', '3 6 9', '0 1 4'],
        correctIndex: 0,
        explanation: 'i takes values 1, 2, 3. i*i gives 1, 4, 9. Each is printed on its own line due to \\n.'
      },
      {
        question: 'Which loop type is best when the number of iterations is known in advance?',
        options: ['while', 'for', 'do-while', 'switch'],
        correctIndex: 1,
        explanation: 'The for loop is designed for counted iteration — its header neatly packages initialisation, condition, and update, making the count obvious at a glance.'
      }
    ],
    playground: `#include <stdio.h>

int main() {
    /* Print prime numbers from 2 to 50 */
    printf("Primes up to 50: ");
    for (int n = 2; n <= 50; n++) {
        int isPrime = 1;
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                isPrime = 0;
                break;
            }
        }
        if (isPrime) printf("%d ", n);
    }
    printf("\\n");
    return 0;
}`,
    miniProject: {
      title: 'Number Pattern Printer',
      description: 'Write a C program that prints three patterns using nested for loops: (1) a right-angled star triangle of height 5, (2) a number pyramid where row n contains numbers 1 to n, and (3) a 5x5 multiplication table grid.',
      hints: [
        'For the triangle: outer loop controls rows, inner loop prints stars up to the row number',
        'For the number pyramid: inner loop prints j from 1 to i where i is the current row',
        'For the multiplication table: use printf("%4d", i*j) to align numbers in columns',
        'Separate each pattern with a blank line using an extra printf("\\n")'
      ]
    }
  },

  {
    id: 'c-functions',
    number: 6,
    title: 'Functions in C',
    subtitle: 'Definition, Parameters, Return Values, and Recursion',
    difficulty: 2,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Defining and Calling Functions',
        body: 'A function in C has a return type, a name, a parameter list in parentheses, and a body in braces. Functions must be defined or declared (via a prototype) before they are called. A function with return type void performs an action but returns no value. All other functions must have a return statement that matches the declared return type.'
      },
      {
        heading: 'Function Prototypes',
        body: 'A function prototype declares a function\'s signature before its full definition appears in the file. This tells the compiler what return type and parameter types to expect, allowing you to call functions defined later in the file. A prototype ends with a semicolon: int add(int a, int b);'
      },
      {
        heading: 'Pass by Value',
        body: 'C passes arguments to functions by value — the function receives a copy of the argument. Changes made to parameters inside the function do not affect the original variables. To allow a function to modify the caller\'s variable, you must pass a pointer (covered in the pointers module).'
      },
      {
        heading: 'Recursion',
        body: 'A recursive function calls itself. Every recursive function needs a base case — a condition where it returns without calling itself again, stopping the chain. Without a base case, the function calls itself indefinitely until the program runs out of stack space and crashes with a stack overflow. Classic examples: factorial (n! = n × (n-1)!), Fibonacci, and binary search.'
      }
    ],
    codeExamples: [
      {
        title: 'Function definition and prototype',
        code: `#include <stdio.h>

/* Prototypes */
int add(int a, int b);
void printSeparator(void);

int main() {
    int result = add(15, 27);
    printf("15 + 27 = %d\\n", result);

    printSeparator();
    printf("Area of circle r=5: %.2f\\n", 3.14159 * 5 * 5);
    printSeparator();
    return 0;
}

int add(int a, int b) {
    return a + b;
}

void printSeparator(void) {
    printf("--------------------\\n");
}`,
        explanation: 'Prototypes at the top allow main to call functions defined below it. void printSeparator(void) takes no arguments. The full definitions appear after main.'
      },
      {
        title: 'Pass by value — copies, not originals',
        code: `#include <stdio.h>

void tryToDouble(int x) {
    x = x * 2;  /* modifies only the LOCAL copy */
    printf("Inside function: x = %d\\n", x);
}

int doubleValue(int x) {
    return x * 2;  /* return the result instead */
}

int main() {
    int num = 10;
    tryToDouble(num);
    printf("After tryToDouble: num = %d\\n", num); /* still 10 */

    int result = doubleValue(num);
    printf("doubleValue returned: %d\\n", result);  /* 20 */
    return 0;
}`,
        explanation: 'tryToDouble cannot change num because it only receives a copy. To get the new value back, return it from the function instead.'
      },
      {
        title: 'Recursion — factorial and Fibonacci',
        code: `#include <stdio.h>

long factorial(int n) {
    if (n <= 1) return 1;          /* base case */
    return n * factorial(n - 1);   /* recursive case */
}

int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    for (int i = 0; i <= 10; i++) {
        printf("%2d! = %ld\\n", i, factorial(i));
    }
    printf("\\nFirst 10 Fibonacci: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    return 0;
}`,
        explanation: 'factorial(5) calls factorial(4) all the way down to factorial(1) which returns 1. The results multiply back up: 1*2*3*4*5 = 120.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the purpose of a function prototype in C?',
        options: ['It runs the function immediately', 'It prevents the function from being called more than once', 'It tells the compiler the return type and parameter types before the full definition', 'It is required only for void functions'],
        correctIndex: 2,
        explanation: 'A prototype (forward declaration) lets you call a function that is defined later in the file. The compiler uses it to type-check all calls.'
      },
      {
        question: 'What happens to the original variable when passed to a function by value?',
        options: ['It is deleted', 'It is modified by the function', 'It is converted to a pointer automatically', 'It is unchanged — the function gets a copy'],
        correctIndex: 3,
        explanation: 'C passes by value: the function receives a copy. Changes to the parameter inside the function do not affect the original variable.'
      },
      {
        question: 'What is the base case in a recursive function?',
        options: ['The condition where the function returns without calling itself again', 'The first call to the function', 'The particular parameter that happens to hold the single largest value overall', 'The return type declaration'],
        correctIndex: 0,
        explanation: 'The base case stops the recursion. Without it, the function calls itself forever until the stack overflows.'
      },
      {
        question: 'What return type should a function have if it performs an action but returns nothing?',
        options: ['int', 'void', 'null', 'empty'],
        correctIndex: 1,
        explanation: 'void is used as the return type when a function does not return a value. You can write return; with no value in a void function.'
      },
      {
        question: 'What is the value of factorial(0) by mathematical convention?',
        options: ['0', 'undefined', '1', '-1'],
        correctIndex: 2,
        explanation: '0! = 1 by mathematical definition. The base case if (n <= 1) return 1; correctly handles both n=0 and n=1.'
      },
      {
        question: 'Which of the following is a valid C function prototype?',
        options: ['function int add(a, b)', 'add(int, int) -> int', 'def add(int a, int b):', 'int add(int a, int b);'],
        correctIndex: 3,
        explanation: 'A C prototype ends with a semicolon and specifies the return type and parameter types. Parameter names are optional in a prototype but the types are required.'
      },
      {
        question: 'What happens if a recursive function has no base case?',
        options: ['It causes a stack overflow crash', 'It returns 0 automatically', 'It runs once', 'The compiler refuses to compile it'],
        correctIndex: 0,
        explanation: 'Without a base case, the function calls itself indefinitely. Each call consumes stack memory; eventually the stack is exhausted and the program crashes.'
      }
    ],
    playground: `#include <stdio.h>

int power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    printf("2^10 = %d\\n", power(2, 10));
    printf("3^5  = %d\\n", power(3, 5));

    printf("\\nPrimes under 30: ");
    for (int i = 2; i < 30; i++) {
        if (isPrime(i)) printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
    miniProject: {
      title: 'Math Utility Library',
      description: 'Build a C program with at least 6 functions: add, subtract, multiply, safeDivide (handles division by zero), power (recursive), and isPrime. Write prototypes for all of them. Call each from main and display the results in a formatted table.',
      hints: [
        'Write prototypes for all functions at the top of the file',
        'safeDivide should check if divisor is 0 and print an error before returning 0',
        'power(base, 0) should return 1 as the base case',
        'isPrime returns 1 (true) or 0 (false) — test it in a loop to list all primes up to 50'
      ]
    }
  },

  {
    id: 'c-arrays-strings',
    number: 7,
    title: 'Arrays and Strings',
    subtitle: '1D Arrays, 2D Arrays, char Arrays, and string.h',
    difficulty: 3,
    estimatedHours: 5,
    theory: [
      {
        heading: '1D Arrays — Declaration and Access',
        body: 'An array is a contiguous block of memory that stores multiple values of the same type. Declare with: int scores[5]; Access elements by index starting at 0: scores[0] is the first element. The last valid index is always size - 1. Accessing out-of-bounds indices is undefined behaviour — C does not perform bounds checking.',
        diagram: 'c-array'
      },
      {
        heading: '2D Arrays',
        body: 'A 2D array is an array of arrays, declared as: int matrix[3][4]; where 3 is the number of rows and 4 is the number of columns. Access with two indices: matrix[row][col]. 2D arrays are stored in row-major order in memory — all elements of row 0 come first, then row 1, and so on.'
      },
      {
        heading: 'Strings as char Arrays',
        body: 'C does not have a built-in string type. Strings are arrays of char terminated by a null character \'\\0\'. The null terminator marks the end of the string. Declare with: char name[20] = "Alice"; — C automatically appends \'\\0\'. The array must be large enough to hold all characters plus the null terminator.'
      },
      {
        heading: 'The string.h Library',
        body: 'The <string.h> header provides standard string functions: strlen() returns the number of characters (excluding \'\\0\'), strcpy() copies a string, strncpy() copies safely with a length limit, strcmp() compares two strings lexicographically (returns 0 if equal), strcat() appends one string to another. Always include <string.h> when using these functions.'
      }
    ],
    codeExamples: [
      {
        title: '1D array operations',
        code: `#include <stdio.h>

int main() {
    int scores[5] = {85, 72, 91, 68, 77};
    int sum = 0, max = scores[0];

    for (int i = 0; i < 5; i++) {
        sum += scores[i];
        if (scores[i] > max) max = scores[i];
    }

    printf("Sum     : %d\\n", sum);
    printf("Average : %.1f\\n", (double)sum / 5);
    printf("Maximum : %d\\n", max);
    return 0;
}`,
        explanation: 'Arrays are zero-indexed. We iterate with a for loop from 0 to size-1. Cast sum to double before dividing to get a decimal average.'
      },
      {
        title: '2D array — student score matrix',
        code: `#include <stdio.h>

int main() {
    int scores[3][4] = {
        {80, 75, 90, 85},
        {60, 55, 70, 65},
        {95, 92, 88, 96}
    };

    for (int row = 0; row < 3; row++) {
        int rowSum = 0;
        for (int col = 0; col < 4; col++) {
            printf("%3d ", scores[row][col]);
            rowSum += scores[row][col];
        }
        printf("| avg: %.1f\\n", (double)rowSum / 4);
    }
    return 0;
}`,
        explanation: 'Nested loops traverse rows then columns. Each row\'s average is calculated and printed at the end of that row.'
      },
      {
        title: 'Strings and string.h functions',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    char first[20] = "Hello";
    char second[20] = "World";
    char result[40];

    printf("Length of first : %zu\\n", strlen(first));
    printf("Length of second: %zu\\n", strlen(second));

    strcpy(result, first);
    strcat(result, " ");
    strcat(result, second);
    printf("Concatenated: %s\\n", result);  /* Hello World */

    /* Compare strings */
    if (strcmp(first, second) == 0) {
        printf("Strings are equal\\n");
    } else {
        printf("Strings are not equal\\n");
    }
    return 0;
}`,
        explanation: 'strcmp returns 0 if strings are equal, negative if first comes before second alphabetically, positive otherwise. Never compare strings with == in C — that compares addresses, not content.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the index of the first element in a C array?',
        options: ['1', '0', '-1', 'depends on the type'],
        correctIndex: 1,
        explanation: 'All C arrays are zero-indexed. The first element is always at index 0, the last is at index (size - 1).'
      },
      {
        question: 'What character marks the end of a C string?',
        options: ["'\\n'", "'\\t'", "'\\0'", "'$'"],
        correctIndex: 2,
        explanation: 'The null character \'\\0\' (ASCII value 0) terminates every C string. All string library functions rely on this sentinel to know where the string ends.'
      },
      {
        question: 'What does strlen("Hello") return?',
        options: ['6', '4', '0', '5'],
        correctIndex: 3,
        explanation: 'strlen returns the number of characters NOT including the null terminator. "Hello" has 5 characters: H, e, l, l, o.'
      },
      {
        question: 'What does strcmp(a, b) return when strings a and b are equal?',
        options: ['0', '1', '-1', 'true'],
        correctIndex: 0,
        explanation: 'strcmp returns 0 for equal strings, a negative value if a comes before b lexicographically, and a positive value if a comes after b.'
      },
      {
        question: 'A char array is declared as char name[10]. How many characters can it store as a string?',
        options: ['10', '9', '11', '8'],
        correctIndex: 1,
        explanation: 'One slot must be reserved for the null terminator \'\\0\'. So a char array of size 10 can hold a string of at most 9 characters.'
      },
      {
        question: 'How do you declare a 2D int array with 4 rows and 3 columns?',
        options: ['int arr[3][4]', 'int arr(4, 3)', 'int arr[4][3]', 'int[4][3] arr'],
        correctIndex: 2,
        explanation: 'The syntax is type name[rows][cols]. So int arr[4][3] has 4 rows and 3 columns. arr[row][col] accesses individual elements.'
      },
      {
        question: 'Which function safely copies at most n characters from source to destination?',
        options: ['strcpy', 'strcat', 'strcasecmp', 'strncpy'],
        correctIndex: 3,
        explanation: 'strncpy(dest, src, n) copies at most n characters, preventing buffer overflow. strcpy copies without a length limit and is unsafe for untrusted input.'
      }
    ],
    playground: `#include <stdio.h>
#include <string.h>

int main() {
    char words[5][20] = {"banana", "apple", "cherry", "date", "elderberry"};
    char temp[20];

    /* Bubble sort strings */
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4 - i; j++) {
            if (strcmp(words[j], words[j+1]) > 0) {
                strcpy(temp, words[j]);
                strcpy(words[j], words[j+1]);
                strcpy(words[j+1], temp);
            }
        }
    }

    printf("Sorted alphabetically:\\n");
    for (int i = 0; i < 5; i++) {
        printf("  %s\\n", words[i]);
    }
    return 0;
}`,
    miniProject: {
      title: 'Student Name and Score Database',
      description: 'Create a program that stores 5 student names (2D char array) and their scores (int array). Read all data from the user, then display the class roster sorted by score from highest to lowest, along with the class average and the highest scorer\'s name.',
      hints: [
        'Use char names[5][30] for names and int scores[5] for scores',
        'Use scanf("%29s", names[i]) inside a loop to read each name safely',
        'Sort by score using bubble sort — swap both the score and the corresponding name together',
        'Calculate average by summing all scores and dividing by 5 as a double'
      ]
    }
  },

  {
    id: 'c-pointers',
    number: 8,
    title: 'Pointers',
    subtitle: 'Memory Addresses, Dereferencing, and Pointer Arithmetic',
    difficulty: 4,
    estimatedHours: 6,
    theory: [
      {
        heading: 'Memory Addresses and the & Operator',
        body: 'Every variable in C lives at a specific location in memory identified by an address — a hexadecimal number. The address-of operator & returns the memory address of a variable. When you call scanf("%d", &age), you are passing scanf the address of age so it can write the value directly there.'
      },
      {
        heading: 'Pointer Variables and the * Operator',
        body: 'A pointer is a variable that stores a memory address. Declare a pointer with: int *ptr; This means ptr holds the address of an int. The dereference operator * reads or writes the value at the address a pointer holds: *ptr = 10 stores 10 at the address in ptr. & gives you an address; * follows an address to the value.',
        diagram: 'c-pointer'
      },
      {
        heading: 'Pointer Arithmetic',
        body: 'You can add or subtract integers from pointers. When you write ptr + 1, C does not add 1 byte — it adds sizeof(the_pointed_type) bytes. So for an int pointer (4 bytes), ptr + 1 advances the address by 4. This is how arrays and pointers are closely related in C.'
      },
      {
        heading: 'Pointers and Arrays, NULL Pointer',
        body: 'An array name is a constant pointer to the first element. int arr[5] — arr equals &arr[0]. You can use pointer arithmetic to traverse an array: *(arr + i) is equivalent to arr[i]. A NULL pointer (value 0) points to nothing. Always initialise pointers to NULL if they do not point to a valid variable, and always check for NULL before dereferencing.',
        diagram: 'c-array'
      }
    ],
    codeExamples: [
      {
        title: 'Address-of and dereference',
        code: `#include <stdio.h>

int main() {
    int x = 42;
    int *ptr = &x;   /* ptr holds the address of x */

    printf("Value of x      : %d\\n", x);
    printf("Address of x    : %p\\n", (void *)&x);
    printf("ptr holds       : %p\\n", (void *)ptr);
    printf("Value at *ptr   : %d\\n", *ptr);

    *ptr = 100;   /* change x through the pointer */
    printf("x after *ptr=100: %d\\n", x);  /* 100 */
    return 0;
}`,
        explanation: '%p prints a pointer in hexadecimal. *ptr = 100 modifies x because ptr holds the address of x. Both ptr and &x contain the same address value.'
      },
      {
        title: 'Pointers as function parameters (simulated pass by reference)',
        code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap : x=%d, y=%d\\n", x, y);
    return 0;
}`,
        explanation: 'By passing &x and &y, swap receives the addresses of the originals. *a and *b dereference them to read and write the actual values, so the change persists after the function returns.'
      },
      {
        title: 'Pointer arithmetic and array traversal',
        code: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;  /* ptr points to arr[0] */

    printf("Using index notation:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    printf("\\nUsing pointer arithmetic:\\n");
    for (int i = 0; i < 5; i++) {
        printf("*(ptr+%d) = %d\\n", i, *(ptr + i));
    }

    int *nullPtr = NULL;
    if (nullPtr == NULL) {
        printf("\\nPointer is NULL — safe to skip\\n");
    }
    return 0;
}`,
        explanation: 'ptr + i moves the pointer i elements forward (not i bytes). arr[i] and *(ptr+i) are exactly equivalent. Checking for NULL before dereferencing prevents crashes.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does the & operator do when applied to a variable?',
        options: ['Returns the memory address of the variable', 'Dereferences the variable', 'Returns the value of the variable', 'Performs a bitwise AND operation on the variable'],
        correctIndex: 0,
        explanation: '& is the address-of operator. &x gives the memory address where x is stored. This is used to create pointers and to pass variables to functions by reference.'
      },
      {
        question: 'What does *ptr do when ptr is a pointer to an int?',
        options: ['Returns the raw memory address that is stored inside ptr', 'Returns the int value at the address stored in ptr', 'Multiplies ptr by something', 'Declares a new pointer'],
        correctIndex: 1,
        explanation: '* in this context is the dereference operator. *ptr reads the value stored at the memory address held by ptr.'
      },
      {
        question: 'If ptr is an int pointer pointing to arr[0], what does (ptr + 2) point to?',
        options: ['2 bytes ahead', 'Element at index 1', 'Element at index 2', 'The address of ptr itself'],
        correctIndex: 2,
        explanation: 'Pointer arithmetic scales by the size of the pointed type. ptr + 2 for an int pointer advances by 2 * sizeof(int) bytes, pointing to arr[2].'
      },
      {
        question: 'What is a NULL pointer?',
        options: ['A pointer with value -1', 'A pointer that points to itself', 'A pointer variable that has not actually been declared anywhere yet', 'A pointer that holds the address 0 (points to nothing valid)'],
        correctIndex: 3,
        explanation: 'NULL is defined as 0 (or (void*)0). A NULL pointer does not point to any valid memory location. Dereferencing NULL causes a segmentation fault.'
      },
      {
        question: 'Which of the following correctly declares a pointer to a double?',
        options: ['double *ptr;', 'double ptr;', 'pointer double *ptr;', '*double ptr;'],
        correctIndex: 0,
        explanation: 'The asterisk goes between the type and the variable name: double *ptr; This declares ptr as a variable that holds the address of a double.'
      },
      {
        question: 'After: int x = 5; int *p = &x; *p = 20; — what is the value of x?',
        options: ['5', '20', '0', 'garbage'],
        correctIndex: 1,
        explanation: '*p = 20 writes 20 to the address that p holds. Since p holds the address of x, x becomes 20.'
      },
      {
        question: 'In C, an array name like arr used in an expression is equivalent to:',
        options: ['The size of the array', 'The value of the very last element of the array', 'A pointer to the first element (&arr[0])', 'A copy of the entire array'],
        correctIndex: 2,
        explanation: 'When used in most expressions, an array name decays to a pointer to its first element. arr == &arr[0] holds true, and arr[i] == *(arr + i).'
      }
    ],
    playground: `#include <stdio.h>

void increment(int *n) {
    (*n)++;
}

int sumArray(int *arr, int size) {
    int total = 0;
    for (int i = 0; i < size; i++) {
        total += *(arr + i);
    }
    return total;
}

int main() {
    int val = 10;
    printf("Before increment: %d\\n", val);
    increment(&val);
    printf("After increment : %d\\n", val);

    int data[] = {5, 10, 15, 20, 25};
    printf("Array sum: %d\\n", sumArray(data, 5));
    return 0;
}`,
    miniProject: {
      title: 'Pointer-Based Array Statistics',
      description: 'Write a C program with functions that accept arrays via pointers: findMin(int *arr, int n), findMax(int *arr, int n), and calcAverage(int *arr, int n). Also write reverseArray(int *arr, int n) that reverses the array in place. Test all four functions on a user-entered array of 10 integers.',
      hints: [
        'Pass arrays as int *arr — the array name decays to a pointer automatically when passed to a function',
        'Use *(arr + i) inside functions to practice pointer arithmetic instead of arr[i]',
        'reverseArray should swap elements at index 0 and n-1, then 1 and n-2, and so on',
        'Write a swap helper function that accepts two int pointers'
      ]
    }
  },

  {
    id: 'c-structs',
    number: 9,
    title: 'Structs and Enums',
    subtitle: 'Custom Data Types, typedef, and Arrays of Structs',
    difficulty: 3,
    estimatedHours: 4,
    theory: [
      {
        heading: 'Defining a struct',
        body: 'A struct (structure) groups variables of different types under one name, creating a custom data type. Declare with the struct keyword: struct Student { char name[50]; int age; double gpa; }; Each member is accessed with the dot operator: student1.gpa = 4.5; Structs are value types — assigning one struct to another copies all members.',
        diagram: 'c-struct'
      },
      {
        heading: 'typedef struct',
        body: 'typedef creates an alias for a type. Combined with struct, it lets you use the struct without repeating the struct keyword every time: typedef struct { char name[50]; double gpa; } Student; Now you can declare Student s1; instead of struct Student s1; This is the most common style in modern C code.'
      },
      {
        heading: 'Pointers to Structs and the -> Operator',
        body: 'When you have a pointer to a struct, you access members using the arrow operator -> instead of the dot. ptr->name is exactly equivalent to (*ptr).name. Pointers to structs are essential when passing structs to functions efficiently — copying a large struct is slow, but passing a pointer is always fast regardless of struct size.'
      },
      {
        heading: 'enum — Named Integer Constants',
        body: 'An enum (enumeration) defines a set of named integer constants: enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }; By default MON=0, TUE=1, etc. You can assign custom values: enum Status { PASS=1, FAIL=0, INCOMPLETE=-1 }; Enums make code more readable and self-documenting than raw magic numbers.'
      }
    ],
    codeExamples: [
      {
        title: 'Defining and using a typedef struct',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    double gpa;
    char department[30];
} Student;

int main() {
    Student s1;
    strcpy(s1.name, "Josebert");
    s1.age = 21;
    s1.gpa = 4.85;
    strcpy(s1.department, "Cybersecurity");

    printf("Name  : %s\\n", s1.name);
    printf("Age   : %d\\n", s1.age);
    printf("GPA   : %.2f\\n", s1.gpa);
    printf("Dept  : %s\\n", s1.department);
    return 0;
}`,
        explanation: 'typedef removes the need to write struct Student every time. Members are accessed with the dot operator. Use strcpy for string members — you cannot assign strings with = after initialisation.'
      },
      {
        title: 'Pointer to struct and the -> operator',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    double gpa;
} Student;

void printStudent(const Student *s) {
    printf("Name: %s, GPA: %.2f\\n", s->name, s->gpa);
}

void updateGPA(Student *s, double newGPA) {
    s->gpa = newGPA;  /* modifies the original */
}

int main() {
    Student st;
    strcpy(st.name, "Amaka");
    st.gpa = 3.5;

    printStudent(&st);
    updateGPA(&st, 4.2);
    printStudent(&st);
    return 0;
}`,
        explanation: 's->gpa is shorthand for (*s).gpa. Passing a pointer avoids copying the entire struct. Changes through the pointer affect the original variable in main.'
      },
      {
        title: 'Array of structs and enum',
        code: `#include <stdio.h>

typedef enum { L100=1, L200, L300, L400, L500 } Level;

typedef struct {
    char name[50];
    double gpa;
    Level level;
} Student;

int main() {
    Student class[3] = {
        {"Josebert", 4.85, L300},
        {"Amaka",    4.20, L200},
        {"Salome",   3.75, L100}
    };

    printf("%-15s %6s %s\\n", "Name", "GPA", "Level");
    printf("------------------------------\\n");
    for (int i = 0; i < 3; i++) {
        printf("%-15s %6.2f  L%d00\\n",
               class[i].name, class[i].gpa, class[i].level);
    }
    return 0;
}`,
        explanation: 'Arrays of structs store multiple records neatly. The enum Level gives L100=1, L200=2, L300=3 etc. automatically. %-15s left-aligns a string in a 15-character field.'
      }
    ],
    practiceQuestions: [
      {
        question: 'How do you access the member "age" of a struct variable named person?',
        options: ['person->age', 'person::age', 'age(person)', 'person.age'],
        correctIndex: 3,
        explanation: 'The dot operator (.) accesses members of a struct variable directly. The arrow operator (->) is used when you have a pointer to a struct.'
      },
      {
        question: 'When do you use the -> operator instead of the . operator?',
        options: ['When accessing a member through a pointer to a struct', 'When the struct has more than 3 members', 'When the member is a string', 'When the struct has been declared using a typedef alias name'],
        correctIndex: 0,
        explanation: '-> dereferences the pointer and accesses the member in one step. ptr->member is equivalent to (*ptr).member.'
      },
      {
        question: 'What does typedef struct { int x; int y; } Point; allow you to do?',
        options: ['Declare a brand new variable that is actually named typedef', 'Use Point as a type name without writing struct each time', 'Create a class with methods', 'Define a function called Point'],
        correctIndex: 1,
        explanation: 'typedef creates an alias. Without it you would write struct Point p1;. With it, Point p1; works directly.'
      },
      {
        question: 'What are the default values assigned to enum members if not specified?',
        options: ['All are -1', 'All are 1', 'Starting from 0, incrementing by 1', 'Random, unpredictable values'],
        correctIndex: 2,
        explanation: 'By default, the first enum member is 0 and each subsequent one is 1 more than the previous. You can override any value with an explicit assignment.'
      },
      {
        question: 'Why is it more efficient to pass a large struct to a function using a pointer?',
        options: ['It is not more efficient — pointers are slower', 'Structs cannot be passed without pointers', 'The C compiler strictly requires pointer passing for all structs', 'Pointers are small (4-8 bytes) regardless of struct size'],
        correctIndex: 3,
        explanation: 'Passing a struct by value copies all its bytes onto the call stack. A pointer is always 4 or 8 bytes regardless of how large the struct is.'
      },
      {
        question: 'How do you correctly assign a string to a char array member of a struct named s?',
        options: ['strcpy(s.name, "Alice")', 's.name = "Alice"', 's.name == "Alice"', 'strset(s.name, "Alice")'],
        correctIndex: 0,
        explanation: 'You cannot assign strings with = in C after declaration. Use strcpy() from <string.h> to copy a string into a char array member.'
      },
      {
        question: 'What is the value of BLUE in: enum Color { RED, GREEN=5, BLUE }?',
        options: ['1', '6', '2', '5'],
        correctIndex: 1,
        explanation: 'RED=0 (default), GREEN=5 (explicit), BLUE=6 (auto-increments from GREEN). Each enum value is one more than the previous unless explicitly set.'
      }
    ],
    playground: `#include <stdio.h>
#include <string.h>

typedef struct {
    char title[60];
    char author[40];
    int year;
    double price;
} Book;

void printBook(const Book *b) {
    printf("  Title : %s\\n", b->title);
    printf("  Author: %s\\n", b->author);
    printf("  Year  : %d\\n", b->year);
    printf("  Price : NGN %.2f\\n\\n", b->price);
}

int main() {
    Book library[2] = {
        {"The C Programming Language", "Kernighan & Ritchie", 1988, 15000.0},
        {"C Programming: A Modern Approach", "K.N. King", 2008, 22000.0}
    };

    printf("Library Catalogue\\n");
    printf("================\\n");
    for (int i = 0; i < 2; i++) {
        printBook(&library[i]);
    }
    return 0;
}`,
    miniProject: {
      title: 'Student Records System',
      description: 'Define a Student struct with name, matricNumber, department, a Level enum (L100=1 through L500=5), and gpa. Create an array of 5 students. Write functions to: print all students, find the student with the highest GPA, and count how many are on the Dean\'s List (GPA >= 4.5).',
      hints: [
        'Define the Level enum before the struct so you can use it as a member type',
        'Pass the student array as Student *students and the count as int n to each function',
        'Use s->gpa and s->name inside functions since you are working through a pointer',
        'In findTopStudent, iterate and track the index of the student with the maximum GPA'
      ]
    }
  },

  {
    id: 'c-file-handling',
    number: 10,
    title: 'File Handling',
    subtitle: 'Reading and Writing Files with FILE*, fopen, and stdio',
    difficulty: 3,
    estimatedHours: 4,
    theory: [
      {
        heading: 'The FILE* Pointer and fopen()/fclose()',
        body: 'File I/O in C uses a FILE pointer (FILE *fp). fopen(filename, mode) opens a file and returns a FILE* or NULL on failure. Always check for NULL before using the pointer. fclose(fp) closes the file and flushes any buffered data to disk. Forgetting fclose can cause data loss or resource leaks.'
      },
      {
        heading: 'File Opening Modes',
        body: 'The mode string controls how the file is opened: "r" reads (file must exist), "w" writes (creates or truncates existing), "a" appends (creates or adds to end). Binary modes add b: "rb", "wb", "ab". In text mode, C handles newline translation; binary mode writes bytes exactly as they are in memory.'
      },
      {
        heading: 'Text File I/O: fprintf, fscanf, fgets, fputs',
        body: 'fprintf(fp, format, ...) writes formatted text to a file — like printf but to a file. fscanf(fp, format, ...) reads formatted data from a file. fgets(buffer, size, fp) reads one line safely (stops at newline or EOF). fputs(str, fp) writes a string to the file. feof(fp) returns non-zero when the end of file has been reached.'
      },
      {
        heading: 'Binary File I/O: fread and fwrite',
        body: 'fread(buffer, size, count, fp) reads count items each of size bytes into buffer. fwrite(buffer, size, count, fp) writes count items of size bytes from buffer. Binary I/O is faster and exact — useful for saving structs directly. Always open binary files with "rb" or "wb" mode.'
      }
    ],
    codeExamples: [
      {
        title: 'Writing and reading a text file',
        code: `#include <stdio.h>

int main() {
    /* Write to file */
    FILE *fp = fopen("students.txt", "w");
    if (fp == NULL) {
        printf("Could not open file!\\n");
        return 1;
    }
    fprintf(fp, "Josebert 4.85\\n");
    fprintf(fp, "Amaka    4.20\\n");
    fprintf(fp, "Salome   3.75\\n");
    fclose(fp);

    /* Read it back */
    char name[30];
    double gpa;
    fp = fopen("students.txt", "r");
    if (fp == NULL) { printf("Error opening file!\\n"); return 1; }

    printf("Records in file:\\n");
    while (fscanf(fp, "%s %lf", name, &gpa) == 2) {
        printf("  %-10s GPA: %.2f\\n", name, gpa);
    }
    fclose(fp);
    return 0;
}`,
        explanation: 'Always check fopen for NULL. fscanf returns the number of items successfully matched; when it can no longer read 2 items (end of file), the loop ends.'
      },
      {
        title: 'fgets for line-by-line reading',
        code: `#include <stdio.h>
#include <string.h>

int main() {
    FILE *fp = fopen("notes.txt", "w");
    fputs("Line one\\n", fp);
    fputs("Line two\\n", fp);
    fputs("Line three\\n", fp);
    fclose(fp);

    fp = fopen("notes.txt", "r");
    char buffer[100];
    int lineNum = 1;

    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        /* Strip trailing newline */
        buffer[strcspn(buffer, "\\n")] = '\\0';
        printf("%d: %s\\n", lineNum++, buffer);
    }
    fclose(fp);
    return 0;
}`,
        explanation: 'fgets reads up to size-1 characters including the newline. strcspn finds the position of \'\\n\' so we replace it with \'\\0\' to strip it. fgets returns NULL at EOF.'
      },
      {
        title: 'Binary file I/O with structs',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[40];
    double gpa;
    int level;
} Student;

int main() {
    Student s1 = {"Josebert", 4.85, 300};
    Student s2 = {"Amaka",    4.20, 200};

    /* Write binary */
    FILE *fp = fopen("students.bin", "wb");
    fwrite(&s1, sizeof(Student), 1, fp);
    fwrite(&s2, sizeof(Student), 1, fp);
    fclose(fp);

    /* Read binary */
    Student temp;
    fp = fopen("students.bin", "rb");
    printf("Binary records:\\n");
    while (fread(&temp, sizeof(Student), 1, fp) == 1) {
        printf("  %-15s GPA %.2f  Level %d\\n",
               temp.name, temp.gpa, temp.level);
    }
    fclose(fp);
    return 0;
}`,
        explanation: 'fwrite saves the raw bytes of each struct. fread reads them back. This is faster than text I/O and preserves exact floating-point values, but the file is not human-readable.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does fopen() return if the file cannot be opened?',
        options: ['0', '-1', 'NULL', 'an empty string'],
        correctIndex: 2,
        explanation: 'fopen returns NULL on failure. Always check the return value before using the FILE pointer to avoid a crash from dereferencing NULL.'
      },
      {
        question: 'Which file mode opens a file for writing, creating it if needed and erasing existing content?',
        options: ['"r"', '"a"', '"r+"', '"w"'],
        correctIndex: 3,
        explanation: '"w" opens for writing, creating the file if it does not exist and truncating (erasing) it if it already exists. "a" appends without erasing.'
      },
      {
        question: 'What is the key difference between fgets() and fscanf() when reading strings?',
        options: ['fgets reads a whole line including spaces; fscanf with %s stops at whitespace', 'No difference', 'fscanf always reads an entire line of input, whereas fgets stops at spaces', 'fgets only works on binary files'],
        correctIndex: 0,
        explanation: 'fgets reads up to the newline or buffer limit and handles spaces. fscanf with %s stops at any whitespace, reading only one word at a time.'
      },
      {
        question: 'What does fclose() do?',
        options: ['Deletes the file', 'Flushes buffered data and releases the file resource', 'Resets the internal file position pointer back to the very beginning', 'Opens the file for reading'],
        correctIndex: 1,
        explanation: 'fclose flushes any data still in the I/O buffer to disk and releases the FILE* resource. Forgetting fclose can result in data loss or resource leaks.'
      },
      {
        question: 'Which function writes a struct\'s raw bytes to a binary file?',
        options: ['fprintf', 'fputs', 'fwrite', 'fflush'],
        correctIndex: 2,
        explanation: 'fwrite(ptr, size, count, fp) writes count items of size bytes each from the memory at ptr. It is used for binary I/O of structs and arrays.'
      },
      {
        question: 'What does feof(fp) return when the end of file has been reached?',
        options: ['0', '-1', 'The NULL pointer value', 'A non-zero value'],
        correctIndex: 3,
        explanation: 'feof returns a non-zero (true) value once EOF has been reached. It returns 0 (false) while there is still data available to read.'
      },
      {
        question: 'Which mode should you use to add data to the end of an existing file without erasing it?',
        options: ['"a"', '"w"', '"r"', '"rw"'],
        correctIndex: 0,
        explanation: '"a" (append mode) positions the write pointer at the end of the file. Existing content is preserved. If the file does not exist, it is created.'
      }
    ],
    playground: `#include <stdio.h>

int main() {
    /* Append to a log file */
    FILE *log = fopen("log.txt", "a");
    if (log == NULL) { printf("Cannot open log\\n"); return 1; }
    fprintf(log, "[2025-06-01] User logged in\\n");
    fprintf(log, "[2025-06-01] File accessed\\n");
    fclose(log);

    /* Display the log */
    char line[100];
    log = fopen("log.txt", "r");
    printf("=== Log File ===\\n");
    while (fgets(line, sizeof(line), log) != NULL) {
        printf("%s", line);
    }
    fclose(log);
    return 0;
}`,
    miniProject: {
      title: 'Student Records File System',
      description: 'Build a menu-driven C program that saves and loads Student structs from a binary file. Menu: (1) Add student, (2) Display all students, (3) Count total students, (4) Exit. Use "ab" to append new records and "rb" to read all records.',
      hints: [
        'Use fopen with "ab" to append one struct at a time without losing previous data',
        'To read all records, open with "rb" and loop with fread until it returns 0',
        'To count records, use fseek(fp, 0, SEEK_END) and ftell(fp) / sizeof(Student)',
        'Always check fopen for NULL and call fclose after every operation'
      ]
    }
  },

  {
    id: 'c-dynamic-memory',
    number: 11,
    title: 'Dynamic Memory Allocation',
    subtitle: 'Stack vs Heap, malloc, calloc, realloc, and free',
    difficulty: 4,
    estimatedHours: 5,
    theory: [
      {
        heading: 'Stack vs Heap Memory',
        body: 'Local variables are allocated on the stack automatically — fast but limited in size and lifetime (destroyed when the function returns). The heap is a large memory pool managed manually by the programmer. Heap memory persists until you explicitly free it with free(). Heap allocation is slower but allows large or variable-sized blocks that outlive the function that created them.',
        diagram: 'c-stack-heap'
      },
      {
        heading: 'malloc() and calloc()',
        body: 'malloc(size) allocates size bytes on the heap and returns a void pointer to the block, or NULL if allocation fails. calloc(count, size) allocates count * size bytes and initialises all bytes to zero — malloc leaves memory uninitialised. Both return void*, which implicitly converts to any other pointer type in C (no cast required, though many codebases cast for readability). Always check the return value for NULL before using the pointer.'
      },
      {
        heading: 'realloc() — Resizing Allocations',
        body: 'realloc(ptr, new_size) resizes a previously allocated block. If it can be expanded in place, the same pointer is returned. Otherwise, a new block is allocated, data is copied, and the old block is freed. Always assign realloc to a temporary pointer first — if it returns NULL, the original allocation is still valid and must be freed separately.'
      },
      {
        heading: 'free() and Memory Leaks',
        body: 'Every malloc/calloc/realloc must have exactly one matching free(ptr). Failing to call free causes a memory leak — the program consumes more memory over time. After freeing, set the pointer to NULL to prevent accidentally using freed memory (dangling pointer). Never free the same pointer twice — double-free causes undefined behaviour.'
      }
    ],
    codeExamples: [
      {
        title: 'malloc and free — dynamic array',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("How many integers? ");
    scanf("%d", &n);

    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    arr = NULL;
    return 0;
}`,
        explanation: 'malloc returns void* — cast it to int*. n * sizeof(int) calculates the exact bytes needed. Always check for NULL. free() releases the heap memory; setting arr = NULL prevents accidental reuse.'
      },
      {
        title: 'calloc — zero-initialised allocation',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    double *data = (double *)calloc(n, sizeof(double));
    if (data == NULL) { printf("calloc failed\\n"); return 1; }

    printf("Initial values (all zero):\\n");
    for (int i = 0; i < n; i++) {
        printf("  data[%d] = %.1f\\n", i, data[i]);
    }

    data[0] = 3.14;
    data[1] = 2.71;
    printf("\\nAfter assignment:\\n");
    for (int i = 0; i < n; i++) {
        printf("  data[%d] = %.2f\\n", i, data[i]);
    }

    free(data);
    data = NULL;
    return 0;
}`,
        explanation: 'calloc(5, sizeof(double)) allocates 5 doubles and zeroes all bytes. This prevents accidental reads of uninitialised memory, unlike malloc.'
      },
      {
        title: 'realloc — growing a dynamic array',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int capacity = 3;
    int *arr = (int *)malloc(capacity * sizeof(int));
    if (!arr) return 1;

    for (int i = 0; i < capacity; i++) arr[i] = i + 1;

    printf("Before realloc (cap %d): ", capacity);
    for (int i = 0; i < capacity; i++) printf("%d ", arr[i]);
    printf("\\n");

    /* Grow the array */
    capacity = 6;
    int *tmp = (int *)realloc(arr, capacity * sizeof(int));
    if (tmp == NULL) {
        free(arr);  /* original still valid; free it */
        return 1;
    }
    arr = tmp;

    for (int i = 3; i < capacity; i++) arr[i] = i + 1;

    printf("After realloc  (cap %d): ", capacity);
    for (int i = 0; i < capacity; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    arr = NULL;
    return 0;
}`,
        explanation: 'We assign realloc to tmp. If realloc returns NULL, arr still points to the original valid memory and we free it gracefully. Never assign realloc directly to the original pointer.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the key difference between malloc() and calloc()?',
        options: ['malloc is faster and calloc is always safer', 'calloc initialises allocated memory to zero; malloc does not', 'malloc allocates on the heap, while calloc allocates on the stack', 'calloc is for arrays only; malloc is for single variables'],
        correctIndex: 1,
        explanation: 'calloc zeroes out all allocated bytes, preventing reads of uninitialised memory. malloc leaves the bytes at whatever value they already have.'
      },
      {
        question: 'What should you do immediately after calling malloc()?',
        options: ['Call realloc()', 'Free the memory', 'Check if the return value is NULL', 'Print out the returned memory address'],
        correctIndex: 2,
        explanation: 'malloc returns NULL if the system cannot allocate the requested memory. Dereferencing NULL causes a crash, so always check before using the pointer.'
      },
      {
        question: 'What is a memory leak in C?',
        options: ['When a pointer variable is declared but not initialised', 'When a stack variable goes out of scope', 'When two pointers point to the same address', 'When heap memory is allocated but never freed'],
        correctIndex: 3,
        explanation: 'A memory leak occurs when heap memory is allocated but never freed with free(). Over time, the program consumes ever-increasing amounts of memory.'
      },
      {
        question: 'Why should you assign realloc\'s return to a temporary pointer instead of directly to the original?',
        options: ['If realloc fails, the original pointer is still valid and must be freed', 'realloc always returns NULL', 'realloc requires a second pointer by definition', 'The C language does not allow you to overwrite an existing pointer'],
        correctIndex: 0,
        explanation: 'If realloc fails it returns NULL but the original allocation remains valid. Assigning directly to the original pointer would overwrite it with NULL, causing a memory leak.'
      },
      {
        question: 'Which header file must you include to use malloc, calloc, realloc, and free?',
        options: ['<stdio.h>', '<stdlib.h>', '<string.h>', '<memory.h>'],
        correctIndex: 1,
        explanation: 'malloc, calloc, realloc, and free are all declared in <stdlib.h>. Always include it when doing dynamic memory allocation.'
      },
      {
        question: 'What happens if you call free() on the same pointer twice?',
        options: ['Nothing — it is harmless', 'The memory is freed twice as fast', 'Undefined behaviour — typically a crash or heap corruption', 'The freed pointer is automatically reset to NULL for you by the C runtime'],
        correctIndex: 2,
        explanation: 'Double-free is undefined behaviour. It often corrupts the heap\'s internal data structures and can cause crashes or security vulnerabilities. Setting ptr = NULL after free() prevents this.'
      },
      {
        question: 'How many bytes does malloc(10 * sizeof(int)) allocate when int is 4 bytes?',
        options: ['10', '4', '14', '40'],
        correctIndex: 3,
        explanation: '10 * sizeof(int) = 10 * 4 = 40 bytes. This pattern is the portable way to allocate space for 10 integers across platforms where int size may vary.'
      }
    ],
    playground: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)calloc(n, sizeof(int));
    if (!arr) { printf("Allocation failed\\n"); return 1; }

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 5;

    printf("Initial : ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    /* Grow to 8 elements */
    int *tmp = (int *)realloc(arr, 8 * sizeof(int));
    if (!tmp) { free(arr); return 1; }
    arr = tmp;

    for (int i = n; i < 8; i++) arr[i] = (i + 1) * 5;

    printf("Grown   : ");
    for (int i = 0; i < 8; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);
    arr = NULL;
    return 0;
}`,
    miniProject: {
      title: 'Dynamic Student Roster',
      description: 'Build a program that manages a dynamically growing list of student names. Start with malloc for 3 names. Allow the user to keep adding names, using realloc to double capacity each time it is full. Print all names and the total count. Free all memory before exiting.',
      hints: [
        'Allocate an array of char pointers: char **names = malloc(capacity * sizeof(char *))',
        'For each name, allocate memory with malloc(strlen(input) + 1) and copy with strcpy',
        'When count == capacity, double capacity and realloc the names array',
        'At the end, loop through and free each name string first, then free the names array itself'
      ]
    }
  },

  {
    id: 'c-preprocessor',
    number: 12,
    title: 'The C Preprocessor',
    subtitle: '#define, #include, Include Guards, and Conditional Compilation',
    difficulty: 3,
    estimatedHours: 3,
    theory: [
      {
        heading: '#define for Constants and Macros',
        body: '#define performs textual substitution before compilation. #define PI 3.14159 replaces every occurrence of PI with 3.14159. Function-like macros take parameters: #define SQUARE(x) ((x)*(x)) — always wrap macro arguments and the entire expression in parentheses to prevent operator-precedence bugs. Unlike const, macros have no type and no scope.'
      },
      {
        heading: '#include with <> vs ""',
        body: '#include <stdio.h> tells the preprocessor to search the system\'s standard include directories for the file. #include "myheader.h" searches the current source directory first, then falls back to system directories. Use angle brackets for standard library headers and double quotes for your own header files.'
      },
      {
        heading: 'Include Guards — Preventing Double Inclusion',
        body: 'When a header is included multiple times (directly or indirectly), it can cause duplicate declaration errors. Include guards prevent this: #ifndef MYHEADER_H / #define MYHEADER_H / (header content) / #endif. On the first inclusion, MYHEADER_H is not defined so the content is processed and the macro is defined. On subsequent inclusions, the macro is already defined and the content is skipped.'
      },
      {
        heading: 'Predefined Macros and Conditional Compilation',
        body: 'C provides built-in macros: __FILE__ expands to the current filename as a string, __LINE__ to the current line number, __DATE__ to the compilation date, __TIME__ to the compilation time. Conditional compilation with #ifdef, #ifndef, #if, #else, and #endif lets you include or exclude code at compile time — useful for debug builds, platform-specific code, and feature flags.'
      }
    ],
    codeExamples: [
      {
        title: '#define constants and function-like macros',
        code: `#include <stdio.h>

#define PI          3.14159265
#define MAX(a, b)   ((a) > (b) ? (a) : (b))
#define SQUARE(x)   ((x) * (x))
#define ABS(x)      ((x) < 0 ? -(x) : (x))

int main() {
    double r = 5.0;
    printf("Circle area : %.4f\\n", PI * SQUARE(r));
    printf("Max(3, 7)   = %d\\n", MAX(3, 7));
    printf("Abs(-42)    = %d\\n", ABS(-42));
    printf("Square(9)   = %d\\n", SQUARE(9));
    return 0;
}`,
        explanation: 'Parentheses around macro arguments are critical. Without them, SQUARE(1+2) expands to 1+2*1+2 = 5 (wrong). With them: (1+2)*(1+2) = 9 (correct).'
      },
      {
        title: 'Include guards in a header file',
        code: `/* ===== student.h ===== */
#ifndef STUDENT_H
#define STUDENT_H

typedef struct {
    char name[50];
    double gpa;
    int level;
} Student;

void printStudent(const Student *s);
double averageGpa(const Student *arr, int count);

#endif /* STUDENT_H */


/* ===== student.c ===== */
#include <stdio.h>
#include "student.h"

void printStudent(const Student *s) {
    printf("%-20s GPA: %.2f  Level: %d\\n",
           s->name, s->gpa, s->level);
}`,
        explanation: 'The #ifndef guard ensures student.h is processed only once even if included from multiple source files. This prevents "type redefinition" compiler errors.'
      },
      {
        title: 'Predefined macros and conditional compilation',
        code: `#include <stdio.h>

/* Comment out the next line to disable debug output */
#define DEBUG

int main() {
    int value = 42;

#ifdef DEBUG
    printf("[DEBUG] %s line %d: value = %d\\n",
           __FILE__, __LINE__, value);
#endif

    printf("Compiled on %s at %s\\n", __DATE__, __TIME__);

#ifdef _WIN32
    printf("Platform: Windows\\n");
#else
    printf("Platform: Unix/Linux/Mac\\n");
#endif

    return 0;
}`,
        explanation: '__FILE__ and __LINE__ are invaluable for debugging. #ifdef _WIN32 lets you write platform-specific code in one file. Removing #define DEBUG disables all debug output without touching any other code.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Why are parentheses around macro arguments important, as in #define SQUARE(x) ((x)*(x))?',
        options: ['They prevent operator-precedence bugs when the argument is an expression', 'They are optional style choices', 'They make the macro run faster', 'They are strictly required by the C preprocessor macro definition syntax rules'],
        correctIndex: 0,
        explanation: 'Without parentheses, SQUARE(1+2) expands to 1+2*1+2 = 5 (wrong). With them: (1+2)*(1+2) = 9 (correct). Always parenthesise macro parameters and the whole expression.'
      },
      {
        question: 'When should you use #include "file.h" instead of #include <file.h>?',
        options: ['For faster compilation', 'For your own header files in the project directory', 'For standard library headers only', 'Only when the header file is larger than one hundred lines total'],
        correctIndex: 1,
        explanation: 'Double-quotes search the current directory first (for your own headers). Angle brackets search system include directories (for standard library headers like stdio.h).'
      },
      {
        question: 'What problem do include guards solve?',
        options: ['Slow compilation', 'Missing function prototypes', 'Duplicate declarations from including a header multiple times', 'Incompatible mismatched data types declared between different files'],
        correctIndex: 2,
        explanation: 'Without guards, if two source files both include the same header, the compiler sees its declarations twice and reports redefinition errors.'
      },
      {
        question: 'What does the predefined macro __LINE__ expand to?',
        options: ['The full name of the current enclosing function body', 'The compilation date', 'The number of lines in the file', 'The current line number in the source file'],
        correctIndex: 3,
        explanation: '__LINE__ is replaced by the integer line number at the point it appears. It is useful for debug messages: printf("Error at line %d\\n", __LINE__);'
      },
      {
        question: 'What happens to code between #ifdef DEBUG and #endif if DEBUG is not defined?',
        options: ['The code is excluded from compilation entirely', 'It causes a compile error', 'The code is included as normal', 'DEBUG then gets automatically defined as zero for you'],
        correctIndex: 0,
        explanation: '#ifdef checks if a macro is defined. If it is not, the preprocessor skips everything up to #endif before the compiler ever sees it.'
      },
      {
        question: 'Which of the following is a correct include guard for a file named "math_utils.h"?',
        options: ['#include_guard MATH_UTILS_H', '#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\n...\n#endif', '#define MATH_UTILS_H\n#ifdef MATH_UTILS_H\n#endif', '#pragma once is the only valid way to guard a header'],
        correctIndex: 1,
        explanation: 'The standard pattern is: #ifndef NAME_H / #define NAME_H / (header content) / #endif. The first include defines the macro; subsequent includes see it is already defined and skip the content.'
      },
      {
        question: 'What is the key difference between #define PI 3.14 and const double PI = 3.14?',
        options: ['They are identical', '#define creates a typed constant that the compiler type-checks, whereas const does not', '#define is a preprocessor text substitution with no type; const is a typed, compiler-checked variable', 'const is faster at runtime than #define'],
        correctIndex: 2,
        explanation: '#define PI is replaced textually before compilation — it has no type, no address, and no scope. const double PI has a type, can be debugged with a debugger, and the compiler performs type checking on it.'
      }
    ],
    playground: `#include <stdio.h>

#define VERSION     "1.0.0"
#define MAX_ITEMS   10
#define CLAMP(v, lo, hi) ((v) < (lo) ? (lo) : ((v) > (hi) ? (hi) : (v)))

/* Uncomment to enable debug output */
/* #define DEBUG */

int main() {
    printf("Program version : %s\\n", VERSION);
    printf("Max items       : %d\\n", MAX_ITEMS);
    printf("Compiled on     : %s at %s\\n", __DATE__, __TIME__);

    int score = 150;
    int clamped = CLAMP(score, 0, 100);
    printf("Score %d clamped to [0,100] = %d\\n", score, clamped);

#ifdef DEBUG
    printf("[DEBUG] %s line %d\\n", __FILE__, __LINE__);
#endif

    return 0;
}`,
    miniProject: {
      title: 'Multi-File C Project with Preprocessor',
      description: 'Create a small multi-file project: a header "geometry.h" (with include guards) that defines a Circle struct and declares circleArea and circlePerimeter. Implement them in "geometry.c". In "main.c", include "geometry.h" and use the functions. Use #define PI 3.14159 in the header and #define DEBUG in main.c to toggle debug output.',
      hints: [
        'geometry.h: write #ifndef GEOMETRY_H / #define GEOMETRY_H / ... / #endif around all content',
        'Define PI in geometry.h with #define PI 3.14159265',
        'circleArea(double r) returns PI * r * r; circlePerimeter(double r) returns 2 * PI * r',
        'In main.c, add #define DEBUG to enable printf statements that show intermediate calculations'
      ]
    }
  }
];

export function getCModuleById(id) {
  return cModules.find(m => m.id === id);
}
