import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { polygon, segment } from './lib/m303-3-figures.ts';

type P = [number, number];

/** Trapezoid ABCD with AB ∥ DC, angle A = 68° and angle B = 57°. */
const trap: Record<string, P> = { A: [0, 0], B: [6, 0], C: [4.312, 2.6], D: [1.05, 2.6] };
/** An isosceles trapezoid with base angles of 70°. */
const iso: Record<string, P> = { A: [0, 0], B: [6, 0], C: [5.054, 2.6], D: [0.946, 2.6] };
/** Kite KLMN with KL = KN, ML = MN, angle K = 70° and angle M = 124°. */
const kite: Record<string, P> = { K: [0, 0], L: [2, 2.856], M: [0, 3.92], N: [-2, 2.856] };

const video: Explainer = {
  id: 'm303-3-1-e',
  lessonId: 'm303-3-1',
  title: 'Properties of Triangles and Quadrilaterals, Part 5: Trapezoids and Kites',
  thumbnailTitle: 'Trapezoids and Kites',
  thumbnail: 'kt',
  summary: 'Angles in trapezoids and kites: the angles along each slanted side of a trapezoid are co-interior and add to 180° (a panel with 68° and 57° has 112° and 123°), an isosceles trapezoid has equal angles on each parallel side, and a kite’s angles between its unequal sides are equal (70° and 124° leave 83° each).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 5', title: 'Trapezoids and Kites', subtitle: 'Finding their missing angles' }],
      lines: [
        { say: 'Trapezoids and kites are not parallelograms, but their angles still follow rules. Panels, tiles and window frames come in these shapes.', show: 'title' },
        { say: 'In this video, you will find the missing angles of trapezoids, isosceles trapezoids and kites.' },
      ],
    },
    {
      chapter: 'Trapezoids',
      layout: 'split',
      left: [figure('tz', [polygon({ corners: trap, arrows: { AB: 1, DC: 1 }, angles: [{ at: 'A', label: 'a', tone: 'adj' }, { at: 'D', label: 'd', tone: 'adj' }, { at: 'B', label: 'b', tone: 'opp' }, { at: 'C', label: 'c', tone: 'opp' }] })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{a + d = 180^\\circ}', '\\opp{b + c = 180^\\circ}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Angles in a trapezoid', md: 'The two angles along each slanted side lie between the parallel sides. They are **co-interior** angles, so they add to $180^\\circ$.' },
      ],
      lines: [
        { say: 'Here is a trapezoid, A B C D. The arrowheads show that A B is parallel to D C.', show: ['tz.shape', 'tz.names', 'tz.arrows'] },
        { say: 'Look at the slanted side A D. It crosses both parallel sides, so angles A and D are co-interior angles, like the consecutive angles of a parallelogram. They add to 180 degrees.', show: ['tz.aA', 'tz.aD', 'm.0'], focus: ['tz.aA', 'tz.aD', 'm.0', 'tz.DA'] },
        { say: 'The same is true along the other slanted side, B C: angles B and C add to 180 degrees.', show: ['tz.aB', 'tz.aC', 'm.1'], focus: ['tz.aB', 'tz.aC', 'm.1', 'tz.BC'] },
        { say: 'So in any trapezoid, the two angles along each slanted side add to 180 degrees.', show: 'key', focus: 'tz' },
      ],
    },
    {
      chapter: 'A trapezoid-shaped panel',
      layout: 'split',
      left: [
        figure('pn', [
          polygon({
            corners: trap,
            arrows: { AB: 1, DC: 1 },
            angles: [
              { at: 'A', label: '68^\\circ', tone: 'adj' },
              { at: 'B', label: '57^\\circ', tone: 'opp' },
              { at: 'D', label: '?', tone: 'adj', id: 'qD' },
              { at: 'C', label: '?', tone: 'opp', id: 'qC' },
              { at: 'D', label: '112^\\circ', tone: 'adj', id: 'vD' },
              { at: 'C', label: '123^\\circ', tone: 'opp', id: 'vC' },
            ],
          }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle D = 180^\\circ - 68^\\circ = 112^\\circ', '\\angle C = 180^\\circ - 57^\\circ = 123^\\circ', '68 + 57 + 123 + 112 = 360 \\;\\checkmark'] }],
      lines: [
        { say: 'A panel is shaped like trapezoid A B C D, with A B parallel to D C. Angle A is 68 degrees and angle B is 57 degrees. Find angles D and C.', show: ['pn.shape', 'pn.names', 'pn.arrows', 'pn.aA', 'pn.aB', 'pn.qD', 'pn.qC'] },
        { say: 'Angles A and D are co-interior, so angle D is 180 minus 68, which is 112 degrees.', show: ['m.0', 'pn.vD'], hide: 'pn.qD', focus: ['m.0', 'pn.vD'] },
        { say: 'Angles B and C are co-interior too, so angle C is 180 minus 57, which is 123 degrees.', show: ['m.1', 'pn.vC'], hide: 'pn.qC', focus: ['m.1', 'pn.vC'] },
        { say: 'Check that all four angles add to 360: 68 plus 57 plus 123 plus 112 is 360.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Isosceles trapezoids',
      layout: 'split',
      left: [
        figure('it', [
          polygon({
            corners: iso,
            arrows: { AB: 1, DC: 1 },
            ticks: { BC: 2, DA: 2 },
            angles: [
              { at: 'A', label: '70^\\circ', tone: 'adj' },
              { at: 'B', label: '70^\\circ', tone: 'adj' },
              { at: 'C', label: '110^\\circ', tone: 'opp' },
              { at: 'D', label: '110^\\circ', tone: 'opp' },
            ],
          }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Isosceles trapezoid', md: 'The two non-parallel sides are equal, and the two angles on each parallel side are equal.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle B = \\angle A = 70^\\circ', '\\angle D = 180^\\circ - 70^\\circ = 110^\\circ', '\\angle C = \\angle D = 110^\\circ'] },
      ],
      lines: [
        { say: 'In an isosceles trapezoid, the two non-parallel sides are equal, so the shape is the same on the left as on the right.', show: ['it.shape', 'it.names', 'it.arrows', 'it.ticks', 'key'], focus: 'it.ticks' },
        { say: 'That makes the two angles on each parallel side equal. Angles A and B, on the bottom, are equal, and angles C and D, on the top, are equal.' },
        { say: 'So one angle gives you all four. If angle A is seventy degrees, angle B is seventy degrees too.', show: ['it.aA', 'it.aB', 'm.0'], focus: ['it.aA', 'it.aB', 'm.0'] },
        { say: 'Angle D is co-interior with angle A, so it is 180 minus seventy, which is 110 degrees. And angle C equals angle D: 110 degrees.', show: ['it.aD', 'it.aC', 'm.1', 'm.2'], focus: ['it.aD', 'it.aC', 'm.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Kites',
      layout: 'split',
      left: [
        figure('kt', [
          polygon({ corners: kite, ticks: { KL: 2, NK: 2, LM: 1, MN: 1 }, angles: [{ at: 'L', tone: 'opp', label: '\\text{equal}', labelDist: 125 }, { at: 'N', tone: 'opp', label: '\\text{equal}', labelDist: 125 }] }),
          segment({ id: 'axis', from: [0, 0], to: [0, 3.92], tone: 'muted', dashed: true, size: 4 }),
        ]),
      ],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Angles in a kite', md: 'In a kite, the two angles **between the unequal sides** are equal. Here $\\angle L = \\angle N$.' }],
      lines: [
        { say: 'Here is a kite, K L M N. The two long sides, K L and K N, are equal, and the two short sides, M L and M N, are equal.', show: ['kt.shape', 'kt.names', 'kt.ticks'], focus: 'kt.ticks' },
        { say: 'The kite is the same on both sides of the dashed line through K and M. If you folded it along that line, L would land exactly on N.', show: 'kt.axis', focus: 'kt.axis' },
        { say: 'So the angles at L and N are equal. They are the angles where a long side meets a short side: the angles between the unequal sides.', show: ['kt.aL', 'kt.aN', 'key'], focus: ['kt.aL', 'kt.aN'] },
        { say: 'The angles at K and M are usually different from each other, and different from the angles at L and N.' },
      ],
    },
    {
      chapter: 'A kite-shaped tile',
      layout: 'split',
      left: [
        figure('tl', [
          polygon({
            corners: kite,
            ticks: { KL: 2, NK: 2, LM: 1, MN: 1 },
            angles: [
              { at: 'K', label: '70^\\circ', tone: 'adj' },
              { at: 'M', label: '124^\\circ', tone: 'good' },
              { at: 'L', label: '?', tone: 'opp', id: 'qL', labelDist: 100 },
              { at: 'N', label: '?', tone: 'opp', id: 'qN', labelDist: 100 },
              { at: 'L', label: '83^\\circ', tone: 'opp', id: 'vL', labelDist: 100 },
              { at: 'N', label: '83^\\circ', tone: 'opp', id: 'vN', labelDist: 100 },
            ],
          }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle L = \\angle N', '2\\angle L = 360^\\circ - 70^\\circ - 124^\\circ', '2\\angle L = 166^\\circ', '\\angle L = 83^\\circ'] }],
      lines: [
        { say: 'A tile is shaped like kite K L M N, with K L equal to K N, and M L equal to M N. Angle K is seventy degrees and angle M is 124 degrees. Find angle L.', show: ['tl.shape', 'tl.names', 'tl.ticks', 'tl.aK', 'tl.aM', 'tl.qL', 'tl.qN'] },
        { say: 'Angles L and N are between the unequal sides, so they are equal.', show: 'm.0', focus: ['m.0', 'tl.qL', 'tl.qN'] },
        { say: 'The four angles add to 360 degrees. Take away the seventy and the 124, and what is left is shared by angles L and N.', show: 'm.1', focus: 'm.1' },
        { say: '360 minus seventy minus 124 is 166 degrees. That is two equal angles, so angle L is 166 divided by two, which is 83 degrees. Angle N is 83 degrees too.', show: ['m.2', 'm.3', 'tl.vL', 'tl.vN'], hide: ['tl.qL', 'tl.qN'], focus: ['m.3', 'tl.vL', 'tl.vN'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the wrong pair of angles', md: 'The equal angles of a kite are the two where a **long side meets a short side**, not the angles at the ends of the line of symmetry. In kite $KLMN$, $\\angle L = \\angle N$, but $\\angle K$ and $\\angle M$ are not equal.' },
      ],
      lines: [
        { say: 'Be careful to pick the right pair. In a kite, the equal angles are the two where a long side meets a short side.', show: 'oops' },
        { say: 'The angles at the ends of the line of symmetry, K and M, are the odd ones out. One is between the two long sides and the other is between the two short sides, so they are usually different.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In kite $KLMN$, $KL = KN$ and $ML = MN$. If $\\angle K = 90^\\circ$ and $\\angle M = 56^\\circ$, what is $\\angle L$?',
          choices: ['$214^\\circ$', '$56^\\circ$', '$124^\\circ$', '$107^\\circ$'],
          answer: 3,
          working: '$\\angle L = \\angle N$, so $2\\angle L = 360^\\circ - 90^\\circ - 56^\\circ = 214^\\circ$ and $\\angle L = 107^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In kite K L M N, K L equals K N, and M L equals M N. If angle K is ninety degrees and angle M is 56 degrees, what is angle L? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 107 degrees. Angles L and N are equal, and they share 360 minus 90 minus 56, which is 214 degrees. Half of 214 is 107. Choice A, 214 degrees, is both equal angles together, not one of them.', show: 'q.answer' },
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
            'Trapezoid: the angles along each slanted side add to $180^\\circ$.',
            'Isosceles trapezoid: the two angles on each parallel side are equal.',
            'Kite: the two angles between the unequal sides are equal.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In a trapezoid, the two angles along each slanted side are co-interior, so they add to 180 degrees.', show: 'sum.0' },
        { say: 'In an isosceles trapezoid, the two angles on each parallel side are also equal.', show: 'sum.1' },
        { say: 'And in a kite, the two angles between the unequal sides are equal. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
