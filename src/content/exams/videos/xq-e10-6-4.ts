import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 6.4 (narrative writing). An exam-style writing question we wrote, in the style
// of a Grade 10 writing test. The answer is D: shaking hands and a cracking voice show nervousness
// through action and detail, instead of naming the feeling.

export default englishExam({
  lesson: 'e10-6-4',
  ...ours('a Grade 10 writing test'),
  title: 'Which Sentence Shows Instead of Tells?',
  thumbnailTitle: 'Show, Don’t Tell',
  subtitle: 'Narrative writing, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time: four sentences about Sam before a speech. We learn the difference between telling a feeling and showing it, test each sentence, and choose the one that shows.',
  intro: [
    'In this video, we solve an exam-style question about narrative writing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 writing test.',
  ],
  question: {
    prompt: 'Which sentence **shows** that Sam is nervous, instead of **telling** us?',
    text: 'Which sentence shows that Sam is nervous, instead of telling us?',
    choices: [
      'Sam was very nervous.',
      'Sam felt nervous about the speech.',
      'Sam was nervous, really nervous.',
      'Sam’s hands shook as he unfolded his notes, and his voice cracked on the first word.',
    ],
    answer: 3,
    working: '**Telling** names the feeling (*nervous*); **showing** gives **actions** and **details** that let the reader **infer** it.',
    say: [
      'Which sentence shows that Sam is nervous, instead of telling us?',
      'A: Sam was very nervous. B: Sam felt nervous about the speech. C: Sam was nervous, really nervous. D: Sam’s hands shook as he unfolded his notes, and his voice cracked on the first word.',
    ],
  },
  ask: [
    ['**Telling** names a feeling', 'Telling names a feeling.'],
    ['Which sentence **shows** it?', 'We need the sentence that shows it instead.'],
  ],
  know: {
    title: 'Show, don’t tell; dialogue',
    md: '**Telling**: *She was angry.* **Showing**: *She slammed the door so hard the windows rattled.* Show through **actions**, **body language**, **senses** and **dialogue**, and let the reader **infer** the feeling. **Dialogue** rules: put spoken words in **quotation marks**, keep the **comma** or end mark **inside** them, and start a **new paragraph** for each new speaker.',
    say: [
      'Here is the idea we need. Telling names a feeling: she was angry. Showing gives the reader evidence: she slammed the door so hard the windows rattled.',
      'Show through actions, body language, the senses and dialogue, and let the reader infer the feeling. For dialogue, put spoken words in quotation marks, keep the comma or end mark inside them, and start a new paragraph for each new speaker.',
    ],
  },
  plan: [
    ['Does the sentence **name** the feeling?', 'Here is the plan. First, check whether each sentence names the feeling.'],
    ['Does it give **actions** or **details**?', 'Second, check whether it gives actions or details.'],
  ],
  steps: [
    scene('Step 1: Test each sentence', [table('t', ['Choice', 'Names *nervous*?', 'Actions or details?'], [['A', '[[bad:✓ tells]]', '✗'], ['B', '[[bad:✓ tells]]', '✗'], ['C', '[[bad:✓ tells, twice]]', '✗'], ['D', '[[good:✗]]', '[[good:✓ hands shook, voice cracked]]']])], [
      { say: 'Step one. A, B and C all name the feeling: nervous. C even says it twice. Repeating a feeling is still telling.', show: ['t.0', 't.1', 't.2'] },
      { say: 'D never uses the word nervous. Instead, it gives actions: shaking hands, and a cracking voice.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The answer', [quote('p', ['Sam’s [[good:hands shook]] as he unfolded his notes, and his [[good:voice cracked]] on the first word.']), text('a', 'We **infer** he is nervous → **D**', 'lg')], [
      { say: 'Step two. From these details, we work out for ourselves that Sam is nervous. That is showing. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['Can you **picture** D, like a film?', 'Let us check. Can you picture D, like a scene in a film? Yes.'],
    ['Showing creates a **picture**, not a label', 'Showing creates a picture, not a label. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', '**Repeating** the feeling is still **telling**', 'Choice C is the trap. Saying nervous twice sounds stronger, but it is still telling.'],
      ['A', 'Names the feeling', 'Choice A names the feeling.'],
      ['B', 'Names the feeling', 'Choice B names the feeling too.'],
    ],
  },
  yourTurn: {
    prompt: 'Which line of **dialogue** is punctuated correctly?',
    choices: [
      '“I can’t find my keys” said Mia.',
      '“I can’t find my keys.” said Mia.',
      'I can’t find my keys, said Mia.',
      '“I can’t find my keys,” said Mia.',
    ],
    answer: 3,
    working: 'Quotation marks around the words, and a **comma inside** them before *said*.',
    ask: 'Which line of dialogue is punctuated correctly? A has no comma after keys. B has a full stop inside the quotation marks, before said Mia. C has no quotation marks. D has quotation marks, with a comma inside them after keys.',
    reveal: 'The answer is D. The spoken words are in quotation marks, with a comma inside them before said Mia.',
  },
  sum: [
    ['**Telling** names a feeling', 'Here is what to remember. Telling names a feeling.'],
    ['**Showing** uses actions and details', 'Showing uses actions and details, so the reader infers it.'],
    ['Dialogue: **quotation marks**, punctuation **inside**', 'And in dialogue, put the punctuation inside the quotation marks. For more on narrative writing, watch this lesson’s explainer video on Gradileo.'],
  ],
});
