import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 9.2 (quadratic inequalities in one variable):
// x² − 2x − 15 ≤ 0. The question is a Try It from OpenStax Intermediate Algebra 2e, word for word
// (section 9.8, Solve Quadratic Inequalities, CC BY-NC-SA 4.0), whose answer is [−3, 5]: the roots
// are −3 and 5, and the parabola is below the x-axis between them.

const g = plane({ x: [-5, 7], y: [-18, 10], xStep: 1, yStep: 2, every: 2, width: 9, height: 7 });

/** The parabola y = x² − 2x − 15 and its roots; `below` marks the part on or under the x-axis. */
const graph = () =>
  figure(
    'gr',
    [
      g,
      plot(g, { id: 'par', f: (x) => x * x - 2 * x - 15, tone: 'brand' }),
      plot(g, { id: 'below', f: (x) => x * x - 2 * x - 15, from: -3, to: 5, tone: 'good' }),
      dots(g, [
        { id: 'A', x: -3, y: 0, tone: 'good', group: 'roots' },
        { id: 'B', x: 5, y: 0, tone: 'good', group: 'roots' },
      ]),
    ],
    460,
  );

/** The sign chart on a number line: the roots, and the sign of the quadratic on each interval. */
const chart = () =>
  figure(
    'nl',
    [
      numberLine({
        min: -6,
        max: 8,
        step: 1,
        length: 14,
        points: [
          { id: 'a', value: -3, tex: '', tone: 'good' },
          { id: 'b', value: 5, tex: '', tone: 'good' },
        ],
        spans: [
          { id: 'l', from: -6, to: -3, tone: 'bad', label: '+' },
          { id: 'm', from: -3, to: 5, tone: 'good', label: '-' },
          { id: 'r', from: 5, to: 8, tone: 'bad', label: '+' },
        ],
      }),
    ],
    200,
  );

const QUESTION = 'Solve x² − 2x − 15 ≤ 0 algebraically. Write the solution in interval notation.';

const video: Explainer = {
  id: 'xq-m201-9-2',
  lessonId: '',
  exam: {
    lesson: 'm201-9-2',
    source: 'OpenStax, Intermediate Algebra 2e, Try It in section 9.8, Solve Quadratic Inequalities',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/intermediate-algebra-2e/pages/9-8-solve-quadratic-inequalities',
    question: QUESTION,
  },
  title: 'Exam Question: Solve x² − 2x − 15 ≤ 0 (Quadratic Inequalities in One Variable)',
  thumbnailTitle: 'Solve x² − 2x − 15 ≤ 0',
  thumbnail: 'm',
  summary:
    'A real test question, solved one small step at a time: solve x² − 2x − 15 ≤ 0 algebraically and write the solution in interval notation. We factor the related equation as (x − 5)(x + 3) = 0 to get the roots −3 and 5, test a number in each interval on a sign chart, and find the solution [−3, 5]. Then we check it on the graph of the parabola and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Solve the Quadratic Inequality', subtitle: 'Quadratic inequalities, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about quadratic inequalities. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Intermediate Algebra textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Solve $x^2 - 2x - 15 \\le 0$ algebraically. Write the solution in interval notation.',
          answer: '$[-3, 5]$',
          working: '$(x - 5)(x + 3) \\le 0$ between the roots $-3$ and $5$, including them.',
        },
      ],
      lines: [
        { say: 'Here is the question, exactly as it was printed.', show: 'q' },
        { say: 'Solve x squared minus 2 x minus 15 is less than or equal to 0, algebraically. Write the solution in interval notation.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Find **every** $x$ that makes $x^2 - 2x - 15$ **zero or negative**. The answer is a whole **interval**, not just two numbers.' }],
      lines: [{ say: 'We need every value of x that makes x squared minus 2 x minus 15 zero or negative. The answer is a whole interval of numbers, not just two.', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'roots', tone: 'definition', title: 'The roots split the line', md: 'A quadratic can only change sign at its **roots**. Between and outside them, its sign stays the same.' },
        { kind: 'callout', id: 'iv', tone: 'key', title: 'Interval notation', md: '$[a, b]$ includes the ends; $(a, b)$ leaves them out. Use square brackets for $\\le$ and $\\ge$.' },
      ],
      lines: [
        { say: 'Here is what we need. A quadratic can only change from positive to negative at its roots. So the roots split the number line into pieces, and on each piece the sign stays the same.', show: 'roots' },
        { say: 'And in interval notation, square brackets include the ends, and round brackets leave them out. Less than or equal to includes the roots, so we use square brackets.', show: 'iv' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Solve the related **equation**', '**Test** a number in each interval', 'Write the **interval** that works'] }],
      lines: [
        { say: 'Here is the plan. First, solve the related equation, with an equals sign.', show: 'plan.0' },
        { say: 'Second, test a number in each interval on a sign chart.', show: 'plan.1' },
        { say: 'Third, write the interval that works, in interval notation.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: The related equation',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x^2 - 2x - 15 = 0', '(x - 5)(x + 3) = 0', 'x = \\good{5} \\quad \\text{or} \\quad x = \\good{-3}'] }],
      lines: [
        { say: 'Step one. Change the inequality to an equation: x squared minus 2 x minus 15 equals 0.', show: 'm.0' },
        { say: 'Negative 5 and 3 multiply to negative 15 and add to negative 2, so it factors as x minus 5, times x plus 3.', show: 'm.1' },
        { say: 'So the roots are 5 and negative 3.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: Test each interval',
      layout: 'center',
      main: [chart(), { kind: 'math', id: 'm', size: 'md', lines: ['x = -4: \\ 16 + 8 - 15 = 9 > 0', 'x = 0: \\ 0 - 0 - 15 = -15 < 0', 'x = 6: \\ 36 - 12 - 15 = 9 > 0'] }],
      lines: [
        { say: 'Step two. Mark the roots on a number line. They split it into three intervals.', show: ['nl.axis', 'nl.a', 'nl.b'] },
        { say: 'Test a number in each. Left of negative 3, try negative 4: 16 plus 8 minus 15 is 9. Positive.', show: ['m.0', 'nl.l'] },
        { say: 'Between the roots, try 0: negative 15. Negative.', show: ['m.1', 'nl.m'] },
        { say: 'Right of 5, try 6: 36 minus 12 minus 15 is 9. Positive.', show: ['m.2', 'nl.r'] },
      ],
    },
    {
      chapter: 'Step 3: Write the interval',
      layout: 'center',
      main: [chart(), { kind: 'math', id: 'm', size: 'lg', lines: ['-3 \\le x \\le 5', '\\good{[-3, 5]}'] }],
      lines: [
        { say: 'Step three. We want zero or negative. It is negative between the roots, and zero at the roots themselves.', show: ['nl.axis', 'nl.a', 'nl.b', 'nl.l', 'nl.m', 'nl.r'], focus: 'nl.m' },
        { say: 'So x is between negative 3 and 5, including both ends.', show: 'm.0' },
        { say: 'In interval notation, that is negative 3 to 5, with square brackets.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'The parabola is **on or below** the $x$-axis exactly from $x = -3$ to $x = 5$.' }],
      lines: [
        { say: 'Let us check with a graph. Here is the parabola y equals x squared minus 2 x minus 15. It opens up.', show: ['gr.grid', 'gr.axes', 'gr.par'] },
        { say: 'It crosses the x-axis at negative 3 and 5.', show: 'gr.roots' },
        { say: 'Between them, it dips below the x-axis. That is where the expression is zero or negative: from negative 3 to 5. It matches.', show: ['gr.below', 't'], focus: 'gr.below' },
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
            ['$x \\le 5$ and $x \\le -3$', 'treat it as an **inequality**, not two equations'],
            ['$(-3, 5)$', '$\\le$ includes the roots: use **square** brackets'],
            ['$(-\\infty, -3] \\cup [5, \\infty)$', 'that is where it is **positive**: test a point'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Do not just copy the inequality sign onto the roots. x less than or equal to 5 and x less than or equal to negative 3 is not the answer. Use a sign chart.' },
        { say: 'Less than or equal to includes the roots, so use square brackets, not round ones.' },
        { say: 'And the outside intervals are where the expression is positive. Always test a point to see which intervals you need.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Solve $x^2 - 4 > 0$.',
          choices: ['$(-2, 2)$', '$[-2, 2]$', '$(-\\infty, -2] \\cup [2, \\infty)$', '$(-\\infty, -2) \\cup (2, \\infty)$'],
          answer: 3,
          working: 'Roots $\\pm 2$; at $x = 0$, $-4 < 0$, so it is positive **outside** the roots, not including them.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared minus 4 is greater than 0. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The roots are negative 2 and 2. At 0, the expression is negative 4, so it is positive outside the roots. Greater than leaves out the roots, so the answer is negative infinity to negative 2, together with 2 to infinity, with round brackets: choice D.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the **roots** of the related equation', 'Test a number in each **interval**', 'Keep the intervals with the right **sign**', '$\\le, \\ge$: **square** brackets; $<, >$: round'] }],
      lines: [
        { say: 'Here is what to remember. Find the roots of the related equation.', show: 'sum.0' },
        { say: 'Test a number in each interval.', show: 'sum.1' },
        { say: 'Keep the intervals with the sign you need.', show: 'sum.2' },
        { say: 'And use square brackets when the roots are included. For more on quadratic inequalities in one variable, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
