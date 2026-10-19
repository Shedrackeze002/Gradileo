import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, mark, pinwheel, regular, shape, stroke, ticks, turns, type P } from './lib/m5-8-figures.ts';

// The parallelogram from the lesson, with its centre O, and the straight paths through O that
// carry A to C and B to D in a half turn.
const A: P = [-2.98, -1.49];
const B: P = [1.49, -1.49];
const C: P = [2.98, 1.49];
const D: P = [-1.49, 1.49];
const para = (id: string) =>
  figure(id, [
    join(
      shape({ pieces: [[A, B, C, D]] }),
      fold({ id: 'ac', a: A, b: C, tone: 'theta' }),
      fold({ id: 'bd', a: B, b: D, tone: 'theta' }),
      ticks({ id: 'eq1', a: A, b: [0, 0], count: 2 }),
      ticks({ id: 'eq2', a: [0, 0], b: C, count: 2 }),
      mark({ id: 'O', at: [0, 0], tex: 'O', place: 'right', tone: 'theta' }),
      mark({ id: 'A', at: A, tex: 'A', place: 'below left', dot: false }),
      mark({ id: 'B', at: B, tex: 'B', place: 'below right', dot: false }),
      mark({ id: 'C', at: C, tex: 'C', place: 'above right', dot: false }),
      mark({ id: 'D', at: D, tex: 'D', place: 'above left', dot: false }),
    ),
  ]);

// A rectangle, the pinwheel and a triangle with 3 equal sides, each after a half turn over a
// dashed outline of where it started.
const RECT: P[] = [
  [-1.3, -0.8],
  [1.3, -0.8],
  [1.3, 0.8],
  [-1.3, 0.8],
];
const half = (id: string) =>
  figure(
    id,
    [
      turns({ name: 'r', pieces: [RECT], angles: [180], labels: ['\\text{order } 2 \\;\\checkmark'], tones: ['good'] }),
      turns({ name: 'p', pieces: pinwheel(1.1), angles: [180], labels: ['\\text{order } 4 \\;\\checkmark'], tones: ['good'], x0: 4 }),
      turns({ name: 't', pieces: [regular(3, 1.25, 90, [0, -0.1])], angles: [180], labels: ['\\text{order } 3\\ \\text{no}'], tones: ['bad'], x0: 8 }),
    ],
    340,
  );

// The capital letters Z and N, each with its centre: a half turn fits each on itself.
const letters = (id: string) =>
  figure(
    id,
    [
      join(
        stroke({ id: 'z1', a: [-0.8, 1], b: [0.8, 1], group: 'Z' }),
        stroke({ id: 'z2', a: [0.8, 1], b: [-0.8, -1], group: 'Z' }),
        stroke({ id: 'z3', a: [-0.8, -1], b: [0.8, -1], group: 'Z' }),
        mark({ id: 'zc', at: [0, 0], tone: 'theta', group: 'Z' }),
        stroke({ id: 'n1', a: [2.7, -1], b: [2.7, 1], group: 'N' }),
        stroke({ id: 'n2', a: [2.7, 1], b: [4.3, -1], group: 'N' }),
        stroke({ id: 'n3', a: [4.3, -1], b: [4.3, 1], group: 'N' }),
        mark({ id: 'nc', at: [3.5, 0], tone: 'theta', group: 'N' }),
      ),
    ],
    260,
  );

const video: Explainer = {
  id: 'm5-8-1-c',
  lessonId: 'm5-8-1',
  title: 'Line and Rotation Symmetry, Part 3: Central Symmetry',
  thumbnailTitle: 'Central Symmetry',
  thumbnail: 'pa',
  summary: 'Central symmetry is rotation symmetry by a half turn (180°): every point moves along a straight line through the centre to the same distance on the other side, so in a parallelogram vertex C lands where A was, and B and D trade places. Shapes with an even order of rotation symmetry have it; a triangle with 3 equal sides (order 3) does not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry · Part 3', title: 'Central Symmetry', subtitle: 'The half turn' }],
      lines: [
        { say: 'One turn is special: the half turn. Many shapes, letters and designs fit on themselves after a half turn.', show: 'title' },
        { say: 'In this video, you will learn about central symmetry, and how points move in a half turn.' },
      ],
    },
    {
      chapter: 'Central symmetry',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Central symmetry', md: 'A shape has **central symmetry** if it fits exactly on itself after a **half turn** ($180^\\circ$) around its centre. Central symmetry is rotation symmetry by $180^\\circ$.' }],
      lines: [
        { say: 'A shape has central symmetry if it fits exactly on itself after a half turn around its centre. A half turn is 180 degrees.', show: 'def' },
        { say: 'So central symmetry is rotation symmetry by a half turn. It is called central symmetry because everything turns about the centre.' },
      ],
    },
    {
      chapter: 'A straight line through the centre',
      layout: 'split',
      leftWidth: 560,
      left: [para('pa')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'In a half turn, every point moves along a straight line through the centre. It stops the **same distance** from the centre, on the other side.' }],
      lines: [
        { say: 'Here is a parallelogram with vertices A, B, C and D. Its centre is the point O.', show: ['pa.shape', 'pa.O', 'pa.A', 'pa.B', 'pa.C', 'pa.D'] },
        { say: 'In a half turn, every point moves along a straight line through the centre. It stops the same distance from the centre, on the other side.', show: 't' },
        { say: 'The parallelogram has central symmetry about O. After a half turn, which vertex lands where vertex A was?' },
        { say: 'Draw a straight line from A through O. Keep going the same distance past O. The two marked halves are equal, and the line reaches vertex C.', show: ['pa.ac', 'pa.eq1', 'pa.eq2'], focus: 'pa.ac' },
        { say: 'So vertex C lands where A was, and A lands where C was. B and D trade places as well, along the other line through O.', show: 'pa.bd', focus: 'pa.bd' },
      ],
    },
    {
      chapter: 'Even orders',
      layout: 'center',
      main: [
        half('hf'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Even orders', md: 'A shape with an order of rotation symmetry of $2$, $4$, $6$ or $8$ fits after a half turn, so it has central symmetry.' },
      ],
      lines: [
        { say: 'Which shapes have central symmetry? Here is a tip. A shape with an order of rotation symmetry of two, four, six or eight fits after a half turn.', show: 'tip' },
        { say: 'A rectangle has order two. After a half turn, it fits exactly on its outline.', show: 'hf.r-c0', focus: 'hf.r-c0' },
        { say: 'The pinwheel has order four. It fits after every quarter turn, so it fits after a half turn as well.', show: 'hf.p-c0', focus: 'hf.p-c0' },
        { say: 'But a triangle with three equal sides has order three. After a half turn, it points down instead of up, and it does not fit its outline. So it does not have central symmetry.', show: 'hf.t-c0', focus: 'hf.t-c0' },
      ],
    },
    {
      chapter: 'Letters',
      layout: 'center',
      main: [
        letters('lt'),
        { kind: 'text', id: 't', size: 'md', md: 'The capital letters **Z** and **N** have no lines of symmetry, but each fits on itself after a half turn about its centre.' },
      ],
      lines: [
        { say: 'Some capital letters have central symmetry. Look at the letter Z. Turn it halfway round its centre, and it fits exactly on itself.', show: 'lt.Z' },
        { say: 'The letter N works the same way. A half turn about its centre fits it on itself.', show: 'lt.N' },
        { say: 'Neither letter has a line of symmetry. But both have central symmetry. You can check by turning your page upside down.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these shapes has central symmetry?',
          choices: ['An arrow sign', 'A triangle with $3$ equal sides', 'A heart', 'A rectangle'],
          answer: 3,
          working: 'A rectangle has order $2$: it fits on itself after a half turn about its centre. The other shapes do not fit after a half turn.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these shapes has central symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, a rectangle. It has order two, so it fits on itself after a half turn. Choice B, the triangle with three equal sides, has order three, so after a half turn it points the wrong way.', show: 'q.answer' },
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
          items: ['Central symmetry is rotation symmetry by a half turn ($180^\\circ$).', 'In a half turn, each point moves along a straight line through the centre, to the same distance on the other side.', 'Orders $2$, $4$, $6$ and $8$ include a half turn.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Central symmetry is rotation symmetry by a half turn, 180 degrees.', show: 'sum.0' },
        { say: 'In a half turn, each point moves along a straight line through the centre, to the same distance on the other side.', show: 'sum.1' },
        { say: 'And a shape with order two, four, six or eight has central symmetry. In the next part, you will find symmetry in nature and in designs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
