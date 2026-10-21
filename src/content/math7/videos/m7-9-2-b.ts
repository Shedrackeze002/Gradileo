import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { base, cart, move, shapeIds, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// Triangle ABC, A(−4, 1), B(−1, 1), C(−3, 4), translated 5 units right and 3 units down to
// A'(1, −2), B'(4, −2), C'(2, 1). Each vertex's move is drawn as 5 right, then 3 down.
const g = cart({ y: [-3, 5] });
const ABC: P[] = [
  [-4, 1],
  [-1, 1],
  [-3, 4],
];
const IMG: P[] = ABC.map(([x, y]) => [x + 5, y - 3]);
const NAMES = ['A', 'B', 'C'];
const steps = (k: number) => [
  move(g, `x${k}`, ABC[k], [IMG[k][0], ABC[k][1]], { tone: 'adj', group: `v${k}` }),
  move(g, `y${k}`, [IMG[k][0], ABC[k][1]], IMG[k], { tone: 'opp', group: `v${k}` }),
];
// The image's vertices as dots only (the triangle `i` joins them).
const shape = (id: string) =>
  figure(id, [
    g,
    triangle(g, { id: 't', corners: ABC, names: NAMES, places: ['below left', 'below', 'above left'] }),
    triangle(g, { id: 'i', corners: IMG, names: ["A'", "B'", "C'"], places: ['below left', 'below right', 'above right'], tone: 'good' }),
    ...steps(0),
    ...steps(1),
    ...steps(2),
  ]);

const video: Explainer = {
  id: 'm7-9-2-b',
  lessonId: 'm7-9-2',
  title: 'Translations, Part 2: Translating a Shape',
  thumbnailTitle: 'Translating a Shape',
  thumbnail: 'sh',
  summary:
    'To translate a shape, translate each vertex the same way, then join the image vertices in the same order. Triangle ABC with A(−4, 1), B(−1, 1) and C(−3, 4), translated 5 units right and 3 units down, has image A′(1, −2), B′(4, −2) and C′(2, 1): add 5 to every x-coordinate and subtract 3 from every y-coordinate. The image is the same size and shape and faces the same way.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 2', title: 'Translating a Shape', subtitle: 'One vertex at a time' }],
      lines: [
        { say: 'Sliding one point is easy. But how do you slide a whole triangle, with all of its points?', show: 'title' },
        { say: 'In this video, you will translate a shape by moving its corners, one at a time.' },
      ],
    },
    {
      chapter: 'One vertex at a time',
      layout: 'split',
      leftWidth: 640,
      left: [shape('pl')],
      right: [
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Translating a shape', md: 'Translate **each vertex** the same way. Then join the image vertices **in the same order**.' },
        { kind: 'text', id: 'q', size: 'md', md: 'Translate triangle $ABC$ $5$ units right and $3$ units down.' },
      ],
      lines: [
        { say: 'A shape has lots of points, but you do not need to move them all. A triangle is decided by its three corners, called its vertices.', show: [...base('pl'), ...shapeIds('pl', 't')], focus: ['pl.t-0', 'pl.t-1', 'pl.t-2'] },
        { say: 'So to translate a shape, translate each vertex the same way. Then join the image vertices in the same order.', show: 'tip' },
        { say: 'Let’s translate triangle A B C five units right and three units down. Five right means add five to x. Three down means subtract three from y.', show: 'q' },
      ],
    },
    {
      chapter: 'Moving each vertex',
      layout: 'split',
      leftWidth: 640,
      left: [shape('mv')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            "A'\\!: (\\adj{{-4} + 5},\\ \\opp{1 - 3})",
            "\\qquad = (1,\\ {-2})",
            "B'\\!: (\\adj{{-1} + 5},\\ \\opp{1 - 3})",
            "\\qquad = (4,\\ {-2})",
            "C'\\!: (\\adj{{-3} + 5},\\ \\opp{4 - 3})",
            "\\qquad = (2,\\ 1)",
          ],
        },
      ],
      lines: [
        { say: 'Start with A, at negative four, one. For x, negative four plus five is one. For y, one minus three is negative two. So A prime is at one, negative two.', show: [...base('mv'), ...shapeIds('mv', 't'), 'mv.v0', 'mv.i-0', 'm.0', 'm.1'], focus: ['mv.v0', 'm.0', 'm.1'] },
        { say: 'Next, B, at negative one, one. Negative one plus five is four, and one minus three is negative two. So B prime is at four, negative two.', show: ['mv.v1', 'mv.i-1', 'm.2', 'm.3'], focus: ['mv.v1', 'm.2', 'm.3'] },
        { say: 'Last, C, at negative three, four. Negative three plus five is two, and four minus three is one. So C prime is at two, one.', show: ['mv.v2', 'mv.i-2', 'm.4', 'm.5'], focus: ['mv.v2', 'm.4', 'm.5'] },
      ],
    },
    {
      chapter: 'Joining the image',
      layout: 'split',
      leftWidth: 640,
      left: [shape('jn')],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Vertex', 'Image'],
          rows: [
            ['$A(-4,\\ 1)$', "$A'(1,\\ {-2})$"],
            ['$B(-1,\\ 1)$', "$B'(4,\\ {-2})$"],
            ['$C(-3,\\ 4)$', "$C'(2,\\ 1)$"],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['(x,\\ y) \\to (\\adj{x + 5},\\ \\opp{y - 3})'] },
      ],
      lines: [
        { say: 'Now join the image vertices in the same order: A prime to B prime, B prime to C prime, and C prime back to A prime.', show: [...base('jn'), ...shapeIds('jn', 't'), ...shapeIds('jn', 'i'), 't'], focus: 'jn.i' },
        { say: 'Every vertex moved the same way. Every x-coordinate went up by five, and every y-coordinate went down by three.', show: 'm', focus: 'm' },
        { say: 'Compare the two triangles. The image is the same size and the same shape, and it faces the same way. A translation only slides a shape. It never turns it or flips it.', focus: ['jn.t', 'jn.i'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Move every vertex the same way', md: 'Use the **same** two moves for every vertex. If one vertex moves differently, the image changes size or shape, and it is not a translation.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your image', md: 'The image should look exactly like the original, just in a new place. If it is stretched, squashed, turned or flipped, look for a mistake.' },
      ],
      lines: [
        { say: 'Watch out. Use the same two moves for every vertex. It is easy to slip on one of them, for example by subtracting from x instead of y.', show: 'oops' },
        { say: 'If one vertex moves differently, the image changes size or shape. Then it is not a translation any more.' },
        { say: 'So always check your image. It should look exactly like the original, just in a new place. If it looks stretched, squashed, turned or flipped, look for a mistake.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Triangle $DEF$ has $D(-3,\\ 2)$, $E(0,\\ 2)$ and $F(-3,\\ 5)$. It is translated $4$ units right and $6$ units down. Where is $F'$?",
          choices: ['$(-7,\\ {-1})$', '$(1,\\ 11)$', '$(1,\\ {-1})$', '$(-3,\\ {-1})$'],
          answer: 2,
          working: 'Right adds to $x$: $-3 + 4 = 1$. Down subtracts from $y$: $5 - 6 = -1$. So $F\'(1,\\ {-1})$.',
        },
      ],
      lines: [
        { say: 'Your turn. Triangle D E F is translated four units right and six units down. Vertex F is at negative three, five. Where is F prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C: one, negative one. Right adds to x: negative three plus four is one. Down subtracts from y: five minus six is negative one. Choice A moves left instead of right.', show: 'q.answer' },
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
          items: ['Translate a shape one vertex at a time, with the same moves for every vertex.', 'Join the image vertices in the same order.', 'The image is the same size and shape, and faces the same way.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To translate a shape, translate one vertex at a time, using the same moves for every vertex.', show: 'sum.0' },
        { say: 'Then join the image vertices in the same order.', show: 'sum.1' },
        { say: 'The image is the same size and shape, and it faces the same way. In the next part, you will look at a shape and its image, and describe the translation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
