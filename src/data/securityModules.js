// Security Fundamentals track — CTF-style "rooms".
// Same module shape as modules.js / pythonModules.js / cModules.js so the
// existing track pages, progress sync, validator, and AI tutor all work
// unchanged — PLUS a `challenge` field: an embedded capture-the-flag puzzle.
//
// Flags are validated CLIENT-SIDE by SHA-256 (see FlagChallenge.jsx). Only the
// hash ships in the bundle, so answers cannot be found by reading the source
// (except module 1, where reading the source IS the challenge). No backend, no
// API cost, no JDoodle quota — every challenge is solvable purely in-browser.
//
// Each challenge:
//   kind      — 'inspect' | 'decode' | 'crack' | 'analyze' (used for the badge)
//   brief     — what the student must do
//   material  — array of blocks to work on: { type, ... }
//                 'code'     → CodeBlock (needs `language`, `content`)
//                 'terminal' → monospace shell transcript (`content`)
//                 'text'     → monospace block, e.g. headers/email (`content`)
//                 'table'    → { columns: [], rows: [[]] }
//   flagFormat— the shape of the flag, shown to the student (e.g. 'ARETE{...}')
//   flagHash  — SHA-256 of the exact flag (lowercased, trimmed before hashing)
//   hints     — escalating hints, revealed one at a time
//   writeup   — the explanation shown after the flag is solved

export const securityModules = [
  {
    id: 'sec-intro',
    number: 1,
    title: 'The Security Mindset',
    subtitle: 'The CIA triad, threats, and your first flag',
    difficulty: 1,
    estimatedHours: 2,
    theory: [
      {
        heading: 'What security actually protects',
        body: 'Information security is built on three goals, together called the CIA triad. Confidentiality means only authorised people can read data. Integrity means data cannot be altered without detection. Availability means the system is there when legitimate users need it. Every attack you will study — from password cracking to ransomware — is really an attack on one or more of these three properties. When you assess any system, ask: which of the three is at risk here?'
      },
      {
        heading: 'Threats, vulnerabilities, and risk',
        body: 'A vulnerability is a weakness (an unpatched server, a weak password, a gullible user). A threat is something that could exploit it (an attacker, malware, an insider). Risk is the combination: how likely is exploitation, and how bad is the impact? Security work is risk management — you can never remove all risk, so you spend effort where likelihood × impact is highest. This is exactly the thinking CYB 313 (Risk Analysis) formalises.'
      },
      {
        heading: 'Thinking like an attacker (ethically)',
        body: 'To defend a system you must understand how it breaks. That is why this track is hands-on: each room ends with a challenge where you recover a hidden flag — a short string in the form ARETE{...} — by applying the technique you just learned. This mirrors Capture-The-Flag (CTF) competitions and platforms like picoCTF, the standard way security is taught worldwide. Golden rule: only ever do this on systems you own or are explicitly authorised to test. Everything in this track runs safely inside your own browser.'
      }
    ],
    codeExamples: [
      {
        title: 'The three questions of a threat model',
        language: 'text',
        code: `1. What are we protecting?        (the asset — data, service, reputation)
2. Who might attack it, and why?  (the threat — criminal, insider, script kiddie)
3. How could they get in?         (the vulnerability — weak auth, no patching...)

If you can answer these three for any system,
you have done a basic threat model.`,
        explanation: 'A threat model does not need to be a huge document. Answering these three questions honestly for a laptop, a website, or a bank already tells you where to spend your defensive effort first.'
      },
      {
        title: 'Where a flag can hide',
        language: 'html',
        code: `<h1>Welcome to the portal</h1>
<!-- TODO: remove debug note before launch -->
<p>Nothing to see here.</p>`,
        explanation: 'Developers often leave notes, credentials, or debug data in places users never look — HTML comments, page source, response headers. The first rule of any assessment: read everything, not just what the page chooses to show you.'
      }
    ],
    practiceQuestions: [
      {
        question: 'A ransomware attack encrypts a hospital\'s files so staff cannot open them. Which part of the CIA triad is most directly harmed?',
        options: ['Confidentiality', 'Integrity', 'Availability', 'None of them'],
        correctIndex: 2,
        explanation: 'The data still exists and was not necessarily read by the attacker, but legitimate users can no longer access it — that is an availability attack. (If the attacker also stole a copy, confidentiality is harmed too.)'
      },
      {
        question: 'An attacker changes a bank balance in a database without authorisation. Which property is violated?',
        options: ['Availability', 'Integrity', 'Confidentiality', 'Non-repudiation'],
        correctIndex: 1,
        explanation: 'Integrity is about data being trustworthy and unaltered. Unauthorised modification breaks it.'
      },
      {
        question: 'In risk terms, what is a "vulnerability"?',
        options: ['A person who might attack you', 'A weakness that could be exploited', 'The money lost in a breach', 'A type of malware'],
        correctIndex: 1,
        explanation: 'A vulnerability is the weakness itself. The actor who might use it is the threat; the potential loss is the impact.'
      },
      {
        question: 'Why does this track say you may only test systems you own or are authorised to test?',
        options: ['Because unauthorised access is illegal and unethical', 'Because it is technically harder', 'Because the flags only work on your own systems', 'It is only a suggestion'],
        correctIndex: 0,
        explanation: 'Accessing systems without permission is a crime under cybercrime law (the subject of CYB 213). Authorisation is what separates an ethical hacker from a criminal.'
      },
      {
        question: 'A flag in this track looks like which of the following?',
        options: ['A hexadecimal hash', 'ARETE{some_text_here}', 'A random 32-bit number', 'Your student ID'],
        correctIndex: 1,
        explanation: 'Flags are short marker strings in the form ARETE{...}. Recovering one proves you performed the technique. This convention comes straight from CTF competitions.'
      }
    ],
    miniProject: {
      title: 'Threat-model your own phone',
      description: 'Write a short, three-question threat model for your smartphone. What are you protecting on it? Who realistically might want it, and why? What are the three most likely ways they could get in? Then list one concrete defence for each way in.',
      hints: [
        'Assets are not just files — think messages, banking apps, saved passwords, photos.',
        'Threats range from a thief who grabs the unlocked phone to a phishing SMS.',
        'For each way in, a defence: screen lock, app updates, not tapping unknown links.',
        'Notice that most defences are cheap habits, not expensive tools.'
      ]
    },
    challenge: {
      kind: 'inspect',
      title: 'Read the source',
      brief: 'Below is the HTML of a "nothing to see here" page. The developer left something in it that users are never shown on screen. Recover the flag.',
      material: [
        {
          type: 'code',
          language: 'html',
          content: `<!doctype html>
<html>
<head><title>Student Portal</title></head>
<body>
  <h1>Student Portal</h1>
  <p>Maintenance in progress. Nothing to see here.</p>
  <!-- debug: temporary access flag ARETE{welcome_to_the_game} — REMOVE before launch -->
  <footer>© University of Uyo</footer>
</body>
</html>`
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: 'ea409f2228103936beb6afd5bd7bef72b14f0b9e6e7e795369fb771d0f184d05',
      hints: [
        'The page renders only the heading, one sentence, and a footer. But the source contains more than what is rendered.',
        'HTML comments look like <!-- this --> and never appear on the visible page.',
        'Copy the text between ARETE{ and } exactly, including the braces.'
      ],
      writeup: 'You just did what every assessment starts with: viewing the source. Comments, hidden fields, and debug notes left in HTML are a real and common source of leaked data. In a browser you would press Ctrl+U (or right-click → View Page Source) to see exactly this. The lesson: a page shows you what it wants to; an attacker reads everything it actually sent.'
    }
  },

  {
    id: 'sec-encoding',
    number: 2,
    title: 'Encoding Is Not Encryption',
    subtitle: 'Base64, hex, and why they protect nothing',
    difficulty: 1,
    estimatedHours: 2,
    theory: [
      {
        heading: 'Encoding vs encryption',
        body: 'These are constantly confused, and the confusion is dangerous. Encoding transforms data into another format for transport or storage — Base64, hex, URL-encoding. It uses no key and anyone can reverse it. Encryption transforms data using a secret key so that only someone with the key can reverse it. Base64 is encoding: if you see it, you can always decode it. Treating Base64 (or hex, or ROT13) as if it hid a secret is one of the most common beginner mistakes in real breaches.'
      },
      {
        heading: 'How Base64 works',
        body: 'Base64 represents binary data using 64 printable characters (A–Z, a–z, 0–9, + and /). It takes three bytes (24 bits) at a time and splits them into four 6-bit groups, each mapped to one character. This is why Base64 output is about 33% longer than the input, and why it often ends in one or two = signs (padding). You will meet it everywhere: email attachments, data: URLs, JSON Web Tokens, and API keys in config files.'
      },
      {
        heading: 'Spotting encoded data in the wild',
        body: 'Learning to recognise encodings by sight is a core skill. A string of A–Z/a–z/0–9 with +, / and trailing = is almost certainly Base64. A string of only 0–9 and a–f, even in length, is hexadecimal. %20 and %3D in a URL is URL-encoding. When you find one of these during an assessment, decoding it is free and often reveals credentials, tokens, or hidden messages someone wrongly assumed were safe.'
      }
    ],
    codeExamples: [
      {
        title: 'The same secret, three ways',
        language: 'text',
        code: `Plain text : hello
Base64     : aGVsbG8=
Hex        : 68656c6c6f
URL-encoded: hello  (unchanged — no special chars)

None of these is encrypted. Each is fully reversible
by anyone, with no key. They only change the format.`,
        explanation: 'Notice there is no password anywhere. Anyone who intercepts aGVsbG8= can get "hello" back instantly. Encoding is for compatibility, never for secrecy.'
      },
      {
        title: 'Decoding Base64 in Python',
        language: 'python',
        code: `import base64

data = "QVJFVEV7ZXhhbXBsZX0="
decoded = base64.b64decode(data).decode()
print(decoded)   # ARETE{example}`,
        explanation: 'Two lines. This is exactly why Base64 protects nothing — the standard library of every language decodes it for free. In the challenge below you can decode by hand using any online Base64 decoder, or your browser console: atob("...").'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the main difference between encoding and encryption?',
        options: ['Encoding is faster', 'Encryption uses a secret key; encoding does not', 'Encoding is newer', 'There is no real difference'],
        correctIndex: 1,
        explanation: 'Encryption needs a key to reverse; encoding can be reversed by anyone. That single difference is why encoding never provides confidentiality.'
      },
      {
        question: 'You find a config value "cGFzc3dvcmQxMjM=". What should you suspect?',
        options: ['It is strongly encrypted', 'It is Base64 — decode it immediately', 'It is a random ID, ignore it', 'It is a hash'],
        correctIndex: 1,
        explanation: 'The character set and trailing = strongly indicate Base64. Decoding it reveals "password123" — a classic example of a secret wrongly assumed to be hidden.'
      },
      {
        question: 'Roughly how much larger is Base64 output than its input?',
        options: ['About 33% larger', 'Exactly the same size', 'Half the size', 'Twice the size'],
        correctIndex: 0,
        explanation: 'Every 3 bytes become 4 characters, a 4/3 ratio — about 33% larger. That size increase is one way to recognise Base64.'
      },
      {
        question: 'A string contains only the characters 0-9 and a-f and is 32 characters long. What is it most likely?',
        options: ['Base64', 'Hexadecimal', 'Encrypted text', 'A URL'],
        correctIndex: 1,
        explanation: 'Only 0-9 and a-f means hexadecimal. A 32-character hex string is also the typical length of an MD5 hash — a useful thing to recognise.'
      },
      {
        question: 'Is it safe to store a password as Base64 in a database?',
        options: ['Yes, it is encrypted', 'No — Base64 is trivially reversible', 'Yes, if the string is long', 'Only for admins'],
        correctIndex: 1,
        explanation: 'Never. Base64 is not encryption. Passwords should be stored as salted hashes (covered in the Passwords room), never encoded or in plain text.'
      }
    ],
    miniProject: {
      title: 'Build an encoding round-trip',
      description: 'In any language you know (or your browser console), take a message, Base64-encode it, print it, then decode it back and confirm you get the original. Then hex-encode the same message. Observe that at no point did you supply a key.',
      hints: [
        'Browser console: btoa("your text") to encode, atob("...") to decode.',
        'Python: base64.b64encode(b"text") and .b64decode(...).',
        'For hex in the console: [...msg].map(c => c.charCodeAt(0).toString(16)).join("").',
        'The point: you never typed a password, so anyone could reverse your output.'
      ]
    },
    challenge: {
      kind: 'decode',
      title: 'Decode the intercepted string',
      brief: 'A "secured" message was intercepted on the network. The developer thought Base64 would keep it secret. Decode it to recover the flag.',
      material: [
        {
          type: 'text',
          content: 'Intercepted payload:\n\nQVJFVEV7YmFzZTY0X2lzX25vdF9lbmNyeXB0aW9ufQ=='
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: '2a25fdfcbdf7bb0be705b1c4742e5e07fb2e556291cf2653a9dcc002fb1d2a86',
      hints: [
        'The character set (letters, digits) and the trailing == are the signature of Base64.',
        'Use any Base64 decoder, or paste atob("QVJFVEV7...") into your browser console (F12).',
        'The decoded text IS the flag — submit it exactly as it comes out.'
      ],
      writeup: 'Decoding gives ARETE{base64_is_not_encryption} — the message itself telling you the lesson. In real breaches, API keys and passwords are routinely found Base64-encoded in config files and network captures by attackers who simply recognised the format and decoded it. If you ever need actual secrecy, you need encryption with a key, not encoding.'
    }
  },

  {
    id: 'sec-classical-crypto',
    number: 3,
    title: 'Classical Ciphers',
    subtitle: 'Caesar, ROT, and the birth of cryptanalysis',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'The Caesar cipher',
        body: 'The Caesar cipher shifts every letter forward by a fixed amount. With a shift of 3, A becomes D, B becomes E, and so on, wrapping Z back to C. Julius Caesar reportedly used a shift of 3 for military messages. It is the simplest substitution cipher, and studying it teaches the vocabulary of cryptography: plaintext (the message), ciphertext (the scrambled output), and key (here, the shift amount). ROT13 is just a Caesar cipher with a shift of 13 — and because 13 + 13 = 26, applying it twice returns the original.'
      },
      {
        heading: 'Why it is trivially broken',
        body: 'A Caesar cipher has only 25 possible keys (shifts 1–25). An attacker can simply try all of them — a brute-force attack — and read whichever result is English. This is the core weakness: a tiny keyspace. Even without brute force, frequency analysis works: E is the most common letter in English, so whichever ciphertext letter appears most often probably maps to E, revealing the shift. Frequency analysis, discovered by the mathematician Al-Kindi around the 9th century, is the foundation of all cryptanalysis.'
      },
      {
        heading: 'From classical to modern',
        body: 'Classical ciphers fail because their keyspace is small and their structure leaks patterns. Modern cryptography (CYB 311) fixes this with enormous keyspaces — AES-256 has 2^256 possible keys, far more than there are atoms in the observable universe — and designs that destroy statistical patterns. But the concepts are the same: plaintext, ciphertext, key, and an attacker trying to recover one without the other. Master the Caesar cipher and the language of every modern algorithm is already familiar.'
      }
    ],
    codeExamples: [
      {
        title: 'Caesar shift by hand',
        language: 'text',
        code: `Shift = +3   (key)

Plain : H  E  L  L  O
        +3 +3 +3 +3 +3
Cipher: K  H  O  O  R

To decrypt, shift back by 3 (or forward by 23).
Wrapping: X(+3)=A, Y(+3)=B, Z(+3)=C.`,
        explanation: 'Encryption and decryption are the same operation in opposite directions. Knowing the key (3) makes decryption trivial; the whole security rests on keeping that one small number secret — and with only 25 options, it cannot stay secret.'
      },
      {
        title: 'Brute-forcing every shift in Python',
        language: 'python',
        code: `cipher = "DUHWH"
for shift in range(1, 26):
    out = "".join(
        chr((ord(c) - 65 - shift) % 26 + 65) for c in cipher
    )
    print(f"shift {shift:2}: {out}")
# shift 3 prints ARETE — the only readable result`,
        explanation: 'Twenty-five tries and the message falls out. This is why classical ciphers are used today only as puzzles, never for real protection: the entire keyspace fits in a single loop.'
      }
    ],
    practiceQuestions: [
      {
        question: 'With a Caesar shift of 3, what does the letter Y encrypt to?',
        options: ['B', 'A', 'V', 'Z'],
        correctIndex: 0,
        explanation: 'Y → Z → A → B. After Z it wraps around to the start of the alphabet, so Y + 3 = B.'
      },
      {
        question: 'How many possible keys does a Caesar cipher have for the English alphabet?',
        options: ['26', '25', '13', '256'],
        correctIndex: 1,
        explanation: 'Shifts 1 through 25 are usable (a shift of 0 or 26 leaves the text unchanged), giving 25 real keys — small enough to try all of them.'
      },
      {
        question: 'What makes ROT13 special among Caesar ciphers?',
        options: ['It cannot be broken', 'Applying it twice returns the original text', 'It uses a secret key', 'It works only on numbers'],
        correctIndex: 1,
        explanation: 'ROT13 shifts by 13, and 13 + 13 = 26 = a full loop, so encrypting twice decrypts. It is used to hide spoilers, never for security.'
      },
      {
        question: 'What is "frequency analysis"?',
        options: ['Measuring CPU speed', 'Using letter-frequency patterns to break a cipher', 'Counting how often a password is reused', 'A type of network scan'],
        correctIndex: 1,
        explanation: 'Because letters like E and T appear far more often than Q or Z, matching ciphertext frequencies to known language frequencies reveals substitutions — the foundation of cryptanalysis.'
      },
      {
        question: 'Why is AES-256 not vulnerable to the brute-force attack that breaks Caesar?',
        options: ['It is encoded, not encrypted', 'Its keyspace (2^256) is astronomically too large to try', 'It changes the key every second', 'It uses frequency analysis'],
        correctIndex: 1,
        explanation: 'Caesar has 25 keys; AES-256 has 2^256. No computer could ever try them all, so the brute-force approach that defeats classical ciphers is hopeless against modern ones.'
      }
    ],
    miniProject: {
      title: 'Write a Caesar cracker',
      description: 'In any language, write a function that takes a Caesar-encrypted string and prints all 25 possible decryptions so a human can spot the readable one. Then, as a stretch, make it pick the best candidate automatically by counting how often the letter E appears.',
      hints: [
        'Loop shift from 1 to 25; for each, shift every letter back and print the result.',
        'Use modulo 26 arithmetic so letters wrap around the alphabet.',
        'Handle upper/lower case, and leave non-letters (spaces, braces) untouched.',
        'For auto-detection: the decryption with the most spaces and common letters is usually right.'
      ]
    },
    challenge: {
      kind: 'decode',
      title: 'Break the Caesar',
      brief: 'This flag was "encrypted" with a Caesar cipher. Only the letters were shifted — the braces and underscores were left alone. Find the shift and recover the flag.',
      material: [
        {
          type: 'text',
          content: 'Ciphertext:\n\nDUHWH{fubswr_eb_urwdwlrq}\n\n(Only A–Z letters were shifted. Punctuation is unchanged.)'
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: 'd53302170d43615983ed4c2ef4b74d88f204568fe6f58c815bd717f5f79ceb15',
      hints: [
        'You know every real flag starts with ARETE. The ciphertext starts with DUHWH. What shift turns D into A?',
        'D → A is a shift back of 3. Apply the same shift of −3 to every letter.',
        'Shift each letter back by 3, wrapping A→X, and leave { _ } as they are.'
      ],
      writeup: 'The shift was 3 (Caesar\'s own key), giving ARETE{crypto_by_rotation}. Notice the crucial shortcut: because you knew the expected start (ARETE), you did not even need to try all 25 shifts — a known plaintext instantly reveals the key. Real cryptanalysis leans heavily on known or guessed plaintext, which is exactly why modern ciphers are designed so that knowing part of the message reveals nothing about the key.'
    }
  },

  {
    id: 'sec-hashing',
    number: 4,
    title: 'Hashing & File Integrity',
    subtitle: 'Fingerprints for data, and how to catch tampering',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'What a hash function is',
        body: 'A cryptographic hash function takes any input — a word, a file, a whole disk — and produces a fixed-length fingerprint (a digest). SHA-256 always outputs 256 bits (64 hex characters), whether you feed it one letter or a gigabyte. Three properties make it useful in security: it is deterministic (same input always gives the same digest), it is one-way (you cannot reverse the digest back to the input), and it is collision-resistant (it is practically impossible to find two inputs with the same digest).'
      },
      {
        heading: 'The avalanche effect',
        body: 'Change a single bit of the input and roughly half the output bits flip — a completely different-looking digest. This "avalanche effect" is what makes hashing perfect for integrity checking. If a file\'s hash matches the one the author published, the file is bit-for-bit identical. If even one byte was altered — by corruption or by an attacker inserting malware — the hash changes completely and the tampering is obvious. This is why software downloads publish a SHA-256 checksum beside them.'
      },
      {
        heading: 'Hashing is not encryption',
        body: 'A common trap: hashing has no key and cannot be reversed, so it is not encryption — you can never "decrypt" a hash back to the original. That one-way property is exactly why passwords are stored as hashes, not encrypted: even if the database leaks, the attacker gets digests, not passwords (the Passwords room shows why weak passwords still fall). Note that MD5 and SHA-1, once standard, are now broken for security use because collisions can be manufactured — modern systems use SHA-256 or better.'
      }
    ],
    codeExamples: [
      {
        title: 'The avalanche effect in action',
        language: 'text',
        code: `SHA-256("Arete")  = 88a1e9...  (64 hex chars)
SHA-256("arete")  = 3f6b0c...  (totally different)

One letter of case changed → an unrecognisably
different digest. There is no "closeness" between
similar inputs — that is the point.`,
        explanation: 'Because a tiny change produces a totally different hash, you cannot guess the input from the output, and you cannot make a quiet, small tampering that keeps the same hash.'
      },
      {
        title: 'Verifying a download',
        language: 'bash',
        code: `# The vendor publishes:  sha256 = 789370bc...
# You downloaded the file, now check it:

$ sha256sum installer.iso
789370bcc182b4bec26bd970c15378f5...  installer.iso

# Digests match → the file is authentic and intact.
# Digests differ → corrupted or tampered: do NOT run it.`,
        explanation: 'Comparing your computed hash to the vendor\'s published one is a two-second check that catches both accidental corruption and deliberate malware injection. In the challenge below you will do exactly this comparison across several files.'
      }
    ],
    practiceQuestions: [
      {
        question: 'How long is a SHA-256 digest, regardless of input size?',
        options: ['256 bytes', '256 bits (64 hex characters)', 'The same length as the input', '128 bits'],
        correctIndex: 1,
        explanation: 'SHA-256 always outputs 256 bits, written as 64 hexadecimal characters, whether the input is one byte or one terabyte.'
      },
      {
        question: 'You change one byte in a 1 GB file. Roughly how much of its SHA-256 hash changes?',
        options: ['One character', 'Nothing', 'About half the bits', 'Only the first byte'],
        correctIndex: 2,
        explanation: 'The avalanche effect: any change, however small, flips about half the output bits, producing a completely different-looking digest.'
      },
      {
        question: 'Why are passwords stored as hashes rather than encrypted?',
        options: ['Hashing is faster to type', 'Hashes are one-way, so a database leak does not directly reveal passwords', 'Hashes are shorter', 'Encryption is illegal'],
        correctIndex: 1,
        explanation: 'Because a hash cannot be reversed, a stolen database yields digests, not plaintext passwords. (Weak passwords can still be cracked by guessing — see the next rooms.)'
      },
      {
        question: 'A software site lists a SHA-256 checksum next to a download. What is it for?',
        options: ['To speed up the download', 'So you can verify the file was not corrupted or tampered with', 'To encrypt the file', 'To compress the file'],
        correctIndex: 1,
        explanation: 'You hash your downloaded copy and compare. A match proves integrity; a mismatch means corruption or malicious modification.'
      },
      {
        question: 'Why are MD5 and SHA-1 no longer recommended for security?',
        options: ['They are too slow', 'Practical collisions can be manufactured against them', 'They output too many bits', 'They need a key'],
        correctIndex: 1,
        explanation: 'Researchers can now create two different inputs with the same MD5 or SHA-1 digest (a collision), breaking their integrity guarantee. SHA-256 and above remain safe.'
      }
    ],
    miniProject: {
      title: 'Hash a file yourself',
      description: 'On your own computer, run the SHA-256 tool on any file, note the digest, then change one character in the file and hash it again. Watch the digest change completely. This is the exact check security teams automate to detect tampering.',
      hints: [
        'Linux/macOS: sha256sum yourfile  (or shasum -a 256 yourfile).',
        'Windows PowerShell: Get-FileHash yourfile -Algorithm SHA256.',
        'Save the first digest, edit the file, hash again, and compare side by side.',
        'Notice you cannot make a small edit that keeps the hash the same — that is the security property.'
      ]
    },
    challenge: {
      kind: 'analyze',
      title: 'Find the tampered file',
      brief: 'You downloaded three files from a mirror site. The official vendor publishes the correct SHA-256 for each. One file\'s hash does NOT match — it was tampered with in transit. The flag is that file\'s name, wrapped as ARETE{filename}.',
      material: [
        {
          type: 'table',
          columns: ['File', 'Vendor SHA-256 (official)', 'Your download SHA-256'],
          rows: [
            ['lecture_slides_week4.pdf', '789370bc…d7659', '789370bc…d7659'],
            ['payroll_update.exe', 'a9a38989…cad6b', '67be3e95…e9ead'],
            ['timetable_2026.xlsx', '03ab48ff…bebef5', '03ab48ff…bebef5']
          ]
        }
      ],
      flagFormat: 'ARETE{filename.ext}',
      flagHash: '38b6055149b939b12e8c33f586587ea9e534702fa787da347adb61d66a14d037',
      hints: [
        'Compare each row: does the vendor hash equal your downloaded hash?',
        'Two files match exactly. One row has two different digests — that is the tampered file.',
        'Wrap the mismatched file\'s exact name in ARETE{...}, e.g. ARETE{example.pdf}.'
      ],
      writeup: 'Only payroll_update.exe has mismatched digests (a9a3… vs 67be…), so the flag is ARETE{payroll_update.exe}. An attacker replaced the real installer with a malicious one on the mirror — but they could not forge a matching SHA-256, so the integrity check caught them. Note how fitting it is that the tampered file was the executable: always verify hashes before running downloaded programs.'
    }
  },

  {
    id: 'sec-passwords',
    number: 5,
    title: 'Password Cracking',
    subtitle: 'Weak hashes, wordlists, and why length wins',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'How stored passwords get cracked',
        body: 'When a database leaks, attackers get password hashes, not plaintext (as the Hashing room explained). But hashing is one-way only in the sense that you cannot reverse it — you can still guess. The attacker takes a huge list of likely passwords (a wordlist such as rockyou.txt, which contains millions of real leaked passwords), hashes each guess, and checks whether it matches a stolen hash. Because hashing is fast and deterministic, they can test billions of guesses per second on a GPU. Weak passwords fall in milliseconds.'
      },
      {
        heading: 'Dictionary, brute-force, and rules',
        body: 'A dictionary attack tries known words and leaked passwords. A brute-force attack tries every possible character combination — guaranteed to succeed eventually, but time explodes with length. Rule-based attacks are the sweet spot: take dictionary words and apply human-like mutations (P@ssw0rd, sunshine123, adding a year). This is why "clever" substitutions barely help — crackers know every trick because real humans use them. The single biggest factor in survival time is length, not symbols: an 8-character password with symbols falls far faster than a 5-word passphrase.'
      },
      {
        heading: 'How defenders fight back: salt and slow hashes',
        body: 'Two defences make cracking far harder. A salt is a unique random value added to each password before hashing, so identical passwords produce different hashes — this defeats precomputed "rainbow tables" and forces the attacker to crack each account separately. Slow hash functions (bcrypt, scrypt, Argon2) are deliberately expensive to compute, turning billions of guesses per second into thousands. A leaked database salted and hashed with Argon2 is vastly more survivable than one using plain SHA-256. Storing passwords in plain text, of course, offers no protection at all.'
      }
    ],
    codeExamples: [
      {
        title: 'The cracking loop',
        language: 'python',
        code: `import hashlib

stolen = "a941a4c4fd0c01cddef61b8be963bf4c..."  # from a leak
wordlist = ["password", "123456", "sunshine", "qwerty", "letmein"]

for guess in wordlist:
    if hashlib.sha256(guess.encode()).hexdigest() == stolen:
        print(f"Cracked! The password is: {guess}")
        break`,
        explanation: 'This is the entire idea of password cracking: hash each guess, compare to the stolen hash. Real tools like hashcat do this billions of times per second — but the logic is exactly these five lines.'
      },
      {
        title: 'Why length beats complexity',
        language: 'text',
        code: `Password           Guessing time (rough, fast GPU)
--------           -------------------------------
"P@ss1!"           seconds     (short, and a known pattern)
"sunshine"         instant     (top-50 leaked password)
"correct horse
 battery staple"   centuries   (4 random words = huge length)

Length adds exponential difficulty. Symbols add
a little. Being a known password adds nothing but risk.`,
        explanation: 'A long passphrase of random words beats a short "complex" password every time, and is easier to remember. This is why modern guidance (and this course) recommends length over symbol-soup.'
      }
    ],
    practiceQuestions: [
      {
        question: 'How do attackers "crack" a stolen SHA-256 password hash if hashing is one-way?',
        options: ['They decrypt it with a key', 'They guess passwords, hash each guess, and look for a match', 'They reverse the math directly', 'They ask the user'],
        correctIndex: 1,
        explanation: 'You cannot reverse a hash, but you can hash guesses and compare. Fast hardware makes billions of guesses per second feasible.'
      },
      {
        question: 'What is a "wordlist" like rockyou.txt?',
        options: ['A list of banned words', 'A huge list of real, previously-leaked passwords to try', 'A dictionary for spellcheck', 'A firewall ruleset'],
        correctIndex: 1,
        explanation: 'Wordlists collect millions of passwords from past breaches. Because people reuse the same weak passwords, these lists crack a large share of accounts instantly.'
      },
      {
        question: 'What does adding a unique "salt" to each password before hashing achieve?',
        options: ['It makes the password shorter', 'Identical passwords get different hashes, defeating rainbow tables', 'It encrypts the password', 'It speeds up login'],
        correctIndex: 1,
        explanation: 'A per-user salt means two people with the same password have different hashes, so an attacker cannot precompute or share cracking work across accounts.'
      },
      {
        question: 'Why are bcrypt, scrypt, and Argon2 preferred over plain SHA-256 for passwords?',
        options: ['They are shorter', 'They are deliberately slow, drastically cutting guesses per second', 'They cannot be leaked', 'They use no salt'],
        correctIndex: 1,
        explanation: 'Being intentionally slow is a feature: it barely affects one honest login but cripples an attacker trying billions of guesses.'
      },
      {
        question: 'Which password is hardest to crack?',
        options: ['P@ssw0rd!', 'sunshine', 'a string of four random unrelated words', 'Summer2026'],
        correctIndex: 2,
        explanation: 'Length dominates. Four random words are far longer and unpredictable, while the others are short or match common patterns crackers try first.'
      }
    ],
    miniProject: {
      title: 'Estimate your password',
      description: 'WITHOUT typing any real password you use, think about your password habits. Estimate: is any of your passwords a dictionary word, a name + year, or reused across sites? Then design a passphrase of four random unrelated words and note how much longer it is. Do not share real passwords with anyone, including AI tools.',
      hints: [
        'A word + a number + a symbol is a pattern crackers try first — it is weaker than it looks.',
        'Reuse is the biggest risk: one leaked site exposes every account sharing that password.',
        'Four random words (e.g. from rolling dice against a word list) is both strong and memorable.',
        'A password manager lets every site have a unique long password you never memorise.'
      ]
    },
    challenge: {
      kind: 'crack',
      title: 'Crack the leaked hash',
      brief: 'A user\'s password hash was recovered from a breach. It was hashed with plain SHA-256 and no salt. The password is one of the five common passwords in the wordlist below. Crack it: the flag is ARETE{password}.',
      material: [
        {
          type: 'text',
          content: 'Stolen hash (SHA-256):\n5c0c5db74e5c14cbf67ef71954bb653fab599ea72885e1c3b7d6248faefd22db\n\nWordlist to try:\n  password\n  123456\n  sunshine\n  qwerty\n  letmein'
        }
      ],
      flagFormat: 'ARETE{password}',
      flagHash: '5c0c5db74e5c14cbf67ef71954bb653fab599ea72885e1c3b7d6248faefd22db',
      hints: [
        'You do not need a hashing tool. This checker also uses SHA-256 — so just try each wordlist entry wrapped as ARETE{word} until one is accepted.',
        'That trial-and-error against the checker IS a dictionary attack: five guesses, one match.',
        'Notice the stolen hash and the accepted flag hash are the same value — because ARETE{sunshine} was the password. Try the weather-related word.'
      ],
      writeup: 'The password was "sunshine" — a perennial top-50 leaked password — so the flag is ARETE{sunshine}. You just performed a dictionary attack by hand: because the hash was unsalted SHA-256, each guess could be tested independently and a common password fell instantly. Real crackers do this with million-word lists at GPU speed. The defence, from the theory, is not secrecy of the hash but salting, slow hash functions, and above all passwords that are not on any wordlist.'
    }
  },

  {
    id: 'sec-networking',
    number: 6,
    title: 'Ports, Protocols & Insecure Services',
    subtitle: 'How the network exposes you, and what to close',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'Ports and services',
        body: 'When data travels the network, the IP address identifies the machine and the port number identifies the service on it. Ports are like numbered doors: a web server listens on port 80 (HTTP) or 443 (HTTPS), email on 25, remote login on 22 (SSH) or the old 23 (Telnet). Well-known ports 0–1023 are standardised. From an attacker\'s view, every open port is a potential way in, which is why the first step of most assessments is a port scan (with a tool like nmap) to list what services a target is exposing.'
      },
      {
        heading: 'Encrypted vs plaintext protocols',
        body: 'Many older protocols send everything — including passwords — as plaintext over the wire, where anyone in the path can read it by "sniffing" traffic. Telnet (23), FTP (21), and HTTP (80) are the classic offenders. Each has a secure replacement that encrypts the session: SSH (22) replaces Telnet, SFTP/FTPS replaces FTP, and HTTPS (443) replaces HTTP. The rule for defenders is simple: if a service transmits credentials, it must be encrypted, and the plaintext version should be disabled entirely.'
      },
      {
        heading: 'Reducing your attack surface',
        body: 'Attack surface is the total set of points where an attacker could try to get in. Every open port, every running service, every exposed protocol adds to it. Defence in depth starts with reduction: close ports you do not use, disable insecure legacy services, and put a firewall in front (the Firewalls room). A machine exposing only port 443 over HTTPS presents a far smaller target than one with Telnet, FTP, and an old file-share protocol all listening. You cannot be attacked through a door that is not there.'
      }
    ],
    codeExamples: [
      {
        title: 'A port scan result',
        language: 'text',
        code: `$ nmap 10.0.0.5

PORT     STATE  SERVICE   NOTE
22/tcp   open   ssh       encrypted  (good)
23/tcp   open   telnet    PLAINTEXT  (danger!)
80/tcp   open   http      plaintext
443/tcp  open   https     encrypted  (good)
3306/tcp open   mysql     should not face the internet`,
        explanation: 'A scan instantly reveals the exposed services. Here Telnet on 23 sends passwords in the clear and SSH on 22 already does the same job securely — so Telnet is pure risk with no benefit. That is the kind of finding you will make in the challenge.'
      },
      {
        title: 'Secure replacements at a glance',
        language: 'text',
        code: `Insecure (plaintext)      Secure (encrypted)
--------------------      ------------------
Telnet    port 23    →    SSH      port 22
FTP       port 21    →    SFTP/FTPS
HTTP      port 80    →    HTTPS    port 443
POP3/IMAP (plain)    →    POP3S/IMAPS (TLS)`,
        explanation: 'Every risky legacy protocol has a modern encrypted equivalent. Migrating to the right-hand column and switching off the left is one of the highest-value, lowest-effort things a defender can do.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does a port number identify?',
        options: ['The physical location of a server', 'The specific service running on a machine', 'The user logged in', 'The encryption key'],
        correctIndex: 1,
        explanation: 'An IP address identifies the machine; the port identifies which service (web, email, SSH…) the traffic is for.'
      },
      {
        question: 'Why is Telnet (port 23) considered dangerous?',
        options: ['It is too slow', 'It sends data, including passwords, as plaintext', 'It uses too much memory', 'It only works on Windows'],
        correctIndex: 1,
        explanation: 'Telnet transmits everything unencrypted, so anyone sniffing the network can read the login credentials. SSH on port 22 does the same job encrypted.'
      },
      {
        question: 'Which is the secure, encrypted replacement for HTTP?',
        options: ['FTP', 'Telnet', 'HTTPS', 'SMTP'],
        correctIndex: 2,
        explanation: 'HTTPS (port 443) wraps HTTP in TLS encryption, protecting the data in transit. Plain HTTP on port 80 is readable by anyone in the path.'
      },
      {
        question: 'What is the usual first step when assessing a target machine?',
        options: ['Reboot it', 'Scan its ports to see what services are exposed', 'Encrypt its disk', 'Change its IP'],
        correctIndex: 1,
        explanation: 'A port scan (e.g. with nmap) enumerates open ports and services, mapping the attack surface before anything else.'
      },
      {
        question: 'What does "reducing attack surface" mean?',
        options: ['Making the screen smaller', 'Closing unused ports and disabling unnecessary services', 'Buying a bigger server', 'Adding more passwords'],
        correctIndex: 1,
        explanation: 'Fewer exposed ports, services, and protocols means fewer ways in. You cannot be attacked through a service that is not running.'
      }
    ],
    miniProject: {
      title: 'Inventory your own open ports',
      description: 'On your own computer, list the services currently listening for network connections. Identify any you do not recognise or need. This is exactly how a defender begins hardening a machine — you cannot secure what you have not inventoried.',
      hints: [
        'Windows: netstat -ano | findstr LISTENING  (then match PIDs in Task Manager).',
        'Linux/macOS: ss -tlnp  or  netstat -tlnp.',
        'For each listening port, ask: what service is this, and do I actually need it exposed?',
        'Anything you do not need should be stopped or firewalled — that shrinks your attack surface.'
      ]
    },
    challenge: {
      kind: 'analyze',
      title: 'Spot the insecure service',
      brief: 'A port scan of a campus server is shown below. Exactly one open service transmits credentials in plaintext AND already has a secure replacement running on the same box, making it pure risk. Identify it. The flag is ARETE{service_port}, e.g. ARETE{ftp_21}.',
      material: [
        {
          type: 'table',
          columns: ['Port', 'Service', 'Encrypted?'],
          rows: [
            ['22', 'ssh', 'Yes — encrypted'],
            ['23', 'telnet', 'No — plaintext'],
            ['443', 'https', 'Yes — encrypted'],
            ['3306', 'mysql', 'Internal only']
          ]
        }
      ],
      flagFormat: 'ARETE{service_port}',
      flagHash: 'dfbd320484a489eda817535622347d665074347b30a237399e58ccba1b134e38',
      hints: [
        'Which service in the list is marked plaintext?',
        'Telnet (port 23) sends passwords in the clear — and SSH on port 22 already provides the same remote-login capability securely, so Telnet adds only risk.',
        'Format is service then port with an underscore: ARETE{telnet_23}.'
      ],
      writeup: 'The answer is ARETE{telnet_23}. Telnet transmits credentials in plaintext, and because SSH (port 22) is already running to provide encrypted remote login, Telnet delivers no benefit and should be switched off immediately. This is a textbook attack-surface reduction: disabling one legacy service removes a whole class of credential-sniffing risk at zero cost to functionality.'
    }
  },

  {
    id: 'sec-http-headers',
    number: 7,
    title: 'HTTP & Reading the Wire',
    subtitle: 'Requests, responses, and the data pages hide in headers',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'How the web really talks',
        body: 'Every web page load is a conversation in HTTP: your browser sends a request (a method like GET or POST, a path, and headers) and the server sends back a response (a status code, headers, and the body — the HTML you see). The visible page is only the body. The headers carry metadata the browser acts on but rarely displays: content type, cookies, caching rules, security policies, and sometimes information the developer never meant to expose. Learning to read the full request/response — not just the rendered page — is a defining web-security skill.'
      },
      {
        heading: 'Status codes and methods',
        body: 'Status codes tell you what happened: 200 (OK), 301/302 (redirect), 401 (unauthorised), 403 (forbidden), 404 (not found), 500 (server error). Methods describe intent: GET retrieves, POST submits data, PUT/DELETE modify. Attackers pay close attention to these — a 403 where a 404 was expected reveals a resource exists but is protected; a 500 error may leak a stack trace. The browser\'s Developer Tools (F12 → Network tab) let you inspect every request, response, header, and status code your browser exchanges.'
      },
      {
        heading: 'Headers that leak, headers that protect',
        body: 'Some headers are gifts to attackers: a Server: Apache/2.2.8 header advertises exact (often outdated) software versions; custom X- headers sometimes contain debug data or internal identifiers. Other headers are defences you should set: Strict-Transport-Security forces HTTPS, Content-Security-Policy limits where scripts can load from, and X-Frame-Options blocks clickjacking. A quick look at a site\'s response headers tells you a lot about how carefully it was built — and occasionally hands you exactly the information you were looking for.'
      }
    ],
    codeExamples: [
      {
        title: 'Anatomy of an HTTP exchange',
        language: 'text',
        code: `REQUEST
GET /profile HTTP/1.1
Host: portal.example.edu
Cookie: session=abc123

RESPONSE
HTTP/1.1 200 OK
Content-Type: text/html
Server: nginx/1.24
Set-Cookie: session=abc123; HttpOnly

<html> ...the page you actually see... </html>`,
        explanation: 'The body at the bottom is the only part rendered. Everything above it — method, status, cookies, server version — is metadata that tools like DevTools or curl expose, and that attackers read carefully.'
      },
      {
        title: 'Inspecting headers with curl',
        language: 'bash',
        code: `$ curl -I https://example.edu

HTTP/2 200
server: nginx
content-type: text/html
x-powered-by: PHP/7.2.1        # leaks the exact version
x-debug-flag: (developers sometimes leave data here)`,
        explanation: 'curl -I shows only the response headers. Real sites have been compromised because a header advertised a vulnerable software version, or a debug header exposed internal data. In the challenge, the flag is sitting in a response header.'
      }
    ],
    practiceQuestions: [
      {
        question: 'In an HTTP response, which part is the visible web page?',
        options: ['The status code', 'The headers', 'The body', 'The method'],
        correctIndex: 2,
        explanation: 'The body contains the HTML that renders. Headers and status code are metadata the browser uses but does not display as page content.'
      },
      {
        question: 'What does an HTTP 403 status code mean?',
        options: ['Not found', 'OK', 'Forbidden — the resource exists but access is denied', 'Server crashed'],
        correctIndex: 2,
        explanation: '403 Forbidden signals the resource exists but you are not allowed to access it — which itself tells an attacker the resource is there.'
      },
      {
        question: 'Which browser feature lets you inspect every request, response, and header?',
        options: ['The address bar', 'Developer Tools (F12) → Network tab', 'The bookmarks menu', 'Incognito mode'],
        correctIndex: 1,
        explanation: 'DevTools\' Network tab records the full HTTP exchange for every request the page makes — the primary tool for web inspection.'
      },
      {
        question: 'Why can a "Server: Apache/2.2.8" header be a security problem?',
        options: ['It slows the site', 'It advertises an exact, possibly outdated and vulnerable, software version', 'It blocks cookies', 'It is encrypted'],
        correctIndex: 1,
        explanation: 'Announcing the precise version lets an attacker look up known vulnerabilities for it. Defenders often suppress or generalise such headers.'
      },
      {
        question: 'Which header is a defence a site SHOULD set?',
        options: ['X-Powered-By', 'Server', 'Content-Security-Policy', 'X-Debug'],
        correctIndex: 2,
        explanation: 'Content-Security-Policy restricts where scripts and resources may load from, mitigating attacks like XSS. The others tend to leak information rather than protect.'
      }
    ],
    miniProject: {
      title: 'Read a real site\'s headers',
      description: 'Open your browser\'s Developer Tools (F12), go to the Network tab, reload any website, and click the first request. Read its response headers. Identify one header that reveals server software and one security header (or note that a security header is missing).',
      hints: [
        'F12 → Network → reload the page → click the top (document) request → Headers.',
        'Look for Server or X-Powered-By (information leaks) and Strict-Transport-Security or Content-Security-Policy (defences).',
        'Try curl -I <url> from a terminal for the same information in plain text.',
        'Compare a big site to a small one — the careful one usually leaks less and protects more.'
      ]
    },
    challenge: {
      kind: 'inspect',
      title: 'The flag is in the headers',
      brief: 'Below is the raw HTTP response for a page whose body says "Access denied." The developer left a debug header in the response. Read the headers — not the body — to recover the flag.',
      material: [
        {
          type: 'text',
          content: `HTTP/1.1 403 Forbidden
Date: Fri, 03 Jul 2026 09:14:22 GMT
Server: nginx/1.24
Content-Type: text/html
X-Powered-By: PHP/8.1
X-Debug-Flag: ARETE{always_read_the_headers}
Cache-Control: no-store

<html><body><h1>Access denied</h1></body></html>`
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: '8c567400fe51bb8169cc3ed70d9f6f4f209a16d75ab4a6c8621f0f3de3dab84a',
      hints: [
        'The body just says "Access denied" — ignore it. The interesting data is in the header lines above the blank line.',
        'Scan the headers for one that does not belong on a normal response, like an X-Debug- header.',
        'The value of X-Debug-Flag is the flag; submit it exactly.'
      ],
      writeup: 'The flag ARETE{always_read_the_headers} was sitting in a custom X-Debug-Flag response header, invisible on the rendered "Access denied" page. This mirrors real findings: debug and internal headers left in production have leaked session data, internal hostnames, and credentials. The habit to build is inspecting the full HTTP exchange in DevTools, because the server often tells you more than the page shows.'
    }
  },

  {
    id: 'sec-web-sqli',
    number: 8,
    title: 'SQL Injection',
    subtitle: 'When user input becomes database code',
    difficulty: 3,
    estimatedHours: 3,
    theory: [
      {
        heading: 'Mixing data and code',
        body: 'SQL injection (SQLi) is one of the oldest and most damaging web vulnerabilities — consistently on the OWASP Top 10. It happens when an application builds a database query by gluing user input directly into the SQL text. The database cannot tell where the developer\'s query ends and the attacker\'s input begins, so carefully crafted input is executed as code. The root cause is treating untrusted data as trusted instructions — a theme behind many vulnerability classes.'
      },
      {
        heading: 'The classic authentication bypass',
        body: 'Consider a login that runs: SELECT * FROM users WHERE name = \'INPUT\' AND pass = \'INPUT\'. If the app pastes your input in raw and you type \' OR \'1\'=\'1 as the username, the query becomes ... WHERE name = \'\' OR \'1\'=\'1\' AND .... Because \'1\'=\'1\' is always true, the WHERE clause matches every row, and the app often logs you in as the first user — typically the admin — with no valid password. The same trick can dump entire tables using UNION, revealing every user\'s data.'
      },
      {
        heading: 'The fix: parameterised queries',
        body: 'The definitive defence is the prepared statement (parameterised query). Instead of building SQL by string concatenation, the developer sends the query template and the data separately: the database is told "here is the query, and here, separately, are the values" — so input is always treated as data, never as SQL, no matter what it contains. Input validation and least-privilege database accounts add defence in depth, but parameterisation is what actually closes the hole. Never build SQL by concatenating user input; this single rule prevents almost all SQLi.'
      }
    ],
    codeExamples: [
      {
        title: 'The vulnerable query',
        language: 'sql',
        code: `-- The app builds this by pasting input straight in:
SELECT * FROM users
WHERE username = '$input_user'
  AND password = '$input_pass';

-- Attacker types  ' OR '1'='1' --  as the username:
SELECT * FROM users
WHERE username = '' OR '1'='1' --' AND password = '';
-- '1'='1' is always true; -- comments out the rest.
-- Result: every row matches, login succeeds as admin.`,
        explanation: 'The injected quote closes the string early, OR \'1\'=\'1\' makes the condition always true, and -- comments out the password check. The database faithfully executes what is now attacker-controlled code.'
      },
      {
        title: 'The parameterised fix',
        language: 'python',
        code: `# WRONG — input concatenated into the query text:
db.execute("SELECT * FROM users WHERE name = '" + name + "'")

# RIGHT — query and data sent separately:
db.execute("SELECT * FROM users WHERE name = ?", (name,))
# Now the ? is always treated as data. ' OR '1'='1
# would just search for a user literally named that.`,
        explanation: 'With a parameterised query the database never parses user input as SQL. The exact same malicious input that bypassed login before now simply fails to match any username. This one change closes the vulnerability.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the root cause of SQL injection?',
        options: ['Weak passwords', 'User input being mixed directly into query code', 'Slow databases', 'Missing encryption'],
        correctIndex: 1,
        explanation: 'When untrusted input is concatenated into SQL, the database executes it as code. The confusion between data and instructions is the core flaw.'
      },
      {
        question: "Why does typing  ' OR '1'='1  into a naive login form often work?",
        options: ['It guesses the password', "It makes the WHERE clause always true, matching every row", 'It crashes the server', 'It encrypts the query'],
        correctIndex: 1,
        explanation: "'1'='1' is always true, so the condition matches all rows and the app logs you in — usually as the first (admin) account."
      },
      {
        question: 'What is the definitive fix for SQL injection?',
        options: ['Hiding the login page', 'Parameterised (prepared) queries that separate code from data', 'A longer password', 'Using HTTPS'],
        correctIndex: 1,
        explanation: 'Prepared statements send the query and the data separately, so input can never be parsed as SQL. This closes the vulnerability regardless of what the user types.'
      },
      {
        question: 'A SQL injection using UNION SELECT typically aims to do what?',
        options: ['Speed up the query', 'Pull data from other tables into the results', 'Delete the database', 'Encrypt the response'],
        correctIndex: 1,
        explanation: 'UNION appends the results of another SELECT, letting an attacker exfiltrate data from tables the page was never meant to show.'
      },
      {
        question: 'Besides parameterisation, which adds defence in depth against SQLi impact?',
        options: ['Running the DB account with least privilege', 'Using a faster server', 'Disabling cookies', 'Longer URLs'],
        correctIndex: 0,
        explanation: 'A least-privilege database account limits what a successful injection can reach or destroy. It does not fix the bug, but it reduces the blast radius.'
      }
    ],
    miniProject: {
      title: 'Rewrite a vulnerable query',
      description: 'Take the vulnerable concatenated query from the code examples and rewrite it as a parameterised query in a language of your choice (Python\'s sqlite3, PHP PDO, Java PreparedStatement). Explain in one sentence why the injection no longer works after your change.',
      hints: [
        'Replace the concatenated value with a placeholder (? or a named parameter).',
        'Pass the user input as a separate argument to execute(), never inside the SQL string.',
        'Python sqlite3: cur.execute("... WHERE name = ?", (name,)).',
        'Your one-sentence reason: the input is now always treated as data, never parsed as SQL.'
      ]
    },
    challenge: {
      kind: 'analyze',
      title: 'Exploit the login',
      brief: 'A vulnerable login builds its query by concatenating input. When the classic  \' OR \'1\'=\'1\' --  bypass is used, the app logs in as the first row and echoes that user\'s secret debug_token. From the users table below, recover the admin\'s debug_token, which is the flag.',
      material: [
        {
          type: 'code',
          language: 'sql',
          content: `-- Vulnerable login query (input pasted in raw):
SELECT username, debug_token FROM users
WHERE username = '$user' AND password = '$pass';

-- Attacker submits username:  ' OR '1'='1' --
-- The WHERE clause is now always true and the password
-- check is commented out, so the FIRST row is returned:`
        },
        {
          type: 'table',
          columns: ['id', 'username', 'role', 'debug_token'],
          rows: [
            ['1', 'admin', 'administrator', 'ARETE{l3t_m3_1n_d3bug}'],
            ['2', 'jbassey', 'student', 'ARETE{not_this_one}'],
            ['3', 'guest', 'read-only', 'ARETE{also_wrong}']
          ]
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: '7d52e6fd9157fb4a73d51404701af6c8b98778ace2c9824590623bd8244f126a',
      hints: [
        'The injection makes the WHERE always true, so the query returns rows starting from the top — id 1.',
        'Row id 1 is the admin account. Its debug_token is what the exploited app would echo back.',
        'Read the debug_token from the admin row and submit it exactly.'
      ],
      writeup: 'The bypass returns the first row (id 1, admin), leaking its debug_token ARETE{l3t_m3_1n_d3bug}. The point is not the table lookup itself but why the attacker reached it: the concatenated query let  \' OR \'1\'=\'1\' --  turn the login into an "always true" match with no password. A parameterised query would have treated that entire string as a literal username, found no such user, and denied access — which is exactly the fix from the theory.'
    }
  },

  {
    id: 'sec-linux-cli',
    number: 9,
    title: 'The Linux Command Line',
    subtitle: 'The hacker\'s primary tool, and where files hide',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'Why Linux and the terminal matter',
        body: 'Almost all security tooling — nmap, Wireshark, hashcat, Metasploit — runs on Linux, and most servers you will ever defend or assess are Linux. The command line is not optional: it is faster, scriptable, and works over a remote SSH connection where no graphical interface exists. Core navigation is a handful of commands: pwd (where am I), ls (list files), cd (change directory), cat (show a file\'s contents), and grep (search text). These five already let you move around and read a system.'
      },
      {
        heading: 'Hidden files and permissions',
        body: 'On Linux, any file or directory whose name starts with a dot (for example .bashrc, .ssh, .env) is hidden from a normal ls. This is convention, not security — ls -a reveals them all, and attackers always look. Sensitive things routinely live in dotfiles: SSH keys in .ssh, application secrets in .env, shell history in .bash_history. Alongside this, every file has permissions (read, write, execute for owner, group, others) shown by ls -l as strings like -rw-r--r--. Misconfigured permissions — a world-readable private key, for instance — are a common real-world finding.'
      },
      {
        heading: 'Reading a system methodically',
        body: 'When you gain access to a machine in a lab or authorised test, you enumerate: list directories, read config files, check history and dotfiles for credentials, and inspect what services and cron jobs run. Commands chain together with pipes (|), sending one command\'s output into another — ls -la | grep key finds filenames containing "key". This methodical reading is how footholds turn into understanding. The same skills, used defensively, let an administrator audit exactly what is on a server and spot what should not be there.'
      }
    ],
    codeExamples: [
      {
        title: 'Navigation and listing',
        language: 'bash',
        code: `$ pwd                 # print working directory
/home/student

$ ls                  # normal listing (hides dotfiles)
notes.txt  project/

$ ls -la              # -a shows hidden files, -l shows details
-rw-r--r-- 1 student student  220 Jul  3 09:00 .bashrc
-rw------- 1 student student   64 Jul  3 09:01 .secret
-rw-r--r-- 1 student student 1024 Jul  3 09:00 notes.txt
drwxr-xr-x 2 student student 4096 Jul  3 09:00 project`,
        explanation: 'Plain ls hid two files. ls -la reveals .bashrc and .secret — the leading dot is the only thing that "hid" them. The permission string on the left (-rw-------) shows .secret is readable only by its owner.'
      },
      {
        title: 'Reading and searching files',
        language: 'bash',
        code: `$ cat .secret               # show a file's contents
41524554457b...            # (looks like hex)

$ history | grep ssh       # search shell history for 'ssh'
  42  ssh admin@10.0.0.5

$ grep -r "password" .      # recursively search for 'password'
./config/app.conf:db_password = hunter2`,
        explanation: 'cat dumps a file; grep searches text, and -r searches recursively through a whole directory tree. Attackers and auditors alike run exactly these to hunt for credentials left in config files and history.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which command reveals hidden dotfiles in a directory?',
        options: ['ls', 'ls -a', 'cd', 'pwd'],
        correctIndex: 1,
        explanation: 'The -a flag tells ls to show all entries, including those whose names start with a dot, which are hidden from a plain ls.'
      },
      {
        question: 'What makes a file "hidden" on Linux?',
        options: ['A special encryption', 'Its name starts with a dot (.)', 'It has no read permission', 'It is stored on another disk'],
        correctIndex: 1,
        explanation: 'Hiding is pure convention: a leading dot keeps a file out of normal listings, but ls -a shows it. It is not a security control.'
      },
      {
        question: 'What does the cat command do?',
        options: ['Deletes a file', 'Displays a file\'s contents', 'Copies a file', 'Changes permissions'],
        correctIndex: 1,
        explanation: 'cat prints a file\'s contents to the terminal — the quickest way to read a small file like a config or a note.'
      },
      {
        question: 'What does the pipe symbol | do in  ls -la | grep key ?',
        options: ['Runs the commands separately', 'Sends the output of ls into grep as input', 'Encrypts the output', 'Repeats the command'],
        correctIndex: 1,
        explanation: 'A pipe feeds one command\'s output into the next. Here ls -la\'s listing is filtered by grep to only lines containing "key".'
      },
      {
        question: 'Why do attackers and auditors both inspect dotfiles like .env and .ssh?',
        options: ['They are always empty', 'They frequently contain secrets: keys, tokens, passwords', 'They speed up the shell', 'They are required to log in'],
        correctIndex: 1,
        explanation: 'Application secrets, SSH keys, and shell history live in dotfiles. They are hidden from casual view but trivially readable, making them a prime target and a key thing to audit.'
      }
    ],
    miniProject: {
      title: 'Explore a real filesystem',
      description: 'On any Linux machine, a WSL install, or an online terminal, practise: pwd, ls -la in your home directory, cat one dotfile (like .bashrc), and history | grep to search your own command history. Note how much ls -la reveals that plain ls hid.',
      hints: [
        'No Linux? Try Windows Subsystem for Linux (WSL) or a free browser terminal.',
        'ls -la in your home directory will show many dotfiles you never normally see.',
        'cat .bashrc to read your shell\'s startup config — a harmless dotfile to inspect.',
        'Chain commands with a pipe: ls -la | grep "\\." to filter to hidden entries.'
      ]
    },
    challenge: {
      kind: 'inspect',
      title: 'Find the hidden secret',
      brief: 'You have shell access to a lab machine. A secret was left in a hidden file, but its contents are hex-encoded. Use the transcript below: list the hidden files, read the secret, then decode the hex to recover the flag.',
      material: [
        {
          type: 'terminal',
          content: `$ ls
readme.txt   project/

$ ls -la
drwxr-xr-x  student student  .
-rw-r--r--  student student  .bashrc
-rw-------  student student  .secret
-rw-r--r--  student student  readme.txt
drwxr-xr-x  student student  project

$ cat .secret
41524554457b646f7466696c65735f686964655f736563726574737d`
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: '207344409f001099785b51b0c7c57cb65be4148d8768d779042a11e21e47a6f4',
      hints: [
        'Plain ls hid it; ls -la revealed .secret. Its contents are hex (only 0-9 and a-f, even length).',
        'Hex decode the string: each pair of hex digits is one character. 41=A, 52=R, 45=E, 54=T…',
        'Use any "hex to text" decoder, or your browser console. The decoded text is the flag.'
      ],
      writeup: 'Decoding the hex gives ARETE{dotfiles_hide_secrets}. Two skills combined here: enumerating hidden files with ls -la, and recognising/decoding an encoding (hex, from the Encoding room). This is a realistic pattern — secrets are dropped into dotfiles and lightly obscured, but a leading dot and a hex string stop no one who is actually looking. Auditing your own dotfiles for stray secrets is the defensive side of the same skill.'
    }
  },

  {
    id: 'sec-forensics',
    number: 10,
    title: 'Digital Forensics',
    subtitle: 'Metadata, hidden data, and what files remember',
    difficulty: 3,
    estimatedHours: 2,
    theory: [
      {
        heading: 'Files remember more than their contents',
        body: 'Digital forensics (CYB 423) is the practice of recovering and analysing digital evidence. A central lesson is that files carry metadata — data about the data — far beyond what you see when you open them. A photo\'s EXIF metadata can record the camera model, exact timestamp, and even GPS coordinates of where it was taken. A document stores author names, editing history, and software versions. Investigators — and attackers profiling a target — mine this metadata, because people share files without realising how much context travels with them.'
      },
      {
        heading: 'Steganography: hiding data inside data',
        body: 'Steganography (the subject of CYB 412) is concealment: hiding a message inside an ordinary-looking carrier so its very existence is secret. Unlike encryption, which makes data unreadable but obvious, steganography aims to be unnoticed — a secret can be tucked into the least-significant bits of an image\'s pixels, appended after a file\'s official end marker, or stashed in a metadata comment field. It is used both maliciously (exfiltrating data or hiding malware) and defensively (watermarking). Detecting it means looking past what a file claims to be.'
      },
      {
        heading: 'The forensic mindset and evidence integrity',
        body: 'A forensic examiner works methodically and never trusts appearances: inspect metadata, check whether a file\'s real type matches its extension (via "magic bytes" at the start of the file), and look for data hidden after the apparent end. Crucially, evidence integrity is paramount — examiners hash evidence (using the skills from the Hashing room) before and after analysis to prove nothing was altered, and work on copies, not originals. This chain of custody is what makes findings admissible. The same curiosity that finds hidden flags, applied rigorously, is what forensic investigation is built on.'
      }
    ],
    codeExamples: [
      {
        title: 'Metadata hiding in plain sight',
        language: 'bash',
        code: `$ exiftool holiday_photo.jpg

File Name        : holiday_photo.jpg
Camera Model     : Canon EOS 90D
Date/Time        : 2026:06:20 14:32:11
GPS Position     : 5.0378 N, 7.9128 E   # exact location!
User Comment     : QVJFVEV7ZXhhbXBsZX0=  # base64 in metadata`,
        explanation: 'The visible image is just a photo, but exiftool reveals the camera, the precise time, GPS coordinates, and a User Comment field someone stuffed data into. Metadata routinely leaks more than the sender intended.'
      },
      {
        title: 'Data hidden after the end of a file',
        language: 'bash',
        code: `$ cat report.pdf | tail
%%EOF                          # the PDF officially ends here
ARETE{data_after_the_marker}   # ...but bytes continue after it

# Tools like binwalk scan a file for content that
# should not be there — embedded files, appended text,
# hidden archives past the end marker.`,
        explanation: 'A file\'s official end marker does not stop extra bytes from being appended. Steganography and data smuggling exploit exactly this — the file opens normally, but hidden content rides along after the end.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is metadata?',
        options: ['The main content of a file', 'Data about the data — e.g. author, timestamp, GPS', 'A type of encryption', 'The file extension'],
        correctIndex: 1,
        explanation: 'Metadata describes the file: who made it, when, with what device, and often where. It travels with the file even when the visible content seems harmless.'
      },
      {
        question: 'How does steganography differ from encryption?',
        options: ['It is faster', 'It hides the existence of the message, not just its contents', 'It uses no computer', 'It only works on text'],
        correctIndex: 1,
        explanation: 'Encryption makes data unreadable but obvious; steganography aims to conceal that any secret exists at all, hiding it inside ordinary-looking carriers.'
      },
      {
        question: 'A JPEG\'s EXIF data can dangerously reveal what?',
        options: ['The GPS location where the photo was taken', 'The viewer\'s password', 'The Wi-Fi key', 'Nothing sensitive'],
        correctIndex: 0,
        explanation: 'EXIF often stores exact GPS coordinates and timestamps. Sharing a photo can unintentionally disclose exactly where and when it was taken.'
      },
      {
        question: 'Why do forensic examiners hash evidence before and after analysis?',
        options: ['To compress it', 'To prove the evidence was not altered during handling', 'To encrypt it', 'To speed up the investigation'],
        correctIndex: 1,
        explanation: 'Matching hashes before and after prove integrity and preserve the chain of custody, which is what makes the evidence trustworthy and admissible.'
      },
      {
        question: 'What are "magic bytes" used to check?',
        options: ['The file\'s password', 'The file\'s true type, regardless of its extension', 'The file\'s size', 'The encryption key'],
        correctIndex: 1,
        explanation: 'The first bytes of a file identify its real format. A file named image.jpg that starts with PK is actually a ZIP — a mismatch worth investigating.'
      }
    ],
    miniProject: {
      title: 'Strip metadata from a photo',
      description: 'Take any photo you have taken, and inspect its metadata (an online EXIF viewer works). Note what it reveals — device, time, and possibly location. Then remove the metadata (most phones and image tools offer this) and confirm it is gone. This is a real privacy habit before sharing images publicly.',
      hints: [
        'Upload to an online EXIF viewer, or right-click → Properties → Details on Windows.',
        'Look specifically for GPS/location data — the most privacy-sensitive field.',
        'To strip it: many OSes have a "Remove properties and personal information" option.',
        'Re-check afterwards to confirm the location and device fields are cleared.'
      ]
    },
    challenge: {
      kind: 'inspect',
      title: 'Metadata never lies',
      brief: 'An image looks like an ordinary photo, but the forensic tool exiftool reveals a suspicious field. Read the metadata dump below, find the hidden data, and decode it to recover the flag.',
      material: [
        {
          type: 'terminal',
          content: `$ exiftool suspicious_photo.jpg

File Name        : suspicious_photo.jpg
File Size        : 2.1 MB
Camera Model     : iPhone 14
Date/Time        : 2026:07:01 22:10:04
GPS Position     : (none)
User Comment     : QVJFVEV7bWV0YWRhdGFfbmV2ZXJfbGllc30=
Software         : Adobe Photoshop 2026`,
        }
      ],
      flagFormat: 'ARETE{...}',
      flagHash: '31fb2a0d949929323aa93fb9c16037f33c1aa892bfbe70ca69bd37ac41d85eb2',
      hints: [
        'The visible photo tells you nothing. Look at the metadata fields — one holds data that does not belong.',
        'The User Comment field is a Base64 string (letters, digits, trailing =). Decode it as you did in the Encoding room.',
        'Decode QVJFVEV7... with any Base64 decoder or atob() in the console; the result is the flag.'
      ],
      writeup: 'The User Comment field held a Base64 blob that decodes to ARETE{metadata_never_lies}. This chains forensics (inspect metadata) with encoding (decode Base64), which is how real challenges and investigations work — one clue leads into another technique. Two extra tells here for a curious examiner: the "Software: Adobe Photoshop" field shows the image was edited, and hidden data in a comment field is a hallmark of light steganography.'
    }
  },

  {
    id: 'sec-phishing',
    number: 11,
    title: 'Social Engineering & Phishing',
    subtitle: 'Hacking the human, and how to spot it',
    difficulty: 2,
    estimatedHours: 2,
    theory: [
      {
        heading: 'The human is the easiest target',
        body: 'The strongest encryption and the best firewall are useless if an attacker can simply persuade a person to hand over their password. Social engineering is the manipulation of people into breaking security — and it is behind the majority of real breaches. Phishing is its most common form: a fraudulent message (email, SMS, chat) that impersonates a trusted party to trick you into clicking a malicious link, opening a hostile attachment, or entering credentials on a fake page. It works because it targets human psychology, not software bugs.'
      },
      {
        heading: 'The levers attackers pull',
        body: 'Phishing messages engineer emotion to short-circuit careful thinking. Common levers are urgency ("your account will be closed in 24 hours"), authority (posing as your bank, IT department, or a lecturer), fear ("suspicious login detected"), and greed or curiosity ("you have won", "see who viewed your profile"). Variants include spear phishing (personalised to a specific target using researched details), smishing (via SMS), and vishing (voice calls). The more the message rushes or scares you, the more suspicious you should become.'
      },
      {
        heading: 'How to spot and stop it',
        body: 'Defence is a checklist you can run in seconds. Inspect the real sender address, not the display name. Hover over links to see the true destination before clicking — attackers use lookalike domains that swap or add characters (paypa1.com, uniuy0.com) to mimic the real one. Beware unexpected attachments and any message pressuring immediate action. When in doubt, verify through a separate known channel — type the real website address yourself rather than clicking. Technical controls (spam filters, multi-factor authentication) help, but a trained, sceptical eye is the strongest defence, which is why organisations run phishing-awareness training.'
      }
    ],
    codeExamples: [
      {
        title: 'Anatomy of a phishing email',
        language: 'text',
        code: `From: "UniUyo IT Support" <support@uniuy0-portal.com>
                                        ^ look closely: uy0, not uyo
Subject: URGENT: Your account will be DELETED in 24h

Dear Student,
We detected suspicious activity. Verify NOW or lose
access permanently:  http://uniuy0-portal.com/login

  - Urgency + fear + authority, all at once
  - Lookalike domain (0 instead of o)
  - Link goes to the fake domain, not the real one`,
        explanation: 'Every red flag is present: a lookalike sender domain, manufactured urgency and fear, and a link to the fraudulent site. The display name "UniUyo IT Support" is trivial to fake — the real address is what matters.'
      },
      {
        title: 'Real domain vs lookalike',
        language: 'text',
        code: `Legitimate:  uniuyo.edu.ng
Lookalikes:  uniuy0.edu.ng     (o → 0)
             un1uyo.edu.ng     (i → 1)
             uniuyo-portal.com (extra words, wrong TLD)
             uniuyo.edu.ng.evil.com  (real name is a subdomain!)

Always read the domain right-to-left from the final dot.`,
        explanation: 'Attackers register domains that look almost identical at a glance. The genuine domain is the part just before the top-level domain — reading right-to-left exposes tricks like uniuyo.edu.ng.evil.com, which actually belongs to evil.com.'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is social engineering?',
        options: ['Building social networks', 'Manipulating people into breaking security', 'A type of firewall', 'Encrypting messages'],
        correctIndex: 1,
        explanation: 'It targets human psychology rather than software, tricking people into revealing information or taking unsafe actions. It bypasses technical defences entirely.'
      },
      {
        question: 'Which is a classic psychological lever in phishing?',
        options: ['A calm, patient tone', 'Manufactured urgency ("act now or lose access")', 'Detailed technical documentation', 'A request to take your time'],
        correctIndex: 1,
        explanation: 'Urgency pressures you to act before thinking. Fear, authority, and greed are the other common levers.'
      },
      {
        question: 'Before clicking a link in an email, what should you do?',
        options: ['Click quickly before it expires', 'Hover to see the true destination URL', 'Forward it to friends', 'Reply asking if it is real'],
        correctIndex: 1,
        explanation: 'Hovering reveals where the link actually goes, exposing lookalike or malicious domains before you commit to clicking.'
      },
      {
        question: 'In the address  uniuyo.edu.ng.evil.com, which domain does it really belong to?',
        options: ['uniuyo.edu.ng', 'evil.com', 'uniuyo.com', 'edu.ng'],
        correctIndex: 1,
        explanation: 'Read right-to-left from the final dot: the real domain is evil.com, with uniuyo.edu.ng merely a subdomain used to look legitimate.'
      },
      {
        question: 'What is the single strongest defence against phishing?',
        options: ['A faster computer', 'A trained, sceptical human who verifies before acting', 'Deleting all email', 'Using Base64'],
        correctIndex: 1,
        explanation: 'Filters and MFA help, but because phishing targets people, an alert and sceptical user who verifies through a trusted channel is the most effective defence.'
      }
    ],
    miniProject: {
      title: 'Audit your own inbox',
      description: 'Look through your email spam or junk folder and pick one phishing or suspicious message (do NOT click anything in it). Write down every red flag you can find: the real sender address, the psychological lever used, and where any link truly points (by hovering, not clicking).',
      hints: [
        'Check the actual email address behind the display name — they rarely match for phishing.',
        'Name the emotional lever: urgency, fear, authority, greed, or curiosity.',
        'Hover over links (never click) to reveal the true domain; watch for lookalikes.',
        'Note whether it asks for credentials or pushes an attachment — both are major red flags.'
      ]
    },
    challenge: {
      kind: 'analyze',
      title: 'Catch the phish',
      brief: 'A student received the email below, apparently from University of Uyo IT. It is a phishing attempt. The give-away is the fraudulent lookalike domain the attacker is using. Identify that domain — the flag is ARETE{the_fake_domain}.',
      material: [
        {
          type: 'text',
          content: `From: "UniUyo IT Support" <support@uniuy0-portal.com>
To: student@uniuyo.edu.ng
Subject: URGENT: Verify your account within 24 hours

Dear Student,

We have detected suspicious login activity on your
account. For your protection, you must verify your
identity within 24 hours or your account will be
permanently deleted.

Click here to verify now:
   http://uniuy0-portal.com/login

Regards,
University of Uyo IT Support Team

(The real university domain is uniuyo.edu.ng)`
        }
      ],
      flagFormat: 'ARETE{domain}',
      flagHash: '282cccbec789d9e535af31749381e60bbc6d19c34082256bcaacbb21c0368fcd',
      hints: [
        'Compare the sender/link domain to the real one given at the bottom: uniuyo.edu.ng.',
        'The fake domain swaps a letter for a digit and adds an extra word. Look at "uniuy0-portal.com".',
        'Submit the exact fraudulent domain wrapped in ARETE{...}, e.g. ARETE{fake-site.com}.'
      ],
      writeup: 'The fraudulent domain is uniuy0-portal.com — it replaces the "o" in uyo with a zero and appends "-portal.com" instead of the real edu.ng, so the flag is ARETE{uniuy0-portal.com}. Combined with manufactured urgency, fear of deletion, and a spoofed display name, it is a textbook phish. The defence cost nothing but attention: reading the actual domain rather than the friendly display name is what breaks the illusion.'
    }
  },

  {
    id: 'sec-firewall',
    number: 12,
    title: 'Firewalls & Defense in Depth',
    subtitle: 'Controlling traffic, and the danger of one bad rule',
    difficulty: 3,
    estimatedHours: 2,
    theory: [
      {
        heading: 'What a firewall does',
        body: 'A firewall (UUY-CYB 221, Network Defense) sits between networks and decides which traffic to allow or block based on a set of rules. Each rule typically matches on source address, destination address, port, and protocol, then either permits or denies the packet. Rules are evaluated in order, top to bottom, and usually the first match wins. A well-built firewall ends with an implicit "deny everything else" — the default-deny principle: anything not explicitly allowed is blocked. This flips the burden so you must justify each thing you open, rather than trying to enumerate every threat to block.'
      },
      {
        heading: 'Least privilege and the danger of "any"',
        body: 'Good firewall rules are specific: allow this source, to this destination, on this one port. The word "any" is where danger lives — a rule permitting "any source" to "any destination" on "any port" effectively disables the firewall for that traffic. A single overly-permissive rule, often added hastily to "just make it work" and never removed, can undo an otherwise careful policy. Because the first matching rule wins, one broad allow rule placed above tighter deny rules silently overrides them. Auditing rule sets for stray "any/any" permits is a routine and high-value defensive task.'
      },
      {
        heading: 'Defense in depth',
        body: 'No single control is enough. Defense in depth layers independent protections so that if one fails, others still stand: a firewall at the perimeter, network segmentation inside, host-based firewalls on each machine, strong authentication, encryption, monitoring, and trained users. An attacker must defeat every layer; a defender only needs the layers to catch what the previous one missed. The firewall is one crucial layer — but the lesson of this whole track is that security is the sum of many reinforcing controls, technical and human, never a single wall.'
      }
    ],
    codeExamples: [
      {
        title: 'A firewall rule set (first match wins)',
        language: 'text',
        code: `#  SOURCE        DEST          PORT   ACTION
1  10.0.0.0/24   web-server    443    ALLOW   # staff → HTTPS
2  10.0.0.0/24   web-server    22     ALLOW   # staff → SSH
3  any           web-server    80     DENY    # block plain HTTP
4  any           any           any    DENY    # default deny

Specific allows first, broad deny last. Anything
not matched by rules 1-3 hits the default deny.`,
        explanation: 'This is a healthy rule set: narrow allow rules for exactly what is needed, then a catch-all deny. Because the first match wins, ordering matters — the default-deny must sit at the bottom, after the specific permits.'
      },
      {
        title: 'One bad rule undoes everything',
        language: 'text',
        code: `#  SOURCE        DEST          PORT   ACTION
1  10.0.0.0/24   web-server    443    ALLOW
...
7  any           any           any    ALLOW   # <-- DISASTER
8  any           any           any    DENY    # never reached

Rule 7 permits ALL traffic from ANY source to ANY
destination on ANY port. The default-deny below it
is now dead code. The firewall is effectively off.`,
        explanation: 'A single "any/any/any ALLOW" rule, perhaps added to debug a problem and forgotten, matches everything and lets all traffic through. Every careful rule beneath it becomes meaningless. Finding rules like this is exactly the challenge below.'
      }
    ],
    practiceQuestions: [
      {
        question: 'On what does a firewall typically base its allow/deny decision?',
        options: ['The user\'s password', 'Source, destination, port, and protocol', 'The file contents', 'The time of day only'],
        correctIndex: 1,
        explanation: 'Classic firewall rules match on source and destination addresses, the port, and the protocol, then permit or deny accordingly.'
      },
      {
        question: 'What is the "default-deny" principle?',
        options: ['Block only known-bad traffic', 'Allow everything by default', 'Block anything not explicitly allowed', 'Deny access after 5pm'],
        correctIndex: 2,
        explanation: 'Default-deny blocks all traffic except what is explicitly permitted, forcing you to justify each opening rather than trying to list every threat.'
      },
      {
        question: 'In a typical firewall, which rule takes effect when several match?',
        options: ['The last one', 'The first one matched (top to bottom)', 'A random one', 'The strictest one'],
        correctIndex: 1,
        explanation: 'Rules are evaluated top to bottom and the first match wins, which is why a broad allow placed high up can override stricter rules below it.'
      },
      {
        question: 'Why is a rule permitting "any source to any destination on any port" dangerous?',
        options: ['It is slow', 'It matches all traffic, effectively disabling the firewall for it', 'It uses too much memory', 'It blocks the admin'],
        correctIndex: 1,
        explanation: 'Such a rule allows everything, and being matched first makes tighter rules below it irrelevant — the firewall is effectively switched off.'
      },
      {
        question: 'What is "defense in depth"?',
        options: ['A single very strong firewall', 'Multiple independent layers of protection', 'Encrypting twice', 'A deep network cable'],
        correctIndex: 1,
        explanation: 'Layering independent controls means that if one fails, others still protect the system. Security is the sum of many reinforcing measures.'
      }
    ],
    miniProject: {
      title: 'Design a small rule set',
      description: 'Write a firewall rule set (just on paper) for a machine that should only serve HTTPS to the public and allow SSH from your own admin network. Order the rules correctly and finish with a default-deny. Then check: is there any "any/any" allow that could undo your policy?',
      hints: [
        'Rule 1: allow your admin network → the server on port 22 (SSH).',
        'Rule 2: allow any source → the server on port 443 (HTTPS).',
        'Final rule: deny everything else (default-deny).',
        'Review: no rule should allow "any to any on any port" — that would defeat the whole set.'
      ]
    },
    challenge: {
      kind: 'analyze',
      title: 'Find the rule that breaks everything',
      brief: 'This firewall was carefully written, but someone added one rule while debugging and never removed it. That rule is overly permissive (any source, any destination, any port, ALLOW) and, because the first match wins, it silently overrides the default-deny. Identify it. The flag is ARETE{rule_N_any_any} where N is its rule number.',
      material: [
        {
          type: 'table',
          columns: ['#', 'Source', 'Destination', 'Port', 'Action'],
          rows: [
            ['1', '10.0.0.0/24', 'web-server', '443', 'ALLOW'],
            ['2', '10.0.0.0/24', 'web-server', '22', 'ALLOW'],
            ['3', 'any', 'mail-server', '993', 'ALLOW'],
            ['4', '10.0.1.0/24', 'db-server', '3306', 'ALLOW'],
            ['5', 'any', 'web-server', '80', 'DENY'],
            ['6', '192.168.5.0/24', 'web-server', '8080', 'ALLOW'],
            ['7', 'any', 'any', 'any', 'ALLOW'],
            ['8', 'any', 'any', 'any', 'DENY']
          ]
        }
      ],
      flagFormat: 'ARETE{rule_N_any_any}',
      flagHash: '0ece608d6431f3392dc01cf1225f7f6082eb8ef7f14bc83c2100935ed6147b9d',
      hints: [
        'Scan the Action column for an ALLOW whose source, destination, and port are all "any".',
        'Rule 7 allows any→any on any port. Sitting above the default-deny (rule 8), it lets all traffic through.',
        'The flag uses that rule number: ARETE{rule_7_any_any}.'
      ],
      writeup: 'Rule 7 (any/any/any ALLOW) is the culprit, so the flag is ARETE{rule_7_any_any}. Because firewalls take the first matching rule, this broad permit matches every packet before the default-deny on rule 8 is ever reached — turning the firewall off in practice. This is a genuinely common real-world misconfiguration: a temporary "allow all" added to diagnose a problem and forgotten. Auditing rule sets for stray any/any permits, and keeping the default-deny truly last, is exactly the defensive discipline this closing room is about.'
    }
  }
];

export function getSecurityModuleById(id) {
  return securityModules.find((m) => m.id === id) || null;
}
