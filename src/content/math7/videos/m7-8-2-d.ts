import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { arc, compass, pt } from './lib/m7-8-figures.ts';

type P = [number, number];
const rad = (deg: number) => (deg * Math.PI) / 180;
const toward = (c: P, deg: number, len: number): P => [c[0] + len * Math.cos(rad(deg)), c[1] + len * Math.sin(rad(deg))];
const dir = (a: P, b: P) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;

// Angle ABC of 70°: the vertex B at the origin, arm BA at 10° and arm BC at 80°. An arc of radius
// 2.5 about B crosses the arms at D and E; arcs of radius 2 about D and E cross at F, on the
// bisector (45°), because D and E are the same distance from B.
const B: P = [0, 0];
const D = toward(B, 10, 2.5);
const E = toward(B, 80, 2.5);
const half = 2.5 * Math.sin(rad(35));
const F = toward(B, 45, 2.5 * Math.cos(rad(35)) + Math.sqrt(4 - half * half));
const fromD = dir(D, F);
const fromE = dir(E, F);
const build = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ba', B, toward(B, 10, 5.5), { tone: 'ink', weight: 4, arrow: true, group: 'arms' }),
        seg('bc', B, toward(B, 80, 5.5), { tone: 'ink', weight: 4, arrow: true, group: 'arms' }),
        pt('A', toward(B, 10, 5.5), 'A', 'below'),
        pt('C', toward(B, 80, 5.5), 'C', 'left'),
        pt('B', B, 'B', 'below left'),
        arc('a1', B, 2.5, -5, 95),
        compass('cmp1', B, toward(B, 95, 2.5), { side: 'right' }),
        pt('D', D, 'D', 'below right', 'ink', 'de'),
        pt('E', E, 'E', 'above left', 'ink', 'de'),
        arc('a2', D, 2, fromD - 18, fromD + 18),
        compass('cmp2', D, toward(D, fromD + 18, 2), { side: 'right' }),
        arc('a3', E, 2, fromE - 18, fromE + 18),
        compass('cmp3', E, toward(E, fromE - 18, 2)),
        pt('F', F, 'F', 'below right'),
        seg('bf', B, toward(B, 45, 5.8), { tone: 'opp', weight: 5, arrow: true }),
      ),
      {
        points: { O: B, Aa: toward(B, 10, 5), Ff: toward(B, 45, 5), Cc: toward(B, 80, 5) },
        items: [
          { kind: 'angle', id: 'h1', at: 'O', from: 'Aa', to: 'Ff', label: '35^\\circ', r: 80, labelDist: 125, group: 'halves' },
          { kind: 'angle', id: 'h2', at: 'O', from: 'Ff', to: 'Cc', label: '35^\\circ', r: 80, labelDist: 125, group: 'halves' },
        ],
      },
    ],
    480,
  );

const video: Explainer = {
  id: 'm7-8-2-d',
  lessonId: 'm7-8-2',
  title: 'Perpendicular Bisectors and Angle Bisectors, Part 4: Constructing an Angle Bisector',
  thumbnailTitle: 'Constructing an Angle Bisector',
  thumbnail: 'ab',
  summary:
    'Constructing the bisector of ∠ABC with a compass and a ruler: with the compass point on the vertex B, draw an arc that crosses both arms at D and E; draw an arc from D inside the angle, then, with the same opening, an arc from E that crosses it at F; draw ray BF. Folding so that one arm lies on the other, or measuring half the angle with a protractor, also works. Verify by measuring the two new angles: they should be equal, 35° each for a 70° angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 4', title: 'Constructing an Angle Bisector', subtitle: 'Splitting an angle exactly in half' }],
      lines: [
        { say: 'An angle bisector splits an angle into two equal angles. You could measure the angle and take half of it. But you can also construct the bisector exactly, with no measuring at all.', show: 'title' },
        { say: 'In this video, you will construct an angle bisector with a compass and a ruler, step by step.' },
      ],
    },
    {
      chapter: 'Step 1: an arc from the vertex',
      layout: 'split',
      leftWidth: 560,
      left: [build('s1')],
      right: [{ kind: 'text', id: 't', size: 'md', md: '**Step 1.** Place the compass point on the vertex $B$. Draw an arc that crosses both arms. Label the crossings $D$ and $E$.' }],
      lines: [
        { say: 'Here is angle A B C. Its vertex, the corner, is B, and its arms go out to A and to C.', show: ['s1.arms', 's1.A', 's1.B', 's1.C'] },
        { say: 'Step one. Place the compass point on the vertex, B. Draw an arc that crosses both arms.', show: ['t', 's1.cmp1', 's1.a1'], focus: 's1.a1' },
        { say: 'Label the crossings D and E. They were drawn with the same opening, so D and E are the same distance from B.', show: 's1.de', hide: 's1.cmp1', focus: 's1.de' },
      ],
    },
    {
      chapter: 'Steps 2 and 3: two crossing arcs',
      layout: 'split',
      leftWidth: 560,
      left: [build('s2')],
      right: [
        { kind: 'text', id: 't2', size: 'md', md: '**Step 2.** Place the compass point on $D$. Draw an arc inside the angle.' },
        { kind: 'text', id: 't3', size: 'md', md: '**Step 3.** Keep the same opening. Place the compass point on $E$ and draw an arc that crosses the last arc. Label the crossing $F$.' },
      ],
      lines: [
        { say: 'Step two. Place the compass point on D, and draw an arc inside the angle.', show: ['s2.arms', 's2.A', 's2.B', 's2.C', 's2.a1', 's2.de', 't2', 's2.cmp2', 's2.a2'], focus: 's2.a2' },
        { say: 'Step three. Keep the same opening. Place the compass point on E, and draw an arc that crosses the last arc.', show: ['t3', 's2.cmp3', 's2.a3'], hide: 's2.cmp2', focus: 's2.a3' },
        { say: 'Label the crossing F. Point F is the same distance from D as it is from E.', show: 's2.F', hide: 's2.cmp3', focus: 's2.F' },
      ],
    },
    {
      chapter: 'Step 4: draw the ray',
      layout: 'split',
      leftWidth: 560,
      left: [build('s4')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: '**Step 4.** Use the ruler to draw ray $BF$. It bisects $\\angle ABC$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle ABF = \\angle FBC'] },
      ],
      lines: [
        { say: 'Step four. Use the ruler to draw a ray from B, through F, and beyond.', show: ['s4.arms', 's4.A', 's4.B', 's4.C', 's4.a1', 's4.de', 's4.a2', 's4.a3', 's4.F', 't', 's4.bf'], focus: 's4.bf' },
        { say: 'Ray B F bisects angle A B C. It splits it into two equal angles: angle A B F, and angle F B C.', show: ['m.0', 's4.halves'], focus: 's4.halves' },
        { say: 'This angle is seventy degrees, so each half is thirty-five degrees. If you measure them with a protractor, you should find that they are equal.' },
      ],
    },
    {
      chapter: 'Other ways',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Fold**: fold tracing paper through the vertex so that one arm lies exactly on the other. The crease is the bisector.', '**Measure**: measure the angle with a protractor, take half of it, and draw a ray at that angle.'],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Verify your construction', md: 'Measure both new angles with a protractor. They should be **equal**, and each one should be **half** of the whole angle.' },
      ],
      lines: [
        { say: 'There are other ways to bisect an angle. You can fold: draw the angle on tracing paper, and fold it through the vertex, so that one arm lies exactly on top of the other. The crease is the bisector.', show: 'b.0' },
        { say: 'Or you can measure: measure the angle with a protractor, take half of it, and draw a ray at that angle.', show: 'b.1' },
        { say: 'Whichever way you use, verify your work. Measure both new angles. They should be equal, and each one should be half of the whole angle.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You bisect an angle of $130^\\circ$ with a compass and a ruler. What should each of the two new angles measure?',
          choices: ['$260^\\circ$', '$50^\\circ$', '$130^\\circ$', '$65^\\circ$'],
          answer: 3,
          working: 'A bisector splits the angle into two equal angles, each half of the whole: $130^\\circ \\div 2 = 65^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. You bisect an angle of one hundred thirty degrees with a compass and a ruler. What should each of the two new angles measure? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, sixty-five degrees. Each new angle is half of the whole, and one hundred thirty divided by two is sixty-five. Choice A doubles the angle instead of finding half of it.', show: 'q.answer' },
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
          items: ['From the vertex, draw an arc that crosses both arms at $D$ and $E$.', 'With the same opening, draw arcs from $D$ and $E$ that cross at $F$.', 'Draw ray $BF$. Verify: the two new angles are equal.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Put the compass point on the vertex, and draw an arc that crosses both arms, at D and E.', show: 'sum.0' },
        { say: 'With the same opening, draw arcs from D and from E that cross at F.', show: 'sum.1' },
        { say: 'Draw the ray from the vertex through F. Then verify that the two new angles are equal. In the next part, you will use perpendicular bisectors to find equal lengths. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
