import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

// Talia's eyes are 1.5 m up, 2 m from a mirror on the ground; the mirror is 12 m from the base of
// a flagpole, so the pole is 12 × 1.5 / 2 = 9 m tall. Both triangles have the angle at the mirror
// whose tangent is 0.75 (about 37°), drawn to the same scale.
const mirror = (o: { numbers?: boolean; h?: string } = {}): Part => {
  const points: Record<string, P> = {
    g0: [-1.4, 0],
    g1: [15, 0],
    feet: [0, 0],
    eye: [0, 1.5],
    m: [2, 0],
    ma: [1.65, 0],
    mb: [2.35, 0],
    base: [14, 0],
    top: [14, 9],
  };
  const lab = (tex: string) => (o.numbers ? { label: tex, labelSide: 'right' as const } : {});
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'g0' },
    { kind: 'thing', id: 'pole', type: 'flagpole', at: 'base', top: 'top' },
    { kind: 'thing', id: 'person', type: 'person', at: 'feet', top: 'eye' },
    { kind: 'line', id: 'eh', from: 'feet', to: 'eye', tone: 'opp', weight: 3, ...(o.numbers ? { label: '1.5\\text{ m}', labelSide: 'left' as const } : {}), group: 'small' },
    { kind: 'line', id: 'ed', from: 'feet', to: 'm', tone: 'adj', weight: 3, ...lab('2\\text{ m}'), group: 'small' },
    { kind: 'right', id: 'er', at: 'feet', from: 'eye', to: 'm', group: 'small' },
    { kind: 'line', id: 'ph', from: 'base', to: 'top', tone: 'opp', weight: 3, ...(o.h ? { label: o.h, labelSide: 'left' as const } : {}), group: 'big' },
    { kind: 'line', id: 'pd', from: 'm', to: 'base', tone: 'adj', weight: 3, ...lab('12\\text{ m}'), group: 'big' },
    { kind: 'right', id: 'pr', at: 'base', from: 'top', to: 'm', group: 'big' },
    { kind: 'line', id: 'mirror', from: 'ma', to: 'mb', tone: 'ink', weight: 9 },
    { kind: 'line', id: 'in', from: 'top', to: 'm', tone: 'theta', dashed: true, arrow: true, group: 'light' },
    { kind: 'line', id: 'out', from: 'm', to: 'eye', tone: 'theta', dashed: true, arrow: true, group: 'light' },
    { kind: 'angle', id: 'a1', at: 'm', from: 'base', to: 'top', tone: 'theta', r: 34 },
    { kind: 'angle', id: 'a2', at: 'm', from: 'eye', to: 'feet', tone: 'theta', r: 34 },
  ];
  return { points, items };
};

const video: Explainer = {
  id: 'm9-7-3-e',
  lessonId: 'm9-7-3',
  title: 'Similar Polygons, Part 5: The Mirror Method',
  thumbnailTitle: 'The Mirror Method',
  thumbnail: 'mm',
  summary:
    'Light leaves a mirror at the same angle it arrives, so a mirror on the ground makes two similar right triangles: one with a person’s eye height and their distance to the mirror, and one with a flagpole’s height and its distance to the mirror. Talia’s eyes are 1.5 m up, 2 m from the mirror, and the mirror is 12 m from the pole: h/12 = 1.5/2, so h = 9 m.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Similarity and Scale · Part 5', title: 'The Mirror Method', subtitle: 'Similar triangles from a reflection' }],
      lines: [
        { say: 'No sunshine today? A small mirror lying on the ground can measure a height as well.', show: 'title' },
        { say: 'In this part, you will see why a mirror makes similar triangles, and use them to find the height of a flagpole.' },
      ],
    },
    {
      chapter: 'How the mirror works',
      layout: 'center',
      main: [figure('hw', [mirror()], 460)],
      lines: [
        { say: 'Lay a mirror flat on the ground between you and a flagpole. Then step back until you can see the top of the flagpole in the mirror.', show: ['hw.ground', 'hw.pole', 'hw.person', 'hw.mirror'] },
        { say: 'Light travels from the top of the pole down to the mirror, and bounces up into your eyes.', show: 'hw.light', focus: 'hw.light' },
        { say: 'Light leaves a mirror at the same angle it arrives. So the angle between the ground and the light coming in equals the angle between the ground and the light going out.', show: ['hw.a1', 'hw.a2'], focus: ['hw.a1', 'hw.a2'] },
        { say: 'The person and the flagpole both stand straight up, so each triangle has a right angle on the ground.', show: ['hw.small', 'hw.big'], focus: ['hw.er', 'hw.pr'] },
        { say: 'Two pairs of equal angles means the third pair is equal as well. So the small triangle and the big triangle are similar.', focus: ['hw.small', 'hw.big'] },
      ],
    },
    {
      chapter: 'Finding the height',
      layout: 'split',
      leftWidth: 720,
      left: [figure('mm', [mirror({ numbers: true, h: 'h' })])],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'Talia’s eyes are $1.5$ m above the ground. She stands $2$ m from a mirror that is $12$ m from the base of a flagpole, and sees the top of the pole in the mirror. How tall is the flagpole?' },
      ],
      lines: [
        { say: 'Talia’s eyes are one point five metres above the ground. She stands two metres from a mirror that is twelve metres from the base of a flagpole. She sees the top of the pole in the mirror. How tall is the flagpole?', show: ['q', 'mm'] },
        { say: 'In each triangle, match the height with the height, in orange, and the distance along the ground with the distance along the ground, in blue.', focus: ['mm.eh', 'mm.ph', 'mm.ed', 'mm.pd'] },
      ],
    },
    {
      chapter: 'Solving the proportion',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{h}{12} = \\dfrac{1.5}{2}', '\\dfrac{1.5}{2} = 0.75', 'h = 12 \\times 0.75 = 9', '\\text{Check: } k = \\dfrac{12}{2} = 6, \\quad 6 \\times 1.5 = 9 \\;\\checkmark'] },
        { kind: 'text', id: 'a', size: 'md', align: 'center', md: 'The flagpole is **9 m** tall.' },
      ],
      lines: [
        { say: 'Step one: write the proportion. h over twelve equals one point five over two.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: one point five over two is zero point seven five. In both triangles, the height is zero point seven five times the distance along the ground.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three: h is twelve times zero point seven five, which is nine. The flagpole is nine metres tall.', show: ['m.2', 'a'], focus: 'm.2' },
        { say: 'Check with a scale factor. Twelve metres is six times two metres, so the big triangle is six times the small one. Six times one point five is nine. The same answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Maya’s eyes are $1.6$ m above the ground. Maya stands $2$ m from a mirror on the ground and sees the top of a tree in it. The mirror is $10$ m from the base of the tree. How tall is the tree?',
          choices: ['$8$ m', '$12.5$ m', '$9.6$ m', '$3.2$ m'],
          answer: 0,
          working: '$\\dfrac{h}{10} = \\dfrac{1.6}{2} = 0.8$, so $h = 10 \\times 0.8 = 8$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. Maya’s eyes are one point six metres above the ground. Maya stands two metres from a mirror on the ground, and sees the top of a tree in it. The mirror is ten metres from the base of the tree. How tall is the tree? Pause the video and try it.', show: 'q', wait: 8 },
        { say: 'The answer is A, eight metres. Height over ground distance is one point six over two, or zero point eight, so the tree is ten times zero point eight, which is eight metres. Choice B flips the ratio, dividing the ground distance by the height.', show: 'q.answer' },
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
            'Light leaves a mirror at the same angle it arrives, so the two triangles beside the mirror are similar.',
            'Match height with height, and ground distance with ground distance: $\\dfrac{h}{12} = \\dfrac{1.5}{2}$.',
            'Shadows and mirrors let you find heights you cannot reach.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Light leaves a mirror at the same angle it arrives, so the two right triangles beside the mirror are similar.', show: 'sum.0' },
        { say: 'Match height with height, and ground distance with ground distance, then solve the proportion.', show: 'sum.1' },
        { say: 'With shadows and mirrors, similar triangles let you find heights you cannot reach. Well done on finishing this lesson!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
