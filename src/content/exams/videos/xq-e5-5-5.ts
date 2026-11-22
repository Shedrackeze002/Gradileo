import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 5 English, lesson 5.5 (commas and quotation marks). The Standards and Testing Agency's own
// question, word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 21. The answer is the fourth sentence: each spoken part sits inside its own inverted
// commas, with the comma and the full stop inside them.

export default englishExam({
  lesson: 'e5-5-5',
  ...ks2(2024, 21),
  title: 'Which Sentence With Speech Is Punctuated Correctly?',
  thumbnailTitle: 'Punctuating Speech',
  subtitle: 'Inverted commas, step by step',
  summary:
    'A real test question, solved one small step at a time: a teacher’s words are split in two by “said the teacher calmly”, and only one of four versions is punctuated correctly. We find exactly which words are spoken, wrap each part in inverted commas, and put the comma and full stop inside them.',
  intro: ks2Intro('punctuating speech'),
  question: {
    prompt: 'Which sentence is punctuated correctly?',
    text: 'Which sentence is punctuated correctly? Tick one.',
    choices: [
      '“Please take out your books, said the teacher calmly, and finish your poems.”',
      '“Please take out your books,” said the teacher calmly, and finish your poems.',
      '“Please take out your books”, said the teacher calmly, “and finish your poems”.',
      '“Please take out your books,” said the teacher calmly, “and finish your poems.”',
    ],
    answer: 3,
    working: 'Each spoken part has its own inverted commas, with the comma and full stop **inside** them.',
    say: ['Which sentence is punctuated correctly? Tick one. All four sentences have the same words, so look closely at the inverted commas, the commas and the full stops.'],
  },
  ask: [
    ['The teacher’s words are **split** in two', 'The teacher’s words are split in two, with said the teacher calmly in the middle.'],
    ['Which version puts **every** mark in the right place?', 'We need the version that puts every punctuation mark in the right place.'],
  ],
  know: {
    title: 'Punctuating speech',
    md: 'Put **inverted commas** around the **exact words spoken**, and nothing else. The punctuation that ends the spoken words (a comma, full stop, ? or !) goes **inside** the closing inverted commas.',
    say: [
      'Here are the rules we need. Inverted commas, also called speech marks, go around the exact words someone says, and nothing else.',
      'The punctuation that ends the spoken words, such as a comma, a full stop, a question mark or an exclamation mark, goes inside the closing inverted commas.',
    ],
    example: {
      md: '“I’m hungry,” said Leo. · “Where are you going?” asked Mum.',
      say: 'For example: I’m hungry, comma, close inverted commas, said Leo. The comma is inside.',
    },
  },
  plan: [
    ['Find the **spoken** words', 'Here is the plan. First, find exactly which words are spoken.'],
    ['Wrap **each** spoken part in inverted commas', 'Second, wrap each spoken part in inverted commas.'],
    ['Put the **comma** and **full stop** inside', 'Third, put the comma and the full stop inside them, and compare with the choices.'],
  ],
  steps: [
    scene('Step 1: The spoken words', [table('t', ['Words', 'Spoken?'], [['Please take out your books', '[[good:yes]]'], ['said the teacher calmly', '[[bad:no]]'], ['and finish your poems', '[[good:yes]]']])], [
      { say: 'Step one. Which words does the teacher actually say? Pause and decide.', wait: 3 },
      { say: 'Please take out your books. Spoken.', show: 't.0' },
      { say: 'Said the teacher calmly. Not spoken: the writer tells us who is talking.', show: 't.1' },
      { say: 'And finish your poems. Spoken again. So there are two spoken parts.', show: 't.2' },
    ]),
    scene('Step 2: Build the sentence', [quote('p', ['[[good:“]]Please take out your books[[good:,”]] said the teacher calmly, [[good:“]]and finish your poems[[good:.”]]']), text('n', 'Two pairs of inverted commas · comma and full stop **inside**')], [
      { say: 'Step two. Each spoken part gets its own pair of inverted commas.', show: 'p' },
      { say: 'The first part ends with a comma, inside the inverted commas, because the sentence carries on. The second part ends with a full stop, inside the inverted commas, because the sentence ends there.', show: 'n' },
      { say: 'That matches the fourth sentence exactly. So the answer is D.' },
    ]),
  ],
  check: [
    ['Two spoken parts → **two** pairs of inverted commas ✓', 'Let us check. The fourth sentence has two pairs of inverted commas, one for each spoken part.'],
    ['Comma and full stop **inside** ✓ · *said the teacher calmly* outside ✓', 'The comma and full stop are inside, and said the teacher calmly is outside. Every rule is met.'],
  ],
  traps: {
    say: 'Each wrong answer breaks one rule.',
    rows: [
      ['A', 'Wraps *said the teacher calmly* inside the speech', 'Sentence A puts one pair of inverted commas around everything, so said the teacher calmly looks spoken.'],
      ['B', '**Forgets** the second pair of inverted commas', 'Sentence B forgets the inverted commas around and finish your poems.'],
      ['C', 'Puts the comma and full stop **outside**', 'Sentence C has the inverted commas in the right places, but the comma and full stop are outside them. That is the sneakiest trap.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is punctuated correctly?',
    choices: ['“Come inside,” called Dad, “it’s starting to rain.”', '“Come inside, called Dad, it’s starting to rain.”', '“Come inside”, called Dad, “it’s starting to rain”.', '“Come inside,” called Dad, it’s starting to rain.'],
    answer: 0,
    working: 'Two spoken parts, each in inverted commas, with the comma and full stop inside.',
    ask: 'Which of these sentences is punctuated correctly?',
    reveal: 'The answer is A. Both spoken parts have their own inverted commas, and the comma and the full stop are inside them.',
  },
  sum: [
    ['Inverted commas go around the **exact spoken words** only', 'Here is what to remember. Inverted commas go around the exact spoken words, and nothing else.'],
    ['Split speech → **two** pairs of inverted commas', 'When speech is split by said the teacher, each part gets its own pair.'],
    ['The comma or full stop goes **inside**', 'And the comma or full stop that ends the spoken words goes inside the inverted commas. For more on commas and quotation marks, watch this lesson’s explainer video on Gradileo.'],
  ],
});
