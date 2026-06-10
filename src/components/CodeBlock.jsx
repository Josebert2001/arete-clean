import { useMemo, useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Lightweight syntax highlighter for Java, Python, C, and C++.

const JAVA_KEYWORDS = [
  'public', 'private', 'protected', 'static', 'final', 'abstract',
  'class', 'interface', 'extends', 'implements', 'new', 'this', 'super',
  'void', 'int', 'double', 'float', 'boolean', 'char', 'long', 'short', 'byte',
  'String', 'if', 'else', 'switch', 'case', 'default', 'break', 'continue',
  'for', 'while', 'do', 'return', 'try', 'catch', 'finally', 'throw', 'throws',
  'import', 'package', 'true', 'false', 'null', 'synchronized', 'volatile',
];

const JAVA_TYPES = ['ArrayList', 'HashMap', 'HashSet', 'Scanner', 'BufferedReader', 'BufferedWriter',
  'FileReader', 'FileWriter', 'IOException', 'Exception', 'RuntimeException',
  'Thread', 'Runnable', 'JFrame', 'JButton', 'JLabel', 'JPanel', 'JTextField',
  'JOptionPane', 'ActionListener', 'ActionEvent', 'Connection', 'PreparedStatement',
  'Statement', 'ResultSet', 'DriverManager', 'SQLException', 'StringBuilder',
  'StringBuffer', 'System', 'Integer', 'Double', 'Float', 'Boolean', 'Object',
  'Math', 'Animal', 'Dog', 'Cat', 'Bird', 'Shape', 'Circle', 'Student', 'Counter',
  'Account', 'Logger', 'Report', 'DownloadTask', 'Calculator', 'Greeter',
  'HelloWorld', 'ButtonDemo', 'MyApp', 'Divider', 'DbConnect',
  'InsufficientFundsException', 'Printable', 'Saveable', 'JLabel.CENTER',
  'JFrame.EXIT_ON_CLOSE', 'JOptionPane.YES_NO_OPTION', 'JOptionPane.YES_OPTION'];

const PYTHON_KEYWORDS = [
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and',
  'or', 'is', 'None', 'True', 'False', 'class', 'import', 'from', 'as', 'with',
  'try', 'except', 'finally', 'raise', 'lambda', 'pass', 'break', 'continue',
  'global', 'nonlocal', 'yield', 'del', 'assert', 'async', 'await', 'self',
];

const C_KEYWORDS = [
  'int', 'char', 'float', 'double', 'void', 'long', 'short', 'unsigned',
  'signed', 'const', 'struct', 'union', 'enum', 'typedef', 'sizeof', 'return',
  'if', 'else', 'switch', 'case', 'default', 'break', 'continue', 'for',
  'while', 'do', 'goto', 'static', 'extern', 'auto', 'register', 'volatile',
  'inline', 'NULL', 'true', 'false', 'bool',
  // C++ extras (harmless for C snippets)
  'class', 'public', 'private', 'protected', 'new', 'delete', 'namespace',
  'using', 'template', 'virtual', 'this',
];

const C_TYPES = ['FILE', 'size_t', 'Point', 'Student', 'string', 'cout', 'cin', 'endl', 'std'];

const LANG_CONFIG = {
  java:   { label: 'JAVA',   keywords: JAVA_KEYWORDS,   types: JAVA_TYPES, lineComment: '//', hashIsPreproc: false },
  python: { label: 'PYTHON', keywords: PYTHON_KEYWORDS, types: [],         lineComment: '#',  hashIsPreproc: false },
  c:      { label: 'C',      keywords: C_KEYWORDS,      types: C_TYPES,    lineComment: '//', hashIsPreproc: true },
  cpp:    { label: 'C++',    keywords: C_KEYWORDS,      types: C_TYPES,    lineComment: '//', hashIsPreproc: true },
};

// Unknown languages (bash, sql, plain output...) get no keyword colouring —
// wrong-language highlighting looks worse than none.
const PLAIN_CONFIG = { keywords: [], types: [], lineComment: null, hashIsPreproc: false };

function tokenize(code, lang) {
  const cfg = LANG_CONFIG[lang] || PLAIN_CONFIG;
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    const tokens = [];
    let i = 0;
    while (i < line.length) {
      // Line comment ('//' for Java/C, '#' for Python)
      if (cfg.lineComment && line.startsWith(cfg.lineComment, i)) {
        tokens.push({ type: 'com', value: line.slice(i) });
        break;
      }
      // C block comment on a single line: /* ... */
      if (cfg.lineComment === '//' && line.slice(i, i + 2) === '/*') {
        const close = line.indexOf('*/', i + 2);
        const end = close === -1 ? line.length : close + 2;
        tokens.push({ type: 'com', value: line.slice(i, end) });
        i = end;
        continue;
      }
      // C preprocessor directive: #include, #define, ...
      if (cfg.hashIsPreproc && line[i] === '#') {
        let end = i + 1;
        while (end < line.length && /[a-zA-Z]/.test(line[end])) end++;
        tokens.push({ type: 'kw', value: line.slice(i, end) });
        i = end;
        continue;
      }
      // String
      if (line[i] === '"') {
        let end = i + 1;
        while (end < line.length && line[end] !== '"') {
          if (line[end] === '\\') end++;
          end++;
        }
        tokens.push({ type: 'str', value: line.slice(i, end + 1) });
        i = end + 1;
        continue;
      }
      // Char literal / Python single-quoted string
      if (line[i] === "'") {
        let end = i + 1;
        while (end < line.length && line[end] !== "'") end++;
        tokens.push({ type: 'str', value: line.slice(i, end + 1) });
        i = end + 1;
        continue;
      }
      // Number
      if (/[0-9]/.test(line[i])) {
        let end = i;
        while (end < line.length && /[0-9.fdL]/.test(line[end])) end++;
        tokens.push({ type: 'num', value: line.slice(i, end) });
        i = end;
        continue;
      }
      // Identifier / keyword
      if (/[a-zA-Z_$]/.test(line[i])) {
        let end = i;
        while (end < line.length && /[a-zA-Z0-9_$]/.test(line[end])) end++;
        const word = line.slice(i, end);
        if (cfg.keywords.includes(word)) {
          tokens.push({ type: 'kw', value: word });
        } else if (cfg.types.includes(word)) {
          tokens.push({ type: 'type', value: word });
        } else if (line[end] === '(') {
          tokens.push({ type: 'fn', value: word });
        } else {
          tokens.push({ type: 'plain', value: word });
        }
        i = end;
        continue;
      }
      // Everything else
      tokens.push({ type: 'plain', value: line[i] });
      i++;
    }
    return { lineIdx, tokens };
  });
}

const colorMap = {
  kw:    'var(--syntax-kw)',
  str:   'var(--syntax-str)',
  num:   'var(--syntax-num)',
  com:   'var(--syntax-com)',
  fn:    'var(--syntax-fn)',
  type:  'var(--syntax-num)',
  plain: 'var(--syntax-plain)',
};

export default function CodeBlock({ code, language = 'java', showLineNumbers = true }) {
  const lines = useMemo(() => tokenize(code, language), [code, language]);
  const [copied, setCopied] = useState(false);
  const label = (LANG_CONFIG[language] || {}).label || language.toUpperCase();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  return (
    <div className="code-block my-4 relative">
      <div className="absolute top-1.5 right-2 z-10 flex items-center gap-1.5">
        <span className="select-none text-[0.625rem] font-semibold tracking-[0.15em] text-cream/40">
          {label}
        </span>
        <button
          onClick={copy}
          aria-label="Copy code"
          title="Copy code"
          className="p-1.5 rounded text-coffee-400 hover:text-cream transition-colors"
        >
          {copied ? <Check size={13} className="text-moss" /> : <Copy size={13} />}
        </button>
      </div>
      <pre className="text-xs sm:text-sm leading-relaxed overflow-x-auto">
        <code>
          {lines.map(({ lineIdx, tokens }) => (
            <div key={lineIdx} className="flex">
              {showLineNumbers && (
                <span
                  className="select-none pr-4 text-right opacity-30"
                  style={{ minWidth: '2.5em', fontFamily: 'JetBrains Mono' }}
                >
                  {lineIdx + 1}
                </span>
              )}
              <span className="flex-1">
                {tokens.map((t, i) => (
                  <span key={i} style={{ color: colorMap[t.type], fontStyle: t.type === 'com' ? 'italic' : 'normal', fontWeight: t.type === 'kw' ? 600 : 400 }}>
                    {t.value}
                  </span>
                ))}
                {tokens.length === 0 && ' '}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
