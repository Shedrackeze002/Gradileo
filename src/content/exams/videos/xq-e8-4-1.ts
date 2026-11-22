import { englishExam, ours, scene, table } from '../english.ts';

// Grade 8 English, lesson 4.1 (building an argument). An exam-style question we wrote, in the style of
// a Grade 8 reading test, on a paragraph we wrote. The answer is B: sentence 3 states the other side's
// view, and sentence 4 answers it.

const PARA = [
  '(1) Our town should build a skate park. (2) Teenagers need safe places to be active, and a survey of local families found most wanted one. (3) Some people argue that a skate park would attract noise and litter. (4) However, a park with bins, opening hours and a youth warden can be cleaner and quieter than the car parks where teenagers skate now.',
];

export default englishExam({
  lesson: 'e8-4-1',
  ...ours('a Grade 8 reading test', 'the paragraph and its survey are invented by Gradileo'),
  title: 'Which Sentences Give and Rebut a Counterargument?',
  thumbnailTitle: 'Counterarguments',
  subtitle: 'Claim, evidence and rebuttal, step by step',
  summary:
    'An exam-style reading question, solved one small step at a time: a paragraph argues for a skate park, and two of its sentences deal with the other side. We label each sentence as claim, evidence, counterargument or rebuttal, and explain how the rebuttal answers the objection.',
  intro: [
    'In this video, we solve an exam-style reading question about building an argument. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question and its paragraph ourselves, in the style of a Grade 8 reading test.',
  ],
  passage: {
    lines: PARA,
    by: 'A paragraph written for Gradileo',
    say: ['First, read the paragraph. One: Our town should build a skate park. Two: Teenagers need safe places to be active, and a survey of local families found most wanted one. Three: Some people argue that a skate park would attract noise and litter. Four: However, a park with bins, opening hours and a youth warden can be cleaner and quieter than the car parks where teenagers skate now.'],
  },
  question: {
    prompt: 'Which sentences **state a counterargument** and then **rebut** it?',
    text: 'Read the paragraph about the skate park. Which sentences state a counterargument and then rebut it?',
    choices: ['sentences 1 and 2', 'sentences 3 and 4', 'sentences 2 and 3', 'sentences 1 and 4'],
    answer: 1,
    working: 'Sentence 3 gives the **other side** (*Some people argue…*); sentence 4 **answers** it (*However…*).',
    say: ['Which sentences state a counterargument and then rebut it? A: sentences one and two. B: sentences three and four. C: sentences two and three. D: sentences one and four.'],
  },
  ask: [
    ['A **counterargument** is the **other side’s** view', 'A counterargument is the other side’s view.'],
    ['A **rebuttal** **answers** it', 'A rebuttal answers it. We need both, in that order.'],
  ],
  know: {
    title: 'The parts of an argument',
    md: '**Claim**: the writer’s position. **Reasons** and **evidence**: why, and the proof. **Warrant**: the link that explains why the evidence supports the claim. **Counterargument**: the other side (*Some people argue…*). **Rebuttal**: the answer to it (*However…*).',
    say: [
      'Here is the idea we need. The claim is the writer’s position. Reasons and evidence explain why, and give proof. The warrant is the link that explains why the evidence supports the claim.',
      'The counterargument is the other side’s view, often introduced with some people argue. And the rebuttal answers it, often with however.',
    ],
  },
  plan: [
    ['**Label** each sentence', 'Here is the plan. First, label each sentence.'],
    ['Find the **other side**, then the **answer**', 'Second, find the other side’s view, and the answer to it.'],
  ],
  steps: [
    scene('Step 1: Label each sentence', [table('t', ['Sentence', 'Job'], [['(1) should build a skate park', '**claim**'], ['(2) need safe places… a survey…', '**reason** and **evidence**'], ['(3) Some people argue… noise and litter', '[[theta:**counterargument**]]'], ['(4) However, … cleaner and quieter', '[[good:**rebuttal**]]']])], [
      { say: 'Step one. Sentence one is the claim: the town should build a skate park.', show: 't.0' },
      { say: 'Sentence two gives a reason, teenagers need safe places, and evidence, a survey.', show: 't.1' },
      { say: 'Sentence three begins some people argue. That is the other side: the counterargument.', show: 't.2', focus: 't.2' },
      { say: 'Sentence four begins however, and answers the worry about noise and litter. That is the rebuttal. The answer is B.', show: 't.3', focus: 't.3' },
    ]),
  ],
  check: [
    ['The rebuttal **answers** the **same** worry', 'Let us check. The rebuttal answers the very same worry, noise and litter, with bins, hours and a warden.'],
    ['It even turns it around: **cleaner** than now', 'It even turns the worry around: the park would be cleaner than what happens now. So B holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Sentence 2 is **evidence** for the claim', 'Choice C is the trap. Sentence two is evidence for the writer’s side, not a rebuttal.'],
      ['A', 'The **claim** and the **evidence**', 'Choice A is the claim and its evidence.'],
      ['D', 'The claim and the rebuttal, but **no** counterargument', 'Choice D skips the counterargument.'],
    ],
  },
  yourTurn: {
    prompt: 'In sentence 2, what is the **warrant** that links the evidence to the claim?',
    choices: ['If most families want a skate park and teens need safe places to be active, the town should provide one.', 'Skate parks are made of concrete.', 'Some people dislike noise.', 'Car parks are big.'],
    answer: 0,
    working: 'The warrant explains **why** the evidence supports the **claim**.',
    ask: 'In sentence two, what is the warrant that links the evidence to the claim? A: If most families want a skate park and teens need safe places to be active, the town should provide one. B: Skate parks are made of concrete. C: Some people dislike noise. D: Car parks are big.',
    reveal: 'The answer is A. The warrant is the unstated link: if the community wants and needs it, the town should provide it.',
  },
  sum: [
    ['**Claim**, **reasons**, **evidence**, **warrant**', 'Here is what to remember. An argument has a claim, reasons, evidence and a warrant.'],
    ['**Counterargument**: the other side’s view', 'A counterargument gives the other side’s view.'],
    ['**Rebuttal**: answer that **same** point', 'A rebuttal answers that same point. For more on building an argument, watch this lesson’s explainer video on Gradileo.'],
  ],
});
