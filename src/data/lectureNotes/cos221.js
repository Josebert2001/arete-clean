// COS 221 — Computer Programming II (Java)
// Lecture notes transcribed from the lecturer's course manual, "Object
// Oriented Programming and Design — Java Practical Approach". Shared by every
// department catalogue that carries COS 221 (Cybersecurity and Data Science
// both take it, in Java) — edit here once rather than per catalogue.
//
// Modules 1-6, 8-13 are transcribed so far; Module 7 is not yet available
// and will be inserted in manual order once its source is provided. The manual
// runs to Module 13 (advanced OOP, collections, threads, JDBC, GUI). More
// topics will be added as the rest of the manual is transcribed.
//
// Module 5's own PDF scan was misfiled on disk as "module 5.pdf" (which is
// actually a duplicate of Module 4) — the real scan turned up under a
// different filename. If a later module's transcription looks wrong, check
// the source PDF's own printed page numbers/heading against the expected
// range before trusting the filename.

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
  {
    number: '2',
    title: 'Flow Control Structures',
    sections: [
      {
        type: 'text',
        heading: '2.1 Introduction',
        text: 'A program is a sequence of instructions. There are two basic aspects of computer programming: data and instructions. To work with data, you need to understand variables and data types; to work with instructions, you need to understand control structures and statements.\n\nA control structure is a syntactic form in a language to express flow of control. A sequence of statements is executed depending on whether or not the condition is true or false. This means the program chooses between two or more alternative paths. Hence it is the basic decision-making process in computer programming; flow control determines how a computer will respond when given certain conditions and parameters.',
      },
      {
        type: 'text',
        heading: '2.2 Transfer Structures',
        text: 'Normally, in the flow of control, the computer executes the instructions in the sequence in which they appear, one by one. This condition is called sequence accomplishment. In computer programming, the statement that will be accomplished next is not necessarily located in the next line. This scenario is known as transfer of program control. From the following lessons you can understand the control structures and statements in Java language.',
      },
      {
        type: 'text',
        heading: '2.2.1 if statement',
        text: 'The "if-else" statement in Java is used to control the flow of execution of a program based on a certain condition. The basic idea behind the "if-else" statement is to execute a certain block of code only if a particular condition is met.',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/04-if-else-flow-control.png',
        width: 266, height: 287, maxWidth: 260,
        alt: 'Flowchart: from Condition, a True arrow leads to action and a False arrow leads to alternate action, both rejoining at Rest of Code',
        caption: 'if-else statement flow control',
      },
      {
        type: 'text',
        text: 'The "if" statement in Java is a control flow statement that allows you to execute a block of code conditionally based on the result of a Boolean expression.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'if (condition/expression)\n{\n    // Statement(s) to be executed if the expression is true\n}',
      },
      {
        type: 'text',
        text: "In the above syntax, inside the brackets () of the if statement, we write our condition/expression. The expression is a Boolean expression that returns either true or false. If the condition/expression evaluates to true, the code inside the set of curly braces {...} will be executed, and if it evaluates to false, the code inside the curly braces will be skipped. We can write our condition using arithmetic, relational, and logical operators.\n\nNow let's see some examples for more understanding.",
      },
      {
        type: 'text',
        heading: 'Example 1 — Condition using relational operator',
        text: "Java program to check if an integer variable's value is greater than 10.",
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int a = 25;\n        if (a > 10)\n        {\n            System.out.println("Yes " + a + " is greater than 10");\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nYes 25 is greater than 10',
      },
      {
        type: 'text',
        text: 'Here you can see that the condition (a > 10) is true because the value of a is greater than 10. So the statement written inside the curly braces of the if statement is executed and the output is printed on the screen.',
      },
      {
        type: 'text',
        heading: 'Example 2 — Condition using arithmetic and relational operator',
        text: "Java program to check if the sum of two integer variables' values is greater than 10.",
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int a = 10, b = 5;\n        if (a + b > 10)\n        {\n            System.out.println("Yes " + (a + b) + " is greater than 10");\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nYes 15 is greater than 10',
      },
      {
        type: 'text',
        text: 'Here you can see that we have used arithmetic and relational operators in the condition (a + b > 10) and the condition is also true because the value of a + b is greater than 10. So the statement written inside the curly braces of the if statement is executed and the output is printed on the screen.',
      },
      {
        type: 'text',
        heading: 'Example 3 — Condition using arithmetic, relational, and logical operators',
        text: "Java program to check if an integer variable's value is an even number and is also greater than 10.",
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int a = 18;\n        if (a % 2 == 0 && a > 10)\n        {\n            System.out.println(a + " is an even number and is also greater than 10");\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n18 is an even number and is also greater than 10',
      },
      {
        type: 'text',
        text: 'Here you can see that we have used arithmetic, relational, and logical operators in the condition (a % 2 == 0 && a > 10) and both conditions, a % 2 == 0 and a > 10, are also true because the remainder of the modulus division a % 2 is equal to 0 and the value of a is greater than 10. So the statement written inside the curly braces of the if statement is executed and the output is printed on the screen.',
      },
      {
        type: 'text',
        heading: '2.2.2 if-else statement',
        text: 'The "if-else" statement in Java is an extension of the "if" statement that allows you to specify an alternate block of code to be executed if the expression is false. In a Java program, the if statement alone tells us that if a condition is true then it will execute a block of statements and if the condition is false it will not. But what if we want to do something else if the condition is false? Here comes the else statement. We can use the else statement with an if statement to execute a block of code when the condition is false.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'if (expression)\n{\n    // Run this part if the expression is true\n}\nelse\n{\n    // Run this part if the expression is false\n}',
      },
      {
        type: 'text',
        text: 'The expression is a Boolean expression that returns either true or false. If the expression evaluates to true, the code inside the first set of curly braces {...} will be executed, and if it evaluates to false, the code inside the second set of curly braces {...} will be executed.',
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'A Java program to check if you passed or failed, given a pass mark of 50.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class TestClass\n{\n    public static void main(String[] args)\n    {\n        int totalMarks = 48;\n        if (totalMarks > 50)\n        {\n            System.out.print("You have passed the exam !!");\n        }\n        else\n        {\n            System.out.print("You have failed the exam !!");\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nYou have failed the exam !!',
      },
      {
        type: 'text',
        heading: '2.2.3 if...else if...else statements',
        text: 'Here, a user can decide among multiple options. The if statements in a Java program are executed from the top down. As soon as one of the conditions controlling the if or else if is true, the statement associated with that if or else if is executed, and the rest of the else if statements are bypassed. If none of the conditions is true, then the final else statement will be executed.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'if (expression 1)\n{\n    // Run this part if expression 1 is true\n}\nelse if (expression 2)\n{\n    // Run this part if expression 1 is false and expression 2 is true\n}\nelse if (expression 3)\n{\n    // Run this part if expression 1 and expression 2 are false\n    // and expression 3 is true\n}\nelse\n{\n    // Run this part if expression 1, expression 2, and expression 3 are false\n}',
      },
      {
        type: 'text',
        text: 'In the above syntax, you can see that we have started with an if statement and then we are using else if statements. The ... means that we can write more else if statements if required to check multiple options. If none of the conditions written inside the if statements is true, then the final else statement will be executed. Here, the else statement is optional.',
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'Java program to check average score and display the class of honours: > 80: Distinction; > 60: Merit; > 40: Pass.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class HonourClass\n{\n    public static void main(String[] args)\n    {\n        int AverageScore = 54;\n\n        if (AverageScore >= 80)\n        {\n            System.out.print("You got a Distinction Class");\n        }\n        else if (AverageScore >= 60 && AverageScore < 80)\n        {\n            System.out.print("You got a Merit Class");\n        }\n        else if (AverageScore >= 40 && AverageScore < 60)\n        {\n            System.out.print("Just pass only");\n        }\n        else\n        {\n            System.out.print("You have failed the exam !!");\n        }\n    }\n}',
      },
      {
        type: 'table',
        headers: ['Average score', 'Output'],
        rows: [['54', 'Just pass only']],
      },
      {
        type: 'text',
        text: 'Here you can see that the first condition (AverageScore >= 80) is false, so the second condition (AverageScore >= 60 && AverageScore < 80) written in the else if statement is checked and the condition is also false. Again, the third condition (AverageScore >= 40 && AverageScore < 60) written in the else if statement is checked and this time the condition is true, so the statement written inside the curly braces of the second else if statement is executed and the output is printed on the screen.',
      },
      {
        type: 'text',
        heading: '2.2.4 Nested if-else Statement',
        text: 'The basic idea behind a nested "if" statement in Java is to test multiple conditions in a single control flow statement.',
      },
      {
        type: 'code',
        heading: 'Syntax of nested if statement',
        language: 'java',
        code: 'if (expression 1)\n{\n    // Run this part if expression 1 is true\n\n    if (expression 2)\n    {\n        // Run this part if expression 2 is true\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above example, the first if statement tests the condition represented by expression 1. If expression 1 evaluates to true, the code inside the first set of curly braces {...} will be executed. Within this code block, there is another "if" statement that tests the condition represented by expression 2. If expression 2 also evaluates to true, the code inside the second set of curly braces will be executed.',
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'Java program to recommend a candidate who scores 270 and above, and whose course of study is Medicine and Surgery, with a scholarship for admission.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Admission\n{\n    public static void main(String[] args)\n    {\n        Scanner input = new Scanner(System.in);\n\n        System.out.println("Enter Average Score");\n        int AverageScore = input.nextInt();\n\n        System.out.println("Enter Course of study");\n        String Course = input.next();\n\n        System.out.println("Do you have scholarship; Yes or No ?");\n        String Scholar = input.next();\n\n        if (AverageScore >= 270)\n        {\n            if (Course.toLowerCase().equals("medicine"))\n            {\n                if (Scholar.toLowerCase().equals("yes"))\n                {\n                    System.out.println("Recommended for Admission");\n                }\n                else\n                {\n                    System.out.println("Not Recommended");\n                }\n            }\n            else\n            {\n                System.out.println("Not Recommended");\n            }\n        }\n        else\n        {\n            System.out.println("Not Recommended");\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'Nested "if" statements can be useful when you need to test multiple conditions in a single control flow statement. For example, you might use a nested "if" statement to check if a variable is within a certain range and take different actions based on whether the variable is greater than, less than, or equal to a certain value.',
      },
      {
        type: 'termlist',
        heading: 'Common uses of the transfer statement in Java',
        items: [
          { term: 'Conditional execution', def: 'The most common use of the "if-else" statement is to conditionally execute a block of code based on the result of a Boolean expression. For example, you might want to execute a block of code that performs a calculation only if a certain variable has a specific value.' },
          { term: 'Decision making', def: 'The "if-else" statement can also be used to make decisions in your code based on different conditions. For example, you might use an "if-else" statement to determine which of two different actions to take based on the value of a variable.' },
          { term: 'Error checking', def: 'The "if-else" statement can also be used to check for errors or invalid inputs in your code. For example, you might use an "if-else" statement to validate user input and display an error message if the input is not valid.' },
          { term: 'Multiple branches', def: 'The "if-else" statement can also be used to handle multiple branches of execution based on different conditions. For example, you might use multiple "if-else" statements to handle different cases in a switch statement.' },
        ],
      },
      {
        type: 'text',
        heading: '2.3 Switch case Statement',
        text: "In a Java program, a switch statement is used to compare an expression's output value from a list of values, where each value is a case. When the expression's output value is equal to one of the case's values, then the statements following that case are executed.\n\nA break statement ends the switch case. The optional default case is used when the value of the test expression does not match with any of the case's values.",
      },
      {
        type: 'code',
        heading: 'Switch syntax',
        language: 'java',
        code: 'switch (expression)\n{\n    case value:\n        statements;\n        break;\n\n    case value:\n        statements;\n        break;\n\n    // You can have any number of case statements.\n\n    default: // Optional\n        statements;\n}',
      },
      {
        type: 'text',
        text: "In the above syntax, we will write our test expression in place of expression. If the test expression's output value matches with any of the case's values, then the statements following that case are executed. A break statement ends the switch case. If the test expression's output value does not match with any of the case's values, then the default (optional case) will execute. In the default case, break is not required; after that, the switch statement ends automatically.",
      },
      {
        type: 'bullets',
        heading: 'Rules applying to switch-case statements',
        items: [
          "The expression's output value must be of type; byte, short, char, int, or String.",
          'You can have any number of case statements within a switch. Each case is followed by a value and a colon.',
          "The value of a case must be a constant value and must be of the same data type as the output value of the test expression in the switch statement.",
          "When the value being switched on is equal to a case's value, the statements following that case will execute until a break statement is reached.",
          'Duplicate case values are not allowed.',
          'When a break statement is reached, the switch terminates, and the flow of control jumps to the next line following the switch statement.',
          'Every case needs to contain a break. If no break appears, the flow of control will fall through to subsequent cases until a break is reached.',
          'A switch statement can have an optional default case, which must appear at the end of the switch. The default case can be used for performing a task when none of the cases is true. No break is needed in the default case.',
          'Nesting of switch statements is allowed, which means you can have switch statements inside another switch. However, nested switch statements should be avoided as they make programs more complex and less readable.',
        ],
      },
      {
        type: 'text',
        text: "Now let's see some examples for more understanding.",
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'Java program to input any day number between 1 to 7 and print the day name of the given number; for example, 1 = Sunday, 2 = Monday, and so on.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int d;\n        Scanner getNum = new Scanner(System.in);\n\n        System.out.print("Enter day number: ");\n        d = getNum.nextInt();\n\n        switch (d)\n        {\n            case 1:\n                System.out.print("Sunday");\n                break;\n            case 2:\n                System.out.print("Monday");\n                break;\n            case 3:\n                System.out.print("Tuesday");\n                break;\n            case 4:\n                System.out.print("Wednesday");\n                break;\n            case 5:\n                System.out.print("Thursday");\n                break;\n            case 6:\n                System.out.print("Friday");\n                break;\n            case 7:\n                System.out.print("Saturday");\n                break;\n            default:\n                System.out.print("Invalid Number");\n        }\n    }\n}',
      },
      {
        type: 'table',
        headers: ['Input', 'Output'],
        rows: [['Enter day number: 5', 'Thursday']],
      },
      {
        type: 'text',
        text: 'Here you can see that we have input 5 as the value of d, and the variable d is used as an expression in the switch statement. Its value matches the value of the fifth case, so the statement following the fifth case is executed and the output, Thursday, is printed on the screen.',
      },
      {
        type: 'text',
        heading: 'Example 2',
        text: 'Java program to input a number and check if it is an even or odd number.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int n;\n        Scanner getNum = new Scanner(System.in);\n\n        System.out.print("Enter a number: ");\n        n = getNum.nextInt();\n\n        switch (n % 2)\n        {\n            case 0:\n                System.out.print("Even Number");\n                break;\n            case 1:\n                System.out.print("Odd Number");\n                break;\n        }\n    }\n}',
      },
      {
        type: 'table',
        headers: ['Input', 'Output'],
        rows: [['Enter a number: 26', 'Even Number']],
      },
      {
        type: 'text',
        text: 'Here you can see that we have input 26 as the value of n. The test expression of the switch statement is n % 2, and its output value is 0, which matches the value of the first case, so the statement following the first case is executed and the output, Even Number, is printed on the screen. Here the default case is not required because the output of the test expression is either 0 or 1 only.',
      },
      {
        type: 'text',
        heading: 'Example 3',
        text: 'Java program to print a remark according to the grade obtained.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        char g = \'B\';\n        System.out.println("Grade: " + g);\n\n        switch (g)\n        {\n            case \'A\':\n                System.out.print("Remark:\\t Excellent!");\n                break;\n            case \'B\':\n            case \'C\':\n                System.out.print("Remark:\\t Well Done");\n                break;\n            case \'D\':\n                System.out.print("Remark:\\t Fail");\n                break;\n            default:\n                System.out.print("Invalid Grade");\n        }\n    }\n}',
      },
      {
        type: 'table',
        headers: ['Grade', 'Remark'],
        rows: [['B', 'Well Done']],
      },
      {
        type: 'text',
        text: 'Here you can see that we have taken grade B and it is matching with case B, so the output, Well Done, is printed on the screen. You can also see that case B and case C have a common block of code.',
      },
      {
        type: 'text',
        heading: 'Example 4 — Menu-based program',
        text: 'The following is a menu-based program. The user chooses an option from the given menu and the program associated with that menu will execute. Let us see an example for more understanding.\n\nJava menu-based program to find addition, subtraction, multiplication, and division of two integer numbers.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class SwitchCase\n{\n    public static void main(String args[])\n    {\n        int a, b, num;\n        Scanner getNum = new Scanner(System.in);\n\n        System.out.println("Enter a number to perform arithmetic operation");\n        System.out.println("1 Addition\\n2 Subtraction\\n3 Multiplication\\n4 Division");\n        num = getNum.nextInt();\n\n        switch (num)\n        {\n            case 1:\n                System.out.println("Enter 2 integer numbers");\n                a = getNum.nextInt();\n                b = getNum.nextInt();\n                System.out.print("Addition\\n" + a + "+" + b + " = " + (a + b) + "\\n");\n                break;\n\n            case 2:\n                System.out.println("Enter 2 integer numbers");\n                a = getNum.nextInt();\n                b = getNum.nextInt();\n                System.out.print("Subtraction\\n" + a + "-" + b + " = " + (a - b) + "\\n");\n                break;\n\n            case 3:\n                System.out.println("Enter 2 integer numbers");\n                a = getNum.nextInt();\n                b = getNum.nextInt();\n                System.out.println("Multiplication\\n" + a + "*" + b + " = " + (a * b) + "\\n");\n                break;\n\n            case 4:\n                System.out.println("Enter 2 integer numbers");\n                a = getNum.nextInt();\n                b = getNum.nextInt();\n                System.out.print("Division\\n" + a + "/" + b + " = " + (a / b) + "\\n");\n                break;\n\n            default:\n                System.out.print("Invalid Choice\\n");\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'The menu printed on the screen is:',
      },
      {
        type: 'table',
        headers: ['Option', 'Operation'],
        rows: [
          ['1', 'Addition'],
          ['2', 'Subtraction'],
          ['3', 'Multiplication'],
          ['4', 'Division'],
        ],
      },
      {
        type: 'code',
        heading: 'Observed run/output box',
        language: 'text',
        code: 'run:\nEnter a number to perform arithmetic operation\n1 Addition\n2 Subtraction\n3 Multiplication\n4 Division\n1\nEnter 2 integer numbers\n23\n22\nAddition\n23+22 = 45\nBUILD SUCCESSFUL (total time: 13 seconds)',
      },
      {
        type: 'text',
        text: 'Here you can see that we have printed the menu on the screen and, based on the option selected by the user, the matching case executes; in this case, 1 was chosen.',
      },
      {
        type: 'text',
        heading: '2.4 Loop Structure',
        text: 'There are many situations when you want to execute a block of statements several times in your applications. Loops can execute a block of code a number of times. For example, suppose we want to print Hello World five times on the screen. This can be done in two ways, either iteratively or by looping.\n\nIn the iterative method we have to write the System.out.println() statement five times in our program as shown below.',
      },
      {
        type: 'code',
        heading: 'Example — Iterative method',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        System.out.println("Hello World");\n        System.out.println("Hello World");\n        System.out.println("Hello World");\n        System.out.println("Hello World");\n        System.out.println("Hello World");\n    }\n}',
      },
      {
        type: 'text',
        text: 'Output: Hello World printed five times.\n\nIn the loop method, we do not have to write Hello World five times in our program; rather, we have to write Hello World only once and the loop will execute the statement five times.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        for (int i = 1; i <= 5; i++)\n        {\n            System.out.println("Hello World");\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'Output: Hello World printed five times.\n\nThere are three types of loop structures: for...loop, while...loop, and do...while...loop.',
      },
      {
        type: 'text',
        heading: '2.4.1 for...loop Structure',
        text: 'A for loop in Java is a repetition-control structure that allows us to write a loop that is executed a specific number of times. The for loop is also called an entry-controlled loop because the test expression is tested before entering the loop body.',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/05-for-loop-flow-diagram.png',
        width: 621, height: 660, maxWidth: 340,
        alt: 'Flowchart: Initialization, then Condition — True goes to Loop Statements then Step and back to Condition, False exits the loop',
        caption: 'for-loop flow diagram',
      },
      {
        type: 'code',
        heading: 'Syntax of for loop',
        language: 'java',
        code: 'for (initialization expression; test expression; step or increment)\n{\n    // body of the loop\n    // statements we want to execute many times\n}',
      },
      {
        type: 'text',
        text: 'In a for loop, a loop variable is used to control the loop. First initialize this loop variable to some value, then check whether this variable is less than or greater than the counter value. If the statement is true, then the loop body is executed and the loop variable gets updated. These steps are repeated until the test expression evaluates to false.\n\n' +
          "Let's understand the above looping structure step by step using the Hello World program above.",
      },
      {
        type: 'termlist',
        items: [
          { term: 'Initialization expression', def: 'In the above example, int i = 1; is our initialization expression. In this expression we initialize the loop variable to some value so that the loop will start from the initialized value. In the above example the loop will start from 1 and continue to execute until it crosses the value 5.' },
          { term: 'Test expression', def: 'In the above example, i <= 5; is our test expression. The compiler will test the condition written in the test expression. If the condition evaluates to true, then the body of the loop will execute. After the body executes, program control goes to the step or increment to update the expression; otherwise, it exits from the for loop.' },
          { term: 'Step or increment', def: 'This part updates the expression. In the above example, i = i + 1 is our update expression. After executing the body of the loop, the update expression increments the loop variable i by 1 and then moves to test the condition written in the test expression. If the test expression evaluates to true, it executes the body again, and the process continues until the test expression evaluates to false. When the test expression evaluates to false, the for loop terminates.' },
        ],
      },
      {
        type: 'text',
        heading: 'Different ways of writing a for loop',
        text: "A for loop can be written in various ways depending on the requirement. Let's see the different forms of writing a for loop.",
      },
      {
        type: 'code',
        heading: 'Style 1',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i;\n        for (i = 1; i <= 5; i = i + 1)\n        {\n            System.out.println("Hello World");\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Style 2',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i = 1;\n        for (; i <= 5; i = i + 1)\n        {\n            System.out.println("Hello World");\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Style 3',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i = 1;\n        for (; i <= 5; )\n        {\n            System.out.println("Hello World");\n            i++;\n        }\n    }\n}',
      },
      {
        type: 'text',
        heading: '2.4.1.1 Nested for Loop',
        text: 'Java programming allows using one for loop inside another for loop. This is known as a nested for loop.',
      },
      {
        type: 'code',
        heading: 'Syntax of nested for loop',
        language: 'java',
        code: 'for (initialization expression; test expression; update expression)\n{\n    // body of the outer loop\n    // statements we want to execute\n\n    for (initialization expression; test expression; update expression)\n    {\n        // body of the inner loop\n        // statements we want to execute\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Example 1',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i, j;\n        for (i = 0; i <= 9; i = i + 1)\n        {\n            for (j = 0; j <= i; j++)\n            {\n                System.out.print(j);\n            }\n            System.out.println();\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n0\n01\n012\n0123\n01234\n012345\n0123456\n01234567\n012345678\n0123456789\nBUILD SUCCESSFUL (total time: 0 seconds)',
      },
      {
        type: 'text',
        text: 'In the above example, we have run two loops, one outer loop and another inner loop. The outer loop, i, runs from 0 to 9, and the inner loop, j, runs from 0 to the current value of the outer loop. For example, when the value of i is 1, the inner loop runs from 0 to 1. When the value of i is 2, the inner loop runs from 0 to 2 and so on. The program ends when the outer-loop test expression evaluates to false.',
      },
      {
        type: 'text',
        heading: '2.4.1.2 Infinite for Loop',
        text: 'A Java infinite for loop is a loop that never ends because it does not have any test condition. It keeps executing unless and until we terminate the loop using the break statement, as shown in the example below.',
      },
      {
        type: 'code',
        heading: 'Syntax of infinite for loop in Java',
        language: 'java',
        code: 'for (;;)\n{\n    // body of the infinite for loop\n}',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i = 0;\n        for (;;)\n        {\n            System.out.println("Hello World");\n            i = i + 1;\n            if (i == 5)\n            {\n                // terminate the infinite loop when the value of i is 5\n                break;\n            }\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nHello World\nHello World\nHello World\nHello World\nHello World',
      },
      {
        type: 'text',
        heading: '2.4.2 while...loop Structure',
        text: 'A while loop is used in situations where we do not know the exact number of iterations of a loop beforehand. While loops continue to loop as long as a test expression is true. The while loop is also called an entry-controlled loop because the test expression is tested before entering the loop body.',
      },
      {
        type: 'code',
        heading: 'Syntax of while loop',
        language: 'java',
        code: 'initialization expression;\nwhile (test_expression)\n{\n    // body of the loop\n    // statements we want to execute\n    update expression;\n}',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        // initialization expression\n        int i = 1;\n\n        // test expression\n        while (i <= 5)\n        {\n            System.out.println("Hello World using while loop");\n\n            // update expression\n            i = i + 1;\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nHello World using while loop\nHello World using while loop\nHello World using while loop\nHello World using while loop\nHello World using while loop',
      },
      {
        type: 'text',
        text: 'Just like the for loop, in a while loop we also initialize the loop variable before starting the while loop. After initialization, we evaluate the test expression inside the parenthesis () of the while loop. If the test expression evaluates to true, then the body of the while loop will execute, and the update expression will update the loop value. This process continues until the test expression evaluates to false. When the test expression evaluates to false, the while loop terminates.',
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'Java program to print the squares of 1 to 10 on the screen using while loop.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        System.out.print("Squares of 1 to 10\\n");\n        int i = 1;\n        while (i <= 10)\n        {\n            System.out.printf("%.0f\\n", Math.pow(i, 2));\n            i = i + 1;\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Run output',
        language: 'text',
        code: 'Squares of 1 to 10\n1\n4\n9\n16\n25\n36\n49\n64\n81\n100',
      },
      {
        type: 'text',
        text: 'In the above example, we have run a while loop from 1 to 10. Each time when the loop runs, we print the square of the value of the variable i on the screen on a separate line using the System.out.printf() statement. The loop ends when the value of i is more than 10.',
      },
      {
        type: 'text',
        heading: '2.4.2.1 Nested while Loop',
        text: 'Java programming allows using one while loop inside another while loop. This is known as a nested while loop.',
      },
      {
        type: 'code',
        heading: 'Syntax of nested while loop',
        language: 'java',
        code: 'initialization expression;\nwhile (test expression)\n{\n    // body of the outer loop\n    // statements we want to execute\n\n    initialization expression;\n    while (test expression)\n    {\n        // body of the inner loop\n        // statements we want to execute\n        update expression;\n    }\n\n    update expression;\n}',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i = 0, j;\n        while (i <= 9)\n        {\n            j = 0;\n            while (j <= i)\n            {\n                System.out.print("#");\n                j++; // it means j = j + 1\n            }\n            System.out.println();\n            i++; // it means i = i + 1\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n#\n##\n###\n####\n#####\n######\n#######\n########\n#########\n##########',
      },
      {
        type: 'text',
        text: 'In the above example, we have run two loops, one outer loop and another inner loop. The outer loop, i, runs from 0 to 9, and the inner loop, j, runs from 0 to the current value of the outer loop. For example, when the value of i is 1, the inner loop runs from 0 to 1. When the value of i is 2, the inner loop runs from 0 to 2 and so on. The program ends when the outer-loop test expression evaluates to false.',
      },
      {
        type: 'text',
        heading: '2.4.2.2 Infinite while Loop',
        text: 'An infinite while loop is a loop that never ends because its test condition never evaluates to false. It keeps executing unless and until we terminate the loop using the break statement, as shown in the example below.',
      },
      {
        type: 'code',
        heading: 'Syntax of infinite while loop in Java',
        language: 'java',
        code: 'while (true)\n{\n    // body of the infinite while loop\n}',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i = 0;\n        while (true)\n        {\n            System.out.println("Hello World");\n            i = i + 1;\n            if (i == 5)\n            {\n                break; // terminate the infinite loop when the value of i is 5\n            }\n        }\n    }\n}',
      },
      {
        type: 'text',
        heading: '2.4.3 do...while loop Structure',
        text: 'A do-while loop is similar to a while-loop statement, but in the do-while loop the loop body will be executed first, then the condition is evaluated. If the condition is true, the loop body will be executed. Otherwise the loop will be terminated. The advantage of a do-while loop is that it executes the block of code at least once, and then repeatedly executes the block depending on the condition.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'do {\n    statements;\n} while (condition);',
      },
      {
        type: 'code',
        heading: 'Example 1',
        language: 'java',
        code: 'class TestClass\n{\n    public static void main(String[] args)\n    {\n        boolean enter = false;\n        do\n        {\n            System.out.println("Enter in do...while loop");\n        } while (enter);\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above code, boolean enter = false;. Even though the value of enter is false, the code block is executed at least once. So the message is displayed one time. If you give the condition to a while loop, it will exit without showing the message, because the condition is false and never goes inside the code block.',
      },
      {
        type: 'text',
        heading: 'Example 2',
        text: 'Java program to print all the even numbers from 10 to 20 on the screen using do-while loop.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int i = 10;\n        do\n        {\n            System.out.println(i);\n            i = i + 2;\n        }\n        while (i <= 20);\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n10\n12\n14\n16\n18\n20',
      },
      {
        type: 'text',
        text: 'In the above example, we have run a do-while loop from 10 to 20. Each time when the loop runs, we print the value of the variable i on the screen on a separate line using the System.out.println() statement and then increment the value of i by 2. The loop ends when the value of i is more than 20.\n\nThe difference between do...while loop and while...loop is that do...while loop evaluates its condition at the last of the loop instead of the first; in while...loop the condition is evaluated first. Therefore, the statements within the do block are always executed at least once.',
      },
      {
        type: 'text',
        heading: '2.5 Break and Continue Statement',
        text: 'The break statement in Java is a loop-control statement which is used to terminate the loop. When the break statement is encountered within a loop, the loop stops its iteration and control returns from the loop immediately to the first statement written outside the body of the loop. The break statement is used in situations when we want to terminate the loop based on some condition. A break statement can be used in for loop, while loop, and do-while loop, as in some of the examples above.',
      },
      {
        type: 'code',
        heading: 'Example using break with a simple for loop',
        language: 'java',
        code: 'public class BreakExample\n{\n    public static void main(String args[])\n    {\n        int i;\n        for (i = 2; i <= 50; i = i + 2)\n        {\n            if (i == 10)\n            {\n                break;\n            }\n            System.out.print(i + " ");\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n2 4 6 8',
      },
      {
        type: 'text',
        text: 'In the above example, we want to exit from the loop when the value of i is equal to 10. So, we have used a break statement inside the body of the if statement, which executes when the condition is true, and the loop terminates.',
      },
      {
        type: 'text',
        heading: 'continue Statement',
        text: 'The continue statement in Java is also a loop-control statement just like the break statement. The continue statement is opposite to that of the break statement; instead of terminating the loop, it forces the loop to execute the next iteration.\n\nAs the name suggests, the continue statement forces the loop to continue or execute the next iteration. When the continue statement executes in the loop, the code inside the loop following the continue statement will be skipped and the next iteration of the loop will begin. A continue statement can be used in for loop, while loop, and do-while loop.',
      },
      {
        type: 'text',
        heading: 'Example',
        text: 'Consider the situation when you need to write a program which prints the numbers from 1 to 10 except the number 6. It is specified that you have to do this using a loop and only one loop is allowed to be used.\n\nHere comes the usage of the continue statement. What we can do here is run a loop from 1 to 10, and every time we have to compare the value of the iterator with 6. If it equals 6, we will use the continue statement to continue to the next iteration without printing anything; otherwise, we will print the value.\n\nBelow is the implementation of the above idea:',
      },
      {
        type: 'code',
        language: 'java',
        code: 'public class ContExample\n{\n    public static void main(String args[])\n    {\n        int i;\n\n        // we run a loop from 1 to 10\n        for (i = 1; i <= 10; i++)\n        {\n            // If the value of i is equals to 6,\n            // continue to next iteration\n            // without printing anything\n            if (i == 6)\n            {\n                continue;\n            }\n\n            // otherwise print the value of i\n            System.out.print(i + " ");\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n1 2 3 4 5 7 8 9 10',
      },
      {
        type: 'text',
        text: 'In the above example, when the value of i becomes 6, the continue statement executes and the loop moves to the next iteration without executing anything written after it.',
      },
    ],
  },
  {
    number: '3',
    title: 'Array',
    sections: [
      {
        type: 'text',
        heading: '3.1 Introduction',
        text: 'Previously, we learned to store a single value in a variable. Now we are concerned about storing multiple values in a variable; this is possible with an array. An array is a container object that holds a fixed number of values of a single type.',
      },
      {
        type: 'text',
        heading: '3.2 One Dimensional Array (1D Array)',
        text: 'A One-Dimensional Array in Java programming is a special type of variable that can store multiple values of a single data type such as int, float, double, char, etc. at a contiguous location in computer memory. Here, contiguous location means at a fixed gap in computer memory. A One-Dimensional Array is also known as a 1D Array.\n\nSuppose we want to store the age of 10 students. In that case, we have to declare 10 variables in our Java program to store the age of 10 students.\n\nNow here comes the use of a one-dimensional array. With the help of a 1D array, we will declare a single variable in our Java program that can store the age of 10 students at a time.',
      },
      {
        type: 'code',
        heading: 'Declaration Syntax of a One Dimensional Array in Java',
        language: 'java',
        code: 'datatype variable_name[] = new datatype[size];\n\n// or\n\ndatatype[] variable_name = new datatype[size];',
      },
      {
        type: 'text',
        text: 'Here, size is the number of elements we want to store in the array.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'int a[] = new int[5];\n\n// or\n\nint[] a = new int[5];',
      },
      {
        type: 'text',
        text: 'Once we declare the 1D array, it will look like as shown below:',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/06-one-dimensional-array.png',
        width: 528, height: 323, maxWidth: 400,
        alt: 'Array a with five cells indexed 0 to 4; box stating size 5, index 0 1 2 3 4, first index 0 called lower bound, last index 4 called upper bound',
      },
      {
        type: 'text',
        text: 'In the above image we can see that the name of the one-dimensional array is a and it can store 5 integer numbers. The size of the array is 5. The index of the array is 0, 1, 2, 3, and 4.\n\nThe first index is called the Lower Bound, and the last index is called the Upper Bound. The Upper Bound of a one-dimensional array is always Size - 1.',
      },
      {
        type: 'text',
        heading: 'Declaration and Initialization of a One Dimensional Array in Java',
        text: "In Java programming, a one-dimensional array can be declared and initialized in several ways. Let's see the different ways of initializing a 1D array.",
      },
      { type: 'code', heading: 'Example 1', language: 'java', code: 'int a[] = new int[] {12, 18, 6};' },
      { type: 'code', heading: 'Example 2', language: 'java', code: 'int a[] = {7, 12, 9};' },
      { type: 'code', heading: 'Example 3', language: 'java', code: 'int a[] = new int[3];' },
      {
        type: 'note',
        text: 'If an array is initialized without assigning any value, then the default value of each cell of the array will be 0.',
      },
      {
        type: 'text',
        heading: 'Store Numbers in a One-Dimensional Array',
        text: 'To store a number in each cell of the array, we can use the following syntax:',
      },
      { type: 'code', language: 'java', code: 'array_name[index] = value;' },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'a[0] = 26;\na[1] = 15;\na[2] = 34;',
      },
      {
        type: 'text',
        heading: 'Access Numbers in a One Dimensional Array',
        text: 'We can access any number stored in a 1D array using the following syntax:',
      },
      { type: 'code', language: 'java', code: 'array_name[index];' },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'System.out.println(a[0] + " " + a[1] + " " + a[2]);',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n26 15 34',
      },
      {
        type: 'text',
        heading: 'Store and Access the Numbers in a 1D Array using Loops',
        text: "We can also store as well as access the numbers in a 1D array using either a for, while, or do-while loop. Let's see a few examples.",
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'Program to input 10 numbers in an array and display only the even numbers if present in the array.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int a[] = new int[10], i;\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println("Enter 10 numbers");\n        for (i = 0; i < 10; i++)\n        {\n            a[i] = sc.nextInt();\n        }\n\n        System.out.println("List of even numbers");\n        for (i = 0; i < 10; i++)\n        {\n            if (a[i] % 2 == 0)\n            {\n                System.out.print(a[i] + " ");\n            }\n        }\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Enter 10 numbers\n11\n15\n28\n31\n49\n54\n72\n81\n93\n14\nList of even numbers\n28 54 72 14',
      },
      {
        type: 'text',
        text: "Here, you can see that we have run a for loop 10 times to store the user's input in the array. After that, we have run another for loop 10 times to access each number from the array and print only the even numbers from it.",
      },
      {
        type: 'text',
        heading: '3.3 Two Dimensional Array (2D Array)',
        text: 'A Two Dimensional Array in Java is a collection of 1D arrays. It consists of rows and columns and looks like a table. A 2D array is also known as a Matrix.',
      },
      {
        type: 'code',
        heading: 'Declaration Syntax of a Two Dimensional Array in Java',
        language: 'java',
        code: 'datatype variable_name[][] = new datatype[row_size][column_size];\n\n// or\n\ndatatype[][] variable_name = new datatype[row_size][column_size];',
      },
      {
        type: 'text',
        text: 'Here, row_size is the number of rows we want to create in a 2D array, and column_size is the number of columns in each row.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'int a[][] = new int[3][3];\n\n// or\n\nint[][] a = new int[3][3];',
      },
      {
        type: 'text',
        text: 'Once we declare the 2D array, it will look like as shown below:',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/07-two-dimensional-array.png',
        width: 434, height: 265, maxWidth: 360,
        alt: 'A 3×3 grid labelled Column 0, 1, 2 across the top and Row 0, 1, 2 down the side, each cell holding its own row,column pair',
      },
      {
        type: 'text',
        text: 'In the above image, you can see that we have created a 2D array having 3 rows and 3 columns. We can call the above array a 3×3 Matrix.\n\nThe first row and column always start with index 0. A 2D array is used to store data in the form of a table.',
      },
      {
        type: 'text',
        heading: 'Declaration and Initialization of a Two Dimensional Array in Java',
        text: "In Java programming, a two-dimensional array can be declared and initialized in several ways. Let's see the different ways of initializing a 2D array.",
      },
      {
        type: 'code',
        heading: 'Examples',
        language: 'java',
        code: '1: int a[][] = new int[][] {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n2: int a[][] = {{15, 27, 36}, {41, 52, 64}, {79, 87, 93}};\n3: int a[][] = new int[3][3]; // All cells contain the value 0',
      },
      {
        type: 'text',
        heading: 'Store Numbers in a Two Dimensional Array',
        text: 'To store a number in each cell of the 2D array, we can use the following syntax:',
      },
      { type: 'code', language: 'java', code: 'array_name[row_index][column_index] = value;' },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'a[0][0] = 15;\na[0][1] = 27;\na[0][2] = 36;\na[1][0] = 41;\na[1][1] = 52;\na[1][2] = 64;\na[2][0] = 79;\na[2][1] = 87;\na[2][2] = 93;',
      },
      {
        type: 'text',
        heading: 'Access Numbers in a Two Dimensional Array',
        text: 'We can access any number stored in a 2D array using the following syntax:',
      },
      { type: 'code', language: 'java', code: 'array_name[row_index][column_index]' },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'System.out.println(a[0][0] + " " + a[0][1] + " " + a[0][2]);\nSystem.out.println(a[1][0] + " " + a[1][1] + " " + a[1][2]);\nSystem.out.println(a[2][0] + " " + a[2][1] + " " + a[2][2]);',
      },
      {
        type: 'table',
        headers: ['Row', 'Values'],
        rows: [
          ['0', '15 27 36'],
          ['1', '41 52 64'],
          ['2', '79 87 93'],
        ],
      },
      {
        type: 'text',
        heading: 'Store and Access the Numbers in a 2D Array using Loops',
        text: "We can also store as well as access the numbers in a 2D array using either a for, while, or do-while loop. Let's see a few examples.",
      },
      {
        type: 'text',
        heading: 'Example 1',
        text: 'Program to input numbers in a 3×3 Matrix and display the numbers in a table format.',
      },
      {
        type: 'code',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int a[][] = new int[3][3];\n        Scanner sc = new Scanner(System.in);\n        int r, c;\n\n        System.out.println("Enter 9 numbers");\n        for (r = 0; r < 3; r++)\n        {\n            for (c = 0; c < 3; c++)\n            {\n                a[r][c] = sc.nextInt();\n            }\n        }\n\n        System.out.println("\\nOutput");\n        for (r = 0; r < 3; r++) // this loop is for row\n        {\n            for (c = 0; c < 3; c++) // this loop will print 3 numbers in each row\n            {\n                System.out.print(a[r][c] + " ");\n            }\n            System.out.println(); // break the line after printing the numbers in a row\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Observed run',
        language: 'text',
        code: 'Enter 9 numbers\n84\n36\n41\n98\n34\n57\n20\n31\n24\n\nOutput\n84 36 41 \n98 34 57 \n20 31 24 ',
      },
      {
        type: 'text',
        text: "Here, you can see that we have run a nested for loop to store the user's input in a 3×3 matrix. After that, we have run another nested for loop to access each number from the 2D array and print it on the screen in a table format.",
      },
    ],
  },
  {
    number: '4',
    title: 'Methods (Functions)',
    sections: [
      {
        type: 'text',
        heading: '4.1 Introduction',
        text: 'In Java, the word method refers to the same kind of thing that the word function is used for in other languages. Specifically, a method is a function that belongs to a class. A method is a reusable portion of a program (once it is created, it can be used again and again), sometimes called a procedure or subroutine; a block of statements that is defined to perform a specific task.',
      },
      {
        type: 'text',
        heading: '4.2 Method (Function) Categories',
        text: 'In Java, there are two categories of methods available, and they are:',
      },
      {
        type: 'termlist',
        items: [
          { term: 'Built-in Methods', def: 'These methods are predefined, and we can use them any time we want in our Java program. For example pow(), sqrt(), min(), etc.' },
          { term: 'User Defined Methods', def: 'These methods are defined or created by the programmer for performing a specific task in a program.' },
        ],
      },
      {
        type: 'note',
        text: 'In this module, we will learn how to create and use a user-defined method in Java.',
      },
      {
        type: 'text',
        heading: '4.2.1 Types of User Defined Method',
        text: 'The user-defined method can be of two types and they are:',
      },
      {
        type: 'bullets',
        items: ['Void Method', 'Return Type Method'],
      },
      {
        type: 'text',
        heading: '4.2.1.1 Void Method',
        text: 'This type of method does not return any value or result to the caller program (program that calls the method). To create void method we have to used the keyword void as per the syntax given below.',
      },
      {
        type: 'code',
        heading: 'Syntax of Creating a Void Method',
        language: 'java',
        code: 'public static void method_name(parameters)\n{\n    statement 1;\n    statement 2;\n    ...\n}',
      },
      {
        type: 'code',
        heading: 'Example 1 (without parameters)',
        language: 'java',
        code: 'public static void message()\n{\n    System.out.println("Hello I am learning how to create void method in Java");\n}',
      },
      {
        type: 'code',
        heading: 'Example 2 (with parameters)',
        language: 'java',
        code: 'public static void sum(int a, int b)\n{\n    int c;\n    c = a + b;\n    System.out.println("Sum of " + a + " and " + b + " is " + c);\n}',
      },
      {
        type: 'note',
        text: 'Parameters are also called Arguments. A method can be created with or without parameters depending on the requirements.',
      },
      {
        type: 'text',
        heading: 'Calling a Void Method',
        text: 'To call a void method, we have to call it by its name. See the complete example given below.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void message()\n    {\n        System.out.println("Hello I am learning how to create void method in Java.");\n    }\n\n    public static void sum(int a, int b)\n    {\n        int c;\n        c = a + b;\n        System.out.println("Sum of " + a + " and " + b + " is " + c);\n    }\n\n    public static void main(String args[])\n    {\n        message();\n        sum(10,20);\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nHello I am learning how to create void method in Java.\nSum of 10 and 20 is 30',
      },
      {
        type: 'text',
        text: 'In the above program, we have declared two void methods message() and sum() before the main() method. The message() method does not accept any argument but displays a text on the screen whenever we call it. On the other hand, the sum() method accept two arguments and display their sum on the screen.\n\nWe have called both the methods from within the main() method. So, main() method is known as caller method and message() and sum() are known as called method because they are called by the main() method to process the task.',
      },
      {
        type: 'text',
        heading: '4.2.1.2 Return Type Method',
        text: 'This type of method returns the value or result to the caller program (the program that calls the method). The method return type can be int, float, double, char or any other type depends on the requirement.',
      },
      {
        type: 'code',
        heading: 'Syntax of Creating a Return Type Method',
        language: 'java',
        code: 'public static return_type method_name(parameters)\n{\n    statement 1;\n    statement 2;\n    ...\n    return result;\n}',
      },
      {
        type: 'code',
        heading: 'Example 1 (without parameters)',
        language: 'java',
        code: 'public static float pi()\n{\n    return 3.142f;\n}',
      },
      {
        type: 'code',
        heading: 'Example 2 (with parameters)',
        language: 'java',
        code: 'public static int sum(int a, int b)\n{\n    int c;\n    c = a + b;\n    return c;\n}',
      },
      {
        type: 'text',
        text: 'In the above example, the sum() method returns the value of c whose data type is int. So the return type of sum() method is int. The return type of a method depends upon the return type of the final result. If the final result is float type, then the return type of the method must be float.',
      },
      {
        type: 'text',
        heading: 'Calling a Return Type Method',
        text: 'We can call a return type method just like we call a void method. See the complete example given below.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static float pi()\n    {\n        return 3.142f;\n    }\n\n    public static int sum(int a, int b)\n    {\n        int c;\n        c = a + b;\n        return c;\n    }\n\n    public static void main(String args[])\n    {\n        int x = 10, y = 20, z;\n        System.out.println("The value of PI is 22/7 = " + pi());\n        z = sum(x, y);\n        System.out.println("Sum of " + x + " and " + y + " is " + z);\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nThe value of PI is 22/7 = 3.142\nSum of 10 and 20 is 30',
      },
      {
        type: 'text',
        text: 'In the above program, we have declared two return type methods pi() and sum() before the main() method. The pi() method does not accept any argument but returns the value 3.142 to the caller program (main method).\n\nThe sum() method accept two arguments, we pass the values of x and y to the sum() method. The variable a and b of the sum() method received the values from x and y and returns their sum to the caller program (main method) after calculation.',
      },
      {
        type: 'text',
        heading: '4.3 Flow of Execution of Method',
        text: "The Flow of Execution of Method refers to the order in which statements are executed in the main program when any method is called. Let's see the execution of the above program using a diagram.",
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/08-method-flow-of-execution.png',
        width: 1400, height: 543, maxWidth: 560,
        alt: 'The Example class with pi() and sum() methods above main(); arrows trace function call 1 from main to pi(), its return, function call 2 from main to sum(), and its return, back into main()',
      },
      {
        type: 'text',
        text: 'In the above diagram, we see that when the main program calls the method pi(), the program flow goes to the body of the method pi() and execute its codes. After that, it returns the value to the main program and then calls the second method sum() by sending it two arguments (x,y), the program flow goes to the body of the method sum(), and execute its code and then returns the value to the main program. At last, the main programs end.',
      },
      {
        type: 'text',
        heading: '4.4 Passing Different Types of Arguments in Method',
        text: "We can pass different types of arguments in a method like an integer, float, array, etc. Let's see some examples.",
      },
      {
        type: 'code',
        heading: 'Example 1 (passing integers and float)',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example {\n    public static void simpleinterest (int p, float r, int t)\n    {\n        float si;\n        si = (p*r*t)/100;\n        System.out.println("Simple Interest = " + si);\n    }\n    public static void main(String args[]){\n        int principal, time;\n        float rate;\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print("Enter principal amount: ");\n        Principal = sc.nextInt();\n        System.out.print("Enter yearly rate %: ");\n        rate = sc.nextFloat();\n        System.out.print("Enter time in year: ");\n        time = sc.nextInt();\n        simpleinterest(principal, rate, time);\n    }\n}',
      },
      {
        type: 'note',
        text: "As printed, this won't compile: `principal` is declared lowercase but the assignment reads `Principal = sc.nextInt();` — Java is case-sensitive, so `Principal` is a different, undeclared name. Lowercase the assignment to fix it.",
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nEnter principal amount: 5000\nEnter yearly rate %: 6.25\nEnter time in year: 1\nSimple Interest = 312.5',
      },
      {
        type: 'code',
        heading: 'Example 2 (passing one dimensional integer array)',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void sum(int arr[])\n    {\n        int s = 0,i;\n        for(i = 0; i<5; i++)\n        {\n            s = s + arr[i];\n        }\n        System.out.println("Sum of Numbers = " + s);\n    }\n\n    public static void main(String args[])\n    {\n        int n[] = new int[5], i;\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println("Enter 5 numbers");\n        for(i=0; i<5; i++)\n        {\n            n[i] = sc.nextInt();\n        }\n        sum(n);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Run / Output',
        language: 'text',
        code: 'Enter 5 numbers\n5\n8\n2\n4\n6\nSum of Numbers = 25',
      },
      {
        type: 'text',
        text: 'In the above program, the variable int arr[] represents a one dimensional integer array argument in the method sum(). We can use any other variable name in place of arr.',
      },
      {
        type: 'code',
        heading: 'Example 3 (passing two dimensional integer array)',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static void sum(int num[][])\n    {\n        int s = 0, i, j;\n        for(i = 0; i<3; i++)\n        {\n            for(j = 0; j<3; j++)\n            {\n                s = s + num[i][j];\n            }\n        }\n        System.out.println("Sum of Numbers = " + s);\n    }\n\n    public static void main(String args[])\n    {\n        int n[][]=new int[3][3], i,j;\n        Scanner sc=new Scanner(System.in);\n\n        System.out.println("Enter 9 numbers");\n        for(i=0; i<3; i++)\n        {\n            for(j = 0; j<3; j++)\n            {\n                n[i][j] = sc.nextInt();\n            }\n        }\n        sum(n);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Run / Output',
        language: 'text',
        code: 'Enter 9 numbers\n12\n6\n8\n9\n14\n18\n21\n11\n5\nSum of Numbers = 104',
      },
      {
        type: 'text',
        text: 'In the above program, the variable int num[][] represents a two dimensional integer array argument in the method sum().',
      },
      {
        type: 'text',
        heading: '4.4.1 Formal and Actual Arguments',
        text: "The arguments or parameters used during method declaration within the round brackets ( ) are known as Formal Arguments. Whereas the arguments or parameters that are used when providing input to the method from the main program are known as Actual Arguments. Let's see an example for more understanding.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static float simpleinterest(int p,float r,int t)\n    {\n        float si;\n        si = (p*r*t)/100;\n        return si;\n    }\n\n    public static void main(String args[])\n    {\n        int principal,time;\n        float rate,interest;\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print("Enter principal amount: ");\n        Principal = sc.nextInt();\n        System.out.print("Enter yearly rate %: ");\n        rate = sc.nextFloat();\n        System.out.print("Enter time in year: ");\n        time = sc.nextInt();\n\n        interest = simpleinterest(principal,rate,time);\n        System.out.println("Simple Interest = " + interest);\n    }\n}',
      },
      {
        type: 'note',
        text: 'The same `Principal`/`principal` case mismatch as the earlier example — this copy of the program will not compile until the assignment is lowercased to match the declaration.',
      },
      {
        type: 'text',
        text: 'In the above program, variable p, r and t in method simpleinterest() are used to receive inputs from the main program, so these variables are known as Formal Argument.\n\nThe variables principal, rate and time used in the main program to provide inputs to the method simpleinterest() are known as Actual Arguments because they provide the actual inputs to the method simpleinterest().',
      },
      {
        type: 'text',
        heading: '4.4.2 Pass by Value or Call by Value',
        text: 'In Pass by Value the values of the variables are passed to the formal arguments of the method. In this case the values of the actual arguments are not affected by changing the values of the formal arguments. See the example given below.',
      },
      {
        type: 'code',
        heading: 'Example of Pass by Value',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n  public static void changevalue(int a,int b)\n  {\n    a = a + 2;\n    b = b + 2;\n    System.out.println("In method changes are " + a + " and " + b);\n  }\n\n  public static void main(String args[])\n  {\n    int x = 10, y = 20;\n    System.out.println("Before calling the method");\n    System.out.println("x = " + x + " and y = " + y);\n    changevalue(x,y);\n    System.out.println("After calling the method");\n    System.out.println("x = " + x + " and y = " + y);\n  }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nBefore calling the method\nx=10 and y=20\nIn method changes are 12 and 22\nAfter calling the method\nx=10 and y=20',
      },
      {
        type: 'text',
        text: 'In the above program, the variable x and y are passed as arguments to the method changevalue(). The value of x and y is passed to a and b. The memory location of x and y are different from the memory location of a and b. Hence, when the value of a and b is incremented, there will be no effect on the value of x and y. So after calling the method the value of x and y are the same as before calling the method.',
      },
      {
        type: 'note',
        text: 'Java support only pass by value or call by value. Unlike C and C++, java does not support pass by reference or call by reference.',
      },
      {
        type: 'text',
        heading: '4.5 Recursive Method (Function)',
        text: "A recursive method in Java is a method that calls itself repeatedly until the exit condition is satisfied. Recursive method is useful in solving complex problem easily. That's why it is used in data structure programs like binary tree, graph, etc.\n\nRecursive method is slower than loop because, during each recursive call, a new recursive method block is created in memory. Let's see how we can create a recursive method in Java and how it works.",
      },
      {
        type: 'text',
        heading: '4.5.1 Recursive Method Creation',
        text: 'Below we have created a recursive method that prints the numbers from 1 to 5 using the recursive technique.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void printnum(int n)\n    {\n        if(n>5)\n        {\n            return;\n        }\n        System.out.print(n + " ");\n        printnum(n+1);\n    }\n\n    public static void main(String args[])\n    {\n        printnum(1);\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\n1 2 3 4 5',
      },
      {
        type: 'text',
        text: 'In the above program, we have created a recursive method printnum() that accept a starting number and print all the numbers from the starting number up to 5 using the recursive technique.',
      },
      {
        type: 'text',
        heading: '4.6 Method Overloading in Java?',
        text: "Method Overloading in Java is a process in which we declare more than one method having the same name but with different numbers of arguments. By overloading a method, we can perform more than one task using the same name.\n\nSuppose we declare a method called sum that takes two arguments for addition and another method with the same name, sum that takes three arguments for addition. In this case, we have overloaded the method sum.\n\nLet's see an example of how we can overload a method in Java.",
      },
      {
        type: 'code',
        heading: 'Method Overloading Example 1',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static int max(int a, int b)\n    {\n        int m = 0;\n        if(a > b)\n        {\n            m = a;\n        }\n        else if(b > a)\n        {\n            m = b;\n        }\n        return m;\n    }\n    // Overloading the max method to find maximum among 3 integer numbers\n    public static int max(int a, int b, int c)\n    {\n        int m = 0;\n        if(a > b && a > c)\n        {\n            m = a;\n        }\n        else if(b > a && b > c)\n        {\n            m = b;\n        }\n        else if(c > a && c > b)\n        {\n            m = c;\n        }\n        return m;\n    }\n\n    public static void main(String args[])\n    {\n        int x, y, z;\n        Scanner sc = new Scanner(System.in);\n        System.out.println("Enter 2 integer numbers");\n        x = sc.nextInt();\n        y = sc.nextInt();\n        System.out.println("Maximum number = " + max(x, y));\n        System.out.println("Enter 3 integer numbers");\n        x = sc.nextInt();\n        y = sc.nextInt();\n        z = sc.nextInt();\n        System.out.println("Maximum number = " + max(x, y, z));\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nEnter 2 integer numbers\n15\n36\nMaximum number = 36\nEnter 3 integer numbers\n84\n21\n79\nMaximum number = 84',
      },
      {
        type: 'text',
        text: 'In the above example, we have created two methods having the same name but with a different number of arguments. The first one will receive two integer numbers and return the maximum among the two numbers. The second method will receive three integer numbers and return the maximum among the three numbers.\n\n' +
          "It's not compulsory to use the same arguments while we overload a method. We can use different types of arguments during method overloading as per our requirements. See the example given below.",
      },
      {
        type: 'code',
        heading: 'Method Overloading Example 2',
        language: 'java',
        code: 'import java.util.Scanner;\n\npublic class Example\n{\n    public static float sum(int a, float b)\n    {\n        float s = 0;\n        s = a + b;\n        return s;\n    }\n\n    // Overloading the sum method to find the sum of three different types of numbers\n    public static double sum(int a, float b, double c)\n    {\n        double s = 0;\n        s = a + b + c;\n        return s;\n    }\n\n    public static void main(String args[])\n    {\n        int x;\n        float y;\n        double z;\n        Scanner sc=new Scanner(System.in);\n        System.out.println("Enter one integer and one decimal numbers");\n        x = sc.nextInt();\n        y = sc.nextFloat();\n        System.out.println("Sum = " + sum(x, y));\n        System.out.println("Enter one integer and two decimal numbers");\n        x = sc.nextInt();\n        y = sc.nextFloat();\n        z = sc.nextDouble();\n        System.out.println("Sum = " + sum(x, y, z));\n    }\n}',
      },
      {
        type: 'code',
        language: 'text',
        code: 'Output:\nEnter one integer and one decimal numbers\n12\n14.24\nSum = 26.24\nEnter one integer and two decimal numbers\n25\n15.364\n42.2562\nSum = 82.62019841308594',
      },
      {
        type: 'text',
        heading: 'Laboratory Work 3: Methods (Functions)',
        text: "The exercises below draw on everything covered in this module, plus what's discussed in practical class — refer back to any of the lessons above as you work through them.",
      },
      {
        type: 'text',
        heading: 'Project 1',
        text: 'Write a Java program with a method to prints all real solutions to the quadratic equation $ax^2 + bx + c = 0$. If the discriminant $b^2 - 4ac$ is negative, display a message stating that there are no real solutions.',
      },
      {
        type: 'text',
        heading: 'Project 2',
        text: 'The Fibonacci sequence is defined by the following rule. The first two values in the sequence are 1 and 1. Every subsequent values is the sum of the two values preceding it. Write a java program with a that uses non recursive functions to print the first 10th value in the Fibonacci sequence.',
      },
      {
        type: 'note',
        text: "The manual appears to drop a word here — most likely \"Write a java program with a method that uses non recursive functions...\". Check with your lecturer before attempting this project.",
      },
      {
        type: 'text',
        heading: 'Project 3',
        text: 'Write a Java program to implement recursive method that display the first 15 term of the Fibonacci sequence.',
      },
      {
        type: 'text',
        heading: 'Project 4',
        text: 'Implement a recursive method in a Java program to sum the first 20 terms of the series:',
      },
      {
        type: 'math',
        tex: '\\dfrac{1}{3} + \\dfrac{3}{4} + \\dfrac{4}{7} + \\dfrac{7}{11} + \\dfrac{11}{18} + \\dfrac{18}{29} + \\ldots',
      },
      {
        type: 'text',
        heading: 'Project 5',
        text: 'Write a Java program with methods to return the mean, and standard deviation given any set of values.',
      },
    ],
  },
  {
    number: '5',
    title: 'OOP I: Concept of Object-Oriented Programming',
    sections: [
      {
        type: 'text',
        heading: '5.1 Introduction',
        text: 'Object-Oriented Programming (OOP) is a programming paradigm that focuses on the use of objects to represent and manipulate data. In OOP, data is encapsulated within objects, and objects are defined by their properties (attributes) and behaviors (methods). OOP provides several key concepts that enable developers to write modular, reusable, and maintainable code.',
      },
      {
        type: 'text',
        heading: '5.2 Class and Object',
        text: "Java is an OOP language, which is driven by classes and objects, along with its attributes and methods. A class is the blueprint from which individual objects are created; a user-defined data type that contains data (variables) and methods (functions) together. An Object is an instance or part of a class.\n\nLet's understand Class and Object using a real life example.",
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/09-dog-class-object-diagram.png',
        width: 1400, height: 580, maxWidth: 620,
        alt: 'Class DOG lists Variables (Breed, Sex, Speed, Weight) and Actions (Running, Eating); Object MAX has Values Pitbull/Male/40 MPH/18 kg and Methods Run()/Eat(); Object LUCY has Values Labrador/Female/22 MPH/25 kg and the same Methods',
      },
      {
        type: 'text',
        text: "In the above image, we can see that DOG is a class, or we can say it's a group. At the same time, MAX and LUCY are objects of the class DOG.\n\nAn object contains the same variables as its class but may store different values. For example, MAX is an object of the class DOG having variables and its values as Breed: Pitbull, Sex: Male, Running Speed: 40 MPH, and Weight: 18 Kg. LUCY is another object of the class DOG having variables and its values as Breed: Labrador, Sex: Female, Running Speed: 22 MPH, and Weight: 25 Kg.\n\nWe can treat Actions as the processing of data stored in the variables of an object. For example, using the action Running, we can measure the speed of a dog. Similarly, using the action of Eating, a dog's weight can be measured. In programming, we can code these actions as a function inside a class. And when we write a function inside a class, it is called Method.",
      },
      {
        type: 'text',
        heading: '5.2.1 Creating a Class in Java',
        text: 'We create a class in java by using the keyword class and then writing the class name along with the opening and closing braces.',
      },
      {
        type: 'code',
        heading: 'Syntax for creating a class in Java',
        language: 'java',
        code: 'class class_name\n{\n\n}',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Data\n{\n\n}',
      },
      {
        type: 'text',
        text: 'Here Data is the name of a class. After the class name, we will use opening and closing braces. Later on, inside these braces, we will declare our variables and methods.',
      },
      {
        type: 'text',
        heading: '5.2.2 Creating an Object of a Class in Java',
        text: 'We create an object by writing the class name and the object name we want to create.',
      },
      {
        type: 'code',
        heading: 'Syntax for creating an object of a class in Java',
        language: 'java',
        code: 'class_name object_name = new class_name();',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'Data x = new Data();',
      },
      {
        type: 'text',
        text: "Here x is the name of an object of the class Data.\n\nWe know how to create a class and its object in Java, but a class cannot be kept empty, so we need to declare some variables and methods in it to make it helpful.\n\nNow let's see how to create different types of variables and methods in a class to store and process data.",
      },
      {
        type: 'text',
        heading: '5.3.1 Instance Variables',
        text: 'Instance variables are declared within a class, but outside a method. And are used to store values in an object. Each object has its own copy of instance variables that are not shared between other objects.',
      },
      {
        type: 'code',
        heading: 'Example of creating Instance Variables',
        language: 'java',
        code: 'class Data\n{\n    // creating instance variables\n    public String name;\n    public int age;\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // Creating an object x of the class Data\n        Data x = new Data();\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above example, we created two instance variables, name and age, inside the class Data. After that, we created an object x of the class Data inside the main method.',
      },
      {
        type: 'note',
        text: 'We have declared the instance variable using the keyword public, which means that we can access these variables from outside of its class using the object of the class.',
      },
      {
        type: 'text',
        heading: '5.3.1.1 Access and Modify Values of Instance Variables',
        text: 'We can access the value of an instance variable by using the object of the class followed by a dot (.) operator and then writing the name of the instance variable whose value we want to access.\n\nWe can modify the value of an instance variable by using the object of the class followed by a dot (.) operator and then writing the name of the instance variable with an equal sign, and then providing the new value to it.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Data\n{\n    // creating instance variables\n    public String name;\n    public int age;\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // Creating an object x of the class Data\n        Data x = new Data();\n\n        System.out.println("Before modifying");\n        // Access the values of instance variables\n        System.out.println("Name: " + x.name);\n        System.out.println("Age: " + x.age);\n\n        // Modify the values of instance variables\n        x.name = "Peter";\n        x.age = 15;\n\n        System.out.println("After modifying");\n        // Access the values of instance variables\n        System.out.println("Name: " + x.name);\n        System.out.println("Age: " + x.age);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'run',
        language: 'text',
        code: 'Before modifying\nName: null\nAge: 0\nAfter modifying\nName: Peter\nAge: 15\nBUILD SUCCESSFUL (total time: 1 second)',
      },
      {
        type: 'text',
        text: "Suppose we declared the instance variables with the private keyword. In that case, the variables become private variables, meaning they can't be accessed from outside of their class using the object of the class.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Data\n{\n    // creating instance variables\n    private String name;\n    private int age;\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // Creating an object x of the class data\n        Data x = new Data();\n\n        // Modify the values of private instance variables\n        x.name="Peter";\n        x.age=15;\n    }\n}',
      },
      {
        type: 'text',
        text: 'Running the above program will give compilation errors.',
      },
      {
        type: 'code',
        language: 'text',
        code: 'error: name has private access in Data\nerror: age has private access in Data',
      },
      {
        type: 'text',
        heading: '5.3.1.2 Initialized Instance Variables using Constructor',
        text: 'To initialize instance variables of a class, we use a method called Constructor. A Constructor is a unique method whose name is the same as the name of the class inside which it is declared. Inside this method, we initialized the instance variables of the class.\n\nThere are two types of constructors and they are:',
      },
      {
        type: 'bullets',
        items: ['Default Constructor', 'Parameterized Constructor'],
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Data\n{\n    // creating instance variables\n    public String name;\n    public int age;\n\n    // Default Constructor\n    Data()\n    {\n        Name = "Thomas";\n        age = 18;\n    }\n\n    // Parameterized Constructor\n    Data(String nm, int ag)\n    {\n        name = nm;\n        age = ag;\n    }\n}',
      },
      {
        type: 'note',
        text: 'As printed, `Name = "Thomas";` in the Default Constructor won\'t compile — the field is declared lowercase `name`, and Java is case-sensitive. Lowercase the assignment to fix it.',
      },
      {
        type: 'code',
        heading: 'Example (continued)',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        // Creating an object x and y of the class Data\n        Data x = new Data();\n        Data y = new Data("William", 14);\n\n        // Access the values of instance variables of object x\n        System.out.println("Name: " + x.name);\n        System.out.println("Age: " + x.age);\n\n        // Access the values of instance variables of object y\n        System.out.println("Name: " + y.name);\n        System.out.println("Age: " + y.age);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Name: Thomas\nAge: 18\nName: William\nAge: 14',
      },
      {
        type: 'text',
        text: 'Default Constructor does not take any parameter to initialize the instance variables. Parameterized Constructor takes arguments to initialize the instance variables during object creation in the main method.\n\nIn the above example, when declaring the object y, we pass values to its parametrized constructor to initialize the instance variables of the object y.',
      },
      {
        type: 'text',
        heading: 'Use of this Keyword',
        text: 'We use this keyword to refer to the current object of the class. It is used to differentiate between the instance variable and the local variable having the same name.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Data\n{\n    // creating instance variables\n    public String name;\n    public int age;\n\n    // Default Constructor\n    Data()\n    {\n        name = "Thomas";\n        age = 18;\n    }\n\n    // Parameterized Constructor\n    Data(String name, int age)\n    {\n        this.name = name;\n        this.age = age;\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // Creating an object x and y of the class Data\n        Data x = new Data();\n        Data y = new Data("William", 14);\n\n        // Access the values of instance variables of object x\n        System.out.println("Name: " + x.name);\n        System.out.println("Age: " + x.age);\n\n        // Access the values of instance variables of object y\n        System.out.println("Name: " + y.name);\n        System.out.println("Age: " + y.age);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Name: Thomas\nAge: 18\nName: William\nAge: 14',
      },
      {
        type: 'text',
        text: "In the above example, the instance variables' names and the formal arguments' names of the parameterized constructor are the same. We have used this keyword to distinguish between variables.",
      },
      {
        type: 'text',
        heading: '5.3.2 Static Variables',
        text: 'When we declare a variable with the static keyword, it is called Static Variable. It is declared in a class. The memory for the static variable is allocated only once when the class is loading in the memory.\n\nWhen a static variable is declared in a class, it is shared between all the objects of that class. We can access a static variable from outside its class using its class name and a dot (.) operator.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Data\n{\n    // creating instance variables\n    public String name;\n    public int age;\n    public static int count;\n\n    // Default Constructor\n    Data()\n    {\n        name = "Thomas";\n        age = 18;\n        count = count+1;\n    }\n\n    // Parameterized Constructor\n    Data(String name, int age)\n    {\n        this.name = name;\n        this.age = age;\n        count = count+1;\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // Creating an object x and y of the class Data\n        Data x = new Data();\n        Data y = new Data("William", 14);\n        System.out.println("Total number of objects created = " + Data.count);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Total number of objects created = 2',
      },
      {
        type: 'text',
        text: 'In the above example, we created a class Data with two instance variables (name, age) and one static variable, count. In the default and parameterized constructors, we increment the static variable count by 1.\n\nIn the main method, we create two objects, x and y, which invoke the default and the parameterized constructors when running the program. As a result, the static variable count is incremented by 1 twice. So the total number of objects created is 2.',
      },
      {
        type: 'text',
        heading: '5.4 Instance Methods in Java',
        text: 'Instance methods are used to store or process data stored in instance variables and are used only by the object of the class.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.Scanner;\n\nclass Record\n{\n    // creating instance variables\n    private int rollno;\n    private String name;\n    private int age;\n\n    // Creating a public instance method to store data in private instance variables\n    public void inputdata()\n    {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Roll No: ");\n        rollno = sc.nextInt();\n        sc.nextLine(); // consume the new line character \\n that is left by the nextInt() method\n        System.out.print("Name: ");\n        name = sc.nextLine();\n        System.out.print("Age: ");\n        age = sc.nextInt();\n    }\n\n    // Creating a public instance method to display data\n    public void displydata()\n    {\n        System.out.println("Roll No: " + rollno);\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Record x = new Record();\n        x.inputdata();\n        x.displydata();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Roll No: 1\nName: Martin\nAge: 15\nRoll No: 1\nName: Martin\nAge: 15',
      },
      {
        type: 'text',
        text: "In the above example, we have declared the instance variables private because we do not want to store values in instance variables from outside the class.\n\nWe have declared public methods to store and display data on the output screen. We will use these public methods using the object of the class to store and process data stored in instance variables. In this way, we can hide our instance variables from accessing outside the class.\n\nLet's take another example that can be coded as class and object in Java using instance variable and instance methods.\n\nSuppose we want to store the details of a student like a roll no, name, class, marks obtained in three different subjects (English, Maths, Computer), total and percentage obtained.\n\nFor the above question, we will create a class called Student with the following instance variables:",
      },
      {
        type: 'termlist',
        items: [
          { term: 'roll', def: 'for storing roll no of the student.' },
          { term: 'name', def: 'for storing name of the student.' },
          { term: 'cls', def: 'for storing class of the student.' },
          { term: 'eng', def: 'for storing marks obtained in english.' },
          { term: 'math', def: 'for storing marks obtained in math.' },
          { term: 'comp', def: 'for storing marks obtained in computer.' },
          { term: 'total', def: 'for storing total marks obtained.' },
          { term: 'per', def: 'for storing total percentage obtained.' },
        ],
      },
      {
        type: 'text',
        text: 'We will also create three instance methods inside the Student class for processing the instance variables, and they are:',
      },
      {
        type: 'termlist',
        items: [
          { term: 'inputdetails()', def: 'for storing information in the instance variables.' },
          { term: 'calculate()', def: 'for calculating and storing the total and percentage obtained.' },
          { term: 'display()', def: 'for displaying the information stored in the instance variables on the screen.' },
        ],
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.Scanner;\n\nclass Student\n{\n    // creating instance variables\n    private int rollno;\n    private String name;\n    private int Class;\n    private int eng;\n    private int math;\n    private int comp;\n    private int total;\n    private float per;\n\n    // Creating a public instance method to store data in private instance variables\n    public void inputdata()\n    {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Roll No: ");\n        rollno=sc.nextInt();\n        sc.nextLine();// consume the new line character \\n that is left by the nextInt() method\n        System.out.print("Name: ");\n        name=sc.nextLine();\n        System.out.print("Class: ");\n        Class=sc.nextInt();\n        System.out.print("English: ");\n        eng=sc.nextInt();\n        System.out.print("Math: ");\n        math=sc.nextInt();\n        System.out.print("Computer: ");\n        comp=sc.nextInt();\n    }\n\n    // Creating a public instance method to calculate and store total and percentage\n    public void calculate()\n    {\n        total=eng+math+comp;\n        per=(total/300.0f)*100;\n    }\n\n    // Creating a public instance method to display data of private instance variables\n    public void displydata()\n    {\n        System.out.println("Roll No: " + rollno);\n        System.out.println("Name: " + name);\n        System.out.println("Class: " + Class);\n        System.out.println("English: " + eng);\n        System.out.println("Math: " + math);\n        System.out.println("Computer: " + comp);\n        System.out.println("Total Marks: " + total);\n        System.out.println("Percentage: " + per);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Student x = new Student();\n        x.inputdata();\n        x.calculate();\n        x.displydata();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Roll No: 1\nName: Martin\nClass: 5\nEnglish: 78\nMath: 84\nComputer: 91\nRoll No: 1\nName: Martin\nClass: 5\nEnglish: 78\nMath: 84\nComputer: 91\nTotal Marks: 253\nPercentage: 84.33333',
      },
      {
        type: 'text',
        text: 'In the above example, we created a class Student with private instance variables for the roll number, name, class, marks in English, Math, and Computer, total marks, and percentage. The inputdata() method stores the student information, calculate() calculates the total and percentage, and displydata() displays the stored information.',
      },
      {
        type: 'text',
        heading: 'Array of Objects',
        text: 'Suppose we want to store the records of 10 students. In this situation, we will create a class and 10 objects of that class to store individual student records in individual objects. But that will be a lengthy process. To make it short, we will create an array of objects so that each array element will become an individual object. We can easily access any object of the object array using its index value. See the example given below.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.Scanner;\n\nclass Student\n{\n    // creating instance variables\n    private int rollno;\n    private String name;\n    private int Class;\n    private int eng;\n    private int math;\n    private int comp;\n    private int total;\n    private float per;\n\n    // Creating a public instance method to store data in private instance variables\n    public void inputdata()\n    {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Roll No: ");\n        rollno=sc.nextInt();\n        sc.nextLine();// consume the new line character \\n that is left by the nextInt() method\n        System.out.print("Name: ");\n        name=sc.nextLine();\n        System.out.print("Class: ");\n        Class=sc.nextInt();\n        System.out.print("English: ");\n        eng=sc.nextInt();\n        System.out.print("Math: ");\n        math=sc.nextInt();\n        System.out.print("Computer: ");\n        comp=sc.nextInt();\n    }\n\n    // Creating a public instance method to calculate and store total and percentage\n    public void calculate()\n    {\n        total=eng+math+comp;\n        per=(total/300.0f)*100;\n    }\n\n    // Creating a public instance method to display data of private instance variables\n    public void displydata()\n    {\n        System.out.println("Roll No: " + rollno);\n        System.out.println("Name: " + name);\n        System.out.println("Class: " + Class);\n        System.out.println("English: " + eng);\n        System.out.println("Math: " + math);\n        System.out.println("Computer: " + comp);\n        System.out.println("Total Marks: " + total);\n        System.out.println("Percentage: " + per);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Student x[] = new Student[10];    // Declared an object array\n        int i;\n\n        // Store information in individual objects\n        for(i=0; i<10; i++)\n        {\n            x[i] = new Student();    // Initializing the object\n            x[i].inputdata();\n            x[i].calculate();\n            System.out.println();\n        }\n\n        // Display information of each object\n        for(i=0; i<10; i++)\n        {\n            x[i].displydata();\n            System.out.println();\n        }\n    }\n}',
      },
      {
        type: 'text',
        heading: '5.5 Static Methods',
        text: "Static Methods in Java are defined inside a class using the keyword static. These methods are bound to the class and not to the object, which means that these methods can be called using the class name, and calling the methods using the object name is not necessary. However, the object of the class can also access the static methods using the object name.\n\nStatic Methods are used to create a utility class, also known as the helper class, that contains only static methods and can be reused across programs. It's not required to create an object of a utility class to access its static method because we can also access the static methods using its class name.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.Scanner;\n\nclass Calc\n{\n    public static float add(float a, float b)\n    {\n        return a+b;\n    }\n\n    public static float subtract(float a, float b)\n    {\n        return a-b;\n    }\n\n    public static float multiply(float a, float b)\n    {\n        return a*b;\n    }\n\n    public static float divide(float a, float b)\n    {\n        return a/b;\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        float x,y;\n        Scanner sc=new Scanner(System.in);\n\n        System.out.println("Enter 2 numbers");\n        x = sc.nextInt();\n        y = sc.nextInt();\n\n        // Call all the static methods of the class Calc one by one\n        System.out.println("Addition = " + Calc.add(x,y));\n        System.out.println("Subtraction = " + Calc.subtract(x,y));\n        System.out.println("Multiplication = " + Calc.multiply(x,y));\n        System.out.println("Division = " + Calc.divide(x,y));\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Enter 2 numbers\n8\n2\nAddition = 10.0\nSubtraction = 6.0\nMultiplication = 16.0\nDivision = 4.0',
      },
    ],
  },
  {
    number: '6',
    title: 'OOP II: Inheritance, Interface, Polymorphism, and Abstract',
    sections: [
      {
        type: 'text',
        heading: '6.1 Inheritance',
        text: "In Java, when we create a new class by utilizing the code of an existing class, then this process is known as Inheritance.\n\nIn inheritance, we don't copy the code from an existing class to a new class. Instead, we include the existing class in a new class when we create the new class.\n\nLet's take an example to clear the concept of inheritance. Suppose we have a class called Information with two instance variables: roll, name, and two instance methods as inputdata() and displaydata(). See the code given below.",
      },
      {
        type: 'code',
        heading: 'Code for Information Class',
        language: 'java',
        code: 'class Information\n{\n    private int roll;\n    private String name;\n\n    public void inputinfo()\n    {\n        Scanner sc=new Scanner(System.in);\n        System.out.print("Enter Roll: ");\n        roll=sc.nextInt();\n        sc.nextLine();   // consume the new line character \\n left by the previous input\n        System.out.print("Enter Name: ");\n        name=sc.nextLine();\n    }\n\n    public void displayinfo()\n    {\n        System.out.println("Roll: " + roll);\n        System.out.println("Name: " + name);\n    }\n}',
      },
      {
        type: 'text',
        text: 'We want to create a new class called Result that will store roll, name, marks of three subjects (English, Maths, Computer), total marks, and percentage obtained.\n\nAs the class Information already exists that can store roll and name, we will create our new class Result by inheriting all the codes from the Information class without copying and pasting the codes from the Information class into the Result class. See the complete example given below.',
      },
      {
        type: 'code',
        heading: 'Example of Inheritance',
        language: 'java',
        code: 'import java.util.Scanner;\n\nclass Information\n{\n    private int roll;\n    private String name;\n\n    public void inputinfo()\n    {\n        Scanner sc=new Scanner(System.in);\n        System.out.print("Enter Roll: ");\n        roll=sc.nextInt();\n        sc.nextLine();   // consume the new line character \\n left by the previous input\n        System.out.print("Enter Name: ");\n        name=sc.nextLine();\n    }\n\n    public void displayinfo()\n    {\n        System.out.println("Roll: " + roll);\n        System.out.println("Name: " + name);\n    }\n}\n\n// Inherit the class Information into Result\nclass Result extends Information\n{\n    private int eng;\n    private int math;\n    private int comp;\n    private int total;\n    private float per;\n\n    public void inputdata()\n    {\n        Scanner sc=new Scanner(System.in);\n        inputinfo();   // calling the inputinfo() method of the parent class Information\n        System.out.print("Enter English: ");\n        eng = sc.nextInt();\n        System.out.print("Enter Math: ");\n        math = sc.nextInt();;\n        System.out.print("Enter Computer: ");\n        comp = sc.nextInt();\n        total = eng+math+comp;\n        per = (total/300.0f)*100;\n    }\n\n    public void displaydata()\n    {\n        displayinfo();   // calling the displayinfo() method of the parent class Information\n        System.out.println("English: " + eng);\n        System.out.println("Math: " + math);\n        System.out.println("Computer: " + comp);\n        System.out.println("Total: " + total);\n        System.out.println("Percentage: " + per);\n    }\n}\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Result x=new Result();\n        x.inputdata();\n        x.displaydata();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Enter Roll: 1\nEnter Name: Peter\nEnter English: 75\nEnter Math: 84\nEnter Computer: 92\nRoll: 1\nName: Peter\nEnglish: 75\nMath: 84\nComputer: 92\nTotal: 251\nPercentage: 83.666664',
      },
      {
        type: 'text',
        text: 'In the above program, we can see that we have created a new class Result by inheriting the class Information using the extend keyword.\n\nThe class Result is created by inheriting the class Information. So we can call the Information class as Base class or Parent class and the Result class as Derived class or Subclass or Child class.',
      },
      {
        type: 'text',
        heading: 'Use of super Keyword',
        text: 'In Java, the super keyword is used to refer to the immediate parent class of the class in which it is used. We can use it in the following ways:',
      },
      {
        type: 'text',
        heading: 'To invoke a method of the parent class',
        text: "When a method in a subclass has the same name as a method in its parent class, we use the super keyword to call the parent class's method. For example:",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Alpha\n{\n    public void display()\n    {\n        System.out.println("I am in Alpha Class");\n    }\n}\n\n// Inherit the class Alpha into Beta\nclass Beta extends Alpha\n{\n    public void display()\n    {\n        super.display();   // calling the display() method of the parent class Alpha\n        System.out.println("I am in Beta Class");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Beta x=new Beta();\n        x.display();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'I am in Alpha Class\nI am in Beta Class',
      },
      {
        type: 'text',
        heading: 'To access a public instance variable of the parent class',
        text: "Suppose a subclass has an instance variable with the same name as a public instance variable in its parent class. In that case, we use the super keyword to refer to the parent class's public member variable. For example:",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Alpha\n{\n    public int x;\n\n    Alpha()\n    {\n        x=10;\n    }\n}\n\n// Inherit the class Alpha into Beta\nclass Beta extends Alpha\n{\n    private int x;\n\n    Beta()\n    {\n        x=20;\n    }\n    public void display()\n    {\n        System.out.println("Value of Parent Class\'s x = " + super.x);\n        System.out.println("Value of Child Class\'s x = " + x);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Beta x=new Beta();\n        x.display();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: "Value of Parent Class's x = 10\nValue of Child Class's x = 20",
      },
      {
        type: 'text',
        heading: 'To invoke the parameterized constructor of the parent class',
        text: 'We use the super keyword to invoke the parameterized constructor of the parent class from the parameterized constructor of the child class. For example:',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class Alpha\n{\n    public int x;\n\n    Alpha()   // Default constructor\n    {\n        x=10;\n    }\n\n    Alpha(int num)   // Parameterized constructor\n    {\n        x=num;\n    }\n}\n\n// Inherit the class Alpha into Beta\nclass Beta extends Alpha\n{\n    private int x;\n\n    Beta()   // Default constructor\n    {\n        x=20;\n    }\n\n    Beta(int num1, int num2)   // Parameterized constructor\n    {\n        super(num1);   // Invoking the parameterized constructor of the parent class\n        x=num2;\n    }\n    public void display()\n    {\n        System.out.println("Value of Parent Class\'s x = " + super.x);\n        System.out.println("Value of Child Class\'s x = " + x);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Beta x=new Beta(15,24);\n        x.display();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: "Value of Parent Class's x = 15\nValue of Child Class's x = 24",
      },
      {
        type: 'note',
        text: 'We can use the super keyword only inside an instance method or inside the constructor of a child class. When using the super keyword inside the constructor of a child class, it must be the first statement of the constructor.',
      },
      {
        type: 'text',
        heading: '6.2 Interface',
        text: "In Java, an interface is similar to a class containing method signatures and constant variables but without implementation, which means that the methods declared in the interface can't have a body.\n\nIt is used to specify the behavior of a class, allowing multiple classes to share a common set of methods and constants.\n\nInterfaces are also useful for creating a common interface for multiple implementations of the same concept.\n\nTo use an interface, a class must implement it using the keyword implements in the class definition, followed by the interface's name. The class must then provide an implementation for all of the methods defined in the interface.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: '// Create an interface called MyInterface having two methods in it.\ninterface MyInterface\n{\n    public void method1();\n    public void method2();\n}\n\n// Implement the interface MyInterface in a class called MyClass1\nclass MyClass1 implements MyInterface\n{\n    public void method1()\n    {\n        // Implementation for method1\n        System.out.println("I am method1 in MyClass1");\n    }\n    public void method2()\n    {\n        // Implementation for method2\n        System.out.println("I am method2 in MyClass1");\n    }\n}\n\n// Implement the interface MyInterface in a class called MyClass2\nclass MyClass2 implements MyInterface\n{\n    public void method1()\n    {\n        // Different implementation for method1\n        System.out.println("I am method1 in MyClass2");\n    }\n    public void method2()\n    {\n        // Different implementation for method2\n        System.out.println("I am method2 in MyClass2");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        MyClass1 obj1 = new MyClass1();\n        MyClass2 obj2 = new MyClass2();\n        obj1.method1();\n        obj1.method2();\n        obj2.method1();\n        obj2.method2();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'I am method1 in MyClass1\nI am method2 in MyClass1\nI am method1 in MyClass2\nI am method2 in MyClass2',
      },
      {
        type: 'text',
        text: 'In the above example, we created an interface named MyInterface that defines two methods without any implementation (without a body). After that, we created two classes called MyClass1 and MyClass2 that implement the interface MyInterface with the keyword implements and define the body of both the methods, method1() and method2(), with different implementations in both the classes, MyClass1 and MyClass2.',
      },
      {
        type: 'text',
        heading: 'Implement Multiple Interfaces in a Class',
        text: 'We can implement multiple interfaces in a class by listing them in the implements clause of the class definition, separated by commas.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: '// Create an interface called MyInterface1 having two methods in it.\ninterface MyInterface1\n{\n    public void method1();\n    public void method2();\n}\n\n// Create an interface called MyInterface2 having two methods in it.\ninterface MyInterface2\n{\n    public void method3();\n    public void method4();\n}\n\n// Implement the interface MyInterface1 and MyInterface2 in a class called MyClass\nclass MyClass implements MyInterface1, MyInterface2\n{\n    public void method1()\n    {\n        // Implementation for method1\n        System.out.println("I am method1 in MyClass");\n    }\n    public void method2()\n    {\n        // Implementation for method2\n        System.out.println("I am method2 in MyClass");\n    }\n    public void method3()\n    {\n        // Implementation for method3\n        System.out.println("I am method3 in MyClass");\n    }\n    public void method4()\n    {\n        // Implementation for method4\n        System.out.println("I am method4 in MyClass");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        MyClass obj = new MyClass();\n        obj.method1();\n        obj.method2();\n        obj.method3();\n        obj.method4();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'I am method1 in MyClass\nI am method2 in MyClass\nI am method3 in MyClass\nI am method4 in MyClass',
      },
      {
        type: 'text',
        heading: 'Extend an Interface with Multiple Interfaces',
        text: 'We can extend an interface with multiple interfaces by listing them in the extends clause of the interface definition, separated by commas. The interface that extends other interfaces is known as the child interface, and the interfaces it extends are known as parent interfaces.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: '// Create an interface called MyInterface1 having one method in it.\ninterface MyInterface1\n{\n    public void method1();\n}\n\n// Create an interface called MyInterface2 having one method in it.\ninterface MyInterface2\n{\n    public void method2();\n}\n\n// Create an interface called MyInterface3 having one method in it\n// and extends it with MyInterface1 and MyInterface2\ninterface MyInterface3 extends MyInterface1, MyInterface2\n{\n    public void method3();\n}\n\n// Implement the interface MyInterface3 in a class called MyClass\nclass MyClass implements MyInterface3\n{\n    public void method1()\n    {\n        // Implementation for method1\n        System.out.println("I am method1 in MyClass");\n    }\n    public void method2()\n    {\n        // Implementation for method2\n        System.out.println("I am method2 in MyClass");\n    }\n    public void method3()\n    {\n        // Implementation for method3\n        System.out.println("I am method3 in MyClass");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        MyClass obj = new MyClass();\n        obj.method1();\n        obj.method2();\n        obj.method3();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'I am method1 in MyClass\nI am method2 in MyClass\nI am method3 in MyClass',
      },
      {
        type: 'text',
        text: 'In the above example, MyInterface3 is extending MyInterface1 and MyInterface2, which means it will inherit all the methods from both parent interfaces, and the implementing class will have to implement all the methods of all inherited interfaces as well.\n\nIn the above program, MyInterface3 is a child interface, and MyInterface1 and MyInterface2 are parent interfaces.',
      },
      {
        type: 'text',
        heading: '6.3 Access Specifiers',
        text: 'In Java, access specifiers are used to specify the access level of a class or its members (data and methods). There are four access specifiers in Java:',
      },
      {
        type: 'termlist',
        items: [
          { term: 'public', def: 'When we declare class members as public, they are accessible from outside the class.' },
          { term: 'private', def: 'When we declare class members as private, they are only accessible within the class and are not accessible from outside the class.' },
          { term: 'default', def: 'When we declare class members with no access specifier is considered as default, they are only accessible within the package and are not accessible from outside the package.' },
          { term: 'protected', def: 'When we declare class members as protected, they are only accessible by any class within the same package or by any subclasses of the parent class in which the class members are declared as protected, regardless of whether the subclass is in the same package or a different package.' },
        ],
      },
      {
        type: 'note',
        text: 'A package is a container that contains classes in java.',
      },
      {
        type: 'text',
        text: 'We already know from the previous lessons how to use private and public access specifiers in a Java program. Now, we will see how to use a default and protected access specifier in a Java program.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.Scanner;\n\nclass Student\n{\n    int roll;               // default access specifiers\n    protected int eng;\n    protected int math;\n};\n\n// Inherit the class Student into Result\nclass Result extends Student\n{\n    private int total;\n    private float per;\n\n    public void input()\n    {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter Roll: ");\n        roll = sc.nextInt();\n        sc.nextLine();   // consume the new line character \\n left by the previous input\n        System.out.print("Enter English: ");\n        eng = sc.nextInt();\n        System.out.print("Enter Math: ");\n        Math = sc.nextInt();\n    }\n\n    // Creating an instance method to calculate and store total and percentage\n    public void calculate()\n    {\n        total = eng + math;\n        per = (total / 200.0f) * 100;\n    }\n\n    void show()\n    {\n        System.out.println("Roll: " + roll);\n        System.out.println("English: " + eng);\n        System.out.println("Math: " + math);\n        System.out.println("Total Marks: " + total);\n        System.out.println("Percentage: " + per);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Result x=new Result();\n        x.input();\n        x.calculate();\n        x.show();\n    }\n}',
      },
      {
        type: 'note',
        text: "As printed, `Math = sc.nextInt();` in `input()` won't compile — the field is declared lowercase `math`, and Java is case-sensitive. Lowercase the assignment to fix it.",
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Enter Roll: 1\nEnter English: 74\nEnter Math: 88\nRoll: 1\nEnglish: 74\nMath: 88\nTotal Marks: 162\nPercentage: 81.0',
      },
      {
        type: 'text',
        text: 'In the above example, we can see that the default and protected data members of the Student class are accessible from the Result class after inheriting the Student class in it.',
      },
      {
        type: 'text',
        heading: '6.4 Polymorphism in Java?',
        text: 'The term Polymorphism has been derived from the words poly means many and morphism means form. In programming, polymorphism means to create many forms from one.\n\nThere are two types of polymorphism available in Java and they are:',
      },
      {
        type: 'bullets',
        items: ['Compile Time Polymorphism', 'Runtime Polymorphism'],
      },
      {
        type: 'text',
        text: "Let's discuss each of them in detail one by one.",
      },
      {
        type: 'text',
        heading: 'Compile Time Polymorphism',
        text: 'In Java, compile time polymorphism refers to the ability of the compiler to select the appropriate function implementation to use at compile time, based on the types of the arguments that are passed to it. This is also known as static binding or early binding. In Java, compile time polymorphism can be achieve using:',
      },
      {
        type: 'bullets',
        items: ['Method Overloading'],
      },
      {
        type: 'text',
        heading: 'Method Overloading',
        text: 'Function Overloading is a process in which we declare a function that can perform a different task when provided with a different number of inputs.\n\nFor example, we will overload a function called area, which, when called with one argument, will display the area of a square. When the same method is called with two arguments, it will display the area of a rectangle.',
      },
      {
        type: 'code',
        heading: 'Example of Method Overloading',
        language: 'java',
        code: 'public class Example\n{\n    public static void area(int side)\n    {\n        int a;\n        a=side*side;\n        System.out.println("Area of the square = " + a);\n    }\n\n    public static void area(int l, int b)\n    {\n        int a;\n        a=l*b;\n        System.out.println("Area of the rectangle = " + a);\n    }\n\n    public static void main(String args[])\n    {\n        area(5);\n        area(10,4);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Area of the square = 25\nArea of the rectangle = 40',
      },
      {
        type: 'text',
        text: "In the above program, we declared two methods having the same name but with different numbers of arguments. When we call the area() function with one argument, it prints the square's area.\nOn the other hand, when we call the area() method with two arguments, it prints the rectangle's area.",
      },
      {
        type: 'text',
        heading: 'Runtime Polymorphism',
        text: 'In Java, runtime polymorphism is a programming technique where the behavior of a member method of a class is determined at runtime rather than compile time. This is also known as Dynamic Method Dispatch. In Java, runtime polymorphism can be achieved using:',
      },
      {
        type: 'bullets',
        items: ['Method Overriding'],
      },
      {
        type: 'text',
        heading: 'Method Overriding',
        text: 'Method Overriding is a process used in inheritance in which a base class method is re-declared with a new body in a subclass.',
      },
      {
        type: 'code',
        heading: 'Example of Method Overriding',
        language: 'java',
        code: 'class Shape\n{\n    public void draw()\n    {\n        System.out.println("Drawing a shape");\n    }\n}\n\nclass Circle extends Shape\n{\n    public void draw()\n    {\n        System.out.println("Drawing a circle");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Shape x;\n        x = new Circle();\n        x.draw();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Drawing a circle',
      },
      {
        type: 'text',
        text: 'In the above example, the draw method of Shape class is overridden in the Circle class. When the draw method is called through the reference variable x of the base class Shape, the compiler will determine at runtime that the object pointed to variable x is actually a Circle class, so it executed the draw method in the Circle class rather than the one in the Shape class. This is an example of runtime polymorphism.',
      },
      {
        type: 'text',
        heading: '6.5 Abstract',
        text: "An abstract class is a class whose object can't be created but can be used as a base class for other classes.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'abstract class Message\n{\n    public void show()\n    {\n        System.out.println("I am method inside an abstract class");\n    }\n}\n\nclass Data extends Message\n{\n    public void display()\n    {\n        // Calling the show() method of the Message class\n        show();\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Data x = new Data();\n        x.show();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'I am method inside an abstract class',
      },
      {
        type: 'text',
        text: "In the above example, the class Message is declared abstract, meaning that we can't create its object but can extend it into another class. Any attempt to create the object of the Message class will result in a compile-time error. See the example given below.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'abstract class Message\n{\n    public void show()\n    {\n        System.out.println("I am method inside an abstract class");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // This will give a compile-time error:\n        // Message is abstract; cannot be instantiated\n        Message x=new Message();\n    }\n}',
      },
      {
        type: 'text',
        heading: 'Abstract Method',
        text: 'An abstract method is a method that has no body. It is declared with the keyword abstract and must be overridden in a subclass.',
      },
      {
        type: 'note',
        text: 'If a class contains an abstract method, then the class will also have to be declared abstract.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'abstract class Message\n{\n    public void show()\n    {\n        System.out.println("I am method inside an abstract class");\n    }\n\n    // An abstract method without any body\n    public abstract void information();\n}\n\nclass Data extends Message\n{\n    // Overriding the abstract method information of the Message class\n    public void information()\n    {\n        System.out.println("Hello");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        Data x = new Data();\n        x.information();\n        x.show();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Hello\nI am method inside an abstract class',
      },
      {
        type: 'text',
        text: 'In the above example, we declared a non-abstract method show() and an abstract method information() in the class Message. The Message class contains an abstract method, so it must also be declared abstract. We have extended the class Data with the abstract class Message. The Message class contains abstract method information(), which we have overridden in the Data class.',
      },
      {
        type: 'text',
        heading: 'Laboratory Work 4: OOP Concepts',
        text: "The exercises below draw on everything covered in this module, plus what's discussed in practical class — refer back to any of the lessons above as you work through them.",
      },
      {
        type: 'bullets',
        heading: 'Project 1',
        items: ['Write a Java program to implement the concept of object and class', 'Write a Java program to illustrate the concept of Constructors'],
      },
      {
        type: 'text',
        heading: 'Project 2',
        text: 'Write a Java program to demonstrate the concept of method overloading.',
      },
      {
        type: 'text',
        heading: 'Project 3',
        text: 'Write a java program that implements educational hierarchy using inheritance.',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/10-office-employee-hierarchy.png',
        width: 1000, height: 531, maxWidth: 480,
        alt: 'Office class with fields empno, empname, salary and method getvalue(); Teaching and Non-Teaching subclasses each with a Designition field and setvalue() method',
      },
      {
        type: 'text',
        heading: 'Project 4',
        text: 'Write a java program to find the details of the students eligible to enroll for the examination (Students, Department combined gives the eligibility criteria for the enrollment class) using interfaces.',
      },
      {
        type: 'image',
        src: '/lecture-notes/cos-221/11-exam-interface-hierarchy.png',
        width: 1200, height: 758, maxWidth: 540,
        alt: 'Students class with fields sno, sname, class and method getvalue(); Department class with fields sno, attendense and method getattendense(); both feeding into an Exam class with methods calattendese() and bool eligible()',
      },
    ],
  },
  {
    number: '8',
    title: 'Exception Handling',
    sections: [
      {
        type: 'text',
        text: 'An exception is a condition that arises due to an error that occurs during the runtime of a program. Exception handling is a procedure in Java in which runtime errors that may occur when a program is being executed are handled properly so the program can continue its execution without unexpectedly ending due to a runtime error.',
      },
      {
        type: 'text',
        heading: '8.1 Types of Exception in Java',
        text: 'There are two types of exception in Java and they are:',
      },
      {
        type: 'bullets',
        items: ['Checked Exceptions', 'Unchecked Exceptions'],
      },
      {
        type: 'text',
        heading: 'Checked Exceptions',
        text: 'Checked exceptions are those that the compiler verifies at the time of compilation. A method must handle any checked exceptions it throws or explicitly states the exception using the throws keyword. IOException, SQLException, and ClassNotFoundException are a few examples of checked exceptions.',
      },
      {
        type: 'text',
        heading: 'Unchecked Exceptions',
        text: 'Unchecked exceptions are those that the compiler does not verify at the time of compilation, but these exceptions occur at runtime. They are also known as runtime exceptions.\n\nThese exceptions arise due to an error in the program, like null pointer exceptions, index out of bounds exceptions, and arithmetic exception. NullPointerException, ArrayIndexOutOfBoundsExceptions, and ArithmeticException are a few examples of unchecked exceptions.',
      },
      {
        type: 'table',
        heading: 'List of Common Exceptions in Java',
        headers: ['Exception Type', 'Cause of Exception'],
        rows: [
          ['ArithmeticException', 'Occur when a number is divided by zero.'],
          ['ArrayIndexOutOfBoundsException', 'Occur when try to access an index that does not exist in an array.'],
          ['StringIndexOutOfBoundsException', 'Occur when try to access an index that does not exist in a string.'],
          ['NumberFormatException', 'Occur when a conversion between string and number fails.'],
          ['InputMismatchException', 'Occur when an invalid input is given to store in a variable.'],
          ['ClassNotFoundException', 'Occur when unable to find a specified class.'],
          ['FileNotFoundException', 'Occur when unable to find a specified file.'],
          ['IOException', 'Occur due to input/output failures.'],
          ['OutOfMemoryException', 'Occur when there is not enough memory to allocate a new object.'],
          ['NullPointerException', 'Occur when trying to use a null object reference.'],
          ['SecurityException', 'Occur when a security violation occurs.'],
        ],
      },
      {
        type: 'text',
        heading: 'How to Handle Exceptions in Java',
        text: "Exceptions in Java are handled using the try-catch statement. Let's raise an ArithmeticException and handle it with the try-catch statement.",
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int a = 5, b = 0, c;\n\n        c = a / b;\n        System.out.println("a = " + a);\n        System.out.println("b = " + b);\n        System.out.println("Result = " + c);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Exception in thread "main" java.lang.ArithmeticException: / by zero\n        at Example.main(Example.java:7)',
      },
      {
        type: 'text',
        text: "In the above program, when we try to divide the number 5 by 0, the program raises an ArithmeticException on line number 7, and the program terminates without executing the rest of the lines after line 7.\n\nNow we will handle the ArithmeticException raised on line 7 using the try-catch statement so that the program does not terminate whenever the exception occurs. Let's see the syntax of try-catch statement.",
      },
      {
        type: 'code',
        heading: 'try-catch Statement Syntax',
        language: 'java',
        code: 'try\n{\n    // statements that may raise an exception\n}\ncatch(exception_type object_name)\n{\n    // manage the exception as per your requirements\n}',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int a = 5, b = 0, c = 0;\n\n        try\n        {\n            c = a / b;\n        }\n        catch(ArithmeticException e)\n        {\n            System.out.println("Can\'t divide number by 0");\n        }\n        System.out.println("a="+a);\n        System.out.println("b="+b);\n        System.out.println("Result="+c);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: "Can't divide number by 0\na=5\nb=0\nResult=0",
      },
      {
        type: 'text',
        text: 'In the above program, the variable e in the catch statement represents an object of the thrown exception. This object contains details about the thrown exception, including the error message, the stack trace, etc.\n\nThe catch statement can use this information to manage the exception by presenting an error message to the user or logging the exception details in an error log file for further investigation.\n\nTo get the error message from the object of the thrown exception, we need to use the getMessage() method of the object. See the example given below.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        int a = 5, b = 0, c = 0;\n\n        try\n        {\n            c = a / b;\n        }\n        catch(ArithmeticException e)\n        {\n            System.out.println(e.getMessage());\n        }\n        System.out.println("a = " + a);\n        System.out.println("b = " + b);\n        System.out.println("Result = " + c);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: '/ by zero\na=5\nb=0\nResult=0',
      },
      {
        type: 'text',
        heading: 'Multiple catch Statements',
        text: 'We can handle multiple exceptions in a catch block using multiple catch statements by specifying each exception type in an individual catch statement.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'import java.util.*;\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int a = 0, b = 0, c = 0, i = 0;\n        String str;\n        Scanner sc = new Scanner(System.in);\n        try\n        {\n            System.out.println("Enter 2 integer numbers");\n            a = sc.nextInt();\n            b = sc.nextInt();\n            c = a / b;\n            sc.nextLine();\n\n            System.out.println("Enter a string");\n            str = sc.nextLine();\n\n            System.out.println("Enter an index to print the character from the above given string");\n            i = sc.nextInt();\n            System.out.println(str.charAt(i));\n        }\n        catch(ArithmeticException e)\n        {\n            System.out.println("Can\'t divide by 0.");\n        }\n        catch(InputMismatchException e)\n        {\n            System.out.println("Invalid input. Please enter an integer number.");\n        }\n        catch(StringIndexOutOfBoundsException e)\n        {\n            System.out.println("Index does not exist.");\n        }\n        System.out.println("a = " + a);\n        System.out.println("b = " + b);\n        System.out.println("Result = " + c);\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output 1',
        language: 'text',
        code: 'Enter 2 integer numbers\n5.2\nInvalid input. Please enter an integer number.\na=0\nb=0\nResult=0',
      },
      {
        type: 'code',
        heading: 'Output 2',
        language: 'text',
        code: "Enter 2 integer numbers\n5\n0\nCan't divide by 0.\na=5\nb=0\nResult=0",
      },
      {
        type: 'code',
        heading: 'Output 3',
        language: 'text',
        code: 'Enter 2 integer numbers\n5\n2\nEnter a string\nDremendo\nEnter an index to print the character from the above given string\n15\nIndex does not exist.\na=5\nb=2\nResult=2',
      },
      {
        type: 'text',
        heading: 'Using finally Statement',
        text: 'The finally statement is an optional statement in a try-catch block. Whether an exception is thrown or not, when a finally block is defined, this is guaranteed to run. We can use it to conduct operations like closing a file or freeing up system resources.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'try\n{\n    // statements that may raise an exception\n}\ncatch(exception_type object)\n{\n    // manage the exception as per your requirements\n}\nfinally\n{\n    // statements that need to be executed after the try block ends\n}',
      },
      {
        type: 'text',
        heading: '8.2 User-Defined Exception',
        text: 'A user-defined exception in Java is a custom exception class created by the programmer to handle specific errors or exceptional conditions in their code. It allows for more precise error handling and reporting instead of relying on built-in exception classes provided by the Java API. User-defined exceptions are created by extending the Exception class or an Exception subclass.',
      },
      {
        type: 'text',
        heading: 'How to Create a User-Defined Exception in Java',
        text: 'To create a user-defined exception, we need to create a class and extend it with the Exception class, for example.',
      },
      {
        type: 'code',
        heading: 'A User-Defined Exception Class',
        language: 'java',
        code: 'class NumberRangeException extends Exception\n{\n    // default constructor\n    public NumberRangeException()\n    {\n        // invoking the parameterized constructor of the\n        // parent class Exception with custom message\n        super("Invalid Number Range");\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we created a user-defined exception class known as NumberRangeException by extending it with the Exception class.\n\nAfter that, we created a default constructor in the class NumberRangeException. Inside it, we invoked the parameterized constructor of the parent class Exception with a custom exception message using the super keyword as shown in the above program.',
      },
      {
        type: 'text',
        heading: 'How to Use the User-Defined Exception Class',
        text: 'To use the above-created user-defined exception class, we have to use it in a new class to raise our custom exception using the throws and throw keyword as shown below.',
      },
      {
        type: 'code',
        heading: 'Example',
        language: 'java',
        code: 'class NumberRangeException extends Exception\n{\n    // default constructor\n    public NumberRangeException()\n    {\n        // invoking the parameterized constructor of the\n        // parent class Exception with custom message\n        super("Invalid Number Range");\n    }\n}\n\nclass MyData\n{\n    public int sum(int n) throws NumberRangeException\n    {\n        int i, s = 0;\n\n        // condition that will raise a NumberRangeException\n        // using the throw keyword\n        if(n<0)\n        {\n            throw new NumberRangeException();\n        }\n        for(i=1; i<=n; i++)\n        {\n            s = s + i;\n        }\n        return s;\n    }\n}\n\npublic class TestException\n{\n    public static void main(String args[])\n    {\n        MyData x = new MyData();\n        try\n        {\n            System.out.println(x.sum(-10));\n        }\n        catch(NumberRangeException e)\n        {\n            // printing the default message set in the\n            // user-defined exception class\n            System.out.println(e.getMessage());\n\n            // printing our custom message\n            System.out.println("Negative Number Not Allowed");\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'text',
        code: 'Invalid Number Range\nNegative Number Not Allowed',
      },
      {
        type: 'text',
        text: 'In the above program, we create a Java file with the name TestException that contains the main method. In the same file, we created our user-defined exception class and a new class called MyData. Inside the class MyData, we created a method sum followed by the throws keyword and the name of our user-defined exception class NumberRangeException. The throws keyword is used with the function signature stating that the function will raise an exception.\n\nIn the method sum, we have raised our custom exception when the value of n is less than 0 using the throw keyword followed by the new keyword and the name of our custom exception class, as shown above.\n\nThe throw keyword is used inside a method to raise a custom exception object that can be caught and handled using a try-catch block. The main method uses the try-catch statement to handle our custom exception in the program.',
      },
    ],
  },
  {
    number: '9',
    title: 'Threads',
    sections: [
      {
        type: 'text',
        heading: '9.1 Introduction',
        text: 'A thread in Java is a lightweight and independent unit of execution within a process. A thread shares the same memory space as the process that created it, but each thread has its own stack, register set, and program counter. By using threads, a Java program can perform multiple tasks at the same time, increasing its responsiveness and efficiency. A Java program can use multiple threads executed simultaneously, allowing for more efficient use of system resources and improved performance.\n\nNote: A program, when it starts executing, becomes a Process.',
      },
      {
        type: 'table',
        heading: '9.2 How to Create a Thread in Java',
        headers: ['Method', 'Description'],
        rows: [
          ['By extending the Thread class', 'Extend Thread and override its run() method.'],
          ['By implementing the Runnable interface', 'Implement Runnable and override its run() method.'],
        ],
      },
      {
        type: 'text',
        heading: '9.2.1 By Extending the Thread Class',
        text: 'To create a thread in Java, we can extend the Thread class and override its run() method to specify the code the thread will execute when it begins to run.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'class ClassName extends Thread\n{\n    public void run()\n    {\n        // write the code that you want to execute in a thread\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Example 1',
        language: 'java',
        code: 'class PrimeThread extends Thread\n{\n    public void run()\n    {\n        int i, j, fc;\n        for (i = 1; i <= 100000; i++)\n        {\n            fc = 0;\n            for (j = 1; j <= i; j++)\n            {\n                if (i % j == 0)\n                {\n                    fc++;\n                }\n            }\n            if (fc == 2)\n            {\n                System.out.println("Prime Number = " + i);\n            }\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we created a class known as PrimeThread by extending it with the Thread class. After that, we wrote the code in the run() method that we want to execute in a thread.',
      },
      {
        type: 'text',
        heading: '9.2.2 By Implementing the Runnable Interface',
        text: 'To create a thread in Java, we can implement the Runnable interface and override its run() method to specify the code the thread will execute when it begins to run.',
      },
      {
        type: 'code',
        heading: 'Syntax',
        language: 'java',
        code: 'class ClassName implements Runnable\n{\n    public void run()\n    {\n        // write the code that you want to execute in a thread\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Example 2',
        language: 'java',
        code: 'class PrimeCountThread implements Runnable\n{\n    public void run()\n    {\n        int i, j, fc, pc = 0;\n        for (i = 1; i <= 100000; i++)\n        {\n            fc = 0;\n            for (j = 1; j <= i; j++)\n            {\n                if (i % j == 0)\n                {\n                    fc++;\n                }\n            }\n            if (fc == 2)\n            {\n                pc++;\n            }\n        }\n        System.out.println("Total Prime Numbers between 1 to 100000 = " + pc);\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we created a class known as PrimeCountThread by implementing the Runnable interface. After that, we wrote the code in the run() method that we want to execute in a thread.',
      },
      {
        type: 'text',
        heading: '9.3 How to Use a Thread in Java',
        text: 'We know how to create a thread by extending the Thread class or implementing the Runnable interface. Now we will see how to use a thread by using both methods one by one with examples.',
      },
      {
        type: 'code',
        heading: 'Example 3 — Extending the Thread Class',
        language: 'java',
        code: 'class PrimeThread extends Thread\n{\n    public void run()\n    {\n        int i, j, fc;\n        for (i = 1; i <= 100000; i++)\n        {\n            fc = 0;\n            for (j = 1; j <= i; j++)\n            {\n                if (i % j == 0)\n                {\n                    fc++;\n                }\n            }\n            if (fc == 2)\n            {\n                System.out.println("Prime Number = " + i);\n            }\n        }\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // create an object of the PrimeThread class\n        PrimeThread x = new PrimeThread();\n\n        // execute the thread by invoking the start() method of Thread class on object x\n        x.start();\n    }\n}',
      },
      {
        type: 'text',
        text: 'If we run the above program, we will get the list of all the prime numbers between 1 and 100000.',
      },
      {
        type: 'code',
        heading: 'Example 4 — Implementing the Runnable Interface',
        language: 'java',
        code: 'class PrimeCountThread implements Runnable\n{\n    public void run()\n    {\n        int i, j, fc, pc = 0;\n        for (i = 1; i <= 100000; i++)\n        {\n            fc = 0;\n            for (j = 1; j <= i; j++)\n            {\n                if (i % j == 0)\n                {\n                    fc++;\n                }\n            }\n            if (fc == 2)\n            {\n                pc++;\n            }\n        }\n        System.out.println("Total Prime Numbers between 1 to 100000 = " + pc);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // create an object of the PrimeCountThread class\n        PrimeCountThread x = new PrimeCountThread();\n\n        // create an object of Thread class and pass object x as an argument\n        // to the constructor of the Thread class\n        Thread t = new Thread(x);\n\n        // execute the thread by invoking the start() method of object t\n        t.start();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Total Prime Numbers between 1 to 100000 = 9592',
      },
      {
        type: 'note',
        text: 'We should create a thread by implementing the Runnable interface when we want to extend another class because Java does not allow extending a subclass with multiple classes. So if we create a thread by extending the Thread class, then there is no way to extend another class.',
      },
      {
        type: 'text',
        heading: '9.4 Create Multiple Threads in Java',
        text: 'We can create multiple threads in Java for doing multiple tasks parallelly. Suppose we want to find out the sum of all the perfect numbers between 1 and 10000 and also want to find the sum of all the prime numbers between 1 and 10000. We want to execute these two programs parallelly. To solve this problem, we will create two separate threads, one for each program.',
      },
      {
        type: 'code',
        heading: 'Example 5',
        language: 'java',
        code: 'class PerfectCount extends Thread\n{\n    public void run()\n    {\n        int i, j, sum = 0, fs = 0;\n        for (i = 1; i <= 10000; i++)\n        {\n            fs = 0;\n            for (j = 1; j < i; j++)\n            {\n                if (i % j == 0)\n                {\n                    fs = fs + j; // sum of factors\n                }\n            }\n            if (fs == i)\n            {\n                sum = sum + i;\n            }\n        }\n        System.out.println("Sum of Perfect Numbers between 1 to 10000 = " + sum);\n    }\n}\n\nclass PrimeSum extends Thread\n{\n    public void run()\n    {\n        int i, j, fc, sum = 0;\n        for (i = 1; i <= 10000; i++)\n        {\n            fc = 0;\n            for (j = 1; j <= i; j++)\n            {\n                if (i % j == 0)\n                {\n                    fc++;\n                }\n            }\n            if (fc == 2)\n            {\n                sum = sum + i;\n            }\n        }\n        System.out.println("Sum of Prime Numbers between 1 to 10000 = " + sum);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        PerfectCount t1 = new PerfectCount();\n        PrimeSum t2 = new PrimeSum();\n        t1.start();\n        t2.start();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Sum of Perfect Numbers between 1 to 10000 = 8658\nSum of Prime Numbers between 1 to 10000 = 5736396',
      },
      {
        type: 'text',
        text: 'In the above program, instead of the start() method, if we invoke the run() method on objects t1 and t2, this will execute both programs sequentially (one after another) rather than parallelly. The run() method executes the program on the main thread, whereas the start() method creates a separate child thread and runs the program in its respective child thread.\n\nNote: The main() method runs in a thread which is immediately created by the JVM (Java Virtual Machine) when our program starts, and this thread is called the main thread from where other child threads are created.',
      },
      {
        type: 'text',
        heading: '9.4.1 By invoking start() method',
        text: 'The start() method creates separate child threads and executes them in parallel without blocking the main thread.',
      },
      {
        type: 'code',
        heading: 'Example 6',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 100; i++)\n        {\n            // loop to create some execution delay in the program\n        }\n        System.out.println("Exit from ThreadA");\n    }\n}\n\nclass ThreadB extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 100; i++)\n        {\n            // loop to create some execution delay in the program\n        }\n        System.out.println("Exit from ThreadB");\n    }\n}\n\nclass ThreadC extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 100; i++)\n        {\n            // loop to create some execution delay in the program\n        }\n        System.out.println("Exit from ThreadC");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        ThreadB b = new ThreadB();\n        ThreadC c = new ThreadC();\n\n        // execute the thread by invoking the start() method of objects a, b, and c\n        a.start();\n        b.start();\n        c.start();\n        System.out.println("Hello Java");\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Hello Java\nExit from ThreadA\nExit from ThreadC\nExit from ThreadB',
      },
      {
        type: 'text',
        text: 'The output order of the thread messages may vary. The above program shows that, on the output screen, first "Hello Java" is displayed. After that, the messages from the threads appear on the screen. It is because the start() method creates separate threads and starts executing the code in parallel without blocking the main thread.\n\nBecause the main thread is not blocked, it prints "Hello Java" on the screen without waiting for the other threads to be completed. It is an example of the parallel execution of code using child threads in Java.',
      },
      {
        type: 'text',
        heading: '9.4.2 By invoking run() method',
        text: 'When we invoke the run() method directly instead of start(), no child threads are spawned. The methods execute sequentially on the main thread.',
      },
      {
        type: 'code',
        heading: 'Example 7',
        language: 'java',
        code: 'public class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        ThreadB b = new ThreadB();\n        ThreadC c = new ThreadC();\n\n        // execute the run() method of objects a, b, and c\n        a.run();\n        b.run();\n        c.run();\n        System.out.println("Hello Java");\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Exit from ThreadA\nExit from ThreadB\nExit from ThreadC\nHello Java',
      },
      {
        type: 'text',
        text: 'In the above program, we have not invoked the start() method on the thread objects, so no separate child thread is created. We invoked the run() method on each object (a, b, and c), so they started executing sequentially. When all the run() methods complete their execution sequentially, the last line in the main method is executed and prints "Hello Java" on the screen. It is an example of the sequential execution of code.',
      },
      {
        type: 'text',
        heading: '9.5 Thread Methods in Java',
        text: 'There are several methods available in the Thread class. Here we discuss the most commonly used methods of the Thread class and their uses in Java.',
      },
      {
        type: 'text',
        heading: '9.5.1 run() and start() Method',
        text: 'In the run() method, we write the code we want to execute in a thread, and the start() method is used to execute the code written in the run() method on a child thread, as seen in the examples above.',
      },
      {
        type: 'text',
        heading: '9.5.2 sleep() Method',
        text: 'The sleep() method is used to pause the execution of a running thread for specified milliseconds (1000 milliseconds = 1 second). The thread starts running when the specified time for the sleep() method is over.\n\nThis method is used in a try-catch block because it raises the InterruptedException exception.',
      },
      {
        type: 'code',
        heading: 'Example 8',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 5; i++)\n        {\n            System.out.println(i);\n            try\n            {\n                // pause the thread for 2 seconds\n                Thread.sleep(2000);\n            }\n            catch (InterruptedException e) { }\n        }\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        a.start();\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we pause the child thread ThreadA for 2 seconds using the sleep() method, so each number on the output screen will appear after 2 seconds.',
      },
      {
        type: 'text',
        heading: '9.5.3 join() Method',
        text: 'The currently running thread is put into a wait state by the join() method until the thread on which the join() method was called has finished running.\n\nThis method is used in a try-catch block because it raises the InterruptedException exception.',
      },
      {
        type: 'code',
        heading: 'Example 9',
        language: 'java',
        code: 'class Thread_A extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 5; i++)\n        {\n            System.out.println("Thread_A counting.... " + i);\n            try\n            {\n                Thread.sleep(1000);\n            }\n            catch (InterruptedException e) { }\n        }\n        System.out.println("Exit from Thread_A");\n    }\n}\n\nclass Thread_B extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 5; i++)\n        {\n            System.out.println("Thread_B counting.... " + i);\n            try\n            {\n                Thread.sleep(3000);\n            }\n            catch (InterruptedException e) { }\n        }\n        System.out.println("Exit from Thread_B");\n    }\n}\n\npublic class JoinThread\n{\n    public static void main(String args[]) throws InterruptedException\n    {\n        Thread_A a = new Thread_A();\n        Thread_B b = new Thread_B();\n        a.start();\n        b.start();\n        a.join();\n        System.out.println("End of main thread");\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we have invoked the join() method on the object of class Thread_A. The join() method puts the main thread into a wait state until Thread_A has completed its execution.',
      },
      {
        type: 'text',
        heading: '9.5.4 isAlive() Method',
        text: 'The isAlive() method is used to check whether a thread is alive. This method returns true if the thread is alive and returns false if the thread is not alive.',
      },
      {
        type: 'code',
        heading: 'Example 10',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        int i;\n        System.out.println("Counting 1 to 10");\n        for (i = 1; i <= 10; i++)\n        {\n            System.out.println(i);\n            // pause the thread for 2 seconds\n            Thread.sleep(2000);\n        }\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[]) throws InterruptedException\n    {\n        ThreadA a = new ThreadA();\n        a.start();\n        System.out.println("Thread is alive: " + a.isAlive());\n        a.join();\n        System.out.println("Thread is alive: " + a.isAlive());\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Thread is alive: true\nCounting 1 to 10\n1\n2\n3\n4\n5\nThread is alive: false',
      },
      {
        type: 'text',
        heading: '9.5.5 getId() Method',
        text: 'The getId() method is used to get the ID number of a thread. The thread ID is a positive number generated when a thread is created. The thread ID is unique and remains unchanged during the lifetime of a thread. When a thread is terminated, the thread ID may be reused.',
      },
      {
        type: 'code',
        heading: 'Example 11',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        System.out.println("Hello I am child thread");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        System.out.println("Thread ID: " + a.getId());\n        a.start();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Thread ID: 8\nHello I am child thread',
      },
      {
        type: 'text',
        heading: '9.5.6 setName() and getName() Method',
        text: 'The setName() method is used to set a new name of a thread. The getName() method is used to get the name of a thread.',
      },
      {
        type: 'code',
        heading: 'Example 12',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        System.out.println("Hello I am child thread");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        System.out.println("Thread Name: " + a.getName());\n        a.setName("ComputerSc");\n        a.start();\n        System.out.println("Thread Name: " + a.getName());\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Thread Name: Thread-0\nThread Name: ComputerSc\nHello I am child thread',
      },
      {
        type: 'text',
        heading: '9.5.7 getState() Method',
        text: 'The getState() method is used to get the state of a thread. The state means the form in which the thread is working in the processor.',
      },
      {
        type: 'code',
        heading: 'Example 13',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        System.out.println("Hello I am child thread");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        System.out.println("Thread State: " + a.getState());\n        a.start();\n        System.out.println("Thread State: " + a.getState());\n        try\n        {\n            a.join();\n        }\n        catch (InterruptedException e) { }\n        System.out.println("Thread State: " + a.getState());\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Thread State: NEW\nThread State: RUNNABLE\nHello I am child thread\nThread State: TERMINATED',
      },
      {
        type: 'text',
        heading: '9.5.8 setPriority() Method',
        text: 'The setPriority() method is used to set the running priority of a thread in the processor.',
      },
      {
        type: 'table',
        heading: 'Thread Priority Constants',
        headers: ['Priority Constant', 'Constant Value', 'Meaning'],
        rows: [
          ['MIN_PRIORITY', '1', 'Minimum priority.'],
          ['NORM_PRIORITY', '5', 'Normal priority.'],
          ['MAX_PRIORITY', '10', 'Maximum priority.'],
        ],
      },
      {
        type: 'code',
        heading: 'Example 14',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 10; i++)\n            System.out.println("ThreadA running... " + i);\n    }\n}\n\nclass ThreadB extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 10; i++)\n            System.out.println("ThreadB running... " + i);\n    }\n}\n\nclass ThreadC extends Thread\n{\n    public void run()\n    {\n        int i;\n        for (i = 1; i <= 10; i++)\n            System.out.println("ThreadC running... " + i);\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        ThreadB b = new ThreadB();\n        ThreadC c = new ThreadC();\n        a.setPriority(1);\n        b.setPriority(5);\n        c.setPriority(10);\n        a.start();\n        b.start();\n        c.start();\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we created three threads that count from 1 to 10. We set the priority of ThreadA\'s object to 1 (MIN_PRIORITY), ThreadB\'s object to 5 (NORM_PRIORITY), and ThreadC\'s object to 10 (MAX_PRIORITY).\n\nBecause the priority of ThreadC is set to 10, which is the highest priority, it will get more time in the processor for its code execution. ThreadB will get a normal amount of time in the processor, and ThreadA will get a time below the normal time for its code execution.\n\nIf we run the above program several times, we can see that ThreadC completes its execution first compared to the other two threads because it is getting more time in the processor for its code execution than the other two threads.',
      },
      {
        type: 'text',
        heading: '9.5.9 getPriority() Method',
        text: 'The getPriority() method is used to get the priority of a thread.',
      },
      {
        type: 'code',
        heading: 'Example 15',
        language: 'java',
        code: 'class ThreadA extends Thread\n{\n    public void run()\n    {\n        System.out.println("I am ThreadA with MAX PRIORITY");\n    }\n}\n\nclass ThreadB extends Thread\n{\n    public void run()\n    {\n        System.out.println("I am ThreadB with NORM PRIORITY");\n    }\n}\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        ThreadA a = new ThreadA();\n        ThreadB b = new ThreadB();\n        a.setPriority(10);\n        System.out.println("ThreadA priority: " + a.getPriority());\n        System.out.println("ThreadB priority: " + b.getPriority());\n        a.start();\n        b.start();\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'ThreadA priority: 10\nThreadB priority: 5\nI am ThreadA with MAX PRIORITY\nI am ThreadB with NORM PRIORITY',
      },
      {
        type: 'text',
        heading: 'Laboratory Work · Project 5',
        text: 'Write a Java program that creates a bank account with concurrent deposits and withdrawals using threads with five users.',
      },
    ],
  },
  {
    number: '10',
    title: 'Text File Handling',
    sections: [
      {
        type: 'text',
        heading: '10.1 Introduction',
        text: 'Text File Handling is a process in which we create a text file and store data permanently on a hard disk so that it can be retrieved from memory later for use in a program.\n\nIn a text file, whatever data we store is treated as text. Even if we store numbers, they are treated as text.',
      },
      {
        type: 'table',
        heading: 'Text File Operations',
        headers: ['Operation', 'Purpose'],
        rows: [
          ['Open a file', 'Open or create a text file.'],
          ['Write to a file', 'Store text in a file.'],
          ['Read from a file', 'Retrieve text from a file.'],
          ['Copy a file from one location to another', 'Duplicate file contents at another location.'],
          ['Rename a file', 'Change a file\'s name.'],
          ['Delete a file', 'Remove a file.'],
        ],
      },
      {
        type: 'text',
        heading: '10.2 Operations on Text Files',
        text: 'There are different types of operations that we can perform on a text file.',
      },
      {
        type: 'text',
        heading: '10.2.1 Open a File',
        text: 'We use the File and FileWriter classes to open a text file in Java. To use these classes, we must import the package java.io.* into our program. The FileWriter is also used for writing text content to a file.\n\nWhile opening a file in non-append mode using the FileWriter class, if the file does not exist, it will be created by the FileWriter class. If the file exists, then it erases all the contents of the file.',
      },
      {
        type: 'code',
        heading: 'Syntax of File and FileWriter Classes',
        language: 'java',
        code: '// Create a File object\nFile f = new File("file path");\n\n// Create a FileWriter object using a File object in non-append mode\nFileWriter fw = new FileWriter(f);\n\n// Create a FileWriter object using a File object in append mode\nFileWriter fw = new FileWriter(f, true);\n\n// Create a FileWriter object using a file path in non-append mode\nFileWriter fw = new FileWriter("file path");\n\n// Create a FileWriter object using a file path in append mode\nFileWriter fw = new FileWriter("file path", true);',
      },
      {
        type: 'code',
        heading: 'Example — Open a File using File Object passed to FileWriter',
        language: 'java',
        code: 'import java.io.*;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // create a File object\n        File f = new File("C:\\\\Users\\\\...\\\\NetBeansProjects\\\\CSC_222/JavaClass.txt");\n\n        // declare a FileWriter object\n        FileWriter fw = null;\n        try\n        {\n            // initialize and open FileWriter object by passing the File object\n            fw = new FileWriter(f, true);\n\n            // close the file\n            fw.close();\n        }\n        catch (IOException e)\n        {\n            System.out.println(e.getMessage());\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Example — Open a File using File Path passed to FileWriter',
        language: 'java',
        code: 'import java.io.*;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        // declare a FileWriter object\n        FileWriter fw = null;\n        try\n        {\n            // initialize the FileWriter object by passing the file path\n            fw = new FileWriter("C:\\\\Users\\\\...\\\\NetBeansProjects\\\\CSC_222/JavaClass.txt", true);\n\n            // close the file\n            fw.close();\n        }\n        catch (IOException e)\n        {\n            System.out.println(e.getMessage());\n        }\n    }\n}',
      },
      {
        type: 'text',
        heading: '10.2.2 Write to a File',
        text: 'We use the FileWriter class and Scanner class to write text to a file. The program below demonstrates how we can write text into a text file using the FileWriter and Scanner classes.',
      },
      {
        type: 'code',
        heading: 'Example — Writing Text to a File',
        language: 'java',
        code: 'import java.io.*;\nimport java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        File f = new File("C:\\\\Users\\\\...\\\\NetBeansProjects\\\\CSC_222/JavaClass.txt");\n        FileWriter fw = null;\n        String str;\n        Scanner sc = new Scanner(System.in);\n\n        try\n        {\n            fw = new FileWriter(f, true);\n            System.out.println("Enter a few lines of text:");\n            str = sc.nextLine();\n            while (str.length() > 0)\n            {\n                fw.write(str + "\\r\\n");\n                str = sc.nextLine();\n            }\n        }\n        catch (IOException e)\n        {\n            System.out.println(e.getMessage());\n        }\n        finally\n        {\n            try\n            {\n                fw.close();\n            }\n            catch (IOException e) { }\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'Enter a few lines of text:\nThis is CSC 222/226 Java class on text file handling.\nHey...we have missed something; how to create Directory :(-',
      },
      {
        type: 'text',
        text: 'In the above program, with the help of a while loop we check if the length of str is greater than 0, then write all the contents of str into the file using the write() method of the FileWriter class along with the \\r\\n escape-sequence characters that represent a new line in the file.\n\nThe while loop terminates when we press the Enter key from the keyboard twice without writing anything on the screen. In this case, the length of str becomes 0 and the loop terminates.',
      },
      {
        type: 'text',
        heading: '10.2.3 Read from a File',
        text: 'We use the FileReader class and Scanner class to read text from a file. The program below demonstrates how we can read from a text file using the FileReader and Scanner classes.',
      },
      {
        type: 'code',
        heading: 'Example — Reading Line by Line using Scanner',
        language: 'java',
        code: 'import java.io.*;\nimport java.util.Scanner;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        String str;\n\n        // create a File object\n        File f = new File("C:\\\\Users\\\\...\\\\NetBeansProjects\\\\CSC_222/JavaClass.txt");\n\n        // declare a Scanner object\n        Scanner sc = null;\n        try\n        {\n            // initialize the Scanner object by passing the File object\n            sc = new Scanner(f);\n            while (sc.hasNextLine())\n            {\n                str = sc.nextLine();\n                System.out.println(str);\n            }\n        }\n        catch (IOException e)\n        {\n            System.out.println(e.getMessage());\n        }\n\n        // close the file\n        if (sc != null)\n        {\n            sc.close();\n        }\n    }\n}',
      },
      {
        type: 'code',
        heading: 'Output',
        language: 'output',
        code: 'This is CSC 222/226 Java class on text file handling.\nHey...we have missed something; how to create Directory :(-',
      },
      {
        type: 'text',
        text: 'We can also read a file character by character using the read() method of the FileReader class. See the example given below.',
      },
      {
        type: 'code',
        heading: 'Example — Reading Character by Character using FileReader',
        language: 'java',
        code: 'import java.io.*;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        int ch;\n\n        // create a File object\n        File f = new File("C:\\\\Users\\\\...\\\\NetBeansProjects\\\\CSC_222/JavaClass.txt");\n\n        // declare a FileReader object\n        FileReader fr = null;\n        try\n        {\n            fr = new FileReader(f);\n            ch = fr.read();\n            while (ch != -1)\n            {\n                // read a character and return its integer value\n                System.out.print((char) ch);\n                ch = fr.read(); // read the next character\n            }\n        }\n        catch (IOException e)\n        {\n            System.out.println(e.getMessage());\n        }\n        finally\n        {\n            try\n            {\n                if (fr != null)\n                {\n                    fr.close();\n                }\n            }\n            catch (IOException e) { }\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'The read() method reads a character from the file and returns its integer ASCII value. It returns -1 when it reaches the end of the file (EOF).',
      },
      {
        type: 'text',
        heading: '10.2.4 Copy a File from One Location to Another',
        text: 'The program given below demonstrates how to copy a file from one location to another using FileReader and FileWriter.',
      },
      {
        type: 'code',
        heading: 'Example — Copying a File',
        language: 'java',
        code: 'import java.io.*;\n\npublic class Example\n{\n    public static void main(String args[])\n    {\n        File x = new File("C:\\\\Users\\\\...\\\\NetBeansProjects\\\\CSC_222/JavaClass.txt");\n        File y = new File("C:\\\\Users\\\\AMBROSE\\\\Desktop/JavaClass_2.txt");\n\n        FileReader fr = null;\n        FileWriter fw = null;\n        int ch;\n\n        try\n        {\n            fr = new FileReader(x);\n            fw = new FileWriter(y);\n            ch = fr.read();\n            while (ch != -1)\n            {\n                fw.write(ch);\n                ch = fr.read();\n            }\n            System.out.println("File copied successfully");\n        }\n        catch (IOException e)\n        {\n            System.out.print(e.getMessage());\n        }\n        finally\n        {\n            try\n            {\n                if (fr != null) fr.close();\n                if (fw != null) fw.close();\n            }\n            catch (IOException e) { }\n        }\n    }\n}',
      },
      {
        type: 'text',
        text: 'In the above program, we created two File objects, one for the source from where we will read the characters and another for the destination file where we will write all the characters.\n\nUsing a while loop, we read each character from the source file using the read() method of the FileReader object and write the character into the destination file using the write() method of the FileWriter object.',
      },
      {
        type: 'text',
        heading: '10.2.5 Rename a File',
        text: 'The program given below demonstrates how to rename a file using the renameTo() method of the File class.',
      },
      {
        type: 'code',
        heading: 'Example — Renaming a File',
        language: 'java',
        code: 'import java.io.*;\n\npublic class Example\n{\n    public static void main(String[] args)\n    {\n        File oldName = new File("D:/delta.txt");\n        File newName = new File("D:/deltainfo.txt");\n\n        if (oldName.renameTo(newName))\n        {\n            System.out.println("Renamed");\n        }\n        else\n        {\n            System.out.println("Error Occured");\n        }\n    }\n}',
      },
      {
        type: 'note',
        text: 'Before renaming a file, make sure that the file is closed, otherwise it cannot be renamed.',
      },
      {
        type: 'text',
        heading: '10.2.6 Delete a File',
        text: 'The program given below demonstrates how to delete a file using the delete() method of the File class.',
      },
      {
        type: 'code',
        heading: 'Example — Deleting a File',
        language: 'java',
        code: 'import java.io.*;\n\npublic class Example\n{\n    public static void main(String[] args) throws IOException\n    {\n        File file = new File("D:/deltainfo.txt");\n\n        if (file.delete())\n        {\n            System.out.println("File deleted successfully");\n        }\n        else\n        {\n            System.out.println("Delete operation is failed");\n        }\n    }\n}',
      },
      {
        type: 'note',
        text: 'Before deleting a file, make sure that the file is closed, otherwise it cannot be deleted.',
      },
      {
        type: 'bullets',
        heading: 'Laboratory Work 7 · Text File Handling Projects',
        items: [
          'Project 1: Write a Java program to create a new directory and a file to store PUTME records in a tabular form as serial no, candidate’s number, department, aptitude test score. Your program should use methods.',
          'Project 2: Write a Java program to read the file in Project 1 and add a new column, Remark, to hold "recommended" if the aptitude score is above the mean score, otherwise "not recommended", then store in a new file. Your program should use methods.',
          'Project 3: Write a Java program to delete all PDF and Word documents in a given directory.',
          'Project 4: Write a Java program to compare two files lexicographically.',
          'Project 5: Write a Java program to get a list of all file/directory names in a given directory.',
        ],
      },
    ],
  },
  // ─── Topic 11 ─────────────────────────────────────────────────────────
  {
    number: '11',
    title: 'Java Database Connectivity (JDBC)',
    sections: [
      // 11.1 Introduction
      {
        type: 'text',
        text:
          'Java Database Connectivity (JDBC) is a standard Java API for database-independent connectivity between the Java programming language and a wide range of databases. The JDBC library includes APIs for each of the tasks commonly associated with database usage:\n\n' +
          '• Making a connection to a database.\n' +
          '• Creating SQL or MySQL statements.\n' +
          '• Executing SQL or MySQL queries in the database.\n' +
          '• Viewing and modifying the resulting records.',
      },
      {
        type: 'text',
        text:
          'Fundamentally, JDBC is a specification that provides a complete set of interfaces that allows for portable access to an underlying database. Java can be used to write different types of executables, such as:\n\n' +
          '• Java Applications\n' +
          '• Java Applets\n' +
          '• Java Servlets\n' +
          '• Java Server Pages (JSPs)\n' +
          '• Enterprise JavaBeans (EJBs)\n\n' +
          'All of these different executables are able to use a JDBC driver to access a database and take advantage of the stored data.',
      },
      {
        type: 'text',
        text:
          'JDBC provides the same capabilities as ODBC, allowing Java programs to contain database-independent code using the java.sql and javax.sql packages.',
      },
      // 11.2 Common JDBC Components
      {
        type: 'text',
        text:
          '11.2 Common JDBC Components\n\nThe JDBC API provides the following interfaces and classes:',
      },
      {
        type: 'table',
        headers: ['Component', 'Description'],
        rows: [
          [
            'DriverManager',
            'This class manages a list of database drivers. It matches connection requests from the Java application with the proper database driver using a communication sub-protocol. The first driver that recognizes a certain JDBC sub-protocol will be used to establish a database connection.',
          ],
          [
            'Driver',
            'This interface handles communications with the database server. You interact directly with Driver objects very rarely. Instead, you use DriverManager objects, which manage objects of this type. It also abstracts the details associated with working with Driver objects.',
          ],
          [
            'Connection',
            'This interface contains methods for contacting a database. The connection object represents the communication context; all communication with the database is through the connection object only.',
          ],
          [
            'Statement',
            'Objects created from this interface are used to submit SQL statements to the database. Some derived interfaces accept parameters in addition to executing stored procedures.',
          ],
          [
            'ResultSet',
            'These objects hold data retrieved from a database after an SQL query is executed using Statement objects. It acts as an iterator to allow you to move through the data.',
          ],
          [
            'SQLException',
            'This class handles errors that occur in a database application.',
          ],
        ],
      },
      // 11.3 Steps in Java Database Connectivity
      {
        type: 'text',
        text:
          '11.3 Steps in Java Database Connectivity\n\n' +
          'This section of Java programming requires prerequisite knowledge of relational database systems.\n\n' +
          'There are five steps to connect any Java application with a database using JDBC. These steps are as follows:\n\n' +
          '1. Register the driver class.\n' +
          '2. Create a database connection.\n' +
          '3. Create a statement.\n' +
          '4. Execute queries.\n' +
          '5. Close the connection.',
      },
      {
        type: 'text',
        text:
          'Within the context of this manual, we are using the PostgreSQL Database application (postgresql-11.4.1) and postgresql-42.2.6.jar. Download both files and install the former. Note the username and password. Then create a database (STUDENTS_db). To set up the connection with NetBeans:\n\n' +
          'Step 1: In your NetBeans project created for the database program, click on Libraries, then click on Add JAR/Folder, and add the postgresql-42.2.6.jar file from whichever directory you have it in on your system.\n\n' +
          'Step 2: Open the tab Services > Databases > Drivers. Right-click PostgreSQL, click Connect Using..., then fill in the form and click on Test Connection. Click Finish after the notification that the connection is successful.',
      },
      // Example 1 — Steps in Java Database Connectivity
      {
        type: 'text',
        text: 'Example 1 — Steps in Java Database Connectivity',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'import java.sql.*;\n\n' +
          'public class DatabaseProgram\n' +
          '{\n' +
          '    public static void main(String ar[])\n' +
          '    {\n' +
          '        try\n' +
          '        {\n' +
          '            Connection c = DriverManager.getConnection(\n' +
          '                "jdbc:postgresql://localhost:5432/STUDENTS_db",\n' +
          '                "postgres", "HHHHHHH");\n\n' +
          '            System.out.println("Opened database successfully");\n' +
          '            Statement stmt = c.createStatement();\n\n' +
          '            // CREATE TABLE\n' +
          '            String sql = "CREATE TABLE StudentRegistration "\n' +
          '                + "(\\"RegistrationNo\\" character(12), "\n' +
          '                + "\\"FIRSTNAME\\" character(255), "\n' +
          '                + "\\"MIDDLENAME\\" character(255), "\n' +
          '                + "\\"SURNAME\\" character(255), "\n' +
          '                + "\\"Department\\" character(255))";\n\n' +
          '            stmt.executeUpdate(sql);\n' +
          '            System.out.println("Table created successfully...");\n\n' +
          '            try\n' +
          '            {\n' +
          '                if (c != null)\n' +
          '                {\n' +
          '                    c.close();\n' +
          '                }\n' +
          '            }\n' +
          '            catch (SQLException se)\n' +
          '            {\n' +
          '                se.printStackTrace();\n' +
          '            }\n' +
          '        }\n' +
          '        catch (Exception ee)\n' +
          '        {\n' +
          '            System.out.println(ee);\n' +
          '        }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code:
          'Opened database successfully\n' +
          'Table created successfully...\n' +
          'BUILD SUCCESSFUL (total time: 1 second)',
      },
      // Explanation: Create Database Connection
      {
        type: 'text',
        text:
          'Create Database Connection\n\n' +
          'In the above example, the DriverManager.getConnection() method is used to establish a connection to open or access the database in PostgreSQL based on the database URL. The URL of the database is:\n\n' +
          'jdbc:postgresql://localhost:5432/STUDENTS_db\n\n' +
          '"postgres" is the username and the password is the value supplied in the connection call.',
      },
      // Explanation: Create Statement
      {
        type: 'text',
        text:
          'Create Statement\n\n' +
          'To create a statement, we used the object of type Statement, stmt, after creating the object from:\n\n' +
          'Statement stmt = c.createStatement();\n\n' +
          'Then we formulated the SQL query to create the table StudentRegistration in the STUDENTS_db database as a string.',
      },
      // Explanation: Execute Queries
      {
        type: 'text',
        text:
          'Execute Queries\n\n' +
          'To execute the query, we used stmt.executeUpdate(sql), where stmt is the statement object and executeUpdate() is the method. The stmt.close() method is used to close the Statement after execution.',
      },
      // Explanation: Close Connection
      {
        type: 'text',
        text:
          'Close Connection\n\n' +
          'The try-catch block is used to close the database connection:',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'try\n' +
          '{\n' +
          '    if (c != null)\n' +
          '        c.close();\n' +
          '}\n' +
          'catch (SQLException se)\n' +
          '{\n' +
          '    se.printStackTrace();\n' +
          '}',
      },
      {
        type: 'text',
        text:
          'The close() method is used to clean up the environment. Cleaning up requires explicit closing of all database resources associated with the connection.',
      },
      // Example 2 — Inserting data into the table from user input
      {
        type: 'text',
        text: 'Example 2 — Inserting data into the table from user input on the screen',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'import java.sql.*;\n' +
          'import java.util.Scanner;\n\n' +
          'public class ClassInsert_db\n' +
          '{\n' +
          '    public static void main(String ar[])\n' +
          '    {\n' +
          '        Scanner getInput = new Scanner(System.in);\n' +
          '        try\n' +
          '        {\n' +
          '            Connection connect = DriverManager.getConnection(\n' +
          '                "jdbc:postgresql://localhost:5432/STUDENTS_db",\n' +
          '                "postgres", "Ambrose@1337");\n\n' +
          '            System.out.println("Opened database successfully");\n' +
          '            Statement stmt;\n\n' +
          '            System.out.print("Enter Student\'s Registration Number: ");\n' +
          '            String matNo = getInput.nextLine();\n' +
          '            System.out.print("Enter Student\'s First Name: ");\n' +
          '            String Fname = getInput.nextLine();\n' +
          '            System.out.print("Enter Student\'s Middle Name: ");\n' +
          '            String Mname = getInput.nextLine();\n' +
          '            System.out.print("Enter Student\'s Surname: ");\n' +
          '            String Lname = getInput.nextLine();\n' +
          '            System.out.print("Enter Student\'s Department: ");\n' +
          '            String dept = getInput.nextLine();\n\n' +
          '            // Insert into TABLE\n' +
          '            stmt = connect.createStatement();\n' +
          '            String sql = "INSERT INTO StudentRegistration "\n' +
          '                + "(\\"RegistrationNo\\", \\"FIRSTNAME\\", "\n' +
          '                + "\\"MIDDLENAME\\", \\"SURNAME\\", \\"Department\\") "\n' +
          '                + "VALUES (\'" + matNo + "\', \'" + Fname + "\', \'"\n' +
          '                + Mname + "\', \'" + Lname + "\', \'" + dept + "\')";\n\n' +
          '            int row = stmt.executeUpdate(sql);\n' +
          '            if (row > 0)\n' +
          '            {\n' +
          '                System.out.println("A row has been inserted successfully.");\n' +
          '            }\n\n' +
          '            stmt.close();\n' +
          '            try\n' +
          '            {\n' +
          '                if (connect != null)\n' +
          '                {\n' +
          '                    connect.close();\n' +
          '                }\n' +
          '            }\n' +
          '            catch (SQLException se)\n' +
          '            {\n' +
          '                se.printStackTrace();\n' +
          '            }\n' +
          '        }\n' +
          '        catch (Exception ee)\n' +
          '        {\n' +
          '            System.out.println(ee);\n' +
          '        }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code:
          'Opened database successfully\n' +
          'Enter Student\'s Registration Number: 21/SC/ST/172\n' +
          'Enter Student\'s First Name: Authur\n' +
          'Enter Student\'s Middle Name: Eyakitoro\n' +
          'Enter Student\'s Surname: Alexander\n' +
          'Enter Student\'s Department: Statistics\n' +
          'A row has been inserted successfully.',
      },
      // Example 3 — Reading data from the table
      {
        type: 'text',
        text: 'Example 3 — Reading data from the table',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'import java.sql.*;\n\n' +
          'public class ClassSelect_db_Test\n' +
          '{\n' +
          '    public static void main(String ar[])\n' +
          '    {\n' +
          '        String[][] Records = new String[2][5];\n' +
          '        try\n' +
          '        {\n' +
          '            Connection connect = DriverManager.getConnection(\n' +
          '                "jdbc:postgresql://localhost:5432/STUDENTS_db",\n' +
          '                "postgres", "Ambrose@1337");\n\n' +
          '            String sql = "SELECT "\n' +
          '                + "\\"RegistrationNo\\", \\"FIRSTNAME\\", \\"MIDDLENAME\\", "\n' +
          '                + "\\"SURNAME\\", \\"Department\\" From StudentRegistration";\n\n' +
          '            Statement stmt = connect.createStatement();\n' +
          '            ResultSet rs = stmt.executeQuery(sql);\n\n' +
          '            int i = 0;\n' +
          '            String[] columns = {\n' +
          '                "RegistrationNo", "FIRSTNAME", "MIDDLENAME", "SURNAME", "Department"\n' +
          '            };\n\n' +
          '            // Retrieve by column name to store in array\n' +
          '            while (rs.next())\n' +
          '            {\n' +
          '                for (int k = 0; k <= 4; k++)\n' +
          '                {\n' +
          '                    Records[i][k] = rs.getString(columns[k]);\n' +
          '                }\n' +
          '                i++;\n' +
          '            }\n\n' +
          '            stmt.close();\n' +
          '            try\n' +
          '            {\n' +
          '                if (connect != null)\n' +
          '                {\n' +
          '                    connect.close();\n' +
          '                }\n' +
          '            }\n' +
          '            catch (SQLException se)\n' +
          '            {\n' +
          '                System.out.println(se);\n' +
          '            }\n' +
          '        }\n' +
          '        catch (SQLException ee)\n' +
          '        {\n' +
          '            System.out.println(ee);\n' +
          '        }\n\n' +
          '        System.out.println(\n' +
          '            "Registration Number\\tFirst Name\\tMiddle Name\\tSurname\\t\\tDepartment");\n\n' +
          '        // Displaying data on the screen from the array\n' +
          '        for (int j = 0; j <= 1; j++)\n' +
          '        {\n' +
          '            for (int k = 0; k <= 4; k++)\n' +
          '            {\n' +
          '                System.out.print(Records[j][k] + "\\t\\t");\n' +
          '            }\n' +
          '            System.out.print("\\n");\n' +
          '        }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'text',
        text:
          'The program stores two records in a two-dimensional array with five columns, retrieves the values by column name from the ResultSet, and displays the records in tabular form with tab separators.',
      },
    ],
  },
  // ─── Topic 12 ─────────────────────────────────────────────────────────
  {
    number: '12',
    title: 'Graphical User Interfaces (GUI)',
    sections: [
      // 12.1 Introduction
      {
        type: 'text',
        text:
          'GUI, which stands for Graphical User Interface, is a user-friendly visual experience builder for Java applications. It comprises graphical units like buttons, labels, windows, and other components through which users can connect with an application. Swing and JavaFX are two commonly used applications for creating GUIs in Java. Basically, there are two sets of Java APIs for GUI programming: Abstract Windowing Toolkit (AWT) and Swing.',
      },
      {
        type: 'text',
        text:
          'This section of the manual is a beginner\'s tutorial to introduce you to the concept of GUI programming: how to create a simple graphical user interface, add simple back-end functionality, and code the behavior of buttons and fields in a Swing form. We will work through the layout and design of a GUI and add a few buttons and text fields. The text fields will be used for receiving user input and also for displaying the program output. The button will initiate the functionality built into the front end. The application we create will be a simple but functional calculator.',
      },
      {
        type: 'note',
        text:
          'For a more comprehensive guide to the GUI Builder\'s design features, including video demonstrations of the various design features, see Designing a Swing GUI in NetBeans IDE. You may also need to refer to the JDK API documentation for the AWT/Swing APIs under the java.desktop module, and the Swing Tutorial at http://docs.oracle.com/javase/tutorial/uiswing/.',
      },
      // 12.2 Exercise 1: Creating a Project
      {
        type: 'text',
        text:
          '12.2 Exercise 1: Creating a Project\n\n' +
          'The first step is to create an IDE project for the application that we are going to develop. We will name our project NumberAddition.',
      },
      {
        type: 'bullets',
        items: [
          'Choose File > New Project. Alternatively, you can click the New Project icon in the IDE toolbar.',
          'In the Categories pane, select the Java node. In the Projects pane, choose Java Application. Click Next.',
          'Type NumberAddition in the Project Name field and specify a path, for example, in your home directory, as the project location. The current directory is preferred.',
          'Deselect the Create Main Class checkbox if it is selected.',
          'Click Finish.',
        ],
      },
      // 12.3 Exercise 2: Building the Front End
      {
        type: 'text',
        text:
          '12.3 Exercise 2: Building the Front End\n\n' +
          'To proceed with building our interface, we need to create a Java container within which we will place the other required GUI components. In this step we will create a container using the JFrame. We will place the container in a new package, which will appear within the Source Packages node.',
      },
      {
        type: 'text',
        text: 'Create a JFrame container',
      },
      {
        type: 'bullets',
        items: [
          'In the Projects window, right-click the NumberAddition node and choose New > Other.',
          'In the New File dialog box, choose the Swing GUI Forms category and the JFrame Form file type. Click Next.',
          'Enter NumberAdditionUI as the class name.',
          'Enter my.numberaddition as the package.',
          'Click Finish.',
        ],
      },
      {
        type: 'text',
        text:
          'The IDE creates the NumberAdditionUI form and the NumberAdditionUI class within the NumberAddition application, and opens the NumberAdditionUI form in the GUI Builder. The my.numberaddition package replaces the default package.',
      },
      // 12.4 Adding Components: Making the Front End
      {
        type: 'text',
        text:
          '12.4 Adding Components: Making the Front End\n\n' +
          'Next we will use the Palette to populate our application\'s front end with a JPanel. Then we will add three JLabels, three JTextFields, and three JButtons.',
      },
      {
        type: 'text',
        text:
          'On the Palette, scroll to find the aforementioned components. Click and drag them one after the other to the frame. Once you are done dragging and positioning the aforementioned components, the JFrame should look something like the following layout:',
      },
      {
        type: 'code',
        language: 'output',
        code:
          '+--------------------------------+\n' +
          '| NumberAdditionUI               |\n' +
          '|                                |\n' +
          '| JLabel1     JTextField1        |\n' +
          '| JLabel2     JTextField2        |\n' +
          '| JLabel3     JTextField3        |\n' +
          '|                                |\n' +
          '| Button1     Button2    Button3 |\n' +
          '+--------------------------------+',
      },
      {
        type: 'bullets',
        items: [
          'If you do not see the Palette window in the upper right corner of the IDE, choose Window > Palette.',
          'Start by selecting a Panel from the Swing Containers category on the Palette and drop it onto the JFrame.',
          'While the JPanel is highlighted, go to the Properties window and click the ellipsis (...) button next to Border to choose a border style.',
          'In the Border dialog, select TitledBorder from the list, and type Number Addition in the Title field. Click OK to save the changes and exit the dialog.',
          'You should now see an empty titled JFrame that says Number Addition. Add three JLabels, three JTextFields, and three JButtons as shown above.',
        ],
      },
      // 12.5 Renaming the Components
      {
        type: 'text',
        text:
          '12.5 Renaming the Components\n\n' +
          'In this step we are going to rename the display text of the components that were just added to the JFrame.',
      },
      {
        type: 'bullets',
        items: [
          'Double-click jLabel1 and change the text property to First Number:.',
          'Double-click jLabel2 and change the text to Second Number:.',
          'Double-click jLabel3 and change the text to Result:.',
          'Delete the sample text from jTextField1. You can make the display text editable by right-clicking the text field and choosing Edit Text from the pop-up menu. You may have to resize jTextField1 to its original size. Repeat this step for jTextField2 and jTextField3.',
          'Rename the display text of jButton1 to Clear. You can edit a button\'s text by right-clicking the button and choosing Edit Text, or by clicking the button, pausing, and clicking again.',
          'Rename the display text of jButton2 to Add.',
          'Rename the display text of jButton3 to Exit.',
        ],
      },
      {
        type: 'text',
        text: 'Your finished GUI should now look like the following layout:',
      },
      {
        type: 'code',
        language: 'output',
        code:
          '+--------------------------------+\n' +
          '| NumberAdditionUI               |\n' +
          '|                                |\n' +
          '| First Number:   [           ]  |\n' +
          '| Second Number:  [           ]  |\n' +
          '| Result:         [           ]  |\n' +
          '|                                |\n' +
          '|                 [Clear] [Add]  |\n' +
          '|                         [Exit] |\n' +
          '+--------------------------------+',
      },
      // 12.6 Exercise 3: Adding Functionality
      {
        type: 'text',
        text:
          '12.6 Exercise 3: Adding Functionality\n\n' +
          'In this exercise we are going to give functionality to the Add, Clear, and Exit buttons. The jTextField1 and jTextField2 boxes will be used for user input, and jTextField3 for program output. What we are creating is a very simple calculator.',
      },
      // Making the Exit Button Work
      {
        type: 'text',
        text:
          'Making the Exit Button Work\n\n' +
          'In order to give function to the buttons, we have to assign an event handler to each to respond to events. In our case, we will use ActionListener responding to ActionEvent.\n\n' +
          'Right-click the Exit button. From the pop-up menu choose Events > Action > actionPerformed. Note that the menu contains many more events you can respond to. When you select the actionPerformed event, the IDE will automatically add an ActionListener to the Exit button and generate a handler method for handling the listener\'s actionPerformed method.\n\n' +
          'The IDE will open the Source Code window and scroll to where you implement the action you want the button to do when the button is pressed, either by mouse click or via the keyboard. Your Source Code window should contain the following lines:',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'private void jButton3ActionPerformed(java.awt.event.ActionEvent evt)\n' +
          '{\n' +
          '    // TODO add your handling code here:\n' +
          '}',
      },
      {
        type: 'text',
        text:
          'We are now going to add code for what we want the Exit button to do. Replace the TODO line with System.exit(0);. Your finished Exit button code should look like this:',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'private void jButton3ActionPerformed(java.awt.event.ActionEvent evt)\n' +
          '{\n' +
          '    System.exit(0);\n' +
          '}',
      },
      // Making the Clear Button Work
      {
        type: 'text',
        text:
          'Making the Clear Button Work\n\n' +
          'Click the Design tab at the top of your work area to go back to the Form Design.\n\n' +
          'Right-click the Clear button (jButton1). From the pop-up menu select Events > Action > actionPerformed.\n\n' +
          'We are going to have the Clear button erase all text from the JTextFields. To do this, add some code like the code above. Your finished source code should look like this:',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'private void jButton1ActionPerformed(java.awt.event.ActionEvent evt)\n' +
          '{\n' +
          '    jTextField1.setText("");\n' +
          '    jTextField2.setText("");\n' +
          '    jTextField3.setText("");\n' +
          '}',
      },
      {
        type: 'text',
        text:
          'The above code changes the text in all three of our JTextFields to nothing; in essence, it overwrites the existing text with a blank when the button is pressed, either by mouse click or via the keyboard.',
      },
      // Making the Add Button Work
      {
        type: 'text',
        text:
          'Making the Add Button Work\n\n' +
          'The Add button will perform three actions:\n\n' +
          '1. It is going to accept user input from jTextField1 and jTextField2 and convert the input from type String to a float.\n' +
          '2. It will then perform addition of the two numbers.\n' +
          '3. Finally, it will convert the sum to type String and place it in jTextField3.',
      },
      {
        type: 'text',
        text:
          'Click the Design tab at the top of your work area to go back to the Form Design. Right-click the Add button (jButton2). From the pop-up menu select Events > Action > actionPerformed. Add code to have the Add button work. The finished source code shall look like this:',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'private void jButton2ActionPerformed(java.awt.event.ActionEvent evt)\n' +
          '{\n' +
          '    // First we define float variables.\n' +
          '    float num1, num2, result;\n\n' +
          '    // We have to parse the text to a type float.\n' +
          '    num1 = Float.parseFloat(jTextField1.getText());\n' +
          '    num2 = Float.parseFloat(jTextField2.getText());\n\n' +
          '    // Now we can perform the addition.\n' +
          '    result = num1 + num2;\n\n' +
          '    // We will now pass the value of result to jTextField3.\n' +
          '    // At the same time, we are going to change the value of result\n' +
          '    // from a float to a string.\n' +
          '    jTextField3.setText(String.valueOf(result));\n' +
          '}',
      },
      {
        type: 'text',
        text: 'Our program is now complete. We can now build and run it to see it in action.',
      },
      // 12.6 Exercise 4: Running the Program
      {
        type: 'text',
        text:
          '12.6 Exercise 4: Running the Program\n\n' +
          'To run the program in the IDE:',
      },
      {
        type: 'bullets',
        items: [
          'Choose Run > Run Project (NumberAddition). Alternatively, press F6.',
          'If you get a window informing you that Project NumberAddition does not have a main class set, select my.NumberAddition.NumberAdditionUI as the main class in the same window and click OK.',
        ],
      },
      {
        type: 'text',
        text: 'To run the program outside of the IDE:',
      },
      {
        type: 'bullets',
        items: [
          'Choose Run > Clean and Build Main Project (Shift-F11) to build the application JAR file.',
          'Using your system\'s file explorer or file manager, navigate to the NumberAddition/dist directory.',
          'Double-click the NumberAddition.jar file. After a few seconds, the application should start. You can also launch the application from the command line.',
        ],
      },
      {
        type: 'text',
        text: 'To launch the application from the command line, open a command prompt or terminal window, change directories to the NumberAddition/dist directory, and type the following statement:',
      },
      {
        type: 'code',
        language: 'output',
        code: 'java -jar NumberAddition.jar',
      },
      {
        type: 'note',
        text:
          'Make sure my.NumberAddition.NumberAdditionUI is set as the main class before running the application. You can check this by right-clicking the NumberAddition project node in the Projects pane, choosing Properties in the pop-up menu, and selecting the Run category in the Project Properties dialog box. The Main Class field should display my.numberaddition.NumberAdditionUI.',
      },
      // 12.7 How Event Handling Works
      {
        type: 'text',
        text:
          '12.7 How Event Handling Works\n\n' +
          'This tutorial has shown how to respond to a simple button event. There are many more events your application can respond to. The IDE can help you find the list of available events your GUI components can handle:',
      },
      {
        type: 'bullets',
        items: [
          'Go back to the file NumberAdditionUI.java in the Editor. Click the Design tab to see the GUI\'s layout in the GUI Builder.',
          'Right-click any GUI component and select Events from the menu to see what is available; you do not need to select anything.',
          'Alternatively, you can select Properties from the Window menu. In the Properties window, click the Events tab. In the Events tab, you can view and edit event handlers associated with the currently active GUI component.',
          'You can have your application respond to key presses; single, double, and triple mouse clicks; mouse motion; window size; and focus changes. You can generate event handlers for all of them from the Events menu. The most common event you will use is an Action event.',
        ],
      },
      {
        type: 'text',
        text:
          'How does event handling work?\n\n' +
          'Every time you select an event from the Event menu, the IDE automatically creates a so-called event listener for you and hooks it up to your component. Go through the following steps to see how event handling works:',
      },
      {
        type: 'bullets',
        items: [
          'Go back to the file NumberAdditionUI.java in the Editor. Click the Source tab to see the GUI\'s source.',
          'Scroll down and note the methods jButton1ActionPerformed(), jButton2ActionPerformed(), and jButton3ActionPerformed() that you just implemented. These methods are called event handlers.',
          'Now scroll to a method called initComponents(). If you do not see this method, look for a line that says Generated Code; click the plus sign next to it to expand the collapsed initComponents() method.',
          'First, note the blue block around the initComponents() method. This code was auto-generated by the IDE and you cannot edit it.',
          'Browse through the initComponents() method. Among other things, it contains the code that initializes and places your GUI components on the form. This code is generated and updated automatically while you place and edit components in the Design view.',
        ],
      },
      {
        type: 'text',
        text: 'In initComponents(), scroll down to where it reads:',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'jButton3.setText("Exit");\n' +
          'jButton3.addActionListener(new java.awt.event.ActionListener()\n' +
          '{\n' +
          '    public void actionPerformed(java.awt.event.ActionEvent evt)\n' +
          '    {\n' +
          '        jButton3ActionPerformed(evt);\n' +
          '    }\n' +
          '});',
      },
      {
        type: 'text',
        text:
          'This is the spot where an event-listener object is added to the GUI component. In this case, you register an ActionListener to jButton3. The ActionListener interface has an actionPerformed method taking an ActionEvent object, which is implemented simply by calling your jButton3ActionPerformed event handler. The button is now listening to action events. Every time it is pressed, an ActionEvent is generated and passed to the listener\'s actionPerformed method, which in turn executes the code that you provided in the event handler for this event.',
      },
      {
        type: 'text',
        text:
          'Generally speaking, to respond, each interactive GUI component needs to register to an event listener and needs to implement an event handler. As you can see, NetBeans IDE handles hooking up the event listener for you, so you can concentrate on implementing the actual business logic that should be triggered by the event.',
      },
      // Laboratory Work 8
      {
        type: 'text',
        text:
          'Laboratory Work 8: JDBC and GUI Implementation\n\n' +
          'Implement the concept of JDBC and GUI to develop a desktop application in any domain of your choice.',
      },
    ],
  },
  // ─── Topic 13 ─────────────────────────────────────────────────────────
  {
    number: '13',
    title: 'Java String API',
    sections: [
      // Introduction
      {
        type: 'text',
        text:
          'A Java string is a sequence of characters. Strings are objects in Java, and the String class provides methods for creating, comparing, searching, splitting, and modifying strings. A string is immutable, which means that once a String object is created, its value cannot be changed. String methods return a new string or a result rather than changing the original String object.',
      },
      // 13.2 Java String Methods
      {
        type: 'text',
        text:
          '13.2 Java String Methods\n\n' +
          'Given below are the String methods that are used extensively in the Java programming language for manipulating Strings.',
      },
      // length()
      {
        type: 'text',
        text:
          'length()\n\n' +
          'The length is the number of characters that a given string contains. Java has a length() method that gives the number of characters in a String.',
      },
      {
        type: 'text',
        text: 'Example 1',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String str = "Saket Saurav";\n' +
          '        System.out.println(str.length());\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: '12',
      },
      // Concatenation
      {
        type: 'text',
        text:
          'Concatenation\n\n' +
          'Although Java uses the + operator for concatenating two or more strings, concat() is an inbuilt method for String concatenation in Java. Concatenation means joining different strings together.',
      },
      {
        type: 'text',
        text: 'Example 2',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String str1 = "Java";\n' +
          '        String str2 = "Programming";\n' +
          '        System.out.println(str1 + str2);\n' +
          '        System.out.println(str1.concat(str2));\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'JavaProgramming\nJavaProgramming',
      },
      // toCharArray()
      {
        type: 'text',
        text:
          'toCharArray()\n\n' +
          'This method is used to convert all the characters of a string into a character array. This is widely used in String-manipulation programs.',
      },
      {
        type: 'text',
        text: 'Example 3',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String str = "Program";\n' +
          '        char[] chars = str.toCharArray();\n' +
          '        System.out.println(chars);\n' +
          '        for (int i = 0; i < chars.length; i++)\n' +
          '        {\n' +
          '            System.out.println(chars[i]);\n' +
          '        }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'Program\nP\nr\no\ng\nr\na\nm',
      },
      // charAt()
      {
        type: 'text',
        text:
          'charAt()\n\n' +
          'This method is used to retrieve a single character from a given String. The syntax is:\n\n' +
          'char charAt(int i);\n\n' +
          'The value of i should not be negative and it should specify the location of a given String. If a String\'s length is 5, then the value of i should be less than 5.',
      },
      {
        type: 'text',
        text: 'Example 4',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String str = "java string API";\n' +
          '        System.out.println(str.charAt(0));\n' +
          '        System.out.println(str.charAt(1));\n' +
          '        System.out.println(str.charAt(2));\n' +
          '        System.out.println(str.charAt(3));\n' +
          '        System.out.println(str.charAt(6));\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'j\na\nv\na\nt',
      },
      // compareTo(), equalsIgnoreCase(), and equals()
      {
        type: 'text',
        text:
          'compareTo(), equalsIgnoreCase(), and equals()\n\n' +
          'These methods are used to compare two Strings. The comparison is based on alphabetical order. In general terms, a String is less than another if it comes before the other in the dictionary. compareTo() returns the difference in position between two characters in a string. The equals() method returns a Boolean value, either true or false, after comparison, and it is case-sensitive. The equalsIgnoreCase() method is not case-sensitive.',
      },
      {
        type: 'text',
        text: 'Example 5',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String str1Val = "Java Methods";\n' +
          '        String str2Val = "MATLAB Functions";\n' +
          '        String str3Val = "Programming";\n' +
          '        String str4Val = "Computer and Mathematics";\n\n' +
          '        System.out.println(str1Val.compareTo(str2Val));\n' +
          '        System.out.println(str3Val.compareTo(str4Val));\n' +
          '        System.out.println(str3Val.equals(str4Val));\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: '-3\n13\nfalse',
      },
      {
        type: 'text',
        text:
          'In the example above, M in str2Val comes 3 positions after J in str1Val, so it gives -3. Similarly, C comes 13 positions before P, so it gives 13. But equals() returned false since str3Val is not equal to str4Val.',
      },
      // contains()
      {
        type: 'text',
        text:
          'contains()\n\n' +
          'This method is used to determine whether a substring is a part of the main String or not. The return type is Boolean. In the example below, we will check whether "gram" or "code" is part of "Programdebugging" or not.',
      },
      {
        type: 'text',
        text: 'Example 6',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String str = "Programdebugging";\n' +
          '        String valStr1 = "gram";\n' +
          '        String valStr2 = "code";\n\n' +
          '        System.out.println("Is \\"gram\\" in " + str + ": " + str.contains(valStr1));\n' +
          '        System.out.println("Is \\"code\\" in " + str + ": " + str.contains(valStr2));\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code:
          'Is "gram" in Programdebugging: true\n' +
          'Is "code" in Programdebugging: false',
      },
      // split()
      {
        type: 'text',
        text:
          'split()\n\n' +
          'As the name suggests, a split() method is used to split or separate the given String into multiple substrings separated by delimiters (;, a space, \\\\, and so on) or a given string. In the example below, we will split the String "Java;is;used;for;object-oriented;programming" using the delimiter ; already present in the main String.',
      },
      {
        type: 'text',
        text: 'Example 7',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String strSplit = "Java;is;used;for;object-oriented;programming";\n' +
          '        String[] split = strSplit.split(";");\n' +
          '        for (String obj : split)\n' +
          '        {\n' +
          '            System.out.println(obj);\n' +
          '        }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'Java\nis\nused\nfor\nobject-oriented\nprogramming',
      },
      // indexOf()
      {
        type: 'text',
        text:
          'indexOf()\n\n' +
          'This method is used to perform a search operation for a specific character or a substring in the main String. There is one more method known as lastIndexOf(), which is also commonly used. indexOf() is used to search for the first occurrence of a character. lastIndexOf() is used to search for the last occurrence of a character.',
      },
      {
        type: 'text',
        text: 'Example 8',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String strIndex = "Java is used for object-oriented Programming";\n' +
          '        System.out.println("index of \'p\' is " + strIndex.indexOf(\'p\'));\n' +
          '        System.out.println("index of \'u\' is " + strIndex.indexOf(\'u\'));\n' +
          '        System.out.println("last index of \'a\' is " + strIndex.lastIndexOf(\'a\'));\n' +
          '        System.out.println("last index of \'g\' is " + strIndex.lastIndexOf(\'g\'));\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code:
          "index of 'p' is 33\n" +
          "index of 'u' is 8\n" +
          "last index of 'a' is 38\n" +
          "last index of 'g' is 9",
      },
      // reverse()
      {
        type: 'text',
        text:
          'reverse()\n\n' +
          'The StringBuffer reverse() method is used to reverse the input characters of the String.',
      },
      {
        type: 'text',
        text: 'Example 9',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String strRev = "gnimmargorP detneiro-tcejbo";\n' +
          '        StringBuffer sb = new StringBuffer(strRev);\n' +
          '        sb.reverse();\n' +
          '        System.out.println(sb);\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'Object-oriented Programming',
      },
      // replace()
      {
        type: 'text',
        text:
          'replace()\n\n' +
          'The replace() method is used to replace a character with new characters in a String.',
      },
      {
        type: 'text',
        text: 'Example 10',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String strRep = "Java";\n' +
          '        String replace = strRep.replace(\'J\', \'L\');\n' +
          '        System.out.println(strRep);\n' +
          '        System.out.println(replace);\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'Java\nLava',
      },
      // substring()
      {
        type: 'text',
        text:
          'substring() Method\n\n' +
          'The substring() method is used to return the substring of the main String by specifying the starting index and the last index of the substring. For example, in the given String "Programdebugging", we will try to fetch the substring by specifying the starting index and the last index.',
      },
      {
        type: 'text',
        text: 'Example 11',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String strSub = "Programdebugging";\n' +
          '        System.out.println(strSub.substring(7, 12));\n' +
          '        System.out.println(strSub.substring(3, 7));\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code: 'debug\ngram',
      },
      // toLowerCase() and toUpperCase()
      {
        type: 'text',
        text:
          'toLowerCase() and toUpperCase()\n\n' +
          'The toLowerCase() method converts alphabets to lower case, while the toUpperCase() method converts alphabets to upper case.',
      },
      {
        type: 'text',
        text: 'Example 12',
      },
      {
        type: 'code',
        language: 'java',
        code:
          'public class StringMethods\n' +
          '{\n' +
          '    public static void main(String[] args)\n' +
          '    {\n' +
          '        String strU_to_L = "HELLO HOW Are You TODAY?";\n' +
          '        System.out.println(strU_to_L);\n' +
          '        System.out.println(strU_to_L.toLowerCase());\n' +
          '        System.out.println(strU_to_L.toUpperCase());\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'code',
        language: 'output',
        code:
          'HELLO HOW Are You TODAY?\n' +
          'hello how are you today?\n' +
          'HELLO HOW ARE YOU TODAY?',
      },
    ],
  },
];


