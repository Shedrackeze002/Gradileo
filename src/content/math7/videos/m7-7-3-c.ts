import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, join, piece, seg, triangle } from '@/content/math6/videos/lib/m6-9-figures.ts';

// The front wall of a shed: a 6 m by 3 m rectangle with a triangle on top, 2 m high.
const shed = (id: string) =>
  figure(
    id,
    [
      join(
        piece('rect', [
          [0, 0],
          [6, 0],
          [6, 3],
          [0, 3],
        ], { tone: 'adj', shade: 0.2 }),
        piece('roof', [
          [0, 3],
          [6, 3],
          [3, 5],
        ], { tone: 'theta', shade: 0.3 }),
        seg('w', [0, 0], [6, 0], { tone: 'adj', weight: 5, label: '6\\text{ m}', side: 'right' }),
        seg('hr', [6, 0], [6, 3], { tone: 'opp', weight: 5, label: '3\\text{ m}', side: 'right' }),
        height('h', [3, 5], [3, 3], [4, 3], { label: '2\\text{ m}', side: 'left' }),
      ),
    ],
    420,
  );

// The sail: an area of 15 m² and a base of 5 m; its height is unknown (6 m).
const sail = (id: string) => figure(id, [triangle({ b: 5, apex: [1.5, 6], tone: 'hyp', labels: { b: '5\\text{ m}', h: 'h = \\, ?' } })], 420);

const video: Explainer = {
  id: 'm7-7-3-c',
  lessonId: 'm7-7-3',
  title: 'Area of a Triangle, Part 3: Composite Shapes and Missing Heights',
  thumbnailTitle: 'Composite Shapes',
  thumbnail: 'sh',
  summary:
    'A composite shape is made of simpler shapes: find the area of each part, then add. The front wall of a shed, a 6 m by 3 m rectangle with a triangle 2 m high on top, has an area of 18 + 6 = 24 m². To find a missing height, double the area, then divide by the base: a sail of 15 m² with a base of 5 m is 30 ÷ 5 = 6 m tall.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 3', title: 'Composite Shapes and Missing Heights', subtitle: 'Split, add, and work backwards' }],
      lines: [
        { say: 'Many shapes around you are made of rectangles and triangles put together, like the front of a house with its pointed roof.', show: 'title' },
        { say: 'In this video, you will find the area of a shape like that, and work backwards from the area of a triangle to its height.' },
      ],
    },
    {
      chapter: 'The front of a shed',
      layout: 'split',
      leftWidth: 520,
      left: [shed('sh')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Composite shape', md: 'A **composite shape** is made of simpler shapes. Find the area of each part, then **add**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Rectangle: } 6 \\times 3 = 18', '\\text{Triangle: } 6 \\times 2 \\div 2 = 6', '\\text{Total: } 18 + 6 = 24\\text{ m}^2'] },
      ],
      lines: [
        { say: 'The front wall of a shed is a rectangle with a triangle on top. A shape made of simpler shapes like this is called a composite shape.', show: ['sh.rect', 'sh.roof', 'def'] },
        { say: 'Find the area of each part. The rectangle is six metres wide and three metres tall. Six times three is eighteen square metres.', show: ['sh.w', 'sh.hr', 'm.0'], focus: ['sh.rect', 'm.0'] },
        { say: 'The triangle sits on top of the rectangle, so its base is the top of the rectangle: six metres. Its height is two metres. Six times two, divided by two, is six square metres.', show: ['sh.h', 'm.1'], focus: ['sh.roof', 'm.1'] },
        { say: 'Now add the parts. Eighteen plus six is twenty-four. The wall has an area of twenty-four square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Find a missing height',
      layout: 'split',
      leftWidth: 480,
      left: [sail('sl')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = bh \\div 2', '15 = 5 \\times h \\div 2', '5 \\times h = 2 \\times 15 = 30', 'h = 30 \\div 5 = 6\\text{ m}', '\\text{Check: } 5 \\times 6 \\div 2 = 15 \\;\\checkmark'] }],
      lines: [
        { say: 'A triangular sail has an area of fifteen square metres and a base of five metres. How tall is it?', show: ['sl.shape', 'sl.base', 'sl.h'] },
        { say: 'Substitute into the formula: fifteen equals five times h, divided by two.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Work backwards. The last step was dividing by two, so undo it first: double the area. Two times fifteen is thirty, so five times h is thirty.', show: 'm.2', focus: 'm.2' },
        { say: 'Then undo multiplying by five: divide by five. Thirty divided by five is six. The sail is six metres tall.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: five times six is thirty, and thirty divided by two is fifteen. It works!', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Double, then divide',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'A missing height or base of a triangle', md: '**Double** the area, then **divide** by the length you know.' }],
      lines: [
        { say: 'Here is the short way to remember it. To find a missing height of a triangle, double the area, then divide by the base.', show: 'tip' },
        { say: 'It works for a missing base as well: double the area, then divide by the height. Doubling gives you the area of the whole parallelogram first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has an area of $24\\text{ cm}^2$ and a base of $8$ cm. What is its height?',
          choices: ['$3$ cm', '$192$ cm', '$16$ cm', '$6$ cm'],
          answer: 3,
          working: 'Double the area: $2 \\times 24 = 48$. Divide by the base: $48 \\div 8 = 6$ cm. Check: $8 \\times 6 \\div 2 = 24$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has an area of twenty-four square centimetres and a base of eight centimetres. What is its height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, six centimetres. Double the area: forty-eight. Then divide by the base: forty-eight divided by eight is six. Choice A forgets to double the area first.', show: 'q.answer' },
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
          items: ['For a **composite shape**, split it, find each area, and add.', 'To find a missing height of a triangle, double the area, then divide by the base.', 'Check by putting the answer back into $A = bh \\div 2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For a composite shape, split it into simpler shapes, find the area of each one, and add.', show: 'sum.0' },
        { say: 'To find a missing height of a triangle, double the area, then divide by the base.', show: 'sum.1' },
        { say: 'And check your answer in the formula. In the next lesson, you will find the area of a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
