import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 30-1 lesson 7.4 (understanding logarithms). The question is an exercise
// from OpenStax College Algebra 2e, word for word (section 6.3, Logarithmic Functions, CC BY-NC-SA
// 4.0), with its set's instruction in front of it. log₈4 = y means 8^y = 4, so 2^(3y) = 2² and
// y = 2/3; then 6 · 2/3 = 4, as in the book's answer. The graph of y = log₈x passes through (1, 0),
// (4, 2/3) and (8, 1).

const g = plane({ x: [-0.6, 10], y: [-1.6, 1.6], xStep: 1, yStep: 1 / 3, every: 3, width: 12, height: 6.5 });

/** y = log₈x (`f`) and the points (1, 0), (4, 2/3) and (8, 1) (`a`, `b`, `c`). */
const graph = (height = 420) =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'f', f: (x) => Math.log(x) / Math.log(8), from: 0.06, to: 10, tone: 'adj', samples: 160, label: 'y = \\log_8 x', labelAt: 0.97, side: 'left' }),
      dots(g, [
        { id: 'a', x: 1, y: 0, tex: '(1, 0)', tone: 'adj', place: 'below right' },
        { id: 'b', x: 4, y: 2 / 3, tex: '\\left(4, \\tfrac{2}{3}\\right)', tone: 'good', place: 'below right' },
        { id: 'c', x: 8, y: 1, tex: '(8, 1)', tone: 'adj', place: 'below right' },
      ]),
    ],
    height,
  );

const QUESTION = 'Evaluate the base b logarithmic expression without using a calculator. 6 log₈(4)';

const video: Explainer = {
  id: 'xq-m301-7-4',
  lessonId: '',
  exam: {
    lesson: 'm301-7-4',
    source: 'OpenStax, College Algebra 2e, Exercise in section 6.3, Logarithmic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/6-3-logarithmic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: Evaluate 6 log₈(4) Without a Calculator (Understanding Logarithms)',
  thumbnailTitle: 'Evaluate 6 log₈(4)',
  thumbnail: 'gr',
  summary:
    'A real test question, solved one small step at a time: evaluate 6 log₈(4) without a calculator. A logarithm is an exponent, so log₈(4) asks what power of 8 gives 4. Writing 8 and 4 as powers of 2 gives 2/3, and 6 times 2/3 is 4. Then we check on the graph of y = log₈x and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Evaluate 6 log₈(4)', subtitle: 'Understanding logarithms, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about logarithms. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Evaluate the base $b$ logarithmic expression without using a calculator. $6\\log_8(4)$',
          answer: '$4$',
          working: '$8^{2/3} = 4$, so $\\log_8 4 = \\dfrac{2}{3}$, and $6 \\cdot \\dfrac{2}{3} = 4$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Evaluate the base b logarithmic expression without using a calculator. 6 times log base 8 of 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: '$\\log_8(4)$ asks: **what power of $8$ gives $4$?** Find that number exactly, then multiply it by $6$.' }],
      lines: [
        { say: 'Log base 8 of 4 is a question: what power of 8 gives 4?', show: 't' },
        { say: 'We find that number exactly, without a calculator, and then multiply it by 6.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'A logarithm is an exponent', md: '$\\log_b x = y$ means $b^y = x$.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use a common base', md: '$8 = 2^3$ and $4 = 2^2$, so both are **powers of 2**.' },
      ],
      lines: [
        { say: 'Here is what we need. A logarithm is an exponent. Log base b of x equals y means b to the power y equals x.', show: 'def' },
        { say: 'And 8 is 2 cubed while 4 is 2 squared, so we can write both as powers of 2.', show: 'tip' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Call $\\log_8 4 = y$ and write it as a **power**', 'Use base $2$ to find $y$', '**Multiply** by $6$'] }],
      lines: [
        { say: 'Here is the plan. First, call log base 8 of 4 "y", and write it as a power.', show: 'plan.0' },
        { say: 'Second, use base 2 to find y.', show: 'plan.1' },
        { say: 'Third, multiply by 6.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Write it as a power',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['\\log_8 4 = y', '\\good{8^y = 4}'] }],
      lines: [
        { say: 'Step one. Call log base 8 of 4 "y".', show: 'm.0' },
        { say: 'By the definition, that means 8 to the power y equals 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 2: Find y',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['(2^3)^y = 2^2', '2^{3y} = 2^2', '3y = 2 \\ \\Rightarrow \\ y = \\good{\\dfrac{2}{3}}'] }],
      lines: [
        { say: 'Step two. Write 8 as 2 cubed and 4 as 2 squared.', show: 'm.0' },
        { say: 'A power of a power multiplies the exponents, so the left side is 2 to the power 3 y.', show: 'm.1' },
        { say: 'The bases match, so 3 y equals 2, and y is two thirds. So log base 8 of 4 is two thirds.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 3: Multiply by 6',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['6\\log_8 4 = 6 \\cdot \\dfrac{2}{3}', '= \\good{4}'] }],
      lines: [
        { say: 'Step three. Now multiply by 6: 6 times two thirds.', show: 'm.0' },
        { say: '6 times 2 is 12, and 12 divided by 3 is 4. So 6 log base 8 of 4 is 4.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'center',
      main: [graph(), { kind: 'math', id: 'm', size: 'md', lines: ['8^{2/3} = \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4 \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check. 8 to the power two thirds is the cube root of 8, squared. The cube root of 8 is 2, and 2 squared is 4. It checks out.', show: 'm.0' },
        { say: 'And on a graph, here is y equals log base 8 of x. It passes through the point at 1, 0, because 8 to the power 0 is 1, and the point at 8, 1.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.a', 'gr.c'] },
        { say: 'At x equals 4, its height is two thirds: between 0 and 1, as it should be, since 4 is between 1 and 8.', show: 'gr.b', focus: 'gr.b' },
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
            ['$\\log_8 4 = \\dfrac{4}{8} = \\dfrac{1}{2}$', 'a log is an **exponent**, not a division'],
            ['$\\log_8 4 = 2$', 'that is $\\log_2 4$; the base is $8$'],
            ['$6 \\log_8 4 = \\log_{48} 4$', 'the $6$ multiplies the **answer**, not the base'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'A logarithm is not a division. Log base 8 of 4 is not 4 over 8. It is the exponent that turns 8 into 4.' },
        { say: 'Do not change the base. 2 is log base 2 of 4, but this is base 8.' },
        { say: 'And the 6 in front multiplies the value of the logarithm. It does not go into the base.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Evaluate $\\log_9 27$ without using a calculator.',
          choices: ['$3$', '$\\dfrac{3}{2}$', '$\\dfrac{2}{3}$', '$\\dfrac{1}{3}$'],
          answer: 1,
          working: '$9^y = 27$, so $3^{2y} = 3^3$, $2y = 3$ and $y = \\dfrac{3}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate log base 9 of 27 without using a calculator. Pause the video and try it.', show: 'q2', wait: 7 },
        { say: '9 to the power y equals 27. Write both as powers of 3: 3 to the power 2 y equals 3 cubed. So 2 y equals 3, and y is three halves: choice B.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\log_b x = y$ means $b^y = x$', 'Write both numbers as powers of a **common base**', 'Set the **exponents** equal', 'A number in front **multiplies** the log\'s value'] }],
      lines: [
        { say: 'Here is what to remember. Log base b of x equals y means b to the power y equals x.', show: 'sum.0' },
        { say: 'Write both numbers as powers of a common base.', show: 'sum.1' },
        { say: 'Then set the exponents equal.', show: 'sum.2' },
        { say: 'And a number in front multiplies the value of the logarithm. For more on understanding logarithms, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
