import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 9 English, lesson 4.2 (analysing a speech). An exam-style question we wrote, in the style of a
// Grade 9 reading test, on Abraham Lincoln's Gettysburg Address (1863), which is in the public domain.
// The answer is D: Lincoln honours the fallen soldiers and urges the living to finish their work so
// that the nation and its government by the people survive.

const LINES = [
  'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.',
  'It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced.',
  '…that government of the people, by the people, for the people, shall not perish from the earth.',
];

export default englishExam({
  lesson: 'e9-4-2',
  ...ours('a Grade 9 reading test', 'the speech is Abraham Lincoln’s Gettysburg Address (1863), in the public domain'),
  title: 'What Is the Purpose of the Gettysburg Address?',
  thumbnailTitle: 'The Gettysburg Address',
  subtitle: 'Purpose, audience and structure, step by step',
  summary:
    'An exam-style question on Abraham Lincoln’s Gettysburg Address, solved one small step at a time: a short speech at a battlefield cemetery during the American Civil War. We follow its movement from past to present to future, and name its main purpose.',
  intro: [
    'In this video, we solve an exam-style question about the purpose of a speech. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 9 reading test, on Lincoln’s speech, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Abraham Lincoln, the Gettysburg Address (1863): opening, middle and closing words',
    say: [
      'First, read three parts of the speech. Lincoln gave it in eighteen sixty-three, at a cemetery for soldiers killed in a Civil War battle. It opens: Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.',
      'In the middle: It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced.',
      'And it ends: that government of the people, by the people, for the people, shall not perish from the earth.',
    ],
  },
  question: {
    prompt: 'What is the **main purpose** of Lincoln’s speech?',
    text: 'Read the parts of the Gettysburg Address. What is the main purpose of Lincoln’s speech?',
    choices: [
      'To describe the battle in detail.',
      'To announce that the war is over.',
      'To blame the soldiers for the losses.',
      'To honour the dead and urge the living to finish their work, so the nation survives.',
    ],
    answer: 3,
    working: '**Past**: the nation’s founding. **Present**: *for us the living… the unfinished work*. **Future**: government *shall not perish*.',
    say: [
      'What is the main purpose of Lincoln’s speech?',
      'A: To describe the battle in detail. B: To announce that the war is over. C: To blame the soldiers for the losses. D: To honour the dead and urge the living to finish their work, so the nation survives.',
    ],
  },
  ask: [
    ['We need the **main purpose**', 'We need the main purpose of the speech.'],
    ['Think about **audience** and **context**', 'To find it, think about the audience and the context.'],
  ],
  know: {
    title: 'Purpose, audience, context, structure',
    md: '**Purpose**: what the speaker wants to **achieve** (persuade, inspire, honour, warn). **Audience**: **who** is listening. **Context**: **when** and **where**, and what is happening. Many speeches are **structured** in time: **past** (where we came from), **present** (where we are), **future** (what we must do).',
    say: [
      'Here is the idea we need. A speech’s purpose is what the speaker wants to achieve, such as to persuade, inspire, honour or warn. The audience is who is listening, and the context is when and where, and what is happening.',
      'Many speeches are structured in time: the past, where we came from; the present, where we are; and the future, what we must do.',
    ],
  },
  plan: [
    ['Note the **context**', 'Here is the plan. First, note the context.'],
    ['Follow the **structure**', 'Second, follow the structure.'],
    ['Name the **purpose**', 'Third, name the purpose.'],
  ],
  steps: [
    scene('Step 1: Context and structure', [table('t', ['Part', 'Time', 'What Lincoln says'], [['*Four score and seven years ago…*', '**past**', 'the nation was founded on **liberty** and **equality**'], ['*for us the living… the unfinished work*', '**present**', 'the living must **carry on**'], ['*government… shall not perish*', '**future**', 'the nation must **survive**']])], [
      { say: 'Step one. The context: the war is still going on, and Lincoln stands at a cemetery for soldiers killed there.', show: 't.0' },
      { say: 'Four score and seven years ago looks to the past: the nation was founded on liberty and equality.', focus: 't.0' },
      { say: 'For us the living, the unfinished work, turns to the present. The living must carry on what the soldiers began.', show: 't.1' },
      { say: 'And shall not perish looks to the future. The nation must survive.', show: 't.2' },
    ]),
    scene('Step 2: The purpose', [quote('p', ['It is [[good:for us the living]], rather, to be dedicated here to the [[good:unfinished work]]…']), text('a', '**Honour** the dead, **inspire** the living → **D**', 'lg')], [
      { say: 'Step two. So the speech honours the soldiers who died, and urges the living to finish their work so the nation survives. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['The speech is very **short**, with no battle details', 'Let us check. The speech is very short and gives no details of the fighting.'],
    ['It looks **forward**, to what the living must do', 'It looks forward, to what the living must do. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The speech is at a **battlefield**, but gives no battle details', 'Choice A is the trap. The speech was given at a battlefield, but it does not describe the battle.'],
      ['B', '*unfinished work*: the war is **not** over', 'Choice B: unfinished work shows the war is not over.'],
      ['C', 'He says they fought *so nobly*', 'Choice C: he praises the soldiers, saying they fought so nobly.'],
    ],
  },
  yourTurn: {
    prompt: 'Which device is *“of the people, by the people, for the people”*?',
    choices: ['a simile', 'a tricolon', 'a pun', 'an oxymoron'],
    answer: 1,
    working: 'A group of **three** matching phrases: a **tricolon**.',
    ask: 'Which device is, of the people, by the people, for the people? A: a simile. B: a tricolon. C: a pun. D: an oxymoron.',
    reveal: 'The answer is B, a tricolon. Three matching phrases make the closing words rhythmic and easy to remember.',
  },
  sum: [
    ['**Purpose**: what the speaker wants to achieve', 'Here is what to remember. The purpose is what the speaker wants to achieve.'],
    ['Use **audience** and **context** to find it', 'Use the audience and the context to find it.'],
    ['Look for a **past, present, future** structure', 'And look for a past, present and future structure. For more on analysing a speech, watch this lesson’s explainer video on Gradileo.'],
  ],
});
