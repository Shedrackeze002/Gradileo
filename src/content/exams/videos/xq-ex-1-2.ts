import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 1.2 (summarising the differences between two texts). An exam-style question
// we wrote, in the style of a GCSE English Language exam, on two short sources we wrote ourselves. The
// answer is A: today the park is a lively place for families, while in the old diary it was muddy and
// unsafe.

const LINES = [
  '**Source A (a blog, today):** On Saturday the park was packed: children shrieking on the zip wire, families sharing picnics by the pond, and a man selling ice creams from a bright green van.',
  '**Source B (a diary, 1858):** I crossed the common at dusk, ankle-deep in mud, and kept my hand on my purse, for the place is known for pickpockets, and not a lamp was lit.',
];

export default englishExam({
  lesson: 'ex-1-2',
  ...ours('a GCSE English Language exam', 'both sources were written by Gradileo'),
  title: 'How Are These Two Parks Different?',
  thumbnailTitle: 'Summarising Differences',
  subtitle: 'Comparing two sources, step by step',
  summary:
    'An exam-style question on summarising differences, solved one small step at a time. A modern blog and an old diary describe the same park, a hundred and sixty years apart. We pick out the details that matter, infer what each suggests, and choose the summary that is supported by both.',
  intro: [
    'In this video, we solve an exam-style question about summarising the differences between two texts. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and both sources ourselves, in the style of a GCSE English Language exam.',
  ],
  passage: {
    lines: LINES,
    by: 'Two sources written by Gradileo',
    say: [
      'First, read Source A, a blog written today. On Saturday the park was packed: children shrieking on the zip wire, families sharing picnics by the pond, and a man selling ice creams from a bright green van.',
      'Now Source B, a diary from eighteen fifty-eight, about the same place. I crossed the common at dusk, ankle-deep in mud, and kept my hand on my purse, for the place is known for pickpockets, and not a lamp was lit.',
    ],
  },
  question: {
    prompt: 'Which sentence best **summarises a difference** between the park in Source A and the place in Source B?',
    text: 'Read both sources. Which sentence best summarises a difference between the park in Source A and the place in Source B?',
    choices: [
      'Today the park is a lively, safe place for families, whereas in the diary it was muddy, dark and dangerous.',
      'Both writers enjoyed their visit very much.',
      'Source A is about a park, but Source B is about a different town.',
      'The diary writer visited on a Saturday, like the blogger.',
    ],
    answer: 0,
    working: 'A: *packed*, *families*, *picnics* → **lively, safe**; B: *mud*, *pickpockets*, *not a lamp* → **dirty, dangerous**.',
    say: [
      'Which sentence best summarises a difference between the park in Source A and the place in Source B?',
      'A: Today the park is a lively, safe place for families, whereas in the diary it was muddy, dark and dangerous. B: Both writers enjoyed their visit very much. C: Source A is about a park, but Source B is about a different town. D: The diary writer visited on a Saturday, like the blogger.',
    ],
  },
  ask: [
    ['Two sources, the **same place**', 'We have two sources about the same place.'],
    ['What is **different**?', 'We need the best summary of a difference.'],
  ],
  know: {
    title: 'Summarising differences',
    md: 'A **summary** question asks for differences **the question names**, here the place itself. Select only **relevant** details, and **infer**: say what the details **suggest**, not just what they say. Use one **quotation from each** source, and link them with words like **whereas**, **while** or **in contrast**.',
    say: [
      'Here is the idea we need. A summary question asks for the differences the question names, here the place itself. Select only the relevant details, and infer: say what the details suggest, not just what they say.',
      'Use one quotation from each source, and link them with words like whereas, while or in contrast.',
    ],
  },
  plan: [
    ['Pick details from **Source A**', 'Here is the plan. First, pick details from Source A.'],
    ['Pick details from **Source B**', 'Second, pick details from Source B.'],
    ['Infer and **compare**', 'Third, infer what they suggest, and compare.'],
  ],
  steps: [
    scene('Step 1: Details and inferences', [table('t', ['Source A', 'Source B'], [['*packed*, *families sharing picnics*', '*ankle-deep in mud*'], ['*children shrieking on the zip wire*', '*known for pickpockets*'], ['→ **lively** and **safe**', '→ **dirty**, **dark**, **dangerous**']])], [
      { say: 'Step one. Source A: packed, families sharing picnics, children shrieking happily on the zip wire.', show: 't.0' },
      { say: 'Source B: ankle-deep in mud, known for pickpockets, and not a lamp lit.', show: 't.1' },
      { say: 'So we can infer that the park today is lively and safe, while the old common was dirty, dark and dangerous.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The summary', [quote('p', ['…[[good:families sharing picnics]] by the pond…', '…kept my hand on my purse, for the place is known for [[bad:pickpockets]]…']), text('a', 'Lively and safe **whereas** muddy, dark and dangerous → **A**', 'lg')], [
      { say: 'Step two. Families relax with picnics today. The diary writer held on tight to their purse.', show: 'p' },
      { say: 'Choice A states that difference, and links it with whereas. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['A is supported by **both** sources', 'Let us check. A is supported by details in both sources.'],
    ['and it **infers**, not just copies', 'And it infers what they suggest, rather than just copying words. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'It is the **same** place, **changed** over time', 'Choice C is the trap. The descriptions are so different it seems like another place, but it is the same place, changed over time.'],
      ['B', 'The diarist is **anxious**, not enjoying it', 'Choice B: the diary writer is anxious, not enjoying the visit.'],
      ['D', 'No day is given in Source B', 'Choice D: Source B does not give a day, and the detail does not matter.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word shows that a writer is making an **inference**, not stating a fact?',
    choices: ['is', 'suggests', 'was', 'has'],
    answer: 1,
    working: '*suggests* = reading **between the lines**.',
    ask: 'Which word shows that a writer is making an inference, not stating a fact? A: is. B: suggests. C: was. D: has.',
    reveal: 'The answer is B, suggests. An inference reads between the lines, and suggests signals that.',
  },
  sum: [
    ['Select **relevant** details from **both** sources', 'Here is what to remember. Select relevant details from both sources.'],
    ['**Infer** what they suggest', 'Infer what they suggest.'],
    ['Link with **whereas**, **while**, **in contrast**', 'And link the sources with whereas, while or in contrast. For more on summarising differences, watch this lesson’s explainer video on Gradileo.'],
  ],
});
