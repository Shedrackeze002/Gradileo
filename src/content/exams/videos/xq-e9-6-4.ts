import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 6.4 (punctuation for effect). The question is the Standards and Testing
// Agency's own, word for word: 2025 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 14, reused under the Open Government Licence v3.0. The answer is dashes: a pair of dashes, like
// a pair of brackets, can mark off extra information (parenthesis).

export default englishExam({
  lesson: 'e9-6-4',
  ...ks2(2025, 14),
  title: 'What Could Replace the Brackets in This Sentence?',
  thumbnailTitle: 'Dashes and Brackets',
  subtitle: 'Punctuation for parenthesis, step by step',
  summary:
    'A real test question, solved one small step at a time: in “Tokyo (the capital of Japan) is one of the largest cities in the world”, what punctuation could replace the brackets? We find the extra information, learn which marks can enclose it, and test each choice.',
  intro: ks2Intro('dashes and brackets'),
  question: {
    prompt: 'What punctuation could be used instead of brackets in the sentence below?<br>Tokyo (the capital of Japan) is one of the largest cities in the world.',
    text: 'What punctuation could be used instead of brackets in the sentence below? Tokyo (the capital of Japan) is one of the largest cities in the world. Tick one.',
    choices: ['hyphens', 'colons', 'semi-colons', 'dashes'],
    answer: 3,
    working: 'A **pair** of dashes can mark off extra information, just like brackets: *Tokyo – the capital of Japan – is…*',
    say: [
      'What punctuation could be used instead of brackets in the sentence below? Tick one.',
      'Tokyo, open bracket, the capital of Japan, close bracket, is one of the largest cities in the world. A: hyphens. B: colons. C: semi-colons. D: dashes.',
    ],
  },
  ask: [
    ['The brackets hold **extra** information', 'The brackets hold extra information.'],
    ['What **else** could hold it?', 'We need another punctuation mark that could do the same job.'],
  ],
  know: {
    title: 'Dashes, brackets and ellipses',
    md: '**Parenthesis** is extra information added to a sentence. It can be marked off by a **pair** of **brackets** ( ), **dashes** – –, or **commas** , ,. Dashes feel more **dramatic**, brackets **quieter**. An **ellipsis** (…) shows words left out, or a sentence **trailing off**. A **hyphen** (-) joins words (*well-known*); it does not mark off information.',
    say: [
      'Here is the idea we need. Parenthesis is extra information added to a sentence. It can be marked off by a pair of brackets, a pair of dashes, or a pair of commas. Dashes feel more dramatic, and brackets feel quieter.',
      'An ellipsis, three dots, shows words left out or a sentence trailing off. And a hyphen joins words, like well-known. It does not mark off information.',
    ],
  },
  plan: [
    ['Find the **extra** information', 'Here is the plan. First, find the extra information.'],
    ['Test each **mark** in place of the brackets', 'Second, test each mark in place of the brackets.'],
  ],
  steps: [
    scene('Step 1: The extra information', [quote('p', ['Tokyo [[theta:(the capital of Japan)]] is one of the largest cities in the world.']), text('n', 'Remove it: *Tokyo is one of the largest cities in the world.* Still **complete**.')], [
      { say: 'Step one. The extra information is the capital of Japan. Take it out, and the sentence still works: Tokyo is one of the largest cities in the world.', show: ['p', 'n'] },
    ]),
    scene('Step 2: Test each mark', [table('t', ['Mark', 'Can it mark off extra information?'], [['hyphens -', '[[bad:✗ they join words]]'], ['colons :', '[[bad:✗ they introduce a list or explanation]]'], ['semi-colons ;', '[[bad:✗ they join main clauses]]'], ['dashes – –', '[[good:✓ a pair encloses it, like brackets]]']]), text('a', 'Tokyo **–** the capital of Japan **–** is one of the largest cities… → **D**', 'lg')], [
      { say: 'Step two. Hyphens join words, like well-known. Colons introduce a list or explanation. Semicolons join main clauses.', show: ['t.0', 't.1', 't.2'] },
      { say: 'Dashes, used as a pair, can mark off extra information just like brackets. Tokyo, dash, the capital of Japan, dash, is one of the largest cities in the world. The answer is D.', show: ['t.3', 'a'], focus: 't.3' },
    ]),
  ],
  check: [
    ['Commas could also work, but they are **not** a choice', 'Let us check. A pair of commas could also work, but commas are not one of the choices.'],
    ['Of the four, only **dashes** do the job', 'Of the four choices, only dashes do the job. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Hyphens **look** like dashes, but are shorter and **join** words', 'Choice A is the trap. Hyphens look like dashes, but they are shorter, and they join words together.'],
      ['B', 'Colons introduce a **list** or **explanation**', 'Choice B: colons introduce a list or an explanation.'],
      ['C', 'Semi-colons join **main clauses**', 'Choice C: semicolons join main clauses.'],
    ],
  },
  yourTurn: {
    prompt: 'What is the **effect** of the ellipsis in *“I slowly opened the door…”*?',
    choices: ['It introduces a list.', 'It shows a question.', 'It joins two main clauses.', 'It creates suspense, as if the sentence trails off.'],
    answer: 3,
    working: 'The sentence **trails off**, leaving us waiting: **suspense**.',
    ask: 'What is the effect of the ellipsis in, I slowly opened the door, dot dot dot? A: It introduces a list. B: It shows a question. C: It joins two main clauses. D: It creates suspense, as if the sentence trails off.',
    reveal: 'The answer is D. The sentence trails off, so we are left waiting to find out what is behind the door.',
  },
  sum: [
    ['**Brackets**, **dashes** or **commas** mark off extra information', 'Here is what to remember. A pair of brackets, dashes or commas can mark off extra information.'],
    ['**Hyphens** join words; they are not dashes', 'Hyphens join words, and they are not dashes.'],
    ['An **ellipsis** can build **suspense**', 'And an ellipsis can build suspense. For more on punctuation for effect, watch this lesson’s explainer video on Gradileo.'],
  ],
});
