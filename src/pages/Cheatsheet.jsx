import { useState } from 'react';
import CodeBlock from '../components/CodeBlock';
import Diagram from '../components/Diagram';

const javaSections = [
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
    diagram: 'c-array',
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
    diagram: 'java-class',
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
    diagram: 'java-inheritance',
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

const pythonSections = [
  {
    title: 'Variables & Types',
    code: `name = "Josebert"     # str
age = 21              # int
gpa = 4.85            # float
is_active = True      # bool
nothing = None        # NoneType
MAX = 100             # convention: ALL_CAPS = constant

type(age)             # <class 'int'>`,
  },
  {
    title: 'Input & Output',
    code: `# print
print("Hello")
print("a", "b", sep="-")     # a-b
print("no newline", end="")

# input always returns a string
name = input("Your name? ")
age = int(input("Age? "))
gpa = float(input("GPA? "))

# f-strings
print(f"{name} is {age}, GPA {gpa:.2f}")`,
  },
  {
    title: 'Conditions',
    diagram: 'py-indentation',
    code: `if x > 10:
    print("big")
elif x > 5:
    print("medium")
else:
    print("small")

# Ternary
result = "Pass" if score >= 50 else "Fail"

# Truthy/Falsy: 0, "", [], {}, None are False`,
  },
  {
    title: 'Loops',
    code: `for i in range(10):          # 0..9
    print(i)

for i in range(2, 10, 2):    # 2,4,6,8
    print(i)

for item in [1, 2, 3]:
    print(item)

for i, item in enumerate(lst):
    print(i, item)

while condition:
    ...

break       # exit loop
continue    # skip to next iter`,
  },
  {
    title: 'Lists, Tuples, Sets, Dicts',
    diagram: 'py-list',
    diagram2: 'py-dict',
    code: `nums = [1, 2, 3]            # list (mutable)
nums.append(4); nums[0]; len(nums)
nums[-1]                    # last element
nums[1:3]                   # slice

point = (10, 20)            # tuple (immutable)

unique = {1, 2, 3}          # set
unique.add(4)

person = {"name": "A", "age": 21}   # dict
person["name"]
person.get("age", 0)        # default if missing
person.keys(); person.values(); person.items()`,
  },
  {
    title: 'Functions',
    code: `def add(a, b):
    return a + b

def greet(name="friend"):    # default arg
    print(f"Hi {name}")

def stats(*nums):            # variadic
    return sum(nums), len(nums)

def make_user(**kwargs):     # keyword args
    return kwargs

# Lambda (anonymous)
square = lambda x: x * x`,
  },
  {
    title: 'Classes & Objects',
    code: `class Student:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa

    def greet(self):
        return f"Hi, I'm {self.name}"

s = Student("Amaka", 4.7)
print(s.greet())

# Inheritance
class GradStudent(Student):
    def __init__(self, name, gpa, thesis):
        super().__init__(name, gpa)
        self.thesis = thesis`,
  },
  {
    title: 'Exceptions',
    code: `try:
    risky()
except ValueError as e:
    print("bad value:", e)
except (TypeError, KeyError):
    print("type or key error")
except Exception as e:
    print("anything else:", e)
else:
    print("no error happened")
finally:
    cleanup()

raise ValueError("boom")`,
  },
  {
    title: 'Files',
    code: `# Read
with open("notes.txt", "r") as f:
    text = f.read()
    # or: lines = f.readlines()

# Write
with open("out.txt", "w") as f:
    f.write("hello\\n")

# Append
with open("log.txt", "a") as f:
    f.write("new line\\n")`,
  },
  {
    title: 'Strings',
    code: `s = "Hello, World"
len(s)
s.upper(); s.lower()
s.strip()                 # trim whitespace
s.replace("World", "Py")
s.split(",")              # ['Hello', ' World']
",".join(["a", "b"])      # 'a,b'
s.startswith("He"); s.endswith("ld")
s[0]; s[-1]; s[0:5]       # index & slice
"42".isdigit()`,
  },
  {
    title: 'Comprehensions',
    code: `# list comprehension
squares = [x * x for x in range(10)]
evens = [x for x in nums if x % 2 == 0]

# dict comprehension
sq_map = {x: x*x for x in range(5)}

# set comprehension
unique_lens = {len(w) for w in words}`,
  },
  {
    title: 'Jupyter Tips',
    code: `# Run cell:     Shift + Enter
# Run & insert: Alt + Enter
# Add cell:     B (below), A (above)
# Markdown:     M    Code: Y
# Delete cell:  D, D

# Last expression prints automatically:
2 + 2          # shows 4

# Shell command:
!pip install pandas

# Magic commands:
%timeit sum(range(1000))
%matplotlib inline`,
  },
  {
    title: 'Common Gotchas',
    code: `# Indentation matters — use 4 spaces
# Mixing tabs and spaces = IndentationError

# input() returns a string
n = input("n? ")          # n is "5", not 5
n = int(n)                # convert!

# Integer vs float division
7 / 2         # 3.5  (true division)
7 // 2        # 3    (floor division)

# == vs is
a == b        # equal value
a is b        # same object in memory

# Mutable default args — DON'T:
def bad(x, items=[]):  ...   # shared!
def good(x, items=None):
    items = items or []`,
  },
];

const cSections = [
  {
    title: 'Variables & Types',
    code: `int age = 21;
float gpa = 4.85f;
double pi = 3.14159;
char grade = 'A';
char name[] = "Josebert";   // string = array of char
const int MAX = 100;        // constant
unsigned int u = 50;        // no negatives`,
  },
  {
    title: 'Input & Output',
    code: `#include <stdio.h>

printf("Hello %s, age %d\\n", name, age);
printf("GPA: %.2f\\n", gpa);

int n;
scanf("%d", &n);            // note the &

char buf[100];
scanf("%99s", buf);         // single word
fgets(buf, 100, stdin);     // whole line (safer)

// Format specifiers:
// %d int   %f float   %lf double
// %c char  %s string  %p pointer  %x hex`,
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

// Ternary
int result = (score >= 50) ? 1 : 0;

// Switch
switch (choice) {
    case 1: /* ... */ break;
    case 2: /* ... */ break;
    default: /* ... */
}`,
  },
  {
    title: 'Loops',
    code: `for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}

while (condition) { /* ... */ }

do {
    /* ... */
} while (condition);

break;       // exit loop
continue;    // next iteration`,
  },
  {
    title: 'Arrays & Strings',
    diagram: 'c-array',
    code: `int nums[5] = {1, 2, 3, 4, 5};
int size = sizeof(nums) / sizeof(nums[0]);

int grid[2][3] = {{1,2,3}, {4,5,6}};

// Strings are char arrays terminated by '\\0'
char s[] = "Hello";
#include <string.h>
strlen(s);             // length (excludes \\0)
strcpy(dest, src);     // copy
strcat(dest, src);     // concatenate
strcmp(a, b);          // 0 if equal`,
  },
  {
    title: 'Functions',
    code: `// Declaration (prototype)
int add(int a, int b);

// Definition
int add(int a, int b) {
    return a + b;
}

void greet(const char *name) {
    printf("Hi %s\\n", name);
}

// Pass array — really passes a pointer
void printArr(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
}`,
  },
  {
    title: 'Pointers',
    diagram: 'c-pointer',
    code: `int x = 10;
int *p = &x;          // p points to x

printf("%d", *p);     // 10  (dereference)
*p = 20;              // changes x to 20

// Pointer + array
int arr[] = {1, 2, 3};
int *ap = arr;        // arr decays to pointer
printf("%d", *(ap+1));  // 2
printf("%d", ap[1]);    // 2  (same thing)

// NULL pointer
int *np = NULL;
if (np != NULL) { /* safe to use */ }`,
  },
  {
    title: 'Structs',
    diagram: 'c-struct',
    code: `struct Student {
    char name[50];
    int age;
    float gpa;
};

struct Student s1 = {"Amaka", 20, 4.7f};
printf("%s\\n", s1.name);

// Pointer to struct
struct Student *ps = &s1;
printf("%d", ps->age);   // -> dereferences

// typedef shortcut
typedef struct {
    int x, y;
} Point;
Point p = {3, 4};`,
  },
  {
    title: 'Dynamic Memory',
    diagram: 'c-stack-heap',
    code: `#include <stdlib.h>

// Allocate
int *arr = malloc(10 * sizeof(int));
if (arr == NULL) { /* allocation failed */ }

// Use
for (int i = 0; i < 10; i++) arr[i] = i;

// Resize
arr = realloc(arr, 20 * sizeof(int));

// Zero-initialized
int *z = calloc(10, sizeof(int));

// ALWAYS free what you malloc
free(arr);
arr = NULL;   // avoid dangling pointer`,
  },
  {
    title: 'File I/O',
    code: `FILE *fp = fopen("data.txt", "r");
if (fp == NULL) {
    perror("open failed");
    return 1;
}

char line[256];
while (fgets(line, sizeof(line), fp)) {
    printf("%s", line);
}
fclose(fp);

// Write
FILE *out = fopen("out.txt", "w");
fprintf(out, "score: %d\\n", 95);
fclose(out);

// Modes: "r" read, "w" write (truncate),
//        "a" append, "rb"/"wb" binary`,
  },
  {
    title: 'Preprocessor',
    code: `#include <stdio.h>          // system header
#include "myheader.h"        // local header

#define PI 3.14159
#define SQUARE(x) ((x) * (x))   // parens!
#define MAX(a, b) ((a) > (b) ? (a) : (b))

#ifdef DEBUG
    printf("debugging\\n");
#endif

// Header guard
#ifndef MYHEADER_H
#define MYHEADER_H
// ... declarations ...
#endif`,
  },
  {
    title: 'Compile & Run (GCC)',
    code: `# Compile a single file
gcc hello.c -o hello

# Run it
./hello              # Linux/macOS
hello.exe            # Windows

# Multiple files
gcc main.c utils.c -o app

# Useful flags
gcc -Wall -Wextra -g hello.c -o hello
#     ^all warnings  ^debug info

# Link math library
gcc prog.c -o prog -lm`,
  },
  {
    title: 'Common Gotchas',
    code: `// scanf needs & for non-arrays
scanf("%d", &x);      // correct
scanf("%d", x);       // WRONG (crash)

// Array indices start at 0
arr[0]                // first
arr[n - 1]            // last (with size n)

// = vs ==
if (x = 5)            // ASSIGNS — always true!
if (x == 5)           // compares

// Strings end with '\\0'
char s[] = "Hi";      // length 3, not 2

// Always free what you malloc
free(p); p = NULL;

// Don't return pointer to local var
char *bad() {
    char buf[10] = "hi";
    return buf;       // dangling!
}`,
  },
];

const tracks = [
  { key: 'java', label: 'Java', sections: javaSections, accent: 'bg-ink text-cream' },
  { key: 'python', label: 'Python', sections: pythonSections, accent: 'bg-moss text-cream' },
  { key: 'c', label: 'C', sections: cSections, accent: 'bg-ember-500 text-cream' },
];

export default function Cheatsheet() {
  const [active, setActive] = useState('java');
  const current = tracks.find(t => t.key === active);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-coffee-700 mb-3">Quick reference</div>
        <h1 className="display-heading text-5xl text-ink mb-3">Cheatsheets</h1>
        <p className="text-lg text-coffee-700">
          The syntax you'll reach for most often. Bookmark this page.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Choose a language"
        className="inline-flex flex-wrap gap-1 bg-coffee-100 border border-coffee-200 rounded-xl p-1 mb-8"
      >
        {tracks.map(t => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? t.accent : 'text-ink hover:bg-paper'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {current.sections.map((s, i) => (
          <div key={i} className="bg-paper border border-coffee-200 rounded-xl p-5">
            <h3 className="font-display font-bold text-ink mb-2">{s.title}</h3>
            <CodeBlock code={s.code} showLineNumbers={false} />
            {s.diagram && <Diagram name={s.diagram} />}
            {s.diagram2 && <Diagram name={s.diagram2} />}
          </div>
        ))}
      </div>
    </div>
  );
}
