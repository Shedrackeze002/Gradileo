import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 6.2 (complex sentences). The question is the Standards and Testing Agency's
// own, word for word: 2026 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 34, reused under the Open Government Licence v3.0. The answer is "until", which starts the
// dependent clause; "and" is a co-ordinating conjunction.

export default englishExam({
  lesson: 'e7-6-2',
  ...ks2(2026, 34),
  title: 'Which Word Is the Subordinating Conjunction?',
  thumbnailTitle: 'Complex Sentences',
  subtitle: 'Subordinating conjunctions, step by step',
  summary:
    'A real test question, solved one small step at a time: a sentence about a youth club closed for repairs holds two joining words, and only one is subordinating. We find the main clause, find the clause that depends on it, and circle the word that starts it.',
  intro: ks2Intro('complex sentences'),
  question: {
    prompt: 'Circle the **subordinating conjunction** in the sentence below.<br>Unfortunately, the youth club will be closed until we have completed the repairs and replaced the sports equipment.',
    text: 'Circle the subordinating conjunction in the sentence below. Unfortunately, the youth club will be closed until we have completed the repairs and replaced the sports equipment.',
    answer: 'until',
    working: '*until* starts the **dependent** clause *until we have completed the repairs…*; *and* is co-ordinating.',
    say: [
      'Circle the subordinating conjunction in the sentence below.',
      'Unfortunately, the youth club will be closed until we have completed the repairs and replaced the sports equipment.',
    ],
  },
  ask: [
    ['The sentence has **two** joining words', 'This sentence has two joining words.'],
    ['Which one is **subordinating**?', 'We need the one that is a subordinating conjunction.'],
  ],
  know: {
    title: 'Complex sentences',
    md: 'A **complex** sentence has a **main clause** and at least one **dependent** clause. The dependent clause starts with a **subordinating conjunction**: *because, although, when, if, until, since, while, after, before*. **Co-ordinating** conjunctions (FANBOYS: *for, and, nor, but, or, yet, so*) join **equal** parts instead.',
    say: [
      'Here is the idea we need. A complex sentence has a main clause and at least one dependent clause.',
      'The dependent clause starts with a subordinating conjunction, such as because, although, when, if, until, since, while, after or before. Co-ordinating conjunctions, the FANBOYS, join equal parts instead.',
    ],
  },
  plan: [
    ['Find the **main clause**', 'Here is the plan. First, find the main clause.'],
    ['Find the clause that **depends** on it', 'Second, find the clause that depends on it.'],
    ['Circle the word that **starts** it', 'Third, circle the word that starts it.'],
  ],
  steps: [
    scene('Step 1: The clauses', [quote('p', ['Unfortunately, [[good:the youth club will be closed]] [[theta:until]] we have completed the repairs [[bad:and]] replaced the sports equipment.'])], [
      { say: 'Step one. Pause and find the part that could stand alone.', show: 'p', wait: 3 },
      { say: 'The youth club will be closed. That makes sense by itself, so it is the main clause.', focus: 'p.0' },
      { say: 'Until we have completed the repairs does not make sense alone. It depends on the main clause. It tells us how long the club will be closed.' },
    ]),
    scene('Step 2: Check each joining word', [table('t', ['Word', 'Type', 'Why'], [['until', '[[good:subordinating]]', 'starts the **dependent** clause'], ['and', '[[bad:co-ordinating]]', 'in **FANBOYS**; joins *completed* and *replaced*']]), text('a', 'Circle **until**.', 'xl')], [
      { say: 'Step two. Until starts the dependent clause, so it is the subordinating conjunction.', show: 't.0' },
      { say: 'And is in FANBOYS. It joins two equal actions: completed the repairs, and replaced the equipment. So we circle until.', show: ['t.1', 'a'] },
    ]),
  ],
  check: [
    ['Move the clause: *Until we have completed the repairs, the club will be closed.*', 'Let us check. Move the clause to the front: until we have completed the repairs, the youth club will be closed. It still works.'],
    ['Dependent clauses **move**; *until* goes with it', 'Dependent clauses can move like that, and until moves with it. So until holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    head: ['Circled', 'What happened'],
    rows: [
      ['and', 'A conjunction, but **co-ordinating**', 'Circling and is the trap. It is a conjunction, but a co-ordinating one.'],
      ['Unfortunately', 'An **adverb**, set off by a comma', 'Unfortunately is an adverb that comments on the whole sentence.'],
      ['have', 'Part of the **verb**', 'Have is part of the verb, have completed.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is **complex**?',
    choices: ['The dog barked.', 'Although it was raining, we went for a walk.', 'I like tea, and she likes coffee.', 'Run!'],
    answer: 1,
    working: '*Although it was raining* is a **dependent** clause joined to a **main** clause.',
    ask: 'Which sentence is complex? A: The dog barked. B: Although it was raining, we went for a walk. C: I like tea, and she likes coffee. D: Run!',
    reveal: 'The answer is B. Although it was raining is a dependent clause, and we went for a walk is the main clause. C is compound: two main clauses joined by and.',
  },
  sum: [
    ['A **complex** sentence = main clause + **dependent** clause', 'Here is what to remember. A complex sentence has a main clause and a dependent clause.'],
    ['Subordinating conjunctions **start** the dependent clause', 'Subordinating conjunctions start the dependent clause.'],
    ['**FANBOYS** are co-ordinating, not subordinating', 'And the FANBOYS are co-ordinating, not subordinating. For more on complex sentences, watch this lesson’s explainer video on Gradileo.'],
  ],
});
