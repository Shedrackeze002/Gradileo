import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, note, num, plane, plot, signChart, tangent } from './lib/m31-6-graphs.ts';

// f(x) = x³ − 3x² − 9x + 2: a local maximum at (−1, 7) and a local minimum at (3, −25).
const f = (x: number) => x ** 3 - 3 * x * x - 9 * x + 2;
const g = plane({ x: [-3, 5], y: [-35, 15], xStep: 1, yStep: 5, every: 0, width: 5.4, height: 6.4 });

// y = x³: a horizontal tangent at the origin, but no turn.
const k = plane({ x: [-1.8, 1.8], y: [-3, 3], xStep: 1, yStep: 1, every: 0, width: 4.4, height: 4.4 });

// The graph of f′(x) = 3x² − 6x − 9, crossing the x-axis at −1 (downward) and 3 (upward).
const d = plane({ x: [-3, 5], y: [-15, 30], xStep: 1, yStep: 5, every: 0, width: 6.4, height: 5.6 });

const video: Explainer = {
  id: 'm31-6-2-c',
  lessonId: 'm31-6-2',
  title: 'Increasing, Decreasing and Extreme Values, Part 3: The First Derivative Test',
  thumbnailTitle: 'The First Derivative Test',
  thumbnail: 'fd',
  summary: 'Local maximum and minimum values, and the first derivative test: where f′ changes from + to −, f has a local maximum; from − to +, a local minimum; with no change of sign, neither. A sign chart for f(x) = x³ − 3x² − 9x + 2 gives a local maximum (−1, 7) and a local minimum (3, −25); y = x³ has a horizontal tangent but no extremum; and how to read the extrema of f from the graph of f′.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 3', title: 'The First Derivative Test', subtitle: 'Finding the hills and valleys' }],
      lines: [
        { say: 'On a trail, a summit is where you stop climbing and start descending. A valley is where you stop descending and start climbing.', show: 'title' },
        { say: 'In this video, you will use that idea, with a sign chart for the derivative, to find the local maximum and minimum values of a function.' },
      ],
    },
    {
      chapter: 'Local maximum and minimum',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Local maximum and local minimum', md: '$f(c)$ is a **local maximum** value if $f(c) \\ge f(x)$ for all $x$ near $c$, and a **local minimum** value if $f(c) \\le f(x)$ for all $x$ near $c$.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ["$f'$ changes from $+$ to $-$ at $c$: a **local maximum**.", "$f'$ changes from $-$ to $+$ at $c$: a **local minimum**.", "$f'$ does not change sign: **no** local extremum."],
        },
      ],
      lines: [
        { say: 'f of c is a local maximum value if it is at least as big as every nearby value of f: the top of a hill. It is a local minimum value if it is at most every nearby value: the bottom of a valley.', show: 'def' },
        { say: 'The first derivative test finds them at the critical numbers. If f prime changes from positive to negative at c, the graph stops rising and starts falling: f has a local maximum.', show: 'b.0' },
        { say: 'If f prime changes from negative to positive, the graph stops falling and starts rising: a local minimum.', show: 'b.1' },
        { say: 'And if f prime does not change sign, there is no local maximum or minimum there.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A sign chart',
      layout: 'split',
      leftWidth: 430,
      left: [
        figure('fd', [
          g,
          edgeNumbers(g, { xs: [-2, 0, 2, 4], ys: [-30, -20, -10, 0, 10], xTex: num, yTex: num }),
          plot(g, { id: 'f', f, samples: 200 }),
          dots(g, [
            { id: 'max', x: -1, y: 7, tex: '\\text{max}', tone: 'good', place: 'above left' },
            { id: 'min', x: 3, y: -25, tex: '\\text{min}', tone: 'bad', place: 'below' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f'(x) = 3(x + 1)(x - 3)", "f'(-2) = 15, \\; f'(0) = -9, \\; f'(4) = 15"] },
        figure('sc', [signChart({ name: 's', title: "f'(x)", marks: ['-1', '3'], signs: ['+', '-', '+'], notes: ['\\Large\\nearrow', '\\Large\\searrow', '\\Large\\nearrow'], width: 9 })], 230),
        { kind: 'math', id: 'a', size: 'md', align: 'left', lines: ['\\text{local max } f(-1) = 7', '\\text{local min } f(3) = -25'] },
      ],
      lines: [
        { say: 'Find the local extreme values of f of x equals x cubed, minus three x squared, minus nine x, plus two. From the last part, f prime of x is three times x plus one, times x minus three, so the critical numbers are negative one and three.', show: ['fd.grid', 'fd.axes', 'fd.f', 'm.0', 'sc.s-base', 'sc.s-mk0', 'sc.s-mk1'] },
        { say: 'They split the number line into three intervals. Test one value in each: f prime of negative two is fifteen, f prime of zero is negative nine, and f prime of four is fifteen.', show: ['m.1', 'sc.s-i0', 'sc.s-i1', 'sc.s-i2'], focus: 'm.1' },
        { say: 'At negative one, f prime changes from positive to negative, so f has a local maximum: f of negative one is negative one, minus three, plus nine, plus two, which is seven.', show: ['a.0', 'fd.max'], focus: ['a.0', 'fd.max'] },
        { say: 'At three, f prime changes from negative to positive, so f has a local minimum: f of three is 27, minus 27, minus 27, plus two, which is negative 25.', show: ['a.1', 'fd.min'], focus: ['a.1', 'fd.min'] },
        { say: 'So f increases on the intervals from negative infinity to negative one, and from three to infinity, and decreases between negative one and three.', focus: 'fd.f' },
      ],
    },
    {
      chapter: 'No sign change',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('cu', [
          k,
          edgeNumbers(k, { xs: [-1, 0, 1], ys: [-2, 0, 2], xTex: num, yTex: num }),
          plot(k, { id: 'f', f: (x) => x ** 3, samples: 200 }),
          tangent(k, { id: 't', a: 0, y: 0, m: 0, left: 1, right: 1, tone: 'theta', dot: '' }),
          note(k, { id: 'f-t', x: 1.15, y: -1.6, tex: 'y = x^{3}', tone: 'brand' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ["f'(x) = 3x^{2}, \\quad f'(0) = 0"] },
        figure('sc', [signChart({ name: 's', title: "f'(x)", marks: ['0'], signs: ['+', '+'], notes: ['\\Large\\nearrow', '\\Large\\nearrow'], width: 8 })], 230),
        { kind: 'text', id: 'k', md: 'No change of sign, so **no** local extremum at $0$.' },
      ],
      lines: [
        { say: 'A zero of the derivative is not automatically a maximum or minimum. Take f of x equals x cubed. Its derivative, three x squared, is zero at x equals zero.', show: ['cu.grid', 'cu.axes', 'cu.f', 'cu.f-t', 'm.0', 'cu.t-all'] },
        { say: 'But three x squared is positive on both sides of zero, so the sign chart shows plus, then plus.', show: ['sc.s-base', 'sc.s-mk0', 'sc.s-i0', 'sc.s-i1'] },
        { say: 'The graph flattens out for an instant at the origin, then keeps on rising. There is no local maximum or minimum there.', show: 'k', focus: 'cu.f' },
      ],
    },
    {
      chapter: 'Reading the graph of f′',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('dp', [
          d,
          edgeNumbers(d, { xs: [-2, 0, 2, 4], ys: [-10, 0, 10, 20, 30], xTex: num, yTex: num }),
          plot(d, { id: 'fp', f: (x) => 3 * x * x - 6 * x - 9, tone: 'opp', samples: 200 }),
          note(d, { id: 'fp-t', x: 1.7, y: 21, tex: "y = f'(x)", tone: 'opp' }),
          dots(d, [
            { id: 'a', x: -1, y: 0, tone: 'good', group: 'a-all' },
            { id: 'b', x: 3, y: 0, tone: 'bad', group: 'b-all' },
          ]),
          note(d, { id: 'a-t', x: -2.0, y: -6.5, tex: '\\text{max of } f', tone: 'good', group: 'a-all' }),
          note(d, { id: 'b-t', x: 4.05, y: -6.5, tex: '\\text{min of } f', tone: 'bad', group: 'b-all' }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: "Given the graph of f′", md: "Look at where the graph of $f'$ is above or below the $x$-axis. $f$ has a local maximum where $f'$ crosses from above to below, and a local minimum where it crosses from below to above." },
      ],
      lines: [
        { say: 'Sometimes you are given the graph of the derivative, not of the function. Then look at where the graph of f prime is above or below the x-axis.', show: 'tip' },
        { say: 'Here is the graph of f prime for our cubic. It is above the axis, then below it, then above again.', show: ['dp.grid', 'dp.axes', 'dp.fp', 'dp.fp-t'] },
        { say: 'Where it crosses from above to below, at negative one, f changes from rising to falling: a local maximum of f. Where it crosses from below to above, at three, f has a local minimum.', show: ['dp.a-all', 'dp.b-all'], focus: ['dp.a-all', 'dp.b-all'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is a local maximum of $f(x) = x^{3} - 12x + 5$?',
          choices: ['$(2, -11)$', '$(0, 5)$', '$(-2, 21)$', '$(2, 21)$'],
          answer: 2,
          working: "$f'(x) = 3(x + 2)(x - 2)$ changes from $+$ to $-$ at $x = -2$, so $f$ has a local maximum $f(-2) = -8 + 24 + 5 = 21$.",
        },
      ],
      lines: [
        { say: 'Your turn. Which point is a local maximum of f of x equals x cubed, minus twelve x, plus five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. f prime of x is three times x plus two, times x minus two. It changes from positive to negative at negative two, so f has a local maximum there: f of negative two is negative eight, plus 24, plus five, which is 21.', show: 'q.answer' },
        { say: 'Choice A is the local minimum, where f prime changes from negative to positive.' },
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
          items: ["Make a sign chart of $f'$, cut at the critical numbers.", "$+$ to $-$: local maximum. $-$ to $+$: local minimum.", 'No change of sign: no local extremum.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Make a sign chart for f prime, cut at the critical numbers, and test a value in each interval.', show: 'sum.0' },
        { say: 'Where f prime changes from positive to negative, f has a local maximum. From negative to positive, a local minimum.', show: 'sum.1' },
        { say: 'And with no change of sign, there is neither. In the next part, we find the absolute highest and lowest values of a function on an interval. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
