import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 2.3 (stanzas and rhyme scheme). An exam-style question we wrote, in the
// style of a Grade 6 reading test, on the first stanza of Robert Louis Stevenson's "Bed in Summer"
// (A Child's Garden of Verses, 1885, public domain). The answer is B, AABB: night/candle-light,
// way/day.

const STANZA = ['In winter I get up at night', 'And dress by yellow candle-light.', 'In summer, quite the other way,', 'I have to go to bed by day.'];

export default englishExam({
  lesson: 'e6-2-3',
  ...ours('a Grade 6 reading test', 'the poem is Robert Louis Stevenson’s “Bed in Summer” (1885, public domain)'),
  title: 'What Is the Rhyme Scheme of “Bed in Summer”?',
  thumbnailTitle: 'Rhyme Scheme',
  subtitle: 'Lettering the rhymes, step by step',
  summary:
    'An exam-style question on Robert Louis Stevenson’s poem “Bed in Summer”, solved one small step at a time: what is the rhyme scheme of its first stanza? We find the last word of each line, give every new end sound a letter, and read the pattern.',
  intro: [
    'In this video, we solve an exam-style question about rhyme scheme. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 6 reading test. The poem is by Robert Louis Stevenson, from eighteen eighty-five.',
  ],
  passage: {
    lines: STANZA,
    by: 'Robert Louis Stevenson, “Bed in Summer” (first stanza)',
    say: ['First, read the stanza. In winter I get up at night and dress by yellow candle-light. In summer, quite the other way, I have to go to bed by day.'],
  },
  question: {
    prompt: 'What is the **rhyme scheme** of this stanza?',
    text: 'Read the first stanza of “Bed in Summer” by Robert Louis Stevenson. What is the rhyme scheme of this stanza?',
    choices: ['ABAB', 'AABB', 'ABCB', 'ABBA'],
    answer: 1,
    working: '*night*, *light* = A A; *way*, *day* = B B.',
    say: ['What is the rhyme scheme of this stanza? A: A B A B. B: A A B B. C: A B C B. D: A B B A.'],
  },
  ask: [
    ['A **stanza** is a group of lines', 'A stanza is a group of lines in a poem, like a paragraph in prose. This one has four lines.'],
    ['Its **rhyme scheme** is the pattern of rhymes', 'Its rhyme scheme is the pattern its rhymes make, written with letters.'],
  ],
  know: {
    title: 'Rhyme scheme',
    md: 'To find a **rhyme scheme**, give the last word of the first line the letter **A**. Every line that rhymes with it is also **A**. The first new end sound is **B**, the next **C**, and so on.',
    say: [
      'Here is the method. Give the last word of the first line the letter A. Any later line that rhymes with it is also A.',
      'The first new end sound gets B, the next new one C, and so on. Then read the letters down the page.',
    ],
  },
  plan: [
    ['Find the **last word** of each line', 'Here is the plan. First, find the last word of each line.'],
    ['Give each **new sound** a new letter', 'Second, give each new end sound a new letter.'],
    ['Read the **pattern**', 'Third, read the pattern.'],
  ],
  steps: [
    scene('Step 1: Letter the lines', [quote('p', STANZA), table('t', ['Line', 'Last word', 'Letter'], [['1', 'night', 'A'], ['2', 'candle-light', 'A'], ['3', 'way', 'B'], ['4', 'day', 'B']])], [
      { say: 'Step one. Pause and find the last words.', show: 'p', wait: 3 },
      { say: 'Line 1 ends with night. That is our first sound, so it gets A.', show: 't.0', focus: 'p.0' },
      { say: 'Line 2 ends with candle-light. Light rhymes with night, so it is also A.', show: 't.1', focus: 'p.1' },
      { say: 'Line 3 ends with way. That is a new sound, so it gets B.', show: 't.2', focus: 'p.2' },
      { say: 'Line 4 ends with day, which rhymes with way. So it is B too.', show: 't.3', focus: 'p.3' },
    ]),
    scene('Step 2: The pattern', [text('n', '**A A B B**: two pairs of rhyming lines, called **couplets**', 'lg'), text('a', 'The answer is **B, AABB**.')], [
      { say: 'Step two. Reading down, the pattern is A, A, B, B. The rhymes come in pairs of lines next to each other, which are called rhyming couplets.', show: 'n' },
      { say: 'So the answer is B, A A B B.', show: 'a' },
    ]),
  ],
  check: [
    ['*night*, *light*: same sound ✓ · *way*, *day*: same sound ✓', 'Let us check. Night and light rhyme. Way and day rhyme.'],
    ['*light* and *way* do **not** rhyme, so they need **different** letters', 'And light and way do not rhyme, so they need different letters. A A B B holds.'],
  ],
  traps: {
    say: 'Each wrong answer is a real rhyme scheme, just not this one.',
    rows: [
      ['A', 'ABAB: rhymes on **alternate** lines', 'A B A B would need lines 1 and 3 to rhyme, night and way. They do not.'],
      ['C', 'ABCB: only lines 2 and 4 rhyme', 'A B C B, common in ballads, would mean lines 1 and 2 do not rhyme. But night and light do.'],
      ['D', 'ABBA: the middle lines rhyme', 'A B B A would need light and way to rhyme.'],
    ],
  },
  yourTurn: {
    prompt: 'What is the rhyme scheme of these lines? *The sun went down behind the hill,* / *The sky turned pink and gold,* / *The evening air was soft and still,* / *The night was growing cold.*',
    choices: ['AABB', 'ABCB', 'ABAB', 'AAAA'],
    answer: 2,
    working: '*hill*, *still* = A; *gold*, *cold* = B → **ABAB**.',
    ask: 'What is the rhyme scheme of these lines? The sun went down behind the hill, the sky turned pink and gold, the evening air was soft and still, the night was growing cold.',
    reveal: 'The answer is C, A B A B. Hill and still rhyme on lines 1 and 3, and gold and cold rhyme on lines 2 and 4.',
  },
  sum: [
    ['A **stanza** is a group of lines; its **rhyme scheme** is its pattern of rhymes', 'Here is what to remember. A stanza is a group of lines, and its rhyme scheme is the pattern of its rhymes.'],
    ['First sound **A**, each new sound the **next letter**', 'Give the first end sound A, and each new end sound the next letter.'],
    ['**AABB** = rhyming couplets · **ABAB** = alternate lines', 'A A B B means rhyming couplets, and A B A B means the rhymes alternate. For more on stanzas and rhyme scheme, watch this lesson’s explainer video on Gradileo.'],
  ],
});
