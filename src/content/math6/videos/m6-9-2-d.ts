import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, note, piece, seg } from './lib/m6-9-figures.ts';

// The lesson's three triangles: one base of 6 cm, and top corners at 2 cm left of it, above its
// middle and 2 cm right of it, all on a line 4 cm above the base and parallel to it.
const three = (id: string) =>
  figure(id, [
    seg('bottom', [-3, 0], [10.5, 0], { tone: 'muted', dashed: true, weight: 2 }),
    seg('top', [-3, 4], [10.5, 4], { tone: 'muted', dashed: true, weight: 2 }),
    piece('t1', [[0, 0], [6, 0], [-2, 4]], { tone: 'brand', shade: 0.1 }),
    piece('t2', [[0, 0], [6, 0], [3, 4]], { tone: 'theta', shade: 0.1 }),
    piece('t3', [[0, 0], [6, 0], [8, 4]], { tone: 'good', shade: 0.1 }),
    seg('base', [0, 0], [6, 0], { tone: 'adj', weight: 6, label: '6\\text{ cm}', side: 'right' }),
    height('h', [10.5, 4], [10.5, 0], [9.5, 0], { label: '4\\text{ cm}', side: 'left' }),
    note('n1', [-2, 4.1], '1', 'above', 'brand'),
    note('n2', [3, 4.1], '2', 'above', 'theta'),
    note('n3', [8, 4.1], '3', 'above', 'good'),
  ]);

const video: Explainer = {
  id: 'm6-9-2-d',
  lessonId: 'm6-9-2',
  title: 'Area of a Triangle, Part 4: Same Base, Same Height, Same Area',
  thumbnailTitle: 'Same Base, Same Height',
  thumbnail: 'th',
  summary: 'Three triangles share a base of 6 cm, and their top corners lie on a line parallel to the base, so they all have a height of 4 cm. Each area is (6 × 4) ÷ 2 = 12 cm²: triangles with the same base and the same height always have the same area, however different they look.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 4', title: 'Same Base, Same Height, Same Area', subtitle: 'Do not trust your eyes!' }],
      lines: [
        { say: 'Here is a puzzle. Three triangles look very different. One leans left, one stands up straight, and one leans right. Which one has the greatest area?', show: 'title' },
        { say: 'Make a guess before we find out! In this video, you will compare triangles that have the same base and the same height.' },
      ],
    },
    {
      chapter: 'Three triangles',
      layout: 'center',
      main: [three('th')],
      lines: [
        { say: 'These are the three triangles. Triangle one leans to the left, triangle two stands up straight, and triangle three leans to the right.', show: ['th.t1', 'th.t2', 'th.t3', 'th.n1', 'th.n2', 'th.n3'] },
        { say: 'They all share the same base, along the bottom. It is six centimetres long.', show: 'th.base', focus: 'th.base' },
        { say: 'Now look at their top corners. All three are on a dashed line that is parallel to the base.', show: ['th.top', 'th.bottom'], focus: 'th.top' },
        { say: 'Parallel lines stay the same distance apart. So every top corner is the same distance above the base: four centimetres. All three triangles have the same height!', show: 'th.h', focus: 'th.h' },
      ],
    },
    {
      chapter: 'Which is biggest?',
      layout: 'split',
      leftWidth: 640,
      left: [three('ab')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\brand{1\\!:}\\ (6 \\times 4) \\div 2 = 12', '\\thc{2\\!:}\\ (6 \\times 4) \\div 2 = 12', '\\good{3\\!:}\\ (6 \\times 4) \\div 2 = 12', '\\text{All } 12\\text{ cm}^2'] }],
      lines: [
        { say: 'Now find each area. Triangle one has a base of six centimetres and a height of four centimetres. Six times four is twenty-four, and half of twenty-four is twelve square centimetres.', show: ['ab.bottom', 'ab.top', 'ab.base', 'ab.h', 'ab.t1', 'ab.n1', 'm.0'], focus: ['ab.t1', 'm.0'] },
        { say: 'Triangle two has the same base and the same height. So its area is twelve square centimetres as well.', show: ['ab.t2', 'ab.n2', 'm.1'], focus: ['ab.t2', 'm.1'] },
        { say: 'And triangle three has the same base and height again, so its area is also twelve square centimetres.', show: ['ab.t3', 'ab.n3', 'm.2'], focus: ['ab.t3', 'm.2'] },
        { say: 'So they all have the same area, even though they look so different! Was your guess right?', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Same base and height, same area', md: 'Two triangles with the **same base** and the **same height** always have the **same area**.' },
        { kind: 'bullets', id: 'b', items: ['The area uses only the base and the height.', 'Sliding the top corner along a line parallel to the base keeps the height the same.', 'So the shape changes, but the area does not.'] },
      ],
      lines: [
        { say: 'Why does this work? The rule for the area of a triangle uses only two lengths: the base and the height.', show: 'b.0' },
        { say: 'Imagine sliding the top corner along the dashed line, parallel to the base. The triangle changes shape, but its base and its height stay the same.', show: 'b.1' },
        { say: 'So the shape changes, but the area does not.', show: 'b.2' },
        { say: 'Here is the rule to remember: two triangles with the same base and the same height always have the same area.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Triangle P has a base of $8\\text{ cm}$ and a height of $3\\text{ cm}$. Triangle Q also has a base of $8\\text{ cm}$ and a height of $3\\text{ cm}$, but it leans far to one side. Which is true?',
          choices: ['They have the same area, $12\\text{ cm}^2$.', 'P has the greater area.', 'Q has the greater area.', 'They have the same area, $24\\text{ cm}^2$.'],
          answer: 0,
          working: 'Same base and same height, so the same area: $(8 \\times 3) \\div 2 = 12\\text{ cm}^2$ each.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle P has a base of eight centimetres and a height of three centimetres. Triangle Q also has a base of eight centimetres and a height of three centimetres, but it leans far to one side. Which is true? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A. They have the same base and the same height, so they have the same area: eight times three is twenty-four, and half of that is twelve square centimetres. Choice D forgets to divide by two.', show: 'q.answer' },
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
          items: ['Top corners on a line parallel to the base are all at the same height.', 'Triangles with the same base and the same height have the same area.', 'They can look very different!'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When the top corners of triangles are on a line parallel to the base, the triangles all have the same height.', show: 'sum.0' },
        { say: 'Triangles with the same base and the same height always have the same area.', show: 'sum.1' },
        { say: 'Even when they look very different! Great work. Next, you will find the area of shapes made of triangles and parallelograms.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
