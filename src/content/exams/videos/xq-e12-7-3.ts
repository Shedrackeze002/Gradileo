import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 12 English, lesson 7.3 (register, tone and audience). An exam-style question we wrote, in the
// style of a Grade 12 language test. The answer is A: a formal register suits an email to a university
// admissions officer.

export default englishExam({
  lesson: 'e12-7-3',
  ...ours('a Grade 12 language test'),
  title: 'Which Opening Suits an Email to a University?',
  thumbnailTitle: 'Register and Audience',
  subtitle: 'Register, tone and audience, step by step',
  summary:
    'An exam-style question on register, solved one small step at a time. A student is emailing a university admissions officer about a scholarship. We identify the audience and purpose, and choose the opening whose register fits.',
  intro: [
    'In this video, we solve an exam-style question about register and tone. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 12 language test.',
  ],
  question: {
    prompt: 'A student is emailing a university admissions officer, Ms Patel, about a scholarship. Which opening has the most **appropriate register**?',
    text: 'A student is emailing a university admissions officer, Ms Patel, about a scholarship. Which opening has the most appropriate register?',
    choices: [
      'Dear Ms Patel, I am writing to ask about the deadline for scholarship applications.',
      'Hey there! Quick question about the scholarship thing.',
      'Yo Ms P, when’s the scholarship due?',
      'To whom it may concern, scholarship deadline. Respond.',
    ],
    answer: 0,
    working: 'Audience: an **official** stranger; purpose: a **polite request** → **formal**, courteous: **A**.',
    say: [
      'A student is emailing a university admissions officer, Ms Patel, about a scholarship. Which opening has the most appropriate register?',
      'A: Dear Ms Patel, I am writing to ask about the deadline for scholarship applications. B: Hey there! Quick question about the scholarship thing. C: Yo Ms P, when’s the scholarship due? D: To whom it may concern, scholarship deadline. Respond.',
    ],
  },
  ask: [
    ['An email to a **university**', 'The student is writing to a university.'],
    ['Which **register** fits?', 'We need the opening whose register fits.'],
  ],
  know: {
    title: 'Register, tone and audience',
    md: '**Register** is the level of formality: **formal** (full sentences, polite forms, no slang), **neutral**, or **informal** (contractions, slang, chatty). **Tone** is the attitude: warm, firm, polite, curt. Choose both from your **audience** (who they are, how well you know them) and your **purpose** (to request, inform, persuade). Writers can **shift** register deliberately for effect.',
    say: [
      'Here is the idea we need. Register is the level of formality. Formal writing uses full sentences, polite forms and no slang. Informal writing uses contractions, slang and a chatty style. Tone is the attitude: warm, firm, polite or curt.',
      'Choose both from your audience, who they are and how well you know them, and your purpose, whether to request, inform or persuade. Writers can also shift register on purpose, for effect.',
    ],
  },
  plan: [
    ['Who is the **audience**?', 'Here is the plan. First, who is the audience?'],
    ['What is the **purpose**?', 'Second, what is the purpose?'],
    ['Match the **register** and **tone**', 'Third, match the register and tone.'],
  ],
  steps: [
    scene('Step 1: Audience and purpose', [table('t', ['Question', 'Answer'], [['audience', 'an **official** the student does not know'], ['purpose', 'a **polite request** for information'], ['so…', '**formal** register, **courteous** tone']])], [
      { say: 'Step one. The audience is an official at a university, someone the student does not know.', show: 't.0' },
      { say: 'The purpose is to ask politely for information. So the email needs a formal register and a courteous tone.', show: ['t.1', 't.2'], focus: 't.2' },
    ]),
    scene('Step 2: Test each opening', [table('c', ['Opening', 'Register / tone'], [['B: *Hey there! Quick question…*', '[[bad:informal]]'], ['C: *Yo Ms P…*', '[[bad:slang]]'], ['D: *…Respond.*', 'formal, but [[bad:curt]]'], ['A: *Dear Ms Patel, I am writing to ask…*', '[[good:formal and polite]]']]), text('a', 'Formal and courteous → **A**', 'lg')], [
      { say: 'Step two. B is chatty and informal. C uses slang.', show: ['c.0', 'c.1'] },
      { say: 'D starts formally, but respond is a command. The tone is curt, even rude.', show: 'c.2' },
      { say: 'A is formal and polite, and states its purpose clearly. The answer is A.', show: ['c.3', 'a'], focus: 'c.3' },
    ]),
  ],
  check: [
    ['A uses her **name** and states the **purpose**', 'Let us check. A uses her name, and states its purpose in the first sentence.'],
    ['Both show **respect** for the reader', 'Both show respect for the reader. So A holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['D', 'Formal **words**, but a rude **tone**', 'Choice D is the trap. It uses formal words, so it seems right, but its tone is rude.'],
      ['B', 'Too **chatty**', 'Choice B is too chatty.'],
      ['C', '**Slang**', 'Choice C uses slang.'],
    ],
  },
  yourTurn: {
    prompt: 'Which phrase best fits a **formal** report?',
    choices: ['loads of people', 'tons of people', 'a substantial number of people', 'heaps of people'],
    answer: 2,
    working: '*a substantial number*: **formal** register.',
    ask: 'Which phrase best fits a formal report? A: loads of people. B: tons of people. C: a substantial number of people. D: heaps of people.',
    reveal: 'The answer is C, a substantial number of people. The others are informal.',
  },
  sum: [
    ['**Register** = formality · **Tone** = attitude', 'Here is what to remember. Register is the level of formality, and tone is the attitude.'],
    ['Choose them from **audience** and **purpose**', 'Choose them from your audience and purpose.'],
    ['Formal words can still sound **rude**', 'And remember that formal words can still sound rude. For more on register, tone and audience, watch this lesson’s explainer video on Gradileo.'],
  ],
});
