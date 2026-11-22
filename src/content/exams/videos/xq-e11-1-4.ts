import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 1.4 (symbolism and allegory). An exam-style question we wrote, in the style of
// a Grade 11 reading test, on Edgar Allan Poe's "The Masque of the Red Death" (1842), which is in the
// public domain. The answer is C: the ebony clock, which halts the dancers every hour, stands for passing
// time and approaching death.

const LINES = ['…there stood against the western wall, a gigantic clock of ebony. Its pendulum swung to and fro with a dull, heavy, monotonous clang… the musicians of the orchestra were constrained to pause, momentarily, in their performance, to hearken to the sound; and thus the waltzers perforce ceased their evolutions…'];

export default englishExam({
  lesson: 'e11-1-4',
  ...ours('a Grade 11 reading test', 'the story is Edgar Allan Poe’s “The Masque of the Red Death” (1842), in the public domain'),
  title: 'What Does the Ebony Clock Symbolize?',
  thumbnailTitle: 'Symbolism',
  subtitle: 'Interpreting a symbol, step by step',
  summary:
    'An exam-style question on Edgar Allan Poe’s “The Masque of the Red Death”, solved one small step at a time: a prince and his guests hide from a plague in a sealed abbey, where a giant ebony clock stops the dancing every hour. We gather the clues and interpret the symbol.',
  intro: [
    'In this video, we solve an exam-style question about symbolism. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 reading test, on Poe’s story, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Edgar Allan Poe, “The Masque of the Red Death” (1842)',
    say: ['First, the story. A deadly plague, the Red Death, sweeps the land. Prince Prospero seals himself and a thousand guests inside an abbey and holds a masked ball. In the last room stands a giant clock. There stood against the western wall, a gigantic clock of ebony. Its pendulum swung to and fro with a dull, heavy, monotonous clang. Every hour, the musicians were forced to pause, to listen to the sound; and so the dancers had to stop their dancing.'],
  },
  question: {
    prompt: 'What does the **ebony clock** most likely **symbolize**?',
    text: 'Read the passage from “The Masque of the Red Death”. What does the ebony clock most likely symbolize?',
    choices: ['the prince’s great wealth', 'a joyful celebration', 'the passing of time and approaching death', 'the skill of the musicians'],
    answer: 2,
    working: 'Black (*ebony*), a **heavy** clang, and every hour it **stops** the dancers: time running out, **death** coming.',
    say: ['What does the ebony clock most likely symbolize? A: the prince’s great wealth. B: a joyful celebration. C: the passing of time and approaching death. D: the skill of the musicians.'],
  },
  ask: [
    ['A **symbol** stands for an idea', 'A symbol is an object that stands for an idea.'],
    ['What does **the clock** stand for?', 'We need to interpret the ebony clock.'],
  ],
  know: {
    title: 'Symbolism and allegory',
    md: 'A **symbol** is an object, place or character that stands for an **idea** beyond itself. To interpret one, gather **clues**: its **description** (colour, sound), **where** it appears, and **what it does** to characters. A symbol’s meaning can **grow** as a story goes on. An **allegory** is a whole story in which characters and events stand for ideas.',
    say: [
      'Here is the idea we need. A symbol is an object, place or character that stands for an idea beyond itself. To interpret one, gather clues: its description, such as colour and sound, where it appears, and what it does to the characters.',
      'A symbol’s meaning can grow as a story goes on. And an allegory is a whole story in which the characters and events stand for ideas.',
    ],
  },
  plan: [
    ['Gather the **clues**', 'Here is the plan. First, gather the clues about the clock.'],
    ['Find the idea they **share**', 'Second, find the idea they share.'],
  ],
  steps: [
    scene('Step 1: The clues', [table('t', ['Clue', 'Suggests'], [['*ebony*: **black**', 'darkness, **death**'], ['*dull, heavy, monotonous clang*', '**gloom**, something unstoppable'], ['a **clock** that strikes every **hour**', '**time** passing'], ['the dancers **must stop** to listen', 'no one can **ignore** it']])], [
      { say: 'Step one. Gather the clues. Ebony is black, a colour linked with darkness and death.', show: 't.0' },
      { say: 'Its sound is dull, heavy and monotonous. And it is a clock, marking each hour as it passes.', show: ['t.1', 't.2'] },
      { say: 'Every hour, the music and dancing must stop. No one can ignore it.', show: 't.3' },
    ]),
    scene('Step 2: The idea', [quote('p', ['…a gigantic clock of [[bad:ebony]]… a [[bad:dull, heavy, monotonous clang]]…']), text('a', 'Time running out, death **coming** for all → **C**', 'lg')], [
      { say: 'Step two. Together, the clues suggest time running out, and death approaching, which no wall or party can keep away. The answer is C.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['At **midnight**, the Red Death appears', 'Let us check. As the clock strikes midnight, the Red Death itself appears among the guests.'],
    ['The clock **counted down** to it', 'The clock was counting down to it all along. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The abbey **is** rich, but the clock **stops** the party', 'Choice A is the trap. The abbey is full of wealth, but the clock interrupts the pleasure money buys.'],
      ['B', 'The clock **interrupts** the joy', 'Choice B: the clock interrupts the joy, it does not stand for it.'],
      ['D', 'The musicians must **stop**', 'Choice D: the clock forces the musicians to stop.'],
    ],
  },
  yourTurn: {
    prompt: 'What is an **allegory**?',
    choices: ['a very short poem', 'a story told in letters', 'a funny story with a twist', 'a story whose characters and events stand for ideas beyond the story'],
    answer: 3,
    working: 'The **whole** story works as a **symbol** for ideas.',
    ask: 'What is an allegory? A: a very short poem. B: a story told in letters. C: a funny story with a twist. D: a story whose characters and events stand for ideas beyond the story.',
    reveal: 'The answer is D. In an allegory, the whole story works like a symbol, with characters and events standing for ideas.',
  },
  sum: [
    ['A **symbol** stands for an idea', 'Here is what to remember. A symbol stands for an idea.'],
    ['Gather **clues**: description, place, effect', 'Gather clues from its description, where it appears, and its effect.'],
    ['An **allegory** is a story-length symbol', 'And an allegory is a whole story that works like a symbol. For more on symbolism and allegory, watch this lesson’s explainer video on Gradileo.'],
  ],
});
