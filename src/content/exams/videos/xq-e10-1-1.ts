import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 1.1 (plot and conflict). An exam-style question we wrote, in the style of a
// Grade 10 reading test, on Jack London's "To Build a Fire" (1908), which is in the public domain. The
// answer is B: the man struggles against the deadly cold, an external conflict with nature.

const LINES = [
  'Day had broken cold and gray, exceedingly cold and gray, when the man turned aside from the main Yukon trail…',
  'The cold of space smote the unprotected tip of the planet, and he, being on that unprotected tip, received the full force of the blow.',
];

export default englishExam({
  lesson: 'e10-1-1',
  ...ours('a Grade 10 reading test', 'the story is Jack London’s “To Build a Fire” (1908), in the public domain'),
  title: 'What Is the Main Conflict in “To Build a Fire”?',
  thumbnailTitle: 'Types of Conflict',
  subtitle: 'Plot and conflict, step by step',
  summary:
    'An exam-style question on Jack London’s “To Build a Fire”, solved one small step at a time: a man walks alone through the Yukon at seventy-five degrees below zero. We find what he struggles against, sort internal from external conflict, and name the main conflict.',
  intro: [
    'In this video, we solve an exam-style question about conflict in a short story. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, on Jack London’s story, which is in the public domain.',
  ],
  passage: {
    lines: LINES,
    by: 'Jack London, “To Build a Fire” (1908)',
    say: [
      'First, read two sentences from the story. A man is walking alone through the Yukon, in the far north of Canada, on a day so cold that his spit freezes before it hits the snow. Day had broken cold and gray, exceedingly cold and gray, when the man turned aside from the main Yukon trail.',
      'And later: The cold of space smote the unprotected tip of the planet, and he, being on that unprotected tip, received the full force of the blow.',
    ],
  },
  question: {
    prompt: 'What is the **main conflict** in the story?',
    text: 'Read the sentences from “To Build a Fire”. What is the main conflict in the story?',
    choices: ['character against character', 'character against nature', 'character against society', 'character against technology'],
    answer: 1,
    working: '*cold and gray*, *the cold of space*, *the full force of the blow*: the man’s enemy is the **cold** itself.',
    say: ['What is the main conflict in the story? A: character against character. B: character against nature. C: character against society. D: character against technology.'],
  },
  ask: [
    ['A conflict is a **struggle**', 'A conflict is a struggle in a story.'],
    ['What does the man struggle **against**?', 'We need to find what the man struggles against.'],
  ],
  know: {
    title: 'Plot and conflict',
    md: 'A **plot** moves through **exposition**, **rising action**, **climax**, **falling action** and **resolution**. Its engine is **conflict**. **External** conflict: a character against **another character**, **nature**, **society** or **technology**. **Internal** conflict: a character against **themselves** (fear, guilt, a hard choice). **Foreshadowing** hints at what will happen later.',
    say: [
      'Here is the idea we need. A plot moves through exposition, rising action, climax, falling action and resolution, and its engine is conflict.',
      'An external conflict sets a character against another character, against nature, against society or against technology. An internal conflict is a struggle inside a character’s own mind. And foreshadowing hints at what will happen later.',
    ],
  },
  plan: [
    ['Find the **opponent**', 'Here is the plan. First, find the man’s opponent.'],
    ['Decide **internal** or **external**', 'Second, decide whether the conflict is internal or external.'],
    ['Name the **type**', 'Third, name the type.'],
  ],
  steps: [
    scene('Step 1: The opponent', [quote('p', ['Day had broken [[bad:cold and gray]], [[bad:exceedingly cold and gray]]…', '[[bad:The cold of space]] smote the unprotected tip of the planet… he… received [[bad:the full force of the blow]].']), text('n', 'The man is **alone**: no other person stands against him')], [
      { say: 'Step one. Pause and look at the words. Cold and gray, exceedingly cold and gray. The cold of space. The full force of the blow.', show: 'p', wait: 2 },
      { say: 'The cold is described like an enemy that strikes him. And the man is alone. No other person stands against him.', show: 'n' },
    ]),
    scene('Step 2: Name it', [table('t', ['Question', 'Answer'], [['Inside his mind, or outside him?', '**outside**: external'], ['Another person, society, technology or nature?', '[[good:nature: the deadly cold]]']]), text('a', 'The man against the **cold** → character against **nature** → **B**', 'lg')], [
      { say: 'Step two. The struggle is outside him, so it is external. And his opponent is not a person, a society or a machine. It is the deadly cold.', show: ['t.0', 't.1'] },
      { say: 'So the main conflict is character against nature. The answer is B.', show: 'a' },
    ]),
  ],
  check: [
    ['The climax: he **cannot** build a fire', 'Let us check. At the climax, the man’s hands are too frozen to build a fire.'],
    ['The cold **wins**', 'In the end, the cold wins. So the conflict is with nature, and B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'His only companion is a **dog**, not an enemy', 'Choice A is the trap. A dog travels with him, but it is not his enemy, and there is no human opponent.'],
      ['C', 'No **rules** or **community** stand against him', 'Choice C: no rules or community stand against him.'],
      ['D', 'No **machine** is involved', 'Choice D: no machine is involved.'],
    ],
  },
  yourTurn: {
    prompt: 'Early on, an old-timer has warned the man **never to travel alone** in such cold. What is this early warning an example of?',
    choices: ['foreshadowing', 'flashback', 'resolution', 'comic relief'],
    answer: 0,
    working: 'An early hint of the **danger** to come: **foreshadowing**.',
    ask: 'Early on, an old-timer has warned the man never to travel alone in such cold. What is this early warning an example of? A: foreshadowing. B: flashback. C: resolution. D: comic relief.',
    reveal: 'The answer is A, foreshadowing. The warning hints at the danger to come, and builds suspense.',
  },
  sum: [
    ['Conflict is the **struggle** that drives the plot', 'Here is what to remember. Conflict is the struggle that drives the plot.'],
    ['**External**: against a person, nature, society or technology', 'An external conflict is against a person, nature, society or technology.'],
    ['**Internal**: a struggle inside the character', 'And an internal conflict is a struggle inside the character. For more on plot and conflict, watch this lesson’s explainer video on Gradileo.'],
  ],
});
