import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { height, note, piece, seg } from './lib/m6-9-figures.ts';

type P = [number, number];

// The lesson's shape: a bottom side of 10 cm, a top side of 6 cm, parallel to it and 4 cm above.
const corners: P[] = [[0, 0], [10, 0], [8, 4], [2, 4]];
const common = (): Part[] => [
  seg('top', [2, 4], [8, 4], { tone: 'adj', weight: 5, label: '6\\text{ cm}', side: 'left' }),
  height('h', [2, 4], [2, 0], [1, 0], { label: '4\\text{ cm}', side: 'left', at: 0.3 }),
];
const plain = (id: string) => figure(id, [piece('shape', corners, { tone: 'brand', shade: 0.2 }), seg('bottom', [0, 0], [10, 0], { tone: 'adj', weight: 5, label: '10\\text{ cm}', side: 'right' }), ...common()]);
// Split into a parallelogram (base 6 cm) and a triangle (base 4 cm).
const split1 = (id: string) =>
  figure(id, [
    piece('shape', corners, { tone: 'brand', shade: 0 }),
    piece('para', [[0, 0], [6, 0], [8, 4], [2, 4]], { tone: 'good', shade: 0.3, outline: false }),
    piece('tri', [[6, 0], [10, 0], [8, 4]], { tone: 'theta', shade: 0.3, outline: false }),
    seg('cut', [6, 0], [8, 4], { tone: 'theta', dashed: true, weight: 3 }),
    seg('b1', [0, 0], [6, 0], { tone: 'adj', weight: 5, label: '6\\text{ cm}', side: 'right' }),
    seg('b2', [6, 0], [10, 0], { tone: 'adj', weight: 5, label: '4\\text{ cm}', side: 'right' }),
    ...common(),
    note('a1', [4.8, 1.4], '24\\text{ cm}^2'),
    note('a2', [8, 1.1], '8\\text{ cm}^2'),
  ]);
// Split along a diagonal into two triangles.
const split2 = (id: string) =>
  figure(id, [
    piece('shape', corners, { tone: 'brand', shade: 0 }),
    piece('low', [[0, 0], [10, 0], [8, 4]], { tone: 'good', shade: 0.3, outline: false }),
    piece('up', [[0, 0], [8, 4], [2, 4]], { tone: 'theta', shade: 0.3, outline: false }),
    seg('cut', [0, 0], [8, 4], { tone: 'theta', dashed: true, weight: 3 }),
    seg('bottom', [0, 0], [10, 0], { tone: 'adj', weight: 5, label: '10\\text{ cm}', side: 'right' }),
    ...common(),
    note('a1', [6.6, 1.1], '20\\text{ cm}^2'),
    note('a2', [5, 3.35], '12\\text{ cm}^2'),
  ]);
// Two parts that overlap: the parallelogram and the big bottom triangle.
const overlap = (id: string) =>
  figure(id, [
    piece('shape', corners, { tone: 'brand', shade: 0 }),
    piece('para', [[0, 0], [6, 0], [8, 4], [2, 4]], { tone: 'good', shade: 0.25, outline: false }),
    piece('low', [[0, 0], [10, 0], [8, 4]], { tone: 'bad', shade: 0.25, edge: 'bad', dashed: true }),
    note('twice', [5.6, 1.5], '\\text{twice}', 'center', 'bad'),
  ]);

const video: Explainer = {
  id: 'm6-9-3-b',
  lessonId: 'm6-9-3',
  title: 'Area of Composite Shapes, Part 2: Many Ways to Split',
  thumbnailTitle: 'Many Ways to Split',
  thumbnail: 's2',
  summary: 'One shape (a bottom of 10 cm, a top of 6 cm, a height of 4 cm) split two ways: a parallelogram of 24 cm² and a triangle of 8 cm², or two triangles of 20 cm² and 12 cm². Both give 32 cm², because every way of splitting gives the same total, as long as no part overlaps another and no gap is left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 2', title: 'Many Ways to Split', subtitle: 'Every way gives the same total' }],
      lines: [
        { say: 'There is often more than one way to split a shape into simpler shapes. Does the way you choose change the area?', show: 'title' },
        { say: 'In this video, you will split one shape in two different ways, and compare the answers.' },
      ],
    },
    {
      chapter: 'The shape',
      layout: 'split',
      leftWidth: 560,
      left: [plain('pl')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Find the area of this shape. Its top and bottom are **parallel**, but they are **different lengths**.' }],
      lines: [
        { say: 'Here is the shape. Its bottom side is ten centimetres, and its top side is six centimetres.', show: ['pl.shape', 'pl.bottom', 'pl.top'] },
        { say: 'The top and the bottom are parallel, and the height between them is four centimetres.', show: 'pl.h', focus: 'pl.h' },
        { say: 'It is not a parallelogram, because its top and bottom are different lengths. So split it into shapes you know.', show: 'q' },
      ],
    },
    {
      chapter: 'A parallelogram and a triangle',
      layout: 'split',
      leftWidth: 560,
      left: [split1('s1')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{parallelogram: } 6 \\times 4 = 24}', '\\text{triangle base: } 10 - 6 = 4', '\\thc{\\text{triangle: } (4 \\times 4) \\div 2 = 8}', '24 + 8 = 32', '\\text{Area} = 32\\text{ cm}^2'] }],
      lines: [
        { say: 'One way: draw a line from the bottom up to the top right corner, parallel to the left side.', show: ['s1.shape', 's1.cut', 's1.para', 's1.tri'], focus: 's1.cut' },
        { say: 'On the left is a parallelogram. Its base is six centimetres, the same as the top side, and its height is four centimetres. Six times four is twenty-four square centimetres.', show: ['s1.top', 's1.h', 's1.b1', 's1.a1', 'm.0'], focus: ['s1.para', 'm.0'] },
        { say: 'On the right is a triangle. Its base is what is left of the bottom: ten minus six, which is four centimetres.', show: ['s1.b2', 'm.1'], focus: ['s1.b2', 'm.1'] },
        { say: 'Its height is four centimetres as well. Four times four is sixteen, and half of sixteen is eight square centimetres.', show: ['s1.a2', 'm.2'], focus: ['s1.tri', 'm.2'] },
        { say: 'Add the parts: twenty-four plus eight is thirty-two. The area is thirty-two square centimetres.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Two triangles',
      layout: 'split',
      leftWidth: 560,
      left: [split2('s2')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{bottom: } (10 \\times 4) \\div 2 = 20}', '\\thc{\\text{top: } (6 \\times 4) \\div 2 = 12}', '20 + 12 = 32', '\\text{Area} = 32\\text{ cm}^2'] }],
      lines: [
        { say: 'Another way: draw a diagonal from the bottom left corner to the top right corner. Now the shape is two triangles.', show: ['s2.shape', 's2.cut', 's2.low', 's2.up'], focus: 's2.cut' },
        { say: 'Both triangles fit between the same two parallel lines, the top and the bottom. So both have a height of four centimetres.', show: ['s2.h', 's2.bottom', 's2.top'], focus: 's2.h' },
        { say: 'The bottom triangle has a base of ten centimetres. Ten times four is forty, and half of forty is twenty square centimetres.', show: ['s2.a1', 'm.0'], focus: ['s2.low', 'm.0'] },
        { say: 'The top triangle is upside down. Its base is the top side, six centimetres. Six times four is twenty-four, and half of that is twelve square centimetres.', show: ['s2.a2', 'm.1'], focus: ['s2.up', 'm.1'] },
        { say: 'Add them: twenty plus twelve is thirty-two square centimetres. It is the same area as before!', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 520,
      left: [overlap('ov')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Count every part once', md: 'The parts must not **overlap**, and they must not leave **gaps**. Every part of the shape is counted exactly once.' }],
      lines: [
        { say: 'Every way of splitting gives the same total, as long as you count every part of the shape exactly once.', show: 'oops' },
        { say: 'Look what happens if two parts overlap. The green parallelogram and the big red triangle cover the middle of the shape twice.', show: ['ov.shape', 'ov.para', 'ov.low', 'ov.twice'], focus: 'ov.twice' },
        { say: 'Twenty-four plus twenty is forty-four, which is too big. And if you leave a gap, part of the shape is not counted at all, so the total is too small.', focus: 'oops' },
        { say: 'So fit the parts together like puzzle pieces: no overlaps, and no gaps.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shape splits into a parallelogram of $18\\text{ cm}^2$ and a triangle of $9\\text{ cm}^2$. Split another way, it makes two triangles. One of them is $15\\text{ cm}^2$. What is the area of the other triangle?',
          choices: ['$9\\text{ cm}^2$', '$15\\text{ cm}^2$', '$27\\text{ cm}^2$', '$12\\text{ cm}^2$'],
          answer: 3,
          working: 'The total is $18 + 9 = 27\\text{ cm}^2$ either way, so the other triangle is $27 - 15 = 12\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shape splits into a parallelogram of eighteen square centimetres and a triangle of nine square centimetres. Split another way, it makes two triangles. One of them is fifteen square centimetres. What is the area of the other triangle? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D, twelve square centimetres. The total is eighteen plus nine, which is twenty-seven, whichever way you split. Twenty-seven minus fifteen is twelve. Choice C is the area of the whole shape, not of one triangle.', show: 'q.answer' },
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
          items: ['A shape can be split in many ways.', 'Every way gives the same total area.', 'Count every part once: no overlaps and no gaps.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A shape can often be split in many different ways. Choose the way that looks easiest.', show: 'sum.0' },
        { say: 'Every way gives the same total area.', show: 'sum.1' },
        { say: 'Just count every part once, with no overlaps and no gaps. In the next part, you will find an area by taking a part away. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
