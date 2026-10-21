import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { moved, poly, polyIds } from './lib/m8-9-figures.ts';

type P = [number, number];

// Triangle ABC: AB = 6 cm, BC = 9 cm, CA = 7 cm, drawn to scale, so its angles are A ≈ 87°,
// B ≈ 51° and C ≈ 42°. Triangle DEF is the same triangle flipped over and turned a quarter turn.
const ABC: Record<string, P> = { A: [0, 0], B: [6, 0], C: [0.333, 6.992] };
const DEF = moved(ABC, { flip: true, turn: -90, to: [11.4, 2.4], names: ['D', 'E', 'F'] });

const pair = (id: string, o: { measures?: boolean; marks?: boolean } = {}) =>
  figure(id, [
    poly({
      name: 'p',
      corners: ABC,
      places: { B: 'below' },
      ...(o.measures ? { sides: { AB: '6\\text{ cm}', BC: '9\\text{ cm}', CA: '7\\text{ cm}' }, angles: { A: '87^\\circ', B: '51^\\circ', C: '42^\\circ' } } : {}),
      ...(o.marks ? { ticks: { AB: 1, BC: 2, CA: 3 }, arcs: { A: 1, B: 2, C: 3 } } : {}),
    }),
    poly({
      name: 'q',
      corners: DEF,
      places: { D: 'below' },
      tone: 'good',
      ...(o.measures ? { sides: { DE: '6\\text{ cm}', EF: '9\\text{ cm}', FD: '7\\text{ cm}' }, angles: { D: '87^\\circ', E: '51^\\circ', F: '42^\\circ' } } : {}),
      ...(o.marks ? { ticks: { DE: 1, EF: 2, FD: 3 }, arcs: { D: 1, E: 2, F: 3 } } : {}),
    }),
  ]);

const both = (id: string) => [...polyIds(id, 'p'), ...polyIds(id, 'q')];

const video: Explainer = {
  id: 'm8-9-1',
  lessonId: 'm8-9-1',
  title: 'Congruent Polygons, Part 1: Same Size, Same Shape',
  thumbnailTitle: 'Same Size, Same Shape',
  thumbnail: 'mk',
  summary:
    'Two polygons are congruent when they have exactly the same size and the same shape, so one fits exactly on top of the other after a slide, a turn or a flip. The parts that land on each other are corresponding parts: corresponding sides are equal in length and corresponding angles are equal in measure. Triangle ABC with sides 6, 9 and 7 cm and angles 87°, 51° and 42° is congruent to triangle DEF, its flipped and turned copy. Tick marks show equal sides and arcs show equal angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 1', title: 'Same Size, Same Shape', subtitle: 'Shapes that match exactly' }],
      lines: [
        { say: 'Two pieces of a quilt, two wings of a model plane, two panels of a roof frame. Each pair has to match exactly, or the job does not fit together.', show: 'title' },
        { say: 'In this video, you will learn what it means for two shapes to be congruent, and how to find the parts that match.' },
      ],
    },
    {
      chapter: 'Congruent shapes',
      layout: 'split',
      leftWidth: 680,
      left: [pair('cg')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Congruent',
          md: 'Two polygons are **congruent** when they have the **same size** and the **same shape**. One fits exactly on top of the other, even if you have to turn it or flip it first.',
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\triangle ABC \\cong \\triangle DEF'] },
      ],
      lines: [
        { say: 'First, a word you will hear a lot. A polygon is a flat, closed shape with straight sides, like a triangle or a rectangle. Its corners are called vertices.', show: polyIds('cg', 'p') },
        { say: 'Here is a second triangle, D E F. Imagine tracing triangle A B C onto a sheet of thin paper.', show: polyIds('cg', 'q') },
        { say: 'Now flip the paper over, and turn it. The tracing fits exactly on top of triangle D E F. Every side and every corner lines up.', focus: ['cg.p-shape', 'cg.q-shape'] },
        { say: 'Two shapes are congruent when they have exactly the same size and the same shape, so one fits exactly on top of the other.', show: 'def', focus: 'cg' },
        { say: 'You may have to slide it, turn it or flip it first. But you can never stretch it or shrink it.' },
        { say: 'We write it like this. The symbol in the middle means is congruent to. It is an equals sign, for the same size, with a wavy line above it, for the same shape.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Corresponding parts',
      layout: 'split',
      leftWidth: 680,
      left: [pair('cp', { measures: true })],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Corresponding parts',
          md: 'Parts that land on each other are **corresponding** parts. Corresponding sides are **equal**, and corresponding angles are **equal**.',
        },
      ],
      lines: [
        { say: 'When one shape sits exactly on top of a congruent shape, the parts that land on each other are called corresponding parts. Corresponding means matching.', show: [...both('cp'), 'def'] },
        { say: 'Side A B lands on side D E. Both are six centimetres long.', show: ['cp.p-len-AB', 'cp.q-len-DE'], focus: ['cp.p-len-AB', 'cp.q-len-DE'] },
        { say: 'Side B C lands on side E F, and both are nine centimetres long. Side C A lands on side F D, and both are seven centimetres long.', show: ['cp.p-lens', 'cp.q-lens'], focus: ['cp.p-len-BC', 'cp.q-len-EF', 'cp.p-len-CA', 'cp.q-len-FD'] },
        { say: 'The angles match in the same way. Angle A matches angle D, and both are eighty-seven degrees.', show: ['cp.p-deg-A', 'cp.q-deg-D'], focus: ['cp.p-deg-A', 'cp.q-deg-D'] },
        { say: 'Angle B matches angle E, at fifty-one degrees. And angle C matches angle F, at forty-two degrees.', show: ['cp.p-degs', 'cp.q-degs'], focus: ['cp.p-deg-B', 'cp.q-deg-E', 'cp.p-deg-C', 'cp.q-deg-F'] },
        { say: 'So in polygons that are congruent, every pair of corresponding sides is equal, and every pair of corresponding angles is equal. A triangle has three of each, so that is six pairs of equal parts.', focus: 'cp' },
      ],
    },
    {
      chapter: 'Marking equal parts',
      layout: 'split',
      leftWidth: 680,
      left: [pair('mk', { marks: true })],
      right: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Matching marks', md: '**Tick marks** across sides show equal sides. **Arcs** in corners show equal angles. Parts with the **same number** of marks are equal.' },
      ],
      lines: [
        { say: 'Diagrams often show the matching parts with small marks, instead of numbers.', show: [...both('mk'), 'tip'] },
        { say: 'Tick marks show equal sides. One tick mark is on side A B and on side D E, so those two sides are equal.', show: ['mk.p-t-AB', 'mk.q-t-DE'], focus: ['mk.p-t-AB', 'mk.q-t-DE', 'mk.p-AB', 'mk.q-DE'] },
        { say: 'Two tick marks are on B C and E F. And three tick marks are on C A and F D.', show: ['mk.p-t-BC', 'mk.q-t-EF', 'mk.p-t-CA', 'mk.q-t-FD'], focus: ['mk.p-t-BC', 'mk.q-t-EF', 'mk.p-t-CA', 'mk.q-t-FD'] },
        { say: 'Arcs in the corners show equal angles. One arc marks angle A and angle D. Two arcs mark angles B and E, and three arcs mark angles C and F.', show: ['mk.p-m-A', 'mk.q-m-D', 'mk.p-m-B', 'mk.q-m-E', 'mk.p-m-C', 'mk.q-m-F'], focus: ['mk.p-m-A', 'mk.q-m-D', 'mk.p-m-B', 'mk.q-m-E', 'mk.p-m-C', 'mk.q-m-F'] },
        { say: 'The number of marks tells you which parts match, even when one shape is turned or flipped over, like this one.', focus: 'mk' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two polygons are congruent. Which of these **must** be true?',
          choices: ['They face the same way on the page.', 'Their corresponding angles are equal.', 'One is a larger copy of the other.', 'Their sides match, but their angles can be different.'],
          answer: 1,
          working: 'Congruent polygons have the same size and the same shape, so **all** corresponding sides and **all** corresponding angles are equal. A congruent copy can be turned or flipped, so it does not have to face the same way.',
        },
      ],
      lines: [
        { say: 'Your turn. Two polygons are congruent. Which of these must be true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B: their corresponding angles are equal. Shapes that are congruent match in every side and in every angle. Choice A is wrong, because a congruent copy can be turned or flipped, like triangle D E F.', show: 'q.answer' },
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
            'Two polygons are **congruent** when they have the same size and the same shape: one fits exactly on top of the other.',
            'The symbol $\\cong$ means "is congruent to".',
            'Corresponding sides are equal, and corresponding angles are equal.',
            'Tick marks show equal sides, and arcs show equal angles.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Two polygons are congruent when they have the same size and the same shape. One fits exactly on top of the other, after a slide, a turn or a flip.', show: 'sum.0' },
        { say: 'This symbol means is congruent to.', show: 'sum.1' },
        { say: 'Corresponding sides are equal, and corresponding angles are equal.', show: 'sum.2' },
        { say: 'And tick marks and arcs show which parts match. In the next part, you will write a statement of congruence, where the order of the letters tells you which parts match. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
