import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, edgeNumbers, num, plane, plot, vline } from './lib/m31-6-graphs.ts';

// f(x) = x³ − 3x² − 9x + 2 on the closed interval [−2, 4].
const f = (x: number) => x ** 3 - 3 * x * x - 9 * x + 2;
const g = plane({ x: [-3, 5], y: [-35, 15], xStep: 1, yStep: 5, every: 0, width: 5.4, height: 6.4 });

const video: Explainer = {
  id: 'm31-6-2-d',
  lessonId: 'm31-6-2',
  title: 'Increasing, Decreasing and Extreme Values, Part 4: Absolute Extrema',
  thumbnailTitle: 'Absolute Maximum and Minimum',
  thumbnail: 'ab',
  summary: 'The absolute maximum and minimum of a continuous function on a closed interval [a, b] exist (the Extreme Value Theorem) and occur at critical numbers or endpoints. The closed interval method compares f at both: f(x) = x³ − 3x² − 9x + 2 on [−2, 4] has absolute maximum 7 at x = −1 and absolute minimum −25 at x = 3, while on [−2, 6] the endpoint value f(6) = 56 wins.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Applications of Derivatives · Part 4', title: 'Absolute Extrema', subtitle: 'The highest and lowest values on an interval' }],
      lines: [
        { say: 'A hike covers only part of a trail, from a start to a finish. The highest point of the hike might be a summit, or it might be where the hike ends.', show: 'title' },
        { say: 'In this video, you will find the absolute highest and lowest values of a function on a closed interval.' },
      ],
    },
    {
      chapter: 'Absolute extrema',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Absolute maximum and minimum', md: 'The **absolute maximum** of $f$ on an interval is the largest value of $f$ there, and the **absolute minimum** is the smallest.' },
        { kind: 'callout', id: 'thm', tone: 'key', title: 'Extreme Value Theorem', md: 'If $f$ is continuous on a closed interval $[a, b]$, it has an absolute maximum and an absolute minimum there, and each occurs at a **critical number** or at an **endpoint**.' },
      ],
      lines: [
        { say: 'The absolute maximum of f on an interval is the largest value f takes there. The absolute minimum is the smallest.', show: 'def' },
        { say: 'The extreme value theorem says that if f is continuous on a closed interval, from "a" to b with both ends included, then both of these exist.', show: 'thm' },
        { say: 'And each one occurs either at a critical number, the top of a hill or the bottom of a valley, or at an endpoint of the interval. So those are the only places to check.' },
      ],
    },
    {
      chapter: 'The closed interval method',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Find the critical numbers of $f$ inside $(a, b)$.', 'Evaluate $f$ at those critical numbers **and** at the endpoints $a$ and $b$.', 'The largest value is the absolute maximum; the smallest is the absolute minimum.'],
        },
      ],
      lines: [
        { say: 'That gives the closed interval method, in three steps. First, find the critical numbers of f inside the interval.', show: 'b.0' },
        { say: 'Second, evaluate f at those critical numbers, and at both endpoints.', show: 'b.1' },
        { say: 'Third, compare. The largest value is the absolute maximum, and the smallest is the absolute minimum. No sign chart is needed.', show: 'b.2' },
      ],
    },
    {
      chapter: 'On a closed interval',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('ab', [
          g,
          edgeNumbers(g, { xs: [-2, 0, 2, 4], ys: [-30, -20, -10, 0, 10], xTex: num, yTex: num }),
          plot(g, { id: 'all', f, tone: 'muted', dashed: true, samples: 200 }),
          vline(g, { id: 'a', x: -2, tone: 'adj', group: 'ends' }),
          vline(g, { id: 'b', x: 4, tone: 'adj', group: 'ends' }),
          plot(g, { id: 'f', f, from: -2, to: 4, samples: 200 }),
          dots(g, [
            { id: 'pa', x: -2, y: 0, tone: 'adj', group: 'pts' },
            { id: 'pc', x: -1, y: 7, tex: '\\text{max}', tone: 'good', place: 'above', group: 'pts' },
            { id: 'pd', x: 3, y: -25, tex: '\\text{min}', tone: 'bad', place: 'below', group: 'pts' },
            { id: 'pb', x: 4, y: -18, tone: 'adj', group: 'pts' },
          ]),
        ]),
      ],
      right: [
        { kind: 'text', id: 'q', md: 'Find the absolute maximum and minimum of $f(x) = x^{3} - 3x^{2} - 9x + 2$ on $[-2, 4]$.' },
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$f(x)$', ''],
          rows: [
            ['$-2$', '$0$', 'endpoint'],
            ['$-1$', '$\\good{7}$', 'absolute max'],
            ['$3$', '$\\bad{-25}$', 'absolute min'],
            ['$4$', '$-18$', 'endpoint'],
          ],
        },
      ],
      lines: [
        { say: 'Find the absolute maximum and minimum of f of x equals x cubed, minus three x squared, minus nine x, plus two, on the closed interval from negative two to four.', show: ['q', 'ab.grid', 'ab.axes', 'ab.all', 'ab.ends', 'ab.f'] },
        { say: 'The critical numbers are negative one and three, and both are inside the interval.' },
        { say: 'Evaluate f at the left endpoint, negative two: negative eight, minus twelve, plus eighteen, plus two, which is zero.', show: ['t.0', 'ab.pa'], focus: 't.0' },
        { say: 'At the critical numbers, f of negative one is seven, and f of three is negative 25. At the right endpoint, f of four is 64, minus 48, minus 36, plus two: negative eighteen.', show: ['t.1', 't.2', 't.3', 'ab.pc', 'ab.pd', 'ab.pb'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'Compare the four values. The largest is seven, so the absolute maximum is seven, at x equals negative one. The smallest is negative 25, so the absolute minimum is negative 25, at x equals three.', focus: ['t.1', 't.2', 'ab.pc', 'ab.pd'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the endpoints', md: 'A summit is not always the highest point of the interval. **Always** evaluate $f$ at the endpoints too.' },
        {
          kind: 'table',
          id: 't',
          head: ['Interval', 'Local max', 'Right endpoint', 'Absolute max'],
          rows: [
            ['$[-2, 4]$', '$f(-1) = 7$', '$f(4) = -18$', '$7$'],
            ['$[-2, 5]$', '$f(-1) = 7$', '$f(5) = 7$', '$7$ (a tie)'],
            ['$[-2, 6]$', '$f(-1) = 7$', '$f(6) = 56$', '$\\bad{56}$'],
          ],
        },
      ],
      lines: [
        { say: 'Watch out: do not forget the endpoints. The top of a hill is not always the highest point of the interval.', show: 'oops' },
        { say: 'On the interval from negative two to four, the local maximum, seven, is the absolute maximum.', show: 't.0', focus: 't.0' },
        { say: 'On the interval from negative two to five, f of five is 125, minus 75, minus 45, plus two: seven. That ties the local maximum.', show: 't.1', focus: 't.1' },
        { say: 'But on the interval from negative two to six, f of six is 56, far above the hill. The absolute maximum is at the endpoint. The graph keeps rising after its valley, and the longer interval lets it climb higher.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the absolute maximum value of $f(x) = x^{3} - 12x + 5$ on $[-3, 5]$.',
          choices: ['$21$', '$14$', '$-11$', '$70$'],
          answer: 3,
          working: 'The critical numbers $-2$ and $2$ are in the interval. $f(-3) = 14$, $f(-2) = 21$, $f(2) = -11$ and $f(5) = 70$, so the absolute maximum is $70$, at $x = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the absolute maximum value of f of x equals x cubed, minus twelve x, plus five, on the closed interval from negative three to five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The critical numbers, negative two and two, are both in the interval. f of negative three is 14, f of negative two is 21, f of two is negative eleven, and f of five is 70. The largest is 70, at the endpoint five. Choice A is the local maximum, which the endpoint beats.', show: 'q.answer' },
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
          items: ['On a closed interval, a continuous function has an absolute maximum and minimum.', 'They occur at critical numbers or endpoints.', 'Evaluate $f$ at all of them, and compare.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. On a closed interval, a continuous function has an absolute maximum and an absolute minimum.', show: 'sum.0' },
        { say: 'They occur at critical numbers, or at the endpoints.', show: 'sum.1' },
        { say: 'So evaluate f at all of them, and compare. Next, we see how the second derivative describes the way a graph bends. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
