import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

// The L-shaped room: 10 m along the bottom, 5 m up the right, a step 4 m across and 3 m up, 6 m along the top and 8 m down the left.
const room = (id: string, o: { split?: boolean; whole?: boolean } = {}) =>
  figure(
    id,
    [
      outline({
        corners: [[0, 0], [10, 0], [10, 5], [6, 5], [6, 8], [0, 8]],
        labels: [
          { id: 'b', at: [5, 0], tex: '10\\text{ m}', place: 'below', tone: 'adj' },
          { id: 'r', at: [10, 2.5], tex: '5\\text{ m}', place: 'right', tone: 'opp' },
          { id: 't', at: [3, 8], tex: '6\\text{ m}', place: 'above', tone: 'adj' },
          { id: 'l', at: [0, 4], tex: '8\\text{ m}', place: 'left', tone: 'opp' },
          { id: 'step', at: [8, 5], tex: '4\\text{ m}', place: o.whole ? 'below' : 'above', tone: 'theta' },
          { id: 'rise', at: [6, 6.5], tex: '3\\text{ m}', place: 'left', tone: 'theta' },
          { id: 'a1', at: [3, 4], tex: '48\\text{ m}^2', place: 'center' },
          { id: 'a2', at: [8, 2.5], tex: '20\\text{ m}^2', place: 'center' },
          { id: 'big', at: [5, 3], tex: '10 \\times 8 = 80\\text{ m}^2', place: 'center' },
          { id: 'gap', at: [8, 6.9], tex: '12\\text{ m}^2', place: 'center', tone: 'bad' },
        ],
        guides: o.split ? [{ id: 'cut', from: [6, 0], to: [6, 5], tone: 'theta' }] : [],
        cutouts: o.split
          ? [
              { id: 'left', corners: [[0, 0], [6, 0], [6, 8], [0, 8]], tone: 'adj' },
              { id: 'right', corners: [[6, 0], [10, 0], [10, 5], [6, 5]], tone: 'opp' },
            ]
          : o.whole
            ? [{ id: 'missing', corners: [[6, 5], [10, 5], [10, 8], [6, 8]], tone: 'bad' }]
            : [],
      }),
    ],
    430,
  );

const video: Explainer = {
  id: 'm5-10-2-e',
  lessonId: 'm5-10-2',
  title: 'Area and Perimeter of Rectangles, Part 5: Shapes Made of Rectangles',
  thumbnailTitle: 'Shapes Made of Rectangles',
  thumbnail: 'sp',
  summary: 'Finding the area of an L-shaped room by splitting it into rectangles: the missing side is 10 − 6 = 4 m, the two rectangles are 6 × 8 = 48 m² and 4 × 5 = 20 m², and the area is 48 + 20 = 68 m². A check: the 10 m by 8 m rectangle, 80 m², less the missing corner of 12 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area · Part 5', title: 'Shapes Made of Rectangles', subtitle: 'Split, find each area, then add' }],
      lines: [
        { say: 'Not every room is a rectangle. Some rooms are shaped like a capital letter L. How can you find their area?', show: 'title' },
        { say: 'In this video, you will split a shape into rectangles, find the area of each one, and add them together.' },
      ],
    },
    {
      chapter: 'An L-shaped room',
      layout: 'split',
      leftWidth: 560,
      left: [room('rm')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{bottom: } 10\\text{ m}', '\\text{top: } 6\\text{ m}', '\\text{step: } 10 - 6 = 4\\text{ m}'] }],
      lines: [
        { say: 'Here is the floor of an L-shaped room. The bottom is ten metres long, and the left side is eight metres.', show: ['rm.shape', 'rm.b', 'rm.l'] },
        { say: 'The right side is five metres, and the top is six metres.', show: ['rm.r', 'rm.t'] },
        { say: 'One side is missing a length: the step on the right, where the room gets narrower. We can work it out.', focus: 'rm.shape' },
        { say: 'The bottom goes all the way across, ten metres. The top only goes six metres of the way. So the step is ten minus six, which is four metres wide.', show: ['m.0', 'm.1', 'm.2', 'rm.step'], focus: ['m.2', 'rm.step'] },
      ],
    },
    {
      chapter: 'Split and add',
      layout: 'split',
      leftWidth: 560,
      left: [room('sp', { split: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{left: } 6 \\times 8 = 48}', '\\opp{\\text{right: } 4 \\times 5 = 20}', '48 + 20 = 68', '\\text{Area} = 68\\text{ m}^2'] }],
      lines: [
        { say: 'Now split the room into two rectangles, with a straight line going up from the corner of the step.', show: ['sp.shape', 'sp.b', 'sp.l', 'sp.r', 'sp.t', 'sp.step', 'sp.cut'], focus: 'sp.cut' },
        { say: 'The left rectangle is six metres wide and eight metres tall. Its area is six times eight, which is forty-eight square metres.', show: ['sp.left', 'sp.a1', 'm.0'], focus: ['sp.left', 'm.0'] },
        { say: 'The right rectangle is four metres wide and five metres tall. Its area is four times five, which is twenty square metres.', show: ['sp.right', 'sp.a2', 'm.1'], focus: ['sp.right', 'm.1'] },
        { say: 'Now add the two areas: forty-eight plus twenty is sixty-eight. So the area of the room is sixty-eight square metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Another way to check',
      layout: 'split',
      leftWidth: 560,
      left: [room('wh', { whole: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{whole: } 10 \\times 8 = 80', '\\text{missing: } 4 \\times 3 = 12', '80 - 12 = 68\\text{ m}^2 \\;\\checkmark'] }],
      lines: [
        { say: 'Here is another way, to check. Imagine the room were a whole rectangle, ten metres by eight metres. Its area would be ten times eight, which is eighty square metres.', show: ['wh.shape', 'wh.b', 'wh.l', 'wh.big', 'm.0'], focus: 'm.0' },
        { say: 'But a corner is missing. It is four metres wide, and eight minus five, which is three metres tall. Its area is four times three, which is twelve square metres.', show: ['wh.missing', 'wh.step', 'wh.rise', 'wh.gap', 'm.1'], focus: ['wh.missing', 'm.1'] },
        { say: 'Eighty minus twelve is sixty-eight square metres. Both ways give the same answer, so we can be sure it is right!', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An L-shaped garden is split into two rectangles. One is $5\\text{ m}$ by $4\\text{ m}$, and the other is $3\\text{ m}$ by $2\\text{ m}$. What is the area of the garden?',
          choices: ['$14\\text{ m}^2$', '$20\\text{ m}^2$', '$26\\text{ m}^2$', '$120\\text{ m}^2$'],
          answer: 2,
          working: '$5 \\times 4 = 20$ and $3 \\times 2 = 6$. Add: $20 + 6 = 26\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. An L-shaped garden is split into two rectangles. One is five metres by four metres, and the other is three metres by two metres. What is the area of the garden? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-six square metres. Five times four is twenty, and three times two is six. Twenty plus six is twenty-six. Choice D multiplies the two areas together, instead of adding them.', show: 'q.answer' },
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
          items: ['Find any missing side lengths first.', 'Split the shape into rectangles, and find the area of each one.', 'Add the areas. Check with the whole rectangle, less the missing part.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. First, find any missing side lengths.', show: 'sum.0' },
        { say: 'Then split the shape into rectangles, and find the area of each one.', show: 'sum.1' },
        { say: 'Add the areas to get the total. You can check by taking the missing part away from a whole rectangle. Well done: you can now find areas of all kinds of shapes!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
