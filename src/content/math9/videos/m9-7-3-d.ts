import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

// Mateo (1.6 m tall) casts a 2.4 m shadow; a tree casts a 15 m shadow, so it is 15 × 1.6 / 2.4 =
// 10 m tall. Both drawn to the same scale on flat ground, with the sun's rays parallel.
const shadows = (o: { numbers?: boolean; h?: string } = {}): Part => {
  const points: Record<string, P> = {
    g0: [-1.2, 0],
    g1: [21, 0],
    pf: [0, 0],
    ph: [0, 1.6],
    pe: [0, 1.45],
    ps: [2.4, 0],
    tf: [6, 0],
    tt: [6, 10],
    ts: [21, 0],
  };
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'g0' },
    { kind: 'thing', id: 'tree', type: 'tree', at: 'tf', top: 'tt' },
    { kind: 'thing', id: 'person', type: 'person', at: 'pf', top: 'pe' },
    { kind: 'line', id: 'ph-line', from: 'pf', to: 'ph', tone: 'opp', weight: 3, ...(o.numbers ? { label: '1.6\\text{ m}', labelSide: 'left' as const } : {}), group: 'small' },
    { kind: 'line', id: 'ps-line', from: 'pf', to: 'ps', tone: 'adj', ...(o.numbers ? { label: '2.4\\text{ m}', labelSide: 'right' as const } : {}), group: 'small' },
    { kind: 'line', id: 'pray', from: 'ph', to: 'ps', tone: 'theta', dashed: true, group: 'small' },
    { kind: 'right', id: 'pr', at: 'pf', from: 'ph', to: 'ps', group: 'small' },
    { kind: 'line', id: 'th-line', from: 'tf', to: 'tt', tone: 'opp', ...(o.h ? { label: o.h, labelSide: 'left' as const } : {}), group: 'big' },
    { kind: 'line', id: 'ts-line', from: 'tf', to: 'ts', tone: 'adj', ...(o.numbers ? { label: '15\\text{ m}', labelSide: 'right' as const } : {}), group: 'big' },
    { kind: 'line', id: 'tray', from: 'tt', to: 'ts', tone: 'theta', dashed: true, group: 'big' },
    { kind: 'right', id: 'tr', at: 'tf', from: 'tt', to: 'ts', group: 'big' },
    { kind: 'angle', id: 'pa', at: 'ps', from: 'ph', to: 'pf', tone: 'theta', r: 30 },
    { kind: 'angle', id: 'ta', at: 'ts', from: 'tt', to: 'tf', tone: 'theta', r: 30 },
  ];
  return { points, items };
};

const video: Explainer = {
  id: 'm9-7-3-d',
  lessonId: 'm9-7-3',
  title: 'Similar Polygons, Part 4: Heights from Shadows',
  thumbnailTitle: 'Heights from Shadows',
  thumbnail: 'sn',
  summary:
    'At the same moment, the sun’s rays meet the ground at the same angle everywhere, so a person and their shadow make a triangle similar to the one made by a tree and its shadow. Mateo is 1.6 m tall with a 2.4 m shadow, and a tree’s shadow is 15 m long: h/15 = 1.6/2.4, so h = 15 × 2/3 = 10 m. Using the scale factor 15/2.4 = 6.25 gives the same answer: 1.6 × 6.25 = 10 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 4', title: 'Heights from Shadows', subtitle: 'Measure a tree without climbing it' }],
      lines: [
        { say: 'How tall is a tree? You cannot easily climb it with a measuring tape. But on a sunny day, its shadow can tell you.', show: 'title' },
        { say: 'In this part, you will use the similar triangles made by shadows to find a height you cannot reach.' },
      ],
    },
    {
      chapter: 'Why the triangles are similar',
      layout: 'center',
      main: [figure('why', [shadows()], 460)],
      lines: [
        { say: 'Here is a person standing on flat ground, and a tree, at the same moment on a sunny day. Both cast shadows.', show: ['why.ground', 'why.tree', 'why.person', 'why.ps-line', 'why.ts-line'] },
        { say: 'The sun is so far away that its rays arrive in parallel lines. So at the same moment, the rays meet the ground at the same angle everywhere.', show: ['why.pray', 'why.tray', 'why.pa', 'why.ta'], focus: ['why.pa', 'why.ta'] },
        { say: 'The person stands straight up, so there is a right angle at their feet. The person, their shadow and the sun’s ray make a right triangle.', show: ['why.small'], focus: 'why.small' },
        { say: 'The tree, its shadow and the sun’s ray make another right triangle.', show: ['why.big'], focus: 'why.big' },
        { say: 'Both triangles have a right angle, and both have the same angle where the ray meets the ground. The angles of a triangle add to one hundred eighty degrees, so the third angles are equal as well.', focus: ['why.pa', 'why.ta', 'why.pr', 'why.tr'] },
        { say: 'All three pairs of angles are equal, so the triangles are similar. And remember, for triangles, equal angles are enough.', focus: 'why' },
      ],
    },
    {
      chapter: 'A tree’s shadow',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', align: 'center', md: 'Mateo is $1.6$ m tall and casts a shadow $2.4$ m long. At the same time, a tree casts a shadow $15$ m long. How tall is the tree?' },
        figure('sn', [shadows({ numbers: true, h: 'h' })], 420),
      ],
      lines: [
        { say: 'Mateo is one point six metres tall, and casts a shadow two point four metres long. At the same time, a tree casts a shadow fifteen metres long. How tall is the tree?', show: ['q', 'sn'] },
        { say: 'Height matches height, in orange, and shadow matches shadow, in blue. Call the height of the tree h.', focus: ['sn.ph-line', 'sn.th-line', 'sn.ps-line', 'sn.ts-line'] },
      ],
    },
    {
      chapter: 'Solving for the height',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\dfrac{h}{15} = \\dfrac{1.6}{2.4}', '\\dfrac{1.6}{2.4} = \\dfrac{16}{24} = \\dfrac{2}{3}', 'h = \\dfrac{2}{3} \\times 15 = 10'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The tree is **10 m** tall.' },
      ],
      lines: [
        { say: 'Step one: write a proportion. In each triangle, compare the height with the shadow. h over fifteen equals one point six over two point four.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: simplify the known ratio. Multiply the top and bottom by ten to get sixteen over twenty-four. Both divide by eight, so that is two thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'So in both triangles, the height is two thirds of the shadow.' },
        { say: 'Step three: the tree’s height is two thirds of fifteen. One third of fifteen is five, so two thirds is ten. The tree is ten metres tall.', show: ['m.2', 'a'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using the scale factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['k = \\dfrac{15}{2.4} = 6.25', 'h = 1.6 \\times 6.25 = 10 \\text{ m}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two ways, one answer', md: 'Compare height with shadow inside each triangle, or use the scale factor between the triangles. Both give $10$ m.' },
      ],
      lines: [
        { say: 'You can also use a scale factor, like in the last part. The tree’s shadow is fifteen over two point four times as long as Mateo’s shadow. That is six point two five.', show: 'm.0', focus: 'm.0' },
        { say: 'So the tree is six point two five times as tall as Mateo. One point six times six point two five is ten. The same answer: ten metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Either way works, as long as you match height with height, and shadow with shadow.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $2$ m pole casts a $3$ m shadow. At the same time, a building casts a $27$ m shadow. How tall is the building?',
          choices: ['$40.5$ m', '$26$ m', '$18$ m', '$9$ m'],
          answer: 2,
          working: '$\\dfrac{h}{27} = \\dfrac{2}{3}$, so $h = \\dfrac{2}{3} \\times 27 = 18$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A two metre pole casts a three metre shadow. At the same time, a building casts a twenty-seven metre shadow. How tall is the building? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is C, eighteen metres. For the pole, height over shadow is two over three. So the building’s height is two thirds of twenty-seven, which is eighteen. Choice A flips the ratio, and gives a building taller than its shadow, when the pole is shorter than its shadow.', show: 'q.answer' },
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
            'At the same moment, the sun’s rays meet the ground at the same angle, so shadow triangles are similar.',
            'Match height with height and shadow with shadow: $\\dfrac{h}{15} = \\dfrac{1.6}{2.4}$.',
            'Solve the proportion, or use the scale factor between the triangles.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. At the same moment, the sun’s rays meet flat ground at the same angle everywhere, so the triangles made by objects and their shadows are similar.', show: 'sum.0' },
        { say: 'Match height with height, and shadow with shadow, and write a proportion.', show: 'sum.1' },
        { say: 'Then solve it, or use the scale factor between the triangles. In the next part, you will measure a height with a mirror instead of the sun. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
