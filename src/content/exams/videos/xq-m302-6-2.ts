import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-2 lesson 6.2 (solving exponential equations). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 6.6, Exponential and
// Logarithmic Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it. 1/4 = 2^(−2),
// so the left side is 2^(−3n − 2); setting −3n − 2 = n + 2 gives n = −1, as in the book's answer.
// The graphs of both sides meet at (−1, 2).

const QUESTION = 'Use like bases to solve the exponential equation. 2^(−3n) · 1/4 = 2^(n+2)';

const g = plane({ x: [-2.6, 1.6], y: [-1, 9], xStep: 0.5, yStep: 1, every: 2, width: 11, height: 8, xName: 'n', xTex: (x) => (Number.isInteger(x) ? `${x}` : '') });

/** Both sides as functions of n, and where they meet (`p`). */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'l', f: (n) => 2 ** (-3 * n) / 4, from: -1.6, to: 1.6, tone: 'adj', samples: 160, label: 'y = 2^{-3n} \\cdot \\tfrac{1}{4}', labelAt: 0.04, side: 'right' }),
      plot(g, { id: 'r', f: (n) => 2 ** (n + 2), from: -2.6, to: 1.15, tone: 'theta', samples: 160, label: 'y = 2^{n + 2}', labelAt: 0.8, side: 'right' }),
      dots(g, [{ id: 'p', x: -1, y: 2, tex: '(-1, 2)', tone: 'good', place: 'left' }]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m302-6-2',
  lessonId: '',
  exam: {
    lesson: 'm302-6-2',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.6, Exponential and Logarithmic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-6-exponential-and-logarithmic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 2^(−3n) · 1/4 = 2^(n+2) With Like Bases (Solving Exponential Equations)',
  thumbnailTitle: 'Solve With Like Bases',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: use like bases to solve 2^(−3n) · 1/4 = 2^(n+2). We write 1/4 as 2^(−2), add the exponents on the left, and set the exponents equal: −3n − 2 = n + 2, so n = −1. Then we check by substituting and on a graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve With Like Bases', subtitle: 'Solving exponential equations, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about exponential equations. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax College Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Use like bases to solve the exponential equation. $2^{-3n} \\cdot \\dfrac{1}{4} = 2^{n + 2}$',
          answer: '$n = -1$',
          working: '$\\dfrac{1}{4} = 2^{-2}$, so $-3n - 2 = n + 2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use like bases to solve the exponential equation. 2 to the power negative 3 n, times one quarter, equals 2 to the power n plus 2.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The unknown $n$ is **in the exponents**. Write **every** number as a power of $2$, then compare the exponents.' }],
      lines: [
        { say: 'The unknown, n, is up in the exponents.', show: 't' },
        { say: 'Like bases means we write every number as a power of the same base. Here that base is 2. Then we can compare the exponents.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ids', size: 'lg', lines: ['\\dfrac{1}{b^k} = b^{-k}', 'b^m \\cdot b^k = b^{m + k}', 'b^m = b^k \\ \\Rightarrow \\ m = k'] },
      ],
      lines: [
        { say: 'Here is what we need. One over b to the power k is b to the power negative k.', show: 'ids.0' },
        { say: 'When we multiply powers of the same base, we add the exponents.', show: 'ids.1' },
        { say: 'And if two powers of the same base are equal, their exponents are equal.', show: 'ids.2' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $\\dfrac{1}{4}$ as a **power of 2**', '**Add** the exponents on the left', 'Set the **exponents equal** and solve'] }],
      lines: [
        { say: 'Here is the plan. First, write one quarter as a power of 2.', show: 'plan.0' },
        { say: 'Second, add the exponents on the left.', show: 'plan.1' },
        { say: 'Third, set the exponents equal and solve.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Like bases',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{1}{4} = \\dfrac{1}{2^2} = \\good{2^{-2}}', '2^{-3n} \\cdot \\good{2^{-2}} = 2^{n + 2}'] }],
      lines: [
        { say: 'Step one. 4 is 2 squared, so one quarter is 1 over 2 squared, which is 2 to the power negative 2.', show: 'm.0' },
        { say: 'Now every number is a power of 2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Add the exponents',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['2^{\\good{-3n - 2}} = 2^{n + 2}'] }],
      lines: [
        { say: 'Step two. On the left, we multiply two powers of 2, so we add their exponents: negative 3 n plus negative 2, which is negative 3 n minus 2.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['-3n - 2 = n + 2', '-4n = 4', 'n = \\good{-1}'] }],
      lines: [
        { say: 'Step three. The bases match, so the exponents are equal: negative 3 n minus 2 equals n plus 2.', show: 'm.0' },
        { say: 'Subtract n from both sides and add 2: negative 4 n equals 4.', show: 'm.1' },
        { say: 'Divide by negative 4: n equals negative 1.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['2^{3} \\cdot \\tfrac{1}{4} = 2 \\quad \\text{and} \\quad 2^{1} = 2 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put n equals negative 1 in. On the left, negative 3 times negative 1 is 3, so we get 2 cubed times one quarter: 8 over 4, which is 2. On the right, negative 1 plus 2 is 1, and 2 to the power 1 is 2. Both sides are 2.', show: 'm.0' },
        { say: 'And on a graph, here are both sides as curves. The left side falls, and the right side rises.', show: ['gr.grid', 'gr.axes', 'gr.l', 'gr.r'] },
        { say: 'They meet at n equals negative 1, at height 2. It checks out.', show: 'gr.p', focus: 'gr.p' },
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
            ['$\\dfrac{1}{4} = 2^2$', 'one over a power: the exponent is **negative**, $2^{-2}$'],
            ['$2^{(-3n)(-2)} = 2^{6n}$', 'multiplying powers: **add** the exponents'],
            ['$-2n = 4$, $\\ n = -2$', 'take $n$ from **both** sides: $-3n - n = -4n$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'One quarter is not 2 squared. It is 1 over 2 squared, so the exponent is negative 2.' },
        { say: 'When we multiply powers of the same base, we add the exponents. We do not multiply them.' },
        { say: 'And move the n carefully. Negative 3 n minus n is negative 4 n, so n is negative 1, not negative 2.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $3^{x + 1} = 9^{x - 1}$.',
          choices: ['$x = 1$', '$x = -3$', '$x = 2$', '$x = 3$'],
          answer: 3,
          working: '$9^{x - 1} = 3^{2(x - 1)} = 3^{2x - 2}$, so $x + 1 = 2x - 2$ and $x = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 3 to the power x plus 1 equals 9 to the power x minus 1. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: '9 is 3 squared, so the right side is 3 to the power 2 x minus 2. Then x plus 1 equals 2 x minus 2, so x is 3: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write every number as a power of the **same base**', 'One over a power: a **negative** exponent', 'Multiplying powers: **add** the exponents', 'Same base on both sides: set the **exponents equal**'] }],
      lines: [
        { say: 'Here is what to remember. Write every number as a power of the same base.', show: 'sum.0' },
        { say: 'One over a power gives a negative exponent.', show: 'sum.1' },
        { say: 'When you multiply powers of the same base, add the exponents.', show: 'sum.2' },
        { say: 'And with the same base on both sides, set the exponents equal and solve. For more on solving exponential equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
