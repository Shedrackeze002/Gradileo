import { englishExam, ks2, ks2Intro, scene, table } from '../english.ts';

// Grade 8 English, lesson 6.1 (active and passive voice). The question is the Standards and Testing
// Agency's own, word for word: 2024 key stage 2 English grammar, punctuation and spelling test, Paper 1,
// question 26, reused under the Open Government Licence v3.0. The answer is "The meal was enjoyed by
// everyone.": the subject receives the action, and the doer comes after "by".

export default englishExam({
  lesson: 'e8-6-1',
  ...ks2(2024, 26),
  title: 'Which Sentence Is in the Passive?',
  thumbnailTitle: 'Active and Passive',
  subtitle: 'Active and passive voice, step by step',
  summary:
    'A real test question, solved one small step at a time: four sentences, and only one is in the passive voice. We learn how the passive is built, ask who does the action in each sentence, and find the one where the subject receives it.',
  intro: ks2Intro('the passive voice'),
  question: {
    prompt: 'Which sentence is in the **passive**?',
    text: 'Which sentence is in the passive? Tick one.',
    choices: ['The manager has sent you an email.', 'Our dog lost her new collar.', 'The weather was very cold this winter.', 'The meal was enjoyed by everyone.'],
    answer: 3,
    working: '*The meal* **receives** the action; *was enjoyed* = **be** + past participle; the doer follows **by**.',
    say: ['Which sentence is in the passive? Tick one. A: The manager has sent you an email. B: Our dog lost her new collar. C: The weather was very cold this winter. D: The meal was enjoyed by everyone.'],
  },
  ask: [
    ['Four sentences, one **passive**', 'Four sentences, and only one is passive.'],
    ['Find **who does** the action in each', 'We need to look at who does the action in each.'],
  ],
  know: {
    title: 'Active and passive voice',
    md: '**Active**: the subject **does** the action (*Everyone **enjoyed** the meal*). **Passive**: the subject **receives** the action (*The meal **was enjoyed** by everyone*). The passive uses a form of **be** + a **past participle**, and the doer may follow **by**, or be left out.',
    say: [
      'Here is the idea we need. In the active voice, the subject does the action: everyone enjoyed the meal.',
      'In the passive voice, the subject receives the action: the meal was enjoyed by everyone. The passive uses a form of be plus a past participle, and the doer may follow by, or be left out completely.',
    ],
  },
  plan: [
    ['Find the **subject** and **verb**', 'Here is the plan. First, find the subject and the verb.'],
    ['Does the subject **do** or **receive** the action?', 'Second, does the subject do the action, or receive it?'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Sentence', 'Subject', 'Does or receives?'], [['The manager has sent…', 'the manager', 'does: **active**'], ['Our dog lost…', 'our dog', 'does: **active**'], ['The weather was very cold…', 'the weather', 'no action: *was* + adjective'], ['The meal was enjoyed by everyone.', 'the meal', '[[good:receives: **passive**]]']])], [
      { say: 'Step one. The manager sent the email. The manager does the action, so it is active.', show: 't.0' },
      { say: 'Our dog lost her collar. The dog does the action, so it is active.', show: 't.1' },
      { say: 'The weather was very cold. Was is followed by an adjective, cold, not a past participle. No one does anything to the weather, so this is not passive.', show: 't.2' },
      { say: 'The meal was enjoyed by everyone. The meal does not enjoy anything. It receives the enjoying. Was plus enjoyed, and by everyone. That is passive. The answer is D.', show: 't.3', focus: 't.3' },
    ]),
  ],
  check: [
    ['Turn it active: *Everyone enjoyed the meal.*', 'Let us check. Turn it into the active: everyone enjoyed the meal. It works, so D was passive.'],
    ['C **cannot** be turned around: nobody *colds* the weather', 'Try that with C, and there is nothing to turn around, because no one does anything to the weather. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**was** + an **adjective** is not the passive', 'Choice C is the trap. It has was, but cold is an adjective, not a past participle.'],
      ['A', '**has sent** is the present perfect, active', 'Choice A: has sent is the present perfect, and still active.'],
      ['B', 'The dog **does** the losing', 'Choice B: the dog does the losing.'],
    ],
  },
  yourTurn: {
    prompt: 'Why might a news report write *“The window was broken last night”* in the **passive**?',
    choices: ['Because nobody knows who broke it.', 'Because the passive is always better.', 'Because it is shorter than the active.', 'Because windows cannot break.'],
    answer: 0,
    working: 'The passive lets a writer **leave out** an **unknown** doer.',
    ask: 'Why might a news report write, the window was broken last night, in the passive? A: Because nobody knows who broke it. B: Because the passive is always better. C: Because it is shorter than the active. D: Because windows cannot break.',
    reveal: 'The answer is A. The passive lets a writer focus on what happened and leave out the doer, which is useful when no one knows who did it.',
  },
  sum: [
    ['**Active**: the subject **does** the action', 'Here is what to remember. In the active, the subject does the action.'],
    ['**Passive**: the subject **receives** it; **be** + past participle', 'In the passive, the subject receives it, using be plus a past participle.'],
    ['Use the passive when the **doer** is unknown or unimportant', 'Use the passive when the doer is unknown or unimportant. For more on active and passive voice, watch this lesson’s explainer video on Gradileo.'],
  ],
});
