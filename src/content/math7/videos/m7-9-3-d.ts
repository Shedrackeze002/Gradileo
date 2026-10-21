import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { around, base, cart, mirror, pt, shapeIds, swing, tag, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// Three pairs from this unit, each with an arrow inside every triangle showing which way its
// vertices go round, A to B to C:
// - a translation, 5 right and 3 down: A(−4, 1), B(−1, 1), C(−3, 4) (counterclockwise, and so is
//   the image);
// - a reflection in the y-axis: A(1, 1), B(5, 2), C(2, 4) (counterclockwise; the image goes
//   clockwise);
// - a half turn: A(1, 2), B(4, 1), C(3, 4) (counterclockwise, and so is the image).
const TR: P[] = [
  [-4, 1],
  [-1, 1],
  [-3, 4],
];
const RF: P[] = [
  [1, 1],
  [5, 2],
  [2, 4],
];
const RT: P[] = [
  [1, 2],
  [4, 1],
  [3, 4],
];

const gt = cart({ y: [-3, 5] });
const translation = (id: string) =>
  figure(id, [
    gt,
    triangle(gt, { id: 't', corners: TR, names: ['A', 'B', 'C'], places: ['below left', 'below right', 'above left'] }),
    triangle(gt, { id: 'i', corners: TR.map(([x, y]) => [x + 5, y - 3] as P), names: ["A'", "B'", "C'"], places: ['below left', 'below right', 'above left'], tone: 'good' }),
    around(gt, 'ot', TR, 'ccw'),
    around(gt, 'oi', TR.map(([x, y]) => [x + 5, y - 3] as P), 'ccw', { tone: 'good' }),
  ]);

const gr = cart({ x: [-6, 6], y: [-1, 5] });
const reflection = (id: string) =>
  figure(id, [
    gr,
    mirror(gr, 'm', 'y'),
    triangle(gr, { id: 't', corners: RF, names: ['A', 'B', 'C'], places: ['below right', 'right', 'above right'] }),
    triangle(gr, { id: 'i', corners: RF.map(([x, y]) => [-x, y] as P), names: ["A'", "B'", "C'"], places: ['below left', 'left', 'above left'], tone: 'good' }),
    around(gr, 'ot', RF, 'ccw'),
    around(gr, 'oi', RF.map(([x, y]) => [-x, y] as P), 'cw', { tone: 'good' }),
  ]);

const gh = cart();
const rotation = (id: string) =>
  figure(id, [
    gh,
    triangle(gh, { id: 't', corners: RT, names: ['A', 'B', 'C'], places: ['above left', 'below right', 'above right'] }),
    triangle(gh, { id: 'i', corners: RT.map(([x, y]) => [-x, -y] as P), names: ['', "B'", "C'"], places: ['above', 'left', 'below left'], tone: 'good' }),
    // A' sits next to the y-axis numbers, so its name goes just inside the triangle.
    pt(gh, 'i-0', -1, -2, '', 'above', 'good'),
    tag(gh, 'i-0name', -1.75, -2.15, "A'", 'center', 'good'),
    around(gh, 'ot', RT, 'ccw'),
    around(gh, 'oi', RT.map(([x, y]) => [-x, -y] as P), 'ccw', { tone: 'good' }),
    swing(gh, 'turn', 1, 63, 243, 'theta'),
  ]);

const pair = (id: string) => [...base(id), ...shapeIds(id, 't'), ...shapeIds(id, 'i')];

const video: Explainer = {
  id: 'm7-9-3-d',
  lessonId: 'm7-9-3',
  title: 'Reflections and Rotations, Part 4: Which Transformation?',
  thumbnailTitle: 'Which Transformation?',
  thumbnail: 'rf',
  summary:
    'To tell which transformation moved a shape, compare it with its image. A reflection flips the shape, so if A to B to C goes round one way, A′ to B′ to C′ goes round the other way. A translation and a rotation keep the same order; a translation keeps the shape facing the same way, while a rotation turns it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 4', title: 'Which Transformation?', subtitle: 'Slide, flip or turn' }],
      lines: [
        { say: 'You have met three transformations: a slide, a flip and a turn. Each one moves a shape to an image of the same size and shape.', show: 'title' },
        { say: 'So if you only see a shape and its image, how can you tell which one it was? In this video, you will learn to tell them apart.' },
      ],
    },
    {
      chapter: 'Going round the vertices',
      layout: 'split',
      leftWidth: 640,
      left: [translation('tr')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'Go round the vertices in order: $A \\to B \\to C$. Is that **clockwise** or **counterclockwise**?' }],
      lines: [
        { say: 'Here is a useful test. Go round the vertices of the shape in order: A, then B, then C. Notice which way you are going.', show: [...base('tr'), ...shapeIds('tr', 't'), 't'] },
        { say: 'In triangle A B C, you go from A right to B, then up to C, then back to A. That is counterclockwise, as the arrow shows.', show: 'tr.ot', focus: 'tr.ot' },
        { say: 'Now do the same for the image: A prime, then B prime, then C prime. This image came from a translation. It also goes counterclockwise, the same as the original.', show: [...shapeIds('tr', 'i'), 'tr.oi'], focus: 'tr.oi' },
      ],
    },
    {
      chapter: 'A reflection reverses the order',
      layout: 'split',
      leftWidth: 660,
      left: [reflection('rf')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Reflections flip the order', md: 'A **reflection** flips the shape. If $A \\to B \\to C$ goes round one way, $A\' \\to B\' \\to C\'$ goes round the **other way**.' }],
      lines: [
        { say: 'Now try a reflection in the y-axis. In triangle A B C, the vertices go round counterclockwise.', show: [...pair('rf'), 'rf.m', 'rf.ot'], focus: 'rf.ot' },
        { say: 'But in the image, A prime, B prime, C prime go round clockwise. The order is reversed!', show: 'rf.oi', focus: 'rf.oi' },
        { say: 'That is because a reflection flips the shape over, like a mirror. A mirror swaps left and right, so it also swaps clockwise and counterclockwise.', show: 'key' },
      ],
    },
    {
      chapter: 'A rotation keeps the order',
      layout: 'split',
      leftWidth: 640,
      left: [rotation('rt')],
      right: [{ kind: 'text', id: 't', size: 'md', md: 'A **translation** and a **rotation** keep the same order. A translation keeps the shape **facing the same way**. A rotation **turns** it.' }],
      lines: [
        { say: 'Here is a half turn about the origin. The original goes round counterclockwise.', show: [...pair('rt'), 'rt.i-0name', 'rt.turn', 'rt.ot'], focus: 'rt.ot' },
        { say: 'The image is upside down, but its vertices still go round counterclockwise. A rotation turns the shape. It never flips it, so the order stays the same.', show: 'rt.oi', focus: 'rt.oi' },
        { say: 'So how do you tell a translation from a rotation? Both keep the order. A translation keeps the shape facing the same way, but a rotation turns it to face a new way.', show: 't' },
      ],
    },
    {
      chapter: 'Three questions',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['What you see', 'Transformation'],
          rows: [
            ['The order of the vertices is reversed.', 'reflection'],
            ['Same order, facing the same way.', 'translation'],
            ['Same order, turned to face a new way.', 'rotation'],
          ],
        },
      ],
      lines: [
        { say: 'Put it all together. First, go round the vertices of the shape and of the image. If the order is reversed, it is a reflection.', show: 't.0', focus: 't.0' },
        { say: 'If the order is the same and the image faces the same way as the original, it is a translation.', show: 't.1', focus: 't.1' },
        { say: 'And if the order is the same but the image is turned to face a new way, it is a rotation.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "In triangle $ABC$, the vertices $A \\to B \\to C$ go round **counterclockwise**. In its image, $A' \\to B' \\to C'$ go round **clockwise**. Which transformation was it?",
          choices: ['a translation', 'a rotation of $90^\\circ$', 'a reflection', 'a rotation of $180^\\circ$'],
          answer: 2,
          working: 'The order of the vertices is reversed, so the shape was flipped. Only a reflection flips a shape.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle A B C, the vertices go round counterclockwise. In its image, they go round clockwise. Which transformation was it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: a reflection. The order of the vertices is reversed, so the shape was flipped. Choice D, a rotation, turns the shape but keeps the same order.', show: 'q.answer' },
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
          items: ['Go round the vertices of the shape and of its image, in order.', 'A reflection reverses the order. Translations and rotations do not.', 'A translation faces the same way. A rotation turns the shape.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To tell the transformations apart, go round the vertices of the shape and of its image, in order.', show: 'sum.0' },
        { say: 'A reflection reverses the order. Translations and rotations keep it.', show: 'sum.1' },
        { say: 'A translation keeps the shape facing the same way, and a rotation turns it. Well done! You can now slide, flip and turn shapes in the Cartesian plane.', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
