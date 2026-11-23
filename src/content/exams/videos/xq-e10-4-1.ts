import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 4.1 (purpose and audience). An exam-style question we wrote, in the style of a
// Grade 10 reading test, on a short text of our own. The answer is D: numbered steps and commands show
// the main purpose is to instruct.

const TEXT = ['**Fixing a Flat Bike Tyre**<br>1. Release the brake and take the wheel off the frame.<br>2. Lever one side of the tyre off the rim.<br>3. Pull out the inner tube and find the hole.<br>4. Patch the hole, or fit a new tube, then pump it up.'];

export default englishExam({
  lesson: 'e10-4-1',
  ...ours('a Grade 10 reading test', 'the text is our own'),
  title: 'What Is the Main Purpose of This Text?',
  thumbnailTitle: 'Purpose and Audience',
  subtitle: 'Finding a text’s purpose, step by step',
  summary:
    'An exam-style question on purpose and audience, solved one small step at a time: a short text about fixing a flat bike tyre. We look at its layout and its verbs, test each purpose, and name the main one.',
  intro: [
    'In this video, we solve an exam-style question about a text’s purpose. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, and the text is our own.',
  ],
  passage: {
    lines: TEXT,
    by: 'A short text (our own)',
    say: ['First, read the text. Fixing a flat bike tyre. One: release the brake and take the wheel off the frame. Two: lever one side of the tyre off the rim. Three: pull out the inner tube and find the hole. Four: patch the hole, or fit a new tube, then pump it up.'],
  },
  question: {
    prompt: 'What is the **main purpose** of this text?',
    text: 'Read the text. What is the main purpose of this text?',
    choices: ['to persuade', 'to entertain', 'to describe', 'to instruct'],
    answer: 3,
    working: '**Numbered steps** + **commands** (*Release*, *Lever*, *Pull*, *Patch*): it tells you **how to do** something.',
    say: ['What is the main purpose of this text? A: to persuade. B: to entertain. C: to describe. D: to instruct.'],
  },
  ask: [
    ['Every text has a **purpose**', 'Every text has a purpose, a reason it was written.'],
    ['What is **this** text’s main one?', 'We need this text’s main purpose.'],
  ],
  know: {
    title: 'Purpose and audience',
    md: '**Purpose** is why a text was written. **Inform**: give facts. **Persuade**: change your mind or actions. **Entertain**: give enjoyment. **Instruct**: tell you **how to do** something, often with **numbered steps** and **commands**. **Describe**: help you picture something. The **audience** is who it is for, shown by its **content** and **language**.',
    say: [
      'Here is the idea we need. Purpose is why a text was written. To inform is to give facts. To persuade is to change your mind or actions. To entertain is to give enjoyment. To describe is to help you picture something.',
      'And to instruct is to tell you how to do something, often with numbered steps and commands. The audience is who the text is for, which its content and language show.',
    ],
  },
  plan: [
    ['Look at the **layout**', 'Here is the plan. First, look at the layout.'],
    ['Look at the **verbs**', 'Second, look at the verbs.'],
    ['Name the **purpose**', 'Third, name the purpose.'],
  ],
  steps: [
    scene('Step 1: Layout and verbs', [table('t', ['Clue', 'What we see'], [['layout', '**numbered** steps, 1 to 4, in **order**'], ['verbs', '**commands**: *Release*, *Lever*, *Pull*, *Patch*'], ['title', '*Fixing* a flat tyre: a **task**']])], [
      { say: 'Step one. The layout is numbered steps, in order, from one to four.', show: 't.0' },
      { say: 'Each step starts with a command: release, lever, pull, patch. And the title names a task.', show: ['t.1', 't.2'] },
    ]),
    scene('Step 2: The purpose', [text('a', 'It tells the reader **how to do** a task → **to instruct** → **D**', 'lg')], [
      { say: 'Step two. Numbered steps and commands tell the reader how to do a task. The main purpose is to instruct. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['Could you **follow** it and fix a tyre?', 'Let us check. Could you follow this text and fix a tyre? Yes.'],
    ['Then its job is to **instruct**', 'Then its job is to instruct. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'It names **parts**, but does not help you **picture** them', 'Choice C is the trap. The text names parts of the bike, but it does not describe what they look like.'],
      ['A', 'No attempt to **change** your mind', 'Choice A: it does not try to change your mind.'],
      ['B', 'Not written for **fun**', 'Choice B: it is not written for fun.'],
    ],
  },
  yourTurn: {
    prompt: 'A theme park brochure says: *“The best day out of your LIFE! Book now and save!”* What is its **main purpose**?',
    choices: ['to persuade', 'to instruct', 'to describe', 'to entertain'],
    answer: 0,
    working: '*Book now*, *the best day*: it wants you to **act**: **persuade**.',
    ask: 'A theme park brochure says: The best day out of your life! Book now and save! What is its main purpose? A: to persuade. B: to instruct. C: to describe. D: to entertain.',
    reveal: 'The answer is A, to persuade. It praises the park and urges you to book now.',
  },
  sum: [
    ['**Purpose** = why the text was written', 'Here is what to remember. Purpose is why the text was written.'],
    ['Clues: **layout**, **verbs**, **title**', 'Look for clues in the layout, the verbs and the title.'],
    ['Steps + commands → **instruct**', 'Numbered steps and commands mean the text instructs. For more on purpose and audience, watch this lesson’s explainer video on Gradileo.'],
  ],
});
