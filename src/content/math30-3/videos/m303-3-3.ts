import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { polygon, regularCorners } from './lib/m303-3-figures.ts';

const named = (v: [number, number][]) => Object.fromEntries(v.map((p, i) => [`v${i}`, p]));
const equal = (n: number) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`v${i}v${(i + 1) % n}`, 1]));

const video: Explainer = {
  id: 'm303-3-3',
  lessonId: 'm303-3-3',
  title: 'Problems with Polygons, Part 1: Perimeters and Corner Angles',
  thumbnailTitle: 'Perimeters and Corner Angles',
  thumbnail: 'sb',
  summary: 'Planning a regular polygon: the perimeter is the number of sides times the side length, and every corner has the same interior angle. A hexagonal sandbox with 1.2 m sides needs 7.2 m of lumber and has 120° corners, a pentagonal garden bed with 2.5 m sides has a 12.5 m edge and 108° corners, and an octagon with a 12 m perimeter has 1.5 m sides. Part 2 covers mitre cuts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 1', title: 'Perimeters and Corner Angles', subtitle: 'Planning a regular polygon' }],
      lines: [
        { say: 'A woodworker making an octagonal frame, a crew building a gazebo, and a tile setter laying a patterned floor all need the measurements of regular polygons, and they need them before the first cut.', show: 'title' },
        { say: 'In this video, you will find how much material goes around a regular polygon, and the angle at each of its corners.' },
      ],
    },
    {
      chapter: 'Two things to know',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A regular polygon with n sides', md: 'Its **perimeter** is $n$ times the side length, and every corner has the same **interior angle**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{perimeter} = n \\times \\text{side length}', '\\text{corner angle} = \\dfrac{180^\\circ(n - 2)}{n}'] },
      ],
      lines: [
        { say: 'To plan a shape like a regular polygon, you usually need two things: how much material goes around it, and the angle at each corner.', show: 'key' },
        { say: 'The distance around a shape is its perimeter. A regular polygon has n equal sides, so its perimeter is n times the length of one side.', show: 'm.0', focus: 'm.0' },
        { say: 'And every corner has the same interior angle: 180 times n minus two, divided by n, as in the last lesson.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A hexagonal sandbox',
      layout: 'split',
      left: [figure('sb', [polygon({ corners: named(regularCorners(6, { r: 2 })), names: false, ticks: equal(6), sides: { v0v1: '1.2\\text{ m}' }, angles: [{ at: 'v2', id: 'q' }, { at: 'v2', label: '120^\\circ', id: 'v', labelDist: 100 }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{perimeter} = 6 \\times 1.2 = 7.2\\text{ m}', '\\text{corner} = \\dfrac{180^\\circ(6 - 2)}{6}', '= \\dfrac{720^\\circ}{6} = 120^\\circ'] }],
      lines: [
        { say: 'A sandbox is a regular hexagon with sides of 1.2 metres. How much lumber goes around the outside, and what angle is each corner?', show: ['sb.shape', 'sb.ticks', 'sb.q'] },
        { say: 'The six sides are equal, so the perimeter is six times 1.2, which is 7.2 metres of lumber.', show: 'm.0', focus: ['m.0', 'sb.ticks'] },
        { say: 'For the corners, the angles of a hexagon add to 180 times four, which is 720 degrees. Shared among six equal corners, that is 120 degrees each.', show: ['m.1', 'm.2', 'sb.v'], hide: 'sb.q', focus: ['m.2', 'sb.v'] },
        { say: 'So the sandbox needs about 7.2 metres of lumber, and each corner is 120 degrees.' },
      ],
    },
    {
      chapter: 'A pentagonal garden bed',
      layout: 'split',
      left: [figure('gb', [polygon({ corners: named(regularCorners(5, { r: 2 })), names: false, ticks: equal(5), tone: 'good', sides: { v0v1: '2.5\\text{ m}' }, angles: [{ at: 'v2', label: '?', id: 'q', labelDist: 100 }, { at: 'v2', label: '108^\\circ', id: 'v', labelDist: 100 }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{perimeter} = 5 \\times 2.5 = 12.5\\text{ m}', '\\text{corner} = \\dfrac{180^\\circ(5 - 2)}{5}', '= \\dfrac{540^\\circ}{5} = 108^\\circ'] }],
      lines: [
        { say: 'A garden bed is a regular pentagon with sides of 2.5 metres. How much edging goes around it, and what angle is each corner?', show: ['gb.shape', 'gb.ticks', 'gb.q'] },
        { say: 'Five sides of 2.5 metres make five times 2.5, which is 12.5 metres of edging.', show: 'm.0', focus: 'm.0' },
        { say: 'A pentagon’s angles add to 180 times three, which is 540 degrees, and 540 divided by five is 108 degrees at each corner.', show: ['m.1', 'm.2', 'gb.v'], hide: 'gb.q', focus: ['m.2', 'gb.v'] },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'lg', md: 'A deck border is a regular octagon with a perimeter of $12\\text{ m}$. How long is each side?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['8 \\times \\text{side} = 12', '\\text{side} = 12 \\div 8 = 1.5\\text{ m}'] },
      ],
      lines: [
        { say: 'You can also work backwards. A deck border is a regular octagon with a perimeter of twelve metres. How long is each side?', show: 'q' },
        { say: 'Eight equal sides make twelve metres, so eight times the side length is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by eight: each side is twelve divided by eight, which is 1.5 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: eight sides of 1.5 metres make eight times 1.5, which is twelve metres.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table top is a regular octagon with sides of $0.4\\text{ m}$. How much trim goes around its edge, and what angle is each corner?',
          choices: ['$3.2\\text{ m}$ and $45^\\circ$', '$2.4\\text{ m}$ and $135^\\circ$', '$3.2\\text{ m}$ and $135^\\circ$', '$1.6\\text{ m}$ and $135^\\circ$'],
          answer: 2,
          working: 'Perimeter: $8 \\times 0.4 = 3.2\\text{ m}$. Corner angle: $\\dfrac{180^\\circ(8 - 2)}{8} = \\dfrac{1080^\\circ}{8} = 135^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A table top is a regular octagon with sides of 0.4 metres. How much trim goes around its edge, and what angle is each corner? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Eight times 0.4 is 3.2 metres of trim, and each corner is 1,080 divided by eight, which is 135 degrees. Choice A has the right trim, but 45 degrees is the exterior angle, not the corner angle.', show: 'q.answer' },
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
            'Perimeter of a regular polygon $=$ number of sides $\\times$ side length.',
            'Each corner angle is $\\dfrac{180^\\circ(n - 2)}{n}$.',
            'To find the side length, divide the perimeter by the number of sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The perimeter of a regular polygon is the number of sides times the side length.', show: 'sum.0' },
        { say: 'Each corner has the same angle: 180 times n minus two, divided by n.', show: 'sum.1' },
        { say: 'And to find the side length from the perimeter, divide by the number of sides. In the next part, we find the saw settings for a frame. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
