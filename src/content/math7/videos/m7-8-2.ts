import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sideTicks } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { bench, pt, tree } from './lib/m7-8-figures.ts';

// Two trees 8 m apart, seen from above, and a bench on the perpendicular bisector of the segment
// joining them: the same distance from each tree.
const park = (id: string) =>
  figure(
    id,
    [
      join(
        tree('t1', [-4, 0]),
        tree('t2', [4, 0]),
        seg('ab', [-4, 0], [4, 0], { tone: 'muted', dashed: true, weight: 2.5 }),
        seg('line', [0, -3.4], [0, 3.6], { tone: 'opp', weight: 4 }),
        mark('sq', [0, 0], [1, 0], [0, 1], 'line'),
        bench('bench', [0, 2.4]),
        seg('d1', [0, 2.4], [-4, 0], { tone: 'theta', dashed: true, weight: 2.5, group: 'dists' }),
        seg('d2', [0, 2.4], [4, 0], { tone: 'theta', dashed: true, weight: 2.5, group: 'dists' }),
      ),
    ],
    440,
  );

// Segment AB with its midpoint M (tick marks for AM = MB), and the perpendicular bisector ℓ.
const bisect = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [-4, 0], [4, 0], { tone: 'adj', weight: 5 }),
        pt('A', [-4, 0], 'A', 'left'),
        pt('B', [4, 0], 'B', 'right'),
        sideTicks({ id: 'ticks', a: [-4, 0], b: [0, 0], count: 1, tone: 'opp' }),
        sideTicks({ id: 'ticks2', a: [0, 0], b: [4, 0], count: 1, tone: 'opp' }),
        pt('M', [0, 0], 'M', 'below left', 'opp'),
        seg('line', [0, -3], [0, 3.4], { tone: 'opp', weight: 4 }),
        mark('sq', [0, 0], [1, 0], [0, 1], 'line'),
        pt('l', [0, 3.4], '\\ell', 'right', 'opp', 'line'),
      ),
    ],
    360,
  );

// Two lines that are not perpendicular bisectors of AB: one through the midpoint at a slant, one
// at a right angle that misses the midpoint.
const notQuite = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab1', [-4, 0], [4, 0], { tone: 'adj', weight: 4 }),
        sideTicks({ id: 'k1', a: [-4, 0], b: [0, 0], count: 1, tone: 'opp' }),
        sideTicks({ id: 'k2', a: [0, 0], b: [4, 0], count: 1, tone: 'opp' }),
        seg('slant', [-1.6, -2.6], [1.6, 2.6], { tone: 'bad', weight: 4 }),
        seg('ab2', [9, 0], [17, 0], { tone: 'adj', weight: 4 }),
        seg('off', [14.5, -2.6], [14.5, 2.6], { tone: 'bad', weight: 4 }),
        mark('sq2', [14.5, 0], [15.5, 0], [14.5, 1]),
        pt('mid2', [13, 0], '', 'below', 'opp'),
      ),
      {
        points: { c1: [0, -3.4], c2: [13, -3.4] },
        items: [
          { kind: 'label', id: 'cap1', at: 'c1', tex: '\\text{no right angle}', tone: 'bad', place: 'center' },
          { kind: 'label', id: 'cap2', at: 'c2', tex: '\\text{not the midpoint}', tone: 'bad', place: 'center' },
        ],
      },
    ],
    300,
  );

// ∠ABC = 84°: BA at 8°, BC at 92°, and the bisector BD at 50°, 42° from each arm.
const ray = (deg: number, len = 5): [number, number] => [len * Math.cos((deg * Math.PI) / 180), len * Math.sin((deg * Math.PI) / 180)];
const bisector = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ba', [0, 0], ray(8), { tone: 'ink', weight: 4, arrow: true, group: 'arms' }),
        seg('bc', [0, 0], ray(92), { tone: 'ink', weight: 4, arrow: true, group: 'arms' }),
        seg('bd', [0, 0], ray(50), { tone: 'adj', weight: 4, dashed: true, arrow: true }),
        pt('A', ray(8, 5.3), 'A', 'right'),
        pt('C', ray(92, 5.3), 'C', 'above'),
        pt('D', ray(50, 5.3), 'D', 'above right'),
        pt('B', [0, 0], 'B', 'below left'),
      ),
      {
        points: { O: [0, 0], a: ray(8), d: ray(50), c: ray(92) },
        items: [
          { kind: 'angle', id: 'h1', at: 'O', from: 'a', to: 'd', label: '42^\\circ', r: 55, labelDist: 110, group: 'halves' },
          { kind: 'angle', id: 'h2', at: 'O', from: 'd', to: 'c', label: '42^\\circ', r: 55, labelDist: 110, group: 'halves' },
        ],
      },
    ],
    420,
  );

const video: Explainer = {
  id: 'm7-8-2',
  lessonId: 'm7-8-2',
  title: 'Perpendicular Bisectors and Angle Bisectors, Part 1: Two Kinds of Bisectors',
  thumbnailTitle: 'Two Kinds of Bisectors',
  thumbnail: 'bs',
  summary:
    'To bisect is to cut into two equal parts, and the midpoint of a segment is halfway between its endpoints. The perpendicular bisector of segment AB crosses AB at its midpoint and makes a right angle with it; it needs both. An angle bisector is a ray that splits an angle into two equal angles: if ray BD makes 42° with each arm, it bisects ∠ABC, and ∠ABC = 84°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 1', title: 'Two Kinds of Bisectors', subtitle: 'Cutting exactly in half' }],
      lines: [
        { say: 'A new bench is going into a park, between two tall trees. Where should it go, so that it is exactly the same distance from each tree?', show: 'title' },
        { say: 'A perpendicular bisector answers that question. In this video, you will learn what perpendicular bisectors and angle bisectors are.' },
      ],
    },
    {
      chapter: 'The bench and the trees',
      layout: 'center',
      main: [park('pk')],
      lines: [
        { say: 'Here is the park seen from above, with the two trees. Join the trees with a segment.', show: ['pk.t1', 'pk.t2', 'pk.ab'] },
        { say: 'The orange line crosses that segment exactly halfway between the trees, at a right angle.', show: 'pk.line', focus: 'pk.line' },
        { say: 'Put the bench anywhere on the orange line, and it is the same distance from both trees. By the end of this lesson, you will see why, and how to draw that line yourself.', show: ['pk.bench', 'pk.dists'], focus: 'pk.dists' },
      ],
    },
    {
      chapter: 'Bisect and midpoint',
      layout: 'split',
      leftWidth: 560,
      left: [bisect('bs')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Bisect and midpoint', md: 'To **bisect** something is to cut it into **two equal parts**. The **midpoint** of a segment is the point exactly halfway between its endpoints.' },
        { kind: 'callout', id: 'pb', tone: 'definition', title: 'Perpendicular bisector', md: 'The **perpendicular bisector** of $AB$ crosses $AB$ at its **midpoint** and makes a **right angle** with it.' },
      ],
      lines: [
        { say: 'To bisect something means to cut it into two equal parts, exactly in half.', show: ['def', 'bs.ab', 'bs.A', 'bs.B'] },
        { say: 'The midpoint of a segment is the point exactly halfway between its endpoints. Here, M is the midpoint of A B. The little tick marks show that A M and M B are the same length.', show: ['bs.M', 'bs.ticks', 'bs.ticks2'], focus: ['bs.ticks', 'bs.ticks2'] },
        { say: 'The perpendicular bisector of A B is a line that crosses A B at its midpoint, and makes a right angle with it. Here, it is the line we call l.', show: ['pb', 'bs.line'], focus: 'bs.line' },
        { say: 'It bisects the segment, because it cuts it into two equal parts. And it is perpendicular to the segment, because it makes a right angle. So it is a perpendicular bisector.' },
      ],
    },
    {
      chapter: 'Angle bisectors',
      layout: 'split',
      leftWidth: 520,
      left: [bisector('an')],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Angle bisector', md: 'An **angle bisector** is a ray that splits an angle into **two equal angles**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle ABD = \\angle DBC = 42^\\circ', '\\angle ABC = 42^\\circ + 42^\\circ = 84^\\circ'] },
      ],
      lines: [
        { say: 'You can bisect an angle as well. Here is angle A B C, with its vertex at B.', show: ['an.arms', 'an.A', 'an.B', 'an.C'] },
        { say: 'Ray B D makes a forty-two degree angle with each arm. The two angles, A B D and D B C, are equal.', show: ['an.bd', 'an.D', 'an.halves', 'm.0'], focus: 'an.halves' },
        { say: 'A ray that splits an angle into two equal angles is called an angle bisector. So B D bisects angle A B C.', show: 'def' },
        { say: 'How big is the whole angle? Forty-two plus forty-two is eighty-four degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Both conditions', md: 'A line through the midpoint at a slant is **not** a perpendicular bisector. A perpendicular line that misses the midpoint is **not** one either. It needs **both**: the midpoint **and** a $90^\\circ$ angle.' },
        notQuite('nq'),
      ],
      lines: [
        { say: 'Watch out. A perpendicular bisector needs two things at once.', show: 'oops' },
        { say: 'This line goes through the midpoint, but it is slanted. It does not make a right angle, so it is not a perpendicular bisector.', show: ['nq.ab1', 'nq.k1', 'nq.k2', 'nq.slant', 'nq.cap1'], focus: 'nq.slant' },
        { say: 'This line makes a right angle, but it misses the midpoint. So it is not a perpendicular bisector either.', show: ['nq.ab2', 'nq.off', 'nq.sq2', 'nq.mid2', 'nq.cap2'], focus: 'nq.off' },
        { say: 'It needs both: the midpoint, and a ninety degree angle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ray $BD$ bisects $\\angle ABC$. $\\angle ABD = 35^\\circ$. How big is $\\angle ABC$?',
          choices: ['$17.5^\\circ$', '$70^\\circ$', '$35^\\circ$', '$145^\\circ$'],
          answer: 1,
          working: 'A bisector makes two equal angles, so $\\angle DBC = 35^\\circ$ as well, and $\\angle ABC = 35^\\circ + 35^\\circ = 70^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ray B D bisects angle A B C. Angle A B D is thirty-five degrees. How big is angle A B C? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, seventy degrees. The bisector makes two equal angles of thirty-five degrees, and thirty-five plus thirty-five is seventy. Choice A divides by two, but thirty-five degrees is already one of the two equal parts.', show: 'q.answer' },
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
          items: ['To **bisect** is to cut into two equal parts. The **midpoint** is halfway along a segment.', 'A **perpendicular bisector** crosses a segment at its midpoint, at $90^\\circ$.', 'An **angle bisector** splits an angle into two equal angles.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To bisect is to cut into two equal parts, and the midpoint is halfway along a segment.', show: 'sum.0' },
        { say: 'A perpendicular bisector crosses a segment at its midpoint, at a right angle. It needs both.', show: 'sum.1' },
        { say: 'An angle bisector splits an angle into two equal angles. In the next part, you will find midpoints on a grid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
