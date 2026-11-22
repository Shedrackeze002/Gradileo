import { englishExam, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 1.1 (story elements). An exam-style question we wrote, in the style of
// the key stage 2 English reading test, on a short passage we wrote. The answer is A: the lantern,
// the hay, the hens and the cold dark sky place it in a barn, early on a winter morning.

const PASSAGE = [
  'Tomas lifted the lantern and pushed open the creaking barn door. Inside, the hens shuffled on their straw and the old horse stamped, his breath steaming.',
  'Through the gaps in the planks, the sky was still black, and frost glittered on the hay bales. Tomas blew on his fingers. The milk pail would be freezing again.',
];

export default englishExam({
  lesson: 'e5-1-1',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question and passage by Gradileo',
  verbatim: false,
  title: 'Where and When Does the Story Take Place?',
  thumbnailTitle: 'Finding the Setting',
  subtitle: 'Using clues in the text, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: where and when does a short story about Tomas in a barn take place? We collect the clues about the place and the clues about the time, and choose the answer that fits all of them.',
  intro: [
    'In this video, we solve an exam-style reading question about the setting of a story. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its story ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Tomas lifted the lantern and pushed open the creaking barn door. Inside, the hens shuffled on their straw and the old horse stamped, his breath steaming.',
      'Through the gaps in the planks, the sky was still black, and frost glittered on the hay bales. Tomas blew on his fingers. The milk pail would be freezing again.',
    ],
  },
  question: {
    prompt: 'Where and when does this part of the story take place?',
    text: 'Read the passage about Tomas. Where and when does this part of the story take place?',
    choices: ['In a barn, early on a winter morning', 'In a house, late on a summer evening', 'In a field, in the middle of a spring day', 'In a barn, on a hot afternoon'],
    answer: 0,
    working: 'The barn door, hens and horse show the place; the black sky, frost and steaming breath show the time.',
    say: [
      'Where and when does this part of the story take place?',
      'A: In a barn, early on a winter morning. B: In a house, late on a summer evening. C: In a field, in the middle of a spring day. D: In a barn, on a hot afternoon.',
    ],
  },
  ask: [
    ['**Where**: the place', 'The question asks two things. Where is the place.'],
    ['**When**: the time of day, the season', 'And when is the time, such as the time of day or the season of the year.'],
    ['Both parts must be **right**', 'The right answer has to get both parts right, so we need clues for each.'],
  ],
  know: {
    title: 'Setting',
    md: 'The **setting** is **where** and **when** a story happens. Writers often do not say it straight out; they leave **clues** in the details.',
    say: [
      'Here is the idea we need. The setting of a story is where and when it happens.',
      'Writers often do not tell you the setting directly. Instead, they leave clues in the details, and the reader works it out.',
    ],
    example: {
      md: '*Snow lay on the fence posts* → it is **winter**',
      say: 'For example, if snow lies on the fence posts, the writer does not need to say it is winter. The snow tells you.',
    },
  },
  plan: [
    ['Collect clues about the **place**', 'Here is the plan. First, collect the clues about the place.'],
    ['Collect clues about the **time**', 'Second, collect the clues about the time.'],
    ['Choose the answer that fits **every** clue', 'Third, choose the answer that fits every clue.'],
  ],
  steps: [
    scene('Step 1: Clues about the place', [quote('p', PASSAGE), text('n', 'barn door · hens on straw · horse · hay bales → **a barn**')], [
      { say: 'Step one. What tells us where Tomas is? Pause and look for the clues.', show: 'p', wait: 3 },
      { say: 'He pushes open the barn door. Inside are hens on their straw, an old horse and bales of hay.', focus: ['p.0', 'p.1'] },
      { say: 'Every one of these clues points to the same place: a barn.', show: 'n' },
    ]),
    scene('Step 2: Clues about the time', [quote('p', PASSAGE), text('n', 'black sky · lantern · frost · steaming breath · cold fingers → **early, on a winter morning**')], [
      { say: 'Step two. What tells us when? The sky is still black, and Tomas needs a lantern to see. So it is very early, before the sun is up.', show: 'p', focus: ['p.0', 'p.1'] },
      { say: 'Frost glitters on the hay, the horse’s breath steams, and Tomas blows on his cold fingers. So it is freezing, which means winter.', focus: 'p.1' },
      { say: 'The milk pail tells us he has come to do the morning milking. So it is early on a winter morning.', show: 'n' },
    ]),
    scene('Step 3: Test each choice', [
      table('t', ['Choice', 'Place', 'Time'], [
        ['A', 'barn ✓', 'early winter morning ✓'],
        ['B', '[[bad:house ✗]]', '[[bad:summer evening ✗]]'],
        ['C', '[[bad:field ✗]]', '[[bad:spring day ✗]]'],
        ['D', 'barn ✓', '[[bad:hot afternoon ✗]]'],
      ]),
    ], [
      { say: 'Step three. Now we test each choice against both sets of clues.', show: 't.0' },
      { say: 'A says a barn, early on a winter morning. Both parts fit.', focus: 't.0' },
      { say: 'B and C get both parts wrong.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
      { say: 'D gets the place right, but a hot afternoon does not fit the frost or the black sky. So the answer is A.', show: 't.3', focus: 't.3' },
    ]),
  ],
  check: [
    ['Every place clue fits **a barn**', 'Let us check. Every clue about the place fits a barn.'],
    ['Every time clue fits **an early winter morning**', 'And every clue about the time fits an early winter morning. No clue points anywhere else, so A holds.'],
  ],
  traps: {
    say: 'This question has one big trap.',
    rows: [
      ['D', 'The **place** is right, but the **time** is wrong', 'Choice D gets the place right, so it looks good at first. But half right is still wrong: always check both parts of the answer.'],
      ['B or C', 'Guessing without **looking back** at the passage', 'Choices B and C come from guessing. Every answer about setting must come from clues in the words of the passage.'],
    ],
  },
  yourTurn: {
    prompt: 'Waves crashed on the sand, and Lena squinted in the bright midday sun as she built her castle. Where and when does this take place?',
    choices: ['On a beach, around noon', 'In a garden, at night', 'On a beach, at sunrise', 'In a park, in the evening'],
    answer: 0,
    working: 'Waves and sand show a beach; the bright midday sun shows around noon.',
    ask: 'Waves crashed on the sand, and Lena squinted in the bright midday sun as she built her castle. Where and when does this take place?',
    reveal: 'The answer is A: on a beach, around noon. The waves and sand tell us the place, and the bright midday sun tells us the time.',
  },
  sum: [
    ['The **setting** is where and when a story happens', 'Here is what to remember. The setting is where and when a story happens.'],
    ['Collect the **clues** in the details', 'Writers leave clues in the details, so collect them.'],
    ['Check **both** parts: place and time', 'And check both parts of an answer, the place and the time. For more on story elements, watch this lesson’s explainer video on Gradileo.'],
  ],
});
