import { englishExam, ks2, ks2Intro, scene, table } from '../english.ts';

// Grade 5 English, lesson 5.1 (parts of speech). The Standards and Testing Agency's own question,
// word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1, question
// 43. The answer is "Although he ran fast, Tom did not win the race.": "fast" tells how he ran.

export default englishExam({
  lesson: 'e5-5-1',
  ...ks2(2024, 43),
  title: 'In Which Sentence Is Fast an Adverb?',
  thumbnailTitle: 'Adverb or Adjective?',
  subtitle: 'Parts of speech, step by step',
  summary:
    'A real test question, solved one small step at a time: the word fast appears in four sentences about Tom’s race, and only once is it an adverb. We find the word each fast belongs to, and ask whether it describes a verb or a noun.',
  intro: ks2Intro('parts of speech'),
  question: {
    prompt: 'In which sentence is **fast** an adverb?',
    text: 'In which sentence is fast an adverb? Tick one.',
    choices: ['Although he ran fast, Tom did not win the race.', 'Although he was a fast runner, Tom did not win the race.', 'Tom did not win the race, despite his fast time.', 'Tom’s time was fast, but he did not win.'],
    answer: 0,
    working: '**fast** tells us **how** Tom **ran**: it describes a verb, so it is an adverb.',
    say: ['In which sentence is fast an adverb? Tick one.', 'Although he ran fast, Tom did not win the race. Although he was a fast runner, Tom did not win the race. Tom did not win the race, despite his fast time. Tom’s time was fast, but he did not win.'],
  },
  ask: [
    ['**fast** can be an **adjective** or an **adverb**', 'The word fast can be an adjective or an adverb, and it looks the same either way.'],
    ['Find the sentence where it is an **adverb**', 'We need the one sentence where it is an adverb.'],
  ],
  know: {
    title: 'Adjectives and adverbs',
    md: 'An **adjective** describes a **noun**: *a **fast** car*. An **adverb** describes a **verb**, telling **how**, **when** or **where**: *she ran **quickly***. Some words, like **fast** and **hard**, can be **both**.',
    say: [
      'Here is the idea we need. An adjective describes a noun, as in a fast car. It tells us what the car is like.',
      'An adverb describes a verb. It tells us how, when or where something happens, as in she ran quickly.',
      'Many adverbs end in l y, but not all. Fast and hard can be adjectives or adverbs, so we must look at the word they describe.',
    ],
  },
  plan: [
    ['In each sentence, find what **fast** describes', 'Here is the plan. In each sentence, find the word that fast describes.'],
    ['Is that word a **verb** or a **noun**?', 'Then ask: is that word a verb or a noun?'],
    ['Describes a verb → **adverb**', 'If fast describes a verb, it is an adverb.'],
  ],
  steps: [
    scene('Step 1: What does fast describe?', [
      table('t', ['Sentence', 'fast describes…', 'Word class'], [['he **ran fast**', '**ran** (a verb): how he ran', '[[good:adverb]]'], ['a **fast runner**', '**runner** (a noun)', 'adjective'], ['his **fast time**', '**time** (a noun)', 'adjective'], ['Tom’s **time was fast**', '**time** (a noun)', 'adjective']]),
    ], [
      { say: 'Step one. Pause and find what fast describes in each sentence.', wait: 3 },
      { say: 'In the first sentence, he ran fast. Fast tells us how he ran, and ran is a verb. So fast is an adverb here.', show: 't.0', focus: 't.0' },
      { say: 'In the second, he was a fast runner. Fast describes runner, a noun, so it is an adjective.', show: 't.1', focus: 't.1' },
      { say: 'In the third, his fast time. Fast describes time, a noun. Adjective.', show: 't.2', focus: 't.2' },
      { say: 'In the fourth, Tom’s time was fast. Fast comes after was, but it still describes time, a noun. Adjective again.', show: 't.3', focus: 't.3' },
      { say: 'So the answer is the first sentence: Although he ran fast, Tom did not win the race.' },
    ]),
  ],
  check: [
    ['Swap in an **-ly** adverb: *he ran **quickly*** ✓', 'Let us check by swapping in an adverb that ends in l y. Although he ran quickly. That works, so fast is an adverb there.'],
    ['Try it elsewhere: *a **quickly** runner* ✗', 'Try it in the second sentence: a quickly runner. That sounds wrong, because there fast describes a noun.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'fast comes **after** the verb *was*, but describes **time**', 'The fourth sentence is the big trap. Fast comes after the verb was, so it looks like it describes the verb. But was just links it back to time, so it is an adjective.'],
      ['B', '**runner** sounds like an action, but it is a **noun**', 'In the second, runner sounds like running, but a runner is a person, so it is a noun.'],
      ['C', 'Describes **time**, a noun', 'In the third, fast describes time, a noun.'],
    ],
  },
  yourTurn: {
    prompt: 'In which sentence is **hard** an adverb?',
    choices: ['She worked hard all week.', 'The test was hard.', 'This is a hard chair.', 'The ice felt hard.'],
    answer: 0,
    working: '**hard** tells us **how** she **worked**: an adverb.',
    ask: 'In which sentence is hard an adverb?',
    reveal: 'The answer is A. Hard tells us how she worked, and worked is a verb, so hard is an adverb. In the others, it describes a noun.',
  },
  sum: [
    ['**Adjective** → describes a noun · **adverb** → describes a verb', 'Here is what to remember. An adjective describes a noun, and an adverb describes a verb.'],
    ['Words like **fast** and **hard** can be **both**', 'Words like fast and hard can be both, so look at what they describe.'],
    ['Check with an **-ly** swap: *ran quickly* ✓', 'Check with an l y swap: if quickly fits, it is an adverb. For more on parts of speech, watch this lesson’s explainer video on Gradileo.'],
  ],
});
