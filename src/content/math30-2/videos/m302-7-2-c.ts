import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { band, edgeNumbers, retitle, steps } from './lib/m302-7-graphs.ts';

/** The water level at the dock, in metres, t hours after midnight. */
const h = (t: number) => 2.85 * Math.sin(0.506 * t - 1.21) + 4.62;
const MEASURED: [number, number][] = [[0, 2.01], [3, 5.4], [6, 7.31], [9, 4.12], [12, 1.86], [15, 4.83]];
const w = retitle(plane({ x: [0, 24], y: [0, 9], xStep: 1, yStep: 1, every: 0, width: 7, height: 3.6, titles: { y: 'h\\text{ (m)}' } }), 't\\text{ (h)}');

/** The daylight model, carried on past the data into the next year. */
const L = (n: number) => 5.07 * Math.sin(0.0172 * n - 1.39) + 12.16;
const DATA: [number, number][] = [[15, 7.65], [46, 9.24], [74, 11.62], [105, 14.17], [135, 16.3], [166, 17.17], [196, 16.85], [227, 15.07], [258, 12.7], [288, 10.03], [319, 8.05], [349, 7.04]];
const d = retitle(plane({ x: [0, 460], y: [0, 20], xStep: 30, yStep: 2, every: 0, width: 8.4, height: 3.8, titles: { y: 'L\\text{ (h)}' } }), 'n');

const video: Explainer = {
  id: 'm302-7-2-c',
  lessonId: 'm302-7-2',
  title: 'Modelling Data with Sinusoidal Functions, Part 3: Interpolating and Extrapolating',
  thumbnailTitle: 'Interpolating and Extrapolating',
  thumbnail: 'w',
  summary: 'Checking a model against its data, then trusting it inside the data: water levels at a dock, h(t) = 2.85 sin(0.506t − 1.21) + 4.62, give about 4.18 m at 2:30 p.m. Extrapolating outside the data makes sense only if the situation keeps repeating: daylight on day 400 (about 8.5 h) is reasonable, a Ferris wheel after the ride is not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Sinusoidal Functions · Part 3', title: 'Interpolating and Extrapolating', subtitle: 'When can you trust a prediction?' }],
      lines: [
        { say: 'A model always gives an answer. The question is whether to believe it.', show: 'title' },
        { say: 'In this video, you will check a model against its data, use it to estimate a water level, and decide when a prediction outside the data makes sense.' },
      ],
    },
    {
      chapter: 'Water level at a dock',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Water levels at a dock were recorded every hour for one day ($0 \\le t \\le 24$, in hours after midnight).' },
        figure('w', [
          w,
          edgeNumbers(w, { xs: steps(0, 24, 3), ys: steps(0, 8, 2), xTex: String }),
          plot(w, { id: 'curve', f: h, samples: 300 }),
          dots(w, MEASURED.map(([x, y], i) => ({ id: `d${i}`, x, y, tone: 'theta' as const, group: 'data' }))),
        ]),
        { kind: 'math', id: 'm', size: 'md', lines: ['h(t) = 2.85\\sin(0.506t - 1.21) + 4.62'] },
      ],
      lines: [
        { say: 'Water levels at a dock were recorded every hour for one day, from t equals zero to t equals 24, in hours after midnight.', show: ['p', 'w.grid', 'w.axes', 'w.data'], focus: 'w.data' },
        { say: 'Regression gave this model for the water level, in metres: h of t equals 2.85 sine, 0.506 t minus 1.21, plus 4.62.', show: ['m.0', 'w.curve'], focus: ['m.0', 'w.curve'] },
        { say: 'Before using a model, check it against the data. Here are some of the measured levels, in yellow, and the model’s curve runs right through them.', focus: 'w.data' },
      ],
    },
    {
      chapter: 'Measured and model',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['$t$ (h)', 'Measured (m)', 'Model (m)'],
          rows: [
            ['$0$', '$2.01$', '$1.95$'],
            ['$3$', '$5.40$', '$5.48$'],
            ['$6$', '$7.31$', '$7.38$'],
            ['$9$', '$4.12$', '$4.05$'],
            ['$12$', '$1.86$', '$1.80$'],
            ['$15$', '$4.83$', '$4.90$'],
          ],
        },
      ],
      lines: [
        { say: 'The table compares the measured levels with the model’s values. At midnight, the water was 2.01 metres deep, and the model gives 1.95.', show: 't.0', focus: 't.0' },
        { say: 'At three a.m., 5.40 was measured, and the model gives 5.48. At six a.m., 7.31 and 7.38.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'The rest are just as close: every model value is within about a tenth of a metre of the measurement.', show: ['t.3', 't.4', 't.5'], focus: ['t.3', 't.4', 't.5'] },
        { say: 'That is why the model can be trusted inside the data.', focus: 't' },
      ],
    },
    {
      chapter: 'Estimating at 2:30 p.m.',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{2:30 p.m.: } t = 14.5',
            '\\text{angle: } 0.506(14.5) - 1.21 = 6.127',
            '\\sin(6.127) = -0.1555\\ldots',
            'h(14.5) = 2.85(-0.1555\\ldots) + 4.62 = 4.176\\ldots',
            '\\approx 4.18\\text{ m}',
          ],
        },
      ],
      lines: [
        { say: 'Now estimate the water level at two thirty p.m. That is fourteen and a half hours after midnight, so t is 14.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Work out the angle: 0.506 times 14.5, minus 1.21, is 6.127 radians.', show: 'm.1', focus: 'm.1' },
        { say: 'In radian mode, sine of 6.127 is negative 0.1555 and a bit.', show: 'm.2', focus: 'm.2' },
        { say: 'So h is 2.85 times negative 0.1555, plus 4.62, which is 4.176 and a bit.', show: 'm.3', focus: 'm.3' },
        { say: 'The water level at two thirty p.m. is about 4.18 metres. A time of 14.5 hours is inside the data, so this is interpolation, and the close fit means we can trust it.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Extrapolation',
      layout: 'center',
      main: [
        figure('d', [
          d,
          edgeNumbers(d, { xs: steps(0, 450, 90), ys: steps(0, 20, 4), xTex: String }),
          band(d, { id: 'range', from: 15, to: 349, label: '\\text{the data}' }),
          plot(d, { id: 'curve', f: L, from: 0, to: 460, samples: 400 }),
          dots(d, DATA.map(([x, y], i) => ({ id: `k${i}`, x, y, tone: 'theta' as const, group: 'data' }))),
          dots(d, [{ id: 'P', x: 400, y: L(400), tex: '(400,\\ 8.5)', tone: 'good', place: 'below right' }]),
        ]),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Before you extrapolate', md: 'Ask whether the situation keeps repeating the same way outside the data. If it does not, the model’s answer means nothing.' },
      ],
      lines: [
        { say: 'Extrapolation goes beyond the data, and whether it makes sense depends on the situation.', show: ['d.grid', 'd.axes', 'd.range-all', 'd.data', 'd.curve'] },
        { say: 'Daylight follows the same pattern every year. So the daylight model for day 400, which is February fourth of the next year, is reasonable. L of 400 is about 8.5 hours.', show: 'd.P', focus: 'd.P' },
        { say: 'But a model of a rider’s height on a Ferris wheel says nothing about a time after the ride has ended. The equation still gives a number, but that number does not describe anything real.' },
        { say: 'So before you extrapolate, ask whether the situation keeps repeating the same way outside the data.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The model $h(t) = 2.85\\sin(0.506t - 1.21) + 4.62$ was made from data for $0 \\le t \\le 24$ hours after midnight. Estimate the water level at 10:00 p.m. Is this interpolation or extrapolation?',
          choices: ['$3.26$ m, extrapolation', '$5.11$ m, interpolation', '$3.26$ m, interpolation', '$5.11$ m, extrapolation'],
          answer: 2,
          working: '10:00 p.m. is $t = 22$. The angle is $0.506(22) - 1.21 = 9.922$, and $\\sin(9.922) = -0.4769\\ldots$, so $h = 2.85(-0.4769\\ldots) + 4.62 = 3.26$ m. $t = 22$ is inside $0 \\le t \\le 24$: interpolation.',
        },
      ],
      lines: [
        { say: 'Your turn. The model was made from data for t from zero to 24 hours after midnight. Estimate the water level at ten p.m. Is this interpolation or extrapolation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Ten p.m. is 22 hours after midnight. The angle is 0.506 times 22, minus 1.21, which is 9.922 radians, and its sine is negative 0.4769 and a bit. So h is about 3.26 metres. And 22 is between zero and 24, inside the data, so this is interpolation. The 5.11 in choices B and D comes from degree mode.', show: 'q.answer' },
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
            'Check a model against its data: if it fits closely, it can be trusted inside the data.',
            'Interpolation (inside the data) is usually reliable.',
            'Extrapolation (outside the data) is reasonable only if the situation keeps repeating the same way.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Check a model against its data: if its values are close to the measurements, it can be trusted inside the data.', show: 'sum.0' },
        { say: 'So interpolation, a prediction inside the data, is usually reliable.', show: 'sum.1' },
        { say: 'Extrapolation, outside the data, is reasonable only if the situation keeps repeating the same way. In the next part, you will find when a model reaches its maximum and its minimum. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
