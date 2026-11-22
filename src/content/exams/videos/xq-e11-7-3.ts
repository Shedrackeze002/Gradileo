import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 11 English, lesson 7.3 (voice and mood). An exam-style grammar question we wrote, in the style of
// a Grade 11 language test. The answer is D: "If I were the principal" uses the subjunctive "were",
// because the speaker is imagining a situation that is not true.

export default englishExam({
  lesson: 'e11-7-3',
  ...ours('a Grade 11 language test'),
  title: 'Why “If I Were the Principal” and Not “If I Was”?',
  thumbnailTitle: 'The Subjunctive',
  subtitle: 'Voice and mood, step by step',
  summary:
    'An exam-style grammar question, solved one small step at a time: “If I were the principal, I would ban homework.” We ask whether the speaker really is the principal, meet the subjunctive mood, and explain why “were” is the standard choice here.',
  intro: [
    'In this video, we solve an exam-style grammar question about mood. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 11 language test.',
  ],
  question: {
    prompt: 'Why does standard English use **were** in this sentence?<br>*If I **were** the principal, I would ban homework.*',
    text: 'Why does standard English use were in this sentence? If I were the principal, I would ban homework.',
    choices: [
      'because it describes something that happened in the past',
      'because the subject “I” is plural',
      'it is a mistake; “was” is the only correct form',
      'because it is the subjunctive, used for a situation that is not true',
    ],
    answer: 3,
    working: 'The speaker is **not** the principal: an imagined, **contrary-to-fact** situation takes the **subjunctive** *were*.',
    say: [
      'Why does standard English use were in this sentence? If I were the principal, I would ban homework.',
      'A: because it describes something that happened in the past. B: because the subject, I, is plural. C: it is a mistake; was is the only correct form. D: because it is the subjunctive, used for a situation that is not true.',
    ],
  },
  ask: [
    ['*I* usually takes **was**', 'Normally we say I was, not I were.'],
    ['Why **were** here?', 'We need to explain why this sentence uses were.'],
  ],
  know: {
    title: 'Voice and mood',
    md: '**Voice**: in the **active** voice the subject does the action (*The storm broke the window*); in the **passive** voice the subject receives it (*The window was broken by the storm*). **Mood**: the **indicative** states facts, the **imperative** gives commands, and the **subjunctive** expresses wishes, demands and situations **contrary to fact**, using *were* for every subject (*If she **were** here…*, *I wish I **were** taller*).',
    say: [
      'Here is the idea we need. Voice is about who does the action. In the active voice the subject does it: the storm broke the window. In the passive voice the subject receives it: the window was broken by the storm.',
      'Mood is about the kind of statement. The indicative states facts, the imperative gives commands, and the subjunctive expresses wishes, demands and situations that are not true. The subjunctive uses were for every subject, as in, if she were here, or, I wish I were taller.',
    ],
  },
  plan: [
    ['Is the situation **true**?', 'Here is the plan. First, is the situation true?'],
    ['Name the **mood**', 'Second, name the mood.'],
    ['Pick the **reason**', 'Third, pick the reason.'],
  ],
  steps: [
    scene('Step 1: True or imagined?', [quote('p', ['[[theta:If]] I [[good:were]] the principal, I [[theta:would]] ban homework.']), table('t', ['Clue', 'Meaning'], [['*If…*', 'a **condition**'], ['*would ban*', 'what **would** happen, not what does'], ['is the speaker the principal?', '[[bad:no]]: it is **imagined**']])], [
      { say: 'Step one. If sets up a condition, and would ban tells us what would happen, not what does happen.', show: ['p', 't.0', 't.1'] },
      { say: 'And the speaker is not the principal. They are imagining it. The situation is contrary to fact.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The mood', [table('m', ['Sentence', 'Mood'], [['*I **was** late yesterday.*', 'indicative: a **fact**'], ['*If I **were** the principal…*', '[[good:subjunctive]]: **not true**']]), text('a', 'An imagined, untrue situation → **subjunctive were** → **D**', 'lg')], [
      { say: 'Step two. I was late yesterday states a fact, so it uses the indicative, was.', show: 'm.0' },
      { say: 'If I were the principal imagines something untrue, so it uses the subjunctive, were.', show: 'm.1' },
      { say: 'So were is the subjunctive, used for a situation that is not true. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Try another: *I wish I **were** taller*', 'Let us check with another example: I wish I were taller. The speaker is not taller, so it is the subjunctive again.'],
    ['Untrue wish or condition → **were**', 'An untrue wish or condition takes were. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Many people **say** *was*, but formal writing uses *were*', 'Choice C is the trap. Many people say if I was in everyday speech, but standard formal English uses were for an untrue condition.'],
      ['A', 'It imagines the **present**, not the past', 'Choice A: it imagines the present, not a past event.'],
      ['B', '*I* is **singular**', 'Choice B: I is singular, not plural.'],
    ],
  },
  yourTurn: {
    prompt: 'Which voice is used in *The window was broken by the storm*?',
    choices: ['the active voice', 'the subjunctive mood', 'the passive voice', 'the imperative mood'],
    answer: 2,
    working: 'The subject (*the window*) **receives** the action: **passive**.',
    ask: 'Which voice is used in, the window was broken by the storm? A: the active voice. B: the subjunctive mood. C: the passive voice. D: the imperative mood.',
    reveal: 'The answer is C, the passive voice. The window receives the action, and the storm, the doer, comes after by.',
  },
  sum: [
    ['**Active**: subject does it · **Passive**: subject receives it', 'Here is what to remember. In the active voice the subject does the action, and in the passive voice the subject receives it.'],
    ['**Subjunctive**: wishes and untrue conditions', 'The subjunctive mood expresses wishes, demands and untrue conditions.'],
    ['*If I **were**…*, *I wish I **were**…*', 'So we write, if I were, and, I wish I were. For more on voice and mood, watch this lesson’s explainer video on Gradileo.'],
  ],
});
