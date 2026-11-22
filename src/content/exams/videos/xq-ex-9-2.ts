import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 9.2 (Love and Relationships: Sonnet 29, Neutral Tones and The Farmer's Bride).
// An exam-style question we wrote, in the style of a GCSE English Literature exam, on Thomas Hardy's "Neutral
// Tones" (written 1867, published 1898), which is in the public domain. The answer is C: the dull, lifeless
// images show love that has died, fixed forever in the speaker's memory.

const POEM = ['Since then, keen lessons that love deceives,<br>And wrings with wrong, have shaped to me<br>Your face, and the God-curst sun, and a tree,<br>And a pond edged with grayish leaves.'];

export default englishExam({
  lesson: 'ex-9-2',
  ...ours('a GCSE English Literature exam', 'the poem is Thomas Hardy’s “Neutral Tones” (published 1898), in the public domain'),
  title: 'What Do the Images in “Neutral Tones” Suggest?',
  thumbnailTitle: 'Neutral Tones',
  subtitle: 'Imagery and memory, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the last stanza of Thomas Hardy’s “Neutral Tones”. The speaker remembers the day a relationship ended beside a pond. We look at the colours and images, and explain what they suggest.',
  intro: [
    'In this video, we solve an exam-style question about Neutral Tones. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Hardy’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Thomas Hardy, “Neutral Tones” (published 1898), final stanza',
    say: ['First, the context. The speaker remembers standing by a pond on a winter day with his lover, when he realised their love was over. The poem ends: Since then, keen lessons that love deceives, and wrings with wrong, have shaped to me your face, and the God-curst sun, and a tree, and a pond edged with grayish leaves.'],
  },
  question: {
    prompt: 'What do the images in this stanza mainly **suggest**?',
    text: 'Read the final stanza of Neutral Tones. What do the images in this stanza mainly suggest?',
    choices: [
      'The speaker is looking forward to spring.',
      'The speaker has happy memories of the pond.',
      'Love has died, and the bleak, colourless scene of the break-up is fixed forever in his memory.',
      'The speaker is describing a painting he owns.',
    ],
    answer: 2,
    working: '*God-curst sun*, *grayish leaves* = **bleak**, **lifeless**; *Since then… shaped to me* = **always** remembered with **pain**.',
    say: [
      'What do the images in this stanza mainly suggest?',
      'A: The speaker is looking forward to spring. B: The speaker has happy memories of the pond. C: Love has died, and the bleak, colourless scene of the break-up is fixed forever in his memory. D: The speaker is describing a painting he owns.',
    ],
  },
  ask: [
    ['Four **images**: face, sun, tree, pond', 'The stanza ends with four images: a face, the sun, a tree and a pond.'],
    ['What do they **suggest**?', 'We need to say what they suggest.'],
  ],
  know: {
    title: 'Sonnet 29, Neutral Tones, The Farmer’s Bride',
    md: '**Sonnet 29** (Elizabeth Barrett Browning): her thoughts grow around her lover like **wild vines** around a tree; she longs for his **presence**. **Neutral Tones** (Hardy): a **bitter** memory of love ending, in **grey**, **lifeless** colours. **The Farmer’s Bride** (Charlotte Mew): a farmer’s young wife is **afraid** of him and of marriage, and he longs for her.',
    say: [
      'Here is the idea we need. In Sonnet 29, by Elizabeth Barrett Browning, the speaker’s thoughts grow around her lover like wild vines around a tree, and she longs for his presence. In Neutral Tones, by Hardy, the speaker has a bitter memory of love ending, painted in grey, lifeless colours.',
      'And in The Farmer’s Bride, by Charlotte Mew, a farmer’s young wife is afraid of him and of marriage, while he longs for her.',
    ],
  },
  plan: [
    ['Look at the **colours** and **words**', 'Here is the plan. First, look at the colours and words.'],
    ['Look at **time**: *Since then*', 'Second, look at time: since then.'],
    ['Say what they **suggest**', 'Third, say what they suggest.'],
  ],
  steps: [
    scene('Step 1: Bleak images', [table('t', ['Image', 'Effect'], [['*the **God-curst** sun*', 'even the sun is **cursed**, pale and lifeless'], ['*a pond edged with **grayish** leaves*', '**grey**, **dead**, wintry'], ['*Your face*', 'the lover, now part of a **painful** scene']])], [
      { say: 'Step one. The God-curst sun: even the sun, usually warm and bright, is cursed and lifeless.', show: 't.0' },
      { say: 'A pond edged with grayish leaves: dead, grey, wintry. And her face is set among them, part of the same bleak scene.', show: ['t.1', 't.2'], focus: 't.1' },
    ]),
    scene('Step 2: Fixed in memory', [quote('p', ['[[theta:Since then]], keen lessons that [[bad:love deceives]],', 'And wrings with wrong, [[theta:have shaped to me]]…']), text('a', 'Dead love, **fixed** forever in a bleak scene → **C**', 'lg')], [
      { say: 'Step two. Since then, every time love has deceived and hurt him, he sees this same scene again.', show: 'p' },
      { say: 'So the images show love that has died, fixed forever in his memory. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The poem ends where it **began**: by the pond', 'Let us check. The poem ends where it began, by the pond, a circular structure.'],
    ['he cannot **escape** the memory', 'He cannot escape the memory. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'He **remembers** the pond, but with **pain**', 'Choice B is the trap. He does remember the pond, but with pain, not happiness.'],
      ['A', 'The scene is **winter**, not spring', 'Choice A: the scene is winter, with no hope of spring.'],
      ['D', 'A **memory**, not a painting', 'Choice D: it is a memory, not a painting.'],
    ],
  },
  yourTurn: {
    prompt: 'Which poet compares her thoughts of her lover to *“wild vines”* growing around a tree?',
    choices: ['Charlotte Mew', 'Elizabeth Barrett Browning', 'Thomas Hardy', 'Percy Bysshe Shelley'],
    answer: 1,
    working: 'Sonnet 29: **Elizabeth Barrett Browning**.',
    ask: 'Which poet compares her thoughts of her lover to wild vines growing around a tree? A: Charlotte Mew. B: Elizabeth Barrett Browning. C: Thomas Hardy. D: Percy Bysshe Shelley.',
    reveal: 'The answer is B, Elizabeth Barrett Browning, in Sonnet 29.',
  },
  sum: [
    ['Neutral Tones: **grey**, **lifeless** images', 'Here is what to remember. Neutral Tones uses grey, lifeless images.'],
    ['They show love **ended**, and **remembered** with pain', 'They show love that has ended, remembered with pain.'],
    ['Compare with Barrett Browning’s **longing**', 'And compare them with Barrett Browning’s longing. For more on these Love and Relationships poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
