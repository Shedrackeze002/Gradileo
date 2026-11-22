import { englishExam, ours, quote, scene, text, table } from '../english.ts';

// Grade 10 English, lesson 4.2 (argument and evidence). An exam-style question we wrote, in the style of a
// Grade 10 reading test, on a short editorial of our own; the survey and the town are invented. The
// answer is D: the "However…" sentence answers the counterclaim, so it is the rebuttal.

const ED = ['¹Our town should build a skate park. ²In a survey of 400 local students, 62% said they had nowhere safe to skate. ³Some residents argue that skate parks attract trouble. ⁴However, after the nearby town of Lakeside opened its park, police reported fewer incidents, because young people had a supervised place to go.'];

export default englishExam({
  lesson: 'e10-4-2',
  ...ours('a Grade 10 reading test', 'the editorial, survey and towns are invented'),
  title: 'Which Sentence Is the Rebuttal?',
  thumbnailTitle: 'Claim, Counterclaim, Rebuttal',
  subtitle: 'The parts of an argument, step by step',
  summary:
    'An exam-style question on argument, solved one small step at a time: a short editorial argues that a town should build a skate park. We label each sentence as claim, evidence, counterclaim or rebuttal, and find the rebuttal.',
  intro: [
    'In this video, we solve an exam-style question about the parts of an argument. We will take it one small step at a time, so that every step makes sense.',
    'We wrote this question ourselves, in the style of a Grade 10 reading test, and the editorial, survey and towns are invented.',
  ],
  passage: {
    lines: ED,
    by: 'An editorial (our own; the survey and towns are invented)',
    say: ['First, read the editorial. Sentence one: Our town should build a skate park. Sentence two: In a survey of four hundred local students, sixty-two percent said they had nowhere safe to skate. Sentence three: Some residents argue that skate parks attract trouble. Sentence four: However, after the nearby town of Lakeside opened its park, police reported fewer incidents, because young people had a supervised place to go.'],
  },
  question: {
    prompt: 'Which sentence is the **rebuttal**?',
    text: 'Read the editorial. Which sentence is the rebuttal?',
    choices: ['sentence 1', 'sentence 2', 'sentence 3', 'sentence 4'],
    answer: 3,
    working: 'Sentence 3 is the **counterclaim**; sentence 4 (*However…*) **answers** it: the **rebuttal**.',
    say: ['Which sentence is the rebuttal? A: sentence one. B: sentence two. C: sentence three. D: sentence four.'],
  },
  ask: [
    ['An argument has **parts**', 'An argument has several parts.'],
    ['Which sentence is the **rebuttal**?', 'We need to find the rebuttal.'],
  ],
  know: {
    title: 'The parts of an argument',
    md: '**Claim**: the writer’s **position**. **Reasons** and **evidence** support it (statistics, examples, expert opinion). **Counterclaim**: the **other side’s** view (*Some argue…*). **Rebuttal**: the writer’s **answer** to the counterclaim, often after *however* or *but*. A **fact** can be checked; an **opinion** cannot.',
    say: [
      'Here is the idea we need. The claim is the writer’s position. Reasons and evidence, such as statistics, examples and expert opinion, support it.',
      'A counterclaim is the other side’s view, often starting with some argue. The rebuttal is the writer’s answer to the counterclaim, often after however or but. And remember, a fact can be checked, but an opinion cannot.',
    ],
  },
  plan: [
    ['Label **each** sentence', 'Here is the plan. First, label each sentence.'],
    ['Find the sentence that **answers** the other side', 'Second, find the sentence that answers the other side.'],
  ],
  steps: [
    scene('Step 1: Label each sentence', [table('t', ['Sentence', 'What it does', 'Part'], [['1 *should build a skate park*', 'the writer’s **position**', 'claim'], ['2 *survey… 62%*', 'a **statistic** for the claim', 'evidence'], ['3 *Some residents argue…*', 'the **other side**', 'counterclaim'], ['4 *However… fewer incidents*', '**answers** sentence 3', '[[good:rebuttal]]']])], [
      { say: 'Step one. Sentence one states the writer’s position: the claim.', show: 't.0' },
      { say: 'Sentence two gives a statistic to support it: evidence.', show: 't.1' },
      { say: 'Sentence three, some residents argue, gives the other side’s view: the counterclaim.', show: 't.2' },
      { say: 'Sentence four begins with however, and answers that worry with evidence from Lakeside: the rebuttal.', show: 't.3', focus: 't.3' },
    ]),
    scene('Step 2: The answer', [quote('p', ['[[theta:However]], after… Lakeside opened its park, police reported [[good:fewer incidents]]…']), text('a', 'Sentence 4 is the rebuttal → **D**', 'lg')], [
      { say: 'Step two. Sentence four is the rebuttal. The answer is D.', show: ['p', 'a'] },
    ]),
  ],
  check: [
    ['The rebuttal must **come after** the counterclaim', 'Let us check. A rebuttal must come after the counterclaim it answers.'],
    ['Sentence 4 follows sentence 3 and **answers** it', 'Sentence four follows sentence three and answers it. So D holds.'],
  ],
  traps: {
    say: 'Each wrong answer hides a trap.',
    rows: [
      ['C', 'Sentence 3 **raises** the other side; it does not **answer** it', 'Choice C is the trap. Sentence three raises the other side’s view, but it does not answer it.'],
      ['A', 'Sentence 1 is the **claim**', 'Choice A: sentence one is the claim.'],
      ['B', 'Sentence 2 is **evidence**', 'Choice B: sentence two is evidence.'],
    ],
  },
  yourTurn: {
    prompt: 'Which statement is a **fact**, not an opinion?',
    choices: ['Cats are the best pets.', 'Water boils at 100 °C at sea level.', 'Summer is too hot.', 'Maths is boring.'],
    answer: 1,
    working: 'It can be **checked** and **proved**: a **fact**.',
    ask: 'Which statement is a fact, not an opinion? A: Cats are the best pets. B: Water boils at one hundred degrees Celsius at sea level. C: Summer is too hot. D: Maths is boring.',
    reveal: 'The answer is B. It can be checked and proved, while the others are opinions.',
  },
  sum: [
    ['**Claim**, **evidence**, **counterclaim**, **rebuttal**', 'Here is what to remember. An argument has a claim, evidence, a counterclaim and a rebuttal.'],
    ['The **counterclaim** gives the other side', 'The counterclaim gives the other side.'],
    ['The **rebuttal** answers it, often after *however*', 'And the rebuttal answers it, often after however. For more on argument and evidence, watch this lesson’s explainer video on Gradileo.'],
  ],
});
