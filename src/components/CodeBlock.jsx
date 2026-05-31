import React from 'react';

// Simple Java syntax highlighter
const KEYWORDS = [
  'public', 'private', 'protected', 'static', 'final', 'abstract',
  'class', 'interface', 'extends', 'implements', 'new', 'this', 'super',
  'void', 'int', 'double', 'float', 'boolean', 'char', 'long', 'short', 'byte',
  'String', 'if', 'else', 'switch', 'case', 'default', 'break', 'continue',
  'for', 'while', 'do', 'return', 'try', 'catch', 'finally', 'throw', 'throws',
  'import', 'package', 'true', 'false', 'null', 'synchronized', 'volatile',
];

const TYPES = ['ArrayList', 'HashMap', 'HashSet', 'Scanner', 'BufferedReader', 'BufferedWriter',
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

function tokenize(code) {
  const lines = code.split('\n');
  return lines.map((line, lineIdx) => {
    const tokens = [];
    let i = 0;
    while (i < line.length) {
      // Comment
      if (line.slice(i, i + 2) === '//') {
        tokens.push({ type: 'com', value: line.slice(i) });
        break;
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
      // Char literal
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
        if (KEYWORDS.includes(word)) {
          tokens.push({ type: 'kw', value: word });
        } else if (TYPES.includes(word)) {
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
  kw: '#E07A2C',
  str: '#B6D178',
  num: '#CFA665',
  com: '#7A7268',
  fn: '#F0E4CD',
  type: '#CFA665',
  plain: '#F5EFE0',
};

export default function CodeBlock({ code, showLineNumbers = true }) {
  const lines = tokenize(code);
  return (
    <div className="code-block my-4">
      <pre className="text-sm leading-relaxed overflow-x-auto">
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
                {tokens.length === 0 && '\u00A0'}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
