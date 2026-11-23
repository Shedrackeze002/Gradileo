import { englishExam, ks2, ks2Intro, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 6.5 (punctuating clauses and dialogue). The question is the Standards and
// Testing Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling test,
// Paper 1, question 2, reused under the Open Government Licence v3.0. The answer is "After he ate, the
// lion lay down and slept for many hours.": the comma closes the introductory clause.

export default englishExam({
  lesson: 'e7-6-5',
  ...ks2(2024, 2),
  title: 'Where Does the Comma Go After “After He Ate”?',
  thumbnailTitle: 'Commas After Clauses',
  subtitle: 'Commas with introductory clauses, step by step',
  summary:
    'A real test question, solved one small step at a time: four versions of a sentence about a lion, and the comma moves each time. We see how a misplaced comma can make the lion the dinner, find where the introductory clause ends, and place the comma there.',
  intro: ks2Intro('commas'),
  question: {
    prompt: 'Which sentence is **punctuated correctly**?',
    text: 'Which sentence is punctuated correctly? Tick one.',
    choices: [
      'After he ate the lion lay down, and slept for many hours.',
      'After he ate the lion, lay down and slept for many hours.',
      'After he ate, the lion lay down and slept for many hours.',
      'After he ate the lion lay down and slept, for many hours.',
    ],
    answer: 2,
    working: 'The introductory clause is *After he ate*; the comma goes **right after it**, so the lion is not the meal.',
    say: [
      'Which sentence is punctuated correctly? Tick one.',
      'Each choice is the same sentence: after he ate the lion lay down and slept for many hours. Only the comma moves. In A, it comes after down. In B, after the lion. In C, after ate. In D, after slept.',
    ],
  },
  ask: [
    ['Same words, but the **comma** moves', 'All four sentences use the same words, but the comma moves.'],
    ['Which one is **right**?', 'We need the one that is punctuated correctly.'],
  ],
  know: {
    title: 'Commas after introductory clauses',
    md: 'When a sentence **begins** with a **dependent clause** (*After he ate*, *When the bell rang*, *If it rains*), put a **comma** where that clause **ends** and the main clause begins. In dialogue, a comma (or ? or !) goes **inside** the speech marks: *“Wait,” she said.*',
    say: [
      'Here is the idea we need. When a sentence begins with a dependent clause, like after he ate, when the bell rang, or if it rains, put a comma where that clause ends and the main clause begins.',
      'And in dialogue, the comma, question mark or exclamation mark goes inside the speech marks, as in, Wait, she said.',
    ],
  },
  plan: [
    ['Find the **introductory clause**', 'Here is the plan. First, find the introductory clause.'],
    ['Find the **main clause**', 'Second, find the main clause.'],
    ['Put the comma **between** them', 'Third, put the comma between them.'],
  ],
  steps: [
    scene('Step 1: What did he eat?', [table('t', ['Where the comma falls', 'What it means'], [['after **ate**', 'he ate; **then** the lion lay down'], ['after **the lion**', '[[bad:he ate **the lion**!]]']])], [
      { say: 'Step one. Without a comma after ate, we read: after he ate the lion. That sounds as if someone ate the lion!', show: 't.1' },
      { say: 'With a comma after ate, the meaning is clear: after he ate, the lion lay down.', show: 't.0' },
    ]),
    scene('Step 2: Check each sentence', [table('c', ['Sentence', 'Right?'], [['A: comma after *down*', '[[bad:✗ “after he ate the lion” again]]'], ['B: comma after *lion*', '[[bad:✗ the lion is eaten]]'], ['C: comma after *ate*', '[[good:✓ clause, comma, main clause]]'], ['D: comma after *slept*', '[[bad:✗ “after he ate the lion” again]]']]), text('a', 'The answer is **C**.')], [
      { say: 'Step two. A, B and D all leave after he ate the lion together, and B even makes the lion the meal.', show: ['c.0', 'c.1', 'c.3'] },
      { say: 'C puts the comma right where the introductory clause ends. The answer is C.', show: ['c.2', 'a'], focus: 'c.2' },
    ]),
  ],
  check: [
    ['*After he ate* = introductory clause', 'Let us check. After he ate is the introductory clause.'],
    ['*the lion lay down and slept…* = main clause', 'The lion lay down and slept for many hours is the main clause. The comma sits between them, so C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Makes **the lion** the meal', 'Choice B is the funniest trap. It says he ate the lion.'],
      ['A', 'A comma before **and**, but the opening is still **unclear**', 'Choice A puts a comma before and, but leaves the opening unclear.'],
      ['D', 'A comma that **splits** the main clause', 'Choice D splits the main clause for no reason.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence punctuates the **dialogue** correctly?',
    choices: ['“We’re late,” said Omar.', '“We’re late” said Omar.', '“We’re late”, said Omar,', 'We’re late, “said Omar.”'],
    answer: 0,
    working: 'The comma goes **inside** the speech marks, before *said Omar*.',
    ask: 'Which sentence punctuates the dialogue correctly? A: speech marks, We’re late, comma, close speech marks, said Omar. B: no comma. C: comma outside the speech marks. D: the speech marks around said Omar.',
    reveal: 'The answer is A. The comma goes inside the speech marks, and only the spoken words go inside them.',
  },
  sum: [
    ['Comma **after** an introductory clause', 'Here is what to remember. Put a comma after an introductory clause.'],
    ['A misplaced comma can **change the meaning**', 'A misplaced comma can change the meaning completely.'],
    ['In dialogue, punctuation goes **inside** the speech marks', 'In dialogue, the punctuation goes inside the speech marks. For more on punctuating clauses and dialogue, watch this lesson’s explainer video on Gradileo.'],
  ],
});
