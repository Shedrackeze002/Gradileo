import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 2.1 (imagery and figurative language). An exam-style question we wrote, in
// the style of a Grade 10 reading test, on William Wordsworth's "I Wandered Lonely as a Cloud" (1807),
// which is in the public domain. The answer is C: "dancing" gives the flowers a human action, which is
// personification, and it makes them seem alive and joyful.

const POEM = ['I wandered lonely as a cloud<br>That floats on high o’er vales and hills,<br>When all at once I saw a crowd,<br>A host, of golden daffodils;<br>Beside the lake, beneath the trees,<br>Fluttering and dancing in the breeze.'];

export default englishExam({
  lesson: 'e10-2-1',
  ...ours('a Grade 10 reading test', 'the poem is William Wordsworth’s “I Wandered Lonely as a Cloud” (1807), in the public domain'),
  title: 'What Do Wordsworth’s “Dancing” Daffodils Suggest?',
  thumbnailTitle: 'Personification',
  subtitle: 'Figurative language and its effect, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the first stanza of Wordsworth’s daffodils poem. We sort the simile from the personification, ask what the daffodils are doing, and explain what the image suggests.',
  intro: [
    'In this video, we solve an exam-style poetry question about figurative language. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Wordsworth’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'William Wordsworth, “I Wandered Lonely as a Cloud” (1807), first stanza',
    say: ['First, read the first stanza. I wandered lonely as a cloud that floats on high o’er vales and hills, when all at once I saw a crowd, a host, of golden daffodils; beside the lake, beneath the trees, fluttering and dancing in the breeze.'],
  },
  question: {
    prompt: 'In *“Fluttering and **dancing** in the breeze”*, which device does Wordsworth use, and what does it suggest?',
    text: 'Read the first stanza of the poem. In “Fluttering and dancing in the breeze”, which device does Wordsworth use, and what does it suggest?',
    choices: [
      'Hyperbole: the daffodils are enormous.',
      'Simile: the daffodils are like a cloud.',
      'Personification: the daffodils seem alive and joyful.',
      'Onomatopoeia: we hear the daffodils.',
    ],
    answer: 2,
    working: 'Flowers cannot really **dance**: a **human** action given to a thing is **personification**; it makes them seem **lively** and **happy**.',
    say: [
      'In, fluttering and dancing in the breeze, which device does Wordsworth use, and what does it suggest?',
      'A: Hyperbole: the daffodils are enormous. B: Simile: the daffodils are like a cloud. C: Personification: the daffodils seem alive and joyful. D: Onomatopoeia: we hear the daffodils.',
    ],
  },
  ask: [
    ['We need the **device**', 'We need to name the device.'],
    ['and what it **suggests**', 'And explain what it suggests.'],
  ],
  know: {
    title: 'Figurative language',
    md: '**Simile**: a comparison with **like** or **as** (*lonely as a cloud*). **Metaphor**: says one thing **is** another. **Personification**: gives **human** qualities or actions to a **non-human** thing. **Hyperbole**: deliberate **exaggeration**. **Imagery** appeals to the **senses**: sight, sound, touch, taste, smell. Always ask what the device **suggests**.',
    say: [
      'Here is the idea we need. A simile compares using like or as, such as lonely as a cloud. A metaphor says one thing is another. Personification gives human qualities or actions to something that is not human. And hyperbole is deliberate exaggeration.',
      'Imagery appeals to the senses: sight, sound, touch, taste and smell. With every device, ask what it suggests.',
    ],
  },
  plan: [
    ['Find **who** is doing the action', 'Here is the plan. First, find who is doing the action.'],
    ['Name the **device**', 'Second, name the device.'],
    ['Explain the **effect**', 'Third, explain its effect.'],
  ],
  steps: [
    scene('Step 1: Who is dancing?', [quote('p', ['A host, of golden [[theta:daffodils]];', 'Beside the lake, beneath the trees,', 'Fluttering and [[good:dancing]] in the breeze.']), table('t', ['Phrase', 'Device'], [['*lonely **as** a cloud*', 'simile (the **speaker**)'], ['daffodils **dancing**', '[[good:personification]]']])], [
      { say: 'Step one. Who is dancing? The daffodils. But flowers cannot really dance. Dancing is a human action.', show: 'p' },
      { say: 'Lonely as a cloud is a simile, but it describes the speaker, not the flowers. Giving the daffodils a human action is personification.', show: ['t.0', 't.1'] },
    ]),
    scene('Step 2: The effect', [text('n', 'A **crowd**, a **host**, **dancing**: like happy people at a celebration'), text('a', 'The flowers seem **alive** and **joyful**, lifting the **lonely** speaker → **C**', 'lg')], [
      { say: 'Step two. Wordsworth calls the flowers a crowd and a host, and has them dance. They seem like happy people at a celebration.', show: 'n' },
      { say: 'So the personification makes them seem alive and joyful, a contrast with the lonely speaker. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The speaker **begins** lonely', 'Let us check. The speaker begins lonely, like a single cloud.'],
    ['and the joyful flowers **lift** him', 'Then the joyful, dancing flowers lift his mood. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'There **is** a simile, but it describes the **speaker**', 'Choice B is the trap. There is a simile, lonely as a cloud, but it describes the speaker, not the daffodils.'],
      ['A', 'No **exaggeration** of size', 'Choice A: nothing exaggerates their size.'],
      ['D', 'No **sound** word', 'Choice D: no word imitates a sound.'],
    ],
  },
  yourTurn: {
    prompt: 'Which device is *“I’ve told you a **million** times!”*?',
    choices: ['hyperbole', 'simile', 'personification', 'onomatopoeia'],
    answer: 0,
    working: 'A deliberate **exaggeration**: **hyperbole**.',
    ask: 'Which device is: I’ve told you a million times? A: hyperbole. B: simile. C: personification. D: onomatopoeia.',
    reveal: 'The answer is A, hyperbole. Nobody has really said it a million times. The exaggeration shows frustration.',
  },
  sum: [
    ['**Personification**: human actions for non-human things', 'Here is what to remember. Personification gives human actions to non-human things.'],
    ['Check **what** each device describes', 'Check what each device describes.'],
    ['Then explain what it **suggests**', 'Then explain what it suggests. For more on imagery and figurative language, watch this lesson’s explainer video on Gradileo.'],
  ],
});
