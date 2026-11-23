import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 6.3 (the persuasive essay). An exam-style writing question we wrote, in the
// style of a Grade 10 writing test. The answer is C: it takes the counterargument seriously and answers it
// with a reason, which is a strong rebuttal.

export default englishExam({
  lesson: 'e10-6-3',
  ...ours('a Grade 10 writing test'),
  title: 'Which Is the Strongest Rebuttal?',
  thumbnailTitle: 'Writing a Rebuttal',
  subtitle: 'Answering the other side, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: an essay argues for school uniforms, and must answer the claim that uniforms limit self-expression. We learn what makes a rebuttal strong, test four answers, and choose the best one.',
  intro: [
    'In this video, we solve an exam-style question about the persuasive essay. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 writing test.',
  ],
  question: {
    prompt: 'An essay argues that **school uniforms** should be required. It must answer this counterargument: *“Uniforms limit students’ self-expression.”* Which is the **strongest rebuttal**?',
    text: 'An essay argues that school uniforms should be required. It must answer this counterargument: Uniforms limit students’ self-expression. Which is the strongest rebuttal?',
    choices: [
      'That is a silly argument.',
      'Self-expression does not matter at school.',
      'Students can still express themselves through their ideas, clubs and art, while uniforms ease the pressure to buy expensive clothes.',
      'Most people like uniforms anyway.',
    ],
    answer: 2,
    working: 'A strong rebuttal **takes the worry seriously** and **answers it with a reason**.',
    say: [
      'An essay argues that school uniforms should be required. It must answer this counterargument: Uniforms limit students’ self-expression. Which is the strongest rebuttal?',
      'A: That is a silly argument. B: Self-expression does not matter at school. C: Students can still express themselves through their ideas, clubs and art, while uniforms ease the pressure to buy expensive clothes. D: Most people like uniforms anyway.',
    ],
  },
  ask: [
    ['A **counterargument** is the other side', 'A counterargument is the other side’s view.'],
    ['Which reply **answers** it best?', 'We need the reply that answers it best.'],
  ],
  know: {
    title: 'The persuasive essay',
    md: 'A persuasive essay states a clear **position** in its **thesis**, supports it with **reasons** and **evidence**, and answers the **counterargument**. A strong **rebuttal** (1) **states** the other view **fairly**, (2) **concedes** what is fair in it, and (3) **answers** it with a **reason** or **evidence**. Insults, dismissals and *everyone agrees* are **not** rebuttals.',
    say: [
      'Here is the idea we need. A persuasive essay states a clear position in its thesis, supports it with reasons and evidence, and answers the counterargument.',
      'A strong rebuttal states the other view fairly, concedes what is fair in it, and then answers it with a reason or evidence. Insults, dismissals and claims that everyone agrees are not rebuttals.',
    ],
  },
  plan: [
    ['Does it **take the worry seriously**?', 'Here is the plan. First, ask whether each reply takes the worry seriously.'],
    ['Does it give a **reason**?', 'Second, ask whether it gives a reason.'],
  ],
  steps: [
    scene('Step 1: Test each reply', [table('t', ['Choice', 'Takes it seriously?', 'Gives a reason?'], [['A *silly argument*', '[[bad:✗ insults it]]', '✗'], ['B *does not matter*', '[[bad:✗ dismisses it]]', '✗'], ['C *ideas, clubs and art…*', '[[good:✓ admits it matters]]', '[[good:✓ less pressure to buy]]'], ['D *Most people like…*', '[[bad:✗ ignores it]]', '[[bad:✗ bandwagon]]']])], [
      { say: 'Step one. A calls the argument silly. That is an insult, not an answer. B says self-expression does not matter, which dismisses the worry.', show: ['t.0', 't.1'] },
      { say: 'D says most people like uniforms. That ignores the worry, and is a bandwagon appeal.', show: 't.3' },
      { say: 'C admits that self-expression matters, shows other ways to express it, and adds a reason: less pressure to buy expensive clothes.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The answer', [text('a', 'Takes it seriously **and** answers with a reason → **C**', 'lg')], [
      { say: 'Step two. Only C takes the worry seriously and answers it with a reason. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Would a **doubtful** reader be persuaded by A, B or D?', 'Let us check. Would a doubtful reader be persuaded by A, B or D? No.'],
    ['C gives them something to **think** about', 'C gives them something to think about. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Sounds like **evidence**, but is a **bandwagon** appeal', 'Choice D is the trap. It sounds like evidence, but most people like it is a bandwagon appeal.'],
      ['A', 'An **insult**, not an answer', 'Choice A is an insult, not an answer.'],
      ['B', '**Dismisses** the worry', 'Choice B dismisses the worry.'],
    ],
  },
  yourTurn: {
    prompt: 'In a persuasive essay, where does the writer usually state their **position** first?',
    choices: ['only in the conclusion', 'in a footnote', 'in the thesis, in the introduction', 'nowhere: readers should guess'],
    answer: 2,
    working: 'The **thesis**, at the end of the **introduction**.',
    ask: 'In a persuasive essay, where does the writer usually state their position first? A: only in the conclusion. B: in a footnote. C: in the thesis, in the introduction. D: nowhere: readers should guess.',
    reveal: 'The answer is C. The position is stated in the thesis, usually at the end of the introduction.',
  },
  sum: [
    ['State the **position** in the thesis', 'Here is what to remember. State your position in the thesis.'],
    ['Present the **counterargument** fairly', 'Present the counterargument fairly.'],
    ['**Rebut** it with a reason, not an insult', 'And rebut it with a reason, not an insult. For more on the persuasive essay, watch this lesson’s explainer video on Gradileo.'],
  ],
});
