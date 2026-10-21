import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/content/math6/videos/lib/m6-9-figures.ts';

// A triangle whose height is inside it: a base of 10 cm, its top corner 3 cm along and 6 cm up.
const inside = (id: string) => figure(id, [triangle({ b: 10, apex: [3, 6], labels: { b: '10\\text{ cm}', h: '6\\text{ cm}' } })], 380);

// The lesson's obtuse triangle: a base of 4 cm, its top corner 6 cm along and 8 cm up, so the
// height (8 cm) meets the base extended, outside the triangle, and the left side is 10 cm.
const obtuse = (id: string, o: { side?: boolean } = {}) =>
  figure(id, [triangle({ b: 4, apex: [6, 8], tone: 'hyp', labels: { b: '4\\text{ cm}', h: '8\\text{ cm}', left: o.side ? '10\\text{ cm}' : undefined } })], 440);

const video: Explainer = {
  id: 'm7-7-3-b',
  lessonId: 'm7-7-3',
  title: 'Area of a Triangle, Part 2: Height Outside the Triangle',
  thumbnailTitle: 'Height Outside the Triangle',
  thumbnail: 'ob',
  summary:
    'The height of a triangle goes from the top vertex straight down to the line of the base, at a right angle. In an obtuse triangle (one angle bigger than 90°), it can land outside the triangle, on the base extended with a dashed line. A triangle with a base of 4 cm, a height of 8 cm and a slanted side of 10 cm has an area of 4 × 8 ÷ 2 = 16 cm²; 4 × 10 ÷ 2 = 20 cm² wrongly uses the slanted side.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circles and Area · Part 2', title: 'Height Outside the Triangle', subtitle: 'Straight down to the line of the base' }],
      lines: [
        { say: 'To find the area of a triangle, you need its base and its height. Usually the height is inside the triangle. But not always!', show: 'title' },
        { say: 'In this video, you will find the height of a triangle that leans over, and use it to find the area.' },
      ],
    },
    {
      chapter: 'The height of a triangle',
      layout: 'split',
      leftWidth: 560,
      left: [inside('in')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Height of a triangle', md: 'The **height** goes from the top vertex **straight down** to the line of the base, at a **right angle**.' }],
      lines: [
        { say: 'Here is a triangle with a base of ten centimetres. A vertex is a corner of the triangle. The top vertex is the corner across from the base.', show: ['in.shape', 'in.base'], focus: 'in.base' },
        { say: 'The height goes from the top vertex straight down to the base, at a right angle. In this triangle, the height is inside the triangle. It is six centimetres.', show: ['def', 'in.h'], focus: 'in.h' },
      ],
    },
    {
      chapter: 'An obtuse triangle',
      layout: 'split',
      leftWidth: 560,
      left: [obtuse('ob')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Obtuse triangle', md: 'An **obtuse** triangle has one angle **bigger than** $90^\\circ$.' },
        { kind: 'text', id: 't', size: 'md', md: 'Extend the base with a **dashed line**, then draw the height to it.' },
      ],
      lines: [
        { say: 'This triangle is different. The angle at the right end of its base is bigger than a right angle, so the triangle leans far over to the right. A triangle with an angle bigger than ninety degrees is called an obtuse triangle.', show: ['ob.shape', 'ob.base', 'def'], focus: 'ob.shape' },
        { say: 'The top vertex is not above the base at all. So where does the height go?' },
        { say: 'First, extend the base with a dashed line, past its right end.', show: ['ob.ext', 't'], focus: 'ob.ext' },
        { say: 'Then draw the height from the top vertex straight down to the dashed line, at a right angle. The height is outside the triangle, and it is eight centimetres.', show: 'ob.h', focus: 'ob.h' },
      ],
    },
    {
      chapter: 'Find the area',
      layout: 'split',
      leftWidth: 560,
      left: [obtuse('ar', { side: true })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b = 4\\text{ cm}, \\; h = 8\\text{ cm}', 'A = bh \\div 2', 'A = 4 \\times 8 \\div 2', 'A = 32 \\div 2 = 16\\text{ cm}^2'] }],
      lines: [
        { say: 'Find the area of this obtuse triangle. Its base is four centimetres, its height is eight centimetres, and its slanted side on the left is ten centimetres.', show: ['ar.shape', 'ar.base', 'ar.ext', 'ar.h', 'ar.left'] },
        { say: 'Use the base and the height, which meets the extended base at a right angle. The slanted side is not used.', show: 'm.0', focus: ['ar.base', 'ar.h'] },
        { say: 'The area is base times height, divided by two: four times eight, divided by two.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Four times eight is thirty-two, and thirty-two divided by two is sixteen. The area is sixteen square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [obtuse('w', { side: true })],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using a slanted side as the height', md: '$4 \\times 10 \\div 2 = 20\\text{ cm}^2$ is wrong. A slanted side is longer than the height. Use the length that makes a **right angle** with the base, even when it is outside the triangle.' }],
      lines: [
        { say: 'Watch out. Some people use the slanted side, ten centimetres, as the height. Four times ten, divided by two, is twenty square centimetres. That is wrong.', show: ['w.shape', 'w.base', 'w.ext', 'w.h', 'w.left', 'oops'], focus: 'w.left' },
        { say: 'The slanted side leans over, so it is longer than the height. Use the length that makes a right angle with the base, even when it is outside the triangle.', focus: 'w.h' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An obtuse triangle has a base of $6$ cm and a slanted side of $13$ cm. Its height, drawn outside the triangle, is $5$ cm. What is its area?',
          choices: ['$39\\text{ cm}^2$', '$15\\text{ cm}^2$', '$30\\text{ cm}^2$', '$65\\text{ cm}^2$'],
          answer: 1,
          working: '$A = bh \\div 2 = 6 \\times 5 \\div 2 = 30 \\div 2 = 15$, so the area is $15\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. An obtuse triangle has a base of six centimetres and a slanted side of thirteen centimetres. Its height, drawn outside the triangle, is five centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, fifteen square centimetres. Six times five is thirty, and thirty divided by two is fifteen. Choice A uses the slanted side instead of the height.', show: 'q.answer' },
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
          items: ['The height goes from the top vertex straight down to the line of the base, at a right angle.', 'In an obtuse triangle, it can be **outside**: extend the base with a dashed line.', 'A slanted side is **not** the height.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The height of a triangle goes from the top vertex straight down to the line of the base, at a right angle.', show: 'sum.0' },
        { say: 'In an obtuse triangle, the height can be outside the triangle. Extend the base with a dashed line to meet it.', show: 'sum.1' },
        { say: 'And a slanted side is not the height. In the next part, you will find the area of shapes made of rectangles and triangles, and a missing height. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
