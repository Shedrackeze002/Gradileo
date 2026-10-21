import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { dots } from '@/video/graph.ts';
import { NAMES, PRIMES, QUAD, around, flipped, mirror, onIds, shapeOn, sheet, slid, turn, turned } from './lib/m8-9-figures.ts';

// The lesson's quadrilateral ABCD and three images, each with an arrow inside every shape showing
// which way its vertices go round, A to B to C to D:
// - slid 8 right and 2 up: counterclockwise, like ABCD, and facing the same way;
// - reflected in the line x = 6: clockwise, the opposite way;
// - turned a half turn about (8, 3): upside down, but still counterclockwise.
const R = { r: 0.6 };
const gt = sheet({ x: [0, 13], y: [0, 8] });
const slide = (id: string) =>
  figure(id, [
    gt,
    shapeOn(gt, { id: 't', pts: QUAD, names: NAMES }),
    shapeOn(gt, { id: 'i', pts: slid, names: PRIMES, tone: 'good' }),
    around(gt, 'ot', QUAD, 'ccw', R),
    around(gt, 'oi', slid, 'ccw', { ...R, tone: 'good' }),
  ]);

const gr = sheet({ x: [0, 12], y: [0, 6] });
const flip = (id: string) =>
  figure(id, [
    gr,
    mirror(gr, { id: 'm', x: 6 }),
    shapeOn(gr, { id: 't', pts: QUAD, names: NAMES }),
    shapeOn(gr, { id: 'i', pts: flipped, names: PRIMES, tone: 'good' }),
    around(gr, 'ot', QUAD, 'ccw', R),
    around(gr, 'oi', flipped, 'cw', { ...R, tone: 'good' }),
  ]);

const gh = sheet({ x: [0, 16], y: [0, 6] });
const halfTurn = (id: string) =>
  figure(id, [
    gh,
    shapeOn(gh, { id: 't', pts: QUAD, names: NAMES }),
    shapeOn(gh, { id: 'i', pts: turned, names: PRIMES, tone: 'good' }),
    around(gh, 'ot', QUAD, 'ccw', R),
    around(gh, 'oi', turned, 'ccw', { ...R, tone: 'good' }),
    turn(gh, { id: 'tn', about: [8, 3], from: [6.7, 3], deg: 180, r: 1.3 }),
    dots(gh, [{ id: 'c', x: 8, y: 3, tex: '', tone: 'theta' }]),
  ]);

const pair = (id: string) => [`${id}.paper`, ...onIds(id, 't'), ...onIds(id, 'i')];

const video: Explainer = {
  id: 'm8-9-2-b',
  lessonId: 'm8-9-2',
  title: 'Congruence and Transformations, Part 2: Which Transformation?',
  thumbnailTitle: 'Which Transformation?',
  thumbnail: 'rf',
  summary:
    'To tell which transformation moved a shape, trace the vertices in order, A to B to C to D, on the shape and on its image. A reflection makes a mirror image, so the vertices go round the opposite way. A translation and a rotation keep the same direction: a translation faces the same way, while a rotation is turned. An image that looks upside down but still goes counterclockwise, like ABCD, is a half turn, not a flip.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Congruent Polygons · Part 2', title: 'Which Transformation?', subtitle: 'Slide, flip or turn' }],
      lines: [
        { say: 'A shape and its image are always congruent. But if you see only the two shapes, can you tell how the shape was moved?', show: 'title' },
        { say: 'In this video, you will learn a simple test that tells a slide, a flip and a turn apart.' },
      ],
    },
    {
      chapter: 'Going round the vertices',
      layout: 'split',
      leftWidth: 760,
      left: [slide('tr')],
      right: [
        { kind: 'text', id: 't', size: 'md', md: 'Trace the vertices in order: $A \\to B \\to C \\to D$. Do they go **clockwise** or **counterclockwise**?' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Clockwise', md: '**Clockwise** is the way the hands of a clock turn. **Counterclockwise** is the other way.' },
      ],
      lines: [
        { say: 'Here is the test. Trace around the vertices in order: A, then B, then C, then D, and back to A. Notice which way you are going.', show: ['tr.paper', ...onIds('tr', 't'), 't'] },
        { say: 'Clockwise is the way the hands of a clock turn. Counterclockwise is the other way.', show: 'def' },
        { say: 'In A B C D, you go right from A to B, up to C, then up and to the left to D. That is counterclockwise, as the yellow arrow shows.', show: 'tr.ot', focus: 'tr.ot' },
        { say: 'This image came from a translation. Trace A prime, B prime, C prime, D prime. It goes counterclockwise as well, and it faces the same way as the original.', show: [...onIds('tr', 'i'), 'tr.oi'], focus: 'tr.oi' },
      ],
    },
    {
      chapter: 'A flip',
      layout: 'split',
      leftWidth: 760,
      left: [flip('rf')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: "$ABCD$ goes counterclockwise, and $A'B'C'D'$ goes clockwise. Which transformation was used?" },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A flip reverses the direction', md: 'A mirror swaps left and right, so it also swaps clockwise and counterclockwise.' },
      ],
      lines: [
        { say: 'Now look at this pair. The original goes counterclockwise, just as before.', show: [...pair('rf'), 'rf.ot', 'q'], focus: 'rf.ot' },
        { say: 'But trace the image: A prime, B prime, C prime, D prime. It goes clockwise! The direction is reversed.', show: 'rf.oi', focus: 'rf.oi' },
        { say: 'Only a flip reverses the direction. So this is a reflection. The mirror line is the vertical line halfway between the two shapes.', show: 'rf.m', focus: 'rf.m' },
        { say: 'A mirror swaps left and right, so it also swaps clockwise and counterclockwise.', show: 'key' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'split',
      leftWidth: 760,
      left: [halfTurn('ht')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A half turn is not a flip', md: "$A'B'C'D'$ looks upside down, but it still goes **counterclockwise**. It is a **rotation**." }],
      lines: [
        { say: 'Watch out. This image looks upside down, so you might think it was flipped.', show: pair('ht') },
        { say: 'But trace its vertices: A prime, B prime, C prime, D prime. They still go counterclockwise, the same way as A B C D.', show: ['ht.ot', 'ht.oi'], focus: ['ht.ot', 'ht.oi'] },
        { say: 'So it is not a reflection. It is a rotation: a half turn about the yellow dot. Check the direction of the vertices before you decide.', show: ['ht.tn', 'ht.c', 'oops'], focus: ['ht.tn', 'ht.c'] },
      ],
    },
    {
      chapter: 'The three tests',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The image…', 'Transformation'],
          rows: [
            ['goes round the **same** way and faces the **same** way', 'translation'],
            ['goes round the **same** way, but is **turned**', 'rotation'],
            ['goes round the **opposite** way: a mirror image', 'reflection'],
          ],
        },
      ],
      lines: [
        { say: 'Put it all together. If the image goes round the same way as the original, and faces the same way, it is a translation.', show: 't', focus: 't.0' },
        { say: 'If it goes round the same way, but it is turned to face a new way, it is a rotation.', focus: 't.1' },
        { say: 'And if it goes round the opposite way, it is a mirror image: a reflection.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "In triangle $ABC$, the vertices $A \\to B \\to C$ go **clockwise**. In its image $A'B'C'$, they also go **clockwise**, and the image is **turned** to face a new way. Which transformation was used?",
          choices: ['a reflection', 'a translation', 'an enlargement', 'a rotation'],
          answer: 3,
          working: 'The vertices go round the same way, so the shape was not flipped. It is turned to face a new way, so it is a **rotation**.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle A B C, the vertices go clockwise. In its image, they also go clockwise, and the image is turned to face a new way. Which transformation was used? Pause the video and try it.', show: 'q', wait: 7 },
        { say: 'The answer is D: a rotation. The vertices go round the same way, so it was not a flip, and the image is turned. Choice A is wrong, because a reflection would reverse the direction of the vertices.', show: 'q.answer' },
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
          items: ['Trace the vertices of the shape and of its image, in order.', 'A reflection reverses the direction. A translation or a rotation does not.', 'A translation faces the same way. A rotation is turned.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To tell the transformations apart, trace the vertices of the shape and of its image, in order.', show: 'sum.0' },
        { say: 'A reflection reverses the direction. A translation or a rotation does not.', show: 'sum.1' },
        { say: 'And a translation faces the same way, while a rotation is turned. In the next part, you will decide whether shapes on a grid are congruent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
