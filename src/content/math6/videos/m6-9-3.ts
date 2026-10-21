import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, note, piece, seg } from './lib/m6-9-figures.ts';

type P = [number, number];

// The barn wall of the lesson: a rectangle 8 m wide and 5 m tall with a triangular roof 3 m high.
const wall: P[] = [[0, 0], [8, 0], [8, 5], [4, 8], [0, 5]];
const barn = (id: string, split: boolean) =>
  figure(id, [
    piece('shape', wall, { tone: 'brand', shade: split ? 0 : 0.2 }),
    piece('rect', [[0, 0], [8, 0], [8, 5], [0, 5]], { tone: 'good', shade: 0.3, outline: false }),
    piece('roof', [[0, 5], [8, 5], [4, 8]], { tone: 'theta', shade: 0.3, outline: false }),
    seg('cut', [0, 5], [8, 5], { tone: 'theta', dashed: true, weight: 3 }),
    seg('b', [0, 0], [8, 0], { tone: 'adj', weight: 5, label: '8\\text{ m}', side: 'right' }),
    seg('r', [8, 0], [8, 5], { tone: 'opp', weight: 5, label: '5\\text{ m}', side: 'right' }),
    height('h', [4, 8], [4, 5], [3, 5], { label: '3\\text{ m}', side: 'right', at: 0.45 }),
    note('a1', [4, 2.5], '40\\text{ m}^2'),
    note('a2', [5.45, 5.6], '12\\text{ m}^2'),
  ]);

const video: Explainer = {
  id: 'm6-9-3',
  lessonId: 'm6-9-3',
  title: 'Area of Composite Shapes, Part 1: Split into Simpler Shapes',
  thumbnailTitle: 'Split into Simpler Shapes',
  thumbnail: 'sp',
  summary: 'A composite shape is made of simpler shapes, such as rectangles, triangles and parallelograms, and its area is the sum of the areas of its parts. A barn wall splits into an 8 m by 5 m rectangle (40 m²) and a triangular roof with a base of 8 m and a height of 3 m (12 m²), so its area is 52 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 1', title: 'Split into Simpler Shapes', subtitle: 'Find each part, then add' }],
      lines: [
        { say: 'The end wall of a barn is not a rectangle, and it is not a triangle. It is both!', show: 'title' },
        { say: 'In this video, you will find the area of shapes like this, by splitting them into shapes you already know.' },
      ],
    },
    {
      chapter: 'Composite shapes',
      layout: 'split',
      leftWidth: 480,
      left: [barn('bw', false)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Composite shape', md: 'A **composite shape** is made of two or more simpler shapes, such as rectangles, triangles and parallelograms. Its area is the **sum** of the areas of its parts.' }],
      lines: [
        { say: 'This is the end wall of a barn. It has a flat bottom, two straight sides, and a pointed roof on top.', show: 'bw.shape' },
        { say: 'A shape like this is called a composite shape. A composite shape is made of two or more simpler shapes, such as rectangles, triangles and parallelograms.', show: 'def' },
        { say: 'Its area is the sum of the areas of its parts. The sum means the total you get when you add them.', focus: 'def' },
      ],
    },
    {
      chapter: 'Split, find each area, add',
      layout: 'split',
      leftWidth: 480,
      left: [barn('sp', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{rectangle: } 8 \\times 5 = 40}', '\\thc{\\text{triangle: } (8 \\times 3) \\div 2 = 12}', '40 + 12 = 52', '\\text{Area} = 52\\text{ m}^2'] }],
      lines: [
        { say: 'Split the wall along the dashed line. Below the line is a rectangle. Above it is a triangle: the roof.', show: ['sp.shape', 'sp.cut', 'sp.rect', 'sp.roof'], focus: 'sp.cut' },
        { say: 'A rectangle is a parallelogram with square corners, so its area is base times height. The rectangle is eight metres wide and five metres tall.', show: ['sp.b', 'sp.r'], focus: ['sp.rect', 'sp.b', 'sp.r'] },
        { say: 'Eight times five is forty. So the rectangle has an area of forty square metres.', show: ['m.0', 'sp.a1'], focus: ['m.0', 'sp.a1'] },
        { say: 'The triangle has a base of eight metres, the width of the barn. Its height is three metres, from the dashed line straight up to the top.', show: 'sp.h', focus: ['sp.roof', 'sp.h'] },
        { say: 'Eight times three is twenty-four, and half of twenty-four is twelve. So the roof has an area of twelve square metres.', show: ['m.1', 'sp.a2'], focus: ['m.1', 'sp.a2'] },
        { say: 'Now add the parts: forty plus twelve is fifty-two. The area of the barn wall is fifty-two square metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Split** the shape into simpler shapes, with no gaps and no overlaps.', '**Find** the area of each part. Use the lengths that belong to that part.', '**Add** the areas of the parts.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Shared lengths', md: 'One length can belong to two parts. The barn’s $8\\text{ m}$ width is the base of the rectangle **and** of the triangle.' },
      ],
      lines: [
        { say: 'Here are the steps. First, split the shape into simpler shapes, with no gaps and no overlaps.', show: 'b.0' },
        { say: 'Next, find the area of each part. For each part, use the lengths that belong to it.', show: 'b.1' },
        { say: 'Then add the areas of the parts.', show: 'b.2' },
        { say: 'Sometimes one length belongs to two parts. The width of the barn, eight metres, is the base of the rectangle and the base of the triangle.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A house shape is a rectangle $6\\text{ m}$ wide and $4\\text{ m}$ tall, with a triangular roof on top. The roof has a base of $6\\text{ m}$ and a height of $2\\text{ m}$. What is the total area?',
          choices: ['$36\\text{ m}^2$', '$30\\text{ m}^2$', '$26\\text{ m}^2$', '$48\\text{ m}^2$'],
          answer: 1,
          working: 'Rectangle: $6 \\times 4 = 24$. Roof: $(6 \\times 2) \\div 2 = 6$. Total: $24 + 6 = 30\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A house shape is a rectangle six metres wide and four metres tall, with a triangular roof on top. The roof has a base of six metres and a height of two metres. What is the total area? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, thirty square metres. The rectangle is six times four, which is twenty-four. The roof is six times two, divided by two, which is six. Twenty-four plus six is thirty. Choice A forgets to divide the roof by two.', show: 'q.answer' },
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
          items: ['A composite shape is made of simpler shapes.', 'Split it, find the area of each part, and add.', 'A rectangle is a parallelogram: its area is base $\\times$ height.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A composite shape is made of simpler shapes, such as rectangles, triangles and parallelograms.', show: 'sum.0' },
        { say: 'To find its area, split it, find the area of each part, and add.', show: 'sum.1' },
        { say: 'And a rectangle is a parallelogram with square corners, so its area is base times height. In the next part, you will split one shape in different ways. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
