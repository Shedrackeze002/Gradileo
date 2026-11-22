import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 6.3 (opinion writing). An exam-style question we wrote, in the style of a
// Grade 5 writing and editing test, on a paragraph we wrote. The answer is B: it is the only choice
// that gives a reason, with a fact, for the opinion that the school should have a garden.

const PARAGRAPH = [
  'Our school should start a vegetable garden. ________________. Pupils could also learn how food grows, and the vegetables could be used in school lunches.',
];

export default englishExam({
  lesson: 'e5-6-3',
  ...ours('a Grade 5 writing and editing test', 'the paragraph is by Gradileo'),
  title: 'Which Sentence Best Supports the Opinion?',
  thumbnailTitle: 'Supporting an Opinion',
  subtitle: 'Opinions and reasons, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: a pupil argues that the school should start a vegetable garden, and we choose the sentence that best fills the gap. We find the opinion, see what a strong reason looks like, and test each choice.',
  intro: [
    'In this video, we solve an exam-style writing question about opinion writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its paragraph ourselves, in the style of a Grade 5 writing and editing test.',
  ],
  passage: {
    lines: PARAGRAPH,
    by: 'A paragraph written for Gradileo',
    say: ['First, read the paragraph. Our school should start a vegetable garden. Then there is a gap. Pupils could also learn how food grows, and the vegetables could be used in school lunches.'],
  },
  question: {
    prompt: 'Which sentence would best fill the gap, to support the writer’s opinion?',
    text: 'Read the paragraph about a school vegetable garden. Which sentence would best fill the gap, to support the writer’s opinion?',
    choices: ['I like carrots more than peas.', 'Gardening gets pupils outside and active in the fresh air.', 'Some schools have a pond instead.', 'Vegetable gardens can be many different sizes.'],
    answer: 1,
    working: 'It gives a **reason** the school should have a garden, and it leads into “also”.',
    say: ['Which sentence would best fill the gap, to support the writer’s opinion?', 'A: I like carrots more than peas. B: Gardening gets pupils outside and active in the fresh air. C: Some schools have a pond instead. D: Vegetable gardens can be many different sizes.'],
  },
  ask: [
    ['Find the writer’s **opinion**', 'We need to find the writer’s opinion first.'],
    ['Choose a sentence that **supports** it', 'Then choose the sentence that supports it, which means it gives a reason to agree.'],
  ],
  know: {
    title: 'Opinions and reasons',
    md: 'Opinion writing states an **opinion**, then backs it with **reasons**. A good reason answers **why?** and is often supported by a **fact** or **example**. Linking words such as **also**, **because** and **for example** join the reasons together.',
    say: [
      'Here is the idea we need. Opinion writing states an opinion, then backs it up with reasons.',
      'A good reason answers the question: why? Linking words, like also, because and for example, join the reasons together.',
    ],
  },
  plan: [
    ['State the **opinion**', 'Here is the plan. First, state the opinion.'],
    ['Look at the **next** sentence for a clue', 'Second, look at the sentence after the gap for a clue.'],
    ['Test each choice: is it a **reason** for the opinion?', 'Third, test each choice: is it a reason for the opinion?'],
  ],
  steps: [
    scene('Step 1: The opinion and the clue', [quote('p', ['Our school [[theta:should]] start a vegetable garden. ________________. Pupils could [[theta:also]] learn how food grows, and the vegetables could be used in school lunches.']), text('n', '**also** → the gap must hold **another reason**')], [
      { say: 'Step one. The opinion is the first sentence: our school should start a vegetable garden. The word should shows it is an opinion.', show: 'p' },
      { say: 'Now look at the sentence after the gap. Pupils could also learn how food grows. The word also tells us the gap holds another reason, just before this one.', show: 'n' },
    ]),
    scene('Step 2: Test each choice', [
      table('t', ['Choice', 'A reason the school should have a garden?'], [['A: I like carrots', '[[bad:✗ a personal taste]]'], ['B: outside and active', '[[good:✓ a reason]]'], ['C: a pond instead', '[[bad:✗ argues for something else]]'], ['D: many sizes', '[[bad:✗ a fact, but not a reason]]']]),
    ], [
      { say: 'Step two. Pause and test each choice: is it a reason the school should have a garden?', wait: 3 },
      { say: 'A: I like carrots more than peas. That is a personal taste, and it says nothing about why the school needs a garden.', show: 't.0' },
      { say: 'B: gardening gets pupils outside and active. That is a benefit of the garden, so it is a reason. And it fits with also: outside and active, and also learning how food grows.', show: 't.1', focus: 't.1' },
      { say: 'C: some schools have a pond instead. That points to a different idea, and weakens the argument.', show: 't.2' },
      { say: 'D: gardens can be many sizes. That is true, but it is not a reason to have one.', show: 't.3' },
      { say: 'So the answer is B.' },
    ]),
  ],
  check: [
    ['Read it all together: **opinion → reason → also, another reason**', 'Let us check by reading it together. Our school should start a vegetable garden. Gardening gets pupils outside and active in the fresh air. Pupils could also learn how food grows.'],
    ['It **flows**, and every sentence **supports** the opinion', 'It flows, and every sentence supports the opinion. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'A true **fact** about gardens, but not a **reason**', 'Choice D is the trap for careful readers. It is a true fact about gardens, but it does not explain why the school should have one.'],
      ['A', 'About vegetables, but only a **personal** taste', 'Choice A mentions vegetables, but a personal taste is not a reason that would persuade anyone.'],
      ['C', 'Points to a **different** idea', 'Choice C talks about a different idea altogether, which weakens the argument.'],
    ],
  },
  yourTurn: {
    prompt: 'Opinion: *Our town should build a new library.* Which sentence best **supports** this opinion?',
    choices: ['Libraries have many shelves.', 'My favourite book is about dragons.', 'A library would give everyone free books and a quiet place to study.', 'Some towns have two libraries.'],
    answer: 2,
    working: 'Only C gives a reason the town needs a library.',
    ask: 'Opinion: our town should build a new library. Which sentence best supports this opinion?',
    reveal: 'The answer is C. It gives a reason the town needs a library: free books and a quiet place to study. The others are facts or tastes, not reasons.',
  },
  sum: [
    ['Opinion writing = **opinion** + **reasons**', 'Here is what to remember. Opinion writing is an opinion backed up by reasons.'],
    ['A reason answers **why?**', 'A reason answers the question why.'],
    ['A true fact is not a reason unless it **supports** the opinion', 'And a true fact is not a reason unless it supports the opinion. For more on opinion writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
