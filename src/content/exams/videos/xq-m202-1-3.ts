import type { Explainer } from '@/video/script.ts';

// Exam question for Math 20-2 lesson 1.3 (deductive reasoning and proof). Gradileo wrote this one,
// in the style of a Grade 11 reasoning unit test, since the free question banks have no algebraic
// proof at this level: with three consecutive integers n, n + 1 and n + 2, the sum is
// 3n + 3 = 3(n + 1), which is three times the middle integer.

const QUESTION = 'Use deductive reasoning to prove that the sum of any three consecutive integers is equal to three times the middle integer.';

const video: Explainer = {
  id: 'xq-m202-1-3',
  lessonId: '',
  exam: {
    lesson: 'm202-1-3',
    source: 'Exam-style question written by Gradileo, in the style of a Grade 11 reasoning unit test',
    licence: 'Written by Gradileo',
    question: QUESTION,
  },
  title: 'Exam Question: Prove the Sum of Three Consecutive Integers Is 3 Times the Middle (Deductive Proof)',
  thumbnailTitle: 'Prove It for Every Number',
  thumbnail: 'm',
  summary:
    'An exam-style question, solved one small step at a time: prove that the sum of any three consecutive integers is three times the middle integer. We try a few examples first, then call the integers n, n + 1 and n + 2, add them to get 3n + 3, and factor it as 3(n + 1), which is three times the middle integer. Then we check the proof with numbers and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Prove It for Every Number', subtitle: 'Deductive reasoning, step by step' }],
      lines: [
        { say: 'In this video, we solve an exam-style question about deductive reasoning and proof. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'Gradileo wrote this question in the style of a Grade 11 reasoning unit test. It says so at the bottom of the screen the whole way through.' },
      ],
    },
    {
      chapter: 'The question',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          kicker: 'The question',
          prompt: QUESTION,
          answer: '$n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)$',
          working: 'The middle integer is $n + 1$, so the sum is three times the middle integer.',
        },
      ],
      lines: [
        { say: 'Here is the question.', show: 'q' },
        { say: 'Use deductive reasoning to prove that the sum of any three consecutive integers is equal to three times the middle integer.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ex', size: 'md', lines: ['4 + 5 + 6 = 15 = 3 \\times 5', '(-2) + (-1) + 0 = -3 = 3 \\times (-1)'] },
        { kind: 'text', id: 't', size: 'md', md: 'Examples suggest it is true. A **proof** must show it for **every** set of three consecutive integers.' },
      ],
      lines: [
        { say: 'Let us try it first. 4 plus 5 plus 6 is 15, and that is 3 times 5, the middle number.', show: 'ex.0' },
        { say: 'Negative 2, negative 1 and 0 add to negative 3, which is 3 times negative 1, the middle number again.', show: 'ex.1' },
        { say: 'So the examples suggest it is true. But that is inductive reasoning. The question asks us to prove it for every set of three consecutive integers, and no list of examples can cover them all.', show: 't' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'ded', tone: 'definition', title: 'Deductive reasoning', md: 'Start from facts that are **known to be true** and use logic to reach a conclusion that **must** be true.' },
        { kind: 'callout', id: 'con', tone: 'key', title: 'Consecutive integers', md: 'Integers that follow each other, each $1$ more than the last: $n$, $n + 1$, $n + 2$.' },
      ],
      lines: [
        { say: 'Here is what we need. Deductive reasoning starts from facts we know are true, and uses logic to reach a conclusion that must be true.', show: 'ded' },
        { say: 'And consecutive integers follow each other, each one 1 more than the last. If we call the first one n, the next two are n plus 1 and n plus 2.', show: 'con' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Name the integers with a **variable**', '**Add** them and simplify', '**Factor**, and compare with the middle integer'] }],
      lines: [
        { say: 'Here is the plan. First, name the three integers with a variable, so they stand for every possible case.', show: 'plan.0' },
        { say: 'Second, add them and simplify.', show: 'plan.1' },
        { say: 'Third, factor the sum, and compare it with the middle integer.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Name the integers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Let the integers be } n, \\ n + 1, \\ n + 2', '\\text{middle integer: } \\good{n + 1}'] }],
      lines: [
        { say: 'Step one. Let the three consecutive integers be n, n plus 1, and n plus 2, where n is any integer.', show: 'm.0' },
        { say: 'The middle integer is n plus 1. Keep an eye on it.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Add them',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n + (n + 1) + (n + 2)', '= n + n + n + 1 + 2', '= 3n + 3'] }],
      lines: [
        { say: 'Step two. Add the three integers: n, plus n plus 1, plus n plus 2.', show: 'm.0' },
        { say: 'Group the n terms and the numbers: n plus n plus n, plus 1 plus 2.', show: 'm.1' },
        { say: 'That simplifies to 3 n plus 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Factor and compare',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3n + 3 = 3(n + 1)', '= 3 \\times (\\good{\\text{middle integer}})'] }],
      lines: [
        { say: 'Step three. Take out the common factor 3: 3 n plus 3 is 3 times, n plus 1.', show: 'm.0' },
        { say: 'And n plus 1 is the middle integer. So the sum is 3 times the middle integer.', show: 'm.1', focus: 'm.1' },
        { say: 'Because n can be any integer, this is true for every set of three consecutive integers. That completes the proof.' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['n = 4: \\ 3(4 + 1) = 15', '4 + 5 + 6 = 15 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check the algebra with our first example. When n is 4, 3 times, 4 plus 1, is 15.', show: 'm.0' },
        { say: 'And 4 plus 5 plus 6 is 15. They match, so the algebra is right.', show: 'm.1' },
      ],
    },
    {
      chapter: 'The traps',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'traps',
          head: ['Trap', 'What goes wrong'],
          rows: [
            ['only giving **examples**', 'that is inductive: it does not cover **every** case'],
            ['$n$, $m$ and $p$', 'they are not **consecutive**: use $n$, $n + 1$, $n + 2$'],
            ['stopping at $3n + 3$', '**factor** it to link it to the middle integer'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Giving a few examples is not a proof. That is inductive reasoning, and it never covers every case.' },
        { say: 'Using three different letters loses the key fact that the integers are consecutive. Write them as n, n plus 1, and n plus 2.' },
        { say: 'And do not stop at 3 n plus 3. Factor it, so you can see the middle integer and say what you have proved.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Which line proves that the sum of any two consecutive integers is odd?',
          choices: ['$n + (n + 1) = 2n + 1$', '$n + n = 2n$', '$1 + 2 = 3$', '$n + (n + 2) = 2n + 2$'],
          answer: 0,
          working: '$2n$ is always even, so $2n + 1$ is always odd.',
        },
      ],
      lines: [
        { say: 'Your turn. Which line proves that the sum of any two consecutive integers is odd? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'Two consecutive integers are n and n plus 1. Their sum is 2 n plus 1. 2 n is always even, so 2 n plus 1 is always odd: choice A. Choice C is only one example, and B and D do not use consecutive integers.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Examples **suggest**; a proof **shows** it for every case', 'Name the numbers with a **variable**', 'Consecutive: $n$, $n + 1$, $n + 2$', 'Simplify and **factor** to reach the statement'] }],
      lines: [
        { say: 'Here is what to remember. Examples suggest a statement is true, but a proof shows it for every case.', show: 'sum.0' },
        { say: 'Name the numbers with a variable.', show: 'sum.1' },
        { say: 'Consecutive integers are n, n plus 1, and n plus 2.', show: 'sum.2' },
        { say: 'And simplify and factor until you reach the statement you want to prove. For more on deductive reasoning, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
