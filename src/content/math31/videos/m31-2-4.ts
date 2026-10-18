import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, hole, join, panel, piece, spot } from './lib/m31-2-graphs.ts';

// A graph drawn in one stroke, and the same graph broken by a jump at x = 1.
const smooth = (x: number) => 0.4 * (x - 1) ** 3 - 0.8 * (x - 1) + 1.5;
const q1 = panel({ name: 'q1', x: [-1, 3], y: [-1, 4], left: 0, w: 5, h: 5 });
const q2 = panel({ name: 'q2', x: [-1, 3], y: [-1, 4], left: 7, w: 5, h: 5 });
const pencil = figure('pen', [
  join([q1, piece(q1, { id: 'c', f: smooth }), caption(q1, 'cap', '\\text{continuous}', 'good', 0.18)]),
  join([q2, piece(q2, { id: 'a', f: smooth, from: -1, to: 1 }), piece(q2, { id: 'b', f: (x) => smooth(x) + 1.2, from: 1, to: 3 }), spot(q2, 'd', 1, 1.5), hole(q2, 'h', 1, 2.7), caption(q2, 'cap', '\\text{not continuous at } x = 1', 'bad', 0.18)]),
]);

// The three ways to fail at x = 1: no value, no limit, or a limit different from the value.
const line = (x: number) => 0.5 * x + 1;
const r1 = panel({ name: 'r1', x: [-1, 3], y: [-1, 3], left: 0, w: 4.4, h: 4.4 });
const r2 = panel({ name: 'r2', x: [-1, 3], y: [-1, 3], left: 6.2, w: 4.4, h: 4.4 });
const r3 = panel({ name: 'r3', x: [-1, 3], y: [-1, 3], left: 12.4, w: 4.4, h: 4.4 });
const fails = figure('fail', [
  join([r1, piece(r1, { id: 'c', f: line }), hole(r1, 'h', 1, 1.5), caption(r1, 'cap', '\\text{1. } f(1) \\text{ undefined}', 'bad')]),
  join([r2, piece(r2, { id: 'a', f: (x) => 0.5 * x + 0.5, from: -1, to: 1 }), piece(r2, { id: 'b', f: (x) => 0.5 * x + 1.5, from: 1, to: 3 }), spot(r2, 'd', 1, 1), hole(r2, 'h', 1, 2), caption(r2, 'cap', '\\text{2. no limit}', 'bad')]),
  join([r3, piece(r3, { id: 'c', f: line }), hole(r3, 'h', 1, 1.5), spot(r3, 'd', 1, 2.6), caption(r3, 'cap', '\\text{3. } \\lim \\ne f(1)', 'bad')]),
]);

const video: Explainer = {
  id: 'm31-2-4',
  lessonId: 'm31-2-4',
  title: 'Continuity, Part 1: What Continuity Means',
  thumbnailTitle: 'What Continuity Means',
  thumbnail: 'fail',
  summary: 'A function is continuous at x = a when f(a) is defined, the limit as x → a exists, and the two are equal. Checking the three conditions in order, for x² at x = 2, and the three ways a graph can fail them: a hole with no value, a jump with no limit, and a hole with the dot somewhere else.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Limits and Continuity · Part 1', title: 'What Continuity Means', subtitle: 'No holes, no jumps, no breaks' }],
      lines: [
        { say: 'Informally, a function is continuous if you can draw its graph without lifting your pencil. There are no holes, no jumps, and no places where the graph shoots off to infinity.', show: 'title' },
        { say: 'Calculus needs a precise version of that idea, and limits give us one. In this video, you will learn the definition of continuity at a point.' },
      ],
    },
    {
      chapter: 'Without lifting your pencil',
      layout: 'center',
      main: [pencil],
      lines: [
        { say: 'Here are two graphs. The first can be drawn in one smooth stroke, from one end to the other. It is continuous.', show: ['pen.q1-grid', 'pen.q1-axes', 'pen.q1-c', 'pen.q1-cap'], focus: 'pen.q1-c' },
        { say: 'The second is the same curve, but at x equals one it jumps up. To draw it, you must lift your pencil at x equals one. It is not continuous there.', show: ['pen.q2-grid', 'pen.q2-axes', 'pen.q2-a', 'pen.q2-b', 'pen.q2-d', 'pen.q2-h', 'pen.q2-cap'], focus: ['pen.q2-d', 'pen.q2-h'] },
        { say: 'The pencil test is a good picture, but we need a test we can check with algebra, even without a graph.' },
      ],
    },
    {
      chapter: 'Three conditions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Continuous at a point', md: 'A function $f$ is **continuous** at $x = a$ when all three conditions hold:' },
        { kind: 'bullets', id: 'b', items: ['**1.** $f(a)$ is defined.', '**2.** $\\displaystyle\\lim_{x \\to a} f(x)$ exists.', '**3.** $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$.'] },
        { kind: 'text', id: 't', size: 'md', md: 'If any condition fails, $f$ has a **discontinuity** at $x = a$.' },
      ],
      lines: [
        { say: 'A function f is continuous at x equals "a" when three conditions all hold.', show: 'def' },
        { say: 'First, f of "a" is defined: there is a point on the graph at x equals "a".', show: 'b.0', focus: 'b.0' },
        { say: 'Second, the limit as x approaches "a" of f of x exists: the graph heads toward one height from both sides.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, that limit equals f of "a": the graph heads toward exactly the point that is there.', show: 'b.2', focus: 'b.2' },
        { say: 'If any of the three fails, f has a discontinuity at x equals "a".', show: 't' },
      ],
    },
    {
      chapter: 'A continuous point',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['f(x) = x^2, \\quad a = 2', '\\text{1. } f(2) = 4 \\;\\checkmark', '\\text{2. } \\lim_{x \\to 2} x^2 = 4 \\;\\checkmark', '\\text{3. } \\lim_{x \\to 2} x^2 = f(2) \\;\\checkmark'] }],
      lines: [
        { say: 'Check the three conditions for f of x equals x squared, at x equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'First, f of two is four, so f of two is defined.', show: 'm.1', focus: 'm.1' },
        { say: 'Second, x squared is a polynomial, so its limit at two is found by substituting: four. The limit exists.', show: 'm.2', focus: 'm.2' },
        { say: 'Third, the limit, four, equals f of two, four. All three hold, so x squared is continuous at two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Three ways to fail',
      layout: 'center',
      main: [fails],
      lines: [
        { say: 'Here are the three ways a graph can fail, all at x equals one.', show: ['fail.r1-grid', 'fail.r1-axes', 'fail.r2-grid', 'fail.r2-axes', 'fail.r3-grid', 'fail.r3-axes'] },
        { say: 'In the first, the graph has a hollow circle at x equals one, and no point there at all. f of one is not defined, so condition one fails.', show: ['fail.r1-c', 'fail.r1-h', 'fail.r1-cap'], focus: 'fail.r1-h' },
        { say: 'In the second, the graph jumps. The two sides head for different heights, so the limit does not exist. Condition two fails.', show: ['fail.r2-a', 'fail.r2-b', 'fail.r2-d', 'fail.r2-h', 'fail.r2-cap'], focus: ['fail.r2-d', 'fail.r2-h'] },
        { say: 'In the third, f of one is defined, and the limit exists, but the dot is not where the graph is heading. The limit does not equal f of one, so condition three fails.', show: ['fail.r3-c', 'fail.r3-h', 'fail.r3-d', 'fail.r3-cap'], focus: ['fail.r3-h', 'fail.r3-d'] },
        { say: 'Check the conditions in order. The first one that fails tells you what kind of break the graph has, which is the subject of the next part.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For a function $f$, $\\displaystyle\\lim_{x \\to 4} f(x) = 7$ and $f(4) = 3$. Which condition of continuity fails at $x = 4$?',
          choices: ['1: $f(4)$ is not defined.', '2: the limit does not exist.', '3: the limit does not equal $f(4)$.', 'None: $f$ is continuous at $x = 4$.'],
          answer: 2,
          working: '$f(4) = 3$ is defined, and the limit, $7$, exists. But $7 \\ne 3$, so condition 3 fails.',
        },
      ],
      lines: [
        { say: 'Your turn. For a function f, the limit as x approaches four of f of x is seven, and f of four is three. Which condition of continuity fails at x equals four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f of four is defined, and the limit exists. But the limit, seven, does not equal f of four, which is three. Choice D is wrong: all three conditions must hold, and the third one does not.', show: 'q.answer' },
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
          items: ['Continuous at $x = a$: $f(a)$ is defined, $\\displaystyle\\lim_{x \\to a} f(x)$ exists, and they are equal.', 'If any condition fails, $f$ has a discontinuity at $x = a$.', 'Check the conditions in order.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A function is continuous at x equals "a" when f of "a" is defined, the limit as x approaches "a" exists, and the two are equal.', show: 'sum.0' },
        { say: 'If any condition fails, the function has a discontinuity there.', show: 'sum.1' },
        { say: 'And check the conditions in order. In the next part, we name the different kinds of discontinuity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
