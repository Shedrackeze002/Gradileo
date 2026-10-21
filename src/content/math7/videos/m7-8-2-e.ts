import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { sideTicks } from '@/content/math6/videos/lib/m6-7-figures.ts';
import { join, mark, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { bench, pt, tree } from './lib/m7-8-figures.ts';

type P = [number, number];

// AB from (−4, 0) to (4, 0), its midpoint M at the origin, and its perpendicular bisector ℓ. A point
// P on ℓ, `h` above M, is joined to A and to B (with labels for PA, PB and AM, if given).
const tri = (id: string, o: { h: number; pa?: string; pb?: string; am?: string; mb?: string }) => {
  const Pp: P = [0, o.h];
  return figure(
    id,
    [
      join(
        seg('ab', [-4, 0], [4, 0], { tone: 'adj', weight: 5 }),
        seg('line', [0, -1.6], [0, o.h + 1.2], { tone: 'opp', weight: 4 }),
        mark('sq', [0, 0], [1, 0], [0, 1], 'line'),
        pt('l', [0, o.h + 1.2], '\\ell', 'right', 'opp', 'line'),
        sideTicks({ id: 'tk1', a: [-4, 0], b: [0, 0], count: 1, tone: 'opp' }),
        sideTicks({ id: 'tk2', a: [0, 0], b: [4, 0], count: 1, tone: 'opp' }),
        seg('pa', Pp, [-4, 0], { tone: 'hyp', dashed: true, weight: 3.5, label: o.pa, side: 'right' }),
        seg('pb', Pp, [4, 0], { tone: 'hyp', dashed: true, weight: 3.5, label: o.pb, side: 'left' }),
        ...(o.am ? [seg('am', [-4, 0], [0, 0], { tone: 'adj', weight: 5, label: o.am, side: 'right' })] : []),
        ...(o.mb ? [seg('mb', [0, 0], [4, 0], { tone: 'adj', weight: 5, label: o.mb, side: 'right' })] : []),
        pt('A', [-4, 0], 'A', 'left'),
        pt('B', [4, 0], 'B', 'right'),
        pt('M', [0, 0], 'M', 'below right', 'opp'),
        pt('P', Pp, 'P', 'above left', 'hyp'),
      ),
    ],
    400,
  );
};

// The park: two trees, the perpendicular bisector of the segment joining them, and two possible
// places for the bench, each the same distance from both trees.
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
        bench('b1', [0, 2.4]),
        seg('d1', [0, 2.4], [-4, 0], { tone: 'theta', dashed: true, weight: 2.5, group: 'one' }),
        seg('d2', [0, 2.4], [4, 0], { tone: 'theta', dashed: true, weight: 2.5, group: 'one' }),
        bench('b2', [0, -2.2]),
        seg('d3', [0, -2.2], [-4, 0], { tone: 'good', dashed: true, weight: 2.5, group: 'two' }),
        seg('d4', [0, -2.2], [4, 0], { tone: 'good', dashed: true, weight: 2.5, group: 'two' }),
      ),
    ],
    380,
  );

const video: Explainer = {
  id: 'm7-8-2-e',
  lessonId: 'm7-8-2',
  title: 'Perpendicular Bisectors and Angle Bisectors, Part 5: Using Equal Lengths',
  thumbnailTitle: 'Using Equal Lengths',
  thumbnail: 'pr',
  summary:
    'Every point on the perpendicular bisector of AB is the same distance from A as from B, which is why a bench placed on it is the same distance from two trees. If P is on the perpendicular bisector and PA = 5 cm, then PB = 5 cm. With PA = 6.5 cm and AM = 4 cm, triangle PAB has a perimeter of 6.5 + 6.5 + 8 = 21 cm. With PA = (3x + 2) cm and PB = 17 cm, 3x + 2 = 17, so x = 5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 5', title: 'Using Equal Lengths', subtitle: 'The same distance from both ends' }],
      lines: [
        { say: 'Remember the bench in the park, between two trees? It should be exactly the same distance from each tree.', show: 'title' },
        { say: 'In this video, you will see why a perpendicular bisector solves that problem, and use it to find lengths and perimeters.' },
      ],
    },
    {
      chapter: 'The same distance from both ends',
      layout: 'split',
      leftWidth: 560,
      left: [tri('eq', { h: 3, pa: 'PA = 5\\text{ cm}', pb: 'PB = \\, ?' })],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Equal distances', md: 'Every point on the perpendicular bisector of $AB$ is the **same distance** from $A$ as from $B$.' }],
      lines: [
        { say: 'Line l is the perpendicular bisector of A B. It crosses A B at its midpoint, M, at a right angle.', show: ['eq.ab', 'eq.A', 'eq.B', 'eq.M', 'eq.line', 'eq.tk1', 'eq.tk2'] },
        { say: 'Point P is on line l, and P A is five centimetres. How long is P B?', show: ['eq.P', 'eq.pa', 'eq.pb'], focus: 'eq.pa' },
        { say: 'Imagine folding the page along line l. Point A lands exactly on point B, because M is the midpoint and the fold is at a right angle. And P stays where it is, on the fold.', focus: 'eq.line' },
        { say: 'So P A lands exactly on P B: they are the same length. P B is five centimetres as well.', show: 'key', focus: ['eq.pa', 'eq.pb'] },
        { say: 'This works for every point on the perpendicular bisector. Every point on it is the same distance from A as from B.' },
      ],
    },
    {
      chapter: 'The bench',
      layout: 'center',
      main: [park('pk')],
      lines: [
        { say: 'Now the bench. Join the two trees with a segment, and draw its perpendicular bisector.', show: ['pk.t1', 'pk.t2', 'pk.ab', 'pk.line'] },
        { say: 'Put the bench anywhere on the perpendicular bisector, and it is the same distance from both trees.', show: ['pk.b1', 'pk.one'], focus: 'pk.one' },
        { say: 'It could even go on the other side of the trees. Every place on the line works, and no place off the line does.', show: ['pk.b2', 'pk.two'], focus: 'pk.two' },
      ],
    },
    {
      chapter: 'Perimeter of a triangle',
      layout: 'split',
      leftWidth: 560,
      left: [tri('pm', { h: Math.sqrt(6.5 ** 2 - 16), pa: '6.5\\text{ cm}', am: '4\\text{ cm}' })],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Line $\\ell$ is the perpendicular bisector of $AB$ at $M$. $P$ is on $\\ell$. $PA = 6.5$ cm and $AM = 4$ cm. Find the perimeter of triangle $PAB$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['PB = PA = 6.5', 'AB = 2 \\times 4 = 8', '6.5 + 6.5 + 8 = 21\\text{ cm}'] },
      ],
      lines: [
        { say: 'Line l is the perpendicular bisector of A B, at M. Point P is on l. P A is six point five centimetres, and A M is four centimetres. Find the perimeter of triangle P A B.', show: ['q', 'pm.ab', 'pm.A', 'pm.B', 'pm.M', 'pm.line', 'pm.tk1', 'pm.tk2', 'pm.P', 'pm.pa', 'pm.am'] },
        { say: 'The perimeter is the distance all the way around: P A plus P B plus A B. We need P B and A B.', show: 'pm.pb' },
        { say: 'P is on the perpendicular bisector, so P B is the same as P A: six point five centimetres.', show: 'm.0', focus: ['m.0', 'pm.pb'] },
        { say: 'M is the midpoint, so A B is two times A M. Two times four is eight centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them: six point five plus six point five plus eight is twenty-one. The perimeter is twenty-one centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using an equation',
      layout: 'split',
      leftWidth: 560,
      left: [tri('ex', { h: 4, pa: '(3x + 2)\\text{ cm}', pb: '17\\text{ cm}' })],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['PA = PB', '3x + 2 = 17', '3x = 15', 'x = 5', '\\text{Check: } 3(5) + 2 = 17 \\;\\checkmark'] }],
      lines: [
        { say: 'Point P is on the perpendicular bisector of A B. P A is three x plus two centimetres, and P B is seventeen centimetres. Find x.', show: ['ex.ab', 'ex.A', 'ex.B', 'ex.M', 'ex.line', 'ex.tk1', 'ex.tk2', 'ex.P', 'ex.pa', 'ex.pb'] },
        { say: 'P is on the perpendicular bisector, so P A equals P B. That gives an equation: three x plus two equals seventeen.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Subtract two from both sides: three x equals fifteen. Divide both sides by three: x equals five.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Check: three times five, plus two, is seventeen. It works!', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$P$ is on the perpendicular bisector of $AB$. $PA = 9$ cm and $AB = 10$ cm. What is the perimeter of triangle $PAB$?',
          choices: ['$19$ cm', '$23$ cm', '$28$ cm', '$38$ cm'],
          answer: 2,
          working: '$PB = PA = 9$ cm, so the perimeter is $9 + 9 + 10 = 28$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. P is on the perpendicular bisector of A B. P A is nine centimetres, and A B is ten centimetres. What is the perimeter of triangle P A B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, twenty-eight centimetres. P B equals P A, so it is nine centimetres, and nine plus nine plus ten is twenty-eight. Choice A forgets P B, and adds only P A and A B.', show: 'q.answer' },
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
          items: ['Every point on the perpendicular bisector of $AB$ is the same distance from $A$ and $B$.', 'So $PA = PB$ for any point $P$ on it, and $AB = 2 \\times AM$.', 'Equal lengths can give an equation to solve.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Every point on the perpendicular bisector of A B is the same distance from A as from B.', show: 'sum.0' },
        { say: 'So P A equals P B for any point P on it, and A B is two times A M.', show: 'sum.1' },
        { say: 'And equal lengths can give you an equation to solve. In the next part, you will use angle bisectors to find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
