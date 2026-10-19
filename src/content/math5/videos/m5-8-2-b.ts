import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { axes, caption, fold, join, regular, shape, ticks, type P } from './lib/m5-8-figures.ts';

// A 3 by 1.8 rectangle: 2 lines of symmetry, and its diagonals, which are not.
const R: P[] = [
  [-1.5, -0.9],
  [1.5, -0.9],
  [1.5, 0.9],
  [-1.5, 0.9],
];
const rect = (id: string) => figure(id, [join(shape({ pieces: [R] }), axes({ r: 1.95, angles: [90, 0] }), fold({ id: 'd1', a: [-1.75, -1.05], b: [1.75, 1.05], ok: false }), fold({ id: 'd2', a: [-1.75, 1.05], b: [1.75, -1.05], ok: false }))]);

// The rhombus from the lesson: 4 equal sides, 2 lines of symmetry through opposite corners.
const RH: P[] = [
  [0, -1.6],
  [0.96, 0],
  [0, 1.6],
  [-0.96, 0],
];
const rhombus = (id: string) =>
  figure(id, [join(shape({ pieces: [RH] }), axes({ r: 1.95, angles: [90, 0] }), ...RH.map((p, i) => ticks({ id: `t${i}`, a: p, b: RH[(i + 1) % 4] })))]);

// Triangles with 3, exactly 2 and no equal sides.
const EQ = regular(3, 1.1, 90, [0, 0]);
const ISO: P[] = [
  [2.85, -0.85],
  [4.35, -0.85],
  [3.6, 1.35],
];
const SCA: P[] = [
  [6.4, -0.85],
  [8.7, -0.85],
  [7.0, 1.1],
];
const tris = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ id: 'eq', pieces: [EQ] }),
        ...EQ.map((p, i) => ticks({ id: `te${i}`, a: p, b: EQ[(i + 1) % 3], count: 1 })),
        axes({ id: 'le', r: 1.35, angles: [90, 210, 330] }),
        caption({ id: 'c1', at: [0, -1.55], tex: '3 \\text{ lines}', tone: 'good' }),
        shape({ id: 'iso', pieces: [ISO] }),
        ticks({ id: 'ti1', a: ISO[1], b: ISO[2] }),
        ticks({ id: 'ti2', a: ISO[2], b: ISO[0] }),
        fold({ id: 'li', a: [3.6, -1.2], b: [3.6, 1.7] }),
        caption({ id: 'c2', at: [3.6, -1.55], tex: '1 \\text{ line}', tone: 'good' }),
        shape({ id: 'sca', pieces: [SCA] }),
        caption({ id: 'c3', at: [7.55, -1.55], tex: '0 \\text{ lines}', tone: 'bad' }),
      ),
    ],
  );

// The isosceles triangle from the lesson, its equal sides marked, and its one line of symmetry.
const T: P[] = [
  [-0.83, 0],
  [0.83, 0],
  [0, 2],
];
const iso = (id: string) => figure(id, [join(shape({ pieces: [T] }), ticks({ id: 'eq1', a: T[1], b: T[2] }), ticks({ id: 'eq2', a: T[2], b: T[0] }), fold({ id: 'line', a: [0, -0.35], b: [0, 2.35] }))]);

const video: Explainer = {
  id: 'm5-8-2-b',
  lessonId: 'm5-8-2',
  title: 'Symmetry of Polygons, Part 2: Polygons That Are Not Regular',
  thumbnailTitle: 'Not Regular',
  thumbnail: 'tr',
  summary: 'A polygon whose sides or angles are not all equal has fewer symmetries than sides: a rectangle and a rhombus each have 2 lines of symmetry and order 2, so counting sides is not enough. For triangles, the lines of symmetry match the equal sides: 3 equal sides give 3 lines, exactly 2 equal sides (isosceles) give 1, and no equal sides give none.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 2', title: 'Polygons That Are Not Regular', subtitle: 'Fewer symmetries than sides' }],
      lines: [
        { say: 'In the last part, every polygon was regular, with all sides equal and all angles equal. But most polygons are not regular.', show: 'title' },
        { say: 'In this video, you will find the symmetries of polygons that are not regular, including triangles.' },
      ],
    },
    {
      chapter: 'A rectangle',
      layout: 'split',
      leftWidth: 540,
      left: [rect('rc')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A rectangle has $4$ sides, but only $2$ lines of symmetry. Its order of rotation symmetry is $2$.' }],
      lines: [
        { say: 'When the sides or the angles are not all equal, a polygon has fewer symmetries than sides.', show: 'rc.shape' },
        { say: 'A rectangle has four sides, but only two lines of symmetry: one up and down, and one across.', show: ['rc.l', 't'], focus: 'rc.l' },
        { say: 'Its long sides and short sides are different, so the diagonals do not work as fold lines.', show: ['rc.d1', 'rc.d2'], focus: ['rc.d1', 'rc.d2'] },
        { say: 'And it fits on itself only after a half turn and a full turn. So its order of rotation symmetry is two, not four.' },
      ],
    },
    {
      chapter: 'A rhombus',
      layout: 'split',
      leftWidth: 480,
      left: [rhombus('rh')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'This rhombus has $4$ equal sides, but its angles are not all equal. It has only $2$ lines of symmetry, and its order of rotation symmetry is $2$.' }],
      lines: [
        { say: 'This shape is a rhombus. The marks show that its four sides are all equal.', show: ['rh.shape', 'rh.t0', 'rh.t1', 'rh.t2', 'rh.t3'] },
        { say: 'But its angles are not all equal. Two of its angles are narrow, and two are wide. So it is not a regular polygon.' },
        { say: 'It has only two lines of symmetry, through opposite corners. And its order of rotation symmetry is two.', show: ['rh.l', 't'], focus: 'rh.l' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting sides is not enough', md: '“A rectangle has $4$ sides, so it has $4$ lines of symmetry” is wrong. Only a **regular** polygon is sure to have as many symmetries as sides. Check other shapes fold by fold.' },
      ],
      lines: [
        { say: 'Watch out. It is tempting to say that a rectangle has four sides, so it has four lines of symmetry. That is wrong.', show: 'oops' },
        { say: 'Only a regular polygon is sure to have as many symmetries as sides. For any other shape, check fold by fold, and turn by turn.' },
      ],
    },
    {
      chapter: 'Triangles',
      layout: 'center',
      main: [tris('tr')],
      lines: [
        { say: 'For triangles, the lines of symmetry match the equal sides. The small marks show which sides are equal.', show: ['tr.eq', 'tr.te0', 'tr.te1', 'tr.te2', 'tr.iso', 'tr.ti1', 'tr.ti2', 'tr.sca'] },
        { say: 'A triangle with three equal sides has three lines of symmetry, one from each corner to the middle of the opposite side.', show: ['tr.le', 'tr.c1'], focus: 'tr.le' },
        { say: 'A triangle with exactly two equal sides has one line of symmetry.', show: ['tr.li', 'tr.c2'], focus: 'tr.li' },
        { say: 'And a triangle with no equal sides has no lines of symmetry at all.', show: 'tr.c3', focus: 'tr.sca' },
      ],
    },
    {
      chapter: 'An isosceles triangle',
      layout: 'split',
      leftWidth: 460,
      left: [iso('is')],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'This triangle has exactly $2$ equal sides. How many lines of symmetry does it have?' }],
      lines: [
        { say: 'A triangle with exactly two equal sides is called an isosceles triangle. How many lines of symmetry does this one have?', show: ['is.shape', 'is.eq1', 'is.eq2', 'q'] },
        { say: 'Fold it along the line from the top corner to the middle of the bottom side. The two equal sides land on each other.', show: 'is.line', focus: 'is.line' },
        { say: 'No other fold works, because the third side is a different length. So it has exactly one line of symmetry.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle is **not** a square. How many lines of symmetry does it have, and what is its order of rotation symmetry?',
          choices: ['$4$ lines; order $4$', '$2$ lines; order $4$', '$4$ lines; order $2$', '$2$ lines; order $2$'],
          answer: 3,
          working: 'Only the fold up and down and the fold across work, so it has $2$ lines. It fits after a half turn and a full turn, so its order is $2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is not a square. How many lines of symmetry does it have, and what is its order of rotation symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D: two lines, and order two. Only the fold up and down and the fold across work, and it fits only after a half turn and a full turn. Choice A counts the sides, but a rectangle that is not a square is not a regular polygon.', show: 'q.answer' },
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
          items: ['Polygons that are not regular have fewer symmetries than sides.', 'A rectangle and a rhombus each have $2$ lines and order $2$.', 'Triangles: $3$ equal sides give $3$ lines, exactly $2$ equal sides give $1$, and no equal sides give none.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Polygons that are not regular have fewer symmetries than sides.', show: 'sum.0' },
        { say: 'A rectangle and a rhombus each have two lines of symmetry, and order two.', show: 'sum.1' },
        { say: 'And for triangles, three equal sides give three lines, exactly two equal sides give one line, and no equal sides give none. In the next part, you will look at circles, and sort shapes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
