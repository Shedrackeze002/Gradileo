import type { DiagramTone, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { caption, dir, polygon, regularCorners, tileAt } from './lib/m303-3-figures.ts';

type P = [number, number];

const TONES: DiagramTone[] = ['adj', 'opp', 'good', 'theta', 'hyp', 'brand'];

/** `count` regular polygons with `n` sides meeting at the point `at`, each a part `<name><k>`, with its angle there. */
const around = (name: string, n: number, count: number, at: P, side: number, start = 0): Part[] =>
  Array.from({ length: count }, (_, k) => tileAt({ id: `${name}${k}`, n, side, at, from: start + (k * 180 * (n - 2)) / n, tone: TONES[k % TONES.length], angle: '' }));

/** Three regular pentagons round a point, leaving a 36° gap at the bottom. */
const O: P = [0, 0];
const gap: Part = {
  points: { g0: O, g1: [1.6 * dir(252)[0], 1.6 * dir(252)[1]], g2: [1.6 * dir(288)[0], 1.6 * dir(288)[1]] },
  items: [
    { kind: 'region', id: 'gap-fill', points: ['g0', 'g1', 'g2'], tone: 'bad', shade: 0.45, group: 'gap' },
    { kind: 'angle', id: 'gap-a', at: 'g0', from: 'g1', to: 'g2', tone: 'bad', r: 50, label: '36^\\circ', labelDist: 110, group: 'gap' },
  ],
};

/** Two regular octagons sharing a side, with a square in the gap above the shared corner. */
const named = (v: P[]) => Object.fromEntries(v.map((p, i) => [`v${i}`, p]));
const s = 1.2;
const a = s / (2 * Math.tan(Math.PI / 8));
const octA = regularCorners(8, { side: s });
const octB = regularCorners(8, { side: s, c: [2 * a, 0] });
const sq: P[] = [[a, s / 2], [a + s / Math.SQRT2, s / 2 + s / Math.SQRT2], [a, s / 2 + s * Math.SQRT2], [a - s / Math.SQRT2, s / 2 + s / Math.SQRT2]];

const video: Explainer = {
  id: 'm303-3-3-d',
  lessonId: 'm303-3-3',
  title: 'Problems with Polygons, Part 4: Tiling with Regular Polygons',
  thumbnailTitle: 'Tiling with Regular Polygons',
  thumbnail: 'pg',
  summary: 'Tiles fit around a point with no gaps or overlaps only when the angles meeting there add to exactly 360°. On their own, only equilateral triangles (6 × 60°), squares (4 × 90°) and regular hexagons (3 × 120°) work; three regular pentagons leave a 36° gap. Two regular octagons leave 360° − 270° = 90°, which a square fills.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Triangles, Quadrilaterals and Polygons · Part 4', title: 'Tiling with Regular Polygons', subtitle: 'Angles that make 360°' }],
      lines: [
        { say: 'A tile setter covering a floor needs tiles that fit together with no gaps and no overlaps. Some regular polygons do that, and some never can.', show: 'title' },
        { say: 'In this video, you will use angles to find out which regular polygons tile a floor, on their own or together.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Tiles around a point', md: 'Tiles fit around a point with no gaps and no overlaps only when the angles meeting at that point add to **exactly** $360^\\circ$.' }],
      lines: [
        { say: 'Look at any point on a tiled floor where corners of tiles meet. Together, the tiles go all the way around that point.', show: 'key' },
        { say: 'So the angles of the tiles at that point must add to exactly 360 degrees. Less than 360 leaves a gap, and more than 360 means the tiles overlap.' },
      ],
    },
    {
      chapter: 'Tiles that work alone',
      layout: 'center',
      main: [
        figure('al', [
          ...around('t', 3, 6, [0, 0], 1.6),
          caption({ id: 't-cap', at: [0, -2.5], tex: '6 \\times 60^\\circ = 360^\\circ' }),
          ...around('s', 4, 4, [4.6, 0], 1.3),
          caption({ id: 's-cap', at: [4.6, -2.5], tex: '4 \\times 90^\\circ = 360^\\circ' }),
          ...around('h', 6, 3, [9.4, 0.25], 1.1, 30),
          caption({ id: 'h-cap', at: [9.4, -2.5], tex: '3 \\times 120^\\circ = 360^\\circ' }),
        ]),
      ],
      lines: [
        { say: 'Which regular polygons can tile a floor on their own? An equilateral triangle has sixty-degree angles, and six of them make exactly 360 degrees. So triangles fit.', show: ['al.t0', 'al.t1', 'al.t2', 'al.t3', 'al.t4', 'al.t5', 'al.t-cap'] },
        { say: 'A square has ninety-degree angles, and four of them make 360. Squares fit, as on any tiled floor.', show: ['al.s0', 'al.s1', 'al.s2', 'al.s3', 'al.s-cap'] },
        { say: 'A regular hexagon has 120-degree angles, and three of them make 360. Hexagons fit too, as in a honeycomb.', show: ['al.h0', 'al.h1', 'al.h2', 'al.h-cap'] },
        { say: 'Those are the only three. Each works because its angle divides exactly into 360.' },
      ],
    },
    {
      chapter: 'Pentagons leave a gap',
      layout: 'split',
      left: [
        figure('pg', [
          ...around('p', 5, 3, O, 1.6, 288).map((part) => ({ ...part, items: part.items.map((it) => (it.kind === 'angle' ? { ...it, label: '108^\\circ', r: 34, labelDist: 88 } : it)) })),
          gap,
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\times 108^\\circ = 324^\\circ', '360^\\circ - 324^\\circ = 36^\\circ \\text{ gap}', '4 \\times 108^\\circ = 432^\\circ \\text{ overlap}'] }],
      lines: [
        { say: 'What about regular pentagons? Each angle of a regular pentagon is 108 degrees.', show: ['pg.p0', 'pg.p1'] },
        { say: 'Put three around a point: three times 108 is 324 degrees.', show: ['pg.p2', 'm.0'], focus: 'm.0' },
        { say: 'That leaves 360 minus 324, a gap of 36 degrees, which no regular pentagon can fill.', show: ['pg.gap', 'm.1'], focus: ['pg.gap', 'm.1'] },
        { say: 'And a fourth pentagon would need 432 degrees, far more than 360, so it would overlap. Regular pentagons cannot tile a floor on their own.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Octagons and squares',
      layout: 'split',
      left: [
        figure('oc', [
          polygon({ name: 'a', corners: named(octA), names: false, tone: 'adj', angles: [{ at: 'v3', label: '135^\\circ', tone: 'adj', r: 34, labelDist: 80 }] }),
          polygon({ name: 'b', corners: named(octB), names: false, tone: 'opp', angles: [{ at: 'v6', label: '135^\\circ', tone: 'opp', r: 34, labelDist: 80 }] }),
          polygon({ name: 'c', corners: named(sq), names: false, tone: 'good', shade: 0.35, angles: [{ at: 'v0', label: '?', tone: 'theta', id: 'q', r: 30 }, { at: 'v0', label: '90^\\circ', tone: 'theta', id: 'v', r: 30 }] }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['360^\\circ - 2(135^\\circ) = 90^\\circ', '90^\\circ \\to \\text{a square}'] }],
      lines: [
        { say: 'Different regular polygons can work together. Two regular octagons meet at a corner. What angle is left, and which regular polygon fills it?', show: ['oc.a-shape', 'oc.b-shape', 'oc.a-av3', 'oc.b-av6'] },
        { say: 'Each angle of a regular octagon is 135 degrees. So the two octagons use two times 135, which is 270 degrees.', show: ['oc.c-q'], focus: ['oc.a-av3', 'oc.b-av6'] },
        { say: 'That leaves 360 minus 270, which is ninety degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'A regular polygon with ninety-degree angles is a square, so a square fills the gap exactly. Octagons and squares together make a common floor pattern.', show: ['m.1', 'oc.c-shape', 'oc.c-v'], hide: 'oc.c-q', focus: ['m.1', 'oc.c-shape'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each angle of a regular 12-sided polygon is $150^\\circ$. Two of them meet at a corner. Which regular polygon fills the gap that is left?',
          choices: ['A square', 'A regular hexagon', 'An equilateral triangle', 'A regular pentagon'],
          answer: 2,
          working: '$360^\\circ - 2(150^\\circ) = 60^\\circ$. A regular polygon with $60^\\circ$ angles is an equilateral triangle.',
        },
      ],
      lines: [
        { say: 'Your turn. Each angle of a regular twelve-sided polygon is 150 degrees. Two of them meet at a corner. Which regular polygon fills the gap that is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, an equilateral triangle. Two angles of 150 degrees make 300, which leaves sixty degrees, the angle of an equilateral triangle. Choice A, a square, would need a ninety-degree gap.', show: 'q.answer' },
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
            'Tiles fit around a point when the angles there add to exactly $360^\\circ$.',
            'On their own, only equilateral triangles, squares and regular hexagons tile.',
            'Regular pentagons leave a $36^\\circ$ gap; two octagons leave room for a square.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Tiles fit around a point with no gaps when the angles meeting there add to exactly 360 degrees.', show: 'sum.0' },
        { say: 'On their own, only equilateral triangles, squares and regular hexagons can tile a floor.', show: 'sum.1' },
        { say: 'Regular pentagons leave a gap, but different polygons can work together, like two octagons and a square. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
