import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// T-shirts: C = 5n + 20 for 0 to 8 shirts, as separate points; and the line that should not be drawn.
const shirts = (id: string) => {
  const g = plane({ x: [0, 8], y: [0, 70], yStep: 10, width: 7, height: 6, titles: { x: '\\text{T-shirts, } n', y: '\\text{Cost (\\$), } C' } });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'join', points: [[0, 20], [8, 60]], tone: 'bad', dashed: true }),
      dots(g, Array.from({ length: 9 }, (_, n) => ({ id: `p${n}`, x: n, y: 5 * n + 20, group: 'pts' }))),
      dots(g, [{ id: 'half', x: 2.5, y: 32.5, tex: '2.5 \\text{ shirts?}', tone: 'bad', place: 'below right', open: true }]),
    ],
    520,
  );
};

// The bean plant: h = 0.5d + 3, a solid line from day 0 to day 12, with the point for day 2.5.
const bean = (id: string) => {
  const g = plane({ x: [0, 12], y: [0, 10], every: 2, width: 7, height: 6, titles: { x: '\\text{Time (days), } d', y: '\\text{Height (cm), } h' } });
  return figure(
    id,
    [
      g,
      polyline(g, { id: 'ln', points: [[0, 3], [12, 9]], tone: 'good' }),
      dots(g, [{ id: 'mid', x: 2.5, y: 4.25, tex: '(2.5,\\ 4.25)', tone: 'opp', place: 'below right' }]),
    ],
    520,
  );
};

const video: Explainer = {
  id: 'm9-4-2-b',
  lessonId: 'm9-4-2',
  title: 'Graphing Linear Relations, Part 2: Discrete or Continuous?',
  thumbnailTitle: 'Discrete or Continuous?',
  thumbnail: 'bn',
  summary:
    'Discrete data can only take separate values, usually counts such as people, tickets or shirts, and are graphed as separate points: a shop that charges a $20 set-up fee plus $5 a T-shirt, C = 5n + 20, has no cost for 2.5 shirts. Continuous data can take any value in a range, usually measurements such as time, length or volume, and are graphed as a solid line: a bean plant 3 cm tall that grows 0.5 cm a day, h = 0.5d + 3, has a height at 2.5 days too. Points that lie in a straight line are not always continuous: ask whether values between them make sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Linear Relations · Part 2', title: 'Discrete or Continuous?', subtitle: 'To join the points, or not' }],
      lines: [
        { say: 'When you graph a relation, should you join the points with a line, or leave them as separate dots? It depends on what the numbers count or measure.', show: 'title' },
        { say: 'In this part, you will learn the difference between discrete and continuous data, and how to graph each one.' },
      ],
    },
    {
      chapter: 'Discrete data',
      layout: 'split',
      leftWidth: 520,
      left: [shirts('sh')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Discrete data', md: '**Discrete data** can only take separate values, usually **counts**, such as people, tickets or shirts. Graph discrete data as **separate points**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = 5n + 20', 'n = 2\\text{:}', 'C = 5(2) + 20 = 30'] },
      ],
      lines: [
        { say: 'A shop charges a twenty dollar set-up fee, plus five dollars for each team T-shirt. So the cost, C, for n shirts is C equals five n plus twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'For two shirts, five times two plus twenty is thirty dollars. Plot the cost for zero, one, two, and up to eight shirts.', show: ['m.1', 'm.2', 'sh.grid', 'sh.axes', 'sh.pts'] },
        { say: 'You cannot order two and a half shirts. The number of shirts can only be a whole number. Data like this is called discrete.', show: 'def' },
        { say: 'Discrete data can only take separate values, usually counts, like people, tickets or shirts. Graph it as separate points, without a line.' },
      ],
    },
    {
      chapter: 'Continuous data',
      layout: 'split',
      leftWidth: 520,
      left: [bean('bn')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Continuous data', md: '**Continuous data** can take **any** value in a range, usually **measurements**, such as time, length or volume. Graph continuous data as a **solid line**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 0.5d + 3', 'd = 2.5\\text{:}', 'h = 0.5(2.5) + 3 = 4.25'] },
      ],
      lines: [
        { say: 'A bean plant is three centimetres tall and grows zero point five centimetres each day. Its height, h, after d days is h equals zero point five d plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Time can be any value, like two and a half days. After two and a half days, the plant is four point two five centimetres tall.', show: ['m.1', 'm.2', 'bn.grid', 'bn.axes', 'bn.mid'], focus: ['m.2', 'bn.mid'] },
        { say: 'The plant has a height at every moment, so the graph is a solid line.', show: 'bn.ln', focus: 'bn.ln' },
        { say: 'Data like this is called continuous. It can take any value in a range, usually measurements like time, length or volume. Graph it as a solid line.', show: 'def' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 520,
      left: [shirts('sh')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Joining points that cannot be joined', md: 'The T-shirt points lie in a straight line, but that does not make the data continuous. Ask whether values **between** the points make sense.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. The T-shirt points lie in a straight line, so it is tempting to join them.', show: ['sh.grid', 'sh.axes', 'sh.pts', 'sh.join'], focus: 'sh.join' },
        { say: 'But a line would include points like two and a half shirts, and nobody can order half a shirt.', show: 'sh.half', focus: 'sh.half' },
        { say: 'Points in a straight line do not make the data continuous. Ask whether values between the points make sense. For shirts they do not, so leave the points separate.', show: 'oops' },
      ],
    },
    {
      chapter: 'Counts and measurements',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Discrete: counts', 'Continuous: measurements'],
          rows: [
            ['people', 'time'],
            ['tickets', 'length or height'],
            ['shirts', 'volume'],
            ['separate points', 'a solid line'],
          ],
        },
      ],
      lines: [
        { say: 'Here is a quick way to decide. Things you count, like people, tickets and shirts, are discrete.', show: ['t.0', 't.1', 't.2'] },
        { say: 'Things you measure, like time, length, height and volume, are usually continuous.' },
        { say: 'Graph discrete data as separate points, and continuous data as a solid line.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these relations should be graphed as a solid line?',
          choices: ['The cost of $n$ concert tickets', 'The number of students on $n$ buses', 'The number of wheels on $n$ bikes', 'The height of water in a tank after $t$ minutes'],
          answer: 3,
          working: 'Time can take any value, such as $2.5$ minutes, so the height of the water is continuous. Tickets, buses and bikes are counted, so those relations are discrete.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these relations should be graphed as a solid line? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Time can take any value, like two and a half minutes, so the height of the water is continuous, and its graph is a solid line. Choice A is discrete: nobody can buy half a ticket, so its graph is separate points.', show: 'q.answer' },
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
            '**Discrete** data are counts: graph them as separate points.',
            '**Continuous** data are measurements: graph them as a solid line.',
            'Points in a straight line are not always continuous: ask whether values between them make sense.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Discrete data are usually counts. Graph them as separate points.', show: 'sum.0' },
        { say: 'Continuous data are usually measurements. Graph them as a solid line.', show: 'sum.1' },
        { say: 'And points in a straight line are not always continuous. Ask whether the values between them make sense. In the next part, you will read values between data points. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
