import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { arc } from '@/video/shapes.ts';
import { exteriors, polygon, regularCorners } from './lib/m303-3-figures.ts';

type P = [number, number];

/** A regular octagon (corners anticlockwise from the bottom left). */
const oct = regularCorners(8, { r: 2 });
const octCorners = Object.fromEntries(oct.map((p, i) => [`v${i}`, p]));
/** An irregular convex pentagon, anticlockwise. */
const pent: P[] = [[0, 0], [4.2, 0.3], [5.2, 2.9], [2.6, 4.6], [-0.6, 2.8]];
/** A regular hexagon, for the reflex-angle mistake, and the 240° all the way round its corner v1. */
const hex = regularCorners(6, { r: 2 });
const round = arc(hex[1], 0.42, 180, 420, 40);
const reflex: Part = {
  points: { ...Object.fromEntries(round.map((p, i) => [`rf${i}`, p])), 'rf-at': [hex[1][0] + 0.8 * Math.cos((300 * Math.PI) / 180), hex[1][1] + 0.8 * Math.sin((300 * Math.PI) / 180)] as P },
  items: [
    { kind: 'curve', id: 'out-arc', points: round.map((_, i) => `rf${i}`), tone: 'bad', dashed: true, weight: 3, group: 'out' },
    { kind: 'label', id: 'out-label', at: 'rf-at', tex: '240^\\circ', tone: 'bad', place: 'center', group: 'out' },
  ],
};

const video: Explainer = {
  id: 'm303-3-2-c',
  lessonId: 'm303-3-2',
  title: 'Angles in Regular Polygons, Part 3: Exterior Angles',
  thumbnailTitle: 'Exterior Angles',
  thumbnail: 'oc',
  summary: 'An exterior angle lies between one side and the extension of the next, and makes 180° with the interior angle. Walking round a convex polygon turns through every exterior angle and makes one full turn, so the exterior angles add to 360°, and each exterior angle of a regular polygon is 360° ÷ n: 45° and 135° for an octagonal sign. Part 4 works backwards to the number of sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 3', title: 'Exterior Angles', subtitle: 'One full turn' }],
      lines: [
        { say: 'There is a second set of angles in every polygon, on the outside. They are even easier to work with than the angles inside.', show: 'title' },
        { say: 'In this video, you will learn what an exterior angle is, why the exterior angles of a polygon always add to 360 degrees, and how they give the angles of a regular polygon.' },
      ],
    },
    {
      chapter: 'What an exterior angle is',
      layout: 'split',
      left: [figure('ex', [polygon({ corners: octCorners, names: false }), exteriors({ corners: oct, at: [1], label: 'e', interior: 'i', ext: 0.5, r: 56 })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exterior angle', md: 'Extend one side of a polygon past a corner. The angle between the extension and the next side is an **exterior angle**.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\thc{i} + \\opp{e} = 180^\\circ'] },
      ],
      lines: [
        { say: 'Take one side of a polygon, and extend it straight on, past a corner. Here it is dashed.', show: ['ex.shape', 'ex.xl1'], focus: 'ex.xl1' },
        { say: 'The angle between the extension and the next side is an exterior angle. It is marked in orange, and called e.', show: ['ex.x1', 'def'], focus: 'ex.e1' },
        { say: 'The interior angle at the same corner, i, is marked in yellow. Together, the two angles make a straight line.', show: 'ex.in1', focus: ['ex.in1', 'ex.e1'] },
        { say: 'So at every corner, the interior angle and the exterior angle add to 180 degrees.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Walking round a polygon',
      layout: 'split',
      left: [figure('wk', [polygon({ corners: Object.fromEntries(pent.map((p, i) => [`v${i}`, p])), names: false }), exteriors({ corners: pent, at: [0, 1, 2, 3, 4], ext: 0.32, r: 44 })])],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Exterior angles', md: 'The exterior angles of any convex polygon, one at each corner, add to $360^\\circ$. In a regular polygon, each exterior angle is $360^\\circ \\div n$.' },
      ],
      lines: [
        { say: 'Here is why exterior angles are so useful. Imagine walking all the way around this pentagon, along its sides.', show: 'wk.shape' },
        { say: 'At each corner, you turn to face along the next side. The amount you turn is exactly the exterior angle at that corner.', show: ['wk.x1', 'wk.x2'], focus: ['wk.e1', 'wk.e2'] },
        { say: 'Keep going round, turning at every corner.', show: ['wk.x3', 'wk.x4', 'wk.x0'], focus: ['wk.e3', 'wk.e4', 'wk.e0'] },
        { say: 'When you get back to where you started, you are facing the same way as at the beginning. So altogether, you have made exactly one full turn: 360 degrees.', focus: ['wk.e0', 'wk.e1', 'wk.e2', 'wk.e3', 'wk.e4'] },
        { say: 'That means the exterior angles of any convex polygon, one at each corner, add to 360 degrees. It does not matter how many sides it has.', show: 'key', focus: 'wk' },
        { say: 'In a regular polygon, all the exterior angles are equal, so each one is 360 degrees divided by n.' },
      ],
    },
    {
      chapter: 'An octagonal sign',
      layout: 'split',
      left: [figure('oc', [polygon({ corners: octCorners, names: false, ticks: { v0v1: 1, v1v2: 1, v2v3: 1, v3v4: 1, v4v5: 1, v5v6: 1, v6v7: 1, v7v0: 1 } }), exteriors({ corners: oct, at: [1], label: '45^\\circ', interior: '135^\\circ', ext: 0.5, r: 56, labelDist: 125 })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{exterior} = 360^\\circ \\div 8 = 45^\\circ', '\\text{interior} = 180^\\circ - 45^\\circ = 135^\\circ', '\\text{check: } \\dfrac{1080^\\circ}{8} = 135^\\circ \\;\\checkmark'] }],
      lines: [
        { say: 'An octagonal sign is a regular octagon. Find each exterior angle and each interior angle.', show: ['oc.shape', 'oc.ticks'] },
        { say: 'The eight exterior angles are equal and add to 360 degrees. So each exterior angle is 360 divided by eight, which is 45 degrees.', show: ['m.0', 'oc.x1'], focus: ['m.0', 'oc.e1'] },
        { say: 'At each corner, the interior and exterior angles add to 180 degrees. So each interior angle is 180 minus 45, which is 135 degrees.', show: ['m.1', 'oc.in1'], focus: ['m.1', 'oc.in1'] },
        { say: 'Check with the formula from the last part: the angles of an octagon add to 1,080 degrees, and 1,080 divided by eight is 135. The two methods agree.', show: 'm.2', focus: 'm.2' },
        { say: 'The exterior angle route is often quicker: one division, and one subtraction.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      left: [
        figure('mx', [
          polygon({ corners: Object.fromEntries(hex.map((p, i) => [`v${i}`, p])), names: false }),
          exteriors({ corners: hex, at: [1], label: '60^\\circ', interior: '120^\\circ', ext: 0.5, r: 60 }),
          reflex,
        ]),
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The angle all the way round', md: 'The exterior angle is between the **extended side** and the next side. It is not the angle all the way round the outside of the corner, $360^\\circ - 120^\\circ = 240^\\circ$.' }],
      lines: [
        { say: 'Be careful which angle you call exterior. At a corner of a regular hexagon, the interior angle is 120 degrees.', show: ['mx.shape', 'mx.in1'], focus: 'mx.in1' },
        { say: 'The angle all the way round the outside of that corner is 360 minus 120, which is 240 degrees. That is not the exterior angle.', show: ['oops', 'mx.out'], focus: 'mx.out' },
        { say: 'The exterior angle is between the extended side and the next side: 180 minus 120, which is sixty degrees. And six exterior angles of sixty degrees make 360, as they should.', show: 'mx.x1', focus: 'mx.e1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is each exterior angle of a regular polygon with 12 sides?',
          choices: ['$30^\\circ$', '$150^\\circ$', '$1800^\\circ$', '$15^\\circ$'],
          answer: 0,
          working: 'The exterior angles add to $360^\\circ$, so each one is $360^\\circ \\div 12 = 30^\\circ$. (Each interior angle is $180^\\circ - 30^\\circ = 150^\\circ$.)',
        },
      ],
      lines: [
        { say: 'Your turn. What is each exterior angle of a regular polygon with twelve sides? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 30 degrees. The twelve exterior angles add to 360, and 360 divided by twelve is 30. Choice B, 150 degrees, is the interior angle: 180 minus 30.', show: 'q.answer' },
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
            'An exterior angle is between one side and the extension of the next.',
            'Interior angle $+$ exterior angle $= 180^\\circ$.',
            'The exterior angles of a convex polygon add to $360^\\circ$; each one of a regular polygon is $360^\\circ \\div n$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An exterior angle is between one side of a polygon and the extension of the next side.', show: 'sum.0' },
        { say: 'At every corner, the interior angle and the exterior angle add to 180 degrees.', show: 'sum.1' },
        { say: 'And the exterior angles of any convex polygon add to 360 degrees, so each exterior angle of a regular polygon is 360 divided by n. In the next part, we work backwards from an angle to the number of sides. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
