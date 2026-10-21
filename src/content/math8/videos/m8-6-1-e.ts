import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { valueTable } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { candles } from './lib/m8-6-figures.ts';

// A 20 cm candle burning down 2 cm an hour, drawn at 0.2 units for each centimetre.
const HEIGHTS = [20, 18, 16, 14];
const candle = (id: string) =>
  figure(
    id,
    [
      candles({
        heights: HEIGHTS.map((h) => 0.2 * h),
        tops: HEIGHTS.map((h) => `${h}\\text{ cm}`),
        captions: ['t = 0', 't = 1', 't = 2', 't = 3'],
      }),
    ],
    470,
  );

const candleTable = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: 't', values: [0, 1, 2, 3] }, y: { title: 'h', values: HEIGHTS }, dx: ['+1', '+1', '+1'], dy: ['-2', '-2', '-2'], dyTones: ['bad', 'bad', 'bad'], titleW: 1.1, cellW: 1.4 })],
    290,
  );

// T = 3h − 12, h hours after 6 a.m.
const windTable = (id: string) =>
  figure(
    id,
    [valueTable({ x: { title: 'h', values: [0, 1, 2, 3, 4] }, y: { title: 'T', values: [-12, -9, -6, -3, 0] }, dy: ['+3', '+3', '+3', '+3'], titleW: 1.1, cellW: 1.4 })],
    250,
  );

const video: Explainer = {
  id: 'm8-6-1-e',
  lessonId: 'm8-6-1',
  title: 'Linear Relations and Tables of Values, Part 5: Linear Relations in Real Life',
  thumbnailTitle: 'Linear Relations in Real Life',
  thumbnail: 'cd',
  summary:
    'A 20 cm candle that burns down 2 cm every hour has height h = 20 − 2t after t hours: 20, 18, 16 and 14 cm for t = 0 to 3, so as the time increases by 1 h, the height decreases by 2 cm. A temperature of −12 °C at 6 a.m. that rises 3 °C every hour is T = 3h − 12; at 10 a.m., h = 4 and T = 3(4) − 12 = 0 °C.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 5', title: 'Linear Relations in Real Life', subtitle: 'Candles and temperatures' }],
      lines: [
        { say: 'Linear relations are everywhere: a candle burning down, a temperature rising, a fare growing with distance.', show: 'title' },
        { say: 'In this part, you will use equations of linear relations to make tables and answer questions about real situations.' },
      ],
    },
    {
      chapter: 'A burning candle',
      layout: 'split',
      leftWidth: 540,
      left: [candle('cd')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A $20$ cm candle burns down $2$ cm every hour. Its height after $t$ hours is $h = 20 - 2t$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['t = 0: \\;\\; 20 - 2(0) = 20', 't = 1: \\;\\; 20 - 2(1) = 18', 't = 2: \\;\\; 20 - 2(2) = 16', 't = 3: \\;\\; 20 - 2(3) = 14'] },
      ],
      lines: [
        { say: 'A candle is twenty centimetres tall. It burns down two centimetres every hour. So its height, h, in centimetres, after t hours is h equals twenty minus two t.', show: 'q' },
        { say: 'At the start, t equals zero. Twenty minus two times zero is twenty centimetres.', show: ['cd.k0', 'cd.h0', 'cd.c0', 'm.0'], focus: 'm.0' },
        { say: 'After one hour, t equals one. Twenty minus two is eighteen centimetres.', show: ['cd.k1', 'cd.h1', 'cd.c1', 'm.1'], focus: 'm.1' },
        { say: 'After two hours, twenty minus four is sixteen. After three hours, twenty minus six is fourteen.', show: ['cd.k2', 'cd.h2', 'cd.c2', 'cd.k3', 'cd.h3', 'cd.c3', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Describing the candle',
      layout: 'center',
      main: [
        candleTable('ct'),
        { kind: 'callout', id: 'key', tone: 'key', title: 'The pattern', md: 'As the time increases by $1$ h, the height **decreases** by $2$ cm. In $h = 20 - 2t$, the $-2$ multiplies $t$, and $20$ is the height at the start.' },
      ],
      lines: [
        { say: 'Here are the heights in a table: twenty, eighteen, sixteen and fourteen centimetres.', show: ['ct.frame', 'ct.xs', 'ct.ys', 'ct.dxs'] },
        { say: 'As the time increases by one hour, the height decreases by two centimetres.', show: 'ct.dys', focus: 'ct.dys' },
        { say: 'You can see that in the equation. Twenty minus two t is the same as negative two t, plus twenty. The number that multiplies t is negative two: the change each hour.', show: 'key' },
        { say: 'And the twenty is the height at the start, when t is zero.' },
      ],
    },
    {
      chapter: 'A warm wind',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'At 6 a.m. it was $-12^\\circ\\text{C}$. A warm wind made the temperature rise $3^\\circ\\text{C}$ every hour, so $T = 3h - 12$, where $h$ is the number of hours after 6 a.m. What was the temperature at 10 a.m.?' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['h = 4: \\quad T = 3(4) - 12 = 12 - 12 = 0'] },
        windTable('wt'),
      ],
      lines: [
        { say: 'At six in the morning, it was negative twelve degrees Celsius. Then a warm wind made the temperature rise three degrees every hour.', show: 'q' },
        { say: 'So the temperature, T, is T equals three h minus twelve, where h is the number of hours after six in the morning. What was the temperature at ten in the morning?' },
        { say: 'Ten in the morning is four hours after six, so substitute h equals four. T equals three times four, minus twelve. That is twelve minus twelve, which is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'At ten in the morning, the temperature was zero degrees Celsius.' },
        { say: 'The table shows the same thing, hour by hour: negative twelve, negative nine, negative six, negative three, and zero. The temperature goes up by three each hour.', show: ['wt.frame', 'wt.xs', 'wt.ys', 'wt.dys'], focus: 'wt.y4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tank holds $50$ L of water and drains $4$ L every minute, so $V = 50 - 4t$. How much water is left after $6$ minutes?',
          choices: ['$24$ L', '$44$ L', '$26$ L', '$276$ L'],
          answer: 2,
          working: 'Substitute $t = 6$: $V = 50 - 4(6) = 50 - 24 = 26$, so $26$ L is left.',
        },
      ],
      lines: [
        { say: 'Your turn. A tank holds fifty litres of water and drains four litres every minute, so V equals fifty minus four t. How much water is left after six minutes? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-six litres. Four times six is twenty-four, and fifty minus twenty-four is twenty-six. Choice A is the water that drained out, not the water that is left.', show: 'q.answer' },
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
            'Substitute values into the equation to make a table.',
            'Candle: $h = 20 - 2t$ gives $20,\\ 18,\\ 16,\\ 14$ cm.',
            'The number that multiplies $t$ is the change each hour: $-2$ cm.',
            'Temperature: $T = 3h - 12$ gives $0^\\circ\\text{C}$ when $h = 4$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To make a table for a real situation, substitute values into its equation.', show: 'sum.0' },
        { say: 'The candle’s height went twenty, eighteen, sixteen, fourteen centimetres.', show: 'sum.1' },
        { say: 'The number that multiplies t, negative two, is the change each hour.', show: 'sum.2' },
        { say: 'And the temperature reached zero degrees after four hours. In the next part, you will graph linear relations. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
