import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 2.1 (close reading a poem). An exam-style question we wrote, in the style of
// a Grade 9 reading test, on William Wordsworth's "Composed upon Westminster Bridge" (1802), which is in
// the public domain. The answer is A: like a garment, the morning's beauty covers the city for now, and
// can be taken off when the day's work and smoke begin.

const POEM = ['Earth has not anything to show more fair:<br>Dull would he be of soul who could pass by<br>A sight so touching in its majesty:<br>This City now doth, like a garment, wear<br>The beauty of the morning; silent, bare,<br>Ships, towers, domes, theatres, and temples lie<br>Open unto the fields, and to the sky;<br>All bright and glittering in the smokeless air.'];

export default englishExam({
  lesson: 'e9-2-1',
  ...ours('a Grade 9 reading test', 'the poem is William Wordsworth’s “Composed upon Westminster Bridge” (1802), in the public domain'),
  title: 'What Does “Like a Garment” Suggest About the City?',
  thumbnailTitle: 'Close Reading',
  subtitle: 'Reading a poem line by line, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on William Wordsworth’s “Composed upon Westminster Bridge”. We read the lines closely, picture the simile of the city wearing the morning like a garment, and work out what it suggests about the beauty Wordsworth sees.',
  intro: [
    'In this video, we solve an exam-style poetry question about close reading. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Wordsworth’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'William Wordsworth, “Composed upon Westminster Bridge” (1802), lines 1 to 8',
    say: ['First, read the opening of the poem. Earth has not anything to show more fair: dull would he be of soul who could pass by a sight so touching in its majesty: this City now doth, like a garment, wear the beauty of the morning; silent, bare, ships, towers, domes, theatres, and temples lie open unto the fields, and to the sky; all bright and glittering in the smokeless air.'],
  },
  question: {
    prompt: 'What does the simile *“This City now doth, like a garment, wear / The beauty of the morning”* most suggest?',
    text: 'Read the lines from “Composed upon Westminster Bridge”. What does the simile “This City now doth, like a garment, wear the beauty of the morning” most suggest?',
    choices: [
      'The morning’s beauty covers the city for now, like clothing that can later be taken off.',
      'The city is full of clothing shops.',
      'The city is cold and needs to wear warm clothes.',
      'The city has always been beautiful in every way.',
    ],
    answer: 0,
    working: '**now** + **garment**: beauty is **worn** on the **outside**, for a **moment**, before the smoke and work of the day.',
    say: [
      'What does the simile, this City now doth, like a garment, wear the beauty of the morning, most suggest?',
      'A: The morning’s beauty covers the city for now, like clothing that can later be taken off. B: The city is full of clothing shops. C: The city is cold and needs to wear warm clothes. D: The city has always been beautiful in every way.',
    ],
  },
  ask: [
    ['The city **wears** the morning **like a garment**', 'The poem says the city wears the morning like a garment.'],
    ['What does that **suggest**?', 'We need to work out what that suggests.'],
  ],
  know: {
    title: 'Close reading',
    md: 'Close reading means reading **slowly**, **line by line**, asking what each **word** adds. Look at **imagery** (similes, metaphors), small but important words (*now*, *yet*), and **contrasts**. Then say what the **effect** is.',
    say: [
      'Here is the idea we need. Close reading means reading slowly, line by line, and asking what each word adds.',
      'Look at the imagery, like similes and metaphors, at small but important words like now or yet, and at contrasts. Then say what the effect is.',
    ],
  },
  plan: [
    ['What is a **garment** like?', 'Here is the plan. First, what is a garment like?'],
    ['Notice the small word **now**', 'Second, notice the small word now.'],
    ['Look for **contrasts** nearby', 'Third, look for contrasts nearby.'],
  ],
  steps: [
    scene('Step 1: Garment and now', [quote('p', ['This City [[theta:now]] doth, like a [[theta:garment]], wear', 'The beauty of the morning; silent, bare,']), table('t', ['Word', 'What it suggests'], [['**garment**', 'worn on the **outside**; can be **taken off**'], ['**now**', 'only at **this moment**'], ['**bare**', 'the city is **uncovered**, open to the sky']])], [
      { say: 'Step one. Pause and think: what do we know about a garment?', show: 'p', wait: 3 },
      { say: 'A garment is worn on the outside, and can be taken off. So the beauty covers the city, but it is not a permanent part of it.', show: 't.0' },
      { say: 'And now tells us it is only at this moment, early in the morning.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The contrast', [quote('q', ['All bright and glittering in the [[good:smokeless]] air.']), text('a', 'Smokeless **now**; later, factories and fires will cover it → **A**', 'lg')], [
      { say: 'Step two. The air is smokeless now. Later in the day, smoke from fires and factories will cover the city, and the garment of beauty will be gone.', show: 'q' },
      { say: 'So the simile suggests the beauty covers the city for now, like clothing that can be taken off. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['A fits **garment**, **now** and **smokeless**', 'Let us check. A fits garment, now and smokeless.'],
    ['D ignores the word **now**', 'D ignores the word now. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Ignores **now**: the beauty is **for this moment**', 'Choice D is the trap. The poem praises the city’s beauty, but now shows it is only for this moment.'],
      ['B', 'Takes **garment** literally', 'Choice B takes the garment literally.'],
      ['C', 'Nothing about **cold**', 'Choice C: nothing in the poem is about cold.'],
    ],
  },
  yourTurn: {
    prompt: 'Which **senses** does *“silent, bare… All bright and glittering in the smokeless air”* mainly appeal to?',
    choices: ['hearing and sight', 'taste and smell', 'touch only', 'none'],
    answer: 0,
    working: '*silent* is **hearing**; *bright* and *glittering* are **sight**.',
    ask: 'Which senses does, silent, bare, all bright and glittering in the smokeless air, mainly appeal to? A: hearing and sight. B: taste and smell. C: touch only. D: none.',
    reveal: 'The answer is A, hearing and sight. Silent appeals to hearing, and bright and glittering appeal to sight.',
  },
  sum: [
    ['Read **slowly**, line by line', 'Here is what to remember. Read slowly, line by line.'],
    ['Unpack **images** and **small words** like *now*', 'Unpack the images, and small words like now.'],
    ['Look for **contrasts**, then explain the **effect**', 'Look for contrasts, then explain the effect. For more on close reading a poem, watch this lesson’s explainer video on Gradileo.'],
  ],
});
