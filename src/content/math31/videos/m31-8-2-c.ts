import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots, each, named, numbers, plane, rects } from './lib/m31-8-graphs.ts';

// A car's speedometer every 2 s: left sum 58 m, right sum 88 m.
const data: Record<number, number> = { 0: 0, 2: 6, 4: 10, 6: 13, 8: 15 };
const v = (t: number) => data[Math.round(t)] ?? 0;
const graph = (id: string, rule: 'left' | 'right', heights: string[], tone: 'good' | 'bad') => {
  const g = named(plane({ x: [0, 9], y: [0, 16], xStep: 1, yStep: 2, every: 0, width: 6, height: 5 }), 't', 'v');
  return figure(id, [
    g,
    numbers(g, 2, 4),
    rects(g, { id: 'R', f: v, a: 0, b: 8, n: 4, rule, heights, tone, noDots: true }),
    dots(g, Object.entries(data).map(([t, y]) => ({ id: `d${t}`, x: Number(t), y, tone: 'theta' as const, group: 'data' }))),
  ]);
};

const video: Explainer = {
  id: 'm31-8-2-c',
  lessonId: 'm31-8-2',
  title: 'Riemann Sums and Area, Part 3: Sums from Data',
  thumbnailTitle: 'Riemann Sums from Data',
  thumbnail: 'L',
  summary: 'Measured data give a rate only at certain times, so a Riemann sum estimates the total. A car merging onto a highway reads 0, 6, 10, 13 and 15 m/s every 2 s: the left sum 2(0 + 6 + 10 + 13) = 58 m and the right sum 2(6 + 10 + 13 + 15) = 88 m bracket the distance, since the car speeds up the whole time, and their average, 73 m, is a reasonable estimate. A sum’s units are the rate’s units times the variable’s.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Antiderivatives and Integrals · Part 3', title: 'Riemann Sums from Data', subtitle: 'A distance from a speedometer' }],
      lines: [
        { say: 'Real measurements rarely come with a formula. A speedometer, a flow meter or a sensor gives a rate only at certain moments.', show: 'title' },
        { say: 'In this video, you will estimate a total from measured data with a Riemann sum, decide whether the estimate is too high or too low, and get the units right.' },
      ],
    },
    {
      chapter: 'Measured rates',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A car merging onto a highway records its velocity every $2$ seconds:' },
        { kind: 'table', id: 't', head: ['$t\\ (\\text{s})$', '$v\\ (\\text{m/s})$'], rows: [['$0$', '$0$'], ['$2$', '$6$'], ['$4$', '$10$'], ['$6$', '$13$'], ['$8$', '$15$']] },
        { kind: 'text', id: 'q', size: 'md', md: 'How far does it travel in the first $8$ seconds?' },
      ],
      lines: [
        { say: 'A car merging onto a highway records its velocity every two seconds: zero, six, ten, thirteen and fifteen metres per second.', show: ['p', 't'] },
        { say: 'How far does it travel in the first eight seconds? The distance is the area under the velocity graph, but we only know the velocity at five moments. A Riemann sum is the natural way to estimate it.', show: 'q' },
      ],
    },
    {
      chapter: 'A left sum',
      layout: 'split',
      leftWidth: 560,
      left: [graph('L', 'left', ['', '6', '10', '13'], 'good')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\Delta t = 2,\\quad n = 4', 'L_4 = 2(0 + 6 + 10 + 13)', '= 2(29) = 58\\text{ m}'] },
      ],
      lines: [
        { say: 'Here are the five readings. They are two seconds apart, so there are four subintervals, each with delta t equal to two.', show: ['L.grid', 'L.axes', 'L.data', 'm.0'], focus: ['L.data', 'm.0'] },
        { say: 'A left sum uses the readings at the start of each subinterval: zero, six, ten and thirteen. Leave out the last reading, fifteen.', show: each('L', 'R', 4), focus: each('L', 'R', 4) },
        { say: 'So L four is two times, zero plus six plus ten plus thirteen. That is two times 29: 58 metres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'A right sum',
      layout: 'split',
      leftWidth: 560,
      left: [graph('Rs', 'right', ['6', '10', '13', '15'], 'bad')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['R_4 = 2(6 + 10 + 13 + 15)', '= 2(44) = 88\\text{ m}', '58 < \\text{distance} < 88', '\\text{average: } \\dfrac{58 + 88}{2} = 73\\text{ m}'] },
      ],
      lines: [
        { say: 'A right sum uses the readings at the end of each subinterval: six, ten, thirteen and fifteen. So R four is two times 44: 88 metres.', show: ['Rs.grid', 'Rs.axes', 'Rs.data', ...each('Rs', 'R', 4), 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'The car speeds up the whole time, so its velocity is increasing. That makes the left sum too low and the right sum too high. The distance is between 58 and 88 metres.', show: 'm.2', focus: 'm.2' },
        { say: 'Their average, 73 metres, is a reasonable single estimate.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Units',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Units', md: 'The units of a Riemann sum are (units of the rate) × (units of the variable).' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\text{m}}{\\text{s}} \\times \\text{s} = \\text{m}, \\qquad \\dfrac{\\text{L}}{\\text{min}} \\times \\text{min} = \\text{L}'] },
      ],
      lines: [
        { say: 'Each rectangle is a height times a width, so its units are the units of the rate, times the units of the variable along the bottom.', show: 'tip' },
        { say: 'Metres per second times seconds gives metres: a distance. Litres per minute times minutes gives litres: an amount of water. If your units do not come out as a total, check what you multiplied.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Water flows into a tank at $40$, $36$, $30$, $22$ and $12$ L/min, measured at $t = 0$, $5$, $10$, $15$ and $20$ min. Estimate the water added in the $20$ minutes with a **left** sum.',
          choices: ['$500$ L', '$640$ L', '$700$ L', '$128$ L'],
          answer: 1,
          working: '$\\Delta t = 5$, so $L_4 = 5(40 + 36 + 30 + 22) = 5(128) = 640$ L. The rate is decreasing, so this is an overestimate.',
        },
      ],
      lines: [
        { say: 'Your turn. Water flows into a tank at 40, 36, 30, 22 and twelve litres per minute, measured at zero, five, ten, fifteen and twenty minutes. Estimate the water added in the twenty minutes with a left sum. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 640 litres. The readings are five minutes apart, so delta t is five. The left sum uses the first four readings: five times, 40 plus 36 plus 30 plus 22, which is five times 128: 640 litres. The rate is falling, so this is an overestimate.', show: 'q.answer' },
        { say: 'Choice C, 700, adds all five readings, which adds an extra rectangle.' },
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
          items: ['Measured rates at equal steps give a Riemann sum with $\\Delta t$ = the step.', 'Left sums use the first $n$ readings; right sums use the last $n$.', 'If the rate rises the whole time, the left and right sums bracket the total.', 'Units: (rate units) × (variable units).'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rates measured at equal steps give a Riemann sum, with delta t equal to the step.', show: 'sum.0' },
        { say: 'A left sum uses the first n readings, and a right sum the last n.', show: 'sum.1' },
        { say: 'If the rate rises the whole time, or falls the whole time, the left and right sums bracket the true total.', show: 'sum.2' },
        { say: 'And the units are the rate’s units times the variable’s units. In the next lesson, the fundamental theorem of calculus finds exact areas with one subtraction. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
