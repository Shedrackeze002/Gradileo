import { englishExam, quote, scene, text, bullets } from '../english.ts';

// Grade 5 English, lesson 1.3 (problem, events and solution). An exam-style question we wrote, in
// the style of the key stage 2 English reading test, on a short passage we wrote. The answer is D:
// the kite is stuck in the tree (problem) and Grandpa's fishing rod frees it (solution).

const PASSAGE = [
  'A gust snatched Ana’s kite and dropped it into the top of the old oak. She tugged the string, but the branches only held it tighter.',
  'She tried climbing, but the lowest branch was far above her head. She threw her shoe, and that got stuck too.',
  'Then Grandpa came out with his long fishing rod. With one gentle flick, he hooked the string and lifted the kite free. The shoe followed, landing on his hat.',
];

export default englishExam({
  lesson: 'e5-1-3',
  source: 'Exam-style question written by Gradileo, in the style of the key stage 2 English reading test',
  licence: 'Question and passage by Gradileo',
  verbatim: false,
  title: 'How Is the Problem in the Story Solved?',
  thumbnailTitle: 'Problem and Solution',
  subtitle: 'Following the plot, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: Ana’s kite is stuck in an oak tree, and she tries one thing after another. We find the problem, follow the events in order, and pick out the action that finally solves it.',
  intro: [
    'In this video, we solve an exam-style reading question about the plot of a story. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its story ourselves, in the style of the reading test that eleven-year-olds take in England.',
  ],
  passage: {
    lines: PASSAGE,
    by: 'A passage written for Gradileo',
    say: [
      'First, read the passage. A gust snatched Ana’s kite and dropped it into the top of the old oak. She tugged the string, but the branches only held it tighter.',
      'She tried climbing, but the lowest branch was far above her head. She threw her shoe, and that got stuck too.',
      'Then Grandpa came out with his long fishing rod. With one gentle flick, he hooked the string and lifted the kite free. The shoe followed, landing on his hat.',
    ],
  },
  question: {
    prompt: 'How is Ana’s problem solved?',
    text: 'Read the passage about Ana’s kite. How is Ana’s problem solved?',
    choices: ['Ana pulls the string until the kite comes down.', 'Ana climbs to the top of the tree.', 'Ana knocks the kite down with her shoe.', 'Grandpa frees the kite with his fishing rod.'],
    answer: 3,
    working: 'Ana’s three tries all fail; Grandpa’s rod hooks the string and lifts the kite free.',
    say: [
      'How is Ana’s problem solved?',
      'A: Ana pulls the string until the kite comes down. B: Ana climbs to the top of the tree. C: Ana knocks the kite down with her shoe. D: Grandpa frees the kite with his fishing rod.',
    ],
  },
  ask: [
    ['What is Ana’s **problem**?', 'To answer, we first need to know what Ana’s problem is.'],
    ['Which event **solves** it?', 'Then we need the event that actually solves it. Not one that was tried, but the one that works.'],
  ],
  know: {
    title: 'Problem, events and solution',
    md: 'Most stories have a **problem** at the start, **events** in the middle as the characters try to fix it, and a **solution** at the end, when the problem is finally solved.',
    say: [
      'Here is the idea we need. Most stories begin with a problem, something that goes wrong or that a character wants.',
      'In the middle come the events, as the characters try to fix it. Often the first tries fail. At the end comes the solution, when the problem is finally solved.',
    ],
  },
  plan: [
    ['Find the **problem**', 'Here is the plan. First, find the problem.'],
    ['List the **tries**, in order', 'Second, list everything that is tried, in order.'],
    ['Find the try that **works**', 'Third, find the try that works. That is the solution.'],
  ],
  steps: [
    scene('Step 1: The problem', [quote('p', PASSAGE.slice(0, 1)), text('n', 'Problem: the kite is **stuck** at the top of the oak.')], [
      { say: 'Step one. What goes wrong? A gust drops Ana’s kite into the top of the old oak.', show: 'p' },
      { say: 'So the problem is that the kite is stuck in the tree.', show: 'n' },
    ]),
    scene('Step 2: The tries, in order', [bullets('t', ['1. Tugs the string → [[bad:held tighter]]', '2. Tries to climb → [[bad:branch too high]]', '3. Throws her shoe → [[bad:shoe stuck too]]', '4. Grandpa’s fishing rod → [[good:kite lifted free]]'])], [
      { say: 'Step two. Now let us list the tries, in order. Pause and try to list them yourself.', wait: 3 },
      { say: 'First, Ana tugs the string. But the branches only hold the kite tighter.', show: 't.0' },
      { say: 'Second, she tries to climb. But the lowest branch is too high.', show: 't.1' },
      { say: 'Third, she throws her shoe, and now the shoe is stuck too. Things are getting worse.', show: 't.2' },
      { say: 'Fourth, Grandpa comes out with his fishing rod, hooks the string and lifts the kite free. This one works.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 3: The answer', [text('ans', '**D.** Grandpa frees the kite with his fishing rod.', 'lg')], [
      { say: 'Step three. Only the fishing rod solves the problem. So the answer is D: Grandpa frees the kite with his fishing rod.', show: 'ans' },
    ]),
  ],
  check: [
    ['After the rod, the kite is **free**', 'Let us check. After Grandpa’s flick, the kite is free, so the problem is over.'],
    ['Even the shoe comes down', 'Even the shoe comes down, landing on his hat. Nothing is left stuck, so D is the solution.'],
  ],
  traps: {
    say: 'Each wrong answer is something that really happens in the story, which is what makes this question tricky.',
    rows: [
      ['A', 'Ana **tries** this, but it fails', 'Ana does tug the string, but it makes things worse. A try is not a solution.'],
      ['B', 'She **cannot** climb high enough', 'Ana tries to climb, but she cannot reach the first branch, let alone the top.'],
      ['C', 'The shoe gets **stuck** too', 'The shoe does not knock the kite down. It gets stuck as well.'],
    ],
  },
  yourTurn: {
    prompt: 'Omar’s dog would not come out from under the bed. Omar called her, then shook her lead, but she stayed put. At last he opened a bag of treats, and she came running. How is Omar’s problem solved?',
    choices: ['He calls the dog’s name.', 'He shakes the lead.', 'He opens a bag of treats.', 'He moves the bed.'],
    answer: 2,
    working: 'Calling and the lead fail; the treats make the dog come running.',
    ask: 'Omar’s dog would not come out from under the bed. He called her, then shook her lead, but she stayed put. At last he opened a bag of treats, and she came running. How is the problem solved?',
    reveal: 'The answer is C. Calling and shaking the lead were tries that failed. Opening the treats is what made the dog come running.',
  },
  sum: [
    ['A story starts with a **problem**', 'Here is what to remember. A story often starts with a problem.'],
    ['The **events** are tries, and many of them fail', 'The events in the middle are tries to fix it, and many of them fail.'],
    ['The **solution** is the event that finally works', 'The solution is the event that finally works, so check what happens after each try. For more on problem and solution, watch this lesson’s explainer video on Gradileo.'],
  ],
});
