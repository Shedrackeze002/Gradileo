import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { tag } from '@/content/math8/videos/lib/m8-3-figures.ts';
import { room, shape, shapeIds } from './lib/m9-7-figures.ts';

type P = [number, number];

const rect = (x: number, y: number, w: number, h: number): P[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

// Rectangle A is 6 cm by 4 cm, and rectangle B is 9 cm by 6 cm: both ratios are 1.5.
const rects = (id: string) =>
  figure(id, [
    shape({ name: 'a', pts: rect(0, 0, 6, 4), rights: [0, 1, 2, 3], sides: [{ tone: 'adj', label: '6\\text{ cm}' }, { tone: 'opp', label: '4\\text{ cm}' }, { tone: 'adj' }, { tone: 'opp' }] }),
    shape({ name: 'b', pts: rect(10.5, 0, 9, 6), tone: 'good', rights: [0, 1, 2, 3], sides: [{ tone: 'adj', label: '9\\text{ cm}' }, { tone: 'opp', label: '6\\text{ cm}' }, { tone: 'adj' }, { tone: 'opp' }] }),
    tag('na', [3, 2], '\\text{A}'),
    tag('nb', [15, 3], '\\text{B}'),
    room('r', [21.8, 0]),
  ]);

// Triangle ABC (AB = 6, BC = 8, CA = 10, right-angled at B) and triangle DEF, its enlargement by
// 1.5 (DE = 9, EF = 12, FD = 15). Matching sides and angles share a colour.
const ABC: P[] = [
  [0, 0],
  [6, 0],
  [6, 8],
];
const DEF: P[] = [
  [11.5, 0],
  [20.5, 0],
  [20.5, 12],
];
const tris = (id: string) =>
  figure(id, [
    shape({ name: 'p', pts: ABC, rights: [1], names: ['A', 'B', 'C'], sides: [{ tone: 'adj' }, { tone: 'opp' }, { tone: 'hyp' }], angles: [{ at: 0, label: '', tone: 'theta' }, { at: 2, label: '', tone: 'good' }] }),
    shape({ name: 'q', pts: DEF, rights: [1], names: ['D', 'E', 'F'], sides: [{ tone: 'adj' }, { tone: 'opp' }, { tone: 'hyp' }], angles: [{ at: 0, label: '', tone: 'theta' }, { at: 2, label: '', tone: 'good' }] }),
  ]);

const video: Explainer = {
  id: 'm9-7-3',
  lessonId: 'm9-7-3',
  title: 'Similar Polygons, Part 1: What Makes Polygons Similar',
  thumbnailTitle: 'What Makes Polygons Similar?',
  thumbnail: 'tr',
  summary:
    'Two polygons are similar when every pair of corresponding angles is equal and every pair of corresponding sides is in the same ratio (proportional). Rectangles 6 cm by 4 cm and 9 cm by 6 cm are similar: all their angles are 90°, and 9/6 = 6/4 = 1.5. In △ABC ∼ △DEF, the order of the letters gives the matching parts: A matches D, B matches E, C matches F, and side AB matches side DE.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 1', title: 'What Makes Polygons Similar?', subtitle: 'Same shape, any size' }],
      lines: [
        { say: 'A model truck, an enlarged photo, and the shadow of a flagpole all involve shapes that are the same shape, but a different size.', show: 'title' },
        { say: 'In maths, these shapes are called similar. In this part, you will learn exactly what similar means, and check whether two polygons are similar.' },
      ],
    },
    {
      chapter: 'Similar polygons',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Similar polygons',
          md: 'Two polygons are **similar** when **both** are true: every pair of **corresponding angles** is equal, **and** every pair of **corresponding sides** is in the same ratio (the sides are **proportional**).',
        },
        { kind: 'callout', id: 'cor', tone: 'key', title: 'Corresponding', md: '**Corresponding** angles and sides are the ones in **matching positions**.' },
      ],
      lines: [
        { say: 'First, a reminder. A polygon is a flat, closed shape with straight sides, like a triangle, a rectangle or a hexagon.' },
        { say: 'Two polygons are similar when one is an exact enlargement or reduction of the other. That means two things must both be true.', show: 'def' },
        { say: 'First, every pair of corresponding angles is equal. Second, every pair of corresponding sides is in the same ratio. When that happens, we say the sides are proportional.' },
        { say: 'Corresponding means matching. Corresponding angles and sides are the ones in matching positions, like the longest side of one shape and the longest side of the other.', show: 'cor' },
      ],
    },
    {
      chapter: 'Two rectangles',
      layout: 'split',
      leftWidth: 600,
      left: [rects('rc')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Rectangle A is $6$ cm by $4$ cm. Rectangle B is $9$ cm by $6$ cm. Are they similar?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Angles: all } 90^\\circ', '\\text{Long: } \\dfrac{9}{6} = 1.5', '\\text{Short: } \\dfrac{6}{4} = 1.5', '\\text{Similar!}'] },
      ],
      lines: [
        { say: 'Let’s check two rectangles. Rectangle A is six centimetres by four centimetres. Rectangle B is nine centimetres by six centimetres. Are they similar?', show: [...shapeIds('rc', 'a', { lens: true }), ...shapeIds('rc', 'b', { lens: true }), 'rc.na', 'rc.nb', 'q'] },
        { say: 'Check the angles first. Every angle of a rectangle is ninety degrees, so all the corresponding angles are equal.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the sides. Match long side with long side. These are blue. Nine over six is one point five.', show: 'm.1', focus: ['m.1', 'rc.a-len0', 'rc.b-len0'] },
        { say: 'Then match short side with short side. These are orange. Six over four is one point five as well.', show: 'm.2', focus: ['m.2', 'rc.a-len1', 'rc.b-len1'] },
        { say: 'The ratios are equal, so the sides are proportional. Both conditions are true, so the rectangles are similar. Rectangle B is rectangle A enlarged by a scale factor of one point five.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Naming similar triangles',
      layout: 'split',
      leftWidth: 560,
      left: [tris('tr')],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\triangle ABC \\sim \\triangle DEF', 'A \\leftrightarrow D, \\quad B \\leftrightarrow E, \\quad C \\leftrightarrow F', 'AB \\leftrightarrow DE, \\quad BC \\leftrightarrow EF', 'CA \\leftrightarrow FD'] },
      ],
      lines: [
        { say: 'Here are two triangles with the same shape. Triangle D E F is an enlargement of triangle A B C.', show: [...shapeIds('tr', 'p', { names: true }), ...shapeIds('tr', 'q', { names: true })] },
        { say: 'We write it like this. The wavy symbol means is similar to. So this says: triangle A B C is similar to triangle D E F.', show: 'm.0', focus: 'm.0' },
        { say: 'The order of the letters tells you which parts correspond. A matches D, B matches E, and C matches F. Matching corners have equal angles. Here they share a colour.', show: ['m.1', 'tr.p-angs', 'tr.q-angs'], focus: ['m.1', 'tr.p-angs', 'tr.q-angs'] },
        { say: 'Sides match in the same way. Side A B uses the first two letters, so it matches side D E, the first two letters of the other triangle. And B C matches E F.', show: 'm.2', focus: ['m.2', 'tr.p-e0', 'tr.q-e0', 'tr.p-e1', 'tr.q-e1'] },
        { say: 'Finally, C A matches F D. You will use this order to find missing sides in a later part.', show: 'm.3', focus: ['m.3', 'tr.p-e2', 'tr.q-e2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Rectangle P is $8$ cm by $6$ cm. Which rectangle is similar to rectangle P?',
          choices: ['$10$ cm by $8$ cm', '$12$ cm by $9$ cm', '$16$ cm by $8$ cm', '$12$ cm by $10$ cm'],
          answer: 1,
          working: '$\\dfrac{12}{8} = 1.5$ and $\\dfrac{9}{6} = 1.5$: the sides are proportional, and every angle of a rectangle is $90^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Rectangle P is eight centimetres by six centimetres. Which rectangle is similar to rectangle P? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is B, twelve centimetres by nine centimetres. Twelve over eight is one point five, and nine over six is one point five, so the sides are proportional. Choice A adds two centimetres to each side, which changes the shape: ten over eight is one point two five, but eight over six is about one point three three.', show: 'q.answer' },
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
            'Similar polygons have equal corresponding angles **and** proportional corresponding sides.',
            'Corresponding parts are in matching positions.',
            'In $\\triangle ABC \\sim \\triangle DEF$, the order of the letters gives the matching parts: $AB$ matches $DE$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Similar polygons have equal corresponding angles, and proportional corresponding sides. Both must be true.', show: 'sum.0' },
        { say: 'Corresponding parts are the ones in matching positions.', show: 'sum.1' },
        { say: 'And in a statement like triangle A B C is similar to triangle D E F, the order of the letters tells you which parts match. In the next part, you will see why one condition on its own is not enough. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
