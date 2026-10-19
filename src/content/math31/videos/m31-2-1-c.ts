import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, hole, join, numbers, panel, piece, plane } from './lib/m31-2-graphs.ts';

const recipSq = (x: number) => 1 / (x * x);
const wobble = (x: number) => Math.sin(1 / x);

// Three small graphs: a jump (|x|/x), unbounded values (1/x²) and oscillation (sin(1/x)).
const p1 = panel({ name: 'p1', x: [-3, 3], y: [-3, 3], left: 0, w: 4.4, h: 4.4 });
const p2 = panel({ name: 'p2', x: [-3, 3], y: [-1, 5], left: 6.4, w: 4.4, h: 4.4 });
const p3 = panel({ name: 'p3', x: [-1, 1], y: [-1.5, 1.5], left: 12.8, w: 4.4, h: 4.4, xStep: 0.5, yStep: 0.5 });
const three = figure('three', [
  join([p1, piece(p1, { id: 'a', f: () => -1, from: -3, to: 0 }), piece(p1, { id: 'b', f: () => 1, from: 0, to: 3 }), hole(p1, 'h1', 0, -1), hole(p1, 'h2', 0, 1), caption(p1, 'cap', '\\text{a jump}')]),
  join([p2, piece(p2, { id: 'a', f: recipSq, from: -3, to: -0.05 }), piece(p2, { id: 'b', f: recipSq, from: 0.05, to: 3 }), caption(p2, 'cap', '\\text{unbounded}')]),
  join([p3, piece(p3, { id: 'a', f: wobble, from: -1, to: -0.01, samples: 1500 }), piece(p3, { id: 'b', f: wobble, from: 0.01, to: 1, samples: 1500 }), caption(p3, 'cap', '\\text{oscillation}')]),
]);

// |x|/x: −1 to the left of 0, 1 to the right, defined at neither end.
const g = plane({ x: [-3, 3], y: [-2, 2], every: 0 });
const absOver = figure('ab', [
  g,
  numbers(g, 1, 1),
  piece(g, { id: 'a', f: () => -1, from: -3, to: 0 }),
  piece(g, { id: 'b', f: () => 1, from: 0, to: 3 }),
  hole(g, 'h1', 0, -1, { tex: '(0, -1)', place: 'below right' }),
  hole(g, 'h2', 0, 1, { tex: '(0, 1)', place: 'above left' }),
]);

// 1/x² close to 0.
const g2 = plane({ x: [-3, 3], y: [-1, 9], every: 0 });
const tall = figure('sq', [g2, numbers(g2, 1, 1), piece(g2, { id: 'a', f: recipSq, from: -3, to: -0.05 }), piece(g2, { id: 'b', f: recipSq, from: 0.05, to: 3 })]);

// sin(1/x) close to 0.
const g3 = plane({ x: [-1, 1], y: [-1.5, 1.5], xStep: 0.25, yStep: 0.5, every: 0, width: 8, height: 6 });
const wave = figure('sw', [g3, numbers(g3, 0.5, 0.5), piece(g3, { id: 'a', f: wobble, from: -1, to: -0.005, samples: 2500 }), piece(g3, { id: 'b', f: wobble, from: 0.005, to: 1, samples: 2500 })]);

const video: Explainer = {
  id: 'm31-2-1-c',
  lessonId: 'm31-2-1',
  title: 'Limits from Graphs and Tables, Part 3: When a Limit Does Not Exist',
  thumbnailTitle: 'When a Limit Does Not Exist',
  thumbnail: 'three',
  summary: 'The three ways a limit can fail to exist: a jump, where the one-sided limits differ (|x|/x near 0 is −1 on the left and 1 on the right); unbounded values (1/x² near 0); and oscillation (sin(1/x) near 0).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 3', title: 'When a Limit Does Not Exist', subtitle: 'Jumps, unbounded values and oscillation' }],
      lines: [
        { say: 'A limit is a single number that the values of a function close in on. Sometimes there is no such number, and then the limit does not exist.', show: 'title' },
        { say: 'In this video, you will meet the three ways that can happen: a jump, values that grow without bound, and values that keep swinging.' },
      ],
    },
    {
      chapter: 'Three ways to fail',
      layout: 'center',
      main: [three],
      lines: [
        { say: 'Here are the three ways. In the first graph, the two sides head for different heights. That is a jump.', show: ['three.p1-grid', 'three.p1-axes', 'three.p1-a', 'three.p1-b', 'three.p1-h1', 'three.p1-h2', 'three.p1-cap'], focus: ['three.p1-a', 'three.p1-b'] },
        { say: 'In the second, the values grow without bound: the graph shoots up forever, so it never settles on a height.', show: ['three.p2-grid', 'three.p2-axes', 'three.p2-a', 'three.p2-b', 'three.p2-cap'], focus: ['three.p2-a', 'three.p2-b'] },
        { say: 'In the third, the values keep swinging up and down, faster and faster, and never settle on one height. That is oscillation.', show: ['three.p3-grid', 'three.p3-axes', 'three.p3-a', 'three.p3-b', 'three.p3-cap'], focus: ['three.p3-a', 'three.p3-b'] },
        { say: 'Let’s look at each one more closely.', focus: 'three' },
      ],
    },
    {
      chapter: 'A jump',
      layout: 'split',
      leftWidth: 520,
      left: [absOver],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\dfrac{|x|}{x}', 'x < 0\\colon \\quad \\dfrac{-x}{x} = -1', 'x > 0\\colon \\quad \\dfrac{x}{x} = 1', '\\lim_{x \\to 0^-} f(x) = -1 \\ne \\lim_{x \\to 0^+} f(x) = 1'] },
      ],
      lines: [
        { say: 'Find the limit as x approaches zero of the absolute value of x, over x, if it exists.', show: 'm.0', focus: 'm.0' },
        { say: 'Split it into two sides. When x is negative, the absolute value of x is negative x, which is positive. So f of x is negative x over x, which is negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'When x is positive, the absolute value of x is just x, so f of x is x over x, which is one.', show: 'm.2', focus: 'm.2' },
        { say: 'The graph is two flat pieces. Left of zero, it is at negative one. Right of zero, it is at one. At zero itself, the function is undefined, so both ends are hollow circles.', show: ['ab.grid', 'ab.axes', 'ab.a', 'ab.b', 'ab.h1', 'ab.h2'], focus: ['ab.a', 'ab.b'] },
        { say: 'So the left-hand limit is negative one, and the right-hand limit is one. They are different, so the limit as x approaches zero does not exist.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Unbounded values',
      layout: 'split',
      leftWidth: 520,
      left: [tall],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\dfrac{1}{x^2}'] },
        { kind: 'table', id: 't', head: ['$x$', '$f(x)$'], rows: [['$\\pm 0.1$', '$100$'], ['$\\pm 0.01$', '$10\\,000$'], ['$\\pm 0.001$', '$1\\,000\\,000$']] },
      ],
      lines: [
        { say: 'Next, one over x squared, as x approaches zero.', show: ['sq.grid', 'sq.axes', 'sq.a', 'sq.b', 'm'] },
        { say: 'At x equals 0.1, or negative 0.1, the value is one hundred. At 0.01, it is ten thousand. At 0.001, it is a million.', show: 't', focus: 't' },
        { say: 'The closer x gets to zero, the bigger the values become, on both sides, without any upper bound. The graph shoots up beside the y-axis forever.', focus: ['sq.a', 'sq.b'] },
        { say: 'There is no number for the values to close in on, so the limit does not exist. Later in this unit, we will write this as the limit equals infinity, which is a short way of saying the values grow without bound.' },
      ],
    },
    {
      chapter: 'Oscillation',
      layout: 'split',
      leftWidth: 560,
      left: [wave],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = \\sin\\left(\\dfrac{1}{x}\\right)'] },
        { kind: 'text', id: 't', size: 'md', md: 'As $x \\to 0$, $\\frac{1}{x}$ grows without bound, so $\\sin\\left(\\frac{1}{x}\\right)$ runs through every value from $-1$ to $1$ again and again.' },
      ],
      lines: [
        { say: 'Finally, sine of one over x, as x approaches zero.', show: ['sw.grid', 'sw.axes', 'm'] },
        { say: 'As x gets close to zero, one over x becomes huge. So the sine goes through full cycles faster and faster.', show: ['sw.a', 'sw.b', 't'], focus: ['sw.a', 'sw.b'] },
        { say: 'However close x gets to zero, the values still swing all the way between negative one and one. They never settle down near a single number, so the limit does not exist.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = \\dfrac{|x - 2|}{x - 2}$, find $\\displaystyle\\lim_{x \\to 2} f(x)$.',
          choices: ['$1$', 'It does not exist.', '$-1$', '$0$'],
          answer: 1,
          working: 'For $x < 2$, $x - 2$ is negative, so $f(x) = -1$. For $x > 2$, $f(x) = 1$. The one-sided limits differ, so the limit does not exist.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals the absolute value of x minus two, over x minus two, find the limit as x approaches two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. For x less than two, x minus two is negative, so f of x is negative one. For x greater than two, f of x is one. The one-sided limits are different, so the limit does not exist. Choice A uses only the right-hand side.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['**A jump:** the left-hand and right-hand limits are different.', '**Unbounded values:** $f(x)$ grows without bound, as $\\frac{1}{x^2}$ does near $0$.', '**Oscillation:** $f(x)$ keeps swinging, as $\\sin\\left(\\frac{1}{x}\\right)$ does near $0$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A limit does not exist at a jump, where the left-hand and right-hand limits are different.', show: 'sum.0' },
        { say: 'It does not exist where the values grow without bound.', show: 'sum.1' },
        { say: 'And it does not exist where the values keep swinging without settling down. In the next part, we estimate limits from tables of values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
