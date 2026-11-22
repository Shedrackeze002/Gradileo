import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 2.1 (imagery). An exam-style question we wrote, in the style of a Grade 7
// reading test, on Alfred, Lord Tennyson's "The Eagle" (1851), which is in the public domain. The
// answer is B: from that height the waves look like tiny wrinkles that seem to crawl.

const POEM = [
  'He clasps the crag with crooked hands;<br>Close to the sun in lonely lands,<br>Ring’d with the azure world, he stands.',
  'The wrinkled sea beneath him crawls;<br>He watches from his mountain walls,<br>And like a thunderbolt he falls.',
];

export default englishExam({
  lesson: 'e7-2-1',
  ...ours('a Grade 7 reading test', 'the poem is Alfred, Lord Tennyson’s “The Eagle” (1851), in the public domain'),
  title: 'What Does “The Wrinkled Sea Beneath Him Crawls” Show?',
  thumbnailTitle: 'Imagery',
  subtitle: 'What an image adds to a poem, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on Tennyson’s short poem “The Eagle”. We picture the image of the wrinkled, crawling sea, work out where we are standing to see it like that, and explain what it tells us about the eagle.',
  intro: [
    'In this video, we solve an exam-style poetry question about imagery. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test, on Tennyson’s poem The Eagle, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Alfred, Lord Tennyson, “The Eagle” (1851)',
    say: [
      'First, read the poem. He clasps the crag with crooked hands; close to the sun in lonely lands, ringed with the azure world, he stands.',
      'The wrinkled sea beneath him crawls; he watches from his mountain walls, and like a thunderbolt he falls.',
    ],
  },
  question: {
    prompt: 'What does the image *“The wrinkled sea beneath him crawls”* **mainly** show?',
    text: 'Read the poem “The Eagle”. What does the image “The wrinkled sea beneath him crawls” mainly show?',
    choices: ['The sea is old and tired.', 'The eagle is so high that the huge waves look tiny and slow.', 'The eagle is afraid of the water.', 'The sea is calm because there is no wind.'],
    answer: 1,
    working: 'From high above, waves look like **wrinkles** and seem to **crawl**: it shows the eagle’s **great height**.',
    say: ['What does the image, the wrinkled sea beneath him crawls, mainly show? A: The sea is old and tired. B: The eagle is so high that the huge waves look tiny and slow. C: The eagle is afraid of the water. D: The sea is calm because there is no wind.'],
  },
  ask: [
    ['An **image** helps us **picture** something', 'An image is a picture the poet paints with words.'],
    ['What does **this** image show?', 'We need to work out what this image shows us.'],
  ],
  know: {
    title: 'Imagery',
    md: '**Imagery** is language that appeals to the **senses**: sight, sound, touch, taste and smell. To explain an image, **picture** it, ask **why** it looks or feels that way, and say what it **adds** to the poem.',
    say: [
      'Here is the idea we need. Imagery is language that appeals to the senses: sight, sound, touch, taste and smell.',
      'To explain an image, first picture it. Then ask why it looks or feels that way. Then say what it adds to the poem.',
    ],
  },
  plan: [
    ['**Picture** the image', 'Here is the plan. First, picture the image.'],
    ['Ask **where** we must be to see it that way', 'Second, ask where we must be to see it that way.'],
    ['Say what it **adds**', 'Third, say what it adds to the poem.'],
  ],
  steps: [
    scene('Step 1: Picture it', [quote('p', ['The [[theta:wrinkled]] sea [[theta:beneath him]] [[theta:crawls]];']), text('n', 'Waves that look like **wrinkles**, moving as slowly as a **crawl**')], [
      { say: 'Step one. Pause and picture the line.', show: 'p', wait: 3 },
      { say: 'The waves look like wrinkles on skin, and they seem to crawl, moving very slowly.', show: 'n' },
    ]),
    scene('Step 2: Where are we?', [table('t', ['Clue in the poem', 'What it tells us'], [['**beneath** him', 'the sea is far **below**'], ['close to the **sun**', 'the eagle is very **high**'], ['his **mountain walls**', 'he is on a cliff top']])], [
      { say: 'Step two. The sea is beneath him. He is close to the sun, on his mountain walls. We are looking down from a great height.', show: ['t.0', 't.1', 't.2'] },
      { say: 'From up there, enormous waves would look like tiny wrinkles, and seem to crawl. So the image shows how high the eagle is. The answer is B.' },
    ]),
  ],
  check: [
    ['We see the sea **through the eagle’s eyes**', 'Let us check. We see the sea through the eagle’s eyes, from far above.'],
    ['That makes the eagle seem **powerful** before it **falls**', 'That height makes the eagle seem powerful, and makes its fall like a thunderbolt even more dramatic. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Takes **wrinkled** and **crawls** literally', 'Choice A is the trap. Wrinkled and crawls can suggest old age, but here they describe how the sea looks from far away.'],
      ['D', 'The sea only **looks** calm from up high', 'Choice D: the sea only looks calm from so high up.'],
      ['C', 'The eagle **watches** and **dives**', 'Choice C: nothing suggests fear. The eagle watches, then dives.'],
    ],
  },
  yourTurn: {
    prompt: '*He clasps the crag with crooked hands.* Which sense does this image **mainly** appeal to?',
    choices: ['sight and touch', 'smell', 'taste', 'hearing'],
    answer: 0,
    working: 'We **see** the bent claws and **feel** them gripping the rock.',
    ask: 'He clasps the crag with crooked hands. Which sense does this image mainly appeal to? A: sight and touch. B: smell. C: taste. D: hearing.',
    reveal: 'The answer is A, sight and touch. We can see the bent claws, and almost feel them gripping the rough rock.',
  },
  sum: [
    ['**Imagery** appeals to the **senses**', 'Here is what to remember. Imagery appeals to the senses.'],
    ['**Picture** it, and ask **why** it looks that way', 'Picture the image, and ask why it looks that way.'],
    ['Say what it **adds** to the poem', 'Then say what it adds to the poem. For more on imagery, watch this lesson’s explainer video on Gradileo.'],
  ],
});
