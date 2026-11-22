import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 1.3 (symbol and allegory). An exam-style question we wrote, in the style of a
// Grade 9 reading test, on a passage from John Bunyan's The Pilgrim's Progress (1678), which is in the
// public domain. The answer is C: in this allegory, the bog named "Despond" stands for despair.

const PASSAGE = ['Now I saw in my dream, that just as they had ended this talk they drew near to a very miry slough, that was in the midst of the plain; and they, being heedless, did both fall suddenly into the bog. The name of the slough was Despond.'];

export default englishExam({
  lesson: 'e9-1-3',
  ...ours('a Grade 9 reading test', 'the passage is from John Bunyan’s The Pilgrim’s Progress (1678), in the public domain'),
  title: 'What Does the “Slough of Despond” Stand For?',
  thumbnailTitle: 'Allegory',
  subtitle: 'Symbol and allegory, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time, on a passage from John Bunyan’s allegory The Pilgrim’s Progress, where travellers fall into a bog called the Slough of Despond. We learn how an allegory works, decode the name and the image, and say what the bog stands for.',
  intro: [
    'In this video, we solve an exam-style reading question about allegory. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on a passage from The Pilgrim’s Progress, which is in the public domain.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'John Bunyan, The Pilgrim’s Progress (1678)',
    say: ['First, read the passage. Now I saw in my dream, that just as they had ended this talk they drew near to a very miry slough, that was in the midst of the plain; and they, being heedless, did both fall suddenly into the bog. The name of the slough was Despond.'],
  },
  question: {
    prompt: '*The Pilgrim’s Progress* is an **allegory** of a person’s journey through life. What does the **Slough of Despond** most likely stand for?',
    text: 'Read the passage from The Pilgrim’s Progress, an allegory of a person’s journey through life. What does the Slough of Despond most likely stand for?',
    choices: ['a real swamp in England', 'the joy of reaching home', 'despair that can trap people on their journey', 'the weather on the plain'],
    answer: 2,
    working: '*Despond* = **despair**; a **miry bog** you fall into **suddenly** and get stuck in is a picture of sinking into hopelessness.',
    say: ['The Pilgrim’s Progress is an allegory of a person’s journey through life. What does the Slough of Despond most likely stand for? A: a real swamp in England. B: the joy of reaching home. C: despair that can trap people on their journey. D: the weather on the plain.'],
  },
  ask: [
    ['An **allegory** has a **second meaning**', 'An allegory is a story with a second meaning underneath.'],
    ['What does the **bog** stand for?', 'We need to decode what the bog stands for.'],
  ],
  know: {
    title: 'Symbol, motif and allegory',
    md: 'A **symbol** is an object that stands for an idea. A **motif** is an image or idea that **repeats**. An **allegory** is a whole story where characters, places and events stand for **ideas**, so it has a **second meaning**. Names are often **clues**.',
    say: [
      'Here is the idea we need. A symbol is an object that stands for an idea. A motif is an image or idea that repeats through a story.',
      'An allegory is a whole story in which characters, places and events stand for ideas, so it carries a second meaning. In an allegory, names are often clues.',
    ],
  },
  plan: [
    ['Decode the **name**', 'Here is the plan. First, decode the name.'],
    ['Picture the **image**', 'Second, picture the image.'],
    ['Link it to the **journey through life**', 'Third, link it to the journey through life.'],
  ],
  steps: [
    scene('Step 1: Name and image', [quote('p', ['…a very [[bad:miry slough]]… they, being heedless, did both [[bad:fall suddenly]] into the bog. The name of the slough was [[theta:Despond]].']), table('t', ['Clue', 'Meaning'], [['**slough**', 'a muddy **bog**'], ['**miry**', 'deep, sticky **mud**'], ['**Despond**', 'to lose hope: **despair**'], ['**fall suddenly**', 'it catches you **unaware**']])], [
      { say: 'Step one. Pause and look at the name: Despond. To despond means to lose hope. Despondent means hopeless.', show: 'p', wait: 3 },
      { say: 'A slough is a bog, and miry means deep, sticky mud. They fall into it suddenly, without seeing it.', show: ['t.0', 't.1', 't.2', 't.3'] },
    ]),
    scene('Step 2: The second meaning', [text('a', 'Falling into **despair**: sudden, sticky, hard to climb out of → **C**', 'lg')], [
      { say: 'Step two. On the journey through life, what is like a sticky bog that you fall into suddenly and struggle to climb out of? Despair. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['The **name** and the **image** point the same way', 'Let us check. The name, Despond, and the image, a sticky bog, both point to despair.'],
    ['and allegory places stand for **ideas**', 'And in an allegory, places stand for ideas. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Reads the bog **literally**', 'Choice A is the trap. It reads the bog literally, but in an allegory the place stands for an idea.'],
      ['B', 'The **opposite** of despair', 'Choice B is the opposite of despair.'],
      ['D', 'Ignores the **name**', 'Choice D ignores the name.'],
    ],
  },
  yourTurn: {
    prompt: 'In a story, a broken clock appears every time a character thinks about her lost childhood. The repeated clock is best described as:',
    choices: ['a setting', 'a narrator', 'a motif', 'a conflict'],
    answer: 2,
    working: 'An image that **repeats** and links to an idea: a **motif**.',
    ask: 'In a story, a broken clock appears every time a character thinks about her lost childhood. The repeated clock is best described as: A: a setting. B: a narrator. C: a motif. D: a conflict.',
    reveal: 'The answer is C, a motif. The clock repeats, and each time links to the idea of time lost.',
  },
  sum: [
    ['A **symbol** stands for an idea; a **motif** repeats', 'Here is what to remember. A symbol stands for an idea, and a motif repeats.'],
    ['An **allegory** is a whole story with a **second meaning**', 'An allegory is a whole story with a second meaning.'],
    ['**Names** and **images** are clues', 'Names and images are clues. For more on symbol and allegory, watch this lesson’s explainer video on Gradileo.'],
  ],
});
