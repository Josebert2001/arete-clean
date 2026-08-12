// COS 221 — Computer Programming II (Java)
// Lecture notes transcribed from the lecturer's course manual, "Object
// Oriented Programming and Design — Java Practical Approach". Shared by every
// department catalogue that carries COS 221 (Cybersecurity and Data Science
// both take it, in Java) — edit here once rather than per catalogue.
//
// Only Module 1 (fundamentals) is transcribed so far; the manual runs to
// Module 13 (advanced OOP, collections, threads, JDBC, GUI). More topics will
// be added as the rest of the manual is transcribed.

export const cos221LectureNotes = [
  {
    number: '1',
    title: 'Fundamentals in Java Programming',
    sections: [
      {
        type: 'text',
        text: 'Java is a simple, secure, portable, robust, object-oriented, multithreaded, architecture-neutral, interpreted, high-performance, distributed and dynamic programming language — also known as a "write-once, run-anywhere" language.',
      },
      {
        type: 'termlist',
        heading: 'Key Features of Java',
        items: [
          { term: 'Simple', def: 'Java is easy to learn.' },
          { term: 'Secure', def: 'Java has advanced authentication and access-control features that help make web applications secure.' },
          { term: 'Portable', def: 'Java code runs on all major platforms unmodified — once a source file compiles into bytecode, that bytecode runs on any platform with a Java JDK, unlike languages that must be recompiled into machine code separately for each platform.' },
          { term: 'Robust', def: 'Java has strong memory management and exception-handling features that catch errors during execution and manage incorrect input.' },
          { term: 'Object-Oriented', def: "A model of programming built around real-world entities — inheritance, data hiding, polymorphism. OOP's aim is to bind a portion of data and the functions that act on it together, so no other part of the code can access them directly." },
          { term: 'Multithreaded', def: 'Java supports multithreaded programming, so a Java program can perform several tasks at the same time.' },
          { term: 'Architecture-Neutral', def: 'Compiling Java code produces bytecode that runs on many platforms with the help of the Java Runtime Environment (JRE) and Java Virtual Machine (JVM).' },
          { term: 'Interpreted', def: 'Java creates an intermediate representation called bytecode, which is what lets it run on any platform via the JDK.' },
          { term: 'High-Performance', def: 'Java uses a Just-In-Time (JIT) compiler, which converts bytecode instructions to enable faster execution.' },
          { term: 'Distributed', def: 'Java programs can access files on any machine on the internet using RMI and EJB, enabling distributed applications.' },
          { term: 'Dynamic', def: 'Java can compile and load a class dynamically, on demand — only the specifically required portion of code, rather than the whole program.' },
        ],
      },
      {
        type: 'text',
        heading: 'Platform Independence — Write Once, Run Anywhere',
        text: 'Java is platform-neutral: the same code runs on multiple operating systems without modification, as long as it does not intentionally depend on anything system-specific — living up to the slogan "Write Once, Run Anywhere". This comes mainly from the Java Virtual Machine (JVM), a well-specified, mature virtual machine.\n\nHere is how it works: you write a Java source file and compile it. Compiling produces a `.class` file containing bytecode. That bytecode is identical no matter which platform you are on, provided you have a JVM — which is itself platform-dependent. The JVM then converts the bytecode into machine code for your computer\'s own architecture (x86, ARM, etc.), so a JVM built for x86 differs from one built for ARM.',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/01-compile-run-anywhere.png',
        width: 450, height: 400, maxWidth: 340,
        alt: 'Java source compiles once through javac into bytecode, and each platform\'s JVM turns that same bytecode into machine code for Mac, Windows, or Linux',
        caption: 'Figure 1: One compile, many platforms — the JVM is what makes Java bytecode portable.',
      },
      {
        type: 'text',
        text: 'This platform independence means you can develop on one operating system and run the program on another (Windows, Linux, macOS, BSD, embedded systems) without significant porting — one version of the client code can serve diverse client systems.',
      },
      {
        type: 'definition',
        heading: 'Variables in Java',
        text: 'A variable in Java is a human-readable name used to store data in computer memory — it lets a program store, read, and change data held in memory. A variable is also called an identifier, because it identifies values within a program. Declaring a variable is a request to the operating system to reserve a piece of memory under that name for storing data.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'a = 5;\nb = "Apple";\na = 25;',
      },
      {
        type: 'text',
        text: 'Here, `a` first stores the value `5`. Then `b` stores the text `"Apple"`. On the third line, `a`\'s value changes to `25` — its earlier value of `5` is erased. A variable can hold only one value at a time; storing a new value always overwrites whatever was there before.',
      },
      {
        type: 'bullets',
        heading: 'Rules for Variable Naming',
        items: [
          'Must begin with a letter.',
          'May contain more than one letter, but never with spaces between them.',
          'Digits may be used, but only after a letter.',
          'No special symbols are allowed except the underscore (_) and the currency symbol ($).',
          'When a name needs multiple words, separate them with an underscore.',
          'No Java keyword or reserved word may be used as a variable name.',
          'All Java statements are case-sensitive — a variable `A` is different from a variable `a`.',
        ],
      },
      {
        type: 'code',
        heading: 'Valid vs Invalid Variable Names',
        language: 'java',
        code: 'total_cost   // valid \u2014 the underscore separates the words\ntotal cost   // invalid \u2014 a variable name cannot contain a space\ntotal-cost   // invalid \u2014 a variable name cannot contain a hyphen\ntotal$       // valid \u2014 $ is one of the two special symbols Java allows',
      },
      {
        type: 'text',
        heading: '1.1 Data Types in Java',
        text: "A data type restricts what kind of data a variable can hold. Whenever a variable is declared, the compiler allocates memory for it based on that data type. Java's data types fall into two categories.",
      },
      {
        type: 'termlist',
        items: [
          { term: 'Primitive', def: 'Uses a small, fixed amount of memory to represent a single item of data. Java has exactly eight: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, and `boolean` — a Java program cannot define any others. Primitives are used so often that making them full objects would noticeably hurt performance.' },
          { term: 'Object (Non-Primitive)', def: 'A larger chunk of memory that can hold a great deal of data along with the methods used to process it. Every data member and local variable must be declared as either a primitive or an object (class) type.' },
        ],
      },
      {
        type: 'note',
        text: 'You can check the size of any primitive at runtime, e.g. `System.out.println("Size of a Character datatype is " + Character.SIZE + " bytes");`.',
      },
      {
        type: 'termlist',
        heading: 'The Eight Primitive Data Types',
        items: [
          { term: 'boolean', def: 'Non-numeric value of true or false.' },
          { term: 'byte', def: 'An 8-bit (1-byte) integer value.' },
          { term: 'char', def: 'A 16-bit character using the Unicode encoding scheme.' },
          { term: 'short', def: 'A 16-bit (2-byte) integer value.' },
          { term: 'int', def: 'A 32-bit (4-byte) integer value.' },
          { term: 'long', def: 'A 64-bit (8-byte) integer value.' },
          { term: 'float', def: 'A 32-bit (4-byte) floating-point value.' },
          { term: 'double', def: 'A 64-bit (8-byte) floating-point value.' },
        ],
      },
      {
        type: 'text',
        heading: 'boolean',
        text: "A `boolean` has exactly two possible values, `true` or `false` — both written lowercase. It's used to perform logical operations, most often to determine whether some condition holds.",
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Program\n{\n    public static void main(String[] args)\n    {\n        // Test true and false booleans.\n        boolean success = true;\n        if (success)\n        {\n            System.out.println("Success !!");\n        }\n        else\n        {\n            System.out.println("Not Success !!");\n        }\n        success = false;\n        if (!success)\n        {\n            System.out.println("Not Success !!");\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'Output: `Success !!` then `Not Success !!`. Java evaluates a Boolean expression by first evaluating the left-hand side, then the right-hand side, and finally applying the relational operator to decide whether the whole expression is true or false.',
      },
      {
        type: 'text',
        heading: 'byte',
        text: 'The smallest integral type. Minimum value -128, maximum value 127; its default value is 0.',
      },
      { type: 'code', language: 'java', code: 'byte bite = 20;' },
      {
        type: 'text',
        heading: 'char',
        text: "Based on 16-bit Unicode characters, so it can represent nearly every character used across the world's languages. Its minimum value is `\\u0000` and its maximum is `\\uffff`. Unlike C, Java does not support signed characters — the language designers considered signed characters and unsigned numbers common sources of bugs.",
      },
      { type: 'code', language: 'java', code: "char cr = 'a';" },
      {
        type: 'text',
        text: 'Java also supports escape characters, so you can represent non-printing characters such as newline, or escape punctuation that has special meaning:',
      },
      { type: 'code', language: 'java', code: "char backspace = '\\b';\nchar tab = '\\t';" },
      {
        type: 'text',
        heading: 'short',
        text: "Sixteen bits long, with a minimum value of -32,768 and a maximum of 32,767. Because `short` is signed and `char` is unsigned, a `char` can hold numerically larger values than a `short` — you cannot assign a `char` directly to a `short`. Its default value is 0.",
      },
      { type: 'code', language: 'java', code: 'short i = 12000;' },
      {
        type: 'text',
        heading: 'int',
        text: "A four-byte (32-bit) number, representing just over 4.29 billion possible values. Java keeps `int` at exactly 32 bits on every JVM (and `short` at 16 bits, `long` at 64 bits, and so on) — this is what saves Java from the portability problems C programs run into, where an `int` might be two bytes on one operating system and four bytes on another. Like the other numeric types, an `int` can be cast to `byte`, `short`, `long`, `float` or `double`; a lossy cast (e.g. int to byte) is done modulo the length of the smaller type.",
      },
      { type: 'code', language: 'java', code: 'int i = 25000;' },
      {
        type: 'text',
        heading: 'long',
        text: "Sixty-four bits (eight bytes) long, with a very large range — use it whenever you need bigger whole numbers than `int` provides.",
      },
      { type: 'code', language: 'java', code: 'long x = 109876677777l;' },
      {
        type: 'text',
        heading: 'float',
        text: "Represents numbers with decimals as 32-bit IEEE 754 floating point. Like the other numeric types, a `float` can be cast to `byte`, `short`, `long`, `int` or `double`; a lossy cast to an integer type truncates the fractional part and applies modulo the length of the smaller type.",
      },
      { type: 'code', language: 'java', code: 'float x = 3.144;' },
      {
        type: 'note',
        text: "As written this needs an `f` suffix (`3.144f`) — a bare decimal literal in Java is a `double`, and Java will not narrow it to `float` automatically.",
      },
      {
        type: 'text',
        heading: 'double',
        text: "Twice the size of a `float` — a 64-bit IEEE 754 floating-point value, and Java's default type for decimal literals. You can also write it in exponential notation. Because most systems only emulate 64-bit floating point, prefer `float` when it's precise enough — the performance hit for `double` emulation is significant. Its default value is `0.0`.",
      },
      { type: 'code', language: 'java', code: 'double a = 3.245249;' },
      {
        type: 'note',
        text: 'All primitive numeric types are signed — the only way to move a value from a larger primitive into a smaller one is to cast it explicitly.',
      },
      {
        type: 'text',
        heading: '1.2 Basic Structure of a Java Program',
        text: "This section covers a Java program's basic structure and its components — understanding them makes it far easier to write and extend your own programs.",
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/02-class-definition-outline.png',
        width: 463, height: 209, maxWidth: 460,
        alt: 'Outline of a Java class: public class Demo, opening brace, the public static void main(String args[]) method definition, its body, and the closing brace',
        caption: 'Figure 2: The skeleton every Java program shares — a class wrapping a main method.',
      },
      {
        type: 'image',
        heading: 'Java Environment on NetBeans',
        src: '/lecture-notes/cos-221/03-netbeans-ide.png',
        width: 1365, height: 719,
        alt: "The NetBeans IDE showing a JavaClass.java source file with a Hello World program, the Projects/Files/Services panel, and the Navigator listing the class's members",
        caption: 'Figure 3: The NetBeans IDE — source editor, project tree, and class Navigator.',
      },
      {
        type: 'text',
        heading: 'Class Definition',
        text: "A Java program may contain several class definitions — classes are an essential part of any Java program. Every program needs at least one class containing the `main` method, and that class must be declared `public`. For example, `public class JavaClass` creates a class named `JavaClass`; the class name must start with a capital letter, and `public` means it's accessible from any other class. The curly braces `{` and `}` group all of a class's (or method's) commands together.",
      },
      {
        type: 'text',
        heading: 'The main() Method',
        text: '`public static void main(String[] args)` is Java\'s special entry point — the method the JVM looks for and starts running a program from. You do not strictly need a `main` method to *compile* a Java program, but you do need one to *run* it: without it, the JVM throws a runtime error, "Main method not found".',
      },
      { type: 'code', language: 'java', code: 'public static void main(String[] args){\n\n}' },
      {
        type: 'bullets',
        items: [
          '`public` and `static` may be written in either order, but convention keeps `public static void main`.',
          'You can name the parameter anything, but most developers write `args` or `argv`.',
        ],
      },
      {
        type: 'text',
        heading: 'public',
        text: "`public` is an access specifier: it means `main()` is globally accessible, which matters because the Java Runtime Environment calling it is not part of your class. If you make `main()` non-public, no program is allowed to execute it.",
      },
      {
        type: 'code',
        language: 'java',
        code: 'class sample {\n  static void main(String[] args) // without public access specifier\n  {\n    System.out.println("Without public...");\n  }\n}',
      },
      {
        type: 'text',
        text: 'Output: `Error: Main method not found in class sample, please define the main method as: public static void main(String[] args) or a JavaFX application class must extend javafx.application.Application`',
      },
      {
        type: 'text',
        heading: 'static',
        text: '`main()` must be `static` so the runtime can call it without first instantiating an object of the class. If `main()` were allowed to be non-static, the JVM would face an ambiguity over which constructor to call before it could create that instance — especially if the constructor itself takes arguments.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'class sample{\n  public void main(String[] args) // without static..\n  {\n    System.out.println("Without static...");\n  }\n}',
      },
      {
        type: 'text',
        text: 'Output: `Error: Main method is not static in class sample, please define the main method as: public static void main(String[] args)`',
      },
      {
        type: 'text',
        heading: 'void',
        text: "Java is platform-independent, and a returned value could mean different things on different platforms — so `main()`'s return type is `void`: it returns nothing. The program terminates when `main()` terminates (unless it has spawned other threads that keep running), so returning a value from `main()` would not make sense; trying to gives a compilation error.",
      },
      {
        type: 'code',
        language: 'java',
        code: 'class sample{\n  public static int main(String[] args) // int instead of void\n  {\n    System.out.println("Without void...");\n  }\n}',
      },
      {
        type: 'text',
        text: 'Output: `sample.java:6: error: missing return statement } 1 error`',
      },
      {
        type: 'text',
        heading: 'main()',
        text: 'This is simply the method\'s name — it is fixed, because the JVM specifically looks for a method called `main` as an application\'s entry point, and it is not a keyword. Renaming it (e.g. to `Main` or `mains`) breaks the JVM\'s lookup, producing the same "Main method not found" error as leaving `main` out entirely.',
      },
      {
        type: 'text',
        heading: 'String args[]',
        text: "These are the `String`-type command-line arguments a Java application accepts when it's run — Java's `main()` only accepts a `String` array as its parameter, collecting whatever was typed on the terminal, space-separated. Java allows the brackets `[]` to sit after either the type or the variable name; putting them after the type (`String[] args`) is the convention most developers follow over the alternative, `String args[]`.",
      },
      {
        type: 'text',
        heading: '1.3 Output Functions',
        text: "`System.out.println()`, `System.out.print()`, and `System.out.printf()` all print text or a variable's value to the screen. `System` is a class; `out` is an object of the `PrintStream` class — a public, static member field of `System`; and `println()`/`print()`/`printf()` are public methods of `PrintStream`, called through that `out` object.",
      },
      {
        type: 'bullets',
        items: [
          '`System.out.println` prints text or values and then breaks the line, so whatever prints next starts on a new line.',
          '`System.out.print` prints text or values on the same line — it does not break the line afterwards.',
        ],
      },
      {
        type: 'code',
        heading: 'Example 1 — Hello World',
        language: 'java',
        code: 'public class Example{\n    public static void main(String args[])\n    {\n        System.out.print("Hello World");\n    }\n}',
      },
      { type: 'code', language: 'text', code: 'Output:\nHello World' },
      {
        type: 'code',
        heading: 'Example 2 — println and newline escapes',
        language: 'java',
        code: 'public class Example{\n    public static void main(String args[])\n    {\n        System.out.println("Sunday");\n        System.out.println("Monday");\n        System.out.println("Tuesday\\n\\n");\n        System.out.println("Wednesday");\n    }\n}',
      },
      { type: 'code', language: 'text', code: 'Output:\nSunday\nMonday\nTuesday\n\nWednesday' },
      {
        type: 'text',
        text: "On line 4 above, `\\n` (the escape sequence for a new line) appears twice inside the string, breaking the line twice after `Tuesday` prints. You can chain as many `\\n`s as you need inside a `print`/`println` call to add extra blank lines.",
      },
      {
        type: 'code',
        heading: 'Example 3 — Printing int Values',
        language: 'java',
        code: 'public class Example{\n    public static void main(String args[])\n    {\n        int a=5, b=26;\n        System.out.println("a=" + a + " b=" + b + "\\n\\n");\n        System.out.println("a=" + a);\n        System.out.println("b=" + b);\n    }\n}',
      },
      { type: 'code', language: 'text', code: 'Output:\na=5 b=26\n\na=5\nb=26' },
      {
        type: 'text',
        text: "This program prints the same two values two ways: first on one line, joined with `+` and a space between them; then on separate lines. `\\n` on line 6 breaks the line twice between the two forms of output.",
      },
      {
        type: 'table',
        heading: 'Escape Sequence Characters',
        headers: ['Escape sequence', 'Description'],
        rows: [
          ['\\n', 'Insert a linefeed (new line)'],
          ['\\r', 'Insert a carriage return'],
          ['\\f', 'Insert a form feed'],
          ['\\b', 'Insert a backspace'],
          ['\\t', 'Insert a tab'],
          ['\\\\', 'Insert a backslash'],
          ['\\"', 'Insert a double quote'],
          ["\\'", 'Insert a single quote'],
        ],
      },
      {
        type: 'text',
        heading: '1.4 Input Function',
        text: "The `Scanner` class accepts input from the standard input device (the keyboard) and stores it in one or more variables. It lives in the `java.util` package. Create a `Scanner` object, then call the method matching the type of value you want to read:",
      },
      {
        type: 'table',
        headers: ['Method', 'Description'],
        rows: [
          ['nextBoolean()', 'Reads a boolean type value from the user'],
          ['nextByte()', 'Reads a byte type value from the user'],
          ['nextDouble()', 'Reads a double type value from the user'],
          ['nextFloat()', 'Reads a float type value from the user'],
          ['nextInt()', 'Reads an int type value from the user'],
          ['nextLong()', 'Reads a long type value from the user'],
          ['nextShort()', 'Reads a short type value from the user'],
          ['nextLine()', 'Reads a String type value from the user'],
        ],
      },
      {
        type: 'code',
        heading: 'Example 1 — Reading a Character and a String',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example{\n    public static void main(String args[])\n    {\n        char a;\n        String str;\n        Scanner sc = new Scanner(System.in);\n        System.out.println("Enter any character ");\n        a = sc.nextLine().charAt(0);\n        System.out.println("Enter any string ");\n        str = sc.nextLine();\n        System.out.println("You have entered " + a);\n        System.out.println("You have entered " + str);\n    }\n}',
      },
      {
        type: 'text',
        text: "Lines 7-8 declare a `char` variable `a` and a `String` variable `str`. Line 9 creates a `Scanner` object `sc` (any name works, as long as it follows the variable naming rules). Line 11 reads a character from the user — `charAt(0)` pulls the first character out of whatever `nextLine()` read. Line 13 reads a full string with `nextLine()`. Lines 14-15 print both values back out.",
      },
      {
        type: 'code',
        heading: 'Example 2 — Reading an int, a float, and a double',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example{\n   public static void main(String args[])\n   {\n      int a;\n      float b;\n      double c;\n      Scanner sc=new Scanner(System.in);\n      System.out.println("Enter an integer, a float and a double type numbers");\n      a=sc.nextInt();\n      b=sc.nextFloat();\n      c=sc.nextDouble();\n      System.out.println("You have entered an integer number "+ a +", a float number "+ b +" and a double type number "+c);\n   }\n}',
      },
      {
        type: 'text',
        text: '`nextInt()`, `nextFloat()`, and `nextDouble()` read an integer, a float, and a double from the keyboard respectively, storing each in `a`, `b`, and `c`.',
      },
      {
        type: 'text',
        heading: '1.5 Comments in Java',
        text: 'Comments are portions of code the compiler ignores, letting you leave notes in the relevant parts of your source — widely used for documenting code. Java has two kinds.',
      },
      {
        type: 'bullets',
        items: [
          'Single-line comments start with `//`.',
          'Multi-line (block) comments start with `/*` and end with `*/`, and can span many lines.',
        ],
      },
      {
        type: 'code',
        heading: 'Example 1 — Single-Line Comments',
        language: 'java',
        code: 'public class Example{\n    public static void main(String args[])\n    {\n        // Printing Hello World on the screen.\n        System.out.println("Hello World");  // Now we are going to print Hello World.\n    }\n}',
      },
      { type: 'code', language: 'text', code: 'Output:\nHello World' },
      {
        type: 'code',
        heading: 'Example 2 — Multi-Line Comments',
        language: 'java',
        code: 'public class Example{\n    public static void main(String args[])\n    {\n        /* In this program we will learn how\n        to print Hello World on the screen and\n        perform multiple line comment */\n        System.out.println("Hello World");\n        //System.out.println("This is a Java tutorial");\n    }\n}',
      },
      { type: 'code', language: 'text', code: 'Output:\nHello World' },
      {
        type: 'text',
        text: "A comment can also follow a statement on the same line, as in Example 1's second line, or comment out a whole statement you don't want to run but want to keep for later, as in Example 2's last line.",
      },
      {
        type: 'text',
        heading: '1.6 Mathematical Functions and Expressions',
        text: "Java's mathematical functions are predefined functions that accept values and return a result — to use them, bring in the `Math` class. They let you solve fairly complex equations without writing the arithmetic by hand yourself; finding a square root, for example, just means calling `Math.sqrt()`.",
      },
      {
        type: 'termlist',
        heading: '1.6.1 abs(), sqrt(), and pow()',
        items: [
          { term: 'abs()', def: 'Returns the absolute value of a number — the number without its negative sign, so the result is always positive. Works on `int`, `long`, `float`, or `double` values.' },
          { term: 'sqrt()', def: 'Returns the square root of a positive number. Takes an `int` or `double` as input and always returns a `double`.' },
          { term: 'pow(x, y)', def: 'Computes x raised to the power y. Takes two `double` arguments (base, then power) and returns a `double` — integer or float arguments are implicitly converted to `double` first.' },
        ],
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'int abs(int num);          // absolute value of an int\nlong abs(long num);        // absolute value of a long\nfloat abs(float num);      // absolute value of a float\ndouble abs(double num);    // absolute value of a double\n\ndouble sqrt(double num);\n\ndouble pow(double x, double y);',
      },
      {
        type: 'code',
        heading: 'Example — Absolute Value, Square Root, and Power',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int n, x;\n        double y, z;\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter an integer number ");\n        n = sc.nextInt();\n        x = Math.abs(n);\n        y = Math.sqrt(x);\n        z = Math.pow(y, 2);\n        System.out.println("Absolute value of " + n + " is " + x);\n        System.out.println("Square root of " + x + " is " + y);\n        System.out.println(y + " to power 2 is " + z);\n    }\n}',
      },
      {
        type: 'text',
        text: "Output (for an input of `-25`): `Absolute value of -25 is 25`, `Square root of 25 is 5.0`, `5.0 to power 2 is 25.0`. Walking through it: `-25` is read into `n` and passed to `abs()`, which strips the negative sign and returns `25` into `x`. That `25` is passed to `sqrt()`, which returns `5.0` into `y`. Finally `y` is raised to the power of `2` with `pow()`, returning `25.0` into `z`.",
      },
      {
        type: 'text',
        heading: '1.6.2 min() and max()',
        text: '`min()` returns the smaller of two numbers; `max()` returns the greater. Both accept `int`, `long`, `float`, or `double` arguments.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'int min(int a, int b);        // smallest of two ints\nlong min(long a, long b);     // smallest of two longs\nfloat min(float a, float b);  // smallest of two floats\ndouble min(double a, double b); // smallest of two doubles\n\nint max(int a, int b);        // greatest of two ints\nlong max(long a, long b);     // greatest of two longs\nfloat max(float a, float b);  // greatest of two floats\ndouble max(double a, double b); // greatest of two doubles',
      },
      {
        type: 'code',
        heading: 'Example — Smallest and Greatest of Two Integers',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example{\n public static void main(String args[])\n {\n  int a,b,small,great;\n  Scanner sc=new Scanner(System.in);\n  System.out.println("Enter two integer numbers:");\n  a=sc.nextInt();\n  b=sc.nextInt();\n  smallest=Math.min(a,b);\n  greatest=Math.max(a,b);\n  System.out.println("Greatest number = " + greatest);\n  System.out.println("Smallest number = " + smallest);\n }\n}',
      },
      {
        type: 'note',
        text: "As written, this won't compile: the variables are declared `small` and `great`, but the assignments and prints use `smallest`/`greatest`. Rename the declaration to `int a, b, smallest, greatest;` (or rename every later use back to `small`/`great`) before you type this in.",
      },
      {
        type: 'text',
        text: 'Output (for `54` and `96`): `Greatest number = 96`, `Smallest number = 54`.',
      },
      {
        type: 'text',
        heading: '1.6.3 ceil() and floor()',
        text: "`ceil()` returns the nearest integer greater than or equal to the number passed in; `floor()` returns the nearest integer less than or equal to it. Both take a `double` (a `float` argument is implicitly converted) and return a `double`.",
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'double ceil(double num);\n\ndouble floor(double num);',
      },
      {
        type: 'code',
        heading: 'Example — Ceiling and Floor of a Float',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example{\n    public static void main(String args[])\n    {\n        float n;\n        double x;\n        Scanner sc=new Scanner(System.in);\n        System.out.print("Enter a floating point number ");\n        n=sc.nextFloat();\n        x=Math.ceil(n);\n        y=Math.floor(n);\n        System.out.println("Ceil value of " + n + " is " + x);\n        System.out.println("floor value of " + n + " is " + y);\n    }\n}',
      },
      {
        type: 'note',
        text: "This one won't compile either — `y` is used but never declared. Add `double y;` alongside the `double x;` declaration.",
      },
      {
        type: 'text',
        text: 'Output (for `12.4`): `Ceil value of 12.4 is 13.0`, `floor value of 12.4 is 12.0`.',
      },
      {
        type: 'text',
        heading: 'Laboratory Work 1: Fundamentals of Java Programming',
        text: "The exercises below draw on everything covered in this module, plus what's discussed in practical class — refer back to any of the lessons above as you work through them.",
      },
      {
        type: 'casestudy',
        title: 'Project 1',
        tasks: [
          'Create a new project named `LabWork_1`.',
          'Change the class name to `Project_1`.',
          'Write code that prints the size of each primitive data type in Java to the console.',
        ],
      },
      {
        type: 'casestudy',
        title: 'Project 2',
        tasks: [
          "Within the `LabWork_1` project, create a new Java class named `Project_2` — note that a new class doesn't automatically get a `main` method, so you'll need to add one yourself.",
          'Declare six variables — one each of type int, String, float, char, boolean, and double.',
          'Assign each an arbitrary value, then print them all using `printf()`.',
        ],
      },
      {
        type: 'text',
        heading: 'Project 3',
        text: 'Create a new class named `Project_3`, type in the code below, and run it:',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Project_3{\n    double side_a = 20;\n    double side_b = 27.45;\n    int side_c = 18;\n    public static main(String[] args)\n    {\n        double s = (side_a + side_b + side_c)/2;\n        double ScaleneArea = Math.sqrt(s * (s - side_a) * (s - side_b) * (s - side_c));\n        System.out.printf("%.3d is the area of the scalene triangle\\n", ScaleneArea);\n    }\n}',
      },
      {
        type: 'note',
        text: "This one is deliberately broken, for debugging practice: `main` is missing its `void` return type; `side_a`/`side_b`/`side_c` are instance fields but `main` is `static`, so it can't read them directly (make them `static` too, or move them inside `main`); and `%.3d` is not a valid `printf` conversion for a `double` — that's `%.3f`. Note your observations first, then fix each issue in turn until it compiles and runs.",
      },
      {
        type: 'casestudy',
        title: 'Project 4',
        tasks: [
          'Write a Java program that prompts the user to type in their registration number, name, year of birth, department, test score, and exam score.',
          'Display the registration number, name, age, department, and total score in tabular form.',
        ],
      },
      {
        type: 'text',
        heading: 'Project 5',
        text: 'Write a Java program that implements the models below, then determine the values of `model_1`, `model_2`, and `model_3`, given: $w = -0.56$, $\\lambda = 4.8$, $n = 8$, $T = 6.09$, $v = -3.56$, $Q = 2$, $b = 7$, $p_1 = 0.45$, $q_1 = 3.46$, $v_2 = 8$, $R_1 = \\lambda$, $\\beta = \\sin 45^\\circ$, $k = \\beta\\lambda$.',
      },
      {
        type: 'bullets',
        items: [
          'model_1 = $\\sqrt[4]{\\dfrac{\\pi}{2} + 2vQ} - \\left\\lfloor \\dfrac{\\pi}{4} \\right\\rfloor$',
          'model_2 = $\\left| -2wT - \\dfrac{Wa}{nT} - b + \\dfrac{vQ}{p_1/q_1} \\right|$',
          'model_3 = $\\left| e^{(p_1/v_2)R_1 - \\beta} + \\cos 2k \\right|$',
        ],
      },
      {
        type: 'note',
        text: "The source manual asks for a `model_4` but never defines one, and `model_2`'s formula uses `W` and `a`, which aren't in the variable list above (only lowercase `w`, and no `a` at all) — likely a transcription slip in the original. Check with your lecturer before attempting this project.",
      },
    ],
  },
];
