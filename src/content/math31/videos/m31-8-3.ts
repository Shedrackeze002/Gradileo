import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, guide, numbers, plane, plot, strip, tag } from './lib/m31-8-graphs.ts';

// Net area of f(x) = x − 1 on [0, 3]: 2 above the axis, 0.5 below, so the integral is 1.5.
const n = plane({ x: [0, 3.5], y: [-1.5, 2.5], xStep: 0.5, yStep: 0.5, every: 0, width: 6, height: 4 });
const net = figure('net', [
  n,
  numbers(n, 1, 1),
  area(n, { id: 'below', f: (x) => x - 1, from: 0, to: 1, tone: 'bad', shade: 0.4 }),
  area(n, { id: 'above', f: (x) => x - 1, from: 1, to: 3, tone: 'good', shade: 0.4 }),
  plot(n, { id: 'f', f: (x) => x - 1, samples: 40 }),
  tag(n, 'nb', 0.33, -0.33, '0.5', 'center', 'ink'),
  tag(n, 'na', 2.33, 0.62, '2', 'center', 'ink'),
  tag(n, 'name', 1.5, 1.7, 'y = x - 1', 'center', 'brand'),
]);

// The area function A(x) under f from a, and the thin strip it gains from x to x + h.
const fA = (x: number) => 1.6 + 0.5 * Math.sin(1.2 * x) + 0.18 * x;
const a = plane({ x: [0, 6], y: [0, 3.5], xStep: 0.5, yStep: 0.5, every: 0, width: 6, height: 3.5 });
const accum = figure('acc', [
  a,
  area(a, { id: 'A', f: fA, from: 0.6, to: 3.4, tone: 'adj', shade: 0.3 }),
  strip(a, { id: 'h', x: 3.4, w: 0.45, top: fA, tone: 'theta', label: 'f(x)', labelY: fA(3.6) / 2 }),
  plot(a, { id: 'f', f: fA, samples: 160 }),
  tag(a, 'Atext', 2, 0.9, 'A(x)', 'center', 'adj'),
  tag(a, 'ta', 0.6, 0, 'a', 'below', 'ink'),
  tag(a, 'tx', 3.4, 0, 'x', 'below', 'ink'),
  tag(a, 'th', 3.625, fA(3.625) + 0.12, 'h', 'above', 'theta'),
  guide(a, 'b', [5.4, 0], [5.4, fA(5.4)], 'muted'),
  tag(a, 'tb', 5.4, 0, 'b', 'below', 'ink'),
  tag(a, 'name', 5.6, fA(5.6) + 0.15, 'y = f(x)', 'above', 'brand'),
]);

const video: Explainer = {
  id: 'm31-8-3',
  lessonId: 'm31-8-3',
  title: 'The Fundamental Theorem of Calculus, Part 1: Net Area and the Theorem',
  thumbnailTitle: 'The Fundamental Theorem of Calculus',
  thumbnail: 'acc',
  summary: 'A definite integral is a number: the net area between a graph and the x-axis, with area below the axis counted as negative. The fundamental theorem of calculus says ∫ₐᵇ f(x) dx = F(b) − F(a) for any antiderivative F, because the area function A(x) has A′(x) = f(x). So ∫₁³ (3x² − 2x) dx = 18 − 0 = 18, and ∫₀² (x² + 1) dx = 14/3, the area the Riemann sums closed in on.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 1', title: 'The Fundamental Theorem of Calculus', subtitle: 'Exact areas with one subtraction' }],
      lines: [
        { say: 'Adding up thousands of thin rectangles is slow, even for a computer. The fundamental theorem of calculus replaces that whole limit of sums with one subtraction.', show: 'title' },
        { say: 'It ties together the two big ideas of calculus: rates of change, which are derivatives, and accumulation, which is integrals.' },
        { say: 'In this video, you will see what a definite integral measures, learn the theorem and why it is true, and use it to find exact areas.' },
      ],
    },
    {
      chapter: 'Net area',
      layout: 'split',
      leftWidth: 560,
      left: [net],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Net area', md: 'In $\\int_a^b f(x)\\,dx$, $a$ and $b$ are the **limits of integration** and $f$ is the **integrand**. The integral is a number: the area above the $x$-axis **minus** the area below it.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\int_0^3 (x - 1)\\,dx = 2 - 0.5 = 1.5'] },
      ],
      lines: [
        { say: 'In the integral from "a" to b of f of x, d x, the numbers "a" and b are called the limits of integration, and f is the integrand. A definite integral is a number, not a function.', show: 'def' },
        { say: 'Where f is positive, each rectangle in a Riemann sum adds a positive area. But where f is negative, each product f of x i star times delta x is negative. So area below the x-axis counts as negative.', show: ['net.grid', 'net.axes', 'net.f', 'net.name'] },
        { say: 'Look at y equals x minus one, from zero to three. From one to three, the graph is above the axis, and the triangle there has area two.', show: ['net.above', 'net.na'], focus: 'net.above' },
        { say: 'From zero to one, it is below the axis, and that triangle has area 0.5. It counts as negative.', show: ['net.below', 'net.nb'], focus: 'net.below' },
        { say: 'So the integral is the net area: two minus 0.5, which is 1.5. The area above the axis, minus the area below it.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fundamental theorem of calculus', md: 'If $f$ is continuous on $[a, b]$ and $F$ is **any** antiderivative of $f$, then' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\int_a^b f(x)\\,dx = F(b) - F(a) = \\Big[F(x)\\Big]_a^b'] },
      ],
      lines: [
        { say: 'Here is the theorem. If f is continuous on the interval from "a" to b, and capital F is any antiderivative of f, then the integral from "a" to b of f of x, d x, equals F of b, minus F of "a".', show: ['def', 'm.0'] },
        { say: 'The square brackets are a short way to write it: F of x, evaluated from "a" to b, means F of b minus F of "a".', focus: 'm.0' },
        { say: 'So to find an exact area, you do not need any rectangles at all. Find an antiderivative, put in the two limits, and subtract.' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'split',
      leftWidth: 560,
      left: [accum],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(x + h) - A(x) \\approx f(x)\\cdot h', '\\dfrac{A(x + h) - A(x)}{h} \\approx f(x)', "A'(x) = f(x)", 'A(x) = F(x) + C', 'A(a) = 0 \\;\\Rightarrow\\; C = -F(a)', 'A(b) = F(b) - F(a)'] },
      ],
      lines: [
        { say: 'Why is it true? Let "A" of x be the area under f, from "a" up to x. As x moves to the right, the area grows.', show: ['acc.grid', 'acc.axes', 'acc.f', 'acc.name', 'acc.A', 'acc.Atext', 'acc.ta', 'acc.tx'], focus: 'acc.A' },
        { say: 'Move x a little, to x plus h. The area gains a thin strip, h wide and about f of x tall. So "A" of x plus h, minus "A" of x, is about f of x times h.', show: ['acc.h', 'acc.th', 'm.0'], focus: ['acc.h', 'm.0'] },
        { say: 'Divide by h. That is a difference quotient, and as h goes to zero, it becomes the derivative. So "A" prime of x equals f of x: the area function is an antiderivative of f.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'That means "A" of x is F of x plus some constant C. At x equals "a", there is no area yet, so "A" of "a" is zero, which makes C equal to negative F of "a".', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'So the whole area, out to b, is "A" of b, which equals F of b minus F of "a". That is the fundamental theorem.', show: ['m.5', 'acc.b', 'acc.tb'], focus: 'm.5' },
      ],
    },
    {
      chapter: 'Using the theorem',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int_1^3 (3x^2 - 2x)\\,dx', 'F(x) = x^3 - x^2', 'F(3) = 27 - 9 = 18, \\qquad F(1) = 1 - 1 = 0', '\\int_1^3 (3x^2 - 2x)\\,dx = \\Big[x^3 - x^2\\Big]_1^3 = 18 - 0 = 18'] },
      ],
      lines: [
        { say: 'Evaluate the integral from one to three of, three x squared minus two x, d x.', show: 'm.0', focus: 'm.0' },
        { say: 'An antiderivative is F of x equals x cubed minus x squared. No plus C is needed here. Any C would appear in both F of b and F of "a", and cancel when you subtract.', show: 'm.1', focus: 'm.1' },
        { say: 'F of three is 27 minus nine, which is eighteen. F of one is one minus one, which is zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So the integral is eighteen minus zero: eighteen. One subtraction, and no rectangles.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Back to the rectangles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int_0^2 (x^2 + 1)\\,dx = \\Big[\\dfrac{x^3}{3} + x\\Big]_0^2', '= \\left(\\dfrac{8}{3} + 2\\right) - 0 = \\dfrac{14}{3} \\approx 4.667'] },
      ],
      lines: [
        { say: 'Remember the area under x squared plus one, from zero to two? The left, right and midpoint sums closed in on about 4.667, even with a thousand rectangles.', show: 'm.0', focus: 'm.0' },
        { say: 'Now use the theorem. An antiderivative is x cubed over three, plus x. At two, that is eight thirds plus two. At zero, it is zero. So the area is exactly fourteen thirds, about 4.667: the very number the sums were closing in on.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\displaystyle\\int_1^3 (2x + 1)\\,dx$.',
          choices: ['$10$', '$12$', '$14$', '$4$'],
          answer: 0,
          working: '$F(x) = x^2 + x$, so $F(3) - F(1) = 12 - 2 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate the integral from one to three of, two x plus one, d x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, ten. An antiderivative is x squared plus x. F of three is nine plus three, which is twelve, and F of one is one plus one, which is two. Twelve minus two is ten.', show: 'q.answer' },
        { say: 'Choice B, twelve, is F of three alone: it forgets to subtract F of one.' },
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
          items: ['A definite integral is a number: the net area, with area below the $x$-axis negative.', 'Fundamental theorem: $\\int_a^b f(x)\\,dx = F(b) - F(a)$ for any antiderivative $F$.', "It works because the area function has $A'(x) = f(x)$.", 'No $+ C$ is needed: it cancels.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A definite integral is a number: the net area between the graph and the x-axis, with area below the axis counted as negative.', show: 'sum.0' },
        { say: 'The fundamental theorem says the integral from "a" to b of f equals F of b minus F of "a", for any antiderivative F.', show: 'sum.1' },
        { say: 'It works because the area function is itself an antiderivative of f.', show: 'sum.2' },
        { say: 'And no plus C is needed, because it cancels. In the next part, we integrate sine and one over x, avoid a sign mistake, and use the properties of integrals. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
