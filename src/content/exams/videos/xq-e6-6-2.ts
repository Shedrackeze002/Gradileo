import { englishExam, ks2, ks2Intro, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 6.2 (verb tenses). The question is the Standards and Testing Agency's own,
// word for word: 2026 key stage 2 English grammar, punctuation and spelling test, Paper 1, question
// 19, reused under the Open Government Licence v3.0. The answer is "What were you doing?": the past
// progressive is "was" or "were" plus a verb ending in -ing.

export default englishExam({
  lesson: 'e6-6-2',
  ...ks2(2026, 19),
  title: 'Which Sentence Uses the Past Progressive?',
  thumbnailTitle: 'Verb Tenses',
  subtitle: 'Progressive and perfect tenses, step by step',
  summary:
    'A real test question, solved one small step at a time: four short questions about what you did, and only one uses the past progressive. We learn how the progressive is built, name the tense of each choice, and find the one with “were” and an -ing verb.',
  intro: ks2Intro('verb tenses'),
  question: {
    prompt: 'Which sentence uses the **past progressive**?',
    text: 'Which sentence uses the past progressive? Tick one.',
    choices: ['What did you do?', 'What are you doing?', 'What were you doing?', 'What could you have done?'],
    answer: 2,
    working: 'Past progressive = **was/were** + **-ing**: *were … doing*.',
    say: ['Which sentence uses the past progressive? Tick one. A: What did you do? B: What are you doing? C: What were you doing? D: What could you have done?'],
  },
  ask: [
    ['All four ask about what **you did**', 'All four sentences ask about what you did, or are doing.'],
    ['Find the one in the **past progressive**', 'We need the one written in the past progressive tense.'],
  ],
  know: {
    title: 'Progressive and perfect tenses',
    md: 'The **progressive** shows an action **in progress**: a form of **be** + a verb ending in **-ing**. **Present** progressive: *am / is / are doing*. **Past** progressive: *was / were doing*. The **perfect** uses **have**: *have done*.',
    say: [
      'Here is the idea we need. The progressive tense shows an action that is in progress, still going on. It is built from a form of the verb be, plus a verb ending in i n g.',
      'The present progressive uses am, is or are, as in I am doing. The past progressive uses was or were, as in I was doing. The perfect tense is different: it uses have, as in I have done.',
    ],
  },
  plan: [
    ['Find the **verb** in each sentence', 'Here is the plan. First, find the verb in each sentence.'],
    ['Look for **be** + **-ing**', 'Second, look for a form of be plus an i n g verb.'],
    ['Check that the **be** verb is **past**', 'Third, check that the be verb is in the past.'],
  ],
  steps: [
    scene('Step 1: Name each tense', [table('t', ['Sentence', 'Verb', 'Tense'], [['What did you do?', '**did** do', 'simple past'], ['What are you doing?', '**are** doing', 'present progressive'], ['What were you doing?', '**were** doing', '[[good:past progressive]]'], ['What could you have done?', 'could **have** done', 'perfect, with *could*']])], [
      { say: 'Step one. Pause and find the verb in each sentence.', wait: 3 },
      { say: 'What did you do uses did and do. There is no i n g, so it is the simple past.', show: 't.0' },
      { say: 'What are you doing has are plus doing. That is progressive, but are is present. So it is the present progressive.', show: 't.1' },
      { say: 'What were you doing has were plus doing. Were is past, so this is the past progressive.', show: 't.2', focus: 't.2' },
      { say: 'What could you have done uses have plus done. That is a perfect form, not progressive.', show: 't.3' },
    ]),
    scene('Step 2: The answer', [text('a', '**C.** What **were** you **doing**?', 'xl'), text('n', 'past form of *be* + *-ing* verb')], [
      { say: 'Step two. Only one sentence has a past form of be with an i n g verb. The answer is C: What were you doing?', show: ['a', 'n'] },
    ]),
  ],
  check: [
    ['Swap *were* for *are*: it becomes **present**', 'Let us check. Swap were for are, and the sentence moves into the present. So were is what makes it past.'],
    ['Drop the *-ing*: it no longer sounds **in progress**', 'And the i n g is what makes it progressive. C has both, so C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Progressive, but **present**', 'Choice B is the closest trap. It is progressive, but are is present, not past.'],
      ['A', 'Past, but **not** progressive', 'Choice A is in the past, but it has no i n g verb.'],
      ['D', 'A **perfect** form, with *have*', 'Choice D uses have, so it is a perfect form.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence uses the **present perfect**?',
    choices: ['She was reading.', 'She has read the book.', 'She is reading.', 'She reads every night.'],
    answer: 1,
    working: 'Present perfect = **has/have** + past participle: *has read*.',
    ask: 'Which sentence uses the present perfect? A: She was reading. B: She has read the book. C: She is reading. D: She reads every night.',
    reveal: 'The answer is B, she has read the book. The present perfect uses has or have with a past form of the verb. A is past progressive, C is present progressive, and D is simple present.',
  },
  sum: [
    ['**Progressive** = a form of *be* + *-ing*', 'Here is what to remember. The progressive is a form of be plus an i n g verb.'],
    ['**Was / were** → past · **am / is / are** → present', 'Was or were makes it past. Am, is or are makes it present.'],
    ['**Perfect** uses *have*', 'And the perfect tense uses have. For more on verb tenses, watch this lesson’s explainer video on Gradileo.'],
  ],
});
