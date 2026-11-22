import { englishExam, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 2.1 (rhyme and rhythm). An exam-style question we wrote, in the style of
// the key stage 2 English reading test, on Robert Louis Stevenson's "Rain" (A Child's Garden of
// Verses, 1885, public domain). The answer is C: "tree" (line 2) rhymes with "sea" (line 4), so
// the pattern is A B C B.

const POEM = ['The rain is raining all around,', 'It falls on field and tree,', 'It rains on the umbrellas here,', 'And on the ships at sea.'];

export default englishExam({
  lesson: 'e5-2-1',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question by Gradileo; the poem is Robert Louis Stevenson’s “Rain” (1885, public domain)',
  verbatim: false,
  title: 'Which Line Rhymes With Line 2 of “Rain”?',
  thumbnailTitle: 'Finding the Rhyme',
  subtitle: 'Rhyme patterns, step by step',
  summary:
    'An exam-style question on Robert Louis Stevenson’s poem “Rain”, solved one small step at a time: which line rhymes with line 2? We find the last word of every line, listen for matching end sounds, and label the rhyme pattern with letters.',
  intro: [
    'In this video, we solve an exam-style question about rhyme in a poem. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of the reading test that eleven-year-olds take in England. The poem is by Robert Louis Stevenson, from eighteen eighty-five.',
  ],
  passage: {
    lines: POEM,
    by: 'Robert Louis Stevenson, “Rain”',
    say: ['First, read the poem. The rain is raining all around, it falls on field and tree, it rains on the umbrellas here, and on the ships at sea.'],
  },
  question: {
    prompt: 'Which line of the poem rhymes with line 2?',
    text: 'Read the poem “Rain” by Robert Louis Stevenson. Which line of the poem rhymes with line 2?',
    choices: ['line 1', 'line 3', 'line 4', 'No line rhymes with line 2.'],
    answer: 2,
    working: 'Line 2 ends with **tree** and line 4 ends with **sea**: both end in the sound “ee”.',
    say: ['Which line of the poem rhymes with line 2? A: line 1. B: line 3. C: line 4. D: No line rhymes with line 2.'],
  },
  ask: [
    ['Rhymes come at the **ends** of lines', 'In a poem, lines rhyme when their last words rhyme.'],
    ['Find the line whose last word rhymes with line 2’s', 'So the question asks: which line ends with a word that rhymes with the last word of line 2?'],
  ],
  know: {
    title: 'Rhyme',
    md: 'Two words **rhyme** when they **end with the same sound**: *cat* and *hat*, *night* and *light*. The spelling can be different: *blue* and *shoe*.',
    say: [
      'Here is the idea we need. Two words rhyme when they end with the same sound, like cat and hat, or night and light.',
      'Listen to the sound, not the spelling. Blue and shoe are spelt differently, but they rhyme.',
    ],
    example: {
      md: 'Label each new end sound with a new letter: *around* **A**, *tree* **B**, *here* **C**, *sea* **B**.',
      say: 'To show a rhyme pattern, give each new end sound a letter. Lines that rhyme get the same letter.',
    },
  },
  plan: [
    ['Find the **last word** of each line', 'Here is the plan. First, find the last word of each line.'],
    ['Say them aloud and **listen** to the end sounds', 'Second, say them aloud and listen to their end sounds.'],
    ['Match line 2’s sound and **label** the pattern', 'Third, find the one that matches line 2, and label the pattern with letters to be sure.'],
  ],
  steps: [
    scene('Step 1: The last words', [quote('p', POEM), table('t', ['Line', 'Last word'], [['1', 'around'], ['2', 'tree'], ['3', 'here'], ['4', 'sea']])], [
      { say: 'Step one. Pause and find the last word of each line.', show: 'p', wait: 3 },
      { say: 'Line 1 ends with around.', show: 't.0', focus: 'p.0' },
      { say: 'Line 2 ends with tree.', show: 't.1', focus: 'p.1' },
      { say: 'Line 3 ends with here, and line 4 ends with sea.', show: ['t.2', 't.3'], focus: ['p.2', 'p.3'] },
    ]),
    scene('Step 2: Listen to the end sounds', [table('t', ['Line', 'Last word', 'End sound', 'Letter'], [['1', 'around', '“ound”', 'A'], ['2', 'tree', '“ee”', 'B'], ['3', 'here', '“eer”', 'C'], ['4', 'sea', '“ee”', '[[good:B]]']])], [
      { say: 'Step two. Now say each word aloud. Around ends with “ound”. That is our first sound, so it gets the letter A.', show: 't.0' },
      { say: 'Tree ends with “ee”, a new sound, so it gets B.', show: 't.1', focus: 't.1' },
      { say: 'Here ends with “eer”. It looks a little like tree, but it sounds different, so it gets a new letter, C.', show: 't.2', focus: 't.2' },
      { say: 'Sea ends with “ee”, the same sound as tree. So it gets B again.', show: 't.3', focus: ['t.1', 't.3'] },
    ]),
    scene('Step 3: The answer', [text('ans', 'Pattern **A B C B**: line 2 and line 4 rhyme. **The answer is C, line 4.**', 'lg')], [
      { say: 'Step three. The pattern is A, B, C, B. The two B lines are line 2 and line 4. So the answer is C, line 4.', show: 'ans' },
    ]),
  ],
  check: [
    ['*tree* and *sea*: same end sound “ee” ✓', 'Let us check. Say tree and sea together: tree, sea. They end with the same sound, so they rhyme.'],
    ['*around* and *here* match **no** other line', 'Around and here do not match any other line, which is common in a short verse like this one. So line 4 is the only answer.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Looked at the **spelling**: *here* and *tree* both end in **-ee**', 'Choice B comes from looking at the spelling. Here and tree both end in the letters e e, but they do not sound the same.'],
      ['A', 'Picked the line **next to** line 2', 'Choice A just picks the line beside line 2. Rhyming lines are often apart.'],
      ['D', 'Did not say the words **aloud**', 'Choice D misses the rhyme because sea and tree are spelt differently. Always listen, not just look.'],
    ],
  },
  yourTurn: {
    prompt: 'Read these lines: *I saw a little bird* / *Up high upon a wall* / *It sang a happy song* / *And did not fear to fall.* Which word rhymes with **wall**?',
    choices: ['fall', 'bird', 'song', 'high'],
    answer: 0,
    working: '**wall** and **fall** both end with the sound “all”.',
    ask: 'Read these lines. I saw a little bird, up high upon a wall, it sang a happy song, and did not fear to fall. Which word rhymes with wall?',
    reveal: 'The answer is A, fall. Wall and fall both end with the sound “all”, so they rhyme.',
  },
  sum: [
    ['Words **rhyme** when they end with the same **sound**', 'Here is what to remember. Words rhyme when they end with the same sound.'],
    ['Find the **last word** of each line and say it aloud', 'To find rhymes in a poem, find the last word of each line and say it aloud.'],
    ['Label the pattern with letters: **A B C B**', 'Then label the pattern with letters, the same letter for lines that rhyme. For more on rhyme and rhythm, watch this lesson’s explainer video on Gradileo.'],
  ],
});
