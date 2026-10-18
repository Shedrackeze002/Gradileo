import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, polygon, tickMarks } from './lib/m303-3-figures.ts';

type P = [number, number];

/** Parallelogram ABCD with angle A = 64° and sides 5 and 3.4. */
const A: P = [0, 0];
const B: P = [5, 0];
const C: P = [6.49, 3.056];
const D: P = [1.49, 3.056];
const E: P = [3.245, 1.528];
const corners = { A, B, C, D };

const video: Explainer = {
  id: 'm303-3-1-c',
  lessonId: 'm303-3-1',
  title: 'Properties of Triangles and Quadrilaterals, Part 3: Parallelograms',
  thumbnailTitle: 'Parallelogram Properties',
  thumbnail: 'sa',
  summary: 'The properties of every parallelogram: opposite sides and opposite angles are equal, consecutive angles add to 180° (co-interior angles), and the diagonals bisect each other. A parallelogram with a 64° angle has angles of 64°, 116°, 64° and 116°. Part 4 covers the diagonals of rectangles and rhombuses.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 3', title: 'Parallelogram Properties', subtitle: 'One angle gives all four' }],
      lines: [
        { say: 'Once you know a shape is a parallelogram, you know a lot about it without measuring. Its sides, its angles and its diagonals all follow simple rules.', show: 'title' },
        { say: 'In this video, you will learn the properties of every parallelogram, and use them to find all four angles from just one.' },
      ],
    },
    {
      chapter: 'Sides and angles',
      layout: 'split',
      left: [
        figure('sa', [
          polygon({
            corners,
            ticks: { AB: 1, CD: 1, BC: 2, DA: 2 },
            arrows: { AB: 1, DC: 1, AD: 2, BC: 2 },
            angles: [{ at: 'A', tone: 'adj' }, { at: 'C', tone: 'adj' }, { at: 'B', tone: 'opp' }, { at: 'D', tone: 'opp' }],
          }),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['Opposite sides are equal.', 'Opposite angles are equal.'] }],
      lines: [
        { say: 'Here is a parallelogram, A B C D. The arrowheads show that both pairs of opposite sides are parallel.', show: ['sa.shape', 'sa.names', 'sa.arrows'] },
        { say: 'In every parallelogram, the opposite sides are equal. A B equals D C, shown with single ticks, and A D equals B C, shown with double ticks.', show: ['sa.ticks', 'b.0'], focus: 'sa.ticks' },
        { say: 'The opposite angles are equal too. Angle A equals angle C, both marked in blue, and angle B equals angle D, both marked in orange.', show: ['sa.aA', 'sa.aC', 'sa.aB', 'sa.aD', 'b.1'], focus: ['sa.aA', 'sa.aC', 'sa.aB', 'sa.aD'] },
      ],
    },
    {
      chapter: 'Consecutive angles',
      layout: 'split',
      left: [
        figure('co', [
          polygon({ corners, arrows: { AB: 1, DC: 1 }, angles: [{ at: 'A', tone: 'adj', label: 'a' }, { at: 'D', tone: 'opp', label: 'd' }] }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'lg', align: 'left', lines: ['\\adj{a} + \\opp{d} = 180^\\circ'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Consecutive angles', md: 'Angles next to each other in a parallelogram are **consecutive** angles. They add to $180^\\circ$.' },
      ],
      lines: [
        { say: 'Angles next to each other, like angle A and angle D, are called consecutive angles. In a parallelogram, consecutive angles add to 180 degrees.', show: ['co.shape', 'co.names', 'co.aA', 'co.aD', 'key'] },
        { say: 'Here is why. Side A D crosses the two parallel sides, A B and D C.', show: 'co.arrows', focus: ['co.DA', 'co.arrows'] },
        { say: 'Angles A and D are both between the parallel lines, on the same side of A D. Angles in that position are called co-interior angles, and they always add to 180 degrees.', show: 'm', focus: ['co.aA', 'co.aD', 'm'] },
        { say: 'You can see it in the shape: if the parallelogram leans over further, angle A gets smaller and angle D gets bigger by the same amount. The same is true all the way round: every pair of angles next to each other adds to 180 degrees.' },
      ],
    },
    {
      chapter: 'One angle gives all four',
      layout: 'split',
      left: [
        figure('all', [
          polygon({
            corners,
            arrows: { AB: 1, DC: 1, AD: 2, BC: 2 },
            angles: [
              { at: 'A', label: '64^\\circ', tone: 'adj' },
              { at: 'B', label: '?', tone: 'opp', id: 'qB' },
              { at: 'C', label: '?', tone: 'adj', id: 'qC' },
              { at: 'D', label: '?', tone: 'opp', id: 'qD' },
              { at: 'B', label: '116^\\circ', tone: 'opp', id: 'vB' },
              { at: 'C', label: '64^\\circ', tone: 'adj', id: 'vC' },
              { at: 'D', label: '116^\\circ', tone: 'opp', id: 'vD' },
            ],
          }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\angle B = 180^\\circ - 64^\\circ = 116^\\circ', '\\angle C = \\angle A = 64^\\circ', '\\angle D = \\angle B = 116^\\circ', '64 + 116 + 64 + 116 = 360 \\;\\checkmark'],
        },
      ],
      lines: [
        { say: 'A B C D is a parallelogram, and angle A is 64 degrees. Find the other three angles.', show: ['all.shape', 'all.names', 'all.arrows', 'all.aA', 'all.qB', 'all.qC', 'all.qD'], focus: 'all.aA' },
        { say: 'Angle B is next to angle A, so the two add to 180 degrees. Angle B is 180 minus 64, which is 116 degrees.', show: ['m.0', 'all.vB'], hide: 'all.qB', focus: ['m.0', 'all.vB'] },
        { say: 'Angle C is opposite angle A, so it is equal to it: 64 degrees.', show: ['m.1', 'all.vC'], hide: 'all.qC', focus: ['m.1', 'all.vC'] },
        { say: 'And angle D is opposite angle B: 116 degrees.', show: ['m.2', 'all.vD'], hide: 'all.qD', focus: ['m.2', 'all.vD'] },
        { say: 'Check that the four angles add to 360 degrees: 64 plus 116, plus 64 plus 116, is 360. They do.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The diagonals',
      layout: 'split',
      left: [
        figure('dg', [
          polygon({ corners, diagonals: [{ from: 'A', to: 'C' }, { from: 'B', to: 'D' }] }),
          dot({ id: 'E', at: E, tex: 'E', place: 'below' }),
          tickMarks({ id: 'h1', from: A, to: E, count: 1, size: 6.5 }),
          tickMarks({ id: 'h2', from: E, to: C, count: 1, size: 6.5 }),
          tickMarks({ id: 'h3', from: B, to: E, count: 2, size: 6.5 }),
          tickMarks({ id: 'h4', from: E, to: D, count: 2, size: 6.5 }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bisect', md: 'To **bisect** something is to cut it into two equal parts. The diagonals of a parallelogram **bisect each other**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AE = EC', 'BE = ED'] },
      ],
      lines: [
        { say: 'Now draw the two diagonals, A C and B D. They cross at a point, E.', show: ['dg.shape', 'dg.names', 'dg.diags', 'dg.E'], focus: 'dg.diags' },
        { say: 'To bisect something means to cut it into two equal parts. In every parallelogram, the diagonals bisect each other.', show: 'def' },
        { say: 'So E is the middle of both diagonals. A E equals E C, with single ticks, and B E equals E D, with double ticks.', show: ['dg.h1', 'dg.h2', 'dg.h3', 'dg.h4', 'm'], focus: ['dg.h1', 'dg.h2', 'dg.h3', 'dg.h4', 'm'] },
        { say: 'Notice that the two diagonals are not the same length: A C is much longer than B D. Each one is cut in half, but they are not equal to each other.', focus: ['dg.dAC', 'dg.dBD'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Opposite or next to?', md: '**Opposite** angles of a parallelogram are **equal**. Angles **next to each other** add to $180^\\circ$. With $\\angle A = 64^\\circ$, the angle next to it is $116^\\circ$, not $64^\\circ$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle B = \\bad{64^\\circ} \\quad \\angle B = \\good{180^\\circ - 64^\\circ = 116^\\circ}'] },
      ],
      lines: [
        { say: 'Take care to tell opposite angles from angles next to each other. Opposite angles are equal, but angles next to each other add to 180 degrees.', show: 'oops' },
        { say: 'If angle A is 64 degrees, angle B, next to it, is not 64 degrees. It is 180 minus 64, which is 116. A quick look at the shape helps: one angle is sharp and the next is wide.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$PQRS$ is a parallelogram with $\\angle P = 107^\\circ$. What is $\\angle Q$?',
          choices: ['$73^\\circ$', '$107^\\circ$', '$253^\\circ$', '$83^\\circ$'],
          answer: 0,
          working: '$\\angle Q$ is next to $\\angle P$, so they add to $180^\\circ$: $\\angle Q = 180^\\circ - 107^\\circ = 73^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. P Q R S is a parallelogram, and angle P is 107 degrees. What is angle Q? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, 73 degrees. Angle Q is next to angle P, so the two add to 180 degrees, and 180 minus 107 is 73. Choice B, 107 degrees, is angle R, the angle opposite P.', show: 'q.answer' },
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
            'In a parallelogram, opposite sides are equal and opposite angles are equal.',
            'Consecutive angles (next to each other) add to $180^\\circ$.',
            'The diagonals bisect each other: they cut each other in half.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. In every parallelogram, the opposite sides are equal, and the opposite angles are equal.', show: 'sum.0' },
        { say: 'Angles next to each other, the consecutive angles, add to 180 degrees.', show: 'sum.1' },
        { say: 'And the diagonals bisect each other: they cut each other in half. In the next part, we look at the special diagonals of rectangles and rhombuses. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
