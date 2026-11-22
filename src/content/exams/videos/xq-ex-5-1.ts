import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 5.1 (A Christmas Carol). An exam-style question we wrote, in the style of a
// GCSE English Literature exam, on Charles Dickens's A Christmas Carol (1843), which is in the public
// domain. The answer is A: "solitary as an oyster" shows Scrooge shut away from others in a hard shell,
// with a hint that something valuable may be hidden inside.

const LINES = ['Hard and sharp as flint, from which no steel had ever struck out generous fire; secret, and self-contained, and solitary as an oyster.'];

export default englishExam({
  lesson: 'ex-5-1',
  ...ours('a GCSE English Literature exam', 'the novella is Charles Dickens’s A Christmas Carol (1843), in the public domain'),
  title: 'What Does “Solitary as an Oyster” Suggest About Scrooge?',
  thumbnailTitle: 'A Christmas Carol',
  subtitle: 'Scrooge in Stave One, step by step',
  summary:
    'An exam-style question on A Christmas Carol, solved one small step at a time. Dickens introduces Scrooge with two striking similes. We unpack the flint and the oyster, and explain what the oyster suggests about Scrooge, now and later.',
  intro: [
    'In this video, we solve an exam-style question about A Christmas Carol. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Literature exam, on Dickens’s novella, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Charles Dickens, A Christmas Carol (1843), Stave One',
    say: ['First, read how Dickens describes Scrooge at the start of the novella. Hard and sharp as flint, from which no steel had ever struck out generous fire; secret, and self-contained, and solitary as an oyster.'],
  },
  question: {
    prompt: 'What does the simile **“solitary as an oyster”** most suggest about Scrooge?',
    text: 'Read the description of Scrooge. What does the simile solitary as an oyster most suggest about Scrooge?',
    choices: [
      'He shuts himself away from others inside a hard shell, though something valuable may be hidden within.',
      'He loves eating seafood at Christmas.',
      'He lives by the sea, far from London.',
      'He is generous to everyone he meets.',
    ],
    answer: 0,
    working: 'An oyster: **closed**, **hard** shell, **alone**; but it can hold a **pearl**: hidden **goodness**.',
    say: [
      'What does the simile solitary as an oyster most suggest about Scrooge?',
      'A: He shuts himself away from others inside a hard shell, though something valuable may be hidden within. B: He loves eating seafood at Christmas. C: He lives by the sea, far from London. D: He is generous to everyone he meets.',
    ],
  },
  ask: [
    ['Dickens compares Scrooge to an **oyster**', 'Dickens compares Scrooge to an oyster.'],
    ['What does that **suggest**?', 'We need to say what the comparison suggests.'],
  ],
  know: {
    title: 'A Christmas Carol',
    md: '**Ebenezer Scrooge**, a miser, is visited on Christmas Eve by the ghost of his old partner **Jacob Marley**, then by the **Ghosts of Christmas Past, Present and Yet to Come**. He sees his lost youth, the **Cratchit** family and **Tiny Tim**, and his own lonely death, and wakes on Christmas morning **transformed**. Themes: **redemption**, **greed**, **poverty** and **social responsibility**. Dickens wrote it in **1843** to make readers care about the poor.',
    say: [
      'Here is the idea we need. Ebenezer Scrooge, a miser, is visited on Christmas Eve by the ghost of his old partner, Jacob Marley, then by the Ghosts of Christmas Past, Present and Yet to Come. He sees his lost youth, the Cratchit family and Tiny Tim, and his own lonely death, and he wakes on Christmas morning transformed.',
      'The themes include redemption, greed, poverty and social responsibility. Dickens wrote it in eighteen forty-three to make readers care about the poor.',
    ],
  },
  plan: [
    ['What is an oyster **like**?', 'Here is the plan. First, what is an oyster like?'],
    ['Link it to **Scrooge**', 'Second, link it to Scrooge.'],
    ['Think about the **ending**', 'Third, think about how the story ends.'],
  ],
  steps: [
    scene('Step 1: The oyster', [table('t', ['An oyster', 'Scrooge'], [['a **hard**, closed shell', 'shuts out **warmth** and **people**'], ['lives **alone**', '*solitary*: no friends, no family'], ['may hold a **pearl**', 'hidden **goodness**, waiting to be found']])], [
      { say: 'Step one. An oyster has a hard, closed shell. Scrooge shuts out warmth and people.', show: 't.0' },
      { say: 'An oyster lives alone, stuck to its rock. Scrooge is solitary, with no friends and no family close to him.', show: 't.1' },
      { say: 'But an oyster may hold a pearl, something precious inside. Perhaps Scrooge has hidden goodness too.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The ending', [quote('p', ['…secret, and self-contained, and [[theta:solitary as an oyster]].']), text('n', 'By the end, the shell **opens**: Scrooge becomes **generous**'), text('a', 'Shut away, but with hidden **value** → **A**', 'lg')], [
      { say: 'Step two. By the end of the story, the shell opens. Scrooge becomes generous and joins in with others.', show: ['p', 'n'] },
      { say: 'So the oyster suggests he is shut away now, with something valuable hidden inside. The answer is A.', show: 'a' },
    ]),
  ],
  check: [
    ['*Hard and sharp as **flint***: the same **coldness**', 'Let us check. Hard and sharp as flint shows the same coldness.'],
    ['and *secret, self-contained* match the **closed** shell', 'And secret and self-contained match the closed shell. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'A **simile**, not about food', 'Choice B is the trap. Oysters are food, but this is a simile about his character, not his dinner.'],
      ['C', 'He lives in **London**', 'Choice C: he lives in London, not by the sea.'],
      ['D', 'At the start he is the **opposite** of generous', 'Choice D: at the start he is the opposite of generous.'],
    ],
  },
  yourTurn: {
    prompt: 'Which ghost visits Scrooge **first**?',
    choices: ['the ghost of Jacob Marley', 'the Ghost of Christmas Past', 'the Ghost of Christmas Present', 'the Ghost of Christmas Yet to Come'],
    answer: 0,
    working: '**Marley** warns him that three spirits will follow.',
    ask: 'Which ghost visits Scrooge first? A: the ghost of Jacob Marley. B: the Ghost of Christmas Past. C: the Ghost of Christmas Present. D: the Ghost of Christmas Yet to Come.',
    reveal: 'The answer is A, Marley’s ghost. He warns Scrooge that three spirits will come.',
  },
  sum: [
    ['Scrooge: **flint** and **oyster**: hard and closed', 'Here is what to remember. Scrooge is like flint and like an oyster, hard and closed.'],
    ['The oyster hints at hidden **goodness**', 'But the oyster hints at hidden goodness.'],
    ['Theme: **redemption**', 'And the novella’s great theme is redemption. For more on A Christmas Carol, watch this lesson’s explainer video on Gradileo.'],
  ],
});
