import { englishExam, ks2, ks2Intro, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 6.3 (simple and compound sentences). The question is the Standards and
// Testing Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling
// test, Paper 1, question 36, reused under the Open Government Licence v3.0. The answer is "but",
// which joins two main clauses; "as" is a subordinating conjunction, and "once" is too.

export default englishExam({
  lesson: 'e6-6-3',
  ...ks2(2024, 36),
  title: 'Which Word Is the Co-ordinating Conjunction?',
  thumbnailTitle: 'Compound Sentences',
  subtitle: 'Joining ideas with conjunctions, step by step',
  summary:
    'A real test question, solved one small step at a time: a long sentence about a journey by night holds three conjunctions, and only one is co-ordinating. We learn the FANBOYS conjunctions, find every joining word, and check which one links two main clauses.',
  intro: ks2Intro('compound sentences'),
  question: {
    prompt: 'Circle the **co-ordinating conjunction** in the sentence below.<br>The journey proved difficult as they had to travel by night, but they made good time once the stars came out to guide them.',
    text: 'Circle the co-ordinating conjunction in the sentence below. The journey proved difficult as they had to travel by night, but they made good time once the stars came out to guide them.',
    answer: 'but',
    working: '**but** joins two main clauses; *as* and *once* are subordinating conjunctions.',
    say: [
      'Circle the co-ordinating conjunction in the sentence below.',
      'The journey proved difficult as they had to travel by night, but they made good time once the stars came out to guide them.',
    ],
  },
  ask: [
    ['The sentence has **more than one** joining word', 'This sentence has more than one joining word.'],
    ['Find the **co-ordinating** one', 'We need the one that is a co-ordinating conjunction.'],
  ],
  know: {
    title: 'Co-ordinating and subordinating conjunctions',
    md: '**Co-ordinating** conjunctions join two equal parts, such as two main clauses, to make a **compound** sentence. There are seven: **FANBOYS**, for *for, and, nor, but, or, yet, so*. **Subordinating** conjunctions (*as, because, when, once, if*) start a clause that **depends** on the main one.',
    say: [
      'Here is the idea we need. A co-ordinating conjunction joins two equal parts, such as two main clauses, to make a compound sentence. There are only seven, and the word FANBOYS helps us remember them: for, and, nor, but, or, yet and so.',
      'A subordinating conjunction, like as, because, when, once or if, starts a clause that depends on the main clause and cannot stand alone.',
    ],
  },
  plan: [
    ['Find every **joining word**', 'Here is the plan. First, find every joining word in the sentence.'],
    ['Check each against **FANBOYS**', 'Second, check each one against FANBOYS.'],
    ['Check that it joins two **main clauses**', 'Third, check that it joins two main clauses.'],
  ],
  steps: [
    scene('Step 1: The joining words', [quote('p', ['The journey proved difficult [[theta:as]] they had to travel by night, [[theta:but]] they made good time [[theta:once]] the stars came out to guide them.'])], [
      { say: 'Step one. Pause and find the words that join ideas.', show: 'p', wait: 3 },
      { say: 'There are three: as, but and once.', focus: 'p.0' },
    ]),
    scene('Step 2: Check each word', [table('t', ['Word', 'In FANBOYS?', 'What it does'], [['as', '[[bad:✗]]', 'gives a **reason**; starts a dependent clause'], ['but', '[[good:✓]]', 'joins two **main clauses**'], ['once', '[[bad:✗]]', 'gives a **time**; starts a dependent clause']])], [
      { say: 'Step two. As is not in FANBOYS. Here it means because: as they had to travel by night. That clause cannot stand alone.', show: 't.0' },
      { say: 'But is in FANBOYS. On each side of it is a main clause: the journey proved difficult, and they made good time.', show: 't.1', focus: 't.1' },
      { say: 'Once is not in FANBOYS either. Once the stars came out cannot stand alone.', show: 't.2' },
    ]),
    scene('Step 3: The answer', [text('a', 'Circle **but**.', 'xl')], [{ say: 'Step three. So the co-ordinating conjunction is but. We circle but.', show: 'a' }]),
  ],
  check: [
    ['Both sides of **but** can stand alone', 'Let us check. The journey proved difficult. They made good time. Both sides of but make sense on their own.'],
    ['*as they had to travel by night* cannot', 'But as they had to travel by night does not make sense on its own. So but holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    head: ['Circled', 'What happened'],
    rows: [
      ['as', 'It **joins**, but it is **subordinating**', 'Circling as is the trap. It is a conjunction, but a subordinating one.'],
      ['once', 'Another **subordinating** conjunction', 'Once is another subordinating conjunction, about time.'],
      ['and', 'Not in this sentence at all', 'And is the most famous co-ordinating conjunction, but it does not appear here.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word is the **co-ordinating conjunction**?<br>We wanted to swim, yet the water was too cold because it had rained all week.',
    choices: ['wanted', 'because', 'yet', 'all'],
    answer: 2,
    working: '**yet** is in FANBOYS and joins two main clauses.',
    ask: 'We wanted to swim, yet the water was too cold because it had rained all week. Which word is the co-ordinating conjunction? A: wanted. B: because. C: yet. D: all.',
    reveal: 'The answer is C, yet. It is in FANBOYS and joins two main clauses. Because is a subordinating conjunction.',
  },
  sum: [
    ['**FANBOYS**: for, and, nor, but, or, yet, so', 'Here is what to remember. The co-ordinating conjunctions are FANBOYS: for, and, nor, but, or, yet and so.'],
    ['They join two **main clauses** into a **compound** sentence', 'They join two main clauses into a compound sentence.'],
    ['*as, because, when, once* are **subordinating**', 'Words like as, because, when and once are subordinating. For more on simple and compound sentences, watch this lesson’s explainer video on Gradileo.'],
  ],
});
