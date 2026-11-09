// CYB 211 — Practice quiz bank, drawn topic by topic from
// src/data/lectureNotes/cyb211.js. One shared bank imported by both
// catalogues; questions follow the notes, not either catalogue outline.
// Every chapter matches a Notes heading. CourseQuiz draws a fresh sample
// and Quiz shuffles options per attempt; no answer depends on position.
// General MCQ practice: the examination format is not yet confirmed.

export const cyb211Quiz = [
  {
    "chapter": "International Law and Regulation",
    "question": "What do general cybersecurity regulations govern?",
    "options": [
      "Secure use and management of systems and data",
      "Only the physical design of computer components",
      "Only the sale of software across national borders",
      "Replacement of all technical security controls"
    ],
    "correctIndex": 0,
    "explanation": "International Law and Regulation — General Regulations in Cyber Security: The definition covers secure use, protection and management of information systems and data."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which trio appears among the objectives of cybersecurity regulations?",
    "options": [
      "Connectivity, capacity, compatibility",
      "Confidentiality, integrity, availability",
      "Encryption, compression, replication",
      "Authenticity, anonymity, profitability"
    ],
    "correctIndex": 1,
    "explanation": "International Law and Regulation — Key Objectives: The objectives explicitly name confidentiality, integrity and availability of information."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which is the listed information security standard?",
    "options": [
      "NDPR",
      "RSA",
      "ISO/IEC 27001",
      "GDPR"
    ],
    "correctIndex": 2,
    "explanation": "International Law and Regulation — Examples of General Cyber Security Regulations: The examples distinguish ISO/IEC 27001 from data protection regulations such as GDPR and NDPR."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Why do regulations matter for digital systems?",
    "options": [
      "They replace the need to protect personal data",
      "They prevent all differences in national laws",
      "They make attribution unnecessary in every case",
      "They promote trust and support enforcement"
    ],
    "correctIndex": 3,
    "explanation": "International Law and Regulation — Importance of General Cyber Security Regulations: The importance list includes trust, reduced cyber risk and a legal framework for enforcement."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "What makes the notes' definition of international cybercrime law international?",
    "options": [
      "Computer-related crime across borders",
      "Computer-related crime within one office",
      "Computer-related crime without any victim",
      "Computer-related crime using only public data"
    ],
    "correctIndex": 0,
    "explanation": "International Law and Regulation — International Law for Cybercrime: The definition addresses crime through or against computers across national borders."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "An attack crosses countries with different laws. Which listed challenge follows?",
    "options": [
      "Loss of storage capacity",
      "Conflict of jurisdiction",
      "Lack of data minimisation",
      "Choice of encryption keys"
    ],
    "correctIndex": 1,
    "explanation": "International Law and Regulation — Challenges of Cyber Security Regulations: The challenges include jurisdictional conflict and differences in national laws."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Difficulty identifying who carried out an attack is which listed challenge?",
    "options": [
      "Access control",
      "Data masking",
      "Attribution",
      "Anonymisation"
    ],
    "correctIndex": 2,
    "explanation": "International Law and Regulation — Challenges of Cyber Security Regulations: The list explicitly names difficulties in the attribution of cyber attacks."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Who leads the framework called a national cybersecurity policy?",
    "options": [
      "A single employee",
      "A private attacker",
      "An individual customer",
      "Government"
    ],
    "correctIndex": 3,
    "explanation": "International Law and Regulation — National Cyber Security Policy: The policy is defined as a government-led framework protecting national cyberspace, infrastructure and citizens."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which is a listed critical infrastructure sector?",
    "options": [
      "Healthcare",
      "Online advertising",
      "Personal entertainment",
      "Desktop customisation"
    ],
    "correctIndex": 0,
    "explanation": "International Law and Regulation — Key Components of a National Cyber Security Policy: The critical infrastructure examples are finance, telecommunications and healthcare."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which component supports preparedness through skills and awareness?",
    "options": [
      "Critical infrastructure protection",
      "Capacity building and public awareness",
      "Legal and regulatory framework",
      "Public-private partnership"
    ],
    "correctIndex": 1,
    "explanation": "International Law and Regulation — Key Components of a National Cyber Security Policy: Capacity building and public awareness are explicitly listed as a national policy component."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which is listed as a data privacy protection method?",
    "options": [
      "Online fraud",
      "Malware distribution",
      "Data minimisation",
      "Identity theft"
    ],
    "correctIndex": 2,
    "explanation": "International Law and Regulation — Data Privacy Protection Methods: Data minimisation appears in the protection methods; theft, fraud and malware are listed as cybercrime."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Collecting only data needed for a stated purpose reflects which listed principle?",
    "options": [
      "Collecting data without a defined purpose",
      "Retaining all records without updating them",
      "Making personal information freely accessible",
      "Adequacy, relevance and necessity"
    ],
    "correctIndex": 3,
    "explanation": "International Law and Regulation — Core Principles of the GDPR on Collecting, Storing and Using Personal Data: The third listed principle limits data to what is necessary for its purposes."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which practice follows the notes' accuracy principle?",
    "options": [
      "Keep personal data up to date",
      "Collect data for unspecified purposes",
      "Use data without informing its subject",
      "Store irrelevant data for every possible use"
    ],
    "correctIndex": 0,
    "explanation": "International Law and Regulation — Core Principles of the GDPR on Collecting, Storing and Using Personal Data: The fourth listed principle requires accuracy and updates where necessary."
  },
  {
    "chapter": "International Law and Regulation",
    "question": "Which description matches the first listed processing principle?",
    "options": [
      "Unrestricted, informal and permanent",
      "Lawful, fair and transparent",
      "Secret, unlimited and indefinite",
      "Automatic, public and anonymous"
    ],
    "correctIndex": 1,
    "explanation": "International Law and Regulation — Core Principles of the GDPR on Collecting, Storing and Using Personal Data: The first principle requires lawful, fair and transparent processing in relation to the data subject."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which property means detecting unauthorised modification of data?",
    "options": [
      "Authenticity",
      "Non-repudiation",
      "Integrity",
      "Confidentiality"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Cryptography Enables: Integrity detects unauthorised modification and ensures transmitted data has not been altered."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Confirming the identities of communicating parties supports which property?",
    "options": [
      "Confidentiality",
      "Integrity",
      "Non-repudiation",
      "Authenticity"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Cryptography Enables: Authenticity confirms the identities of the parties involved."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which property prevents a party denying involvement in a transaction?",
    "options": [
      "Non-repudiation",
      "Confidentiality",
      "Authenticity",
      "Integrity"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — Cryptography Enables: The notes define non-repudiation as preventing denial of involvement."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Converting plaintext into ciphertext is called what?",
    "options": [
      "Factorisation",
      "Encryption",
      "Decryption",
      "Transposition"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — Key Terms: Encryption transforms plaintext into ciphertext using an algorithm and keys."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which term covers the combination of algorithms, keys and protocols?",
    "options": [
      "Hash value",
      "Public exponent",
      "Cryptosystem",
      "Ciphertext"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Key Terms: The Key Terms list defines a cryptosystem as that combination for secure communication."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "A cipher shifts each letter by a fixed amount. Which type is it?",
    "options": [
      "Transposition",
      "Hash function",
      "Asymmetric key",
      "Substitution"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Classical Cryptography: The Caesar cipher is the substitution example: each plaintext element is replaced."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "A cipher changes character positions but retains the characters. Which type is it?",
    "options": [
      "Transposition",
      "Substitution",
      "Hash function",
      "Symmetric key"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — Classical Cryptography: Transposition rearranges positions without changing the characters themselves."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which system uses the same secret key for encryption and decryption?",
    "options": [
      "Public-key pair",
      "Symmetric key",
      "Asymmetric key",
      "Hash function"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — Modern Cryptography: The symmetric-key entry specifies the same secret key for both operations."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "In the notes' asymmetric encryption description, which key decrypts?",
    "options": [
      "Hash value",
      "Message value",
      "Private key",
      "Public key"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Modern Cryptography: The notes assign public-key encryption and private-key decryption."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "What size hash does SHA-256 produce in the notes?",
    "options": [
      "128 bits",
      "512 bits",
      "256 bytes",
      "256 bits"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Hash Function: The Hash Function definition gives a fixed-size 256-bit hash for SHA-256."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which pair is classified as symmetric algorithms?",
    "options": [
      "AES and DES",
      "RSA and ECC",
      "MD5 and SHA-2",
      "AES and RSA"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — Cryptographic Algorithms: The table places AES and DES under Symmetric."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which algorithm is described as offering similar security with smaller keys?",
    "options": [
      "MD5",
      "ECC",
      "RSA",
      "DES"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — Cryptographic Algorithms: The ECC row states that elliptic curve cryptography offers similar security with smaller keys."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which mathematical problem is associated with RSA?",
    "options": [
      "Elliptic curve discrete logarithm",
      "Fixed-size hashing",
      "Integer factorisation",
      "Discrete logarithm"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Mathematical Foundation: The Mathematical Foundation list associates integer factorisation with RSA."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "For primes p = 7 and q = 11, what is the modulus n?",
    "options": [
      "60",
      "18",
      "66",
      "77"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — The RSA Algorithm: The RSA rule n = p × q gives 7 × 11 = 77."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "For p = 7 and q = 11, what is the totient?",
    "options": [
      "60",
      "77",
      "18",
      "76"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — Example 1: Key Generation (p = 7, q = 11): The example uses (7 − 1)(11 − 1) = 6 × 10 = 60."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which condition must the public exponent e satisfy?",
    "options": [
      "A multiple of the totient",
      "Coprime to the totient",
      "Equal to the modulus",
      "Equal to a prime factor"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — The RSA Algorithm: The algorithm requires gcd(e, φ(n)) = 1 as well as 1 < e < φ(n)."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "With e = 13 and n = 77, which is the public key?",
    "options": [
      "(13, 60)",
      "(7, 11)",
      "(13, 77)",
      "(37, 77)"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Example 1: Key Generation (p = 7, q = 11): The example gives the public key as (e, n) = (13, 77)."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Why is d = 37 valid when e = 13 and the totient is 60?",
    "options": [
      "13 × 37 leaves remainder 0 modulo 60",
      "13 + 37 leaves remainder 1 modulo 60",
      "37 is the quotient when 77 is divided by 13",
      "13 × 37 leaves remainder 1 modulo 60"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Example 1: Key Generation (p = 7, q = 11): The inverse condition is de mod φ(n) = 1; 13 × 37 = 481 = 8 × 60 + 1."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which expression encrypts M in textbook RSA?",
    "options": [
      "$C=M^e\\bmod n$",
      "$C=M^d\\bmod n$",
      "$C=M\\times e\\bmod n$",
      "$C=M^e\\bmod\\varphi(n)$"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — The RSA Algorithm: The displayed encryption rule raises the message to e and reduces modulo n."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "For M = 5, e = 13 and n = 77, what ciphertext is obtained?",
    "options": [
      "13",
      "26",
      "60",
      "37"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — Encryption Example: M = 5: The worked encryption reduces 5^13 modulo 77 to 26."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which plaintext is recovered from C = 26 using (d, n) = (37, 77)?",
    "options": [
      "26",
      "37",
      "5",
      "13"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Decryption Example: C = 26: The decryption example computes 26^37 mod 77 = 5."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Why does the worked calculation reduce after repeated squaring?",
    "options": [
      "To replace encryption with addition",
      "To remove the need for a modulus",
      "To make the public key stay secret",
      "To keep intermediate numbers small"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Encryption Example: M = 5: The explanatory note says repeated squaring keeps numbers small by reducing modulo n at each step."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "What is n for p = 17 and q = 19?",
    "options": [
      "323",
      "288",
      "306",
      "361"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — Example 2: Key Generation (p = 17, q = 19): The example multiplies 17 by 19 to obtain 323."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "What is the totient for p = 17 and q = 19?",
    "options": [
      "306",
      "288",
      "323",
      "322"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — Example 2: Key Generation (p = 17, q = 19): The example computes (17 − 1)(19 − 1) = 16 × 18 = 288."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which private exponent accompanies e = 5 and totient 288?",
    "options": [
      "288",
      "323",
      "173",
      "172"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Example 2: Key Generation (p = 17, q = 19): The example verifies 5 × 173 = 865 and 865 mod 288 = 1."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Encrypting M = 25 with e = 5 and n = 323 gives which ciphertext?",
    "options": [
      "25",
      "173",
      "288",
      "43"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Encryption Example: M = 25: The worked example computes 25^5 mod 323 = 43."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which exponents are combined to obtain 173 in the repeated-squaring example?",
    "options": [
      "128 + 32 + 8 + 4 + 1",
      "128 + 32 + 8 + 2 + 1",
      "128 + 16 + 8 + 4 + 1",
      "128 + 32 + 16 + 4 + 1"
    ],
    "correctIndex": 0,
    "explanation": "Cryptography and the RSA Algorithm — Decryption Example: C = 43: The caption explicitly decomposes 173 into 128 + 32 + 8 + 4 + 1."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "Which private key is given for p = 7, q = 13 and e = 7?",
    "options": [
      "(13, 91)",
      "(31, 91)",
      "(7, 91)",
      "(31, 72)"
    ],
    "correctIndex": 1,
    "explanation": "Cryptography and the RSA Algorithm — Further Worked Example: Key Generation (p = 7, q = 13): The example gives n = 91 and d = 31, so the private key is (31, 91)."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "What ciphertext is produced for M = 24 with e = 7 and n = 91?",
    "options": [
      "31",
      "72",
      "80",
      "24"
    ],
    "correctIndex": 2,
    "explanation": "Cryptography and the RSA Algorithm — Encryption Example: M = 24: The example computes 24^7 mod 91 = 80."
  },
  {
    "chapter": "Cryptography and the RSA Algorithm",
    "question": "What plaintext is recovered from C = 80 with d = 31 and n = 91?",
    "options": [
      "30",
      "80",
      "81",
      "24"
    ],
    "correctIndex": 3,
    "explanation": "Cryptography and the RSA Algorithm — Decryption Example: C = 80: The worked decryption obtains 80^31 mod 91 = 24."
  }
];
