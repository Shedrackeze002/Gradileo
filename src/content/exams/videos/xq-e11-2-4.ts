import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 2.4 (comparing poems). An exam-style question we wrote, in the style of a Grade
// 11 reading test, on William Wordsworth's "Composed upon Westminster Bridge" (1802) and William Blake's
// "London" (1794), both in the public domain. The answer is D: Wordsworth sees calm beauty, Blake sees
// suffering.

const POEMS = [
  '**Wordsworth:** Earth has not any thing to show more fair…<br>This City now doth, like a garment, wear<br>The beauty of the morning; silent, bare…',
  '**Blake:** I wander thro’ each charter’d street,<br>Near where the charter’d Thames does flow,<br>And mark in every face I meet<br>Marks of weakness, marks of woe.',
];

export default englishExam({
  lesson: 'e11-2-4',
  ...ours('a Grade 11 reading test', 'the poems are Wordsworth’s “Composed upon Westminster Bridge” (1802) and Blake’s “London” (1794), in the public domain'),
  title: 'How Do Wordsworth and Blake See London Differently?',
  thumbnailTitle: 'Comparing Poems',
  subtitle: 'Two poems on one city, step by step',
  summary:
    'An exam-style question comparing two poems about London, solved one small step at a time: Wordsworth on a bridge at dawn, and Blake walking the streets. We compare their imagery, tone and focus, and name the key difference.',
  intro: [
    'In this video, we solve an exam-style question about comparing poems. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on two poems that are in the public domain.',
  ],
  passage: {
    lines: POEMS,
    by: 'Wordsworth, “Composed upon Westminster Bridge” (1802); Blake, “London” (1794)',
    say: [
      'First, read lines from two poems about London. Wordsworth, standing on a bridge at dawn: Earth has not any thing to show more fair. This City now doth, like a garment, wear the beauty of the morning; silent, bare.',
      'And Blake, walking the streets: I wander through each chartered street, near where the chartered Thames does flow, and mark in every face I meet marks of weakness, marks of woe.',
    ],
  },
  question: {
    prompt: 'How do the two poets’ views of London **differ**?',
    text: 'Read the lines from the two poems. How do the two poets’ views of London differ?',
    choices: [
      'Both poets see London as dirty and crowded.',
      'Wordsworth sees suffering; Blake sees beauty.',
      'Both poets are mainly interested in the river.',
      'Wordsworth sees calm beauty in the sleeping city; Blake sees suffering in its people.',
    ],
    answer: 3,
    working: 'Wordsworth: *more fair*, *beauty*, *silent*: **calm beauty**. Blake: *weakness*, *woe* in **every face**: **suffering**.',
    say: [
      'How do the two poets’ views of London differ?',
      'A: Both poets see London as dirty and crowded. B: Wordsworth sees suffering; Blake sees beauty. C: Both poets are mainly interested in the river. D: Wordsworth sees calm beauty in the sleeping city; Blake sees suffering in its people.',
    ],
  },
  ask: [
    ['Two poems, **one** city', 'Two poems describe the same city.'],
    ['How do their views **differ**?', 'We need the key difference between their views.'],
  ],
  know: {
    title: 'Comparing poems',
    md: 'To compare two poems on the same subject, set them side by side on the same **features**: **imagery** (what each poet notices), **tone** (the attitude), **form** and **focus** (the place, or the people?). Then state a **similarity** or **difference** and support it with words from **both** poems. Ask also **why**: a poet’s **viewpoint** (time, place, purpose) shapes what they see.',
    say: [
      'Here is the idea we need. To compare two poems on the same subject, set them side by side on the same features: imagery, meaning what each poet notices; tone, the attitude; form; and focus, the place or the people.',
      'Then state a similarity or difference, and support it with words from both poems. Ask why, too, because a poet’s viewpoint, their time, place and purpose, shapes what they see.',
    ],
  },
  plan: [
    ['Compare their **imagery** and **tone**', 'Here is the plan. First, compare their imagery and tone.'],
    ['Compare their **focus**', 'Second, compare their focus.'],
    ['State the **difference**', 'Third, state the difference.'],
  ],
  steps: [
    scene('Step 1: Side by side', [table('t', ['Feature', 'Wordsworth', 'Blake'], [['imagery', '*beauty of the morning*, *garment*', '*marks of weakness, marks of woe*'], ['tone', '[[good:**awed**, peaceful]]', '[[bad:**angry**, sorrowful]]'], ['focus', 'the **city** itself, empty at dawn', 'the **people** in its streets']])], [
      { say: 'Step one. Wordsworth’s images are of beauty: the city wears the morning like a garment. Blake sees marks of weakness and woe.', show: 't.0' },
      { say: 'Wordsworth’s tone is awed and peaceful. Blake’s is angry and sorrowful.', show: 't.1' },
      { say: 'And their focus differs. Wordsworth looks at the city itself, silent and empty at dawn. Blake looks into every face he meets.', show: 't.2' },
    ]),
    scene('Step 2: The difference', [quote('w', ['[[good:Earth has not any thing to show more fair]]']), quote('b', ['And mark in every face I meet / [[bad:Marks of weakness, marks of woe]].']), text('a', 'Calm **beauty** vs human **suffering** → **D**', 'lg')], [
      { say: 'Step two. Wordsworth sees calm beauty in the sleeping city. Blake sees suffering in its people. The answer is D.', show: ['w', 'b', 'a'] },
    ]),
  ],
  check: [
    ['**Why**? Wordsworth sees it **before** the people wake', 'Let us check, and ask why. Wordsworth sees London at dawn, before its people are awake.'],
    ['Blake walks among them', 'Blake walks among them. Their viewpoints explain their views, and D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The right **contrast**, but **reversed**', 'Choice B is the trap. It has the right contrast, but the wrong way round.'],
      ['A', 'Wordsworth finds it **fair**', 'Choice A: Wordsworth finds London beautiful.'],
      ['C', 'The river is only a **detail**', 'Choice C: the river is only a detail in each poem.'],
    ],
  },
  yourTurn: {
    prompt: 'Which is the **strongest** comparative point?',
    choices: [
      'Wordsworth wrote a poem, and Blake also wrote a poem.',
      'Both poems are about London.',
      'Blake’s poem is longer.',
      'While Wordsworth’s simile of a “garment” makes the city beautiful, Blake’s repeated “marks” stamp it with suffering.',
    ],
    answer: 3,
    working: 'It names a **difference** and backs it with **words** from **both** poems.',
    ask: 'Which is the strongest comparative point? A: Wordsworth wrote a poem, and Blake also wrote a poem. B: Both poems are about London. C: Blake’s poem is longer. D: While Wordsworth’s simile of a garment makes the city beautiful, Blake’s repeated marks stamp it with suffering.',
    reveal: 'The answer is D. It names a real difference, and supports it with words from both poems.',
  },
  sum: [
    ['Compare the **same features** in both poems', 'Here is what to remember. Compare the same features in both poems.'],
    ['Support with words from **both**', 'Support each point with words from both.'],
    ['Ask **why** they differ', 'And ask why they differ. For more on comparing poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
