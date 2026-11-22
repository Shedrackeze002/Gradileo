import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 1.2 (irony). An exam-style question we wrote, in the style of a Grade 8
// reading test, on O. Henry's story "The Gift of the Magi" (1905), which is in the public domain; the
// plot is summarised in our own words. The answer is C, situational irony: each gift is made useless
// by the very sacrifice the other made.

const SUMMARY = [
  'Della and Jim are very poor. To buy Jim a chain for his treasured gold watch, Della sells her long, beautiful hair.',
  'When Jim comes home, he gives Della a set of combs for her hair. To pay for them, he has sold his watch.',
];

export default englishExam({
  lesson: 'e8-1-2',
  ...ours('a Grade 8 reading test', 'the story is O. Henry’s “The Gift of the Magi” (1905), in the public domain, summarised by Gradileo'),
  title: 'What Kind of Irony Ends “The Gift of the Magi”?',
  thumbnailTitle: 'Irony',
  subtitle: 'Verbal, situational and dramatic irony, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time, on O. Henry’s story “The Gift of the Magi”. Della sells her hair to buy a watch chain, and Jim sells his watch to buy her combs. We learn the three kinds of irony and decide which one this ending shows.',
  intro: [
    'In this video, we solve an exam-style reading question about irony. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 8 reading test, on O. Henry’s story The Gift of the Magi, which is in the public domain.',
  ],
  passage: {
    lines: SUMMARY,
    by: 'A summary of O. Henry, “The Gift of the Magi” (1905)',
    say: [
      'First, here is what happens in the story. Della and Jim are very poor. To buy Jim a chain for his treasured gold watch, Della sells her long, beautiful hair.',
      'When Jim comes home, he gives Della a set of combs for her hair. To pay for them, he has sold his watch.',
    ],
  },
  question: {
    prompt: 'Which kind of **irony** does the ending of the story show?',
    text: 'Read the summary of “The Gift of the Magi”. Which kind of irony does the ending of the story show?',
    choices: ['verbal irony', 'dramatic irony', 'situational irony', 'no irony'],
    answer: 2,
    working: 'The **outcome** is the **opposite** of what was expected: each gift is useless because of the other’s sacrifice.',
    say: ['Which kind of irony does the ending of the story show? A: verbal irony. B: dramatic irony. C: situational irony. D: no irony.'],
  },
  ask: [
    ['There are **three** kinds of irony', 'There are three kinds of irony.'],
    ['Which one fits this **ending**?', 'We need the one that fits this ending.'],
  ],
  know: {
    title: 'Three kinds of irony',
    md: '**Verbal** irony: saying the **opposite** of what you mean (*Lovely weather!* in a storm). **Situational** irony: what **happens** is the opposite of what was **expected**. **Dramatic** irony: the **audience** knows something a **character** does not.',
    say: [
      'Here is the idea we need. Verbal irony is saying the opposite of what you mean, like saying lovely weather in a storm.',
      'Situational irony is when what happens is the opposite of what was expected. And dramatic irony is when the audience knows something that a character does not.',
    ],
  },
  plan: [
    ['What did the characters **expect**?', 'Here is the plan. First, what did the characters expect?'],
    ['What **actually** happened?', 'Second, what actually happened?'],
    ['Which irony **fits**?', 'Third, which kind of irony fits?'],
  ],
  steps: [
    scene('Step 1: Expected and actual', [table('t', ['', 'Expected', 'Actually']
      , [['Della’s gift', 'a chain for Jim’s **watch**', '[[bad:Jim has **sold** the watch]]'], ['Jim’s gift', 'combs for Della’s **hair**', '[[bad:Della has **sold** her hair]]']])], [
      { say: 'Step one. Della expects her chain to be perfect for Jim’s watch. But Jim has sold the watch.', show: 't.0' },
      { say: 'Jim expects his combs to be perfect for Della’s hair. But Della has sold her hair.', show: 't.1' },
      { say: 'Each gift is made useless by the very thing the other gave up. That is the opposite of what both of them expected.' },
    ]),
    scene('Step 2: Which irony?', [table('m', ['Kind', 'Fits?'], [['verbal', '[[bad:✗ nobody says the opposite of what they mean]]'], ['dramatic', '[[bad:✗ we learn the truth at the same time as Della]]'], ['situational', '[[good:✓ the outcome is the opposite of the plan]]']]), text('a', 'The answer is **C, situational irony**.')], [
      { say: 'Step two. Nobody says the opposite of what they mean, so it is not verbal irony.', show: 'm.0' },
      { say: 'And we find out about the watch at the same moment as Della, so it is not dramatic irony.', show: 'm.1' },
      { say: 'The outcome is the opposite of what they planned. That is situational irony. The answer is C.', show: ['m.2', 'a'], focus: 'm.2' },
    ]),
  ],
  check: [
    ['The **effect**: the gifts fail, but the **love** behind them shines', 'Let us check with the effect. The gifts fail, but the love behind them shines through.'],
    ['That is the point of the irony', 'That surprising twist of events is exactly what situational irony is for. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'We do **not** know before the characters', 'Choice B is the trap. Dramatic irony needs the reader to know first, but O. Henry keeps us in the dark too.'],
      ['A', 'No one says the **opposite** of what they mean', 'Choice A: nobody uses sarcasm here.'],
      ['D', 'The ending is **full** of irony', 'Choice D: the ending is full of irony.'],
    ],
  },
  yourTurn: {
    prompt: 'In a play, the audience knows the cake is poisoned, but the character happily takes a bite. This is:',
    choices: ['verbal irony', 'dramatic irony', 'situational irony', 'a simile'],
    answer: 1,
    working: 'The **audience** knows what the **character** does not.',
    ask: 'In a play, the audience knows the cake is poisoned, but the character happily takes a bite. This is: A: verbal irony. B: dramatic irony. C: situational irony. D: a simile.',
    reveal: 'The answer is B, dramatic irony. The audience knows something the character does not, which builds tension.',
  },
  sum: [
    ['**Verbal**: saying the opposite of what you mean', 'Here is what to remember. Verbal irony is saying the opposite of what you mean.'],
    ['**Situational**: the outcome is the opposite of what was expected', 'Situational irony is when the outcome is the opposite of what was expected.'],
    ['**Dramatic**: the audience knows more than a character', 'Dramatic irony is when the audience knows more than a character. For more on irony, watch this lesson’s explainer video on Gradileo.'],
  ],
});
