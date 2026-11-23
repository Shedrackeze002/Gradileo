import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 6.3 (fragments and run-ons). The question is the Standards and Testing
// Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 3, reused under the Open Government Licence v3.0. The answer puts the semi-colon after
// "heavily", between the two main clauses, which fixes the run-on.

export default englishExam({
  lesson: 'e7-6-3',
  ...ks2(2024, 3),
  title: 'Where Does the Semi-colon Go?',
  thumbnailTitle: 'Fixing Run-ons',
  subtitle: 'Run-on sentences and semi-colons, step by step',
  summary:
    'A real test question, solved one small step at a time: “It was raining heavily she had lost her umbrella the week before” runs two sentences together. We find where one main clause ends and the next begins, and put the semi-colon there.',
  intro: ks2Intro('run-on sentences'),
  question: {
    prompt: 'Insert a **semi-colon** in the correct place in the sentence below.<br>It was raining heavily she had lost her umbrella the week before.',
    text: 'Insert a semi-colon in the correct place in the sentence below. It was raining heavily she had lost her umbrella the week before.',
    answer: 'It was raining heavily; she had lost her umbrella the week before.',
    working: 'Two **main clauses** run together; the semi-colon goes **between** them, after *heavily*.',
    say: [
      'Insert a semi-colon in the correct place in the sentence below.',
      'It was raining heavily she had lost her umbrella the week before.',
    ],
  },
  ask: [
    ['The sentence **runs on** with no break', 'The sentence runs on with no break.'],
    ['Where does the **semi-colon** go?', 'We need to find where the semi-colon goes.'],
  ],
  know: {
    title: 'Run-ons, fragments and semi-colons',
    md: 'A **run-on** joins two main clauses with **no** punctuation. A **comma splice** joins them with **only a comma**. A **fragment** is a piece of a sentence that cannot stand alone. Fix a run-on with a **full stop**, a **semi-colon**, or a **comma + FANBOYS**. A semi-colon joins two **closely linked** main clauses.',
    say: [
      'Here is the idea we need. A run-on sentence joins two main clauses with no punctuation at all. A comma splice joins them with only a comma. A fragment is a piece of a sentence that cannot stand alone.',
      'We can fix a run-on with a full stop, with a semi-colon, or with a comma and a FANBOYS conjunction. A semi-colon joins two main clauses that are closely linked.',
    ],
  },
  plan: [
    ['Find where the **first** main clause **ends**', 'Here is the plan. First, find where the first main clause ends.'],
    ['Check that **both** sides can stand alone', 'Second, check that both sides can stand alone.'],
    ['Put the semi-colon **there**', 'Third, put the semi-colon there.'],
  ],
  steps: [
    scene('Step 1: Find the break', [quote('p', ['[[good:It was raining heavily]] [[theta:|]] [[good:she had lost her umbrella the week before]].'])], [
      { say: 'Step one. Pause and read it aloud. Where would you naturally take a breath?', show: 'p', wait: 3 },
      { say: 'After heavily. It was raining heavily is one complete idea. She had lost her umbrella the week before is another.', focus: 'p.0' },
    ]),
    scene('Step 2: Check both sides', [table('t', ['Side', 'Subject + verb', 'Stands alone?'], [['It was raining heavily', '**It** + **was raining**', '[[good:✓]]'], ['she had lost her umbrella the week before', '**she** + **had lost**', '[[good:✓]]']]), text('a', 'It was raining heavily[[good:;]] she had lost her umbrella the week before.', 'lg')], [
      { say: 'Step two. Each side has its own subject and verb, and each makes sense alone. They are two main clauses.', show: ['t.0', 't.1'] },
      { say: 'And they are closely linked: the rain is a problem because she has no umbrella. So the semi-colon goes after heavily.', show: 'a' },
    ]),
  ],
  check: [
    ['A **full stop** would also work there', 'Let us check. A full stop would also work in the same place, which proves it is the break between two sentences.'],
    ['The semi-colon keeps the two ideas **linked**', 'The semi-colon keeps the two linked ideas together. So our answer holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    head: ['Semi-colon after', 'What happened'],
    rows: [
      ['raining', 'Leaves *heavily she had lost…*: not a clause', 'After raining is the trap. It leaves heavily she had lost her umbrella, which does not make sense.'],
      ['umbrella', '*the week before* cannot stand alone', 'After umbrella: the week before cannot stand alone.'],
      ['a comma', 'A comma alone makes a **comma splice**', 'A comma instead would make a comma splice.'],
    ],
  },
  yourTurn: {
    prompt: 'Which is a **sentence fragment**?',
    choices: ['The bus was late.', 'I waited for an hour.', 'Because the road was closed.', 'We walked home instead.'],
    answer: 2,
    working: '*Because the road was closed* is a **dependent** clause on its own.',
    ask: 'Which is a sentence fragment? A: The bus was late. B: I waited for an hour. C: Because the road was closed. D: We walked home instead.',
    reveal: 'The answer is C. Because the road was closed is a dependent clause on its own. It leaves us asking: because the road was closed, what happened?',
  },
  sum: [
    ['A **run-on** joins two main clauses with no punctuation', 'Here is what to remember. A run-on joins two main clauses with no punctuation.'],
    ['Fix it with a **full stop**, a **semi-colon** or **comma + FANBOYS**', 'Fix it with a full stop, a semi-colon, or a comma and a FANBOYS conjunction.'],
    ['A semi-colon needs a **main clause** on **both** sides', 'A semi-colon needs a main clause on both sides. For more on fragments and run-ons, watch this lesson’s explainer video on Gradileo.'],
  ],
});
