// COS 221 — Written (non-CBT) exam preparation bank.
//
// Flow control and array coverage is scoped directly off the lecturer's own
// revision-class guidance (a recording relayed to the author, August 2026)
// on which topics carry marks: sequential/selection/iteration structures,
// if/if-else/switch, for/while/do-while, and two "write a program" set
// pieces; arrays (1D/2D, zero-based indexing, and a set of "write a
// program" exercises); and Java Strings. Every other transcribed module
// (Methods, OOP I/II, Exception Handling, Threads, Text File Handling,
// JDBC, GUI) is not named in that recording, but is covered anyway for
// full-course reach — Methods and OOP get the same weight as the
// lecturer-flagged topics since the course description names OOP as its
// own first topic; Modules 8-12 get a lighter pass (3-4 questions each,
// mostly recall plus one or two longform) since nothing marks them as
// higher-yield than the rest.
//
// Every question is drawn from src/data/lectureNotes/cos221.js — Module 2
// (Flow Control Structures), Module 3 (Array), Module 4 (Methods), Module 5
// (OOP I), Module 6 (OOP II), Module 8 (Exception Handling), Module 9
// (Threads), Module 10 (Text File Handling), Module 11 (JDBC), Module 12
// (GUI) and Module 13 (Java String API) — and `source` names the module
// and heading to re-read. Module 7 has no bank entries because it is not
// yet transcribed into cos221.js.
//
// The lecturer's guidance also named two topics not yet covered by the
// transcribed notes — the differences between a String and a character
// array, and String's real-world applications (password validation, spell
// checking, etc.) — and "common errors associated with arrays". They are
// left out of this bank rather than answered from the recording alone;
// add them once that section of the manual is transcribed into cos221.js,
// so the `source` a student is sent to re-read actually exists.
//
// "Write a program" questions are original exercises built from syntax the
// notes teach (e.g. the for-loop and while-loop forms in 2.4, or the
// recursion/overloading forms in 4.5-4.6), not claims about what the
// manual's own listings say — unlike the recall items below, which quote
// the manual directly.
//
// Mark values in each markScheme entry sum to the question's `marks`.

export const cos221ExamPrep = [
  // ══════════════════════════════════════════════════════════════════
  //  MODULE 2 — FLOW CONTROL STRUCTURES
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 3,
    source: 'Module 2 · 2.1 Introduction / 2.2 Transfer Structures',
    question: 'Name the THREE types of flow control structure in a program, and what each one does.',
    items: [
      { name: 'Sequential structure', aliases: ['sequence accomplishment', 'sequential'], explain: 'The computer executes instructions one by one, in the order they appear — what the manual calls sequence accomplishment.' },
      { name: 'Selection structure', aliases: ['decision structure', 'branching', 'selection'], explain: 'The program chooses between two or more alternative paths depending on whether a condition is true or false — built with if, if-else and switch.' },
      { name: 'Iteration structure', aliases: ['looping', 'repetition', 'iteration'], explain: 'A block of statements executes repeatedly while a test expression holds — built with for, while and do-while loops.' },
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Module 2 · 2.2.1 if statement / 2.2.2 if-else statement / 2.3 Switch case Statement',
    question: 'Explain the difference between the if statement, the if-else statement, and the switch statement in Java.',
    modelAnswer: 'The if statement executes a block of code only when its condition evaluates to true; if the condition is false, the block is simply skipped and nothing else runs in its place. The if-else statement is an extension of if: it adds a second block that runs when the condition is false, so exactly one of the two blocks always executes. The switch statement compares a single expression against a list of case values — the expression must be of type byte, short, char, int, or String — and runs the statements under whichever case matches, continuing until a break statement is reached; an optional default case runs when no case value matches, and does not need its own break. Where if-else only ever branches two ways, switch is suited to choosing among several fixed, known values of the same expression.',
    markScheme: [
      'if statement explained — runs its block only when the condition is true, otherwise skips it (2.5)',
      'if-else statement explained — an extra block runs when the condition is false, so one of the two always executes (2.5)',
      'switch statement explained — matches one expression against a list of case values, running statements until break (2.5)',
      'Correctly states the switch expression must be byte, short, char, int or String, and that default is optional (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Module 2 · 2.4.1 for...loop Structure / 2.4.2 while...loop Structure / 2.4.3 do...while loop Structure',
    question: 'Compare the for loop, the while loop, and the do-while loop in Java. State which are entry-controlled and which is exit-controlled, and the one situation in which a do-while loop behaves differently from a while loop given the same condition.',
    modelAnswer: "The for loop and the while loop are both entry-controlled loops: their test expression is checked before the loop body runs, so if the condition starts out false, the body never executes at all. The for loop is generally used when the number of iterations is known in advance, since its initialization, test, and update expressions are all written together on one line. The while loop is used when the exact number of iterations is not known beforehand — it simply keeps looping for as long as its test expression stays true. The do-while loop is different: it is exit-controlled, because the loop body runs first and the condition is only checked afterwards. That means a do-while loop always executes its body at least once, even when the condition is false from the very start — which is exactly the situation where it differs from a while loop with the same condition. The manual's own example shows this: with boolean enter = false, a do-while loop still prints its message once before exiting, whereas the equivalent while loop would never enter the block at all.",
    markScheme: [
      'for loop described — entry-controlled, test checked before the body runs (2)',
      'while loop described — entry-controlled, used when the number of iterations is not known beforehand (2)',
      'do-while loop described — exit-controlled, body runs before the condition is checked (2)',
      'Key difference stated — do-while always runs its body at least once, even when the condition is false at the start (2)',
      "The manual's own boolean enter = false example correctly used to illustrate the difference (1)",
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 2 · 2.4.1 for...loop Structure',
    question: 'Write a Java program that reads an integer from the user and prints its multiplication table from 1 to 10, using a for loop.',
    modelCode: String.raw`import java.util.Scanner;

public class MultiplicationTable
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        for (int i = 1; i <= 10; i++)
        {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }
}`,
    modelAnswer: "Scanner reads the number n from the user. The for loop's initialization expression starts i at 1, its test expression i <= 10 keeps the loop running while i is 10 or less, and its update expression i++ increments i after each pass — exactly the three-part form taught for the for loop. On each iteration the loop body prints one line of the table: n multiplied by the current value of i.",
    markScheme: [
      'Scanner correctly used to read the integer n from the user (1.5)',
      "for loop's initialization expression starts i at 1 (1.5)",
      'Test expression i <= 10 stated, so the loop runs exactly 10 times (2)',
      'Update expression (i++ or i = i + 1) included (1.5)',
      'Loop body correctly prints n x i = n*i on each pass (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 2 · 2.4.2 while...loop Structure',
    question: 'Write a Java program using a while loop to calculate and print the sum of the first 100 natural numbers.',
    modelCode: String.raw`public class SumNaturalNumbers
{
    public static void main(String[] args)
    {
        int i = 1, sum = 0;

        while (i <= 100)
        {
            sum = sum + i;
            i = i + 1;
        }

        System.out.println("Sum of first 100 natural numbers = " + sum);
    }
}`,
    modelAnswer: "Following the while loop's own structure, i and sum are both initialized before the loop starts (i = 1, sum = 0). The test expression i <= 100 is checked before every pass, since while is entry-controlled. Each pass adds the current value of i to sum, then the update expression increments i. Once i passes 100 the test expression becomes false and the loop terminates, having accumulated 1 + 2 + ... + 100 = 5050.",
    markScheme: [
      'sum and i both initialized before the loop (sum = 0, i = 1) (1.5)',
      'Test expression i <= 100 correctly used to control the loop (2)',
      'Loop body adds the current value of i onto sum (2)',
      'i incremented inside the loop body (1.5)',
      'Correct final answer stated: sum = 5050 (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 3 — ARRAY
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 4,
    source: 'Module 3 · 3.1 Introduction / 3.2 One Dimensional Array (1D Array)',
    question: 'State FOUR properties of a Java array, as described in the manual.',
    items: [
      { name: 'Single data type', aliases: ['same type', 'homogeneous'], explain: 'An array is a container object that holds values of a single type — an int and a String cannot share the same array.' },
      { name: 'Fixed size', aliases: ['fixed number of elements'], explain: 'An array holds a fixed number of values, decided when it is created; that number cannot change afterwards.' },
      { name: 'Contiguous memory', aliases: ['contiguous location'], explain: 'Elements are stored at a contiguous location in memory — a fixed gap between one element and the next.' },
      { name: 'Zero-based indexing', aliases: ['index from 0', 'lower bound 0'], explain: 'The first index (the Lower Bound) is always 0, and the last index (the Upper Bound) is always Size − 1.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 3 · 3.2 Store and Access the Numbers in a 1D Array using Loops',
    question: 'Write a Java program that reads 5 integers into an array and prints their sum and average.',
    modelCode: String.raw`import java.util.Scanner;

public class ArraySumAverage
{
    public static void main(String[] args)
    {
        int a[] = new int[5], sum = 0;
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter 5 numbers");
        for (int i = 0; i < 5; i++)
        {
            a[i] = sc.nextInt();
            sum = sum + a[i];
        }

        double average = (double) sum / 5;
        System.out.println("Sum = " + sum);
        System.out.println("Average = " + average);
    }
}`,
    modelAnswer: "The array a is declared with size 5, so its valid indices run from 0 (the Lower Bound) to 4 (the Upper Bound, Size − 1), matching the loop condition i < 5. Scanner reads each value into a[i] and adds it onto a running sum inside the same loop. The average is computed by casting sum to double before dividing, so the division is not truncated to a whole number the way plain int division would be. Both results are then printed.",
    markScheme: [
      'Array declared with size 5, loop indices running 0 to 4 to match the zero-based indexing rule (2)',
      'Scanner used to read each element into the array (1.5)',
      'Running sum accumulated correctly inside the loop (2)',
      'Average computed as a double (cast to avoid integer division) (1.5)',
      'Sum and average both printed (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    language: 'java',
    source: 'Module 3 · 3.2 Example 1 (Store and Access the Numbers in a 1D Array using Loops)',
    question: 'Write a Java program to store 10 integers entered by the user in an array, then display all 10 numbers.',
    modelCode: String.raw`import java.util.Scanner;

public class StoreAndDisplay
{
    public static void main(String[] args)
    {
        int a[] = new int[10];
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter 10 numbers");
        for (int i = 0; i < 10; i++)
        {
            a[i] = sc.nextInt();
        }

        System.out.println("You entered:");
        for (int i = 0; i < 10; i++)
        {
            System.out.print(a[i] + " ");
        }
    }
}`,
    modelAnswer: "This follows the manual's own pattern for a 1D array: one for loop stores the user's 10 inputs into the array, and a second for loop reads each element back out and prints it, both running from index 0 up to (but not including) 10.",
    markScheme: [
      'Array of size 10 declared (1)',
      'First loop reads 10 values with Scanner into the array (2)',
      'Second loop used to display the stored values (2)',
      'Loop bounds correctly run i = 0 to i < 10 (1)',
    ],
  },

  {
    type: 'longform',
    marks: 7,
    language: 'java',
    source: 'Module 3 · 3.2 Example 1 (Store and Access the Numbers in a 1D Array using Loops)',
    question: 'Write a Java program to store 10 integers in an array and count how many of them are even and how many are odd.',
    modelCode: String.raw`import java.util.Scanner;

public class CountEvenOdd
{
    public static void main(String[] args)
    {
        int a[] = new int[10], even = 0, odd = 0;
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter 10 numbers");
        for (int i = 0; i < 10; i++)
        {
            a[i] = sc.nextInt();
            if (a[i] % 2 == 0)
            {
                even++;
            }
            else
            {
                odd++;
            }
        }

        System.out.println("Even numbers: " + even);
        System.out.println("Odd numbers: " + odd);
    }
}`,
    modelAnswer: "This extends the manual's even-number check (a[i] % 2 == 0) with a running count instead of just printing the values: even and odd counters start at 0, and every element read into the array is tested with the modulus operator and added to the matching counter. Both totals are printed once all 10 numbers have been read.",
    markScheme: [
      'Array of size 10 declared and filled using Scanner in a loop (2)',
      'Modulus operator used to test each element, a[i] % 2 == 0 (2)',
      'Even and odd counters correctly incremented (2)',
      'Both totals printed (1)',
    ],
  },

  {
    type: 'longform',
    marks: 7,
    language: 'java',
    source: 'Module 3 · 3.2 One Dimensional Array (1D Array)',
    question: 'Write a Java program to merge two integer arrays of size 5 each into a single array of size 10.',
    modelCode: String.raw`public class MergeArrays
{
    public static void main(String[] args)
    {
        int a[] = {12, 18, 6, 9, 21};
        int b[] = {7, 30, 4, 16, 11};
        int merged[] = new int[10];

        for (int i = 0; i < 5; i++)
        {
            merged[i] = a[i];
        }
        for (int i = 0; i < 5; i++)
        {
            merged[5 + i] = b[i];
        }

        System.out.println("Merged array:");
        for (int i = 0; i < 10; i++)
        {
            System.out.print(merged[i] + " ");
        }
    }
}`,
    modelAnswer: 'merged is declared with size 10 — the combined size of the two 5-element arrays. The first loop copies a straight into the first 5 positions of merged. The second loop copies b into the remaining 5 positions, offsetting the index by 5 (merged[5 + i]) so it does not overwrite what the first loop wrote. A final loop prints all 10 elements of merged.',
    markScheme: [
      'merged array declared with size 10 (5 + 5) (1.5)',
      'First array copied into the first 5 positions of merged (2)',
      'Second array copied into positions 5-9 of merged, using an offset of 5 (2)',
      'Full merged array printed with a loop (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 12,
    language: 'java',
    source: 'Module 3 · 3.2 One Dimensional Array (1D Array)',
    question: "Develop a Java program that uses arrays to manage the results of 5 students: input each student's name and score out of 100, compute the total and average score across all students, and print a report showing each student's name, score, and letter grade (A: 70 and above, B: 60-69, C: 50-59, D: 45-49, F: below 45).",
    modelCode: String.raw`import java.util.Scanner;

public class StudentResultSystem
{
    public static void main(String[] args)
    {
        int n = 5;
        String names[] = new String[n];
        int scores[] = new int[n];
        int total = 0;

        Scanner sc = new Scanner(System.in);

        for (int i = 0; i < n; i++)
        {
            System.out.println("Enter name for student " + (i + 1) + ":");
            names[i] = sc.next();
            System.out.println("Enter score for " + names[i] + ":");
            scores[i] = sc.nextInt();
            total = total + scores[i];
        }

        double average = (double) total / n;

        System.out.println("\nStudent Result Report");
        for (int i = 0; i < n; i++)
        {
            char grade;
            if (scores[i] >= 70)
            {
                grade = 'A';
            }
            else if (scores[i] >= 60)
            {
                grade = 'B';
            }
            else if (scores[i] >= 50)
            {
                grade = 'C';
            }
            else if (scores[i] >= 45)
            {
                grade = 'D';
            }
            else
            {
                grade = 'F';
            }

            System.out.println(names[i] + "\t" + scores[i] + "\t" + grade);
        }

        System.out.println("\nTotal = " + total);
        System.out.println("Average = " + average);
    }
}`,
    modelAnswer: "Two parallel arrays, names and scores, both size 5, hold each student's data at the same index i — student i's name is names[i] and their score is scores[i]. A single loop reads both values with Scanner for each student and accumulates total. The average is cast to double so it is not truncated. A second loop walks the same indices and uses an if...else if...else chain, checked from the highest band down, to assign the correct letter grade to each score before printing that student's row. The total and average are printed last.",
    markScheme: [
      'Two parallel arrays (names and scores) of size 5 declared and indexed by the same loop variable (2)',
      "Scanner used to read each student's name and score inside a loop (2)",
      'Running total accumulated across all 5 students (1.5)',
      'Average computed as a double (1.5)',
      'if...else if...else chain correctly assigns a grade to every score band listed (3)',
      "Report printed showing every student's name, score and grade (1.5)",
      'Total and average printed (0.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 4 — METHODS (FUNCTIONS)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 4,
    source: 'Module 4 · 4.2 Method (Function) Categories / 4.2.1 Types of User Defined Method',
    question: 'State the TWO categories of Java methods, and the TWO types of user-defined method.',
    items: [
      { name: 'Built-in Methods', aliases: ['predefined methods'], explain: 'Predefined methods we can use at any time in a Java program, e.g. pow(), sqrt(), min().' },
      { name: 'User Defined Methods', aliases: [], explain: 'Methods defined or created by the programmer to perform a specific task.' },
      { name: 'Void Method', aliases: [], explain: 'A user-defined method that does not return any value or result to the caller.' },
      { name: 'Return Type Method', aliases: [], explain: 'A user-defined method that returns a value or result to the caller, with a return type such as int, float, double or char.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Module 4 · 4.4.1 Formal and Actual Arguments / 4.4.2 Pass by Value or Call by Value',
    question: "Differentiate between Formal Arguments and Actual Arguments in a Java method call. State which parameter-passing mechanism Java uses, and explain what that means for a variable passed into a method.",
    modelAnswer: "Formal Arguments are the parameters written inside the round brackets of a method's declaration — they are the names the method uses internally to receive its inputs. Actual Arguments are the values or variables supplied when the method is called from the calling program — they are what is actually passed in. Java uses Pass by Value (Call by Value) for every argument: the value of an actual argument is copied into its matching formal argument, and the two live at different memory locations. Because of this, changing a formal argument inside the method has no effect on the actual argument back in the calling program — as the manual's changevalue() example shows, x and y in main() keep their original values of 10 and 20 even after changevalue(x, y) increments its own copies a and b. Java does not support pass by reference or call by reference the way C and C++ do.",
    markScheme: [
      'Formal Arguments defined — the parameters in the method declaration (2)',
      'Actual Arguments defined — the values/variables supplied at the call site (2)',
      'States Java uses pass by value only, not pass by reference (2)',
      "Explains the consequence — changing a formal argument does not affect the actual argument, illustrated with the manual's changevalue() example (2)",
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 4 · 4.5 Recursive Method (Function)',
    question: 'Write a recursive Java method factorial(int n) that returns the factorial of n, and a main() method that prints the factorial of 5.',
    modelCode: String.raw`public class Factorial
{
    public static int factorial(int n)
    {
        if (n <= 1)
        {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String args[])
    {
        System.out.println("Factorial of 5 = " + factorial(5));
    }
}`,
    modelAnswer: "Following the same pattern as the manual's printnum() method, factorial() is recursive: it calls itself with a smaller value of n each time. The exit condition n <= 1 stops the recursion (0! and 1! are both 1); without it the method would call itself forever. Each call multiplies n by the result of factorial(n - 1), so factorial(5) evaluates as 5 * 4 * 3 * 2 * 1 = 120.",
    markScheme: [
      'Exit condition correctly stops the recursion when n <= 1 (2)',
      'Recursive call factorial(n - 1) correctly reduces n toward the exit condition (2.5)',
      'Method returns n * factorial(n - 1) for the general case (2)',
      'main() calls factorial(5) and prints the correct result, 120 (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 4 · 4.6 Method Overloading in Java',
    question: 'Explain what Method Overloading is. Write TWO overloaded versions of a method called volume: one that computes the volume of a cube given a single side length, and another that computes the volume of a cuboid given length, breadth, and height.',
    modelCode: String.raw`public class Volume
{
    public static int volume(int side)
    {
        return side * side * side;
    }

    public static int volume(int length, int breadth, int height)
    {
        return length * breadth * height;
    }

    public static void main(String args[])
    {
        System.out.println("Volume of cube = " + volume(4));
        System.out.println("Volume of cuboid = " + volume(4, 3, 5));
    }
}`,
    modelAnswer: "Method Overloading is declaring more than one method with the same name but a different number (or type) of arguments, exactly as the manual overloads max() and sum(). Here, volume(int side) takes one argument and returns side cubed for a cube. volume(int length, int breadth, int height) takes three arguments and multiplies them for a cuboid. Java tells the two apart by their argument count when volume(...) is called.",
    markScheme: [
      'Method Overloading correctly defined — same name, different number/type of arguments (2)',
      'volume(int side) correctly computes side * side * side (2)',
      'volume(int length, int breadth, int height) correctly computes length * breadth * height (2)',
      'main() correctly calls both overloaded versions (2)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 4 · 4.2.1.1 Void Method (Calling a Void Method) / 4.3 Flow of Execution of Method',
    question: 'Using the terms "caller method" and "called method", explain the flow of execution when the main() method invokes another method in a Java program.',
    modelAnswer: "The method that invokes another method — here, main() — is known as the caller method. The method being invoked — such as message() or sum() in the manual's example — is known as the called method. When the caller method reaches the line that calls a method, program flow leaves main() and jumps into the body of the called method; every statement in the called method executes in order, and once it finishes (or reaches a return statement), control passes back to the exact point in the caller method right after the call, and execution continues from there.",
    markScheme: [
      'Caller method correctly identified as the method doing the invoking (main()) (1.5)',
      'Called method correctly identified as the method being invoked (1.5)',
      "States that control leaves the caller and moves into the called method's body (1.5)",
      'States that control returns to the caller at the point right after the call once the called method finishes (1.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 5 — OOP I: CONCEPT OF OBJECT-ORIENTED PROGRAMMING
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Module 5 · 5.2 Class and Object',
    question: 'Differentiate between a class and an object in Java, using the DOG example from the manual to illustrate your answer.',
    modelAnswer: 'A class is the blueprint from which individual objects are created — a user-defined data type that bundles data (variables) and methods (functions) together. An object is an instance of a class. In the manual\'s example, DOG is the class: it defines the variables Breed, Sex, Speed and Weight, and the actions Running and Eating. MAX and LUCY are two objects of the class DOG — each one has the same variables defined by the class, but stores its own different values (MAX is a Pitbull running at 40 MPH; LUCY is a Labrador running at 22 MPH).',
    markScheme: [
      'Class correctly defined — the blueprint/user-defined data type bundling data and methods (2)',
      'Object correctly defined — an instance of a class (2)',
      'DOG identified as the class, with its variables and actions named (1)',
      'MAX and LUCY identified as two objects of DOG holding different values for the same variables (1)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Module 5 · 5.3.1.2 Initialized Instance Variables using Constructor / Use of this Keyword',
    question: "Explain the purpose of a constructor in Java. Differentiate between a Default Constructor and a Parameterized Constructor, and explain why the `this` keyword is needed when a constructor's parameter names are the same as the instance variable names.",
    modelAnswer: "A constructor is a special method, named identically to its class, used to initialize the instance variables of an object when it is created. A Default Constructor takes no parameters and always sets the instance variables to the same fixed values every time. A Parameterized Constructor takes arguments, so the values supplied when the object is created become the instance variables' initial values — this is how the manual's Data(String nm, int ag) lets each object start with different data. When a parameterized constructor's parameter is given the same name as the instance variable it initializes (for example a parameter called name setting an instance variable also called name), the plain name inside the constructor body would refer to the parameter, not the field — this keyword is used to make that reference explicit: this.name refers to the object's own instance variable, while name alone refers to the parameter.",
    markScheme: [
      'Constructor purpose correctly explained — a special method, named after its class, that initializes instance variables on creation (2)',
      'Default Constructor correctly described — takes no parameters (1.5)',
      'Parameterized Constructor correctly described — takes arguments that set the initial values (1.5)',
      'Explains the naming clash a matching parameter name creates (1.5)',
      'Explains that this.name refers to the instance variable while the bare name refers to the parameter (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 5 · 5.3.1 Instance Variables / 5.3.2 Static Variables',
    question: "Differentiate between an instance variable and a static variable in Java, using the manual's count example to illustrate your answer.",
    modelAnswer: "An instance variable is declared inside a class but outside any method, and every object gets its own separate copy — changing one object's copy does not affect any other object's copy. A static variable is also declared inside the class, but memory for it is allocated only once, when the class is loaded, and that single copy is shared by every object of the class. In the manual's example, count is declared static inside Data, and both the default and parameterized constructors increment it by 1 whenever a new object is created; because it is shared rather than duplicated per object, creating x and y (two separate objects, each with its own name and age) still leaves a single count equal to 2, since both constructor calls incremented the very same static variable.",
    markScheme: [
      'Instance variable correctly described — declared inside the class, one separate copy per object (1.5)',
      'Static variable correctly described — one copy shared by every object, allocated once when the class loads (1.5)',
      'count correctly identified as static, incremented by both constructors (1.5)',
      'Explains why count ends at 2 — one shared copy incremented by both object-creation calls, unlike name/age which are per-object (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 5 · 5.4 Instance Methods in Java / 5.5 Static Methods',
    question: 'Differentiate between an instance method and a static method in Java, and state how each is called.',
    modelAnswer: 'An instance method processes data stored in a class\'s instance variables, and belongs to the object rather than the class — it is called through an object of the class, followed by a dot and the method name (for example x.inputdata()). A static method is defined with the static keyword and is bound to the class itself rather than to any object, so it can be called directly through the class name and a dot (for example Calc.add(x, y)), with no object required — though an object of the class can also call it. Static methods are typically used to build a utility (helper) class of methods that do not need per-object state.',
    markScheme: [
      'Instance method correctly described — processes instance variables, belongs to the object (1.5)',
      'Instance method correctly stated to be called via an object (objectName.method()) (1.5)',
      'Static method correctly described — bound to the class, not the object (1.5)',
      'Static method correctly stated to be called via the class name (ClassName.method()), with no object required (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    language: 'java',
    source: 'Module 5 · 5.4 Instance Methods in Java',
    question: 'Write a Java class called Book with private instance variables title (String) and price (double), a parameterized constructor to initialize both, and an instance method displayDetails() that prints them. In a separate class, create a Book object and call displayDetails().',
    modelCode: String.raw`class Book
{
    private String title;
    private double price;

    Book(String title, double price)
    {
        this.title = title;
        this.price = price;
    }

    public void displayDetails()
    {
        System.out.println("Title: " + title);
        System.out.println("Price: " + price);
    }
}

public class Example
{
    public static void main(String args[])
    {
        Book b = new Book("Data Structures in Java", 45.50);
        b.displayDetails();
    }
}`,
    modelAnswer: "Book declares title and price as private instance variables, so they cannot be set directly from outside the class. The parameterized constructor Book(String title, double price) uses this.title and this.price to distinguish the instance variables from the constructor's own parameters of the same name, following the manual's pattern. displayDetails() is a public instance method that prints both fields. In Example's main(), a Book object b is created by passing values to the parameterized constructor, and b.displayDetails() is called through the object using the dot operator.",
    markScheme: [
      'title and price correctly declared as private instance variables (2)',
      'Parameterized constructor correctly initializes both fields, using this to resolve the name clash (2.5)',
      'displayDetails() correctly declared as a public instance method printing both fields (2)',
      'A Book object is correctly created via the parameterized constructor in main() (2)',
      'displayDetails() correctly called on the object using the dot operator (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Module 5 · 5.3.1.1 Access and Modify Values of Instance Variables',
    question: "State what happens when a program tries to access a private instance variable from outside its class, using the manual's own example to support your answer.",
    modelAnswer: 'Declaring an instance variable private restricts it to its own class — it cannot be accessed or modified from outside that class using an object, even though public instance variables can be. The manual\'s own example shows this directly: when name and age are declared private in Data and Example\'s main() then tries x.name = "Peter"; and x.age = 15;, the program fails to compile, giving the errors name has private access in Data and age has private access in Data.',
    markScheme: [
      'States that a private instance variable cannot be accessed/modified from outside its class (2.5)',
      "Correctly cites the manual's example — Data's private name/age accessed from Example's main() (1.5)",
      'States the resulting compile-time errors (private access in Data) (1)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 6 — OOP II: INHERITANCE, INTERFACE, POLYMORPHISM, ABSTRACT
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 8,
    source: 'Module 6 · 6.1 Inheritance',
    question: 'Explain the concept of inheritance in Java, and state the difference between a Base (Parent) class and a Derived (Child) class.',
    modelAnswer: "Inheritance is the process of creating a new class by utilizing the code of an existing class, without copying that code — the new class simply includes the existing class. The existing class being built on is the Base class or Parent class; the new class doing the including is the Derived class, Subclass, or Child class. In the manual's example, the existing Information class (with roll, name, inputinfo() and displayinfo()) is the Base class, and the new Result class — created with class Result extends Information — is the Derived class: it gains Information's variables and methods automatically and adds its own (marks in three subjects, total, percentage) on top.",
    markScheme: [
      "Inheritance correctly defined — creating a new class by using an existing class's code, without copying it (2)",
      'Base/Parent class correctly identified as the existing class being built on (2)',
      'Derived/Subclass/Child class correctly identified as the new class doing the inheriting (2)',
      "Correctly applies this to the manual's Information/Result example (2)",
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: 'Module 6 · 6.1 Use of super Keyword',
    question: 'State the THREE uses of the super keyword in Java described in the manual.',
    items: [
      { name: 'Invoke a method of the parent class', aliases: ['super.method()'], explain: "Used when a subclass method shares its name with a parent class method, to call the parent's version specifically — e.g. super.display();." },
      { name: 'Access a public instance variable of the parent class', aliases: ['super.variable'], explain: "Used when a subclass field shares its name with a public parent field, to refer to the parent's copy — e.g. super.x." },
      { name: 'Invoke the parameterized constructor of the parent class', aliases: ['super(args)'], explain: "Used inside a child class's constructor to call the parent class's parameterized constructor — e.g. super(num1); — and must be the first statement in the constructor." },
    ],
  },

  {
    type: 'longform',
    marks: 4,
    source: 'Module 6 · 6.1 Use of super Keyword',
    question: 'State the rule governing where the super keyword may be used inside a Java class.',
    modelAnswer: "The super keyword can only be used inside an instance method or inside the constructor of a child class — it has no meaning outside these. When super is used to call the parent class's constructor from inside a child class's constructor, that call must be the very first statement in the constructor; nothing can come before it.",
    markScheme: [
      'States super can only be used inside an instance method or a child class constructor (2)',
      "States that a super() constructor call must be the first statement in the child's constructor (2)",
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Module 6 · 6.3 Access Specifiers',
    question: 'Name the FOUR access specifiers in Java and state the access level each one gives.',
    items: [
      { name: 'public', aliases: [], explain: 'Accessible from outside the class.' },
      { name: 'private', aliases: [], explain: 'Accessible only within the class it is declared in — not from outside the class.' },
      { name: 'default', aliases: ['package-private', 'no modifier'], explain: 'Applied when no access specifier is written; accessible only within the same package.' },
      { name: 'protected', aliases: [], explain: "Accessible within the same package, or by any subclass of the declaring class, regardless of the subclass's own package." },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Module 6 · 6.2 Interface',
    question: 'Differentiate between an interface and a class in Java, and state the keyword a class uses to implement an interface.',
    modelAnswer: "An interface is similar to a class in that it can declare method signatures and constant variables, but its methods have no implementation — they cannot have a body, only a signature ending in a semicolon. A class, in contrast, provides full implementations for the methods it declares. A class uses the implements keyword, followed by the interface's name, to use an interface — and once it does, it must provide an implementation for every method the interface declares. This lets multiple unrelated classes share a common set of method signatures while each supplies its own different implementation, as the manual's MyClass1 and MyClass2 both implement MyInterface's method1() and method2() with different bodies.",
    markScheme: [
      'Interface correctly described — method signatures and constants with no implementation (2)',
      'Class correctly contrasted — provides the full implementation (1.5)',
      'States the implements keyword is used to implement an interface (2)',
      'States that the implementing class must provide a body for every method the interface declares (1.5)',
      'Correctly uses MyClass1/MyClass2 as an example of shared signatures with different implementations (1)',
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Module 6 · 6.4 Polymorphism in Java',
    question: 'Explain the TWO types of polymorphism in Java. State which language mechanism achieves each, and give an example of each from the manual.',
    modelAnswer: "Polymorphism means creating many forms from one. Java has two types. Compile Time Polymorphism (also called static or early binding) is where the compiler decides which method implementation to use based on the argument types, at compile time; it is achieved through Method Overloading — the manual's area(int side) and area(int l, int b) are the same method name doing different things depending on how many arguments are passed. Runtime Polymorphism (also called Dynamic Method Dispatch) is where the method that actually runs is decided at runtime rather than compile time; it is achieved through Method Overriding, where a subclass re-declares a base class method with a new body. In the manual's Shape/Circle example, a variable of type Shape is made to point at a Circle object, and calling draw() through that Shape-typed variable still runs Circle's overridden version, because the decision is made at runtime based on the object's actual type, not the variable's declared type.",
    markScheme: [
      'Compile Time Polymorphism described — decided at compile time based on argument types, also called static/early binding (2)',
      'Compile Time Polymorphism correctly linked to Method Overloading, with the area() example (2)',
      'Runtime Polymorphism described — decided at runtime, also called Dynamic Method Dispatch (2)',
      'Runtime Polymorphism correctly linked to Method Overriding, with the Shape/Circle example (2)',
      "Correctly explains that the Shape-typed variable still runs the Circle version because Java resolves it by the object's actual type at runtime (1)",
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Module 6 · 6.5 Abstract',
    question: 'Explain what an abstract class and an abstract method are in Java, and state the rule linking the two.',
    modelAnswer: "An abstract class is a class whose object cannot be created directly — attempting new on an abstract class is a compile-time error — but it can still be used as a base class for other classes to extend. An abstract method is a method declared with the abstract keyword that has no body at all; it must be overridden by any subclass that extends the abstract class. The rule linking the two: if a class contains even one abstract method, the class itself must also be declared abstract — a class cannot hold an unimplemented method while pretending to be a complete, instantiable class.",
    markScheme: [
      "Abstract class correctly described — its object cannot be created, but it can be extended (2)",
      'States that instantiating an abstract class directly is a compile-time error (1.5)',
      'Abstract method correctly described — declared abstract, has no body, must be overridden in a subclass (2)',
      'States the linking rule — a class containing an abstract method must itself be declared abstract (2.5)',
    ],
  },

  {
    type: 'longform',
    marks: 10,
    language: 'java',
    source: 'Module 6 · 6.4 Runtime Polymorphism / Method Overriding',
    question: 'Write a Java program to demonstrate method overriding: create a base class Animal with a method makeSound() that prints a generic message, and a subclass Dog that overrides makeSound() to print a dog-specific message. In main(), create a Dog object referenced by an Animal-typed variable and call makeSound().',
    modelCode: String.raw`class Animal
{
    public void makeSound()
    {
        System.out.println("The animal makes a sound");
    }
}

class Dog extends Animal
{
    public void makeSound()
    {
        System.out.println("The dog barks");
    }
}

public class Example
{
    public static void main(String args[])
    {
        Animal a;
        a = new Dog();
        a.makeSound();
    }
}`,
    modelAnswer: "Dog extends Animal and re-declares makeSound() with a new body, which is Method Overriding, following the manual's Shape/Circle pattern. In main(), the variable a is declared with type Animal but is made to reference a Dog object. Calling a.makeSound() prints \"The dog barks\", not the Animal version, because Java resolves which overridden version to run based on the object's actual runtime type (Dog), not the variable's declared type (Animal) — this is Runtime Polymorphism, achieved through Dynamic Method Dispatch.",
    markScheme: [
      'Animal correctly declares makeSound() with a generic message (1.5)',
      'Dog correctly extends Animal and overrides makeSound() with its own message (2.5)',
      'Animal-typed variable correctly made to reference a Dog object in main() (2)',
      "Correctly states that a.makeSound() runs Dog's version because Java dispatches by the object's actual runtime type (2.5)",
      'States this is Runtime Polymorphism / Dynamic Method Dispatch (1.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 8 — EXCEPTION HANDLING
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 4,
    source: 'Module 8 · List of Common Exceptions in Java',
    question: "Name FOUR common Java exceptions from the manual's table, and state what causes each.",
    items: [
      { name: 'ArithmeticException', aliases: [], explain: 'Occurs when a number is divided by zero.' },
      { name: 'ArrayIndexOutOfBoundsException', aliases: [], explain: 'Occurs when trying to access an index that does not exist in an array.' },
      { name: 'NullPointerException', aliases: [], explain: 'Occurs when trying to use a null object reference.' },
      { name: 'FileNotFoundException', aliases: [], explain: 'Occurs when unable to find a specified file.' },
    ],
  },

  {
    type: 'longform',
    marks: 9,
    source: 'Module 8 · 8.1 Types of Exception in Java / How to Handle Exceptions in Java / Using finally Statement',
    question: 'Differentiate between Checked and Unchecked exceptions in Java, and explain the roles of the try, catch, and finally blocks in exception handling.',
    modelAnswer: "Checked exceptions are verified by the compiler at compile time — a method that can throw one must either handle it or declare it with the throws keyword; IOException and SQLException are examples. Unchecked exceptions (also called runtime exceptions) are not verified by the compiler and only surface at runtime, such as NullPointerException and ArithmeticException. The try block contains the statements that may raise an exception. The catch block, written immediately after try, catches a specific exception type and contains the statements that manage it — for example printing an error message using the exception object's getMessage() method. The finally block is optional and, whenever it is present, is guaranteed to run whether or not an exception was thrown; it is typically used for cleanup such as closing a file or freeing system resources.",
    markScheme: [
      'Checked exceptions defined — verified by the compiler, must be handled or declared with throws (2)',
      'Unchecked exceptions defined — not verified by the compiler, surface at runtime (2)',
      'try block explained — contains statements that may raise an exception (1.5)',
      'catch block explained — catches a specific exception type and manages it (1.5)',
      'finally block explained — optional, always runs, used for cleanup (2)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 8 · How to Handle Exceptions in Java',
    question: 'Write a Java program that reads two integers from the user and divides the first by the second, using a try-catch block to print "Cannot divide by zero" if the second number is 0, so the program does not terminate abnormally.',
    modelCode: String.raw`import java.util.Scanner;

public class SafeDivision
{
    public static void main(String args[])
    {
        Scanner sc = new Scanner(System.in);
        int a, b, result = 0;

        System.out.print("Enter the first number: ");
        a = sc.nextInt();
        System.out.print("Enter the second number: ");
        b = sc.nextInt();

        try
        {
            result = a / b;
            System.out.println("Result = " + result);
        }
        catch (ArithmeticException e)
        {
            System.out.println("Cannot divide by zero");
        }
    }
}`,
    modelAnswer: "Following the manual's own try-catch pattern, the division a / b is placed inside the try block since it is the statement that may raise an exception. If b is 0, Java throws an ArithmeticException, and control jumps straight to the matching catch(ArithmeticException e) block, which prints the required message instead of letting the program crash. If b is not 0, the catch block is simply skipped and the result is printed normally.",
    markScheme: [
      'Scanner used to read both integers from the user (1.5)',
      'Division placed inside a try block (2)',
      'catch(ArithmeticException e) correctly written to catch the divide-by-zero case (2.5)',
      'Correct message "Cannot divide by zero" printed inside the catch block (1)',
      'Program continues (does not crash) when b is 0 (1)',
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 8 · 8.2 User-Defined Exception',
    question: 'Explain what a user-defined exception is in Java, how it is created, and how it is raised in a program.',
    modelAnswer: "A user-defined exception is a custom exception class the programmer creates to handle a specific error condition more precisely than the built-in exception classes allow. It is created by declaring a new class that extends Exception (or an Exception subclass); its constructor typically calls the parent Exception class's constructor via super(), passing a custom error message. To raise it, a method that can encounter the error condition is declared with throws followed by the custom exception's name, and inside the method the exception is actually raised at the point of failure using throw new followed by the exception class name — for example throw new NumberRangeException(); when an invalid value is detected. The calling code then catches it with a normal try-catch block, just like a built-in exception.",
    markScheme: [
      'User-defined exception correctly described — a custom class extending Exception (or a subclass) (2)',
      'Explains the constructor typically uses super() to set a custom message (1.5)',
      'States throws is used on the method signature to declare the exception (1)',
      'States throw new is used inside the method to actually raise the exception (1.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 9 — THREADS
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 2,
    source: 'Module 9 · 9.2 How to Create a Thread in Java',
    question: 'State the TWO ways of creating a thread in Java.',
    items: [
      { name: 'Extending the Thread class', aliases: ['extends Thread'], explain: 'Extend the Thread class and override its run() method with the code the thread should execute.' },
      { name: 'Implementing the Runnable interface', aliases: ['implements Runnable'], explain: 'Implement the Runnable interface and override its run() method, then pass the object to a Thread constructor.' },
    ],
  },

  {
    type: 'longform',
    marks: 8,
    source: 'Module 9 · 9.4 Create Multiple Threads in Java / 9.4.1 By invoking start() method / 9.4.2 By invoking run() method',
    question: "Differentiate between calling a Thread object's start() method and calling its run() method directly, using the manual's \"Hello Java\" example to illustrate the difference.",
    modelAnswer: 'Calling start() creates a separate child thread and executes the code inside run() in that new thread, in parallel with the main thread, without blocking it. Calling run() directly does not create any new thread at all — the code inside run() simply executes on the calling thread itself, sequentially, exactly like an ordinary method call. The manual\'s example shows the difference clearly: when start() is called on three thread objects before printing "Hello Java", the main thread is not blocked, so "Hello Java" prints first, before the threads finish. When run() is called on the same three objects instead, each one must fully finish executing on the main thread before the next line runs, so "Hello Java" only prints last, after all three have completed in sequence.',
    markScheme: [
      'start() correctly explained — creates a separate child thread, runs in parallel, does not block the main thread (2.5)',
      'run() called directly correctly explained — no new thread created, executes sequentially like a normal method call (2.5)',
      'Correctly cites that start() prints "Hello Java" first (main thread not blocked) (1.5)',
      'Correctly cites that calling run() directly prints "Hello Java" last (sequential execution) (1.5)',
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Module 9 · 9.5 Thread Methods in Java',
    question: 'State what each of the following Thread methods does: sleep(), join(), isAlive(), getPriority().',
    items: [
      { name: 'sleep()', aliases: [], explain: 'Pauses the execution of the running thread for a specified number of milliseconds; raises InterruptedException, so it must be used inside a try-catch.' },
      { name: 'join()', aliases: [], explain: 'Puts the currently running thread into a wait state until the thread it is called on has finished running.' },
      { name: 'isAlive()', aliases: [], explain: 'Returns true if the thread is still alive (has started and not yet terminated), false otherwise.' },
      { name: 'getPriority()', aliases: [], explain: 'Returns the current priority value of the thread.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 9 · 9.2.2 By Implementing the Runnable Interface',
    question: "State the manual's own reason for preferring to implement the Runnable interface over extending the Thread class when creating a thread.",
    modelAnswer: "The manual's reason is inheritance-related: Java does not allow a class to extend more than one class. If a class already needs to extend some other class for its own purposes, it cannot also extend Thread to become a thread — but it can still implement the Runnable interface alongside extending that other class, since a class can implement multiple interfaces. So implementing Runnable is preferred specifically when the class creating the thread needs to extend another class as well.",
    markScheme: [
      'States the core reason — Java does not allow extending more than one class (2.5)',
      'Explains that a class needing to extend another class cannot also extend Thread (2)',
      'States that implementing Runnable does not use up the single-inheritance slot, since a class can implement multiple interfaces (1.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 10 — TEXT FILE HANDLING
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 4,
    source: 'Module 10 · Text File Operations',
    question: 'State FOUR operations that can be performed on a text file in Java, as listed in the manual.',
    items: [
      { name: 'Open a file', aliases: [], explain: 'Open or create a text file.' },
      { name: 'Write to a file', aliases: [], explain: 'Store text in a file.' },
      { name: 'Read from a file', aliases: [], explain: 'Retrieve text from a file.' },
      { name: 'Delete a file', aliases: [], explain: 'Remove a file.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 10 · 10.2.1 Open a File',
    question: 'Explain what happens when a FileWriter object is created in non-append mode on a file that already exists, versus a file that does not yet exist.',
    modelAnswer: "When a FileWriter is opened in non-append mode (the default, with no second boolean argument) on a file that does not yet exist, the FileWriter creates that file. If the file already exists, opening it in non-append mode erases all of its existing contents before any new writing happens — the file is effectively truncated back to empty. To write additional text onto the end of an existing file's contents instead of erasing them, the FileWriter must be opened in append mode, by passing true as the second argument to its constructor.",
    markScheme: [
      'States that a non-existent file is created when opened in non-append mode (2)',
      'States that an existing file has its contents erased when opened in non-append mode (2.5)',
      'States that append mode (passing true) is needed to preserve existing content and add to it (1.5)',
    ],
  },

  {
    type: 'longform',
    marks: 8,
    language: 'java',
    source: 'Module 10 · 10.2.3 Read from a File',
    question: 'Write a Java program that reads a text file called notes.txt line by line using the Scanner class, and prints each line to the screen.',
    modelCode: String.raw`import java.io.*;
import java.util.Scanner;

public class ReadFile
{
    public static void main(String args[])
    {
        File f = new File("notes.txt");
        Scanner sc = null;

        try
        {
            sc = new Scanner(f);
            while (sc.hasNextLine())
            {
                String str = sc.nextLine();
                System.out.println(str);
            }
        }
        catch (IOException e)
        {
            System.out.println(e.getMessage());
        }

        if (sc != null)
        {
            sc.close();
        }
    }
}`,
    modelAnswer: "Following the manual's own file-reading pattern, a File object f is created for notes.txt, and a Scanner is opened on that File rather than on System.in. hasNextLine() checks whether another line remains before each read, so the while loop reads and prints every line in the file, one at a time, until none are left. The whole operation is wrapped in a try-catch for IOException, since opening a file that does not exist raises one, and the Scanner is closed once reading finishes.",
    markScheme: [
      'File object created for notes.txt (1.5)',
      'Scanner opened on the File object, not on System.in (2)',
      'while loop correctly uses hasNextLine() to control the reading (2)',
      'nextLine() used to read and print each line (1.5)',
      'IOException handled in a try-catch, and the Scanner is closed afterwards (1)',
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Module 10 · 10.2.5 Rename a File / 10.2.6 Delete a File',
    question: "State the condition the manual gives that must be true of a file before it can be renamed or deleted using Java's File class.",
    modelAnswer: 'The manual states that a file must be closed before it can be renamed with renameTo() or deleted with delete() — if the file is still open (for example still held by an open FileWriter or FileReader), the rename or delete operation will not succeed.',
    markScheme: [
      'States that the file must be closed before it can be renamed (2.5)',
      'States that the file must be closed before it can be deleted (2.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 11 — JAVA DATABASE CONNECTIVITY (JDBC)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 5,
    source: 'Module 11 · 11.3 Steps in Java Database Connectivity',
    question: 'State the FIVE steps to connect a Java application to a database using JDBC, in order.',
    items: [
      { name: 'Register the driver class', aliases: [], explain: 'The first step — the JDBC driver for the target database is registered.' },
      { name: 'Create a database connection', aliases: [], explain: 'A Connection object is obtained, typically via DriverManager.getConnection().' },
      { name: 'Create a statement', aliases: [], explain: 'A Statement object is created from the connection, used to submit SQL to the database.' },
      { name: 'Execute queries', aliases: [], explain: 'The SQL statement is run against the database through the Statement object.' },
      { name: 'Close the connection', aliases: [], explain: 'The connection (and statement) is closed to release database resources.' },
    ],
  },

  {
    type: 'recall',
    marks: 4,
    source: 'Module 11 · 11.2 Common JDBC Components',
    question: 'Name FOUR JDBC components/interfaces described in the manual, and state what each one does.',
    items: [
      { name: 'DriverManager', aliases: [], explain: 'Manages a list of database drivers and matches connection requests with the correct driver.' },
      { name: 'Connection', aliases: [], explain: 'Represents the communication context — all communication with the database goes through it.' },
      { name: 'Statement', aliases: [], explain: 'Used to submit SQL statements to the database.' },
      { name: 'ResultSet', aliases: [], explain: 'Holds the data retrieved after an SQL query is executed, and acts as an iterator to move through it.' },
    ],
  },

  {
    type: 'longform',
    marks: 6,
    source: 'Module 11 · 11.3 Steps in Java Database Connectivity — Create Database Connection',
    question: "Explain the purpose of DriverManager.getConnection(), and identify the three pieces of information it takes in the manual's own STUDENTS_db example.",
    modelAnswer: 'DriverManager.getConnection() establishes an actual connection to a database, returning a Connection object that all further communication with that database goes through. In the manual\'s own example, it is called with three pieces of information: the database URL, jdbc:postgresql://localhost:5432/STUDENTS_db, which names the driver sub-protocol, host, port and database; the username, "postgres"; and the password for that user.',
    markScheme: [
      'States that DriverManager.getConnection() establishes/opens the connection to the database (2)',
      'Correctly identifies the database URL as the first argument (1.5)',
      'Correctly identifies the username as the second argument (1.25)',
      'Correctly identifies the password as the third argument (1.25)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 12 — GRAPHICAL USER INTERFACES (GUI)
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'longform',
    marks: 6,
    source: 'Module 12 · 12.1 Introduction',
    question: 'State the two Java APIs for GUI programming named in the manual, and explain what an event handler does in a GUI application.',
    modelAnswer: 'The manual names two Java APIs for GUI programming: the Abstract Windowing Toolkit (AWT) and Swing. An event handler is a method that runs in response to a specific GUI event — such as a button being clicked — and contains the code that should execute when that event happens; for example, the Exit button\'s event handler in the manual\'s calculator simply calls System.exit(0);, and the Add button\'s handler reads the two text fields, adds them, and writes the result back.',
    markScheme: [
      'Correctly names AWT (Abstract Windowing Toolkit) (1.5)',
      'Correctly names Swing (1.5)',
      'Event handler correctly explained — a method that runs in response to a specific GUI event (2)',
      "Correctly illustrates with one of the manual's own button handlers (1)",
    ],
  },

  {
    type: 'recall',
    marks: 3,
    source: 'Module 12 · 12.4 Adding Components: Making the Front End',
    question: "Name THREE GUI components the manual's calculator example places on the form, and state what each is used for.",
    items: [
      { name: 'JLabel', aliases: [], explain: 'Displays a text caption next to an input or output field (e.g. "First Number:").' },
      { name: 'JTextField', aliases: [], explain: 'A text box used for user input, or in this example also for displaying the calculated output.' },
      { name: 'JButton', aliases: [], explain: 'A clickable button that triggers an action when pressed, such as Add, Clear, or Exit.' },
    ],
  },

  {
    type: 'longform',
    marks: 7,
    source: 'Module 12 · 12.7 How Event Handling Works',
    question: 'Explain how event handling works for a button click in the NetBeans GUI Builder workflow described in the manual.',
    modelAnswer: "When a component such as a button has an event selected from its Events menu in the GUI Builder, the IDE automatically creates an event listener and registers (hooks) it onto that component — for example, calling jButton3.addActionListener(...) inside the generated initComponents() method. This registers an ActionListener whose actionPerformed method is implemented simply by calling the corresponding event handler, such as jButton3ActionPerformed(evt). From then on, every time the button is pressed — by mouse click or keyboard — an ActionEvent is generated and passed to the listener's actionPerformed method, which runs the code the programmer wrote inside the event handler.",
    markScheme: [
      'States that the IDE auto-generates and registers an event listener when an event is selected (2)',
      'Correctly names addActionListener() as where the listener is hooked to the component (1.5)',
      "States that actionPerformed() calls the programmer's event handler method (e.g. jButton3ActionPerformed) (2)",
      'States that pressing the button generates an ActionEvent that triggers this chain (1.5)',
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MODULE 13 — JAVA STRING API
  // ══════════════════════════════════════════════════════════════════

  {
    type: 'recall',
    marks: 5,
    source: 'Module 13 · Java String Methods',
    question: 'Name FIVE Java String methods covered in the manual and state what each one does.',
    items: [
      { name: 'length()', aliases: [], explain: 'Returns the number of characters the String contains.' },
      { name: 'concat()', aliases: ['concatenation'], explain: 'Joins two Strings together; the + operator does the same thing, but concat() is the built-in method for it.' },
      { name: 'charAt(int i)', aliases: ['charAt'], explain: "Retrieves a single character at position i; i must not be negative and must be less than the String's length." },
      { name: 'toUpperCase()', aliases: [], explain: 'Converts every alphabetic character in the String to upper case.' },
      { name: 'toLowerCase()', aliases: [], explain: 'Converts every alphabetic character in the String to lower case.' },
    ],
  },

  {
    type: 'longform',
    marks: 5,
    source: 'Module 13 · Java String API — Introduction',
    question: 'State whether a Java String is mutable or immutable, and explain what that means for a method such as toUpperCase() or concat().',
    modelAnswer: "A Java String is immutable — once a String object is created, its value cannot be changed. Because of this, String methods such as concat(), toUpperCase() and toLowerCase() never modify the original String in place; each one returns a new String holding the result, leaving the original object exactly as it was. If the result is needed afterwards, it must be assigned to a variable — calling str.toUpperCase(); on its own and discarding the return value leaves str unchanged.",
    markScheme: [
      'States that a Java String is immutable (2)',
      "Explains that once created, a String's value cannot be changed (1.5)",
      'Explains that String methods return a new String rather than modifying the original (1.5)',
    ],
  },
];
