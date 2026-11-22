import { englishExam, ours, scene, text, table } from '../english.ts';

// More English Topics, lesson 3.2 (descriptive writing from a picture). An exam-style writing question we
// wrote, in the style of a GCSE English Language exam. The answer is D: it moves from the wide view to a
// single small detail.

export default englishExam({
  lesson: 'ex-3-2',
  ...ours('a GCSE English Language exam'),
  title: 'Which Plan Moves From the Wide View to a Detail?',
  thumbnailTitle: 'Descriptive Writing',
  subtitle: 'Planning a description, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time. A student must describe a picture of a harbour at dawn. We test four plans and choose the one that moves like a camera, from the wide view down to one small detail.',
  intro: [
    'In this video, we solve an exam-style question about descriptive writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Language exam.',
  ],
  question: {
    prompt: 'A picture shows a harbour at dawn: a pink sky, fishing boats, gulls, and an old fisherman on the pier holding a rope. Which plan moves from the **wide view** to a **small detail**?',
    text: 'A picture shows a harbour at dawn: a pink sky, fishing boats, gulls, and an old fisherman on the pier holding a rope. Which plan moves from the wide view to a small detail?',
    choices: [
      'the rope → the sky → the fisherman → the boats',
      'the fisherman → the rope → the boats → the sky',
      'the boats → the rope → the sky → the gulls',
      'the sky over the harbour → the boats on the water → the fisherman on the pier → the frayed rope in his hands',
    ],
    answer: 3,
    working: '**Wide** (sky) → **closer** (boats) → **closer** (fisherman) → **detail** (frayed rope): a camera **zooming in**.',
    say: [
      'A picture shows a harbour at dawn: a pink sky, fishing boats, gulls, and an old fisherman on the pier holding a rope. Which plan moves from the wide view to a small detail?',
      'A: the rope, the sky, the fisherman, the boats. B: the fisherman, the rope, the boats, the sky. C: the boats, the rope, the sky, the gulls. D: the sky over the harbour, the boats on the water, the fisherman on the pier, the frayed rope in his hands.',
    ],
  },
  ask: [
    ['A **picture** to describe', 'We have a picture to describe.'],
    ['Which plan **zooms in**?', 'We need the plan that moves from the wide view to a small detail.'],
  ],
  know: {
    title: 'Descriptive writing',
    md: 'Plan a description like a **camera**: start with the **wide view**, move **closer**, and end on one **small detail** that carries feeling. Use **all the senses**, not only sight. Use **imagery** (simile, metaphor, personification) with care. **Show, don’t tell**: describe actions and details that let the reader **feel** the mood. Then **revise** vague words for **precise** ones.',
    say: [
      'Here is the idea we need. Plan a description like a camera. Start with the wide view, move closer, and end on one small detail that carries feeling.',
      'Use all the senses, not only sight, and use imagery such as simile, metaphor and personification with care. Show, don’t tell: describe actions and details that let the reader feel the mood. Then revise vague words into precise ones.',
    ],
  },
  plan: [
    ['Rank the parts from **wide** to **small**', 'Here is the plan. First, rank the parts of the picture from wide to small.'],
    ['Test each **order**', 'Second, test each plan’s order.'],
    ['Choose the **zoom**', 'Third, choose the one that zooms in.'],
  ],
  steps: [
    scene('Step 1: Wide to small', [table('t', ['Size', 'Part of the picture'], [['widest', 'the **sky** over the harbour'], ['closer', 'the **boats** on the water'], ['closer still', 'the **fisherman** on the pier'], ['smallest', 'the **rope** in his hands']])], [
      { say: 'Step one. Rank the parts by size. The sky is the widest view. Then the boats on the water.', show: ['t.0', 't.1'] },
      { say: 'Then the fisherman on the pier, and smallest of all, the rope in his hands.', show: ['t.2', 't.3'], focus: 't.3' },
    ]),
    scene('Step 2: Test the plans', [table('c', ['Plan', 'Order'], [['A', '[[bad:jumps]] small → wide → middle'], ['B', '[[bad:starts close]], ends wide'], ['C', '[[bad:jumps about]]'], ['D', '[[good:wide → closer → closer → detail]]']]), text('a', 'A camera **zooming in** → **D**', 'lg')], [
      { say: 'Step two. A jumps from the rope to the sky. B starts close and ends wide, which is backwards. C jumps about.', show: ['c.0', 'c.1', 'c.2'] },
      { say: 'D moves steadily from the sky to the frayed rope, like a camera zooming in. The answer is D.', show: ['c.3', 'a'], focus: 'c.3' },
    ]),
  ],
  check: [
    ['D ends on a detail with **feeling**: *frayed*', 'Let us check. D ends on a detail with feeling. Frayed suggests age and hard work.'],
    ['a strong place to **finish**', 'That is a strong place to finish. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'It **does** have an order, but it zooms **out**', 'Choice B is the trap. It has a clear order, but it zooms out, ending on the wide view instead of a detail.'],
      ['A', 'It **jumps**', 'Choice A jumps around.'],
      ['C', 'It **jumps**, and skips the fisherman', 'Choice C jumps, and skips the fisherman.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence **shows**, rather than tells, that the fisherman is cold?',
    choices: ['He was cold.', 'He blew into his cupped hands and stamped his feet on the boards.', 'It was a very cold morning for him.', 'He felt the coldness of the cold air.'],
    answer: 1,
    working: '**Actions** let us **feel** the cold.',
    ask: 'Which sentence shows, rather than tells, that the fisherman is cold? A: He was cold. B: He blew into his cupped hands and stamped his feet on the boards. C: It was a very cold morning for him. D: He felt the coldness of the cold air.',
    reveal: 'The answer is B. His actions, blowing into his hands and stamping his feet, let us feel the cold without being told.',
  },
  sum: [
    ['Plan like a **camera**: wide to small', 'Here is what to remember. Plan a description like a camera, from wide to small.'],
    ['End on a detail with **feeling**', 'End on a detail that carries feeling.'],
    ['**Show**, don’t tell', 'And show, don’t tell. For more on descriptive writing from a picture, watch this lesson’s explainer video on Gradileo.'],
  ],
});
