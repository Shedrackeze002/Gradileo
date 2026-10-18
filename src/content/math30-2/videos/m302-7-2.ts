import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, hline, retitle, steps } from './lib/m302-7-graphs.ts';

/** Hours of daylight in Grande Prairie on day n of the year, as the regression gave it. */
const L = (n: number) => 5.07 * Math.sin(0.0172 * n - 1.39) + 12.16;
/** The student's data: one day in each month. */
const DATA: [number, number][] = [[15, 7.65], [46, 9.24], [74, 11.62], [105, 14.17], [135, 16.3], [166, 17.17], [196, 16.85], [227, 15.07], [258, 12.7], [288, 10.03], [319, 8.05], [349, 7.04]];

const g = retitle(plane({ x: [0, 370], y: [0, 20], xStep: 30, yStep: 2, every: 0, width: 7.4, height: 4, titles: { y: 'L\\text{ (h)}' } }), 'n');

/** The daylight graph, with the data, the curve, and the lines for the longest and shortest days. */
const daylight = (id: string) =>
  figure(id, [
    g,
    edgeNumbers(g, { xs: steps(0, 360, 60), ys: steps(0, 20, 4), xTex: String }),
    hline(g, { id: 'max', y: 17.23, tone: 'good' }),
    hline(g, { id: 'mid', y: 12.16, tone: 'adj' }),
    hline(g, { id: 'min', y: 7.09, tone: 'opp' }),
    plot(g, { id: 'curve', f: L, from: 0, to: 370, samples: 300 }),
    dots(g, DATA.map(([x, y], i) => ({ id: `d${i}`, x, y, tone: 'theta' as const, group: 'data' }))),
  ]);

const video: Explainer = {
  id: 'm302-7-2',
  lessonId: 'm302-7-2',
  title: 'Modelling Data with Sinusoidal Functions, Part 1: Reading a Regression Equation',
  thumbnailTitle: 'Reading a Regression Equation',
  thumbnail: 'g',
  summary: 'Reading a sinusoidal regression equation, y = a sin(bx + c) + d in radians, for the hours of daylight in Grande Prairie, L(n) = 5.07 sin(0.0172n − 1.39) + 12.16: the longest day (17.23 h), the shortest (7.09 h), the period 2π/0.0172 ≈ 365 days, and what a, d and the period mean in context.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 1', title: 'Reading a Regression Equation', subtitle: 'Hours of daylight through a year' }],
      lines: [
        { say: 'A graphing calculator can fit a sinusoidal curve to real data, such as the hours of daylight through a year, or the water level at a dock through a day. The result is called a regression equation.', show: 'title' },
        { say: 'In this video, you will read a sinusoidal regression equation, find the longest and shortest days it predicts, and say what each of its numbers means in context.' },
      ],
    },
    {
      chapter: 'Sinusoidal regression',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a\\sin(bx + c) + d \\qquad (\\text{radians})'] },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Amplitude $a$, and midline $y = d$.', 'Maximum $d + a$, and minimum $d - a$.', 'Period $\\dfrac{2\\pi}{b}$.'],
        },
      ],
      lines: [
        { say: 'Technology gives sinusoidal regression in the form y equals "a" sine, b x plus c, plus d, with the angle measured in radians.', show: 'm' },
        { say: 'The features are the ones you already know. The amplitude is "a", and the midline is y equals d.', show: 'b.0' },
        { say: 'So the maximum is d plus "a", and the minimum is d minus "a".', show: 'b.1' },
        { say: 'And because the angle is in radians, the period is two pi over b.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Daylight data',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: '$n$ = day of the year ($n = 1$ is January 1)' },
        daylight('g'),
        { kind: 'math', id: 'm', size: 'md', lines: ['L(n) = 5.07\\sin(0.0172n - 1.39) + 12.16'] },
      ],
      lines: [
        { say: 'A student used sunrise and sunset times to find the hours of daylight in Grande Prairie, a city in western Canada, on one day of each month. Here are the data: the day of the year across, and the hours of daylight up.', show: ['g.grid', 'g.axes', 'g.data'], focus: 'g.data' },
        { say: 'Day one is January first, and day 365 is December 31st. In the middle of winter there are only about seven hours of daylight, and in June there are more than seventeen.', show: 't' },
        { say: 'Regression gave this equation: L of n equals 5.07 sine, 0.0172 n minus 1.39, plus 12.16.', show: ['m.0', 'g.curve'], focus: ['m.0', 'g.curve'] },
        { say: 'The curve passes very close to every data point, so the equation is a good model of the data.', focus: ['g.curve', 'g.data'] },
      ],
    },
    {
      chapter: 'Longest and shortest',
      layout: 'split',
      leftWidth: 560,
      left: [daylight('g')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{midline: } y = 12.16}', '\\good{\\max = 12.16 + 5.07 = 17.23}', '\\opp{\\min = 12.16 - 5.07 = 7.09}'] }],
      lines: [
        { say: 'Now read the features. d is 12.16, so the midline is y equals 12.16 hours.', show: ['g.grid', 'g.axes', 'g.data', 'g.curve', 'g.mid', 'm.0'], focus: ['g.mid', 'm.0'] },
        { say: 'The longest day has 12.16 plus 5.07, which is 17.23 hours of daylight.', show: ['g.max', 'm.1'], focus: ['g.max', 'm.1'] },
        { say: 'And the shortest day has 12.16 minus 5.07, which is 7.09 hours.', show: ['g.min', 'm.2'], focus: ['g.min', 'm.2'] },
        { say: 'So the model gives about 17.2 hours of daylight on the longest day of the year, and about 7.1 hours on the shortest. The data agree: the highest point is 17.17, and the lowest is 7.04.', focus: ['g.max', 'g.min', 'g.data'] },
      ],
    },
    {
      chapter: 'The period',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{period} = \\dfrac{2\\pi}{b} = \\dfrac{2\\pi}{0.0172}', '= 365.30\\ldots \\approx 365\\text{ days}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'It makes sense', md: 'The pattern of daylight repeats every year, so a period of about 365 days is just what we should expect.' },
      ],
      lines: [
        { say: 'Next, the period. b is 0.0172, so the period is two pi over 0.0172.', show: 'm.0', focus: 'm.0' },
        { say: 'On a calculator, that is 365.30 and a bit: about 365 days.', show: 'm.1', focus: 'm.1' },
        { say: 'That makes sense. The pattern of daylight repeats every year, so a period of about one year is just what we should expect. Always check that a model’s period fits the situation.', show: 'key' },
      ],
    },
    {
      chapter: 'What the numbers mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interpreting the parameters', md: 'In context, $a$ is half the difference between the highest and lowest values, $d$ is the average of the highest and lowest values (the midline), and $\\dfrac{2\\pi}{b}$ is the time for one complete cycle.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['$a = 5.07$: daylight swings $5.07$ h above and below its average.', '$d = 12.16$: the average daylight is $12.16$ h.', '$\\dfrac{2\\pi}{b} \\approx 365$: the pattern repeats every year.'],
        },
      ],
      lines: [
        { say: 'Each parameter has a meaning in context. "a" is half the difference between the highest and lowest values, d is their average, the midline, and two pi over b is the time for one complete cycle.', show: 'def' },
        { say: 'Here, "a" is 5.07: through the year, the daylight swings 5.07 hours above and below its average.', show: 'b.0' },
        { say: 'd is 12.16: averaged over the year, there are 12.16 hours of daylight.', show: 'b.1' },
        { say: 'And two pi over b is about 365: the whole pattern repeats every year.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model of the average temperature in a city in month $m$ is $T(m) = 11.2\\sin(0.524m - 1.83) + 3.4$, in °C. What are the highest temperature and the period?',
          choices: ['$14.6^\\circ\\text{C}$, about $12$ months', '$14.6^\\circ\\text{C}$, about $3.3$ months', '$11.2^\\circ\\text{C}$, about $12$ months', '$7.8^\\circ\\text{C}$, about $12$ months'],
          answer: 0,
          working: 'Maximum $= d + a = 3.4 + 11.2 = 14.6$. Period $= \\dfrac{2\\pi}{0.524} = 11.99\\ldots \\approx 12$ months: one year.',
        },
      ],
      lines: [
        { say: 'Your turn. A model of the average temperature in a city in month m is T of m equals 11.2 sine, 0.524 m minus 1.83, plus 3.4, in degrees Celsius. What are the highest temperature and the period? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The highest temperature is d plus "a": 3.4 plus 11.2, which is 14.6 degrees Celsius. The period is two pi over 0.524, which is about twelve months: one year. Choice C gives the amplitude, 11.2, which is how far the temperature swings above its average, not the highest temperature.', show: 'q.answer' },
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
            'Sinusoidal regression gives $y = a\\sin(bx + c) + d$, in radians.',
            'Maximum $d + a$, minimum $d - a$, midline $y = d$, period $\\dfrac{2\\pi}{b}$.',
            'In context, $a$ is half the difference between the highest and lowest values, and $d$ is their average.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sinusoidal regression gives y equals "a" sine, b x plus c, plus d, with the angle in radians.', show: 'sum.0' },
        { say: 'The maximum is d plus "a", the minimum is d minus "a", the midline is y equals d, and the period is two pi over b.', show: 'sum.1' },
        { say: 'In context, "a" is half the difference between the highest and lowest values, and d is their average. In the next part, you will use the equation to predict the daylight on a given day. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
