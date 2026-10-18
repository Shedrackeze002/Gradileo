import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, named, numbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// y = x³ − 2x² + C for C = 0, 3 and 6: only C = 6 passes through (1, 5).
const g = plane({ x: [-1, 3], y: [-4, 12], xStep: 1, yStep: 2, every: 0, width: 5, height: 6 });
const F = (C: number) => (x: number) => x ** 3 - 2 * x * x + C;
const xMin = 4 / 3;
const family = figure('fam', [
  g,
  numbers(g, 1, 4),
  plot(g, { id: 'c0', f: F(0), tone: 'muted', samples: 160 }),
  plot(g, { id: 'c3', f: F(3), tone: 'muted', samples: 160 }),
  plot(g, { id: 'c6', f: F(6), tone: 'brand', samples: 160 }),
  tag(g, 'n0', xMin, F(0)(xMin) - 0.3, 'C = 0', 'below', 'muted'),
  tag(g, 'n3', xMin, F(3)(xMin) - 0.3, 'C = 3', 'below', 'muted'),
  tag(g, 'n6', 0.5, 7.3, 'C = 6', 'center', 'brand'),
  dots(g, [{ id: 'P', x: 1, y: 5, tex: '(1,\\ 5)', tone: 'theta', place: 'below right' }]),
]);

// A ball thrown up at 14.7 m/s from 2 m: s(t) = −4.9t² + 14.7t + 2.
const s = (t: number) => -4.9 * t * t + 14.7 * t + 2;
const h = named(plane({ x: [0, 3.5], y: [0, 14], xStep: 0.5, yStep: 2, every: 0, width: 6, height: 5 }), 't', 's');
const ball = figure('ball', [
  h,
  numbers(h, 1, 2),
  plot(h, { id: 's', f: s, from: 0, to: 3.13, samples: 160 }),
  tag(h, 'name', 3, 12, 's(t)', 'center', 'brand'),
  tag(h, 'oneT', 1.5, 8.9, '(1,\\ 11.8)', 'center', 'theta', 'one'),
  dots(h, [
    { id: 'start', x: 0, y: 2, tex: '(0,\\ 2)', tone: 'good', place: 'right' },
    { id: 'one', x: 1, y: 11.8, tex: '', tone: 'theta' },
  ]),
]);

const video: Explainer = {
  id: 'm31-8-1-d',
  lessonId: 'm31-8-1',
  title: 'Antiderivatives, Part 4: Initial-Value Problems and Motion',
  thumbnailTitle: 'Initial-Value Problems',
  thumbnail: 'fam',
  summary: 'A derivative and one value of the function pin down the constant C: from f′(x) = 3x² − 4x and f(1) = 5, f(x) = x³ − 2x² + 6. Going from acceleration to position takes two antiderivatives and two conditions: a ball thrown up at 14.7 m/s from 2 m, with a(t) = −9.8 m/s², has v(t) = −9.8t + 14.7 and s(t) = −4.9t² + 14.7t + 2, and is 11.8 m high after 1 s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 4', title: 'Initial-Value Problems', subtitle: 'Finding C, and from acceleration to position' }],
      lines: [
        { say: 'An antiderivative comes with a whole family of answers, one for each value of C. But a real problem usually has just one answer.', show: 'title' },
        { say: 'In this video, you will use one known value of a function to find C, and then work backwards from a ball’s acceleration to its height.' },
      ],
    },
    {
      chapter: 'One value pins down C',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Initial-value problem', md: 'A derivative together with one value of the function is an **initial-value problem**. The given value is the **initial condition**, and it determines $C$.' }],
      lines: [
        { say: 'Knowing the derivative tells you the shape of the function, but not how high or low it sits. Every curve in the family has the same shape.', show: 'def' },
        { say: 'One known point fixes which curve it is. A derivative together with one value of the function is called an initial-value problem, and the given value is the initial condition.' },
      ],
    },
    {
      chapter: 'Using an initial condition',
      layout: 'split',
      leftWidth: 560,
      left: [family],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f'(x) = 3x^2 - 4x, \\quad f(1) = 5", 'f(x) = x^3 - 2x^2 + C', 'f(1) = 1 - 2 + C = 5', 'C = 6', 'f(x) = x^3 - 2x^2 + 6'] },
      ],
      lines: [
        { say: 'Find f of x, given that f prime of x equals three x squared minus four x, and f of one equals five.', show: 'm.0', focus: 'm.0' },
        { say: 'First, antidifferentiate. Three x squared gives x cubed, and negative four x gives negative two x squared. So f of x equals x cubed, minus two x squared, plus C.', show: 'm.1', focus: 'm.1' },
        { say: 'That is a whole family of curves. Here are three of them, for C equals zero, three and six.', show: ['fam.grid', 'fam.axes', 'fam.c0', 'fam.c3', 'fam.c6', 'fam.n0', 'fam.n3', 'fam.n6'] },
        { say: 'Now use the initial condition. Substitute x equals one: one, minus two, plus C, which is negative one plus C. That must equal five, so C equals six.', show: ['m.2', 'm.3', 'fam.P'], focus: ['m.3', 'fam.P'] },
        { say: 'So f of x equals x cubed, minus two x squared, plus six. Of all the curves in the family, it is the only one that passes through the point at one, five.', show: 'm.4', focus: ['m.4', 'fam.c6'] },
      ],
    },
    {
      chapter: 'From acceleration to position',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['s(t) \\xrightarrow{\\ \\text{derivative}\\ } v(t) \\xrightarrow{\\ \\text{derivative}\\ } a(t)', 'a(t) \\xrightarrow{\\ \\text{antiderivative}\\ } v(t) \\xrightarrow{\\ \\text{antiderivative}\\ } s(t)'] },
        { kind: 'text', id: 't', size: 'md', md: 'Two antiderivatives bring two constants, so two conditions are needed: usually $v(0)$ and $s(0)$.' },
      ],
      lines: [
        { say: 'Motion is a natural place for this. Velocity is the derivative of position, and acceleration is the derivative of velocity.', show: 'm.0', focus: 'm.0' },
        { say: 'So going backwards takes two antiderivatives: from acceleration to velocity, then from velocity to position.', show: 'm.1', focus: 'm.1' },
        { say: 'Each antiderivative brings its own constant, so you need two conditions. Usually they are the starting velocity, v of zero, and the starting position, s of zero.', show: 't' },
      ],
    },
    {
      chapter: 'A ball thrown upward',
      layout: 'split',
      leftWidth: 500,
      left: [ball],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['v(t) = \\int -9.8\\,dt = -9.8t + C_1', 'v(0) = 14.7 \\;\\Rightarrow\\; C_1 = 14.7', 's(t) = -4.9t^2 + 14.7t + C_2', 's(0) = 2 \\;\\Rightarrow\\; C_2 = 2', 's(1) = -4.9 + 14.7 + 2 = 11.8'] },
      ],
      lines: [
        { say: 'A ball is thrown straight up at 14.7 metres per second, from a height of two metres. Gravity gives it an acceleration of negative 9.8 metres per second squared, with t in seconds. Find its height s of t, and its height after one second.', show: ['ball.grid', 'ball.axes'] },
        { say: 'First antiderivative: v of t is the integral of negative 9.8, which is negative 9.8 t, plus a constant, C one. At t equals zero, the velocity is 14.7, so C one is 14.7.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Second antiderivative: integrate negative 9.8 t, plus 14.7. That gives negative 4.9 t squared, plus 14.7 t, plus C two.', show: 'm.2', focus: 'm.2' },
        { say: 'At t equals zero, the height is two metres, so C two is two. The height is s of t equals negative 4.9 t squared, plus 14.7 t, plus two.', show: ['m.3', 'ball.s', 'ball.name', 'ball.start'], focus: ['m.3', 'ball.start'] },
        { say: 'After one second, the height is negative 4.9, plus 14.7, plus two: 11.8 metres.', show: ['m.4', 'ball.one'], focus: ['m.4', 'ball.one'] },
        { say: 'The same idea finds a total cost from a marginal cost, where the fixed cost is the initial condition, or a plant’s height from its rate of growth.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Find $f(x)$ given $f'(x) = 6x^2 + 2$ and $f(1) = 9$.",
          choices: ['$2x^3 + 2x + 9$', '$12x + 5$', '$6x^3 + 2x + 1$', '$2x^3 + 2x + 5$'],
          answer: 3,
          working: '$f(x) = 2x^3 + 2x + C$, and $f(1) = 2 + 2 + C = 9$, so $C = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find f of x, given f prime of x equals six x squared plus two, and f of one equals nine. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Antidifferentiate: f of x equals two x cubed, plus two x, plus C. Then f of one is two plus two plus C, which must be nine, so C is five.', show: 'q.answer' },
        { say: 'Choice A uses C equals nine. But nine is the value of f at x equals one, not at x equals zero, so it is not the constant.' },
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
          items: ['Antidifferentiate first, with $+ C$.', 'Substitute the initial condition to find $C$.', 'Acceleration to position takes two antiderivatives and two conditions.', 'Check: the answer passes through the given point.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To solve an initial-value problem, antidifferentiate first, with plus C.', show: 'sum.0' },
        { say: 'Then substitute the initial condition to find C.', show: 'sum.1' },
        { say: 'Going from acceleration to position takes two antiderivatives, so it needs two conditions.', show: 'sum.2' },
        { say: 'And check that your answer passes through the given point. In the next lesson, we turn to areas under curves, and add up rectangles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
