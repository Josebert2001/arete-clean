// CYB 211 — Introduction to Cybersecurity and Strategy
// Transcribed from the lecturer's handwritten notes (19 scanned pages), spelling
// and grammar lightly normalised.
//
// Two topics so far, in the order of the notes:
//   1. International Law and Regulation
//   2. Cryptography (dated 19/1/2026), with three RSA worked examples
//
// Every RSA figure was recomputed with modular arithmetic; all three examples
// check out. The two arithmetic slips in the handwriting (13 × 57 for 13 × 37,
// and a base of 27 for 26) are corrected and marked with a `note`. Technical
// and legal clarifications sit in `note` sections ("Added for clarity") beside
// the passage they qualify, rather than in a separate appendix.
//
// Both diagrams in the scans restate the surrounding text (the classical vs
// modern branch, and the hash-function branch), so they are not reproduced.
//
// Shared by the Cybersecurity and Data Science catalogues; each records which
// outline items these topics reach as `noteCoverage` on its own course entry.

export const cyb211LectureNotes = [
  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 1 — INTERNATIONAL LAW AND REGULATION
  // ─────────────────────────────────────────────────────────────────
  {
    number: '1',
    title: 'International Law and Regulation',
    sections: [
      {
        type: 'definition',
        heading: 'General Regulations in Cyber Security',
        text: 'General regulations refer to the laws, rules and standards established to govern the secure use, protection and management of information systems and data.',
      },
      {
        type: 'bullets',
        heading: 'Key Objectives',
        items: [
          '1. Protecting the confidentiality, integrity and availability of information.',
          '2. Safeguarding personal and organisational data.',
          '3. Ensuring accountability and compliance in digital operations.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Examples of General Cyber Security Regulations',
        items: [
          '1. Data protection regulations (GDPR, NDPR) — also called data privacy and breach notification laws.',
          '2. Information security standards, e.g. ISO/IEC 27001.',
          '3. Industry-specific regulations, e.g. banking, healthcare, telecommunications.',
        ],
      },
      {
        type: 'note',
        text: 'Nigeria\'s data protection framework now also includes the Nigeria Data Protection Act 2023, administered by the Nigeria Data Protection Commission; the NDPR alone is not a complete current picture.',
      },
      {
        type: 'bullets',
        heading: 'Importance of General Cyber Security Regulations',
        items: [
          '1. They help to reduce cyber risk and data breaches.',
          '2. They promote trust in digital systems.',
          '3. They provide a legal framework for prosecution and enforcement.',
        ],
      },
      {
        type: 'definition',
        heading: 'International Law for Cybercrime',
        text: 'International law for cybercrime addresses criminal activities conducted through or against computer systems across national borders.',
      },
      {
        type: 'bullets',
        heading: 'Nature of Cybercrime',
        items: [
          '1. Hacking and unauthorised access.',
          '2. Identity theft and online fraud.',
          '3. Cyber espionage and cyber terrorism.',
          '4. Malware distribution and ransomware attacks.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Challenges of Cyber Security Regulations',
        items: [
          '1. Conflict of jurisdiction.',
          '2. Differences in national laws.',
          '3. Difficulties in the attribution of cyber attacks.',
        ],
      },
      {
        type: 'definition',
        heading: 'National Cyber Security Policy',
        text: 'A national cyber security policy is a government-led framework designed to protect the country\'s cyberspace, digital infrastructure and citizens.',
      },
      {
        type: 'bullets',
        heading: 'Key Components of a National Cyber Security Policy',
        items: [
          '1. Legal and regulatory framework.',
          '2. Protection of critical infrastructure (finance, telecommunications, healthcare).',
          '3. Incident response and coordination mechanism.',
          '4. Capacity building and public awareness.',
          '5. Public–private partnership.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Impact of Cyber Security — Negative Impact',
        items: [
          'Loss of data.',
          'Loss of revenue.',
          'Business discontinuity.',
          'Destruction of critical national infrastructure.',
        ],
      },
      {
        type: 'note',
        text: 'These are the harms of cyber incidents — of attacks, or of failed security — not harms caused by security itself.',
      },
      {
        type: 'bullets',
        heading: 'Data Privacy Protection Methods',
        items: [
          '1. Encryption.',
          '2. Access control.',
          '3. Anonymisation.',
          '4. Synonymisation.',
          '5. Pseudonymisation.',
          '6. Secure storage and backup.',
          '7. Data minimisation.',
          '8. Data masking.',
          '9. Regular updates.',
          '10. Employee education and awareness.',
        ],
      },
      {
        type: 'note',
        text: '"Synonymisation" is clearly legible in the notes, but it is not a standard privacy term and its intended meaning is uncertain. It has been left as written rather than replaced with a guess.',
      },
      {
        type: 'definition',
        heading: 'GDPR — General Data Protection Regulation',
        text: 'The GDPR is an EU-wide data privacy law that aims to strengthen individuals\' fundamental rights in the digital age relating to the protection of their personal data and privacy. Even though the GDPR is enacted and effective in Europe, its reach goes beyond the EU, to companies offering goods and services to EU residents.',
      },
      {
        type: 'text',
        text: 'In terms of the existing framework, the GDPR was established on April 14, 2016 and became effective on May 25, 2018. It is the most recent comprehensive international regulation on privacy.',
      },
      {
        type: 'note',
        items: [
          'The GDPR\'s formal identity is Regulation (EU) 2016/679, dated 27 April 2016; it has applied since 25 May 2018. (14 April 2016 is when the European Parliament adopted it — use 27 April as the regulation\'s date.)',
          'Its territorial scope (Article 3) is defined more precisely than "EU residents": it covers certain processing of personal data of people who are in the Union.',
          'The claim that it is the most recent comprehensive international privacy regulation is the lecture\'s, and is not verified here.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Core Principles of the GDPR on Collecting, Storing and Using Personal Data',
        items: [
          '1. Personal data must be processed lawfully, fairly and in a transparent manner in relation to the data subject.',
          '2. It must be collected for specified, explicit and legitimate purposes.',
          '3. It must be adequate, relevant and limited to what is necessary in relation to the purposes for which it is processed.',
          '4. It must be accurate and, where necessary, kept up to date.',
        ],
      },
      {
        type: 'note',
        text: 'The notes list four principles. Article 5 of the GDPR has three more: storage limitation (kept no longer than necessary), integrity and confidentiality (processed securely), and accountability (the controller must be able to demonstrate compliance).',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  //  TOPIC 2 — CRYPTOGRAPHY (19/1/2026)
  // ─────────────────────────────────────────────────────────────────
  {
    number: '2',
    title: 'Cryptography and the RSA Algorithm',
    sections: [
      {
        type: 'definition',
        heading: 'Cryptography',
        date: '19/1/2026',
        text: 'Cryptography is the science of designing techniques to secure communication and data from unauthorised access. It involves transforming readable data into an unreadable format to protect its confidentiality, integrity and authenticity.',
      },
      {
        type: 'text',
        text: 'It can also be seen as the practice and study of techniques for secure communication in the presence of intruders or adversaries. It enables confidentiality, integrity, authenticity and non-repudiation.',
      },
      {
        type: 'termlist',
        heading: 'Cryptography Enables',
        items: [
          { term: 'Confidentiality', def: 'Keeping information secret from unauthorised parties.' },
          { term: 'Integrity', def: 'Detecting unauthorised modification of data. It ensures that your data has not been altered during transmission.' },
          { term: 'Authenticity', def: 'Confirming the identities of the parties involved.' },
          { term: 'Non-repudiation', def: 'Preventing parties from denying their involvement in a transaction.' },
        ],
      },
      {
        type: 'text',
        text: 'Early cryptography included simple substitution ciphers like the Caesar cipher. Over time, cryptography evolved into complex mathematical algorithms used in digital security.',
      },
      {
        type: 'termlist',
        heading: 'Key Terms',
        items: [
          { term: 'Encryption', def: 'The process of converting plaintext to ciphertext using an algorithm and keys.' },
          { term: 'Decryption', def: 'The process of converting ciphertext back to plaintext.' },
          { term: 'Key', def: 'A secret or public value used in the encryption and decryption processes to control the transformation.' },
          { term: 'Cryptosystem', def: 'The combination of algorithms, keys and protocols used for secure communication.' },
        ],
      },
      {
        type: 'text',
        text: 'Cryptography can be categorised or classified into two: (1) classical cryptography, and (2) modern cryptography.',
      },
      {
        type: 'termlist',
        heading: 'Classical Cryptography',
        items: [
          { term: 'Substitution cipher', def: 'Replaces each element of the plaintext with another element based on a fixed system, e.g. the Caesar cipher, which shifts each letter by a fixed number.' },
          { term: 'Transposition cipher', def: 'Rearranges the positions of characters in the plaintext without changing the characters themselves.' },
        ],
      },
      {
        type: 'termlist',
        heading: 'Modern Cryptography',
        items: [
          { term: 'Symmetric key cryptography', def: 'Uses the same secret key for both encryption and decryption.' },
          { term: 'Asymmetric key cryptography', def: 'Uses a pair of keys: a public key and a private key. Public key — encryption. Private key — decryption.' },
        ],
      },
      {
        type: 'definition',
        heading: 'Hash Function',
        text: 'A hash function transforms data into a fixed-size hash value. It is used for data integrity verification, e.g. SHA-256 produces a 256-bit hash.',
      },
      {
        type: 'table',
        heading: 'Cryptographic Algorithms',
        headers: ['Kind', 'Algorithm', 'Notes'],
        rows: [
          ['Symmetric', 'AES', 'Advanced Encryption Standard'],
          ['Symmetric', 'DES', 'Data Encryption Standard'],
          ['Asymmetric', 'RSA', 'Rivest–Shamir–Adleman; based on the difficulty of factoring'],
          ['Asymmetric', 'ECC', 'Elliptic Curve Cryptography — offers similar security with smaller keys'],
          ['Hash function', 'SHA-2 family', ''],
          ['Hash function', 'MD5', ''],
        ],
      },
      {
        type: 'note',
        items: [
          'The notes say RSA is "based on the difficulty of factoring large prime numbers". Precisely: RSA rests on the difficulty of factoring a large composite number n = p × q back into its two prime factors. A prime has no factors to find.',
          'DES and MD5 are historical examples, not choices for new systems. NIST withdrew DES in 2005 and disallowed Triple DES for new encryption after 2023; MD5 is broken wherever collision resistance is needed.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Mathematical Foundation',
        items: [
          '1. Integer factorisation (RSA).',
          '2. The discrete logarithm problem (e.g. Diffie–Hellman, DSA): security comes from the difficulty of solving $a^x \\equiv b \\pmod p$ for $x$. For example, 5 mod 3 = 2 and 6 mod 2 = 0.',
          '3. The elliptic curve discrete logarithm problem (e.g. ECDH, ECDSA): a harder variant of the same problem, which is why ECC needs smaller keys.',
        ],
      },
      {
        type: 'note',
        text: 'The notes write "discrete algorithm/logarithm" and "used to solve harder problems". The term is discrete logarithm, and ECC does not solve that problem — its security depends on the problem being hard to solve.',
      },
      {
        type: 'bullets',
        heading: 'The RSA Algorithm',
        items: [
          '1. Choose two large primes p and q.',
          '2. Compute $n = p \\times q$.',
          '3. Compute $\\varphi(n) = (p - 1)(q - 1)$.',
          '4. Choose e such that $1 < e < \\varphi(n)$ and $\\gcd(e, \\varphi(n)) = 1$.',
          '5. Compute d such that $d \\times e \\equiv 1 \\pmod{\\varphi(n)}$.',
          '6. Public key: (e, n); private key: (d, n).',
        ],
      },
      {
        type: 'math',
        tex: '\\text{Encryption: } C = M^e \\bmod n \\qquad\\qquad \\text{Decryption: } M = C^d \\bmod n',
      },
      {
        type: 'text',
        text: 'RSA is an asymmetric encryption algorithm: the public key is used for encryption, the private key for decryption. A margin exercise in the notes asks: find p and q such that p × q = 143 (the margin also works p − 1 = 10 and q − 1 = 13 − 1 = 12).',
      },
      {
        type: 'note',
        text: 'Check (added, not in the notes): 143 = 11 × 13, so φ(143) = 10 × 12 = 120.',
      },
      {
        type: 'bullets',
        heading: 'Example 1: Key Generation (p = 7, q = 11)',
        items: [
          'Step 1: Choose two prime numbers: p = 7, q = 11.',
          'Step 2: Calculate n (the modulus): n = p × q = 7 × 11 = 77. This determines the maximum message size.',
          'Step 3: Euler\'s totient function: φ(n) = (p − 1) × (q − 1) = 6 × 10 = 60.',
          'Step 4: Choose the public exponent e such that 1 < e < φ(n), i.e. 1 < e < 60, with e and φ(n) coprime: gcd(e, φ(n)) = 1. Let us choose e = 13; gcd(13, 60) = 1. Public key = (e, n) = (13, 77).',
          'Step 5: Calculate the private exponent d such that (d × e) mod φ(n) = 1, i.e. 13d mod 60 = 1. When d = 37, 13 × 37 mod 60 = 1. So d = 37 and the private key = (d, n) = (37, 77).',
        ],
      },
      {
        type: 'note',
        text: 'Corrected: the handwritten line reads "13 × 57 mod 60 = 1" while choosing d = 37. 13 × 37 = 481 and 481 mod 60 = 1 ✓; 13 × 57 mod 60 is 21.',
      },
      {
        type: 'math',
        heading: 'Encryption Example: M = 5',
        tex: '\\begin{aligned} C &= M^e \\bmod n = 5^{13} \\bmod 77 \\\\ 5^4 &= 625;\\quad 625 \\bmod 77 = 9 \\\\ 5^8 &= 5^4 \\times 5^4 \\to 9^2 = 81;\\quad 81 \\bmod 77 = 4 \\\\ 5^{13} &= 5^8 \\times 5^4 \\times 5^1 \\to 4 \\times 9 \\times 5 = 180 \\\\ 180 \\bmod 77 &= 26 \\\\ C &= 26 \\end{aligned}',
      },
      {
        type: 'math',
        heading: 'Decryption Example: C = 26',
        tex: '\\begin{aligned} M &= C^d \\bmod n = 26^{37} \\bmod 77 \\\\ 26^2 &= 676;\\quad 676 \\bmod 77 = 60 \\\\ 26^4 &\\to 60^2 = 3600;\\quad 3600 \\bmod 77 = 58 \\\\ 26^8 &\\to 58^2 = 3364;\\quad 3364 \\bmod 77 = 53 \\\\ 26^{16} &\\to 53^2 = 2809;\\quad 2809 \\bmod 77 = 37 \\\\ 26^{32} &\\to 37^2 = 1369;\\quad 1369 \\bmod 77 = 60 \\\\ 26^{37} &= 26^{32} \\times 26^4 \\times 26^1 \\to 60 \\times 58 \\times 26 = 90480 \\\\ 90480 \\div 77 &\\approx 1175.0649;\\quad 1175 \\times 77 = 90475 \\\\ 90480 - 90475 &= 5 \\;\\Rightarrow\\; M = 5 \\end{aligned}',
      },
      {
        type: 'note',
        items: [
          'Corrected: the handwritten decomposition begins "27³⁷" but every factor uses base 26 — the ciphertext. (The notes also give the quotient as exactly 1175.064; it is ≈ 1175.0649.)',
          'How to read these lines: an arrow means "reduce, then carry on". 5⁴ is 625, and 625 mod 77 is 9 — it is not true that 5⁴ = 9. Repeated squaring keeps every number small by reducing mod n after each step.',
        ],
      },
      {
        type: 'bullets',
        heading: 'Example 2: Key Generation (p = 17, q = 19)',
        items: [
          'Step 1: p = 17, q = 19.',
          'Step 2: n = p × q = 17 × 19 = 323.',
          'Step 3: φ(n) = (p − 1) × (q − 1) = 16 × 18 = 288.',
          'Step 4: 1 < e < 288 with gcd(e, 288) = 1. Let us choose e = 5. Public key = (e, n) = (5, 323).',
          'Step 5: Find d such that 5d mod 288 = 1: d = 173, since 5 × 173 = 865 and 865 mod 288 = 1. Private key = (d, n) = (173, 323).',
        ],
      },
      {
        type: 'math',
        heading: 'Encryption Example: M = 25',
        tex: '\\begin{aligned} C &= 25^5 \\bmod 323 = 9765625 \\bmod 323 \\\\ 9765625 - 9765582 &= 43 \\;\\Rightarrow\\; C = 43 \\end{aligned}',
      },
      {
        type: 'math',
        heading: 'Decryption Example: C = 43',
        tex: '\\begin{aligned} M &= 43^{173} \\bmod 323 \\\\ 43^1 &\\to 43 \\\\ 43^2 &= 1849 \\to 234 \\\\ 43^4 &\\to 234^2 = 54756 \\to 169 \\\\ 43^8 &\\to 169^2 = 28561 \\to 137 \\\\ 43^{16} &\\to 137^2 = 18769 \\to 35 \\\\ 43^{32} &\\to 35^2 = 1225 \\to 256 \\\\ 43^{64} &\\to 256^2 = 65536 \\to 290 \\\\ 43^{128} &\\to 290^2 = 84100 \\to 120 \\\\ 43^{173} &= 43^{128} \\times 43^{32} \\times 43^8 \\times 43^4 \\times 43^1 \\\\ &\\to (120 \\times 256 \\times 137 \\times 169 \\times 43) \\bmod 323 \\\\ &= 30584186880 \\bmod 323 = 25 \\end{aligned}',
        caption: 'Every arrow is a reduction mod 323. The exponents 128 + 32 + 8 + 4 + 1 add up to 173.',
      },
      {
        type: 'bullets',
        heading: 'Further Worked Example: Key Generation (p = 7, q = 13)',
        items: [
          'Choose two prime numbers: p = 7, q = 13.',
          'Calculate n: n = 7 × 13 = 91.',
          'Calculate φ(n): (7 − 1) × (13 − 1) = 6 × 12 = 72.',
          'Choose the public exponent: 1 < e < 72 with gcd(e, 72) = 1. Let us choose e = 7. Public key = (e, n) = (7, 91).',
          'Choose the private exponent d such that 7d mod 72 = 1. Private key = (d, n) = (31, 91).',
          'Message M = 24.',
        ],
      },
      {
        type: 'note',
        text: 'The notes leave gcd(e, 72) unfinished; for e = 7 it is 1. And d = 31 works because 7 × 31 = 217 = 3 × 72 + 1.',
      },
      {
        type: 'math',
        heading: 'Encryption Example: M = 24',
        tex: '\\begin{aligned} C &= 24^7 \\bmod 91 = 4586471424 \\bmod 91 \\\\ 4586471424 - 4586471344 &= 80 \\;\\Rightarrow\\; C = 80 \\end{aligned}',
      },
      {
        type: 'math',
        heading: 'Decryption Example: C = 80',
        tex: '\\begin{aligned} M &= 80^{31} \\bmod 91 \\\\ 80^1 &\\to 80 \\\\ 80^2 &= 6400;\\quad 6400 - 6370 = 30 \\\\ 80^4 &\\to 30^2 = 900;\\quad 900 - 819 = 81 \\\\ 80^8 &\\to 81^2 = 6561;\\quad 6561 - 6552 = 9 \\\\ 80^{16} &\\to 9^2 = 81 \\\\ 80^{31} &= 80^{16} \\times 80^8 \\times 80^4 \\times 80^2 \\times 80^1 \\\\ &\\to 81 \\times 9 \\times 81 \\times 30 \\times 80 = 141717600 \\\\ 141717600 - 141717576 &= 24 \\;\\Rightarrow\\; M = 24 \\end{aligned}',
      },
      {
        type: 'note',
        items: [
          'The notes omit the modulus on the 80¹⁶ line; it is 91, as everywhere else in this example.',
          'All three examples were recomputed independently and every residue checks out: (p, q, n, φ, e, d, M, C) = (7, 11, 77, 60, 13, 37, 5, 26), (17, 19, 323, 288, 5, 173, 25, 43), (7, 13, 91, 72, 7, 31, 24, 80).',
          'These small numbers demonstrate "textbook" RSA only. Real RSA uses primes hundreds of digits long and a padding scheme such as RSA-OAEP (RFC 8017) — raw M^e mod n is insecure.',
        ],
      },
    ],
  },
];
