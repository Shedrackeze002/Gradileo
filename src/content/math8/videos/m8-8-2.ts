import type { Explainer } from '@/video/script.ts';
import { box, figure, squarePyramid, triangularPrism } from '@/video/solids.ts';
import { faceParts, note } from './lib/m8-8-figures.ts';

// A chocolate-bar box: a triangular prism with equilateral ends, lying on a rectangle.
const bar = (id: string, height?: number) => figure(id, [faceParts(), triangularPrism({ b: 3, t: 2.6, l: 6 })], height);

// A rectangular prism, a triangular prism and a square pyramid side by side, each named.
const family = figure(
  'fm',
  [
    box({ name: 'bx', at: [0, 0], l: 3, w: 2, h: 2.4 }),
    note('bx-name', [2.3, -0.6], '\\text{rectangular prism}', { place: 'below' }),
    triangularPrism({ name: 'tp', at: [6.2, 0], b: 3, t: 2.6, l: 2.6 }),
    note('tp-name', [8.3, -0.6], '\\text{triangular prism}', { place: 'below' }),
    squarePyramid({ name: 'py', at: [12, 0], b: 3, h: 3.2 }),
    note('py-name', [14.2, -0.6], '\\text{square pyramid}', { place: 'below' }),
  ],
  360,
);

const video: Explainer = {
  id: 'm8-8-2',
  lessonId: 'm8-8-2',
  title: 'Nets of Three-Dimensional Objects, Part 1: Faces, Edges and Vertices',
  thumbnailTitle: 'Faces, Edges and Vertices',
  thumbnail: 'fm',
  summary:
    'A face is a flat surface of a 3-D object, an edge is a line segment where two faces meet, and a vertex is a corner where edges meet (plural: vertices). A triangular prism, like a chocolate-bar box, has 2 + 3 = 5 faces, 3 + 3 + 3 = 9 edges and 3 + 3 = 6 vertices. A prism whose end has n sides has n + 2 faces, 3n edges and 2n vertices; a pyramid whose base has n sides has n + 1 faces, 2n edges and n + 1 vertices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Surface Area and Volume · Part 1', title: 'Faces, Edges and Vertices', subtitle: 'Words for describing any 3-D object' }],
      lines: [
        { say: 'A cereal box, a can of soup and a chocolate-bar box all start as flat pieces of cardboard. Each one is cut, folded and glued into a 3-D object.', show: 'title' },
        { say: 'Before we unfold them, you need three words that describe the parts of any 3-D object: face, edge and vertex. In this video, you will learn them, and count them.' },
      ],
    },
    {
      chapter: 'Faces, edges and vertices',
      layout: 'split',
      leftWidth: 540,
      left: [bar('fv', 460)],
      right: [
        {
          kind: 'bullets',
          id: 'def',
          items: ['A **face** is a flat surface of a 3-D object.', 'An **edge** is a line segment where two faces meet.', 'A **vertex** is a corner where edges meet. More than one: **vertices**.'],
        },
      ],
      lines: [
        { say: 'Here is a box for a chocolate bar. A face is a flat surface of a 3-D object. This box has a triangle at each end, and rectangles along its sides.', show: ['fv.shape', 'fv.front-face', 'fv.side-face', 'def.0'], focus: ['fv.front-face', 'fv.side-face'] },
        { say: 'An edge is a line segment where two faces meet, like the fold in a piece of cardboard.', show: 'def.1', focus: ['fv.bc', 'fv.be', 'fv.cf'] },
        { say: 'A vertex is a corner, where edges meet. When there is more than one vertex, we say vertices.', show: ['def.2', 'fv.vertices'], focus: 'fv.vertices' },
        { say: 'The dashed lines are edges at the back, hidden from view. They are still part of the box.', focus: ['fv.ad', 'fv.de', 'fv.df'] },
      ],
    },
    {
      chapter: 'Prisms and pyramids',
      layout: 'center',
      main: [
        family,
        { kind: 'bullets', id: 'b', items: ['A **prism** has two matching ends, joined by rectangles.', 'A **pyramid** has one base, and triangles that meet at a point.'] },
      ],
      lines: [
        { say: 'Many 3-D objects are prisms or pyramids. A prism has two matching ends, joined by rectangles.', show: ['fm.bx-shape', 'fm.bx-front-face', 'fm.bx-top-face', 'fm.bx-side-face', 'fm.tp-shape', 'fm.tp-front-face', 'fm.tp-side-face', 'b.0'] },
        { say: 'A prism is named after the shape of its ends. A box has rectangles at its ends, so it is a rectangular prism. The chocolate box has triangles at its ends, so it is a triangular prism.', show: ['fm.bx-name', 'fm.tp-name'], focus: ['fm.bx-front-face', 'fm.tp-front-face'] },
        { say: 'A pyramid has one base, and triangles that meet at a point at the top.', show: ['fm.py-shape', 'fm.py-front-face', 'fm.py-side-face', 'b.1'], focus: 'fm.py-shape' },
        { say: 'A pyramid is named after the shape of its base. This one has a square base, so it is a square pyramid.', show: ['fm.py-name', 'fm.py-base-face'], focus: 'fm.py-base-face' },
      ],
    },
    {
      chapter: 'Counting faces',
      layout: 'split',
      leftWidth: 540,
      left: [bar('cf', 460)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Faces: } 2 + 3 = 5', '\\text{Edges: } 3 + 3 + 3 = 9', '\\text{Vertices: } 3 + 3 = 6'] }],
      lines: [
        { say: 'How many faces, edges and vertices does the chocolate-bar box have? Let’s count each one carefully, in groups.', show: 'cf.shape' },
        { say: 'Faces first. There are two triangle ends. One is at the front, shown in yellow.', show: 'cf.front-end', focus: 'cf.front-end' },
        { say: 'The other end is at the back, where you cannot see it. Its edges are dashed, but it is still a face.', focus: ['cf.de', 'cf.df', 'cf.ef'] },
        { say: 'There are three rectangles. One is on the right, shown in blue. The other two are hidden: one on the left, and one on the bottom.', show: 'cf.right-rect', focus: ['cf.right-rect', 'cf.ad', 'cf.df', 'cf.de'] },
        { say: 'So there are two triangles and three rectangles. Two plus three is five faces.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Counting edges and vertices',
      layout: 'split',
      leftWidth: 540,
      left: [bar('ce', 460)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Faces: } 2 + 3 = 5', '\\text{Edges: } 3 + 3 + 3 = 9', '\\text{Vertices: } 3 + 3 = 6'] }],
      lines: [
        { say: 'Now the edges. The front triangle has three edges.', show: ['ce.shape', 'm.0'], focus: ['ce.ab', 'ce.bc', 'ce.ca'] },
        { say: 'The back triangle has three more. They are dashed or partly hidden, but they still count.', focus: ['ce.de', 'ce.ef', 'ce.df'] },
        { say: 'And three edges join the two ends, running from front to back. Three plus three plus three is nine edges.', show: 'm.1', focus: ['ce.ad', 'ce.be', 'ce.cf', 'm.1'] },
        { say: 'Last, the vertices. Each triangle end has three corners. Three plus three is six vertices.', show: ['ce.vertices', 'm.2'], focus: ['ce.vertices', 'm.2'] },
        { say: 'So the box has five faces, nine edges and six vertices.', focus: 'm' },
      ],
    },
    {
      chapter: 'Count the hidden parts',
      layout: 'center',
      main: [
        {
          kind: 'callout',
          id: 'oops',
          tone: 'mistake',
          title: 'Forgetting the hidden parts',
          md: 'Dashed lines in a drawing show edges at the back. Count those too. Count in groups (one end, the other end, the edges joining them) so you do not miss any or count any twice.',
        },
      ],
      lines: [
        { say: 'Here is a common mistake. In a drawing, you cannot see the back of the object, so it is easy to count only what you can see.', show: 'oops' },
        { say: 'Dashed lines show edges at the back. Count those as well. And remember the faces you cannot see, like the bottom and the back end.' },
        { say: 'Counting in groups helps: one end, then the other end, then the edges that join them. That way you do not miss any, or count any twice.' },
      ],
    },
    {
      chapter: 'A pattern',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Object', 'Faces', 'Edges', 'Vertices'],
          rows: [
            ['Cube', '$6$', '$12$', '$8$'],
            ['Rectangular prism', '$6$', '$12$', '$8$'],
            ['Triangular prism', '$5$', '$9$', '$6$'],
            ['Square pyramid', '$5$', '$8$', '$5$'],
            ['Pentagonal prism', '$7$', '$15$', '$10$'],
          ],
        },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'End with n sides', md: 'Prism: $n + 2$ faces, $3n$ edges, $2n$ vertices. Pyramid: $n + 1$ faces, $2n$ edges, $n + 1$ vertices.' },
      ],
      lines: [
        { say: 'Here are the counts for some other objects. A cube and a rectangular prism both have six faces, twelve edges and eight vertices.', show: ['t.0', 't.1'] },
        { say: 'The triangular prism has five, nine and six, and a square pyramid has five faces, eight edges and five vertices.', show: ['t.2', 't.3'] },
        { say: 'A pentagonal prism has ends with five sides. It has seven faces, fifteen edges and ten vertices.', show: 't.4', focus: 't.4' },
        { say: 'There is a pattern. For a prism, count the sides of one end. Add two to get the faces: five plus two is seven. Multiply by three to get the edges, and by two to get the vertices.', show: 'rule', focus: 'rule' },
        { say: 'For a pyramid, count the sides of the base. Add one to get the faces, multiply by two to get the edges, and add one to get the vertices.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A hexagonal prism has two ends that are hexagons, with $6$ sides each. How many faces, edges and vertices does it have?',
          choices: ['$8$ faces, $12$ edges, $18$ vertices', '$6$ faces, $18$ edges, $12$ vertices', '$7$ faces, $12$ edges, $7$ vertices', '$8$ faces, $18$ edges, $12$ vertices'],
          answer: 3,
          working: 'Faces: $2$ hexagons and $6$ rectangles, $8$. Edges: $6$ on each end and $6$ joining them, $18$. Vertices: $6$ on each end, $12$.',
        },
      ],
      lines: [
        { say: 'Your turn. A hexagonal prism has two ends that are hexagons, with six sides each. How many faces, edges and vertices does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. It has two hexagon ends and six rectangles: eight faces. It has six edges on each end and six joining them: eighteen edges. And six vertices on each end: twelve vertices. Choice B forgets to count the two hexagon ends as faces.', show: 'q.answer' },
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
          items: ['Faces are flat surfaces, edges are where two faces meet, and vertices are corners.', 'A prism has two matching ends; a pyramid has one base. Each is named by that shape.', 'Count in groups, and count the hidden parts too.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Faces are flat surfaces, edges are where two faces meet, and vertices are the corners.', show: 'sum.0' },
        { say: 'A prism has two matching ends, and a pyramid has one base. Each is named after the shape of that end or base.', show: 'sum.1' },
        { say: 'Count in groups, and count the hidden parts as well. In the next part, you will unfold objects into flat patterns called nets. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
