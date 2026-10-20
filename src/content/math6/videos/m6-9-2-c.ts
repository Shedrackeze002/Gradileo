import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { note, piece, triangle } from './lib/m6-9-figures.ts';

// A triangle with a base of 8 cm and its top corner 6 cm up, and the copy of it that makes a
// parallelogram with the same base and height (dashed), each 24 cm².
const doubled = (id: string, h: string) =>
  figure(id, [
    piece('copy', [[8, 0], [10, 6], [2, 6]], { tone: 'theta', shade: 0.15, dashed: true }),
    triangle({ b: 8, apex: [2, 6], tone: 'good', shade: 0.3, labels: { b: '8\\text{ cm}', h } }),
    note('area', [4.4, 1.3], '24\\text{ cm}^2'),
    note('copy-area', [7, 4.3], '24\\text{ cm}^2', 'center', 'theta'),
  ]);

const video: Explainer = {
  id: 'm6-9-2-c',
  lessonId: 'm6-9-2',
  title: 'Area of a Triangle, Part 3: Finding a Missing Base or Height',
  thumbnailTitle: 'A Missing Base or Height',
  thumbnail: 'mh',
  summary: 'To find a missing base or height of a triangle, double the area (the parallelogram with the same base and height), then divide by the length you know. An area of 24 cm² and a base of 8 cm give a height of 48 ÷ 8 = 6 cm; an area of 15 m² and a height of 5 m give a base of 30 ÷ 5 = 6 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 3', title: 'Finding a Missing Base or Height', subtitle: 'Double, then divide' }],
      lines: [
        { say: 'You know the area of a triangle, and you know its base. Can you find its height?', show: 'title' },
        { say: 'In this video, you will work backwards from the area of a triangle, to find a missing height or a missing base.' },
      ],
    },
    {
      chapter: 'Double, then divide',
      layout: 'split',
      leftWidth: 520,
      left: [doubled('dd', '6\\text{ cm}')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Work backwards', md: '**Double** the area of the triangle to get the area of the parallelogram. Then **divide** by the length you know.' }],
      lines: [
        { say: 'Remember: a triangle is half of a parallelogram with the same base and the same height.', show: ['dd.shape', 'dd.base', 'dd.h', 'dd.area'] },
        { say: 'Add a copy of the triangle, turned around, and you get that parallelogram. So if you double the area of the triangle, you get the area of the parallelogram.', show: ['dd.copy', 'dd.copy-area'], focus: 'dd.copy' },
        { say: 'And for a parallelogram, you already know how to find a missing length: divide its area by the length you know.', show: 'key' },
        { say: 'So for a triangle, double the area first, then divide.', focus: 'key' },
      ],
    },
    {
      chapter: 'A missing height',
      layout: 'split',
      leftWidth: 520,
      left: [doubled('mh', '?')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['24 \\times 2 = 48', 'h = 48 \\div 8 = 6', '\\text{Check: } (8 \\times 6) \\div 2 = 24 \\;\\checkmark', '\\text{Height} = 6\\text{ cm}'] },
      ],
      lines: [
        { say: 'A triangle has an area of twenty-four square centimetres, and a base of eight centimetres. Find its height.', show: ['mh.shape', 'mh.base', 'mh.h', 'mh.area'] },
        { say: 'Double the area to get the parallelogram with the same base and height: twenty-four times two is forty-eight square centimetres.', show: ['mh.copy', 'mh.copy-area', 'm.0'], focus: 'm.0' },
        { say: 'Now divide by the base: forty-eight divided by eight is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the rule for a triangle. Eight times six is forty-eight, and half of forty-eight is twenty-four. That matches the area!', show: 'm.2', focus: 'm.2' },
        { say: 'So the height is six centimetres.', show: 'm.3', focus: ['m.3', 'mh.h'] },
      ],
    },
    {
      chapter: 'A missing base',
      layout: 'split',
      leftWidth: 520,
      left: [figure('mb', [triangle({ b: 6, apex: [2, 5], tone: 'hyp', labels: { b: '?', h: '5\\text{ m}' } }), note('area', [3.7, 1], '15\\text{ m}^2')])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['15 \\times 2 = 30', 'b = 30 \\div 5 = 6', '\\text{Check: } (6 \\times 5) \\div 2 = 15 \\;\\checkmark', '\\text{Base} = 6\\text{ m}'] },
      ],
      lines: [
        { say: 'This time, the base is missing. A triangle has an area of fifteen square metres and a height of five metres. What is its base?', show: ['mb.shape', 'mb.base', 'mb.h', 'mb.area'] },
        { say: 'Double the area: fifteen times two is thirty square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the height: thirty divided by five is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: six times five is thirty, and half of thirty is fifteen. It matches! So the base is six metres.', show: ['m.2', 'm.3'], focus: ['m.3', 'mb.base'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Remember to double first', md: 'For the first triangle, $24 \\div 8 = 3$ is **not** the height. Check it: $(8 \\times 3) \\div 2 = 12$, not $24$.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Always check', md: 'Put your answer into the rule for a triangle. You should get the area back.' },
      ],
      lines: [
        { say: 'Watch out! If you forget to double, you get the wrong answer. For the first triangle, twenty-four divided by eight is three. But three centimetres is not the height.', show: 'oops' },
        { say: 'Check it: eight times three is twenty-four, and half of that is only twelve, not twenty-four. A height of three centimetres gives half the area we need.', focus: 'oops' },
        { say: 'So always double first, then divide. And check your answer with the rule. You should get the area back.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has an area of $18\\text{ cm}^2$ and a base of $4\\text{ cm}$. What is its height?',
          choices: ['$4.5\\text{ cm}$', '$72\\text{ cm}$', '$9\\text{ cm}$', '$14\\text{ cm}$'],
          answer: 2,
          working: 'Double the area: $18 \\times 2 = 36$. Then $h = 36 \\div 4 = 9\\text{ cm}$. Check: $(4 \\times 9) \\div 2 = 18$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has an area of eighteen square centimetres and a base of four centimetres. What is its height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, nine centimetres. Double the area to get thirty-six, then divide by four to get nine. Choice A forgets to double: a height of four point five centimetres would give an area of only nine square centimetres.', show: 'q.answer' },
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
          items: ['A triangle is half of a parallelogram with the same base and height.', 'To find a missing base or height, double the area, then divide by the length you know.', 'Check with $(\\text{base} \\times \\text{height}) \\div 2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A triangle is half of a parallelogram with the same base and height.', show: 'sum.0' },
        { say: 'So to find a missing base or height, double the area of the triangle, then divide by the length you know.', show: 'sum.1' },
        { say: 'And check your answer with the rule for a triangle. In the next part, you will compare triangles that look very different. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
