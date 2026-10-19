import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arcArrow, axes, caption, fold, join, mark, regular, shape, type P } from './lib/m5-8-figures.ts';

const circlePts = (r: number, c: P = [0, 0]): P[] => regular(72, r, 0, c);

// A round coaster: a circle with six of its lines of symmetry.
const coaster = (id: string) => figure(id, [join(shape({ pieces: [circlePts(1.5)], tone: 'theta', shade: 0.25 }), axes({ r: 1.9, angles: [90, 0, 30, 60, 120, 150] }), mark({ id: 'ctr', at: [0, 0] }))]);

// One shape from each group: a square (both), a kite (lines only), a parallelogram (rotation
// only) and a triangle with no equal sides (neither).
const KITE: P[] = [
  [3.6, 1.0],
  [4.35, 0.3],
  [3.6, -1.3],
  [2.85, 0.3],
];
const PARA: P[] = [
  [6.1, -0.6],
  [7.5, -0.6],
  [8.1, 0.6],
  [6.7, 0.6],
];
const SCA: P[] = [
  [9.8, -0.85],
  [12.0, -0.85],
  [10.3, 0.95],
];
const groups = (id: string) =>
  figure(
    id,
    [
      join(
        shape({ id: 'sq', pieces: [regular(4, 1.25, 45)] }),
        axes({ id: 'ls', r: 1.3, angles: [0, 45, 90, 135] }),
        caption({ id: 'c1', at: [0, -1.9], tex: '\\text{both}', tone: 'good' }),
        shape({ id: 'kite', pieces: [KITE] }),
        fold({ id: 'lk', a: [3.6, -1.45], b: [3.6, 1.3] }),
        caption({ id: 'c2', at: [3.6, -1.9], tex: '\\text{lines only}', tone: 'adj' }),
        shape({ id: 'para', pieces: [PARA] }),
        mark({ id: 'pc', at: [7.1, 0] }),
        arcArrow({ id: 'pt', c: [7.1, 0], r: 1.25, from: 20, to: 200 }),
        caption({ id: 'c3', at: [7.1, -1.9], tex: '\\text{rotation only}', tone: 'opp' }),
        shape({ id: 'sca', pieces: [SCA] }),
        caption({ id: 'c4', at: [10.7, -1.9], tex: '\\text{neither}', tone: 'bad' }),
      ),
    ],
    320,
  );

// The parallelogram from the lesson: folds that do not work, and a half turn that does.
const P2: P[] = [
  [-1.6, -0.8],
  [0.8, -0.8],
  [1.6, 0.8],
  [-0.8, 0.8],
];
const para = (id: string) =>
  figure(id, [
    join(
      shape({ pieces: [P2] }),
      fold({ id: 'f1', a: [0, -1.25], b: [0, 1.25], ok: false }),
      fold({ id: 'f2', a: [-2, 0], b: [2, 0], ok: false }),
      fold({ id: 'f3', a: [-1.85, -0.92], b: [1.85, 0.92], ok: false }),
      mark({ id: 'ctr', at: [0, 0] }),
      arcArrow({ id: 'half', c: [0, 0], r: 2.05, from: 30, to: 210 }),
    ),
  ]);

const video: Explainer = {
  id: 'm5-8-2-c',
  lessonId: 'm5-8-2',
  title: 'Symmetry of Polygons, Part 3: Circles, and Sorting Shapes',
  thumbnailTitle: 'Sorting by Symmetry',
  thumbnail: 'gp',
  summary: 'A circle has infinitely many lines of symmetry (every line through its centre) and fits on itself after any turn. Every shape belongs to one of four groups, by asking whether it has a line of symmetry and whether it has rotation symmetry: a square has both, a kite has lines only, a parallelogram has rotation only (0 lines, order 2), and a triangle with no equal sides has neither.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 3', title: 'Circles, and Sorting Shapes', subtitle: 'Infinitely many, and four groups' }],
      lines: [
        { say: 'A circle is the most symmetrical shape of all. And every shape, round or straight, can be sorted by its symmetries.', show: 'title' },
        { say: 'In this video, you will find the symmetries of a circle, and sort shapes into four groups.' },
      ],
    },
    {
      chapter: 'A round coaster',
      layout: 'split',
      leftWidth: 500,
      left: [coaster('co')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Every straight line through the centre of a circle is a line of symmetry. A circle has **infinitely many** lines of symmetry, and it fits on itself after **any** turn.' }],
      lines: [
        { say: 'A coaster is shaped like a circle. A circle is not a polygon, because it has no straight sides. How many lines of symmetry does it have?', show: ['co.shape', 'co.ctr'] },
        { say: 'Fold the circle through its centre, and the two halves match. Try another direction through the centre, and they match again.', show: ['co.l0', 'co.l1'], focus: ['co.l0', 'co.l1'] },
        { say: 'Any direction works, as long as the fold goes through the centre. Here are just a few of them.', show: 'co.l', focus: 'co.l' },
        { say: 'There is no end to the number of directions. So a circle has infinitely many lines of symmetry. Infinitely many means more than any number you could count to.', show: 't' },
        { say: 'A circle also fits on itself after any turn about its centre, even a tiny one. So it has infinitely many rotation symmetries as well.' },
      ],
    },
    {
      chapter: 'Two questions',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Every shape belongs to one of four groups. Ask two questions:' },
        { kind: 'bullets', id: 'b', items: ['Does it have a **line of symmetry**?', 'Does it have **rotation symmetry** (an order of $2$ or more)?'] },
        groups('gp'),
      ],
      lines: [
        { say: 'Every shape belongs to one of four groups. To sort any shape, ask two questions.', show: 't' },
        { say: 'Does it have a line of symmetry? And does it have rotation symmetry, which means an order of two or more?', show: ['b.0', 'b.1'] },
        { say: 'A square has both: four lines of symmetry, and order four.', show: ['gp.sq', 'gp.ls', 'gp.c1'] },
        { say: 'A kite has one line of symmetry, but no rotation symmetry. It has lines only.', show: ['gp.kite', 'gp.lk', 'gp.c2'] },
        { say: 'A parallelogram has no lines of symmetry, but it fits after a half turn. It has rotation only.', show: ['gp.para', 'gp.pc', 'gp.pt', 'gp.c3'] },
        { say: 'And a triangle with no equal sides has neither.', show: ['gp.sca', 'gp.c4'] },
      ],
    },
    {
      chapter: 'Sorting shapes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shape', 'Lines of symmetry', 'Order of rotation symmetry', 'Group'],
          rows: [
            ['Square', '$4$', '$4$', 'both'],
            ['Rectangle', '$2$', '$2$', 'both'],
            ['Kite', '$1$', '$1$', 'lines only'],
            ['Isosceles triangle', '$1$', '$1$', 'lines only'],
            ['Parallelogram', '$0$', '$2$', 'rotation only'],
            ['Letter S', '$0$', '$2$', 'rotation only'],
            ['Triangle with no equal sides', '$0$', '$1$', 'neither'],
          ],
        },
      ],
      lines: [
        { say: 'Here are more shapes, sorted. A square and a rectangle both have lines of symmetry and rotation symmetry.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'A kite and an isosceles triangle have one line of symmetry each, but order one. They have lines only.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'A parallelogram and the letter S have no lines of symmetry, but order two. They have rotation only.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
        { say: 'And a triangle with no equal sides has no lines and order one. It has neither.', show: 't.6', focus: 't.6' },
      ],
    },
    {
      chapter: 'Sorting a parallelogram',
      layout: 'split',
      leftWidth: 520,
      left: [para('pa')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which group does this parallelogram belong to?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0 \\text{ lines of symmetry}', '\\text{order } 2', '\\text{rotation only}'] },
      ],
      lines: [
        { say: 'Let’s check the parallelogram fold by fold. Which group does it belong to?', show: ['pa.shape', 'q'] },
        { say: 'Try the folds: up and down, across, and corner to corner. None of them makes the two halves match. So it has zero lines of symmetry.', show: ['pa.f1', 'pa.f2', 'pa.f3', 'm.0'], focus: 'm.0' },
        { say: 'Now turn it about its centre. A half turn makes it fit exactly on itself. So its order of rotation symmetry is two.', show: ['pa.ctr', 'pa.half', 'm.1'], focus: ['pa.half', 'm.1'] },
        { say: 'It has rotation symmetry but no lines of symmetry. So it belongs to the group rotation only.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which group does a triangle with $3$ equal sides belong to?',
          choices: ['Both: lines and rotation', 'Lines only', 'Rotation only', 'Neither'],
          answer: 0,
          working: 'A triangle with $3$ equal sides is a regular polygon: it has $3$ lines of symmetry and an order of rotation symmetry of $3$. It has both.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has three equal sides. Which group does it belong to? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, both. A triangle with three equal sides is a regular polygon, so it has three lines of symmetry and order three. Choice B forgets that it fits on itself after a third of a turn.', show: 'q.answer' },
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
          items: ['A circle has infinitely many lines of symmetry and infinitely many rotation symmetries.', 'Sort a shape with two questions: does it have a line of symmetry, and does it have rotation symmetry?', 'The four groups: both, lines only, rotation only, and neither.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A circle has infinitely many lines of symmetry, and infinitely many rotation symmetries.', show: 'sum.0' },
        { say: 'To sort any shape, ask two questions. Does it have a line of symmetry? And does it have rotation symmetry?', show: 'sum.1' },
        { say: 'Every shape belongs to one of four groups: both, lines only, rotation only, or neither. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
