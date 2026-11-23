import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 2.3 (the ballad). An exam-style question we wrote, in the style of a Grade 7
// reading test, on the first stanza of Thomas Campbell's ballad "Lord Ullin's Daughter" (1809), which
// is in the public domain. The answer is A: a four-line stanza, alternate rhymes, a story and dialogue.

const STANZA = ['A chieftain, to the Highlands bound,<br>Cries, “Boatman, do not tarry!<br>And I’ll give thee a silver pound<br>To row us o’er the ferry!”'];

export default englishExam({
  lesson: 'e7-2-3',
  ...ours('a Grade 7 reading test', 'the poem is Thomas Campbell’s “Lord Ullin’s Daughter” (1809), in the public domain'),
  title: 'Which Features Show This Is a Ballad?',
  thumbnailTitle: 'The Ballad',
  subtitle: 'The features of a ballad, step by step',
  summary:
    'An exam-style poetry question, solved one small step at a time, on the opening stanza of Thomas Campbell’s ballad “Lord Ullin’s Daughter”. We learn the features of a ballad, check the stanza for each one, and find the choice that lists them correctly.',
  intro: [
    'In this video, we solve an exam-style poetry question about ballads. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 7 reading test, on Thomas Campbell’s ballad Lord Ullin’s Daughter, which is in the public domain.',
  ],
  passage: {
    lines: STANZA,
    by: 'Thomas Campbell, “Lord Ullin’s Daughter” (1809)',
    say: ['First, read the opening stanza. A chieftain, to the Highlands bound, cries, Boatman, do not tarry! And I’ll give thee a silver pound to row us o’er the ferry!'],
  },
  question: {
    prompt: 'Which features of a **ballad** does this stanza show?',
    text: 'Read the opening stanza of “Lord Ullin’s Daughter”. Which features of a ballad does this stanza show?',
    choices: [
      'a four-line stanza with alternate rhymes, telling a story with dialogue',
      'fourteen lines ending in a rhyming couplet',
      'no rhyme and no regular rhythm',
      'one speaker’s private thoughts, with no story',
    ],
    answer: 0,
    working: '**4 lines**, rhymes **bound/pound** and **tarry/ferry** (ABAB), a **story** begins, and a character **speaks**.',
    say: [
      'Which features of a ballad does this stanza show?',
      'A: a four-line stanza with alternate rhymes, telling a story with dialogue. B: fourteen lines ending in a rhyming couplet. C: no rhyme and no regular rhythm. D: one speaker’s private thoughts, with no story.',
    ],
  },
  ask: [
    ['A **ballad** is a kind of poem with set **features**', 'A ballad is a kind of poem with a set of features.'],
    ['Which does **this** stanza show?', 'We need the choice that lists the features this stanza really shows.'],
  ],
  know: {
    title: 'Features of a ballad',
    md: 'A **ballad** is a poem that **tells a story**, often first sung aloud. It usually has **four-line stanzas** (quatrains), a regular **rhythm**, a simple **rhyme** (ABAB or ABCB), **dialogue**, and often **repetition** or a refrain.',
    say: [
      'Here is the idea we need. A ballad is a poem that tells a story, and many were first sung aloud.',
      'It usually has four-line stanzas, called quatrains, a regular rhythm and a simple rhyme scheme. Characters often speak in dialogue, and lines or phrases are often repeated.',
    ],
  },
  plan: [
    ['**Count** the lines and find the **rhymes**', 'Here is the plan. First, count the lines and find the rhymes.'],
    ['Look for a **story** and **dialogue**', 'Second, look for a story and dialogue.'],
    ['Match to the **choices**', 'Third, match what we find to the choices.'],
  ],
  steps: [
    scene('Step 1: Lines and rhymes', [quote('p', ['A chieftain, to the Highlands [[theta:bound]], (A)', 'Cries, “Boatman, do not [[good:tarry]]! (B)', 'And I’ll give thee a silver [[theta:pound]] (A)', 'To row us o’er the [[good:ferry]]!” (B)'])], [
      { say: 'Step one. Count the lines: four. So this is a quatrain.', show: 'p', wait: 2 },
      { say: 'Bound rhymes with pound, and tarry rhymes with ferry. The rhymes alternate: A B A B.', focus: ['p.0', 'p.1', 'p.2', 'p.3'] },
    ]),
    scene('Step 2: Story and dialogue', [table('t', ['Feature', 'In the stanza?'], [['tells a **story**', '[[good:✓ a chieftain hurrying to escape]]'], ['**dialogue**', '[[good:✓ “Boatman, do not tarry!”]]'], ['regular **rhythm**', '[[good:✓ da-DUM da-DUM]]']]), text('a', 'The answer is **A**.')], [
      { say: 'Step two. A story begins: a chieftain is in a hurry to cross the water. And a character speaks to the boatman.', show: ['t.0', 't.1'] },
      { say: 'The rhythm is regular, too: a CHIEF tain, TO the HIGH lands BOUND. Every feature in choice A is here. The answer is A.', show: ['t.2', 'a'] },
    ]),
  ],
  check: [
    ['**B** describes a **sonnet**', 'Let us check. Fourteen lines with a final couplet describes a sonnet.'],
    ['**C** describes **free verse**', 'No rhyme and no regular rhythm describes free verse. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'The features of a **sonnet**', 'Choice B is the trap. It lists the features of a sonnet, which is fourteen lines long.'],
      ['C', 'The features of **free verse**', 'Choice C describes free verse, but this stanza rhymes.'],
      ['D', 'There **is** a story, and the speaker talks **aloud**', 'Choice D: there is a story, and the chieftain speaks aloud.'],
    ],
  },
  yourTurn: {
    prompt: 'What is the **rhyme scheme** of this stanza?<br>*The wind blew cold across the moor,<br>The night was dark and deep;<br>A stranger knocked upon the door<br>While all the house did sleep.*',
    choices: ['AABB', 'ABBA', 'ABAB', 'no rhyme'],
    answer: 2,
    working: '*moor/door* (A) and *deep/sleep* (B) alternate: **ABAB**.',
    ask: 'The wind blew cold across the moor, the night was dark and deep; a stranger knocked upon the door while all the house did sleep. What is the rhyme scheme? A: A A B B. B: A B B A. C: A B A B. D: no rhyme.',
    reveal: 'The answer is C, A B A B. Moor rhymes with door, and deep rhymes with sleep, and they alternate.',
  },
  sum: [
    ['A **ballad** tells a **story** in verse', 'Here is what to remember. A ballad tells a story in verse.'],
    ['Look for **quatrains**, a simple **rhyme**, a regular **rhythm**', 'Look for four-line stanzas, a simple rhyme scheme and a regular rhythm.'],
    ['Ballads often use **dialogue** and **repetition**', 'Ballads often use dialogue and repetition. For more on ballads, watch this lesson’s explainer video on Gradileo.'],
  ],
});
