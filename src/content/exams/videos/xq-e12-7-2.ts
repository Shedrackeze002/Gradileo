import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 7.2 (grammar in context). An exam-style grammar question we wrote, in the style
// of a Grade 12 language test. The answer is C: the subject is "box", which is singular, so the verb is
// "was"; "of old letters" is a phrase between them.

export default englishExam({
  lesson: 'e12-7-2',
  ...ours('a Grade 12 language test'),
  title: 'Was or Were: “The Box of Old Letters ___ in the Attic”?',
  thumbnailTitle: 'Subject–Verb Agreement',
  subtitle: 'Grammar in complex sentences, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “The box of old letters ___ in the attic.” We find the true subject, set aside the phrase that tries to trick us, and choose the verb that agrees.',
  intro: [
    'In this video, we solve an exam-style grammar question about agreement. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 language test.',
  ],
  question: {
    prompt: 'Which verb correctly completes the sentence?<br>*The box of old letters ___ in the attic for years.*',
    text: 'Which verb correctly completes the sentence? The box of old letters, blank, in the attic for years.',
    choices: ['were', 'have been', 'was', 'are'],
    answer: 2,
    working: 'Subject = **box** (singular); *of old letters* is a **phrase** → **was**.',
    say: [
      'Which verb correctly completes the sentence? The box of old letters, blank, in the attic for years.',
      'A: were. B: have been. C: was. D: are.',
    ],
  },
  ask: [
    ['A verb must **agree** with its subject', 'A verb must agree with its subject.'],
    ['But what **is** the subject?', 'So first we need to find the real subject.'],
  ],
  know: {
    title: 'Agreement, reference, parallelism, modification',
    md: '**Agreement**: the verb agrees with its **subject**, not with a nearby noun in a phrase (*The **list** of names **is**…*). With *neither… nor*, the verb agrees with the **nearer** subject. **Reference**: each pronoun points clearly to one noun. **Parallelism**: items in a list share the same form. **Modification**: put a modifier next to the word it describes.',
    say: [
      'Here is the idea we need. Agreement: the verb agrees with its subject, not with a nearby noun inside a phrase, as in, the list of names is. With neither and nor, the verb agrees with the nearer subject.',
      'Reference: each pronoun points clearly to one noun. Parallelism: items in a list share the same form. And modification: put a modifier next to the word it describes.',
    ],
  },
  plan: [
    ['Find the **subject**', 'Here is the plan. First, find the subject.'],
    ['Set aside the **phrase**', 'Second, set aside the phrase.'],
    ['Choose the **verb**', 'Third, choose the verb.'],
  ],
  steps: [
    scene('Step 1: The subject', [quote('p', ['The [[good:box]] [[theta:of old letters]] ___ in the attic for years.']), table('t', ['Part', 'Role'], [['*box*', 'the **subject**: singular'], ['*of old letters*', 'a **phrase** describing the box']])], [
      { say: 'Step one. What was in the attic? The box. Box is the subject, and it is singular.', show: ['p', 't.0'] },
      { say: 'Of old letters is a phrase describing the box. Letters is plural, but it is not the subject.', show: 't.1', focus: 't.1' },
    ]),
    scene('Step 2: The verb', [text('s', 'Cover the phrase: *The box ___ in the attic for years.*'), quote('q', ['The box of old letters [[good:was]] in the attic for years.']), text('a', 'Singular subject → **was** → **C**', 'lg')], [
      { say: 'Step two. Cover the phrase: the box, blank, in the attic for years. Now it is easy.', show: 's' },
      { say: 'The box was in the attic. The answer is C.', show: ['q', 'a'] },
    ]),
  ],
  check: [
    ['*for years* is in the **past**: *was*, not *is*', 'Let us check. For years points to the past, so we need was, not is.'],
    ['and *was* is **singular**, matching *box*', 'And was is singular, matching box. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', '*letters* is plural, but it is **not** the subject', 'Choice A is the trap. Letters sits right next to the gap and is plural, but it is not the subject.'],
      ['B', '*have* is **plural**', 'Choice B: have been is plural.'],
      ['D', '*are* is **plural** and **present**', 'Choice D: are is plural, and present tense.'],
    ],
  },
  yourTurn: {
    prompt: 'Which sentence is **parallel**?',
    choices: ['She likes hiking, swimming and to ride.', 'She likes hiking, swimming and riding.', 'She likes to hike, swimming and riding.', 'She likes hiking, to swim and riding.'],
    answer: 1,
    working: '*hiking, swimming, riding*: all the **same form** (-ing).',
    ask: 'Which sentence is parallel? A: She likes hiking, swimming and to ride. B: She likes hiking, swimming and riding. C: She likes to hike, swimming and riding. D: She likes hiking, to swim and riding.',
    reveal: 'The answer is B. Hiking, swimming and riding all share the same form, so the list is parallel.',
  },
  sum: [
    ['The verb agrees with the **subject**', 'Here is what to remember. The verb agrees with the subject.'],
    ['**Cover** phrases between subject and verb', 'Cover any phrase between the subject and the verb.'],
    ['Keep lists **parallel**', 'And keep lists parallel. For more on grammar in context, watch this lesson’s explainer video on Gradileo.'],
  ],
});
