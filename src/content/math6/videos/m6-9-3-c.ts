import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { height, piece, seg } from './lib/m6-9-figures.ts';

type P = [number, number];

// The lesson's wall: a 10 m by 6 m rectangle with a triangular opening at the top, 4 m across and
// 3 m deep.
const wallCorners: P[] = [[0, 0], [10, 0], [10, 6], [7, 6], [5, 3], [3, 6], [0, 6]];
const wall = (id: string, whole: boolean) =>
  figure(id, [
    piece('shape', wallCorners, { tone: 'brand', shade: whole ? 0 : 0.22 }),
    piece('whole', [[0, 0], [10, 0], [10, 6], [0, 6]], { tone: 'good', shade: 0.15, dashed: true }),
    piece('gap', [[3, 6], [7, 6], [5, 3]], { tone: 'bad', shade: 0.35 }),
    seg('b', [0, 0], [10, 0], { tone: 'adj', weight: 5, label: '10\\text{ m}', side: 'right' }),
    seg('r', [10, 0], [10, 6], { tone: 'opp', weight: 5, label: '6\\text{ m}', side: 'right' }),
    seg('ob', [3, 6], [7, 6], { tone: 'adj', dashed: true, weight: 3.5, label: '4\\text{ m}', side: 'left' }),
    height('oh', [5, 3], [5, 6], [4, 6], { label: '3\\text{ m}', side: 'right', at: 0.86 }),
  ]);

// A square lawn 8 m on each side, with a triangular pond 6 m across and 4 m high in it.
const lawn = (id: string) =>
  figure(id, [
    piece('grass', [[0, 0], [8, 0], [8, 8], [0, 8]], { tone: 'good', shade: 0.25 }),
    piece('pond', [[1, 2], [7, 2], [4, 6]], { tone: 'adj', shade: 0.45 }),
    seg('b', [0, 0], [8, 0], { tone: 'adj', weight: 5, label: '8\\text{ m}', side: 'right' }),
    seg('r', [8, 0], [8, 8], { tone: 'opp', weight: 5, label: '8\\text{ m}', side: 'right' }),
    seg('pb', [1, 2], [7, 2], { tone: 'adj', weight: 4, label: '6\\text{ m}', side: 'right' }),
    height('ph', [4, 6], [4, 2], [5, 2], { label: '4\\text{ m}', side: 'left', at: 0.6 }),
  ]);

const video: Explainer = {
  id: 'm6-9-3-c',
  lessonId: 'm6-9-3',
  title: 'Area of Composite Shapes, Part 3: Taking Away a Part',
  thumbnailTitle: 'Taking Away a Part',
  thumbnail: 'tw',
  summary: 'Sometimes it is easier to find the area of a bigger shape and subtract the part that is missing. A 10 m by 6 m wall (60 m²) with a triangular opening 4 m across and 3 m high (6 m²) has an area of 54 m²; an 8 m square lawn (64 m²) with a triangular pond of 12 m² has 52 m² of grass.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Area of Parallelograms and Triangles · Part 3', title: 'Taking Away a Part', subtitle: 'The whole shape, minus the missing piece' }],
      lines: [
        { say: 'Some shapes have a piece missing, like a wall with an opening in it, or a lawn with a pond in the middle.', show: 'title' },
        { say: 'In this video, you will find the area of shapes like these by taking away the part that is missing.' },
      ],
    },
    {
      chapter: 'A wall with an opening',
      layout: 'split',
      leftWidth: 640,
      left: [wall('wl', false)],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Find the area of the wall. Splitting it into pieces would be tricky.' }],
      lines: [
        { say: 'This wall is a rectangle, ten metres long and six metres tall, with a triangular opening cut out of the top.', show: ['wl.shape', 'wl.b', 'wl.r'] },
        { say: 'The opening is four metres across at the top, and three metres deep. So it is a triangle with a base of four metres and a height of three metres.', show: ['wl.ob', 'wl.oh'], focus: ['wl.ob', 'wl.oh'] },
        { say: 'You could split the wall into pieces, but the pieces would be awkward. There is an easier way.', show: 'q' },
      ],
    },
    {
      chapter: 'The whole, minus the missing part',
      layout: 'split',
      leftWidth: 640,
      left: [wall('tw', true)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{whole: } 10 \\times 6 = 60}', '\\bad{\\text{opening: } (4 \\times 3) \\div 2 = 6}', '60 - 6 = 54', '\\text{Area} = 54\\text{ m}^2'] }],
      lines: [
        { say: 'Start with the whole rectangle, as if the opening were filled in. It is ten metres by six metres, so its area is ten times six, which is sixty square metres.', show: ['tw.shape', 'tw.whole', 'tw.b', 'tw.r', 'm.0'], focus: ['tw.whole', 'm.0'] },
        { say: 'Now find the area of the part that is missing: the triangle. Four times three is twelve, and half of twelve is six square metres.', show: ['tw.gap', 'tw.ob', 'tw.oh', 'm.1'], focus: ['tw.gap', 'm.1'] },
        { say: 'Take the missing part away from the whole: sixty minus six is fifty-four.', show: 'm.2', focus: 'm.2' },
        { say: 'So the area of the wall is fifty-four square metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A pond in a lawn',
      layout: 'split',
      leftWidth: 520,
      left: [lawn('ln')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\good{\\text{square: } 8 \\times 8 = 64}', '\\adj{\\text{pond: } (6 \\times 4) \\div 2 = 12}', '64 - 12 = 52', '\\text{Grass} = 52\\text{ m}^2'] }],
      lines: [
        { say: 'Here is another one. A square lawn is eight metres on each side. In the middle there is a triangular pond, with a base of six metres and a height of four metres. How much of the lawn is grass?', show: ['ln.grass', 'ln.b', 'ln.r', 'ln.pond', 'ln.pb', 'ln.ph'] },
        { say: 'The whole square is eight times eight, which is sixty-four square metres.', show: 'm.0', focus: ['ln.grass', 'm.0'] },
        { say: 'The pond is six times four, which is twenty-four, divided by two, which is twelve square metres.', show: 'm.1', focus: ['ln.pond', 'm.1'] },
        { say: 'Take the pond away: sixty-four minus twelve is fifty-two. So there are fifty-two square metres of grass.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Add or subtract?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['When the shape…', 'Do this'],
          rows: [
            ['is made of parts that fit together', '**add** the areas of the parts'],
            ['is a bigger shape with a piece missing', '**subtract** the missing piece from the whole'],
          ],
        },
      ],
      lines: [
        { say: 'So how do you choose? When a shape is made of parts that fit together, add the areas of the parts.', show: 't.0', focus: 't.0' },
        { say: 'When a shape is a bigger shape with a piece missing, find the area of the whole, and subtract the missing piece.', show: 't.1', focus: 't.1' },
        { say: 'Both ways work. Choose the one that makes the work easier.', focus: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular sign is $8\\text{ m}$ long and $5\\text{ m}$ tall. A triangle with a base of $4\\text{ m}$ and a height of $3\\text{ m}$ is cut out of it. What area is left?',
          choices: ['$34\\text{ m}^2$', '$46\\text{ m}^2$', '$28\\text{ m}^2$', '$37\\text{ m}^2$'],
          answer: 0,
          working: 'Whole: $8 \\times 5 = 40$. Triangle: $(4 \\times 3) \\div 2 = 6$. Left: $40 - 6 = 34\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular sign is eight metres long and five metres tall. A triangle with a base of four metres and a height of three metres is cut out of it. What area is left? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, thirty-four square metres. The whole sign is eight times five, which is forty. The triangle is four times three, divided by two, which is six. Forty minus six is thirty-four. Choice B adds the triangle instead of taking it away.', show: 'q.answer' },
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
          items: ['When a piece is missing, find the area of the whole shape.', 'Find the area of the missing piece, and subtract it.', 'Add the parts of a shape; subtract a missing piece.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When a shape has a piece missing, start with the area of the whole shape.', show: 'sum.0' },
        { say: 'Then find the area of the missing piece, and subtract it.', show: 'sum.1' },
        { say: 'Add when a shape is made of parts, and subtract when a piece is missing. Well done! You can now find the area of parallelograms, triangles and shapes made from them.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
