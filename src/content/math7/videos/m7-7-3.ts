import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, join, piece, seg, triangle } from '@/content/math6/videos/lib/m6-9-figures.ts';

type P = [number, number];

// The lesson's triangle: a base of 10 cm and a height of 6 cm, its top corner 3 cm along. A copy
// turned half a turn about the middle of its right side fits against it, making a parallelogram
// with the same base and height.
const A: P = [0, 0];
const B: P = [10, 0];
const C: P = [3, 6];
const A2: P = [13, 6];
const pair = (id: string) =>
  figure(
    id,
    [
      join(
        piece('one', [A, B, C], { tone: 'good', shade: 0.35 }),
        piece('two', [C, B, A2], { tone: 'theta', shade: 0.3, dashed: true }),
        seg('base', A, B, { tone: 'adj', weight: 5, label: '10\\text{ cm}', side: 'right' }),
        height('h', C, [3, 0], [4, 0], { label: '6\\text{ cm}', side: 'left', at: 0.55 }),
      ),
    ],
    400,
  );

// The right triangle of the tip: legs of 9 cm and 12 cm.
const right = (id: string) => figure(id, [triangle({ b: 9, apex: [0, 12], tone: 'hyp', labels: { b: '9\\text{ cm}', h: '12\\text{ cm}' }, hSide: 'right' })], 420);

const video: Explainer = {
  id: 'm7-7-3',
  lessonId: 'm7-7-3',
  title: 'Area of a Triangle, Part 1: Half of a Parallelogram',
  thumbnailTitle: 'Half of a Parallelogram',
  thumbnail: 'pr',
  summary:
    'Two copies of any triangle fit together to make a parallelogram with the same base and height, so the triangle is half of it: A = bh ÷ 2. A triangle with a base of 10 cm and a height of 6 cm has an area of 10 × 6 ÷ 2 = 30 cm². In a right triangle, the two sides that meet at the right angle are a base and a height: legs of 9 cm and 12 cm give 54 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 1', title: 'Half of a Parallelogram', subtitle: 'Two copies of a triangle' }],
      lines: [
        { say: 'Sails, flags and road signs are often triangles. How can you find the area of a triangle?', show: 'title' },
        { say: 'In this video, you will see that two copies of any triangle make a parallelogram. That tells us the rule for the area of a triangle.' },
      ],
    },
    {
      chapter: 'Two copies make a parallelogram',
      layout: 'split',
      leftWidth: 620,
      left: [pair('pr')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'A triangle is half', md: 'Two copies of a triangle make a parallelogram with the **same base and height**. So the triangle is **half** of that parallelogram.' }],
      lines: [
        { say: 'Here is a triangle. Its base, along the bottom, is ten centimetres. Its height, from the top corner straight down to the base, is six centimetres.', show: ['pr.one', 'pr.base', 'pr.h'] },
        { say: 'Now take a second copy of the same triangle. Turn it around, half a turn, and fit it against the slanted side of the first one.', show: 'pr.two', focus: 'pr.two' },
        { say: 'Together, the two triangles make a parallelogram! Its base is ten centimetres, and its height is six centimetres: the same base and the same height as the triangle.', focus: ['pr.one', 'pr.two'] },
        { say: 'The two triangles are exactly the same size, so each one is half of the parallelogram.', show: 'key' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area of a triangle', md: 'Multiply the **base** by the **height**, then **divide by 2**.' },
        { kind: 'math', id: 'm', size: 'xl', lines: ['A = \\adj{b}\\opp{h} \\div 2', '\\left(\\text{or } A = \\tfrac{1}{2}\\adj{b}\\opp{h}\\right)'] },
      ],
      lines: [
        { say: 'The area of the parallelogram is base times height. The triangle is half of it.', show: 'key' },
        { say: 'So the area of a triangle is base times height, divided by two: "A" equals b h divided by two.', show: 'm.0', focus: 'm.0' },
        { say: 'You may also see it written as one half times b h. Dividing by two and taking one half are the same thing.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A first triangle',
      layout: 'split',
      leftWidth: 620,
      left: [pair('ex')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = bh \\div 2', 'A = 10 \\times 6 \\div 2', 'A = 60 \\div 2', 'A = 30\\text{ cm}^2'] }],
      lines: [
        { say: 'Find the area of the green triangle. Its base is ten centimetres, and its height is six centimetres.', show: ['ex.one', 'ex.base', 'ex.h', 'm.0'] },
        { say: 'Substitute: ten times six, divided by two.', show: 'm.1', focus: 'm.1' },
        { say: 'Ten times six is sixty. That is the area of the whole parallelogram.', show: ['m.2', 'ex.two'], focus: ['m.2', 'ex.two'] },
        { say: 'Sixty divided by two is thirty. The triangle has an area of thirty square centimetres.', show: 'm.3', focus: ['m.3', 'ex.one'] },
      ],
    },
    {
      chapter: 'Right triangles',
      layout: 'split',
      leftWidth: 480,
      left: [right('rt')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Right triangles', md: 'In a right triangle, the two sides that meet at the right angle are a **base** and a **height**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = 9 \\times 12 \\div 2', 'A = 108 \\div 2 = 54\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A right triangle has a square corner, a right angle. Here, it is at the bottom left.', show: ['rt.shape', 'rt.base'], focus: 'rt.shape' },
        { say: 'The two sides that meet at the right angle are a base and a height. One goes along the bottom, and the other goes straight up from it.', show: ['rt.h', 'tip'], focus: ['rt.base', 'rt.h'] },
        { say: 'This right triangle has sides of nine centimetres and twelve centimetres at the right angle. Its area is nine times twelve, divided by two.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine times twelve is one hundred eight, and one hundred eight divided by two is fifty-four. The area is fifty-four square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has a base of $14$ cm and a height of $5$ cm. What is its area?',
          choices: ['$70\\text{ cm}^2$', '$19\\text{ cm}^2$', '$35\\text{ cm}^2$', '$17.5\\text{ cm}^2$'],
          answer: 2,
          working: '$A = bh \\div 2 = 14 \\times 5 \\div 2 = 70 \\div 2 = 35$, so the area is $35\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has a base of fourteen centimetres and a height of five centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, thirty-five square centimetres. Fourteen times five is seventy, and seventy divided by two is thirty-five. Choice A forgets to divide by two: it is the area of the whole parallelogram.', show: 'q.answer' },
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
          items: ['Two copies of a triangle make a parallelogram with the same base and height.', 'Area of a triangle: $A = bh \\div 2$.', 'In a right triangle, the two sides at the right angle are a base and a height.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two copies of a triangle make a parallelogram with the same base and height. So a triangle is half of that parallelogram.', show: 'sum.0' },
        { say: 'The area of a triangle is base times height, divided by two.', show: 'sum.1' },
        { say: 'In a right triangle, the two sides at the right angle are a base and a height. In the next part, you will find the height of a triangle when it is outside the triangle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
