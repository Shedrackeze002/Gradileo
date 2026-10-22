import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure, triangularPrism, triangularPrismNet } from '@/video/solids.ts';

// A box and its net: the front 2 long and 1.5 high, the ends 1 wide (as in the lesson's net).
const name = (s: string) => `\\text{${s}}`;
const boxFig = figure('bx', [box({ l: 4, w: 2, h: 3 })], 420);
const netFig = (id: string) =>
  figure(id, [boxNet({ l: 2, w: 1, h: 1.5, areas: { front: name('front'), back: name('back'), top: name('top'), bottom: name('bottom'), left: name('end'), right: name('end') } })], 460);

// Amara's net: three equal rectangles and two equilateral triangles, and the prism it folds into.
const dakota = figure(
  'dk',
  [triangularPrismNet({ a: 1.2, b: 1.2, c: 1.2, l: 2.4 }), triangularPrism({ name: 'p', at: [5, 0.6], b: 1.2, t: 1.04, l: 2.4 })],
  520,
);

const video: Explainer = {
  id: 'm8-8-2-b',
  lessonId: 'm8-8-2',
  title: 'Nets of Three-Dimensional Objects, Part 2: What Is a Net?',
  thumbnailTitle: 'What Is a Net?',
  thumbnail: 'nt',
  summary:
    'A net is a flat pattern that folds up into a 3-D object, with each face of the object appearing once. A box unfolds into 6 rectangles in 3 matching pairs. A net with 2 triangles and 3 rectangles folds into a triangular prism. Count the faces of a net and name their shapes: two matching ends joined by rectangles make a prism, one base with triangles all around makes a pyramid, and two circles and a rectangle make a cylinder.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 2', title: 'What Is a Net?', subtitle: 'Unfold a box and lay it flat' }],
      lines: [
        { say: 'Carefully unglue a cereal box and flatten it out. You get a flat pattern of rectangles, all joined together.', show: 'title' },
        { say: 'That flat pattern is called a net. In this video, you will learn what a net is, and how to tell which 3-D object a net folds into.' },
      ],
    },
    {
      chapter: 'What is a net?',
      layout: 'split',
      leftWidth: 480,
      left: [boxFig],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Net', md: 'A **net** is a flat pattern that folds up into a 3-D object. Each face of the object appears **once** in its net.' }],
      lines: [
        { say: 'Here is a closed box. It is a rectangular prism, with six faces.', show: ['bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face'] },
        { say: 'A net is the flat shape you get when you unfold a solid. It is a flat pattern that folds up into the 3-D object.', show: 'def' },
        { say: 'Every face of the object appears exactly once in its net. Nothing is missing, and nothing is there twice.', focus: 'def' },
      ],
    },
    {
      chapter: 'The net of a box',
      layout: 'center',
      main: [netFig('nt')],
      lines: [
        { say: 'Here is a net of the box. Look for the long strip of four rectangles across the middle: an end, the front, the other end, and the back.', show: ['nt.fb', 'nt.ends', 'nt.front-area', 'nt.back-area', 'nt.left-area', 'nt.right-area'] },
        { say: 'Fold the strip up along its lines, and it wraps around the four sides of the box.', focus: ['nt.fb', 'nt.ends'] },
        { say: 'Two more rectangles are flaps, joined to the front. One folds over to make the top, and the other folds under to make the bottom.', show: ['nt.tb', 'nt.top-area', 'nt.bottom-area'], focus: 'nt.tb' },
        { say: 'So the net has six rectangles, in three matching pairs: the front and back, the top and bottom, and the two ends. It folds into a rectangular prism.', focus: 'nt' },
      ],
    },
    {
      chapter: 'Which object?',
      layout: 'center',
      main: [dakota],
      lines: [
        { say: 'Amara cuts out this net and folds it up. Which 3-D object does it make?', show: ['dk.strip', 'dk.bases'] },
        { say: 'Count the faces and name their shapes. The net has two triangles, and they are the same size. They will be matching ends.', focus: 'dk.bases' },
        { say: 'The three rectangles wrap around, and join the two ends.', focus: 'dk.strip' },
        { say: 'Two matching triangle ends, joined by rectangles: that is a triangular prism.', show: ['dk.p-shape', 'dk.p-front-face', 'dk.p-side-face'], focus: 'dk.p-shape' },
      ],
    },
    {
      chapter: 'Read the faces',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The net has…', 'It folds into…'],
          rows: [
            ['Two matching ends, joined by rectangles', 'a **prism**'],
            ['One base, with triangles all around it', 'a **pyramid**'],
            ['Two circles and a rectangle', 'a **cylinder**'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the faces', md: 'Count the faces in a net and name their shapes. The shape of the ends, or of the base, names the object.' },
      ],
      lines: [
        { say: 'Here is a tip for any net. Count the faces, and name their shapes.', show: 'tip' },
        { say: 'Two matching ends joined by rectangles make a prism. The shape of the ends names it: triangles make a triangular prism.', show: 't.0', focus: 't.0' },
        { say: 'One base with triangles all around it makes a pyramid. The triangles fold up and meet at a point.', show: 't.1', focus: 't.1' },
        { say: 'And two circles and a rectangle make a cylinder, like a can. You will see that net in a later part.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A net has one square and four triangles. Each triangle is joined to one side of the square. Which object does it fold into?',
          choices: ['A triangular prism', 'A square pyramid', 'A cube', 'A rectangular prism'],
          answer: 1,
          working: 'One square base with triangles all around it: the triangles fold up and meet at a point. That is a square pyramid.',
        },
      ],
      lines: [
        { say: 'Your turn. A net has one square and four triangles. Each triangle is joined to one side of the square. Which object does it fold into? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, a square pyramid. The square is the base, and the four triangles fold up and meet at a point. Choice A, a triangular prism, would need two triangles joined by three rectangles.', show: 'q.answer' },
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
          items: ['A net is a flat pattern that folds into a 3-D object.', 'Each face appears once in the net.', 'Count the faces and name their shapes to tell what a net makes.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A net is a flat pattern that folds up into a 3-D object.', show: 'sum.0' },
        { say: 'Each face of the object appears exactly once in its net.', show: 'sum.1' },
        { say: 'To tell what a net makes, count its faces and name their shapes. In the next part, you will find out which patterns of squares fold into a cube. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
