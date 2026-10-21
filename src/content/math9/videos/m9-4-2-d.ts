import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { candles } from '@/content/math8/videos/lib/m8-6-figures.ts';

// A 24 cm candle measured after 0, 4 and 8 hours: 24, 18 and 12 cm.
const wax = (id: string) =>
  figure(
    id,
    [
      candles({
        heights: [2.4, 1.8, 1.2],
        gap: 1.2,
        tops: ['24\\text{ cm}', '18\\text{ cm}', '12\\text{ cm}'],
        captions: ['0\\text{ h}', '4\\text{ h}', '8\\text{ h}'],
      }),
    ],
    420,
  );

// The data, the line through them, and the dashed extension down to zero at 16 hours.
const graph = (id: string) => {
  const g = plane({ x: [0, 18], y: [0, 27], xStep: 2, yStep: 3, every: 2, width: 7, height: 6, titles: { x: '\\text{Time (h), } t', y: '\\text{Height (cm), } h' } });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[0, 24], [8, 12]], tone: 'hyp' }),
      polyline(g, { id: 'ext', points: [[8, 12], [16, 0]], tone: 'hyp', dashed: true }),
      dots(g, [
        { id: 'd0', x: 0, y: 24 },
        { id: 'd4', x: 4, y: 18 },
        { id: 'd8', x: 8, y: 12 },
        { id: 'out', x: 16, y: 0, tex: '16\\text{ h}', tone: 'opp', place: 'above right' },
      ]),
    ],
    520,
  );
};
const base = (fig: string) => [`${fig}.grid`, `${fig}.axes`, `${fig}.d0`, `${fig}.d4`, `${fig}.d8`, `${fig}.ln`];

const video: Explainer = {
  id: 'm9-4-2-d',
  lessonId: 'm9-4-2',
  title: 'Graphing Linear Relations, Part 4: Extrapolating',
  thumbnailTitle: 'Extrapolating',
  thumbnail: 'gr',
  summary:
    'To extrapolate is to estimate a value beyond the known data, by extending the line or using the equation; it assumes the pattern keeps going. A 24 cm candle measured after 0, 4 and 8 hours was 24, 18 and 12 cm tall. It burns 6 cm in 4 hours, or 1.5 cm an hour, so h = 24 − 1.5t, and it burns out when 24 − 1.5t = 0, at t = 24 ÷ 1.5 = 16 hours, where the dashed line meets zero. Far beyond the data, predictions are less reliable: at 20 hours the equation gives −6 cm, which makes no sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 4', title: 'Extrapolating', subtitle: 'Reading beyond the data' }],
      lines: [
        { say: 'A candle burns down steadily. You have measured it three times. When will it burn out? The answer lies beyond your data.', show: 'title' },
        { say: 'In this part, you will estimate values beyond the data points. This is called extrapolating.' },
      ],
    },
    {
      chapter: 'A burning candle',
      layout: 'split',
      leftWidth: 480,
      left: [wax('wx')],
      right: [graph('gr')],
      lines: [
        { say: 'A twenty-four centimetre candle was measured after zero, four and eight hours.', show: ['wx.k0', 'wx.h0', 'wx.c0', 'gr.grid', 'gr.axes', 'gr.d0'] },
        { say: 'It was eighteen centimetres tall after four hours, and twelve centimetres tall after eight hours.', show: ['wx.k1', 'wx.h1', 'wx.c1', 'wx.k2', 'wx.h2', 'wx.c2', 'gr.d4', 'gr.d8'] },
        { say: 'Time and height are measurements, so join the points with a solid line. Notice that the line falls: the candle gets shorter.', show: 'gr.ln', focus: 'gr.ln' },
      ],
    },
    {
      chapter: 'Extrapolate',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extrapolate', md: 'To **extrapolate** is to estimate a value **beyond** the known data, by extending the line or using the equation. It assumes the pattern keeps going.' },
      ],
      lines: [
        { say: 'To extrapolate is to estimate a value beyond the known data, by extending the line or by using the equation. It assumes that the pattern keeps going.', show: ['def', ...base('gr')] },
        { say: 'When will the candle burn out? That is when its height is zero, which is beyond the data.' },
        { say: 'Extend the line, dashed, until it reaches zero height. It meets the time axis at sixteen hours.', show: ['gr.ext', 'gr.out'], focus: ['gr.ext', 'gr.out'] },
      ],
    },
    {
      chapter: 'Use the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Drop: } 24 - 18 = 6 \\text{ cm in } 4 \\text{ h}', '6 \\div 4 = 1.5 \\text{ cm per hour}', 'h = 24 - 1.5t', '24 - 1.5t = 0 \\;\\to\\; 1.5t = 24', 't = 24 \\div 1.5 = 16'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The candle burns out after $16$ hours.' },
      ],
      lines: [
        { say: 'The equation gives the exact answer. From zero to four hours, the height drops from twenty-four to eighteen centimetres: six centimetres in four hours. Six divided by four is one point five centimetres per hour.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The candle starts at twenty-four centimetres and goes down, so h equals twenty-four minus one point five t.', show: 'm.2', focus: 'm.2' },
        { say: 'The candle burns out when h is zero. Twenty-four minus one point five t equals zero, so one point five t equals twenty-four.', show: 'm.3', focus: 'm.3' },
        { say: 'Divide both sides by one point five: twenty-four divided by one point five is sixteen. The candle burns out after sixteen hours, just as the dashed line shows.', show: ['m.4', 'a'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Be careful',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Be careful with extrapolation', md: 'Extrapolation assumes the pattern continues. Predictions far beyond the data are less reliable.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['t = 20: \\quad h = 24 - 1.5(20) = 24 - 30 = \\bad{-6}'] },
      ],
      lines: [
        { say: 'Be careful with extrapolation. It assumes the pattern keeps going, and that is not always true.', show: 'tip' },
        { say: 'For example, put t equals twenty into the equation. Twenty-four minus thirty is negative six centimetres. A candle cannot be shorter than nothing! Once it burns out, the pattern stops.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, a plant will not keep growing zero point five centimetres a day forever. The farther beyond the data you go, the less you can trust the prediction.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tank holds $36$ L of water and drains at a steady rate. After $2$ minutes, $30$ L are left; after $4$ minutes, $24$ L are left. Extrapolate: when will the tank be empty?',
          choices: ['After $6$ minutes', 'After $8$ minutes', 'After $12$ minutes', 'After $18$ minutes'],
          answer: 2,
          working: 'The water drops $6$ L every $2$ minutes, or $3$ L a minute, so $V = 36 - 3t$. It is empty when $36 - 3t = 0$: $t = 36 \\div 3 = 12$ minutes.',
        },
      ],
      lines: [
        { say: 'Your turn. A tank holds thirty-six litres of water and drains at a steady rate. After two minutes, thirty litres are left. After four minutes, twenty-four litres are left. When will the tank be empty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, after twelve minutes. The water drops six litres every two minutes, which is three litres a minute. Thirty-six litres at three litres a minute takes twelve minutes. Choice A uses six litres a minute, but six litres is the drop in two minutes.', show: 'q.answer' },
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
            'To **extrapolate** is to estimate a value beyond the known data.',
            'Extend the line, or use the equation: $24 - 1.5t = 0$ gives $t = 16$.',
            'Extrapolation assumes the pattern keeps going, so far-off predictions are less reliable.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To extrapolate is to estimate a value beyond the known data.', show: 'sum.0' },
        { say: 'You can extend the line, or use the equation for an exact answer.', show: 'sum.1' },
        { say: 'And extrapolation assumes the pattern keeps going, so predictions far beyond the data are less reliable. Next, you will meet polynomials. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
