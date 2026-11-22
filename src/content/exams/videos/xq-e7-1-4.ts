import { englishExam, ours, quote, scene, table } from '../english.ts';

// Grade 7 English, lesson 1.4 (foreshadowing and flashback). An exam-style question we wrote, in the
// style of a Grade 7 reading test, on a passage we wrote. The answer is B: the creaking rope and the
// worried glance at the frayed knot hint that the rope will break.

const PASSAGE = [
  'Before the climb, Jonah checked his rope. Near one knot, a few threads had worn thin. “It’ll hold,” he told himself, and tied it on anyway.',
  'Halfway up the cliff, the wind picked up. Somewhere above him, the rope creaked.',
];

export default englishExam({
  lesson: 'e7-1-4',
  ...ours('a Grade 7 reading test', 'the passage is by Gradileo'),
  title: 'What Does the Worn Rope Foreshadow?',
  thumbnailTitle: 'Foreshadowing',
  subtitle: 'Hints about what is coming, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: before a climb, Jonah notices his rope is worn and uses it anyway. We learn what foreshadowing is, find the hints the writer plants, and predict what they point to.',
  intro: [
    'In this video, we solve an exam-style reading question about foreshadowing. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 7 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Before the climb, Jonah checked his rope. Near one knot, a few threads had worn thin. It’ll hold, he told himself, and tied it on anyway.',
      'Halfway up the cliff, the wind picked up. Somewhere above him, the rope creaked.',
    ],
  },
  question: {
    prompt: 'What do the details about the rope most likely **foreshadow**?',
    text: 'Read the passage about Jonah. What do the details about the rope most likely foreshadow?',
    choices: ['Jonah will reach the top easily.', 'The rope may fail and put Jonah in danger.', 'Jonah will buy a new rope next week.', 'The wind will stop blowing.'],
    answer: 1,
    working: 'Worn threads, *“It’ll hold,” he told himself*, and a **creak** all hint that the rope will **give way**.',
    say: ['What do the details about the rope most likely foreshadow? A: Jonah will reach the top easily. B: The rope may fail and put Jonah in danger. C: Jonah will buy a new rope next week. D: The wind will stop blowing.'],
  },
  ask: [
    ['**Foreshadowing** hints at what will happen **later**', 'Foreshadowing is a hint about what will happen later in a story.'],
    ['What do the **rope** details hint at?', 'We need to work out what the rope details hint at.'],
  ],
  know: {
    title: 'Foreshadowing and flashback',
    md: '**Foreshadowing** is a **hint** about a later event: a warning, a worrying detail, or a character ignoring a danger. A **flashback** is the opposite: a scene that jumps **back** to an earlier time.',
    say: [
      'Here is the idea we need. Foreshadowing is a hint about something that will happen later. It might be a warning, a worrying detail, or a character ignoring a danger.',
      'A flashback works the other way: it jumps back to show something that happened earlier.',
    ],
  },
  plan: [
    ['Find the **details** that seem worrying', 'Here is the plan. First, find the details that seem worrying.'],
    ['Ask what they **point to**', 'Second, ask what they point to.'],
  ],
  steps: [
    scene('Step 1: The hints', [quote('p', ['Near one knot, a few threads had [[bad:worn thin]]. [[bad:“It’ll hold,” he told himself]], and tied it on [[bad:anyway]].', 'Halfway up the cliff, the [[bad:wind picked up]]. Somewhere above him, the rope [[bad:creaked]].'])], [
      { say: 'Step one. Pause and find the details that make you worried.', show: 'p', wait: 3 },
      { say: 'The rope has worn thin. Jonah has to tell himself it will hold, which shows he is not sure. And he uses it anyway.', focus: 'p.0' },
      { say: 'Then the wind picks up, and the rope creaks. Each detail adds to the worry.', focus: 'p.1' },
    ]),
    scene('Step 2: What they point to', [table('t', ['Choice', 'Fits the hints?'], [['A: reaches the top easily', '[[bad:✗ the hints all warn of trouble]]'], ['B: the rope may fail', '[[good:✓ worn, doubted, creaking]]'], ['C: buys a new rope', '[[bad:✗ not in this story]]'], ['D: the wind stops', '[[bad:✗ it is getting stronger]]']])], [
      { say: 'Step two. Every hint is about the rope being weak. Writers do not usually mention a worn rope for nothing.', show: 't.1', focus: 't.1' },
      { say: 'A ignores the warnings. C goes beyond the story. D is the opposite: the wind is getting stronger. The answer is B.', show: ['t.0', 't.2', 't.3'] },
    ]),
  ],
  check: [
    ['Would the writer mention the **worn threads** if nothing happened?', 'Let us check. Would the writer mention the worn threads if nothing came of them? Probably not.'],
    ['The creak shows the danger is **growing**', 'The creak shows the danger growing. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['A', 'Believing **Jonah’s** words, not the **writer’s** hints', 'Choice A is the trap. Jonah says it will hold, but the writer’s details tell us not to trust him.'],
      ['C', 'A **sensible** idea, but not what the hints point to', 'Choice C sounds sensible, but it is not in the story.'],
      ['D', 'The wind is getting **stronger**', 'Choice D is the opposite of what the passage says.'],
    ],
  },
  yourTurn: {
    prompt: '*Mia stared at the trophy. Suddenly she was eight again, standing at the edge of the pool, too scared to jump.* What technique does the writer use?',
    choices: ['foreshadowing', 'a simile', 'suspense', 'a flashback'],
    answer: 3,
    working: '*Suddenly she was eight again* jumps **back** in time.',
    ask: 'Mia stared at the trophy. Suddenly she was eight again, standing at the edge of the pool, too scared to jump. What technique does the writer use? A: foreshadowing. B: a simile. C: suspense. D: a flashback.',
    reveal: 'The answer is D, a flashback. Suddenly she was eight again takes us back to an earlier time in Mia’s life.',
  },
  sum: [
    ['**Foreshadowing** hints at what is **coming**', 'Here is what to remember. Foreshadowing hints at what is coming.'],
    ['Look for **worrying details** and **ignored warnings**', 'Look for worrying details, and warnings that characters ignore.'],
    ['A **flashback** jumps **back** in time', 'A flashback jumps back to an earlier time. For more on foreshadowing and flashback, watch this lesson’s explainer video on Gradileo.'],
  ],
});
