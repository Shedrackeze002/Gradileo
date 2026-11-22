import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 1.5 (theme and symbol). An exam-style question we wrote, in the style of a
// Grade 7 reading test, on a passage we wrote. The answer is C: the tree her grandfather planted
// stands for the love and memories he left behind, and it keeps growing after he is gone.

const PASSAGE = [
  'Grandpa planted the apple tree the year Esi was born. Every autumn, they picked the fruit together, and he told her stories under its branches.',
  'The spring after he died, Esi walked out to the tree. Small white blossoms covered every branch. She sat beneath it, and for the first time in months, she smiled.',
];

export default englishExam({
  lesson: 'e7-1-5',
  ...ours('a Grade 7 reading test', 'the passage is by Gradileo'),
  title: 'What Does the Apple Tree Symbolize?',
  thumbnailTitle: 'Symbols',
  subtitle: 'Symbol and theme, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Esi’s grandfather planted an apple tree the year she was born, and after he dies it blossoms again. We learn what a symbol is, trace what the tree is linked to, and decide what it stands for.',
  intro: [
    'In this video, we solve an exam-style reading question about symbols. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Grandpa planted the apple tree the year Esi was born. Every autumn, they picked the fruit together, and he told her stories under its branches.',
      'The spring after he died, Esi walked out to the tree. Small white blossoms covered every branch. She sat beneath it, and for the first time in months, she smiled.',
    ],
  },
  question: {
    prompt: 'What does the apple tree most likely **symbolize**?',
    text: 'Read the passage about Esi and the apple tree. What does the apple tree most likely symbolize?',
    choices: ['the changing seasons of the year', 'Esi’s love of gardening', 'Grandpa’s love and memories, which live on after him', 'the danger of climbing trees'],
    answer: 2,
    working: 'The tree is tied to **Grandpa** and their **time together**, and it **blossoms** after he dies.',
    say: [
      'What does the apple tree most likely symbolize?',
      'A: the changing seasons of the year. B: Esi’s love of gardening. C: Grandpa’s love and memories, which live on after him. D: the danger of climbing trees.',
    ],
  },
  ask: [
    ['A **symbol** is an object that stands for an **idea**', 'A symbol is an object that stands for a bigger idea.'],
    ['What **idea** does the tree stand for?', 'We need the idea the tree stands for.'],
  ],
  know: {
    title: 'Symbols and theme',
    md: 'A **symbol** is a person, object or place that stands for a **bigger idea**. Clues: what the object is **linked** to, how it **changes**, and when it **appears**. Symbols often help show the **theme**: the message about life.',
    say: [
      'Here is the idea we need. A symbol is a person, object or place that stands for a bigger idea.',
      'To decode one, look at what it is linked to, how it changes, and when it appears in the story. Symbols often help show the theme, the story’s message about life.',
    ],
  },
  plan: [
    ['What is the tree **linked** to?', 'Here is the plan. First, ask what the tree is linked to.'],
    ['How does it **change**, and **when**?', 'Second, ask how it changes, and when.'],
    ['What **idea** fits both?', 'Third, find the idea that fits both.'],
  ],
  steps: [
    scene('Step 1: What the tree is linked to', [quote('p', ['[[theta:Grandpa planted]] the apple tree [[theta:the year Esi was born]]. Every autumn, they [[theta:picked the fruit together]], and he [[theta:told her stories]] under its branches.'])], [
      { say: 'Step one. Pause and notice who and what the tree is linked to.', show: 'p', wait: 3 },
      { say: 'Grandpa planted it when Esi was born, and it is where they spent time together and he told her stories. The tree is tied to Grandpa and to their love.', focus: 'p.0' },
    ]),
    scene('Step 2: How and when it changes', [quote('q', ['[[bad:The spring after he died]]… [[good:Small white blossoms covered every branch.]] … for the first time in months, [[good:she smiled]].']), text('n', 'Grandpa is gone, but **his tree is alive** and comforts Esi.')], [
      { say: 'Step two. After Grandpa dies, the tree blossoms. And it makes Esi smile for the first time in months.', show: 'q' },
      { say: 'So Grandpa is gone, but something he made is still alive, and still comforts her.', show: 'n' },
    ]),
    scene('Step 3: Match the choices', [table('t', ['Choice', 'Fits?'], [['A: the seasons', '[[bad:✗ too general; misses Grandpa]]'], ['B: love of gardening', '[[bad:✗ Esi never gardens]]'], ['C: Grandpa’s love lives on', '[[good:✓ linked to him; blooms after he dies]]'], ['D: danger of climbing', '[[bad:✗ no one climbs]]']])], [
      { say: 'Step three. Only C uses both clues: the tree is linked to Grandpa, and it lives on after him. The answer is C.', show: ['t.0', 't.1', 't.2', 't.3'], focus: 't.2' },
    ]),
  ],
  check: [
    ['The **theme**: love can outlast loss', 'Let us check with the theme. The story suggests that love can outlast loss.'],
    ['The tree **shows** that theme', 'The blossoming tree shows exactly that. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '**Autumn** and **spring** appear, but that is the **literal** level', 'Choice A is the trap. Seasons appear, but that is only what happens on the surface, not what the tree stands for.'],
      ['B', 'Esi does not **garden**', 'Choice B: Esi never gardens.'],
      ['D', 'Nobody **climbs**', 'Choice D: nobody climbs the tree.'],
    ],
  },
  yourTurn: {
    prompt: '*A girl keeps a small lamp burning in her window every night while her brother is away at sea.* What does the lamp most likely symbolize?',
    choices: ['hope that he will come home', 'fear of the dark', 'a love of reading', 'the cost of electricity'],
    answer: 0,
    working: 'She keeps it lit **while he is away**: waiting, and hoping.',
    ask: 'A girl keeps a small lamp burning in her window every night while her brother is away at sea. What does the lamp most likely symbolize? A: hope that he will come home. B: fear of the dark. C: a love of reading. D: the cost of electricity.',
    reveal: 'The answer is A, hope that he will come home. She lights it only while he is away, as if guiding him back.',
  },
  sum: [
    ['A **symbol** stands for a **bigger idea**', 'Here is what to remember. A symbol stands for a bigger idea.'],
    ['Look at what it is **linked to**, and how and when it **changes**', 'Look at what it is linked to, and how and when it changes.'],
    ['Symbols help show the **theme**', 'Symbols help show the theme. For more on theme and symbol, watch this lesson’s explainer video on Gradileo.'],
  ],
});
