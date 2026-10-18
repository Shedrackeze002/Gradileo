import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { polygon, segment } from './lib/m303-3-figures.ts';

type P = [number, number];

/** Any triangle, and a line through its top corner parallel to its base, with the angles there. */
const A: P = [0, 0];
const B: P = [7, 0];
const C: P = [2.2, 3.6];
const L: P = [-1.2, 3.6];
const R: P = [7.4, 3.6];
const sum: Part = {
  points: { L, R },
  items: [
    { kind: 'angle', id: 'ca', at: 'C', from: 'L', to: 'A', tone: 'adj', label: 'a' },
    { kind: 'angle', id: 'cb', at: 'C', from: 'R', to: 'B', tone: 'opp', label: 'b' },
  ] satisfies DiagramItem[],
};

/** The gable truss: equal rafters LT and RT, base angles of 35° and 110° at the peak. */
const truss = (labels: [string, string, string]) =>
  polygon({
    corners: { L: [0, 0], R: [12, 0], T: [6, 6 * Math.tan((35 * Math.PI) / 180)] },
    ticks: { RT: 1, TL: 1 },
    angles: [
      { at: 'L', label: labels[0], tone: 'adj' },
      { at: 'R', label: labels[1], tone: 'adj' },
      { at: 'T', label: labels[2] },
    ],
  });

const video: Explainer = {
  id: 'm303-3-1',
  lessonId: 'm303-3-1',
  title: 'Properties of Triangles and Quadrilaterals, Part 1: Angles in Triangles',
  thumbnailTitle: 'Angles in Triangles',
  thumbnail: 'tr',
  summary: 'Why the angles of every triangle add to 180°, finding a missing angle, the equal base angles of an isosceles triangle and the 60° angles of an equilateral triangle, and a gable roof truss with a 110° peak whose rafters meet the bottom chord at 35°. Part 2 introduces the family of quadrilaterals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 1', title: 'Angles in Triangles', subtitle: 'The angle sum and isosceles triangles' }],
      lines: [
        { say: 'Carpenters, welders and tile setters rely on a few dependable facts about shapes. Knowing them lets you find a missing angle, or check a frame, without measuring everything.', show: 'title' },
        { say: 'In this video, you will see why the angles of every triangle add to 180 degrees, and use the equal angles of an isosceles triangle to solve a roof problem.' },
      ],
    },
    {
      chapter: 'The angle sum',
      layout: 'split',
      left: [
        figure('sum', [
          polygon({ corners: { A, B, C }, arrows: { AB: 1 }, angles: [{ at: 'A', label: 'a', tone: 'adj' }, { at: 'B', label: 'b', tone: 'opp' }, { at: 'C', label: 'c' }] }),
          segment({ id: 'par', from: L, to: R, arrows: 1, size: 7, at: 0.86 }),
          sum,
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\adj{a} + c + \\opp{b} = 180^\\circ'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Angles in a triangle', md: 'The three interior angles of **any** triangle add to $180^\\circ$. If you know two of them, subtract both from $180^\\circ$ to get the third.' },
      ],
      lines: [
        { say: 'Draw any triangle, and mark its three interior angles: the angles inside its corners. Call them "a", b and c.', show: ['sum.shape', 'sum.names', 'sum.aA', 'sum.aB', 'sum.aC'] },
        { say: 'Now draw a line through the top corner, C, parallel to the bottom side. The matching arrowheads show that the two lines are parallel.', show: ['sum.par', 'sum.arrows'], focus: 'sum.par' },
        { say: 'Angle "a", at the bottom left, has a twin at the top. The two make a Z shape between the parallel lines. They are called alternate angles, and they are equal.', show: 'sum.ca', focus: ['sum.aA', 'sum.ca'] },
        { say: 'In the same way, angle b, at the bottom right, has an equal twin at the top.', show: 'sum.cb', focus: ['sum.aB', 'sum.cb'] },
        { say: 'Look at the top corner. Angles "a", c and b sit side by side along a straight line, and a straight line makes 180 degrees. So "a" plus c plus b is 180 degrees.', show: 'm', focus: ['sum.ca', 'sum.aC', 'sum.cb', 'm'] },
        { say: 'That works for any triangle, whatever its shape. The three interior angles of every triangle add to 180 degrees. So if you know two angles, subtract both from 180 to get the third.', show: 'key', focus: 'sum' },
      ],
    },
    {
      chapter: 'Finding the third angle',
      layout: 'split',
      left: [
        figure('brace', [
          polygon({ corners: { P: [0, 0], Q: [6, 0], R: [4.624, 5.135] }, angles: [{ at: 'P', label: '48^\\circ', tone: 'adj' }, { at: 'Q', label: '75^\\circ', tone: 'opp' }, { at: 'R', label: '?' }] }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle R = 180^\\circ - 48^\\circ - 75^\\circ', '\\angle R = 57^\\circ', '\\text{Check: } 48 + 75 + 57 = 180 \\;\\checkmark'] }],
      lines: [
        { say: 'A triangular brace has angles of 48 degrees and 75 degrees. Find the third angle, at R.', show: ['brace.shape', 'brace.names', 'brace.aP', 'brace.aQ', 'brace.aR'] },
        { say: 'The three angles add to 180 degrees, so subtract the two you know from 180.', show: 'm.0', focus: 'm.0' },
        { say: '180 minus 48 is 132, and 132 minus 75 is 57. So angle R is 57 degrees.', show: 'm.1', focus: ['m.1', 'brace.aR'] },
        { say: 'Check by adding all three: 48 plus 75 plus 57 is 180. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Isosceles triangles',
      layout: 'split',
      left: [figure('iso', [polygon({ corners: { A: [0, 0], B: [4, 0], C: [2, 4.6] }, ticks: { BC: 1, CA: 1 }, angles: [{ at: 'A', tone: 'adj', label: '\\text{equal}', id: 'base1', labelDist: 120 }, { at: 'B', tone: 'adj', label: '\\text{equal}', id: 'base2', labelDist: 120 }], names: false })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Isosceles triangle', md: 'An **isosceles triangle** has two equal sides. The angles opposite the equal sides, the **base angles**, are also equal.' }],
      lines: [
        { say: 'Some triangles have equal sides, and equal sides bring equal angles.', show: 'iso.shape' },
        { say: 'An isosceles triangle has two equal sides. On a diagram, matching tick marks show which sides are equal.', show: ['def', 'iso.ticks'], focus: 'iso.ticks' },
        { say: 'The two angles opposite the equal sides are called the base angles, and they are always equal too. Here they are both marked in blue.', show: ['iso.base1', 'iso.base2'], focus: ['iso.base1', 'iso.base2'] },
        { say: 'So in an isosceles triangle, if you know one base angle, you know the other one as well.' },
      ],
    },
    {
      chapter: 'Equilateral triangles',
      layout: 'split',
      left: [figure('eq', [polygon({ corners: { A: [0, 0], B: [4, 0], C: [2, 2 * Math.sqrt(3)] }, ticks: { AB: 2, BC: 2, CA: 2 }, angles: [{ at: 'A', label: '60^\\circ' }, { at: 'B', label: '60^\\circ' }, { at: 'C', label: '60^\\circ' }], names: false, tone: 'good' })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Equilateral triangle', md: 'An **equilateral triangle** has three equal sides and three equal angles of $60^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['180^\\circ \\div 3 = 60^\\circ'] },
      ],
      lines: [
        { say: 'An equilateral triangle has all three sides equal. The double tick marks on every side show that.', show: ['def', 'eq.shape', 'eq.ticks'], focus: 'eq.ticks' },
        { say: 'With all three sides equal, all three angles are equal too. They share 180 degrees equally, and 180 divided by three is sixty.', show: 'm', focus: 'm' },
        { say: 'So every angle of an equilateral triangle is sixty degrees, however big or small the triangle is.', show: ['eq.aA', 'eq.aB', 'eq.aC'], focus: ['eq.aA', 'eq.aB', 'eq.aC'] },
      ],
    },
    {
      chapter: 'A gable roof truss',
      layout: 'split',
      left: [figure('tr', [truss(['x', 'x', '110^\\circ'])])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x + x + 110^\\circ = 180^\\circ', '2x = 70^\\circ', 'x = 35^\\circ', '\\text{Check: } 35 + 35 + 110 = 180 \\;\\checkmark'] }],
      lines: [
        { say: 'A gable roof truss is a triangle of timber. Its two sloping rafters are equal, so it is an isosceles triangle. The angle at the peak is 110 degrees.', show: ['tr.shape', 'tr.ticks', 'tr.aT', 'tr.names'], focus: ['tr.ticks', 'tr.aT'] },
        { say: 'What angle does each rafter make with the bottom chord, the beam along the bottom?' },
        { say: 'The base angles, at L and R, are opposite the equal rafters, so they are equal. Call each one x.', show: ['tr.aL', 'tr.aR'], focus: ['tr.aL', 'tr.aR'] },
        { say: 'The three angles add to 180 degrees: x plus x plus 110 equals 180.', show: 'm.0', focus: 'm.0' },
        { say: 'x plus x is two x. Subtract 110 from both sides: two x equals seventy degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by two: x equals 35 degrees. Each rafter meets the bottom chord at 35 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: 35 plus 35 plus 110 is 180.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which angles are equal?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the wrong pair of angles', md: 'In an isosceles triangle, the equal angles are the two **opposite the equal sides**, not the angle between the equal sides. If the angle between the equal sides is $40^\\circ$, the other two are not $40^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{40^\\circ + 40^\\circ + x = 180^\\circ}', '\\good{40^\\circ + 2x = 180^\\circ \\;\\Rightarrow\\; x = 70^\\circ}'] },
      ],
      lines: [
        { say: 'Be careful to use the right pair of angles. The equal angles are the two opposite the equal sides, not the angle between the equal sides.', show: 'oops' },
        { say: 'Suppose the angle between the two equal sides is forty degrees. It is tempting to say a second angle is forty degrees too. But the forty-degree angle is the odd one out.', show: 'm.0', focus: 'm.0' },
        { say: 'The other two angles are the equal pair. So forty plus two x equals 180. Two x is 140, and x is seventy degrees. The triangle’s angles are forty, seventy and seventy.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An isosceles triangle has two base angles of $52^\\circ$. What is the angle between its two equal sides?',
          choices: ['$128^\\circ$', '$76^\\circ$', '$64^\\circ$', '$38^\\circ$'],
          answer: 1,
          working: 'The base angles together make $52^\\circ + 52^\\circ = 104^\\circ$, so the third angle is $180^\\circ - 104^\\circ = 76^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. An isosceles triangle has two base angles of 52 degrees. What is the angle between its two equal sides? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 76 degrees. The two base angles together make 104 degrees, and 180 minus 104 is 76. Choice A, 128 degrees, subtracts only one of the two base angles from 180.', show: 'q.answer' },
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
            'The angles of any triangle add to $180^\\circ$: subtract the two you know to find the third.',
            'An isosceles triangle has two equal sides, and the base angles opposite them are equal.',
            'An equilateral triangle has three equal sides and three $60^\\circ$ angles.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The three angles of any triangle add to 180 degrees, so subtract the two you know to find the third.', show: 'sum.0' },
        { say: 'An isosceles triangle has two equal sides, and the base angles opposite them are equal.', show: 'sum.1' },
        { say: 'And an equilateral triangle has three equal sides and three sixty-degree angles. In the next part, we meet the family of four-sided shapes: the quadrilaterals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
