import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { arrow, base, cart, coord, move, pt, shapeIds, triangle } from './lib/m7-9-figures.ts';

type P = [number, number];

// A preview: triangle ABC, A(−4, 1), B(−1, 1), C(−3, 4), slid 5 units right and 3 units down, with
// an arrow from each vertex to its image (all the same length, all parallel).
const g = cart({ y: [-3, 5] });
const ABC: P[] = [
  [-4, 1],
  [-1, 1],
  [-3, 4],
];
const IMG: P[] = ABC.map(([x, y]) => [x + 5, y - 3]);
const slide = (id: string) =>
  figure(id, [
    g,
    triangle(g, { id: 't', corners: ABC, names: ['A', 'B', 'C'], places: ['below left', 'below right', 'above left'] }),
    triangle(g, { id: 'i', corners: IMG, names: ["A'", "B'", "C'"], places: ['below left', 'below right', 'above left'], tone: 'good' }),
    ...ABC.map((c, k) => move(g, `m${k}`, c, IMG[k], { tone: 'theta', group: 'moves' })),
  ]);

// The game piece: P(−2, 3) moves 5 units right, then 4 units down, to P'(3, −1).
const h = cart({ y: [-3, 5] });
const piece = (id: string) =>
  figure(id, [
    h,
    pt(h, 'P', -2, 3, coord(-2, 3, 'P'), 'above left', 'theta'),
    arrow(h, 'r', [-2, 3], [3, 3], { label: '5\\text{ right}', side: 'left', at: 0.72 }),
    move(h, 'd', [3, 3], [3, -1], { label: '4\\text{ down}', side: 'left' }),
    pt(h, 'Q', 3, -1, coord(3, -1, "P'"), 'below right', 'good'),
  ]);

const video: Explainer = {
  id: 'm7-9-2',
  lessonId: 'm7-9-2',
  title: 'Translations, Part 1: Translating a Point',
  thumbnailTitle: 'Translating a Point',
  thumbnail: 'gp',
  summary:
    'A transformation moves a shape to a new position, and the shape after the move is its image; the image of A is A′, said “A prime”. A translation is a slide: every point moves the same distance in the same direction. Right adds to x and left subtracts from x; up adds to y and down subtracts from y. P(−2, 3) moved 5 units right and 4 units down goes to P′(3, −1).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'The Cartesian Plane and Transformations · Part 1', title: 'Translating a Point', subtitle: 'Slide it, and watch the numbers change' }],
      lines: [
        { say: 'In a video game, a character slides across the screen. On a game board, a piece moves three squares right and two squares up.', show: 'title' },
        { say: 'Each of these moves is a slide. In this video, you will slide points in the Cartesian plane, and see how their coordinates change.' },
      ],
    },
    {
      chapter: 'Transformations and images',
      layout: 'split',
      leftWidth: 640,
      left: [slide('tr')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Transformation and image',
          md: 'A **transformation** moves a shape to a new position. The shape after the move is the **image**. The image of point $A$ is named $A\'$, said “A prime”.',
        },
      ],
      lines: [
        { say: 'Here is triangle A B C.', show: [...base('tr'), ...shapeIds('tr', 't')] },
        { say: 'A transformation moves a shape to a new position. The shape after the move is called the image.', show: ['def', ...shapeIds('tr', 'i')], focus: 'tr.i' },
        { say: 'We name the image of each point with a small mark called a prime. The image of A is A prime. The image of B is B prime, and the image of C is C prime.', focus: ['tr.i-0', 'tr.i-1', 'tr.i-2'] },
      ],
    },
    {
      chapter: 'Translation',
      layout: 'split',
      leftWidth: 640,
      left: [slide('sl')],
      right: [
        {
          kind: 'callout',
          id: 'def',
          tone: 'definition',
          title: 'Translation',
          md: 'A **translation** is a slide. Every point of the shape moves the **same distance** in the **same direction**. The image has the same size, shape and direction as the original.',
        },
      ],
      lines: [
        { say: 'This transformation is a translation. A translation is a slide.', show: [...base('sl'), ...shapeIds('sl', 't'), ...shapeIds('sl', 'i'), 'def'] },
        { say: 'Look at the arrows from each vertex to its image. A vertex is a corner. Every arrow is the same length, and every arrow points the same way.', show: 'sl.moves', focus: 'sl.moves' },
        { say: 'So every point moves the same distance, in the same direction. The image has the same size and shape as the original, and it faces the same way. It does not turn or flip.', focus: 'sl.i' },
      ],
    },
    {
      chapter: 'How the coordinates change',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'Describe a translation with two moves: how far **right or left**, and how far **up or down**.' },
        {
          kind: 'table',
          id: 'r',
          head: ['Move', 'What happens'],
          rows: [
            ['right', '[[adj:add to $x$]]'],
            ['left', '[[adj:subtract from $x$]]'],
            ['up', '[[opp:add to $y$]]'],
            ['down', '[[opp:subtract from $y$]]'],
          ],
        },
      ],
      lines: [
        { say: 'In the Cartesian plane, we describe a translation with two moves: how far right or left, and how far up or down.', show: 't' },
        { say: 'Moving right makes the x-coordinate bigger, so right adds to x. Moving left makes it smaller, so left subtracts from x.', show: ['r.0', 'r.1'], focus: ['r.0', 'r.1'] },
        { say: 'Moving up makes the y-coordinate bigger, so up adds to y. Moving down subtracts from y.', show: ['r.2', 'r.3'], focus: ['r.2', 'r.3'] },
      ],
    },
    {
      chapter: 'Sliding a game piece',
      layout: 'split',
      leftWidth: 640,
      left: [piece('gp')],
      right: [
        { kind: 'text', id: 'q', size: 'md', md: 'A game piece at $P(-2,\\ 3)$ moves $5$ units right and $4$ units down. Where is its image $P\'$?' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\text{right } 5\\!: \\ x = {-2} + 5 = 3}', '\\opp{\\text{down } 4\\!: \\ y = 3 - 4 = {-1}}', "P'(3,\\ {-1})"] },
      ],
      lines: [
        { say: 'A game piece is at P, at negative two, three. It moves five units right and four units down. Where is its image, P prime?', show: [...base('gp'), 'gp.P', 'q'] },
        { say: 'Five units right adds five to x. Negative two plus five is three.', show: ['gp.r', 'm.0'], focus: ['gp.r', 'm.0'] },
        { say: 'Four units down subtracts four from y. Three minus four is negative one.', show: ['gp.d', 'm.1'], focus: ['gp.d', 'm.1'] },
        { say: 'So P prime is at three, negative one. Check it on the grid: from P, count five squares right and four squares down, and you land on the same point.', show: ['gp.Q', 'm.2'], focus: ['gp.Q', 'm.2'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which number changes?', md: 'A move **left or right** changes only $x$. A move **up or down** changes only $y$. Do not add the left-right move to $y$.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{\\text{right or left} \\to x}', '\\opp{\\text{up or down} \\to y}'] },
      ],
      lines: [
        { say: 'Watch out. A move left or right changes only the x-coordinate, because the x-axis runs left and right.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'A move up or down changes only the y-coordinate, because the y-axis runs up and down.', show: 'm.1', focus: 'm.1' },
        { say: 'If you add the five units right to the y-coordinate by mistake, the piece lands in the wrong place. So for each move, ask: does it go across, or up and down?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: "Point $M(1,\\ {-2})$ is translated $3$ units **left** and $4$ units **up**. Where is $M'$?",
          choices: ['$(4,\\ 2)$', '$(-2,\\ {-6})$', '$(-3,\\ 1)$', '$(-2,\\ 2)$'],
          answer: 3,
          working: 'Left subtracts from $x$: $1 - 3 = -2$. Up adds to $y$: $-2 + 4 = 2$. So $M\'(-2,\\ 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Point M, at one, negative two, is translated three units left and four units up. Where is M prime? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Its x-coordinate is negative two, and its y-coordinate is two. Left subtracts from x: one minus three is negative two. Up adds to y: negative two plus four is two. Choice A moves right instead of left.', show: 'q.answer' },
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
          items: ['A translation slides every point the same distance in the same direction.', 'The image of $A$ is $A\'$. The image has the same size, shape and direction.', 'Right or left changes $x$. Up or down changes $y$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A translation slides every point the same distance, in the same direction.', show: 'sum.0' },
        { say: 'The image of A is called A prime. The image has the same size, shape and direction as the original.', show: 'sum.1' },
        { say: 'Moving right or left changes the x-coordinate, and moving up or down changes the y-coordinate. In the next part, you will translate a whole shape. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
