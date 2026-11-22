import { englishExam, ours, scene, text, table } from '../english.ts';

// Grade 7 English, lesson 3.1 (reading a script). An exam-style question we wrote, in the style of a
// Grade 7 reading test, on a short script we wrote. The answer is C: the stage direction shows that
// Tom is hiding something, though his words say otherwise.

const SCRIPT = [
  '**MUM:** Tom, have you seen my car keys?',
  '**TOM:** *(quickly pushing something into his pocket)* Keys? No. Haven’t seen them.',
  '**MUM:** *(narrowing her eyes)* Really?',
];

export default englishExam({
  lesson: 'e7-3-1',
  ...ours('a Grade 7 reading test', 'the script is by Gradileo'),
  title: 'What Does the Stage Direction Reveal About Tom?',
  thumbnailTitle: 'Reading a Script',
  subtitle: 'Stage directions and dialogue, step by step',
  summary:
    'An exam-style drama question, solved one small step at a time: Mum asks Tom whether he has seen her car keys, and a stage direction tells us what his words do not. We learn the parts of a script, compare what Tom says with what he does, and explain what the stage direction reveals.',
  intro: [
    'In this video, we solve an exam-style question about reading a script. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its short script ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: SCRIPT,
    by: 'A script written for Gradileo',
    say: [
      'First, read the script. Mum: Tom, have you seen my car keys?',
      'Tom, in brackets, quickly pushing something into his pocket: Keys? No. Haven’t seen them. Mum, in brackets, narrowing her eyes: Really?',
    ],
  },
  question: {
    prompt: 'What does the stage direction *(quickly pushing something into his pocket)* reveal?',
    text: 'Read the script. What does the stage direction “quickly pushing something into his pocket” reveal?',
    choices: ['Tom is cold and wants to warm his hands.', 'Tom is helping Mum look for the keys.', 'Tom probably has the keys and is hiding them.', 'Tom has never heard of car keys.'],
    answer: 2,
    working: 'He hides something **quickly** just as he says **“No”**: his actions contradict his words.',
    say: ['What does the stage direction, quickly pushing something into his pocket, reveal? A: Tom is cold and wants to warm his hands. B: Tom is helping Mum look for the keys. C: Tom probably has the keys and is hiding them. D: Tom has never heard of car keys.'],
  },
  ask: [
    ['A **stage direction** tells actors what to **do**', 'A stage direction tells the actors what to do.'],
    ['What does **this** one reveal?', 'We need to work out what this one reveals about Tom.'],
  ],
  know: {
    title: 'The parts of a script',
    md: 'A script has a **cast list**, **scenes**, **dialogue** (each line after the character’s **name**) and **stage directions**, usually in *italics* and *(brackets)*. Stage directions tell actors how to **move** and **speak**, and tell readers what we would **see**.',
    say: [
      'Here is the idea we need. A script has a cast list, scenes, and dialogue, where each line follows the name of the character who speaks it.',
      'It also has stage directions, usually in italics and in brackets. They tell actors how to move and speak, and tell readers what an audience would see.',
    ],
  },
  plan: [
    ['What does Tom **say**?', 'Here is the plan. First, what does Tom say?'],
    ['What does Tom **do**?', 'Second, what does Tom do?'],
    ['What does the **difference** reveal?', 'Third, what does the difference between them reveal?'],
  ],
  steps: [
    scene('Step 1: Words and actions', [table('t', ['', 'Tom'], [['**says**', '“Keys? **No**. Haven’t seen them.”'], ['**does**', '[[bad:**quickly** pushes **something** into his pocket]]'], ['**Mum** does', 'narrows her eyes: **suspicious**']])], [
      { say: 'Step one. Tom says no, he has not seen the keys.', show: 't.0' },
      { say: 'But at that very moment, he quickly pushes something into his pocket. Quickly suggests he does not want it seen.', show: 't.1', focus: 't.1' },
      { say: 'And Mum narrows her eyes. She does not believe him.', show: 't.2' },
    ]),
    scene('Step 2: What it reveals', [text('a', 'His **actions** contradict his **words** → he probably **has the keys**: **C**', 'lg')], [
      { say: 'Step two. His actions contradict his words. He is most likely hiding the keys. The answer is C.', show: 'a' },
    ]),
  ],
  check: [
    ['On stage, the **audience** would **see** him hide it', 'Let us check. On stage, the audience would see Tom hide something, even though Mum asks only about keys.'],
    ['Mum’s **Really?** shows she suspects the same', 'And Mum’s Really? shows she suspects the same thing. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Pocket means **cold** hands only if we ignore **something**', 'Choice A is the trap. Hands in pockets could mean cold, but he pushes something into his pocket.'],
      ['B', 'He says **no**, and does not help', 'Choice B: he does not help at all.'],
      ['D', 'He **knows** what keys are', 'Choice D: he clearly knows what keys are.'],
    ],
  },
  yourTurn: {
    prompt: 'In a script, where would you usually find the **stage directions**?',
    choices: ['in italics, often in brackets', 'only in the cast list', 'in the title', 'after the final line'],
    answer: 0,
    working: 'Stage directions are set apart in **italics** and **(brackets)**.',
    ask: 'In a script, where would you usually find the stage directions? A: in italics, often in brackets. B: only in the cast list. C: in the title. D: after the final line.',
    reveal: 'The answer is A. Stage directions are usually in italics, often in brackets, so actors can tell them apart from the lines they speak.',
  },
  sum: [
    ['Scripts have **dialogue** and **stage directions**', 'Here is what to remember. Scripts have dialogue and stage directions.'],
    ['Stage directions show what we would **see**', 'Stage directions show what we would see on stage.'],
    ['Compare what characters **say** with what they **do**', 'Compare what characters say with what they do. For more on reading a script, watch this lesson’s explainer video on Gradileo.'],
  ],
});
