import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// Exam question for Math 31 lesson 6.2 (increasing, decreasing and extreme values). The question
// is an exercise from OpenStax Calculus Volume 1 (section 4.3, Maxima and Minima, CC BY-NC-SA
// 4.0): the book's instruction "For the following exercises, find the local and absolute minima and
// maxima for the functions over (−∞, ∞)." is put with the one function it asks about.
// y′ = 12x(x + 3)(x − 1): − + − + across −3, 0, 1, so minimum (−3, −135), maximum (0, 0), minimum
// (1, −7); −135 is the absolute minimum and there is no absolute maximum, as in the book's answer.

const QUESTION = 'Find the local and absolute minima and maxima for the function over (−∞, ∞): y = 3x⁴ + 8x³ − 18x².';

const Y = (x: number) => 3 * x ** 4 + 8 * x ** 3 - 18 * x ** 2;
const g = plane({ x: [-4.5, 2.5], y: [-150, 50], xStep: 1, yStep: 25, every: 2, width: 8, height: 7 });

/** The quartic with its three turning points. */
const graph = (height = 470) =>
  figure(
    'g',
    [
      g,
      plot(g, { id: 'f', f: Y, from: -4.3, to: 2.1, tone: 'adj', samples: 200 }),
      dots(g, [
        { id: 'a', x: -3, y: -135, tex: '(-3, -135)', tone: 'theta', place: 'right' },
        { id: 'b', x: 0, y: 0, tex: '(0, 0)', tone: 'opp', place: 'above left' },
        { id: 'c', x: 1, y: -7, tex: '(1, -7)', tone: 'theta', place: 'below right' },
      ]),
    ],
    height,
  );

const video: Explainer = {
  id: 'xq-m31-6-2',
  lessonId: '',
  exam: {
    lesson: 'm31-6-2',
    source: 'OpenStax, Calculus Volume 1, Exercise in section 4.3, Maxima and Minima',
    licence: 'CC BY-NC-SA 4.0, access for free at openstax.org',
    url: 'https://openstax.org/books/calculus-volume-1/pages/4-3-maxima-and-minima',
    question: QUESTION,
  },
  title: 'Exam Question: The Extrema of y = 3x⁴ + 8x³ − 18x² (Increasing, Decreasing and Extreme Values)',
  thumbnailTitle: 'Down, Up, Down, Up',
  thumbnail: 'g',
  summary:
    'A real test question, solved one small step at a time: find the local and absolute minima and maxima of y = 3x⁴ + 8x³ − 18x² over all real numbers. The derivative factors as y′ = 12x(x + 3)(x − 1), so the critical numbers are −3, 0 and 1. A sign chart shows the graph goes down, up, down, up: local minima at (−3, −135) and (1, −7), and a local maximum at (0, 0). The lowest of all is −135, the absolute minimum, and there is no absolute maximum. Then we check on a graph and look at the traps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Exam Question', title: 'Down, Up, Down, Up', subtitle: 'Extreme values, step by step' }],
      lines: [
        { say: 'In this video, we solve a real test question about increasing and decreasing functions and extreme values. We will take it one small step at a time, so that every step makes sense.', show: 'title' },
        { say: 'The question comes from the free OpenStax Calculus textbook. You will see where it comes from at the bottom of the screen the whole way through.' },
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
          prompt: 'Find the local and absolute minima and maxima for the function over $(-\\infty, \\infty)$: $y = 3x^4 + 8x^3 - 18x^2$.',
          answer: 'Absolute (and local) minimum $-135$ at $x = -3$; local maximum $0$ at $x = 0$; local minimum $-7$ at $x = 1$; no absolute maximum.',
          working: '$y\' = 12x(x + 3)(x - 1)$',
        },
      ],
      lines: [
        { say: 'Here is the question, from the book\'s exercises.', show: 'q' },
        { say: 'Find the local and absolute minima and maxima, over all real numbers, of y equals 3 x to the 4, plus 8 x cubed, minus 18 x squared.' },
        { say: 'If you would like to try it first, pause the video now.', wait: 5 },
      ],
    },
    {
      chapter: 'What is it asking?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Word', 'Meaning'],
          rows: [
            ['Local max / min', 'higher / lower than the points **nearby**: a hilltop or a valley'],
            ['Absolute max / min', 'the highest / lowest value **of all**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what it is asking. A local maximum or minimum is a hilltop or a valley: higher or lower than the points nearby.', show: 'tab' },
        { say: 'An absolute maximum or minimum is the highest or lowest value of all, over every real number.' },
      ],
    },
    {
      chapter: 'What you need to know',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'rules',
          head: ['$y\'$', 'The graph'],
          rows: [
            ['$y\' > 0$', 'goes **up** (increasing)'],
            ['$y\' < 0$', 'goes **down** (decreasing)'],
            ['$y\'$ changes $-$ to $+$', 'a local **minimum**'],
            ['$y\'$ changes $+$ to $-$', 'a local **maximum**'],
          ],
        },
      ],
      lines: [
        { say: 'Here is what we need. Where the derivative is positive, the graph goes up. Where it is negative, the graph goes down.', show: 'rules' },
        { say: 'If the derivative changes from negative to positive, the graph turns from down to up: a valley, a local minimum. From positive to negative is a hilltop, a local maximum.' },
      ],
    },
    {
      chapter: 'The plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'plan', items: ['Find $y\'$ and **factor** it', 'Critical numbers: $y\' = 0$', '**Sign chart** of $y\'$', 'Values at each turn, and the **ends**'] }],
      lines: [
        { say: 'Here is the plan. Find the derivative and factor it.', show: 'plan.0' },
        { say: 'Find the critical numbers, where the derivative is 0.', show: 'plan.1' },
        { say: 'Make a sign chart of the derivative.', show: 'plan.2' },
        { say: 'Then find the value at each turn, and see what happens at the far ends.', show: 'plan.3' },
      ],
    },
    {
      chapter: 'Step 1: The critical numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['y\' = 12x^3 + 24x^2 - 36x', '= 12x(x^2 + 2x - 3) = 12x(x + 3)(x - 1)', 'y\' = 0: \\ x = \\good{-3, \\ 0, \\ 1}'] }],
      lines: [
        { say: 'Step one. The power rule gives 12 x cubed plus 24 x squared minus 36 x.', show: 'm.0' },
        { say: 'Take out 12x, and factor what is left: x plus 3, times x minus 1.', show: 'm.1' },
        { say: 'So the derivative is 0 at negative 3, 0 and 1. These are the critical numbers.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Step 2: The sign chart',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'chart',
          head: ['$x$', '$x < -3$', '$-3 < x < 0$', '$0 < x < 1$', '$x > 1$'],
          rows: [
            ['$12x$', '$-$', '$-$', '$+$', '$+$'],
            ['$x + 3$', '$-$', '$+$', '$+$', '$+$'],
            ['$x - 1$', '$-$', '$-$', '$-$', '$+$'],
            ['$y\'$', '$-$ down', '$+$ up', '$-$ down', '$+$ up'],
          ],
        },
      ],
      lines: [
        { say: 'Step two. The three critical numbers cut the line into four pieces. Find the sign of each factor in each piece.', show: 'chart' },
        { say: 'Multiply the signs. The derivative is negative, then positive, then negative, then positive. So the graph goes down, up, down, up.', focus: 'chart' },
      ],
    },
    {
      chapter: 'Step 3: The extrema',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['x = -3: \\ 243 - 216 - 162 = \\good{-135} \\ \\text{(local min)}', 'x = 0: \\ \\good{0} \\ \\text{(local max)}', 'x = 1: \\ 3 + 8 - 18 = \\good{-7} \\ \\text{(local min)}', '\\text{absolute min } \\good{-135}; \\ \\text{no absolute max}'] }],
      lines: [
        { say: 'Step three. At negative 3, down turns to up: a local minimum. The value is 243 minus 216 minus 162, which is negative 135.', show: 'm.0' },
        { say: 'At 0, up turns to down: a local maximum, with value 0.', show: 'm.1' },
        { say: 'At 1, down turns to up again: a local minimum. The value is 3 plus 8 minus 18, which is negative 7.', show: 'm.2' },
        { say: 'Negative 135 is lower than negative 7, so it is the absolute minimum. And the graph goes up forever at both ends, so there is no absolute maximum.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check the answer',
      layout: 'split',
      leftWidth: 620,
      left: [graph()],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A deep valley at $x = -3$, a small hill at $0$, a shallow valley at $1$, and both ends rising **forever**.' }],
      lines: [
        { say: 'Let us check on a graph.', show: ['g.grid', 'g.axes', 'g.f'] },
        { say: 'A deep valley at negative 3, a small hill at 0, and a shallow valley at 1.', show: ['g.a', 'g.b', 'g.c'] },
        { say: 'Both ends rise forever, so there is no highest point. It checks out.', show: 't' },
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
            ['Divide $y\' = 0$ by $x$', 'that **loses** the critical number $x = 0$'],
            ['"Absolute max at $x = 0$"', 'the graph rises **forever**: there is none'],
            ['Giving only $x$-values', 'a max or min is a **value** of $y$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the traps.', show: 'traps' },
        { say: 'Dividing by x loses the critical number 0. Factor it out instead.' },
        { say: 'The hill at 0 is only a local maximum. The ends go higher forever, so there is no absolute maximum.' },
        { say: 'And the maximum or minimum is a y value. Say where it happens and what it is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'Find the local extrema of $y = x^3 - 3x$.',
          choices: ['Local max $2$ at $x = -1$; local min $-2$ at $x = 1$', 'Local max $-2$ at $x = 1$; local min $2$ at $x = -1$', 'Absolute max $2$ at $x = -1$', 'Local min $0$ at $x = 0$'],
          answer: 0,
          working: '$y\' = 3(x + 1)(x - 1)$: $+$ $-$ $+$, so a max at $x = -1$ and a min at $x = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the local extrema of y equals x cubed minus 3x. Pause the video and try it.', show: 'q2', wait: 8 },
        { say: 'The derivative is 3 times x plus 1 times x minus 1: positive, negative, positive. So a local maximum of 2 at negative 1, and a local minimum of negative 2 at 1. Choice "A".', show: 'q2.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Critical numbers: where $y\' = 0$ (or does not exist)', 'Sign chart: $+$ is **up**, $-$ is **down**', '$-$ to $+$: min; $+$ to $-$: max', 'Absolute: compare values and check the **ends**'] }],
      lines: [
        { say: 'Here is what to remember. Critical numbers are where the derivative is 0, or does not exist.', show: 'sum.0' },
        { say: 'Make a sign chart: positive means up, and negative means down.', show: 'sum.1' },
        { say: 'Negative to positive is a minimum, and positive to negative is a maximum.', show: 'sum.2' },
        { say: 'For absolute extrema, compare the values and check the ends. For more on increasing, decreasing and extreme values, watch this lesson\'s explainer video on Gradileo.', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
