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
const rad = (d: number) => (d * Math.PI) / 180;

// A 4 m square and an 8 m by 4 m rectangle: equal angles, but 8/4 = 2 and 4/4 = 1.
const squareRect = (id: string) =>
  figure(id, [
    shape({ name: 'a', pts: rect(0, 0, 4, 4), rights: [0, 1, 2, 3], sides: [{ tone: 'adj', label: '4\\text{ m}' }, { tone: 'opp', label: '4\\text{ m}' }] }),
    shape({ name: 'b', pts: rect(8, 0, 8, 4), tone: 'good', rights: [0, 1, 2, 3], sides: [{ tone: 'adj', label: '8\\text{ m}' }, { tone: 'opp', label: '4\\text{ m}' }] }),
    tag('na', [2, 2], '\\text{A}'),
    tag('nb', [12, 2], '\\text{B}'),
    room('r', [17.9, 0]),
  ]);

// A 3 cm square and a rhombus with 5 cm sides and angles of 60° and 120°.
const rh: P[] = [
  [4.6, 0],
  [9.6, 0],
  [9.6 + 5 * Math.cos(rad(60)), 5 * Math.sin(rad(60))],
  [4.6 + 5 * Math.cos(rad(60)), 5 * Math.sin(rad(60))],
];
const squareRhombus = (id: string) =>
  figure(id, [
    shape({ name: 'a', pts: rect(0, 0, 3, 3), rights: [0, 1, 2, 3], sides: [{ label: '3\\text{ cm}' }, { label: '3\\text{ cm}' }] }),
    shape({ name: 'b', pts: rh, tone: 'good', sides: [{ label: '5\\text{ cm}' }, { label: '5\\text{ cm}' }], angles: [{ at: 0, label: '60^\\circ' }, { at: 1, label: '120^\\circ', dist: 52 }] }),
    room('r', [13.4, 0]),
  ]);

// A 10 cm by 15 cm photo and a 20 cm by 25 cm print: 10 cm was added to each side.
const photoPrint = (id: string) =>
  figure(id, [
    shape({ name: 'a', pts: rect(0, 0, 10, 15), sides: [{ tone: 'adj', label: '10\\text{ cm}' }, undefined, undefined, { tone: 'opp', label: '15\\text{ cm}' }] }),
    shape({ name: 'b', pts: rect(15, 0, 20, 25), tone: 'good', sides: [{ tone: 'adj', label: '20\\text{ cm}' }, { tone: 'opp', label: '25\\text{ cm}' }] }),
    tag('na', [5, 7.5], '\\text{Photo}'),
    tag('nb', [25, 12.5], '\\text{Print}'),
    room('l', [-7, 0]),
    room('r', [42, 0]),
  ]);

// Two triangles with angles of 50°, 60° and 70°: the second is the first enlarged by 1.5.
const tri = (x: number, c: number): P[] => {
  const b = (c * Math.sin(rad(60))) / Math.sin(rad(70));
  return [
    [x, 0],
    [x + c, 0],
    [x + b * Math.cos(rad(50)), b * Math.sin(rad(50))],
  ];
};
const angles = [
  { at: 0, label: '50^\\circ' },
  { at: 1, label: '60^\\circ' },
  { at: 2, label: '70^\\circ', dist: 62 },
];
const twoTris = (id: string) =>
  figure(
    id,
    [shape({ name: 'a', pts: tri(0, 6), angles }), shape({ name: 'b', pts: tri(8, 9), tone: 'good', angles })],
    380,
  );

const video: Explainer = {
  id: 'm9-7-3-b',
  lessonId: 'm9-7-3',
  title: 'Similar Polygons, Part 2: One Condition Is Not Enough',
  thumbnailTitle: 'One Condition Is Not Enough',
  thumbnail: 'sr',
  summary:
    'Polygons need equal angles and proportional sides to be similar. A 4 m square and an 8 m by 4 m rectangle have equal angles, but 8/4 = 2 while 4/4 = 1, so they are not similar. A 3 cm square and a 5 cm rhombus have proportional sides, but the rhombus has a 60° angle, so they are not similar either. Similar does not mean the same size, and adding the same amount to every side changes the shape. For triangles, one condition is enough.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 2', title: 'One Condition Is Not Enough', subtitle: 'Check the angles and the sides' }],
      lines: [
        { say: 'To be similar, two polygons need equal angles and proportional sides. Is one of those enough on its own? Let’s find out.', show: 'title' },
        { say: 'In this part, you will see why you must check both, and meet the one kind of shape where a single check is enough.' },
      ],
    },
    {
      chapter: 'Equal angles, but not similar',
      layout: 'split',
      leftWidth: 600,
      left: [squareRect('sr')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Angles: all } 90^\\circ \\;\\checkmark', '\\text{Long: } \\dfrac{8}{4} = 2', '\\text{Short: } \\dfrac{4}{4} = 1', '2 \\ne 1: \\text{ not similar}'] }],
      lines: [
        { say: 'Here is a square with four metre sides, and a rectangle that is eight metres by four metres.', show: [...shapeIds('sr', 'a', { lens: true }), ...shapeIds('sr', 'b', { lens: true }), 'sr.na', 'sr.nb'] },
        { say: 'Both shapes have four right angles, so their corresponding angles are equal. That is one condition.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the sides. Long side to long side: eight over four is two.', show: 'm.1', focus: ['m.1', 'sr.a-len0', 'sr.b-len0'] },
        { say: 'Short side to short side: four over four is one.', show: 'm.2', focus: ['m.2', 'sr.a-len1', 'sr.b-len1'] },
        { say: 'Two and one are not equal, so the sides are not proportional. The rectangle is the square stretched in one direction only. These shapes are not similar.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Proportional sides, but not similar',
      layout: 'split',
      leftWidth: 680,
      left: [squareRhombus('rh')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Sides: } \\dfrac{5}{3} \\text{ every time} \\;\\checkmark', '\\text{Angles: } 60^\\circ \\ne 90^\\circ', '\\text{Not similar}'] }],
      lines: [
        { say: 'Now a square with three centimetre sides, and a rhombus with five centimetre sides. A rhombus has four equal sides, like a square that has been pushed over.', show: [...shapeIds('rh', 'a', { lens: true }), ...shapeIds('rh', 'b', { lens: true })] },
        { say: 'Every side of the rhombus is five centimetres, and every side of the square is three centimetres. So every pair of sides has the same ratio, five over three. The sides are proportional.', show: 'm.0', focus: 'm.0' },
        { say: 'But look at the angles. The rhombus has a sixty degree angle, and every angle of the square is ninety degrees.', show: 'rh.b-angs', focus: ['m.1', 'rh.b-angs'] },
        { say: 'The angles are not equal, so these shapes are not similar either. You must check the angles and the sides.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 560,
      left: [photoPrint('pp')],
      right: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Similar does not mean same size', md: 'Same shape **and** same size is **congruent**. Adding the same amount to every side does **not** make a similar shape.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{20}{10} = 2, \\quad \\dfrac{25}{15} \\approx 1.67'] },
      ],
      lines: [
        { say: 'Here are two common mistakes. First, similar does not mean the same size. Shapes with the same shape and the same size are called congruent. Similar shapes can be very different sizes.', show: 'oops' },
        { say: 'Second, adding the same amount to every side does not keep the shape. A ten centimetre by fifteen centimetre photo and a twenty centimetre by twenty-five centimetre print are not similar.', show: [...shapeIds('pp', 'a', { lens: true }), ...shapeIds('pp', 'b', { lens: true }), 'pp.na', 'pp.nb'] },
        { say: 'Twenty over ten is two, but twenty-five over fifteen is only about one point six seven. Ten centimetres was added to each side, and that changed the shape. The print is a little squarer than the photo.', show: 'm', focus: 'm' },
        { say: 'To keep the shape, you must multiply every side by the same number, not add the same amount.' },
      ],
    },
    {
      chapter: 'Triangles are special',
      layout: 'center',
      main: [
        twoTris('tt'),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Triangles are special', md: 'For triangles, **one** condition is enough. Equal angles mean the sides are proportional, and proportional sides mean the angles are equal.' },
      ],
      lines: [
        { say: 'Triangles are special. For triangles, one condition is enough.', show: [...shapeIds('tt', 'a'), ...shapeIds('tt', 'b')] },
        { say: 'These two triangles both have angles of fifty, sixty and seventy degrees. Because the angles are equal, the sides are sure to be proportional. Here, every side of the bigger triangle is one and a half times as long.', show: ['tt.a-angs', 'tt.b-angs'], focus: ['tt.a-angs', 'tt.b-angs'] },
        { say: 'It works the other way as well. If the three pairs of sides of two triangles are proportional, the angles are sure to be equal.', show: 'tip' },
        { say: 'So to show that two triangles are similar, you only need to check one of the two conditions.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which pair of shapes **must** be similar?',
          choices: ['Two rectangles', 'Two rhombuses', 'A square and a rectangle', 'Two triangles, each with angles of $40^\\circ$, $60^\\circ$ and $80^\\circ$'],
          answer: 3,
          working: 'For triangles, equal angles are enough: the sides are sure to be proportional. Two rectangles always have equal angles, but their sides may not be proportional.',
        },
      ],
      lines: [
        { say: 'Your turn. Which pair of shapes must be similar? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is D. For triangles, equal angles are enough, so the sides are sure to be proportional. Choice A is wrong: two rectangles always have equal angles, but their sides may not be proportional, like the square and the eight metre by four metre rectangle.', show: 'q.answer' },
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
            'Equal angles alone, or proportional sides alone, are **not** enough for polygons.',
            'Similar does not mean the same size; same shape and same size is **congruent**.',
            'Adding the same amount to every side changes the shape. Multiply instead.',
            'For **triangles**, one condition is enough.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. For polygons in general, equal angles alone, or proportional sides alone, are not enough. Check both.', show: 'sum.0' },
        { say: 'Similar does not mean the same size. Same shape and same size is called congruent.', show: 'sum.1' },
        { say: 'Adding the same amount to every side changes the shape. To keep the shape, multiply.', show: 'sum.2' },
        { say: 'And for triangles, one condition is enough. In the next part, you will use similar triangles to find a missing side. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
