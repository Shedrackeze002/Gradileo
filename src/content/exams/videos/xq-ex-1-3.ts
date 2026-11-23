import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// More English Topics, lesson 1.3 (comparing writers' viewpoints and methods). An exam-style question we
// wrote, in the style of a GCSE English Language exam, on two short sources we wrote ourselves. The answer
// is D: the modern writer sees a child's independence as frightening, while the Victorian writer sees it as
// healthy and natural.

const LINES = [
  '**Source A (a newspaper column, today):** Every parent knows that sinking feeling. My daughter is twelve, the school is a mile away, and the first morning she walked there alone I checked my phone eleven times.',
  '**Source B (a magazine article, 1885):** Let the boys and girls roam the fields and lanes from breakfast until dusk. They come home scratched and muddy, it is true, but with sharper eyes and stouter hearts than any schoolroom could give them.',
];

export default englishExam({
  lesson: 'ex-1-3',
  ...ours('a GCSE English Language exam', 'both sources were written by Gradileo'),
  title: 'How Do These Writers’ Views on Children’s Freedom Differ?',
  thumbnailTitle: 'Comparing Viewpoints',
  subtitle: 'Viewpoints and methods, step by step',
  summary:
    'An exam-style question on comparing viewpoints, solved one small step at a time. A modern parent and a Victorian writer both write about children going out alone. We find each writer’s attitude, look at how they show it, and choose the best comparison.',
  intro: [
    'In this video, we solve an exam-style question about comparing writers’ viewpoints. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and both sources ourselves, in the style of a GCSE English Language exam.',
  ],
  passage: {
    lines: LINES,
    by: 'Two sources written by Gradileo',
    say: [
      'First, read Source A, a newspaper column written today. Every parent knows that sinking feeling. My daughter is twelve, the school is a mile away, and the first morning she walked there alone I checked my phone eleven times.',
      'Now Source B, a magazine article from eighteen eighty-five. Let the boys and girls roam the fields and lanes from breakfast until dusk. They come home scratched and muddy, it is true, but with sharper eyes and stouter hearts than any schoolroom could give them.',
    ],
  },
  question: {
    prompt: 'Which statement best **compares** the writers’ viewpoints on children going out alone?',
    text: 'Read both sources. Which statement best compares the writers’ viewpoints on children going out alone?',
    choices: [
      'Both writers think children should never go out alone.',
      'Writer A is angry with the school, while Writer B is angry with parents.',
      'Both writers mainly care about children’s schoolwork.',
      'Writer A sees a child’s independence as frightening, while Writer B sees it as healthy and good for character.',
    ],
    answer: 3,
    working: 'A: *sinking feeling*, *checked my phone eleven times* = **anxiety**; B: *Let… roam*, *stouter hearts* = **approval**.',
    say: [
      'Which statement best compares the writers’ viewpoints on children going out alone?',
      'A: Both writers think children should never go out alone. B: Writer A is angry with the school, while Writer B is angry with parents. C: Both writers mainly care about children’s schoolwork. D: Writer A sees a child’s independence as frightening, while Writer B sees it as healthy and good for character.',
    ],
  },
  ask: [
    ['Two writers, **one topic**', 'Two writers, one topic: children going out alone.'],
    ['How do their **views** differ?', 'We need the best comparison of their viewpoints.'],
  ],
  know: {
    title: 'Comparing viewpoints and methods',
    md: 'A writer’s **viewpoint** is their attitude to the topic: for, against, worried, delighted. Find it from **word choice**, **tone** and **examples**. Then compare the **methods** they use to convey it: **anecdote** (a personal story), **statistics**, **imperatives** (*Let…*), **generalisations** that draw the reader in (*Every parent knows…*), **contrast**. Always compare **both** writers in each point.',
    say: [
      'Here is the idea we need. A writer’s viewpoint is their attitude to the topic: for, against, worried or delighted. Find it from word choice, tone and examples.',
      'Then compare the methods they use to convey it, such as an anecdote, a personal story; statistics; imperatives, like let; generalisations that draw the reader in, like every parent knows; and contrast. Always compare both writers in each point.',
    ],
  },
  plan: [
    ['Find **Writer A’s** attitude', 'Here is the plan. First, find Writer A’s attitude.'],
    ['Find **Writer B’s** attitude', 'Second, find Writer B’s attitude.'],
    ['**Compare** them', 'Third, compare them.'],
  ],
  steps: [
    scene('Step 1: Each attitude', [table('t', ['Writer A', 'Writer B'], [['*that **sinking feeling***', '*Let the boys and girls **roam***'], ['*checked my phone **eleven times***', '*sharper eyes and **stouter hearts***'], ['→ **anxious**, afraid', '→ **approving**, confident']])], [
      { say: 'Step one. Writer A: that sinking feeling, and checking the phone eleven times. That shows anxiety, even fear.', show: ['t.0', 't.1'] },
      { say: 'Writer B: let them roam, and they come home with sharper eyes and stouter hearts. That shows approval and confidence.', show: 't.2', focus: 't.2' },
    ]),
    scene('Step 2: The comparison', [quote('p', ['Every parent knows that [[bad:sinking feeling]].', 'Let the boys and girls [[good:roam]] the fields and lanes…']), text('a', 'A: **frightening** · B: **healthy** → **D**', 'lg')], [
      { say: 'Step two. Writer A sees a child’s independence as frightening. Writer B sees it as healthy, good for a child’s character.', show: 'p' },
      { say: 'Choice D compares the two viewpoints. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['B even admits the **risk**: *scratched and muddy, it is true*', 'Let us check. Writer B even admits the risk: scratched and muddy, it is true.'],
    ['but decides it is **worth** it', 'But decides it is worth it. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Writer A **lets** her daughter go; Writer B **encourages** it', 'Choice A is the trap. Writer A is worried, but she still lets her daughter go, and Writer B encourages it.'],
      ['B', 'Neither writer is **angry**', 'Choice B: neither writer is angry.'],
      ['C', 'Writer B values **fields** over the **schoolroom**', 'Choice C: Writer B values the fields over the schoolroom.'],
    ],
  },
  yourTurn: {
    prompt: 'Writer A begins *“Every parent knows that sinking feeling.”* Which method is this?',
    choices: ['a statistic', 'a quotation from an expert', 'a generalisation that draws the reader in', 'a rhetorical question'],
    answer: 2,
    working: '*Every parent knows* = a **generalisation** that makes readers **agree**.',
    ask: 'Writer A begins: Every parent knows that sinking feeling. Which method is this? A: a statistic. B: a quotation from an expert. C: a generalisation that draws the reader in. D: a rhetorical question.',
    reveal: 'The answer is C. Every parent knows is a generalisation that invites readers to share the feeling.',
  },
  sum: [
    ['Find each writer’s **attitude**', 'Here is what to remember. Find each writer’s attitude.'],
    ['Compare the **methods** that convey it', 'Compare the methods that convey it.'],
    ['Write about **both** writers in each point', 'And write about both writers in each point. For more on comparing viewpoints and methods, watch this lesson’s explainer video on Gradileo.'],
  ],
});
