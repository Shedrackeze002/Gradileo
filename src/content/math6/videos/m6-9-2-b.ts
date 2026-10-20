import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { note, triangle } from './lib/m6-9-figures.ts';

// The triangle of the lesson's warning: a base of 10 cm, its top corner 6 cm up and 2.5 cm along,
// so the slanted side on the left is 6.5 cm (2.5, 6 and 6.5 make a right triangle).
const leaning = (id: string, side: boolean) =>
  figure(id, [triangle({ b: 10, apex: [2.5, 6], labels: { b: '10\\text{ cm}', h: '6\\text{ cm}', left: side ? '6.5\\text{ cm}' : undefined } })]);

const video: Explainer = {
  id: 'm6-9-2-b',
  lessonId: 'm6-9-2',
  title: 'Area of a Triangle, Part 2: The Height of a Triangle',
  thumbnailTitle: 'The Height of a Triangle',
  thumbnail: 'kinds',
  summary: 'The height of a triangle is the distance from the base straight up to the opposite corner, at a right angle. It can be inside the triangle, a side of a right triangle, or outside the triangle on the extended base. A triangle with a base of 6 m and a height of 4 m outside it has an area of 12 m²; with a slanted side of 6.5 cm and a height of 6 cm on a 10 cm base, the area is 30 cm².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 2', title: 'The Height of a Triangle', subtitle: 'Inside, along a side, or outside' }],
      lines: [
        { say: 'To find the area of a triangle, you multiply its base by its height, then divide by two. But where exactly is the height of a triangle?', show: 'title' },
        { say: 'It is not always where you expect! In this video, you will find the height of different triangles, and use it to find their areas.' },
      ],
    },
    {
      chapter: 'The height of a triangle',
      layout: 'split',
      leftWidth: 560,
      left: [leaning('t', false)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Height of a triangle', md: 'The **height** is the distance from the base **straight up** to the **opposite corner**. It meets the base at a **right angle**.' }],
      lines: [
        { say: 'First, choose one side of the triangle to be its base. Here, it is the bottom side, ten centimetres long.', show: ['t.shape', 't.base'], focus: 't.base' },
        { say: 'The height is the distance from the base straight up to the opposite corner: the corner across from the base, at the top.', show: 'def' },
        { say: 'Just like the height of a parallelogram, it meets the base at a right angle. So we draw it as a dashed line with a small square.', show: 't.h', focus: 't.h' },
        { say: 'In this triangle, the height is inside the triangle. It is six centimetres.', focus: 't' },
      ],
    },
    {
      chapter: 'Three places for the height',
      layout: 'center',
      main: [
        figure(
          'kinds',
          [
            triangle({ name: 'in', b: 6, apex: [2, 5.5], tone: 'brand' }),
            note('in-name', [3, -0.6], '\\text{inside}', 'below', 'muted'),
            triangle({ name: 'rt', b: 6, apex: [0, 5.5], at: [8.5, 0], tone: 'good' }),
            note('rt-name', [11.5, -0.6], '\\text{a side}', 'below', 'muted'),
            triangle({ name: 'out', b: 6, apex: [8.5, 5.5], at: [17, 0], tone: 'hyp' }),
            note('out-name', [21.25, -0.6], '\\text{outside}', 'below', 'muted'),
          ],
          400,
        ),
      ],
      lines: [
        { say: 'The height of a triangle can be in three different places. In many triangles, like this one, the height is inside the triangle.', show: ['kinds.in-shape', 'kinds.in-base', 'kinds.in-h', 'kinds.in-name'], focus: 'kinds.in-h' },
        { say: 'This is a right triangle. One of its corners is a square corner. The two sides that make that square corner are a base and a height.', show: ['kinds.rt-shape', 'kinds.rt-base'], focus: 'kinds.rt-shape' },
        { say: 'So in a right triangle, the height is one of the sides of the triangle!', show: ['kinds.rt-h', 'kinds.rt-name'], focus: 'kinds.rt-h' },
        { say: 'In some triangles, the top corner leans out past the end of the base. Then the height is outside the triangle.', show: ['kinds.out-shape', 'kinds.out-base'], focus: 'kinds.out-shape' },
        { say: 'Extend the base with a dashed line, and draw the height from the top corner straight down to it.', show: ['kinds.out-ext', 'kinds.out-h', 'kinds.out-name'], focus: ['kinds.out-ext', 'kinds.out-h'] },
      ],
    },
    {
      chapter: 'A height outside the triangle',
      layout: 'split',
      leftWidth: 560,
      left: [figure('o', [triangle({ b: 6, apex: [9, 4], tone: 'hyp', labels: { b: '6\\text{ m}', h: '4\\text{ m}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = (b \\times h) \\div 2', '\\phantom{A} = (6 \\times 4) \\div 2', '\\phantom{A} = 24 \\div 2 = 12', '\\text{Area} = 12\\text{ m}^2'] }],
      lines: [
        { say: 'Find the area of this triangle. Its base is six metres, and its height is four metres. The height is outside the triangle, on the extended base.', show: ['o.shape', 'o.base', 'o.ext', 'o.h'] },
        { say: 'The rule still works. Multiply the base by the height: six times four is twenty-four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then divide by two: twenty-four divided by two is twelve. So the area is twelve square metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Notice that the dashed extension is not part of the base. The base is still six metres. The extension is only there to show where the height lands.', focus: ['o.base', 'o.ext'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [leaning('w', true)],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the height, not a slanted side', md: 'The slanted side is $6.5\\text{ cm}$, but the height is $6\\text{ cm}$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(10 \\times 6) \\div 2 = 60 \\div 2 = 30', '\\text{Area} = 30\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Here is a common mistake. In this triangle, the slanted side on the left is six point five centimetres, and the height is six centimetres.', show: ['w.shape', 'w.base', 'w.left', 'w.h'], focus: ['w.left', 'w.h'] },
        { say: 'The slanted side leans over, so it is not the height. Use the height, which meets the base at a right angle.', show: 'oops', focus: 'w.h' },
        { say: 'So the area is ten times six, divided by two. Ten times six is sixty, and sixty divided by two is thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'The area is thirty square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has a base of $9\\text{ cm}$, a height of $8\\text{ cm}$ and a slanted side of $10\\text{ cm}$. What is its area?',
          choices: ['$45\\text{ cm}^2$', '$36\\text{ cm}^2$', '$72\\text{ cm}^2$', '$90\\text{ cm}^2$'],
          answer: 1,
          working: '$A = (9 \\times 8) \\div 2 = 72 \\div 2 = 36$, so the area is $36\\text{ cm}^2$. The slanted side is not used.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has a base of nine centimetres, a height of eight centimetres, and a slanted side of ten centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, thirty-six square centimetres. Nine times eight is seventy-two, and half of seventy-two is thirty-six. Choice A uses the slanted side instead of the height.', show: 'q.answer' },
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
          items: ['The height goes from the base straight up to the opposite corner, at a right angle.', 'It can be inside the triangle, a side of a right triangle, or outside on the extended base.', 'Use the height, not a slanted side.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The height of a triangle goes from the base straight up to the opposite corner, at a right angle.', show: 'sum.0' },
        { say: 'It can be inside the triangle, one of the sides of a right triangle, or outside the triangle, on the extended base.', show: 'sum.1' },
        { say: 'And always use the height, not a slanted side. In the next part, you will work backwards to find a missing base or height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
