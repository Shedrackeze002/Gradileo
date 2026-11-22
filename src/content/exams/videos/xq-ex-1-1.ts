import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 1.1 (evaluating a statement). An exam-style question we wrote, in the style
// of a GCSE English Language exam, on a short passage we wrote ourselves. The answer is C: Mara's
// trembling hands most challenge the statement that she is fearless.

const LINES = ['Mara stood at the very edge of the platform and lifted her chin as the train screamed in. She did not step back. Only her hands, pushed deep into her pockets, trembled, and she curled them into fists so that no one would see.'];

export default englishExam({
  lesson: 'ex-1-1',
  ...ours('a GCSE English Language exam', 'the passage was written by Gradileo'),
  title: 'Which Quotation Challenges “Mara Is Fearless”?',
  thumbnailTitle: 'How Far Do You Agree?',
  subtitle: 'Evaluating a statement, step by step',
  summary:
    'An exam-style question on evaluating a statement, solved one small step at a time. A student says that in this passage the writer presents Mara as fearless. We sort the evidence into what supports the statement and what challenges it.',
  intro: [
    'In this video, we solve an exam-style question about evaluating a statement. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and the passage ourselves, in the style of a GCSE English Language exam.',
  ],
  passage: {
    lines: LINES,
    by: 'A passage written by Gradileo',
    say: ['First, read the passage. Mara stood at the very edge of the platform and lifted her chin as the train screamed in. She did not step back. Only her hands, pushed deep into her pockets, trembled, and she curled them into fists so that no one would see.'],
  },
  question: {
    prompt: 'A student says: *“The writer presents Mara as completely fearless.”* Which quotation most **challenges** this statement?',
    text: 'Read the passage. A student says: The writer presents Mara as completely fearless. Which quotation most challenges this statement?',
    choices: ['“stood at the very edge of the platform”', '“lifted her chin”', '“her hands… trembled”', '“She did not step back”'],
    answer: 2,
    working: '*trembled* = hidden **fear**; *curled them into fists so that no one would see* = she **hides** it.',
    say: [
      'A student says: The writer presents Mara as completely fearless. Which quotation most challenges this statement?',
      'A: stood at the very edge of the platform. B: lifted her chin. C: her hands trembled. D: She did not step back.',
    ],
  },
  ask: [
    ['We are given a **statement** about Mara', 'We are given a statement: Mara is completely fearless.'],
    ['Which quotation **challenges** it?', 'We need the quotation that most challenges it.'],
  ],
  know: {
    title: 'Evaluating a statement',
    md: 'In a **how far do you agree** question, you **judge** a statement about a text. Find evidence that **supports** it and evidence that **challenges** it. Quote briefly, explain the **writer’s methods** (word choice, structure, contrast), and give your **overall judgement**. The best answers notice where a writer shows two things at once, such as courage on the outside and fear underneath.',
    say: [
      'Here is the idea we need. In a how far do you agree question, you judge a statement about a text. Find evidence that supports it, and evidence that challenges it.',
      'Quote briefly, explain the writer’s methods, such as word choice, structure and contrast, and give your overall judgement. The best answers notice where a writer shows two things at once, such as courage on the outside and fear underneath.',
    ],
  },
  plan: [
    ['Sort each quotation: **supports** or **challenges**?', 'Here is the plan. First, sort each quotation: does it support or challenge the statement?'],
    ['Look closely at the **challenge**', 'Second, look closely at the one that challenges it.'],
    ['Make a **judgement**', 'Third, make a judgement.'],
  ],
  steps: [
    scene('Step 1: Sort the evidence', [table('t', ['Quotation', 'Fearless?'], [['*stood at the very edge*', '[[good:supports]]: brave'], ['*lifted her chin*', '[[good:supports]]: defiant'], ['*did not step back*', '[[good:supports]]: steady'], ['*her hands… trembled*', '[[bad:challenges]]: afraid']])], [
      { say: 'Step one. Stood at the very edge of the platform: that seems brave. Lifted her chin: defiant. Did not step back: steady.', show: ['t.0', 't.1', 't.2'] },
      { say: 'But her hands trembled. That is a sign of fear.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The hidden fear', [quote('p', ['Only her hands, pushed deep into her pockets, [[bad:trembled]], and she curled them into fists [[theta:so that no one would see]].']), text('a', 'Fearless on the **outside**, afraid **underneath** → **C**', 'lg')], [
      { say: 'Step two. Only her hands trembled, and she hides them, so that no one would see. The word only shows how small, and how secret, the sign of fear is.', show: 'p' },
      { say: 'So Mara looks fearless, but she is afraid underneath. Her trembling hands challenge the statement most. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['A **judgement**: she **appears** fearless', 'Let us check with a judgement. Mara appears fearless, and the writer shows her courage.'],
    ['but she is **brave**, not fearless', 'But she is brave, not fearless, since she acts despite her fear. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Sounds like **fear** is involved, but it **supports** courage', 'Choice D is the trap. Step back makes us think of fear, but she did not step back, so it supports the statement.'],
      ['A', '**Supports** the statement', 'Choice A supports the statement.'],
      ['B', '**Supports** the statement', 'Choice B also supports the statement.'],
    ],
  },
  yourTurn: {
    prompt: 'In a *“how far do you agree”* answer, what should you do?',
    choices: ['judge the statement, using quotations and the writer’s methods', 'retell the story in order', 'agree completely without evidence', 'write your own story instead'],
    answer: 0,
    working: '**Judge**, with **quotations** and **methods**.',
    ask: 'In a how far do you agree answer, what should you do? A: judge the statement, using quotations and the writer’s methods. B: retell the story in order. C: agree completely without evidence. D: write your own story instead.',
    reveal: 'The answer is A. You judge the statement, supported by quotations and the writer’s methods.',
  },
  sum: [
    ['Find evidence that **supports** and **challenges**', 'Here is what to remember. Find evidence that supports the statement, and evidence that challenges it.'],
    ['Notice what a writer shows **underneath**', 'Notice what a writer shows underneath the surface.'],
    ['Give an overall **judgement**', 'And give an overall judgement. For more on evaluating a statement, watch this lesson’s explainer video on Gradileo.'],
  ],
});
