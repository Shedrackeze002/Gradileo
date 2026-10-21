import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { poly, polyIds } from './lib/m8-9-figures.ts';

type P = [number, number];

// Two equilateral triangles, sides 4 cm and 6 cm: every angle is 60°, but the sizes differ.
const h = (s: number) => (s * Math.sqrt(3)) / 2;
const small: Record<string, P> = { A: [0, 0], B: [4, 0], C: [2, h(4)] };
const large: Record<string, P> = { D: [5.6, 0], E: [11.6, 0], F: [8.6, h(6)] };
const sixty = (k: string[]) => Object.fromEntries(k.map((c) => [c, '60^\\circ']));
const enlarge = (id: string) =>
  figure(id, [
    poly({ name: 'p', corners: small, places: { B: 'below' }, sides: { AB: '4\\text{ cm}', BC: '4\\text{ cm}', CA: '4\\text{ cm}' }, angles: sixty(['A', 'B', 'C']), angleDist: { A: 60, B: 60, C: 60 } }),
    poly({ name: 'q', corners: large, places: { D: 'below' }, tone: 'good', sides: { DE: '6\\text{ cm}', EF: '6\\text{ cm}', FD: '6\\text{ cm}' }, angles: sixty(['D', 'E', 'F']) }),
  ]);

// A square ABCD and a rhombus WXYZ, every side 4 cm. The rhombus has angles 60°, 120°, 60°, 120°.
const square: Record<string, P> = { A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4] };
const rhombus: Record<string, P> = { W: [7.4, 0], X: [11.4, 0], Y: [13.4, 2 * Math.sqrt(3)], Z: [9.4, 2 * Math.sqrt(3)] };
const four = (sides: string[]) => Object.fromEntries(sides.map((s) => [s, '4\\text{ cm}']));
const squareRhombus = (id: string) =>
  figure(id, [
    poly({ name: 'p', corners: square, sides: four(['AB', 'BC', 'CD', 'DA']), rights: ['A', 'B', 'C', 'D'] }),
    poly({ name: 'q', corners: rhombus, tone: 'good', sides: four(['WX', 'XY', 'YZ', 'ZW']), angles: { W: '60^\\circ', X: '120^\\circ', Y: '60^\\circ', Z: '120^\\circ' } }),
  ]);

const video: Explainer = {
  id: 'm8-9-1-e',
  lessonId: 'm8-9-1',
  title: 'Congruent Polygons, Part 5: Are Two Polygons Congruent?',
  thumbnailTitle: 'Are They Congruent?',
  thumbnail: 'sr',
  summary:
    'To decide whether two polygons are congruent, compare every pair of corresponding sides and every pair of corresponding angles: all of them must be equal. Two equilateral triangles with sides of 4 cm and 6 cm have equal angles but different sides, so one is an enlargement of the other, not a congruent copy. A square and a rhombus with 4 cm sides have equal sides, but 90° does not match 60°, so they are not congruent either.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 5', title: 'Are Two Polygons Congruent?', subtitle: 'Check every side and every angle' }],
      lines: [
        { say: 'Two shapes can look a lot alike and still not be congruent. So how can you be sure?', show: 'title' },
        { say: 'In this video, you will check every side and every angle, and see why checking only some of them is not enough.' },
      ],
    },
    {
      chapter: 'Check everything',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Checking for congruence', md: 'Compare **every** pair of corresponding sides **and every** pair of corresponding angles. Two polygons are congruent only when **all** of them are equal.' }],
      lines: [
        { say: 'To decide whether two polygons are congruent, compare every pair of corresponding sides, and every pair of corresponding angles.', show: 'key' },
        { say: 'The polygons are congruent only when all of those pairs are equal. If even one pair is different, the shapes are not congruent.' },
        { say: 'Let’s see two ways this can go wrong: equal angles with different sides, and equal sides with different angles.' },
      ],
    },
    {
      chapter: 'Equal angles are not enough',
      layout: 'split',
      leftWidth: 760,
      left: [enlarge('en')],
      right: [{ kind: 'callout', id: 'en-key', tone: 'mistake', title: 'Same angles, different size', md: 'The angles match, but the sides do not. One is an **enlargement** of the other: **not** congruent.' }],
      lines: [
        { say: 'Here are two triangles. Every angle in both of them is sixty degrees. So every pair of corresponding angles is equal.', show: [...polyIds('en', 'p'), ...polyIds('en', 'q'), 'en.p-degs', 'en.q-degs'], focus: ['en.p-degs', 'en.q-degs'] },
        { say: 'But look at the sides. Each side of the first triangle is four centimetres, and each side of the second is six centimetres.', show: ['en.p-lens', 'en.q-lens'], focus: ['en.p-lens', 'en.q-lens'] },
        { say: 'The second triangle is an enlargement of the first. An enlargement is a bigger copy with the same shape. Same shape, but not the same size, so these triangles are not congruent.', show: 'en-key', focus: 'en' },
      ],
    },
    {
      chapter: 'Equal sides are not enough',
      layout: 'center',
      main: [squareRhombus('sr'), { kind: 'text', id: 't', size: 'md', md: 'A **rhombus** is a quadrilateral with four equal sides. Its angles do not have to be right angles.' }],
      lines: [
        { say: 'Now two quadrilaterals. Quadrilateral A B C D is a square. Each side is four centimetres, and each angle is a right angle: ninety degrees.', show: [...polyIds('sr', 'p'), 'sr.p-lens'] },
        { say: 'Quadrilateral W X Y Z is a rhombus. A rhombus is a quadrilateral with four equal sides. Each side of this one is four centimetres as well.', show: [...polyIds('sr', 'q'), 'sr.q-lens', 't'], focus: ['sr.p-lens', 'sr.q-lens'] },
        { say: 'Every side of the square matches a side of the rhombus. But the rhombus leans over, so its angles are sixty degrees and one hundred twenty degrees, not ninety.', show: 'sr.q-degs', focus: 'sr.q-degs' },
      ],
    },
    {
      chapter: 'Comparing every part',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Parts', 'Square $ABCD$', 'Rhombus $WXYZ$', 'Equal?'],
          rows: [
            ['every side', '$4$ cm', '$4$ cm', 'yes'],
            ['$\\angle A$ and $\\angle W$', '$90^\\circ$', '$60^\\circ$', 'no'],
            ['$\\angle B$ and $\\angle X$', '$90^\\circ$', '$120^\\circ$', 'no'],
            ['$\\angle C$ and $\\angle Y$', '$90^\\circ$', '$60^\\circ$', 'no'],
            ['$\\angle D$ and $\\angle Z$', '$90^\\circ$', '$120^\\circ$', 'no'],
          ],
        },
      ],
      lines: [
        { say: 'Are the square and the rhombus congruent? Check every pair of parts, one at a time.', show: 't' },
        { say: 'Sides first. Every side of both shapes is four centimetres, so all the corresponding sides match.', focus: 't.0' },
        { say: 'Now the angles. Angle A is ninety degrees, but angle W is only sixty degrees. That pair does not match.', focus: 't.1' },
        { say: 'In fact, none of the angles match. So the square and the rhombus are not congruent. Equal sides are not enough: the angles have to match as well.', focus: ['t.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two quadrilaterals each have four $90^\\circ$ angles. One has sides of $2$, $6$, $2$ and $6$ cm. The other has sides of $3$, $4$, $3$ and $4$ cm. Are they congruent?',
          choices: ['Yes, because all their angles are equal.', 'No, because their sides are not equal.', 'Yes, because both have four sides.', 'No, because their angles are not equal.'],
          answer: 1,
          working: 'Every angle matches, but no side of $2\\text{ cm}$ or $6\\text{ cm}$ matches a side of $3\\text{ cm}$ or $4\\text{ cm}$. Equal angles are not enough, so the quadrilaterals are **not** congruent.',
        },
      ],
      lines: [
        { say: 'Your turn. Two quadrilaterals each have four right angles. One has sides of two, six, two and six centimetres. The other has sides of three, four, three and four centimetres. Are they congruent? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B: no, because their sides are not equal. The angles all match, but the sides do not. Choice A is wrong: equal angles are not enough, and every side must match as well.', show: 'q.answer' },
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
            'Congruent polygons have the same size and shape: all corresponding sides and all corresponding angles are equal.',
            'A congruence statement lists the vertices in matching order. Use it, not the picture.',
            'Copy a measure to its corresponding part, then use angle sums if needed.',
            'Check every side and every angle before you say two polygons are congruent.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up this lesson. Polygons that are congruent have the same size and the same shape. All their corresponding sides and all their corresponding angles are equal.', show: 'sum.0' },
        { say: 'A statement of congruence lists the vertices in matching order. Use it, not the picture, to find corresponding parts.', show: 'sum.1' },
        { say: 'To find a missing measure, copy it from its corresponding part, then use the angle sum if you need to.', show: 'sum.2' },
        { say: 'And check every side and every angle before you say two polygons are congruent. Well done!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
