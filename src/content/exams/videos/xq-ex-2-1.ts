import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 2.1 (writing an article, a letter and a speech). An exam-style writing
// question we wrote, in the style of a GCSE English Language exam. The answer is C: a speech opens by
// greeting its live audience and drawing them in.

export default englishExam({
  lesson: 'ex-2-1',
  ...ours('a GCSE English Language exam'),
  title: 'Which Opening Suits a Speech to Your Year Group?',
  thumbnailTitle: 'Writing a Speech',
  subtitle: 'Articles, letters and speeches, step by step',
  summary:
    'An exam-style writing question, solved one small step at a time. A student must write a speech to their year group arguing for a longer lunch break. We match four openings to their forms, and choose the one that works best spoken aloud to a live audience.',
  intro: [
    'In this video, we solve an exam-style question about writing for different forms. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a GCSE English Language exam.',
  ],
  question: {
    prompt: 'You must write a **speech** to your year group arguing for a longer lunch break. Which opening is **best**?',
    text: 'You must write a speech to your year group arguing for a longer lunch break. Which opening is best?',
    choices: [
      'Dear Sir or Madam, I am writing to express my concern about lunch breaks.',
      'LUNCH CRUNCH: Students Starving for Time',
      'Good morning, everyone. Raise your hand if you have ever eaten your lunch standing up in a queue.',
      'Yours faithfully, a concerned student.',
    ],
    answer: 2,
    working: 'Greets a **live audience** + **direct address** + **involves** them: a **speech** opening.',
    say: [
      'You must write a speech to your year group arguing for a longer lunch break. Which opening is best?',
      'A: Dear Sir or Madam, I am writing to express my concern about lunch breaks. B: Lunch crunch: students starving for time. C: Good morning, everyone. Raise your hand if you have ever eaten your lunch standing up in a queue. D: Yours faithfully, a concerned student.',
    ],
  },
  ask: [
    ['The form is a **speech**', 'The form is a speech, to your year group.'],
    ['Which opening **fits**?', 'We need the opening that fits that form and audience.'],
  ],
  know: {
    title: 'Forms of writing',
    md: 'An **article** has a **headline**, often a subheading, and an engaging opening paragraph. A **formal letter** opens with *Dear Sir or Madam* (ending *Yours faithfully*) or *Dear Ms Patel* (ending *Yours sincerely*). A **speech** greets a **live audience**, uses **direct address** (*you*, *we*), questions and repetition, and ends with a strong **call to action**. Match the **register** to the audience.',
    say: [
      'Here is the idea we need. An article has a headline, often a subheading, and an engaging opening paragraph. A formal letter opens with Dear Sir or Madam, ending Yours faithfully, or with a name, like Dear Ms Patel, ending Yours sincerely.',
      'A speech greets a live audience, uses direct address, like you and we, questions and repetition, and ends with a strong call to action. And always match the register to the audience.',
    ],
  },
  plan: [
    ['Match each opening to its **form**', 'Here is the plan. First, match each opening to its form.'],
    ['Check the **audience**', 'Second, check the audience.'],
    ['Choose the **speech** opening', 'Third, choose the speech opening.'],
  ],
  steps: [
    scene('Step 1: Match the forms', [table('t', ['Opening', 'Form'], [['A: *Dear Sir or Madam…*', 'a formal **letter**'], ['B: *LUNCH CRUNCH…*', 'an article **headline**'], ['D: *Yours faithfully…*', 'a letter **ending**'], ['C: *Good morning, everyone…*', 'a **speech**']])], [
      { say: 'Step one. A, Dear Sir or Madam, opens a formal letter. B, in capitals, is an article headline. D, Yours faithfully, is how a letter ends.', show: ['t.0', 't.1', 't.2'] },
      { say: 'C, Good morning, everyone, greets a live audience. That is a speech.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: Why it works', [quote('p', ['[[good:Good morning, everyone.]] [[good:Raise your hand]] if you have ever eaten your lunch standing up in a queue.']), table('w', ['Feature', 'Effect'], [['greeting', 'speaks to a **live** audience'], ['*Raise your hand*', '**involves** listeners at once'], ['a shared **experience**', 'builds **agreement**']]), text('a', '**C**', 'lg')], [
      { say: 'Step two. Good morning, everyone, speaks to the audience in the room. Raise your hand gets them involved straight away.', show: ['p', 'w.0', 'w.1'] },
      { say: 'And eating lunch in a queue is something they have all lived through, so they start agreeing before the argument begins. The answer is C.', show: ['w.2', 'a'] },
    ]),
  ],
  check: [
    ['The audience is your **year group**: **friendly**, not stiff', 'Let us check. The audience is your year group, so the register can be friendly, not stiff.'],
    ['C is lively but still **standard English**', 'C is lively, but still standard English. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Formal and clear, but a **letter**, not a speech', 'Choice A is the trap. It is formal and clear, which seems right for an exam, but it opens a letter, not a speech.'],
      ['B', 'A **headline** for an article', 'Choice B is a headline for an article.'],
      ['D', 'A letter’s **ending**', 'Choice D is the ending of a letter.'],
    ],
  },
  yourTurn: {
    prompt: 'A formal letter that begins *“Dear Sir or Madam”* should end with:',
    choices: ['Yours faithfully', 'Yours sincerely', 'Love from', 'Cheers'],
    answer: 0,
    working: 'Name **unknown** → **Yours faithfully**.',
    ask: 'A formal letter that begins, Dear Sir or Madam, should end with: A: Yours faithfully. B: Yours sincerely. C: Love from. D: Cheers.',
    reveal: 'The answer is A, Yours faithfully. When you do not know the reader’s name, you end with Yours faithfully.',
  },
  sum: [
    ['**Article**: headline · **Letter**: Dear… / Yours…', 'Here is what to remember. An article has a headline, and a letter opens with Dear and ends with Yours.'],
    ['**Speech**: greet, involve, call to action', 'A speech greets its audience, involves them, and ends with a call to action.'],
    ['Match the **register** to the audience', 'And match the register to the audience. For more on writing articles, letters and speeches, watch this lesson’s explainer video on Gradileo.'],
  ],
});
