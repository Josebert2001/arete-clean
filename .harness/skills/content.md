# Skill: Content Editing (Modules, Courses, Data)

## Trigger
User wants to add, edit, or fix course content, module theory/code/quiz/project, cheatsheet entries, or track metadata.

## Context needed — read these first
- The specific data file for the content being changed:
  - Java: `src/data/modules.js`
  - Python: `src/data/pythonModules.js`
  - C: `src/data/cModules.js`
  - Courses (100L–400L): `src/data/courses.js` (~2131 lines — read only the relevant section)
  - Track config: `src/data/trackConfig.js`
- `scripts/validate-modules.mjs` — understand what structure it enforces before editing

## Steps
1. Read the relevant section of the data file — do not read `courses.js` entirely if only one course needs editing
2. Understand the existing data shape (each module has: `id`, `title`, `theory`, `code`, `quiz` array, `project`)
3. Make the targeted edit — match the existing data structure exactly
4. Run `npm run validate` after any module data change
5. Spot-check the result in the browser if `npm run dev` is running

## Module Data Structure (enforce this)
```js
{
  id: 1,
  title: 'Module Title',
  theory: 'HTML or plain text theory content',
  code: `// Example code`,
  quiz: [
    {
      question: 'Question text?',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,          // index of correct option
      explanation: 'Why A is correct'
    },
    // 7 questions total
  ],
  project: 'Project description text'
}
```

## Guardrails
- Do not change module `id` values — they are used as keys in progress tracking (localStorage + Supabase)
- Quizzes must have exactly 7 questions per module
- Do not add HTML tags to quiz questions/options — plain text only
- Do not edit `src/data/courses.js` without reading the surrounding course structure first (it is large and structured)
- Run `npm run validate` before considering content work done

## Eval
- [ ] `npm run validate` passes with no errors
- [ ] Module renders correctly at `/tracks/:lang/:id`
- [ ] Quiz works (all 7 questions navigate, correct answer is marked)
- [ ] Existing module IDs unchanged

## Example
Input: "Fix the explanation for Python module 3, question 2"
- Read `src/data/pythonModules.js`, find module id 3, find quiz[1]
- Update the `explanation` field
- Run `npm run validate`
