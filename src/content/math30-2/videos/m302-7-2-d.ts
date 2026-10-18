import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, retitle, steps, vline } from './lib/m302-7-graphs.ts';

const PI = Math.PI;

/** y = sin θ over one cycle, θ in radians. */
const s = retitle(plane({ x: [0, 2 * PI], y: [-1.5, 1.5], xStep: PI / 4, yStep: 0.5, every: 0, width: 6.4, height: 3 }), '\\theta');

/** Hours of daylight in Grande Prairie on day n. */
const L = (n: number) => 5.07 * Math.sin(0.0172 * n - 1.39) + 12.16;
const g = retitle(plane({ x: [0, 370], y: [0, 20], xStep: 30, yStep: 2, every: 0, width: 7.4, height: 4, titles: { y: 'L\\text{ (h)}' } }), 'n');
const top = (PI / 2 + 1.39) / 0.0172;
/** y = 3 sin(0.5t + 2) + 5, whose first maximum after t = 0 is one period after t = −0.858. */
const k = retitle(plane({ x: [0, 26], y: [0, 10], xStep: 2, yStep: 1, every: 0, width: 6.4, height: 3.4 }), 't');
const first = (PI / 2 - 2) / 0.5 + 4 * PI;
const bottom = ((3 * PI) / 2 + 1.39) / 0.0172;

const video: Explainer = {
  id: 'm302-7-2-d',
  lessonId: 'm302-7-2',
  title: 'Modelling Data with Sinusoidal Functions, Part 4: When Is the Maximum?',
  thumbnailTitle: 'When Is the Maximum?',
  thumbnail: 'g',
  summary: 'A sinusoidal model y = a sin(bx + c) + d reaches its maximum when the angle bx + c equals π/2 and its minimum when it equals 3π/2. Worked examples: the longest day in the daylight model (day 172, June 21) and the shortest (day 355), the top of a Ferris wheel (about 30.0 s, 26.4 m), and adding the period when the time comes out before the data start.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 4', title: 'When Is the Maximum?', subtitle: 'Set the angle equal to $\\frac{\\pi}{2}$' }],
      lines: [
        { say: 'A model can tell you more than a value on a given day. It can also tell you when the highest and lowest values happen.', show: 'title' },
        { say: 'In this video, you will find when a sinusoidal model reaches its maximum and its minimum: the longest and shortest days of the year, and the moment a rider reaches the top of a Ferris wheel.' },
      ],
    },
    {
      chapter: 'Where sine is greatest',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('s', [
          s,
          edgeNumbers(s, { xs: steps(0, 2 * PI, PI / 2), ys: [-1, 0, 1] }),
          plot(s, { id: 'curve', f: Math.sin, samples: 240 }),
          dots(s, [
            { id: 'M', x: PI / 2, y: 1, tone: 'good' },
            { id: 'N', x: (3 * PI) / 2, y: -1, tone: 'opp' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\good{\\sin\\theta = 1 \\text{ when } \\theta = \\tfrac{\\pi}{2}}', '\\opp{\\sin\\theta = -1 \\text{ when } \\theta = \\tfrac{3\\pi}{2}}', '(\\text{plus any multiple of } 2\\pi)', 'y = a\\sin(\\thc{bx + c}) + d'],
        },
      ],
      lines: [
        { say: 'Here is the sine of an angle theta, for one cycle, with theta in radians. The sine is greatest, one, when the angle is pi over two.', show: ['s.grid', 's.axes', 's.curve', 's.M', 'm.0'], focus: ['s.M', 'm.0'] },
        { say: 'It is least, negative one, when the angle is three pi over two.', show: ['s.N', 'm.1'], focus: ['s.N', 'm.1'] },
        { say: 'And because sine repeats every two pi, the same happens again every two pi.', show: 'm.2', focus: 'm.2' },
        { say: 'In a model, y equals "a" sine, b x plus c, plus d, the angle is b x plus c. With "a" positive, the model reaches its maximum when b x plus c equals pi over two, and its minimum when b x plus c equals three pi over two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The longest day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'On which day of the year does $L(n) = 5.07\\sin(0.0172n - 1.39) + 12.16$ give the most daylight?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.0172n - 1.39 = \\dfrac{\\pi}{2}', '0.0172n = \\dfrac{\\pi}{2} + 1.39', 'n = \\dfrac{\\pi/2 + 1.39}{0.0172} = 172.1\\ldots'] },
      ],
      lines: [
        { say: 'On which day of the year does the daylight model for Grande Prairie give the most daylight?', show: 'p' },
        { say: 'The most daylight is the maximum, so set the angle equal to pi over two: 0.0172 n minus 1.39 equals pi over two.', show: 'm.0', focus: 'm.0' },
        { say: 'Add 1.39 to both sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide by 0.0172. Pi over two is about 1.5708; adding 1.39 gives about 2.9608, and dividing by 0.0172 gives 172.1 and a bit.', show: 'm.2', focus: 'm.2' },
        { say: 'So the longest day is day 172. Counting the days in each month, that is June 21st.' },
      ],
    },
    {
      chapter: 'The shortest day',
      layout: 'split',
      leftWidth: 640,
      left: [
        figure('g', [
          g,
          edgeNumbers(g, { xs: steps(0, 360, 60), ys: steps(0, 20, 4), xTex: String }),
          vline(g, { id: 'v1', x: top, tone: 'good', label: '172', group: 'v1' }),
          vline(g, { id: 'v2', x: bottom, tone: 'opp', label: '355', group: 'v2' }),
          plot(g, { id: 'curve', f: L, from: 0, to: 370, samples: 300 }),
          dots(g, [
            { id: 'M', x: top, y: L(top), tone: 'good' },
            { id: 'N', x: bottom, y: L(bottom), tone: 'opp' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0.0172n - 1.39 = \\dfrac{3\\pi}{2}', 'n = \\dfrac{3\\pi/2 + 1.39}{0.0172}', '= 354.7\\ldots'] }],
      lines: [
        { say: 'The same method finds the shortest day. Set the angle equal to three pi over two.', show: ['g.grid', 'g.axes', 'g.curve', 'm.0'], focus: 'm.0' },
        { say: 'Then n is three pi over two plus 1.39, all over 0.0172, which is 354.7 and a bit, so the shortest day is day 355: December 21st.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The graph agrees. The curve peaks at day 172 and is lowest at day 355, just as the algebra says.', show: ['g.v1', 'g.M', 'g.v2', 'g.N'], focus: ['g.M', 'g.N'] },
      ],
    },
    {
      chapter: 'The top of the wheel',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A rider’s height on a Ferris wheel is $h(t) = 12.1\\sin(0.1047t - 1.57) + 14.3$, in metres, $t$ seconds after the ride starts. When is the rider first at the top, and how high is that?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.1047t - 1.57 = \\dfrac{\\pi}{2}', 't = \\dfrac{\\pi/2 + 1.57}{0.1047} = 29.99\\ldots \\approx 30.0\\text{ s}', '\\text{height} = 14.3 + 12.1 = 26.4\\text{ m}'] },
      ],
      lines: [
        { say: 'Here is a second example. A rider’s height on a Ferris wheel is h of t equals 12.1 sine, 0.1047 t minus 1.57, plus 14.3, in metres, t seconds after the ride starts. When is the rider first at the top, and how high is that?', show: 'p' },
        { say: 'The top is the maximum, so set the angle equal to pi over two.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve for t: pi over two plus 1.57, all divided by 0.1047, is 29.99 and a bit. That is about thirty seconds.', show: 'm.1', focus: 'm.1' },
        { say: 'The height at the top is the maximum, d plus "a": 14.3 plus 12.1, which is 26.4 metres. So about thirty seconds after the ride starts, the rider is at the top, 26.4 metres above the ground.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Before the data start',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'If the time you get is before the data start, add the period $\\dfrac{2\\pi}{b}$ until it is inside the data.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 3\\sin(0.5t + 2) + 5', '0.5t + 2 = \\dfrac{\\pi}{2} \\ \\Rightarrow\\ t = -0.858\\ldots', '\\text{period} = \\dfrac{2\\pi}{0.5} = 12.566\\ldots', 't = -0.858\\ldots + 12.566\\ldots \\approx 11.71'] },
      ],
      lines: [
        { say: 'Sometimes the time you get comes out before the data start: a negative time, for example. Then add the period, two pi over b, until the time is inside the data.', show: 'p' },
        { say: 'For example, take y equals three sine, 0.5 t plus two, plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Setting the angle equal to pi over two gives t equals negative 0.858 and a bit. That is before time zero.', show: 'm.1', focus: 'm.1' },
        { say: 'The period is two pi over 0.5, which is 12.566 and a bit. Add it, and the first maximum after time zero is at about 11.71.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Check with a graph',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('c', [
          k,
          edgeNumbers(k, { xs: steps(0, 24, 4), ys: steps(0, 10, 2), xTex: String }),
          plot(k, { id: 'curve', f: (t) => 3 * Math.sin(0.5 * t + 2) + 5, samples: 300 }),
          dots(k, [
            { id: 'M', x: first, y: 8, tex: '(11.71,\\ 8)', tone: 'good', place: 'above' },
            { id: 'M2', x: first + 4 * PI, y: 8, tone: 'good' },
          ]),
        ]),
      ],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with a graph', md: 'Graph the equation and use the calculator’s maximum feature. It should agree with your answer.' }],
      lines: [
        { say: 'Whenever you can, check with a graph. Here is y equals three sine, 0.5 t plus two, plus five, from time zero.', show: ['c.grid', 'c.axes', 'c.curve', 'tip'] },
        { say: 'The calculator’s maximum feature finds the first peak at t equals 11.71, with a height of eight: the midline, five, plus the amplitude, three. It agrees with the algebra.', show: 'c.M', focus: 'c.M' },
        { say: 'And the next peak is one period later, at about 24.27.', show: 'c.M2', focus: 'c.M2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The water level at a dock is $h(t) = 2.85\\sin(0.506t - 1.21) + 4.62$, in metres, $t$ hours after midnight. When is the first high tide after midnight?',
          choices: ['$t \\approx 5.50$', '$t \\approx 0.71$', '$t \\approx 11.70$', '$t \\approx 12.42$'],
          answer: 0,
          working: 'High tide is the maximum: $0.506t - 1.21 = \\dfrac{\\pi}{2}$, so $t = \\dfrac{\\pi/2 + 1.21}{0.506} = 5.49\\ldots \\approx 5.50$, about 5:30 a.m.',
        },
      ],
      lines: [
        { say: 'Your turn. The water level at a dock is h of t equals 2.85 sine, 0.506 t minus 1.21, plus 4.62, in metres, t hours after midnight. When is the first high tide after midnight? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. High tide is the maximum, so set 0.506 t minus 1.21 equal to pi over two. Then t is pi over two plus 1.21, all over 0.506, which is about 5.50: half past five in the morning. Choice C uses three pi over two, so it gives the low tide instead.', show: 'q.answer' },
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
          items: [
            'A maximum happens when the angle $bx + c$ equals $\\dfrac{\\pi}{2}$; a minimum when it equals $\\dfrac{3\\pi}{2}$.',
            'The maximum value is $d + a$, and the minimum is $d - a$.',
            'If the time is before the data start, add the period $\\dfrac{2\\pi}{b}$; check with a graph.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A sinusoidal model reaches its maximum when the angle, b x plus c, equals pi over two, and its minimum when the angle equals three pi over two.', show: 'sum.0' },
        { say: 'The maximum value itself is d plus "a", and the minimum is d minus "a".', show: 'sum.1' },
        { say: 'And if the time comes out before the data start, add the period, two pi over b, and check with a graph. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
