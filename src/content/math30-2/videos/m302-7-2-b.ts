import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, edgeNumbers, retitle, steps } from './lib/m302-7-graphs.ts';

/** Hours of daylight in Grande Prairie on day n of the year. */
const L = (n: number) => 5.07 * Math.sin(0.0172 * n - 1.39) + 12.16;
const DATA: [number, number][] = [[15, 7.65], [46, 9.24], [74, 11.62], [105, 14.17], [135, 16.3], [166, 17.17], [196, 16.85], [227, 15.07], [258, 12.7], [288, 10.03], [319, 8.05], [349, 7.04]];

const g = retitle(plane({ x: [0, 370], y: [0, 20], xStep: 30, yStep: 2, every: 0, width: 7.4, height: 4, titles: { y: 'L\\text{ (h)}' } }), 'n');
const P = L(100);

const daylight = (id: string) =>
  figure(id, [
    g,
    edgeNumbers(g, { xs: steps(0, 360, 60), ys: steps(0, 20, 4), xTex: String }),
    band(g, { id: 'range', from: 15, to: 349, label: '\\text{the data}' }),
    plot(g, { id: 'curve', f: L, from: 0, to: 370, samples: 300 }),
    dots(g, DATA.map(([x, y], i) => ({ id: `d${i}`, x, y, tone: 'theta' as const, group: 'data' }))),
    polyline(g, { id: 'read', points: [[100, 0], [100, P], [0, P]], tone: 'good', dashed: true }),
    dots(g, [{ id: 'P', x: 100, y: P, tex: '(100,\\ 13.8)', tone: 'good', place: 'below right' }]),
  ]);

const video: Explainer = {
  id: 'm302-7-2-b',
  lessonId: 'm302-7-2',
  title: 'Modelling Data with Sinusoidal Functions, Part 2: Making Predictions in Radian Mode',
  thumbnailTitle: 'Predictions in Radian Mode',
  thumbnail: 'g',
  summary: 'Interpolation (a prediction inside the data) and extrapolation (outside it), and substituting into the daylight model L(n) = 5.07 sin(0.0172n − 1.39) + 12.16 in radian mode: about 13.8 hours of daylight on April 10 (day 100). In degree mode the model wrongly gives 12.0 to 12.6 hours on every day.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 2', title: 'Making Predictions', subtitle: 'Substituting into a model in radian mode' }],
      lines: [
        { say: 'Once you have a model, you can use it to predict values that were never measured.', show: 'title' },
        { say: 'In this video, you will substitute into a sinusoidal model to estimate the hours of daylight on a given day, and see why the calculator must be in radian mode.' },
      ],
    },
    {
      chapter: 'Interpolation and extrapolation',
      layout: 'split',
      leftWidth: 640,
      left: [daylight('g')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Interpolation**: a prediction inside the range of the data.', '**Extrapolation**: a prediction outside the range of the data.'],
        },
      ],
      lines: [
        { say: 'Here again are the daylight data for Grande Prairie, with the model, L of n equals 5.07 sine, 0.0172 n minus 1.39, plus 12.16. To predict a value, substitute into the equation.', show: ['g.grid', 'g.axes', 'g.data', 'g.curve'] },
        { say: 'A prediction inside the range of the data is called interpolation. The data run from day fifteen to day 349, so a prediction for any day in between is an interpolation.', show: ['g.range-all', 'b.0'], focus: ['g.range-all', 'b.0'] },
        { say: 'A prediction outside the range of the data is called extrapolation, such as a prediction for a day in the following year.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Daylight on April 10',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Use the model to estimate the daylight on April 10 (day 100).' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'L(100) = 5.07\\sin(0.0172(100) - 1.39) + 12.16',
            '\\text{angle: } 1.72 - 1.39 = 0.33',
            '\\sin(0.33) = 0.3240\\ldots \\quad (\\text{radian mode})',
            'L(100) = 5.07(0.3240\\ldots) + 12.16 = 13.80\\ldots',
          ],
        },
      ],
      lines: [
        { say: 'Use the model to estimate the daylight on April tenth. That is day 100 of the year: 31 days in January, 28 in February, 31 in March, and ten in April. So substitute 100 for n.', show: ['p', 'm.0'], focus: 'm.0' },
        { say: 'Work out the angle first. 0.0172 times 100 is 1.72, and 1.72 minus 1.39 is 0.33 radians.', show: 'm.1', focus: 'm.1' },
        { say: 'With the calculator in radian mode, sine of 0.33 is 0.3240 and a bit. Keep all the digits for now.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply by 5.07 and add 12.16. That gives 13.80 and a bit.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 640,
      left: [daylight('g')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'About **13.8 hours** of daylight on April 10. Day 100 is inside the data, so this is **interpolation**.' }],
      lines: [
        { say: 'So the model predicts about 13.8 hours of daylight on April tenth.', show: ['g.grid', 'g.axes', 'g.data', 'g.curve', 'g.read', 'g.P', 't'], focus: ['g.read', 'g.P'] },
        { say: 'Day 100 is inside the data, between day fifteen and day 349, so this is interpolation. And the point sits right between the measured values for the middle of March and the middle of April, which is just where it should be.', show: 'g.range-all', focus: ['g.P', 'g.d2', 'g.d3'] },
      ],
    },
    {
      chapter: 'Radian mode',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{degree mode: } \\sin(0.33^\\circ) = 0.0058\\ldots', 'L(100) \\approx 5.07(0.0058) + 12.16 \\approx \\bad{12.19}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degree mode', md: 'In degree mode, the model gives between 12.0 and 12.6 hours of daylight on **every** day of the year. Regression equations from technology use radians: always switch to radian mode first.' },
      ],
      lines: [
        { say: 'A common mistake is to leave the calculator in degree mode. Then it finds the sine of 0.33 degrees, a tiny angle, which is only 0.0058.', show: 'm.0', focus: 'm.0' },
        { say: 'That gives about 12.19 hours of daylight on April tenth.', show: 'm.1', focus: 'm.1' },
        { say: 'In fact, in degree mode the model gives between 12.0 and 12.6 hours of daylight on every day of the year. That is clearly wrong: the data swing from about seven hours to more than seventeen.', show: 'oops' },
        { say: 'Regression equations from technology use radians, so always switch to radian mode first. If every prediction comes out close to the midline, check the mode.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $L(n) = 5.07\\sin(0.0172n - 1.39) + 12.16$ to estimate the hours of daylight on day $200$.',
          choices: ['$12.3$ h', '$17.2$ h', '$7.7$ h', '$16.7$ h'],
          answer: 3,
          working: 'Angle: $0.0172(200) - 1.39 = 2.05$, and in radian mode $\\sin(2.05) = 0.8873\\ldots$, so $L(200) = 5.07(0.8873\\ldots) + 12.16 = 16.65\\ldots \\approx 16.7$ h.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the model to estimate the hours of daylight on day 200. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The angle is 0.0172 times 200, which is 3.44, minus 1.39: 2.05 radians. In radian mode, sine of 2.05 is 0.8873 and a bit, so L is 5.07 times that, plus 12.16: about 16.7 hours. Choice A comes from degree mode: it is close to the midline, which is the warning sign.', show: 'q.answer' },
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
            'Interpolation predicts inside the range of the data; extrapolation predicts outside it.',
            'Substitute into the model, working out the angle first.',
            'Use **radian mode**: in degree mode, every prediction lands near the midline.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Interpolation predicts a value inside the range of the data, and extrapolation predicts a value outside it.', show: 'sum.0' },
        { say: 'To predict, substitute into the model, working out the angle first, and keep all the digits until the end.', show: 'sum.1' },
        { say: 'And use radian mode: in degree mode, every prediction lands near the midline. In the next part, you will check a model against its data, and decide when a prediction outside the data can be trusted. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
