import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { area, edgeNumbers, plane, plot, tag } from './lib/m31-8-graphs.ts';

// The area under one arch of y = sin x is exactly 2.
const g = plane({ x: [0, 3.6], y: [0, 1.5], xStep: Math.PI / 4, yStep: 0.5, every: 0, width: 6, height: 3 });
const arch = figure('arch', [
  g,
  edgeNumbers(g, { xs: [Math.PI / 2, Math.PI], ys: [0.5, 1], xTex: (x) => (x < 2 ? '\\pi/2' : '\\pi') }),
  area(g, { id: 'A', f: Math.sin, from: 0, to: Math.PI, tone: 'good', shade: 0.35 }),
  plot(g, { id: 'f', f: Math.sin, from: 0, to: 3.6, samples: 160 }),
  tag(g, 'two', Math.PI / 2, 0.45, '2', 'center', 'ink'),
  tag(g, 'name', 2.95, 1.0, 'y = \\sin x', 'right', 'brand'),
]);

const video: Explainer = {
  id: 'm31-8-3-b',
  lessonId: 'm31-8-3',
  title: 'The Fundamental Theorem of Calculus, Part 2: Evaluating and Properties',
  thumbnailTitle: 'Evaluating Definite Integrals',
  thumbnail: 'arch',
  summary: 'The fundamental theorem with other antiderivatives: ∫₀^π sin x dx = 2 and ∫₁^e (1/x) dx = 1. Put F(a) in brackets, so ∫₋₁³ (3x² − 2x) dx = 18 − (−2) = 20. The properties of definite integrals (reversing the limits, constant multiples, sums and adjacent intervals) give ∫₀⁴ (2f − 5g + 1) dx = 39 from ∫₀⁴ f dx = 10 and ∫₀⁴ g dx = −3.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 2', title: 'Evaluating Definite Integrals', subtitle: 'More functions, a sign trap, and the properties' }],
      lines: [
        { say: 'With the fundamental theorem, any antiderivative you know turns into an exact area.', show: 'title' },
        { say: 'In this video, you will evaluate integrals of sine and one over x, avoid a common sign mistake, and use the properties of definite integrals to work with integrals you cannot even write down.' },
      ],
    },
    {
      chapter: 'Under a sine arch',
      layout: 'split',
      leftWidth: 560,
      left: [arch],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\int_0^{\\pi} \\sin x\\,dx = \\Big[-\\cos x\\Big]_0^{\\pi}', '= -\\cos\\pi - (-\\cos 0)', '= 1 + 1 = 2'] },
      ],
      lines: [
        { say: 'Evaluate the integral from zero to pi of sine x, d x: the area under one arch of the sine curve.', show: ['arch.grid', 'arch.axes', 'arch.f', 'arch.name', 'arch.A'], focus: 'arch.A' },
        { say: 'An antiderivative of sine x is negative cosine x. So the integral is negative cosine x, evaluated from zero to pi.', show: 'm.0', focus: 'm.0' },
        { say: 'At pi: negative cosine pi. At zero: negative cosine zero. Subtract the second from the first.', show: 'm.1', focus: 'm.1' },
        { say: 'Cosine pi is negative one, so negative cosine pi is one. Cosine zero is one, so negative cosine zero is negative one, and subtracting it adds one. The area under the arch is exactly two.', show: ['m.2', 'arch.two'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'One over x',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\int_1^{e} \\dfrac{1}{x}\\,dx = \\Big[\\ln x\\Big]_1^{e}', '= \\ln e - \\ln 1 = 1 - 0 = 1'] }],
      lines: [
        { say: 'Now the integral from one to e of one over x, d x. On this interval x is positive, so the antiderivative is the natural log of x.', show: 'm.0', focus: 'm.0' },
        { say: 'The natural log of e is one, and the natural log of one is zero. So the integral is one minus zero: one. The area under y equals one over x, from one to e, is exactly one.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtract all of F(a)', md: 'Put $F(a)$ in brackets. With $F(x) = x^3 - x^2$, $F(-1) = -1 - 1 = -2$, so the integral from $-1$ to $3$ is $18 - (-2) = 20$, **not** $18 - 2$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\int_{-1}^{3} (3x^2 - 2x)\\,dx = F(3) - F(-1)', '= 18 - (\\bad{-2}) = 20'] },
      ],
      lines: [
        { say: 'Here is a common mistake. Evaluate the integral from negative one to three of, three x squared minus two x. The antiderivative is x cubed minus x squared, and F of three is eighteen, as before.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'F of negative one is negative one cubed, which is negative one, minus negative one squared, which is one. That is negative two.', focus: 'oops' },
        { say: 'Now subtract all of it, in brackets: eighteen minus, negative two, which is twenty. Writing eighteen minus two loses the sign, and gives sixteen. Always put F of "a" in brackets.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Properties',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\int_a^a f(x)\\,dx = 0, \\qquad \\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx', '\\int_a^b k\\,f(x)\\,dx = k\\int_a^b f(x)\\,dx', '\\int_a^b \\big(f(x) \\pm g(x)\\big)\\,dx = \\int_a^b f(x)\\,dx \\pm \\int_a^b g(x)\\,dx', '\\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx = \\int_a^c f(x)\\,dx'],
        },
      ],
      lines: [
        { say: 'Definite integrals have some useful properties. An integral from "a" to "a" is zero: there is no width, so there is no area. And swapping the limits changes the sign, because F of "a" minus F of b is the negative of F of b minus F of "a".', show: 'm.0', focus: 'm.0' },
        { say: 'A constant factor can come outside the integral.', show: 'm.1', focus: 'm.1' },
        { say: 'The integral of a sum or difference is the sum or difference of the integrals.', show: 'm.2', focus: 'm.2' },
        { say: 'And integrals over side-by-side intervals add up: the area from "a" to b, plus the area from b to c, is the area from "a" to c.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Using the properties',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Given $\\int_0^4 f(x)\\,dx = 10$ and $\\int_0^4 g(x)\\,dx = -3$, find $\\int_0^4 \\big(2f(x) - 5g(x) + 1\\big)\\,dx$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['= 2\\int_0^4 f(x)\\,dx - 5\\int_0^4 g(x)\\,dx + \\int_0^4 1\\,dx', '= 2(10) - 5(-3) + 4', '= 20 + 15 + 4 = 39'] },
      ],
      lines: [
        { say: 'Suppose the integral from zero to four of f is ten, and the integral from zero to four of g is negative three. Find the integral from zero to four of, two f, minus five g, plus one. We do not even know what f and g are.', show: 'p' },
        { say: 'Split the integral, and bring out the constants: two times the integral of f, minus five times the integral of g, plus the integral of one.', show: 'm.0', focus: 'm.0' },
        { say: 'The integral of one from zero to four is a rectangle, one high and four wide: four. So the total is two times ten, minus five times negative three, plus four.', show: 'm.1', focus: 'm.1' },
        { say: 'That is twenty, plus fifteen, plus four: 39.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Given $\\int_0^5 f(x)\\,dx = 8$ and $\\int_0^2 f(x)\\,dx = 3$, find $\\int_5^2 f(x)\\,dx$.',
          choices: ['$5$', '$11$', '$-11$', '$-5$'],
          answer: 3,
          working: '$\\int_2^5 f(x)\\,dx = 8 - 3 = 5$, and reversing the limits changes the sign: $\\int_5^2 f(x)\\,dx = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. The integral from zero to five of f is eight, and the integral from zero to two of f is three. Find the integral from five to two of f. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, negative five. The interval from zero to five is zero to two, plus two to five. So the integral from two to five is eight minus three, which is five. Then reversing the limits, from five to two, changes the sign: negative five.', show: 'q.answer' },
        { say: 'Choice A, five, is the integral from two to five. The limits in the question go the other way.' },
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
          items: ['$\\int_0^{\\pi} \\sin x\\,dx = 2$ and $\\int_1^{e} \\dfrac{1}{x}\\,dx = 1$.', 'Put $F(a)$ in brackets before subtracting.', 'Reversing the limits changes the sign.', 'Integrals split over sums, constant multiples and side-by-side intervals.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The area under one arch of sine is two, and the integral of one over x from one to e is one.', show: 'sum.0' },
        { say: 'Put F of "a" in brackets before you subtract.', show: 'sum.1' },
        { say: 'Reversing the limits changes the sign of an integral.', show: 'sum.2' },
        { say: 'And integrals split over sums, constant multiples and side-by-side intervals. In the next part, we compare net area with total area, and find the average value of a function. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
