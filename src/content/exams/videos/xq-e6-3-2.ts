import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 6 English, lesson 3.2 (text structure). An exam-style question we wrote, in the style of a
// Grade 6 reading test, on a passage we wrote. The answer is D, problem and solution: traffic
// outside the school is the problem, and the walking bus is the solution.

const PASSAGE = [
  'Every morning, the road outside Hillside School was jammed with cars. Engines idled, horns honked, and crossing the road had become dangerous for younger pupils.',
  'To fix this, parents set up a “walking bus”. Children now meet at three points around town and walk to school together in a line, with an adult at the front and back.',
  'Within a month, there were half as many cars at the gate, and the crossing was safe again.',
];

export default englishExam({
  lesson: 'e6-3-2',
  ...ours('a Grade 6 reading test', 'the passage is by Gradileo'),
  title: 'How Is the Passage About the Walking Bus Organized?',
  thumbnailTitle: 'Problem and Solution',
  subtitle: 'Text structure, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a passage about traffic outside a school and a “walking bus”. We trace what each paragraph does, spot the signal words, and decide which text structure organizes the whole passage.',
  intro: [
    'In this video, we solve an exam-style reading question about text structure. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its passage ourselves, in the style of a Grade 6 reading test.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. Every morning, the road outside Hillside School was jammed with cars. Engines idled, horns honked, and crossing the road had become dangerous for younger pupils.',
      'To fix this, parents set up a walking bus. Children now meet at three points around town and walk to school together in a line, with an adult at the front and back.',
      'Within a month, there were half as many cars at the gate, and the crossing was safe again.',
    ],
  },
  question: {
    prompt: 'Which text structure does the author use to organize this passage?',
    text: 'Read the passage about Hillside School. Which text structure does the author use to organize this passage?',
    choices: ['description', 'sequence', 'compare and contrast', 'problem and solution'],
    answer: 3,
    working: 'Paragraph 1 is a problem (dangerous traffic); paragraph 2 is a solution (the walking bus); paragraph 3 shows it worked.',
    say: ['Which text structure does the author use to organize this passage? A: description. B: sequence. C: compare and contrast. D: problem and solution.'],
  },
  ask: [
    ['How is the **whole** passage organized?', 'The question asks how the whole passage is organized, from start to finish.'],
    ['Look at the **job** of each paragraph', 'So we need to look at the job each paragraph does.'],
  ],
  know: {
    title: 'Five text structures',
    md: '**Description**: features of one thing. **Sequence**: events or steps in order. **Compare and contrast**: likenesses and differences. **Cause and effect**: why something happened. **Problem and solution**: a problem, then how it is solved. Signal words: *problem*, *to fix this*, *solved*.',
    say: [
      'Here is what we need. Description lists the features of one thing. Sequence gives events or steps in order. Compare and contrast shows likenesses and differences.',
      'Cause and effect explains why something happened. And problem and solution sets out a problem, then how it was solved, with signal words like problem, to fix this, and solved.',
    ],
  },
  plan: [
    ['Name each paragraph’s **job**', 'Here is the plan. First, name the job of each paragraph.'],
    ['Find the **signal words**', 'Second, find the signal words.'],
    ['Match the **pattern** to a structure', 'Third, match the pattern to a structure.'],
  ],
  steps: [
    scene('Step 1: Each paragraph’s job', [table('t', ['Paragraph', 'Job'], [['1: jammed road, **dangerous** crossing', '[[bad:a problem]]'], ['2: **To fix this**, a walking bus', '[[good:a solution]]'], ['3: half as many cars, **safe again**', 'the solution **works**']])], [
      { say: 'Step one. Pause and name the job of each paragraph.', wait: 3 },
      { say: 'Paragraph 1 describes jammed roads and a dangerous crossing. That is a problem.', show: 't.0' },
      { say: 'Paragraph 2 begins with to fix this, and describes the walking bus. That is a solution.', show: 't.1' },
      { say: 'Paragraph 3 shows the result: the solution worked.', show: 't.2' },
    ]),
    scene('Step 2: Signal words and the answer', [quote('p', ['…crossing the road had become [[theta:dangerous]]…', '[[theta:To fix this]], parents set up a “walking bus”.', '…the crossing was [[theta:safe again]].']), text('a', 'Problem → solution → it worked: **D, problem and solution**.')], [
      { say: 'Step two. The signal words confirm it: dangerous sets up the problem, to fix this introduces the solution, and safe again shows the problem is solved.', show: 'p' },
      { say: 'So the passage is organized by problem and solution. The answer is D.', show: 'a' },
    ]),
  ],
  check: [
    ['The passage **opens** with a problem and **ends** with it solved', 'Let us check. The passage opens with a problem and ends with it solved. That shape is problem and solution.'],
    ['Other structures may appear in **parts**, but this one organizes the **whole**', 'Other structures can appear in small parts, but this one organizes the whole passage.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['B', 'Paragraph 2 has **steps** (meet, walk), but that is only **part**', 'Choice B is the main trap. Paragraph 2 describes steps, meeting and walking, and paragraph 3 says within a month. But that is one part; the whole passage moves from problem to solution.'],
      ['C', 'Before and after are **contrasted**, but only as a result', 'Choice C: the traffic before and after is different, but that only shows the solution worked.'],
      ['A', 'There is description, but it **serves** the problem', 'Choice A: there is some description of the traffic, but it is there to show the problem.'],
    ],
  },
  yourTurn: {
    prompt: '*First, rinse the rice. Next, add two cups of water. Then bring it to the boil, and finally simmer it for fifteen minutes.* Which text structure is used?',
    choices: ['problem and solution', 'sequence', 'cause and effect', 'compare and contrast'],
    answer: 1,
    working: 'Signal words **first**, **next**, **then**, **finally**: steps in order.',
    ask: 'First, rinse the rice. Next, add two cups of water. Then bring it to the boil, and finally simmer it for fifteen minutes. Which text structure is used?',
    reveal: 'The answer is B, sequence. The signal words first, next, then and finally put the steps in order.',
  },
  sum: [
    ['Text structure is how the **whole** text is organized', 'Here is what to remember. Text structure is how the whole text is organized.'],
    ['Name each **paragraph’s job**, then find the **signal words**', 'Name the job of each paragraph, then find the signal words.'],
    ['Problem and solution: a problem, a fix, a result', 'Problem and solution moves from a problem, to a fix, to a result. For more on text structure, watch this lesson’s explainer video on Gradileo.'],
  ],
});
