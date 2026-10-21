import type { Explainer } from '@/video/script.ts';
import type { DiagramItem } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { angle } from '@/video/angles.ts';
import { join, seg } from '@/content/math6/videos/lib/m6-9-figures.ts';
import { pt } from './lib/m7-8-figures.ts';

type P = [number, number];
const at = (deg: number, len = 5): P => [len * Math.cos((deg * Math.PI) / 180), len * Math.sin((deg * Math.PI) / 180)];

/** Angles at the origin between the directions `from` and `to` (degrees), each labelled. */
const arcs = (list: { id: string; from: number; to: number; label?: string; r: number; dist?: number; right?: boolean }[]): Part => {
  const points: Record<string, P> = { O: [0, 0] };
  const items: DiagramItem[] = list.map((a) => {
    points[`${a.id}-f`] = at(a.from);
    points[`${a.id}-t`] = at(a.to);
    return a.right
      ? { kind: 'right', id: a.id, at: 'O', from: `${a.id}-f`, to: `${a.id}-t` }
      : { kind: 'angle', id: a.id, at: 'O', from: `${a.id}-f`, to: `${a.id}-t`, label: a.label, r: a.r, labelDist: a.dist };
  });
  return { points, items };
};

// ∠ABC = 120°: BA at 0°, BC at 120°, the bisector BD at 60°, and BE at 90°, bisecting ∠DBC.
const rays = (names: [string, number, string][]) =>
  join(
    ...names.flatMap(([n, deg, tone]) => [seg(`r${n}`, [0, 0], at(deg), { tone: tone as 'ink', weight: 4, arrow: true }), pt(n, at(deg, 5.4), n, deg < 45 ? 'right' : deg > 100 ? 'above left' : 'above')]),
    pt('B', [0, 0], 'B', 'below'),
  );
const twice = (id: string) =>
  figure(
    id,
    [
      rays([
        ['A', 0, 'ink'],
        ['D', 60, 'adj'],
        ['E', 90, 'opp'],
        ['C', 120, 'ink'],
      ]),
      arcs([
        { id: 'abd', from: 0, to: 60, label: '60^\\circ', r: 50, dist: 92 },
        { id: 'dbc', from: 60, to: 120, label: '60^\\circ', r: 50, dist: 92 },
        { id: 'dbe', from: 60, to: 90, label: '30^\\circ', r: 105, dist: 150 },
        { id: 'ebc', from: 90, to: 120, label: '30^\\circ', r: 105, dist: 150 },
        { id: 'abe', from: 0, to: 90, right: true, r: 0 },
      ]),
    ],
    440,
  );

// ∠ABC = 80°: BA at 5°, BC at 85°, and the bisector BD at 45°; ∠ABD = (2x + 10)° and ∠DBC = 40°.
const equal = (id: string) =>
  figure(
    id,
    [
      rays([
        ['A', 5, 'ink'],
        ['D', 45, 'adj'],
        ['C', 85, 'ink'],
      ]),
      arcs([
        { id: 'h1', from: 5, to: 45, label: '(2x + 10)^\\circ', r: 60, dist: 200 },
        { id: 'h2', from: 45, to: 85, label: '40^\\circ', r: 60, dist: 115 },
      ]),
    ],
    420,
  );

const video: Explainer = {
  id: 'm7-8-2-f',
  lessonId: 'm7-8-2',
  title: 'Perpendicular Bisectors and Angle Bisectors, Part 6: Using Equal Angles',
  thumbnailTitle: 'Using Equal Angles',
  thumbnail: 'tw',
  summary:
    'An angle bisector makes two angles that are each half of the whole angle. If ∠ABC = 120° and BD bisects it, then ∠ABD = ∠DBC = 60°; if BE then bisects ∠DBC, ∠DBE = 30° and ∠ABE = 60° + 30° = 90°. Equal angles can give an equation: ∠ABD = (2x + 10)° and ∠DBC = 40° give 2x + 10 = 40, so x = 15. Check whether a question asks for the whole or for one half.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Geometric Constructions · Part 6', title: 'Using Equal Angles', subtitle: 'Each half is half of the whole' }],
      lines: [
        { say: 'An angle bisector splits an angle into two equal angles. So if you know the whole angle, you know each half, and if you know one half, you know the whole.', show: 'title' },
        { say: 'In this video, you will use angle bisectors to find missing angles, even when an angle is bisected twice.' },
      ],
    },
    {
      chapter: 'Half of the whole',
      layout: 'split',
      leftWidth: 520,
      left: [figure('hw', [angle({ deg: 120, len: 4.5, bisect: true, halves: ['60^\\circ', '60^\\circ'], label: '120^\\circ', names: ['A', 'B', 'C'] })], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle ABC = 120^\\circ', '\\angle ABD = \\angle DBC', '= 120^\\circ \\div 2 = 60^\\circ'] }],
      lines: [
        { say: 'Angle A B C is one hundred twenty degrees.', show: ['hw.arms', 'hw.arc', 'hw.names', 'm.0'] },
        { say: 'Ray B D bisects it, so it splits it into two equal angles. Each one is half of one hundred twenty degrees: sixty degrees.', show: ['hw.bis', 'hw.half1', 'hw.half2', 'm.1', 'm.2'], hide: 'hw.arc', focus: ['hw.half1', 'hw.half2', 'm.2'] },
        { say: 'So angle A B D and angle D B C are both sixty degrees.' },
      ],
    },
    {
      chapter: 'Bisecting twice',
      layout: 'split',
      leftWidth: 520,
      left: [twice('tw')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle DBE = 60^\\circ \\div 2 = 30^\\circ', '\\angle ABE = 60^\\circ + 30^\\circ', '\\angle ABE = 90^\\circ'] }],
      lines: [
        { say: 'Now ray B E bisects angle D B C, the sixty degree angle on the left. What is angle A B E?', show: ['tw.rA', 'tw.A', 'tw.rC', 'tw.C', 'tw.B', 'tw.rD', 'tw.D', 'tw.abd', 'tw.dbc'] },
        { say: 'B E splits the sixty degree angle into two equal angles. Half of sixty is thirty. So angle D B E is thirty degrees, and so is angle E B C.', show: ['tw.rE', 'tw.E', 'tw.dbe', 'tw.ebc', 'm.0'], hide: 'tw.dbc', focus: ['tw.dbe', 'tw.ebc', 'm.0'] },
        { say: 'Angle A B E is made of two parts: angle A B D, sixty degrees, and angle D B E, thirty degrees.', show: 'm.1', focus: ['tw.abd', 'tw.dbe', 'm.1'] },
        { say: 'Sixty plus thirty is ninety. So angle A B E is a right angle: ninety degrees.', show: ['m.2', 'tw.abe'], focus: ['m.2', 'tw.abe'] },
      ],
    },
    {
      chapter: 'Using an equation',
      layout: 'split',
      leftWidth: 520,
      left: [equal('eq')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2x + 10 = 40', '2x = 30', 'x = 15', '\\text{Check: } 2(15) + 10 = 40 \\;\\checkmark'] }],
      lines: [
        { say: 'Ray B D bisects angle A B C. Angle A B D is two x plus ten degrees, and angle D B C is forty degrees. Find x.', show: ['eq.rA', 'eq.A', 'eq.rC', 'eq.C', 'eq.rD', 'eq.D', 'eq.B', 'eq.h1', 'eq.h2'] },
        { say: 'A bisector makes two equal angles. So two x plus ten equals forty.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract ten from both sides: two x equals thirty. Divide both sides by two: x equals fifteen.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check: two times fifteen, plus ten, is forty. It works! And the whole angle is forty plus forty, which is eighty degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Half, not the whole', md: 'An angle bisector makes two angles that are each **half** of the whole angle. A perpendicular bisector cuts a segment into two halves. Check whether the question asks for the **whole** or for **one half**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle ABC = 150^\\circ \\;\\to\\; \\angle ABD = 75^\\circ', 'AB = 12\\text{ cm} \\;\\to\\; AM = 6\\text{ cm}'] },
      ],
      lines: [
        { say: 'Watch out. When an angle is bisected, each new angle is half of the whole angle, not the same as the whole.', show: 'oops' },
        { say: 'If angle A B C is one hundred fifty degrees and B D bisects it, then angle A B D is seventy-five degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, if A B is twelve centimetres and M is its midpoint, then A M is six centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'So read the question carefully. Does it ask for the whole, or for one half?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\angle ABC = 100^\\circ$. Ray $BD$ bisects $\\angle ABC$. Then ray $BE$ bisects $\\angle DBC$. What is $\\angle ABE$?',
          choices: ['$50^\\circ$', '$75^\\circ$', '$25^\\circ$', '$100^\\circ$'],
          answer: 1,
          working: '$\\angle ABD = \\angle DBC = 100^\\circ \\div 2 = 50^\\circ$. $\\angle DBE = 50^\\circ \\div 2 = 25^\\circ$. $\\angle ABE = 50^\\circ + 25^\\circ = 75^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Angle A B C is one hundred degrees. Ray B D bisects angle A B C. Then ray B E bisects angle D B C. What is angle A B E? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is B, seventy-five degrees. Angle A B D is fifty degrees, angle D B E is twenty-five degrees, and fifty plus twenty-five is seventy-five. Choice C is only angle D B E, one of the small parts.', show: 'q.answer' },
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
          items: ['An angle bisector makes two equal angles, each half of the whole.', 'When an angle is bisected twice, find each half step by step, then add the parts you need.', 'Equal angles can give an equation to solve.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An angle bisector makes two equal angles, and each one is half of the whole angle.', show: 'sum.0' },
        { say: 'When an angle is bisected twice, find each half step by step, then add the parts you need.', show: 'sum.1' },
        { say: 'And equal angles can give an equation to solve. Well done: you can now construct and use perpendicular bisectors and angle bisectors!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
