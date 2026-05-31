import CodeBlock from '../components/CodeBlock';

export default function Cheatsheet() {
  const sections = [
    {
      title: 'Variables & Types',
      code: `int age = 21;
double gpa = 4.85;
String name = "Josebert";
boolean isActive = true;
char grade = 'A';
final int MAX = 100;  // constant`,
    },
    {
      title: 'Input & Output',
      code: `import java.util.Scanner;
Scanner sc = new Scanner(System.in);

String text = sc.nextLine();   // read text
int num = sc.nextInt();        // read int
double d = sc.nextDouble();    // read decimal

System.out.println("New line");
System.out.print("Same line");`,
    },
    {
      title: 'Conditions',
      code: `if (x > 10) {
    // ...
} else if (x > 5) {
    // ...
} else {
    // ...
}

// Ternary shortcut
String result = (score >= 50) ? "Pass" : "Fail";`,
    },
    {
      title: 'Loops',
      code: `for (int i = 0; i < 10; i++) { }

while (condition) { }

do { } while (condition);

for (String item : list) { }  // for-each`,
    },
    {
      title: 'Arrays',
      code: `int[] nums = new int[5];
int[] vals = {1, 2, 3, 4, 5};
int[][] grid = {{1, 2}, {3, 4}};

nums.length;     // size
nums[0] = 10;    // assign
vals[2];         // access`,
    },
    {
      title: 'Methods',
      code: `public static int add(int a, int b) {
    return a + b;
}

public static void greet(String name) {
    System.out.println("Hi " + name);
}`,
    },
    {
      title: 'Classes & Objects',
      code: `public class Student {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

Student s = new Student("Amaka");`,
    },
    {
      title: 'Inheritance',
      code: `class Animal {
    void eat() { }
}

class Dog extends Animal {
    @Override
    void eat() { }  // override
}`,
    },
    {
      title: 'Exceptions',
      code: `try {
    riskyOperation();
} catch (Exception e) {
    System.out.println(e.getMessage());
} finally {
    cleanup();
}`,
    },
    {
      title: 'Collections',
      code: `import java.util.*;

ArrayList<String> list = new ArrayList<>();
list.add("x"); list.get(0); list.size();

HashMap<String, Integer> map = new HashMap<>();
map.put("key", 1); map.get("key");

HashSet<String> set = new HashSet<>();
set.add("unique");`,
    },
    {
      title: 'Strings',
      code: `String s = "Hello";
s.length();
s.toUpperCase();
s.substring(1, 3);
s.indexOf("l");
s.replace("l", "L");
s.split(",");
s.equals(other);   // compare content (NOT ==)`,
    },
    {
      title: 'Common Gotchas',
      code: `// Compare strings with .equals(), NOT ==
a.equals(b)   // correct
a == b        // wrong for strings

// Arrays start at 0
arr[0]        // first element
arr[arr.length - 1]  // last element

// Integer division
5 / 2         // = 2 (not 2.5!)
5.0 / 2       // = 2.5`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Quick reference</div>
        <h1 className="display-heading text-5xl text-ink mb-3">Java Cheatsheet</h1>
        <p className="text-lg text-coffee-700">
          The syntax you'll reach for most often. Bookmark this page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-paper border border-coffee-200 rounded-xl p-5">
            <h3 className="font-display font-bold text-ink mb-2">{s.title}</h3>
            <CodeBlock code={s.code} showLineNumbers={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
