import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 7.5 (word choice, tone and vocabulary in context). An exam-style question we
// wrote, in the style of a Grade 10 language test. The answer is B: after "a strong", the gap needs a noun,
// and "effect" is the noun.

export default englishExam({
  lesson: 'e10-7-5',
  ...ours('a Grade 10 language test'),
  title: 'Affect or Effect?',
  thumbnailTitle: 'Affect or Effect?',
  subtitle: 'Commonly confused words, step by step',
  summary:
    'An exam-style question on commonly confused words, solved one small step at a time: “The loud music had a strong ___ on the baby’s sleep.” We find what kind of word the gap needs, learn the difference between affect and effect, and choose correctly.',
  intro: [
    'In this video, we solve an exam-style question about commonly confused words. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 language test.',
  ],
  question: {
    prompt: 'Which word correctly completes the sentence?<br>*The loud music had a strong ___ on the baby’s sleep.*',
    text: 'Which word correctly completes the sentence? The loud music had a strong, blank, on the baby’s sleep.',
    choices: ['affect', 'effect', 'affected', 'effected'],
    answer: 1,
    working: '*a strong ___*: the gap needs a **noun**; **effect** is the noun.',
    say: [
      'Which word correctly completes the sentence? The loud music had a strong, blank, on the baby’s sleep.',
      'A: affect, spelt a f f e c t. B: effect, spelt e f f e c t. C: affected. D: effected.',
    ],
  },
  ask: [
    ['**Affect** and **effect** sound alike', 'Affect and effect sound almost the same.'],
    ['Which one fits **here**?', 'We need the one that fits here.'],
  ],
  know: {
    title: 'Confused words and connotation',
    md: '**Affect** is usually a **verb**: to **influence** (*Music **affects** sleep.*). **Effect** is usually a **noun**: a **result** (*Music has an **effect** on sleep.*). Tip: **A**ffect = **A**ction, **E**ffect = **E**nd result. Other pairs: *their / there / they’re*, *accept / except*, *than / then*. **Connotation** is the feeling a word carries: *thrifty* (positive) vs *stingy* (negative).',
    say: [
      'Here is the idea we need. Affect, with an a, is usually a verb meaning to influence: music affects sleep. Effect, with an e, is usually a noun meaning a result: music has an effect on sleep.',
      'A tip: affect starts with a, like action, and effect starts with e, like end result. Also remember connotation, the feeling a word carries. Thrifty sounds positive, while stingy sounds negative.',
    ],
  },
  plan: [
    ['Find the **kind of word** the gap needs', 'Here is the plan. First, find the kind of word the gap needs.'],
    ['Match **affect** or **effect**', 'Second, match affect or effect.'],
  ],
  steps: [
    scene('Step 1: What kind of word?', [quote('p', ['The loud music had [[theta:a strong]] ___ on the baby’s sleep.']), text('n', '*a strong* + ___ → a **thing**: the gap needs a **noun**')], [
      { say: 'Step one. Look at the words before the gap: a strong. After a and an adjective like strong, we need a thing, a noun. Had a strong what?', show: ['p', 'n'] },
    ]),
    scene('Step 2: Match the word', [table('t', ['Word', 'Part of speech', 'Fits *a strong ___*?'], [['affect', 'verb (to influence)', '[[bad:✗]]'], ['effect', '**noun** (a result)', '[[good:✓]]'], ['affected', 'verb, past', '[[bad:✗]]'], ['effected', 'verb, past', '[[bad:✗]]']]), text('a', '*…a strong **effect** on the baby’s sleep.* → **B**', 'lg')], [
      { say: 'Step two. Affect, affected and effected are all verbs. Effect is the noun, meaning a result.', show: ['t.0', 't.1', 't.2', 't.3'], focus: 't.1' },
      { say: 'The loud music had a strong effect on the baby’s sleep. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['Rewrite with a verb: *The music **affected** her sleep*', 'Let us check by rewriting the sentence with a verb: the loud music affected the baby’s sleep. That uses affect.'],
    ['With *had a strong ___*, we need **effect**', 'But with had a strong, blank, we need the noun, effect. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Sounds the **same**, but **affect** is a verb', 'Choice A is the trap. Affect sounds almost the same, but it is a verb, and the gap needs a noun.'],
      ['C', 'A past-tense **verb**', 'Choice C is a past-tense verb.'],
      ['D', 'A rare **verb**, meaning *brought about*', 'Choice D is a rare verb, meaning brought about.'],
    ],
  },
  yourTurn: {
    prompt: 'Which word has the most **positive** connotation for someone careful with money?',
    choices: ['thrifty', 'stingy', 'cheap', 'miserly'],
    answer: 0,
    working: '*Thrifty* sounds **wise**; the others sound **mean**.',
    ask: 'Which word has the most positive connotation for someone careful with money? A: thrifty. B: stingy. C: cheap. D: miserly.',
    reveal: 'The answer is A, thrifty. It sounds wise and sensible, while stingy, cheap and miserly all sound mean.',
  },
  sum: [
    ['**Affect** = verb (action)', 'Here is what to remember. Affect is usually a verb, an action.'],
    ['**Effect** = noun (end result)', 'Effect is usually a noun, an end result.'],
    ['Words carry **connotations**', 'And words carry connotations, positive or negative feelings. For more on word choice, tone and vocabulary, watch this lesson’s explainer video on Gradileo.'],
  ],
});
