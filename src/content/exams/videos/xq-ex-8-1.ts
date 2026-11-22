import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 8.1 (Power and Conflict: Ozymandias, London and The Prelude). An exam-style
// question we wrote, in the style of a GCSE English Literature exam, on William Wordsworth's The Prelude
// (1850 text), which is in the public domain. The answer is C: the mountain seems alive and threatening,
// showing nature's power over the boy.

const POEM = ['When, from behind that craggy steep till then<br>The horizon’s bound, a huge peak, black and huge,<br>As if with voluntary power instinct,<br>Upreared its head.'];

export default englishExam({
  lesson: 'ex-8-1',
  ...ours('a GCSE English Literature exam', 'the poem is William Wordsworth’s The Prelude (1850), in the public domain'),
  title: 'What Does the “Huge Peak” Show in The Prelude?',
  thumbnailTitle: 'The Prelude',
  subtitle: 'The power of nature, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on an extract from Wordsworth’s The Prelude. A boy steals a boat and rows out onto a lake at night, when a mountain rises into view. We look at how the peak is described, and explain what it shows about nature’s power.',
  intro: [
    'In this video, we solve an exam-style question about The Prelude. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Wordsworth’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'William Wordsworth, The Prelude (1850), Book 1, the stolen boat extract',
    say: ['First, the context. As a boy, the speaker takes a boat without asking and rows proudly out onto a lake at night. Then: When, from behind that craggy steep till then the horizon’s bound, a huge peak, black and huge, as if with voluntary power instinct, upreared its head.'],
  },
  question: {
    prompt: 'What does this description of the peak mainly show?',
    text: 'Read the lines from The Prelude. What does this description of the peak mainly show?',
    choices: [
      'The boy has reached the top of the mountain.',
      'Nature is calm and welcoming to the boy.',
      'Nature seems alive and threatening, and its power overwhelms the boy’s confidence.',
      'The weather is about to change.',
    ],
    answer: 2,
    working: '*huge… black and huge* (**size**, **darkness**); *with voluntary power* (**alive**, choosing); *Upreared its head* (like a **beast**).',
    say: [
      'What does this description of the peak mainly show?',
      'A: The boy has reached the top of the mountain. B: Nature is calm and welcoming to the boy. C: Nature seems alive and threatening, and its power overwhelms the boy’s confidence. D: The weather is about to change.',
    ],
  },
  ask: [
    ['A mountain comes into **view**', 'A mountain comes into view.'],
    ['What does its description **show**?', 'We need to say what the description shows.'],
  ],
  know: {
    title: 'Ozymandias, London and The Prelude',
    md: '**Ozymandias** (Shelley): a ruined statue shows that human **power** is temporary. **London** (Blake): a walk through a city of **suffering**, blaming church and state (*In every cry of every Man*). **The Prelude** (Wordsworth): a boy’s **confidence** is crushed by nature’s **power**. All three set **human power** against something greater: **time**, **injustice** or **nature**.',
    say: [
      'Here is the idea we need. In Ozymandias, by Shelley, a ruined statue shows that human power is temporary. In London, by Blake, a walk through the city reveals suffering everywhere, and blames the church and the state: in every cry of every man.',
      'In The Prelude, by Wordsworth, a boy’s confidence is crushed by the power of nature. All three set human power against something greater: time, injustice, or nature.',
    ],
  },
  plan: [
    ['Look at the **size** words', 'Here is the plan. First, look at the words for size.'],
    ['Look at the **life** words', 'Second, look at the words that make the peak seem alive.'],
    ['Say what it **shows**', 'Third, say what it shows.'],
  ],
  steps: [
    scene('Step 1: Size and life', [table('t', ['Words', 'Effect'], [['*a huge peak, black and **huge***', '**huge** twice: overwhelming **size** and **darkness**'], ['*As if with **voluntary power** instinct*', 'as if it **chooses** to move: **alive**'], ['***Upreared** its head*', 'like a **beast** rising to attack']])], [
      { say: 'Step one. A huge peak, black and huge. The word huge comes twice, as if the boy cannot find a bigger word. And it is black.', show: 't.0' },
      { say: 'As if with voluntary power instinct: as if the mountain chooses to move. It seems alive.', show: 't.1' },
      { say: 'Upreared its head: like a beast rising up to attack.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: What it shows', [quote('p', ['…a [[bad:huge peak, black and huge]],', 'As if with [[bad:voluntary power]] instinct,', '[[bad:Upreared its head]].']), text('a', 'Nature: **alive**, **threatening**, **more powerful** than the boy → **C**', 'lg')], [
      { say: 'Step two. The proud boy suddenly feels small and guilty. Nature seems alive, threatening, and far more powerful than he is.', show: 'p' },
      { say: 'The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['He rows **back**, trembling, and is troubled for **days**', 'Let us check. The boy turns and rows back, trembling, and is troubled for days afterwards.'],
    ['nature’s **power** has changed him', 'Nature’s power has changed him. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Nature is often **peaceful** in Wordsworth, but **not** here', 'Choice B is the trap. Wordsworth often shows peaceful nature, but here it is frightening.'],
      ['A', 'He is on a **lake**, not the summit', 'Choice A: he is on a lake, not the summit.'],
      ['D', 'No **weather** in the lines', 'Choice D: the lines say nothing about the weather.'],
    ],
  },
  yourTurn: {
    prompt: 'Which poem contains the line *“In every cry of every Man”*?',
    choices: ['London', 'Ozymandias', 'The Prelude', 'Exposure'],
    answer: 0,
    working: 'Blake’s **London**: suffering **everywhere**.',
    ask: 'Which poem contains the line, In every cry of every Man? A: London. B: Ozymandias. C: The Prelude. D: Exposure.',
    reveal: 'The answer is A, Blake’s London. The repeated every shows that suffering is everywhere in the city.',
  },
  sum: [
    ['The Prelude: nature’s **power** humbles the boy', 'Here is what to remember. In The Prelude, nature’s power humbles the boy.'],
    ['Look for **size** words and **life** words', 'Look for size words, and words that make nature seem alive.'],
    ['Compare: human power against **time**, **injustice**, **nature**', 'And compare how each poem sets human power against time, injustice or nature. For more on these Power and Conflict poems, watch this lesson’s explainer video on Gradileo.'],
  ],
});
