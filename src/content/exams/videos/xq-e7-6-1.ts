import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 6.1 (phrases and clauses). The question is the Standards and Testing
// Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 16, reused under the Open Government Licence v3.0. The underlined words are "that was stuck
// in the tree", and the answer is "a relative clause".

export default englishExam({
  lesson: 'e7-6-1',
  ...ks2(2024, 16),
  title: 'What Is the Grammatical Term for the Underlined Words?',
  thumbnailTitle: 'Phrases and Clauses',
  subtitle: 'Relative clauses, step by step',
  summary:
    'A real test question, solved one small step at a time: in “The cat that was stuck in the tree belongs to my sister”, what are the underlined words called? We tell a phrase from a clause, check whether the words can stand alone, and see what job “that” is doing.',
  intro: ks2Intro('phrases and clauses'),
  question: {
    prompt: 'What is the grammatical term for the underlined words in the sentence below?<br>The cat <u>that was stuck in the tree</u> belongs to my sister.',
    text: 'What is the grammatical term for the underlined words in the sentence below? The cat that was stuck in the tree belongs to my sister. Tick one.',
    choices: ['a noun phrase', 'a relative clause', 'a co-ordinating conjunction', 'a main clause'],
    answer: 1,
    working: '*that was stuck in the tree* has a **verb** (*was*), cannot stand alone, and starts with the **relative pronoun** *that*, describing the cat.',
    say: [
      'What is the grammatical term for the underlined words in the sentence below? Tick one.',
      'The cat that was stuck in the tree belongs to my sister. The underlined words are: that was stuck in the tree. A: a noun phrase. B: a relative clause. C: a co-ordinating conjunction. D: a main clause.',
    ],
  },
  ask: [
    ['The underlined words are **that was stuck in the tree**', 'The underlined words are: that was stuck in the tree.'],
    ['What are they **called**?', 'We need the grammatical name for them.'],
  ],
  know: {
    title: 'Phrases and clauses',
    md: 'A **clause** has a **subject** and a **verb**; a **phrase** does not. A **main** (independent) clause can **stand alone**. A **dependent** clause cannot. A **relative clause** is a dependent clause that starts with a relative pronoun (*who, which, that, whose*) and tells us more about a **noun**.',
    say: [
      'Here is the idea we need. A clause has a subject and a verb. A phrase does not.',
      'A main clause, also called an independent clause, can stand alone as a sentence. A dependent clause cannot. A relative clause is a dependent clause that starts with a relative pronoun, like who, which, that or whose, and tells us more about a noun.',
    ],
  },
  plan: [
    ['Does it have a **verb**?', 'Here is the plan. First, does it have a verb?'],
    ['Can it **stand alone**?', 'Second, can it stand alone?'],
    ['What **job** does it do?', 'Third, what job does it do in the sentence?'],
  ],
  steps: [
    scene('Step 1: Clause or phrase?', [quote('p', ['The cat <u>[[theta:that]] [[good:was]] stuck in the tree</u> belongs to my sister.']), text('n', 'It has a verb, **was**, so it is a **clause**, not a phrase.')], [
      { say: 'Step one. Pause and look for a verb in the underlined words.', show: 'p', wait: 3 },
      { say: 'Was is a verb. So the underlined words are a clause, not a phrase. That rules out A, a noun phrase.', show: 'n' },
    ]),
    scene('Step 2: Can it stand alone?', [table('t', ['Test', 'Result'], [['“That was stuck in the tree.” as a sentence?', '[[bad:✗ it does not make sense here alone]]'], ['what does it describe?', 'the **cat**'], ['first word', '**that**: a relative pronoun']]), text('a', 'A **dependent** clause, starting with **that**, describing a **noun** → **a relative clause**: **B**')], [
      { say: 'Step two. Read it alone: that was stuck in the tree. In this sentence it does not stand alone. It needs the cat. So it is not a main clause, which rules out D.', show: 't.0' },
      { say: 'It tells us which cat: the one that was stuck. And it starts with that, a relative pronoun.', show: ['t.1', 't.2'] },
      { say: 'So it is a relative clause. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Remove it: *The cat belongs to my sister.* still works', 'Let us check. Remove the underlined words: the cat belongs to my sister. That is the main clause, and it still works.'],
    ['The removed part only **described** the cat', 'The part we removed only described the cat. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'It has a verb, but it cannot **stand alone**', 'Choice D is the trap. It has a verb, like a main clause, but it cannot stand on its own.'],
      ['A', 'A **phrase** has no verb', 'Choice A: a phrase has no verb, and this has was.'],
      ['C', '**that** is not a co-ordinating conjunction', 'Choice C: that is a relative pronoun here, not one of FANBOYS.'],
    ],
  },
  yourTurn: {
    prompt: 'Is the underlined part a **phrase** or a **clause**?<br>We ate lunch <u>under the old oak tree</u>.',
    choices: ['a phrase: it has no verb', 'a main clause', 'a relative clause', 'a dependent clause'],
    answer: 0,
    working: '*under the old oak tree* has **no verb**, so it is a **phrase**.',
    ask: 'We ate lunch under the old oak tree. Is the underlined part, under the old oak tree, a phrase or a clause? A: a phrase, it has no verb. B: a main clause. C: a relative clause. D: a dependent clause.',
    reveal: 'The answer is A. Under the old oak tree has no verb, so it is a phrase.',
  },
  sum: [
    ['A **clause** has a subject and a **verb**; a **phrase** does not', 'Here is what to remember. A clause has a subject and a verb, and a phrase does not.'],
    ['A **main** clause stands alone; a **dependent** clause cannot', 'A main clause can stand alone, and a dependent clause cannot.'],
    ['A **relative clause** starts with *who, which, that* and describes a noun', 'A relative clause starts with who, which or that, and describes a noun. For more on phrases and clauses, watch this lesson’s explainer video on Gradileo.'],
  ],
});
