import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { pt } from './lib/m7-8-figures.ts';

type P = [number, number];
const at = (deg: number, len = 4): P => [len * Math.cos((deg * Math.PI) / 180), len * Math.sin((deg * Math.PI) / 180)];

// AB ⊥ CD at E. Ray EF is 35° from EA (F at 145°), so x = ∠FEC = 90° − 35° = 55°.
const cross = (id: string, x: string) =>
  figure(
    id,
    [
      join(
        seg('ab', at(180), at(0), { tone: 'ink', weight: 4 }),
        seg('cd', at(90), at(270), { tone: 'ink', weight: 4 }),
        seg('ef', [0, 0], at(145), { tone: 'hyp', weight: 4 }),
        mark('sq', [0, 0], at(0), at(270)),
        pt('A', at(180), 'A', 'left'),
        pt('B', at(0), 'B', 'right'),
        pt('C', at(90), 'C', 'above'),
        pt('D', at(270), 'D', 'below'),
        pt('F', at(145), 'F', 'above left'),
        pt('E', [0, 0], 'E', 'below left'),
      ),
      {
        points: { O: [0, 0], A0: at(180), F0: at(145), C0: at(90) },
        items: [
          { kind: 'angle', id: 'a35', at: 'O', from: 'A0', to: 'F0', label: '35^\\circ', r: 70, labelDist: 120 },
          { kind: 'angle', id: 'x', at: 'O', from: 'F0', to: 'C0', label: x, r: 46, labelDist: 95 },
        ],
      },
    ],
    440,
  );

// AB, and CD below it: 3.2 cm apart at the left end and 3.6 cm apart at the right end.
const check = (id: string) =>
  figure(
    id,
    [
      join(
        seg('ab', [0, 0], [8, 0], { tone: 'adj', weight: 5 }),
        seg('cd', [0, -3.2], [8, -3.6], { tone: 'hyp', weight: 5 }),
        pt('A', [0, 0], 'A', 'above'),
        pt('B', [8, 0], 'B', 'above'),
        pt('C', [0, -3.2], 'C', 'below'),
        pt('D', [8, -3.6], 'D', 'below'),
        seg('left', [0, 0], [0, -3.2], { tone: 'opp', dashed: true, weight: 3, label: '3.2\\text{ cm}', side: 'left' }),
        seg('right', [8, 0], [8, -3.6], { tone: 'opp', dashed: true, weight: 3, label: '3.6\\text{ cm}', side: 'right' }),
        mark('m1', [0, 0], [1, 0], [0, -1], 'marks'),
        mark('m2', [8, 0], [7, 0], [8, -1], 'marks'),
      ),
    ],
    340,
  );

// Parallel segments of different lengths: 8 units and 3 units, the same distance apart everywhere.
const lengths = (id: string) =>
  figure(
    id,
    [
      join(
        seg('long', [0, 0], [8, 0], { tone: 'adj', weight: 5 }),
        seg('short', [2.5, -2], [5.5, -2], { tone: 'adj', weight: 5 }),
        seg('g1', [3, 0], [3, -2], { tone: 'muted', dashed: true, weight: 2.5, group: 'gaps' }),
        seg('g2', [5, 0], [5, -2], { tone: 'muted', dashed: true, weight: 2.5, group: 'gaps' }),
      ),
    ],
    220,
  );

const video: Explainer = {
  id: 'm7-8-1-c',
  lessonId: 'm7-8-1',
  title: 'Parallel and Perpendicular Line Segments, Part 3: Using the Properties',
  thumbnailTitle: 'Using the Properties',
  thumbnail: 'cr',
  summary:
    'Perpendicular segments always meet at 90°, so a missing angle can be found by subtracting: if AB ⊥ CD at E and ray EF makes 35° with EA, then ∠FEC = 90° − 35° = 55°. Parallel segments are the same distance apart everywhere: measured at right angles at both ends, 3.2 cm and 3.6 cm means not parallel. Parallel segments do not have to be the same length.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 3', title: 'Using the Properties', subtitle: 'Ninety degrees, and the same distance apart' }],
      lines: [
        { say: 'Perpendicular segments always meet at ninety degrees. Parallel segments are always the same distance apart. These facts are useful!', show: 'title' },
        { say: 'In this video, you will use them to find a missing angle, and to check whether two segments are really parallel.' },
      ],
    },
    {
      chapter: 'A missing angle',
      layout: 'split',
      leftWidth: 540,
      left: [cross('cr', 'x')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: '$AB \\perp CD$ at point $E$. Ray $EF$ makes a $35^\\circ$ angle with $EA$. Find $\\angle FEC$, marked $x$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle AEC = 90^\\circ', '35^\\circ + x = 90^\\circ', 'x = 90^\\circ - 35^\\circ = 55^\\circ'] },
      ],
      lines: [
        { say: 'Segment A B is perpendicular to segment C D. They cross at point E. A ray, E F, makes a thirty-five degree angle with E A. Find the angle F E C, marked x.', show: ['q', 'cr.ab', 'cr.cd', 'cr.sq', 'cr.ef', 'cr.A', 'cr.B', 'cr.C', 'cr.D', 'cr.E', 'cr.F', 'cr.a35', 'cr.x'] },
        { say: 'A B and C D are perpendicular, so they make right angles. The angle A E C, from E A round to E C, is ninety degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Ray E F splits that right angle into two parts: thirty-five degrees, and x. Together they make ninety degrees.', show: 'm.1', focus: ['m.1', 'cr.a35', 'cr.x'] },
        { say: 'So x is ninety minus thirty-five, which is fifty-five degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is it parallel?',
      layout: 'split',
      leftWidth: 560,
      left: [check('ck')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Measure at both ends', md: 'To check for parallel segments, measure the distance between them at **both ends**, at right angles to one segment.' },
        { kind: 'text', id: 'a', size: 'md', md: '$3.2$ cm and $3.6$ cm are different, so $AB$ and $CD$ are **not** parallel.' },
      ],
      lines: [
        { say: 'Mason draws segment C D below segment A B. Are they parallel? They look almost parallel, but it is hard to tell by eye.', show: ['ck.ab', 'ck.cd', 'ck.A', 'ck.B', 'ck.C', 'ck.D'] },
        { say: 'Parallel segments are the same distance apart everywhere. So measure the distance between them at both ends, at right angles to A B.', show: ['tip', 'ck.marks'] },
        { say: 'At the left end, the distance is three point two centimetres. At the right end, it is three point six centimetres.', show: ['ck.left', 'ck.right'], focus: ['ck.left', 'ck.right'] },
        { say: 'The distances are different. The segments get farther apart to the right, so they would meet if you made them longer to the left. A B and C D are not parallel.', show: 'a' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Length does not matter', md: 'Parallel segments do **not** have to be the same length. Only the distance between them matters.' },
        lengths('ln'),
      ],
      lines: [
        { say: 'One more thing to watch out for. Some people think parallel segments must be the same length.', show: 'oops' },
        { say: 'These two segments have very different lengths. But they go in the same direction, and the distance between them is the same everywhere. So they are parallel.', show: ['ln.long', 'ln.short', 'ln.gaps'], focus: 'ln.gaps' },
        { say: 'Only the distance between the segments matters, not their lengths.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$JK \\perp LM$ at point $E$. Ray $EN$ makes a $62^\\circ$ angle with $EJ$, inside the right angle $\\angle JEL$. What is $\\angle NEL$?',
          choices: ['$118^\\circ$', '$152^\\circ$', '$28^\\circ$', '$62^\\circ$'],
          answer: 2,
          working: 'The segments are perpendicular, so $\\angle JEL = 90^\\circ$. Then $\\angle NEL = 90^\\circ - 62^\\circ = 28^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Segment J K is perpendicular to segment L M at point E. Ray E N makes a sixty-two degree angle with E J, inside the right angle J E L. What is angle N E L? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is C, twenty-eight degrees. The right angle is ninety degrees, and ninety minus sixty-two is twenty-eight. Choice A subtracts from one hundred eighty, but the two parts make a right angle, not a straight line.', show: 'q.answer' },
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
          items: ['Perpendicular segments make $90^\\circ$: use it to find a missing angle.', 'To check for parallel segments, measure the distance at both ends.', 'Parallel segments do not have to be the same length.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Perpendicular segments make ninety degrees. Use that to find a missing angle, by subtracting from ninety.', show: 'sum.0' },
        { say: 'To check whether two segments are parallel, measure the distance between them at both ends.', show: 'sum.1' },
        { say: 'And parallel segments do not have to be the same length. In the next part, you will construct a perpendicular segment with a compass and a ruler. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
