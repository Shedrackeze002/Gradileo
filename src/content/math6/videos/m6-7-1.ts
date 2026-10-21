import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { fold, join, mark, shape } from '@/content/math5/videos/lib/m5-8-figures.ts';
import { paper, span, tag, type P } from './lib/m6-7-figures.ts';

// The lesson's flag, shape 1, and its reflection in the dashed line m (x = 6), shape 2.
const FLAG: P[] = [
  [1, 1],
  [2, 1],
  [2, 3],
  [4, 4],
  [2, 5],
  [1, 5],
];
const mirror = (pts: P[], x = 6): P[] => pts.map(([a, b]) => [2 * x - a, b]);
const SLID: P[] = FLAG.map(([a, b]) => [a + 7, b]);

const flags = (id: string, o: { spans?: boolean; slid?: boolean } = {}) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 12], y: [0, 6] }),
        fold({ id: 'm', a: [6, -0.3], b: [6, 6.3] }),
        tag({ id: 'm-name', at: [6, 6.3], tex: 'm', place: 'above', tone: 'good' }),
        shape({ id: 's1', pieces: [FLAG], tone: 'adj', shade: 0.3 }),
        tag({ id: 'n1', at: [1.5, 2], tex: '1' }),
        ...(o.slid
          ? [shape({ id: 's3', pieces: [SLID], tone: 'bad', shade: 0.3 }), tag({ id: 'n3', at: [8.5, 2], tex: '3' })]
          : [shape({ id: 's2', pieces: [mirror(FLAG)], tone: 'opp', shade: 0.3 }), tag({ id: 'n2', at: [10.5, 2], tex: '2' })]),
        ...(o.spans
          ? [
              span({ id: 'tip1', a: [4, 4], b: [6, 4], label: '2', side: 'left' }),
              span({ id: 'tip2', a: [6, 4], b: [8, 4], label: '2', side: 'left' }),
              span({ id: 'in1', a: [2, 3], b: [6, 3], label: '4', side: 'right', tone: 'hyp' }),
              span({ id: 'in2', a: [6, 3], b: [10, 3], label: '4', side: 'right', tone: 'hyp' }),
            ]
          : []),
      ),
    ],
    400,
  );

// Drawing a reflection: triangle ABC and the mirror line x = 5, with each corner's distance.
const TRI: P[] = [
  [2, 1],
  [4, 2],
  [2, 4],
];
const drawing = (id: string) =>
  figure(
    id,
    [
      join(
        paper({ x: [0, 10], y: [0, 5] }),
        fold({ id: 'm', a: [5, -0.3], b: [5, 5.3] }),
        shape({ id: 'abc', pieces: [TRI], tone: 'adj', shade: 0.3 }),
        mark({ id: 'A', at: [2, 1], tex: 'A', place: 'left', tone: 'adj' }),
        mark({ id: 'B', at: [4, 2], tex: 'B', place: 'above', tone: 'adj' }),
        mark({ id: 'C', at: [2, 4], tex: 'C', place: 'left', tone: 'adj' }),
        span({ id: 'a1', a: [2, 1], b: [5, 1], label: '3', side: 'right' }),
        span({ id: 'a2', a: [5, 1], b: [8, 1], label: '3', side: 'right' }),
        span({ id: 'b1', a: [4, 2], b: [5, 2] }),
        span({ id: 'b2', a: [5, 2], b: [6, 2] }),
        span({ id: 'c1', a: [2, 4], b: [5, 4], label: '3', side: 'left' }),
        span({ id: 'c2', a: [5, 4], b: [8, 4], label: '3', side: 'left' }),
        mark({ id: 'A2', at: [8, 1], tex: "A'", place: 'right', tone: 'opp' }),
        mark({ id: 'B2', at: [6, 2], tex: "B'", place: 'above', tone: 'opp' }),
        mark({ id: 'C2', at: [8, 4], tex: "C'", place: 'right', tone: 'opp' }),
        shape({ id: 'img', pieces: [mirror(TRI, 5)], tone: 'opp', shade: 0.3 }),
      ),
    ],
    400,
  );

const video: Explainer = {
  id: 'm6-7-1',
  lessonId: 'm6-7-1',
  title: 'Symmetry Between Shapes, Part 1: Reflections',
  thumbnailTitle: 'Reflections',
  thumbnail: 'fl',
  summary:
    'A reflection flips a shape over a mirror line: each point of the image is the same distance from the line as the matching point, on the other side, and the image faces the opposite way. Two shapes related by one reflection have reflection symmetry. Checking a flag and its mirror image corner by corner, drawing a reflection by counting squares, and why a copy that faces the same way was slid, not flipped.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Symmetry and Congruence · Part 1', title: 'Reflections', subtitle: 'Flipping a shape over a mirror line' }],
      lines: [
        { say: 'Look at a butterfly, a snowflake or a patchwork quilt. You can find shapes that match each other exactly.', show: 'title' },
        { say: 'In this video, you will learn how two matching shapes can be related by a flip, called a reflection.' },
      ],
    },
    {
      chapter: 'Reflection',
      layout: 'split',
      leftWidth: 620,
      left: [flags('fl')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection', md: 'A **reflection** flips a shape over a line, like a mirror. The line is the **mirror line**. Each point of the image is the same distance from the line as the matching point, but on the other side.' }],
      lines: [
        { say: 'Here is a flag shape on squared paper. We call it shape one.', show: ['fl.paper', 'fl.s1', 'fl.n1'] },
        { say: 'The green dashed line is called line m. Imagine it is a mirror.', show: ['fl.m', 'fl.m-name'], focus: 'fl.m' },
        { say: 'Shape two is what you would see in the mirror. It is the mirror image of shape one.', show: ['fl.s2', 'fl.n2'] },
        { say: 'A reflection flips a shape over a line, like a mirror. The line is called the mirror line. The new shape is called the image.', show: 'def' },
        { say: 'Each point of the image is the same distance from the mirror line as the matching point of the shape, but on the other side.' },
      ],
    },
    {
      chapter: 'Checking a reflection',
      layout: 'split',
      leftWidth: 620,
      left: [flags('ck', { spans: true })],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection symmetry', md: 'Two shapes have **reflection symmetry** when one reflection maps one shape exactly onto the other.' },
      ],
      lines: [
        { say: 'How can you check that shape two is a reflection of shape one? Count squares from the mirror line.', show: ['ck.paper', 'ck.m', 'ck.m-name', 'ck.s1', 'ck.n1', 'ck.s2', 'ck.n2'] },
        { say: 'Pick a corner of shape one: the tip of the flag. It is two squares to the left of line m.', show: 'ck.tip1', focus: 'ck.tip1' },
        { say: 'The tip of shape two is two squares to the right of line m, at the same height. That matches.', show: 'ck.tip2', focus: 'ck.tip2' },
        { say: 'Try another corner, where the flag meets the pole. It is four squares to the left of the line, and its matching corner is four squares to the right.', show: ['ck.in1', 'ck.in2'], focus: ['ck.in1', 'ck.in2'] },
        { say: 'Every corner matches this way, and shape two faces the opposite way. So the shapes are related by a reflection.' },
        { say: 'We say two shapes have reflection symmetry when one reflection maps one shape exactly onto the other. Maps onto means it lands exactly on top of it.', show: 'def' },
      ],
    },
    {
      chapter: 'Drawing a reflection',
      layout: 'split',
      leftWidth: 560,
      left: [drawing('dr')],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Count how far each corner is from the mirror line.', 'Count the same distance on the other side, at the same height.', 'Join the new corners in the same order.'],
        },
      ],
      lines: [
        { say: 'Now let’s draw a reflection. Here is triangle A B C, and a mirror line.', show: ['dr.paper', 'dr.m', 'dr.abc', 'dr.A', 'dr.B', 'dr.C'] },
        { say: 'First, count how far each corner is from the mirror line. Corner A is three squares away. Count three more squares on the other side, at the same height. That is where A prime goes, the image of A.', show: ['b.0', 'b.1', 'dr.a1', 'dr.a2', 'dr.A2'], focus: ['dr.a1', 'dr.a2'] },
        { say: 'Corner B is one square from the line, so B prime is one square on the other side.', show: ['dr.b1', 'dr.b2', 'dr.B2'], focus: ['dr.b1', 'dr.b2'] },
        { say: 'Corner C is three squares from the line, so C prime is three squares on the other side.', show: ['dr.c1', 'dr.c2', 'dr.C2'], focus: ['dr.c1', 'dr.c2'] },
        { say: 'Last, join the new corners in the same order. The image is a triangle that faces the other way.', show: ['b.2', 'dr.img'], focus: 'dr.img' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 620,
      left: [flags('sl', { slid: true })],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A slide is not a flip', md: 'If a copy faces the **same** way as the shape, it was slid, not flipped. A mirror image always faces the opposite way.' }],
      lines: [
        { say: 'Watch out. Here is shape one again, and a copy of it, shape three, on the other side of the line.', show: ['sl.paper', 'sl.m', 'sl.m-name', 'sl.s1', 'sl.n1', 'sl.s3', 'sl.n3'] },
        { say: 'Both flags point to the right. Shape three faces the same way as shape one. It was slid across, not flipped.', focus: 'sl.s3' },
        { say: 'Count squares to check. The tip of shape one is two squares from the line, but the tip of shape three is five squares from it. The distances do not match.' },
        { say: 'So if a copy faces the same way as the shape, it is not a reflection. A mirror image always faces the opposite way.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A corner of a shape is $3$ squares to the left of a vertical mirror line. Where is the matching corner of its reflection?',
          choices: ['$3$ squares to the left of the line', '$6$ squares to the right of the line', '$3$ squares to the right of the line, at the same height', '$3$ squares above the line'],
          answer: 2,
          working: 'A reflection keeps each point the same distance from the mirror line, on the other side, at the same height.',
        },
      ],
      lines: [
        { say: 'Your turn. A corner of a shape is three squares to the left of a vertical mirror line. Where is the matching corner of its reflection? Pause the video and try it.', show: 'q', wait: 6 },
        {
          say: 'The answer is C: three squares to the right of the line, at the same height. A reflection keeps every point the same distance from the mirror line, but on the other side. Choice B gives six squares, which is the distance from the corner to its image, not to the line.',
          show: 'q.answer',
        },
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
          items: ['A reflection flips a shape over a mirror line.', 'Each point of the image is the same distance from the line, on the other side.', 'The image faces the opposite way. A copy that faces the same way was slid, not flipped.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A reflection flips a shape over a mirror line.', show: 'sum.0' },
        { say: 'Each point of the image is the same distance from the line as the matching point, but on the other side.', show: 'sum.1' },
        { say: 'And the image faces the opposite way. A copy that faces the same way was slid, not flipped. In the next part, you will turn shapes, with rotations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
