import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { caption, fan, polygon } from './lib/m303-3-figures.ts';

type P = [number, number];

/** A quadrilateral with angles of 85°, 95°, 110° and 70° (drawn to scale). */
const Q: Record<string, P> = { A: [0, 0], B: [6, 0], C: [6.349, 3.985], D: [0.584, 6.673] };

/** The parallelogram family, side by side, each with its name underneath. */
const parallelograms = () =>
  figure('par', [
    polygon({ name: 'pa', corners: { A: [0, 0], B: [2.6, 0], C: [3.4, 1.9], D: [0.8, 1.9] }, arrows: { AB: 1, DC: 1, AD: 2, BC: 2 }, names: false, group: 'pg' }),
    caption({ id: 'pg-cap', at: [1.7, -0.6], tex: '\\text{Parallelogram}', group: 'pg' }),
    polygon({ name: 're', corners: { A: [4.6, 0], B: [7.6, 0], C: [7.6, 1.9], D: [4.6, 1.9] }, rights: ['A', 'B', 'C', 'D'], names: false, group: 'rect', tone: 'adj' }),
    caption({ id: 'rect-cap', at: [6.1, -0.6], tex: '\\text{Rectangle}', group: 'rect' }),
    polygon({ name: 'rh', corners: { A: [9.0, 0], B: [11.2, 0], C: [12.3, 1.905], D: [10.1, 1.905] }, ticks: { AB: 1, BC: 1, CD: 1, DA: 1 }, names: false, group: 'rhom', tone: 'good' }),
    caption({ id: 'rhom-cap', at: [10.65, -0.6], tex: '\\text{Rhombus}', group: 'rhom' }),
    polygon({ name: 'sq', corners: { A: [13.7, 0], B: [15.6, 0], C: [15.6, 1.9], D: [13.7, 1.9] }, ticks: { AB: 1, BC: 1, CD: 1, DA: 1 }, rights: ['A', 'B', 'C', 'D'], names: false, group: 'sq', tone: 'theta' }),
    caption({ id: 'sq-cap', at: [14.65, -0.6], tex: '\\text{Square}', group: 'sq' }),
  ]);

const others = () =>
  figure('oth', [
    polygon({ name: 'tr', corners: { A: [0, 0], B: [3.4, 0], C: [3.0, 1.9], D: [1.2, 1.9] }, arrows: { AB: 1, DC: 1 }, names: false, group: 'trap' }),
    caption({ id: 'trap-cap', at: [1.7, -0.75], tex: '\\text{Trapezoid}', group: 'trap' }),
    polygon({ name: 'it', corners: { A: [4.8, 0], B: [8.2, 0], C: [7.5, 1.9], D: [5.5, 1.9] }, arrows: { AB: 1, DC: 1 }, ticks: { BC: 2, DA: 2 }, names: false, group: 'iso', tone: 'adj' }),
    caption({ id: 'iso-cap', at: [6.5, -0.75], tex: '\\text{Isosceles trapezoid}', group: 'iso' }),
    polygon({ name: 'ki', corners: { K: [10.9, -0.35], L: [11.9, 1.45], M: [10.9, 2.25], N: [9.9, 1.45] }, ticks: { LM: 1, MN: 1, KL: 2, NK: 2 }, names: false, group: 'kite', tone: 'good' }),
    caption({ id: 'kite-cap', at: [10.9, -0.75], tex: '\\text{Kite}', group: 'kite' }),
  ]);

const video: Explainer = {
  id: 'm303-3-1-b',
  lessonId: 'm303-3-1',
  title: 'Properties of Triangles and Quadrilaterals, Part 2: The Quadrilateral Family',
  thumbnailTitle: 'The Quadrilateral Family',
  thumbnail: 'par',
  summary: 'Why the angles of every quadrilateral add to 360°, finding a missing angle, and the special quadrilaterals: parallelogram, rectangle, rhombus, square, trapezoid, isosceles trapezoid and kite, with tick marks for equal sides and arrowheads for parallel sides, and how to choose the most specific name. Part 3 covers the properties of parallelograms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 2', title: 'The Quadrilateral Family', subtitle: 'Four sides, many names' }],
      lines: [
        { say: 'A shape with four straight sides is called a quadrilateral. Door frames, floor tiles, tabletops and kites are all quadrilaterals, and some of them have special names.', show: 'title' },
        { say: 'In this video, you will find the angle sum of any quadrilateral, then meet the special quadrilaterals and learn what makes each one special.' },
      ],
    },
    {
      chapter: 'The angle sum',
      layout: 'split',
      left: [figure('q', [fan({ corners: Object.values(Q) }), polygon({ corners: Q, shade: 0 })])],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['2 \\times 180^\\circ = 360^\\circ'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Angles in a quadrilateral', md: 'The four interior angles of any quadrilateral add to $360^\\circ$.' },
      ],
      lines: [
        { say: 'Here is a quadrilateral, A B C D. Draw one diagonal: a line joining two opposite corners, A and C.', show: ['q.shape', 'q.names', 'q.diags'] },
        { say: 'The diagonal splits the quadrilateral into two triangles.', show: ['q.t1', 'q.t2'], focus: ['q.t1', 'q.t2'] },
        { say: 'The angles of each triangle add to 180 degrees. And together, the angles of the two triangles make up exactly the four angles of the quadrilateral.' },
        { say: 'So the angles of the quadrilateral add to two times 180, which is 360 degrees.', show: 'm', focus: 'm' },
        { say: 'That is true for every quadrilateral, whatever its shape: its four interior angles add to 360 degrees.', show: 'key' },
      ],
    },
    {
      chapter: 'A missing angle',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('mq', [
          polygon({ corners: Q, angles: [{ at: 'A', label: '85^\\circ', tone: 'adj' }, { at: 'B', label: '95^\\circ', tone: 'opp' }, { at: 'C', label: '110^\\circ', tone: 'good' }, { at: 'D', label: '?' }] }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle D = 360^\\circ - 85^\\circ - 95^\\circ - 110^\\circ', '\\angle D = 360^\\circ - 290^\\circ', '\\angle D = 70^\\circ'] }],
      lines: [
        { say: 'Three angles of a quadrilateral are 85, 95 and 110 degrees. Find the fourth angle, at D.', show: ['mq.shape', 'mq.names', 'mq.aA', 'mq.aB', 'mq.aC', 'mq.aD'] },
        { say: 'The four angles add to 360 degrees, so subtract the three you know from 360.', show: 'm.0', focus: 'm.0' },
        { say: '85 plus 95 plus 110 is 290. And 360 minus 290 is seventy. So angle D is seventy degrees.', show: ['m.1', 'm.2'], focus: ['m.2', 'mq.aD'] },
      ],
    },
    {
      chapter: 'Parallelograms',
      layout: 'center',
      main: [parallelograms()],
      lines: [
        { say: 'Some quadrilaterals have special names. On a diagram, matching arrowheads show sides that are parallel, and matching tick marks show sides that are equal.', show: 'par.pg' },
        { say: 'A parallelogram has both pairs of opposite sides parallel. The single arrowheads mark one parallel pair, and the double arrowheads mark the other pair.', focus: 'par.pg' },
        { say: 'A rectangle is a parallelogram with four right angles. The small square in each corner marks a right angle.', show: 'par.rect', focus: 'par.rect' },
        { say: 'A rhombus is a parallelogram with four equal sides. It looks like a square that has been pushed over.', show: 'par.rhom', focus: 'par.rhom' },
        { say: 'And a square is a rectangle that is also a rhombus. It has four right angles, and four equal sides.', show: 'par.sq', focus: 'par.sq' },
      ],
    },
    {
      chapter: 'Trapezoids and kites',
      layout: 'center',
      main: [others()],
      lines: [
        { say: 'Not every quadrilateral is a parallelogram. A trapezoid has exactly one pair of parallel sides, shown by the arrowheads.', show: 'oth.trap', focus: 'oth.trap' },
        { say: 'In an isosceles trapezoid, the two sides that are not parallel are equal. The tick marks show it. It is like an isosceles triangle with its top cut off.', show: 'oth.iso', focus: 'oth.iso' },
        { say: 'A kite has two pairs of equal sides, and each pair is next to each other, not opposite. The single ticks mark the short pair and the double ticks mark the long pair. A kite has no parallel sides.', show: 'oth.kite', focus: 'oth.kite' },
      ],
    },
    {
      chapter: 'How they fit together',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shape', 'Parallel sides', 'Equal sides', 'Right angles'],
          rows: [
            ['Parallelogram', '2 pairs', 'opposite sides', '—'],
            ['Rectangle', '2 pairs', 'opposite sides', '4'],
            ['Rhombus', '2 pairs', 'all 4', '—'],
            ['Square', '2 pairs', 'all 4', '4'],
            ['Trapezoid', '1 pair', '—', '—'],
            ['Kite', 'none', '2 pairs, next to each other', '—'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the special quadrilaterals side by side. The first four all have two pairs of parallel sides, so they are all parallelograms.', show: ['t.0', 't.1', 't.2', 't.3'], focus: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'A square has everything a rectangle has, four right angles, and everything a rhombus has, four equal sides. So a square is also a rectangle, a rhombus and a parallelogram.', focus: ['t.1', 't.2', 't.3'] },
        { say: 'A trapezoid has only one pair of parallel sides, and a kite has none, so neither of them is a parallelogram.', show: ['t.4', 't.5'], focus: ['t.4', 't.5'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A name that is too general, or too specific', md: 'A square is also a rectangle, a rhombus and a parallelogram. When a question asks for the **most specific** name, check every property given. Four equal sides with no right angles is a **rhombus**, not a square.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{4 equal sides, no right angles: } \\bad{\\text{square}} \\quad \\good{\\text{rhombus}}'] },
      ],
      lines: [
        { say: 'Because the shapes overlap, one shape can have several correct names. A square is also a rectangle, a rhombus and a parallelogram.', show: 'oops' },
        { say: 'When a question asks for the most specific name, check every property you are given. A shape with four equal sides but no right angles is a rhombus. It is not a square, because a square needs right angles.', show: 'm', focus: 'm' },
        { say: 'And calling it a parallelogram is true, but too general: it leaves out the four equal sides.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A quadrilateral has exactly one pair of parallel sides, and its two non-parallel sides are equal. What is its most specific name?',
          choices: ['Parallelogram', 'Kite', 'Trapezoid', 'Isosceles trapezoid'],
          answer: 3,
          working: 'Exactly one pair of parallel sides makes it a trapezoid, and equal non-parallel sides make it an **isosceles** trapezoid. A parallelogram needs two pairs of parallel sides.',
        },
      ],
      lines: [
        { say: 'Your turn. A quadrilateral has exactly one pair of parallel sides, and its two non-parallel sides are equal. What is its most specific name? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, an isosceles trapezoid. One pair of parallel sides makes it a trapezoid, and the equal non-parallel sides make it isosceles. Choice C, trapezoid, is true, but it is not the most specific name.', show: 'q.answer' },
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
            'The angles of any quadrilateral add to $360^\\circ$.',
            'Parallelogram, rectangle, rhombus and square: two pairs of parallel sides.',
            'Trapezoid: exactly one pair of parallel sides. Kite: two pairs of equal sides next to each other.',
            'Arrowheads mark parallel sides; tick marks mark equal sides.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. One diagonal splits a quadrilateral into two triangles, so its angles add to 360 degrees.', show: 'sum.0' },
        { say: 'A parallelogram, a rectangle, a rhombus and a square all have two pairs of parallel sides.', show: 'sum.1' },
        { say: 'A trapezoid has exactly one pair of parallel sides, and a kite has two pairs of equal sides next to each other.', show: 'sum.2' },
        { say: 'And on a diagram, arrowheads mark parallel sides, and tick marks mark equal sides. In the next part, we use the properties of parallelograms to find angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
