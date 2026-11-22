import { englishExam, ks2, ks2Intro, scene, table } from '../english.ts';

// Grade 5 English, lesson 4.4 (homophones and multiple-meaning words). The Standards and Testing
// Agency's own question, word for word: 2026 key stage 2 English grammar, punctuation and spelling
// test, Paper 1, question 32. The answer is "Rani wanted to make the right decision.": there
// "right" describes the noun "decision", so it is an adjective.

export default englishExam({
  lesson: 'e5-4-4',
  ...ks2(2026, 32),
  title: 'In Which Sentence Is Right an Adjective?',
  thumbnailTitle: 'One Word, Many Meanings',
  subtitle: 'Multiple-meaning words, step by step',
  summary:
    'A real test question, solved one small step at a time: the word right appears in four sentences, with four different meanings and jobs. We work out what right means in each sentence and what it is doing, and find the one where it describes a noun.',
  intro: ks2Intro('a word with many meanings'),
  question: {
    prompt: 'In which sentence is **right** an adjective?',
    text: 'In which sentence is right an adjective? Tick one.',
    choices: ['Rani wanted to make the right decision.', 'We went right to the top of the tower.', 'You have the right to fair treatment.', 'Kyle tried to right his mistakes.'],
    answer: 0,
    working: '**right** describes the noun **decision**: which decision? the right one.',
    say: ['In which sentence is right an adjective? Tick one.', 'Rani wanted to make the right decision. We went right to the top of the tower. You have the right to fair treatment. Kyle tried to right his mistakes.'],
  },
  ask: [
    ['The same word, **right**, in four sentences', 'The same word, right, appears in all four sentences.'],
    ['In which one is it an **adjective**?', 'But it does a different job in each one, and we need the sentence where it is an adjective.'],
  ],
  know: {
    title: 'Multiple-meaning words',
    md: 'Some words have **several meanings**, and can be **different word classes**. An **adjective** describes a **noun**: *a **red** bus*. An **adverb** tells how, where or how much. A **noun** names a thing. A **verb** is an action.',
    say: [
      'Here is the idea we need. Some words have several meanings, and can even belong to different word classes, depending on how they are used.',
      'An adjective describes a noun, like red in a red bus. An adverb tells how, where or how much. A noun names a thing, and a verb is an action or a doing word.',
    ],
  },
  plan: [
    ['Say what **right** means in each sentence', 'Here is the plan. First, say what right means in each sentence.'],
    ['Ask what **job** it does there', 'Second, ask what job it does there.'],
    ['Find the one that **describes a noun**', 'Third, find the one where it describes a noun.'],
  ],
  steps: [
    scene('Step 1: What right means in each', [
      table('t', ['Sentence', 'right means…', 'Job'], [['the **right** decision', 'correct', '[[good:adjective: describes *decision*]]'], ['went **right** to the top', 'all the way', 'adverb: tells how far'], ['have the **right** to', 'something you are allowed', 'noun: a thing you have'], ['to **right** his mistakes', 'put right, fix', 'verb: an action']]),
    ], [
      { say: 'Step one. Pause and think what right means in each sentence.', wait: 3 },
      { say: 'In the first, Rani wants the right decision, meaning the correct one. Right tells us which decision, so it describes the noun decision. That makes it an adjective.', show: 't.0', focus: 't.0' },
      { say: 'In the second, we went right to the top, meaning all the way. It tells us how far we went, so it is an adverb.', show: 't.1', focus: 't.1' },
      { say: 'In the third, you have the right to fair treatment. Here a right is a thing you have, so it is a noun. Notice the word the in front of it.', show: 't.2', focus: 't.2' },
      { say: 'In the fourth, Kyle tried to right his mistakes, meaning fix them. It is an action, so it is a verb.', show: 't.3', focus: 't.3' },
    ]),
  ],
  check: [
    ['Swap in another adjective: *the **correct** decision* ✓', 'Let us check by swapping in another adjective. Rani wanted to make the correct decision. That works, so right is doing an adjective’s job.'],
    ['Try it elsewhere: *the **correct** to fair treatment* ✗', 'Try correct in the third sentence: you have the correct to fair treatment. That makes no sense, because there right is a noun.'],
  ],
  traps: {
    say: 'Each wrong sentence uses right in a different word class.',
    rows: [
      ['B', 'An **adverb**: it tells how far', 'In the second sentence, right tells us how far, so it is an adverb, even though it comes before a noun phrase.'],
      ['C', 'A **noun**: after **the**, it names a thing', 'In the third, the right comes before a noun phrase too. But here right is the thing itself, so it is a noun.'],
      ['D', 'A **verb**: after **to**, it is an action', 'In the fourth, to right means to fix, which is an action, so it is a verb.'],
    ],
  },
  yourTurn: {
    prompt: 'In which sentence is **light** a verb?',
    choices: ['The bag was very light.', 'Turn on the light, please.', 'She wore a light blue coat.', 'Please light the candles.'],
    answer: 3,
    working: 'To **light** candles is an action: a verb.',
    ask: 'In which sentence is light a verb?',
    reveal: 'The answer is D. To light the candles is an action, so light is a verb. In A and C it is an adjective, and in B it is a noun.',
  },
  sum: [
    ['One word can have **many meanings** and **word classes**', 'Here is what to remember. One word can have many meanings and belong to different word classes.'],
    ['Decide its **job** in **this** sentence', 'Decide its job in this sentence, not in general.'],
    ['Check by **swapping** in another word of that class', 'And check by swapping in another word of that class. For more on homophones and multiple-meaning words, watch this lesson’s explainer video on Gradileo.'],
  ],
});
