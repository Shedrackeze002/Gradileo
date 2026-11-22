import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 2.2 (sound and rhythm). An exam-style question we wrote, in the style of a
// Grade 10 reading test, on Robert Louis Stevenson's "From a Railway Carriage" (1885), which is in the
// public domain. The answer is B: the lines rhyme in pairs, AABB.

const POEM = ['Faster than fairies, faster than witches,<br>Bridges and houses, hedges and ditches;<br>And charging along like troops in a battle,<br>All through the meadows the horses and cattle:'];

export default englishExam({
  lesson: 'e10-2-2',
  ...ours('a Grade 10 reading test', 'the poem is Robert Louis Stevenson’s “From a Railway Carriage” (1885), in the public domain'),
  title: 'What Is the Rhyme Scheme of “From a Railway Carriage”?',
  thumbnailTitle: 'Rhyme Scheme',
  subtitle: 'Rhyme, sound and rhythm, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the opening of Stevenson’s “From a Railway Carriage”. We label each line’s end sound with a letter, read off the rhyme scheme, and hear how the rhymes and rhythm imitate a speeding train.',
  intro: [
    'In this video, we solve an exam-style poetry question about rhyme scheme. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Stevenson’s poem, which is in the public domain.',
  ],
  passage: {
    lines: POEM,
    by: 'Robert Louis Stevenson, “From a Railway Carriage” (1885), lines 1 to 4',
    say: ['First, read the opening of the poem. A child looks out of a train window. Faster than fairies, faster than witches, bridges and houses, hedges and ditches; and charging along like troops in a battle, all through the meadows the horses and cattle.'],
  },
  question: {
    prompt: 'What is the **rhyme scheme** of these four lines?',
    text: 'Read the opening of “From a Railway Carriage”. What is the rhyme scheme of these four lines?',
    choices: ['ABAB', 'AABB', 'ABCB', 'ABBA'],
    answer: 1,
    working: '*witches* / *ditches* = **A A**; *battle* / *cattle* = **B B**.',
    say: ['What is the rhyme scheme of these four lines? A: A B A B. B: A A B B. C: A B C B. D: A B B A.'],
  },
  ask: [
    ['A **rhyme scheme** labels the **end sounds**', 'A rhyme scheme labels the sounds at the ends of lines.'],
    ['What is the pattern **here**?', 'We need the pattern in these four lines.'],
  ],
  know: {
    title: 'Rhyme and sound devices',
    md: 'To find a **rhyme scheme**, give the **first** end sound the letter **A**, and every line that **rhymes** with it A too; give the next **new** sound **B**, and so on. Sound devices: **alliteration** (same **first** sounds), **assonance** (same **vowel** sounds), **consonance** (same **consonant** sounds), **onomatopoeia** (a word that **sounds** like its meaning). **Iambic** metre: *da-DUM*; **pentameter** has **five** beats.',
    say: [
      'Here is the idea we need. To find a rhyme scheme, give the first end sound the letter A, and every line that rhymes with it A too. Give the next new sound B, and so on.',
      'Sound devices include alliteration, repeated first sounds; assonance, repeated vowel sounds; consonance, repeated consonant sounds; and onomatopoeia, a word that sounds like its meaning. Iambic metre goes da-DUM, and pentameter has five of these beats in a line.',
    ],
  },
  plan: [
    ['Find each line’s **last word**', 'Here is the plan. First, find each line’s last word.'],
    ['Give each new **sound** a letter', 'Second, give each new sound a letter.'],
    ['Read off the **pattern**', 'Third, read off the pattern.'],
  ],
  steps: [
    scene('Step 1: Label the end sounds', [table('t', ['Line', 'Last word', 'Letter'], [['1', '*witches*', '**A**'], ['2', '*ditches*', '**A** (rhymes with *witches*)'], ['3', '*battle*', '**B** (a new sound)'], ['4', '*cattle*', '**B** (rhymes with *battle*)']])], [
      { say: 'Step one. Line one ends with witches. That is our first sound, so it is A.', show: 't.0' },
      { say: 'Line two ends with ditches, which rhymes with witches. So it is A too.', show: 't.1' },
      { say: 'Line three ends with battle, a new sound, so it is B. And line four ends with cattle, which rhymes with battle: B.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 2: The pattern', [text('a', 'A A B B: **rhyming couplets** → **B**', 'lg'), quote('p', ['[[theta:Faster than fairies, faster]] than witches,'])], [
      { say: 'Step two. The pattern is A A B B. The lines rhyme in pairs, called rhyming couplets. The answer is B.', show: 'a' },
      { say: 'Notice also the repeated f sounds in faster than fairies, faster. With the quick rhymes and rhythm, the poem sounds like a speeding train.', show: 'p' },
    ]),
  ],
  check: [
    ['*witches* does **not** rhyme with *battle*', 'Let us check. Witches does not rhyme with battle, so ABAB cannot be right.'],
    ['The rhymes come in **pairs**', 'The rhymes come in pairs. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'ABAB needs lines 1 and **3** to rhyme', 'Choice A is the trap. ABAB is common, but it needs lines one and three to rhyme, and witches and battle do not.'],
      ['C', 'ABCB: lines 1 and 2 **do** rhyme', 'Choice C: lines one and two do rhyme.'],
      ['D', 'ABBA: lines 2 and 3 do **not** rhyme', 'Choice D: lines two and three do not rhyme.'],
    ],
  },
  yourTurn: {
    prompt: 'A line of **iambic pentameter** has how many **iambs** (*da-DUM* beats)?',
    choices: ['four', 'five', 'six', 'ten'],
    answer: 1,
    working: '*Penta* = **five**: five iambs, ten syllables.',
    ask: 'A line of iambic pentameter has how many iambs, or da-DUM beats? A: four. B: five. C: six. D: ten.',
    reveal: 'The answer is B, five. Penta means five, so there are five iambs, which makes ten syllables.',
  },
  sum: [
    ['Label each new **end sound** with a letter', 'Here is what to remember. Label each new end sound with a letter.'],
    ['Rhyming lines share a **letter**', 'Lines that rhyme share a letter.'],
    ['**AABB**: rhyming couplets', 'And A A B B is rhyming couplets. For more on sound and rhythm, watch this lesson’s explainer video on Gradileo.'],
  ],
});
