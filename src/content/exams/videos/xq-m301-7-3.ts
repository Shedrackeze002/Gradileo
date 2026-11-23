import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 7.3 (solving exponential equations). The question is an
// exercise from OpenStax College Algebra 2e, word for word (section 6.6, Exponential and Logarithmic
// Equations, CC BY-NC-SA 4.0), with its set's instruction in front of it. 64 = 4³ and 16 = 4², so
// 4^(3 + 3x) = 4², 3 + 3x = 2 and x = −1/3, as in the book's answer. The graph of y = 64·4^(3x)
// meets the line y = 16 at (−1/3, 16).

const g = plane({ x: [-1.25, 0.75], y: [-6, 72], xStep: 0.25, yStep: 8, every: 2, width: 11, height: 8, titles: { x: 'x', y: 'y' }, yTex: (y) => (y === 16 ? '16' : '') });

/** y = 64·4^(3x) (`f`), the line y = 16 (`h`) and where they meet (`p`). */
const graph = (height = 440) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f: (x) => 64 * 4 ** (3 * x), from: -1.25, to: 0.75, tone: 'adj', samples: 160, label: 'y = 64 \\cdot 4^{3x}', labelAt: 0.97, side: 'right' }),
      polyline(g, { id: 'h', points: [[-1.25, 16], [0.75, 16]], tone: 'theta', dashed: true }),
      dots(g, [{ id: 'p', x: -1 / 3, y: 16, tex: '\\left(-\\tfrac{1}{3}, 16\\right)', tone: 'good', place: 'above left' }]),
    ],
    height,
  );

const QUESTION = 'Use like bases to solve the exponential equation. 64 · 4^(3x) = 16';

const video: Explainer = {
  id: 'xq-m301-7-3',
  lessonId: '',
  exam: {
    lesson: 'm301-7-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.6, Exponential and Logarithmic Equations',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-6-exponential-and-logarithmic-equations',
    question: QUESTION,
  },
  title: 'Exam Question: Solve 64 · 4^(3x) = 16 With Like Bases (Solving Exponential Equations)',
  thumbnailTitle: 'Solve 64 · 4^(3x) = 16',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: use like bases to solve 64 · 4^(3x) = 16. We write 64 as 4³ and 16 as 4², add the exponents on the left, and set the exponents equal: 3 + 3x = 2, so x = −1/3. Then we check by substituting and on a graph, and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve 64 · 4^(3x) = 16', subtitle: 'Solving exponential equations, step by step' }],
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
          prompt: 'Use like bases to solve the exponential equation. $64 \\cdot 4^{3x} = 16$',
          answer: '$x = -\\dfrac{1}{3}$',
          working: '$4^3 \\cdot 4^{3x} = 4^2$, so $3 + 3x = 2$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Use like bases to solve the exponential equation. 64 times 4 to the power 3 x equals 16.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'The unknown $x$ is **in the exponent**. "Like bases" means: write **every** number as a power of the **same** base, here $4$.' }],
      lines: [
        { say: 'The unknown, x, is up in the exponent, so we cannot just divide to get it.', show: 't' },
        { say: 'Like bases means we write every number as a power of the same base. 64, 4 and 16 are all powers of 4.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'math', id: 'ids', size: 'lg', lines: ['b^m \\cdot b^n = b^{m + n}', 'b^m = b^n \\ \\Rightarrow \\ m = n'] },
        { kind: 'callout', id: 'pow', tone: 'tip', title: 'Powers of 4', md: '$4^1 = 4$, $\\ 4^2 = 16$, $\\ 4^3 = 64$' },
      ],
      lines: [
        { say: 'Here is what we need. When we multiply powers of the same base, we add the exponents.', show: 'ids.0' },
        { say: 'And if two powers of the same base are equal, their exponents must be equal.', show: 'ids.1' },
        { say: 'And the powers of 4: 4, 16 and 64.', show: 'pow' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Write $64$ and $16$ as **powers of 4**', '**Add** the exponents on the left', 'Set the **exponents equal** and solve'] }],
      lines: [
        { say: 'Here is the plan. First, write 64 and 16 as powers of 4.', show: 'plan.0' },
        { say: 'Second, add the exponents on the left.', show: 'plan.1' },
        { say: 'Third, set the exponents equal and solve.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Like bases',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['64 \\cdot 4^{3x} = 16', '\\good{4^3} \\cdot 4^{3x} = \\good{4^2}'] }],
      lines: [
        { say: 'Step one. Start with 64 times 4 to the power 3 x equals 16.', show: 'm.0' },
        { say: '64 is 4 cubed, and 16 is 4 squared. Now every number is a power of 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Add the exponents',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['4^{\\good{3 + 3x}} = 4^2'] }],
      lines: [
        { say: 'Step two. On the left we multiply two powers of 4, so we add their exponents: 4 to the power 3 plus 3 x, equals 4 squared.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Step 3: Solve',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['3 + 3x = 2', '3x = {-1}', 'x = \\good{-\\dfrac{1}{3}}'] }],
      lines: [
        { say: 'Step three. The bases match, so the exponents are equal: 3 plus 3 x equals 2.', show: 'm.0' },
        { say: 'Subtract 3 from both sides: 3 x equals negative 1.', show: 'm.1' },
        { say: 'Divide by 3: x equals negative one third.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['64 \\cdot 4^{3(-1/3)} = 64 \\cdot 4^{-1} = \\dfrac{64}{4} = 16 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. Put x equals negative one third back in. 3 times negative one third is negative 1, and 4 to the power negative 1 is one quarter. 64 times one quarter is 16. It checks out.', show: 'm.0' },
        { say: 'And on a graph, here is y equals 64 times 4 to the power 3 x. It grows very fast.', show: ['gr.grid', 'gr.axes', 'gr.f'] },
        { say: 'It crosses the line y equals 16 at x equals negative one third.', show: ['gr.h', 'gr.p'], focus: 'gr.p' },
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
            ['$64 \\cdot 4^{3x} = 256^{3x}$', 'only $4^{3x}$ has the exponent: write $64 = 4^3$'],
            ['$3x = 2$', 'the $64$ adds $3$ to the exponent: $3 + 3x = 2$'],
            ['$x = \\dfrac{1}{3}$', '$3x = 2 - 3 = -1$: keep the **minus**'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'You cannot multiply 64 and 4 into one base. The exponent 3 x belongs only to the 4. Write 64 as 4 cubed instead.' },
        { say: 'Do not forget the 64. It adds 3 to the exponent, so the equation is 3 plus 3 x equals 2, not 3 x equals 2.' },
        { say: 'And keep the sign. 2 minus 3 is negative 1, so x is negative one third.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $2^{x + 1} = 8^x$.',
          choices: ['$x = \\dfrac{1}{2}$', '$x = 1$', '$x = 2$', '$x = -\\dfrac{1}{2}$'],
          answer: 0,
          working: '$8^x = (2^3)^x = 2^{3x}$, so $x + 1 = 3x$ and $x = \\dfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve 2 to the power x plus 1 equals 8 to the power x. Pause the video and try it.', show: 'q2', wait: 7 },
        { say: '8 is 2 cubed, so 8 to the power x is 2 to the power 3 x. Then x plus 1 equals 3 x, so 1 equals 2 x, and x is one half: choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write every number as a power of the **same base**', 'Multiplying powers: **add** the exponents', 'Same base on both sides: set the **exponents equal**', 'Check by substituting'] }],
      lines: [
        { say: 'Here is what to remember. Write every number as a power of the same base.', show: 'sum.0' },
        { say: 'When you multiply powers of the same base, add the exponents.', show: 'sum.1' },
        { say: 'With the same base on both sides, set the exponents equal and solve.', show: 'sum.2' },
        { say: 'And check by substituting. For more on solving exponential equations, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
