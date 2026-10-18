import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, num, plane, plot, signChart } from './lib/m31-6-graphs.ts';

const R3 = Math.sqrt(3);

// f(x) = x³ − 3x: local max (−1, 2), local min (1, −2), inflection (0, 0), x-intercepts 0 and ±√3.
const f = (x: number) => x ** 3 - 3 * x;
const fp = (x: number) => 3 * x * x - 3;
const g = plane({ x: [-2.5, 2.5], y: [-4, 4], xStep: 0.5, yStep: 1, every: 0, width: 5, height: 8 });

const video: Explainer = {
  id: 'm31-6-3-d',
  lessonId: 'm31-6-3',
  title: 'Concavity and Curve Sketching, Part 4: Curve Sketching',
  thumbnailTitle: 'Curve Sketching',
  thumbnail: 'sk',
  summary: 'Sketching y = f(x) by hand: find the intercepts, a sign chart for f′ (increase, decrease and local extrema) and a sign chart for f″ (concavity and points of inflection), then join the key points with the right shape. For f(x) = x³ − 3x: local maximum (−1, 2), local minimum (1, −2), point of inflection (0, 0); how the graphs of f and f′ match feature by feature; and why "f′ is negative" differs from "f′ is decreasing".',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 4', title: 'Curve Sketching', subtitle: 'Putting the first and second derivatives together' }],
      lines: [
        { say: 'The first derivative tells you where a graph rises and falls. The second derivative tells you how it bends.', show: 'title' },
        { say: 'Together, they are enough to sketch a curve by hand, with every hill, valley and bend in the right place. In this video, you will sketch y equals x cubed minus three x.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['The **domain** and the **intercepts**.', "A sign chart for $f'$: increasing, decreasing, and local extrema.", "A sign chart for $f''$: concavity and points of inflection.", 'Plot the key points, and join them with the right shape on each interval.'],
        },
      ],
      lines: [
        { say: 'To sketch y equals f of x, gather the information first. Step one: the domain, and the intercepts.', show: 'b.0' },
        { say: 'Step two: a sign chart for f prime, to see where f increases and decreases, and where its local maximum and minimum values are.', show: 'b.1' },
        { say: 'Step three: a sign chart for f double prime, to see where f is concave up or down, and where its points of inflection are.', show: 'b.2' },
        { say: 'Step four: plot the key points, and join them with the right shape on each interval.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Intercepts',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x) = x^{3} - 3x = x(x^{2} - 3)', 'x = 0 \\quad\\text{or}\\quad x = \\pm\\sqrt{3} \\approx \\pm 1.73', 'f(0) = 0'],
        },
      ],
      lines: [
        { say: 'Sketch f of x equals x cubed minus three x. It is a polynomial, so its domain is all real numbers.', show: 'm.0', focus: 'm.0' },
        { say: 'For the x-intercepts, factor: x times x squared minus three. That is zero when x is zero, or when x squared is three: x is plus or minus the square root of three, about 1.73.', show: 'm.1', focus: 'm.1' },
        { say: 'And f of zero is zero, so the graph passes through the origin.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two sign charts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ["f'(x) = 3x^{2} - 3 = 3(x + 1)(x - 1) \\qquad f''(x) = 6x"] },
        figure('sc', [
          signChart({ name: 'a', title: "f'(x)", marks: ['-1', '1'], signs: ['+', '-', '+'], notes: ['\\Large\\nearrow', '\\Large\\searrow', '\\Large\\nearrow'], width: 12 }),
          signChart({ name: 'b', at: [0, -3.4], title: "f''(x)", marks: ['0'], signs: ['-', '+'], notes: ['\\text{concave down}', '\\text{concave up}'], width: 12 }),
        ]),
      ],
      lines: [
        { say: 'Now the derivatives. f prime of x is three x squared minus three, which is three times x plus one, times x minus one. And f double prime of x is six x.', show: 'm' },
        { say: 'f prime is zero at negative one and one. It is positive outside them and negative between them. So f rises to negative one, falls to one, then rises again.', show: ['sc.a-base', 'sc.a-mk0', 'sc.a-mk1', 'sc.a-i0', 'sc.a-i1', 'sc.a-i2'] },
        { say: 'That gives a local maximum, f of negative one, which is negative one plus three: two. And a local minimum, f of one, which is one minus three: negative two.' },
        { say: 'f double prime, six x, is negative for x below zero and positive above it. So the graph is concave down, then concave up, with a point of inflection at the origin.', show: ['sc.b-base', 'sc.b-mk0', 'sc.b-i0', 'sc.b-i1'] },
      ],
    },
    {
      chapter: 'The sketch',
      layout: 'split',
      leftWidth: 470,
      left: [
        figure('sk', [
          g,
          edgeNumbers(g, { xs: [-2, -1, 0, 1, 2], ys: [-4, -2, 0, 2, 4], xTex: num, yTex: num }),
          dots(g, [
            { id: 'max', x: -1, y: 2, tone: 'good', group: 'key' },
            { id: 'min', x: 1, y: -2, tone: 'bad', group: 'key' },
            { id: 'ip', x: 0, y: 0, tex: '', tone: 'theta', group: 'key' },
            { id: 'xl', x: -R3, y: 0, tex: '', tone: 'adj', group: 'key' },
            { id: 'xr', x: R3, y: 0, tex: '', tone: 'adj', group: 'key' },
          ]),
          plot(g, { id: 'f', f, samples: 240 }),
          plot(g, { id: 'fp', f: fp, tone: 'opp', dashed: true, samples: 200 }),
        ]),
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Local maximum $(-1, 2)$, local minimum $(1, -2)$.', 'Point of inflection $(0, 0)$.', "Dashed: $y = f'(x)$. A turning point of $f$ is a zero of $f'$.", "An inflection point of $f$ is a turning point of $f'$."],
        },
      ],
      lines: [
        { say: 'Plot the key points: the local maximum at negative one, two, the local minimum at one, negative two, the point of inflection at the origin, and the x-intercepts at plus or minus the square root of three.', show: ['sk.grid', 'sk.axes', 'sk.key', 'b.0', 'b.1'] },
        { say: 'Now join them with the right shape: rising and concave down up to the hill, falling through the origin, where the bend switches, and rising and concave up after the valley.', show: 'sk.f', focus: 'sk.f' },
        { say: 'Here is the graph of f prime, dashed, on the same axes. It is zero exactly where f turns, and above the axis wherever f rises.', show: ['sk.fp', 'b.2'], focus: ['sk.fp', 'b.2'] },
        { say: 'And f prime is lowest at the origin, exactly where f changes concavity. The point of inflection of f is a turning point of f prime.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Sign versus direction', md: "\"$f'$ is negative\" and \"$f'$ is increasing\" are different statements. On $(0, 1)$, $f'$ is negative **and** increasing, so $f$ is decreasing **and** concave up there." },
        {
          kind: 'table',
          id: 't',
          head: ["What $f'$ does", 'What it tells you about $f$'],
          rows: [
            ["$f' < 0$ (its **sign**)", '$f$ is decreasing'],
            ["$f'$ increasing (its **direction**)", '$f$ is concave up'],
          ],
        },
      ],
      lines: [
        { say: 'Watch out: the sign of f prime and the direction of f prime are different things.', show: 'oops' },
        { say: 'Between zero and one, f prime is negative. Its sign tells you that f is decreasing there.', show: 't.0', focus: 't.0' },
        { say: 'But on the same interval, f prime is increasing: its graph is climbing up toward zero. Its direction tells you that f is concave up. So between zero and one, f is decreasing and concave up, at the same time.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which describes $f(x) = x^{3} - 3x$ on the interval $(-1, 0)$?',
          choices: ['Decreasing and concave down', 'Decreasing and concave up', 'Increasing and concave down', 'Increasing and concave up'],
          answer: 0,
          working: "On $(-1, 0)$, $f'(x) = 3(x + 1)(x - 1) < 0$, so $f$ is decreasing, and $f''(x) = 6x < 0$, so $f$ is concave down.",
        },
      ],
      lines: [
        { say: 'Your turn. Which describes f of x equals x cubed minus three x on the interval from negative one to zero? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. On that interval, f prime is negative, so f is decreasing. And f double prime, six x, is negative, so f is concave down. Choice B would be right on the interval from zero to one, where six x is positive.', show: 'q.answer' },
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
          items: ["Gather the intercepts, a sign chart for $f'$ and a sign chart for $f''$.", 'Plot the key points, then join them with the right shape.', "The sign of $f'$ gives rising or falling; the direction of $f'$ gives the concavity."],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To sketch a curve, gather the intercepts, a sign chart for f prime, and a sign chart for f double prime.', show: 'sum.0' },
        { say: 'Plot the key points, then join them with the right shape on each interval.', show: 'sum.1' },
        { say: 'And remember: the sign of f prime tells you whether f rises or falls, and the direction of f prime tells you how f bends. Next, we use derivatives to describe motion along a line. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
