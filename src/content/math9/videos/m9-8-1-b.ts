import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dot, ln, on, pt, ring, sq, ticks } from './lib/m9-8-figures.ts';

type P = [number, number];

const R = 4;
const O: P = [0, 0];
// Chord AB from 195° to 315°: its midpoint M is in the direction 255°, at R cos 60° = 2 from O.
const A = on(O, R, 195);
const B = on(O, R, 315);
const M = on(O, R * Math.cos(Math.PI / 3), 255);

const chord = (id: string, o: { am?: string; mb?: string } = {}) =>
  figure(id, [
    ring({ r: R, pts: { A: 195, B: 315 }, centrePlace: 'above' }),
    dot('M', M, 'below'),
    ln('ab', 'A', 'B', { tone: 'opp' }),
    ln('om', 'O', 'M', { tone: 'adj' }),
    sq('rm', 'M', 'O', 'B'),
    ln('oa', 'O', 'A', { tone: 'muted', dashed: true, group: 'why' }),
    ln('ob', 'O', 'B', { tone: 'muted', dashed: true, group: 'why' }),
    ticks('ta', A, M, 1, 0.5),
    ticks('tb', M, B, 1, 0.5),
    ...(o.am ? [ln('am', 'A', 'M', { tone: 'opp', label: o.am, side: 'right' })] : []),
    ...(o.mb ? [ln('mb', 'M', 'B', { tone: 'opp', label: o.mb, side: 'right' })] : []),
  ]);

// A round table: two chords, and the perpendicular bisector of each, which cross at the centre.
const table = (id: string) => {
  const c1: [number, number] = [100, 170];
  const c2: [number, number] = [300, 380];
  const mid = (c: [number, number]) => (c[0] + c[1]) / 2;
  const half = (c: [number, number]) => R * Math.cos((((c[1] - c[0]) / 2) * Math.PI) / 180);
  return figure(id, [
    ring({ r: R, centre: false, pts: {} }),
    pt('p1', on(O, R, c1[0])),
    pt('q1', on(O, R, c1[1])),
    pt('p2', on(O, R, c2[0])),
    pt('q2', on(O, R, c2[1])),
    pt('m1', on(O, half(c1), mid(c1))),
    pt('m2', on(O, half(c2), mid(c2))),
    pt('e1', on(O, R * 1.12, mid(c1))),
    pt('f1', on(O, R * 0.55, mid(c1) + 180)),
    pt('e2', on(O, R * 1.12, mid(c2))),
    pt('f2', on(O, R * 0.55, mid(c2) + 180)),
    ln('ch1', 'p1', 'q1', { tone: 'opp', group: 'one' }),
    ln('ch2', 'p2', 'q2', { tone: 'opp', group: 'two' }),
    ticks('t1a', on(O, R, c1[0]), on(O, half(c1), mid(c1)), 1, 0.45),
    ticks('t1b', on(O, half(c1), mid(c1)), on(O, R, c1[1]), 1, 0.45),
    ticks('t2a', on(O, R, c2[0]), on(O, half(c2), mid(c2)), 2, 0.45),
    ticks('t2b', on(O, half(c2), mid(c2)), on(O, R, c2[1]), 2, 0.45),
    ln('b1', 'e1', 'f1', { tone: 'adj', dashed: true, group: 'bis1' }),
    sq('r1', 'm1', 'e1', 'q1', 'bis1'),
    ln('b2', 'e2', 'f2', { tone: 'adj', dashed: true, group: 'bis2' }),
    sq('r2', 'm2', 'e2', 'q2', 'bis2'),
    dot('O', O, 'below left', { tone: 'theta', tex: '\\text{centre}' }),
  ]);
};

const video: Explainer = {
  id: 'm9-8-1-b',
  lessonId: 'm9-8-1',
  title: 'Chord Properties, Part 2: The Perpendicular from the Centre',
  thumbnailTitle: 'The Perpendicular from the Centre',
  thumbnail: 'cp',
  summary:
    'Two lines are perpendicular when they meet at 90°, and to bisect a segment is to cut it into two equal parts. The chord property: the perpendicular from the centre of a circle to a chord bisects the chord, so if OM ⊥ AB, then AM = MB. If AM = 7 cm, the chord AB is 7 + 7 = 14 cm. It works both ways: the perpendicular bisector of any chord passes through the centre, so two chords find the centre of a round table.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Circle Geometry · Part 2', title: 'The Perpendicular from the Centre', subtitle: 'It cuts a chord in half' }],
      lines: [
        { say: 'Draw a chord in a circle. Then draw the line from the centre that meets the chord at a right angle. Something neat happens every time.', show: 'title' },
        { say: 'In this part, you will learn the chord property, and use it to find lengths.' },
      ],
    },
    {
      chapter: 'Two words',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Perpendicular', md: 'Two lines are **perpendicular** when they meet at a right angle, $90^\\circ$. A small square in the corner shows a right angle.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Bisect', md: 'To **bisect** a segment is to cut it into **two equal parts**. The point in the middle is its **midpoint**.' },
      ],
      lines: [
        { say: 'First, two words you will need. Two lines are perpendicular when they meet at a right angle: ninety degrees. In a diagram, a small square in the corner shows a right angle.', show: 'p' },
        { say: 'To bisect a line segment means to cut it into two equal parts. The point in the middle is called the midpoint.', show: 'b' },
      ],
    },
    {
      chapter: 'The chord property',
      layout: 'split',
      leftWidth: 560,
      left: [chord('cp')],
      right: [
        { kind: 'callout', id: 'k', tone: 'key', title: 'Chord property', md: 'The perpendicular from the centre of a circle to a chord **bisects** the chord.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['OM \\perp AB \\;\\Rightarrow\\; AM = MB'] },
      ],
      lines: [
        { say: 'Here is a chord, A B. From the centre, O, draw the line that meets the chord at a right angle. Call the point where they meet M.', show: ['cp.fill', 'cp.outline', 'cp.names', 'cp.ab', 'cp.om', 'cp.rm', 'cp.nM'], focus: ['cp.om', 'cp.rm'] },
        { say: 'The chord property says: the perpendicular from the centre of a circle to a chord cuts that chord into two equal parts. In other words, it bisects the chord.', show: 'k' },
        { say: 'So M is the midpoint of A B, and A M is equal to M B. The tick marks show the two equal parts. This symbol in the maths means is perpendicular to.', show: ['m', 'cp.ta', 'cp.tb'], focus: ['m', 'cp.ta', 'cp.tb'] },
        { say: 'Here is why it works. O A and O B are both radii, so they are the same length. The line O M is like a mirror: the right triangle on one side of it is a mirror image of the right triangle on the other side. So the two halves of the chord are equal.', show: 'cp.why', focus: 'cp.why' },
      ],
    },
    {
      chapter: 'Finding a chord',
      layout: 'split',
      leftWidth: 560,
      left: [chord('fc', { am: '7\\text{ cm}', mb: '?' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$OM$ is perpendicular to the chord $AB$, and $AM = 7$ cm. How long is $AB$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['MB = AM = 7 \\text{ cm}', 'AB = 7 + 7 = 14 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Let’s use it. O M is perpendicular to the chord A B, and A M is seven centimetres. How long is A B?', show: ['fc.fill', 'fc.outline', 'fc.names', 'fc.ab', 'fc.om', 'fc.rm', 'fc.nM', 'fc.am', 'q'] },
        { say: 'Step one: the perpendicular from the centre cuts the chord in half. So M B is the same as A M: seven centimetres.', show: ['m.0', 'fc.mb', 'fc.ta', 'fc.tb'], focus: ['m.0', 'fc.ta', 'fc.tb'] },
        { say: 'Step two: the whole chord is both parts together. Seven plus seven is fourteen. The chord is fourteen centimetres long.', show: 'm.1', focus: ['m.1', 'fc.ab'] },
      ],
    },
    {
      chapter: 'It works both ways',
      layout: 'split',
      leftWidth: 560,
      left: [table('tb')],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'It works both ways', md: 'The **perpendicular bisector** of any chord passes through the **centre**. Two chords are enough to find the centre of a round table.' }],
      lines: [
        { say: 'The property works both ways. The line from the centre to the midpoint of a chord is perpendicular to the chord.', show: 'tip' },
        { say: 'So the line that cuts a chord in half at a right angle always passes through the centre. That line is called the perpendicular bisector of the chord.' },
        { say: 'Here is a neat use. How do you find the centre of a round table? Draw a chord across it. Then draw its perpendicular bisector. The centre is somewhere on that line.', show: ['tb.outline', 'tb.fill', 'tb.one', 'tb.t1a', 'tb.t1b', 'tb.bis1'], focus: 'tb.bis1' },
        { say: 'Now draw a second chord, and its perpendicular bisector. The centre is on this line as well.', show: ['tb.two', 'tb.t2a', 'tb.t2b', 'tb.bis2'], focus: 'tb.bis2' },
        { say: 'The centre is on both lines, so it must be the point where they cross.', show: 'tb.nO', focus: 'tb.nO' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a circle with centre $O$, $OM$ is perpendicular to the chord $AB$, and $AB = 18$ cm. How long is $AM$?',
          choices: ['$36$ cm', '$9$ cm', '$18$ cm', '$6$ cm'],
          answer: 1,
          working: 'The perpendicular from the centre bisects the chord, so $AM = 18 \\div 2 = 9$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. In a circle with centre O, O M is perpendicular to the chord A B, and A B is eighteen centimetres long. How long is A M? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, nine centimetres. The perpendicular from the centre cuts the chord into two equal parts, so A M is half of eighteen, which is nine. Choice A doubles the chord instead of cutting it in half.', show: 'q.answer' },
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
            '**Perpendicular** lines meet at $90^\\circ$. To **bisect** is to cut into two equal parts.',
            'The perpendicular from the centre to a chord bisects the chord: $AM = MB$.',
            'The perpendicular bisector of any chord passes through the centre.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Perpendicular lines meet at a right angle, and to bisect a segment is to cut it into two equal parts.', show: 'sum.0' },
        { say: 'The perpendicular from the centre of a circle to a chord cuts the chord into two equal parts.', show: 'sum.1' },
        { say: 'And the perpendicular bisector of any chord passes through the centre. In the next part, you will add the Pythagorean theorem, to find the length of a chord. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
