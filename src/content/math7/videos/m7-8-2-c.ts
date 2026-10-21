import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sideTicks } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { arc, compass, pt } from './lib/m7-8-figures.ts';

type P = [number, number];
const toward = (c: P, deg: number, len: number): P => [c[0] + len * Math.cos((deg * Math.PI) / 180), c[1] + len * Math.sin((deg * Math.PI) / 180)];

// AB from (−3, 0) to (3, 0), 6 long. With the compass opened to 4 (more than half of 6), arcs from
// A and from B cross at C (0, √7) above and D (0, −√7) below; CD crosses AB at its midpoint M
// (0, 0) at a right angle.
const A: P = [-3, 0];
const B: P = [3, 0];
const R = 4;
const up = Math.sqrt(R * R - 9);
const build = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', A, B, { tone: 'adj', weight: 5 }),
        pt('A', A, 'A', 'left'),
        pt('B', B, 'B', 'right'),
        compass('cmp0', A, [1, 0]),
        arc('a1', A, R, 24, 58, { group: 'fromA' }),
        arc('a2', A, R, -58, -24, { group: 'fromA' }),
        compass('cmpA', A, toward(A, 58, R)),
        arc('b1', B, R, 122, 156, { group: 'fromB' }),
        arc('b2', B, R, 204, 238, { group: 'fromB' }),
        compass('cmpB', B, toward(B, 122, R), { side: 'right' }),
        pt('C', [0, up], 'C', 'right'),
        pt('D', [0, -up], 'D', 'right'),
        seg('cd', [0, up + 0.7], [0, -up - 0.7], { tone: 'opp', weight: 5 }),
        mark('sq', [0, 0], [1, 0], [0, 1], 'mid'),
        sideTicks({ id: 'tk1', a: A, b: [0, 0], count: 1, tone: 'opp' }),
        sideTicks({ id: 'tk2', a: [0, 0], b: B, count: 1, tone: 'opp' }),
        pt('M', [0, 0], 'M', 'below left', 'opp', 'mid'),
      ),
    ],
    460,
  );

const video: Explainer = {
  id: 'm7-8-2-c',
  lessonId: 'm7-8-2',
  title: 'Perpendicular Bisectors and Angle Bisectors, Part 3: Constructing a Perpendicular Bisector',
  thumbnailTitle: 'Constructing a Perpendicular Bisector',
  thumbnail: 'pb',
  summary:
    'Constructing the perpendicular bisector of AB with a compass and a ruler: open the compass to more than half the length of AB; from A, draw an arc above and an arc below AB; with the same opening, draw arcs from B that cross them at C and D; join C and D. Folding tracing paper so that A lands on B, or measuring half the length and a 90° angle, also works. Check that AM = MB and the angle at M is 90°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 3', title: 'Constructing a Perpendicular Bisector', subtitle: 'Four arcs and one straight line' }],
      lines: [
        { say: 'The perpendicular bisector of a segment crosses it at its midpoint, at a right angle. How can you draw one exactly?', show: 'title' },
        { say: 'In this video, you will construct a perpendicular bisector with a compass and a ruler, step by step, and learn two other ways to make one.' },
      ],
    },
    {
      chapter: 'Steps 1 and 2: arcs from A',
      layout: 'split',
      leftWidth: 580,
      left: [build('s1')],
      right: [
        { kind: 'text', id: 't1', size: 'md', md: '**Step 1.** Open the compass to **more than half** the length of $AB$.' },
        { kind: 'text', id: 't2', size: 'md', md: '**Step 2.** Place the compass point on $A$. Draw an arc above $AB$ and an arc below $AB$.' },
      ],
      lines: [
        { say: 'Here is segment A B. We want to construct its perpendicular bisector.', show: ['s1.ab', 's1.A', 's1.B'] },
        { say: 'Step one. Open the compass to more than half the length of A B. With its point on A, the pencil should reach past the middle of the segment.', show: ['t1', 's1.cmp0'], focus: 's1.cmp0' },
        { say: 'Step two. Place the compass point on A. Draw an arc above A B, and another arc below A B.', show: ['t2', 's1.cmpA', 's1.fromA'], hide: 's1.cmp0', focus: 's1.fromA' },
      ],
    },
    {
      chapter: 'Steps 3 and 4: arcs from B, then join',
      layout: 'split',
      leftWidth: 580,
      left: [build('s3')],
      right: [
        { kind: 'text', id: 't3', size: 'md', md: '**Step 3.** Keep the same opening. Place the compass point on $B$ and draw arcs that cross the first two arcs. Label the crossings $C$ and $D$.' },
        { kind: 'text', id: 't4', size: 'md', md: '**Step 4.** Use the ruler to join $C$ and $D$. Line $CD$ is the perpendicular bisector of $AB$.' },
      ],
      lines: [
        { say: 'Step three. Keep the same opening: do not change the compass. Place its point on B, and draw arcs that cross the first two arcs, one above and one below.', show: ['s3.ab', 's3.A', 's3.B', 's3.fromA', 't3', 's3.cmpB', 's3.fromB'], focus: 's3.fromB' },
        { say: 'Label the crossings C, above, and D, below.', show: ['s3.C', 's3.D'], hide: 's3.cmpB', focus: ['s3.C', 's3.D'] },
        { say: 'Step four. Use the ruler to join C and D. Line C D is the perpendicular bisector of A B.', show: ['t4', 's3.cd'], focus: 's3.cd' },
        { say: 'It crosses A B at its midpoint, M, at a right angle.', show: ['s3.mid', 's3.tk1', 's3.tk2'], focus: ['s3.mid', 's3.tk1', 's3.tk2'] },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Why it works', md: 'Every arc was drawn with the **same** compass opening. So $C$ is the same distance from $A$ as from $B$, and so is $D$. The points that are the same distance from $A$ and $B$ all lie on the perpendicular bisector.' }],
      lines: [
        { say: 'Why does this work? Every arc was drawn with the same compass opening.', show: 'key' },
        { say: 'So point C is the same distance from A as it is from B. For the same reason, point D is the same distance from both of them.' },
        { say: 'And all the points that are the same distance from A and from B lie on one line: the perpendicular bisector. Two of those points, C and D, are enough to draw it.' },
      ],
    },
    {
      chapter: 'Other ways',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Fold**: fold tracing paper so that $A$ lands exactly on $B$. The crease is the perpendicular bisector.', '**Measure**: find half the length of $AB$ with a ruler to mark $M$, then draw a $90^\\circ$ angle at $M$ with a protractor.'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Verify your construction', md: 'Measure $AM$ and $MB$ with a ruler: they should be **equal**. Measure the angle at $M$ with a protractor: it should be $90^\\circ$.' },
      ],
      lines: [
        { say: 'There are other ways to make a perpendicular bisector. You can fold: draw the segment on tracing paper, and fold it so that A lands exactly on B. The crease is the perpendicular bisector.', show: 'b.0' },
        { say: 'Or you can measure: use a ruler to find half the length of A B, and mark the midpoint. Then use a protractor to draw a ninety degree angle there.', show: 'b.1' },
        { say: 'Whichever way you use, verify your work. Measure A M and M B: they should be equal. And measure the angle at M: it should be ninety degrees.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Why must the compass be opened to **more than half** the length of $AB$?',
          choices: ['Otherwise the arcs from $A$ and $B$ do not cross.', 'So that the arcs are perpendicular to $AB$.', 'So that segment $AB$ gets longer.', 'So that the midpoint moves to $A$.'],
          answer: 0,
          working: 'With less than half the length, the arcs from $A$ and from $B$ do not reach each other, so they never cross, and there are no points $C$ and $D$ to join.',
        },
      ],
      lines: [
        { say: 'Your turn. Why must the compass be opened to more than half the length of A B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. With less than half the length, the arcs from A and from B do not reach each other, so they never cross, and you get no points to join. Choice C is wrong: the compass does not change the segment at all.', show: 'q.answer' },
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
          items: ['Open the compass to more than half of $AB$. Draw arcs from $A$, above and below.', 'With the same opening, draw arcs from $B$ that cross them at $C$ and $D$. Join $C$ and $D$.', 'Folding or measuring works too. Verify: $AM = MB$ and $90^\\circ$ at $M$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Open the compass to more than half of A B, and draw arcs from A, above and below the segment.', show: 'sum.0' },
        { say: 'With the same opening, draw arcs from B that cross them at C and D. Join C and D: that is the perpendicular bisector.', show: 'sum.1' },
        { say: 'Folding or measuring works as well. Always verify: A M equals M B, and the angle at M is ninety degrees. In the next part, you will construct an angle bisector. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
