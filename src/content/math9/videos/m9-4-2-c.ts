import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide } from '@/content/math5/videos/lib/m5-11-figures.ts';
import { plants } from '@/content/math6/videos/lib/m6-11-figures.ts';

// The bean plant measured on days 0, 4 and 8: 3, 5 and 7 cm.
const beans = (id: string) =>
  figure(id, [plants({ heights: [3, 5, 7], gap: 2.4, scale: 0.45, weeks: ['\\text{day } 0', '\\text{day } 4', '\\text{day } 8'] })], 440);

// The data on a graph, the line through them, and guides for reading day 6 and day 3.
const graph = (id: string) => {
  const g = plane({ x: [0, 12], y: [0, 10], every: 2, width: 7, height: 6, titles: { x: '\\text{Time (days), } d', y: '\\text{Height (cm), } h' } });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[0, 3], [8, 7]], tone: 'good' }),
      guide(g, 'up6', [6, 0], [6, 6], 'adj', { arrow: true }),
      guide(g, 'across6', [6, 6], [0, 6], 'adj', { arrow: true }),
      guide(g, 'up3', [3, 0], [3, 4.5], 'hyp', { arrow: true }),
      guide(g, 'across3', [3, 4.5], [0, 4.5], 'hyp', { arrow: true }),
      dots(g, [
        { id: 'd0', x: 0, y: 3 },
        { id: 'd4', x: 4, y: 5 },
        { id: 'd8', x: 8, y: 7 },
        { id: 'r6', x: 6, y: 6, tex: '6\\text{ cm}', tone: 'adj', place: 'below right' },
        { id: 'r3', x: 3, y: 4.5, tex: '4.5\\text{ cm}', tone: 'hyp', place: 'below right' },
      ]),
    ],
    520,
  );
};
const base = (fig: string) => [`${fig}.grid`, `${fig}.axes`, `${fig}.d0`, `${fig}.d4`, `${fig}.d8`, `${fig}.ln`];

const video: Explainer = {
  id: 'm9-4-2-c',
  lessonId: 'm9-4-2',
  title: 'Graphing Linear Relations, Part 3: Interpolating',
  thumbnailTitle: 'Interpolating',
  thumbnail: 'gr',
  summary:
    'To interpolate is to estimate a value between known data points by reading the line. A bean plant measured on days 0, 4 and 8 was 3, 5 and 7 cm tall. Day 6 is between the measurements, so go up from 6 to the line and across: 6 cm. The equation checks it: the plant grows 2 cm in 4 days, or 0.5 cm a day, so h = 0.5d + 3 and h = 0.5(6) + 3 = 6. Between grid lines, day 3 gives 4.5 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 3', title: 'Interpolating', subtitle: 'Reading between the data' }],
      lines: [
        { say: 'A plant was measured on a few days, but not every day. How tall was it on a day in between? A graph can tell you.', show: 'title' },
        { say: 'In this part, you will estimate values between data points. This is called interpolating.' },
      ],
    },
    {
      chapter: 'The data',
      layout: 'split',
      leftWidth: 540,
      left: [beans('bn')],
      right: [graph('gr')],
      lines: [
        { say: 'A bean plant was measured on day zero, day four and day eight. It was three centimetres tall on day zero.', show: ['bn.p0', 'bn.h0', 'bn.w0', 'gr.grid', 'gr.axes', 'gr.d0'] },
        { say: 'It was five centimetres tall on day four, and seven centimetres tall on day eight.', show: ['bn.p1', 'bn.h1', 'bn.w1', 'bn.p2', 'bn.h2', 'bn.w2', 'gr.d4', 'gr.d8'] },
        { say: 'Height and time are measurements, so the data are continuous. The points lie in a straight line, so join them with a solid line.', show: 'gr.ln', focus: 'gr.ln' },
      ],
    },
    {
      chapter: 'Interpolate',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interpolate', md: 'To **interpolate** is to estimate a value **between** known data points, by reading the line.' },
      ],
      lines: [
        { say: 'To interpolate is to estimate a value between known data points, by reading the line.', show: ['def', ...base('gr')] },
        { say: 'How tall was the plant on day six? Day six is between the measurements on days four and eight, so this is interpolation.' },
        { say: 'Go up from six on the time axis until you meet the line.', show: 'gr.up6', focus: 'gr.up6' },
        { say: 'Then go across to the height axis. The plant was about six centimetres tall on day six.', show: ['gr.across6', 'gr.r6'], focus: ['gr.across6', 'gr.r6'] },
      ],
    },
    {
      chapter: 'Check with the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Rate: } 2 \\text{ cm in } 4 \\text{ days} \\;\\to\\; 2 \\div 4 = 0.5 \\text{ cm a day}', 'h = 0.5d + 3', 'd = 6: \\quad h = 0.5(6) + 3 = 3 + 3 = 6 \\;\\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'You can check with an equation. From day zero to day four, the plant grew two centimetres. Two centimetres in four days is zero point five centimetres a day.', show: 'm.0', focus: 'm.0' },
        { say: 'The plant started at three centimetres, so the equation is h equals zero point five d plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute d equals six: zero point five times six is three, and three plus three is six. The equation agrees with the graph: six centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Between grid lines',
      layout: 'split',
      leftWidth: 600,
      left: [graph('gr')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d = 3: \\quad h = 0.5(3) + 3', '= 1.5 + 3 = 4.5'] },
      ],
      lines: [
        { say: 'Sometimes the answer falls between grid lines. How tall was the plant on day three?', show: base('gr') },
        { say: 'Go up from three to the line, then across. You land halfway between four and five: about four point five centimetres.', show: ['gr.up3', 'gr.across3', 'gr.r3'], focus: ['gr.up3', 'gr.across3', 'gr.r3'] },
        { say: 'The equation gives the exact value: zero point five times three is one point five, and one point five plus three is four point five centimetres.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A plant grows at a steady rate. It is $2$ cm tall on day $0$, $5$ cm on day $6$ and $8$ cm on day $12$. Interpolate to estimate its height on day $4$.',
          choices: ['$4$ cm', '$5$ cm', '$6$ cm', '$2$ cm'],
          answer: 0,
          working: 'The plant grows $3$ cm in $6$ days, or $0.5$ cm a day, so $h = 0.5d + 2$. On day $4$: $h = 0.5(4) + 2 = 4$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A plant grows at a steady rate. It is two centimetres tall on day zero, five on day six, and eight on day twelve. Interpolate to estimate its height on day four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four centimetres. The plant grows three centimetres in six days, which is zero point five centimetres a day. In four days it grows two centimetres, so it is two plus two, or four centimetres tall. Choice C uses one centimetre a day, but the plant grows only half that much.', show: 'q.answer' },
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
            'To **interpolate** is to estimate a value between known data points.',
            'Go up from the value on the horizontal axis to the line, then across.',
            'Check with the equation: $h = 0.5(6) + 3 = 6$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To interpolate is to estimate a value between known data points.', show: 'sum.0' },
        { say: 'On a graph, go up from the value on the horizontal axis to the line, then across to the other axis.', show: 'sum.1' },
        { say: 'And check with the equation, which gives the exact value. In the next part, you will estimate values beyond the data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
