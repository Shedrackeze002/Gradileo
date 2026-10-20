import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, join, piece, seg, triangle } from './lib/m6-9-figures.ts';

type P = [number, number];

// The lesson's parallelogram: a base of 8 cm and a height of 5 cm, its top side 2.5 cm further
// right. The diagonal from B to D cuts it into the green triangle ABD (base AB, height from D) and
// the yellow triangle BCD; turned half a turn, the yellow one lands exactly on the green one.
const A: P = [0, 0];
const B: P = [8, 0];
const C: P = [10.5, 5];
const D: P = [2.5, 5];
const halves = (o: { labels?: boolean } = {}) =>
  join(
    piece('outline', [A, B, C, D], { tone: 'brand', shade: 0 }),
    piece('t1', [A, B, D], { tone: 'good', shade: 0.35 }),
    piece('t2', [B, C, D], { tone: 'theta', shade: 0.3 }),
    piece('t2r', [A, B, D], { tone: 'theta', shade: 0.3, dashed: true }),
    seg('diag', B, D, { tone: 'ink', weight: 4 }),
    ...(o.labels ? [seg('base', A, B, { tone: 'adj', weight: 5, label: '8\\text{ cm}', side: 'right' }), height('h', D, [2.5, 0], [3.5, 0], { label: '5\\text{ cm}', side: 'left', at: 0.7 })] : []),
  );

const video: Explainer = {
  id: 'm6-9-2',
  lessonId: 'm6-9-2',
  title: 'Area of a Triangle, Part 1: Half of a Parallelogram',
  thumbnailTitle: 'Half of a Parallelogram',
  thumbnail: 'pg',
  summary: 'A diagonal cuts a parallelogram into two congruent triangles, each with the same base and height as the parallelogram and half of its area. So the area of a triangle is (base × height) ÷ 2: half of 8 × 5 = 40 is 20 cm², and a sail with a base of 6 m and a height of 9 m has an area of 27 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 1', title: 'Half of a Parallelogram', subtitle: 'Every triangle is half of one' }],
      lines: [
        { say: 'Sails, roofs and flags are often shaped like triangles. How can you find the area of a triangle?', show: 'title' },
        { say: 'In this video, you will see that every triangle is exactly half of a parallelogram. Then you will use that idea to find the area of any triangle.' },
      ],
    },
    {
      chapter: 'Two matching triangles',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pg', [halves()])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Congruent', md: 'Shapes are **congruent** when they have the same shape and the same size. One fits exactly on top of the other.' }],
      lines: [
        { say: 'Here is a parallelogram. Draw a diagonal: a straight line from one corner to the opposite corner.', show: ['pg.outline', 'pg.diag'], focus: 'pg.diag' },
        { say: 'The diagonal cuts the parallelogram into two triangles: a green one and a yellow one.', show: ['pg.t1', 'pg.t2'] },
        { say: 'Now imagine cutting along the diagonal. Turn the yellow triangle around, and move it onto the green one. It fits exactly!', show: 'pg.t2r', hide: 'pg.t2', focus: 'pg.t2r' },
        { say: 'We say the two triangles are congruent. That means they have the same shape and the same size.', show: 'def' },
        { say: 'So each triangle is exactly half of the parallelogram.', show: 'pg.t2', hide: 'pg.t2r', focus: ['pg.t1', 'pg.t2'] },
      ],
    },
    {
      chapter: 'Half the area',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ha', [halves({ labels: true })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{parallelogram: } 8 \\times 5 = 40', '\\text{triangle: } 40 \\div 2 = 20', '\\text{Area} = 20\\text{ cm}^2'] }],
      lines: [
        { say: 'Look at the green triangle. Its base is the base of the parallelogram, eight centimetres.', show: ['ha.outline', 'ha.diag', 'ha.t1', 'ha.base'], focus: 'ha.base' },
        { say: 'Its height is the height of the parallelogram, five centimetres. It goes from the top corner straight down to the base, at a right angle.', show: 'ha.h', focus: 'ha.h' },
        { say: 'So the triangle has the same base and the same height as the parallelogram, and half of its area.', show: 'ha.t2', focus: ['ha.t1', 'ha.t2'] },
        { say: 'The parallelogram has an area of eight times five, which is forty square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Each triangle is half of that. Forty divided by two is twenty. So each triangle has an area of twenty square centimetres.', show: ['m.1', 'm.2'], focus: ['m.2', 'ha.t1'] },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area of a triangle', md: 'Multiply the **base** by the **height**, then **divide by 2**. The height meets the base at a right angle.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{Area} = (\\adj{\\text{base}} \\times \\opp{\\text{height}}) \\div 2', 'A = (\\adj{b} \\times \\opp{h}) \\div 2'] },
      ],
      lines: [
        { say: 'Every triangle is half of a parallelogram with the same base and the same height.', show: 'key' },
        { say: 'So, to find the area of a triangle, multiply the base by the height, then divide by two.', show: 'm.0', focus: 'm.0' },
        { say: 'With letters: "A" equals b times h, divided by two.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiplying gives the area of the whole parallelogram. Dividing by two takes half of it, for the triangle.' },
      ],
    },
    {
      chapter: 'The area of a sail',
      layout: 'split',
      leftWidth: 480,
      left: [figure('sail', [triangle({ b: 6, apex: [2, 9], tone: 'hyp', labels: { b: '6\\text{ m}', h: '9\\text{ m}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = (b \\times h) \\div 2', '\\phantom{A} = (6 \\times 9) \\div 2', '\\phantom{A} = 54 \\div 2', '\\phantom{A} = 27', '\\text{Area} = 27\\text{ m}^2'] }],
      lines: [
        { say: 'A sail is shaped like a triangle. Its base is six metres, and its height is nine metres. Find its area.', show: ['sail.shape', 'sail.base', 'sail.h'] },
        { say: 'Use the rule: the base times the height, divided by two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first: six times nine is fifty-four. That is the area of a parallelogram with the same base and height.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Now divide by two: fifty-four divided by two is twenty-seven.', show: 'm.3', focus: 'm.3' },
        { say: 'So the sail has an area of twenty-seven square metres.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Remember to divide by 2', md: 'For the sail, $6 \\times 9 = 54$ is the area of the **whole parallelogram**. The triangle is half of it: $54 \\div 2 = 27\\text{ m}^2$.' },
      ],
      lines: [
        { say: 'The most common mistake is forgetting to divide by two.', show: 'oops' },
        { say: 'For the sail, six times nine is fifty-four. But fifty-four square metres is the area of the whole parallelogram, twice as big as the sail.', focus: 'oops' },
        { say: 'The triangle is only half of it. So always finish by dividing by two.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has a base of $12\\text{ cm}$ and a height of $5\\text{ cm}$. What is its area?',
          choices: ['$60\\text{ cm}^2$', '$17\\text{ cm}^2$', '$30\\text{ cm}$', '$30\\text{ cm}^2$'],
          answer: 3,
          working: '$A = (12 \\times 5) \\div 2 = 60 \\div 2 = 30$, so the area is $30\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has a base of twelve centimetres and a height of five centimetres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, thirty square centimetres. Twelve times five is sixty, and sixty divided by two is thirty. Choice A forgets to divide by two: that is the area of the whole parallelogram.', show: 'q.answer' },
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
          items: ['A diagonal cuts a parallelogram into two congruent triangles.', 'Each triangle has the same base and height as the parallelogram, and half of its area.', 'Area of a triangle $= (\\text{base} \\times \\text{height}) \\div 2$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A diagonal cuts a parallelogram into two congruent triangles.', show: 'sum.0' },
        { say: 'Each triangle has the same base and height as the parallelogram, and half of its area.', show: 'sum.1' },
        { say: 'So the area of a triangle is base times height, divided by two. In the next part, you will look more closely at the height of a triangle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
