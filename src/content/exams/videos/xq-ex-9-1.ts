import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 9.1 (Love and Relationships: When We Two Parted, Love's Philosophy and
// Porphyria's Lover). An exam-style question we wrote, in the style of a GCSE English Literature exam, on
// Percy Bysshe Shelley's "Love's Philosophy" (1819), which is in the public domain. The answer is D: the
// speaker argues that since everything in nature joins together, his beloved should join with him.

const POEM = ['Nothing in the world is single;<br>All things by a law divine<br>In one spirit meet and mingle.<br>Why not I with thine?'];

export default englishExam({
  lesson: 'ex-9-1',
  ...ours('a GCSE English Literature exam', 'the poem is Percy Bysshe Shelley’s “Love’s Philosophy” (1819), in the public domain'),
  title: 'What Is the Argument of “Love’s Philosophy”?',
  thumbnailTitle: 'Love’s Philosophy',
  subtitle: 'A poem that persuades, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Shelley’s “Love’s Philosophy”. The speaker builds a case from nature and ends with a question. We follow the argument and name what he is trying to do.',
  intro: [
    'In this video, we solve an exam-style question about Love’s Philosophy. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Shelley’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Percy Bysshe Shelley, “Love’s Philosophy” (1819), lines 5 to 8',
    say: ['First, the context. The speaker has just described fountains mingling with rivers, and rivers with the ocean. Then he says: Nothing in the world is single; all things by a law divine in one spirit meet and mingle. Why not I with thine?'],
  },
  question: {
    prompt: 'What is the speaker mainly **arguing** in these lines?',
    text: 'Read the lines from Love’s Philosophy. What is the speaker mainly arguing in these lines?',
    choices: [
      'Everyone should live alone, like the rivers.',
      'Religion forbids him from loving her.',
      'Nature is too powerful for humans to understand.',
      'Since everything in nature joins together, she should join with him too.',
    ],
    answer: 3,
    working: '*Nothing… is single* + *meet and mingle* (nature **joins**) → *Why not I with thine?* (so **should we**).',
    say: [
      'What is the speaker mainly arguing in these lines?',
      'A: Everyone should live alone, like the rivers. B: Religion forbids him from loving her. C: Nature is too powerful for humans to understand. D: Since everything in nature joins together, she should join with him too.',
    ],
  },
  ask: [
    ['The speaker makes a **case**', 'The speaker is making a case.'],
    ['What is his **argument**?', 'We need to state his argument.'],
  ],
  know: {
    title: 'When We Two Parted, Love’s Philosophy, Porphyria’s Lover',
    md: '**When We Two Parted** (Byron): bitterness and grief after a **secret** love ends. **Love’s Philosophy** (Shelley): a speaker tries to **persuade** a woman to love him, using **nature** as evidence. **Porphyria’s Lover** (Browning): a **dramatic monologue** in which a man strangles his lover with her own hair to keep her forever: love turned to **possession**.',
    say: [
      'Here is the idea we need. In When We Two Parted, by Byron, the speaker feels bitterness and grief after a secret love ends. In Love’s Philosophy, by Shelley, a speaker tries to persuade a woman to love him, using nature as his evidence.',
      'And Porphyria’s Lover, by Browning, is a dramatic monologue in which a man strangles his lover with her own hair, to keep her forever: love turned to possession.',
    ],
  },
  plan: [
    ['What does he say about **nature**?', 'Here is the plan. First, what does he say about nature?'],
    ['What does he **ask**?', 'Second, what does he ask?'],
    ['State the **argument**', 'Third, state the argument.'],
  ],
  steps: [
    scene('Step 1: Nature joins', [table('t', ['Words', 'Meaning'], [['*Nothing in the world is **single***', 'nothing is **alone**'], ['*by a **law divine***', 'it is **God’s** law, natural and right'], ['*In one spirit **meet and mingle***', 'everything **joins** together']])], [
      { say: 'Step one. Nothing in the world is single: nothing is alone.', show: 't.0' },
      { say: 'By a law divine, everything meets and mingles. Joining together is God’s law, natural and right.', show: ['t.1', 't.2'], focus: 't.2' },
    ]),
    scene('Step 2: The question', [quote('p', ['[[theta:Nothing in the world is single]];', '…', '[[good:Why not I with thine?]]']), text('a', 'If nature joins, **so should we** → **D**', 'lg')], [
      { say: 'Step two. Then the question: why not I with thine? If everything joins together, why not you and me?', show: 'p' },
      { say: 'He uses nature as evidence to persuade her. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['The poem ends with **another** question', 'Let us check. The poem ends with another question: what is all this sweet work worth, if thou kiss not me?'],
    ['the same **persuasive** pattern', 'The same persuasive pattern. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'He uses nature as **evidence**, not to show it is mysterious', 'Choice C is the trap. Nature is everywhere in the poem, but he uses it as evidence, not to say it is beyond understanding.'],
      ['A', '*Nothing… is single*: the **opposite**', 'Choice A: nothing is single, which is the opposite.'],
      ['B', '*law divine* **supports** him', 'Choice B: the law divine supports him.'],
    ],
  },
  yourTurn: {
    prompt: 'In which poem does the speaker strangle his lover with her own hair?',
    choices: ['Porphyria’s Lover', 'When We Two Parted', 'Love’s Philosophy', 'Sonnet 29'],
    answer: 0,
    working: 'Browning’s dramatic monologue: **Porphyria’s Lover**.',
    ask: 'In which poem does the speaker strangle his lover with her own hair? A: Porphyria’s Lover. B: When We Two Parted. C: Love’s Philosophy. D: Sonnet 29.',
    reveal: 'The answer is A, Porphyria’s Lover. Browning shows love twisted into a wish to possess.',
  },
  sum: [
    ['Love’s Philosophy: nature as **evidence**', 'Here is what to remember. Love’s Philosophy uses nature as evidence.'],
    ['Its questions **persuade**', 'Its questions are designed to persuade.'],
    ['Compare: **persuasion**, **grief**, **possession**', 'And compare persuasion in Shelley, grief in Byron, and possession in Browning. For more on these Love and Relationships poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
