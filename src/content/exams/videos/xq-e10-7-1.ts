import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 7.1 (fragments, run-ons and comma splices). An exam-style grammar question we
// wrote, in the style of a Grade 10 language test. The answer is C: two main clauses joined only by a
// comma make a comma splice.

export default englishExam({
  lesson: 'e10-7-1',
  ...ours('a Grade 10 language test'),
  title: 'What Is Wrong With “The Rain Stopped, We Went Outside”?',
  thumbnailTitle: 'Comma Splices',
  subtitle: 'Fragments, run-ons and comma splices, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “The rain stopped, we went outside.” We count the main clauses, look at what joins them, name the error, and fix it in three different ways.',
  intro: [
    'In this video, we solve an exam-style grammar question about sentence errors. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 language test.',
  ],
  question: {
    prompt: 'What is the error in this sentence?<br>*The rain stopped, we went outside.*',
    text: 'What is the error in this sentence? The rain stopped, comma, we went outside.',
    choices: ['a fragment', 'a run-on with no punctuation', 'a comma splice', 'there is no error'],
    answer: 2,
    working: 'Two **main clauses** joined by **only a comma**: a **comma splice**.',
    say: [
      'What is the error in this sentence? The rain stopped, comma, we went outside.',
      'A: a fragment. B: a run-on with no punctuation. C: a comma splice. D: there is no error.',
    ],
  },
  ask: [
    ['Something is **wrong** with the sentence', 'Something is wrong with this sentence.'],
    ['What is the error **called**?', 'We need to name the error.'],
  ],
  know: {
    title: 'Sentence errors',
    md: '**Fragment**: an incomplete sentence, missing a **subject**, a **verb**, or a complete thought (*Because the bus was late.*). **Run-on** (fused sentence): two main clauses with **no** punctuation between them. **Comma splice**: two main clauses joined by **only a comma**. Fix a splice with a **full stop**, a **semicolon**, or a **comma + and/but/so**.',
    say: [
      'Here is the idea we need. A fragment is an incomplete sentence, missing a subject, a verb, or a complete thought, like: because the bus was late.',
      'A run-on, or fused sentence, joins two main clauses with no punctuation at all. A comma splice joins two main clauses with only a comma. You can fix a comma splice with a full stop, a semicolon, or a comma plus and, but or so.',
    ],
  },
  plan: [
    ['Count the **main clauses**', 'Here is the plan. First, count the main clauses.'],
    ['Look at what **joins** them', 'Second, look at what joins them.'],
    ['Name and **fix** the error', 'Third, name the error and fix it.'],
  ],
  steps: [
    scene('Step 1: Clauses and the join', [quote('p', ['[[theta:The rain stopped]][[bad:,]] [[theta:we went outside]].']), table('t', ['Part', 'Can it stand alone?'], [['*The rain stopped*', '✓ a main clause'], ['*we went outside*', '✓ a main clause'], ['what joins them', '[[bad:only a comma]]']])], [
      { say: 'Step one. The rain stopped can stand alone. So can we went outside. There are two main clauses.', show: ['p', 't.0', 't.1'] },
      { say: 'And they are joined by only a comma. A comma alone is too weak to join two main clauses.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: Name and fix', [text('a', 'Two main clauses + only a comma → **comma splice** → **C**', 'lg'), table('f', ['Fix', 'Sentence'], [['full stop', '*The rain stopped. We went outside.*'], ['semicolon', '*The rain stopped; we went outside.*'], ['comma + **so**', '*The rain stopped, so we went outside.*']])], [
      { say: 'Step two. Two main clauses joined by only a comma make a comma splice. The answer is C.', show: 'a' },
      { say: 'We can fix it three ways: with a full stop, with a semicolon, or with a comma plus so.', show: ['f.0', 'f.1', 'f.2'] },
    ]),
  ],
  check: [
    ['There **is** punctuation, so it is not a fused run-on', 'Let us check. There is punctuation, a comma, so it is not a run-on with no punctuation.'],
    ['But a comma alone **cannot** join them', 'But a comma alone cannot join two main clauses. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'It **sounds** fine when spoken, but a comma cannot join two main clauses', 'Choice D is the trap. The sentence sounds fine when spoken aloud, but in writing, a comma cannot join two main clauses.'],
      ['A', 'Both parts are **complete**', 'Choice A: both parts are complete, so it is not a fragment.'],
      ['B', 'There **is** a comma', 'Choice B: there is a comma, so it is not a run-on with no punctuation.'],
    ],
  },
  yourTurn: {
    prompt: 'Which of these is a **fragment**?',
    choices: ['Because the bus was late.', 'The bus was late.', 'The bus was late, so we walked.', 'We walked because the bus was late.'],
    answer: 0,
    working: '*Because…* leaves the thought **unfinished**: a **fragment**.',
    ask: 'Which of these is a fragment? A: Because the bus was late. B: The bus was late. C: The bus was late, so we walked. D: We walked because the bus was late.',
    reveal: 'The answer is A. Because the bus was late leaves us asking, what happened? The thought is unfinished.',
  },
  sum: [
    ['**Fragment**: an incomplete sentence', 'Here is what to remember. A fragment is an incomplete sentence.'],
    ['**Comma splice**: two main clauses + only a comma', 'A comma splice is two main clauses joined by only a comma.'],
    ['Fix with **. ;** or **, and / but / so**', 'Fix it with a full stop, a semicolon, or a comma with and, but or so. For more on fragments, run-ons and comma splices, watch this lesson’s explainer video on Gradileo.'],
  ],
});
