import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 8 English, lesson 6.4 (semicolons and colons). The question is the Standards and Testing
// Agency's own, word for word: 2026 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 5, reused under the Open Government Licence v3.0. The answer is the fourth sentence: the colon
// comes after a complete clause and introduces the list.

export default englishExam({
  lesson: 'e8-6-4',
  ...ks2(2026, 5),
  title: 'Which Sentence Uses a Colon Correctly?',
  thumbnailTitle: 'Colons',
  subtitle: 'Colons before lists, step by step',
  summary:
    'A real test question, solved one small step at a time: four versions of a sentence about what plants need, each with the colon in a different place. We learn the rule for a colon before a list, test what comes before each colon, and find the only one that works.',
  intro: ks2Intro('colons'),
  question: {
    prompt: 'Which sentence uses a **colon** correctly?',
    text: 'Which sentence uses a colon correctly? Tick one.',
    choices: [
      'Plants cannot live without: these three things light, water and nutrients.',
      'Plants cannot live: without these three things light, water and nutrients.',
      'Plants cannot live without these: three things light, water and nutrients.',
      'Plants cannot live without these three things: light, water and nutrients.',
    ],
    answer: 3,
    working: 'Before the colon: a **complete clause** (*…these three things*). After it: the **list**.',
    say: [
      'Which sentence uses a colon correctly? Tick one.',
      'Each choice is the same sentence: plants cannot live without these three things light, water and nutrients. Only the colon moves. In A, it comes after without. In B, after live. In C, after these. In D, after things.',
    ],
  },
  ask: [
    ['Same words, but the **colon** moves', 'All four use the same words, but the colon moves.'],
    ['Where does it **belong**?', 'We need to find where it belongs.'],
  ],
  know: {
    title: 'Colons and semicolons',
    md: 'A **colon** introduces a **list**, an **explanation** or a **quotation**, and the words **before** it must be a **complete clause** that could stand alone. A **semicolon** joins two **main clauses**, or separates **list items** that already contain commas.',
    say: [
      'Here is the idea we need. A colon introduces a list, an explanation or a quotation, and the words before it must be a complete clause that could stand alone.',
      'A semicolon is different. It joins two main clauses, or separates list items that already contain commas.',
    ],
  },
  plan: [
    ['Find the **list**', 'Here is the plan. First, find the list.'],
    ['Check that the words before the colon are **complete**', 'Second, check that the words before each colon are complete.'],
  ],
  steps: [
    scene('Step 1: Find the list', [quote('p', ['Plants cannot live without these three things [[good:light, water and nutrients]].']), text('n', 'The colon should go **just before** the list.')], [
      { say: 'Step one. The list is light, water and nutrients. The three things.', show: 'p' },
      { say: 'So the colon should go just before the list, after things.', show: 'n' },
    ]),
    scene('Step 2: Test what comes before each colon', [table('t', ['Choice', 'Before the colon', 'Complete clause?'], [['A', 'Plants cannot live without', '[[bad:✗ without what?]]'], ['B', 'Plants cannot live', '[[bad:✗ splits the idea]]'], ['C', 'Plants cannot live without these', '[[bad:✗ these what?]]'], ['D', 'Plants cannot live without these three things', '[[good:✓ complete, then the list]]']])], [
      { say: 'Step two. A stops after without. Without what? The clause is unfinished.', show: 't.0' },
      { say: 'B stops after live, splitting without from the rest of its idea. C stops after these. These what?', show: ['t.1', 't.2'] },
      { say: 'D stops after these three things. That is complete, and then the list follows. The answer is D.', show: 't.3', focus: 't.3' },
    ]),
  ],
  check: [
    ['Read D up to the colon: it **makes sense**', 'Let us check. Read D up to the colon: plants cannot live without these three things. It makes sense on its own.'],
    ['and the colon **opens** the list', 'And the colon opens the list. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**these** needs its noun: *three things*', 'Choice C is the closest trap. These seems complete, but it needs three things to finish it.'],
      ['A', 'Colon straight after **without**', 'Choice A cuts the sentence after without.'],
      ['B', 'Colon in the middle of the **idea**', 'Choice B splits the idea in two.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses a **semicolon** correctly?',
    choices: ['We visited; Paris, Rome and Madrid.', 'The bell rang; and we left.', 'Because it rained; we stayed in.', 'The bell rang; the students hurried out.'],
    answer: 3,
    working: 'A **main clause** on **both** sides of the semicolon.',
    ask: 'Which sentence uses a semicolon correctly? A: We visited, semicolon, Paris, Rome and Madrid. B: The bell rang, semicolon, and we left. C: Because it rained, semicolon, we stayed in. D: The bell rang, semicolon, the students hurried out.',
    reveal: 'The answer is D. The bell rang, and the students hurried out, are both main clauses, so a semicolon can join them.',
  },
  sum: [
    ['A **colon** needs a **complete clause** before it', 'Here is what to remember. A colon needs a complete clause before it.'],
    ['It introduces a **list**, **explanation** or **quotation**', 'It introduces a list, an explanation or a quotation.'],
    ['A **semicolon** joins two **main clauses**', 'A semicolon joins two main clauses. For more on semicolons and colons, watch this lesson’s explainer video on Gradileo.'],
  ],
});
