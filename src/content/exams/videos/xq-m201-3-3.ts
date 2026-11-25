import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 20-1 lesson 3.3 (quadratic functions in standard form): the minimum or
// maximum of f(x) = 2x² − 10x + 4 and its axis of symmetry. The question is an exercise from
// OpenStax College Algebra 2e, word for word apart from "For the following exercises," (section
// 5.1, Quadratic Functions, CC BY-NC-SA 4.0), whose answer key gives a minimum of −17/2 at x = 5/2,
// with axis of symmetry x = 5/2: a = 2 > 0, x = −b/(2a) = 10/4 and f(5/2) = 25/2 − 25 + 4.

const g = plane({ x: [-1, 6], y: [-10, 8], yStep: 2, every: 1, width: 10, height: 7 });
const f = (x: number) => 2 * x ** 2 - 10 * x + 4;

/** The parabola; `vertex` adds the axis of symmetry and the vertex. */
const graph = (vertex = true) =>
  figure(
    'par',
    [
      g,
      plot(g, { id: 'curve', f, tone: 'brand' }),
      dots(g, [
        { id: 'y0', x: 0, y: 4, tex: '(0, 4)', tone: 'adj', place: 'left', group: 'pair' },
        { id: 'y5', x: 5, y: 4, tex: '(5, 4)', tone: 'adj', place: 'right', group: 'pair' },
      ]),
      ...(vertex
        ? [
            polyline(g, { id: 'axis', points: [[2.5, -10], [2.5, 8]], tone: 'good', dashed: true }),
            dots(g, [{ id: 'V', x: 2.5, y: -8.5, tone: 'opp' }]),
          ]
        : []),
    ],
    420,
  );

const QUESTION =
  'Determine whether there is a minimum or maximum value to each quadratic function. Find the value and the axis of symmetry. f(x) = 2x² − 10x + 4';

const video: Explainer = {
  id: 'xq-m201-3-3',
  lessonId: '',
  exam: {
    lesson: 'm201-3-3',
    source: 'OpenStax, College Algebra 2e, Exercise in section 5.1, Quadratic Functions',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/college-algebra-2e/pages/5-1-quadratic-functions',
    question: QUESTION,
  },
  title: 'Exam Question: The Minimum of f(x) = 2x² − 10x + 4 and Its Axis of Symmetry (Standard Form)',
  thumbnailTitle: 'Minimum of 2x² − 10x + 4',
  thumbnail: 'par',
  summary:
    'A real test question, solved one small step at a time: does f(x) = 2x² − 10x + 4 have a minimum or a maximum, what is it, and where is the axis of symmetry? a = 2 is positive, so there is a minimum. The axis is x = −b/(2a) = 5/2, and the minimum value is f(5/2) = −17/2. Then we check the answer and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Minimum or Maximum?', subtitle: 'Quadratic functions in standard form, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about quadratic functions in standard form. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
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
          prompt: 'Determine whether there is a minimum or maximum value to each quadratic function. Find the value and the axis of symmetry. $f(x) = 2x^2 - 10x + 4$',
          answer: 'A minimum of $-\\dfrac{17}{2}$, at $x = \\dfrac{5}{2}$. The axis of symmetry is $x = \\dfrac{5}{2}$.',
          working: '$a = 2 > 0$; $x = -\\dfrac{b}{2a} = \\dfrac{10}{4} = \\dfrac{5}{2}$; $f\\left(\\dfrac{5}{2}\\right) = \\dfrac{25}{2} - 25 + 4 = -\\dfrac{17}{2}$.',
        },
      ],
      lines: [
        { say: 'Here is the question, as the textbook prints it for this set of exercises.', show: 'q' },
        { say: 'Determine whether there is a minimum or maximum value to each quadratic function. Find the value and the axis of symmetry. f of x equals 2 x squared, minus 10 x, plus 4.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [{ kind: 'text', id: 't', size: 'md', md: 'Three things: does the parabola have a **lowest** or a **highest** point, what is that $y$-value, and where is the **mirror line** through it?' }],
      lines: [{ say: 'The question wants three things. Does the parabola have a lowest point or a highest point? What is that y value? And where is the axis of symmetry, the mirror line through it?', show: 't' }],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'dir', tone: 'definition', title: 'Standard form', md: 'In $y = ax^2 + bx + c$, if $a > 0$ the parabola opens **up** and has a **minimum**. If $a < 0$ it opens down and has a maximum.' },
        { kind: 'callout', id: 'ax', tone: 'key', title: 'Axis of symmetry', md: '$x = -\\dfrac{b}{2a}$. The minimum or maximum value is $y$ at that $x$.' },
      ],
      lines: [
        { say: 'Here is what we need. In standard form, y equals \"a\" x squared plus b x plus c. If \"a\" is positive, the parabola opens up and has a minimum. If \"a\" is negative, it opens down and has a maximum.', show: 'dir' },
        { say: 'The axis of symmetry is x equals negative b over 2 \"a\". The vertex is on it, so the minimum or maximum value is the y value at that x.', show: 'ax' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Use the sign of $a$: **minimum** or **maximum**?', 'Find the axis: $x = -\\dfrac{b}{2a}$', 'Substitute to find the **value**'] }],
      lines: [
        { say: 'Here is the plan. First, use the sign of \"a\" to decide: minimum or maximum?', show: 'plan.0' },
        { say: 'Second, find the axis of symmetry.', show: 'plan.1' },
        { say: 'Third, substitute that x to find the value.', show: 'plan.2' },
      ],
    },
    {
      chapter: 'Step 1: Minimum or maximum?',
      layout: 'split',
      leftWidth: 600,
      left: [graph(false)],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['a = 2, \\ b = -10, \\ c = 4', 'a > 0: \\text{ opens up}', '\\good{\\text{minimum}}'] }],
      lines: [
        { say: 'Step one. Read the coefficients: \"a\" is 2, b is negative 10, and c is 4.', show: 'm.0' },
        { say: '\"a\" is positive, so the parabola opens up.', show: ['par.grid', 'par.axes', 'par.curve', 'm.1'], focus: 'par.curve' },
        { say: 'A parabola that opens up has a lowest point, so this function has a minimum value.', show: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The axis of symmetry',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = -\\dfrac{b}{2a} = -\\dfrac{-10}{2(2)}', '= \\dfrac{10}{4} = \\good{\\dfrac{5}{2}}'] }],
      lines: [
        { say: 'Step two. The axis of symmetry is x equals negative b over 2 \"a\". b is negative 10, so this is negative, negative 10, over 2 times 2.', show: 'm.0' },
        { say: 'The two negatives make a positive: 10 over 4, which is 5 halves. The axis of symmetry is x equals 5 halves, or 2.5.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Step 3: The minimum value',
      layout: 'split',
      leftWidth: 600,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['f\\left(\\tfrac{5}{2}\\right) = 2\\left(\\tfrac{25}{4}\\right) - 10\\left(\\tfrac{5}{2}\\right) + 4', '= \\tfrac{25}{2} - 25 + 4', '= \\good{-\\tfrac{17}{2}}'] }],
      lines: [
        { say: 'Step three. Substitute x equals 5 halves. 5 halves squared is 25 quarters, so the first term is 2 times 25 quarters. The second is 10 times 5 halves.', show: ['par.grid', 'par.axes', 'par.curve', 'par.axis', 'm.0'], focus: 'par.axis' },
        { say: 'That is 25 halves, minus 25, plus 4.', show: 'm.1' },
        { say: '12.5 minus 25 plus 4 is negative 8.5, or negative 17 halves. So the minimum value is negative 17 halves, at x equals 5 halves, and the axis of symmetry is x equals 5 halves. That is the answer.', show: ['m.2', 'par.V'], focus: 'par.V' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 600,
      left: [graph()],
      right: [{ kind: 'math', id: 'm', size: 'md', lines: ['f(0) = 4', 'f(5) = 50 - 50 + 4 = 4', 'x = \\tfrac{0 + 5}{2} = \\tfrac{5}{2} \\ \\checkmark'] }],
      lines: [
        { say: 'Let us check with symmetry. f of 0 is 4, and f of 5 is 50 minus 50 plus 4, which is also 4.', show: ['par.grid', 'par.axes', 'par.curve', 'par.axis', 'par.V', 'par.pair', 'm.0', 'm.1'], focus: 'par.pair' },
        { say: 'Two points at the same height are mirror images, so the axis is halfway between them: 0 plus 5, over 2, is 5 halves. It matches.', show: 'm.2' },
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
            ['$x = -\\dfrac{10}{4}$', '$b = -10$, so $-b = +10$'],
            ['a maximum, because $b < 0$', 'only the sign of $a$ decides: $a = 2 > 0$'],
            ['minimum value $\\dfrac{5}{2}$', 'that is **where** it happens; the value is $y = -\\dfrac{17}{2}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'b is negative 10, so negative b is positive 10. Dropping that sign puts the axis on the wrong side.' },
        { say: 'The negative b does not make it a maximum. Only the sign of \"a\" decides whether the parabola opens up or down.' },
        { say: 'And 5 halves is where the minimum happens. The minimum value is the y value, negative 17 halves.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the maximum or minimum value of $y = -x^2 + 6x - 5$.',
          choices: ['maximum $4$', 'minimum $4$', 'maximum $3$', 'maximum $-32$'],
          answer: 0,
          working: '$a = -1 < 0$, so a maximum. $x = -\\dfrac{6}{2(-1)} = 3$, and $y = -9 + 18 - 5 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the maximum or minimum value of y equals negative x squared, plus 6 x, minus 5. Pause the video and try it.', show: 'q2', wait: 6 },
        { say: '\"a\" is negative 1, so the parabola opens down and has a maximum. The axis is x equals negative 6 over 2 times negative 1, which is 3. Then y is negative 9 plus 18 minus 5, which is 4. The maximum value is 4, choice A. C gives where it happens, and D uses x equals negative 3.', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a > 0$: **minimum**; $a < 0$: **maximum**', 'Axis of symmetry: $x = -\\dfrac{b}{2a}$', 'The value is $y$ on the axis', 'Points at the same height sit **evenly** around the axis'] }],
      lines: [
        { say: 'Here is what to remember. If \"a\" is positive, there is a minimum. If \"a\" is negative, there is a maximum.', show: 'sum.0' },
        { say: 'The axis of symmetry is x equals negative b over 2 \"a\".', show: 'sum.1' },
        { say: 'The minimum or maximum value is the y value on the axis.', show: 'sum.2' },
        { say: 'And points at the same height sit evenly on either side of the axis. For more on standard form, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
