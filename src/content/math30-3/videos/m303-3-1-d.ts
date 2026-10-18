import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { caption, dot, polygon, tickMarks } from './lib/m303-3-figures.ts';

type P = [number, number];

/** Rhombus PQRS with sides of 5 and angle PQR = 128°; its diagonals meet at E. */
const rh: Record<string, P> = { P: [0, 0], Q: [5, 0], R: [8.078, 3.94], S: [3.078, 3.94] };
const E: P = [4.039, 1.97];
/** Where E's name goes: in the gap between the diagonals, on the left. */
const nameE: P = [4.039 - 0.55 * Math.cos((19 * Math.PI) / 180), 1.97 + 0.55 * Math.sin((19 * Math.PI) / 180)];

/** Angles at E and at the corners, drawn from the rhombus's named points. */
const rhombusAngles = (labels: { half?: string; whole?: string; p?: string }): Part => ({
  points: {},
  items: [
    { kind: 'angle', id: 'q1', at: 'Q', from: 'P', to: 'E', tone: 'opp', r: 40, ...(labels.half ? { label: labels.half } : {}) },
    { kind: 'angle', id: 'q2', at: 'Q', from: 'E', to: 'R', tone: 'opp', r: 48, ...(labels.half ? { label: labels.half } : {}) },
    { kind: 'angle', id: 'qw', at: 'Q', from: 'P', to: 'R', tone: 'theta', r: 40, ...(labels.whole ? { label: labels.whole } : {}) },
    { kind: 'right', id: 'e', at: 'E', from: 'Q', to: 'R' },
    { kind: 'angle', id: 'p1', at: 'P', from: 'Q', to: 'E', tone: 'adj', r: 70, ...(labels.p ? { label: labels.p, labelDist: 120 } : {}) },
  ] satisfies DiagramItem[],
});

const video: Explainer = {
  id: 'm303-3-1-d',
  lessonId: 'm303-3-1',
  title: 'Properties of Triangles and Quadrilaterals, Part 4: Diagonals of Rectangles and Rhombuses',
  thumbnailTitle: 'Diagonals of Rectangles and Rhombuses',
  thumbnail: 'rh',
  summary: 'A rectangle’s diagonals are equal, which builders use to square a frame (a 2.4 m by 1.8 m frame is square when both diagonals are 3 m), and a rhombus’s diagonals cross at 90° and bisect its corner angles: in rhombus PQRS with angle PQR = 128°, angle PQE = 64° and angle QPE = 26°. Only rectangles and squares have equal diagonals. Part 5 covers trapezoids and kites.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 4', title: 'Diagonals of Rectangles and Rhombuses', subtitle: 'Equal, or at right angles' }],
      lines: [
        { say: 'Rectangles and rhombuses are parallelograms, so they have every property of a parallelogram. Their diagonals also have special properties of their own.', show: 'title' },
        { say: 'In this video, you will see how builders use the diagonals of a rectangle to square a frame, and use the diagonals of a rhombus to find angles.' },
      ],
    },
    {
      chapter: 'Rectangles',
      layout: 'split',
      left: [
        figure('re', [
          polygon({ corners: { A: [0, 0], B: [5, 0], C: [5, 3], D: [0, 3] }, rights: ['A', 'B', 'C', 'D'], diagonals: [{ from: 'A', to: 'C' }, { from: 'B', to: 'D' }] }),
          dot({ id: 'E', at: [2.5, 1.5], tex: 'E', place: 'below' }),
          tickMarks({ id: 'h1', from: [0, 0], to: [2.5, 1.5], count: 1, size: 5 }),
          tickMarks({ id: 'h2', from: [2.5, 1.5], to: [5, 3], count: 1, size: 5 }),
          tickMarks({ id: 'h3', from: [5, 0], to: [2.5, 1.5], count: 1, size: 5 }),
          tickMarks({ id: 'h4', from: [2.5, 1.5], to: [0, 3], count: 1, size: 5 }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Diagonals of a rectangle', md: 'A rectangle’s diagonals bisect each other, like any parallelogram’s, and they are also **equal**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['AC = BD', 'AE = EC = BE = ED'] },
      ],
      lines: [
        { say: 'Here is a rectangle, A B C D, with its two diagonals crossing at E.', show: ['re.shape', 're.names', 're.diags', 're.E'] },
        { say: 'A rectangle is a parallelogram, so its diagonals bisect each other. But in a rectangle, the two diagonals are also equal in length: A C equals B D.', show: ['key', 'm.0'], focus: ['re.diags', 'm.0'] },
        { say: 'So all four half-diagonals, from E out to each corner, are the same length. The single tick marks on all four show it.', show: ['re.h1', 're.h2', 're.h3', 're.h4', 'm.1'], focus: ['re.h1', 're.h2', 're.h3', 're.h4', 'm.1'] },
      ],
    },
    {
      chapter: 'Squaring a frame',
      layout: 'center',
      main: [
        figure('fr', [
          polygon({
            name: 'a',
            corners: { A: [0, 0], B: [2.4, 0], C: [2.7, 1.775], D: [0.3, 1.775] },
            names: false,
            tone: 'bad',
            sides: { AB: '2.4\\text{ m}', DA: '1.8\\text{ m}' },
            diagonals: [{ from: 'A', to: 'C', tone: 'opp' }, { from: 'B', to: 'D', tone: 'adj' }],
          }),
          caption({ id: 'a-d', at: [1.35, -0.8], tex: '\\opp{3.23\\text{ m}} \\ne \\adj{2.75\\text{ m}}', group: 'a-cap' }),
          caption({ id: 'a-n', at: [1.35, -1.35], tex: '\\text{Not square}', tone: 'bad', group: 'a-cap' }),
          polygon({
            name: 'b',
            corners: { A: [4.6, 0], B: [7.0, 0], C: [7.0, 1.8], D: [4.6, 1.8] },
            names: false,
            tone: 'good',
            rights: ['A', 'B', 'C', 'D'],
            sides: { AB: '2.4\\text{ m}', BC: '1.8\\text{ m}' },
            diagonals: [{ from: 'A', to: 'C', tone: 'opp' }, { from: 'B', to: 'D', tone: 'adj' }],
          }),
          caption({ id: 'b-d', at: [5.8, -0.8], tex: '\\opp{3\\text{ m}} = \\adj{3\\text{ m}}', group: 'b-cap' }),
          caption({ id: 'b-n', at: [5.8, -1.35], tex: '\\text{Square}', tone: 'good', group: 'b-cap' }),
        ]),
      ],
      lines: [
        { say: 'Builders use this to square a frame, such as the frame of a deck or a wall. First, they make both pairs of opposite sides equal: here, 2.4 metres and 1.8 metres.', show: ['fr.a-shape'] },
        { say: 'That makes a parallelogram, but it might lean over. Then they measure both diagonals. If one is 3.23 metres and the other is 2.75 metres, the diagonals are not equal, so the frame is not a rectangle.', show: ['fr.a-diags', 'fr.a-cap'], focus: 'fr.a-diags' },
        { say: 'So they push the frame over until the two diagonals match. When both diagonals measure 3 metres, the frame is a rectangle, and every corner is a right angle.', show: ['fr.b-shape', 'fr.b-diags', 'fr.b-cap'], focus: 'fr.b-diags' },
        { say: 'Opposite sides equal makes a parallelogram. Equal diagonals as well makes a rectangle. No protractor needed, just a tape measure.' },
      ],
    },
    {
      chapter: 'Rhombuses',
      layout: 'split',
      left: [
        figure('rh', [
          polygon({ corners: rh, ticks: { PQ: 1, QR: 1, RS: 1, SP: 1 }, diagonals: [{ from: 'P', to: 'R' }, { from: 'Q', to: 'S' }] }),
          dot({ id: 'E', at: E, tex: 'E', nameAt: nameE }),
          rhombusAngles({}),
        ]),
      ],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Diagonals of a rhombus', md: 'A rhombus’s diagonals cross at $90^\\circ$, and each diagonal **bisects** the corner angles it joins.' }],
      lines: [
        { say: 'Now a rhombus, P Q R S. All four sides are equal. Draw its diagonals, which cross at E.', show: ['rh.shape', 'rh.names', 'rh.ticks', 'rh.diags', 'rh.E'] },
        { say: 'The diagonals of a rhombus always cross at right angles. They are perpendicular.', show: ['rh.e', 'key'], focus: 'rh.e' },
        { say: 'And each diagonal bisects the corner angles at its ends. For example, diagonal Q S cuts angle Q into two equal halves, marked in orange.', show: ['rh.q1', 'rh.q2'], focus: ['rh.q1', 'rh.q2', 'rh.dQS'] },
        { say: 'The same happens at every corner: each corner angle is split exactly in half by the diagonal through it.' },
      ],
    },
    {
      chapter: 'Angles in a rhombus',
      layout: 'split',
      left: [
        figure('ex', [
          polygon({ corners: rh, ticks: { PQ: 1, QR: 1, RS: 1, SP: 1 }, diagonals: [{ from: 'P', to: 'R' }, { from: 'Q', to: 'S' }] }),
          dot({ id: 'E', at: E, tex: 'E', nameAt: nameE }),
          rhombusAngles({ half: '64^\\circ', whole: '128^\\circ', p: '?' }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\angle PQE = 128^\\circ \\div 2 = 64^\\circ', '\\angle PEQ = 90^\\circ', '\\angle QPE = 180^\\circ - 90^\\circ - 64^\\circ', '\\angle QPE = 26^\\circ'],
        },
      ],
      lines: [
        { say: 'P Q R S is a rhombus, and angle P Q R is 128 degrees. Its diagonals meet at E. Find angle P Q E, and angle Q P E.', show: ['ex.shape', 'ex.names', 'ex.ticks', 'ex.diags', 'ex.E', 'ex.qw'], focus: 'ex.qw' },
        { say: 'Diagonal Q S bisects angle Q. So angle P Q E is half of 128, which is 64 degrees.', show: ['m.0', 'ex.q1', 'ex.q2'], hide: 'ex.qw', focus: ['m.0', 'ex.q1'] },
        { say: 'The diagonals are perpendicular, so angle P E Q is 90 degrees.', show: ['m.1', 'ex.e'], focus: ['m.1', 'ex.e'] },
        { say: 'Now look at triangle P Q E. Its angles add to 180 degrees, so angle Q P E is 180, minus 90, minus 64.', show: ['m.2', 'ex.p1'], focus: ['m.2', 'ex.p1'] },
        { say: 'That is 26 degrees. So angle P Q E is 64 degrees, and angle Q P E is 26 degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Diagonals', 'Bisect each other', 'Equal', 'Cross at $90^\\circ$'],
          rows: [
            ['Parallelogram', '$\\good{\\checkmark}$', '', ''],
            ['Rectangle', '$\\good{\\checkmark}$', '$\\good{\\checkmark}$', ''],
            ['Rhombus', '$\\good{\\checkmark}$', '', '$\\good{\\checkmark}$'],
            ['Square', '$\\good{\\checkmark}$', '$\\good{\\checkmark}$', '$\\good{\\checkmark}$'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Equal diagonals in every parallelogram', md: 'Only rectangles and squares have equal diagonals. In a slanted parallelogram, one diagonal is longer than the other.' },
      ],
      lines: [
        { say: 'Here are the diagonal properties together. In every parallelogram, the diagonals bisect each other.', show: 't.0', focus: 't.0' },
        { say: 'In a rectangle, they are also equal. In a rhombus, they also cross at 90 degrees. And a square is both, so its diagonals do all three.', show: ['t.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'A common mistake is to think every parallelogram has equal diagonals. Only rectangles and squares do. In a slanted parallelogram, or a rhombus that is not a square, one diagonal is longer than the other, even though each is still cut in half.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$ABCD$ is a rhombus with $\\angle ABC = 70^\\circ$. Its diagonals meet at $E$. What is $\\angle BAE$?',
          choices: ['$35^\\circ$', '$110^\\circ$', '$55^\\circ$', '$90^\\circ$'],
          answer: 2,
          working: 'Diagonal $BD$ bisects $\\angle B$: $\\angle ABE = 35^\\circ$. The diagonals are perpendicular: $\\angle AEB = 90^\\circ$. So $\\angle BAE = 180^\\circ - 90^\\circ - 35^\\circ = 55^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A B C D is a rhombus, and angle A B C is seventy degrees. Its diagonals meet at E. What is angle B A E? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, 55 degrees. Diagonal B D bisects angle B, so angle A B E is 35 degrees. The diagonals are perpendicular, so angle A E B is 90. Then 180 minus 90 minus 35 is 55. Choice A, 35 degrees, is angle A B E, not angle B A E.', show: 'q.answer' },
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
            'A rectangle’s diagonals are equal: matching diagonals square a frame.',
            'A rhombus’s diagonals cross at $90^\\circ$ and bisect the corner angles.',
            'Only rectangles and squares have equal diagonals.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The diagonals of a rectangle are equal, so builders check that a frame is square by matching its diagonals.', show: 'sum.0' },
        { say: 'The diagonals of a rhombus cross at 90 degrees, and they bisect the corner angles.', show: 'sum.1' },
        { say: 'And only rectangles and squares have equal diagonals. In the next part, we find angles in trapezoids and kites. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
