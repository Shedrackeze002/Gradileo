import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 3.1 (the language and imagery of Macbeth). An exam-style question we wrote, in
// the style of a Grade 11 reading test, on William Shakespeare's Macbeth (about 1606), which is in the
// public domain. The answer is C: Macbeth means his guilt is so great that even all the oceans could not
// wash it away; instead, his bloody hand would turn the seas red.

const LINES = ['**Macbeth:** Will all great Neptune’s ocean wash this blood<br>Clean from my hand? No; this my hand will rather<br>The multitudinous seas incarnadine,<br>Making the green one red.'];

export default englishExam({
  lesson: 'e11-3-1',
  ...ours('a Grade 11 reading test', 'the play is William Shakespeare’s Macbeth (about 1606), in the public domain'),
  title: 'What Does Macbeth Mean by “Making the Green One Red”?',
  thumbnailTitle: 'Blood Imagery in Macbeth',
  subtitle: 'Paraphrasing Shakespeare, step by step',
  summary:
    'An exam-style question on Macbeth, solved one small step at a time: moments after murdering King Duncan, Macbeth stares at his bloody hands. We decode Neptune, multitudinous and incarnadine, paraphrase the lines, and link them to the play’s blood imagery.',
  intro: [
    'In this video, we solve an exam-style question about the language of Macbeth. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Shakespeare’s play, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'William Shakespeare, Macbeth, Act 2, Scene 2',
    say: ['First, read Macbeth’s lines. He has just murdered King Duncan in his sleep, and stares at his bloody hands. Will all great Neptune’s ocean wash this blood clean from my hand? No; this my hand will rather the multitudinous seas incarnadine, making the green one red.'],
  },
  question: {
    prompt: 'What does Macbeth **mean** in these lines?',
    text: 'Read Macbeth’s lines from Act 2. What does Macbeth mean in these lines?',
    choices: [
      'He plans to go to sea to escape.',
      'He will wash his hands in the ocean and feel clean.',
      'His guilt is so great that, instead of the ocean washing his hand clean, his hand would turn all the seas red.',
      'He is admiring the colour of the sea.',
    ],
    answer: 2,
    working: '*incarnadine* = turn **red**; the blood would **stain the oceans**, not wash away: **guilt** that can never be cleaned.',
    say: [
      'What does Macbeth mean in these lines?',
      'A: He plans to go to sea to escape. B: He will wash his hands in the ocean and feel clean. C: His guilt is so great that, instead of the ocean washing his hand clean, his hand would turn all the seas red. D: He is admiring the colour of the sea.',
    ],
  },
  ask: [
    ['Hard words: **Neptune**, **multitudinous**, **incarnadine**', 'The lines use some hard words: Neptune, multitudinous and incarnadine.'],
    ['What does Macbeth **mean**?', 'We need to paraphrase what Macbeth means.'],
  ],
  know: {
    title: 'Macbeth’s language and imagery',
    md: 'To **paraphrase**, decode each hard word, restore normal **word order**, then say it plainly. Macbeth is built on **patterns of imagery**: **blood** (guilt and violence), **darkness** (evil hidden from sight), **sleep** (innocence and peace, which Macbeth destroys), and **clothing** (titles that do not fit him, like a giant’s robe on a dwarfish thief).',
    say: [
      'Here is the idea we need. To paraphrase, decode each hard word, put the words back in normal order, then say it plainly.',
      'Macbeth is built on patterns of imagery: blood, for guilt and violence; darkness, for evil hidden from sight; sleep, for the innocence and peace that Macbeth destroys; and clothing, for titles that do not fit him.',
    ],
  },
  plan: [
    ['Decode the **hard words**', 'Here is the plan. First, decode the hard words.'],
    ['Put the words in **normal order**', 'Second, put the words in normal order.'],
    ['**Paraphrase**', 'Third, paraphrase the lines.'],
  ],
  steps: [
    scene('Step 1: Decode', [table('t', ['Shakespeare', 'Meaning'], [['**Neptune**', 'Roman god of the **sea**'], ['**multitudinous**', 'countless, **vast**'], ['**incarnadine**', 'turn **blood-red**'], ['*the green one*', 'the **green** sea']])], [
      { say: 'Step one. Neptune is the Roman god of the sea, so Neptune’s ocean is all the ocean in the world.', show: 't.0' },
      { say: 'Multitudinous means countless, or vast. Incarnadine means to turn blood-red. And the green one is the green sea.', show: ['t.1', 't.2', 't.3'] },
    ]),
    scene('Step 2: Word order and paraphrase', [quote('p', ['…this my hand will rather / The multitudinous seas [[bad:incarnadine]]…']), text('n', 'Normal order: *my hand will rather **turn** the vast seas **red**, making the green sea red*'), text('a', 'His **guilt** can never be washed away → **C**', 'lg')], [
      { say: 'Step two. Put the words in normal order: my hand will rather turn the vast seas red, making the green sea red.', show: ['p', 'n'] },
      { say: 'So he asks whether all the ocean could wash the blood away. No: his bloody hand would stain all the oceans red instead. His guilt is too great to ever wash off. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['Hyperbole: a drop of blood **colours** every sea', 'Let us check. The image is a hyperbole: his small, bloody hand colours every sea on earth.'],
    ['Blood = **guilt**, the play’s key image', 'And blood stands for guilt, one of the play’s key images. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'He asks **if** water can clean him, and answers **No**', 'Choice B is the trap. He does ask if the ocean can wash his hand, but he answers no.'],
      ['A', 'No plan to **travel**', 'Choice A: he has no plan to travel.'],
      ['D', 'The sea turns **red**, from his guilt', 'Choice D: he imagines the sea turning red, not admiring its colour.'],
    ],
  },
  yourTurn: {
    prompt: 'Which pattern of imagery in *Macbeth* is most linked to **guilt**?',
    choices: ['blood', 'flowers', 'snow', 'birdsong'],
    answer: 0,
    working: '**Blood** stains Macbeth and Lady Macbeth throughout.',
    ask: 'Which pattern of imagery in Macbeth is most linked to guilt? A: blood. B: flowers. C: snow. D: birdsong.',
    reveal: 'The answer is A, blood. Later, Lady Macbeth sleepwalks, trying to wash an imaginary spot of blood from her hands.',
  },
  sum: [
    ['Decode, **reorder**, then paraphrase', 'Here is what to remember. Decode the words, reorder them, then paraphrase.'],
    ['**Blood** = guilt; **darkness** = evil; **sleep** = innocence', 'Blood stands for guilt, darkness for evil, and sleep for innocence.'],
    ['Trace each image through the **play**', 'And trace each image through the play. For more on the language and imagery of Macbeth, watch this lesson’s explainer video on Gradileo.'],
  ],
});
