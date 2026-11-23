import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 1.1 (plot and conflict). An exam-style question we wrote, in the style of
// a Grade 6 reading test, on a passage we wrote. The answer is C, character against nature: Kofi
// struggles against the storm and the rising river, not against another person.

const PASSAGE = [
  'The rain had not stopped for three days. By the time Kofi reached the footbridge, the river was roaring over the planks, brown and furious.',
  'He gripped the rope rail as the water tugged at his boots. Halfway across, a plank cracked beneath him. The wind howled, the far bank seemed to slide further away, and the river pulled harder, as if it wanted him.',
];

export default englishExam({
  lesson: 'e6-1-1',
  ...ours('a Grade 6 reading test', 'the passage is by Gradileo'),
  title: 'What Kind of Conflict Does Kofi Face?',
  thumbnailTitle: 'Types of Conflict',
  subtitle: 'Plot and conflict, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Kofi tries to cross a flooded footbridge in a storm, so what kind of conflict is he facing? We find what stands in his way, learn the four main types of conflict, and match the passage to one.',
  intro: [
    'In this video, we solve an exam-style reading question about conflict in a story. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. The rain had not stopped for three days. By the time Kofi reached the footbridge, the river was roaring over the planks, brown and furious.',
      'He gripped the rope rail as the water tugged at his boots. Halfway across, a plank cracked beneath him. The wind howled, the far bank seemed to slide further away, and the river pulled harder, as if it wanted him.',
    ],
  },
  question: {
    prompt: 'What is the main conflict in this passage?',
    text: 'Read the passage about Kofi. What is the main conflict in this passage?',
    choices: ['character against character', 'character against self', 'character against nature', 'character against society'],
    answer: 2,
    working: 'What stands in Kofi’s way is the storm and the flooded river: forces of nature.',
    say: ['What is the main conflict in this passage? A: character against character. B: character against self. C: character against nature. D: character against society.'],
  },
  ask: [
    ['A **conflict** is a struggle', 'A conflict in a story is a struggle between a character and something that stands in their way.'],
    ['**What** is Kofi struggling against?', 'So the question is really: what is Kofi struggling against?'],
  ],
  know: {
    title: 'Types of conflict',
    md: '**Character against character**: another person. **Character against self**: fears or doubts inside. **Character against nature**: storms, animals, wild places. **Character against society**: unfair rules or the crowd.',
    say: [
      'Here is the idea we need. Every plot is driven by a conflict, and there are four main types.',
      'Character against character is a struggle with another person. Character against self is a struggle with your own fears or doubts.',
      'Character against nature is a struggle with storms, animals or wild places. And character against society is a struggle with unfair rules, or with what everyone else thinks.',
    ],
  },
  plan: [
    ['Find **what stands in Kofi’s way**', 'Here is the plan. First, find what stands in Kofi’s way.'],
    ['Decide which **type** that is', 'Second, decide which type of conflict that is.'],
  ],
  steps: [
    scene('Step 1: What stands in his way?', [quote('p', PASSAGE), table('t', ['Obstacle', 'Comes from'], [['rain for three days', 'weather'], ['the river **roaring**, **furious**, **pulling**', 'the river'], ['the **cracked** plank', 'the flood'], ['the wind **howled**', 'weather']])], [
      { say: 'Step one. Pause and find everything that makes the crossing hard.', show: 'p', wait: 3 },
      { say: 'Three days of rain.', show: 't.0' },
      { say: 'The river roars over the planks and pulls at his boots. The writer even makes it sound alive: furious, and pulling as if it wanted him.', show: 't.1', focus: 'p.1' },
      { say: 'A plank cracks under him, and the wind howls.', show: ['t.2', 't.3'] },
    ]),
    scene('Step 2: Which type?', [text('n', 'Rain, river, wind → **nature** · no other person, no inner doubt, no rules', 'lg'), text('ans', '**C. Character against nature**')], [
      { say: 'Step two. Every obstacle comes from the weather and the river. There is no other person, Kofi is not fighting his own doubts, and no rules stop him.', show: 'n' },
      { say: 'So Kofi is struggling against nature. The answer is C.', show: 'ans' },
    ]),
  ],
  check: [
    ['Remove the **storm**, and the conflict **disappears**', 'Let us check with a test. Take away the storm and the flood, and Kofi simply walks across. The conflict disappears, so nature is the source.'],
    ['No **person** or **rule** stands in his way', 'Nobody and no rule stands in his way. So C holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'The river **seems alive**, but it is not a **character**', 'Choice A is tempting because the writer makes the river sound alive: furious, wanting him. That is personification. The river is still nature.'],
      ['B', 'Kofi may feel **afraid**, but the passage shows an **outside** danger', 'Kofi might well be afraid, but the passage is about the danger outside him, not a struggle with his own feelings.'],
      ['D', 'No **rules** or **crowd** in the passage', 'Nothing in the passage is about rules or other people’s opinions.'],
    ],
  },
  yourTurn: {
    prompt: '*Maya stared at the diving board. Everyone else had jumped, but her legs would not move. “You can do this,” she whispered, as her heart pounded.* What is the main conflict?',
    choices: ['character against self', 'character against nature', 'character against character', 'character against society'],
    answer: 0,
    working: 'Maya’s struggle is with her own fear.',
    ask: 'Maya stared at the diving board. Everyone else had jumped, but her legs would not move. “You can do this,” she whispered, as her heart pounded. What is the main conflict?',
    reveal: 'The answer is A, character against self. Nothing outside stops Maya. Her struggle is with her own fear.',
  },
  sum: [
    ['A **conflict** is a struggle that drives the plot', 'Here is what to remember. A conflict is a struggle that drives the plot.'],
    ['Four types: against **character**, **self**, **nature**, **society**', 'There are four types: against another character, against self, against nature and against society.'],
    ['Ask: **what stands in the way?**', 'To name it, ask what stands in the character’s way. For more on plot and conflict, watch this lesson’s explainer video on Gradileo.'],
  ],
});
