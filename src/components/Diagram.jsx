// Inline SVG concept diagrams. Looked up by name from `mod.theory[i].diagram`
// or imported directly into Cheatsheet sections / module bodies.
//
// Style notes: every diagram uses currentColor for strokes/text so it picks up
// the surrounding text color, and Tailwind tokens (ink, coffee, ember, moss)
// via inline CSS vars defined in index.css.

// Resolve to the same CSS variables as the Tailwind palette (defined in
// index.css) so diagrams re-theme with the rest of the app under `.dark`.
// SVG fill/stroke presentation attributes accept CSS custom properties.
const palette = {
  ink: 'rgb(var(--ink))',
  paper: 'rgb(var(--paper))',
  cream: 'rgb(var(--cream))',
  coffeeDark: 'rgb(var(--coffee-700))',
  coffee: 'rgb(var(--coffee-500))',
  coffeeLight: 'rgb(var(--coffee-200))',
  ember: 'rgb(var(--ember-500))',
  moss: 'rgb(var(--moss))',
  rust: 'rgb(var(--rust))',
};

function Frame({ title, caption, children, height = 220 }) {
  return (
    <figure className="bg-cream/60 border border-coffee-200 rounded-xl p-4 my-3">
      {title && (
        <figcaption className="text-xs font-mono uppercase tracking-wider text-coffee-700 mb-2">
          {title}
        </figcaption>
      )}
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 480 ${height}`} role="img" className="w-full h-auto" style={{ maxHeight: height * 1.4 }}>
          {children}
        </svg>
      </div>
      {caption && <p className="text-xs text-coffee-700 mt-2 leading-relaxed">{caption}</p>}
    </figure>
  );
}

function Cell({ x, y, w = 50, h = 36, value, label, fill = palette.paper, stroke = palette.coffeeDark }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1.5" rx="3" />
      {value !== undefined && (
        <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fill={palette.ink}>
          {value}
        </text>
      )}
      {label !== undefined && (
        <text x={x + w / 2} y={y + h + 14} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>
          {label}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = palette.ember, dashed = false }) {
  const id = `arrow-${x1}-${y1}-${x2}-${y2}`.replace(/\./g, '_');
  return (
    <g>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill={color} />
        </marker>
      </defs>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="2"
        strokeDasharray={dashed ? '4 4' : undefined}
        markerEnd={`url(#${id})`}
      />
    </g>
  );
}

// ---------- diagrams ----------

function CPointerDiagram() {
  return (
    <Frame title="C pointers" caption="`p` stores the address of `x`. Writing `*p = 20` changes the value at that address — so `x` becomes 20.">
      <text x="40" y="40" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={palette.ink}>int x = 10;</text>
      <text x="40" y="60" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={palette.ink}>int *p = &x;</text>

      <Cell x={70} y={120} value="0x7ff0" label="p" fill={palette.cream} />
      <Cell x={300} y={120} value="10" label="x  @ 0x7ff0" />

      <Arrow x1={125} y1={138} x2={300} y2={138} />

      <text x="180" y="180" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>
        *p   → 10     (read x via p)
      </text>
      <text x="180" y="198" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>
        *p = 20   (write to x via p)
      </text>
    </Frame>
  );
}

function CArrayDiagram() {
  return (
    <Frame title="Arrays in memory" caption="An array is a contiguous block of cells. `arr[0]` is the first; indices count up from zero.">
      <text x="40" y="36" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={palette.ink}>int arr[5] = {`{10, 20, 30, 40, 50}`};</text>
      {[10, 20, 30, 40, 50].map((v, i) => (
        <Cell key={i} x={50 + i * 76} y={80} w={70} h={42} value={v} label={`arr[${i}]`} />
      ))}
      <text x="240" y="170" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>
        memory addresses grow →
      </text>
    </Frame>
  );
}

function CStackHeapDiagram() {
  return (
    <Frame
      title="Stack vs heap"
      height={260}
      caption="Stack memory is automatic (locals). Heap memory needs `malloc` — and you MUST `free` it when done."
    >
      <rect x="30" y="30" width="180" height="200" fill={palette.paper} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="120" y="50" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="14" fontWeight="bold" fill={palette.ink}>Stack</text>
      <text x="120" y="68" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffee}>auto · fast · LIFO</text>

      <Cell x={50} y={88} w={140} h={30} value="int x = 10" />
      <Cell x={50} y={128} w={140} h={30} value="int arr[100]" />
      <Cell x={50} y={168} w={140} h={30} value="int *p = ..." />

      <rect x="270" y="30" width="180" height="200" fill={palette.paper} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="360" y="50" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="14" fontWeight="bold" fill={palette.ink}>Heap</text>
      <text x="360" y="68" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffee}>malloc · manual · free()</text>

      <Cell x={290} y={88} w={140} h={70} value="malloc(40)" fill={palette.cream} />
      <text x="360" y="178" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffeeDark}>
        forget free() = leak
      </text>

      <Arrow x1={190} y1={183} x2={290} y2={123} />
    </Frame>
  );
}

function CStructDiagram() {
  return (
    <Frame title="Structs" caption="A struct packs related fields into one named record. Access fields with `.` (value) or `->` (pointer).">
      <text x="40" y="36" fontFamily="JetBrains Mono, monospace" fontSize="12" fill={palette.ink}>
        struct Student s = {`{ "Amaka", 20, 4.7 }`};
      </text>
      <rect x="60" y="70" width="360" height="120" fill={palette.paper} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="240" y="92" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="13" fontWeight="bold" fill={palette.ink}>struct Student</text>
      <Cell x={80} y={108} w={100} h={36} value='"Amaka"' label="name" />
      <Cell x={200} y={108} w={80} h={36} value="20" label="age" />
      <Cell x={300} y={108} w={100} h={36} value="4.7" label="gpa" />
    </Frame>
  );
}

function JavaClassDiagram() {
  return (
    <Frame title="Classes and objects" caption="A class is a blueprint. Each `new` call creates a separate object with its own field values.">
      <rect x="160" y="20" width="160" height="80" fill={palette.cream} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="240" y="40" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="14" fontWeight="bold" fill={palette.ink}>class Student</text>
      <line x1="170" y1="50" x2="310" y2="50" stroke={palette.coffeeDark} strokeWidth="1" />
      <text x="180" y="68" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>String name</text>
      <text x="180" y="86" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>double gpa</text>

      <Cell x={40} y={140} w={140} h={64} fill={palette.paper} />
      <text x="110" y="158" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.ink}>name = "Amaka"</text>
      <text x="110" y="176" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.ink}>gpa  = 4.7</text>
      <text x="110" y="194" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffeeDark}>object #1</text>

      <Cell x={300} y={140} w={140} h={64} fill={palette.paper} />
      <text x="370" y="158" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.ink}>name = "Tunde"</text>
      <text x="370" y="176" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.ink}>gpa  = 4.2</text>
      <text x="370" y="194" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffeeDark}>object #2</text>

      <Arrow x1={200} y1={104} x2={130} y2={136} dashed color={palette.coffee} />
      <Arrow x1={280} y1={104} x2={350} y2={136} dashed color={palette.coffee} />
    </Frame>
  );
}

function JavaInheritanceDiagram() {
  return (
    <Frame title="Inheritance" caption="A subclass inherits everything the superclass has and can add or override methods.">
      <rect x="180" y="20" width="120" height="56" fill={palette.cream} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="240" y="40" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="13" fontWeight="bold" fill={palette.ink}>Animal</text>
      <text x="240" y="60" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>+ eat()</text>

      <rect x="60" y="140" width="120" height="56" fill={palette.paper} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="120" y="160" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="13" fontWeight="bold" fill={palette.ink}>Dog</text>
      <text x="120" y="180" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>+ bark()</text>

      <rect x="300" y="140" width="120" height="56" fill={palette.paper} stroke={palette.coffeeDark} strokeWidth="1.5" rx="6" />
      <text x="360" y="160" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="13" fontWeight="bold" fill={palette.ink}>Cat</text>
      <text x="360" y="180" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.coffeeDark}>+ meow()</text>

      <Arrow x1={120} y1={138} x2={220} y2={78} color={palette.coffee} />
      <Arrow x1={360} y1={138} x2={260} y2={78} color={palette.coffee} />
    </Frame>
  );
}

function PythonListDiagram() {
  return (
    <Frame title="Lists are indexed from 0" caption="Negative indexes count from the end: `nums[-1]` is the last item. Slices use `start:stop` (stop is exclusive).">
      <text x="40" y="32" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={palette.ink}>nums = [10, 20, 30, 40, 50]</text>
      {[10, 20, 30, 40, 50].map((v, i) => (
        <Cell key={i} x={50 + i * 76} y={70} w={70} h={42} value={v} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <text key={`i${i}`} x={85 + i * 76} y={128} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.moss}>
          {i}
        </text>
      ))}
      {[-5, -4, -3, -2, -1].map((i, idx) => (
        <text key={`n${i}`} x={85 + idx * 76} y={145} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill={palette.ember}>
          {i}
        </text>
      ))}
      <text x="48" y="128" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.moss}>idx →</text>
      <text x="48" y="145" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.ember}>neg →</text>
    </Frame>
  );
}

function PythonDictDiagram() {
  return (
    <Frame title="Dictionaries: key → value" caption="Dicts map a key (usually a string) to a value. `d['name']` looks up by key.">
      <text x="40" y="32" fontFamily="JetBrains Mono, monospace" fontSize="13" fill={palette.ink}>
        person = {`{"name": "Amaka", "age": 20, "gpa": 4.7}`}
      </text>
      <g>
        <Cell x={60} y={70} w={120} h={36} value='"name"' fill={palette.cream} />
        <Cell x={280} y={70} w={140} h={36} value='"Amaka"' />
        <Arrow x1={180} y1={88} x2={280} y2={88} />
      </g>
      <g>
        <Cell x={60} y={120} w={120} h={36} value='"age"' fill={palette.cream} />
        <Cell x={280} y={120} w={140} h={36} value="20" />
        <Arrow x1={180} y1={138} x2={280} y2={138} />
      </g>
      <g>
        <Cell x={60} y={170} w={120} h={36} value='"gpa"' fill={palette.cream} />
        <Cell x={280} y={170} w={140} h={36} value="4.7" />
        <Arrow x1={180} y1={188} x2={280} y2={188} />
      </g>
      <text x="120" y="62" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffee}>keys</text>
      <text x="350" y="62" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.coffee}>values</text>
    </Frame>
  );
}

function PythonIndentationDiagram() {
  return (
    <Frame title="Indentation defines blocks" caption="Python uses indentation (4 spaces) where Java and C use { }. Mixing tabs and spaces is an error.">
      <g fontFamily="JetBrains Mono, monospace" fontSize="13">
        <text x="40" y="40" fill={palette.ink}>{'if score >= 50:'}</text>
        <rect x="80" y="50" width="280" height="46" fill={palette.cream} stroke={palette.moss} strokeWidth="1.5" rx="4" />
        <text x="100" y="68" fill={palette.ink}>    print("Pass")</text>
        <text x="100" y="88" fill={palette.ink}>    grade = "A"</text>
        <text x="40" y="124" fill={palette.ink}>else:</text>
        <rect x="80" y="134" width="280" height="26" fill={palette.cream} stroke={palette.ember} strokeWidth="1.5" rx="4" />
        <text x="100" y="152" fill={palette.ink}>    print("Fail")</text>
        <text x="40" y="184" fill={palette.coffeeDark}>print("done")</text>
        <text x="200" y="184" fill={palette.coffee}>← outside the if/else</text>
      </g>
    </Frame>
  );
}

// ---------- registry ----------

const registry = {
  'c-pointer': CPointerDiagram,
  'c-array': CArrayDiagram,
  'c-stack-heap': CStackHeapDiagram,
  'c-struct': CStructDiagram,
  'java-class': JavaClassDiagram,
  'java-inheritance': JavaInheritanceDiagram,
  'py-list': PythonListDiagram,
  'py-dict': PythonDictDiagram,
  'py-indentation': PythonIndentationDiagram,
};

export default function Diagram({ name }) {
  const Cmp = registry[name];
  if (!Cmp) return null;
  return <Cmp />;
}

export {
  CPointerDiagram, CArrayDiagram, CStackHeapDiagram, CStructDiagram,
  JavaClassDiagram, JavaInheritanceDiagram,
  PythonListDiagram, PythonDictDiagram, PythonIndentationDiagram,
};
